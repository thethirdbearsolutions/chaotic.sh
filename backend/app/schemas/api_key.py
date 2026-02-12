"""API Key schemas."""
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class APIKeyCreate(BaseModel):
    """Schema for creating an API key."""

    name: str = Field(min_length=1, max_length=255)


class APIKeyResponse(BaseModel):
    """Schema for API key response (without the full key)."""

    id: str
    name: str
    key_prefix: str
    created_at: datetime
    last_used_at: datetime | None
    expires_at: datetime | None
    is_active: bool

    model_config = ConfigDict(from_attributes=True)


class APIKeyCreated(BaseModel):
    """Schema for newly created API key (includes full key, shown only once)."""

    id: str
    name: str
    key: str  # Full key - only returned at creation time
    key_prefix: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
