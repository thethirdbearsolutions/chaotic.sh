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

    full = await client.get(f"/api/teams/{test_team.id}/roster?include_idle=true", headers=auth_headers)
    default = await client.get(f"/api/teams/{test_team.id}/roster", headers=auth_headers)

    session = next(r for r in full.json() if r["user_id"] == session_id)
    assert session["idle"] is True and session["kind"] == "session"
    # Left out unless asked for: sessions pile up (PR #516 review).
    assert session_id not in {r["user_id"] for r in default.json()}


async def test_an_outsider_gets_the_missing_teams_404(client, auth_headers2, test_team):
    refused = await client.get(f"/api/teams/{test_team.id}/roster", headers=auth_headers2)

    assert refused.status_code == 404, refused.text


# Review of the roster PR: ordering by role, who reads it, what it never carries.


async def test_people_are_ordered_by_role_before_name(client, auth_headers, test_team, test_user2):
    aaron = await OxydeUser.objects.create(email="aaron@example.com", hashed_password="x", name="Aaron")
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=aaron.id, role=TeamRole.MEMBER)
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.ADMIN)

    roster = await client.get(f"/api/teams/{test_team.id}/roster", headers=auth_headers)

    assert [(r["name"], r["role"]) for r in roster.json()] == [
        ("Test User", "owner"), ("Test User 2", "admin"), ("Aaron", "member"),
    ]


async def test_a_project_scoped_agent_reads_its_teams_roster(client, auth_headers, test_team, test_project):
    created = await client.post(f"/api/projects/{test_project.id}/agents", json={"name": "Local"}, headers=auth_headers)
    agent = created.json()

    roster = await client.get(f"/api/teams/{test_team.id}/roster", headers=_bearer(agent["api_key"]))

    assert roster.status_code == 200, roster.text
    me = next(r for r in roster.json() if r["user_id"] == agent["id"])
    assert me["project_id"] == test_project.id


async def test_no_row_carries_an_address_or_session_ref(client, auth_headers, test_team):
    registrar = await _agent(client, auth_headers, test_team, "Registrar", can_register=True)
    await client.post("/api/agents/register", json={"external_ref": REF}, headers=_bearer(registrar["api_key"]))

    roster = await client.get(f"/api/teams/{test_team.id}/roster?include_idle=true", headers=auth_headers)

    assert len(roster.json()) == 3
    for row in roster.json():
        assert not {"email", "user_email", "external_ref", "registered_by_id"} & set(row), row
        assert REF not in str(row)


async def test_an_agent_holding_a_membership_shows_its_role(client, auth_headers, test_team, agent_user):
    roster = await client.get(f"/api/teams/{test_team.id}/roster", headers=auth_headers)

    row = next(r for r in roster.json() if r["user_id"] == agent_user.id)
    assert row["is_agent"] is True and row["role"] == "owner"


# Review of #516: order, guests, handles, avatars.


async def test_teammates_of_one_name_keep_their_order(client, auth_headers, test_team):
    for i in range(3):
        await _agent(client, auth_headers, test_team, f"Twin {i}")
    # Same name in the database: the rule against it guards the API.
    await OxydeUser.objects.filter(name__startswith="Twin").update(name="Twin")

    orders = {
        tuple(r["user_id"] for r in (await client.get(f"/api/teams/{test_team.id}/roster", headers=auth_headers)).json())
        for _ in range(3)
    }

    assert len(orders) == 1
    twins = [r["user_id"] for r in (await client.get(f"/api/teams/{test_team.id}/roster", headers=auth_headers)).json() if r["name"] == "Twin"]
    assert twins == sorted(twins)


async def test_another_teams_agent_with_a_membership_is_listed(client, auth_headers, test_team, test_user2):
    from app.oxyde_models.team import OxydeTeam

    other = await OxydeTeam.objects.create(name="Other", key="OTHR")
    guest = await OxydeUser.objects.create(
        email="visitor@agents.example.com", hashed_password="x", name="Visitor", is_agent=True,
        agent_team_id=other.id, parent_user_id=test_user2.id,
    )
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=guest.id, role=TeamRole.MEMBER)

    roster = (await client.get(f"/api/teams/{test_team.id}/roster", headers=auth_headers)).json()

    row = next(r for r in roster if r["user_id"] == guest.id)
    assert row["is_agent"] is True and row["role"] == "member"
    assert row["owner_name"] == test_user2.name


async def test_handles_match_the_members_list(client, auth_headers, test_team):
    await _agent(client, auth_headers, test_team, "Scout")

    roster = (await client.get(f"/api/teams/{test_team.id}/roster", headers=auth_headers)).json()
    members = (await client.get(f"/api/teams/{test_team.id}/members", headers=auth_headers)).json()

    by_member = {m["user_id"]: m["mention_handle"] for m in members}
    for row in roster:
        if row["user_id"] in by_member:
            assert row["mention_handle"] == by_member[row["user_id"]]
        assert row["mention_handle"]


async def test_avatars_are_cleaned_and_blank_clears(client, auth_headers):
    cleaned = await client.patch("/api/users/me", json={"avatar_url": "\x1b[2J🦉"}, headers=auth_headers)
    assert cleaned.json()["avatar_url"] == "[2J🦉"

    cleared = await client.patch("/api/users/me", json={"avatar_url": "   "}, headers=auth_headers)
    assert cleared.json()["avatar_url"] is None

    await client.patch("/api/users/me", json={"avatar_url": "🦉"}, headers=auth_headers)
    nulled = await client.patch("/api/users/me", json={"avatar_url": None}, headers=auth_headers)
    assert nulled.json()["avatar_url"] is None
