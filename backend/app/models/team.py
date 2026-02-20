"""Team models."""
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
from app.enums import TeamRole, InvitationStatus
import uuid


class Team(Base):
    """Team/workspace model."""

    __tablename__ = "teams"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    name: Mapped[str] = mapped_column(String(255))
    key: Mapped[str] = mapped_column(String(10), unique=True, index=True)
    description: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    logo_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    members: Mapped[list["TeamMember"]] = relationship(
        "TeamMember", back_populates="team", cascade="all, delete-orphan"
    )
    projects: Mapped[list["Project"]] = relationship(
        "Project", back_populates="team", cascade="all, delete-orphan"
    )
    invitations: Mapped[list["TeamInvitation"]] = relationship(
        "TeamInvitation", back_populates="team", cascade="all, delete-orphan"
    )
    labels: Mapped[list["Label"]] = relationship(
        "Label", back_populates="team", cascade="all, delete-orphan"
    )
    documents: Mapped[list["Document"]] = relationship(
        "Document", back_populates="team", cascade="all, delete-orphan"
    )


class TeamMember(Base):
    """Team membership model."""

    __tablename__ = "team_members"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    team_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("teams.id", ondelete="CASCADE")
    )
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE")
    )
    role: Mapped[TeamRole] = mapped_column(
        SQLEnum(TeamRole), default=TeamRole.MEMBER
    )
    joined_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    team: Mapped["Team"] = relationship("Team", back_populates="members")
    user: Mapped["User"] = relationship("User", back_populates="team_memberships")


class TeamInvitation(Base):
    """Team invitation model."""

    __tablename__ = "team_invitations"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    team_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("teams.id", ondelete="CASCADE")
    )
    email: Mapped[str] = mapped_column(String(255), index=True)
    role: Mapped[TeamRole] = mapped_column(
        SQLEnum(TeamRole), default=TeamRole.MEMBER
    )
    token: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    invited_by_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"))
    status: Mapped[InvitationStatus] = mapped_column(
        SQLEnum(InvitationStatus), default=InvitationStatus.PENDING
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )
    expires_at: Mapped[datetime] = mapped_column(DateTime)

    # Relationships
    team: Mapped["Team"] = relationship("Team", back_populates="invitations")
    invited_by: Mapped["User"] = relationship("User")


# Import here to avoid circular imports
from app.models.user import User
from app.models.project import Project
from app.models.issue import Label
from app.models.document import Document
