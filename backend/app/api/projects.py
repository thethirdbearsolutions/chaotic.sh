"""Project API routes."""
from fastapi import APIRouter, HTTPException, status
from app.api.deps import CurrentUser, check_user_team_access, check_user_project_access
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.services.project_service import ProjectService
from app.services.team_service import TeamService

router = APIRouter()


@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(
    team_id: str,
    project_in: ProjectCreate,
    current_user: CurrentUser,
):
    """Create a new project."""
    project_service = ProjectService()

    if not await check_user_team_access(current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    existing_project = await project_service.get_by_key(team_id, project_in.key)
    if existing_project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project key already exists in this team",
        )

    project = await project_service.create(project_in, team_id)
    return project


@router.get("", response_model=list[ProjectResponse])
async def list_projects(
    team_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
):
    """List projects for a team."""
    project_service = ProjectService()

    if not await check_user_team_access(current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    projects = await project_service.list_by_team(team_id, skip, limit)
    return projects


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: str, current_user: CurrentUser):
    """Get project by ID."""
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

    return project


@router.patch("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: str,
    project_in: ProjectUpdate,
    current_user: CurrentUser,
):
    """Update a project."""
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

    project = await project_service.update(project, project_in)
    return project


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: str, current_user: CurrentUser):
    """Delete a project."""
    project_service = ProjectService()
    team_service = TeamService()

    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can delete projects",
        )

    await project_service.delete(project)
