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
   take a URL and can't set custom headers (true of claude.ai's web
   custom-connector UI as of when this was written -- see docs/agents.md).
   The path segment IS the API key.

   *** This is strictly worse than the header mode and should only be
   used when the client genuinely can't do headers: the key ends up in
   browser history and anywhere the URL gets copy-pasted (chat
   transcripts, bug reports, Slack messages). Mint a dedicated,
   narrowly-named, EXPIRING key for it (``chaotic auth keys create
   "claude.ai connector" --expires-in 90d``) so it's easy to tell apart
   and revoke (``chaotic auth keys revoke``) without touching any other
   integration. ***

   One leak channel IS closed server-side: ``CapabilityPathRedaction``
   below rewrites ``scope["path"]`` to a redacted form before anything
   downstream can log it, so *this* server's access log and error log
   never see the raw key. That doesn't help with logs upstream of this
   process (reverse proxies, CDNs) or client-side history -- hence the
   dedicated-expiring-key advice above.

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

# Scope key CapabilityPathRedaction stashes the raw path key under, and
# CapabilityURLAuth reads it back from. Deliberately the ONLY channel --
# CapabilityURLAuth has no path_params fallback, so if the redaction
# middleware ever goes missing, capability-URL auth breaks loudly (401 on
# every request, every test) instead of silently reverting to logging raw
# keys.
_SCOPE_KEY = "chaotic_mcp_capability_key"

_MCP_PREFIX = "/mcp/"


def _redact_key(key: str) -> str:
    """`ck_51342099[...]dd4d19a0` -> `ck_...19a0`: enough to correlate a
    log line with `chaotic auth keys list` (which shows the key's prefix
    and id), nowhere near enough to reconstruct the credential (keys are
    ck_ + 64 random hex chars; 4 trailing chars leak 16 bits). ASCII
    dots, not a unicode ellipsis -- uvicorn percent-encodes non-ASCII
    path bytes in access-log lines (`ck_%E2%80%A619a0`), which defeats
    the at-a-glance readability this exists for.
    """
    if len(key) > 12:
        return f"{key[:3]}...{key[-4:]}"
    return "..."


class CapabilityPathRedaction:
    """ASGI middleware that strips the API key out of /mcp/<key> paths
    before ANYTHING downstream can observe it (PR #219 review, finding 1).

    Without this, the raw key leaks into logs through two documented
    paths that both read the request path from the ASGI scope:

      * uvicorn's access logger prints `scope["path"]` on every request,
        and none of the documented run commands (justfile `serve`/
        `serve-prod`, README) disable access logging;
      * app.main's unhandled-exception handler logs
        ``request.url.path`` -- built from the same scope.

    Both read the *same dict this middleware mutates* (uvicorn logs at
    response time, the exception handler builds its Request after
    routing), so one early rewrite covers both: the raw key moves into
    ``scope[_SCOPE_KEY]`` for CapabilityURLAuth, and ``scope["path"]``/
    ``scope["raw_path"]`` become ``/mcp/ck_...last4``.

    Installed as app-level middleware (before routing, see
    asgi.mount_mcp) rather than inside the /mcp/{api_key} route handler
    on purpose: requests that never reach the handler still get logged
    with their full path -- a 405 from a stray PUT, a CORS preflight --
    and would leak the key if redaction only happened post-routing. The
    redacted path still matches the ``/mcp/{api_key}`` route (it's a
    normal one-segment path), so routing is unaffected.
    """

    def __init__(self, app: ASGIApp):
        self._app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] == "http":
            path = scope.get("path", "")
            if path.startswith(_MCP_PREFIX):
                key = path[len(_MCP_PREFIX):]
                if key and "/" not in key:
                    redacted_path = f"{_MCP_PREFIX}{_redact_key(key)}"
                    scope[_SCOPE_KEY] = key
                    scope["path"] = redacted_path
                    scope["raw_path"] = redacted_path.encode()
        await self._app(scope, receive, send)


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
    """Mode 2: /mcp/{api_key} -- the path segment IS the key, read from
    where CapabilityPathRedaction stashed it (NOT from path_params, which
    only ever contains the already-redacted form -- see _SCOPE_KEY)."""

    def _extract_key(self, scope: Scope) -> str | None:
        return scope.get(_SCOPE_KEY)
