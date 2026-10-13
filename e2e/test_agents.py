"""E2E contract tests: Agents."""
from contextlib import contextmanager
from unittest.mock import patch

import pytest
from cli.client import APIError, Client
from conftest import TEST_BASE_URL


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



@contextmanager
def _as_agent(key):
    """A CLI Client authenticated with an agent's API key."""
    with patch("cli.client.get_api_url", return_value=TEST_BASE_URL), \
         patch("cli.client.get_token", return_value=None), \
         patch("cli.client.get_api_key", return_value=key):
        yield Client()


class TestDeletingTheOwner:
    """DELETE /users/me follows the agent-delete rule for the account and
    every agent it owns (CHT-1467)."""

    def test_an_agent_with_authored_work_blocks_its_owners_deletion(self, api_client, test_project, test_team):
        agent = api_client.create_team_agent(test_team["id"], "Worker")
        with _as_agent(agent["api_key"]) as agent_client:
            issue = agent_client.create_issue(test_project["id"], "written by the agent")

        with pytest.raises(APIError) as refused:
            api_client.delete_me()

        assert refused.value.status_code == 409
        assert f"'Worker' ({agent['id'][:8]}) authored 1 issue, 1 issue activity entry" in str(refused.value)
        assert api_client.get_agent(agent["id"])["id"] == agent["id"]
        assert api_client.get_issue(issue["id"])["creator_id"] == agent["id"]

    def test_an_idle_agent_is_deleted_with_its_owner(self, api_client, test_team):
        agent = api_client.create_team_agent(test_team["id"], "Idle")

        api_client.delete_me()

        with pytest.raises(APIError) as gone:
            api_client.get_me()
        assert gone.value.status_code == 401
        with _as_agent(agent["api_key"]) as agent_client, pytest.raises(APIError) as revoked:
            agent_client.get_me()
        assert revoked.value.status_code == 401

    def test_an_agent_cannot_delete_itself_through_users_me(self, api_client, test_team):
        agent = api_client.create_team_agent(test_team["id"], "Self")

        with _as_agent(agent["api_key"]) as agent_client, pytest.raises(APIError) as refused:
            agent_client.delete_me()

        assert refused.value.status_code == 403
        assert api_client.get_agent(agent["id"])["name"] == "Self"


class TestRegistration:
    """POST /agents/register through the CLI client (CHT-1498)."""

    def test_a_registrar_registers_a_session_that_writes_as_itself(self, api_client, test_team, test_project):
        registrar = api_client.create_team_agent(test_team["id"], "Harness")
        api_client.update_agent(registrar["id"], can_register=True)
        ref = "claude-code:session:e2e-0001"

        with _as_agent(registrar["api_key"]) as harness:
            first = harness.register_agent(ref, name="Claude · e2e")
            again = harness.register_agent(ref)
            with pytest.raises(APIError) as refused:
                harness.create_issue(project_id=test_project["id"], title="as the harness")
        assert refused.value.status_code == 403

        assert first["created"] is True and again["created"] is False
        assert again["agent"]["id"] == first["agent"]["id"] and again["agent"]["name"] == "Claude · e2e"
        assert again["agent"]["kind"] == "session" and again["agent"]["registered_by_id"] == registrar["id"]

        with _as_agent(again["api_key"]) as session:
            issue = session.create_issue(project_id=test_project["id"], title="by the session")
        assert issue["creator"]["kind"] == "session"
        assert issue["creator"]["registered_by_name"] == "Harness"
