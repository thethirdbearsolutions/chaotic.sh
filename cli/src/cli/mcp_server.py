"""`chaotic mcp` — MCP (Model Context Protocol) server over stdio.

Exposes a curated set of chaotic operations as MCP tools so any
MCP-speaking harness (Claude Code, etc.) gets native chaotic tools
without shelling out to the CLI. This module is a THIN adapter over
``cli.client.Client`` — it duplicates no business logic. Auth/context
(team, project, profile, credentials) comes from the exact same
CHAOTIC_PROFILE / CHAOTIC_HOME / config.json resolution the CLI itself
uses (see ``cli.config``); whatever ``chaotic status`` reports is what
this server sees. There is no MCP-specific auth or session state.

Toolset (11, curated for quality over coverage — see CHT-1247):
    issue_list, issue_view, issue_create, issue_update, issue_comment,
    issue_start, doc_list, doc_view, doc_create, activity_recent,
    project_list.

Deliberately NOT included in v1:
  * Any delete tool (issue/doc/comment). Destructive operations need a
    human in the loop; a future ticket can add them behind an opt-in
    flag if that's ever warranted.
  * `issue_ready` (open/unblocked/unclaimed work query) — tracked by
    CHT-1245, which was still in flight on a parallel branch as this
    was written. This module does not depend on it; add the tool once
    that ticket lands.

Two deliberate deviations from the CLI's own defaults, both aimed at
an LLM caller rather than a human at a terminal:
  * `issue_list`'s CLI default sort is `random` (a human browsing UX
    choice). An agent calling the same tool twice expects the same
    answer, so this server defaults to `updated`/`desc` instead.
  * Filter parameters that the CLI spells as comma-joined strings
    (`--status a,b`) are plain JSON arrays here (`status: ["a", "b"]`)
    -- structured input is the whole point of a typed MCP schema.

Every tool function below is a plain, undecorated-by-FastMCP module
function wrapped only by ``@_boundary`` -- they're registered onto the
FastMCP instance explicitly in ``build_server()`` via ``add_tool()``
rather than the ``@mcp.tool()`` decorator, specifically so tests (and
anything else) can import and call e.g. ``issue_view(identifier=...)``
directly against a mocked Client, same as every other cli.commands.*
handler.
"""
from __future__ import annotations

import functools
import sys
from typing import Annotated, Literal

import click
import httpx
from pydantic import Field

from mcp.server.fastmcp import FastMCP

from .client import APIError
from .commands.issue_cmd import ISSUE_TYPE_ALIASES, ISSUE_TYPES
from .commands.shared import _client


def _main():
    """Late-bind to cli.main (mirrors every other commands/*.py module) --
    cli.main is only fully initialized by the time tools are actually
    called, not at import time.
    """
    return sys.modules['cli.main']


STATUS_VALUES = Literal["backlog", "todo", "in_progress", "in_review", "done", "canceled"]
PRIORITY_VALUES = Literal["no_priority", "low", "medium", "high", "urgent"]
SORT_FIELDS = Literal["created", "updated", "priority", "status", "title", "estimate"]
SORT_ORDER = Literal["asc", "desc"]


class ToolInputError(Exception):
    """Raised by this module's own resolution helpers (missing team/project
    context, etc.) so the error boundary can report it exactly like an
    APIError -- a clean {"error": ...} envelope, never a crash.
    """


def _require_auth() -> None:
    m = _main()
    if not m.get_token() and not m.get_api_key():
        raise ToolInputError(
            "Not authenticated. Run 'chaotic auth login' or 'chaotic auth set-key' "
            "first, or 'chaotic quickstart' to get set up."
        )


def _require_team() -> str:
    _require_auth()
    m = _main()
    team_id = m.get_current_team()
    if not team_id:
        raise ToolInputError(
            "No team selected. Run 'chaotic team list' to see available teams, "
            "or 'chaotic quickstart' if you don't have one yet."
        )
    return team_id


def _require_project(project: str | None) -> str:
    """Resolve an explicit --project-style override, falling back to the
    configured current project. Requires a team first (project lookups
    are team-scoped).
    """
    _require_team()
    m = _main()
    if project:
        return m.resolve_project_id(project)
    project_id = m.get_current_project()
    if not project_id:
        raise ToolInputError(
            "No project selected. Pass `project` explicitly, or run "
            "'chaotic project use <project_id>' in the CLI first."
        )
    return project_id


def _resolve_issue_type(value: str | None) -> str | None:
    if value is None:
        return None
    lower = value.lower()
    if lower in ISSUE_TYPES:
        return lower
    if lower in ISSUE_TYPE_ALIASES:
        return ISSUE_TYPE_ALIASES[lower]
    valid = ", ".join(ISSUE_TYPES)
    aliases = ", ".join(f"{k}->{v}" for k, v in ISSUE_TYPE_ALIASES.items())
    raise ToolInputError(f"'{value}' is not a valid issue type. Valid: {valid}. Aliases: {aliases}.")


def _boundary(fn):
    """Wrap a tool body so it NEVER raises -- every failure mode (bad
    input, missing team/project context, API error) comes back as the
    same {"error": "<message>"} envelope the CLI's --json contract uses
    (CHT-1222/#206), and the server keeps serving other tool calls.

    Uses functools.wraps (not a manual __name__/__doc__ copy) because
    FastMCP builds each tool's JSON schema from the ORIGINAL function's
    signature via inspect.signature(..., follow_wrapped=True); wraps()
    sets __wrapped__, which is what makes that unwrapping find the real
    typed signature instead of this wrapper's bare (*args, **kwargs).
    """
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except ToolInputError as e:
            return {"error": str(e)}
        except click.ClickException as e:
            return {"error": e.format_message()}
        except APIError as e:
            return {"error": str(e)}
        # Network failures get the same actionable messages the CLI's
        # handle_error decorator produces, not a generic "Unexpected
        # error (ConnectError)" (PR #215 review).
        except httpx.ConnectError:
            return {"error": f"Could not connect to server at {_main().get_api_url()}. Is the server running?"}
        except httpx.TimeoutException:
            return {"error": "Request timed out. The server may be overloaded or unreachable."}
        except httpx.HTTPError as e:
            return {"error": f"Network error: {e}"}
        except Exception as e:  # noqa: BLE001 - last-resort, never crash the server
            return {"error": f"Unexpected error ({type(e).__name__}): {e}"}
    return wrapper


# ---------------------------------------------------------------------------
# Issues
# ---------------------------------------------------------------------------

@_boundary
def issue_list(
    status: Annotated[
        list[STATUS_VALUES] | None,
        Field(description="Filter by one or more statuses (OR'd together).")
    ] = None,
    priority: Annotated[
        list[PRIORITY_VALUES] | None,
        Field(description="Filter by one or more priorities (OR'd together).")
    ] = None,
    assignee: Annotated[
        str | None,
        Field(description="Filter by assignee: 'me', a user/agent id, or a name/email.")
    ] = None,
    label: Annotated[str | None, Field(description="Filter by label name.")] = None,
    search: Annotated[
        str | None,
        Field(description="Free-text search over title, description, and identifier.")
    ] = None,
    sprint: Annotated[
        str | None,
        Field(description="Filter by sprint: a sprint name, 'current', 'next', or a sprint id.")
    ] = None,
    epic: Annotated[
        str | None,
        Field(description="Filter to sub-issues of this epic/parent issue identifier (e.g. CHT-12).")
    ] = None,
    all_projects: Annotated[
        bool,
        Field(description="List across every project in the team instead of just the current project. "
                          "Ignored when `project` is passed explicitly; cannot be combined with `sprint`.")
    ] = False,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name to list in. Defaults to the configured current project. "
                          "Passing this always scopes to that one project, even if all_projects is also set.")
    ] = None,
    limit: Annotated[int, Field(description="Maximum number of issues to return.", ge=1, le=500)] = 50,
    sort_by: Annotated[SORT_FIELDS, Field(description="Sort field.")] = "updated",
    order: Annotated[SORT_ORDER, Field(description="Sort direction.")] = "desc",
) -> dict:
    """List issues in a project (or team-wide with all_projects=true), with filters."""
    m = _main()
    team_id = None
    project_id = None
    # Explicit `project` wins over all_projects -- same precedence as
    # doc_list/doc_create (and their CLI counterparts, where --project
    # beats --all). Previously all_projects silently dropped `project`
    # (PR #215 review).
    if all_projects and not project:
        # Sprints are project-scoped; the CLI's `issue list` rejects this
        # combination outright ("Cannot use --sprint with --all-projects").
        if sprint:
            raise ToolInputError(
                "Cannot combine `sprint` with all_projects=true: sprints are "
                "project-scoped. Pass `project` (or drop all_projects) to "
                "filter by sprint."
            )
        team_id = _require_team()
    else:
        project_id = _require_project(project)

    assignee_id = m.resolve_assignee_id(assignee) if assignee else None

    parent_id = None
    if epic:
        parent_id = _client().get_issue_by_identifier(epic)["id"]

    sprint_id = None
    if sprint:
        sprint_id = m.resolve_sprint_id(sprint, project_id)

    issues = _client().get_issues(
        project_id=project_id,
        team_id=team_id,
        status=",".join(status) if status else None,
        priority=",".join(priority) if priority else None,
        assignee_id=assignee_id,
        label=label,
        search=search,
        sprint_id=sprint_id,
        parent_id=parent_id,
        limit=limit,
        sort_by=sort_by,
        order=order,
    )
    return {"issues": issues}


@_boundary
def issue_view(
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
) -> dict:
    """Show full issue detail: fields, description, comments, and sub-issues."""
    _require_auth()
    iss = _client().get_issue_by_identifier(identifier)
    iss["comments"] = _client().get_comments(iss["id"])
    try:
        iss["sub_issues"] = _client().get_sub_issues(iss["id"])
    except APIError:
        iss["sub_issues"] = []
    return iss


@_boundary
def issue_create(
    title: Annotated[str, Field(description="Issue title.")],
    description: Annotated[str | None, Field(description="Issue description (markdown).")] = None,
    status: Annotated[STATUS_VALUES, Field(description="Initial status.")] = "backlog",
    priority: Annotated[PRIORITY_VALUES, Field(description="Priority.")] = "no_priority",
    issue_type: Annotated[
        str,
        Field(description=f"Issue type. One of: {', '.join(ISSUE_TYPES)} (aliases accepted, e.g. 'feat').")
    ] = "task",
    estimate: Annotated[int | None, Field(description="Story point estimate.")] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the configured current project.")
    ] = None,
    parent: Annotated[
        str | None,
        Field(description="Parent issue identifier (e.g. CHT-12) to create this as a sub-issue.")
    ] = None,
) -> dict:
    """Create a new issue (optionally as a sub-issue of `parent`)."""
    project_id = _require_project(project)
    data = {
        "description": description,
        "status": status,
        "priority": priority,
        "issue_type": _resolve_issue_type(issue_type),
    }
    if estimate is not None:
        data["estimate"] = estimate
    if parent:
        data["parent_id"] = _client().get_issue_by_identifier(parent)["id"]
    return _client().create_issue(project_id, title, **data)


@_boundary
def issue_update(
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
    status: Annotated[STATUS_VALUES | None, Field(description="New status.")] = None,
    priority: Annotated[PRIORITY_VALUES | None, Field(description="New priority.")] = None,
    estimate: Annotated[int | None, Field(description="New story point estimate.")] = None,
    assignee: Annotated[
        str | None,
        Field(description="New assignee: 'me', a user/agent id, a name/email, or 'unassigned' to clear it.")
    ] = None,
    title: Annotated[str | None, Field(description="New title.")] = None,
    description: Annotated[str | None, Field(description="New description (markdown).")] = None,
) -> dict:
    """Update an issue's status, priority, estimate, assignee, title, and/or description.

    Only fields explicitly passed are changed. Returns the updated issue.
    """
    _require_auth()
    m = _main()
    iss = _client().get_issue_by_identifier(identifier)

    data = {}
    if title is not None:
        data["title"] = title
    if description is not None:
        data["description"] = description
    if status is not None:
        data["status"] = status
    if priority is not None:
        data["priority"] = priority
    if estimate is not None:
        data["estimate"] = estimate
    if assignee is not None:
        data["assignee_id"] = None if assignee.lower() == "unassigned" else m.resolve_assignee_id(assignee)

    if not data:
        raise ToolInputError("No fields provided to update.")

    _client().update_issue(iss["id"], **data)
    return _client().get_issue_by_identifier(identifier)


@_boundary
def issue_comment(
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
    content: Annotated[str, Field(description="Comment body (markdown).")],
    assign_to: Annotated[
        str | None,
        Field(description="Also assign the issue: 'me', a user/agent id, or a name/email.")
    ] = None,
) -> dict:
    """Add a comment to an issue, optionally assigning it in the same call."""
    _require_auth()
    m = _main()
    iss = _client().get_issue_by_identifier(identifier)
    comment = _client().create_comment(iss["id"], content)
    if assign_to:
        _client().update_issue(iss["id"], assignee_id=m.resolve_assignee_id(assign_to))
    return comment


@_boundary
def issue_start(
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
) -> dict:
    """Claim an issue: assign it to yourself and move it to in_progress.

    Equivalent to `chaotic issue start`.
    """
    _require_auth()
    iss = _client().get_issue_by_identifier(identifier)
    me = _client().get_me()
    _client().update_issue(iss["id"], assignee_id=me["id"], status="in_progress")
    return _client().get_issue_by_identifier(identifier)


# ---------------------------------------------------------------------------
# Documents
# ---------------------------------------------------------------------------

@_boundary
def doc_list(
    search: Annotated[str | None, Field(description="Search documents by title.")] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name to scope to. Defaults to the current project.")
    ] = None,
    all_projects: Annotated[
        bool,
        Field(description="List every document in the team instead of just the current/given project.")
    ] = False,
    limit: Annotated[int, Field(description="Maximum number of documents to return.", ge=1, le=500)] = 50,
) -> dict:
    """List documents (project-scoped by default, team-wide with all_projects=true)."""
    team_id = _require_team()
    m = _main()
    project_id = None
    if project:
        project_id = m.resolve_project_id(project)
    elif not all_projects:
        project_id = m.get_current_project()
    documents = _client().get_documents(team_id, project_id=project_id, search=search, limit=limit)
    return {"documents": documents or []}


@_boundary
def doc_view(
    document_id: Annotated[str, Field(description="Document id, exact title, or id prefix.")],
) -> dict:
    """Show a document's content, comments, and linked issues."""
    team_id = _require_team()
    document_id = _main().resolve_document_id(document_id, team_id)
    d = _client().get_document(document_id)
    d["comments"] = _client().get_document_comments(d["id"])
    d["linked_issues"] = _client().get_document_issues(d["id"])
    return d


@_boundary
def doc_create(
    title: Annotated[str, Field(description="Document title.")],
    content: Annotated[str | None, Field(description="Document body (markdown).")] = None,
    icon: Annotated[str | None, Field(description="Emoji or short icon label for the document.")] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name to attach to. Omit for the current project.")
    ] = None,
    is_global: Annotated[
        bool,
        Field(description="Create as a global/team-wide document instead of project-scoped.")
    ] = False,
) -> dict:
    """Create a new document."""
    team_id = _require_team()
    m = _main()
    project_id = None
    if project:
        project_id = m.resolve_project_id(project)
    elif not is_global:
        project_id = m.get_current_project()
    return _client().create_document(team_id, title, content=content, icon=icon, project_id=project_id)


# ---------------------------------------------------------------------------
# Projects
# ---------------------------------------------------------------------------

@_boundary
def project_list() -> dict:
    """List the projects in your team: id, key, name, and issue count.

    The one call that answers "what projects exist" -- every other tool
    takes a `project` filter but none enumerate them. Scoped to the
    current team (`chaotic status`); the HTTP transport adds a `team`
    parameter for API keys that can see more than one.
    """
    team_id = _require_team()
    projects = _client().get_projects(team_id)
    return {"projects": projects or []}


# ---------------------------------------------------------------------------
# Activity
# ---------------------------------------------------------------------------

@_boundary
def activity_recent(
    limit: Annotated[int, Field(description="Maximum number of activity entries to return.", ge=1, le=200)] = 20,
    project: Annotated[
        str | None,
        Field(description="Restrict to one project (id, key, or name). Omit for team-wide activity.")
    ] = None,
) -> dict:
    """Show recent team activity: comments, status changes, assignments, etc."""
    team_id = _require_team()
    project_id = _main().resolve_project_id(project) if project else None
    activities = _client().get_team_activities(team_id, limit=limit, project_id=project_id)
    return {"activities": activities or []}


# ---------------------------------------------------------------------------
# Server assembly
# ---------------------------------------------------------------------------

ALL_TOOLS = (
    issue_list, issue_view, issue_create, issue_update, issue_comment, issue_start,
    doc_list, doc_view, doc_create, activity_recent, project_list,
)


def build_server() -> FastMCP:
    """Construct the FastMCP server with all tools registered.

    Kept separate from ``serve()`` so tests (and the in-memory MCP
    client harness) can build a server instance without going through
    stdio or Click.
    """
    mcp = FastMCP(
        name="chaotic",
        instructions=(
            "Tools for the Chaotic issue tracker. Auth and team/project "
            "context are inherited from the local chaotic CLI config "
            "(whatever `chaotic status` reports) -- there is no separate "
            "login step. Every tool returns a JSON object; failures come "
            "back as {\"error\": \"...\"} rather than a protocol error."
        ),
    )
    for tool_fn in ALL_TOOLS:
        mcp.add_tool(tool_fn)
    return mcp


def serve() -> None:
    """Entry point for `chaotic mcp`: build the server and run it over stdio."""
    build_server().run(transport="stdio")
