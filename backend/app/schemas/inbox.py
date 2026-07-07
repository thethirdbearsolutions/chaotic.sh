"""Inbox schemas (CHT-1250)."""
from pydantic import BaseModel, ConfigDict, field_validator
from app.enums import InboxEntryKind
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


class InboxEntryResponse(BaseModel):
    """An 'awaiting you' entry, with source names filled in for display."""

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
    title: str
    body: str | None = None
    created_at: DateTimeUTC
    read_at: DateTimeUTC | None = None

    model_config = ConfigDict(from_attributes=True)

    @field_validator("kind", mode="before")
    @classmethod
    def coerce_kind(cls, v):
        return _coerce_enum(InboxEntryKind, v)


class MarkAllReadResponse(BaseModel):
    """Response for POST /inbox/mark-all-read."""

    marked_count: int


class UnreadCountResponse(BaseModel):
    """Response for GET /inbox/unread-count."""

    unread_count: int
