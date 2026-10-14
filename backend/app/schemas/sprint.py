"""Sprint schemas."""
from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator
from app.enums import SprintStatus
from app.utils import DateTimeUTC


class SprintCreate(BaseModel):
    """Schema for creating a sprint."""

    name: str = Field(min_length=1, max_length=255)
    description: str | None = None
    budget: int | None = Field(default=None, ge=1)  # null = use project default or unlimited
    explicit_unlimited: bool = False  # If True, ignore project default and create with unlimited budget


class SprintUpdate(BaseModel):
    """Schema for updating a sprint."""

    name: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = None
    status: SprintStatus | None = None
    budget: int | None = Field(default=None, ge=1)
    # True makes a planned sprint follow the project's default_sprint_budget
    # again: it clears budget_explicit and takes the current default
    # (CHT-1701). null means "not set", for clients that send every field;
    # false is refused: to set a budget by hand, send `budget` instead,
    # which cannot be sent with true.
    budget_follows_default: bool | None = Field(
        default=None,
        description=(
            "true: make a planned sprint follow the project default budget "
            "again. Cannot be combined with budget."
        ),
    )

    @model_validator(mode="after")
    def _follows_default_excludes_budget(self):
        if self.budget_follows_default is None:
            return self
        if self.budget_follows_default is not True:
            raise ValueError(
                "budget_follows_default only accepts true; to set a budget "
                "by hand, send budget instead"
            )
        if "budget" in self.model_fields_set:
            raise ValueError(
                "send either budget (set it by hand) or "
                "budget_follows_default (follow the project default), not both"
            )
        return self


class SprintResponse(BaseModel):
    """Schema for sprint response."""

    id: str
    project_id: str
    name: str
    description: str | None
    status: SprintStatus
    # When the sprint turned out to run (CHT-1366): set on activation and on
    # close, never supplied. Sprints end when their budget is spent, not on
    # a date, so there is no start_date/end_date to plan.
    activated_at: DateTimeUTC | None
    closed_at: DateTimeUTC | None
    budget: int | None
    # True once the budget was set by hand (CHT-1495). A planned sprint
    # with False follows the project's default_sprint_budget.
    # Has a default so the OpenAPI schema leaves it optional: a client
    # generated from this schema can still read a server that predates
    # the field.
    budget_explicit: bool = False
    points_spent: int
    limbo: bool
    created_at: DateTimeUTC
    updated_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)

    @field_validator("status", mode="before")
    @classmethod
    def coerce_status(cls, v):
        """Coerce enum name strings from Oxyde to enum members."""
        if isinstance(v, SprintStatus):
            return v
        if isinstance(v, str):
            try:
                return SprintStatus[v]
            except KeyError:
                return SprintStatus(v)
        return v
