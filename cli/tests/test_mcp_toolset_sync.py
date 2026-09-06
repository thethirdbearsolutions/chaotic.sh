"""Cross-package toolset-sync guard (CHT-1266).

The backend's Streamable HTTP MCP transport (backend/app/mcp_server/) is a
separate package from this stdio one and can't import cli.mcp_server
directly (see that module's docstring for why: it'd have to loop back
over HTTP into itself). Instead both sides assert their live toolset
against the same checked-in snapshot, docs/mcp-toolset-schema.json --
this is the stdio half of that guard. See
backend/tests/test_mcp_toolset_sync.py for the HTTP half, which allows
the documented additive ``team`` parameter on the team-scoped tools
(``EXPECTED_TEAM_SCOPED`` in chaotic_mcp_tools/expected.py); this file
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

import pytest
import re
from pathlib import Path

from chaotic_mcp_tools.expected import EXPECTED_TEAM_SCOPED, REGENERATE_SNAPSHOT, toolset_diff
from cli.mcp_server import build_server

_SCHEMA_PATH = Path(__file__).resolve().parents[2] / "docs" / "mcp-toolset-schema.json"


def _live_toolset() -> dict:
    async def _collect():
        mcp = build_server()
        tools = await mcp.list_tools()
        return {t.name: {"description": t.description, "inputSchema": t.input_schema} for t in tools}

    return asyncio.run(_collect())


def test_every_tool_is_async():
    """mcp 2.x runs `def` tool handlers on worker threads (no event-loop
    affinity) and `async def` ones on the loop. Since CHT-1374 every tool
    is a shared coroutine body bound to this server's RestBackend (which
    offloads the blocking httpx client itself), so pin that the objects
    handed to add_tool are ALL coroutine functions, and that the wrapper
    agrees with the body it wraps (CHT-1367)."""
    import inspect
    from cli.mcp_server import ALL_TOOLS
    sync = [t.__name__ for t in ALL_TOOLS if not inspect.iscoroutinefunction(t)]
    assert sync == [], f"stdio tools must be `async def`: {sync}"
    disagree = [
        t.__name__ for t in ALL_TOOLS
        if hasattr(t, "__wrapped__")
        and inspect.iscoroutinefunction(t) != inspect.iscoroutinefunction(t.__wrapped__)
    ]
    assert disagree == [], f"wrapper/body async-ness disagree: {disagree}"


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
    problem = toolset_diff(
        set(snapshot), "the schema snapshot (docs/mcp-toolset-schema.json)", hint=REGENERATE_SNAPSHOT
    )
    assert not problem, problem


def test_snapshot_team_scoped_list_is_the_reviewed_one():
    """`_meta.team_scoped_tools` is the published list of which tools take
    `team` on the HTTP transport (docs/agents.md points readers at it).
    The stdio schemas never carry `team`, so nothing else in this file
    would notice it going stale: pin it to the reviewed table directly."""
    meta = json.loads(_SCHEMA_PATH.read_text())["_meta"]
    problem = toolset_diff(
        meta["team_scoped_tools"], "_meta.team_scoped_tools", expected=EXPECTED_TEAM_SCOPED, hint=REGENERATE_SNAPSHOT
    )
    assert not problem, problem


_REPO = _SCHEMA_PATH.parents[1]


def _snapshot_tool_names() -> set[str]:
    return set(json.loads(_SCHEMA_PATH.read_text())["tools"])


def test_agents_doc_toolset_section_names_every_tool():
    """docs/agents.md's "### Toolset" section said "Eleven tools" and listed a
    stale subset for months after the surface grew to 30 (CHT-1378). Pin
    it to the snapshot: the count it states and every tool it must name."""
    text = (_REPO / "docs" / "agents.md").read_text()
    section = text.split("### Toolset\n", 1)[1].split("\n## ", 1)[0]
    names = _snapshot_tool_names()

    # No literal count: it rotted once ("Eleven" at 34) and its only job
    # was to be kept in step with this test (CHT-1395).
    assert not re.search(r"\b\d+ tools\b", section), "docs/agents.md § Toolset states a tool count; drop it"

    # Only the grouped bullet list counts: prose elsewhere in the section
    # already mentions a dozen tools, so a name dropped from its group must
    # not be covered by a later paragraph (PR #278 review).
    bullet_block = "\n".join(
        line for line in section.splitlines() if line.startswith("- **") or line.startswith("  ")
    )
    listed = set(re.findall(r"`([a-z_]+)`", bullet_block))
    assert listed == names, (
        f"docs/agents.md § Toolset groups: missing {sorted(names - listed)}, unknown {sorted(listed - names)}"
    )


def _tool_table_generator():
    import importlib.util

    path = _REPO / "cli" / "scripts" / "gen_mcp_tool_table.py"
    spec = importlib.util.spec_from_file_location("gen_mcp_tool_table", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_cli_readme_tools_table_is_the_generated_one():
    """cli/README.md § Tools is generated from ALL_TOOLS by
    scripts/gen_mcp_tool_table.py (CHT-1395); the block between its
    markers must be byte-for-byte what the generator renders now, so a
    tool added without rerunning it (or without a CLI_EQUIVALENTS entry)
    fails here by name."""
    gen = _tool_table_generator()
    text = (_REPO / "cli" / "README.md").read_text()
    start = text.index(gen.START)
    end = text.index(gen.END, start) + len(gen.END)
    assert text[start:end] == gen.render_table(), (
        "cli/README.md tool table is stale -- regenerate with "
        "`cd cli && uv run python scripts/gen_mcp_tool_table.py --write`"
    )
    section = text.split("### Tools\n", 1)[1].split("\n## ", 1)[0]
    assert set(re.findall(r"^\| `([a-z_]+)` \|", section, re.M)) == _snapshot_tool_names()
    assert not re.search(r"\b\d+ tools\b", section), "cli/README.md § Tools states a tool count; drop it"


def test_tool_table_generator_refuses_an_unmapped_tool():
    """Forgetting the CLI_EQUIVALENTS entry for a new tool must fail loudly,
    naming the tool, not render a row with a blank column."""
    gen = _tool_table_generator()

    def newcomer():
        ...
    newcomer.__name__ = "issue_newcomer"

    with pytest.raises(SystemExit, match="no entry for \\['issue_newcomer'\\]"):
        gen.render_table(tools=(*gen.ALL_TOOLS, newcomer))
    with pytest.raises(SystemExit, match="unknown tools \\['gone_tool'\\]"):
        gen.render_table(equivalents={**gen.CLI_EQUIVALENTS, "gone_tool": "x"})
