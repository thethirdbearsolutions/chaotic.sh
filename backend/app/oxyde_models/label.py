"""Oxyde ORM Label model.

Minimal model for label lookups used by document_service.
The full Issue/Label port happens in Phase 2.
"""
import uuid
from datetime import datetime, timezone
from oxyde import OxydeModel, Field


class OxydeLabel(OxydeModel):
    """Label for categorizing issues and documents."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    team_id: str = Field()
    name: str = Field()
    color: str = Field(default="#6366f1")
    description: str | None = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "labels"
