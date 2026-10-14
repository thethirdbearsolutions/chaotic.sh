"""WebSocket connection manager for real-time updates."""
from __future__ import annotations

import logging
from dataclasses import dataclass
from typing import TYPE_CHECKING, Callable, Dict, Set

from fastapi import WebSocket

if TYPE_CHECKING:
    from app.auth.credentials import Principal
    from app.services.credential_events import CredentialsEnded

logger = logging.getLogger(__name__)

# The close codes of app.ws_auth, repeated here so this module does not
# import the auth stack (ws_auth imports app.api.deps).
CLOSE_UNAUTHENTICATED = 4001
CLOSE_FORBIDDEN = 4003


@dataclass(frozen=True)
class SocketOwner:
    """Who a socket was authenticated as (CHT-1616), so it can be closed
    the moment that credential ends."""

    team_id: str
    user_id: str  # the principal
    holder_user_id: str | None = None
    credential_id: str | None = None  # an API key's id
    holder_session_id: str | None = None  # an OAuth token's session

    @classmethod
    def of(cls, team_id: str, principal: Principal) -> SocketOwner:
        return cls(
            team_id=team_id,
            user_id=principal.user.id,
            holder_user_id=principal.holder_user_id,
            credential_id=principal.credential_id,
            holder_session_id=principal.holder_session_id,
        )


class ConnectionManager:
    """Manages WebSocket connections and broadcasts messages."""

    def __init__(self):
        # Map of team_id -> set of WebSocket connections
        self.active_connections: Dict[str, Set[WebSocket]] = {}
        # Who each socket is, for close_for (CHT-1616). A socket connected
        # without one is only ever closed by its own watcher.
        self.owners: Dict[WebSocket, SocketOwner] = {}

    async def connect(
        self, websocket: WebSocket, team_id: str, subprotocol: str | None = None,
        owner: SocketOwner | None = None,
    ):
        """Accept a new WebSocket connection, selecting ``subprotocol``
        (``chaotic`` when the client offered it, CHT-1603)."""
        await websocket.accept(subprotocol=subprotocol)
        if team_id not in self.active_connections:
            self.active_connections[team_id] = set()
        self.active_connections[team_id].add(websocket)
        if owner is not None:
            self.owners[websocket] = owner

    def disconnect(self, websocket: WebSocket, team_id: str) -> bool:
        """Remove a WebSocket connection. True if it was connected."""
        self.owners.pop(websocket, None)
        sockets = self.active_connections.get(team_id)
        if sockets is None or websocket not in sockets:
            return False
        sockets.discard(websocket)
        if not sockets:
            del self.active_connections[team_id]
        return True

    async def close(self, websocket: WebSocket, team_id: str, code: int) -> bool:
        """Stop broadcasting to a socket and close it with ``code``, once:
        False, and nothing sent, if it was no longer connected (another
        path closed it first). The disconnect comes before the close is
        awaited, so no broadcast reaches it meanwhile."""
        if not self.disconnect(websocket, team_id):
            return False
        try:
            await websocket.close(code=code)
        except Exception:  # already gone
            pass
        return True

    async def close_matching(self, predicate: Callable[[SocketOwner], bool], code: int) -> int:
        """Close every socket whose owner matches. Returns how many."""
        matched = [(ws, owner) for ws, owner in list(self.owners.items()) if predicate(owner)]
        # Every match leaves the broadcast sets before any close is
        # awaited: a broadcast running between two closes reaches none.
        matched = [(ws, owner) for ws, owner in matched if self.disconnect(ws, owner.team_id)]
        for ws, _owner in matched:
            try:
                await ws.close(code=code)
            except Exception:  # already gone
                pass
        return len(matched)

    async def close_for(self, *, user_id: str, team_id: str | None = None, code: int) -> int:
        """Close the sockets of principal ``user_id`` (on ``team_id``'s
        feed only, when given). Returns how many."""
        return await self.close_matching(
            lambda o: o.user_id == user_id and (team_id is None or o.team_id == team_id), code,
        )

    async def broadcast_to_team(self, team_id: str, message: dict):
        """Broadcast a message to all connections in a team."""
        # A snapshot (PR #352 review, finding 1): each send awaits, and a
        # connection can be added or removed meanwhile (a client closing,
        # or /ws closing a socket whose credential failed its re-check).
        # Iterating the live set raised "Set changed size during
        # iteration" and turned the committed write that broadcast into a
        # 500.
        dead_connections = set()
        for connection in list(self.active_connections.get(team_id, ())):
            # Closed since the snapshot (a revocation, PR #356 review, 4):
            # skip it. A send already in flight cannot be recalled.
            if connection not in self.active_connections.get(team_id, ()):
                continue
            try:
                await connection.send_json(message)
            except Exception:
                dead_connections.add(connection)

        # Clean up dead connections; the team's set may be gone by now.
        for connection in dead_connections:
            self.disconnect(connection, team_id)


# Global connection manager instance
manager = ConnectionManager()


async def on_credentials_ended(event: CredentialsEnded) -> None:
    """The credential-ended hook (``app.services.credential_events``):
    close the sockets the event ended, at once rather than at their next
    re-check (CHT-1616), with the code that re-check would give. In this
    process only; the re-check covers the rest."""
    # Imported here: credential_events imports this module.
    from app.services.revocation_service import REASON_PRINCIPAL_DELETED

    if event.key_ids or event.holder_session_ids:
        await manager.close_matching(
            lambda o: o.credential_id in event.key_ids or o.holder_session_id in event.holder_session_ids,
            CLOSE_UNAUTHENTICATED,
        )
    if event.user_ids or event.holder_user_ids:
        # A user deleted no longer exists (4001, as 401 on REST); one
        # deactivated does but may not connect (4003).
        code = CLOSE_UNAUTHENTICATED if event.reason == REASON_PRINCIPAL_DELETED else CLOSE_FORBIDDEN
        await manager.close_matching(
            lambda o: o.user_id in event.user_ids or o.user_id in event.holder_user_ids
            or (o.holder_user_id is not None and o.holder_user_id in event.holder_user_ids),
            code,
        )
    if event.removed_member is not None:
        # /ws refuses agents, so the member is the socket's principal.
        team_id, user_id = event.removed_member
        await manager.close_for(user_id=user_id, team_id=team_id, code=CLOSE_FORBIDDEN)
    if event.deleted_team_id is not None:
        await manager.close_matching(lambda o: o.team_id == event.deleted_team_id, CLOSE_FORBIDDEN)


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


async def broadcast_document_event(team_id: str, event_type: str, document_data: dict):
    """Broadcast a document event to all team members (CHT-1213).

    Documents previously broadcast nothing on create/update/delete — every
    other entity (issue, project, sprint, comment) does. Document *comments*
    already broadcast via broadcast_comment_event above; this covers the
    document itself.
    """
    await manager.broadcast_to_team(team_id, {
        "type": event_type,
        "entity": "document",
        "data": document_data
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


async def broadcast_inbox_event(team_id: str, event_type: str, inbox_data: dict):
    """Broadcast an inbox event to all team members (CHT-1250).

    Like every other broadcast_*_event, this fans out to the whole team's
    connections, not just the entry's recipient -- the payload carries
    `recipient_user_id` so each client can filter for itself (mirrors how
    issue events carry `assignee_id` for the same client-side filtering).
    """
    await manager.broadcast_to_team(team_id, {
        "type": event_type,
        "entity": "inbox",
        "data": inbox_data
    })
