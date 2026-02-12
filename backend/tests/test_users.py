"""Tests for user endpoints."""
import pytest


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
