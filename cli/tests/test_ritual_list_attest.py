"""Tests for ritual list and ritual attest commands (CHT-887).

Tests cover: ritual list (default, --pending, --ticket, --deleted),
ritual create, ritual attest.
"""
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


class TestRitualList:
    """Tests for ritual list command."""

    def test_list_no_rituals(self, cli_runner):
        """ritual list with no rituals configured."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
            "completed_rituals": [],
        })
        client.get_rituals = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['ritual', 'list'])

        assert result.exit_code == 0
        assert 'No rituals configured' in result.output

    def test_list_with_ticket(self, cli_runner):
        """ritual list --ticket CHT-100 shows pending rituals for ticket."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123",
            "identifier": "CHT-100",
        })
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [
                {"name": "run-tests", "approval_mode": "auto", "prompt": "Run tests."},
            ],
        })

        result = cli_runner.invoke(cli, ['ritual', 'list', '--ticket', 'CHT-100'])

        assert result.exit_code == 0
        assert 'run-tests' in result.output
        assert 'CHT-100' in result.output

    def test_list_ticket_no_pending(self, cli_runner):
        """ritual list --ticket with no pending rituals shows green message."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123",
            "identifier": "CHT-100",
        })
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [],
        })

        result = cli_runner.invoke(cli, ['ritual', 'list', '--ticket', 'CHT-100'])

        assert result.exit_code == 0
        assert 'No pending rituals' in result.output

    def test_list_in_limbo(self, cli_runner):
        """ritual list shows limbo status with pending rituals."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": True,
            "pending_rituals": [
                {"name": "sprint-review", "approval_mode": "gate", "prompt": "Review sprint."},
            ],
            "completed_rituals": [],
        })
        client.get_rituals = MagicMock(return_value=[
            {"name": "sprint-review", "prompt": "Review sprint.", "trigger": "every_sprint",
             "approval_mode": "gate", "is_active": True},
        ])

        result = cli_runner.invoke(cli, ['ritual', 'list'])

        assert result.exit_code == 0
        assert 'limbo' in result.output.lower()

    def test_list_with_ticket_close_rituals(self, cli_runner):
        """ritual list shows ticket-close rituals section."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
            "completed_rituals": [],
        })
        client.get_rituals = MagicMock(return_value=[
            {"name": "run-tests", "prompt": "Run tests.", "trigger": "ticket_close",
             "approval_mode": "auto", "is_active": True},
        ])

        result = cli_runner.invoke(cli, ['ritual', 'list'])

        assert result.exit_code == 0
        assert 'Ticket-Close' in result.output
        assert 'run-tests' in result.output


class TestRitualAttest:
    """Tests for ritual attest command."""

    def test_attest_sprint_ritual(self, cli_runner):
        """ritual attest attests a sprint ritual."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[
            {"id": "ritual-uuid-1", "name": "sprint-review", "trigger": "every_sprint"},
        ])
        client.attest_ritual = MagicMock(return_value={})
        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
        })

        result = cli_runner.invoke(cli, [
            'ritual', 'attest', 'sprint-review', '--note', 'Done.',
        ])

        assert result.exit_code == 0
        assert 'attested' in result.output.lower()

    def test_attest_ticket_ritual(self, cli_runner):
        """ritual attest --ticket attests a ticket ritual."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[
            {"id": "ritual-uuid-1", "name": "run-tests", "trigger": "ticket_close"},
        ])
        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123", "identifier": "CHT-100",
        })
        client.attest_ritual_for_issue = MagicMock(return_value={})

        result = cli_runner.invoke(cli, [
            'ritual', 'attest', 'run-tests', '--ticket', 'CHT-100', '--note', 'Tests pass.',
        ])

        assert result.exit_code == 0
        assert 'attested' in result.output.lower()

    def test_attest_not_found(self, cli_runner):
        """ritual attest with unknown name shows error."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, [
            'ritual', 'attest', 'nonexistent', '--note', 'N/A',
        ])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()


class TestRitualCreate:
    """Tests for ritual create command."""

    def test_create_basic(self, cli_runner):
        """ritual create creates a ritual."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={"in_limbo": False})
        client.create_ritual = MagicMock(return_value={
            "id": "new-ritual-id",
            "name": "run-tests",
        })

        result = cli_runner.invoke(cli, [
            'ritual', 'create', 'run-tests', 'Run all tests.',
        ])

        assert result.exit_code == 0
        assert 'run-tests' in result.output
        assert 'created' in result.output.lower()

    def test_create_with_group(self, cli_runner):
        """ritual create --group assigns to group."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={"in_limbo": False})
        client.get_ritual_groups = MagicMock(return_value=[
            {"id": "group-1", "name": "reviews"},
        ])
        client.create_ritual = MagicMock(return_value={
            "id": "new-ritual-id",
            "name": "code-review",
        })

        result = cli_runner.invoke(cli, [
            'ritual', 'create', 'code-review', 'Review code.',
            '--group', 'reviews',
        ])

        assert result.exit_code == 0

    def test_create_group_not_found(self, cli_runner):
        """ritual create --group with unknown group shows error."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={"in_limbo": False})
        client.get_ritual_groups = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, [
            'ritual', 'create', 'test', 'Test prompt.',
            '--group', 'nonexistent',
        ])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()
