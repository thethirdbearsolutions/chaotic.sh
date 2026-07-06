"""Tests for infrastructure components (main.py, websocket.py, deps.py)."""
import pytest
from unittest.mock import AsyncMock, MagicMock
from fastapi import WebSocket

from app.websocket import ConnectionManager, broadcast_issue_event, broadcast_project_event, broadcast_comment_event


class TestHealthEndpoint:
    """Tests for the health check endpoint (CHT-1221).

    /health used to do nothing but return a static 200 -- it never
    touched the DB, so it reported healthy even against a completely
    unmigrated database. It now does a trivial DB round-trip and
    reports the result via a new `db` key. `status` stays "healthy"
    (backward compatible: cli/src/cli/system.py::health_check only
    polls for HTTP 200) -- `db` and `version` are additive.
    """

    @pytest.mark.asyncio
    async def test_health_check_migrated_db(self, client):
        """Against a fully-migrated DB (the `client`/`db` fixture's
        schema), /health reports status healthy and db ok."""
        response = await client.get("/health")
        assert response.status_code == 200
        body = response.json()
        assert body["status"] == "healthy"
        assert body["db"] == "ok"
        assert "version" in body

    @pytest.mark.asyncio
    async def test_health_check_unmigrated_db(self, client):
        """Regression for the seeded bug: an unmigrated/broken DB (here,
        the `users` table dropped out from under a live connection) must
        surface as db=="error" -- not silently report healthy."""
        from oxyde import execute_raw

        await execute_raw("DROP TABLE users", [])

        response = await client.get("/health")
        assert response.status_code == 200
        body = response.json()
        # HTTP-200 liveness contract is unchanged -- system.py's
        # health_check() polls only for this.
        assert body["status"] == "healthy"
        assert body["db"] == "error"
        assert "version" in body


class TestUnhandledExceptionHandler:
    """CHT-1223: unhandled exceptions return JSON, not Starlette's default
    text/plain 500 body.

    httpx's ASGITransport (used by the `client` fixture, raise_app_exceptions
    default True) re-raises any exception that propagates out of the app
    regardless of whether a custom exception_handler(Exception) is
    registered -- Starlette's ServerErrorMiddleware always re-raises after
    sending the response ("allows servers to log the error, or allows test
    clients to optionally raise the error"). A real ASGI server's client
    never sees that re-raise (the response bytes are already flushed), but
    round-tripping through `client` in this test suite can't observe it
    either way -- so call the handler directly instead.
    """

    @pytest.mark.asyncio
    async def test_unhandled_exception_returns_json_500(self):
        import json
        from starlette.requests import Request
        from app.main import unhandled_exception_handler

        scope = {"type": "http", "method": "GET", "path": "/api/whatever", "headers": []}
        request = Request(scope)

        response = await unhandled_exception_handler(request, RuntimeError("boom"))

        assert response.status_code == 500
        assert json.loads(response.body) == {"detail": "Internal server error"}


class TestCliAuth:
    """Tests for CLI authorization endpoint."""

    @pytest.mark.asyncio
    async def test_cli_auth_rejects_non_localhost_callback(self, client, auth_headers):
        """cli_auth rejects callback URLs not on localhost."""
        response = await client.get(
            "/cli-auth",
            params={"callback": "https://evil.com/callback", "state": "abc123"}
        )
        assert response.status_code == 400
        assert "localhost" in response.json()["detail"].lower()

    @pytest.mark.asyncio
    async def test_cli_auth_allows_localhost_callback(self, client, auth_headers):
        """cli_auth allows localhost callback URLs."""
        response = await client.get(
            "/cli-auth",
            params={"callback": "http://localhost:9876/callback", "state": "abc123"}
        )
        # Should return the auth page HTML (200) not an error
        assert response.status_code == 200
        assert "text/html" in response.headers.get("content-type", "")

    @pytest.mark.asyncio
    async def test_cli_auth_allows_127_0_0_1_callback(self, client, auth_headers):
        """cli_auth allows 127.0.0.1 callback URLs."""
        response = await client.get(
            "/cli-auth",
            params={"callback": "http://127.0.0.1:9876/callback", "state": "abc123"}
        )
        assert response.status_code == 200


class TestSpaFallback:
    """Tests for the SPA catch-all route."""

    @pytest.mark.asyncio
    async def test_spa_fallback_returns_html(self, client):
        """Unknown routes return the SPA index.html."""
        response = await client.get("/some/unknown/path")
        assert response.status_code == 200
        assert "text/html" in response.headers.get("content-type", "")


class TestRootEndpoint:
    """Tests for the root endpoint."""

    @pytest.mark.asyncio
    async def test_root_returns_html(self, client):
        """Root endpoint returns HTML."""
        response = await client.get("/")
        assert response.status_code == 200
        assert "text/html" in response.headers.get("content-type", "")


class TestConnectionManager:
    """Tests for WebSocket connection manager."""

    @pytest.mark.asyncio
    async def test_connect_new_team(self):
        """Connecting first client to team creates team entry."""
        manager = ConnectionManager()
        websocket = AsyncMock(spec=WebSocket)

        await manager.connect(websocket, "team-1")

        websocket.accept.assert_called_once()
        assert "team-1" in manager.active_connections
        assert websocket in manager.active_connections["team-1"]

    @pytest.mark.asyncio
    async def test_connect_existing_team(self):
        """Connecting second client to team adds to existing set."""
        manager = ConnectionManager()
        ws1 = AsyncMock(spec=WebSocket)
        ws2 = AsyncMock(spec=WebSocket)

        await manager.connect(ws1, "team-1")
        await manager.connect(ws2, "team-1")

        assert len(manager.active_connections["team-1"]) == 2
        assert ws1 in manager.active_connections["team-1"]
        assert ws2 in manager.active_connections["team-1"]

    def test_disconnect_removes_connection(self):
        """Disconnecting removes the websocket from the team."""
        manager = ConnectionManager()
        ws1 = MagicMock(spec=WebSocket)
        ws2 = MagicMock(spec=WebSocket)

        # Manually set up connections (bypass async connect)
        manager.active_connections["team-1"] = {ws1, ws2}

        manager.disconnect(ws1, "team-1")

        assert ws1 not in manager.active_connections["team-1"]
        assert ws2 in manager.active_connections["team-1"]

    def test_disconnect_last_client_removes_team(self):
        """Disconnecting last client removes the team entry."""
        manager = ConnectionManager()
        ws = MagicMock(spec=WebSocket)

        manager.active_connections["team-1"] = {ws}

        manager.disconnect(ws, "team-1")

        assert "team-1" not in manager.active_connections

    def test_disconnect_nonexistent_team_no_error(self):
        """Disconnecting from nonexistent team doesn't raise."""
        manager = ConnectionManager()
        ws = MagicMock(spec=WebSocket)

        # Should not raise
        manager.disconnect(ws, "00000000-0000-0000-0000-00000000000a")

    @pytest.mark.asyncio
    async def test_broadcast_to_team(self):
        """Broadcasting sends message to all team connections."""
        manager = ConnectionManager()
        ws1 = AsyncMock(spec=WebSocket)
        ws2 = AsyncMock(spec=WebSocket)

        manager.active_connections["team-1"] = {ws1, ws2}
        message = {"type": "test", "data": "hello"}

        await manager.broadcast_to_team("team-1", message)

        ws1.send_json.assert_called_once_with(message)
        ws2.send_json.assert_called_once_with(message)

    @pytest.mark.asyncio
    async def test_broadcast_to_nonexistent_team(self):
        """Broadcasting to nonexistent team does nothing."""
        manager = ConnectionManager()

        # Should not raise
        await manager.broadcast_to_team("00000000-0000-0000-0000-00000000000a", {"data": "test"})

    @pytest.mark.asyncio
    async def test_broadcast_removes_dead_connections(self):
        """Dead connections are removed during broadcast."""
        manager = ConnectionManager()
        ws_alive = AsyncMock(spec=WebSocket)
        ws_dead = AsyncMock(spec=WebSocket)
        ws_dead.send_json.side_effect = Exception("Connection closed")

        manager.active_connections["team-1"] = {ws_alive, ws_dead}

        await manager.broadcast_to_team("team-1", {"data": "test"})

        # Dead connection should be removed
        assert ws_dead not in manager.active_connections["team-1"]
        assert ws_alive in manager.active_connections["team-1"]


class TestBroadcastHelpers:
    """Tests for broadcast helper functions."""

    @pytest.mark.asyncio
    async def test_broadcast_issue_event(self):
        """broadcast_issue_event formats message correctly."""
        from app import websocket

        # Replace manager temporarily
        original_manager = websocket.manager
        mock_manager = AsyncMock()
        websocket.manager = mock_manager

        try:
            await broadcast_issue_event("team-1", "created", {"id": "issue-1"})

            mock_manager.broadcast_to_team.assert_called_once_with(
                "team-1",
                {"type": "created", "entity": "issue", "data": {"id": "issue-1"}}
            )
        finally:
            websocket.manager = original_manager

    @pytest.mark.asyncio
    async def test_broadcast_project_event(self):
        """broadcast_project_event formats message correctly."""
        from app import websocket

        original_manager = websocket.manager
        mock_manager = AsyncMock()
        websocket.manager = mock_manager

        try:
            await broadcast_project_event("team-1", "updated", {"id": "proj-1"})

            mock_manager.broadcast_to_team.assert_called_once_with(
                "team-1",
                {"type": "updated", "entity": "project", "data": {"id": "proj-1"}}
            )
        finally:
            websocket.manager = original_manager

    @pytest.mark.asyncio
    async def test_broadcast_comment_event(self):
        """broadcast_comment_event formats message correctly."""
        from app import websocket

        original_manager = websocket.manager
        mock_manager = AsyncMock()
        websocket.manager = mock_manager

        try:
            await broadcast_comment_event("team-1", "created", {"id": "comment-1"})

            mock_manager.broadcast_to_team.assert_called_once_with(
                "team-1",
                {"type": "created", "entity": "comment", "data": {"id": "comment-1"}}
            )
        finally:
            websocket.manager = original_manager
