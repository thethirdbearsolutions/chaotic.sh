"""Wires the remote MCP Streamable HTTP transport onto the FastAPI app
(CHT-1266). See ``mcp_server/__init__.py`` for the big picture, ``tools.py``
for the tool definitions, ``auth.py`` for the two supported auth modes.

Two plain ``Route``s, not a Starlette ``Mount`` -- Mount compiles its
path regex as ``"<prefix>/{path:path}"``, which requires a trailing
slash after the prefix and so does NOT match a bare ``/mcp`` request
(the documented, expected URL); that would 404 exactly the request
every client actually makes. Plain ``Route`` objects match precisely
what's registered, no trailing-slash surprise.

Deployment choices, both driven by chaotic being self-hosted on whatever
host/domain an operator picks (no fixed hostname to hardcode):

* ``stateless_http=True, json_response=True`` -- every request gets its
  own throwaway transport instead of a session pinned across requests.
  Streamable HTTP's stateful mode (SSE-backed, sticky sessions) assumes
  one long-lived server process a client stays bound to; chaotic's tool
  calls are all synchronous request/response (nothing here streams or
  pushes), so there's nothing to lose by not paying for session
  affinity -- and it's one less thing to break behind a load balancer
  with no sticky sessions configured.
* ``transport_security`` -- derived from ``settings.cors_origins`` (see
  ``_transport_security()``): explicit origins turn the SDK's
  Host/Origin allowlisting on, keyed to them; the wildcard default turns
  it off. Never the SDK's own default, which auto-enables allowlisting
  keyed to ``127.0.0.1``/``localhost`` (its default `host` setting)
  whenever you don't override `host` -- that would reject every request
  against a real deployment domain.
"""
from __future__ import annotations

import logging
from urllib.parse import urlparse

from fastapi import FastAPI
from mcp.server.fastmcp import FastMCP
from mcp.server.fastmcp.server import StreamableHTTPASGIApp
from mcp.server.transport_security import TransportSecuritySettings
from starlette.routing import Route

from app.config import get_settings
from app.mcp_server.auth import BearerHeaderAuth, CapabilityPathRedaction, CapabilityURLAuth
from app.mcp_server.tools import ALL_TOOLS

_fastmcp: FastMCP | None = None


def _transport_security() -> TransportSecuritySettings:
    """DNS-rebinding protection keyed to the operator's CORS_ORIGINS
    (PR #219 review, finding 3).

    * Explicit origins configured (e.g. ``CORS_ORIGINS=https://tracker.example.com``)
      -> enable the SDK's Host/Origin allowlisting, allowing those origins
      and Hosts derived from them (netloc, plus netloc:* so a nonstandard
      port still matches). Requests with no Origin header (Claude Code
      CLI, curl) pass the Origin check by design -- only the Host check
      applies to them.
    * Wildcard (the ``*`` default) -> protection off entirely. There is
      nothing to allowlist: the SDK matches Host/Origin literally (a
      ``*`` entry never matches a real value, and an EMPTY allowed_hosts
      rejects every request with a 421), so "enabled with wildcard"
      isn't lax, it's a total outage. The API key check in ``auth.py``
      remains this endpoint's actual access control either way;
      rebinding protection only adds defense-in-depth for browser-based
      drive-bys, which need a real origin list to mean anything.
    """
    origins = [o.strip() for o in get_settings().cors_origins.split(",") if o.strip()]
    if not origins or "*" in origins:
        return TransportSecuritySettings(enable_dns_rebinding_protection=False)

    allowed_hosts: list[str] = []
    for origin in origins:
        netloc = urlparse(origin).netloc
        if netloc:
            allowed_hosts.append(netloc)
            if ":" not in netloc:
                allowed_hosts.append(f"{netloc}:*")
    return TransportSecuritySettings(
        enable_dns_rebinding_protection=True,
        allowed_origins=origins,
        allowed_hosts=allowed_hosts,
    )


def get_fastmcp() -> FastMCP:
    """Build (once) the shared FastMCP instance backing /mcp.

    Lazy so importing this module doesn't require an app to exist yet;
    tests that just want a toolset to inspect use ``tools.build_server()``
    instead, which returns an independent instance.
    """
    global _fastmcp
    if _fastmcp is None:
        # FastMCP.__init__ unconditionally calls the SDK's
        # configure_logging(), which logging.basicConfig()s a
        # RichHandler onto the ROOT logger at INFO -- a global side
        # effect that would hijack the whole backend's logging (every
        # library's INFO chatter, rich-formatted, on stderr) just
        # because app.main imports this module. Snapshot and restore
        # the root logger around construction so building the MCP
        # server changes MCP state and nothing else.
        root = logging.getLogger()
        prev_handlers = root.handlers[:]
        prev_level = root.level
        try:
            _fastmcp = FastMCP(
                name="chaotic",
                instructions=(
                    'Tools for the Chaotic issue tracker, scoped to the API key '
                    'used to authenticate this connection. If a call reports '
                    'multiple accessible teams/projects, pass `team` and/or '
                    '`project` explicitly to disambiguate. Every tool returns a '
                    'JSON object; failures come back as {"error": "..."} rather '
                    'than a protocol error.'
                ),
                json_response=True,
                stateless_http=True,
                transport_security=_transport_security(),
            )
        finally:
            root.handlers[:] = prev_handlers
            root.setLevel(prev_level)
        for tool_fn in ALL_TOOLS:
            _fastmcp.add_tool(tool_fn)
        # streamable_http_app() is what lazily builds the session manager;
        # its *returned* Starlette app is discarded -- we register our own
        # Route objects below instead (see module docstring on Mount).
        _fastmcp.streamable_http_app()
    return _fastmcp


def mcp_lifespan():
    """Async context manager to enter alongside init_oxyde/close_oxyde in
    app.main's lifespan. The session manager owns a task group that must
    be running for the app's whole lifetime -- Starlette does NOT cascade
    a mounted sub-app's own lifespan automatically, so the parent has to
    enter this explicitly (the mcp SDK's documented pattern for mounting
    onto an existing ASGI app). Only exercised by a real ASGI lifespan
    (uvicorn, e2e/'s real server) -- like the rest of app.main's own
    lifespan, backend/tests' ASGITransport-based `client` fixture never
    drives lifespan.startup/shutdown at all, so this line is structurally
    uncovered there by the same convention (see that fixture's docstring).
    """
    return get_fastmcp().session_manager.run()  # pragma: no cover


def mount_mcp(app: FastAPI) -> None:
    """Register the two /mcp routes plus the key-redaction middleware.
    Call this before any catch-all route (app.main's SPA fallback) is
    registered, so /mcp gets first look.
    """
    session_manager = get_fastmcp().session_manager
    header_app = BearerHeaderAuth(StreamableHTTPASGIApp(session_manager))
    capability_app = CapabilityURLAuth(StreamableHTTPASGIApp(session_manager))

    # App-level (pre-routing) so even requests that never reach the
    # capability route -- 405s, CORS preflights, the SPA catch-all --
    # get the key scrubbed out of scope["path"] before any logger sees
    # it. See CapabilityPathRedaction's docstring.
    app.add_middleware(CapabilityPathRedaction)

    app.router.routes.append(Route("/mcp", endpoint=header_app, methods=["GET", "POST", "DELETE"]))
    app.router.routes.append(Route("/mcp/{api_key}", endpoint=capability_app, methods=["GET", "POST", "DELETE"]))
