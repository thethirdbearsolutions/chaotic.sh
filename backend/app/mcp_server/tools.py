"""Remote MCP tool definitions (CHT-1266) -- the backend-hosted sibling of
``chaotic mcp`` (cli/src/cli/mcp_server.py, stdio transport).

Since CHT-1374 the tool bodies are not defined here at all: both servers
register the ONE toolset in ``chaotic_mcp_tools`` (shipped inside the
chaotic-cli distribution, which this backend depends on by path). What
this module contributes is the ``Backend`` those bodies run against --
``InProcessBackend`` (``backend.py``), which calls ``app.api`` directly as
the user resolved from the caller's API key -- and the binding of the
shared bodies to it. Because that backend advertises
``Capabilities(team_param=True)``, the team-scoped tools here carry an
extra optional ``team`` parameter the stdio server's don't
(``chaotic_mcp_tools.TEAM_SCOPED_TOOLS``; ``scope.py`` for how it
resolves): an API key's user can belong to more than one team/project
where a CLI profile can't. Everything else about the schemas is
byte-identical by construction, and tests/test_mcp_toolset_sync.py pins
it against docs/mcp-toolset-schema.json anyway.

Every bound tool is a module attribute (``tools.issue_view``, ...) so the
direct tests can ``await`` it with the auth contextvar set by hand.
"""
from __future__ import annotations

import contextlib
import hashlib
import json
import logging

from mcp.server.mcpserver import MCPServer

from chaotic_mcp_tools import (  # noqa: F401 - re-exported for tests
    COMPACT_DOCUMENT_FIELDS,
    COMPACT_ISSUE_FIELDS,
    COMPACT_PROJECT_FIELDS,
    ISSUE_VIEW_COMMENT_CAP,
    ISSUE_VIEW_FETCH_LIMIT,
    OFFSET_PROBE_SORT_KEYS,
    RESPONSE_SHAPES,
    TEXT_PREVIEW_CHARS,
    ToolInputError,
    bind_all,
    compact as _compact,
    listing as _listing,
    preview as _preview,
    with_budget_state as _with_budget_state,
)

from app.mcp_server.backend import (  # noqa: F401 - re-exported for tests
    InProcessBackend,
    _resolve_document_id,
    _team_id_for_project,
    http_error_payload as _http_error_payload,
)

# scope.py's resolvers raise the shared type; the old name stays importable.
ToolContextError = ToolInputError

BACKEND = InProcessBackend()

# Bound once at import: the backend is stateless per instance (it reads the
# per-request user from the contextvar on every call).
ALL_TOOLS = tuple(bind_all(BACKEND))

for _tool in ALL_TOOLS:
    globals()[_tool.__name__] = _tool
del _tool

__all__ = ["ALL_TOOLS", "BACKEND", "ToolContextError", "build_server", *[t.__name__ for t in ALL_TOOLS]]


_fingerprint: str | None = None


@contextlib.contextmanager
def preserve_root_logger():
    """MCPServer.__init__ unconditionally calls the SDK's configure_logging(),
    which logging.basicConfig()s a RichHandler onto the ROOT logger at INFO
    -- a global side effect that would hijack the whole backend's logging
    (every library's INFO chatter, rich-formatted, on stderr). Wrap every
    MCPServer construction in this so building an MCP server changes MCP
    state and nothing else. (PR #276 review: the first version of
    toolset_fingerprint built an unguarded server on the first anonymous
    GET /api/version and flipped production logging to INFO.)"""
    root = logging.getLogger()
    prev_handlers = root.handlers[:]
    prev_level = root.level
    try:
        yield
    finally:
        root.handlers[:] = prev_handlers
        root.setLevel(prev_level)


async def toolset_fingerprint() -> str:
    """SHA-256 over the toolset the shared /mcp server serves -- every
    field of every tool definition (name, description, input/output
    schema, annotations, ...), sorted -- so a client, or a human debugging
    one, can tell in one request whether the surface it cached is the one
    this process serves (CHT-1364). Exposed as `mcp_toolset_fingerprint`
    on /api/version, primed at startup, cached for the process: the
    toolset is fixed at import. It hashes what `/mcp` serves, `team`
    parameters included, so it is NOT the hash of the stdio snapshot in
    docs/mcp-toolset-schema.json.

    Why this rather than `notifications/tools/list_changed`: the toolset
    only changes when the process restarts, and this transport is
    deliberately stateless (asgi.py), so a restart is invisible to a
    connected client -- its requests keep succeeding against the new
    server while it advertises the old tools. Nothing can push the update;
    the fingerprint is how anyone can see that a client should reconnect.
    """
    global _fingerprint
    if _fingerprint is None:
        # asgi imports this module for ALL_TOOLS; bind late to use the ONE
        # shared server rather than building a second one per process.
        from app.mcp_server.asgi import get_fastmcp

        tools = await get_fastmcp().list_tools()
        surface = {t.name: t.model_dump(mode="json", exclude_none=True) for t in tools}
        _fingerprint = hashlib.sha256(
            json.dumps(surface, sort_keys=True, separators=(",", ":")).encode()
        ).hexdigest()
    return _fingerprint


def build_server() -> MCPServer:
    """Construct a standalone MCPServer instance with all tools registered.

    Used by tests (toolset-shape assertions) and by anything else that
    wants a throwaway server without touching the shared one behind
    /mcp (``asgi.get_fastmcp()``).
    """
    with preserve_root_logger():
        mcp = MCPServer(
            name="chaotic",
            instructions=(
                'Tools for the Chaotic issue tracker, scoped to the API key '
                'used to authenticate this connection. If a call reports '
                'multiple accessible teams/projects, pass `team` and/or '
                '`project` explicitly to disambiguate. Every tool returns a '
                'JSON object; failures come back as {"error": {"message": "...", '
                '"error_code": "..."}} rather than a protocol error -- switch on '
                'error_code, read message.'
            ),
        )
    for tool_fn in ALL_TOOLS:
        mcp.add_tool(tool_fn)
    return mcp
