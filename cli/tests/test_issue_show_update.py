"""Tests for issue show and issue update CLI commands (CHT-724).

Tests for single/multi issue show, JSON output, and issue update
with status, priority, sprint, and label options.
"""
import json
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def mock_issue():
    """Standard issue for testing."""
    return {
        "id": "issue-uuid-123",
        "identifier": "CHT-100",
        "title": "Fix the widget",
        "description": "The widget is broken and needs fixing.",
        "status": "in_progress",
        "priority": "high",
        "issue_type": "bug",
        "estimate": 3,
        "project_id": "test-project-123",
    }


@pytest.fixture
def mock_issue_2():
    """Second issue for multi-show testing."""
    return {
        "id": "issue-uuid-456",
        "identifier": "CHT-101",
        "title": "Add new feature",
        "description": "Need a new feature.",
        "status": "backlog",
        "priority": "medium",
        "issue_type": "feature",
        "estimate": 5,
        "project_id": "test-project-123",
    }


class TestIssueShowSingle:
    """Tests for issue show with a single identifier."""

    def test_show_single_issue(self, cli_runner, mock_issue):
        """issue show CHT-100 displays detailed view."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_comments = MagicMock(return_value=[])
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [], "completed_rituals": [],
        })
        client.get_issue_documents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'show', 'CHT-100'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output
        assert 'Fix the widget' in result.output
        assert 'In Progress' in result.output
        assert 'High' in result.output
        assert 'Bug' in result.output
        assert '3' in result.output  # estimate
        assert 'widget is broken' in result.output  # description

    def test_show_single_issue_with_comments(self, cli_runner, mock_issue):
        """issue show renders comments with author and date."""
        from cli.main import cli, client

        comments = [
            {
                "content": "Working on this now.",
                "author_name": "Alice",
                "created_at": "2026-02-10T14:30:00",
            },
        ]
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_comments = MagicMock(return_value=comments)
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [], "completed_rituals": [],
        })
        client.get_issue_documents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'show', 'CHT-100'])

        assert result.exit_code == 0
        assert 'Alice' in result.output
        assert 'Working on this now' in result.output

    def test_show_single_issue_with_ritual_attestations(self, cli_runner, mock_issue):
        """issue show renders completed ritual attestations."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_comments = MagicMock(return_value=[])
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [],
            "completed_rituals": [
                {
                    "name": "run-tests",
                    "attestation": {
                        "note": "All tests pass.",
                        "attested_by_name": "Bot",
                    },
                },
            ],
        })
        client.get_issue_documents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'show', 'CHT-100'])

        assert result.exit_code == 0
        assert 'run-tests' in result.output
        assert 'All tests pass' in result.output

    def test_show_no_args_shows_usage(self, cli_runner):
        """issue show without args shows usage message."""
        from cli.main import cli

        result = cli_runner.invoke(cli, ['issue', 'show'])

        assert result.exit_code == 0
        assert 'Usage' in result.output

    def test_show_api_error(self, cli_runner):
        """issue show with nonexistent identifier shows error."""
        from cli.main import cli, client
        # Use APIError from cli.main to match the class bound in handle_error
        from cli.main import APIError

        client.get_issue_by_identifier = MagicMock(
            side_effect=APIError("Issue not found"),
        )

        result = cli_runner.invoke(cli, ['issue', 'show', 'CHT-999'])

        assert result.exit_code != 0
        assert 'Issue not found' in result.output


class TestIssueShowParentSubIssues:
    """Tests for parent and sub-issue display in issue show (CHT-823)."""

    def test_show_parent_info(self, cli_runner, mock_issue):
        """issue show displays parent issue when parent_id is set."""
        from cli.main import cli, client

        mock_issue['parent_id'] = 'parent-uuid'
        parent_issue = {
            "id": "parent-uuid",
            "identifier": "CHT-50",
            "title": "CLI Epic support",
        }
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_issue = MagicMock(return_value=parent_issue)
        client.get_comments = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(return_value=[])
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [], "completed_rituals": [],
        })
        client.get_issue_documents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'show', 'CHT-100'])

        assert result.exit_code == 0
        assert 'CHT-50' in result.output
        assert 'CLI Epic support' in result.output
        client.get_issue.assert_called_once_with('parent-uuid')

    def test_show_sub_issue_summary(self, cli_runner, mock_issue):
        """issue show displays sub-issue count when children exist."""
        from cli.main import cli, client

        sub_issues = [
            {"id": "sub-1", "status": "done"},
            {"id": "sub-2", "status": "in_progress"},
            {"id": "sub-3", "status": "done"},
            {"id": "sub-4", "status": "todo"},
            {"id": "sub-5", "status": "canceled"},
        ]
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_comments = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(return_value=sub_issues)
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [], "completed_rituals": [],
        })
        client.get_issue_documents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'show', 'CHT-100'])

        assert result.exit_code == 0
        assert '3/5 done' in result.output  # 2 done + 1 canceled = 3

    def test_show_no_sub_issues_hides_section(self, cli_runner, mock_issue):
        """issue show hides sub-issue section when no children."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_comments = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(return_value=[])
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [], "completed_rituals": [],
        })
        client.get_issue_documents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'show', 'CHT-100'])

        assert result.exit_code == 0
        assert 'Sub-issues' not in result.output


    def test_show_parent_api_failure_graceful(self, cli_runner, mock_issue):
        """issue show handles parent API failure gracefully."""
        from cli.main import cli, client, APIError

        mock_issue['parent_id'] = 'deleted-parent'
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_issue = MagicMock(side_effect=APIError("Not found"))
        client.get_comments = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(return_value=[])
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [], "completed_rituals": [],
        })
        client.get_issue_documents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'show', 'CHT-100'])

        assert result.exit_code == 0
        assert 'unable to load' in result.output

    def test_show_sub_issues_api_failure_graceful(self, cli_runner, mock_issue):
        """issue show handles sub-issues API failure gracefully."""
        from cli.main import cli, client, APIError

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_comments = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(side_effect=APIError("Not supported"))
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [], "completed_rituals": [],
        })
        client.get_issue_documents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'show', 'CHT-100'])

        assert result.exit_code == 0
        assert 'Sub-issues' not in result.output


class TestIssueShowMulti:
    """Tests for issue show with multiple identifiers."""

    def test_show_multiple_issues(self, cli_runner, mock_issue, mock_issue_2):
        """issue show CHT-100 CHT-101 displays compact table."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(
            side_effect=[mock_issue, mock_issue_2],
        )

        result = cli_runner.invoke(cli, ['issue', 'show', 'CHT-100', 'CHT-101'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output
        assert 'CHT-101' in result.output
        assert 'Fix the widget' in result.output
        assert 'Add new feature' in result.output

    def test_show_multi_with_error_still_shows_table(self, cli_runner, mock_issue):
        """Multi-show with one bad identifier shows error in table row."""
        from cli.main import cli, client
        from cli.main import APIError

        client.get_issue_by_identifier = MagicMock(
            side_effect=[mock_issue, APIError("Not found")],
        )

        result = cli_runner.invoke(cli, ['issue', 'show', 'CHT-100', 'CHT-999'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output
        assert 'Error' in result.output


class TestIssueShowJson:
    """Tests for issue show --json output."""

    def test_show_single_json(self, cli_runner, mock_issue):
        """issue show CHT-100 --json outputs JSON with sub_issues."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_comments = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(return_value=[{"id": "sub-1", "status": "done"}])

        result = cli_runner.invoke(cli, ['issue', 'show', 'CHT-100', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert data['identifier'] == 'CHT-100'
        assert data['title'] == 'Fix the widget'
        assert data['sub_issues'] == [{"id": "sub-1", "status": "done"}]

    def test_show_multi_json(self, cli_runner, mock_issue, mock_issue_2):
        """issue show CHT-100 CHT-101 --json outputs JSON array."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(
            side_effect=[mock_issue, mock_issue_2],
        )

        result = cli_runner.invoke(cli, ['issue', 'show', 'CHT-100', 'CHT-101', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert len(data) == 2
        assert data[0]['identifier'] == 'CHT-100'
        assert data[1]['identifier'] == 'CHT-101'


class TestIssueUpdateStatus:
    """Tests for issue update --status."""

    def test_update_status(self, cli_runner, mock_issue):
        """issue update CHT-100 --status done updates status."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'update', 'CHT-100', '--status', 'done'])

        assert result.exit_code == 0
        assert 'CHT-100 updated' in result.output
        client.update_issue.assert_called_once_with('issue-uuid-123', status='done')

    def test_update_priority(self, cli_runner, mock_issue):
        """issue update CHT-100 --priority urgent updates priority."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'update', 'CHT-100', '--priority', 'urgent'])

        assert result.exit_code == 0
        client.update_issue.assert_called_once_with('issue-uuid-123', priority='urgent')

    def test_update_multiple_fields(self, cli_runner, mock_issue):
        """issue update with multiple options sends all fields."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, [
            'issue', 'update', 'CHT-100',
            '--status', 'in_progress', '--priority', 'high',
        ])

        assert result.exit_code == 0
        client.update_issue.assert_called_once_with(
            'issue-uuid-123', status='in_progress', priority='high',
        )

    def test_update_no_options_shows_warning(self, cli_runner, mock_issue):
        """issue update without any options shows warning."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)

        result = cli_runner.invoke(cli, ['issue', 'update', 'CHT-100'])

        assert result.exit_code == 0
        assert 'No updates provided' in result.output

    def test_update_empty_title_sent_to_api(self, cli_runner, mock_issue):
        """issue update --title '' sends empty string to API (consistent with --description)."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'update', 'CHT-100', '--title', ''])

        assert result.exit_code == 0
        client.update_issue.assert_called_once_with('issue-uuid-123', title='')


class TestIssueUpdateSprint:
    """Tests for issue update --sprint."""

    def test_update_sprint_current(self, cli_runner, mock_issue):
        """issue update --sprint current assigns to active sprint."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-123') as mock_resolve:
            result = cli_runner.invoke(cli, [
                'issue', 'update', 'CHT-100', '--sprint', 'current',
            ])

        assert result.exit_code == 0
        mock_resolve.assert_called_once_with('current', 'test-project-123')
        client.update_issue.assert_called_once_with(
            'issue-uuid-123', sprint_id='sprint-uuid-123',
        )

    def test_update_sprint_none_unassigns(self, cli_runner, mock_issue):
        """issue update --sprint none unassigns from sprint."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, [
            'issue', 'update', 'CHT-100', '--sprint', 'none',
        ])

        assert result.exit_code == 0
        client.update_issue.assert_called_once_with(
            'issue-uuid-123', sprint_id=None,
        )


class TestIssueUpdateLabels:
    """Tests for issue update --label and --remove-label."""

    def test_add_label(self, cli_runner, mock_issue):
        """issue update --label bug adds label."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_labels = MagicMock(return_value=[
            {"id": "label-1", "name": "bug"},
            {"id": "label-2", "name": "feature"},
        ])
        client.add_label_to_issue = MagicMock()

        with patch('cli.main.get_current_team', return_value='test-team-123'):
            result = cli_runner.invoke(cli, [
                'issue', 'update', 'CHT-100', '--label', 'bug',
            ])

        assert result.exit_code == 0
        client.add_label_to_issue.assert_called_once_with('issue-uuid-123', 'label-1')
        assert 'Added label: bug' in result.output

    def test_remove_label(self, cli_runner, mock_issue):
        """issue update --remove-label bug removes label."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_labels = MagicMock(return_value=[
            {"id": "label-1", "name": "bug"},
        ])
        client.remove_label_from_issue = MagicMock()

        with patch('cli.main.get_current_team', return_value='test-team-123'):
            result = cli_runner.invoke(cli, [
                'issue', 'update', 'CHT-100', '--remove-label', 'bug',
            ])

        assert result.exit_code == 0
        client.remove_label_from_issue.assert_called_once_with('issue-uuid-123', 'label-1')
        assert 'Removed label: bug' in result.output

    def test_label_not_found(self, cli_runner, mock_issue):
        """issue update --label nonexistent shows error."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_labels = MagicMock(return_value=[
            {"id": "label-1", "name": "bug"},
        ])

        with patch('cli.main.get_current_team', return_value='test-team-123'):
            result = cli_runner.invoke(cli, [
                'issue', 'update', 'CHT-100', '--label', 'nonexistent',
            ])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()


class TestIssueUpdateErrors:
    """Tests for issue update error paths."""

    def test_update_api_error(self, cli_runner, mock_issue):
        """issue update shows error on API failure."""
        from cli.main import cli, client
        from cli.main import APIError

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock(side_effect=APIError("Permission denied"))

        result = cli_runner.invoke(cli, [
            'issue', 'update', 'CHT-100', '--status', 'done',
        ])

        assert result.exit_code != 0
        assert 'Permission denied' in result.output

    def test_update_sprint_not_found(self, cli_runner, mock_issue):
        """issue update --sprint bogus shows error when sprint not found."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)

        with patch('cli.main.get_current_project', return_value='test-project-123'), \
             patch('cli.main.resolve_sprint_id', side_effect=SystemExit(1)):
            result = cli_runner.invoke(cli, [
                'issue', 'update', 'CHT-100', '--sprint', 'bogus',
            ])

        assert result.exit_code != 0


class TestIssueUpdateParent:
    """Tests for issue update --parent and --no-parent (CHT-821)."""

    def test_update_parent(self, cli_runner, mock_issue):
        """issue update CHT-100 --parent CHT-50 sets parent_id."""
        from cli.main import cli, client

        parent_issue = {"id": "parent-uuid-50", "identifier": "CHT-50", "title": "Epic"}
        client.get_issue_by_identifier = MagicMock(side_effect=[mock_issue, parent_issue])
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'update', 'CHT-100', '--parent', 'CHT-50'])

        assert result.exit_code == 0
        assert 'CHT-100 updated' in result.output
        client.update_issue.assert_called_once_with('issue-uuid-123', parent_id='parent-uuid-50')

    def test_update_no_parent(self, cli_runner, mock_issue):
        """issue update CHT-100 --no-parent clears parent_id."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'update', 'CHT-100', '--no-parent'])

        assert result.exit_code == 0
        assert 'CHT-100 updated' in result.output
        client.update_issue.assert_called_once_with('issue-uuid-123', parent_id=None)

    def test_update_parent_and_no_parent_conflict(self, cli_runner, mock_issue):
        """issue update --parent and --no-parent together is an error."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'update', 'CHT-100', '--parent', 'CHT-50', '--no-parent'])

        assert result.exit_code != 0
        assert 'Cannot use --parent and --no-parent together' in result.output
        client.update_issue.assert_not_called()

    def test_update_self_parent_rejected(self, cli_runner, mock_issue):
        """issue update CHT-100 --parent CHT-100 rejects self-parenting."""
        from cli.main import cli, client

        # get_issue_by_identifier is called twice: once for the issue, once for the parent
        # Both return the same issue, simulating self-parenting
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'update', 'CHT-100', '--parent', 'CHT-100'])

        assert result.exit_code != 0
        assert 'cannot be its own parent' in result.output
        client.update_issue.assert_not_called()

    def test_update_parent_not_found(self, cli_runner, mock_issue):
        """issue update --parent CHT-999 shows error when parent not found."""
        from cli.main import cli, client
        from cli.main import APIError

        client.get_issue_by_identifier = MagicMock(
            side_effect=[mock_issue, APIError("Issue not found")]
        )
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'update', 'CHT-100', '--parent', 'CHT-999'])

        assert result.exit_code != 0
        assert 'Issue not found' in result.output
        client.update_issue.assert_not_called()
