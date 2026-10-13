"""Authentication for the /ws realtime socket (CHT-1567, CHT-1603).

/ws is an adapter over the shared credential resolver
(``app.auth.credentials.ws_resolver``), like REST and /mcp, so every
check REST makes applies here too: a revoked or expired key or token, a
deactivated user, an agent key whose holder left the agent's team. It
takes what REST takes (API keys, session JWTs, and OAuth access tokens
issued for the whole server, ``<base>``), with one more rule: an agent
is refused, whatever its credential (4003). /ws is the live feed of the
people's own clients (the web app, the native app's human session,
CHT-1602), and that feed is broader than REST gives an agent: every
project's events in the team, and inbox events for every recipient
(filtered by the client, CHT-1250), where a project-scoped agent reads
one project and an agent only its own inbox on REST. Today every OAuth
session acts as an agent, so in practice /ws refuses every OAuth token
until CHT-1602 adds human sessions; a connector token (issued for
``<base>/mcp``) is refused by its audience either way (4001).

Where the credential comes from, in this order (``presented_credential``):

1. ``Authorization: Bearer <token>`` on the upgrade request. Native
   clients (OkHttp) send headers on the handshake.
2. A ``Sec-WebSocket-Protocol`` entry ``chaotic.bearer.<token>``, offered
   alongside ``chaotic``, the subprotocol the server selects. A browser's
   ``WebSocket`` cannot set headers, and this is the one header it can
   set. The server never echoes the bearer entry.
3. ``?token=<token>``: deprecated. The web app sent its login JWT this way
   until CHT-1603, and a tab still running an older bundle does until it
   reloads. It still works, and the server logs a deprecation warning
   (once per process). A URL ends up in access logs and proxy logs; the
   two above do not.

A credential presented in more than one place must be the same in each,
or the handshake is refused. ``team_id`` stays in the query: it is not a
secret.

Close codes: 4001 when the credential is missing, malformed, of a kind /ws
does not take, unknown, expired or revoked (the client should sign in
again); 4003 when the credential is good but its user is deactivated or
an agent, its scope does not allow reading, or it has no access to
``team_id``; 4011
when the check itself failed. A user who no longer exists is 4001, as it
is 401 on REST (it was 4003 before CHT-1567).

The check is repeated while the socket is open (``watch``), every
``WS_AUTH_RECHECK_SECONDS`` (30 by default): a credential that has been
revoked or has expired, a user deactivated, or a member removed from the
team is closed with the code above at the next check, and stops getting
broadcasts at once. An OAuth access token lives ten minutes, so a socket
opened with one closes when it expires, and the client reconnects with
its refreshed token.
"""
from __future__ import annotations

import asyncio
import logging
from dataclasses import dataclass

from fastapi import HTTPException

from app.api.deps import check_user_team_access
from app.auth.access import authorize, reads
from app.auth.credentials import (
    CredentialError,
    CredentialFailure,
    Principal,
    ws_resolver,
)
from app.config import get_settings

logger = logging.getLogger(__name__)

SUBPROTOCOL = "chaotic"
BEARER_PROTOCOL_PREFIX = "chaotic.bearer."

CLOSE_UNAUTHENTICATED = 4001
CLOSE_FORBIDDEN = 4003
CLOSE_INTERNAL_ERROR = 4011

QUERY_TOKEN_DEPRECATION = (
    "/ws?token= is deprecated (CHT-1603): a credential in a URL reaches access and proxy logs. "
    "Send it as 'Authorization: Bearer <token>' on the upgrade request, or offer the "
    "subprotocols 'chaotic' and 'chaotic.bearer.<token>'."
)
_warned_query_token = False


class WsRefused(Exception):
    """The socket must be closed with ``code``."""

    def __init__(self, code: int, reason: str):
        super().__init__(reason)
        self.code = code
        self.reason = reason


@dataclass(frozen=True)
class PresentedCredential:
    token: str | None
    # The subprotocol to select on accept: ``chaotic`` if the client
    # offered it, else none.
    subprotocol: str | None
    via_query: bool = False


@reads
def realtime_feed():
    """What /ws lets a principal do, for ``authorize``: read the team's
    live events. Never called."""


def _offered_subprotocols(websocket) -> list[str]:
    offered = websocket.scope.get("subprotocols") or []
    return [p.strip() for p in offered if isinstance(p, str)]


def presented_credential(websocket, query_token: str | None) -> PresentedCredential:
    """The credential this handshake carries, by the order in the module
    docstring. Raises ``WsRefused`` (4001) when the places disagree or the
    Authorization header is not a bearer token."""
    global _warned_query_token

    found: list[str] = []
    authorization = websocket.headers.get("authorization")
    if authorization is not None:
        scheme, _, value = authorization.strip().partition(" ")
        if scheme.lower() != "bearer" or not value.strip():
            raise WsRefused(CLOSE_UNAUTHENTICATED, "Authorization header is not a bearer token")
        found.append(value.strip())

    offered = _offered_subprotocols(websocket)
    for entry in offered:
        if entry.startswith(BEARER_PROTOCOL_PREFIX):
            found.append(entry[len(BEARER_PROTOCOL_PREFIX):])

    via_query = False
    if query_token:
        found.append(query_token)
        if len(found) == 1:
            via_query = True
            if not _warned_query_token:
                _warned_query_token = True
                logger.warning(QUERY_TOKEN_DEPRECATION)

    if len(set(found)) > 1:
        raise WsRefused(CLOSE_UNAUTHENTICATED, "Different credentials presented")
    return PresentedCredential(
        token=found[0] if found else None,
        subprotocol=SUBPROTOCOL if SUBPROTOCOL in offered else None,
        via_query=via_query,
    )


async def authenticate(token: str | None, team_id: str) -> Principal:
    """The principal ``token`` signs in as, if it may watch ``team_id``'s
    live feed; else ``WsRefused`` with the close code."""
    try:
        principal = await ws_resolver.resolve(token)
    except CredentialError as exc:
        code = CLOSE_FORBIDDEN if exc.failure is CredentialFailure.INACTIVE else CLOSE_UNAUTHENTICATED
        raise WsRefused(code, exc.detail) from None
    if principal.user.is_agent:
        raise WsRefused(CLOSE_FORBIDDEN, "Agents cannot subscribe to the live feed")
    try:
        authorize(principal, realtime_feed)
    except HTTPException:
        raise WsRefused(CLOSE_FORBIDDEN, "Credential scope does not allow reading") from None
    if not await check_user_team_access(principal.user, team_id):
        raise WsRefused(CLOSE_FORBIDDEN, "No access to this team")
    return principal


async def watch(token: str, team_id: str, *, interval: float | None = None) -> WsRefused:
    """Re-run ``authenticate`` every ``interval`` seconds while the socket
    is open; return the refusal once it fails. A check that errors is a
    refusal too (4011): the client reconnects and is checked afresh."""
    if interval is None:
        interval = get_settings().ws_auth_recheck_seconds
    while True:
        await asyncio.sleep(interval)
        try:
            await authenticate(token, team_id)
        except WsRefused as exc:
            return exc
        except Exception:
            logger.exception("WebSocket credential re-check failed for team=%s", team_id)
            return WsRefused(CLOSE_INTERNAL_ERROR, "Credential check failed")
