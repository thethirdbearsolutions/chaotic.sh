"""Retiring an agent without deleting it (CHT-1494).

An agent that authored anything cannot be deleted (CHT-1427), and its
API keys belong to its parent user, so a team admin who did not create
it could neither delete it nor revoke its keys. POST
/agents/{id}/deactivate revokes every key and blocks the agent from
signing in while leaving its work attributed to it; the agent's parent
user and admins of the agent's team may call it, nobody else.
"""
import pytest

from app.enums import TeamRole
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.issue import OxydeIssue
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.schemas.agent import AgentCreate
from app.services.agent_service import AgentService


async def _agent_with_work(test_user, test_team, test_project):
    agent, key, _ = await AgentService().create(AgentCreate(name="Worker"), test_user, test_team.id)
    issue = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier="PROJ-77", number=77, title="kept", creator_id=agent.id,
    )
    return agent, key, issue


async def _assert_untouched(agent, key, client):
    from app.services.user_service import UserService

    assert (await UserService().get_by_id(agent.id)).is_active is True
    assert await OxydeAPIKey.objects.filter(agent_user_id=agent.id, is_active=True).count() == 1
    response = await client.get("/api/auth/me", headers={"Authorization": f"Bearer {key}"})
    assert response.status_code == 200, response.text


@pytest.mark.asyncio
class TestDeactivateAgent:
    async def test_team_admin_who_is_not_the_owner_can_retire_an_author(
        self, client, auth_headers2, test_user, test_user2, test_team, test_project,
    ):
        """The case the ticket is about: delete is refused (409), so the
        admin deactivates instead, and the agent's work keeps its author."""
        agent, key, issue = await _agent_with_work(test_user, test_team, test_project)
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.ADMIN)

        refused = await client.delete(f"/api/agents/{agent.id}", headers=auth_headers2)
        assert refused.status_code == 409
        assert "chaotic agent deactivate" in refused.json()["detail"]
        assert "auth keys revoke" not in refused.json()["detail"]

        response = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers2)

        assert response.status_code == 200, response.text
        body = response.json()
        assert body["id"] == agent.id and body["is_active"] is False
        assert body["parent_user_name"] == test_user.name
        assert await OxydeAPIKey.objects.filter(agent_user_id=agent.id, is_active=True).count() == 0
        assert (await OxydeIssue.objects.get(id=issue.id)).creator_id == agent.id

        signed_in = await client.get("/api/auth/me", headers={"Authorization": f"Bearer {key}"})
        assert signed_in.status_code == 401

    async def test_owner_can_deactivate_and_it_is_idempotent(
        self, client, auth_headers, test_user, test_team, test_project,
    ):
        agent, _, _ = await _agent_with_work(test_user, test_team, test_project)

        first = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)
        second = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)

        assert first.status_code == 200 and second.status_code == 200
        assert second.json()["is_active"] is False

    async def test_inactive_agent_is_refused_even_with_a_live_key(
        self, client, auth_headers, test_user, test_team, test_project,
    ):
        """Blocking auth does not rest on key revocation alone: a key that
        is somehow still active (e.g. re-enabled by hand) cannot sign in."""
        agent, key, _ = await _agent_with_work(test_user, test_team, test_project)
        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)
        await OxydeAPIKey.objects.filter(agent_user_id=agent.id).update(is_active=True)

        response = await client.get("/api/auth/me", headers={"Authorization": f"Bearer {key}"})

        assert response.status_code == 403

    async def test_admin_of_another_team_gets_403(
        self, client, auth_headers2, test_user, test_user2, test_team, test_project,
    ):
        agent, key, _ = await _agent_with_work(test_user, test_team, test_project)
        other = await OxydeTeam.objects.create(name="Other Team", key="OTHER")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user2.id, role=TeamRole.ADMIN)

        response = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers2)

        assert response.status_code == 403
        await _assert_untouched(agent, key, client)

    async def test_non_admin_member_gets_403(
        self, client, auth_headers2, test_user, test_user2, test_team, test_project,
    ):
        agent, key, _ = await _agent_with_work(test_user, test_team, test_project)
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

        response = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers2)

        assert response.status_code == 403
        await _assert_untouched(agent, key, client)

    async def test_an_agent_cannot_deactivate_a_sibling(
        self, client, test_user, test_team, test_project,
    ):
        agent, key, _ = await _agent_with_work(test_user, test_team, test_project)
        _, sibling_key, _ = await AgentService().create(AgentCreate(name="Sibling"), test_user, test_team.id)

        response = await client.post(
            f"/api/agents/{agent.id}/deactivate", headers={"Authorization": f"Bearer {sibling_key}"},
        )

        assert response.status_code == 403
        await _assert_untouched(agent, key, client)

    async def test_unknown_agent_is_404(self, client, auth_headers):
        response = await client.post(
            "/api/agents/00000000-0000-0000-0000-000000000001/deactivate", headers=auth_headers,
        )

        assert response.status_code == 404

    async def test_minting_a_key_for_a_deactivated_agent_is_refused(
        self, client, auth_headers, test_user, test_team, test_project,
    ):
        """A key for an inactive agent could never sign in; refuse rather
        than hand out a dead credential."""
        agent, _, _ = await _agent_with_work(test_user, test_team, test_project)
        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)

        response = await client.post(f"/api/agents/{agent.id}/keys", headers=auth_headers)

        assert response.status_code == 409
        assert "deactivated" in response.json()["detail"]
        assert await OxydeAPIKey.objects.filter(agent_user_id=agent.id, is_active=True).count() == 0
