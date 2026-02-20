"""Tests for agent-scoped access to team and agent HTTP endpoints (CHT-733).

Verifies that agents authenticating via API key can access team endpoints
they're scoped to, and are denied access to other teams' endpoints.
"""
import pytest
import pytest_asyncio

from app.services.agent_service import AgentService
from app.schemas.agent import AgentCreate


@pytest_asyncio.fixture
async def team_agent(db, test_user, test_team):
    """Create a team-scoped agent and return (agent, api_key)."""
    service = AgentService()
    agent, api_key, _ = await service.create(
        AgentCreate(name="Team Bot"), test_user, test_team.id
    )
    return agent, api_key


@pytest_asyncio.fixture
async def agent_headers(team_agent):
    """Auth headers for team-scoped agent."""
    _, api_key = team_agent
    return {"Authorization": f"Bearer {api_key}"}


@pytest_asyncio.fixture
async def other_team(db):
    """Create a second team with no members."""
    from app.oxyde_models.team import OxydeTeam

    team = await OxydeTeam.objects.create(name="Other Team", key="OTHER")
    return team


@pytest.mark.asyncio
class TestAgentGetTeam:
    """Tests for agent accessing GET /teams/{team_id}."""

    async def test_agent_can_get_own_team(self, client, agent_headers, test_team):
        """Agent should access the team it's scoped to."""
        response = await client.get(
            f"/api/teams/{test_team.id}", headers=agent_headers
        )

        assert response.status_code == 200
        assert response.json()["id"] == test_team.id

    async def test_agent_cannot_get_other_team(self, client, agent_headers, other_team):
        """Agent should be denied access to a different team."""
        response = await client.get(
            f"/api/teams/{other_team.id}", headers=agent_headers
        )

        assert response.status_code == 403


@pytest.mark.asyncio
class TestAgentListTeamMembers:
    """Tests for agent accessing GET /teams/{team_id}/members."""

    async def test_agent_can_list_own_team_members(self, client, agent_headers, test_team):
        """Agent should list members of the team it's scoped to."""
        response = await client.get(
            f"/api/teams/{test_team.id}/members", headers=agent_headers
        )

        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1

    async def test_agent_cannot_list_other_team_members(self, client, agent_headers, other_team):
        """Agent should be denied listing members of a different team."""
        response = await client.get(
            f"/api/teams/{other_team.id}/members", headers=agent_headers
        )

        assert response.status_code == 403


@pytest.mark.asyncio
class TestAgentListTeamAgents:
    """Tests for agent accessing GET /teams/{team_id}/agents."""

    async def test_agent_can_list_own_team_agents(self, client, agent_headers, test_team, team_agent):
        """Agent should list agents of the team it's scoped to."""
        agent, _ = team_agent

        response = await client.get(
            f"/api/teams/{test_team.id}/agents", headers=agent_headers
        )

        assert response.status_code == 200
        data = response.json()
        assert any(a["id"] == agent.id for a in data)

    async def test_agent_cannot_list_other_team_agents(self, client, agent_headers, other_team):
        """Agent should be denied listing agents of a different team."""
        response = await client.get(
            f"/api/teams/{other_team.id}/agents", headers=agent_headers
        )

        assert response.status_code == 403


@pytest.mark.asyncio
class TestAgentGetAgent:
    """Tests for agent accessing GET /agents/{agent_id}."""

    async def test_agent_can_get_same_team_agent(
        self, client, agent_headers, test_team, db, test_user
    ):
        """Agent should access another agent in the same team."""
        service = AgentService()
        other_agent, _, _ = await service.create(
            AgentCreate(name="Other Bot"), test_user, test_team.id
        )

        response = await client.get(
            f"/api/agents/{other_agent.id}", headers=agent_headers
        )

        assert response.status_code == 200
        assert response.json()["id"] == other_agent.id

    async def test_agent_can_get_self(self, client, agent_headers, team_agent):
        """Agent should access its own record."""
        agent, _ = team_agent

        response = await client.get(
            f"/api/agents/{agent.id}", headers=agent_headers
        )

        assert response.status_code == 200
        assert response.json()["id"] == agent.id

    async def test_agent_cannot_get_other_team_agent(
        self, client, agent_headers, other_team, db, test_user
    ):
        """Agent should be denied access to an agent in a different team."""
        from app.oxyde_models.team import OxydeTeamMember
        from app.enums import TeamRole

        # Make test_user a member of other_team so they can create an agent there
        member = await OxydeTeamMember.objects.create(
            team_id=other_team.id, user_id=test_user.id, role=TeamRole.OWNER
        )

        service = AgentService()
        other_agent, _, _ = await service.create(
            AgentCreate(name="Other Team Bot"), test_user, other_team.id
        )

        response = await client.get(
            f"/api/agents/{other_agent.id}", headers=agent_headers
        )

        assert response.status_code == 403


@pytest.mark.asyncio
class TestAgentListMyTeams:
    """Tests for agent accessing GET /teams (list my teams)."""

    async def test_agent_list_teams_returns_scoped_team(self, client, agent_headers, test_team):
        """Agent listing teams returns the team it's scoped to."""
        response = await client.get("/api/teams", headers=agent_headers)

        assert response.status_code == 200
        data = response.json()
        assert len(data) == 1
        assert data[0]["id"] == test_team.id


@pytest.mark.asyncio
class TestAgentWriteOperations:
    """Tests that agents cannot perform write/admin operations."""

    async def test_agent_cannot_update_team(self, client, agent_headers, test_team):
        """Agent should not be able to update a team."""
        response = await client.patch(
            f"/api/teams/{test_team.id}",
            json={"name": "Agent Updated"},
            headers=agent_headers,
        )

        assert response.status_code == 403
        assert "admin" in response.json()["detail"].lower()

    async def test_agent_cannot_delete_team(self, client, agent_headers, test_team):
        """Agent should not be able to delete a team."""
        response = await client.delete(
            f"/api/teams/{test_team.id}", headers=agent_headers
        )

        assert response.status_code == 403
        assert "owner" in response.json()["detail"].lower()

    async def test_agent_cannot_invite_to_team(self, client, agent_headers, test_team):
        """Agent should not be able to create team invitations."""
        response = await client.post(
            f"/api/teams/{test_team.id}/invitations",
            json={"email": "new@example.com", "role": "member"},
            headers=agent_headers,
        )

        assert response.status_code == 403

    async def test_agent_cannot_update_agent(
        self, client, agent_headers, team_agent, test_team, db, test_user
    ):
        """Agent should not be able to update another agent."""
        service = AgentService()
        other_agent, _, _ = await service.create(
            AgentCreate(name="Other Bot"), test_user, test_team.id
        )

        response = await client.patch(
            f"/api/agents/{other_agent.id}",
            json={"name": "Hacked"},
            headers=agent_headers,
        )

        assert response.status_code == 403

    async def test_agent_cannot_delete_agent(
        self, client, agent_headers, team_agent, test_team, db, test_user
    ):
        """Agent should not be able to delete another agent."""
        service = AgentService()
        other_agent, _, _ = await service.create(
            AgentCreate(name="Other Bot"), test_user, test_team.id
        )

        response = await client.delete(
            f"/api/agents/{other_agent.id}",
            headers=agent_headers,
        )

        assert response.status_code == 403

    async def test_agent_cannot_create_team(self, client, agent_headers):
        """Agent should not be able to create a new team."""
        response = await client.post(
            "/api/teams",
            json={"name": "Agent Team", "key": "AGNT"},
            headers=agent_headers,
        )

        assert response.status_code == 403
        assert "agent" in response.json()["detail"].lower()


@pytest.mark.asyncio
class TestProjectScopedAgent:
    """Tests for project-scoped agent access control."""

    async def test_project_agent_can_get_own_team(
        self, client, test_user, test_team, test_project, db
    ):
        """Project-scoped agent should access its team."""
        service = AgentService()
        agent, api_key, _ = await service.create(
            AgentCreate(name="Project Bot"), test_user, test_team.id, test_project.id
        )
        headers = {"Authorization": f"Bearer {api_key}"}

        response = await client.get(
            f"/api/teams/{test_team.id}", headers=headers
        )

        assert response.status_code == 200
        assert response.json()["id"] == test_team.id

    async def test_project_agent_cannot_get_other_team(
        self, client, test_user, test_team, test_project, other_team, db
    ):
        """Project-scoped agent should be denied access to a different team."""
        service = AgentService()
        agent, api_key, _ = await service.create(
            AgentCreate(name="Project Bot"), test_user, test_team.id, test_project.id
        )
        headers = {"Authorization": f"Bearer {api_key}"}

        response = await client.get(
            f"/api/teams/{other_team.id}", headers=headers
        )

        assert response.status_code == 403
