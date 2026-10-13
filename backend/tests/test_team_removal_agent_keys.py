"""Leaving a team ends the agent keys you hold for it (CHT-1510, in PR #326).

A member removed from a team (or leaving it) used to keep every agent key
they had been shown: the one `agent create` printed and any they minted.
Those keys sign in as the agent, which is still in the team, so the
ex-member kept acting in the team as it. Now:

* ``DELETE /teams/{id}/members/{user}`` revokes, in the same transaction,
  every key the member owns that is linked to an agent of that team, plus
  the self-minted keys of the agents they created; those agents pass to
  the removing admin (or the team's owner when the member leaves on their
  own) and the team's other admins get an inbox entry.
* Key auth refuses an agent key whose owner is no longer in the agent's
  team, with the revoked-key 401, even if nothing revoked it.
* A key is owned by whoever minted it, so an admin's replacement key is
  not the ex-member's (they neither hold nor list it).
"""
import pytest

from app.enums import InboxEntryKind, TeamRole
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.utils.security import create_access_token, get_password_hash


def _bearer(key):
    return {"Authorization": f"Bearer {key}"}


async def _make_user(email, name):
    user = await OxydeUser.objects.create(
        email=email, hashed_password=get_password_hash("pw-12345678"), name=name,
    )
    return user, {"Authorization": f"Bearer {create_access_token(data={'sub': user.id})}"}


async def _is_active(key_id):
    return (await OxydeAPIKey.objects.get(id=key_id)).is_active


async def _agent_status_entries(user_id):
    return await OxydeInboxEntry.objects.filter(
        recipient_user_id=user_id, kind=InboxEntryKind.AGENT_STATUS,
    ).all()


@pytest.fixture
async def world(client, test_user, test_user2, auth_headers, auth_headers2, test_team):
    """test_user owns the team. Bob (test_user2) is a member who created
    'bobbot' (key k1, shown to him) and whose bot minted itself k3. Carol
    is an admin who minted k2 for bobbot. Bob also has an agent in a
    second team (k5)."""
    carol, carol_headers = await _make_user("carol@example.com", "Carol")
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=carol.id, role=TeamRole.ADMIN)
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    created = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "bobbot"}, headers=auth_headers2)
    assert created.status_code == 201, created.text
    agent_id, k1, k1_id = created.json()["id"], created.json()["api_key"], created.json()["api_key_id"]

    k2 = await client.post(f"/api/agents/{agent_id}/keys", headers=carol_headers)
    assert k2.status_code == 201, k2.text
    k3 = await client.post("/api/api-keys", json={"name": "self"}, headers=_bearer(k1))
    assert k3.status_code == 201, k3.text

    other = await OxydeTeam.objects.create(name="Other", key="OTHR")
    await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user2.id, role=TeamRole.OWNER)
    elsewhere = await client.post(f"/api/teams/{other.id}/agents", json={"name": "elsewhere"}, headers=auth_headers2)
    assert elsewhere.status_code == 201

    return {
        "team": test_team, "owner": test_user, "owner_headers": auth_headers,
        "bob": test_user2, "bob_headers": auth_headers2, "carol": carol, "carol_headers": carol_headers,
        "agent_id": agent_id,
        "k1": k1, "k1_id": k1_id,
        "k2": k2.json()["key"], "k2_id": k2.json()["id"],
        "k3": k3.json()["key"], "k3_id": k3.json()["id"],
        "k5": elsewhere.json()["api_key"],
    }


@pytest.mark.asyncio
class TestAdminRemovesTheCreator:
    async def _remove(self, client, w):
        response = await client.delete(
            f"/api/teams/{w['team'].id}/members/{w['bob'].id}", headers=w["carol_headers"],
        )
        assert response.status_code == 204, response.text

    async def test_keys_the_member_held_stop_working(self, client, world):
        w = world
        await self._remove(client, w)

        assert await _is_active(w["k1_id"]) is False
        assert await _is_active(w["k3_id"]) is False
        for key in (w["k1"], w["k3"]):
            response = await client.get("/api/auth/me", headers=_bearer(key))
            assert response.status_code == 401, response.text

    async def test_the_admins_key_and_other_teams_are_untouched(self, client, world):
        w = world
        await self._remove(client, w)

        assert await _is_active(w["k2_id"]) is True
        assert (await client.get("/api/auth/me", headers=_bearer(w["k2"]))).status_code == 200
        assert (await client.get("/api/auth/me", headers=_bearer(w["k5"]))).status_code == 200

    async def test_the_agent_passes_to_the_removing_admin(self, client, world):
        w = world
        await self._remove(client, w)

        agent = await client.get(f"/api/agents/{w['agent_id']}", headers=w["carol_headers"])
        assert agent.json()["parent_user_id"] == w["carol"].id
        assert agent.json()["is_active"] is True
        minted = await client.post(f"/api/agents/{w['agent_id']}/keys", headers=w["carol_headers"])
        assert minted.status_code == 201

    async def test_other_admins_are_told_but_not_the_actor_or_the_ex_member(self, client, world):
        w = world
        await self._remove(client, w)

        [entry] = await _agent_status_entries(w["owner"].id)
        assert entry.title == "Test User 2 was removed from the team: agent bobbot needs attention"
        assert "2 API keys they held for it were revoked" in entry.body
        assert "Carol now owns the agent." in entry.body
        assert entry.source_user_id == w["carol"].id
        assert await _agent_status_entries(w["carol"].id) == []
        assert await _agent_status_entries(w["bob"].id) == []

    async def test_rejoining_does_not_revive_revoked_keys_or_ownership(self, client, world):
        w = world
        await self._remove(client, w)
        await OxydeTeamMember.objects.create(team_id=w["team"].id, user_id=w["bob"].id, role=TeamRole.MEMBER)

        assert (await client.get("/api/auth/me", headers=_bearer(w["k1"]))).status_code == 401
        refused = await client.post(f"/api/agents/{w['agent_id']}/keys", headers=w["bob_headers"])
        assert refused.status_code == 403

    async def test_an_admin_member_loses_the_keys_they_minted_for_others_agents(
        self, client, world,
    ):
        """Bob as an admin mints a key for the owner's agent; removing him
        revokes that key and nothing else of that agent."""
        w = world
        await OxydeTeamMember.objects.filter(team_id=w["team"].id, user_id=w["bob"].id).update(role=TeamRole.ADMIN)
        owners = await client.post(
            f"/api/teams/{w['team'].id}/agents", json={"name": "ownerbot"}, headers=w["owner_headers"],
        )
        bobs = await client.post(f"/api/agents/{owners.json()['id']}/keys", headers=w["bob_headers"])
        assert bobs.status_code == 201

        await self._remove(client, w)

        assert await _is_active(bobs.json()["id"]) is False
        assert await _is_active(owners.json()["api_key_id"]) is True
        agent = await client.get(f"/api/agents/{owners.json()['id']}", headers=w["owner_headers"])
        assert agent.json()["parent_user_id"] == w["owner"].id

    async def test_a_member_with_no_agent_keys_writes_no_entries(self, client, world):
        w = world
        dave, _ = await _make_user("dave@example.com", "Dave")
        await OxydeTeamMember.objects.create(team_id=w["team"].id, user_id=dave.id, role=TeamRole.MEMBER)

        response = await client.delete(f"/api/teams/{w['team'].id}/members/{dave.id}", headers=w["carol_headers"])

        assert response.status_code == 204
        assert await _agent_status_entries(w["owner"].id) == []


@pytest.mark.asyncio
class TestCreatorLeavesOnTheirOwn:
    async def test_the_agent_passes_to_the_team_owner_and_every_admin_is_told(self, client, world):
        w = world

        response = await client.delete(
            f"/api/teams/{w['team'].id}/members/{w['bob'].id}", headers=w["bob_headers"],
        )

        assert response.status_code == 204
        assert (await client.get("/api/auth/me", headers=_bearer(w["k1"]))).status_code == 401
        agent = await client.get(f"/api/agents/{w['agent_id']}", headers=w["owner_headers"])
        assert agent.json()["parent_user_id"] == w["owner"].id
        [to_owner] = await _agent_status_entries(w["owner"].id)
        [to_carol] = await _agent_status_entries(w["carol"].id)
        assert to_owner.title == "Test User 2 left the team: agent bobbot needs attention"
        assert "Test User now owns the agent." in to_carol.body
        assert await _agent_status_entries(w["bob"].id) == []


@pytest.mark.asyncio
class TestKeyAuthChecksTheOwnersMembership:
    """Defense in depth: a key nobody revoked still dies with its owner's
    membership, and comes back if they rejoin."""

    async def test_rest(self, client, world):
        w = world
        await OxydeTeamMember.objects.filter(team_id=w["team"].id, user_id=w["bob"].id).delete()

        refused = await client.get("/api/auth/me", headers=_bearer(w["k1"]))
        assert refused.status_code == 401
        assert refused.json()["detail"] == "Invalid API key"
        assert await _is_active(w["k1_id"]) is True
        # The admin's key and the bot's own key are not Bob's membership's business.
        assert (await client.get("/api/auth/me", headers=_bearer(w["k2"]))).status_code == 200
        assert (await client.get("/api/auth/me", headers=_bearer(w["k3"]))).status_code == 200

        await OxydeTeamMember.objects.create(team_id=w["team"].id, user_id=w["bob"].id, role=TeamRole.MEMBER)
        assert (await client.get("/api/auth/me", headers=_bearer(w["k1"]))).status_code == 200

    async def test_websocket_takes_no_api_keys_at_all(self, world):
        """The websocket authenticates with a JWT only, so an agent key
        (removed creator's or not) is refused before any team check."""
        from unittest.mock import AsyncMock

        from app.main import websocket_endpoint

        w = world
        ws = AsyncMock()
        await websocket_endpoint(ws, token=w["k1"], team_id=w["team"].id)
        ws.close.assert_awaited_once_with(code=4001)
        ws.accept.assert_not_awaited()


@pytest.mark.asyncio
class TestKeyOwnership:
    async def test_a_minted_key_belongs_to_the_minter(self, client, world):
        w = world

        bobs = await client.get("/api/api-keys", headers=w["bob_headers"])
        carols = await client.get("/api/api-keys", headers=w["carol_headers"])

        assert w["k2_id"] not in {k["id"] for k in bobs.json()}
        assert w["k1_id"] in {k["id"] for k in bobs.json()}
        assert w["k2_id"] in {k["id"] for k in carols.json()}


@pytest.mark.asyncio
class TestListAgentKeys:
    async def test_admin_sees_every_key_with_its_holder(self, client, world):
        w = world

        response = await client.get(f"/api/agents/{w['agent_id']}/keys", headers=w["carol_headers"])

        assert response.status_code == 200, response.text
        rows = {r["id"]: r for r in response.json()}
        assert set(rows) == {w["k1_id"], w["k2_id"], w["k3_id"]}
        assert (rows[w["k1_id"]]["owner_name"], rows[w["k1_id"]]["self_minted"]) == ("Test User 2", False)
        assert (rows[w["k2_id"]]["owner_name"], rows[w["k2_id"]]["self_minted"]) == ("Carol", False)
        assert (rows[w["k3_id"]]["owner_id"], rows[w["k3_id"]]["self_minted"]) == (w["agent_id"], True)
        assert all(r["is_active"] for r in rows.values())
        assert all("key" not in r and "key_hash" not in r for r in rows.values())

    async def test_creator_member_may_list(self, client, world):
        response = await client.get(f"/api/agents/{world['agent_id']}/keys", headers=world["bob_headers"])
        assert response.status_code == 200

    async def test_removed_creator_and_plain_member_may_not(self, client, world):
        w = world
        dave, dave_headers = await _make_user("dave@example.com", "Dave")
        await OxydeTeamMember.objects.create(team_id=w["team"].id, user_id=dave.id, role=TeamRole.MEMBER)
        assert (await client.get(f"/api/agents/{w['agent_id']}/keys", headers=dave_headers)).status_code == 403

        await OxydeTeamMember.objects.filter(team_id=w["team"].id, user_id=w["bob"].id).delete()
        assert (await client.get(f"/api/agents/{w['agent_id']}/keys", headers=w["bob_headers"])).status_code == 403

    async def test_the_agent_itself_may_not(self, client, world):
        response = await client.get(f"/api/agents/{world['agent_id']}/keys", headers=_bearer(world["k1"]))
        assert response.status_code == 403

    async def test_unknown_agent_is_404(self, client, world):
        response = await client.get("/api/agents/nope/keys", headers=world["carol_headers"])
        assert response.status_code == 404

    async def test_admin_revokes_a_self_minted_key(self, client, world):
        w = world

        response = await client.delete(f"/api/api-keys/{w['k3_id']}", headers=w["carol_headers"])

        assert response.status_code == 204, response.text
        assert (await client.get("/api/auth/me", headers=_bearer(w["k3"]))).status_code == 401
        assert (await client.get("/api/auth/me", headers=_bearer(w["k1"]))).status_code == 200

    async def test_plain_member_cannot_revoke_a_self_minted_key(self, client, world):
        w = world
        dave, dave_headers = await _make_user("dave@example.com", "Dave")
        await OxydeTeamMember.objects.create(team_id=w["team"].id, user_id=dave.id, role=TeamRole.MEMBER)

        response = await client.delete(f"/api/api-keys/{w['k3_id']}", headers=dave_headers)

        assert response.status_code == 403


@pytest.mark.asyncio
class TestMintRechecksInsideTheTransaction:
    async def test_a_removal_landing_after_the_route_check_still_refuses(self, client, world, monkeypatch):
        """Simulate the race: the route's check passes (stale), but the
        membership is gone by the time the service mints."""
        w = world
        await OxydeTeamMember.objects.filter(team_id=w["team"].id, user_id=w["bob"].id).delete()

        async def stale(user, agent):
            return True

        monkeypatch.setattr("app.api.agents.can_manage_agent", stale)
        before = await OxydeAPIKey.objects.filter(agent_user_id=w["agent_id"]).count()

        response = await client.post(f"/api/agents/{w['agent_id']}/keys", headers=w["bob_headers"])

        assert response.status_code == 403, response.text
        assert await OxydeAPIKey.objects.filter(agent_user_id=w["agent_id"]).count() == before
