"""Oxyde ORM Ritual models.

Phase 2 migration from SQLAlchemy.
"""
import uuid
from datetime import datetime, timezone
from oxyde import OxydeModel, Field
from app.oxyde_models.user import OxydeUser  # noqa: F401 — needed for FK resolution
from app.oxyde_models.issue import OxydeIssue  # noqa: F401 — needed for FK resolution
from app.oxyde_models.sprint import OxydeSprint  # noqa: F401 — needed for FK resolution
from app.models.ritual import RitualTrigger, ApprovalMode, SelectionMode
from app.oxyde_models.issue import _to_enum


class OxydeRitualGroup(OxydeModel):
    """Group of rituals with selection logic."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    project_id: str = Field()
    name: str = Field()
    selection_mode: str = Field(default=SelectionMode.RANDOM_ONE.name)
    last_selected_ritual_id: str | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @property
    def selection_mode_enum(self) -> SelectionMode:
        return _to_enum(SelectionMode, self.selection_mode)

    class Meta:
        is_table = True
        table_name = "ritual_groups"


class OxydeRitual(OxydeModel):
    """Ritual definition for a project."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    project_id: str = Field()
    name: str = Field()
    prompt: str = Field()
    trigger: str = Field(default=RitualTrigger.EVERY_SPRINT.name)
    approval_mode: str = Field(default=ApprovalMode.AUTO.name)
    note_required: bool = Field(default=True)
    conditions: str | None = Field(default=None)
    group_id: str | None = Field(default=None)
    weight: float = Field(default=1.0)
    percentage: float | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = Field(default=True)

    @property
    def trigger_enum(self) -> RitualTrigger:
        return _to_enum(RitualTrigger, self.trigger)

    @property
    def approval_mode_enum(self) -> ApprovalMode:
        return _to_enum(ApprovalMode, self.approval_mode)

    @property
    def group_name(self) -> str | None:
        """Get the group name if ritual is in a group.

        Requires manual loading of _group via join or separate query.
        """
        group = getattr(self, '_group', None)
        return group.name if group else None

    class Meta:
        is_table = True
        table_name = "rituals"


class OxydeRitualAttestation(OxydeModel):
    """Record of a ritual being attested for a specific sprint or ticket."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    ritual_id: str = Field()
    sprint_id: str | None = Field(default=None)
    issue_id: str | None = Field(default=None)
    attested_by: str | None = Field(default=None)
    attested_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    note: str | None = Field(default=None)
    approved_by: str | None = Field(default=None)
    approved_at: datetime | None = Field(default=None)

    class Meta:
        is_table = True
        table_name = "ritual_attestations"
