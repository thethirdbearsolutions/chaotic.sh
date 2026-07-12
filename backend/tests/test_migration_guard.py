"""Startup migration-safety guard (CHT-1318): refuse to serve on a
DB-schema / code-migration mismatch, preventing the CHT-1317 incident."""
import glob
import os

import pytest
from unittest.mock import patch, AsyncMock

from app.oxyde_db import verify_migrations_current


def _code_migrations():
    mig_dir = os.path.join(os.path.dirname(__file__), "..", "migrations")
    return {os.path.splitext(os.path.basename(f))[0]
            for f in glob.glob(os.path.join(mig_dir, "[0-9]*.py"))}


@pytest.mark.asyncio
async def test_passes_when_db_is_current():
    applied = [{"name": n} for n in _code_migrations()]
    with patch("oxyde.execute_raw", AsyncMock(return_value=applied)):
        await verify_migrations_current()  # must not raise


@pytest.mark.asyncio
async def test_raises_loud_when_db_is_behind():
    # Drop the latest migration from the "applied" set -> DB is behind.
    behind = sorted(_code_migrations())[:-1]
    applied = [{"name": n} for n in behind]
    with patch("oxyde.execute_raw", AsyncMock(return_value=applied)):
        with pytest.raises(RuntimeError, match="BEHIND"):
            await verify_migrations_current()


@pytest.mark.asyncio
async def test_raises_when_db_is_ahead():
    applied = [{"name": n} for n in _code_migrations()] + [{"name": "9999_from_the_future"}]
    with patch("oxyde.execute_raw", AsyncMock(return_value=applied)):
        with pytest.raises(RuntimeError, match="AHEAD"):
            await verify_migrations_current()


@pytest.mark.asyncio
async def test_skips_when_no_migrations_table():
    # A DB not built via migrations (test static schema / fresh) -> skip, don't fail.
    with patch("oxyde.execute_raw", AsyncMock(side_effect=Exception("no such table: oxyde_migrations"))):
        await verify_migrations_current()  # must not raise


@pytest.mark.asyncio
async def test_reraises_a_real_db_error():
    # A genuine DB failure (not a missing oxyde_migrations table) must NOT be
    # silently swallowed -- it should surface loudly at startup (PR #254 review).
    with patch("oxyde.execute_raw", AsyncMock(side_effect=Exception("database disk image is malformed"))):
        with pytest.raises(Exception, match="malformed"):
            await verify_migrations_current()
