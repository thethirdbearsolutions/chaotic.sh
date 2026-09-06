"""The 33 tool bodies, grouped by subject. Each is
``async def name(backend: Backend, ...params) -> dict`` and is registered
through ``registry.bind`` -- never directly.

Toolset (curated for quality over coverage -- see CHT-1247):
    issues:    issue_list, issue_view, issue_create, issue_update,
               issue_comment, issue_start, issue_ready, issue_relations,
               issue_block, issue_unblock, issue_label
    docs:      doc_list, doc_view, doc_create, doc_update, doc_link,
               doc_unlink
    sprints:   sprint_current, sprint_list, sprint_close,
               sprint_transactions, sprint_add, sprint_remove
    rituals:   ritual_pending, ritual_list, ritual_attest,
               ritual_complete
    inbox:     inbox_list, inbox_mark_read, inbox_mark_all_read
    other:     label_list, activity_recent, project_list

The sprint and ritual groups exist because governance state can BLOCK
the rest of this surface: arrears stops ticket transitions project-wide
and limbo stops a sprint rotating, and an agent that can't see or clear
either is simply stuck (CHT-1332/CHT-1333).

Deliberately NOT included: any delete tool (issue/doc/comment).
Destructive operations need a human in the loop; a future ticket can
add them behind an opt-in flag if that's ever warranted.

Two deliberate deviations from the CLI's own defaults, both aimed at an
LLM caller rather than a human at a terminal:
  * `issue_list`'s CLI default sort is `random` (a human browsing UX
    choice). An agent calling the same tool twice expects the same
    answer, so this surface defaults to `updated`/`desc` instead.
  * Filter parameters the CLI spells as comma-joined strings
    (`--status a,b`) are plain JSON arrays here (`status: ["a", "b"]`)
    -- structured input is the whole point of a typed MCP schema.
"""
from __future__ import annotations

from .docs import doc_create, doc_link, doc_list, doc_unlink, doc_update, doc_view
from .inbox import inbox_list, inbox_mark_all_read, inbox_mark_read
from .issues import (
    issue_block,
    issue_comment,
    issue_create,
    issue_label,
    issue_list,
    issue_ready,
    issue_relations,
    issue_start,
    issue_unblock,
    issue_update,
    issue_view,
    label_list,
)
from .misc import activity_recent, project_list
from .rituals import ritual_attest, ritual_complete, ritual_list, ritual_pending
from .sprints import (
    sprint_add,
    sprint_close,
    sprint_current,
    sprint_list,
    sprint_remove,
    sprint_transactions,
)

ALL_TOOLS = (
    issue_list, issue_view, issue_create, issue_update, issue_comment, issue_start,
    issue_ready, issue_relations, issue_block, issue_unblock,
    label_list, issue_label,
    doc_link, doc_unlink,
    sprint_current, sprint_list, sprint_close, sprint_transactions,
    sprint_add, sprint_remove,
    ritual_pending, ritual_list, ritual_attest, ritual_complete,
    inbox_list, inbox_mark_read, inbox_mark_all_read,
    doc_list, doc_view, doc_create, doc_update, activity_recent, project_list,
)

__all__ = ["ALL_TOOLS"] + [t.__name__ for t in ALL_TOOLS]
