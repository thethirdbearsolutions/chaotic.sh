"""A row the caller cannot see answers exactly like a row that does not
exist (CHT-1785).

Every route keyed by an id or identifier used to answer 403 for a row in a
project or team the caller could not see, and 404 for a missing one: an
existence oracle. Here each such route is called twice by the same
out-of-scope principal, once with an id that exists and once with one that
does not, and the two responses must be identical: status, body and
headers.

Three principals, each out of scope in its own way:

* ``project_agent``: a project-scoped agent of team A (project PROJ). Its
  sibling project SIB is out of scope, and so are team A's team-level
  documents and templates (team-wide data, CHT-1780) and everything of
  team B.
* ``team_b_agent``: a team-scoped agent of team B. All of team A is out of
  scope.
* ``team_b_human``: a person in team B only. All of team A is out of scope.

A 403 is kept for a caller who can see the row but may not do the action;
``TestVisibleButForbidden`` pins a few of those.
"""
import json
import re
import uuid
from datetime import datetime, timedelta, timezone

import pytest
import pytest_asyncio
from fastapi.routing import APIWebSocketRoute, iter_route_contexts
from starlette.routing import Mount, WebSocketRoute, compile_path

from app.enums import ApprovalMode, RitualTrigger, TeamRole
from app.mcp_server import tools
from app.oxyde_models.document import OxydeDocument, OxydeDocumentComment
from app.oxyde_models.issue import OxydeIssue, OxydeIssueComment, OxydeIssueRelation
from app.oxyde_models.label import OxydeLabel
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.ritual import OxydeRitual, OxydeRitualGroup
from app.oxyde_models.sprint import OxydeSprint
from app.oxyde_models.team import OxydeTeam, OxydeTeamInvitation, OxydeTeamMember
from app.oxyde_models.template import OxydeTemplate
from app.schemas.agent import AgentCreate
from app.services.agent_service import AgentService

from .mcp_principal import acting_as

pytestmark = pytest.mark.asyncio

PRINCIPALS = ["project_agent", "team_b_agent", "team_b_human"]


async def _issue(project, number, creator_id):
    return await OxydeIssue.objects.create(
        project_id=project.id, identifier=f"{project.key}-{number}", number=number,
        title=f"{project.key} issue {number}", description="secret", creator_id=creator_id,
    )


async def _project_rows(project, team, author):
    """One of each project-keyed row, in ``project``."""
    issue = await _issue(project, 1, author.id)
    other = await _issue(project, 2, author.id)
    comment = await OxydeIssueComment.objects.create(issue_id=issue.id, author_id=author.id, content="c")
    relation = await OxydeIssueRelation.objects.create(issue_id=issue.id, related_issue_id=other.id)
    sprint = await OxydeSprint.objects.create(project_id=project.id, name=f"{project.key} sprint")
    ritual = await OxydeRitual.objects.create(
        project_id=project.id, name=f"{project.key}-review", prompt="Reviewed?",
        trigger=RitualTrigger.TICKET_CLOSE, approval_mode=ApprovalMode.REVIEW,
    )
    group = await OxydeRitualGroup.objects.create(project_id=project.id, name=f"{project.key} group")
    document = await OxydeDocument.objects.create(
        team_id=team.id, project_id=project.id, author_id=author.id, title=f"{project.key} doc", content="secret",
    )
    doc_comment = await OxydeDocumentComment.objects.create(document_id=document.id, author_id=author.id, content="c")
    return {
        "project": project.id, "issue": issue.id, "identifier": issue.identifier,
        "comment": comment.id, "relation": relation.id, "sprint": sprint.id, "ritual": ritual.id,
        "group": group.id, "document": document.id, "doc_comment": doc_comment.id,
    }


async def _team_rows(team, author, agent_name):
    """One of each team-keyed row, in ``team``."""
    label = await OxydeLabel.objects.create(team_id=team.id, name=f"{team.key} label", color="#000000")
    template = await OxydeTemplate.objects.create(
        team_id=team.id, name=f"{team.key} template", body='{"version": 1, "sections": {}}',
    )
    team_doc = await OxydeDocument.objects.create(
        team_id=team.id, author_id=author.id, title=f"{team.key} team doc", content="secret",
    )
    agent, key, key_id = await AgentService().create(AgentCreate(name=agent_name), author, team.id)
    invitation = await OxydeTeamInvitation.objects.create(
        team_id=team.id, email=f"invitee-{team.key}@example.com", token=f"token-{team.key}",
        invited_by_id=author.id, expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )
    return {
        "team": team.id, "label": label.id, "template": template.id, "team_doc": team_doc.id,
        "invitation": invitation.id,
        "agent": agent.id, "api_key": key_id, "user": author.id,
        "_agent": agent, "_key": key,
    }


@pytest_asyncio.fixture
async def world(db, test_user, test_user2, test_team, test_project):
    """Team A (test_team, owned by test_user): PROJ, where the project
    agent works, and its sibling SIB. Team B (owned by test_user2): QQQ."""
    sibling = await OxydeProject.objects.create(team_id=test_team.id, name="Sibling", key="SIB")
    team_b = await OxydeTeam.objects.create(name="Team B", key="TB")
    await OxydeTeamMember.objects.create(team_id=team_b.id, user_id=test_user2.id, role=TeamRole.OWNER)
    project_q = await OxydeProject.objects.create(team_id=team_b.id, name="Q", key="QQQ")

    a_sib = await _project_rows(sibling, test_team, test_user)
    b_q = await _project_rows(project_q, team_b, test_user2)
    own_proj = await _project_rows(test_project, test_team, test_user)
    a_team = await _team_rows(test_team, test_user, "A Bot")
    b_team = await _team_rows(team_b, test_user2, "B Bot")

    project_agent, project_key, _ = await AgentService().create(
        AgentCreate(name="Proj Bot"), test_user, test_team.id, project_id=test_project.id,
    )

    def own(rows, team):
        return {"own_project": rows["project"], "own_issue": rows["issue"], "own_doc": rows["document"],
                "own_team": team.id}

    # What each principal probes: rows it cannot see, plus its own rows for
    # routes that name one of each.
    b_view = {**a_sib, **{k: v for k, v in a_team.items() if not k.startswith("_")}, **own(b_q, team_b)}
    return {
        "project_agent": (
            {"Authorization": f"Bearer {project_key}"},
            {
                **a_sib,
                **{k: v for k, v in b_team.items() if not k.startswith("_")},
                # Team A's team-level document: team-wide data (CHT-1780).
                "team_doc": a_team["team_doc"],
                **own(own_proj, test_team),
            },
        ),
        "team_b_agent": ({"Authorization": f"Bearer {b_team['_key']}"}, b_view),
        "team_b_human": (None, b_view),
    }


@pytest.fixture
def principal_headers(world, auth_headers2):
    def headers(name):
        return world[name][0] or auth_headers2
    return headers


# (method, path, json body, the placeholder replaced by a missing id).
# The body must be valid, so the request reaches the handler: a 422 would
# make the two answers trivially equal.
ROUTES = [
    # Issues, by id and by identifier.
    ("GET", "/api/issues/{issue}", None, "issue"),
    ("PATCH", "/api/issues/{issue}", {"title": "x"}, "issue"),
    ("DELETE", "/api/issues/{issue}", None, "issue"),
    ("GET", "/api/issues/identifier/{identifier}", None, "identifier"),
    ("GET", "/api/issues/{issue}/activities", None, "issue"),
    ("GET", "/api/issues/{issue}/sub-issues", None, "issue"),
    ("GET", "/api/issues/{issue}/documents", None, "issue"),
    ("GET", "/api/issues/{issue}/description-revisions", None, "issue"),
    ("GET", "/api/issues/{issue}/description-revisions/1", None, "issue"),
    ("POST", "/api/issues/{issue}/labels", {"label_id": "{label}"}, "issue"),
    ("DELETE", "/api/issues/{issue}/labels/{label}", None, "issue"),
    ("POST", "/api/issues/batch-update", {"issue_ids": ["{issue}"], "priority": "high"}, "issue"),
    ("POST", "/api/issues/batch-update", {"issue_ids": ["{own_issue}"], "label_ids": ["{label}"]}, "label"),
    ("POST", "/api/issues/batch-update", {"issue_ids": ["{own_issue}"], "add_label_ids": ["{label}"]}, "label"),
    # Comments.
    ("GET", "/api/issues/{issue}/comments", None, "issue"),
    ("POST", "/api/issues/{issue}/comments", {"content": "x"}, "issue"),
    ("PATCH", "/api/issues/{issue}/comments/{comment}", {"content": "x"}, "issue"),
    ("DELETE", "/api/issues/{issue}/comments/{comment}", None, "issue"),
    # Relations, either end out of scope.
    ("GET", "/api/issues/{issue}/relations", None, "issue"),
    ("POST", "/api/issues/{issue}/relations", {"related_issue_id": "{own_issue}"}, "issue"),
    ("POST", "/api/issues/{own_issue}/relations", {"related_issue_id": "{issue}"}, "issue"),
    ("DELETE", "/api/issues/{issue}/relations/{relation}", None, "issue"),
    ("DELETE", "/api/issues/{own_issue}/relations/{relation}", None, "relation"),
    # Rows named in an issue body.
    ("POST", "/api/projects/{own_project}/issues", {"title": "x", "sprint_id": "{sprint}"}, "sprint"),
    ("POST", "/api/projects/{own_project}/issues", {"title": "x", "parent_id": "{issue}"}, "issue"),
    ("PATCH", "/api/issues/{own_issue}", {"sprint_id": "{sprint}"}, "sprint"),
    ("PATCH", "/api/issues/{own_issue}", {"parent_id": "{issue}"}, "issue"),
    ("POST", "/api/issues/{own_issue}/labels", {"label_id": "{label}"}, "label"),
    ("DELETE", "/api/issues/{own_issue}/labels/{label}", None, "label"),
    # Projects, and what is listed or created under one.
    ("GET", "/api/projects/{project}", None, "project"),
    ("PATCH", "/api/projects/{project}", {"name": "x"}, "project"),
    ("DELETE", "/api/projects/{project}", None, "project"),
    ("POST", "/api/projects/{project}/issues", {"title": "x"}, "project"),
    ("GET", "/api/issues?project_id={project}", None, "project"),
    ("GET", "/api/projects/{project}/issues/ready", None, "project"),
    ("GET", "/api/projects/{project}/issues/query", None, "project"),
    ("POST", "/api/projects/{project}/agents", {"name": "x"}, "project"),
    # Sprints.
    ("GET", "/api/sprints/{sprint}", None, "sprint"),
    ("PATCH", "/api/sprints/{sprint}", {"name": "x"}, "sprint"),
    ("POST", "/api/sprints/{sprint}/close", None, "sprint"),
    ("GET", "/api/sprints/{sprint}/transactions", None, "sprint"),
    ("GET", "/api/issues?sprint_id={sprint}", None, "sprint"),
    ("GET", "/api/sprints/current?project_id={project}", None, "project"),
    ("GET", "/api/projects/{project}/sprints", None, "project"),
    ("POST", "/api/projects/{project}/sprints", None, "project"),
    # Rituals and attestations.
    ("GET", "/api/rituals/{ritual}", None, "ritual"),
    ("PATCH", "/api/rituals/{ritual}", {"name": "x"}, "ritual"),
    ("DELETE", "/api/rituals/{ritual}", None, "ritual"),
    ("POST", "/api/rituals/{ritual}/attest", {"note": "x"}, "ritual"),
    ("POST", "/api/rituals/{ritual}/approve", None, "ritual"),
    ("POST", "/api/rituals/{ritual}/complete", {"note": "x"}, "ritual"),
    ("POST", "/api/rituals/{ritual}/attest-issue/{issue}", {"note": "x"}, "ritual"),
    ("POST", "/api/rituals/{ritual}/complete-issue/{issue}", {"note": "x"}, "ritual"),
    ("POST", "/api/rituals/{ritual}/approve-issue/{issue}", None, "ritual"),
    ("POST", "/api/rituals/{ritual}/reject-issue/{issue}", {"note": "x"}, "ritual"),
    ("GET", "/api/rituals/issue/{issue}/pending", None, "issue"),
    ("POST", "/api/rituals/force-clear-ticket-limbo?issue_id={issue}", None, "issue"),
    ("GET", "/api/projects/{project}/rituals", None, "project"),
    ("POST", "/api/projects/{project}/rituals", {"name": "x", "prompt": "x"}, "project"),
    ("GET", "/api/rituals/history?project_id={project}", None, "project"),
    ("GET", "/api/rituals/limbo?project_id={project}", None, "project"),
    ("GET", "/api/rituals/pending-gates?project_id={project}", None, "project"),
    ("GET", "/api/rituals/pending-approvals?project_id={project}", None, "project"),
    ("POST", "/api/rituals/force-clear-limbo?project_id={project}", None, "project"),
    ("GET", "/api/rituals/groups?project_id={project}", None, "project"),
    ("POST", "/api/rituals/groups?project_id={project}", {"name": "x"}, "project"),
    ("GET", "/api/rituals/groups/{group}", None, "group"),
    ("PATCH", "/api/rituals/groups/{group}", {"name": "x"}, "group"),
    ("DELETE", "/api/rituals/groups/{group}", None, "group"),
    # Documents: project-level and team-level.
    ("GET", "/api/documents/{document}", None, "document"),
    ("GET", "/api/documents/{team_doc}", None, "team_doc"),
    ("PATCH", "/api/documents/{document}", {"title": "x"}, "document"),
    ("DELETE", "/api/documents/{document}", None, "document"),
    ("DELETE", "/api/documents/{team_doc}", None, "team_doc"),
    ("GET", "/api/documents/{document}/issues", None, "document"),
    ("POST", "/api/documents/{document}/issues/{own_issue}", None, "document"),
    ("DELETE", "/api/documents/{document}/issues/{own_issue}", None, "document"),
    ("POST", "/api/documents/{own_doc}/issues/{issue}", None, "issue"),
    ("DELETE", "/api/documents/{own_doc}/issues/{issue}", None, "issue"),
    ("GET", "/api/documents/{document}/labels", None, "document"),
    ("POST", "/api/documents/{document}/labels/{label}", None, "document"),
    ("DELETE", "/api/documents/{document}/labels/{label}", None, "document"),
    ("POST", "/api/documents/{own_doc}/labels/{label}", None, "label"),
    ("GET", "/api/documents/{document}/revisions", None, "document"),
    ("GET", "/api/documents/{document}/revisions/1", None, "document"),
    ("GET", "/api/documents/{document}/comments", None, "document"),
    ("POST", "/api/documents/{document}/comments", {"content": "x"}, "document"),
    ("PATCH", "/api/documents/{document}/comments/{doc_comment}", {"content": "x"}, "document"),
    ("DELETE", "/api/documents/{document}/comments/{doc_comment}", None, "document"),
    ("PATCH", "/api/documents/{own_doc}", {"project_id": "{project}"}, "project"),
    ("PATCH", "/api/documents/{own_doc}", {"sprint_id": "{sprint}"}, "sprint"),
    ("POST", "/api/teams/{own_team}/documents", {"title": "x", "icon": "x", "project_id": "{project}"}, "project"),
    # Labels.
    ("GET", "/api/labels/{label}", None, "label"),
    ("PATCH", "/api/labels/{label}", {"name": "x"}, "label"),
    ("DELETE", "/api/labels/{label}", None, "label"),
    # Teams, templates, agents, keys, users.
    ("GET", "/api/teams/{team}", None, "team"),
    ("PATCH", "/api/teams/{team}", {"name": "x"}, "team"),
    ("DELETE", "/api/teams/{team}", None, "team"),
    ("GET", "/api/teams/{team}/agents", None, "team"),
    ("POST", "/api/teams/{team}/agents", {"name": "x"}, "team"),
    ("GET", "/api/teams/{team}/members", None, "team"),
    ("PATCH", "/api/teams/{team}/members/{user}", {"role": "member"}, "team"),
    ("DELETE", "/api/teams/{team}/members/{user}", None, "team"),
    ("GET", "/api/teams/{team}/invitations", None, "team"),
    ("DELETE", "/api/teams/{team}/invitations/{invitation}", None, "team"),
    ("GET", "/api/teams/{team}/projects", None, "team"),
    ("POST", "/api/teams/{team}/projects", {"name": "x", "key": "ZZZ"}, "team"),
    ("GET", "/api/teams/{team}/labels", None, "team"),
    ("POST", "/api/teams/{team}/labels", {"name": "x"}, "team"),
    ("GET", "/api/teams/{team}/documents", None, "team"),
    ("GET", "/api/teams/{team}/issues/ready", None, "team"),
    ("GET", "/api/teams/{team}/issues/query", None, "team"),
    ("GET", "/api/teams/{team}/templates", None, "team"),
    ("POST", "/api/teams/{team}/templates", {"name": "x", "body": {"version": 1, "sections": {}}}, "team"),
    ("POST", "/api/teams/{team}/documents", {"title": "x", "icon": "x"}, "team"),
    ("POST", "/api/teams/{team}/templates/from-project", {"name": "x", "project_id": "{own_project}"}, "team"),
    ("GET", "/api/templates/{template}", None, "template"),
    ("DELETE", "/api/templates/{template}", None, "template"),
    ("POST", "/api/templates/{template}/apply", {"project_id": "{own_project}"}, "template"),
    ("POST", "/api/teams/{own_team}/templates/from-project", {"name": "x", "project_id": "{project}"}, "project"),
    ("GET", "/api/agents/{agent}", None, "agent"),
    ("PATCH", "/api/agents/{agent}", {"name": "x"}, "agent"),
    ("DELETE", "/api/agents/{agent}", None, "agent"),
    ("GET", "/api/agents/{agent}/keys", None, "agent"),
    ("POST", "/api/agents/{agent}/keys", None, "agent"),
    ("POST", "/api/agents/{agent}/deactivate", None, "agent"),
    ("POST", "/api/agents/{agent}/reactivate", None, "agent"),
    ("DELETE", "/api/api-keys/{api_key}", None, "api_key"),
    ("GET", "/api/users/{user}", None, "user"),
]


# Routes an agent is refused before any row is loaded: the 403 depends only
# on who is asking, so it cannot tell an existing id from a missing one.
# These cases are not oracle tests for agents; the human principal still
# reaches the loader on them. The test asserts the 403 so a later change
# that moves the role check after the lookup fails here instead of passing
# quietly.
PRE_LOOKUP_403 = {
    ("DELETE", "/api/labels/{label}"): "Agents cannot delete labels",
    ("POST", "/api/teams/{own_team}/templates/from-project"): "Only admins can manage templates",
}
AGENT_PRINCIPALS = {"project_agent", "team_b_agent"}

# Team routes that refuse anyone outside the team (or below admin) from
# the team id alone, before loading the team or any row under it: the
# check is a membership query, which a missing team fails the same way.
# So every principal here gets the same 403 for an existing team and a
# missing one. Asserted, like PRE_LOOKUP_403, so that a handler which
# starts loading the row before the check fails here.
TEAM_GATE_403 = {
    ("GET", "/api/teams/{team}/members"): "Not a member of this team",
    ("PATCH", "/api/teams/{team}/members/{user}"): "Only admins can update member roles",
    ("DELETE", "/api/teams/{team}/members/{user}"): "Only admins can remove other members",
    ("GET", "/api/teams/{team}/invitations"): "Only admins can view invitations",
    ("DELETE", "/api/teams/{team}/invitations/{invitation}"): "Only admins can delete invitations",
    ("GET", "/api/teams/{team}/projects"): "Not a member of this team",
    ("POST", "/api/teams/{team}/projects"): "Not a member of this team",
    ("GET", "/api/teams/{team}/labels"): "Not authorized to access this team",
    ("POST", "/api/teams/{team}/labels"): "Not authorized to access this team",
    ("GET", "/api/teams/{team}/documents"): "Not a member of this team",
    ("GET", "/api/teams/{team}/issues/ready"): "Not authorized to access this team",
    ("GET", "/api/teams/{team}/issues/query"): "Not authorized to access this team",
    ("GET", "/api/teams/{team}/templates"): "Not a member of this team",
    ("POST", "/api/teams/{team}/templates"): "Only admins can manage templates",
    ("POST", "/api/teams/{team}/documents"): "Not a member of this team",
    ("POST", "/api/teams/{team}/templates/from-project"): "Only admins can manage templates",
}


def _fill(template, values):
    if template is None:
        return None
    if isinstance(template, str):
        for key, value in values.items():
            template = template.replace("{" + key + "}", str(value))
        return template
    if isinstance(template, list):
        return [_fill(item, values) for item in template]
    if isinstance(template, dict):
        return {key: _fill(value, values) for key, value in template.items()}
    return template


def _missing(values, placeholder):
    """``values`` with ``placeholder`` pointing at a row that does not exist."""
    gone = dict(values)
    if placeholder == "identifier":
        gone["identifier"] = values["identifier"].split("-")[0] + "-9999"
    else:
        gone[placeholder] = str(uuid.uuid4())
    return gone


async def _call(client, method, path, body, headers):
    kwargs = {"headers": headers}
    if body is not None:
        kwargs["json"] = body
    return await client.request(method, path, **kwargs)


@pytest.mark.parametrize("principal", PRINCIPALS)
@pytest.mark.parametrize(
    "method,path,body,placeholder", ROUTES,
    ids=[f"{m} {p} [{ph}]" for m, p, _, ph in ROUTES],
)
async def test_out_of_scope_answers_like_missing(
    client, world, principal_headers, principal, method, path, body, placeholder,
):
    headers = principal_headers(principal)
    values = world[principal][1]
    gone = _missing(values, placeholder)

    missing = await _call(client, method, _fill(path, gone), _fill(body, gone), headers)
    existing = await _call(client, method, _fill(path, values), _fill(body, values), headers)

    pre_lookup = TEAM_GATE_403.get((method, path))
    if pre_lookup is None and principal in AGENT_PRINCIPALS:
        pre_lookup = PRE_LOOKUP_403.get((method, path))
    if pre_lookup is not None:
        assert existing.status_code == missing.status_code == 403, existing.text
        assert existing.json() == missing.json() == {"detail": pre_lookup}
        return
    assert existing.status_code not in (200, 201, 204, 403, 422), existing.text
    # An answer may quote back the id it was sent (batch-update lists the
    # ids it did not find): compare with the missing id read as the real one.
    echoed = json.loads(missing.text.replace(str(gone[placeholder]), str(values[placeholder])))
    assert (existing.status_code, existing.json()) == (missing.status_code, echoed)
    assert dict(existing.headers) == dict(missing.headers)


async def test_every_out_of_scope_principal_is_really_out_of_scope(client, world, principal_headers):
    """The fixture's premise: each principal is refused its target issue,
    and can read its own."""
    for name in PRINCIPALS:
        headers = principal_headers(name)
        values = world[name][1]
        assert (await client.get(f"/api/issues/{values['issue']}", headers=headers)).status_code == 404
        own = await client.get(f"/api/issues/{values['own_issue']}", headers=headers)
        assert own.status_code == 200, (name, own.text)


_CREDENTIAL = "the parameter is the caller's own credential, not a row it asks about"
_INVITE_TOKEN = "an unguessable invitation secret: holding it is the permission, and team scope does not apply"
_OWN_INBOX = (
    "the caller's own inbox rows, not a team or project's: another person's entry answers "
    "the missing one's 404 (test_inbox.py)"
)
_OWN_DEVICE = "an id the client chooses for its own device, looked up only among the caller's registrations"
_CONSENT = "an unguessable consent-request id, bound to the first person who opens it; anyone else gets 404"

# Routes with a path parameter that ROUTES does not call, each with the
# reason it needs no out-of-scope probe (CHT-1808). Keyed by (method,
# path), so a new method on one of these paths is a new handler to explain.
# A websocket route's method is "WEBSOCKET".
NOT_ROW_KEYED = {
    **{(method, "/mcp/{api_key}"): _CREDENTIAL for method in ("GET", "HEAD", "POST", "DELETE")},
    ("GET", "/{full_path:path}"): "the SPA catch-all serves index.html for any path; it looks nothing up",
    ("GET", "/api/teams/invitations/{token}"): _INVITE_TOKEN,
    ("POST", "/api/teams/invitations/{token}/accept"): _INVITE_TOKEN,
    ("POST", "/api/inbox/{entry_id}/read"): _OWN_INBOX,
    ("POST", "/api/inbox/{entry_id}/archive"): _OWN_INBOX,
    ("PUT", "/api/push/devices/{installation_id}"): _OWN_DEVICE,
    ("DELETE", "/api/push/devices/{installation_id}"): _OWN_DEVICE,
    ("DELETE", "/api/oauth/connections/{connection_id}"): (
        "the caller's own OAuth connections; one that is not theirs is the missing one's 404"
    ),
    ("GET", "/api/oauth/requests/{request_id}"): _CONSENT,
    ("POST", "/api/oauth/requests/{request_id}/approve"): _CONSENT,
    ("POST", "/api/oauth/requests/{request_id}/deny"): _CONSENT,
}

# Mounts the guard cannot look inside (iter_route_contexts does not walk a
# mounted app), so each must be explained. A new mount fails the guard
# until it is listed here or the guard learns to walk it.
MOUNTS = {
    "/static": "StaticFiles for the frontend bundle: files on disk, no rows",
}

# Row-keyed routes that still tell an existing row from a missing one, so
# they cannot join ROUTES yet. Each names the open ticket that fixes it;
# the fix moves the route into ROUTES. ``test_known_oracles_still_leak``
# fails once a listed route stops leaking, so an entry cannot outlive it.
# Key: the app's (method, path). Value: a ROUTES-style probe of it, then
# the ticket and why it leaks.
KNOWN_ORACLES = {
    ("POST", "/api/teams/{team_id}/invitations"): (
        "/api/teams/{team}/invitations", {"email": "new@example.com"}, "team",
        "CHT-1803: loads the team (404 if missing) before the admin check (403)",
    ),
}


def _served_routes():
    """(methods, full path, compiled path regex, route) for every route the
    app serves, in the order the router tries them. ``app.routes`` alone
    hides the included /api router (CHT-1561), as
    tests/test_agent_register.py notes. A websocket route has no methods;
    it is given "WEBSOCKET" so it is checked like the rest."""
    from app.main import app

    served = []
    for rc in iter_route_contexts(app.routes):
        route = rc.original_route
        methods = set(rc.methods or ())
        if isinstance(route, (WebSocketRoute, APIWebSocketRoute)):
            methods = {"WEBSOCKET"}
        served.append((methods, rc.path, compile_path(rc.path)[0], route))
    return served


def _route_called(served, method, path):
    """The app route a ROUTES entry reaches: its placeholders filled with
    plausible values, its query string dropped, then matched the way the
    router matches (first route whose path and method both fit)."""
    concrete = path.split("?")[0].replace("{identifier}", "PROJ-1")
    concrete = re.sub(r"\{\w+\}", lambda _: str(uuid.uuid4()), concrete)
    for methods, route_path, regex, _route in served:
        if method in methods and regex.match(concrete):
            return route_path
    return None


async def test_every_id_keyed_route_is_probed_or_explained():
    """Each (method, path) the app serves with a path parameter, websocket
    routes included, is either called by ROUTES, or listed in NOT_ROW_KEYED
    or KNOWN_ORACLES with its reason (CHT-1808). A new
    ``/things/{thing_id}`` route that loads a row and answers 403 for one
    out of scope fails here until it joins ROUTES, where the oracle test
    then catches the 403. Every mount must be listed in MOUNTS, since the
    walk cannot see inside one.

    Coverage is per route, not per parameter (CHT-1821), and ids in query
    strings or bodies are not seen (CHT-1819)."""
    served = _served_routes()

    mounts = sorted(route_path for _m, route_path, _r, route in served if isinstance(route, Mount))
    assert sorted(set(mounts) - set(MOUNTS)) == [], (
        "a mount the guard cannot look inside: list it in MOUNTS with the reason it serves no "
        "scoped rows, or teach _served_routes to walk it"
    )
    for stale in sorted(set(MOUNTS) - set(mounts)):
        pytest.fail(f"MOUNTS lists {stale}, which the app no longer mounts")

    called = {}
    for method, path, _body, _placeholder in ROUTES:
        route_path = _route_called(served, method, path)
        assert route_path is not None, f"ROUTES entry {method} {path} reaches no route the app serves"
        called.setdefault((method, route_path), f"{method} {path}")

    keyed = {
        (method, route_path)
        for methods, route_path, _regex, route in served
        if "{" in route_path and not isinstance(route, Mount)
        for method in methods
    }
    unexplained = sorted(keyed - set(called) - set(NOT_ROW_KEYED) - set(KNOWN_ORACLES))
    assert unexplained == [], (
        "id-keyed routes with no out-of-scope probe: add each to ROUTES, or to NOT_ROW_KEYED "
        "with the reason its parameter is not a row the caller may be out of scope for"
    )

    # The allowlists name live routes, and nothing in them is also probed.
    for entry in sorted(set(NOT_ROW_KEYED) - keyed):
        pytest.fail(f"NOT_ROW_KEYED lists {entry}, which the app no longer serves")
    for entry in sorted(set(KNOWN_ORACLES) - keyed):
        pytest.fail(f"KNOWN_ORACLES lists {entry}, which the app no longer serves")
    for entry in sorted(set(KNOWN_ORACLES) & set(called)):
        pytest.fail(f"KNOWN_ORACLES lists {entry}, but ROUTES entry {called[entry]} probes it: drop one")
    for entry in sorted(set(NOT_ROW_KEYED) & set(called)):
        pytest.fail(
            f"NOT_ROW_KEYED lists {entry}, but ROUTES entry {called[entry]} reaches it "
            "(a stale ROUTES entry falls through to the SPA catch-all)"
        )


@pytest.mark.parametrize("route", sorted(KNOWN_ORACLES), ids=[f"{m} {p}" for m, p in sorted(KNOWN_ORACLES)])
async def test_known_oracles_still_leak(client, world, principal_headers, route):
    """Each KNOWN_ORACLES entry still leaks to at least one principal. When
    this fails, it leaks to none: the route has been fixed, so move it to
    ROUTES (where the full comparison runs for every principal)."""
    method = route[0]
    path, body, placeholder, _reason = KNOWN_ORACLES[route]
    answers = {}
    for principal in PRINCIPALS:
        headers = principal_headers(principal)
        values = world[principal][1]
        gone = _missing(values, placeholder)
        missing = await _call(client, method, _fill(path, gone), _fill(body, gone), headers)
        existing = await _call(client, method, _fill(path, values), _fill(body, values), headers)
        answers[principal] = (existing.status_code, missing.status_code)
    assert any(existing != missing for existing, missing in answers.values()), answers


class TestMcpTools:
    """The remote MCP tools answer an out-of-scope row the way they answer
    a missing one: they call the same API functions, and their resolvers
    no longer tell the two apart (CHT-1785)."""

    @pytest.mark.parametrize("principal", ["project_agent", "team_b_human"])
    async def test_issue_and_document_tools(self, world, principal, test_user2):
        from app.oxyde_models.user import OxydeUser

        values = world[principal][1]
        if principal == "project_agent":
            user = await OxydeUser.objects.get(agent_project_id=values["own_project"])
        else:
            user = test_user2
        gone_identifier = values["identifier"].split("-")[0] + "-9999"
        gone_doc = str(uuid.uuid4())
        with acting_as(user):
            for tool, existing, missing in [
                (tools.issue_view, {"identifier": values["identifier"]}, {"identifier": gone_identifier}),
                (tools.issue_relations, {"identifier": values["identifier"]}, {"identifier": gone_identifier}),
                (tools.issue_revisions, {"identifier": values["identifier"]}, {"identifier": gone_identifier}),
                (tools.issue_comment, {"identifier": values["identifier"], "content": "x"},
                 {"identifier": gone_identifier, "content": "x"}),
                (tools.doc_view, {"document_id": values["document"]}, {"document_id": gone_doc}),
                (tools.doc_revisions, {"document_id": values["document"]}, {"document_id": gone_doc}),
            ]:
                seen = await tool(**existing)
                assert "error" in seen, (tool.__name__, seen)
                assert seen == _rename(await tool(**missing), gone_doc, values["document"]), tool.__name__

    async def test_team_for_project(self, world, test_user2):
        values = world["team_b_human"][1]
        with pytest.raises(tools.ToolContextError) as existing:
            await tools._team_id_for_project(test_user2, values["project"])
        with pytest.raises(tools.ToolContextError) as missing:
            await tools._team_id_for_project(test_user2, str(uuid.uuid4()))
        assert str(existing.value) == str(missing.value) == "Project not found."


def _rename(result, gone, existing):
    """An error message that quotes the id it was given, with the missing
    id swapped for the existing one, so the two can be compared."""
    error = result.get("error") if isinstance(result, dict) else None
    if error and isinstance(error.get("message"), str):
        error = {**error, "message": error["message"].replace(gone, existing)}
        return {**result, "error": error}
    return result


class TestVisibleButForbidden:
    """Seeing a row but lacking the permission for the action stays 403."""

    async def test_plain_member_deleting_a_project(self, client, world, test_team, test_project, test_user2, auth_headers2):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        response = await client.delete(f"/api/projects/{test_project.id}", headers=auth_headers2)
        assert response.status_code == 403
        assert response.json() == {"detail": "Only admins can delete projects"}

    async def test_plain_member_editing_another_members_comment(
        self, client, world, test_team, test_user2, auth_headers2,
    ):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        values = world["team_b_human"][1]
        response = await client.patch(
            f"/api/issues/{values['issue']}/comments/{values['comment']}", json={"content": "x"},
            headers=auth_headers2,
        )
        assert response.status_code == 403
        assert response.json() == {"detail": "Can only update own comments"}

    async def test_project_agent_renaming_its_teams_label(self, client, world, test_team):
        headers = world["project_agent"][0]
        label = await OxydeLabel.objects.create(team_id=test_team.id, name="Ours", color="#000000")
        # It sees the label (the team directory) but may not edit it (CHT-1780).
        assert (await client.get(f"/api/labels/{label.id}", headers=headers)).status_code == 200
        response = await client.patch(f"/api/labels/{label.id}", json={"name": "x"}, headers=headers)
        assert response.status_code == 403

    async def test_plain_member_minting_a_key_for_someone_elses_agent(
        self, client, world, test_team, test_user2, auth_headers2,
    ):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        agent_id = world["team_b_human"][1]["agent"]
        assert (await client.get(f"/api/agents/{agent_id}", headers=auth_headers2)).status_code == 200
        response = await client.post(f"/api/agents/{agent_id}/keys", headers=auth_headers2)
        assert response.status_code == 403
