"""Tests for ritual CLI commands (CHT-721).

Tests for ritual attest (sprint + ticket), ritual status, and ritual create.
"""
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def mock_ritual():
    """Standard auto-mode sprint ritual."""
    return {
        "id": "ritual-uuid-123",
        "name": "sprint-report",
        "prompt": "Write a sprint report.",
        "approval_mode": "auto",
        "trigger": "every_sprint",
        "note_required": True,
    }


@pytest.fixture
def mock_ticket_ritual():
    """Standard auto-mode ticket-close ritual."""
    return {
        "id": "ritual-uuid-456",
        "name": "run-tests",
        "prompt": "Did you run the tests?",
        "approval_mode": "auto",
        "trigger": "ticket_close",
        "note_required": True,
    }


class TestRitualAttestSprint:
    """Tests for ritual attest (sprint-level)."""

    def test_attest_sprint_ritual_auto_approved(self, cli_runner, mock_ritual):
        """Sprint ritual attest with note succeeds and shows cleared message."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])
        client.attest_ritual = MagicMock(return_value={
            "approved_at": "2026-02-11T00:00:00",
        })
        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
            "completed_rituals": [],
        })

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, [
                'ritual', 'attest', 'sprint-report', '--note', 'Report written.',
            ])

        assert result.exit_code == 0
        assert 'cleared' in result.output.lower()
        client.attest_ritual.assert_called_once_with(
            'ritual-uuid-123', 'test-project-123', 'Report written.',
        )

    def test_attest_sprint_ritual_pending_approval(self, cli_runner, mock_ritual):
        """Sprint ritual in review mode shows pending message."""
        from cli.main import cli, client

        mock_ritual["approval_mode"] = "review"
        client.get_rituals = MagicMock(return_value=[mock_ritual])
        client.attest_ritual = MagicMock(return_value={
            "approved_at": None,
        })

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, [
                'ritual', 'attest', 'sprint-report', '--note', 'Report written.',
            ])

        assert result.exit_code == 0
        assert 'pending' in result.output.lower()

    def test_attest_missing_note_shows_error(self, cli_runner, mock_ritual):
        """Attest without --note when note_required=True shows error."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, [
                'ritual', 'attest', 'sprint-report',
            ])

        assert result.exit_code != 0
        assert 'note' in result.output.lower()

    def test_attest_empty_note_shows_error(self, cli_runner, mock_ritual):
        """Attest with empty/whitespace note when note_required shows error."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, [
                'ritual', 'attest', 'sprint-report', '--note', '   ',
            ])

        assert result.exit_code != 0
        assert 'note' in result.output.lower()

    def test_attest_nonexistent_ritual_shows_error(self, cli_runner):
        """Attest for unknown ritual name shows error."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, [
                'ritual', 'attest', 'nonexistent', '--note', 'test',
            ])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()

    def test_attest_note_not_required(self, cli_runner, mock_ritual):
        """Attest without note succeeds when note_required=False."""
        from cli.main import cli, client

        mock_ritual["note_required"] = False
        client.get_rituals = MagicMock(return_value=[mock_ritual])
        client.attest_ritual = MagicMock(return_value={
            "approved_at": "2026-02-11T00:00:00",
        })
        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
            "completed_rituals": [],
        })

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, [
                'ritual', 'attest', 'sprint-report',
            ])

        assert result.exit_code == 0
        assert 'cleared' in result.output.lower()


class TestRitualAttestTicket:
    """Tests for ritual attest --ticket (ticket-level)."""

    def test_attest_ticket_ritual_succeeds(self, cli_runner, mock_ticket_ritual):
        """Ticket ritual attest with --ticket and --note succeeds."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ticket_ritual])
        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123", "identifier": "CHT-100",
        })
        client.attest_ritual_for_issue = MagicMock(return_value={
            "approved_at": "2026-02-11T00:00:00",
        })

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, [
                'ritual', 'attest', 'run-tests',
                '--ticket', 'CHT-100', '--note', 'All tests pass.',
            ])

        assert result.exit_code == 0
        assert 'cleared' in result.output.lower()
        assert 'CHT-100' in result.output
        client.attest_ritual_for_issue.assert_called_once_with(
            'ritual-uuid-456', 'issue-uuid-123', 'All tests pass.',
        )

    def test_attest_ticket_ritual_missing_ticket_flag(self, cli_runner, mock_ticket_ritual):
        """Ticket ritual without --ticket shows error."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ticket_ritual])

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, [
                'ritual', 'attest', 'run-tests', '--note', 'All tests pass.',
            ])

        assert result.exit_code != 0
        assert '--ticket' in result.output

    def test_attest_ticket_ritual_pending_approval(self, cli_runner, mock_ticket_ritual):
        """Ticket ritual in review mode shows pending message."""
        from cli.main import cli, client

        mock_ticket_ritual["approval_mode"] = "review"
        client.get_rituals = MagicMock(return_value=[mock_ticket_ritual])
        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123", "identifier": "CHT-100",
        })
        client.attest_ritual_for_issue = MagicMock(return_value={
            "approved_at": None,
        })

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, [
                'ritual', 'attest', 'run-tests',
                '--ticket', 'CHT-100', '--note', 'Tests pass.',
            ])

        assert result.exit_code == 0
        assert 'pending' in result.output.lower()


class TestRitualStatus:
    """Tests for ritual status command."""

    def test_status_in_limbo(self, cli_runner):
        """ritual status without args shows limbo status."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": True,
            "pending_rituals": [
                {"name": "sprint-report", "attestation": None},
            ],
            "completed_rituals": [],
        })

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'status'])

        assert result.exit_code == 0
        assert 'LIMBO' in result.output
        assert 'sprint-report' in result.output

    def test_status_not_in_limbo(self, cli_runner):
        """ritual status shows clean message when not in limbo."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
            "completed_rituals": [],
        })

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'status'])

        assert result.exit_code == 0
        assert 'Not in limbo' in result.output

    def test_status_ticket_shows_pending_rituals(self, cli_runner):
        """ritual status CHT-100 shows ticket ritual status."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123", "identifier": "CHT-100",
        })
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [
                {
                    "name": "run-tests",
                    "approval_mode": "auto",
                    "prompt": "Did you run the tests?",
                    "attestation": None,
                },
            ],
            "completed_rituals": [],
        })

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'status', 'CHT-100'])

        assert result.exit_code == 0
        assert 'run-tests' in result.output
        # CHT-731 regression: _print_ritual_prompt must be callable from
        # ritual_status scope — verify prompt text actually rendered
        assert 'Did you run the tests?' in result.output

    def test_status_ticket_no_rituals(self, cli_runner):
        """ritual status for ticket with no rituals shows clean message."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123", "identifier": "CHT-100",
        })
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [],
            "completed_rituals": [],
        })

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'status', 'CHT-100'])

        assert result.exit_code == 0
        assert 'No ticket-level rituals' in result.output

    def test_status_ticket_with_completed_rituals(self, cli_runner):
        """ritual status shows completed rituals with checkmark."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123", "identifier": "CHT-100",
        })
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [],
            "completed_rituals": [
                {
                    "name": "run-tests",
                    "attestation": {
                        "note": "All tests pass.",
                        "attested_at": "2026-02-11T00:00:00",
                    },
                },
            ],
        })

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['ritual', 'status', 'CHT-100'])

        assert result.exit_code == 0
        assert 'run-tests' in result.output
        assert '✓' in result.output


class TestRitualCreate:
    """Tests for ritual create command."""

    def test_create_ritual_defaults(self, cli_runner):
        """ritual create with name and prompt creates auto sprint ritual."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
            "completed_rituals": [],
        })
        client.create_ritual = MagicMock(return_value={
            "id": "new-ritual-id",
            "name": "my-ritual",
        })

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, [
                'ritual', 'create', 'my-ritual', 'Do the thing.',
            ])

        assert result.exit_code == 0
        assert 'my-ritual' in result.output
        client.create_ritual.assert_called_once_with(
            'test-project-123',
            'my-ritual',
            'Do the thing.',
            approval_mode='auto',
            trigger='every_sprint',
            note_required=True,
            group_id=None,
            weight=1.0,
            percentage=None,
        )

    def test_create_ritual_ticket_close_gate(self, cli_runner):
        """ritual create with --trigger ticket_close --mode gate."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
            "completed_rituals": [],
        })
        client.create_ritual = MagicMock(return_value={
            "id": "new-ritual-id",
            "name": "code-review",
        })

        with patch('cli.config.get_current_project', return_value='test-project-123'), \
             patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, [
                'ritual', 'create', 'code-review', 'Did you review the code?',
                '--mode', 'gate', '--trigger', 'ticket_close',
            ])

        assert result.exit_code == 0
        assert 'code-review' in result.output
        assert 'ticket-close' in result.output
        client.create_ritual.assert_called_once_with(
            'test-project-123',
            'code-review',
            'Did you review the code?',
            approval_mode='gate',
            trigger='ticket_close',
            note_required=True,
            group_id=None,
            weight=1.0,
            percentage=None,
        )
