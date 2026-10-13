"""Inbox schemas (CHT-1250)."""
from typing import ClassVar, Literal
from pydantic import BaseModel, ConfigDict, field_validator
from app.enums import InboxActionKind, InboxActionNote, InboxEntryKind, InboxEntryState
from app.schemas.principal import HasPrincipals, PrincipalSummary
from app.utils import DateTimeUTC


def _coerce_enum(enum_cls, v):
    """Coerce enum name strings from Oxyde to enum members."""
    if isinstance(v, enum_cls):
        return v
    if isinstance(v, str):
        try:
            return enum_cls[v]  # by name: "GATE_PENDING"
        except KeyError:
            return enum_cls(v)  # by value: "gate_pending"
    return v


class InboxEntryAction(BaseModel):
    """One call the recipient can make on this entry, spelled out so a
    client (and a notification button) never builds a URL (CHT-1607).
    `path` is absolute from the server root and already carries the ids;
    send the request with the user's own credentials. `note` says whether
    the JSON body takes {"note": "..."}."""

    kind: InboxActionKind
    method: Literal["POST"] = "POST"
    path: str
    note: InboxActionNote = InboxActionNote.NONE


class InboxEntryResponse(HasPrincipals, BaseModel):
    """An 'awaiting you' entry, with source names filled in for display."""

    principal_fields: ClassVar[dict[str, str]] = {"source_user": "source_user_id"}

    id: str
    recipient_user_id: str
    kind: InboxEntryKind
    team_id: str
    project_id: str | None = None
    issue_id: str | None = None
    issue_identifier: str | None = None  # populated by the API layer, for deep-linking
    document_id: str | None = None
    document_title: str | None = None
    ritual_id: str | None = None
    source_user_id: str | None = None
    source_user_name: str | None = None
    # Who, as a person or an agent (CHT-1500); see app.schemas.principal.
    source_user: PrincipalSummary | None = None
    title: str
    body: str | None = None
    created_at: DateTimeUTC
    read_at: DateTimeUTC | None = None
    # Sync fields (CHT-1607). `state` is derived from the timestamps: a
    # RESOLVED or ARCHIVED entry is a tombstone a syncing device drops.
    archived_at: DateTimeUTC | None = None
    resolved_at: DateTimeUTC | None = None
    updated_at: DateTimeUTC
    state: InboxEntryState = InboxEntryState.OPEN
    # What the recipient can do about it in one call: archive only on a
    # resolved entry, nothing on an archived one, and nothing at all for a
    # credential that cannot write.
    actions: list[InboxEntryAction] = []

    model_config = ConfigDict(from_attributes=True)

    @field_validator("kind", mode="before")
    @classmethod
    def coerce_kind(cls, v):
        return _coerce_enum(InboxEntryKind, v)


class InboxSyncResponse(BaseModel):
    """One page of GET /inbox/sync (CHT-1607). The client contract:

    * Store `next_cursor` and send it back as `since` next time. While
      `has_more` is true, fetch again at once; otherwise wait for the next
      poll or push.
    * Upsert every entry by `id`; drop it when `state` is `resolved` or
      `archived`. The same entry can come more than once: the cursor stays
      a few seconds behind the newest change, so recent changes are sent
      again on the next sync.
    * When `reset` is true, the server restarted the sync (the caller can
      now read a team the cursor did not cover): clear the cache before
      applying this page, then page on as usual.
    * Drop any held entry whose team is not in `team_ids` (a left or
      deleted team sends no tombstones).
    * Display fields (`issue_identifier`, `document_title`, `source_user`)
      are resolved when sent. A document title or a person's name change
      re-sends the open entries that show it; anything else that changes
      them does not, so treat them as a snapshot.
    """

    entries: list[InboxEntryResponse]
    next_cursor: str | None = None
    has_more: bool = False
    reset: bool = False
    team_ids: list[str]


class MarkAllReadResponse(BaseModel):
    """Response for POST /inbox/mark-all-read."""

    marked_count: int


class UnreadCountResponse(BaseModel):
    """Response for GET /inbox/unread-count."""

    unread_count: int
