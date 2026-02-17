"""Oxyde ORM Document models."""
import uuid
from datetime import datetime, timezone
from oxyde import OxydeModel, Field


class OxydeDocument(OxydeModel):
    """Document model for team documentation."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    team_id: str = Field()
    author_id: str = Field()
    project_id: str | None = Field(default=None)
    sprint_id: str | None = Field(default=None)
    title: str = Field()
    content: str | None = Field(default=None)
    icon: str | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "documents"


class OxydeDocumentComment(OxydeModel):
    """Comment on a document."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    document_id: str = Field()
    author_id: str = Field()
    content: str = Field()
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "document_comments"


class OxydeDocumentActivity(OxydeModel):
    """Activity log for documents."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    document_id: str | None = Field(default=None)
    team_id: str = Field()
    user_id: str = Field()
    activity_type: str = Field()
    document_title: str | None = Field(default=None)
    document_icon: str | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "document_activities"


class OxydeDocumentIssue(OxydeModel):
    """Junction table for document-issue links."""

    document_id: str = Field(db_pk=True)
    issue_id: str = Field(db_pk=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "document_issues"


class OxydeDocumentLabel(OxydeModel):
    """Junction table for document-label links."""

    document_id: str = Field(db_pk=True)
    label_id: str = Field(db_pk=True)

    class Meta:
        is_table = True
        table_name = "document_labels"
