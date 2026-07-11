"""Tests for authentication endpoints."""
import pytest

from app.services.agent_service import AgentService
from app.schemas.agent import AgentCreate


@pytest.mark.asyncio
async def test_signup_success(client):
    """Test successful user signup."""
    response = await client.post(
        "/api/auth/signup",
        json={
            "name": "New User",
            "email": "newuser@example.com",
            "password": "securepass123",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "newuser@example.com"
    assert data["name"] == "New User"
    assert "id" in data
    assert "hashed_password" not in data


@pytest.mark.asyncio
async def test_signup_duplicate_email(client, test_user):
    """Test signup with existing email."""
    response = await client.post(
        "/api/auth/signup",
        json={
            "name": "Duplicate",
            "email": test_user.email,
            "password": "securepass123",
        },
    )
    assert response.status_code == 400
    assert "already registered" in response.json()["detail"]


@pytest.mark.asyncio
async def test_signup_invalid_password(client):
    """Test signup with short password."""
    response = await client.post(
        "/api/auth/signup",
        json={
            "name": "User",
            "email": "user@example.com",
            "password": "short",
        },
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_login_success(client, test_user):
    """Test successful login."""
    response = await client.post(
        "/api/auth/login",
        json={
            "email": test_user.email,
            "password": "testpassword123",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_login_wrong_password(client, test_user):
    """Test login with wrong password."""
    response = await client.post(
        "/api/auth/login",
        json={
            "email": test_user.email,
            "password": "wrongpassword",
        },
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_login_nonexistent_user(client):
    """Test login with nonexistent email."""
    response = await client.post(
        "/api/auth/login",
        json={
            "email": "nonexistent@example.com",
            "password": "password123",
        },
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_get_me_authenticated(client, auth_headers, test_user):
    """Test getting current user info."""
    response = await client.get("/api/auth/me", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == test_user.email
    assert data["name"] == test_user.name


@pytest.mark.asyncio
async def test_get_me_unauthenticated(client):
    """Test getting current user without auth."""
    response = await client.get("/api/auth/me")
    # 401 Unauthorized is correct - no credentials provided
    # (403 Forbidden would mean credentials provided but not allowed)
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_get_me_invalid_token(client):
    """Test getting current user with invalid token."""
    response = await client.get(
        "/api/auth/me",
        headers={"Authorization": "Bearer invalid_token"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_get_me_human_is_not_agent(client, auth_headers):
    """A regular human user's /auth/me response reports is_agent=False
    and no parent_user_name (CHT-1304)."""
    response = await client.get("/api/auth/me", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["is_agent"] is False
    assert data.get("parent_user_name") is None


@pytest.mark.asyncio
async def test_get_me_agent_reports_is_agent_and_parent_name(db, client, test_user, test_team):
    """An agent's /auth/me response reports is_agent=True and the parent
    human user's name, derived from parent_user_id (CHT-1304)."""
    agent_service = AgentService()
    agent, api_key, _ = await agent_service.create(
        AgentCreate(name="Test Agent"), test_user, test_team.id, project_id=None
    )

    response = await client.get(
        "/api/auth/me", headers={"Authorization": f"Bearer {api_key}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["is_agent"] is True
    assert data["name"] == agent.name
    assert data["parent_user_name"] == test_user.name
