"""The live feed is filtered per socket by its principal's reach (CHT-1840).

/ws refuses agents (``app.ws_auth.authenticate``), and until CHT-1840 that
refusal was the only thing keeping a project-scoped principal off the
team-wide fan-out: every broadcast went to every socket in the team. These
tests take that refusal away (or seat a confined socket directly) and
check that a socket confined to one project still receives that project's
events and nothing else. They fail if the manager goes back to sending
every team message to every socket, if a call site tags its event with
the wrong project (or none), or if a socket can be registered without a
recorded reach.
"""
import asyncio
import inspect

import pytest
from unittest.mock import AsyncMock

import app.websocket as websocket_module
from app import ws_auth
from app.api.deps import can_read_team_data, is_in_team_directory
from app.auth.credentials import ws_resolver
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.team import OxydeTeam
from app.oxyde_models.user import OxydeUser
from app.websocket import ConnectionManager, SocketOwner, manager
from tests.test_ws_auth import FakeWebSocket, jwt_for, key_for, no_recheck, run_endpoint  # noqa: F401 (a fixture)


def _ws():
    ws = AsyncMock()
    ws.accept = AsyncMock()
    ws.send_json = AsyncMock()
    return ws


def _sent(ws) -> list[dict]:
    return [call.args[0] for call in ws.send_json.await_args_list]


class TestManagerFiltersByReach:
    async def test_a_confined_socket_gets_only_its_own_projects_messages(self):
        m = ConnectionManager()
        wide, mine, sibling = _ws(), _ws(), _ws()
        await m.connect(wide, "t1", owner=SocketOwner(team_id="t1", user_id="u", project_id=None))
        await m.connect(mine, "t1", owner=SocketOwner(team_id="t1", user_id="a", project_id="p1"))
        await m.connect(sibling, "t1", owner=SocketOwner(team_id="t1", user_id="b", project_id="p2"))

        own = {"type": "created", "entity": "issue", "data": {}, "project_id": "p1"}
        other = {"type": "created", "entity": "issue", "data": {}, "project_id": "p2"}
        team_level = {"type": "created", "entity": "document", "data": {}, "project_id": None}
        untagged = {"type": "created", "entity": "issue", "data": {}}
        for message in (own, other, team_level, untagged):
            await m.broadcast_to_team("t1", message)

        assert _sent(wide) == [own, other, team_level, untagged]
        assert _sent(mine) == [own]
        assert _sent(sibling) == [other]

    async def test_a_socket_with_no_recorded_owner_gets_nothing(self):
        """Fail closed: a socket in the team set with no owner (registered
        by anything but connect) is sent nothing, not everything."""
        m = ConnectionManager()
        ws = _ws()
        m.active_connections["t1"] = {ws}
        await m.broadcast_to_team("t1", {"type": "x", "project_id": None})
        ws.send_json.assert_not_awaited()

    async def test_inbox_events_never_reach_a_confined_socket(self, monkeypatch):
        m = ConnectionManager()
        monkeypatch.setattr(websocket_module, "manager", m)
        wide, confined = _ws(), _ws()
        await m.connect(wide, "t1", owner=SocketOwner(team_id="t1", user_id="u", project_id=None))
        await m.connect(confined, "t1", owner=SocketOwner(team_id="t1", user_id="a", project_id="p1"))
        await websocket_module.broadcast_inbox_event("t1", "created", {"recipient_user_id": "u"})
        assert len(_sent(wide)) == 1
        confined.send_json.assert_not_awaited()


class TestReachIsRecorded:
    async def test_connect_requires_an_owner_for_the_same_team(self):
        m = ConnectionManager()
        ws = _ws()
        with pytest.raises(TypeError):
            await m.connect(ws, "t1")  # the missing owner is the point
        with pytest.raises(ValueError):
            await m.connect(ws, "t1", owner=None)
        with pytest.raises(ValueError):
            await m.connect(ws, "t1", owner=SocketOwner(team_id="t2", user_id="u", project_id=None))
        ws.accept.assert_not_awaited()
        assert m.active_connections == {} and m.owners == {}

    def test_an_owner_cannot_be_built_without_a_reach(self):
        with pytest.raises(TypeError):
            SocketOwner(team_id="t1", user_id="u")

    async def test_of_records_each_principals_reach(self, test_user, test_team, test_project):
        team_agent = await OxydeUser.objects.create(
            email="tbot@example.com", hashed_password="x", name="tbot", is_agent=True,
            parent_user_id=test_user.id, agent_team_id=test_team.id,
        )
        project_agent = await OxydeUser.objects.create(
            email="pbot@example.com", hashed_password="x", name="pbot", is_agent=True,
            parent_user_id=test_user.id, agent_team_id=test_team.id, agent_project_id=test_project.id,
        )
        other_team = await OxydeTeam.objects.create(name="Other", key="OTH")

        async def owner_for(user, team_id):
            _row, raw = await key_for(user, holder=test_user)
            return SocketOwner.of(team_id, await ws_resolver.resolve(raw))

        assert (await owner_for(test_user, test_team.id)).project_id is None
        assert (await owner_for(team_agent, test_team.id)).project_id is None
        assert (await owner_for(project_agent, test_team.id)).project_id == test_project.id
        # An agent on a team that is not its own has no reach there at all.
        with pytest.raises(ValueError):
            await owner_for(team_agent, other_team.id)


def test_every_project_scoped_broadcast_must_name_its_project():
    """A new broadcast_*_event, or a call site that forgets which project
    its event belongs to, fails with a TypeError rather than defaulting
    to team-level (which a confined socket would miss) or to untagged."""
    names = [n for n in dir(websocket_module) if n.startswith("broadcast_") and n.endswith("_event")]
    assert len(names) >= 9
    for name in names:
        params = inspect.signature(getattr(websocket_module, name)).parameters
        if name == "broadcast_inbox_event":
            assert "project_id" not in params  # team-level by definition
            continue
        project_id = params["project_id"]
        assert project_id.kind is inspect.Parameter.KEYWORD_ONLY, name
        assert project_id.default is inspect.Parameter.empty, name


@pytest.fixture
def relaxed_ws_auth(monkeypatch):
    """/ws with the agent refusal taken away: the plausible relaxation
    (project agents allowed on the feed of their team's directory),
    which is exactly what CHT-1840 must survive."""

    async def relaxed(token, team_id):
        try:
            principal = await ws_resolver.resolve(token)
        except Exception as exc:
            raise ws_auth.WsRefused(ws_auth.CLOSE_UNAUTHENTICATED, str(exc)) from None
        user = principal.user
        if not (await can_read_team_data(user, team_id) or await is_in_team_directory(user, team_id)):
            raise ws_auth.WsRefused(ws_auth.CLOSE_FORBIDDEN, "no")
        return principal

    monkeypatch.setattr(ws_auth, "authenticate", relaxed)


@pytest.mark.usefixtures("no_recheck", "relaxed_ws_auth")
class TestWithoutTheAgentRefusal:
    async def test_a_project_agent_hears_only_its_project(
        self, client, auth_headers, test_user, test_team, test_project,
    ):
        sibling = await OxydeProject.objects.create(team_id=test_team.id, name="Sibling", key="SIB")
        agent = await OxydeUser.objects.create(
            email="pbot@example.com", hashed_password="x", name="pbot", is_agent=True,
            parent_user_id=test_user.id, agent_team_id=test_team.id, agent_project_id=test_project.id,
        )
        _row, agent_key = await key_for(agent, holder=test_user)
        _row, human_key = await key_for(test_user)

        agent_ws = FakeWebSocket(headers={"Authorization": f"Bearer {agent_key}"})
        human_ws = FakeWebSocket(headers={"Authorization": f"Bearer {human_key}"})
        tasks = [await run_endpoint(agent_ws, test_team.id), await run_endpoint(human_ws, test_team.id)]
        try:
            assert manager.owners[agent_ws].project_id == test_project.id
            assert manager.owners[human_ws].project_id is None

            for project in (test_project, sibling):
                r = await client.post(
                    f"/api/projects/{project.id}/issues", headers=auth_headers, json={"title": f"in {project.key}"},
                )
                assert r.status_code == 201, r.text
                issue_id = r.json()["id"]
                r = await client.post(
                    f"/api/issues/{issue_id}/comments", headers=auth_headers, json={"content": "hi"},
                )
                assert r.status_code == 201, r.text
                r = await client.post(f"/api/projects/{project.id}/sprints", headers=auth_headers)
                assert r.status_code == 200, r.text
                r = await client.post(
                    f"/api/teams/{test_team.id}/documents", headers=auth_headers,
                    json={"title": f"doc {project.key}", "content": "x", "project_id": project.id},
                )
                assert r.status_code == 201, r.text
                r = await client.patch(f"/api/issues/{issue_id}", headers=auth_headers, json={"title": "renamed"})
                assert r.status_code == 200, r.text
                r = await client.delete(f"/api/issues/{issue_id}", headers=auth_headers)
                assert r.status_code == 204, r.text
            r = await client.post(
                f"/api/teams/{test_team.id}/documents", headers=auth_headers,
                json={"title": "team doc", "content": "x"},
            )
            assert r.status_code == 201, r.text
        finally:
            for ws in (agent_ws, human_ws):
                await ws.close()
            await asyncio.gather(*tasks)

        heard = _sent(agent_ws)
        everything = _sent(human_ws)
        # The human heard both projects and the team document.
        assert {m["project_id"] for m in everything} == {test_project.id, sibling.id, None}
        # The agent heard exactly the human's messages for its project.
        assert heard == [m for m in everything if m["project_id"] == test_project.id]
        assert {m["entity"] for m in heard} >= {"issue", "comment", "activity", "sprint", "document"}
        # And each message is tagged with the project its payload is about.
        for m in everything:
            data = m["data"]
            if m["entity"] in ("issue", "sprint", "document") and "project_id" in data:
                assert data["project_id"] == m["project_id"], m

    async def test_an_agent_outside_the_team_is_refused_not_fanned_out(self, test_user, test_team, monkeypatch):
        """With the directory check relaxed too, an agent whose reach
        cannot be recorded on this team is refused at connect (4003)."""

        async def anyone(token, team_id):
            return await ws_resolver.resolve(token)

        monkeypatch.setattr(ws_auth, "authenticate", anyone)
        other = await OxydeTeam.objects.create(name="Other", key="OTH")
        agent = await OxydeUser.objects.create(
            email="obot@example.com", hashed_password="x", name="obot", is_agent=True,
            parent_user_id=test_user.id, agent_team_id=other.id,
        )
        raw = jwt_for(agent)  # a key would need a holder in the other team
        ws = FakeWebSocket(headers={"Authorization": f"Bearer {raw}"})
        task = await run_endpoint(ws, test_team.id)
        await asyncio.wait_for(task, 5)
        ws.close.assert_awaited_once_with(code=4003)
        assert ws not in manager.owners
