"""User schemas."""
from typing import Literal
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from app.enums import AgentKind
from app.utils import DateTimeUTC


class UserCreate(BaseModel):
    """Schema for creating a user."""

    email: EmailStr
    password: str = Field(min_length=8)
    name: str = Field(min_length=1, max_length=255)


class UserUpdate(BaseModel):
    """Schema for updating a user."""

    name: str | None = None
    avatar_url: str | None = None


class UserResponse(BaseModel):
    """Schema for user response."""

    id: str
    email: str
    name: str
    avatar_url: str | None
    is_active: bool
    is_agent: bool = False
    parent_user_name: str | None = None
    created_at: DateTimeUTC
    updated_at: DateTimeUTC
    # Agent identity (CHT-1497); all None for a human. See AgentResponse.
    kind: AgentKind | None = None
    external_ref: str | None = None
    registered_by_id: str | None = None
    # The registrar's name, so `chaotic auth whoami` can say which
    # harness registered this session identity (CHT-1499).
    registered_by_name: str | None = None
    # A registrar sees its own capability on /auth/me (CHT-1497 review).
    can_register: bool = False

    model_config = ConfigDict(from_attributes=True)


class UserLogin(BaseModel):
    """Schema for user login."""

    email: EmailStr
    password: str
    # "web": the web app's own login form. Its JWT carries the web-login
    # claim that OAuth consent requires (CHT-1519); the CLI never sends it.
    client: Literal["web"] | None = None


class Token(BaseModel):
    """Schema for JWT token."""

    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Schema for token payload."""

    user_id: str | None = None
