"""Email verification by mailed code, and the invitation gate on it (CHT-1790).

No real email is sent: EmailService.send is replaced by a recorder.
SMTP is "configured" by setting SMTP_HOST and clearing the settings cache.
"""
import asyncio
import logging
import re
import secrets
from datetime import datetime, timedelta, timezone

from unittest.mock import patch

import pytest

from app.config import get_settings
from app.enums import InvitationStatus, TeamRole
from app.oxyde_models.email_verification import OxydeEmailVerificationCode
from app.oxyde_models.team import OxydeTeam, OxydeTeamInvitation, OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.services import email_verification_service as evs
from app.services.email_service import EmailService
from app.utils.security import create_access_token


REQUEST = "/api/auth/email-verification"
CONFIRM = "/api/auth/email-verification/confirm"


@pytest.fixture(autouse=True)
def _fresh_settings():
    get_settings.cache_clear()
    yield
    get_settings.cache_clear()


@pytest.fixture
def no_smtp(monkeypatch):
    monkeypatch.delenv("SMTP_HOST", raising=False)
    get_settings.cache_clear()


class Outbox:
    def __init__(self):
        self.sent: list[tuple[str, str, str]] = []
        self.fail = False

    async def send(self, _service, to, subject, body):
        if self.fail:
            return False
        self.sent.append((to, subject, body))
        return True

    def last_code(self) -> str:
        return re.search(r"code is: (\d{6})", self.sent[-1][2]).group(1)


@pytest.fixture
def outbox(monkeypatch):
    monkeypatch.setenv("SMTP_HOST", "smtp.example.com")
    get_settings.cache_clear()
    box = Outbox()

    async def send(self, to, subject, body):
        return await box.send(self, to, subject, body)

    monkeypatch.setattr(EmailService, "send", send)
    return box


async def _age_codes(user_id: str, by: timedelta) -> None:
    for row in await OxydeEmailVerificationCode.objects.filter(user_id=user_id).all():
        await OxydeEmailVerificationCode.objects.filter(id=row.id).update(
            created_at=row.created_at - by, expires_at=row.expires_at - by,
        )


async def _codes(user_id: str) -> list[OxydeEmailVerificationCode]:
    return await OxydeEmailVerificationCode.objects.filter(user_id=user_id).order_by("created_at").all()


# ---------------------------------------------------------------------------
# Requesting a code
# ---------------------------------------------------------------------------


class TestRequest:
    async def test_sends_a_six_digit_code_to_the_account_address(self, client, auth_headers, test_user, outbox):
        response = await client.post(REQUEST, headers=auth_headers)
        assert response.status_code == 202, response.text
        body = response.json()
        assert body["email"] == "test@example.com"
        expires = datetime.fromisoformat(body["expires_at"])
        assert timedelta(minutes=14) < expires - datetime.now(timezone.utc) <= timedelta(minutes=15)
        [(to, subject, text)] = outbox.sent
        assert to == "test@example.com"
        assert "verification code" in subject
        assert re.fullmatch(r"\d{6}", outbox.last_code())

    async def test_only_an_hmac_of_the_code_is_stored(self, client, auth_headers, test_user, outbox):
        await client.post(REQUEST, headers=auth_headers)
        code = outbox.last_code()
        [row] = await _codes(test_user.id)
        assert code not in row.code_hash
        assert row.code_hash == evs.hash_code(test_user.id, code)
        assert len(row.code_hash) == 64
        assert row.armed is True
        # The address is stored only as an HMAC of its normalised form.
        assert "test@example.com" not in row.email_hash
        assert row.email_hash == evs.hash_email(" Test@Example.COM ")
        # A key derived for this purpose, not SECRET_KEY itself.
        import hashlib
        import hmac
        raw = hmac.new(get_settings().secret_key.encode(), f"code:{test_user.id}:{code}".encode(), hashlib.sha256)
        assert row.code_hash != raw.hexdigest()
        # Keyed: a different server key gives a different hash.
        get_settings().secret_key = "another-key-entirely-another-key"
        assert evs.hash_code(test_user.id, code) != row.code_hash

    async def test_without_smtp_it_is_unavailable(self, client, auth_headers, test_user, no_smtp):
        response = await client.post(REQUEST, headers=auth_headers)
        assert response.status_code == 409
        detail = response.json()["detail"]
        assert detail["error_code"] == "email_verification_unavailable"
        assert "SMTP" in detail["message"]
        assert await _codes(test_user.id) == []

    async def test_already_verified_is_409(self, client, auth_headers, test_user, outbox):
        test_user.email_verified_at = datetime.now(timezone.utc)
        await test_user.save(update_fields={"email_verified_at"})
        response = await client.post(REQUEST, headers=auth_headers)
        assert response.status_code == 409
        assert response.json()["detail"]["error_code"] == "email_already_verified"
        assert outbox.sent == []

    async def test_a_failed_send_is_reported_and_the_code_is_dead(self, client, auth_headers, test_user, outbox):
        outbox.fail = True
        response = await client.post(REQUEST, headers=auth_headers)
        assert response.status_code == 502
        assert response.json()["detail"]["error_code"] == "email_send_failed"
        [row] = await _codes(test_user.id)
        assert row.armed is False
        # It still counts for the resend interval.
        outbox.fail = False
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 429

    async def test_an_agent_is_refused(self, client, agent_headers, outbox):
        for path, body in ((REQUEST, None), (CONFIRM, {"code": "123456"})):
            response = await client.post(path, headers=agent_headers, json=body)
            assert response.status_code == 403
            assert response.json()["detail"]["error_code"] == "human_required"
        assert outbox.sent == []

    async def test_unauthenticated_is_401(self, client, outbox):
        assert (await client.post(REQUEST)).status_code == 401
        assert (await client.post(CONFIRM, json={"code": "123456"})).status_code == 401


class TestRateLimits:
    async def test_no_second_code_within_a_minute(self, client, auth_headers, test_user, outbox):
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202
        response = await client.post(REQUEST, headers=auth_headers)
        assert response.status_code == 429
        assert response.json()["detail"]["error_code"] == "email_verification_rate_limited"
        assert 1 <= int(response.headers["Retry-After"]) <= 60
        assert len(outbox.sent) == 1
        # The refused request left no row behind.
        assert len(await _codes(test_user.id)) == 1

    async def test_after_a_minute_a_new_code_is_sent(self, client, auth_headers, test_user, outbox):
        await client.post(REQUEST, headers=auth_headers)
        await _age_codes(test_user.id, timedelta(seconds=61))
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202
        assert len(outbox.sent) == 2

    async def test_at_most_five_an_hour(self, client, auth_headers, test_user, outbox):
        for _ in range(evs.HOURLY_LIMIT):
            assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202
            await _age_codes(test_user.id, timedelta(minutes=2))
        response = await client.post(REQUEST, headers=auth_headers)
        assert response.status_code == 429
        assert response.json()["detail"]["error_code"] == "email_verification_rate_limited"
        retry = int(response.headers["Retry-After"])
        # The oldest of the five was sent 10 minutes ago: free in ~50.
        assert 49 * 60 <= retry <= 50 * 60
        assert len(outbox.sent) == evs.HOURLY_LIMIT

    async def test_codes_older_than_an_hour_stop_counting(self, client, auth_headers, test_user, outbox):
        for _ in range(evs.HOURLY_LIMIT):
            await client.post(REQUEST, headers=auth_headers)
            await _age_codes(test_user.id, timedelta(minutes=2))
        await _age_codes(test_user.id, timedelta(hours=1))
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202
        # Kept, as the day's failure history, until a day old.
        assert len(await _codes(test_user.id)) == evs.HOURLY_LIMIT + 1

    async def test_limits_are_per_user(self, client, auth_headers, auth_headers2, test_user, test_user2, outbox):
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202
        assert (await client.post(REQUEST, headers=auth_headers2)).status_code == 202


# ---------------------------------------------------------------------------
# Confirming
# ---------------------------------------------------------------------------


class TestConfirm:
    async def test_the_right_code_verifies(self, client, auth_headers, test_user, outbox):
        await client.post(REQUEST, headers=auth_headers)
        response = await client.post(CONFIRM, headers=auth_headers, json={"code": outbox.last_code()})
        assert response.status_code == 200, response.text
        body = response.json()
        assert body["id"] == test_user.id
        assert body["email_verified_at"] is not None
        assert "hashed_password" not in body
        [row] = await _codes(test_user.id)
        assert row.used_at is not None
        await test_user.refresh()
        assert test_user.email_verified_at is not None
        me = (await client.get("/api/auth/me", headers=auth_headers)).json()
        assert me["email_verified_at"] is not None

    async def test_surrounding_whitespace_is_ignored(self, client, auth_headers, outbox):
        await client.post(REQUEST, headers=auth_headers)
        response = await client.post(CONFIRM, headers=auth_headers, json={"code": f" {outbox.last_code()}\n"})
        assert response.status_code == 200

    async def test_a_new_account_starts_unverified(self, client, auth_headers):
        me = (await client.get("/api/auth/me", headers=auth_headers)).json()
        assert me["email_verified_at"] is None

    async def _wrong(self, client, headers, code="000000"):
        return await client.post(CONFIRM, headers=headers, json={"code": code})

    def _other(self, code: str) -> str:
        return f"{(int(code) + 1) % 10**6:06d}"

    async def test_wrong_expired_dead_and_missing_codes_answer_alike(self, client, auth_headers, test_user, outbox):
        answers = []
        # No code at all.
        answers.append(await self._wrong(client, auth_headers))
        await client.post(REQUEST, headers=auth_headers)
        code = outbox.last_code()
        # Wrong.
        answers.append(await self._wrong(client, auth_headers, self._other(code)))
        # Malformed.
        answers.append(await self._wrong(client, auth_headers, "not-a-code"))
        # Expired (the right code).
        await _age_codes(test_user.id, timedelta(minutes=16))
        answers.append(await self._wrong(client, auth_headers, code))
        shapes = {(r.status_code, r.json()["detail"]["error_code"], r.json()["detail"]["message"]) for r in answers}
        assert shapes == {(400, "invalid_verification_code", evs.INVALID_CODE_MESSAGE)}
        await test_user.refresh()
        assert test_user.email_verified_at is None

    async def test_five_wrong_tries_kill_the_code(self, client, auth_headers, test_user, outbox):
        await client.post(REQUEST, headers=auth_headers)
        code = outbox.last_code()
        for _ in range(evs.MAX_ATTEMPTS):
            assert (await self._wrong(client, auth_headers, self._other(code))).status_code == 400
        response = await self._wrong(client, auth_headers, code)
        assert response.status_code == 400
        assert response.json()["detail"]["error_code"] == "invalid_verification_code"
        [row] = await _codes(test_user.id)
        assert row.attempts == evs.MAX_ATTEMPTS
        # A new code works.
        await _age_codes(test_user.id, timedelta(seconds=61))
        await client.post(REQUEST, headers=auth_headers)
        assert (await self._wrong(client, auth_headers, outbox.last_code())).status_code == 200

    async def test_the_fifth_try_may_still_be_right(self, client, auth_headers, outbox):
        await client.post(REQUEST, headers=auth_headers)
        code = outbox.last_code()
        for _ in range(evs.MAX_ATTEMPTS - 1):
            await self._wrong(client, auth_headers, self._other(code))
        assert (await self._wrong(client, auth_headers, code)).status_code == 200

    async def test_a_new_code_retires_the_old_one(self, client, auth_headers, test_user, outbox):
        await client.post(REQUEST, headers=auth_headers)
        old = outbox.last_code()
        await _age_codes(test_user.id, timedelta(seconds=61))
        await client.post(REQUEST, headers=auth_headers)
        new = outbox.last_code()
        if new == old:  # pragma: no cover -- one in a million
            pytest.skip("the two random codes collided")
        assert (await self._wrong(client, auth_headers, old)).status_code == 400
        assert (await self._wrong(client, auth_headers, new)).status_code == 200

    async def test_a_code_is_bound_to_its_user(self, client, auth_headers, auth_headers2, test_user2, outbox):
        await client.post(REQUEST, headers=auth_headers)
        first = outbox.last_code()
        await client.post(REQUEST, headers=auth_headers2)
        second = outbox.last_code()
        if first == second:  # pragma: no cover -- one in a million
            pytest.skip("the two random codes collided")
        assert (await self._wrong(client, auth_headers2, first)).status_code == 400
        assert (await self._wrong(client, auth_headers2, second)).status_code == 200

    async def test_confirm_when_already_verified_is_409(self, client, auth_headers, outbox):
        await client.post(REQUEST, headers=auth_headers)
        await self._wrong(client, auth_headers, outbox.last_code())
        response = await self._wrong(client, auth_headers, outbox.last_code())
        assert response.status_code == 409
        assert response.json()["detail"]["error_code"] == "email_already_verified"

    async def test_an_empty_code_is_a_validation_error(self, client, auth_headers, outbox):
        assert (await client.post(CONFIRM, headers=auth_headers, json={"code": ""})).status_code == 422

    async def test_verifying_bumps_updated_at(self, client, auth_headers, test_user, outbox):
        before = test_user.updated_at
        await client.post(REQUEST, headers=auth_headers)
        body = (await client.post(CONFIRM, headers=auth_headers, json={"code": outbox.last_code()})).json()
        assert datetime.fromisoformat(body["updated_at"]) > before

    async def test_the_user_update_schema_cannot_change_the_address(self, client, auth_headers, test_user):
        response = await client.patch("/api/users/me", headers=auth_headers, json={"email": "evil@example.com"})
        assert response.status_code == 200
        await test_user.refresh()
        assert test_user.email == "test@example.com"


# ---------------------------------------------------------------------------
# The invitation gate
# ---------------------------------------------------------------------------


async def _invite(team_id: str, inviter_id: str, email: str) -> str:
    token = secrets.token_urlsafe(32)
    await OxydeTeamInvitation.objects.create(
        team_id=team_id,
        email=email,
        role=TeamRole.MEMBER,
        token=token,
        invited_by_id=inviter_id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )
    return token


async def _accept(client, token, headers):
    return await client.post(f"/api/teams/invitations/{token}/accept", headers=headers)


class TestAcceptGate:
    async def test_the_attack_signup_as_the_invitee_then_accept_is_refused(self, client, test_team, test_user, outbox):
        token = await _invite(test_team.id, test_user.id, "victim@example.com")
        signup = await client.post("/api/auth/signup", json={
            "email": "victim@example.com", "password": "password123", "name": "Not the victim",
        })
        assert signup.status_code == 201
        assert signup.json()["email_verified_at"] is None
        headers = {"Authorization": f"Bearer {create_access_token(data={'sub': signup.json()['id']})}"}
        response = await _accept(client, token, headers)
        assert response.status_code == 403
        assert response.json()["detail"]["error_code"] == "email_unverified"
        assert "chaotic auth verify-email" in response.json()["detail"]["message"]
        assert await OxydeTeamMember.objects.filter(user_id=signup.json()["id"]).count() == 0

    async def test_matching_and_mismatching_unverified_accounts_get_the_same_answer(
        self, client, test_team, test_user, auth_headers2, outbox,
    ):
        # test_user2 is test2@example.com.
        matching = await _invite(test_team.id, test_user.id, "test2@example.com")
        mismatching = await _invite(test_team.id, test_user.id, "someone@example.com")
        a = await _accept(client, matching, auth_headers2)
        b = await _accept(client, mismatching, auth_headers2)
        assert (a.status_code, a.json()) == (b.status_code, b.json())
        assert a.status_code == 403
        assert a.json()["detail"]["error_code"] == "email_unverified"
        assert a.headers["cache-control"] == "no-store"

    async def test_an_unknown_token_is_still_404_first(self, client, auth_headers2, outbox):
        response = await _accept(client, "no-such-token-" + "x" * 30, auth_headers2)
        assert response.status_code == 404

    async def test_accepting_works_after_verification(self, client, test_team, test_user, test_user2, auth_headers2, outbox):
        token = await _invite(test_team.id, test_user.id, "test2@example.com")
        await client.post(REQUEST, headers=auth_headers2)
        assert (await client.post(CONFIRM, headers=auth_headers2, json={"code": outbox.last_code()})).status_code == 200
        response = await _accept(client, token, auth_headers2)
        assert response.status_code == 200, response.text
        assert response.json()["user_id"] == test_user2.id

    async def test_a_verified_account_with_another_address_still_gets_the_mismatch(
        self, client, test_team, test_user, test_user2, auth_headers2, outbox,
    ):
        test_user2.email_verified_at = datetime.now(timezone.utc)
        await test_user2.save(update_fields={"email_verified_at"})
        token = await _invite(test_team.id, test_user.id, "someone@example.com")
        response = await _accept(client, token, auth_headers2)
        assert response.status_code == 403
        assert response.json()["detail"] == "Invitation is for a different email"

    async def test_without_smtp_accepting_is_unchanged(self, client, test_team, test_user, auth_headers2, no_smtp):
        token = await _invite(test_team.id, test_user.id, "test2@example.com")
        response = await _accept(client, token, auth_headers2)
        assert response.status_code == 200, response.text
        other = await _invite(test_team.id, test_user.id, "someone@example.com")
        response = await _accept(client, other, auth_headers2)
        assert response.status_code == 403
        assert response.json()["detail"] == "Invitation is for a different email"


class TestAccountDeleteKeepsInvitations:
    """Signup never proves the address, so deleting the account must not
    take the address's invitations with it (CHT-1796)."""

    # Only the exact-case run fails on main: the removed filter matched
    # case-sensitively, so the folded-case run passes there too and just
    # pins the behaviour for every spelling.
    @pytest.mark.parametrize(
        "signup_email", ["victim@example.com", "Victim@Example.COM"],
        ids=["exact-case (the CHT-1796 regression)", "folded-case (pin)"],
    )
    async def test_an_unverified_signup_deleting_itself_leaves_every_pending_invite(
        self, client, test_team, test_user, outbox, signup_email,
    ):
        other_team = await OxydeTeam.objects.create(name="Other Team", key="OTHR")
        await OxydeTeamMember.objects.create(team_id=other_team.id, user_id=test_user.id, role=TeamRole.OWNER)
        tokens = [
            await _invite(test_team.id, test_user.id, "victim@example.com"),
            await _invite(other_team.id, test_user.id, "victim@example.com"),
        ]
        signup = await client.post("/api/auth/signup", json={
            "email": signup_email, "password": "password123", "name": "Not the victim",
        })
        assert signup.status_code == 201, signup.text
        assert signup.json()["email_verified_at"] is None
        headers = {"Authorization": f"Bearer {create_access_token(data={'sub': signup.json()['id']})}"}

        assert (await client.delete("/api/users/me", headers=headers)).status_code == 204

        assert await OxydeUser.objects.filter(id=signup.json()["id"]).count() == 0
        for token in tokens:
            invitation = await OxydeTeamInvitation.objects.get(token=token)
            assert invitation.status == InvitationStatus.PENDING
        # And the real invitee can still open the link.
        assert (await client.get(f"/api/teams/invitations/{tokens[1]}")).status_code == 200

    async def test_an_inviter_deleting_itself_takes_its_sent_invitations_only(
        self, client, test_team, test_user, test_user2, auth_headers2, outbox,
    ):
        """What the comment in UserService.delete relies on: invitations
        the account *sent* go through invited_by's ON DELETE CASCADE,
        while ones addressed to it stay."""
        sent = await _invite(test_team.id, test_user2.id, "newhire@example.com")
        to_them = await _invite(test_team.id, test_user.id, test_user2.email)

        assert (await client.delete("/api/users/me", headers=auth_headers2)).status_code == 204

        assert await OxydeTeamInvitation.objects.filter(token=sent).count() == 0
        assert (await OxydeTeamInvitation.objects.get(token=to_them)).status == InvitationStatus.PENDING


class TestUserResponse:
    async def test_get_user_carries_the_verification_time(self, client, auth_headers, test_user):
        now = datetime.now(timezone.utc)
        await OxydeUser.objects.filter(id=test_user.id).update(email_verified_at=now)
        body = (await client.get(f"/api/users/{test_user.id}", headers=auth_headers)).json()
        assert datetime.fromisoformat(body["email_verified_at"]) == now


# ---------------------------------------------------------------------------
# Limits are per address and survive the account (PR #423 review B1)
# ---------------------------------------------------------------------------


async def _signup(client, email="test@example.com") -> dict:
    response = await client.post("/api/auth/signup", json={
        "email": email, "password": "password123", "name": "Again",
    })
    assert response.status_code == 201, response.text
    user_id = response.json()["id"]
    return {"Authorization": f"Bearer {create_access_token(data={'sub': user_id})}"}


async def _age_address(email: str, by: timedelta) -> None:
    for row in await OxydeEmailVerificationCode.objects.filter(email_hash=evs.hash_email(email)).all():
        await OxydeEmailVerificationCode.objects.filter(id=row.id).update(
            created_at=row.created_at - by, expires_at=row.expires_at - by,
        )


class TestPerAddressLimits:
    async def test_delete_and_sign_up_again_does_not_reset_the_resend_limit(self, client, auth_headers, outbox):
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202
        assert (await client.post(CONFIRM, headers=auth_headers, json={"code": "000000"})).status_code in (200, 400)
        assert (await client.delete("/api/users/me", headers=auth_headers)).status_code == 204
        again = await _signup(client)
        response = await client.post(REQUEST, headers=again)
        assert response.status_code == 429
        assert response.json()["detail"]["error_code"] == "email_verification_rate_limited"
        assert len(outbox.sent) == 1

    async def test_the_hourly_limit_survives_re_signup(self, client, auth_headers, outbox):
        for _ in range(evs.HOURLY_LIMIT):
            assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202
            await _age_address("test@example.com", timedelta(minutes=2))
        await client.delete("/api/users/me", headers=auth_headers)
        again = await _signup(client)
        assert (await client.post(REQUEST, headers=again)).status_code == 429

    async def test_a_new_account_cannot_confirm_the_old_accounts_code(self, client, auth_headers, outbox):
        await client.post(REQUEST, headers=auth_headers)
        old_code = outbox.last_code()
        await client.delete("/api/users/me", headers=auth_headers)
        again = await _signup(client)
        response = await client.post(CONFIRM, headers=again, json={"code": old_code})
        assert response.status_code == 400

    async def test_limits_ignore_address_case(self, client, test_user, outbox):
        # Two rows, two spellings of one address: one history.
        other = await _signup(client, "Other@Example.com")
        assert (await client.post(REQUEST, headers=other)).status_code == 202
        await client.delete("/api/users/me", headers=other)
        again = await _signup(client, "other@example.com")
        assert (await client.post(REQUEST, headers=again)).status_code == 429

    async def _burn_a_code(self, client, headers, outbox, tries=evs.MAX_ATTEMPTS):
        await _age_address("test@example.com", timedelta(seconds=61))
        assert (await client.post(REQUEST, headers=headers)).status_code == 202
        code = outbox.last_code()
        wrong = f"{(int(code) + 1) % 10**6:06d}"
        for _ in range(tries):
            assert (await client.post(CONFIRM, headers=headers, json={"code": wrong})).status_code == 400
        return code

    async def _reach_the_cap(self, client, headers, outbox):
        for _ in range(evs.DAILY_FAILURE_LIMIT // evs.MAX_ATTEMPTS):
            await self._burn_a_code(client, headers, outbox)
            await _age_address("test@example.com", timedelta(minutes=15))  # stay under the hourly limit

    async def test_the_daily_failure_cap_refuses_even_the_right_code(self, client, auth_headers, test_user, outbox):
        assert evs.DAILY_FAILURE_LIMIT % evs.MAX_ATTEMPTS == 0
        # 5 + 5 + 4 failures, then one more on a live code: 15, with that
        # code still under its own cap.
        await self._burn_a_code(client, auth_headers, outbox)
        await self._burn_a_code(client, auth_headers, outbox)
        await self._burn_a_code(client, auth_headers, outbox, tries=evs.MAX_ATTEMPTS - 1)
        live = await self._burn_a_code(client, auth_headers, outbox, tries=1)
        response = await client.post(CONFIRM, headers=auth_headers, json={"code": live})
        assert response.status_code == 400
        assert response.json()["detail"] == {
            "error_code": "invalid_verification_code", "message": evs.INVALID_CODE_MESSAGE,
        }
        await test_user.refresh()
        assert test_user.email_verified_at is None

    async def test_over_the_cap_no_code_is_mailed(self, client, auth_headers, outbox):
        """R2: a 429 that says when the cap lapses, not a dead code."""
        await self._reach_the_cap(client, auth_headers, outbox)
        await _age_address("test@example.com", timedelta(seconds=61))
        sent = len(outbox.sent)
        response = await client.post(REQUEST, headers=auth_headers)
        assert response.status_code == 429
        assert response.json()["detail"]["error_code"] == "email_verification_rate_limited"
        assert "wrong codes" in response.json()["detail"]["message"]
        # The cap lapses when the oldest code (5 of the 15) leaves the day.
        oldest = min(r.created_at for r in await OxydeEmailVerificationCode.objects.filter(
            email_hash=evs.hash_email("test@example.com")).all())
        expected = (oldest + evs.FAILURE_WINDOW - datetime.now(timezone.utc)).total_seconds()
        assert abs(int(response.headers["Retry-After"]) - expected) <= 2
        assert len(outbox.sent) == sent

    async def test_the_daily_failure_cap_survives_re_signup_and_lapses_after_a_day(self, client, auth_headers, outbox):
        await self._reach_the_cap(client, auth_headers, outbox)
        await client.delete("/api/users/me", headers=auth_headers)
        again = await _signup(client)
        await _age_address("test@example.com", timedelta(seconds=61))
        assert (await client.post(REQUEST, headers=again)).status_code == 429
        assert (await client.post(CONFIRM, headers=again, json={"code": outbox.last_code()})).status_code == 400
        # A day later the history is pruned and a code works again.
        await _age_address("test@example.com", evs.FAILURE_WINDOW)
        assert (await client.post(REQUEST, headers=again)).status_code == 202
        assert await OxydeEmailVerificationCode.objects.filter(
            email_hash=evs.hash_email("test@example.com")).count() == 1
        assert (await client.post(CONFIRM, headers=again, json={"code": outbox.last_code()})).status_code == 200

    def test_the_cap_lapses_when_enough_failures_leave_the_window(self):
        from types import SimpleNamespace as Row
        t0 = datetime(2026, 1, 1, tzinfo=timezone.utc)
        rows = [
            Row(attempts=5, used_at=None, created_at=t0),
            Row(attempts=5, used_at=None, created_at=t0 + timedelta(hours=1)),
            Row(attempts=5, used_at=None, created_at=t0 + timedelta(hours=2)),
            Row(attempts=1, used_at=t0, created_at=t0 + timedelta(hours=3)),  # a success, no failure
        ]
        assert evs._failure_cap_lapses_at(rows) == t0 + evs.FAILURE_WINDOW
        assert evs._failure_cap_lapses_at(rows[1:]) is None

    async def test_a_success_is_not_counted_as_a_failure(self, client, auth_headers, outbox):
        await client.post(REQUEST, headers=auth_headers)
        await client.post(CONFIRM, headers=auth_headers, json={"code": outbox.last_code()})
        [row] = await OxydeEmailVerificationCode.objects.filter(email_hash=evs.hash_email("test@example.com")).all()
        assert row.attempts == 1 and row.used_at is not None


# ---------------------------------------------------------------------------
# Unsent codes, concurrency, logging (PR #423 review N1 and test gaps)
# ---------------------------------------------------------------------------


class TestUnsentAndConcurrent:
    async def test_an_unsent_code_is_never_confirmable(self, client, auth_headers, test_user, outbox, monkeypatch):
        monkeypatch.setattr(evs, "new_code", lambda: "111111")
        outbox.fail = True
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 502
        response = await client.post(CONFIRM, headers=auth_headers, json={"code": "111111"})
        assert response.status_code == 400

    async def test_a_failed_send_leaves_the_previous_code_working(self, client, auth_headers, test_user, outbox):
        await client.post(REQUEST, headers=auth_headers)
        code = outbox.last_code()
        await _age_codes(test_user.id, timedelta(seconds=61))
        outbox.fail = True
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 502
        assert (await client.post(CONFIRM, headers=auth_headers, json={"code": code})).status_code == 200

    async def test_concurrent_wrong_confirms_stay_within_the_attempt_cap(self, client, auth_headers, test_user, outbox):
        await client.post(REQUEST, headers=auth_headers)
        code = outbox.last_code()
        wrong = f"{(int(code) + 1) % 10**6:06d}"
        responses = await asyncio.gather(*[
            client.post(CONFIRM, headers=auth_headers, json={"code": wrong}) for _ in range(12)
        ])
        assert {r.status_code for r in responses} == {400}
        [row] = await _codes(test_user.id)
        assert row.attempts == evs.MAX_ATTEMPTS
        # The code is dead now: even the right one is refused.
        assert (await client.post(CONFIRM, headers=auth_headers, json={"code": code})).status_code == 400

    async def test_concurrent_requests_send_at_most_one_code(self, client, auth_headers, test_user, outbox):
        responses = await asyncio.gather(*[client.post(REQUEST, headers=auth_headers) for _ in range(6)])
        statuses = [r.status_code for r in responses]
        assert statuses.count(202) <= 1
        assert set(statuses) <= {202, 429}
        assert len(outbox.sent) == statuses.count(202)
        assert len(await _codes(test_user.id)) == statuses.count(202)

    async def test_the_code_is_never_logged_when_the_send_fails(self, client, auth_headers, monkeypatch, caplog):
        monkeypatch.setenv("SMTP_HOST", "smtp.example.com")
        get_settings.cache_clear()
        monkeypatch.setattr(evs, "new_code", lambda: "424242")
        caplog.set_level(logging.DEBUG)
        with patch("smtplib.SMTP", side_effect=ConnectionRefusedError("nope")):
            response = await client.post(REQUEST, headers=auth_headers)
        assert response.status_code == 502
        assert "SMTP send failed" in caplog.text
        assert "424242" not in caplog.text


class TestEmailAndStartup:
    def test_the_email_warns_against_sharing_the_code(self):
        subject, body = evs.render_code_email("123456")
        assert "123456" not in subject
        assert "123456" in body
        assert "Never share this code" in body
        assert "Chaotic will never ask you for it" in body
        assert "If this wasn't you" in body
        assert "Chaotic account with this email address" in body

    def test_startup_says_the_gate_is_active_with_smtp(self, monkeypatch, caplog):
        monkeypatch.setenv("SMTP_HOST", "smtp.example.com")
        get_settings.cache_clear()
        caplog.set_level(logging.INFO, logger="app.services.email_verification_service")
        evs.log_invitation_gate()
        assert "gate: ACTIVE" in caplog.text

    def test_startup_says_the_gate_is_inactive_without_smtp(self, no_smtp, caplog):
        caplog.set_level(logging.INFO, logger="app.services.email_verification_service")
        evs.log_invitation_gate()
        assert "gate: INACTIVE" in caplog.text


class TestInviteLinkBaseWarning:
    """CHT-1822: one startup warning when APP_BASE_URL names a host only
    this machine can reach, worded by whether SMTP is configured."""

    LOGGER = "app.services.email_verification_service"

    @pytest.fixture
    def base(self, monkeypatch):
        def set_(value):
            if value is None:
                monkeypatch.delenv("APP_BASE_URL", raising=False)
            else:
                monkeypatch.setenv("APP_BASE_URL", value)
            get_settings.cache_clear()
        yield set_
        get_settings.cache_clear()

    @pytest.fixture
    def smtp(self, monkeypatch):
        monkeypatch.setenv("SMTP_HOST", "smtp.example.com")
        monkeypatch.setenv("SMTP_PASSWORD", "hunter2-secret")
        get_settings.cache_clear()

    def _warnings(self, caplog):
        return [r for r in caplog.records if r.name == self.LOGGER and r.levelno == logging.WARNING]

    def _warn(self, caplog):
        caplog.set_level(logging.INFO, logger=self.LOGGER)
        evs.warn_if_app_base_url_is_local()
        return [r.getMessage() for r in self._warnings(caplog)]

    @pytest.mark.parametrize("value,host", [
        (None, "localhost"), ("http://localhost:24267/", "localhost"), ("http://127.0.0.1:8000", "127.0.0.1"),
        ("http://[::1]:24267", "::1"), ("http://0.0.0.0:24267", "0.0.0.0"), ("http://[::]:24267", "::"),
        ("https://chaotic.localhost", "chaotic.localhost"),
    ])
    def test_warns_without_smtp_on_a_local_host(self, no_smtp, base, caplog, value, host):
        base(value)
        (message,) = self._warn(caplog)
        assert f"APP_BASE_URL names {host}," in message and "SMTP is not configured" in message
        assert "The web UI and the CLI correct them" in message
        assert "chaotic system config set APP_BASE_URL" in message
        assert "/invite/" not in message

    @pytest.mark.parametrize("value", [None, "http://127.0.0.1:24267"])
    def test_warns_with_smtp_that_emailed_links_are_broken(self, smtp, base, caplog, value):
        base(value)
        (message,) = self._warn(caplog)
        assert "SMTP is configured" in message and "emailed links" in message
        assert "ritual-gate" in message and "team invitations" in message
        assert "hunter2" not in message and "smtp.example.com" not in message

    @pytest.mark.parametrize("value", ["https://chaotic.example.com", "http://10.0.0.5:24267", "http://[x"])
    def test_silent_on_a_reachable_or_unparseable_base(self, no_smtp, base, caplog, value):
        base(value)
        assert self._warn(caplog) == []

    def test_silent_with_smtp_on_a_reachable_base(self, smtp, base, caplog):
        base("https://chaotic.example.com")
        assert self._warn(caplog) == []

    def test_never_logs_credentials_in_the_base_url(self, no_smtp, base, caplog):
        base("http://admin:s3cret@localhost:24267")
        (message,) = self._warn(caplog)
        assert "s3cret" not in message and "admin" not in message

    @pytest.mark.parametrize("app_base_url,warns", [(None, True), ("https://chaotic.example.com", False)])
    async def test_the_lifespan_warns_once(self, no_smtp, base, caplog, monkeypatch, app_base_url, warns):
        """Drive app.main's real lifespan, with only its I/O stubbed."""
        import contextlib

        import app.main as main

        async def noop(*args, **kwargs):
            return None

        @contextlib.asynccontextmanager
        async def no_mcp():
            yield

        for name in ("init_oxyde", "close_oxyde", "bootstrap_if_empty", "verify_migrations_current",
                     "_mcp_toolset_fingerprint"):
            monkeypatch.setattr(main, name, noop)
        monkeypatch.setattr(main, "get_version_info", lambda *a, **k: None)
        monkeypatch.setattr(main, "mcp_lifespan", no_mcp)
        monkeypatch.setattr(main.settings, "secret_key", "x" * 32)
        base(app_base_url)
        caplog.set_level(logging.INFO, logger=self.LOGGER)
        async with main.lifespan(main.app):
            pass
        assert len([r for r in self._warnings(caplog) if "APP_BASE_URL" in r.getMessage()]) == (1 if warns else 0)


class TestLocalHostTable:
    """The table the CLI twin and the web client's isLocalHost are tested
    against too (testdata/local-hosts.json)."""

    import json as _json
    from pathlib import Path as _Path

    TABLE = _json.loads((_Path(__file__).resolve().parents[2] / "testdata" / "local-hosts.json").read_text())

    @pytest.mark.parametrize("host", TABLE["local"])
    def test_local(self, host):
        from app.utils.local_host import is_local_host
        assert is_local_host(host) is True

    @pytest.mark.parametrize("host", TABLE["not_local"] + [None])
    def test_not_local(self, host):
        from app.utils.local_host import is_local_host
        assert is_local_host(host) is False


# ---------------------------------------------------------------------------
# Addresses are one account ignoring case (re-review R1, CHT-1789)
# ---------------------------------------------------------------------------


async def _make_user(email: str) -> OxydeUser:
    from app.utils.security import get_password_hash
    return await OxydeUser.objects.create(
        email=email, hashed_password=get_password_hash("password123"), name=email,
    )


async def _make_legacy_variant(email: str) -> OxydeUser:
    """An account that predates the signup check and shares its address,
    ignoring case, with an older one: as migration 0034 leaves it, with
    no email_folded (CHT-1804). The database refuses to create one now,
    so it is made under a placeholder and cleared."""
    from app.utils.security import get_password_hash
    user = await OxydeUser.objects.create(
        email=email, email_folded=f"placeholder:{secrets.token_hex(8)}",
        hashed_password=get_password_hash("password123"), name=email,
    )
    await OxydeUser.objects.filter(id=user.id).update(email_folded=None)
    return await OxydeUser.objects.get(id=user.id)


class TestCaseInsensitiveAddresses:
    @pytest.mark.parametrize("variant", ["TEST@example.com", "Test@Example.com", " test@EXAMPLE.COM"])
    async def test_a_case_variant_signup_is_refused(self, client, test_user, variant):
        response = await client.post("/api/auth/signup", json={
            "email": variant, "password": "password123", "name": "Variant",
        })
        assert response.status_code == 400
        assert response.json()["detail"] == "Email already registered"
        assert await OxydeUser.objects.count() == 1

    async def test_the_variant_lockout_cannot_be_set_up(self, client, auth_headers, test_user, outbox):
        """The attack: a second account at a case variant spends the
        victim's shared limits. The variant account cannot exist."""
        response = await client.post("/api/auth/signup", json={
            "email": "Test@Example.com", "password": "password123", "name": "Attacker",
        })
        assert response.status_code == 400
        # The victim's bucket is untouched: a code goes out.
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202

    @pytest.mark.parametrize("typed", ["test@example.com", "TEST@EXAMPLE.COM", "Test@Example.com"])
    async def test_login_works_in_any_case(self, client, test_user, typed):
        response = await client.post("/api/auth/login", json={"email": typed, "password": "testpassword123"})
        assert response.status_code == 200, response.text

    async def test_login_prefers_the_exact_address(self, client, db):
        # Two accounts that predate the signup check.
        exact = await _make_user("Pair@example.com")
        await _make_legacy_variant("pair@example.com")
        response = await client.post("/api/auth/login", json={"email": "Pair@example.com", "password": "password123"})
        assert response.status_code == 200
        me = await client.get("/api/auth/me", headers={"Authorization": f"Bearer {response.json()['access_token']}"})
        assert me.json()["id"] == exact.id

    async def test_an_ambiguous_case_insensitive_login_is_refused(self, client, db):
        await _make_user("Pair@example.com")
        await _make_legacy_variant("pair@example.com")
        response = await client.post("/api/auth/login", json={"email": "PAIR@example.com", "password": "password123"})
        assert response.status_code == 401

    @pytest.mark.parametrize("stored, typed", [
        ("a_b@example.com", "aXb@example.com"),
        ("a%b@example.com", "aZZb@example.com"),
        # The pattern side carrying the wildcard: must not match a lookalike.
        ("aXb@example.com", "a_b@example.com"),
        ("aZZb@example.com", "a%b@example.com"),
        ("a\\b@example.com", "ab@example.com"),
    ])
    async def test_wildcards_in_an_address_match_only_themselves(self, client, db, stored, typed):
        from app.services.user_service import UserService
        user = await _make_user(stored)
        service = UserService()
        assert await service.find_by_email_ignoring_case(typed) == []
        assert await service.get_by_email_ignoring_case(typed) is None
        assert [u.id for u in await service.find_by_email_ignoring_case(stored.upper())] == [user.id]
        response = await client.post("/api/auth/signup", json={
            "email": "a_c@example.com", "password": "password123", "name": "Other",
        })
        assert response.status_code == 201, response.text

    async def test_a_wildcard_signup_does_not_collide_with_a_lookalike(self, client, db):
        await _make_user("aXb@example.com")
        response = await client.post("/api/auth/signup", json={
            "email": "a_b@example.com", "password": "password123", "name": "Underscore",
        })
        assert response.status_code == 201, response.text

    async def test_an_empty_address_matches_nothing(self, db):
        from app.services.user_service import UserService
        assert await UserService().find_by_email_ignoring_case("  ") == []

    async def test_accept_ignores_case(self, client, test_team, test_user, no_smtp):
        bob = await _make_user("Bob@Example.com")
        token = await _invite(test_team.id, test_user.id, "bob@example.com")
        headers = {"Authorization": f"Bearer {create_access_token(data={'sub': bob.id})}"}
        response = await _accept(client, token, headers)
        assert response.status_code == 200, response.text

    async def test_accept_ignores_case_after_verifying(self, client, test_team, test_user, outbox):
        bob = await _make_user("Bob@Example.com")
        token = await _invite(test_team.id, test_user.id, "bob@example.com")
        headers = {"Authorization": f"Bearer {create_access_token(data={'sub': bob.id})}"}
        await client.post(REQUEST, headers=headers)
        assert (await client.post(CONFIRM, headers=headers, json={"code": outbox.last_code()})).status_code == 200
        assert (await _accept(client, token, headers)).status_code == 200

    async def test_inviting_an_existing_member_in_another_case_is_refused(
        self, client, auth_headers, test_team, test_user,
    ):
        response = await client.post(
            f"/api/teams/{test_team.id}/invitations", headers=auth_headers, json={"email": "TEST@example.com"},
        )
        assert response.status_code == 400
        assert response.json()["detail"] == "User is already a team member"

    def test_folding_is_ascii_only(self):
        from app.utils.email_address import fold_email, same_email
        assert fold_email(" Alice@Corp.COM ") == "alice@corp.com"
        assert same_email("Bob@Example.com", "bob@example.com")
        # SQLite's LIKE folds ASCII only; so does the comparison.
        assert not same_email("\u00c4@x.com", "\u00e4@x.com")
        assert evs.hash_email("Alice@Corp.com") == evs.hash_email("alice@corp.com")


class TestOneAccountPerAddress:
    """The database holds the rule (CHT-1804): users.email_folded is unique."""

    async def test_every_way_of_making_an_account_sets_the_folded_address(
        self, client, test_user, test_team,
    ):
        from app.schemas.agent import AgentCreate
        from app.services.agent_service import AgentService
        from app.utils.email_address import fold_email

        signup = await client.post("/api/auth/signup", json={
            "email": "New.Person@Example.com", "password": "password123", "name": "New",
        })
        assert signup.status_code == 201, signup.text
        agent, _key, _key_id = await AgentService().create(AgentCreate(name="Bot"), test_user, test_team.id)
        users = await OxydeUser.objects.all()
        assert {test_user.id, agent.id, signup.json()["id"]} <= {u.id for u in users}
        for user in users:
            assert user.email_folded == fold_email(user.email), user.email
        made = await OxydeUser.objects.get(id=signup.json()["id"])
        assert made.email == "New.Person@example.com"
        assert made.email_folded == "new.person@example.com"

    async def test_the_database_refuses_a_case_variant(self, test_user):
        from oxyde import IntegrityError
        with pytest.raises(IntegrityError):
            await _make_user("TEST@Example.COM")
        assert await OxydeUser.objects.count() == 1

    async def test_a_signup_that_raced_past_the_check_gets_the_same_400(self, client, test_user):
        """Two signups for one address racing: both pass the lookup before
        either inserts. The second INSERT fails on the unique index and
        gets the answer the lookup would have given."""
        from app.services.user_service import UserService

        async def nobody_yet(self, email):
            return []

        with patch.object(UserService, "find_by_email_ignoring_case", nobody_yet):
            response = await client.post("/api/auth/signup", json={
                "email": "Test@Example.com", "password": "password123", "name": "Racer",
            })
        assert response.status_code == 400
        assert response.json()["detail"] == "Email already registered"
        assert await OxydeUser.objects.count() == 1

    async def test_only_an_address_collision_means_taken(self, test_user):
        """Any other constraint failure on the INSERT is a real fault and
        stays one, not a misleading 'Email already registered'."""
        from oxyde import IntegrityError
        from app.schemas.user import UserCreate
        from app.services.user_service import EmailTakenError, UserService

        user_in = UserCreate(email="other@example.com", password="password123", name="Other")

        async def fails(message):
            async def create(*args, **kwargs):
                raise IntegrityError(message)
            return create

        for message, expected in (
            ("Query failed: UNIQUE constraint failed: users.email_folded", EmailTakenError),
            ("Query failed: UNIQUE constraint failed: users.email", EmailTakenError),
            ("Query failed: NOT NULL constraint failed: users.name", IntegrityError),
            ("Query failed: UNIQUE constraint failed: users.agent_team_id, users.external_ref", IntegrityError),
        ):
            with patch.object(type(OxydeUser.objects), "create", await fails(message)):
                with pytest.raises(expected) as caught:
                    await UserService().create(user_in)
            assert (type(caught.value) is EmailTakenError) == (expected is EmailTakenError), message

    async def test_a_local_address_is_refused_at_signup(self, client, db):
        response = await client.post("/api/auth/signup", json={
            "email": "bob@host.local", "password": "password123", "name": "Local",
        })
        assert response.status_code == 422
        assert await OxydeUser.objects.count() == 0

    async def test_fold_email_matches_sqlite_for_a_non_ascii_address(self, db):
        """The migration folds in SQL (lower(trim(email))), the app in
        Python; they must agree, non-ASCII letters included: SQLite's
        built-in lower() and fold_email both leave them alone."""
        from oxyde import execute_raw
        from app.services.user_service import UserService
        from app.utils.email_address import fold_email

        stored = ["Ärger@Example.COM", "Jörg@Bücher.example", "Plain@Example.com"]
        for email in stored:
            await _make_user(email)
        rows = await execute_raw("SELECT email, lower(trim(email)) AS folded, email_folded FROM users", [])
        assert len(rows) == len(stored)
        for row in rows:
            assert row["folded"] == fold_email(row["email"]) == row["email_folded"]
        assert fold_email("Ärger@Example.COM") == "Ärger@example.com"

        service = UserService()
        found = await service.find_by_email_ignoring_case("ÄRGER@example.com")
        assert [u.email for u in found] == ["Ärger@Example.COM"]
        # A non-ASCII letter in the other case is another address.
        assert await service.find_by_email_ignoring_case("ärger@example.com") == []

    async def test_a_legacy_variant_keeps_working(self, client, db):
        """An account 0034 left without email_folded logs in by its exact
        address, and a third account at the address is still refused."""
        await _make_user("Pair@example.com")
        variant = await _make_legacy_variant("pair@example.com")
        response = await client.post("/api/auth/login", json={"email": "pair@example.com", "password": "password123"})
        assert response.status_code == 200
        me = await client.get("/api/auth/me", headers={"Authorization": f"Bearer {response.json()['access_token']}"})
        assert me.json()["id"] == variant.id
        signup = await client.post("/api/auth/signup", json={
            "email": "PAIR@example.com", "password": "password123", "name": "Third",
        })
        assert signup.status_code == 400

    async def test_startup_warns_about_accounts_without_a_folded_address(self, db, caplog):
        from app.services.user_service import warn_if_accounts_share_an_address

        await _make_user("Solo@example.com")
        with caplog.at_level(logging.WARNING, logger="app.services.user_service"):
            assert await warn_if_accounts_share_an_address() == 0
        assert not caplog.records

        await _make_user("Pair@example.com")
        await _make_legacy_variant("pair@example.com")
        await _make_legacy_variant("PAIR@example.com")
        with caplog.at_level(logging.WARNING, logger="app.services.user_service"):
            assert await warn_if_accounts_share_an_address() == 2
        assert "2 account(s) share an email address" in caplog.text
        # By count only: no address in the log.
        assert "pair@" not in caplog.text.lower()


class TestInvitationAddresses:
    """Invitations treat addresses as accounts do (CHT-1804)."""

    async def test_a_second_invitation_in_another_case_is_refused(
        self, client, auth_headers, test_team, no_smtp,
    ):
        url = f"/api/teams/{test_team.id}/invitations"
        assert (await client.post(url, headers=auth_headers, json={"email": "bob@example.com"})).status_code == 201
        response = await client.post(url, headers=auth_headers, json={"email": "Bob@EXAMPLE.com"})
        assert response.status_code == 409
        assert await OxydeTeamInvitation.objects.filter(team_id=test_team.id).count() == 1

    async def test_get_live_invitation_ignores_case_but_not_lookalikes(self, test_team, test_user):
        from app.services.team_service import TeamService
        await _invite(test_team.id, test_user.id, "a_b@example.com")
        service = TeamService()
        assert await service.get_live_invitation(test_team.id, "A_B@Example.com") is not None
        assert await service.get_live_invitation(test_team.id, "aXb@example.com") is None
        assert await service.get_live_invitation(test_team.id, "  ") is None
        # A non-ASCII capital: email__iexact never matched this on SQLite.
        await _invite(test_team.id, test_user.id, "\u00c4rger@example.com")
        assert await service.get_live_invitation(test_team.id, "\u00c4RGER@Example.com") is not None
        assert await service.get_live_invitation(test_team.id, "\u00e4rger@example.com") is None

    async def test_an_invitation_address_is_validated_and_normalised(
        self, client, auth_headers, test_team, no_smtp,
    ):
        url = f"/api/teams/{test_team.id}/invitations"
        assert (await client.post(url, headers=auth_headers, json={"email": "not an address"})).status_code == 422
        assert (await client.post(url, headers=auth_headers, json={"email": "bob@host.local"})).status_code == 422
        # The domain is normalised as on signup: lowercased, and an IDN
        # domain given in punycode is stored in the form signup stores.
        response = await client.post(url, headers=auth_headers, json={"email": "Bob@xn--bcher-kva.example"})
        assert response.status_code == 201, response.text
        assert response.json()["email"] == "Bob@bücher.example"

    async def test_inviting_a_legacy_pair_is_refused_if_either_is_a_member(
        self, client, auth_headers, test_team, test_user,
    ):
        """test@example.com is a member; TEST@example.com is a second,
        older-database account at the same address that is not. The
        address is already on the team (before: the lookup saw two
        accounts, returned neither, and the invitation went out)."""
        await _make_legacy_variant("TEST@example.com")
        response = await client.post(
            f"/api/teams/{test_team.id}/invitations", headers=auth_headers, json={"email": "Test@example.com"},
        )
        assert response.status_code == 400
        assert response.json()["detail"] == "User is already a team member"


class TestRetryAfterBoundary:
    """A client that waits exactly its Retry-After is let through (CHT-1804)."""

    def test_seconds_round_up(self):
        now = datetime(2026, 10, 15, tzinfo=timezone.utc)
        assert evs._seconds_until(now + timedelta(seconds=5, microseconds=500), now) == 6
        assert evs._seconds_until(now + timedelta(seconds=5), now) == 5
        assert evs._seconds_until(now + timedelta(microseconds=1), now) == 1

    async def test_the_hourly_limit_lapses_exactly_at_retry_after(
        self, client, auth_headers, test_user, outbox, monkeypatch,
    ):
        start = datetime(2026, 10, 15, 12, 0, tzinfo=timezone.utc)
        clock = {"now": start}
        monkeypatch.setattr(evs, "_now", lambda: clock["now"])
        for i in range(evs.HOURLY_LIMIT):
            clock["now"] = start + timedelta(minutes=2 * i)
            assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202
        clock["now"] = start + timedelta(minutes=10)
        refused = await client.post(REQUEST, headers=auth_headers)
        assert refused.status_code == 429
        retry = int(refused.headers["Retry-After"])
        assert retry == 50 * 60
        clock["now"] += timedelta(seconds=retry)
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202

    async def test_the_resend_interval_lapses_exactly_at_retry_after(
        self, client, auth_headers, test_user, outbox, monkeypatch,
    ):
        start = datetime(2026, 10, 15, 12, 0, tzinfo=timezone.utc)
        clock = {"now": start}
        monkeypatch.setattr(evs, "_now", lambda: clock["now"])
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202
        clock["now"] = start + timedelta(seconds=20, microseconds=300)
        refused = await client.post(REQUEST, headers=auth_headers)
        assert refused.status_code == 429
        retry = int(refused.headers["Retry-After"])
        assert retry == 40
        clock["now"] += timedelta(seconds=retry)
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202
