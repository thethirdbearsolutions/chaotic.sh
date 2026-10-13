"""Push device registrations and per-kind preferences (CHT-1604).

The models are in ``app.oxyde_models.push``. This module validates what
an app registers, keeps one row per (person, installation) and per
endpoint, and answers which inbox kinds a person wants pushed. Sending is
CHT-1605.

Endpoint validation (SSRF: the server POSTs to every endpoint) is in
``check_endpoint``. An endpoint must be an https URL of bounded length,
made of RFC 3986 characters only, with no userinfo, fragment or port 0.
Its host must be, or resolve only to, public addresses
(``app.oauth.cimd.is_public_address``). ``PUSH_ALLOW_PRIVATE_ENDPOINTS``
widens that to loopback, private, ULA and CGNAT addresses, for an ntfy on
the same machine or LAN. Even then, link-local, unspecified, multicast
and reserved addresses, and the cloud metadata addresses
(``_METADATA``), are refused, as are their IPv4-in-IPv6 forms.

A check at registration cannot stop a host that later resolves somewhere
else (DNS rebinding), nor a row registered while the setting was on, so
the sender (CHT-1605) must apply the current policy again to the address
it connects to, as the CIMD fetch does.

The endpoint is stored in a canonical form (``canonical_endpoint``), and
uniqueness is on that form, so equivalent spellings of one URL are one
endpoint. Only RFC 3986 section 6.2.2/6.2.3 equivalences are applied.
"""
from __future__ import annotations

import asyncio
import base64
import ipaddress
import re
import socket
from dataclasses import dataclass
from typing import TYPE_CHECKING
from datetime import datetime, timezone
from urllib.parse import urlsplit

from cryptography.hazmat.primitives.asymmetric import ec
from oxyde import IntegrityError, atomic, execute_raw

from app.config import get_settings
from app.enums import InboxEntryKind, PushTransport
from app.oauth.cimd import is_public_address
from app.oauth.clients import has_only_uri_characters
from app.oxyde_models.push import OxydePushDevice, OxydePushPreference
from app.oxyde_models.oauth import OxydeHolderSession
from app.utils import vapid
from app.utils.vapid import b64url

if TYPE_CHECKING:
    from app.services.credential_events import CredentialsEnded

MAX_ENDPOINT_LENGTH = 2048
# A person's registrations; each is a POST per inbox entry, so this bounds
# what one account can make the server send.
MAX_DEVICES_PER_USER = 20
RESOLVE_TIMEOUT_SECONDS = 3.0

# Pushed unless the person turned it off; agent_status is off unless they
# turned it on (the ticket's defaults). A kind missing here is on.
DEFAULT_KIND_ENABLED: dict[InboxEntryKind, bool] = {
    InboxEntryKind.GATE_PENDING: True,
    InboxEntryKind.REVIEW_REQUESTED: True,
    InboxEntryKind.MENTION: True,
    InboxEntryKind.ASSIGNMENT: True,
    InboxEntryKind.GATE_REJECTED: True,
    InboxEntryKind.AGENT_STATUS: False,
    InboxEntryKind.PUSH_DEVICE_ADDED: True,
}


class PushRegistrationError(Exception):
    """A registration this server refuses. ``error_code`` and ``message``
    are safe to return to the caller (no internal address is named)."""

    def __init__(self, error_code: str, message: str, status_code: int = 422):
        super().__init__(message)
        self.error_code = error_code
        self.message = message
        self.status_code = status_code


def _invalid(message: str) -> PushRegistrationError:
    return PushRegistrationError("invalid_push_endpoint", message)


_UNRESERVED = frozenset("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~")
_PCT = re.compile(r"%([0-9A-Fa-f]{2})")


def _normalize_percent(component: str) -> str:
    """RFC 3986 6.2.2.1-2: escapes of unreserved characters decoded, the
    rest in uppercase hex. Both spellings name the same resource."""
    def one(match: re.Match) -> str:
        char = chr(int(match.group(1), 16))
        return char if char in _UNRESERVED else "%" + match.group(1).upper()
    return _PCT.sub(one, component)


def canonical_endpoint(endpoint: str) -> tuple[str, str]:
    """Check the URL rules that need no DNS, and return (the canonical
    endpoint, its host).

    The canonical form lowercases the scheme and host, drops a host's
    trailing dot, writes an IP literal in its standard form, drops the
    default port (443), turns an empty path into "/", drops an empty
    query, and normalizes percent-escapes. These are the equivalences of
    RFC 3986 sections 6.2.2 and 6.2.3. Nothing else is folded: duplicate
    slashes, dot segments and query parameter order are significant to a
    server, so ``/up//x`` and ``/up/x`` stay two endpoints."""
    if len(endpoint) > MAX_ENDPOINT_LENGTH:
        raise _invalid(f"the endpoint URL is longer than {MAX_ENDPOINT_LENGTH} characters")
    if not endpoint.isascii() or not has_only_uri_characters(endpoint):
        raise _invalid("the endpoint URL may contain only RFC 3986 characters")
    parts = urlsplit(endpoint)
    if parts.scheme.lower() != "https":
        raise _invalid("the endpoint URL must use https")
    if parts.username is not None or parts.password is not None:
        raise _invalid("the endpoint URL must not carry credentials")
    if parts.fragment or "#" in endpoint:
        raise _invalid("the endpoint URL must not have a fragment")
    host = (parts.hostname or "").rstrip(".")
    if not host:
        raise _invalid("the endpoint URL has no host")
    try:
        port = parts.port
    except ValueError:
        raise _invalid("the endpoint URL has an invalid port") from None
    if port == 0:
        raise _invalid("the endpoint URL has an invalid port")
    try:
        literal = ipaddress.ip_address(host)
    except ValueError:
        literal = None
    if literal is not None:
        host = str(literal)
    netloc = f"[{host}]" if ":" in host else host
    if port is not None and port != 443:
        netloc += f":{port}"
    path = _normalize_percent(parts.path) or "/"
    query = _normalize_percent(parts.query)
    canonical = f"https://{netloc}{path}" + (f"?{query}" if query else "")
    if len(canonical) > MAX_ENDPOINT_LENGTH:  # pragma: no cover -- canonicalizing never lengthens past one "/"
        raise _invalid(f"the endpoint URL is longer than {MAX_ENDPOINT_LENGTH} characters")
    return canonical, host


async def _resolve(host: str) -> list[str]:
    loop = asyncio.get_running_loop()
    try:
        infos = await asyncio.wait_for(
            loop.getaddrinfo(host, 443, type=socket.SOCK_STREAM), timeout=RESOLVE_TIMEOUT_SECONDS,
        )
    except (socket.gaierror, UnicodeError, asyncio.TimeoutError):
        raise _invalid("the endpoint URL's host does not resolve") from None
    return list(dict.fromkeys(info[4][0] for info in infos))


# Cloud instance-metadata and platform services, refused even when
# private endpoints are allowed: AWS (also IMDSv2 over IPv6, and ECS task
# metadata), GCP, Azure, Oracle and DigitalOcean (169.254.169.254, which
# link-local also covers), Azure's wire server and Alibaba Cloud.
_METADATA = tuple(ipaddress.ip_network(n) for n in (
    "169.254.169.254/32", "169.254.170.2/32", "fd00:ec2::254/128",
    "168.63.129.16/32", "100.100.100.200/32",
))
_NAT64 = ipaddress.ip_network("64:ff9b::/96")
# "This network" (only 0.0.0.0 itself is unspecified) and IPv6's
# deprecated site-local range: nothing a push endpoint lives on.
_NEVER = (ipaddress.ip_network("0.0.0.0/8"), ipaddress.ip_network("fec0::/10"))


def _embedded_ipv4(ip: ipaddress.IPv6Address) -> ipaddress.IPv4Address | None:
    if ip.ipv4_mapped or ip.sixtofour:
        return ip.ipv4_mapped or ip.sixtofour
    if ip.teredo:
        return ip.teredo[1]
    if ip in _NAT64:
        return ipaddress.IPv4Address(int(ip) & 0xFFFFFFFF)
    return None


def is_permitted_private_address(address: str) -> bool:
    """With PUSH_ALLOW_PRIVATE_ENDPOINTS on: may this server POST to
    ``address``? Public, loopback, private, ULA and CGNAT addresses yes;
    link-local, unspecified, multicast, reserved and metadata addresses
    no, including through an IPv4-in-IPv6 form."""
    try:
        ip = ipaddress.ip_address(address.split("%", 1)[0])
    except ValueError:
        return False
    if isinstance(ip, ipaddress.IPv6Address):
        embedded = _embedded_ipv4(ip)
        if embedded is not None and not is_permitted_private_address(str(embedded)):
            return False
    if any(ip in net for net in (*_METADATA, *_NEVER) if net.version == ip.version):
        return False
    if ip.is_loopback:  # ::1 sits in IPv6's reserved ::/8
        return True
    return not (ip.is_link_local or ip.is_unspecified or ip.is_multicast or ip.is_reserved)


async def check_endpoint(endpoint: str) -> str:
    """Raise PushRegistrationError unless the server may POST to ``endpoint``
    (module docstring). Returns its canonical form."""
    canonical, host = canonical_endpoint(endpoint)
    try:
        literal = ipaddress.ip_address(host)
    except ValueError:
        literal = None
    addresses = [str(literal)] if literal is not None else await _resolve(host)
    if get_settings().push_allow_private_endpoints:
        if not addresses or not all(is_permitted_private_address(a) for a in addresses):
            raise _invalid(
                "the endpoint URL's host is a link-local, metadata, multicast or reserved address"
            )
    elif not addresses or not all(is_public_address(a) for a in addresses):
        raise _invalid(
            "the endpoint URL's host is not a public address "
            "(a server admin can allow private ones with PUSH_ALLOW_PRIVATE_ENDPOINTS)"
        )
    return canonical


_B64URL = re.compile(r"^[A-Za-z0-9_-]+={0,2}$")


def _strict_b64url(value: str) -> bytes | None:
    """The bytes of a canonical base64url string (padding optional), or
    None: no other characters, and no non-zero bits past the data, so one
    value has one spelling."""
    if not _B64URL.match(value):
        return None
    body = value.rstrip("=")
    if len(body) % 4 == 1:
        return None
    try:
        raw = base64.urlsafe_b64decode(body + "=" * (-len(body) % 4))
    except (ValueError, TypeError):  # pragma: no cover -- the regex admits only the alphabet
        return None
    return raw if b64url(raw) == body else None


def _check_key(name: str, value: str, length: int) -> str:
    """Validate a subscription key; return its canonical (unpadded) form."""
    raw = _strict_b64url(value)
    valid = raw is not None and len(raw) == length
    if valid and name == "p256dh":
        try:
            ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256R1(), raw)
        except ValueError:
            valid = False
        valid = valid and raw[:1] == b"\x04"
    if not valid:
        what = "an uncompressed point on P-256 (65 bytes)" if name == "p256dh" else f"{length} bytes"
        raise PushRegistrationError("invalid_push_keys", f"{name} must be {what}, base64url")
    return b64url(raw)


@dataclass(frozen=True)
class Registration:
    """What an app registers for one installation."""

    endpoint: str
    p256dh: str | None
    auth: str | None
    transport: PushTransport = PushTransport.WEB_PUSH
    platform: str | None = None
    label: str | None = None


def _now() -> datetime:
    return datetime.now(timezone.utc)


def device_status(device: OxydePushDevice, *, now: datetime | None = None, current_key_id: str | None = None) -> str:
    """``active``; ``expired``: the credential it was registered with has
    expired, so nothing may be sent to it until the app registers again;
    or ``needs_reregistration``: it subscribed under a VAPID key this
    server no longer has (SECRET_KEY or VAPID_PRIVATE_KEY changed). The
    sender (CHT-1605) sends only to ``active`` devices."""
    now = now or _now()
    if device.credential_expires_at is not None and device.credential_expires_at <= now:
        return "expired"
    if device.vapid_key_id != (current_key_id if current_key_id is not None else vapid.key_id()):
        return "needs_reregistration"
    return "active"


class PushService:
    async def list_devices(self, user_id: str) -> list[OxydePushDevice]:
        return await OxydePushDevice.objects.filter(user_id=user_id).order_by("-created_at").all()

    async def register(
        self,
        user_id: str,
        installation_id: str,
        registration: Registration,
        *,
        holder_session_id: str | None,
        credential_id: str | None,
        credential_expires_at: datetime | None,
        credential_label: str = "a sign-in",
    ) -> tuple[OxydePushDevice, bool]:
        """Register or replace the device for (user, installation).
        Returns the row and whether it was created.

        The endpoint is unique across the table: one endpoint reaches one
        app instance, signed in as one person, so a registration of an
        endpoint another row holds (the phone switched accounts without
        signing out, or the app reinstalled under a new installation id)
        takes it over and the other row is deleted.

        Every registration binds the device to the credential the request
        came with, replacing the old binding: its session or key (deleted
        with it), and its expiry (``credential_expires_at``: a login's
        ``exp``, a key's expiry, a session's absolute expiry). Past that
        expiry the device is dead until the app registers again with a
        live credential, so a short-lived credential can never leave a
        device behind that outlives it. The VAPID key the subscription was
        made under is recorded too (``vapid_key_id``).

        A new device, or a new endpoint for an existing one, is reported
        to the person in their inbox (PUSH_DEVICE_ADDED), so a device they
        did not register does not go unnoticed."""
        from app.services.inbox_service import InboxService

        if registration.transport is not PushTransport.WEB_PUSH:  # pragma: no cover -- the only member
            raise PushRegistrationError("unsupported_push_transport", "only web_push is supported")
        if not registration.p256dh or not registration.auth:
            raise PushRegistrationError("invalid_push_keys", "web_push needs both p256dh and auth")
        p256dh = _check_key("p256dh", registration.p256dh, 65)
        auth = _check_key("auth", registration.auth, 16)
        endpoint = await check_endpoint(registration.endpoint)
        if holder_session_id is not None:
            session = await OxydeHolderSession.objects.get_or_none(id=holder_session_id)
            if session is not None:
                credential_expires_at = session.absolute_expires_at

        fields = dict(
            transport=registration.transport,
            endpoint=endpoint,
            p256dh=p256dh,
            auth=auth,
            platform=registration.platform,
            label=registration.label,
            holder_session_id=holder_session_id,
            credential_id=credential_id,
            credential_expires_at=credential_expires_at,
            vapid_key_id=vapid.key_id(),
        )
        try:
            async with atomic():
                existing = await OxydePushDevice.objects.filter(
                    user_id=user_id, installation_id=installation_id,
                ).first()
                holders = await OxydePushDevice.objects.filter(endpoint=endpoint).all()
                others = [d.id for d in holders if existing is None or d.id != existing.id]
                if others:
                    await OxydePushDevice.objects.filter(id__in=others).delete()
                now = _now()
                if existing is not None:
                    endpoint_changed = existing.endpoint != endpoint
                    update = dict(fields, updated_at=now)
                    if endpoint_changed:
                        # A new endpoint has no delivery history.
                        update.update(last_success_at=None, failure_count=0)
                    await OxydePushDevice.objects.filter(id=existing.id).update(**update)
                    device, created = await OxydePushDevice.objects.get(id=existing.id), False
                else:
                    count = await OxydePushDevice.objects.filter(user_id=user_id).count()
                    if count >= MAX_DEVICES_PER_USER:
                        raise PushRegistrationError(
                            "too_many_push_devices",
                            f"at most {MAX_DEVICES_PER_USER} devices per person; remove one first",
                            status_code=409,
                        )
                    device = await OxydePushDevice.objects.create(
                        user_id=user_id, installation_id=installation_id, created_at=now, updated_at=now,
                        **fields,
                    )
                    created, endpoint_changed = True, True
                notice = None
                if endpoint_changed:
                    notice = await InboxService().add_push_device_entry(
                        user_id=user_id, device=device, created=created, credential_label=credential_label,
                    )
        except IntegrityError:
            # Two registrations of the same installation or endpoint at once.
            raise PushRegistrationError(
                "push_registration_conflict", "a registration of this device is already in progress; retry",
                status_code=409,
            ) from None
        if notice is not None:
            await InboxService().broadcast_created(notice)
        return device, created

    async def unregister(self, user_id: str, installation_id: str) -> bool:
        deleted = await OxydePushDevice.objects.filter(user_id=user_id, installation_id=installation_id).delete()
        return bool(deleted)

    # --- revocation -----------------------------------------------------------

    async def delete_for_sessions(self, holder_session_ids: list[str]) -> int:
        """Devices registered with these holder sessions, which were just
        revoked. Called by ``on_credentials_ended``, after the revoking
        transaction committed (CHT-1625)."""
        if not holder_session_ids:
            return 0
        return await OxydePushDevice.objects.filter(holder_session_id__in=list(holder_session_ids)).delete()

    async def delete_for_keys(self, key_ids: list[str]) -> int:
        """Devices registered with these API keys, which were just revoked."""
        if not key_ids:
            return 0
        return await OxydePushDevice.objects.filter(credential_id__in=list(key_ids)).delete()

    async def delete_stale_bindings(self) -> int:
        """Devices bound to a key that is revoked or a holder session that
        is revoked. ``on_credentials_ended`` deletes them right after the
        revocation commits; this catches a process that died in between
        (run at startup, CHT-1625)."""
        # One statement with subqueries: the lists of dead keys and
        # sessions only grow, and would not fit in an IN (...) of
        # parameters.
        rows = await execute_raw(
            "DELETE FROM push_devices"
            " WHERE credential_id IN (SELECT id FROM api_keys WHERE is_active = 0)"
            " OR holder_session_id IN (SELECT id FROM holder_sessions WHERE revoked_at IS NOT NULL)"
            " RETURNING id"
        )
        return len(rows)

    # --- preferences ----------------------------------------------------------

    async def preferences(self, user_id: str) -> dict[InboxEntryKind, bool]:
        """Every kind, with the person's choice or its default."""
        chosen = {
            row.kind: row.enabled
            for row in await OxydePushPreference.objects.filter(user_id=user_id).all()
        }
        return {kind: chosen.get(kind, DEFAULT_KIND_ENABLED.get(kind, True)) for kind in InboxEntryKind}

    async def set_preferences(self, user_id: str, changes: dict[InboxEntryKind, bool]) -> dict[InboxEntryKind, bool]:
        """Record the person's choice for each kind in ``changes``; the
        others are left as they are. Returns every kind, as preferences()."""
        now = _now()
        async with atomic():
            for kind, enabled in changes.items():
                updated = await OxydePushPreference.objects.filter(user_id=user_id, kind=kind).update(
                    enabled=enabled, updated_at=now,
                )
                if not updated:
                    try:
                        await OxydePushPreference.objects.create(
                            user_id=user_id, kind=kind, enabled=enabled, updated_at=now,
                        )
                    except IntegrityError:
                        # A concurrent PATCH created the row first; this
                        # one is the later write, so it wins.
                        await OxydePushPreference.objects.filter(user_id=user_id, kind=kind).update(
                            enabled=enabled, updated_at=now,
                        )
        return await self.preferences(user_id)

    async def wants(self, user_id: str, kind: InboxEntryKind) -> bool:
        """Should an inbox entry of ``kind`` be pushed to this person? For
        the sender (CHT-1605)."""
        row = await OxydePushPreference.objects.filter(user_id=user_id, kind=kind).first()
        return row.enabled if row is not None else DEFAULT_KIND_ENABLED.get(kind, True)


async def on_credentials_ended(event: CredentialsEnded) -> None:
    """The credential-ended hook (``app.services.credential_events``): a
    device registered with a revoked key or a revoked holder session
    stops being pushed to (CHT-1604)."""
    service = PushService()
    await service.delete_for_sessions(list(event.holder_session_ids))
    await service.delete_for_keys(list(event.key_ids))
