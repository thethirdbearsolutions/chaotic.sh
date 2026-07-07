"""Tests for EmailService (CHT-1251): template rendering + the fail-soft
(unconfigured) / fail-loud (configured but failing) send matrix.

No real email is ever sent -- every send() test mocks smtplib.SMTP.
"""
from unittest.mock import MagicMock, patch

import pytest

from app.config import get_settings
from app.services.email_service import EmailService, fire_and_forget


@pytest.fixture(autouse=True)
def _clear_settings_cache():
    """get_settings() is @lru_cache'd; tests that set/unset SMTP_* env
    vars need a fresh Settings() to see them (and must not leak into
    later tests, hence clearing both before and after).
    """
    get_settings.cache_clear()
    yield
    get_settings.cache_clear()


# ---------------------------------------------------------------------------
# Templates -- pure functions, no I/O
# ---------------------------------------------------------------------------

class TestRenderGatePending:
    def test_includes_all_fields(self):
        subject, body = EmailService().render_gate_pending(
            requested_by_name="Alice",
            issue_identifier="PRJ-1",
            issue_title="Fix the thing",
            ritual_name="deploy_check",
            ritual_prompt="Did you deploy?",
        )
        assert "PRJ-1" in subject
        assert "Alice" in body
        assert "Fix the thing" in body
        assert "deploy_check" in body
        assert "Did you deploy?" in body

    def test_includes_url_when_given(self):
        _, body = EmailService().render_gate_pending(
            requested_by_name="Alice", issue_identifier="PRJ-1", issue_title="x",
            ritual_name="r", ritual_prompt="p", issue_url="https://example.com/issue/PRJ-1",
        )
        assert "https://example.com/issue/PRJ-1" in body

    def test_omits_url_section_when_not_given(self):
        _, body = EmailService().render_gate_pending(
            requested_by_name="Alice", issue_identifier="PRJ-1", issue_title="x",
            ritual_name="r", ritual_prompt="p",
        )
        assert "http" not in body

    def test_is_plain_text_no_html(self):
        _, body = EmailService().render_gate_pending(
            requested_by_name="Alice", issue_identifier="PRJ-1", issue_title="x",
            ritual_name="r", ritual_prompt="p",
        )
        assert "<" not in body and ">" not in body


class TestRenderInvitation:
    def test_includes_all_fields(self):
        subject, body = EmailService().render_invitation(
            team_name="Acme", role="member", invited_by_name="Bob",
            accept_url="https://example.com/invite/tok123",
        )
        assert "Acme" in subject
        assert "Bob" in subject
        assert "https://example.com/invite/tok123" in body
        assert "7 days" in body

    def test_is_plain_text_no_html(self):
        _, body = EmailService().render_invitation(
            team_name="Acme", role="member", invited_by_name="Bob",
            accept_url="https://example.com/invite/tok123",
        )
        assert "<" not in body and ">" not in body


# ---------------------------------------------------------------------------
# is_configured
# ---------------------------------------------------------------------------

class TestIsConfigured:
    def test_false_when_smtp_host_empty(self, monkeypatch):
        monkeypatch.delenv("SMTP_HOST", raising=False)
        get_settings.cache_clear()
        assert EmailService().is_configured() is False

    def test_true_when_smtp_host_set(self, monkeypatch):
        monkeypatch.setenv("SMTP_HOST", "smtp.example.com")
        get_settings.cache_clear()
        assert EmailService().is_configured() is True


# ---------------------------------------------------------------------------
# send() -- fail-soft (unconfigured) / fail-loud (configured but failing) matrix
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
class TestSend:
    async def test_unconfigured_skips_without_raising(self, monkeypatch):
        monkeypatch.delenv("SMTP_HOST", raising=False)
        get_settings.cache_clear()
        sent = await EmailService().send("a@example.com", "subj", "body")
        assert sent is False

    async def test_no_recipient_skips_without_raising(self, monkeypatch):
        monkeypatch.setenv("SMTP_HOST", "smtp.example.com")
        get_settings.cache_clear()
        sent = await EmailService().send("", "subj", "body")
        assert sent is False

    async def test_configured_success_sends_and_returns_true(self, monkeypatch):
        monkeypatch.setenv("SMTP_HOST", "smtp.example.com")
        monkeypatch.setenv("SMTP_PORT", "587")
        get_settings.cache_clear()

        mock_server = MagicMock()
        mock_server.has_extn.return_value = True
        with patch("smtplib.SMTP") as mock_smtp:
            mock_smtp.return_value.__enter__.return_value = mock_server
            sent = await EmailService().send("a@example.com", "Subject", "Body text")

        assert sent is True
        mock_server.starttls.assert_called_once()
        mock_server.send_message.assert_called_once()
        sent_msg = mock_server.send_message.call_args[0][0]
        assert sent_msg["To"] == "a@example.com"
        assert sent_msg["Subject"] == "Subject"

    async def test_login_called_when_smtp_user_configured(self, monkeypatch):
        monkeypatch.setenv("SMTP_HOST", "smtp.example.com")
        monkeypatch.setenv("SMTP_USER", "user@example.com")
        monkeypatch.setenv("SMTP_PASSWORD", "hunter2")
        get_settings.cache_clear()

        mock_server = MagicMock()
        mock_server.has_extn.return_value = True
        with patch("smtplib.SMTP") as mock_smtp:
            mock_smtp.return_value.__enter__.return_value = mock_server
            await EmailService().send("a@example.com", "subj", "body")

        mock_server.login.assert_called_once_with("user@example.com", "hunter2")

    async def test_login_skipped_when_no_smtp_user(self, monkeypatch):
        monkeypatch.setenv("SMTP_HOST", "smtp.example.com")
        monkeypatch.delenv("SMTP_USER", raising=False)
        get_settings.cache_clear()

        mock_server = MagicMock()
        mock_server.has_extn.return_value = True
        with patch("smtplib.SMTP") as mock_smtp:
            mock_smtp.return_value.__enter__.return_value = mock_server
            await EmailService().send("a@example.com", "subj", "body")

        mock_server.login.assert_not_called()

    async def test_configured_but_connection_fails_is_fail_loud_not_raised(self, monkeypatch, caplog):
        monkeypatch.setenv("SMTP_HOST", "smtp.example.com")
        get_settings.cache_clear()

        with patch("smtplib.SMTP", side_effect=ConnectionRefusedError("nope")):
            sent = await EmailService().send("a@example.com", "subj", "body")

        assert sent is False  # never raises -- caller's mutating path stays intact
        assert any(r.levelname == "ERROR" for r in caplog.records), (
            "a configured-but-failing send must log loudly (ERROR), not fail silently"
        )

    async def test_configured_but_auth_fails_is_fail_loud_not_raised(self, monkeypatch, caplog):
        monkeypatch.setenv("SMTP_HOST", "smtp.example.com")
        monkeypatch.setenv("SMTP_USER", "user@example.com")
        monkeypatch.setenv("SMTP_PASSWORD", "wrong")
        get_settings.cache_clear()

        mock_server = MagicMock()
        mock_server.has_extn.return_value = True
        mock_server.login.side_effect = Exception("535 Authentication failed")
        with patch("smtplib.SMTP") as mock_smtp:
            mock_smtp.return_value.__enter__.return_value = mock_server
            sent = await EmailService().send("a@example.com", "subj", "body")

        assert sent is False
        assert any(r.levelname == "ERROR" for r in caplog.records)


# ---------------------------------------------------------------------------
# fire_and_forget
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
class TestFireAndForget:
    async def test_runs_the_coroutine(self):
        ran = {"v": False}

        async def _job():
            ran["v"] = True

        task = fire_and_forget(_job())
        await task
        assert ran["v"] is True

    async def test_survives_gc_pressure_between_schedule_and_completion(self):
        """The fire_and_forget module keeps a strong reference to every
        scheduled task (in a module-level set) precisely so a caller that
        drops its own reference (as every real call site does -- see
        InboxService._dispatch_gate_pending_email) doesn't risk the task
        being garbage-collected mid-flight.
        """
        import gc
        from app.services import email_service

        ran = {"v": False}

        async def _job():
            ran["v"] = True

        fire_and_forget(_job())  # no local reference kept, on purpose
        gc.collect()
        # Give the event loop a few turns: one to run the task, one more
        # for its add_done_callback (scheduled via call_soon) to fire.
        import asyncio
        for _ in range(3):
            await asyncio.sleep(0)
        assert ran["v"] is True
        assert len(email_service._background_tasks) == 0  # discarded on completion
