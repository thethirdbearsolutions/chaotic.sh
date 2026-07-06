"""Tests for the json_option decorator (CHT-711).

Verifies that --json works both before and after subcommand names.
"""
import json
import pytest
from unittest.mock import patch, MagicMock
from click.testing import CliRunner


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


class TestJsonAfterSubcommand:
    """Test that --json works after the subcommand name."""

    def test_issue_list_json_after_subcommand(self, cli_runner):
        """chaotic issue list --json should produce JSON output."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[
            {"id": "1", "identifier": "CHT-1", "title": "Test",
             "status": "backlog", "priority": "medium",
             "issue_type": "task", "estimate": 3, "sprint_id": None},
        ])
        client.get_sprints = MagicMock(return_value=[])

        with patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'list', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.stdout)
        assert isinstance(data, list)
        assert data[0]['identifier'] == 'CHT-1'

    def test_status_json_after_subcommand(self, cli_runner):
        """chaotic status --json should produce JSON output."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={'name': 'Test', 'email': 'test@test.com'})

        with patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_effective_profile', return_value='default'), \
             patch('cli.main.get_current_team', return_value=None), \
             patch('cli.main.get_current_project', return_value=None), \
             patch('cli.main.get_api_key', return_value=None):
            result = cli_runner.invoke(cli, ['status', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.stdout)
        assert 'authenticated' in data

    def test_project_list_json_after_subcommand(self, cli_runner):
        """chaotic project list --json should produce JSON output."""
        from cli.main import cli, client

        client.get_projects = MagicMock(return_value=[
            {"id": "p-1", "key": "CHT", "name": "Chaotic", "issue_count": 42},
        ])

        with patch('cli.main.get_current_team', return_value='test-team-123'):
            result = cli_runner.invoke(cli, ['project', 'list', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.stdout)
        assert isinstance(data, list)
        assert data[0]['id'] == 'p-1'


class TestJsonErrorHandling:
    """Test that errors produce valid JSON when --json is used (CHT-779)."""

    def test_click_exception_outputs_json(self, cli_runner):
        """ClickException errors should output JSON when --json is enabled."""
        from cli.main import cli, client

        client.get_sprints = MagicMock(return_value=[
            {"id": "s1", "name": "Sprint 1"},
        ])

        with patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'list', '--json', '--sprint', 'nonexistent'])

        assert result.exit_code == 1
        data = json.loads(result.stdout)
        assert 'error' in data
        assert 'not found' in data['error'].lower()

    def test_body_level_bad_parameter_outputs_json(self, cli_runner):
        """BadParameter raised inside a command's own body (issue list's
        hand-validated --status is a plain string option, not a
        click.Choice) outputs JSON via handle_error and preserves exit
        code 2 (CHT-1222). This is the BODY-level path only; the
        parse-time paths (real click.Choice, missing args, unknown flags)
        never reach handle_error and are covered by
        TestParseTimeJsonErrorHandling below."""
        from cli.main import cli

        with patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'list', '--json', '--status', 'invalid_status'])

        assert result.exit_code == 2
        data = json.loads(result.stdout)
        assert 'error' in data
        assert 'invalid status' in data['error'].lower()

    def test_plain_click_exception_still_exits_1_under_json(self, cli_runner):
        """A plain click.ClickException (not UsageError) keeps exit code 1
        under --json — only the UsageError/BadParameter 2 is preserved."""
        from cli.main import cli, client

        client.get_sprints = MagicMock(return_value=[
            {"id": "s1", "name": "Sprint 1"},
        ])

        with patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'list', '--json', '--sprint', 'nonexistent'])

        assert result.exit_code == 1
        data = json.loads(result.stdout)
        assert 'error' in data

    def test_click_exception_still_works_without_json(self, cli_runner):
        """ClickExceptions should still produce normal text when --json is not used."""
        from cli.main import cli, client

        client.get_sprints = MagicMock(return_value=[
            {"id": "s1", "name": "Sprint 1"},
        ])

        with patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'list', '--sprint', 'nonexistent'])

        assert result.exit_code == 1
        assert 'not found' in result.output.lower()
        # Should NOT be JSON
        with pytest.raises(json.JSONDecodeError):
            json.loads(result.stdout)


class TestParseTimeJsonErrorHandling:
    """Click's own parameter validation — type=click.Choice(...), missing
    required arguments, unknown flags — fires in parse_args()/make_context(),
    entirely BEFORE any command callback (and therefore before every
    decorator in the json_option/handle_error stack) runs. These used to
    exit 2 with completely EMPTY stdout under --json, hard-crashing any
    harness doing json.loads(check_output(...)). ProfileGroup.main() now
    owns this path (CHT-1222): {"error": ...} on stdout, usage text on
    stderr, exit code 2 preserved."""

    def test_click_choice_validation_outputs_json(self, cli_runner):
        """A real click.Choice-typed option (issue update --status) with a
        bogus value — the overwhelmingly common way a usage error actually
        happens, and the exact repro from the oppositional review."""
        from cli.main import cli

        result = cli_runner.invoke(cli, [
            'issue', 'update', 'CHT-1', '--status', 'bogus', '--json',
        ])

        assert result.exit_code == 2
        data = json.loads(result.stdout)
        assert 'bogus' in data['error']
        assert 'Invalid value' in data['error']
        # Usage text still on stderr for the human reading over the
        # harness's shoulder.
        assert 'Usage:' in result.stderr

    def test_missing_required_argument_outputs_json(self, cli_runner):
        from cli.main import cli

        result = cli_runner.invoke(cli, ['issue', 'comment', 'CHT-1', '--json'])

        assert result.exit_code == 2
        data = json.loads(result.stdout)
        assert 'CONTENT' in data['error']

    def test_unknown_flag_outputs_json(self, cli_runner):
        from cli.main import cli

        result = cli_runner.invoke(cli, ['issue', 'list', '--bogus-flag', '--json'])

        assert result.exit_code == 2
        data = json.loads(result.stdout)
        assert 'bogus-flag' in data['error']

    def test_choice_validation_without_json_unchanged(self, cli_runner):
        """Without --json, parse-time errors keep stock Click behavior:
        usage + error text (stderr), empty stdout, exit 2."""
        from cli.main import cli

        result = cli_runner.invoke(cli, [
            'issue', 'update', 'CHT-1', '--status', 'bogus',
        ])

        assert result.exit_code == 2
        assert result.stdout == ''
        assert 'Invalid value' in result.stderr

    def test_json_success_path_still_exits_0(self, cli_runner):
        """The ProfileGroup.main interposition (standalone_mode=False +
        manual exit handling) must not change successful --json exits."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        with patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'list', '--json'])

        assert result.exit_code == 0
        assert json.loads(result.stdout) == []

    def test_json_help_still_exits_0(self, cli_runner):
        """--help under --json uses ctx.exit() internally (click Exit) —
        the interposed exit handling must map that to exit code 0."""
        from cli.main import cli

        result = cli_runner.invoke(cli, ['issue', 'list', '--json', '--help'])

        assert result.exit_code == 0
        assert 'Usage:' in result.output


class TestJsonBeforeSubcommand:
    """Test that --json still works before the subcommand (backward compat)."""

    def test_global_json_still_works(self, cli_runner):
        """chaotic --json status should still produce JSON output."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={'name': 'Test', 'email': 'test@test.com'})

        with patch('cli.main.find_local_config', return_value=None), \
             patch('cli.main.get_effective_profile', return_value='default'), \
             patch('cli.main.get_current_team', return_value=None), \
             patch('cli.main.get_current_project', return_value=None), \
             patch('cli.main.get_api_key', return_value=None):
            result = cli_runner.invoke(cli, ['--json', 'status'])

        assert result.exit_code == 0
        data = json.loads(result.stdout)
        assert 'authenticated' in data


class TestJsonOptionDecorator:
    """Unit tests for the json_option decorator itself."""

    def test_sets_ctx_obj_json_when_flag_passed(self):
        """json_option should set ctx.obj['json'] = True when --json is used."""
        import click
        from cli.main import json_option

        @click.command()
        @json_option
        def dummy_cmd():
            ctx = click.get_current_context()
            click.echo(f"json={ctx.obj.get('json', False)}")

        runner = CliRunner()
        result = runner.invoke(dummy_cmd, ['--json'])
        assert result.exit_code == 0
        assert 'json=True' in result.output

    def test_does_not_set_json_without_flag(self):
        """json_option should not set ctx.obj['json'] when --json is not used."""
        import click
        from cli.main import json_option

        @click.command()
        @json_option
        def dummy_cmd():
            ctx = click.get_current_context()
            obj = ctx.obj or {}
            click.echo(f"json={obj.get('json', False)}")

        runner = CliRunner()
        result = runner.invoke(dummy_cmd, [])
        assert result.exit_code == 0
        assert 'json=False' in result.output
