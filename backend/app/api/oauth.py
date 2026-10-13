"""OAuth authorization-server endpoints (CHT-1368; design doc §2.1).

``public_router`` is mounted at the server root, next to the discovery
documents (``app.oauth.discovery``), because the paths are the ones the
authorization-server metadata advertises: ``/oauth/register``
(CHT-1518) and ``/oauth/authorize`` (CHT-1519). ``router`` is the
consent API the SPA calls, under ``/api/oauth`` (CHT-1519). Everything
404s while ``OAUTH_ENABLED`` is off.

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

import html
import json
import re

from fastapi import APIRouter, HTTPException, Request, Response, status
from fastapi.responses import HTMLResponse, RedirectResponse

from app.api.deps import HumanUser
from app.auth.access import reads, writes
from app.config import get_settings
from app.oauth.clients import canonical_resource, redirect_uri_matches
from app.oauth.discovery import AUTHORIZE_PATH, REGISTER_PATH, oauth_enabled
from app.oauth.errors import FRAME_HEADERS, NO_STORE, OAuthHTTPError
from app.schemas.oauth import (
    AuthorizationApproval,
    AuthorizationDecision,
    AuthorizationRequestView,
    ClientRegistrationResponse,
)
from app.services.oauth_client_service import OAuthClientError, OAuthClientService, redirect_uris_of
from app.services.oauth_consent_service import (
    MAX_STATE_LENGTH,
    ConsentError,
    OAuthConsentService,
    normalize_requested_scope,
    with_query,
)

# The SPA route the authorize endpoint sends the browser to (design §2.3).
CONSENT_PATH = "/oauth/consent"

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


# --- /oauth/authorize (CHT-1519) ---------------------------------------------

# Parameters that must not repeat (RFC 6749 §3.1).
_SINGLE_PARAMS = (
    "client_id", "redirect_uri", "response_type", "code_challenge", "code_challenge_method",
    "state", "scope", "resource",
)
# RFC 7636 §4.1: 43..128 characters of [A-Z a-z 0-9 - . _ ~]; an S256
# challenge is exactly 43.
_S256_CHALLENGE = re.compile(r"^[A-Za-z0-9_-]{43}$")

_ERROR_PAGE = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="referrer" content="no-referrer"><title>Authorization failed - Chaotic</title>
<style>body{{font-family:system-ui,sans-serif;max-width:36rem;margin:4rem auto;padding:0 1rem;color:#222}}
h1{{font-size:1.25rem}}code{{background:#f2f2f2;padding:.1rem .3rem}}</style></head>
<body><h1>This app's authorization request can't be completed</h1>
<p>{message}</p>
<p>Nothing was shared with the app, and you were not sent back to it, because its request could not be
verified. If you were setting up a connector, check its URL and try again, or ask the app's developer.</p>
</body></html>"""


def _error_page(message: str) -> HTMLResponse:
    """An invalid client or redirect_uri: an error page here, never a
    redirect, since nothing says where a redirect would be safe (I17)."""
    return HTMLResponse(
        _ERROR_PAGE.format(message=html.escape(message)),
        status_code=status.HTTP_400_BAD_REQUEST,
        headers={**NO_STORE, **FRAME_HEADERS},
    )


def _redirect(uri: str) -> RedirectResponse:
    return RedirectResponse(uri, status_code=status.HTTP_302_FOUND, headers={**NO_STORE, "Referrer-Policy": "no-referrer"})


@public_router.get(AUTHORIZE_PATH)
@reads
async def authorize(request: Request) -> Response:
    """OAuth 2.1 authorization endpoint (design §2.3 step 1).

    Unauthenticated: nothing here knows who is logged in. In order:

    1. the client must resolve (CIMD fetch or a live DCR id), and
       ``redirect_uri`` must match its registration (loopback port
       aside). Either failing renders an error page, never a redirect;
    2. everything else (response_type, PKCE S256, resource, scope,
       repeated parameters) fails by redirecting to that validated URI
       with ``error``, ``state`` and ``iss``;
    3. success stores the request (10 minutes, single use) and sends the
       browser to the SPA's consent page.

    Classified ``@reads`` though it stores a row: it authenticates
    nobody, so the registrar rule never reaches it, and the marker
    follows the GET-is-read convention every route keeps.
    """
    if not oauth_enabled():
        raise _not_found()
    params = request.query_params
    if any(len(params.getlist(name)) > 1 for name in ("client_id", "redirect_uri")):
        return _error_page("The request repeats client_id or redirect_uri.")
    try:
        client = await OAuthClientService().resolve(params.get("client_id"))
    except OAuthClientError as exc:
        return _error_page(f"The app could not be identified: {exc.description}.")
    redirect_uri = params.get("redirect_uri")
    if not redirect_uri:
        return _error_page("The request has no redirect_uri.")
    if not redirect_uri_matches(redirect_uris_of(client), redirect_uri):
        return _error_page("The redirect_uri is not one this app registered.")

    state = params.get("state")
    iss = get_settings().oauth_issuer

    def fail(error: str, description: str, *, keep_state: bool = True) -> RedirectResponse:
        return _redirect(with_query(redirect_uri, {
            "error": error,
            "error_description": description,
            "state": state if keep_state else None,
            "iss": iss,
        }))

    if state is not None and len(state) > MAX_STATE_LENGTH:
        return fail("invalid_request", f"state may be at most {MAX_STATE_LENGTH} characters", keep_state=False)
    repeated = [name for name in _SINGLE_PARAMS if len(params.getlist(name)) > 1]
    if repeated:
        return fail("invalid_request", f"repeated parameter: {repeated[0]}")
    if params.get("response_type") != "code":
        return fail("unsupported_response_type", "response_type must be code")
    challenge = params.get("code_challenge")
    if not challenge:
        return fail("invalid_request", "code_challenge is required (PKCE)")
    if params.get("code_challenge_method") != "S256":
        return fail("invalid_request", "code_challenge_method must be S256")
    if not _S256_CHALLENGE.match(challenge):
        return fail("invalid_request", "code_challenge is not an S256 challenge")
    resource = params.get("resource")
    if resource is not None and canonical_resource(resource, iss) is None:
        return fail("invalid_target", "resource must be this server's /mcp endpoint")
    scopes = normalize_requested_scope(params.get("scope"))
    if scopes is None:
        return fail("invalid_scope", "unknown scope requested")

    stored = await OAuthConsentService().create_request(
        client=client, redirect_uri=redirect_uri, state=state, code_challenge=challenge, scopes=scopes,
    )
    return _redirect(f"{iss}{CONSENT_PATH}/{stored.id}")


# --- consent API (CHT-1519), mounted under /api/oauth ------------------------

router = APIRouter()
def _consent_enabled() -> None:
    if not oauth_enabled():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not Found")


def _http(exc: ConsentError) -> HTTPException:
    return HTTPException(status_code=exc.status_code, detail=exc.detail)


@router.get("/requests/{request_id}", response_model=AuthorizationRequestView)
@reads
async def get_authorization_request(request_id: str, user: HumanUser) -> AuthorizationRequestView:
    """What the consent page shows. The first person to read a request is
    bound to it; anyone else gets 404 from then on."""
    _consent_enabled()
    try:
        return await OAuthConsentService().view(request_id, user)
    except ConsentError as exc:
        raise _http(exc) from None


@router.post("/requests/{request_id}/approve", response_model=AuthorizationDecision)
@writes
async def approve_authorization_request(
    request_id: str, choice: AuthorizationApproval, user: HumanUser, response: Response,
) -> AuthorizationDecision:
    """Approve: mint a single-use code for the chosen agent, team,
    projects and policy, and return the client redirect carrying it."""
    _consent_enabled()
    try:
        redirect, agent_id = await OAuthConsentService().approve(request_id, user, choice)
    except ConsentError as exc:
        raise _http(exc) from None
    response.headers.update(NO_STORE)
    return AuthorizationDecision(redirect=redirect, agent_id=agent_id)


@router.post("/requests/{request_id}/deny", response_model=AuthorizationDecision)
@writes
async def deny_authorization_request(request_id: str, user: HumanUser) -> AuthorizationDecision:
    _consent_enabled()
    try:
        return AuthorizationDecision(redirect=await OAuthConsentService().deny(request_id, user))
    except ConsentError as exc:
        raise _http(exc) from None
