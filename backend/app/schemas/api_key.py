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


class AgentKeyResponse(APIKeyResponse):
    """One key that authenticates as an agent, for the people who manage
    it (GET /agents/{id}/keys, CHT-1508). `owner_id` is the human who
    holds the key (its `holder_user_id`): whoever minted it, or for a key
    the agent minted for itself, the holder of the key it called with.
    It is null only for a key nobody answers for, which cannot sign in.

    `legacy_self_minted` is always false since migration 0021 (CHT-1537)
    and is kept so older clients still parse the response: it marked a
    key the agent minted before holders were recorded, whose `owner_id`
    was the agent. 0021 recorded the agent's creator as those keys'
    holder, so they now list like any other key."""

    owner_id: str | None = None
    owner_name: str | None = None
    legacy_self_minted: bool = False


class APIKeyCreated(BaseModel):
    """Schema for newly created API key (includes full key, shown only once)."""

    id: str
    name: str
    key: str  # Full key - only returned at creation time
    key_prefix: str
    created_at: DateTimeUTC
    expires_at: DateTimeUTC | None = None

    model_config = ConfigDict(from_attributes=True)
