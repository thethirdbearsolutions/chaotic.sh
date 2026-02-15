"""Tests for team CLI commands (CHT-887).

Tests cover: team list, create, use, show, members, invite, accept-invite.
"""
import json
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def mock_team():
    """Standard team data."""
    return {
        "id": "team-uuid-123",
        "key": "CHT",
        "name": "Chaotic Team",
        "description": "Main team",
    }


class TestTeamList:
    """Tests for team list command."""

    def test_team_list_shows_teams(self, cli_runner, mock_team):
        """team list displays teams in a table."""
        from cli.main import cli, client

        client.get_teams = MagicMock(return_value=[mock_team])

        result = cli_runner.invoke(cli, ['team', 'list'])

        assert result.exit_code == 0
        assert 'Chaotic Team' in result.output
        assert 'CHT' in result.output

    def test_team_list_no_teams(self, cli_runner):
        """team list with no teams shows message."""
        from cli.main import cli, client

        client.get_teams = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['team', 'list'])

        assert result.exit_code == 0
        assert 'No teams found' in result.output

    def test_team_list_marks_current(self, cli_runner, mock_team):
        """team list marks the current team with checkmark."""
        from cli.main import cli, client

        client.get_teams = MagicMock(return_value=[mock_team])

        with patch('cli.main.get_current_team', return_value='team-uuid-123'):
            result = cli_runner.invoke(cli, ['team', 'list'])

        assert result.exit_code == 0
        assert '✓' in result.output

    def test_team_list_json(self, cli_runner, mock_team):
        """team list --json outputs valid JSON."""
        from cli.main import cli, client

        client.get_teams = MagicMock(return_value=[mock_team])

        result = cli_runner.invoke(cli, ['team', 'list', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert isinstance(data, list)
        assert data[0]['name'] == 'Chaotic Team'


class TestTeamCreate:
    """Tests for team create command."""

    def test_team_create_success(self, cli_runner):
        """team create creates a team and sets it as current."""
        from cli.main import cli, client

        client.create_team = MagicMock(return_value={
            "id": "new-team-id",
            "name": "New Team",
            "key": "NEW",
        })

        with patch('cli.main.set_current_team') as mock_set_team:
            result = cli_runner.invoke(cli, ['team', 'create', 'New Team', 'new'])

        assert result.exit_code == 0
        assert 'New Team' in result.output
        assert 'created' in result.output.lower()
        mock_set_team.assert_called_once_with('new-team-id')
        # Key should be uppercased
        client.create_team.assert_called_once_with('New Team', 'NEW', None)

    def test_team_create_with_description(self, cli_runner):
        """team create with --description."""
        from cli.main import cli, client

        client.create_team = MagicMock(return_value={
            "id": "new-team-id",
            "name": "Test",
            "key": "TST",
        })

        with patch('cli.main.set_current_team'):
            result = cli_runner.invoke(cli, [
                'team', 'create', 'Test', 'tst', '--description', 'A test team',
            ])

        assert result.exit_code == 0
        client.create_team.assert_called_once_with('Test', 'TST', 'A test team')

    def test_team_create_json(self, cli_runner):
        """team create --json outputs JSON."""
        from cli.main import cli, client

        client.create_team = MagicMock(return_value={
            "id": "new-team-id",
            "name": "JSON Team",
            "key": "JSN",
        })

        with patch('cli.main.set_current_team'):
            result = cli_runner.invoke(cli, ['team', 'create', 'JSON Team', 'jsn', '--json'])

        assert result.exit_code == 0
        assert 'JSON Team' in result.output


class TestTeamUse:
    """Tests for team use command."""

    def test_team_use_switches_team(self, cli_runner, mock_team):
        """team use switches to specified team."""
        from cli.main import cli, client

        client.get_team = MagicMock(return_value=mock_team)

        with patch('cli.main.resolve_team_id', return_value='team-uuid-123'), \
             patch('cli.main.set_current_team') as mock_set_team, \
             patch('cli.main.set_current_project') as mock_set_project:
            result = cli_runner.invoke(cli, ['team', 'use', 'CHT'])

        assert result.exit_code == 0
        assert 'Switched to team' in result.output
        assert 'Chaotic Team' in result.output
        mock_set_team.assert_called_once_with('team-uuid-123')
        # Project should be reset when changing teams
        mock_set_project.assert_called_once_with(None)


class TestTeamShow:
    """Tests for team show command."""

    def test_team_show_displays_details(self, cli_runner, mock_team):
        """team show displays team panel."""
        from cli.main import cli, client

        client.get_team = MagicMock(return_value=mock_team)

        result = cli_runner.invoke(cli, ['team', 'show'])

        assert result.exit_code == 0
        assert 'Chaotic Team' in result.output
        assert 'CHT' in result.output

    def test_team_show_json(self, cli_runner, mock_team):
        """team show --json outputs JSON."""
        from cli.main import cli, client

        client.get_team = MagicMock(return_value=mock_team)

        result = cli_runner.invoke(cli, ['team', 'show', '--json'])

        assert result.exit_code == 0
        assert 'Chaotic Team' in result.output


class TestTeamMembers:
    """Tests for team members command."""

    def test_team_members_shows_table(self, cli_runner):
        """team members displays members in a table."""
        from cli.main import cli, client

        client.get_team_members = MagicMock(return_value=[
            {"user_name": "Alice", "user_email": "alice@test.com", "role": "admin"},
            {"user_name": "Bob", "user_email": "bob@test.com", "role": "member"},
        ])

        result = cli_runner.invoke(cli, ['team', 'members'])

        assert result.exit_code == 0
        assert 'Alice' in result.output
        assert 'Bob' in result.output
        assert 'admin' in result.output

    def test_team_members_json(self, cli_runner):
        """team members --json outputs JSON."""
        from cli.main import cli, client

        client.get_team_members = MagicMock(return_value=[
            {"user_name": "Alice", "user_email": "alice@test.com", "role": "admin"},
        ])

        result = cli_runner.invoke(cli, ['team', 'members', '--json'])

        assert result.exit_code == 0
        assert 'Alice' in result.output


class TestTeamInvite:
    """Tests for team invite command."""

    def test_team_invite_sends_invitation(self, cli_runner):
        """team invite sends an invitation."""
        from cli.main import cli, client

        client.invite_member = MagicMock()

        result = cli_runner.invoke(cli, ['team', 'invite', 'bob@test.com'])

        assert result.exit_code == 0
        assert 'Invitation sent' in result.output
        assert 'bob@test.com' in result.output

    def test_team_invite_admin_role(self, cli_runner):
        """team invite --role admin sets admin role."""
        from cli.main import cli, client

        client.invite_member = MagicMock()

        result = cli_runner.invoke(cli, ['team', 'invite', 'admin@test.com', '--role', 'admin'])

        assert result.exit_code == 0
        client.invite_member.assert_called_once()
        call_args = client.invite_member.call_args[0]
        assert call_args[2] == 'admin'


class TestTeamAcceptInvite:
    """Tests for team accept-invite command."""

    def test_accept_invite_succeeds(self, cli_runner):
        """team accept-invite with valid token succeeds."""
        from cli.main import cli, client

        client.accept_invitation = MagicMock(return_value={})

        result = cli_runner.invoke(cli, ['team', 'accept-invite', 'inv-token-123'])

        assert result.exit_code == 0
        assert 'Joined team' in result.output
        client.accept_invitation.assert_called_once_with('inv-token-123')
