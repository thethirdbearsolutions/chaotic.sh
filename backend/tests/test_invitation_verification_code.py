"""A team admin issues a code that lets the account at a pending
invitation's address accept that invitation, to hand over by hand when
SMTP is configured but failing (CHT-1828).

The threat model is CHT-1790's: the invitation token is a bearer
credential, and signup takes any address on trust. The admin-issued
code must not reopen that hole. It is bound to one account and one
invitation, and it never verifies the address: anyone can be the admin
of a team of their own (PR #446 review 1).
"""
import logging
from datetime import datetime, timedelta, timezone

import pytest

from app.enums import InvitationStatus, TeamRole
from app.oxyde_models.email_verification import OxydeEmailVerificationCode
from app.oxyde_models.team import OxydeTeam, OxydeTeamInvitation, OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.services import email_verification_service as evs
from app.utils.security import create_access_token

from app.config import get_settings
from app.services.email_service import EmailService

from .test_email_verification import (
    CONFIRM,
    REQUEST,
    Outbox,
    _accept,
    _age_codes,
    _codes,
    _make_legacy_variant,
)
from .test_email_verification import _invite as _invite_now

INVITEE = "invitee@example.com"


# The fixtures of test_email_verification, defined here rather than
# imported (an imported fixture is an unused name that a test argument
# redefines, F811).
@pytest.fixture(autouse=True)
def _fresh_settings():
    get_settings.cache_clear()
    yield
    get_settings.cache_clear()


@pytest.fixture
def no_smtp(monkeypatch):
    monkeypatch.delenv("SMTP_HOST", raising=False)
    get_settings.cache_clear()


@pytest.fixture
def outbox(monkeypatch):
    monkeypatch.setenv("SMTP_HOST", "smtp.example.com")
    get_settings.cache_clear()
    box = Outbox()

    async def send(self, to, subject, body):
        return await box.send(self, to, subject, body)

    monkeypatch.setattr(EmailService, "send", send)
    return box


async def _invite(team_id: str, inviter_id: str, email: str, *, ago: timedelta = timedelta(hours=3)) -> str:
    """An invitation created ``ago`` (three hours back by default), so the
    account's request in ``_asked`` (two hours back) comes after it, as a
    stuck invitee's does (second review, 1)."""
    token = await _invite_now(team_id, inviter_id, email)
    await OxydeTeamInvitation.objects.filter(token=token).update(
        created_at=datetime.now(timezone.utc) - ago,
    )
    return token


def _headers(user_id: str) -> dict:
    return {"Authorization": f"Bearer {create_access_token(data={'sub': user_id})}"}


async def _asked(user_id: str, email: str, ago: timedelta = timedelta(hours=2)) -> None:
    """The account asked for a mailed code that never went out, ``ago``:
    what a stuck invitee has done (PR #446 review F1). Two hours back by
    default, clear of the one-a-minute and five-an-hour mailing limits."""
    when = datetime.now(timezone.utc) - ago
    await OxydeEmailVerificationCode.objects.create(
        email_hash=evs.hash_email(email), user_id=user_id, code_hash="never-sent", armed=False,
        expires_at=when + evs.CODE_TTL, attempts=0, created_at=when,
    )


async def _signup(client, email=INVITEE, name="The Invitee", *, asked=True) -> tuple[str, dict]:
    response = await client.post("/api/auth/signup", json={
        "email": email, "password": "password123", "name": name,
    })
    assert response.status_code == 201, response.text
    user_id = response.json()["id"]
    if asked:
        await _asked(user_id, email)
    return user_id, _headers(user_id)


async def _invitation_id(token: str) -> str:
    return (await OxydeTeamInvitation.objects.get(token=token)).id


def _url(team_id: str, invitation_id: str) -> str:
    return f"/api/teams/{team_id}/invitations/{invitation_id}/verification-code"


async def _issue(client, team_id, invitation_id, headers):
    return await client.post(_url(team_id, invitation_id), headers=headers)


async def _accept_with(client, token, headers, code):
    return await client.post(f"/api/teams/invitations/{token}/accept", headers=headers, json={"code": code})


async def _verified_at(user_id: str):
    return (await OxydeUser.objects.get(id=user_id)).email_verified_at


def _wrong(code: str) -> str:
    return f"{(int(code) + 1) % 10 ** 6:06d}"


@pytest.fixture
async def pending(test_team, test_user):
    """A pending invitation to INVITEE from test_team's owner: (token, id)."""
    token = await _invite(test_team.id, test_user.id, INVITEE)
    return token, await _invitation_id(token)


class TestIssue:
    async def test_the_stuck_invitee_joins_with_the_admin_code(
        self, client, test_team, auth_headers, pending, outbox,
    ):
        token, inv_id = pending
        user_id, invitee = await _signup(client, asked=False)
        # The mailed code fails, which is the bug; the request is on record.
        outbox.fail = True
        assert (await client.post(REQUEST, headers=invitee)).status_code == 502
        assert (await _accept(client, token, invitee)).json()["detail"]["error_code"] == "email_unverified"

        response = await _issue(client, test_team.id, inv_id, auth_headers)
        assert response.status_code == 201, response.text
        body = response.json()
        assert len(body["code"]) == 6 and body["code"].isdigit()
        assert response.headers["cache-control"] == "no-store"

        joined = await _accept_with(client, token, invitee, body["code"])
        assert joined.status_code == 200, joined.text
        assert joined.json()["user_id"] == user_id
        # Admitted to this invitation only: the address is not verified.
        assert await _verified_at(user_id) is None
        assert outbox.sent == []

    async def test_the_answer_describes_the_account_for_the_admin_to_check(
        self, client, test_team, auth_headers, pending, outbox,
    ):
        token, inv_id = pending
        user_id, _ = await _signup(client, name="Someone Else")
        body = (await _issue(client, test_team.id, inv_id, auth_headers)).json()
        account = body["account"]
        assert account["name"] == "Someone Else"
        assert account["email"] == INVITEE
        created = (await OxydeUser.objects.get(id=user_id)).created_at
        assert datetime.fromisoformat(account["created_at"].replace("Z", "+00:00")) == created
        assert account["member_of_any_team"] is False
        invited = (await OxydeTeamInvitation.objects.get(id=inv_id)).created_at
        assert datetime.fromisoformat(body["invitation_created_at"].replace("Z", "+00:00")) == invited
        assert body["instructions"].startswith("Send this code only through a channel you already trust")
        assert "id" not in account and "hashed_password" not in account

    async def test_an_account_already_in_a_team_says_so(self, client, test_team, auth_headers, pending, outbox):
        _, inv_id = pending
        user_id, _ = await _signup(client)
        other = await OxydeTeam.objects.create(name="Elsewhere", key="ELSE")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=user_id, role=TeamRole.MEMBER)
        body = (await _issue(client, test_team.id, inv_id, auth_headers)).json()
        assert body["account"]["member_of_any_team"] is True

    async def test_only_hashes_bound_to_user_and_invitation_are_stored(
        self, client, test_team, auth_headers, pending, outbox,
    ):
        _, inv_id = pending
        user_id, _ = await _signup(client)
        code = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        [row] = [r for r in await _codes(user_id) if r.armed]
        assert row.invitation_id == inv_id and row.email_hash == evs.hash_email(INVITEE)
        assert row.code_hash == evs.hash_invitation_code(user_id, inv_id, code)
        assert code not in row.code_hash
        assert row.expires_at - row.created_at == evs.CODE_TTL

    async def test_the_team_log_records_it_and_never_the_code(
        self, client, test_team, test_user, auth_headers, pending, outbox, caplog,
    ):
        """The issue is a row in the team's activity log (CHT-1845), which
        replaced the ids-only log line; the code is in neither."""
        _, inv_id = pending
        user_id, _ = await _signup(client)
        with caplog.at_level(logging.INFO):
            code = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        assert all(code not in r.getMessage() for r in caplog.records)
        response = await client.get(
            f"/api/teams/{test_team.id}/activity?action=verification_code_issued", headers=auth_headers,
        )
        assert response.status_code == 200, response.text
        rows = response.json()
        assert len(rows) == 1
        row = rows[0]
        assert (row["actor_id"], row["target_user_id"], row["invitation_id"]) == (test_user.id, user_id, inv_id)
        assert row["email"] == INVITEE
        assert code not in response.text

    async def test_a_refused_issue_records_nothing(
        self, client, test_team, auth_headers, pending, outbox,
    ):
        _, inv_id = pending
        await _signup(client, asked=False)  # never asked: 409 no_verification_requested
        assert (await _issue(client, test_team.id, inv_id, auth_headers)).status_code == 409
        rows = (await client.get(
            f"/api/teams/{test_team.id}/activity?action=verification_code_issued", headers=auth_headers,
        )).json()
        assert rows == []

    async def test_a_rate_limited_issue_records_nothing(
        self, client, test_team, auth_headers, pending, outbox,
    ):
        """Refused inside the transaction that would record it (429)."""
        _, inv_id = pending
        await _signup(client)
        for _ in range(evs.INVITATION_ISSUE_LIMIT):
            assert (await _issue(client, test_team.id, inv_id, auth_headers)).status_code == 201
        assert (await _issue(client, test_team.id, inv_id, auth_headers)).status_code == 429
        rows = (await client.get(
            f"/api/teams/{test_team.id}/activity?action=verification_code_issued", headers=auth_headers,
        )).json()
        assert len(rows) == evs.INVITATION_ISSUE_LIMIT


async def _own_team(client, headers, key) -> str:
    response = await client.post("/api/teams", headers=headers, json={"name": key, "key": key})
    assert response.status_code == 201, response.text
    return response.json()["id"]


async def _invite_via_api(client, headers, team_id, email) -> tuple[str, str]:
    response = await client.post(f"/api/teams/{team_id}/invitations", headers=headers, json={"email": email})
    assert response.status_code == 201, response.text
    return response.json()["accept_url"].rsplit("/", 1)[1], response.json()["id"]


class TestScope:
    async def test_a_self_issued_code_does_not_open_another_teams_leaked_link(
        self, client, test_team, test_user, outbox,
    ):
        """PR #446 review 1, the PoC: an attacker with a team of their own
        squats the victim's address, issues themselves a code, and must
        still not be able to accept a real team's leaked link."""
        victim = "victim@example.com"
        _, attacker = await _signup(client, email="attacker@example.org", name="A", asked=False)
        squat_id, squatter = await _signup(client, email=victim, name="Victim Name", asked=False)
        evil = await _own_team(client, attacker, "EVIL")
        evil_token, evil_inv = await _invite_via_api(client, attacker, evil, victim)
        # Asked after the attacker's invitation, which the attacker controls.
        assert (await client.post(REQUEST, headers=squatter)).status_code == 202  # mailed to the victim
        issued = await _issue(client, evil, evil_inv, attacker)
        assert issued.status_code == 201
        code = issued.json()["code"]

        legit_token = await _invite(test_team.id, test_user.id, victim)  # the link that leaks
        # The code is no good for the other invitation...
        refused = await _accept_with(client, legit_token, squatter, code)
        assert refused.status_code == 400
        # ...it gets them into the attacker's own team, which they own anyway...
        assert (await _accept_with(client, evil_token, squatter, code)).status_code == 200
        # ...and the address is still unverified, so the leaked link alone is refused.
        assert await _verified_at(squat_id) is None
        again = await _accept(client, legit_token, squatter)
        assert again.status_code == 403
        assert again.json()["detail"]["error_code"] == "email_unverified"
        assert await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=squat_id).count() == 0

    async def test_a_leaked_link_and_code_are_useless_without_the_accounts_login(
        self, client, test_team, auth_headers, pending, outbox,
    ):
        token, inv_id = pending
        await _signup(client)
        code = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        _, attacker = await _signup(client, email="attacker@example.com", name="Attacker", asked=False)
        refused = await _accept_with(client, token, attacker, code)
        assert refused.status_code == 400
        assert refused.json()["detail"]["error_code"] == "invalid_verification_code"
        assert (await client.post(CONFIRM, headers=attacker, json={"code": code})).status_code == 400
        assert await OxydeTeamMember.objects.filter(team_id=test_team.id).count() == 1

    async def test_a_squatter_shows_up_as_a_stranger_in_the_answer(
        self, client, test_team, auth_headers, pending, outbox,
    ):
        _, inv_id = pending
        await _signup(client, name="Not the invitee")
        body = (await _issue(client, test_team.id, inv_id, auth_headers)).json()
        assert body["account"]["name"] == "Not the invitee"

    async def test_a_mailed_code_passed_to_accept_verifies_the_address(
        self, client, test_team, pending, outbox,
    ):
        # With no admin code live, a code passed to accept is a mailed one.
        token, _ = pending
        user_id, invitee = await _signup(client, asked=False)
        await client.post(REQUEST, headers=invitee)
        joined = await _accept_with(client, token, invitee, outbox.last_code())
        assert joined.status_code == 200, joined.text
        assert await _verified_at(user_id) is not None


class TestCodeRules:
    async def test_a_new_admin_code_retires_the_earlier_one(self, client, test_team, auth_headers, pending, outbox):
        token, inv_id = pending
        _, invitee = await _signup(client)
        first = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        second = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        if first != second:
            assert (await _accept_with(client, token, invitee, first)).status_code == 400
        assert (await _accept_with(client, token, invitee, second)).status_code == 200

    async def test_it_leaves_the_accounts_mailed_code_alone(self, client, test_team, auth_headers, pending, outbox):
        """Review 3: issuing must not disarm the invitee's own codes."""
        _, inv_id = pending
        user_id, invitee = await _signup(client, asked=False)
        assert (await client.post(REQUEST, headers=invitee)).status_code == 202
        mailed = outbox.last_code()
        await _issue(client, test_team.id, inv_id, auth_headers)
        assert (await client.post(CONFIRM, headers=invitee, json={"code": mailed})).status_code == 200

    async def test_its_wrong_tries_do_not_count_against_the_address(
        self, client, test_team, auth_headers, pending, outbox,
    ):
        """Review 3: a team the invitee never heard of cannot steer them
        into the address's daily failure cap."""
        token, inv_id = pending
        _, invitee = await _signup(client)
        for _ in range(evs.INVITATION_ISSUE_LIMIT):
            code = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
            for _ in range(evs.MAX_ATTEMPTS):
                assert (await _accept_with(client, token, invitee, _wrong(code))).status_code == 400
        admin = await OxydeEmailVerificationCode.objects.filter(invitation_id=inv_id).all()
        assert evs._failures(admin) == evs.INVITATION_ISSUE_LIMIT * evs.MAX_ATTEMPTS
        mailed = await OxydeEmailVerificationCode.objects.filter(
            email_hash=evs.hash_email(INVITEE), invitation_id__isnull=True,
        ).all()
        assert evs._failures(mailed) == 0
        assert (await client.post(REQUEST, headers=invitee)).status_code == 202
        assert (await client.post(CONFIRM, headers=invitee, json={"code": outbox.last_code()})).status_code == 200

    async def test_it_expires(self, client, test_team, auth_headers, pending, outbox):
        token, inv_id = pending
        user_id, invitee = await _signup(client)
        code = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        await _age_codes(user_id, evs.CODE_TTL + timedelta(seconds=1))
        response = await _accept_with(client, token, invitee, code)
        assert response.status_code == 400
        assert response.json()["detail"]["error_code"] == "invitation_code_expired"

    async def test_five_tries_then_dead(self, client, test_team, auth_headers, pending, outbox):
        token, inv_id = pending
        _, invitee = await _signup(client)
        code = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        for _ in range(evs.MAX_ATTEMPTS):
            assert (await _accept_with(client, token, invitee, _wrong(code))).status_code == 400
        response = await _accept_with(client, token, invitee, code)
        assert response.status_code == 400
        assert response.json()["detail"]["error_code"] == "invitation_code_expired"

    async def test_at_most_three_codes_a_day_per_team_and_address(
        self, client, test_team, test_user, auth_headers, pending, outbox,
    ):
        """Second review, 4: cancelling and inviting again does not reset
        the limit, and another team's codes do not use it up."""
        _, inv_id = pending
        await _signup(client)
        for _ in range(evs.INVITATION_ISSUE_LIMIT):
            assert (await _issue(client, test_team.id, inv_id, auth_headers)).status_code == 201
        response = await _issue(client, test_team.id, inv_id, auth_headers)
        assert response.status_code == 429
        assert response.json()["detail"]["error_code"] == "email_verification_rate_limited"
        assert int(response.headers["retry-after"]) > 0

        assert (await client.delete(f"/api/teams/{test_team.id}/invitations/{inv_id}", headers=auth_headers)).status_code == 204
        again = await _invitation_id(await _invite(test_team.id, test_user.id, INVITEE))
        assert (await _issue(client, test_team.id, again, auth_headers)).status_code == 429

        other = await OxydeTeam.objects.create(name="Other", key="OTHR")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user.id, role=TeamRole.OWNER)
        theirs = await _invitation_id(await _invite(other.id, test_user.id, INVITEE))
        assert (await _issue(client, other.id, theirs, auth_headers)).status_code == 201

    async def test_the_mailing_limits_do_not_block_it(self, client, test_team, auth_headers, pending, outbox):
        _, inv_id = pending
        _, invitee = await _signup(client, asked=False)
        outbox.fail = True
        await client.post(REQUEST, headers=invitee)
        assert (await _issue(client, test_team.id, inv_id, auth_headers)).status_code == 201

    async def test_issuing_never_extends_the_window(self, client, test_team, auth_headers, pending, outbox):
        """Review 2: only the account's own requests count as asking."""
        _, inv_id = pending
        # An invitation older than the window, so only the window limits.
        await OxydeTeamInvitation.objects.filter(id=inv_id).update(
            created_at=datetime.now(timezone.utc) - evs.FAILURE_WINDOW - timedelta(hours=1),
        )
        user_id, _ = await _signup(client)
        assert (await _issue(client, test_team.id, inv_id, auth_headers)).status_code == 201
        own = OxydeEmailVerificationCode.objects.filter(email_hash=evs.hash_email(INVITEE), user_id=user_id)
        for row in await own.all():
            await OxydeEmailVerificationCode.objects.filter(id=row.id).update(
                created_at=datetime.now(timezone.utc) - evs.FAILURE_WINDOW + timedelta(minutes=1),
            )
        # Still inside the window: allowed. Then age it out.
        assert (await _issue(client, test_team.id, inv_id, auth_headers)).status_code == 201
        for row in await own.all():
            await OxydeEmailVerificationCode.objects.filter(id=row.id).update(
                created_at=datetime.now(timezone.utc) - evs.FAILURE_WINDOW - timedelta(minutes=1),
            )
        response = await _issue(client, test_team.id, inv_id, auth_headers)
        assert response.json()["detail"]["error_code"] == "no_verification_requested"


class TestStaleAdminCode:
    async def test_a_stale_admin_code_does_not_spend_a_mailed_codes_attempt(
        self, client, test_team, auth_headers, pending, outbox,
    ):
        """Second review, 2: an admin code typed after it expired is
        answered as one, and never tried as a mailed code."""
        token, inv_id = pending
        user_id, invitee = await _signup(client)
        code = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        await OxydeEmailVerificationCode.objects.filter(invitation_id=inv_id).update(
            expires_at=datetime.now(timezone.utc) - timedelta(seconds=1),
        )
        assert (await client.post(REQUEST, headers=invitee)).status_code == 202
        mailed = outbox.last_code()
        response = await _accept_with(client, token, invitee, code)
        assert response.status_code == 400
        assert response.json()["detail"]["error_code"] == "invitation_code_expired"
        assert "Ask the admin for a new one" in response.json()["detail"]["message"]
        [row] = await OxydeEmailVerificationCode.objects.filter(
            email_hash=evs.hash_email(INVITEE), invitation_id__isnull=True, armed=True,
        ).all()
        assert row.attempts == 0
        assert (await client.post(CONFIRM, headers=invitee, json={"code": mailed})).status_code == 200

    async def test_another_account_is_not_told_a_code_was_issued(
        self, client, test_team, auth_headers, pending, outbox,
    ):
        token, inv_id = pending
        await _signup(client)
        code = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        await OxydeEmailVerificationCode.objects.filter(invitation_id=inv_id).update(
            expires_at=datetime.now(timezone.utc) - timedelta(seconds=1),
        )
        _, other = await _signup(client, email="other@example.com", asked=False)
        response = await _accept_with(client, token, other, code)
        assert response.json()["detail"]["error_code"] == "invalid_verification_code"


class TestRefusals:
    async def test_a_plain_member_gets_403(self, client, test_team, test_user2, auth_headers2, pending, outbox):
        _, inv_id = pending
        await _signup(client)
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        response = await _issue(client, test_team.id, inv_id, auth_headers2)
        assert response.status_code == 403

    async def test_outsiders_get_the_same_403_for_a_real_and_a_missing_team(
        self, client, test_team, auth_headers2, pending, outbox,
    ):
        _, inv_id = pending
        await _signup(client)
        real = await _issue(client, test_team.id, inv_id, auth_headers2)
        missing = await _issue(client, "no-such-team", inv_id, auth_headers2)
        assert real.status_code == missing.status_code == 403
        assert real.json() == missing.json()

    async def test_another_teams_invitation_is_not_found(self, client, test_team, test_user, auth_headers, outbox):
        other = await OxydeTeam.objects.create(name="Other", key="OTHR")
        token = await _invite(other.id, test_user.id, INVITEE)
        await _signup(client)
        response = await _issue(client, test_team.id, await _invitation_id(token), auth_headers)
        assert response.status_code == 404
        assert response.json() == {"detail": "Invitation not found"}

    @pytest.mark.parametrize("state", ["accepted", "revoked", "expired", "unknown"])
    async def test_a_non_pending_invitation_is_the_same_404(
        self, client, test_team, auth_headers, pending, outbox, state,
    ):
        _, inv_id = pending
        await _signup(client)
        if state == "accepted":
            await OxydeTeamInvitation.objects.filter(id=inv_id).update(status=InvitationStatus.ACCEPTED)
        elif state == "revoked":
            assert (await client.delete(f"/api/teams/{test_team.id}/invitations/{inv_id}", headers=auth_headers)).status_code == 204
        elif state == "expired":
            await OxydeTeamInvitation.objects.filter(id=inv_id).update(
                expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
            )
        else:
            inv_id = "no-such-invitation"
        response = await _issue(client, test_team.id, inv_id, auth_headers)
        assert response.status_code == 404
        assert response.json() == {"detail": "Invitation not found"}

    async def test_without_smtp_the_answer_does_not_depend_on_the_account(
        self, client, test_team, test_user, auth_headers, no_smtp,
    ):
        with_account = await _invite(test_team.id, test_user.id, INVITEE)
        await _signup(client)
        without = await _invite(test_team.id, test_user.id, "nobody@example.com")
        a = await _issue(client, test_team.id, await _invitation_id(with_account), auth_headers)
        b = await _issue(client, test_team.id, await _invitation_id(without), auth_headers)
        assert a.status_code == b.status_code == 409
        assert a.json() == b.json()
        assert a.json()["detail"]["error_code"] == "email_verification_unavailable"

    @pytest.mark.parametrize(
        "kind", ["passive", "verified", "deactivated", "asked_long_ago", "asked_before_the_invitation"],
    )
    async def test_every_ineligible_account_answers_like_no_account(
        self, client, test_team, test_user, auth_headers, outbox, kind, monkeypatch,
    ):
        """Self-review F1 and review 5, 6: no account, a passive one, a
        verified one, a deactivated one and one that asked over a day ago
        get one answer, after the same number of lookups."""
        calls = []
        real = evs.EmailVerificationService.asked_recently

        async def counting(user_id, email, since):
            calls.append(user_id)
            return await real(user_id, email, since)

        monkeypatch.setattr(evs.EmailVerificationService, "asked_recently", staticmethod(counting))
        nobody = await _invite(test_team.id, test_user.id, "nobody@example.com")
        token = await _invite(test_team.id, test_user.id, INVITEE)
        user_id, _ = await _signup(client, name="The Invitee", asked=kind in ("verified", "deactivated"))
        if kind == "verified":
            await OxydeUser.objects.filter(id=user_id).update(email_verified_at=datetime.now(timezone.utc))
        elif kind == "deactivated":
            await OxydeUser.objects.filter(id=user_id).update(is_active=False)
        elif kind == "asked_long_ago":
            await _asked(user_id, INVITEE, ago=evs.FAILURE_WINDOW + timedelta(minutes=1))
        elif kind == "asked_before_the_invitation":
            # Second review, 1: within the day, but before this invitation
            # existed, so not a request this invitation left stuck.
            await _asked(user_id, INVITEE, ago=timedelta(hours=4))
        a = await _issue(client, test_team.id, await _invitation_id(nobody), auth_headers)
        n = len(calls)
        b = await _issue(client, test_team.id, await _invitation_id(token), auth_headers)
        assert a.status_code == b.status_code == 409
        assert a.json() == b.json()
        assert a.json()["detail"]["error_code"] == "no_verification_requested"
        assert "The Invitee" not in b.text
        if kind != "deactivated":  # a deactivated account is dropped before the query
            assert len(calls) - n == n == 1
        assert await OxydeEmailVerificationCode.objects.filter(armed=True).count() == 0

    async def test_two_accounts_differing_in_case_are_refused(self, client, test_team, auth_headers, pending, outbox):
        _, inv_id = pending
        await _signup(client)
        legacy = await _make_legacy_variant(INVITEE.upper())
        await _asked(legacy.id, legacy.email)
        response = await _issue(client, test_team.id, inv_id, auth_headers)
        assert response.status_code == 409
        assert response.json()["detail"]["error_code"] == "ambiguous_account"
        assert await OxydeEmailVerificationCode.objects.filter(armed=True).count() == 0
