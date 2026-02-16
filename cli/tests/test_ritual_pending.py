"""Tests for ritual pending command (CHT-379).

The `ritual pending` command shows the next ritual to complete,
one at a time, for both sprint-close (limbo) and ticket rituals.
"""
import pytest
from unittest.mock import patch, MagicMock


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


class TestRitualPendingSprint:
    """Tests for sprint-level ritual pending (no ticket argument)."""

    def test_no_pending_sprint_rituals(self, cli_runner):
        """When not in limbo, shows green 'no pending' message and exits 0."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
            "completed_rituals": [],
        })

        with patch('cli.main.get_current_project', return_value='test-project'):
            result = cli_runner.invoke(cli, ['ritual', 'pending'])

        assert result.exit_code == 0
        assert 'No pending sprint rituals' in result.output

    def test_shows_first_pending_ritual(self, cli_runner):
        """In limbo with multiple pending, shows only the first un-attested."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": True,
            "pending_rituals": [
                {
                    "name": "sprint-report",
                    "approval_mode": "auto",
                    "prompt": "Write a sprint report.",
                    "attestation": None,
                },
                {
                    "name": "vent-spleen",
                    "approval_mode": "auto",
                    "prompt": "Vent your frustrations.",
                    "attestation": None,
                },
                {
                    "name": "architecture-review",
                    "approval_mode": "auto",
                    "prompt": "Review architecture.",
                    "attestation": None,
                },
            ],
            "completed_rituals": [],
        })

        with patch('cli.main.get_current_project', return_value='test-project'):
            result = cli_runner.invoke(cli, ['ritual', 'pending'])

        assert result.exit_code == 1
        assert 'sprint-report' in result.output
        assert 'chaotic ritual attest sprint-report' in result.output
        # Should NOT mention other rituals or count
        assert 'vent-spleen' not in result.output
        assert 'architecture-review' not in result.output
        assert 'more ritual' not in result.output

    def test_skips_attested_shows_next_unattested(self, cli_runner):
        """When first ritual is attested, shows the next un-attested one."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": True,
            "pending_rituals": [
                {
                    "name": "sprint-report",
                    "approval_mode": "review",
                    "prompt": "Write a sprint report.",
                    "attestation": {"approved_at": None},
                },
                {
                    "name": "vent-spleen",
                    "approval_mode": "auto",
                    "prompt": "Vent your frustrations.",
                    "attestation": None,
                },
            ],
            "completed_rituals": [],
        })

        with patch('cli.main.get_current_project', return_value='test-project'):
            result = cli_runner.invoke(cli, ['ritual', 'pending'])

        assert result.exit_code == 1
        # Should show vent-spleen (first un-attested), not sprint-report
        assert 'vent-spleen' in result.output
        assert 'chaotic ritual attest vent-spleen' in result.output

    def test_all_attested_pending_approval(self, cli_runner):
        """When all attested but pending approval, shows first with ⏳."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": True,
            "pending_rituals": [
                {
                    "name": "sprint-report",
                    "approval_mode": "review",
                    "prompt": "Write a sprint report.",
                    "attestation": {"approved_at": None},
                },
            ],
            "completed_rituals": [],
        })

        with patch('cli.main.get_current_project', return_value='test-project'):
            result = cli_runner.invoke(cli, ['ritual', 'pending'])

        assert result.exit_code == 1
        assert 'pending approval' in result.output


class TestRitualPendingTicket:
    """Tests for ticket-level ritual pending (with ticket argument)."""

    def test_ticket_not_found(self, cli_runner):
        """Shows error when ticket doesn't exist."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=None)

        with patch('cli.main.get_current_project', return_value='test-project'):
            result = cli_runner.invoke(cli, ['ritual', 'pending', 'CHT-999'])

        assert result.exit_code == 1
        assert 'not found' in result.output

    def test_ticket_no_pending_rituals(self, cli_runner):
        """Shows green message when ticket has no pending rituals."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={"id": "issue-1"})
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [],
        })

        with patch('cli.main.get_current_project', return_value='test-project'):
            result = cli_runner.invoke(cli, ['ritual', 'pending', 'CHT-100'])

        assert result.exit_code == 0
        assert 'No pending rituals for CHT-100' in result.output

    def test_ticket_shows_first_ritual(self, cli_runner):
        """Shows first pending ticket ritual with usage hint."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={"id": "issue-1"})
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [
                {
                    "name": "design-review",
                    "approval_mode": "review",
                    "prompt": "Write a design review.",
                    "attestation": None,
                },
                {
                    "name": "work-on-branch",
                    "approval_mode": "auto",
                    "prompt": "Work on a branch.",
                    "attestation": None,
                },
            ],
        })

        with patch('cli.main.get_current_project', return_value='test-project'):
            result = cli_runner.invoke(cli, ['ritual', 'pending', 'CHT-856'])

        assert result.exit_code == 1
        assert 'design-review' in result.output
        assert 'CHT-856' in result.output
        assert 'chaotic ritual attest design-review --ticket CHT-856' in result.output
        # Should NOT mention second ritual or count
        assert 'work-on-branch' not in result.output
        assert 'more ritual' not in result.output

    def test_ticket_attested_pending_approval(self, cli_runner):
        """Shows ⏳ when ticket ritual is attested but pending approval."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={"id": "issue-1"})
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [
                {
                    "name": "design-review",
                    "approval_mode": "gate",
                    "prompt": "Write a design review.",
                    "attestation": {"approved_at": None},
                },
            ],
        })

        with patch('cli.main.get_current_project', return_value='test-project'):
            result = cli_runner.invoke(cli, ['ritual', 'pending', 'CHT-856'])

        assert result.exit_code == 1
        assert 'pending approval' in result.output
