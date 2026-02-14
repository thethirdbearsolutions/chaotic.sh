"""Ritual model for sprint transition ceremonies."""
from datetime import datetime, timezone
from enum import Enum
from sqlalchemy import String, DateTime, ForeignKey, Text, Enum as SQLEnum, Boolean, CheckConstraint, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
import uuid


class RitualTrigger(str, Enum):
    """When a ritual is required."""
    EVERY_SPRINT = "every_sprint"  # Required every sprint close
    TICKET_CLOSE = "ticket_close"  # Required when closing a ticket
    TICKET_CLAIM = "ticket_claim"  # Required when claiming a ticket (→ in_progress)


class ApprovalMode(str, Enum):
    """How ritual attestation is approved."""
    AUTO = "auto"        # Agent attestation clears immediately
    REVIEW = "review"    # Human must approve attestation
    GATE = "gate"        # Human must perform (agent cannot attest)


class SelectionMode(str, Enum):
    """How rituals in a group are selected."""
    RANDOM_ONE = "random_one"      # Pick one ritual randomly (weighted)
    ROUND_ROBIN = "round_robin"    # Rotate through rituals per sprint
    PERCENTAGE = "percentage"      # Each ritual has independent X% chance


class RitualGroup(Base):
    """Group of rituals with selection logic.

    Rituals in a group are alternatives - only some are selected based on
    the selection_mode. Rituals not in a group are always selected.
    """

    __tablename__ = "ritual_groups"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    project_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("projects.id", ondelete="CASCADE")
    )
    name: Mapped[str] = mapped_column(String(100))  # e.g., "Weekly Mindfulness"
    selection_mode: Mapped[SelectionMode] = mapped_column(
        SQLEnum(SelectionMode), default=SelectionMode.RANDOM_ONE
    )
    # For round-robin: track which ritual was last selected
    last_selected_ritual_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("rituals.id", ondelete="SET NULL"), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    project: Mapped["Project"] = relationship("Project", back_populates="ritual_groups")
    rituals: Mapped[list["Ritual"]] = relationship(
        "Ritual", back_populates="group", foreign_keys="Ritual.group_id"
    )


class Ritual(Base):
    """Ritual definition for a project.

    Rituals are mindfulness checkpoints at sprint boundaries.
    When a sprint closes, pending rituals must be attested before
    the next sprint can begin (limbo state).
    """

    __tablename__ = "rituals"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    project_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("projects.id", ondelete="CASCADE")
    )
    name: Mapped[str] = mapped_column(String(100))  # e.g., "run-tests"
    prompt: Mapped[str] = mapped_column(Text)  # e.g., "Run the test suite and verify all pass"
    trigger: Mapped[RitualTrigger] = mapped_column(
        SQLEnum(RitualTrigger), default=RitualTrigger.EVERY_SPRINT
    )
    approval_mode: Mapped[ApprovalMode] = mapped_column(
        SQLEnum(ApprovalMode), default=ApprovalMode.AUTO
    )
    note_required: Mapped[bool] = mapped_column(Boolean, default=True)
    conditions: Mapped[str | None] = mapped_column(Text, nullable=True)  # JSON conditions

    # Group membership (optional)
    group_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("ritual_groups.id", ondelete="SET NULL"), nullable=True
    )
    # Weight for random selection (higher = more likely), default 1.0
    weight: Mapped[float] = mapped_column(default=1.0)
    # Percentage chance for PERCENTAGE mode (0-100), nullable
    percentage: Mapped[float | None] = mapped_column(nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # Relationships
    project: Mapped["Project"] = relationship("Project", back_populates="rituals")
    group: Mapped["RitualGroup | None"] = relationship(
        "RitualGroup", back_populates="rituals", foreign_keys=[group_id]
    )
    attestations: Mapped[list["RitualAttestation"]] = relationship(
        "RitualAttestation", back_populates="ritual", cascade="all, delete-orphan"
    )

    @property
    def group_name(self) -> str | None:
        """Get the group name if ritual is in a group."""
        return self.group.name if self.group else None


class RitualAttestation(Base):
    """Record of a ritual being attested for a specific sprint or ticket.

    Tracks who attested, when, and (for review mode) approval status.
    For EVERY_SPRINT rituals, sprint_id is set.
    For TICKET_CLOSE rituals, issue_id is set.
    """

    __tablename__ = "ritual_attestations"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    ritual_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("rituals.id", ondelete="CASCADE")
    )
    # For sprint rituals (nullable for ticket-close rituals)
    sprint_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("sprints.id", ondelete="CASCADE"), nullable=True
    )
    # For ticket-close rituals (nullable for sprint rituals)
    issue_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("issues.id", ondelete="CASCADE"), nullable=True
    )

    # Attestation details
    attested_by: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    attested_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )
    note: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Approval (for review mode)
    approved_by: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    approved_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    # Relationships
    ritual: Mapped["Ritual"] = relationship("Ritual", back_populates="attestations")
    sprint: Mapped["Sprint | None"] = relationship("Sprint")
    issue: Mapped["Issue | None"] = relationship("Issue")
    attester: Mapped["User | None"] = relationship("User", foreign_keys=[attested_by])
    approver: Mapped["User | None"] = relationship("User", foreign_keys=[approved_by])

    # Ensure exactly one of sprint_id or issue_id is set (CHT-134)
    # Prevent duplicate attestations for the same ritual+issue or ritual+sprint (CHT-136)
    __table_args__ = (
        CheckConstraint(
            "(sprint_id IS NOT NULL AND issue_id IS NULL) OR "
            "(sprint_id IS NULL AND issue_id IS NOT NULL)",
            name="ck_attestation_sprint_or_issue_exclusive"
        ),
        UniqueConstraint("ritual_id", "issue_id", name="uq_attestation_ritual_issue"),
        UniqueConstraint("ritual_id", "sprint_id", name="uq_attestation_ritual_sprint"),
    )


# Import here to avoid circular imports
from app.models.project import Project
from app.models.sprint import Sprint
from app.models.user import User
from app.models.issue import Issue
