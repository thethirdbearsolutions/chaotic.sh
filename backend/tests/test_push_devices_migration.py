"""Tests for migrations/0026_push_devices.py (CHT-1604).

0026 creates two tables and touches nothing else. A database at 0025 is
seeded with a team, a human, an agent, an API key and a holder session;
after 0026 every pre-existing table's DDL, indexes, foreign keys and rows
are unchanged, and the new tables have the columns, indexes and ON DELETE
actions the models declare.

Two starting shapes, as for 0024 and 0025: a database built from the
chain, and a production-shaped one whose `users` table is still the one
SQLAlchemy's create_all made, which both new tables reference.
"""
import sqlite3
import subprocess
import sys
from contextlib import closing

import pytest

from .test_parent_user_fk_migration import BACKEND, _migrate
from .test_token_store_migration import _ROLLBACK, _to_production_users

NOW = "2026-10-13T00:00:00+00:00"
LATER = "2026-12-01T00:00:00+00:00"
MIGRATION = "0026_push_devices"
TABLES = {"push_devices", "push_preferences"}
INDEXES = {
    "push_devices": {
        "ux_push_devices_user_installation",
        "ux_push_devices_endpoint",
        "ix_push_devices_holder_session_id",
        "ix_push_devices_credential_id",
    },
    "push_preferences": {"ux_push_preferences_user_kind"},
}
# table -> column -> (referenced table, ON DELETE)
EXPECTED_FKS = {
    "push_devices": {
        "user_id": ("users", "CASCADE"),
        "holder_session_id": ("holder_sessions", "CASCADE"),
        "credential_id": ("api_keys", "CASCADE"),
    },
    "push_preferences": {"user_id": ("users", "CASCADE")},
}


@pytest.fixture(params=["chain", "production"])
def at_before(request, tmp_path):
    path = str(tmp_path / f"{request.param}.db")
    _migrate(path, target="0022_api_key_hash_unique")
    if request.param == "production":
        _to_production_users(path)
    _migrate(path, target="0025_ritual_rejections")
    with closing(sqlite3.connect(path)) as c:
        c.execute("INSERT INTO teams (id, name, key, created_at, updated_at) VALUES ('t1', 'T', 'T', ?, ?)", (NOW, NOW))
        for user_id, is_agent, parent, kind in (
            ("human", 0, None, None), ("agent", 1, "human", "ASSISTANT"),
        ):
            c.execute(
                "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, "
                "parent_user_id, agent_team_id, kind, is_active, is_superuser, can_register) "
                "VALUES (?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, 1, 0, 0)",
                (user_id, f"{user_id}@example.com", user_id, NOW, NOW, is_agent, parent,
                 "t1" if is_agent else None, kind),
            )
        c.execute(
            "INSERT INTO api_keys (id, principal_user_id, holder_user_id, name, key_prefix, key_hash, "
            "created_at, is_active) VALUES ('k1', 'human', 'human', 'n', 'ck_00000001', 'sha256$x', ?, 1)",
            (NOW,),
        )
        c.execute(
            "INSERT INTO holder_sessions (id, team_id, principal_user_id, holder_user_id, via, "
            "policy_name, resource, scopes, created_at, idle_expires_at, absolute_expires_at) "
            "VALUES ('hs1', 't1', 'agent', 'human', 'CLAIM_TICKET', 'write', 'http://x', '', ?, ?, ?)",
            (NOW, LATER, LATER),
        )
        c.commit()
    return path


def _snapshot(path: str):
    """DDL of every object, and every row, of every table but the new ones
    and the migration ledger."""
    new_indexes = set().union(*INDEXES.values())
    with closing(sqlite3.connect(path)) as c:
        ddl = {
            (kind, name): sql for kind, name, sql in c.execute(
                "SELECT type, name, sql FROM sqlite_master WHERE name NOT LIKE 'sqlite_%'"
            )
            if name not in {*TABLES, "oxyde_migrations", *new_indexes}
        }
        tables = [t for (kind, t) in ddl if kind == "table"]
        rows = {t: sorted(map(tuple, c.execute(f'SELECT * FROM "{t}"'))) for t in tables}
    return ddl, rows


def _device(c, row_id: str, *, installation: str, endpoint: str, session=None, key=None) -> None:
    c.execute(
        "INSERT INTO push_devices (id, user_id, installation_id, transport, endpoint, p256dh, auth, "
        "holder_session_id, credential_id, created_at, updated_at, failure_count) "
        "VALUES (?, 'human', ?, 'WEB_PUSH', ?, 'p', 'a', ?, ?, ?, ?, 0)",
        (row_id, installation, endpoint, session, key, NOW, NOW),
    )


def test_creates_the_tables_and_changes_nothing_else(at_before):
    before = _snapshot(at_before)

    _migrate(at_before, target=MIGRATION)

    assert _snapshot(at_before) == before
    with closing(sqlite3.connect(at_before)) as c:
        for table in TABLES:
            fks = {fk[3]: (fk[2], fk[6]) for fk in c.execute(f"PRAGMA foreign_key_list('{table}')")}
            assert fks == EXPECTED_FKS[table], table
            indexes = {
                name for (name,) in c.execute(
                    "SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = ? AND sql IS NOT NULL",
                    (table,),
                )
            }
            assert indexes == INDEXES[table], table
            assert c.execute(f"SELECT count(*) FROM {table}").fetchone() == (0,)
        notnull = {r[1] for r in c.execute("PRAGMA table_info('push_devices')") if r[3]}
        assert {"user_id", "installation_id", "transport", "endpoint", "failure_count"} <= notnull
        # Nullable for a later transport without per-device keys (CHT-1608).
        assert not {"p256dh", "auth", "holder_session_id", "credential_id"} & notnull
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]
        assert c.execute("PRAGMA foreign_key_check").fetchall() == []
        assert c.execute("SELECT 1 FROM oxyde_migrations WHERE name = ?", (MIGRATION,)).fetchone()


def test_a_device_goes_with_its_user_session_or_key(at_before):
    _migrate(at_before, target=MIGRATION)
    with closing(sqlite3.connect(at_before)) as c:
        c.execute("PRAGMA foreign_keys = ON")
        _device(c, "d1", installation="i1", endpoint="https://e/1", session="hs1")
        _device(c, "d2", installation="i2", endpoint="https://e/2", key="k1")
        _device(c, "d3", installation="i3", endpoint="https://e/3")
        c.execute(
            "INSERT INTO push_preferences (id, user_id, kind, enabled, updated_at) "
            "VALUES ('p1', 'human', 'MENTION', 0, ?)", (NOW,),
        )
        c.execute("DELETE FROM holder_sessions WHERE id = 'hs1'")
        assert [r[0] for r in c.execute("SELECT id FROM push_devices ORDER BY id")] == ["d2", "d3"]
        c.execute("DELETE FROM api_keys WHERE id = 'k1'")
        assert [r[0] for r in c.execute("SELECT id FROM push_devices")] == ["d3"]
        c.execute("DELETE FROM users WHERE id = 'agent'")
        c.execute("DELETE FROM users WHERE id = 'human'")
        assert c.execute("SELECT count(*) FROM push_devices").fetchone() == (0,)
        assert c.execute("SELECT count(*) FROM push_preferences").fetchone() == (0,)


def test_uniqueness(at_before):
    _migrate(at_before, target=MIGRATION)
    with closing(sqlite3.connect(at_before)) as c:
        _device(c, "d1", installation="i1", endpoint="https://e/1")
        with pytest.raises(sqlite3.IntegrityError):
            _device(c, "d2", installation="i1", endpoint="https://e/2")
        with pytest.raises(sqlite3.IntegrityError):
            _device(c, "d3", installation="i3", endpoint="https://e/1")
        c.execute(
            "INSERT INTO push_preferences (id, user_id, kind, enabled, updated_at) "
            "VALUES ('p1', 'human', 'MENTION', 0, ?)", (NOW,),
        )
        with pytest.raises(sqlite3.IntegrityError):
            c.execute(
                "INSERT INTO push_preferences (id, user_id, kind, enabled, updated_at) "
                "VALUES ('p2', 'human', 'MENTION', 1, ?)", (NOW,),
            )


def test_downgrade_drops_exactly_the_tables(at_before):
    before = _snapshot(at_before)
    _migrate(at_before, target=MIGRATION)
    result = subprocess.run(
        [sys.executable, "-c", _ROLLBACK, at_before],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    assert MIGRATION in result.stdout
    assert _snapshot(at_before) == before
    with closing(sqlite3.connect(at_before)) as c:
        tables = {name for (name,) in c.execute("SELECT name FROM sqlite_master WHERE type = 'table'")}
    assert not TABLES & tables
