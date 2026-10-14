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
  a kind the person turned off (``PushService.wants``; the new-device
  notice cannot be turned off).
* ``resolved``: the entry was settled elsewhere (``push_resolved``, from
  ``InboxService._resolve``, which every resolve path goes through), so
  the app withdraws its notification. Sent whatever the preferences say:
  a withdrawal can only remove something.

Both wait for the writer's transaction to commit
(``app.db.transactions.on_commit_collect``; nothing is sent for one that
rolls back) and are gathered per transaction: after the commit, one
query asks whether any recipient has a device at all, and only then is a
background task scheduled to deliver, so a slow push service never slows
a request and a person without a device costs one query per transaction.

At send time a device must still be live (``live_devices``): its
``push_service.device_status`` is ``active`` (the credential it was
registered with has not expired, and it subscribed under the current
VAPID key), its user is active, and the credential it was registered
with still passes the rules the credential resolver applies to it.
Revoking a key or session deletes its devices, but after commit and best
effort, so a row can outlive its credential for a while (CHT-1627); this
check is what keeps that row from getting anything.

The endpoint's host is resolved again and checked under the current
policy (``push_service.permitted_addresses``), and the POST goes to an
address that was checked (the next one on a connect error), with the
name kept for SNI, the certificate and Host, no redirects and no proxy,
as ``app.oauth.cimd`` does: a name that now resolves somewhere else (DNS
rebinding), or a private endpoint registered while
``PUSH_ALLOW_PRIVATE_ENDPOINTS`` was on, is not sent to. Proxy variables
are ignored; ``SSL_CERT_FILE`` and ``SSL_CERT_DIR`` are honoured, for an
ntfy behind an internal CA.

Answers: 2xx records ``last_success_at`` and clears ``failure_count``;
404 and 410 mean the subscription is gone, so the device is deleted;
429, 5xx and network errors are retried with backoff, never sooner than
the ``Retry-After`` the push service asked for, and not at all when it
asked for longer than ``MAX_RETRY_AFTER_SECONDS``. A delivery that does
not succeed, for any reason, adds one to ``failure_count``. At most
``MAX_CONCURRENCY`` requests are in flight per event loop, each limited
to ``REQUEST_TIMEOUT_SECONDS``.
"""
from __future__ import annotations

import asyncio
import base64
import hashlib
import json
import logging
import os
import ssl
import struct
import time
import weakref
from dataclasses import dataclass
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from functools import lru_cache
from urllib.parse import urlsplit

import httpx
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.asymmetric.utils import decode_dss_signature
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from oxyde import F

from app.config import get_settings
from app.db.transactions import on_commit_collect
from app.enums import InboxEntryKind
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
# A push service that asks for a longer wait is not retried.
MAX_RETRY_AFTER_SECONDS = 30.0
# How long the push service keeps a message for a device that is offline.
# The app syncs its inbox when it comes back, so a day is plenty.
TTL_SECONDS = 24 * 3600
MAX_TITLE_CHARS = 200
# The ticket's budget for the plaintext.
MAX_PAYLOAD_BYTES = 3072
# RFC 8291 section 4: a push message body is at most 4096 bytes, header
# (salt, record size, key id length, the 65-byte key) and record together.
MAX_BODY_BYTES = 4096
RECORD_SIZE = 4096
_HEADER_BYTES = 16 + 4 + 1 + 65
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


def _salt() -> bytes:
    """RFC 8188's per-message salt. Sent in clear in the message header;
    the one randomness this module draws (tests/test_push_sender.py)."""
    return os.urandom(16)


def encrypt(
    plaintext: bytes, p256dh: bytes, auth_secret: bytes, *,
    sender_key: ec.EllipticCurvePrivateKey | None = None, salt: bytes | None = None,
) -> bytes:
    """The aes128gcm body (RFC 8188 with RFC 8291's key derivation) of a
    push message to the device whose keys are ``p256dh`` (its P-256
    point) and ``auth_secret``: one record, with a fresh ephemeral key and
    salt unless given (the RFC's test vector gives them)."""
    # Header, plaintext, the 0x02 last-record delimiter and the 16-byte tag.
    if _HEADER_BYTES + len(plaintext) + 1 + 16 > MAX_BODY_BYTES:
        raise ValueError("a push message body must fit in 4096 bytes (RFC 8291 section 4)")
    sender_key = sender_key or ec.generate_private_key(ec.SECP256R1())
    salt = salt if salt is not None else _salt()
    ua_public = ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256R1(), p256dh)
    as_public = _point(sender_key.public_key())
    shared = sender_key.exchange(ec.ECDH(), ua_public)
    ikm = _hkdf(auth_secret, shared, b"WebPush: info\x00" + p256dh + as_public, 32)
    cek = _hkdf(salt, ikm, b"Content-Encoding: aes128gcm\x00", 16)
    nonce = _hkdf(salt, ikm, b"Content-Encoding: nonce\x00", 12)
    record = AESGCM(cek).encrypt(nonce, plaintext + b"\x02", None)
    return salt + struct.pack("!IB", RECORD_SIZE, len(as_public)) + as_public + record


# --- RFC 8292: VAPID ---------------------------------------------------------

_vapid_tokens: dict[tuple[str, str], tuple[str, float]] = {}


def _subject() -> str | None:
    """VAPID's ``sub``, a way for a push service to reach the operator:
    VAPID_SUBJECT (``mailto:`` or ``https:``), else APP_BASE_URL when it
    is https. RFC 8292 says SHOULD; a server with neither sends none."""
    settings = get_settings()
    configured = settings.vapid_subject.strip()
    if configured.startswith(("mailto:", "https://")):
        return configured
    if configured:
        logger.warning("VAPID_SUBJECT is neither mailto: nor https:; it is not sent")
    base = settings.app_base_url.rstrip("/")
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


async def _flush_created(items: list[tuple[str, str]]) -> None:
    """After the commit: one transaction's new entries, as (id, recipient)."""
    if await _any_devices({recipient for _, recipient in items}):
        _spawn(_deliver_created(list(dict.fromkeys(entry_id for entry_id, _ in items))))


async def _flush_resolved(items: list[tuple[str, str, str]]) -> None:
    """After the commit: one transaction's settled entries, as (id,
    recipient, collapse key)."""
    if await _any_devices({recipient for _, recipient, _ in items}):
        _spawn(_deliver_resolved(list(dict.fromkeys(items))))


async def push_created(entries: list, *, actor_id: str | None = None) -> None:
    """Push these new entries once the transaction they were written in
    commits. Never raises: a push failure must not fail the write that
    made the entry."""
    try:
        for entry in entries:
            if entry is not None and _pushable(entry, actor_id):
                await on_commit_collect(
                    "push.created", (entry.id, entry.recipient_user_id), _flush_created,
                )
    except Exception:
        logger.exception("Failed to schedule push notifications")


async def push_resolved(entries: list) -> None:
    """Withdraw these entries' notifications once the transaction that
    settled them commits. Never raises."""
    try:
        for entry in entries:
            await on_commit_collect(
                "push.resolved", (entry.id, entry.recipient_user_id, collapse_key(entry)), _flush_resolved,
            )
    except Exception:
        logger.exception("Failed to schedule push withdrawals")


async def drain() -> None:
    """Wait for every scheduled delivery (tests, shutdown)."""
    while _tasks:
        await asyncio.gather(*list(_tasks), return_exceptions=True)
        for task in [t for t in _tasks if t.done()]:
            _tasks.discard(task)


async def _deliver_created(entry_ids: list[str]) -> None:
    try:
        from app.oxyde_models.issue import OxydeIssue

        rows = {e.id: e for e in await OxydeInboxEntry.objects.filter(id__in=entry_ids).all()}
        issue_ids = sorted({e.issue_id for e in rows.values() if e.issue_id})
        identifiers = {
            i.id: i.identifier for i in await OxydeIssue.objects.filter(id__in=issue_ids).all()
        } if issue_ids else {}
        prefs = push_service.PushService()
        messages = []
        for entry_id in entry_ids:
            entry = rows.get(entry_id)
            if entry is None:
                # Committed, then deleted (its team or recipient went).
                logger.info("Push skipped: inbox entry %s no longer exists", entry_id)
                continue
            if entry.resolved_at or entry.read_at or entry.archived_at:
                continue  # already dealt with: nothing to say
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


async def _deliver_resolved(items: list[tuple[str, str, str]]) -> None:
    try:
        await _send_all([
            _Message(recipient, entry_id, resolved_payload(entry_id, collapse), "normal")
            for entry_id, recipient, collapse in items
        ])
    except Exception:
        logger.exception("Push withdrawal failed for entries %s", [i[0] for i in items])


# --- devices -----------------------------------------------------------------


async def _session_live(device: OxydePushDevice, now: datetime) -> bool:
    """The holder session a device was registered with still passes what
    the credential resolver checks of one (``_verify_oauth_access``):
    unrevoked and inside its lifetime, its holder active and still in its
    team, a key that claimed it still live, and it acts as the device's
    own person (a device is registered by the person it belongs to)."""
    from app.services.api_key_service import APIKeyService
    from app.services.team_service import TeamService

    session = await OxydeHolderSession.objects.get_or_none(id=device.holder_session_id)
    if (
        session is None or session.revoked_at is not None
        or session.idle_expires_at <= now or session.absolute_expires_at <= now
        or session.principal_user_id != device.user_id
    ):
        return False
    holder = await OxydeUser.objects.get_or_none(id=session.holder_user_id)
    if holder is None or not holder.is_active:
        return False
    if session.team_id and await TeamService().get_member(session.team_id, holder.id) is None:
        return False
    return session.credential_id is None or await APIKeyService().is_live(session.credential_id)


async def _key_live(device: OxydePushDevice) -> bool:
    """The API key a device was registered with is still active,
    unexpired, and the device's own person's."""
    from app.services.api_key_service import APIKeyService

    keys = APIKeyService()
    key = await keys.get_by_id(device.credential_id)
    return key is not None and key.principal_user_id == device.user_id and await keys.is_live(key.id)


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
        if device.holder_session_id is not None and not await _session_live(device, now):
            continue
        if device.credential_id is not None and not await _key_live(device):
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


@lru_cache(maxsize=4)
def _ssl_context(cafile: str | None, capath: str | None) -> ssl.SSLContext | bool:
    if not cafile and not capath:
        return True  # httpx's default bundle
    return ssl.create_default_context(cafile=cafile or None, capath=capath or None)


def _verify() -> ssl.SSLContext | bool:
    """Certificate verification. ``trust_env=False`` keeps proxies out,
    but in httpx it also drops SSL_CERT_FILE and SSL_CERT_DIR, which are
    read here instead (an ntfy behind an internal CA)."""
    return _ssl_context(os.environ.get("SSL_CERT_FILE"), os.environ.get("SSL_CERT_DIR"))


class _Refused(Exception):
    """The endpoint may not be connected to under the current policy."""


async def _post(device: OxydePushDevice, message: _Message) -> httpx.Response:
    parts = urlsplit(device.endpoint)
    host = parts.hostname or ""
    port = parts.port or 443
    try:
        addresses = await push_service.permitted_addresses(host)
    except push_service.PushRegistrationError as exc:
        raise _Refused(exc.message) from None
    body = encrypt(message.body, _b64url_decode(device.p256dh), _b64url_decode(device.auth))
    headers = {
        "Host": parts.netloc,
        "Authorization": vapid_authorization(f"https://{parts.netloc}"),
        "Content-Encoding": "aes128gcm",
        "Content-Type": "application/octet-stream",
        "TTL": str(TTL_SECONDS),
        "Urgency": message.urgency,
        "Topic": topic(message.entry_id),
    }
    async with httpx.AsyncClient(
        follow_redirects=False, trust_env=False, verify=_verify(),
        timeout=REQUEST_TIMEOUT_SECONDS, transport=_transport,
    ) as client:
        for index, address in enumerate(addresses):
            pinned = f"[{address}]" if ":" in address else address
            request = client.build_request(
                "POST", parts._replace(netloc=f"{pinned}:{port}").geturl(), content=body, headers=headers,
                # Certificate and SNI are checked against the name, not
                # the address connected to.
                extensions={"sni_hostname": host},
            )
            try:
                # Streamed and closed unread: only the status and headers
                # matter, and an endpoint must not make the server buffer
                # a body.
                response = await asyncio.wait_for(
                    client.send(request, stream=True), timeout=REQUEST_TIMEOUT_SECONDS,
                )
            except (httpx.ConnectError, httpx.ConnectTimeout):
                if index + 1 < len(addresses):
                    continue  # every address was vetted; try the next
                raise
            await response.aclose()
            return response
    raise AssertionError("permitted_addresses returned no address")  # pragma: no cover


def _b64url_decode(value: str | None) -> bytes:
    value = value or ""
    return base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))


def retry_after(response: httpx.Response | None, *, now: datetime | None = None) -> float | None:
    """The seconds a push service asked to wait (RFC 9110 Retry-After:
    delay-seconds or an HTTP-date), or None if it did not say."""
    value = (response.headers.get("retry-after", "") if response is not None else "").strip()
    if not value:
        return None
    if value.isdigit():
        return float(value)
    try:
        when = parsedate_to_datetime(value)
    except (TypeError, ValueError):
        return None
    if when.tzinfo is None:
        when = when.replace(tzinfo=timezone.utc)
    return max(0.0, (when - (now or _now())).total_seconds())


async def send(device: OxydePushDevice, message: _Message) -> str:
    """POST one message to one device and record the outcome on it.
    Returns ``sent``, ``gone`` (deleted), ``failed`` or ``refused``.
    Never raises: anything unexpected is logged and counts a failure."""
    try:
        outcome = await _attempts(device, message)
    except Exception:
        logger.exception("Push to device %s failed", device.id)
        outcome = "failed"
    if outcome in ("failed", "refused"):
        try:
            await OxydePushDevice.objects.filter(id=device.id, endpoint=device.endpoint).update(
                failure_count=F("failure_count") + 1,
            )
        except Exception:
            logger.exception("Could not record a push failure on device %s", device.id)
    return outcome


async def _attempts(device: OxydePushDevice, message: _Message) -> str:
    attempts = len(RETRY_DELAYS_SECONDS) + 1
    for attempt in range(attempts):
        response = None
        try:
            async with _semaphore():
                response = await _post(device, message)
        except _Refused as exc:
            logger.warning("Push to device %s not sent: %s", device.id, exc)
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
                return "failed"
        if attempt + 1 == attempts:
            break
        asked = retry_after(response)
        if asked is not None and asked > MAX_RETRY_AFTER_SECONDS:
            logger.info("Push to device %s: asked to wait %ss; not retried", device.id, int(asked))
            break
        await asyncio.sleep(max(RETRY_DELAYS_SECONDS[attempt], asked or 0.0))
    return "failed"
