"""Tests for migrations/0022_api_key_hash_unique.py (CHT-1534, CHT-1554).

A database at 0021 is seeded with current (`sha256$`) and legacy bcrypt
keys, several of them sharing one 11-character prefix. Two starting
shapes, as for 0021: one built from the chain, and one whose api_keys
came from 0021's rebuild of a SQLAlchemy-era table. After 0022 the
key hash is unique and is what a lookup by hash uses, and no row has
changed. A database whose rows already share a hash (only possible by
hand) is refused, naming the rows, and the file is left byte for byte
as it was. The downgrade
drops the index again.
"""
import hashlib
import sqlite3
import subprocess
import sys
from contextlib import closing

import pytest

from .test_api_key_principal_migration import SQLALCHEMY_API_KEYS
from .test_parent_user_fk_migration import _SETTLE_AND_EXIT, BACKEND, _migrate

MIGRATION = "0022_api_key_hash_unique"
INDEX = "ux_api_keys_key_hash"
NOW = "2026-10-13T00:00:00+00:00"

# id -> (key_prefix, key_hash). k1..k3 share a prefix, as colliding keys do.
KEYS = {
    "k1": ("ck_0000aaaa", "sha256$" + "1" * 64),
    "k2": ("ck_0000aaaa", "sha256$" + "2" * 64),
    "k3": ("ck_0000aaaa", "$2b$12$" + "a" * 53),
    "k4": ("ck_0000bbbb", "$2b$12$" + "b" * 53),
}

_ROLLBACK = """
import asyncio, os, sys, time, traceback
from oxyde import AsyncDatabase, PoolSettings, disconnect_all
from oxyde.migrations.executor import rollback_migrations

async def main(path):
    database = AsyncDatabase(f"sqlite:///{path}", overwrite=True, settings=PoolSettings(max_connections=1))
    await database.connect()
    import app.oxyde_models  # noqa: F401
    try:
        print(await rollback_migrations(steps=1, migrations_dir="migrations"))
    finally:
        await disconnect_all()

code = 0
try:
    asyncio.run(main(sys.argv[1]))
except BaseException:
    traceback.print_exc()
    code = 1
""" + _SETTLE_AND_EXIT


def _seed(path: str, keys: dict[str, tuple[str, str]]) -> None:
    with closing(sqlite3.connect(path)) as c:
        c.execute(
            "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, is_active) "
            "VALUES ('u1', 'u1@example.com', 'x', 'U', ?, ?, 0, 1)",
            (NOW, NOW),
        )
        for key_id, (prefix, key_hash) in keys.items():
            c.execute(
                "INSERT INTO api_keys (id, principal_user_id, holder_user_id, name, key_prefix, key_hash, "
                "created_at, is_active) VALUES (?, 'u1', 'u1', 'n', ?, ?, ?, 1)",
                (key_id, prefix, key_hash, NOW),
            )
        c.commit()


def _rows(path: str) -> dict[str, tuple]:
    with closing(sqlite3.connect(path)) as c:
        return {row[0]: row for row in c.execute("SELECT * FROM api_keys ORDER BY id")}


def _index_sql(path: str):
    with closing(sqlite3.connect(path)) as c:
        row = c.execute("SELECT sql FROM sqlite_master WHERE type = 'index' AND name = ?", (INDEX,)).fetchone()
        return row[0] if row else None


def _applied(path: str) -> bool:
    with closing(sqlite3.connect(path)) as c:
        return c.execute("SELECT 1 FROM oxyde_migrations WHERE name = ?", (MIGRATION,)).fetchone() is not None


@pytest.fixture(params=["chain", "production"])
def at_0021(request, tmp_path):
    path = str(tmp_path / f"{request.param}.db")
    if request.param == "chain":
        _migrate(path, target="0021_api_key_principal_and_holder")
        return path
    _migrate(path, target="0020_parent_user_restrict")
    with closing(sqlite3.connect(path)) as c:
        c.execute("DROP TABLE api_keys")
        for statement in SQLALCHEMY_API_KEYS:
            c.execute(statement)
        c.commit()
    _migrate(path, target="0021_api_key_principal_and_holder")
    return path


def _file_digests(path: str) -> dict[str, str | None]:
    """The database and its sidecars, byte for byte.

    An empty -wal counts as absent: it holds no frames, so a reader has
    nothing to replay from it, and SQLite deletes it at the next last
    close. One is left when a process dies inside SQLite's close, which
    unlinks the -shm before the -wal (CHT-1583; `_SETTLE_AND_EXIT` is
    what keeps the child scripts from doing that). The main file and
    every non-empty sidecar are still compared byte for byte."""
    digests = {}
    for suffix in ("", "-wal", "-shm", "-journal"):
        try:
            with open(path + suffix, "rb") as f:
                content = f.read()
        except FileNotFoundError:
            digests[suffix] = None
            continue
        digests[suffix] = None if suffix == "-wal" and not content else hashlib.sha256(content).hexdigest()
    return digests


def test_the_hash_becomes_unique_and_no_row_changes(at_0021):
    _seed(at_0021, KEYS)
    before = _rows(at_0021)
    assert _index_sql(at_0021) is None

    _migrate(at_0021, target=MIGRATION)

    assert _applied(at_0021)
    assert _rows(at_0021) == before
    assert "UNIQUE" in _index_sql(at_0021).upper()
    with closing(sqlite3.connect(at_0021)) as c:
        plan = " ".join(
            row[3] for row in c.execute("EXPLAIN QUERY PLAN SELECT id FROM api_keys WHERE key_hash = 'x'")
        )
        assert INDEX in plan
        # The prefix index is still there for the legacy fallback.
        assert c.execute(
            "SELECT 1 FROM sqlite_master WHERE type = 'index' AND name = 'ix_api_keys_key_prefix'"
        ).fetchone()
        with pytest.raises(sqlite3.IntegrityError):
            c.execute(
                "INSERT INTO api_keys (id, principal_user_id, holder_user_id, name, key_prefix, key_hash, "
                "created_at, is_active) VALUES ('dup', 'u1', 'u1', 'n', 'ck_0000cccc', ?, ?, 1)",
                (KEYS["k1"][1], NOW),
            )
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]


def test_rows_already_sharing_a_hash_stop_the_migration_and_change_nothing(at_0021):
    keys = dict(KEYS, k5=("ck_0000cccc", KEYS["k1"][1]), k6=("ck_0000dddd", KEYS["k4"][1]))
    _seed(at_0021, keys)
    before = _rows(at_0021)
    files = _file_digests(at_0021)

    with pytest.raises(RuntimeError) as refused:
        _migrate(at_0021, target=MIGRATION)

    message = str(refused.value)
    assert "4 API key rows share a key_hash" in message
    assert "k1, k5" in message and "k4, k6" in message
    assert "k2" not in message and "k3" not in message
    assert "nothing was changed" in message
    # Not even the hashes are printed.
    assert KEYS["k1"][1] not in message
    assert _file_digests(at_0021) == files
    assert not _applied(at_0021)
    assert _index_sql(at_0021) is None
    assert _rows(at_0021) == before


def test_downgrade_drops_the_index(at_0021):
    _seed(at_0021, KEYS)
    _migrate(at_0021, target=MIGRATION)
    before = _rows(at_0021)

    result = subprocess.run(
        [sys.executable, "-c", _ROLLBACK, at_0021],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    assert MIGRATION in result.stdout

    assert not _applied(at_0021)
    assert _index_sql(at_0021) is None
    assert _rows(at_0021) == before


def test_an_empty_wal_compares_as_absent_and_nothing_else_does(tmp_path):
    path = str(tmp_path / "x.db")
    with open(path, "wb") as f:
        f.write(b"main")
    absent = _file_digests(path)
    open(path + "-wal", "wb").close()
    assert _file_digests(path) == absent
    with open(path + "-wal", "wb") as f:
        f.write(b"frame")
    assert _file_digests(path)["-wal"] is not None
    open(path + "-shm", "wb").close()
    assert _file_digests(path)["-shm"] is not None
