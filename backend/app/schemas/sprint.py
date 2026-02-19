"""Sprint schemas."""
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.models.sprint import SprintStatus
from app.utils import DateTimeUTC


class SprintCreate(BaseModel):
    """Schema for creating a sprint."""

    name: str = Field(min_length=1, max_length=255)
    description: str | None = None
    start_date: datetime | None = None
    end_date: datetime | None = None
    budget: int | None = Field(default=None, ge=1)  # null = use project default or unlimited
    token_budget: int | None = Field(default=None, ge=1)  # null = unlimited
    explicit_unlimited: bool = False  # If True, ignore project default and create with unlimited budget


class SprintUpdate(BaseModel):
    """Schema for updating a sprint."""

    name: str | None = None
    description: str | None = None
    status: SprintStatus | None = None
    start_date: datetime | None = None
    end_date: datetime | None = None
    budget: int | None = Field(default=None, ge=1)
    token_budget: int | None = Field(default=None, ge=1)


class SprintResponse(BaseModel):
    """Schema for sprint response."""

    id: str
    project_id: str
    name: str
    description: str | None
    status: SprintStatus
    start_date: DateTimeUTC | None
    end_date: DateTimeUTC | None
    budget: int | None
    points_spent: int
    token_budget: int | None
    tokens_spent: int
    limbo: bool
    created_at: DateTimeUTC
    updated_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)
