"""Tests for issue list, mine, search, create, comment commands (CHT-887).

These are the major untested issue commands that make up the largest
coverage gaps in main.py.
"""
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def sample_issues():
    """Standard list of issues for testing."""
    return [
        {
            "identifier": "CHT-100",
            "title": "First issue",
            "status": "in_progress",
            "priority": "high",
            "issue_type": "feature",
            "estimate": 3,
            "sprint_id": "sprint-1",
        },
        {
            "identifier": "CHT-101",
            "title": "Second issue",
            "status": "backlog",
            "priority": "medium",
            "issue_type": "bug",
            "estimate": 2,
            "sprint_id": None,
        },
    ]


class TestIssueList:
    """Tests for issue list command."""

    def test_list_shows_table(self, cli_runner, sample_issues):
        """issue list displays issues in a table."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=sample_issues)
        client.get_sprints = MagicMock(return_value=[
            {"id": "sprint-1", "name": "Sprint 45"},
        ])

        result = cli_runner.invoke(cli, ['issue', 'list'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output
        assert 'CHT-101' in result.output
        assert 'Sprint 45' in result.output

    def test_list_empty(self, cli_runner):
        """issue list with no issues shows message."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'list'])

        assert result.exit_code == 0
        assert 'No issues found' in result.output

    def test_list_json(self, cli_runner, sample_issues):
        """issue list --json outputs JSON."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=sample_issues)

        result = cli_runner.invoke(cli, ['issue', 'list', '--json'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output

    def test_list_status_filter(self, cli_runner):
        """issue list --status in_progress filters by status."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'list', '--status', 'in_progress'])

        assert result.exit_code == 0
        call_kwargs = client.get_issues.call_args[1]
        assert call_kwargs.get('status') == 'in_progress'

    def test_list_invalid_status(self, cli_runner):
        """issue list --status invalid shows error."""
        from cli.main import cli

        result = cli_runner.invoke(cli, ['issue', 'list', '--status', 'invalid'])

        assert result.exit_code != 0

    def test_list_with_sprint_filter(self, cli_runner):
        """issue list --sprint current resolves sprint ID."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        with patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-1'):
            result = cli_runner.invoke(cli, ['issue', 'list', '--sprint', 'current'])

        assert result.exit_code == 0

    def test_list_with_search(self, cli_runner):
        """issue list --search passes search term."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'list', '--search', 'bug fix'])

        assert result.exit_code == 0
        call_kwargs = client.get_issues.call_args[1]
        assert call_kwargs.get('search') == 'bug fix'

    def test_list_with_limit(self, cli_runner):
        """issue list --limit passes limit."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'list', '--limit', '10'])

        assert result.exit_code == 0
        call_kwargs = client.get_issues.call_args[1]
        assert call_kwargs.get('limit') == 10

    def test_list_truncation_warning(self, cli_runner, sample_issues):
        """issue list shows truncation warning when results hit limit (CHT-946)."""
        from cli.main import cli, client

        # Return exactly 2 issues with limit=2 to trigger warning
        client.get_issues = MagicMock(return_value=sample_issues)
        client.get_sprints = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'list', '--limit', '2'])

        assert result.exit_code == 0
        assert 'results may be truncated' in result.output
        assert '--skip 2' in result.output

    def test_list_no_truncation_warning_under_limit(self, cli_runner):
        """issue list shows no truncation warning when results < limit."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[{
            "identifier": "CHT-1", "title": "Only one", "status": "backlog",
            "priority": "medium", "issue_type": "task", "estimate": None, "sprint_id": None,
        }])
        client.get_sprints = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'list', '--limit', '50'])

        assert result.exit_code == 0
        assert 'truncated' not in result.output

    def test_list_search_tip(self, cli_runner, sample_issues):
        """issue list always shows search tip (CHT-949)."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=sample_issues)
        client.get_sprints = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'list'])

        assert result.exit_code == 0
        assert 'chaotic issue search' in result.output

    def test_list_skip_option(self, cli_runner):
        """issue list --skip passes skip to client (CHT-950)."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'list', '--skip', '50'])

        assert result.exit_code == 0
        call_kwargs = client.get_issues.call_args[1]
        assert call_kwargs.get('skip') == 50

    def test_list_truncation_with_skip(self, cli_runner, sample_issues):
        """Truncation warning accounts for --skip offset (CHT-950)."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=sample_issues)
        client.get_sprints = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'list', '--limit', '2', '--skip', '50'])

        assert result.exit_code == 0
        assert '--skip 52' in result.output


class TestIssueMine:
    """Tests for issue mine command."""

    def test_mine_shows_assigned_issues(self, cli_runner, sample_issues):
        """issue mine shows issues assigned to current user."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.get_issues = MagicMock(return_value=sample_issues)
        client.get_sprint = MagicMock(return_value={"name": "Sprint 45"})

        result = cli_runner.invoke(cli, ['issue', 'mine'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output
        client.get_issues.assert_called_once()
        call_kwargs = client.get_issues.call_args[1]
        assert call_kwargs.get('assignee_id') == 'user-1'

    def test_mine_empty(self, cli_runner):
        """issue mine with no assigned issues shows message."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.get_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'mine'])

        assert result.exit_code == 0
        assert 'No issues assigned' in result.output

    def test_mine_json(self, cli_runner, sample_issues):
        """issue mine --json outputs JSON."""
        from cli.main import cli, client

        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.get_issues = MagicMock(return_value=sample_issues)

        result = cli_runner.invoke(cli, ['issue', 'mine', '--json'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output


class TestIssueSearch:
    """Tests for issue search command."""

    def test_search_shows_results(self, cli_runner, sample_issues):
        """issue search displays matching issues."""
        from cli.main import cli, client

        client.search_issues = MagicMock(return_value=sample_issues)

        result = cli_runner.invoke(cli, ['issue', 'search', 'test query'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output

    def test_search_no_results(self, cli_runner):
        """issue search with no matches shows message."""
        from cli.main import cli, client

        client.search_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'search', 'nonexistent'])

        assert result.exit_code == 0
        assert 'No issues found' in result.output

    def test_search_all_projects(self, cli_runner, sample_issues):
        """issue search --all searches all projects."""
        from cli.main import cli, client

        client.search_issues = MagicMock(return_value=sample_issues)

        result = cli_runner.invoke(cli, ['issue', 'search', 'query', '--all'])

        assert result.exit_code == 0
        # project_id should be None when --all is used
        call_args = client.search_issues.call_args[0]
        assert call_args[2] is None  # project_id

    def test_search_json(self, cli_runner, sample_issues):
        """issue search --json outputs JSON."""
        from cli.main import cli, client

        client.search_issues = MagicMock(return_value=sample_issues)

        result = cli_runner.invoke(cli, ['issue', 'search', 'query', '--json'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output

    def test_search_with_limit(self, cli_runner, sample_issues):
        """issue search --limit passes limit to client (CHT-948)."""
        from cli.main import cli, client

        client.search_issues = MagicMock(return_value=sample_issues)

        result = cli_runner.invoke(cli, ['issue', 'search', 'query', '--limit', '100'])

        assert result.exit_code == 0
        call_kwargs = client.search_issues.call_args[1]
        assert call_kwargs.get('limit') == 100

    def test_search_truncation_warning(self, cli_runner, sample_issues):
        """issue search shows truncation warning when results hit limit (CHT-948)."""
        from cli.main import cli, client

        client.search_issues = MagicMock(return_value=sample_issues)

        result = cli_runner.invoke(cli, ['issue', 'search', 'query', '--limit', '2'])

        assert result.exit_code == 0
        assert 'truncated' in result.output

    def test_search_no_truncation_under_limit(self, cli_runner):
        """issue search shows no truncation warning under limit."""
        from cli.main import cli, client

        client.search_issues = MagicMock(return_value=[{
            "identifier": "CHT-1", "title": "One result", "status": "backlog",
            "priority": "medium", "project_key": "CHT",
        }])

        result = cli_runner.invoke(cli, ['issue', 'search', 'query'])

        assert result.exit_code == 0
        assert 'truncated' not in result.output


class TestIssueCreate:
    """Tests for issue create command."""

    def test_create_basic(self, cli_runner):
        """issue create with title creates issue."""
        from cli.main import cli, client

        client.create_issue = MagicMock(return_value={
            "id": "new-id",
            "identifier": "CHT-200",
            "title": "New Feature",
        })

        result = cli_runner.invoke(cli, ['issue', 'create', 'New Feature'])

        assert result.exit_code == 0
        assert 'CHT-200' in result.output
        assert 'created' in result.output.lower()

    def test_create_with_options(self, cli_runner):
        """issue create with all options."""
        from cli.main import cli, client

        client.create_issue = MagicMock(return_value={
            "id": "new-id",
            "identifier": "CHT-200",
            "title": "Bug Fix",
        })

        result = cli_runner.invoke(cli, [
            'issue', 'create', 'Bug Fix',
            '--description', 'Fix the thing',
            '--status', 'todo',
            '--priority', 'high',
            '--type', 'bug',
            '--estimate', '5',
        ])

        assert result.exit_code == 0
        call_kwargs = client.create_issue.call_args[1]
        assert call_kwargs.get('priority') == 'high'
        assert call_kwargs.get('issue_type') == 'bug'
        assert call_kwargs.get('estimate') == 5

    def test_create_no_title_errors(self, cli_runner):
        """issue create without title shows error."""
        from cli.main import cli

        result = cli_runner.invoke(cli, ['issue', 'create'])

        assert result.exit_code != 0

    def test_create_json(self, cli_runner):
        """issue create --json outputs JSON."""
        from cli.main import cli, client

        client.create_issue = MagicMock(return_value={
            "id": "new-id",
            "identifier": "CHT-200",
            "title": "JSON Issue",
        })

        result = cli_runner.invoke(cli, ['issue', 'create', 'JSON Issue', '--json'])

        assert result.exit_code == 0
        assert 'CHT-200' in result.output

    def test_create_with_parent(self, cli_runner):
        """issue create --parent creates sub-issue."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "parent-id",
            "identifier": "CHT-100",
        })
        client.create_issue = MagicMock(return_value={
            "id": "new-id",
            "identifier": "CHT-200",
            "title": "Sub Issue",
        })

        result = cli_runner.invoke(cli, [
            'issue', 'create', 'Sub Issue', '--parent', 'CHT-100',
        ])

        assert result.exit_code == 0
        assert 'parent' in result.output.lower()
        call_kwargs = client.create_issue.call_args[1]
        assert call_kwargs.get('parent_id') == 'parent-id'

    def test_create_with_sprint(self, cli_runner):
        """issue create --sprint current assigns to sprint."""
        from cli.main import cli, client

        client.create_issue = MagicMock(return_value={
            "id": "new-id",
            "identifier": "CHT-200",
            "title": "Sprint Issue",
        })

        with patch('cli.main.resolve_sprint_id', return_value='sprint-uuid-1'):
            result = cli_runner.invoke(cli, [
                'issue', 'create', 'Sprint Issue', '--sprint', 'current',
            ])

        assert result.exit_code == 0
        call_kwargs = client.create_issue.call_args[1]
        assert call_kwargs.get('sprint_id') == 'sprint-uuid-1'


class TestIssueComment:
    """Tests for issue comment command."""

    def test_comment_adds_comment(self, cli_runner):
        """issue comment adds a comment."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123",
            "identifier": "CHT-100",
        })
        client.create_comment = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'comment', 'CHT-100', 'This is a comment.'])

        assert result.exit_code == 0
        assert 'Comment added' in result.output
        client.create_comment.assert_called_once_with('issue-uuid-123', 'This is a comment.')
