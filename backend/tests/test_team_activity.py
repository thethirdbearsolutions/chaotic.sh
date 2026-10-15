"""A team's administrative log: team_activities (CHT-1843, CHT-1845).

Every member added, removed (or leaving) and given another role, every
invitation created, cancelled and accepted, and every invitation
verification code an admin issues (tested in
test_invitation_verification_code) is a row, written in the transaction
of what it records. Team admins read it at GET /api/teams/{team}/activity.
Before this table a removal that ended no connection left nothing in the
database (CHT-1843).
"""
from datetime import datetime, timedelta, timezone

import pytest

from app.api.visibility import TEAM_HIDDEN_DETAIL
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
        "member_added", "invitation_accepted", "invitation_created", "invitation_cancelled", "invitation_created",
    ]
    added, accepted, created, cancelled, created_first = rows
    assert added["invitation_id"] == accepted["invitation_id"] == created["invitation_id"] == second.json()["id"]
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
    start = datetime(2026, 10, 15, 12, 0, tzinfo=timezone.utc)
    for n in range(5):
        row = await service.record_activity(
            test_team.id, TeamActivityAction.INVITATION_CREATED, actor_id=test_user.id, email=f"u{n}@example.com",
        )
        # Distinct times, so the order cannot rest on a tie.
        await OxydeTeamActivity.objects.filter(id=row.id).update(created_at=start + timedelta(minutes=n))
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
    """Admins only. The route keys on the team id and loads no team row,
    so everyone else gets the one team_hidden() 403 (CHT-1842)."""

    async def test_a_member_who_is_not_an_admin_gets_the_hidden_teams_403(
        self, client, test_team, test_user2, auth_headers2,
    ):
        await _join(test_team.id, test_user2.id)
        response = await client.get(f"/api/teams/{test_team.id}/activity", headers=auth_headers2)
        assert response.status_code == 403
        assert response.json()["detail"] == TEAM_HIDDEN_DETAIL

    async def test_an_admin_may(self, client, test_team, test_user2, auth_headers2):
        await _join(test_team.id, test_user2.id, TeamRole.ADMIN)
        response = await client.get(f"/api/teams/{test_team.id}/activity", headers=auth_headers2)
        assert response.status_code == 200

    async def test_an_outsider_and_a_missing_team_get_the_same_403(self, client, test_team, auth_headers2):
        outsider = await client.get(f"/api/teams/{test_team.id}/activity", headers=auth_headers2)
        missing = await client.get("/api/teams/no-such-team/activity", headers=auth_headers2)
        assert outsider.status_code == missing.status_code == 403
        assert outsider.json() == missing.json() == {"detail": TEAM_HIDDEN_DETAIL}

    async def test_bad_paging_and_actions_are_422(self, client, test_team, auth_headers):
        for params in ({"limit": 0}, {"limit": 501}, {"skip": -1}, {"action": "MEMBER_REMOVED"}):
            response = await client.get(f"/api/teams/{test_team.id}/activity", headers=auth_headers, params=params)
            assert response.status_code == 422, params


async def test_joining_by_invitation_is_a_member_added_too(
    client, auth_headers, auth_headers2, test_team, test_user2,
):
    """PR #451 review 2: `action=member_added` lists every join."""
    created = await client.post(
        f"/api/teams/{test_team.id}/invitations", headers=auth_headers,
        json={"email": test_user2.email, "role": "member"},
    )
    token = (await OxydeTeamInvitation.objects.get(id=created.json()["id"])).token
    assert (await client.post(f"/api/teams/invitations/{token}/accept", headers=auth_headers2)).status_code == 200
    [added] = await _activity(client, test_team.id, auth_headers, action="member_added")
    assert (added["actor_id"], added["target_user_id"]) == (test_user2.id, test_user2.id)
    assert added["invitation_id"] == created.json()["id"] and added["role"] == "member"


async def test_accepting_while_already_a_member_adds_no_member(test_team, test_user, test_user2):
    service = TeamService()
    await _join(test_team.id, test_user2.id, TeamRole.ADMIN)
    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id, email=test_user2.email, role=TeamRole.MEMBER, token="t-already",
        invited_by_id=test_user.id, expires_at=datetime.now(timezone.utc) + timedelta(days=1),
    )
    await service.accept_invitation(invitation, test_user2)
    rows = await OxydeTeamActivity.objects.filter(team_id=test_team.id).all()
    assert [(r.action, r.role) for r in rows] == [(TeamActivityAction.INVITATION_ACCEPTED, TeamRole.ADMIN)]


class TestRacesLogOnlyWhatHappened:
    """PR #451 review 3: the deletes are conditional, so a stale read
    neither deletes twice nor logs what did not happen."""

    async def test_a_second_removal_of_one_membership_logs_nothing(self, test_team, test_user, test_user2):
        await _join(test_team.id, test_user2.id)
        service = TeamService()
        first = await service.get_member(test_team.id, test_user2.id)
        second = await service.get_member(test_team.id, test_user2.id)
        assert await service.remove_member(first, actor_id=test_user.id) is True
        assert await service.remove_member(second, actor_id=test_user.id) is False
        assert await OxydeTeamActivity.objects.filter(
            team_id=test_team.id, action=TeamActivityAction.MEMBER_REMOVED,
        ).count() == 1

    async def test_a_removal_that_lost_the_race_answers_404(
        self, client, auth_headers, test_team, test_user2, monkeypatch,
    ):
        await _join(test_team.id, test_user2.id)

        async def gone(self, member, *, actor_id, **_):
            return False

        monkeypatch.setattr(TeamService, "remove_member", gone)
        response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers)
        assert response.status_code == 404

    async def test_a_cancel_after_an_accept_neither_deletes_nor_logs(
        self, client, auth_headers, auth_headers2, test_team, test_user, test_user2,
    ):
        created = await client.post(
            f"/api/teams/{test_team.id}/invitations", headers=auth_headers,
            json={"email": test_user2.email, "role": "member"},
        )
        invitation = await OxydeTeamInvitation.objects.get(id=created.json()["id"])  # the admin's stale read
        assert (await client.post(
            f"/api/teams/invitations/{invitation.token}/accept", headers=auth_headers2,
        )).status_code == 200
        assert await TeamService().delete_invitation(invitation, actor_id=test_user.id) is False
        assert await OxydeTeamInvitation.objects.filter(id=invitation.id).count() == 1
        actions = [r["action"] for r in await _activity(client, test_team.id, auth_headers)]
        assert "invitation_cancelled" not in actions

    async def test_a_second_cancel_answers_404_and_logs_once(self, client, auth_headers, test_team, test_user):
        created = await client.post(
            f"/api/teams/{test_team.id}/invitations", headers=auth_headers,
            json={"email": "twice@example.com", "role": "member"},
        )
        invitation = await OxydeTeamInvitation.objects.get(id=created.json()["id"])
        assert await TeamService().delete_invitation(invitation, actor_id=test_user.id) is True
        assert await TeamService().delete_invitation(invitation, actor_id=test_user.id) is False
        url = f"/api/teams/{test_team.id}/invitations/{invitation.id}"
        assert (await client.delete(url, headers=auth_headers)).status_code == 404
        assert len(await _activity(client, test_team.id, auth_headers, action="invitation_cancelled")) == 1


async def test_a_failure_after_the_row_rolls_both_back(
    client, auth_headers, test_team, test_user2, monkeypatch,
):
    """The row and the removal commit together: a failure later in the
    same transaction (here the agent release) undoes both."""
    from app.services.agent_service import AgentService

    await _join(test_team.id, test_user2.id)

    async def boom(*args, **kwargs):
        raise RuntimeError("release failed")

    monkeypatch.setattr(AgentService, "release_member_agents", boom)
    with pytest.raises(RuntimeError):
        await client.delete(f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers)
    assert await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=test_user2.id).count() == 1
    assert await OxydeTeamActivity.objects.filter(team_id=test_team.id).count() == 0


class TestAccountDeletion:
    """PR #451 review 1: deleting an account logs what it takes from each
    team, in the delete's transaction."""

    async def test_logs_each_membership_and_each_pending_invitation_sent(
        self, client, auth_headers, auth_headers2, test_team, test_user, test_user2,
    ):
        from app.enums import InvitationStatus
        from app.oxyde_models.team import OxydeTeam

        other = await OxydeTeam.objects.create(name="Other", key="OTHR")
        await _join(test_team.id, test_user2.id, TeamRole.ADMIN)
        await _join(other.id, test_user2.id)
        sent = await client.post(
            f"/api/teams/{test_team.id}/invitations", headers=auth_headers2,
            json={"email": "pending@example.com", "role": "member"},
        )
        assert sent.status_code == 201, sent.text
        # An accepted one they sent is not a cancellation.
        accepted = await OxydeTeamInvitation.objects.create(
            team_id=test_team.id, email="done@example.com", role=TeamRole.MEMBER, token="t-done",
            invited_by_id=test_user2.id, status=InvitationStatus.ACCEPTED,
            expires_at=datetime.now(timezone.utc) + timedelta(days=1),
        )

        assert (await client.delete("/api/users/me", headers=auth_headers2)).status_code == 204

        rows = await _activity(client, test_team.id, auth_headers)
        removed = [r for r in rows if r["action"] == "member_removed"]
        cancelled = [r for r in rows if r["action"] == "invitation_cancelled"]
        assert [(r["actor_id"], r["target_user_id"], r["role"]) for r in removed] == [
            (test_user2.id, test_user2.id, "admin"),
        ]
        assert [(r["invitation_id"], r["actor_id"]) for r in cancelled] == [(sent.json()["id"], test_user2.id)]
        assert accepted.id not in {r["invitation_id"] for r in rows}
        other_rows = await OxydeTeamActivity.objects.filter(team_id=other.id).all()
        assert [(r.action, r.target_user_id) for r in other_rows] == [
            (TeamActivityAction.MEMBER_REMOVED, test_user2.id),
        ]

    async def test_deleting_the_older_of_two_shared_accounts_is_logged_and_hands_the_address_on(
        self, test_team, test_user,
    ):
        """CHT-1827's remedy (delete the older account at a shared address)
        goes through UserService.delete: its removal is logged in the
        delete's transaction, and the address hand-off runs after it."""
        from app.oxyde_models.user import OxydeUser
        from app.services.user_service import UserService

        from .test_email_verification import _make_legacy_variant, _make_user

        holder = await _make_user("Pair@example.com")
        variant = await _make_legacy_variant("pair@example.com")
        await _join(test_team.id, holder.id)
        await _join(test_team.id, variant.id)

        await UserService().delete(holder)

        rows = await OxydeTeamActivity.objects.filter(team_id=test_team.id).all()
        assert [(r.action, r.actor_id, r.target_user_id) for r in rows] == [
            (TeamActivityAction.MEMBER_REMOVED, holder.id, holder.id),
        ]
        assert (await OxydeUser.objects.get(id=variant.id)).email_folded == "pair@example.com"
        assert await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=variant.id).count() == 1

    async def test_a_refused_deletion_logs_nothing(self, client, auth_headers2, test_team, test_user2, test_issue):
        from app.oxyde_models.issue import OxydeIssue

        await _join(test_team.id, test_user2.id)
        await OxydeIssue.objects.filter(id=test_issue.id).update(creator_id=test_user2.id)
        assert (await client.delete("/api/users/me", headers=auth_headers2)).status_code == 409
        assert await OxydeTeamActivity.objects.filter(team_id=test_team.id).count() == 0
