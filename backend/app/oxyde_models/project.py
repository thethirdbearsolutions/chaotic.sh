"""Oxyde ORM Project model."""
import uuid
from datetime import datetime, timezone
from app.utils.datetimes import DateTimeUTC
from oxyde import Model, Field, Index
from app.enums import EstimateScale, UnestimatedHandling
from app.oxyde_models.enums import DbEnum


class OxydeProject(Model):
    """Project model for organizing issues."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    team_id: str = Field()
    name: str = Field()
    # Not db_unique=True: keys are only unique *within* a team (two teams
    # may share a key). See Meta.indexes for the compound constraint
    # (CHT-1223) -- migration 0008 adds it; ProjectService.create()
    # catches the resulting IntegrityError on a lost create-create race.
    key: str = Field(db_index=True)
    description: str | None = Field(default=None)
    color: str = Field(default="#6366f1")
    icon: str | None = Field(default=None)
    lead_id: str | None = Field(default=None)
    issue_count: int = Field(default=0)
    estimate_scale: DbEnum(EstimateScale) = Field(default=EstimateScale.FIBONACCI)
    unestimated_handling: DbEnum(UnestimatedHandling) = Field(default=UnestimatedHandling.DEFAULT_ONE_POINT)

    default_sprint_budget: int | None = Field(default=None)
    human_rituals_required: bool = Field(default=False)
    require_estimate_on_claim: bool = Field(default=False)
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "projects"
        indexes = [
            Index(("team_id", "key"), unique=True, name="projects_team_id_key_idx"),
        ]
