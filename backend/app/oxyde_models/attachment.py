"""Oxyde ORM model for files attached to issues (CHT-1996)."""
import uuid
from datetime import datetime, timezone

from oxyde import Field, Index, Model

from app.oxyde_models.issue import OxydeIssue, OxydeIssueComment  # noqa: F401 -- FK resolution
from app.oxyde_models.user import OxydeUser  # noqa: F401 -- FK resolution
from app.utils.datetimes import DateTimeUTC


class OxydeAttachment(Model):
    """A file attached to an issue, optionally from one of its comments.

    The bytes are not in the database: they live in the blob store
    (``app.services.attachment_service.BlobStore``) under their sha256,
    so identical files are stored once. The row is what names a blob:
    deleting the issue cascades its rows away, and deleting a comment or
    the uploader only clears the reference. ``filename`` is display text
    and never reaches the filesystem.
    """

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    # NOT NULL in the database: an attachment means nothing without its
    # issue. (Optional to Python only because a relation field must be.)
    issue: OxydeIssue | None = Field(default=None, db_nullable=False, db_on_delete="CASCADE")
    comment: OxydeIssueComment | None = Field(default=None, db_on_delete="SET NULL")
    uploader: OxydeUser | None = Field(default=None, db_on_delete="SET NULL")
    sha256: str = Field()
    size: int = Field()
    # From the bytes' signature, never from what the client claimed.
    content_type: str = Field()
    filename: str = Field()
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "attachments"
        indexes = [
            Index(("issue_id",), name="ix_attachments_issue_id"),
            Index(("sha256",), name="ix_attachments_sha256"),
            # The SET NULLs on a comment or user delete.
            Index(("comment_id",), name="ix_attachments_comment_id"),
            Index(("uploader_id",), name="ix_attachments_uploader_id"),
        ]
