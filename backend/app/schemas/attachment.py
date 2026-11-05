"""Attachment schemas (CHT-1996)."""
from typing import ClassVar

from pydantic import BaseModel, model_validator

from app.schemas.authorship import name_deleted_author
from app.schemas.principal import HasPrincipals, PrincipalSummary
from app.utils import DateTimeUTC


class AttachmentResponse(HasPrincipals, BaseModel):
    """A file attached to an issue. ``url`` is where its bytes are served
    (``GET /api/attachments/{id}/content``), with the same credential as
    any other route: there is no public or signed address."""

    principal_fields: ClassVar[dict[str, str]] = {"uploader": "uploader_id"}
    principal_name_fields: ClassVar[dict[str, str]] = {"uploader": "uploader_name"}

    id: str
    issue_id: str
    # The comment it was attached from; None for a file attached to the
    # issue alone, or whose comment was deleted.
    comment_id: str | None = None
    uploader_id: str | None = None  # None: uploader deleted (CHT-1427)
    uploader_name: str | None = None
    # Who, as a person or an agent (CHT-1500); see app.schemas.principal.
    uploader: PrincipalSummary | None = None
    filename: str
    # What the bytes are, by their signature (never what the client said).
    content_type: str
    size: int
    sha256: str
    url: str
    created_at: DateTimeUTC

    @model_validator(mode="after")
    def _name_deleted_uploader(self):
        return name_deleted_author(self, "uploader_id", "uploader_name")
