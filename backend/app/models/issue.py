"""Issue and related models."""
from datetime import datetime, timezone
from enum import Enum
from sqlalchemy import String, DateTime, ForeignKey, Integer, Text, Enum as SQLEnum, Table, Column, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
import uuid


class IssueStatus(str, Enum):
    """Issue status."""
    BACKLOG = "backlog"
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    IN_REVIEW = "in_review"
    DONE = "done"
    CANCELED = "canceled"


class IssuePriority(str, Enum):
    """Issue priority."""
    NO_PRIORITY = "no_priority"
    URGENT = "urgent"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class IssueType(str, Enum):
    """Issue type."""
    TASK = "task"
    BUG = "bug"
    FEATURE = "feature"
    CHORE = "chore"
    DOCS = "docs"
    TECH_DEBT = "tech_debt"
    EPIC = "epic"


class IssueRelationType(str, Enum):
    """Type of relationship between issues."""
    BLOCKS = "blocks"
    RELATES_TO = "relates_to"
    DUPLICATES = "duplicates"


# Association table for issue labels
issue_labels = Table(
    "issue_labels",
    Base.metadata,
    Column("issue_id", String(36), ForeignKey("issues.id", ondelete="CASCADE"), primary_key=True),
    Column("label_id", String(36), ForeignKey("labels.id", ondelete="CASCADE"), primary_key=True),
)


class Issue(Base):
    """Issue/task model."""

    __tablename__ = "issues"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    project_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("projects.id", ondelete="CASCADE")
    )
    identifier: Mapped[str] = mapped_column(String(20), unique=True, index=True)
    number: Mapped[int] = mapped_column(Integer)
    title: Mapped[str] = mapped_column(String(500))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[IssueStatus] = mapped_column(
        SQLEnum(IssueStatus), default=IssueStatus.BACKLOG
    )
    priority: Mapped[IssuePriority] = mapped_column(
        SQLEnum(IssuePriority), default=IssuePriority.NO_PRIORITY
    )
    issue_type: Mapped[IssueType] = mapped_column(
        SQLEnum(IssueType), default=IssueType.TASK
    )
    estimate: Mapped[int | None] = mapped_column(Integer, nullable=True)  # Story points
    assignee_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    creator_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE")
    )
    sprint_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("sprints.id", ondelete="SET NULL"), nullable=True
    )
    parent_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("issues.id", ondelete="SET NULL"), nullable=True
    )
    due_date: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    project: Mapped["Project"] = relationship("Project", back_populates="issues")
    assignee: Mapped["User | None"] = relationship(
        "User", back_populates="assigned_issues", foreign_keys=[assignee_id]
    )
    creator: Mapped["User"] = relationship(
        "User", back_populates="created_issues", foreign_keys=[creator_id]
    )
    sprint: Mapped["Sprint | None"] = relationship("Sprint", back_populates="issues")
    parent: Mapped["Issue | None"] = relationship(
        "Issue", back_populates="sub_issues", remote_side=[id]
    )
    sub_issues: Mapped[list["Issue"]] = relationship(
        "Issue", back_populates="parent"
    )
    comments: Mapped[list["IssueComment"]] = relationship(
        "IssueComment", back_populates="issue", cascade="all, delete-orphan"
    )
    labels: Mapped[list["Label"]] = relationship(
        "Label", secondary=issue_labels, back_populates="issues"
    )
    activities: Mapped[list["IssueActivity"]] = relationship(
        "IssueActivity", back_populates="issue", cascade="all, delete-orphan"
    )
    documents: Mapped[list["Document"]] = relationship(
        "Document", secondary="document_issues", back_populates="issues"
    )
    limbo_records: Mapped[list["TicketLimbo"]] = relationship(
        "TicketLimbo", back_populates="issue", cascade="all, delete-orphan"
    )


class IssueComment(Base):
    """Comment on an issue."""

    __tablename__ = "issue_comments"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    issue_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("issues.id", ondelete="CASCADE")
    )
    author_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE")
    )
    content: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    issue: Mapped["Issue"] = relationship("Issue", back_populates="comments")
    author: Mapped["User"] = relationship("User", back_populates="comments")


class ActivityType(str, Enum):
    """Type of activity."""
    CREATED = "created"
    UPDATED = "updated"
    STATUS_CHANGED = "status_changed"
    PRIORITY_CHANGED = "priority_changed"
    ASSIGNED = "assigned"
    UNASSIGNED = "unassigned"
    COMMENTED = "commented"
    LABELED = "labeled"
    UNLABELED = "unlabeled"
    MOVED_TO_SPRINT = "moved_to_sprint"
    REMOVED_FROM_SPRINT = "removed_from_sprint"
    RITUAL_ATTESTED = "ritual_attested"


class IssueActivity(Base):
    """Activity log for issues."""

    __tablename__ = "issue_activities"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    issue_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("issues.id", ondelete="CASCADE")
    )
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE")
    )
    activity_type: Mapped[ActivityType] = mapped_column(SQLEnum(ActivityType))
    field_name: Mapped[str | None] = mapped_column(String(50), nullable=True)
    old_value: Mapped[str | None] = mapped_column(String(500), nullable=True)
    new_value: Mapped[str | None] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    issue: Mapped["Issue"] = relationship("Issue", back_populates="activities")
    user: Mapped["User"] = relationship("User", back_populates="activities")


class Label(Base):
    """Label for categorizing issues."""

    __tablename__ = "labels"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    team_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("teams.id", ondelete="CASCADE")
    )
    name: Mapped[str] = mapped_column(String(100))
    color: Mapped[str] = mapped_column(String(7), default="#6366f1")
    description: Mapped[str | None] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    team: Mapped["Team"] = relationship("Team", back_populates="labels")
    issues: Mapped[list["Issue"]] = relationship(
        "Issue", secondary=issue_labels, back_populates="labels"
    )
    documents: Mapped[list["Document"]] = relationship(
        "Document", secondary="document_labels", back_populates="labels"
    )


class IssueRelation(Base):
    """Relationship between issues (blocks, relates_to, duplicates)."""

    __tablename__ = "issue_relations"
    __table_args__ = (
        UniqueConstraint("issue_id", "related_issue_id", name="uq_issue_relation"),
    )

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    issue_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("issues.id", ondelete="CASCADE")
    )
    related_issue_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("issues.id", ondelete="CASCADE")
    )
    relation_type: Mapped[IssueRelationType] = mapped_column(
        SQLEnum(IssueRelationType), default=IssueRelationType.RELATES_TO
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    issue: Mapped["Issue"] = relationship(
        "Issue", foreign_keys=[issue_id], backref="outgoing_relations"
    )
    related_issue: Mapped["Issue"] = relationship(
        "Issue", foreign_keys=[related_issue_id], backref="incoming_relations"
    )


# Alias for backwards compatibility with models/__init__.py
IssueLabel = issue_labels

# Import here to avoid circular imports
from app.models.project import Project
from app.models.user import User
from app.models.sprint import Sprint
from app.models.team import Team
from app.models.document import Document
from app.models.ticket_limbo import TicketLimbo
