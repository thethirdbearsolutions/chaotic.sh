"""Remote MCP tool definitions (CHT-1266) -- the backend-hosted sibling of
``chaotic mcp`` (cli/src/cli/mcp_server.py, stdio transport, CHT-1247/#215).

Same toolset, same names, same docstrings/descriptions, same shared
parameters (name, type, default, description) -- see cli/src/cli/mcp_server.py
for the canonical prose on each; docs/mcp-toolset-schema.json is the
checked-in snapshot both sides are asserted against. What's DIFFERENT here, and why this
isn't a shared import between the cli/ and backend/ packages:

* The stdio server is a thin adapter over ``cli.client.Client`` making
  HTTP calls back to this same backend; a hosted server obviously can't
  loop back through itself, so every tool body below calls straight into
  ``app.api``/``app.services`` instead of an HTTP client. Those API
  functions return their response schema by construction (CHT-1348;
  ADR-0005), so what a tool gets back is exactly what an HTTP client
  would see after ``response_model`` -- filtered to the schema's fields
  and with enums in wire form. A tool only ever ``.model_dump(mode="json")``s
  what it was handed; it never dumps an ORM row, and
  tests/test_api_return_contract.py fails if an API function reachable
  from here stops declaring a schema return type.
* The stdio server's auth/team/project context comes from the CLI's
  local profile (``chaotic project use``, etc.) -- there's no such thing
  server-side. Here it's resolved per-request from the caller's API key
  (``auth.py`` -> ``context.py``), and an API key's user can belong to
  more than one team/project where a CLI profile can't. That's the one
  place the schemas legitimately diverge: the team-scoped tools gain an
  additional optional ``team`` parameter the stdio version doesn't have
  (see ``_ADDITIVE_TEAM_TOOLS`` in backend/tests/test_mcp_toolset_sync.py
  for the current set, and ``scope.py`` for how it resolves). Tools that
  key off a globally-unique issue identifier, or that resolve their team
  from the entity they were handed, need no extra scoping parameter at
  all (``_IDENTICAL_TOOLS`` in that same test).
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

Deliberately NOT included (mirrors the stdio server exactly, see its
module docstring for the full rationale): no delete tool.
"""
from __future__ import annotations

import functools
from typing import Annotated, Literal

from fastapi import HTTPException
from pydantic import Field, ValidationError as PydanticValidationError

from mcp.server.fastmcp import FastMCP

from app.api import documents as documents_api
from app.api import projects as projects_api
from app.api import labels as labels_api
from app.api import rituals as rituals_api
from app.api import sprints as sprints_api
from app.api import issues as issues_api
from app.enums import (
    IssueStatus, IssuePriority, IssueType, IssueRelationType, SprintStatus,
)
from app.mcp_server.context import get_current_mcp_user
from app.mcp_server.scope import (
    ToolContextError,
    resolve_assignee,
    resolve_project,
    resolve_sprint,
    resolve_team,
)
from app.schemas.document import DocumentCreate, DocumentUpdate
from app.schemas.issue import (
    AddLabelRequest, IssueCommentCreate, IssueCreate, IssueRelationCreate, IssueUpdate,
)
from app.schemas.ritual import RitualAttestationCreate
from app.services.project_service import ProjectService

# Kept identical to cli/src/cli/commands/issue_cmd.py's ISSUE_TYPES /
# ISSUE_TYPE_ALIASES -- see this module's docstring.
ISSUE_TYPES = ["task", "bug", "feature", "chore", "docs", "tech_debt", "refactor", "epic"]
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



async def _apply_ticket_attestations(user, iss, identifier: str, attest: dict[str, str]) -> None:
    """Record per-ritual attestations on a ticket before a gated transition.

    Shared by issue_update and issue_start (CHT-1326/CHT-1342): both are
    non-interactive callers, and a gated transition attempted without
    these opens an intent the caller can never satisfy. Attesting the
    last pending ritual may fire the one-step auto-transition
    server-side, which makes the caller's own status change a no-op
    rather than a conflict.
    """
    from app.enums import ApprovalMode

    ritual_status = await rituals_api.get_pending_ticket_rituals(
        issue_id=iss.id, current_user=user,
    )
    pending = {r.name: r for r in ritual_status.pending_rituals}
    completed = {r.name for r in ritual_status.completed_rituals}
    for name, note in attest.items():
        if not (note and note.strip()):
            raise ToolContextError(
                f"Attestation note for ritual '{name}' must be non-empty."
            )
        rit = pending.get(name)
        if rit is None:
            if name in completed:
                continue  # already attested — idempotent
            known = ", ".join(sorted(pending)) or "none"
            raise ToolContextError(
                f"Ritual '{name}' is not a pending ticket ritual for "
                f"{identifier}. Pending: {known}."
            )
        if rit.attestation is not None:
            continue  # attested, awaiting approval — nothing to add
        attestation_in = RitualAttestationCreate(note=note)
        if rit.approval_mode == ApprovalMode.GATE:
            # Gate completion is human-only; the endpoint enforces it.
            await rituals_api.complete_gate_ritual_for_issue(
                ritual_id=rit.id, issue_id=iss.id,
                attestation_in=attestation_in, current_user=user,
            )
        else:
            await rituals_api.attest_ritual_for_issue(
                ritual_id=rit.id, issue_id=iss.id,
                attestation_in=attestation_in, current_user=user,
            )


# ---------------------------------------------------------------------------
# Issues
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# Response shapes (CHT-1370)
# ---------------------------------------------------------------------------
# List tools return a COMPACT projection of each row by default. The full
# response schema is what a row IS (ADR-0005); a list is what a model needs
# to SEE to pick the next call, and those differ: `issue_list` at limit=200
# was ~500 KB of descriptions and UUIDs. `detail=true` opts back into full
# rows. These constants are the contract for that projection --
# cli/scripts/gen_mcp_toolset_schema.py writes them into
# docs/mcp-toolset-schema.json under `_meta.response_shapes`, and both
# transports' test_mcp_toolset_sync.py assert their live copy matches, so
# the stdio and HTTP servers cannot drift on what a compact row contains.

COMPACT_ISSUE_FIELDS = (
    "identifier", "title", "status", "priority", "issue_type", "estimate",
    "assignee_id", "sprint_id", "parent_id", "labels", "updated_at",
)
COMPACT_DOCUMENT_FIELDS = (
    "id", "title", "icon", "project_id", "sprint_id", "author_name", "labels", "updated_at",
)
COMPACT_PROJECT_FIELDS = (
    "id", "key", "name", "description", "issue_count", "estimate_scale",
    "unestimated_handling", "default_sprint_budget", "require_estimate_on_claim",
    "human_rituals_required",
)
# Long free text in list/feed rows is cut to this many chars with an
# explicit `...(+N chars)` marker: project descriptions in project_list,
# old_value/new_value in activity_recent (an issue-description edit
# otherwise ships two full bodies per row).
TEXT_PREVIEW_CHARS = 200
# issue_view returns the newest N comments plus `comment_count`.
ISSUE_VIEW_COMMENT_CAP = 20

RESPONSE_SHAPES = {
    "compact_issue_fields": list(COMPACT_ISSUE_FIELDS),
    "compact_document_fields": list(COMPACT_DOCUMENT_FIELDS),
    "compact_project_fields": list(COMPACT_PROJECT_FIELDS),
    "text_preview_chars": TEXT_PREVIEW_CHARS,
    "issue_view_comment_cap": ISSUE_VIEW_COMMENT_CAP,
}

_DETAIL_ISSUE_DESC = (
    "Return every field of each issue (including description) instead of the "
    "compact row. Compact rows carry: identifier, title, status, priority, "
    "issue_type, estimate, assignee_id, sprint_id, parent_id, labels (names), "
    "updated_at. Use issue_view for one issue's full detail."
)
_DETAIL_DOC_DESC = (
    "Return every field of each document (including content) instead of the "
    "compact row. Compact rows carry: id, title, icon, project_id, sprint_id, "
    "author_name, labels (names), updated_at. Use doc_view for one document."
)
_DETAIL_PROJECT_DESC = (
    "Return every field of each project instead of the compact row. Compact rows "
    "carry: id, key, name, description (first 200 chars), issue_count, "
    "estimate_scale, unestimated_handling, default_sprint_budget, "
    "require_estimate_on_claim, human_rituals_required."
)


def _preview(text, limit: int = TEXT_PREVIEW_CHARS):
    """Cut long free text to `limit` chars with a marker that says how much
    was dropped, so a model knows to fetch the full record if it matters."""
    if not isinstance(text, str) or len(text) <= limit:
        return text
    return f"{text[:limit]}...(+{len(text) - limit} chars)"


def _compact(row: dict, fields) -> dict:
    """Project a full response-schema row down to `fields`. Labels become
    their names; a `description` becomes a preview."""
    out = {}
    for key in fields:
        value = row.get(key)
        if key == "labels" and isinstance(value, list):
            value = [lab["name"] if isinstance(lab, dict) else lab for lab in value]
        elif key == "description":
            value = _preview(value)
        out[key] = value
    return out


def _listing(key: str, rows, limit: int, fields, detail: bool) -> dict:
    """Standard list envelope: `{key: rows, count, truncated}`.

    Callers fetch `limit + 1` rows; the extra one is how `truncated` is
    known without a COUNT query. A model that sees truncated=true should
    narrow its filter rather than assume it saw everything.
    """
    rows = list(rows or [])
    page = rows[:limit]
    items = page if detail else [_compact(r, fields) for r in page]
    return {key: items, "count": len(items), "truncated": len(rows) > limit}


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
    detail: Annotated[bool, Field(description=_DETAIL_ISSUE_DESC)] = False,
) -> dict:
    """List issues in a project (or team-wide with all_projects=true), with filters.

    Returns compact rows plus `count` and `truncated`; truncated=true means
    `limit` cut the list -- narrow the filter rather than assume you saw
    everything. Pass detail=true for full rows.
    """
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
        limit=limit + 1,
        sort_by=sort_by,
        order=order,
    )
    rows = [i.model_dump(mode="json") for i in (issues or [])]
    return _listing("issues", rows, limit, COMPACT_ISSUE_FIELDS, detail)


@_boundary
async def issue_view(
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
) -> dict:
    """Show full issue detail: fields, description, the newest comments
    (up to 20, with `comment_count`), and compact rows for its sub-issues."""
    user = get_current_mcp_user()
    iss = await issues_api.get_issue_by_identifier(identifier, user)
    comments = await issues_api.list_comments(iss.id, user)
    sub_issues = await issues_api.list_sub_issues(iss.id, user)
    result = iss.model_dump(mode="json")
    result["comment_count"] = len(comments)
    result["comments"] = [c.model_dump(mode="json") for c in comments[-ISSUE_VIEW_COMMENT_CAP:]]
    result["sub_issues"] = [_compact(s.model_dump(mode="json"), COMPACT_ISSUE_FIELDS) for s in sub_issues]
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
    attest: Annotated[
        dict[str, str] | None,
        Field(description=(
            "Ritual attestation notes to record BEFORE applying the update, "
            "as a map of ritual name -> note, e.g. "
            '{"close-gate": "ADR written", "doc-refresh": "README updated"}. '
            "Use when closing (status=done) or claiming (status=in_progress) "
            "a ticket whose rituals require notes — without them the status "
            "change is blocked by pending rituals (CHT-1326)."
        )),
    ] = None,
) -> dict:
    """Update an issue's status, priority, estimate, assignee, title, and/or description.

    Only fields explicitly passed are changed. Returns the updated issue.
    Pass `attest` to satisfy pending close/claim rituals in the same call.
    """
    user = get_current_mcp_user()
    iss = await issues_api.get_issue_by_identifier(identifier, user)

    # Per-ritual attestations first (CHT-1326), so a gated status change
    # finds its rituals satisfied instead of opening a blocked intent
    # this non-interactive caller could never attest. Attesting the last
    # pending ritual may fire the one-step auto-transition server-side;
    # the update below is then a no-op for the status field.
    if attest:
        await _apply_ticket_attestations(user, iss, identifier, attest)

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

    if not fields and not attest:
        raise ToolContextError("No fields provided to update.")

    if not fields:
        refreshed = await issues_api.get_issue_by_identifier(identifier, user)
        return refreshed.model_dump(mode="json")

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
    attest: Annotated[
        dict[str, str] | None,
        Field(description=(
            "Ritual attestation notes to record BEFORE claiming, as a map of "
            'ritual name -> note, e.g. {"claim-gate": "branch cut"}. Required '
            "when the ticket has pending claim rituals -- without them the "
            "claim is blocked (CHT-1326). Use ritual_pending to see which "
            "rituals apply and what each one asks."
        )),
    ] = None,
    lease_seconds: Annotated[
        int | None,
        Field(description="Claim lease duration in seconds. Defaults to the "
                          "server-configured lease (CHT-1246).", ge=1)
    ] = None,
) -> dict:
    """Claim an issue: assign it to yourself and move it to in_progress.

    Equivalent to `chaotic issue start` (itself an alias for `issue
    claim`). Re-claiming a ticket you already hold extends the lease.
    """
    user = get_current_mcp_user()
    iss = await issues_api.get_issue_by_identifier(identifier, user)

    if attest:
        await _apply_ticket_attestations(user, iss, identifier, attest)

    updated = await issues_api.update_issue(
        issue_id=iss.id,
        issue_in=IssueUpdate(
            assignee_id=user.id,
            status=IssueStatus.IN_PROGRESS,
            lease_seconds=lease_seconds,
        ),
        current_user=user,
    )
    return updated.model_dump(mode="json")


@_boundary
async def issue_ready(
    mine: Annotated[
        bool,
        Field(description="Restrict to issues already assigned to you instead of unassigned ones.")
    ] = False,
    include_assigned: Annotated[
        bool,
        Field(description="Widen beyond unassigned-only to include already-assigned (but not-started) issues.")
    ] = False,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name to scope to. Defaults to the current project.")
    ] = None,
    all_projects: Annotated[
        bool,
        Field(description="Query across every project in the team instead of just the current/given one.")
    ] = False,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
    limit: Annotated[int, Field(description="Maximum number of issues to return.", ge=1, le=500)] = 20,
    detail: Annotated[bool, Field(description=_DETAIL_ISSUE_DESC)] = False,
) -> dict:
    """List issues that are open, unblocked, and unclaimed -- what you can start right now.

    Open + not-started (backlog/todo) only; excludes anything already
    in_progress/in_review/done/canceled, and excludes issues with an
    unresolved blocking relation. Priority-sorted (urgent first), then
    oldest first. Unassigned by default -- `mine` restricts to your own
    assigned-but-not-started work, `include_assigned` widens to every
    not-started issue regardless of assignee.

    Prefer this over issue_list when the question is "what should I pick
    up"; issue_list can filter by status and assignee but cannot express
    "has no unresolved blocker".
    """
    if mine and include_assigned:
        raise ToolContextError("Pass either `mine` or `include_assigned`, not both.")

    user = get_current_mcp_user()

    project_id = None
    if all_projects and not project:
        team_id = await resolve_team(user, team)
    else:
        project_id, team_id = await resolve_project(user, project, team)

    issues = await issues_api.list_ready_issues(
        current_user=user,
        project_id=project_id,
        team_id=team_id if not project_id else None,
        mine=mine,
        include_assigned=include_assigned,
        limit=limit + 1,
    )
    rows = [i.model_dump(mode="json") for i in (issues or [])]
    return _listing("issues", rows, limit, COMPACT_ISSUE_FIELDS, detail)


RELATION_TYPES = Literal["blocks", "relates_to", "duplicates"]


@_boundary
async def issue_relations(
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
) -> dict:
    """Show an issue's relations: what it blocks, what blocks it, duplicates, and related work.

    Each relation carries a `direction` ("outgoing"/"incoming") and its
    own `id` -- pass that id to issue_unblock to remove it. Incoming
    `blocks` edges are reported as `blocked_by`, so the relation_type
    always reads from the perspective of the issue you asked about.

    Worth calling before issue_start: issue_view does not report
    blockers, so an issue can look startable there while being blocked.
    """
    user = get_current_mcp_user()
    iss = await issues_api.get_issue_by_identifier(identifier, user)
    relations = await issues_api.list_relations(issue_id=iss.id, current_user=user)
    return {"relations": [r.model_dump(mode="json") for r in (relations or [])]}


@_boundary
async def issue_block(
    identifier: Annotated[str, Field(description="The blocking issue's identifier, e.g. CHT-123.")],
    blocked: Annotated[
        str,
        Field(description="The identifier of the issue on the other end of the relation, e.g. CHT-456.")
    ],
    relation_type: Annotated[
        RELATION_TYPES,
        Field(description="Relation to create. 'blocks': `identifier` blocks `blocked`. "
                          "'duplicates': `identifier` is a duplicate of `blocked`. "
                          "'relates_to': a plain association, no direction implied.")
    ] = "blocks",
) -> dict:
    """Relate two issues: by default, `identifier` blocks `blocked`.

    Direction matters for `blocks` -- the issue named first is the one
    holding the other up, and it's the second one that stops showing up
    in issue_ready.

    Re-relating an already-related pair is a no-op that returns the
    EXISTING relation -- including when you pass a different
    relation_type, which is silently not applied. To change the type,
    issue_unblock the pair first, then relate it again.
    """
    user = get_current_mcp_user()
    iss = await issues_api.get_issue_by_identifier(identifier, user)
    other = await issues_api.get_issue_by_identifier(blocked, user)
    created = await issues_api.create_relation(
        issue_id=iss.id,
        relation_in=IssueRelationCreate(
            related_issue_id=other.id,
            relation_type=IssueRelationType(relation_type),
        ),
        current_user=user,
    )
    return created if isinstance(created, dict) else created.model_dump(mode="json")


@_boundary
async def issue_unblock(
    identifier: Annotated[str, Field(description="Issue identifier the relation hangs off, e.g. CHT-123.")],
    related: Annotated[
        str | None,
        Field(description="Identifier of the issue on the other end, e.g. CHT-456. "
                          "Resolved to a relation automatically. Use relation_id instead "
                          "if more than one relation connects the two.")
    ] = None,
    relation_id: Annotated[
        str | None,
        Field(description="Exact relation id from issue_relations. Takes precedence over `related`.")
    ] = None,
) -> dict:
    """Remove a relation between two issues.

    Name the other issue with `related` and the relation is looked up
    for you; pass `relation_id` from issue_relations when the two issues
    are connected by more than one relation.

    Removes only the relation -- neither issue is touched.
    """
    if not related and not relation_id:
        raise ToolContextError("Pass either `related` (the other issue) or `relation_id`.")

    user = get_current_mcp_user()
    iss = await issues_api.get_issue_by_identifier(identifier, user)

    if not relation_id:
        other = await issues_api.get_issue_by_identifier(related, user)
        existing = await issues_api.list_relations(issue_id=iss.id, current_user=user)
        matches = [r for r in (existing or []) if r.related_issue_id == other.id]
        if not matches:
            raise ToolContextError(f"No relation between {identifier} and {related}.")
        if len(matches) > 1:
            listed = ", ".join(f"{r.relation_type} (id={r.id})" for r in matches)
            raise ToolContextError(
                f"{identifier} and {related} are connected by {len(matches)} relations: "
                f"{listed}. Pass `relation_id` to say which one to remove."
            )
        relation_id = matches[0].id

    await issues_api.delete_relation(
        issue_id=iss.id, relation_id=relation_id, current_user=user
    )
    return {
        "deleted": True,
        "id": relation_id,
        "issue_id": iss.id,
        "identifier": identifier,
    }


# ---------------------------------------------------------------------------
# Labels
# ---------------------------------------------------------------------------

async def _resolve_label_id(team_id: str, value: str) -> str:
    """Resolve a label name or id to a label id -- mirrors the CLI's
    ``resolve_label_id`` (cli/src/cli/commands/shared.py) closely enough
    for tool parity: exact id, then case-insensitive name, then id
    prefix (see module docstring on why this isn't a shared import).
    """
    # limit=1000: the API default is 100, and a team past that would make
    # a real label silently unresolvable -- reported as "no label matching
    # 'x'", a false negative dressed as user error (CHT-1351). project_list
    # widened for the same reason.
    try:
        labels = await labels_api.list_labels(
            team_id=team_id, current_user=get_current_mcp_user(), limit=1000,
        )
    except HTTPException as e:
        # Labels are a TEAM-level list, but this key may be scoped to a
        # single project. The write itself (add_label_to_issue) needs only
        # project access and would succeed -- it's the name->id lookup that
        # can't be performed. Say that, rather than surfacing the API's
        # "Not authorized to access this team", which names a team the
        # caller never mentioned and reads as though the write was refused.
        # Whether such keys should resolve team labels at all is an
        # authorization question, tracked separately (CHT-1352).
        if e.status_code in (401, 403):
            raise ToolContextError(
                "This API key is scoped to a project, and labels are defined "
                "per team -- so label names can't be looked up with it. Pass "
                "an explicit label id instead of a name, or use a team-scoped "
                "key."
            ) from e
        raise
    if not labels:
        raise ToolContextError("No labels exist in this team yet.")

    for label in labels:
        if label.id == value:
            return label.id

    lowered = value.lower()
    by_name = [l for l in labels if (l.name or "").lower() == lowered]
    if len(by_name) == 1:
        return by_name[0].id
    if len(by_name) > 1:
        listed = ", ".join(f"{l.name} (id={l.id})" for l in by_name)
        raise ToolContextError(f"Ambiguous label name '{value}'. Matches: {listed}.")

    by_prefix = [l for l in labels if l.id.startswith(value)]
    if len(by_prefix) == 1:
        return by_prefix[0].id
    if len(by_prefix) > 1:
        raise ToolContextError(f"Ambiguous label id prefix '{value}'.")

    known = ", ".join(sorted(l.name for l in labels))
    raise ToolContextError(f"No label matching '{value}'. Team labels: {known}.")


@_boundary
async def label_list(
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
) -> dict:
    """List the team's labels: id, name, and color.

    The lookup that makes issue_list's `label` filter usable -- without
    it a caller has to already know the taxonomy to filter by it, or
    guess. Also the source of the names issue_label accepts.
    """
    user = get_current_mcp_user()
    team_id = await resolve_team(user, team)
    labels = await labels_api.list_labels(team_id=team_id, current_user=user, limit=1000)
    return {"labels": [l.model_dump(mode="json") for l in (labels or [])]}


@_boundary
async def issue_label(
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
    add: Annotated[
        list[str] | None,
        Field(description="Label names (or ids) to add. Names are matched case-insensitively.")
    ] = None,
    remove: Annotated[
        list[str] | None,
        Field(description="Label names (or ids) to remove.")
    ] = None,
) -> dict:
    """Add and/or remove labels on an issue.

    Additive and subtractive rather than replacing the whole set, so
    labelling an issue never silently drops someone else's label. Labels
    must already exist -- this does not create them. Use label_list to
    see them, or pass a label id directly if your key is project-scoped
    (label_list is team-scoped and needs a team-scoped key).

    Adding a label the issue already has, or removing one it doesn't
    have, is a no-op rather than an error, so the same call is safe to
    repeat.
    """
    if not add and not remove:
        raise ToolContextError("Pass `add` and/or `remove` with at least one label.")

    user = get_current_mcp_user()
    iss = await issues_api.get_issue_by_identifier(identifier, user)
    team_id = await _team_id_for_project(iss.project_id)

    existing = {l.id for l in (iss.labels or [])}

    added, removed = [], []
    for value in add or []:
        label_id = await _resolve_label_id(team_id, value)
        if label_id not in existing:
            await issues_api.add_label_to_issue(
                issue_id=iss.id, body=AddLabelRequest(label_id=label_id), current_user=user,
            )
            existing.add(label_id)
            added.append(value)
    for value in remove or []:
        label_id = await _resolve_label_id(team_id, value)
        if label_id in existing:
            await issues_api.remove_label_from_issue(
                issue_id=iss.id, label_id=label_id, current_user=user,
            )
            existing.discard(label_id)
            removed.append(value)

    updated = await issues_api.get_issue_by_identifier(identifier, user)
    result = updated.model_dump(mode="json")
    result["labels_added"] = added
    result["labels_removed"] = removed
    return result


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
    detail: Annotated[bool, Field(description=_DETAIL_DOC_DESC)] = False,
) -> dict:
    """List documents (project-scoped by default, team-wide with all_projects=true).

    Compact rows plus `count` and `truncated`; detail=true for full rows.
    """
    user = get_current_mcp_user()

    if project:
        project_id, team_id = await resolve_project(user, project, team)
    elif all_projects:
        project_id = None
        team_id = await resolve_team(user, team)
    else:
        project_id, team_id = await resolve_project(user, None, team)

    documents = await documents_api.list_documents(
        team_id=team_id, current_user=user, project_id=project_id, search=search, limit=limit + 1
    )
    rows = [d.model_dump(mode="json") for d in (documents or [])]
    return _listing("documents", rows, limit, COMPACT_DOCUMENT_FIELDS, detail)


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


@_boundary
async def doc_update(
    document_id: Annotated[str, Field(description="Document id, exact title, or id prefix.")],
    title: Annotated[str | None, Field(description="New document title. Omit to leave unchanged.")] = None,
    content: Annotated[
        str | None,
        Field(description="New document body (markdown). Omit to leave unchanged.")
    ] = None,
    icon: Annotated[
        str | None,
        Field(description="New emoji or short icon label. Omit to leave unchanged.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Move the document to this project (id, key, or name).")
    ] = None,
    is_global: Annotated[
        bool,
        Field(description="Make the document global/team-wide by detaching it from its project.")
    ] = False,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
) -> dict:
    """Update a document's title, content, icon, or project.

    Only the fields you pass are changed; omitted ones are left alone.
    Editing the title or content appends a new revision snapshot, so the
    prior version stays readable in the document's history -- an edit
    never destroys what it replaced.
    """
    user = get_current_mcp_user()
    resolved_id = await _resolve_document_id(user, document_id)

    fields: dict = {}
    if title is not None:
        fields["title"] = title
    if content is not None:
        fields["content"] = content
    if icon is not None:
        fields["icon"] = icon
    if project and is_global:
        raise ToolContextError(
            "Pass either `project` (move to that project) or `is_global` "
            "(detach from any project), not both."
        )
    if project:
        # `team` is needed here and nowhere else in this tool: the document
        # itself is found by _resolve_document_id (which already spans every
        # team the key can reach), but naming a DESTINATION project needs a
        # team to disambiguate against. Without it a multi-team key was told
        # to "pass `team`" by a tool that had no such parameter (CHT-1351).
        project_id, _ = await resolve_project(user, project, team)
        fields["project_id"] = project_id
    elif is_global:
        fields["project_id"] = None

    if not fields:
        raise ToolContextError(
            "No updates provided. Pass at least one of: title, content, "
            "icon, project, is_global."
        )

    # Build with only the caller's fields set: DocumentService.update()
    # keys off model_dump(exclude_unset=True), and it's that same
    # dict that decides whether the edit snapshots a new revision.
    document_in = DocumentUpdate(**fields)
    updated = await documents_api.update_document(
        document_id=resolved_id, document_in=document_in, current_user=user
    )
    return updated.model_dump(mode="json")


@_boundary
async def doc_link(
    document_id: Annotated[str, Field(description="Document id, exact title, or id prefix.")],
    identifier: Annotated[str, Field(description="Issue identifier to link to, e.g. CHT-123.")],
) -> dict:
    """Link a document to an issue.

    The link shows up in doc_view's `linked_issues`. Linking a pair
    that's already linked is a no-op rather than an error.
    """
    user = get_current_mcp_user()
    resolved_id = await _resolve_document_id(user, document_id)
    iss = await issues_api.get_issue_by_identifier(identifier, user)
    await documents_api.link_document_to_issue(
        document_id=resolved_id, issue_id=iss.id, current_user=user,
    )
    return {
        "linked": True,
        "document_id": resolved_id,
        "issue_id": iss.id,
        "identifier": identifier,
    }


@_boundary
async def doc_unlink(
    document_id: Annotated[str, Field(description="Document id, exact title, or id prefix.")],
    identifier: Annotated[str, Field(description="Issue identifier to unlink, e.g. CHT-123.")],
) -> dict:
    """Remove the link between a document and an issue.

    Removes only the association -- neither the document nor the issue
    is deleted.
    """
    user = get_current_mcp_user()
    resolved_id = await _resolve_document_id(user, document_id)
    iss = await issues_api.get_issue_by_identifier(identifier, user)
    await documents_api.unlink_document_from_issue(
        document_id=resolved_id, issue_id=iss.id, current_user=user,
    )
    return {
        "unlinked": True,
        "document_id": resolved_id,
        "issue_id": iss.id,
        "identifier": identifier,
    }


# ---------------------------------------------------------------------------
# Sprints
# ---------------------------------------------------------------------------

SPRINT_STATUS_VALUES = Literal["planned", "active", "completed"]


def _with_budget_state(sprint: dict) -> dict:
    """Annotate a sprint with its derived budget state.

    ``budget``/``points_spent`` are stored; "am I in arrears" is not --
    it's the comparison between them, and it's the thing that decides
    whether issue_update can move a ticket to in_progress/done/canceled
    at all. An agent that has to derive that itself will usually not
    think to, so spell it out.
    """
    budget = sprint.get("budget")
    spent = sprint.get("points_spent") or 0
    over = (spent - budget) if budget is not None else 0
    sprint = dict(sprint)
    sprint["in_arrears"] = over > 0
    sprint["arrears_by"] = max(over, 0)
    sprint["points_remaining"] = None if budget is None else budget - spent
    return sprint


@_boundary
async def sprint_current(
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
) -> dict:
    """Show the active sprint: budget, points spent, limbo and arrears state.

    Call this when a write is refused with `sprint_in_arrears` or
    `sprint_in_limbo` -- it reports what's actually blocking, which
    nothing else on this surface does.

    Only closed tickets accrue budget: completing an issue charges the
    project's currently-active sprint (estimate points, or 1 point if
    unestimated), whichever sprint the ticket itself belonged to.
    Going over budget blocks moving any ticket to in_progress/done/
    canceled project-wide until the sprint is closed.
    """
    user = get_current_mcp_user()
    project_id, _ = await resolve_project(user, project, team)
    sprint = await sprints_api.get_current_sprint(project_id=project_id, current_user=user)
    return _with_budget_state(sprint.model_dump(mode="json"))


@_boundary
async def sprint_list(
    status: Annotated[
        SPRINT_STATUS_VALUES | None,
        Field(description="Filter by sprint status.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
) -> dict:
    """List a project's sprints, with each one's budget state."""
    user = get_current_mcp_user()
    project_id, _ = await resolve_project(user, project, team)
    sprints = await sprints_api.list_sprints(
        project_id=project_id,
        current_user=user,
        sprint_status=SprintStatus(status) if status else None,
    )
    return {"sprints": [_with_budget_state(s.model_dump(mode="json")) for s in (sprints or [])]}


@_boundary
async def sprint_close(
    sprint: Annotated[
        str | None,
        Field(description="Sprint name, id, or 'current'. Defaults to the active sprint.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
) -> dict:
    """Close a sprint and rotate to the next planned one.

    This is the remedy for `sprint_in_arrears`: budget is only released
    by closing, not by editing tickets.

    If the project has per-sprint rituals, closing enters LIMBO instead
    of rotating -- the returned sprint has `limbo: true`, and the next
    step is ritual_pending / ritual_complete. Check `limbo` on the
    result rather than assuming the rotation happened.

    Rotating sprints is a project-wide state change that affects
    everyone's budget accounting, so prefer sprint_current first and
    close deliberately.
    """
    user = get_current_mcp_user()
    project_id, _ = await resolve_project(user, project, team)
    sprint_id = await resolve_sprint(project_id, sprint or "current")
    closed = await sprints_api.close_sprint(sprint_id=sprint_id, current_user=user)
    result = _with_budget_state(closed.model_dump(mode="json"))
    result["entered_limbo"] = bool(result.get("limbo"))

    # Budget state on the CLOSED sprint is history: it stays in arrears
    # forever, because that is what it spent. What the caller actually
    # asked -- "am I unblocked now?" -- is a property of whatever sprint
    # is active AFTER the rotation, so report that separately rather than
    # leaving `in_arrears: true` on a successful close to be misread as
    # "still blocked" (CHT-1351).
    if not result["entered_limbo"]:
        active = await sprints_api.get_current_sprint(project_id=project_id, current_user=user)
        result["now_active"] = _with_budget_state(active.model_dump(mode="json")) if active else None
    else:
        result["now_active"] = None
    return result


@_boundary
async def sprint_transactions(
    sprint: Annotated[
        str | None,
        Field(description="Sprint name, id, or 'current'. Defaults to the active sprint.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
) -> dict:
    """Show a sprint's budget transactions -- the audit trail behind points_spent.

    One row per ticket completion charged to this sprint. Use it to
    reconcile a points_spent number that looks wrong before assuming a
    bug: closing older work after a rotation charges the *new* active
    sprint by design.
    """
    user = get_current_mcp_user()
    project_id, _ = await resolve_project(user, project, team)
    sprint_id = await resolve_sprint(project_id, sprint or "current")
    txns = await sprints_api.list_transactions(sprint_id=sprint_id, current_user=user)
    return {"transactions": [t.model_dump(mode="json") for t in (txns or [])]}


async def _set_sprint_on_issues(user, identifiers: list[str], sprint_id: str | None) -> dict:
    """Apply a sprint change per-issue, reporting partial success.

    Mirrors the CLI's own loop: the backend's batch-update endpoint
    deliberately excludes sprint_id (sprint moves need per-issue
    validation), so one bad identifier in a list shouldn't silently
    discard the rest -- collect failures and report both sides.
    """
    updated, failed = [], []
    for identifier in identifiers:
        try:
            iss = await issues_api.get_issue_by_identifier(identifier, user)
            await issues_api.update_issue(
                issue_id=iss.id,
                issue_in=IssueUpdate(sprint_id=sprint_id),
                current_user=user,
            )
            updated.append(identifier)
        except HTTPException as e:
            failed.append({"identifier": identifier, "error": e.detail})
    return {"updated": updated, "failed": failed, "sprint_id": sprint_id}


@_boundary
async def sprint_add(
    identifiers: Annotated[
        list[str],
        Field(description="Issue identifiers to add, e.g. ['CHT-12', 'CHT-13'].")
    ],
    sprint: Annotated[
        str | None,
        Field(description="Sprint name, id, or 'current'. Defaults to the active sprint.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
) -> dict:
    """Add issues to a sprint.

    Sprint membership does not by itself charge budget -- only closing a
    ticket does, and it charges whichever sprint is active at that
    moment.
    """
    if not identifiers:
        raise ToolContextError("Pass at least one issue identifier.")

    user = get_current_mcp_user()
    project_id, _ = await resolve_project(user, project, team)
    sprint_id = await resolve_sprint(project_id, sprint or "current")
    return await _set_sprint_on_issues(user, identifiers, sprint_id)


@_boundary
async def sprint_remove(
    identifiers: Annotated[
        list[str],
        Field(description="Issue identifiers to remove from their sprint.")
    ],
) -> dict:
    """Remove issues from whatever sprint they're in (leaves them unscheduled)."""
    if not identifiers:
        raise ToolContextError("Pass at least one issue identifier.")
    return await _set_sprint_on_issues(get_current_mcp_user(), identifiers, None)


# ---------------------------------------------------------------------------
# Rituals
# ---------------------------------------------------------------------------

_TICKET_TRIGGERS = ("ticket_close", "ticket_claim")


def _trigger_of(rit: dict) -> str:
    """A ritual's trigger as the enum's VALUE, whatever form it arrives in.

    Coerced through RitualTrigger rather than case-folded. The old fold
    worked only because every current member happens to satisfy
    ``NAME.lower() == value`` -- a coincidence of these three, not a
    property of the codebase: ``DocumentActivityType.CREATED`` is
    ``"doc_created"`` and would break it silently. Adding such a member
    to RitualTrigger would have stopped the belt belting with no test
    failing (CHT-1354).

    Falls back to the raw string for a value the enum doesn't know, so an
    unrecognised trigger still reaches the sprint branch rather than
    raising here.
    """
    from app.enums import RitualTrigger

    raw = rit.get("trigger") or ""
    if isinstance(raw, RitualTrigger):
        return raw.value
    try:
        return RitualTrigger[raw].value
    except KeyError:
        pass
    try:
        return RitualTrigger(raw).value
    except ValueError:
        return raw


async def _limbo(user, project_id: str) -> dict:
    status = await rituals_api.get_limbo_status(project_id=project_id, current_user=user)
    return status.model_dump(mode="json") if status else {}


async def _find_ritual(user, project_id: str, name: str) -> dict:
    """Resolve a ritual by name (case-insensitively), or by id."""
    rituals = [
        r.model_dump(mode="json")
        for r in (await rituals_api.list_rituals(project_id=project_id, current_user=user) or [])
    ]
    if not rituals:
        raise ToolContextError("This project has no rituals configured.")

    for rit in rituals:
        if rit.get("id") == name:
            return rit
    lowered = name.lower()
    matches = [r for r in rituals if (r.get("name") or "").lower() == lowered]
    if len(matches) == 1:
        return matches[0]
    if len(matches) > 1:
        raise ToolContextError(f"Ambiguous ritual name '{name}'.")

    known = ", ".join(sorted(r["name"] for r in rituals))
    raise ToolContextError(f"No ritual named '{name}'. This project's rituals: {known}.")


def _require_note(rit: dict, note: str | None) -> None:
    """Reject a missing note the way the CLI does -- quoting the ritual's
    own prompt, because that prompt is the question the note has to
    answer and the caller has no other way to see it.
    """
    if rit.get("note_required", True) and not (note and note.strip()):
        raise ToolContextError(
            f"Ritual '{rit['name']}' requires a note. It asks: \"{rit.get('prompt')}\". "
            "Pass `note` with your answer."
        )


@_boundary
async def ritual_pending(
    identifier: Annotated[
        str | None,
        Field(description="Issue identifier for ticket-level rituals, e.g. CHT-123. "
                          "Omit for the project's sprint rituals.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
) -> dict:
    """Show which rituals are currently blocking you, and what each one asks.

    Without `identifier`: the project's pending SPRINT rituals -- what a
    sprint sitting in limbo after sprint_close is waiting on.
    With `identifier`: the pending close/claim rituals gating that ticket.

    This is the lookup that makes attestation possible at all: rituals
    are addressed by name, and nothing else on this surface tells you
    what those names are or what each one is asking for. Each entry
    carries its `prompt` (the question your note must answer),
    `approval_mode`, and any existing `attestation`.
    """
    user = get_current_mcp_user()

    if identifier:
        # Resolved AFTER the branch: a ticket's rituals are found from the
        # issue itself, so demanding project/team disambiguation here made
        # a multi-team key supply scoping that was then discarded -- and
        # blocked the call outright when it couldn't (CHT-1351).
        iss = await issues_api.get_issue_by_identifier(identifier, user)
        pending = (await rituals_api.get_pending_ticket_rituals(
            issue_id=iss.id, current_user=user
        )).model_dump(mode="json")
        rituals = pending.get("pending_rituals", []) or []
        return {
            "scope": "ticket",
            "identifier": identifier,
            "pending_rituals": rituals,
            "unattested": [r["name"] for r in rituals if not r.get("attestation")],
        }

    project_id, _ = await resolve_project(user, project, team)
    status = await _limbo(user, project_id)
    rituals = status.get("pending_rituals", []) or []
    return {
        "scope": "sprint",
        "in_limbo": bool(status.get("in_limbo")),
        "pending_rituals": rituals,
        "unattested": [r["name"] for r in rituals if not r.get("attestation")],
    }


@_boundary
async def ritual_list(
    include_inactive: Annotated[
        bool,
        Field(description="Include deactivated rituals as well as active ones.")
    ] = False,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
) -> dict:
    """List a project's configured rituals: name, trigger, prompt, and approval mode.

    `trigger` tells you which scope a ritual belongs to -- ticket_close
    and ticket_claim gate individual tickets, everything else gates the
    sprint. ritual_attest works that out for you.
    """
    user = get_current_mcp_user()
    project_id, _ = await resolve_project(user, project, team)
    rituals = await rituals_api.list_rituals(
        project_id=project_id, current_user=user, include_inactive=include_inactive,
    )
    return {"rituals": [r.model_dump(mode="json") for r in (rituals or [])]}


@_boundary
async def ritual_attest(
    ritual: Annotated[str, Field(description="Ritual name (or id), from ritual_pending/ritual_list.")],
    note: Annotated[
        str | None,
        Field(description="Your attestation note -- the answer to the ritual's prompt. "
                          "Required unless the ritual sets note_required=false.")
    ] = None,
    identifier: Annotated[
        str | None,
        Field(description="Issue identifier, for ticket-level rituals. Looked up "
                          "automatically when the ritual is ticket-scoped.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
) -> dict:
    """Attest a ritual -- confirm you did the thing it asks about.

    Dispatches on the ritual's own trigger, so you don't have to know
    whether it's sprint-scoped or ticket-scoped: pass `identifier` when
    attesting a ticket's close/claim gate, omit it for a sprint ritual.

    If the ritual's approval_mode is `auto` this clears it outright.
    Under `review` it records the attestation and leaves it pending a
    human; `approved` in the result says which happened.

    Under `gate` this is REFUSED -- gate rituals are human-completion
    only and the server rejects an attestation outright rather than
    recording one. Use ritual_complete for those, and ritual_list to see
    each ritual's approval_mode before choosing.
    """
    user = get_current_mcp_user()
    project_id, _ = await resolve_project(user, project, team)
    rit = await _find_ritual(user, project_id, ritual)
    _require_note(rit, note)

    if _trigger_of(rit) in _TICKET_TRIGGERS:
        if not identifier:
            raise ToolContextError(
                f"Ritual '{rit['name']}' is a {_trigger_of(rit)} ritual -- pass "
                "`identifier` naming the ticket it gates."
            )
        iss = await issues_api.get_issue_by_identifier(identifier, user)
        result = (await rituals_api.attest_ritual_for_issue(
            ritual_id=rit["id"], issue_id=iss.id,
            attestation_in=RitualAttestationCreate(note=note), current_user=user,
        )).model_dump(mode="json")
        return {
            "scope": "ticket",
            "ritual": rit["name"],
            "identifier": identifier,
            "approved": bool(result.get("approved_at")),
            "attestation": result,
        }

    result = (await rituals_api.attest_ritual(
        ritual_id=rit["id"], attestation_in=RitualAttestationCreate(note=note),
        current_user=user, project_id=project_id,
    )).model_dump(mode="json")
    status = await _limbo(user, project_id)
    return {
        "scope": "sprint",
        "ritual": rit["name"],
        "approved": bool(result.get("approved_at")),
        "still_in_limbo": bool(status.get("in_limbo")),
        "remaining": [r["name"] for r in (status.get("pending_rituals") or [])],
        "attestation": result,
    }


@_boundary
async def ritual_complete(
    ritual: Annotated[str, Field(description="Ritual name (or id), from ritual_pending/ritual_list.")],
    note: Annotated[str | None, Field(description="Optional note about the completion.")] = None,
    identifier: Annotated[
        str | None,
        Field(description="Issue identifier, for ticket-level rituals.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
) -> dict:
    """Complete a GATE-mode ritual.

    Distinct from ritual_attest: gate rituals are the ones a human is
    supposed to sign off, and the server enforces that -- expect a
    permission error rather than success if the calling identity isn't
    allowed to. Attesting is the normal path; this is for the rare case
    where you legitimately hold that role.
    """
    user = get_current_mcp_user()
    project_id, _ = await resolve_project(user, project, team)
    rit = await _find_ritual(user, project_id, ritual)

    if _trigger_of(rit) in _TICKET_TRIGGERS:
        if not identifier:
            raise ToolContextError(
                f"Ritual '{rit['name']}' is a {_trigger_of(rit)} ritual -- pass "
                "`identifier` naming the ticket it gates."
            )
        iss = await issues_api.get_issue_by_identifier(identifier, user)
        result = (await rituals_api.complete_gate_ritual_for_issue(
            ritual_id=rit["id"], issue_id=iss.id,
            attestation_in=RitualAttestationCreate(note=note), current_user=user,
        )).model_dump(mode="json")
        return {"scope": "ticket", "ritual": rit["name"],
                "identifier": identifier, "attestation": result}

    result = (await rituals_api.complete_gate_ritual(
        ritual_id=rit["id"], attestation_in=RitualAttestationCreate(note=note),
        current_user=user, project_id=project_id,
    )).model_dump(mode="json")
    status = await _limbo(user, project_id)
    return {
        "scope": "sprint",
        "ritual": rit["name"],
        "still_in_limbo": bool(status.get("in_limbo")),
        "remaining": [r["name"] for r in (status.get("pending_rituals") or [])],
        "attestation": result,
    }


# ---------------------------------------------------------------------------
# Projects
# ---------------------------------------------------------------------------

@_boundary
async def project_list(
    team: Annotated[str | None, Field(description=_TEAM_FIELD_DEFAULT)] = None,
    detail: Annotated[bool, Field(description=_DETAIL_PROJECT_DESC)] = False,
) -> dict:
    """List the projects in your team: id, key, name, and issue count.

    The one call that answers "what projects exist" -- every other tool
    takes a `project` filter but none enumerate them. Scoped to the
    current team (`chaotic status`); the HTTP transport adds a `team`
    parameter for API keys that can see more than one.
    """
    user = get_current_mcp_user()
    team_id = await resolve_team(user, team)
    # limit=1000 for the same reason as label_list: the API default of 100
    # would make a real project silently unresolvable (CHT-1351).
    projects = await projects_api.list_projects(team_id=team_id, current_user=user, limit=1001)
    rows = [p.model_dump(mode="json") for p in (projects or [])]
    return _listing("projects", rows, 1000, COMPACT_PROJECT_FIELDS, detail)


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
    """Show recent team activity: comments, status changes, assignments, etc.

    `old_value`/`new_value` are cut to a 200-char preview (an edited
    description would otherwise ship two full bodies per row); use
    issue_view for the current text. Includes `count` and `truncated`.
    """
    user = get_current_mcp_user()

    project_id = None
    if project:
        project_id, team_id = await resolve_project(user, project, team)
    else:
        team_id = await resolve_team(user, team)

    # The REST endpoint caps limit at 200, so the +1 probe stops there.
    fetch = min(limit + 1, 200)
    activities = await issues_api.list_team_activities(
        team_id=team_id, current_user=user, limit=fetch, project_id=project_id
    )
    rows = [a.model_dump(mode="json") for a in (activities or [])]
    page = rows[:limit]
    for a in page:
        a["old_value"] = _preview(a.get("old_value"))
        a["new_value"] = _preview(a.get("new_value"))
    return {"activities": page, "count": len(page), "truncated": len(rows) > limit}


# ---------------------------------------------------------------------------
# Server assembly
# ---------------------------------------------------------------------------

ALL_TOOLS = (
    issue_list, issue_view, issue_create, issue_update, issue_comment, issue_start,
    issue_ready, issue_relations, issue_block, issue_unblock,
    label_list, issue_label,
    doc_link, doc_unlink,
    sprint_current, sprint_list, sprint_close, sprint_transactions,
    sprint_add, sprint_remove,
    ritual_pending, ritual_list, ritual_attest, ritual_complete,
    doc_list, doc_view, doc_create, doc_update, activity_recent, project_list,
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
