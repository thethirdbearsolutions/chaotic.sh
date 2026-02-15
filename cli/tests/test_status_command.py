"""Tests for status command (CHT-887).

Tests cover: status with/without auth, team, project, agent user,
custom profile, local config, pending gates, JSON output.
"""
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


class TestStatus:
    """Tests for status command."""

    def test_status_not_logged_in(self, cli_runner):
        """status shows not logged in when no auth."""
        from cli.main import cli

        with patch('cli.main.get_token', return_value=None), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value=None), \
             patch('cli.main.get_current_project', return_value=None), \
             patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_effective_profile', return_value='default'):
            result = cli_runner.invoke(cli, ['status'])

        assert result.exit_code == 0
        assert 'Not logged in' in result.output

    def test_status_logged_in(self, cli_runner):
        """status shows user name and email."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": "Alice", "email": "alice@test.com", "is_agent": False,
        })

        with patch('cli.main.get_token', return_value='token-123'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value=None), \
             patch('cli.main.get_current_project', return_value=None), \
             patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_effective_profile', return_value='default'):
            result = cli_runner.invoke(cli, ['status'])

        assert result.exit_code == 0
        assert 'Alice' in result.output
        assert 'alice@test.com' in result.output

    def test_status_agent_user(self, cli_runner):
        """status shows agent info with parent name."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "id": "agent-1", "name": "claude-bot", "is_agent": True,
        })
        client.get_agent = MagicMock(return_value={
            "parent_user_name": "Alice",
        })

        with patch('cli.main.get_token', return_value='token-123'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value=None), \
             patch('cli.main.get_current_project', return_value=None), \
             patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_effective_profile', return_value='default'):
            result = cli_runner.invoke(cli, ['status'])

        assert result.exit_code == 0
        assert 'claude-bot' in result.output
        assert 'agent' in result.output.lower()
        assert 'Alice' in result.output

    def test_status_with_team(self, cli_runner):
        """status shows team name and key."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": "Alice", "email": "alice@test.com", "is_agent": False,
        })
        client.get_team = MagicMock(return_value={
            "name": "My Team", "key": "MT",
        })

        with patch('cli.main.get_token', return_value='token-123'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value='team-uuid-1'), \
             patch('cli.main.get_current_project', return_value=None), \
             patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_effective_profile', return_value='default'):
            result = cli_runner.invoke(cli, ['status'])

        assert result.exit_code == 0
        assert 'My Team' in result.output
        assert 'MT' in result.output

    def test_status_with_project(self, cli_runner):
        """status shows project name and key."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": "Alice", "email": "alice@test.com", "is_agent": False,
        })
        client.get_team = MagicMock(return_value={"name": "Team", "key": "TM"})
        client.get_project = MagicMock(return_value={
            "name": "Chaotic", "key": "CHT",
        })

        with patch('cli.main.get_token', return_value='token-123'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value='team-1'), \
             patch('cli.main.get_current_project', return_value='project-1'), \
             patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_effective_profile', return_value='default'):
            result = cli_runner.invoke(cli, ['status'])

        assert result.exit_code == 0
        assert 'Chaotic' in result.output
        assert 'CHT' in result.output

    def test_status_custom_profile(self, cli_runner):
        """status shows profile name when not default."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": "Alice", "email": "alice@test.com", "is_agent": False,
        })

        with patch('cli.main.get_token', return_value='token-123'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value=None), \
             patch('cli.main.get_current_project', return_value=None), \
             patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_effective_profile', return_value='claude'):
            result = cli_runner.invoke(cli, ['status'])

        assert result.exit_code == 0
        assert 'claude' in result.output

    def test_status_with_pending_gates(self, cli_runner):
        """status shows pending gate approvals."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": "Alice", "email": "alice@test.com", "is_agent": False,
        })
        client.get_team = MagicMock(return_value={"name": "Team", "key": "TM"})
        client.get_project = MagicMock(return_value={"name": "Chaotic", "key": "CHT"})
        client.get_pending_gates = MagicMock(return_value=[
            {
                "identifier": "CHT-100", "title": "Fix bug",
                "pending_gates": [{"ritual_name": "design-review"}],
            },
        ])

        with patch('cli.main.get_token', return_value='token-123'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value='team-1'), \
             patch('cli.main.get_current_project', return_value='project-1'), \
             patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_effective_profile', return_value='default'):
            result = cli_runner.invoke(cli, ['status'])

        assert result.exit_code == 0
        assert 'gate approval' in result.output.lower()
        assert 'CHT-100' in result.output
        assert 'design-review' in result.output

    def test_status_json(self, cli_runner):
        """status --json outputs structured JSON."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": "Alice", "email": "alice@test.com", "is_agent": False,
        })

        with patch('cli.main.get_token', return_value='token-123'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value=None), \
             patch('cli.main.get_current_project', return_value=None), \
             patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_effective_profile', return_value='default'):
            result = cli_runner.invoke(cli, ['status', '--json'])

        assert result.exit_code == 0
        assert 'authenticated' in result.output
        assert 'profile' in result.output

    def test_status_json_with_team_error(self, cli_runner):
        """status --json includes team_error on failure."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": "Alice", "email": "alice@test.com", "is_agent": False,
        })
        client.get_team = MagicMock(side_effect=Exception("Team not found"))

        with patch('cli.main.get_token', return_value='token-123'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value='team-1'), \
             patch('cli.main.get_current_project', return_value=None), \
             patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_effective_profile', return_value='default'):
            result = cli_runner.invoke(cli, ['status', '--json'])

        assert result.exit_code == 0
        assert 'team_error' in result.output

    def test_status_no_team_no_project(self, cli_runner):
        """status shows no team/project messages."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={
            "name": "Alice", "email": "alice@test.com", "is_agent": False,
        })

        with patch('cli.main.get_token', return_value='token-123'), \
             patch('cli.main.get_api_key', return_value=None), \
             patch('cli.main.get_current_team', return_value=None), \
             patch('cli.main.get_current_project', return_value=None), \
             patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_effective_profile', return_value='default'):
            result = cli_runner.invoke(cli, ['status'])

        assert result.exit_code == 0
        assert 'No team selected' in result.output
        assert 'No project selected' in result.output
