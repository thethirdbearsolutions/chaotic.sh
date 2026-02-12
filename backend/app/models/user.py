"""User model."""
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
import uuid


class User(Base):
    """User model for authentication and identification.

    Users can be either human users or agent users.
    Agent users have is_agent=True and are linked to a parent human user.
    Agents inherit team membership from their parent and have scope restrictions.
    """

    __tablename__ = "users"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    name: Mapped[str] = mapped_column(String(255))
    avatar_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )

    # Agent-specific fields
    is_agent: Mapped[bool] = mapped_column(Boolean, default=False)
    parent_user_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=True
    )
    # For agents: team scope (required for agents, null for humans)
    agent_team_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("teams.id", ondelete="CASCADE"), nullable=True
    )
    # For agents: project scope (null = team-wide access)
    agent_project_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("projects.id", ondelete="CASCADE"), nullable=True
    )

    # Relationships
    team_memberships: Mapped[list["TeamMember"]] = relationship(
        "TeamMember", back_populates="user", cascade="all, delete-orphan"
    )
    assigned_issues: Mapped[list["Issue"]] = relationship(
        "Issue", back_populates="assignee", foreign_keys="Issue.assignee_id"
    )
    created_issues: Mapped[list["Issue"]] = relationship(
        "Issue", back_populates="creator", foreign_keys="Issue.creator_id"
    )
    comments: Mapped[list["IssueComment"]] = relationship(
        "IssueComment", back_populates="author", cascade="all, delete-orphan"
    )
    documents: Mapped[list["Document"]] = relationship(
        "Document", back_populates="author", cascade="all, delete-orphan"
    )
    activities: Mapped[list["IssueActivity"]] = relationship(
        "IssueActivity", back_populates="user", cascade="all, delete-orphan"
    )
    api_keys: Mapped[list["APIKey"]] = relationship(
        "APIKey", back_populates="user", cascade="all, delete-orphan",
        foreign_keys="APIKey.user_id"
    )

    # Agent relationships
    parent_user: Mapped["User | None"] = relationship(
        "User", back_populates="child_agents", remote_side="User.id",
        foreign_keys="User.parent_user_id"
    )
    child_agents: Mapped[list["User"]] = relationship(
        "User", back_populates="parent_user", cascade="all, delete-orphan",
        foreign_keys="User.parent_user_id"
    )
    agent_team: Mapped["Team | None"] = relationship(
        "Team", foreign_keys="User.agent_team_id"
    )
    agent_project: Mapped["Project | None"] = relationship(
        "Project", foreign_keys="User.agent_project_id"
    )


# Import here to avoid circular imports
from app.models.team import Team, TeamMember
from app.models.project import Project
from app.models.issue import Issue, IssueComment, IssueActivity
from app.models.document import Document
from app.models.api_key import APIKey
