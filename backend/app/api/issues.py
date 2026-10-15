"""Issue API routes."""
import logging
from typing import Annotated

from fastapi import APIRouter, HTTPException, status, Query, Header
from app.auth.access import reads, writes
from app.api.idempotency import IdempotentRoute, idempotent
from app.api.deps import (
    CurrentUser, can_access_document, check_user_team_access,
    confined_project_id, is_eligible_project_member,
    is_project_scoped_agent,
)
from app.api.visibility import (
    can_see_label, can_see_project, not_found, visible_issue, visible_issue_by_identifier,
    visible_project, visible_project_in_team, visible_sprint,
)
from app.utils import ensure_utc

logger = logging.getLogger(__name__)
from app.schemas.issue import (
    IssueCreate,
    IssueUpdate,
    IssueResponse,
    IssueBatchUpdate,
    AddLabelRequest,
    IssueCommentCreate,
    IssueCommentUpdate,
    IssueCommentCreated,
    IssueCommentResponse,
    IssueActivityResponse,
    IssueActivityFeedResponse,
    IssueDescriptionRevisionListItem,
    IssueDescriptionRevisionResponse,
    TeamCommentResponse,
    IssueRelationCreate,
    IssueRelationResponse,
    LabelResponse,
)
from app.schemas.document import DocumentResponse
from app.schemas.issue_query import IssueQueryFieldsResponse, IssueQueryResponse
from app.services import issue_query
from app.services.document_service import DocumentService
from app.api.rituals import pending_ritual_responses
from app.services.issue_service import (
    IssueService,
    RelationCycleError,
    SprintInArrearsError,
    SprintInLimboError,
    TicketRitualsError,
    ClaimRitualsError,
    UnclaimedCloseRitualsError,
    IntentInFlightError,
    EstimateRequiredError,
    IssueAlreadyClaimedError,
    AssigneeChangedError,
)
from app.services.principals import fill_principals, load_principals
from app.services.project_service import ProjectService
from app.services.sprint_service import SprintService
from app.services.team_service import TeamService
from app.oxyde_models.user import OxydeUser
from app.oxyde_models.label import OxydeLabel
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.sprint import OxydeSprint
from app.enums import ApprovalMode, IssueStatus, IssuePriority, IssueType, ActivityType
from app.enums import DocumentActivityType


def _activity_type_value(raw, enum_cls):
    """Convert a raw activity_type (possibly .name) to the .value string."""
    if isinstance(raw, str):
        # Already a .value?
        if raw in {e.value for e in enum_cls}:
            return raw
        # Try as .name
        try:
            return enum_cls[raw].value
        except KeyError:
            logger.warning("Unknown %s activity_type: %r", enum_cls.__name__, raw)
    elif hasattr(raw, 'value'):
        return raw.value
    return raw
from app.services.issue_service import Issue
from app.websocket import broadcast_issue_event, broadcast_comment_event, broadcast_activity_event, broadcast_relation_event

# Idempotency-Key on the app's writes (CHT-1621): the @idempotent routes.
router = APIRouter(route_class=IdempotentRoute)


async def _validate_assignee(
    assignee_id: str | None, team_id: str, project_id: str, current_assignee_id: str | None = None,
) -> None:
    """The assignee must be eligible for work in the project
    (``team_id``, ``project_id``; the same arguments as
    ``projects._validate_lead``): an active
    member of its team, or an active agent of that team or of this
    project (``is_eligible_project_member``, CHT-1830; the same rule as a
    project's lead). CHT-293 checked the team, CHT-1494 refused retired
    accounts, CHT-1780 kept a project-scoped agent in its own project.

    Every refusal is the same "Assignee not found", naming nobody: a
    name, or a "deactivated" reply, would confirm that an account exists
    (CHT-1785, CHT-1819). An empty string names no one and is "not
    found" too (it used to reach the users foreign key and fail with a
    500). Re-sending an issue's existing assignee
    (``current_assignee_id``) is not a new assignment, so an update that
    touches other fields of an issue held by someone since retired or
    moved still goes through. Both this check and that exemption judge
    the assignee read at the start of the request, so the service's
    assignee write is conditional on that value (CHT-1832): if another
    request has changed it since, the update is refused with a 409
    ``assignee_changed`` rather than writing the stale value back.
    """
    if assignee_id is None or (current_assignee_id is not None and assignee_id == current_assignee_id):
        return
    user = await OxydeUser.objects.get_or_none(id=assignee_id)
    if not await is_eligible_project_member(user, team_id, project_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Assignee not found",
        )


async def _validate_sprint(current_user, sprint_id: str | None, project_id: str) -> None:
    """Validate that sprint exists and belongs to the project (CHT-294).
    A sprint in a project the caller cannot see is "not found" (CHT-1785)."""
    if not sprint_id:
        return
    sprint = await SprintService().get_by_id(sprint_id)
    sprint_project = await ProjectService().get_by_id(sprint.project_id) if sprint else None
    if not await can_see_project(current_user, sprint_project):
        raise not_found("Sprint not found", status.HTTP_400_BAD_REQUEST)
    if sprint.project_id != project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Sprint does not belong to this project",
        )


async def _validate_labels(current_user, label_ids: list[str], team_id: str) -> None:
    """Validate that all labels exist and belong to the team (CHT-296).
    A label of a team the caller is not in counts as missing (CHT-1785)."""
    if not label_ids:
        return
    # One membership check per team, not per label.
    seen_by_team: dict[str, bool] = {}
    labels = []
    for label in await OxydeLabel.objects.filter(id__in=label_ids).all():
        if label.team_id not in seen_by_team:
            seen_by_team[label.team_id] = await can_see_label(current_user, label)
        if seen_by_team[label.team_id]:
            labels.append(label)
    if len(labels) != len(label_ids):
        found = {l.id for l in labels}
        missing = set(label_ids) - found
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Labels not found: {missing}",
        )
    for label in labels:
        if label.team_id != team_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Label does not belong to this team",
            )


async def _validate_parent(
    current_user, parent_id: str | None, project_id: str, issue_id: str | None = None,
) -> None:
    """Validate that parent issue exists and belongs to the project (CHT-295).
    A parent in a project the caller cannot see is "not found" (CHT-1785)."""
    if not parent_id:
        return
    if issue_id and parent_id == issue_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An issue cannot be its own parent",
        )
    issue_service = IssueService()
    parent = await issue_service.get_by_id(parent_id)
    parent_project = await ProjectService().get_by_id(parent.project_id) if parent else None
    if not await can_see_project(current_user, parent_project):
        raise not_found("Parent issue not found", status.HTTP_400_BAD_REQUEST)
    if parent.project_id != project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Parent issue does not belong to this project",
        )
    # CHT-297: reject cycles. The direct self-parent case is caught above;
    # here we walk the proposed parent's ancestor chain, and if this issue
    # appears in it, linking would close a loop (A→B→A). Bounded so a
    # pre-existing corrupt chain can't loop forever.
    if issue_id:
        ancestor_id = parent.parent_id
        depth = 0
        while ancestor_id is not None:
            if ancestor_id == issue_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Cannot set parent: would create a cycle in the issue hierarchy",
                )
            if depth >= 1000:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Parent chain too deep (possible pre-existing cycle)",
                )
            ancestor = await issue_service.get_by_id(ancestor_id)
            ancestor_id = ancestor.parent_id if ancestor else None
            depth += 1


def issue_to_response(issue: Issue) -> IssueResponse:
    """Convert Issue model to IssueResponse with creator_name."""
    return IssueResponse(
        id=issue.id,
        project_id=issue.project_id,
        identifier=issue.identifier,
        number=issue.number,
        title=issue.title,
        description=issue.description,
        status=issue.status,
        priority=issue.priority,
        issue_type=issue.issue_type,
        estimate=issue.estimate,
        assignee_id=issue.assignee_id,
        creator_id=issue.creator_id,
        creator_name=issue.creator.name if issue.creator else None,
        sprint_id=issue.sprint_id,
        parent_id=issue.parent_id,
        due_date=ensure_utc(issue.due_date),
        completed_at=ensure_utc(issue.completed_at),
        lease_expires_at=ensure_utc(issue.lease_expires_at),
        created_at=ensure_utc(issue.created_at),
        updated_at=ensure_utc(issue.updated_at),
        labels=[LabelResponse.model_validate(label) for label in issue.labels] if issue.labels else [],
    )


async def issues_to_responses(issues) -> list[IssueResponse]:
    """Build IssueResponses with the UUID foreign keys resolved to names
    (CHT-1371): assignee_name, sprint_name, parent_identifier, project_key.

    Four batched lookups for the whole list, however long it is, so
    list_issues at limit=500 costs the same as one issue. Every tool
    input on the MCP surface addresses assignees, sprints, parents and
    projects by name/identifier, so this is what makes a row's output
    usable as the next call's input.
    """
    issues = list(issues or [])
    if not issues:
        return []

    async def _lookup(model, ids, attr):
        ids = [i for i in ids if i]
        if not ids:
            return {}
        # Two columns, not whole rows: the parent lookup would otherwise
        # load every parent's description to read one identifier.
        rows = await model.objects.filter(id__in=list(set(ids))).values("id", attr).all()
        return {
            (row["id"] if isinstance(row, dict) else row.id):
            (row[attr] if isinstance(row, dict) else getattr(row, attr))
            for row in rows
        }

    # Creators and assignees as principal summaries (CHT-1500): two
    # queries for both roles, and the assignee name is read off them.
    principals = await load_principals(
        {i.assignee_id for i in issues} | {i.creator_id for i in issues}
    )
    sprints = await _lookup(OxydeSprint, {i.sprint_id for i in issues}, "name")
    parents = await _lookup(Issue, {i.parent_id for i in issues}, "identifier")
    projects = await _lookup(OxydeProject, {i.project_id for i in issues}, "key")

    return [
        issue_to_response(issue).model_copy(update={
            "assignee_name": _principal_name(principals, issue.assignee_id),
            "creator": principals.get(issue.creator_id) if issue.creator_id else None,
            "assignee": principals.get(issue.assignee_id) if issue.assignee_id else None,
            "sprint_name": sprints.get(issue.sprint_id),
            "parent_identifier": parents.get(issue.parent_id),
            "project_key": projects.get(issue.project_id),
        })
        for issue in issues
    ]


def _principal_name(principals, user_id):
    principal = principals.get(user_id) if user_id else None
    return principal.name if principal else None


async def issue_response(issue: Issue) -> IssueResponse:
    """One issue, with companions resolved -- see issues_to_responses."""
    return (await issues_to_responses([issue]))[0]


def _arrears_detail(e: SprintInArrearsError) -> dict:
    """The 409 body for a refusal caused by sprint arrears.

    Names the project and sprint that are over budget (CHT-1270): the
    refused ticket's project is not necessarily the caller's current one,
    and closing the wrong project's sprint releases nothing here.
    """
    where = f" in project {e.project_key}" if e.project_key else ""
    return {
        "error_code": "sprint_in_arrears",
        "message": (
            f"Sprint is in arrears{where}. Close that project's active sprint to "
            "continue; a spent budget ends a sprint, not a date."
        ),
        "budget": e.budget,
        "points_spent": e.points_spent,
        "arrears_by": e.arrears_by,
        "sprint_id": e.sprint_id,
        "sprint_name": e.sprint_name,
        "project_id": e.project_id,
        "project_key": e.project_key,
        "team_id": e.team_id,
    }


def _limbo_detail(e: SprintInLimboError) -> dict:
    """The 409 body for a refusal caused by a sprint in limbo; names the
    project for the same reason as _arrears_detail (CHT-1270)."""
    where = f" in project {e.project_key}" if e.project_key else ""
    return {
        "error_code": "sprint_in_limbo",
        "message": f"Sprint is in limbo{where}. Complete pending rituals to continue.",
        "sprint_id": e.sprint_id,
        "pending_rituals": e.pending_rituals,
        "project_id": e.project_id,
        "project_key": e.project_key,
        "team_id": e.team_id,
    }


async def _ritual_refusal_detail(
    e, error_code: str, lead: str, verb: str, on_create: str | None = None,
) -> dict:
    """The 409 detail for a claim/close refused by pending ticket rituals
    (CHT-1360). Rows are the same PendingRitualResponse shape ritual_pending
    returns -- approval_mode and attestation included -- and three name
    lists plus the message separate what the caller can still do from what
    only a human can:

      * ``unattested``: AUTO/REVIEW rituals with no attestation -> attest.
      * ``awaiting_approval``: attested, REVIEW -> a human approves.
      * ``gate``: GATE rituals -> a human completes (attesting is refused).

        "Ticket has pending claim rituals: 1 unattested (work-on-branch);
         1 attested, awaiting human approval (design-review). Attest the
         unattested ones before claiming."

    Cost: one attestation lookup per ritual (plus two batched principal
    queries for all of them, CHT-1500) on top of the gating queries the
    service already ran;
    fine at today's ritual counts, revisit if projects grow dozens.

    ``on_create`` names the status a create asked for: there is no issue
    yet to attest against, so the action becomes "create it first"
    (CHT-1672).
    """
    rows = await pending_ritual_responses(e.issue_pk, e.rituals) if e.rituals else []
    if rows:
        gate = [r.name for r in rows if r.approval_mode == ApprovalMode.GATE and r.attestation is None]
        awaiting = [r.name for r in rows if r.attestation is not None]
        unattested = [r.name for r in rows if r.attestation is None and r.approval_mode != ApprovalMode.GATE]
        pending = [r.model_dump(mode="json") for r in rows]
    else:  # a raiser without rows: keep the minimal name/prompt list
        unattested = [r.get("name", "unknown") for r in e.pending_rituals]
        awaiting, gate = [], []
        pending = e.pending_rituals
    parts = []
    if unattested:
        parts.append(f"{len(unattested)} unattested ({', '.join(unattested)})")
    if awaiting:
        parts.append(f"{len(awaiting)} attested, awaiting human approval ({', '.join(awaiting)})")
    if gate:
        parts.append(f"{len(gate)} gate ritual{'s' if len(gate) != 1 else ''} only a human can complete ({', '.join(gate)})")
    # CHT-1606: a human's rejection is what the caller must fix, so the
    # refusal names it -- the outstanding ones, and the ones this attempt
    # answered by asking again (already marked superseded, but the reason
    # still has to reach whoever is retrying; PR #353 review finding 1).
    answered = getattr(e, "answered_rejection_ids", set())
    rejections = []
    for r in rows:
        rej = r.last_rejection
        if rej is None or (rej.superseded_at is not None and rej.id not in answered):
            continue
        rejections.append({
            "ritual_id": r.id,
            "ritual": r.name,
            "rejection_id": rej.id,
            "rejected_by": rej.rejected_by,
            "rejected_by_name": rej.rejected_by_name,
            "rejected_at": rej.rejected_at.isoformat() if rej.rejected_at else None,
            "note": rej.note,
            "asked_again": rej.superseded_at is not None,
        })
    if rejections:
        parts.extend(
            f"{x['ritual']} was rejected by {x['rejected_by_name'] or 'a human'}: {x['note']}"
            + (" (asked again; the approvers were notified)" if x["asked_again"] else "")
            for x in rejections
        )
    if on_create:
        action = (
            f"The issue does not exist yet, so nothing can be attested: create it without "
            f"status {on_create}, satisfy its rituals (ritual_pending lists the ones that apply "
            f"to it and what each needs), then move it to {on_create}."
        )
    elif unattested:
        action = f"Attest the unattested ones before {verb}."
    else:
        human = []
        if awaiting:
            human.append("approve the attested ones")
        if gate:
            human.append(f"complete the gate ritual{'s' if len(gate) != 1 else ''}")
        action = f"Nothing more to attest; a human must {' and '.join(human) or 'act'} before {verb}."
    return {
        "error_code": error_code,
        "message": f"{lead}: {'; '.join(parts)}. {action}",
        "issue_id": e.issue_id,
        "pending_rituals": pending,
        "unattested": unattested,
        "awaiting_approval": awaiting,
        "gate": gate,
        "rejections": rejections,
    }


@writes
async def create_issue(
    project_id: str,
    issue_in: IssueCreate,
    current_user: CurrentUser,
    x_chaotic_interactive: Annotated[str | None, Header()] = None,
) -> IssueResponse:
    """Create a new issue.

    Not directly routed here (CHT-1223): canonical route is the
    path-nested ``POST /projects/{project_id}/issues`` in nested.py.
    ``GET /issues`` (list_issues, below) keeps project_id/team_id/
    sprint_id/assignee_id as alternative query-based scope filters --
    no path-nested list alias, see nested.py's module docstring.
    """
    issue_service = IssueService()

    # Team membership for humans, agent scope for agents; a project the
    # caller cannot see answers like a missing one (CHT-1785).
    project = await visible_project(current_user, project_id)

    # Validate assignee, sprint, labels, and parent (CHT-293, CHT-294, CHT-296, CHT-295)
    await _validate_assignee(issue_in.assignee_id, project.team_id, project.id)
    await _validate_sprint(current_user, issue_in.sprint_id, project_id)
    await _validate_labels(current_user, issue_in.label_ids, project.team_id)
    await _validate_parent(current_user, issue_in.parent_id, project_id)

    # Ritual/estimate exemption requires BOTH a human account AND an
    # interactive (TTY) caller (CHT-1302, hybrid gate). The interactive
    # signal is client-asserted via X-Chaotic-Interactive: best-effort
    # defense against an agent accidentally authed as a human, not a
    # guard against a malicious client forging the header.
    # Who sends "1": the CLI when both stdin+stdout are a TTY, and the web
    # app unconditionally (a browser is a live human). Callers that omit the
    # header — the MCP tools (remote /mcp and the stdio adapter, whose stdio
    # is piped) and any raw API script — are treated as non-interactive and
    # thus gated. That is intentional: MCP/programmatic traffic is agentic
    # regardless of whose credentials back it.
    interactive = x_chaotic_interactive == "1"
    is_human_request = not current_user.is_agent and interactive

    # Ritual and constraint checks are now enforced in create() when status
    # is DONE or IN_PROGRESS (CHT-536)
    try:
        issue = await issue_service.create(issue_in, project, current_user.id, is_human_request)
    except EstimateRequiredError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except SprintInLimboError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=_limbo_detail(e),
        )
    except SprintInArrearsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=_arrears_detail(e),
        )
    except TicketRitualsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=await _ritual_refusal_detail(
                e, "ticket_rituals_pending", "Cannot create issue as done - ticket has pending rituals", "closing",
                on_create="done",
            ),
        )
    except ClaimRitualsError as e:
        asked = "done" if isinstance(e, UnclaimedCloseRitualsError) else "in_progress"
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=await _ritual_refusal_detail(
                e, "claim_rituals_pending",
                f"Cannot create issue as {asked} - ticket has pending claim rituals",
                e.verb, on_create=asked,
            ),
        )
    except IntentInFlightError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "error_code": "intent_in_flight",
                "message": str(e),
                "issue_id": e.issue_id,
                "intent_type": e.intent_type,
                "initiator_user_id": e.initiator_user_id,
            },
        )

    response = await issue_response(issue)

    # Auto-link cross-referenced issues (CHT-133)
    try:
        await issue_service.create_cross_references(
            issue.id, issue_in.description, project_id=confined_project_id(current_user),
        )
    except Exception:
        logger.warning("Failed to create cross-references for issue %s", issue.id, exc_info=True)

    # Broadcast real-time updates
    await broadcast_issue_event(project.team_id, "created", response.model_dump(mode="json"))
    await broadcast_activity_event(project.team_id, "created", {"issue_id": issue.id})

    return response


@reads
async def list_ready_issues(
    current_user: CurrentUser,
    project_id: str | None = None,
    team_id: str | None = None,
    mine: bool = False,
    include_assigned: bool = False,
    limit: int = 50,
) -> list[IssueResponse]:
    """What can I start right now (CHT-1245) -- the agent's first
    shell-out. Not directly routed here: canonical routes are the
    path-nested ``GET /projects/{project_id}/issues/ready`` and
    ``GET /teams/{team_id}/issues/ready`` in nested.py (CHT-1223's
    convention for new endpoints -- see nested.py's module docstring).

    ``mine``/``include_assigned`` resolve to the service's
    ``assignee_id`` filter convention (None = unassigned only, a user id
    = that principal only, "any" = no filter).
    """
    if mine and include_assigned:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot use both mine and include_assigned",
        )

    issue_service = IssueService()

    if project_id:
        await visible_project(current_user, project_id)
    elif team_id:
        if not await check_user_team_access(current_user, team_id):
            raise HTTPException(status_code=403, detail="Not authorized to access this team")
    else:
        raise HTTPException(status_code=400, detail="Must provide project_id or team_id")

    if mine:
        assignee_filter = current_user.id
    elif include_assigned:
        assignee_filter = "any"
    else:
        assignee_filter = None

    issues = await issue_service.list_ready_issues(
        project_id=project_id, team_id=team_id,
        assignee_id=assignee_filter, limit=limit,
    )
    return await issues_to_responses(issues)


async def _check_list_scope(
    current_user, *, project_id: str | None = None, team_id: str | None = None,
) -> str:
    """The issue list's access rule for a project or a team scope; returns
    the scope's team id. ``list_issues`` and ``query_issues`` (CHT-1718)
    both go through here, so a query sees exactly what a list would."""
    if project_id:
        return (await visible_project(current_user, project_id)).team_id
    if team_id:
        if not await check_user_team_access(current_user, team_id):
            raise HTTPException(status_code=403, detail="Not authorized to access this team")
        return team_id
    raise HTTPException(status_code=400, detail="Must provide project_id or team_id")


@reads
async def query_issues(
    current_user: CurrentUser,
    project_id: str | None = None,
    team_id: str | None = None,
    where: str | None = None,
    filter_json: str | None = None,
    order: str | None = None,
    skip: int = 0,
    limit: int = 100,
) -> IssueQueryResponse:
    """Run an issue query (CHT-1718). Not routed here: the routes are
    ``GET /projects/{project_id}/issues/query`` and
    ``GET /teams/{team_id}/issues/query`` in nested.py.

    ``where`` is the text form and ``filter_json`` the structure as JSON
    (``app.schemas.issue_query``); when both are given they are ANDed.
    ``order`` is ``field,-field`` (``-`` for descending). Scope and access
    are the issue list's (``_check_list_scope``). A query that does not
    parse, fails validation, or names a user/label/sprint/project/issue
    that is not there is a 400 whose detail says which.
    """
    if skip < 0 or not 1 <= limit <= 1000:
        raise HTTPException(status_code=400, detail="skip must be >= 0 and limit 1..1000")
    scope_team_id = await _check_list_scope(current_user, project_id=project_id, team_id=team_id)

    try:
        query = issue_query.build_query(where=where, filter_json=filter_json, order=order)
    except issue_query.QueryError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from None

    issue_service = IssueService()
    # Lazy auto-release of expired claim leases (CHT-1246), as list_issues does.
    if project_id:
        await issue_service.release_expired_leases(project_id=project_id)
        project_ids = [project_id]
    else:
        await issue_service.release_expired_leases(team_id=scope_team_id)
        project_ids = [p.id for p in await OxydeProject.objects.filter(team_id=scope_team_id).all()]

    scope = issue_query.QueryScope(user=current_user, team_id=scope_team_id, project_ids=project_ids)
    try:
        issues, total = await issue_query.run_query(query, scope, skip=skip, limit=limit)
    except issue_query.QueryError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from None

    return IssueQueryResponse(
        query=query,
        where=issue_query.render_where(query.filter),
        order=issue_query.render_order(query.order_by),
        total=total,
        skip=skip,
        limit=limit,
        issues=await issues_to_responses(issues),
    )


@router.get("", response_model=list[IssueResponse])
@reads
async def list_issues(
    current_user: CurrentUser,
    project_id: str | None = None,
    sprint_id: str | None = None,
    assignee_id: str | None = None,
    team_id: str | None = None,
    parent_id: str | None = None,
    # Query metadata lives in Annotated so the Python default is a real
    # value: this function is also called in-process (the MCP tools,
    # ADR-0005) where a bare Query(None) default would be a live,
    # truthy Query object instead of None (CHT-1375).
    statuses: Annotated[list[IssueStatus] | None, Query(alias="status")] = None,
    priorities: Annotated[list[IssuePriority] | None, Query(alias="priority")] = None,
    issue_type: Annotated[IssueType | None, Query(alias="issue_type")] = None,
    labels: Annotated[list[str] | None, Query(alias="label")] = None,
    label_match: Annotated[str, Query(pattern="^(all|any)$")] = "all",
    exclude_labels: Annotated[list[str] | None, Query(alias="exclude_label")] = None,
    exclude_statuses: Annotated[list[IssueStatus] | None, Query(alias="exclude_status")] = None,
    exclude_priorities: Annotated[list[IssuePriority] | None, Query(alias="exclude_priority")] = None,
    exclude_issue_types: Annotated[list[IssueType] | None, Query(alias="exclude_issue_type")] = None,
    exclude_assignee_ids: Annotated[list[str] | None, Query(alias="exclude_assignee_id")] = None,
    search: Annotated[str | None, Query(min_length=1, max_length=200)] = None,
    sort_by: Annotated[str | None, Query(pattern="^(created|updated|priority|status|title|estimate|random)$")] = None,
    order: Annotated[str | None, Query(pattern="^(asc|desc)$")] = None,
    skip: int = 0,
    limit: int = 1000,
) -> list[IssueResponse]:
    """List issues with filters. Pass multiple status/priority/label values to filter by multiple values.

    ``label_match`` controls multi-``label`` semantics: ``all`` (default —
    issue must carry every named label; the CLI's documented contract) or
    ``any`` (issue must carry at least one; used by the web UI's
    multi-select filter).

    Exclude filters (``exclude_label``, ``exclude_status``, ``exclude_priority``,
    ``exclude_issue_type``, ``exclude_assignee_id``) remove matching issues
    from the result. For labels, an issue is excluded if it carries any of
    the named labels. Use ``exclude_assignee_id=unassigned`` to hide
    issues with no assignee.

    All filter parameters work consistently whether querying by project_id or team_id.
    """
    issue_service = IssueService()
    team_service = TeamService()

    # Validate access and determine scope
    if project_id:
        await _check_list_scope(current_user, project_id=project_id)

        # Lazy auto-release of expired claim leases (CHT-1246) before
        # listing, so a just-expired lease's issue shows up correctly
        # released rather than still IN_PROGRESS in this same response.
        await issue_service.release_expired_leases(project_id=project_id)

        # Use unified list_issues with project scope
        issues = await issue_service.list_issues(
            project_id=project_id,
            skip=skip,
            limit=limit,
            statuses=statuses,
            priorities=priorities,
            issue_type=issue_type,
            sprint_id=sprint_id,
            parent_id=parent_id,
            assignee_id=assignee_id,
            search=search,
            sort_by=sort_by,
            order=order,
            label_names=labels,
            label_match=label_match,
            exclude_label_names=exclude_labels,
            exclude_statuses=exclude_statuses,
            exclude_priorities=exclude_priorities,
            exclude_assignee_ids=exclude_assignee_ids,
            exclude_issue_types=exclude_issue_types,
        )
    elif team_id:
        await _check_list_scope(current_user, team_id=team_id)

        # Lazy auto-release of expired claim leases (CHT-1246), team-wide.
        await issue_service.release_expired_leases(team_id=team_id)

        # Use unified list_issues with team scope
        issues = await issue_service.list_issues(
            team_id=team_id,
            skip=skip,
            limit=limit,
            statuses=statuses,
            priorities=priorities,
            issue_type=issue_type,
            sprint_id=sprint_id,
            parent_id=parent_id,
            assignee_id=assignee_id,
            search=search,
            sort_by=sort_by,
            order=order,
            label_names=labels,
            label_match=label_match,
            exclude_label_names=exclude_labels,
            exclude_statuses=exclude_statuses,
            exclude_priorities=exclude_priorities,
            exclude_assignee_ids=exclude_assignee_ids,
            exclude_issue_types=exclude_issue_types,
        )
    elif sprint_id:
        # Sprint-only query: check access via sprint -> project -> team
        sprint, _project = await visible_sprint(current_user, sprint_id)
        # Lazy lease sweep (CHT-1246, PR #217 review finding 3): the web
        # UI's sprint board queries by sprint_id alone, so without this a
        # stale claim could sit on the board indefinitely.
        await issue_service.release_expired_leases(project_id=sprint.project_id)
        issues = await issue_service.list_by_sprint(
            sprint_id, skip, limit, issue_type=issue_type, sort_by=sort_by, order=order
        )
    elif assignee_id:
        # Assignee-only query: scope to user's accessible teams, and a
        # project-scoped agent to its own project (CHT-1780).
        confine_to = current_user.agent_project_id if is_project_scoped_agent(current_user) else None
        if current_user.is_agent:
            # Every agent carries its team, a project-scoped one its
            # project's (CHT-1837).
            team_ids = [current_user.agent_team_id] if current_user.agent_team_id else []
        else:
            user_teams = await team_service.get_user_teams(current_user.id)
            team_ids = [t.id for t in user_teams]
        if not team_ids:
            issues = []
        else:
            # Lazy lease sweep (CHT-1246, PR #217 review finding 3):
            # `issue mine` queries by assignee alone -- an agent checking
            # its own claims must not see a phantom still-mine issue
            # whose lease already lapsed server-side.
            if confine_to:
                await issue_service.release_expired_leases(project_id=confine_to)
            else:
                for tid in team_ids:
                    await issue_service.release_expired_leases(team_id=tid)
            issues = await issue_service.list_by_assignee(
                assignee_id, skip, limit,
                statuses=statuses, priorities=priorities, issue_type=issue_type, team_ids=team_ids,
                sort_by=sort_by, order=order, project_id=confine_to,
            )
    else:
        raise HTTPException(
            status_code=400,
            detail="Must provide project_id, team_id, sprint_id, or assignee_id",
        )

    return await issues_to_responses(issues)


@router.get("/query/fields", response_model=IssueQueryFieldsResponse)
@reads
async def get_issue_query_fields(current_user: CurrentUser) -> IssueQueryFieldsResponse:
    """The issue query's vocabulary (CHT-1783): each field with its value
    kind and operators, each operator's arity and text form, the enum
    values, the order fields and the caps. It is what a query builder
    needs to build its row editors, served from the allow-list the query
    endpoints validate against. It is the same for every caller and
    holds no data, so any signed-in caller may read it."""
    return issue_query.vocabulary()


def _team_refused() -> HTTPException:
    """The 403 of the team feeds below, for a team, or a project filter,
    the caller may not read. A project filter that is missing answers the
    same (CHT-1785)."""
    return HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Not authorized to access this team",
    )


@router.get("/search", response_model=list[IssueResponse])
@reads
async def search_issues(
    team_id: str,
    q: Annotated[str, Query(min_length=1, max_length=200)],
    current_user: CurrentUser,
    project_id: str | None = None,
    issue_status: IssueStatus | None = None,
    skip: int = 0,
    limit: int = 50,
):
    """Search issues by title, description, or identifier.

    If project_id is provided, only search within that project.
    Otherwise, search across all projects in the team.
    """
    issue_service = IssueService()

    # With project_id this is a project search, which project access
    # covers (a project-scoped agent's own, CHT-1780), pinned to the URL's
    # team (CHT-1807); without one it is team-wide.
    if project_id:
        await visible_project_in_team(
            current_user, project_id, team_id,
            hidden=_team_refused(),
            elsewhere=not_found("Project not found in this team"),
        )
    elif not await check_user_team_access(current_user, team_id):
        raise _team_refused()

    issues = await issue_service.search(team_id, q, skip, limit, project_id=project_id, status=issue_status.name if issue_status else None)
    return await issues_to_responses(issues)


@router.post("/batch-update", response_model=list[IssueResponse])
@writes
async def batch_update_issues(
    batch_in: IssueBatchUpdate,
    current_user: CurrentUser,
):
    """Batch update multiple issues with safe fields (priority, estimate, labels).

    Does NOT support status, assignee, or sprint changes, which require
    per-issue validation. Use the single-issue PATCH endpoint for those.
    """
    issue_service = IssueService()

    # Deduplicate issue IDs
    unique_ids = list(dict.fromkeys(batch_in.issue_ids))

    # Bulk fetch all issues, and the projects they are in
    issue_list = await Issue.objects.filter(id__in=unique_ids).join("creator").all()
    project_ids = list({iss.project_id for iss in issue_list})
    project_list = await OxydeProject.objects.filter(id__in=project_ids).all()
    # Access per distinct project (not per issue). An issue the caller
    # cannot see is reported as missing, with the missing ones, so the
    # answer does not say which ids exist elsewhere (CHT-1785).
    projects = {p.id: p for p in project_list if await can_see_project(current_user, p)}
    issues = {iss.id: iss for iss in issue_list if iss.project_id in projects}

    if len(issues) != len(unique_ids):
        missing = set(unique_ids) - set(issues.keys())
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Issues not found: {missing}",
        )

    # All issues must belong to the same team for label validation
    team_ids = {p.team_id for p in projects.values()}
    if len(team_ids) != 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="All issues in a batch must belong to the same team",
        )
    team_id = team_ids.pop()

    # Label ids the caller cannot see answer like missing ones (CHT-1785),
    # before the service gets a chance to say anything about them.
    for ids in (batch_in.label_ids, batch_in.add_label_ids):
        if ids:
            await _validate_labels(current_user, list(dict.fromkeys(ids)), team_id)

    # Build update dict from safe fields only
    update_data = {}
    for field in ("priority", "estimate"):
        value = getattr(batch_in, field)
        if value is not None:
            update_data[field] = value

    try:
        updated = await issue_service.batch_update(
            list(issues.values()), update_data,
            label_ids=batch_in.label_ids,
            add_label_ids=batch_in.add_label_ids,
            team_id=team_id,
            user_id=current_user.id,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    responses = await issues_to_responses(updated)
    for resp in responses:
        await broadcast_issue_event(team_id, "updated", resp.model_dump(mode="json"))
        await broadcast_activity_event(team_id, "created", {"issue_id": resp.id})
    return responses


# Activities
@router.get("/activities", response_model=list[IssueActivityFeedResponse])
@reads
async def list_team_activities(
    team_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 50,
    project_id: str | None = None,
) -> list[IssueActivityFeedResponse]:
    """List recent activities for a team (issues and documents), optionally filtered by project."""
    issue_service = IssueService()
    sprint_service = SprintService()
    document_service = DocumentService()

    # As in search_issues: project access for one project's feed (what a
    # project-scoped agent's `chaotic await` polls), team access for the
    # team's (CHT-1780).
    if project_id:
        await visible_project_in_team(
            current_user, project_id, team_id,
            hidden=_team_refused(), elsewhere=not_found("Project not found"),
        )
    elif not await check_user_team_access(current_user, team_id):
        raise _team_refused()

    # Bounded lazy lease sweep (CHT-1246, PR #217 review finding 2).
    # This is the read every waiter funnels through: `chaotic await`
    # polls this feed, and the web UI's dashboard fetches it -- so
    # running the sweep here is what lets an expired lease's
    # LEASE_EXPIRED activity appear *because* something is waiting for
    # it, with no third-party issue reads required. Cheap: the scan is
    # backed by migration 0011's partial index and capped by scan_limit.
    await issue_service.release_expired_leases(team_id=team_id)

    # Fetch both issue and document activities (CHT-639)
    # Get more than needed so we can merge and sort, then limit
    issue_activities = await issue_service.list_team_activities(team_id, 0, limit * 2, project_id=project_id)
    doc_activities = await document_service.list_team_activities(team_id, 0, limit * 2, project_id=project_id)

    # Batch lookup sprint names for sprint-related activities
    sprint_ids = set()
    moved_to_sprint_val = ActivityType.MOVED_TO_SPRINT.value
    removed_from_sprint_val = ActivityType.REMOVED_FROM_SPRINT.value
    for a in issue_activities:
        act_type = _activity_type_value(a.activity_type, ActivityType)
        if act_type == moved_to_sprint_val and a.new_value:
            sprint_ids.add(a.new_value)
        elif act_type == removed_from_sprint_val and a.old_value:
            sprint_ids.add(a.old_value)
    sprint_names = {}
    for sprint_id in sprint_ids:
        sprint = await sprint_service.get_by_id(sprint_id)
        if sprint:
            sprint_names[sprint_id] = sprint.name

    def get_sprint_name(activity):
        """Get sprint name for sprint-related activities."""
        act_type = _activity_type_value(activity.activity_type, ActivityType)
        if act_type == moved_to_sprint_val:
            return sprint_names.get(activity.new_value)
        elif act_type == removed_from_sprint_val:
            return sprint_names.get(activity.old_value)
        return None

    # Convert to response format
    issue_responses = [
        IssueActivityFeedResponse(
            id=a.id,
            issue_id=a.issue_id,
            issue_identifier=a.issue.identifier if a.issue else None,
            issue_title=a.issue.title if a.issue else None,
            user_id=a.user_id,
            user_name=a.user.name if a.user else None,
            user_email=a.user.email if a.user else None,
            activity_type=_activity_type_value(a.activity_type, ActivityType),
            field_name=a.field_name,
            old_value=a.old_value,
            new_value=a.new_value,
            sprint_name=get_sprint_name(a),
            created_at=ensure_utc(a.created_at),
        )
        for a in issue_activities
    ]

    doc_responses = [
        IssueActivityFeedResponse(
            id=a.id,
            document_id=a.document_id,
            document_title=a.document_title or (a.document and a.document.title),
            document_icon=a.document_icon or (a.document and a.document.icon),
            user_id=a.user_id,
            user_name=a.user and a.user.name,
            user_email=a.user and a.user.email,
            activity_type=_activity_type_value(a.activity_type, DocumentActivityType),
            created_at=ensure_utc(a.created_at),
        )
        for a in doc_activities
    ]

    # Merge and sort by created_at descending
    all_activities = issue_responses + doc_responses
    all_activities.sort(key=lambda x: x.created_at, reverse=True)

    # Apply pagination
    return await fill_principals(all_activities[skip:skip + limit])


@router.get("/comments", response_model=list[TeamCommentResponse])
@reads
async def list_team_comments(
    team_id: str,
    current_user: CurrentUser,
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(ge=1, le=200)] = 50,
):
    """List recent comments for a team (both issue and document comments)."""
    issue_service = IssueService()
    document_service = DocumentService()

    has_access = await check_user_team_access(current_user, team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this team",
        )

    # Fetch skip + limit from each source to handle worst case where
    # all top results come from one source
    fetch_count = skip + limit
    issue_comments = await issue_service.list_team_comments(team_id, 0, fetch_count)
    doc_comments = await document_service.list_team_comments(team_id, 0, fetch_count)

    # Convert to unified response format
    issue_responses = [
        TeamCommentResponse(
            id=c.id,
            source_type="issue",
            issue_id=c.issue_id,
            issue_identifier=issue.identifier if issue else None,
            issue_title=issue.title if issue else None,
            author_id=c.author_id,
            author_name=c.author.name if c.author else None,
            content=c.content,
            created_at=ensure_utc(c.created_at),
            updated_at=ensure_utc(c.updated_at),
        )
        for c, issue in issue_comments
    ]

    doc_responses = [
        TeamCommentResponse(
            id=c.id,
            source_type="document",
            document_id=c.document_id,
            document_title=doc.title if doc else None,
            document_icon=doc.icon if doc else None,
            author_id=c.author_id,
            author_name=c.author.name if c.author else None,
            content=c.content,
            created_at=ensure_utc(c.created_at),
            updated_at=ensure_utc(c.updated_at),
        )
        for c, doc in doc_comments
    ]

    # Merge and sort by created_at descending
    all_comments = issue_responses + doc_responses
    all_comments.sort(key=lambda x: x.created_at, reverse=True)

    # Apply pagination
    return await fill_principals(all_comments[skip:skip + limit])


@router.get("/identifier/{identifier}", response_model=IssueResponse)
@reads
async def get_issue_by_identifier(
    identifier: str, current_user: CurrentUser
) -> IssueResponse:
    """Get issue by identifier (e.g., PRJ-123)."""
    issue_service = IssueService()

    # Out of scope answers like missing: no identifier oracle (CHT-809,
    # CHT-1785).
    issue, _project = await visible_issue_by_identifier(current_user, identifier)

    # Lazy auto-release of an expired claim lease (CHT-1246): an issue
    # read is one of the surfaces that must never keep surfacing a
    # crashed agent's stale claim.
    issue = await issue_service.release_lease_if_expired(issue)

    return await issue_response(issue)


@router.get("/{issue_id}", response_model=IssueResponse)
@reads
async def get_issue(issue_id: str, current_user: CurrentUser) -> IssueResponse:
    """Get issue by ID."""
    issue_service = IssueService()

    issue, project = await visible_issue(current_user, issue_id)

    # Lazy auto-release of an expired claim lease (CHT-1246).
    issue = await issue_service.release_lease_if_expired(issue)

    return await issue_response(issue)


@router.patch("/{issue_id}", response_model=IssueResponse)
@writes
@idempotent
async def update_issue(
    issue_id: str,
    issue_in: IssueUpdate,
    current_user: CurrentUser,
    x_chaotic_interactive: Annotated[str | None, Header()] = None,
) -> IssueResponse:
    """Update an issue."""
    issue_service = IssueService()

    issue, project = await visible_issue(current_user, issue_id)

    # Validate assignee, sprint, labels, parent if provided (CHT-293, CHT-294, CHT-296, CHT-295)
    if issue_in.assignee_id is not None:
        await _validate_assignee(issue_in.assignee_id, project.team_id, project.id, issue.assignee_id)
    if issue_in.sprint_id is not None:
        await _validate_sprint(current_user, issue_in.sprint_id, issue.project_id)
    if issue_in.label_ids is not None:
        await _validate_labels(current_user, issue_in.label_ids, project.team_id)
    if issue_in.parent_id is not None:
        await _validate_parent(current_user, issue_in.parent_id, issue.project_id, issue_id=issue_id)

    # Ritual/estimate exemption requires BOTH a human account AND an
    # interactive (TTY) caller (CHT-1302, hybrid gate). Human users can use
    # either JWT or API key auth. The interactive signal is client-asserted
    # via X-Chaotic-Interactive: best-effort defense against an agent
    # accidentally authed as a human, not a guard against a malicious
    # client forging the header.
    interactive = x_chaotic_interactive == "1"
    is_human_request = not current_user.is_agent and interactive

    try:
        issue = await issue_service.update(issue, issue_in, current_user.id, is_human_request=is_human_request)
    except EstimateRequiredError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except SprintInLimboError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=_limbo_detail(e),
        )
    except SprintInArrearsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=_arrears_detail(e),
        )
    except TicketRitualsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=await _ritual_refusal_detail(e, "ticket_rituals_pending", "Ticket has pending rituals", "closing"),
        )
    except ClaimRitualsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=await _ritual_refusal_detail(
                e, "claim_rituals_pending", "Ticket has pending claim rituals",
                e.verb,
            ),
        )
    except IntentInFlightError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "error_code": "intent_in_flight",
                "message": str(e),
                "issue_id": e.issue_id,
                "intent_type": e.intent_type,
                "initiator_user_id": e.initiator_user_id,
            },
        )
    except IssueAlreadyClaimedError as e:
        # Self-claim lost -- either the fast-path guard (valid lease held
        # by someone else) or the CAS (raced another claimant and lost).
        # CHT-1246, PR #217 review finding 1.
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "error_code": "already_claimed",
                "message": str(e),
                "issue_id": e.issue_id,
                "assignee_id": e.assignee_id,
            },
        )
    except AssigneeChangedError as e:
        # Another request changed the assignee between our read and our
        # write (CHT-1832); same body as already_claimed, naming the
        # assignee the issue has now.
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "error_code": "assignee_changed",
                "message": str(e),
                "issue_id": e.issue_id,
                "assignee_id": e.assignee_id,
            },
        )

    response = await issue_response(issue)

    # Auto-link cross-referenced issues when description changes (CHT-133)
    if issue_in.description is not None:
        try:
            await issue_service.create_cross_references(
                issue.id, issue_in.description, project_id=confined_project_id(current_user),
            )
        except Exception:
            logger.warning("Failed to create cross-references for issue %s", issue.id, exc_info=True)

    # Broadcast real-time updates
    await broadcast_issue_event(project.team_id, "updated", response.model_dump(mode="json"))
    await broadcast_activity_event(project.team_id, "created", {"issue_id": issue.id})

    return response


@router.delete("/{issue_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def delete_issue(issue_id: str, current_user: CurrentUser):
    """Delete an issue."""
    issue_service = IssueService()

    issue, project = await visible_issue(current_user, issue_id)

    # Broadcast before deleting (need the ID)
    await broadcast_issue_event(project.team_id, "deleted", {"id": issue.id, "identifier": issue.identifier})

    await issue_service.delete(issue)


# Labels
@router.post("/{issue_id}/labels", response_model=IssueResponse)
@writes
async def add_label_to_issue(
    issue_id: str,
    body: AddLabelRequest,
    current_user: CurrentUser,
) -> IssueResponse:
    """Add a label to an issue."""
    issue_service = IssueService()

    issue, project = await visible_issue(current_user, issue_id)

    # Another team's label answers like a missing one (CHT-1785).
    label = await issue_service.get_label_by_id(body.label_id)
    if not await can_see_label(current_user, label):
        raise not_found("Label not found")

    if label.team_id != project.team_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Label does not belong to this team",
        )

    issue = await issue_service.add_label_to_issue(issue, label)
    response = await issue_response(issue)
    await broadcast_issue_event(project.team_id, "updated", response.model_dump(mode="json"))
    return response


@router.delete("/{issue_id}/labels/{label_id}", response_model=IssueResponse)
@writes
async def remove_label_from_issue(
    issue_id: str,
    label_id: str,
    current_user: CurrentUser,
) -> IssueResponse:
    """Remove a label from an issue."""
    issue_service = IssueService()

    issue, project = await visible_issue(current_user, issue_id)

    # Another team's label answers like a missing one (CHT-1785).
    label = await issue_service.get_label_by_id(label_id)
    if not await can_see_label(current_user, label):
        raise not_found("Label not found")

    if label.team_id != project.team_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Label does not belong to this team",
        )

    issue = await issue_service.remove_label_from_issue(issue, label)
    response = await issue_response(issue)
    await broadcast_issue_event(project.team_id, "updated", response.model_dump(mode="json"))
    return response


@router.get("/{issue_id}/activities", response_model=list[IssueActivityResponse])
@reads
async def list_activities(
    issue_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 50,
):
    """List activities for an issue."""
    issue_service = IssueService()
    sprint_service = SprintService()

    issue, project = await visible_issue(current_user, issue_id)

    activities = await issue_service.list_activities(issue_id, skip, limit)

    # Batch lookup sprint names for sprint-related activities
    sprint_ids = set()
    moved_val = ActivityType.MOVED_TO_SPRINT.value
    removed_val = ActivityType.REMOVED_FROM_SPRINT.value
    for a in activities:
        act_type = _activity_type_value(a.activity_type, ActivityType)
        if act_type == moved_val and a.new_value:
            sprint_ids.add(a.new_value)
        elif act_type == removed_val and a.old_value:
            sprint_ids.add(a.old_value)
    sprint_names = {}
    for sprint_id in sprint_ids:
        sprint = await sprint_service.get_by_id(sprint_id)
        if sprint:
            sprint_names[sprint_id] = sprint.name

    def get_sprint_name(activity):
        """Get sprint name for sprint-related activities."""
        act_type = _activity_type_value(activity.activity_type, ActivityType)
        if act_type == moved_val:
            return sprint_names.get(activity.new_value)
        elif act_type == removed_val:
            return sprint_names.get(activity.old_value)
        return None

    return await fill_principals([
        IssueActivityResponse(
            id=a.id,
            issue_id=a.issue_id,
            user_id=a.user_id,
            user_name=a.user.name if a.user else None,
            user_email=a.user.email if a.user else None,
            activity_type=_activity_type_value(a.activity_type, ActivityType),
            field_name=a.field_name,
            old_value=a.old_value,
            new_value=a.new_value,
            sprint_name=get_sprint_name(a),
            created_at=ensure_utc(a.created_at),
        )
        for a in activities
    ])


def _description_revision_author_name(rev) -> str | None:
    author = getattr(rev, "author", None)
    return author.name if author else None


async def _get_issue_checked(issue_id: str, current_user) -> "Issue":
    """Load an issue the caller may see, else 404 (CHT-1785)."""
    issue, _project = await visible_issue(current_user, issue_id)
    return issue


@router.get(
    "/{issue_id}/description-revisions",
    response_model=list[IssueDescriptionRevisionListItem],
)
@reads
async def list_description_revisions(
    issue_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
) -> list[IssueDescriptionRevisionListItem]:
    """List description revisions for an issue, newest first."""
    limit = min(limit, 10000)
    await _get_issue_checked(issue_id, current_user)

    revisions = await IssueService().list_description_revisions(issue_id, skip, limit)
    return await fill_principals([
        IssueDescriptionRevisionListItem(
            id=rev.id,
            issue_id=rev.issue_id,
            version=rev.version,
            author_id=rev.author_id,
            author_name=_description_revision_author_name(rev),
            created_at=ensure_utc(rev.created_at),
        )
        for rev in revisions
    ])


@router.get(
    "/{issue_id}/description-revisions/{version}",
    response_model=IssueDescriptionRevisionResponse,
)
@reads
async def get_description_revision(
    issue_id: str,
    version: int,
    current_user: CurrentUser,
) -> IssueDescriptionRevisionResponse:
    """Get a single description-revision snapshot by version number."""
    await _get_issue_checked(issue_id, current_user)

    rev = await IssueService().get_description_revision(issue_id, version)
    if not rev:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Revision not found",
        )

    return await fill_principals(IssueDescriptionRevisionResponse(
        id=rev.id,
        issue_id=rev.issue_id,
        version=rev.version,
        description=rev.description,
        author_id=rev.author_id,
        author_name=_description_revision_author_name(rev),
        created_at=ensure_utc(rev.created_at),
    ))


# Sub-issues
@router.get("/{issue_id}/sub-issues", response_model=list[IssueResponse])
@reads
async def list_sub_issues(
    issue_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
) -> list[IssueResponse]:
    """List sub-issues for an issue."""
    issue_service = IssueService()

    issue, project = await visible_issue(current_user, issue_id)

    sub_issues = await issue_service.list_sub_issues(issue_id, skip, limit)
    return await issues_to_responses(sub_issues)


# Comments
@router.post(
    "/{issue_id}/comments",
    response_model=IssueCommentCreated,
    status_code=status.HTTP_201_CREATED,
)
@writes
@idempotent
async def create_comment(
    issue_id: str,
    comment_in: IssueCommentCreate,
    current_user: CurrentUser,
) -> IssueCommentCreated:
    """Create a comment on an issue. `warnings` names each @handle that
    reached nobody (CHT-1735)."""
    issue_service = IssueService()

    issue, project = await visible_issue(current_user, issue_id)

    warnings: list[str] = []
    comment = await issue_service.create_comment(issue_id, comment_in, current_user.id, warnings=warnings)

    # Auto-link cross-referenced issues (CHT-133)
    try:
        await issue_service.create_cross_references(
            issue_id, comment_in.content, project_id=confined_project_id(current_user),
        )
    except Exception:
        logger.warning("Failed to create cross-references for issue %s", issue_id, exc_info=True)

    response = IssueCommentCreated(
        id=comment.id,
        issue_id=comment.issue_id,
        author_id=comment.author_id,
        author_name=current_user.name,
        content=comment.content,
        created_at=ensure_utc(comment.created_at),
        updated_at=ensure_utc(comment.updated_at),
        warnings=warnings,
    )
    await fill_principals(response)
    # The warnings are the author's alone.
    await broadcast_comment_event(
        project.team_id, "created", response.model_dump(mode="json", exclude={"warnings"}),
    )
    await broadcast_activity_event(project.team_id, "created", {"issue_id": comment.issue_id})
    return response


@router.get("/{issue_id}/comments", response_model=list[IssueCommentResponse])
@reads
async def list_comments(
    issue_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
) -> list[IssueCommentResponse]:
    """List comments for an issue."""
    issue_service = IssueService()

    issue, project = await visible_issue(current_user, issue_id)

    comments = await issue_service.list_comments(issue_id, skip, limit)
    return await fill_principals([
        IssueCommentResponse(
            id=c.id,
            issue_id=c.issue_id,
            author_id=c.author_id,
            author_name=c.author.name if c.author else None,
            content=c.content,
            created_at=ensure_utc(c.created_at),
            updated_at=ensure_utc(c.updated_at),
        )
        for c in comments
    ])


@router.patch("/{issue_id}/comments/{comment_id}", response_model=IssueCommentResponse)
@writes
async def update_comment(
    issue_id: str,
    comment_id: str,
    comment_in: IssueCommentUpdate,
    current_user: CurrentUser,
):
    """Update a comment."""
    issue_service = IssueService()
    project_service = ProjectService()

    issue, project = await visible_issue(current_user, issue_id)

    comment = await issue_service.get_comment_by_id(comment_id)
    if not comment or comment.issue_id != issue_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found",
        )

    if comment.author_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only update own comments",
        )

    comment = await issue_service.update_comment(comment, comment_in)
    # CHT-803: re-run cross-referencing on edit, consistent with comment
    # creation and description updates -- editing a comment to add a
    # "CHT-123" reference should auto-link it too. Idempotent: existing
    # relations are a no-op (see create_cross_references).
    await issue_service.create_cross_references(
        issue_id, comment.content, project_id=confined_project_id(current_user),
    )
    response = IssueCommentResponse(
        id=comment.id,
        issue_id=comment.issue_id,
        author_id=comment.author_id,
        author_name=current_user.name,
        content=comment.content,
        created_at=ensure_utc(comment.created_at),
        updated_at=ensure_utc(comment.updated_at),
    )
    await fill_principals(response)
    project = await project_service.get_by_id(issue.project_id)
    if project:
        await broadcast_comment_event(project.team_id, "updated", response.model_dump(mode="json"))
    return response


@router.delete(
    "/{issue_id}/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT
)
@writes
async def delete_comment(
    issue_id: str,
    comment_id: str,
    current_user: CurrentUser,
):
    """Delete a comment."""
    issue_service = IssueService()

    issue, project = await visible_issue(current_user, issue_id)

    comment = await issue_service.get_comment_by_id(comment_id)
    if not comment or comment.issue_id != issue_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found",
        )

    if comment.author_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only delete own comments",
        )

    await issue_service.delete_comment(comment)
    if project:
        await broadcast_comment_event(
            project.team_id,
            "deleted",
            {"id": comment.id, "issue_id": comment.issue_id},
        )


# Issue Relations
@router.post(
    "/{issue_id}/relations",
    response_model=IssueRelationResponse,
    status_code=status.HTTP_201_CREATED,
)
@writes
async def create_relation(
    issue_id: str,
    relation_in: IssueRelationCreate,
    current_user: CurrentUser,
) -> IssueRelationResponse:
    """Create a relation between two issues."""
    issue_service = IssueService()

    # Both issues must exist and be visible to the caller; one it cannot
    # see answers like a missing one (CHT-1785).
    issue, project = await visible_issue(current_user, issue_id)
    related_issue, related_project = await visible_issue(
        current_user, relation_in.related_issue_id, detail="Related issue not found",
    )

    # Prevent cross-team relations
    if project.team_id != related_project.team_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot create relations between issues in different teams",
        )

    # CHT-298: no self-relations (an issue can't block/duplicate/relate to itself).
    if issue_id == relation_in.related_issue_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An issue cannot have a relation to itself",
        )

    # CHT-298: a BLOCKS edge that would close a cycle is refused. The
    # check lives in the service, inside the insert's transaction and
    # behind the writer lock, so two concurrent inverse edges cannot both
    # pass it (CHT-1311).
    try:
        relation = await issue_service.create_relation(issue_id, relation_in)
    except RelationCycleError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    await broadcast_relation_event(
        project.team_id,
        "created",
        {"source_issue_id": relation.issue_id, "target_issue_id": relation.related_issue_id},
    )
    # Fill in the related-issue fields and "direction" that list_relations
    # already computes, so create and list return the same shape (CHT-1223).
    return IssueRelationResponse(
        id=relation.id,
        issue_id=relation.issue_id,
        related_issue_id=relation.related_issue_id,
        relation_type=(relation.relation_type if isinstance(relation.relation_type, str) else relation.relation_type.name).lower(),
        created_at=relation.created_at,
        related_issue_identifier=related_issue.identifier,
        related_issue_title=related_issue.title,
        related_issue_status=related_issue.status,
        direction="outgoing",
    )


@router.get("/{issue_id}/relations", response_model=list[IssueRelationResponse])
@reads
async def list_relations(
    issue_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 1000,
) -> list[IssueRelationResponse]:
    """List all relations for an issue."""
    issue_service = IssueService()

    issue, project = await visible_issue(current_user, issue_id)

    relations = await issue_service.list_relations(
        issue_id, team_id=project.team_id, project_id=confined_project_id(current_user),
    )
    return [IssueRelationResponse.model_validate(r) for r in relations[skip:skip + limit]]


@router.delete(
    "/{issue_id}/relations/{relation_id}", status_code=status.HTTP_204_NO_CONTENT
)
@writes
async def delete_relation(
    issue_id: str,
    relation_id: str,
    current_user: CurrentUser,
) -> None:
    """Delete a relation."""
    issue_service = IssueService()

    issue, project = await visible_issue(current_user, issue_id)

    relation = await issue_service.get_relation_by_id(relation_id)
    if not relation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Relation not found",
        )

    # Check that the relation belongs to this issue (either direction)
    if relation.issue_id != issue_id and relation.related_issue_id != issue_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Relation not found",
        )

    relation_data = {"source_issue_id": relation.issue_id, "target_issue_id": relation.related_issue_id}
    await issue_service.delete_relation(relation)
    await broadcast_relation_event(project.team_id, "deleted", relation_data)


@router.get("/{issue_id}/documents", response_model=list[DocumentResponse])
@reads
async def get_issue_documents(issue_id: str, current_user: CurrentUser):
    """Get documents linked to an issue."""
    document_service = DocumentService()

    await visible_issue(current_user, issue_id)

    # A link does not grant access: only the documents this caller could
    # open by id (CHT-1780).
    documents = [
        doc for doc in await document_service.get_linked_documents_for_issue(issue_id)
        if await can_access_document(current_user, doc)
    ]
    return await fill_principals([
        DocumentResponse(
            id=doc.id,
            team_id=doc.team_id,
            author_id=doc.author_id,
            author_name=doc.author and doc.author.name,
            project_id=doc.project_id,
            sprint_id=doc.sprint_id,
            title=doc.title,
            content=doc.content,
            icon=doc.icon,
            created_at=ensure_utc(doc.created_at),
            updated_at=ensure_utc(doc.updated_at),
        )
        for doc in documents
    ])
