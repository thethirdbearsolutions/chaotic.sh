"""Project access reads the team from the project row (CHT-1807).

``check_user_project_access`` used to take ``(user, project_id, team_id)``
and trust the ``team_id``: for a human or a team-scoped agent it checked
membership of *that* team, not of the project's, and for a project-scoped
agent it ignored it. Four routes pass a URL ``team_id`` next to a query or
body ``project_id`` and had to pin the project to the team by hand. Now the
check takes the project row, and those routes load, check and pin the
project in one step with ``visible_project_in_team``.

One test per route, each with a project that belongs to another team, as
seen by three callers:

* ``both_teams``: a person in team A and team B. The project in B is one
  they can see, so naming it under A is "not in this team".
* ``own_elsewhere``: a project-scoped agent of team A's project, naming its
  own project under team B's URL. It sees the project; the pin is what
  stops it.
* ``a_agent``: a team-scoped agent of team A, naming B's project under A.
  It cannot see the project, so the answer must be the one for a project
  that does not exist (CHT-1785).
* ``b_only``: a person in team B only, naming B's project (which they
  see) under team A's URL. They are not in team A, so the answer is the
  refusal for team A, the same as for a missing project, as before the
  pin moved into ``visible_project_in_team``.
"""
import ast
import inspect
import pathlib
import uuid
from types import SimpleNamespace

import pytest
import pytest_asyncio

from app.api import deps
from app.enums import TeamRole
from app.oxyde_models.document import OxydeDocument
from app.oxyde_models.issue import OxydeIssue
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.schemas.agent import AgentCreate
from app.services.agent_service import AgentService

@pytest_asyncio.fixture
async def world(db, test_user, test_user2, test_team, test_project, auth_headers, auth_headers2):
    """Team A (test_team, PROJ) and team B (QQQ), both with an issue and a
    project document matching "secret"; test_user is in both."""
    team_b = await OxydeTeam.objects.create(name="Team B", key="TB")
    await OxydeTeamMember.objects.create(team_id=team_b.id, user_id=test_user.id, role=TeamRole.MEMBER)
    await OxydeTeamMember.objects.create(team_id=team_b.id, user_id=test_user2.id, role=TeamRole.MEMBER)
    project_b = await OxydeProject.objects.create(team_id=team_b.id, name="Q", key="QQQ")
    for project in (test_project, project_b):
        await OxydeIssue.objects.create(
            project_id=project.id, identifier=f"{project.key}-1", number=1,
            title=f"{project.key} secret", creator_id=test_user.id,
        )
        await OxydeDocument.objects.create(
            team_id=project.team_id, project_id=project.id, author_id=test_user.id,
            title=f"{project.key} secret doc", content="secret",
        )
    proj_agent, proj_key, _ = await AgentService().create(
        AgentCreate(name="Proj Bot"), test_user, test_team.id, project_id=test_project.id,
    )
    a_agent, a_key, _ = await AgentService().create(AgentCreate(name="A Bot"), test_user, test_team.id)
    return {
        "team_a": test_team.id, "team_b": team_b.id,
        "project_a": test_project.id, "project_b": project_b.id,
        # caller -> (headers, URL team, project named)
        "both_teams": (auth_headers, test_team.id, project_b.id),
        "own_elsewhere": ({"Authorization": f"Bearer {proj_key}"}, team_b.id, test_project.id),
        "a_agent": ({"Authorization": f"Bearer {a_key}"}, test_team.id, project_b.id),
        "b_only": (auth_headers2, test_team.id, project_b.id),
    }


async def _same_as_missing(client, call, headers, team, project):
    """``call(team, project)`` answers exactly as it does for a project id
    that does not exist; returns that response."""
    response = await call(team, project)
    missing = await call(team, str(uuid.uuid4()))
    assert (response.status_code, response.json()) == (missing.status_code, missing.json())
    return response


@pytest.mark.asyncio
class TestSearchIssues:
    async def test_project_of_another_team(self, client, world):
        def call(headers):
            async def go(team, project):
                return await client.get(
                    f"/api/issues/search?team_id={team}&q=secret&project_id={project}", headers=headers,
                )
            return go

        for caller in ("both_teams", "own_elsewhere"):
            headers, team, project = world[caller]
            response = await call(headers)(team, project)
            assert response.status_code == 404, (caller, response.text)
            assert response.json() == {"detail": "Project not found in this team"}

        for caller in ("a_agent", "b_only"):
            headers, team, project = world[caller]
            response = await _same_as_missing(client, call(headers), headers, team, project)
            assert response.status_code == 403, (caller, response.text)


@pytest.mark.asyncio
class TestTeamActivities:
    async def test_project_of_another_team(self, client, world):
        def call(headers):
            async def go(team, project):
                return await client.get(
                    f"/api/issues/activities?team_id={team}&project_id={project}", headers=headers,
                )
            return go

        for caller in ("both_teams", "own_elsewhere"):
            headers, team, project = world[caller]
            response = await call(headers)(team, project)
            assert response.status_code == 404, (caller, response.text)
            assert response.json() == {"detail": "Project not found"}

        for caller in ("a_agent", "b_only"):
            headers, team, project = world[caller]
            response = await _same_as_missing(client, call(headers), headers, team, project)
            assert response.status_code == 403, (caller, response.text)


@pytest.mark.asyncio
class TestListDocuments:
    async def test_project_of_another_team(self, client, world):
        def call(headers):
            async def go(team, project):
                return await client.get(f"/api/teams/{team}/documents?project_id={project}", headers=headers)
            return go

        # A project the caller sees, named under another team, lists
        # nothing: neither team's documents.
        for caller in ("both_teams", "own_elsewhere"):
            headers, team, project = world[caller]
            response = await call(headers)(team, project)
            assert response.status_code == 200 and response.json() == [], (caller, response.text)

        for caller in ("a_agent", "b_only"):
            headers, team, project = world[caller]
            response = await _same_as_missing(client, call(headers), headers, team, project)
            assert response.status_code == 403, (caller, response.text)

        # The same filter under the project's own team still lists.
        headers, _, _ = world["both_teams"]
        listed = await call(headers)(world["team_b"], world["project_b"])
        assert [d["title"] for d in listed.json()] == ["QQQ secret doc"]


@pytest.mark.asyncio
class TestCreateDocument:
    async def test_project_of_another_team(self, client, world):
        def call(headers):
            async def go(team, project):
                return await client.post(
                    f"/api/teams/{team}/documents", headers=headers,
                    json={"title": "planted", "content": "x", "icon": "x", "project_id": project},
                )
            return go

        for caller in ("both_teams", "own_elsewhere", "a_agent", "b_only"):
            headers, team, project = world[caller]
            response = await _same_as_missing(client, call(headers), headers, team, project)
            assert response.status_code == 400, (caller, response.text)
            assert response.json() == {"detail": "Project not found in this team"}
        assert await OxydeDocument.objects.filter(title="planted").count() == 0


class TestTheCheckTakesARow:
    """The unsafe form cannot be written again."""

    def test_signature(self):
        assert list(inspect.signature(deps.check_user_project_access).parameters) == ["user", "project"]

    @pytest.mark.asyncio
    async def test_anything_but_a_project_row_is_refused(self, db, test_user, test_project, test_team):
        with pytest.raises(TypeError):
            await deps.check_user_project_access(test_user, test_project.id)
        with pytest.raises(TypeError):
            await deps.check_user_project_access(test_user, test_project.id, test_team.id)
        with pytest.raises(TypeError):
            await deps.check_user_project_access(test_user, None)
        # Rows shaped like a project (``id`` and ``team_id``) are not one:
        # a document row is the realistic mistake.
        document = OxydeDocument(team_id=test_team.id, project_id=test_project.id, author_id=test_user.id,
                                 title="d", content="")
        with pytest.raises(TypeError):
            await deps.check_user_project_access(test_user, document)
        with pytest.raises(TypeError):
            await deps.check_user_project_access(
                test_user, SimpleNamespace(id=test_project.id, team_id=test_team.id),
            )

    @pytest.mark.asyncio
    async def test_team_comes_from_the_row(self, db, test_user, test_team, test_project):
        # test_user is in test_team only: a project of another team is
        # refused whatever team the caller has in hand.
        other = await OxydeTeam.objects.create(name="Other", key="OTH")
        foreign = await OxydeProject.objects.create(team_id=other.id, name="F", key="FFF")
        assert await deps.check_user_project_access(test_user, test_project) is True
        assert await deps.check_user_project_access(test_user, foreign) is False

    def test_no_call_passes_a_third_argument(self):
        app_dir = pathlib.Path(deps.__file__).resolve().parents[1]
        offenders = []
        for path in app_dir.rglob("*.py"):
            for node in ast.walk(ast.parse(path.read_text())):
                if isinstance(node, ast.Call):
                    func = node.func
                    name = func.attr if isinstance(func, ast.Attribute) else getattr(func, "id", None)
                    if name == "check_user_project_access" and len(node.args) + len(node.keywords) != 2:
                        offenders.append(f"{path}:{node.lineno}")
        assert offenders == []


@pytest.mark.asyncio
class TestOtherPins:
    """The two routes that pinned by hand between two row values now go
    through the same helper (CHT-1807 review)."""

    async def test_template_from_project_of_another_team(self, client, world):
        headers, team, project = world["both_teams"]  # test_user owns team A
        response = await client.post(
            f"/api/teams/{team}/templates/from-project", headers=headers,
            json={"name": "t", "project_id": project},
        )
        assert response.status_code == 400
        assert response.json() == {"detail": "Project belongs to a different team"}

    async def test_template_from_unseen_project_is_missing(self, client, world, test_user2, auth_headers2):
        # test_user2 owns a team of its own, and cannot see team A's project.
        own = await OxydeTeam.objects.create(name="Own", key="OWN")
        await OxydeTeamMember.objects.create(team_id=own.id, user_id=test_user2.id, role=TeamRole.OWNER)

        async def call(project):
            return await client.post(
                f"/api/teams/{own.id}/templates/from-project", headers=auth_headers2,
                json={"name": "t", "project_id": project},
            )

        response = await call(world["project_a"])
        missing = await call(str(uuid.uuid4()))
        assert (response.status_code, response.json()) == (missing.status_code, missing.json())
        assert response.status_code == 404

    async def test_move_document_to_project_of_another_team(self, client, world, auth_headers):
        doc = await OxydeDocument.objects.filter(title="PROJ secret doc").first()
        response = await client.patch(
            f"/api/documents/{doc.id}", headers=auth_headers, json={"project_id": world["project_b"]},
        )
        assert response.status_code == 400
        assert response.json() == {"detail": "Project not found in this team"}
        assert (await OxydeDocument.objects.get(id=doc.id)).project_id == world["project_a"]
