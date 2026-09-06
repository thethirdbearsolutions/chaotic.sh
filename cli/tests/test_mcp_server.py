"""Tests for the `chaotic mcp` server (CHT-1247).

Two layers:
  * Unit tests calling each tool function directly against a mocked
    Client -- same idiom as every other cli.commands.* test (see
    conftest.py's patched_client/patched_auth/patched_project).
  * One integration-style test driving the real MCP protocol loop
    in-memory (_connected_session, over mcp.shared.memory streams),
    proving list_tools/call_tool actually round-trip through the SDK's
    session/transport layer, not just plain Python calls.
"""
import asyncio
import json
from functools import partial
from unittest.mock import MagicMock

import pytest

from cli.client import APIError


@pytest.fixture(autouse=True)
def mock_dependencies(patched_auth, patched_project):
    """Mock config/auth before importing main (CHT-1247).

    Deliberately does NOT use conftest's `patched_client` fixture: that
    fixture swaps `sys.modules['cli.client']` for a MagicMock whose
    `.APIError` is a conftest-local `_FakeAPIError`, not the real class.
    `cli.mcp_backend` binds `from .client import APIError` at import -- if
    ITS first-ever import in the test session happened while that swap was
    active, `RestBackend._call`'s `except APIError` would permanently bind
    to the fake and silently stop matching this file's real
    `from cli.client import APIError`. Individual client methods are still
    mocked directly on the shared `cli.main.client` singleton below, same
    as every other test file.
    """
    yield


@pytest.fixture(autouse=True)
def restore_client_mocks():
    """Undo the `client.<method> = MagicMock(...)` assignments each test makes
    on the shared `cli.main.client` singleton (CHT-1391). Those instance
    attributes shadow the class methods and leaked into every later test
    in the session, so any test that relied on one left behind would pass
    in the suite and fail alone. (No test in this file did at the time
    this was added; the rotation test came closest, and now supplies its
    own mock.) Snapshot the instance dict before the test and put it back
    afterwards; class attributes are untouched, so the real methods
    reappear.
    """
    from cli.main import client

    before = dict(vars(client))
    yield
    for name in list(vars(client)):
        if name not in before:
            delattr(client, name)
    vars(client).update(before)


@pytest.fixture
def mcp_mod():
    """Import cli.mcp_server after cli.main/client mocking is wired up."""
    import cli.main  # noqa: F401 - ensures cli.main (and its client) is loaded
    import cli.mcp_server as mcp_mod
    return mcp_mod


@pytest.fixture
def mock_issue():
    return {
        "id": "issue-uuid-1",
        "identifier": "CHT-100",
        "title": "Fix the widget",
        "description": "Broken widget.",
        "status": "in_progress",
        "priority": "high",
        "issue_type": "bug",
        "estimate": 3,
        "project_id": "test-project-123",
    }


@pytest.fixture
def mock_document():
    return {
        "id": "doc-uuid-1",
        "title": "Sprint Report",
        "content": "## Summary",
        "icon": "📊",
        "project_id": "test-project-123",
        "sprint_id": None,
    }


# ---------------------------------------------------------------------------
# Server assembly / schema smoke tests
# ---------------------------------------------------------------------------

class TestServerAssembly:
    def test_curated_toolset(self, mcp_mod):
        """The full curated toolset, no more, no less: the reviewed list in
        chaotic_mcp_tools/expected.py, so the failure names the tool that
        went missing (or appeared) rather than diffing two sets (CHT-1394).
        """
        from chaotic_mcp_tools.expected import toolset_diff

        problem = toolset_diff([t.__name__ for t in mcp_mod.ALL_TOOLS], "the stdio server")
        assert not problem, problem

    def test_no_delete_tools(self, mcp_mod):
        """Destructive operations stay off this surface deliberately.

        This used to also assert no `ready` tool, pinning the v1
        exclusion that deferred it to CHT-1245. That ticket landed, so
        issue_ready is now intentionally present (CHT-1334) and only the
        delete guard is still a live invariant.
        """
        assert not any("delete" in t.__name__ for t in mcp_mod.ALL_TOOLS)

    def test_build_server_registers_all_tools(self, mcp_mod):
        server = mcp_mod.build_server()
        tools = asyncio.run(server.list_tools())
        assert {t.name for t in tools} == {t.__name__ for t in mcp_mod.ALL_TOOLS}

    def test_every_tool_has_a_description(self, mcp_mod):
        server = mcp_mod.build_server()
        tools = asyncio.run(server.list_tools())
        for t in tools:
            assert t.description and t.description.strip()

    def test_typed_input_schema_has_no_bare_args_kwargs(self, mcp_mod):
        """Guards against the functools.wraps regression: without it,
        every schema would collapse to {} (bare *args/**kwargs)."""
        server = mcp_mod.build_server()
        tools = asyncio.run(server.list_tools())
        by_name = {t.name: t for t in tools}
        assert set(by_name["issue_list"].input_schema["properties"]) == {
            "status", "priority", "assignee", "label", "search", "sprint",
            "epic", "all_projects", "project", "limit", "sort_by", "order", "detail",
        }
        assert by_name["issue_view"].input_schema["properties"]["identifier"]["type"] == "string"


# ---------------------------------------------------------------------------
# The error boundary (chaotic_mcp_tools.registry.call_guarded): envelope contract
# ---------------------------------------------------------------------------

class TestErrorBoundary:
    async def test_api_error_becomes_error_envelope(self, mcp_mod):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=APIError("Issue not found", status_code=404))
        result = await mcp_mod.issue_view(identifier="CHT-999")
        # One envelope on both transports (CHT-1350, ADR-0006): message
        # always a string, structure additive.
        assert result == {"error": {"message": "Issue not found", "http_status": 404}}

    async def test_structured_api_error_keeps_error_code_and_fields(self, mcp_mod):
        """A governance 409 arrives with the server's structured detail; the
        stdio envelope must carry error_code and the pending-ritual list,
        not just the CLI's flattened sentence (CHT-1350)."""
        from cli.main import client
        detail = {
            "error_code": "claim_rituals_pending",
            "message": "Ticket has pending claim rituals: 1 unattested (design-review). Attest the unattested ones before claiming.",
            "issue_id": "CHT-1",
            "pending_rituals": [{"name": "design-review", "prompt": "Write it."}],
        }
        client.get_issue_by_identifier = MagicMock(return_value={"id": "i1", "identifier": "CHT-1"})
        client.update_issue = MagicMock(side_effect=APIError("Ticket has pending rituals: design-review", status_code=409, detail=detail))
        result = await mcp_mod.issue_update(identifier="CHT-1", status="in_progress")
        err = result["error"]
        assert err["error_code"] == "claim_rituals_pending"
        assert err["message"] == detail["message"]  # the server's own sentence wins
        assert err["pending_rituals"][0]["name"] == "design-review"
        assert err["http_status"] == 409

    async def test_dict_detail_without_message_uses_cli_rendering(self, mcp_mod):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=APIError("Rendered by the CLI", status_code=400, detail={"arrears_by": 3}))
        err = (await mcp_mod.issue_view(identifier="CHT-1"))["error"]
        assert err["message"] == "Rendered by the CLI"
        assert err["arrears_by"] == 3

    async def test_validation_detail_becomes_errors_list(self, mcp_mod):
        from cli.main import client
        detail = [{"loc": ["body", "title"], "msg": "field required"}]
        client.get_issue_by_identifier = MagicMock(side_effect=APIError("Validation error: title: field required", status_code=422, detail=detail))
        err = (await mcp_mod.issue_view(identifier="CHT-1"))["error"]
        assert err["error_code"] == "validation_error"
        assert err["errors"] == detail
        assert isinstance(err["message"], str)

    async def test_tool_input_error_becomes_error_envelope(self, mcp_mod):
        result = await mcp_mod.issue_create(title="Nope", issue_type="not-a-real-type")
        assert "error" in result
        assert "not-a-real-type" in result["error"]["message"]
        assert result["error"]["error_code"] == "tool_input"

    async def test_click_exception_becomes_error_envelope(self, mcp_mod, monkeypatch):
        import click

        def _boom(*a, **k):
            raise click.ClickException("Ambiguous project name 'foo'")

        monkeypatch.setattr("cli.main.resolve_project_id", _boom)
        result = await mcp_mod.issue_list(project="foo")
        assert result == {"error": {"message": "Ambiguous project name 'foo'", "error_code": "tool_input"}}

    async def test_unexpected_exception_never_crashes(self, mcp_mod):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=RuntimeError("boom"))
        result = await mcp_mod.issue_view(identifier="CHT-1")
        assert result["error"]["message"].startswith("Unexpected error (RuntimeError)")
        assert result["error"]["error_code"] == "unexpected"

    async def test_not_authenticated(self, mcp_mod, monkeypatch):
        monkeypatch.setattr("cli.main.get_token", lambda: None)
        monkeypatch.setattr("cli.main.get_api_key", lambda: None)
        result = await mcp_mod.issue_view(identifier="CHT-1")
        assert "Not authenticated" in result["error"]["message"]

    async def test_no_team_selected(self, mcp_mod, monkeypatch):
        monkeypatch.setattr("cli.main.get_current_team", lambda: None)
        result = await mcp_mod.activity_recent()
        assert "No team selected" in result["error"]["message"]

    async def test_no_project_selected(self, mcp_mod, monkeypatch):
        monkeypatch.setattr("cli.main.get_current_project", lambda: None)
        result = await mcp_mod.issue_list()
        assert "No project selected" in result["error"]["message"]

    async def test_connect_error_gets_actionable_message(self, mcp_mod, monkeypatch):
        """Network failures mirror the CLI handle_error decorator's
        messages, not a generic Unexpected error (PR #215 review)."""
        import httpx
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=httpx.ConnectError("refused"))
        monkeypatch.setattr("cli.main.get_api_url", lambda: "http://example.test/api")
        result = await mcp_mod.issue_view(identifier="CHT-1")
        assert result == {"error": {
            "message": "Could not connect to server at http://example.test/api. Is the server running?",
            "error_code": "connect_error",
        }}

    async def test_timeout_gets_actionable_message(self, mcp_mod):
        import httpx
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=httpx.ReadTimeout("slow"))
        result = await mcp_mod.issue_view(identifier="CHT-1")
        assert result == {"error": {
            "message": "Request timed out. The server may be overloaded or unreachable.",
            "error_code": "timeout",
        }}

    async def test_other_httpx_error_gets_network_message(self, mcp_mod):
        import httpx
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=httpx.RemoteProtocolError("bad frame"))
        result = await mcp_mod.issue_view(identifier="CHT-1")
        assert result == {"error": {"message": "Network error: bad frame", "error_code": "network_error"}}


# ---------------------------------------------------------------------------
# issue_list
# ---------------------------------------------------------------------------

class TestIssueList:
    async def test_defaults_to_current_project(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issues = MagicMock(return_value=[mock_issue])
        result = await mcp_mod.issue_list()
        # Compact rows by default (CHT-1370): the projection, plus count/truncated.
        assert result == {
            "issues": [mcp_mod._compact(mock_issue, mcp_mod.COMPACT_ISSUE_FIELDS)],
            "count": 1, "truncated": False,
        }
        assert "description" not in result["issues"][0]
        _, kwargs = client.get_issues.call_args
        assert kwargs["project_id"] == "test-project-123"
        assert kwargs["team_id"] is None
        # limit+1 is the truncation probe.
        assert kwargs["limit"] == 51
        # Deliberate agent-friendly default (CLI defaults to "random").
        assert kwargs["sort_by"] == "updated"
        assert kwargs["order"] == "desc"

    async def test_all_projects_uses_team_scope(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issues = MagicMock(return_value=[mock_issue])
        result = await mcp_mod.issue_list(all_projects=True)
        assert result["issues"] == [mcp_mod._compact(mock_issue, mcp_mod.COMPACT_ISSUE_FIELDS)]
        _, kwargs = client.get_issues.call_args
        assert kwargs["project_id"] is None
        assert kwargs["team_id"] == "test-team-123"

    async def test_status_and_priority_lists_join_to_csv(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issues = MagicMock(return_value=[mock_issue])
        await mcp_mod.issue_list(status=["backlog", "todo"], priority=["high", "urgent"])
        _, kwargs = client.get_issues.call_args
        assert kwargs["status"] == "backlog,todo"
        assert kwargs["priority"] == "high,urgent"

    async def test_assignee_me_resolves_to_current_user(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.get_issues = MagicMock(return_value=[mock_issue])
        await mcp_mod.issue_list(assignee="me")
        _, kwargs = client.get_issues.call_args
        assert kwargs["assignee_id"] == "user-1"

    async def test_epic_resolves_parent_id(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value={"id": "epic-1"})
        client.get_issues = MagicMock(return_value=[mock_issue])
        await mcp_mod.issue_list(epic="CHT-1")
        _, kwargs = client.get_issues.call_args
        assert kwargs["parent_id"] == "epic-1"

    async def test_empty_result(self, mcp_mod):
        from cli.main import client
        client.get_issues = MagicMock(return_value=[])
        assert await mcp_mod.issue_list() == {"issues": [], "count": 0, "truncated": False}

    async def test_detail_returns_full_rows(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issues = MagicMock(return_value=[mock_issue])
        result = await mcp_mod.issue_list(detail=True)
        assert result["issues"] == [mock_issue]
        assert result["issues"][0]["description"] == "Broken widget."

    async def test_truncated_when_limit_cuts_the_list(self, mcp_mod, mock_issue):
        """limit+1 rows come back -> truncated=true and exactly `limit` rows."""
        from cli.main import client
        rows = [dict(mock_issue, identifier=f"CHT-{i}") for i in range(3)]
        client.get_issues = MagicMock(return_value=rows)
        result = await mcp_mod.issue_list(limit=2)
        assert result["count"] == 2
        assert result["truncated"] is True
        assert [r["identifier"] for r in result["issues"]] == ["CHT-0", "CHT-1"]

    async def test_priority_sort_probes_by_offset_not_overfetch(self, mcp_mod, mock_issue):
        """For sort keys the service re-sorts in Python after a SQL LIMIT
        (priority, status), over-fetching limit+1 would let the re-sort drop
        the wrong row. So: fetch exactly `limit`, and probe offset=limit."""
        from cli.main import client
        rows = [dict(mock_issue, identifier=f"CHT-{i}") for i in range(2)]
        client.get_issues = MagicMock(side_effect=[rows, [dict(mock_issue, identifier="CHT-9")]])
        result = await mcp_mod.issue_list(limit=2, sort_by="priority")
        assert [r["identifier"] for r in result["issues"]] == ["CHT-0", "CHT-1"]
        assert result["count"] == 2 and result["truncated"] is True
        first, probe = client.get_issues.call_args_list
        assert first.kwargs["limit"] == 2 and first.kwargs["sort_by"] == "priority"
        assert probe.kwargs["skip"] == 2 and probe.kwargs["limit"] == 1
        assert probe.kwargs["project_id"] == first.kwargs["project_id"]

    async def test_priority_sort_not_truncated_when_probe_is_empty(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issues = MagicMock(side_effect=[[mock_issue], []])
        result = await mcp_mod.issue_list(limit=2, sort_by="status")
        assert result["count"] == 1 and result["truncated"] is False

    async def test_compact_rows_carry_resolved_names(self, mcp_mod, mock_issue):
        """CHT-1371: names, not UUIDs, in compact rows."""
        from cli.main import client
        row = dict(mock_issue, assignee_id="u1", assignee_name="Ada", sprint_id="s1",
                   sprint_name="Sprint 3", parent_id="p1", parent_identifier="CHT-1")
        client.get_issues = MagicMock(return_value=[row])
        compact = (await mcp_mod.issue_list())["issues"][0]
        assert compact["assignee_name"] == "Ada"
        assert compact["sprint_name"] == "Sprint 3"
        assert compact["parent_identifier"] == "CHT-1"
        assert "assignee_id" not in compact and "sprint_id" not in compact

    async def test_compact_rows_fall_back_to_uuids_on_an_older_backend(self, mcp_mod, mock_issue):
        """A backend predating CHT-1371 sends no *_name keys; the UUID must
        survive in the compact slot rather than reading as unassigned."""
        from cli.main import client
        row = dict(mock_issue, assignee_id="u1", sprint_id="s1", parent_id="p1")
        client.get_issues = MagicMock(return_value=[row])
        compact = (await mcp_mod.issue_list())["issues"][0]
        assert compact["assignee_name"] == "u1"
        assert compact["sprint_name"] == "s1"
        assert compact["parent_identifier"] == "p1"

    async def test_compact_row_flattens_labels_to_names(self, mcp_mod, mock_issue):
        from cli.main import client
        row = dict(mock_issue, labels=[{"id": "l1", "name": "bug", "color": "#f00", "team_id": "t"}])
        client.get_issues = MagicMock(return_value=[row])
        assert (await mcp_mod.issue_list())["issues"][0]["labels"] == ["bug"]

    async def test_sprint_with_all_projects_is_rejected(self, mcp_mod):
        """Sprints are project-scoped; the CLI rejects --sprint with
        --all-projects and the MCP tool must too (PR #215 review)."""
        from cli.main import client
        client.get_issues = MagicMock()
        result = await mcp_mod.issue_list(all_projects=True, sprint="current")
        assert "Cannot combine `sprint` with all_projects" in result["error"]["message"]
        client.get_issues.assert_not_called()

    async def test_explicit_project_wins_over_all_projects(self, mcp_mod, mock_issue, monkeypatch):
        """Same precedence as doc_list/doc_create: an explicit `project`
        always scopes to that project, even with all_projects=true
        (PR #215 review -- previously `project` was silently dropped)."""
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_project_id", lambda ident: "explicit-project-1")
        client.get_issues = MagicMock(return_value=[mock_issue])

        await mcp_mod.issue_list(all_projects=True, project="CHT")

        _, kwargs = client.get_issues.call_args
        assert kwargs["project_id"] == "explicit-project-1"
        assert kwargs["team_id"] is None

    async def test_sprint_resolves_against_explicit_project(self, mcp_mod, mock_issue, monkeypatch):
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_project_id", lambda ident: "explicit-project-1")
        resolve_sprint = MagicMock(return_value="sprint-1")
        monkeypatch.setattr("cli.main.resolve_sprint_id", resolve_sprint)
        client.get_issues = MagicMock(return_value=[mock_issue])

        await mcp_mod.issue_list(project="CHT", sprint="current")

        resolve_sprint.assert_called_once_with("current", "explicit-project-1")
        _, kwargs = client.get_issues.call_args
        assert kwargs["sprint_id"] == "sprint-1"


# ---------------------------------------------------------------------------
# issue_view
# ---------------------------------------------------------------------------

class TestIssueView:
    async def test_view_merges_comments_and_sub_issues(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.get_comments = MagicMock(return_value=[{"id": "c1", "content": "hi"}])
        client.get_sub_issues = MagicMock(return_value=[{"id": "sub-1", "identifier": "CHT-101"}])

        result = await mcp_mod.issue_view(identifier="CHT-100")

        assert result["identifier"] == "CHT-100"
        assert result["comments"] == [{"id": "c1", "content": "hi"}]
        assert result["comment_count"] == 1
        assert result["sub_issue_count"] == 1
        # Fetched with an explicit large limit so the counts are real, not
        # the REST default of 100 oldest-first.
        client.get_comments.assert_called_once_with("issue-uuid-1", limit=mcp_mod.ISSUE_VIEW_FETCH_LIMIT)
        client.get_sub_issues.assert_called_once_with("issue-uuid-1", limit=mcp_mod.ISSUE_VIEW_FETCH_LIMIT)
        # Sub-issues are compact rows (CHT-1370), not full records.
        assert result["sub_issues"] == [
            mcp_mod._compact({"id": "sub-1", "identifier": "CHT-101"}, mcp_mod.COMPACT_ISSUE_FIELDS)
        ]
        assert result["sub_issues"][0]["identifier"] == "CHT-101"

    async def test_view_caps_comments_to_newest(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        comments = [{"id": f"c{i}"} for i in range(25)]  # oldest first, as the API returns them
        client.get_comments = MagicMock(return_value=comments)
        client.get_sub_issues = MagicMock(return_value=[])
        result = await mcp_mod.issue_view(identifier="CHT-100")
        assert result["comment_count"] == 25
        assert len(result["comments"]) == mcp_mod.ISSUE_VIEW_COMMENT_CAP == 20
        assert result["comments"][-1] == {"id": "c24"}

    async def test_sub_issues_api_error_degrades_to_empty_list(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.get_comments = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(side_effect=APIError("not supported"))

        result = await mcp_mod.issue_view(identifier="CHT-100")
        assert result["sub_issues"] == []

    async def test_not_found(self, mcp_mod):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=APIError("Issue not found"))
        assert await mcp_mod.issue_view(identifier="CHT-999") == {"error": {"message": "Issue not found"}}


# ---------------------------------------------------------------------------
# issue_create
# ---------------------------------------------------------------------------

class TestIssueCreate:
    async def test_create_minimal(self, mcp_mod, mock_issue):
        from cli.main import client
        client.create_issue = MagicMock(return_value=mock_issue)

        result = await mcp_mod.issue_create(title="Fix the widget")

        assert result == mock_issue
        client.create_issue.assert_called_once_with(
            "test-project-123", "Fix the widget",
            description=None, status="backlog", priority="no_priority", issue_type="task",
        )

    async def test_create_resolves_issue_type_alias(self, mcp_mod, mock_issue):
        from cli.main import client
        client.create_issue = MagicMock(return_value=mock_issue)

        await mcp_mod.issue_create(title="X", issue_type="feat")

        _, kwargs = client.create_issue.call_args
        assert kwargs["issue_type"] == "feature"

    async def test_create_with_parent_resolves_parent_id(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value={"id": "epic-1"})
        client.create_issue = MagicMock(return_value=mock_issue)

        await mcp_mod.issue_create(title="Sub-issue", parent="CHT-1")

        _, kwargs = client.create_issue.call_args
        assert kwargs["parent_id"] == "epic-1"

    async def test_create_with_estimate(self, mcp_mod, mock_issue):
        from cli.main import client
        client.create_issue = MagicMock(return_value=mock_issue)

        await mcp_mod.issue_create(title="X", estimate=5)

        _, kwargs = client.create_issue.call_args
        assert kwargs["estimate"] == 5

    async def test_create_invalid_issue_type(self, mcp_mod):
        result = await mcp_mod.issue_create(title="X", issue_type="bogus")
        assert "error" in result

    async def test_create_no_project_selected(self, mcp_mod, monkeypatch):
        monkeypatch.setattr("cli.main.get_current_project", lambda: None)
        result = await mcp_mod.issue_create(title="X")
        assert "No project selected" in result["error"]["message"]


# ---------------------------------------------------------------------------
# issue_update
# ---------------------------------------------------------------------------

class TestIssueUpdate:
    async def test_update_status_and_priority(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=dict(mock_issue, status="done"))

        await mcp_mod.issue_update(identifier="CHT-100", status="done", priority="urgent")

        client.update_issue.assert_called_once_with("issue-uuid-1", status="done", priority="urgent")

    async def test_update_estimate(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=dict(mock_issue, status="done"))

        await mcp_mod.issue_update(identifier="CHT-100", estimate=8)

        client.update_issue.assert_called_once_with("issue-uuid-1", estimate=8)

    async def test_update_assignee_me(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.update_issue = MagicMock(return_value=None)

        await mcp_mod.issue_update(identifier="CHT-100", assignee="me")

        client.update_issue.assert_called_once_with("issue-uuid-1", assignee_id="user-1")

    async def test_update_assignee_unassigned_clears(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=dict(mock_issue, status="done"))

        await mcp_mod.issue_update(identifier="CHT-100", assignee="unassigned")

        client.update_issue.assert_called_once_with("issue-uuid-1", assignee_id=None)

    async def test_update_no_fields_is_an_error(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        result = await mcp_mod.issue_update(identifier="CHT-100")
        assert "No fields provided" in result["error"]["message"]

    async def test_update_returns_the_update_result(self, mcp_mod, mock_issue):
        """The PATCH response IS the updated issue (same IssueResponse the
        GET would return), so no second fetch -- one fewer REST round trip
        per update, and the same behaviour as the HTTP transport (CHT-1374)."""
        from cli.main import client
        updated = dict(mock_issue, status="done")
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=updated)

        result = await mcp_mod.issue_update(identifier="CHT-100", status="done")

        assert result == updated
        client.get_issue_by_identifier.assert_called_once_with("CHT-100")

    async def test_update_attest_records_notes_before_close(self, mcp_mod, mock_issue):
        """CHT-1326: the attest param satisfies note-required rituals in
        the same call so a non-interactive close is never stranded."""
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=dict(mock_issue, status="done"))
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [
                {"id": "rit-1", "name": "close-gate", "approval_mode": "auto"},
                {"id": "rit-2", "name": "doc-refresh", "approval_mode": "auto"},
            ],
            "completed_rituals": [],
        })
        client.attest_ritual_for_issue = MagicMock(return_value={"approved_at": "x"})

        result = await mcp_mod.issue_update(
            identifier="CHT-100", status="done",
            attest={"close-gate": "ADR written", "doc-refresh": "README updated"},
        )

        assert "error" not in result
        client.attest_ritual_for_issue.assert_any_call("rit-1", "issue-uuid-1", "ADR written", document_id=None, url=None)
        client.attest_ritual_for_issue.assert_any_call("rit-2", "issue-uuid-1", "README updated", document_id=None, url=None)
        client.update_issue.assert_called_once_with("issue-uuid-1", status="done")

    async def test_update_attest_unknown_ritual_is_an_error(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=dict(mock_issue, status="done"))
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [
                {"id": "rit-1", "name": "close-gate", "approval_mode": "auto"},
            ],
            "completed_rituals": [],
        })

        result = await mcp_mod.issue_update(
            identifier="CHT-100", status="done", attest={"bogus": "note"},
        )

        assert "not a pending ticket ritual" in result["error"]["message"]
        client.update_issue.assert_not_called()

    async def test_update_attest_only_is_allowed(self, mcp_mod, mock_issue):
        """attest with no field updates is a valid call — attesting the
        last ritual may auto-transition server-side."""
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=dict(mock_issue, status="done"))
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [
                {"id": "rit-1", "name": "close-gate", "approval_mode": "auto"},
            ],
            "completed_rituals": [],
        })
        client.attest_ritual_for_issue = MagicMock(return_value={"approved_at": "x"})

        result = await mcp_mod.issue_update(
            identifier="CHT-100", attest={"close-gate": "note"},
        )

        assert "error" not in result
        client.attest_ritual_for_issue.assert_called_once_with("rit-1", "issue-uuid-1", "note", document_id=None, url=None)
        client.update_issue.assert_not_called()

    async def test_update_attest_gate_routes_to_gate_completion(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=dict(mock_issue, status="done"))
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [
                {"id": "rit-g", "name": "gate-check", "approval_mode": "gate"},
            ],
            "completed_rituals": [],
        })
        client.complete_gate_ritual_for_issue = MagicMock(return_value={})
        client.attest_ritual_for_issue = MagicMock()

        result = await mcp_mod.issue_update(
            identifier="CHT-100", status="done", attest={"gate-check": "verified"},
        )

        assert "error" not in result
        client.complete_gate_ritual_for_issue.assert_called_once_with(
            "rit-g", "issue-uuid-1", "verified", document_id=None, url=None)
        client.attest_ritual_for_issue.assert_not_called()


# ---------------------------------------------------------------------------
# issue_comment
# ---------------------------------------------------------------------------

class TestIssueComment:
    async def test_comment(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        comment = {"id": "c1", "content": "hello"}
        client.create_comment = MagicMock(return_value=comment)

        result = await mcp_mod.issue_comment(identifier="CHT-100", content="hello")

        assert result == comment
        client.create_comment.assert_called_once_with("issue-uuid-1", "hello")

    async def test_comment_with_assign(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.create_comment = MagicMock(return_value={"id": "c1"})
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.update_issue = MagicMock(return_value=None)

        await mcp_mod.issue_comment(identifier="CHT-100", content="hi", assign_to="me")

        client.update_issue.assert_called_once_with("issue-uuid-1", assignee_id="user-1")


# ---------------------------------------------------------------------------
# issue_start
# ---------------------------------------------------------------------------

class TestIssueStart:
    async def test_start_assigns_and_moves_in_progress(self, mcp_mod, mock_issue):
        from cli.main import client
        started = dict(mock_issue, status="in_progress", assignee_id="user-1")
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.update_issue = MagicMock(return_value=started)

        result = await mcp_mod.issue_start(identifier="CHT-100")

        client.update_issue.assert_called_once_with("issue-uuid-1", assignee_id="user-1", status="in_progress")
        assert result == started



class TestIssueStartClaimParity:
    """CHT-1342: issue_start is the CLI's `issue claim` alias, so it has
    to carry claim's --attest and --lease. Without attest, a ticket with
    a claim ritual simply could not be started through this tool.
    """

    RITUAL = {"id": "r-1", "name": "claim-gate", "approval_mode": "auto",
              "attestation": None}

    async def test_start_attests_claim_ritual_before_claiming(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.get_pending_issue_rituals = MagicMock(
            return_value={"pending_rituals": [self.RITUAL], "completed_rituals": []})
        client.attest_ritual_for_issue = MagicMock(return_value={})
        client.update_issue = MagicMock(return_value={})

        await mcp_mod.issue_start(identifier="CHT-100", attest={"claim-gate": "branch cut"})

        client.attest_ritual_for_issue.assert_called_once_with(
            "r-1", "issue-uuid-1", "branch cut", document_id=None, url=None)
        # Attestation happens before the claim, not after.
        assert client.update_issue.called

    async def test_start_passes_lease_seconds(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.update_issue = MagicMock(return_value={})

        await mcp_mod.issue_start(identifier="CHT-100", lease_seconds=14400)

        _, kwargs = client.update_issue.call_args
        assert kwargs["lease_seconds"] == 14400

    async def test_start_omits_lease_when_not_given(self, mcp_mod, mock_issue):
        """No lease means server default, not an explicit null."""
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.update_issue = MagicMock(return_value={})

        await mcp_mod.issue_start(identifier="CHT-100")

        _, kwargs = client.update_issue.call_args
        assert "lease_seconds" not in kwargs

    async def test_start_rejects_empty_attestation_note(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_pending_issue_rituals = MagicMock(
            return_value={"pending_rituals": [self.RITUAL], "completed_rituals": []})
        client.update_issue = MagicMock(return_value={})

        result = await mcp_mod.issue_start(identifier="CHT-100", attest={"claim-gate": "  "})

        assert "error" in result
        client.update_issue.assert_not_called()

    async def test_start_attesting_an_already_done_ritual_is_idempotent(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.get_pending_issue_rituals = MagicMock(
            return_value={"pending_rituals": [],
                          "completed_rituals": [{"name": "claim-gate"}]})
        client.attest_ritual_for_issue = MagicMock(return_value={})
        client.update_issue = MagicMock(return_value={})

        result = await mcp_mod.issue_start(identifier="CHT-100", attest={"claim-gate": "done"})

        assert "error" not in result
        client.attest_ritual_for_issue.assert_not_called()

    async def test_start_unknown_ritual_names_the_pending_ones(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_pending_issue_rituals = MagicMock(
            return_value={"pending_rituals": [self.RITUAL], "completed_rituals": []})
        client.update_issue = MagicMock(return_value={})

        result = await mcp_mod.issue_start(identifier="CHT-100", attest={"wrong-name": "x"})

        assert "claim-gate" in result["error"]["message"]
        client.update_issue.assert_not_called()


class TestIssueRelations:
    async def test_issue_relations(self, mcp_mod, mock_issue):
        from cli.main import client
        rels = [{"id": "rel-1", "related_issue_id": "issue-uuid-2",
                 "relation_type": "blocked_by", "direction": "incoming"}]
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_relations = MagicMock(return_value=rels)

        assert await mcp_mod.issue_relations(identifier="CHT-100") == {"relations": rels}
        client.get_relations.assert_called_once_with("issue-uuid-1")

    async def test_issue_relations_empty(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_relations = MagicMock(return_value=None)
        assert await mcp_mod.issue_relations(identifier="CHT-100") == {"relations": []}

    async def test_issue_block_direction(self, mcp_mod, mock_issue):
        """`identifier` blocks `blocked` -- the first issue is the blocker."""
        from cli.main import client
        blocker = dict(mock_issue, id="issue-uuid-1", identifier="CHT-100")
        blocked = dict(mock_issue, id="issue-uuid-2", identifier="CHT-200")
        client.get_issue_by_identifier = MagicMock(side_effect=[blocker, blocked])
        client.create_relation = MagicMock(return_value={"id": "rel-1"})

        await mcp_mod.issue_block(identifier="CHT-100", blocked="CHT-200")

        client.create_relation.assert_called_once_with(
            "issue-uuid-1", "issue-uuid-2", "blocks",
        )

    async def test_issue_block_custom_type(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(
            side_effect=[dict(mock_issue, id="a"), dict(mock_issue, id="b")])
        client.create_relation = MagicMock(return_value={"id": "rel-1"})

        await mcp_mod.issue_block(identifier="CHT-1", blocked="CHT-2", relation_type="duplicates")

        assert client.create_relation.call_args[0][2] == "duplicates"

    async def test_issue_unblock_resolves_relation_from_the_other_issue(self, mcp_mod, mock_issue):
        from cli.main import client
        iss = dict(mock_issue, id="issue-uuid-1")
        other = dict(mock_issue, id="issue-uuid-2")
        client.get_issue_by_identifier = MagicMock(side_effect=[iss, other])
        client.get_relations = MagicMock(return_value=[
            {"id": "rel-1", "related_issue_id": "issue-uuid-2", "relation_type": "blocks"},
            {"id": "rel-9", "related_issue_id": "issue-uuid-9", "relation_type": "blocks"},
        ])
        client.delete_relation = MagicMock(return_value=None)

        result = await mcp_mod.issue_unblock(identifier="CHT-100", related="CHT-200")

        assert result["deleted"] is True
        client.delete_relation.assert_called_once_with("issue-uuid-1", "rel-1")

    async def test_issue_unblock_ambiguous_pair_asks_for_relation_id(self, mcp_mod, mock_issue):
        """Two relations between the same pair: refuse rather than guess."""
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(
            side_effect=[dict(mock_issue, id="a"), dict(mock_issue, id="b")])
        client.get_relations = MagicMock(return_value=[
            {"id": "rel-1", "related_issue_id": "b", "relation_type": "blocks"},
            {"id": "rel-2", "related_issue_id": "b", "relation_type": "relates_to"},
        ])
        client.delete_relation = MagicMock(return_value=None)

        result = await mcp_mod.issue_unblock(identifier="CHT-1", related="CHT-2")

        assert "error" in result
        assert "relation_id" in result["error"]["message"]
        client.delete_relation.assert_not_called()

    async def test_issue_unblock_no_such_relation(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(
            side_effect=[dict(mock_issue, id="a"), dict(mock_issue, id="b")])
        client.get_relations = MagicMock(return_value=[])
        result = await mcp_mod.issue_unblock(identifier="CHT-1", related="CHT-2")
        assert "error" in result

    async def test_issue_unblock_by_relation_id_skips_lookup(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue, id="a"))
        client.get_relations = MagicMock(return_value=[])
        client.delete_relation = MagicMock(return_value=None)

        await mcp_mod.issue_unblock(identifier="CHT-1", relation_id="rel-7")

        client.delete_relation.assert_called_once_with("a", "rel-7")
        client.get_relations.assert_not_called()

    async def test_issue_unblock_requires_one_of_the_two_selectors(self, mcp_mod):
        result = await mcp_mod.issue_unblock(identifier="CHT-1")
        assert "error" in result



class TestLabelTools:
    async def test_label_list(self, mcp_mod):
        from cli.main import client
        labels = [{"id": "lab-1", "name": "bug", "color": "#f00"}]
        client.get_labels = MagicMock(return_value=labels)
        assert await mcp_mod.label_list() == {"labels": labels}
        # limit=1000 so a team with >100 labels stays resolvable (CHT-1351)
        client.get_labels.assert_called_once_with("test-team-123", limit=1000)

    async def test_label_list_empty(self, mcp_mod):
        from cli.main import client
        client.get_labels = MagicMock(return_value=None)
        assert await mcp_mod.label_list() == {"labels": []}

    async def test_issue_label_add_resolves_name_to_id(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_labels = MagicMock(return_value=[{"id": "lab-1", "name": "bug"}])
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue, labels=[]))
        client.add_label_to_issue = MagicMock(return_value={})

        result = await mcp_mod.issue_label(identifier="CHT-100", add=["bug"])

        client.add_label_to_issue.assert_called_once_with("issue-uuid-1", "lab-1")
        assert result["labels_added"] == ["bug"]

    async def test_issue_label_add_is_idempotent(self, mcp_mod, mock_issue):
        """Already-present label: no call, no error."""
        from cli.main import client
        client.get_labels = MagicMock(return_value=[{"id": "lab-1", "name": "bug"}])
        client.get_issue_by_identifier = MagicMock(
            return_value=dict(mock_issue, labels=[{"id": "lab-1", "name": "bug"}]))
        client.add_label_to_issue = MagicMock(return_value={})

        result = await mcp_mod.issue_label(identifier="CHT-100", add=["bug"])

        client.add_label_to_issue.assert_not_called()
        assert result["labels_added"] == []

    async def test_issue_label_remove(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_labels = MagicMock(return_value=[{"id": "lab-1", "name": "bug"}])
        client.get_issue_by_identifier = MagicMock(
            return_value=dict(mock_issue, labels=[{"id": "lab-1", "name": "bug"}]))
        client.remove_label_from_issue = MagicMock(return_value={})

        result = await mcp_mod.issue_label(identifier="CHT-100", remove=["bug"])

        client.remove_label_from_issue.assert_called_once_with("issue-uuid-1", "lab-1")
        assert result["labels_removed"] == ["bug"]

    async def test_issue_label_remove_absent_is_a_noop(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_labels = MagicMock(return_value=[{"id": "lab-1", "name": "bug"}])
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue, labels=[]))
        client.remove_label_from_issue = MagicMock(return_value={})

        result = await mcp_mod.issue_label(identifier="CHT-100", remove=["bug"])

        client.remove_label_from_issue.assert_not_called()
        assert result["labels_removed"] == []

    async def test_issue_label_add_and_remove_in_one_call(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_labels = MagicMock(return_value=[
            {"id": "lab-1", "name": "bug"}, {"id": "lab-2", "name": "triage"}])
        client.get_issue_by_identifier = MagicMock(
            return_value=dict(mock_issue, labels=[{"id": "lab-2", "name": "triage"}]))
        client.add_label_to_issue = MagicMock(return_value={})
        client.remove_label_from_issue = MagicMock(return_value={})

        result = await mcp_mod.issue_label(identifier="CHT-100", add=["bug"], remove=["triage"])

        client.add_label_to_issue.assert_called_once_with("issue-uuid-1", "lab-1")
        client.remove_label_from_issue.assert_called_once_with("issue-uuid-1", "lab-2")
        assert result["labels_added"] == ["bug"]
        assert result["labels_removed"] == ["triage"]

    async def test_issue_label_unknown_label_is_an_error(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_labels = MagicMock(return_value=[{"id": "lab-1", "name": "bug"}])
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue, labels=[]))
        client.add_label_to_issue = MagicMock(return_value={})

        result = await mcp_mod.issue_label(identifier="CHT-100", add=["nonexistent"])

        assert "error" in result
        client.add_label_to_issue.assert_not_called()

    async def test_issue_label_requires_add_or_remove(self, mcp_mod):
        result = await mcp_mod.issue_label(identifier="CHT-100")
        assert "error" in result


# ---------------------------------------------------------------------------
# doc_list / doc_view / doc_create
# ---------------------------------------------------------------------------

class TestDocs:
    async def test_doc_list_defaults_to_current_project(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])

        result = await mcp_mod.doc_list()
        assert result == {
            "documents": [mcp_mod._compact(mock_document, mcp_mod.COMPACT_DOCUMENT_FIELDS)],
            "count": 1, "truncated": False,
        }
        assert "content" not in result["documents"][0]
        client.get_documents.assert_called_once_with(
            "test-team-123", project_id="test-project-123", search=None, limit=51,
        )
        assert (await mcp_mod.doc_list(detail=True))["documents"] == [mock_document]

    async def test_doc_list_all_projects(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])

        await mcp_mod.doc_list(all_projects=True)
        client.get_documents.assert_called_once_with(
            "test-team-123", project_id=None, search=None, limit=51,
        )

    async def test_doc_list_custom_limit(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])

        await mcp_mod.doc_list(limit=5)
        _, kwargs = client.get_documents.call_args
        assert kwargs["limit"] == 6  # limit+1 truncation probe

    async def test_doc_list_empty_returns_empty_list(self, mcp_mod):
        from cli.main import client
        client.get_documents = MagicMock(return_value=None)
        assert await mcp_mod.doc_list() == {"documents": [], "count": 0, "truncated": False}

    async def test_doc_view(self, mcp_mod, mock_document):
        from cli.main import client
        # doc_view resolves document_id (id/title/prefix) via resolve_document_id,
        # which lists team documents first -- must be mocked too.
        client.get_documents = MagicMock(return_value=[mock_document])
        client.get_document = MagicMock(return_value=dict(mock_document))
        client.get_document_comments = MagicMock(return_value=[{"id": "c1"}])
        client.get_document_issues = MagicMock(return_value=[{"identifier": "CHT-1"}])

        result = await mcp_mod.doc_view(document_id="doc-uuid-1")

        assert result["title"] == "Sprint Report"
        assert result["comments"] == [{"id": "c1"}]
        assert result["linked_issues"] == [{"identifier": "CHT-1"}]

    async def test_doc_create(self, mcp_mod, mock_document):
        from cli.main import client
        client.create_document = MagicMock(return_value=mock_document)

        result = await mcp_mod.doc_create(title="Sprint Report", content="## Summary")

        assert result == mock_document
        client.create_document.assert_called_once_with(
            "test-team-123", "Sprint Report",
            content="## Summary", icon=None, project_id="test-project-123",
        )

    async def test_issue_ready_defaults_to_current_project(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_ready_issues = MagicMock(return_value=[mock_issue])

        result = await mcp_mod.issue_ready()
        assert result == {
            "issues": [mcp_mod._compact(mock_issue, mcp_mod.COMPACT_ISSUE_FIELDS)],
            "count": 1, "truncated": False,
        }
        _, kwargs = client.get_ready_issues.call_args
        assert kwargs["limit"] == 21
        assert kwargs["project_id"] == "test-project-123"
        assert kwargs["team_id"] is None
        assert kwargs["mine"] is False
        assert kwargs["include_assigned"] is False

    async def test_issue_ready_all_projects_scopes_to_team(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_ready_issues = MagicMock(return_value=[mock_issue])

        await mcp_mod.issue_ready(all_projects=True)

        _, kwargs = client.get_ready_issues.call_args
        assert kwargs["project_id"] is None
        assert kwargs["team_id"] == "test-team-123"

    async def test_issue_ready_mine(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_ready_issues = MagicMock(return_value=[mock_issue])

        await mcp_mod.issue_ready(mine=True)

        _, kwargs = client.get_ready_issues.call_args
        assert kwargs["mine"] is True

    async def test_issue_ready_rejects_mine_with_include_assigned(self, mcp_mod):
        """Mirrors the CLI's own UsageError -- the two flags mean opposite
        things about assignment, so silently letting one win would answer
        a question the caller didn't ask.
        """
        from cli.main import client
        client.get_ready_issues = MagicMock(return_value=[])

        result = await mcp_mod.issue_ready(mine=True, include_assigned=True)

        assert "error" in result
        client.get_ready_issues.assert_not_called()

    async def test_issue_ready_empty_returns_empty_list(self, mcp_mod):
        from cli.main import client
        client.get_ready_issues = MagicMock(return_value=None)
        assert await mcp_mod.issue_ready() == {"issues": [], "count": 0, "truncated": False}


    async def test_doc_create_global(self, mcp_mod, mock_document):
        from cli.main import client
        client.create_document = MagicMock(return_value=mock_document)

        await mcp_mod.doc_create(title="Team Doc", is_global=True)

        _, kwargs = client.create_document.call_args
        assert kwargs["project_id"] is None

    async def test_doc_update_partial_only_sends_given_fields(self, mcp_mod, mock_document):
        """Omitted fields must not reach the PATCH body: the backend keys
        off model_dump(exclude_unset=True), and it's that same dict that
        decides whether the edit snapshots a new revision (CHT-1330).
        """
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.update_document = MagicMock(return_value=mock_document)

        result = await mcp_mod.doc_update(document_id="doc-uuid-1", content="## Rewritten")

        assert result == mock_document
        client.update_document.assert_called_once_with(
            "doc-uuid-1", content="## Rewritten",
        )

    async def test_doc_update_resolves_document_by_title(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.update_document = MagicMock(return_value=mock_document)

        await mcp_mod.doc_update(document_id="Sprint Report", title="Sprint Report Q3")

        args, kwargs = client.update_document.call_args
        assert args[0] == "doc-uuid-1"
        assert kwargs == {"title": "Sprint Report Q3"}

    async def test_doc_update_is_global_detaches_project(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.update_document = MagicMock(return_value=mock_document)

        await mcp_mod.doc_update(document_id="doc-uuid-1", is_global=True)

        _, kwargs = client.update_document.call_args
        assert kwargs == {"project_id": None}

    async def test_doc_update_no_fields_is_an_error(self, mcp_mod, mock_document):
        """A no-op PATCH would still bump updated_at and log an activity
        row, so refuse it at the boundary rather than pass it through.
        """
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.update_document = MagicMock(return_value=mock_document)

        result = await mcp_mod.doc_update(document_id="doc-uuid-1")

        assert "error" in result
        client.update_document.assert_not_called()

    async def test_doc_update_rejects_project_and_is_global_together(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.update_document = MagicMock(return_value=mock_document)

        result = await mcp_mod.doc_update(
            document_id="doc-uuid-1", project="OTHER", is_global=True,
        )

        assert "error" in result
        client.update_document.assert_not_called()



class TestDocLinkUnlink:
    async def test_doc_link(self, mcp_mod, mock_document, mock_issue):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.link_document_to_issue = MagicMock(return_value={})

        result = await mcp_mod.doc_link(document_id="doc-uuid-1", identifier="CHT-100")

        assert result["linked"] is True
        client.link_document_to_issue.assert_called_once_with("doc-uuid-1", "issue-uuid-1")

    async def test_doc_link_resolves_document_by_title(self, mcp_mod, mock_document, mock_issue):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.link_document_to_issue = MagicMock(return_value={})

        await mcp_mod.doc_link(document_id="Sprint Report", identifier="CHT-100")

        assert client.link_document_to_issue.call_args[0][0] == "doc-uuid-1"

    async def test_doc_unlink(self, mcp_mod, mock_document, mock_issue):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.unlink_document_from_issue = MagicMock(return_value=None)

        result = await mcp_mod.doc_unlink(document_id="doc-uuid-1", identifier="CHT-100")

        assert result["unlinked"] is True
        client.unlink_document_from_issue.assert_called_once_with("doc-uuid-1", "issue-uuid-1")

    async def test_doc_link_unknown_issue_is_an_error(self, mcp_mod, mock_document):
        from cli.main import client
        from cli.client import APIError
        client.get_documents = MagicMock(return_value=[mock_document])
        client.get_issue_by_identifier = MagicMock(side_effect=APIError("Issue not found"))
        client.link_document_to_issue = MagicMock(return_value={})

        result = await mcp_mod.doc_link(document_id="doc-uuid-1", identifier="CHT-999")

        assert "error" in result
        client.link_document_to_issue.assert_not_called()



class TestSprintTools:
    async def test_sprint_current_annotates_budget_state(self, mcp_mod):
        from cli.main import client
        client.get_current_sprint = MagicMock(return_value={
            "id": "sp-1", "name": "Sprint 1", "budget": 10, "points_spent": 4,
        })
        result = await mcp_mod.sprint_current()
        assert result["in_arrears"] is False
        assert result["arrears_by"] == 0
        assert result["points_remaining"] == 6

    async def test_sprint_current_flags_arrears(self, mcp_mod):
        from cli.main import client
        client.get_current_sprint = MagicMock(return_value={
            "id": "sp-1", "name": "Sprint 1", "budget": 13, "points_spent": 14,
        })
        result = await mcp_mod.sprint_current()
        assert result["in_arrears"] is True
        assert result["arrears_by"] == 1
        assert result["points_remaining"] == -1

    async def test_sprint_current_unlimited_budget_is_never_in_arrears(self, mcp_mod):
        from cli.main import client
        client.get_current_sprint = MagicMock(return_value={
            "id": "sp-1", "budget": None, "points_spent": 99,
        })
        result = await mcp_mod.sprint_current()
        assert result["in_arrears"] is False
        assert result["points_remaining"] is None

    async def test_sprint_list(self, mcp_mod):
        from cli.main import client
        client.get_sprints = MagicMock(return_value=[
            {"id": "sp-1", "budget": 5, "points_spent": 1},
        ])
        result = await mcp_mod.sprint_list()
        assert result["sprints"][0]["points_remaining"] == 4

    async def test_sprint_close_reports_rotation(self, mcp_mod, monkeypatch):
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_sprint_id", lambda *a, **k: "sp-1")
        client.close_sprint = MagicMock(return_value={
            "id": "sp-1", "name": "Sprint 1", "limbo": False, "budget": 5, "points_spent": 5,
        })
        client.get_current_sprint = MagicMock(return_value={
            "id": "sp-2", "name": "Sprint 2", "budget": 8, "points_spent": 0,
        })
        result = await mcp_mod.sprint_close()
        assert result["entered_limbo"] is False
        assert result["now_active"]["id"] == "sp-2" and "lookup_error" not in result
        client.close_sprint.assert_called_once_with("sp-1")

    async def test_sprint_close_reports_limbo(self, mcp_mod, monkeypatch):
        """Closing a ritual-bearing project enters limbo instead of
        rotating -- the caller has to be able to tell which happened."""
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_sprint_id", lambda *a, **k: "sp-1")
        client.close_sprint = MagicMock(return_value={
            "id": "sp-1", "name": "Sprint 1", "limbo": True, "budget": 5, "points_spent": 5,
        })
        monkeypatch.setattr(client, "get_limbo_status", MagicMock(return_value={
            "in_limbo": True, "pending_rituals": [{"name": "retro", "attestation": None}],
        }))
        result = await mcp_mod.sprint_close()
        assert result["entered_limbo"] is True
        # ...and names what limbo is waiting on (CHT-1381).
        assert [r["name"] for r in result["limbo_pending"]] == ["retro"]
        assert result["unattested"] == ["retro"]

    async def test_sprint_transactions(self, mcp_mod, monkeypatch):
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_sprint_id", lambda *a, **k: "sp-1")
        client.get_sprint_transactions = MagicMock(return_value=[{"id": "tx-1", "points": 3}])
        assert await mcp_mod.sprint_transactions() == {"transactions": [{"id": "tx-1", "points": 3}]}

    async def test_sprint_add(self, mcp_mod, mock_issue, monkeypatch):
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_sprint_id", lambda *a, **k: "sp-1")
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock(return_value={})
        client.get_sprint = MagicMock(return_value={"id": "sp-1", "name": "Sprint 7", "status": "active"})

        result = await mcp_mod.sprint_add(identifiers=["CHT-100"])

        assert result["updated"] == ["CHT-100"]
        client.update_issue.assert_called_once_with("issue-uuid-1", sprint_id="sp-1")
        # The target is named, not just a UUID (CHT-1371).
        assert result["sprint"] == {"id": "sp-1", "name": "Sprint 7"}
        assert result["sprint_id"] == "sp-1"

    async def test_sprint_add_survives_a_failed_name_lookup(self, mcp_mod, mock_issue, monkeypatch):
        """The writes already happened; the name lookup failing must not
        report the batch as an error (PR #268 review)."""
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_sprint_id", lambda *a, **k: "sp-1")
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock(return_value={})
        client.get_sprint = MagicMock(side_effect=APIError("gone", status_code=404))
        result = await mcp_mod.sprint_add(identifiers=["CHT-100"])
        assert result["updated"] == ["CHT-100"]
        assert result["sprint"] == {"id": "sp-1", "name": None}

    async def test_sprint_remove_clears_sprint_id(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock(return_value={})

        result = await mcp_mod.sprint_remove(identifiers=["CHT-100"])

        assert result["updated"] == ["CHT-100"]
        assert result["sprint"] is None
        client.update_issue.assert_called_once_with("issue-uuid-1", sprint_id=None)

    async def test_sprint_add_continues_past_a_bad_identifier(self, mcp_mod, mock_issue, monkeypatch):
        """Partial success is reported, not swallowed -- one typo in a
        batch shouldn't silently drop the rest."""
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_sprint_id", lambda *a, **k: "sp-1")
        client.get_issue_by_identifier = MagicMock(
            side_effect=[mock_issue, APIError("Issue not found")])
        client.update_issue = MagicMock(return_value={})
        client.get_sprint = MagicMock(return_value={"id": "sp-1", "name": "Sprint 7"})

        result = await mcp_mod.sprint_add(identifiers=["CHT-100", "CHT-999"])

        assert result["updated"] == ["CHT-100"]
        assert result["failed"][0]["identifier"] == "CHT-999"

    async def test_sprint_add_requires_identifiers(self, mcp_mod):
        assert "error" in await mcp_mod.sprint_add(identifiers=[])



class TestRitualTools:
    SPRINT_RITUAL = {"id": "r-1", "name": "retro", "prompt": "Write the retro.",
                     "trigger": "every_sprint", "note_required": True}
    TICKET_RITUAL = {"id": "r-2", "name": "close-gate", "prompt": "Linked the commit?",
                     "trigger": "ticket_close", "note_required": True}

    async def test_ritual_list(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.SPRINT_RITUAL])
        assert await mcp_mod.ritual_list() == {"rituals": [self.SPRINT_RITUAL]}

    async def test_ritual_pending_sprint_scope(self, mcp_mod):
        from cli.main import client
        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": True, "pending_rituals": [self.SPRINT_RITUAL],
        })
        result = await mcp_mod.ritual_pending()
        assert result["scope"] == "sprint"
        assert result["in_limbo"] is True
        assert result["unattested"] == ["retro"]

    async def test_ritual_pending_ticket_scope(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_pending_issue_rituals = MagicMock(
            return_value={"pending_rituals": [self.TICKET_RITUAL]})
        result = await mcp_mod.ritual_pending(identifier="CHT-100")
        assert result["scope"] == "ticket"
        assert result["unattested"] == ["close-gate"]

    async def test_attest_dispatches_sprint_ritual(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.SPRINT_RITUAL])
        client.attest_ritual = MagicMock(return_value={"approved_at": "now"})
        client.get_limbo_status = MagicMock(return_value={"in_limbo": False, "pending_rituals": []})

        result = await mcp_mod.ritual_attest(ritual="retro", note="Done it.")

        assert result["scope"] == "sprint"
        assert result["approved"] is True
        assert result["still_in_limbo"] is False
        client.attest_ritual.assert_called_once_with("r-1", "test-project-123", "Done it.", document_id=None, url=None)

    async def test_attest_dispatches_ticket_ritual(self, mcp_mod, mock_issue):
        """Dispatch is on the ritual's own trigger, not on the caller."""
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.TICKET_RITUAL])
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.attest_ritual_for_issue = MagicMock(return_value={"approved_at": "now"})

        result = await mcp_mod.ritual_attest(
            ritual="close-gate", note="abc123", identifier="CHT-100")

        assert result["scope"] == "ticket"
        client.attest_ritual_for_issue.assert_called_once_with("r-2", "issue-uuid-1", "abc123", document_id=None, url=None)

    async def test_attest_trigger_match_is_case_insensitive(self, mcp_mod, mock_issue):
        """The trigger can arrive as the stored enum NAME; dispatching
        case-sensitively would route ticket rituals down the sprint path."""
        from cli.main import client
        client.get_rituals = MagicMock(
            return_value=[dict(self.TICKET_RITUAL, trigger="TICKET_CLOSE")])
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.attest_ritual_for_issue = MagicMock(return_value={})

        result = await mcp_mod.ritual_attest(
            ritual="close-gate", note="x", identifier="CHT-100")

        assert result["scope"] == "ticket"
        client.attest_ritual_for_issue.assert_called_once()

    async def test_attest_ticket_ritual_without_identifier(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.TICKET_RITUAL])
        result = await mcp_mod.ritual_attest(ritual="close-gate", note="x")
        assert "error" in result
        assert "identifier" in result["error"]["message"]

    async def test_attest_missing_note_quotes_the_prompt(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.SPRINT_RITUAL])
        client.attest_ritual = MagicMock(return_value={})

        result = await mcp_mod.ritual_attest(ritual="retro")

        assert "Write the retro." in result["error"]["message"]
        client.attest_ritual.assert_not_called()

    async def test_attest_note_not_required(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(
            return_value=[dict(self.SPRINT_RITUAL, note_required=False)])
        client.attest_ritual = MagicMock(return_value={"approved_at": "now"})
        client.get_limbo_status = MagicMock(return_value={"in_limbo": False, "pending_rituals": []})

        assert "error" not in await mcp_mod.ritual_attest(ritual="retro")

    async def test_attest_unknown_ritual_lists_the_real_ones(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.SPRINT_RITUAL])
        result = await mcp_mod.ritual_attest(ritual="nope", note="x")
        assert "retro" in result["error"]["message"]

    async def test_attest_reports_pending_approval(self, mcp_mod):
        """approval_mode review/gate: attested but not cleared."""
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.SPRINT_RITUAL])
        client.attest_ritual = MagicMock(return_value={"approved_at": None})
        client.get_limbo_status = MagicMock(
            return_value={"in_limbo": True, "pending_rituals": [self.SPRINT_RITUAL]})

        result = await mcp_mod.ritual_attest(ritual="retro", note="done")

        assert result["approved"] is False
        assert result["still_in_limbo"] is True
        assert result["remaining"] == ["retro"]

    async def test_ritual_complete_sprint(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.SPRINT_RITUAL])
        client.complete_gate_ritual = MagicMock(return_value={})
        client.get_limbo_status = MagicMock(return_value={"in_limbo": False, "pending_rituals": []})

        result = await mcp_mod.ritual_complete(ritual="retro", note="signed off")

        assert result["still_in_limbo"] is False
        client.complete_gate_ritual.assert_called_once_with("r-1", "test-project-123", "signed off", document_id=None, url=None)


# ---------------------------------------------------------------------------
# activity_recent
# ---------------------------------------------------------------------------

class TestActivityRecent:
    async def test_default(self, mcp_mod):
        from cli.main import client
        activities = [{"id": "a1", "activity_type": "status_changed"}]
        client.get_team_activities = MagicMock(return_value=activities)

        result = await mcp_mod.activity_recent()
        assert result == {
            "activities": [{"id": "a1", "activity_type": "status_changed",
                            "old_value": None, "new_value": None}],
            "count": 1, "truncated": False,
        }
        client.get_team_activities.assert_called_once_with(
            "test-team-123", limit=21, project_id=None,
        )

    async def test_long_values_are_previewed(self, mcp_mod):
        """An edited description used to ship two full bodies per row (CHT-1370)."""
        from cli.main import client
        body = "x" * 1000
        client.get_team_activities = MagicMock(return_value=[
            {"id": "a1", "activity_type": "updated", "field_name": "description",
             "old_value": body, "new_value": "short"},
        ])
        row = (await mcp_mod.activity_recent())["activities"][0]
        assert row["old_value"] == "x" * 200 + "...(+800 chars)"
        assert row["new_value"] == "short"

    async def test_limit_probe_at_the_tool_maximum(self, mcp_mod):
        """The activities route has no `le` cap, so the +1 probe applies at
        the tool's own maximum too (review of CHT-1370 caught a bogus clamp)."""
        from cli.main import client
        client.get_team_activities = MagicMock(return_value=[{"id": f"a{i}"} for i in range(201)])
        result = await mcp_mod.activity_recent(limit=200)
        _, kwargs = client.get_team_activities.call_args
        assert kwargs["limit"] == 201
        assert result["count"] == 200 and result["truncated"] is True

    async def test_project_scoped(self, mcp_mod):
        from cli.main import client
        client.get_projects = MagicMock(return_value=[{"id": "p1", "key": "CHT", "name": "Chaotic"}])
        client.get_team_activities = MagicMock(return_value=[])

        await mcp_mod.activity_recent(project="CHT", limit=5)
        client.get_team_activities.assert_called_once_with(
            "test-team-123", limit=6, project_id="p1",
        )

    async def test_empty(self, mcp_mod):
        from cli.main import client
        client.get_team_activities = MagicMock(return_value=None)
        assert await mcp_mod.activity_recent() == {"activities": [], "count": 0, "truncated": False}


# ---------------------------------------------------------------------------
# project_list (CHT-1284)
# ---------------------------------------------------------------------------

class TestProjectList:
    async def test_lists_current_team_projects(self, mcp_mod):
        from cli.main import client
        projects = [
            {"id": "p1", "key": "CHT", "name": "Chaotic", "issue_count": 42},
            {"id": "p2", "key": "OPS", "name": "Ops", "issue_count": 3},
        ]
        client.get_projects = MagicMock(return_value=projects)
        result = await mcp_mod.project_list()
        assert result == {
            "projects": [mcp_mod._compact(p, mcp_mod.COMPACT_PROJECT_FIELDS) for p in projects],
            "count": 2, "truncated": False,
        }
        assert result["projects"][0]["key"] == "CHT"
        # 1000-row cap kept in parity with the HTTP transport; +1 probes truncation.
        client.get_projects.assert_called_once_with("test-team-123", limit=1001)

    async def test_description_is_previewed(self, mcp_mod):
        from cli.main import client
        client.get_projects = MagicMock(return_value=[
            {"id": "p1", "key": "CHT", "name": "Chaotic", "description": "d" * 500},
        ])
        row = (await mcp_mod.project_list())["projects"][0]
        assert row["description"] == "d" * 200 + "...(+300 chars)"
        full = (await mcp_mod.project_list(detail=True))["projects"][0]
        assert full["description"] == "d" * 500

    async def test_empty_returns_empty_list(self, mcp_mod):
        from cli.main import client
        client.get_projects = MagicMock(return_value=None)
        assert await mcp_mod.project_list() == {"projects": [], "count": 0, "truncated": False}

    async def test_no_team_selected_is_clean_error(self, mcp_mod, monkeypatch):
        # Team-scoped like activity_recent: no team -> {"error": ...}, never a crash.
        monkeypatch.setattr("cli.main.get_current_team", lambda: None)
        result = await mcp_mod.project_list()
        assert "No team selected" in result["error"]["message"]

    async def test_takes_only_detail(self, mcp_mod):
        # The stdio tool has no scoping parameters (the HTTP transport adds
        # `team`); `detail` is the shared compact/full switch (CHT-1370).
        # Guards the snapshot-parity contract at the source.
        server = mcp_mod.build_server()
        tools = await server.list_tools()
        by_name = {t.name: t for t in tools}
        assert set(by_name["project_list"].input_schema.get("properties", {})) == {"detail"}


# ---------------------------------------------------------------------------
# Integration-style: drive the real MCP protocol loop in-memory
# ---------------------------------------------------------------------------

from contextlib import asynccontextmanager


@asynccontextmanager
async def _connected_session(server):
    """A real ClientSession wired to `server` over in-memory streams.

    mcp 2.x removed the SDK's in-memory connected-session helper
    (CHT-1367); this is the same few lines it used to do: a pair of
    memory streams, the server's lowlevel run loop in a task, and an
    initialized ClientSession on the other end.

    `server._lowlevel_server` is a private SDK attribute (the removed
    helper reached for it the same way). If an SDK bump renames it, this
    helper is the one place to fix; the TestMCPProtocolLoop tests will
    fail loudly at that attribute access rather than silently pass.
    """
    import anyio
    from mcp.client.session import ClientSession
    from mcp.shared.memory import create_client_server_memory_streams

    async with create_client_server_memory_streams() as (client_streams, server_streams):
        client_read, client_write = client_streams
        server_read, server_write = server_streams
        lowlevel = server._lowlevel_server
        async with anyio.create_task_group() as tg:
            tg.start_soon(
                partial(lowlevel.run, raise_exceptions=True),
                server_read,
                server_write,
                lowlevel.create_initialization_options(),
            )
            async with ClientSession(client_read, client_write) as session:
                await session.initialize()
                yield session
            tg.cancel_scope.cancel()


class TestMCPProtocolLoop:
    """Runs a real ClientSession against a real MCPServer instance over
    in-memory streams (see _connected_session) -- exercises
    initialize/list_tools/call_tool through the actual SDK session and
    message-framing layers, not just plain Python function calls.
    """

    def test_list_tools_over_protocol(self, mcp_mod):

        async def run():
            server = mcp_mod.build_server()
            async with _connected_session(server) as session:
                result = await session.list_tools()
                return {t.name for t in result.tools}

        names = asyncio.run(run())
        assert names == {t.__name__ for t in mcp_mod.ALL_TOOLS}

    def test_call_tool_over_protocol_success(self, mcp_mod, mock_issue):
        from cli.main import client

        client.get_issues = MagicMock(return_value=[mock_issue])

        async def run():
            server = mcp_mod.build_server()
            async with _connected_session(server) as session:
                return await session.call_tool("issue_list", {})

        result = asyncio.run(run())
        assert result.is_error is not True
        text = next(c.text for c in result.content if c.type == "text")
        payload = json.loads(text)
        assert payload == {
            "issues": [mcp_mod._compact(mock_issue, mcp_mod.COMPACT_ISSUE_FIELDS)],
            "count": 1, "truncated": False,
        }

    def test_call_tool_over_protocol_error_envelope(self, mcp_mod):
        from cli.main import client

        client.get_issue_by_identifier = MagicMock(side_effect=APIError("Issue not found"))

        async def run():
            server = mcp_mod.build_server()
            async with _connected_session(server) as session:
                return await session.call_tool("issue_view", {"identifier": "CHT-999"})

        result = asyncio.run(run())
        # The shared boundary catches the error and returns a normal {"error": ...}
        # payload rather than raising -- so this is NOT an MCP-protocol-level
        # error (isError=False); the error is data, per CHT-1247's contract.
        assert result.is_error is not True
        text = next(c.text for c in result.content if c.type == "text")
        assert json.loads(text) == {"error": {"message": "Issue not found"}}

    def test_unknown_tool_is_a_protocol_error(self, mcp_mod):

        async def run():
            server = mcp_mod.build_server()
            async with _connected_session(server) as session:
                return await session.call_tool("issue_delete_everything", {})

        result = asyncio.run(run())
        assert result.is_error is True
