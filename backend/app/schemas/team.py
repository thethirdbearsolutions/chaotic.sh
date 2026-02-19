"""Team schemas."""
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.models.team import TeamRole, InvitationStatus
from app.utils import DateTimeUTC


class TeamCreate(BaseModel):
    """Schema for creating a team."""

    name: str = Field(min_length=1, max_length=255)
    key: str = Field(min_length=2, max_length=10, pattern=r"^[A-Z0-9]+$")
    description: str | None = None


class TeamUpdate(BaseModel):
    """Schema for updating a team."""

    name: str | None = None
    description: str | None = None
    logo_url: str | None = None


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

    model_config = ConfigDict(from_attributes=True)


class TeamInvitationCreate(BaseModel):
    """Schema for creating a team invitation."""

    email: str
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
