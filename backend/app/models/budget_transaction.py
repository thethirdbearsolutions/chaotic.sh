"""Budget transaction model for tracking effort spent."""
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
import uuid


class BudgetTransaction(Base):
    """Records effort spent when issues are completed.

    This is a permanent audit trail - points deducted from sprint budgets
    are recorded here with denormalized issue/sprint info for historical accuracy.
    """

    __tablename__ = "budget_transactions"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    sprint_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("sprints.id", ondelete="CASCADE")
    )
    issue_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("issues.id", ondelete="SET NULL"), nullable=True
    )
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    points: Mapped[int] = mapped_column(Integer)  # Effort spent (always positive)
    tokens: Mapped[int | None] = mapped_column(Integer, nullable=True)  # Token cost (optional)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    # Denormalized for permanent historical record
    # (issue/sprint may be renamed or deleted, but ledger preserves original values)
    issue_identifier: Mapped[str] = mapped_column(String(20))
    issue_title: Mapped[str] = mapped_column(String(500))
    sprint_name: Mapped[str] = mapped_column(String(255))

    # Relationships
    sprint: Mapped["Sprint"] = relationship("Sprint")
    issue: Mapped["Issue"] = relationship("Issue")
    user: Mapped["User"] = relationship("User")


# Import here to avoid circular imports
from app.models.sprint import Sprint
from app.models.issue import Issue
from app.models.user import User
