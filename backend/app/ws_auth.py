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
import ipaddress
import logging
import math
import re
import sys
import time
from collections import OrderedDict, deque
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
    if ":" in str(host):
        return f"[{host}]:{port}"  # an IPv6 address: its port would be ambiguous
    return f"{host}:{port}"


def _client_host(websocket) -> str:
    client = getattr(websocket, "client", None)
    return "-" if client is None else str(client[0])


def _client_key(host: str) -> str:
    """What the refusal caps and the log limiter count a client by
    (PR #360 review, M1): an IPv4 address, or the /64 an IPv6 address is
    in, since one IPv6 host can usually source from any address in its
    /64. An IPv4-mapped IPv6 address counts as its IPv4 address; anything
    that is not an IP address (no address known, a socket path) as is."""
    try:
        ip = ipaddress.ip_address(host)
    except ValueError:
        return host
    if ip.version == 4:
        return str(ip)
    if ip.ipv4_mapped is not None:
        return str(ip.ipv4_mapped)
    return str(ipaddress.IPv6Network((int(ip) >> 64 << 64, 64)))


# How long a refused handshake can hold its connection: uvicorn's
# websockets implementations wait this long for the client to answer the
# close frame (``close_timeout``, hard-coded, not configurable) before
# dropping it. A client that answers (every browser, OkHttp) frees it at
# once; this is the bound for one that does not (CHT-1635).
REFUSAL_HOLD_SECONDS = 10.0
# At most this many refusals that hold a connection (accept, then close)
# per client (an IPv4 address or an IPv6 /64, ``_client_key``), and in
# all, within REFUSAL_HOLD_SECONDS, in each server process. Past either
# cap a refusal is an HTTP 429 on the handshake, which drops the
# connection at once: so no client holds more than
# MAX_HELD_REFUSALS_PER_CLIENT connections open through refusals, and a
# process no more than MAX_HELD_REFUSALS (CHT-1635).
MAX_HELD_REFUSALS_PER_CLIENT = 8
MAX_HELD_REFUSALS = 256
# A refusal is logged at most once per this many seconds for each
# (client, code, reason, outcome); the next line that is logged says how
# many were not (CHT-1635).
REFUSAL_LOG_INTERVAL_SECONDS = 60.0
# And no more than this many refusal lines in all per
# REFUSAL_LOG_INTERVAL_SECONDS: past it, refusals are counted into one
# summary line, written with the first refusal of the next interval
# (PR #360 review, M1).
REFUSAL_LOG_BUDGET = 100
# How many keys the log limiter remembers. Past it, the oldest is
# forgotten, and its suppressed count goes into the summary.
_MAX_LOG_KEYS = 1024
# Retry-After on a 503 for a failed check, and the floor of one on a 429.
RETRY_AFTER_SECONDS = 5

_DENIAL_EXTENSION = "websocket.http.response"


class _RefusalGate:
    """Counts the refusals that hold a connection (``refuse`` accepts the
    handshake, then closes it, and the server waits up to
    REFUSAL_HOLD_SECONDS for the client's answer), per client
    (``_client_key``) and in all, over the last REFUSAL_HOLD_SECONDS.
    Monotonic clock; memory is bounded by MAX_HELD_REFUSALS, since a
    client with no refusal in the window is forgotten."""

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
        """Record a held refusal for ``host`` (a ``_client_key``) and
        return None, or, when a cap is reached, record nothing and return
        how many seconds until one frees up."""
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


class _Unlogged:
    """What a limiter left out: how many, and when the first and the last
    of them happened, so a summary written late says when they were, not
    how long since the previous line (PR #360 re-review, L4)."""

    __slots__ = ("count", "first", "last")

    def __init__(self):
        self.count = 0
        self.first = 0.0
        self.last = 0.0

    def add(self, now: float, count: int = 1, first: float | None = None) -> None:
        if not self.count:
            self.first = now if first is None else first
        elif first is not None:
            self.first = min(self.first, first)
        self.count += count
        self.last = now

    def suffix(self, now: float) -> tuple[int, str]:
        """The count, and when: ``12s ago`` or ``between 70s and 12s ago``."""
        first, last = int(now - self.first), int(now - self.last)
        return self.count, (f"{first}s ago" if first == last else f"between {first}s and {last}s ago")


class _RefusalLog:
    """Logs the refusal lines so a flood cannot fill the log.

    At most one line per REFUSAL_LOG_INTERVAL_SECONDS for each (client,
    code, reason, outcome): the first is written, the rest are counted,
    and the count goes out with the key's next line. And at most
    REFUSAL_LOG_BUDGET lines in all per interval: past it, a refusal
    whose key has no line yet, and the count of a key forgotten to make
    room, go into one summary line ("N more refusals from M clients not
    logged"), written with the first refusal after the interval ends. A
    flood from many clients therefore writes the first line of the
    first REFUSAL_LOG_BUDGET of them and one summary a minute. Counts say
    when the refusals they stand for happened (``_Unlogged``); a count is
    written only when a later refusal comes (CHT-1641)."""

    def __init__(self, clock=time.monotonic):
        self._clock = clock
        # key -> [when last logged, what was not logged since]
        self._seen: dict[tuple, list] = {}
        self._window_start: float | None = None
        self._lines = 0
        self._unlogged = _Unlogged()
        self._unlogged_clients: set[str] = set()

    def _roll(self, now: float) -> None:
        if self._window_start is not None and now - self._window_start < REFUSAL_LOG_INTERVAL_SECONDS:
            return
        if self._unlogged.count:
            count, when = self._unlogged.suffix(now)
            logger.warning(
                "Refused /ws handshake: %d more refusals from %s%d clients not logged, %s",
                count,
                "at least " if len(self._unlogged_clients) >= _MAX_LOG_KEYS else "",
                len(self._unlogged_clients), when,
            )
        self._window_start = now
        self._lines = 0
        self._unlogged = _Unlogged()
        self._unlogged_clients = set()

    def _count_unlogged(self, client: str, now: float, count: int = 1, first: float | None = None) -> None:
        self._unlogged.add(now, count, first)
        if len(self._unlogged_clients) < _MAX_LOG_KEYS:
            self._unlogged_clients.add(client)

    def log(self, key: tuple, message: str, *args) -> None:
        now = self._clock()
        self._roll(now)
        entry = self._seen.get(key)
        if entry is not None and now - entry[0] < REFUSAL_LOG_INTERVAL_SECONDS:
            entry[1].add(now)
            return
        if self._lines >= REFUSAL_LOG_BUDGET:
            if entry is not None:
                entry[1].add(now)  # goes out with this key's next line
            else:
                self._count_unlogged(key[0], now)
            return
        self._lines += 1
        if entry is not None:
            del self._seen[key]  # re-inserted below, as the newest
            if entry[1].count:
                count, when = entry[1].suffix(now)
                message += " (%d more like it not logged, %s)"
                args = (*args, count, when)
        elif len(self._seen) >= _MAX_LOG_KEYS:
            self._evict(now)
        self._seen[key] = [now, _Unlogged()]
        logger.warning(message, *args)

    def _evict(self, now: float) -> None:
        expired = [k for k, (when, _) in self._seen.items() if now - when >= REFUSAL_LOG_INTERVAL_SECONDS]
        if not expired:
            expired = [next(iter(self._seen))]  # the oldest
        for key in expired:
            _, unlogged = self._seen.pop(key)
            if unlogged.count:
                self._count_unlogged(key[0], unlogged.last, unlogged.count, unlogged.first)


# What a failure's message has that differs between occurrences of the
# same failure, blanked out of its kind: tokens and other base64 or
# base64url runs (a JWT included), hex runs with or without dashes (ids,
# UUIDs, hashes), and any other digits (PR #360 re-review 2, L5).
_DIGITS_AND_IDS = re.compile(r"[A-Za-z0-9_\-+/=.]{20,}|[0-9a-fA-F-]{8,}|\d+")
# Only this much of a failure's message is looked at.
_KIND_MESSAGE_CHARS = 200
# How many kinds of failed check ``_ErrorLog`` tells apart.
_MAX_ERROR_KINDS = 64


class _ErrorLog:
    """Logs a failed credential check with its traceback, rate-limited
    (PR #360 review, L2): during a database outage every handshake and
    every open socket's re-check fails, and one traceback per attempt
    would fill the log.

    Limited per kind of failure (PR #360 re-review, M2): the call site
    (its message), the exception type, and the exception's message with
    digits and ids blanked out. The first failure of each kind is always
    logged with its traceback, so a new failure is never hidden behind an
    outage's; its repeats are logged at most once per
    REFUSAL_LOG_INTERVAL_SECONDS, saying how many were not. At most
    _MAX_ERROR_KINDS kinds are remembered, the least recently seen
    forgotten first; a forgotten kind's count goes out with the next
    traceback written. As with ``_RefusalLog``, a count is written only
    when a later failure comes (CHT-1641)."""

    def __init__(self, clock=time.monotonic):
        self._clock = clock
        # kind -> [when last logged, what was not logged since]
        self._kinds: OrderedDict[tuple, list] = OrderedDict()
        self._forgotten = _Unlogged()

    @staticmethod
    def _kind(message: str, exc: BaseException | None) -> tuple:
        if exc is None:
            return (message, None, "")
        try:
            text = str(exc)[:_KIND_MESSAGE_CHARS]
        except Exception:
            # An exception whose __str__ raises must not escape the
            # limiter: the refusal or the 4011 close it is logged for
            # still has to happen (PR #360 re-review 2, L6).
            text = "<unprintable>"
        return (message, type(exc), _DIGITS_AND_IDS.sub("#", text))

    def exception(self, log: logging.Logger, message: str, *args) -> None:
        """``log.exception(message, *args)``, rate-limited; call it from an
        ``except`` block."""
        now = self._clock()
        kind = self._kind(message, sys.exc_info()[1])
        entry = self._kinds.get(kind)
        if entry is not None:
            self._kinds.move_to_end(kind)
            if now - entry[0] < REFUSAL_LOG_INTERVAL_SECONDS:
                entry[1].add(now)
                return
            if entry[1].count:
                count, when = entry[1].suffix(now)
                message += " (%d more like it not logged, %s)"
                args = (*args, count, when)
        else:
            while len(self._kinds) >= _MAX_ERROR_KINDS:
                _, (_, unlogged) = self._kinds.popitem(last=False)
                if unlogged.count:
                    self._forgotten.add(unlogged.last, unlogged.count, unlogged.first)
        self._kinds[kind] = [now, _Unlogged()]
        if self._forgotten.count:
            count, when = self._forgotten.suffix(now)
            message += " (and %d failed checks of other kinds not logged, %s)"
            args = (*args, count, when)
            self._forgotten = _Unlogged()
        log.exception(message, *args)


_gate = _RefusalGate()
_refusal_log = _RefusalLog()
_check_errors = _ErrorLog()


def log_check_error(log: logging.Logger, message: str, *args) -> None:
    """Log a failed credential check with its traceback, rate-limited
    (``_ErrorLog``). Call it from the ``except`` block."""
    _check_errors.exception(log, message, *args)


def reset_refusal_limits() -> None:
    """Forget every refusal and failed check counted so far (tests)."""
    global _gate, _refusal_log, _check_errors
    _gate = _RefusalGate()
    _refusal_log = _RefusalLog()
    _check_errors = _ErrorLog()


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
      the caps bound how many such connections one client (an IPv4
      address or an IPv6 /64), and all of them together, can hold in
      this process. A browser sees 1006 and backs off; its next attempt,
      under the cap, gets the code. While the total cap is full, every
      refused client gets the 429, so a tab whose credential has expired
      keeps retrying instead of signing out until the flood ends (PR #360
      review, L1); a good credential is never refused, so never throttled.

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
    short. The line is rate-limited (``_RefusalLog``, CHT-1635): once a
    minute per client, code, reason and outcome, and at most
    REFUSAL_LOG_BUDGET lines a minute in all, past which refusals are
    folded into one summary line. uvicorn's own access lines for the
    handshake are not limited here."""
    host = _client_key(_client_host(websocket))
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
            log_check_error(logger, "WebSocket credential re-check failed for team=%s", team_id)
            return WsRefused(CLOSE_INTERNAL_ERROR, "Credential check failed")
