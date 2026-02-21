"""Sprint API routes."""
from fastapi import APIRouter, HTTPException, status
from app.api.deps import CurrentUser, check_user_project_access
from app.schemas.sprint import SprintCreate, SprintUpdate, SprintResponse
from app.schemas.budget_transaction import BudgetTransactionResponse
from app.services.sprint_service import SprintService
from app.services.project_service import ProjectService
from app.services.ritual_service import RitualService
from app.enums import SprintStatus
from app.oxyde_models.issue import OxydeBudgetTransaction
from app.websocket import broadcast_sprint_event

router = APIRouter()


@router.get("", response_model=list[SprintResponse])
async def list_sprints(
    project_id: str,
    current_user: CurrentUser,
    sprint_status: SprintStatus | None = None,
    skip: int = 0,
    limit: int = 100,
):
    """List sprints for a project."""
    project_service = ProjectService()
    sprint_service = SprintService()

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    sprints = await sprint_service.list_by_project(project_id, skip, limit, sprint_status)
    return sprints


@router.post("", response_model=SprintResponse, status_code=status.HTTP_201_CREATED)
async def create_sprint(
    project_id: str,
    sprint_in: SprintCreate,
    current_user: CurrentUser,
):
    """Create a new sprint."""
    project_service = ProjectService()
    sprint_service = SprintService()

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    sprint = await sprint_service.create(sprint_in, project_id)
    response = SprintResponse.model_validate(sprint, from_attributes=True)
    await broadcast_sprint_event(project.team_id, "created", response.model_dump(mode="json"))
    return response


# NOTE: /current must come BEFORE /{sprint_id} for route matching to work
@router.get("/current", response_model=SprintResponse)
async def get_current_sprint(
    project_id: str,
    current_user: CurrentUser,
):
    """Get the current (active) sprint for a project, creating if needed."""
    sprint_service = SprintService()
    project_service = ProjectService()

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await check_user_project_access(current_user, project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    current, _ = await sprint_service.ensure_sprints_exist(project_id)
    return current


@router.get("/{sprint_id}", response_model=SprintResponse)
async def get_sprint(sprint_id: str, current_user: CurrentUser):
    """Get sprint by ID."""
    sprint_service = SprintService()
    project_service = ProjectService()

    sprint = await sprint_service.get_by_id(sprint_id)
    if not sprint:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sprint not found",
        )

    project = await project_service.get_by_id(sprint.project_id)
    if not await check_user_project_access(current_user, sprint.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    return sprint


@router.patch("/{sprint_id}", response_model=SprintResponse)
async def update_sprint(
    sprint_id: str,
    sprint_in: SprintUpdate,
    current_user: CurrentUser,
):
    """Update a sprint."""
    sprint_service = SprintService()
    project_service = ProjectService()

    sprint = await sprint_service.get_by_id(sprint_id)
    if not sprint:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sprint not found",
        )

    project = await project_service.get_by_id(sprint.project_id)
    if not await check_user_project_access(current_user, sprint.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    sprint = await sprint_service.update(sprint, sprint_in)
    response = SprintResponse.model_validate(sprint, from_attributes=True)
    await broadcast_sprint_event(project.team_id, "updated", response.model_dump(mode="json"))
    return response


@router.post("/{sprint_id}/close", response_model=SprintResponse)
async def close_sprint(sprint_id: str, current_user: CurrentUser):
    """Close the current sprint.

    If the project has rituals configured, the sprint enters limbo.
    Rituals must be attested before the next sprint activates.

    If no rituals, immediately rotates to next sprint.
    """
    sprint_service = SprintService()
    project_service = ProjectService()
    ritual_service = RitualService()

    sprint = await sprint_service.get_by_id(sprint_id)
    if not sprint:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sprint not found",
        )

    project = await project_service.get_by_id(sprint.project_id)
    if not await check_user_project_access(current_user, sprint.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    if sprint.status != SprintStatus.ACTIVE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can only close an active sprint",
        )

    if sprint.limbo:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Sprint is already in limbo. Complete pending rituals first, or use force-clear-limbo.",
        )

    # Check if project has rituals
    rituals = await ritual_service.list_by_project(project.id)
    has_rituals = len(rituals) > 0

    sprint = await sprint_service.close_sprint(sprint, has_rituals=has_rituals)
    response = SprintResponse.model_validate(sprint, from_attributes=True)
    await broadcast_sprint_event(project.team_id, "closed", response.model_dump(mode="json"))
    return response


@router.get("/{sprint_id}/transactions", response_model=list[BudgetTransactionResponse])
async def list_transactions(
    sprint_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
):
    """List budget transactions for a sprint.

    Returns the audit trail of effort spent against this sprint.
    Transactions are created when issues are marked as done.
    """
    sprint_service = SprintService()
    project_service = ProjectService()

    sprint = await sprint_service.get_by_id(sprint_id)
    if not sprint:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sprint not found",
        )

    project = await project_service.get_by_id(sprint.project_id)
    if not await check_user_project_access(current_user, sprint.project_id, project.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    transactions = await OxydeBudgetTransaction.objects.filter(
        sprint_id=sprint_id
    ).order_by("-created_at").offset(skip).limit(limit).all()
    return transactions
