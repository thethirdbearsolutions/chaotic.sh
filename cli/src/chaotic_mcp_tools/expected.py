"""The one reviewed list of what the toolset is (CHT-1394).

Every tool name, and whether it takes the HTTP-only `team` parameter.
Adding a tool is one edit here; the tests that used to each carry their
own copy of this list (backend sync, backend endpoint, cli sync, cli
curated toolset, and the team-scoped count in the shared-tools suite)
compare against it through `toolset_diff`, and say which tool is missing
or unexpected on which transport instead of dumping two sets. ALL_TOOLS
and TEAM_SCOPED_TOOLS are derived from the bodies; this table is the
intent they are checked against, so a tool that lands on one transport
and not the other, or grows a `team` parameter unreviewed, fails by name.

This module is test support that lives in the package on purpose: the
backend suite imports it too and cannot reach `cli/tests`. It therefore
ships in the `chaotic-cli` wheel; that is accepted, not an oversight.
"""
from __future__ import annotations

from collections.abc import Iterable

EXPECTED_TOOLS: dict[str, bool] = {
    # name: takes `team`
    "activity_recent": True,
    "doc_create": True,
    "doc_link": False,
    "doc_list": True,
    "doc_revision": False,
    "doc_revisions": False,
    "doc_unlink": False,
    "doc_update": True,
    "doc_view": False,
    "inbox_list": True,
    "inbox_mark_all_read": True,
    "inbox_mark_read": False,
    "issue_block": False,
    "issue_comment": False,
    "issue_create": True,
    "issue_label": False,
    "issue_list": True,
    "issue_ready": True,
    "issue_relations": False,
    "issue_revision": False,
    "issue_revisions": False,
    "issue_start": False,
    "issue_unblock": False,
    "issue_update": False,
    "issue_view": False,
    "label_list": True,
    "project_list": True,
    "ritual_attest": True,
    "ritual_complete": True,
    "ritual_list": True,
    "ritual_pending": True,
    "sprint_add": True,
    "sprint_close": True,
    "sprint_current": True,
    "sprint_list": True,
    "sprint_remove": False,
    "sprint_transactions": True,
}

EXPECTED_TEAM_SCOPED: frozenset[str] = frozenset(n for n, takes_team in EXPECTED_TOOLS.items() if takes_team)

EDIT_THE_PIN = "edit chaotic_mcp_tools/expected.py if the change is intended"
REGENERATE_SNAPSHOT = (
    "regenerate with `cd cli && uv run python scripts/gen_mcp_toolset_schema.py "
    "> ../docs/mcp-toolset-schema.json` if the toolset change is intended"
)


def toolset_diff(
    actual: Iterable[str],
    where: str,
    expected: Iterable[str] | None = None,
    hint: str = EDIT_THE_PIN,
) -> str:
    """Empty when `actual` is exactly the expected set of names; otherwise a
    message naming what is missing from, unexpected on, or duplicated on
    `where`, followed by `hint` -- which should say what to do about it on
    that side (the default assumes the pin is what is wrong; a snapshot or
    a server caller passes its own)."""
    names = list(actual)
    expected_set = set(EXPECTED_TOOLS) if expected is None else set(expected)
    missing = sorted(expected_set - set(names))
    unexpected = sorted(set(names) - expected_set)
    duplicated = sorted({n for n in names if names.count(n) > 1})
    parts = []
    if missing:
        parts.append(f"missing on {where}: {missing}")
    if unexpected:
        parts.append(f"unexpected on {where}: {unexpected}")
    if duplicated:
        parts.append(f"duplicated on {where}: {duplicated}")
    return "; ".join(parts) + (f" ({hint})" if parts else "")
