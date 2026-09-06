"""The one reviewed list of what the toolset is (CHT-1394).

Every tool name, and whether it takes the HTTP-only `team` parameter.
Adding a tool is one edit here; the four tests that used to each carry
their own copy of this list (backend sync, backend endpoint, cli sync, cli
curated toolset) compare against it through `toolset_diff`, and say which
tool is missing or unexpected on which transport instead of dumping two
sets. ALL_TOOLS and TEAM_SCOPED_TOOLS are derived from the bodies; this
table is the intent they are checked against, so a tool that lands on one
transport and not the other, or grows a `team` parameter unreviewed,
fails by name.
"""
from __future__ import annotations

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


def toolset_diff(actual: set[str] | frozenset[str], where: str, expected: set[str] | frozenset[str] | None = None) -> str:
    """Empty when `actual` is exactly the expected set; otherwise a message
    naming what is missing from and what is unexpected on `where`."""
    expected = set(EXPECTED_TOOLS) if expected is None else set(expected)
    missing = sorted(expected - set(actual))
    unexpected = sorted(set(actual) - expected)
    parts = []
    if missing:
        parts.append(f"missing on {where}: {missing}")
    if unexpected:
        parts.append(f"unexpected on {where}: {unexpected}")
    return "; ".join(parts) + (" (edit chaotic_mcp_tools/expected.py if the change is intended)" if parts else "")
