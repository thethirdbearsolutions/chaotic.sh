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
    the moment that credential ends, and what it may receive (CHT-1840).

    ``project_id`` is the socket's reach: the one project its principal
    is confined to (``app.api.deps.confined_project_id``), or None for a
    principal that reads all of ``team_id``'s data. It has no default, so
    nothing builds an owner without saying which; ``of`` derives it from
    the principal. A confined socket receives only the broadcasts tagged
    with its own project (``ConnectionManager._may_receive``).
    """

    team_id: str
    user_id: str  # the principal
    project_id: str | None  # the reach; None is team-wide (CHT-1840)
    holder_user_id: str | None = None
    credential_id: str | None = None  # an API key's id
    holder_session_id: str | None = None  # an OAuth token's session

    @classmethod
    def of(cls, team_id: str, principal: Principal) -> SocketOwner:
        # Imported here, like the close codes above: this module stays
        # out of the auth stack's import graph.
        from app.api.deps import confined_project_id

        user = principal.user
        project_id = confined_project_id(user)
        # /ws refuses agents today (``app.ws_auth.authenticate``). Should
        # that change, an agent's reach is still recorded here: a
        # project-scoped one gets its project above, and a team-scoped
        # one reads its own team only. Any other agent is refused rather
        # than given team-wide fan-out by default (CHT-1840).
        if user.is_agent and project_id is None and (not team_id or user.agent_team_id != team_id):
            raise ValueError(f"agent {user.id} has no recorded reach on team {team_id}")
        return cls(
            team_id=team_id,
            user_id=user.id,
            project_id=project_id,
            holder_user_id=principal.holder_user_id,
            credential_id=principal.credential_id,
            holder_session_id=principal.holder_session_id,
        )


class ConnectionManager:
    """Manages WebSocket connections and broadcasts messages."""

    def __init__(self):
        # Map of team_id -> set of WebSocket connections
        self.active_connections: Dict[str, Set[WebSocket]] = {}
        # Who each socket is, for close_for (CHT-1616) and for what it may
        # receive (CHT-1840). Every connected socket has one.
        self.owners: Dict[WebSocket, SocketOwner] = {}

    async def connect(
        self, websocket: WebSocket, team_id: str, *, owner: SocketOwner,
        subprotocol: str | None = None,
    ):
        """Accept a new WebSocket connection, selecting ``subprotocol``
        (``chaotic`` when the client offered it, CHT-1603). ``owner`` is
        required and must be for ``team_id``: it records the socket's
        reach, which every broadcast is filtered by (CHT-1840)."""
        if not isinstance(owner, SocketOwner) or owner.team_id != team_id:
            raise ValueError(f"a socket on team {team_id} needs a SocketOwner for that team, got {owner!r}")
        await websocket.accept(subprotocol=subprotocol)
        if team_id not in self.active_connections:
            self.active_connections[team_id] = set()
        self.active_connections[team_id].add(websocket)
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

    def _may_receive(self, connection: WebSocket, message: dict) -> bool:
        """May ``connection`` be sent ``message``? Decided per socket from
        its recorded reach, not left to /ws refusing every principal that
        could not read the whole team (CHT-1840). A socket confined to one
        project receives only messages tagged with that project (the
        envelope's ``project_id``); one tagged with another project, or
        with none (team-level: team documents, inbox events), never
        reaches it. A socket with no recorded owner receives nothing."""
        owner = self.owners.get(connection)
        if owner is None:
            return False
        if owner.project_id is None:
            return True
        return message.get("project_id") == owner.project_id

    async def broadcast_to_team(self, team_id: str, message: dict):
        """Broadcast a message to the team's connections that may receive
        it (``_may_receive``): now, or,
        inside a transaction (``app.db.transactions.atomic``), once it
        has committed, and not at all if it rolls back. A client that
        refetches on the event must find what it announces; a keyed
        write runs inside one for its whole request (CHT-1621)."""
        from app.db import transactions

        if transactions.active():
            async def send() -> None:
                await self._send_to_team(team_id, message)

            await transactions.on_commit(send)
            return
        await self._send_to_team(team_id, message)

    async def _send_to_team(self, team_id: str, message: dict):
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
            if not self._may_receive(connection, message):
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


def _envelope(event_type: str, entity: str, data: dict, project_id: str | None) -> dict:
    """The wire message. ``project_id`` is the project the event belongs
    to, or None for a team-level one; the manager filters on it per
    socket (CHT-1840). A client that does not know the field ignores it."""
    return {"type": event_type, "entity": entity, "data": data, "project_id": project_id}


# Each broadcast takes the event's ``project_id`` as a required keyword
# (None: team-level), so every call site says where its event belongs: a
# socket confined to a project receives only that project's events
# (CHT-1840).


async def broadcast_issue_event(team_id: str, event_type: str, issue_data: dict, *, project_id: str | None):
    """Broadcast an issue event to the team."""
    await manager.broadcast_to_team(team_id, _envelope(event_type, "issue", issue_data, project_id))


async def broadcast_project_event(team_id: str, event_type: str, project_data: dict, *, project_id: str | None):
    """Broadcast a project event to the team."""
    await manager.broadcast_to_team(team_id, _envelope(event_type, "project", project_data, project_id))


async def broadcast_comment_event(team_id: str, event_type: str, comment_data: dict, *, project_id: str | None):
    """Broadcast a comment event to the team: an issue's (its project) or
    a document's (the document's project, None for a team document)."""
    await manager.broadcast_to_team(team_id, _envelope(event_type, "comment", comment_data, project_id))


async def broadcast_document_event(team_id: str, event_type: str, document_data: dict, *, project_id: str | None):
    """Broadcast a document event to the team (CHT-1213).

    Documents previously broadcast nothing on create/update/delete — every
    other entity (issue, project, sprint, comment) does. Document *comments*
    already broadcast via broadcast_comment_event above; this covers the
    document itself.
    """
    await manager.broadcast_to_team(team_id, _envelope(event_type, "document", document_data, project_id))


async def broadcast_activity_event(team_id: str, event_type: str, activity_data: dict, *, project_id: str | None):
    """Broadcast an activity event to the team (CHT-359)."""
    await manager.broadcast_to_team(team_id, _envelope(event_type, "activity", activity_data, project_id))


async def broadcast_relation_event(team_id: str, event_type: str, relation_data: dict, *, project_id: str | None):
    """Broadcast a relation event to the team (CHT-875), tagged with the
    project of the issue the request went through."""
    await manager.broadcast_to_team(team_id, _envelope(event_type, "relation", relation_data, project_id))


async def broadcast_sprint_event(team_id: str, event_type: str, sprint_data: dict, *, project_id: str | None):
    """Broadcast a sprint event to the team (CHT-877)."""
    await manager.broadcast_to_team(team_id, _envelope(event_type, "sprint", sprint_data, project_id))


async def broadcast_attestation_event(
    team_id: str, event_type: str, attestation_data: dict, *, project_id: str | None,
):
    """Broadcast an attestation event to the team (CHT-881)."""
    await manager.broadcast_to_team(team_id, _envelope(event_type, "attestation", attestation_data, project_id))


async def broadcast_inbox_event(team_id: str, event_type: str, inbox_data: dict):
    """Broadcast an inbox event to the team (CHT-1250).

    Like every other broadcast_*_event, this fans out to the team's
    connections, not just the entry's recipient -- the payload carries
    `recipient_user_id` so each client can filter for itself (mirrors how
    issue events carry `assignee_id` for the same client-side filtering).
    It is team-level (``project_id`` None), so a socket confined to one
    project never receives it (CHT-1840).
    """
    await manager.broadcast_to_team(team_id, _envelope(event_type, "inbox", inbox_data, None))
