"""Oxyde ORM User model."""
import uuid
from datetime import datetime, timezone
from oxyde import OxydeModel, Field


class OxydeUser(OxydeModel):
    """User model for authentication and identification."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    email: str = Field(db_unique=True, db_index=True)
    hashed_password: str = Field()
    name: str = Field()
    avatar_url: str | None = Field(default=None)
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    # Agent-specific fields
    is_agent: bool = Field(default=False)
    parent_user: "OxydeUser | None" = Field(default=None, db_on_delete="CASCADE")
    agent_team_id: str | None = Field(default=None)
    agent_project_id: str | None = Field(default=None)

    class Meta:
        is_table = True
        table_name = "users"
