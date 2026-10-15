"""Issue-query helpers shared by the CLI and both MCP servers (CHT-1718).

The server owns the query language (parsing, validation, running it:
backend ``app/services/issue_query.py``; reference: docs/issue-query.md).
What lives here is only the translation of the *plain* list filters --
``--status``, ``--exclude-label``, MCP ``status=[...]`` and so on -- into
rows of the query structure, so that a ``where`` query can be ANDed with
them and every flag keeps exactly the meaning it has without ``where``.
"""
from __future__ import annotations


def _row(field: str, op: str, values=()) -> dict:
    return {"field": field, "op": op, "values": list(values)}


def simple_filter_rows(
    *,
    statuses=None,
    priorities=None,
    assignee_id: str | None = None,
    label: str | None = None,
    labels_all=None,
    search: str | None = None,
    sprint_id: str | None = None,
    no_sprint: bool = False,
    parent_id: str | None = None,
    exclude_statuses=None,
    exclude_priorities=None,
    exclude_issue_types=None,
    exclude_assignee_ids=None,
    exclude_labels=None,
) -> list[dict]:
    """Query rows equivalent to the plain list filters.

    Values are already resolved ids/wire values, as the list endpoint
    takes them. ``exclude_assignee_ids`` may contain ``"unassigned"``,
    meaning "has an assignee", as ``GET /issues`` reads it.
    """
    rows = []
    if statuses:
        rows.append(_row("status", "is", statuses))
    if priorities:
        rows.append(_row("priority", "is", priorities))
    if assignee_id:
        rows.append(_row("assignee", "is", [assignee_id]))
    if label:
        rows.append(_row("label", "is", [label]))
    if labels_all:
        rows.append(_row("label", "all", labels_all))
    if search:
        rows.append(_row("text", "contains", [search]))
    if no_sprint:
        rows.append(_row("sprint", "empty"))
    elif sprint_id:
        rows.append(_row("sprint", "is", [sprint_id]))
    if parent_id:
        rows.append(_row("parent", "is", [parent_id]))
    if exclude_statuses:
        rows.append(_row("status", "is_not", exclude_statuses))
    if exclude_priorities:
        rows.append(_row("priority", "is_not", exclude_priorities))
    if exclude_issue_types:
        rows.append(_row("type", "is_not", exclude_issue_types))
    if exclude_assignee_ids:
        ids = [a for a in exclude_assignee_ids if a != "unassigned"]
        if ids:
            rows.append(_row("assignee", "is_not", ids))
        if "unassigned" in exclude_assignee_ids:
            rows.append(_row("assignee", "not_empty"))
    if exclude_labels:
        rows.append(_row("label", "is_not", exclude_labels))
    return rows
