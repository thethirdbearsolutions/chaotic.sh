"""Team service for team management.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
from datetime import datetime, timedelta, timezone
import secrets
from app.oxyde_models.user import OxydeUser
from app.utils.email_address import fold_email, same_email
from app.oxyde_models.team import OxydeTeam, OxydeTeamActivity, OxydeTeamMember, OxydeTeamInvitation
from app.enums import TeamActivityAction, TeamRole, InvitationStatus
from app.schemas.team import TeamCreate, TeamUpdate, TeamInvitationCreate
from oxyde import IntegrityError, execute_raw
from app.db.transactions import atomic
from app.utils import ensure_utc
from app.services.credential_events import revoking

# Type aliases for API compatibility
Team = OxydeTeam
TeamMember = OxydeTeamMember
TeamInvitation = OxydeTeamInvitation


def eligible_on_project_work(user, team_id: str, project_id: str | None, *, is_member: bool) -> bool:
    """The rule behind ``app.api.deps.is_eligible_project_member``, with the
    one fact it must look up passed in: ``is_member``, whether ``user``
    has a ``team_members`` row in ``team_id`` (read only for a person).
    For a caller that already holds the team's member rows
    (``mcp_server.scope.resolve_assignee``, CHT-1839), so the rule exists
    once and the caller need not query per person."""
    if user is None or not user.is_active or not team_id:
        return False
    if user.is_agent:
        if user.agent_project_id:
            return user.agent_project_id == project_id and user.agent_team_id == team_id
        return user.agent_team_id == team_id
    return is_member


# An owner of the team other than the row being changed, who can act as
# one: a person (an agent's membership row does not count) with an
# active account. Params: team_id, TeamRole.OWNER.name, the row's id
# (stored enums are names, CLAUDE.md).
_ANOTHER_OWNER = (
    "EXISTS (SELECT 1 FROM team_members o JOIN users u ON u.id = o.user_id "
    "WHERE o.team_id = ? AND o.role = ? AND o.id != ? AND u.is_agent = 0 AND u.is_active = 1)"
)


class LastOwnerError(Exception):
    """The change would leave the team with no owner (CHT-1848)."""


class MembershipChanged(Exception):
    """A membership the change depends on changed since it was read."""


class TeamService:
    """Service for team operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        pass

    async def create(self, team_in: TeamCreate, creator: OxydeUser) -> OxydeTeam:
        """Create a new team."""
        async with atomic():
            team = await OxydeTeam.objects.create(
                name=team_in.name,
                key=team_in.key.upper(),
                description=team_in.description,
            )
            await OxydeTeamMember.objects.create(
                team_id=team.id,
                user_id=creator.id,
                role=TeamRole.OWNER,
            )
            await self.record_activity(
                team.id, TeamActivityAction.MEMBER_ADDED, actor_id=creator.id,
                target_user_id=creator.id, role=TeamRole.OWNER,
            )
        await team.refresh()
        return team

    async def record_activity(
        self,
        team_id: str,
        action: TeamActivityAction,
        *,
        actor_id: str | None,
        target_user_id: str | None = None,
        invitation_id: str | None = None,
        email: str | None = None,
        role: TeamRole | None = None,
        old_role: TeamRole | None = None,
    ) -> OxydeTeamActivity:
        """Add a row to the team's log (CHT-1843). Call it inside the
        transaction of what it records, so the two commit together.
        Never pass a secret: no token, code or link."""
        return await OxydeTeamActivity.objects.create(
            team_id=team_id,
            action=action,
            actor_id=actor_id,
            target_user_id=target_user_id,
            invitation_id=invitation_id,
            email=email,
            role=role,
            old_role=old_role,
        )

    async def list_activity(
        self,
        team_id: str,
        *,
        action: TeamActivityAction | None = None,
        skip: int = 0,
        limit: int = 50,
    ) -> list[OxydeTeamActivity]:
        """The team's log, newest first; ``action`` keeps only that one."""
        query = OxydeTeamActivity.objects.filter(team_id=team_id)
        if action is not None:
            query = query.filter(action=action)
        return await query.order_by("-created_at", "-id").offset(skip).limit(limit).all()

    async def get_by_id(self, team_id: str) -> OxydeTeam | None:
        """Get team by ID."""
        return await OxydeTeam.objects.get_or_none(id=team_id)

    async def get_by_key(self, key: str) -> OxydeTeam | None:
        """Get team by key."""
        return await OxydeTeam.objects.get_or_none(key=key.upper())

    async def update(self, team: OxydeTeam, team_in: TeamUpdate) -> OxydeTeam:
        """Update a team."""
        update_data = team_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(team, field, value)
        team.updated_at = datetime.now(timezone.utc)
        await team.save(update_fields=set(update_data.keys()) | {"updated_at"})
        await team.refresh()
        return team

    async def delete(self, team: OxydeTeam, *, actor_id: str | None = None) -> None:
        """Delete a team and its child records.

        Oxyde doesn't enforce FK cascades, so we manually delete
        members and invitations before removing the team. Its holder
        sessions and unredeemed codes and tickets are revoked first
        (CHT-1523), so the deletion is audited and moves the revocation
        epoch rather than only cascading the rows away.

        Its agents, and the agents of its projects (which the delete
        cascades away), are retired in the same transaction (CHT-1844):
        ``users.agent_team_id`` is ``ON DELETE SET NULL`` on a database
        built from the migration chain, which would leave each one
        active with no team.
        """
        from app.oxyde_models.project import OxydeProject
        from app.services.agent_service import AgentService
        from app.services.revocation_service import REASON_TEAM_DELETED, RevocationService

        async with revoking():
            await OxydeTeamInvitation.objects.filter(team_id=team.id).delete()
            await RevocationService().revoke_for_team(team.id, actor_id=actor_id)
            project_ids = [r["id"] for r in await OxydeProject.objects.filter(team_id=team.id).values("id").all()]
            await AgentService().retire_for_deleted_scope(
                team_id=team.id, project_ids=project_ids, actor_id=actor_id, reason=REASON_TEAM_DELETED,
            )
            await OxydeTeamMember.objects.filter(team_id=team.id).delete()
            await team.delete()

    async def get_user_teams(self, user_id: str) -> list[OxydeTeam]:
        """Get all teams for a user.

        For agents, returns the team from agent_team_id.
        For regular users, returns teams from TeamMember membership.
        """
        user = await OxydeUser.objects.get_or_none(id=user_id)

        if user and user.is_agent and user.agent_team_id:
            team = await self.get_by_id(user.agent_team_id)
            return [team] if team else []

        # Regular users: get team IDs from membership, then fetch teams
        members = await OxydeTeamMember.objects.filter(user_id=user_id).all()
        if not members:
            return []
        team_ids = [m.team_id for m in members]
        teams = await OxydeTeam.objects.filter(id__in=team_ids).all()
        return teams

    async def get_members(self, team_id: str) -> list[OxydeTeamMember]:
        """Get all members of a team."""
        return await OxydeTeamMember.objects.filter(
            team_id=team_id
        ).join("user").all()

    async def get_member(
        self, team_id: str, user_id: str
    ) -> OxydeTeamMember | None:
        """Get a specific team member."""
        return await OxydeTeamMember.objects.filter(
            team_id=team_id, user_id=user_id
        ).first()

    async def add_member(
        self, team: OxydeTeam, user: OxydeUser, role: TeamRole = TeamRole.MEMBER,
        *, actor_id: str | None = None,
    ) -> OxydeTeamMember:
        """Add a member to a team.

        UNIQUE(team_id, user_id) (migration 0033, CHT-1791) allows one
        membership per user per team. A user who is already a member keeps
        the membership they have, role included, and it is returned. Only
        a new membership is logged (MEMBER_ADDED).
        """
        try:
            async with atomic():
                member = await OxydeTeamMember.objects.create(
                    team_id=team.id,
                    user_id=user.id,
                    role=role,
                )
                await self.record_activity(
                    team.id, TeamActivityAction.MEMBER_ADDED, actor_id=actor_id,
                    target_user_id=user.id, role=role,
                )
        except IntegrityError:
            member = await self.get_member(team.id, user.id)
            if member is None:
                raise
        await member.refresh()
        return member

    async def update_member_role(
        self, member: OxydeTeamMember, role: TeamRole, *, actor_id: str | None,
    ) -> OxydeTeamMember | None:
        """Update a member's role; logged (ROLE_CHANGED) when it changes.
        None when the membership is gone.

        An owner's role changes only while another owner remains
        (CHT-1848), and that check is part of the UPDATE itself, so two
        owners stepping down at once leave one: SQLite runs one write
        statement at a time, and the second sees the first's commit. The
        write also requires the role the caller read, so the log's
        ``old_role`` is the one replaced. Raises LastOwnerError, or
        MembershipChanged when the role changed meanwhile.
        """
        old_role = member.role
        if old_role == role:
            await member.refresh()
            return member
        sql = "UPDATE team_members SET role = ? WHERE id = ? AND role = ?"
        params = [role.name, member.id, old_role.name]
        if old_role == TeamRole.OWNER:
            sql += f" AND {_ANOTHER_OWNER}"
            params += [member.team_id, TeamRole.OWNER.name, member.id]
        async with atomic():
            if not await execute_raw(sql + " RETURNING id", params):
                current = await OxydeTeamMember.objects.filter(id=member.id).first()
                if current is None:
                    return None
                if current.role != old_role:
                    raise MembershipChanged()
                raise LastOwnerError()
            await self.record_activity(
                member.team_id, TeamActivityAction.ROLE_CHANGED, actor_id=actor_id,
                target_user_id=member.user_id, role=role, old_role=old_role,
            )
        await member.refresh()
        return member

    async def transfer_ownership(
        self, target: OxydeTeamMember, *, actor_id: str,
    ) -> OxydeTeamMember:
        """Make ``target`` an owner and its caller, ``actor_id``, an admin,
        in one transaction (CHT-1848). Logged as OWNERSHIP_TRANSFERRED,
        and as a ROLE_CHANGED row for each of the two.

        The promotion requires, in the same statement, that the actor is
        still an owner and the target still holds the role the caller
        read; the actor's step-down follows under the writer lock the
        promotion took, with the new owner already in place, so the team
        always has an owner. Raises MembershipChanged when either was
        changed (or removed) meanwhile; nothing is written then.
        """
        old_role = target.role
        owner, admin = TeamRole.OWNER.name, TeamRole.ADMIN.name
        async with atomic():
            promoted = await execute_raw(
                "UPDATE team_members SET role = ? WHERE id = ? AND role = ? AND EXISTS ("
                "SELECT 1 FROM team_members a WHERE a.team_id = ? AND a.user_id = ? AND a.role = ?"
                ") RETURNING id",
                [owner, target.id, old_role.name, target.team_id, actor_id, owner],
            )
            if not promoted:
                raise MembershipChanged()
            stepped_down = await execute_raw(
                "UPDATE team_members SET role = ? WHERE team_id = ? AND user_id = ? AND role = ? RETURNING id",
                [admin, target.team_id, actor_id, owner],
            )
            if not stepped_down:  # pragma: no cover -- the promotion's EXISTS saw it, under the lock
                raise MembershipChanged()
            await self.record_activity(
                target.team_id, TeamActivityAction.OWNERSHIP_TRANSFERRED, actor_id=actor_id,
                target_user_id=target.user_id, role=TeamRole.OWNER, old_role=old_role,
            )
            await self.record_activity(
                target.team_id, TeamActivityAction.ROLE_CHANGED, actor_id=actor_id,
                target_user_id=target.user_id, role=TeamRole.OWNER, old_role=old_role,
            )
            await self.record_activity(
                target.team_id, TeamActivityAction.ROLE_CHANGED, actor_id=actor_id,
                target_user_id=actor_id, role=TeamRole.ADMIN, old_role=TeamRole.OWNER,
            )
        await target.refresh()
        return target

    async def remove_member(
        self, member: OxydeTeamMember, *, actor_id: str | None, may_remove_owner: bool = True,
    ) -> bool:
        """Remove a member from a team, logged (MEMBER_REMOVED) in the
        same transaction, whether or not it ended a connection (CHT-1843).
        Actor and target the same: they left.

        False, with nothing logged, when the row was already gone: the
        delete is conditional, so two removals of one membership (two
        admins at once, a retried request) log one row (PR #451 review 3).

        An owner is removed only while another owner remains (CHT-1848),
        checked in the DELETE itself, so two owners leaving at once leave
        one; LastOwnerError otherwise. With ``may_remove_owner`` False
        (the caller may not remove an owner) the DELETE also requires the
        row not to be an owner, so a member made an owner after the
        caller read it is not removed: MembershipChanged. The role logged
        is the one the row held when it was deleted.
        """
        owner = TeamRole.OWNER.name
        guard = f"(role != ? OR {_ANOTHER_OWNER})" if may_remove_owner else "role != ?"
        params = [member.id, owner] + ([member.team_id, owner, member.id] if may_remove_owner else [])
        async with atomic():
            deleted = await execute_raw(
                f"DELETE FROM team_members WHERE id = ? AND {guard} RETURNING role", params,
            )
            if not deleted:
                if await OxydeTeamMember.objects.filter(id=member.id).first() is not None:
                    raise LastOwnerError() if may_remove_owner else MembershipChanged()
                return False
            await self.record_activity(
                member.team_id, TeamActivityAction.MEMBER_REMOVED, actor_id=actor_id,
                target_user_id=member.user_id, role=TeamRole[deleted[0]["role"]],
            )
        return True

    async def record_account_deleted(self, user_id: str) -> None:
        """Log what deleting this account takes from each team (PR #451
        review 1): MEMBER_REMOVED for each membership, and
        INVITATION_CANCELLED for each pending invitation they sent (it
        goes with the account through team_invitations.invited_by's ON
        DELETE CASCADE). Call it inside the delete's transaction, before
        the rows go. The actor is the account itself, the only one that
        can delete it."""
        for member in await OxydeTeamMember.objects.filter(user_id=user_id).all():
            await self.record_activity(
                member.team_id, TeamActivityAction.MEMBER_REMOVED, actor_id=user_id,
                target_user_id=user_id, role=member.role,
            )
        for invitation in await OxydeTeamInvitation.objects.filter(
            invited_by_id=user_id, status=InvitationStatus.PENDING,
        ).all():
            await self.record_activity(
                invitation.team_id, TeamActivityAction.INVITATION_CANCELLED, actor_id=user_id,
                invitation_id=invitation.id, email=invitation.email, role=invitation.role,
            )

    async def create_invitation(
        self,
        team: OxydeTeam,
        invitation_in: TeamInvitationCreate,
        invited_by: OxydeUser,
    ) -> OxydeTeamInvitation:
        """Create a team invitation (logged: INVITATION_CREATED, never the token)."""
        async with atomic():
            invitation = await OxydeTeamInvitation.objects.create(
                team_id=team.id,
                email=invitation_in.email,
                role=invitation_in.role,
                # Travels as a URL path segment; app.log_redaction scrubs
                # it from request logs by that position (CHT-1601).
                token=secrets.token_urlsafe(32),
                invited_by_id=invited_by.id,
                expires_at=datetime.now(timezone.utc) + timedelta(days=7),
            )
            await self.record_activity(
                team.id, TeamActivityAction.INVITATION_CREATED, actor_id=invited_by.id,
                invitation_id=invitation.id, email=invitation_in.email, role=invitation_in.role,
            )
        await invitation.refresh()
        return invitation

    async def get_invitation_by_token(
        self, token: str
    ) -> OxydeTeamInvitation | None:
        """Get invitation by token."""
        return await OxydeTeamInvitation.objects.get_or_none(token=token)

    async def get_team_invitations(
        self, team_id: str
    ) -> list[OxydeTeamInvitation]:
        """Get all pending invitations for a team."""
        return await OxydeTeamInvitation.objects.filter(
            team_id=team_id, status=InvitationStatus.PENDING
        ).all()

    async def get_valid_invitation_by_token(
        self, token: str
    ) -> OxydeTeamInvitation | None:
        """The invitation behind ``token`` if it can still be accepted:
        pending and not expired. None for an unknown, expired, accepted,
        declined or revoked (deleted) one alike (CHT-1265)."""
        invitation = await self.get_invitation_by_token(token)
        if invitation is None or invitation.status != InvitationStatus.PENDING:
            return None
        if ensure_utc(invitation.expires_at) < datetime.now(timezone.utc):
            return None
        return invitation

    async def get_live_invitation(
        self, team_id: str, email: str
    ) -> OxydeTeamInvitation | None:
        """A pending, unexpired invitation to ``email`` for this team, if
        there is one. An expired one does not count: it can't be accepted,
        so a new invitation may replace it.

        ``email`` matches ignoring (ASCII) case, as accounts do (CHT-1804):
        ``bob@x`` and ``Bob@x`` are one address, so one invitation. Compared
        in Python (``same_email``) over the team's pending invitations, not
        with ``email__iexact``, whose Unicode-lowercased argument never
        matches an address with a non-ASCII capital on SQLite."""
        now = datetime.now(timezone.utc)
        if not fold_email(email):
            return None
        pending = await OxydeTeamInvitation.objects.filter(
            team_id=team_id, status=InvitationStatus.PENDING
        ).all()
        return next(
            (i for i in pending if same_email(i.email, email) and ensure_utc(i.expires_at) >= now),
            None,
        )

    async def accept_invitation(
        self, invitation: OxydeTeamInvitation, user: OxydeUser
    ) -> OxydeTeamMember | None:
        """Accept a team invitation; None if it was no longer pending.

        The invitation is claimed with a conditional UPDATE, so two
        accepts of one token cannot both add a member and a used one
        cannot be replayed (CHT-1788). A user who is already a member
        keeps the membership they have: the invitation is used up and
        that membership returned, never a second row.

        Logged as INVITATION_ACCEPTED, with the role of the membership the
        user has afterwards (the invitation's, or the one they kept), and,
        when it created the membership, as MEMBER_ADDED too (with the
        invitation's id), so that ``action=member_added`` lists every join.
        """
        async with atomic():
            claimed = await OxydeTeamInvitation.objects.filter(
                id=invitation.id, status=InvitationStatus.PENDING
            ).update(status=InvitationStatus.ACCEPTED)
            if claimed != 1:
                return None
            member = await self.get_member(invitation.team_id, user.id)
            joined = False
            if member is None:
                try:
                    member = await OxydeTeamMember.objects.create(
                        team_id=invitation.team_id,
                        user_id=user.id,
                        role=invitation.role,
                    )
                    joined = True
                except IntegrityError:
                    # Defence in depth for the unique index (CHT-1791).
                    # Unreachable on SQLite: the claim above already holds
                    # the write lock, so no other writer can insert in
                    # between. Any backend that doesn't serialise writers
                    # gets the existing membership, as above.
                    member = await self.get_member(invitation.team_id, user.id)
                    if member is None:
                        raise
            await self.record_activity(
                invitation.team_id, TeamActivityAction.INVITATION_ACCEPTED, actor_id=user.id,
                target_user_id=user.id, invitation_id=invitation.id, email=invitation.email,
                role=member.role,
            )
            if joined:
                await self.record_activity(
                    invitation.team_id, TeamActivityAction.MEMBER_ADDED, actor_id=user.id,
                    target_user_id=user.id, invitation_id=invitation.id, role=member.role,
                )
        await member.refresh()
        return member

    async def decline_invitation(self, invitation: OxydeTeamInvitation) -> None:
        """Decline a team invitation."""
        invitation.status = InvitationStatus.DECLINED
        await invitation.save(update_fields={"status"})

    async def delete_invitation(self, invitation: OxydeTeamInvitation, *, actor_id: str | None) -> bool:
        """Delete (cancel) a pending invitation; logged as INVITATION_CANCELLED.

        False, with nothing deleted or logged, when it is no longer
        pending: accepted (or cancelled) since the caller read it. The
        delete is conditional, like accept_invitation's claim, so a cancel
        racing an accept cannot remove the accepted invitation and log a
        cancel after the accept (PR #451 review 3)."""
        async with atomic():
            deleted = await OxydeTeamInvitation.objects.filter(
                id=invitation.id, status=InvitationStatus.PENDING,
            ).delete()
            if deleted != 1:
                return False
            await self.record_activity(
                invitation.team_id, TeamActivityAction.INVITATION_CANCELLED, actor_id=actor_id,
                invitation_id=invitation.id, email=invitation.email, role=invitation.role,
            )
        return True

    async def shares_team(self, user_id_a: str, user_id_b: str) -> bool:
        """Check if two users share at least one team (single query)."""
        rows = await execute_raw(
            "SELECT 1 FROM team_members m1 "
            "JOIN team_members m2 ON m1.team_id = m2.team_id "
            "WHERE m1.user_id = ? AND m2.user_id = ? LIMIT 1",
            [user_id_a, user_id_b],
        )
        return len(rows) > 0

    async def is_team_admin(self, team_id: str, user_id: str) -> bool:
        """Check if user is team admin or owner."""
        member = await self.get_member(team_id, user_id)
        if not member:
            return False
        return member.role in [TeamRole.OWNER, TeamRole.ADMIN]
