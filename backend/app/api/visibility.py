"""Loading a row the caller may see, or answering as if it were not there
(CHT-1785).

A route keyed by an id or identifier used to look the row up, answer 404
when it was missing, and then answer 403 when it existed in a project or
team the caller cannot see. The difference was an existence oracle: a
project-scoped agent could walk ``OTH-1``, ``OTH-2``, ... of a sibling
project, and a human or agent of one team could probe another team's ids.

The rule now: a row the caller cannot see answers exactly like a row that
does not exist, with the same status, body and headers. The loaders below
fetch a row and apply the access rule from ``app.api.deps`` in one step,
raising the route's own not-found for both cases. A 403 stays for a caller
who *can* see the row but may not do the action (a non-admin deleting a
project, editing someone else's comment): to get one, check visibility
with a loader first and the permission second, never the other way round.

What "see" means per row is the matching read rule in ``app.api.deps``:

* issue, sprint, project, ritual, ritual group: ``check_user_project_access``
  on the row's project. It takes the project row and reads the team off
  it; a ``project_id`` filter named beside a URL ``team_id`` goes through
  ``visible_project_in_team``, which also pins the project to that team
  (CHT-1807).
* document: ``can_access_document`` (project access for a project's
  document, team access for a team-level one).
* label, team, agent: ``is_in_team_directory`` (the team directory, which a
  project-scoped agent shares).
* template: ``can_read_team_data`` (team-wide data).
"""
from __future__ import annotations

from fastapi import HTTPException, status

from app.api.deps import (
    can_access_document,
    is_in_team_directory,
    check_user_project_access,
    can_read_team_data,
    is_project_scoped_agent,
)


def not_found(detail: str, status_code: int = status.HTTP_404_NOT_FOUND) -> HTTPException:
    """The answer for a row that does not exist, and for one the caller
    may not see. ``status_code`` is for the few body-referenced rows whose
    missing answer was always a 400 (a sprint or parent named in an issue
    body): out of scope, they answer the same 400."""
    return HTTPException(status_code=status_code, detail=detail)


async def can_see_project(user, project) -> bool:
    """``project`` (a row or None) exists and ``user`` may read it."""
    return project is not None and await check_user_project_access(user, project)


async def visible_project(user, project_id: str | None, detail: str = "Project not found"):
    """The project, or ``not_found(detail)``."""
    from app.services.project_service import ProjectService

    project = await ProjectService().get_by_id(project_id) if project_id else None
    if not await can_see_project(user, project):
        raise not_found(detail)
    return project


async def visible_project_in_team(
    user,
    project_id: str,
    team_id: str,
    *,
    hidden: HTTPException,
    elsewhere: HTTPException | None,
):
    """The project ``project_id`` named next to ``team_id`` (a query or
    body filter beside a URL team), loaded, checked and pinned to that
    team in one step (CHT-1807).

    * Missing, or one ``user`` may not see (its team read off the row):
      raises ``hidden``. The two are always answered alike (CHT-1785).
    * One ``user`` can see, but of another team: raises ``elsewhere``,
      or returns None when ``elsewhere`` is None, for a listing that
      answers such a filter with nothing. Never the project itself: a
      project-scoped agent sees its own project whichever team the URL
      names, so without this pin it could read or write another team
      through its own project's id (CHT-1273 review CRITICAL).

      A caller who is not in the URL's team at all gets ``hidden``
      instead, as it did before the pin moved here: the answer for a
      team you are not in does not depend on the project you name. The
      exception is a project-scoped agent naming its own project, which
      it already knows; it gets ``elsewhere``.
    """
    from app.services.project_service import ProjectService

    project = await ProjectService().get_by_id(project_id) if project_id else None
    if not await can_see_project(user, project):
        raise hidden
    if project.team_id != team_id:
        if not (is_project_scoped_agent(user) or await is_in_team_directory(user, team_id)):
            raise hidden
        if elsewhere is None:
            return None
        raise elsewhere
    return project


async def _project_of(row):
    from app.services.project_service import ProjectService

    return await ProjectService().get_by_id(row.project_id) if row is not None else None


async def visible_issue(user, issue_id: str | None, detail: str = "Issue not found"):
    """``(issue, project)``, or ``not_found(detail)``."""
    from app.services.issue_service import IssueService

    issue = await IssueService().get_by_id(issue_id) if issue_id else None
    project = await _project_of(issue)
    if issue is None or not await can_see_project(user, project):
        raise not_found(detail)
    return issue, project


async def visible_issue_by_identifier(user, identifier: str):
    """``(issue, project)`` for an identifier such as ``PRJ-123``, or the
    "Issue not found" 404 (CHT-809 already did this for this one route)."""
    from app.services.issue_service import IssueService

    issue = await IssueService().get_by_identifier(identifier)
    project = await _project_of(issue)
    if issue is None or not await can_see_project(user, project):
        raise not_found("Issue not found")
    return issue, project


async def visible_sprint(user, sprint_id: str | None, detail: str = "Sprint not found"):
    """``(sprint, project)``, or ``not_found(detail)``."""
    from app.services.sprint_service import SprintService

    sprint = await SprintService().get_by_id(sprint_id) if sprint_id else None
    project = await _project_of(sprint)
    if sprint is None or not await can_see_project(user, project):
        raise not_found(detail)
    return sprint, project


async def visible_ritual(user, ritual_id: str, *, include_inactive: bool = False):
    """``(ritual, project)``, or the "Ritual not found" 404."""
    from app.services.ritual_service import RitualService

    ritual = await RitualService().get_by_id(ritual_id, include_inactive=include_inactive)
    project = await _project_of(ritual)
    if ritual is None or not await can_see_project(user, project):
        raise not_found("Ritual not found")
    return ritual, project


async def visible_ritual_group(user, group_id: str):
    """``(group, project)``, or the "Ritual group not found" 404."""
    from app.services.ritual_service import RitualService

    group = await RitualService().get_group_by_id(group_id)
    project = await _project_of(group)
    if group is None or not await can_see_project(user, project):
        raise not_found("Ritual group not found")
    return group, project


async def visible_document(user, document_id: str | None, detail: str = "Document not found"):
    """The document, or ``not_found(detail)``."""
    from app.services.document_service import DocumentService

    document = await DocumentService().get_by_id(document_id) if document_id else None
    if document is None or not await can_access_document(user, document):
        raise not_found(detail)
    return document


async def can_see_label(user, label) -> bool:
    """``label`` (a row or None) exists and is in a team ``user`` is in."""
    return label is not None and await is_in_team_directory(user, label.team_id)


async def visible_label(user, label_id: str, detail: str = "Label not found"):
    """The label, or ``not_found(detail)``."""
    from app.services.issue_service import IssueService

    label = await IssueService().get_label_by_id(label_id)
    if not await can_see_label(user, label):
        raise not_found(detail)
    return label


async def visible_team(user, team_id: str, detail: str = "Team not found"):
    """The team, or ``not_found(detail)``. Seeing a team is being in it
    (``is_in_team_directory``): a project-scoped agent sees its own."""
    from app.services.team_service import TeamService

    team = await TeamService().get_by_id(team_id)
    if team is None or not await is_in_team_directory(user, team_id):
        raise not_found(detail)
    return team


async def visible_template(user, template_id: str):
    """The template, or the "Template not found" 404. Templates are
    team-wide data (``can_read_team_data``)."""
    from app.services.template_service import TemplateService

    template = await TemplateService().get_by_id(template_id)
    if template is None or not await can_read_team_data(user, template.team_id):
        raise not_found("Template not found")
    return template


async def visible_agent(user, agent_id: str):
    """The agent, or the "Agent not found" 404. An agent is in its team's
    directory (``is_in_team_directory``)."""
    from app.services.agent_service import AgentService

    agent = await AgentService().get_by_id(agent_id)
    if agent is None or not await is_in_team_directory(user, agent.agent_team_id):
        raise not_found("Agent not found")
    return agent
