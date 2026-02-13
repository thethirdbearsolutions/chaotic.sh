"""Issue API routes."""
import logging
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, status, Query
from app.api.deps import DbSession, CurrentUser, check_user_project_access, check_user_team_access

logger = logging.getLogger(__name__)


def ensure_utc(dt: datetime | None) -> datetime | None:
    """Ensure datetime is timezone-aware (UTC) for proper JSON serialization.

    SQLite stores naive datetimes. When serialized to JSON without timezone info,
    JavaScript interprets them as local time instead of UTC, causing incorrect
    relative time calculations.
    """
    if dt is None:
        return None
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt
from app.schemas.issue import (
    IssueCreate,
    IssueUpdate,
    IssueResponse,
    IssueBatchUpdate,
    AddLabelRequest,
    IssueCommentCreate,
    IssueCommentUpdate,
    IssueCommentResponse,
    IssueActivityResponse,
    IssueActivityFeedResponse,
    IssueRelationCreate,
    LabelResponse,
)
from app.schemas.document import DocumentResponse
from app.services.document_service import DocumentService
from app.services.issue_service import (
    IssueService,
    SprintInArrearsError,
    SprintInLimboError,
    TicketRitualsError,
    ClaimRitualsError,
    EstimateRequiredError,
)
from app.services.project_service import ProjectService
from app.services.sprint_service import SprintService
from app.services.team_service import TeamService
from app.models.issue import Issue, IssueStatus, IssuePriority, IssueType, ActivityType
from app.websocket import broadcast_issue_event, broadcast_comment_event

router = APIRouter()


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
        created_at=ensure_utc(issue.created_at),
        updated_at=ensure_utc(issue.updated_at),
        labels=[LabelResponse.model_validate(label) for label in issue.labels] if issue.labels else [],
    )


@router.post("", response_model=IssueResponse, status_code=status.HTTP_201_CREATED)
async def create_issue(
    project_id: str,
    issue_in: IssueCreate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Create a new issue."""
    project_service = ProjectService(db)
    issue_service = IssueService(db)

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # Check access (team membership for humans, agent scope for agents)
    has_access = await check_user_project_access(db, current_user, project_id, project.team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    # Check if this is a human user (not an agent)
    is_human_request = not current_user.is_agent

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
            detail={
                "message": "Sprint is in limbo. Complete pending rituals to continue.",
                "sprint_id": e.sprint_id,
                "pending_rituals": e.pending_rituals,
            },
        )
    except SprintInArrearsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "message": "Sprint is in arrears. Close the current sprint to continue.",
                "budget": e.budget,
                "points_spent": e.points_spent,
                "arrears_by": e.arrears_by,
            },
        )
    except TicketRitualsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "message": "Cannot create issue as done - ticket has pending rituals.",
                "issue_id": e.issue_id,
                "pending_rituals": e.pending_rituals,
            },
        )
    except ClaimRitualsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "message": "Cannot create issue as in_progress - ticket has pending claim rituals.",
                "issue_id": e.issue_id,
                "pending_rituals": e.pending_rituals,
            },
        )

    response = issue_to_response(issue)

    # Auto-link cross-referenced issues (CHT-133)
    try:
        await issue_service.create_cross_references(issue.id, issue_in.description)
    except Exception:
        logger.warning("Failed to create cross-references for issue %s", issue.id, exc_info=True)

    # Broadcast real-time update
    await broadcast_issue_event(project.team_id, "created", response.model_dump(mode="json"))

    return response


@router.get("", response_model=list[IssueResponse])
async def list_issues(
    db: DbSession,
    current_user: CurrentUser,
    project_id: str | None = None,
    sprint_id: str | None = None,
    assignee_id: str | None = None,
    team_id: str | None = None,
    parent_id: str | None = None,
    statuses: list[IssueStatus] | None = Query(None, alias="status"),
    priorities: list[IssuePriority] | None = Query(None, alias="priority"),
    issue_type: IssueType | None = Query(None, alias="issue_type"),
    labels: list[str] | None = Query(None, alias="label"),
    search: str | None = Query(None, min_length=1, max_length=200),
    sort_by: str | None = Query(None, pattern="^(created|updated|priority|status|title|estimate|random)$"),
    order: str | None = Query(None, pattern="^(asc|desc)$"),
    skip: int = 0,
    limit: int = 1000,
):
    """List issues with filters. Pass multiple status/priority/label values to filter by multiple values.

    All filter parameters work consistently whether querying by project_id or team_id.
    """
    issue_service = IssueService(db)
    project_service = ProjectService(db)
    team_service = TeamService(db)

    # Validate access and determine scope
    if project_id:
        project = await project_service.get_by_id(project_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        has_access = await check_user_project_access(db, current_user, project_id, project.team_id)
        if not has_access:
            raise HTTPException(status_code=403, detail="Not authorized to access this project")

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
        )
    elif team_id:
        has_access = await check_user_team_access(db, current_user, team_id)
        if not has_access:
            raise HTTPException(status_code=403, detail="Not authorized to access this team")

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
        )
    elif sprint_id:
        # Sprint-only query: check access via sprint -> project -> team
        sprint_service = SprintService(db)
        sprint = await sprint_service.get_by_id(sprint_id)
        if not sprint:
            raise HTTPException(status_code=404, detail="Sprint not found")
        project = await project_service.get_by_id(sprint.project_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        has_access = await check_user_project_access(db, current_user, project.id, project.team_id)
        if not has_access:
            raise HTTPException(status_code=403, detail="Not authorized to access this sprint")
        issues = await issue_service.list_by_sprint(
            sprint_id, skip, limit, issue_type=issue_type, sort_by=sort_by, order=order
        )
    elif assignee_id:
        # Assignee-only query: scope to user's accessible teams
        if current_user.is_agent:
            team_ids = [current_user.agent_team_id] if current_user.agent_team_id else []
        else:
            user_teams = await team_service.get_user_teams(current_user.id)
            team_ids = [t.id for t in user_teams]
        if not team_ids:
            issues = []
        else:
            issues = await issue_service.list_by_assignee(
                assignee_id, skip, limit,
                statuses=statuses, priorities=priorities, issue_type=issue_type, team_ids=team_ids,
                sort_by=sort_by, order=order,
            )
    else:
        raise HTTPException(
            status_code=400,
            detail="Must provide project_id, team_id, sprint_id, or assignee_id",
        )

    return [issue_to_response(issue) for issue in issues]


@router.get("/search", response_model=list[IssueResponse])
async def search_issues(
    team_id: str,
    q: str = Query(..., min_length=1, max_length=200),
    db: DbSession = None,
    current_user: CurrentUser = None,
    project_id: str | None = None,
    skip: int = 0,
    limit: int = 50,
):
    """Search issues by title, description, or identifier.

    If project_id is provided, only search within that project.
    Otherwise, search across all projects in the team.
    """
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    has_access = await check_user_team_access(db, current_user, team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this team",
        )

    # If project_id provided, verify it belongs to this team
    if project_id:
        project = await project_service.get_by_id(project_id)
        if not project or project.team_id != team_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found in this team",
            )

    issues = await issue_service.search(team_id, q, skip, limit, project_id=project_id)
    return [issue_to_response(issue) for issue in issues]


@router.post("/batch-update", response_model=list[IssueResponse])
async def batch_update_issues(
    batch_in: IssueBatchUpdate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Batch update multiple issues with safe fields (priority, estimate, labels).

    Does NOT support status, assignee, or sprint changes, which require
    per-issue validation. Use the single-issue PATCH endpoint for those.
    """
    from sqlalchemy import select as sa_select
    from sqlalchemy.orm import selectinload
    from app.models.issue import Issue as IssueModel
    from app.models.project import Project as ProjectModel

    issue_service = IssueService(db)

    # Deduplicate issue IDs
    unique_ids = list(dict.fromkeys(batch_in.issue_ids))

    # Bulk fetch all issues in one query
    result = await db.execute(
        sa_select(IssueModel)
        .options(selectinload(IssueModel.labels), selectinload(IssueModel.creator))
        .where(IssueModel.id.in_(unique_ids))
    )
    issues = {iss.id: iss for iss in result.scalars().all()}

    if len(issues) != len(unique_ids):
        missing = set(unique_ids) - set(issues.keys())
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Issues not found: {missing}",
        )

    # Bulk fetch all referenced projects in one query
    project_ids = {iss.project_id for iss in issues.values()}
    result = await db.execute(
        sa_select(ProjectModel).where(ProjectModel.id.in_(project_ids))
    )
    projects = {p.id: p for p in result.scalars().all()}

    # All issues must belong to the same team for label validation
    team_ids = {p.team_id for p in projects.values()}
    if len(team_ids) != 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="All issues in a batch must belong to the same team",
        )
    team_id = team_ids.pop()

    # Check access per distinct project (not per issue)
    for project_id, project in projects.items():
        if not await check_user_project_access(db, current_user, project_id, project.team_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access one or more issues",
            )

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

    responses = [issue_to_response(issue) for issue in updated]
    for resp in responses:
        await broadcast_issue_event(team_id, "updated", resp.model_dump(mode="json"))
    return responses


# Activities
@router.get("/activities", response_model=list[IssueActivityFeedResponse])
async def list_team_activities(
    team_id: str,
    db: DbSession,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 50,
):
    """List recent activities for a team (issues and documents)."""
    from app.services.document_service import DocumentService

    issue_service = IssueService(db)
    sprint_service = SprintService(db)
    document_service = DocumentService(db)

    has_access = await check_user_team_access(db, current_user, team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this team",
        )

    # Fetch both issue and document activities (CHT-639)
    # Get more than needed so we can merge and sort, then limit
    issue_activities = await issue_service.list_team_activities(team_id, 0, limit * 2)
    doc_activities = await document_service.list_team_activities(team_id, 0, limit * 2)

    # Batch lookup sprint names for sprint-related activities
    sprint_ids = set()
    for a in issue_activities:
        if a.activity_type == ActivityType.MOVED_TO_SPRINT and a.new_value:
            sprint_ids.add(a.new_value)
        elif a.activity_type == ActivityType.REMOVED_FROM_SPRINT and a.old_value:
            sprint_ids.add(a.old_value)
    sprint_names = {}
    for sprint_id in sprint_ids:
        sprint = await sprint_service.get_by_id(sprint_id)
        if sprint:
            sprint_names[sprint_id] = sprint.name

    def get_sprint_name(activity):
        """Get sprint name for sprint-related activities."""
        if activity.activity_type == ActivityType.MOVED_TO_SPRINT:
            return sprint_names.get(activity.new_value)
        elif activity.activity_type == ActivityType.REMOVED_FROM_SPRINT:
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
            activity_type=a.activity_type.value,  # Convert enum to string
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
            document_title=a.document_title or (a.document.title if a.document else None),
            document_icon=a.document_icon or (a.document.icon if a.document else None),
            user_id=a.user_id,
            user_name=a.user.name if a.user else None,
            user_email=a.user.email if a.user else None,
            activity_type=a.activity_type.value,  # Convert enum to string
            created_at=ensure_utc(a.created_at),
        )
        for a in doc_activities
    ]

    # Merge and sort by created_at descending
    all_activities = issue_responses + doc_responses
    all_activities.sort(key=lambda x: x.created_at, reverse=True)

    # Apply pagination
    return all_activities[skip:skip + limit]


@router.get("/identifier/{identifier}", response_model=IssueResponse)
async def get_issue_by_identifier(
    identifier: str, db: DbSession, current_user: CurrentUser
):
    """Get issue by identifier (e.g., PRJ-123)."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    issue = await issue_service.get_by_identifier(identifier)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    has_access = await check_user_project_access(db, current_user, issue.project_id, project.team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    return issue_to_response(issue)


@router.get("/{issue_id}", response_model=IssueResponse)
async def get_issue(issue_id: str, db: DbSession, current_user: CurrentUser):
    """Get issue by ID."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    if project:
        await db.refresh(project)
    has_access = await check_user_project_access(db, current_user, issue.project_id, project.team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    return issue_to_response(issue)


@router.patch("/{issue_id}", response_model=IssueResponse)
async def update_issue(
    issue_id: str,
    issue_in: IssueUpdate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Update an issue."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    has_access = await check_user_project_access(db, current_user, issue.project_id, project.team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    # Check if this is a human user (not an agent)
    # Human users can use either JWT or API key auth
    is_human_request = not current_user.is_agent

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
            detail={
                "message": "Sprint is in limbo. Complete pending rituals to continue.",
                "sprint_id": e.sprint_id,
                "pending_rituals": e.pending_rituals,
            },
        )
    except SprintInArrearsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "message": "Sprint is in arrears. Close the current sprint to continue.",
                "budget": e.budget,
                "points_spent": e.points_spent,
                "arrears_by": e.arrears_by,
            },
        )
    except TicketRitualsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "message": "Ticket has pending rituals. Complete them before closing.",
                "issue_id": e.issue_id,
                "pending_rituals": e.pending_rituals,
            },
        )
    except ClaimRitualsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "message": "Ticket has pending claim rituals. Complete them before claiming.",
                "issue_id": e.issue_id,
                "pending_rituals": e.pending_rituals,
            },
        )

    response = issue_to_response(issue)

    # Auto-link cross-referenced issues when description changes (CHT-133)
    if issue_in.description is not None:
        try:
            await issue_service.create_cross_references(issue.id, issue_in.description)
        except Exception:
            logger.warning("Failed to create cross-references for issue %s", issue.id, exc_info=True)

    # Broadcast real-time update
    await broadcast_issue_event(project.team_id, "updated", response.model_dump(mode="json"))

    return response


@router.delete("/{issue_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_issue(issue_id: str, db: DbSession, current_user: CurrentUser):
    """Delete an issue."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    has_access = await check_user_project_access(db, current_user, issue.project_id, project.team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    # Broadcast before deleting (need the ID)
    await broadcast_issue_event(project.team_id, "deleted", {"id": issue.id, "identifier": issue.identifier})

    await issue_service.delete(issue)


# Labels
@router.post("/{issue_id}/labels", response_model=IssueResponse)
async def add_label_to_issue(
    issue_id: str,
    body: AddLabelRequest,
    db: DbSession,
    current_user: CurrentUser,
):
    """Add a label to an issue."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    if not await check_user_project_access(db, current_user, issue.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    label = await issue_service.get_label_by_id(body.label_id)
    if not label:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Label not found",
        )

    if label.team_id != project.team_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Label does not belong to this team",
        )

    issue = await issue_service.add_label_to_issue(issue, label)
    response = issue_to_response(issue)
    await broadcast_issue_event(project.team_id, "updated", response.model_dump(mode="json"))
    return response


@router.delete("/{issue_id}/labels/{label_id}", response_model=IssueResponse)
async def remove_label_from_issue(
    issue_id: str,
    label_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Remove a label from an issue."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    if not await check_user_project_access(db, current_user, issue.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    label = await issue_service.get_label_by_id(label_id)
    if not label:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Label not found",
        )

    if label.team_id != project.team_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Label does not belong to this team",
        )

    issue = await issue_service.remove_label_from_issue(issue, label)
    response = issue_to_response(issue)
    await broadcast_issue_event(project.team_id, "updated", response.model_dump(mode="json"))
    return response


@router.get("/{issue_id}/activities", response_model=list[IssueActivityResponse])
async def list_activities(
    issue_id: str,
    db: DbSession,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 50,
):
    """List activities for an issue."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)
    sprint_service = SprintService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    has_access = await check_user_project_access(db, current_user, issue.project_id, project.team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    activities = await issue_service.list_activities(issue_id, skip, limit)

    # Batch lookup sprint names for sprint-related activities
    sprint_ids = set()
    for a in activities:
        if a.activity_type == ActivityType.MOVED_TO_SPRINT and a.new_value:
            sprint_ids.add(a.new_value)
        elif a.activity_type == ActivityType.REMOVED_FROM_SPRINT and a.old_value:
            sprint_ids.add(a.old_value)
    sprint_names = {}
    for sprint_id in sprint_ids:
        sprint = await sprint_service.get_by_id(sprint_id)
        if sprint:
            sprint_names[sprint_id] = sprint.name

    def get_sprint_name(activity):
        """Get sprint name for sprint-related activities."""
        if activity.activity_type == ActivityType.MOVED_TO_SPRINT:
            return sprint_names.get(activity.new_value)
        elif activity.activity_type == ActivityType.REMOVED_FROM_SPRINT:
            return sprint_names.get(activity.old_value)
        return None

    return [
        IssueActivityResponse(
            id=a.id,
            issue_id=a.issue_id,
            user_id=a.user_id,
            user_name=a.user.name if a.user else None,
            user_email=a.user.email if a.user else None,
            activity_type=a.activity_type,
            field_name=a.field_name,
            old_value=a.old_value,
            new_value=a.new_value,
            sprint_name=get_sprint_name(a),
            created_at=ensure_utc(a.created_at),
        )
        for a in activities
    ]


# Sub-issues
@router.get("/{issue_id}/sub-issues", response_model=list[IssueResponse])
async def list_sub_issues(
    issue_id: str,
    db: DbSession,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
):
    """List sub-issues for an issue."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    has_access = await check_user_project_access(db, current_user, issue.project_id, project.team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    sub_issues = await issue_service.list_sub_issues(issue_id, skip, limit)
    return [issue_to_response(issue) for issue in sub_issues]


# Comments
@router.post(
    "/{issue_id}/comments",
    response_model=IssueCommentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_comment(
    issue_id: str,
    comment_in: IssueCommentCreate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Create a comment on an issue."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    has_access = await check_user_project_access(db, current_user, issue.project_id, project.team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    comment = await issue_service.create_comment(issue_id, comment_in, current_user.id)

    # Auto-link cross-referenced issues (CHT-133)
    try:
        await issue_service.create_cross_references(issue_id, comment_in.content)
    except Exception:
        logger.warning("Failed to create cross-references for issue %s", issue_id, exc_info=True)

    response = IssueCommentResponse(
        id=comment.id,
        issue_id=comment.issue_id,
        author_id=comment.author_id,
        author_name=current_user.name,
        content=comment.content,
        created_at=ensure_utc(comment.created_at),
        updated_at=ensure_utc(comment.updated_at),
    )
    await broadcast_comment_event(project.team_id, "created", response.model_dump(mode="json"))
    return response


@router.get("/{issue_id}/comments", response_model=list[IssueCommentResponse])
async def list_comments(
    issue_id: str,
    db: DbSession,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
):
    """List comments for an issue."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    has_access = await check_user_project_access(db, current_user, issue.project_id, project.team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    comments = await issue_service.list_comments(issue_id, skip, limit)
    return [
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
    ]


@router.patch("/{issue_id}/comments/{comment_id}", response_model=IssueCommentResponse)
async def update_comment(
    issue_id: str,
    comment_id: str,
    comment_in: IssueCommentUpdate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Update a comment."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

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
    response = IssueCommentResponse(
        id=comment.id,
        issue_id=comment.issue_id,
        author_id=comment.author_id,
        author_name=current_user.name,
        content=comment.content,
        created_at=ensure_utc(comment.created_at),
        updated_at=ensure_utc(comment.updated_at),
    )
    project = await project_service.get_by_id(issue.project_id)
    if project:
        await broadcast_comment_event(project.team_id, "updated", response.model_dump(mode="json"))
    return response


@router.delete(
    "/{issue_id}/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT
)
async def delete_comment(
    issue_id: str,
    comment_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Delete a comment."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

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
    project = await project_service.get_by_id(issue.project_id)
    if project:
        await broadcast_comment_event(
            project.team_id,
            "deleted",
            {"id": comment.id, "issue_id": comment.issue_id},
        )


# Issue Relations
@router.post(
    "/{issue_id}/relations",
    status_code=status.HTTP_201_CREATED,
)
async def create_relation(
    issue_id: str,
    relation_in: IssueRelationCreate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Create a relation between two issues."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    # Check that both issues exist and user has access
    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    related_issue = await issue_service.get_by_id(relation_in.related_issue_id)
    if not related_issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Related issue not found",
        )

    # Check user has access to both issues' projects
    project = await project_service.get_by_id(issue.project_id)
    has_access = await check_user_project_access(db, current_user, issue.project_id, project.team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    related_project = await project_service.get_by_id(related_issue.project_id)
    has_related_access = await check_user_project_access(db, current_user, related_issue.project_id, related_project.team_id)
    if not has_related_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access the related issue's project",
        )

    relation = await issue_service.create_relation(issue_id, relation_in)
    return {
        "id": relation.id,
        "issue_id": relation.issue_id,
        "related_issue_id": relation.related_issue_id,
        "relation_type": relation.relation_type.value,
        "created_at": relation.created_at,
    }


@router.get("/{issue_id}/relations")
async def list_relations(
    issue_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """List all relations for an issue."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    has_access = await check_user_project_access(db, current_user, issue.project_id, project.team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    relations = await issue_service.list_relations(issue_id)
    return relations


@router.delete(
    "/{issue_id}/relations/{relation_id}", status_code=status.HTTP_204_NO_CONTENT
)
async def delete_relation(
    issue_id: str,
    relation_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Delete a relation."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    project = await project_service.get_by_id(issue.project_id)
    has_access = await check_user_project_access(db, current_user, issue.project_id, project.team_id)
    if not has_access:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

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
            detail="Relation not found for this issue",
        )

    await issue_service.delete_relation(relation)


@router.get("/{issue_id}/documents", response_model=list[DocumentResponse])
async def get_issue_documents(issue_id: str, db: DbSession, current_user: CurrentUser):
    """Get documents linked to an issue."""
    issue_service = IssueService(db)
    project_service = ProjectService(db)
    document_service = DocumentService(db)

    issue = await issue_service.get_by_id(issue_id)
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found",
        )

    # Check project access
    project = await project_service.get_by_id(issue.project_id)
    if not await check_user_project_access(db, current_user, issue.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this project",
        )

    documents = await document_service.get_linked_documents_for_issue(issue_id)
    return [
        DocumentResponse(
            id=doc.id,
            team_id=doc.team_id,
            author_id=doc.author_id,
            author_name=doc.author.name if doc.author else None,
            project_id=doc.project_id,
            sprint_id=doc.sprint_id,
            title=doc.title,
            content=doc.content,
            icon=doc.icon,
            created_at=ensure_utc(doc.created_at),
            updated_at=ensure_utc(doc.updated_at),
        )
        for doc in documents
    ]
