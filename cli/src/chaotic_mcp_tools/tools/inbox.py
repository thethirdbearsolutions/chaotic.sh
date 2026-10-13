"""Inbox tools (CHT-1338): the mailbox the system keeps for the calling
identity -- @mentions in comments, assignments, GATE rituals waiting on an
admin, REVIEW attestations waiting for approval. Agents are users here, so
a human mentioning an agent in a comment writes to a mailbox that, before
these tools, the agent's own surface could not open."""
from __future__ import annotations

from typing import Annotated

from pydantic import Field

from ..backend import Backend
from ..shapes import COMPACT_INBOX_FIELDS, listing


INBOX_TEAM_DESC = (
    "Team id, key, or name to restrict the inbox to. Omit for every team the "
    "calling identity belongs to; the inbox is addressed to YOU, not to a team."
)


async def _inbox_team(backend: Backend, team: str | None) -> str | None:
    """The inbox is per recipient, and the API accepts no team (all of the
    caller's teams), so an omitted team is passed through as None rather
    than resolved to a default. That also keeps the tools usable from a
    project-scoped key, which has no team to default to (PR #285 review)."""
    return await backend.resolve_team(team) if team is not None else None


async def inbox_list(
    backend: Backend,
    unread: Annotated[bool, Field(description="Only entries not yet marked read.")] = False,
    team: Annotated[str | None, Field(description=INBOX_TEAM_DESC)] = None,
    # The route caps limit at 200 and the body fetches limit + 1 to detect
    # truncation, so 199 is the largest page that behaves the same on both
    # transports (the REST transport enforces the cap, in-process does not).
    limit: Annotated[int, Field(description="Maximum number of entries to return.", ge=1, le=199)] = 20,
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
    team_id = await _inbox_team(backend, team)
    rows = await backend.list_inbox(team_id, unread=unread, limit=limit + 1)
    result = listing("entries", rows, limit, COMPACT_INBOX_FIELDS, detail)
    result["unread_only"] = unread
    return result


async def inbox_mark_read(
    backend: Backend,
    entry_id: Annotated[str, Field(description="Inbox entry id, from inbox_list.")],
) -> dict:
    """Mark one inbox entry as read. Returns the updated entry; marking an
    entry that is already read is a no-op that returns it unchanged."""
    return await backend.mark_inbox_read(entry_id)


async def inbox_mark_all_read(
    backend: Backend,
    team: Annotated[str | None, Field(description=INBOX_TEAM_DESC)] = None,
) -> dict:
    """Mark every unread inbox entry for the calling identity as read.

    Returns `marked_count`. Read the entries first (inbox_list) -- this
    is how you acknowledge them, not how you find out what they said.
    """
    team_id = await _inbox_team(backend, team)
    return await backend.mark_all_inbox_read(team_id)
