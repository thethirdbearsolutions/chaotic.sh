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
        """Exactly the 11 tools (the 10 from CHT-1247 plus project_list,
        CHT-1284), no more, no less."""
        names = {t.__name__ for t in mcp_mod.ALL_TOOLS}
        assert names == {
            "issue_list", "issue_view", "issue_create", "issue_update",
            "issue_comment", "issue_start", "doc_list", "doc_view",
            "doc_create", "activity_recent", "project_list",
        }

    def test_no_delete_tools(self, mcp_mod):
        assert not any("delete" in t.__name__ for t in mcp_mod.ALL_TOOLS)
        assert not any("ready" in t.__name__ for t in mcp_mod.ALL_TOOLS)

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
            "epic", "all_projects", "project", "limit", "sort_by", "order",
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
        assert result == {"issues": [mock_issue]}
        _, kwargs = client.get_issues.call_args
        assert kwargs["project_id"] == "test-project-123"
        assert kwargs["team_id"] is None
        # Deliberate agent-friendly default (CLI defaults to "random").
        assert kwargs["sort_by"] == "updated"
        assert kwargs["order"] == "desc"

    def test_all_projects_uses_team_scope(self, mcp_mod, mock_issue):
        from cli.main import client
        client.get_issues = MagicMock(return_value=[mock_issue])
        result = mcp_mod.issue_list(all_projects=True)
        assert result == {"issues": [mock_issue]}
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
        assert mcp_mod.issue_list() == {"issues": []}

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
        client.get_sub_issues = MagicMock(return_value=[{"id": "sub-1"}])

        result = mcp_mod.issue_view(identifier="CHT-100")

        assert result["identifier"] == "CHT-100"
        assert result["comments"] == [{"id": "c1", "content": "hi"}]
        assert result["sub_issues"] == [{"id": "sub-1"}]

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


# ---------------------------------------------------------------------------
# doc_list / doc_view / doc_create
# ---------------------------------------------------------------------------

class TestDocs:
    def test_doc_list_defaults_to_current_project(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])

        result = mcp_mod.doc_list()

        assert result == {"documents": [mock_document]}
        client.get_documents.assert_called_once_with(
            "test-team-123", project_id="test-project-123", search=None, limit=50,
        )

    def test_doc_list_all_projects(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])

        mcp_mod.doc_list(all_projects=True)

        client.get_documents.assert_called_once_with(
            "test-team-123", project_id=None, search=None, limit=50,
        )

    def test_doc_list_custom_limit(self, mcp_mod, mock_document):
        from cli.main import client
        client.get_documents = MagicMock(return_value=[mock_document])

        mcp_mod.doc_list(limit=5)

        _, kwargs = client.get_documents.call_args
        assert kwargs["limit"] == 5

    def test_doc_list_empty_returns_empty_list(self, mcp_mod):
        from cli.main import client
        client.get_documents = MagicMock(return_value=None)
        assert mcp_mod.doc_list() == {"documents": []}

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

    def test_doc_create_global(self, mcp_mod, mock_document):
        from cli.main import client
        client.create_document = MagicMock(return_value=mock_document)

        mcp_mod.doc_create(title="Team Doc", is_global=True)

        _, kwargs = client.create_document.call_args
        assert kwargs["project_id"] is None


# ---------------------------------------------------------------------------
# activity_recent
# ---------------------------------------------------------------------------

class TestActivityRecent:
    def test_default(self, mcp_mod):
        from cli.main import client
        activities = [{"id": "a1", "activity_type": "status_changed"}]
        client.get_team_activities = MagicMock(return_value=activities)

        result = mcp_mod.activity_recent()

        assert result == {"activities": activities}
        client.get_team_activities.assert_called_once_with(
            "test-team-123", limit=20, project_id=None,
        )

    def test_project_scoped(self, mcp_mod):
        from cli.main import client
        client.get_projects = MagicMock(return_value=[{"id": "p1", "key": "CHT", "name": "Chaotic"}])
        client.get_team_activities = MagicMock(return_value=[])

        mcp_mod.activity_recent(project="CHT", limit=5)

        client.get_team_activities.assert_called_once_with(
            "test-team-123", limit=5, project_id="p1",
        )

    def test_empty(self, mcp_mod):
        from cli.main import client
        client.get_team_activities = MagicMock(return_value=None)
        assert mcp_mod.activity_recent() == {"activities": []}


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

        assert result == {"projects": projects}
        client.get_projects.assert_called_once_with("test-team-123")

    def test_empty_returns_empty_list(self, mcp_mod):
        from cli.main import client
        client.get_projects = MagicMock(return_value=None)
        assert mcp_mod.project_list() == {"projects": []}

    def test_no_team_selected_is_clean_error(self, mcp_mod, monkeypatch):
        # Team-scoped like activity_recent: no team -> {"error": ...}, never a crash.
        monkeypatch.setattr("cli.main.get_current_team", lambda: None)
        result = mcp_mod.project_list()
        assert "No team selected" in result["error"]

    def test_takes_no_parameters(self, mcp_mod):
        # The stdio tool is param-less (the HTTP transport adds `team`);
        # guards the snapshot-parity contract at the source.
        server = mcp_mod.build_server()
        tools = asyncio.run(server.list_tools())
        by_name = {t.name: t for t in tools}
        assert by_name["project_list"].inputSchema.get("properties", {}) == {}


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
        assert payload == {"issues": [mock_issue]}

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
