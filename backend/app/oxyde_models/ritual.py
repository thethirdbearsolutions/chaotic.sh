"""Oxyde ORM Ritual models.

Phase 2 migration from SQLAlchemy.
"""
import uuid
from datetime import datetime, timezone
from oxyde import OxydeModel, Field
from app.oxyde_models.user import OxydeUser  # noqa: F401 — needed for FK resolution
from app.oxyde_models.issue import OxydeIssue  # noqa: F401 — needed for FK resolution
from app.oxyde_models.sprint import OxydeSprint  # noqa: F401 — needed for FK resolution
from app.enums import RitualTrigger, ApprovalMode, SelectionMode
from app.oxyde_models.enums import DbEnum


class OxydeRitualGroup(OxydeModel):
    """Group of rituals with selection logic."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    project_id: str = Field()
    name: str = Field()
    selection_mode: DbEnum(SelectionMode) = Field(default=SelectionMode.RANDOM_ONE)
    last_selected_ritual_id: str | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @property
    def rituals(self) -> list:
        """Child rituals. Requires manual loading (no reverse FK in Oxyde)."""
        return getattr(self, '_rituals', [])

    @rituals.setter
    def rituals(self, value: list):
        self._rituals = value

    class Meta:
        is_table = True
        table_name = "ritual_groups"


class OxydeRitual(OxydeModel):
    """Ritual definition for a project."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    project_id: str = Field()
    name: str = Field()
    prompt: str = Field()
    trigger: DbEnum(RitualTrigger) = Field(default=RitualTrigger.EVERY_SPRINT)
    approval_mode: DbEnum(ApprovalMode) = Field(default=ApprovalMode.AUTO)
    note_required: bool = Field(default=True)
    conditions: str | None = Field(default=None)
    group: OxydeRitualGroup | None = Field(default=None, db_on_delete="SET NULL")
    weight: float = Field(default=1.0)
    percentage: float | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = Field(default=True)

    @property
    def group_name(self) -> str | None:
        """Get the group name if ritual is in a group. Requires .join('group')."""
        return self.group.name if self.group else None

    class Meta:
        is_table = True
        table_name = "rituals"


class OxydeRitualAttestation(OxydeModel):
    """Record of a ritual being attested for a specific sprint or ticket."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    ritual: OxydeRitual | None = Field(default=None, db_on_delete="CASCADE")
    sprint: OxydeSprint | None = Field(default=None, db_on_delete="CASCADE")
    issue: OxydeIssue | None = Field(default=None, db_on_delete="CASCADE")
    attested_by: str | None = Field(default=None)
    attested_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    note: str | None = Field(default=None)
    approved_by: str | None = Field(default=None)
    approved_at: datetime | None = Field(default=None)

    @property
    def attester(self):
        """Attester user, set by service code after manual lookup."""
        return getattr(self, '_attester', None)

    @attester.setter
    def attester(self, value):
        self._attester = value

    @property
    def approver(self):
        """Approver user, set by service code after manual lookup."""
        return getattr(self, '_approver', None)

    @approver.setter
    def approver(self, value):
        self._approver = value

    class Meta:
        is_table = True
        table_name = "ritual_attestations"
