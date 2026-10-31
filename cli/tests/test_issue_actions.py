"""Tests for issue action commands (CHT-887).

Tests cover: issue delete, sub-issues, relations, block, unblock, duplicate,
assign, move, close, wontfix, claim, rituals, escalate, deescalate.
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


# The wire shape of GET /issues/{id}/relations (IssueRelationResponse):
# flat related_issue_* fields, no nested related_issue object (CHT-1431).
WIRE_RELATION = {
    "id": "rel-uuid-123456789",
    "issue_id": "issue-uuid-123",
    "related_issue_id": "issue-uuid-200",
    "relation_type": "blocks",
    "created_at": "2026-09-13T13:57:58.332760Z",
    "related_issue_identifier": "CHT-200",
    "related_issue_title": "Downstream work",
    "related_issue_status": "backlog",
    "direction": "outgoing",
}
WIRE_INCOMING = {
    **WIRE_RELATION,
    "id": "rel-uuid-987654321",
    "related_issue_id": "issue-uuid-50",
    "relation_type": "blocked_by",
    "related_issue_identifier": "CHT-50",
    "related_issue_title": "Upstream work",
    "related_issue_status": "in_progress",
    "direction": "incoming",
}


class TestIssueRelations:
    """Tests for issue relations command."""

    def test_relations_shows_table(self, cli_runner, mock_issue):
        """issue relations displays relations in a table."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_relations = MagicMock(return_value=[WIRE_RELATION, WIRE_INCOMING])

        result = cli_runner.invoke(cli, ['issue', 'relations', 'CHT-100'])

        assert result.exit_code == 0, result.output
        assert 'CHT-200' in result.output
        assert 'CHT-50' in result.output
        assert 'Blocked By' in result.output
        assert 'Traceback' not in result.output

    def test_relations_malformed_rows_do_not_crash(self, cli_runner, mock_issue):
        """CHT-1431: a row missing fields (or not a dict) renders as '-', no traceback."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_relations = MagicMock(return_value=[
            {"id": "short"},
            {"relation_type": None, "related_issue": {"identifier": "OLD-1"}},
            {"id": 12345, "relation_type": 7, "related_issue_title": "[bold]x[/bold]"},
            "not-a-dict",
            None,
        ])

        result = cli_runner.invoke(cli, ['issue', 'relations', 'CHT-100'])

        assert result.exit_code == 0, result.output
        assert result.exception is None
        assert '[bold]x[/bold]' in result.output  # markup escaped, not interpreted

    def test_relation_row_placeholders(self):
        """Missing fields become '-' (title ''), whatever the row looks like."""
        from cli.commands.issue_cmd import _relation_row

        empty = ("-", "-", "-", "", "-", "-")
        assert _relation_row(None) == empty
        assert _relation_row("not-a-dict") == empty
        assert _relation_row({}) == empty
        assert _relation_row({"id": "short"}) == ("short", "-", "-", "", "-", "-")
        assert _relation_row({"related_issue": {"identifier": "OLD-1"}}) == empty
        assert _relation_row({"id": 12345, "relation_type": 7}) == ("12345", "7", "-", "", "-", "-")
        assert _relation_row(WIRE_RELATION) == (
            "rel-uuid...", "Blocks", "CHT-200", "Downstream work", "Backlog", "outgoing",
        )

    def test_incoming_duplicates_reads_duplicated_by(self, cli_runner, mock_issue):
        """Review #1: the server relabels only incoming blocks; an incoming
        duplicates edge means the other issue duplicates this one."""
        from cli.main import cli, client
        from cli.commands.issue_cmd import _relation_row

        incoming_dup = {**WIRE_INCOMING, "relation_type": "duplicates"}
        outgoing_dup = {**WIRE_RELATION, "relation_type": "duplicates"}
        assert _relation_row(incoming_dup)[1] == "Duplicated By"
        assert _relation_row(outgoing_dup)[1] == "Duplicates"

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_relations = MagicMock(return_value=[incoming_dup])
        result = cli_runner.invoke(cli, ['issue', 'relations', 'CHT-100'])
        assert result.exit_code == 0, result.output
        # The narrow test terminal wraps the cell, so match the first word.
        assert 'Duplicated' in result.output
        assert 'Duplicates' not in result.output

    def test_relations_falls_back_to_related_issue_id(self, cli_runner, mock_issue):
        """No identifier on the row: show the related issue id instead of '-'."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_relations = MagicMock(return_value=[
            {**WIRE_RELATION, "related_issue_identifier": None},
        ])

        result = cli_runner.invoke(cli, ['issue', 'relations', 'CHT-100'])

        assert result.exit_code == 0, result.output
        assert 'issue-uuid-200' in result.output

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
        client.get_relations = MagicMock(return_value=[WIRE_RELATION])

        result = cli_runner.invoke(cli, ['issue', 'relations', 'CHT-100', '--json'])

        assert result.exit_code == 0
        assert json.loads(result.output) == [WIRE_RELATION]


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


    def test_close_reports_last_child_prompt_and_open_children(self, cli_runner, mock_issue):
        """CHT-1901/CHT-1884: what closing left open goes to stderr."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_project = MagicMock(return_value={})
        client.update_issue = MagicMock(return_value={
            "parent_prompt": {"identifier": "CHT-9", "message": "That was the last open ticket under CHT-9 (Goal). Close CHT-9, or add more?"},
            "open_children": {"count": 2, "identifiers": ["CHT-1", "CHT-2"], "message": "CHT-100 still has 2 open sub-issues"},
        })
        result = cli_runner.invoke(cli, ['issue', 'close', 'CHT-100'])
        assert result.exit_code == 0, result.output
        assert "last open ticket under CHT-9" in result.output
        assert "chaotic issue close CHT-9" in result.output
        assert "--parent CHT-9" in result.output
        assert "still has 2 open sub-issues" in result.output

    def test_close_without_followups_prints_nothing_extra(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock(return_value={"parent_prompt": None, "open_children": None})
        result = cli_runner.invoke(cli, ['issue', 'close', 'CHT-100'])
        assert result.exit_code == 0
        assert "Close it" not in result.output and "Warning" not in result.output


class TestIssueCloseAttest:
    """Tests for non-interactive ritual attestation on close (CHT-1326)."""

    def _pending(self, *rituals):
        return {
            "pending_rituals": list(rituals),
            "completed_rituals": [],
        }

    def test_close_attests_named_rituals_then_closes(self, cli_runner, mock_issue):
        """--attest name:note attests each ritual before the close, so a
        non-interactive close never strands a blocked intent."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()
        client.get_pending_issue_rituals = MagicMock(return_value=self._pending(
            {"id": "rit-1", "name": "close-gate", "approval_mode": "auto"},
            {"id": "rit-2", "name": "doc-refresh", "approval_mode": "auto"},
        ))
        client.attest_ritual_for_issue = MagicMock(return_value={"approved_at": "2026-07-23"})

        result = cli_runner.invoke(cli, [
            'issue', 'close', 'CHT-100',
            '--attest', 'close-gate:ADR written and reviewed',
            '--attest', 'doc-refresh:README updated',
        ])

        assert result.exit_code == 0, result.output
        client.attest_ritual_for_issue.assert_any_call(
            'rit-1', 'issue-uuid-123', 'ADR written and reviewed')
        client.attest_ritual_for_issue.assert_any_call(
            'rit-2', 'issue-uuid-123', 'README updated')
        client.update_issue.assert_called_once_with('issue-uuid-123', status='done')

    def test_close_attest_gate_ritual_uses_gate_completion(self, cli_runner, mock_issue):
        """GATE rituals route through the gate-completion endpoint."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()
        client.get_pending_issue_rituals = MagicMock(return_value=self._pending(
            {"id": "rit-g", "name": "close-gate", "approval_mode": "gate"},
        ))
        client.complete_gate_ritual_for_issue = MagicMock(return_value={})
        client.attest_ritual_for_issue = MagicMock()

        result = cli_runner.invoke(cli, [
            'issue', 'close', 'CHT-100', '--attest', 'close-gate:verified',
        ])

        assert result.exit_code == 0, result.output
        client.complete_gate_ritual_for_issue.assert_called_once_with(
            'rit-g', 'issue-uuid-123', 'verified')
        client.attest_ritual_for_issue.assert_not_called()

    def test_close_attest_rejects_missing_note(self, cli_runner, mock_issue):
        """A spec without a note is refused up front."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, [
            'issue', 'close', 'CHT-100', '--attest', 'close-gate',
        ])

        assert result.exit_code != 0
        client.update_issue.assert_not_called()

    def test_close_attest_unknown_ritual_errors_before_close(self, cli_runner, mock_issue):
        """Attesting a ritual that isn't pending fails loudly and does
        not attempt the close."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()
        client.get_pending_issue_rituals = MagicMock(return_value=self._pending(
            {"id": "rit-1", "name": "close-gate", "approval_mode": "auto"},
        ))

        result = cli_runner.invoke(cli, [
            'issue', 'close', 'CHT-100', '--attest', 'no-such-ritual:note',
        ])

        assert result.exit_code != 0
        assert 'no-such-ritual' in result.output
        client.update_issue.assert_not_called()

    def test_close_attest_already_completed_is_skipped(self, cli_runner, mock_issue):
        """An already-attested ritual is skipped (idempotent) and the
        close still proceeds."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [],
            "completed_rituals": [{"id": "rit-1", "name": "close-gate"}],
        })
        client.attest_ritual_for_issue = MagicMock()

        result = cli_runner.invoke(cli, [
            'issue', 'close', 'CHT-100', '--attest', 'close-gate:done already',
        ])

        assert result.exit_code == 0, result.output
        client.attest_ritual_for_issue.assert_not_called()
        client.update_issue.assert_called_once_with('issue-uuid-123', status='done')

    def test_update_status_done_with_attest(self, cli_runner, mock_issue):
        """issue update --status done --attest works the same way."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()
        client.get_pending_issue_rituals = MagicMock(return_value=self._pending(
            {"id": "rit-1", "name": "close-gate", "approval_mode": "auto"},
        ))
        client.attest_ritual_for_issue = MagicMock(return_value={"approved_at": "x"})

        result = cli_runner.invoke(cli, [
            'issue', 'update', 'CHT-100', '--status', 'done',
            '--attest', 'close-gate:notes here',
        ])

        assert result.exit_code == 0, result.output
        client.attest_ritual_for_issue.assert_called_once_with(
            'rit-1', 'issue-uuid-123', 'notes here')
        client.update_issue.assert_called_once_with('issue-uuid-123', status='done')

    def test_claim_with_attest(self, cli_runner, mock_issue):
        """issue claim --attest satisfies claim rituals inline."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.update_issue = MagicMock()
        client.get_pending_issue_rituals = MagicMock(return_value=self._pending(
            {"id": "rit-c", "name": "claim-gate", "approval_mode": "auto"},
        ))
        client.attest_ritual_for_issue = MagicMock(return_value={"approved_at": "x"})

        result = cli_runner.invoke(cli, [
            'issue', 'claim', 'CHT-100', '--attest', 'claim-gate:branch cut',
        ])

        assert result.exit_code == 0, result.output
        client.attest_ritual_for_issue.assert_called_once_with(
            'rit-c', 'issue-uuid-123', 'branch cut')
        client.update_issue.assert_called_once_with(
            'issue-uuid-123', assignee_id='user-1', status='in_progress')

    def test_complete_alias_delegates_attest(self, cli_runner, mock_issue):
        """issue complete passes --attest through to close's callback
        (keyword call — CHT-1222-style delegation drift guard)."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()
        client.get_pending_issue_rituals = MagicMock(return_value=self._pending(
            {"id": "rit-1", "name": "close-gate", "approval_mode": "auto"},
        ))
        client.attest_ritual_for_issue = MagicMock(return_value={"approved_at": "x"})

        result = cli_runner.invoke(cli, [
            'issue', 'complete', 'CHT-100', '--attest', 'close-gate:done',
        ])

        assert result.exit_code == 0, result.output
        client.attest_ritual_for_issue.assert_called_once_with(
            'rit-1', 'issue-uuid-123', 'done')
        client.update_issue.assert_called_once_with('issue-uuid-123', status='done')

    def test_start_alias_delegates_attest(self, cli_runner, mock_issue):
        """issue start passes --attest through to claim's callback."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.update_issue = MagicMock()
        client.get_pending_issue_rituals = MagicMock(return_value=self._pending(
            {"id": "rit-c", "name": "claim-gate", "approval_mode": "auto"},
        ))
        client.attest_ritual_for_issue = MagicMock(return_value={"approved_at": "x"})

        result = cli_runner.invoke(cli, [
            'issue', 'start', 'CHT-100', '--attest', 'claim-gate:branch cut',
        ])

        assert result.exit_code == 0, result.output
        client.attest_ritual_for_issue.assert_called_once_with(
            'rit-c', 'issue-uuid-123', 'branch cut')
        client.update_issue.assert_called_once_with(
            'issue-uuid-123', assignee_id='user-1', status='in_progress')

    def test_update_attest_only_json_emits_issue(self, cli_runner, mock_issue):
        """Attestation-only `issue update --attest --json` emits the
        refetched issue exactly once and calls no field update."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()
        client.get_pending_issue_rituals = MagicMock(return_value=self._pending(
            {"id": "rit-1", "name": "close-gate", "approval_mode": "auto"},
        ))
        client.attest_ritual_for_issue = MagicMock(return_value={"approved_at": "x"})

        result = cli_runner.invoke(cli, [
            'issue', 'update', 'CHT-100',
            '--attest', 'close-gate:notes here', '--json',
        ])

        assert result.exit_code == 0, result.output
        client.update_issue.assert_not_called()
        payload = json.loads(result.stdout)
        assert payload["identifier"] == "CHT-100"


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

    def test_claim_without_lease_omits_lease_seconds(self, cli_runner, mock_issue):
        """No --lease: lease_seconds isn't sent, server default applies (CHT-1246)."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-uuid-me"})
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'claim', 'CHT-100'])

        assert result.exit_code == 0
        kwargs = client.update_issue.call_args[1]
        assert 'lease_seconds' not in kwargs

    def test_claim_with_lease_passes_parsed_seconds(self, cli_runner, mock_issue):
        """--lease 4h parses to seconds and is forwarded (CHT-1246)."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-uuid-me"})
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'claim', 'CHT-100', '--lease', '4h'])

        assert result.exit_code == 0
        kwargs = client.update_issue.call_args[1]
        assert kwargs['lease_seconds'] == 4 * 3600

    def test_claim_with_zero_lease_rejected(self, cli_runner, mock_issue):
        """--lease 0 is ambiguous (instant expiry); rejected like await --timeout 0."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-uuid-me"})
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'claim', 'CHT-100', '--lease', '0'])

        assert result.exit_code == 2
        assert '--lease' in result.output
        client.update_issue.assert_not_called()

    def test_start_alias_passes_lease_through(self, cli_runner, mock_issue):
        """'issue start --lease' forwards to claim's lease handling (CHT-1246)."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-uuid-me"})
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'start', 'CHT-100', '--lease', '30m'])

        assert result.exit_code == 0, result.output
        kwargs = client.update_issue.call_args[1]
        assert kwargs['lease_seconds'] == 30 * 60


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


class TestIssueActionsJsonOutput:
    """State-transition/mutation commands across the issue group previously
    had no --json support at all (CHT-1222). Each now emits the affected
    entity as a single JSON object on stdout, with status lines redirected
    to stderr by the shared JsonAwareConsole -- verified here via
    result.stdout (pure stdout) rather than result.output (mixed)."""

    def test_delete_json(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.delete_issue = MagicMock()

        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['issue', 'delete', 'CHT-100', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data == {"deleted": True, "id": "issue-uuid-123", "identifier": "CHT-100"}
        assert 'deleted' in result.stderr.lower()

    def test_block_json(self, cli_runner):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(side_effect=[
            {"id": "issue-1", "identifier": "CHT-100"},
            {"id": "issue-2", "identifier": "CHT-200"},
        ])
        client.create_relation = MagicMock(return_value={"id": "rel-1", "relation_type": "blocks"})

        result = cli_runner.invoke(cli, ['issue', 'block', 'CHT-100', 'CHT-200', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data == {"id": "rel-1", "relation_type": "blocks"}

    def test_unblock_json(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.delete_relation = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'unblock', 'CHT-100', 'rel-uuid-123', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['deleted'] is True
        assert data['id'] == 'rel-uuid-123'

    def test_duplicate_json(self, cli_runner):
        from cli.main import cli, client

        final_dup = {"id": "dup-id", "identifier": "CHT-101", "status": "canceled"}
        client.get_issue_by_identifier = MagicMock(side_effect=[
            {"id": "dup-id", "identifier": "CHT-101", "status": "in_progress"},
            {"id": "orig-id", "identifier": "CHT-100", "status": "in_progress"},
            final_dup,  # json_result's refetch after the mutation
        ])
        client.create_relation = MagicMock()
        client.create_comment = MagicMock()
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'duplicate', 'CHT-101', 'CHT-100', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data == final_dup

    def test_assign_json(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        with patch('cli.main.resolve_assignee_id', return_value='user-uuid-456'):
            result = cli_runner.invoke(cli, ['issue', 'assign', 'CHT-100', 'alice', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['identifier'] == 'CHT-100'

    def test_move_json(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'move', 'CHT-100', 'done', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['identifier'] == 'CHT-100'
        assert 'moved' in result.stderr.lower()

    def test_close_json(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'close', 'CHT-100', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['identifier'] == 'CHT-100'

    def test_complete_alias_json_emits_exactly_once(self, cli_runner, mock_issue):
        """complete delegates to close.callback(); this must NOT double-emit
        the JSON payload (CHT-1222) -- stdout must still be exactly one
        JSON value."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'complete', 'CHT-100', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)  # raises if more than one value present
        assert data['identifier'] == 'CHT-100'

    def test_wontfix_json(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'wontfix', 'CHT-100', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['identifier'] == 'CHT-100'

    def test_wontfix_already_canceled_json_still_emits_json(self, cli_runner):
        """The early-return-if-already-canceled path must still honor
        --json (return the current issue) rather than leaving stdout
        empty."""
        from cli.main import cli, client

        canceled_issue = {"id": "issue-uuid-123", "identifier": "CHT-100", "status": "canceled"}
        client.get_issue_by_identifier = MagicMock(return_value=canceled_issue)

        result = cli_runner.invoke(cli, ['issue', 'wontfix', 'CHT-100', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['status'] == 'canceled'

    def test_cancel_alias_json_emits_exactly_once(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'cancel', 'CHT-100', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['identifier'] == 'CHT-100'

    def test_claim_json(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-uuid-me"})
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'claim', 'CHT-100', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['identifier'] == 'CHT-100'

    def test_start_alias_json_emits_exactly_once(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-uuid-me"})
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'start', 'CHT-100', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['identifier'] == 'CHT-100'

    def test_rituals_json(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        ritual_status = {
            "pending_rituals": [{"name": "run-tests", "approval_mode": "auto"}],
            "completed_rituals": [],
        }
        client.get_pending_issue_rituals = MagicMock(return_value=ritual_status)

        result = cli_runner.invoke(cli, ['issue', 'rituals', 'CHT-100', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data == ritual_status

    def test_escalate_json(self, cli_runner):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123", "identifier": "CHT-100", "priority": "medium",
        })
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'escalate', 'CHT-100', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['identifier'] == 'CHT-100'

    def test_deescalate_json(self, cli_runner):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123", "identifier": "CHT-100", "priority": "high",
        })
        client.update_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'deescalate', 'CHT-100', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['identifier'] == 'CHT-100'


class TestConfirmationPromptContract:
    """Drive the REAL click.confirm() path — no confirm_action mocking —
    via CliRunner input streams (CHT-1222 review finding #2). Previously,
    click.confirm's default err=False leaked the raw prompt text onto
    stdout, breaking the one-JSON-value contract on every delete-style
    command; and under --json with empty stdin the prompt text WAS the
    entire stdout."""

    def test_json_without_yes_never_prompts_emits_json_error(self, cli_runner, mock_issue):
        """Under --json with no --yes: no prompt at all (a machine consumer
        can't answer a TTY), {"error": ...} directing the caller to --yes,
        exit 2, mutation not performed."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.delete_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'delete', 'CHT-100', '--json'], input='')

        assert result.exit_code == 2
        data = json.loads(result.stdout)  # raises if the prompt leaked to stdout
        assert '--yes' in data['error']
        client.delete_issue.assert_not_called()

    def test_json_with_yes_proceeds(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.delete_issue = MagicMock()

        result = cli_runner.invoke(cli, ['--yes', 'issue', 'delete', 'CHT-100', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['deleted'] is True
        client.delete_issue.assert_called_once_with('issue-uuid-123')

    def test_interactive_prompt_goes_to_stderr_not_stdout(self, cli_runner, mock_issue):
        """Outside --json, the confirmation prompt itself belongs on
        stderr — stdout stays reserved for command output."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.delete_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'delete', 'CHT-100'], input='y\n')

        assert result.exit_code == 0
        assert 'Are you sure' in result.stderr
        assert 'Are you sure' not in result.stdout
        client.delete_issue.assert_called_once()

    def test_interactive_decline_aborts_without_mutation(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.delete_issue = MagicMock()

        result = cli_runner.invoke(cli, ['issue', 'delete', 'CHT-100'], input='n\n')

        assert result.exit_code == 0
        client.delete_issue.assert_not_called()

    def test_comment_delete_json_without_yes_same_contract(self, cli_runner, mock_issue):
        """Same guarantee on the other confirmation-gated commands this
        branch wired --json onto."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.delete_comment = MagicMock()

        result = cli_runner.invoke(
            cli, ['issue', 'comment-delete', 'CHT-100', 'comment-1', '--json'], input='',
        )

        assert result.exit_code == 2
        data = json.loads(result.stdout)
        assert '--yes' in data['error']
        client.delete_comment.assert_not_called()


class TestIssueCommentJsonOutput:
    """issue comment/comment-edit/comment-delete previously had no --json
    at all, so an agent had no parseable way to learn a comment's id
    without a follow-up `issue show --json` (CHT-1222)."""

    def test_comment_json_includes_comment_id(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.create_comment = MagicMock(return_value={
            "id": "comment-1", "content": "hello", "issue_id": "issue-uuid-123",
        })

        result = cli_runner.invoke(cli, ['issue', 'comment', 'CHT-100', 'hello', '--json'])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['id'] == 'comment-1'
        assert 'added' in result.stderr.lower()

    def test_comment_prints_mention_warnings(self, cli_runner, mock_issue):
        """CHT-1735: an @handle that reached nobody is reported, in text
        and in --json."""
        from cli.main import cli, client

        warning = "@claude is ambiguous; nobody was notified. Use one of: @claude-mcp, @claude-3f9a1c."
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.create_comment = MagicMock(return_value={"id": "comment-1", "content": "@claude", "warnings": [warning]})

        result = cli_runner.invoke(cli, ['issue', 'comment', 'CHT-100', '@claude'])
        assert result.exit_code == 0, result.output
        assert "Warning: @claude is ambiguous" in result.output
        assert "@claude-3f9a1c" in result.output

        result = cli_runner.invoke(cli, ['issue', 'comment', 'CHT-100', '@claude', '--json'])
        assert result.exit_code == 0, result.output
        assert json.loads(result.stdout)["warnings"] == [warning]

    def test_comment_edit_json(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_comment = MagicMock(return_value={"id": "comment-1", "content": "edited"})

        result = cli_runner.invoke(cli, [
            'issue', 'comment-edit', 'CHT-100', 'comment-1', 'edited', '--json',
        ])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data['id'] == 'comment-1'
        assert data['content'] == 'edited'

    def test_comment_delete_json(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.delete_comment = MagicMock()

        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, [
                'issue', 'comment-delete', 'CHT-100', 'comment-1', '--json',
            ])

        assert result.exit_code == 0, result.output
        data = json.loads(result.stdout)
        assert data == {
            "deleted": True, "id": "comment-1",
            "issue_id": "issue-uuid-123", "identifier": "CHT-100",
        }
