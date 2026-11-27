"""A person changes their own password (CHT-2136).

No real email is sent: EmailService.send is replaced by a recorder.
"""
import pytest

from app.config import get_settings
from app.oxyde_models.user import OxydeUser
from app.services import email_service as email_service_module
from app.services import user_service as user_service_module
from app.utils.security import create_access_token, get_password_hash, verify_password

from .test_email_verification import Outbox

CHANGE = "/api/auth/password"
PASSWORD = "testpassword123"
NEW = "a-brand-new-password"


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
    user_service_module.password_change_attempts.clear()
    yield
    get_settings.cache_clear()
    user_service_module.password_change_attempts.clear()


async def _change(client, headers, new=NEW, current=PASSWORD):
    response = await client.post(CHANGE, headers=headers, json={"current_password": current, "new_password": new})
    await email_service_module.drain()
    return response


async def _fresh(user) -> OxydeUser:
    return await OxydeUser.objects.get(id=user.id)


class TestChangePassword:
    async def test_changes_the_password(self, client, auth_headers, test_user, no_smtp):
        response = await _change(client, auth_headers)
        assert response.status_code == 200, response.text
        assert response.json()["id"] == test_user.id
        assert "hashed_password" not in response.json()
        user = await _fresh(test_user)
        assert verify_password(NEW, user.hashed_password)
        assert not verify_password(PASSWORD, user.hashed_password)

    async def test_logs_in_with_the_new_password_only(self, client, auth_headers, test_user, no_smtp):
        assert (await _change(client, auth_headers)).status_code == 200
        old = await client.post("/api/auth/login", json={"email": test_user.email, "password": PASSWORD})
        new = await client.post("/api/auth/login", json={"email": test_user.email, "password": NEW})
        assert old.status_code == 401
        assert new.status_code == 200

    async def test_session_stays_valid(self, client, auth_headers, no_smtp):
        assert (await _change(client, auth_headers)).status_code == 200
        assert (await client.get("/api/auth/me", headers=auth_headers)).status_code == 200

    async def test_wrong_current_password_is_refused(self, client, auth_headers, test_user, no_smtp):
        response = await _change(client, auth_headers, current="not-my-password")
        assert response.status_code == 400
        assert response.json()["detail"]["error_code"] == "password_change_refused"
        assert verify_password(PASSWORD, (await _fresh(test_user)).hashed_password)

    async def test_same_password_is_refused(self, client, auth_headers, no_smtp):
        response = await _change(client, auth_headers, new=PASSWORD)
        assert response.status_code == 400
        assert response.json()["detail"]["error_code"] == "password_unchanged"

    @pytest.mark.parametrize("new", ["short", "x" * 73])
    async def test_new_password_length_is_checked(self, client, auth_headers, test_user, no_smtp, new):
        response = await _change(client, auth_headers, new=new)
        assert response.status_code == 422
        assert verify_password(PASSWORD, (await _fresh(test_user)).hashed_password)

    async def test_rate_limited_after_five_tries_an_hour(self, client, auth_headers, no_smtp):
        for _ in range(user_service_module.PASSWORD_CHANGE_ATTEMPTS_PER_HOUR):
            assert (await _change(client, auth_headers, current="wrong")).status_code == 400
        response = await _change(client, auth_headers)
        assert response.status_code == 429
        assert response.json()["detail"]["error_code"] == "password_change_rate_limited"
        assert int(response.headers["Retry-After"]) > 0

    async def test_requires_login(self, client, no_smtp):
        response = await client.post(CHANGE, json={"current_password": PASSWORD, "new_password": NEW})
        assert response.status_code == 401

    async def test_an_agent_is_refused(self, client, test_user, test_team, no_smtp):
        agent = await OxydeUser.objects.create(
            email="bot@example.com", hashed_password=get_password_hash(PASSWORD), name="Bot",
            is_agent=True, parent_user_id=test_user.id, agent_team_id=test_team.id,
        )
        headers = {"Authorization": f"Bearer {create_access_token(data={'sub': agent.id})}"}
        response = await _change(client, headers)
        assert response.status_code == 403
        assert response.json()["detail"]["error_code"] == "human_required"

    async def test_mails_a_notice_when_smtp_is_configured(self, client, auth_headers, test_user, outbox):
        assert (await _change(client, auth_headers)).status_code == 200
        assert [to for to, _, _ in outbox.sent] == [test_user.email]
        _, subject, body = outbox.sent[0]
        assert "password" in subject.lower()
        assert NEW not in body
