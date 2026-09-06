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
        monkeypatch.setattr("cli.main.get_current_project", lambda: None)
        with pytest.raises(ToolInputError, match="No project selected"):
            await backend.resolve_project(None, None)

    async def test_optional_project_without_a_default_means_team_wide(self, backend, monkeypatch):
        """The stdio-specific answer: a profile with no current project
        widens to the team instead of erroring (the HTTP adapter has no
        profile and behaves like resolve_project)."""
        monkeypatch.setattr("cli.main.get_current_project", lambda: None)
        assert await backend.optional_project(None, None) == (None, "test-team-123")

    async def test_optional_project_explicit_goes_through_the_cli_resolver(self, backend, monkeypatch):
        monkeypatch.setattr("cli.main.resolve_project_id", lambda v: f"resolved-{v}")
        assert await backend.optional_project("KEY", None) == ("resolved-KEY", "test-team-123")

    async def test_team_for_project_is_the_profile_team(self, backend):
        assert await backend.team_for_project("whatever") == "test-team-123"

    async def test_no_team_selected(self, backend, monkeypatch):
        monkeypatch.setattr("cli.main.get_current_team", lambda: None)
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
