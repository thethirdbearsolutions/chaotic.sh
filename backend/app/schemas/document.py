"""Document schemas."""
from typing import ClassVar
from pydantic import BaseModel, ConfigDict, Field, model_validator
from app.schemas.authorship import name_deleted_author
from app.schemas.principal import HasPrincipals, PrincipalSummary
from app.schemas.issue import LabelResponse
from app.utils import DateTimeUTC


class DocumentCreate(BaseModel):
    """Schema for creating a document."""

    title: str = Field(min_length=1, max_length=500)
    content: str | None = None
    icon: str | None = None
    project_id: str | None = None
    sprint_id: str | None = None


class DocumentUpdate(BaseModel):
    """Schema for updating a document."""

    title: str | None = Field(default=None, min_length=1, max_length=500)
    content: str | None = None
    icon: str | None = None
    project_id: str | None = None
    sprint_id: str | None = None


class DocumentResponse(HasPrincipals, BaseModel):
    """Schema for document response."""

    principal_fields: ClassVar[dict[str, str]] = {"author": "author_id"}

    id: str
    team_id: str
    author_id: str | None  # None: author deleted (CHT-1427)
    author_name: str | None = None
    # Who, as a person or an agent (CHT-1500); see app.schemas.principal.
    author: PrincipalSummary | None = None
    project_id: str | None
    sprint_id: str | None = None
    title: str
    content: str | None
    icon: str | None
    created_at: DateTimeUTC
    updated_at: DateTimeUTC
    labels: list[LabelResponse] = []

    model_config = ConfigDict(from_attributes=True)

    @model_validator(mode="after")
    def _name_deleted_author(self):
        return name_deleted_author(self, "author_id", "author_name")


class DocumentCommentCreate(BaseModel):
    """Schema for creating a document comment."""

    content: str = Field(min_length=1)


class DocumentCommentUpdate(BaseModel):
    """Schema for updating a document comment."""

    content: str = Field(min_length=1)


class DocumentCommentResponse(HasPrincipals, BaseModel):
    """Schema for document comment response."""

    principal_fields: ClassVar[dict[str, str]] = {"author": "author_id"}

    id: str
    document_id: str
    author_id: str | None  # None: author deleted (CHT-1427)
    author_name: str | None = None
    # Who, as a person or an agent (CHT-1500); see app.schemas.principal.
    author: PrincipalSummary | None = None
    content: str
    created_at: DateTimeUTC
    updated_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)

    @model_validator(mode="after")
    def _name_deleted_author(self):
        return name_deleted_author(self, "author_id", "author_name")


class DocumentLinkedResponse(BaseModel):
    """Schema for link_document_to_issue's response (CHT-1223).

    Documents/validates the existing ad hoc {"message": ...} shape --
    schema only, same field, no wire change. (Standardizing this
    link/add-label pair to 204 like their unlink/remove siblings is a
    breaking body-shape change for any client reading `.message` today;
    left for a follow-up per the taste-pass spec.)
    """

    message: str


class LabelAddedResponse(BaseModel):
    """Schema for add_label_to_document's response (CHT-1223)."""

    message: str


class DocumentRevisionListItem(HasPrincipals, BaseModel):
    """Lightweight revision entry for the history list (no body)."""

    principal_fields: ClassVar[dict[str, str]] = {"author": "author_id"}

    id: str
    document_id: str
    version: int
    title: str
    author_id: str | None = None
    author_name: str | None = None
    # Who, as a person or an agent (CHT-1500); see app.schemas.principal.
    author: PrincipalSummary | None = None
    created_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)


class DocumentRevisionResponse(HasPrincipals, BaseModel):
    """Full revision snapshot."""

    principal_fields: ClassVar[dict[str, str]] = {"author": "author_id"}

    id: str
    document_id: str
    version: int
    title: str
    content: str | None = None
    author_id: str | None = None
    author_name: str | None = None
    # Who, as a person or an agent (CHT-1500); see app.schemas.principal.
    author: PrincipalSummary | None = None
    created_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)
