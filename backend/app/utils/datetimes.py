"""UTC datetime coercion shared by response schemas and ORM models.

Lives in its own module (not app.utils.__init__) so the ORM model layer —
which the oxyde migration CLI imports — doesn't drag in security deps.
"""
from datetime import datetime, timezone
from typing import Annotated

from pydantic import BeforeValidator


def ensure_utc(dt: datetime | None) -> datetime | None:
    """Ensure datetime is timezone-aware (UTC) for proper JSON serialization.

    SQLite stores naive datetimes. When serialized to JSON without timezone info,
    JavaScript interprets them as local time instead of UTC, causing incorrect
    relative time calculations.
    """
    if dt is None:
        return None
    # Handle string datetimes from raw SQL queries
    if isinstance(dt, str):
        dt = datetime.fromisoformat(dt)
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt


DateTimeUTC = Annotated[datetime, BeforeValidator(ensure_utc)]
"""A datetime type that ensures UTC timezone info is present.

Use this instead of plain ``datetime`` in Pydantic response schemas and in
Oxyde ORM models. Oxyde 0.7 binds datetimes as typed SQL timestamps, so
SQLite round-trips them naive; this validator re-attaches UTC on every
model hydration (reads, create/save RETURNING rows).
"""
