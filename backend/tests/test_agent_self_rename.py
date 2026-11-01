"""A session identity may rename itself (CHT-1918), and since CHT-1979
every agent may change its own identity: name, avatar and profile.

`PATCH /agents/{own id}` with identity fields only is allowed for any
agent on itself; `can_register` and any other agent still answer 403.
"""
import pytest

REF = "claude-code:session:2b1f0000-aaaa-bbbb-cccc-000000001918"
OTHER_REF = "claude-code:session:2b1f0000-aaaa-bbbb-cccc-000000001919"
THIRD_REF = "claude-code:session:2b1f0000-aaaa-bbbb-cccc-000000001920"


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


@pytest.mark.parametrize("extra", [{"can_register": True}, {"can_register": False}, {"name": None}])
async def test_a_session_may_change_only_its_identity(client, registrar, extra):
    session = await _register(client, registrar, REF)

    refused = await client.patch(
        f"/api/agents/{session['agent']['id']}", json={"name": "Piper", **extra},
        headers=_bearer(session["api_key"]),
    )

    assert refused.status_code == 403, refused.text
    me = await client.get("/api/auth/me", headers=_bearer(session["api_key"]))
    assert me.json()["name"] != "Piper"


@pytest.mark.parametrize("extra", [{"avatar_url": "https://example.com/a.png"}, {"avatar_url": None}])
async def test_a_session_may_change_its_avatar_with_its_name(client, registrar, extra):
    """Since CHT-1979 a session's avatar and profile are its own too."""
    session = await _register(client, registrar, REF)

    renamed = await client.patch(
        f"/api/agents/{session['agent']['id']}", json={"name": "Piper", **extra},
        headers=_bearer(session["api_key"]),
    )

    assert renamed.status_code == 200, renamed.text
    assert renamed.json()["name"] == "Piper"
    assert renamed.json()["avatar_url"] == extra["avatar_url"]


async def test_a_session_still_may_not_take_a_persons_name(client, registrar, test_user):
    session = await _register(client, registrar, REF)

    refused = await client.patch(
        f"/api/agents/{session['agent']['id']}", json={"name": test_user.name}, headers=_bearer(session["api_key"]),
    )

    assert refused.status_code == 422, refused.text


async def test_a_hand_made_agent_renames_itself_too(client, auth_headers, test_team):
    """Since CHT-1979 every agent's identity is its own to write. (A
    registrar may write nothing at all, its own name included.)"""
    made = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Helper"}, headers=auth_headers)
    renamed = await client.patch(
        f"/api/agents/{made.json()['id']}", json={"name": "Renamed"}, headers=_bearer(made.json()["api_key"]),
    )

    assert renamed.status_code == 200, renamed.text
    assert renamed.json()["name"] == "Renamed"


async def test_renaming_to_its_own_name_is_a_no_op(client, registrar):
    session = await _register(client, registrar, REF)
    same = await client.patch(
        f"/api/agents/{session['agent']['id']}", json={"name": session["agent"]["name"]},
        headers=_bearer(session["api_key"]),
    )
    assert same.status_code == 200, same.text
    assert same.json()["name"] == session["agent"]["name"]


@pytest.mark.parametrize("name", ["   ", "\u200b"])
async def test_a_blank_name_is_refused(client, registrar, name):
    session = await _register(client, registrar, REF)
    refused = await client.patch(
        f"/api/agents/{session['agent']['id']}", json={"name": name}, headers=_bearer(session["api_key"]),
    )
    assert refused.status_code == 422, refused.text


async def test_the_name_is_stripped(client, registrar):
    session = await _register(client, registrar, REF)
    renamed = await client.patch(
        f"/api/agents/{session['agent']['id']}", json={"name": "  Piper "}, headers=_bearer(session["api_key"]),
    )
    assert renamed.json()["name"] == "Piper"


async def test_a_session_may_not_take_another_agents_name_or_handle(client, registrar):
    session = await _register(client, registrar, REF)
    other = await _register(client, registrar, OTHER_REF)
    await client.patch(
        f"/api/agents/{other['agent']['id']}", json={"name": "Weir"}, headers=_bearer(other["api_key"]),
    )

    third = await _register(client, registrar, THIRD_REF)
    tail = third["agent"]["name"].rsplit(" · ", 1)[1]

    # The last one claims the third session's tail handle, registrar-<tail>.
    for name in ("Weir", "weir", "Registrar", third["agent"]["name"], f"Registrar · elsewhere · {tail}"):
        refused = await client.patch(
            f"/api/agents/{session['agent']['id']}", json={"name": name}, headers=_bearer(session["api_key"]),
        )
        assert refused.status_code == 409, (name, refused.text)
        assert refused.json()["detail"]["error_code"] == "name_matches_agent"


async def test_a_manager_rename_is_not_held_to_the_agent_name_rule(client, auth_headers, registrar):
    session = await _register(client, registrar, REF)
    renamed = await client.patch(
        f"/api/agents/{session['agent']['id']}", json={"name": "Registrar"}, headers=auth_headers,
    )
    assert renamed.status_code == 200, renamed.text
