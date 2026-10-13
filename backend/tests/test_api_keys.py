"""Tests for API key service.

These tests ensure the API key hashing and validation works correctly,
preventing regressions like the bcrypt compatibility issue (CHT-110).
"""
import pytest
from datetime import datetime, timedelta, timezone

from app.services.api_key_service import APIKeyService, _prehash_key
from app.schemas.api_key import APIKeyCreate
from app.oxyde_models.api_key import OxydeAPIKey


class TestPrehashKey:
    """Tests for the _prehash_key function."""

    def test_prehash_returns_hex_string(self):
        """Prehash should return a hex string."""
        result = _prehash_key("test_key")
        assert isinstance(result, str)
        # SHA256 produces 64 hex chars
        assert len(result) == 64
        # Should be valid hex
        int(result, 16)

    def test_prehash_is_deterministic(self):
        """Same input should produce same output."""
        key = "ck_abc123"
        assert _prehash_key(key) == _prehash_key(key)

    def test_prehash_different_inputs_different_outputs(self):
        """Different inputs should produce different outputs."""
        assert _prehash_key("key1") != _prehash_key("key2")

    def test_prehash_output_fits_bcrypt(self):
        """Prehash output should be under bcrypt's 72-byte limit."""
        result = _prehash_key("any_key")
        assert len(result.encode()) <= 72


class TestAPIKeyServiceKeyGeneration:
    """Tests for API key generation."""

    def test_generate_key_format(self, db):
        """Generated key should have correct format."""
        service = APIKeyService()
        key = service._generate_key()

        assert key.startswith("ck_")
        # ck_ + 64 hex chars = 67 total
        assert len(key) == 67

    def test_generate_key_is_unique(self, db):
        """Each generated key should be unique."""
        service = APIKeyService()
        keys = [service._generate_key() for _ in range(100)]
        assert len(set(keys)) == 100

    def test_get_prefix(self, db):
        """Prefix extraction should work correctly."""
        service = APIKeyService()
        key = "ck_abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
        prefix = service._get_prefix(key)

        assert prefix == "ck_abcdef12"
        assert len(prefix) == 11


@pytest.mark.asyncio
class TestAPIKeyServiceCreate:
    """Tests for API key creation."""

    async def test_create_returns_key_and_model(self, db, test_user):
        """Create should return both the model and full key."""
        service = APIKeyService()
        api_key_in = APIKeyCreate(name="Test Key")

        api_key, full_key = await service.create(test_user.id, api_key_in)

        assert api_key is not None
        assert api_key.name == "Test Key"
        assert api_key.principal_user_id == test_user.id
        assert api_key.holder_user_id == test_user.id
        assert full_key.startswith("ck_")

    async def test_create_stores_hashed_key(self, db, test_user):
        """Created key should be stored as hash, not plaintext."""
        service = APIKeyService()
        api_key_in = APIKeyCreate(name="Test Key")

        api_key, full_key = await service.create(test_user.id, api_key_in)

        # Hash should not equal the key, and the stored form is self-describing
        assert api_key.key_hash != full_key
        assert api_key.key_hash == "sha256$" + _prehash_key(full_key)

    async def test_create_stores_correct_prefix(self, db, test_user):
        """Created key should have correct prefix stored."""
        service = APIKeyService()
        api_key_in = APIKeyCreate(name="Test Key")

        api_key, full_key = await service.create(test_user.id, api_key_in)

        assert api_key.key_prefix == full_key[:11]


@pytest.mark.asyncio
class TestAPIKeyServiceValidation:
    """Tests for API key validation."""

    async def test_validate_correct_key(self, db, test_user):
        """Valid key should be accepted."""
        service = APIKeyService()
        api_key_in = APIKeyCreate(name="Test Key")
        _, full_key = await service.create(test_user.id, api_key_in)

        result = await service.validate_key(full_key)

        assert result is not None
        assert result.name == "Test Key"

    async def test_validate_wrong_key(self, db, test_user):
        """Wrong key should be rejected."""
        service = APIKeyService()
        api_key_in = APIKeyCreate(name="Test Key")
        await service.create(test_user.id, api_key_in)

        result = await service.validate_key("ck_wrongkeywrongkeywrongkeywrongkeywrongkeywrongkeywrongkeywrongkey")

        assert result is None

    async def test_validate_invalid_format(self, db):
        """Key without ck_ prefix should be rejected."""
        service = APIKeyService()

        result = await service.validate_key("not_a_valid_key")

        assert result is None

    async def test_validate_inactive_key(self, db, test_user):
        """Inactive key should be rejected."""
        service = APIKeyService()
        api_key_in = APIKeyCreate(name="Test Key")
        api_key, full_key = await service.create(test_user.id, api_key_in)

        # Revoke the key
        await service.revoke(api_key)

        result = await service.validate_key(full_key)

        assert result is None

    async def test_validate_expired_key(self, db, test_user):
        """Expired key should be rejected."""
        service = APIKeyService()
        api_key_in = APIKeyCreate(name="Test Key")
        api_key, full_key = await service.create(test_user.id, api_key_in)

        # Set expiration to the past
        api_key.expires_at = datetime.now(timezone.utc) - timedelta(hours=1)
        await api_key.save(update_fields={"expires_at"})

        result = await service.validate_key(full_key)

        assert result is None

    async def test_validate_updates_last_used(self, db, test_user):
        """Successful validation should update last_used_at."""
        service = APIKeyService()
        api_key_in = APIKeyCreate(name="Test Key")
        api_key, full_key = await service.create(test_user.id, api_key_in)

        assert api_key.last_used_at is None

        result = await service.validate_key(full_key)

        assert result.last_used_at is not None


@pytest.mark.asyncio
class TestAPIKeyServiceOperations:
    """Tests for other API key operations."""

    async def test_list_by_holder(self, db, test_user, test_user2):
        """Should only list keys for the specified user."""
        service = APIKeyService()

        # Create keys for both users
        await service.create(test_user.id, APIKeyCreate(name="User1 Key1"))
        await service.create(test_user.id, APIKeyCreate(name="User1 Key2"))
        await service.create(test_user2.id, APIKeyCreate(name="User2 Key"))

        user1_keys = await service.list_by_holder(test_user.id)
        user2_keys = await service.list_by_holder(test_user2.id)

        assert len(user1_keys) == 2
        assert len(user2_keys) == 1

    async def test_revoke_deactivates_key(self, db, test_user):
        """Revoke should deactivate the key."""
        service = APIKeyService()
        api_key_in = APIKeyCreate(name="Test Key")
        api_key, _ = await service.create(test_user.id, api_key_in)

        assert api_key.is_active is True

        revoked = await service.revoke(api_key)

        assert revoked.is_active is False

    async def test_delete_removes_key(self, db, test_user):
        """Delete should remove the key from database."""
        service = APIKeyService()
        api_key_in = APIKeyCreate(name="Test Key")
        api_key, _ = await service.create(test_user.id, api_key_in)
        key_id = api_key.id

        await service.delete(api_key)

        result = await service.get_by_id(key_id)
        assert result is None


@pytest.mark.asyncio
class TestBcryptCompatibility:
    """Hash-format tests. Historically bcrypt compatibility (the 72-byte
    limit, passlib/bcrypt versions); since CHT-1369 new keys are SHA-256
    and bcrypt only has to keep verifying rows created before that.
    """

    async def test_long_key_validation(self, db, test_user):
        """Even with prehashing, validation should work for any key length."""
        service = APIKeyService()
        api_key_in = APIKeyCreate(name="Test Key")
        _, full_key = await service.create(test_user.id, api_key_in)

        # Key is 67 bytes, prehash is 64 bytes - both under 72
        result = await service.validate_key(full_key)
        assert result is not None

    async def test_hash_is_sha256_format(self, db, test_user):
        """New keys are stored as "sha256$<hex>" (CHT-1369): 256-bit random
        keys need no slow hash, and bcrypt's ~260 ms was paid on every
        stateless /mcp request."""
        service = APIKeyService()
        api_key_in = APIKeyCreate(name="Test Key")
        api_key, _ = await service.create(test_user.id, api_key_in)

        assert api_key.key_hash.startswith("sha256$")
        assert len(api_key.key_hash) == len("sha256$") + 64

    async def test_legacy_bcrypt_hash_still_validates_and_is_upgraded(self, db, test_user):
        """A key created before CHT-1369 (bcrypt over the SHA-256 prehash)
        keeps working, and its row is re-hashed to SHA-256 on first use so
        bcrypt is never paid again for it."""
        from app.oxyde_models.api_key import OxydeAPIKey
        from app.utils.security import get_password_hash

        service = APIKeyService()
        full_key = service._generate_key()
        legacy = await OxydeAPIKey.objects.create(
            principal_user_id=test_user.id, holder_user_id=test_user.id, name="legacy", key_prefix=service._get_prefix(full_key),
            key_hash=get_password_hash(_prehash_key(full_key)),
        )
        assert legacy.key_hash.startswith("$2")

        assert await service.validate_key("ck_" + "0" * 64) is None  # wrong key, same length
        wrong_same_prefix = full_key[:-1] + ("0" if full_key[-1] != "0" else "1")
        assert await service.validate_key(wrong_same_prefix) is None

        result = await service.validate_key(full_key)
        assert result is not None and result.id == legacy.id
        await legacy.refresh()
        assert legacy.key_hash == "sha256$" + _prehash_key(full_key)
        # ...and validates through the fast path afterwards.
        assert (await service.validate_key(full_key)).id == legacy.id

    async def test_wrong_key_with_matching_prefix_is_rejected_on_the_fast_path(self, db, test_user):
        """The constant-time compare is the security-relevant line for every
        current row: a key that finds the row (same 11-char prefix) but
        differs in one character must not validate, and must leave no trace
        of use (review of PR #275, finding 1)."""
        service = APIKeyService()
        api_key, full_key = await service.create(test_user.id, APIKeyCreate(name="k"))
        assert api_key.key_hash.startswith("sha256$")

        wrong_same_prefix = full_key[:-1] + ("0" if full_key[-1] != "0" else "1")
        assert await service.validate_key(wrong_same_prefix) is None
        await api_key.refresh()
        assert api_key.last_used_at is None

    async def test_unrecognised_stored_hash_does_not_validate_and_does_not_raise(self, db, test_user):
        """A row whose key_hash is neither "sha256$..." nor a bcrypt "$2..."
        string (corruption, a foreign format) must fail closed as a plain
        401, not reach bcrypt and blow up with ValueError("Invalid salt")
        -> 500 (review of PR #275, finding 2)."""
        from app.oxyde_models.api_key import OxydeAPIKey

        service = APIKeyService()
        for bad_hash in ("", "garbage", "$2b$notreal", "sha256X"):
            full_key = service._generate_key()
            await OxydeAPIKey.objects.create(
                principal_user_id=test_user.id, holder_user_id=test_user.id, name="broken", key_prefix=service._get_prefix(full_key),
                key_hash=bad_hash,
            )
            assert await service.validate_key(full_key) is None, bad_hash

    async def test_last_used_at_in_the_future_is_rewritten(self, db, test_user):
        """A stamp ahead of the wall clock (fast clock, restored DB) must not
        freeze the field until time catches up (review of PR #275, finding 4)."""
        from datetime import datetime, timedelta, timezone

        service = APIKeyService()
        api_key, full_key = await service.create(test_user.id, APIKeyCreate(name="k"))
        future = datetime.now(timezone.utc) + timedelta(days=2)
        api_key.last_used_at = future
        await api_key.save(update_fields={"last_used_at"})

        result = await service.validate_key(full_key)
        assert result.last_used_at < future

    async def test_last_used_at_writes_are_coalesced(self, db, test_user):
        """last_used_at is written at most once per LAST_USED_WRITE_INTERVAL
        (CHT-1369): a burst of stateless MCP calls must not be a burst of
        writes."""
        from datetime import timedelta

        from app.services.api_key_service import LAST_USED_WRITE_INTERVAL

        service = APIKeyService()
        api_key, full_key = await service.create(test_user.id, APIKeyCreate(name="k"))

        first = await service.validate_key(full_key)
        stamp = first.last_used_at
        assert stamp is not None

        from unittest.mock import patch

        from app.oxyde_models.api_key import OxydeAPIKey

        with patch.object(OxydeAPIKey, "save", autospec=True, side_effect=AssertionError("wrote")):
            second = await service.validate_key(full_key)  # within the interval: no write
        assert second.last_used_at == stamp

        api_key.last_used_at = stamp - LAST_USED_WRITE_INTERVAL - timedelta(seconds=1)
        await api_key.save(update_fields={"last_used_at"})
        third = await service.validate_key(full_key)
        assert third.last_used_at > stamp

    async def test_round_trip_create_validate(self, db, test_user):
        """Full round trip: create key, validate it, ensure it works."""
        service = APIKeyService()

        # Create multiple keys to ensure consistency
        for i in range(5):
            api_key_in = APIKeyCreate(name=f"Test Key {i}")
            api_key, full_key = await service.create(test_user.id, api_key_in)

            # Immediately validate
            result = await service.validate_key(full_key)
            assert result is not None
            assert result.id == api_key.id


@pytest.mark.asyncio
class TestAPIKeyAPIEndpoints:
    """Tests for API key API endpoints."""

    async def test_create_api_key_endpoint(self, client, auth_headers):
        """POST /api-keys should create an API key and return the full key."""
        response = await client.post(
            "/api/api-keys",
            headers=auth_headers,
            json={"name": "My Test Key"},
        )
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "My Test Key"
        assert "key" in data
        assert data["key"].startswith("ck_")
        assert "key_prefix" in data

    async def test_list_api_keys_endpoint(self, client, auth_headers, test_user, db):
        """GET /api-keys should list API keys for the current user."""
        service = APIKeyService()
        await service.create(test_user.id, APIKeyCreate(name="List Test Key"))

        response = await client.get(
            "/api/api-keys",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1
        assert any(k["name"] == "List Test Key" for k in data)
        # Full key should NOT be in response (only shown on creation)
        for key in data:
            assert "key" not in key or key.get("key") is None

    async def test_list_api_keys_skip_limit(self, client, auth_headers, test_user, db):
        """CHT-1223: /api-keys now accepts skip/limit like other list endpoints."""
        service = APIKeyService()
        for i in range(3):
            await service.create(test_user.id, APIKeyCreate(name=f"Key {i}"))

        response = await client.get(
            "/api/api-keys?limit=1",
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert len(response.json()) == 1

    async def test_revoke_api_key_endpoint(self, client, auth_headers, test_user, db):
        """DELETE /api-keys/{id} should revoke the API key."""
        service = APIKeyService()
        api_key, _ = await service.create(test_user.id, APIKeyCreate(name="Revoke Me"))

        response = await client.delete(
            f"/api/api-keys/{api_key.id}",
            headers=auth_headers,
        )
        assert response.status_code == 204

        # Re-fetch to verify key is revoked (Oxyde doesn't auto-refresh)
        refreshed = await OxydeAPIKey.objects.get(id=api_key.id)
        assert refreshed.is_active is False

    async def test_revoke_api_key_not_found(self, client, auth_headers):
        """DELETE /api-keys/{id} should return 404 for non-existent key."""
        response = await client.delete(
            "/api/api-keys/00000000-0000-0000-0000-000000000005",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "API key not found" in response.json()["detail"]

    async def test_revoke_api_key_not_owner(self, client, auth_headers2, test_user, db):
        """DELETE /api-keys/{id} should return 403 when not the owner."""
        service = APIKeyService()
        api_key, _ = await service.create(test_user.id, APIKeyCreate(name="Not Yours"))

        response = await client.delete(
            f"/api/api-keys/{api_key.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403
        assert "Not authorized" in response.json()["detail"]

    async def test_create_api_key_unauthenticated(self, client):
        """POST /api-keys without auth should return 401."""
        response = await client.post("/api/api-keys", json={"name": "No Auth"})
        assert response.status_code == 401

    async def test_list_api_keys_unauthenticated(self, client):
        """GET /api-keys without auth should return 401."""
        response = await client.get("/api/api-keys")
        assert response.status_code == 401

    async def test_revoke_api_key_unauthenticated(self, client):
        """DELETE /api-keys/{id} without auth should return 401."""
        response = await client.delete("/api/api-keys/00000000-0000-0000-0000-000000000005")
        assert response.status_code == 401

    async def test_list_api_keys_empty(self, client, auth_headers):
        """GET /api-keys with no keys should return empty list."""
        response = await client.get("/api/api-keys", headers=auth_headers)
        assert response.status_code == 200
        assert response.json() == []

    async def test_list_api_keys_isolated_between_users(self, client, auth_headers, auth_headers2, test_user, test_user2, db):
        """User should only see their own API keys."""
        service = APIKeyService()
        await service.create(test_user.id, APIKeyCreate(name="User1 Key"))
        await service.create(test_user2.id, APIKeyCreate(name="User2 Key"))

        r1 = await client.get("/api/api-keys", headers=auth_headers)
        r2 = await client.get("/api/api-keys", headers=auth_headers2)

        assert all(k["name"] != "User2 Key" for k in r1.json())
        assert all(k["name"] != "User1 Key" for k in r2.json())


@pytest.mark.asyncio
class TestAPIKeyServiceLookups:
    """Tests for get_by_id and find_by_key."""

    async def test_get_by_id_found(self, db, test_user):
        """get_by_id should return key when it exists."""
        service = APIKeyService()
        api_key, _ = await service.create(test_user.id, APIKeyCreate(name="Lookup"))
        result = await service.get_by_id(api_key.id)
        assert result is not None
        assert result.name == "Lookup"

    async def test_get_by_id_not_found(self, db):
        """get_by_id should return None for nonexistent ID."""
        service = APIKeyService()
        result = await service.get_by_id("00000000-0000-0000-0000-000000000000")
        assert result is None

    async def test_find_by_key_found(self, db, test_user):
        """find_by_key returns the row the full key belongs to."""
        service = APIKeyService()
        api_key, full_key = await service.create(test_user.id, APIKeyCreate(name="Lookup"))
        result, legacy = await service.find_by_key(full_key)
        assert result is not None and result.id == api_key.id
        assert legacy is False

    async def test_find_by_key_not_found(self, db, test_user):
        """An unknown key, a key with a known prefix but the wrong body, and
        a non-`ck_` token all find nothing."""
        service = APIKeyService()
        _, full_key = await service.create(test_user.id, APIKeyCreate(name="Lookup"))
        wrong_same_prefix = full_key[:-1] + ("0" if full_key[-1] != "0" else "1")
        for token in ("ck_" + "0" * 64, wrong_same_prefix, "not-a-key", ""):
            assert await service.find_by_key(token) == (None, False), token


def _sibling(full_key: str) -> str:
    """Another key with the same 11-character prefix."""
    return full_key[:11] + ("0" if full_key[11] != "0" else "1") + full_key[12:]


@pytest.mark.asyncio
class TestPrefixCollisions:
    """The display prefix is `ck_` plus 8 hex characters: 32 bits, shared
    by unrelated keys well before a deployment's key count looks large.
    A shared prefix used to make every request with either key a 500
    (get_or_none saw two rows, CHT-1554). Keys are now looked up by their
    unique SHA-256 digest (CHT-1534); legacy bcrypt rows by prefix, trying
    each candidate."""

    async def _legacy(self, user_id: str, full_key: str) -> OxydeAPIKey:
        from app.utils.security import get_password_hash

        return await OxydeAPIKey.objects.create(
            principal_user_id=user_id, holder_user_id=user_id, name="legacy", key_prefix=full_key[:11],
            key_hash=get_password_hash(_prehash_key(full_key)),
        )

    async def test_two_current_keys_sharing_a_prefix_both_validate(self, db, test_user, test_user2):
        service = APIKeyService()
        first, first_key = await service.create(test_user.id, APIKeyCreate(name="a"))
        second, second_key = await service.create(test_user2.id, APIKeyCreate(name="b"))
        # Force the collision: rewrite the second key so its prefix is the
        # first's, keeping its row's hash and prefix consistent with it.
        second_key = first_key[:11] + second_key[11:]
        second.key_prefix = first.key_prefix
        second.key_hash = "sha256$" + _prehash_key(second_key)
        await second.save(update_fields={"key_prefix", "key_hash"})
        assert second_key != first_key and second_key[:11] == first_key[:11]

        assert (await service.validate_key(first_key)).id == first.id
        assert (await service.validate_key(second_key)).id == second.id
        assert await service.validate_key(_sibling(first_key)) is None

    async def test_legacy_rows_sharing_a_prefix_each_validate(self, db, test_user, test_user2, caplog):
        """Several bcrypt rows (and a current row) under one prefix: every
        one of them is tried, so each key finds its own row, is upgraded,
        and nobody else's row is touched."""
        service = APIKeyService()
        current, current_key = await service.create(test_user.id, APIKeyCreate(name="current"))
        legacy_keys = [_sibling(current_key), current_key[:11] + "f" * 56]
        legacy_rows = [await self._legacy(test_user2.id, key) for key in legacy_keys]
        assert len({current_key, *legacy_keys}) == 3

        assert await service.validate_key(current_key[:11] + "e" * 56) is None
        for key, row in zip(reversed(legacy_keys), reversed(legacy_rows)):
            caplog.clear()
            with caplog.at_level("INFO", logger="app.services.api_key_service"):
                assert (await service.validate_key(key)).id == row.id
            # The fallback says when it fires, so it can be retired (CHT-1555).
            messages = [r.getMessage() for r in caplog.records if "legacy bcrypt" in r.getMessage()]
            assert len(messages) == 1 and row.id in messages[0]
            # Never the prefix: it is 32 bits of the secret.
            assert key[:11] not in messages[0] and key[3:11] not in messages[0]
            await row.refresh()
            assert row.key_hash == "sha256$" + _prehash_key(key)
        assert (await service.validate_key(current_key)).id == current.id
        await current.refresh()
        assert current.key_hash == "sha256$" + _prehash_key(current_key)

    async def test_a_concurrent_upgrade_between_the_two_lookups_still_signs_in(self, db, test_user, monkeypatch):
        """Request A misses on the digest, then request B (same key)
        upgrades the row before A reads the prefix candidates. A must
        accept the now-upgraded row, not skip it as "not bcrypt" and 401
        (PR #336 independent review, finding 1). The interleaving is forced
        so the test is deterministic."""
        service = APIKeyService()
        full_key = service._generate_key()
        row = await self._legacy(test_user.id, full_key)
        digest = "sha256$" + _prehash_key(full_key)
        real = OxydeAPIKey.objects.get_or_none
        raced = []

        async def lookup_then_lose_the_race(**lookup):
            found = await real(**lookup)
            if lookup.get("key_hash") == digest and found is None and not raced:
                raced.append(True)
                await OxydeAPIKey.objects.filter(id=row.id).update(key_hash=digest)
            return found

        monkeypatch.setattr(OxydeAPIKey.objects, "get_or_none", lookup_then_lose_the_race)
        result = await service.validate_key(full_key)
        assert raced and result is not None and result.id == row.id

    async def test_concurrent_first_use_of_a_legacy_key_never_401s(self, db, test_user):
        """The reviewer's repro: a burst of first requests with one legacy
        key all sign in, and the row ends upgraded."""
        import asyncio

        service = APIKeyService()
        full_key = service._generate_key()
        row = await self._legacy(test_user.id, full_key)
        results = await asyncio.gather(*(service.validate_key(full_key) for _ in range(20)))
        assert [r is not None and r.id == row.id for r in results] == [True] * 20
        await row.refresh()
        assert row.key_hash == "sha256$" + _prehash_key(full_key)

    async def test_revoked_and_expired_legacy_rows_cost_no_bcrypt(self, db, test_user, monkeypatch):
        """A legacy row that can never sign in is never bcrypt-checked: not
        for its own key, not for a forged key under its prefix (PR #336
        independent review, finding 2). find_by_key, which
        get_api_key_record uses, returns no inactive row on either path."""
        import app.services.api_key_service as module

        checks = []
        real = module.verify_password

        def counting(*args):
            checks.append(args)
            return real(*args)

        monkeypatch.setattr(module, "verify_password", counting)
        service = APIKeyService()
        revoked_key, expired_key = service._generate_key(), service._generate_key()
        revoked = await self._legacy(test_user.id, revoked_key)
        await service.revoke(revoked)
        expired = await self._legacy(test_user.id, expired_key)
        expired.expires_at = datetime.now(timezone.utc) - timedelta(minutes=1)
        await expired.save(update_fields={"expires_at"})

        for key in (revoked_key, _sibling(revoked_key), expired_key, _sibling(expired_key)):
            assert await service.validate_key(key) is None
            assert await service.find_by_key(key) == (None, False)
        assert checks == []
        for row in (revoked, expired):
            await row.refresh()
            assert row.key_hash.startswith("$2")

        current, current_key = await service.create(test_user.id, APIKeyCreate(name="c"))
        await service.revoke(current)
        assert await service.find_by_key(current_key) == (None, False)

    async def test_a_malformed_legacy_row_does_not_hide_its_neighbour(self, db, test_user):
        service = APIKeyService()
        full_key = service._generate_key()
        await OxydeAPIKey.objects.create(
            principal_user_id=test_user.id, holder_user_id=test_user.id, name="broken",
            key_prefix=full_key[:11], key_hash="$2b$notreal",
        )
        good = await self._legacy(test_user.id, full_key)
        assert (await service.validate_key(full_key)).id == good.id

    async def test_the_key_hash_is_unique(self, db, test_user):
        """The index the lookup relies on: two rows cannot share a hash, so
        a hash lookup names at most one row."""
        service = APIKeyService()
        api_key, _ = await service.create(test_user.id, APIKeyCreate(name="a"))
        with pytest.raises(Exception, match="(?i)unique"):
            await OxydeAPIKey.objects.create(
                principal_user_id=test_user.id, holder_user_id=test_user.id, name="dup",
                key_prefix=api_key.key_prefix, key_hash=api_key.key_hash,
            )

    async def test_the_hash_is_compared_in_constant_time(self, db, test_user, monkeypatch):
        """The stored and computed digests go through hmac.compare_digest,
        never `==`, whatever the database did to find the row."""
        import app.services.api_key_service as module

        calls = []
        real = module.hmac.compare_digest

        def spy(a, b):
            calls.append((a, b))
            return real(a, b)

        monkeypatch.setattr(module.hmac, "compare_digest", spy)
        service = APIKeyService()
        api_key, full_key = await service.create(test_user.id, APIKeyCreate(name="a"))
        assert (await service.validate_key(full_key)).id == api_key.id
        assert calls == [(api_key.key_hash, "sha256$" + _prehash_key(full_key))]

    async def test_a_row_the_database_returns_wrongly_is_not_trusted(self, db, test_user, monkeypatch):
        """If the lookup ever handed back a row whose hash is not the
        key's, the compare rejects it rather than signing in as it."""
        service = APIKeyService()
        api_key, _ = await service.create(test_user.id, APIKeyCreate(name="a"))

        async def wrong_row(**_lookup):
            return api_key

        monkeypatch.setattr(OxydeAPIKey.objects, "get_or_none", wrong_row)
        assert await service.validate_key(service._generate_key()) is None

    async def test_colliding_agent_keys_sign_in_and_mint_with_their_own_holder(
        self, client, auth_headers, auth_headers2, test_team, test_user, test_user2,
    ):
        """End to end over HTTP: two agent keys held by different humans,
        forced to share a prefix. Both sign in (no 500), and minting with
        each takes the holder of the key actually used (get_api_key_record)."""
        from app.enums import TeamRole
        from app.oxyde_models.team import OxydeTeamMember

        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        made = []
        for headers in (auth_headers, auth_headers2):
            response = await client.post(
                f"/api/teams/{test_team.id}/agents", json={"name": f"agent{len(made)}"}, headers=headers,
            )
            assert response.status_code == 201, response.text
            made.append(response.json()["api_key"])
        first_key, second_key = made
        rows = [await OxydeAPIKey.objects.get(key_hash="sha256$" + _prehash_key(k)) for k in made]
        assert [r.holder_user_id for r in rows] == [test_user.id, test_user2.id]

        second_key = first_key[:11] + second_key[11:]
        rows[1].key_prefix = rows[0].key_prefix
        rows[1].key_hash = "sha256$" + _prehash_key(second_key)
        await rows[1].save(update_fields={"key_prefix", "key_hash"})

        for key, holder in ((first_key, test_user.id), (second_key, test_user2.id)):
            bearer = {"Authorization": f"Bearer {key}"}
            me = await client.get("/api/auth/me", headers=bearer)
            assert me.status_code == 200, me.text
            minted = await client.post("/api/api-keys", json={"name": "child"}, headers=bearer)
            assert minted.status_code == 201, minted.text
            child = await OxydeAPIKey.objects.get(id=minted.json()["id"])
            assert child.holder_user_id == holder


@pytest.mark.asyncio
class TestAgentKeysNeedAHolder:
    """An agent is no team member, so a key it held itself would never
    sign in: minting one without a holder is a caller's bug and raises
    rather than writing a dead key (CHT-1537)."""

    async def test_an_agent_key_without_a_holder_raises(self, db, test_user, test_team):
        from app.schemas.agent import AgentCreate
        from app.services.agent_service import AgentService
        from app.services.api_key_service import AgentKeyNeedsHolderError

        agent, _, _ = await AgentService().create(AgentCreate(name="Bot"), test_user, test_team.id)
        before = await OxydeAPIKey.objects.filter(principal_user_id=agent.id).count()

        with pytest.raises(AgentKeyNeedsHolderError):
            await APIKeyService().create(agent.id, APIKeyCreate(name="no holder"))

        assert await OxydeAPIKey.objects.filter(principal_user_id=agent.id).count() == before

    async def test_with_a_holder_it_is_minted(self, db, test_user, test_team):
        from app.schemas.agent import AgentCreate
        from app.services.agent_service import AgentService

        agent, _, _ = await AgentService().create(AgentCreate(name="Bot"), test_user, test_team.id)
        key, _ = await APIKeyService().create(agent.id, APIKeyCreate(name="held"), holder_user_id=test_user.id)

        assert (key.principal_user_id, key.holder_user_id) == (agent.id, test_user.id)

    async def test_a_human_key_defaults_to_its_human(self, db, test_user):
        key, _ = await APIKeyService().create(test_user.id, APIKeyCreate(name="mine"))

        assert key.holder_user_id == test_user.id
