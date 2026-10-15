"""Tests for team CLI commands (CHT-887).

Tests cover: team list, create, use, show, members, invite, accept-invite.
"""
import json
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
        data = json.loads(result.stdout)
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


    def test_team_invite_without_smtp_prints_link_once(self, cli_runner):
        """CHT-1794: when the server cannot email the invitation, the create
        answer carries the accept link, and invite prints it whole."""
        from cli.main import cli, client

        url = "https://chaotic.example.com/invite/" + "t" * 120
        client.invite_member = MagicMock(return_value={"id": "inv-1", "email": "bob@test.com", "accept_url": url})

        result = cli_runner.invoke(cli, ['team', 'invite', 'bob@test.com'])

        assert result.exit_code == 0
        assert 'Invitation created for bob@test.com' in result.output
        assert 'Invitation sent' not in result.output
        assert 'send this link to them yourself' in result.output
        # One unbroken line, though longer than the console is wide.
        assert url in result.output.splitlines()

    def test_team_invite_with_smtp_prints_no_link(self, cli_runner):
        """CHT-1794: with email configured, accept_url is null: nothing to print."""
        from cli.main import cli, client

        client.invite_member = MagicMock(return_value={"id": "inv-1", "email": "bob@test.com", "accept_url": None})

        result = cli_runner.invoke(cli, ['team', 'invite', 'bob@test.com'])

        assert result.exit_code == 0
        assert 'Invitation sent to bob@test.com' in result.output
        assert '/invite/' not in result.output


    def test_team_invite_rebuilds_a_loopback_link_on_the_profile_server(self, cli_runner, monkeypatch):
        """CHT-1822: a server that never set APP_BASE_URL builds the link on
        http://localhost:24267; print it on the server this profile reaches."""
        import cli.main as main_mod
        from cli.main import cli, client

        token = "t" * 64
        client.invite_member = MagicMock(return_value={
            "id": "inv-1", "email": "bob@test.com", "accept_url": f"http://localhost:24267/invite/{token}"})
        monkeypatch.setattr(main_mod, "get_web_url", lambda: "https://chaotic.example.com")

        result = cli_runner.invoke(cli, ['team', 'invite', 'bob@test.com'])

        assert result.exit_code == 0
        assert f"https://chaotic.example.com/invite/{token}" in result.output.splitlines()
        assert "localhost" not in result.output

    def test_team_invite_keeps_a_loopback_link_for_a_loopback_profile(self, cli_runner, monkeypatch):
        import cli.main as main_mod
        from cli.main import cli, client

        url = "http://localhost:24267/invite/" + "t" * 64
        client.invite_member = MagicMock(return_value={"id": "inv-1", "email": "bob@test.com", "accept_url": url})
        monkeypatch.setattr(main_mod, "get_web_url", lambda: "http://127.0.0.1:24267")

        result = cli_runner.invoke(cli, ['team', 'invite', 'bob@test.com'])

        assert result.exit_code == 0
        assert url in result.output.splitlines()


class TestInviteLinkForDisplay:
    """CHT-1822: only a loopback link on a non-loopback profile is rebuilt,
    and only the path is taken from the server's link."""

    TOK = "tok_" + "a" * 40

    @pytest.mark.parametrize("accept_url,web_url,expected", [
        ("http://localhost:24267/invite/{t}", "https://chaotic.example.com", "https://chaotic.example.com/invite/{t}"),
        ("http://127.0.0.1:24267/invite/{t}", "http://10.0.0.5:24267", "http://10.0.0.5:24267/invite/{t}"),
        ("http://[::1]:24267/invite/{t}", "https://h.example:8443", "https://h.example:8443/invite/{t}"),
        # The profile URL's own credentials and path are not carried over.
        ("http://localhost:24267/invite/{t}", "https://u:p@h.example/sub", "https://h.example/invite/{t}"),
        # Nothing but the path from the server's link.
        ("http://u:p@localhost:24267/invite/{t}?next=https://evil.example#x", "https://h.example",
         "https://h.example/invite/{t}"),
        # Left alone: a real APP_BASE_URL, a loopback profile, unusable profile URLs.
        ("https://chaotic.example.com/invite/{t}", "https://other.example", "https://chaotic.example.com/invite/{t}"),
        ("http://localhost:24267/invite/{t}", "http://localhost:24267", "http://localhost:24267/invite/{t}"),
        ("http://localhost:24267/invite/{t}", "http://app.localhost:8000", "http://localhost:24267/invite/{t}"),
        ("http://localhost:24267/invite/{t}", "", "http://localhost:24267/invite/{t}"),
        ("http://localhost:24267/invite/{t}", None, "http://localhost:24267/invite/{t}"),
        ("http://localhost:24267/invite/{t}", "ftp://h.example", "http://localhost:24267/invite/{t}"),
        ("http://localhost:24267/invite/{t}", "http://[x", "http://localhost:24267/invite/{t}"),
        ("http://[x/invite/{t}", "https://h.example", "http://[x/invite/{t}"),
    ])
    def test_cases(self, accept_url, web_url, expected):
        from cli.commands.team import invite_link_for_display
        assert invite_link_for_display(accept_url.format(t=self.TOK), web_url) == expected.format(t=self.TOK)

    @pytest.mark.parametrize("host,expected", [
        ("localhost", True), ("LOCALHOST", True), ("app.localhost", True), ("localhost.", True),
        ("127.0.0.1", True), ("127.9.9.9", True), ("::1", True),
        ("localhost.example.com", False), ("10.0.0.1", False), ("0.0.0.0", False), ("", False), (None, False),
    ])
    def test_is_loopback_host(self, host, expected):
        from cli.commands.team import _is_loopback_host
        assert _is_loopback_host(host) is expected


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

    def test_accept_invite_unverified_email_hints_verify_email(self, cli_runner):
        """CHT-1790: the server's email_unverified refusal becomes a hint."""
        from cli.main import cli, client
        from cli.main import APIError

        client.accept_invitation = MagicMock(side_effect=_api_error(
            APIError, "Verify your email address before accepting an invitation", 403,
            {"error_code": "email_unverified", "message": "Verify your email address"},
        ))

        result = cli_runner.invoke(cli, ['team', 'accept-invite', 'inv-token-123'])

        assert result.exit_code == 1
        assert 'chaotic auth verify-email' in result.output
        assert 'Joined team' not in result.output

    def test_accept_invite_other_errors_are_unchanged(self, cli_runner):
        from cli.main import cli, client
        from cli.main import APIError

        client.accept_invitation = MagicMock(side_effect=_api_error(
            APIError, "Invitation is for a different email", 403,
            "Invitation is for a different email",
        ))

        result = cli_runner.invoke(cli, ['team', 'accept-invite', 'inv-token-123'])

        assert result.exit_code == 1
        assert 'Invitation is for a different email' in result.output
        assert 'verify-email' not in result.output

    def test_accept_invite_unverified_email_json(self, cli_runner):
        import json
        from cli.main import cli, client
        from cli.main import APIError

        client.accept_invitation = MagicMock(side_effect=_api_error(
            APIError, "Verify your email address", 403,
            {"error_code": "email_unverified", "message": "Verify your email address"},
        ))

        result = cli_runner.invoke(cli, ['team', 'accept-invite', 'inv-token-123', '--json'])

        assert result.exit_code == 1
        body = json.loads(result.stdout)
        assert body["error_code"] == "email_unverified"
        assert "chaotic auth verify-email" in body["hint"]

    def test_accept_invite_json_prints_the_membership(self, cli_runner):
        import json
        from cli.main import cli, client

        client.accept_invitation = MagicMock(return_value={"team_id": "t-1", "role": "member"})

        result = cli_runner.invoke(cli, ['team', 'accept-invite', 'inv-token-123', '--json'])

        assert result.exit_code == 0, result.output
        assert json.loads(result.stdout) == {"team_id": "t-1", "role": "member"}
