"""Tests for the `chaotic mcp` server (CHT-1247).

Two layers:
  * Unit tests calling each tool function directly against a mocked
    Client -- same idiom as every other cli.commands.* test (see
    conftest.py's patched_client/patched_auth/patched_project).
  * One integration-style test driving the real MCP protocol loop
    in-memory (mcp.shared.memory.create_connected_server_and_client_session),
    proving list_tools/call_tool actually round-trip through the SDK's
    session/transport layer, not just plain Python calls.
"""
import asyncio
import json
from unittest.mock import MagicMock

import pytest

from cli.client import APIError


@pytest.fixture(autouse=True)
def mock_dependencies(patched_auth, patched_project):
    """Mock config/auth before importing main (CHT-1247).

    Deliberately does NOT use conftest's `patched_client` fixture: that
    fixture swaps `sys.modules['cli.client']` for a MagicMock whose
    `.APIError` is a conftest-local `_FakeAPIError`, not the real
    class. cli.mcp_server is a brand-new module -- if ITS first-ever
    import in the test session happened while that swap was active,
    `cli.mcp_server.APIError` would permanently bind to the fake and
    every `except APIError` in `_boundary` would silently stop
    matching this file's real `from cli.client import APIError`.
    Every other cli.commands.* test file already has cli.main (and its
    real APIError binding) cached from earlier in the suite, so they
    don't hit this; a fresh module does. Individual client methods are
    still mocked directly on the shared `cli.main.client` singleton
    below, same as every other test file.
    """
    yield


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
        """The full curated toolset, no more, no less.

        Deliberately spelled out rather than counted: the count moves
        every time a tool lands, and a number in the test name tells
        you nothing about which tool went missing.
        """
        names = {t.__name__ for t in mcp_mod.ALL_TOOLS}
        assert names == {
            "activity_recent", "doc_create", "doc_link", "doc_list",
            "doc_unlink", "doc_update", "doc_view", "issue_block",
            "issue_comment", "issue_create", "issue_label", "issue_list",
            "issue_ready", "issue_relations", "issue_start", "issue_unblock",
            "issue_update", "issue_view", "label_list", "project_list",
            "ritual_attest", "ritual_complete", "ritual_list",
            "ritual_pending", "sprint_add", "sprint_close", "sprint_current",
            "sprint_list", "sprint_remove", "sprint_transactions",
        }

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
        assert set(by_name["issue_list"].inputSchema["properties"]) == {
            "status", "priority", "assignee", "label", "search", "sprint",
            "epic", "all_projects", "project", "limit", "sort_by", "order", "detail",
        }
        assert by_name["issue_view"].inputSchema["properties"]["identifier"]["type"] == "string"


# ---------------------------------------------------------------------------
# _boundary: the error envelope contract
# ---------------------------------------------------------------------------

class TestErrorBoundary:
    def test_api_error_becomes_error_envelope(self, mcp_mod):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=APIError("Issue not found"))
        result = mcp_mod.issue_view(identifier="CHT-999")
        assert result == {"error": "Issue not found"}

    def test_tool_input_error_becomes_error_envelope(self, mcp_mod):
        result = mcp_mod.issue_create(title="Nope", issue_type="not-a-real-type")
        assert "error" in result
        assert "not-a-real-type" in result["error"]

    def test_click_exception_becomes_error_envelope(self, mcp_mod, monkeypatch):
        import click
        from cli.main import client

        def _boom(*a, **k):
            raise click.ClickException("Ambiguous project name 'foo'")

        monkeypatch.setattr("cli.main.resolve_project_id", _boom)
        result = mcp_mod.issue_list(project="foo")
        assert result == {"error": "Ambiguous project name 'foo'"}

    def test_unexpected_exception_never_crashes(self, mcp_mod):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=RuntimeError("boom"))
        result = mcp_mod.issue_view(identifier="CHT-1")
        assert result["error"].startswith("Unexpected error (RuntimeError)")

    def test_not_authenticated(self, mcp_mod, monkeypatch):
        monkeypatch.setattr("cli.main.get_token", lambda: None)
        monkeypatch.setattr("cli.main.get_api_key", lambda: None)
        result = mcp_mod.issue_view(identifier="CHT-1")
        assert "Not authenticated" in result["error"]

    def test_no_team_selected(self, mcp_mod, monkeypatch):
        monkeypatch.setattr("cli.main.get_current_team", lambda: None)
        result = mcp_mod.activity_recent()
        assert "No team selected" in result["error"]

    def test_no_project_selected(self, mcp_mod, monkeypatch):
        monkeypatch.setattr("cli.main.get_current_project", lambda: None)
        result = mcp_mod.issue_list()
        assert "No project selected" in result["error"]

    def test_connect_error_gets_actionable_message(self, mcp_mod, monkeypatch):
        """Network failures mirror the CLI handle_error decorator's
        messages, not a generic Unexpected error (PR #215 review)."""
        import httpx
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=httpx.ConnectError("refused"))
        monkeypatch.setattr("cli.main.get_api_url", lambda: "http://example.test/api")
        result = mcp_mod.issue_view(identifier="CHT-1")
        assert result == {"error": "Could not connect to server at http://example.test/api. Is the server running?"}

    def test_timeout_gets_actionable_message(self, mcp_mod):
        import httpx
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=httpx.ReadTimeout("slow"))
        result = mcp_mod.issue_view(identifier="CHT-1")
        assert result == {"error": "Request timed out. The server may be overloaded or unreachable."}

    def test_other_httpx_error_gets_network_message(self, mcp_mod):
        import httpx
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=httpx.RemoteProtocolError("bad frame"))
        result = mcp_mod.issue_view(identifier="CHT-1")
        assert result == {"error": "Network error: bad frame"}


# ---------------------------------------------------------------------------
# issue_list
# ---------------------------------------------------------------------------

class TestIssueList:
    def test_defaults_to_current_project(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issues = MagicMock(return_value=[mock_issue])
        result = mcp_mod.issue_list()
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

    def test_all_projects_uses_team_scope(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issues = MagicMock(return_value=[mock_issue])
        result = mcp_mod.issue_list(all_projects=True)
        assert result["issues"] == [mcp_mod._compact(mock_issue, mcp_mod.COMPACT_ISSUE_FIELDS)]
        _, kwargs = client.get_issues.call_args
        assert kwargs["project_id"] is None
        assert kwargs["team_id"] == "test-team-123"

    def test_status_and_priority_lists_join_to_csv(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issues = MagicMock(return_value=[mock_issue])
        mcp_mod.issue_list(status=["backlog", "todo"], priority=["high", "urgent"])
        _, kwargs = client.get_issues.call_args
        assert kwargs["status"] == "backlog,todo"
        assert kwargs["priority"] == "high,urgent"

    def test_assignee_me_resolves_to_current_user(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.get_issues = MagicMock(return_value=[mock_issue])
        mcp_mod.issue_list(assignee="me")
        _, kwargs = client.get_issues.call_args
        assert kwargs["assignee_id"] == "user-1"

    def test_epic_resolves_parent_id(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value={"id": "epic-1"})
        client.get_issues = MagicMock(return_value=[mock_issue])
        mcp_mod.issue_list(epic="CHT-1")
        _, kwargs = client.get_issues.call_args
        assert kwargs["parent_id"] == "epic-1"

    def test_empty_result(self, mcp_mod):
        from cli.main import client
        client.get_issues = MagicMock(return_value=[])
        assert mcp_mod.issue_list() == {"issues": [], "count": 0, "truncated": False}

    def test_detail_returns_full_rows(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issues = MagicMock(return_value=[mock_issue])
        result = mcp_mod.issue_list(detail=True)
        assert result["issues"] == [mock_issue]
        assert result["issues"][0]["description"] == "Broken widget."

    def test_truncated_when_limit_cuts_the_list(self, mcp_mod, mock_issue):
        """limit+1 rows come back -> truncated=true and exactly `limit` rows."""
        from cli.main import client
        rows = [dict(mock_issue, identifier=f"CHT-{i}") for i in range(3)]
        client.get_issues = MagicMock(return_value=rows)
        result = mcp_mod.issue_list(limit=2)
        assert result["count"] == 2
        assert result["truncated"] is True
        assert [r["identifier"] for r in result["issues"]] == ["CHT-0", "CHT-1"]

    def test_priority_sort_probes_by_offset_not_overfetch(self, mcp_mod, mock_issue):
        """For sort keys the service re-sorts in Python after a SQL LIMIT
        (priority, status), over-fetching limit+1 would let the re-sort drop
        the wrong row. So: fetch exactly `limit`, and probe offset=limit."""
        from cli.main import client
        rows = [dict(mock_issue, identifier=f"CHT-{i}") for i in range(2)]
        client.get_issues = MagicMock(side_effect=[rows, [dict(mock_issue, identifier="CHT-9")]])
        result = mcp_mod.issue_list(limit=2, sort_by="priority")
        assert [r["identifier"] for r in result["issues"]] == ["CHT-0", "CHT-1"]
        assert result["count"] == 2 and result["truncated"] is True
        first, probe = client.get_issues.call_args_list
        assert first.kwargs["limit"] == 2 and first.kwargs["sort_by"] == "priority"
        assert probe.kwargs["skip"] == 2 and probe.kwargs["limit"] == 1
        assert probe.kwargs["project_id"] == first.kwargs["project_id"]

    def test_priority_sort_not_truncated_when_probe_is_empty(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issues = MagicMock(side_effect=[[mock_issue], []])
        result = mcp_mod.issue_list(limit=2, sort_by="status")
        assert result["count"] == 1 and result["truncated"] is False

    def test_compact_row_flattens_labels_to_names(self, mcp_mod, mock_issue):
        from cli.main import client
        row = dict(mock_issue, labels=[{"id": "l1", "name": "bug", "color": "#f00", "team_id": "t"}])
        client.get_issues = MagicMock(return_value=[row])
        assert mcp_mod.issue_list()["issues"][0]["labels"] == ["bug"]

    def test_sprint_with_all_projects_is_rejected(self, mcp_mod):
        """Sprints are project-scoped; the CLI rejects --sprint with
        --all-projects and the MCP tool must too (PR #215 review)."""
        from cli.main import client
        client.get_issues = MagicMock()
        result = mcp_mod.issue_list(all_projects=True, sprint="current")
        assert "Cannot combine `sprint` with all_projects" in result["error"]
        client.get_issues.assert_not_called()

    def test_explicit_project_wins_over_all_projects(self, mcp_mod, mock_issue, monkeypatch):
        """Same precedence as doc_list/doc_create: an explicit `project`
        always scopes to that project, even with all_projects=true
        (PR #215 review -- previously `project` was silently dropped)."""
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_project_id", lambda ident: "explicit-project-1")
        client.get_issues = MagicMock(return_value=[mock_issue])

        mcp_mod.issue_list(all_projects=True, project="CHT")

        _, kwargs = client.get_issues.call_args
        assert kwargs["project_id"] == "explicit-project-1"
        assert kwargs["team_id"] is None

    def test_sprint_resolves_against_explicit_project(self, mcp_mod, mock_issue, monkeypatch):
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_project_id", lambda ident: "explicit-project-1")
        resolve_sprint = MagicMock(return_value="sprint-1")
        monkeypatch.setattr("cli.main.resolve_sprint_id", resolve_sprint)
        client.get_issues = MagicMock(return_value=[mock_issue])

        mcp_mod.issue_list(project="CHT", sprint="current")

        resolve_sprint.assert_called_once_with("current", "explicit-project-1")
        _, kwargs = client.get_issues.call_args
        assert kwargs["sprint_id"] == "sprint-1"


# ---------------------------------------------------------------------------
# issue_view
# ---------------------------------------------------------------------------

class TestIssueView:
    def test_view_merges_comments_and_sub_issues(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.get_comments = MagicMock(return_value=[{"id": "c1", "content": "hi"}])
        client.get_sub_issues = MagicMock(return_value=[{"id": "sub-1", "identifier": "CHT-101"}])

        result = mcp_mod.issue_view(identifier="CHT-100")

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

    def test_view_caps_comments_to_newest(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        comments = [{"id": f"c{i}"} for i in range(25)]  # oldest first, as the API returns them
        client.get_comments = MagicMock(return_value=comments)
        client.get_sub_issues = MagicMock(return_value=[])
        result = mcp_mod.issue_view(identifier="CHT-100")
        assert result["comment_count"] == 25
        assert len(result["comments"]) == mcp_mod.ISSUE_VIEW_COMMENT_CAP == 20
        assert result["comments"][-1] == {"id": "c24"}

    def test_sub_issues_api_error_degrades_to_empty_list(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.get_comments = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(side_effect=APIError("not supported"))

        result = mcp_mod.issue_view(identifier="CHT-100")
        assert result["sub_issues"] == []

    def test_not_found(self, mcp_mod):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(side_effect=APIError("Issue not found"))
        assert mcp_mod.issue_view(identifier="CHT-999") == {"error": "Issue not found"}


# ---------------------------------------------------------------------------
# issue_create
# ---------------------------------------------------------------------------

class TestIssueCreate:
    def test_create_minimal(self, mcp_mod, mock_issue):
        from cli.main import client
        client.create_issue = MagicMock(return_value=mock_issue)

        result = mcp_mod.issue_create(title="Fix the widget")

        assert result == mock_issue
        client.create_issue.assert_called_once_with(
            "test-project-123", "Fix the widget",
            description=None, status="backlog", priority="no_priority", issue_type="task",
        )

    def test_create_resolves_issue_type_alias(self, mcp_mod, mock_issue):
        from cli.main import client
        client.create_issue = MagicMock(return_value=mock_issue)

        mcp_mod.issue_create(title="X", issue_type="feat")

        _, kwargs = client.create_issue.call_args
        assert kwargs["issue_type"] == "feature"

    def test_create_with_parent_resolves_parent_id(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value={"id": "epic-1"})
        client.create_issue = MagicMock(return_value=mock_issue)

        mcp_mod.issue_create(title="Sub-issue", parent="CHT-1")

        _, kwargs = client.create_issue.call_args
        assert kwargs["parent_id"] == "epic-1"

    def test_create_with_estimate(self, mcp_mod, mock_issue):
        from cli.main import client
        client.create_issue = MagicMock(return_value=mock_issue)

        mcp_mod.issue_create(title="X", estimate=5)

        _, kwargs = client.create_issue.call_args
        assert kwargs["estimate"] == 5

    def test_create_invalid_issue_type(self, mcp_mod):
        result = mcp_mod.issue_create(title="X", issue_type="bogus")
        assert "error" in result

    def test_create_no_project_selected(self, mcp_mod, monkeypatch):
        monkeypatch.setattr("cli.main.get_current_project", lambda: None)
        result = mcp_mod.issue_create(title="X")
        assert "No project selected" in result["error"]


# ---------------------------------------------------------------------------
# issue_update
# ---------------------------------------------------------------------------

class TestIssueUpdate:
    def test_update_status_and_priority(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=None)

        mcp_mod.issue_update(identifier="CHT-100", status="done", priority="urgent")

        client.update_issue.assert_called_once_with("issue-uuid-1", status="done", priority="urgent")

    def test_update_estimate(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=None)

        mcp_mod.issue_update(identifier="CHT-100", estimate=8)

        client.update_issue.assert_called_once_with("issue-uuid-1", estimate=8)

    def test_update_assignee_me(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.update_issue = MagicMock(return_value=None)

        mcp_mod.issue_update(identifier="CHT-100", assignee="me")

        client.update_issue.assert_called_once_with("issue-uuid-1", assignee_id="user-1")

    def test_update_assignee_unassigned_clears(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=None)

        mcp_mod.issue_update(identifier="CHT-100", assignee="unassigned")

        client.update_issue.assert_called_once_with("issue-uuid-1", assignee_id=None)

    def test_update_no_fields_is_an_error(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        result = mcp_mod.issue_update(identifier="CHT-100")
        assert "No fields provided" in result["error"]

    def test_update_returns_refetched_issue(self, mcp_mod, mock_issue):
        from cli.main import client
        updated = dict(mock_issue, status="done")
        client.get_issue_by_identifier = MagicMock(side_effect=[dict(mock_issue), updated])
        client.update_issue = MagicMock(return_value=None)

        result = mcp_mod.issue_update(identifier="CHT-100", status="done")

        assert result == updated

    def test_update_attest_records_notes_before_close(self, mcp_mod, mock_issue):
        """CHT-1326: the attest param satisfies note-required rituals in
        the same call so a non-interactive close is never stranded."""
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=None)
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [
                {"id": "rit-1", "name": "close-gate", "approval_mode": "auto"},
                {"id": "rit-2", "name": "doc-refresh", "approval_mode": "auto"},
            ],
            "completed_rituals": [],
        })
        client.attest_ritual_for_issue = MagicMock(return_value={"approved_at": "x"})

        result = mcp_mod.issue_update(
            identifier="CHT-100", status="done",
            attest={"close-gate": "ADR written", "doc-refresh": "README updated"},
        )

        assert "error" not in result
        client.attest_ritual_for_issue.assert_any_call("rit-1", "issue-uuid-1", "ADR written")
        client.attest_ritual_for_issue.assert_any_call("rit-2", "issue-uuid-1", "README updated")
        client.update_issue.assert_called_once_with("issue-uuid-1", status="done")

    def test_update_attest_unknown_ritual_is_an_error(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=None)
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [
                {"id": "rit-1", "name": "close-gate", "approval_mode": "auto"},
            ],
            "completed_rituals": [],
        })

        result = mcp_mod.issue_update(
            identifier="CHT-100", status="done", attest={"bogus": "note"},
        )

        assert "not a pending ticket ritual" in result["error"]
        client.update_issue.assert_not_called()

    def test_update_attest_only_is_allowed(self, mcp_mod, mock_issue):
        """attest with no field updates is a valid call — attesting the
        last ritual may auto-transition server-side."""
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=None)
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [
                {"id": "rit-1", "name": "close-gate", "approval_mode": "auto"},
            ],
            "completed_rituals": [],
        })
        client.attest_ritual_for_issue = MagicMock(return_value={"approved_at": "x"})

        result = mcp_mod.issue_update(
            identifier="CHT-100", attest={"close-gate": "note"},
        )

        assert "error" not in result
        client.attest_ritual_for_issue.assert_called_once_with("rit-1", "issue-uuid-1", "note")
        client.update_issue.assert_not_called()

    def test_update_attest_gate_routes_to_gate_completion(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.update_issue = MagicMock(return_value=None)
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [
                {"id": "rit-g", "name": "gate-check", "approval_mode": "gate"},
            ],
            "completed_rituals": [],
        })
        client.complete_gate_ritual_for_issue = MagicMock(return_value={})
        client.attest_ritual_for_issue = MagicMock()

        result = mcp_mod.issue_update(
            identifier="CHT-100", status="done", attest={"gate-check": "verified"},
        )

        assert "error" not in result
        client.complete_gate_ritual_for_issue.assert_called_once_with(
            "rit-g", "issue-uuid-1", "verified")
        client.attest_ritual_for_issue.assert_not_called()


# ---------------------------------------------------------------------------
# issue_comment
# ---------------------------------------------------------------------------

class TestIssueComment:
    def test_comment(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        comment = {"id": "c1", "content": "hello"}
        client.create_comment = MagicMock(return_value=comment)

        result = mcp_mod.issue_comment(identifier="CHT-100", content="hello")

        assert result == comment
        client.create_comment.assert_called_once_with("issue-uuid-1", "hello")

    def test_comment_with_assign(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue))
        client.create_comment = MagicMock(return_value={"id": "c1"})
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.update_issue = MagicMock(return_value=None)

        mcp_mod.issue_comment(identifier="CHT-100", content="hi", assign_to="me")

        client.update_issue.assert_called_once_with("issue-uuid-1", assignee_id="user-1")


# ---------------------------------------------------------------------------
# issue_start
# ---------------------------------------------------------------------------

class TestIssueStart:
    def test_start_assigns_and_moves_in_progress(self, mcp_mod, mock_issue):
        from cli.main import client
        started = dict(mock_issue, status="in_progress", assignee_id="user-1")
        client.get_issue_by_identifier = MagicMock(side_effect=[dict(mock_issue), started])
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.update_issue = MagicMock(return_value=None)

        result = mcp_mod.issue_start(identifier="CHT-100")

        client.update_issue.assert_called_once_with("issue-uuid-1", assignee_id="user-1", status="in_progress")
        assert result == started



class TestIssueStartClaimParity:
    """CHT-1342: issue_start is the CLI's `issue claim` alias, so it has
    to carry claim's --attest and --lease. Without attest, a ticket with
    a claim ritual simply could not be started through this tool.
    """

    RITUAL = {"id": "r-1", "name": "claim-gate", "approval_mode": "auto",
              "attestation": None}

    def test_start_attests_claim_ritual_before_claiming(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.get_pending_issue_rituals = MagicMock(
            return_value={"pending_rituals": [self.RITUAL], "completed_rituals": []})
        client.attest_ritual_for_issue = MagicMock(return_value={})
        client.update_issue = MagicMock(return_value={})

        mcp_mod.issue_start(identifier="CHT-100", attest={"claim-gate": "branch cut"})

        client.attest_ritual_for_issue.assert_called_once_with(
            "r-1", "issue-uuid-1", "branch cut")
        # Attestation happens before the claim, not after.
        assert client.update_issue.called

    def test_start_passes_lease_seconds(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.update_issue = MagicMock(return_value={})

        mcp_mod.issue_start(identifier="CHT-100", lease_seconds=14400)

        _, kwargs = client.update_issue.call_args
        assert kwargs["lease_seconds"] == 14400

    def test_start_omits_lease_when_not_given(self, mcp_mod, mock_issue):
        """No lease means server default, not an explicit null."""
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.update_issue = MagicMock(return_value={})

        mcp_mod.issue_start(identifier="CHT-100")

        _, kwargs = client.update_issue.call_args
        assert "lease_seconds" not in kwargs

    def test_start_rejects_empty_attestation_note(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_pending_issue_rituals = MagicMock(
            return_value={"pending_rituals": [self.RITUAL], "completed_rituals": []})
        client.update_issue = MagicMock(return_value={})

        result = mcp_mod.issue_start(identifier="CHT-100", attest={"claim-gate": "  "})

        assert "error" in result
        client.update_issue.assert_not_called()

    def test_start_attesting_an_already_done_ritual_is_idempotent(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_me = MagicMock(return_value={"id": "user-1"})
        client.get_pending_issue_rituals = MagicMock(
            return_value={"pending_rituals": [],
                          "completed_rituals": [{"name": "claim-gate"}]})
        client.attest_ritual_for_issue = MagicMock(return_value={})
        client.update_issue = MagicMock(return_value={})

        result = mcp_mod.issue_start(identifier="CHT-100", attest={"claim-gate": "done"})

        assert "error" not in result
        client.attest_ritual_for_issue.assert_not_called()

    def test_start_unknown_ritual_names_the_pending_ones(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_pending_issue_rituals = MagicMock(
            return_value={"pending_rituals": [self.RITUAL], "completed_rituals": []})
        client.update_issue = MagicMock(return_value={})

        result = mcp_mod.issue_start(identifier="CHT-100", attest={"wrong-name": "x"})

        assert "claim-gate" in result["error"]
        client.update_issue.assert_not_called()


class TestIssueRelations:
    def test_issue_relations(self, mcp_mod, mock_issue):
        from cli.main import client
        rels = [{"id": "rel-1", "related_issue_id": "issue-uuid-2",
                 "relation_type": "blocked_by", "direction": "incoming"}]
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_relations = MagicMock(return_value=rels)

        assert mcp_mod.issue_relations(identifier="CHT-100") == {"relations": rels}
        client.get_relations.assert_called_once_with("issue-uuid-1")

    def test_issue_relations_empty(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_relations = MagicMock(return_value=None)
        assert mcp_mod.issue_relations(identifier="CHT-100") == {"relations": []}

    def test_issue_block_direction(self, mcp_mod, mock_issue):
        """`identifier` blocks `blocked` -- the first issue is the blocker."""
        from cli.main import client
        blocker = dict(mock_issue, id="issue-uuid-1", identifier="CHT-100")
        blocked = dict(mock_issue, id="issue-uuid-2", identifier="CHT-200")
        client.get_issue_by_identifier = MagicMock(side_effect=[blocker, blocked])
        client.create_relation = MagicMock(return_value={"id": "rel-1"})

        mcp_mod.issue_block(identifier="CHT-100", blocked="CHT-200")

        client.create_relation.assert_called_once_with(
            "issue-uuid-1", "issue-uuid-2", "blocks",
        )

    def test_issue_block_custom_type(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(
            side_effect=[dict(mock_issue, id="a"), dict(mock_issue, id="b")])
        client.create_relation = MagicMock(return_value={"id": "rel-1"})

        mcp_mod.issue_block(identifier="CHT-1", blocked="CHT-2", relation_type="duplicates")

        assert client.create_relation.call_args[0][2] == "duplicates"

    def test_issue_unblock_resolves_relation_from_the_other_issue(self, mcp_mod, mock_issue):
        from cli.main import client
        iss = dict(mock_issue, id="issue-uuid-1")
        other = dict(mock_issue, id="issue-uuid-2")
        client.get_issue_by_identifier = MagicMock(side_effect=[iss, other])
        client.get_relations = MagicMock(return_value=[
            {"id": "rel-1", "related_issue_id": "issue-uuid-2", "relation_type": "blocks"},
            {"id": "rel-9", "related_issue_id": "issue-uuid-9", "relation_type": "blocks"},
        ])
        client.delete_relation = MagicMock(return_value=None)

        result = mcp_mod.issue_unblock(identifier="CHT-100", related="CHT-200")

        assert result["deleted"] is True
        client.delete_relation.assert_called_once_with("issue-uuid-1", "rel-1")

    def test_issue_unblock_ambiguous_pair_asks_for_relation_id(self, mcp_mod, mock_issue):
        """Two relations between the same pair: refuse rather than guess."""
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(
            side_effect=[dict(mock_issue, id="a"), dict(mock_issue, id="b")])
        client.get_relations = MagicMock(return_value=[
            {"id": "rel-1", "related_issue_id": "b", "relation_type": "blocks"},
            {"id": "rel-2", "related_issue_id": "b", "relation_type": "relates_to"},
        ])
        client.delete_relation = MagicMock(return_value=None)

        result = mcp_mod.issue_unblock(identifier="CHT-1", related="CHT-2")

        assert "error" in result
        assert "relation_id" in result["error"]
        client.delete_relation.assert_not_called()

    def test_issue_unblock_no_such_relation(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(
            side_effect=[dict(mock_issue, id="a"), dict(mock_issue, id="b")])
        client.get_relations = MagicMock(return_value=[])
        result = mcp_mod.issue_unblock(identifier="CHT-1", related="CHT-2")
        assert "error" in result

    def test_issue_unblock_by_relation_id_skips_lookup(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue, id="a"))
        client.get_relations = MagicMock(return_value=[])
        client.delete_relation = MagicMock(return_value=None)

        mcp_mod.issue_unblock(identifier="CHT-1", relation_id="rel-7")

        client.delete_relation.assert_called_once_with("a", "rel-7")
        client.get_relations.assert_not_called()

    def test_issue_unblock_requires_one_of_the_two_selectors(self, mcp_mod):
        result = mcp_mod.issue_unblock(identifier="CHT-1")
        assert "error" in result



class TestLabelTools:
    def test_label_list(self, mcp_mod):
        from cli.main import client
        labels = [{"id": "lab-1", "name": "bug", "color": "#f00"}]
        client.get_labels = MagicMock(return_value=labels)
        assert mcp_mod.label_list() == {"labels": labels}
        # limit=1000 so a team with >100 labels stays resolvable (CHT-1351)
        client.get_labels.assert_called_once_with("test-team-123", limit=1000)

    def test_label_list_empty(self, mcp_mod):
        from cli.main import client
        client.get_labels = MagicMock(return_value=None)
        assert mcp_mod.label_list() == {"labels": []}

    def test_issue_label_add_resolves_name_to_id(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_labels = MagicMock(return_value=[{"id": "lab-1", "name": "bug"}])
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue, labels=[]))
        client.add_label_to_issue = MagicMock(return_value={})

        result = mcp_mod.issue_label(identifier="CHT-100", add=["bug"])

        client.add_label_to_issue.assert_called_once_with("issue-uuid-1", "lab-1")
        assert result["labels_added"] == ["bug"]

    def test_issue_label_add_is_idempotent(self, mcp_mod, mock_issue):
        """Already-present label: no call, no error."""
        from cli.main import client
        client.get_labels = MagicMock(return_value=[{"id": "lab-1", "name": "bug"}])
        client.get_issue_by_identifier = MagicMock(
            return_value=dict(mock_issue, labels=[{"id": "lab-1", "name": "bug"}]))
        client.add_label_to_issue = MagicMock(return_value={})

        result = mcp_mod.issue_label(identifier="CHT-100", add=["bug"])

        client.add_label_to_issue.assert_not_called()
        assert result["labels_added"] == []

    def test_issue_label_remove(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_labels = MagicMock(return_value=[{"id": "lab-1", "name": "bug"}])
        client.get_issue_by_identifier = MagicMock(
            return_value=dict(mock_issue, labels=[{"id": "lab-1", "name": "bug"}]))
        client.remove_label_from_issue = MagicMock(return_value={})

        result = mcp_mod.issue_label(identifier="CHT-100", remove=["bug"])

        client.remove_label_from_issue.assert_called_once_with("issue-uuid-1", "lab-1")
        assert result["labels_removed"] == ["bug"]

    def test_issue_label_remove_absent_is_a_noop(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_labels = MagicMock(return_value=[{"id": "lab-1", "name": "bug"}])
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue, labels=[]))
        client.remove_label_from_issue = MagicMock(return_value={})

        result = mcp_mod.issue_label(identifier="CHT-100", remove=["bug"])

        client.remove_label_from_issue.assert_not_called()
        assert result["labels_removed"] == []

    def test_issue_label_add_and_remove_in_one_call(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_labels = MagicMock(return_value=[
            {"id": "lab-1", "name": "bug"}, {"id": "lab-2", "name": "triage"}])
        client.get_issue_by_identifier = MagicMock(
            return_value=dict(mock_issue, labels=[{"id": "lab-2", "name": "triage"}]))
        client.add_label_to_issue = MagicMock(return_value={})
        client.remove_label_from_issue = MagicMock(return_value={})

        result = mcp_mod.issue_label(identifier="CHT-100", add=["bug"], remove=["triage"])

        client.add_label_to_issue.assert_called_once_with("issue-uuid-1", "lab-1")
        client.remove_label_from_issue.assert_called_once_with("issue-uuid-1", "lab-2")
        assert result["labels_added"] == ["bug"]
        assert result["labels_removed"] == ["triage"]

    def test_issue_label_unknown_label_is_an_error(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_labels = MagicMock(return_value=[{"id": "lab-1", "name": "bug"}])
        client.get_issue_by_identifier = MagicMock(return_value=dict(mock_issue, labels=[]))
        client.add_label_to_issue = MagicMock(return_value={})

        result = mcp_mod.issue_label(identifier="CHT-100", add=["nonexistent"])

        assert "error" in result
        client.add_label_to_issue.assert_not_called()

    def test_issue_label_requires_add_or_remove(self, mcp_mod):
        result = mcp_mod.issue_label(identifier="CHT-100")
        assert "error" in result


# ---------------------------------------------------------------------------
# doc_list / doc_view / doc_create
# ---------------------------------------------------------------------------

class TestDocs:
    def test_doc_list_defaults_to_current_project(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])

        result = mcp_mod.doc_list()
        assert result == {
            "documents": [mcp_mod._compact(mock_document, mcp_mod.COMPACT_DOCUMENT_FIELDS)],
            "count": 1, "truncated": False,
        }
        assert "content" not in result["documents"][0]
        client.get_documents.assert_called_once_with(
            "test-team-123", project_id="test-project-123", search=None, limit=51,
        )
        assert mcp_mod.doc_list(detail=True)["documents"] == [mock_document]

    def test_doc_list_all_projects(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])

        mcp_mod.doc_list(all_projects=True)
        client.get_documents.assert_called_once_with(
            "test-team-123", project_id=None, search=None, limit=51,
        )

    def test_doc_list_custom_limit(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])

        mcp_mod.doc_list(limit=5)
        _, kwargs = client.get_documents.call_args
        assert kwargs["limit"] == 6  # limit+1 truncation probe

    def test_doc_list_empty_returns_empty_list(self, mcp_mod):
        from cli.main import client
        client.get_documents = MagicMock(return_value=None)
        assert mcp_mod.doc_list() == {"documents": [], "count": 0, "truncated": False}

    def test_doc_view(self, mcp_mod, mock_document):
        from cli.main import client
        # doc_view resolves document_id (id/title/prefix) via resolve_document_id,
        # which lists team documents first -- must be mocked too.
        client.get_documents = MagicMock(return_value=[mock_document])
        client.get_document = MagicMock(return_value=dict(mock_document))
        client.get_document_comments = MagicMock(return_value=[{"id": "c1"}])
        client.get_document_issues = MagicMock(return_value=[{"identifier": "CHT-1"}])

        result = mcp_mod.doc_view(document_id="doc-uuid-1")

        assert result["title"] == "Sprint Report"
        assert result["comments"] == [{"id": "c1"}]
        assert result["linked_issues"] == [{"identifier": "CHT-1"}]

    def test_doc_create(self, mcp_mod, mock_document):
        from cli.main import client
        client.create_document = MagicMock(return_value=mock_document)

        result = mcp_mod.doc_create(title="Sprint Report", content="## Summary")

        assert result == mock_document
        client.create_document.assert_called_once_with(
            "test-team-123", "Sprint Report",
            content="## Summary", icon=None, project_id="test-project-123",
        )

    def test_issue_ready_defaults_to_current_project(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_ready_issues = MagicMock(return_value=[mock_issue])

        result = mcp_mod.issue_ready()
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

    def test_issue_ready_all_projects_scopes_to_team(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_ready_issues = MagicMock(return_value=[mock_issue])

        mcp_mod.issue_ready(all_projects=True)

        _, kwargs = client.get_ready_issues.call_args
        assert kwargs["project_id"] is None
        assert kwargs["team_id"] == "test-team-123"

    def test_issue_ready_mine(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_ready_issues = MagicMock(return_value=[mock_issue])

        mcp_mod.issue_ready(mine=True)

        _, kwargs = client.get_ready_issues.call_args
        assert kwargs["mine"] is True

    def test_issue_ready_rejects_mine_with_include_assigned(self, mcp_mod):
        """Mirrors the CLI's own UsageError -- the two flags mean opposite
        things about assignment, so silently letting one win would answer
        a question the caller didn't ask.
        """
        from cli.main import client
        client.get_ready_issues = MagicMock(return_value=[])

        result = mcp_mod.issue_ready(mine=True, include_assigned=True)

        assert "error" in result
        client.get_ready_issues.assert_not_called()

    def test_issue_ready_empty_returns_empty_list(self, mcp_mod):
        from cli.main import client
        client.get_ready_issues = MagicMock(return_value=None)
        assert mcp_mod.issue_ready() == {"issues": [], "count": 0, "truncated": False}


    def test_doc_create_global(self, mcp_mod, mock_document):
        from cli.main import client
        client.create_document = MagicMock(return_value=mock_document)

        mcp_mod.doc_create(title="Team Doc", is_global=True)

        _, kwargs = client.create_document.call_args
        assert kwargs["project_id"] is None

    def test_doc_update_partial_only_sends_given_fields(self, mcp_mod, mock_document):
        """Omitted fields must not reach the PATCH body: the backend keys
        off model_dump(exclude_unset=True), and it's that same dict that
        decides whether the edit snapshots a new revision (CHT-1330).
        """
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.update_document = MagicMock(return_value=mock_document)

        result = mcp_mod.doc_update(document_id="doc-uuid-1", content="## Rewritten")

        assert result == mock_document
        client.update_document.assert_called_once_with(
            "doc-uuid-1", content="## Rewritten",
        )

    def test_doc_update_resolves_document_by_title(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.update_document = MagicMock(return_value=mock_document)

        mcp_mod.doc_update(document_id="Sprint Report", title="Sprint Report Q3")

        args, kwargs = client.update_document.call_args
        assert args[0] == "doc-uuid-1"
        assert kwargs == {"title": "Sprint Report Q3"}

    def test_doc_update_is_global_detaches_project(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.update_document = MagicMock(return_value=mock_document)

        mcp_mod.doc_update(document_id="doc-uuid-1", is_global=True)

        _, kwargs = client.update_document.call_args
        assert kwargs == {"project_id": None}

    def test_doc_update_no_fields_is_an_error(self, mcp_mod, mock_document):
        """A no-op PATCH would still bump updated_at and log an activity
        row, so refuse it at the boundary rather than pass it through.
        """
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.update_document = MagicMock(return_value=mock_document)

        result = mcp_mod.doc_update(document_id="doc-uuid-1")

        assert "error" in result
        client.update_document.assert_not_called()

    def test_doc_update_rejects_project_and_is_global_together(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.update_document = MagicMock(return_value=mock_document)

        result = mcp_mod.doc_update(
            document_id="doc-uuid-1", project="OTHER", is_global=True,
        )

        assert "error" in result
        client.update_document.assert_not_called()



class TestDocLinkUnlink:
    def test_doc_link(self, mcp_mod, mock_document, mock_issue):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.link_document_to_issue = MagicMock(return_value={})

        result = mcp_mod.doc_link(document_id="doc-uuid-1", identifier="CHT-100")

        assert result["linked"] is True
        client.link_document_to_issue.assert_called_once_with("doc-uuid-1", "issue-uuid-1")

    def test_doc_link_resolves_document_by_title(self, mcp_mod, mock_document, mock_issue):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.link_document_to_issue = MagicMock(return_value={})

        mcp_mod.doc_link(document_id="Sprint Report", identifier="CHT-100")

        assert client.link_document_to_issue.call_args[0][0] == "doc-uuid-1"

    def test_doc_unlink(self, mcp_mod, mock_document, mock_issue):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.unlink_document_from_issue = MagicMock(return_value=None)

        result = mcp_mod.doc_unlink(document_id="doc-uuid-1", identifier="CHT-100")

        assert result["unlinked"] is True
        client.unlink_document_from_issue.assert_called_once_with("doc-uuid-1", "issue-uuid-1")

    def test_doc_link_unknown_issue_is_an_error(self, mcp_mod, mock_document):
        from cli.main import client
        from cli.client import APIError
        client.get_documents = MagicMock(return_value=[mock_document])
        client.get_issue_by_identifier = MagicMock(side_effect=APIError("Issue not found"))
        client.link_document_to_issue = MagicMock(return_value={})

        result = mcp_mod.doc_link(document_id="doc-uuid-1", identifier="CHT-999")

        assert "error" in result
        client.link_document_to_issue.assert_not_called()



class TestSprintTools:
    def test_sprint_current_annotates_budget_state(self, mcp_mod):
        from cli.main import client
        client.get_current_sprint = MagicMock(return_value={
            "id": "sp-1", "name": "Sprint 1", "budget": 10, "points_spent": 4,
        })
        result = mcp_mod.sprint_current()
        assert result["in_arrears"] is False
        assert result["arrears_by"] == 0
        assert result["points_remaining"] == 6

    def test_sprint_current_flags_arrears(self, mcp_mod):
        from cli.main import client
        client.get_current_sprint = MagicMock(return_value={
            "id": "sp-1", "name": "Sprint 1", "budget": 13, "points_spent": 14,
        })
        result = mcp_mod.sprint_current()
        assert result["in_arrears"] is True
        assert result["arrears_by"] == 1
        assert result["points_remaining"] == -1

    def test_sprint_current_unlimited_budget_is_never_in_arrears(self, mcp_mod):
        from cli.main import client
        client.get_current_sprint = MagicMock(return_value={
            "id": "sp-1", "budget": None, "points_spent": 99,
        })
        result = mcp_mod.sprint_current()
        assert result["in_arrears"] is False
        assert result["points_remaining"] is None

    def test_sprint_list(self, mcp_mod):
        from cli.main import client
        client.get_sprints = MagicMock(return_value=[
            {"id": "sp-1", "budget": 5, "points_spent": 1},
        ])
        result = mcp_mod.sprint_list()
        assert result["sprints"][0]["points_remaining"] == 4

    def test_sprint_close_reports_rotation(self, mcp_mod, monkeypatch):
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_sprint_id", lambda *a, **k: "sp-1")
        client.close_sprint = MagicMock(return_value={
            "id": "sp-1", "name": "Sprint 1", "limbo": False, "budget": 5, "points_spent": 5,
        })
        result = mcp_mod.sprint_close()
        assert result["entered_limbo"] is False
        client.close_sprint.assert_called_once_with("sp-1")

    def test_sprint_close_reports_limbo(self, mcp_mod, monkeypatch):
        """Closing a ritual-bearing project enters limbo instead of
        rotating -- the caller has to be able to tell which happened."""
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_sprint_id", lambda *a, **k: "sp-1")
        client.close_sprint = MagicMock(return_value={
            "id": "sp-1", "name": "Sprint 1", "limbo": True, "budget": 5, "points_spent": 5,
        })
        result = mcp_mod.sprint_close()
        assert result["entered_limbo"] is True

    def test_sprint_transactions(self, mcp_mod, monkeypatch):
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_sprint_id", lambda *a, **k: "sp-1")
        client.get_sprint_transactions = MagicMock(return_value=[{"id": "tx-1", "points": 3}])
        assert mcp_mod.sprint_transactions() == {"transactions": [{"id": "tx-1", "points": 3}]}

    def test_sprint_add(self, mcp_mod, mock_issue, monkeypatch):
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_sprint_id", lambda *a, **k: "sp-1")
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock(return_value={})
        client.get_sprint = MagicMock(return_value={"id": "sp-1", "name": "Sprint 7", "status": "active"})

        result = mcp_mod.sprint_add(identifiers=["CHT-100"])

        assert result["updated"] == ["CHT-100"]
        client.update_issue.assert_called_once_with("issue-uuid-1", sprint_id="sp-1")
        # The target is named, not just a UUID (CHT-1371).
        assert result["sprint"] == {"id": "sp-1", "name": "Sprint 7"}
        assert result["sprint_id"] == "sp-1"

    def test_sprint_remove_clears_sprint_id(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.update_issue = MagicMock(return_value={})

        result = mcp_mod.sprint_remove(identifiers=["CHT-100"])

        assert result["updated"] == ["CHT-100"]
        assert result["sprint"] is None
        client.update_issue.assert_called_once_with("issue-uuid-1", sprint_id=None)

    def test_sprint_add_continues_past_a_bad_identifier(self, mcp_mod, mock_issue, monkeypatch):
        """Partial success is reported, not swallowed -- one typo in a
        batch shouldn't silently drop the rest."""
        from cli.main import client
        monkeypatch.setattr("cli.main.resolve_sprint_id", lambda *a, **k: "sp-1")
        client.get_issue_by_identifier = MagicMock(
            side_effect=[mock_issue, APIError("Issue not found")])
        client.update_issue = MagicMock(return_value={})
        client.get_sprint = MagicMock(return_value={"id": "sp-1", "name": "Sprint 7"})

        result = mcp_mod.sprint_add(identifiers=["CHT-100", "CHT-999"])

        assert result["updated"] == ["CHT-100"]
        assert result["failed"][0]["identifier"] == "CHT-999"

    def test_sprint_add_requires_identifiers(self, mcp_mod):
        assert "error" in mcp_mod.sprint_add(identifiers=[])



class TestRitualTools:
    SPRINT_RITUAL = {"id": "r-1", "name": "retro", "prompt": "Write the retro.",
                     "trigger": "every_sprint", "note_required": True}
    TICKET_RITUAL = {"id": "r-2", "name": "close-gate", "prompt": "Linked the commit?",
                     "trigger": "ticket_close", "note_required": True}

    def test_ritual_list(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.SPRINT_RITUAL])
        assert mcp_mod.ritual_list() == {"rituals": [self.SPRINT_RITUAL]}

    def test_ritual_pending_sprint_scope(self, mcp_mod):
        from cli.main import client
        client.get_limbo_status = MagicMock(return_value={
            "in_limbo": True, "pending_rituals": [self.SPRINT_RITUAL],
        })
        result = mcp_mod.ritual_pending()
        assert result["scope"] == "sprint"
        assert result["in_limbo"] is True
        assert result["unattested"] == ["retro"]

    def test_ritual_pending_ticket_scope(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_pending_issue_rituals = MagicMock(
            return_value={"pending_rituals": [self.TICKET_RITUAL]})
        result = mcp_mod.ritual_pending(identifier="CHT-100")
        assert result["scope"] == "ticket"
        assert result["unattested"] == ["close-gate"]

    def test_attest_dispatches_sprint_ritual(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.SPRINT_RITUAL])
        client.attest_ritual = MagicMock(return_value={"approved_at": "now"})
        client.get_limbo_status = MagicMock(return_value={"in_limbo": False, "pending_rituals": []})

        result = mcp_mod.ritual_attest(ritual="retro", note="Done it.")

        assert result["scope"] == "sprint"
        assert result["approved"] is True
        assert result["still_in_limbo"] is False
        client.attest_ritual.assert_called_once_with("r-1", "test-project-123", "Done it.")

    def test_attest_dispatches_ticket_ritual(self, mcp_mod, mock_issue):
        """Dispatch is on the ritual's own trigger, not on the caller."""
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.TICKET_RITUAL])
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.attest_ritual_for_issue = MagicMock(return_value={"approved_at": "now"})

        result = mcp_mod.ritual_attest(
            ritual="close-gate", note="abc123", identifier="CHT-100")

        assert result["scope"] == "ticket"
        client.attest_ritual_for_issue.assert_called_once_with("r-2", "issue-uuid-1", "abc123")

    def test_attest_trigger_match_is_case_insensitive(self, mcp_mod, mock_issue):
        """The trigger can arrive as the stored enum NAME; dispatching
        case-sensitively would route ticket rituals down the sprint path."""
        from cli.main import client
        client.get_rituals = MagicMock(
            return_value=[dict(self.TICKET_RITUAL, trigger="TICKET_CLOSE")])
        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.attest_ritual_for_issue = MagicMock(return_value={})

        result = mcp_mod.ritual_attest(
            ritual="close-gate", note="x", identifier="CHT-100")

        assert result["scope"] == "ticket"
        client.attest_ritual_for_issue.assert_called_once()

    def test_attest_ticket_ritual_without_identifier(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.TICKET_RITUAL])
        result = mcp_mod.ritual_attest(ritual="close-gate", note="x")
        assert "error" in result
        assert "identifier" in result["error"]

    def test_attest_missing_note_quotes_the_prompt(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.SPRINT_RITUAL])
        client.attest_ritual = MagicMock(return_value={})

        result = mcp_mod.ritual_attest(ritual="retro")

        assert "Write the retro." in result["error"]
        client.attest_ritual.assert_not_called()

    def test_attest_note_not_required(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(
            return_value=[dict(self.SPRINT_RITUAL, note_required=False)])
        client.attest_ritual = MagicMock(return_value={"approved_at": "now"})
        client.get_limbo_status = MagicMock(return_value={"in_limbo": False, "pending_rituals": []})

        assert "error" not in mcp_mod.ritual_attest(ritual="retro")

    def test_attest_unknown_ritual_lists_the_real_ones(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.SPRINT_RITUAL])
        result = mcp_mod.ritual_attest(ritual="nope", note="x")
        assert "retro" in result["error"]

    def test_attest_reports_pending_approval(self, mcp_mod):
        """approval_mode review/gate: attested but not cleared."""
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.SPRINT_RITUAL])
        client.attest_ritual = MagicMock(return_value={"approved_at": None})
        client.get_limbo_status = MagicMock(
            return_value={"in_limbo": True, "pending_rituals": [self.SPRINT_RITUAL]})

        result = mcp_mod.ritual_attest(ritual="retro", note="done")

        assert result["approved"] is False
        assert result["still_in_limbo"] is True
        assert result["remaining"] == ["retro"]

    def test_ritual_complete_sprint(self, mcp_mod):
        from cli.main import client
        client.get_rituals = MagicMock(return_value=[self.SPRINT_RITUAL])
        client.complete_gate_ritual = MagicMock(return_value={})
        client.get_limbo_status = MagicMock(return_value={"in_limbo": False, "pending_rituals": []})

        result = mcp_mod.ritual_complete(ritual="retro", note="signed off")

        assert result["still_in_limbo"] is False
        client.complete_gate_ritual.assert_called_once_with("r-1", "test-project-123", "signed off")


# ---------------------------------------------------------------------------
# activity_recent
# ---------------------------------------------------------------------------

class TestActivityRecent:
    def test_default(self, mcp_mod):
        from cli.main import client
        activities = [{"id": "a1", "activity_type": "status_changed"}]
        client.get_team_activities = MagicMock(return_value=activities)

        result = mcp_mod.activity_recent()
        assert result == {
            "activities": [{"id": "a1", "activity_type": "status_changed",
                            "old_value": None, "new_value": None}],
            "count": 1, "truncated": False,
        }
        client.get_team_activities.assert_called_once_with(
            "test-team-123", limit=21, project_id=None,
        )

    def test_long_values_are_previewed(self, mcp_mod):
        """An edited description used to ship two full bodies per row (CHT-1370)."""
        from cli.main import client
        body = "x" * 1000
        client.get_team_activities = MagicMock(return_value=[
            {"id": "a1", "activity_type": "updated", "field_name": "description",
             "old_value": body, "new_value": "short"},
        ])
        row = mcp_mod.activity_recent()["activities"][0]
        assert row["old_value"] == "x" * 200 + "...(+800 chars)"
        assert row["new_value"] == "short"

    def test_limit_probe_at_the_tool_maximum(self, mcp_mod):
        """The activities route has no `le` cap, so the +1 probe applies at
        the tool's own maximum too (review of CHT-1370 caught a bogus clamp)."""
        from cli.main import client
        client.get_team_activities = MagicMock(return_value=[{"id": f"a{i}"} for i in range(201)])
        result = mcp_mod.activity_recent(limit=200)
        _, kwargs = client.get_team_activities.call_args
        assert kwargs["limit"] == 201
        assert result["count"] == 200 and result["truncated"] is True

    def test_project_scoped(self, mcp_mod):
        from cli.main import client
        client.get_projects = MagicMock(return_value=[{"id": "p1", "key": "CHT", "name": "Chaotic"}])
        client.get_team_activities = MagicMock(return_value=[])

        mcp_mod.activity_recent(project="CHT", limit=5)
        client.get_team_activities.assert_called_once_with(
            "test-team-123", limit=6, project_id="p1",
        )

    def test_empty(self, mcp_mod):
        from cli.main import client
        client.get_team_activities = MagicMock(return_value=None)
        assert mcp_mod.activity_recent() == {"activities": [], "count": 0, "truncated": False}


# ---------------------------------------------------------------------------
# project_list (CHT-1284)
# ---------------------------------------------------------------------------

class TestProjectList:
    def test_lists_current_team_projects(self, mcp_mod):
        from cli.main import client
        projects = [
            {"id": "p1", "key": "CHT", "name": "Chaotic", "issue_count": 42},
            {"id": "p2", "key": "OPS", "name": "Ops", "issue_count": 3},
        ]
        client.get_projects = MagicMock(return_value=projects)
        result = mcp_mod.project_list()
        assert result == {
            "projects": [mcp_mod._compact(p, mcp_mod.COMPACT_PROJECT_FIELDS) for p in projects],
            "count": 2, "truncated": False,
        }
        assert result["projects"][0]["key"] == "CHT"
        # 1000-row cap kept in parity with the HTTP transport; +1 probes truncation.
        client.get_projects.assert_called_once_with("test-team-123", limit=1001)

    def test_description_is_previewed(self, mcp_mod):
        from cli.main import client
        client.get_projects = MagicMock(return_value=[
            {"id": "p1", "key": "CHT", "name": "Chaotic", "description": "d" * 500},
        ])
        row = mcp_mod.project_list()["projects"][0]
        assert row["description"] == "d" * 200 + "...(+300 chars)"
        full = mcp_mod.project_list(detail=True)["projects"][0]
        assert full["description"] == "d" * 500

    def test_empty_returns_empty_list(self, mcp_mod):
        from cli.main import client
        client.get_projects = MagicMock(return_value=None)
        assert mcp_mod.project_list() == {"projects": [], "count": 0, "truncated": False}

    def test_no_team_selected_is_clean_error(self, mcp_mod, monkeypatch):
        # Team-scoped like activity_recent: no team -> {"error": ...}, never a crash.
        monkeypatch.setattr("cli.main.get_current_team", lambda: None)
        result = mcp_mod.project_list()
        assert "No team selected" in result["error"]

    def test_takes_only_detail(self, mcp_mod):
        # The stdio tool has no scoping parameters (the HTTP transport adds
        # `team`); `detail` is the shared compact/full switch (CHT-1370).
        # Guards the snapshot-parity contract at the source.
        server = mcp_mod.build_server()
        tools = asyncio.run(server.list_tools())
        by_name = {t.name: t for t in tools}
        assert set(by_name["project_list"].inputSchema.get("properties", {})) == {"detail"}


# ---------------------------------------------------------------------------
# Integration-style: drive the real MCP protocol loop in-memory
# ---------------------------------------------------------------------------

class TestMCPProtocolLoop:
    """Uses mcp.shared.memory.create_connected_server_and_client_session
    to run a real ClientSession against a real FastMCP server instance
    over in-memory streams -- exercises initialize/list_tools/call_tool
    through the actual SDK session and message-framing layers, not just
    plain Python function calls.
    """

    def test_list_tools_over_protocol(self, mcp_mod):
        from mcp.shared.memory import create_connected_server_and_client_session

        async def run():
            server = mcp_mod.build_server()
            async with create_connected_server_and_client_session(server) as session:
                result = await session.list_tools()
                return {t.name for t in result.tools}

        names = asyncio.run(run())
        assert names == {t.__name__ for t in mcp_mod.ALL_TOOLS}

    def test_call_tool_over_protocol_success(self, mcp_mod, mock_issue):
        from cli.main import client
        from mcp.shared.memory import create_connected_server_and_client_session

        client.get_issues = MagicMock(return_value=[mock_issue])

        async def run():
            server = mcp_mod.build_server()
            async with create_connected_server_and_client_session(server) as session:
                return await session.call_tool("issue_list", {})

        result = asyncio.run(run())
        assert result.isError is not True
        text = next(c.text for c in result.content if c.type == "text")
        payload = json.loads(text)
        assert payload == {
            "issues": [mcp_mod._compact(mock_issue, mcp_mod.COMPACT_ISSUE_FIELDS)],
            "count": 1, "truncated": False,
        }

    def test_call_tool_over_protocol_error_envelope(self, mcp_mod):
        from cli.main import client
        from mcp.shared.memory import create_connected_server_and_client_session

        client.get_issue_by_identifier = MagicMock(side_effect=APIError("Issue not found"))

        async def run():
            server = mcp_mod.build_server()
            async with create_connected_server_and_client_session(server) as session:
                return await session.call_tool("issue_view", {"identifier": "CHT-999"})

        result = asyncio.run(run())
        # Our _boundary catches the error and returns a normal {"error": ...}
        # payload rather than raising -- so this is NOT an MCP-protocol-level
        # error (isError=False); the error is data, per CHT-1247's contract.
        assert result.isError is not True
        text = next(c.text for c in result.content if c.type == "text")
        assert json.loads(text) == {"error": "Issue not found"}

    def test_unknown_tool_is_a_protocol_error(self, mcp_mod):
        from mcp.shared.memory import create_connected_server_and_client_session

        async def run():
            server = mcp_mod.build_server()
            async with create_connected_server_and_client_session(server) as session:
                return await session.call_tool("issue_delete_everything", {})

        result = asyncio.run(run())
        assert result.isError is True
