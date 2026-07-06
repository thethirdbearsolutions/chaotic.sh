"""Oxyde ORM Label model.

Minimal model for label lookups used by document_service.
The full Issue/Label port happens in Phase 2.
"""
import uuid
from datetime import datetime, timezone
from app.utils.datetimes import DateTimeUTC
from oxyde import Model, Field, Index


class OxydeLabel(Model):
    """Label for categorizing issues and documents."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    team_id: str = Field()
    # Unique per-team (not globally) -- see Meta.indexes (CHT-1223).
    # Migration 0008 adds the compound constraint; IssueService.create_label()
    # catches the resulting IntegrityError on a lost create-create race.
    name: str = Field()
    color: str = Field(default="#6366f1")
    description: str | None = Field(default=None)
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "labels"
        indexes = [
            Index(("team_id", "name"), unique=True, name="labels_team_id_name_idx"),
        ]
