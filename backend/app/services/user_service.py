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
from app.services.agent_service import AgentService

# Type alias: callers still see "User" but it's now an Oxyde model
User = OxydeUser


def _listed(counts: dict[str, int]) -> str:
    return ", ".join(f"{n} {kind}" for kind, n in counts.items() if n)


class UserHasAuthoredContentError(Exception):
    """Refused: the user, or an agent they own, wrote things, and deleting
    the account would erase who wrote them (CHT-1467; the agent rule is
    CHT-1427's). `counts` is the user's own, `agent_counts` maps each
    agent that authored anything (by name) to its counts."""

    def __init__(self, user_name: str, counts: dict[str, int], agent_counts: dict[str, dict[str, int]]):
        self.counts = counts
        self.agent_counts = agent_counts
        reasons = []
        if any(counts.values()):
            reasons.append(f"it authored {_listed(counts)}")
        for agent_name, per_agent in agent_counts.items():
            reasons.append(f"its agent '{agent_name}' authored {_listed(per_agent)}")
        super().__init__(
            f"User '{user_name}' cannot be deleted: {'; '.join(reasons)}. Deleting the account "
            "would leave that work without an author."
        )


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
        await user.refresh()
        return user

    async def delete(self, user: OxydeUser) -> None:
        """Delete a user, their agents and their memberships, invitations
        and API keys -- only if neither they nor any of their agents
        authored anything.

        Otherwise UserHasAuthoredContentError (CHT-1467): the same rule
        AgentService.delete applies to one agent, applied to the account
        and every agent it owns, so deleting the owner cannot be used to
        get around it. The agents are deleted here, explicitly; the
        database's users.parent_user_id is ON DELETE RESTRICT (0020), so
        deleting a human who still has agents fails rather than cascades.
        """
        agent_service = AgentService()
        async with atomic():
            agents = await OxydeUser.objects.filter(
                is_agent=True, parent_user_id=user.id
            ).order_by("created_at").all()
            counts = await agent_service.authored_counts(user.id)
            agent_counts = {}
            for agent in agents:
                per_agent = await agent_service.authored_counts(agent.id)
                if any(per_agent.values()):
                    agent_counts[agent.name] = per_agent
            if any(counts.values()) or agent_counts:
                raise UserHasAuthoredContentError(user.name, counts, agent_counts)
            for agent in agents:
                await OxydeAPIKey.objects.filter(agent_user_id=agent.id).delete()
                await OxydeAPIKey.objects.filter(user_id=agent.id).delete()
                await agent.delete()
            await OxydeTeamMember.objects.filter(user_id=user.id).delete()
            await OxydeTeamInvitation.objects.filter(email=user.email).delete()
            await OxydeAPIKey.objects.filter(user_id=user.id).delete()
            await user.delete()

    async def list_users(self, skip: int = 0, limit: int = 100) -> list[OxydeUser]:
        """List all users."""
        return await OxydeUser.objects.offset(skip).limit(limit).all()
