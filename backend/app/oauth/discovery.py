"""OAuth discovery for /mcp (CHT-1517, design doc §2.1).

Serves the two metadata documents an MCP client walks to find out how to
get a token for /mcp, following the MCP authorization spec (2026-07-28
revision):

1. a 401 from /mcp carries ``WWW-Authenticate: Bearer
   resource_metadata="<base>/.well-known/oauth-protected-resource/mcp",
   scope="chaotic:write offline_access"`` (built by
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
implemented by CHT-1518 (register), CHT-1519 (authorize) and CHT-1520
(token, revoke); until they land the flag must stay off.
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
SCOPES_SUPPORTED = [
    "chaotic:write",
    "chaotic:worker",
    "chaotic:triage",
    "chaotic:read",
    "offline_access",
]
# What a client is told to ask for in the /mcp 401 challenge. Claude
# requests exactly the challenge's scope= when present.
DEFAULT_CHALLENGE_SCOPE = "chaotic:write offline_access"

SERVICE_DOCUMENTATION = "https://github.com/thethirdbearsolutions/chaotic.sh/blob/main/docs/agents.md"

# Same as the mcp SDK's own metadata handler.
_METADATA_HEADERS = {"Cache-Control": "public, max-age=3600"}


def oauth_enabled() -> bool:
    return get_settings().oauth_enabled


def protected_resource_metadata_url() -> str:
    """RFC 9728 §3.1: the well-known path with the resource's path
    (``/mcp``) appended."""
    return f"{get_settings().oauth_issuer}{PROTECTED_RESOURCE_METADATA_PATH}{MCP_PATH}"


def www_authenticate_challenge() -> str:
    """The challenge for a 401 on /mcp. Bare ``Bearer`` when OAuth is off,
    which is byte-for-byte what /mcp sent before CHT-1517."""
    if not oauth_enabled():
        return "Bearer"
    return (
        f'Bearer resource_metadata="{protected_resource_metadata_url()}", '
        f'scope="{DEFAULT_CHALLENGE_SCOPE}"'
    )


def build_protected_resource_metadata() -> dict:
    issuer = get_settings().oauth_issuer
    metadata = ProtectedResourceMetadata(
        resource=f"{issuer}{MCP_PATH}",
        authorization_servers=[issuer],
        scopes_supported=SCOPES_SUPPORTED,
        bearer_methods_supported=["header"],
        resource_name="Chaotic",
        resource_documentation=SERVICE_DOCUMENTATION,
    )
    return _dump(metadata, issuer, url_fields=("resource",), url_list_fields=("authorization_servers",))


def build_authorization_server_metadata() -> dict:
    issuer = get_settings().oauth_issuer
    metadata = OAuthMetadata(
        issuer=issuer,
        authorization_endpoint=f"{issuer}{AUTHORIZE_PATH}",
        token_endpoint=f"{issuer}{TOKEN_PATH}",
        registration_endpoint=f"{issuer}{REGISTER_PATH}",
        revocation_endpoint=f"{issuer}{REVOKE_PATH}",
        scopes_supported=SCOPES_SUPPORTED,
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
    exact issuer string. pydantic's URL type may normalise a bare origin to
    ``https://host/``, and RFC 8414 §3.3 / RFC 9728 §3.3 compare these
    values to the issuer by exact string match."""
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
@router.get(PROTECTED_RESOURCE_METADATA_PATH)
async def protected_resource_metadata() -> JSONResponse:
    """RFC 9728. The bare path serves the same document: /mcp is this
    server's only OAuth-protected resource."""
    if not oauth_enabled():
        return _not_found()
    return JSONResponse(build_protected_resource_metadata(), headers=_METADATA_HEADERS)


@router.get(AUTHORIZATION_SERVER_METADATA_PATH)
async def authorization_server_metadata() -> JSONResponse:
    """RFC 8414."""
    if not oauth_enabled():
        return _not_found()
    return JSONResponse(build_authorization_server_metadata(), headers=_METADATA_HEADERS)
