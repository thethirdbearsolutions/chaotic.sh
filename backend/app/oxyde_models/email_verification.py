"""Pending email-verification codes (CHT-1790, migration 0032).

A person proves they receive mail at their account's address by entering
a six-digit code the server mailed there
(``app.services.email_verification_service``). One row per code sent:

* ``code_hash``: HMAC-SHA256 of the code under the server's SECRET_KEY,
  bound to the user id. The code itself is never stored.
* ``expires_at``: fifteen minutes after it was sent.
* ``attempts``: confirmations tried against it. At the cap the code is
  dead and a new one must be requested.

Only a user's newest row can be confirmed, so sending a new code retires
every older one. Rows also serve as the send history the rate limits
count, so a superseded or dead row stays until it is an hour old (pruned
on the next request) or the address is verified (all deleted). Deleting
the user cascades.

Every index is declared in ``Meta.indexes`` under the name 0032 creates
it with (CHT-1410).
"""
import uuid
from datetime import datetime, timezone

from oxyde import Field, Index, Model

from app.oxyde_models.user import OxydeUser
from app.utils.datetimes import DateTimeUTC


def _now() -> datetime:
    return datetime.now(timezone.utc)


class OxydeEmailVerificationCode(Model):
    """One verification code mailed to a user's address."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    user: OxydeUser | None = Field(default=None, db_nullable=False, db_on_delete="CASCADE")
    code_hash: str = Field()
    expires_at: DateTimeUTC = Field()
    attempts: int = Field(default=0)
    created_at: DateTimeUTC = Field(default_factory=_now)

    class Meta:
        is_table = True
        table_name = "email_verification_codes"
        indexes = [
            # A user's codes, newest first: the confirm lookup and the
            # rate limits' counts.
            Index(("user_id", "created_at"), name="ix_email_verification_codes_user_created"),
        ]
