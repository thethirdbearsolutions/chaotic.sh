"""API Key service for managing API keys.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
import asyncio
import hashlib
import hmac
import secrets
from datetime import datetime, timedelta, timezone

from app.oxyde_models.api_key import OxydeAPIKey
from app.schemas.api_key import APIKeyCreate
from app.utils.security import verify_password

# Type alias for API compatibility
APIKey = OxydeAPIKey

# How API keys are stored (CHT-1369). A `ck_` key is 256 bits from
# secrets.token_hex, so a plain SHA-256 digest compared in constant time is
# cryptographically sufficient: bcrypt exists to slow down guessing of
# LOW-entropy secrets (passwords), and its ~260 ms per check was paid on
# every stateless /mcp request. Stored as "sha256$<hex>" so the format is
# self-describing next to the legacy bcrypt hashes ("$2b$..."), which keep
# verifying (off the event loop) and are re-hashed to SHA-256 on their next
# successful use, so a rotation is never required.
SHA256_HASH_PREFIX = "sha256$"

# `last_used_at` is informational ("is this key still in use?"); writing it
# on every request turned each stateless MCP call into a DB write. Coalesce
# to at most one write per key per interval.
LAST_USED_WRITE_INTERVAL = timedelta(seconds=60)


def _prehash_key(key: str) -> str:
    """SHA-256 hex digest of a key. For LEGACY bcrypt rows this was the
    bcrypt input (bcrypt truncates past 72 bytes; keys are 67 chars, and
    prehashing kept that safe); for current rows the same digest IS the
    stored value, behind SHA256_HASH_PREFIX.
    """
    return hashlib.sha256(key.encode()).hexdigest()


def _sha256_key_hash(key: str) -> str:
    return SHA256_HASH_PREFIX + _prehash_key(key)


# Modular-crypt prefix of every bcrypt variant ("$2a$", "$2b$", "$2y$").
_BCRYPT_HASH_PREFIX = "$2"


def _is_legacy_bcrypt_hash(key_hash: str) -> bool:
    return key_hash.startswith(_BCRYPT_HASH_PREFIX)


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
        key_hash = _sha256_key_hash(full_key)

        api_key = await OxydeAPIKey.objects.create(
            user_id=user_id,
            name=api_key_in.name,
            key_prefix=key_prefix,
            key_hash=key_hash,
            expires_at=api_key_in.expires_at,
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

        update_fields: set[str] = set()
        if api_key.key_hash.startswith(SHA256_HASH_PREFIX):
            if not hmac.compare_digest(api_key.key_hash, _sha256_key_hash(full_key)):
                return None
        elif _is_legacy_bcrypt_hash(api_key.key_hash):
            # bcrypt is CPU-bound and synchronous: keep it off the event loop
            # so one legacy key's ~260 ms cannot stall every other request.
            try:
                ok = await asyncio.to_thread(verify_password, _prehash_key(full_key), api_key.key_hash)
            except ValueError:
                # "$2..." but not a well-formed bcrypt string ("Invalid salt"):
                # fail closed as a bad credential rather than a 500.
                return None
            if not ok:
                return None
            # Opportunistic upgrade: the caller just proved they hold the key,
            # so its SHA-256 digest can be stored and bcrypt is never paid again.
            api_key.key_hash = _sha256_key_hash(full_key)
            update_fields.add("key_hash")
        else:
            # Neither format: a corrupted or foreign row. bcrypt would raise
            # ("Invalid salt") and turn a bad credential into a 500; a key
            # whose stored hash cannot be checked simply does not validate.
            return None

        now = datetime.now(timezone.utc)
        # `> now` covers a stamp from a fast clock or a restored DB, which
        # would otherwise freeze the field until wall-clock caught up.
        if (
            api_key.last_used_at is None
            or api_key.last_used_at > now
            or now - api_key.last_used_at >= LAST_USED_WRITE_INTERVAL
        ):
            api_key.last_used_at = now
            update_fields.add("last_used_at")
        if update_fields:
            await api_key.save(update_fields=update_fields)

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
