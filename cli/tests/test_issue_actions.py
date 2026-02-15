"""Tests for issue action commands (CHT-887).

Tests cover: issue delete, sub-issues, relations, block, unblock, duplicate,
assign, move, close, wontfix, claim, rituals, escalate, deescalate.
"""
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def mock_issue():
    """Standard issue data."""
    return {
        "id": "issue-uuid-123",
        "identifier": "CHT-100",
        "title": "Test issue",
        "status": "in_progress",
        "priority": "medium",
        "estimate": 3,
    }


class TestIssueDelete:
    """Tests for issue delete command."""

    def test_delete_with_confirmation(self, cli_runner, mock_issue):
        """issue delete with confirmation deletes the issue."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.delete_issue = MagicMock()

        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['issue', 'delete', 'CHT-100'])

        assert result.exit_code == 0
        assert 'deleted' in result.output.lower()
        client.delete_issue.assert_called_once_with('issue-uuid-123')

    def test_delete_declined(self, cli_runner):
        """issue delete declined does not delete."""
        from cli.main import cli, client

        client.delete_issue = MagicMock()

        with patch('cli.main.confirm_action', return_value=False):
            result = cli_runner.invoke(cli, ['issue', 'delete', 'CHT-100'])

        client.delete_issue.assert_not_called()


class TestIssueSubIssues:
    """Tests for issue sub-issues command."""

    def test_sub_issues_shows_table(self, cli_runner, mock_issue):
        """issue sub-issues displays sub-issues in a table."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_sub_issues = MagicMock(return_value=[
            {"identifier": "CHT-101", "title": "Child 1", "status": "done", "priority": "high", "estimate": 2},
            {"identifier": "CHT-102", "title": "Child 2", "status": "in_progress", "priority": "medium", "estimate": 3},
        ])

        result = cli_runner.invoke(cli, ['issue', 'sub-issues', 'CHT-100'])

        assert result.exit_code == 0
        assert 'CHT-101' in result.output
        assert 'CHT-102' in result.output

    def test_sub_issues_empty(self, cli_runner, mock_issue):
        """issue sub-issues with no children shows message."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_sub_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'sub-issues', 'CHT-100'])

        assert result.exit_code == 0
        assert 'No sub-issues' in result.output

    def test_sub_issues_json(self, cli_runner, mock_issue):
        """issue sub-issues --json outputs JSON."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_sub_issues = MagicMock(return_value=[
            {"identifier": "CHT-101", "title": "Child 1", "status": "done", "priority": "high", "estimate": 2},
        ])

        result = cli_runner.invoke(cli, ['issue', 'sub-issues', 'CHT-100', '--json'])

        assert result.exit_code == 0
        assert 'CHT-101' in result.output


class TestIssueRelations:
    """Tests for issue relations command."""

    def test_relations_shows_table(self, cli_runner, mock_issue):
        """issue relations displays relations in a table."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_relations = MagicMock(return_value=[
            {
                "id": "rel-uuid-123456789",
                "relation_type": "blocks",
                "related_issue": {"identifier": "CHT-200"},
                "direction": "outgoing",
            },
        ])

        result = cli_runner.invoke(cli, ['issue', 'relations', 'CHT-100'])

        assert result.exit_code == 0
        assert 'CHT-200' in result.output

    def test_relations_empty(self, cli_runner, mock_issue):
        """issue relations with no relations shows message."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_relations = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'relations', 'CHT-100'])

        assert result.exit_code == 0
        assert 'No relations' in result.output

    def test_relations_json(self, cli_runner, mock_issue):
        """issue relations --json outputs JSON."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_relations = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'relations', 'CHT-100', '--json'])

        assert result.exit_code == 0


class TestIssueBlock:
    """Tests for issue block command."""

    def test_block_creates_blocks_relation(self, cli_runner):
        """issue block creates a blocking relation."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(side_effect=[
            {"id": "issue-1", "identifier": "CHT-100"},
            {"id": "issue-2", "identifier": "CHT-200"},
        ])
        client.create_relation = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'block', 'CHT-100', 'CHT-200'])

        assert result.exit_code == 0
        assert 'blocks' in result.output.lower()
        client.create_relation.assert_called_once_with('issue-1', 'issue-2', 'blocks')

    def test_block_with_relates_type(self, cli_runner):
        """issue block --type relates_to creates relates relation."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(side_effect=[
            {"id": "issue-1", "identifier": "CHT-100"},
            {"id": "issue-2", "identifier": "CHT-200"},
        ])
        client.create_relation = MagicMock()

        result = cli_runner.invoke(cli, [
            'issue', 'block', 'CHT-100', 'CHT-200', '--type', 'relates_to',
        ])

        assert result.exit_code == 0
        assert 'related' in result.output.lower()
        client.create_relation.assert_called_once_with('issue-1', 'issue-2', 'relates_to')


class TestIssueUnblock:
    """Tests for issue unblock command."""

    def test_unblock_removes_relation(self, cli_runner, mock_issue):
        """issue unblock removes a relation."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.delete_relation = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'unblock', 'CHT-100', 'rel-uuid-123'])

        assert result.exit_code == 0
        assert 'Relation removed' in result.output
        client.delete_relation.assert_called_once_with('issue-uuid-123', 'rel-uuid-123')


class TestIssueDuplicate:
    """Tests for issue duplicate command."""

    def test_duplicate_closes_and_relates(self, cli_runner):
        """issue duplicate creates relation, adds comment, and closes."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(side_effect=[
            {"id": "dup-id", "identifier": "CHT-101", "status": "in_progress"},
            {"id": "orig-id", "identifier": "CHT-100", "status": "in_progress"},
        ])
        client.create_relation = MagicMock()
        client.create_comment = MagicMock()
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'duplicate', 'CHT-101', 'CHT-100'])

        assert result.exit_code == 0
        assert 'duplicate' in result.output.lower()
        client.create_relation.assert_called_once_with('dup-id', 'orig-id', 'duplicates')
        client.create_comment.assert_called_once()
        client.update_issue.assert_called_once_with('dup-id', status='canceled')

    def test_duplicate_same_issue_errors(self, cli_runner):
        """issue duplicate with same issue twice shows error."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(side_effect=[
            {"id": "same-id", "identifier": "CHT-100", "status": "in_progress"},
            {"id": "same-id", "identifier": "CHT-100", "status": "in_progress"},
        ])

        result = cli_runner.invoke(cli, ['issue', 'duplicate', 'CHT-100', 'CHT-100'])

        assert result.exit_code != 0
        assert 'itself' in result.output.lower()

    def test_duplicate_already_closed_errors(self, cli_runner):
        """issue duplicate on already-closed issue shows error."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(side_effect=[
            {"id": "dup-id", "identifier": "CHT-101", "status": "done"},
            {"id": "orig-id", "identifier": "CHT-100", "status": "in_progress"},
        ])

        result = cli_runner.invoke(cli, ['issue', 'duplicate', 'CHT-101', 'CHT-100'])

        assert result.exit_code != 0
        assert 'already' in result.output.lower()


class TestIssueAssign:
    """Tests for issue assign command."""

    def test_assign_to_user(self, cli_runner, mock_issue):
        """issue assign assigns to a user."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        with patch('cli.main.resolve_assignee_id', return_value='user-uuid-456'):
            result = cli_runner.invoke(cli, ['issue', 'assign', 'CHT-100', 'alice'])

        assert result.exit_code == 0
        assert 'assigned' in result.output.lower()
        client.update_issue.assert_called_once_with('issue-uuid-123', assignee_id='user-uuid-456')

    def test_unassign(self, cli_runner, mock_issue):
        """issue assign without assignee unassigns."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'assign', 'CHT-100'])

        assert result.exit_code == 0
        assert 'unassigned' in result.output.lower()
        client.update_issue.assert_called_once_with('issue-uuid-123', assignee_id=None)


class TestIssueMove:
    """Tests for issue move command."""

    def test_move_to_status(self, cli_runner, mock_issue):
        """issue move updates status."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'move', 'CHT-100', 'done'])

        assert result.exit_code == 0
        assert 'moved' in result.output.lower()
        client.update_issue.assert_called_once_with('issue-uuid-123', status='done')

    def test_move_invalid_status_rejected(self, cli_runner):
        """issue move with invalid status is rejected by Click."""
        from cli.main import cli

        result = cli_runner.invoke(cli, ['issue', 'move', 'CHT-100', 'invalid_status'])

        assert result.exit_code != 0


class TestIssueClose:
    """Tests for issue close command."""

    def test_close_moves_to_done(self, cli_runner, mock_issue):
        """issue close moves issue to done."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'close', 'CHT-100'])

        assert result.exit_code == 0
        assert 'closed' in result.output.lower()
        client.update_issue.assert_called_once_with('issue-uuid-123', status='done')


class TestIssueWontfix:
    """Tests for issue wontfix command."""

    def test_wontfix_cancels_issue(self, cli_runner, mock_issue):
        """issue wontfix marks as canceled."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'wontfix', 'CHT-100'])

        assert result.exit_code == 0
        assert 'wontfix' in result.output.lower()
        client.update_issue.assert_called_once_with('issue-uuid-123', status='canceled')

    def test_wontfix_already_canceled(self, cli_runner):
        """issue wontfix on already-canceled issue shows message."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123",
            "identifier": "CHT-100",
            "status": "canceled",
        })

        result = cli_runner.invoke(cli, ['issue', 'wontfix', 'CHT-100'])

        assert result.exit_code == 0
        assert 'already canceled' in result.output.lower()


class TestIssueClaim:
    """Tests for issue claim command."""

    def test_claim_assigns_and_starts(self, cli_runner, mock_issue):
        """issue claim assigns to self and moves to in_progress."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-uuid-me"})
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'claim', 'CHT-100'])

        assert result.exit_code == 0
        assert 'claimed' in result.output.lower()
        client.update_issue.assert_called_once_with(
            'issue-uuid-123', assignee_id='user-uuid-me', status='in_progress',
        )


class TestIssueRituals:
    """Tests for issue rituals command."""

    def test_rituals_shows_pending(self, cli_runner, mock_issue):
        """issue rituals shows pending rituals."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [
                {"name": "run-tests", "approval_mode": "auto", "prompt": "Run tests?", "attestation": None},
            ],
            "completed_rituals": [],
        })

        result = cli_runner.invoke(cli, ['issue', 'rituals', 'CHT-100'])

        assert result.exit_code == 0
        assert 'run-tests' in result.output
        assert 'Run tests?' in result.output

    def test_rituals_shows_completed(self, cli_runner, mock_issue):
        """issue rituals shows completed rituals with checkmark."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [],
            "completed_rituals": [
                {
                    "name": "run-tests",
                    "attestation": {"note": "All pass", "attested_at": "2026-02-15T12:00:00"},
                },
            ],
        })

        result = cli_runner.invoke(cli, ['issue', 'rituals', 'CHT-100'])

        assert result.exit_code == 0
        assert '✓' in result.output
        assert 'run-tests' in result.output

    def test_rituals_no_rituals(self, cli_runner, mock_issue):
        """issue rituals with no rituals shows message."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [],
            "completed_rituals": [],
        })

        result = cli_runner.invoke(cli, ['issue', 'rituals', 'CHT-100'])

        assert result.exit_code == 0
        assert 'No ticket-level rituals' in result.output


class TestIssueEscalate:
    """Tests for issue escalate command."""

    def test_escalate_bumps_priority(self, cli_runner):
        """issue escalate increases priority by one level."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123",
            "identifier": "CHT-100",
            "priority": "medium",
        })
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'escalate', 'CHT-100'])

        assert result.exit_code == 0
        assert 'high' in result.output.lower()
        client.update_issue.assert_called_once_with('issue-uuid-123', priority='high')

    def test_escalate_from_no_priority(self, cli_runner):
        """issue escalate from no_priority goes to low."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123",
            "identifier": "CHT-100",
            "priority": "no_priority",
        })
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'escalate', 'CHT-100'])

        assert result.exit_code == 0
        client.update_issue.assert_called_once_with('issue-uuid-123', priority='low')

    def test_escalate_already_urgent(self, cli_runner):
        """issue escalate at urgent shows message."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123",
            "identifier": "CHT-100",
            "priority": "urgent",
        })

        result = cli_runner.invoke(cli, ['issue', 'escalate', 'CHT-100'])

        assert result.exit_code == 0
        assert 'already' in result.output.lower()


class TestIssueDeescalate:
    """Tests for issue deescalate command."""

    def test_deescalate_lowers_priority(self, cli_runner):
        """issue deescalate decreases priority by one level."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123",
            "identifier": "CHT-100",
            "priority": "high",
        })
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'deescalate', 'CHT-100'])

        assert result.exit_code == 0
        assert 'medium' in result.output.lower()
        client.update_issue.assert_called_once_with('issue-uuid-123', priority='medium')

    def test_deescalate_already_lowest(self, cli_runner):
        """issue deescalate at no_priority shows message."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123",
            "identifier": "CHT-100",
            "priority": "no_priority",
        })

        result = cli_runner.invoke(cli, ['issue', 'deescalate', 'CHT-100'])

        assert result.exit_code == 0
        assert 'already' in result.output.lower()
