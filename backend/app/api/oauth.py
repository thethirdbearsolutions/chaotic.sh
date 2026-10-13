"""OAuth authorization-server endpoints (CHT-1368; design doc §2.1).

``public_router`` is mounted at the server root, next to the discovery
documents (``app.oauth.discovery``), because the paths are the ones the
authorization-server metadata advertises: ``/oauth/register`` here
(CHT-1518). Everything 404s while ``OAUTH_ENABLED`` is off.

Errors are OAuth-shaped (``{"error", "error_description"}``, RFC 6749
§5.2 / RFC 7591 §3.2.2), raised as ``app.oauth.errors.OAuthHTTPError`` and rendered by
its handler (registered in ``app.main``), never FastAPI's
``{"detail": ...}``.

None of these endpoints reads a cookie or the ``Authorization`` header
(CHT-1564): register is unauthenticated by design (RFC 7591), and the
token and revoke endpoints (CHT-1520) authenticate clients by request
body only. ``tests/test_oauth_registration.py`` pins that for every
public OAuth POST route.
"""
from __future__ import annotations

import json

from fastapi import APIRouter, Request, Response, status

from app.auth.access import writes
from app.config import get_settings
from app.oauth.discovery import REGISTER_PATH, oauth_enabled
from app.oauth.errors import NO_STORE, OAuthHTTPError
from app.schemas.oauth import ClientRegistrationResponse
from app.services.oauth_client_service import OAuthClientError, OAuthClientService, redirect_uris_of

# A registration request is a few hundred bytes; refuse anything that
# isn't before parsing it.
MAX_REGISTRATION_BYTES = 16 * 1024


def _not_found() -> OAuthHTTPError:
    return OAuthHTTPError(status.HTTP_404_NOT_FOUND, "not_found", "OAuth is not enabled on this server")


def _from_client_error(exc: OAuthClientError) -> OAuthHTTPError:
    return OAuthHTTPError(exc.status_code, exc.error, exc.description)


async def _bounded_body(request: Request, limit: int) -> bytes:
    """The request body, refused (400) without reading past ``limit``
    bytes: by its declared Content-Length when there is one, and by
    counting while streaming otherwise (chunked bodies)."""
    too_large = OAuthHTTPError(400, "invalid_client_metadata", "the registration request is too large")
    declared = request.headers.get("content-length")
    if declared is not None:
        declared = declared.strip()
        if not declared.isdigit():
            raise OAuthHTTPError(400, "invalid_request", "invalid Content-Length")
        if int(declared) > limit:
            raise too_large
    body = bytearray()
    async for chunk in request.stream():
        body.extend(chunk)
        if len(body) > limit:
            raise too_large
    return bytes(body)


public_router = APIRouter(include_in_schema=False)


@public_router.post(
    REGISTER_PATH,
    status_code=status.HTTP_201_CREATED,
    response_model=ClientRegistrationResponse,
    response_model_exclude_none=True,
)
@writes
async def register_client(request: Request, response: Response) -> ClientRegistrationResponse:
    """RFC 7591 dynamic client registration (CHT-1518, design §2.2).
    Unauthenticated; rate-limited per source IP and capped globally."""
    if not oauth_enabled() or not get_settings().oauth_dcr_enabled:
        raise _not_found()
    raw = await _bounded_body(request, MAX_REGISTRATION_BYTES)
    try:
        metadata = json.loads(raw)
    except (ValueError, UnicodeDecodeError):
        raise OAuthHTTPError(400, "invalid_client_metadata", "the registration request must be a JSON object") from None
    if not isinstance(metadata, dict):
        raise OAuthHTTPError(400, "invalid_client_metadata", "the registration request must be a JSON object")
    try:
        client, secret = await OAuthClientService().register(
            metadata, source_ip=request.client.host if request.client else None,
        )
    except OAuthClientError as exc:
        raise _from_client_error(exc) from None
    response.headers.update(NO_STORE)
    stored = json.loads(client.metadata_json or "{}")
    return ClientRegistrationResponse(
        client_id=client.id,
        client_id_issued_at=int(client.created_at.timestamp()),
        client_secret=secret,
        client_secret_expires_at=0 if secret else None,
        client_name=client.client_name,
        redirect_uris=redirect_uris_of(client),
        token_endpoint_auth_method=client.token_endpoint_auth_method,
        grant_types=stored.get("grant_types", ["authorization_code"]),
        response_types=stored.get("response_types", ["code"]),
        scope=stored.get("scope"),
    )
