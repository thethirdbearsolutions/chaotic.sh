"""Path-nested scope-ID routes for create/list endpoints (CHT-1223).

BREAKING CHANGE, sanctioned: this product has ~zero users besides its
own operator, so wire back-compat wasn't prioritized here -- the old
query-param create/list routes for these six resources are gone, not
kept as a compat shim.

Nine of ten resource-scoped create/list endpoints used to put the
parent scope ID in the query string on a flat "" route (e.g.
``POST /api/issues?project_id=X``), splitting the entity across two
request locations for creates. ``agents.py`` was the one exception,
nesting the parent ID in the URL path (``POST /api/teams/{team_id}/agents``)
-- the more conventional REST shape, and the one that keeps the whole
entity payload in the body. This module makes that the sole
convention for the resources named in the taste-pass finding
(projects/labels/documents under a team; issues/sprints/rituals under
a project).

The route handlers below call straight through to the (now undecorated,
no longer independently routed) functions still defined in
projects.py/labels.py/documents.py/sprints.py/rituals.py/issues.py --
those modules remain the natural home for each resource's business
logic (alongside get/update/delete, which keep their existing
``/projects/{project_id}``-style paths unchanged), this module just
owns the URL shape for create/list.

CLI (cli/src/cli/client.py) and frontend (frontend/src/api.js) were
updated in the same PR to call these paths; e2e tests exercise them
through the CLI's Client, so a stale caller would show up as e2e
failures.

``GET /issues`` has no path-nested route here on purpose: it has ~20
query params (status/priority/label filters, sort, exclude-filters,
etc.) that evolve independently of this module, plus multiple
*alternative* scope filters (project_id/team_id/sprint_id/assignee_id)
that don't map onto a single path shape. A hand-duplicated signature
would silently drift out of sync the next time a filter is added there.
It keeps its original query-param route in issues.py, unchanged. The
``POST /projects/{project_id}/issues`` create route (the actual
one-entity-per-request scenario the finding calls out) is still here.

Ritual *groups* (``rituals.py``'s ``/groups`` sub-resource) and
``GET /sprints/current`` also keep their existing ``?project_id=``
query-param shape -- out of the finding's named surface, left alone to
bound this change's blast radius.

CHT-1245 added ``GET /projects/{project_id}/issues/ready`` and
``GET /teams/{team_id}/issues/ready`` below -- a brand new endpoint, so
it's path-nested from the start rather than getting a flat query-param
route first and migrating later.
"""
from fastapi import APIRouter, status

from app.api.deps import CurrentUser
from app.schemas.project import ProjectCreate, ProjectResponse
from app.schemas.issue import IssueCreate, IssueResponse, LabelCreate, LabelResponse
from app.schemas.document import DocumentCreate, DocumentResponse
from app.schemas.sprint import SprintCreate, SprintResponse
from app.enums import SprintStatus
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
    """Create a project (CHT-1223). Replaces ``POST /projects?team_id=...``."""
    return await _projects.create_project(team_id=team_id, project_in=project_in, current_user=current_user)


@router.get("/teams/{team_id}/projects", response_model=list[ProjectResponse])
async def list_team_projects(team_id: str, current_user: CurrentUser, skip: int = 0, limit: int = 100):
    """List a team's projects (CHT-1223). Replaces ``GET /projects?team_id=...``."""
    return await _projects.list_projects(team_id=team_id, current_user=current_user, skip=skip, limit=limit)


@router.post("/teams/{team_id}/labels", response_model=LabelResponse, status_code=status.HTTP_201_CREATED)
async def create_team_label(team_id: str, label_in: LabelCreate, current_user: CurrentUser):
    """Create a label (CHT-1223). Replaces ``POST /labels?team_id=...``."""
    return await _labels.create_label(team_id=team_id, label_in=label_in, current_user=current_user)


@router.get("/teams/{team_id}/labels", response_model=list[LabelResponse])
async def list_team_labels(team_id: str, current_user: CurrentUser, skip: int = 0, limit: int = 100):
    """List a team's labels (CHT-1223). Replaces ``GET /labels?team_id=...``."""
    return await _labels.list_labels(team_id=team_id, current_user=current_user, skip=skip, limit=limit)


@router.post("/teams/{team_id}/documents", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
async def create_team_document(team_id: str, document_in: DocumentCreate, current_user: CurrentUser):
    """Create a document (CHT-1223). Replaces ``POST /documents?team_id=...``."""
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
    """List a team's documents (CHT-1223). Replaces ``GET /documents?team_id=...``.

    project_id/sprint_id/search/skip/limit remain query filters -- only
    the mandatory team scope moved to the path.
    """
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
    """Create an issue (CHT-1223). Replaces ``POST /issues?project_id=...``.

    This is the exact scenario the taste-pass finding named: creating an
    issue used to split the entity across a query param (project_id)
    and the body (everything else). No ``GET`` route here -- see module
    docstring; ``GET /issues`` keeps its original query-param shape.
    """
    return await _issues.create_issue(project_id=project_id, issue_in=issue_in, current_user=current_user)


@router.get("/projects/{project_id}/issues/ready", response_model=list[IssueResponse])
async def list_project_ready_issues(
    project_id: str,
    current_user: CurrentUser,
    mine: bool = False,
    include_assigned: bool = False,
    limit: int = 50,
):
    """What can I start right now, project-scoped (CHT-1245). New
    endpoint, path-nested from the start per CHT-1223's convention --
    see module docstring."""
    return await _issues.list_ready_issues(
        current_user, project_id=project_id,
        mine=mine, include_assigned=include_assigned, limit=limit,
    )


@router.get("/teams/{team_id}/issues/ready", response_model=list[IssueResponse])
async def list_team_ready_issues(
    team_id: str,
    current_user: CurrentUser,
    mine: bool = False,
    include_assigned: bool = False,
    limit: int = 50,
):
    """What can I start right now, team-wide -- ``--all-projects`` (CHT-1245)."""
    return await _issues.list_ready_issues(
        current_user, team_id=team_id,
        mine=mine, include_assigned=include_assigned, limit=limit,
    )


@router.post("/projects/{project_id}/sprints", response_model=SprintResponse, status_code=status.HTTP_200_OK)
async def create_project_sprint(
    project_id: str,
    current_user: CurrentUser,
    sprint_in: SprintCreate | None = None,
):
    """Create/return-current sprint (CHT-1223). Replaces ``POST /sprints?project_id=...``."""
    return await _sprints.create_sprint(project_id=project_id, current_user=current_user, sprint_in=sprint_in)


@router.get("/projects/{project_id}/sprints", response_model=list[SprintResponse])
async def list_project_sprints(
    project_id: str,
    current_user: CurrentUser,
    sprint_status: SprintStatus | None = None,
    skip: int = 0,
    limit: int = 100,
):
    """List a project's sprints (CHT-1223). Replaces ``GET /sprints?project_id=...``.

    ``sprint_status`` filters by status (e.g. ``active``); dropping it silently
    made callers like ``chaotic sprint transactions`` (no-arg) resolve the wrong
    sprint (CHT-1295).
    """
    return await _sprints.list_sprints(
        project_id=project_id, current_user=current_user,
        sprint_status=sprint_status, skip=skip, limit=limit,
    )


@router.post("/projects/{project_id}/rituals", response_model=RitualResponse, status_code=status.HTTP_201_CREATED)
async def create_project_ritual(project_id: str, ritual_in: RitualCreate, current_user: CurrentUser):
    """Create a ritual (CHT-1223). Replaces ``POST /rituals?project_id=...``."""
    return await _rituals.create_ritual(project_id=project_id, ritual_in=ritual_in, current_user=current_user)


@router.get("/projects/{project_id}/rituals", response_model=list[RitualResponse])
async def list_project_rituals(
    project_id: str,
    current_user: CurrentUser,
    include_inactive: bool = False,
    skip: int = 0,
    limit: int = 1000,
):
    """List a project's rituals (CHT-1223). Replaces ``GET /rituals?project_id=...``."""
    return await _rituals.list_rituals(
        project_id=project_id,
        current_user=current_user,
        include_inactive=include_inactive,
        skip=skip,
        limit=limit,
    )
