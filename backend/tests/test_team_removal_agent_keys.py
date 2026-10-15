"""Leaving a team ends the agent keys you hold for it (CHT-1510, in PR #326).

A member removed from a team (or leaving it) used to keep every agent key
they had been shown: the one `agent create` printed and any they minted.
Those keys sign in as the agent, which is still in the team, so the
ex-member kept acting in the team as it. Now:

* A key is held by whoever minted it; a key an agent mints for itself is
  held by the holder of the key it called with (so the human behind a
  self-minted key is on record, PR #326 re-review finding 1).
* ``DELETE /teams/{id}/members/{user}`` revokes, in the same transaction,
  every key the member holds that signs in as an agent of that team
  (including the legacy self-minted keys of the agents they created,
  which migration 0021 recorded as held by the creator, CHT-1537); the
  agents they created pass to
  the removing admin (or the team's owner when the member leaves on their
  own) and the team's other admins get an inbox entry.
* Key auth refuses an agent key whose holder is no longer in the agent's
  team, with the revoked-key 401, even if nothing revoked it.
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
        # k3 was minted by the bot with Bob's k1, so it is Bob's too; the
        # admin's key is not Bob's membership's business.
        assert (await client.get("/api/auth/me", headers=_bearer(w["k3"]))).status_code == 401
        assert (await client.get("/api/auth/me", headers=_bearer(w["k2"]))).status_code == 200

        await OxydeTeamMember.objects.create(team_id=w["team"].id, user_id=w["bob"].id, role=TeamRole.MEMBER)
        assert (await client.get("/api/auth/me", headers=_bearer(w["k1"]))).status_code == 200

    async def test_websocket(self, world):
        """/ws resolves API keys through the shared resolver (CHT-1603), so
        an agent key whose holder left the team fails there as on REST
        (4001), before the /ws rule that refuses agents (4003) is reached."""
        from unittest.mock import AsyncMock

        from app.ws_auth import WsRefused, authenticate

        w = world

        async def code(key):
            with pytest.raises(WsRefused) as refused:
                await authenticate(key, w["team"].id)
            return refused.value.code

        assert await code(w["k1"]) == 4003
        await OxydeTeamMember.objects.filter(team_id=w["team"].id, user_id=w["bob"].id).delete()
        assert await code(w["k1"]) == 4001
        assert await code(w["k2"]) == 4003

        from app.main import websocket_endpoint

        ws = AsyncMock()
        ws.headers = {}
        ws.scope = {}
        await websocket_endpoint(ws, token=w["k1"], team_id=w["team"].id)
        # Refused: accepted, then closed with the code (CHT-1615).
        ws.accept.assert_awaited_once_with(subprotocol=None)
        ws.close.assert_awaited_once_with(code=4001)
        ws.send_json.assert_not_awaited()


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
        assert (rows[w["k1_id"]]["owner_name"], rows[w["k1_id"]]["legacy_self_minted"]) == ("Test User 2", False)
        assert (rows[w["k2_id"]]["owner_name"], rows[w["k2_id"]]["legacy_self_minted"]) == ("Carol", False)
        # Self-minted with Bob's key: held by Bob.
        assert (rows[w["k3_id"]]["owner_id"], rows[w["k3_id"]]["legacy_self_minted"]) == (w["bob"].id, False)
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
        assert (await client.get(f"/api/agents/{w['agent_id']}/keys", headers=w["bob_headers"])).status_code == 404

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

        async def stale_in_team(user, team_id):
            return True

        # Both route checks are stale: seeing the agent (CHT-1785) and
        # managing it.
        monkeypatch.setattr("app.api.visibility.is_in_team_directory", stale_in_team)
        monkeypatch.setattr("app.api.agents.can_manage_agent", stale)
        before = await OxydeAPIKey.objects.filter(principal_user_id=w["agent_id"]).count()

        response = await client.post(f"/api/agents/{w['agent_id']}/keys", headers=w["bob_headers"])

        assert response.status_code == 403, response.text
        assert await OxydeAPIKey.objects.filter(principal_user_id=w["agent_id"]).count() == before


async def _legacy_self_minted_key(agent_id):
    """A key an agent minted for itself before holders were recorded, as
    migration 0021 leaves it: signing in as the agent, held by the agent's
    creator (CHT-1537; test_api_key_principal_migration.py covers the
    backfill itself)."""
    from app.schemas.api_key import APIKeyCreate
    from app.services.api_key_service import APIKeyService

    agent = await OxydeUser.objects.get(id=agent_id)
    record, key = await APIKeyService().create(
        agent_id, APIKeyCreate(name="legacy self"), holder_user_id=agent.parent_user_id,
    )
    assert (record.principal_user_id, record.holder_user_id) == (agent_id, agent.parent_user_id)
    return record, key


@pytest.mark.asyncio
class TestSelfMintedKeysHaveAHolder:
    """PR #326 re-review finding 1: a self-minted key used to carry no
    human, so a non-creator who minted one through the agent kept it."""

    async def test_the_probe_bob_mints_for_ownerbot_ownerbot_self_mints_bob_removed(self, client, world):
        w = world
        await OxydeTeamMember.objects.filter(team_id=w["team"].id, user_id=w["bob"].id).update(role=TeamRole.ADMIN)
        ownerbot = await client.post(
            f"/api/teams/{w['team'].id}/agents", json={"name": "ownerbot"}, headers=w["owner_headers"],
        )
        linked = await client.post(f"/api/agents/{ownerbot.json()['id']}/keys", headers=w["bob_headers"])
        assert linked.status_code == 201
        selfm = await client.post("/api/api-keys", json={"name": "stash"}, headers=_bearer(linked.json()["key"]))
        assert selfm.status_code == 201
        row = await OxydeAPIKey.objects.get(id=selfm.json()["id"])
        assert (row.holder_user_id, row.principal_user_id) == (w["bob"].id, ownerbot.json()["id"])

        removed = await client.delete(f"/api/teams/{w['team'].id}/members/{w['bob'].id}", headers=w["carol_headers"])

        assert removed.status_code == 204
        for key in (linked.json()["key"], selfm.json()["key"]):
            assert (await client.get("/api/auth/me", headers=_bearer(key))).status_code == 401
        assert await _is_active(selfm.json()["id"]) is False
        # The owner's own key for ownerbot is untouched.
        assert (await client.get("/api/auth/me", headers=_bearer(ownerbot.json()["api_key"]))).status_code == 200

    async def test_the_holder_is_inherited_down_a_chain(self, client, world):
        w = world
        second = await client.post("/api/api-keys", json={"name": "chain"}, headers=_bearer(w["k3"]))
        assert second.status_code == 201
        assert (await OxydeAPIKey.objects.get(id=second.json()["id"])).holder_user_id == w["bob"].id

        await OxydeTeamMember.objects.filter(team_id=w["team"].id, user_id=w["bob"].id).delete()

        assert (await client.get("/api/auth/me", headers=_bearer(second.json()["key"]))).status_code == 401

    async def test_a_key_self_minted_with_the_admins_key_survives_bobs_removal(self, client, world):
        w = world
        carols = await client.post("/api/api-keys", json={"name": "c"}, headers=_bearer(w["k2"]))

        await client.delete(f"/api/teams/{w['team'].id}/members/{w['bob'].id}", headers=w["carol_headers"])

        assert (await client.get("/api/auth/me", headers=_bearer(carols.json()["key"]))).status_code == 200

    async def test_the_agent_lists_and_revokes_its_own_keys(self, client, world):
        w = world

        listed = await client.get("/api/api-keys", headers=_bearer(w["k1"]))
        assert {k["id"] for k in listed.json()} == {w["k1_id"], w["k2_id"], w["k3_id"]}

        revoked = await client.delete(f"/api/api-keys/{w['k3_id']}", headers=_bearer(w["k1"]))
        assert revoked.status_code == 204
        assert await _is_active(w["k3_id"]) is False

    async def test_a_human_minted_key_is_unchanged(self, client, world):
        created = await client.post("/api/api-keys", json={"name": "human"}, headers=world["bob_headers"])
        row = await OxydeAPIKey.objects.get(id=created.json()["id"])
        assert (row.principal_user_id, row.holder_user_id) == (world["bob"].id, world["bob"].id)


@pytest.mark.asyncio
class TestLegacySelfMintedKeys:
    """PR #326 re-review finding 2: keys minted before holders were
    recorded, by agents whose creator may already have left. #326 had
    sign-in vouch for them through the agent's creator; migration 0021
    records that creator as their holder (CHT-1537), and they behave
    exactly as before."""

    async def test_refused_once_the_creator_is_gone_and_back_on_rejoin(self, client, world):
        w = world
        _, key = await _legacy_self_minted_key(w["agent_id"])
        assert (await client.get("/api/auth/me", headers=_bearer(key))).status_code == 200

        await OxydeTeamMember.objects.filter(team_id=w["team"].id, user_id=w["bob"].id).delete()
        refused = await client.get("/api/auth/me", headers=_bearer(key))
        assert refused.status_code == 401 and refused.json()["detail"] == "Invalid API key"

        await OxydeTeamMember.objects.create(team_id=w["team"].id, user_id=w["bob"].id, role=TeamRole.MEMBER)
        assert (await client.get("/api/auth/me", headers=_bearer(key))).status_code == 200

    async def test_listed_as_the_creators_and_revoked_by_the_creators_removal(self, client, world):
        w = world
        record, key = await _legacy_self_minted_key(w["agent_id"])
        rows = {r["id"]: r for r in (await client.get(
            f"/api/agents/{w['agent_id']}/keys", headers=w["carol_headers"],
        )).json()}
        # Before 0021 this listed the agent as owner with legacy_self_minted
        # true; the field stays for older clients and is now always false.
        assert (rows[record.id]["owner_id"], rows[record.id]["legacy_self_minted"]) == (w["bob"].id, False)

        await client.delete(f"/api/teams/{w['team'].id}/members/{w['bob'].id}", headers=w["carol_headers"])

        assert await _is_active(record.id) is False

    async def test_an_admin_may_revoke_one(self, client, world):
        w = world
        record, key = await _legacy_self_minted_key(w["agent_id"])

        response = await client.delete(f"/api/api-keys/{record.id}", headers=w["carol_headers"])

        assert response.status_code == 204
        assert (await client.get("/api/auth/me", headers=_bearer(key))).status_code == 401


@pytest.mark.asyncio
class TestReleaseWithNoNewOwner:
    async def test_keys_still_revoked_and_the_agent_stays_put(self, world):
        """Unreachable through the route (a team always keeps an owner),
        but release_member_agents must not reassign to nobody."""
        from app.services.agent_service import AgentService

        w = world
        await OxydeTeamMember.objects.filter(team_id=w["team"].id, user_id=w["bob"].id).delete()

        from app.services.credential_events import revoking

        async with revoking():
            released = await AgentService().release_member_agents(w["team"].id, w["bob"].id, None)

        [(agent, revoked, reassigned)] = released
        assert agent.id == w["agent_id"] and revoked == 2 and reassigned is False
        assert (await OxydeUser.objects.get(id=w["agent_id"])).parent_user_id == w["bob"].id


@pytest.mark.asyncio
class TestSelfMintGuards:
    """PR #326 third review, findings 2, 3 and the agent-on-agent revoke gap."""

    async def test_a_removal_between_sign_in_and_insert_mints_nothing(self, client, world):
        """The holder is re-checked inside the insert's transaction, so a
        removal that lands after sign-in cannot leave an unswept key."""
        from typing import Annotated

        from fastapi import Depends
        from fastapi.security import HTTPAuthorizationCredentials

        from app.api.deps import get_api_key_record, security
        from app.main import app

        w = world

        async def removal_lands_now(
            credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
        ):
            record = await get_api_key_record(credentials)
            await OxydeTeamMember.objects.filter(team_id=w["team"].id, user_id=w["bob"].id).delete()
            return record

        before = await OxydeAPIKey.objects.filter(principal_user_id=w["agent_id"]).count()
        app.dependency_overrides[get_api_key_record] = removal_lands_now
        try:
            response = await client.post("/api/api-keys", json={"name": "race"}, headers=_bearer(w["k1"]))
        finally:
            app.dependency_overrides.pop(get_api_key_record, None)

        assert response.status_code == 401, response.text
        assert await OxydeAPIKey.objects.filter(principal_user_id=w["agent_id"]).count() == before

    async def test_an_agent_without_a_calling_key_is_refused(self, client, world):
        """No path gives an agent a JWT today; if one ever does, it gets no
        key nobody holds."""
        before = await OxydeAPIKey.objects.filter(principal_user_id=world["agent_id"]).count()

        response = await client.post(
            "/api/api-keys", json={"name": "jwt"},
            headers={"Authorization": f"Bearer {create_access_token(data={'sub': world['agent_id']})}"},
        )

        assert response.status_code == 403, response.text
        assert await OxydeAPIKey.objects.filter(principal_user_id=world["agent_id"]).count() == before

    async def test_a_legacy_calling_key_mints_a_key_vouched_for_by_the_creator(self, client, world):
        w = world
        _, legacy = await _legacy_self_minted_key(w["agent_id"])

        minted = await client.post("/api/api-keys", json={"name": "from legacy"}, headers=_bearer(legacy))

        assert minted.status_code == 201, minted.text
        row = await OxydeAPIKey.objects.get(id=minted.json()["id"])
        assert (row.principal_user_id, row.holder_user_id) == (w["agent_id"], w["bob"].id)
        await OxydeTeamMember.objects.filter(team_id=w["team"].id, user_id=w["bob"].id).delete()
        assert (await client.get("/api/auth/me", headers=_bearer(minted.json()["key"]))).status_code == 401

    async def test_an_agent_cannot_revoke_another_agents_key(self, client, world):
        w = world
        other = await client.post(
            f"/api/teams/{w['team'].id}/agents", json={"name": "otherbot"}, headers=w["owner_headers"],
        )

        response = await client.delete(f"/api/api-keys/{other.json()['api_key_id']}", headers=_bearer(w["k1"]))

        assert response.status_code == 403
        assert await _is_active(other.json()["api_key_id"]) is True


@pytest.mark.asyncio
class TestPreReleaseAdminMintedKeys:
    """Baseline for an accepted gap (PR #326 third review, finding 1).

    Before this release, a key an admin minted for someone else's agent
    was recorded as held by the agent's creator. Those rows cannot be
    told apart from the creator's own, so removing the admin who really
    holds one does not revoke it, and a key the agent self-mints with it
    is recorded as the creator's too. docs/agents.md tells admins to
    rotate such keys; CHT-1529 tracks a bulk rotate/revoke. If that
    lands, flip these assertions."""

    async def test_removing_the_admin_who_holds_it_leaves_it_working(self, client, world):
        from app.schemas.api_key import APIKeyCreate
        from app.services.api_key_service import APIKeyService

        w = world
        # Exactly the row main's create_key wrote when Carol minted for bobbot.
        _, carols_old_key = await APIKeyService().create(
            w["agent_id"], APIKeyCreate(name="Key for bobbot"), holder_user_id=w["bob"].id,
        )
        selfm = await client.post("/api/api-keys", json={"name": "s"}, headers=_bearer(carols_old_key))
        assert selfm.status_code == 201

        removed = await client.delete(
            f"/api/teams/{w['team'].id}/members/{w['carol'].id}", headers=w["owner_headers"],
        )

        assert removed.status_code == 204
        assert (await client.get("/api/auth/me", headers=_bearer(carols_old_key))).status_code == 200
        assert (await client.get("/api/auth/me", headers=_bearer(selfm.json()["key"]))).status_code == 200
        rows = {r["id"]: r for r in (await client.get(
            f"/api/agents/{w['agent_id']}/keys", headers=w["owner_headers"],
        )).json()}
        assert rows[selfm.json()["id"]]["owner_name"] == "Test User 2"  # recorded as the creator's
