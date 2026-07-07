"""Tests for inbox CLI commands (CHT-1250).

Covers: bare `chaotic inbox` (list alias), `inbox list --unread --json`,
`inbox mark-read`, `inbox mark-all-read`.
"""
from unittest.mock import MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


_ENTRY = {
    "id": "entry-uuid-123456",
    "kind": "gate_pending",
    "title": "Gate pending: deploy_check on PRJ-1",
    "body": "Did you deploy?",
    "issue_id": "issue-1",
    "issue_identifier": "PRJ-1",
    "document_id": None,
    "document_title": None,
    "created_at": "2026-07-06T12:00:00",
    "read_at": None,
}


class TestInboxList:
    """Tests for `chaotic inbox list` (and its bare-group alias)."""

    def test_list_shows_entries(self, cli_runner):
        from cli.main import cli, client

        client.get_inbox = MagicMock(return_value=[_ENTRY])

        result = cli_runner.invoke(cli, ['inbox', 'list'])

        assert result.exit_code == 0
        assert 'PRJ-1' in result.output
        assert 'Gate pending' in result.output or 'gate_pending' in result.output

    def test_bare_inbox_is_same_as_list(self, cli_runner):
        from cli.main import cli, client

        client.get_inbox = MagicMock(return_value=[_ENTRY])

        result = cli_runner.invoke(cli, ['inbox'])

        assert result.exit_code == 0
        assert 'PRJ-1' in result.output

    def test_list_empty_shows_message(self, cli_runner):
        from cli.main import cli, client

        client.get_inbox = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['inbox', 'list'])

        assert result.exit_code == 0
        assert 'empty' in result.output.lower()

    def test_list_json(self, cli_runner):
        from cli.main import cli, client

        client.get_inbox = MagicMock(return_value=[_ENTRY])

        result = cli_runner.invoke(cli, ['inbox', 'list', '--json'])

        assert result.exit_code == 0
        assert 'PRJ-1' in result.output
        assert '"kind": "gate_pending"' in result.output

    def test_list_passes_unread_flag(self, cli_runner):
        from cli.main import cli, client

        client.get_inbox = MagicMock(return_value=[])

        cli_runner.invoke(cli, ['inbox', 'list', '--unread'])

        client.get_inbox.assert_called_once()
        _, kwargs = client.get_inbox.call_args
        assert kwargs.get('unread') is True

    def test_list_passes_pagination(self, cli_runner):
        from cli.main import cli, client

        client.get_inbox = MagicMock(return_value=[])

        cli_runner.invoke(cli, ['inbox', 'list', '--limit', '10', '--skip', '5'])

        _, kwargs = client.get_inbox.call_args
        assert kwargs.get('limit') == 10
        assert kwargs.get('skip') == 5

    def test_list_requires_team(self, cli_runner):
        from unittest.mock import patch
        from cli.main import cli

        with patch('cli.main.get_current_team', return_value=None):
            result = cli_runner.invoke(cli, ['inbox', 'list'])

        assert result.exit_code != 0
        assert 'No team selected' in result.output


class TestInboxMarkRead:
    def test_mark_read_success(self, cli_runner):
        from cli.main import cli, client

        client.mark_inbox_read = MagicMock(return_value={"id": "entry-uuid-123456", "read_at": "now"})

        result = cli_runner.invoke(cli, ['inbox', 'mark-read', 'entry-uuid-123456'])

        assert result.exit_code == 0
        client.mark_inbox_read.assert_called_once_with('entry-uuid-123456')
        assert 'entry-uuid-123456' in result.output

    def test_mark_read_json(self, cli_runner):
        from cli.main import cli, client

        client.mark_inbox_read = MagicMock(return_value={"id": "entry-uuid-123456", "read_at": "now"})

        result = cli_runner.invoke(cli, ['inbox', 'mark-read', 'entry-uuid-123456', '--json'])

        assert result.exit_code == 0
        assert '"read_at": "now"' in result.output


class TestInboxMarkAllRead:
    def test_mark_all_read_success(self, cli_runner):
        from cli.main import cli, client

        client.mark_all_inbox_read = MagicMock(return_value={"marked_count": 3})

        result = cli_runner.invoke(cli, ['inbox', 'mark-all-read'])

        assert result.exit_code == 0
        assert '3' in result.output

    def test_mark_all_read_json(self, cli_runner):
        from cli.main import cli, client

        client.mark_all_inbox_read = MagicMock(return_value={"marked_count": 0})

        result = cli_runner.invoke(cli, ['inbox', 'mark-all-read', '--json'])

        assert result.exit_code == 0
        assert '"marked_count": 0' in result.output
