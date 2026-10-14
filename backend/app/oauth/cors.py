"""CORS for browser-based OAuth MCP clients (CHT-1551).

The app-wide policy is a ``CORSMiddleware`` keyed to ``CORS_ORIGINS``.
With explicit origins (the hardened setup) a browser client served from
anywhere else, such as MCP Inspector, cannot read the OAuth discovery
documents or call the token/register/revoke endpoints, and on ``/mcp``
it cannot read the 401's ``WWW-Authenticate`` challenge even when its
origin is allowed, because no header is exposed.

``OAuthAwareCORS`` replaces that one middleware and picks a policy per
request. With ``OAUTH_ENABLED`` off (checked on each request, like the
rest of ``app.oauth``, against the cached settings, so a change takes a
restart) every request gets the app-wide policy, built from the
same arguments as before, so nothing changes. With it on:

* the public OAuth endpoints (``PUBLIC_OAUTH_METHODS``) get
  ``Access-Control-Allow-Origin: *`` without credentials, the same
  policy the mcp SDK's own auth routes use. That is safe because none
  of them reads a cookie: the documents are public, and the token,
  register and revoke endpoints authenticate by request body. The
  authorize endpoint is deliberately not here: a client navigates to it
  rather than fetching it, as with the SDK's routes.
* ``/mcp`` gets the app-wide policy plus
  ``Access-Control-Expose-Headers: WWW-Authenticate``, so a browser
  client whose origin is allowed can follow the challenge's
  ``resource_metadata`` instead of probing well-known paths. The
  capability URL ``/mcp/<key>`` is not included: its 401 is always the
  bare ``Bearer`` challenge.

A browser client calling ``/mcp`` itself still needs its origin in
``CORS_ORIGINS`` when that list is explicit: both this middleware and
the mcp SDK's DNS-rebinding guard (``app.mcp_server.asgi``) check it.
See docs/self-hosting-security.md, "CORS and browser-based MCP clients".
"""
from __future__ import annotations

from starlette.middleware.cors import CORSMiddleware
from starlette.types import ASGIApp, Receive, Scope, Send

from app.oauth.discovery import (
    AUTHORIZATION_SERVER_METADATA_PATH,
    MCP_PATH,
    PROTECTED_RESOURCE_METADATA_PATH,
    REGISTER_PATH,
    REVOKE_PATH,
    TOKEN_PATH,
    oauth_enabled,
)

# Path -> the methods a cross-origin caller may use on it.
_DOCUMENT_METHODS = ("GET", "OPTIONS")
_ENDPOINT_METHODS = ("POST", "OPTIONS")
PUBLIC_OAUTH_METHODS: dict[str, tuple[str, ...]] = {
    PROTECTED_RESOURCE_METADATA_PATH + MCP_PATH: _DOCUMENT_METHODS,
    PROTECTED_RESOURCE_METADATA_PATH: _DOCUMENT_METHODS,
    AUTHORIZATION_SERVER_METADATA_PATH: _DOCUMENT_METHODS,
    TOKEN_PATH: _ENDPOINT_METHODS,
    REGISTER_PATH: _ENDPOINT_METHODS,
    REVOKE_PATH: _ENDPOINT_METHODS,
}

# The header MCP clients send on discovery requests, as in the SDK's own
# auth routes. Starlette always allows the CORS-safelisted ones as well
# (Content-Type among them, which register's JSON body needs).
_PUBLIC_ALLOW_HEADERS = ["mcp-protocol-version"]


class OAuthAwareCORS:
    """Drop-in for ``app.add_middleware(CORSMiddleware, **kwargs)``; see
    the module docstring."""

    def __init__(self, app: ASGIApp, **cors_kwargs) -> None:
        self._default = CORSMiddleware(app, **cors_kwargs)
        expose = list(cors_kwargs.get("expose_headers", ()))
        if "WWW-Authenticate" not in expose:
            expose.append("WWW-Authenticate")
        self._mcp = CORSMiddleware(app, **{**cors_kwargs, "expose_headers": expose})
        self._public = {
            path: CORSMiddleware(
                app,
                allow_origins=["*"],
                allow_credentials=False,
                allow_methods=list(methods),
                allow_headers=_PUBLIC_ALLOW_HEADERS,
            )
            for path, methods in PUBLIC_OAUTH_METHODS.items()
        }

    def _pick(self, scope: Scope) -> ASGIApp:
        if scope["type"] != "http" or not oauth_enabled():
            return self._default
        path = scope.get("path", "")
        if path == MCP_PATH:
            return self._mcp
        return self._public.get(path, self._default)

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        await self._pick(scope)(scope, receive, send)
