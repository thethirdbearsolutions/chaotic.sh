"""Tests for path-nested scope-ID routes (CHT-1223).

Covers the query-vs-path scoping-ID inconsistency fix: path-nested
routes mirroring agents.py's shape are now the *only* way to
create/list projects/labels/documents (team-scoped) and
issues/sprints/rituals (project-scoped) -- BREAKING, sanctioned (see
nested.py's module docstring). The old query-param routes for these
six are gone; test_projects.py, test_labels.py, test_documents.py,
test_issues.py, test_sprints.py, test_rituals.py were updated to use
the new paths for their create/list assertions.
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

    async def test_create_project_nested_duplicate_key_rejected(self, client, auth_headers, test_team):
        """Same validation behavior as before the convention change: a
        second create with the same (team_id, key) 400s."""
        first = await client.post(
            f"/api/teams/{test_team.id}/projects",
            headers=auth_headers,
            json={"name": "Dup Key Project", "key": "DUPK"},
        )
        assert first.status_code == 201

        second = await client.post(
            f"/api/teams/{test_team.id}/projects",
            headers=auth_headers,
            json={"name": "Dup Key Project 2", "key": "DUPK"},
        )
        assert second.status_code == 400

    async def test_create_project_old_query_param_route_gone(self, client, auth_headers, test_team):
        """CHT-1223: the old ?team_id= flat-route shape is gone (breaking,
        sanctioned). ``/api/projects`` still resolves to something (the
        surviving ``GET /api/projects/{project_id}`` template), so the
        router reports 405 Method Not Allowed rather than 404 for this
        exact path+method combination -- either way, POST-without-a-
        path-segment no longer creates a project.
        """
        response = await client.post(
            f"/api/projects?team_id={test_team.id}",
            headers=auth_headers,
            json={"name": "Should 404", "key": "GONE"},
        )
        assert response.status_code in (404, 405)

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

    async def test_create_issue_old_query_param_route_gone(self, client, auth_headers, test_project):
        """CHT-1223: the old ?project_id= flat-route shape is gone
        (breaking, sanctioned) -- only GET /issues keeps a query-based
        project_id filter. POST /api/issues now 405s (GET /api/issues
        still exists) rather than 404 -- see
        test_create_project_old_query_param_route_gone for why either
        status is an acceptable "this no longer creates anything".
        """
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={"title": "Should 404"},
        )
        assert response.status_code in (404, 405)

    async def test_create_issue_nested_project_not_found(self, client, auth_headers):
        response = await client.post(
            "/api/projects/00000000-0000-0000-0000-000000000000/issues",
            headers=auth_headers,
            json={"title": "Orphan"},
        )
        assert response.status_code == 404
