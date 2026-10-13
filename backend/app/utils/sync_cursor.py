"""Opaque sync cursors (CHT-1607): a position in an (updated_at, id) order.

A client that syncs incrementally keeps the cursor it was last handed and
sends it back; the server returns the rows that sort after it. The pair
breaks ties between rows changed in the same microsecond, so a page
boundary never skips or repeats one. The encoding is opaque on purpose:
clients must not parse or build cursors, so the server can change what is
inside without a client release.
"""
import base64
import binascii
import json
from datetime import datetime, timezone

_VERSION = 1


class InvalidCursorError(ValueError):
    """A cursor this server did not issue, or cannot read any more."""


def encode_cursor(updated_at: datetime, row_id: str) -> str:
    """The cursor that sorts at (updated_at, row_id)."""
    if updated_at.tzinfo is None:
        updated_at = updated_at.replace(tzinfo=timezone.utc)
    payload = {"v": _VERSION, "t": updated_at.astimezone(timezone.utc).isoformat(), "id": row_id}
    raw = json.dumps(payload, separators=(",", ":")).encode()
    return base64.urlsafe_b64encode(raw).decode().rstrip("=")


def decode_cursor(cursor: str) -> tuple[datetime, str]:
    """(updated_at, id) of a cursor from encode_cursor, as an aware UTC
    datetime. Raises InvalidCursorError for anything else."""
    try:
        padded = cursor + "=" * (-len(cursor) % 4)
        payload = json.loads(base64.urlsafe_b64decode(padded.encode()))
        if not isinstance(payload, dict) or payload.get("v") != _VERSION:
            raise InvalidCursorError("unsupported cursor version")
        row_id = payload["id"]
        updated_at = datetime.fromisoformat(payload["t"])
        if not isinstance(row_id, str) or updated_at.tzinfo is None:
            raise InvalidCursorError("malformed cursor")
    except InvalidCursorError:
        raise
    except (binascii.Error, UnicodeDecodeError, ValueError, KeyError, TypeError) as e:
        raise InvalidCursorError("malformed cursor") from e
    return updated_at.astimezone(timezone.utc), row_id
