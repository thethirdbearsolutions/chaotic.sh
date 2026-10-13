"""User service for user management.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
from datetime import datetime, timezone
from app.oxyde_models.user import OxydeUser
from app.schemas.user import UserCreate, UserUpdate
from app.utils.security import get_password_hash, verify_password
from oxyde import atomic
from app.oxyde_models.team import OxydeTeamMember, OxydeTeamInvitation
from app.oxyde_models.api_key import OxydeAPIKey
from app.services.agent_service import AgentService, describe_counts
from app.services.revocation_service import REASON_PRINCIPAL_DELETED, RevocationService

# Type alias: callers still see "User" but it's now an Oxyde model
User = OxydeUser


def _label(user: OxydeUser) -> str:
    """'Name' (id prefix): names are not unique, ids are unreadable."""
    return f"'{user.name}' ({user.id[:8]})"


class UserDeletionRefusedError(Exception):
    """Refused (CHT-1467): deleting the user would erase who wrote
    something -- the user, or an agent they own, authored work (the agent
    rule is CHT-1427's) -- or would have to delete a user row that names
    them as its parent but is not an agent.

    `counts` is the user's own authored_counts(); `agent_counts` maps the
    id of each agent that authored anything to its counts, and
    `agent_names` that id to the agent's name; `non_agent_children` lists
    the ids of rows with parent_user_id = the user and is_agent false.
    """

    def __init__(
        self,
        user: OxydeUser,
        counts: dict[str, int],
        agents_with_work: list[tuple[OxydeUser, dict[str, int]]],
        non_agent_children: list[OxydeUser],
    ):
        self.counts = counts
        self.agent_counts = {agent.id: per_agent for agent, per_agent in agents_with_work}
        self.agent_names = {agent.id: agent.name for agent, _ in agents_with_work}
        self.non_agent_children = [child.id for child in non_agent_children]
        reasons = []
        if any(counts.values()):
            reasons.append(f"it authored {describe_counts(counts)}")
        for agent, per_agent in agents_with_work:
            reasons.append(f"its agent {_label(agent)} authored {describe_counts(per_agent)}")
        if non_agent_children:
            listed = ", ".join(_label(child) for child in non_agent_children)
            reasons.append(
                f"user(s) {listed} name it as their parent but are not agents, so deleting it "
                "would delete them (an operator must clear their parent_user_id)"
            )
        detail = "; ".join(reasons)
        tail = (
            " Deleting the account would leave that work without an author."
            if any(counts.values()) or agents_with_work else ""
        )
        super().__init__(f"User {_label(user)} cannot be deleted: {detail}.{tail}")


class UserService:
    """Service for user operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        # Oxyde uses a global connection registry, no session injection needed.
        pass

    async def create(self, user_in: UserCreate) -> OxydeUser:
        """Create a new user."""
        # Pass timestamps explicitly: the installed Oxyde version doesn't
        # apply `default_factory` defaults on objects.create(), so the
        # NOT NULL constraints on users.created_at / users.updated_at
        # blow up the INSERT otherwise.
        now = datetime.now(timezone.utc)
        user = await OxydeUser.objects.create(
            email=user_in.email,
            hashed_password=get_password_hash(user_in.password),
            name=user_in.name,
            created_at=now,
            updated_at=now,
        )
        await user.refresh()
        return user

    async def get_by_id(self, user_id: str) -> OxydeUser | None:
        """Get user by ID."""
        return await OxydeUser.objects.get_or_none(id=user_id)

    async def get_by_email(self, email: str) -> OxydeUser | None:
        """Get user by email."""
        return await OxydeUser.objects.get_or_none(email=email)

    async def authenticate(self, email: str, password: str) -> OxydeUser | None:
        """Authenticate a user."""
        user = await self.get_by_email(email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    async def update(self, user: OxydeUser, user_in: UserUpdate) -> OxydeUser:
        """Update a user."""
        update_data = user_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)
        user.updated_at = datetime.now(timezone.utc)
        await user.save(update_fields=set(update_data.keys()) | {"updated_at"})
        if "name" in update_data:
            # Inbox entries show who triggered them (CHT-1607).
            from app.services.inbox_service import InboxService
            await InboxService().touch_safely(source_user_id=user.id)
        await user.refresh()
        return user

    async def delete(self, user: OxydeUser) -> None:
        """Delete a user, their agents and their memberships, invitations
        and API keys -- only if neither they nor any of their agents
        authored anything.

        Otherwise UserDeletionRefusedError (CHT-1467): the same rule
        AgentService.delete applies to one agent, applied to the account
        and every agent it owns, so deleting the owner cannot be used to
        get around it. The agents are deleted here, explicitly; the
        database's users.parent_user_id is ON DELETE RESTRICT (0020), so
        deleting a human who still has agents fails rather than cascades.
        A row naming the user as parent that is not an agent is never
        deleted along with them: its presence refuses the delete too.
        """
        agent_service = AgentService()
        async with atomic():
            # Every row that names the user as parent, agent or not: the
            # RESTRICT applies to all of them (CHT-1467's review).
            children = await OxydeUser.objects.filter(
                parent_user_id=user.id
            ).order_by("created_at").all()
            agents = [child for child in children if child.is_agent]
            non_agent_children = [child for child in children if not child.is_agent]
            counts = await agent_service.authored_counts(user.id)
            agents_with_work = []
            for agent in agents:
                per_agent = await agent_service.authored_counts(agent.id)
                if any(per_agent.values()):
                    agents_with_work.append((agent, per_agent))
            if any(counts.values()) or agents_with_work or non_agent_children:
                raise UserDeletionRefusedError(user, counts, agents_with_work, non_agent_children)
            # Identities they (as a person registering for themself) or any
            # of their registrars registered are retired, not left alive
            # without a registrar (CHT-1498); ones they own are deleted
            # below with their other agents.
            await agent_service._retire_identities(user.id)
            # The deletes below cascade their sessions away; revoking them
            # first moves the revocation epoch, so no cached validation
            # outlives the account (CHT-1523).
            revocations = RevocationService()
            await revocations.revoke_for_principals(
                [user.id], actor_id=None, reason=REASON_PRINCIPAL_DELETED, as_holder=True,
            )
            await revocations.revoke_for_principals(
                [agent.id for agent in agents], actor_id=None, reason=REASON_PRINCIPAL_DELETED,
            )
            for agent in agents:
                await agent_service._retire_identities(agent.id)
                await OxydeAPIKey.objects.filter(principal_user_id=agent.id).delete()
                await agent.delete()
            await OxydeTeamMember.objects.filter(user_id=user.id).delete()
            await OxydeTeamInvitation.objects.filter(email=user.email).delete()
            # Their own keys, and the ones they hold for other people's
            # agents (CHT-1537).
            await OxydeAPIKey.objects.filter(principal_user_id=user.id).delete()
            await OxydeAPIKey.objects.filter(holder_user_id=user.id).delete()
            await user.delete()

    async def list_users(self, skip: int = 0, limit: int = 100) -> list[OxydeUser]:
        """List all users."""
        return await OxydeUser.objects.offset(skip).limit(limit).all()
