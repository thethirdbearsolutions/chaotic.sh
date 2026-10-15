"""Tests for team CLI commands (CHT-887).

Tests cover: team list, create, use, show, members, invite, accept-invite.
"""
import json
from pathlib import Path
from unittest.mock import patch, MagicMock
import click
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
        assert 'Invitation created for' in result.output
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

    def test_team_invite_with_smtp_prints_link_and_says_queued(self, cli_runner):
        """CHT-1824: with email configured the link comes too, and the
        output says the email was queued, not that it was delivered."""
        from cli.main import cli, client

        url = "https://chaotic.example.com/invite/" + "t" * 64
        client.invite_member = MagicMock(return_value={
            "id": "inv-1", "email": "bob@test.com", "accept_url": url, "email_queued": True})

        result = cli_runner.invoke(cli, ['team', 'invite', 'bob@test.com'])

        assert result.exit_code == 0
        assert 'Invitation created for bob@test.com' in result.output
        assert 'Invitation sent' not in result.output
        assert 'email was queued' in result.output
        assert "isn't confirmed" in result.output
        assert 'does not send email' not in result.output
        assert url in result.output.splitlines()

    def test_team_invite_old_server_with_smtp_does_not_claim_delivery(self, cli_runner):
        """A server before CHT-1824 sends no link when it has SMTP."""
        from cli.main import cli, client

        client.invite_member = MagicMock(return_value={"id": "inv-1", "email": "bob@test.com", "accept_url": None})

        result = cli_runner.invoke(cli, ['team', 'invite', 'bob@test.com'])

        assert result.exit_code == 0
        assert 'Invitation created for bob@test.com' in result.output
        assert 'Invitation sent' not in result.output
        assert "isn't confirmed" in " ".join(result.output.split())
        assert '/invite/' not in result.output

    def test_team_invite_pending_409_names_the_cancel_command(self, cli_runner):
        """CHT-1824: the refusal for a live invitation says how to send a new one."""
        from cli.main import cli, client, APIError

        detail = {"error_code": "invitation_pending", "message": "A pending invitation exists.",
                  "invitation_id": "inv-9"}
        client.invite_member = MagicMock(side_effect=_api_error(APIError, "A pending invitation exists.", 409, detail))

        result = cli_runner.invoke(cli, ['team', 'invite', 'bob@test.com'])

        assert result.exit_code == 1
        assert 'A pending invitation exists.' in result.output
        assert 'chaotic team cancel-invite inv-9' in " ".join(result.output.split())

    def test_team_invite_old_server_wording_does_not_claim_an_email(self, cli_runner):
        """Review of #438: a server older than CHT-1794 without SMTP also
        sends no link, so the message must not say an email was queued."""
        from cli.main import cli, client

        client.invite_member = MagicMock(return_value={"id": "inv-1", "email": "bob@test.com"})

        result = cli_runner.invoke(cli, ['team', 'invite', 'bob@test.com'])

        assert result.exit_code == 0
        assert 'queued' not in result.output
        assert 'If this server sends email' in " ".join(result.output.split())

    def test_team_invite_pending_409_json_is_structured(self, cli_runner):
        """CHT-1824: under --json the refusal keeps its code and the id."""
        import json
        from cli.main import cli, client, APIError

        detail = {"error_code": "invitation_pending", "message": "A pending invitation exists.",
                  "invitation_id": "inv-9"}
        client.invite_member = MagicMock(side_effect=_api_error(APIError, "A pending invitation exists.", 409, detail))

        result = cli_runner.invoke(cli, ['team', 'invite', 'bob@test.com', '--json'])

        assert result.exit_code == 1
        out = json.loads(result.output)
        assert out["error_code"] == "invitation_pending"
        assert out["invitation_id"] == "inv-9"
        assert "cancel-invite inv-9" in out["hint"]
        assert out["error"] == "A pending invitation exists."

    def test_team_invite_json_prints_the_invitation_with_the_display_link(self, cli_runner, monkeypatch):
        import json
        import cli.main as main_mod
        from cli.main import cli, client

        token = "t" * 64
        client.invite_member = MagicMock(return_value={
            "id": "inv-1", "email": "bob@test.com", "email_queued": True,
            "accept_url": f"http://localhost:24267/invite/{token}"})
        monkeypatch.setattr(main_mod, "get_web_url", lambda: "https://chaotic.example.com")

        result = cli_runner.invoke(cli, ['team', 'invite', 'bob@test.com', '--json'])

        assert result.exit_code == 0
        out = json.loads(result.output)
        assert out["accept_url"] == f"https://chaotic.example.com/invite/{token}"
        assert out["email_queued"] is True

    def test_team_invite_pending_409_from_an_old_server(self, cli_runner):
        from cli.main import cli, client, APIError

        msg = "A pending invitation for this email already exists; revoke it to send a new one"
        client.invite_member = MagicMock(side_effect=_api_error(APIError, msg, 409, msg))

        result = cli_runner.invoke(cli, ['team', 'invite', 'bob@test.com'])

        assert result.exit_code == 1
        assert 'chaotic team invitations' in " ".join(result.output.split())

    def test_team_invite_other_errors_are_unchanged(self, cli_runner):
        from cli.main import cli, client, APIError

        client.invite_member = MagicMock(side_effect=_api_error(APIError, "User is already a team member", 400,
                                                              "User is already a team member"))

        result = cli_runner.invoke(cli, ['team', 'invite', 'bob@test.com'])

        assert result.exit_code == 1
        assert 'cancel-invite' not in result.output

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

    @pytest.mark.parametrize("host", ["0.0.0.0", "[::]", "127.1", "[::ffff:127.0.0.1]"])
    def test_other_local_only_link_hosts_are_rewritten(self, host):
        from cli.commands.team import invite_link_for_display
        url = f"http://{host}:24267/invite/{self.TOK}"
        assert invite_link_for_display(url, "https://h.example") == f"https://h.example/invite/{self.TOK}"

    @pytest.mark.parametrize("web_url", ["http://0.0.0.0:24267/api", "http://[::ffff:127.0.0.1]:24267", "http://127.1"])
    def test_a_local_only_profile_keeps_the_link(self, web_url):
        from cli.commands.team import invite_link_for_display
        url = f"http://localhost:24267/invite/{self.TOK}"
        assert invite_link_for_display(url, web_url) == url

    @pytest.mark.parametrize("web_url,origin", [
        ("https://H.Example:8443/api", "https://h.example:8443"),
        ("http://[2001:DB8::1]:24267/api", "http://[2001:db8::1]:24267"),
        ("http://[2001:db8::1]/api", "http://[2001:db8::1]"),
    ])
    def test_the_origin_is_rebuilt_from_parsed_parts(self, web_url, origin):
        from cli.commands.team import invite_link_for_display
        url = f"http://localhost:24267/invite/{self.TOK}"
        assert invite_link_for_display(url, web_url) == f"{origin}/invite/{self.TOK}"

    @pytest.mark.parametrize("web_url", ["http://host:abc/api", "http://host:99999/api"])
    def test_a_profile_url_with_a_bad_port_leaves_the_link_alone(self, web_url):
        from cli.commands.team import invite_link_for_display
        url = f"http://localhost:24267/invite/{self.TOK}"
        assert invite_link_for_display(url, web_url) == url


_REPO = Path(__file__).resolve().parents[2]
_LOCAL_HOSTS = json.loads((_REPO / "testdata" / "local-hosts.json").read_text())


class TestIsLocalHost:
    """CHT-1822: the same table the backend twin and the web client's
    isLocalHost are tested against."""

    @pytest.mark.parametrize("host", _LOCAL_HOSTS["local"])
    def test_local(self, host):
        from cli.local_host import is_local_host
        assert is_local_host(host) is True

    @pytest.mark.parametrize("host", _LOCAL_HOSTS["not_local"] + [None])
    def test_not_local(self, host):
        from cli.local_host import is_local_host
        assert is_local_host(host) is False

    def test_identical_to_the_backend_twin(self):
        import cli.local_host as twin
        assert Path(twin.__file__).read_text() == (_REPO / "backend" / "app" / "utils" / "local_host.py").read_text()


class TestTeamAcceptInvite:
    """Tests for team accept-invite command."""

    def test_accept_invite_succeeds(self, cli_runner):
        """team accept-invite with valid token succeeds."""
        from cli.main import cli, client

        client.accept_invitation = MagicMock(return_value={})

        result = cli_runner.invoke(cli, ['team', 'accept-invite', 'inv-token-123456789'])

        assert result.exit_code == 0
        assert 'Joined team' in result.output
        client.accept_invitation.assert_called_once_with('inv-token-123456789')

    def test_accept_invite_unverified_email_hints_verify_email(self, cli_runner):
        """CHT-1790: the server's email_unverified refusal becomes a hint."""
        from cli.main import cli, client
        from cli.main import APIError

        client.accept_invitation = MagicMock(side_effect=_api_error(
            APIError, "Verify your email address before accepting an invitation", 403,
            {"error_code": "email_unverified", "message": "Verify your email address"},
        ))

        result = cli_runner.invoke(cli, ['team', 'accept-invite', 'inv-token-123456789'])

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

        result = cli_runner.invoke(cli, ['team', 'accept-invite', 'inv-token-123456789'])

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

        result = cli_runner.invoke(cli, ['team', 'accept-invite', 'inv-token-123456789', '--json'])

        assert result.exit_code == 1
        body = json.loads(result.stdout)
        assert body["error_code"] == "email_unverified"
        assert "chaotic auth verify-email" in body["hint"]

    def test_accept_invite_json_prints_the_membership(self, cli_runner):
        import json
        from cli.main import cli, client

        client.accept_invitation = MagicMock(return_value={"team_id": "t-1", "role": "member"})

        result = cli_runner.invoke(cli, ['team', 'accept-invite', 'inv-token-123456789', '--json'])

        assert result.exit_code == 0, result.output
        assert json.loads(result.stdout) == {"team_id": "t-1", "role": "member"}


class TestTeamAcceptInviteLink:
    """CHT-1823: accept-invite takes the whole /invite/<token> link."""

    TOKEN = "Zk3-q_9xTOKENsecret"

    @pytest.fixture
    def web_url(self, monkeypatch):
        import cli.main as main_mod

        def set_url(url):
            monkeypatch.setattr(main_mod, "get_web_url", lambda: url)
        set_url("https://chaotic.example.com")
        return set_url

    def _accept(self, cli_runner, arg, *extra):
        from cli.main import cli, client
        client.accept_invitation = MagicMock(return_value={"team_id": "t-1"})
        result = cli_runner.invoke(cli, ['team', 'accept-invite', arg, *extra])
        return result, client.accept_invitation

    @pytest.mark.parametrize("arg", [
        "https://chaotic.example.com/invite/{t}",
        "https://chaotic.example.com/invite/{t}/",
        "https://chaotic.example.com/invite/{t}?utm=x#frag",
        "  https://CHAOTIC.example.com./invite/{t}\n",
        "https://chaotic.example.com:8443/invite/{t}",
        "https://chaotic.example.com/sub/path/invite/{t}",
        "chaotic.example.com/invite/{t}",
        "/invite/{t}",
        "{t}",
        "  {t}  ",
    ])
    def test_takes_the_token_and_does_not_warn(self, cli_runner, web_url, arg):
        result, accept = self._accept(cli_runner, arg.format(t=self.TOKEN))
        assert result.exit_code == 0, result.output
        accept.assert_called_once_with(self.TOKEN)
        assert "Warning" not in result.output
        assert "Joined team" in result.output

    def test_warns_when_the_link_names_another_host(self, cli_runner, web_url):
        result, accept = self._accept(cli_runner, f"https://other.example.org/invite/{self.TOKEN}")
        assert result.exit_code == 0, result.output
        accept.assert_called_once_with(self.TOKEN)
        assert "Warning" in result.stderr
        assert "other.example.org" in result.stderr
        assert "chaotic.example.com" in result.stderr
        assert self.TOKEN not in result.stderr

    def test_warning_keeps_json_stdout_clean(self, cli_runner, web_url):
        import json
        result, _ = self._accept(cli_runner, f"https://other.example.org/invite/{self.TOKEN}", "--json")
        assert result.exit_code == 0, result.output
        assert json.loads(result.stdout) == {"team_id": "t-1"}
        assert "Warning" in result.stderr

    @pytest.mark.parametrize("server,link", [
        ("https://xn--bcher-kva.de", "https://bücher.de/invite/{t}"),
        ("https://bücher.de", "https://xn--bcher-kva.de/invite/{t}"),
        ("https://BÜCHER.de.", "https://XN--BCHER-KVA.DE/invite/{t}"),
    ])
    def test_an_idn_host_and_its_punycode_form_do_not_warn(self, cli_runner, web_url, server, link):
        """CHT-1826: the same host, written in Unicode or in punycode."""
        web_url(server)
        result, accept = self._accept(cli_runner, link.format(t=self.TOKEN))
        assert result.exit_code == 0, result.output
        accept.assert_called_once_with(self.TOKEN)
        assert "Warning" not in result.output

    def test_another_idn_host_still_warns(self, cli_runner, web_url):
        web_url("https://xn--bcher-kva.de")
        result, _ = self._accept(cli_runner, f"https://bucher.de/invite/{self.TOKEN}")
        assert result.exit_code == 0, result.output
        assert "Warning" in result.stderr

    def test_local_link_on_a_local_server_does_not_warn(self, cli_runner, web_url):
        web_url("http://127.0.0.1:24267")
        result, accept = self._accept(cli_runner, f"http://localhost:24267/invite/{self.TOKEN}")
        assert result.exit_code == 0, result.output
        accept.assert_called_once_with(self.TOKEN)
        assert "Warning" not in result.output

    def test_local_link_on_a_remote_server_warns(self, cli_runner, web_url):
        result, _ = self._accept(cli_runner, f"http://localhost:24267/invite/{self.TOKEN}")
        assert result.exit_code == 0, result.output
        assert "Warning" in result.stderr
        assert "APP_BASE_URL" in result.stderr
        assert "--profile" not in result.stderr
        assert self.TOKEN not in result.stderr

    def test_warning_drops_control_characters_from_the_host(self, cli_runner, web_url):
        result, accept = self._accept(cli_runner, f"https://ev\x1bil.example/invite/{self.TOKEN}")
        assert result.exit_code == 0, result.output
        accept.assert_called_once_with(self.TOKEN)
        assert "evil.example" in result.stderr
        assert "\x1b" not in result.stderr.replace("\x1b[33m", "").replace("\x1b[0m", "")

    @pytest.mark.parametrize("arg", ["", "   "])
    def test_an_empty_argument_is_a_usage_error(self, cli_runner, web_url, arg):
        result, accept = self._accept(cli_runner, arg)
        assert result.exit_code == 2
        accept.assert_not_called()
        assert "not an invitation link or token" in result.output

    @pytest.mark.parametrize("arg", [
        "https://chaotic.example.com/invite/",
        "https://chaotic.example.com/",
        "https://chaotic.example.com/issue/{t}",
        "{t}/extra",
        "https://[::1/invite/{t}",
        # CHT-1823 review: anything outside [A-Za-z0-9_-]{16,128} is refused.
        "https://chaotic.example.com/invite/..",
        "https://chaotic.example.com/invite/.",
        "https://chaotic.example.com/invite/{t}.",
        "<https://chaotic.example.com/invite/{t}>",
        "(https://chaotic.example.com/invite/{t})",
        "https://chaotic.example.com/invite/{t}\u200b",
        "https://chaotic.example.com/invite/{t} extra",
        "https://chaotic.example.com/invite/{t}%0A",
        "https://chaotic.example.com/invite/short",
        "https://chaotic.example.com/invite/" + "a" * 129,
        "{t}#x",
        "{t}?x",
        "{t}.",
        "{t}\u200b",
        "{t}\x07",
        "<{t}>",
        "short",
        "a" * 129,
    ])
    def test_a_link_without_a_token_fails_without_echoing_it(self, cli_runner, web_url, arg):
        result, accept = self._accept(cli_runner, arg.format(t=self.TOKEN))
        assert result.exit_code == 2
        accept.assert_not_called()
        assert "not an invitation link or token" in result.output
        assert self.TOKEN not in result.output

    def test_help_mentions_the_link(self, cli_runner):
        from cli.main import cli
        result = cli_runner.invoke(cli, ['team', 'accept-invite', '--help'])
        assert result.exit_code == 0
        assert "/invite/<token>" in result.output
        assert "LINK_OR_TOKEN" in result.output


class TestInviteTokenFromArg:
    def test_bare_token_has_no_host(self):
        from cli.commands.team import invite_token_from_arg
        token = "a" * 16
        assert invite_token_from_arg(f" {token}\n") == (token, None)

    def test_length_bounds(self):
        from cli.commands.team import invite_token_from_arg
        assert invite_token_from_arg("A-_9" * 32)[0] == "A-_9" * 32
        with pytest.raises(click.UsageError):
            invite_token_from_arg("a" * 15)

    def test_link_host(self):
        from cli.commands.team import invite_token_from_arg
        token = "x" * 43
        assert invite_token_from_arg(f"https://h.example/invite/{token}") == (token, "h.example")

    @pytest.mark.parametrize("link_host,web_url,expected", [
        (None, "https://a.example", None),
        ("a.example", "https://A.example.", None),
        ("a.example", "http://a.example:24267", None),
        ("b.example", "https://a.example", "a.example"),
        ("127.0.0.1", "http://localhost:24267", None),
        ("localhost", "https://a.example", "a.example"),
        ("a.example", "", None),
        ("a.example", "https://[bad", None),
        # CHT-1826: IDN and punycode forms of one host, both ways round.
        ("bücher.de", "https://xn--bcher-kva.de", None),
        ("xn--bcher-kva.de", "https://bücher.de", None),
        ("XN--BCHER-KVA.de.", "https://Bücher.DE", None),
        ("bücher.de", "https://xn--bcher-kva.de", None),  # NFC
        ("bucher.de", "https://xn--bcher-kva.de", "xn--bcher-kva.de"),
        # No IDNA 2003 nameprep: faß and fass are different hosts.
        ("faß.de", "https://fass.de", "fass.de"),
        ("xn--fa-hia.de", "https://faß.de", None),
        # Invalid or non-canonical punycode compares as written, no crash.
        ("xn--zzzzzzzzzzzzzzz.de", "https://xn--zzzzzzzzzzzzzzz.de", None),
        ("xn--zzzzzzzzzzzzzzz.de", "https://a.example", "a.example"),
        ("xn--.de", "https://a.example", "a.example"),
        ("xn--abc-.de", "https://abc.de", "abc.de"),
        # ACE labels that only match another host after normalising are
        # different DNS names and must warn (PR #441 review).
        ("xn--anban-r74b.example.com", "https://kanban.example.com", "kanban.example.com"),
        ("xn--bucher-xyd.de", "https://xn--bcher-kva.de", "xn--bcher-kva.de"),
        ("xn--wca.de", "https://xn--tda.de", "xn--tda.de"),
        ("xn--72g.de", "https://xn--5ca.de", "xn--5ca.de"),
        # Over DNS's 63 octets: not decoded, compared as written.
        ("xn--" + "a" * 60 + "-kva.de", "https://a.example", "a.example"),
        # IPv6 literals: same host (any port) is fine, another one warns.
        ("::1", "http://[::1]:8000", None),
        ("2001:db8::1", "https://[2001:DB8::1]", None),
        ("2001:db8::1", "https://[2001:db8::2]", "2001:db8::2"),
    ])
    def test_foreign_invite_host(self, link_host, web_url, expected):
        from cli.commands.team import foreign_invite_host
        assert foreign_invite_host(link_host, web_url) == expected
