"""Email verification by mailed code, and the invitation gate on it (CHT-1790).

No real email is sent: EmailService.send is replaced by a recorder.
SMTP is "configured" by setting SMTP_HOST and clearing the settings cache.
"""
import re
import secrets
from datetime import datetime, timedelta, timezone

import pytest

from app.config import get_settings
from app.enums import InvitationStatus, TeamRole
from app.oxyde_models.email_verification import OxydeEmailVerificationCode
from app.oxyde_models.team import OxydeTeamInvitation, OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.services import email_verification_service as evs
from app.services.email_service import EmailService
from app.utils.security import create_access_token

pytestmark = pytest.mark.asyncio

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
        assert row.attempts == evs.MAX_ATTEMPTS
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

    async def test_codes_older_than_an_hour_are_pruned_and_stop_counting(self, client, auth_headers, test_user, outbox):
        for _ in range(evs.HOURLY_LIMIT):
            await client.post(REQUEST, headers=auth_headers)
            await _age_codes(test_user.id, timedelta(minutes=2))
        await _age_codes(test_user.id, timedelta(hours=1))
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202
        assert len(await _codes(test_user.id)) == 1

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
        assert await _codes(test_user.id) == []
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

    async def test_deleting_the_user_deletes_their_codes(self, client, auth_headers, test_user, outbox):
        await client.post(REQUEST, headers=auth_headers)
        assert (await client.delete("/api/users/me", headers=auth_headers)).status_code == 204
        assert await OxydeEmailVerificationCode.objects.filter(user_id=test_user.id).count() == 0

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


class TestUserResponse:
    async def test_get_user_carries_the_verification_time(self, client, auth_headers, test_user):
        now = datetime.now(timezone.utc)
        await OxydeUser.objects.filter(id=test_user.id).update(email_verified_at=now)
        body = (await client.get(f"/api/users/{test_user.id}", headers=auth_headers)).json()
        assert datetime.fromisoformat(body["email_verified_at"]) == now
