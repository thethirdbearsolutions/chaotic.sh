"""Oxyde ORM database configuration."""
import os
from oxyde import AsyncDatabase
from app.config import get_settings


_db: AsyncDatabase | None = None


def _get_oxyde_url() -> str:
    """Get Oxyde-compatible database URL from settings.

    Settings may use async driver prefixes (sqlite+aiosqlite, +asyncpg)
    which need to be stripped for Oxyde's native async driver.
    """
    settings = get_settings()
    url = settings.database_url

    if url.startswith("sqlite+aiosqlite:///"):
        path = url.replace("sqlite+aiosqlite:///", "")
        if not path.startswith("/"):
            path = os.path.abspath(path)
        return f"sqlite:///{path}"

    if "+asyncpg" in url:
        return url.replace("+asyncpg", "")

    return url


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
