"""Oxyde ORM Sprint model."""
import uuid
from datetime import datetime, timezone
from oxyde import OxydeModel, Field


class OxydeSprint(OxydeModel):
    """Sprint/cycle model for time-boxed work."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    project_id: str = Field()
    name: str = Field()
    description: str | None = Field(default=None)
    status: str = Field(default="PLANNED")
    start_date: datetime | None = Field(default=None)
    end_date: datetime | None = Field(default=None)
    budget: int | None = Field(default=None)
    points_spent: int = Field(default=0)
    token_budget: int | None = Field(default=None)
    tokens_spent: int = Field(default=0)
    limbo: bool = Field(default=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

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

    @property
    def token_in_arrears(self) -> bool:
        """Check if sprint is in token arrears."""
        if self.token_budget is None:
            return False
        return self.tokens_spent > self.token_budget

    @property
    def remaining_token_budget(self) -> int | None:
        """Get remaining token budget, or None if unlimited."""
        if self.token_budget is None:
            return None
        return self.token_budget - self.tokens_spent

    class Meta:
        is_table = True
        table_name = "sprints"
