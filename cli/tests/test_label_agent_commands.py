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


class TestAgentKeysCreate:
    """Tests for agent keys create command (CHT-1303)."""

    def test_agent_keys_create_by_id(self, cli_runner):
        """agent keys create with a full agent ID mints a new key."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123", "name": "claude-bot"},
        ])
        client.create_agent_key = MagicMock(return_value={
            "id": "key-uuid-1",
            "key": "ck_newsecretkey",
        })

        result = cli_runner.invoke(cli, ['agent', 'keys', 'create', 'agent-uuid-123'])

        assert result.exit_code == 0
        assert 'claude-bot' in result.output
        assert 'ck_newsecretkey' in result.output
        client.create_agent_key.assert_called_once_with('agent-uuid-123')

    def test_agent_keys_create_by_name(self, cli_runner):
        """agent keys create resolves agent by exact name."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123", "name": "claude-bot"},
        ])
        client.create_agent_key = MagicMock(return_value={
            "id": "key-uuid-1",
            "key": "ck_newsecretkey",
        })

        result = cli_runner.invoke(cli, ['agent', 'keys', 'create', 'claude-bot'])

        assert result.exit_code == 0
        assert 'ck_newsecretkey' in result.output
        client.create_agent_key.assert_called_once_with('agent-uuid-123')

    def test_agent_keys_create_by_prefix(self, cli_runner):
        """agent keys create with an ID prefix matches."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123456789", "name": "claude-bot"},
        ])
        client.create_agent_key = MagicMock(return_value={
            "id": "key-uuid-1",
            "key": "ck_newsecretkey",
        })

        result = cli_runner.invoke(cli, ['agent', 'keys', 'create', 'agent-uuid'])

        assert result.exit_code == 0
        client.create_agent_key.assert_called_once_with('agent-uuid-123456789')

    def test_agent_keys_create_ambiguous(self, cli_runner):
        """agent keys create with an ambiguous identifier shows error."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123", "name": "bot-1"},
            {"id": "agent-uuid-456", "name": "bot-2"},
        ])

        result = cli_runner.invoke(cli, ['agent', 'keys', 'create', 'agent-uuid'])

        assert result.exit_code != 0
        assert 'Ambiguous' in result.output

    def test_agent_keys_create_not_found(self, cli_runner):
        """agent keys create with an unknown identifier shows error."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['agent', 'keys', 'create', 'nonexistent'])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()


class TestAgentKeysListRevoke:
    """agent keys list / revoke (CHT-1508)."""

    _KEYS = [
        {"id": "key-aaaa-1", "name": "Key for claude-bot", "key_prefix": "ck_aaaa", "owner_id": "u1",
         "owner_name": "Carol", "self_minted": False, "is_active": True,
         "created_at": "2026-10-01T00:00:00Z", "last_used_at": None},
        {"id": "key-bbbb-2", "name": "self", "key_prefix": "ck_bbbb", "owner_id": "agent-uuid-123",
         "owner_name": "claude-bot", "self_minted": True, "is_active": False,
         "created_at": "2026-10-02T00:00:00Z", "last_used_at": "2026-10-03T00:00:00Z"},
    ]

    def _setup(self):
        from cli.main import client

        client.get_team_agents = MagicMock(return_value=[{"id": "agent-uuid-123", "name": "claude-bot"}])
        client.list_agent_keys = MagicMock(return_value=self._KEYS)
        client.revoke_api_key = MagicMock(return_value=None)
        return client

    def test_list_shows_holder_and_self(self, cli_runner):
        from cli.main import cli

        client = self._setup()
        result = cli_runner.invoke(cli, ['agent', 'keys', 'list', 'claude-bot'])

        assert result.exit_code == 0, result.output
        assert 'Carol' in result.output and '(self)' in result.output
        client.list_agent_keys.assert_called_once_with('agent-uuid-123')

    def test_list_json(self, cli_runner):
        import json
        from cli.main import cli

        self._setup()
        result = cli_runner.invoke(cli, ['--json', 'agent', 'keys', 'list', 'claude-bot'])

        assert result.exit_code == 0, result.output
        assert [k["id"] for k in json.loads(result.output)] == ["key-aaaa-1", "key-bbbb-2"]

    def test_list_empty(self, cli_runner):
        from cli.main import cli, client

        self._setup()
        client.list_agent_keys = MagicMock(return_value=[])
        result = cli_runner.invoke(cli, ['agent', 'keys', 'list', 'claude-bot'])

        assert result.exit_code == 0
        assert 'no API keys' in result.output

    def test_revoke_by_prefix(self, cli_runner):
        from cli.main import cli

        client = self._setup()
        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['agent', 'keys', 'revoke', 'claude-bot', 'key-bbbb'])

        assert result.exit_code == 0, result.output
        client.revoke_api_key.assert_called_once_with('key-bbbb-2')

    def test_revoke_declined(self, cli_runner):
        from cli.main import cli

        client = self._setup()
        with patch('cli.main.confirm_action', return_value=False):
            result = cli_runner.invoke(cli, ['agent', 'keys', 'revoke', 'claude-bot', 'key-aaaa'])

        assert result.exit_code == 0
        client.revoke_api_key.assert_not_called()

    def test_revoke_ambiguous_unknown_and_empty(self, cli_runner):
        from cli.main import cli

        client = self._setup()
        for ref, expected in (('key-', 'Ambiguous'), ('nope', 'has no key'), ('  ', 'must not be empty')):
            result = cli_runner.invoke(cli, ['agent', 'keys', 'revoke', 'claude-bot', ref])
            assert result.exit_code != 0
            assert expected in result.output
        client.revoke_api_key.assert_not_called()


class TestAgentDeactivate:
    """Tests for agent deactivate command (CHT-1494)."""

    def test_agent_deactivate_by_name(self, cli_runner):
        """agent deactivate resolves the agent by name and deactivates it."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123", "name": "claude-bot"},
        ])
        client.deactivate_agent = MagicMock(return_value={
            "id": "agent-uuid-123", "name": "claude-bot", "is_active": False,
        })

        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['agent', 'deactivate', 'claude-bot'])

        assert result.exit_code == 0, result.output
        assert 'deactivated' in result.output
        client.deactivate_agent.assert_called_once_with('agent-uuid-123')

    def test_agent_deactivate_declined(self, cli_runner):
        """Declining the confirmation deactivates nothing."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123", "name": "claude-bot"},
        ])
        client.deactivate_agent = MagicMock()

        with patch('cli.main.confirm_action', return_value=False):
            result = cli_runner.invoke(cli, ['agent', 'deactivate', 'agent-uuid'])

        assert result.exit_code == 0
        client.deactivate_agent.assert_not_called()

    def test_agent_deactivate_json(self, cli_runner):
        """agent deactivate --json prints the agent as JSON."""
        import json
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123", "name": "claude-bot"},
        ])
        client.deactivate_agent = MagicMock(return_value={
            "id": "agent-uuid-123", "name": "claude-bot", "is_active": False,
        })

        with patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['agent', 'deactivate', 'claude-bot', '--json'])

        assert result.exit_code == 0, result.output
        assert json.loads(result.output)["is_active"] is False

    def test_agent_deactivate_ambiguous(self, cli_runner):
        """An ambiguous identifier deactivates nothing."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123", "name": "bot-1"},
            {"id": "agent-uuid-456", "name": "bot-2"},
        ])
        client.deactivate_agent = MagicMock()

        result = cli_runner.invoke(cli, ['agent', 'deactivate', 'agent-uuid'])

        assert result.exit_code != 0
        assert 'Ambiguous' in result.output
        client.deactivate_agent.assert_not_called()

    def test_agent_deactivate_not_found(self, cli_runner):
        """An unknown identifier shows an error."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['agent', 'deactivate', 'nonexistent'])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()

    def test_agent_deactivate_json_without_yes_refuses(self, cli_runner):
        """Under --json without --yes the confirmation can't be answered:
        exit 2 with a JSON error, and nothing is deactivated."""
        import json
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123", "name": "claude-bot"},
        ])
        client.deactivate_agent = MagicMock()

        result = cli_runner.invoke(cli, ['agent', 'deactivate', 'claude-bot', '--json'])

        assert result.exit_code == 2, result.output
        assert "error" in json.loads(result.output)
        client.deactivate_agent.assert_not_called()

    @pytest.mark.parametrize("command", [
        ['agent', 'deactivate'],
        ['agent', 'reactivate'],
        ['agent', 'delete'],
        ['agent', 'keys', 'create'],
    ])
    @pytest.mark.parametrize("ref", ["", "   "])
    def test_empty_identifier_is_refused(self, cli_runner, command, ref):
        """An empty ID prefix would match every agent (CHT-1494)."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123", "name": "claude-bot"},
        ])
        client.deactivate_agent = MagicMock()
        client.reactivate_agent = MagicMock()
        client.delete_agent = MagicMock()
        client.create_agent_key = MagicMock()

        result = cli_runner.invoke(cli, ['--yes', *command, ref])

        assert result.exit_code == 1, result.output
        assert 'must not be empty' in result.output
        client.deactivate_agent.assert_not_called()
        client.reactivate_agent.assert_not_called()
        client.delete_agent.assert_not_called()
        client.create_agent_key.assert_not_called()

    def test_agent_list_marks_deactivated(self, cli_runner):
        """agent list marks a deactivated agent."""
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {
                "id": "agent-uuid-123456789",
                "name": "old-bot",
                "is_active": False,
                "agent_project_id": None,
                "parent_user_name": "Alice",
                "created_at": "2026-02-10T12:00:00",
            },
        ])

        result = cli_runner.invoke(cli, ['agent', 'list'])

        assert result.exit_code == 0
        assert 'deactivated' in result.output


class TestAgentReactivate:
    """Tests for agent reactivate command (CHT-1494)."""

    def test_agent_reactivate_by_prefix(self, cli_runner):
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123", "name": "claude-bot", "is_active": False},
        ])
        client.reactivate_agent = MagicMock(return_value={
            "id": "agent-uuid-123", "name": "claude-bot", "is_active": True,
        })

        result = cli_runner.invoke(cli, ['agent', 'reactivate', 'agent-uuid'])

        assert result.exit_code == 0, result.output
        assert 'reactivated' in result.output
        assert 'chaotic agent keys create agent-uuid-123' in result.output
        client.reactivate_agent.assert_called_once_with('agent-uuid-123')

    def test_agent_reactivate_json(self, cli_runner):
        import json
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[
            {"id": "agent-uuid-123", "name": "claude-bot", "is_active": False},
        ])
        client.reactivate_agent = MagicMock(return_value={
            "id": "agent-uuid-123", "name": "claude-bot", "is_active": True,
        })

        result = cli_runner.invoke(cli, ['agent', 'reactivate', 'claude-bot', '--json'])

        assert result.exit_code == 0, result.output
        assert json.loads(result.output)["is_active"] is True

    def test_agent_reactivate_not_found(self, cli_runner):
        from cli.main import cli, client

        client.get_team_agents = MagicMock(return_value=[])
        client.reactivate_agent = MagicMock()

        result = cli_runner.invoke(cli, ['agent', 'reactivate', 'nope'])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()
        client.reactivate_agent.assert_not_called()
