"""Tests for auth CLI commands (CHT-887).

Tests cover: auth signup, login, logout, set-key, clear-key, whoami,
auth keys list, create, revoke.
"""
from unittest.mock import patch, MagicMock
import pytest


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
