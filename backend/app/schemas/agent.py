"""Agent schemas."""
from pydantic import BaseModel, ConfigDict, Field
from app.enums import AgentKind
from app.utils import DateTimeUTC


class AgentCreate(BaseModel):
    """Schema for creating an agent."""

    name: str = Field(min_length=1, max_length=255)
    avatar_url: str | None = None


class AgentUpdate(BaseModel):
    """Schema for updating an agent."""

    name: str | None = Field(default=None, min_length=1, max_length=255)
    avatar_url: str | None = None


class AgentResponse(BaseModel):
    """Schema for agent response."""

    id: str
    name: str
    avatar_url: str | None
    is_active: bool
    parent_user_id: str
    parent_user_name: str | None = None
    agent_team_id: str
    agent_project_id: str | None
    created_at: DateTimeUTC
    updated_at: DateTimeUTC
    # Agent identity (CHT-1497). `kind` is assistant for a hand-made
    # agent, service for a registrar, session for a registered identity;
    # `external_ref` and `registered_by_id` are set only on the last.
    kind: AgentKind | None = None
    external_ref: str | None = None
    registered_by_id: str | None = None
    can_register: bool = False

    model_config = ConfigDict(from_attributes=True)


class AgentCreated(BaseModel):
    """Schema for newly created agent (includes API key, shown only once)."""

    id: str
    name: str
    avatar_url: str | None
    agent_team_id: str
    agent_project_id: str | None
    api_key: str  # Full API key - only returned at creation time
    api_key_id: str
    created_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)
