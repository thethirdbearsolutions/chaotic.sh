"""Tests for ritual list command (CHT-719).

Regression test for CHT-718: ritual list crashed with UnboundLocalError
when a sprint was in limbo with pending rituals.
"""
import pytest
from unittest.mock import patch, MagicMock


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


class TestRitualListLimbo:
    """Regression tests for ritual list during limbo (CHT-718)."""

    def test_ritual_list_with_pending_rituals_no_crash(self, cli_runner):
        """ritual list should not crash when sprint is in limbo with pending rituals."""
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
            ],
            "completed_rituals": [],
        })
        client.get_rituals = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'list'])

        assert result.exit_code == 0
        assert 'LIMBO' in result.output
        assert 'sprint-report' in result.output

    def test_ritual_list_with_attested_pending_ritual(self, cli_runner):
        """ritual list shows attested-but-pending-approval rituals."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": True,
            "pending_rituals": [
                {
                    "name": "sprint-report",
                    "approval_mode": "gate",
                    "prompt": "Write a sprint report.",
                    "attestation": {"approved_at": None},
                },
            ],
            "completed_rituals": [],
        })
        client.get_rituals = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'list'])

        assert result.exit_code == 0
        assert 'pending approval' in result.output

    def test_ritual_list_with_completed_ritual(self, cli_runner):
        """ritual list shows completed rituals."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": True,
            "pending_rituals": [],
            "completed_rituals": [
                {"name": "sprint-report"},
            ],
        })
        client.get_rituals = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'list'])

        assert result.exit_code == 0
        assert 'sprint-report' in result.output

    def test_ritual_list_with_approved_ritual(self, cli_runner):
        """ritual list shows approved rituals with checkmark."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": True,
            "pending_rituals": [
                {
                    "name": "sprint-report",
                    "approval_mode": "gate",
                    "prompt": "Write a report.",
                    "attestation": {"approved_at": "2026-02-11T00:00:00"},
                },
            ],
            "completed_rituals": [],
        })
        client.get_rituals = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'list'])

        assert result.exit_code == 0
        assert 'sprint-report' in result.output
        # Approved rituals should show checkmark, not pending indicator
        assert '✓' in result.output or 'pending approval' not in result.output

    def test_ritual_list_limbo_with_configured_rituals(self, cli_runner):
        """ritual list in limbo also shows configured ticket-close rituals."""
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
            ],
            "completed_rituals": [],
        })
        client.get_rituals = MagicMock(return_value=[
            {
                "name": "run-tests",
                "approval_mode": "auto",
                "trigger": "ticket_close",
                "prompt": "Did you run the tests?",
                "note_required": True,
            },
        ])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'list'])

        assert result.exit_code == 0
        assert 'LIMBO' in result.output
        assert 'sprint-report' in result.output
        assert 'run-tests' in result.output
        assert 'Ticket-Close' in result.output


class TestRitualListNormal:
    """Tests for ritual list when not in limbo."""

    def test_ritual_list_not_in_limbo(self, cli_runner):
        """ritual list shows configured rituals when not in limbo."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
            "completed_rituals": [],
        })
        client.get_rituals = MagicMock(return_value=[
            {
                "name": "run-tests",
                "approval_mode": "auto",
                "trigger": "ticket_close",
                "prompt": "Did you run the tests?",
                "note_required": True,
            },
        ])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'list'])

        assert result.exit_code == 0
        assert 'run-tests' in result.output
        assert 'Ticket-Close' in result.output

    def test_ritual_list_no_rituals(self, cli_runner):
        """ritual list shows message when no rituals configured."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
            "completed_rituals": [],
        })
        client.get_rituals = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'list'])

        assert result.exit_code == 0
        assert 'No rituals configured' in result.output

    def test_ritual_list_pending_flag_hides_completed(self, cli_runner):
        """ritual list --pending hides completed rituals."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": True,
            "pending_rituals": [
                {
                    "name": "pending-ritual",
                    "approval_mode": "auto",
                    "prompt": "Do the thing.",
                    "attestation": None,
                },
            ],
            "completed_rituals": [
                {"name": "done-ritual"},
            ],
        })
        client.get_rituals = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'list', '--pending'])

        assert result.exit_code == 0
        assert 'pending-ritual' in result.output
        assert 'done-ritual' not in result.output
