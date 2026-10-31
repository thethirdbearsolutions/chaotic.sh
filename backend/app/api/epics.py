"""Epic progress (CHT-1902). Not routed here: the routes are
``GET /projects/{project_id}/epics`` and ``GET /teams/{team_id}/epics``
in nested.py."""
from app.api.deps import CurrentUser
from app.api.issues import _check_list_scope
from app.auth.access import reads
from app.oxyde_models.project import OxydeProject
from app.schemas.epic import EpicProgressResponse
from app.services.epic_progress import DEFAULT_SPRINT_WINDOW, epic_progress


@reads
async def list_epic_progress(
    current_user: CurrentUser,
    project_id: str | None = None,
    team_id: str | None = None,
    sprint_window: int = DEFAULT_SPRINT_WINDOW,
) -> EpicProgressResponse:
    """Every epic in a project, or across a team, with progress toward it:
    counts and points by status, what the current sprint closed toward it,
    and a tick per recent sprint; plus each project's work under no epic.
    Scope and access are the issue list's: a project the caller cannot
    see answers 404, a team 403 (``_check_list_scope``)."""
    scope_team_id = await _check_list_scope(current_user, project_id=project_id, team_id=team_id)
    if project_id:
        project_ids = [project_id]
    else:
        project_ids = [p.id for p in await OxydeProject.objects.filter(team_id=scope_team_id).all()]
    return await epic_progress(project_ids, sprint_window=sprint_window)
