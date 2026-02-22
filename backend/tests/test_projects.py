"""Tests for project endpoints."""
import pytest


@pytest.mark.asyncio
async def test_create_project(client, auth_headers, test_team):
    """Test creating a project."""
    response = await client.post(
        f"/api/projects?team_id={test_team.id}",
        headers=auth_headers,
        json={
            "name": "New Project",
            "key": "NEW",
            "description": "A new project",
            "color": "#ff0000",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "New Project"
    assert data["key"] == "NEW"
    assert data["color"] == "#ff0000"
    assert data["team_id"] == test_team.id


@pytest.mark.asyncio
async def test_create_project_duplicate_key(client, auth_headers, test_team, test_project):
    """Test creating project with existing key."""
    response = await client.post(
        f"/api/projects?team_id={test_team.id}",
        headers=auth_headers,
        json={
            "name": "Duplicate Project",
            "key": test_project.key,
        },
    )
    assert response.status_code == 400
    assert "already exists" in response.json()["detail"]


@pytest.mark.asyncio
async def test_create_project_not_member(client, auth_headers2, test_team):
    """Test creating project when not a member."""
    response = await client.post(
        f"/api/projects?team_id={test_team.id}",
        headers=auth_headers2,
        json={
            "name": "Unauthorized Project",
            "key": "UNAUTH",
        },
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_list_projects(client, auth_headers, test_team, test_project):
    """Test listing projects."""
    response = await client.get(
        f"/api/projects?team_id={test_team.id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert any(p["id"] == test_project.id for p in data)


@pytest.mark.asyncio
async def test_get_project(client, auth_headers, test_project):
    """Test getting project by ID."""
    response = await client.get(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_project.id
    assert data["name"] == test_project.name


@pytest.mark.asyncio
async def test_get_project_not_member(client, auth_headers2, test_project):
    """Test getting project when not a member."""
    response = await client.get(
        f"/api/projects/{test_project.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_update_project(client, auth_headers, test_project):
    """Test updating a project."""
    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
        json={
            "name": "Updated Project",
            "description": "Updated description",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Project"
    assert data["description"] == "Updated description"


@pytest.mark.asyncio
async def test_delete_project(client, auth_headers, test_team, db):
    """Test deleting a project."""
    from app.oxyde_models.project import OxydeProject

    project = await OxydeProject.objects.create(
        team_id=test_team.id,
        name="Delete Me",
        key="DEL",
    )

    response = await client.delete(
        f"/api/projects/{project.id}",
        headers=auth_headers,
    )
    assert response.status_code == 204


@pytest.mark.asyncio
async def test_delete_project_not_admin(client, auth_headers2, test_project, db, test_user2, test_team):
    """Test deleting project when not admin."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.delete(
        f"/api/projects/{test_project.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_update_project_settings(client, auth_headers, test_project):
    """Test updating project settings."""
    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
        json={
            "require_estimate_on_claim": True,
            "default_sprint_budget": 50,
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["require_estimate_on_claim"] is True
    assert data["default_sprint_budget"] == 50


@pytest.mark.asyncio
async def test_create_project_with_settings(client, auth_headers, test_team):
    """Test creating project with initial settings."""
    response = await client.post(
        f"/api/projects?team_id={test_team.id}",
        headers=auth_headers,
        json={
            "name": "Settings Project",
            "key": "SETT",
            "default_sprint_budget": 100,
            "require_estimate_on_claim": True,
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["default_sprint_budget"] == 100
    assert data["require_estimate_on_claim"] is True


# ============== Additional edge case tests ==============


@pytest.mark.asyncio
async def test_list_projects_not_member(client, auth_headers2, test_team):
    """Test listing projects when not a member."""
    response = await client.get(
        f"/api/projects?team_id={test_team.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_get_project_not_found(client, auth_headers):
    """Test getting project that doesn't exist."""
    response = await client.get(
        "/api/projects/00000000-0000-0000-0000-000000000000",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_project_not_found(client, auth_headers):
    """Test updating project that doesn't exist."""
    response = await client.patch(
        "/api/projects/00000000-0000-0000-0000-000000000000",
        headers=auth_headers,
        json={"name": "Updated"},
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_project_not_member(client, auth_headers2, test_project):
    """Test updating project when not a team member."""
    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers2,
        json={"name": "Unauthorized Update"},
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_delete_project_not_found(client, auth_headers):
    """Test deleting project that doesn't exist."""
    response = await client.delete(
        "/api/projects/00000000-0000-0000-0000-000000000000",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_list_projects_with_pagination(client, auth_headers, test_team, db):
    """Test listing projects with skip and limit."""
    from app.oxyde_models.project import OxydeProject

    # Create multiple projects
    for i in range(5):
        project = await OxydeProject.objects.create(
            team_id=test_team.id,
            name=f"Project {i}",
            key=f"PRJ{i}",
        )

    response = await client.get(
        f"/api/projects?team_id={test_team.id}&skip=1&limit=2",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    # We have at least 6 projects (test_project + 5 created), limit is 2
    assert len(data) == 2


@pytest.mark.asyncio
async def test_update_project_color(client, auth_headers, test_project):
    """Test updating project color."""
    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
        json={"color": "#00ff00"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["color"] == "#00ff00"


@pytest.mark.asyncio
async def test_update_project_unestimated_handling(client, auth_headers, test_project):
    """Test updating project unestimated handling."""
    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
        json={"unestimated_handling": "block_until_estimated"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["unestimated_handling"] == "block_until_estimated"


@pytest.mark.asyncio
async def test_create_project_minimal(client, auth_headers, test_team):
    """Test creating project with minimal data."""
    response = await client.post(
        f"/api/projects?team_id={test_team.id}",
        headers=auth_headers,
        json={
            "name": "Minimal Project",
            "key": "MIN",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Minimal Project"
    assert data["key"] == "MIN"
    assert data["description"] is None


@pytest.mark.asyncio
async def test_update_project_partial(client, auth_headers, test_project):
    """Test partial project update preserves other fields."""
    original_name = test_project.name

    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
        json={"description": "Updated description only"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["description"] == "Updated description only"
    assert data["name"] == original_name


# --- Service-level coverage tests (CHT-922) ---

@pytest.mark.asyncio
async def test_project_service_increment_issue_count(db, test_project):
    """Test ProjectService.increment_issue_count (covers project_service.py L79-82)."""
    from app.services.project_service import ProjectService

    service = ProjectService()
    original_count = test_project.issue_count
    new_count = await service.increment_issue_count(test_project)

    assert new_count == original_count + 1
    assert test_project.issue_count == original_count + 1
