"""OAuth authorization-server endpoints (CHT-1368; design doc §2.1).

``public_router`` is mounted at the server root, next to the discovery
documents (``app.oauth.discovery``), because the paths are the ones the
authorization-server metadata advertises: ``/oauth/register``
(CHT-1518), ``/oauth/authorize`` (CHT-1519), and ``/oauth/token`` and
``/oauth/revoke`` (CHT-1520). ``router`` is the
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
from urllib.parse import parse_qsl

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.responses import HTMLResponse, RedirectResponse

from app.api.deps import CurrentUser, HumanUser, security
from app.auth.credentials import CredentialKind, classify
from app.auth.access import reads, writes
from app.config import get_settings
from app.enums import OAuthClientRegistration
from app.oauth import ratelimit
from app.oxyde_models.oauth import OxydeOAuthClient
from app.oxyde_models.team import OxydeTeam
from app.oxyde_models.user import OxydeUser
from app.oauth.clients import canonical_resource, redirect_uri_matches, redirect_uri_problem
from app.oauth.discovery import AUTHORIZE_PATH, REGISTER_PATH, REVOKE_PATH, TOKEN_PATH, oauth_enabled
from app.oauth.errors import FRAME_HEADERS, NO_STORE, OAuthHTTPError
from app.schemas.oauth import (
    AuthorizationApproval,
    AuthorizationDecision,
    AuthorizationRequestView,
    ClientRegistrationResponse,
    ConnectionResponse,
    ConsentClient,
    TokenAgent,
    TokenResponse,
)
from app.services.oauth_client_service import OAuthClientError, OAuthClientService, redirect_uris_of
from app.services.revocation_service import RevocationService
from app.services.oauth_grant_service import GrantError, OAuthGrantService, TokenRequest
from app.services.oauth_consent_service import (
    AVAILABLE_POLICIES,
    MAX_STATE_LENGTH,
    POLICY_SCOPES,
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


async def _bounded_body(
    request: Request, limit: int, *, error: str = "invalid_client_metadata",
    description: str = "the registration request is too large",
) -> bytes:
    """The request body, refused (400 ``error``) without reading past
    ``limit`` bytes: by its declared Content-Length when there is one, and
    by counting while streaming otherwise (chunked bodies)."""
    too_large = OAuthHTTPError(400, error, description)
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


def _error_page(message: str, status_code: int = status.HTTP_400_BAD_REQUEST) -> HTMLResponse:
    """An invalid client or redirect_uri: an error page here, never a
    redirect, since nothing says where a redirect would be safe (I17)."""
    return HTMLResponse(
        _ERROR_PAGE.format(message=html.escape(message)),
        status_code=status_code,
        headers={**NO_STORE, **FRAME_HEADERS, "Referrer-Policy": "no-referrer"},
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
    source_ip = request.client.host if request.client else None
    if source_ip and not ratelimit.authorize_requests.allow(
        ratelimit.address_bucket(source_ip), get_settings().oauth_authorize_max_per_ip_per_minute,
    ):
        # Before the client is known, so a page, not a redirect.
        return _error_page("Too many authorization requests from your network; wait a minute and try again.", 429)
    params = request.query_params
    if any(len(params.getlist(name)) > 1 for name in ("client_id", "redirect_uri")):
        return _error_page("The request repeats client_id or redirect_uri.")
    try:
        client = await OAuthClientService().resolve(params.get("client_id"), source_ip=source_ip)
    except OAuthClientError as exc:
        return _error_page(f"The app could not be identified: {exc.description}.", exc.status_code)
    redirect_uri = params.get("redirect_uri")
    if not redirect_uri:
        return _error_page("The request has no redirect_uri.")
    if not redirect_uri_matches(redirect_uris_of(client), redirect_uri):
        return _error_page("The redirect_uri is not one this app registered.")
    # Again here, not only at registration: a row stored before a rule
    # tightened (a cached metadata document) is not re-validated, and
    # this URI is where the browser will be sent (CHT-1519 review B1).
    if redirect_uri_problem(
        redirect_uri, allow_private_use=client.registration == OAuthClientRegistration.CIMD,
    ):
        return _error_page("The app's redirect_uri is not one this server will send a browser to.")

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
    if not any(POLICY_SCOPES.get(s) in AVAILABLE_POLICIES for s in scopes):
        # Consent may grant less than asked, never more (review S2/Q1):
        # an app asking only for a policy this server can't grant yet is
        # told so, not shown a page that can't be approved.
        available = " ".join(sorted(f"chaotic:{p}" for p in AVAILABLE_POLICIES))
        return fail("invalid_scope", f"only {available} is available on this server")

    stored = await OAuthConsentService().create_request(
        client=client, redirect_uri=redirect_uri, state=state, code_challenge=challenge, scopes=scopes,
    )
    return _redirect(f"{iss}{CONSENT_PATH}/{stored.id}")


# --- /oauth/token and /oauth/revoke (CHT-1520) --------------------------------

FORM_CONTENT_TYPE = "application/x-www-form-urlencoded"
# A token request is a few hundred bytes.
MAX_FORM_BYTES = 16 * 1024
_MAX_FORM_FIELDS = 32
_TOKEN_PARAMS = (
    "grant_type", "client_id", "client_secret", "code", "redirect_uri", "code_verifier",
    "refresh_token", "scope", "resource",
)
_REVOKE_PARAMS = ("token", "token_type_hint", "client_id", "client_secret")


async def _form(request: Request, names: tuple[str, ...]) -> dict[str, str]:
    """The named parameters of a form-encoded POST body (RFC 6749 §3.2,
    RFC 7009 §2.1), each at most once; an empty value counts as absent
    (§3.1). Unknown parameters are ignored, as RFC 6749 asks.

    Refused: any other content type (Claude sends form encoding; JSON
    is for the P2 claim grants), and any query string at all. Codes,
    tokens and secrets belong in the body: uvicorn's access log records
    the URL, so one carried there would be written down (CHT-1570). It is
    refused, not read."""
    if request.url.query:
        raise OAuthHTTPError(400, "invalid_request", "parameters go in the form-encoded body, never the URL")
    media_type = request.headers.get("content-type", "").split(";", 1)[0].strip().lower()
    if media_type != FORM_CONTENT_TYPE:
        raise OAuthHTTPError(400, "invalid_request", f"the request body must be {FORM_CONTENT_TYPE}")
    _refuse_basic_auth(request)
    raw = await _bounded_body(request, MAX_FORM_BYTES, error="invalid_request", description="the request is too large")
    try:
        pairs = parse_qsl(raw.decode("utf-8"), keep_blank_values=True, max_num_fields=_MAX_FORM_FIELDS)
    except (UnicodeDecodeError, ValueError):
        raise OAuthHTTPError(400, "invalid_request", "the request body is not valid form encoding") from None
    form: dict[str, str] = {}
    seen: set[str] = set()
    for name, value in pairs:
        if name not in names:
            continue
        if name in seen:
            raise OAuthHTTPError(400, "invalid_request", f"repeated parameter: {name}")
        seen.add(name)
        if value != "":
            form[name] = value
    return form


def _refuse_basic_auth(request: Request) -> None:
    """A client that tried HTTP Basic (client_secret_basic, which the
    metadata does not advertise) is told to use client_secret_post: 400
    rather than a 401 challenge for a scheme that would be refused anyway
    (PR #345 review). Only the scheme word is looked at; the credentials
    in the header are never read (CHT-1564). The source-level guard in
    tests/test_oauth_registration.py allows this one helper by name."""
    scheme = request.headers.get("Authorization", "").split(" ", 1)[0]
    if scheme.lower() == "basic":
        raise OAuthHTTPError(
            400, "invalid_request",
            "HTTP Basic client authentication is not supported; send client_id and client_secret "
            "in the form body (client_secret_post)",
        )


def _from_grant_error(exc: GrantError) -> OAuthHTTPError:
    return OAuthHTTPError(exc.status_code, exc.error, exc.description)


@public_router.post(TOKEN_PATH, response_model=TokenResponse, response_model_exclude_unset=True)
@writes
async def token(request: Request, response: Response) -> TokenResponse:
    """OAuth 2.1 token endpoint (design §2.4): the ``authorization_code``
    grant (PKCE S256, exact redirect_uri, client and RFC 8707 resource
    all matching the code) and ``refresh_token`` (rotation with reuse
    detection). The client authenticates by its registered method, in
    the body (``app.services.oauth_grant_service``). Nothing ambient is
    read (CHT-1564), and every answer, success or error, is
    ``Cache-Control: no-store``."""
    if not oauth_enabled():
        raise _not_found()
    form = await _form(request, _TOKEN_PARAMS)
    try:
        issued = await OAuthGrantService().token(TokenRequest(
            **{name: form.get(name) for name in _TOKEN_PARAMS},
            user_agent=request.headers.get("user-agent"),
        ))
    except GrantError as exc:
        raise _from_grant_error(exc) from None
    response.headers.update(NO_STORE)
    return issued


@public_router.post(REVOKE_PATH)
@writes
async def revoke(request: Request) -> Response:
    """RFC 7009 token revocation: revokes the holder session behind an
    access or refresh token issued to the authenticated client. 200 for
    every token, valid or not (§2.2); only a malformed request or a
    failed client authentication is an error."""
    if not oauth_enabled():
        raise _not_found()
    form = await _form(request, _REVOKE_PARAMS)
    try:
        await OAuthGrantService().revoke(
            token=form.get("token"), client_id=form.get("client_id"), client_secret=form.get("client_secret"),
        )
    except GrantError as exc:
        raise _from_grant_error(exc) from None
    return Response(status_code=status.HTTP_200_OK, headers=NO_STORE)


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


# --- connected apps (CHT-1523), mounted under /api/oauth ---------------------
#
# A person's own OAuth connections: the holder sessions they consented to
# (design §4.3, S7). Only their own: the service filters on the consenting
# human, and a connection that is not theirs is a 404 whatever it is.
# Not gated on OAUTH_ENABLED: turning OAuth off must never stop anyone
# seeing or ending a connection made while it was on. A person may use
# any of their own credentials (the CLI's login or key, or the web app);
# an agent may not, whatever it holds, so a connection can never list or
# revoke the connections of the human it answers to.

HUMAN_REQUIRED = {
    "error_code": "human_required",
    "message": "Only a person can list or revoke their connected apps; an agent cannot.",
}
OAUTH_TOKEN_REFUSED = {
    "error_code": "oauth_token_refused",
    "message": "A connected app's own token cannot list or revoke connected apps; "
               "use your web login, your CLI login or one of your API keys.",
}


async def _require_person(
    user: CurrentUser,
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
) -> OxydeUser:
    """A human, on one of their own credentials: a session JWT (web or
    CLI login) or a human's ``ck_`` key. Refused by credential class first,
    so an OAuth access token is refused whoever its principal is: once a
    holder session can act as a human (WEB_LOGIN, CHT-1524), a token an
    app holds must still not reach that human's other connections. Then
    any agent, whatever it presents."""
    if credentials is not None and classify(credentials.credentials) is CredentialKind.OAUTH_ACCESS:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=dict(OAUTH_TOKEN_REFUSED))
    if user.is_agent:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=dict(HUMAN_REQUIRED))
    return user


Person = Annotated[OxydeUser, Depends(_require_person)]


async def _connection_responses(rows) -> list[ConnectionResponse]:
    def ids(attr):
        return list({getattr(r, attr) for r in rows if getattr(r, attr)})

    clients = {c.id: c for c in await OxydeOAuthClient.objects.filter(id__in=ids("oauth_client_id")).all()}
    agents = {u.id: u for u in await OxydeUser.objects.filter(id__in=ids("principal_user_id")).all()}
    teams = {t.id: t for t in await OxydeTeam.objects.filter(id__in=ids("team_id")).all()}
    out = []
    client_service = OAuthClientService()
    for row in rows:
        client = clients.get(row.oauth_client_id)
        agent = agents.get(row.principal_user_id)
        team = teams.get(row.team_id)
        identity = client_service.identity(client) if client else None
        out.append(ConnectionResponse(
            id=row.id,
            client=ConsentClient(
                client_id=client.id, name=identity.name, trust=identity.trust, host=identity.host,
                registration=client.registration.value,
            ) if client else None,
            agent=TokenAgent(id=agent.id, name=agent.name, kind=agent.kind) if agent else None,
            team_id=row.team_id,
            team_name=team.name if team else None,
            project_ids=json.loads(row.scope_project_ids) if row.scope_project_ids is not None else None,
            policy=row.policy_name,
            scopes=[s for s in (row.scopes or "").split(" ") if s],
            created_at=row.created_at,
            last_used_at=row.last_used_at,
            last_refreshed_at=row.last_refreshed_at,
            idle_expires_at=row.idle_expires_at,
            absolute_expires_at=row.absolute_expires_at,
        ))
    return out


@router.get("/connections", response_model=list[ConnectionResponse])
@reads
async def list_connections(current_user: Person) -> list[ConnectionResponse]:
    """The caller's live OAuth connections, newest first."""
    rows = await RevocationService().list_connections(current_user.id)
    return await _connection_responses(rows)


@router.delete("/connections/{connection_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def revoke_connection(connection_id: str, current_user: Person) -> None:
    """Revoke one of the caller's own OAuth connections: the holder
    session and every token on it, effective on the app's next request.
    Idempotent; 404 for a connection that is not the caller's."""
    result = await RevocationService().revoke_connection(current_user.id, connection_id)
    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Connection not found")
