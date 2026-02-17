"""Oxyde ORM Team models."""
import uuid
from datetime import datetime, timezone
from oxyde import OxydeModel, Field
from app.oxyde_models.user import OxydeUser  # noqa: F401 — needed for FK resolution


class OxydeTeam(OxydeModel):
    """Team/workspace model."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    name: str = Field()
    key: str = Field(db_unique=True, db_index=True)
    description: str | None = Field(default=None)
    logo_url: str | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "teams"


class OxydeTeamMember(OxydeModel):
    """Team membership model."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    team_id: str = Field()
    user: OxydeUser | None = Field(default=None, db_on_delete="CASCADE")
    role: str = Field(default="MEMBER")
    joined_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "team_members"


class OxydeTeamInvitation(OxydeModel):
    """Team invitation model."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    team_id: str = Field()
    email: str = Field(db_index=True)
    role: str = Field(default="MEMBER")
    token: str = Field(db_unique=True, db_index=True)
    invited_by: OxydeUser | None = Field(default=None, db_on_delete="CASCADE")
    status: str = Field(default="PENDING")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    expires_at: datetime = Field()

    class Meta:
        is_table = True
        table_name = "team_invitations"
