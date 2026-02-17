"""User service for user management.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
from datetime import datetime, timezone
from app.oxyde_models.user import OxydeUser
from app.schemas.user import UserCreate, UserUpdate
from app.utils.security import get_password_hash, verify_password

# Type alias: callers still see "User" but it's now an Oxyde model
User = OxydeUser


class UserService:
    """Service for user operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        # Oxyde uses a global connection registry, no session injection needed.
        pass

    async def create(self, user_in: UserCreate) -> OxydeUser:
        """Create a new user."""
        user = await OxydeUser.objects.create(
            email=user_in.email,
            hashed_password=get_password_hash(user_in.password),
            name=user_in.name,
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
        """Delete a user and cascade to child records."""
        from oxyde import atomic
        from app.oxyde_models.team import OxydeTeamMember, OxydeTeamInvitation
        from app.oxyde_models.api_key import OxydeAPIKey

        async with atomic():
            await OxydeTeamMember.objects.filter(user_id=user.id).delete()
            await OxydeTeamInvitation.objects.filter(email=user.email).delete()
            await OxydeAPIKey.objects.filter(user_id=user.id).delete()
            await user.delete()

    async def list_users(self, skip: int = 0, limit: int = 100) -> list[OxydeUser]:
        """List all users."""
        return await OxydeUser.objects.offset(skip).limit(limit).all()
