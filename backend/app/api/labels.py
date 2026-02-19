"""Label API routes."""
from fastapi import APIRouter, HTTPException, status
from app.api.deps import CurrentUser, check_user_team_access
from app.schemas.issue import LabelCreate, LabelUpdate, LabelResponse
from app.services.issue_service import IssueService
from app.services.team_service import TeamService

router = APIRouter()


@router.post("", response_model=LabelResponse, status_code=status.HTTP_201_CREATED)
async def create_label(
    team_id: str,
    label_in: LabelCreate,
    current_user: CurrentUser,
):
    """Create a new label."""
    issue_service = IssueService()

    if not await check_user_team_access(current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this team",
        )

    label = await issue_service.create_label(label_in, team_id)
    return label


@router.get("", response_model=list[LabelResponse])
async def list_labels(
    team_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
):
    """List labels for a team."""
    issue_service = IssueService()

    if not await check_user_team_access(current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this team",
        )

    labels = await issue_service.list_labels(team_id, skip, limit)
    return labels


@router.get("/{label_id}", response_model=LabelResponse)
async def get_label(label_id: str, current_user: CurrentUser):
    """Get label by ID."""
    issue_service = IssueService()

    label = await issue_service.get_label_by_id(label_id)
    if not label:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Label not found",
        )

    if not await check_user_team_access(current_user, label.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this team",
        )

    return label


@router.patch("/{label_id}", response_model=LabelResponse)
async def update_label(
    label_id: str,
    label_in: LabelUpdate,
    current_user: CurrentUser,
):
    """Update a label."""
    issue_service = IssueService()

    label = await issue_service.get_label_by_id(label_id)
    if not label:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Label not found",
        )

    if not await check_user_team_access(current_user, label.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this team",
        )

    label = await issue_service.update_label(label, label_in)
    return label


@router.delete("/{label_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_label(label_id: str, current_user: CurrentUser):
    """Delete a label."""
    # Agents cannot delete labels — check before lookup to avoid info disclosure
    if current_user.is_agent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Agents cannot delete labels",
        )

    issue_service = IssueService()

    label = await issue_service.get_label_by_id(label_id)
    if not label:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Label not found",
        )

    team_service = TeamService()
    if not await team_service.is_team_admin(label.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can delete labels",
        )

    await issue_service.delete_label(label)
