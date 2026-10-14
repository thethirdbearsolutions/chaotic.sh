"""Idempotency-Key on the app's writes (CHT-1621).

The Android app queues what a person does and sends it when it can
(CHT-1613). Each queued write carries a key the app made once, when the
person acted, sent as ``Idempotency-Key`` on every attempt. A write
whose answer was lost (a timeout, a dropped connection, a lock-screen
action retried) is sent again with the same key, and must not be done
twice: the second comment, the second status change.

So, on a route marked ``@idempotent`` and sent with the header:

* The first request with a key is done as usual, and its answer is
  stored (``OxydeIdempotencyRecord``) in the same transaction as the
  write it answers: the record exists if and only if the write
  committed. A refusal (any 4xx) is an answer too, and is stored with
  whatever the request wrote before it was refused, as it would have
  committed without a key. A 5xx, or anything else that raises, rolls
  back the write and stores nothing, so a resend is a fresh attempt.
* A resend (same user, same key, within ``RETENTION``) gets the first
  answer, status and body, without the write being done again, with
  ``Idempotent-Replayed: true``. A refusal is replayed by raising the
  same ``HTTPException``, so it renders as it did the first time.
* The same key with a different method, path, query or body is a 422
  ``idempotency_key_reused``; nothing is done.
* A resend that arrives while the first is still running waits for it:
  the claim is the transaction's first write, so it queues on the
  database's write lock (SQLite's busy timeout, or Postgres's wait on
  the uncommitted unique key), then finds the first one's committed
  record and replays it. If the first rolled back, the resend claims
  the key and does the write itself. The write cannot run twice.

A request without the header is untouched: no transaction is opened
around it, and nothing is stored.

Keys are scoped to the principal user, the identity the write is done
as: a person (whichever of their sessions or API keys sent it), or an
agent. An agent and the human who holds its key have separate scopes,
since they are separate actors; one person's app and CLI share one, so a
key means one intended write of that person whichever client resends it.
The replay comes after authentication and the scope check
(``CurrentPrincipal``), so a credential that may not call the route
cannot read a stored answer either.

The transaction spans the whole request, so anything the request does
that leaves the process must wait for its commit: WebSocket broadcasts
do (``app.websocket.ConnectionManager.broadcast_to_team`` defers to
``on_commit`` inside a transaction), as push and credential events
already did (CHT-1605).

How it is wired: ``@idempotent`` marks the endpoint; ``IdempotentRoute``
(the ``route_class`` of the routers that have such endpoints) gives a
marked route the ``_idempotency_scope`` dependency, which claims the key
and holds the transaction across the endpoint, and hands it the
response once FastAPI has serialized it. MCP calls the same functions
in-process with no header and so is never affected.
"""
from __future__ import annotations

import hashlib
import json
from datetime import datetime, timedelta, timezone
from typing import Any

from fastapi import Depends, HTTPException, Request, status
from fastapi.responses import Response
from fastapi.routing import APIRoute
from oxyde import IntegrityError, execute_raw

from app.api.deps import CurrentPrincipal
from app.db.transactions import atomic
from app.oxyde_models.idempotency import OxydeIdempotencyRecord

HEADER = "Idempotency-Key"
REPLAYED_HEADER = "Idempotent-Replayed"
# How long a key is remembered. A resend later than this is a new write.
RETENTION = timedelta(hours=24)
MAX_KEY_LENGTH = 255

_ATTR = "chaotic_idempotent"
_RESPONSE = "idempotent_response"


def idempotent(fn):
    """Mark an endpoint as honouring ``Idempotency-Key``. Its router
    must use ``IdempotentRoute`` (``tests/test_idempotency.py`` checks)."""
    setattr(fn, _ATTR, True)
    return fn


def is_idempotent(fn) -> bool:
    return bool(getattr(fn, _ATTR, False))


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


def _valid_key(key: str) -> bool:
    return 0 < len(key) <= MAX_KEY_LENGTH and all(0x21 <= ord(c) <= 0x7E for c in key)


async def _fingerprint(request: Request) -> str:
    """What a resend must match: method, path, query and body. A JSON
    body is compared by value, so key order and spacing do not matter."""
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
    for part in (request.method, request.url.path, request.url.query):
        digest.update(part.encode("utf-8"))
        digest.update(b"\0")
    digest.update(canonical)
    return digest.hexdigest()


def _expired(record: OxydeIdempotencyRecord, now: datetime) -> bool:
    return record.created_at <= now - RETENTION  # DateTimeUTC: always aware


async def _claim(user_id: str, key: str, method: str, path: str, digest: str) -> OxydeIdempotencyRecord:
    """Insert the key's record, unanswered, as the transaction's first
    write; or, when the key already has a live answer, raise ``_Replay``
    (or the 422 when that answer was for a different request)."""
    fields = dict(user_id=user_id, idempotency_key=key, method=method, path=path, request_hash=digest)
    try:
        async with atomic():  # a savepoint: a failed insert must not end the transaction (Postgres)
            return await OxydeIdempotencyRecord.objects.create(**fields)
    except IntegrityError:
        pass
    existing = await OxydeIdempotencyRecord.objects.filter(user_id=user_id, idempotency_key=key).first()
    if existing is not None and _expired(existing, datetime.now(timezone.utc)):
        await existing.delete()
        existing = None
    if existing is None:  # expired, or swept since the insert failed
        return await OxydeIdempotencyRecord.objects.create(**fields)
    if (existing.method, existing.path, existing.request_hash) != (method, path, digest):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail={
                "error_code": "idempotency_key_reused",
                "message": (
                    f"This {HEADER} was already used for a different request "
                    f"({existing.method} {existing.path}). Use a new key for a new write."
                ),
            },
        )
    if existing.status is None:  # pragma: no cover -- a record is answered in the transaction that claims it
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"error_code": "idempotency_key_in_flight", "message": "This write is still in progress."},
            headers={"Retry-After": "1"},
        )
    raise _Replay(existing)


async def _answer(record: OxydeIdempotencyRecord, *, status_code: int, refused: bool, body: str | None,
                  headers: dict[str, str]) -> None:
    record.status = status_code
    record.refused = refused
    record.response_body = body
    record.response_headers = json.dumps(headers, sort_keys=True)
    await record.save(update_fields={"status", "refused", "response_body", "response_headers"})


async def _sweep(now: datetime) -> None:
    """Forget every key past ``RETENTION`` (by the created_at index).
    Raw SQL: Oxyde has no range lookup on a DateTimeUTC field."""
    await execute_raw("DELETE FROM idempotency_records WHERE created_at <= ?", [now - RETENTION])


async def _idempotency_scope(request: Request, principal: CurrentPrincipal):
    """The dependency ``IdempotentRoute`` gives a marked route (module
    docstring). Function-scoped, so it closes before the response is
    sent: the answer goes out only once it is committed."""
    key = request.headers.get(HEADER)
    if key is None:
        yield
        return
    if not _valid_key(key):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "error_code": "invalid_idempotency_key",
                "message": f"{HEADER} must be 1 to {MAX_KEY_LENGTH} printable ASCII characters, without spaces.",
            },
        )
    digest = await _fingerprint(request)
    refusal: HTTPException | None = None
    async with atomic():
        record = await _claim(principal.user.id, key, request.method, request.url.path, digest)
        try:
            yield
        except HTTPException as exc:
            if exc.status_code >= 500:
                raise
            await _answer(
                record, status_code=exc.status_code, refused=True,
                body=json.dumps(exc.detail, default=str), headers=dict(exc.headers or {}),
            )
            refusal = exc
        else:
            response: Response | None = getattr(request.state, _RESPONSE, None)
            if response is None:
                raise RuntimeError(f"{request.url.path}: an @idempotent route must be an IdempotentRoute")
            if response.status_code >= 500:
                raise RuntimeError(f"{request.url.path} answered {response.status_code}; not stored")
            content_type = response.headers.get("content-type")
            await _answer(
                record, status_code=response.status_code, refused=False,
                body=bytes(response.body).decode("utf-8"),
                headers={"content-type": content_type} if content_type else {},
            )
        await _sweep(datetime.now(timezone.utc))
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
