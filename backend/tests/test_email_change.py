"""A person changes their own address (CHT-1827), and an address freed by
a delete or a change goes to an account migration 0034 left without one.

No real email is sent: EmailService.send is replaced by a recorder (the
Outbox of test_email_verification).
"""
import logging
import secrets
from datetime import datetime, timezone

import pytest

from app.config import get_settings
from app.oxyde_models.email_verification import OxydeEmailVerificationCode
from app.oxyde_models.user import OxydeUser
from app.services import email_service as email_service_module
from app.services import user_service as user_service_module
from app.services.user_service import (
    UserService,
    give_free_addresses_to_legacy_accounts,
    warn_if_accounts_share_an_address,
)
from app.utils.security import create_access_token, get_password_hash

from .test_email_verification import CONFIRM, REQUEST, Outbox, _make_legacy_variant, _make_user

CHANGE = "/api/auth/email"
PASSWORD = "testpassword123"


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

    monkeypatch.setattr(email_service_module.EmailService, "send", send)
    return box


@pytest.fixture(autouse=True)
def _fresh_state():
    get_settings.cache_clear()
    user_service_module.email_change_attempts.clear()
    user_service_module.email_changes.clear()
    yield
    get_settings.cache_clear()
    user_service_module.email_change_attempts.clear()
    user_service_module.email_changes.clear()


async def _change(client, headers, email, password=PASSWORD):
    response = await client.post(CHANGE, headers=headers, json={"email": email, "password": password})
    await email_service_module.drain()
    return response


def _headers(user) -> dict:
    return {"Authorization": f"Bearer {create_access_token(data={'sub': user.id})}"}


async def _fresh(user) -> OxydeUser:
    return await OxydeUser.objects.get(id=user.id)


class TestChangeEmail:
    async def test_changes_the_address_and_unverifies_it(self, client, auth_headers, test_user, no_smtp):
        await OxydeUser.objects.filter(id=test_user.id).update(email_verified_at=datetime.now(timezone.utc))
        response = await _change(client, auth_headers, "New.Address@Example.com")
        assert response.status_code == 200, response.text
        body = response.json()
        assert body["email"] == "New.Address@example.com"  # EmailStr lowercases the domain
        assert body["email_verified_at"] is None
        user = await _fresh(test_user)
        assert user.email == body["email"]
        assert user.email_folded == "new.address@example.com"
        assert user.email_verified_at is None

    async def test_logs_in_by_the_new_address_and_not_the_old(self, client, auth_headers, test_user, no_smtp):
        assert (await _change(client, auth_headers, "moved@example.com")).status_code == 200
        new = await client.post("/api/auth/login", json={"email": "Moved@example.com", "password": PASSWORD})
        assert new.status_code == 200
        old = await client.post("/api/auth/login", json={"email": "test@example.com", "password": PASSWORD})
        assert old.status_code == 401

    async def test_sessions_stay_valid(self, client, auth_headers, test_user, no_smtp):
        assert (await _change(client, auth_headers, "moved@example.com")).status_code == 200
        me = await client.get("/api/auth/me", headers=auth_headers)
        assert me.status_code == 200
        assert me.json()["email"] == "moved@example.com"

    async def test_a_case_only_change_is_allowed(self, client, auth_headers, test_user, no_smtp):
        response = await _change(client, auth_headers, "Test@example.com")
        assert response.status_code == 200, response.text
        assert (await _fresh(test_user)).email_folded == "test@example.com"

    async def test_the_same_address_is_refused(self, client, auth_headers, test_user, no_smtp):
        response = await _change(client, auth_headers, "test@example.com")
        assert response.status_code == 400
        assert response.json()["detail"]["error_code"] == "email_unchanged"

    async def test_a_wrong_password_and_a_taken_address_get_one_answer(
        self, client, auth_headers, test_user, test_user2, no_smtp,
    ):
        wrong = await _change(client, auth_headers, "free@example.com", password="not-the-password")
        taken = await _change(client, auth_headers, "TEST2@example.com")
        assert wrong.status_code == taken.status_code == 400
        assert wrong.json() == taken.json()
        assert wrong.json()["detail"]["error_code"] == "email_change_refused"
        assert (await _fresh(test_user)).email == "test@example.com"

    async def test_an_address_held_by_a_legacy_account_is_refused(self, client, auth_headers, test_user, no_smtp):
        await _make_user("Pair@example.com")
        await _make_legacy_variant("pair@example.com")
        response = await _change(client, auth_headers, "PAIR@example.com")
        assert response.json()["detail"]["error_code"] == "email_change_refused"

    async def test_a_legacy_account_moving_to_a_free_address_gets_its_folded_form(self, client, no_smtp):
        await _make_user("Pair@example.com")
        variant = await _make_legacy_variant("pair@example.com")
        # It cannot move to another case of the held address.
        held = await _change(client, _headers(variant), "PAIR@example.com", password="password123")
        assert held.json()["detail"]["error_code"] == "email_change_refused"
        response = await _change(client, _headers(variant), "own@example.com", password="password123")
        assert response.status_code == 200, response.text
        assert (await _fresh(variant)).email_folded == "own@example.com"
        assert await warn_if_accounts_share_an_address() == 0

    async def test_the_database_refusing_the_address_gets_the_same_answer(
        self, client, auth_headers, test_user, test_user2, no_smtp, monkeypatch,
    ):
        """A signup that takes the address between the check and the write."""
        async def nobody(self, email):
            return []
        monkeypatch.setattr(UserService, "find_by_email_ignoring_case", nobody)
        response = await _change(client, auth_headers, "Test2@example.com")
        assert response.status_code == 400
        assert response.json()["detail"]["error_code"] == "email_change_refused"

    async def test_an_agent_is_refused(self, client, agent_headers, no_smtp):
        response = await _change(client, agent_headers, "agent@example.com")
        assert response.status_code == 403
        assert response.json()["detail"]["error_code"] == "human_required"

    async def test_an_account_with_no_password_is_refused(self, client, db, no_smtp):
        user = await OxydeUser.objects.create(email="nopw@example.com", hashed_password="", name="No PW")
        response = await _change(client, _headers(user), "elsewhere@example.com", password="x")
        assert response.status_code == 403

    async def test_an_invalid_address_is_a_validation_error(self, client, auth_headers, test_user, no_smtp):
        assert (await _change(client, auth_headers, "not an address")).status_code == 422

    async def test_tries_are_rate_limited(self, client, auth_headers, test_user, no_smtp):
        for _ in range(user_service_module.EMAIL_CHANGE_ATTEMPTS_PER_HOUR):
            response = await _change(client, auth_headers, "free@example.com", password="wrong-password")
            assert response.status_code == 400
        # Over the limit even the right password is refused, before any check.
        response = await _change(client, auth_headers, "free@example.com")
        assert response.status_code == 429
        assert response.json()["detail"]["error_code"] == "email_change_rate_limited"
        assert response.headers["Retry-After"]
        assert (await _fresh(test_user)).email == "test@example.com"

    async def test_changes_are_rate_limited(self, client, auth_headers, test_user, no_smtp):
        for n in range(user_service_module.EMAIL_CHANGES_PER_DAY):
            assert (await _change(client, auth_headers, f"move{n}@example.com")).status_code == 200
        user_service_module.email_change_attempts.clear()
        response = await _change(client, auth_headers, "one-more@example.com")
        assert response.status_code == 429

    async def test_a_refused_change_does_not_count_as_a_change(self, client, auth_headers, test_user, test_user2, no_smtp):
        for _ in range(user_service_module.EMAIL_CHANGES_PER_DAY):
            await _change(client, auth_headers, "test2@example.com")
            user_service_module.email_change_attempts.clear()
        assert (await _change(client, auth_headers, "free@example.com")).status_code == 200

    async def test_the_change_is_logged_by_id_only(self, client, auth_headers, test_user, no_smtp, caplog):
        with caplog.at_level(logging.INFO, logger="app.services.user_service"):
            assert (await _change(client, auth_headers, "secret-new@example.com")).status_code == 200
        assert test_user.id in caplog.text
        assert "secret-new" not in caplog.text
        assert "test@example.com" not in caplog.text


class TestNoticeAndCodes:
    async def test_with_smtp_the_old_address_gets_a_notice(self, client, auth_headers, test_user, outbox):
        assert (await _change(client, auth_headers, "moved@example.com")).status_code == 200
        [(to, subject, body)] = outbox.sent
        assert to == "test@example.com"
        assert "changed" in subject
        assert "moved@example.com" not in body

    async def test_without_smtp_nothing_is_sent(self, client, auth_headers, test_user, no_smtp, monkeypatch):
        box = Outbox()

        async def send(self, to, subject, body):
            return await box.send(self, to, subject, body)
        monkeypatch.setattr(email_service_module.EmailService, "send", send)
        assert (await _change(client, auth_headers, "moved@example.com")).status_code == 200
        assert box.sent == []

    async def test_a_code_sent_to_the_old_address_stops_working(self, client, auth_headers, test_user, outbox):
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202
        code = outbox.last_code()
        assert (await _change(client, auth_headers, "moved@example.com")).status_code == 200
        [row] = await OxydeEmailVerificationCode.objects.filter(user_id=test_user.id).all()
        assert row.expires_at <= datetime.now(timezone.utc)
        response = await client.post(CONFIRM, headers=auth_headers, json={"code": code})
        assert response.status_code == 400
        # Even back at the old address, the old code is dead.
        user_service_module.email_change_attempts.clear()
        assert (await _change(client, auth_headers, "test@example.com")).status_code == 200
        response = await client.post(CONFIRM, headers=auth_headers, json={"code": code})
        assert response.status_code == 400
        assert (await _fresh(test_user)).email_verified_at is None

    async def test_the_new_address_can_be_verified(self, client, auth_headers, test_user, outbox):
        assert (await _change(client, auth_headers, "moved@example.com")).status_code == 200
        assert (await client.post(REQUEST, headers=auth_headers)).status_code == 202
        assert outbox.sent[-1][0] == "moved@example.com"
        response = await client.post(CONFIRM, headers=auth_headers, json={"code": outbox.last_code()})
        assert response.status_code == 200
        assert response.json()["email_verified_at"] is not None


class TestFreedAddresses:
    async def test_a_delete_gives_the_address_to_the_next_oldest_account(self, db):
        holder = await _make_user("Pair@example.com")
        first = await _make_legacy_variant("pair@example.com")
        second = await _make_legacy_variant("PAIR@example.com")
        await UserService().delete(holder)
        assert (await _fresh(first)).email_folded == "pair@example.com"
        assert (await _fresh(second)).email_folded is None
        assert await warn_if_accounts_share_an_address() == 1

    async def test_a_change_gives_the_old_address_to_the_next_oldest_account(self, client, no_smtp):
        holder = await _make_user("Pair@example.com")
        variant = await _make_legacy_variant("pair@example.com")
        response = await _change(client, _headers(holder), "elsewhere@example.com", password="password123")
        assert response.status_code == 200, response.text
        assert (await _fresh(variant)).email_folded == "pair@example.com"

    async def test_startup_gives_out_addresses_deleted_by_hand(self, db, caplog):
        holder = await _make_user("Pair@example.com")
        variant = await _make_legacy_variant("pair@example.com")
        await OxydeUser.objects.filter(id=holder.id).delete()
        with caplog.at_level(logging.INFO, logger="app.services.user_service"):
            assert await warn_if_accounts_share_an_address() == 0
        assert (await _fresh(variant)).email_folded == "pair@example.com"
        assert variant.id in caplog.text
        assert "pair@" not in caplog.text.lower()

    async def test_a_held_address_is_not_given_out(self, db):
        await _make_user("Pair@example.com")
        variant = await _make_legacy_variant("pair@example.com")
        assert await give_free_addresses_to_legacy_accounts() == []
        assert (await _fresh(variant)).email_folded is None

    async def test_an_address_with_a_nul_is_left_alone(self, db):
        variant = await _make_legacy_variant("odd\x00@example.com")
        assert await give_free_addresses_to_legacy_accounts() == []
        assert (await _fresh(variant)).email_folded is None

    async def test_a_lost_race_leaves_the_row_null(self, db, monkeypatch):
        """Another writer takes the address between the check and the
        UPDATE: the unique index refuses it, and the row stays NULL."""
        variant = await _make_legacy_variant("race@example.com")
        real_first = type(OxydeUser.objects.filter(id="x")).first

        async def taken_after_check(self):
            result = await real_first(self)
            if not getattr(taken_after_check, "done", False):
                taken_after_check.done = True
                await OxydeUser.objects.create(
                    email=f"other-{secrets.token_hex(4)}@example.com", email_folded="race@example.com",
                    hashed_password=get_password_hash("x"), name="racer",
                )
            return result
        monkeypatch.setattr(type(OxydeUser.objects.filter(id="x")), "first", taken_after_check)
        assert await give_free_addresses_to_legacy_accounts() == []
        assert (await _fresh(variant)).email_folded is None

    async def test_the_warning_points_at_the_tooling(self, db, caplog):
        await _make_user("Pair@example.com")
        await _make_legacy_variant("pair@example.com")
        with caplog.at_level(logging.WARNING, logger="app.services.user_service"):
            assert await warn_if_accounts_share_an_address() == 1
        assert "chaotic system audit shared-addresses" in caplog.text
        assert "chaotic auth change-email" in caplog.text


async def test_the_limiter_peek_records_nothing():
    from app.oauth.ratelimit import SlidingWindowLimiter

    limiter = SlidingWindowLimiter(60)
    assert not limiter.is_full("k", 1, now=0)
    assert limiter.allow("k", 1, now=0)
    assert limiter.is_full("k", 1, now=1)
    assert not limiter.is_full("k", 1, now=61)
    assert not limiter.is_full("k", 2, now=1)


@pytest.mark.parametrize("email", [
    "Bob@Example.com", " bob@example.com ", "Tab@example.com\t", " nb@x.com ",
    "Ärger@Example.COM", "\n\rA@B.C\x0b\x0c", "", "O'Brien@x.com",
])
def test_the_cli_audit_folds_exactly_as_the_app_does(email):
    """`chaotic system audit shared-addresses` carries its own copy of
    fold_email (the CLI cannot import the server); it must stay in step."""
    import ast
    from pathlib import Path

    from app.utils.email_address import fold_email

    path = Path(__file__).resolve().parents[2] / "cli" / "src" / "cli" / "system.py"
    tree = ast.parse(path.read_text())
    wanted = [
        node for node in tree.body
        if (isinstance(node, ast.FunctionDef) and node.name == "_fold_email")
        or (isinstance(node, ast.Assign) and any(getattr(t, "id", None) == "_ASCII_FOLD" for t in node.targets))
    ]
    assert len(wanted) == 2
    namespace: dict = {}
    exec(compile(ast.Module(body=wanted, type_ignores=[]), str(path), "exec"), namespace)
    assert namespace["_fold_email"](email) == fold_email(email)
