"""/ws authentication (CHT-1110, CHT-1567, CHT-1603).

/ws resolves its credential through the shared CredentialResolver, takes
it from the Authorization header, a ``chaotic.bearer.<token>``
subprotocol entry or the deprecated ``?token=``, and re-checks it while
the socket is open. These drive ``app.main.websocket_endpoint`` with a
fake socket against real credentials; e2e/test_websocket_auth.py drives
the real handshake.
"""
import asyncio
import base64
import logging
import os
import uuid
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

    def __init__(self, *, headers=None, subprotocols=None, client=None, denial=False):
        self.headers = Headers(headers or {})
        self.scope = {"type": "websocket", "subprotocols": list(subprotocols or [])}
        if denial:
            # The server takes an HTTP response for a handshake (uvicorn does).
            self.scope["extensions"] = {"websocket.http.response": {}}
        if client is not None:
            self.client = client
        self.accept = AsyncMock()
        self.send_denial_response = AsyncMock()
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
    async def test_refused_handshake_is_accepted_then_closed_with_the_code(
        self, test_user, test_team, make_token, code,
    ):
        """CHT-1615: a close before accept would reach the client as an
        HTTP 403 whatever the code; accepted then closed, the code
        reaches it. Nothing is sent and the socket is never registered."""
        from app.websocket import manager

        ws = FakeWebSocket()
        await websocket_endpoint(ws, team_id=test_team.id, token=make_token(test_user))
        ws.accept.assert_awaited_once_with(subprotocol=None)
        ws.close.assert_awaited_once_with(code=code)
        ws.send_json.assert_not_awaited()
        assert ws not in manager.active_connections.get(test_team.id, set())
        assert ws not in manager.owners

    async def test_cross_team_is_refused_4003(self, test_user, test_team):
        other = await OxydeTeam.objects.create(name="Other", key="OTH")
        ws = FakeWebSocket(headers={"Authorization": f"Bearer {jwt_for(test_user)}"})
        await websocket_endpoint(ws, team_id=other.id)
        ws.accept.assert_awaited_once_with(subprotocol=None)
        ws.close.assert_awaited_once_with(code=4003)

    @pytest.mark.parametrize("subprotocols", [
        ["chaotic", "chaotic.bearer.garbage"],
        ["chaotic", "chaotic.bearer.one", "chaotic.bearer.two"],  # refused while reading them
    ])
    async def test_a_refusal_selects_chaotic_when_offered(self, test_team, subprotocols):
        """A browser that offered subprotocols fails a handshake that
        selects none, and would see 1006 instead of the code."""
        ws = FakeWebSocket(subprotocols=subprotocols)
        await websocket_endpoint(ws, team_id=test_team.id)
        ws.accept.assert_awaited_once_with(subprotocol="chaotic")
        ws.close.assert_awaited_once_with(code=4001)

    async def test_only_the_bearer_entry_offered_selects_none(self, test_team):
        ws = FakeWebSocket(subprotocols=["chaotic.bearer.garbage"])
        await websocket_endpoint(ws, team_id=test_team.id)
        ws.accept.assert_awaited_once_with(subprotocol=None)
        ws.close.assert_awaited_once_with(code=4001)

    async def test_check_error_is_an_http_503(self, test_team):
        """CHT-1637: a failed check is refused before accept, with a 503 and
        Retry-After, so a tab on a bundle from before CHT-1615 (which
        counts any onopen as up and resyncs) sees 1006 and backs off."""
        ws = FakeWebSocket(denial=True)
        with patch("app.ws_auth.authenticate", AsyncMock(side_effect=RuntimeError("db down"))):
            await websocket_endpoint(ws, team_id=test_team.id, token="x")
        ws.accept.assert_not_awaited()
        ws.close.assert_not_awaited()
        [response] = ws.send_denial_response.await_args.args
        assert response.status_code == 503
        assert response.headers["retry-after"] == str(ws_auth.RETRY_AFTER_SECONDS)

    async def test_check_error_is_4011_without_the_denial_extension(self, test_team):
        """A server that cannot send an HTTP response for a handshake gets
        the close code, as before."""
        ws = FakeWebSocket()
        with patch("app.ws_auth.authenticate", AsyncMock(side_effect=RuntimeError("db down"))):
            await websocket_endpoint(ws, team_id=test_team.id, token="x")
        ws.accept.assert_awaited_once_with(subprotocol=None)
        ws.close.assert_awaited_once_with(code=4011)
        ws.send_denial_response.assert_not_awaited()

    async def test_a_credential_refusal_keeps_its_close_code_with_the_denial_extension(self, test_team):
        """4001 / 4003 must reach a browser as codes, so they are still
        accepted and closed when the server could send a status."""
        ws = FakeWebSocket(denial=True)
        await websocket_endpoint(ws, team_id=test_team.id, token="garbage")
        ws.accept.assert_awaited_once_with(subprotocol=None)
        ws.close.assert_awaited_once_with(code=4001)
        ws.send_denial_response.assert_not_awaited()

    async def test_a_refusal_is_logged_without_the_credential(self, test_team, caplog):
        """PR #359 review, 1: the access log shows a refused handshake as
        accepted, so the app logs the refusal: code, reason, client and
        team, never the token."""
        secret = "ck_" + "ab" * 24
        ws = FakeWebSocket(headers={"Authorization": f"Bearer {secret}"})
        ws.client = ("203.0.113.7", 51234)
        with caplog.at_level(logging.INFO, logger="app.ws_auth"):
            await websocket_endpoint(ws, team_id=test_team.id)
        [record] = [r for r in caplog.records if r.name == "app.ws_auth" and "Refused" in r.getMessage()]
        line = record.getMessage()
        assert record.levelno == logging.WARNING
        assert "code=4001" in line
        assert "203.0.113.7:51234" in line
        assert repr(test_team.id) in line
        assert secret not in caplog.text and "abab" not in caplog.text

    def test_the_refusal_line_reaches_the_output_under_uvicorns_logging(self, tmp_path):
        """PR #359 re-review, 1: caplog adds its own handler, so the test
        above would pass for a line production never prints. Run a fresh
        interpreter with uvicorn's default logging config (what
        ``uvicorn app.main:app`` gets) and read its stderr."""
        import os
        import subprocess
        import sys
        from pathlib import Path

        script = (
            "import asyncio, logging.config\n"
            "from unittest.mock import AsyncMock\n"
            "from uvicorn.config import LOGGING_CONFIG\n"
            "logging.config.dictConfig(LOGGING_CONFIG)\n"
            "import app.main\n"  # whatever logging setup the app itself does
            "from app.ws_auth import refuse\n"
            "class Ws:\n"
            "    scope = {}\n"
            "    client = ('198.51.100.9', 4242)\n"
            "    accept = AsyncMock()\n"
            "    close = AsyncMock()\n"
            "asyncio.run(refuse(Ws(), 4001, 'Invalid token', 'team-1'))\n"
        )
        backend = Path(__file__).resolve().parents[1]
        env = {**os.environ, "SECRET_KEY": "x" * 32, "DATABASE_URL": f"sqlite:///{tmp_path}/unused.db"}
        result = subprocess.run(
            [sys.executable, "-c", script], cwd=backend, env=env, capture_output=True, text=True, timeout=60,
        )
        assert result.returncode == 0, result.stderr
        output = result.stdout + result.stderr
        assert "Refused /ws handshake: code=4001 reason=Invalid token client=198.51.100.9:4242" in output

    async def test_a_refusal_log_quotes_and_cuts_the_team_id(self, caplog):
        ws = FakeWebSocket()
        hostile = "x\nFAKE LOG LINE" + "y" * 200
        with caplog.at_level(logging.INFO, logger="app.ws_auth"):
            await websocket_endpoint(ws, team_id=hostile)
        line = next(r.getMessage() for r in caplog.records if "Refused" in r.getMessage())
        assert "\n" not in line
        assert "y" * 100 not in line
        assert "client=-" in line  # no address known

    async def test_a_check_error_refusal_is_logged_too(self, test_team, caplog):
        ws = FakeWebSocket()
        with patch("app.ws_auth.authenticate", AsyncMock(side_effect=RuntimeError("db down"))):
            with caplog.at_level(logging.INFO, logger="app.ws_auth"):
                await websocket_endpoint(ws, team_id=test_team.id, token="x")
        assert "code=4011" in caplog.text

    @pytest.mark.parametrize("team_id", [None, ""])
    async def test_a_missing_team_id_is_refused_4003(self, test_user, team_id):
        """Refused with a code, not by query validation before accept
        (PR #359 review, 7)."""
        ws = FakeWebSocket(headers={"Authorization": f"Bearer {jwt_for(test_user)}"})
        await websocket_endpoint(ws, team_id=team_id)
        ws.accept.assert_awaited_once_with(subprotocol=None)
        ws.close.assert_awaited_once_with(code=4003)

    @pytest.mark.parametrize("fails", ["accept", "close"])
    async def test_a_client_gone_during_the_refusal_is_harmless(self, test_team, fails):
        ws = FakeWebSocket()
        getattr(ws, fails).side_effect = RuntimeError("client went away")
        await websocket_endpoint(ws, team_id=test_team.id, token="garbage")
        ws.accept.assert_awaited_once()

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
        from app.services.credential_events import CredentialsEnded, ended, revoking

        async def resolve(token):
            return Principal(user=test_user, holder_user_id=test_user.id, kind=CredentialKind.OAUTH_ACCESS,
                             scopes=frozenset({"chaotic:read"}), holder_session_id="hs-1")
        monkeypatch.setattr(ws_auth.ws_resolver, "resolve", resolve)
        ws, task = await self._open("cat_x", test_team.id)
        async with revoking():
            await ended(CredentialsEnded.of("user_revoked", holder_session_ids=["hs-2"]))
        ws.close.assert_not_awaited()
        async with revoking():
            await ended(CredentialsEnded.of("user_revoked", holder_session_ids=["hs-1"]))
        assert await self._closed_at_once(ws, task, test_team.id) == 4001

    async def test_principal_deactivated_closes_4003(self, test_user, test_team):
        """No human is deactivated through the API today, and /ws refuses
        agents, so this drives the hook directly."""
        from app.services.credential_events import CredentialsEnded, ended, revoking
        from app.services.revocation_service import REASON_PRINCIPAL_DEACTIVATED

        ws, task = await self._open(jwt_for(test_user), test_team.id)
        async with revoking():
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

    async def test_a_revocation_committing_during_the_handshake_is_caught(self, test_user, test_team, monkeypatch):
        """PR #356 review, 2: the check passes on the state before the
        revocation commits, and its hooks run before the socket is
        registered; the endpoint sees the generation move and checks again."""
        row, raw = await key_for(test_user)
        real = ws_auth.authenticate
        calls = []

        async def racing(token, team_id):
            principal = await real(token, team_id)
            calls.append(token)
            if len(calls) == 1:
                await APIKeyService().revoke(row, actor_id=test_user.id)  # commits, hooks run: no socket yet
            return principal

        monkeypatch.setattr(ws_auth, "authenticate", racing)
        ws = FakeWebSocket(headers={"Authorization": f"Bearer {raw}"})
        await asyncio.wait_for(websocket_endpoint(ws, team_id=test_team.id), 5)
        ws.accept.assert_awaited_once()
        ws.close.assert_awaited_once_with(code=4001)
        assert len(calls) == 1  # the second check refused

    async def test_no_second_check_when_nothing_was_revoked(self, test_user, test_team, monkeypatch):
        calls = []
        real = ws_auth.authenticate

        async def counting(token, team_id):
            calls.append(token)
            return await real(token, team_id)

        monkeypatch.setattr(ws_auth, "authenticate", counting)
        ws, task = await self._open(jwt_for(test_user), test_team.id)
        assert len(calls) == 1
        await ws.close()
        await task

    async def test_a_failing_second_check_closes_4011(self, test_user, test_team, monkeypatch):
        from app.services import credential_events

        real = ws_auth.authenticate
        calls = []

        async def flaky(token, team_id):
            calls.append(token)
            if len(calls) == 1:
                principal = await real(token, team_id)
                monkeypatch.setattr(credential_events, "_generation", credential_events.generation() + 1)
                return principal
            raise RuntimeError("db down")

        monkeypatch.setattr(ws_auth, "authenticate", flaky)
        ws = FakeWebSocket(headers={"Authorization": f"Bearer {jwt_for(test_user)}"})
        await asyncio.wait_for(websocket_endpoint(ws, team_id=test_team.id), 5)
        ws.close.assert_awaited_once_with(code=4011)

    async def test_a_broadcast_in_flight_skips_a_socket_closed_meanwhile(self, test_user, test_team):
        """PR #356 review, 4: a broadcast whose snapshot predates the close
        does not send to the socket once it is gone. (A send already
        under way cannot be recalled.)"""
        from app.websocket import SocketOwner, manager

        a, b = FakeWebSocket(), FakeWebSocket()
        owners = {a: "user-a", b: "user-b"}
        for ws, user_id in owners.items():
            await manager.connect(ws, test_team.id, owner=SocketOwner(team_id=test_team.id, user_id=user_id))
        first, second = list(manager.active_connections[test_team.id])  # the broadcast's order

        async def closes_the_other(message):
            await manager.close_for(user_id=owners[second], code=4001)

        first.send_json.side_effect = closes_the_other
        await manager.broadcast_to_team(test_team.id, self.BROADCAST)
        first.send_json.assert_awaited_once()
        second.send_json.assert_not_awaited()
        second.close.assert_awaited_once_with(code=4001)
        manager.disconnect(first, test_team.id)

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


class Unprintable(Exception):
    def __str__(self):
        raise RuntimeError("cannot print me")


class FakeClock:
    def __init__(self):
        self.now = 1000.0

    def __call__(self):
        return self.now


@pytest.fixture
def clock(monkeypatch):
    """Both refusal limiters on one clock the test moves."""
    clock = FakeClock()
    monkeypatch.setattr(ws_auth, "_gate", ws_auth._RefusalGate(clock))
    monkeypatch.setattr(ws_auth, "_refusal_log", ws_auth._RefusalLog(clock))
    monkeypatch.setattr(ws_auth, "_check_errors", ws_auth._ErrorLog(clock))
    return clock


def refusal_lines(caplog):
    return [r.getMessage() for r in caplog.records if r.name == "app.ws_auth" and "Refused" in r.getMessage()]


async def refuse_from(host, *, code=4001, reason="Invalid token", denial=True, port=40000):
    ws = FakeWebSocket(client=(host, port), denial=denial)
    await ws_auth.refuse(ws, code, reason, "team-1")
    return ws


def held(ws) -> bool:
    """Refused by accept then close: the connection is held until the
    client answers the close frame."""
    return ws.accept.await_count == 1 and ws.close.await_count == 1


class TestRefusalLimits:
    """CHT-1635: a refusal that is accepted and closed holds its connection
    until the client answers the close frame, up to the server's close
    timeout; the caps bound how many one address, and all together, can
    hold, and the refusal line is rate-limited so a flood cannot fill
    the log."""

    async def test_one_address_holds_at_most_the_cap(self, clock):
        cap = ws_auth.MAX_HELD_REFUSALS_PER_CLIENT
        sockets = [await refuse_from("198.51.100.1", port=40000 + i) for i in range(cap)]
        assert all(held(ws) for ws in sockets)

        over = await refuse_from("198.51.100.1", port=50000)
        over.accept.assert_not_awaited()
        over.close.assert_not_awaited()
        [response] = over.send_denial_response.await_args.args
        assert response.status_code == 429
        assert int(response.headers["retry-after"]) >= ws_auth.RETRY_AFTER_SECONDS

        # Another address is not affected.
        assert held(await refuse_from("198.51.100.2"))

    async def test_the_cap_frees_up_after_the_close_timeout(self, clock):
        for i in range(ws_auth.MAX_HELD_REFUSALS_PER_CLIENT):
            await refuse_from("198.51.100.1", port=40000 + i)
        assert not held(await refuse_from("198.51.100.1"))
        clock.now += ws_auth.REFUSAL_HOLD_SECONDS - 1
        assert not held(await refuse_from("198.51.100.1"))
        clock.now += 1
        assert held(await refuse_from("198.51.100.1"))

    async def test_throttled_refusals_do_not_extend_the_window(self, clock):
        """Only refusals that hold a connection are counted: a 429 drops it
        at once, so a client hammering past the cap is not locked out
        beyond the close timeout."""
        for i in range(ws_auth.MAX_HELD_REFUSALS_PER_CLIENT):
            await refuse_from("198.51.100.1", port=40000 + i)
        for _ in range(50):
            clock.now += 0.1
            await refuse_from("198.51.100.1")
        clock.now += ws_auth.REFUSAL_HOLD_SECONDS - 5
        assert held(await refuse_from("198.51.100.1"))

    async def test_all_addresses_together_hold_at_most_the_total_cap(self, clock, monkeypatch):
        monkeypatch.setattr(ws_auth, "MAX_HELD_REFUSALS", 5)
        sockets = [await refuse_from(f"203.0.113.{i}") for i in range(5)]
        assert all(held(ws) for ws in sockets)
        over = await refuse_from("203.0.113.99")
        assert over.send_denial_response.await_args.args[0].status_code == 429
        clock.now += ws_auth.REFUSAL_HOLD_SECONDS
        assert held(await refuse_from("203.0.113.99"))

    async def test_the_address_table_stays_bounded(self, clock, monkeypatch):
        monkeypatch.setattr(ws_auth, "MAX_HELD_REFUSALS", 5)
        for i in range(200):
            clock.now += ws_auth.REFUSAL_HOLD_SECONDS  # each one expires before the next
            await refuse_from(f"2001:db8:{i:x}::1")  # a /64 each
        assert len(ws_auth._gate._by_host) <= ws_auth.MAX_HELD_REFUSALS + 1

    async def test_without_the_denial_extension_a_throttled_refusal_closes_before_accept(self, clock):
        for i in range(ws_auth.MAX_HELD_REFUSALS_PER_CLIENT):
            await refuse_from("198.51.100.1", denial=False, port=40000 + i)
        over = await refuse_from("198.51.100.1", denial=False)
        over.accept.assert_not_awaited()
        over.close.assert_awaited_once_with(code=4001)  # the server's 403: dropped at once

    async def test_a_503_holds_nothing_and_is_not_counted(self, clock):
        for _ in range(3 * ws_auth.MAX_HELD_REFUSALS_PER_CLIENT):
            ws = await refuse_from("198.51.100.1", code=4011, reason="Credential check failed")
            assert ws.send_denial_response.await_args.args[0].status_code == 503
        assert held(await refuse_from("198.51.100.1"))

    async def test_a_flood_logs_one_line_per_client_and_reason(self, clock, caplog):
        with caplog.at_level(logging.WARNING, logger="app.ws_auth"):
            for i in range(100):
                clock.now += 0.01
                await refuse_from("198.51.100.1", port=40000 + i)
            await refuse_from("198.51.100.1", reason="User not found")
            await refuse_from("198.51.100.2")
        lines = refusal_lines(caplog)
        assert len(lines) == 4, lines
        # The first of each is logged in full, the throttled one too.
        assert "reason=Invalid token client=198.51.100.1:40000" in lines[0] and "as=close" in lines[0]
        assert "as=http-429" in lines[1]
        assert "reason=User not found client=198.51.100.1" in lines[2]
        assert "client=198.51.100.2" in lines[3]

    async def test_the_next_line_says_how_many_were_not_logged(self, clock, caplog):
        with caplog.at_level(logging.WARNING, logger="app.ws_auth"):
            for i in range(5):
                await refuse_from("198.51.100.1", code=4011, reason="Credential check failed", port=40000 + i)
                clock.now += 1
            clock.now += 3600  # the next one comes much later
            await refuse_from("198.51.100.1", code=4011, reason="Credential check failed", port=41000)
        first, second = refusal_lines(caplog)
        assert "more like it" not in first
        assert "client=198.51.100.1:41000" in second
        # When they happened, not how long since the last line (PR #360 re-review, L4).
        assert "(4 more like it not logged, between 3604s and 3601s ago)" in second

    async def test_a_forgotten_key_logs_its_count(self, clock, caplog, monkeypatch):
        monkeypatch.setattr(ws_auth, "_MAX_LOG_KEYS", 2)
        with caplog.at_level(logging.WARNING, logger="app.ws_auth"):
            for _ in range(3):
                await refuse_from("198.51.100.1", code=4011, reason="Credential check failed")
            await refuse_from("198.51.100.2", code=4011, reason="Credential check failed")
            await refuse_from("198.51.100.3", code=4011, reason="Credential check failed")
            assert len(ws_auth._refusal_log._seen) <= 2
            clock.now += ws_auth.REFUSAL_LOG_INTERVAL_SECONDS
            await refuse_from("198.51.100.4", code=4011, reason="Credential check failed")
        lines = refusal_lines(caplog)
        assert any("2 more refusals from 1 clients not logged, 60s ago" in line for line in lines), lines

    async def test_one_ipv6_64_is_one_client(self, clock, caplog):
        """PR #360 review, M1: one IPv6 host can source from any address in
        its /64, so the /64 is what the cap and the log limiter count.
        200 refusals from one /64 hold 8 sockets and write 2 lines."""
        with caplog.at_level(logging.WARNING, logger="app.ws_auth"):
            sockets = [await refuse_from(f"2001:db8:1:2::{i:x}") for i in range(200)]
        assert sum(held(ws) for ws in sockets) == ws_auth.MAX_HELD_REFUSALS_PER_CLIENT
        lines = refusal_lines(caplog)
        assert len(lines) == 2, lines
        # The line still names the address the refusal came from.
        assert "client=[2001:db8:1:2::0]:40000" in lines[0]
        # Another /64 is another client.
        assert held(await refuse_from("2001:db8:1:3::1"))

    @pytest.mark.parametrize("host, key", [
        ("198.51.100.7", "198.51.100.7"),
        ("::ffff:198.51.100.7", "198.51.100.7"),
        ("2001:db8:1:2:aaaa:bbbb:cccc:dddd", "2001:db8:1:2::/64"),
        ("fe80::1%eth0", "fe80::/64"),
        ("-", "-"),
        ("/run/chaotic.sock", "/run/chaotic.sock"),
    ])
    def test_client_key(self, host, key):
        assert ws_auth._client_key(host) == key

    async def test_an_ipv4_mapped_address_shares_its_ipv4_cap(self, clock):
        for i in range(ws_auth.MAX_HELD_REFUSALS_PER_CLIENT):
            await refuse_from("198.51.100.7", port=40000 + i)
        assert not held(await refuse_from("::ffff:198.51.100.7"))

    async def test_many_clients_log_within_the_budget_and_one_summary(self, clock, caplog, monkeypatch):
        """PR #360 review, M1: a flood of distinct clients writes at most
        REFUSAL_LOG_BUDGET lines a minute, then one summary line. (Smaller
        limits than production, to keep the test light.)"""
        monkeypatch.setattr(ws_auth, "REFUSAL_LOG_BUDGET", 20)
        monkeypatch.setattr(ws_auth, "_MAX_LOG_KEYS", 50)
        budget = ws_auth.REFUSAL_LOG_BUDGET
        with caplog.at_level(logging.WARNING, logger="app.ws_auth"):
            for i in range(120):
                await refuse_from(f"2001:db8:{i:x}::1")
            assert len(refusal_lines(caplog)) == budget
            clock.now += ws_auth.REFUSAL_LOG_INTERVAL_SECONDS
            await refuse_from("198.51.100.1")
        lines = refusal_lines(caplog)
        assert len(lines) == budget + 2
        assert f"{120 - budget} more refusals from at least {ws_auth._MAX_LOG_KEYS} clients" in lines[budget]
        assert "client=198.51.100.1" in lines[-1]

    async def test_a_known_key_over_the_budget_keeps_its_count(self, clock, caplog, monkeypatch):
        monkeypatch.setattr(ws_auth, "REFUSAL_LOG_BUDGET", 2)
        with caplog.at_level(logging.WARNING, logger="app.ws_auth"):
            await refuse_from("198.51.100.1")
            await refuse_from("198.51.100.1")  # suppressed: 1
            clock.now += ws_auth.REFUSAL_LOG_INTERVAL_SECONDS
            await refuse_from("198.51.100.2")
            await refuse_from("198.51.100.3")
            await refuse_from("198.51.100.1")  # over the budget: counted on its entry
            clock.now += ws_auth.REFUSAL_LOG_INTERVAL_SECONDS
            await refuse_from("198.51.100.1")
        lines = refusal_lines(caplog)
        assert "client=198.51.100.1" in lines[-1] and "(2 more like it not logged" in lines[-1], lines

    async def test_a_failed_check_logs_one_traceback_a_minute(self, clock, caplog, test_team):
        """PR #360 review, L2: every handshake fails during an outage, and
        a traceback per attempt would fill the log."""
        with patch("app.ws_auth.authenticate", AsyncMock(side_effect=RuntimeError("db down"))):
            with caplog.at_level(logging.ERROR):
                for _ in range(20):
                    await websocket_endpoint(FakeWebSocket(denial=True), team_id=test_team.id, token="x")
                clock.now += ws_auth.REFUSAL_LOG_INTERVAL_SECONDS
                await websocket_endpoint(FakeWebSocket(denial=True), team_id=test_team.id, token="x")
        errors = [r for r in caplog.records if "team validation" in r.getMessage()]
        assert len(errors) == 2
        assert all(r.exc_info for r in errors)
        assert "(19 more like it not logged, 60s ago)" in errors[1].getMessage()

    async def test_a_new_kind_of_failure_always_gets_its_traceback(self, clock, caplog, test_team):
        """PR #360 re-review, M2: an outage's repeats must not hide the
        first traceback of a different failure, at any call site."""
        failures = [OSError("database is locked"), OSError("database is locked"), KeyError("real bug")]
        with patch("app.ws_auth.authenticate", AsyncMock(side_effect=failures)):
            with caplog.at_level(logging.ERROR):
                for _ in failures:
                    await websocket_endpoint(FakeWebSocket(denial=True), team_id=test_team.id, token="x")
        logged = [r.exc_info[0] for r in caplog.records if "team validation" in r.getMessage()]
        assert logged == [OSError, KeyError]

    def test_failure_kinds_ignore_digits_and_ids(self, clock, caplog):
        log = logging.getLogger("app.main")
        with caplog.at_level(logging.ERROR):
            for exc in [
                OSError("timeout after 31 ms on conn 7f3a9c0e1b2d"),
                OSError("timeout after 57 ms on conn 0c1d2e3f4a5b"),
                ValueError("timeout after 31 ms on conn 7f3a9c0e1b2d"),  # another type
            ]:
                try:
                    raise exc
                except Exception:
                    ws_auth.log_check_error(log, "check failed")
            try:
                raise OSError("timeout after 1 ms on conn 7f3a9c0e1b2d")
            except Exception:
                ws_auth.log_check_error(log, "another call site")
        assert [r.exc_info[0] for r in caplog.records] == [OSError, ValueError, OSError]
        assert caplog.records[-1].getMessage() == "another call site"

    @pytest.mark.parametrize("make", [
        lambda n: f"no row for {uuid.uuid4()}",
        lambda n: f"lookup {uuid.uuid4().hex} failed",
        lambda n: f"bad token {base64.urlsafe_b64encode(os.urandom(30 + n % 7)).decode()}",
        lambda n: "jwt " + ".".join(base64.urlsafe_b64encode(os.urandom(24)).decode().rstrip("=") for _ in range(3)),
        lambda n: f"retry {n} of 200 after {n * 7} ms",
    ])
    def test_ids_tokens_and_numbers_do_not_make_new_kinds(self, clock, caplog, make):
        """PR #360 re-review 2, L5: 200 failures that differ only in an id,
        a token or a number are one kind: one traceback."""
        log = logging.getLogger("app.main")
        with caplog.at_level(logging.ERROR):
            for n in range(200):
                try:
                    raise OSError(make(n))
                except Exception:
                    ws_auth.log_check_error(log, "check failed")
        assert len(caplog.records) == 1

    def test_only_the_start_of_a_long_message_makes_the_kind(self, clock, caplog):
        log = logging.getLogger("app.main")
        with caplog.at_level(logging.ERROR):
            for tail in ("a b " * 500, "c d " * 500):
                try:
                    raise OSError("database is locked " + "x y " * 100 + tail)
                except Exception:
                    ws_auth.log_check_error(log, "check failed")
        assert len(caplog.records) == 1

    async def test_an_unprintable_failure_at_the_handshake_is_still_refused(self, clock, caplog, test_team):
        """PR #360 re-review 2, L6: an exception whose __str__ raises must
        not escape the limiter and skip the refusal."""
        ws = FakeWebSocket(denial=True)
        with patch("app.ws_auth.authenticate", AsyncMock(side_effect=Unprintable())):
            with caplog.at_level(logging.ERROR):
                await websocket_endpoint(ws, team_id=test_team.id, token="x")
        assert ws.send_denial_response.await_args.args[0].status_code == 503
        [record] = [r for r in caplog.records if "team validation" in r.getMessage()]
        assert record.exc_info[0] is Unprintable
        assert ws_auth._check_errors._kinds  # recorded, as "<unprintable>"
        assert list(ws_auth._check_errors._kinds)[0][2] == "<unprintable>"

    async def test_an_unprintable_failure_in_the_recheck_still_closes_4011(self, clock, test_user, test_team):
        token = jwt_for(test_user)
        with patch("app.ws_auth.authenticate", AsyncMock(side_effect=Unprintable())):
            refused = await asyncio.wait_for(watch(token, test_team.id, interval=0.01), 5)
        assert refused.code == 4011

    def test_failure_kinds_are_bounded_and_a_forgotten_count_is_reported(self, clock, caplog, monkeypatch):
        monkeypatch.setattr(ws_auth, "_MAX_ERROR_KINDS", 2)
        log = logging.getLogger("app.main")

        def fail(exc_type):
            try:
                raise exc_type("boom")
            except Exception:
                ws_auth.log_check_error(log, "check failed")

        with caplog.at_level(logging.ERROR):
            fail(OSError)
            fail(OSError)  # suppressed
            fail(KeyError)
            clock.now += 5
            fail(ValueError)  # forgets OSError, with its count
            fail(TypeError)
        assert len(ws_auth._check_errors._kinds) == 2
        messages = [r.getMessage() for r in caplog.records]
        assert len(messages) == 4
        assert messages[2] == "check failed (and 1 failed checks of other kinds not logged, 5s ago)"
        assert messages[3] == "check failed"

        # Each forgotten kind's count goes out with the next traceback.
        caplog.clear()
        with caplog.at_level(logging.ERROR):
            fail(ValueError)  # suppressed, at 5
            clock.now += 2
            fail(TypeError)  # suppressed, at 7
            fail(OSError)  # forgets ValueError
            fail(KeyError)  # forgets TypeError
            clock.now += ws_auth.REFUSAL_LOG_INTERVAL_SECONDS
            fail(KeyError)  # a repeat with nothing suppressed: no count
            fail(RuntimeError)
        messages = [r.getMessage() for r in caplog.records]
        assert messages == [
            "check failed (and 1 failed checks of other kinds not logged, 2s ago)",
            "check failed (and 1 failed checks of other kinds not logged, 0s ago)",
            "check failed",
            "check failed",
        ]

    def test_an_unlogged_span_covers_every_count_folded_in(self):
        unlogged = ws_auth._Unlogged()
        unlogged.add(50.0, 2, first=40.0)
        unlogged.add(55.0, 3, first=30.0)
        unlogged.add(58.0)
        assert unlogged.suffix(60.0) == (6, "between 30s and 2s ago")

    def test_a_check_error_logged_outside_an_except_block(self, clock, caplog):
        with caplog.at_level(logging.ERROR):
            ws_auth.log_check_error(logging.getLogger("app.main"), "check failed")
            ws_auth.log_check_error(logging.getLogger("app.main"), "check failed")
        assert len(caplog.records) == 1

    async def test_a_key_logged_again_with_nothing_suppressed_has_no_count(self, clock, caplog):
        with caplog.at_level(logging.WARNING, logger="app.ws_auth"):
            await refuse_from("198.51.100.1", code=4011, reason="Credential check failed")
            clock.now += ws_auth.REFUSAL_LOG_INTERVAL_SECONDS
            await refuse_from("198.51.100.1", code=4011, reason="Credential check failed")
        lines = refusal_lines(caplog)
        assert len(lines) == 2 and "not logged" not in lines[1]

    async def test_a_flood_never_logs_the_credential(self, db, clock, caplog):
        secret = "ck_" + "cd" * 24
        with caplog.at_level(logging.DEBUG, logger="app.ws_auth"):
            for i in range(30):
                ws = FakeWebSocket(
                    headers={"Authorization": f"Bearer {secret}"}, client=("198.51.100.1", 40000 + i), denial=True,
                )
                await websocket_endpoint(ws, team_id="team-1")
            clock.now += ws_auth.REFUSAL_LOG_INTERVAL_SECONDS
            await websocket_endpoint(
                FakeWebSocket(headers={"Authorization": f"Bearer {secret}"}, client=("198.51.100.1", 1), denial=True),
                team_id="team-1",
            )
        lines = refusal_lines(caplog)
        assert len(lines) == 3 and all("code=4001 reason=Invalid API key" in line for line in lines), lines
        assert secret not in caplog.text and "cdcd" not in caplog.text
