"""Path-nested alias routes for scoped create/list endpoints (CHT-1223).

Nine of ten resource-scoped create/list endpoints put the parent scope
ID in the query string on a flat "" route (e.g. ``POST /api/issues?project_id=X``),
splitting the entity across two request locations for creates.
``agents.py`` is the one exception, nesting the parent ID in the URL
path (``POST /api/teams/{team_id}/agents``) -- the more conventional
REST shape, and the one that keeps the whole entity payload in the
body.

Rather than force every existing client to migrate to one style (a
breaking change), this module adds path-nested aliases that mirror
agents.py for the resources named in the taste-pass finding
(projects/labels/documents under a team; issues/sprints/rituals under
a project) while leaving every existing query-param route working
unchanged. Each alias is a thin wrapper delegating straight to the same
handler function the query-param route uses, so behavior (auth checks,
service calls, broadcasts, response shape) is identical -- only the
URL shape differs. The query-param style remains the sanctioned,
documented convention for new endpoints (see each `*_service` route
module); these aliases exist for ergonomics and agents.py-parity.

``GET /issues`` has no path-nested alias here on purpose: it has ~20
query params (status/priority/label filters, sort, exclude-filters,
etc.) that evolve independently of this module. A hand-duplicated
signature would silently drift out of sync the next time a filter is
added there -- the "pattern-establishing chapter" risk of a
copy-pasted-but-incomplete alias being worse than no alias. The
``POST /projects/{project_id}/issues`` create alias (the actual
one-entity-per-request scenario the finding calls out) is still added
below.
"""
from fastapi import APIRouter, status

from app.api.deps import CurrentUser
from app.schemas.project import ProjectCreate, ProjectResponse
from app.schemas.issue import IssueCreate, IssueResponse, LabelCreate, LabelResponse
from app.schemas.document import DocumentCreate, DocumentResponse
from app.schemas.sprint import SprintCreate, SprintResponse
from app.schemas.ritual import RitualCreate, RitualResponse

from app.api import projects as _projects
from app.api import labels as _labels
from app.api import documents as _documents
from app.api import issues as _issues
from app.api import sprints as _sprints
from app.api import rituals as _rituals

router = APIRouter()


# ============================================================================
# Team-scoped: /teams/{team_id}/{projects,labels,documents}
# ============================================================================


@router.post("/teams/{team_id}/projects", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_team_project(team_id: str, project_in: ProjectCreate, current_user: CurrentUser):
    """Path-nested alias for ``POST /projects?team_id=...`` (CHT-1223)."""
    return await _projects.create_project(team_id=team_id, project_in=project_in, current_user=current_user)


@router.get("/teams/{team_id}/projects", response_model=list[ProjectResponse])
async def list_team_projects(team_id: str, current_user: CurrentUser, skip: int = 0, limit: int = 100):
    """Path-nested alias for ``GET /projects?team_id=...`` (CHT-1223)."""
    return await _projects.list_projects(team_id=team_id, current_user=current_user, skip=skip, limit=limit)


@router.post("/teams/{team_id}/labels", response_model=LabelResponse, status_code=status.HTTP_201_CREATED)
async def create_team_label(team_id: str, label_in: LabelCreate, current_user: CurrentUser):
    """Path-nested alias for ``POST /labels?team_id=...`` (CHT-1223)."""
    return await _labels.create_label(team_id=team_id, label_in=label_in, current_user=current_user)


@router.get("/teams/{team_id}/labels", response_model=list[LabelResponse])
async def list_team_labels(team_id: str, current_user: CurrentUser, skip: int = 0, limit: int = 100):
    """Path-nested alias for ``GET /labels?team_id=...`` (CHT-1223)."""
    return await _labels.list_labels(team_id=team_id, current_user=current_user, skip=skip, limit=limit)


@router.post("/teams/{team_id}/documents", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
async def create_team_document(team_id: str, document_in: DocumentCreate, current_user: CurrentUser):
    """Path-nested alias for ``POST /documents?team_id=...`` (CHT-1223)."""
    return await _documents.create_document(team_id=team_id, document_in=document_in, current_user=current_user)


@router.get("/teams/{team_id}/documents", response_model=list[DocumentResponse])
async def list_team_documents(
    team_id: str,
    current_user: CurrentUser,
    project_id: str | None = None,
    sprint_id: str | None = None,
    search: str | None = None,
    skip: int = 0,
    limit: int = 100,
):
    """Path-nested alias for ``GET /documents?team_id=...`` (CHT-1223)."""
    return await _documents.list_documents(
        team_id=team_id,
        current_user=current_user,
        project_id=project_id,
        sprint_id=sprint_id,
        search=search,
        skip=skip,
        limit=limit,
    )


# ============================================================================
# Project-scoped: /projects/{project_id}/{issues,sprints,rituals}
# ============================================================================


@router.post("/projects/{project_id}/issues", response_model=IssueResponse, status_code=status.HTTP_201_CREATED)
async def create_project_issue(project_id: str, issue_in: IssueCreate, current_user: CurrentUser):
    """Path-nested alias for ``POST /issues?project_id=...`` (CHT-1223).

    This is the exact scenario the taste-pass finding named: creating an
    issue currently splits the entity across a query param (project_id)
    and the body (everything else). No ``GET`` alias here -- see module
    docstring.
    """
    return await _issues.create_issue(project_id=project_id, issue_in=issue_in, current_user=current_user)


@router.post("/projects/{project_id}/sprints", response_model=SprintResponse, status_code=status.HTTP_200_OK)
async def create_project_sprint(
    project_id: str,
    current_user: CurrentUser,
    sprint_in: SprintCreate | None = None,
):
    """Path-nested alias for ``POST /sprints?project_id=...`` (CHT-1223)."""
    return await _sprints.create_sprint(project_id=project_id, current_user=current_user, sprint_in=sprint_in)


@router.get("/projects/{project_id}/sprints", response_model=list[SprintResponse])
async def list_project_sprints(
    project_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
):
    """Path-nested alias for ``GET /sprints?project_id=...`` (CHT-1223)."""
    return await _sprints.list_sprints(project_id=project_id, current_user=current_user, skip=skip, limit=limit)


@router.post("/projects/{project_id}/rituals", response_model=RitualResponse, status_code=status.HTTP_201_CREATED)
async def create_project_ritual(project_id: str, ritual_in: RitualCreate, current_user: CurrentUser):
    """Path-nested alias for ``POST /rituals?project_id=...`` (CHT-1223)."""
    return await _rituals.create_ritual(project_id=project_id, ritual_in=ritual_in, current_user=current_user)


@router.get("/projects/{project_id}/rituals", response_model=list[RitualResponse])
async def list_project_rituals(
    project_id: str,
    current_user: CurrentUser,
    include_inactive: bool = False,
    skip: int = 0,
    limit: int = 1000,
):
    """Path-nested alias for ``GET /rituals?project_id=...`` (CHT-1223)."""
    return await _rituals.list_rituals(
        project_id=project_id,
        current_user=current_user,
        include_inactive=include_inactive,
        skip=skip,
        limit=limit,
    )
