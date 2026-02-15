"""Tests for ritual CRUD and ritual group commands (CHT-887).

Tests cover: ritual update, delete, restore, approve, complete, force-clear,
ritual group list, create, update, delete.
"""
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def mock_ritual():
    """Standard ritual for testing."""
    return {
        "id": "ritual-uuid-123",
        "name": "sprint-report",
        "prompt": "Write a report.",
        "approval_mode": "auto",
        "trigger": "every_sprint",
        "is_active": True,
    }


class TestRitualUpdate:
    """Tests for ritual update command."""

    def test_update_prompt(self, cli_runner, mock_ritual):
        """ritual update --prompt changes prompt."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])
        client.update_ritual = MagicMock(return_value={"name": "sprint-report"})

        result = cli_runner.invoke(cli, [
            'ritual', 'update', 'sprint-report', '--prompt', 'New prompt.',
        ])

        assert result.exit_code == 0
        assert 'updated' in result.output.lower()
        client.update_ritual.assert_called_once_with('ritual-uuid-123', prompt='New prompt.')

    def test_update_name(self, cli_runner, mock_ritual):
        """ritual update --name renames ritual."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])
        client.update_ritual = MagicMock(return_value={"name": "new-name"})

        result = cli_runner.invoke(cli, [
            'ritual', 'update', 'sprint-report', '--name', 'new-name',
        ])

        assert result.exit_code == 0
        client.update_ritual.assert_called_once_with('ritual-uuid-123', name='new-name')

    def test_update_mode(self, cli_runner, mock_ritual):
        """ritual update --mode changes approval mode."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])
        client.update_ritual = MagicMock(return_value={"name": "sprint-report"})

        result = cli_runner.invoke(cli, [
            'ritual', 'update', 'sprint-report', '--mode', 'gate',
        ])

        assert result.exit_code == 0
        client.update_ritual.assert_called_once_with('ritual-uuid-123', approval_mode='gate')

    def test_update_not_found(self, cli_runner):
        """ritual update with unknown name shows error."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, [
            'ritual', 'update', 'nonexistent', '--prompt', 'new',
        ])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()

    def test_update_no_options(self, cli_runner, mock_ritual):
        """ritual update with no changes shows error."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])

        result = cli_runner.invoke(cli, ['ritual', 'update', 'sprint-report'])

        assert result.exit_code != 0
        assert 'No changes' in result.output

    def test_update_conditions_json(self, cli_runner, mock_ritual):
        """ritual update --conditions parses JSON."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])
        client.update_ritual = MagicMock(return_value={"name": "sprint-report"})

        result = cli_runner.invoke(cli, [
            'ritual', 'update', 'sprint-report', '--conditions', '{"estimate__gte": 3}',
        ])

        assert result.exit_code == 0
        client.update_ritual.assert_called_once_with(
            'ritual-uuid-123', conditions={"estimate__gte": 3},
        )

    def test_update_conditions_invalid_json(self, cli_runner, mock_ritual):
        """ritual update --conditions with invalid JSON shows error."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])

        result = cli_runner.invoke(cli, [
            'ritual', 'update', 'sprint-report', '--conditions', 'not-json',
        ])

        assert result.exit_code != 0
        assert 'Invalid JSON' in result.output


class TestRitualDelete:
    """Tests for ritual delete command."""

    def test_delete_with_yes_flag(self, cli_runner, mock_ritual):
        """ritual delete -y deletes without confirmation."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])
        client.delete_ritual = MagicMock()

        result = cli_runner.invoke(cli, ['ritual', 'delete', 'sprint-report', '-y'])

        assert result.exit_code == 0
        assert 'deleted' in result.output.lower()
        client.delete_ritual.assert_called_once_with('ritual-uuid-123')

    def test_delete_not_found(self, cli_runner):
        """ritual delete with unknown name shows error."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['ritual', 'delete', 'nonexistent', '-y'])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()

    def test_delete_with_confirmation(self, cli_runner, mock_ritual):
        """ritual delete with confirmation prompt."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])
        client.delete_ritual = MagicMock()

        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['ritual', 'delete', 'sprint-report'])

        assert result.exit_code == 0
        client.delete_ritual.assert_called_once()


class TestRitualRestore:
    """Tests for ritual restore command."""

    def test_restore_inactive_ritual(self, cli_runner):
        """ritual restore reactivates deleted ritual."""
        from cli.main import cli, client

        inactive_ritual = {
            "id": "ritual-uuid-123",
            "name": "deleted-ritual",
            "is_active": False,
        }
        client.get_rituals = MagicMock(return_value=[inactive_ritual])
        client.update_ritual = MagicMock()

        result = cli_runner.invoke(cli, ['ritual', 'restore', 'deleted-ritual'])

        assert result.exit_code == 0
        assert 'restored' in result.output.lower()
        client.update_ritual.assert_called_once_with('ritual-uuid-123', is_active=True)

    def test_restore_already_active(self, cli_runner, mock_ritual):
        """ritual restore on already active ritual shows message."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])

        result = cli_runner.invoke(cli, ['ritual', 'restore', 'sprint-report'])

        assert result.exit_code == 0
        assert 'already active' in result.output.lower()

    def test_restore_not_found(self, cli_runner):
        """ritual restore with unknown name shows error."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['ritual', 'restore', 'nonexistent'])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()


class TestRitualApprove:
    """Tests for ritual approve command."""

    def test_approve_clears_limbo(self, cli_runner, mock_ritual):
        """ritual approve clears limbo when last ritual."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])
        client.approve_ritual = MagicMock(return_value={})
        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
        })

        result = cli_runner.invoke(cli, ['ritual', 'approve', 'sprint-report'])

        assert result.exit_code == 0
        assert 'approved' in result.output.lower()
        assert 'Limbo complete' in result.output

    def test_approve_more_remaining(self, cli_runner, mock_ritual):
        """ritual approve with more rituals pending."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])
        client.approve_ritual = MagicMock(return_value={})
        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": True,
            "pending_rituals": [{"name": "other-ritual"}],
        })

        result = cli_runner.invoke(cli, ['ritual', 'approve', 'sprint-report'])

        assert result.exit_code == 0
        assert '1 remaining' in result.output

    def test_approve_not_found(self, cli_runner):
        """ritual approve with unknown name shows error."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['ritual', 'approve', 'nonexistent'])

        assert result.exit_code != 0


class TestRitualComplete:
    """Tests for ritual complete command."""

    def test_complete_sprint_ritual(self, cli_runner, mock_ritual):
        """ritual complete for sprint ritual."""
        from cli.main import cli, client

        client.get_rituals = MagicMock(return_value=[mock_ritual])
        client.complete_gate_ritual = MagicMock(return_value={})
        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
        })

        result = cli_runner.invoke(cli, [
            'ritual', 'complete', 'sprint-report', '--note', 'Done',
        ])

        assert result.exit_code == 0
        assert 'completed' in result.output.lower()

    def test_complete_ticket_ritual_requires_ticket(self, cli_runner):
        """ritual complete for ticket ritual without --ticket shows error."""
        from cli.main import cli, client

        ticket_ritual = {
            "id": "ritual-uuid-456",
            "name": "run-tests",
            "trigger": "ticket_close",
        }
        client.get_rituals = MagicMock(return_value=[ticket_ritual])

        result = cli_runner.invoke(cli, ['ritual', 'complete', 'run-tests'])

        assert result.exit_code != 0
        assert '--ticket' in result.output

    def test_complete_ticket_ritual_with_ticket(self, cli_runner):
        """ritual complete for ticket ritual with --ticket succeeds."""
        from cli.main import cli, client

        ticket_ritual = {
            "id": "ritual-uuid-456",
            "name": "design-review",
            "trigger": "ticket_close",
        }
        client.get_rituals = MagicMock(return_value=[ticket_ritual])
        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123", "identifier": "CHT-100",
        })
        client.complete_gate_ritual_for_issue = MagicMock(return_value={})

        result = cli_runner.invoke(cli, [
            'ritual', 'complete', 'design-review', '--ticket', 'CHT-100', '--note', 'Approved',
        ])

        assert result.exit_code == 0
        assert 'completed' in result.output.lower()
        assert 'CHT-100' in result.output


class TestRitualForceClear:
    """Tests for ritual force-clear command."""

    def test_force_clear_with_yes(self, cli_runner):
        """ritual force-clear -y clears limbo."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": True,
            "pending_rituals": [{"name": "r1"}, {"name": "r2"}],
        })
        client.force_clear_limbo = MagicMock(return_value={
            "next_sprint_name": "Sprint 46",
        })

        result = cli_runner.invoke(cli, ['ritual', 'force-clear', '-y'])

        assert result.exit_code == 0
        assert 'Sprint 46' in result.output
        assert 'cleared' in result.output.lower()

    def test_force_clear_not_in_limbo(self, cli_runner):
        """ritual force-clear when not in limbo shows message."""
        from cli.main import cli, client

        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": False,
            "pending_rituals": [],
        })

        result = cli_runner.invoke(cli, ['ritual', 'force-clear', '-y'])

        assert result.exit_code == 0
        assert 'not in limbo' in result.output.lower()


class TestRitualGroupList:
    """Tests for ritual group list command."""

    def test_group_list_shows_groups(self, cli_runner):
        """ritual group list displays groups."""
        from cli.main import cli, client

        client.get_ritual_groups = MagicMock(return_value=[
            {"id": "group-1", "name": "mindfulness", "selection_mode": "random_one"},
        ])
        client.get_rituals = MagicMock(return_value=[
            {"name": "meditation", "group_id": "group-1", "weight": 2.0},
        ])

        result = cli_runner.invoke(cli, ['ritual', 'group', 'list'])

        assert result.exit_code == 0
        assert 'mindfulness' in result.output
        assert 'meditation' in result.output

    def test_group_list_empty(self, cli_runner):
        """ritual group list with no groups shows message."""
        from cli.main import cli, client

        client.get_ritual_groups = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['ritual', 'group', 'list'])

        assert result.exit_code == 0
        assert 'No ritual groups' in result.output


class TestRitualGroupCreate:
    """Tests for ritual group create command."""

    def test_group_create_default_mode(self, cli_runner):
        """ritual group create uses random_one by default."""
        from cli.main import cli, client

        client.create_ritual_group = MagicMock(return_value={
            "name": "my-group",
        })

        result = cli_runner.invoke(cli, ['ritual', 'group', 'create', 'my-group'])

        assert result.exit_code == 0
        assert 'created' in result.output.lower()
        client.create_ritual_group.assert_called_once()

    def test_group_create_percentage_mode(self, cli_runner):
        """ritual group create --mode percentage."""
        from cli.main import cli, client

        client.create_ritual_group = MagicMock(return_value={
            "name": "pct-group",
        })

        result = cli_runner.invoke(cli, [
            'ritual', 'group', 'create', 'pct-group', '--mode', 'percentage',
        ])

        assert result.exit_code == 0
