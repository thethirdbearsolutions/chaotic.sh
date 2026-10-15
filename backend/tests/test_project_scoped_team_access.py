"""A project-scoped agent has no team-wide access (CHT-1780).

``AgentService.create`` sets ``agent_team_id`` on a project-scoped agent
too (its project's team). ``check_user_team_access`` used to compare only
that column, so such an agent passed every team-wide check: the team's
issue list, search, activity and comment feeds, team-level documents,
templates, project creation, label edits, and MCP ``resolve_team``.

These tests pin both halves of the fix: every team-wide path refuses it,
and the paths it needs for its own project keep working -- the team's
directory (team row, members, agents, labels), the project list confined
to its project, and the project-filtered forms of search, activity and
document listing.
"""
import pytest
import pytest_asyncio

from app.mcp_server import context, tools
from app.oxyde_models.document import OxydeDocument
from app.oxyde_models.issue import OxydeIssue
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.team import OxydeTeam
from app.schemas.agent import AgentCreate
from app.services.agent_service import AgentService

from .mcp_principal import api_key_principal

pytestmark = pytest.mark.asyncio


@pytest_asyncio.fixture
async def sibling(db, test_team):
    """Another project in the agent's team: the thing it must not see."""
    return await OxydeProject.objects.create(team_id=test_team.id, name="Sibling", key="SIB")


@pytest_asyncio.fixture
async def proj_agent(db, test_user, test_team, test_project):
    """A project-scoped agent made the normal way (agent_team_id set)."""
    agent, key, _ = await AgentService().create(
        AgentCreate(name="Proj Bot"), test_user, test_team.id, project_id=test_project.id,
    )
    assert agent.agent_team_id == test_team.id and agent.agent_project_id == test_project.id
    return agent, {"Authorization": f"Bearer {key}"}


@pytest_asyncio.fixture
async def team_agent(db, test_user, test_team):
    agent, key, _ = await AgentService().create(AgentCreate(name="Team Bot"), test_user, test_team.id)
    return agent, {"Authorization": f"Bearer {key}"}


async def _issue(project, n, creator_id, **kw):
    return await OxydeIssue.objects.create(
        project_id=project.id, identifier=f"{project.key}-{n}", number=n,
        title=f"{project.key} issue {n}", creator_id=creator_id, **kw,
    )


class TestRefused:
    """Team-wide reads and writes: 403 for the project-scoped agent."""

    @pytest.mark.parametrize("path", [
        "/api/issues?team_id={team}",
        "/api/teams/{team}/issues/ready",
        "/api/issues/search?team_id={team}&q=issue",
        "/api/issues/activities?team_id={team}",
        "/api/issues/comments?team_id={team}",
        "/api/teams/{team}/documents",
        "/api/teams/{team}/templates",
    ])
    async def test_team_wide_read(self, client, proj_agent, test_team, path):
        _, headers = proj_agent
        response = await client.get(path.format(team=test_team.id), headers=headers)
        assert response.status_code == 403, response.text

    async def test_sibling_project_filters(self, client, proj_agent, test_team, sibling):
        _, headers = proj_agent
        for path in (
            f"/api/issues/search?team_id={test_team.id}&q=x&project_id={sibling.id}",
            f"/api/issues/activities?team_id={test_team.id}&project_id={sibling.id}",
            f"/api/teams/{test_team.id}/documents?project_id={sibling.id}",
            f"/api/issues?project_id={sibling.id}",
        ):
            assert (await client.get(path, headers=headers)).status_code == 403, path

    async def test_own_project_under_another_team(self, client, proj_agent, test_project):
        # Project access alone ignores the team, so the URL's team must be
        # pinned to the project: no reading another team through its key.
        _, headers = proj_agent
        other = await OxydeTeam.objects.create(name="Other", key="OTH")
        for path in (
            f"/api/issues/search?team_id={other.id}&q=x&project_id={test_project.id}",
            f"/api/issues/activities?team_id={other.id}&project_id={test_project.id}",
        ):
            assert (await client.get(path, headers=headers)).status_code == 404, path
        listed = await client.get(f"/api/teams/{other.id}/documents?project_id={test_project.id}", headers=headers)
        assert listed.status_code == 200 and listed.json() == []
        assert (await client.get(f"/api/teams/{other.id}/projects", headers=headers)).status_code == 403

    async def test_team_level_document(self, client, proj_agent, test_document):
        _, headers = proj_agent
        assert (await client.get(f"/api/documents/{test_document.id}", headers=headers)).status_code == 403
        assert (await client.delete(f"/api/documents/{test_document.id}", headers=headers)).status_code == 403

    async def test_create_project(self, client, proj_agent, test_team):
        _, headers = proj_agent
        response = await client.post(
            f"/api/teams/{test_team.id}/projects", json={"name": "Rogue", "key": "ROG"}, headers=headers,
        )
        assert response.status_code == 403

    async def test_update_label(self, client, proj_agent, test_label):
        # A rename changes the label on every project's issues.
        _, headers = proj_agent
        response = await client.patch(f"/api/labels/{test_label.id}", json={"name": "Renamed"}, headers=headers)
        assert response.status_code == 403

    async def test_assignee_query_is_confined(self, client, proj_agent, test_project, sibling, test_user):
        # `issue mine` queries by assignee alone; that used to cover the team.
        agent, headers = proj_agent
        own = await _issue(test_project, 1, test_user.id, assignee_id=agent.id)
        await _issue(sibling, 1, test_user.id, assignee_id=agent.id)
        await _issue(sibling, 2, test_user.id, assignee_id=test_user.id)
        for assignee in (agent.id, test_user.id):
            response = await client.get(f"/api/issues?assignee_id={assignee}", headers=headers)
            assert response.status_code == 200
            ids = [i["id"] for i in response.json()]
            assert ids == ([own.id] if assignee == agent.id else [])


class TestPreserved:
    """What the agent needs for work in its own project."""

    async def test_team_directory(self, client, proj_agent, team_agent, test_team):
        agent, headers = proj_agent
        other_agent, _ = team_agent
        assert (await client.get(f"/api/teams/{test_team.id}", headers=headers)).status_code == 200
        members = await client.get(f"/api/teams/{test_team.id}/members", headers=headers)
        assert members.status_code == 200 and members.json()
        agents = await client.get(f"/api/teams/{test_team.id}/agents", headers=headers)
        assert agents.status_code == 200
        assert {agent.id, other_agent.id} <= {a["id"] for a in agents.json()}
        assert (await client.get(f"/api/agents/{other_agent.id}", headers=headers)).status_code == 200

    async def test_project_list_is_confined(self, client, proj_agent, test_team, test_project, sibling):
        _, headers = proj_agent
        response = await client.get(f"/api/teams/{test_team.id}/projects", headers=headers)
        assert response.status_code == 200
        assert [p["id"] for p in response.json()] == [test_project.id]
        skipped = await client.get(f"/api/teams/{test_team.id}/projects?skip=1", headers=headers)
        assert skipped.json() == []

    async def test_labels(self, client, proj_agent, test_team, test_label):
        _, headers = proj_agent
        listed = await client.get(f"/api/teams/{test_team.id}/labels", headers=headers)
        assert listed.status_code == 200 and test_label.id in {lb["id"] for lb in listed.json()}
        assert (await client.get(f"/api/labels/{test_label.id}", headers=headers)).status_code == 200
        created = await client.post(f"/api/teams/{test_team.id}/labels", json={"name": "agent-made"}, headers=headers)
        assert created.status_code in (200, 201), created.text

    async def test_project_filtered_reads(self, client, proj_agent, test_team, test_project, sibling, test_user):
        agent, headers = proj_agent
        own = await _issue(test_project, 1, test_user.id)
        await _issue(sibling, 1, test_user.id)
        listed = await client.get(f"/api/issues?project_id={test_project.id}", headers=headers)
        assert [i["id"] for i in listed.json()] == [own.id]
        found = await client.get(
            f"/api/issues/search?team_id={test_team.id}&q=issue&project_id={test_project.id}", headers=headers,
        )
        assert found.status_code == 200 and [i["id"] for i in found.json()] == [own.id]
        feed = await client.get(
            f"/api/issues/activities?team_id={test_team.id}&project_id={test_project.id}", headers=headers,
        )
        assert feed.status_code == 200
        ready = await client.get(f"/api/projects/{test_project.id}/issues/ready", headers=headers)
        assert ready.status_code == 200

    async def test_own_project_documents(self, client, proj_agent, test_team, test_project):
        agent, headers = proj_agent
        created = await client.post(
            f"/api/teams/{test_team.id}/documents",
            json={"title": "Notes", "icon": "📝", "project_id": test_project.id}, headers=headers,
        )
        assert created.status_code == 201, created.text
        doc_id = created.json()["id"]
        await OxydeDocument.objects.create(team_id=test_team.id, author_id=agent.id, title="Global")
        listed = await client.get(f"/api/teams/{test_team.id}/documents?project_id={test_project.id}", headers=headers)
        assert [d["id"] for d in listed.json()] == [doc_id]
        assert (await client.delete(f"/api/documents/{doc_id}", headers=headers)).status_code == 204

    async def test_team_scoped_agent_keeps_team_wide_access(self, client, team_agent, test_team, sibling):
        _, headers = team_agent
        for path in (
            f"/api/issues?team_id={test_team.id}",
            f"/api/issues/activities?team_id={test_team.id}",
            f"/api/teams/{test_team.id}/documents",
        ):
            assert (await client.get(path, headers=headers)).status_code == 200, path
        projects = await client.get(f"/api/teams/{test_team.id}/projects", headers=headers)
        assert sibling.id in {p["id"] for p in projects.json()}

    async def test_human_member_unchanged(self, client, auth_headers, test_team, test_project):
        for path in (
            f"/api/issues?team_id={test_team.id}",
            f"/api/issues/search?team_id={test_team.id}&q=x&project_id={test_project.id}",
            f"/api/issues/activities?team_id={test_team.id}&project_id={test_project.id}",
            f"/api/teams/{test_team.id}/documents?project_id={test_project.id}",
        ):
            assert (await client.get(path, headers=auth_headers)).status_code == 200, path


class TestMcp:
    """The HTTP /mcp: resolve_team refuses, resolve_member_team confines."""

    @pytest_asyncio.fixture
    async def as_agent(self, proj_agent):
        token = context.current_mcp_principal.set(api_key_principal(proj_agent[0]))
        yield proj_agent[0]
        context.current_mcp_principal.reset(token)

    async def test_team_wide_tools_refused(self, as_agent, test_team):
        for result in (
            await tools.activity_recent(),
            await tools.issue_list(all_projects=True),
            await tools.doc_list(all_projects=True),
            await tools.issue_list(all_projects=True, team=test_team.key),
        ):
            assert result["error"]["error_code"] == "tool_input", result
            assert "scoped to a single project" in result["error"]["message"]

    async def test_project_tools_and_directory_work(self, as_agent, test_team, test_project, test_label):
        assert "error" not in await tools.activity_recent(project=test_project.key)
        assert "error" not in await tools.issue_list()
        labels = await tools.label_list()
        assert test_label.id in {lb["id"] for lb in labels["labels"]}
        assert "error" not in await tools.label_list(team=test_team.key)
        assert "error" not in await tools.inbox_list(team=test_team.key)
        projects = await tools.project_list()
        assert [p["id"] for p in projects["projects"]] == [test_project.id]

    async def test_member_team_refuses_another_team(self, as_agent):
        await OxydeTeam.objects.create(name="Other", key="OTH")
        result = await tools.label_list(team="OTH")
        assert result["error"]["error_code"] == "tool_input"

    async def test_document_lookup_is_confined(self, as_agent, test_team, test_project, sibling, test_user):
        # A title in a sibling project neither resolves nor counts toward
        # "multiple documents match".
        await OxydeDocument.objects.create(team_id=test_team.id, project_id=sibling.id, author_id=test_user.id, title="Plan")
        await OxydeDocument.objects.create(team_id=test_team.id, author_id=test_user.id, title="Plan")
        assert "No document found" in (await tools.doc_view("Plan"))["error"]["message"]
        mine = await OxydeDocument.objects.create(
            team_id=test_team.id, project_id=test_project.id, author_id=as_agent.id, title="Plan",
        )
        assert (await tools.doc_view("Plan"))["id"] == mine.id
