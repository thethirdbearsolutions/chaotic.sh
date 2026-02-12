"""Tests for alias/callback delegation commands (CHT-723).

Tests that alias commands correctly delegate to their targets:
- budget -> sprint budget
- issue view -> issue show
- issue get -> issue show (with tuple wrapping)
- issue complete -> issue close
- issue cancel -> issue wontfix
- issue start -> issue claim
"""
from unittest.mock import patch, MagicMock, call
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def mock_issue():
    """Standard mock issue returned by get_issue_by_identifier."""
    return {
        "id": "issue-uuid-123",
        "identifier": "CHT-100",
        "title": "Test issue",
        "status": "backlog",
        "priority": "medium",
        "issue_type": "task",
        "estimate": 2,
        "sprint_id": None,
    }


class TestBudgetShortcut:
    """Tests for budget -> sprint budget delegation."""

    def test_budget_delegates_to_sprint_budget(self, cli_runner):
        """'chaotic budget' should show same output as 'chaotic sprint budget'."""
        from cli.main import cli, client

        sprint_data = {
            "id": "sprint-123",
            "name": "Sprint 1",
            "status": "active",
            "budget": 20,
        }
        client.get_current_sprint = MagicMock(return_value=sprint_data)
        client.get_issues = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_team', return_value='team-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['budget'])

        assert result.exit_code == 0
        assert 'Sprint 1' in result.output or 'Budget' in result.output


class TestIssueViewAlias:
    """Tests for issue view -> issue show delegation."""

    def test_issue_view_delegates_to_show(self, cli_runner, mock_issue):
        """'chaotic issue view CHT-100' delegates to issue show."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_comments = MagicMock(return_value=[])
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [], "completed_rituals": [],
        })
        client.get_sub_issues = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'view', 'CHT-100'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output
        client.get_issue_by_identifier.assert_called_with('CHT-100')

    def test_issue_view_multiple_issues(self, cli_runner, mock_issue):
        """'chaotic issue view CHT-100 CHT-101' shows multiple issues."""
        from cli.main import cli, client

        mock_issue2 = {**mock_issue, "identifier": "CHT-101", "title": "Second issue"}
        client.get_issue_by_identifier = MagicMock(
            side_effect=[mock_issue, mock_issue2]
        )
        client.get_comments = MagicMock(return_value=[])
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [], "completed_rituals": [],
        })
        client.get_sub_issues = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'view', 'CHT-100', 'CHT-101'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output
        assert 'CHT-101' in result.output


class TestIssueGetAlias:
    """Tests for issue get -> issue show delegation (with tuple wrapping)."""

    def test_issue_get_delegates_to_show(self, cli_runner, mock_issue):
        """'chaotic issue get CHT-100' correctly delegates to issue show."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_comments = MagicMock(return_value=[])
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [], "completed_rituals": [],
        })
        client.get_sub_issues = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'get', 'CHT-100'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output
        # Verify the identifier was passed correctly (not character by character)
        client.get_issue_by_identifier.assert_called_with('CHT-100')


class TestIssueCompleteAlias:
    """Tests for issue complete -> issue close delegation."""

    def test_issue_complete_closes_issue(self, cli_runner, mock_issue):
        """'chaotic issue complete CHT-100' delegates to issue close."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock(return_value=mock_issue)

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'complete', 'CHT-100'])

        assert result.exit_code == 0
        client.update_issue.assert_called_once_with(
            mock_issue["id"], status="done"
        )


class TestIssueCancelAlias:
    """Tests for issue cancel -> issue wontfix delegation."""

    def test_issue_cancel_cancels_issue(self, cli_runner, mock_issue):
        """'chaotic issue cancel CHT-100' delegates to issue wontfix."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock(return_value=mock_issue)

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'cancel', 'CHT-100'])

        assert result.exit_code == 0
        client.update_issue.assert_called_once_with(
            mock_issue["id"], status="canceled"
        )

    def test_issue_cancel_already_canceled(self, cli_runner):
        """'chaotic issue cancel' on already-canceled issue shows message."""
        from cli.main import cli, client

        canceled_issue = {
            "id": "issue-uuid-123",
            "identifier": "CHT-100",
            "status": "canceled",
        }
        client.get_issue_by_identifier = MagicMock(return_value=canceled_issue)

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'cancel', 'CHT-100'])

        assert result.exit_code == 0
        assert 'already canceled' in result.output
        client.update_issue.assert_not_called()


class TestIssueStartAlias:
    """Tests for issue start -> issue claim delegation."""

    def test_issue_start_claims_issue(self, cli_runner, mock_issue):
        """'chaotic issue start CHT-100' delegates to issue claim."""
        from cli.main import cli, client

        user = {"id": "user-uuid-123", "name": "Test User"}
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value=user)
        client.update_issue = MagicMock(return_value=mock_issue)

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'start', 'CHT-100'])

        assert result.exit_code == 0
        client.update_issue.assert_called_once_with(
            mock_issue["id"], assignee_id=user["id"], status="in_progress"
        )
        assert 'claimed' in result.output
