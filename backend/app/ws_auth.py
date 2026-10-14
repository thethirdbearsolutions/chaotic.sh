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
says what to do. Two refusals are HTTP statuses on the handshake
instead (``refuse``): a failed check is a 503 (CHT-1637), and a refusal
past the per-address or total cap on refusals in flight is a 429
(CHT-1635), both with ``Retry-After``. A browser sees either as 1006 and
retries with backoff, as it does on 4011.

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
import math
import time
from collections import deque
from dataclasses import dataclass

from fastapi import HTTPException
from starlette.responses import Response

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


def _client_host(websocket) -> str:
    client = getattr(websocket, "client", None)
    return "-" if client is None else str(client[0])


# How long a refused handshake can hold its connection: uvicorn's
# websockets implementations wait this long for the client to answer the
# close frame (``close_timeout``, hard-coded, not configurable) before
# dropping it. A client that answers (every browser, OkHttp) frees it at
# once; this is the bound for one that does not (CHT-1635).
REFUSAL_HOLD_SECONDS = 10.0
# At most this many refusals that hold a connection (accept, then close)
# per client address, and in all, within REFUSAL_HOLD_SECONDS. Past
# either cap a refusal is an HTTP 429 on the handshake, which drops the
# connection at once: so no client address holds more than
# MAX_HELD_REFUSALS_PER_CLIENT connections open through refusals, and
# the server no more than MAX_HELD_REFUSALS (CHT-1635).
MAX_HELD_REFUSALS_PER_CLIENT = 8
MAX_HELD_REFUSALS = 256
# A refusal is logged at most once per this many seconds for each
# (client address, code, reason); the next line that is logged says how
# many were not (CHT-1635).
REFUSAL_LOG_INTERVAL_SECONDS = 60.0
# How many (client, code, reason) keys the log limiter remembers. Past
# it, the oldest is forgotten (and its suppressed count logged).
_MAX_LOG_KEYS = 1024
# Retry-After on a 503 for a failed check, and the floor of one on a 429.
RETRY_AFTER_SECONDS = 5

_DENIAL_EXTENSION = "websocket.http.response"


class _RefusalGate:
    """Counts the refusals that hold a connection (``refuse`` accepts the
    handshake, then closes it, and the server waits up to
    REFUSAL_HOLD_SECONDS for the client's answer), per client address and
    in all, over the last REFUSAL_HOLD_SECONDS. Monotonic clock; memory
    is bounded by MAX_HELD_REFUSALS, since an address with no refusal in
    the window is forgotten."""

    def __init__(self, clock=time.monotonic):
        self._clock = clock
        self._by_host: dict[str, deque[float]] = {}
        self._all: deque[float] = deque()

    def _prune(self, now: float) -> None:
        horizon = now - REFUSAL_HOLD_SECONDS
        while self._all and self._all[0] <= horizon:
            self._all.popleft()
        if len(self._by_host) > MAX_HELD_REFUSALS:
            for host in [h for h, q in self._by_host.items() if not q or q[-1] <= horizon]:
                del self._by_host[host]

    def admit(self, host: str) -> float | None:
        """Record a held refusal for ``host`` and return None, or, when a
        cap is reached, record nothing and return how many seconds until
        one frees up."""
        now = self._clock()
        self._prune(now)
        horizon = now - REFUSAL_HOLD_SECONDS
        mine = self._by_host.get(host)
        if mine is not None:
            while mine and mine[0] <= horizon:
                mine.popleft()
        if mine is not None and len(mine) >= MAX_HELD_REFUSALS_PER_CLIENT:
            return mine[0] - horizon
        if len(self._all) >= MAX_HELD_REFUSALS:
            return self._all[0] - horizon
        if mine is None:
            mine = self._by_host[host] = deque()
        mine.append(now)
        self._all.append(now)
        return None


class _RefusalLog:
    """Logs the refusal lines, at most one per REFUSAL_LOG_INTERVAL_SECONDS
    for each (client address, code, reason, outcome), so a flood cannot
    fill the log: the first line for each key is always written, the rest
    are counted, and the count goes out with the key's next line, or as a
    line of its own when the key is forgotten to make room."""

    def __init__(self, clock=time.monotonic):
        self._clock = clock
        # key -> [when last logged, how many suppressed since]
        self._seen: dict[tuple, list] = {}

    def log(self, key: tuple, message: str, *args) -> None:
        now = self._clock()
        entry = self._seen.get(key)
        if entry is not None and now - entry[0] < REFUSAL_LOG_INTERVAL_SECONDS:
            entry[1] += 1
            return
        suppressed = entry[1] if entry is not None else 0
        if entry is not None:
            del self._seen[key]  # re-inserted below, as the newest
        elif len(self._seen) >= _MAX_LOG_KEYS:
            self._evict(now)
        self._seen[key] = [now, 0]
        if suppressed:
            message += " (%d more like it not logged in the last %ds)"
            args = (*args, suppressed, int(now - entry[0]))
        logger.warning(message, *args)

    def _evict(self, now: float) -> None:
        expired = [k for k, (when, _) in self._seen.items() if now - when >= REFUSAL_LOG_INTERVAL_SECONDS]
        if not expired:
            expired = [next(iter(self._seen))]  # the oldest
        for key in expired:
            when, suppressed = self._seen.pop(key)
            if suppressed:
                host, code, reason, outcome = key
                logger.warning(
                    "Refused /ws handshake: %d more with code=%s reason=%s client=%s as=%s not logged in the last %ds",
                    suppressed, code, reason, host, outcome, int(now - when),
                )


_gate = _RefusalGate()
_refusal_log = _RefusalLog()


def reset_refusal_limits() -> None:
    """Forget every refusal counted so far (tests)."""
    global _gate, _refusal_log
    _gate = _RefusalGate()
    _refusal_log = _RefusalLog()


def _can_deny(websocket) -> bool:
    """Whether the server takes an HTTP response for a handshake (the ASGI
    denial-response extension; uvicorn has it)."""
    return _DENIAL_EXTENSION in (websocket.scope.get("extensions") or {})


async def _deny(websocket, status: int, retry_after: int) -> None:
    """Refuse the handshake with an HTTP ``status`` and ``Retry-After``,
    which the server sends and then drops the connection at once."""
    await websocket.send_denial_response(
        Response(status_code=status, headers={"Retry-After": str(retry_after)}),
    )


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

    Two refusals are HTTP statuses instead, sent before accept, so the
    server drops the connection at once:

    - 4011 (the check itself failed, so the client should retry) is an
      HTTP 503 with ``Retry-After`` (CHT-1637). Every client already
      treats it as it treats 4011: the web app backs off and retries on
      1006 as on 4011, and a native client reads the 503. A web tab still
      running a bundle from before CHT-1615 counts any ``onopen`` as up,
      clears its backoff and resyncs over REST, so an accepted-then-closed
      4011 made it reconnect and refetch about once a second during a
      database outage, the one time 4011 happens. A 503 never opens.
      4001 and 4003 keep their close codes: a client must tell them
      apart, and neither comes in a flood from good clients.
    - A refusal past the hold caps (``_RefusalGate``) is an HTTP 429 with
      ``Retry-After`` (CHT-1635). A client that never answers the close
      frame holds its connection for the server's close timeout
      (REFUSAL_HOLD_SECONDS), where the old 403 dropped it at once, and
      the caps bound how many such connections one address, and all of
      them together, can hold. A browser sees 1006 and backs off; its
      next attempt, under the cap, gets the code.

    Without the ASGI denial-response extension both fall back: a 4011 is
    accepted and closed with its code (and counts against the caps), and
    a refusal past the caps is closed before accept (the server's own
    403).

    Each refusal is logged (WARNING, ``app.ws_auth``) with its code,
    reason, client address and team, never the credential: the access log
    shows a refused handshake as accepted, so this line is the only
    server-side record of it (PR #359 review, 1). WARNING, because nothing
    configures the ``app`` loggers under uvicorn's default logging, where
    only WARNING and up reach the output (PR #359 re-review, 1).
    ``team_id`` is the client's text, so it is logged quoted and cut
    short. The line is rate-limited per client address, code, reason and
    outcome (``_RefusalLog``, CHT-1635): the first is always logged, and a
    later one says how many were not."""
    host = _client_host(websocket)
    can_deny = _can_deny(websocket)
    unavailable = code == CLOSE_INTERNAL_ERROR and can_deny
    wait = None if unavailable else _gate.admit(host)
    if unavailable:
        outcome = "http-503"
    elif wait is not None:
        outcome = "http-429" if can_deny else "http-403"
    else:
        outcome = "close"
    _refusal_log.log(
        (host, code, reason, outcome),
        "Refused /ws handshake: code=%s reason=%s client=%s team=%r as=%s",
        code, reason, _client_address(websocket), (team_id or "")[:64], outcome,
    )
    try:
        if unavailable:
            await _deny(websocket, 503, RETRY_AFTER_SECONDS)
        elif wait is not None:
            if can_deny:
                await _deny(websocket, 429, max(RETRY_AFTER_SECONDS, math.ceil(wait)))
            else:
                await websocket.close(code=code)  # before accept: the server's 403
        else:
            subprotocol = SUBPROTOCOL if SUBPROTOCOL in _offered_subprotocols(websocket) else None
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
