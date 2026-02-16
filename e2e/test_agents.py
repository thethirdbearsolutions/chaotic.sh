"""E2E contract tests: Agents."""
import pytest
from cli.client import APIError


class TestTeamAgents:
    def test_create_team_agent(self, api_client, test_team):
        agent = api_client.create_team_agent(test_team["id"], "Test Agent")
        assert agent["name"] == "Test Agent"
        assert "id" in agent

    def test_get_team_agents(self, api_client, test_team):
        api_client.create_team_agent(test_team["id"], "Agent A")
        api_client.create_team_agent(test_team["id"], "Agent B")
        agents = api_client.get_team_agents(test_team["id"])
        assert isinstance(agents, list)
        assert len(agents) >= 2

    def test_get_agent(self, api_client, test_team):
        created = api_client.create_team_agent(test_team["id"], "Get Agent")
        fetched = api_client.get_agent(created["id"])
        assert fetched["id"] == created["id"]
        assert fetched["name"] == "Get Agent"

    def test_update_agent(self, api_client, test_team):
        agent = api_client.create_team_agent(test_team["id"], "Old Name")
        updated = api_client.update_agent(agent["id"], name="New Name")
        assert updated["name"] == "New Name"

    def test_delete_agent(self, api_client, test_team):
        agent = api_client.create_team_agent(test_team["id"], "To Delete")
        api_client.delete_agent(agent["id"])
        with pytest.raises(APIError):
            api_client.get_agent(agent["id"])

    def test_get_agent_not_found(self, api_client):
        with pytest.raises(APIError):
            api_client.get_agent("nonexistent-id")


class TestProjectAgents:
    def test_create_project_agent(self, api_client, test_project):
        agent = api_client.create_project_agent(test_project["id"], "Proj Agent")
        assert agent["name"] == "Proj Agent"
        assert "id" in agent
