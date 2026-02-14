"""Tests for chaotic epic command group (CHT-824).

Tests for epic create, list, and show commands.
"""
import json
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def mock_epic():
    """Standard epic issue for testing."""
    return {
        "id": "epic-uuid-1",
        "identifier": "CHT-50",
        "title": "User Authentication",
        "description": "Implement user auth flow.",
        "status": "in_progress",
        "priority": "high",
        "issue_type": "epic",
        "estimate": 8,
        "project_id": "test-project-123",
    }


@pytest.fixture
def mock_sub_issues():
    """Sub-issues for an epic."""
    return [
        {"id": "sub-1", "identifier": "CHT-51", "title": "Login page", "status": "done", "priority": "high", "estimate": 3},
        {"id": "sub-2", "identifier": "CHT-52", "title": "Signup page", "status": "in_progress", "priority": "medium", "estimate": 3},
        {"id": "sub-3", "identifier": "CHT-53", "title": "Password reset", "status": "todo", "priority": "low", "estimate": 2},
    ]


class TestEpicCreate:
    """Tests for epic create command."""

    def test_create_epic(self, cli_runner):
        """epic create sets issue_type to epic."""
        from cli.main import cli, client

        created = {"id": "new-epic", "identifier": "CHT-60", "title": "Search Feature", "issue_type": "epic"}
        client.create_issue = MagicMock(return_value=created)

        result = cli_runner.invoke(cli, ['epic', 'create', 'Search Feature'])

        assert result.exit_code == 0
        assert 'CHT-60' in result.output
        assert 'Search Feature' in result.output
        # Verify issue_type=epic was passed
        call_kwargs = client.create_issue.call_args
        assert call_kwargs[1]['issue_type'] == 'epic'

    def test_create_epic_shows_next_step_hint(self, cli_runner):
        """epic create shows hint about adding sub-issues."""
        from cli.main import cli, client

        created = {"id": "new-epic", "identifier": "CHT-60", "title": "Search Feature", "issue_type": "epic"}
        client.create_issue = MagicMock(return_value=created)

        result = cli_runner.invoke(cli, ['epic', 'create', 'Search Feature'])

        assert result.exit_code == 0
        assert '--parent CHT-60' in result.output

    def test_create_epic_no_title_error(self, cli_runner):
        """epic create without title shows error."""
        from cli.main import cli

        result = cli_runner.invoke(cli, ['epic', 'create'])

        assert result.exit_code != 0
        assert 'Title is required' in result.output

    def test_create_epic_with_options(self, cli_runner):
        """epic create passes through priority, description, etc."""
        from cli.main import cli, client

        created = {"id": "new-epic", "identifier": "CHT-60", "title": "Auth", "issue_type": "epic"}
        client.create_issue = MagicMock(return_value=created)

        result = cli_runner.invoke(cli, ['epic', 'create', 'Auth', '--priority', 'high', '--description', 'Auth system'])

        assert result.exit_code == 0
        call_kwargs = client.create_issue.call_args
        assert call_kwargs[1]['priority'] == 'high'
        assert call_kwargs[1]['description'] == 'Auth system'


class TestEpicList:
    """Tests for epic list command."""

    def test_list_epics(self, cli_runner, mock_epic):
        """epic list shows epics with progress."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[mock_epic])
        client.get_sub_issues = MagicMock(return_value=[
            {"id": "s1", "status": "done"},
            {"id": "s2", "status": "in_progress"},
            {"id": "s3", "status": "done"},
        ])

        result = cli_runner.invoke(cli, ['epic', 'list'])

        assert result.exit_code == 0
        assert 'CHT-50' in result.output
        assert 'User Authentication' in result.output
        assert '2/3 done' in result.output
        # Verify issue_type=epic filter was used
        client.get_issues.assert_called_once()
        call_kwargs = client.get_issues.call_args
        assert call_kwargs[1]['issue_type'] == 'epic'

    def test_list_epics_empty(self, cli_runner):
        """epic list shows message when no epics exist."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['epic', 'list'])

        assert result.exit_code == 0
        assert 'No epics found' in result.output

    def test_list_epics_no_sub_issues(self, cli_runner, mock_epic):
        """epic list shows dash for progress when no sub-issues."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[mock_epic])
        client.get_sub_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['epic', 'list'])

        assert result.exit_code == 0
        assert 'CHT-50' in result.output

    def test_list_epics_json(self, cli_runner, mock_epic):
        """epic list --json includes sub_issues."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[mock_epic])
        client.get_sub_issues = MagicMock(return_value=[{"id": "s1", "status": "done"}])

        result = cli_runner.invoke(cli, ['epic', 'list', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert len(data) == 1
        assert data[0]['sub_issues'] == [{"id": "s1", "status": "done"}]

    def test_list_epics_invalid_status(self, cli_runner):
        """epic list rejects invalid status values."""
        from cli.main import cli

        result = cli_runner.invoke(cli, ['epic', 'list', '--status', 'invalid'])

        assert result.exit_code != 0
        assert 'Invalid status' in result.output

    def test_list_epics_with_status_filter(self, cli_runner, mock_epic):
        """epic list --status filters correctly."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[mock_epic])
        client.get_sub_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['epic', 'list', '--status', 'in_progress'])

        assert result.exit_code == 0
        call_kwargs = client.get_issues.call_args
        assert call_kwargs[1]['status'] == 'in_progress'


class TestEpicShow:
    """Tests for epic show command."""

    def test_show_epic_with_sub_issues(self, cli_runner, mock_epic, mock_sub_issues):
        """epic show displays epic details and sub-issue tree."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_epic)
        client.get_sub_issues = MagicMock(return_value=mock_sub_issues)

        result = cli_runner.invoke(cli, ['epic', 'show', 'CHT-50'])

        assert result.exit_code == 0
        assert 'User Authentication' in result.output
        assert 'CHT-51' in result.output
        assert 'Login page' in result.output
        assert '1/3 done' in result.output
        assert '✓' in result.output  # done checkmark
        assert '✗' in result.output  # not-done mark

    def test_show_epic_no_sub_issues(self, cli_runner, mock_epic):
        """epic show with no sub-issues shows hint."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_epic)
        client.get_sub_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['epic', 'show', 'CHT-50'])

        assert result.exit_code == 0
        assert 'No sub-issues yet' in result.output
        assert '--parent CHT-50' in result.output

    def test_show_non_epic_warns_and_returns(self, cli_runner):
        """epic show warns and returns early if issue is not an epic."""
        from cli.main import cli, client

        non_epic = {"id": "issue-1", "identifier": "CHT-100", "title": "Bug fix",
                     "status": "todo", "priority": "medium", "issue_type": "task"}
        client.get_issue_by_identifier = MagicMock(return_value=non_epic)
        client.get_sub_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['epic', 'show', 'CHT-100'])

        assert result.exit_code == 0
        assert 'not an epic' in result.output
        assert 'Sub-issues' not in result.output
        client.get_sub_issues.assert_not_called()

    def test_show_epic_json(self, cli_runner, mock_epic, mock_sub_issues):
        """epic show --json includes sub_issues and comments."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_epic)
        client.get_comments = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(return_value=mock_sub_issues)

        result = cli_runner.invoke(cli, ['epic', 'show', 'CHT-50', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert data['identifier'] == 'CHT-50'
        assert len(data['sub_issues']) == 3

    def test_show_epic_sub_issues_api_failure(self, cli_runner, mock_epic):
        """epic show handles sub-issues API failure gracefully."""
        from cli.main import cli, client, APIError

        client.get_issue_by_identifier = MagicMock(return_value=mock_epic)
        client.get_sub_issues = MagicMock(side_effect=APIError("Not supported"))

        result = cli_runner.invoke(cli, ['epic', 'show', 'CHT-50'])

        assert result.exit_code == 0
        assert 'No sub-issues yet' in result.output
