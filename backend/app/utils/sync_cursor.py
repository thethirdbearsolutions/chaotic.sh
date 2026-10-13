"""Opaque sync cursors (CHT-1607): a position in an (updated_at, id) order.

A client that syncs incrementally keeps the cursor it was last handed and
sends it back; the server returns the rows that sort after it. The pair
breaks ties between rows changed in the same microsecond, so a page
boundary never skips or repeats one. The encoding is opaque on purpose:
clients must not parse or build cursors, so the server can change what is
inside without a client release.

A cursor may also carry a digest of the scope it was issued for (the
team ids the caller could read then), so the server can tell when that
scope changed and the position may no longer cover everything the caller
may see. A digest, not the list, so the cursor stays short however many
teams the caller is in.
"""
import base64
import binascii
import hashlib
import json
from datetime import datetime, timezone
from typing import NamedTuple

_VERSION = 1


class InvalidCursorError(ValueError):
    """A cursor this server did not issue, or cannot read any more."""


class SyncPosition(NamedTuple):
    updated_at: datetime  # aware, UTC
    id: str
    teams_digest: str | None = None


def teams_digest(teams) -> str:
    """A short, order-independent digest of a set of team ids."""
    joined = "\n".join(sorted(set(teams))).encode()
    return hashlib.sha256(joined).hexdigest()[:16]


def encode_cursor(updated_at: datetime, row_id: str, teams=None) -> str:
    """The cursor that sorts at (updated_at, row_id), issued for `teams`."""
    if updated_at.tzinfo is None:
        updated_at = updated_at.replace(tzinfo=timezone.utc)
    payload = {"v": _VERSION, "t": updated_at.astimezone(timezone.utc).isoformat(), "id": row_id}
    if teams is not None:
        payload["tg"] = teams_digest(teams)
    raw = json.dumps(payload, separators=(",", ":")).encode()
    return base64.urlsafe_b64encode(raw).decode().rstrip("=")


def decode_cursor(cursor: str) -> SyncPosition:
    """The position of a cursor from encode_cursor, with an aware UTC
    datetime. Raises InvalidCursorError for anything else."""
    try:
        padded = cursor + "=" * (-len(cursor) % 4)
        payload = json.loads(base64.urlsafe_b64decode(padded.encode()))
        if not isinstance(payload, dict) or payload.get("v") != _VERSION:
            raise InvalidCursorError("unsupported cursor version")
        row_id = payload["id"]
        updated_at = datetime.fromisoformat(payload["t"])
        digest = payload.get("tg")
        if not isinstance(row_id, str) or updated_at.tzinfo is None:
            raise InvalidCursorError("malformed cursor")
        if digest is not None and not isinstance(digest, str):
            raise InvalidCursorError("malformed cursor")
    except InvalidCursorError:
        raise
    except (binascii.Error, UnicodeDecodeError, ValueError, KeyError, TypeError) as e:
        raise InvalidCursorError("malformed cursor") from e
    return SyncPosition(updated_at.astimezone(timezone.utc), row_id, digest)
