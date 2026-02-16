"""Tests for ritual history command (CHT-79)."""
import pytest
from unittest.mock import patch, MagicMock


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


class TestRitualHistory:
    """Tests for ritual history command."""

    def test_history_empty(self, cli_runner):
        """ritual history shows message when no attestations exist."""
        from cli.main import cli, client

        client.get_ritual_history = MagicMock(return_value=[])

        with patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'history'])

        assert result.exit_code == 0
        assert 'No attestation history found' in result.output

    def test_history_displays_entries(self, cli_runner):
        """ritual history renders a table with attestation entries."""
        from cli.main import cli, client

        client.get_ritual_history = MagicMock(return_value=[
            {
                "id": "att-1",
                "ritual_name": "sprint-report",
                "ritual_trigger": "every_sprint",
                "approval_mode": "auto",
                "sprint_id": "s-1",
                "sprint_name": "Sprint 5",
                "issue_id": None,
                "issue_identifier": None,
                "attested_by_name": "Alice",
                "attested_at": "2026-02-10T12:00:00Z",
                "note": "All good",
                "approved_by_name": None,
                "approved_at": "2026-02-10T12:00:00Z",
            },
        ])

        with patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'history'])

        assert result.exit_code == 0
        assert 'sprint-re' in result.output  # rich may truncate long names
        assert 'Alice' in result.output
        assert 'Sprint 5' in result.output
        assert 'All good' in result.output

    def test_history_shows_pending_status(self, cli_runner):
        """ritual history shows Pending for unapproved attestations."""
        from cli.main import cli, client

        client.get_ritual_history = MagicMock(return_value=[
            {
                "id": "att-2",
                "ritual_name": "code-review",
                "ritual_trigger": "ticket_close",
                "approval_mode": "peer",
                "sprint_id": None,
                "sprint_name": None,
                "issue_id": "i-1",
                "issue_identifier": "CHT-100",
                "attested_by_name": "Bob",
                "attested_at": "2026-02-11T10:00:00Z",
                "note": None,
                "approved_by_name": None,
                "approved_at": None,
            },
        ])

        with patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'history'])

        assert result.exit_code == 0
        assert 'Pending' in result.output
        assert 'CHT-100' in result.output

    def test_history_limit_option(self, cli_runner):
        """ritual history passes --limit to the client."""
        from cli.main import cli, client

        client.get_ritual_history = MagicMock(return_value=[])

        with patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'history', '--limit', '5'])

        assert result.exit_code == 0
        client.get_ritual_history.assert_called_once_with('test-project-123', limit=5)

    def test_history_auto_approval_display(self, cli_runner):
        """ritual history shows Auto status for auto-approved attestations."""
        from cli.main import cli, client

        client.get_ritual_history = MagicMock(return_value=[
            {
                "id": "att-3",
                "ritual_name": "run-tests",
                "ritual_trigger": "ticket_claim",
                "approval_mode": "auto",
                "sprint_id": None,
                "sprint_name": None,
                "issue_id": "i-2",
                "issue_identifier": "CHT-200",
                "attested_by_name": "Carol",
                "attested_at": "2026-02-12T08:00:00Z",
                "note": None,
                "approved_by_name": None,
                "approved_at": "2026-02-12T08:00:00Z",
            },
        ])

        with patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'history'])

        assert result.exit_code == 0
        assert 'Auto' in result.output
        assert 'Claim' in result.output
