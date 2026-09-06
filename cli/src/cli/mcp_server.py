"""`chaotic mcp` — MCP (Model Context Protocol) server over stdio.

Exposes the shared chaotic toolset (``chaotic_mcp_tools``, CHT-1374) to
any MCP-speaking harness (Claude Code, etc.) as native tools, without
shelling out to the CLI. The tool bodies live in that package and are
identical to the ones the backend's ``/mcp`` HTTP endpoint serves; what
this module contributes is the ``Backend`` they run against --
``RestBackend`` (``cli/src/cli/mcp_backend.py``), which calls the REST API
through ``cli.client.Client`` and takes team/project context from the
local CLI profile. There is no MCP-specific auth or session state.

Every tool below is a plain module attribute (``issue_view``,
``sprint_close``, ...) so tests and anything else can ``await`` e.g.
``issue_view(identifier=...)`` directly against a mocked Client, same as
every other cli.commands.* handler; ``build_server()`` registers the same
objects onto an ``MCPServer`` via ``add_tool()``.
"""
from __future__ import annotations

from mcp.server.mcpserver import MCPServer

from chaotic_mcp_tools import (  # noqa: F401 - re-exported for tests and the schema generator
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

from .mcp_backend import RestBackend

BACKEND = RestBackend()

# The shared bodies bound to this server's backend. Bound once at import:
# the backend is stateless (it late-binds to cli.main on every call).
ALL_TOOLS = tuple(bind_all(BACKEND))

# Expose each bound tool as a module attribute (`cli.mcp_server.issue_view`)
# -- the call shape every test and the CLI's own docs use.
for _tool in ALL_TOOLS:
    globals()[_tool.__name__] = _tool
del _tool

__all__ = ["ALL_TOOLS", "BACKEND", "build_server", "serve", *[t.__name__ for t in ALL_TOOLS]]


def build_server() -> MCPServer:
    """Construct the MCPServer with all tools registered.

    Kept separate from ``serve()`` so tests (and the in-memory MCP
    client harness) can build a server instance without going through
    stdio or Click.
    """
    mcp = MCPServer(
        name="chaotic",
        instructions=(
            "Tools for the Chaotic issue tracker. Auth and team/project "
            "context are inherited from the local chaotic CLI config "
            "(whatever `chaotic status` reports) -- there is no separate "
            "login step. Every tool returns a JSON object; failures come "
            "back as {\"error\": {\"message\": \"...\", \"error_code\": \"...\"}} "
            "rather than a protocol error -- switch on error_code, read message."
        ),
    )
    for tool_fn in ALL_TOOLS:
        mcp.add_tool(tool_fn)
    return mcp


def serve() -> None:
    """Entry point for `chaotic mcp`: build the server and run it over stdio."""
    build_server().run(transport="stdio")
