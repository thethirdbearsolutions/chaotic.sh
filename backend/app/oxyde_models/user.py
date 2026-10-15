"""Oxyde ORM User model."""
import uuid
from datetime import datetime, timezone
from app.utils.datetimes import DateTimeUTC
from oxyde import Model, Field, Index
from app.enums import AgentKind
from app.oxyde_models.enums import DbEnum


class OxydeUser(Model):
    """User model for authentication and identification."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    email: str = Field(db_unique=True, db_index=True)
    hashed_password: str = Field()
    name: str = Field()
    avatar_url: str | None = Field(default=None)
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))
    # When the person proved they receive mail at `email` by entering a
    # code sent there (CHT-1790, migration 0032). NULL: never verified,
    # which every account made before 0032 starts as. With SMTP
    # configured, accepting a team invitation requires it. Always NULL
    # for an agent.
    email_verified_at: DateTimeUTC | None = Field(default=None)

    # Agent-specific fields
    is_agent: bool = Field(default=False)
    # RESTRICT, not CASCADE: UserService.delete removes a human's agents
    # itself, behind the authored-content guard (CHT-1467, migration 0020).
    parent_user: "OxydeUser | None" = Field(default=None, db_on_delete="RESTRICT")
    agent_team_id: str | None = Field(default=None)
    agent_project_id: str | None = Field(default=None)

    # Agent identity (CHT-1497, migration 0023). All NULL/false for a human.
    # `kind`: assistant (hand-made), service (a registrar), session (an
    # identity a registrar registered).
    kind: DbEnum(AgentKind) | None = Field(default=None)
    # The address a registrar registered this identity under, e.g.
    # `claude-code:session:<id>`. A lookup key, never a credential: getting
    # a key for it takes the registrar's own key (CHT-1498).
    external_ref: str | None = Field(default=None)
    # The registrar (or human) that registered this identity. A historical
    # id with no foreign key on purpose: provenance, not ownership, and a
    # foreign key on users is a hand-written table rebuild. It can name a
    # user that has since been deleted; readers treat that as "registrar
    # unknown" (the principal summary's registered_by_name is then null).
    registered_by_id: str | None = Field(default=None)
    # May this agent register session identities? To be set only by the
    # agent's creator or a team admin (PATCH /agents/{id}, CHT-1498), after
    # which the agent may do nothing else that writes.
    can_register: bool = Field(default=False)

    class Meta:
        is_table = True
        table_name = "users"
        indexes = [
            # One identity per address per team. SQLite treats NULLs as
            # distinct, so humans and hand-made agents (no external_ref)
            # never collide. Created by migration 0023.
            Index(("agent_team_id", "external_ref"), name="users_team_external_ref_uq", unique=True),
            # A registrar's identities: its two caps count by this (CHT-1498).
            Index(("registered_by_id",), name="ix_users_registered_by_id"),
        ]
