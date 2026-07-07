"""Oxyde ORM Document models."""
import uuid
from datetime import datetime, timezone
from app.utils.datetimes import DateTimeUTC
from oxyde import Model, Field, Index
from app.oxyde_models.user import OxydeUser  # noqa: F401 — needed for FK resolution
from app.oxyde_models.label import OxydeLabel  # noqa: F401 — needed for FK/M2M resolution
from app.enums import DocumentActivityType
from app.oxyde_models.enums import DbEnum


class OxydeDocument(Model):
    """Document model for team documentation."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    team_id: str = Field()
    author: OxydeUser | None = Field(default=None, db_on_delete="CASCADE")
    project_id: str | None = Field(default=None)
    sprint_id: str | None = Field(default=None)
    title: str = Field()
    content: str | None = Field(default=None)
    icon: str | None = Field(default=None)
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))
    labels: list["OxydeLabel"] = Field(default_factory=list, db_m2m=True, db_through="OxydeDocumentLabel")

    class Meta:
        is_table = True
        table_name = "documents"


class OxydeDocumentComment(Model):
    """Comment on a document."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    document_id: str = Field()
    author: OxydeUser | None = Field(default=None, db_on_delete="CASCADE")
    content: str = Field()
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "document_comments"


class OxydeDocumentActivity(Model):
    """Activity log for documents."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    document: OxydeDocument | None = Field(default=None, db_on_delete="CASCADE")
    team_id: str = Field()
    user: OxydeUser | None = Field(default=None, db_on_delete="CASCADE")
    activity_type: DbEnum(DocumentActivityType) = Field()
    document_title: str | None = Field(default=None)
    document_icon: str | None = Field(default=None)
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "document_activities"


class OxydeDocumentIssue(Model):
    """Junction table for document-issue links."""

    document_id: str = Field(db_pk=True)
    issue_id: str = Field(db_pk=True)
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "document_issues"


class OxydeDocumentLabel(Model):
    """Junction table for document-label links."""

    document: OxydeDocument | None = Field(default=None, db_pk=True, db_on_delete="CASCADE")
    label: OxydeLabel | None = Field(default=None, db_pk=True, db_on_delete="CASCADE")

    class Meta:
        is_table = True
        table_name = "document_labels"


class OxydeDocumentRevision(Model):
    """Immutable snapshot of a document's title+content at a point in time.

    A new row is appended every time a document update changes title or
    content. Version numbers are monotonically increasing per document;
    v1 is the initial state at creation. Diffing is computed by callers
    from the stored snapshots.
    """

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    # No standalone index on document_id: the composite UNIQUE
    # (document_id, version) below covers per-document lookups.
    document_id: str = Field()
    version: int = Field()
    title: str = Field()
    content: str | None = Field(default=None)
    author: OxydeUser | None = Field(default=None, db_on_delete="SET NULL")
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "document_revisions"
        indexes = [
            Index(("document_id", "version"), unique=True, name="uq_document_revisions_doc_version"),
        ]
