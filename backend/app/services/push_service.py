"""Push device registrations and per-kind preferences (CHT-1604).

The models are in ``app.oxyde_models.push``. This module validates what
an app registers, keeps one row per (person, installation) and per
endpoint, and answers which inbox kinds a person wants pushed. Sending is
CHT-1605.

Endpoint validation (SSRF: the server POSTs to every endpoint) is in
``check_endpoint``: an https URL of bounded length, RFC 3986 characters
only, no userinfo or fragment, whose host is, or resolves only to,
public addresses (``app.oauth.cimd.is_public_address``), unless
``PUSH_ALLOW_PRIVATE_ENDPOINTS`` is on. A check at registration cannot
stop a host that resolves somewhere else later (DNS rebinding), so the
sender must check the address it connects to again, as the CIMD fetch
does.
"""
from __future__ import annotations

import asyncio
import base64
import ipaddress
import socket
from dataclasses import dataclass
from datetime import datetime, timezone
from urllib.parse import urlsplit

from oxyde import IntegrityError, atomic

from app.config import get_settings
from app.enums import InboxEntryKind, PushTransport
from app.oauth.cimd import is_public_address
from app.oauth.clients import has_only_uri_characters
from app.oxyde_models.push import OxydePushDevice, OxydePushPreference

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


def _check_url_shape(endpoint: str) -> str:
    """The URL rules that need no DNS. Returns the host."""
    if len(endpoint) > MAX_ENDPOINT_LENGTH:
        raise _invalid(f"the endpoint URL is longer than {MAX_ENDPOINT_LENGTH} characters")
    if not endpoint.isascii() or not has_only_uri_characters(endpoint):
        raise _invalid("the endpoint URL may contain only RFC 3986 characters")
    parts = urlsplit(endpoint)
    if parts.scheme != "https":
        raise _invalid("the endpoint URL must use https")
    if not parts.hostname:
        raise _invalid("the endpoint URL has no host")
    if parts.username is not None or parts.password is not None:
        raise _invalid("the endpoint URL must not carry credentials")
    if parts.fragment or "#" in endpoint:
        raise _invalid("the endpoint URL must not have a fragment")
    try:
        parts.port
    except ValueError:
        raise _invalid("the endpoint URL has an invalid port") from None
    return parts.hostname


async def _resolve(host: str) -> list[str]:
    loop = asyncio.get_running_loop()
    try:
        infos = await asyncio.wait_for(
            loop.getaddrinfo(host, 443, type=socket.SOCK_STREAM), timeout=RESOLVE_TIMEOUT_SECONDS,
        )
    except (socket.gaierror, UnicodeError, asyncio.TimeoutError):
        raise _invalid("the endpoint URL's host does not resolve") from None
    return list(dict.fromkeys(info[4][0] for info in infos))


async def check_endpoint(endpoint: str) -> None:
    """Raise PushRegistrationError unless the server may POST to ``endpoint``
    (module docstring)."""
    host = _check_url_shape(endpoint)
    if get_settings().push_allow_private_endpoints:
        return
    try:
        literal = ipaddress.ip_address(host)
    except ValueError:
        literal = None
    addresses = [str(literal)] if literal is not None else await _resolve(host)
    if not addresses or not all(is_public_address(a) for a in addresses):
        raise _invalid(
            "the endpoint URL's host is not a public address "
            "(a server admin can allow private ones with PUSH_ALLOW_PRIVATE_ENDPOINTS)"
        )


def _check_key(name: str, value: str, length: int) -> None:
    try:
        raw = base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))
    except (ValueError, TypeError):
        raw = b""
    if len(raw) != length or (name == "p256dh" and raw[:1] != b"\x04"):
        what = "an uncompressed P-256 public key (65 bytes)" if name == "p256dh" else f"{length} bytes"
        raise PushRegistrationError("invalid_push_keys", f"{name} must be {what}, base64url")


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
    ) -> tuple[OxydePushDevice, bool]:
        """Register or replace the device for (user, installation).
        Returns the row and whether it was created.

        The endpoint is unique across the table: one endpoint reaches one
        app instance, signed in as one person, so a registration of an
        endpoint another row holds (the phone switched accounts without
        signing out, or the app reinstalled under a new installation id)
        takes it over and the other row is deleted. The credential the
        request came with replaces the stored one, so the device then
        goes with that session or key (module docstring of the model)."""
        if registration.transport is not PushTransport.WEB_PUSH:  # pragma: no cover -- the only member
            raise PushRegistrationError("unsupported_push_transport", "only web_push is supported")
        if not registration.p256dh or not registration.auth:
            raise PushRegistrationError("invalid_push_keys", "web_push needs both p256dh and auth")
        _check_key("p256dh", registration.p256dh, 65)
        _check_key("auth", registration.auth, 16)
        await check_endpoint(registration.endpoint)

        fields = dict(
            transport=registration.transport,
            endpoint=registration.endpoint,
            p256dh=registration.p256dh,
            auth=registration.auth,
            platform=registration.platform,
            label=registration.label,
            holder_session_id=holder_session_id,
            credential_id=credential_id,
        )
        try:
            async with atomic():
                existing = await OxydePushDevice.objects.filter(
                    user_id=user_id, installation_id=installation_id,
                ).first()
                holders = await OxydePushDevice.objects.filter(endpoint=registration.endpoint).all()
                others = [d.id for d in holders if existing is None or d.id != existing.id]
                if others:
                    await OxydePushDevice.objects.filter(id__in=others).delete()
                now = _now()
                if existing is not None:
                    endpoint_changed = existing.endpoint != registration.endpoint
                    update = dict(fields, updated_at=now)
                    if endpoint_changed:
                        # A new endpoint has no delivery history.
                        update.update(last_success_at=None, failure_count=0)
                    await OxydePushDevice.objects.filter(id=existing.id).update(**update)
                    return await OxydePushDevice.objects.get(id=existing.id), False
                count = await OxydePushDevice.objects.filter(user_id=user_id).count()
                if count >= MAX_DEVICES_PER_USER:
                    raise PushRegistrationError(
                        "too_many_push_devices",
                        f"at most {MAX_DEVICES_PER_USER} devices per person; remove one first",
                        status_code=409,
                    )
                device = await OxydePushDevice.objects.create(
                    user_id=user_id, installation_id=installation_id, created_at=now, updated_at=now, **fields,
                )
                return device, True
        except IntegrityError:
            # Two registrations of the same installation or endpoint at once.
            raise PushRegistrationError(
                "push_registration_conflict", "a registration of this device is already in progress; retry",
                status_code=409,
            ) from None

    async def unregister(self, user_id: str, installation_id: str) -> bool:
        deleted = await OxydePushDevice.objects.filter(user_id=user_id, installation_id=installation_id).delete()
        return bool(deleted)

    # --- revocation -----------------------------------------------------------

    async def delete_for_sessions(self, holder_session_ids: list[str]) -> int:
        """Devices registered with these holder sessions, which were just
        revoked. Called inside the revoking transaction."""
        if not holder_session_ids:
            return 0
        return await OxydePushDevice.objects.filter(holder_session_id__in=list(holder_session_ids)).delete()

    async def delete_for_keys(self, key_ids: list[str]) -> int:
        """Devices registered with these API keys, which were just revoked."""
        if not key_ids:
            return 0
        return await OxydePushDevice.objects.filter(credential_id__in=list(key_ids)).delete()

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
