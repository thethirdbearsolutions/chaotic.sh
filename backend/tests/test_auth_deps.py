"""Tests for authentication dependency edge cases (CHT-591).

Covers uncovered lines in app/api/deps.py:
- JWT with missing 'sub' claim (L50)
- Inactive user via JWT (L67)
- Invalid API key (L85)
- Agent not found via API key (L97)
- User not found via API key (L105)
- Inactive user via API key (L113)
- get_auth_method function (L176-181)
"""
import pytest
from jose import jwt
from datetime import datetime, timezone, timedelta

from app.oxyde_models.user import OxydeUser
from app.config import get_settings
from app.utils.security import get_password_hash
from app.services.api_key_service import APIKeyService
from app.schemas.api_key import APIKeyCreate

settings = get_settings()
SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm


@pytest.mark.asyncio
async def test_jwt_missing_sub_claim(client):
    """JWT with no 'sub' claim returns 401."""
    token = jwt.encode(
        {"exp": datetime.now(timezone.utc) + timedelta(hours=1)},
        SECRET_KEY,
        algorithm=ALGORITHM,
    )
    response = await client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 401
    assert "Invalid token" in response.json()["detail"]


@pytest.mark.asyncio
async def test_jwt_user_not_found(client):
    """JWT with valid structure but non-existent user returns 401."""
    token = jwt.encode(
        {"sub": "nonexistent-user-id", "exp": datetime.now(timezone.utc) + timedelta(hours=1)},
        SECRET_KEY,
        algorithm=ALGORITHM,
    )
    response = await client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 401
    assert "User not found" in response.json()["detail"]


@pytest.mark.asyncio
async def test_jwt_inactive_user(client, db):
    """JWT for inactive user returns 403."""
    user = await OxydeUser.objects.create(
        email="inactive@example.com",
        hashed_password=get_password_hash("password123"),
        name="Inactive User",
        is_active=False,
    )

    token = jwt.encode(
        {"sub": user.id, "exp": datetime.now(timezone.utc) + timedelta(hours=1)},
        SECRET_KEY,
        algorithm=ALGORITHM,
    )
    response = await client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 403
    assert "inactive" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_invalid_api_key(client):
    """API key that doesn't exist returns 401."""
    response = await client.get(
        "/api/auth/me",
        headers={"Authorization": "Bearer ck_0000000000000000000000000000000000000000000000000000000000000000"},
    )
    assert response.status_code == 401
    assert "Invalid API key" in response.json()["detail"]


@pytest.mark.asyncio
async def test_api_key_agent_not_found(client, db, test_user):
    """API key with agent_user_id pointing to non-existent agent returns 401."""
    api_key_service = APIKeyService()

    # Create a valid API key for test_user
    api_key_record, full_key = await api_key_service.create(
        test_user.id, APIKeyCreate(name="Ghost Agent Key")
    )

    # Modify it to point to a non-existent agent
    # Disable FK checks since we're deliberately setting an invalid FK
    from oxyde import execute_raw
    await execute_raw("PRAGMA foreign_keys = OFF")
    api_key_record.agent_user_id = "nonexistent-agent-id"
    await api_key_record.save(update_fields={"agent_user_id"})
    await execute_raw("PRAGMA foreign_keys = ON")

    response = await client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {full_key}"},
    )
    assert response.status_code == 401
    assert "Agent not found" in response.json()["detail"]


@pytest.mark.asyncio
async def test_api_key_user_not_found(client, db, test_user):
    """API key with user_id pointing to non-existent user returns 401."""
    api_key_service = APIKeyService()

    # Create a valid API key for test_user
    api_key_record, full_key = await api_key_service.create(
        test_user.id, APIKeyCreate(name="Ghost User Key")
    )

    # Modify it to point to a non-existent user (no agent)
    # Disable FK checks since we're deliberately setting an invalid FK
    from oxyde import execute_raw
    await execute_raw("PRAGMA foreign_keys = OFF")
    api_key_record.user_id = "nonexistent-user-id"
    api_key_record.agent_user_id = None
    await api_key_record.save(update_fields={"user_id", "agent_user_id"})
    await execute_raw("PRAGMA foreign_keys = ON")

    response = await client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {full_key}"},
    )
    assert response.status_code == 401
    assert "User not found" in response.json()["detail"]


@pytest.mark.asyncio
async def test_api_key_inactive_user(client, db):
    """API key for inactive user returns 403."""
    # Create inactive user
    user = await OxydeUser.objects.create(
        email="inactive-api@example.com",
        hashed_password=get_password_hash("password123"),
        name="Inactive API User",
        is_active=False,
    )

    # Create a valid API key for this inactive user
    api_key_service = APIKeyService()
    api_key_record, full_key = await api_key_service.create(
        user.id, APIKeyCreate(name="Inactive User Key")
    )

    response = await client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {full_key}"},
    )
    assert response.status_code == 403
    assert "inactive" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_auth_method_api_key(client, db, test_user):
    """API key authentication works end-to-end."""
    api_key_service = APIKeyService()
    api_key_record, full_key = await api_key_service.create(
        test_user.id, APIKeyCreate(name="Auth Method Test Key")
    )

    response = await client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {full_key}"},
    )
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_no_credentials(client):
    """Request without credentials returns 401."""
    response = await client.get("/api/auth/me")
    assert response.status_code == 401
    assert "Not authenticated" in response.json()["detail"]
