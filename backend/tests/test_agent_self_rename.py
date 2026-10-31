"""A session identity may rename itself, and nothing more (CHT-1918).

`PATCH /agents/{own id}` with only `name` is allowed for a registered
session identity on itself; anything else it sends, any other agent, and
any agent that is not a registered identity still answer 403 as before.
"""
import pytest

REF = "claude-code:session:2b1f0000-aaaa-bbbb-cccc-000000001918"
OTHER_REF = "claude-code:session:2b1f0000-aaaa-bbbb-cccc-000000001919"


def _bearer(key):
    return {"Authorization": f"Bearer {key}"}


@pytest.fixture
async def registrar(client, auth_headers, test_team):
    created = await client.post(
        f"/api/teams/{test_team.id}/agents", json={"name": "Registrar", "can_register": True}, headers=auth_headers,
    )
    assert created.status_code == 201, created.text
    return created.json()


async def _register(client, registrar, ref, **extra):
    registered = await client.post(
        "/api/agents/register", json={"external_ref": ref, **extra}, headers=_bearer(registrar["api_key"]),
    )
    assert registered.status_code in (200, 201), registered.text
    return registered.json()


async def test_a_session_renames_itself(client, registrar):
    session = await _register(client, registrar, REF)

    renamed = await client.patch(
        f"/api/agents/{session['agent']['id']}", json={"name": "Piper"}, headers=_bearer(session["api_key"]),
    )

    assert renamed.status_code == 200, renamed.text
    assert renamed.json()["name"] == "Piper"
    me = await client.get("/api/auth/me", headers=_bearer(session["api_key"]))
    assert me.json()["name"] == "Piper"


async def test_the_name_survives_a_later_registration(client, registrar):
    session = await _register(client, registrar, REF)
    await client.patch(
        f"/api/agents/{session['agent']['id']}", json={"name": "Piper"}, headers=_bearer(session["api_key"]),
    )

    again = await _register(client, registrar, REF, default_name="Something else")

    assert again["agent"]["id"] == session["agent"]["id"]
    assert again["agent"]["name"] == "Piper"


async def test_a_session_cannot_rename_another_agent(client, registrar):
    session = await _register(client, registrar, REF)
    other = await _register(client, registrar, OTHER_REF)

    for target in (other["agent"]["id"], registrar["id"]):
        refused = await client.patch(
            f"/api/agents/{target}", json={"name": "Weir"}, headers=_bearer(session["api_key"]),
        )
        assert refused.status_code == 403, refused.text


@pytest.mark.parametrize("extra", [{"avatar_url": "https://example.com/a.png"}, {"avatar_url": None}, {"can_register": True}])
async def test_a_session_may_change_only_its_name(client, registrar, extra):
    session = await _register(client, registrar, REF)

    refused = await client.patch(
        f"/api/agents/{session['agent']['id']}", json={"name": "Piper", **extra},
        headers=_bearer(session["api_key"]),
    )

    assert refused.status_code in (403, 409), refused.text
    me = await client.get("/api/auth/me", headers=_bearer(session["api_key"]))
    assert me.json()["name"] != "Piper"


async def test_a_session_still_may_not_take_a_persons_name(client, registrar, test_user):
    session = await _register(client, registrar, REF)

    refused = await client.patch(
        f"/api/agents/{session['agent']['id']}", json={"name": test_user.name}, headers=_bearer(session["api_key"]),
    )

    assert refused.status_code == 422, refused.text


async def test_a_hand_made_agent_still_cannot_rename_itself(client, registrar):
    refused = await client.patch(
        f"/api/agents/{registrar['id']}", json={"name": "Renamed"}, headers=_bearer(registrar["api_key"]),
    )

    assert refused.status_code == 403, refused.text
