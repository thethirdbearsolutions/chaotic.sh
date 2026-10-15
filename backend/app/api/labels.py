"""Label API routes."""
from fastapi import APIRouter, HTTPException, status
from app.auth.access import reads, writes
from app.api.deps import CurrentUser, is_in_team_directory, can_read_team_data
from app.api.visibility import visible_label
from app.schemas.issue import LabelCreate, LabelUpdate, LabelResponse
from app.services.issue_service import IssueService
from app.services.team_service import TeamService

router = APIRouter()


@writes
async def create_label(
    team_id: str,
    label_in: LabelCreate,
    current_user: CurrentUser,
) -> LabelResponse:
    """Create a new label.

    Not directly routed here (CHT-1223): canonical route is the
    path-nested ``POST /teams/{team_id}/labels`` in nested.py.
    """
    issue_service = IssueService()

    # The team's label vocabulary: a project-scoped agent labels issues
    # in its project with it, so it may read and add to it (CHT-1780).
    if not await is_in_team_directory(current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this team",
        )

    label = await issue_service.create_label(label_in, team_id)
    return LabelResponse.model_validate(label)


@reads
async def list_labels(
    team_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
) -> list[LabelResponse]:
    """List labels for a team.

    Not directly routed here (CHT-1223): canonical route is the
    path-nested ``GET /teams/{team_id}/labels`` in nested.py.
    """
    issue_service = IssueService()

    # The team's label vocabulary: a project-scoped agent labels issues
    # in its project with it, so it may read and add to it (CHT-1780).
    if not await is_in_team_directory(current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this team",
        )

    labels = await issue_service.list_labels(team_id, skip, limit)
    return [LabelResponse.model_validate(label) for label in labels]


@router.get("/{label_id}", response_model=LabelResponse)
@reads
async def get_label(label_id: str, current_user: CurrentUser) -> LabelResponse:
    """Get label by ID. Another team's label answers like a missing one
    (CHT-1785)."""
    label = await visible_label(current_user, label_id)
    return LabelResponse.model_validate(label)


@router.patch("/{label_id}", response_model=LabelResponse)
@writes
async def update_label(
    label_id: str,
    label_in: LabelUpdate,
    current_user: CurrentUser,
) -> LabelResponse:
    """Update a label."""
    issue_service = IssueService()

    label = await visible_label(current_user, label_id)

    # Team-wide, not the directory check: a rename or recolour changes the
    # label on every project's issues, so a project-scoped agent may not
    # (CHT-1780).
    if not await can_read_team_data(current_user, label.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this team",
        )

    label = await issue_service.update_label(label, label_in)
    return LabelResponse.model_validate(label)


@router.delete("/{label_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def delete_label(label_id: str, current_user: CurrentUser) -> None:
    """Delete a label."""
    # Agents cannot delete labels — check before lookup to avoid info disclosure
    if current_user.is_agent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Agents cannot delete labels",
        )

    issue_service = IssueService()

    # Out of the caller's teams: 404, as if missing; in them but not an
    # admin: 403 (CHT-1785).
    label = await visible_label(current_user, label_id)

    team_service = TeamService()
    if not await team_service.is_team_admin(label.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can delete labels",
        )

    await issue_service.delete_label(label)
