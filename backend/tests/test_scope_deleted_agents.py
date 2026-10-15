"""Deleting a project or a team retires the agents scoped to it (CHT-1844).

On a database built from the migration chain, ``users.agent_project_id``
and ``users.agent_team_id`` are ``ON DELETE SET NULL``. Before this, a
deleted project left each of its agents with only its team, so it became
a team-wide agent; a deleted team left its agents active with no team.
"""
import pytest

from app.api.deps import check_user_team_access
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.oauth import OxydeHolderSession, OxydeRevocationEvent
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.user import OxydeUser
from app.schemas.agent import AgentCreate
from app.schemas.team import TeamCreate
from app.services import credential_events
from app.services.agent_service import AgentService
from app.services.project_service import ProjectService
from app.services.revocation_service import REASON_PROJECT_DELETED, REASON_TEAM_DELETED
from app.services.team_service import TeamService
from app.ws_auth import WsRefused, authenticate

from .oauth_tokens import connector_token, enable_oauth

_MCP_HEADERS = {"Accept": "application/json, text/event-stream", "Content-Type": "application/json"}
_INIT = {
    "jsonrpc": "2.0", "id": 1, "method": "initialize",
    "params": {"protocolVersion": "2025-06-18", "capabilities": {}, "clientInfo": {"name": "pytest", "version": "0"}},
}


@pytest.fixture
def seen(db):
    events = []

    async def hook(event):
        events.append(event)

    remove = credential_events.register(hook)
    yield events
    remove()


async def _agent(name, creator, team, project=None):
    agent, key, _ = await AgentService().create(
        AgentCreate(name=name), creator, team.id, project.id if project else None,
    )
    return agent, key


async def _refused_on_every_edge(client, key, team_id):
    bearer = {"Authorization": f"Bearer {key}"}
    assert (await client.get(f"/api/teams/{team_id}", headers=bearer)).status_code == 401
    assert (await client.post("/mcp", json=_INIT, headers={**_MCP_HEADERS, **bearer})).status_code == 401
    assert (await client.post(f"/mcp/{key}", json=_INIT, headers=_MCP_HEADERS)).status_code == 401
    with pytest.raises(WsRefused) as exc:
        await authenticate(key, team_id)
    assert exc.value.code == 4001


class TestProjectDelete:
    async def test_its_agents_are_retired_not_promoted(
        self, client, auth_headers, seen, monkeypatch, test_user, test_team, test_project,
    ):
        enable_oauth(monkeypatch)
        agent, key = await _agent("Project Bot", test_user, test_team, test_project)
        team_agent, team_key = await _agent("Team Bot", test_user, test_team)
        issued = await connector_token(agent, test_team, test_user)
        bearer = {"Authorization": f"Bearer {key}"}
        assert (await client.get(f"/api/projects/{test_project.id}", headers=bearer)).status_code == 200

        resp = await client.delete(f"/api/projects/{test_project.id}", headers=auth_headers)
        assert resp.status_code == 204, resp.text

        agent = await OxydeUser.objects.get(id=agent.id)
        assert agent.is_active is False
        assert agent.agent_team_id is None  # cleared: never reactivatable as team-wide
        assert agent.agent_project_id is None  # the foreign key's SET NULL
        assert not await check_user_team_access(agent, test_team.id)
        assert not await OxydeAPIKey.objects.filter(principal_user_id=agent.id, is_active=True).exists()
        session = await OxydeHolderSession.objects.get(id=issued.holder_session_id)
        assert session.revoked_at is not None
        await _refused_on_every_edge(client, key, test_team.id)

        [event] = [e for e in seen if agent.id in e.user_ids]
        assert event.reason == REASON_PROJECT_DELETED
        assert event.user_ids == {agent.id}
        assert agent.id in {e.target_id for e in await OxydeRevocationEvent.objects.filter(actor_id=test_user.id).all()}

        # A team agent is not touched by a project's deletion.
        team_agent = await OxydeUser.objects.get(id=team_agent.id)
        assert team_agent.is_active and team_agent.agent_team_id == test_team.id
        assert (await client.get(
            f"/api/teams/{test_team.id}", headers={"Authorization": f"Bearer {team_key}"},
        )).status_code == 200

    async def test_a_key_re_enabled_by_hand_still_reaches_nothing(self, client, test_user, test_team, test_project):
        agent, key = await _agent("Project Bot", test_user, test_team, test_project)
        await ProjectService().delete(test_project, actor_id=test_user.id)
        # Even undoing the deactivation directly in the database leaves an
        # agent with no team, whose key needs a holder in the agent's team.
        await OxydeUser.objects.filter(id=agent.id).update(is_active=True)
        await OxydeAPIKey.objects.filter(principal_user_id=agent.id).update(is_active=True)
        bearer = {"Authorization": f"Bearer {key}"}
        assert (await client.get(f"/api/teams/{test_team.id}", headers=bearer)).status_code == 401

    async def test_its_creator_cannot_reactivate_it(self, client, auth_headers, test_user, test_team, test_project):
        agent, _key = await _agent("Project Bot", test_user, test_team, test_project)
        await ProjectService().delete(test_project, actor_id=test_user.id)
        resp = await client.post(f"/api/agents/{agent.id}/reactivate", headers=auth_headers)
        assert resp.status_code == 404
        assert (await OxydeUser.objects.get(id=agent.id)).is_active is False

    async def test_an_agent_of_another_project_is_untouched(self, test_user, test_team, test_project):
        other = await OxydeProject.objects.create(team_id=test_team.id, name="Other", key="OTH")
        agent, _key = await _agent("Other Bot", test_user, test_team, other)
        await ProjectService().delete(test_project, actor_id=test_user.id)
        agent = await OxydeUser.objects.get(id=agent.id)
        assert agent.is_active and agent.agent_project_id == other.id and agent.agent_team_id == test_team.id

    async def test_the_identities_it_registered_go_with_it(self, test_user, test_team, test_project):
        registrar, _key = await _agent("Registrar", test_user, test_team, test_project)
        identity = await OxydeUser.objects.create(
            email="identity@example.com", hashed_password="x", name="Identity", is_agent=True,
            parent_user_id=test_user.id, agent_team_id=test_team.id, registered_by_id=registrar.id,
        )
        await ProjectService().delete(test_project, actor_id=test_user.id)
        assert (await OxydeUser.objects.get(id=identity.id)).is_active is False

    async def test_a_failed_delete_retires_nothing(self, monkeypatch, test_user, test_team, test_project):
        agent, _key = await _agent("Project Bot", test_user, test_team, test_project)

        async def boom(self, *args, **kwargs):
            raise RuntimeError("boom")

        monkeypatch.setattr(OxydeProject, "delete", boom)
        with pytest.raises(RuntimeError, match="boom"):
            await ProjectService().delete(test_project, actor_id=test_user.id)
        agent = await OxydeUser.objects.get(id=agent.id)
        assert agent.is_active and agent.agent_team_id == test_team.id
        assert await OxydeAPIKey.objects.filter(principal_user_id=agent.id, is_active=True).exists()

    async def test_a_project_with_no_agents(self, seen, test_user, test_project):
        await ProjectService().delete(test_project, actor_id=test_user.id)
        assert await OxydeProject.objects.get_or_none(id=test_project.id) is None
        assert seen == []


class TestTeamDelete:
    async def test_its_agents_and_its_projects_agents_are_retired(
        self, client, seen, test_user, test_team, test_project,
    ):
        team_agent, team_key = await _agent("Team Bot", test_user, test_team)
        project_agent, project_key = await _agent("Project Bot", test_user, test_team, test_project)
        # A project agent made before CHT-1837, with no team of its own.
        await OxydeUser.objects.filter(id=project_agent.id).update(agent_team_id=None)

        await TeamService().delete(test_team, actor_id=test_user.id)

        for agent_id, key in ((team_agent.id, team_key), (project_agent.id, project_key)):
            agent = await OxydeUser.objects.get(id=agent_id)
            assert agent.is_active is False
            assert agent.agent_team_id is None and agent.agent_project_id is None
            assert not await OxydeAPIKey.objects.filter(principal_user_id=agent_id, is_active=True).exists()
            await _refused_on_every_edge(client, key, test_team.id)
        [event] = [e for e in seen if team_agent.id in e.user_ids]
        assert event.reason == REASON_TEAM_DELETED
        assert event.user_ids == {team_agent.id, project_agent.id}

    async def test_another_teams_agent_is_untouched(self, test_user, test_team):
        other = await TeamService().create(TeamCreate(name="Other", key="OTHR"), test_user)
        agent, _key = await _agent("Other Bot", test_user, other)
        await TeamService().delete(test_team, actor_id=test_user.id)
        agent = await OxydeUser.objects.get(id=agent.id)
        assert agent.is_active and agent.agent_team_id == other.id
