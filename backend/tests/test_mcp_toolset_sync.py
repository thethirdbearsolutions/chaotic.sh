"""Cross-package toolset-sync guard (CHT-1266).

This backend package can't import cli.mcp_server directly (separate
package, and the stdio server's tool bodies call back over HTTP into
this same backend -- see app/mcp_server/tools.py's module docstring), so
both sides assert their live toolset against the same checked-in
snapshot instead: docs/mcp-toolset-schema.json, generated from the
stdio server (cli/scripts/gen_mcp_toolset_schema.py). See
cli/tests/test_mcp_toolset_sync.py for the stdio half, which requires an
exact match; this file is looser in exactly one documented way: five
tools (issue_list, issue_create, doc_list, doc_create, activity_recent)
carry an additional optional `team` parameter the stdio version doesn't
need (see tools.py's module docstring for why). Every other tool, and
every other parameter on those five, must match byte-for-byte -- if this
fails, either that list needs updating (a deliberate, reviewed schema
change) or the two transports have drifted apart unintentionally.
"""
import json
from pathlib import Path

import pytest

from app.mcp_server.tools import ALL_TOOLS, build_server

_SCHEMA_PATH = Path(__file__).resolve().parents[2] / "docs" / "mcp-toolset-schema.json"

# Tools whose schema must match the stdio server exactly.
_IDENTICAL_TOOLS = {"issue_view", "issue_update", "issue_comment", "issue_start", "doc_view"}
# Tools that legitimately gain one additional optional `team` parameter
# for HTTP's multi-team-per-API-key context resolution (scope.py).
_ADDITIVE_TEAM_TOOLS = {"issue_list", "issue_create", "doc_list", "doc_create", "activity_recent", "project_list"}


async def _live_toolset() -> dict:
    mcp = build_server()
    tools = await mcp.list_tools()
    return {t.name: {"description": t.description, "inputSchema": t.inputSchema} for t in tools}


@pytest.fixture
def snapshot() -> dict:
    assert _SCHEMA_PATH.exists(), (
        f"{_SCHEMA_PATH} is missing -- regenerate with cli/scripts/gen_mcp_toolset_schema.py"
    )
    return json.loads(_SCHEMA_PATH.read_text())["tools"]


def test_all_tools_registered():
    assert {fn.__name__ for fn in ALL_TOOLS} == _IDENTICAL_TOOLS | _ADDITIVE_TEAM_TOOLS


async def test_backend_covers_all_eleven_tools(snapshot):
    live = await _live_toolset()
    assert set(live.keys()) == set(snapshot.keys()) == _IDENTICAL_TOOLS | _ADDITIVE_TEAM_TOOLS


async def test_identical_tools_match_snapshot_exactly(snapshot):
    live = await _live_toolset()
    for name in _IDENTICAL_TOOLS:
        assert live[name] == snapshot[name], (
            f"'{name}' diverged from the stdio toolset (docs/mcp-toolset-schema.json) -- "
            "this tool isn't supposed to need any HTTP-only parameters."
        )


async def test_additive_team_tools_match_except_for_team_param(snapshot):
    live = await _live_toolset()
    for name in _ADDITIVE_TEAM_TOOLS:
        live_schema = live[name]
        snap_schema = snapshot[name]
        assert live_schema["description"] == snap_schema["description"], (
            f"'{name}' description diverged from the stdio toolset"
        )

        live_props = dict(live_schema["inputSchema"]["properties"])
        snap_props = dict(snap_schema["inputSchema"]["properties"])
        assert "team" in live_props, f"'{name}' is missing the documented additive `team` parameter"
        del live_props["team"]
        assert live_props == snap_props, (
            f"'{name}'s parameters (other than the additive `team`) diverged from the stdio toolset"
        )

        # `team` must stay optional -- the required-param list (aside from
        # `team` itself, which is never required) must match exactly.
        live_required = set(live_schema["inputSchema"].get("required") or []) - {"team"}
        snap_required = set(snap_schema["inputSchema"].get("required") or [])
        assert live_required == snap_required, f"'{name}' required-parameter list diverged from the stdio toolset"
