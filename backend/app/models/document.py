"""Document model."""
from datetime import datetime, timezone
from enum import Enum
from sqlalchemy import String, DateTime, ForeignKey, Text, Table, Column, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
import uuid


class DocumentActivityType(str, Enum):
    """Type of document activity."""
    CREATED = "doc_created"
    UPDATED = "doc_updated"
    DELETED = "doc_deleted"
    COMMENTED = "doc_commented"


# Association table for document-issue links
document_issues = Table(
    "document_issues",
    Base.metadata,
    Column("document_id", String(36), ForeignKey("documents.id", ondelete="CASCADE"), primary_key=True),
    Column("issue_id", String(36), ForeignKey("issues.id", ondelete="CASCADE"), primary_key=True),
    Column("created_at", DateTime, default=lambda: datetime.now(timezone.utc)),
)

# Association table for document-label links
document_labels = Table(
    "document_labels",
    Base.metadata,
    Column("document_id", String(36), ForeignKey("documents.id", ondelete="CASCADE"), primary_key=True),
    Column("label_id", String(36), ForeignKey("labels.id", ondelete="CASCADE"), primary_key=True),
)


class Document(Base):
    """Document model for team documentation."""

    __tablename__ = "documents"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    team_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("teams.id", ondelete="CASCADE")
    )
    author_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE")
    )
    project_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("projects.id", ondelete="SET NULL"), nullable=True
    )
    sprint_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("sprints.id", ondelete="SET NULL"), nullable=True
    )
    title: Mapped[str] = mapped_column(String(500))
    content: Mapped[str | None] = mapped_column(Text, nullable=True)
    icon: Mapped[str | None] = mapped_column(String(50), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    team: Mapped["Team"] = relationship("Team", back_populates="documents")
    author: Mapped["User"] = relationship("User", back_populates="documents")
    project: Mapped["Project | None"] = relationship("Project")
    sprint: Mapped["Sprint | None"] = relationship("Sprint", back_populates="documents")
    issues: Mapped[list["Issue"]] = relationship(
        "Issue", secondary=document_issues, back_populates="documents"
    )
    comments: Mapped[list["DocumentComment"]] = relationship(
        "DocumentComment", back_populates="document", cascade="all, delete-orphan"
    )
    labels: Mapped[list["Label"]] = relationship(
        "Label", secondary=document_labels, back_populates="documents"
    )


class DocumentComment(Base):
    """Comment on a document."""

    __tablename__ = "document_comments"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    document_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("documents.id", ondelete="CASCADE")
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
    document: Mapped["Document"] = relationship("Document", back_populates="comments")
    author: Mapped["User"] = relationship("User")


class DocumentActivity(Base):
    """Activity log for documents."""

    __tablename__ = "document_activities"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    document_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("documents.id", ondelete="CASCADE"), nullable=True
    )
    team_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("teams.id", ondelete="CASCADE")
    )
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE")
    )
    activity_type: Mapped[DocumentActivityType] = mapped_column(SQLEnum(DocumentActivityType))
    # Store document title/icon at time of activity (for deleted docs)
    document_title: Mapped[str | None] = mapped_column(String(500), nullable=True)
    document_icon: Mapped[str | None] = mapped_column(String(50), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    document: Mapped["Document | None"] = relationship("Document")
    team: Mapped["Team"] = relationship("Team")
    user: Mapped["User"] = relationship("User")


# Import here to avoid circular imports
from app.models.team import Team
from app.models.user import User
from app.models.project import Project
from app.models.sprint import Sprint
from app.models.issue import Issue, Label
