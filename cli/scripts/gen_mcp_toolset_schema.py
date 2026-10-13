#!/usr/bin/env python3
"""Regenerate docs/mcp-toolset-schema.json from the stdio MCP server's live
toolset (cli.mcp_server.build_server()).

Since CHT-1374 both servers register the ONE toolset in chaotic_mcp_tools,
so this snapshot is a regression artifact of that package: the stdio
server exposes it as-is (cli/tests/test_mcp_toolset_sync.py asserts an
exact match), the backend's HTTP server exposes it plus the optional
`team` parameter on the team-scoped tools (backend/tests/
test_mcp_toolset_sync.py asserts exactly that). Run this and commit the
diff whenever a tool's name, description, or parameters legitimately
change:

    cd cli && uv run python scripts/gen_mcp_toolset_schema.py > ../docs/mcp-toolset-schema.json

Do NOT hand-edit docs/mcp-toolset-schema.json.
"""
import asyncio
import json

from chaotic_mcp_tools import RESPONSE_SHAPES, TEAM_SCOPED_TOOLS
from cli.mcp_server import build_server


async def _main() -> None:
    mcp = build_server()
    tools = await mcp.list_tools()
    out = {
        "_meta": {
            "generated_from": "cli.mcp_server.build_server() -- the shared chaotic_mcp_tools toolset bound to RestBackend (CHT-1247/CHT-1374)",
            "purpose": (
                "Canonical MCP toolset shape. Both transports -- the stdio server "
                "(cli/src/cli/mcp_server.py) and the backend Streamable HTTP server "
                "(backend/app/mcp_server/tools.py) -- register the one toolset defined "
                "in chaotic_mcp_tools (CHT-1374). cli/tests/test_mcp_toolset_sync.py "
                "asserts the stdio toolset matches this file exactly; "
                "backend/tests/test_mcp_toolset_sync.py asserts the HTTP toolset matches "
                "it plus exactly one optional 'team' parameter on each tool listed in "
                "team_scoped_tools. Regenerate with cli/scripts/gen_mcp_toolset_schema.py "
                "if a tool legitimately changes shape."
            ),
            # The tools whose HTTP schema carries the additive `team` parameter
            # (derived from the shared bodies' signatures).
            "team_scoped_tools": sorted(TEAM_SCOPED_TOOLS),
            # What a compact list row contains, and the preview/cap sizes
            # (CHT-1370). Both transports assert their live constants
            # against this, the same way they assert tool schemas.
            "response_shapes": RESPONSE_SHAPES,
        },
        "tools": {},
    }
    for tool in tools:
        out["tools"][tool.name] = {
            "description": tool.description,
            "inputSchema": tool.input_schema,
        }
    print(json.dumps(out, indent=2, sort_keys=True))


if __name__ == "__main__":
    asyncio.run(_main())
