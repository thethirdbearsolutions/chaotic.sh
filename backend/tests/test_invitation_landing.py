"""The /invite/<token> landing page's backend (CHT-1265), the accept
hardening it needed (CHT-1788) and the token's log redaction (CHT-1601).

GET /api/teams/invitations/{token} is unauthenticated: the emailed link
is opened before anyone signs in. Holding the token is the credential,
so the preview shows only what the page needs and answers every
invitation that can't be accepted with the same 404.
"""
import logging
import secrets
from datetime import datetime, timedelta, timezone
from unittest.mock import patch

import pytest

from app.api.teams import INVITATION_GONE, INVITATION_LOOKUPS_PER_MINUTE, mask_email
from app.enums import InvitationStatus, TeamRole
from app.log_redaction import REDACTED, RequestLineRedactionFilter, redact_request_target
from app.oxyde_models.team import OxydeTeamInvitation, OxydeTeamMember

PREVIEW_FIELDS = {"team_name", "role", "invited_by_name", "email_hint", "expires_at"}


async def _invite(team, inviter, *, email="test2@example.com", role=TeamRole.MEMBER,
                  status=InvitationStatus.PENDING, expires_in=timedelta(days=7)):
    token = secrets.token_urlsafe(32)
    invitation = await OxydeTeamInvitation.objects.create(
        team_id=team.id,
        email=email,
        role=role,
        token=token,
        invited_by_id=inviter.id,
        status=status,
        expires_at=datetime.now(timezone.utc) + expires_in,
    )
    return token, invitation


async def _memberships(team_id, user_id):
    return await OxydeTeamMember.objects.filter(team_id=team_id, user_id=user_id).all()


class TestPreview:
    async def test_shows_what_the_page_needs_without_signing_in(self, client, test_team, test_user):
        token, invitation = await _invite(test_team, test_user, role=TeamRole.ADMIN)

        response = await client.get(f"/api/teams/invitations/{token}")

        assert response.status_code == 200, response.text
        body = response.json()
        assert set(body) == PREVIEW_FIELDS
        assert body["team_name"] == "Test Team"
        assert body["role"] == "admin"
        assert body["invited_by_name"] == "Test User"
        assert body["email_hint"] == "t***@example.com"

    async def test_reveals_no_ids_token_or_full_address(self, client, test_team, test_user):
        token, invitation = await _invite(test_team, test_user)

        text = (await client.get(f"/api/teams/invitations/{token}")).text

        for secret in (token, invitation.id, test_team.id, test_user.id, "test2@example.com", test_user.email):
            assert secret not in text

    async def test_is_never_cached_and_sends_no_referrer(self, client, test_team, test_user):
        token, _ = await _invite(test_team, test_user)

        response = await client.get(f"/api/teams/invitations/{token}")

        assert response.headers["cache-control"] == "no-store"
        assert response.headers["referrer-policy"] == "no-referrer"

    async def test_a_signed_in_viewer_gets_the_same_preview(self, client, auth_headers2, test_team, test_user):
        token, _ = await _invite(test_team, test_user)

        anonymous = await client.get(f"/api/teams/invitations/{token}")
        signed_in = await client.get(f"/api/teams/invitations/{token}", headers=auth_headers2)

        assert signed_in.json() == anonymous.json()

    async def test_inviter_gone_is_shown_as_unknown(self, client, test_team, test_user):
        token, invitation = await _invite(test_team, test_user)
        await OxydeTeamInvitation.objects.filter(id=invitation.id).update(invited_by_id=None)

        body = (await client.get(f"/api/teams/invitations/{token}")).json()

        assert body["invited_by_name"] is None

    @pytest.mark.parametrize("state", ["unknown", "expired", "accepted", "declined", "revoked"])
    async def test_an_invitation_that_cannot_be_accepted_is_one_plain_404(self, client, test_team, test_user, state):
        """Expired, used and revoked all look like a token that never
        existed: nothing tells the holder which, or anything about it."""
        token, invitation = await _invite(
            test_team, test_user,
            status={"accepted": InvitationStatus.ACCEPTED, "declined": InvitationStatus.DECLINED}.get(
                state, InvitationStatus.PENDING),
            expires_in=timedelta(days=-1) if state == "expired" else timedelta(days=7),
        )
        if state == "revoked":
            await invitation.delete()
        if state == "unknown":
            token = secrets.token_urlsafe(32)

        response = await client.get(f"/api/teams/invitations/{token}")

        assert response.status_code == 404
        assert response.json() == {"detail": INVITATION_GONE}
        assert "Test Team" not in response.text

    async def test_lookups_are_rate_limited_per_address(self, client):
        token = secrets.token_urlsafe(32)
        for _ in range(INVITATION_LOOKUPS_PER_MINUTE):
            assert (await client.get(f"/api/teams/invitations/{token}")).status_code == 404

        response = await client.get(f"/api/teams/invitations/{token}")

        assert response.status_code == 429


class TestMaskEmail:
    @pytest.mark.parametrize("email, hint", [
        ("alice@example.com", "a***@example.com"),
        ("a@example.com", "a***@example.com"),
        ("Bob.Smith@Mail.Example.org", "B***@Mail.Example.org"),
        ("no-at-sign", "***"),
        ("@example.com", "***"),
        ("alice@", "***"),
        ("", "***"),
    ])
    def test_masks(self, email, hint):
        assert mask_email(email) == hint


class TestAccept:
    async def test_the_emailed_link_previews_and_accepts(self, client, auth_headers, auth_headers2, test_team, test_user2):
        """The whole path the page drives: invite, open the link, accept."""
        with patch("app.api.teams.EmailService.send_invitation_email") as send:
            created = await client.post(
                f"/api/teams/{test_team.id}/invitations",
                json={"email": test_user2.email, "role": "member"},
                headers=auth_headers,
            )
        assert created.status_code == 201
        url = send.call_args.kwargs["accept_url"]
        token = url.rsplit("/invite/", 1)[1]

        assert (await client.get(f"/api/teams/invitations/{token}")).status_code == 200
        accepted = await client.post(f"/api/teams/invitations/{token}/accept", headers=auth_headers2)

        assert accepted.status_code == 200, accepted.text
        assert accepted.json()["team_id"] == test_team.id
        assert (await client.get(f"/api/teams/invitations/{token}")).status_code == 404

    async def test_a_used_invitation_cannot_be_accepted_again(self, client, auth_headers2, test_team, test_user, test_user2):
        """CHT-1788: a replay used to add a second membership row."""
        token, _ = await _invite(test_team, test_user)
        assert (await client.post(f"/api/teams/invitations/{token}/accept", headers=auth_headers2)).status_code == 200

        again = await client.post(f"/api/teams/invitations/{token}/accept", headers=auth_headers2)

        assert again.status_code == 404
        assert len(await _memberships(test_team.id, test_user2.id)) == 1

    async def test_a_declined_invitation_cannot_be_accepted(self, client, auth_headers2, test_team, test_user, test_user2):
        token, _ = await _invite(test_team, test_user, status=InvitationStatus.DECLINED)

        response = await client.post(f"/api/teams/invitations/{token}/accept", headers=auth_headers2)

        assert response.status_code == 404
        assert await _memberships(test_team.id, test_user2.id) == []

    async def test_an_existing_member_keeps_their_membership(self, client, auth_headers2, test_team, test_user, test_user2):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.ADMIN)
        token, invitation = await _invite(test_team, test_user, role=TeamRole.MEMBER)

        response = await client.post(f"/api/teams/invitations/{token}/accept", headers=auth_headers2)

        assert response.status_code == 200
        assert response.json()["role"] == "admin"
        assert len(await _memberships(test_team.id, test_user2.id)) == 1
        stored = await OxydeTeamInvitation.objects.get(id=invitation.id)
        assert stored.status == InvitationStatus.ACCEPTED

    async def test_a_lost_race_adds_no_member(self, test_team, test_user, test_user2):
        """Two accepts of one token: the second claim finds it no longer
        pending and adds nothing."""
        from app.services.team_service import TeamService

        _, invitation = await _invite(test_team, test_user)
        service = TeamService()
        first = await service.accept_invitation(invitation, test_user2)
        second = await service.accept_invitation(invitation, test_user2)

        assert first is not None and second is None
        assert len(await _memberships(test_team.id, test_user2.id)) == 1

    async def test_a_different_account_is_refused_and_leaves_it_pending(self, client, auth_headers, test_team, test_user):
        """The page tells a mismatched account to switch; the invitation
        must still work for the right one afterwards."""
        token, invitation = await _invite(test_team, test_user, email="someone@example.com")

        response = await client.post(f"/api/teams/invitations/{token}/accept", headers=auth_headers)

        assert response.status_code == 403
        assert "different email" in response.json()["detail"]
        assert (await OxydeTeamInvitation.objects.get(id=invitation.id)).status == InvitationStatus.PENDING
        assert (await client.get(f"/api/teams/invitations/{token}")).status_code == 200


class TestTokenStaysOutOfLogs:
    """CHT-1601: the token is a path segment, so the request-log filter
    redacts the segment after /invite/ and /invitations/."""

    @pytest.mark.parametrize("template", [
        "/invite/{t}",
        "/INVITE/{t}",
        "/api/teams/invitations/{t}",
        "/api/teams/invitations/{t}/accept",
        "/api/teams/invitations/{t}/accept?x=1",
    ])
    def test_paths_carrying_the_token_are_redacted(self, template):
        token = secrets.token_urlsafe(32)

        logged = redact_request_target(template.format(t=token))

        assert token not in logged
        assert f"/{REDACTED}" in logged

    def test_accept_keeps_its_shape_in_the_log(self):
        assert redact_request_target("/api/teams/invitations/abc/accept") == (
            f"/api/teams/invitations/{REDACTED}/accept"
        )

    def test_other_paths_are_untouched(self):
        for path in ("/api/teams/t1/invitations", "/issues", "/api/teams/t1/members"):
            assert redact_request_target(path) == path

    def test_the_access_log_line_is_redacted(self):
        token = secrets.token_urlsafe(32)
        record = logging.LogRecord(
            "uvicorn.access", logging.INFO, __file__, 0, '%s - "%s %s HTTP/%s" %d',
            ("127.0.0.1:1", "GET", f"/invite/{token}", "1.1", 200), None,
        )

        RequestLineRedactionFilter().filter(record)

        assert token not in record.getMessage()

    async def test_an_unhandled_error_logs_the_path_redacted(self, caplog):
        """The 500 handler logs the path itself; called directly, as
        tests/test_infrastructure.py does (the test client re-raises)."""
        from starlette.requests import Request
        from app.main import unhandled_exception_handler

        token = secrets.token_urlsafe(32)
        request = Request({"type": "http", "method": "GET", "path": f"/api/teams/invitations/{token}", "headers": []})

        try:
            raise RuntimeError("boom")
        except RuntimeError as exc:
            response = await unhandled_exception_handler(request, exc)

        assert response.status_code == 500
        assert "Unhandled exception on GET /api/teams/invitations/" in caplog.text
        assert token not in caplog.text
