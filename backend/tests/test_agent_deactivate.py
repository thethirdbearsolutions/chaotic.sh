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
    assert await OxydeAPIKey.objects.filter(principal_user_id=agent.id, is_active=True).count() == 1
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
        assert await OxydeAPIKey.objects.filter(principal_user_id=agent.id, is_active=True).count() == 0
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
        await OxydeAPIKey.objects.filter(principal_user_id=agent.id).update(is_active=True)

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
        assert await OxydeAPIKey.objects.filter(principal_user_id=agent.id, is_active=True).count() == 0

    async def test_an_agent_cannot_deactivate_itself(self, client, test_user, test_team, test_project):
        agent, key, _ = await _agent_with_work(test_user, test_team, test_project)

        response = await client.post(
            f"/api/agents/{agent.id}/deactivate", headers={"Authorization": f"Bearer {key}"},
        )

        assert response.status_code == 403
        await _assert_untouched(agent, key, client)

    async def test_team_owner_who_is_not_the_creator_can_deactivate(
        self, client, auth_headers, test_user2, test_team,
    ):
        """The OWNER role counts as admin, not just ADMIN."""
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        agent, _, _ = await AgentService().create(AgentCreate(name="Member's bot"), test_user2, test_team.id)

        response = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)

        assert response.status_code == 200, response.text
        assert response.json()["is_active"] is False

    async def test_a_key_the_agent_minted_for_itself_is_revoked_too(
        self, client, auth_headers, test_user, test_team, test_project,
    ):
        """A key the agent created through POST /api-keys must be revoked:
        both today's shape (held by the human behind the calling key,
        CHT-1508) and a legacy one as migration 0021 leaves it (held by the
        agent's creator, CHT-1537)."""
        from app.schemas.api_key import APIKeyCreate
        from app.services.api_key_service import APIKeyService

        agent, key, _ = await _agent_with_work(test_user, test_team, test_project)
        minted = await client.post(
            "/api/api-keys", json={"name": "self"}, headers={"Authorization": f"Bearer {key}"},
        )
        assert minted.status_code == 201, minted.text
        own_key = minted.json()["key"]
        legacy, legacy_key = await APIKeyService().create(
            agent.id, APIKeyCreate(name="legacy"), holder_user_id=agent.parent_user_id,
        )

        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)

        own = await OxydeAPIKey.objects.get(id=minted.json()["id"])
        assert own.holder_user_id == test_user.id and own.principal_user_id == agent.id
        assert own.is_active is False
        assert (await OxydeAPIKey.objects.get(id=legacy.id)).is_active is False
        for k in (own_key, legacy_key):
            response = await client.get("/api/auth/me", headers={"Authorization": f"Bearer {k}"})
            assert response.status_code == 401

    async def test_only_the_agent_is_affected(
        self, client, auth_headers, test_user, test_team, test_project,
    ):
        """The creator's own session and own API keys keep working."""
        from app.schemas.api_key import APIKeyCreate
        from app.services.api_key_service import APIKeyService

        _, human_key = await APIKeyService().create(test_user.id, APIKeyCreate(name="mine"))
        agent, _, _ = await _agent_with_work(test_user, test_team, test_project)

        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)

        assert (await client.get("/api/auth/me", headers=auth_headers)).status_code == 200
        me = await client.get("/api/auth/me", headers={"Authorization": f"Bearer {human_key}"})
        assert me.status_code == 200 and me.json()["id"] == test_user.id

    async def test_project_scoped_agent(
        self, client, auth_headers2, test_user, test_user2, test_team, test_project,
    ):
        """Authorization keys on the agent's team for a project-scoped agent too."""
        member = await OxydeTeamMember.objects.create(
            team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER,
        )
        agent, key, _ = await AgentService().create(
            AgentCreate(name="Project Bot"), test_user, test_team.id, test_project.id,
        )

        refused = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers2)
        assert refused.status_code == 403

        member.role = TeamRole.ADMIN
        await member.save(update_fields={"role"})
        response = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers2)
        assert response.status_code == 200, response.text
        assert response.json()["agent_project_id"] == test_project.id
        assert (await client.get("/api/auth/me", headers={"Authorization": f"Bearer {key}"})).status_code == 401

    async def test_deactivating_an_agent_deleted_meanwhile_returns_none(self, test_user, test_team):
        """A delete that commits between the route's lookup and the write
        must surface as 404, not a 500 on a None row."""
        service = AgentService()
        agent, _, _ = await service.create(AgentCreate(name="Gone"), test_user, test_team.id)
        stale = await service.get_by_id(agent.id)
        await service.delete(agent)

        assert await service.deactivate(stale, test_user) is None
        assert await service.reactivate(stale, test_user) is None

    async def test_route_answers_404_when_the_agent_vanishes_mid_request(
        self, client, auth_headers, test_user, test_team, monkeypatch,
    ):
        agent, _, _ = await AgentService().create(AgentCreate(name="Gone"), test_user, test_team.id)

        async def vanished(self, agent, actor):
            return None, 0

        monkeypatch.setattr(AgentService, "deactivate_with_identities", vanished)
        response = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)

        assert response.status_code == 404


@pytest.mark.asyncio
class TestReactivateAgent:
    async def test_admin_reactivates_and_old_keys_stay_revoked(
        self, client, auth_headers, auth_headers2, test_user, test_user2, test_team, test_project,
    ):
        agent, old_key, _ = await _agent_with_work(test_user, test_team, test_project)
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.ADMIN)
        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)

        response = await client.post(f"/api/agents/{agent.id}/reactivate", headers=auth_headers2)

        assert response.status_code == 200, response.text
        assert response.json()["is_active"] is True
        assert (await client.get("/api/auth/me", headers={"Authorization": f"Bearer {old_key}"})).status_code == 401

        minted = await client.post(f"/api/agents/{agent.id}/keys", headers=auth_headers)
        assert minted.status_code == 201, minted.text
        me = await client.get("/api/auth/me", headers={"Authorization": f"Bearer {minted.json()['key']}"})
        assert me.status_code == 200 and me.json()["id"] == agent.id

    async def test_reactivating_an_active_agent_is_a_no_op(
        self, client, auth_headers, test_user, test_team, test_project,
    ):
        agent, key, _ = await _agent_with_work(test_user, test_team, test_project)

        response = await client.post(f"/api/agents/{agent.id}/reactivate", headers=auth_headers)

        assert response.status_code == 200 and response.json()["is_active"] is True
        await _assert_untouched(agent, key, client)

    async def test_admin_of_another_team_gets_403(
        self, client, auth_headers, auth_headers2, test_user, test_user2, test_team, test_project,
    ):
        agent, _, _ = await _agent_with_work(test_user, test_team, test_project)
        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)
        other = await OxydeTeam.objects.create(name="Other Team", key="OTHER")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user2.id, role=TeamRole.ADMIN)

        response = await client.post(f"/api/agents/{agent.id}/reactivate", headers=auth_headers2)

        assert response.status_code == 403
        assert (await AgentService().get_by_id(agent.id)).is_active is False

    async def test_non_admin_member_gets_403(
        self, client, auth_headers, auth_headers2, test_user, test_user2, test_team, test_project,
    ):
        agent, _, _ = await _agent_with_work(test_user, test_team, test_project)
        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

        response = await client.post(f"/api/agents/{agent.id}/reactivate", headers=auth_headers2)

        assert response.status_code == 403
        assert (await AgentService().get_by_id(agent.id)).is_active is False

    async def test_unknown_agent_is_404(self, client, auth_headers):
        response = await client.post(
            "/api/agents/00000000-0000-0000-0000-000000000001/reactivate", headers=auth_headers,
        )

        assert response.status_code == 404


@pytest.mark.asyncio
class TestCreatorIsTold:
    async def _entries(self, user_id):
        from app.enums import InboxEntryKind
        from app.oxyde_models.inbox import OxydeInboxEntry

        return await OxydeInboxEntry.objects.filter(
            recipient_user_id=user_id, kind=InboxEntryKind.AGENT_STATUS,
        ).order_by("created_at").all()

    async def test_creator_gets_an_inbox_entry_naming_the_admin(
        self, client, auth_headers, auth_headers2, test_user, test_user2, test_team, test_project,
    ):
        agent, _, _ = await _agent_with_work(test_user, test_team, test_project)
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.ADMIN)

        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers2)
        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers2)  # no change, no entry
        await client.post(f"/api/agents/{agent.id}/reactivate", headers=auth_headers2)

        entries = await self._entries(test_user.id)
        assert [e.title for e in entries] == [
            f"{test_user2.name} deactivated your agent Worker",
            f"{test_user2.name} reactivated your agent Worker",
        ]
        assert all(e.source_user_id == test_user2.id and e.team_id == test_team.id for e in entries)

        inbox = await client.get("/api/inbox", headers=auth_headers)
        assert inbox.status_code == 200, inbox.text
        assert {row["kind"] for row in inbox.json()} == {"agent_status"}

    async def test_creator_acting_themselves_gets_no_entry(
        self, client, auth_headers, test_user, test_team, test_project,
    ):
        agent, _, _ = await _agent_with_work(test_user, test_team, test_project)

        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)

        assert await self._entries(test_user.id) == []

    async def test_a_failing_notification_does_not_fail_the_deactivation(
        self, client, auth_headers2, test_user, test_user2, test_team, test_project, monkeypatch,
    ):
        from app.services.inbox_service import InboxService

        async def broken(self, **kwargs):
            raise RuntimeError("inbox down")

        monkeypatch.setattr(InboxService, "notify_agent_status", broken)
        agent, _, _ = await _agent_with_work(test_user, test_team, test_project)
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.ADMIN)

        response = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers2)

        assert response.status_code == 200
        assert response.json()["is_active"] is False


@pytest.mark.asyncio
class TestDeactivatedAgentCannotBeAssigned:
    async def test_create_and_reassign_are_refused(
        self, client, auth_headers, test_user, test_team, test_project, test_issue,
    ):
        agent, _, _ = await _agent_with_work(test_user, test_team, test_project)
        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)

        created = await client.post(
            f"/api/projects/{test_project.id}/issues",
            json={"title": "for the retired bot", "assignee_id": agent.id},
            headers=auth_headers,
        )
        assert created.status_code == 400, created.text
        assert "deactivated" in created.json()["detail"]

        patched = await client.patch(
            f"/api/issues/{test_issue.id}", json={"assignee_id": agent.id}, headers=auth_headers,
        )
        assert patched.status_code == 400, patched.text
        assert "deactivated" in patched.json()["detail"]

    async def test_an_issue_it_already_holds_can_still_be_edited(
        self, client, auth_headers, test_user, test_team, test_project, test_issue,
    ):
        """Re-sending the existing assignee is not a new assignment."""
        agent, _, _ = await _agent_with_work(test_user, test_team, test_project)
        held = await OxydeIssue.objects.get(id=test_issue.id)
        held.assignee_id = agent.id
        await held.save(update_fields={"assignee_id"})
        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)

        response = await client.patch(
            f"/api/issues/{test_issue.id}",
            json={"title": "renamed", "assignee_id": agent.id},
            headers=auth_headers,
        )

        assert response.status_code == 200, response.text
        assert response.json()["assignee_id"] == agent.id

    async def test_agent_list_reports_is_active(self, client, auth_headers, test_user, test_team, test_project):
        agent, _, _ = await _agent_with_work(test_user, test_team, test_project)
        await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)

        rows = (await client.get(f"/api/teams/{test_team.id}/agents", headers=auth_headers)).json()

        assert [(r["id"], r["is_active"]) for r in rows] == [(agent.id, False)]
