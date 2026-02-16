"""Oxyde ORM database configuration.

Runs alongside SQLAlchemy during phased migration. Both ORMs point to the
same SQLite file. Oxyde handles User/Team services; SQLAlchemy handles the rest.
"""
import os
from oxyde import AsyncDatabase
from app.config import get_settings


_db: AsyncDatabase | None = None


def _get_oxyde_url() -> str:
    """Convert SQLAlchemy URL to Oxyde-compatible URL.

    SQLAlchemy uses: sqlite+aiosqlite:///./chaotic.db
    Oxyde expects:   sqlite:///path/to/chaotic.db  (absolute)
    """
    settings = get_settings()
    sa_url = settings.database_url

    # Strip the aiosqlite dialect
    if sa_url.startswith("sqlite+aiosqlite:///"):
        path = sa_url.replace("sqlite+aiosqlite:///", "")
        # Make relative paths absolute
        if not path.startswith("/"):
            path = os.path.abspath(path)
        return f"sqlite:///{path}"

    # For postgres, just strip the async driver
    if "+asyncpg" in sa_url:
        return sa_url.replace("+asyncpg", "")

    return sa_url


async def init_oxyde() -> AsyncDatabase:
    """Initialize the Oxyde database connection."""
    global _db
    url = _get_oxyde_url()
    _db = AsyncDatabase(url, overwrite=True)
    await _db.connect()

    # Import models so they register with Oxyde
    import app.oxyde_models  # noqa: F401

    return _db


async def close_oxyde() -> None:
    """Close the Oxyde database connection."""
    global _db
    if _db:
        await _db.disconnect()
        _db = None
