"""Tests for infrastructure components (main.py, websocket.py, deps.py)."""
import pytest
from unittest.mock import AsyncMock, MagicMock
from fastapi import WebSocket

from app.websocket import ConnectionManager, broadcast_issue_event, broadcast_project_event, broadcast_comment_event


class TestHealthEndpoint:
    """Tests for the health check endpoint."""

    @pytest.mark.asyncio
    async def test_health_check(self, client):
        """Health endpoint returns healthy status."""
        response = await client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "healthy"}


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
