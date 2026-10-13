"""Push notification API (CHT-1604): device registration, per-kind
preferences and the server's VAPID public key, under /api/push.

For the native app (CHT-1419): it gets a Web Push endpoint from the
UnifiedPush distributor on the phone and registers it here; the sender
(CHT-1605) pushes one notification per inbox entry to every device of
the entry's recipient, for the kinds they have on.

Devices and preferences are a person's own. Any credential a person can
use on REST works (a web or CLI login, their ``ck_`` key, and the app's
own session once CHT-1602 lets an OAuth session act as a person); an
agent is refused whatever it holds, since inbox entries are for people.
A device registered with a holder session or an API key goes when that
session or key is revoked (``app.oxyde_models.push``).
"""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Path, Response, status

from app.api.deps import CurrentPrincipal, CurrentUser
from app.auth.access import reads, writes
from app.auth.credentials import CredentialKind, Principal
from app.oxyde_models.user import OxydeUser
from app.schemas.push import (
    PushDeviceRegister,
    PushDeviceResponse,
    PushPreferencesResponse,
    PushPreferencesUpdate,
    VapidPublicKeyResponse,
)
from app.services.push_service import PushRegistrationError, PushService, Registration, device_status
from app.utils import vapid

router = APIRouter()

HUMAN_REQUIRED = {
    "error_code": "human_required",
    "message": "Push notifications are for people; an agent cannot register a device or set preferences.",
}

# Chosen by the app: a UUID in practice. Bounded and plain so it is safe
# in a URL, a log line and a unique index.
InstallationId = Annotated[str, Path(min_length=8, max_length=128, pattern=r"^[A-Za-z0-9._-]+$")]


async def _require_person(user: CurrentUser) -> OxydeUser:
    if user.is_agent:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=dict(HUMAN_REQUIRED))
    return user


Person = Annotated[OxydeUser, Depends(_require_person)]


def _refusal(exc: PushRegistrationError) -> HTTPException:
    return HTTPException(status_code=exc.status_code, detail={"error_code": exc.error_code, "message": exc.message})


def _credential_links(principal: Principal) -> tuple[str | None, str | None]:
    """(holder_session_id, credential_id) of the request's credential: the
    rows whose revocation should take the device with it."""
    key_id = principal.credential_id if principal.kind is CredentialKind.API_KEY else None
    return principal.holder_session_id, key_id


_CREDENTIAL_LABELS = {
    CredentialKind.SESSION_JWT: "a web or CLI sign-in",
    CredentialKind.API_KEY: "an API key",
    CredentialKind.OAUTH_ACCESS: "an app session",
}


def _responses(devices) -> list[PushDeviceResponse]:
    now = datetime.now(timezone.utc)
    try:
        current = vapid.key_id()
    except vapid.VapidKeyError:  # pragma: no cover -- startup refuses a bad key
        current = ""
    return [PushDeviceResponse.of(d, status=device_status(d, now=now, current_key_id=current)) for d in devices]


@router.get("/devices", response_model=list[PushDeviceResponse])
@reads
async def list_push_devices(current_user: Person) -> list[PushDeviceResponse]:
    """The caller's registered devices, newest first."""
    return _responses(await PushService().list_devices(current_user.id))


@router.put("/devices/{installation_id}", response_model=PushDeviceResponse)
@writes
async def register_push_device(
    installation_id: InstallationId,
    body: PushDeviceRegister,
    current_user: Person,
    principal: CurrentPrincipal,
    response: Response,
) -> PushDeviceResponse:
    """Register this installation's push endpoint, or replace it (the
    endpoint changes when the UnifiedPush distributor does). 201 when the
    installation is new, 200 when it replaced a registration. 422 for an
    endpoint the server will not POST to or malformed keys; 409 past the
    per-person device limit."""
    holder_session_id, credential_id = _credential_links(principal)
    try:
        device, created = await PushService().register(
            current_user.id,
            installation_id,
            Registration(
                endpoint=body.endpoint, p256dh=body.p256dh, auth=body.auth, transport=body.transport,
                platform=body.platform, label=body.label,
            ),
            holder_session_id=holder_session_id,
            credential_id=credential_id,
            credential_expires_at=principal.credential_expires_at,
            credential_label=_CREDENTIAL_LABELS.get(principal.kind, "a sign-in"),
        )
    except PushRegistrationError as exc:
        raise _refusal(exc) from None
    if created:
        response.status_code = status.HTTP_201_CREATED
    return _responses([device])[0]


@router.delete("/devices/{installation_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def delete_push_device(installation_id: InstallationId, current_user: Person) -> None:
    """Stop pushing to this installation. 404 if the caller has no such
    registration."""
    if not await PushService().unregister(current_user.id, installation_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Device not found")


@router.get("/preferences", response_model=PushPreferencesResponse)
@reads
async def get_push_preferences(current_user: Person) -> PushPreferencesResponse:
    """Every inbox kind and whether it is pushed to the caller. Each is
    on unless turned off, except agent_status, off unless turned on."""
    return PushPreferencesResponse(kinds=await PushService().preferences(current_user.id))


@router.patch("/preferences", response_model=PushPreferencesResponse)
@writes
async def update_push_preferences(body: PushPreferencesUpdate, current_user: Person) -> PushPreferencesResponse:
    """Turn the given kinds on or off; the others stay as they are."""
    return PushPreferencesResponse(kinds=await PushService().set_preferences(current_user.id, body.kinds))


@router.get("/vapid-public-key", response_model=VapidPublicKeyResponse)
@reads
async def get_vapid_public_key(current_user: Person) -> VapidPublicKeyResponse:
    """The key the app passes to its push distributor as the application
    server key. Signed-in people only, like the rest of /api/push."""
    try:
        public_key = vapid.public_key_b64url()
    except vapid.VapidKeyError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={"error_code": "push_misconfigured", "message": f"Push is not available: {exc}"},
        ) from None
    return VapidPublicKeyResponse(public_key=public_key, key_id=vapid.key_id())
