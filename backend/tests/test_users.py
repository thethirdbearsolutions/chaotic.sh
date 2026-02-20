"""Tests for user endpoints (CHT-940)."""
import pytest
from app.services.user_service import UserService
from app.schemas.user import UserCreate, UserUpdate


@pytest.mark.asyncio
async def test_get_user(client, auth_headers, test_user):
    """Test getting user by ID."""
    response = await client.get(
        f"/api/users/{test_user.id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_user.id
    assert data["email"] == test_user.email
    assert data["name"] == test_user.name


@pytest.mark.asyncio
async def test_get_user_not_found(client, auth_headers):
    """Test getting nonexistent user."""
    response = await client.get(
        "/api/users/nonexistent-id",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_me(client, auth_headers, test_user):
    """Test updating current user."""
    response = await client.patch(
        "/api/users/me",
        headers=auth_headers,
        json={
            "name": "Updated Name",
            "avatar_url": "https://example.com/avatar.png",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Name"
    assert data["avatar_url"] == "https://example.com/avatar.png"


@pytest.mark.asyncio
async def test_update_me_partial(client, auth_headers):
    """Test partial update of current user."""
    response = await client.patch(
        "/api/users/me",
        headers=auth_headers,
        json={"name": "Partial Update"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Partial Update"


@pytest.mark.asyncio
async def test_delete_me(client, auth_headers):
    """Test deleting current user."""
    response = await client.delete(
        "/api/users/me",
        headers=auth_headers,
    )
    assert response.status_code == 204

    # Verify user is deleted
    response = await client.get(
        "/api/auth/me",
        headers=auth_headers,
    )
    assert response.status_code == 401


# === Unauthenticated access tests ===


@pytest.mark.asyncio
async def test_get_user_unauthenticated(client, test_user):
    """GET /users/{id} without auth should return 401."""
    response = await client.get(f"/api/users/{test_user.id}")
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_update_me_unauthenticated(client):
    """PATCH /users/me without auth should return 401."""
    response = await client.patch("/api/users/me", json={"name": "Hacker"})
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_delete_me_unauthenticated(client):
    """DELETE /users/me without auth should return 401."""
    response = await client.delete("/api/users/me")
    assert response.status_code == 401


# === Edge case tests ===


@pytest.mark.asyncio
async def test_get_other_user(client, auth_headers, test_user2):
    """Users should be able to get other users by ID."""
    response = await client.get(
        f"/api/users/{test_user2.id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_user2.id
    assert data["email"] == test_user2.email


@pytest.mark.asyncio
async def test_update_me_empty_body(client, auth_headers):
    """PATCH /users/me with empty update should succeed without changes."""
    response = await client.patch(
        "/api/users/me",
        headers=auth_headers,
        json={},
    )
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_update_me_name_preserved_on_avatar_update(client, auth_headers):
    """Partial update should not clear other fields."""
    # Set name first
    await client.patch("/api/users/me", headers=auth_headers, json={"name": "Original Name"})

    # Update only avatar
    response = await client.patch(
        "/api/users/me",
        headers=auth_headers,
        json={"avatar_url": "https://example.com/new.png"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Original Name"
    assert data["avatar_url"] == "https://example.com/new.png"


# === Service layer tests ===


@pytest.mark.asyncio
class TestUserService:
    """Tests for UserService methods."""

    async def test_get_by_email(self, db, test_user):
        """get_by_email should find user by email."""
        service = UserService()
        result = await service.get_by_email(test_user.email)
        assert result is not None
        assert result.id == test_user.id

    async def test_get_by_email_not_found(self, db):
        """get_by_email should return None for unknown email."""
        service = UserService()
        result = await service.get_by_email("nobody@example.com")
        assert result is None

    async def test_authenticate_valid(self, db):
        """authenticate should return user with correct credentials."""
        service = UserService()
        user = await service.create(UserCreate(
            email="authtest@example.com", password="password123", name="Auth Test"
        ))
        result = await service.authenticate("authtest@example.com", "password123")
        assert result is not None
        assert result.id == user.id

    async def test_authenticate_wrong_password(self, db):
        """authenticate should return None for wrong password."""
        service = UserService()
        await service.create(UserCreate(
            email="authtest2@example.com", password="password123", name="Auth Test 2"
        ))
        result = await service.authenticate("authtest2@example.com", "wrongpassword")
        assert result is None

    async def test_authenticate_nonexistent_email(self, db):
        """authenticate should return None for nonexistent email."""
        service = UserService()
        result = await service.authenticate("ghost@example.com", "password123")
        assert result is None

    async def test_list_users(self, db, test_user, test_user2):
        """list_users should return all users."""
        service = UserService()
        users = await service.list_users()
        assert len(users) >= 2
        ids = [u.id for u in users]
        assert test_user.id in ids
        assert test_user2.id in ids

    async def test_update_user(self, db, test_user):
        """update should modify user fields."""
        service = UserService()
        updated = await service.update(test_user, UserUpdate(name="New Name"))
        assert updated.name == "New Name"
