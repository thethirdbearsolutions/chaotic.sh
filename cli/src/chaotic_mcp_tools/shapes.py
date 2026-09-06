"""Response shapes (CHT-1370): what a compact list row contains, the
preview/cap sizes, and the helpers that apply them.

List tools return a COMPACT projection of each row by default. The full
response schema is what a row IS (ADR-0005); a list is what a model needs
to SEE to pick the next call, and those differ: ``issue_list`` at
limit=200 was ~500 KB of descriptions and UUIDs. ``detail=true`` opts
back into full rows. ``RESPONSE_SHAPES`` is the contract for that
projection -- cli/scripts/gen_mcp_toolset_schema.py writes it into
docs/mcp-toolset-schema.json under ``_meta.response_shapes`` and the
snapshot test asserts the live copy matches. Since CHT-1374 there is one
copy, used by both transports.
"""
from __future__ import annotations

COMPACT_ISSUE_FIELDS = (
    "identifier", "title", "status", "priority", "issue_type", "estimate",
    "assignee_name", "sprint_name", "parent_identifier", "labels", "updated_at",
)
COMPACT_DOCUMENT_FIELDS = (
    "id", "title", "icon", "project_id", "sprint_id", "author_name", "labels", "updated_at",
)
COMPACT_PROJECT_FIELDS = (
    "id", "key", "name", "description", "issue_count", "estimate_scale",
    "unestimated_handling", "default_sprint_budget", "require_estimate_on_claim",
    "human_rituals_required",
)
# Long free text in list/feed rows is cut to this many chars with an
# explicit `...(+N chars)` marker: project descriptions in project_list,
# old_value/new_value in activity_recent (an issue-description edit
# otherwise ships two full bodies per row).
TEXT_PREVIEW_CHARS = 200
# issue_view returns the newest N comments plus `comment_count`.
ISSUE_VIEW_COMMENT_CAP = 20
# issue_view fetches comments/sub-issues with this limit so the counts it
# reports are real: the REST defaults are 100, oldest-first, which would
# make "newest 20 of comment_count" silently wrong past 100 comments.
ISSUE_VIEW_FETCH_LIMIT = 10_000
# issue_list sort keys the service orders in Python AFTER a SQL
# `LIMIT ... ORDER BY created_at DESC` (IssueService._SORT_PYTHON_KEYS).
# Over-fetching limit+1 for these would let the re-sort drop the wrong
# row, so the truncation probe is a second query at offset=limit instead.
OFFSET_PROBE_SORT_KEYS = ("priority", "status")

RESPONSE_SHAPES = {
    "compact_issue_fields": list(COMPACT_ISSUE_FIELDS),
    "compact_document_fields": list(COMPACT_DOCUMENT_FIELDS),
    "compact_project_fields": list(COMPACT_PROJECT_FIELDS),
    "text_preview_chars": TEXT_PREVIEW_CHARS,
    "issue_view_comment_cap": ISSUE_VIEW_COMMENT_CAP,
    "issue_view_fetch_limit": ISSUE_VIEW_FETCH_LIMIT,
    "offset_probe_sort_keys": list(OFFSET_PROBE_SORT_KEYS),
    # Every failure is {"error": {...}} with at least these keys (CHT-1350).
    "error_envelope": {"always": ["message"], "when_known": ["error_code", "http_status"]},
}


def _fields_prose(fields) -> str:
    return ", ".join("labels (names)" if f == "labels" else f for f in fields)


# Built from the tuples so the prose cannot drift from the projection.
DETAIL_ISSUE_DESC = (
    "Return every field of each issue (including description) instead of the "
    f"compact row. Compact rows carry: {_fields_prose(COMPACT_ISSUE_FIELDS)}. "
    "Use issue_view for one issue's full detail."
)
DETAIL_DOC_DESC = (
    "Return every field of each document (including content) instead of the "
    f"compact row. Compact rows carry: {_fields_prose(COMPACT_DOCUMENT_FIELDS)}. "
    "Use doc_view for one document."
)
DETAIL_PROJECT_DESC = (
    "Return every field of each project instead of the compact row. Compact rows "
    f"carry: {_fields_prose(COMPACT_PROJECT_FIELDS)} (description is a "
    f"{TEXT_PREVIEW_CHARS}-char preview)."
)


def preview(text, limit: int = TEXT_PREVIEW_CHARS):
    """Cut long free text to `limit` chars with a marker that says how much
    was dropped, so a model knows to fetch the full record if it matters."""
    if not isinstance(text, str) or len(text) <= limit:
        return text
    return f"{text[:limit]}...(+{len(text) - limit} chars)"


# When a compact field is a resolved name the row does not carry at all
# (a backend older than CHT-1371 behind the stdio server), fall back to
# the UUID rather than silently reporting "unassigned/unparented".
_COMPACT_FALLBACKS = {
    "assignee_name": "assignee_id",
    "sprint_name": "sprint_id",
    "parent_identifier": "parent_id",
}


def compact(row: dict, fields) -> dict:
    """Project a full response-schema row down to `fields`. Labels become
    their names; a `description` becomes a preview."""
    out = {}
    for key in fields:
        if key not in row and key in _COMPACT_FALLBACKS:
            value = row.get(_COMPACT_FALLBACKS[key])
        else:
            value = row.get(key)
        if key == "labels" and isinstance(value, list):
            value = [lab["name"] if isinstance(lab, dict) else lab for lab in value]
        elif key == "description":
            value = preview(value)
        out[key] = value
    return out


def listing(key: str, rows, limit: int, fields, detail: bool) -> dict:
    """Standard list envelope: `{key: rows, count, truncated}`.

    Callers fetch `limit + 1` rows; the extra one is how `truncated` is
    known without a COUNT query. A model that sees truncated=true should
    narrow its filter rather than assume it saw everything.
    """
    rows = list(rows or [])
    page = rows[:limit]
    items = page if detail else [compact(r, fields) for r in page]
    return {key: items, "count": len(items), "truncated": len(rows) > limit}


def with_budget_state(sprint: dict) -> dict:
    """Annotate a sprint with its derived budget state.

    ``budget``/``points_spent`` are stored; "am I in arrears" is not --
    it's the comparison between them, and it's the thing that decides
    whether issue_update can move a ticket to in_progress/done/canceled
    at all. An agent that has to derive that itself will usually not
    think to, so spell it out.
    """
    budget = sprint.get("budget")
    spent = sprint.get("points_spent") or 0
    over = (spent - budget) if budget is not None else 0
    sprint = dict(sprint)
    sprint["in_arrears"] = over > 0
    sprint["arrears_by"] = max(over, 0)
    sprint["points_remaining"] = None if budget is None else budget - spent
    return sprint
