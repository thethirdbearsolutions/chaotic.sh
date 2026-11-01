"""Project API routes."""
from fastapi import APIRouter, HTTPException, status
from app.auth.access import reads, writes
from app.api.deps import (
    CurrentUser, is_in_team_directory, can_read_team_data,
    is_eligible_project_member, is_project_scoped_agent, refuse_agent_lifting_gates,
)
from app.api.visibility import team_hidden, visible_project
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.services.project_service import GATE_SETTINGS, ProjectChangedError, ProjectService
from app.services.team_service import TeamService
from app.websocket import broadcast_project_event

router = APIRouter()


async def _validate_lead(
    lead_id: str | None, team_id: str, project_id: str | None, current_lead_id: str | None = None,
) -> None:
    """A project's lead must be eligible for work in it, by the same rule
    as an issue's assignee (``is_eligible_project_member``, CHT-1830): an
    active member of its team, or an active agent of that team or of this
    project. On create there is no project yet (``project_id`` None), so
    no project-scoped agent qualifies. Until CHT-1819 the id was stored
    unchecked: a user of another team was accepted, and a missing id (or
    an empty string) failed the users foreign key with a 500. Every
    refusal, a deactivated account's included, is now the same 400 that
    names nobody (CHT-1785). Null clears the lead. On an update,
    re-sending the project's current lead unchanged is not a new choice
    and passes even if that person has since left the team or been
    deactivated, as for an issue's assignee: it names someone the caller
    can already read off the project. A create has no current lead, so
    every lead it names is checked."""
    if lead_id is None or (current_lead_id is not None and lead_id == current_lead_id):
        return
    from app.oxyde_models.user import OxydeUser

    lead = await OxydeUser.objects.get_or_none(id=lead_id)
    if not await is_eligible_project_member(lead, team_id, project_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Lead not found")


async def _validate_default_epic(epic_id: str | None, project_id: str, current_epic_id: str | None) -> None:
    """A project's default epic (CHT-1900) must be an open epic in that
    project. Null clears it, and re-sending the current value passes
    unchecked (the web Rules save resends every setting), as for the
    lead. One 400 for every refusal, so it says nothing about a row in a
    project the caller may not see (CHT-1785)."""
    if epic_id is None or epic_id == current_epic_id:
        return
    from app.enums import IssueStatus, IssueType
    from app.oxyde_models.issue import OxydeIssue

    epic = await OxydeIssue.objects.get_or_none(id=epic_id)
    if (
        epic is None
        or epic.project_id != project_id
        or epic.issue_type != IssueType.EPIC
        or epic.status in (IssueStatus.DONE, IssueStatus.CANCELED)
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Default epic must be an open epic in this project",
        )


@writes
async def create_project(
    team_id: str,
    project_in: ProjectCreate,
    current_user: CurrentUser,
) -> ProjectResponse:
    """Create a new project.

    Not directly routed here (CHT-1223): the canonical route is the
    path-nested ``POST /teams/{team_id}/projects`` in nested.py, which
    calls this function directly. Kept in this module (rather than
    inlined in nested.py) since it's the natural home for project
    business logic, alongside get/update/delete below.
    """
    project_service = ProjectService()

    if not await can_read_team_data(current_user, team_id):
        raise team_hidden()

    existing_project = await project_service.get_by_key(team_id, project_in.key)
    if existing_project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Project key already exists in this team",
        )
    await _validate_lead(project_in.lead_id, team_id, None)

    project = await project_service.create(project_in, team_id)
    response = ProjectResponse.model_validate(project, from_attributes=True)
    await broadcast_project_event(team_id, "created", response.model_dump(mode="json"), project_id=project.id)
    return response


@reads
async def list_projects(
    team_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
) -> list[ProjectResponse]:
    """List projects for a team.

    Not directly routed here (CHT-1223): canonical route is the
    path-nested ``GET /teams/{team_id}/projects`` in nested.py.
    """
    project_service = ProjectService()

    if is_project_scoped_agent(current_user):
        # A project-scoped agent sees its team's project list confined to
        # its own project, so a key or name resolves the way it does for
        # everyone else (CHT-1780).
        if not await is_in_team_directory(current_user, team_id):
            raise team_hidden()
        own = await project_service.get_by_id(current_user.agent_project_id)
        confined = [own] if own and own.team_id == team_id else []
        return [ProjectResponse.model_validate(project) for project in confined[skip:skip + limit]]

    if not await can_read_team_data(current_user, team_id):
        raise team_hidden()

    projects = await project_service.list_by_team(team_id, skip, limit)
    return [ProjectResponse.model_validate(project) for project in projects]


@router.get("/{project_id}", response_model=ProjectResponse)
@reads
async def get_project(project_id: str, current_user: CurrentUser) -> ProjectResponse:
    """Get project by ID."""

    # A project the caller cannot see answers like a missing one (CHT-1785).
    project = await visible_project(current_user, project_id)

    return ProjectResponse.model_validate(project)


def _lifted_by_update(project, project_in: ProjectUpdate) -> list[str]:
    return [
        name for name in GATE_SETTINGS
        if name in project_in.model_fields_set
        and getattr(project_in, name) is False
        and getattr(project, name)
    ]


def _agent_expect(project, project_in: ProjectUpdate) -> dict:
    """What an agent's write is conditional on (CHT-1926): the values its
    gate check decided on, so a person tightening one meanwhile wins.

    Only what the request could loosen is pinned: a gate it sets to
    False (off when read, or the check would have refused it; pinned
    still, since a person may turn it on meanwhile). A setting the request leaves alone cannot
    be loosened by it, and pinning it would turn an unrelated edit into
    a 409 whenever a person changes that setting (PR #487 review 3).
    """
    sent = project_in.model_fields_set
    expect = {
        name: getattr(project, name) for name in GATE_SETTINGS
        if name in sent and getattr(project_in, name) is False
    }
    return expect


@router.patch("/{project_id}", response_model=ProjectResponse)
@writes
async def update_project(
    project_id: str,
    project_in: ProjectUpdate,
    current_user: CurrentUser,
):
    """Update a project."""
    project_service = ProjectService()

    # A project the caller cannot see answers like a missing one (CHT-1785).
    project = await visible_project(current_user, project_id)
    refuse_agent_lifting_gates(current_user, _lifted_by_update(project, project_in))
    await _validate_lead(project_in.lead_id, project.team_id, project.id, project.lead_id)
    await _validate_default_epic(project_in.default_epic_id, project.id, project.default_epic_id)

    expect = _agent_expect(project, project_in) if current_user.is_agent else None
    try:
        project = await project_service.update(project, project_in, expect=expect)
    except ProjectChangedError as e:
        # A project deleted meanwhile answers like any missing one
        # (CHT-1785), not as a conflict.
        await visible_project(current_user, project_id)
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))
    response = ProjectResponse.model_validate(project, from_attributes=True)
    await broadcast_project_event(project.team_id, "updated", response.model_dump(mode="json"), project_id=project.id)
    return response


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def delete_project(project_id: str, current_user: CurrentUser):
    """Delete a project."""
    project_service = ProjectService()
    team_service = TeamService()

    # Visible first (else 404, as if missing), then the admin rule (403).
    project = await visible_project(current_user, project_id)

    if not await team_service.is_team_admin(project.team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can delete projects",
        )

    team_id = project.team_id
    project_data = {"id": project.id, "name": project.name, "key": project.key}
    await project_service.delete(project, actor_id=current_user.id)
    await broadcast_project_event(team_id, "deleted", project_data, project_id=project.id)
