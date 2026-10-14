"""Tests for authentication dependency edge cases (CHT-591).

Covers uncovered lines in app/api/deps.py:
- JWT with missing 'sub' claim (L50)
- Inactive user via JWT (L67)
- Invalid API key (L85)
- Agent not found via API key (same 401 as a missing user since CHT-1537)
- User not found via API key (L105)
- Inactive user via API key (L113)
- Agent key whose holder is deactivated (same 401 as a revoked key, CHT-1552)
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
        {"sub": "00000000-0000-0000-0000-00000000000c", "exp": datetime.now(timezone.utc) + timedelta(hours=1)},
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
    """An agent key (held by a human) whose agent is gone returns 401."""
    api_key_service = APIKeyService()

    # Create a valid API key for test_user
    api_key_record, full_key = await api_key_service.create(
        test_user.id, APIKeyCreate(name="Ghost Agent Key")
    )

    # Modify it to sign in as a non-existent agent
    # Disable FK checks since we're deliberately setting an invalid FK
    from oxyde import execute_raw
    await execute_raw("PRAGMA foreign_keys = OFF")
    api_key_record.principal_user_id = "00000000-0000-0000-0000-000000000001"
    await api_key_record.save(update_fields={"principal_user_id"})
    await execute_raw("PRAGMA foreign_keys = ON")

    response = await client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {full_key}"},
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "User not found"


@pytest.mark.asyncio
async def test_api_key_user_not_found(client, db, test_user):
    """A human's own API key whose user is gone returns 401."""
    api_key_service = APIKeyService()

    # Create a valid API key for test_user
    api_key_record, full_key = await api_key_service.create(
        test_user.id, APIKeyCreate(name="Ghost User Key")
    )

    # Modify it to point to a non-existent user (no agent)
    # Disable FK checks since we're deliberately setting an invalid FK
    from oxyde import execute_raw
    await execute_raw("PRAGMA foreign_keys = OFF")
    api_key_record.principal_user_id = "00000000-0000-0000-0000-00000000000c"
    api_key_record.holder_user_id = "00000000-0000-0000-0000-00000000000c"
    await api_key_record.save(update_fields={"principal_user_id", "holder_user_id"})
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


async def _agent_key_held_by(test_team, holder):
    """An agent in test_team created by ``holder``, and the key it was
    shown (held by ``holder``)."""
    from app.enums import TeamRole
    from app.oxyde_models.team import OxydeTeamMember
    from app.schemas.agent import AgentCreate
    from app.services.agent_service import AgentService

    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=holder.id, role=TeamRole.MEMBER)
    agent, key, _ = await AgentService().create(AgentCreate(name=f"{holder.name} Bot"), holder, test_team.id)
    return agent, key


@pytest.mark.asyncio
async def test_agent_key_of_deactivated_holder_is_refused_like_a_revoked_key(client, db, test_team):
    """CHT-1552: a deactivated human still in the agent's team cannot
    sign in, so no agent key they hold does either: 401 "Invalid API
    key", exactly what a revoked key gets, not the 403 an inactive
    principal gets."""
    holder = await OxydeUser.objects.create(
        email="holder-1552@example.com", hashed_password=get_password_hash("password123"), name="Holder",
    )
    _, key = await _agent_key_held_by(test_team, holder)
    headers = {"Authorization": f"Bearer {key}"}
    assert (await client.get("/api/auth/me", headers=headers)).status_code == 200

    holder.is_active = False
    await holder.save(update_fields={"is_active"})

    response = await client.get("/api/auth/me", headers=headers)
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid API key"
    assert response.headers["www-authenticate"] == "Bearer"

    holder.is_active = True
    await holder.save(update_fields={"is_active"})
    assert (await client.get("/api/auth/me", headers=headers)).status_code == 200


@pytest.mark.asyncio
async def test_agent_key_minted_by_another_holder_follows_that_holder(client, db, test_user, test_team, auth_headers):
    """The check is on the key's holder, not the agent's creator: a key
    the (active) team owner minted for a deactivated member's agent still
    signs in, and the member's own key for it does not."""
    from app.oxyde_models.api_key import OxydeAPIKey

    member = await OxydeUser.objects.create(
        email="member-1552@example.com", hashed_password=get_password_hash("password123"), name="Member",
    )
    agent, member_key = await _agent_key_held_by(test_team, member)
    minted = await client.post(f"/api/agents/{agent.id}/keys", headers=auth_headers)
    assert minted.status_code == 201, minted.text
    owner_key = minted.json()["key"]
    owner_row = await OxydeAPIKey.objects.get(id=minted.json()["id"])
    assert owner_row.holder_user_id == test_user.id

    member.is_active = False
    await member.save(update_fields={"is_active"})

    assert (await client.get("/api/auth/me", headers={"Authorization": f"Bearer {member_key}"})).status_code == 401
    assert (await client.get("/api/auth/me", headers={"Authorization": f"Bearer {owner_key}"})).status_code == 200


@pytest.mark.asyncio
async def test_agent_key_of_deactivated_holder_cannot_mint(client, db, test_team):
    """The self-mint route (POST /api-keys with an agent's key) is refused
    for a deactivated holder too (CHT-1552)."""
    holder = await OxydeUser.objects.create(
        email="minter-1552@example.com", hashed_password=get_password_hash("password123"), name="Minter",
    )
    _, key = await _agent_key_held_by(test_team, holder)
    holder.is_active = False
    await holder.save(update_fields={"is_active"})

    response = await client.post(
        "/api/api-keys", json={"name": "self"}, headers={"Authorization": f"Bearer {key}"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_mint_rechecks_a_holder_deactivated_after_sign_in(db, test_team):
    """The mint route's own in-transaction re-check (CHT-1552): a holder
    deactivated between sign-in and the insert mints nothing. Called
    in-process with the principal already resolved, so sign-in's check
    cannot be what refuses it."""
    from fastapi import HTTPException

    from app.api.api_keys import create_api_key
    from app.oxyde_models.api_key import OxydeAPIKey

    holder = await OxydeUser.objects.create(
        email="race-1552@example.com", hashed_password=get_password_hash("password123"), name="Racer",
    )
    agent, key = await _agent_key_held_by(test_team, holder)
    calling_key = await APIKeyService().validate_key(key)
    holder.is_active = False
    await holder.save(update_fields={"is_active"})

    with pytest.raises(HTTPException) as refused:
        await create_api_key(APIKeyCreate(name="raced"), agent, None, calling_key)
    assert refused.value.status_code == 401
    assert refused.value.detail == "Invalid API key"
    assert await OxydeAPIKey.objects.filter(principal_user_id=agent.id).count() == 1
