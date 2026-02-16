"""Tests for API key service.

These tests ensure the API key hashing and validation works correctly,
preventing regressions like the bcrypt compatibility issue (CHT-110).
"""
import pytest
from datetime import datetime, timedelta, timezone

from app.services.api_key_service import APIKeyService, _prehash_key
from app.schemas.api_key import APIKeyCreate
from app.models.api_key import APIKey
from app.utils.security import get_password_hash, verify_password


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

    def test_generate_key_format(self, db_session):
        """Generated key should have correct format."""
        service = APIKeyService(db_session)
        key = service._generate_key()

        assert key.startswith("ck_")
        # ck_ + 64 hex chars = 67 total
        assert len(key) == 67

    def test_generate_key_is_unique(self, db_session):
        """Each generated key should be unique."""
        service = APIKeyService(db_session)
        keys = [service._generate_key() for _ in range(100)]
        assert len(set(keys)) == 100

    def test_get_prefix(self, db_session):
        """Prefix extraction should work correctly."""
        service = APIKeyService(db_session)
        key = "ck_abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
        prefix = service._get_prefix(key)

        assert prefix == "ck_abcdef12"
        assert len(prefix) == 11


@pytest.mark.asyncio
class TestAPIKeyServiceCreate:
    """Tests for API key creation."""

    async def test_create_returns_key_and_model(self, db_session, test_user):
        """Create should return both the model and full key."""
        service = APIKeyService(db_session)
        api_key_in = APIKeyCreate(name="Test Key")

        api_key, full_key = await service.create(test_user.id, api_key_in)

        assert api_key is not None
        assert api_key.name == "Test Key"
        assert api_key.user_id == test_user.id
        assert full_key.startswith("ck_")

    async def test_create_stores_hashed_key(self, db_session, test_user):
        """Created key should be stored as hash, not plaintext."""
        service = APIKeyService(db_session)
        api_key_in = APIKeyCreate(name="Test Key")

        api_key, full_key = await service.create(test_user.id, api_key_in)

        # Hash should not equal the key
        assert api_key.key_hash != full_key
        # Hash should not equal the prehashed key
        assert api_key.key_hash != _prehash_key(full_key)
        # But the hash should verify against the prehashed key
        assert verify_password(_prehash_key(full_key), api_key.key_hash)

    async def test_create_stores_correct_prefix(self, db_session, test_user):
        """Created key should have correct prefix stored."""
        service = APIKeyService(db_session)
        api_key_in = APIKeyCreate(name="Test Key")

        api_key, full_key = await service.create(test_user.id, api_key_in)

        assert api_key.key_prefix == full_key[:11]


@pytest.mark.asyncio
class TestAPIKeyServiceValidation:
    """Tests for API key validation."""

    async def test_validate_correct_key(self, db_session, test_user):
        """Valid key should be accepted."""
        service = APIKeyService(db_session)
        api_key_in = APIKeyCreate(name="Test Key")
        _, full_key = await service.create(test_user.id, api_key_in)

        result = await service.validate_key(full_key)

        assert result is not None
        assert result.name == "Test Key"

    async def test_validate_wrong_key(self, db_session, test_user):
        """Wrong key should be rejected."""
        service = APIKeyService(db_session)
        api_key_in = APIKeyCreate(name="Test Key")
        await service.create(test_user.id, api_key_in)

        result = await service.validate_key("ck_wrongkeywrongkeywrongkeywrongkeywrongkeywrongkeywrongkeywrongkey")

        assert result is None

    async def test_validate_invalid_format(self, db_session):
        """Key without ck_ prefix should be rejected."""
        service = APIKeyService(db_session)

        result = await service.validate_key("not_a_valid_key")

        assert result is None

    async def test_validate_inactive_key(self, db_session, test_user):
        """Inactive key should be rejected."""
        service = APIKeyService(db_session)
        api_key_in = APIKeyCreate(name="Test Key")
        api_key, full_key = await service.create(test_user.id, api_key_in)

        # Revoke the key
        await service.revoke(api_key)

        result = await service.validate_key(full_key)

        assert result is None

    async def test_validate_expired_key(self, db_session, test_user):
        """Expired key should be rejected."""
        service = APIKeyService(db_session)
        api_key_in = APIKeyCreate(name="Test Key")
        api_key, full_key = await service.create(test_user.id, api_key_in)

        # Set expiration to the past
        api_key.expires_at = datetime.now(timezone.utc) - timedelta(hours=1)
        await db_session.commit()

        result = await service.validate_key(full_key)

        assert result is None

    async def test_validate_updates_last_used(self, db_session, test_user):
        """Successful validation should update last_used_at."""
        service = APIKeyService(db_session)
        api_key_in = APIKeyCreate(name="Test Key")
        api_key, full_key = await service.create(test_user.id, api_key_in)

        assert api_key.last_used_at is None

        result = await service.validate_key(full_key)

        assert result.last_used_at is not None


@pytest.mark.asyncio
class TestAPIKeyServiceOperations:
    """Tests for other API key operations."""

    async def test_list_by_user(self, db_session, test_user, test_user2):
        """Should only list keys for the specified user."""
        service = APIKeyService(db_session)

        # Create keys for both users
        await service.create(test_user.id, APIKeyCreate(name="User1 Key1"))
        await service.create(test_user.id, APIKeyCreate(name="User1 Key2"))
        await service.create(test_user2.id, APIKeyCreate(name="User2 Key"))

        user1_keys = await service.list_by_user(test_user.id)
        user2_keys = await service.list_by_user(test_user2.id)

        assert len(user1_keys) == 2
        assert len(user2_keys) == 1

    async def test_revoke_deactivates_key(self, db_session, test_user):
        """Revoke should deactivate the key."""
        service = APIKeyService(db_session)
        api_key_in = APIKeyCreate(name="Test Key")
        api_key, _ = await service.create(test_user.id, api_key_in)

        assert api_key.is_active is True

        revoked = await service.revoke(api_key)

        assert revoked.is_active is False

    async def test_delete_removes_key(self, db_session, test_user):
        """Delete should remove the key from database."""
        service = APIKeyService(db_session)
        api_key_in = APIKeyCreate(name="Test Key")
        api_key, _ = await service.create(test_user.id, api_key_in)
        key_id = api_key.id

        await service.delete(api_key)

        result = await service.get_by_id(key_id)
        assert result is None


@pytest.mark.asyncio
class TestBcryptCompatibility:
    """Tests specifically for bcrypt compatibility.

    These tests ensure we don't regress on the bcrypt issues we hit:
    1. bcrypt 72-byte limit
    2. passlib/bcrypt version compatibility
    """

    async def test_long_key_validation(self, db_session, test_user):
        """Even with prehashing, validation should work for any key length."""
        service = APIKeyService(db_session)
        api_key_in = APIKeyCreate(name="Test Key")
        _, full_key = await service.create(test_user.id, api_key_in)

        # Key is 67 bytes, prehash is 64 bytes - both under 72
        result = await service.validate_key(full_key)
        assert result is not None

    async def test_hash_is_bcrypt_format(self, db_session, test_user):
        """Stored hash should be bcrypt format (starts with $2b$)."""
        service = APIKeyService(db_session)
        api_key_in = APIKeyCreate(name="Test Key")
        api_key, _ = await service.create(test_user.id, api_key_in)

        # bcrypt hashes start with $2b$ (or $2a$, $2y$)
        assert api_key.key_hash.startswith("$2")

    async def test_round_trip_create_validate(self, db_session, test_user):
        """Full round trip: create key, validate it, ensure it works."""
        service = APIKeyService(db_session)

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

    async def test_list_api_keys_endpoint(self, client, auth_headers, test_user, db_session):
        """GET /api-keys should list API keys for the current user."""
        service = APIKeyService(db_session)
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

    async def test_revoke_api_key_endpoint(self, client, auth_headers, test_user, db_session):
        """DELETE /api-keys/{id} should revoke the API key."""
        service = APIKeyService(db_session)
        api_key, _ = await service.create(test_user.id, APIKeyCreate(name="Revoke Me"))

        response = await client.delete(
            f"/api/api-keys/{api_key.id}",
            headers=auth_headers,
        )
        assert response.status_code == 204

        # Verify key is revoked
        await db_session.refresh(api_key)
        assert api_key.is_active is False

    async def test_revoke_api_key_not_found(self, client, auth_headers):
        """DELETE /api-keys/{id} should return 404 for non-existent key."""
        response = await client.delete(
            "/api/api-keys/nonexistent-key-id",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "API key not found" in response.json()["detail"]

    async def test_revoke_api_key_not_owner(self, client, auth_headers2, test_user, db_session):
        """DELETE /api-keys/{id} should return 403 when not the owner."""
        service = APIKeyService(db_session)
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
        response = await client.delete("/api/api-keys/some-id")
        assert response.status_code == 401

    async def test_list_api_keys_empty(self, client, auth_headers):
        """GET /api-keys with no keys should return empty list."""
        response = await client.get("/api/api-keys", headers=auth_headers)
        assert response.status_code == 200
        assert response.json() == []

    async def test_list_api_keys_isolated_between_users(self, client, auth_headers, auth_headers2, test_user, test_user2, db_session):
        """User should only see their own API keys."""
        service = APIKeyService(db_session)
        await service.create(test_user.id, APIKeyCreate(name="User1 Key"))
        await service.create(test_user2.id, APIKeyCreate(name="User2 Key"))

        r1 = await client.get("/api/api-keys", headers=auth_headers)
        r2 = await client.get("/api/api-keys", headers=auth_headers2)

        assert all(k["name"] != "User2 Key" for k in r1.json())
        assert all(k["name"] != "User1 Key" for k in r2.json())


@pytest.mark.asyncio
class TestAPIKeyServiceLookups:
    """Tests for get_by_id and get_by_prefix."""

    async def test_get_by_id_found(self, db_session, test_user):
        """get_by_id should return key when it exists."""
        service = APIKeyService(db_session)
        api_key, _ = await service.create(test_user.id, APIKeyCreate(name="Lookup"))
        result = await service.get_by_id(api_key.id)
        assert result is not None
        assert result.name == "Lookup"

    async def test_get_by_id_not_found(self, db_session):
        """get_by_id should return None for nonexistent ID."""
        service = APIKeyService(db_session)
        result = await service.get_by_id("nonexistent-id")
        assert result is None

    async def test_get_by_prefix_found(self, db_session, test_user):
        """get_by_prefix should return key matching prefix."""
        service = APIKeyService(db_session)
        api_key, full_key = await service.create(test_user.id, APIKeyCreate(name="Prefix"))
        result = await service.get_by_prefix(full_key[:11])
        assert result is not None
        assert result.id == api_key.id

    async def test_get_by_prefix_not_found(self, db_session):
        """get_by_prefix should return None for unknown prefix."""
        service = APIKeyService(db_session)
        result = await service.get_by_prefix("ck_unknown")
        assert result is None
