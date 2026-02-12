"""API Key service for managing API keys."""
import hashlib
import secrets
from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.api_key import APIKey
from app.schemas.api_key import APIKeyCreate
from app.utils.security import get_password_hash, verify_password


def _prehash_key(key: str) -> str:
    """Prehash API key with SHA256 to fit bcrypt's 72-byte limit.

    bcrypt truncates inputs >72 bytes. API keys are 67 chars which should fit,
    but prehashing ensures consistent behavior and allows longer keys in future.
    """
    return hashlib.sha256(key.encode()).hexdigest()


class APIKeyService:
    """Service for API key operations."""

    def __init__(self, db: AsyncSession):
        self.db = db

    def _generate_key(self) -> str:
        """Generate a new API key."""
        # Format: ck_<64 hex chars>
        random_bytes = secrets.token_hex(32)  # 64 hex chars
        return f"ck_{random_bytes}"

    def _get_prefix(self, key: str) -> str:
        """Extract the prefix from a key for identification."""
        # Return first 11 chars: "ck_" + first 8 hex chars
        return key[:11]

    async def create(self, user_id: str, api_key_in: APIKeyCreate) -> tuple[APIKey, str]:
        """Create a new API key. Returns (api_key_model, full_key)."""
        full_key = self._generate_key()
        key_prefix = self._get_prefix(full_key)
        key_hash = get_password_hash(_prehash_key(full_key))

        api_key = APIKey(
            user_id=user_id,
            name=api_key_in.name,
            key_prefix=key_prefix,
            key_hash=key_hash,
        )
        self.db.add(api_key)
        await self.db.commit()
        await self.db.refresh(api_key)

        return api_key, full_key

    async def get_by_id(self, api_key_id: str) -> APIKey | None:
        """Get API key by ID."""
        result = await self.db.execute(
            select(APIKey).where(APIKey.id == api_key_id)
        )
        return result.scalar_one_or_none()

    async def get_by_prefix(self, key_prefix: str) -> APIKey | None:
        """Get API key by prefix."""
        result = await self.db.execute(
            select(APIKey).where(APIKey.key_prefix == key_prefix)
        )
        return result.scalar_one_or_none()

    async def validate_key(self, full_key: str) -> APIKey | None:
        """Validate an API key and return the associated key record if valid."""
        if not full_key.startswith("ck_"):
            return None

        key_prefix = self._get_prefix(full_key)
        api_key = await self.get_by_prefix(key_prefix)

        if not api_key:
            return None

        if not api_key.is_active:
            return None

        if api_key.expires_at and api_key.expires_at < datetime.now(timezone.utc):
            return None

        if not verify_password(_prehash_key(full_key), api_key.key_hash):
            return None

        # Update last_used_at
        api_key.last_used_at = datetime.now(timezone.utc)
        await self.db.commit()

        return api_key

    async def list_by_user(self, user_id: str) -> list[APIKey]:
        """List all API keys for a user."""
        result = await self.db.execute(
            select(APIKey)
            .where(APIKey.user_id == user_id)
            .order_by(APIKey.created_at.desc())
        )
        return list(result.scalars().all())

    async def revoke(self, api_key: APIKey) -> APIKey:
        """Revoke an API key."""
        api_key.is_active = False
        await self.db.commit()
        await self.db.refresh(api_key)
        return api_key

    async def delete(self, api_key: APIKey) -> None:
        """Delete an API key."""
        await self.db.delete(api_key)
        await self.db.commit()
