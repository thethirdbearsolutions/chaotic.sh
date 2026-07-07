"""API Key schemas."""
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.utils import DateTimeUTC


class APIKeyCreate(BaseModel):
    """Schema for creating an API key."""

    name: str = Field(min_length=1, max_length=255)
    # Optional absolute expiry. Enforcement already existed
    # (APIKeyService.validate_key rejects expired keys, same 401 as an
    # invalid key); this only adds the way to SET it at creation
    # (PR #219 review, finding 2). None = never expires, unchanged.
    expires_at: datetime | None = None


class APIKeyResponse(BaseModel):
    """Schema for API key response (without the full key)."""

    id: str
    name: str
    key_prefix: str
    created_at: DateTimeUTC
    last_used_at: DateTimeUTC | None
    expires_at: DateTimeUTC | None
    is_active: bool

    model_config = ConfigDict(from_attributes=True)


class APIKeyCreated(BaseModel):
    """Schema for newly created API key (includes full key, shown only once)."""

    id: str
    name: str
    key: str  # Full key - only returned at creation time
    key_prefix: str
    created_at: DateTimeUTC
    expires_at: DateTimeUTC | None = None

    model_config = ConfigDict(from_attributes=True)
