"""E2E contract tests: Sprints."""
import pytest
from cli.client import APIError


class TestSprintCRUD:
    def test_get_current_sprint(self, api_client, test_project):
        sprint = api_client.get_current_sprint(test_project["id"])
        assert "id" in sprint
        assert "name" in sprint

    def test_get_sprints(self, api_client, test_project):
        # Ensure sprints exist
        api_client.get_current_sprint(test_project["id"])
        sprints = api_client.get_sprints(test_project["id"])
        assert isinstance(sprints, list)
        assert len(sprints) >= 1

    def test_get_sprint_by_id(self, api_client, test_project):
        current = api_client.get_current_sprint(test_project["id"])
        sprint = api_client.get_sprint(current["id"])
        assert sprint["id"] == current["id"]

    def test_update_sprint(self, api_client, test_project):
        current = api_client.get_current_sprint(test_project["id"])
        updated = api_client.update_sprint(current["id"], budget=20)
        assert updated["budget"] == 20

    def test_planned_sprint_follows_default_again(self, api_client, test_project):
        """CHT-1701: a hand-set planned budget can be made to follow the
        project default again, and then takes later defaults."""
        api_client.get_current_sprint(test_project["id"])
        planned = api_client.get_sprints(test_project["id"], status="planned")[0]
        api_client.update_project(test_project["id"], default_sprint_budget=24)

        hand_set = api_client.update_sprint(planned["id"], budget=7)
        assert hand_set["budget"] == 7 and hand_set["budget_explicit"] is True

        reset = api_client.update_sprint(planned["id"], budget_follows_default=True)
        assert reset["budget"] == 24 and reset["budget_explicit"] is False

        api_client.update_project(test_project["id"], default_sprint_budget=30)
        assert api_client.get_sprint(planned["id"])["budget"] == 30

    def test_follows_default_with_budget_is_rejected(self, api_client, test_project):
        api_client.get_current_sprint(test_project["id"])
        planned = api_client.get_sprints(test_project["id"], status="planned")[0]
        with pytest.raises(APIError):
            api_client.update_sprint(planned["id"], budget=7, budget_follows_default=True)

    def test_close_sprint(self, api_client, test_project):
        current = api_client.get_current_sprint(test_project["id"])
        result = api_client.close_sprint(current["id"])
        assert result is not None

    def test_get_sprints_by_status(self, api_client, test_project):
        api_client.get_current_sprint(test_project["id"])
        active = api_client.get_sprints(test_project["id"], status="active")
        assert isinstance(active, list)

    def test_get_sprint_not_found(self, api_client):
        with pytest.raises(APIError):
            api_client.get_sprint("nonexistent-id")

    def test_get_sprints_unauthenticated(self, unauthenticated_client):
        with pytest.raises(APIError):
            unauthenticated_client.get_sprints("fake-project")
