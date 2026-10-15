"""Team schemas."""
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from app.enums import TeamRole, InvitationStatus
from app.utils import DateTimeUTC


def _coerce_enum(enum_cls, v):
    """Coerce enum name strings from Oxyde to enum members."""
    if isinstance(v, enum_cls):
        return v
    if isinstance(v, str):
        try:
            return enum_cls[v]
        except KeyError:
            return enum_cls(v)
    return v


class TeamCreate(BaseModel):
    """Schema for creating a team."""

    name: str = Field(min_length=1, max_length=255)
    key: str = Field(min_length=2, max_length=10, pattern=r"^[A-Z0-9]+$")
    description: str | None = None


class TeamUpdate(BaseModel):
    """Schema for updating a team."""

    name: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = None
    logo_url: str | None = None


class TeamRoleUpdate(BaseModel):
    """Schema for updating a team member's role (CHT-1223).

    PATCH /teams/{team_id}/members/{user_id} previously bound `role` as a
    bare (query-string) function param, but every client (CLI included)
    sends it as a JSON body -- this schema makes the body path work.
    """

    role: TeamRole


class TeamResponse(BaseModel):
    """Schema for team response."""

    id: str
    name: str
    key: str
    description: str | None
    logo_url: str | None
    created_at: DateTimeUTC
    updated_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)


class TeamMemberResponse(BaseModel):
    """Schema for team member response."""

    id: str
    user_id: str
    team_id: str
    role: TeamRole
    joined_at: DateTimeUTC
    user_name: str | None = None
    user_email: str | None = None
    # The @handle that mentions exactly this member in the team (CHT-1731);
    # null where not computed.
    mention_handle: str | None = None

    model_config = ConfigDict(from_attributes=True)

    @field_validator("role", mode="before")
    @classmethod
    def coerce_role(cls, v):
        return _coerce_enum(TeamRole, v)


class TeamInvitationCreate(BaseModel):
    """Schema for creating a team invitation."""

    # EmailStr, as on signup (CHT-1804): an invitation's address is
    # validated and normalised (domain lowercased, IDN domains encoded)
    # the same way as an account's, so the two compare equal.
    email: EmailStr
    role: TeamRole = TeamRole.MEMBER


class TeamInvitationResponse(BaseModel):
    """Schema for team invitation response."""

    id: str
    team_id: str
    email: str
    role: TeamRole
    status: InvitationStatus
    created_at: DateTimeUTC
    expires_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)

    @field_validator("role", mode="before")
    @classmethod
    def coerce_role(cls, v):
        return _coerce_enum(TeamRole, v)

    @field_validator("status", mode="before")
    @classmethod
    def coerce_status(cls, v):
        return _coerce_enum(InvitationStatus, v)


class TeamInvitationCreatedResponse(TeamInvitationResponse):
    """The create answer: the invitation, plus its accept link when this
    server cannot email it (CHT-1794).

    ``accept_url`` holds the invitation token, a bearer credential
    (CHT-1790), so it is shown once, to the admin who created the
    invitation, and only when SMTP is not configured; otherwise it is
    null and the link goes by email only. It is never in the list
    (``TeamInvitationResponse``) or a log line."""

    accept_url: str | None = None


class InvitationPreviewResponse(BaseModel):
    """What the public /invite/<token> page shows before anyone signs in
    (CHT-1265). Only what the page needs: no ids, no token, no status
    (a preview exists only for a valid invitation), and the invited
    address only masked, enough to say which account to sign in with."""

    team_name: str
    role: TeamRole
    invited_by_name: str | None
    email_hint: str
    expires_at: DateTimeUTC

    @field_validator("role", mode="before")
    @classmethod
    def coerce_role(cls, v):
        return _coerce_enum(TeamRole, v)
