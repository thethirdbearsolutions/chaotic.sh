"""Cross-package toolset-sync guard (CHT-1266).

The backend's Streamable HTTP MCP transport (backend/app/mcp_server/) is a
separate package from this stdio one and can't import cli.mcp_server
directly (see that module's docstring for why: it'd have to loop back
over HTTP into itself). Instead both sides assert their live toolset
against the same checked-in snapshot, docs/mcp-toolset-schema.json --
this is the stdio half of that guard. See
backend/tests/test_mcp_toolset_sync.py for the HTTP half, which allows
the documented additive ``team`` parameter on the team-scoped tools
(``_ADDITIVE_TEAM_TOOLS`` there); this file
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
        return {t.name: {"description": t.description, "inputSchema": t.input_schema} for t in tools}

    return asyncio.run(_collect())


def test_every_tool_is_async_or_sync_by_design():
    """mcp 2.x runs `def` tool handlers on worker threads (no event-loop
    affinity). The stdio server's tools are deliberately synchronous --
    they call the blocking httpx client -- so pin that they ALL are, and
    that none touches asyncio. A mixed set would silently change which
    thread a tool runs on (CHT-1367)."""
    import inspect
    from cli.mcp_server import ALL_TOOLS
    mixed = [t.__name__ for t in ALL_TOOLS if inspect.iscoroutinefunction(getattr(t, "__wrapped__", t))]
    assert mixed == [], f"stdio tools must be plain `def` (they block on httpx): {mixed}"


def test_snapshot_file_exists():
    assert _SCHEMA_PATH.exists(), (
        f"{_SCHEMA_PATH} is missing -- regenerate with "
        "cli/scripts/gen_mcp_toolset_schema.py"
    )


def test_response_shapes_match_snapshot():
    """The compact-row projection and preview sizes (CHT-1370) are part of
    the cross-transport contract: the backend asserts the same thing
    against the same file, so a change here that isn't regenerated into
    the snapshot fails on both sides."""
    from cli.mcp_server import RESPONSE_SHAPES
    snapshot = json.loads(_SCHEMA_PATH.read_text())["_meta"]["response_shapes"]
    assert RESPONSE_SHAPES == snapshot, (
        "cli.mcp_server.RESPONSE_SHAPES no longer matches docs/mcp-toolset-schema.json "
        "-- regenerate with scripts/gen_mcp_toolset_schema.py"
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


def test_snapshot_covers_the_full_toolset():
    snapshot = json.loads(_SCHEMA_PATH.read_text())["tools"]
    assert set(snapshot.keys()) == {
        "activity_recent", "doc_create", "doc_link", "doc_list",
        "doc_unlink", "doc_update", "doc_view", "issue_block",
        "issue_comment", "issue_create", "issue_label", "issue_list",
        "issue_ready", "issue_relations", "issue_start", "issue_unblock",
        "issue_update", "issue_view", "label_list", "project_list",
        "ritual_attest", "ritual_complete", "ritual_list",
        "ritual_pending", "sprint_add", "sprint_close", "sprint_current",
        "sprint_list", "sprint_remove", "sprint_transactions",
    }
