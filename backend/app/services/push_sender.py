"""The Web Push sender (CHT-1605): inbox entries to the person's devices.

One protocol, standard Web Push: a POST of an encrypted message to the
push resource the device registered (RFC 8030), its body encrypted to
the device's own keys with aes128gcm (RFC 8291, ``encrypt``), and signed
for the push service with the server's VAPID key (RFC 8292,
``vapid_authorization``). UnifiedPush distributors (ntfy, NextPush,
Sunup) accept it, so a self-hosted server needs no account anywhere. The
distributor sees only ciphertext; the payload carries ids, the kind, the
issue identifier and a truncated title, never a token or a secret.

Two messages:

* ``entry``: a new inbox entry (``push_created``), from every
  ``InboxService`` writer. Not sent to the person who caused it, nor for
  a kind the person turned off (``PushService.wants``).
* ``resolved``: the entry was settled elsewhere (``push_resolved``, from
  ``InboxService._resolve``, which every resolve path goes through), so
  the app withdraws its notification. Sent whatever the preferences say:
  a withdrawal can only remove something.

Both are scheduled by the writer and delivered by a background task, so
a slow push service never slows a request. The writer may be inside a
transaction (Oxyde has no on-commit hook), so the task waits for that
transaction to end and then reads the entries back: an entry that was
rolled back is not sent, and what is sent is what was committed. The
writer's own cost is one query, for whether any recipient has a device
at all; a person without one costs nothing more.

At send time a device must still be live: ``push_service.device_status``
is ``active`` (its credential has not expired, and it subscribed under
the current VAPID key), the session or API key it was registered with
is neither revoked nor expired, and its user is active. The endpoint's
host is resolved again and checked under the current policy
(``push_service.permitted_addresses``), and the POST goes to the
address that was checked, with the name kept for SNI, the certificate
and Host, no redirects and no proxy, as ``app.oauth.cimd`` does: a name
that now resolves somewhere else (DNS rebinding), or a private endpoint
registered while ``PUSH_ALLOW_PRIVATE_ENDPOINTS`` was on, is not sent to.

Answers: 2xx records ``last_success_at`` and clears ``failure_count``;
404 and 410 mean the subscription is gone, so the device is deleted;
429, 5xx and network errors are retried with backoff (``Retry-After``
honoured up to a cap), and then, like any other refusal, add one to
``failure_count``. At most ``MAX_CONCURRENCY`` requests are in flight
per event loop, each limited to ``REQUEST_TIMEOUT_SECONDS``.
"""
from __future__ import annotations

import asyncio
import base64
import hashlib
import json
import logging
import os
import struct
import time
import weakref
from dataclasses import dataclass
from datetime import datetime, timezone
from urllib.parse import urlsplit

import httpx
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.asymmetric.utils import decode_dss_signature
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from oxyde import F
from oxyde.db.transaction import AsyncTransaction, get_active_transaction

from app.config import get_settings
from app.enums import InboxEntryKind
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.oauth import OxydeHolderSession
from app.oxyde_models.push import OxydePushDevice
from app.oxyde_models.user import OxydeUser
from app.services import push_service
from app.services.email_service import fire_and_forget
from app.utils import vapid
from app.utils.vapid import b64url

logger = logging.getLogger(__name__)

MAX_CONCURRENCY = 8
REQUEST_TIMEOUT_SECONDS = 10.0
# Waits before the second and third attempt of a 429, 5xx or network error.
RETRY_DELAYS_SECONDS = (2.0, 8.0)
MAX_RETRY_AFTER_SECONDS = 30.0
# How long the push service keeps a message for a device that is offline.
# The app syncs its inbox when it comes back, so a day is plenty.
TTL_SECONDS = 24 * 3600
MAX_TITLE_CHARS = 200
# RFC 8291 allows 4096 bytes of body; the ticket's budget for the
# plaintext is 3 KB.
MAX_PAYLOAD_BYTES = 3072
RECORD_SIZE = 4096
# The writer's transaction must end within this, or nothing is sent.
COMMIT_WAIT_SECONDS = 60.0
VAPID_TOKEN_SECONDS = 12 * 3600

# Tests swap in an ``httpx.MockTransport``; None is the real network.
_transport: httpx.AsyncBaseTransport | None = None
_tasks: set[asyncio.Task] = set()
_semaphores: weakref.WeakKeyDictionary = weakref.WeakKeyDictionary()


def _now() -> datetime:
    return datetime.now(timezone.utc)


# --- RFC 8291: message encryption -------------------------------------------


def _hkdf(salt: bytes, ikm: bytes, info: bytes, length: int) -> bytes:
    return HKDF(algorithm=hashes.SHA256(), length=length, salt=salt, info=info).derive(ikm)


def _point(key: ec.EllipticCurvePublicKey) -> bytes:
    return key.public_bytes(serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint)


def encrypt(
    plaintext: bytes, p256dh: bytes, auth_secret: bytes, *,
    sender_key: ec.EllipticCurvePrivateKey | None = None, salt: bytes | None = None,
) -> bytes:
    """The aes128gcm body (RFC 8188 with RFC 8291's key derivation) of a
    push message to the device whose keys are ``p256dh`` (its P-256
    point) and ``auth_secret``: one record, with a fresh ephemeral key and
    salt unless given (the RFC's test vector gives them)."""
    sender_key = sender_key or ec.generate_private_key(ec.SECP256R1())
    salt = salt if salt is not None else os.urandom(16)
    ua_public = ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256R1(), p256dh)
    as_public = _point(sender_key.public_key())
    shared = sender_key.exchange(ec.ECDH(), ua_public)
    ikm = _hkdf(auth_secret, shared, b"WebPush: info\x00" + p256dh + as_public, 32)
    cek = _hkdf(salt, ikm, b"Content-Encoding: aes128gcm\x00", 16)
    nonce = _hkdf(salt, ikm, b"Content-Encoding: nonce\x00", 12)
    # One record, so it is the last: delimiter 0x02, no padding.
    if len(plaintext) + 1 + 16 > RECORD_SIZE:
        raise ValueError("a push message must fit in one 4096-byte record")
    record = AESGCM(cek).encrypt(nonce, plaintext + b"\x02", None)
    return salt + struct.pack("!IB", RECORD_SIZE, len(as_public)) + as_public + record


# --- RFC 8292: VAPID ---------------------------------------------------------

_vapid_tokens: dict[tuple[str, str], tuple[str, float]] = {}


def _subject() -> str | None:
    base = get_settings().app_base_url.rstrip("/")
    return base if base.startswith("https://") else None


def vapid_authorization(audience: str, *, now: float | None = None) -> str:
    """The ``Authorization`` header for a push service at ``audience``
    (its origin): ``vapid t=<ES256 JWT>, k=<public key>``. A token is
    reused until an hour before it expires (12 h; RFC 8292 allows 24)."""
    now = time.time() if now is None else now
    cache_key = (vapid.key_id(), audience)
    cached = _vapid_tokens.get(cache_key)
    if cached is None or cached[1] - now < 3600:
        exp = int(now) + VAPID_TOKEN_SECONDS
        claims: dict = {"aud": audience, "exp": exp}
        subject = _subject()
        if subject:
            claims["sub"] = subject
        header = b64url(json.dumps({"typ": "JWT", "alg": "ES256"}, separators=(",", ":")).encode())
        body = b64url(json.dumps(claims, separators=(",", ":")).encode())
        signing_input = f"{header}.{body}".encode()
        r, s = decode_dss_signature(vapid.private_key().sign(signing_input, ec.ECDSA(hashes.SHA256())))
        signature = b64url(r.to_bytes(32, "big") + s.to_bytes(32, "big"))
        cached = (f"{header}.{body}.{signature}", float(exp))
        for stale in [k for k, (_, until) in _vapid_tokens.items() if until <= now]:
            del _vapid_tokens[stale]
        _vapid_tokens[cache_key] = cached
    return f"vapid t={cached[0]}, k={vapid.public_key_b64url()}"


# --- payloads ----------------------------------------------------------------


def topic(entry_id: str) -> str:
    """RFC 8030 Topic: one per entry, so a ``resolved`` message replaces
    the entry's own message while both still wait at the push service.
    32 characters of the base64url alphabet, as the RFC requires."""
    return b64url(hashlib.sha256(entry_id.encode()).digest())[:32]


def collapse_key(entry) -> str:
    """What the app groups notifications by: the issue, the document, or
    the entry itself."""
    if entry.issue_id:
        return f"issue:{entry.issue_id}"
    if entry.document_id:
        return f"document:{entry.document_id}"
    return f"entry:{entry.id}"


def _encode(payload: dict) -> bytes:
    return json.dumps(payload, separators=(",", ":"), ensure_ascii=False).encode()


def entry_payload(entry: OxydeInboxEntry, issue_identifier: str | None) -> bytes:
    title = entry.title or ""
    if len(title) > MAX_TITLE_CHARS:
        title = title[: MAX_TITLE_CHARS - 1] + "…"
    payload = {
        "v": 1,
        "type": "entry",
        "id": entry.id,
        "kind": InboxEntryKind(entry.kind).value,
        "issue": issue_identifier,
        "title": title,
        "ritual_id": entry.ritual_id,
        "collapse": collapse_key(entry),
    }
    data = _encode(payload)
    while len(data) > MAX_PAYLOAD_BYTES and payload["title"]:  # pragma: no cover -- 200 chars cannot reach 3 KB
        payload["title"] = payload["title"][: len(payload["title"]) // 2]
        data = _encode(payload)
    return data


def resolved_payload(entry_id: str, collapse: str) -> bytes:
    return _encode({"v": 1, "type": "resolved", "id": entry_id, "collapse": collapse})


@dataclass(frozen=True)
class _Message:
    recipient_user_id: str
    entry_id: str
    body: bytes
    urgency: str


# --- scheduling --------------------------------------------------------------


def _pushable(entry, actor_id: str | None) -> bool:
    """Not to the person who caused the entry. A new-device notice is
    the exception: whoever registered the device holds one of the
    person's credentials, and their other devices should hear of it."""
    if InboxEntryKind(entry.kind) is InboxEntryKind.PUSH_DEVICE_ADDED:
        return True
    return entry.recipient_user_id not in {actor_id, entry.source_user_id}


async def _any_devices(user_ids: set[str]) -> bool:
    if not user_ids:
        return False
    return await OxydePushDevice.objects.filter(user_id__in=sorted(user_ids)).count() > 0


def _spawn(coro) -> None:
    _tasks.add(fire_and_forget(coro))
    for task in [t for t in _tasks if t.done()]:
        _tasks.discard(task)


async def push_created(entries: list, *, actor_id: str | None = None) -> None:
    """Schedule an ``entry`` message for each of these new entries. Never
    raises: a push failure must not fail the write that made the entry."""
    try:
        entries = [e for e in entries if e is not None and _pushable(e, actor_id)]
        if not await _any_devices({e.recipient_user_id for e in entries}):
            return
        tx = get_active_transaction()
        _spawn(_deliver_created([e.id for e in entries], tx))
    except Exception:
        logger.exception("Failed to schedule push notifications")


async def push_resolved(entries: list) -> None:
    """Schedule a ``resolved`` message for each of these entries, which
    were just settled. Never raises."""
    try:
        if not await _any_devices({e.recipient_user_id for e in entries}):
            return
        tx = get_active_transaction()
        _spawn(_deliver_resolved(
            [(e.id, e.recipient_user_id, collapse_key(e)) for e in entries], tx,
        ))
    except Exception:
        logger.exception("Failed to schedule push withdrawals")


async def drain() -> None:
    """Wait for every scheduled delivery (tests, shutdown)."""
    while _tasks:
        await asyncio.gather(*list(_tasks), return_exceptions=True)
        for task in [t for t in _tasks if t.done()]:
            _tasks.discard(task)


async def _wait_for_commit(tx: AsyncTransaction | None) -> bool:
    """Wait until the writer's transaction has ended. ``tx.id`` raises
    once it has (committed or rolled back; the caller reads the rows to
    tell which). False if it outlives COMMIT_WAIT_SECONDS."""
    if tx is None:
        return True
    deadline = time.monotonic() + COMMIT_WAIT_SECONDS
    while time.monotonic() < deadline:
        try:
            tx.id
        except RuntimeError:
            return True
        await asyncio.sleep(0.02)
    return False


async def _read_back(ids: list[str], committed) -> dict[str, OxydeInboxEntry]:
    """The entries, once ``committed(rows)`` holds. ``tx.id`` stops
    answering just before the commit lands (and a writer in a task that
    does not own its transaction has no ``tx`` at all), so a few short
    retries come before a row counts as rolled back."""
    rows: dict[str, OxydeInboxEntry] = {}
    for delay in (0.0, 0.05, 0.2, 0.5):
        if delay:
            await asyncio.sleep(delay)
        rows = {e.id: e for e in await OxydeInboxEntry.objects.filter(id__in=ids).all()}
        if committed(rows):
            break
    return rows


async def _deliver_created(entry_ids: list[str], tx: AsyncTransaction | None) -> None:
    try:
        if not await _wait_for_commit(tx):
            logger.warning("Push skipped: the writing transaction did not end in %ss", COMMIT_WAIT_SECONDS)
            return
        rows = await _read_back(entry_ids, lambda r: len(r) == len(set(entry_ids)))
        from app.oxyde_models.issue import OxydeIssue

        issue_ids = sorted({e.issue_id for e in rows.values() if e.issue_id})
        identifiers = {
            i.id: i.identifier for i in await OxydeIssue.objects.filter(id__in=issue_ids).all()
        } if issue_ids else {}
        prefs = push_service.PushService()
        messages = []
        for entry_id in entry_ids:
            entry = rows.get(entry_id)
            # Rolled back, or already settled, read or archived: nothing to say.
            if entry is None or entry.resolved_at or entry.read_at or entry.archived_at:
                continue
            kind = InboxEntryKind(entry.kind)
            if not await prefs.wants(entry.recipient_user_id, kind):
                continue
            urgent = kind in (InboxEntryKind.GATE_PENDING, InboxEntryKind.REVIEW_REQUESTED)
            messages.append(_Message(
                entry.recipient_user_id, entry.id,
                entry_payload(entry, identifiers.get(entry.issue_id)),
                "high" if urgent else "normal",
            ))
        await _send_all(messages)
    except Exception:
        logger.exception("Push delivery failed for entries %s", entry_ids)


async def _deliver_resolved(items: list[tuple[str, str, str]], tx: AsyncTransaction | None) -> None:
    ids = [entry_id for entry_id, _, _ in items]
    try:
        if not await _wait_for_commit(tx):
            logger.warning("Push skipped: the writing transaction did not end in %ss", COMMIT_WAIT_SECONDS)
            return
        # Settled if resolved, or deleted outright (its team went); still
        # open means the resolve was rolled back.
        rows = await _read_back(ids, lambda r: all(e.resolved_at for e in r.values()))
        messages = [
            _Message(recipient, entry_id, resolved_payload(entry_id, collapse), "normal")
            for entry_id, recipient, collapse in items
            if entry_id not in rows or rows[entry_id].resolved_at is not None
        ]
        await _send_all(messages)
    except Exception:
        logger.exception("Push withdrawal failed for entries %s", ids)


# --- devices -----------------------------------------------------------------


async def live_devices(user_id: str, *, now: datetime | None = None) -> list[OxydePushDevice]:
    """The person's devices a message may go to now (module docstring)."""
    now = now or _now()
    user = await OxydeUser.objects.get_or_none(id=user_id)
    if user is None or not user.is_active:
        return []
    current_key = vapid.key_id()
    live = []
    for device in await OxydePushDevice.objects.filter(user_id=user_id).all():
        if push_service.device_status(device, now=now, current_key_id=current_key) != "active":
            continue
        if device.holder_session_id is not None:
            session = await OxydeHolderSession.objects.get_or_none(id=device.holder_session_id)
            if (
                session is None or session.revoked_at is not None
                or session.idle_expires_at <= now or session.absolute_expires_at <= now
            ):
                continue
        if device.credential_id is not None:
            key = await OxydeAPIKey.objects.get_or_none(id=device.credential_id)
            if key is None or not key.is_active or (key.expires_at is not None and key.expires_at <= now):
                continue
        live.append(device)
    return live


async def _send_all(messages: list[_Message]) -> None:
    if not messages:
        return
    by_user: dict[str, list[OxydePushDevice]] = {}
    jobs = []
    for message in messages:
        if message.recipient_user_id not in by_user:
            by_user[message.recipient_user_id] = await live_devices(message.recipient_user_id)
        jobs.extend(send(device, message) for device in by_user[message.recipient_user_id])
    await asyncio.gather(*jobs)


def _semaphore() -> asyncio.Semaphore:
    loop = asyncio.get_running_loop()
    sem = _semaphores.get(loop)
    if sem is None:
        sem = _semaphores[loop] = asyncio.Semaphore(MAX_CONCURRENCY)
    return sem


class _Refused(Exception):
    """The endpoint may not be connected to under the current policy."""


async def _post(device: OxydePushDevice, message: _Message) -> httpx.Response:
    parts = urlsplit(device.endpoint)
    host = parts.hostname or ""
    port = parts.port or 443
    try:
        address = (await push_service.permitted_addresses(host))[0]
    except push_service.PushRegistrationError as exc:
        raise _Refused(exc.message) from None
    pinned = f"[{address}]" if ":" in address else address
    target = parts._replace(netloc=f"{pinned}:{port}").geturl()
    body = encrypt(message.body, _b64url_decode(device.p256dh), _b64url_decode(device.auth))
    async with httpx.AsyncClient(
        follow_redirects=False, trust_env=False, timeout=REQUEST_TIMEOUT_SECONDS, transport=_transport,
    ) as client:
        request = client.build_request(
            "POST", target, content=body,
            headers={
                "Host": parts.netloc,
                "Authorization": vapid_authorization(f"https://{parts.netloc}"),
                "Content-Encoding": "aes128gcm",
                "Content-Type": "application/octet-stream",
                "TTL": str(TTL_SECONDS),
                "Urgency": message.urgency,
                "Topic": topic(message.entry_id),
            },
            # Certificate and SNI are checked against the name, not the
            # address connected to.
            extensions={"sni_hostname": host},
        )
        # Streamed and closed unread: only the status and headers matter,
        # and an endpoint must not make the server buffer a body.
        response = await asyncio.wait_for(client.send(request, stream=True), timeout=REQUEST_TIMEOUT_SECONDS)
        await response.aclose()
        return response


def _b64url_decode(value: str | None) -> bytes:
    value = value or ""
    return base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))


def _retry_after(response: httpx.Response | None, default: float) -> float:
    value = (response.headers.get("retry-after", "") if response is not None else "").strip()
    if value.isdigit():
        return min(float(value), MAX_RETRY_AFTER_SECONDS)
    return default


async def send(device: OxydePushDevice, message: _Message) -> str:
    """POST one message to one device and record the outcome on it.
    Returns ``sent``, ``gone`` (deleted), ``failed`` or ``refused``."""
    attempts = len(RETRY_DELAYS_SECONDS) + 1
    for attempt in range(attempts):
        response = None
        try:
            async with _semaphore():
                response = await _post(device, message)
        except _Refused as exc:
            logger.warning("Push to device %s not sent: %s", device.id, exc)
            await _record_failure(device)
            return "refused"
        except (httpx.HTTPError, asyncio.TimeoutError, OSError) as exc:
            logger.info("Push to device %s: %s", device.id, type(exc).__name__)
        else:
            status = response.status_code
            if 200 <= status < 300:
                await OxydePushDevice.objects.filter(id=device.id, endpoint=device.endpoint).update(
                    last_success_at=_now(), failure_count=0,
                )
                return "sent"
            if status in (404, 410):
                await OxydePushDevice.objects.filter(id=device.id, endpoint=device.endpoint).delete()
                logger.info("Push subscription of device %s is gone (HTTP %s); deleted it", device.id, status)
                return "gone"
            if status != 429 and status < 500:
                logger.warning("Push to device %s refused: HTTP %s", device.id, status)
                break
        if attempt + 1 < attempts:
            await asyncio.sleep(_retry_after(response, RETRY_DELAYS_SECONDS[attempt]))
    await _record_failure(device)
    return "failed"


async def _record_failure(device: OxydePushDevice) -> None:
    await OxydePushDevice.objects.filter(id=device.id, endpoint=device.endpoint).update(
        failure_count=F("failure_count") + 1,
    )
