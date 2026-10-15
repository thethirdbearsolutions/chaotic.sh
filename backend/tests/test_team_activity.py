"""A team's administrative log: team_activities (CHT-1843, CHT-1845).

Every member added, removed (or leaving) and given another role, every
invitation created, cancelled and accepted, and every invitation
verification code an admin issues (tested in
test_invitation_verification_code) is a row, written in the transaction
of what it records. Team admins read it at GET /api/teams/{team}/activity.
Before this table a removal that ended no connection left nothing in the
database (CHT-1843).
"""
from app.enums import TeamActivityAction, TeamRole
from app.oxyde_models.team import OxydeTeamActivity, OxydeTeamInvitation, OxydeTeamMember
from app.services.team_service import TeamService


async def _activity(client, team_id, headers, **params):
    response = await client.get(f"/api/teams/{team_id}/activity", headers=headers, params=params)
    assert response.status_code == 200, response.text
    return response.json()


async def _join(team_id, user_id, role=TeamRole.MEMBER):
    await OxydeTeamMember.objects.create(team_id=team_id, user_id=user_id, role=role)


async def test_creating_a_team_records_its_owner(client, auth_headers, test_user):
    response = await client.post("/api/teams", headers=auth_headers, json={"name": "Log", "key": "LOG"})
    team_id = response.json()["id"]
    rows = await _activity(client, team_id, auth_headers)
    assert [(r["action"], r["actor_id"], r["target_user_id"], r["role"]) for r in rows] == [
        ("member_added", test_user.id, test_user.id, "owner"),
    ]
    assert rows[0]["actor_name"] == "Test User"


async def test_removing_a_member_who_held_nothing_is_recorded(
    client, auth_headers, test_team, test_user, test_user2,
):
    """The CHT-1843 case: no connection, code or ticket ended, so no
    revocation event; the removal is still on record."""
    await _join(test_team.id, test_user2.id, TeamRole.ADMIN)
    response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers)
    assert response.status_code == 204
    rows = await _activity(client, test_team.id, auth_headers)
    assert len(rows) == 1
    row = rows[0]
    assert row["action"] == "member_removed"
    assert (row["actor_id"], row["target_user_id"]) == (test_user.id, test_user2.id)
    assert row["target_user_name"] == "Test User 2"
    assert row["role"] == "admin"
    assert row["created_at"].endswith("Z") or "+00:00" in row["created_at"]


async def test_leaving_is_a_removal_by_oneself(client, auth_headers, auth_headers2, test_team, test_user2):
    await _join(test_team.id, test_user2.id)
    response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers2)
    assert response.status_code == 204
    [row] = await _activity(client, test_team.id, auth_headers, action="member_removed")
    assert row["actor_id"] == row["target_user_id"] == test_user2.id


async def test_a_refused_removal_records_nothing(client, auth_headers, auth_headers2, test_team, test_user):
    response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user.id}", headers=auth_headers)
    assert response.status_code == 400  # the owner
    assert await OxydeTeamActivity.objects.filter(team_id=test_team.id).count() == 0


async def test_a_role_change_records_both_roles_and_a_no_op_nothing(
    client, auth_headers, test_team, test_user2,
):
    await _join(test_team.id, test_user2.id)
    url = f"/api/teams/{test_team.id}/members/{test_user2.id}"
    assert (await client.patch(url, headers=auth_headers, json={"role": "admin"})).status_code == 200
    assert (await client.patch(url, headers=auth_headers, json={"role": "admin"})).status_code == 200
    rows = await _activity(client, test_team.id, auth_headers)
    assert [(r["action"], r["old_role"], r["role"]) for r in rows] == [("role_changed", "member", "admin")]


async def test_an_invitation_is_recorded_when_created_cancelled_and_accepted(
    client, auth_headers, auth_headers2, test_team, test_user, test_user2,
):
    base = f"/api/teams/{test_team.id}/invitations"
    first = await client.post(base, headers=auth_headers, json={"email": "nobody@example.com", "role": "member"})
    assert first.status_code == 201, first.text
    assert (await client.delete(f"{base}/{first.json()['id']}", headers=auth_headers)).status_code == 204

    second = await client.post(base, headers=auth_headers, json={"email": test_user2.email, "role": "admin"})
    token = (await OxydeTeamInvitation.objects.get(id=second.json()["id"])).token
    assert (await client.post(f"/api/teams/invitations/{token}/accept", headers=auth_headers2)).status_code == 200

    rows = await _activity(client, test_team.id, auth_headers)
    assert [r["action"] for r in rows] == [
        "invitation_accepted", "invitation_created", "invitation_cancelled", "invitation_created",
    ]
    accepted, created, cancelled, created_first = rows
    assert accepted["invitation_id"] == created["invitation_id"] == second.json()["id"]
    assert (accepted["actor_id"], accepted["target_user_id"], accepted["role"]) == (test_user2.id, test_user2.id, "admin")
    assert cancelled["invitation_id"] == created_first["invitation_id"] == first.json()["id"]
    assert cancelled["email"] == "nobody@example.com" and cancelled["actor_id"] == test_user.id
    # Never the bearer token, nor the link that carries it.
    body = str(rows)
    assert token not in body and "/invite/" not in body


async def test_add_member_records_only_a_new_membership(test_team, test_user, test_user2):
    service = TeamService()
    await service.add_member(test_team, test_user2, TeamRole.MEMBER, actor_id=test_user.id)
    await service.add_member(test_team, test_user2, TeamRole.ADMIN, actor_id=test_user.id)
    rows = await OxydeTeamActivity.objects.filter(team_id=test_team.id).all()
    assert [(r.action, r.target_user_id, r.role) for r in rows] == [
        (TeamActivityAction.MEMBER_ADDED, test_user2.id, TeamRole.MEMBER),
    ]


async def test_paging_is_newest_first(client, auth_headers, test_team, test_user):
    service = TeamService()
    for n in range(5):
        await service.record_activity(
            test_team.id, TeamActivityAction.INVITATION_CREATED, actor_id=test_user.id, email=f"u{n}@example.com",
        )
    page1 = await _activity(client, test_team.id, auth_headers, limit=2)
    page2 = await _activity(client, test_team.id, auth_headers, limit=2, skip=2)
    page3 = await _activity(client, test_team.id, auth_headers, limit=2, skip=4)
    emails = [r["email"] for r in page1 + page2 + page3]
    assert emails == [f"u{n}@example.com" for n in reversed(range(5))]


async def test_a_deleted_user_keeps_their_id(client, auth_headers, test_team, test_user):
    await TeamService().record_activity(
        test_team.id, TeamActivityAction.MEMBER_REMOVED, actor_id=test_user.id, target_user_id="gone-user",
    )
    [row] = await _activity(client, test_team.id, auth_headers)
    assert row["target_user_id"] == "gone-user" and row["target_user_name"] is None


class TestWhoMayRead:
    async def test_a_member_who_is_not_an_admin_gets_403(self, client, test_team, test_user2, auth_headers2):
        await _join(test_team.id, test_user2.id)
        response = await client.get(f"/api/teams/{test_team.id}/activity", headers=auth_headers2)
        assert response.status_code == 403

    async def test_an_admin_may(self, client, test_team, test_user2, auth_headers2):
        await _join(test_team.id, test_user2.id, TeamRole.ADMIN)
        response = await client.get(f"/api/teams/{test_team.id}/activity", headers=auth_headers2)
        assert response.status_code == 200

    async def test_an_outsider_gets_the_missing_teams_404(self, client, test_team, auth_headers2):
        outsider = await client.get(f"/api/teams/{test_team.id}/activity", headers=auth_headers2)
        missing = await client.get("/api/teams/no-such-team/activity", headers=auth_headers2)
        assert outsider.status_code == missing.status_code == 404
        assert outsider.json() == missing.json()

    async def test_bad_paging_and_actions_are_422(self, client, test_team, auth_headers):
        for params in ({"limit": 0}, {"limit": 501}, {"skip": -1}, {"action": "MEMBER_REMOVED"}):
            response = await client.get(f"/api/teams/{test_team.id}/activity", headers=auth_headers, params=params)
            assert response.status_code == 422, params
