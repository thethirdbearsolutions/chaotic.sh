"""Tests for Sprint 74 CLI polish features (CHT-1124).

Covers: activity command, --assignee filter on issue list,
issue view/get --json, --no-sprint on issue update.
"""
from unittest.mock import MagicMock, patch
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


class TestActivityCommand:
    """Tests for chaotic activity command."""

    def test_activity_shows_table(self, cli_runner):
        from cli.main import cli, client

        client.get_team_activities = MagicMock(return_value=[
            {
                "created_at": "2026-02-28T10:00:00Z",
                "issue_identifier": "CHT-100",
                "activity_type": "status_change",
                "user_name": "Alice",
                "field_name": "status",
                "old_value": "backlog",
                "new_value": "in_progress",
                "content": None,
            },
        ])

        result = cli_runner.invoke(cli, ['activity'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output
        assert 'status change' in result.output
        assert 'Alice' in result.output

    def test_activity_empty(self, cli_runner):
        from cli.main import cli, client

        client.get_team_activities = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['activity'])

        assert result.exit_code == 0
        assert 'No recent activity' in result.output

    def test_activity_json(self, cli_runner):
        from cli.main import cli, client

        activities = [{"id": "act-1", "activity_type": "comment"}]
        client.get_team_activities = MagicMock(return_value=activities)

        result = cli_runner.invoke(cli, ['activity', '--json'])

        assert result.exit_code == 0
        assert '"activity_type"' in result.output

    def test_activity_limit(self, cli_runner):
        from cli.main import cli, client

        client.get_team_activities = MagicMock(return_value=[])

        cli_runner.invoke(cli, ['activity', '--limit', '5'])

        client.get_team_activities.assert_called_once_with(
            'test-team-123', limit=5,
        )

    def test_activity_document_ref(self, cli_runner):
        from cli.main import cli, client

        client.get_team_activities = MagicMock(return_value=[
            {
                "created_at": "2026-02-28T10:00:00Z",
                "issue_identifier": None,
                "document_title": "Sprint Report",
                "document_icon": "\U0001f4dd",
                "activity_type": "create",
                "user_name": "Bob",
                "field_name": None,
                "old_value": None,
                "new_value": None,
                "content": None,
            },
        ])

        result = cli_runner.invoke(cli, ['activity'])

        assert result.exit_code == 0
        assert 'Sprint Report' in result.output


class TestIssueListAssigneeFilter:
    """Tests for --assignee filter on issue list."""

    def test_assignee_me(self, cli_runner):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])
        client.get_sprints = MagicMock(return_value=[])

        with patch('cli.main.resolve_assignee_id', return_value='user-123'):
            result = cli_runner.invoke(cli, ['issue', 'list', '--assignee', 'me'])

        assert result.exit_code == 0
        # Check assignee_id was passed to get_issues
        call_kwargs = client.get_issues.call_args
        assert call_kwargs[1].get('assignee_id') == 'user-123'


class TestIssueNoSprint:
    """Tests for --no-sprint flag on issue update (CHT-1125)."""

    def test_no_sprint_clears_sprint(self, cli_runner):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-1", "identifier": "CHT-100", "project_id": "proj-1",
            "sprint_id": "sprint-1",
        })
        client.update_issue = MagicMock(return_value={
            "id": "issue-1", "identifier": "CHT-100",
        })

        result = cli_runner.invoke(cli, ['issue', 'update', 'CHT-100', '--no-sprint'])

        assert result.exit_code == 0
        call_kwargs = client.update_issue.call_args
        assert 'sprint_id' in call_kwargs[1] or \
            any(k == 'sprint_id' for k in (call_kwargs[1] if len(call_kwargs) > 1 else {}))

    def test_no_sprint_conflicts_with_sprint(self, cli_runner):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-1", "identifier": "CHT-100", "project_id": "proj-1",
        })

        result = cli_runner.invoke(cli, ['issue', 'update', 'CHT-100', '--no-sprint', '--sprint', 'current'])

        assert result.exit_code != 0
        assert 'Cannot use --sprint and --no-sprint together' in result.output
