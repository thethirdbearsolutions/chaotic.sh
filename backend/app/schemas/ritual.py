"""Ritual schemas."""
import json
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, field_validator
from app.enums import RitualTrigger, ApprovalMode, SelectionMode
from app.utils import DateTimeUTC
import re

# Supported condition fields and operators
CONDITION_FIELDS = {"estimate", "priority", "issue_type", "status", "labels"}
CONDITION_OPERATORS = {"eq", "in", "gte", "lte", "contains", "isnull"}


def validate_conditions(conditions: dict | None) -> dict | None:
    """Validate ritual conditions use supported fields and operators.

    Raises ValueError if any condition key is malformed or uses unknown fields/operators.
    """
    if conditions is None:
        return None

    if not isinstance(conditions, dict):
        raise ValueError("Conditions must be a dictionary")

    for key, value in conditions.items():
        parts = key.split("__")
        if len(parts) != 2:
            raise ValueError(
                f"Invalid condition key '{key}'. Must be in format 'field__operator' "
                f"(e.g., 'estimate__gte')"
            )

        field, operator = parts

        if field not in CONDITION_FIELDS:
            raise ValueError(
                f"Unknown field '{field}' in condition '{key}'. "
                f"Supported fields: {', '.join(sorted(CONDITION_FIELDS))}"
            )

        if operator not in CONDITION_OPERATORS:
            raise ValueError(
                f"Unknown operator '{operator}' in condition '{key}'. "
                f"Supported operators: {', '.join(sorted(CONDITION_OPERATORS))}"
            )

    return conditions


# ============================================================================
# Ritual Group Schemas
# ============================================================================


class RitualGroupCreate(BaseModel):
    """Schema for creating a ritual group."""

    name: str = Field(min_length=1, max_length=100)
    selection_mode: SelectionMode = SelectionMode.RANDOM_ONE


class RitualGroupUpdate(BaseModel):
    """Schema for updating a ritual group."""

    name: str | None = None
    selection_mode: SelectionMode | None = None


class RitualGroupResponse(BaseModel):
    """Schema for ritual group response."""

    id: str
    project_id: str
    name: str
    selection_mode: SelectionMode
    last_selected_ritual_id: str | None = None
    created_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)



# ============================================================================
# Ritual Schemas
# ============================================================================


class RitualCreate(BaseModel):
    """Schema for creating a ritual."""

    name: str = Field(min_length=1, max_length=100)
    prompt: str = Field(min_length=1)
    trigger: RitualTrigger = RitualTrigger.EVERY_SPRINT
    approval_mode: ApprovalMode = ApprovalMode.AUTO
    note_required: bool = True
    conditions: dict | None = None  # Django-style conditions e.g. {"estimate__gte": 3}
    group_id: str | None = None  # Optional group membership
    weight: float = Field(default=1.0, ge=0)  # Weight for random selection
    percentage: float | None = Field(default=None, ge=0, le=100)  # For PERCENTAGE mode

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        """Validate ritual name contains only alphanumeric, hyphens, and underscores.

        Names cannot start or end with hyphens (to avoid CLI parsing issues).
        """
        # Regex allows alphanumeric/underscore at start and end, hyphens only in middle
        # This rejects: -test, test-, -, --
        # But allows: test-ritual, _test, test_, a, run-tests
        if not re.match(r"^[a-zA-Z0-9_]([a-zA-Z0-9_-]*[a-zA-Z0-9_])?$", v):
            raise ValueError(
                "Ritual name must start and end with alphanumeric characters or underscores. "
                "May contain hyphens in the middle. No spaces or special characters allowed."
            )
        if len(v) > 100:
            raise ValueError("Ritual name must be at most 100 characters")
        return v

    @field_validator("conditions")
    @classmethod
    def validate_conditions_field(cls, v: dict | None) -> dict | None:
        """Validate conditions use supported fields and operators."""
        return validate_conditions(v)


class RitualUpdate(BaseModel):
    """Schema for updating a ritual."""

    name: str | None = None
    prompt: str | None = None
    trigger: RitualTrigger | None = None
    approval_mode: ApprovalMode | None = None
    note_required: bool | None = None
    conditions: dict | None = None  # Django-style conditions e.g. {"estimate__gte": 3}
    group_id: str | None = None  # Optional group membership (use "" to remove from group)
    weight: float | None = Field(default=None, ge=0)  # Weight for random selection
    percentage: float | None = Field(default=None, ge=0, le=100)  # For PERCENTAGE mode
    is_active: bool | None = None  # Set to True to restore a soft-deleted ritual

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str | None) -> str | None:
        """Validate ritual name contains only alphanumeric, hyphens, and underscores.

        Names cannot start or end with hyphens (to avoid CLI parsing issues).
        """
        if v is not None:
            # Regex allows alphanumeric/underscore at start and end, hyphens only in middle
            # This rejects: -test, test-, -, --
            # But allows: test-ritual, _test, test_, a, run-tests
            if not re.match(r"^[a-zA-Z0-9_]([a-zA-Z0-9_-]*[a-zA-Z0-9_])?$", v):
                raise ValueError(
                    "Ritual name must start and end with alphanumeric characters or underscores. "
                    "May contain hyphens in the middle. No spaces or special characters allowed."
                )
            if len(v) > 100:
                raise ValueError("Ritual name must be at most 100 characters")
        return v

    @field_validator("conditions")
    @classmethod
    def validate_conditions_field(cls, v: dict | None) -> dict | None:
        """Validate conditions use supported fields and operators."""
        return validate_conditions(v)


class RitualResponse(BaseModel):
    """Schema for ritual response."""

    id: str
    project_id: str
    name: str
    prompt: str
    trigger: RitualTrigger
    approval_mode: ApprovalMode
    note_required: bool
    conditions: dict | None = None  # Django-style conditions
    group_id: str | None = None
    group_name: str | None = None  # Populated from relationship
    weight: float = 1.0
    percentage: float | None = None
    is_active: bool = True
    created_at: DateTimeUTC
    updated_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)

    @field_validator("conditions", mode="before")
    @classmethod
    def parse_conditions(cls, v):
        """Parse JSON string to dict if needed."""
        if v is None:
            return None
        if isinstance(v, str):
            return json.loads(v)
        return v


class RitualAttestationCreate(BaseModel):
    """Schema for creating a ritual attestation."""

    note: str | None = None


class RitualAttestationResponse(BaseModel):
    """Schema for ritual attestation response."""

    id: str
    ritual_id: str
    sprint_id: str | None  # For sprint rituals
    issue_id: str | None  # For ticket-close rituals
    attested_by: str
    attested_by_name: str | None = None  # User's display name
    attested_at: DateTimeUTC
    note: str | None
    approved_by: str | None
    approved_by_name: str | None = None  # Approver's display name
    approved_at: DateTimeUTC | None

    model_config = ConfigDict(from_attributes=True)


class PendingRitualResponse(BaseModel):
    """Schema for a pending ritual (not yet attested for current sprint)."""

    id: str
    name: str
    prompt: str
    trigger: RitualTrigger | None = None  # ticket_close or ticket_claim
    approval_mode: ApprovalMode
    note_required: bool
    conditions: dict | None = None  # Django-style conditions
    # If attested but pending approval
    attestation: RitualAttestationResponse | None = None

    @field_validator("conditions", mode="before")
    @classmethod
    def parse_conditions(cls, v):
        """Parse JSON string to dict if needed."""
        if v is None:
            return None
        if isinstance(v, str):
            return json.loads(v)
        return v


class CompletedRitualResponse(BaseModel):
    """Schema for a completed ritual with attestation details.

    Includes all fields from RitualResponse for backward compatibility,
    plus the attestation details.
    """

    id: str
    project_id: str
    name: str
    prompt: str
    trigger: RitualTrigger
    approval_mode: ApprovalMode
    conditions: dict | None = None  # Django-style conditions
    created_at: DateTimeUTC
    updated_at: DateTimeUTC
    attestation: RitualAttestationResponse

    @field_validator("conditions", mode="before")
    @classmethod
    def parse_conditions(cls, v):
        """Parse JSON string to dict if needed."""
        if v is None:
            return None
        if isinstance(v, str):
            return json.loads(v)
        return v


class LimboStatusResponse(BaseModel):
    """Schema for limbo status check."""

    in_limbo: bool
    sprint_id: str | None
    pending_rituals: list[PendingRitualResponse]
    completed_rituals: list[CompletedRitualResponse]


class TicketRitualsStatusResponse(BaseModel):
    """Schema for ticket-close rituals status check."""

    issue_id: str
    pending_rituals: list[PendingRitualResponse]
    completed_rituals: list[CompletedRitualResponse]


class RitualAttestationHistoryItem(BaseModel):
    """Schema for attestation history response."""

    id: str
    ritual_name: str
    ritual_trigger: str
    approval_mode: str
    sprint_id: str | None = None
    sprint_name: str | None = None
    issue_id: str | None = None
    issue_identifier: str | None = None
    attested_by_name: str
    attested_at: DateTimeUTC
    note: str | None = None
    approved_by_name: str | None = None
    approved_at: DateTimeUTC | None = None


class PendingGateRitualInfo(BaseModel):
    """Info about a pending GATE ritual on an issue in limbo."""

    ritual_id: str
    ritual_name: str
    ritual_prompt: str
    trigger: str  # ticket_close or ticket_claim
    limbo_type: str  # claim or close
    requested_by_name: str  # Who is waiting for approval
    requested_at: str | None  # ISO timestamp of when they tried


class PendingGateIssueResponse(BaseModel):
    """Schema for an issue in limbo waiting for GATE approval."""

    issue_id: str
    identifier: str
    title: str
    status: str
    project_id: str
    project_name: str
    pending_gates: list[PendingGateRitualInfo]


class PendingApprovalRitualInfo(BaseModel):
    """Info about a pending approval (GATE or REVIEW) on an issue."""

    ritual_id: str
    ritual_name: str
    ritual_prompt: str
    trigger: str  # ticket_close or ticket_claim
    approval_mode: str  # gate or review
    limbo_type: str | None  # claim or close (GATE only)
    requested_by_name: str  # Who is waiting (GATE: who tried, REVIEW: who attested)
    requested_at: str | None  # ISO timestamp
    attestation_note: str | None  # The attestation content (REVIEW only)


class PendingApprovalIssueResponse(BaseModel):
    """Schema for an issue with pending approvals (GATE and/or REVIEW)."""

    issue_id: str
    identifier: str
    title: str
    status: str
    project_id: str
    project_name: str
    pending_approvals: list[PendingApprovalRitualInfo]
