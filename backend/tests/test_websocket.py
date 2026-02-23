"""Tests for WebSocket connection manager and broadcast functions (CHT-275)."""
import pytest
from unittest.mock import AsyncMock, MagicMock, patch

from app.websocket import ConnectionManager, broadcast_issue_event, broadcast_comment_event, broadcast_project_event, broadcast_activity_event, broadcast_relation_event, broadcast_attestation_event


@pytest.fixture
def manager():
    return ConnectionManager()


def make_ws():
    """Create a mock WebSocket."""
    ws = AsyncMock()
    ws.accept = AsyncMock()
    ws.send_json = AsyncMock()
    return ws


class TestConnectionManager:
    @pytest.mark.asyncio
    async def test_connect_accepts_and_stores(self, manager):
        ws = make_ws()
        await manager.connect(ws, "team-1")

        ws.accept.assert_awaited_once()
        assert ws in manager.active_connections["team-1"]

    @pytest.mark.asyncio
    async def test_connect_multiple_to_same_team(self, manager):
        ws1 = make_ws()
        ws2 = make_ws()
        await manager.connect(ws1, "team-1")
        await manager.connect(ws2, "team-1")

        assert len(manager.active_connections["team-1"]) == 2

    @pytest.mark.asyncio
    async def test_connect_different_teams(self, manager):
        ws1 = make_ws()
        ws2 = make_ws()
        await manager.connect(ws1, "team-1")
        await manager.connect(ws2, "team-2")

        assert len(manager.active_connections["team-1"]) == 1
        assert len(manager.active_connections["team-2"]) == 1

    def test_disconnect_removes_connection(self, manager):
        ws = make_ws()
        manager.active_connections["team-1"] = {ws}

        manager.disconnect(ws, "team-1")
        assert "team-1" not in manager.active_connections

    def test_disconnect_keeps_other_connections(self, manager):
        ws1 = make_ws()
        ws2 = make_ws()
        manager.active_connections["team-1"] = {ws1, ws2}

        manager.disconnect(ws1, "team-1")
        assert ws2 in manager.active_connections["team-1"]
        assert ws1 not in manager.active_connections["team-1"]

    def test_disconnect_nonexistent_team(self, manager):
        ws = make_ws()
        # Should not raise
        manager.disconnect(ws, "no-such-team")

    def test_disconnect_nonexistent_connection(self, manager):
        ws1 = make_ws()
        ws2 = make_ws()
        manager.active_connections["team-1"] = {ws1}

        # Disconnecting ws2 (not in set) should not raise
        manager.disconnect(ws2, "team-1")
        assert ws1 in manager.active_connections["team-1"]

    @pytest.mark.asyncio
    async def test_broadcast_to_team(self, manager):
        ws1 = make_ws()
        ws2 = make_ws()
        manager.active_connections["team-1"] = {ws1, ws2}

        message = {"type": "test", "data": "hello"}
        await manager.broadcast_to_team("team-1", message)

        ws1.send_json.assert_awaited_once_with(message)
        ws2.send_json.assert_awaited_once_with(message)

    @pytest.mark.asyncio
    async def test_broadcast_to_empty_team(self, manager):
        # No connections — should not raise
        await manager.broadcast_to_team("no-team", {"type": "test"})

    @pytest.mark.asyncio
    async def test_broadcast_removes_dead_connections(self, manager):
        ws_alive = make_ws()
        ws_dead = make_ws()
        ws_dead.send_json.side_effect = Exception("connection closed")
        manager.active_connections["team-1"] = {ws_alive, ws_dead}

        await manager.broadcast_to_team("team-1", {"type": "test"})

        # Dead connection should be removed
        assert ws_dead not in manager.active_connections["team-1"]
        assert ws_alive in manager.active_connections["team-1"]

    @pytest.mark.asyncio
    async def test_broadcast_only_targets_specified_team(self, manager):
        ws1 = make_ws()
        ws2 = make_ws()
        manager.active_connections["team-1"] = {ws1}
        manager.active_connections["team-2"] = {ws2}

        await manager.broadcast_to_team("team-1", {"type": "test"})

        ws1.send_json.assert_awaited_once()
        ws2.send_json.assert_not_awaited()


class TestBroadcastHelpers:
    @pytest.mark.asyncio
    async def test_broadcast_issue_event(self, monkeypatch):
        mock_broadcast = AsyncMock()
        monkeypatch.setattr("app.websocket.manager.broadcast_to_team", mock_broadcast)

        await broadcast_issue_event("team-1", "created", {"id": "i1", "title": "Test"})

        mock_broadcast.assert_awaited_once_with("team-1", {
            "type": "created",
            "entity": "issue",
            "data": {"id": "i1", "title": "Test"},
        })

    @pytest.mark.asyncio
    async def test_broadcast_comment_event(self, monkeypatch):
        mock_broadcast = AsyncMock()
        monkeypatch.setattr("app.websocket.manager.broadcast_to_team", mock_broadcast)

        await broadcast_comment_event("team-1", "created", {"id": "c1"})

        mock_broadcast.assert_awaited_once_with("team-1", {
            "type": "created",
            "entity": "comment",
            "data": {"id": "c1"},
        })

    @pytest.mark.asyncio
    async def test_broadcast_project_event(self, monkeypatch):
        mock_broadcast = AsyncMock()
        monkeypatch.setattr("app.websocket.manager.broadcast_to_team", mock_broadcast)

        await broadcast_project_event("team-1", "updated", {"id": "p1"})

        mock_broadcast.assert_awaited_once_with("team-1", {
            "type": "updated",
            "entity": "project",
            "data": {"id": "p1"},
        })

    @pytest.mark.asyncio
    async def test_broadcast_activity_event(self, monkeypatch):
        mock_broadcast = AsyncMock()
        monkeypatch.setattr("app.websocket.manager.broadcast_to_team", mock_broadcast)

        await broadcast_activity_event("team-1", "created", {"id": "a1"})

        mock_broadcast.assert_awaited_once_with("team-1", {
            "type": "created",
            "entity": "activity",
            "data": {"id": "a1"},
        })

    @pytest.mark.asyncio
    async def test_broadcast_relation_event(self, monkeypatch):
        mock_broadcast = AsyncMock()
        monkeypatch.setattr("app.websocket.manager.broadcast_to_team", mock_broadcast)

        await broadcast_relation_event("team-1", "created", {"source_issue_id": "i1", "target_issue_id": "i2"})

        mock_broadcast.assert_awaited_once_with("team-1", {
            "type": "created",
            "entity": "relation",
            "data": {"source_issue_id": "i1", "target_issue_id": "i2"},
        })

    @pytest.mark.asyncio
    async def test_broadcast_attestation_event(self, monkeypatch):
        mock_broadcast = AsyncMock()
        monkeypatch.setattr("app.websocket.manager.broadcast_to_team", mock_broadcast)

        await broadcast_attestation_event("team-1", "completed", {"ritual_id": "r1", "issue_id": "i1"})

        mock_broadcast.assert_awaited_once_with("team-1", {
            "type": "completed",
            "entity": "attestation",
            "data": {"ritual_id": "r1", "issue_id": "i1"},
        })


class TestWebSocketEndpointTeamValidation:
    """Tests for CHT-1110: team membership validation on WS connect."""

    @pytest.mark.asyncio
    async def test_invalid_token_closes_with_4001(self):
        """WS with invalid token should close with 4001."""
        from app.main import websocket_endpoint
        ws = AsyncMock()
        with patch("app.main.decode_token", return_value=None):
            await websocket_endpoint(ws, token="bad-token", team_id="team-1")
        ws.close.assert_awaited_once_with(code=4001)

    @pytest.mark.asyncio
    async def test_token_missing_sub_closes_with_4001(self):
        """WS with token lacking 'sub' claim should close with 4001."""
        from app.main import websocket_endpoint
        ws = AsyncMock()
        with patch("app.main.decode_token", return_value={"exp": 99999}):
            await websocket_endpoint(ws, token="no-sub", team_id="team-1")
        ws.close.assert_awaited_once_with(code=4001)

    @pytest.mark.asyncio
    async def test_user_not_found_closes_with_4003(self):
        """WS with token for nonexistent user should close with 4003."""
        from app.main import websocket_endpoint
        ws = AsyncMock()
        mock_user_service = AsyncMock()
        mock_user_service.get_by_id.return_value = None
        with patch("app.main.decode_token", return_value={"sub": "ghost-user"}), \
             patch("app.main.UserService", return_value=mock_user_service):
            await websocket_endpoint(ws, token="valid", team_id="team-1")
        ws.close.assert_awaited_once_with(code=4003)

    @pytest.mark.asyncio
    async def test_user_not_team_member_closes_with_4003(self):
        """WS with token for user NOT in team should close with 4003."""
        from app.main import websocket_endpoint
        ws = AsyncMock()
        mock_user = MagicMock(id="user-1")
        mock_user_service = AsyncMock()
        mock_user_service.get_by_id.return_value = mock_user
        with patch("app.main.decode_token", return_value={"sub": "user-1"}), \
             patch("app.main.UserService", return_value=mock_user_service), \
             patch("app.main.check_user_team_access", new_callable=AsyncMock, return_value=False):
            await websocket_endpoint(ws, token="valid", team_id="team-1")
        ws.close.assert_awaited_once_with(code=4003)

    @pytest.mark.asyncio
    async def test_valid_team_member_connects(self):
        """WS with valid token for team member should connect."""
        from app.main import websocket_endpoint
        ws = AsyncMock()
        # Simulate WebSocketDisconnect to exit the while True loop
        from starlette.websockets import WebSocketDisconnect
        ws.receive_text.side_effect = WebSocketDisconnect()
        mock_user = MagicMock(id="user-1")
        mock_user_service = AsyncMock()
        mock_user_service.get_by_id.return_value = mock_user
        with patch("app.main.decode_token", return_value={"sub": "user-1"}), \
             patch("app.main.UserService", return_value=mock_user_service), \
             patch("app.main.check_user_team_access", new_callable=AsyncMock, return_value=True), \
             patch("app.main.manager", new_callable=AsyncMock) as mock_manager:
            await websocket_endpoint(ws, token="valid", team_id="team-1")
        mock_manager.connect.assert_awaited_once_with(ws, "team-1")
        ws.close.assert_not_awaited()
