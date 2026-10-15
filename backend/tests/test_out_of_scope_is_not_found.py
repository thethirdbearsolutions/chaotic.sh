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
import uuid

import pytest
import pytest_asyncio

from app.enums import ApprovalMode, RitualTrigger, TeamRole
from app.mcp_server import tools
from app.oxyde_models.document import OxydeDocument, OxydeDocumentComment
from app.oxyde_models.issue import OxydeIssue, OxydeIssueComment, OxydeIssueRelation
from app.oxyde_models.label import OxydeLabel
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.ritual import OxydeRitual, OxydeRitualGroup
from app.oxyde_models.sprint import OxydeSprint
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
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
    return {
        "team": team.id, "label": label.id, "template": template.id, "team_doc": team_doc.id,
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


def _fill(template, values):
    if template is None:
        return None
    if isinstance(template, str):
        for key, value in values.items():
            template = template.replace("{" + key + "}", str(value))
        return template
    if isinstance(template, list):
        return [_fill(item, values) for item in template]
    return {key: _fill(value, values) for key, value in template.items()}


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

    assert existing.status_code not in (200, 201, 204, 422), existing.text
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
