"""Project schemas."""
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.enums import EstimateScale, UnestimatedHandling
from app.utils import DateTimeUTC


class ProjectCreate(BaseModel):
    """Schema for creating a project."""

    name: str = Field(min_length=1, max_length=255)
    key: str = Field(min_length=2, max_length=10, pattern=r"^[A-Z0-9]+$")
    description: str | None = None
    color: str = "#6366f1"
    icon: str | None = None
    lead_id: str | None = None
    estimate_scale: EstimateScale = EstimateScale.FIBONACCI
    unestimated_handling: UnestimatedHandling = UnestimatedHandling.DEFAULT_ONE_POINT
    default_sprint_budget: int | None = Field(default=None, ge=1)
    human_rituals_required: bool = False  # Whether humans must complete rituals
    require_estimate_on_claim: bool = False


class ProjectUpdate(BaseModel):
    """Schema for updating a project."""

    name: str | None = None
    description: str | None = None
    color: str | None = None
    icon: str | None = None
    lead_id: str | None = None
    estimate_scale: EstimateScale | None = None
    unestimated_handling: UnestimatedHandling | None = None
    default_sprint_budget: int | None = Field(default=None, ge=1)
    human_rituals_required: bool | None = None
    require_estimate_on_claim: bool | None = None


class ProjectResponse(BaseModel):
    """Schema for project response."""

    id: str
    team_id: str
    name: str
    key: str
    description: str | None
    color: str
    icon: str | None
    lead_id: str | None
    issue_count: int
    estimate_scale: EstimateScale
    unestimated_handling: UnestimatedHandling
    default_sprint_budget: int | None
    human_rituals_required: bool
    require_estimate_on_claim: bool
    created_at: DateTimeUTC
    updated_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)
