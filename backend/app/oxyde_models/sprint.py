"""Oxyde ORM Sprint model."""
import uuid
from datetime import datetime, timezone
from app.utils.datetimes import DateTimeUTC
from oxyde import Model, Field
from app.enums import SprintStatus
from app.oxyde_models.enums import DbEnum


class OxydeSprint(Model):
    """Sprint/cycle model for time-boxed work."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    project_id: str = Field()
    name: str = Field()
    description: str | None = Field(default=None)
    status: DbEnum(SprintStatus) = Field(default=SprintStatus.PLANNED)

    # Outputs, not inputs (CHT-1366): a sprint has no scheduled dates. It is
    # activated when the previous one closes and closed when its budget is
    # spent, and these record when that turned out to happen.
    activated_at: DateTimeUTC | None = Field(default=None)
    closed_at: DateTimeUTC | None = Field(default=None)
    budget: int | None = Field(default=None)
    points_spent: int = Field(default=0)
    limbo: bool = Field(default=False)
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    @property
    def in_arrears(self) -> bool:
        """Check if sprint is in arrears (over budget)."""
        if self.budget is None:
            return False
        return self.points_spent > self.budget

    @property
    def remaining_budget(self) -> int | None:
        """Get remaining budget points, or None if unlimited."""
        if self.budget is None:
            return None
        return self.budget - self.points_spent

    class Meta:
        is_table = True
        table_name = "sprints"
