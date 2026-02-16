"""E2E contract tests: Projects."""
import pytest
from cli.client import APIError


class TestProjectCRUD:
    def test_create_project(self, api_client, test_team):
        project = api_client.create_project(test_team["id"], "New Project", "NEW")
        assert project["name"] == "New Project"
        assert project["key"] == "NEW"
        assert "id" in project

    def test_create_project_duplicate_key(self, api_client, test_team, test_project):
        with pytest.raises(APIError):
            api_client.create_project(test_team["id"], "Dup", "E2E")

    def test_get_projects(self, api_client, test_team, test_project):
        projects = api_client.get_projects(test_team["id"])
        assert isinstance(projects, list)
        assert any(p["id"] == test_project["id"] for p in projects)

    def test_get_project(self, api_client, test_project):
        project = api_client.get_project(test_project["id"])
        assert project["name"] == "E2E Project"

    def test_get_project_not_found(self, api_client):
        with pytest.raises(APIError):
            api_client.get_project("nonexistent-id")

    def test_update_project(self, api_client, test_project):
        updated = api_client.update_project(test_project["id"], description="Updated")
        assert updated["description"] == "Updated"

    def test_delete_project(self, api_client, test_team):
        project = api_client.create_project(test_team["id"], "To Delete", "DEL")
        api_client.delete_project(project["id"])
        with pytest.raises(APIError):
            api_client.get_project(project["id"])

    def test_create_project_unauthenticated(self, unauthenticated_client):
        with pytest.raises(APIError):
            unauthenticated_client.create_project("fake-team", "No Auth", "NAH")
