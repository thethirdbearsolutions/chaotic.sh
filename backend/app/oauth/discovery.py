"""OAuth discovery for /mcp (CHT-1517, design doc §2.1).

Serves the two metadata documents an MCP client walks to find out how to
get a token for /mcp, following the MCP authorization spec (2026-07-28
revision):

1. a 401 from /mcp carries ``WWW-Authenticate: Bearer
   resource_metadata="<base>/.well-known/oauth-protected-resource/mcp",
   scope="chaotic:write"`` (built by
   ``www_authenticate_challenge``; used by ``app.mcp_server.auth``);
2. the RFC 9728 protected-resource metadata there names this server as
   the resource's only authorization server;
3. the RFC 8414 authorization-server metadata at
   ``/.well-known/oauth-authorization-server`` lists the endpoints.

Every URL is derived from ``APP_BASE_URL`` (``Settings.oauth_issuer``),
never from the request's Host, so a forged Host header cannot point a
client at someone else's authorization server.

All of it is gated on ``OAUTH_ENABLED`` (default off), read per request.
When off, the discovery paths 404 and /mcp's 401 stays the bare
``Bearer`` challenge it has always been.

The authorize, token, revoke and register endpoints advertised here are
implemented in ``app.api.oauth``: register (CHT-1518), authorize
(CHT-1519), token and revoke (CHT-1520).
"""
from __future__ import annotations

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from mcp.shared.auth import OAuthMetadata, ProtectedResourceMetadata

from app.config import get_settings

# Paths are relative to the issuer (APP_BASE_URL).
MCP_PATH = "/mcp"
PROTECTED_RESOURCE_METADATA_PATH = "/.well-known/oauth-protected-resource"
AUTHORIZATION_SERVER_METADATA_PATH = "/.well-known/oauth-authorization-server"
AUTHORIZE_PATH = "/oauth/authorize"
TOKEN_PATH = "/oauth/token"
REGISTER_PATH = "/oauth/register"
REVOKE_PATH = "/oauth/revoke"

# Design §2.1. Deliberately no `openid`: ChatGPT requests every advertised
# OIDC scope by default, and this server is not an OpenID provider.
RESOURCE_SCOPES = [
    "chaotic:write",
    "chaotic:worker",
    "chaotic:triage",
    "chaotic:read",
]
# `offline_access` is advertised by the authorization server only. MCP
# authorization spec 2026-07-28, "Refresh Tokens": servers SHOULD NOT put
# it in the WWW-Authenticate scope or the protected-resource
# scopes_supported (refresh tokens are not a resource requirement);
# clients MAY add it when the AS metadata lists it, which Claude does.
# This deliberately deviates from design doc §2.1 (PR #332 review, S2).
AUTHORIZATION_SERVER_SCOPES = RESOURCE_SCOPES + ["offline_access"]
# What a client is told to ask for in the /mcp 401 challenge. Claude
# requests exactly the challenge's scope= when present.
DEFAULT_CHALLENGE_SCOPE = "chaotic:write"

SERVICE_DOCUMENTATION = "https://github.com/thethirdbearsolutions/chaotic.sh/blob/main/docs/agents.md"

# No HTTP caching: the documents depend on OAUTH_ENABLED / APP_BASE_URL,
# and a cached copy must not outlive a config change (PR #332 review, N4).
_METADATA_HEADERS = {"Cache-Control": "no-store"}


def oauth_enabled() -> bool:
    return get_settings().oauth_enabled


def protected_resource_metadata_url() -> str:
    """RFC 9728 §3.1: the well-known path with the resource's path
    (``/mcp``) appended."""
    return f"{get_settings().oauth_issuer}{PROTECTED_RESOURCE_METADATA_PATH}{MCP_PATH}"


def www_authenticate_challenge(token_presented: bool = False) -> str:
    """The challenge for a 401 on /mcp. Bare ``Bearer`` when OAuth is off,
    which is byte-for-byte what /mcp sent before CHT-1517. When on and a
    token was sent but rejected, RFC 6750 §3.1 ``error="invalid_token"``
    tells the client to refresh or re-authorize rather than give up."""
    if not oauth_enabled():
        return "Bearer"
    error = 'error="invalid_token", ' if token_presented else ""
    return (
        f'Bearer {error}resource_metadata="{protected_resource_metadata_url()}", '
        f'scope="{DEFAULT_CHALLENGE_SCOPE}"'
    )


def build_protected_resource_metadata(resource_path: str = MCP_PATH) -> dict:
    """RFC 9728. ``resource`` is the identifier the well-known URL was
    derived from (§3.3): ``<base>/mcp`` for the path-suffixed document,
    ``<base>`` for the bare one."""
    issuer = get_settings().oauth_issuer
    metadata = ProtectedResourceMetadata(
        resource=f"{issuer}{resource_path}",
        authorization_servers=[issuer],
        scopes_supported=RESOURCE_SCOPES,
        bearer_methods_supported=["header"],
        resource_name="Chaotic",
        resource_documentation=SERVICE_DOCUMENTATION,
    )
    return _dump(metadata, issuer, url_fields=("resource",), url_list_fields=("authorization_servers",))


def build_authorization_server_metadata() -> dict:
    settings = get_settings()
    issuer = settings.oauth_issuer
    metadata = OAuthMetadata(
        issuer=issuer,
        authorization_endpoint=f"{issuer}{AUTHORIZE_PATH}",
        token_endpoint=f"{issuer}{TOKEN_PATH}",
        # Design §2.1: only when DCR is on. CIMD needs no endpoint.
        registration_endpoint=f"{issuer}{REGISTER_PATH}" if settings.oauth_dcr_enabled else None,
        revocation_endpoint=f"{issuer}{REVOKE_PATH}",
        scopes_supported=AUTHORIZATION_SERVER_SCOPES,
        response_types_supported=["code"],
        # The two urn:chaotic claim grants join this list with CHT-1447.
        grant_types_supported=["authorization_code", "refresh_token"],
        code_challenge_methods_supported=["S256"],
        # Both "none" and CIMD support are needed for Claude to use CIMD
        # rather than DCR.
        token_endpoint_auth_methods_supported=["none", "client_secret_post"],
        revocation_endpoint_auth_methods_supported=["none", "client_secret_post"],
        client_id_metadata_document_supported=True,
        authorization_response_iss_parameter_supported=True,
        service_documentation=SERVICE_DOCUMENTATION,
    )
    return _dump(metadata, issuer, url_fields=("issuer",))


def _dump(model, issuer: str, *, url_fields=(), url_list_fields=()) -> dict:
    """JSON-dump a metadata model, then pin the issuer-valued fields to the
    exact issuer string. The Settings validator already refuses an
    APP_BASE_URL that pydantic's URL type would normalise to anything
    else, so the only difference left is a trailing slash on a bare
    origin; RFC 8414 §3.3 / RFC 9728 §3.3 compare by exact string."""
    data = model.model_dump(mode="json", exclude_none=True)
    for field in url_fields:
        if data[field].rstrip("/") == issuer:
            data[field] = issuer
    for field in url_list_fields:
        data[field] = [issuer if v.rstrip("/") == issuer else v for v in data[field]]
    return data


def _not_found() -> JSONResponse:
    return JSONResponse({"detail": "Not Found"}, status_code=404)


router = APIRouter(include_in_schema=False)


@router.get(PROTECTED_RESOURCE_METADATA_PATH + MCP_PATH)
async def protected_resource_metadata() -> JSONResponse:
    """RFC 9728 for /mcp, the URL the /mcp 401 challenge points at."""
    if not oauth_enabled():
        return _not_found()
    return JSONResponse(build_protected_resource_metadata(), headers=_METADATA_HEADERS)


@router.get(PROTECTED_RESOURCE_METADATA_PATH)
async def protected_resource_metadata_root() -> JSONResponse:
    """The root form, which MCP clients fall back to when they can't read
    the challenge (e.g. a browser client that isn't allowed to see
    WWW-Authenticate). Per RFC 9728 §3.3 its ``resource`` is the origin
    itself, not ``/mcp``; the authorization server accepts either as an
    RFC 8707 resource (design §2.3), and clients that compare it to the
    /mcp URL treat an origin as a matching prefix."""
    if not oauth_enabled():
        return _not_found()
    return JSONResponse(build_protected_resource_metadata(""), headers=_METADATA_HEADERS)


@router.get(AUTHORIZATION_SERVER_METADATA_PATH)
async def authorization_server_metadata() -> JSONResponse:
    """RFC 8414."""
    if not oauth_enabled():
        return _not_found()
    return JSONResponse(build_authorization_server_metadata(), headers=_METADATA_HEADERS)
