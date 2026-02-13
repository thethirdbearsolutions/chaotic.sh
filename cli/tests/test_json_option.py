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
        data = json.loads(result.output)
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
        data = json.loads(result.output)
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
        data = json.loads(result.output)
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
        data = json.loads(result.output)
        assert 'error' in data
        assert 'not found' in data['error'].lower()

    def test_bad_parameter_outputs_json(self, cli_runner):
        """BadParameter errors from validation should output JSON when --json is enabled."""
        from cli.main import cli

        with patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'list', '--json', '--status', 'invalid_status'])

        assert result.exit_code == 1
        data = json.loads(result.output)
        assert 'error' in data
        assert 'invalid status' in data['error'].lower()

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
            json.loads(result.output)


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
        data = json.loads(result.output)
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
