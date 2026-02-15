"""Tests for project CLI commands (CHT-887).

Tests cover: project list, create, use, show, update.
"""
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def mock_project():
    """Standard project data."""
    return {
        "id": "proj-uuid-123",
        "key": "CHT",
        "name": "Chaotic",
        "description": "Issue tracker",
        "issue_count": 42,
        "estimate_scale": "fibonacci",
        "default_sprint_budget": 20,
        "unestimated_handling": "default_one_point",
    }


class TestProjectList:
    """Tests for project list command."""

    def test_project_list_shows_projects(self, cli_runner, mock_project):
        """project list displays projects in a table."""
        from cli.main import cli, client

        client.get_projects = MagicMock(return_value=[mock_project])

        result = cli_runner.invoke(cli, ['project', 'list'])

        assert result.exit_code == 0
        assert 'Chaotic' in result.output
        assert 'CHT' in result.output

    def test_project_list_no_projects(self, cli_runner):
        """project list with no projects shows message."""
        from cli.main import cli, client

        client.get_projects = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['project', 'list'])

        assert result.exit_code == 0
        assert 'No projects found' in result.output

    def test_project_list_marks_current(self, cli_runner, mock_project):
        """project list marks the current project."""
        from cli.main import cli, client

        client.get_projects = MagicMock(return_value=[mock_project])

        with patch('cli.main.get_current_project', return_value='proj-uuid-123'):
            result = cli_runner.invoke(cli, ['project', 'list'])

        assert result.exit_code == 0
        assert '✓' in result.output

    def test_project_list_json(self, cli_runner, mock_project):
        """project list --json outputs JSON."""
        from cli.main import cli, client

        client.get_projects = MagicMock(return_value=[mock_project])

        result = cli_runner.invoke(cli, ['project', 'list', '--json'])

        assert result.exit_code == 0
        assert 'Chaotic' in result.output


class TestProjectCreate:
    """Tests for project create command."""

    def test_project_create_success(self, cli_runner):
        """project create creates a project and sets as current."""
        from cli.main import cli, client

        client.create_project = MagicMock(return_value={
            "id": "new-proj-id",
            "name": "New Project",
            "key": "NP",
        })

        with patch('cli.main.set_current_project') as mock_set:
            result = cli_runner.invoke(cli, ['project', 'create', 'New Project', 'np'])

        assert result.exit_code == 0
        assert 'New Project' in result.output
        assert 'created' in result.output.lower()
        mock_set.assert_called_once_with('new-proj-id')

    def test_project_create_with_options(self, cli_runner):
        """project create with all options."""
        from cli.main import cli, client

        client.create_project = MagicMock(return_value={
            "id": "new-proj-id",
            "name": "Test",
            "key": "TST",
        })

        with patch('cli.main.set_current_project'):
            result = cli_runner.invoke(cli, [
                'project', 'create', 'Test', 'tst',
                '--description', 'A test project',
                '--color', '#ff0000',
                '--estimate-scale', 'linear',
                '--default-sprint-budget', '25',
            ])

        assert result.exit_code == 0
        call_kwargs = client.create_project.call_args[1]
        assert call_kwargs['description'] == 'A test project'
        assert call_kwargs['color'] == '#ff0000'
        assert call_kwargs['estimate_scale'] == 'linear'
        assert call_kwargs['default_sprint_budget'] == 25


class TestProjectUse:
    """Tests for project use command."""

    def test_project_use_switches_project(self, cli_runner, mock_project):
        """project use switches to specified project."""
        from cli.main import cli

        with patch('cli.main.resolve_project', return_value=mock_project), \
             patch('cli.main.set_current_project') as mock_set:
            result = cli_runner.invoke(cli, ['project', 'use', 'CHT'])

        assert result.exit_code == 0
        assert 'Switched to project' in result.output
        mock_set.assert_called_once_with('proj-uuid-123')


class TestProjectShow:
    """Tests for project show command."""

    def test_project_show_current(self, cli_runner, mock_project):
        """project show without args shows current project."""
        from cli.main import cli, client

        client.get_project = MagicMock(return_value=mock_project)

        result = cli_runner.invoke(cli, ['project', 'show'])

        assert result.exit_code == 0
        assert 'Chaotic' in result.output
        assert 'Fibonacci' in result.output

    def test_project_show_by_identifier(self, cli_runner, mock_project):
        """project show with identifier resolves project."""
        from cli.main import cli

        with patch('cli.main.resolve_project', return_value=mock_project), \
             patch('cli.main.get_current_project', return_value='proj-uuid-123'):
            result = cli_runner.invoke(cli, ['project', 'show', 'CHT'])

        assert result.exit_code == 0
        assert 'Chaotic' in result.output

    def test_project_show_no_project_errors(self, cli_runner):
        """project show without project selected shows error."""
        from cli.main import cli

        with patch('cli.main.get_current_project', return_value=None):
            result = cli_runner.invoke(cli, ['project', 'show'])

        assert result.exit_code != 0
        assert 'No current project' in result.output

    def test_project_show_json(self, cli_runner, mock_project):
        """project show --json outputs JSON."""
        from cli.main import cli, client

        client.get_project = MagicMock(return_value=mock_project)

        result = cli_runner.invoke(cli, ['project', 'show', '--json'])

        assert result.exit_code == 0
        assert 'Chaotic' in result.output


class TestProjectUpdate:
    """Tests for project update command."""

    def test_project_update_name(self, cli_runner):
        """project update --name updates the name."""
        from cli.main import cli, client

        client.update_project = MagicMock()

        result = cli_runner.invoke(cli, ['project', 'update', '--name', 'Renamed'])

        assert result.exit_code == 0
        assert 'updated' in result.output.lower()
        client.update_project.assert_called_once_with('test-project-123', name='Renamed')

    def test_project_update_no_options(self, cli_runner):
        """project update with no options shows warning."""
        from cli.main import cli, client

        client.update_project = MagicMock()

        result = cli_runner.invoke(cli, ['project', 'update'])

        assert result.exit_code == 0
        assert 'No updates provided' in result.output
        client.update_project.assert_not_called()

    def test_project_update_budget(self, cli_runner):
        """project update --default-sprint-budget sets budget."""
        from cli.main import cli, client

        client.update_project = MagicMock()

        result = cli_runner.invoke(cli, [
            'project', 'update', '--default-sprint-budget', '30',
        ])

        assert result.exit_code == 0
        client.update_project.assert_called_once_with('test-project-123', default_sprint_budget=30)

    def test_project_update_no_budget(self, cli_runner):
        """project update --no-default-sprint-budget removes budget."""
        from cli.main import cli, client

        client.update_project = MagicMock()

        result = cli_runner.invoke(cli, ['project', 'update', '--no-default-sprint-budget'])

        assert result.exit_code == 0
        client.update_project.assert_called_once_with('test-project-123', default_sprint_budget=None)

    def test_project_update_estimate_scale(self, cli_runner):
        """project update --estimate-scale changes scale."""
        from cli.main import cli, client

        client.update_project = MagicMock()

        result = cli_runner.invoke(cli, [
            'project', 'update', '--estimate-scale', 'tshirt',
        ])

        assert result.exit_code == 0
        client.update_project.assert_called_once_with('test-project-123', estimate_scale='tshirt')

    def test_project_update_combined(self, cli_runner):
        """project update with multiple options sends all."""
        from cli.main import cli, client

        client.update_project = MagicMock()

        result = cli_runner.invoke(cli, [
            'project', 'update', '--name', 'New Name', '--color', '#ff0000',
        ])

        assert result.exit_code == 0
        client.update_project.assert_called_once_with(
            'test-project-123', name='New Name', color='#ff0000',
        )
