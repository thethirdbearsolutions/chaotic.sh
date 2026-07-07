"""Bearer-token / capability-URL auth for the /mcp Streamable HTTP endpoint
(CHT-1266).

Two modes, both API-key only (no JWT, no OAuth -- see CHT-1266: OAuth 2.1
+ dynamic client registration for the paste-a-URL-and-authorize connector
UX is an explicit, separate follow-up):

1. ``Authorization: Bearer ck_...`` on /mcp -- works for Claude Code's
   ``--transport http`` and anything else that lets you set a header.
   Reuses ``app.api.deps._authenticate_with_api_key`` verbatim: same key
   hash/expiry/active checks the REST API uses, same agent-vs-human
   resolution.
2. ``/mcp/<api-key>`` -- a capability URL, for connector UIs that only
   take a URL and can't set custom headers (true of claude.ai's custom
   connector UI as of when this was written -- verify against current
   docs before relying on it; CHT-1266 doc TODO). The path segment IS the
   API key.

   *** This is strictly worse than the header mode and should only be
   used when the client genuinely can't do headers: the key ends up in
   browser history, proxy/server access logs, and anywhere the URL gets
   copy-pasted (chat transcripts, bug reports, Slack messages). Mint a
   dedicated, narrowly-named key for it (``chaotic auth keys create
   --name "claude.ai connector"``) so it's easy to tell apart and revoke
   (``chaotic auth keys revoke``) without touching any other
   integration. ***

Either way, the resolved user is stashed in
``context.current_mcp_user`` for the life of the request; tool functions
(tools.py) read it back out.
"""
from __future__ import annotations

from fastapi import HTTPException
from starlette.datastructures import Headers
from starlette.responses import JSONResponse
from starlette.types import ASGIApp, Receive, Scope, Send

from app.api.deps import _authenticate_with_api_key
from app.mcp_server.context import current_mcp_user

_WWW_AUTHENTICATE = {"WWW-Authenticate": "Bearer"}


async def _resolve(api_key: str | None):
    """Validate `api_key` exactly the way the REST API's `ck_...` bearer
    path does. Returns (user, None) on success or (None, error_response).
    """
    if not api_key:
        return None, JSONResponse(
            {"error": "Missing API key. Send `Authorization: Bearer ck_...`, or use the /mcp/<key> capability URL."},
            status_code=401,
            headers=_WWW_AUTHENTICATE,
        )
    if not api_key.startswith("ck_"):
        return None, JSONResponse(
            {"error": "Not a chaotic API key (expected a `ck_...` token)."},
            status_code=401,
            headers=_WWW_AUTHENTICATE,
        )
    try:
        user = await _authenticate_with_api_key(api_key)
    except HTTPException as exc:
        return None, JSONResponse({"error": exc.detail}, status_code=exc.status_code, headers=_WWW_AUTHENTICATE)
    return user, None


class _AuthWrapperBase:
    """Shared plumbing for the two auth wrappers: resolve a user (or
    short-circuit with an error response), stash it in the contextvar for
    the duration of the call, delegate to the wrapped MCP ASGI app.
    """

    def __init__(self, app: ASGIApp):
        self._app = app

    def _extract_key(self, scope: Scope) -> str | None:
        raise NotImplementedError

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http":  # pragma: no cover -- Route only ever matches "http" scopes
            await self._app(scope, receive, send)
            return

        user, error = await _resolve(self._extract_key(scope))
        if error is not None:
            await error(scope, receive, send)
            return

        reset = current_mcp_user.set(user)
        try:
            await self._app(scope, receive, send)
        finally:
            current_mcp_user.reset(reset)


class BearerHeaderAuth(_AuthWrapperBase):
    """Mode 1: `Authorization: Bearer <api-key>` on /mcp."""

    def _extract_key(self, scope: Scope) -> str | None:
        auth_header = Headers(scope=scope).get("authorization")
        if auth_header and auth_header.lower().startswith("bearer "):
            return auth_header[7:].strip()
        return None


class CapabilityURLAuth(_AuthWrapperBase):
    """Mode 2: /mcp/{api_key} -- the matched path segment IS the key."""

    def _extract_key(self, scope: Scope) -> str | None:
        return scope.get("path_params", {}).get("api_key")
