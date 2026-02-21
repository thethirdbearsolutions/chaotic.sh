"""WebSocket connection manager for real-time updates."""
import json
from typing import Dict, Set
from fastapi import WebSocket


class ConnectionManager:
    """Manages WebSocket connections and broadcasts messages."""

    def __init__(self):
        # Map of team_id -> set of WebSocket connections
        self.active_connections: Dict[str, Set[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, team_id: str):
        """Accept a new WebSocket connection."""
        await websocket.accept()
        if team_id not in self.active_connections:
            self.active_connections[team_id] = set()
        self.active_connections[team_id].add(websocket)

    def disconnect(self, websocket: WebSocket, team_id: str):
        """Remove a WebSocket connection."""
        if team_id in self.active_connections:
            self.active_connections[team_id].discard(websocket)
            if not self.active_connections[team_id]:
                del self.active_connections[team_id]

    async def broadcast_to_team(self, team_id: str, message: dict):
        """Broadcast a message to all connections in a team."""
        if team_id not in self.active_connections:
            return

        dead_connections = set()
        for connection in self.active_connections[team_id]:
            try:
                await connection.send_json(message)
            except Exception:
                dead_connections.add(connection)

        # Clean up dead connections
        for connection in dead_connections:
            self.active_connections[team_id].discard(connection)


# Global connection manager instance
manager = ConnectionManager()


async def broadcast_issue_event(team_id: str, event_type: str, issue_data: dict):
    """Broadcast an issue event to all team members."""
    await manager.broadcast_to_team(team_id, {
        "type": event_type,
        "entity": "issue",
        "data": issue_data
    })


async def broadcast_project_event(team_id: str, event_type: str, project_data: dict):
    """Broadcast a project event to all team members."""
    await manager.broadcast_to_team(team_id, {
        "type": event_type,
        "entity": "project",
        "data": project_data
    })


async def broadcast_comment_event(team_id: str, event_type: str, comment_data: dict):
    """Broadcast a comment event to all team members."""
    await manager.broadcast_to_team(team_id, {
        "type": event_type,
        "entity": "comment",
        "data": comment_data
    })


async def broadcast_activity_event(team_id: str, event_type: str, activity_data: dict):
    """Broadcast an activity event to all team members (CHT-359)."""
    await manager.broadcast_to_team(team_id, {
        "type": event_type,
        "entity": "activity",
        "data": activity_data
    })


async def broadcast_relation_event(team_id: str, event_type: str, relation_data: dict):
    """Broadcast a relation event to all team members (CHT-875)."""
    await manager.broadcast_to_team(team_id, {
        "type": event_type,
        "entity": "relation",
        "data": relation_data
    })


async def broadcast_sprint_event(team_id: str, event_type: str, sprint_data: dict):
    """Broadcast a sprint event to all team members (CHT-877)."""
    await manager.broadcast_to_team(team_id, {
        "type": event_type,
        "entity": "sprint",
        "data": sprint_data
    })


async def broadcast_attestation_event(team_id: str, event_type: str, attestation_data: dict):
    """Broadcast an attestation event to all team members (CHT-881)."""
    await manager.broadcast_to_team(team_id, {
        "type": event_type,
        "entity": "attestation",
        "data": attestation_data
    })
