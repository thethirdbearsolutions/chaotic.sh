"""Agent service for managing agent users.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
import logging
import uuid
from collections.abc import Sequence

from oxyde import execute_raw
from datetime import datetime, timedelta, timezone
from app.db.transactions import atomic
from app.oxyde_models.user import OxydeUser
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.document import (
    OxydeDocument, OxydeDocumentActivity, OxydeDocumentComment, OxydeDocumentRevision,
)
from app.oxyde_models.issue import (
    OxydeBudgetTransaction, OxydeIssue, OxydeIssueActivity, OxydeIssueComment,
    OxydeIssueDescriptionRevision, OxydeTicketLimbo, OxydeTicketLimboBlocker,
)
from app.oxyde_models.ritual import OxydeRitualAttestation, OxydeRitualRejection
from app.enums import AgentKind
from app.schemas.agent import AgentCreate, AgentUpdate
from app.services.api_key_service import APIKeyService
from app.services.credential_events import revoking
from app.services.revocation_service import (
    REASON_PRINCIPAL_DEACTIVATED,
    REASON_PRINCIPAL_DELETED,
    RevocationService,
)
from app.schemas.api_key import APIKeyCreate
from app.utils.datetimes import ensure_utc

logger = logging.getLogger(__name__)

# A kind=session identity whose keys have gone unused this long is idle:
# left out of `agent list` and the pickers by default, still resolvable by
# id or name (CHT-1501). It equals the default session key TTL, so an
# identity is idle about when its last key would have expired unrenewed.
IDLE_SESSION_AFTER = timedelta(days=7)


def is_idle(last_used: datetime | None, now: datetime | None = None) -> bool:
    """`last_used` from ``AgentService.session_last_used``; None (not a
    session identity) is never idle."""
    if last_used is None:
        return False
    return (now or datetime.now(timezone.utc)) - last_used >= IDLE_SESSION_AFTER


def _count_phrase(n: int, kind: str) -> str:
    """'1 issue', '2 issues', '1 issue activity entry'."""
    if n == 1:
        kind = kind[:-3] + "y" if kind.endswith("ies") else kind[:-1]
    return f"{n} {kind}"


def describe_counts(counts: dict[str, int]) -> str:
    """The nonzero counts of an authored_counts() result, as prose."""
    return ", ".join(_count_phrase(n, kind) for kind, n in counts.items() if n)


class AgentHasAuthoredContentError(Exception):
    """Refused: the agent wrote things, and deleting it would erase who
    wrote them (CHT-1427). `counts` maps a kind of record to how many."""

    def __init__(self, agent_name: str, counts: dict[str, int], agent_id: str = "{id}"):
        self.counts = counts
        super().__init__(
            f"Agent '{agent_name}' cannot be deleted: it authored {describe_counts(counts)}. Deleting it "
            "would leave that work without an author. Deactivate it instead "
            f"(`chaotic agent deactivate`, or POST /api/agents/{agent_id}/deactivate): that "
            "revokes its API keys and blocks it from signing in, and keeps its work "
            "attributed to it. A deactivated agent can be reactivated later."
        )


class AgentInactiveError(Exception):
    """Refused: the agent is deactivated, so a key minted for it could
    never authenticate (CHT-1494)."""


class AgentManageDeniedError(Exception):
    """Refused: the requester may not manage this agent (CHT-1508)."""


class AgentService:
    """Service for agent operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        pass

    async def create(
        self,
        agent_in: AgentCreate,
        parent_user: OxydeUser,
        team_id: str,
        project_id: str | None = None,
        *,
        mint_key: bool = True,
        external_ref: str | None = None,
    ) -> tuple[OxydeUser, str | None, str | None]:
        """Create a new agent, with an API key unless `mint_key` is False
        (an agent created at OAuth consent acts through its connection's
        tokens and gets no key, CHT-1519).

        Returns:
            Tuple of (agent User, full API key, API key ID); the key parts
            are None without a key.
        """
        # Generate a unique email for the agent
        agent_email = f"agent-{uuid.uuid4()}@agent.local"

        async with atomic():
            # Create the agent user
            agent = await OxydeUser.objects.create(
                email=agent_email,
                hashed_password="",  # Agents don't log in via password
                name=agent_in.name,
                avatar_url=agent_in.avatar_url,
                bio=agent_in.bio,
                pronouns=agent_in.pronouns,
                tagline=agent_in.tagline,
                is_agent=True,
                kind=AgentKind.SERVICE if agent_in.can_register else AgentKind.ASSISTANT,
                can_register=agent_in.can_register,
                parent_user_id=parent_user.id,
                agent_team_id=team_id,
                agent_project_id=project_id,
                external_ref=external_ref,
            )
            if not mint_key:
                await agent.refresh()
                return agent, None, None

            # Create an API key for the agent
            api_key_service = APIKeyService()
            api_key_create = APIKeyCreate(name=f"Default key for {agent_in.name}")
            # Signs in as the agent; held by its creator, who was shown
            # the secret.
            api_key, full_key = await api_key_service.create(
                agent.id, api_key_create, holder_user_id=parent_user.id,
            )

        await agent.refresh()
        await api_key.refresh()

        return agent, full_key, api_key.id

    async def can_manage(self, user: OxydeUser, agent: OxydeUser) -> bool:
        """May `user` update, delete, deactivate/reactivate, mint a key for,
        list the keys of, or revoke a key of `agent`?

        Admins (and owners) of the agent's team may. The agent's creator
        may only while still a member of that team: being removed from
        the team ends the creator's rights over its agents, or an
        ex-member could mint a fresh key and act in the team as the agent
        (CHT-1508). A project-scoped agent needs nothing more, because a
        human's project access *is* membership of the project's team
        (``check_user_project_access``). Agents never manage agents: they
        are not team members, and no agent is another agent's parent.
        """
        from app.enums import TeamRole
        from app.services.team_service import TeamService

        if user.is_agent:
            return False
        member = await TeamService().get_member(agent.agent_team_id, user.id)
        if member is None:
            return False
        if member.role in (TeamRole.OWNER, TeamRole.ADMIN):
            return True
        return agent.parent_user_id == user.id

    async def list_keys(self, agent_id: str) -> list[OxydeAPIKey]:
        """Every API key that signs in as the agent, newest first, whoever
        minted it (CHT-1537: its `principal_user_id`)."""
        return await APIKeyService().list_by_principal(agent_id)

    async def release_member_agents(
        self, team_id: str, removed_user_id: str, new_owner_id: str | None, *, actor_id: str | None = None,
    ) -> list[tuple[OxydeUser, int, bool]]:
        """A member is leaving `team_id` (CHT-1510). Call inside the
        transaction that deletes the membership.

        Revokes the credentials the leaver holds for the team's agents:
        every key that signs in as an agent of this team and names them as
        its `holder_user_id`. A key is held by whoever minted it, and a key
        an agent mints for itself by the holder of the key it called with;
        an agent's legacy self-minted keys were given its creator as
        holder by migration 0021 (CHT-1537). The agents stay. Agents they
        created pass to `new_owner_id`, so someone in the team can mint
        replacement keys; with no new owner the agent stays put and any
        team admin can still manage it.

        Then ends, through the RevocationService (CHT-1523), the holder
        sessions the leaver answers for in the team (the OAuth connections
        they consented to, and claims made with their keys), the codes and
        tickets they would answer for there, and what the revoked keys had
        opened or minted. `actor_id` is who removed them (themself when
        leaving).

        Returns (agent, keys revoked, owner reassigned) for each agent
        that changed.
        """
        agents = await OxydeUser.objects.filter(is_agent=True, agent_team_id=team_id).all()
        changed = []
        revoked_key_ids: list[str] = []
        for agent in agents:
            keys = await OxydeAPIKey.objects.filter(
                principal_user_id=agent.id, holder_user_id=removed_user_id, is_active=True,
            ).all()
            revoked_key_ids += [key.id for key in keys]
            revoked = await OxydeAPIKey.objects.filter(
                id__in=[key.id for key in keys], is_active=True,
            ).update(is_active=False) if keys else 0
            reassigned = False
            if agent.parent_user_id == removed_user_id:
                if new_owner_id:
                    await OxydeUser.objects.filter(id=agent.id).update(parent_user_id=new_owner_id)
                    agent.parent_user_id = new_owner_id
                    reassigned = True
            if revoked or reassigned:
                changed.append((agent, revoked, reassigned))
        await RevocationService().revoke_for_member(
            team_id, removed_user_id, revoked_key_ids=revoked_key_ids, actor_id=actor_id,
        )
        return changed

    async def get_by_id(self, agent_id: str) -> OxydeUser | None:
        """Get agent by ID."""
        return await OxydeUser.objects.join("parent_user").filter(
            id=agent_id, is_agent=True
        ).first()

    async def list_by_team(self, team_id: str) -> list[OxydeUser]:
        """List all agents for a team (includes project-scoped agents)."""
        return await OxydeUser.objects.join("parent_user").filter(
            is_agent=True, agent_team_id=team_id
        ).order_by("-created_at").all()

    @staticmethod
    async def session_last_used(agents: list[OxydeUser]) -> dict[str, datetime]:
        """When each kind=session identity among `agents` last used a key
        (CHT-1501): the newest of its keys' `last_used_at`, a never-used
        key counting from its `created_at` (registration mints one, so a
        fresh or renewed identity is in use), any key, rotated out or not.
        An identity with no key at all counts from its own `created_at`.
        `last_used_at` is written at most every LAST_USED_WRITE_INTERVAL,
        far finer than IDLE_SESSION_AFTER.

        One grouped query per 500 identities (the bound-parameter limit),
        however many keys renewals have left behind (CHT-1689)."""
        last = {a.id: ensure_utc(a.created_at) for a in agents if a.kind == AgentKind.SESSION}
        ids = list(last)
        for i in range(0, len(ids), 500):
            chunk = ids[i:i + 500]
            rows = await execute_raw(
                # Stored datetimes are naive UTC text (0006), so MAX orders them.
                "SELECT principal_user_id AS id, MAX(COALESCE(last_used_at, created_at)) AS used "
                f"FROM api_keys WHERE principal_user_id IN ({', '.join('?' * len(chunk))}) "
                "GROUP BY principal_user_id",
                chunk,
            )
            for row in rows:
                last[row["id"]] = ensure_utc(row["used"])
        return last

    async def list_by_project(self, project_id: str) -> list[OxydeUser]:
        """List agents scoped to a specific project."""
        return await OxydeUser.objects.join("parent_user").filter(
            is_agent=True, agent_project_id=project_id
        ).order_by("-created_at").all()

    async def list_by_parent(self, parent_user_id: str) -> list[OxydeUser]:
        """List all agents created by a specific user."""
        return await OxydeUser.objects.filter(
            is_agent=True, parent_user_id=parent_user_id
        ).order_by("-created_at").all()

    async def update(self, agent: OxydeUser, agent_in: AgentUpdate) -> OxydeUser:
        """Update an agent."""
        update_data = agent_in.model_dump(exclude_unset=True)
        if update_data.get("can_register") is None:
            update_data.pop("can_register", None)
        else:
            # A registrar is kind service; turning it off makes it an
            # ordinary hand-made agent again (CHT-1498). The route refuses
            # this for a registered identity.
            update_data["kind"] = AgentKind.SERVICE if update_data["can_register"] else AgentKind.ASSISTANT
        if not update_data:
            return await OxydeUser.objects.join("parent_user").filter(id=agent.id).first()
        for field, value in update_data.items():
            setattr(agent, field, value)
        if "avatar_url" in update_data:
            # Moved off its uploaded picture: delete it (PR #522 review).
            from app.services.avatar_service import AvatarService
            async with atomic():
                await agent.save(update_fields=set(update_data.keys()))
                await AvatarService.drop_unless_pointed(agent.id, agent.avatar_url)
        else:
            await agent.save(update_fields=set(update_data.keys()))
        if "name" in update_data:
            # Inbox entries show who triggered them (CHT-1607).
            from app.services.inbox_service import InboxService
            await InboxService().touch_safely(source_user_id=agent.id)
        # Re-query with join to load parent_user for response
        return await OxydeUser.objects.join("parent_user").filter(id=agent.id).first()

    async def authored_counts(self, agent_id: str) -> dict[str, int]:
        """How many records attribute something to this user (an agent,
        or the human UserService.delete checks with it, CHT-1467): every
        column that would lose the attribution (or, for ritual gate
        requests, the row) if the user were deleted."""
        return {
            "issues": await OxydeIssue.objects.filter(creator_id=agent_id).count(),
            "issue comments": await OxydeIssueComment.objects.filter(author_id=agent_id).count(),
            "issue activity entries": await OxydeIssueActivity.objects.filter(user_id=agent_id).count(),
            "documents": await OxydeDocument.objects.filter(author_id=agent_id).count(),
            "document comments": await OxydeDocumentComment.objects.filter(author_id=agent_id).count(),
            "document activity entries": await OxydeDocumentActivity.objects.filter(user_id=agent_id).count(),
            "ritual gate requests": await OxydeTicketLimbo.objects.filter(requested_by_id=agent_id).count(),
            # SET NULL already, but each still loses its attribution.
            "ritual attestations": await OxydeRitualAttestation.objects.filter(attested_by=agent_id).count(),
            "ritual approvals": await OxydeRitualAttestation.objects.filter(approved_by=agent_id).count(),
            # CHT-1606, SET NULL like the attestation columns above.
            "ritual rejections received": await OxydeRitualRejection.objects.filter(attested_by_id=agent_id).count(),
            "ritual rejections": await OxydeRitualRejection.objects.filter(rejected_by_id=agent_id).count(),
            # Who cleared a ritual gate, and who resolved each blocker
            # (SET NULL; CHT-1467's review).
            "ritual gate clearances": await OxydeTicketLimbo.objects.filter(cleared_by_id=agent_id).count(),
            "ritual blocker resolutions": await OxydeTicketLimboBlocker.objects.filter(resolved_by_id=agent_id).count(),
            "budget transactions": await OxydeBudgetTransaction.objects.filter(user_id=agent_id).count(),
            "issue description revisions": await OxydeIssueDescriptionRevision.objects.filter(author_id=agent_id).count(),
            "document revisions": await OxydeDocumentRevision.objects.filter(author_id=agent_id).count(),
        }

    async def delete(self, agent: OxydeUser) -> int:
        """Delete an agent and its API keys -- only if it authored nothing.
        Returns how many identities it had registered that were retired
        with it (CHT-1498).

        An agent that wrote anything is refused with
        AgentHasAuthoredContentError (CHT-1427): its rows would survive
        (authorship is ON DELETE SET NULL) but lose their author, and
        ticket_limbo.requested_by_id still cascades.
        """
        async with revoking():
            counts = await self.authored_counts(agent.id)
            if any(counts.values()):
                raise AgentHasAuthoredContentError(agent.name, counts, agent.id)
            # A registrar's identities do not outlive it (CHT-1498): they
            # are retired with it, exactly as on deactivate. Their
            # registered_by_id stays, naming an agent that no longer exists.
            identities = await self._retire_identities(agent.id)
            # The deletes below would cascade its sessions away; revoking
            # them first moves the revocation epoch, so no cached
            # validation outlives the agent (CHT-1523).
            await self.revoke_credentials_of([agent.id], actor_id=None, reason=REASON_PRINCIPAL_DELETED)
            await OxydeAPIKey.objects.filter(principal_user_id=agent.id).delete()
            # Its picture (CHT-1992).
            from app.services.avatar_service import AvatarService
            await AvatarService.forget([agent.id])
            await agent.delete()
        self._log_retired(identities, agent.id, None)
        return len(identities)

    async def deactivate(self, agent: OxydeUser, actor: OxydeUser) -> OxydeUser | None:
        """Retire an agent without erasing who wrote what (CHT-1494).

        Revokes every API key that signs in as the agent (its
        `principal_user_id`), whoever minted it, and sets is_active=false, which the
        auth dependency already refuses. The agent row stays, so its
        authored work keeps its author. Idempotent: deactivating an
        inactive agent revokes any key that is somehow still active and
        changes nothing else.

        Returns None when the agent no longer exists (a concurrent delete
        won), so the route can answer 404.
        """
        return (await self._set_active(agent, actor, active=False))[0]

    async def deactivate_with_identities(
        self, agent: OxydeUser, actor: OxydeUser,
    ) -> tuple[OxydeUser | None, int]:
        """``deactivate``, also reporting how many identities the agent had
        registered that went with it (CHT-1498): deactivating a registrar
        deactivates every active identity it registered and revokes their
        keys, in the same transaction."""
        return await self._set_active(agent, actor, active=False)

    async def reactivate(self, agent: OxydeUser, actor: OxydeUser) -> OxydeUser | None:
        """Undo a deactivation (CHT-1494): set is_active=true. Revoked keys
        stay revoked; mint a new one (`chaotic agent keys create`), so a
        reactivation never silently re-arms a key that may have been the
        reason for the deactivation. Idempotent. Returns None when the
        agent no longer exists."""
        return (await self._set_active(agent, actor, active=True))[0]

    async def _set_active(
        self, agent: OxydeUser, actor: OxydeUser, *, active: bool,
    ) -> tuple[OxydeUser | None, int]:
        changed = False
        identities: list[OxydeUser] = []
        async with revoking():
            if not active:
                await OxydeAPIKey.objects.filter(principal_user_id=agent.id).update(is_active=False)
            current = await OxydeUser.objects.filter(id=agent.id, is_agent=True).first()
            if current is None:
                return None, 0
            if not active:
                # Its holder sessions, and what its keys opened or minted,
                # end with it (CHT-1523).
                await self.revoke_credentials_of([agent.id], actor_id=actor.id)
                # A registrar's identities go with it (CHT-1498). Reactivating
                # the registrar does not bring them back: each is reactivated
                # on its own, like any agent.
                identities = await self._retire_identities(agent.id, actor_id=actor.id)
            if current.is_active != active:
                current.is_active = active
                await current.save(update_fields={"is_active"})
                changed = True
        # Re-read with the parent joined for the response (save() does not
        # keep a joined relation loaded).
        current = await OxydeUser.objects.join("parent_user").filter(id=agent.id, is_agent=True).first()
        if current is None:
            return None, len(identities)
        self._log_retired(identities, agent.id, actor.id)
        if changed:
            verb = "reactivated" if active else "deactivated"
            # No activity table covers agents; this log line and the
            # creator's inbox entry are the audit trail (CHT-1494).
            logger.info(
                "agent %s (%s) %s by user %s (%s)", current.id, current.name, verb, actor.id, actor.name,
            )
            await self._notify_parent(current, actor, verb)
        return current, len(identities)

    async def _retire_identities(
        self, registrar_id: str, *, actor_id: str | None = None, reason: str = REASON_PRINCIPAL_DEACTIVATED,
    ) -> list[OxydeUser]:
        """Deactivate every active identity `registrar_id` registered and
        revoke their keys (CHT-1498), and end their holder sessions and
        what those keys opened or minted (CHT-1523). Call inside the
        transaction that deactivates or deletes the registrar."""
        identities = await OxydeUser.objects.filter(
            registered_by_id=registrar_id, is_agent=True, is_active=True,
        ).all()
        ids = [i.id for i in identities]
        if ids:
            await OxydeAPIKey.objects.filter(principal_user_id__in=ids).update(is_active=False)
            await OxydeUser.objects.filter(id__in=ids).update(is_active=False)
            await self.revoke_credentials_of(ids, actor_id=actor_id, reason=reason)
        return identities

    async def retire_for_deleted_scope(
        self, *, team_id: str | None = None, project_ids: Sequence[str] = (), actor_id: str | None, reason: str,
    ) -> list[str]:
        """Retire every agent scoped to a team or project about to be
        deleted (CHT-1844). Call inside the ``revoking()`` transaction
        that deletes it, before the delete.

        On a database built from the migration chain, ``agent_team_id``
        and ``agent_project_id`` are ``ON DELETE SET NULL``: a deleted
        project would turn its agents into team-wide agents, and a
        deleted team would leave its agents active with no team. So each
        agent scoped to the deleted row is deactivated, every key that
        signs in as it revoked, its sessions and unredeemed codes and
        tickets ended (and its sockets and push devices with them, after
        the commit), and the identities it registered retired, as on
        ``deactivate``. Its ``agent_team_id`` is cleared too, failing
        closed: once ``agent_project_id`` is nulled, an agent left with
        its team would be indistinguishable from a team-scoped one, and
        its creator could reactivate it as one. With no team it can sign
        in nowhere (an agent's credential needs its holder to be a member
        of the agent's team) and no one can manage it. The rows stay: the
        agents' authored work keeps its author. Returns their ids.
        """
        found: dict[str, OxydeUser] = {}
        if team_id is not None:
            for agent in await OxydeUser.objects.filter(is_agent=True, agent_team_id=team_id).all():
                found[agent.id] = agent
        project_ids = list(project_ids)
        if project_ids:
            for agent in await OxydeUser.objects.filter(is_agent=True, agent_project_id__in=project_ids).all():
                found[agent.id] = agent
        ids = list(found)
        if not ids:
            return []
        await OxydeAPIKey.objects.filter(principal_user_id__in=ids).update(is_active=False)
        await OxydeUser.objects.filter(id__in=ids).update(is_active=False, agent_team_id=None)
        await self.revoke_credentials_of(ids, actor_id=actor_id, reason=reason)
        for agent_id in ids:
            identities = await self._retire_identities(agent_id, actor_id=actor_id, reason=reason)
            self._log_retired(identities, agent_id, actor_id)
        for agent in found.values():
            logger.info(
                "agent %s (%s) deactivated and detached from team %s (%s, project %s) by user %s",
                agent.id, agent.name, agent.agent_team_id, reason, agent.agent_project_id, actor_id,
            )
        return ids

    @staticmethod
    async def revoke_credentials_of(
        user_ids: list[str], *, actor_id: str | None, reason: str = REASON_PRINCIPAL_DEACTIVATED,
    ) -> None:
        """End every holder session acting as `user_ids`, and what each
        key that signs in as them opened or minted (CHT-1523). Call inside
        the transaction that deactivates, retires or deletes them, after
        its first write."""
        await RevocationService().revoke_for_principals(user_ids, actor_id=actor_id, reason=reason)

    @staticmethod
    def _log_retired(identities, registrar_id: str, actor_id: str | None) -> None:
        for identity in identities:
            logger.info(
                "identity %s (%s) deactivated with its registrar %s by user %s",
                identity.id, identity.name, registrar_id, actor_id,
            )

    async def _notify_parent(self, agent: OxydeUser, actor: OxydeUser, verb: str) -> None:
        """Tell the agent's creator who changed it, unless they did it
        themselves. Best-effort: the state change has already committed."""
        if not agent.parent_user_id or agent.parent_user_id == actor.id:
            return
        from app.services.inbox_service import InboxService
        from app.services.team_service import TeamService

        # A creator who has left the agent's team hears nothing more about
        # it: the entry names the actor and is broadcast on the team's
        # channel (CHT-1508).
        try:
            if await TeamService().get_member(agent.agent_team_id, agent.parent_user_id) is None:
                return
            await InboxService().notify_agent_status(agent=agent, actor=actor, verb=verb)
        except Exception:
            logger.exception("Failed to notify the creator of agent %s that it was %s", agent.id, verb)

    async def notify_member_agents_released(
        self, *, team_id: str, released, removed: OxydeUser | None, actor: OxydeUser,
        new_owner: OxydeUser | None,
    ) -> None:
        """Tell the team's admins (other than whoever did the removal) what
        a member's departure did to each agent (CHT-1510). Best-effort:
        the removal has already committed."""
        from app.enums import TeamRole
        from app.oxyde_models.team import OxydeTeamMember
        from app.services.inbox_service import InboxService

        try:
            admins = await OxydeTeamMember.objects.filter(team_id=team_id).all()
            recipients = [
                m.user_id for m in admins
                if m.role in (TeamRole.OWNER, TeamRole.ADMIN) and m.user_id != actor.id
            ]
            inbox = InboxService()
            for agent, revoked, reassigned in released:
                logger.info(
                    "agent %s (%s): %d key(s) revoked%s on removal of user %s from team %s by %s",
                    agent.id, agent.name, revoked,
                    f", owner now {new_owner.id}" if reassigned and new_owner else "",
                    removed.id if removed else "?", team_id, actor.id,
                )
                for recipient_id in recipients:
                    await inbox.notify_agent_keys_released(
                        recipient_user_id=recipient_id, agent=agent, actor=actor, removed=removed,
                        revoked=revoked, new_owner=new_owner if reassigned else None,
                    )
        except Exception:
            logger.exception("Failed to notify admins of team %s about released agents", team_id)

    async def create_key(self, agent_id: str, requester_user: OxydeUser) -> tuple[str, str]:
        """Mint a new API key for an existing agent.

        Returns:
            Tuple of (full API key, API key ID)
        """
        async with atomic():
            # Checked inside the transaction so a deactivation that
            # commits first is seen (CHT-1494).
            agent = await self.get_by_id(agent_id)
            if not agent:
                raise ValueError("Agent not found")
            # Re-checked here so a team removal that commits between the
            # route's check and this insert is seen (CHT-1508).
            if not await self.can_manage(requester_user, agent):
                raise AgentManageDeniedError("Not authorized to mint a key for this agent")
            if not agent.is_active:
                raise AgentInactiveError(
                    f"Agent '{agent.name}' is deactivated; reactivate it first "
                    f"(`chaotic agent reactivate`, or POST /api/agents/{agent.id}/reactivate)."
                )
            api_key_service = APIKeyService()
            api_key_create = APIKeyCreate(name=f"Key for {agent.name}")
            if agent.kind == AgentKind.SESSION:
                # Any key of a registered identity lives at most the session
                # TTL, whoever mints it (CHT-1498): a person can extend a
                # session by minting, not make it permanent.
                from datetime import datetime, timedelta, timezone

                from app.config import get_settings

                api_key_create.expires_at = datetime.now(timezone.utc) + timedelta(
                    seconds=get_settings().agent_session_key_ttl_seconds,
                )
            # Held by whoever minted it: the person who was shown the
            # secret. So GET /api-keys lists exactly the keys a person
            # holds, and leaving the team revokes exactly those
            # (CHT-1508/CHT-1510). Keys minted before this were all held
            # by the agent's creator.
            api_key, full_key = await api_key_service.create(
                agent.id, api_key_create, holder_user_id=requester_user.id,
            )

        await api_key.refresh()

        return full_key, api_key.id
