"""Registrar commands (CHT-1600, CHT-1499): `agent create --registrar`,
`agent update --registrar/--no-registrar`, `agent register`,
`config set-session-identity`, and what `auth whoami` / `agent list`
show about an agent's kind."""
import json
from unittest.mock import ANY, MagicMock, patch

import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


AGENTS = [
    {"id": "agent-aaaa-1111", "name": "Claude Code", "agent_project_id": None, "kind": "service",
     "can_register": True, "parent_user_name": "Ada", "created_at": "2026-10-01T00:00:00Z"},
    {"id": "agent-bbbb-2222", "name": "claude-bot", "agent_project_id": None, "kind": "assistant",
     "can_register": False, "parent_user_name": "Ada", "created_at": "2026-10-01T00:00:00Z"},
    {"id": "agent-cccc-3333", "name": "Claude Code · main · 4f2a9c", "agent_project_id": None,
     "kind": "session", "can_register": False, "parent_user_name": "Ada",
     "created_at": "2026-10-01T00:00:00Z"},
]


class TestAgentCreateRegistrar:
    def test_creates_a_registrar(self, cli_runner):
        from cli.main import cli, client
        client.create_team_agent = MagicMock(return_value={
            "id": "agent-1", "name": "Claude Code", "api_key": "ck_reg", "can_register": True,
        })
        result = cli_runner.invoke(cli, ["agent", "create", "Claude Code", "--registrar"])
        assert result.exit_code == 0, result.output
        client.create_team_agent.assert_called_once_with("test-team-123", "Claude Code", can_register=True)
        assert "team-scoped, registrar" in result.output
        assert "set-session-identity auto" in result.output

    def test_project_scoped_registrar(self, cli_runner):
        from cli.main import cli, client
        client.create_project_agent = MagicMock(return_value={
            "id": "agent-1", "name": "CI", "api_key": "ck_reg", "can_register": True,
        })
        result = cli_runner.invoke(cli, ["agent", "create", "CI", "--project", "--registrar"])
        assert result.exit_code == 0, result.output
        client.create_project_agent.assert_called_once_with("test-project-123", "CI", can_register=True)

    def test_plain_create_is_not_a_registrar(self, cli_runner):
        from cli.main import cli, client
        client.create_team_agent = MagicMock(return_value={"id": "a", "name": "bot", "api_key": "ck_x"})
        result = cli_runner.invoke(cli, ["agent", "create", "bot"])
        assert result.exit_code == 0
        client.create_team_agent.assert_called_once_with("test-team-123", "bot", can_register=False)
        assert "registrar" not in result.output

    def test_an_older_server_that_ignores_the_flag_is_reported(self, cli_runner):
        from cli.main import cli, client
        client.create_team_agent = MagicMock(return_value={"id": "a", "name": "bot", "api_key": "ck_x"})
        result = cli_runner.invoke(cli, ["agent", "create", "bot", "--registrar"])
        assert "did not make it a registrar" in result.output


class TestAgentUpdate:
    def test_turns_registrar_on(self, cli_runner):
        from cli.main import cli, client
        client.get_team_agents = MagicMock(return_value=AGENTS)
        client.update_agent = MagicMock(return_value={**AGENTS[1], "can_register": True})
        result = cli_runner.invoke(cli, ["agent", "update", "claude-bot", "--registrar"])
        assert result.exit_code == 0, result.output
        client.update_agent.assert_called_once_with("agent-bbbb-2222", can_register=True)
        assert "it is a registrar" in result.output

    def test_turns_registrar_off_and_renames(self, cli_runner):
        from cli.main import cli, client
        client.get_team_agents = MagicMock(return_value=AGENTS)
        client.update_agent = MagicMock(return_value={**AGENTS[0], "name": "Harness", "can_register": False})
        result = cli_runner.invoke(cli, ["agent", "update", "Claude Code", "--no-registrar", "--name", "Harness",
                                         "--json"])
        assert result.exit_code == 0, result.output
        client.update_agent.assert_called_once_with("agent-aaaa-1111", name="Harness", can_register=False)
        assert json.loads(result.output)["can_register"] is False

    def test_nothing_to_change(self, cli_runner):
        from cli.main import cli, client
        client.update_agent = MagicMock()
        result = cli_runner.invoke(cli, ["agent", "update", "claude-bot"])
        assert result.exit_code != 0
        assert "Nothing to change" in result.output
        client.update_agent.assert_not_called()

    def test_server_refusal_is_shown(self, cli_runner):
        from cli.main import APIError, cli, client
        client.get_team_agents = MagicMock(return_value=AGENTS)
        client.update_agent = MagicMock(side_effect=APIError(
            "A registered identity cannot be made a registrar: registration is one level deep."))
        result = cli_runner.invoke(cli, ["agent", "update", "agent-cccc", "--registrar"])
        assert result.exit_code == 1
        assert "registration is one" in result.output

    def test_an_unchanged_capability_is_an_error(self, cli_runner):
        from cli.main import cli, client
        client.get_team_agents = MagicMock(return_value=AGENTS)
        client.update_agent = MagicMock(return_value={**AGENTS[1]})  # server ignored it
        result = cli_runner.invoke(cli, ["agent", "update", "claude-bot", "--registrar"])
        assert result.exit_code != 0
        assert "did not change the registrar capability" in result.output


class TestAgentRegister:
    REGISTERED = {
        "agent": {"id": "sess-1234-5678", "name": "Claude Code · 0001", "kind": "session"},
        "created": True, "api_key": "ck_session", "api_key_id": "k1",
        "expires_at": "2026-10-21T00:00:00Z",
    }

    def test_registers_as_an_agent_registrar(self, cli_runner):
        from cli.main import cli, client
        client.get_me = MagicMock(return_value={"is_agent": True, "can_register": True})
        client.register_agent = MagicMock(return_value=self.REGISTERED)
        result = cli_runner.invoke(cli, ["agent", "register", "--ref", "claude-code:session:0001"])
        assert result.exit_code == 0, result.output
        client.register_agent.assert_called_once_with("claude-code:session:0001", name=None)
        assert "Registered session identity" in result.output
        assert "ck_session" in result.output
        assert "2026-10-21" in result.output

    def test_a_person_registers_in_the_current_team_with_a_project(self, cli_runner):
        from cli.main import cli, client
        client.get_me = MagicMock(return_value={"is_agent": False})
        client.register_agent = MagicMock(return_value={**self.REGISTERED, "created": False})
        with patch("cli.main.resolve_project_id", return_value="proj-1"):
            result = cli_runner.invoke(cli, ["agent", "register", "--ref", "r:1", "--name", "Mine",
                                             "--project", "CHT", "--json"])
        assert result.exit_code == 0, result.output
        client.register_agent.assert_called_once_with(
            "r:1", name="Mine", project_id="proj-1", team_id="test-team-123")
        assert json.loads(result.output)["api_key"] == "ck_session"

    def test_renewal_wording(self, cli_runner):
        from cli.main import cli, client
        client.get_me = MagicMock(return_value={"is_agent": True})
        client.register_agent = MagicMock(return_value={**self.REGISTERED, "created": False})
        result = cli_runner.invoke(cli, ["agent", "register", "--ref", "r:1"])
        assert "Renewed session identity" in result.output

    def test_a_person_without_a_team(self, cli_runner):
        from cli.main import cli, client
        client.get_me = MagicMock(return_value={"is_agent": False})
        client.register_agent = MagicMock()
        with patch("cli.main.get_current_team", return_value=None):
            result = cli_runner.invoke(cli, ["agent", "register", "--ref", "r:1"])
        assert result.exit_code == 1
        assert "No team selected" in result.output
        client.register_agent.assert_not_called()

    def test_runs_with_session_identity_suspended(self, cli_runner):
        from cli import session_identity
        from cli.main import cli, client
        seen = []
        client.get_me = MagicMock(side_effect=lambda: seen.append(session_identity.active_ref()) or {"is_agent": True})
        client.register_agent = MagicMock(return_value=self.REGISTERED)
        with patch.dict("os.environ", {"CHAOTIC_SESSION_IDENTITY": "auto", "CLAUDE_CODE_SESSION_ID": "abc"}):
            cli_runner.invoke(cli, ["agent", "register", "--ref", "r:1"])
        assert seen == [None]


class TestAgentListKind:
    def test_kind_column(self, cli_runner):
        from cli.main import cli, client
        client.get_team_agents = MagicMock(return_value=AGENTS)
        result = cli_runner.invoke(cli, ["agent", "list"])
        assert result.exit_code == 0
        assert "Kind" in result.output
        assert "registrar" in result.output and "session" in result.output


class TestAgentListIdle:
    """CHT-1501: idle session identities are hidden unless --all, and the
    rest are listed under their registrar."""

    ROWS = [
        {"id": "sess-1111", "name": "s-one", "agent_project_id": None, "kind": "session",
         "registered_by_id": "reg-aaaa", "parent_user_name": "Ada", "created_at": "2026-10-02T00:00:00Z"},
        {"id": "bot-bbbb", "name": "claude-bot", "agent_project_id": None, "kind": "assistant",
         "parent_user_name": "Ada", "created_at": "2026-10-01T00:00:00Z"},
        {"id": "reg-aaaa", "name": "Claude Code", "agent_project_id": None, "kind": "service",
         "can_register": True, "parent_user_name": "Ada", "created_at": "2026-10-01T00:00:00Z"},
        {"id": "sess-2222", "name": "s-two", "agent_project_id": None, "kind": "session",
         "registered_by_id": "gone-0000", "idle": True, "parent_user_name": "Ada",
         "created_at": "2026-10-01T00:00:00Z"},
    ]

    @pytest.mark.parametrize("args,hide_idle", [([], True), (["--all"], False)])
    def test_asks_the_server_to_hide_idle_unless_all(self, cli_runner, args, hide_idle):
        from cli.main import cli, client
        client.get_team_agents = MagicMock(return_value=[])
        result = cli_runner.invoke(cli, ["agent", "list", *args])
        assert result.exit_code == 0, result.output
        client.get_team_agents.assert_called_once_with(ANY, hide_idle=hide_idle)

    def test_sessions_are_nested_under_their_registrar(self, cli_runner):
        from cli.main import cli, client
        client.get_team_agents = MagicMock(return_value=self.ROWS)
        result = cli_runner.invoke(cli, ["agent", "list", "--all"])
        assert result.exit_code == 0, result.output
        lines = result.output.splitlines()
        at = {name: next(i for i, line in enumerate(lines) if name in line)
              for name in ("claude-bot", "Claude Code", "s-one", "s-two")}
        assert at["claude-bot"] < at["Claude Code"] < at["s-one"] < at["s-two"]
        assert "└ s-one" in lines[at["s-one"]]
        assert "└" not in lines[at["s-two"]] and "(idle)" in lines[at["s-two"]]


class TestWhoami:
    def test_session_identity(self, cli_runner):
        from cli.main import cli, client
        client.get_me = MagicMock(return_value={
            "name": "Claude Code · main · 4f2a9c", "email": "session-x@agent.local", "is_agent": True,
            "parent_user_name": "Ada", "kind": "session", "external_ref": "claude-code:session:4f2a9c",
            "registered_by_id": "reg-1", "registered_by_name": "Claude Code", "can_register": False,
        })
        result = cli_runner.invoke(cli, ["auth", "whoami"])
        assert result.exit_code == 0
        assert "Kind: session" in result.output
        assert "claude-code:session:4f2a9c" in result.output
        assert "Registered by: Claude Code" in result.output

    def test_registrar(self, cli_runner):
        from cli.main import cli, client
        client.get_me = MagicMock(return_value={
            "name": "Claude Code", "email": "a@agent.local", "is_agent": True, "kind": "service",
            "can_register": True,
        })
        result = cli_runner.invoke(cli, ["auth", "whoami"])
        assert "Kind: registrar" in result.output
        assert "Registered by" not in result.output

    def test_human_has_no_kind_line(self, cli_runner):
        from cli.main import cli, client
        client.get_me = MagicMock(return_value={"name": "Ada", "email": "ada@x", "is_agent": False})
        result = cli_runner.invoke(cli, ["auth", "whoami"])
        assert "Kind:" not in result.output


class TestConfigSessionIdentity:
    def test_set_and_show(self, cli_runner, tmp_path):
        from cli.main import cli
        with patch("cli.config.GLOBAL_CONFIG_DIR", tmp_path):
            result = cli_runner.invoke(cli, ["config", "set-session-identity", "auto"])
            assert result.exit_code == 0, result.output
            # The runner's profile is "default", which is config.json's alias.
            saved = json.loads((tmp_path / "default.json").read_text())
            assert saved["session_identity"] == "auto"
            shown = cli_runner.invoke(cli, ["config", "show", "--json"])
            assert json.loads(shown.output)["session_identity"] == "auto"
            cli_runner.invoke(cli, ["config", "set-session-identity", "off"])
            shown = cli_runner.invoke(cli, ["config", "show", "--json"])
            assert json.loads(shown.output)["session_identity"] == "off"

    def test_invalid_value_is_shown_not_crashed(self, cli_runner):
        from cli.main import cli
        with patch.dict("os.environ", {"CHAOTIC_SESSION_IDENTITY": "maybe"}):
            shown = cli_runner.invoke(cli, ["config", "show"])
        assert shown.exit_code == 0
        assert "invalid" in shown.output

    def test_rejects_other_values(self, cli_runner):
        from cli.main import cli
        result = cli_runner.invoke(cli, ["config", "set-session-identity", "on"])
        assert result.exit_code == 2
