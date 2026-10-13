"""`chaotic auth connections list|revoke` (CHT-1523): your own OAuth
connections, the "Connected apps" page's CLI."""
import json
from unittest.mock import MagicMock, patch

import pytest

from cli.client import Client

CONNECTION = {
    "id": "3f1c2b9a-0000-4000-8000-000000000001",
    "client_id": "https://claude.ai/oauth/claude-client-metadata",
    "client_name": "Claude",
    "agent": {"id": "a-1", "name": "Claude (Ethan)", "kind": None},
    "team_id": "t-1",
    "team_name": "Chaotic",
    "project_ids": None,
    "policy": "write",
    "scopes": ["chaotic:write", "offline_access"],
    "created_at": "2026-10-13T12:00:00Z",
    "last_used_at": "2026-10-13T13:00:00Z",
    "last_refreshed_at": None,
    "idle_expires_at": "2026-11-12T12:00:00Z",
    "absolute_expires_at": "2027-01-11T12:00:00Z",
}
OTHER = {**CONNECTION, "id": "3f1c2b9a-0000-4000-8000-000000000002", "client_name": None,
         "project_ids": ["p-1", "p-2"], "last_used_at": None}


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


class TestList:
    def test_table(self, cli_runner):
        from cli.main import cli, client

        client.list_connections = MagicMock(return_value=[CONNECTION, OTHER])
        result = cli_runner.invoke(cli, ["auth", "connections", "list"])
        assert result.exit_code == 0, result.output
        assert "Claude" in result.output and "Chaotic" in result.output
        assert "3f1c2b9a" in result.output
        assert "all" in result.output and "2" in result.output

    def test_empty(self, cli_runner):
        from cli.main import cli, client

        client.list_connections = MagicMock(return_value=[])
        result = cli_runner.invoke(cli, ["auth", "connections", "list"])
        assert result.exit_code == 0
        assert "No connected apps" in result.output

    def test_json(self, cli_runner):
        from cli.main import cli, client

        client.list_connections = MagicMock(return_value=[CONNECTION])
        result = cli_runner.invoke(cli, ["auth", "connections", "list", "--json"])
        assert result.exit_code == 0
        assert json.loads(result.stdout) == [CONNECTION]


class TestRevoke:
    def test_by_full_id(self, cli_runner):
        from cli.main import cli, client

        client.list_connections = MagicMock(return_value=[CONNECTION, OTHER])
        client.revoke_connection = MagicMock()
        with patch("cli.main.confirm_action", return_value=True):
            result = cli_runner.invoke(cli, ["auth", "connections", "revoke", OTHER["id"]])
        assert result.exit_code == 0, result.output
        client.revoke_connection.assert_called_once_with(OTHER["id"])
        assert "Disconnected" in result.output

    def test_by_unique_prefix(self, cli_runner):
        from cli.main import cli, client

        client.list_connections = MagicMock(return_value=[CONNECTION])
        client.revoke_connection = MagicMock()
        with patch("cli.main.confirm_action", return_value=True):
            result = cli_runner.invoke(cli, ["auth", "connections", "revoke", "3f1c"])
        assert result.exit_code == 0, result.output
        client.revoke_connection.assert_called_once_with(CONNECTION["id"])

    def test_ambiguous_prefix(self, cli_runner):
        from cli.main import cli, client

        client.list_connections = MagicMock(return_value=[CONNECTION, OTHER])
        client.revoke_connection = MagicMock()
        result = cli_runner.invoke(cli, ["auth", "connections", "revoke", "3f1c"])
        assert result.exit_code == 1
        assert "Ambiguous" in result.output
        client.revoke_connection.assert_not_called()

    def test_not_found(self, cli_runner):
        from cli.main import cli, client

        client.list_connections = MagicMock(return_value=[CONNECTION])
        client.revoke_connection = MagicMock()
        result = cli_runner.invoke(cli, ["auth", "connections", "revoke", "nope"])
        assert result.exit_code == 1
        assert "not found" in result.output
        client.revoke_connection.assert_not_called()

    def test_declined(self, cli_runner):
        from cli.main import cli, client

        client.list_connections = MagicMock(return_value=[CONNECTION])
        client.revoke_connection = MagicMock()
        with patch("cli.main.confirm_action", return_value=False):
            result = cli_runner.invoke(cli, ["auth", "connections", "revoke", CONNECTION["id"]])
        assert result.exit_code == 0
        client.revoke_connection.assert_not_called()


class TestClientRoutes:
    def test_routes(self):
        with patch.object(Client, "_request", return_value=None) as sent:
            Client().list_connections()
            assert sent.call_args.args == ("GET", "/oauth/connections")
            Client().revoke_connection("c1")
            assert sent.call_args.args == ("DELETE", "/oauth/connections/c1")
