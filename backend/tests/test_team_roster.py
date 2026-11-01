"""GET /teams/{id}/roster: people and agents with their identities (CHT-1980)."""
from datetime import datetime, timedelta, timezone

from app.enums import TeamRole
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.team import OxydeTeamMember
from app.oxyde_models.user import OxydeUser

REF = "claude-code:session:2b1f0000-aaaa-bbbb-cccc-000000001980"


def _bearer(key):
    return {"Authorization": f"Bearer {key}"}


async def _agent(client, headers, team, name, **extra):
    created = await client.post(f"/api/teams/{team.id}/agents", json={"name": name, **extra}, headers=headers)
    assert created.status_code == 201, created.text
    return created.json()


async def test_people_then_agents_with_their_profiles(client, auth_headers, test_team, test_user, test_user2):
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
    await client.patch(
        "/api/users/me", json={"tagline": "Founder", "pronouns": "they/them", "bio": "Hi."}, headers=auth_headers,
    )
    await _agent(client, auth_headers, test_team, "Zed", tagline="Reviews PRs")
    await _agent(client, auth_headers, test_team, "Ada")

    roster = await client.get(f"/api/teams/{test_team.id}/roster", headers=auth_headers)

    assert roster.status_code == 200, roster.text
    rows = roster.json()
    assert [r["name"] for r in rows] == ["Test User", "Test User 2", "Ada", "Zed"]
    owner = rows[0]
    assert owner["role"] == "owner" and owner["is_agent"] is False
    assert (owner["tagline"], owner["pronouns"], owner["bio"]) == ("Founder", "they/them", "Hi.")
    assert owner["mention_handle"]
    assert "email" not in owner and "user_email" not in owner
    assert rows[1]["role"] == "member"
    zed = rows[3]
    assert zed["is_agent"] is True and zed["kind"] == "assistant"
    assert zed["tagline"] == "Reviews PRs"
    assert zed["owner_id"] == test_user.id and zed["owner_name"] == "Test User"
    assert zed["role"] is None and zed["idle"] is False


async def test_an_agent_reads_the_roster_and_sees_itself(client, auth_headers, test_team):
    agent = await _agent(client, auth_headers, test_team, "Scout")
    await client.patch("/api/users/me", json={"bio": "I scout."}, headers=_bearer(agent["api_key"]))

    roster = await client.get(f"/api/teams/{test_team.id}/roster", headers=_bearer(agent["api_key"]))

    assert roster.status_code == 200, roster.text
    me = next(r for r in roster.json() if r["user_id"] == agent["id"])
    assert me["bio"] == "I scout."


async def test_deactivated_accounts_are_left_out(client, auth_headers, test_team, test_user2):
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
    agent = await _agent(client, auth_headers, test_team, "Gone")
    await OxydeUser.objects.filter(id__in=[agent["id"], test_user2.id]).update(is_active=False)

    roster = await client.get(f"/api/teams/{test_team.id}/roster", headers=auth_headers)

    assert [r["name"] for r in roster.json()] == ["Test User"]


async def test_idle_sessions_are_marked_and_can_be_hidden(client, auth_headers, test_team):
    registrar = await _agent(client, auth_headers, test_team, "Registrar", can_register=True)
    registered = await client.post(
        "/api/agents/register", json={"external_ref": REF}, headers=_bearer(registrar["api_key"]),
    )
    session_id = registered.json()["agent"]["id"]
    long_ago = datetime.now(timezone.utc) - timedelta(days=30)
    await OxydeAPIKey.objects.filter(principal_user_id=session_id).update(last_used_at=long_ago, created_at=long_ago)
    await OxydeUser.objects.filter(id=session_id).update(created_at=long_ago)

    full = await client.get(f"/api/teams/{test_team.id}/roster", headers=auth_headers)
    hidden = await client.get(f"/api/teams/{test_team.id}/roster?hide_idle=true", headers=auth_headers)

    session = next(r for r in full.json() if r["user_id"] == session_id)
    assert session["idle"] is True and session["kind"] == "session"
    assert session_id not in {r["user_id"] for r in hidden.json()}


async def test_an_outsider_gets_the_missing_teams_404(client, auth_headers2, test_team):
    refused = await client.get(f"/api/teams/{test_team.id}/roster", headers=auth_headers2)

    assert refused.status_code == 404, refused.text
