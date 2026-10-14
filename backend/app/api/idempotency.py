"""Idempotency-Key on the app's writes (CHT-1621).

The Android app queues what a person does and sends it when it can
(CHT-1613). Each queued write carries a key the app made once, when the
person acted, and sends it as ``Idempotency-Key`` on every attempt. A
write whose answer was lost (a timeout, a dropped connection, a
lock-screen action retried) is sent again with the same key, and must
not be done twice: the second comment, or a status change resent after
a later one, undoing it.

On a route marked ``@idempotent``, sent with the header:

1. **Claim**, in a short transaction of its own, before the endpoint
   runs: the key's record (``OxydeIdempotencyRecord``) is inserted,
   unanswered, and committed. The claim holds SQLite's write lock only
   for that insert. If the key already has a record:

   * an answer within ``REPLAY_WINDOW`` (24 h): that answer is sent
     again, status and body, with ``Idempotent-Replayed: true``, and
     nothing is done;
   * an answer older than that, a tombstone kept for
     ``TOMBSTONE_RETENTION`` (30 days): 409 ``idempotency_key_expired``,
     saying what the first answer was (done, or refused with its
     status, which the tombstone keeps). It is not done again, and the
     answer itself is gone;
   * no answer yet, claimed less than ``STALE_CLAIM`` ago: 409
     ``idempotency_in_flight`` with ``Retry-After``. The first request
     has claimed the key and not yet begun step 2 (once it has, the
     resend's claim waits on its write lock, below, and then finds its
     answer); its retry gets the first one's answer;
   * no answer, claimed longer ago: the request that claimed it died
     before its write committed (the write and its answer commit
     together), so this request takes the claim over;
   * a different method, path, query, ``X-Chaotic-Interactive`` or
     body: 422 ``idempotency_key_reused``, and nothing is done.

2. **Write**, in one transaction around the endpoint, with its answer
   stored in the same transaction (only if the claim is still this
   request's: a request that outlived ``STALE_CLAIM`` and lost its claim
   rolls everything back, refusal-path writes included), so the answer
   exists if and only if the write committed.

   The transaction's first statement takes SQLite's write lock (a
   zero-row UPDATE, as ``IssueService._take_relation_write_lock``
   does). A deferred transaction that has read cannot wait for the lock
   later: if anyone committed since its first read, its first write
   fails at once (SQLITE_BUSY_SNAPSHOT, CHT-1411), and every endpoint
   reads before it writes. Taken first, the lock is waited for (up to
   the busy timeout) instead, and nothing can commit under the
   endpoint. The window is the endpoint alone: authentication, the
   claim, the sweep and reading the body come before it, and the
   response is sent after the commit. Other writers queue behind it for
   that long; a duplicate of it waits too, and then replays its answer.

   * 2xx, and a 4xx that is the request's answer: stored, and committed
     with whatever the request wrote (a refused request commits what it
     did before the refusal, as it does without a key).
   * A 4xx that only says how things stand right now (408, 409, 425,
     429: the sprint is in arrears or limbo, a ritual is pending, the
     ticket is claimed, someone already decided): not stored. The claim
     is released in the same transaction, so a resend asks again.
   * A 5xx, or anything else that raises: the write rolls back and the
     claim is released, so a resend is a fresh attempt. SQLite's busy
     errors become a 503 ``idempotency_busy`` with ``Retry-After``.

A request without the header is untouched: no transaction is opened
around it, and nothing is stored.

Keys are scoped to the principal user, the identity the write is done
as: a person (whichever of their sessions or API keys sent it), or an
agent. An agent and the human who holds its key have separate scopes,
since they are separate actors; one person's app and CLI share one, so a
key means one intended write of that person whichever client resends it.
The claim comes after authentication and the scope check
(``CurrentPrincipal``), so a credential that may not call the route
cannot read a stored answer either.

Anything the keyed request does that leaves the process must wait for
its commit: WebSocket broadcasts do
(``app.websocket.ConnectionManager.broadcast_to_team`` defers to
``on_commit`` inside a transaction), as push and credential events
already did (CHT-1605).

The client's side of the windows: the app does not send a write older
than ``REPLAY_WINDOW`` on its own (``WriteQueue.REPLAY_WINDOW_MILLIS``,
shorter than this one), since a write that late may already have been
done; the person is asked instead.

How it is wired: ``@idempotent`` marks the endpoint; ``IdempotentRoute``
(the ``route_class`` of the routers that have such endpoints) gives a
marked route the ``_idempotency_scope`` dependency, and hands it the
response once FastAPI has serialized it. MCP calls the same functions
in-process with no header and so is never affected.
"""
from __future__ import annotations

import hashlib
import json
import logging
import time
import uuid
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Any

from fastapi import Depends, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import Response
from fastapi.routing import APIRoute
from oxyde import IntegrityError, execute_raw

from app.api.deps import CurrentPrincipal
from app.db.transactions import atomic
from app.oxyde_models.idempotency import OxydeIdempotencyRecord
from app.services.registration_service import is_sqlite_busy

logger = logging.getLogger(__name__)

HEADER = "Idempotency-Key"
REPLAYED_HEADER = "Idempotent-Replayed"
# What a resend must also match: it changes what update_issue does.
INTERACTIVE_HEADER = "X-Chaotic-Interactive"

# How long an answer is replayed.
REPLAY_WINDOW = timedelta(hours=24)
# How long a key is remembered at all: a resend after the replay window
# and before this is refused, not done again.
TOMBSTONE_RETENTION = timedelta(days=30)
# How long an unanswered claim belongs to the request that made it. Far
# longer than any request runs; after it, the request is taken to have
# died, and its write with it.
STALE_CLAIM = timedelta(minutes=10)
# How often one process sweeps (clears expired answers, deletes rows
# past retention). What a resend gets never depends on the sweep.
SWEEP_EVERY_SECONDS = 600.0
MAX_KEY_LENGTH = 255
RETRY_AFTER_SECONDS = 1

# Refusals that describe the moment, not the request: not stored.
_NOT_STORED = frozenset({
    status.HTTP_408_REQUEST_TIMEOUT,
    status.HTTP_409_CONFLICT,
    status.HTTP_425_TOO_EARLY,
    status.HTTP_429_TOO_MANY_REQUESTS,
})

_ATTR = "chaotic_idempotent"
_RESPONSE = "idempotent_response"

_next_sweep = 0.0


def idempotent(fn):
    """Mark an endpoint as honouring ``Idempotency-Key``. Its router
    must use ``IdempotentRoute`` (``tests/test_idempotency.py`` checks)."""
    setattr(fn, _ATTR, True)
    return fn


def is_idempotent(fn) -> bool:
    return bool(getattr(fn, _ATTR, False))


def _stored(status_code: int) -> bool:
    return status_code < status.HTTP_500_INTERNAL_SERVER_ERROR and status_code not in _NOT_STORED


def _refusal(status_code: int, error_code: str, message: str, retry: bool = False) -> HTTPException:
    return HTTPException(
        status_code=status_code,
        detail={"error_code": error_code, "message": message},
        headers={"Retry-After": str(RETRY_AFTER_SECONDS)} if retry else None,
    )


def _in_flight() -> HTTPException:
    return _refusal(
        status.HTTP_409_CONFLICT, "idempotency_in_flight",
        "This write is still being done; retry shortly to get its answer.", retry=True,
    )


def _busy() -> HTTPException:
    return _refusal(
        status.HTTP_503_SERVICE_UNAVAILABLE, "idempotency_busy",
        "The server is busy with other writes; retry shortly.", retry=True,
    )


class _Replay(Exception):
    """Raised by the claim when the key already has an answer; the route
    handler turns it into that answer."""

    def __init__(self, record: OxydeIdempotencyRecord):
        super().__init__(record.idempotency_key)
        self.record = record

    def response(self) -> Response:
        record = self.record
        headers = dict(json.loads(record.response_headers or "{}"))
        headers[REPLAYED_HEADER] = "true"
        if record.refused:
            raise HTTPException(
                status_code=record.status,
                detail=json.loads(record.response_body) if record.response_body else None,
                headers=headers,
            )
        return Response(
            content=(record.response_body or "").encode("utf-8"),
            status_code=record.status,
            headers=headers,
        )


class _ClaimLost(Exception):
    """This request's claim was taken over (it outlived ``STALE_CLAIM``):
    its write must not commit."""


@dataclass(frozen=True)
class _Claim:
    id: str
    token: str


def _valid_key(key: str) -> bool:
    return 0 < len(key) <= MAX_KEY_LENGTH and all(0x21 <= ord(c) <= 0x7E for c in key)


async def _fingerprint(request: Request) -> str:
    """What a resend must match: method, path, query, the interactive
    signal and the body. A JSON body is compared by value, so key order
    and spacing do not matter."""
    body = await request.body()
    try:
        canonical = (
            json.dumps(json.loads(body), sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
            if body
            else b""
        )
    except ValueError:  # not JSON (UnicodeDecodeError included): the bytes as sent
        canonical = body
    digest = hashlib.sha256()
    parts = (request.method, request.url.path, request.url.query, request.headers.get(INTERACTIVE_HEADER, ""))
    for part in parts:
        digest.update(part.encode("utf-8"))
        digest.update(b"\0")
    digest.update(canonical)
    return digest.hexdigest()


async def _claim(user_id: str, key: str, method: str, path: str, digest: str) -> _Claim:
    """Claim ``key`` for this request, in a transaction of its own (step
    1 of the module docstring); or raise what the resend gets instead."""
    now = datetime.now(timezone.utc)
    token = str(uuid.uuid4())
    async with atomic():
        try:
            async with atomic():  # a savepoint: a failed insert must not end the transaction (Postgres)
                record = await OxydeIdempotencyRecord.objects.create(
                    user_id=user_id, idempotency_key=key, method=method, path=path,
                    request_hash=digest, claim_token=token, claimed_at=now, created_at=now,
                )
                return _Claim(record.id, token)
        except IntegrityError:
            pass
        existing = await OxydeIdempotencyRecord.objects.filter(user_id=user_id, idempotency_key=key).first()
        if existing is not None and existing.created_at <= now - TOMBSTONE_RETENTION:
            await existing.delete()  # forgotten: the key is new again
            existing = None
        if existing is None:  # forgotten, or swept since the insert failed
            record = await OxydeIdempotencyRecord.objects.create(
                user_id=user_id, idempotency_key=key, method=method, path=path,
                request_hash=digest, claim_token=token, claimed_at=now, created_at=now,
            )
            return _Claim(record.id, token)
        if (existing.method, existing.path, existing.request_hash) != (method, path, digest):
            raise _refusal(
                status.HTTP_422_UNPROCESSABLE_CONTENT, "idempotency_key_reused",
                f"This {HEADER} was already used for a different request "
                f"({existing.method} {existing.path}). Use a new key for a new write.",
            )
        if existing.status is None:
            if existing.claimed_at > now - STALE_CLAIM:
                raise _in_flight()
            # Its request died before its write committed: take it over.
            taken = await execute_raw(
                "UPDATE idempotency_records SET claim_token = ?, claimed_at = ? "
                "WHERE id = ? AND claim_token = ? AND status IS NULL RETURNING id",
                [token, now, existing.id, existing.claim_token],
            )
            if not taken:  # pragma: no cover -- the insert above holds the write lock
                raise _in_flight()
            return _Claim(existing.id, token)
        if existing.created_at <= now - REPLAY_WINDOW:
            raise _expired(existing)
        raise _Replay(existing)


def _expired(record: OxydeIdempotencyRecord) -> HTTPException:
    """The answer to a resend of a key whose answer is past the replay
    window: what the first answer was, without it."""
    hours = int(REPLAY_WINDOW.total_seconds() // 3600)
    if record.refused:
        message = (
            f"This request was already answered more than {hours} hours ago: it was refused "
            f"({record.status}). That answer is no longer kept, and the request was not sent again."
        )
    else:
        message = (
            f"This write was already done, more than {hours} hours ago, and its answer is no "
            "longer kept. It was not done again."
        )
    return HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail={
            "error_code": "idempotency_key_expired",
            "message": message,
            "original_status": record.status,
            "original_refused": record.refused,
        },
    )


async def _answer(claim: _Claim, *, status_code: int, refused: bool, body: str | None,
                  headers: dict[str, str]) -> None:
    """Store the answer, inside the write's transaction, if the claim is
    still this request's."""
    answered = await execute_raw(
        "UPDATE idempotency_records SET status = ?, refused = ?, response_body = ?, response_headers = ? "
        "WHERE id = ? AND claim_token = ? AND status IS NULL RETURNING id",
        [status_code, refused, body, json.dumps(headers, sort_keys=True), claim.id, claim.token],
    )
    if not answered:
        raise _ClaimLost(claim.id)


async def _release(claim: _Claim) -> bool:
    """Drop this request's claim (a resend is then a fresh attempt).
    False when it was no longer this request's."""
    released = await execute_raw(
        "DELETE FROM idempotency_records WHERE id = ? AND claim_token = ? AND status IS NULL RETURNING id",
        [claim.id, claim.token],
    )
    return bool(released)


async def _take_write_lock() -> None:
    """SQLite's write lock, as step 2's first statement (module
    docstring): a write statement that changes nothing."""
    await execute_raw("UPDATE idempotency_records SET status = status WHERE 0", [])


async def _release_after_rollback(claim: _Claim) -> None:
    """``_release`` after the write's transaction rolled back. If this
    fails too the claim goes stale, and a resend after ``STALE_CLAIM``
    takes it over."""
    try:
        async with atomic():
            await _release(claim)
    except Exception:
        logger.exception("could not release idempotency claim %s; it will go stale", claim.id)


async def sweep(now: datetime | None = None) -> None:
    """Clear answers past the replay window, and delete rows past the
    tombstone's retention (and claims that old). Raw SQL: Oxyde has no
    range lookup on a DateTimeUTC field."""
    now = now or datetime.now(timezone.utc)
    async with atomic():
        await execute_raw(
            "UPDATE idempotency_records SET response_body = NULL, response_headers = NULL "
            "WHERE created_at <= ? AND status IS NOT NULL AND response_body IS NOT NULL",
            [now - REPLAY_WINDOW],
        )
        await execute_raw("DELETE FROM idempotency_records WHERE created_at <= ?", [now - TOMBSTONE_RETENTION])


async def _maybe_sweep() -> None:
    global _next_sweep
    if time.monotonic() < _next_sweep:
        return
    _next_sweep = time.monotonic() + SWEEP_EVERY_SECONDS
    try:
        await sweep()
    except Exception:  # bookkeeping: never fails the write
        logger.exception("idempotency sweep failed")


async def _idempotency_scope(request: Request, principal: CurrentPrincipal):
    """The dependency ``IdempotentRoute`` gives a marked route (module
    docstring). Function-scoped, so it closes before the response is
    sent: the answer goes out only once it is committed."""
    key = request.headers.get(HEADER)
    if key is None:
        yield
        return
    if not _valid_key(key):
        raise _refusal(
            status.HTTP_400_BAD_REQUEST, "invalid_idempotency_key",
            f"{HEADER} must be 1 to {MAX_KEY_LENGTH} printable ASCII characters, without spaces.",
        )
    digest = await _fingerprint(request)
    try:
        claim = await _claim(principal.user.id, key, request.method, request.url.path, digest)
    except Exception as exc:
        if is_sqlite_busy(exc):
            raise _busy() from exc
        raise
    await _maybe_sweep()

    refusal: HTTPException | None = None
    try:
        async with atomic():
            await _take_write_lock()
            try:
                yield
            except HTTPException as exc:
                if exc.status_code >= status.HTTP_500_INTERNAL_SERVER_ERROR:
                    raise
                if _stored(exc.status_code):
                    await _answer(
                        claim, status_code=exc.status_code, refused=True,
                        body=json.dumps(jsonable_encoder(exc.detail)), headers=dict(exc.headers or {}),
                    )
                elif not await _release(claim):
                    # Taken over: what this request wrote must not commit.
                    raise _ClaimLost(claim.id) from exc
                refusal = exc
            else:
                response: Response | None = getattr(request.state, _RESPONSE, None)
                if response is None:
                    raise RuntimeError(f"{request.url.path}: an @idempotent route must be an IdempotentRoute")
                if response.status_code >= status.HTTP_500_INTERNAL_SERVER_ERROR:
                    raise RuntimeError(f"{request.url.path} answered {response.status_code}; not stored")
                content_type = response.headers.get("content-type")
                await _answer(
                    claim, status_code=response.status_code, refused=False,
                    body=bytes(response.body).decode("utf-8"),
                    headers={"content-type": content_type} if content_type else {},
                )
    except _ClaimLost as exc:
        # Another resend took the claim over and may have done the write:
        # this one rolled back. Its retry gets that one's answer.
        raise _in_flight() from exc
    except BaseException as exc:
        await _release_after_rollback(claim)
        if isinstance(exc, Exception) and is_sqlite_busy(exc):
            raise _busy() from exc
        raise
    if refusal is not None:
        raise refusal


class IdempotentRoute(APIRoute):
    """An ``APIRoute`` that honours ``Idempotency-Key`` when its endpoint
    is ``@idempotent`` (module docstring); any other route is a plain
    ``APIRoute``."""

    def __init__(self, path: str, endpoint: Any, **kwargs: Any):
        if is_idempotent(endpoint):
            dependencies = list(kwargs.get("dependencies") or [])
            # A route built again from one (an older FastAPI's
            # include_router copied routes this way) brings the scope
            # with it: add it once.
            if not any(getattr(d, "dependency", None) is _idempotency_scope for d in dependencies):
                dependencies.append(Depends(_idempotency_scope, scope="function"))
            kwargs["dependencies"] = dependencies
        super().__init__(path, endpoint, **kwargs)

    def get_route_handler(self):
        handler = super().get_route_handler()
        if not is_idempotent(self.endpoint):
            return handler

        async def idempotent_handler(request: Request) -> Response:
            try:
                response = await handler(request)
            except _Replay as replay:
                return replay.response()
            # For _idempotency_scope, which stores it after this returns.
            setattr(request.state, _RESPONSE, response)
            return response

        return idempotent_handler
