"""Email-verification codes and their history (CHT-1790, migration 0032).

A person proves they receive mail at their account's address by entering
a six-digit code the server mailed there
(``app.services.email_verification_service``). One row per code asked
for:

* ``email_hash``: HMAC of the normalised address (stripped and
  ASCII-folded by ``app.utils.email_address.fold_email``: ASCII letters
  only, on purpose, to match SQLite's LIKE; not ``str.lower()``) under a
  key derived from SECRET_KEY. The rate limits and the cap on
  failed confirmations count by it, so they hold per *address*, not per
  account: deleting the account and signing up again with the same
  address does not reset them.
* ``user_id``: the account the code was sent for. Deliberately not a
  foreign key: the rows are the address's history and outlive the
  account (a new account has a new id, so it can never confirm an old
  account's code). Pruned by age, not by the user's deletion.
* ``code_hash``: HMAC of the code, bound to the user id. The code itself
  is never stored.
* ``armed``: False until the email has actually been sent. A request
  refused by a rate limit (its row deleted) or whose send failed (its
  row kept, as history) never has a code a confirmation can match.
* ``expires_at``: fifteen minutes after it was asked for.
* ``attempts``: confirmations tried against it, the right one included.
  At the cap the code is dead.
* ``used_at``: when it was confirmed. ``attempts`` minus one such
  success is the failed confirmations the daily cap counts.

A team admin's code for one invitation (CHT-1828) is a row here too,
with ``invitation_id`` and ``team_id`` set (NULL on every mailed code)
and ``code_hash``
bound to the user and the invitation. Every address-keyed query (the
mailing limits, the failure cap, the newest-code lookup, "has this
account asked") filters on ``invitation_id`` being NULL, so it never
sees one, and its own limit counts by the invitation. Redeeming it lets
that user accept that invitation; it never verifies the address.

Only a user's newest armed code can be confirmed, so sending a new code
retires every older one. Rows older than a day are pruned on each
request.

Every index is declared in ``Meta.indexes`` under the name 0032 creates
it with (CHT-1410).
"""
import uuid
from datetime import datetime, timezone

from oxyde import Field, Index, Model

from app.utils.datetimes import DateTimeUTC


def _now() -> datetime:
    return datetime.now(timezone.utc)


class OxydeEmailVerificationCode(Model):
    """One verification code asked for an address."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    email_hash: str = Field()
    # Not a foreign key, on purpose (see the module docstring).
    user_id: str = Field()
    # Set only on a team admin's code for one invitation (CHT-1828,
    # migration 0037); NULL on every mailed code. Not a foreign key:
    # Oxyde cannot add one to an existing SQLite table (CLAUDE.md,
    # Database), and none is needed: the rows are pruned after a day, and
    # a code is only ever redeemed through a live invitation, so one left
    # behind by a revoked invitation can never be used.
    invitation_id: str | None = Field(default=None)
    # The inviting team, on the same rows only: the issue limit counts
    # per team and address, and a cancelled invitation's row is gone.
    # Plain for the same reason as invitation_id.
    team_id: str | None = Field(default=None)
    code_hash: str = Field()
    armed: bool = Field(default=False)
    expires_at: DateTimeUTC = Field()
    attempts: int = Field(default=0)
    used_at: DateTimeUTC | None = Field(default=None)
    created_at: DateTimeUTC = Field(default_factory=_now)

    class Meta:
        is_table = True
        table_name = "email_verification_codes"
        indexes = [
            # An address's history, newest first: the rate limits, the
            # failed-confirmation cap and the confirm lookup.
            Index(("email_hash", "created_at"), name="ix_email_verification_codes_email_created"),
            # The prune of rows older than a day.
            Index(("created_at",), name="ix_email_verification_codes_created_at"),
            # An invitation's admin-issued codes, newest first: redeeming
            # one and the per-invitation daily limit (CHT-1828).
            Index(("invitation_id", "created_at"), name="ix_email_verification_codes_invitation_created"),
            # A team's admin-issued codes for an address: the daily issue
            # limit (CHT-1828).
            Index(("team_id", "email_hash", "created_at"), name="ix_email_verification_codes_team_email_created"),
        ]
