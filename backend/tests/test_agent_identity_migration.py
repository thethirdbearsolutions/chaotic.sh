"""Tests for migrations/0023_agent_identity_columns.py (CHT-1497).

A database at 0022 is seeded with humans, hand-made agents (team- and
project-scoped, with and without a creator) and their keys. After 0023
every agent is kind ASSISTANT, every human has no kind, nothing can
register, nothing has an external_ref or a registrar, and every other
column of every row is unchanged.

Two starting shapes, as for 0020 and 0021: a database built from the
chain, and a production-shaped one whose `users` table is still the one
SQLAlchemy's create_all made (VARCHAR(36)/BOOLEAN/DATETIME columns,
`ix_users_email`, its own foreign-key order), with the REFERENCES clause
0020 appends to `parent_user_id` in place rather than rebuilding the
table. 0023 only adds columns and an index, so both must keep every
other column, index and foreign key.
"""
import sqlite3
from contextlib import closing

import pytest

from .test_parent_user_fk_migration import _migrate

NOW = "2026-10-13T00:00:00+00:00"

# id -> (is_agent, parent_user_id, agent_team_id, agent_project_id)
USERS = {
    "human": (0, None, None, None),
    "admin": (0, None, None, None),
    "team-agent": (1, "human", "t1", None),
    "project-agent": (1, "human", "t1", "p1"),
    "orphan-agent": (1, None, "t1", None),
}


# The pre-Oxyde users table as SQLAlchemy created it, with 0020's
# in-place REFERENCES on parent_user_id (production's shape before 0023).
SQLALCHEMY_USERS = [
    "CREATE TABLE users (\n"
    "\tid VARCHAR(36) NOT NULL, \n"
    "\temail VARCHAR(255) NOT NULL, \n"
    "\thashed_password VARCHAR(255) NOT NULL, \n"
    "\tname VARCHAR(255) NOT NULL, \n"
    "\tavatar_url VARCHAR(500), \n"
    "\tis_active BOOLEAN NOT NULL, \n"
    "\tis_superuser BOOLEAN NOT NULL, \n"
    "\tcreated_at DATETIME NOT NULL, \n"
    "\tupdated_at DATETIME NOT NULL, \n"
    "\tis_agent BOOLEAN NOT NULL, \n"
    "\tparent_user_id VARCHAR(36) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE CASCADE, \n"
    "\tagent_team_id VARCHAR(36), \n"
    "\tagent_project_id VARCHAR(36), \n"
    "\tPRIMARY KEY (id), \n"
    "\tFOREIGN KEY(agent_team_id) REFERENCES teams (id) ON DELETE SET NULL, \n"
    "\tFOREIGN KEY(agent_project_id) REFERENCES projects (id) ON DELETE SET NULL\n"
    ")",
    "CREATE UNIQUE INDEX ix_users_email ON users (email)",
]


def _to_production_users(path: str) -> None:
    """Swap the chain's (empty) users table for production's shape."""
    with closing(sqlite3.connect(path)) as c:
        c.execute("PRAGMA foreign_keys = OFF")
        c.execute("DROP TABLE users")
        for statement in SQLALCHEMY_USERS:
            c.execute(statement)
        c.commit()


@pytest.fixture(params=["chain", "production"])
def at_before(request, tmp_path):
    path = str(tmp_path / f"{request.param}.db")
    _migrate(path, target="0022_api_key_hash_unique")
    if request.param == "production":
        _to_production_users(path)
    with closing(sqlite3.connect(path)) as c:
        c.execute("INSERT INTO teams (id, name, key, created_at, updated_at) VALUES ('t1', 'T', 'T', ?, ?)", (NOW, NOW))
        c.execute(
            "INSERT INTO projects (id, team_id, name, key, created_at, updated_at) VALUES ('p1', 't1', 'P', 'P', ?, ?)",
            (NOW, NOW),
        )
        for user_id, (is_agent, parent, team, project) in USERS.items():
            c.execute(
                "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, "
                "parent_user_id, agent_team_id, agent_project_id, is_active, is_superuser) "
                "VALUES (?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, 1, 0)",
                (user_id, f"{user_id}@example.com", user_id, NOW, NOW, is_agent, parent, team, project),
            )
        c.execute(
            "INSERT INTO api_keys (id, principal_user_id, holder_user_id, name, key_prefix, key_hash, "
            "created_at, is_active) VALUES ('k1', 'team-agent', 'human', 'n', 'ck_00000001', 'sha256$x', ?, 1)",
            (NOW,),
        )
        c.commit()
    return path


def _users(path: str) -> dict[str, dict]:
    with closing(sqlite3.connect(path)) as c:
        c.row_factory = sqlite3.Row
        return {row["id"]: dict(row) for row in c.execute("SELECT * FROM users")}


NEW = {"kind", "external_ref", "registered_by_id", "can_register"}


def _indexes_and_fks(path: str):
    with closing(sqlite3.connect(path)) as c:
        indexes = {
            name: sql for name, sql in c.execute(
                "SELECT name, sql FROM sqlite_master WHERE type = 'index' AND tbl_name = 'users'"
            )
        }
        fks = sorted(tuple(fk[2:]) for fk in c.execute("PRAGMA foreign_key_list('users')"))
    return indexes, fks


def test_agents_become_assistants_and_nothing_else_changes(at_before):
    before = _users(at_before)
    indexes_before, fks_before = _indexes_and_fks(at_before)

    _migrate(at_before)

    after = _users(at_before)
    indexes_after, fks_after = _indexes_and_fks(at_before)
    assert fks_after == fks_before and len(fks_after) == 3
    new_indexes = {"users_team_external_ref_uq", "ix_users_registered_by_id"}
    assert {k: v for k, v in indexes_after.items() if k not in new_indexes} == indexes_before
    assert new_indexes <= set(indexes_after)
    assert set(after) == set(before) == set(USERS)
    for user_id, row in after.items():
        assert {k: v for k, v in row.items() if k not in NEW} == before[user_id], user_id
        assert row["kind"] == ("ASSISTANT" if USERS[user_id][0] else None), user_id
        assert row["external_ref"] is None and row["registered_by_id"] is None
        assert row["can_register"] == 0
    with closing(sqlite3.connect(at_before)) as c:
        assert c.execute("SELECT count(*) FROM api_keys").fetchone() == (1,)
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]
        assert c.execute("PRAGMA foreign_key_check").fetchall() == []
        assert c.execute(
            "SELECT 1 FROM oxyde_migrations WHERE name = '0023_agent_identity_columns'"
        ).fetchone()


def test_the_index_makes_an_address_unique_per_team_only(at_before):
    _migrate(at_before)
    with closing(sqlite3.connect(at_before)) as c:
        sql = c.execute(
            "SELECT sql FROM sqlite_master WHERE type = 'index' AND name = 'users_team_external_ref_uq'"
        ).fetchone()[0]
        assert "UNIQUE" in sql.upper()

        def add(user_id, team, ref):
            c.execute(
                "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, "
                "is_active, is_superuser, agent_team_id, external_ref, kind) "
                "VALUES (?, ?, 'x', ?, ?, ?, 1, 1, 0, ?, ?, 'SESSION')",
                (user_id, f"{user_id}@example.com", user_id, NOW, NOW, team, ref),
            )

        add("s1", "t1", "claude-code:session:a")
        add("s2", "t2", "claude-code:session:a")  # another team may reuse the address
        add("s3", "t1", None)  # NULLs never collide
        add("s4", "t1", None)
        with pytest.raises(sqlite3.IntegrityError):
            add("s5", "t1", "claude-code:session:a")
        plan = " ".join(
            row[3] for row in c.execute(
                "EXPLAIN QUERY PLAN SELECT id FROM users WHERE agent_team_id = 't1' AND external_ref = 'x'"
            )
        )
        assert "users_team_external_ref_uq" in plan
