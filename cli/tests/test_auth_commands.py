"""Tests for auth CLI commands (CHT-887).

Tests cover: auth signup, login, logout, set-key, clear-key, whoami,
auth keys list, create, revoke.
"""
from unittest.mock import patch, MagicMock
import pytest


def _api_error(cls, message, status_code, detail):
    """An APIError as the client raises it; the test double takes no kwargs."""
    error = cls(message)
    error.status_code = status_code
    error.detail = detail
    return error


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


class TestAuthSignup:
    """Tests for auth signup command."""

    def test_signup_creates_and_logs_in(self, cli_runner):
        """auth signup creates account and logs in."""
        from cli.main import cli, client

        client.signup = MagicMock()
        client.login = MagicMock(return_value={"access_token": "new-token"})

        with patch('cli.main.set_token') as mock_set_token:
            result = cli_runner.invoke(cli, [
                'auth', 'signup',
                '--name', 'Alice',
                '--email', 'alice@test.com',
                '--password', 'secret123',
            ])

        assert result.exit_code == 0
        assert 'Account created' in result.output
        client.signup.assert_called_once_with('Alice', 'alice@test.com', 'secret123')
        mock_set_token.assert_called_once_with('new-token')


class TestAuthLogin:
    """Tests for auth login command."""

    def test_login_succeeds(self, cli_runner):
        """auth login stores token."""
        from cli.main import cli, client

        client.login = MagicMock(return_value={"access_token": "my-token"})

        with patch('cli.main.set_token') as mock_set_token:
            result = cli_runner.invoke(cli, [
                'auth', 'login',
                '--email', 'alice@test.com',
                '--password', 'secret',
            ])

        assert result.exit_code == 0
        assert 'Logged in' in result.output
        mock_set_token.assert_called_once_with('my-token')


class TestAuthLogout:
    """Tests for auth logout command."""

    def test_logout_clears_all(self, cli_runner):
        """auth logout clears token, key, team, project."""
        from cli.main import cli

        with patch('cli.main.set_token') as mock_token, \
             patch('cli.main.set_api_key') as mock_key, \
             patch('cli.main.set_current_team') as mock_team, \
             patch('cli.main.set_current_project') as mock_project:
            result = cli_runner.invoke(cli, ['auth', 'logout'])

        assert result.exit_code == 0
        assert 'Logged out' in result.output
        mock_token.assert_called_once_with(None)
        mock_key.assert_called_once_with(None)
        mock_team.assert_called_once_with(None)
        mock_project.assert_called_once_with(None)


class TestAuthSetKey:
    """Tests for auth set-key command."""

    def test_set_key_valid(self, cli_runner):
        """auth set-key with valid key sets it."""
        from cli.main import cli

        with patch('cli.main.set_api_key') as mock_set:
            result = cli_runner.invoke(cli, ['auth', 'set-key', 'ck_test123'])

        assert result.exit_code == 0
        assert 'API key set' in result.output
        mock_set.assert_called_once_with('ck_test123')

    def test_set_key_invalid_prefix(self, cli_runner):
        """auth set-key with invalid prefix shows error."""
        from cli.main import cli

        result = cli_runner.invoke(cli, ['auth', 'set-key', 'invalid-key'])

        assert result.exit_code != 0
        assert 'Invalid' in result.output


class TestAuthClearKey:
    """Tests for auth clear-key command."""

    def test_clear_key(self, cli_runner):
        """auth clear-key removes stored key."""
        from cli.main import cli

        with patch('cli.main.set_api_key') as mock_set:
            result = cli_runner.invoke(cli, ['auth', 'clear-key'])

        assert result.exit_code == 0
        assert 'cleared' in result.output.lower()
        mock_set.assert_called_once_with(None)


class TestAuthRename:
    """auth rename: a session identity renames itself (CHT-1918)."""

    def test_a_session_renames_itself(self, cli_runner):
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "id": "sess-1", "name": "Waterfall falls · 3c13b121", "is_agent": True, "kind": "session",
        })
        client.update_agent = MagicMock(return_value={"id": "sess-1", "name": "Piper"})

        result = cli_runner.invoke(cli, ['auth', 'rename', ' Piper '])

        assert result.exit_code == 0, result.output
        client.update_agent.assert_called_once_with("sess-1", name="Piper")
        assert "Piper" in result.output

    @pytest.mark.parametrize("me", [
        {"id": "u-1", "name": "Alice", "is_agent": False},
        {"id": "a-1", "name": "Helper", "is_agent": True, "kind": "assistant"},
    ])
    def test_anyone_else_is_pointed_at_agent_update(self, cli_runner, me):
        from cli.main import cli, client

        client.get_me = MagicMock(return_value=me)
        client.update_agent = MagicMock()

        result = cli_runner.invoke(cli, ['auth', 'rename', 'Piper'])

        assert result.exit_code == 1
        assert "agent update" in result.output
        client.update_agent.assert_not_called()

    def test_blank_is_refused(self, cli_runner):
        from cli.main import cli, client

        client.update_agent = MagicMock()
        result = cli_runner.invoke(cli, ['auth', 'rename', '  '])
        assert result.exit_code != 0
        client.update_agent.assert_not_called()


class TestAuthWhoami:
    """Tests for auth whoami command."""

    def test_whoami_shows_user(self, cli_runner):
        """auth whoami displays user info."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": "Alice",
            "email": "alice@test.com",
        })

        result = cli_runner.invoke(cli, ['auth', 'whoami'])

        assert result.exit_code == 0
        assert 'Alice' in result.output
        assert 'alice@test.com' in result.output

    def test_whoami_json(self, cli_runner):
        """auth whoami --json outputs JSON."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": "Alice",
            "email": "alice@test.com",
        })

        result = cli_runner.invoke(cli, ['auth', 'whoami', '--json'])

        assert result.exit_code == 0
        assert 'Alice' in result.output

    def test_whoami_shows_human_for_regular_user(self, cli_runner):
        """auth whoami labels a non-agent user as human."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": "Alice",
            "email": "alice@test.com",
            "is_agent": False,
        })

        result = cli_runner.invoke(cli, ['auth', 'whoami'])

        assert result.exit_code == 0
        assert 'human' in result.output
        assert 'AGENT' not in result.output

    def test_whoami_shows_agent_with_parent(self, cli_runner):
        """auth whoami labels an agent user as AGENT and shows the parent."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": "Bot",
            "email": "bot@test.com",
            "is_agent": True,
            "parent_user_name": "Alice",
        })

        result = cli_runner.invoke(cli, ['auth', 'whoami'])

        assert result.exit_code == 0
        assert 'AGENT' in result.output
        assert 'Alice' in result.output

    def test_whoami_shows_agent_without_parent_name(self, cli_runner):
        """auth whoami still labels AGENT when parent_user_name is missing."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": "Bot",
            "email": "bot@test.com",
            "is_agent": True,
        })

        result = cli_runner.invoke(cli, ['auth', 'whoami'])

        assert result.exit_code == 0
        assert 'AGENT' in result.output


class TestAuthKeysList:
    """Tests for auth keys list command."""

    def test_keys_list_shows_table(self, cli_runner):
        """auth keys list displays keys in a table."""
        from cli.main import cli, client

        client.list_api_keys = MagicMock(return_value=[
            {
                "id": "key-uuid-123456789",
                "name": "My Key",
                "key_prefix": "ck_abc",
                "created_at": "2026-02-10T12:00:00",
                "last_used_at": "2026-02-15T08:00:00",
                "is_active": True,
                "expires_at": None,
            },
        ])

        result = cli_runner.invoke(cli, ['auth', 'keys', 'list'])

        assert result.exit_code == 0
        assert 'My Key' in result.output

    def test_keys_list_no_keys(self, cli_runner):
        """auth keys list with no keys shows message."""
        from cli.main import cli, client

        client.list_api_keys = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['auth', 'keys', 'list'])

        assert result.exit_code == 0
        assert 'No API keys found' in result.output


class TestAuthKeysCreate:
    """Tests for auth keys create command."""

    def test_keys_create_shows_key(self, cli_runner):
        """auth keys create displays the new key."""
        from cli.main import cli, client

        client.create_api_key = MagicMock(return_value={
            "name": "CI Key",
            "key": "ck_secret_new_key",
        })

        result = cli_runner.invoke(cli, ['auth', 'keys', 'create', 'CI Key'])

        assert result.exit_code == 0
        assert 'CI Key' in result.output
        assert 'ck_secret_new_key' in result.output

    def test_keys_create_without_expires_in_sends_no_expiry(self, cli_runner):
        """No --expires-in -> expires_at=None (a non-expiring key, unchanged)."""
        from cli.main import cli, client

        client.create_api_key = MagicMock(return_value={
            "name": "CI Key",
            "key": "ck_secret_new_key",
        })

        result = cli_runner.invoke(cli, ['auth', 'keys', 'create', 'CI Key'])

        assert result.exit_code == 0
        client.create_api_key.assert_called_once_with('CI Key', expires_at=None)

    def test_keys_create_with_expires_in(self, cli_runner):
        """--expires-in 90d converts to an absolute UTC expires_at ~90 days out."""
        from datetime import datetime, timedelta, timezone
        from cli.main import cli, client

        client.create_api_key = MagicMock(return_value={
            "name": "Connector Key",
            "key": "ck_secret_new_key",
            "expires_at": "2026-10-05T12:00:00+00:00",
        })

        result = cli_runner.invoke(cli, ['auth', 'keys', 'create', 'Connector Key', '--expires-in', '90d'])

        assert result.exit_code == 0
        assert 'Expires:' in result.output
        (_name,), kwargs = client.create_api_key.call_args
        expires_at = datetime.fromisoformat(kwargs['expires_at'])
        delta = expires_at - datetime.now(timezone.utc)
        assert timedelta(days=89, hours=23) < delta <= timedelta(days=90)

    def test_keys_create_rejects_bad_expires_in(self, cli_runner):
        """Malformed --expires-in fails loud, before any API call."""
        from cli.main import cli, client

        client.create_api_key = MagicMock()

        result = cli_runner.invoke(cli, ['auth', 'keys', 'create', 'CI Key', '--expires-in', 'ninety-days'])

        assert result.exit_code != 0
        assert '--expires-in' in result.output
        client.create_api_key.assert_not_called()

    def test_keys_create_rejects_zero_expires_in(self, cli_runner):
        from cli.main import cli, client

        client.create_api_key = MagicMock()

        result = cli_runner.invoke(cli, ['auth', 'keys', 'create', 'CI Key', '--expires-in', '0'])

        assert result.exit_code != 0
        client.create_api_key.assert_not_called()


class TestAuthKeysRevoke:
    """Tests for auth keys revoke command."""

    def test_keys_revoke_with_confirmation(self, cli_runner):
        """auth keys revoke with confirmation revokes key."""
        from cli.main import cli, client

        client.list_api_keys = MagicMock(return_value=[
            {"id": "key-uuid-123", "name": "Test Key"},
        ])
        client.revoke_api_key = MagicMock()

        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['auth', 'keys', 'revoke', 'key-uuid-123'])

        assert result.exit_code == 0
        assert 'revoked' in result.output.lower()
        client.revoke_api_key.assert_called_once_with('key-uuid-123')

    def test_keys_revoke_not_found(self, cli_runner):
        """auth keys revoke with unknown ID shows error."""
        from cli.main import cli, client

        client.list_api_keys = MagicMock(return_value=[])

        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['auth', 'keys', 'revoke', 'nonexistent'])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()

    def test_keys_revoke_ambiguous(self, cli_runner):
        """auth keys revoke with ambiguous prefix shows error."""
        from cli.main import cli, client

        client.list_api_keys = MagicMock(return_value=[
            {"id": "key-uuid-123", "name": "Key 1"},
            {"id": "key-uuid-456", "name": "Key 2"},
        ])

        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['auth', 'keys', 'revoke', 'key-uuid'])

        assert result.exit_code != 0
        assert 'Ambiguous' in result.output


HOSTILE_NAMES = ["Evil [/red] key", "[link=https://evil.example]Claude[/link]", "[white on white]hidden"]


class TestAuthKeysMarkup:
    """CHT-1588: server strings and the caller's arguments are printed as
    text, not parsed as Rich markup. Unescaped, "[/red]" raised a
    MarkupError and "[link=...]" became a hyperlink with its tag hidden.
    The literal string showing up in the output is the proof."""

    @pytest.fixture(autouse=True)
    def wide_console(self, monkeypatch):
        from cli.commands.shared import console

        monkeypatch.setattr(console._stdout_console, "width", 400)

    @pytest.mark.parametrize("name", HOSTILE_NAMES)
    def test_create(self, cli_runner, name):
        from cli.main import cli, client

        client.create_api_key = MagicMock(return_value={
            "name": name, "key": "ck_" + "ab" * 32, "expires_at": "2026-12-31T00:00:00",
        })
        result = cli_runner.invoke(cli, ['auth', 'keys', 'create', name])
        assert result.exit_code == 0, result.output
        assert f"API key '{name}' created." in result.output

    @pytest.mark.parametrize("name", HOSTILE_NAMES)
    def test_list(self, cli_runner, name):
        from cli.main import cli, client

        client.list_api_keys = MagicMock(return_value=[
            {"id": "key-uuid-123456789", "name": name, "key_prefix": "ck_[/b]", "is_active": True},
        ])
        result = cli_runner.invoke(cli, ['auth', 'keys', 'list'])
        assert result.exit_code == 0, result.output
        assert name in result.output
        assert "ck_[/b]" in result.output

    @pytest.mark.parametrize("name", HOSTILE_NAMES)
    def test_revoke(self, cli_runner, name):
        from cli.main import cli, client

        client.list_api_keys = MagicMock(return_value=[{"id": "key-uuid-123", "name": name}])
        client.revoke_api_key = MagicMock()
        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['auth', 'keys', 'revoke', 'key-uuid-123'])
        assert result.exit_code == 0, result.output
        assert f"API key '{name}' revoked." in result.output

    @pytest.mark.parametrize("key_id", ["[/red]", "[link=https://evil.example]x[/link]"])
    def test_revoke_not_found_echoes_the_argument(self, cli_runner, key_id):
        from cli.main import cli, client

        client.list_api_keys = MagicMock(return_value=[])
        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['auth', 'keys', 'revoke', key_id])
        assert result.exit_code == 1
        assert f"API key '{key_id}' not found." in result.output

    def test_revoke_ambiguous_echoes_the_argument(self, cli_runner):
        from cli.main import cli, client

        client.list_api_keys = MagicMock(return_value=[{"id": "[/red]-1", "name": "a"}, {"id": "[/red]-2", "name": "b"}])
        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['auth', 'keys', 'revoke', '[/red]'])
        assert result.exit_code == 1
        assert "Ambiguous key ID prefix '[/red]'" in result.output

    @pytest.mark.parametrize("name", HOSTILE_NAMES)
    def test_whoami(self, cli_runner, name):
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": name, "email": "[/red]@x.test", "is_agent": True, "parent_user_name": name,
        })
        result = cli_runner.invoke(cli, ['auth', 'whoami'])
        assert result.exit_code == 0, result.output
        assert name in result.output
        assert "[/red]@x.test" in result.output
        assert f"(parent: {name})" in result.output


class TestAuthVerifyEmail:
    """auth verify-email (CHT-1790)."""

    def test_requests_a_code_then_confirms_the_prompted_one(self, cli_runner):
        from cli.main import cli, client

        client.request_email_verification = MagicMock(
            return_value={"email": "alice@test.com", "expires_at": "2026-01-01T00:15:00Z"})
        client.confirm_email_verification = MagicMock(
            return_value={"email": "alice@test.com", "email_verified_at": "2026-01-01T00:01:00Z"})

        with patch('cli.commands.auth._interactive', return_value=True):
            result = cli_runner.invoke(cli, ['auth', 'verify-email'], input=" 123456 \n")

        assert result.exit_code == 0, result.output
        assert 'alice@test.com' in result.output
        assert 'expires at' in result.output
        assert '15 minutes' not in result.output
        assert 'verified' in result.output
        client.request_email_verification.assert_called_once_with()
        client.confirm_email_verification.assert_called_once_with('123456')

    def test_with_code_confirms_without_requesting(self, cli_runner):
        from cli.main import cli, client

        client.request_email_verification = MagicMock()
        client.confirm_email_verification = MagicMock(
            return_value={"email": "alice@test.com", "email_verified_at": "2026-01-01T00:01:00Z"})

        result = cli_runner.invoke(cli, ['auth', 'verify-email', '--code', '654321'])

        assert result.exit_code == 0, result.output
        client.request_email_verification.assert_not_called()
        client.confirm_email_verification.assert_called_once_with('654321')

    def test_rate_limited_suggests_code_option(self, cli_runner):
        from cli.main import cli, client
        from cli.main import APIError

        client.request_email_verification = MagicMock(side_effect=_api_error(
            APIError, "A code was sent less than a minute ago. Wait 42 s before asking for another.", 429,
            {"error_code": "email_verification_rate_limited", "message": "..."},
        ))
        client.confirm_email_verification = MagicMock()

        result = cli_runner.invoke(cli, ['auth', 'verify-email'])

        assert result.exit_code == 1
        assert 'Wait 42 s' in result.output
        assert '--code' in result.output
        client.confirm_email_verification.assert_not_called()

    def test_other_request_errors_are_reported(self, cli_runner):
        from cli.main import cli, client
        from cli.main import APIError

        client.request_email_verification = MagicMock(side_effect=_api_error(
            APIError, "Email verification is unavailable: this server has no SMTP configured, so it cannot send a code.", 409,
            {"error_code": "email_verification_unavailable", "message": "..."},
        ))

        result = cli_runner.invoke(cli, ['auth', 'verify-email'])

        assert result.exit_code == 1
        assert 'no SMTP configured' in result.output

    def test_wrong_code_is_reported(self, cli_runner):
        from cli.main import cli, client
        from cli.main import APIError

        client.confirm_email_verification = MagicMock(side_effect=_api_error(
            APIError, "That code is wrong, has expired or has been used up.", 400,
            {"error_code": "invalid_verification_code", "message": "..."},
        ))

        result = cli_runner.invoke(cli, ['auth', 'verify-email', '--code', '000000'])

        assert result.exit_code == 1
        assert 'code is wrong' in result.output

    @pytest.mark.parametrize("verified, expected", [
        ("2026-01-01T00:00:00Z", "Email verified: yes"),
        (None, "Email verified: no"),
    ])
    def test_whoami_shows_verification_for_a_human(self, cli_runner, verified, expected):
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "id": "u-1", "name": "Alice", "email": "alice@test.com",
            "is_agent": False, "email_verified_at": verified,
        })

        result = cli_runner.invoke(cli, ['auth', 'whoami'])

        assert result.exit_code == 0, result.output
        assert expected in result.output

    def test_not_in_a_terminal_it_requests_and_stops(self, cli_runner):
        from cli.main import cli, client

        client.request_email_verification = MagicMock(
            return_value={"email": "alice@test.com", "expires_at": "2026-01-01T00:15:00Z"})
        client.confirm_email_verification = MagicMock()

        with patch('cli.commands.auth._interactive', return_value=False):
            result = cli_runner.invoke(cli, ['auth', 'verify-email'])

        assert result.exit_code == 0, result.output
        assert '--code' in result.output
        client.confirm_email_verification.assert_not_called()

    def test_json_requests_and_prints_where_and_until_when(self, cli_runner):
        import json
        from cli.main import cli, client

        client.request_email_verification = MagicMock(
            return_value={"email": "alice@test.com", "expires_at": "2026-01-01T00:15:00Z"})
        client.confirm_email_verification = MagicMock()

        with patch('cli.commands.auth._interactive', return_value=True):
            result = cli_runner.invoke(cli, ['auth', 'verify-email', '--json'])

        assert result.exit_code == 0, result.output
        assert json.loads(result.stdout) == {"email": "alice@test.com", "expires_at": "2026-01-01T00:15:00Z"}
        client.confirm_email_verification.assert_not_called()

    def test_json_confirm_prints_the_user(self, cli_runner):
        import json
        from cli.main import cli, client

        user = {"email": "alice@test.com", "email_verified_at": "2026-01-01T00:01:00Z"}
        client.confirm_email_verification = MagicMock(return_value=user)

        result = cli_runner.invoke(cli, ['auth', 'verify-email', '--code', '123456', '--json'])

        assert result.exit_code == 0, result.output
        assert json.loads(result.stdout) == user

    def test_json_rate_limited_is_a_json_error(self, cli_runner):
        import json
        from cli.main import cli, client, APIError

        client.request_email_verification = MagicMock(side_effect=_api_error(
            APIError, "Wait 42 s before asking for another.", 429,
            {"error_code": "email_verification_rate_limited", "message": "..."},
        ))

        result = cli_runner.invoke(cli, ['auth', 'verify-email', '--json'])

        assert result.exit_code == 1
        body = json.loads(result.stdout)
        assert body["error_code"] == "email_verification_rate_limited"
        assert "--code" in body["hint"]

    def test_json_other_errors_use_the_common_shape(self, cli_runner):
        import json
        from cli.main import cli, client, APIError

        client.confirm_email_verification = MagicMock(side_effect=_api_error(
            APIError, "That code is wrong", 400,
            {"error_code": "invalid_verification_code", "message": "..."},
        ))

        result = cli_runner.invoke(cli, ['auth', 'verify-email', '--code', '1', '--json'])

        assert result.exit_code == 1
        assert json.loads(result.stdout) == {"error": "That code is wrong"}

    def test_local_time_falls_back_to_the_raw_value(self):
        from cli.commands.auth import _local_time

        assert _local_time("not a time") == "not a time"
        assert len(_local_time("2026-01-01T00:15:00")) == 5


class TestAuthChangeEmail:
    """auth change-email (CHT-1827)."""

    def test_changes_the_address_with_the_password_given(self, cli_runner):
        from cli.main import cli, client

        client.change_email = MagicMock(return_value={"email": "new@test.com", "email_verified_at": None})
        result = cli_runner.invoke(cli, ['auth', 'change-email', 'new@test.com', '--password', 'pw'])

        assert result.exit_code == 0, result.output
        client.change_email.assert_called_once_with('new@test.com', 'pw')
        assert 'new@test.com' in result.output
        assert 'verify-email' in result.output

    def test_prompts_for_the_password_without_echoing_it(self, cli_runner):
        from cli.main import cli, client

        client.change_email = MagicMock(return_value={"email": "new@test.com", "email_verified_at": None})
        result = cli_runner.invoke(cli, ['auth', 'change-email', 'new@test.com'], input="s3cret\n")

        assert result.exit_code == 0, result.output
        client.change_email.assert_called_once_with('new@test.com', 's3cret')
        assert 's3cret' not in result.output

    def test_json_prints_the_account(self, cli_runner):
        import json
        from cli.main import cli, client

        client.change_email = MagicMock(return_value={"email": "new@test.com", "email_verified_at": None})
        result = cli_runner.invoke(cli, ['auth', 'change-email', 'new@test.com', '--password', 'pw', '--json'])

        assert result.exit_code == 0, result.output
        assert json.loads(result.output)["email"] == "new@test.com"

    def test_a_refusal_is_reported(self, cli_runner):
        from cli.main import cli, client
        from cli.main import APIError

        client.change_email = MagicMock(side_effect=_api_error(
            APIError, "The address was not changed: the password is wrong, or the address cannot be used.", 400,
            {"error_code": "email_change_refused", "message": "..."},
        ))
        result = cli_runner.invoke(cli, ['auth', 'change-email', 'new@test.com', '--password', 'pw'])

        assert result.exit_code == 1
        assert 'not changed' in result.output
