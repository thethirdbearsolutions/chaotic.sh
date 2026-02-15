"""Tests for label and agent CLI commands (CHT-887).

Tests cover: label list, create, delete; agent create, list, delete.
"""
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


class TestLabelList:
    """Tests for label list command."""

    def test_label_list_shows_labels(self, cli_runner):
        """label list displays labels in a table."""
        from cli.main import cli, client

        client.get_labels = MagicMock(return_value=[
            {"id": "label-uuid-123456", "name": "bug", "color": "#ff0000"},
            {"id": "label-uuid-789012", "name": "feature", "color": "#00ff00"},
        ])

        result = cli_runner.invoke(cli, ['label', 'list'])

        assert result.exit_code == 0
        assert 'bug' in result.output
        assert 'feature' in result.output

    def test_label_list_no_labels(self, cli_runner):
        """label list with no labels shows message."""
        from cli.main import cli, client

        client.get_labels = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['label', 'list'])

        assert result.exit_code == 0
        assert 'No labels found' in result.output

    def test_label_list_json(self, cli_runner):
        """label list --json outputs JSON."""
        from cli.main import cli, client

        client.get_labels = MagicMock(return_value=[
            {"id": "label-uuid-123456", "name": "bug", "color": "#ff0000"},
        ])

        result = cli_runner.invoke(cli, ['label', 'list', '--json'])

        assert result.exit_code == 0
        assert 'bug' in result.output


class TestLabelCreate:
    """Tests for label create command."""

    def test_label_create_success(self, cli_runner):
        """label create creates a label."""
        from cli.main import cli, client

        client.create_label = MagicMock(return_value={
            "id": "new-label-id",
            "name": "urgent",
        })

        result = cli_runner.invoke(cli, ['label', 'create', 'urgent'])

        assert result.exit_code == 0
        assert 'urgent' in result.output
        assert 'created' in result.output.lower()

    def test_label_create_with_color(self, cli_runner):
        """label create --color sets color."""
        from cli.main import cli, client

        client.create_label = MagicMock(return_value={
            "id": "new-label-id",
            "name": "test",
        })

        result = cli_runner.invoke(cli, ['label', 'create', 'test', '--color', '#ff0000'])

        assert result.exit_code == 0
        call_kwargs = client.create_label.call_args[1]
        assert call_kwargs.get('color') == '#ff0000'


class TestLabelDelete:
    """Tests for label delete command."""

    def test_label_delete_with_confirmation(self, cli_runner):
        """label delete with confirmation deletes."""
        from cli.main import cli, client

        client.delete_label = MagicMock()

        with patch('cli.main.confirm_action', return_value=True), \
             patch('cli.main.resolve_label_id', return_value='label-uuid-123'):
            result = cli_runner.invoke(cli, ['label', 'delete', 'bug'])

        assert result.exit_code == 0
        assert 'deleted' in result.output.lower()
        client.delete_label.assert_called_once_with('label-uuid-123')

    def test_label_delete_declined(self, cli_runner):
        """label delete declined does not delete."""
        from cli.main import cli, client

        client.delete_label = MagicMock()

        with patch('cli.main.confirm_action', return_value=False):
            result = cli_runner.invoke(cli, ['label', 'delete', 'bug'])

        client.delete_label.assert_not_called()


class TestAgentCreate:
    """Tests for agent create command."""

    def test_agent_create_team_scoped(self, cli_runner):
        """agent create creates team-scoped agent."""
        from cli.main import cli, client

        client.create_team_agent = MagicMock(return_value={
            "id": "agent-uuid-123",
            "name": "claude-bot",
            "api_key": "secret-key-abc",
        })

        result = cli_runner.invoke(cli, ['agent', 'create', 'claude-bot'])

        assert result.exit_code == 0
        assert 'claude-bot' in result.output
        assert 'secret-key-abc' in result.output
        assert 'team-scoped' in result.output

    def test_agent_create_project_scoped(self, cli_runner):
        """agent create --project creates project-scoped agent."""
        from cli.main import cli, client

        client.create_project_agent = MagicMock(return_value={
            "id": "agent-uuid-123",
            "name": "ci-bot",
            "api_key": "secret-key-def",
        })

        result = cli_runner.invoke(cli, ['agent', 'create', 'ci-bot', '--project'])

        assert result.exit_code == 0
        assert 'ci-bot' in result.output
        assert 'project-scoped' in result.output

    def test_agent_create_project_no_project_selected(self, cli_runner):
        """agent create --project with no project selected shows error."""
        from cli.main import cli

        with patch('cli.main.get_current_project', return_value=None):
            result = cli_runner.invoke(cli, ['agent', 'create', 'ci-bot', '--project'])

        assert result.exit_code != 0
        assert 'No project selected' in result.output


class TestAgentList:
    """Tests for agent list command."""

    def test_agent_list_shows_agents(self, cli_runner):
        """agent list displays agents in a table."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {
                "id": "agent-uuid-123456789",
                "name": "claude-bot",
                "agent_project_id": None,
                "parent_user_name": "Alice",
                "created_at": "2026-02-10T12:00:00",
            },
        ])

        result = cli_runner.invoke(cli, ['agent', 'list'])

        assert result.exit_code == 0
        assert 'claude-bot' in result.output
        assert 'Alice' in result.output

    def test_agent_list_no_agents(self, cli_runner):
        """agent list with no agents shows message."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['agent', 'list'])

        assert result.exit_code == 0
        assert 'No agents found' in result.output

    def test_agent_list_json(self, cli_runner):
        """agent list --json outputs JSON."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {
                "id": "agent-uuid-123",
                "name": "claude-bot",
                "agent_project_id": None,
                "parent_user_name": "Alice",
                "created_at": "2026-02-10T12:00:00",
            },
        ])

        result = cli_runner.invoke(cli, ['agent', 'list', '--json'])

        assert result.exit_code == 0
        assert 'claude-bot' in result.output


class TestAgentDelete:
    """Tests for agent delete command."""

    def test_agent_delete_with_confirmation(self, cli_runner):
        """agent delete with confirmation deletes."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123", "name": "claude-bot"},
        ])
        client.delete_agent = MagicMock()

        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['agent', 'delete', 'agent-uuid-123'])

        assert result.exit_code == 0
        assert 'deleted' in result.output.lower()
        client.delete_agent.assert_called_once_with('agent-uuid-123')

    def test_agent_delete_prefix_match(self, cli_runner):
        """agent delete with ID prefix matches."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123456789", "name": "claude-bot"},
        ])
        client.delete_agent = MagicMock()

        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['agent', 'delete', 'agent-uuid'])

        assert result.exit_code == 0
        client.delete_agent.assert_called_once_with('agent-uuid-123456789')

    def test_agent_delete_ambiguous_prefix(self, cli_runner):
        """agent delete with ambiguous prefix shows error."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123", "name": "bot-1"},
            {"id": "agent-uuid-456", "name": "bot-2"},
        ])

        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['agent', 'delete', 'agent-uuid'])

        assert result.exit_code != 0
        assert 'Ambiguous' in result.output

    def test_agent_delete_not_found(self, cli_runner):
        """agent delete with unknown ID shows error."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[])

        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['agent', 'delete', 'nonexistent'])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()
