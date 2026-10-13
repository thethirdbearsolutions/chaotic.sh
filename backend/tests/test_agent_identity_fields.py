"""Agent identity fields on agent and user responses (CHT-1497)."""
import pytest

from app.enums import AgentKind
from app.oxyde_models.user import OxydeUser


@pytest.mark.asyncio
class TestIdentityFields:
    async def test_a_hand_made_agent_is_an_assistant_everywhere_it_is_shown(self, client, auth_headers, test_team):
        created = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Helper"}, headers=auth_headers)
        assert created.status_code == 201, created.text
        agent_id, key = created.json()["id"], created.json()["api_key"]

        row = await OxydeUser.objects.get(id=agent_id)
        assert row.kind == AgentKind.ASSISTANT and row.can_register is False

        expected = {"kind": "assistant", "external_ref": None, "registered_by_id": None}
        shown = (await client.get(f"/api/agents/{agent_id}", headers=auth_headers)).json()
        assert {k: shown[k] for k in expected} == expected and shown["can_register"] is False
        listed = (await client.get(f"/api/teams/{test_team.id}/agents", headers=auth_headers)).json()
        assert {k: listed[0][k] for k in expected} == expected

        me = (await client.get("/api/auth/me", headers={"Authorization": f"Bearer {key}"})).json()
        assert {k: me[k] for k in expected} == expected and me["can_register"] is False

    async def test_a_human_has_no_kind(self, client, auth_headers):
        me = (await client.get("/api/auth/me", headers=auth_headers)).json()
        assert (me["kind"], me["external_ref"], me["registered_by_id"]) == (None, None, None)

    async def test_user_lookup_carries_the_fields_without_leaking_others(self, client, auth_headers, test_user):
        body = (await client.get(f"/api/users/{test_user.id}", headers=auth_headers)).json()
        assert body["kind"] is None and body["can_register"] is False
        assert "hashed_password" not in body and "is_superuser" not in body
