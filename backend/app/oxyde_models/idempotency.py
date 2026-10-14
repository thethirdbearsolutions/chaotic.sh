"""The Idempotency-Key store (CHT-1621, migration 0029).

One row per write a client sent with an ``Idempotency-Key`` header, for
the user the request acted as (the principal: a person, or an agent,
never the human holding an agent's key). The row is written in the same
transaction as the write it records, so it exists exactly when the
write committed. ``app.api.idempotency`` says how it is used.

``status`` and the response columns are NULL only while the claiming
transaction is still open; a committed row always carries the answer.
``refused`` is True when that answer was an ``HTTPException`` (replayed
by raising it again, so the app's exception handler renders it as it
did the first time), False for a response body stored as sent.

Rows older than ``app.api.idempotency.RETENTION`` are dead: a key reused
after that is a new write, and every claim deletes the dead rows.

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
    """The first answer to one keyed write, for its replay."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    user: OxydeUser | None = Field(default=None, db_nullable=False, db_on_delete="CASCADE")
    # The client's Idempotency-Key, as sent.
    idempotency_key: str = Field()
    # What the key was first used for: a resend must match all three.
    method: str = Field()
    path: str = Field()
    # SHA-256 of the method, path, query and body (JSON canonicalised).
    request_hash: str = Field()
    status: int | None = Field(default=None)
    refused: bool = Field(default=False)
    # A response's body as sent, or a refusal's ``detail`` as JSON.
    response_body: str | None = Field(default=None)
    # JSON object: a response's content-type, or a refusal's headers.
    response_headers: str | None = Field(default=None)
    created_at: DateTimeUTC = Field(default_factory=_now)

    class Meta:
        is_table = True
        table_name = "idempotency_records"
        indexes = [
            Index(("user_id", "idempotency_key"), unique=True, name="ux_idempotency_records_user_key"),
            # The expiry sweep deletes by age.
            Index(("created_at",), name="ix_idempotency_records_created_at"),
        ]
