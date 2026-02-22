"""Tests for epic create, list, show commands (CHT-887).

Tests cover: epic create (basic, options, labels, sprint, project override),
epic list (table with progress, status filter, JSON, empty),
epic show (detailed view, sub-issues, non-epic rejection, JSON).
"""
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def sample_epic():
    """Standard epic for testing."""
    return {
        "id": "epic-uuid-123",
        "identifier": "CHT-50",
        "title": "User Authentication",
        "status": "in_progress",
        "priority": "high",
        "issue_type": "epic",
        "estimate": 13,
        "description": "Implement user auth.",
    }


class TestEpicCreate:
    """Tests for epic create command."""

    def test_create_basic(self, cli_runner):
        """epic create with title creates epic."""
        from cli.main import cli, client

        client.create_issue = MagicMock(return_value={
            "id": "new-id",
            "identifier": "CHT-200",
            "title": "New Epic",
        })

        result = cli_runner.invoke(cli, ['epic', 'create', 'New Epic'])

        assert result.exit_code == 0
        assert 'CHT-200' in result.output
        assert 'created' in result.output.lower()
        call_kwargs = client.create_issue.call_args[1]
        assert call_kwargs['issue_type'] == 'epic'

    def test_create_with_options(self, cli_runner):
        """epic create with all options."""
        from cli.main import cli, client

        client.create_issue = MagicMock(return_value={
            "id": "new-id",
            "identifier": "CHT-200",
            "title": "Big Epic",
        })

        result = cli_runner.invoke(cli, [
            'epic', 'create', 'Big Epic',
            '--description', 'A big epic',
            '--priority', 'urgent',
            '--estimate', '21',
        ])

        assert result.exit_code == 0
        call_kwargs = client.create_issue.call_args[1]
        assert call_kwargs['priority'] == 'urgent'
        assert call_kwargs['estimate'] == 21

    def test_create_no_title(self, cli_runner):
        """epic create without title shows error."""
        from cli.main import cli

        result = cli_runner.invoke(cli, ['epic', 'create'])

        assert result.exit_code != 0
        assert 'Title is required' in result.output

    def test_create_with_labels(self, cli_runner):
        """epic create --label resolves and includes label IDs."""
        from cli.main import cli, client

        client.get_labels = MagicMock(return_value=[
            {"id": "label-1", "name": "frontend"},
            {"id": "label-2", "name": "backend"},
        ])
        client.create_issue = MagicMock(return_value={
            "id": "new-id",
            "identifier": "CHT-200",
            "title": "Labeled Epic",
        })

        result = cli_runner.invoke(cli, [
            'epic', 'create', 'Labeled Epic', '--label', 'frontend',
        ])

        assert result.exit_code == 0
        call_kwargs = client.create_issue.call_args[1]
        assert call_kwargs['label_ids'] == ['label-1']

    def test_create_label_not_found(self, cli_runner):
        """epic create with unknown label shows error."""
        from cli.main import cli, client

        client.get_labels = MagicMock(return_value=[
            {"id": "label-1", "name": "bug"},
        ])

        result = cli_runner.invoke(cli, [
            'epic', 'create', 'Epic', '--label', 'nonexistent',
        ])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()

    def test_create_with_sprint(self, cli_runner):
        """epic create --sprint current assigns sprint."""
        from cli.main import cli, client

        client.create_issue = MagicMock(return_value={
            "id": "new-id",
            "identifier": "CHT-200",
            "title": "Sprint Epic",
        })

        with patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-1'):
            result = cli_runner.invoke(cli, [
                'epic', 'create', 'Sprint Epic', '--sprint', 'current',
            ])

        assert result.exit_code == 0
        call_kwargs = client.create_issue.call_args[1]
        assert call_kwargs['sprint_id'] == 'sprint-uuid-1'

    def test_create_shows_sub_issue_hint(self, cli_runner):
        """epic create output includes hint about adding sub-issues."""
        from cli.main import cli, client

        client.create_issue = MagicMock(return_value={
            "id": "new-id",
            "identifier": "CHT-200",
            "title": "Hint Epic",
        })

        result = cli_runner.invoke(cli, ['epic', 'create', 'Hint Epic'])

        assert result.exit_code == 0
        assert '--parent' in result.output
        assert 'CHT-200' in result.output

    def test_create_no_project(self, cli_runner):
        """epic create with no project selected shows error."""
        from cli.main import cli

        with patch('cli.main.get_current_project', return_value=None):
            result = cli_runner.invoke(cli, ['epic', 'create', 'No Project'])

        assert result.exit_code != 0
        assert 'No project' in result.output

    def test_create_with_project_override(self, cli_runner):
        """epic create --project uses specified project."""
        from cli.main import cli, client

        client.create_issue = MagicMock(return_value={
            "id": "new-id",
            "identifier": "OTH-1",
            "title": "Other Project Epic",
        })

        with patch('cli.main.resolve_project_id', return_value='other-project-id'):
            result = cli_runner.invoke(cli, [
                'epic', 'create', 'Other Project Epic', '--project', 'OTHER',
            ])

        assert result.exit_code == 0
        assert client.create_issue.call_args[0][0] == 'other-project-id'


class TestEpicList:
    """Tests for epic list command."""

    def test_list_with_estimate(self, cli_runner):
        """epic list displays epics with estimate."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[
            {
                "id": "epic-1",
                "identifier": "CHT-50",
                "title": "Auth",
                "status": "in_progress",
                "priority": "high",
                "estimate": 13,
            },
        ])

        result = cli_runner.invoke(cli, ['epic', 'list'])

        assert result.exit_code == 0
        assert 'CHT-50' in result.output
        assert '13' in result.output

    def test_list_empty(self, cli_runner):
        """epic list with no epics shows message."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['epic', 'list'])

        assert result.exit_code == 0
        assert 'No epics found' in result.output

    def test_list_no_sub_issues(self, cli_runner):
        """epic list with no sub-issues shows dash."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[
            {
                "id": "epic-1",
                "identifier": "CHT-50",
                "title": "Empty Epic",
                "status": "backlog",
                "priority": "low",
            },
        ])
        client.get_sub_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['epic', 'list'])

        assert result.exit_code == 0

    def test_list_status_filter(self, cli_runner):
        """epic list --status filters by status."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['epic', 'list', '--status', 'in_progress'])

        assert result.exit_code == 0
        call_kwargs = client.get_issues.call_args[1]
        assert call_kwargs['status'] == 'in_progress'

    def test_list_invalid_status(self, cli_runner):
        """epic list --status invalid shows error."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['epic', 'list', '--status', 'invalid'])

        assert result.exit_code != 0

    def test_list_json(self, cli_runner):
        """epic list --json includes sub_issues."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[
            {
                "id": "epic-1",
                "identifier": "CHT-50",
                "title": "Auth",
                "status": "in_progress",
                "priority": "high",
            },
        ])
        client.get_sub_issues = MagicMock(return_value=[{"status": "done"}])

        result = cli_runner.invoke(cli, ['epic', 'list', '--json'])

        assert result.exit_code == 0
        assert 'sub_issues' in result.output


class TestEpicShow:
    """Tests for epic show command."""

    def test_show_epic_with_sub_issues(self, cli_runner, sample_epic):
        """epic show displays epic details and sub-issue tree."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=sample_epic)
        client.get_sub_issues = MagicMock(return_value=[
            {
                "identifier": "CHT-51", "title": "Login page",
                "status": "done", "priority": "high", "estimate": 3,
            },
            {
                "identifier": "CHT-52", "title": "OAuth integration",
                "status": "in_progress", "priority": "medium", "estimate": 5,
            },
        ])

        result = cli_runner.invoke(cli, ['epic', 'show', 'CHT-50'])

        assert result.exit_code == 0
        assert 'CHT-50' in result.output
        assert 'User Authentication' in result.output
        assert 'CHT-51' in result.output
        assert 'CHT-52' in result.output
        assert '1/2 done' in result.output

    def test_show_epic_no_sub_issues(self, cli_runner, sample_epic):
        """epic show with no sub-issues shows hint."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=sample_epic)
        client.get_sub_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['epic', 'show', 'CHT-50'])

        assert result.exit_code == 0
        assert '--parent' in result.output

    def test_show_non_epic_rejected(self, cli_runner):
        """epic show for non-epic issue shows warning."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-1",
            "identifier": "CHT-100",
            "title": "Regular Issue",
            "issue_type": "task",
        })

        result = cli_runner.invoke(cli, ['epic', 'show', 'CHT-100'])

        assert result.exit_code == 0
        assert 'not an epic' in result.output.lower()

    def test_show_json(self, cli_runner, sample_epic):
        """epic show --json includes sub_issues and comments."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=sample_epic)
        client.get_comments = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(return_value=[{"status": "done"}])

        result = cli_runner.invoke(cli, ['epic', 'show', 'CHT-50', '--json'])

        assert result.exit_code == 0
        assert 'sub_issues' in result.output
        assert 'comments' in result.output
