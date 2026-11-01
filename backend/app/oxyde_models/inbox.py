"""Oxyde ORM Inbox model (CHT-1250).

One row per 'awaiting you' item for a specific human. Written by the same
service-layer paths that already produce the underlying events (mentions,
gate-pending rituals, review requests, assignment changes) so the inbox
can never drift from the activity log / websocket feeds it's derived from.
"""
import uuid
from datetime import datetime, timezone
from pydantic import field_validator

from app.utils.datetimes import DateTimeUTC, ensure_utc
from oxyde import Model, Field, Index
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
    # What the entry asked for was settled elsewhere (CHT-1607): the gate
    # was completed, the review approved or rejected, the rejection
    # answered. Distinct from read_at, which the recipient sets by reading;
    # a syncing client drops a resolved entry.
    resolved_at: DateTimeUTC | None = Field(default=None)
    # Bumped by every change a syncing client must see: created, read,
    # archived, resolved (CHT-1607). The sync cursor orders on
    # (updated_at, id). Every writer of the columns above sets it too.
    # The db_default exists only so migration 0027 could add the column NOT
    # NULL to a table with rows (SQLite needs a constant); the migration
    # backfills every row, and every insert sets the Python default.
    # Typed plain `datetime` because pydantic folds an Annotated type's
    # metadata into a plain FieldInfo, which drops Oxyde's db_default; the
    # validator below does what DateTimeUTC would.
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        db_default="'1970-01-01 00:00:00'",
    )

    @field_validator("updated_at", mode="before")
    @classmethod
    def _updated_at_utc(cls, v):
        return ensure_utc(v)

    class Meta:
        is_table = True
        table_name = "inbox_entries"
        indexes = [
            # Every list/unread-count query filters by one of these. 0012
            # created them by hand (makemigrations does not emit an index
            # for db_index=True); declared here so the migration record
            # keeps them across a table rebuild (CHT-1410).
            Index(("recipient_user_id",), name="inbox_entries_recipient_user_id_idx"),
            Index(("team_id",), name="inbox_entries_team_id_idx"),
            # The sync scan (CHT-1607): one recipient's entries in cursor order.
            Index(
                ("recipient_user_id", "updated_at", "id"),
                name="inbox_entries_recipient_updated_idx",
            ),
            # Settling the entries of an issue or document that went away,
            # in bulk when a project is deleted (CHT-1626).
            Index(("issue_id",), name="inbox_entries_issue_id_idx"),
            Index(("document_id",), name="inbox_entries_document_id_idx"),
            # One open "nothing is left open under X" entry per recipient
            # and parent (CHT-1928): two closes racing past the service's
            # exists check would otherwise both write one.
            Index(
                ("recipient_user_id", "issue_id"),
                name="inbox_entries_open_children_closed_uq",
                unique=True,
                where="kind = 'CHILDREN_CLOSED' AND resolved_at IS NULL",
            ),
        ]
