"""Issue and label tools."""
from __future__ import annotations

from typing import Annotated

from pydantic import Field

from ..backend import Backend
from ..constants import (
    ISSUE_TYPE_ALIASES,
    ISSUE_TYPES,
    PRIORITY_VALUES,
    RELATION_TYPES,
    SORT_FIELDS,
    SORT_ORDER,
    STATUS_VALUES,
    TEAM_FIELD_DESC,
)
from ..errors import BackendError, ToolInputError
from ..estimates import off_scale_warning
from ..shapes import (
    COMPACT_ISSUE_FIELDS,
    DETAIL_ISSUE_DESC,
    ISSUE_VIEW_COMMENT_CAP,
    ISSUE_VIEW_FETCH_LIMIT,
    OFFSET_PROBE_SORT_KEYS,
    compact,
    listing,
)


def _resolve_issue_type(value: str) -> str:
    lower = value.lower()
    if lower in ISSUE_TYPES:
        return lower
    if lower in ISSUE_TYPE_ALIASES:
        return ISSUE_TYPE_ALIASES[lower]
    valid = ", ".join(ISSUE_TYPES)
    aliases = ", ".join(f"{k}->{v}" for k, v in ISSUE_TYPE_ALIASES.items())
    raise ToolInputError(f"'{value}' is not a valid issue type. Valid: {valid}. Aliases: {aliases}.")


async def _apply_ticket_attestations(backend: Backend, iss: dict, identifier: str, attest: dict[str, str]) -> None:
    """Record per-ritual attestations on a ticket before a gated transition.

    Shared by issue_update and issue_start (CHT-1326/CHT-1342): both are
    non-interactive callers, and a gated transition attempted without
    these opens an intent the caller can never satisfy. Attesting the
    last pending ritual may fire the one-step auto-transition
    server-side, which makes the caller's own status change a no-op
    rather than a conflict.
    """
    ritual_status = await backend.get_pending_issue_rituals(iss["id"]) or {}
    pending = {r["name"]: r for r in ritual_status.get("pending_rituals", []) or []}
    completed = {r["name"] for r in ritual_status.get("completed_rituals", []) or []}
    for name, note in attest.items():
        if not (note and note.strip()):
            raise ToolInputError(
                f"Attestation note for ritual '{name}' must be non-empty."
            )
        rit = pending.get(name)
        if rit is None:
            if name in completed:
                continue  # already attested — idempotent
            known = ", ".join(sorted(pending)) or "none"
            raise ToolInputError(
                f"Ritual '{name}' is not a pending ticket ritual for "
                f"{identifier}. Pending: {known}."
            )
        if rit.get("attestation"):
            continue  # attested, awaiting approval — nothing to add
        if rit.get("approval_mode") == "gate":
            # Gate completion is human-only; the server enforces it.
            await backend.complete_gate_ritual_for_issue(rit["id"], iss["id"], note)
        else:
            await backend.attest_ritual_for_issue(rit["id"], iss["id"], note)


async def _resolve_label_id(backend: Backend, team_id: str, value: str) -> str:
    """Resolve a label name or id to a label id: exact id, then
    case-insensitive name, then id prefix."""
    # limit=1000: the API default is 100, and a team past that would make
    # a real label silently unresolvable -- reported as "no label matching
    # 'x'", a false negative dressed as user error (CHT-1351). project_list
    # widened for the same reason.
    try:
        labels = await backend.list_labels(team_id, 1000)
    except BackendError as e:
        # Labels are a TEAM-level list, but this key may be scoped to a
        # single project. The write itself (add_label) needs only project
        # access and would succeed -- it's the name->id lookup that can't
        # be performed. Say that, rather than surfacing the API's "Not
        # authorized to access this team", which names a team the caller
        # never mentioned and reads as though the write was refused.
        # Whether such keys should resolve team labels at all is an
        # authorization question, tracked separately (CHT-1352).
        if e.http_status in (401, 403):
            raise ToolInputError(
                "This API key is scoped to a project, and labels are defined "
                "per team -- so label names can't be looked up with it. Pass "
                "an explicit label id instead of a name, or use a team-scoped "
                "key."
            ) from e
        raise
    if not labels:
        raise ToolInputError("No labels exist in this team yet.")

    for label in labels:
        if label["id"] == value:
            return label["id"]

    lowered = value.lower()
    by_name = [l for l in labels if (l.get("name") or "").lower() == lowered]
    if len(by_name) == 1:
        return by_name[0]["id"]
    if len(by_name) > 1:
        listed = ", ".join(f"{l['name']} (id={l['id']})" for l in by_name)
        raise ToolInputError(f"Ambiguous label name '{value}'. Matches: {listed}.")

    by_prefix = [l for l in labels if l["id"].startswith(value)]
    if len(by_prefix) == 1:
        return by_prefix[0]["id"]
    if len(by_prefix) > 1:
        raise ToolInputError(f"Ambiguous label id prefix '{value}'.")

    known = ", ".join(sorted(l["name"] for l in labels))
    raise ToolInputError(f"No label matching '{value}'. Team labels: {known}.")


async def issue_list(
    backend: Backend,
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
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
    limit: Annotated[int, Field(description="Maximum number of issues to return.", ge=1, le=500)] = 50,
    sort_by: Annotated[SORT_FIELDS, Field(description="Sort field.")] = "updated",
    order: Annotated[SORT_ORDER, Field(description="Sort direction.")] = "desc",
    detail: Annotated[bool, Field(description=DETAIL_ISSUE_DESC)] = False,
) -> dict:
    """List issues in a project (or team-wide with all_projects=true), with filters.

    Returns compact rows plus `count` and `truncated`; truncated=true means
    `limit` cut the list -- narrow the filter rather than assume you saw
    everything. Pass detail=true for full rows.
    """
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
        team_id = await backend.resolve_team(team)
    else:
        project_id, team_id = await backend.resolve_project(project, team)

    assignee_id = await backend.resolve_assignee(assignee, team_id) if assignee else None

    parent_id = None
    if epic:
        parent_id = (await backend.get_issue(epic))["id"]

    sprint_id = None
    if sprint and project_id:
        sprint_id = await backend.resolve_sprint(sprint, project_id)

    filters = dict(
        project_id=project_id,
        team_id=team_id if not project_id else None,
        statuses=list(status) if status else None,
        priorities=list(priority) if priority else None,
        assignee_id=assignee_id,
        label=label,
        search=search,
        sprint_id=sprint_id,
        parent_id=parent_id,
    )
    issues = await backend.list_issues(
        **filters,
        limit=limit if sort_by in OFFSET_PROBE_SORT_KEYS else limit + 1,
        sort_by=sort_by,
        order=order,
    )
    result = listing("issues", issues, limit, COMPACT_ISSUE_FIELDS, detail)
    if sort_by in OFFSET_PROBE_SORT_KEYS:
        # See OFFSET_PROBE_SORT_KEYS: probe for a row past `limit` with the
        # same filters instead of over-fetching, which would perturb the
        # page after the service's Python re-sort.
        more = await backend.list_issues(
            **filters, skip=limit, limit=1, sort_by="created", order="desc",
        )
        result["truncated"] = bool(more)
    return result


async def issue_view(
    backend: Backend,
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
) -> dict:
    """Show full issue detail: fields, description, the newest comments
    (up to 20, with `comment_count`), and compact rows for its sub-issues
    (with `sub_issue_count`)."""
    iss = dict(await backend.get_issue(identifier))
    comments = await backend.list_comments(iss["id"], ISSUE_VIEW_FETCH_LIMIT) or []
    iss["comment_count"] = len(comments)
    iss["comments"] = list(comments[-ISSUE_VIEW_COMMENT_CAP:])
    try:
        subs = await backend.list_sub_issues(iss["id"], ISSUE_VIEW_FETCH_LIMIT) or []
    except BackendError:
        subs = []
    iss["sub_issue_count"] = len(subs)
    iss["sub_issues"] = [compact(s, COMPACT_ISSUE_FIELDS) for s in subs]
    return iss


async def issue_create(
    backend: Backend,
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
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
    parent: Annotated[
        str | None,
        Field(description="Parent issue identifier (e.g. CHT-12) to create this as a sub-issue.")
    ] = None,
) -> dict:
    """Create a new issue (optionally as a sub-issue of `parent`).

    An `estimate` off the project's declared estimate_scale is stored as
    given and reported back in `warnings` (absent otherwise).
    """
    project_id, _team_id = await backend.resolve_project(project, team)
    resolved_type = _resolve_issue_type(issue_type)
    parent_id = None
    if parent:
        parent_id = (await backend.get_issue(parent))["id"]
    created = await backend.create_issue(
        project_id,
        title=title,
        description=description,
        status=status,
        priority=priority,
        issue_type=resolved_type,
        estimate=estimate,
        parent_id=parent_id,
    )
    return await _with_estimate_warning(backend, created, project_id, estimate)


async def _with_estimate_warning(backend: Backend, result: dict, project_id: str | None, estimate: int | None) -> dict:
    """Attach `warnings: [...]` when `estimate` is off the project's declared
    scale (CHT-1365). Warn, never block -- and never let the lookup that
    produces the warning fail a write that already succeeded."""
    if estimate is None or not project_id:
        return result
    try:
        scale = (await backend.get_project(project_id)).get("estimate_scale")
    except Exception:  # noqa: BLE001 -- advisory only
        return result
    warning = off_scale_warning(estimate, scale)
    if not warning:
        return result
    return {**result, "warnings": [*result.get("warnings", []), warning]}


async def issue_update(
    backend: Backend,
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

    An `estimate` off the project's declared estimate_scale is stored as
    given and reported back in `warnings` (absent otherwise).

    Only fields explicitly passed are changed. Returns the updated issue.
    Pass `attest` to satisfy pending close/claim rituals in the same call.
    """
    iss = await backend.get_issue(identifier)

    # Per-ritual attestations first (CHT-1326), so a gated status change
    # finds its rituals satisfied instead of opening a blocked intent
    # this non-interactive caller could never attest. Attesting the last
    # pending ritual may fire the one-step auto-transition server-side;
    # the update below is then a no-op for the status field.
    if attest:
        await _apply_ticket_attestations(backend, iss, identifier, attest)

    fields: dict = {}
    if title is not None:
        fields["title"] = title
    if description is not None:
        fields["description"] = description
    if status is not None:
        fields["status"] = status
    if priority is not None:
        fields["priority"] = priority
    if estimate is not None:
        fields["estimate"] = estimate
    if assignee is not None:
        if assignee.strip().lower() == "unassigned":
            fields["assignee_id"] = None
        else:
            team_id = await backend.team_for_project(iss.get("project_id"))
            fields["assignee_id"] = await backend.resolve_assignee(assignee, team_id)

    if not fields and not attest:
        raise ToolInputError("No fields provided to update.")

    if not fields:
        return await backend.get_issue(identifier)

    updated = await backend.update_issue(iss["id"], **fields)
    return await _with_estimate_warning(backend, updated, iss.get("project_id"), estimate)


async def issue_comment(
    backend: Backend,
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
    content: Annotated[str, Field(description="Comment body (markdown).")],
    assign_to: Annotated[
        str | None,
        Field(description="Also assign the issue: 'me', a user/agent id, or a name/email.")
    ] = None,
) -> dict:
    """Add a comment to an issue, optionally assigning it in the same call."""
    iss = await backend.get_issue(identifier)
    comment = await backend.create_comment(iss["id"], content)
    if assign_to:
        team_id = await backend.team_for_project(iss.get("project_id"))
        assignee_id = await backend.resolve_assignee(assign_to, team_id)
        await backend.update_issue(iss["id"], assignee_id=assignee_id)
    return comment


async def issue_start(
    backend: Backend,
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
    iss = await backend.get_issue(identifier)

    if attest:
        await _apply_ticket_attestations(backend, iss, identifier, attest)

    fields = {"assignee_id": await backend.me_id(), "status": "in_progress"}
    if lease_seconds is not None:
        fields["lease_seconds"] = int(lease_seconds)
    return await backend.update_issue(iss["id"], **fields)


async def issue_ready(
    backend: Backend,
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
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
    limit: Annotated[int, Field(description="Maximum number of issues to return.", ge=1, le=500)] = 20,
    detail: Annotated[bool, Field(description=DETAIL_ISSUE_DESC)] = False,
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

    Scope is never widened silently: with no `project` and no current
    project this refuses and says so, rather than answering with the
    whole team's work. Pass `all_projects=true` to ask for that.
    """
    if mine and include_assigned:
        raise ToolInputError("Pass either `mine` or `include_assigned`, not both.")

    if all_projects and not project:
        project_id = None
        team_id = await backend.resolve_team(team)
    else:
        # resolve_project, not optional_project (CHT-1355): a missing
        # current project must be an error the caller sees, not a query
        # that quietly becomes team-wide -- this is the tool an agent uses
        # to choose its own next work, so a wrong scope means work started
        # in a project it was never pointed at.
        project_id, team_id = await backend.resolve_project(project, team)

    issues = await backend.list_ready_issues(
        project_id=project_id,
        team_id=None if project_id else team_id,
        mine=mine,
        include_assigned=include_assigned,
        limit=limit + 1,
    )
    return listing("issues", issues, limit, COMPACT_ISSUE_FIELDS, detail)


async def issue_revisions(
    backend: Backend,
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
    limit: Annotated[int, Field(description="Maximum number of revisions to return.", ge=1, le=500)] = 20,
) -> dict:
    """List an issue's description revisions, newest first (CHT-1335).

    Every description edit snapshots the PREVIOUS text, so this is how you
    see what an issue used to say before overwriting it, and how to recover
    a description you clobbered. Rows are light (version, author,
    created_at); issue_revision fetches one snapshot's full text.
    """
    iss = await backend.get_issue(identifier)
    rows = await backend.list_issue_description_revisions(iss["id"], limit=limit + 1)
    return listing("revisions", rows, limit, (), True)


async def issue_revision(
    backend: Backend,
    identifier: Annotated[str, Field(description="Issue identifier, e.g. CHT-123.")],
    version: Annotated[int, Field(description="Revision version number, from issue_revisions.", ge=1)],
) -> dict:
    """Fetch one description-revision snapshot of an issue: the full text at that version."""
    iss = await backend.get_issue(identifier)
    return await backend.get_issue_description_revision(iss["id"], version)


async def issue_relations(
    backend: Backend,
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
    iss = await backend.get_issue(identifier)
    return {"relations": list(await backend.list_relations(iss["id"]) or [])}


async def issue_block(
    backend: Backend,
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
    iss = await backend.get_issue(identifier)
    other = await backend.get_issue(blocked)
    return await backend.create_relation(iss["id"], other["id"], relation_type)


async def issue_unblock(
    backend: Backend,
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
        raise ToolInputError("Pass either `related` (the other issue) or `relation_id`.")

    iss = await backend.get_issue(identifier)

    if not relation_id:
        other = await backend.get_issue(related)
        matches = [
            r for r in (await backend.list_relations(iss["id"]) or [])
            if r.get("related_issue_id") == other["id"]
        ]
        if not matches:
            raise ToolInputError(f"No relation between {identifier} and {related}.")
        if len(matches) > 1:
            listed = ", ".join(f"{r['relation_type']} (id={r['id']})" for r in matches)
            raise ToolInputError(
                f"{identifier} and {related} are connected by {len(matches)} relations: "
                f"{listed}. Pass `relation_id` to say which one to remove."
            )
        relation_id = matches[0]["id"]

    await backend.delete_relation(iss["id"], relation_id)
    return {
        "deleted": True,
        "id": relation_id,
        "issue_id": iss["id"],
        "identifier": identifier,
    }


async def label_list(
    backend: Backend,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """List the team's labels: id, name, and color.

    The lookup that makes issue_list's `label` filter usable -- without
    it a caller has to already know the taxonomy to filter by it, or
    guess. Also the source of the names issue_label accepts.
    """
    team_id = await backend.resolve_team(team)
    return {"labels": list(await backend.list_labels(team_id, 1000) or [])}


async def issue_label(
    backend: Backend,
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
        raise ToolInputError("Pass `add` and/or `remove` with at least one label.")

    iss = await backend.get_issue(identifier)
    team_id = await backend.team_for_project(iss.get("project_id"))

    existing = {l["id"] for l in (iss.get("labels") or []) if isinstance(l, dict)}

    added, removed = [], []
    for value in add or []:
        label_id = await _resolve_label_id(backend, team_id, value)
        if label_id not in existing:
            await backend.add_label(iss["id"], label_id)
            existing.add(label_id)
            added.append(value)
    for value in remove or []:
        label_id = await _resolve_label_id(backend, team_id, value)
        if label_id in existing:
            await backend.remove_label(iss["id"], label_id)
            existing.discard(label_id)
            removed.append(value)

    result = dict(await backend.get_issue(identifier))
    result["labels_added"] = added
    result["labels_removed"] = removed
    return result
