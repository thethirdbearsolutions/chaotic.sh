"""Team/project/assignee/sprint resolution for the remote MCP transport.

The stdio server (cli/src/cli/mcp_server.py) leans on the CLI's local
profile (CHAOTIC_PROFILE config.json: current team, current project) to
fill in what a tool call didn't say explicitly. This server has no
profile -- only an API key. CHT-1266's scoping call: an API key belongs to
a user, and tools resolve context from *that user's* memberships,
mirroring the exact access rules ``app.api.deps`` already enforces for
every other authenticated endpoint:

* Team-wide tools (``activity_recent`` without a project, and
  ``issue_list``/``doc_list`` with ``all_projects=true``) resolve through
  ``resolve_team``, which mirrors ``can_read_team_data``: a human
  must be a team member; an agent must be team-scoped. A *project*-scoped
  agent carries its project's team in ``agent_team_id`` too, but that is
  not team-wide access, via REST or here (CHT-1780).
* Team *directory* tools (``label_list``, ``project_list``, the inbox's
  team filter) resolve through ``resolve_member_team``, which mirrors
  ``is_in_team_directory``: a project-scoped agent gets its own team, and
  the API confines what it reads there (``project_list`` lists only its
  project).
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

from typing import Literal

from chaotic_mcp_tools import ToolInputError

from app.oxyde_models.user import OxydeUser as User
from app.utils.email_address import same_email
from app.services.issue_query import filter_principals
from app.services.mention_handles import HANDLE_RE, MentionDirectory, idle_session_ids, team_principals
from app.services.project_service import ProjectService
from app.services.team_service import TeamService, eligible_on_project_work


class ToolContextError(ToolInputError):
    """Raised by every resolver below. A subclass of the shared toolset's
    ``ToolInputError`` so the one error boundary
    (``chaotic_mcp_tools.registry.call_guarded``) reports it as
    ``error_code: tool_input`` -- these are the disambiguation prompts
    the `team`/`project` parameters exist for, not server bugs (PR #271
    review, finding 1).
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
        if user.agent_project_id or not user.agent_team_id:
            raise ToolContextError(
                "This API key is scoped to a single project, not a team -- "
                "team-wide reads (activity_recent without `project`, "
                "all_projects=true) aren't available for it. Pass `project` "
                "instead, or use a team-scoped or human API key."
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


async def resolve_member_team(user: User, team: str | None) -> str:
    """Resolve the team whose directory (labels, project list, inbox
    filter) a tool reads. As ``resolve_team``, except that a
    project-scoped agent resolves to its own project's team."""
    if user.is_agent and user.agent_project_id:
        team_id = user.agent_team_id
        if not team_id:
            # An agent with no team: one migration 0036 could not place
            # (its project or that project's team was already gone,
            # CHT-1837), or one retired when its project or team was
            # deleted (CHT-1844). Its keys are dead anyway; fail closed.
            raise ToolContextError("This API key's scoped project no longer exists.")
        if team:
            this_team = await TeamService().get_by_id(team_id)
            if not this_team or not _match([this_team], team):
                raise ToolContextError(
                    f"This API key is scoped to a project in team "
                    f"'{this_team.name if this_team else team_id}'; '{team}' is not accessible to it."
                )
        return team_id
    return await resolve_team(user, team)


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
    id, an id prefix, a bare sprint number, or a name (exact then
    substring, both case-insensitive).

    Mirrors the CLI's ``resolve_sprint_id`` (cli/src/cli/commands/shared.py)
    rather than approximating it -- this used to accept only exact names,
    so `sprint="1"` and `sprint="Sprint"` resolved on stdio and errored
    here, for the same tool and argument (CHT-1351). Ambiguity raises
    rather than silently picking one.

    ``current``/``next`` MATERIALIZE. ``ensure_sprints_exist`` is what the
    routed ``GET /sprints/current`` calls, so the stdio transport -- which
    reaches this over HTTP -- has always created a sprint on demand. Doing
    a bare read here meant every sprint tool failed on a project whose
    first sprint had never been created, while the same call over stdio
    succeeded (CHT-1351).
    """
    import re

    from app.services.sprint_service import SprintService

    sprint_service = SprintService()
    lowered = sprint.strip().lower()

    if lowered in ("current", "next"):
        current, next_sprint = await sprint_service.ensure_sprints_exist(project_id)
        found = current if lowered == "current" else next_sprint
        if not found:
            raise ToolContextError(f"No {lowered} sprint for this project.")
        return found.id

    by_id = await sprint_service.get_by_id(sprint)
    if by_id and by_id.project_id == project_id:
        return by_id.id

    sprints = await sprint_service.list_by_project(project_id, limit=1000)

    def _one(matches, kind):
        if len(matches) == 1:
            return matches[0].id
        if len(matches) > 1:
            listed = ", ".join(f"{s.name} (id={s.id})" for s in matches)
            raise ToolContextError(f"Ambiguous sprint {kind} '{sprint}'. Matches: {listed}.")
        return None

    # Bare number: "44" matches "Sprint 44" on a word boundary (CHT-892).
    if sprint.strip().isdigit():
        pattern = r"\b" + re.escape(sprint.strip()) + r"\b"
        if (hit := _one([s for s in sprints if re.search(pattern, s.name or "")], "number")):
            return hit

    if (hit := _one([s for s in sprints if (s.name or "").lower() == lowered], "name")):
        return hit
    if (hit := _one([s for s in sprints if lowered in (s.name or "").lower()], "name substring")):
        return hit
    if (hit := _one([s for s in sprints if s.id.startswith(sprint)], "id prefix")):
        return hit

    known = ", ".join(s.name for s in sprints) or "none"
    raise ToolContextError(
        f"Sprint '{sprint}' not found in this project. Sprints here: {known}."
    )


AssigneePurpose = Literal["assign", "filter"]


async def resolve_assignee(
    user: User, team_id: str, assignee: str, project_id: str | None = None,
    purpose: AssigneePurpose = "assign",
) -> str | None:
    """Resolve an assignee reference: 'me', 'unassigned' (-> None), or one
    of the team's principals by id, email, display name or handle
    (``@claude-mcp``, or the same without the ``@``) (CHT-1839).

    Who can be named depends on ``purpose``:

    * ``"assign"`` (the default): who may be *given* work here, by the
      rule the API applies to the id it is sent
      (``is_eligible_project_member``, CHT-1830): the team's active
      people and team-scoped agents, and a project-scoped agent only in
      its own project. With no ``project_id``, a project-scoped agent
      counts in its own project.
    * ``"filter"``: who a list may be *filtered* by. The same set as the
      ``where`` language's (``issue_query.filter_principals``), so the
      two agree: every member and agent of the team, deactivated ones
      included, so their history stays searchable, minus agents of a
      sibling project for a caller confined to one project. The team
      directory (``GET /teams/{id}/members``) already lists all of them
      to the same callers, so naming them discloses nothing.

    Every form of reference is looked up among those candidates alone.
    So anyone else (someone on another team, an agent of a project the
    caller cannot see, for assignment a deactivated account) and no
    account at all get the one not-found error below, which names
    nobody: the lookup cannot tell a caller which ids, addresses or names
    exist on this server (CHT-1802, CHT-1804). The candidates are loaded
    before the value is read, so no query depends on it.

    Agents are named like people (CHT-1831): "Claude MCP", ``@claude-mcp``
    and ``claude-mcp`` reach the agent. A display name or handle that
    names more than one candidate (a person and an agent both called
    "Ethan", or a first word two people share) is refused with the
    handles that tell them apart; it never picks one.
    """
    lowered = assignee.strip().lower()
    if lowered == "me":
        return user.id
    if lowered == "unassigned":
        return None

    if purpose == "filter":
        confined_to = user.agent_project_id if user.is_agent and user.agent_project_id else None
        candidates = await filter_principals(team_id, confined_to)
        idle = await idle_session_ids(candidates)
    else:
        # The members come from team_members, so a person among them is a
        # member; the rule is applied to the rows already loaded.
        users, idle = await team_principals(team_id)
        candidates = [
            u for u in users
            if eligible_on_project_work(
                u, team_id, project_id if project_id is not None else u.agent_project_id,
                is_member=not u.is_agent,
            )
        ]
    directory = MentionDirectory(candidates, idle)
    value = assignee.strip()

    def one(matches, kind):
        ids = list(dict.fromkeys(u.id for u in matches))
        if len(ids) > 1:
            names = ", ".join(
                f"@{handle}" if (handle := directory.handle_for(i)) else i for i in ids
            )
            raise ToolContextError(
                f"Assignee {kind} '{assignee}' matches more than one teammate "
                f"({names}); pass one of those handles, or an id or email."
            )
        return ids[0] if ids else None

    if (hit := one([u for u in candidates if u.id == value], "id")):
        return hit
    if "@" in value and not value.startswith("@"):
        # Any case (CHT-1804); an exact spelling wins over a folded one.
        matches = [u for u in candidates if same_email(u.email or "", value)]
        exact = [u for u in matches if u.email == value]
        if (hit := one(exact or matches, "email")):
            return hit
    if (hit := one([u for u in candidates if (u.name or "").strip().lower() == lowered], "name")):
        return hit
    token = value.removeprefix("@")
    if token and HANDLE_RE.fullmatch(token):
        claimants = directory.claimants(token)
        if (hit := one([u for u in candidates if u.id in claimants], "handle")):
            return hit

    raise ToolContextError(f"Could not resolve assignee '{assignee}' to a user on this team.")
