"""TicketLimbo model for tracking tickets blocked by GATE rituals."""
from datetime import datetime, timezone
from enum import Enum
from sqlalchemy import String, DateTime, ForeignKey, Enum as SQLEnum, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
import uuid


class LimboType(str, Enum):
    """Type of limbo - what action was blocked."""
    CLAIM = "claim"  # User tried to move ticket to in_progress
    CLOSE = "close"  # User tried to move ticket to done/cancelled


class TicketLimbo(Base):
    """Tracks when tickets are blocked by GATE rituals.

    When a user tries to claim or close a ticket that has incomplete GATE rituals,
    a limbo record is created. This allows the GATE Approvals view to show only
    tickets that are actively waiting for approval.

    A ticket can have multiple limbo records (e.g., different rituals blocking).
    When a GATE ritual is completed/approved, the corresponding limbo records
    are cleared.
    """

    __tablename__ = "ticket_limbo"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    issue_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("issues.id", ondelete="CASCADE")
    )
    ritual_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("rituals.id", ondelete="CASCADE")
    )
    limbo_type: Mapped[LimboType] = mapped_column(SQLEnum(LimboType))

    # Who requested the action that was blocked
    requested_by_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE")
    )
    requested_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    # Cleared when the GATE ritual is completed/approved
    cleared_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    cleared_by_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )

    # Relationships
    issue: Mapped["Issue"] = relationship("Issue", back_populates="limbo_records")
    ritual: Mapped["Ritual"] = relationship("Ritual")
    requested_by: Mapped["User"] = relationship("User", foreign_keys=[requested_by_id])
    cleared_by: Mapped["User"] = relationship("User", foreign_keys=[cleared_by_id])


# Import here to avoid circular imports
from app.models.issue import Issue
from app.models.ritual import Ritual
from app.models.user import User
