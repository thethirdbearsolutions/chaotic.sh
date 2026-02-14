"""Utility functions."""
from datetime import datetime, timezone
from typing import Annotated

from pydantic import BeforeValidator

from app.utils.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    decode_token,
)


def ensure_utc(dt: datetime | None) -> datetime | None:
    """Ensure datetime is timezone-aware (UTC) for proper JSON serialization.

    SQLite stores naive datetimes. When serialized to JSON without timezone info,
    JavaScript interprets them as local time instead of UTC, causing incorrect
    relative time calculations.
    """
    if dt is None:
        return None
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt


DateTimeUTC = Annotated[datetime, BeforeValidator(ensure_utc)]
"""A datetime type that ensures UTC timezone info is present.

Use this instead of plain ``datetime`` in Pydantic response schemas so that
naive datetimes from SQLite are automatically tagged with UTC before
JSON serialization.
"""


__all__ = [
    "verify_password",
    "get_password_hash",
    "create_access_token",
    "decode_token",
    "ensure_utc",
    "DateTimeUTC",
]
