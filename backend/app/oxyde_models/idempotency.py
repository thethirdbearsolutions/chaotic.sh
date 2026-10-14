"""The Idempotency-Key store (CHT-1621, migration 0029).

One row per key a user sent on a keyed write. The user is the principal
the request acted as (a person, or an agent; never the human holding an
agent's key). ``app.api.idempotency`` says how it is used. A row is, in
turn:

* **claimed**: ``status`` NULL. Inserted and committed on its own, in a
  short transaction, before the write runs, so a duplicate sees it at
  once and is told the write is in flight. ``claim_token`` names the
  request that holds it; ``claimed_at`` when it took it. A claim older
  than ``app.api.idempotency.STALE_CLAIM`` belongs to a request that
  died (the write and its answer commit together, so an unanswered
  claim means the write never committed), and the next resend takes it
  over.
* **answered**: ``status`` and the response columns set, in the same
  transaction as the write. ``refused`` is True when the answer was an
  ``HTTPException`` (replayed by raising it again, so the app's handler
  renders it as it did the first time), False for a body stored as sent.
  A resend within ``REPLAY_WINDOW`` of ``created_at`` gets it back.
* **a tombstone**: an answered row past ``REPLAY_WINDOW``. Its body is
  cleared by the sweep, but the row stays until ``TOMBSTONE_RETENTION``,
  so a late resend is refused (409 ``idempotency_key_expired``) instead
  of done a second time.

Every index is declared in ``Meta.indexes`` under the name 0029 creates
it with (CHT-1410).
"""
import uuid
from datetime import datetime, timezone

from oxyde import Field, Index, Model

from app.oxyde_models.user import OxydeUser
from app.utils.datetimes import DateTimeUTC


def _now() -> datetime:
    return datetime.now(timezone.utc)


class OxydeIdempotencyRecord(Model):
    """One keyed write: its claim, then its answer, then its tombstone."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    user: OxydeUser | None = Field(default=None, db_nullable=False, db_on_delete="CASCADE")
    # The client's Idempotency-Key, as sent.
    idempotency_key: str = Field()
    # What the key was first used for: a resend must match all three.
    method: str = Field()
    path: str = Field()
    # SHA-256 of the method, path, query, X-Chaotic-Interactive and body
    # (JSON canonicalised).
    request_hash: str = Field()
    # Which request holds the claim, and since when (see above).
    claim_token: str = Field()
    claimed_at: DateTimeUTC = Field(default_factory=_now)
    status: int | None = Field(default=None)
    refused: bool = Field(default=False)
    # A response's body as sent, or a refusal's ``detail`` as JSON.
    response_body: str | None = Field(default=None)
    # JSON object: a response's content-type, or a refusal's headers.
    response_headers: str | None = Field(default=None)
    # When the key was first claimed: the replay window and the
    # tombstone's retention run from here.
    created_at: DateTimeUTC = Field(default_factory=_now)

    class Meta:
        is_table = True
        table_name = "idempotency_records"
        indexes = [
            Index(("user_id", "idempotency_key"), unique=True, name="ux_idempotency_records_user_key"),
            # The sweep clears bodies and deletes rows by age.
            Index(("created_at",), name="ix_idempotency_records_created_at"),
        ]
