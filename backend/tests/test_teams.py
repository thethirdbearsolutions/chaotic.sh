"""Tests for team endpoints."""
import pytest
from app.enums import TeamRole, InvitationStatus


@pytest.mark.asyncio
async def test_create_team(client, auth_headers):
    """Test creating a team."""
    response = await client.post(
        "/api/teams",
        headers=auth_headers,
        json={
            "name": "My Team",
            "key": "MYTEAM",
            "description": "A great team",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "My Team"
    assert data["key"] == "MYTEAM"
    assert data["description"] == "A great team"


@pytest.mark.asyncio
async def test_create_team_duplicate_key(client, auth_headers, test_team):
    """Test creating team with existing key."""
    response = await client.post(
        "/api/teams",
        headers=auth_headers,
        json={
            "name": "Another Team",
            "key": test_team.key,
        },
    )
    assert response.status_code == 400
    assert "already exists" in response.json()["detail"]


@pytest.mark.asyncio
async def test_create_team_invalid_key(client, auth_headers):
    """Test creating team with invalid key."""
    response = await client.post(
        "/api/teams",
        headers=auth_headers,
        json={
            "name": "Team",
            "key": "ab",  # lowercase not allowed
        },
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_list_my_teams(client, auth_headers, test_team):
    """Test listing user's teams."""
    response = await client.get("/api/teams", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert any(t["id"] == test_team.id for t in data)


@pytest.mark.asyncio
async def test_get_team(client, auth_headers, test_team):
    """Test getting team by ID."""
    response = await client.get(
        f"/api/teams/{test_team.id}", headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_team.id
    assert data["name"] == test_team.name


@pytest.mark.asyncio
async def test_get_team_not_member(client, auth_headers2, test_team):
    """Test getting team when not a member."""
    response = await client.get(
        f"/api/teams/{test_team.id}", headers=auth_headers2
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_team(client, auth_headers, test_team):
    """Test updating a team."""
    response = await client.patch(
        f"/api/teams/{test_team.id}",
        headers=auth_headers,
        json={"name": "Updated Team", "description": "Updated description"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Team"
    assert data["description"] == "Updated description"


@pytest.mark.asyncio
async def test_update_team_not_admin(client, auth_headers2, test_team, db, test_user2):
    """Test updating team when not admin."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.patch(
        f"/api/teams/{test_team.id}",
        headers=auth_headers2,
        json={"name": "Unauthorized Update"},
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_delete_team(client, auth_headers, db):
    """Test deleting a team."""
    # Create a team to delete
    from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
    from app.enums import TeamRole

    team = await OxydeTeam.objects.create(name="Delete Me", key="DELETE")

    # Get user ID from token
    response = await client.get("/api/auth/me", headers=auth_headers)
    user_id = response.json()["id"]

    member = await OxydeTeamMember.objects.create(team_id=team.id, user_id=user_id, role=TeamRole.OWNER)

    response = await client.delete(f"/api/teams/{team.id}", headers=auth_headers)
    assert response.status_code == 204


@pytest.mark.asyncio
async def test_list_team_members(client, auth_headers, test_team, test_user):
    """Test listing team members."""
    response = await client.get(
        f"/api/teams/{test_team.id}/members", headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert any(m["user_id"] == test_user.id for m in data)


@pytest.mark.asyncio
async def test_create_invitation(client, auth_headers, test_team):
    """Test creating a team invitation."""
    response = await client.post(
        f"/api/teams/{test_team.id}/invitations",
        headers=auth_headers,
        json={"email": "invited@example.com", "role": "member"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "invited@example.com"
    assert data["role"] == "member"
    assert data["status"] == "pending"


@pytest.mark.asyncio
async def test_create_invitation_sends_email_with_accept_link(client, auth_headers, test_team, test_user):
    """CHT-1251: creating an invitation dispatches the accept-link email
    (the token itself is otherwise undeliverable -- TeamInvitationResponse
    deliberately omits it).
    """
    from unittest.mock import patch

    with patch("app.api.teams.EmailService.send_invitation_email") as mock_send:
        response = await client.post(
            f"/api/teams/{test_team.id}/invitations",
            headers=auth_headers,
            json={"email": "invited@example.com", "role": "admin"},
        )
    assert response.status_code == 201

    mock_send.assert_called_once()
    _, kwargs = mock_send.call_args
    assert mock_send.call_args[0][0] == "invited@example.com"
    assert kwargs["team_name"] == test_team.name
    assert kwargs["role"] == "admin"
    assert kwargs["invited_by_name"] == test_user.name
    assert "/invite/" in kwargs["accept_url"]


@pytest.mark.asyncio
async def test_create_invitation_without_smtp_returns_accept_url_once(client, auth_headers, test_team, caplog):
    """CHT-1794: with no SMTP the email goes nowhere, so the create answer
    carries the accept link for the admin to hand over. It is the real,
    working link; it is not cached, not in the list, and not logged."""
    import logging
    from unittest.mock import patch
    from app.config import get_settings
    from app.oxyde_models.team import OxydeTeamInvitation
    from app.services.email_service import drain

    caplog.set_level(logging.DEBUG)
    with patch("app.api.teams.EmailService.is_configured", return_value=False):
        response = await client.post(
            f"/api/teams/{test_team.id}/invitations",
            headers=auth_headers,
            json={"email": "invited@example.com", "role": "member"},
        )
    assert response.status_code == 201, response.text
    # The skipped email logs from a background task: let it run first,
    # and check it did, so the no-token assertion cannot go vacuous.
    await drain()
    created_log = [r.getMessage() for r in caplog.records]
    data = response.json()
    row = await OxydeTeamInvitation.objects.get(id=data["id"])
    assert any("SMTP not configured; skipping email" in line for line in created_log), created_log
    # Nothing the create logged (the skipped email included) holds it.
    assert not [line for line in created_log if row.token in line]
    base = get_settings().app_base_url.rstrip("/")
    assert data["accept_url"] == f"{base}/invite/{row.token}"
    assert response.headers["cache-control"] == "no-store"
    assert "token" not in data

    # The link works: its token opens the public preview.
    preview = await client.get(f"/api/teams/invitations/{row.token}")
    assert preview.status_code == 200, preview.text

    listed = await client.get(f"/api/teams/{test_team.id}/invitations", headers=auth_headers)
    assert listed.status_code == 200
    assert listed.json() and all("accept_url" not in i and "token" not in i for i in listed.json())
    assert row.token not in listed.text


@pytest.mark.asyncio
async def test_create_invitation_with_smtp_also_returns_accept_url(client, auth_headers, test_team, caplog):
    """CHT-1824: with SMTP the email is only queued (it is sent after the
    answer), so the admin gets the link as well, in case delivery fails,
    and is told the email was queued. Same handling as without SMTP:
    not cached, not sent on as a Referer, not logged. The real send path
    runs and fails, as on a server whose SMTP is broken."""
    import logging
    from unittest.mock import patch
    from app.oxyde_models.team import OxydeTeamInvitation
    from app.services.email_service import drain

    caplog.set_level(logging.DEBUG)
    with patch("app.api.teams.EmailService.is_configured", return_value=True), \
            patch("app.services.email_service.EmailService.is_configured", return_value=True), \
            patch("app.services.email_service.EmailService._send_sync",
                  side_effect=OSError("connection refused")) as send_sync:
        response = await client.post(
            f"/api/teams/{test_team.id}/invitations",
            headers=auth_headers,
            json={"email": "invited@example.com", "role": "member"},
        )
        await drain()
    assert response.status_code == 201, response.text
    data = response.json()
    row = await OxydeTeamInvitation.objects.get(id=data["id"])
    # The send ran and failed loudly, so the log check below is not vacuous.
    send_sync.assert_called_once()
    assert row.token in send_sync.call_args.args[0].get_content()
    assert "SMTP send failed" in caplog.text
    assert data["accept_url"].endswith(f"/invite/{row.token}")
    assert data["email_queued"] is True
    assert response.headers["cache-control"] == "no-store"
    assert response.headers["referrer-policy"] == "no-referrer"
    assert row.token not in caplog.text


@pytest.mark.asyncio
async def test_create_invitation_without_smtp_is_not_queued(client, auth_headers, test_team):
    """CHT-1824: email_queued is false when the server has no SMTP, so a
    client can say the link is the only way it travels."""
    from unittest.mock import patch

    with patch("app.api.teams.EmailService.is_configured", return_value=False):
        response = await client.post(
            f"/api/teams/{test_team.id}/invitations",
            headers=auth_headers,
            json={"email": "invited@example.com", "role": "member"},
        )
    assert response.status_code == 201, response.text
    assert response.json()["email_queued"] is False
    assert response.json()["accept_url"]


@pytest.mark.asyncio
async def test_create_invitation_succeeds_even_if_email_send_raises(client, auth_headers, test_team):
    """CHT-1251 fail-soft/fail-loud doctrine: EmailService.send itself never
    raises (see test_email_service.py), but even if the dispatch call site
    somehow did, the invitation create must not 500 -- the mutating path
    doesn't depend on the email succeeding.
    """
    from unittest.mock import patch

    # SMTP configured, so email_queued=False below proves the raise path,
    # not merely the missing SMTP (review of #438).
    with patch("app.api.teams.EmailService.is_configured", return_value=True), patch(
        "app.api.teams.EmailService.send_invitation_email",
        side_effect=RuntimeError("smtp blew up"),
    ):
        response = await client.post(
            f"/api/teams/{test_team.id}/invitations",
            headers=auth_headers,
            json={"email": "invited@example.com", "role": "member"},
        )
    assert response.status_code == 201
    # Not queued, but the admin still has the link (CHT-1824).
    assert response.json()["email_queued"] is False
    assert response.json()["accept_url"]


@pytest.mark.asyncio
async def test_list_team_invitations(client, auth_headers, test_team, db, test_user):
    """Test listing team invitations."""
    # Create an invitation
    from app.oxyde_models.team import OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email="pending@example.com",
        role=TeamRole.MEMBER,
        token=secrets.token_urlsafe(32),
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )

    response = await client.get(
        f"/api/teams/{test_team.id}/invitations", headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1


@pytest.mark.asyncio
async def test_accept_invitation(client, auth_headers2, test_team, db, test_user):
    """Test accepting a team invitation."""
    from app.oxyde_models.team import OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    token = secrets.token_urlsafe(32)
    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email="test2@example.com",  # Matches test_user2
        role=TeamRole.MEMBER,
        token=token,
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )

    response = await client.post(
        f"/api/teams/invitations/{token}/accept", headers=auth_headers2
    )
    assert response.status_code == 200
    data = response.json()
    assert data["role"] == "member"


@pytest.mark.asyncio
async def test_remove_member(client, auth_headers, test_team, db, test_user2):
    """Test removing a team member."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.delete(
        f"/api/teams/{test_team.id}/members/{test_user2.id}",
        headers=auth_headers,
    )
    assert response.status_code == 204


@pytest.mark.asyncio
async def test_get_team_members_pagination(client, auth_headers, test_team):
    """Test listing team members with pagination."""
    response = await client.get(
        f"/api/teams/{test_team.id}/members?skip=0&limit=10",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)


@pytest.mark.asyncio
async def test_update_team_partial(client, auth_headers, test_team):
    """Test partial team update."""
    response = await client.patch(
        f"/api/teams/{test_team.id}",
        headers=auth_headers,
        json={
            "description": "Updated description only",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["description"] == "Updated description only"


@pytest.mark.asyncio
async def test_remove_member_as_admin(client, auth_headers, test_team, test_user2, db):
    """Test removing a team member as admin."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.delete(
        f"/api/teams/{test_team.id}/members/{test_user2.id}",
        headers=auth_headers,
    )
    assert response.status_code == 204


# ============== Additional edge case tests ==============


@pytest.mark.asyncio
async def test_get_team_not_found(client, auth_headers):
    """Test getting team that doesn't exist."""
    response = await client.get("/api/teams/00000000-0000-0000-0000-000000000000", headers=auth_headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_team_not_found(client, auth_headers):
    """Test updating team that doesn't exist."""
    response = await client.patch(
        "/api/teams/00000000-0000-0000-0000-000000000000",
        headers=auth_headers,
        json={"name": "Updated"},
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_delete_team_not_owner(client, auth_headers2, test_team, db, test_user2):
    """Test deleting team when not owner (only admin)."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as admin (not owner)
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.ADMIN)

    response = await client.delete(f"/api/teams/{test_team.id}", headers=auth_headers2)
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_delete_team_not_found(client, auth_headers):
    """Test deleting team that doesn't exist."""
    response = await client.delete("/api/teams/00000000-0000-0000-0000-000000000000", headers=auth_headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_list_team_members_not_member(client, auth_headers2, test_team):
    """Test listing team members when not a member."""
    response = await client.get(
        f"/api/teams/{test_team.id}/members", headers=auth_headers2
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_update_member_role(client, auth_headers, test_team, test_user2, db):
    """CHT-1223: role is sent as a JSON body -- the only shape the server
    accepts now (query-string ?role= was removed; it never worked for
    the CLI, the only shipped client, so there was nothing to keep
    backward compatible)."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.patch(
        f"/api/teams/{test_team.id}/members/{test_user2.id}",
        json={"role": "admin"},
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["role"] == "admin"


@pytest.mark.asyncio
async def test_update_member_role_missing_body(client, auth_headers, test_team, test_user2, db):
    """No body at all -> 422, not a 500/KeyError."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.patch(
        f"/api/teams/{test_team.id}/members/{test_user2.id}",
        headers=auth_headers,
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_update_member_role_query_param_no_longer_works(client, auth_headers, test_team, test_user2, db):
    """CHT-1223: the old ?role= query-string shape is gone (breaking,
    sanctioned -- no query-string caller ever existed for this to break)."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.patch(
        f"/api/teams/{test_team.id}/members/{test_user2.id}?role=admin",
        headers=auth_headers,
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_update_member_role_not_admin(client, auth_headers2, test_team, test_user2, db):
    """Test updating member role when not admin."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.patch(
        f"/api/teams/{test_team.id}/members/{test_user2.id}",
        json={"role": "admin"},
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_update_member_role_member_not_found(client, auth_headers, test_team):
    """Test updating role of member that doesn't exist."""
    response = await client.patch(
        f"/api/teams/{test_team.id}/members/00000000-0000-0000-0000-000000000000",
        json={"role": "admin"},
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_owner_role_fails(client, auth_headers, test_team, test_user):
    """Test that updating owner's role fails."""
    response = await client.patch(
        f"/api/teams/{test_team.id}/members/{test_user.id}",
        json={"role": "member"},
        headers=auth_headers,
    )
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_remove_member_not_found(client, auth_headers, test_team):
    """Test removing member that doesn't exist."""
    response = await client.delete(
        f"/api/teams/{test_team.id}/members/00000000-0000-0000-0000-000000000000",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_remove_owner_fails(client, auth_headers, test_team, test_user):
    """Test that removing owner fails."""
    response = await client.delete(
        f"/api/teams/{test_team.id}/members/{test_user.id}",
        headers=auth_headers,
    )
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_remove_member_not_admin(client, auth_headers2, test_team, test_user, db, test_user2):
    """Test removing member when not admin (and not self)."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    # user2 trying to remove test_user (the owner) - should fail
    response = await client.delete(
        f"/api/teams/{test_team.id}/members/{test_user.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_remove_self_as_member(client, auth_headers2, test_team, db, test_user2):
    """Test that a member can remove themselves."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    # user2 removing themselves
    response = await client.delete(
        f"/api/teams/{test_team.id}/members/{test_user2.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 204


@pytest.mark.asyncio
async def test_create_invitation_team_not_found(client, auth_headers2, test_team):
    """A missing team and an existing one the caller is not in get the
    same answer (CHT-1803): the admin check runs from the team id alone,
    before the team is loaded, so a non-member cannot probe team ids."""
    body = {"email": "test@example.com", "role": "member"}
    missing = await client.post(
        "/api/teams/00000000-0000-0000-0000-000000000000/invitations",
        headers=auth_headers2,
        json=body,
    )
    existing = await client.post(f"/api/teams/{test_team.id}/invitations", headers=auth_headers2, json=body)
    assert missing.status_code == existing.status_code == 403
    assert missing.json() == existing.json() == {"detail": "Only admins can invite members"}


@pytest.mark.asyncio
async def test_create_invitation_non_admin_with_a_pending_invitation_gets_403(
    client, auth_headers, auth_headers2, test_team, test_user2,
):
    """Review of #438: the admin check runs before the pending check, so a
    member who is not an admin gets the plain 403, never the 409 that
    names an invitation id (CHT-1824)."""
    from unittest.mock import patch
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
    body = {"email": "pending@example.com", "role": "member"}
    with patch("app.api.teams.EmailService.send_invitation_email"):
        first = await client.post(f"/api/teams/{test_team.id}/invitations", headers=auth_headers, json=body)
        assert first.status_code == 201, first.text
        again = await client.post(f"/api/teams/{test_team.id}/invitations", headers=auth_headers2, json=body)
    assert again.status_code == 403
    assert again.json() == {"detail": "Only admins can invite members"}


@pytest.mark.asyncio
async def test_create_invitation_not_admin(client, auth_headers2, test_team, db, test_user2):
    """Test creating invitation when not admin."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.post(
        f"/api/teams/{test_team.id}/invitations",
        headers=auth_headers2,
        json={"email": "new@example.com", "role": "member"},
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_create_invitation_already_member(client, auth_headers, test_team, test_user):
    """Test creating invitation for email that's already a member."""
    response = await client.post(
        f"/api/teams/{test_team.id}/invitations",
        headers=auth_headers,
        json={"email": test_user.email, "role": "member"},
    )
    assert response.status_code == 400
    assert "already a team member" in response.json()["detail"]


@pytest.mark.asyncio
async def test_list_invitations_not_admin(client, auth_headers2, test_team, db, test_user2):
    """Test listing invitations when not admin."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.get(
        f"/api/teams/{test_team.id}/invitations",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_accept_invitation_not_found(client, auth_headers):
    """Test accepting invitation that doesn't exist."""
    response = await client.post(
        "/api/teams/invitations/aaaa_bbbb_cccc_dddd_eeee_ffff_0000/accept",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_accept_invitation_wrong_email(client, auth_headers, test_team, db, test_user):
    """Test accepting invitation intended for different email."""
    from app.oxyde_models.team import OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    token = secrets.token_urlsafe(32)
    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email="other@example.com",  # Different from test_user
        role=TeamRole.MEMBER,
        token=token,
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )

    response = await client.post(
        f"/api/teams/invitations/{token}/accept",
        headers=auth_headers,
    )
    assert response.status_code == 403
    assert "different email" in response.json()["detail"]


@pytest.mark.asyncio
async def test_accept_invitation_expired(client, auth_headers, test_team, db, test_user):
    """Test accepting expired invitation."""
    from app.oxyde_models.team import OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    token = secrets.token_urlsafe(32)
    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email=test_user.email,
        role=TeamRole.MEMBER,
        token=token,
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) - timedelta(days=1),  # Expired
    )

    response = await client.post(
        f"/api/teams/invitations/{token}/accept",
        headers=auth_headers,
    )
    # CHT-1265 review F10: expired looks like every other invalid
    # invitation (one 404), whoever asks.
    assert response.status_code == 404
    assert response.json()["detail"] == "This invitation is no longer valid"


@pytest.mark.asyncio
async def test_delete_invitation(client, auth_headers, test_team, db, test_user):
    """Test deleting an invitation."""
    from app.oxyde_models.team import OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    token = secrets.token_urlsafe(32)
    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email="delete@example.com",
        role=TeamRole.MEMBER,
        token=token,
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )

    response = await client.delete(
        f"/api/teams/{test_team.id}/invitations/{invitation.id}",
        headers=auth_headers,
    )
    assert response.status_code == 204


@pytest.mark.asyncio
async def test_delete_invitation_not_admin(client, auth_headers2, test_team, db, test_user, test_user2):
    """Test deleting invitation when not admin."""
    from app.oxyde_models.team import OxydeTeamMember, OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    token = secrets.token_urlsafe(32)
    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email="test@example.com",
        role=TeamRole.MEMBER,
        token=token,
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )

    response = await client.delete(
        f"/api/teams/{test_team.id}/invitations/{invitation.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_delete_invitation_not_found(client, auth_headers, test_team):
    """Test deleting invitation that doesn't exist."""
    response = await client.delete(
        f"/api/teams/{test_team.id}/invitations/00000000-0000-0000-0000-000000000000",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_create_invitation_for_existing_non_member(client, auth_headers, test_team, test_user2):
    """Test inviting an existing user who is not yet a team member succeeds.

    Covers teams.py branch 251->257: existing_user exists but existing_member is None,
    so the code falls through to create the invitation.
    """
    response = await client.post(
        f"/api/teams/{test_team.id}/invitations",
        headers=auth_headers,
        json={"email": test_user2.email, "role": "member"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == test_user2.email
    assert data["role"] == "member"
    assert data["team_id"] == test_team.id


# --- Service-level coverage tests (CHT-922) ---

@pytest.mark.asyncio
async def test_team_service_add_member(db, test_team, test_user2):
    """Test TeamService.add_member directly (covers team_service.py L109-117)."""
    from app.services.team_service import TeamService
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    service = TeamService()
    member = await service.add_member(test_team, test_user2, TeamRole.MEMBER)

    assert isinstance(member, OxydeTeamMember)
    assert member.team_id == test_team.id
    assert member.user_id == test_user2.id
    assert member.role == TeamRole.MEMBER


@pytest.mark.asyncio
async def test_team_service_decline_invitation(db, test_team, test_user):
    """Test TeamService.decline_invitation directly (covers team_service.py L186-187)."""
    from app.services.team_service import TeamService
    from app.oxyde_models.team import OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    service = TeamService()

    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email="decline@example.com",
        role=TeamRole.MEMBER,
        token=secrets.token_urlsafe(32),
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )

    await service.decline_invitation(invitation)
    assert invitation.status == InvitationStatus.DECLINED


@pytest.mark.asyncio
async def test_add_member_twice_keeps_the_existing_membership(db, test_team, test_user2):
    """One membership per user per team (CHT-1791): a second add_member
    for the same user hits the unique index and returns the membership
    they already have, role included, instead of raising."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.services.team_service import TeamService

    service = TeamService()
    first = await service.add_member(test_team, test_user2, TeamRole.ADMIN)
    second = await service.add_member(test_team, test_user2, TeamRole.MEMBER)

    assert second.id == first.id
    assert second.role == TeamRole.ADMIN
    rows = await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=test_user2.id).all()
    assert len(rows) == 1


@pytest.mark.asyncio
async def test_the_database_rejects_a_second_membership(db, test_team, test_user):
    """The unique index itself (migration 0033), below the service."""
    from oxyde import IntegrityError
    from app.oxyde_models.team import OxydeTeamMember

    with pytest.raises(IntegrityError):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user.id, role=TeamRole.MEMBER)


@pytest.mark.asyncio
async def test_accept_invitation_losing_an_insert_race_returns_the_winner(
    db, test_team, test_user, test_user2, monkeypatch
):
    """A membership written between accept_invitation's check and its
    insert (CHT-1791): the insert hits the unique index, and the accept
    returns that membership rather than a 500."""
    import secrets
    from datetime import datetime, timedelta, timezone
    from app.oxyde_models.team import OxydeTeamInvitation, OxydeTeamMember
    from app.services.team_service import TeamService

    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email=test_user2.email,
        role=TeamRole.ADMIN,
        token=secrets.token_urlsafe(32),
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )
    winner = await OxydeTeamMember.objects.create(
        team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER
    )
    service = TeamService()
    real_get_member = service.get_member
    calls = []

    async def misses_once(team_id, user_id):
        calls.append(user_id)
        if len(calls) == 1:
            return None  # the check ran before the other writer
        return await real_get_member(team_id, user_id)

    monkeypatch.setattr(service, "get_member", misses_once)

    member = await service.accept_invitation(invitation, test_user2)

    assert member.id == winner.id
    assert member.role == TeamRole.MEMBER
    assert len(calls) == 2
    rows = await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=test_user2.id).all()
    assert len(rows) == 1
    await invitation.refresh()
    assert invitation.status == InvitationStatus.ACCEPTED
