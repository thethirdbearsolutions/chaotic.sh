"""RestBackend (cli/src/cli/mcp_backend.py): the stdio server's adapter
over the CLI client (CHT-1374).

The shared tool bodies are tested once in test_mcp_tools_shared.py against
a fake backend; test_mcp_server.py drives the bound tools end to end
against a mocked client. This file pins what is specific to THIS
adapter: how it resolves scope from the CLI profile, how it translates
the client's failure modes into the shared exception types, and that
blocking client calls run off the event loop.
"""
import threading
from unittest.mock import MagicMock

import click
import httpx
import pytest

from chaotic_mcp_tools import BackendError, ToolInputError, TransportError
from cli.client import APIError


@pytest.fixture(autouse=True)
def _deps(patched_auth, patched_project):
    yield


@pytest.fixture
def backend():
    import cli.main  # noqa: F401 - ensure cli.main (and its client) is loaded
    from cli.mcp_backend import RestBackend
    return RestBackend()


class TestScope:
    def test_no_team_parameter_advertised(self, backend):
        assert backend.capabilities.team_param is False

    async def test_resolve_team_ignores_the_http_only_argument(self, backend):
        assert await backend.resolve_team("some-other-team") == "test-team-123"

    async def test_resolve_project_uses_the_profile_default(self, backend):
        assert await backend.resolve_project(None, None) == ("test-project-123", "test-team-123")

    async def test_resolve_project_explicit_goes_through_the_cli_resolver(self, backend, monkeypatch):
        monkeypatch.setattr("cli.main.resolve_project_id", lambda v: f"resolved-{v}")
        assert await backend.resolve_project("KEY", None) == ("resolved-KEY", "test-team-123")

    async def test_resolve_project_without_a_default_is_an_input_error(self, backend, monkeypatch):
        from cli.main import client
        # A person's key, not a project-scoped agent's (CHT-1690).
        monkeypatch.setattr(client, "get_me", MagicMock(return_value={"id": "u-1", "is_agent": False}))
        monkeypatch.setattr("cli.main.get_current_project", lambda: None)
        with pytest.raises(ToolInputError, match="No project selected"):
            await backend.resolve_project(None, None)

    async def test_optional_project_without_a_default_means_team_wide(self, backend, monkeypatch):
        """The stdio-specific answer: a profile with no current project
        widens to the team instead of erroring (the HTTP adapter has no
        profile and behaves like resolve_project)."""
        from cli.main import client
        # A person's key, not a project-scoped agent's (CHT-1690).
        monkeypatch.setattr(client, "get_me", MagicMock(return_value={"id": "u-1", "is_agent": False}))
        monkeypatch.setattr("cli.main.get_current_project", lambda: None)
        assert await backend.optional_project(None, None) == (None, "test-team-123")

    async def test_optional_project_explicit_goes_through_the_cli_resolver(self, backend, monkeypatch):
        monkeypatch.setattr("cli.main.resolve_project_id", lambda v: f"resolved-{v}")
        assert await backend.optional_project("KEY", None) == ("resolved-KEY", "test-team-123")

    async def test_team_for_the_current_project_is_the_profile_team(self, backend, monkeypatch):
        from cli.main import client
        monkeypatch.setattr(client, "get_project", MagicMock())
        assert await backend.team_for_project("test-project-123") == "test-team-123"
        assert await backend.team_for_project(None) == "test-team-123"
        client.get_project.assert_not_called()

    async def test_team_for_another_project_is_that_projects_team(self, backend, monkeypatch):
        """CHT-1951: a `project` argument or a parent can name a project in
        another team the key sees; names are looked up there."""
        from cli.main import client
        monkeypatch.setattr(client, "get_project", MagicMock(return_value={"id": "p-b", "team_id": "team-b"}))
        assert await backend.team_for_project("p-b") == "team-b"
        client.get_project.assert_called_once_with("p-b")

    async def test_resolve_named_team(self, backend, monkeypatch):
        """CHT-1951: a `team` hint is checked against a real lookup, not
        the profile's team that resolve_team answers with whatever is
        passed."""
        from chaotic_mcp_tools import ToolInputError
        from cli.main import client
        teams = MagicMock(return_value=[
            {"id": "test-team-123", "key": "ENG", "name": "Engineering"},
            {"id": "t-ops", "key": "OPS", "name": "Operations"},
        ])
        monkeypatch.setattr(client, "get_teams", teams)
        assert await backend.resolve_named_team("test-team-123") == "test-team-123"
        teams.assert_not_called()
        assert await backend.resolve_named_team("ops") == "t-ops"
        assert await backend.resolve_named_team("Engineering") == "test-team-123"
        with pytest.raises(ToolInputError, match="'NOPE' not found"):
            await backend.resolve_named_team("NOPE")

    async def test_resolve_assignee_uses_the_team_it_is_given(self, backend, monkeypatch):
        from cli.main import client
        monkeypatch.setattr(client, "get_team_members", MagicMock(return_value=[{"user_id": "u-1", "user_name": "Look"}]))
        monkeypatch.setattr(client, "get_team_agents", MagicMock(return_value=[]))
        assert await backend.resolve_assignee("Look", "team-b") == "u-1"
        client.get_team_members.assert_called_once_with("team-b")

    async def test_no_team_selected_and_none_accessible(self, backend, monkeypatch):
        from cli.main import client
        monkeypatch.setattr("cli.main.get_current_team", lambda: None)
        monkeypatch.setattr(client, "get_teams", MagicMock(return_value=[]))
        monkeypatch.setattr(client, "get_me", MagicMock(return_value={"id": "u-1", "is_agent": False}))
        with pytest.raises(ToolInputError, match="No team selected"):
            await backend.resolve_team(None)

    async def test_not_authenticated_is_checked_before_any_call(self, backend, monkeypatch):
        from cli.main import client
        monkeypatch.setattr("cli.main.get_token", lambda: None)
        monkeypatch.setattr("cli.main.get_api_key", lambda: None)
        client.get_issue_by_identifier = MagicMock(return_value={})
        with pytest.raises(ToolInputError, match="Not authenticated"):
            await backend.get_issue("CHT-1")
        client.get_issue_by_identifier.assert_not_called()

    async def test_resolve_document_requires_the_team(self, backend, monkeypatch):
        seen = {}

        def _resolve(value, team_id):
            seen["args"] = (value, team_id)
            return "doc-1"

        monkeypatch.setattr("cli.main.resolve_document_id", _resolve)
        assert await backend.resolve_document("My Doc") == "doc-1"
        assert seen["args"] == ("My Doc", "test-team-123")

    async def test_me_id(self, backend):
        from cli.main import client
        client.get_me = MagicMock(return_value={"id": "user-1"})
        assert await backend.me_id() == "user-1"


class TestProjectScopedKey:
    """CHT-1690: a project-scoped agent key is issued in its project's
    team, so the key's only team is found as for any agent (CHT-1687),
    but with no project passed or configured the stdio server said "No
    project selected" where the HTTP /mcp uses the key's own project.
    It now uses it too."""

    PROJECT = {"id": "p-1", "key": "DEMO", "name": "Demo", "team_id": "t-1"}

    @pytest.fixture(autouse=True)
    def _project_key(self, monkeypatch):
        from cli import config
        from cli.main import client
        monkeypatch.setattr("cli.main.get_current_team", config.get_current_team)
        monkeypatch.setattr("cli.main.get_current_project", lambda: None)
        monkeypatch.setattr(config, "load_config", lambda: {})
        monkeypatch.setenv("CHAOTIC_API_KEY", "ck_project_agent")
        monkeypatch.delenv("CHAOTIC_API_URL", raising=False)
        self.teams = MagicMock(return_value=[{"id": "t-1", "name": "Team", "key": "TM"}])
        self.me = MagicMock(return_value={"id": "a-1", "is_agent": True,
                                          "agent_team_id": "t-1", "agent_project_id": "p-1"})
        self.project = MagicMock(return_value=dict(self.PROJECT))
        monkeypatch.setattr(client, "get_teams", self.teams)
        monkeypatch.setattr(client, "get_me", self.me)
        monkeypatch.setattr(client, "get_project", self.project)

    async def test_project_tools_use_the_keys_project(self, backend):
        assert await backend.resolve_project(None, None) == ("p-1", "t-1")
        assert await backend.optional_project(None, None) == ("p-1", "t-1")
        self.me.assert_called_once_with(as_configured=True)
        self.project.assert_called_once_with("p-1")

    async def test_the_scope_is_looked_up_once_per_process(self, backend):
        await backend.resolve_project(None, None)
        await backend.optional_project(None, None)
        await backend.resolve_project(None, None)
        assert self.me.call_count == 1 and self.project.call_count == 1

    async def test_a_failed_lookup_is_not_kept(self, backend):
        self.me.side_effect = [APIError("boom", status_code=503), self.me.return_value]
        with pytest.raises(BackendError):
            await backend.resolve_project(None, None)
        assert await backend.resolve_project(None, None) == ("p-1", "t-1")

    async def test_optional_project_keeps_the_team_when_the_lookup_fails(self, backend):
        """Review L1: optional_project made no request before CHT-1690, so
        a 5xx on /auth/me or the project falls back to the team-wide
        answer instead of failing the call, and is asked again later."""
        self.me.side_effect = [APIError("boom", status_code=503), self.me.return_value]
        assert await backend.optional_project(None, None) == (None, "t-1")
        assert await backend.optional_project(None, None) == ("p-1", "t-1")
        self.me.side_effect = None
        self.project.side_effect = APIError("boom", status_code=502)
        from cli import mcp_backend
        mcp_backend._key_projects.clear()
        assert await backend.optional_project(None, None) == (None, "t-1")

    async def test_a_deleted_project_says_so(self, backend):
        """Review N2: the HTTP /mcp's message, not a bare 404."""
        self.project.side_effect = APIError("Project not found", status_code=404)
        for call in (backend.resolve_project, backend.optional_project):
            with pytest.raises(ToolInputError, match="scoped project no longer exists"):
                await call(None, None)

    async def test_a_passed_project_does_not_ask_who_the_key_is(self, backend, monkeypatch):
        monkeypatch.setattr("cli.main.resolve_project_id", lambda v: f"resolved-{v}")
        assert await backend.resolve_project("DEMO", None) == ("resolved-DEMO", "t-1")
        self.me.assert_not_called()

    async def test_a_configured_project_does_not_ask_who_the_key_is(self, backend, monkeypatch):
        monkeypatch.setattr("cli.main.get_current_project", lambda: "p-conf")
        assert await backend.resolve_project(None, None) == ("p-conf", "t-1")
        assert await backend.optional_project(None, None) == ("p-conf", "t-1")
        self.me.assert_not_called()

    async def test_a_team_scoped_agent_keeps_the_no_project_message(self, backend):
        self.me.return_value = {"id": "a-2", "is_agent": True, "agent_team_id": "t-1", "agent_project_id": None}
        with pytest.raises(ToolInputError, match="No project selected"):
            await backend.resolve_project(None, None)
        assert await backend.optional_project(None, None) == (None, "t-1")
        self.project.assert_not_called()

    async def test_the_keys_team_is_kept_for_the_process(self, backend):
        from cli import config
        await backend.resolve_project(None, None)
        assert config.process_team(config.get_api_url(), "ck_project_agent") == "t-1"

    async def test_a_teamless_project_key_gets_the_http_mcps_message(self, backend):
        """Safeguard: such a key cannot authenticate today, but if one
        ever lists no team, "No team selected" advice cannot help it."""
        self.teams.return_value = []
        self.me.return_value = {"id": "a-1", "is_agent": True, "agent_team_id": None, "agent_project_id": "p-1"}
        with pytest.raises(ToolInputError, match="scoped to a single project, not a team") as e:
            await backend.resolve_team(None)
        assert "team list" not in str(e.value) and "quickstart" not in str(e.value)

    async def test_a_failed_safeguard_lookup_keeps_the_no_team_message(self, backend):
        self.teams.return_value = []
        self.me.side_effect = APIError("boom", status_code=503)
        with pytest.raises(ToolInputError, match="No team selected"):
            await backend.resolve_team(None)


class TestDefaultTeam:
    """No current team (env vars alone, or `auth set-key`): the key's only
    accessible team is the scope, as on the HTTP /mcp (CHT-1687)."""

    @pytest.fixture(autouse=True)
    def _no_current_team(self, monkeypatch):
        from cli import config
        # What cli.main.get_current_team is outside the test suite.
        monkeypatch.setattr("cli.main.get_current_team", config.get_current_team)
        monkeypatch.setattr(config, "load_config", lambda: {})
        monkeypatch.setenv("CHAOTIC_API_KEY", "ck_key_a")
        monkeypatch.delenv("CHAOTIC_API_URL", raising=False)

    @pytest.fixture
    def teams(self, monkeypatch):
        from cli.main import client
        mock = MagicMock(return_value=[{"id": "only-team", "name": "Demo", "key": "DEMO"}])
        monkeypatch.setattr(client, "get_teams", mock)
        return mock

    async def test_the_keys_only_team(self, backend, teams):
        assert await backend.resolve_team(None) == "only-team"
        # With the configured key: with session identity on that is the
        # registrar, which a person registrar needs before its session
        # key can exist.
        teams.assert_called_once_with(as_configured=True)

    async def test_resolved_once_and_seen_by_the_cli_resolvers(self, backend, teams, monkeypatch):
        import cli.main as m
        seen = []

        def _resolve(value):
            seen.append(m.get_current_team())  # what resolve_project scopes by
            return "p-1"

        monkeypatch.setattr("cli.main.resolve_project_id", _resolve)
        from cli.main import client
        monkeypatch.setattr(client, "get_project", MagicMock(return_value={"id": "p-1", "team_id": "only-team"}))
        assert await backend.resolve_project("DEMO", None) == ("p-1", "only-team")
        assert await backend.team_for_project("p-1") == "only-team"
        assert seen == ["only-team"]
        teams.assert_called_once()

    async def test_a_configured_team_wins(self, backend, teams, monkeypatch):
        from cli import config
        monkeypatch.setattr(config, "load_config", lambda: {"current_team": "configured"})
        assert await backend.resolve_team(None) == "configured"
        teams.assert_not_called()

    async def test_the_default_is_not_saved_to_config(self, backend, teams, monkeypatch):
        from cli import config
        saved = MagicMock()
        monkeypatch.setattr(config, "save_local_config", saved)
        monkeypatch.setattr(config, "save_global_config", saved)
        await backend.resolve_team(None)
        saved.assert_not_called()

    async def test_another_key_does_not_inherit_the_team(self, backend, teams, monkeypatch):
        """The default belongs to the server and key it was looked up with:
        a key set while the server runs is asked again (review L1)."""
        assert await backend.resolve_team(None) == "only-team"
        monkeypatch.setenv("CHAOTIC_API_KEY", "ck_key_b")
        teams.return_value = [
            {"id": "only-team", "name": "Demo", "key": "DEMO"},
            {"id": "t2", "name": "Beta", "key": "BET"},
        ]
        with pytest.raises(ToolInputError, match="several teams"):
            await backend.resolve_team(None)
        monkeypatch.setenv("CHAOTIC_API_URL", "http://other.test/api")
        monkeypatch.setenv("CHAOTIC_API_KEY", "ck_key_a")
        with pytest.raises(ToolInputError, match="several teams"):
            await backend.resolve_team(None)
        monkeypatch.delenv("CHAOTIC_API_URL")
        assert await backend.resolve_team(None) == "only-team"

    async def test_several_teams_are_not_remembered(self, backend, teams):
        """Only a single answer is kept: a person given a second team, or
        whose extra team is removed, mid-process is asked again (CHT-1691)."""
        teams.return_value = [
            {"id": "t1", "name": "Alpha", "key": "ALP"},
            {"id": "t2", "name": "Beta", "key": "BET"},
        ]
        with pytest.raises(ToolInputError, match="several teams"):
            await backend.resolve_team(None)
        teams.return_value = [{"id": "t1", "name": "Alpha", "key": "ALP"}]
        assert await backend.resolve_team(None) == "t1"
        assert teams.call_count == 2

    async def test_several_teams_are_named(self, backend, teams):
        teams.return_value = [
            {"id": "t1", "name": "Alpha", "key": "ALP"},
            {"id": "t2", "name": "Beta", "key": "BET"},
        ]
        with pytest.raises(ToolInputError) as info:
            await backend.resolve_team(None)
        assert "Alpha (ALP), Beta (BET)" in str(info.value)
        assert "chaotic team use" in str(info.value)
        # An ambiguous answer is not remembered.
        teams.return_value = [{"id": "t1", "name": "Alpha", "key": "ALP"}]
        assert await backend.resolve_team(None) == "t1"

    async def test_a_failed_lookup_is_a_backend_error(self, backend, teams):
        teams.side_effect = APIError("Could not validate credentials", status_code=401)
        with pytest.raises(BackendError):
            await backend.resolve_team(None)


class TestTranslation:
    async def test_api_error_keeps_status_and_detail(self, backend):
        from cli.main import client
        detail = {"error_code": "sprint_in_arrears", "message": "Over.", "arrears_by": 2}
        client.get_issue_by_identifier = MagicMock(side_effect=APIError("cli text", status_code=409, detail=detail))
        with pytest.raises(BackendError) as info:
            await backend.get_issue("CHT-1")
        assert info.value.message == "cli text"
        assert info.value.http_status == 409 and info.value.detail == detail

    async def test_click_exception_from_a_resolver_is_tool_input(self, backend, monkeypatch):
        def _boom(v):
            raise click.ClickException("Ambiguous project name 'foo'")
        monkeypatch.setattr("cli.main.resolve_project_id", _boom)
        with pytest.raises(ToolInputError, match="Ambiguous project name 'foo'"):
            await backend.resolve_project("foo", None)

    @pytest.mark.parametrize("exc,code,fragment", [
        (httpx.ConnectError("refused"), "connect_error", "Could not connect to server at http://x.test/api"),
        (httpx.ReadTimeout("slow"), "timeout", "Request timed out"),
        (httpx.RemoteProtocolError("bad frame"), "network_error", "Network error: bad frame"),
    ])
    async def test_httpx_failures_are_transport_errors(self, backend, monkeypatch, exc, code, fragment):
        from cli.main import client
        monkeypatch.setattr("cli.main.get_api_url", lambda: "http://x.test/api")
        client.get_issue_by_identifier = MagicMock(side_effect=exc)
        with pytest.raises(TransportError) as info:
            await backend.get_issue("CHT-1")
        assert info.value.error_code == code and fragment in str(info.value)

    async def test_unrelated_exceptions_propagate_untouched(self, backend):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=RuntimeError("boom"))
        with pytest.raises(RuntimeError, match="boom"):
            await backend.get_issue("CHT-1")


class TestCallShapes:
    """The REST calls the bodies used to make directly, now made here --
    pinned so a refactor of the adapter cannot silently change a query."""

    async def test_list_issues_joins_filters_and_only_sends_skip_for_the_probe(self, backend):
        from cli.main import client
        client.get_issues = MagicMock(return_value=[])
        base = dict(project_id="p", team_id=None, statuses=["todo", "done"], priorities=None,
                    assignee_id=None, label="bug", search=None, sprint_id=None, parent_id=None,
                    limit=51, sort_by="updated", order="desc")
        await backend.list_issues(**base)
        _, kwargs = client.get_issues.call_args
        assert kwargs["status"] == "todo,done" and kwargs["priority"] is None
        assert kwargs["label"] == "bug" and kwargs["limit"] == 51 and "skip" not in kwargs

        await backend.list_issues(**dict(base, skip=50, limit=1, sort_by="created"))
        _, kwargs = client.get_issues.call_args
        assert kwargs["skip"] == 50 and kwargs["limit"] == 1

    async def test_create_issue_omits_unset_optionals(self, backend):
        from cli.main import client
        client.create_issue = MagicMock(return_value={})
        await backend.create_issue("p", title="T", description=None, status="backlog",
                                   priority="no_priority", issue_type="task", estimate=None, parent_id=None)
        client.create_issue.assert_called_once_with(
            "p", "T", description=None, status="backlog", priority="no_priority", issue_type="task",
        )
        await backend.create_issue("p", title="T", description="d", status="todo",
                                   priority="high", issue_type="bug", estimate=3, parent_id="par")
        client.create_issue.assert_called_with(
            "p", "T", description="d", status="todo", priority="high", issue_type="bug",
            estimate=3, parent_id="par",
        )

    async def test_list_rituals_passes_include_inactive_only_when_set(self, backend):
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[])
        await backend.list_rituals("p")
        client.get_rituals.assert_called_with("p")
        await backend.list_rituals("p", include_inactive=True)
        client.get_rituals.assert_called_with("p", include_inactive=True)

    async def test_blocking_calls_run_off_the_event_loop(self, backend):
        from cli.main import client
        seen = {}

        def _get(identifier):
            seen["thread"] = threading.current_thread()
            return {"id": "i1"}

        client.get_issue_by_identifier = MagicMock(side_effect=_get)
        await backend.get_issue("CHT-1")
        assert seen["thread"] is not threading.main_thread()


def test_only_the_mcp_backend_sets_the_process_team():
    """The plain CLI never picks a team on its own: `chaotic team use` is
    how it gets one. Only the stdio MCP server falls back to the key's
    only team (CHT-1687 review L4)."""
    from pathlib import Path
    src = Path(__file__).resolve().parent.parent / "src"
    callers = sorted(
        str(p.relative_to(src)) for p in src.rglob("*.py")
        if "set_process_team(" in p.read_text() and p.name != "config.py"
    )
    assert callers == ["cli/mcp_backend.py"]
