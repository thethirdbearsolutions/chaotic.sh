"""Tests for CLI decorator chain behavior (CHT-725).

Tests the require_auth, require_team, require_project, handle_error, and
json_option decorators and their interactions.
"""
import json as json_mod
from unittest.mock import patch, MagicMock
import pytest


# Local _FakeAPIError: must be defined here (not imported from conftest) because
# handle_error's except clause needs the SAME class that's set on mock_mod.APIError,
# and pytest's conftest loading may create a different class than a direct import.
class _FakeAPIError(Exception):
    pass


@pytest.fixture(autouse=True)
def mock_client_module():
    """Mock the client module with a real exception class for APIError.

    Also patches cli.main.APIError so that handle_error's except clause
    catches _FakeAPIError even when cli.main was already imported by earlier
    test files (which bind the real APIError at import time).
    """
    mock_mod = MagicMock()
    mock_mod.APIError = _FakeAPIError
    with patch.dict('sys.modules', {'cli.client': mock_mod}), \
         patch('cli.main.APIError', _FakeAPIError):
        yield mock_mod


class TestRequireAuth:
    """Tests for the require_auth decorator."""

    def test_unauthenticated_shows_error(self, cli_runner):
        """Commands requiring auth show error when not authenticated."""
        with patch('cli.main.get_token', return_value=None), \
             patch('cli.main.get_api_key', return_value=None):
            from cli.main import cli
            result = cli_runner.invoke(cli, ['auth', 'whoami'])

        assert result.exit_code != 0
        assert 'Not authenticated' in result.output

    def test_token_auth_passes(self, cli_runner):
        """Commands pass auth check when token is set."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            'name': 'Test User', 'email': 'test@test.com',
        })

        with patch('cli.main.get_token', return_value='fake-token'), \
             patch('cli.main.get_api_key', return_value=None):
            result = cli_runner.invoke(cli, ['auth', 'whoami'])

        assert result.exit_code == 0
        assert 'Test User' in result.output

    def test_api_key_auth_passes(self, cli_runner):
        """Commands pass auth check when API key is set (no token)."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            'name': 'Agent', 'email': 'agent@test.com',
        })

        with patch('cli.main.get_token', return_value=None), \
             patch('cli.main.get_api_key', return_value='fake-api-key'):
            result = cli_runner.invoke(cli, ['auth', 'whoami'])

        assert result.exit_code == 0
        assert 'Agent' in result.output


class TestRequireTeam:
    """Tests for the require_team decorator (includes auth check)."""

    def test_no_team_shows_error(self, cli_runner):
        """Commands requiring team show error when no team selected."""
        with patch('cli.main.get_token', return_value='fake-token'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value=None):
            from cli.main import cli
            result = cli_runner.invoke(cli, ['team', 'show'])

        assert result.exit_code != 0
        assert 'No team selected' in result.output

    def test_auth_checked_before_team(self, cli_runner):
        """require_team checks auth first — shows auth error, not team error."""
        with patch('cli.main.get_token', return_value=None), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value=None):
            from cli.main import cli
            result = cli_runner.invoke(cli, ['team', 'show'])

        assert result.exit_code != 0
        assert 'Not authenticated' in result.output


class TestRequireProject:
    """Tests for the require_project decorator (includes auth + team check)."""

    def test_no_project_shows_error(self, cli_runner):
        """Commands requiring project show error when no project selected."""
        with patch('cli.main.get_token', return_value='fake-token'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value='team-123'), \
             patch('cli.main.get_current_project', return_value=None):
            from cli.main import cli
            result = cli_runner.invoke(cli, ['issue', 'list'])

        assert result.exit_code != 0
        assert 'No project selected' in result.output

    def test_chain_order_auth_before_team_before_project(self, cli_runner):
        """require_project checks auth -> team -> project in order."""
        with patch('cli.main.get_token', return_value=None), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value=None), \
             patch('cli.main.get_current_project', return_value=None):
            from cli.main import cli
            result = cli_runner.invoke(cli, ['issue', 'list'])

        assert result.exit_code != 0
        assert 'Not authenticated' in result.output

    def test_chain_order_team_before_project(self, cli_runner):
        """With auth but no team: should show team error, not project error."""
        with patch('cli.main.get_token', return_value='fake-token'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value=None), \
             patch('cli.main.get_current_project', return_value=None):
            from cli.main import cli
            result = cli_runner.invoke(cli, ['issue', 'list'])

        assert result.exit_code != 0
        assert 'No team selected' in result.output


class TestHandleError:
    """Tests for the handle_error decorator."""

    def test_api_error_shows_message(self, cli_runner):
        """APIError is caught and displayed as error message."""
        from cli.main import cli, client

        client.get_me = MagicMock(side_effect=_FakeAPIError("Server error"))

        with patch('cli.main.get_token', return_value='fake-token'), \
             patch('cli.main.get_api_key', return_value=None):
            result = cli_runner.invoke(cli, ['auth', 'whoami'])

        assert result.exit_code != 0
        assert 'Server error' in result.output

    def test_api_error_json_output(self, cli_runner):
        """APIError in JSON mode for status outputs error in JSON field."""
        from cli.main import cli, client

        # status --json wraps API calls in try/except and puts errors in fields
        client.get_me = MagicMock(side_effect=_FakeAPIError("Server error"))

        with patch('cli.main.get_token', return_value='fake-token'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_effective_profile', return_value='default'), \
             patch('cli.main.get_current_team', return_value=None), \
             patch('cli.main.get_current_project', return_value=None):
            result = cli_runner.invoke(cli, ['status', '--json'])

        assert result.exit_code == 0
        data = json_mod.loads(result.output)
        # status command catches errors gracefully and puts them in *_error fields
        assert 'user_error' in data
        assert 'Server error' in data['user_error']

    def test_non_api_error_propagates(self, cli_runner):
        """Non-APIError exceptions are not caught by handle_error."""
        from cli.main import cli, client

        client.get_me = MagicMock(side_effect=ValueError("unexpected"))

        with patch('cli.main.get_token', return_value='fake-token'), \
             patch('cli.main.get_api_key', return_value=None):
            result = cli_runner.invoke(cli, ['auth', 'whoami'])

        # ValueError should propagate (Click catches it and sets exit_code=1)
        assert result.exit_code != 0
