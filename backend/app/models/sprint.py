"""Sprint model."""
from datetime import datetime, timezone
from enum import Enum
from sqlalchemy import String, DateTime, ForeignKey, Integer, Boolean, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
import uuid


class SprintStatus(str, Enum):
    """Sprint status."""
    PLANNED = "planned"
    ACTIVE = "active"
    COMPLETED = "completed"


class Sprint(Base):
    """Sprint/cycle model for time-boxed work."""

    __tablename__ = "sprints"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    project_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("projects.id", ondelete="CASCADE")
    )
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(String(2000), nullable=True)
    status: Mapped[SprintStatus] = mapped_column(
        SQLEnum(SprintStatus), default=SprintStatus.PLANNED
    )
    start_date: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    end_date: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    # Sprint budget fields (points)
    budget: Mapped[int | None] = mapped_column(Integer, nullable=True)  # null = unlimited
    points_spent: Mapped[int] = mapped_column(Integer, default=0)

    # Sprint budget fields (tokens) - for tracking API costs
    token_budget: Mapped[int | None] = mapped_column(Integer, nullable=True)  # null = unlimited
    tokens_spent: Mapped[int] = mapped_column(Integer, default=0)

    limbo: Mapped[bool] = mapped_column(Boolean, default=False)  # Ritual limbo state

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )

    @property
    def in_arrears(self) -> bool:
        """Check if sprint is in arrears (over budget)."""
        if self.budget is None:
            return False
        return self.points_spent > self.budget

    @property
    def remaining_budget(self) -> int | None:
        """Get remaining budget points, or None if unlimited."""
        if self.budget is None:
            return None
        return self.budget - self.points_spent

    @property
    def token_in_arrears(self) -> bool:
        """Check if sprint is in token arrears (over token budget)."""
        if self.token_budget is None:
            return False
        return self.tokens_spent > self.token_budget

    @property
    def remaining_token_budget(self) -> int | None:
        """Get remaining token budget, or None if unlimited."""
        if self.token_budget is None:
            return None
        return self.token_budget - self.tokens_spent

    # Relationships
    project: Mapped["Project"] = relationship("Project", back_populates="sprints")
    issues: Mapped[list["Issue"]] = relationship("Issue", back_populates="sprint")
    documents: Mapped[list["Document"]] = relationship("Document", back_populates="sprint")


# Import here to avoid circular imports
from app.models.project import Project
from app.models.issue import Issue
from app.models.document import Document
