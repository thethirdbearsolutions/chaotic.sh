"""Oxyde ORM models for push notifications (CHT-1604, migration 0026).

- `push_devices`: one row per app installation that asked to be pushed
  to, for one person. The Android app (CHT-1612) gets a Web Push
  endpoint from the UnifiedPush distributor on the phone and registers it
  here; the sender (CHT-1605) POSTs encrypted notifications to it.
- `push_preferences`: a person's per-kind on/off choices. Only kinds the
  person has set have a row; every other kind takes its default
  (`app.services.push_service.DEFAULT_KIND_ENABLED`), so a kind added to
  `InboxEntryKind` later needs no migration and no backfill.

A device belongs to its user (CASCADE). It also names the credential it
was registered with, where that credential has a row: the app's holder
session (`holder_session`, CHT-1602) or a `ck_` API key (`credential`).
Deleting either deletes the device (CASCADE), and revoking either deletes
it too, right after the revoking transaction commits (the credential-ended
hook, `app.services.credential_events`, CHT-1625; a startup sweep catches
a process that died in between), so a signed-out or revoked phone stops
getting notifications at once. A device registered with a
web-login JWT names neither; it goes when that JWT expires (below).

Each registration rebinds the device to the credential it came with
(the newest credential wins), and records that credential's expiry: a
device registered with a web login dies when that login expires, unless
the app registers again with a live credential. A person is told in
their inbox when a device is added or its endpoint changes.

Every index is declared in `Meta.indexes` under the name 0026 creates it
with (CHT-1410).
"""
import uuid
from datetime import datetime, timezone

from oxyde import Field, Index, Model

from app.enums import InboxEntryKind, PushTransport
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.enums import DbEnum
from app.oxyde_models.oauth import OxydeHolderSession
from app.oxyde_models.user import OxydeUser
from app.utils.datetimes import DateTimeUTC


def _now() -> datetime:
    return datetime.now(timezone.utc)


class OxydePushDevice(Model):
    """One app installation a person receives push notifications on."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    user: OxydeUser | None = Field(default=None, db_nullable=False, db_on_delete="CASCADE")
    # Chosen by the app, once per installation, and stable across endpoint
    # changes: re-registering the same installation replaces its row.
    installation_id: str = Field()
    transport: DbEnum(PushTransport) = Field(default=PushTransport.WEB_PUSH)
    # WEB_PUSH: the push resource URL (RFC 8030) the distributor issued.
    # Stored canonical (push_service.canonical_endpoint), and unique: one
    # endpoint reaches one app instance, signed in as one person, so the
    # newest registration of an endpoint wins. Equivalent spellings under
    # RFC 3986 6.2.2-6.2.3 are one endpoint; other differences are not
    # folded, so this is exact only for those equivalences.
    endpoint: str = Field()
    # WEB_PUSH: the device's P-256 ECDH public key and 16-byte auth secret
    # (RFC 8291), base64url. Required by the API for WEB_PUSH; nullable
    # here for a transport without them (see PushTransport).
    p256dh: str | None = Field(default=None)
    auth: str | None = Field(default=None)
    platform: str | None = Field(default=None)  # "android", ...; display only
    label: str | None = Field(default=None)  # the device's name; display only
    holder_session: OxydeHolderSession | None = Field(default=None, db_on_delete="CASCADE")
    credential: OxydeAPIKey | None = Field(default=None, db_on_delete="CASCADE")
    # When the credential the device was last registered with expires: a
    # web login's `exp`, an API key's `expires_at`, a holder session's
    # absolute expiry; NULL for a key that never expires. Past it the
    # device is dead (no push) until the app registers again.
    credential_expires_at: DateTimeUTC | None = Field(default=None)
    # Fingerprint of the VAPID public key the subscription was made under
    # (app.utils.vapid.key_id). A device whose key is not the server's
    # current one must register again.
    vapid_key_id: str | None = Field(default=None)
    created_at: DateTimeUTC = Field(default_factory=_now)
    updated_at: DateTimeUTC = Field(default_factory=_now)
    # Kept by the sender (CHT-1605): the last delivery the endpoint
    # accepted, and failures since then.
    last_success_at: DateTimeUTC | None = Field(default=None)
    failure_count: int = Field(default=0)

    class Meta:
        is_table = True
        table_name = "push_devices"
        indexes = [
            Index(("user_id", "installation_id"), unique=True, name="ux_push_devices_user_installation"),
            Index(("endpoint",), unique=True, name="ux_push_devices_endpoint"),
            # The revocation deletes and the CASCADEs look these up.
            Index(("holder_session_id",), name="ix_push_devices_holder_session_id"),
            Index(("credential_id",), name="ix_push_devices_credential_id"),
        ]


class OxydePushPreference(Model):
    """A person's choice for one inbox kind: pushed or not."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    user: OxydeUser | None = Field(default=None, db_nullable=False, db_on_delete="CASCADE")
    kind: DbEnum(InboxEntryKind) = Field()
    enabled: bool = Field()
    updated_at: DateTimeUTC = Field(default_factory=_now)

    class Meta:
        is_table = True
        table_name = "push_preferences"
        indexes = [
            Index(("user_id", "kind"), unique=True, name="ux_push_preferences_user_kind"),
        ]
