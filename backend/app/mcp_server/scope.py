"""Team/project/assignee/sprint resolution for the remote MCP transport.

The stdio server (cli/src/cli/mcp_server.py) leans on the CLI's local
profile (CHAOTIC_PROFILE config.json: current team, current project) to
fill in what a tool call didn't say explicitly. This server has no
profile -- only an API key. CHT-1266's scoping call: an API key belongs to
a user, and tools resolve context from *that user's* memberships,
mirroring the exact access rules ``app.api.deps`` already enforces for
every other authenticated endpoint:

* Team-wide tools (``activity_recent``, ``issue_list``/``doc_list`` with
  ``all_projects=true``) mirror ``check_user_team_access``: a human must
  be a team member; an agent must be team-scoped (``agent_team_id``) --
  a *project*-scoped agent has no team-wide access via REST either, so it
  gets none here.
* Project-scoped tools mirror ``check_user_project_access``: a
  project-scoped agent defaults to (and is confined to) its own project;
  everyone else resolves within an accessible team.
* Defaults: exactly one accessible team/project -> use it silently (the
  common single-team-single-project case this ships for). More than one
  -> the tool call must pass `team`/`project` explicitly, and the error
  message lists the options so the model can self-correct.

None of this exists for the stdio server because the CLI's `--project`/
`chaotic project use` already do it client-side against a single active
profile; this is new, backend-only plumbing, not duplicated logic.
"""
from __future__ import annotations

from app.oxyde_models.user import OxydeUser as User
from app.services.project_service import ProjectService
from app.services.team_service import TeamService
from app.services.user_service import UserService


class ToolContextError(Exception):
    """Raised by every resolver below -- caught at the tool boundary
    (tools.py's ``_boundary``) and reported as ``{"error": ...}``, same
    contract as the stdio server's ``ToolInputError``.
    """


def _match(items, value: str, *, key_attr: str = "key"):
    """Match `value` against `items` by id, then key (case-insensitive),
    then name (case-insensitive). `items` must have `.id`, `.name`, and
    (except for users) `key_attr`.
    """
    for item in items:
        if item.id == value:
            return item
    lowered = value.strip().lower()
    for item in items:
        key = getattr(item, key_attr, None)
        if key and key.lower() == lowered:
            return item
    for item in items:
        if item.name.lower() == lowered:
            return item
    return None


async def resolve_team(user: User, team: str | None) -> str:
    """Resolve a team-wide scope. See module docstring for the rules."""
    if user.is_agent:
        if not user.agent_team_id:
            raise ToolContextError(
                "This API key is scoped to a single project, not a team -- "
                "team-wide tools (activity_recent, all_projects=true) aren't "
                "available for it. Pass `project` instead, or use a "
                "team-scoped or human API key."
            )
        if team:
            this_team = await TeamService().get_by_id(user.agent_team_id)
            if not this_team or not _match([this_team], team):
                raise ToolContextError(
                    f"This API key is scoped to team '{this_team.name if this_team else user.agent_team_id}'; "
                    f"'{team}' is not accessible to it."
                )
        return user.agent_team_id

    teams = await TeamService().get_user_teams(user.id)
    if not teams:
        raise ToolContextError("This API key's user has no accessible team.")
    if team:
        match = _match(teams, team)
        if not match:
            options = ", ".join(f"{t.name} ({t.key})" for t in teams)
            raise ToolContextError(f"Team '{team}' not found or not accessible. Accessible teams: {options}.")
        return match.id
    if len(teams) == 1:
        return teams[0].id
    options = ", ".join(f"{t.name} ({t.key})" for t in teams)
    raise ToolContextError(
        f"This API key's user belongs to multiple teams ({options}); pass `team` to disambiguate."
    )


async def resolve_project(user: User, project: str | None, team: str | None = None) -> tuple[str, str]:
    """Resolve a project-scoped scope. Returns (project_id, team_id)."""
    if user.is_agent and user.agent_project_id:
        this_project = await ProjectService().get_by_id(user.agent_project_id)
        if not this_project:
            raise ToolContextError("This API key's scoped project no longer exists.")
        if project and not _match([this_project], project):
            raise ToolContextError(
                f"This API key is scoped to project '{this_project.name}' ({this_project.key}); "
                f"'{project}' is not accessible to it."
            )
        return this_project.id, this_project.team_id

    team_id = await resolve_team(user, team)
    projects = await ProjectService().list_by_team(team_id, limit=1000)
    if not projects:
        raise ToolContextError("This team has no projects yet.")
    if project:
        match = _match(projects, project)
        if not match:
            options = ", ".join(f"{p.name} ({p.key})" for p in projects)
            raise ToolContextError(f"Project '{project}' not found in this team. Available: {options}.")
        return match.id, team_id
    if len(projects) == 1:
        return projects[0].id, team_id
    options = ", ".join(f"{p.name} ({p.key})" for p in projects)
    raise ToolContextError(
        f"This team has multiple projects ({options}); pass `project` to disambiguate."
    )


async def resolve_sprint(project_id: str, sprint: str) -> str:
    """Resolve a sprint reference within a project: 'current', 'next', an
    id, or a name (case-insensitive) -- mirrors the CLI's
    ``resolve_sprint_id`` semantics closely enough for tool parity without
    importing the CLI package (see mcp_server/tools.py module docstring).
    """
    from app.services.sprint_service import SprintService

    sprint_service = SprintService()
    lowered = sprint.strip().lower()
    if lowered == "current":
        found = await sprint_service.get_current_sprint(project_id)
        if not found:
            raise ToolContextError("No current sprint for this project.")
        return found.id
    if lowered == "next":
        found = await sprint_service.get_next_sprint(project_id)
        if not found:
            raise ToolContextError("No next sprint for this project.")
        return found.id

    by_id = await sprint_service.get_by_id(sprint)
    if by_id and by_id.project_id == project_id:
        return by_id.id

    sprints = await sprint_service.list_by_project(project_id, limit=1000)
    for s in sprints:
        if s.name.lower() == lowered:
            return s.id
    raise ToolContextError(f"Sprint '{sprint}' not found in this project.")


async def resolve_assignee(user: User, team_id: str, assignee: str) -> str | None:
    """Resolve an assignee reference: 'me', 'unassigned' (-> None), a raw
    user/agent id, an email, or a team member's display name
    (case-insensitive).
    """
    lowered = assignee.strip().lower()
    if lowered == "me":
        return user.id
    if lowered == "unassigned":
        return None

    candidate = await UserService().get_by_id(assignee)
    if candidate:
        return candidate.id

    if "@" in assignee:
        candidate = await UserService().get_by_email(assignee)
        if candidate:
            return candidate.id

    members = await TeamService().get_members(team_id)
    for member in members:
        if member.user and member.user.name.lower() == lowered:
            return member.user_id

    raise ToolContextError(f"Could not resolve assignee '{assignee}' to a user on this team.")
