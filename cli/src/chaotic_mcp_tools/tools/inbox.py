"""Inbox tools (CHT-1338): the mailbox the system keeps for the calling
identity -- @mentions in comments, assignments, GATE rituals waiting on an
admin, REVIEW attestations waiting for approval. Agents are users here, so
a human mentioning an agent in a comment writes to a mailbox that, before
these tools, the agent's own surface could not open."""
from __future__ import annotations

from typing import Annotated

from pydantic import Field

from ..backend import Backend
from ..constants import TEAM_FIELD_DESC
from ..shapes import COMPACT_INBOX_FIELDS, listing


async def inbox_list(
    backend: Backend,
    unread: Annotated[bool, Field(description="Only entries not yet marked read.")] = False,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
    limit: Annotated[int, Field(description="Maximum number of entries to return.", ge=1, le=200)] = 20,
    detail: Annotated[
        bool,
        Field(description="Return full inbox rows (every field) instead of the compact projection.")
    ] = False,
) -> dict:
    """List the calling identity's inbox: what is waiting on YOU, newest first.

    This is the human-to-agent handoff channel: an @mention of you in a
    comment, an assignment, a GATE ritual an admin must complete, a
    REVIEW attestation awaiting approval. Check it when you start work
    and between tasks; nothing else on this surface delivers it. Rows
    carry `kind`, a `title`, and the issue identifier / document title
    they point at; `read_at` is null until inbox_mark_read.
    """
    team_id = await backend.resolve_team(team)
    rows = await backend.list_inbox(team_id, unread=unread, limit=limit + 1)
    result = listing("entries", rows, limit, COMPACT_INBOX_FIELDS, detail)
    result["unread_only"] = unread
    return result


async def inbox_mark_read(
    backend: Backend,
    entry_id: Annotated[str, Field(description="Inbox entry id, from inbox_list.")],
) -> dict:
    """Mark one inbox entry as read. Returns the updated entry."""
    return await backend.mark_inbox_read(entry_id)


async def inbox_mark_all_read(
    backend: Backend,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """Mark every unread inbox entry for the calling identity as read.

    Returns `marked_count`. Read the entries first (inbox_list) -- this
    is how you acknowledge them, not how you find out what they said.
    """
    team_id = await backend.resolve_team(team)
    return await backend.mark_all_inbox_read(team_id)
