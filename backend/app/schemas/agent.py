"""Agent schemas."""
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field
from app.enums import AgentKind
from app.utils import DateTimeUTC


class AgentCreate(BaseModel):
    """Schema for creating an agent."""

    name: str = Field(min_length=1, max_length=255)
    avatar_url: str | None = None
    # Make it a registrar (kind=service) from the start (CHT-1498).
    can_register: bool = False


class AgentUpdate(BaseModel):
    """Schema for updating an agent."""

    name: str | None = Field(default=None, min_length=1, max_length=255)
    avatar_url: str | None = None
    # Turn the registrar capability on (kind becomes service) or off
    # (kind back to assistant). Refused for a registered identity
    # (CHT-1498): registration is one level deep.
    can_register: bool | None = None


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
    # Set only on a deactivate response: how many identities this agent
    # had registered that the deactivation also retired (CHT-1498).
    deactivated_identities: int | None = None
    # For kind=session only, on every response (CHT-1501): when its keys
    # were last used, and whether that is longer ago than
    # IDLE_SESSION_AFTER (other kinds: null and false). `agent list` and the web pickers hide
    # an idle identity by default; it still resolves by id or name.
    last_used_at: DateTimeUTC | None = None
    idle: bool = False

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
    # Echoed so a client can confirm a registrar was made (CHT-1600).
    kind: AgentKind | None = None
    can_register: bool = False

    model_config = ConfigDict(from_attributes=True)


# Address of a registered identity, e.g. `claude-code:session:<uuid>`:
# printable, no whitespace. An address, never a credential.
EXTERNAL_REF_PATTERN = r"^[!-~]+$"


class AgentRegister(BaseModel):
    """POST /agents/register (CHT-1498): get or create the session
    identity a registrar knows by `external_ref`, and mint it a key."""

    external_ref: str = Field(min_length=1, max_length=200, pattern=EXTERNAL_REF_PATTERN)
    # Display name. Optional: a new identity defaults to
    # "<registrar> · <last 8 of the ref>"; an existing one keeps its name.
    name: str | None = Field(default=None, min_length=1, max_length=255)
    # The name for a *new* identity only; an existing one keeps its name
    # (CHT-1499: the CLI's `<registrar> · <branch> · <session>` label must
    # not undo a rename when it registers again). `name` wins if both.
    default_name: str | None = Field(default=None, min_length=1, max_length=255)
    # Only session identities can be registered in this slice.
    kind: Literal["session"] = "session"
    # Narrow a team-scoped registrar's identity to one project of its
    # team. Must be the registrar's own project for a project-scoped one.
    project_id: str | None = None
    # Only for a human caller, who belongs to teams rather than being
    # scoped to one; optional when project_id is given. An agent
    # registrar may pass its own team or nothing.
    team_id: str | None = None


class AgentRegistered(BaseModel):
    """The identity and its fresh key. The key is shown only here."""

    agent: AgentResponse
    created: bool
    api_key: str
    api_key_id: str
    expires_at: DateTimeUTC
