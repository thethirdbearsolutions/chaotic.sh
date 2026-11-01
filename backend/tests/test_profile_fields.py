"""Every member writes their own identity (CHT-1979).

People and agents alike set their own name, avatar, bio, pronouns and
tagline: people and agents on PATCH /users/me, an agent also on PATCH
/agents/{own id}. An agent's own name is held to the same rules on both
paths: not blank, not a person's name, not another agent's.
"""
import pytest

from app.schemas.user import PROFILE_LIMITS

REF = "claude-code:session:2b1f0000-aaaa-bbbb-cccc-000000001979"


def _bearer(key):
    return {"Authorization": f"Bearer {key}"}


@pytest.fixture
async def made_agent(client, auth_headers, test_team):
    created = await client.post(
        f"/api/teams/{test_team.id}/agents", json={"name": "Reviewer"}, headers=auth_headers,
    )
    assert created.status_code == 201, created.text
    return created.json()


@pytest.fixture
async def session(client, auth_headers, test_team):
    registrar = await client.post(
        f"/api/teams/{test_team.id}/agents", json={"name": "Registrar", "can_register": True}, headers=auth_headers,
    )
    assert registrar.status_code == 201, registrar.text
    registered = await client.post(
        "/api/agents/register", json={"external_ref": REF}, headers=_bearer(registrar.json()["api_key"]),
    )
    assert registered.status_code in (200, 201), registered.text
    return registered.json()


PROFILE = {
    "bio": "I review **backend** PRs.\n\nAsk me about migrations.",
    "pronouns": "they/them",
    "tagline": "Backend reviewer",
}


async def test_a_person_writes_their_own_profile(client, auth_headers):
    updated = await client.patch("/api/users/me", json=PROFILE, headers=auth_headers)

    assert updated.status_code == 200, updated.text
    for field, value in PROFILE.items():
        assert updated.json()[field] == value
    me = await client.get("/api/auth/me", headers=auth_headers)
    assert me.json()["bio"] == PROFILE["bio"]


async def test_a_teammate_sees_the_profile(client, auth_headers, made_agent, test_user):
    await client.patch("/api/users/me", json=PROFILE, headers=auth_headers)

    seen = await client.get(f"/api/users/{test_user.id}", headers=_bearer(made_agent["api_key"]))

    assert seen.status_code == 200, seen.text
    assert seen.json()["tagline"] == "Backend reviewer"
    assert seen.json()["pronouns"] == "they/them"


async def test_blank_clears_and_text_is_trimmed(client, auth_headers):
    await client.patch("/api/users/me", json=PROFILE, headers=auth_headers)

    updated = await client.patch(
        "/api/users/me", json={"bio": "   ", "pronouns": None, "tagline": "  Two\n  lines  "}, headers=auth_headers,
    )

    assert updated.status_code == 200, updated.text
    assert updated.json()["bio"] is None
    assert updated.json()["pronouns"] is None
    assert updated.json()["tagline"] == "Two lines"


async def test_fields_left_out_are_kept(client, auth_headers):
    await client.patch("/api/users/me", json=PROFILE, headers=auth_headers)

    updated = await client.patch("/api/users/me", json={"tagline": "New line"}, headers=auth_headers)

    assert updated.json()["bio"] == PROFILE["bio"]
    assert updated.json()["tagline"] == "New line"


@pytest.mark.parametrize("field", sorted(PROFILE_LIMITS))
async def test_each_field_is_capped(client, auth_headers, field):
    refused = await client.patch(
        "/api/users/me", json={field: "x" * (PROFILE_LIMITS[field] + 1)}, headers=auth_headers,
    )
    assert refused.status_code == 422, refused.text

    at_limit = await client.patch("/api/users/me", json={field: "x" * PROFILE_LIMITS[field]}, headers=auth_headers)
    assert at_limit.status_code == 200, at_limit.text


@pytest.mark.parametrize("name", ["", "   ", None])
async def test_a_name_may_not_be_blank_or_null(client, auth_headers, name):
    refused = await client.patch("/api/users/me", json={"name": name}, headers=auth_headers)

    assert refused.status_code == 422, refused.text


async def test_a_person_name_is_trimmed(client, auth_headers):
    updated = await client.patch("/api/users/me", json={"name": "  Sam  "}, headers=auth_headers)

    assert updated.json()["name"] == "Sam"


@pytest.fixture(params=["made_agent", "session"])
async def any_agent(request, made_agent, session):
    """Each kind of agent, as (id, key): hand-made and registered session."""
    if request.param == "made_agent":
        return made_agent["id"], made_agent["api_key"]
    return session["agent"]["id"], session["api_key"]


async def test_an_agent_writes_its_own_profile_on_users_me(client, any_agent):
    _, key = any_agent

    updated = await client.patch(
        "/api/users/me", json={**PROFILE, "name": "Piper", "avatar_url": "🦉"}, headers=_bearer(key),
    )

    assert updated.status_code == 200, updated.text
    assert updated.json()["name"] == "Piper"
    assert updated.json()["avatar_url"] == "🦉"
    assert updated.json()["bio"] == PROFILE["bio"]


async def test_an_agent_writes_its_own_profile_on_agents(client, any_agent):
    agent_id, key = any_agent

    updated = await client.patch(f"/api/agents/{agent_id}", json=PROFILE, headers=_bearer(key))

    assert updated.status_code == 200, updated.text
    assert updated.json()["tagline"] == "Backend reviewer"
    listed = await client.get(f"/api/agents/{agent_id}", headers=_bearer(key))
    assert listed.json()["bio"] == PROFILE["bio"]


async def test_an_agent_cannot_write_another_agents_profile(client, made_agent, session):
    refused = await client.patch(
        f"/api/agents/{made_agent['id']}", json={"bio": "Not mine"}, headers=_bearer(session["api_key"]),
    )

    assert refused.status_code == 403, refused.text


async def test_an_owner_writes_their_agents_profile(client, auth_headers, made_agent):
    updated = await client.patch(f"/api/agents/{made_agent['id']}", json=PROFILE, headers=auth_headers)

    assert updated.status_code == 200, updated.text
    assert updated.json()["pronouns"] == "they/them"


async def test_an_agent_is_created_with_a_profile(client, auth_headers, test_team):
    created = await client.post(
        f"/api/teams/{test_team.id}/agents", json={"name": "Scribe", **PROFILE}, headers=auth_headers,
    )

    assert created.status_code == 201, created.text
    assert created.json()["bio"] == PROFILE["bio"]


@pytest.mark.parametrize("path", ["users", "agents"])
async def test_an_agent_may_not_take_a_persons_name(client, made_agent, test_user, path):
    url = "/api/users/me" if path == "users" else f"/api/agents/{made_agent['id']}"

    refused = await client.patch(url, json={"name": test_user.name}, headers=_bearer(made_agent["api_key"]))

    assert refused.status_code == 422, refused.text
    assert refused.json()["detail"]["error_code"] == "name_matches_member"


@pytest.mark.parametrize("path", ["users", "agents"])
async def test_an_agent_may_not_take_another_agents_name(client, made_agent, session, path):
    url = "/api/users/me" if path == "users" else f"/api/agents/{made_agent['id']}"

    refused = await client.patch(
        url, json={"name": session["agent"]["name"]}, headers=_bearer(made_agent["api_key"]),
    )

    assert refused.status_code == 409, refused.text
    assert refused.json()["detail"]["error_code"] == "name_matches_agent"


async def test_an_agent_may_resend_its_own_name(client, made_agent):
    kept = await client.patch(
        "/api/users/me", json={"name": " Reviewer ", "tagline": "Still me"}, headers=_bearer(made_agent["api_key"]),
    )

    assert kept.status_code == 200, kept.text
    assert kept.json()["name"] == "Reviewer"


# Review of #509: the name rules on every path, text cleaning, caps.


@pytest.mark.parametrize("name", [None, "   ", "​"])
async def test_a_manager_may_not_blank_an_agents_name(client, auth_headers, made_agent, name):
    refused = await client.patch(f"/api/agents/{made_agent['id']}", json={"name": name}, headers=auth_headers)

    assert refused.status_code == 422, refused.text


async def test_a_manager_rename_is_trimmed(client, auth_headers, made_agent):
    renamed = await client.patch(f"/api/agents/{made_agent['id']}", json={"name": "  Ed  "}, headers=auth_headers)

    assert renamed.json()["name"] == "Ed"


@pytest.mark.parametrize("name", ["​", "​ ⁠"])
async def test_a_person_may_not_take_an_invisible_name(client, auth_headers, name):
    refused = await client.patch("/api/users/me", json={"name": name}, headers=auth_headers)

    assert refused.status_code == 422, refused.text


async def test_control_and_bidi_characters_are_dropped(client, auth_headers):
    updated = await client.patch(
        "/api/users/me",
        json={"tagline": "‮admin\x00", "pronouns": "she⁦/her", "bio": "line\x07 one\n\tline two‮"},
        headers=auth_headers,
    )

    assert updated.status_code == 200, updated.text
    assert updated.json()["tagline"] == "admin"
    assert updated.json()["pronouns"] == "she/her"
    assert updated.json()["bio"] == "line one\n\tline two"


async def test_emoji_joiners_survive(client, auth_headers):
    family = "\U0001F469‍\U0001F467"
    updated = await client.patch("/api/users/me", json={"tagline": f"Parent {family}"}, headers=auth_headers)

    assert updated.json()["tagline"] == f"Parent {family}"


async def test_the_avatar_is_capped(client, auth_headers, test_team):
    from app.schemas.user import AVATAR_URL_MAX

    too_long = "data:image/png;base64," + "A" * AVATAR_URL_MAX
    assert (await client.patch("/api/users/me", json={"avatar_url": too_long}, headers=auth_headers)).status_code == 422
    created = await client.post(
        f"/api/teams/{test_team.id}/agents", json={"name": "Big", "avatar_url": too_long}, headers=auth_headers,
    )
    assert created.status_code == 422, created.text


async def test_creating_an_agent_with_a_too_long_tagline_is_refused(client, auth_headers, test_team):
    refused = await client.post(
        f"/api/teams/{test_team.id}/agents",
        json={"name": "Wordy", "tagline": "x" * (PROFILE_LIMITS["tagline"] + 1)}, headers=auth_headers,
    )

    assert refused.status_code == 422, refused.text


async def test_a_project_scoped_agent_writes_its_own_profile(client, auth_headers, test_project):
    created = await client.post(
        f"/api/projects/{test_project.id}/agents", json={"name": "Local"}, headers=auth_headers,
    )
    assert created.status_code == 201, created.text
    agent = created.json()

    updated = await client.patch(
        f"/api/agents/{agent['id']}", json={"name": "Local Hero", **PROFILE}, headers=_bearer(agent["api_key"]),
    )

    assert updated.status_code == 200, updated.text
    assert updated.json()["name"] == "Local Hero"
    assert updated.json()["bio"] == PROFILE["bio"]
