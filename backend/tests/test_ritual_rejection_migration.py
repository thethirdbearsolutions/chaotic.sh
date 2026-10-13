"""Tests for migrations/0025_ritual_rejections.py (CHT-1606).

0025 creates one table and touches nothing else. A database at 0024 is
seeded with a team, a human, an agent, a project, an issue and a ritual;
after 0025 every pre-existing table's DDL, indexes, foreign keys and rows
are unchanged, and the new table has the columns, index and ON DELETE
actions the model declares.

Two starting shapes, as for 0024: a database built from the chain, and a
production-shaped one whose `users` table is still the one SQLAlchemy's
create_all made, which the new table now references.
"""
import sqlite3
import subprocess
import sys
from contextlib import closing

import pytest

from .test_parent_user_fk_migration import BACKEND, _migrate
from .test_token_store_migration import _ROLLBACK, _to_production_users

NOW = "2026-10-13T00:00:00+00:00"
TABLE = "ritual_rejections"
INDEX = "ritual_rejections_ritual_issue_idx"

# column -> (referenced table, ON DELETE)
EXPECTED_FKS = {
    "ritual_id": ("rituals", "CASCADE"),
    "issue_id": ("issues", "CASCADE"),
    "attested_by_id": ("users", "SET NULL"),
    "rejected_by_id": ("users", "SET NULL"),
}


@pytest.fixture(params=["chain", "production"])
def at_before(request, tmp_path):
    path = str(tmp_path / f"{request.param}.db")
    _migrate(path, target="0022_api_key_hash_unique")
    if request.param == "production":
        _to_production_users(path)
    _migrate(path, target="0024_token_store")
    with closing(sqlite3.connect(path)) as c:
        c.execute("INSERT INTO teams (id, name, key, created_at, updated_at) VALUES ('t1', 'T', 'T', ?, ?)", (NOW, NOW))
        for user_id, is_agent, parent, kind in (
            ("admin", 0, None, None), ("agent", 1, "admin", "ASSISTANT"),
        ):
            c.execute(
                "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, "
                "parent_user_id, agent_team_id, kind, is_active, is_superuser, can_register) "
                "VALUES (?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, 1, 0, 0)",
                (user_id, f"{user_id}@example.com", user_id, NOW, NOW, is_agent, parent,
                 "t1" if is_agent else None, kind),
            )
        c.execute(
            "INSERT INTO projects (id, team_id, name, key, created_at, updated_at) "
            "VALUES ('p1', 't1', 'P', 'P', ?, ?)", (NOW, NOW),
        )
        c.execute(
            "INSERT INTO issues (id, project_id, identifier, number, title, created_at, updated_at) "
            "VALUES ('i1', 'p1', 'P-1', 1, 'Issue', ?, ?)", (NOW, NOW),
        )
        c.execute(
            "INSERT INTO rituals (id, project_id, name, prompt, created_at, updated_at) "
            "VALUES ('r1', 'p1', 'gate', 'ok?', ?, ?)", (NOW, NOW),
        )
        c.commit()
    return path


def _snapshot(path: str):
    """DDL of every object, and every row, of every table but the new one
    and the migration ledger."""
    with closing(sqlite3.connect(path)) as c:
        ddl = {
            (kind, name): sql for kind, name, sql in c.execute(
                "SELECT type, name, sql FROM sqlite_master WHERE name NOT LIKE 'sqlite_%'"
            )
            if name not in (TABLE, INDEX, "oxyde_migrations")
        }
        tables = [t for (kind, t) in ddl if kind == "table"]
        rows = {t: sorted(map(tuple, c.execute(f'SELECT * FROM "{t}"'))) for t in tables}
    return ddl, rows


def _seed(c, attester: str | None = "agent") -> None:
    c.execute(
        f"INSERT INTO {TABLE} (id, ritual_id, issue_id, attested_by_id, attested_at, rejected_by_id, "
        "rejected_at, note) VALUES ('x1', 'r1', 'i1', ?, ?, 'admin', ?, 'Not yet')",
        (attester, NOW, NOW),
    )


def test_creates_the_table_and_changes_nothing_else(at_before):
    before = _snapshot(at_before)

    _migrate(at_before)

    assert _snapshot(at_before) == before
    with closing(sqlite3.connect(at_before)) as c:
        fks = {fk[3]: (fk[2], fk[6]) for fk in c.execute(f"PRAGMA foreign_key_list('{TABLE}')")}
        assert fks == EXPECTED_FKS
        indexes = {
            name for (name,) in c.execute(
                "SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = ? AND sql IS NOT NULL", (TABLE,)
            )
        }
        assert indexes == {INDEX}
        notnull = {r[1] for r in c.execute(f"PRAGMA table_info('{TABLE}')") if r[3]}
        assert {"rejected_at", "note"} <= notnull
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]
        assert c.execute("PRAGMA foreign_key_check").fetchall() == []
        assert c.execute("SELECT 1 FROM oxyde_migrations WHERE name = '0025_ritual_rejections'").fetchone()
        assert c.execute(f"SELECT count(*) FROM {TABLE}").fetchone() == (0,)


def test_a_rejection_outlives_its_people_but_not_its_issue_or_ritual(at_before):
    _migrate(at_before)
    with closing(sqlite3.connect(at_before)) as c:
        c.execute("PRAGMA foreign_keys = ON")
        _seed(c)
        c.commit()
        c.execute("DELETE FROM users WHERE id = 'agent'")
        assert c.execute(f"SELECT attested_by_id, rejected_by_id FROM {TABLE}").fetchall() == [(None, "admin")]
        c.execute("DELETE FROM issues WHERE id = 'i1'")
        assert c.execute(f"SELECT count(*) FROM {TABLE}").fetchone() == (0,)
        c.execute("INSERT INTO issues (id, project_id, identifier, number, title, created_at, updated_at) "
                  "VALUES ('i1', 'p1', 'P-1', 1, 'Issue', ?, ?)", (NOW, NOW))
        _seed(c, attester=None)
        c.execute("DELETE FROM rituals WHERE id = 'r1'")
        assert c.execute(f"SELECT count(*) FROM {TABLE}").fetchone() == (0,)


def test_downgrade_drops_exactly_the_table(at_before):
    before = _snapshot(at_before)
    _migrate(at_before)
    result = subprocess.run(
        [sys.executable, "-c", _ROLLBACK, at_before],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    assert "0025_ritual_rejections" in result.stdout
    assert _snapshot(at_before) == before
    with closing(sqlite3.connect(at_before)) as c:
        tables = {name for (name,) in c.execute("SELECT name FROM sqlite_master WHERE type = 'table'")}
    assert TABLE not in tables
