"""A brand-new database gets its schema from the migration chain at startup
(CHT-1195); a database that already has tables is left alone for
verify_migrations_current to judge (CHT-1318)."""
import glob
import os

import pytest
from oxyde import AsyncDatabase, PoolSettings, execute_raw, disconnect_all

from app.oxyde_db import MIGRATIONS_DIR, bootstrap_if_empty, verify_migrations_current


def _code_migrations():
    return sorted(
        os.path.splitext(os.path.basename(f))[0]
        for f in glob.glob(os.path.join(MIGRATIONS_DIR, "[0-9]*.py"))
    )


@pytest.fixture
async def fresh_db(tmp_path):
    """An empty SQLite file registered as Oxyde's default connection, the way
    init_oxyde() would register a fresh DATABASE_URL. Not the `db` fixture:
    that one hand-builds a schema, which is the case bootstrap must NOT touch."""
    _db = AsyncDatabase(
        f"sqlite:///{tmp_path / 'fresh.db'}", overwrite=True, settings=PoolSettings(max_connections=1),
    )
    await _db.connect()
    import app.oxyde_models  # noqa: F401
    yield _db
    await disconnect_all()


@pytest.mark.asyncio
async def test_empty_database_gets_the_whole_chain(fresh_db):
    applied = await bootstrap_if_empty()

    assert applied == _code_migrations(), "every migration in the repo, in order"
    recorded = sorted(r["name"] for r in await execute_raw("SELECT name FROM oxyde_migrations"))
    assert recorded == _code_migrations()
    await verify_migrations_current()  # the guard agrees the DB is current

    # The schema is usable through the models, not just present.
    from app.oxyde_models.sprint import OxydeSprint
    assert await OxydeSprint.objects.count() == 0
    cols = {r["name"] for r in await execute_raw("PRAGMA table_info(sprints)")}
    assert {"activated_at", "closed_at"} <= cols and "token_budget" not in cols  # 0015 + 0016 ran


@pytest.mark.asyncio
async def test_second_start_is_a_no_op(fresh_db):
    assert await bootstrap_if_empty() != []
    assert await bootstrap_if_empty() == []


@pytest.mark.asyncio
async def test_an_interrupted_first_start_is_still_empty(fresh_db):
    """Oxyde creates oxyde_migrations before the first migration commits, so
    a bootstrap killed at that moment leaves only an empty bookkeeping
    table. That holds no data and must not become a dead end that needs a
    hand-run `oxyde migrate` (PR #286 review)."""
    await execute_raw("CREATE TABLE oxyde_migrations (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, applied_at TIMESTAMP NOT NULL)")

    assert await bootstrap_if_empty() == _code_migrations()
    await verify_migrations_current()


@pytest.mark.asyncio
async def test_a_partial_chain_is_left_for_the_guard(fresh_db):
    """One recorded migration means a partial schema: not ours to finish at
    startup. The guard refuses it and names the fix."""
    await execute_raw("CREATE TABLE oxyde_migrations (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, applied_at TIMESTAMP NOT NULL)")
    await execute_raw("INSERT INTO oxyde_migrations (name, applied_at) VALUES ('0001_initial', '2026-01-01')")

    assert await bootstrap_if_empty() == []
    with pytest.raises(RuntimeError, match="BEHIND"):
        await verify_migrations_current()


@pytest.mark.asyncio
async def test_a_database_with_tables_is_not_touched(fresh_db):
    """Anything that already has a table is either migration-managed (the
    CHT-1318 guard decides) or hand-built (served as is). Bootstrapping it
    would be the restart-before-migrate hazard from the other direction."""
    await execute_raw("CREATE TABLE users (id TEXT PRIMARY KEY)")

    assert await bootstrap_if_empty() == []
    tables = {r["name"] for r in await execute_raw("SELECT name FROM sqlite_master WHERE type = 'table'")}
    assert tables == {"users"}
