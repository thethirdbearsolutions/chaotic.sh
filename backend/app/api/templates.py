"""Template API routes (CHT-1259).

Path-nested from the start per CHT-1223's convention (same shape as
agents.py): team-scoped create/list live at ``/teams/{team_id}/templates``,
entity routes at ``/templates/{template_id}``. Registered without a
prefix in app/api/__init__.py.

Permissions mirror rituals: reads need team membership, writes (create,
delete, apply) need team admin -- apply creates/updates rituals, which
is admin-only everywhere else.
"""
from fastapi import APIRouter, HTTPException, status

from app.api.deps import CurrentUser, check_user_team_access
from app.schemas.template import (
    TemplateApplyReport,
    TemplateApplyRequest,
    TemplateCreate,
    TemplateResponse,
    TemplateSnapshotRequest,
)
from app.services.project_service import ProjectService
from app.services.team_service import TeamService
from app.services.template_service import TemplateService

router = APIRouter()


async def _require_team_admin(team_id: str, current_user) -> None:
    if not await TeamService().is_team_admin(team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can manage templates",
        )


async def _get_template_or_404(template_id: str):
    template = await TemplateService().get_by_id(template_id)
    if not template:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Template not found",
        )
    return template


@router.post(
    "/teams/{team_id}/templates",
    response_model=TemplateResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_template(
    team_id: str,
    template_in: TemplateCreate,
    current_user: CurrentUser,
):
    """Create a template from an explicit body (the import path)."""
    await _require_team_admin(team_id, current_user)
    try:
        return await TemplateService().create(template_in, team_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post(
    "/teams/{team_id}/templates/from-project",
    response_model=TemplateResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_template_from_project(
    team_id: str,
    snapshot_in: TemplateSnapshotRequest,
    current_user: CurrentUser,
):
    """Create a template by snapshotting a project's rituals + settings."""
    await _require_team_admin(team_id, current_user)

    project = await ProjectService().get_by_id(snapshot_in.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )
    if project.team_id != team_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project belongs to a different team",
        )

    service = TemplateService()
    template_in = await service.snapshot_project(
        snapshot_in.name, project, description=snapshot_in.description
    )
    try:
        return await service.create(template_in, team_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("/teams/{team_id}/templates", response_model=list[TemplateResponse])
async def list_templates(team_id: str, current_user: CurrentUser):
    """List a team's templates."""
    if not await check_user_team_access(current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )
    return await TemplateService().list_by_team(team_id)


@router.get("/templates/{template_id}", response_model=TemplateResponse)
async def get_template(template_id: str, current_user: CurrentUser):
    """Get a template by ID."""
    template = await _get_template_or_404(template_id)
    if not await check_user_team_access(current_user, template.team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )
    return template


@router.delete("/templates/{template_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_template(template_id: str, current_user: CurrentUser):
    """Delete a template. Projects it was applied to are untouched."""
    template = await _get_template_or_404(template_id)
    await _require_team_admin(template.team_id, current_user)
    await TemplateService().delete(template)


@router.post("/templates/{template_id}/apply", response_model=TemplateApplyReport)
async def apply_template(
    template_id: str,
    apply_in: TemplateApplyRequest,
    current_user: CurrentUser,
):
    """Apply a template to a project (idempotent; see TemplateService.apply).

    ``dry_run=true`` computes the change report without writing -- the
    CLI uses it to drive per-ritual confirmation prompts.
    """
    template = await _get_template_or_404(template_id)
    await _require_team_admin(template.team_id, current_user)

    project = await ProjectService().get_by_id(apply_in.project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )
    if project.team_id != template.team_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project belongs to a different team",
        )

    try:
        return await TemplateService().apply(
            template,
            project,
            update_rituals=apply_in.update_rituals,
            update_all=apply_in.update_all,
            dry_run=apply_in.dry_run,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
