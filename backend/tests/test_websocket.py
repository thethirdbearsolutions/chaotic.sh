"""Tests for WebSocket connection manager and broadcast functions (CHT-275)."""
import pytest
from unittest.mock import AsyncMock, MagicMock

from app.websocket import ConnectionManager, broadcast_issue_event, broadcast_comment_event, broadcast_project_event, broadcast_activity_event, broadcast_relation_event


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
