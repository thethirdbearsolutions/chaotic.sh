"""Project model."""
from datetime import datetime, timezone
from enum import Enum
from sqlalchemy import String, DateTime, ForeignKey, Integer, Boolean, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
import uuid


class EstimateScale(str, Enum):
    """Available estimation scales for projects."""
    FIBONACCI = "fibonacci"           # 1, 2, 3, 5, 8, 13, 21
    LINEAR = "linear"                 # 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    POWERS_OF_2 = "powers_of_2"       # 1, 2, 4, 8, 16, 32, 64
    TSHIRT = "tshirt"                 # XS, S, M, L, XL (stored as 1, 2, 3, 5, 8)


class UnestimatedHandling(str, Enum):
    """How to handle unestimated issues for sprint budget."""
    DEFAULT_ONE_POINT = "default_one_point"      # Count as 1 point
    BLOCK_UNTIL_ESTIMATED = "block_until_estimated"  # Block completion


class Project(Base):
    """Project model for organizing issues."""

    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    team_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("teams.id", ondelete="CASCADE")
    )
    name: Mapped[str] = mapped_column(String(255))
    key: Mapped[str] = mapped_column(String(10), index=True)
    description: Mapped[str | None] = mapped_column(String(2000), nullable=True)
    color: Mapped[str] = mapped_column(String(7), default="#6366f1")  # Hex color
    icon: Mapped[str | None] = mapped_column(String(50), nullable=True)
    lead_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    issue_count: Mapped[int] = mapped_column(Integer, default=0)
    estimate_scale: Mapped[EstimateScale] = mapped_column(
        SQLEnum(EstimateScale), default=EstimateScale.FIBONACCI
    )
    unestimated_handling: Mapped[UnestimatedHandling] = mapped_column(
        SQLEnum(UnestimatedHandling), default=UnestimatedHandling.DEFAULT_ONE_POINT
    )
    default_sprint_budget: Mapped[int | None] = mapped_column(
        Integer, nullable=True, default=None
    )  # Default budget for new sprints; null = unlimited
    human_rituals_required: Mapped[bool] = mapped_column(
        Boolean, default=False
    )  # Whether humans must complete rituals (False = humans can skip)
    require_estimate_on_claim: Mapped[bool] = mapped_column(
        Boolean, default=False
    )  # Require estimate when creating/claiming issues
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    team: Mapped["Team"] = relationship("Team", back_populates="projects")
    lead: Mapped["User | None"] = relationship("User", foreign_keys=[lead_id])
    issues: Mapped[list["Issue"]] = relationship(
        "Issue", back_populates="project", cascade="all, delete-orphan"
    )
    sprints: Mapped[list["Sprint"]] = relationship(
        "Sprint", back_populates="project", cascade="all, delete-orphan"
    )
    rituals: Mapped[list["Ritual"]] = relationship(
        "Ritual", back_populates="project", cascade="all, delete-orphan"
    )
    ritual_groups: Mapped[list["RitualGroup"]] = relationship(
        "RitualGroup", back_populates="project", cascade="all, delete-orphan"
    )


# Import here to avoid circular imports
from app.models.team import Team
from app.models.user import User
from app.models.issue import Issue
from app.models.sprint import Sprint
from app.models.ritual import Ritual, RitualGroup
