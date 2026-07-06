"""Tests for path-nested alias routes (CHT-1223).

Covers the query-vs-path scoping-ID inconsistency's cheapest additive
fix: path-nested aliases that mirror agents.py's shape, alongside the
existing query-param routes (which stay working -- see test_projects.py,
test_labels.py, test_documents.py, test_issues.py, test_sprints.py,
test_rituals.py for those).
"""
import pytest


@pytest.mark.asyncio
class TestNestedTeamRoutes:
    async def test_create_project_nested(self, client, auth_headers, test_team):
        response = await client.post(
            f"/api/teams/{test_team.id}/projects",
            headers=auth_headers,
            json={"name": "Nested Project", "key": "NEST"},
        )
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "Nested Project"
        assert data["team_id"] == test_team.id

    async def test_list_projects_nested(self, client, auth_headers, test_team, test_project):
        response = await client.get(
            f"/api/teams/{test_team.id}/projects",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert any(p["id"] == test_project.id for p in data)

    async def test_create_project_nested_matches_query_param_route(self, client, auth_headers, test_team):
        """Both routes hit the same handler -- same auth/validation behavior."""
        nested = await client.post(
            f"/api/teams/{test_team.id}/projects",
            headers=auth_headers,
            json={"name": "Dup Key Project", "key": "DUPK"},
        )
        assert nested.status_code == 201

        # Same key again via the query-param route should 400 the same
        # way it would via a second nested-route call.
        via_query = await client.post(
            f"/api/projects?team_id={test_team.id}",
            headers=auth_headers,
            json={"name": "Dup Key Project 2", "key": "DUPK"},
        )
        assert via_query.status_code == 400

    async def test_create_label_nested(self, client, auth_headers, test_team):
        response = await client.post(
            f"/api/teams/{test_team.id}/labels",
            headers=auth_headers,
            json={"name": "urgent"},
        )
        assert response.status_code == 201
        assert response.json()["name"] == "urgent"

    async def test_list_labels_nested(self, client, auth_headers, test_team):
        await client.post(
            f"/api/teams/{test_team.id}/labels",
            headers=auth_headers,
            json={"name": "bug"},
        )
        response = await client.get(f"/api/teams/{test_team.id}/labels", headers=auth_headers)
        assert response.status_code == 200
        assert any(l["name"] == "bug" for l in response.json())

    async def test_create_document_nested(self, client, auth_headers, test_team):
        response = await client.post(
            f"/api/teams/{test_team.id}/documents",
            headers=auth_headers,
            json={"title": "Nested Doc"},
        )
        assert response.status_code == 201
        assert response.json()["title"] == "Nested Doc"

    async def test_list_documents_nested(self, client, auth_headers, test_team):
        await client.post(
            f"/api/teams/{test_team.id}/documents",
            headers=auth_headers,
            json={"title": "Listed Doc"},
        )
        response = await client.get(f"/api/teams/{test_team.id}/documents", headers=auth_headers)
        assert response.status_code == 200
        assert any(d["title"] == "Listed Doc" for d in response.json())

    async def test_create_project_nested_unauthorized(self, client, auth_headers2, test_team):
        """Same auth check as the query-param route -- not a member, 403."""
        response = await client.post(
            f"/api/teams/{test_team.id}/projects",
            headers=auth_headers2,
            json={"name": "Nope", "key": "NOPE"},
        )
        assert response.status_code == 403


@pytest.mark.asyncio
class TestNestedProjectRoutes:
    async def test_create_issue_nested(self, client, auth_headers, test_project):
        response = await client.post(
            f"/api/projects/{test_project.id}/issues",
            headers=auth_headers,
            json={"title": "Nested Issue"},
        )
        assert response.status_code == 201
        data = response.json()
        assert data["title"] == "Nested Issue"
        assert data["project_id"] == test_project.id

    async def test_create_sprint_nested(self, client, auth_headers, test_project):
        response = await client.post(
            f"/api/projects/{test_project.id}/sprints",
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert response.json()["project_id"] == test_project.id

    async def test_list_sprints_nested(self, client, auth_headers, test_project):
        await client.post(f"/api/projects/{test_project.id}/sprints", headers=auth_headers)
        response = await client.get(f"/api/projects/{test_project.id}/sprints", headers=auth_headers)
        assert response.status_code == 200
        assert len(response.json()) >= 1

    async def test_create_ritual_nested(self, client, auth_headers, test_project):
        response = await client.post(
            f"/api/projects/{test_project.id}/rituals",
            headers=auth_headers,
            json={"name": "nested-ritual", "prompt": "Did you test?"},
        )
        assert response.status_code == 201
        assert response.json()["name"] == "nested-ritual"

    async def test_list_rituals_nested(self, client, auth_headers, test_project):
        await client.post(
            f"/api/projects/{test_project.id}/rituals",
            headers=auth_headers,
            json={"name": "listed-ritual", "prompt": "Did you test?"},
        )
        response = await client.get(f"/api/projects/{test_project.id}/rituals", headers=auth_headers)
        assert response.status_code == 200
        assert any(r["name"] == "listed-ritual" for r in response.json())

    async def test_create_issue_nested_project_not_found(self, client, auth_headers):
        response = await client.post(
            "/api/projects/00000000-0000-0000-0000-000000000000/issues",
            headers=auth_headers,
            json={"title": "Orphan"},
        )
        assert response.status_code == 404
