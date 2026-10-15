"""Tests for WebSocket connection manager and broadcast functions (CHT-275)."""
import pytest
from unittest.mock import AsyncMock

from app.websocket import ConnectionManager, SocketOwner, broadcast_issue_event, broadcast_comment_event, broadcast_project_event, broadcast_activity_event, broadcast_relation_event, broadcast_attestation_event, broadcast_document_event


@pytest.fixture
def manager():
    return ConnectionManager()


def _owner(team_id, project_id=None, user_id="user-1"):
    """An owner with team-wide reach, or confined to ``project_id``."""
    return SocketOwner(team_id=team_id, user_id=user_id, project_id=project_id)


def _seat(manager, team_id, *sockets, project_id=None):
    """Register already-accepted sockets, owners and all, as connect does."""
    manager.active_connections.setdefault(team_id, set()).update(sockets)
    for ws in sockets:
        manager.owners[ws] = _owner(team_id, project_id)


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
        await manager.connect(ws, "team-1", owner=_owner("team-1"))

        ws.accept.assert_awaited_once()
        assert ws in manager.active_connections["team-1"]

    @pytest.mark.asyncio
    async def test_connect_multiple_to_same_team(self, manager):
        ws1 = make_ws()
        ws2 = make_ws()
        await manager.connect(ws1, "team-1", owner=_owner("team-1"))
        await manager.connect(ws2, "team-1", owner=_owner("team-1"))

        assert len(manager.active_connections["team-1"]) == 2

    @pytest.mark.asyncio
    async def test_connect_different_teams(self, manager):
        ws1 = make_ws()
        ws2 = make_ws()
        await manager.connect(ws1, "team-1", owner=_owner("team-1"))
        await manager.connect(ws2, "team-2", owner=_owner("team-2"))

        assert len(manager.active_connections["team-1"]) == 1
        assert len(manager.active_connections["team-2"]) == 1

    def test_disconnect_removes_connection(self, manager):
        ws = make_ws()
        _seat(manager, "team-1", ws)

        manager.disconnect(ws, "team-1")
        assert "team-1" not in manager.active_connections

    def test_disconnect_keeps_other_connections(self, manager):
        ws1 = make_ws()
        ws2 = make_ws()
        _seat(manager, "team-1", ws1, ws2)

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
        _seat(manager, "team-1", ws1)

        # Disconnecting ws2 (not in set) should not raise
        manager.disconnect(ws2, "team-1")
        assert ws1 in manager.active_connections["team-1"]

    @pytest.mark.asyncio
    async def test_broadcast_to_team(self, manager):
        ws1 = make_ws()
        ws2 = make_ws()
        _seat(manager, "team-1", ws1, ws2)

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
        _seat(manager, "team-1", ws_alive, ws_dead)

        await manager.broadcast_to_team("team-1", {"type": "test"})

        # Dead connection should be removed
        assert ws_dead not in manager.active_connections["team-1"]
        assert ws_alive in manager.active_connections["team-1"]

    @pytest.mark.asyncio
    async def test_broadcast_only_targets_specified_team(self, manager):
        ws1 = make_ws()
        ws2 = make_ws()
        _seat(manager, "team-1", ws1)
        _seat(manager, "team-2", ws2)

        await manager.broadcast_to_team("team-1", {"type": "test"})

        ws1.send_json.assert_awaited_once()
        ws2.send_json.assert_not_awaited()


class TestBroadcastHelpers:
    @pytest.mark.asyncio
    async def test_broadcast_issue_event(self, monkeypatch):
        mock_broadcast = AsyncMock()
        monkeypatch.setattr("app.websocket.manager.broadcast_to_team", mock_broadcast)

        await broadcast_issue_event("team-1", "created", {"id": "i1", "title": "Test"}, project_id="p1")

        mock_broadcast.assert_awaited_once_with("team-1", {
            "type": "created",
            "entity": "issue",
            "data": {"id": "i1", "title": "Test"},
            "project_id": "p1",
        })

    @pytest.mark.asyncio
    async def test_broadcast_comment_event(self, monkeypatch):
        mock_broadcast = AsyncMock()
        monkeypatch.setattr("app.websocket.manager.broadcast_to_team", mock_broadcast)

        await broadcast_comment_event("team-1", "created", {"id": "c1"}, project_id="p1")

        mock_broadcast.assert_awaited_once_with("team-1", {
            "type": "created",
            "entity": "comment",
            "data": {"id": "c1"},
            "project_id": "p1",
        })

    @pytest.mark.asyncio
    async def test_broadcast_project_event(self, monkeypatch):
        mock_broadcast = AsyncMock()
        monkeypatch.setattr("app.websocket.manager.broadcast_to_team", mock_broadcast)

        await broadcast_project_event("team-1", "updated", {"id": "p1"}, project_id="p1")

        mock_broadcast.assert_awaited_once_with("team-1", {
            "type": "updated",
            "entity": "project",
            "data": {"id": "p1"},
            "project_id": "p1",
        })

    @pytest.mark.asyncio
    async def test_broadcast_activity_event(self, monkeypatch):
        mock_broadcast = AsyncMock()
        monkeypatch.setattr("app.websocket.manager.broadcast_to_team", mock_broadcast)

        await broadcast_activity_event("team-1", "created", {"id": "a1"}, project_id="p1")

        mock_broadcast.assert_awaited_once_with("team-1", {
            "type": "created",
            "entity": "activity",
            "data": {"id": "a1"},
            "project_id": "p1",
        })

    @pytest.mark.asyncio
    async def test_broadcast_relation_event(self, monkeypatch):
        mock_broadcast = AsyncMock()
        monkeypatch.setattr("app.websocket.manager.broadcast_to_team", mock_broadcast)

        await broadcast_relation_event("team-1", "created", {"source_issue_id": "i1", "target_issue_id": "i2"}, project_id="p1")

        mock_broadcast.assert_awaited_once_with("team-1", {
            "type": "created",
            "entity": "relation",
            "data": {"source_issue_id": "i1", "target_issue_id": "i2"},
            "project_id": "p1",
        })

    @pytest.mark.asyncio
    async def test_broadcast_attestation_event(self, monkeypatch):
        mock_broadcast = AsyncMock()
        monkeypatch.setattr("app.websocket.manager.broadcast_to_team", mock_broadcast)

        await broadcast_attestation_event("team-1", "completed", {"ritual_id": "r1", "issue_id": "i1"}, project_id="p1")

        mock_broadcast.assert_awaited_once_with("team-1", {
            "type": "completed",
            "entity": "attestation",
            "data": {"ritual_id": "r1", "issue_id": "i1"},
            "project_id": "p1",
        })

    @pytest.mark.asyncio
    async def test_broadcast_document_event(self, monkeypatch):
        """CHT-1213: documents previously broadcast nothing on mutation."""
        mock_broadcast = AsyncMock()
        monkeypatch.setattr("app.websocket.manager.broadcast_to_team", mock_broadcast)

        await broadcast_document_event("team-1", "created", {"id": "d1", "title": "Doc"}, project_id="p1")

        mock_broadcast.assert_awaited_once_with("team-1", {
            "type": "created",
            "entity": "document",
            "data": {"id": "d1", "title": "Doc"},
            "project_id": "p1",
        })


class TestBroadcastWhileDisconnecting:
    """PR #352 review, finding 1: a disconnect landing during a
    broadcast's await (a client closing, or /ws closing a socket whose
    credential failed its re-check) must not break the broadcast."""

    @pytest.mark.asyncio
    async def test_other_socket_removed_mid_broadcast(self, manager):
        import asyncio

        slow, other = make_ws(), make_ws()

        async def slow_send(message):
            await asyncio.sleep(0.05)

        slow.send_json.side_effect = slow_send
        _seat(manager, "team-1", slow, other)

        async def drop_soon():
            await asyncio.sleep(0.01)
            manager.disconnect(other, "team-1")

        await asyncio.gather(manager.broadcast_to_team("team-1", {"type": "t"}), drop_soon())
        assert manager.active_connections["team-1"] == {slow}

    @pytest.mark.asyncio
    async def test_dead_socket_whose_team_is_gone_by_cleanup(self, manager):
        import asyncio

        dead = make_ws()

        async def dies(message):
            await asyncio.sleep(0.05)
            raise RuntimeError("closed")

        dead.send_json.side_effect = dies
        _seat(manager, "team-1", dead)

        async def drop_soon():
            await asyncio.sleep(0.01)
            manager.disconnect(dead, "team-1")  # empties and deletes the team

        await asyncio.gather(manager.broadcast_to_team("team-1", {"type": "t"}), drop_soon())
        assert "team-1" not in manager.active_connections
