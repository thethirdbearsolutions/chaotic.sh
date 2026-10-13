"""Oxyde ORM API Key model."""
import uuid
from datetime import datetime, timezone
from oxyde import Model, Field, Index
from app.utils.datetimes import DateTimeUTC


class OxydeAPIKey(Model):
    """API Key model for programmatic authentication.

    Two explicit identities (CHT-1537, migration 0021):

    - `principal_user_id`: the user the key signs in as. A human, or an
      agent.
    - `holder_user_id`: the human who answers for the key. For a human's
      own key it is that human (the principal). For an agent's key it is
      whoever minted it, or for a key an agent minted for itself, the
      holder of the key it called with. An agent key signs in only while
      its holder is a member of the agent's team (CHT-1508/CHT-1510).
      NULL only for an agent key nobody answers for (a legacy key of an
      agent with no creator on record), which therefore never signs in.

    Both reference users(id) ON DELETE CASCADE in the database: a key
    goes with the user it signs in as and with the human holding it.
    """

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    principal_user_id: str = Field(db_index=True, db_on_delete="CASCADE")
    holder_user_id: str | None = Field(default=None, db_index=True, db_on_delete="CASCADE")
    name: str = Field()
    key_prefix: str = Field(db_index=True)
    key_hash: str = Field()
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))
    last_used_at: DateTimeUTC | None = Field(default=None)
    expires_at: DateTimeUTC | None = Field(default=None)
    is_active: bool = Field(default=True)

    class Meta:
        is_table = True
        table_name = "api_keys"
        indexes = [
            # The sign-in lookup (CHT-1534, CHT-1554, migration 0022): a
            # key's SHA-256 digest names exactly one row. Legacy bcrypt
            # hashes are salted, so they are unique too.
            Index(("key_hash",), unique=True, name="ux_api_keys_key_hash"),
            # Created by migration 0021's rebuild; declared here so the
            # migration record keeps them (CHT-1410). key_prefix is for
            # display, and narrows the legacy bcrypt rows a key could be;
            # it is 32 bits, so several keys can share it.
            Index(("key_prefix",), name="ix_api_keys_key_prefix"),
            Index(("principal_user_id",), name="ix_api_keys_principal_user_id"),
            Index(("holder_user_id",), name="ix_api_keys_holder_user_id"),
        ]
