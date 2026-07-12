"""Oxyde ORM Inbox model (CHT-1250).

One row per 'awaiting you' item for a specific human. Written by the same
service-layer paths that already produce the underlying events (mentions,
gate-pending rituals, review requests, assignment changes) so the inbox
can never drift from the activity log / websocket feeds it's derived from.
"""
import uuid
from datetime import datetime, timezone
from app.utils.datetimes import DateTimeUTC
from oxyde import Model, Field
from app.enums import InboxEntryKind
from app.oxyde_models.enums import DbEnum


class OxydeInboxEntry(Model):
    """An 'awaiting you' entry for a specific human recipient."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    recipient_user_id: str = Field(db_index=True, db_on_delete="CASCADE")
    kind: DbEnum(InboxEntryKind) = Field()
    team_id: str = Field(db_index=True, db_on_delete="CASCADE")
    # Source refs -- whichever apply to this entry's kind. All optional
    # since a single entry only ever points at one kind of source.
    project_id: str | None = Field(default=None)
    issue_id: str | None = Field(default=None)
    document_id: str | None = Field(default=None)
    ritual_id: str | None = Field(default=None)
    source_user_id: str | None = Field(default=None)  # who triggered this (mentioner, assigner, requester)
    title: str = Field()
    body: str | None = Field(default=None)
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))
    read_at: DateTimeUTC | None = Field(default=None)
    # A real archive (CHT-1316): archived entries drop out of the inbox list
    # + unread count entirely, instead of piggybacking on read-state.
    archived_at: DateTimeUTC | None = Field(default=None)

    class Meta:
        is_table = True
        table_name = "inbox_entries"
