"""API routes."""
from fastapi import APIRouter
from app.api import auth, users, teams, projects, issues, sprints, documents, labels, api_keys, rituals, agents, nested, inbox, templates

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(teams.router, prefix="/teams", tags=["teams"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(issues.router, prefix="/issues", tags=["issues"])
api_router.include_router(sprints.router, prefix="/sprints", tags=["sprints"])
api_router.include_router(rituals.router, prefix="/rituals", tags=["rituals"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
api_router.include_router(labels.router, prefix="/labels", tags=["labels"])
api_router.include_router(api_keys.router, prefix="/api-keys", tags=["api-keys"])
api_router.include_router(agents.router, tags=["agents"])
# Path-nested from the start (CHT-1259), same shape as agents.py:
# /teams/{team_id}/templates + /templates/{template_id}.
api_router.include_router(templates.router, tags=["templates"])
api_router.include_router(inbox.router, prefix="/inbox", tags=["inbox"])
# Path-nested aliases (CHT-1223) for the query-param routes above --
# same handlers, different URL shape. See nested.py's module docstring.
api_router.include_router(nested.router, tags=["nested-aliases"])
