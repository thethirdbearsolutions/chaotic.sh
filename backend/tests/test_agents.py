"""Tests for agent functionality.

Tests cover:
- Agent service (CRUD operations)
- Agent API endpoints
- Agent authentication and access control
"""
import pytest

from app.services.agent_service import AgentService
from app.schemas.agent import AgentCreate, AgentUpdate


@pytest.mark.asyncio
class TestAgentServiceCreate:
    """Tests for agent creation."""

    async def test_create_team_scoped_agent(self, db_session, test_user, test_team):
        """Should create a team-scoped agent with API key."""
        service = AgentService(db_session)
        agent_in = AgentCreate(name="Team Bot")

        agent, api_key, key_id = await service.create(
            agent_in, test_user, test_team.id, project_id=None
        )

        assert agent is not None
        assert agent.name == "Team Bot"
        assert agent.is_agent is True
        assert agent.parent_user_id == test_user.id
        assert agent.agent_team_id == test_team.id
        assert agent.agent_project_id is None
        assert api_key.startswith("ck_")

    async def test_create_project_scoped_agent(self, db_session, test_user, test_team, test_project):
        """Should create a project-scoped agent with API key."""
        service = AgentService(db_session)
        agent_in = AgentCreate(name="Project Bot")

        agent, api_key, key_id = await service.create(
            agent_in, test_user, test_team.id, project_id=test_project.id
        )

        assert agent is not None
        assert agent.name == "Project Bot"
        assert agent.is_agent is True
        assert agent.agent_team_id == test_team.id
        assert agent.agent_project_id == test_project.id
        assert api_key.startswith("ck_")

    async def test_agent_has_unique_email(self, db_session, test_user, test_team):
        """Each agent should have a unique email."""
        service = AgentService(db_session)

        agent1, _, _ = await service.create(
            AgentCreate(name="Bot 1"), test_user, test_team.id
        )
        agent2, _, _ = await service.create(
            AgentCreate(name="Bot 2"), test_user, test_team.id
        )

        assert agent1.email != agent2.email
        assert "@agent.local" in agent1.email
        assert "@agent.local" in agent2.email


@pytest.mark.asyncio
class TestAgentServiceList:
    """Tests for listing agents."""

    async def test_list_by_team(self, db_session, test_user, test_team, test_project):
        """Should list all agents for a team including project-scoped ones."""
        service = AgentService(db_session)

        # Create team-scoped agent
        await service.create(AgentCreate(name="Team Bot"), test_user, test_team.id)
        # Create project-scoped agent
        await service.create(
            AgentCreate(name="Project Bot"), test_user, test_team.id, test_project.id
        )

        agents = await service.list_by_team(test_team.id)

        assert len(agents) == 2
        names = {a.name for a in agents}
        assert "Team Bot" in names
        assert "Project Bot" in names

    async def test_list_by_project(self, db_session, test_user, test_team, test_project):
        """Should only list project-scoped agents."""
        service = AgentService(db_session)

        # Create team-scoped agent
        await service.create(AgentCreate(name="Team Bot"), test_user, test_team.id)
        # Create project-scoped agent
        await service.create(
            AgentCreate(name="Project Bot"), test_user, test_team.id, test_project.id
        )

        agents = await service.list_by_project(test_project.id)

        assert len(agents) == 1
        assert agents[0].name == "Project Bot"


@pytest.mark.asyncio
class TestAgentServiceUpdate:
    """Tests for updating agents."""

    async def test_update_agent_name(self, db_session, test_user, test_team):
        """Should update agent name."""
        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Old Name"), test_user, test_team.id
        )

        updated = await service.update(agent, AgentUpdate(name="New Name"))

        assert updated.name == "New Name"

    async def test_update_agent_avatar(self, db_session, test_user, test_team):
        """Should update agent avatar."""
        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Bot"), test_user, test_team.id
        )

        updated = await service.update(agent, AgentUpdate(avatar_url="https://example.com/avatar.png"))

        assert updated.avatar_url == "https://example.com/avatar.png"


@pytest.mark.asyncio
class TestAgentServiceDelete:
    """Tests for deleting agents."""

    async def test_delete_agent(self, db_session, test_user, test_team):
        """Should delete agent."""
        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Bot"), test_user, test_team.id
        )
        agent_id = agent.id

        await service.delete(agent)

        result = await service.get_by_id(agent_id)
        assert result is None


@pytest.mark.asyncio
class TestAgentAuthentication:
    """Tests for agent authentication."""

    async def test_agent_api_key_authenticates_as_agent(self, db_session, test_user, test_team):
        """API key with agent_user_id should authenticate as the agent."""
        from app.services.api_key_service import APIKeyService

        agent_service = AgentService(db_session)
        api_key_service = APIKeyService(db_session)

        # Create agent
        agent, full_key, _ = await agent_service.create(
            AgentCreate(name="Bot"), test_user, test_team.id
        )

        # Validate the key
        key_record = await api_key_service.validate_key(full_key)

        assert key_record is not None
        assert key_record.agent_user_id == agent.id


@pytest.mark.asyncio
class TestAgentAccessControl:
    """Tests for agent access control."""

    async def test_team_scoped_agent_has_team_access(self, db_session, test_user, test_team):
        """Team-scoped agent should have access to the team."""
        from app.api.deps import check_user_team_access

        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Team Bot"), test_user, test_team.id
        )

        has_access = await check_user_team_access(db_session, agent, test_team.id)

        assert has_access is True

    async def test_team_scoped_agent_no_access_other_team(self, db_session, test_user, test_team, test_user2):
        """Team-scoped agent should not have access to other teams."""
        from app.api.deps import check_user_team_access
        from app.models import Team

        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Team Bot"), test_user, test_team.id
        )

        # Create another team
        other_team = Team(name="Other Team", key="OTHER")
        db_session.add(other_team)
        await db_session.commit()

        has_access = await check_user_team_access(db_session, agent, other_team.id)

        assert has_access is False

    async def test_project_scoped_agent_has_project_access(self, db_session, test_user, test_team, test_project):
        """Project-scoped agent should have access to its project."""
        from app.api.deps import check_user_project_access

        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Project Bot"), test_user, test_team.id, test_project.id
        )

        has_access = await check_user_project_access(
            db_session, agent, test_project.id, test_team.id
        )

        assert has_access is True

    async def test_project_scoped_agent_no_access_other_project(self, db_session, test_user, test_team, test_project):
        """Project-scoped agent should not have access to other projects."""
        from app.api.deps import check_user_project_access
        from app.models import Project

        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Project Bot"), test_user, test_team.id, test_project.id
        )

        # Create another project
        other_project = Project(
            team_id=test_team.id, name="Other Project", key="OTHER"
        )
        db_session.add(other_project)
        await db_session.commit()

        has_access = await check_user_project_access(
            db_session, agent, other_project.id, test_team.id
        )

        assert has_access is False

    async def test_team_scoped_agent_has_all_project_access(self, db_session, test_user, test_team, test_project):
        """Team-scoped agent should have access to all projects in the team."""
        from app.api.deps import check_user_project_access
        from app.models import Project

        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Team Bot"), test_user, test_team.id
        )

        # Create another project in the same team
        other_project = Project(
            team_id=test_team.id, name="Other Project", key="OTHER"
        )
        db_session.add(other_project)
        await db_session.commit()

        # Should have access to both projects
        has_access1 = await check_user_project_access(
            db_session, agent, test_project.id, test_team.id
        )
        has_access2 = await check_user_project_access(
            db_session, agent, other_project.id, test_team.id
        )

        assert has_access1 is True
        assert has_access2 is True


@pytest.mark.asyncio
class TestAgentAPIEndpoints:
    """Tests for agent API endpoints."""

    async def test_create_team_agent_endpoint(self, client, auth_headers, test_team):
        """POST /teams/{team_id}/agents should create agent."""
        response = await client.post(
            f"/api/teams/{test_team.id}/agents",
            json={"name": "API Bot"},
            headers=auth_headers,
        )

        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "API Bot"
        assert data["agent_team_id"] == test_team.id
        assert "api_key" in data  # Key shown on creation

    async def test_create_project_agent_endpoint(self, client, auth_headers, test_project):
        """POST /projects/{project_id}/agents should create project-scoped agent."""
        response = await client.post(
            f"/api/projects/{test_project.id}/agents",
            json={"name": "Project Bot"},
            headers=auth_headers,
        )

        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "Project Bot"
        assert data["agent_project_id"] == test_project.id

    async def test_list_agents_endpoint(self, client, auth_headers, test_team, db_session, test_user):
        """GET /teams/{team_id}/agents should list agents."""
        # Create an agent first
        service = AgentService(db_session)
        await service.create(AgentCreate(name="Bot"), test_user, test_team.id)

        response = await client.get(
            f"/api/teams/{test_team.id}/agents",
            headers=auth_headers,
        )

        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1

    async def test_delete_agent_endpoint(self, client, auth_headers, test_team, db_session, test_user):
        """DELETE /agents/{agent_id} should delete agent."""
        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Bot"), test_user, test_team.id
        )

        response = await client.delete(
            f"/api/agents/{agent.id}",
            headers=auth_headers,
        )

        assert response.status_code == 204

    async def test_non_member_cannot_create_agent(self, client, auth_headers2, test_team):
        """Non-team-member should not be able to create agents."""
        response = await client.post(
            f"/api/teams/{test_team.id}/agents",
            json={"name": "Sneaky Bot"},
            headers=auth_headers2,
        )

        assert response.status_code == 403

    async def test_get_agent_endpoint(self, client, auth_headers, test_team, db_session, test_user):
        """GET /agents/{agent_id} should return agent details."""
        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Test Bot"), test_user, test_team.id
        )

        response = await client.get(
            f"/api/agents/{agent.id}",
            headers=auth_headers,
        )

        assert response.status_code == 200
        data = response.json()
        assert data["id"] == agent.id
        assert data["name"] == "Test Bot"
        assert data["agent_team_id"] == test_team.id

    async def test_get_agent_not_found(self, client, auth_headers):
        """GET /agents/{agent_id} should return 404 for non-existent agent."""
        response = await client.get(
            "/api/agents/nonexistent-agent-id",
            headers=auth_headers,
        )

        assert response.status_code == 404
        assert "Agent not found" in response.json()["detail"]

    async def test_get_agent_not_authorized(self, client, auth_headers2, test_team, db_session, test_user):
        """GET /agents/{agent_id} should return 403 for non-team members."""
        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Test Bot"), test_user, test_team.id
        )

        response = await client.get(
            f"/api/agents/{agent.id}",
            headers=auth_headers2,
        )

        assert response.status_code == 403

    async def test_update_agent_endpoint(self, client, auth_headers, test_team, db_session, test_user):
        """PATCH /agents/{agent_id} should update agent."""
        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Old Name"), test_user, test_team.id
        )

        response = await client.patch(
            f"/api/agents/{agent.id}",
            json={"name": "New Name", "avatar_url": "https://example.com/avatar.png"},
            headers=auth_headers,
        )

        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "New Name"
        assert data["avatar_url"] == "https://example.com/avatar.png"

    async def test_update_agent_not_found(self, client, auth_headers):
        """PATCH /agents/{agent_id} should return 404 for non-existent agent."""
        response = await client.patch(
            "/api/agents/nonexistent-agent-id",
            json={"name": "Updated"},
            headers=auth_headers,
        )

        assert response.status_code == 404

    async def test_update_agent_not_authorized(self, client, auth_headers2, test_team, test_user2, db_session, test_user):
        """PATCH /agents/{agent_id} should return 403 for unauthorized users."""
        from app.models.team import TeamMember, TeamRole

        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Test Bot"), test_user, test_team.id
        )

        # Add user2 as a regular member (not admin)
        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)
        await db_session.commit()

        response = await client.patch(
            f"/api/agents/{agent.id}",
            json={"name": "Unauthorized Update"},
            headers=auth_headers2,
        )

        assert response.status_code == 403

    async def test_delete_agent_not_found(self, client, auth_headers):
        """DELETE /agents/{agent_id} should return 404 for non-existent agent."""
        response = await client.delete(
            "/api/agents/nonexistent-agent-id",
            headers=auth_headers,
        )

        assert response.status_code == 404

    async def test_delete_agent_not_authorized(self, client, auth_headers2, test_team, test_user2, db_session, test_user):
        """DELETE /agents/{agent_id} should return 403 for unauthorized users."""
        from app.models.team import TeamMember, TeamRole

        service = AgentService(db_session)
        agent, _, _ = await service.create(
            AgentCreate(name="Test Bot"), test_user, test_team.id
        )

        # Add user2 as a regular member (not admin)
        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)
        await db_session.commit()

        response = await client.delete(
            f"/api/agents/{agent.id}",
            headers=auth_headers2,
        )

        assert response.status_code == 403

    async def test_create_team_agent_team_not_found(self, client, auth_headers):
        """POST /teams/{team_id}/agents should return 404 for non-existent team."""
        response = await client.post(
            "/api/teams/nonexistent-team-id/agents",
            json={"name": "Bot"},
            headers=auth_headers,
        )

        assert response.status_code == 404
        assert "Team not found" in response.json()["detail"]

    async def test_create_project_agent_project_not_found(self, client, auth_headers):
        """POST /projects/{project_id}/agents should return 404 for non-existent project."""
        response = await client.post(
            "/api/projects/nonexistent-project-id/agents",
            json={"name": "Bot"},
            headers=auth_headers,
        )

        assert response.status_code == 404
        assert "Project not found" in response.json()["detail"]

    async def test_create_project_agent_not_member(self, client, auth_headers2, test_project):
        """POST /projects/{project_id}/agents should return 403 for non-team members."""
        response = await client.post(
            f"/api/projects/{test_project.id}/agents",
            json={"name": "Bot"},
            headers=auth_headers2,
        )

        assert response.status_code == 403

    async def test_list_agents_team_not_found(self, client, auth_headers):
        """GET /teams/{team_id}/agents should return 404 for non-existent team."""
        response = await client.get(
            "/api/teams/nonexistent-team-id/agents",
            headers=auth_headers,
        )

        assert response.status_code == 404

    async def test_list_agents_not_member(self, client, auth_headers2, test_team):
        """GET /teams/{team_id}/agents should return 403 for non-members."""
        response = await client.get(
            f"/api/teams/{test_team.id}/agents",
            headers=auth_headers2,
        )

        assert response.status_code == 403

    async def test_agent_cannot_create_team_agent(self, client, test_team, db_session, test_user):
        """POST /teams/{team_id}/agents should return 403 when called by an agent.

        Note: Currently agents fail the membership check first (they don't have TeamMember
        records). The "Agents cannot create other agents" check at lines 42-46 is dead code
        as a result. This test documents actual behavior.
        """
        # Create an agent first
        service = AgentService(db_session)
        agent, api_key, _ = await service.create(
            AgentCreate(name="Parent Bot"), test_user, test_team.id
        )

        # Try to create another agent using the agent's API key
        response = await client.post(
            f"/api/teams/{test_team.id}/agents",
            json={"name": "Child Bot"},
            headers={"Authorization": f"Bearer {api_key}"},
        )

        # Agent is rejected because get_member doesn't find a TeamMember record for agents
        assert response.status_code == 403
        assert "Not a member" in response.json()["detail"]

    async def test_agent_with_membership_cannot_create_team_agent(self, client, test_team, db_session, test_user):
        """POST /teams/{team_id}/agents returns 403 for agent even with TeamMember record.

        Covers agents.py L42-46: the is_agent check that fires after membership passes.
        """
        from app.models.team import TeamMember, TeamRole

        service = AgentService(db_session)
        agent, api_key, _ = await service.create(
            AgentCreate(name="Member Bot"), test_user, test_team.id
        )

        # Manually give the agent a TeamMember record
        member = TeamMember(team_id=test_team.id, user_id=agent.id, role=TeamRole.MEMBER)
        db_session.add(member)
        await db_session.commit()

        response = await client.post(
            f"/api/teams/{test_team.id}/agents",
            json={"name": "Child Bot"},
            headers={"Authorization": f"Bearer {api_key}"},
        )
        assert response.status_code == 403
        assert "Agents cannot create other agents" in response.json()["detail"]

    async def test_agent_cannot_create_project_agent(self, client, test_team, test_project, db_session, test_user):
        """POST /projects/{project_id}/agents should return 403 when called by an agent.

        Note: Currently agents fail the membership check first (they don't have TeamMember
        records). The "Agents cannot create other agents" check at lines 99-103 is dead code
        as a result. This test documents actual behavior.
        """
        # Create an agent first
        service = AgentService(db_session)
        agent, api_key, _ = await service.create(
            AgentCreate(name="Parent Bot"), test_user, test_team.id
        )

        # Try to create another agent using the agent's API key
        response = await client.post(
            f"/api/projects/{test_project.id}/agents",
            json={"name": "Child Bot"},
            headers={"Authorization": f"Bearer {api_key}"},
        )

        # Agent is rejected because get_member doesn't find a TeamMember record for agents
        assert response.status_code == 403
        assert "Not a member" in response.json()["detail"]

    async def test_agent_with_membership_cannot_create_project_agent(
        self, client, test_team, test_project, db_session, test_user
    ):
        """POST /projects/{project_id}/agents returns 403 for agent with TeamMember record.

        Covers agents.py L99-103: the is_agent check for project-scoped agent creation.
        """
        from app.models.team import TeamMember, TeamRole

        service = AgentService(db_session)
        agent, api_key, _ = await service.create(
            AgentCreate(name="Member Bot 2"), test_user, test_team.id
        )

        # Manually give the agent a TeamMember record
        member = TeamMember(team_id=test_team.id, user_id=agent.id, role=TeamRole.MEMBER)
        db_session.add(member)
        await db_session.commit()

        response = await client.post(
            f"/api/projects/{test_project.id}/agents",
            json={"name": "Child Bot"},
            headers={"Authorization": f"Bearer {api_key}"},
        )
        assert response.status_code == 403
        assert "Agents cannot create other agents" in response.json()["detail"]


# --- Service-level coverage tests (CHT-922) ---

@pytest.mark.asyncio
async def test_agent_service_list_by_parent(client, test_team, db_session, test_user, auth_headers):
    """Test AgentService.list_by_parent (covers agent_service.py L101-106)."""
    from app.services.agent_service import AgentService

    # Create an agent via API first
    response = await client.post(
        f"/api/teams/{test_team.id}/agents",
        json={"name": "List Parent Bot"},
        headers=auth_headers,
    )
    assert response.status_code == 201

    service = AgentService(db_session)
    agents = await service.list_by_parent(test_user.id)
    assert len(agents) >= 1
    assert any(a.name == "List Parent Bot" for a in agents)


@pytest.mark.asyncio
async def test_agent_service_get_agent_api_keys(client, test_team, db_session, test_user, auth_headers):
    """Test AgentService.get_agent_api_keys (covers agent_service.py L124-129)."""
    from app.services.agent_service import AgentService

    # Create an agent via API (auto-creates an API key)
    response = await client.post(
        f"/api/teams/{test_team.id}/agents",
        json={"name": "Keys Bot"},
        headers=auth_headers,
    )
    assert response.status_code == 201
    agent_id = response.json()["id"]

    service = AgentService(db_session)
    keys = await service.get_agent_api_keys(agent_id)
    assert len(keys) >= 1
