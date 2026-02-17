"""Oxyde ORM API Key model."""
import uuid
from datetime import datetime, timezone
from oxyde import OxydeModel, Field


class OxydeAPIKey(OxydeModel):
    """API Key model for programmatic authentication."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    user_id: str = Field(db_index=True)
    name: str = Field()
    key_prefix: str = Field(db_index=True)
    key_hash: str = Field()
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    last_used_at: datetime | None = Field(default=None)
    expires_at: datetime | None = Field(default=None)
    is_active: bool = Field(default=True)
    agent_user_id: str | None = Field(default=None)

    class Meta:
        is_table = True
        table_name = "api_keys"
