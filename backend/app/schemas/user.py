"""User schemas."""
from typing import Literal
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from app.enums import AgentKind
from app.utils import DateTimeUTC


class UserCreate(BaseModel):
    """Schema for creating a user."""

    email: EmailStr
    password: str = Field(min_length=8)
    name: str = Field(min_length=1, max_length=255)


# The longest each self-written profile field may be (CHT-1979).
PROFILE_LIMITS = {"bio": 4000, "pronouns": 40, "tagline": 120}
# The fields a member writes about themselves. Every member may set their
# own, people and agents alike (CHT-1979); an agent's name is held to the
# naming rules on the way in (app.api.agents.check_own_agent_name).
IDENTITY_FIELDS = frozenset({"name", "avatar_url", "bio", "pronouns", "tagline"})


class ProfileFields(BaseModel):
    """``bio`` (markdown), ``pronouns`` and ``tagline`` (one line each),
    as written by the member (CHT-1979). Each is trimmed, and blank means
    cleared: it is stored as null."""

    bio: str | None = Field(default=None, max_length=PROFILE_LIMITS["bio"])
    pronouns: str | None = Field(default=None, max_length=PROFILE_LIMITS["pronouns"])
    tagline: str | None = Field(default=None, max_length=PROFILE_LIMITS["tagline"])

    @field_validator("bio", mode="before")
    @classmethod
    def _trim_bio(cls, v):
        if isinstance(v, str):
            v = v.strip()
            return v or None
        return v

    @field_validator("pronouns", "tagline", mode="before")
    @classmethod
    def _one_line(cls, v):
        # One line: any run of whitespace, newlines included, becomes one space.
        if isinstance(v, str):
            v = " ".join(v.split())
            return v or None
        return v


class UserUpdate(ProfileFields):
    """Schema for updating a user: your own name, avatar and profile.

    No ``email`` on purpose: a change of address takes the password and
    clears ``email_verified_at`` (``POST /api/auth/email``,
    UserService.change_email, CHT-1827).
    """

    name: str | None = Field(default=None, min_length=1, max_length=255)
    avatar_url: str | None = None

    @field_validator("name", mode="before")
    @classmethod
    def _name_not_blank(cls, v):
        # Trimmed; a blank or null name is refused (a name is required).
        if v is None:
            raise ValueError("name may not be null; leave it out to keep the current name")
        if isinstance(v, str):
            v = v.strip()
            if not v:
                raise ValueError("A name must not be blank.")
        return v


class UserResponse(BaseModel):
    """Schema for user response."""

    id: str
    email: str
    name: str
    avatar_url: str | None
    # Self-written profile (CHT-1979); null until set.
    bio: str | None = None
    pronouns: str | None = None
    tagline: str | None = None
    is_active: bool
    is_agent: bool = False
    parent_user_name: str | None = None
    created_at: DateTimeUTC
    updated_at: DateTimeUTC
    # When the person proved they receive mail at `email` (CHT-1790);
    # None: never verified, and always None for an agent. With SMTP
    # configured, accepting a team invitation requires it.
    email_verified_at: DateTimeUTC | None = None
    # Agent identity (CHT-1497); all None for a human. See AgentResponse.
    kind: AgentKind | None = None
    external_ref: str | None = None
    registered_by_id: str | None = None
    # The registrar's name, so `chaotic auth whoami` can say which
    # harness registered this session identity (CHT-1499).
    registered_by_name: str | None = None
    # A registrar sees its own capability on /auth/me (CHT-1497 review).
    can_register: bool = False
    # An agent's scope; both None for a human. A project-scoped agent has
    # its project's team and the project; /teams cannot tell it the
    # project, so the stdio MCP server learns its default here (CHT-1690).
    agent_team_id: str | None = None
    agent_project_id: str | None = None

    model_config = ConfigDict(from_attributes=True)


class UserLookupResponse(UserResponse):
    """``GET /users/{id}``: anyone in the caller's team directory, or the
    caller itself (CHT-1841). The routes that return the caller's own
    account keep ``UserResponse``, whose ``email`` is never null."""

    # None only for a session identity seen by someone who may not see
    # its external_ref: that address is made from the ref
    # (RegistrationService). A person's address, and any other agent's,
    # is always shown.
    email: str | None


class EmailVerificationSent(BaseModel):
    """A verification code was mailed (CHT-1790)."""

    # The address it went to: the account's own.
    email: str
    # When the code stops working. A newer code retires it sooner.
    expires_at: DateTimeUTC


class EmailVerificationConfirm(BaseModel):
    """The code from the verification email (CHT-1790)."""

    # Six digits as mailed. Bounded but not pattern-checked here, so a
    # malformed code gets the same answer as a wrong one.
    code: str = Field(min_length=1, max_length=32)


class EmailChange(BaseModel):
    """A person's new address, confirmed with their password (CHT-1827)."""

    email: EmailStr
    password: str = Field(min_length=1, max_length=1024)


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
