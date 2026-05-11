"""Oxyde ORM Issue models.

Phase 2 migration from SQLAlchemy.
"""
import uuid
from datetime import datetime, timezone
from oxyde import OxydeModel, Field
from app.oxyde_models.user import OxydeUser  # noqa: F401 — needed for FK resolution
from app.oxyde_models.label import OxydeLabel  # noqa: F401 — needed for FK/M2M resolution
from app.enums import IssueStatus, IssuePriority, IssueType, IssueRelationType, ActivityType
from app.oxyde_models.enums import DbEnum


class OxydeIssue(OxydeModel):
    """Issue/task model."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    project_id: str = Field()
    identifier: str = Field(db_unique=True, db_index=True)
    number: int = Field()
    title: str = Field()
    description: str | None = Field(default=None)
    status: DbEnum(IssueStatus) = Field(default=IssueStatus.BACKLOG)
    priority: DbEnum(IssuePriority) = Field(default=IssuePriority.NO_PRIORITY)
    issue_type: DbEnum(IssueType) = Field(default=IssueType.TASK)
    estimate: int | None = Field(default=None)
    assignee_id: str | None = Field(default=None)
    creator: OxydeUser | None = Field(default=None, db_on_delete="CASCADE")
    sprint_id: str | None = Field(default=None)
    parent_id: str | None = Field(default=None)
    due_date: datetime | None = Field(default=None)
    completed_at: datetime | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    labels: list["OxydeLabel"] = Field(default_factory=list, db_m2m=True, db_through="OxydeIssueLabel")

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
    issue: OxydeIssue | None = Field(default=None, db_on_delete="CASCADE")
    user: OxydeUser | None = Field(default=None, db_on_delete="CASCADE")
    activity_type: DbEnum(ActivityType) = Field()
    field_name: str | None = Field(default=None)
    old_value: str | None = Field(default=None)
    new_value: str | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "issue_activities"


class OxydeIssueRelation(OxydeModel):
    """Relationship between issues."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    issue_id: str = Field()
    related_issue_id: str = Field()
    relation_type: DbEnum(IssueRelationType) = Field(default=IssueRelationType.RELATES_TO)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "issue_relations"


class OxydeIssueLabel(OxydeModel):
    """Junction table for issue-label links."""

    issue: OxydeIssue | None = Field(default=None, db_pk=True, db_on_delete="CASCADE")
    label: OxydeLabel | None = Field(default=None, db_pk=True, db_on_delete="CASCADE")

    class Meta:
        is_table = True
        table_name = "issue_labels"


class OxydeTicketLimbo(OxydeModel):
    """One row per open intent on a ticket.

    Under the unified intent+limbo model, a single limbo row
    represents the user's intent to claim or close a ticket. The
    rituals blocking that intent live in the child
    `ticket_limbo_blockers` table — one blocker row per pending
    ritual. The intent is fully resolved when all of its blockers
    have `resolved_at` set; at that point `cleared_at` is stamped on
    the parent and the one-step auto-transition fires.

    db_on_delete annotations match the SQL constraints in migration
    0005's CREATE statement so `oxyde makemigrations` doesn't generate
    spurious schema-drift diffs.
    """

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    issue_id: str = Field(db_on_delete="CASCADE")
    limbo_type: str = Field()
    requested_by_id: str = Field(db_on_delete="CASCADE")
    requested_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    cleared_at: datetime | None = Field(default=None)
    cleared_by_id: str | None = Field(default=None, db_on_delete="SET NULL")

    class Meta:
        is_table = True
        table_name = "ticket_limbo"


class OxydeTicketLimboBlocker(OxydeModel):
    """One row per ritual blocking an intent.

    Lives under a parent `OxydeTicketLimbo`. Resolved (attested or
    approved) blockers carry `resolved_at` / `resolved_by_id`. When
    every blocker for a limbo is resolved, the parent intent fires.

    db_on_delete annotations match the SQL constraints in migration
    0005:
    * limbo_id: parent intent deletion cascades blockers.
    * ritual_id: ritual deletion cascades blockers (no orphans
      pointing at deleted rituals).
    * resolved_by_id: user deletion sets the field NULL so audit
      trails survive principal removal.
    """

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    limbo_id: str = Field(db_on_delete="CASCADE")
    ritual_id: str = Field(db_on_delete="CASCADE")
    resolved_at: datetime | None = Field(default=None)
    resolved_by_id: str | None = Field(default=None, db_on_delete="SET NULL")

    class Meta:
        is_table = True
        table_name = "ticket_limbo_blockers"


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
