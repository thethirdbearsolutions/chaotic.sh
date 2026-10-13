"""API Key service for managing API keys.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
import asyncio
import hashlib
import hmac
import logging
from datetime import datetime, timedelta, timezone

from oxyde import atomic

from app.oxyde_models.api_key import OxydeAPIKey
from app.schemas.api_key import APIKeyCreate
from app.services.token_service import API_KEY_PREFIX, mint_secret
from app.utils.security import verify_password

logger = logging.getLogger(__name__)

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


def _usable(api_key: OxydeAPIKey, now: datetime) -> bool:
    """Active and not expired: a row that may sign in."""
    return api_key.is_active and not (api_key.expires_at and api_key.expires_at < now)


class AgentKeyNeedsHolderError(ValueError):
    """APIKeyService.create was asked for an agent's key without naming
    the human who holds it (CHT-1537)."""


class APIKeyService:
    """Service for API key operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        pass

    def _generate_key(self) -> str:
        """Generate a new API key."""
        # Format: ck_<64 hex chars>
        return mint_secret(API_KEY_PREFIX)

    def _get_prefix(self, key: str) -> str:
        """Extract the prefix from a key for identification."""
        # Return first 11 chars: "ck_" + first 8 hex chars
        return key[:11]

    async def create(
        self, principal_user_id: str, api_key_in: APIKeyCreate, holder_user_id: str | None = None,
    ) -> tuple[OxydeAPIKey, str]:
        """Create a new API key that signs in as `principal_user_id` and is
        held by `holder_user_id` (CHT-1537). Leaving the holder out makes
        the principal hold it, which is what a human's own key is. An
        agent's key must name the human who answers for it: an agent is
        no team member, so a key it held itself would never sign in, and
        that mistake raises AgentKeyNeedsHolderError instead of minting a
        dead key. Returns (api_key_model, full_key)."""
        if holder_user_id is None:
            from app.oxyde_models.user import OxydeUser

            principal = await OxydeUser.objects.get_or_none(id=principal_user_id)
            if principal is not None and principal.is_agent:
                raise AgentKeyNeedsHolderError(
                    f"An API key for agent {principal_user_id} needs a holder_user_id: "
                    "the human who answers for it"
                )
        full_key = self._generate_key()
        key_prefix = self._get_prefix(full_key)
        key_hash = _sha256_key_hash(full_key)

        api_key = await OxydeAPIKey.objects.create(
            principal_user_id=principal_user_id,
            holder_user_id=holder_user_id if holder_user_id is not None else principal_user_id,
            name=api_key_in.name,
            key_prefix=key_prefix,
            key_hash=key_hash,
            expires_at=api_key_in.expires_at,
        )
        await api_key.refresh()

        return api_key, full_key

    async def is_live(self, api_key_id: str) -> bool:
        """Does the key with this id exist, active and unexpired? For a
        credential something else hangs off (a claim holder session's
        ``credential_id``, CHT-1576), checked without its secret."""
        api_key = await self.get_by_id(api_key_id)
        return api_key is not None and _usable(api_key, datetime.now(timezone.utc))

    async def get_by_id(self, api_key_id: str) -> OxydeAPIKey | None:
        """Get API key by ID."""
        return await OxydeAPIKey.objects.get_or_none(id=api_key_id)

    async def find_by_key(self, full_key: str) -> tuple[OxydeAPIKey | None, bool]:
        """The active, unexpired row `full_key` belongs to, or None. The
        second value says the row is a legacy bcrypt row that `full_key`
        just verified against, so its hash can be upgraded.

        Current rows are found by their SHA-256 digest, which is unique
        (`ux_api_keys_key_hash`, CHT-1534). The 11-character display prefix
        is 32 bits and shared by unrelated keys (CHT-1554), so it is never
        trusted to name one row: it only narrows the legacy bcrypt rows a
        key could belong to, and each of those is checked in turn.

        Revoked and expired rows are never returned, and a legacy one is
        never bcrypt-checked: it can never sign in, so it is never upgraded,
        and checking it would cost every forged key under its prefix a
        bcrypt round forever.
        """
        if not full_key.startswith("ck_"):
            return None, False

        now = datetime.now(timezone.utc)
        expected = _sha256_key_hash(full_key)
        api_key = await OxydeAPIKey.objects.get_or_none(key_hash=expected)
        if api_key is not None:
            # The index already matched on equality; the constant-time
            # compare keeps the check itself independent of where the
            # strings differ, whatever the database did to find the row.
            if hmac.compare_digest(api_key.key_hash, expected) and _usable(api_key, now):
                return api_key, False
            return None, False

        # Legacy bcrypt rows (pre CHT-1369) are salted, so they can only be
        # found by prefix. Several rows may share it: try each.
        candidates = await OxydeAPIKey.objects.filter(
            key_prefix=self._get_prefix(full_key), is_active=True,
        ).all()
        for candidate in candidates:
            if not _usable(candidate, now):
                continue
            if hmac.compare_digest(candidate.key_hash, expected):
                # A concurrent request with this same key upgraded the row
                # between the digest lookup above and this read. It is this
                # key's row, already upgraded.
                return candidate, False
            if not _is_legacy_bcrypt_hash(candidate.key_hash):
                continue
            # bcrypt is CPU-bound and synchronous: keep it off the event loop
            # so one legacy key's ~260 ms cannot stall every other request.
            try:
                ok = await asyncio.to_thread(verify_password, _prehash_key(full_key), candidate.key_hash)
            except ValueError:
                # "$2..." but not a well-formed bcrypt string ("Invalid salt"):
                # not this key, rather than a 500.
                continue
            if ok:
                return candidate, True
        # A row in neither format (corrupted or foreign) matches nothing.
        return None, False

    async def validate_key(self, full_key: str) -> OxydeAPIKey | None:
        """Validate an API key and return the associated key record if valid."""
        api_key, legacy = await self.find_by_key(full_key)

        if not api_key or not _usable(api_key, datetime.now(timezone.utc)):
            return None

        update_fields: set[str] = set()
        if legacy:
            # Opportunistic upgrade: the caller just proved they hold the key,
            # so its SHA-256 digest can be stored and bcrypt is never paid again.
            # The id only: the prefix is 32 bits of the secret (CHT-1555
            # retires this path once the line stops appearing).
            logger.info("API key id %s signed in with a legacy bcrypt hash; upgrading it to SHA-256", api_key.id)
            api_key.key_hash = _sha256_key_hash(full_key)
            update_fields.add("key_hash")

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

    async def list_by_holder(self, user_id: str) -> list[OxydeAPIKey]:
        """Every API key `user_id` holds, newest first: their own, and the
        ones they hold for agents (CHT-1508, CHT-1537)."""
        return await OxydeAPIKey.objects.filter(
            holder_user_id=user_id
        ).order_by("-created_at").all()

    async def list_by_principal(self, user_id: str) -> list[OxydeAPIKey]:
        """Every API key that signs in as `user_id`, newest first."""
        return await OxydeAPIKey.objects.filter(
            principal_user_id=user_id
        ).order_by("-created_at").all()

    async def revoke(self, api_key: OxydeAPIKey, *, actor_id: str | None = None) -> OxydeAPIKey:
        """Revoke an API key, and in the same transaction the holder
        sessions opened with it and the unredeemed claim tickets it minted
        (CHT-1523; RevocationService)."""
        from app.services.revocation_service import RevocationService

        async with atomic():
            api_key.is_active = False
            await api_key.save(update_fields={"is_active"})
            await RevocationService().revoke_for_keys([api_key.id], actor_id=actor_id)
        await api_key.refresh()
        return api_key

    async def delete(self, api_key: OxydeAPIKey) -> None:
        """Delete an API key."""
        await api_key.delete()
