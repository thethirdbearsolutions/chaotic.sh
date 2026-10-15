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
  it; a project named beside a URL ``team_id`` goes through
  ``visible_project_in_team`` (in a body) or ``project_filter_in_team``
  (a query filter), which also pin the project to that team (CHT-1807).
* document: ``can_access_document`` (project access for a project's
  document, team access for a team-level one).
* label, team, agent: ``is_in_team_directory`` (the team directory, which a
  project-scoped agent shares).
* user: listed in a team directory the caller is in, or the caller itself
  (``visible_user``).
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


TEAM_HIDDEN_DETAIL = "Not authorized to access this team"


def team_hidden() -> HTTPException:
    """The answer of a route that only *keys on* ``team_id`` (team-wide
    data, the team directory) for a team the caller may not read, or
    may not read this part of: one 403 with one text (CHT-1842), where
    there used to be four. The check is a membership query that a
    missing team fails the same way, so it leaks nothing.

    A route that *loads the team row* (``GET``/``PATCH``/``DELETE
    /teams/{id}``, ``/teams/{id}/agents``) uses ``visible_team`` instead,
    which answers 404 "Team not found" exactly like a missing team. Do
    not swap one for the other: a 403 for a hidden team row beside a
    404 for a missing one is an existence oracle. A project filter beside a team
    (``project_filter_in_team``) answers the same when the project is
    missing or invisible, so the filter cannot be used as an oracle."""
    return HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=TEAM_HIDDEN_DETAIL)


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


async def _project_in_team(user, project_id: str | None, team_id: str):
    """``(project, here)`` for the project ``project_id`` named next to
    ``team_id`` (a query or body filter beside a URL team), loaded,
    checked and pinned to that team in one step (CHT-1807). The two
    public variants below decide only what each outcome answers.

    * Missing, or one ``user`` may not see (its team read off the row):
      ``(None, False)``. The two are always answered alike (CHT-1785).
    * One ``user`` can see, but of another team: ``(project, False)``.
      Never handed on as the project: a project-scoped agent sees its
      own project whichever team the URL names, so without this pin it
      could read or write another team through its own project's id
      (CHT-1273 review CRITICAL).

      A caller who is not in the URL's team at all gets ``(None, False)``
      instead, as it did before the pin moved here: the answer for a
      team you are not in does not depend on the project you name. The
      exception is a project-scoped agent naming its own project, which
      it already knows.
    * Otherwise ``(project, True)``.
    """
    from app.services.project_service import ProjectService

    project = await ProjectService().get_by_id(project_id) if project_id else None
    if not await can_see_project(user, project):
        return None, False
    if project.team_id != team_id:
        if not (is_project_scoped_agent(user) or await is_in_team_directory(user, team_id)):
            return None, False
        return project, False
    return project, True


async def visible_project_in_team(
    user,
    project_id: str | None,
    team_id: str,
    *,
    detail: str = "Project not found",
    status_code: int = status.HTTP_404_NOT_FOUND,
    elsewhere: HTTPException | None = None,
):
    """A project named in a request *body* beside a URL team: the
    project, or ``not_found(detail, status_code)`` when it is missing
    or hidden. A visible project of another team raises ``elsewhere``,
    which defaults to that same not-found; pass one only where the
    route has always told a caller who can see the project that it is
    in the wrong team (a template snapshot's 400)."""
    project, here = await _project_in_team(user, project_id, team_id)
    if project is None:
        raise not_found(detail, status_code)
    if not here:
        raise elsewhere if elsewhere is not None else not_found(detail, status_code)
    return project


async def project_filter_in_team(user, project_id: str, team_id: str, *, elsewhere_detail: str):
    """A ``project_id`` *filter* on a team-keyed route: the project, or
    ``team_hidden()`` when it is missing or hidden (the answer the route
    gives for a team the caller may not read). A visible project of
    another team answers ``not_found(elsewhere_detail)``."""
    project, here = await _project_in_team(user, project_id, team_id)
    if project is None:
        raise team_hidden()
    if not here:
        raise not_found(elsewhere_detail)
    return project


async def project_filter_in_team_or_none(user, project_id: str, team_id: str):
    """``project_filter_in_team`` for a listing that answers a visible
    project of another team with nothing: the project, None for that
    case, ``team_hidden()`` when it is missing or hidden."""
    project, here = await _project_in_team(user, project_id, team_id)
    if project is None:
        raise team_hidden()
    return project if here else None


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


async def visible_user(user, user_id: str):
    """The user (a person or an agent), or the "User not found" 404.

    Anyone sees themselves. Anyone else is seen by exactly the callers
    whose team directory (``is_in_team_directory``) lists them: a person
    in every team they are a member of, an agent in its own team, as
    ``/teams/{id}/members`` and ``/teams/{id}/agents`` list them
    (CHT-1841). So a project-scoped agent sees its team's members and
    every agent of its team, and nobody outside a team sees anyone in it
    through it."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.services.user_service import UserService

    target = await UserService().get_by_id(user_id)
    if target is None:
        raise not_found("User not found")
    if target.id == user.id:
        return target
    if target.is_agent:
        # A retired agent has no team (CHT-1844), so no directory lists it.
        team_ids = [target.agent_team_id] if target.agent_team_id else []
    else:
        team_ids = [m.team_id for m in await OxydeTeamMember.objects.filter(user_id=target.id).all()]
    for team_id in team_ids:
        if await is_in_team_directory(user, team_id):
            return target
    raise not_found("User not found")
