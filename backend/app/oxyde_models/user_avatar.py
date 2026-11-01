"""Oxyde ORM model for uploaded profile pictures (CHT-1992)."""
from datetime import datetime, timezone

from oxyde import Field, Index, Model

from app.utils.datetimes import DateTimeUTC


class OxydeUserAvatar(Model):
    """A member's uploaded profile picture: one per user, replaced on each
    upload. Served without a credential at ``/api/avatars/{sha256}``: the
    address is the image's own hash, which only someone shown the
    member's ``avatar_url`` knows, and it never changes for an image, so
    it caches forever. No foreign key (provenance tables here avoid the
    hand-written rebuild one needs on SQLite); UserService.delete and
    AgentService delete the row with the account."""

    user_id: str = Field(db_pk=True)
    # image/png, image/jpeg, image/webp or image/gif, from the bytes'
    # signature, never from what the client claimed.
    content_type: str = Field()
    # The image, base64. Small by construction (AVATAR_MAX_BYTES).
    data_b64: str = Field()
    sha256: str = Field()
    updated_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "user_avatars"
        indexes = [
            Index(("sha256",), name="ix_user_avatars_sha256"),
        ]
