"""Oxyde ORM Issue models.

Phase 2 migration from SQLAlchemy.
"""
import uuid
from datetime import datetime, timezone
from oxyde import OxydeModel, Field
from app.oxyde_models.user import OxydeUser  # noqa: F401 — needed for FK resolution
from app.models.issue import IssueStatus, IssuePriority, IssueType, IssueRelationType, ActivityType


def _to_enum(enum_cls, raw: str):
    """Convert a raw DB string to an enum member, with a clear error on bad data."""
    try:
        return enum_cls[raw]
    except KeyError:
        raise ValueError(f"Invalid {enum_cls.__name__} in DB: {raw!r}")


class OxydeIssue(OxydeModel):
    """Issue/task model."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    project_id: str = Field()
    identifier: str = Field(db_unique=True, db_index=True)
    number: int = Field()
    title: str = Field()
    description: str | None = Field(default=None)
    status: str = Field(default=IssueStatus.BACKLOG.name)
    priority: str = Field(default=IssuePriority.NO_PRIORITY.name)
    issue_type: str = Field(default=IssueType.TASK.name)
    estimate: int | None = Field(default=None)
    assignee_id: str | None = Field(default=None)
    creator: OxydeUser | None = Field(default=None, db_on_delete="CASCADE")
    sprint_id: str | None = Field(default=None)
    parent_id: str | None = Field(default=None)
    due_date: datetime | None = Field(default=None)
    completed_at: datetime | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @property
    def status_enum(self) -> IssueStatus:
        return _to_enum(IssueStatus, self.status)

    @property
    def priority_enum(self) -> IssuePriority:
        return _to_enum(IssuePriority, self.priority)

    @property
    def issue_type_enum(self) -> IssueType:
        return _to_enum(IssueType, self.issue_type)

    class Meta:
        is_table = True
        table_name = "issues"


class OxydeIssueComment(OxydeModel):
    """Comment on an issue."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    issue_id: str = Field()
    author: OxydeUser | None = Field(default=None, db_on_delete="CASCADE")
    content: str = Field()
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "issue_comments"


class OxydeIssueActivity(OxydeModel):
    """Activity log for issues."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    issue_id: str = Field()
    user: OxydeUser | None = Field(default=None, db_on_delete="CASCADE")
    activity_type: str = Field()
    field_name: str | None = Field(default=None)
    old_value: str | None = Field(default=None)
    new_value: str | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @property
    def activity_type_enum(self) -> ActivityType:
        return _to_enum(ActivityType, self.activity_type)

    class Meta:
        is_table = True
        table_name = "issue_activities"


class OxydeIssueRelation(OxydeModel):
    """Relationship between issues."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    issue_id: str = Field()
    related_issue_id: str = Field()
    relation_type: str = Field(default=IssueRelationType.RELATES_TO.name)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @property
    def relation_type_enum(self) -> IssueRelationType:
        return _to_enum(IssueRelationType, self.relation_type)

    class Meta:
        is_table = True
        table_name = "issue_relations"


class OxydeIssueLabel(OxydeModel):
    """Junction table for issue-label links."""

    issue_id: str = Field(db_pk=True)
    label_id: str = Field(db_pk=True)

    class Meta:
        is_table = True
        table_name = "issue_labels"


class OxydeTicketLimbo(OxydeModel):
    """Tracks tickets blocked by GATE rituals."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    issue_id: str = Field()
    ritual_id: str = Field()
    limbo_type: str = Field()
    requested_by_id: str = Field()
    requested_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    cleared_at: datetime | None = Field(default=None)
    cleared_by_id: str | None = Field(default=None)

    class Meta:
        is_table = True
        table_name = "ticket_limbo"


class OxydeBudgetTransaction(OxydeModel):
    """Records effort spent when issues are completed."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    sprint_id: str = Field()
    issue_id: str | None = Field(default=None)
    user_id: str | None = Field(default=None)
    points: int = Field()
    tokens: int | None = Field(default=None)
    issue_identifier: str = Field()
    issue_title: str = Field()
    sprint_name: str = Field()
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "budget_transactions"
