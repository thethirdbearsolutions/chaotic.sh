"""API Key service for managing API keys.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
import hashlib
import secrets
from datetime import datetime, timezone
from app.oxyde_models.api_key import OxydeAPIKey
from app.schemas.api_key import APIKeyCreate
from app.utils.security import get_password_hash, verify_password

# Type alias for API compatibility
APIKey = OxydeAPIKey


def _prehash_key(key: str) -> str:
    """Prehash API key with SHA256 to fit bcrypt's 72-byte limit.

    bcrypt truncates inputs >72 bytes. API keys are 67 chars which should fit,
    but prehashing ensures consistent behavior and allows longer keys in future.
    """
    return hashlib.sha256(key.encode()).hexdigest()


class APIKeyService:
    """Service for API key operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        pass

    def _generate_key(self) -> str:
        """Generate a new API key."""
        # Format: ck_<64 hex chars>
        random_bytes = secrets.token_hex(32)  # 64 hex chars
        return f"ck_{random_bytes}"

    def _get_prefix(self, key: str) -> str:
        """Extract the prefix from a key for identification."""
        # Return first 11 chars: "ck_" + first 8 hex chars
        return key[:11]

    async def create(self, user_id: str, api_key_in: APIKeyCreate) -> tuple[OxydeAPIKey, str]:
        """Create a new API key. Returns (api_key_model, full_key)."""
        full_key = self._generate_key()
        key_prefix = self._get_prefix(full_key)
        key_hash = get_password_hash(_prehash_key(full_key))

        api_key = await OxydeAPIKey.objects.create(
            user_id=user_id,
            name=api_key_in.name,
            key_prefix=key_prefix,
            key_hash=key_hash,
        )
        await api_key.refresh()

        return api_key, full_key

    async def get_by_id(self, api_key_id: str) -> OxydeAPIKey | None:
        """Get API key by ID."""
        return await OxydeAPIKey.objects.get_or_none(id=api_key_id)

    async def get_by_prefix(self, key_prefix: str) -> OxydeAPIKey | None:
        """Get API key by prefix."""
        return await OxydeAPIKey.objects.get_or_none(key_prefix=key_prefix)

    async def validate_key(self, full_key: str) -> OxydeAPIKey | None:
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
        await api_key.save(update_fields={"last_used_at"})

        return api_key

    async def list_by_user(self, user_id: str) -> list[OxydeAPIKey]:
        """List all API keys for a user."""
        return await OxydeAPIKey.objects.filter(
            user_id=user_id
        ).order_by("-created_at").all()

    async def revoke(self, api_key: OxydeAPIKey) -> OxydeAPIKey:
        """Revoke an API key."""
        api_key.is_active = False
        await api_key.save(update_fields={"is_active"})
        await api_key.refresh()
        return api_key

    async def delete(self, api_key: OxydeAPIKey) -> None:
        """Delete an API key."""
        await api_key.delete()
