"""An agent's creator loses their rights over it when they leave its team (CHT-1508).

The agent routes allowed ``is_admin or is_owner`` where ``is_owner`` was
just ``agent.parent_user_id == current_user.id``: a creator removed from
the team could still update, delete, deactivate or reactivate the agent,
and -- the worst of it -- mint a fresh working key and act in the team as
the agent. ``can_manage_agent`` now requires the creator to still be a
member of the agent's team; team admins keep their rights, and a
re-added creator gets theirs back. The same rule covers revoking one of
the agent's keys through ``DELETE /api-keys/{id}``, since those keys are
owned by the creator.
"""
import pytest

from app.api.deps import can_manage_agent
from app.enums import TeamRole
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.team import OxydeTeamMember
from app.schemas.agent import AgentCreate
from app.services.agent_service import AgentService
from app.services.user_service import UserService


async def _agent_by_departed_creator(test_user2, test_team, project_id=None):
    """test_user2 creates an agent in test_team (owned by test_user),
    then is removed from the team. Returns (agent, its key, its key id)."""
    member = await OxydeTeamMember.objects.create(
        team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER,
    )
    agent, key, key_id = await AgentService().create(
        AgentCreate(name="Orphan"), test_user2, test_team.id, project_id,
    )
    await member.delete()
    return agent, key, key_id


async def _rejoin(test_user2, test_team, role=TeamRole.MEMBER):
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=role)


async def _live_keys(agent):
    return await OxydeAPIKey.objects.filter(agent_user_id=agent.id, is_active=True).count()


@pytest.mark.asyncio
class TestRemovedCreatorIsRefused:
    async def test_cannot_mint_a_key(self, client, auth_headers2, test_user2, test_team):
        agent, _, _ = await _agent_by_departed_creator(test_user2, test_team)

        response = await client.post(f"/api/agents/{agent.id}/keys", headers=auth_headers2)

        assert response.status_code == 403, response.text
        assert await _live_keys(agent) == 1

    async def test_cannot_update(self, client, auth_headers2, test_user2, test_team):
        agent, _, _ = await _agent_by_departed_creator(test_user2, test_team)

        response = await client.patch(
            f"/api/agents/{agent.id}", json={"name": "Renamed"}, headers=auth_headers2,
        )

        assert response.status_code == 403, response.text
        assert (await UserService().get_by_id(agent.id)).name == "Orphan"

    async def test_cannot_delete(self, client, auth_headers2, test_user2, test_team):
        agent, _, _ = await _agent_by_departed_creator(test_user2, test_team)

        response = await client.delete(f"/api/agents/{agent.id}", headers=auth_headers2)

        assert response.status_code == 403, response.text
        assert await UserService().get_by_id(agent.id) is not None

    async def test_cannot_deactivate(self, client, auth_headers2, test_user2, test_team):
        agent, key, _ = await _agent_by_departed_creator(test_user2, test_team)

        response = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers2)

        assert response.status_code == 403, response.text
        signed_in = await client.get("/api/auth/me", headers={"Authorization": f"Bearer {key}"})
        assert signed_in.status_code == 200

    async def test_cannot_reactivate(self, client, auth_headers, auth_headers2, test_user2, test_team):
        agent, _, _ = await _agent_by_departed_creator(test_user2, test_team)
        retired = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)
        assert retired.status_code == 200

        response = await client.post(f"/api/agents/{agent.id}/reactivate", headers=auth_headers2)

        assert response.status_code == 403, response.text
        assert (await UserService().get_by_id(agent.id)).is_active is False

    async def test_cannot_revoke_the_agents_key(self, client, auth_headers2, test_user2, test_team):
        """The key's user_id is the creator, which used to be enough."""
        agent, key, key_id = await _agent_by_departed_creator(test_user2, test_team)

        response = await client.delete(f"/api/api-keys/{key_id}", headers=auth_headers2)

        assert response.status_code == 403, response.text
        signed_in = await client.get("/api/auth/me", headers={"Authorization": f"Bearer {key}"})
        assert signed_in.status_code == 200

    async def test_project_scoped_agent(self, client, auth_headers2, test_user2, test_team, test_project):
        agent, _, _ = await _agent_by_departed_creator(test_user2, test_team, test_project.id)
        assert agent.agent_project_id == test_project.id

        minted = await client.post(f"/api/agents/{agent.id}/keys", headers=auth_headers2)
        retired = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers2)

        assert minted.status_code == 403 and retired.status_code == 403
        assert await _live_keys(agent) == 1

    async def test_admin_of_another_team_is_still_refused(self, client, auth_headers2, test_user2, test_team):
        """Membership is checked in the agent's team, not any team."""
        from app.oxyde_models.team import OxydeTeam

        agent, _, _ = await _agent_by_departed_creator(test_user2, test_team)
        other = await OxydeTeam.objects.create(name="Elsewhere", key="ELSE")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user2.id, role=TeamRole.ADMIN)

        response = await client.post(f"/api/agents/{agent.id}/keys", headers=auth_headers2)

        assert response.status_code == 403


@pytest.mark.asyncio
class TestTeamAdminStillManages:
    async def test_admin_mints_updates_revokes_and_retires(self, client, auth_headers, test_user2, test_team):
        """test_user owns test_team and did not create the agent."""
        agent, _, key_id = await _agent_by_departed_creator(test_user2, test_team)

        minted = await client.post(f"/api/agents/{agent.id}/keys", headers=auth_headers)
        renamed = await client.patch(f"/api/agents/{agent.id}", json={"name": "Kept"}, headers=auth_headers)
        revoked = await client.delete(f"/api/api-keys/{key_id}", headers=auth_headers)
        retired = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)
        restored = await client.post(f"/api/agents/{agent.id}/reactivate", headers=auth_headers)
        deleted = await client.delete(f"/api/agents/{agent.id}", headers=auth_headers)

        assert minted.status_code == 201, minted.text
        assert renamed.status_code == 200 and renamed.json()["name"] == "Kept"
        assert revoked.status_code == 204, revoked.text
        assert retired.status_code == 200 and restored.status_code == 200
        assert deleted.status_code == 204, deleted.text

    async def test_admin_revoking_one_agent_key_leaves_the_others(self, client, auth_headers, test_user2, test_team):
        agent, _, key_id = await _agent_by_departed_creator(test_user2, test_team)
        second = await client.post(f"/api/agents/{agent.id}/keys", headers=auth_headers)
        assert second.status_code == 201

        response = await client.delete(f"/api/api-keys/{key_id}", headers=auth_headers)

        assert response.status_code == 204
        signed_in = await client.get(
            "/api/auth/me", headers={"Authorization": f"Bearer {second.json()['key']}"},
        )
        assert signed_in.status_code == 200
        assert await _live_keys(agent) == 1

    async def test_plain_member_who_is_not_the_creator_cannot_revoke_an_agent_key(
        self, client, auth_headers2, test_user, test_user2, test_team,
    ):
        _, _, key_id = await AgentService().create(AgentCreate(name="Theirs"), test_user, test_team.id)
        await _rejoin(test_user2, test_team)

        response = await client.delete(f"/api/api-keys/{key_id}", headers=auth_headers2)

        assert response.status_code == 403


@pytest.mark.asyncio
class TestReaddedCreatorManagesAgain:
    async def test_rights_return_with_membership(self, client, auth_headers2, test_user2, test_team):
        agent, _, key_id = await _agent_by_departed_creator(test_user2, test_team)
        refused = await client.post(f"/api/agents/{agent.id}/keys", headers=auth_headers2)
        assert refused.status_code == 403

        await _rejoin(test_user2, test_team)

        minted = await client.post(f"/api/agents/{agent.id}/keys", headers=auth_headers2)
        renamed = await client.patch(f"/api/agents/{agent.id}", json={"name": "Back"}, headers=auth_headers2)
        revoked = await client.delete(f"/api/api-keys/{key_id}", headers=auth_headers2)
        retired = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers2)
        restored = await client.post(f"/api/agents/{agent.id}/reactivate", headers=auth_headers2)
        deleted = await client.delete(f"/api/agents/{agent.id}", headers=auth_headers2)

        assert minted.status_code == 201, minted.text
        assert renamed.status_code == 200
        assert revoked.status_code == 204
        assert retired.status_code == 200 and restored.status_code == 200
        assert deleted.status_code == 204


@pytest.mark.asyncio
class TestCanManageAgent:
    async def test_an_agent_never_manages_an_agent(self, test_user, test_team):
        agent, _, _ = await AgentService().create(AgentCreate(name="A"), test_user, test_team.id)
        sibling, _, _ = await AgentService().create(AgentCreate(name="B"), test_user, test_team.id)

        assert await can_manage_agent(sibling, agent) is False
        assert await can_manage_agent(agent, agent) is False

    async def test_human_api_keys_are_unaffected(self, client, auth_headers2, test_user2):
        """A user with no team still revokes their own (non-agent) key."""
        created = await client.post("/api/api-keys", json={"name": "mine"}, headers=auth_headers2)
        assert created.status_code == 201

        response = await client.delete(f"/api/api-keys/{created.json()['id']}", headers=auth_headers2)

        assert response.status_code == 204


@pytest.mark.asyncio
class TestRemovedCreatorIsNotNotified:
    async def _entries(self, user_id):
        from app.enums import InboxEntryKind
        from app.oxyde_models.inbox import OxydeInboxEntry

        return await OxydeInboxEntry.objects.filter(
            recipient_user_id=user_id, kind=InboxEntryKind.AGENT_STATUS,
        ).all()

    async def test_admin_retiring_it_writes_no_entry_for_the_ex_member(
        self, client, auth_headers, test_user2, test_team,
    ):
        """The entry names the admin and is broadcast on the team's
        channel: nothing an ex-member should still receive."""
        agent, _, _ = await _agent_by_departed_creator(test_user2, test_team)

        retired = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)

        assert retired.status_code == 200
        assert await self._entries(test_user2.id) == []

    async def test_a_re_added_creator_is_told_again(self, client, auth_headers, test_user2, test_team):
        agent, _, _ = await _agent_by_departed_creator(test_user2, test_team)
        await _rejoin(test_user2, test_team)

        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)

        assert len(await self._entries(test_user2.id)) == 1
