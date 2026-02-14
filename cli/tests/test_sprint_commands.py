"""Tests for sprint CLI commands (CHT-722).

Tests for sprint current, sprint show, sprint list, sprint budget, and sprint close.
"""
from unittest.mock import patch, MagicMock
import click
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def mock_sprint():
    """Standard active sprint."""
    return {
        "id": "sprint-uuid-123",
        "name": "Sprint 30",
        "status": "active",
        "budget": 20,
        "points_spent": 11,
        "start_date": "2026-02-01T00:00:00",
        "end_date": "2026-02-14T00:00:00",
        "limbo": False,
        "project_id": "test-project-123",
    }


class TestSprintCurrent:
    """Tests for sprint current command."""

    def test_sprint_current_shows_active_sprint(self, cli_runner, mock_sprint):
        """sprint current shows the active sprint panel."""
        from cli.main import cli, client

        client.get_current_sprint = MagicMock(return_value=mock_sprint)

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['sprint', 'current'])

        assert result.exit_code == 0
        assert 'Sprint 30' in result.output
        assert 'Active' in result.output

    def test_sprint_current_shows_budget(self, cli_runner, mock_sprint):
        """sprint current includes budget info."""
        from cli.main import cli, client

        client.get_current_sprint = MagicMock(return_value=mock_sprint)

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['sprint', 'current'])

        assert result.exit_code == 0
        assert '11/20' in result.output

    def test_sprint_current_shows_limbo(self, cli_runner, mock_sprint):
        """sprint current shows limbo indicator when in limbo."""
        from cli.main import cli, client

        mock_sprint["limbo"] = True
        client.get_current_sprint = MagicMock(return_value=mock_sprint)

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['sprint', 'current'])

        assert result.exit_code == 0
        assert 'LIMBO' in result.output

    def test_sprint_current_api_error(self, cli_runner):
        """sprint current shows error on API failure."""
        from cli.main import cli, client
        # Use APIError from cli.main to match the class bound in handle_error
        from cli.main import APIError

        client.get_current_sprint = MagicMock(side_effect=APIError("No active sprint"))

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['sprint', 'current'])

        assert result.exit_code != 0
        assert 'No active sprint' in result.output


class TestSprintShow:
    """Tests for sprint show command."""

    def test_sprint_show_default_shows_current(self, cli_runner, mock_sprint):
        """sprint show without args shows current sprint."""
        from cli.main import cli, client

        client.get_sprint = MagicMock(return_value=mock_sprint)
        client.get_issues = MagicMock(return_value=[])

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, ['sprint', 'show'])

        assert result.exit_code == 0
        assert 'Sprint 30' in result.output

    def test_sprint_show_with_issues(self, cli_runner, mock_sprint):
        """sprint show displays sprint issues in a table."""
        from cli.main import cli, client

        issues = [
            {
                "identifier": "CHT-100",
                "title": "Test issue",
                "status": "in_progress",
                "priority": "high",
                "estimate": 3,
            },
        ]
        client.get_sprint = MagicMock(return_value=mock_sprint)
        client.get_issues = MagicMock(return_value=issues)

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, ['sprint', 'show'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output
        assert 'Test issue' in result.output

    def test_sprint_show_no_issues(self, cli_runner, mock_sprint):
        """sprint show with empty sprint shows message."""
        from cli.main import cli, client

        client.get_sprint = MagicMock(return_value=mock_sprint)
        client.get_issues = MagicMock(return_value=[])

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, ['sprint', 'show'])

        assert result.exit_code == 0
        assert 'No issues' in result.output

    def test_sprint_show_with_explicit_id(self, cli_runner, mock_sprint):
        """sprint show with explicit sprint ID resolves it."""
        from cli.main import cli, client

        client.get_sprint = MagicMock(return_value=mock_sprint)
        client.get_issues = MagicMock(return_value=[])

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123') as mock_resolve:
            result = cli_runner.invoke(cli, ['sprint', 'show', 'Sprint 30'])

        assert result.exit_code == 0
        mock_resolve.assert_called_once_with('Sprint 30', 'test-project-123')


class TestSprintList:
    """Tests for sprint list command."""

    def test_sprint_list_shows_sprints(self, cli_runner):
        """sprint list displays sprints in a table."""
        from cli.main import cli, client

        sprints = [
            {
                "id": "sprint-1",
                "name": "Sprint 29",
                "status": "completed",
                "start_date": "2026-01-15T00:00:00",
                "end_date": "2026-01-28T00:00:00",
            },
            {
                "id": "sprint-2",
                "name": "Sprint 30",
                "status": "active",
                "start_date": "2026-02-01T00:00:00",
                "end_date": "2026-02-14T00:00:00",
            },
        ]
        client.get_sprints = MagicMock(return_value=sprints)

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['sprint', 'list'])

        assert result.exit_code == 0
        assert 'Sprint 29' in result.output
        assert 'Sprint 30' in result.output

    def test_sprint_list_no_sprints(self, cli_runner):
        """sprint list with no sprints shows message."""
        from cli.main import cli, client

        client.get_sprints = MagicMock(return_value=[])

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['sprint', 'list'])

        assert result.exit_code == 0
        assert 'No sprints found' in result.output

    def test_sprint_list_status_filter(self, cli_runner):
        """sprint list --status active filters by status."""
        from cli.main import cli, client

        client.get_sprints = MagicMock(return_value=[])

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['sprint', 'list', '--status', 'active'])

        assert result.exit_code == 0
        client.get_sprints.assert_called_once_with('test-project-123', 'active')


class TestSprintBudget:
    """Tests for sprint budget command."""

    def test_sprint_budget_shows_budget(self, cli_runner, mock_sprint):
        """sprint budget shows budget breakdown."""
        from cli.main import cli, client

        client.get_current_sprint = MagicMock(return_value=mock_sprint)

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['sprint', 'budget'])

        assert result.exit_code == 0
        assert '20' in result.output  # budget
        assert '11' in result.output  # spent
        assert '9' in result.output   # remaining

    def test_sprint_budget_unlimited(self, cli_runner, mock_sprint):
        """sprint budget with no budget set shows unlimited."""
        from cli.main import cli, client

        mock_sprint["budget"] = None
        client.get_current_sprint = MagicMock(return_value=mock_sprint)

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['sprint', 'budget'])

        assert result.exit_code == 0
        assert 'Unlimited' in result.output

    def test_sprint_budget_in_arrears(self, cli_runner, mock_sprint):
        """sprint budget shows arrears when over budget."""
        from cli.main import cli, client

        mock_sprint["points_spent"] = 25
        client.get_current_sprint = MagicMock(return_value=mock_sprint)

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['sprint', 'budget'])

        assert result.exit_code == 0
        assert 'over budget' in result.output.lower()
        assert 'BLOCKED' in result.output


class TestSprintClose:
    """Tests for sprint close command."""

    def test_sprint_close_with_limbo(self, cli_runner):
        """sprint close enters limbo when rituals are pending."""
        from cli.main import cli, client

        client.close_sprint = MagicMock(return_value={
            "name": "Sprint 30",
            "limbo": True,
        })

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, ['sprint', 'close'])

        assert result.exit_code == 0
        assert 'Sprint 30' in result.output
        assert 'ritual' in result.output.lower()

    def test_sprint_close_no_limbo(self, cli_runner):
        """sprint close without rituals activates next sprint."""
        from cli.main import cli, client

        client.close_sprint = MagicMock(return_value={
            "name": "Sprint 30",
            "limbo": False,
        })

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, ['sprint', 'close'])

        assert result.exit_code == 0
        assert 'Sprint 30' in result.output
        assert 'closed' in result.output.lower()


class TestSprintUpdate:
    """Tests for sprint update command."""

    def test_sprint_update_name(self, cli_runner, mock_sprint):
        """sprint update --name updates the sprint name."""
        from cli.main import cli, client

        client.update_sprint = MagicMock(return_value={
            "name": "Sprint 30 Renamed",
        })

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, [
                'sprint', 'update', 'sprint-uuid-123', '--name', 'Sprint 30 Renamed',
            ])

        assert result.exit_code == 0
        assert 'Sprint 30 Renamed' in result.output
        assert 'updated' in result.output.lower()
        client.update_sprint.assert_called_once_with('sprint-uuid-123', name='Sprint 30 Renamed')

    def test_sprint_update_description(self, cli_runner, mock_sprint):
        """sprint update --description updates the description."""
        from cli.main import cli, client

        client.update_sprint = MagicMock(return_value={
            "name": "Sprint 30",
        })

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, [
                'sprint', 'update', 'sprint-uuid-123', '--description', 'New description',
            ])

        assert result.exit_code == 0
        client.update_sprint.assert_called_once_with('sprint-uuid-123', description='New description')

    def test_sprint_update_empty_description(self, cli_runner, mock_sprint):
        """sprint update --description '' clears the description."""
        from cli.main import cli, client

        client.update_sprint = MagicMock(return_value={
            "name": "Sprint 30",
        })

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, [
                'sprint', 'update', 'sprint-uuid-123', '--description', '',
            ])

        assert result.exit_code == 0
        client.update_sprint.assert_called_once_with('sprint-uuid-123', description='')

    def test_sprint_update_budget(self, cli_runner, mock_sprint):
        """sprint update --budget sets the point budget."""
        from cli.main import cli, client

        client.update_sprint = MagicMock(return_value={
            "name": "Sprint 30",
        })

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, [
                'sprint', 'update', 'sprint-uuid-123', '--budget', '25',
            ])

        assert result.exit_code == 0
        client.update_sprint.assert_called_once_with('sprint-uuid-123', budget=25)

    def test_sprint_update_no_budget(self, cli_runner):
        """sprint update --no-budget removes the budget limit."""
        from cli.main import cli, client

        client.update_sprint = MagicMock(return_value={
            "name": "Sprint 30",
        })

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, [
                'sprint', 'update', 'sprint-uuid-123', '--no-budget',
            ])

        assert result.exit_code == 0
        client.update_sprint.assert_called_once_with('sprint-uuid-123', budget=None)

    def test_sprint_update_no_budget_overrides_budget(self, cli_runner):
        """--no-budget takes precedence over --budget."""
        from cli.main import cli, client

        client.update_sprint = MagicMock(return_value={
            "name": "Sprint 30",
        })

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, [
                'sprint', 'update', 'sprint-uuid-123', '--no-budget', '--budget', '25',
            ])

        assert result.exit_code == 0
        # --no-budget sets budget=None, overriding --budget
        client.update_sprint.assert_called_once_with('sprint-uuid-123', budget=None)

    def test_sprint_update_combined(self, cli_runner):
        """sprint update with multiple options sends all updates."""
        from cli.main import cli, client

        client.update_sprint = MagicMock(return_value={
            "name": "New Name",
        })

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, [
                'sprint', 'update', 'sprint-uuid-123',
                '--name', 'New Name', '--budget', '30',
            ])

        assert result.exit_code == 0
        client.update_sprint.assert_called_once_with(
            'sprint-uuid-123', name='New Name', budget=30,
        )

    def test_sprint_update_no_options_shows_warning(self, cli_runner):
        """sprint update with no options shows warning and makes no API call."""
        from cli.main import cli, client

        client.update_sprint = MagicMock()

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, [
                'sprint', 'update', 'sprint-uuid-123',
            ])

        assert result.exit_code == 0
        assert 'No updates provided' in result.output
        client.update_sprint.assert_not_called()

    def test_sprint_update_resolves_sprint_id(self, cli_runner):
        """sprint update resolves sprint ID via resolve_sprint_id."""
        from cli.main import cli, client

        client.update_sprint = MagicMock(return_value={
            "name": "Sprint 30",
        })

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123') as mock_resolve:
            result = cli_runner.invoke(cli, [
                'sprint', 'update', 'Sprint 30', '--name', 'Renamed',
            ])

        assert result.exit_code == 0
        mock_resolve.assert_called_once_with('Sprint 30', 'test-project-123')

    def test_sprint_update_api_error(self, cli_runner):
        """sprint update shows error on API failure."""
        from cli.main import cli, client, APIError

        client.update_sprint = MagicMock(side_effect=APIError("Sprint not found"))

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, [
                'sprint', 'update', 'sprint-uuid-123', '--name', 'New Name',
            ])

        assert result.exit_code != 0
        assert 'Sprint not found' in result.output

    def test_sprint_update_empty_name_sent_to_api(self, cli_runner):
        """sprint update --name '' sends empty string to API (consistent with --description)."""
        from cli.main import cli, client

        client.update_sprint = MagicMock(return_value={"name": ""})

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123'):
            result = cli_runner.invoke(cli, [
                'sprint', 'update', 'sprint-uuid-123', '--name', '',
            ])

        assert result.exit_code == 0
        client.update_sprint.assert_called_once_with('sprint-uuid-123', name='')

    def test_sprint_update_resolve_failure(self, cli_runner):
        """sprint update shows error when sprint ID resolution fails."""
        import click
        from cli.main import cli, client

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id',
                   side_effect=click.ClickException("Sprint 'xyz' not found")):
            result = cli_runner.invoke(cli, [
                'sprint', 'update', 'xyz', '--name', 'New Name',
            ])

        assert result.exit_code != 0
        assert 'not found' in result.output

    def test_sprint_update_no_project_skips_resolve(self, cli_runner):
        """sprint update without project passes raw ID without resolution."""
        from cli.main import cli, client

        client.update_sprint = MagicMock(return_value={
            "name": "Sprint 30",
        })

        with patch('cli.main.get_current_project', return_value=None), \
             patch('cli.main.resolve_sprint_id') as mock_resolve:
            result = cli_runner.invoke(cli, [
                'sprint', 'update', 'raw-sprint-id', '--name', 'Renamed',
            ])

        assert result.exit_code == 0
        mock_resolve.assert_not_called()
        client.update_sprint.assert_called_once_with('raw-sprint-id', name='Renamed')

    def test_sprint_update_defaults_to_current(self, cli_runner):
        """sprint update without SPRINT_ID defaults to current sprint (CHT-780)."""
        from cli.main import cli, client

        client.update_sprint = MagicMock(return_value={
            "name": "Current Sprint",
        })

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='current-sprint-id') as mock_resolve:
            result = cli_runner.invoke(cli, [
                'sprint', 'update', '--budget', '22',
            ])

        assert result.exit_code == 0
        mock_resolve.assert_called_once_with('current', 'test-project-123')
        client.update_sprint.assert_called_once_with('current-sprint-id', budget=22)

    def test_sprint_update_no_sprint_id_no_project_errors(self, cli_runner):
        """sprint update without SPRINT_ID and no project gives clear error (CHT-780)."""
        from cli.main import cli

        with patch('cli.main.get_current_project', return_value=None):
            result = cli_runner.invoke(cli, ['sprint', 'update', '--budget', '10'])

        assert result.exit_code != 0
        assert 'No project selected' in result.output

    def test_sprint_update_no_current_sprint_errors(self, cli_runner):
        """sprint update without SPRINT_ID when no current sprint gives API error (CHT-780)."""
        from cli.main import cli

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', side_effect=click.ClickException("No current sprint found")):
            result = cli_runner.invoke(cli, ['sprint', 'update', '--budget', '10'])

        assert result.exit_code != 0
        assert 'No current sprint' in result.output


class TestSprintAdd:
    """Tests for chaotic sprint add (CHT-830)."""

    def test_add_single_issue(self, cli_runner):
        """sprint add adds a single issue to current sprint."""
        from cli.main import cli, client

        client.get_current_sprint = MagicMock(return_value={"id": "sprint-1"})
        client.get_issue_by_identifier = MagicMock(return_value={"id": "issue-1", "identifier": "CHT-10"})
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['sprint', 'add', 'CHT-10'])

        assert result.exit_code == 0
        assert 'Added CHT-10 to current sprint' in result.output
        client.update_issue.assert_called_once_with("issue-1", sprint_id="sprint-1")

    def test_add_multiple_issues(self, cli_runner):
        """sprint add adds multiple issues at once."""
        from cli.main import cli, client

        client.get_current_sprint = MagicMock(return_value={"id": "sprint-1"})
        client.get_issue_by_identifier = MagicMock(side_effect=[
            {"id": "issue-1", "identifier": "CHT-10"},
            {"id": "issue-2", "identifier": "CHT-11"},
        ])
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['sprint', 'add', 'CHT-10', 'CHT-11'])

        assert result.exit_code == 0
        assert 'Added CHT-10' in result.output
        assert 'Added CHT-11' in result.output
        assert client.update_issue.call_count == 2

    def test_add_no_identifiers_shows_usage(self, cli_runner):
        """sprint add with no identifiers shows usage."""
        from cli.main import cli

        result = cli_runner.invoke(cli, ['sprint', 'add'])

        assert result.exit_code != 0

    def test_add_no_project_errors(self, cli_runner):
        """sprint add without a project selected shows error."""
        from cli.main import cli

        with patch('cli.main.get_current_project', return_value=None):
            result = cli_runner.invoke(cli, ['sprint', 'add', 'CHT-10'])

        assert result.exit_code != 0
        assert 'No project selected' in result.output


class TestSprintRemove:
    """Tests for chaotic sprint remove (CHT-830)."""

    def test_remove_single_issue(self, cli_runner):
        """sprint remove removes an issue from its sprint."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={"id": "issue-1", "identifier": "CHT-10"})
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['sprint', 'remove', 'CHT-10'])

        assert result.exit_code == 0
        assert 'Removed CHT-10 from sprint' in result.output
        client.update_issue.assert_called_once_with("issue-1", sprint_id=None)

    def test_remove_multiple_issues(self, cli_runner):
        """sprint remove removes multiple issues."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(side_effect=[
            {"id": "issue-1", "identifier": "CHT-10"},
            {"id": "issue-2", "identifier": "CHT-11"},
        ])
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['sprint', 'remove', 'CHT-10', 'CHT-11'])

        assert result.exit_code == 0
        assert 'Removed CHT-10' in result.output
        assert 'Removed CHT-11' in result.output
        assert client.update_issue.call_count == 2
