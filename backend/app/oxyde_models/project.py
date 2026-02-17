"""Oxyde ORM Project model."""
import uuid
from datetime import datetime, timezone
from oxyde import OxydeModel, Field
from app.models.project import EstimateScale, UnestimatedHandling


class OxydeProject(OxydeModel):
    """Project model for organizing issues."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    team_id: str = Field()
    name: str = Field()
    key: str = Field(db_index=True)
    description: str | None = Field(default=None)
    color: str = Field(default="#6366f1")
    icon: str | None = Field(default=None)
    lead_id: str | None = Field(default=None)
    issue_count: int = Field(default=0)
    estimate_scale: str = Field(default=EstimateScale.FIBONACCI.name)
    unestimated_handling: str = Field(default=UnestimatedHandling.DEFAULT_ONE_POINT.name)

    @property
    def estimate_scale_enum(self) -> EstimateScale:
        return EstimateScale[self.estimate_scale]

    @property
    def unestimated_handling_enum(self) -> UnestimatedHandling:
        return UnestimatedHandling[self.unestimated_handling]

    default_sprint_budget: int | None = Field(default=None)
    human_rituals_required: bool = Field(default=False)
    require_estimate_on_claim: bool = Field(default=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "projects"
