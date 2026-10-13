"""Bearer-token / capability-URL auth for the /mcp Streamable HTTP endpoint
(CHT-1266).

Two modes (no JWT on either):

1. ``Authorization: Bearer ck_...`` or ``Bearer cat_...`` on /mcp -- works
   for Claude Code's ``--transport http``, OAuth MCP clients (CHT-1576,
   with ``OAUTH_ENABLED`` on) and anything else that lets you set a
   header. Resolved by ``app.auth.credentials.mcp_resolver`` (CHT-1560),
   the same resolver the REST API uses: same key hash/expiry/active
   checks, same agent-vs-human resolution. /mcp accepts API keys and
   OAuth access tokens issued for /mcp or for the whole server.
2. ``/mcp/<api-key>`` -- a capability URL, API keys only
   (``capability_url_resolver``: an OAuth token is never carried in a
   path, CHT-1570), for connector UIs that only
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

   Deprecated (CHT-1522): served only while
   ``MCP_CAPABILITY_URL_ENABLED`` is on (default on for now, off once
   OAuth ships), with a ``Deprecation`` header on every response. Off,
   it is a 404; the redaction below stays installed either way.

   One leak channel IS closed server-side: ``CapabilityPathRedaction``
   below rewrites ``scope["path"]`` to a redacted form before anything
   downstream can log it, so *this* server's access log and error log
   never see the raw key. That doesn't help with logs upstream of this
   process (reverse proxies, CDNs) or client-side history -- hence the
   dedicated-expiring-key advice above.

OAuth discovery (CHT-1517): with ``OAUTH_ENABLED`` on, a 401 on bare
/mcp for a missing or non-``ck_`` bearer (a failed OAuth token
included, with ``error="invalid_token"``) carries the RFC 9728
``resource_metadata`` and ``scope`` challenge parameters, which is how an
OAuth MCP client finds the authorization server (see
``app.oauth.discovery``). A presented ``ck_`` key that fails, and every
401 on the capability URL, keep the bare ``Bearer`` challenge: those
callers are API-key users, and the OAuth hint would only mislead them.
With the flag off every 401 is the bare challenge, as before.

Either way, the resolved principal (user and granted scopes) is stashed
in ``context.current_mcp_principal`` for the life of the request; the
``InProcessBackend`` adapter (backend.py) reads it back out on every call.
"""
from __future__ import annotations

import logging
from urllib.parse import quote

from starlette.datastructures import Headers, MutableHeaders
from starlette.responses import JSONResponse
from starlette.types import ASGIApp, Receive, Scope, Send

from app.auth.credentials import (
    CredentialError,
    CredentialFailure,
    CredentialKind,
    CredentialResolver,
    capability_url_resolver,
    mcp_resolver,
)
from app.config import get_settings
from app.mcp_server.context import current_mcp_principal
from app.oauth.discovery import www_authenticate_challenge
from app.services.token_service import ALL_SECRET_PREFIXES

logger = logging.getLogger(__name__)

_WWW_AUTHENTICATE = {"WWW-Authenticate": "Bearer"}

# Scope key CapabilityPathRedaction stashes the raw path key under, and
# CapabilityURLAuth reads it back from. Deliberately the ONLY channel --
# CapabilityURLAuth has no path_params fallback, so if the redaction
# middleware ever goes missing, capability-URL auth breaks loudly (401 on
# every request, every test) instead of silently reverting to logging raw
# keys.
_SCOPE_KEY = "chaotic_mcp_capability_key"

_MCP_PREFIX = "/mcp/"

# RFC 9745 ``Deprecation`` value for the capability URL (CHT-1522): the
# date it was deprecated, 2026-10-13T00:00:00Z, as a structured-field Date.
CAPABILITY_URL_DEPRECATION = "@1791849600"
# RFC 9745 §3: where to read about the deprecation and the migration.
CAPABILITY_URL_DEPRECATION_LINK = (
    "<https://github.com/thethirdbearsolutions/chaotic.sh/blob/main/docs/self-hosting-security.md"
    '#the-capability-url-mcp_capability_url_enabled>; rel="deprecation"; type="text/html"'
)


def capability_url_enabled() -> bool:
    """``MCP_CAPABILITY_URL_ENABLED``, read at call time."""
    return get_settings().mcp_capability_url_enabled


def warn_if_capability_url_enabled() -> None:
    """Startup warning while the deprecated capability URL is served
    (CHT-1522). Called from app.main's lifespan."""
    if capability_url_enabled():
        logger.warning(
            "MCP_CAPABILITY_URL_ENABLED is on: /mcp/<api-key> still accepts an API key in the URL. "
            "It is deprecated and will be off by default once OAuth for MCP ships; move connectors "
            "to /mcp with an Authorization header or OAuth, then set MCP_CAPABILITY_URL_ENABLED=false."
        )


def _redact_key(key: str) -> str:
    """`ck_51342099[...]dd4d19a0` -> `ck_...19a0`: enough to correlate a
    log line with `chaotic auth keys list` (which shows the key's prefix
    and id), nowhere near enough to reconstruct the credential (keys are
    ck_ + 64 random hex chars; 4 trailing chars leak 16 bits). ASCII
    dots, not a unicode ellipsis -- uvicorn percent-encodes non-ASCII
    path bytes in access-log lines (`ck_%E2%80%A619a0`), which defeats
    the at-a-glance readability this exists for.

    Every prefix this server mints is kept whole (CHT-1516): a
    `cat_`/`crt_`/`cac_`/`cct_` token or `ccs_` client secret pasted into a path is scrubbed the
    same way and reads as `cat_...19a0`, not `cat...19a0`.
    """
    if len(key) > 12:
        prefix = next((p for p in ALL_SECRET_PREFIXES if key.startswith(p)), key[:3])
        return f"{prefix}...{key[-4:]}"
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

    The key is the first segment after ``/mcp/`` whatever follows it, and
    anything below it is dropped from the logged path as well (CHT-1587):
    ``/mcp/<key>/`` and ``/mcp/<key>/x`` are redacted and answered 404
    here. Being the one place that sees every capability-URL request
    before routing, it also applies MCP_CAPABILITY_URL_ENABLED (CHT-1522):
    off, every request gets a 404 without the key being read; on, every
    response but a 500 carries the deprecation headers.

    Other shapes a key can arrive in (``//mcp/<key>`` from a base URL
    with a trailing slash, ``/mcp//<key>``, ``/MCP/<key>``, a key pasted
    anywhere else) and WebSocket requests are scrubbed too (PR #346
    re-review): every segment that starts with a prefix this server mints
    and is long enough to be a secret is redacted. Those requests route
    as before (the SPA, a 403 WebSocket close); none of them reaches the
    capability route, so none reaches the key resolver.
    """

    def __init__(self, app: ASGIApp):
        self._app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] not in ("http", "websocket"):
            await self._app(scope, receive, send)
            return
        path = scope.get("path", "")
        key, slash, tail = path[len(_MCP_PREFIX):].partition("/") if path.startswith(_MCP_PREFIX) else ("", "", "")
        if not key:
            # Any other shape (`//mcp/<key>`, `/mcp//<key>`, `/MCP/<key>`, a
            # key pasted anywhere else): scrub every segment that looks like
            # a secret this server mints, and route the rest as usual.
            redacted = _redact_secret_segments(path)
            if redacted != path:
                _set_path(scope, redacted)
            await self._app(scope, receive, send)
            return

        # The capability URL: the first segment after /mcp/ is the key,
        # whatever it looks like, and anything below it is dropped from
        # the logged path too (CHT-1587).
        _set_path(scope, f"{_MCP_PREFIX}{_redact_key(key)}" + (f"/{'...' if tail else ''}" if slash else ""))
        if scope["type"] == "websocket":
            # No WebSocket route lives here; the router refuses it (403).
            await self._app(scope, receive, send)
            return

        enabled = capability_url_enabled()
        if enabled:
            send = _with_deprecation(send)
        if slash or not enabled:
            # Off (CHT-1522): every method gets a 404 before anything reads
            # the key, so a stale URL learns nothing about it. A path below
            # the key is never the capability URL (CHT-1587); without this
            # it fell through to the SPA catch-all with a 200.
            await JSONResponse({"detail": "Not Found"}, status_code=404)(scope, receive, send)
            return
        scope[_SCOPE_KEY] = key
        await self._app(scope, receive, send)


def _set_path(scope: Scope, path: str) -> None:
    """Rewrite the path every logger reads (``path``; ``raw_path`` kept
    consistent, percent-encoded as the ASGI spec has it)."""
    scope["path"] = path
    scope["raw_path"] = quote(path).encode("ascii")


# Shorter than this a segment cannot hold a secret worth hiding (every
# secret this server mints is a prefix plus 64 hex characters), and
# leaving it alone keeps a short word like `cat_x` routable.
_MIN_SECRET_SEGMENT = 13


def _redact_secret_segments(path: str) -> str:
    """Redact each path segment that starts with a prefix this server
    mints (``ck_``, ``cat_``, ...) and is long enough to be a secret."""
    return "/".join(
        _redact_key(segment)
        if len(segment) >= _MIN_SECRET_SEGMENT and segment.startswith(ALL_SECRET_PREFIXES)
        else segment
        for segment in path.split("/")
    )


def _with_deprecation(send: Send) -> Send:
    """Wrap ``send`` so the response carries the capability URL's
    deprecation headers (CHT-1522). Applied here, outside routing, so the
    router's 405 gets them too. A 500 does not: Starlette's
    ServerErrorMiddleware sends it outside every user middleware."""

    async def send_with_deprecation(message):
        if message["type"] == "http.response.start":
            headers = MutableHeaders(scope=message)
            headers["Deprecation"] = CAPABILITY_URL_DEPRECATION
            headers.append("Link", CAPABILITY_URL_DEPRECATION_LINK)
        await send(message)

    return send_with_deprecation


def _missing_key_message() -> str:
    """Only point at the capability URL while it is served (CHT-1522)."""
    if capability_url_enabled():
        return "Missing API key. Send `Authorization: Bearer ck_...`, or use the /mcp/<key> capability URL."
    return "Missing API key. Send `Authorization: Bearer ck_...`."


async def _resolve(
    api_key: str | None,
    challenge: dict[str, str] = _WWW_AUTHENTICATE,
    invalid_token_challenge: dict[str, str] | None = None,
    resolver: CredentialResolver | None = None,
):
    """Resolve the presented credential with the shared resolver
    (``app.auth.credentials``, CHT-1560), the one the REST API uses.
    Returns (principal, None) on success or (None, error_response).

    ``challenge`` is the WWW-Authenticate header when no token was sent,
    ``invalid_token_challenge`` (default: the same) when a token of any
    kind but an API key failed (picked by ``CredentialError.kind``); a
    failed ``ck_`` key always gets the bare one. ``resolver`` defaults to
    ``mcp_resolver`` (read at call time, so tests can stand one in).
    """
    try:
        principal = await (resolver or mcp_resolver).resolve(api_key)
    except CredentialError as exc:
        if exc.failure is CredentialFailure.MISSING:
            return None, JSONResponse(
                {"error": _missing_key_message()},
                status_code=401,
                headers=challenge,
            )
        if exc.kind is CredentialKind.API_KEY:
            # An API-key user: the OAuth hint would only mislead them.
            return None, JSONResponse({"error": exc.detail}, status_code=exc.status_code, headers=_WWW_AUTHENTICATE)
        # Any other kind: a JWT, which /mcp does not accept, an OAuth
        # token on the capability URL, or an OAuth access token that
        # failed verification (CHT-1576).
        message = (
            "Not a chaotic API key (expected a `ck_...` token)."
            if exc.failure is CredentialFailure.UNSUPPORTED else exc.detail
        )
        # The challenge goes on a 401 only (RFC 6750 §3.1). On a 403 (an
        # inactive agent) it would tell an OAuth client to re-authorize,
        # which yields a token for the same agent and the same 403: a loop.
        headers = (invalid_token_challenge or challenge) if exc.status_code == 401 else None
        return None, JSONResponse({"error": message}, status_code=exc.status_code, headers=headers)
    return principal, None


class _AuthWrapperBase:
    """Shared plumbing for the two auth wrappers: resolve a user (or
    short-circuit with an error response), stash it in the contextvar for
    the duration of the call, delegate to the wrapped MCP ASGI app.
    """

    def __init__(self, app: ASGIApp):
        self._app = app

    def _extract_key(self, scope: Scope) -> str | None:
        raise NotImplementedError

    def _challenges(self) -> tuple[dict[str, str], dict[str, str]]:
        """(no token sent, non-ck_ token sent)."""
        return _WWW_AUTHENTICATE, _WWW_AUTHENTICATE

    def _resolver(self) -> CredentialResolver | None:
        """None: ``mcp_resolver``."""
        return None

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http":  # pragma: no cover -- Route only ever matches "http" scopes
            await self._app(scope, receive, send)
            return

        principal, error = await _resolve(self._extract_key(scope), *self._challenges(), resolver=self._resolver())
        if error is not None:
            await error(scope, receive, send)
            return

        reset = current_mcp_principal.set(principal)
        try:
            await self._app(scope, receive, send)
        finally:
            current_mcp_principal.reset(reset)


class BearerHeaderAuth(_AuthWrapperBase):
    """Mode 1: `Authorization: Bearer <api-key>` on /mcp."""

    def _extract_key(self, scope: Scope) -> str | None:
        auth_header = Headers(scope=scope).get("authorization")
        if auth_header and auth_header.lower().startswith("bearer "):
            return auth_header[7:].strip()
        return None

    def _challenges(self) -> tuple[dict[str, str], dict[str, str]]:
        # Read per request, so OAUTH_ENABLED needs no remount (CHT-1517).
        return (
            {"WWW-Authenticate": www_authenticate_challenge()},
            {"WWW-Authenticate": www_authenticate_challenge(token_presented=True)},
        )


class CapabilityURLAuth(_AuthWrapperBase):
    """Mode 2: /mcp/{api_key} -- the path segment IS the key, read from
    where CapabilityPathRedaction stashed it (NOT from path_params, which
    only ever contains the already-redacted form -- see _SCOPE_KEY).

    Deprecated (CHT-1522): the gate and the ``Deprecation`` header live
    in CapabilityPathRedaction, which sees every /mcp/<key> request before
    routing. With ``MCP_CAPABILITY_URL_ENABLED`` off, no request reaches
    this class.
    """

    def _extract_key(self, scope: Scope) -> str | None:
        return scope.get(_SCOPE_KEY)

    def _resolver(self) -> CredentialResolver:
        # API keys only: an OAuth token in a path would be logged upstream
        # and kept in history (CHT-1570), so it is refused here even when
        # it is valid at /mcp with a header.
        return capability_url_resolver
