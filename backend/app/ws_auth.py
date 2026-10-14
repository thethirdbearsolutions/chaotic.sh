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
   set. The server never echoes the bearer entry. A client that offers
   only the bearer entry still connects, with no subprotocol selected
   (RFC 6455 4.1: a client fails only on a protocol it did not offer).
3. ``?token=<token>``: deprecated. The web app sent its login JWT this way
   until CHT-1603, and a tab still running an older bundle does until it
   reloads. It still works, and the server logs a deprecation warning
   (once per process). A URL ends up in access logs and proxy logs; the
   two above do not.

A credential presented in more than one place must be the same in each,
or the handshake is refused. ``team_id`` stays in the query: it is not a
secret.

Close codes, sent the same way whether the handshake is refused or an
open socket is closed (``refuse`` accepts the handshake, then closes it
with the code, CHT-1615): 4001 when the credential is missing,
malformed, of a kind /ws does not take, unknown, expired or revoked (the
client should sign in again); 4003 when the credential is good but its
user is deactivated or an agent, its scope does not allow reading, or it
has no access to ``team_id`` (or names none); 4011 when the check itself failed (the
client should retry). A user who no longer exists is 4001, as it is 401
on REST (it was 4003 before CHT-1567). A client cannot tell a refused
handshake from an open socket closed at once, and need not: the code
says what to do.

The check is repeated while the socket is open (``watch``), every
``WS_AUTH_RECHECK_SECONDS`` (30 by default): a credential that has been
revoked or has expired, a user deactivated, or a member removed from the
team is closed with the code above at the next check, and stops getting
broadcasts at once. A revocation made in this process closes the socket
before that, as soon as it commits (CHT-1616: a key or holder session
revoked, a user deactivated or deleted, a member removed, a team
deleted; ``app.websocket.on_credentials_ended``, run by
``app.services.credential_events``); the re-check stays as the backstop
for expiry and for revocations made by another process. An OAuth access token lives ten minutes, so a socket
opened with one closes (4001) when it expires; a client that can refresh
(the native app) reconnects with its new token. The web app cannot
refresh its login JWT, so on 4001 it signs out (or, if another tab has
signed in since, just stops), and on 4003 it stops reconnecting. Since
a refused handshake opens before it closes, a client should not take
``onopen`` as "the credential was good": the web app counts a socket as
up (clearing its backoff) only once it has stayed open a moment or a
message has arrived (``WS_OPEN_SETTLE_MS``, ``frontend/src/ws.js``).
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


def _client_address(websocket) -> str:
    client = getattr(websocket, "client", None)
    if client is None:
        return "-"
    host, port = client[0], client[1]
    return f"{host}:{port}"


async def refuse(websocket, code: int, reason: str, team_id: str | None) -> None:
    """Refuse a handshake so the client sees ``code`` (CHT-1615): accept
    the socket, then close it at once with the code. Nothing is sent in
    between, and the socket is never registered for broadcasts.

    A close before accept never reaches the client as a code: the server
    turns it into an HTTP 403 on the handshake, whatever the code. A
    distinct denial status (401 / 403 / 503) would reach a native client
    (OkHttp hands ``onFailure`` the response) but not a browser: a
    failed handshake reaches a page only as a close with code 1006, by
    design, so the web app could not tell "sign in again" from
    "forbidden". A close frame after accept reaches both, as
    ``CloseEvent.code`` and as OkHttp's ``onClosing(code, ...)``, the same
    way a mid-connection close does.

    ``chaotic`` is selected if the client offered it, as on a good
    handshake: a browser that offered subprotocols fails a handshake
    whose response selects none, and would see 1006 again.

    Each refusal is logged (INFO, ``app.ws_auth``) with its code, reason,
    client address and team, never the credential: the access log now
    shows a refused handshake as accepted, so this line is the only
    server-side record of it (PR #359 review, 1). ``team_id`` is the
    client's text, so it is logged quoted and cut short.

    The connection stays open until the client answers the close frame,
    or for the server's close timeout (10 s with uvicorn's websockets
    implementations) if it never does; the 403 path dropped it at once
    (PR #359 review, 2; CHT-1635)."""
    logger.info(
        "Refused /ws handshake: code=%s reason=%s client=%s team=%r",
        code, reason, _client_address(websocket), (team_id or "")[:64],
    )
    subprotocol = SUBPROTOCOL if SUBPROTOCOL in _offered_subprotocols(websocket) else None
    try:
        await websocket.accept(subprotocol=subprotocol)
        await websocket.close(code=code)
    except Exception:
        # The client went away during the handshake: nobody to tell.
        logger.debug("WebSocket refusal (%s) not delivered", code, exc_info=True)


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


@reads
def realtime_feed():
    """What /ws lets a principal do, for ``authorize``: read the team's
    live events. Never called."""


def _offered_subprotocols(websocket) -> list[str]:
    offered = websocket.scope.get("subprotocols") or []
    return [p.strip() for p in offered if isinstance(p, str)]


def presented_credential(websocket, query_token: str | None) -> PresentedCredential:
    """The credential this handshake carries, by the order in the module
    docstring. Raises ``WsRefused`` (4001) when the places disagree.

    An Authorization header that is not a bearer token is ignored, not
    refused (PR #352 review, finding 3): a browser can attach cached HTTP
    auth, or a proxy its own header, to the upgrade, and the page cannot
    stop it. With no other source the handshake has no credential (4001)."""
    global _warned_query_token

    found: list[str] = []
    authorization = websocket.headers.get("authorization")
    if authorization is not None:
        scheme, _, value = authorization.strip().partition(" ")
        if scheme.lower() == "bearer" and value.strip():
            found.append(value.strip())

    offered = _offered_subprotocols(websocket)
    for entry in offered:
        if entry.startswith(BEARER_PROTOCOL_PREFIX):
            found.append(entry[len(BEARER_PROTOCOL_PREFIX):])

    if query_token:
        # Warned whatever else came with it: the URL leaks the token to
        # access logs either way (PR #352 review, finding 6).
        found.append(query_token)
        if not _warned_query_token:
            _warned_query_token = True
            logger.warning(QUERY_TOKEN_DEPRECATION)

    if len(set(found)) > 1:
        raise WsRefused(CLOSE_UNAUTHENTICATED, "Different credentials presented")
    return PresentedCredential(
        token=found[0] if found else None,
        subprotocol=SUBPROTOCOL if SUBPROTOCOL in offered else None,
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
