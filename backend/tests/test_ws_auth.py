"""/ws authentication (CHT-1110, CHT-1567, CHT-1603).

/ws resolves its credential through the shared CredentialResolver, takes
it from the Authorization header, a ``chaotic.bearer.<token>``
subprotocol entry or the deprecated ``?token=``, and re-checks it while
the socket is open. These drive ``app.main.websocket_endpoint`` with a
fake socket against real credentials; e2e/test_websocket_auth.py drives
the real handshake.
"""
import asyncio
import logging
from datetime import timedelta
from unittest.mock import AsyncMock, patch

import pytest
from starlette.datastructures import Headers
from starlette.websockets import WebSocketDisconnect

from app import ws_auth
from app.auth.credentials import CredentialKind, Principal, rest_resolver
from app.config import get_settings
from app.main import websocket_endpoint
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.schemas.api_key import APIKeyCreate
from app.services.api_key_service import APIKeyService
from app.utils.security import create_access_token
from app.ws_auth import WsRefused, authenticate, presented_credential, watch


class FakeWebSocket:
    """Enough of starlette's WebSocket for the endpoint: headers, the
    offered subprotocols, and a receive that blocks until closed."""

    def __init__(self, *, headers=None, subprotocols=None):
        self.headers = Headers(headers or {})
        self.scope = {"type": "websocket", "subprotocols": list(subprotocols or [])}
        self.accept = AsyncMock()
        self.send_json = AsyncMock()
        self._closed = asyncio.Event()
        self.close = AsyncMock(side_effect=lambda code=1000: self._closed.set())

    async def receive_text(self):
        await self._closed.wait()
        raise WebSocketDisconnect(code=1000)


def jwt_for(user, **kwargs) -> str:
    return create_access_token(data={"sub": user.id}, **kwargs)


async def key_for(user, holder=None):
    row, raw = await APIKeyService().create(user.id, APIKeyCreate(name="ws"), holder_user_id=(holder or user).id)
    return row, raw


async def refused_code(token, team_id) -> int:
    with pytest.raises(WsRefused) as exc:
        await authenticate(token, team_id)
    return exc.value.code


@pytest.fixture
def no_recheck(db, monkeypatch):
    """Long enough that the watcher never runs inside a test."""
    monkeypatch.setattr(get_settings(), "ws_auth_recheck_seconds", 3600)


async def run_endpoint(ws, team_id, token=None, *, until_accepted=True):
    """Start the endpoint; return its task once it has accepted (or
    finished). The caller closes the fake socket to end it."""
    task = asyncio.create_task(websocket_endpoint(ws, team_id=team_id, token=token))
    for _ in range(200):
        if ws.accept.await_count or task.done():
            break
        await asyncio.sleep(0.01)
    return task


class TestWhereTheCredentialComesFrom:
    def test_authorization_header(self):
        ws = FakeWebSocket(headers={"Authorization": "Bearer abc"})
        assert presented_credential(ws, None) == ws_auth.PresentedCredential("abc", None)

    def test_subprotocol_entry_selects_chaotic_and_never_echoes_the_token(self):
        ws = FakeWebSocket(subprotocols=["chaotic", "chaotic.bearer.abc"])
        presented = presented_credential(ws, None)
        assert presented.token == "abc"
        assert presented.subprotocol == "chaotic"

    def test_query_token_is_deprecated_and_warned_once(self, monkeypatch, caplog):
        monkeypatch.setattr(ws_auth, "_warned_query_token", False)
        with caplog.at_level(logging.WARNING, logger="app.ws_auth"):
            first = presented_credential(FakeWebSocket(), "abc")
            presented_credential(FakeWebSocket(), "abc")
        assert first.token == "abc"
        assert [r.getMessage() for r in caplog.records] == [ws_auth.QUERY_TOKEN_DEPRECATION]
        assert "abc" not in caplog.text

    def test_query_token_beside_another_source_is_warned_too(self, monkeypatch, caplog):
        """PR #352 review, finding 6: the URL leaks it whatever else came."""
        monkeypatch.setattr(ws_auth, "_warned_query_token", False)
        ws = FakeWebSocket(headers={"Authorization": "Bearer abc"})
        with caplog.at_level(logging.WARNING, logger="app.ws_auth"):
            assert presented_credential(ws, "abc").token == "abc"
        assert [r.getMessage() for r in caplog.records] == [ws_auth.QUERY_TOKEN_DEPRECATION]

    @pytest.mark.parametrize("authorization", ["Basic dXNlcjpwYXNz", "Bearer ", "Negotiate x"])
    def test_a_non_bearer_authorization_header_is_ignored(self, authorization):
        """PR #352 review, finding 3: cached HTTP auth or a proxy's header
        on the upgrade must not refuse a good subprotocol credential."""
        ws = FakeWebSocket(headers={"Authorization": authorization}, subprotocols=["chaotic", "chaotic.bearer.abc"])
        assert presented_credential(ws, None).token == "abc"
        assert presented_credential(FakeWebSocket(headers={"Authorization": authorization}), None).token is None

    def test_the_same_credential_in_two_places_is_fine(self):
        ws = FakeWebSocket(headers={"Authorization": "Bearer abc"}, subprotocols=["chaotic", "chaotic.bearer.abc"])
        assert presented_credential(ws, "abc").token == "abc"

    @pytest.mark.parametrize(
        "headers, subprotocols, query",
        [
            ({"Authorization": "Bearer abc"}, ["chaotic.bearer.xyz"], None),
            ({"Authorization": "Bearer abc"}, [], "xyz"),
            ({}, ["chaotic", "chaotic.bearer.abc", "chaotic.bearer.xyz"], None),
        ],
    )
    def test_refused_shapes(self, headers, subprotocols, query):
        with pytest.raises(WsRefused) as exc:
            presented_credential(FakeWebSocket(headers=headers, subprotocols=subprotocols), query)
        assert exc.value.code == 4001

    def test_nothing_presented(self):
        presented = presented_credential(FakeWebSocket(subprotocols=["chaotic"]), None)
        assert presented.token is None and presented.subprotocol == "chaotic"


class TestAuthenticate:
    async def test_session_jwt_and_api_keys_connect(self, test_user, test_team):
        assert (await authenticate(jwt_for(test_user), test_team.id)).kind is CredentialKind.SESSION_JWT
        _row, raw = await key_for(test_user)
        assert (await authenticate(raw, test_team.id)).kind is CredentialKind.API_KEY

    async def test_agents_are_refused_whatever_the_credential(self, test_user, test_team, test_project):
        """PR #352 review F1: the feed is team-wide and carries every
        recipient's inbox events, broader than REST gives an agent (a
        project-scoped one reads one project). Refused 4003, by key or JWT."""
        for email, project_id in (("bot@example.com", None), ("pbot@example.com", test_project.id)):
            agent = await OxydeUser.objects.create(
                email=email, hashed_password="x", name="bot", is_agent=True,
                parent_user_id=test_user.id, agent_team_id=test_team.id, agent_project_id=project_id,
            )
            _row, raw = await key_for(agent, holder=test_user)
            await rest_resolver.resolve(raw)  # a good credential on REST
            assert await refused_code(raw, test_team.id) == 4003
            assert await refused_code(jwt_for(agent), test_team.id) == 4003

    async def test_missing_malformed_and_unknown_are_4001(self, test_team):
        assert await refused_code(None, test_team.id) == 4001
        assert await refused_code("not-a-jwt", test_team.id) == 4001
        assert await refused_code("ck_" + "0" * 64, test_team.id) == 4001
        assert await refused_code(create_access_token(data={"exp": 9999999999}), test_team.id) == 4001

    async def test_expired_jwt_is_4001(self, test_user, test_team):
        token = jwt_for(test_user, expires_delta=timedelta(seconds=-1))
        assert await refused_code(token, test_team.id) == 4001

    async def test_revoked_key_is_4001(self, test_user, test_team):
        row, raw = await key_for(test_user)
        await APIKeyService().revoke(row, actor_id=test_user.id)
        assert await refused_code(raw, test_team.id) == 4001

    async def test_user_not_found_is_4001_as_on_rest(self, test_team):
        """CHT-1567's open question: it was 4003, and REST's 401 is 4001."""
        assert await refused_code(create_access_token(data={"sub": "ghost"}), test_team.id) == 4001

    async def test_inactive_user_is_4003(self, test_user, test_team):
        await OxydeUser.objects.filter(id=test_user.id).update(is_active=False)
        assert await refused_code(jwt_for(test_user), test_team.id) == 4003

    async def test_cross_team_subscription_is_4003(self, test_user, test_user2, test_team):
        """CHT-1110: a good credential for a team its user is not in."""
        other = await OxydeTeam.objects.create(name="Other", key="OTH")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user2.id, role="OWNER")
        assert await refused_code(jwt_for(test_user), other.id) == 4003
        assert await refused_code(jwt_for(test_user2), test_team.id) == 4003
        await authenticate(jwt_for(test_user2), other.id)

    async def test_a_human_oauth_session_is_accepted_and_an_agent_one_refused(self, test_user, test_team, monkeypatch):
        """No OAuth session acts as a human yet (CHT-1602); when one does,
        /ws takes it, under the scope rule. One acting as an agent never."""
        agent = await OxydeUser.objects.create(
            email="bot@example.com", hashed_password="x", name="bot", is_agent=True,
            parent_user_id=test_user.id, agent_team_id=test_team.id,
        )

        def as_principal(user, scopes):
            async def resolve(token):
                return Principal(user=user, holder_user_id=test_user.id, kind=CredentialKind.OAUTH_ACCESS,
                                 scopes=frozenset(scopes))
            monkeypatch.setattr(ws_auth.ws_resolver, "resolve", resolve)

        as_principal(test_user, {"chaotic:read"})
        assert (await authenticate("cat_x", test_team.id)).user.id == test_user.id
        as_principal(test_user, {"offline_access"})
        assert await refused_code("cat_x", test_team.id) == 4003
        as_principal(agent, {"chaotic:write"})
        assert await refused_code("cat_x", test_team.id) == 4003


@pytest.mark.usefixtures("no_recheck")
class TestEndpoint:
    async def test_header_credential_connects_without_a_subprotocol(self, test_user, test_team):
        ws = FakeWebSocket(headers={"Authorization": f"Bearer {jwt_for(test_user)}"})
        task = await run_endpoint(ws, test_team.id)
        ws.accept.assert_awaited_once_with(subprotocol=None)
        await ws.close()
        await task

    async def test_subprotocol_credential_connects_and_selects_chaotic(self, test_user, test_team):
        from app.websocket import manager

        _row, raw = await key_for(test_user)
        ws = FakeWebSocket(subprotocols=["chaotic", f"chaotic.bearer.{raw}"])
        task = await run_endpoint(ws, test_team.id)
        ws.accept.assert_awaited_once_with(subprotocol="chaotic")
        assert ws in manager.active_connections[test_team.id]
        await ws.close()
        await task
        assert ws not in manager.active_connections.get(test_team.id, set())

    async def test_old_query_path_still_connects(self, test_user, test_team):
        ws = FakeWebSocket()
        task = await run_endpoint(ws, test_team.id, token=jwt_for(test_user))
        ws.accept.assert_awaited_once_with(subprotocol=None)
        await ws.close()
        await task

    @pytest.mark.parametrize("make_token, code", [
        (lambda u: None, 4001),
        (lambda u: "garbage", 4001),
        (lambda u: jwt_for(u, expires_delta=timedelta(seconds=-5)), 4001),
    ])
    async def test_refused_before_accept(self, test_user, test_team, make_token, code):
        ws = FakeWebSocket()
        await websocket_endpoint(ws, team_id=test_team.id, token=make_token(test_user))
        ws.close.assert_awaited_once_with(code=code)
        ws.accept.assert_not_awaited()

    async def test_cross_team_refused_before_accept(self, test_user, test_team):
        other = await OxydeTeam.objects.create(name="Other", key="OTH")
        ws = FakeWebSocket(headers={"Authorization": f"Bearer {jwt_for(test_user)}"})
        await websocket_endpoint(ws, team_id=other.id)
        ws.close.assert_awaited_once_with(code=4003)
        ws.accept.assert_not_awaited()

    async def test_check_error_is_4011(self, test_team):
        ws = FakeWebSocket()
        with patch("app.ws_auth.authenticate", AsyncMock(side_effect=RuntimeError("db down"))):
            await websocket_endpoint(ws, team_id=test_team.id, token="x")
        ws.close.assert_awaited_once_with(code=4011)

    async def test_non_disconnect_exception_still_cleans_up_connection(self, test_user, test_team):
        """CHT-1225: receive_text() raising anything other than
        WebSocketDisconnect must still remove the connection."""
        ws = FakeWebSocket()
        ws.receive_text = AsyncMock(side_effect=RuntimeError("connection reset"))
        with patch("app.main.manager") as manager:
            manager.connect = AsyncMock()
            await websocket_endpoint(ws, team_id=test_team.id, token=jwt_for(test_user))
        manager.connect.assert_awaited_once()
        assert manager.connect.await_args.args == (ws, test_team.id)
        assert manager.connect.await_args.kwargs["subprotocol"] is None
        assert manager.connect.await_args.kwargs["owner"].user_id == test_user.id
        manager.disconnect.assert_called_with(ws, test_team.id)


class TestMidConnection:
    """The socket is closed when the credential stops being good."""

    @pytest.fixture(autouse=True)
    def fast_recheck(self, db, monkeypatch):
        monkeypatch.setattr(get_settings(), "ws_auth_recheck_seconds", 0.05)

    async def _closed_with(self, ws, task) -> int:
        await asyncio.wait_for(task, 5)
        return ws.close.await_args.kwargs["code"]

    async def test_revoked_key_closes_4001_and_stops_broadcasts(self, test_user, test_team):
        from app.websocket import manager

        row, raw = await key_for(test_user)
        ws = FakeWebSocket(headers={"Authorization": f"Bearer {raw}"})
        task = await run_endpoint(ws, test_team.id)
        assert ws in manager.active_connections[test_team.id]
        await APIKeyService().revoke(row, actor_id=test_user.id)
        assert await self._closed_with(ws, task) == 4001
        assert ws not in manager.active_connections.get(test_team.id, set())
        await manager.broadcast_to_team(test_team.id, {"type": "created", "entity": "issue", "data": {}})
        ws.send_json.assert_not_awaited()

    async def test_watcher_disconnect_during_a_broadcast(self, test_user, test_team):
        """PR #352 review, findings 1 and 5: the watcher removing a socket
        while a broadcast is awaiting a send must not break the broadcast
        (it raised "Set changed size during iteration", a 500 for the
        write that broadcast)."""
        from app.websocket import manager

        row, raw = await key_for(test_user)
        slow = FakeWebSocket(headers={"Authorization": f"Bearer {jwt_for(test_user)}"})
        revoked = FakeWebSocket(headers={"Authorization": f"Bearer {raw}"})

        async def slow_send(message):
            await asyncio.sleep(0.3)  # several re-checks happen meanwhile

        slow.send_json.side_effect = slow_send
        tasks = [await run_endpoint(slow, test_team.id), await run_endpoint(revoked, test_team.id)]
        await APIKeyService().revoke(row, actor_id=test_user.id)
        await manager.broadcast_to_team(test_team.id, {"type": "created", "entity": "issue", "data": {}})
        assert await self._closed_with(revoked, tasks[1]) == 4001
        slow.send_json.assert_awaited_once()
        await slow.close()
        await tasks[0]

    async def test_member_removed_closes_4003(self, test_user, test_user2, test_team):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role="MEMBER")
        ws = FakeWebSocket(subprotocols=["chaotic", f"chaotic.bearer.{jwt_for(test_user2)}"])
        task = await run_endpoint(ws, test_team.id)
        await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=test_user2.id).delete()
        assert await self._closed_with(ws, task) == 4003

    async def test_deactivated_user_closes_4003(self, test_user, test_team):
        ws = FakeWebSocket(headers={"Authorization": f"Bearer {jwt_for(test_user)}"})
        task = await run_endpoint(ws, test_team.id)
        await OxydeUser.objects.filter(id=test_user.id).update(is_active=False)
        assert await self._closed_with(ws, task) == 4003

    async def test_expiring_jwt_closes_4001(self, test_user, test_team):
        token = jwt_for(test_user, expires_delta=timedelta(seconds=1))
        ws = FakeWebSocket(headers={"Authorization": f"Bearer {token}"})
        task = await run_endpoint(ws, test_team.id)
        ws.accept.assert_awaited_once()
        assert await self._closed_with(ws, task) == 4001

    async def test_good_credential_stays_open(self, test_user, test_team):
        ws = FakeWebSocket(headers={"Authorization": f"Bearer {jwt_for(test_user)}"})
        task = await run_endpoint(ws, test_team.id)
        await asyncio.sleep(0.3)  # several checks
        assert not task.done()
        ws.close.assert_not_awaited()
        await ws.close()
        await task

    async def test_a_failing_check_closes_4011(self, test_user, test_team):
        token = jwt_for(test_user)
        with patch("app.ws_auth.authenticate", AsyncMock(side_effect=RuntimeError("db down"))):
            refused = await asyncio.wait_for(watch(token, test_team.id, interval=0.01), 5)
        assert refused.code == 4011

    async def test_closing_a_socket_already_gone_is_harmless(self, test_user, test_team):
        row, raw = await key_for(test_user)
        ws = FakeWebSocket(headers={"Authorization": f"Bearer {raw}"})
        task = await run_endpoint(ws, test_team.id)

        async def gone(code=1000):
            ws._closed.set()
            raise RuntimeError("already closed")

        ws.close = AsyncMock(side_effect=gone)
        await APIKeyService().revoke(row, actor_id=test_user.id)
        await asyncio.wait_for(task, 5)
        ws.close.assert_awaited_once_with(code=4001)


@pytest.mark.usefixtures("no_recheck")
class TestImmediateClose:
    """CHT-1616: a revocation made in this process closes the socket at
    once, with the code the re-check would give, not up to
    WS_AUTH_RECHECK_SECONDS later. ``no_recheck`` makes the re-check an
    hour, so a close here can only come from the revocation."""

    BROADCAST = {"type": "created", "entity": "issue", "data": {}}

    async def _closed_at_once(self, ws, task, team_id) -> int:
        from app.websocket import manager

        # The hook ran before the revoking call returned.
        ws.close.assert_awaited_once()
        assert ws not in manager.active_connections.get(team_id, set())
        assert ws not in manager.owners
        await manager.broadcast_to_team(team_id, self.BROADCAST)
        ws.send_json.assert_not_awaited()
        await asyncio.wait_for(task, 5)
        ws.close.assert_awaited_once()  # the endpoint's cleanup did not close it again
        return ws.close.await_args.kwargs["code"]

    async def _open(self, token, team_id):
        ws = FakeWebSocket(subprotocols=["chaotic", f"chaotic.bearer.{token}"])
        task = await run_endpoint(ws, team_id)
        ws.accept.assert_awaited_once()
        return ws, task

    async def test_key_revoked_closes_4001_and_spares_other_sockets(self, test_user, test_team):
        row, raw = await key_for(test_user)
        ws, task = await self._open(raw, test_team.id)
        other, other_task = await self._open(jwt_for(test_user), test_team.id)
        await APIKeyService().revoke(row, actor_id=test_user.id)
        assert await self._closed_at_once(ws, task, test_team.id) == 4001
        other.close.assert_not_awaited()
        other.send_json.assert_awaited_once_with(self.BROADCAST)
        await other.close()
        await other_task

    async def test_member_removed_closes_4003_on_that_team_only(
        self, client, test_user, test_user2, test_team, auth_headers,
    ):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role="MEMBER")
        other_team = await OxydeTeam.objects.create(name="Other", key="OTH")
        await OxydeTeamMember.objects.create(team_id=other_team.id, user_id=test_user2.id, role="OWNER")
        ws, task = await self._open(jwt_for(test_user2), test_team.id)
        elsewhere, elsewhere_task = await self._open(jwt_for(test_user2), other_team.id)
        admin, admin_task = await self._open(jwt_for(test_user), test_team.id)
        response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers)
        assert response.status_code == 204, response.text
        assert await self._closed_at_once(ws, task, test_team.id) == 4003
        elsewhere.close.assert_not_awaited()
        admin.close.assert_not_awaited()
        for sock, t in ((elsewhere, elsewhere_task), (admin, admin_task)):
            await sock.close()
            await t

    async def test_member_leaving_closes_4003(self, client, test_user2, test_team, auth_headers2):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role="MEMBER")
        ws, task = await self._open(jwt_for(test_user2), test_team.id)
        response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers2)
        assert response.status_code == 204, response.text
        assert await self._closed_at_once(ws, task, test_team.id) == 4003

    async def test_user_deleted_closes_4001(self, test_user2, test_team):
        """A user who no longer exists is 4001, as on the re-check."""
        from app.services.user_service import UserService

        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role="MEMBER")
        ws, task = await self._open(jwt_for(test_user2), test_team.id)
        await UserService().delete(test_user2)
        assert await self._closed_at_once(ws, task, test_team.id) == 4001

    async def test_team_deleted_closes_4003(self, client, test_user, test_team, auth_headers):
        ws, task = await self._open(jwt_for(test_user), test_team.id)
        response = await client.delete(f"/api/teams/{test_team.id}", headers=auth_headers)
        assert response.status_code == 204, response.text
        assert await self._closed_at_once(ws, task, test_team.id) == 4003

    async def test_holder_session_revoked_closes_4001(self, test_user, test_team, monkeypatch):
        """No OAuth session acts as a human yet (CHT-1602); when one does,
        revoking it closes its socket."""
        from app.services.credential_events import CredentialsEnded, ended

        async def resolve(token):
            return Principal(user=test_user, holder_user_id=test_user.id, kind=CredentialKind.OAUTH_ACCESS,
                             scopes=frozenset({"chaotic:read"}), holder_session_id="hs-1")
        monkeypatch.setattr(ws_auth.ws_resolver, "resolve", resolve)
        ws, task = await self._open("cat_x", test_team.id)
        await ended(CredentialsEnded.of("user_revoked", holder_session_ids=["hs-2"]))
        ws.close.assert_not_awaited()
        await ended(CredentialsEnded.of("user_revoked", holder_session_ids=["hs-1"]))
        assert await self._closed_at_once(ws, task, test_team.id) == 4001

    async def test_principal_deactivated_closes_4003(self, test_user, test_team):
        """No human is deactivated through the API today, and /ws refuses
        agents, so this drives the hook directly."""
        from app.services.credential_events import CredentialsEnded, ended
        from app.services.revocation_service import REASON_PRINCIPAL_DEACTIVATED

        ws, task = await self._open(jwt_for(test_user), test_team.id)
        await ended(CredentialsEnded.of(REASON_PRINCIPAL_DEACTIVATED, user_ids=[test_user.id]))
        assert await self._closed_at_once(ws, task, test_team.id) == 4003

    async def test_a_socket_already_gone_does_not_break_the_revocation(self, test_user, test_team):
        row, raw = await key_for(test_user)
        ws, task = await self._open(raw, test_team.id)

        async def gone(code=1000):
            ws._closed.set()
            raise RuntimeError("already closed")

        ws.close = AsyncMock(side_effect=gone)
        revoked = await APIKeyService().revoke(row, actor_id=test_user.id)
        assert revoked.is_active is False
        ws.close.assert_awaited_once_with(code=4001)
        await asyncio.wait_for(task, 5)

    async def test_the_watcher_after_a_hook_close_does_nothing(self, test_user, test_team):
        """Both paths go through ConnectionManager.close, which closes once."""
        from app.websocket import manager

        ws = FakeWebSocket()
        await manager.connect(ws, test_team.id)
        assert await manager.close(ws, test_team.id, 4001)
        assert not await manager.close(ws, test_team.id, 4003)
        ws.close.assert_awaited_once_with(code=4001)

    async def test_close_for(self, test_user, test_user2, test_team):
        from app.websocket import SocketOwner, manager

        mine, theirs, elsewhere = FakeWebSocket(), FakeWebSocket(), FakeWebSocket()
        await manager.connect(mine, test_team.id, owner=SocketOwner(team_id=test_team.id, user_id=test_user.id))
        await manager.connect(theirs, test_team.id, owner=SocketOwner(team_id=test_team.id, user_id=test_user2.id))
        await manager.connect(elsewhere, "t2", owner=SocketOwner(team_id="t2", user_id=test_user.id))
        assert await manager.close_for(user_id=test_user.id, team_id=test_team.id, code=4003) == 1
        mine.close.assert_awaited_once_with(code=4003)
        theirs.close.assert_not_awaited()
        elsewhere.close.assert_not_awaited()
        assert await manager.close_for(user_id=test_user.id, code=4003) == 1
        elsewhere.close.assert_awaited_once_with(code=4003)
        manager.disconnect(theirs, test_team.id)


class TestWatcherFailure:
    def test_a_failed_watcher_is_logged(self, caplog):
        """PR #352 review, finding 8."""
        from app.main import _log_watcher_failure

        async def boom():
            raise RuntimeError("boom")

        async def run():
            task = asyncio.create_task(boom())
            await asyncio.gather(task, return_exceptions=True)
            return task

        async def cancelled():
            task = asyncio.create_task(asyncio.sleep(10))
            await asyncio.sleep(0)
            task.cancel()
            await asyncio.gather(task, return_exceptions=True)
            return task

        loop = asyncio.new_event_loop()
        try:
            failed = loop.run_until_complete(run())
            gone = loop.run_until_complete(cancelled())
        finally:
            loop.close()
        with caplog.at_level(logging.ERROR, logger="app.main"):
            _log_watcher_failure(gone)
            assert not caplog.records
            _log_watcher_failure(failed)
        assert caplog.records[0].getMessage() == "WebSocket credential watcher failed"
        assert caplog.records[0].exc_info[1].args == ("boom",)
