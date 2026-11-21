"""Old identifiers of issues that moved to another project (CHT-2106)."""
import uuid
from datetime import datetime, timezone

from oxyde import Field, Index, Model

from app.oxyde_models.issue import OxydeIssue  # noqa: F401 -- FK resolution
from app.utils.datetimes import DateTimeUTC


class OxydeIssueAlias(Model):
    """An identifier an issue used to have, before a move.

    ``identifier`` stays reserved for the issue it named: looking it up
    reaches ``issue`` wherever that now lives, and its project never
    hands the number out again (``project_id`` and ``number`` are the
    old project and number, which is what the allocator reads). Deleting
    the issue deletes its aliases.
    """

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    issue: OxydeIssue | None = Field(default=None, db_nullable=False, db_on_delete="CASCADE")
    identifier: str = Field()
    project_id: str = Field()
    number: int = Field()
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "issue_aliases"
        indexes = [
            Index(("identifier",), unique=True, name="uq_issue_aliases_identifier"),
            Index(("issue_id",), name="ix_issue_aliases_issue_id"),
            Index(("project_id",), name="ix_issue_aliases_project_id"),
        ]
