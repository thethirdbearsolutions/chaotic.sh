"""Cross-package toolset-sync guard (CHT-1266).

The backend's Streamable HTTP MCP transport (backend/app/mcp_server/) is a
separate package from this stdio one and can't import cli.mcp_server
directly (see that module's docstring for why: it'd have to loop back
over HTTP into itself). Instead both sides assert their live toolset
against the same checked-in snapshot, docs/mcp-toolset-schema.json --
this is the stdio half of that guard. See
backend/tests/test_mcp_toolset_sync.py for the HTTP half, which allows
the documented additive ``team`` parameter on five tools; this file
requires an EXACT match, since the stdio toolset is the schema's source
of truth (docs/mcp-toolset-schema.json's own ``_meta.generated_from``
points at ``cli.mcp_server.build_server()``, and
``scripts/gen_mcp_toolset_schema.py`` regenerates it from exactly that).

If this test fails, either a stdio tool's name/description/schema
changed and the snapshot needs regenerating (see that script's
docstring), or something changed unintentionally -- fail loud rather
than let the two transports silently diverge.
"""
import asyncio
import json
from pathlib import Path

from cli.mcp_server import build_server

_SCHEMA_PATH = Path(__file__).resolve().parents[2] / "docs" / "mcp-toolset-schema.json"


def _live_toolset() -> dict:
    async def _collect():
        mcp = build_server()
        tools = await mcp.list_tools()
        return {t.name: {"description": t.description, "inputSchema": t.inputSchema} for t in tools}

    return asyncio.run(_collect())


def test_snapshot_file_exists():
    assert _SCHEMA_PATH.exists(), (
        f"{_SCHEMA_PATH} is missing -- regenerate with "
        "cli/scripts/gen_mcp_toolset_schema.py"
    )


def test_stdio_toolset_matches_snapshot_exactly():
    snapshot = json.loads(_SCHEMA_PATH.read_text())["tools"]
    live = _live_toolset()
    assert live == snapshot, (
        "cli.mcp_server's live toolset no longer matches "
        "docs/mcp-toolset-schema.json. If this is an intentional stdio "
        "tool change, regenerate the snapshot: "
        "cd cli && uv run python scripts/gen_mcp_toolset_schema.py > "
        "../docs/mcp-toolset-schema.json"
    )


def test_snapshot_covers_all_ten_tools():
    snapshot = json.loads(_SCHEMA_PATH.read_text())["tools"]
    assert set(snapshot.keys()) == {
        "issue_list", "issue_view", "issue_create", "issue_update",
        "issue_comment", "issue_start",
        "doc_list", "doc_view", "doc_create",
        "activity_recent",
    }
