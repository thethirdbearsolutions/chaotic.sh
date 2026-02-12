"""Document schemas."""
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.schemas.issue import LabelResponse


class DocumentCreate(BaseModel):
    """Schema for creating a document."""

    title: str = Field(min_length=1, max_length=500)
    content: str | None = None
    icon: str | None = None
    project_id: str | None = None
    sprint_id: str | None = None


class DocumentUpdate(BaseModel):
    """Schema for updating a document."""

    title: str | None = None
    content: str | None = None
    icon: str | None = None
    project_id: str | None = None
    sprint_id: str | None = None


class DocumentResponse(BaseModel):
    """Schema for document response."""

    id: str
    team_id: str
    author_id: str
    author_name: str | None = None
    project_id: str | None
    sprint_id: str | None = None
    title: str
    content: str | None
    icon: str | None
    created_at: datetime
    updated_at: datetime
    labels: list[LabelResponse] = []

    model_config = ConfigDict(from_attributes=True)


class DocumentCommentCreate(BaseModel):
    """Schema for creating a document comment."""

    content: str = Field(min_length=1)


class DocumentCommentUpdate(BaseModel):
    """Schema for updating a document comment."""

    content: str = Field(min_length=1)


class DocumentCommentResponse(BaseModel):
    """Schema for document comment response."""

    id: str
    document_id: str
    author_id: str
    author_name: str | None = None
    content: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
