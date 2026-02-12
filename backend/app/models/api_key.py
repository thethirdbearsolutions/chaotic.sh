"""API Key model."""
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base
import uuid


class APIKey(Base):
    """API Key model for programmatic authentication.

    API keys can authenticate as either:
    - The human user (agent_user_id=NULL) - backwards compatible
    - An agent user (agent_user_id set) - actions attributed to the agent
    """

    __tablename__ = "api_keys"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    name: Mapped[str] = mapped_column(String(255))  # User-provided label
    key_prefix: Mapped[str] = mapped_column(
        String(12), index=True
    )  # First 8 chars after ck_ for lookup
    key_hash: Mapped[str] = mapped_column(String(255))  # bcrypt hash of full key
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    last_used_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    expires_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # The agent identity this key authenticates as (NULL = authenticate as human user)
    agent_user_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=True
    )

    # Relationships
    user: Mapped["User"] = relationship(
        "User", back_populates="api_keys", foreign_keys=[user_id]
    )
    agent_user: Mapped["User | None"] = relationship(
        "User", foreign_keys=[agent_user_id]
    )


# Import here to avoid circular imports
from app.models.user import User
