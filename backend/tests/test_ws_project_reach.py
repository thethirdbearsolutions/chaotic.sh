"""The live feed is filtered per socket by its principal's reach (CHT-1840).

/ws refuses agents (``app.ws_auth.authenticate``), and until CHT-1840 that
refusal was the only thing keeping a project-scoped principal off the
team-wide fan-out: every broadcast went to every socket in the team. These
tests take that refusal away (or seat a confined socket directly) and
check that a socket confined to one project still receives that project's
events and nothing else, and that an inbox event reaches its recipient's
sockets only. They fail if the manager goes back to sending every team
message to every socket, or if a socket can be registered without a
recorded reach. That each call site tags its event with the right
project is checked by ``test_ws_broadcast_tags.py``.
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

    async def test_an_inbox_event_reaches_its_recipients_sockets_only(self, monkeypatch):
        m = ConnectionManager()
        monkeypatch.setattr(websocket_module, "manager", m)
        mine, mine_too, theirs, confined = _ws(), _ws(), _ws(), _ws()
        await m.connect(mine, "t1", owner=SocketOwner(team_id="t1", user_id="u", project_id=None))
        await m.connect(mine_too, "t1", owner=SocketOwner(team_id="t1", user_id="u", project_id=None))
        await m.connect(theirs, "t1", owner=SocketOwner(team_id="t1", user_id="v", project_id=None))
        await m.connect(confined, "t1", owner=SocketOwner(team_id="t1", user_id="a", project_id="p1"))
        for recipient in ("u", "a"):
            await websocket_module.broadcast_inbox_event(
                "t1", "created", {"recipient_user_id": recipient}, recipient_user_id=recipient,
            )
        assert len(_sent(mine)) == 1 and len(_sent(mine_too)) == 1
        theirs.send_json.assert_not_awaited()
        confined.send_json.assert_not_awaited()  # team-level, so not even its own

    async def test_a_relation_reaches_a_confined_socket_only_within_its_project(self, monkeypatch):
        m = ConnectionManager()
        monkeypatch.setattr(websocket_module, "manager", m)
        wide, p1, p2 = _ws(), _ws(), _ws()
        await m.connect(wide, "t1", owner=SocketOwner(team_id="t1", user_id="u", project_id=None))
        await m.connect(p1, "t1", owner=SocketOwner(team_id="t1", user_id="a", project_id="p1"))
        await m.connect(p2, "t1", owner=SocketOwner(team_id="t1", user_id="b", project_id="p2"))
        await websocket_module.broadcast_relation_event("t1", "created", {"n": 1}, project_ids=["p1", "p1"])
        await websocket_module.broadcast_relation_event("t1", "created", {"n": 2}, project_ids=["p1", "p2"])
        assert [m_["data"]["n"] for m_ in _sent(wide)] == [1, 2]
        assert [m_["data"]["n"] for m_ in _sent(p1)] == [1]
        p2.send_json.assert_not_awaited()
        assert _sent(wide)[1]["project_id"] is None  # across projects: no single one

    async def test_a_document_leaving_a_project_is_deleted_for_its_confined_sockets_only(self, monkeypatch):
        m = ConnectionManager()
        monkeypatch.setattr(websocket_module, "manager", m)
        wide, p1 = _ws(), _ws()
        await m.connect(wide, "t1", owner=SocketOwner(team_id="t1", user_id="u", project_id=None))
        await m.connect(p1, "t1", owner=SocketOwner(team_id="t1", user_id="a", project_id="p1"))
        await websocket_module.broadcast_document_left_project("t1", {"id": "d"}, project_id="p1")
        wide.send_json.assert_not_awaited()
        assert [(x["type"], x["entity"]) for x in _sent(p1)] == [("deleted", "document")]


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
        # An agent on a team that is not its own has no reach there at
        # all, whatever its scope.
        with pytest.raises(ValueError):
            await owner_for(team_agent, other_team.id)
        with pytest.raises(ValueError):
            await owner_for(project_agent, other_team.id)


def test_every_broadcast_must_say_who_may_hear_it():
    """A new broadcast_*_event, or a call site that forgets where its
    event belongs, fails with a TypeError rather than defaulting to
    team-level or untagged: project events name their project, relations
    both projects, inbox events their recipient (CHT-1840)."""
    names = [n for n in dir(websocket_module) if n.startswith("broadcast_") and n.endswith("_event")]
    assert len(names) >= 9
    routing = {"broadcast_inbox_event": "recipient_user_id", "broadcast_relation_event": "project_ids"}
    for name in names:
        params = inspect.signature(getattr(websocket_module, name)).parameters
        key = params[routing.get(name, "project_id")]
        assert key.kind is inspect.Parameter.KEYWORD_ONLY, name
        assert key.default is inspect.Parameter.empty, name


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


@pytest.mark.usefixtures("no_recheck")
class TestInboxGoesToItsRecipientOnly:
    async def test_bob_does_not_hear_carols_mention(self, client, auth_headers, test_user, test_team, test_issue):
        """CHT-1840 (PR #452 review, 1): inbox events used to reach every
        socket in the team, so any member could read every other
        member's inbox traffic off /ws. Three humans, real sockets."""
        from app.enums import TeamRole
        from app.oxyde_models.team import OxydeTeamMember
        from app.utils.security import get_password_hash

        people = {}
        for name in ("Bob", "Carol"):
            people[name] = await OxydeUser.objects.create(
                email=f"{name.lower()}@example.com", hashed_password=get_password_hash("x"), name=name,
            )
            await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=people[name].id, role=TeamRole.MEMBER)
        sockets, tasks = {}, []
        for name, user in (("Alice", test_user), *people.items()):
            sockets[name] = FakeWebSocket(headers={"Authorization": f"Bearer {jwt_for(user)}"})
            tasks.append(await run_endpoint(sockets[name], test_team.id))
        try:
            r = await client.post(
                f"/api/issues/{test_issue.id}/comments", headers=auth_headers,
                json={"content": "ping @carol please review"},
            )
            assert r.status_code == 201, r.text
            carol_headers = {"Authorization": f"Bearer {jwt_for(people['Carol'])}"}
            r = await client.get("/api/inbox", headers=carol_headers, params={"team_id": test_team.id})
            assert r.status_code == 200, r.text
            entry_id = r.json()[0]["id"]
            for path in (f"/api/inbox/{entry_id}/read", f"/api/inbox/{entry_id}/archive"):
                r = await client.post(path, headers=carol_headers)
                assert r.status_code == 200, r.text
            r = await client.post("/api/inbox/mark-all-read", headers=auth_headers, params={"team_id": test_team.id})
            assert r.status_code == 200, r.text
        finally:
            for ws in sockets.values():
                await ws.close()
            await asyncio.gather(*tasks)

        def inbox(name):
            return [m for m in _sent(sockets[name]) if m["entity"] == "inbox"]

        carols = inbox("Carol")
        assert [m["type"] for m in carols] == ["created", "read", "archived"]
        assert all(m["data"]["recipient_user_id"] == people["Carol"].id for m in carols)
        assert carols[0]["data"]["kind"] == "mention"  # the wire value, as on REST
        assert inbox("Bob") == [] and inbox("Alice") == []
        # Bob still hears the comment itself.
        assert any(m["entity"] == "comment" for m in _sent(sockets["Bob"]))

    async def test_mark_all_read_goes_to_its_reader_only(self, client, auth_headers, test_user, test_team):
        from unittest.mock import patch

        sent = []

        async def capture(team_id, message):
            sent.append(message)

        with patch.object(manager, "broadcast_to_team", side_effect=capture), \
                patch("app.api.inbox.InboxService.mark_all_read", AsyncMock(return_value=3)):
            r = await client.post("/api/inbox/mark-all-read", headers=auth_headers, params={"team_id": test_team.id})
        assert r.status_code == 200, r.text
        assert [(m["type"], m["recipient_user_id"]) for m in sent] == [("read-all", test_user.id)]


@pytest.mark.usefixtures("no_recheck", "relaxed_ws_auth")
async def test_a_move_and_rename_never_shows_the_old_project_the_new_title(
    client, auth_headers, test_user, test_team, test_project,
):
    """PR #452 review: one PATCH that moves a document out of a project
    and renames it tells the old project's sockets it is gone, with the
    title they knew, and nothing of the new one."""
    sibling = await OxydeProject.objects.create(team_id=test_team.id, name="Sibling", key="SIB")
    agent = await OxydeUser.objects.create(
        email="pbot@example.com", hashed_password="x", name="pbot", is_agent=True,
        parent_user_id=test_user.id, agent_team_id=test_team.id, agent_project_id=test_project.id,
    )
    _row, agent_key = await key_for(agent, holder=test_user)
    r = await client.post(
        f"/api/teams/{test_team.id}/documents", headers=auth_headers,
        json={"title": "Old title", "content": "x", "project_id": test_project.id},
    )
    assert r.status_code == 201, r.text
    doc_id = r.json()["id"]

    agent_ws = FakeWebSocket(headers={"Authorization": f"Bearer {agent_key}"})
    human_ws = FakeWebSocket(headers={"Authorization": f"Bearer {jwt_for(test_user)}"})
    tasks = [await run_endpoint(agent_ws, test_team.id), await run_endpoint(human_ws, test_team.id)]
    try:
        r = await client.patch(
            f"/api/documents/{doc_id}", headers=auth_headers,
            json={"project_id": sibling.id, "title": "Secret new title", "content": "secret body"},
        )
        assert r.status_code == 200, r.text
    finally:
        for ws in (agent_ws, human_ws):
            await ws.close()
        await asyncio.gather(*tasks)

    heard = _sent(agent_ws)
    assert [(m["type"], m["entity"], m["data"]) for m in heard] == [
        ("deleted", "document", {"id": doc_id, "title": "Old title"}),
    ]
    assert "Secret" not in repr(heard) and "secret" not in repr(heard)
    # The team-wide socket hears the update, not a delete.
    assert [(m["type"], m["data"]["title"]) for m in _sent(human_ws)] == [("updated", "Secret new title")]
