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


def build_server() -> MCPServer:
    """Construct a standalone MCPServer instance with all tools registered.

    Used by tests (toolset-shape assertions) and by anything else that
    wants a throwaway server without touching the shared one behind
    /mcp (``asgi.get_fastmcp()``).
    """
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
