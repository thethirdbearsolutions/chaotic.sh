"""Toolset-sync guard, HTTP half (CHT-1266, collapsed by CHT-1374).

Both MCP servers register the ONE toolset in ``chaotic_mcp_tools``, so
"the two transports agree" is true by construction. What is left to pin
is that THIS server exposes that toolset -- against the checked-in
snapshot docs/mcp-toolset-schema.json (generated from the stdio server
by cli/scripts/gen_mcp_toolset_schema.py) -- and that the one documented
difference is exactly what ``registry.bind`` produces: the team-scoped
tools (``chaotic_mcp_tools.TEAM_SCOPED_TOOLS``, derived from the bodies)
gain one optional ``team`` parameter here because InProcessBackend
advertises ``Capabilities(team_param=True)``; nothing else differs.
"""
import json
from pathlib import Path

import pytest

from chaotic_mcp_tools import RESPONSE_SHAPES, TEAM_SCOPED_TOOLS

from app.mcp_server.tools import ALL_TOOLS, BACKEND, build_server

_SCHEMA_PATH = Path(__file__).resolve().parents[2] / "docs" / "mcp-toolset-schema.json"


async def _live_toolset() -> dict:
    mcp = build_server()
    tools = await mcp.list_tools()
    return {t.name: {"description": t.description, "inputSchema": t.input_schema} for t in tools}


@pytest.fixture
def snapshot() -> dict:
    assert _SCHEMA_PATH.exists(), (
        f"{_SCHEMA_PATH} is missing -- regenerate with cli/scripts/gen_mcp_toolset_schema.py"
    )
    return json.loads(_SCHEMA_PATH.read_text())["tools"]


def test_response_shapes_match_snapshot():
    """The compact-row projection and preview sizes (CHT-1370) are pinned in
    the snapshot's `_meta`; there is one copy in chaotic_mcp_tools and this
    server serves it."""
    snapshot = json.loads(_SCHEMA_PATH.read_text())["_meta"]["response_shapes"]
    assert RESPONSE_SHAPES == snapshot, (
        "chaotic_mcp_tools.RESPONSE_SHAPES diverged from docs/mcp-toolset-schema.json "
        "-- regenerate with cli/scripts/gen_mcp_toolset_schema.py"
    )


def test_backend_advertises_the_team_parameter():
    assert BACKEND.capabilities.team_param is True


def test_every_tool_is_async():
    """mcp 2.x runs `def` handlers on worker threads with no event-loop
    affinity; every tool here awaits the API layer, so a sync one would
    trip `asyncio.get_running_loop()` off-loop. Pin that the objects handed
    to add_tool are all coroutine functions and agree with the bodies they
    wrap (CHT-1367)."""
    import inspect
    sync = [t.__name__ for t in ALL_TOOLS if not inspect.iscoroutinefunction(t)]
    assert sync == [], f"backend tools must be `async def`: {sync}"
    disagree = [
        t.__name__ for t in ALL_TOOLS
        if hasattr(t, "__wrapped__")
        and inspect.iscoroutinefunction(t) != inspect.iscoroutinefunction(t.__wrapped__)
    ]
    assert disagree == [], f"wrapper/body async-ness disagree: {disagree}"


def test_team_scoped_set_is_the_documented_one():
    """The set is derived from the bodies; spell it out here so adding
    `team` to a tool (or dropping it) is a visible, reviewed change."""
    assert TEAM_SCOPED_TOOLS == {
        "issue_list", "issue_create", "issue_ready", "doc_list", "doc_create",
        "activity_recent", "project_list",
        "label_list",
        "sprint_current", "sprint_list", "sprint_close",
        "sprint_transactions", "sprint_add", "doc_update",
        "ritual_pending", "ritual_list", "ritual_attest", "ritual_complete",
        "inbox_list", "inbox_mark_all_read",
    }
    # And the ones that need no `team`: they key off a globally-unique issue
    # identifier, or resolve their team from the entity they were handed.
    assert {t.__name__ for t in ALL_TOOLS} - TEAM_SCOPED_TOOLS == {
        "issue_view", "issue_update", "issue_comment", "issue_start",
        "doc_view", "issue_relations", "issue_block", "issue_unblock",
        "issue_label", "doc_link", "doc_unlink", "sprint_remove",
        "inbox_mark_read",
    }


async def test_backend_covers_the_full_toolset(snapshot):
    live = await _live_toolset()
    assert set(live.keys()) == set(snapshot.keys()) == {t.__name__ for t in ALL_TOOLS}


async def test_non_team_tools_match_snapshot_exactly(snapshot):
    live = await _live_toolset()
    for name in set(live) - TEAM_SCOPED_TOOLS:
        assert live[name] == snapshot[name], (
            f"'{name}' diverged from the stdio toolset (docs/mcp-toolset-schema.json) -- "
            "this tool isn't supposed to need any HTTP-only parameters."
        )


async def test_team_tools_match_except_for_team_param(snapshot):
    live = await _live_toolset()
    for name in TEAM_SCOPED_TOOLS:
        live_schema = live[name]
        snap_schema = snapshot[name]
        assert live_schema["description"] == snap_schema["description"]

        live_props = dict(live_schema["inputSchema"]["properties"])
        snap_props = dict(snap_schema["inputSchema"]["properties"])
        assert "team" in live_props, f"'{name}' is missing the additive `team` parameter"
        assert "team" not in snap_props, f"the stdio snapshot must not carry `team` on '{name}'"
        del live_props["team"]
        assert live_props == snap_props, (
            f"'{name}'s parameters (other than the additive `team`) diverged from the stdio toolset"
        )

        # `team` must stay optional -- the required-param list must match.
        live_required = set(live_schema["inputSchema"].get("required") or []) - {"team"}
        snap_required = set(snap_schema["inputSchema"].get("required") or [])
        assert live_required == snap_required, f"'{name}' required-parameter list diverged"
