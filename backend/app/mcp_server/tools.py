"""Remote MCP tool definitions (CHT-1266) -- the backend-hosted sibling of
``chaotic mcp`` (cli/src/cli/mcp_server.py, stdio transport, CHT-1247/#215).

Same 10 tools, same names, same docstrings/descriptions, same shared
parameters (name, type, default, description) -- see cli/src/cli/mcp_server.py
for the canonical prose on each. What's DIFFERENT here, and why this
isn't a shared import between the cli/ and backend/ packages:

* The stdio server is a thin adapter over ``cli.client.Client`` making
  HTTP calls back to this same backend; a hosted server obviously can't
  loop back through itself, so every tool body below calls straight into
  ``app.api``/``app.services`` (the exact functions the REST endpoints
  use -- see each tool's body) instead of an HTTP client.
* The stdio server's auth/team/project context comes from the CLI's
  local profile (``chaotic project use``, etc.) -- there's no such thing
  server-side. Here it's resolved per-request from the caller's API key
  (``auth.py`` -> ``context.py``), and an API key's user can belong to
  more than one team/project where a CLI profile can't. That's the one
  place the schemas legitimately diverge: ``issue_list``, ``doc_list``,
  ``issue_create``, ``doc_create``, and ``activity_recent`` gain an
  additional optional ``team`` parameter the stdio version doesn't have
  (``project`` already existed on all of them; see ``scope.py``). The
  other four tools (``issue_view``, ``issue_update``, ``issue_comment``,
  ``issue_start``) key off a globally-unique issue identifier and need no
  extra scoping parameter at all.
* ``cli/tests/test_mcp_server.py`` and ``backend/tests/test_mcp_toolset_sync.py``
  both assert their live toolset against the same checked-in snapshot
  (``docs/mcp-toolset-schema.json``) -- if either side's tool names,
  descriptions, or shared parameters drift from that snapshot (or from
  each other), the tests fail loud rather than silently diverging.
  ``ISSUE_TYPES``/``ISSUE_TYPE_ALIASES`` and the STATUS/PRIORITY/SORT
  ``Literal`` value lists below are hand-kept identical to
  cli/src/cli/commands/issue_cmd.py and cli/src/cli/mcp_server.py for the
  same reason -- there's no cross-package import to enforce it, the sync
  test is what does.

Deliberately NOT included in v1 (mirrors the stdio server exactly, see
its module docstring for the full rationale): no delete tool, no
``issue_ready``.
"""
from __future__ import annotations

import functools
from typing import Annotated, Literal

from fastapi import HTTPException
from pydantic import Field, ValidationError as PydanticValidationError

from mcp.server.fastmcp import FastMCP

from app.api import documents as documents_api
from app.api import issues as issues_api
from app.enums import IssueStatus, IssuePriority, IssueType
from app.mcp_server.context import get_current_mcp_user
from app.mcp_server.scope import (
    ToolContextError,
    resolve_assignee,
    resolve_project,
    resolve_sprint,
    resolve_team,
)
from app.schemas.document import DocumentCreate
from app.schemas.issue import IssueCommentCreate, IssueCreate, IssueUpdate
from app.services.project_service import ProjectService

# Kept identical to cli/src/cli/commands/issue_cmd.py's ISSUE_TYPES /
# ISSUE_TYPE_ALIASES -- see this module's docstring.
ISSUE_TYPES = ["task", "bug", "feature", "chore", "docs", "tech_debt", "epic"]
ISSUE_TYPE_ALIASES = {
    "feat": "feature",
    "improvement": "feature",
    "doc": "docs",
    "debt": "tech_debt",
    "techdebt": "tech_debt",
    "tech-debt": "tech_debt",
}

# Kept identical to cli/src/cli/mcp_server.py's Literal value lists -- see
# this module's docstring.
STATUS_VALUES = Literal["backlog", "todo", "in_progress", "in_review", "done", "canceled"]
PRIORITY_VALUES = Literal["no_priority", "low", "medium", "high", "urgent"]
SORT_FIELDS = Literal["created", "updated", "priority", "status", "title", "estimate"]
SORT_ORDER = Literal["asc", "desc"]

_TEAM_FIELD_DEFAULT = (
    "Team id, key, or name (only needed to disambiguate when this API "
    "key's user has access to more than one team). Defaults to this API "
    "key's only accessible team, if there's exactly one."
)


def _resolve_issue_type(value: str) -> str:
    lower = value.lower()
    if lower in ISSUE_TYPES:
        return lower
    if lower in ISSUE_TYPE_ALIASES:
        return ISSUE_TYPE_ALIASES[lower]
    valid = ", ".join(ISSUE_TYPES)
    aliases = ", ".join(f"{k}->{v}" for k, v in ISSUE_TYPE_ALIASES.items())
    raise ToolContextError(f"'{value}' is not a valid issue type. Valid: {valid}. Aliases: {aliases}.")


async def _team_id_for_project(project_id: str) -> str:
    project = await ProjectService().get_by_id(project_id)
    if not project:
        raise ToolContextError("Project not found.")
    return project.team_id


async def _resolve_document_id(user, document_id: str) -> str:
    """Resolve an exact document id, or fuzzy-match an id-prefix/exact
    title across every team this API key's user can access -- mirrors
    the CLI's ``resolve_document_id`` closely enough for tool parity
    (see module docstring on why this isn't a shared import).
    """
    from app.services.document_service import DocumentService
    from app.services.team_service import TeamService

    doc_service = DocumentService()
    exact = await doc_service.get_by_id(document_id)
    if exact:
        return exact.id

    if user.is_agent:
        team_ids = [user.agent_team_id] if user.agent_team_id else []
        if not team_ids and user.agent_project_id:
            team_id = await _team_id_for_project(user.agent_project_id)
            team_ids = [team_id]
    else:
        team_ids = [t.id for t in await TeamService().get_user_teams(user.id)]

    candidates = []
    lowered = document_id.lower()
    for team_id in team_ids:
        for doc in await doc_service.list_by_team(team_id, limit=1000):
            if doc.id.startswith(document_id) or doc.title.lower() == lowered:
                candidates.append(doc)

    if len(candidates) == 1:
        return candidates[0].id
    if not candidates:
        raise ToolContextError(f"No document found matching '{document_id}'.")
    raise ToolContextError(f"Multiple documents match '{document_id}'; pass the exact document id.")


def _boundary(fn):
    """Wrap a tool body so it NEVER raises -- mirrors the stdio server's
    ``_boundary`` (cli/src/cli/mcp_server.py) contract exactly: every
    failure mode comes back as ``{"error": "<message>"}``, never a
    protocol-level exception, and the server keeps serving other calls.
    Async (the stdio version's isn't) because every tool body here does
    real I/O. ``functools.wraps`` still matters for the same reason it
    does there: FastMCP derives each tool's JSON schema from the
    ORIGINAL function's signature via ``inspect.signature(...,
    follow_wrapped=True)``, which needs ``__wrapped__``.
    """
    @functools.wraps(fn)
    async def wrapper(*args, **kwargs):
        try:
            return await fn(*args, **kwargs)
        except ToolContextError as e:
            return {"error": str(e)}
        except HTTPException as e:
            # e.detail may be a plain string or a structured dict
            # (ritual/limbo/arrears 409s, see app.main's exception-shape
            # docstring) -- pass it through as-is, JSON-serializable
            # either way.
            return {"error": e.detail}
        except PydanticValidationError as e:
            return {"error": str(e)}
        except Exception as e:  # noqa: BLE001 - last-resort, never crash the server
            return {"error": f"Unexpected error ({type(e).__name__}): {e}"}
    return wrapper


# ---------------------------------------------------------------------------
# Issues
# ---------------------------------------------------------------------------

@_boundary
async def issue_list(
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
                          "Passing this always scopes to that one project, "
                          "even if all_projects is also set.")
    ] = None,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
    limit: Annotated[int, Field(description="Maximum number of issues to return.", ge=1, le=500)] = 50,
    sort_by: Annotated[SORT_FIELDS, Field(description="Sort field.")] = "updated",
    order: Annotated[SORT_ORDER, Field(description="Sort direction.")] = "desc",
) -> dict:
    """List issues in a project (or team-wide with all_projects=true), with filters."""
    user = get_current_mcp_user()

    project_id = None
    team_id = None
    if all_projects and not project:
        if sprint:
            raise ToolContextError(
                "Cannot combine `sprint` with all_projects=true: sprints are "
                "project-scoped. Pass `project` (or drop all_projects) to "
                "filter by sprint."
            )
        team_id = await resolve_team(user, team)
    else:
        project_id, team_id = await resolve_project(user, project, team)

    assignee_id = await resolve_assignee(user, team_id, assignee) if assignee else None

    parent_id = None
    if epic:
        parent_iss = await issues_api.get_issue_by_identifier(epic, user)
        parent_id = parent_iss.id

    sprint_id = await resolve_sprint(project_id, sprint) if (sprint and project_id) else None

    statuses = [IssueStatus(s) for s in status] if status else None
    priorities = [IssuePriority(p) for p in priority] if priority else None

    issues = await issues_api.list_issues(
        current_user=user,
        project_id=project_id,
        team_id=team_id if not project_id else None,
        statuses=statuses,
        priorities=priorities,
        # issue_type/label_match/exclude_* all default to a raw
        # `fastapi.Query(...)` sentinel object in list_issues' own
        # signature (FastAPI's param-metadata-as-default pattern) --
        # harmless when FastAPI's dependency injection resolves them from
        # a real request, but calling the function directly in-process
        # (as every tool here does) skips that resolution entirely, so
        # every one of them MUST be passed explicitly or IssueService
        # ends up truthiness-testing a live Query object instead of None.
        issue_type=None,
        assignee_id=assignee_id,
        labels=[label] if label else None,
        label_match="all",
        exclude_labels=None,
        exclude_statuses=None,
        exclude_priorities=None,
        exclude_issue_types=None,
        exclude_assignee_ids=None,
        search=search,
        sprint_id=sprint_id,
        parent_id=parent_id,
        limit=limit,
        sort_by=sort_by,
        order=order,
    )
    return {"issues": [i.model_dump(mode="json") for i in issues]}


@_boundary
async def issue_view(
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
) -> dict:
    """Show full issue detail: fields, description, comments, and sub-issues."""
    user = get_current_mcp_user()
    iss = await issues_api.get_issue_by_identifier(identifier, user)
    comments = await issues_api.list_comments(iss.id, user)
    sub_issues = await issues_api.list_sub_issues(iss.id, user)
    result = iss.model_dump(mode="json")
    result["comments"] = [c.model_dump(mode="json") for c in comments]
    result["sub_issues"] = [s.model_dump(mode="json") for s in sub_issues]
    return result


@_boundary
async def issue_create(
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
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
    parent: Annotated[
        str | None,
        Field(description="Parent issue identifier (e.g. CHT-12) to create this as a sub-issue.")
    ] = None,
) -> dict:
    """Create a new issue (optionally as a sub-issue of `parent`)."""
    user = get_current_mcp_user()
    project_id, _team_id = await resolve_project(user, project, team)

    parent_id = None
    if parent:
        parent_iss = await issues_api.get_issue_by_identifier(parent, user)
        parent_id = parent_iss.id

    issue_in = IssueCreate(
        title=title,
        description=description,
        status=IssueStatus(status),
        priority=IssuePriority(priority),
        issue_type=IssueType(_resolve_issue_type(issue_type)),
        estimate=estimate,
        parent_id=parent_id,
    )
    created = await issues_api.create_issue(project_id=project_id, issue_in=issue_in, current_user=user)
    return created.model_dump(mode="json")


@_boundary
async def issue_update(
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
    user = get_current_mcp_user()
    iss = await issues_api.get_issue_by_identifier(identifier, user)

    fields: dict = {}
    if title is not None:
        fields["title"] = title
    if description is not None:
        fields["description"] = description
    if status is not None:
        fields["status"] = IssueStatus(status)
    if priority is not None:
        fields["priority"] = IssuePriority(priority)
    if estimate is not None:
        fields["estimate"] = estimate
    if assignee is not None:
        if assignee.strip().lower() == "unassigned":
            fields["assignee_id"] = None
        else:
            team_id = await _team_id_for_project(iss.project_id)
            fields["assignee_id"] = await resolve_assignee(user, team_id, assignee)

    if not fields:
        raise ToolContextError("No fields provided to update.")

    updated = await issues_api.update_issue(issue_id=iss.id, issue_in=IssueUpdate(**fields), current_user=user)
    return updated.model_dump(mode="json")


@_boundary
async def issue_comment(
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
    content: Annotated[str, Field(description="Comment body (markdown).")],
    assign_to: Annotated[
        str | None,
        Field(description="Also assign the issue: 'me', a user/agent id, or a name/email.")
    ] = None,
) -> dict:
    """Add a comment to an issue, optionally assigning it in the same call."""
    user = get_current_mcp_user()
    iss = await issues_api.get_issue_by_identifier(identifier, user)
    comment = await issues_api.create_comment(
        issue_id=iss.id, comment_in=IssueCommentCreate(content=content), current_user=user
    )
    if assign_to:
        team_id = await _team_id_for_project(iss.project_id)
        assignee_id = await resolve_assignee(user, team_id, assign_to)
        await issues_api.update_issue(
            issue_id=iss.id, issue_in=IssueUpdate(assignee_id=assignee_id), current_user=user
        )
    return comment.model_dump(mode="json")


@_boundary
async def issue_start(
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
) -> dict:
    """Claim an issue: assign it to yourself and move it to in_progress.

    Equivalent to `chaotic issue start`.
    """
    user = get_current_mcp_user()
    iss = await issues_api.get_issue_by_identifier(identifier, user)
    updated = await issues_api.update_issue(
        issue_id=iss.id,
        issue_in=IssueUpdate(assignee_id=user.id, status=IssueStatus.IN_PROGRESS),
        current_user=user,
    )
    return updated.model_dump(mode="json")


# ---------------------------------------------------------------------------
# Documents
# ---------------------------------------------------------------------------

@_boundary
async def doc_list(
    search: Annotated[str | None, Field(description="Search documents by title.")] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name to scope to. Defaults to the current project.")
    ] = None,
    all_projects: Annotated[
        bool,
        Field(description="List every document in the team instead of just the current/given project.")
    ] = False,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
    limit: Annotated[int, Field(description="Maximum number of documents to return.", ge=1, le=500)] = 50,
) -> dict:
    """List documents (project-scoped by default, team-wide with all_projects=true)."""
    user = get_current_mcp_user()

    if project:
        project_id, team_id = await resolve_project(user, project, team)
    elif all_projects:
        project_id = None
        team_id = await resolve_team(user, team)
    else:
        project_id, team_id = await resolve_project(user, None, team)

    documents = await documents_api.list_documents(
        team_id=team_id, current_user=user, project_id=project_id, search=search, limit=limit
    )
    return {"documents": [d.model_dump(mode="json") for d in (documents or [])]}


@_boundary
async def doc_view(
    document_id: Annotated[str, Field(description="Document id, exact title, or id prefix.")],
) -> dict:
    """Show a document's content, comments, and linked issues."""
    user = get_current_mcp_user()
    resolved_id = await _resolve_document_id(user, document_id)
    doc = await documents_api.get_document(resolved_id, user)
    comments = await documents_api.list_comments(resolved_id, user)
    linked_issues = await documents_api.get_document_issues(resolved_id, user)
    result = doc.model_dump(mode="json")
    result["comments"] = [c.model_dump(mode="json") for c in comments]
    result["linked_issues"] = [i.model_dump(mode="json") for i in linked_issues]
    return result


@_boundary
async def doc_create(
    title: Annotated[str, Field(description="Document title.")],
    content: Annotated[str | None, Field(description="Document body (markdown).")] = None,
    icon: Annotated[str | None, Field(description="Emoji or short icon label for the document.")] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name to attach to. Omit for the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
    is_global: Annotated[
        bool,
        Field(description="Create as a global/team-wide document instead of project-scoped.")
    ] = False,
) -> dict:
    """Create a new document."""
    user = get_current_mcp_user()

    if project:
        project_id, team_id = await resolve_project(user, project, team)
    elif is_global:
        project_id = None
        team_id = await resolve_team(user, team)
    else:
        project_id, team_id = await resolve_project(user, None, team)

    document_in = DocumentCreate(title=title, content=content, icon=icon, project_id=project_id)
    created = await documents_api.create_document(team_id=team_id, document_in=document_in, current_user=user)
    return created.model_dump(mode="json")


# ---------------------------------------------------------------------------
# Activity
# ---------------------------------------------------------------------------

@_boundary
async def activity_recent(
    limit: Annotated[int, Field(description="Maximum number of activity entries to return.", ge=1, le=200)] = 20,
    project: Annotated[
        str | None,
        Field(description="Restrict to one project (id, key, or name). Omit for team-wide activity.")
    ] = None,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
) -> dict:
    """Show recent team activity: comments, status changes, assignments, etc."""
    user = get_current_mcp_user()

    project_id = None
    if project:
        project_id, team_id = await resolve_project(user, project, team)
    else:
        team_id = await resolve_team(user, team)

    activities = await issues_api.list_team_activities(
        team_id=team_id, current_user=user, limit=limit, project_id=project_id
    )
    return {"activities": [a.model_dump(mode="json") for a in (activities or [])]}


# ---------------------------------------------------------------------------
# Server assembly
# ---------------------------------------------------------------------------

ALL_TOOLS = (
    issue_list, issue_view, issue_create, issue_update, issue_comment, issue_start,
    doc_list, doc_view, doc_create, activity_recent,
)


def build_server() -> FastMCP:
    """Construct a standalone FastMCP instance with all tools registered.

    Used by tests (toolset-shape assertions) and by anything else that
    wants a throwaway server without touching the shared one behind
    /mcp (``asgi.get_fastmcp()``).
    """
    mcp = FastMCP(
        name="chaotic",
        instructions=(
            'Tools for the Chaotic issue tracker, scoped to the API key '
            'used to authenticate this connection. If a call reports '
            'multiple accessible teams/projects, pass `team` and/or '
            '`project` explicitly to disambiguate. Every tool returns a '
            'JSON object; failures come back as {"error": "..."} rather '
            'than a protocol error.'
        ),
    )
    for tool_fn in ALL_TOOLS:
        mcp.add_tool(tool_fn)
    return mcp
