#!/usr/bin/env python3
"""Regenerate docs/mcp-toolset-schema.json from the stdio MCP server's live
toolset (cli.mcp_server.build_server(), CHT-1247/#215).

This file is the cross-package sync anchor for CHT-1266: both
cli/tests/test_mcp_toolset_sync.py and backend/tests/test_mcp_toolset_sync.py
assert their respective live toolset against it, so drift between the two
transports (or an unintentional change to either) fails loud instead of
silently diverging. Run this and commit the diff whenever a stdio tool's
name, description, or parameters legitimately change:

    cd cli && uv run python scripts/gen_mcp_toolset_schema.py > ../docs/mcp-toolset-schema.json

Do NOT hand-edit docs/mcp-toolset-schema.json.
"""
import asyncio
import json

from cli.mcp_server import build_server


async def _main() -> None:
    mcp = build_server()
    tools = await mcp.list_tools()
    out = {
        "_meta": {
            "generated_from": "cli.mcp_server.build_server() (CHT-1247/#215)",
            "purpose": (
                "Canonical MCP toolset shape shared by the stdio transport "
                "(cli/src/cli/mcp_server.py) and the backend Streamable HTTP "
                "transport (backend/app/mcp_server/tools.py, CHT-1266). "
                "cli/tests/test_mcp_toolset_sync.py asserts the stdio toolset "
                "matches this file exactly; backend/tests/test_mcp_toolset_sync.py "
                "asserts the HTTP toolset matches it for name/description and "
                "shared parameters, allowing only the documented additive "
                "'team' parameter on issue_list/issue_create/doc_list/doc_create/"
                "activity_recent. Regenerate with cli/scripts/gen_mcp_toolset_schema.py "
                "if a stdio tool legitimately changes shape."
            ),
        },
        "tools": {},
    }
    for tool in tools:
        out["tools"][tool.name] = {
            "description": tool.description,
            "inputSchema": tool.inputSchema,
        }
    print(json.dumps(out, indent=2, sort_keys=True))


if __name__ == "__main__":
    asyncio.run(_main())
