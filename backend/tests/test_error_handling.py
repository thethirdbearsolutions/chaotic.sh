"""Systematic error handling tests across all routers (CHT-944).

Ensures consistent 401/403/404/422 responses for every router.
Focuses on routers with gaps identified in the error audit.
"""
import pytest


# === Unauthenticated access (401) tests for routers missing them ===


@pytest.mark.asyncio
class TestProjectsUnauthenticated:
    """Projects router: unauthenticated access should return 401."""

    async def test_create_project_unauthenticated(self, client, test_team):
        response = await client.post(
            f"/api/projects?team_id={test_team.id}",
            json={"name": "Unauthorized", "key": "NOAUTH"},
        )
        assert response.status_code == 401

    async def test_list_projects_unauthenticated(self, client, test_team):
        response = await client.get(f"/api/projects?team_id={test_team.id}")
        assert response.status_code == 401

    async def test_get_project_unauthenticated(self, client, test_project):
        response = await client.get(f"/api/projects/{test_project.id}")
        assert response.status_code == 401

    async def test_update_project_unauthenticated(self, client, test_project):
        response = await client.patch(
            f"/api/projects/{test_project.id}",
            json={"name": "Hacked"},
        )
        assert response.status_code == 401

    async def test_delete_project_unauthenticated(self, client, test_project):
        response = await client.delete(f"/api/projects/{test_project.id}")
        assert response.status_code == 401


@pytest.mark.asyncio
class TestSprintsUnauthenticated:
    """Sprints router: unauthenticated access should return 401."""

    async def test_list_sprints_unauthenticated(self, client, test_project):
        response = await client.get(
            f"/api/sprints?project_id={test_project.id}",
        )
        assert response.status_code == 401

    async def test_get_sprint_unauthenticated(self, client, test_sprint):
        response = await client.get(f"/api/sprints/{test_sprint.id}")
        assert response.status_code == 401

    async def test_update_sprint_unauthenticated(self, client, test_sprint):
        response = await client.patch(
            f"/api/sprints/{test_sprint.id}",
            json={"name": "Hacked Sprint"},
        )
        assert response.status_code == 401


@pytest.mark.asyncio
class TestTeamsUnauthenticated:
    """Teams router: unauthenticated access should return 401."""

    async def test_create_team_unauthenticated(self, client):
        response = await client.post(
            "/api/teams",
            json={"name": "Unauthorized Team", "slug": "unauth"},
        )
        assert response.status_code == 401

    async def test_list_teams_unauthenticated(self, client):
        response = await client.get("/api/teams")
        assert response.status_code == 401

    async def test_get_team_unauthenticated(self, client, test_team):
        response = await client.get(f"/api/teams/{test_team.id}")
        assert response.status_code == 401


@pytest.mark.asyncio
class TestLabelsUnauthenticated:
    """Labels router: unauthenticated access should return 401."""

    async def test_create_label_unauthenticated(self, client, test_team):
        response = await client.post(
            f"/api/labels?team_id={test_team.id}",
            json={"name": "Unauthorized Label"},
        )
        assert response.status_code == 401

    async def test_list_labels_unauthenticated(self, client, test_team):
        response = await client.get(f"/api/labels?team_id={test_team.id}")
        assert response.status_code == 401


# === Validation error (422) tests ===


@pytest.mark.asyncio
class TestValidationErrors:
    """Pydantic validation should return 422 for malformed input."""

    async def test_create_project_missing_name(self, client, auth_headers, test_team):
        """Project creation without required 'name' field."""
        response = await client.post(
            f"/api/projects?team_id={test_team.id}",
            headers=auth_headers,
            json={"key": "NONAME"},
        )
        assert response.status_code == 422

    async def test_create_project_missing_key(self, client, auth_headers, test_team):
        """Project creation without required 'key' field."""
        response = await client.post(
            f"/api/projects?team_id={test_team.id}",
            headers=auth_headers,
            json={"name": "No Key"},
        )
        assert response.status_code == 422

    async def test_create_issue_empty_title(self, client, auth_headers, test_project):
        """Issue creation with empty title should fail validation."""
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={"title": ""},
        )
        assert response.status_code == 422

    async def test_create_issue_estimate_out_of_range(self, client, auth_headers, test_project):
        """Issue creation with estimate > 100 should fail validation."""
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={"title": "Bad Estimate", "estimate": 999},
        )
        assert response.status_code == 422

    async def test_batch_update_empty_ids(self, client, auth_headers):
        """Batch update with empty issue_ids should fail validation."""
        response = await client.post(
            "/api/issues/batch-update",
            headers=auth_headers,
            json={"issue_ids": [], "priority": "high"},
        )
        assert response.status_code == 422

    async def test_signup_missing_email(self, client):
        """Signup without email should fail validation."""
        response = await client.post(
            "/api/auth/signup",
            json={"name": "No Email", "password": "password123"},
        )
        assert response.status_code == 422

    async def test_signup_missing_password(self, client):
        """Signup without password should fail validation."""
        response = await client.post(
            "/api/auth/signup",
            json={"name": "No Pass", "email": "nopass@example.com"},
        )
        assert response.status_code == 422

    async def test_login_missing_email(self, client):
        """Login without email should fail validation."""
        response = await client.post(
            "/api/auth/login",
            json={"password": "password123"},
        )
        assert response.status_code == 422


# === Not found (404) edge cases ===


@pytest.mark.asyncio
class TestNotFoundEdgeCases:
    """404 responses for nonexistent resources in under-tested routers."""

    async def test_get_sprint_not_found(self, client, auth_headers):
        response = await client.get(
            "/api/sprints/nonexistent-sprint-id",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_update_sprint_not_found(self, client, auth_headers):
        response = await client.patch(
            "/api/sprints/nonexistent-sprint-id",
            headers=auth_headers,
            json={"name": "Ghost Sprint"},
        )
        assert response.status_code == 404

    async def test_get_label_not_found(self, client, auth_headers):
        """GET /labels/{id} for nonexistent label."""
        response = await client.get(
            "/api/labels/nonexistent-label-id",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_get_team_not_found(self, client, auth_headers):
        """GET /teams/{id} for nonexistent team."""
        response = await client.get(
            "/api/teams/nonexistent-team-id",
            headers=auth_headers,
        )
        assert response.status_code == 404
