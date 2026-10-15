"""A team admin issues the verification code for a pending invitation's
account, to hand over by hand when SMTP is configured but failing (CHT-1828).

The threat model is CHT-1790's: the invitation token is a bearer
credential, and signup takes any address on trust. The admin-issued
code must not reopen that hole: it is bound to one account, so a leaked
link plus a leaked code is useless without that account's login.
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
    _invite,
    _make_legacy_variant,
)

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
        user_id, invitee = await _signup(client)
        # The mailed code fails, which is the bug.
        outbox.fail = True
        assert (await client.post(REQUEST, headers=invitee)).status_code == 502
        assert (await _accept(client, token, invitee)).json()["detail"]["error_code"] == "email_unverified"

        response = await _issue(client, test_team.id, inv_id, auth_headers)
        assert response.status_code == 201, response.text
        body = response.json()
        assert len(body["code"]) == 6 and body["code"].isdigit()
        assert response.headers["cache-control"] == "no-store"

        confirm = await client.post(CONFIRM, headers=invitee, json={"code": body["code"]})
        assert confirm.status_code == 200, confirm.text
        joined = await _accept(client, token, invitee)
        assert joined.status_code == 200, joined.text
        assert joined.json()["user_id"] == user_id
        # Nothing was mailed for the admin code.
        assert outbox.sent == []

    async def test_the_answer_describes_the_account_for_the_admin_to_check(
        self, client, test_team, auth_headers, pending, outbox,
    ):
        _, inv_id = pending
        user_id, _ = await _signup(client, name="Someone Else")
        body = (await _issue(client, test_team.id, inv_id, auth_headers)).json()
        account = body["account"]
        assert account["name"] == "Someone Else"
        assert account["email"] == INVITEE
        created = (await OxydeUser.objects.get(id=user_id)).created_at
        assert datetime.fromisoformat(account["created_at"].replace("Z", "+00:00")) == created
        assert account["member_of_any_team"] is False
        assert "confirm with the invitee" in body["instructions"]
        assert "id" not in account and "hashed_password" not in account

    async def test_an_account_already_in_a_team_says_so(self, client, test_team, auth_headers, pending, outbox):
        _, inv_id = pending
        user_id, _ = await _signup(client)
        other = await OxydeTeam.objects.create(name="Elsewhere", key="ELSE")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=user_id, role=TeamRole.MEMBER)
        body = (await _issue(client, test_team.id, inv_id, auth_headers)).json()
        assert body["account"]["member_of_any_team"] is True

    async def test_only_hashes_are_stored(self, client, test_team, auth_headers, pending, outbox):
        _, inv_id = pending
        user_id, _ = await _signup(client)
        code = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        [row] = [r for r in await _codes(user_id) if r.armed]
        assert row.armed is True
        assert code not in row.code_hash
        assert row.code_hash == evs.hash_code(user_id, code)
        assert row.expires_at - row.created_at == evs.CODE_TTL

    async def test_the_log_line_has_ids_and_never_the_code(
        self, client, test_team, test_user, auth_headers, pending, outbox, caplog,
    ):
        _, inv_id = pending
        user_id, _ = await _signup(client)
        with caplog.at_level(logging.INFO, logger="app.api.teams"):
            code = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        lines = [r.getMessage() for r in caplog.records if "verification code" in r.getMessage()]
        assert len(lines) == 1
        for value in (test_user.id, test_team.id, user_id, inv_id):
            assert value in lines[0]
        assert all(code not in r.getMessage() for r in caplog.records)


class TestLeakedTokenAndCode:
    async def test_a_leaked_link_and_code_are_useless_without_the_accounts_login(
        self, client, test_team, auth_headers, pending, outbox,
    ):
        token, inv_id = pending
        await _signup(client)
        code = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        # The attacker has the link and the code, but their own account.
        _, attacker = await _signup(client, email="attacker@example.com", name="Attacker", asked=False)
        confirm = await client.post(CONFIRM, headers=attacker, json={"code": code})
        assert confirm.status_code == 400
        assert confirm.json()["detail"]["error_code"] == "invalid_verification_code"
        refused = await _accept(client, token, attacker)
        assert refused.status_code == 403
        assert await OxydeTeamMember.objects.filter(team_id=test_team.id).count() == 1

    async def test_a_squatter_shows_up_as_a_stranger_in_the_answer(
        self, client, test_team, auth_headers, pending, outbox,
    ):
        # Someone saw the link and signed up first: the admin is shown
        # their account, not the invitee's, and must not hand the code over.
        _, inv_id = pending
        await _signup(client, name="Not the invitee")
        body = (await _issue(client, test_team.id, inv_id, auth_headers)).json()
        assert body["account"]["name"] == "Not the invitee"


class TestCodeRules:
    async def test_a_new_admin_code_retires_the_earlier_one(self, client, test_team, auth_headers, pending, outbox):
        _, inv_id = pending
        _, invitee = await _signup(client)
        first = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        second = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        if first != second:
            assert (await client.post(CONFIRM, headers=invitee, json={"code": first})).status_code == 400
        assert (await client.post(CONFIRM, headers=invitee, json={"code": second})).status_code == 200

    async def test_an_admin_code_retires_an_earlier_mailed_code(self, client, test_team, auth_headers, pending, outbox):
        _, inv_id = pending
        user_id, invitee = await _signup(client)
        assert (await client.post(REQUEST, headers=invitee)).status_code == 202
        mailed = outbox.last_code()
        admin = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        rows = await _codes(user_id)
        assert [r.armed for r in rows] == [False, False, True]
        if mailed != admin:  # one chance in a million they are the same
            assert (await client.post(CONFIRM, headers=invitee, json={"code": mailed})).status_code == 400

    async def test_it_expires(self, client, test_team, auth_headers, pending, outbox):
        _, inv_id = pending
        user_id, invitee = await _signup(client)
        code = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        await _age_codes(user_id, evs.CODE_TTL + timedelta(seconds=1))
        assert (await client.post(CONFIRM, headers=invitee, json={"code": code})).status_code == 400

    async def test_five_tries_then_dead(self, client, test_team, auth_headers, pending, outbox):
        _, inv_id = pending
        _, invitee = await _signup(client)
        code = (await _issue(client, test_team.id, inv_id, auth_headers)).json()["code"]
        wrong = f"{(int(code) + 1) % 10 ** 6:06d}"
        for _ in range(evs.MAX_ATTEMPTS):
            assert (await client.post(CONFIRM, headers=invitee, json={"code": wrong})).status_code == 400
        assert (await client.post(CONFIRM, headers=invitee, json={"code": code})).status_code == 400

    async def test_the_daily_failure_cap_holds(self, client, test_team, auth_headers, pending, outbox):
        _, inv_id = pending
        user_id, _ = await _signup(client)
        await OxydeEmailVerificationCode.objects.create(
            email_hash=evs.hash_email(INVITEE), user_id=user_id, code_hash="x", armed=False,
            expires_at=datetime.now(timezone.utc), attempts=evs.DAILY_FAILURE_LIMIT,
        )
        response = await _issue(client, test_team.id, inv_id, auth_headers)
        assert response.status_code == 429
        assert response.json()["detail"]["error_code"] == "email_verification_rate_limited"
        assert "retry-after" in response.headers

    async def test_the_mailing_limits_do_not_block_it(self, client, test_team, auth_headers, pending, outbox):
        # A code was just requested (and failed): the one-a-minute limit
        # protects the relay, and the admin code mails nothing.
        _, inv_id = pending
        _, invitee = await _signup(client)
        outbox.fail = True
        await client.post(REQUEST, headers=invitee)
        assert (await _issue(client, test_team.id, inv_id, auth_headers)).status_code == 201

    async def test_already_verified(self, client, test_team, auth_headers, pending, outbox):
        _, inv_id = pending
        user_id, _ = await _signup(client)
        await OxydeUser.objects.filter(id=user_id).update(email_verified_at=datetime.now(timezone.utc))
        response = await _issue(client, test_team.id, inv_id, auth_headers)
        assert response.status_code == 409
        assert response.json()["detail"]["error_code"] == "email_already_verified"


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

    async def test_no_account_and_a_passive_account_get_the_same_answer(
        self, client, test_team, test_user, auth_headers, outbox,
    ):
        """PR #446 review F1: anyone can make a team and invite any address,
        so an account that never asked for a code is not described, and
        not even told apart from no account."""
        nobody = await _invite(test_team.id, test_user.id, "nobody@example.com")
        passive_token = await _invite(test_team.id, test_user.id, INVITEE)
        passive_id, _ = await _signup(client, asked=False)
        a = await _issue(client, test_team.id, await _invitation_id(nobody), auth_headers)
        b = await _issue(client, test_team.id, await _invitation_id(passive_token), auth_headers)
        assert a.status_code == b.status_code == 409
        assert a.json() == b.json()
        assert a.json()["detail"]["error_code"] == "no_verification_requested"
        assert "The Invitee" not in b.text
        assert await OxydeEmailVerificationCode.objects.count() == 0

    async def test_asking_over_a_day_ago_does_not_count(
        self, client, test_team, test_user, auth_headers, outbox,
    ):
        # Asking more than a day ago does not count: the account is not
        # waiting on a code now.
        token = await _invite(test_team.id, test_user.id, INVITEE)
        user_id, _ = await _signup(client, asked=False)
        await _asked(user_id, INVITEE, ago=evs.FAILURE_WINDOW + timedelta(minutes=1))
        response = await _issue(client, test_team.id, await _invitation_id(token), auth_headers)
        assert response.json()["detail"]["error_code"] == "no_verification_requested"

    async def test_a_deactivated_account_counts_as_none(self, client, test_team, auth_headers, pending, outbox):
        _, inv_id = pending
        user_id, _ = await _signup(client)
        await OxydeUser.objects.filter(id=user_id).update(is_active=False)
        response = await _issue(client, test_team.id, inv_id, auth_headers)
        assert response.json()["detail"]["error_code"] == "no_verification_requested"

    async def test_two_accounts_differing_in_case_are_refused(self, client, test_team, auth_headers, pending, outbox):
        _, inv_id = pending
        await _signup(client)
        legacy = await _make_legacy_variant(INVITEE.upper())
        await _asked(legacy.id, legacy.email)
        response = await _issue(client, test_team.id, inv_id, auth_headers)
        assert response.status_code == 409
        assert response.json()["detail"]["error_code"] == "ambiguous_account"
        assert await OxydeEmailVerificationCode.objects.filter(armed=True).count() == 0
