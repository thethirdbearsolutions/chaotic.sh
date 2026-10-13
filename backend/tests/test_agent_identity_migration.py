"""Tests for migrations/0022_agent_identity_columns.py (CHT-1497).

A database at 0021 is seeded with humans, hand-made agents (team- and
project-scoped, with and without a creator) and their keys. After 0022
every agent is kind ASSISTANT, every human has no kind, nothing can
register, nothing has an external_ref or a registrar, and every other
column of every row is unchanged. Two starting shapes, as for 0021: a
database built from the chain, and one whose api_keys came from 0021's
rebuild of a SQLAlchemy-era table (the users table is the same in both,
so one shape is enough here).
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


@pytest.fixture
def at_0021(tmp_path):
    path = str(tmp_path / "chain.db")
    _migrate(path, target="0021_api_key_principal_and_holder")
    with closing(sqlite3.connect(path)) as c:
        c.execute("INSERT INTO teams (id, name, key, created_at, updated_at) VALUES ('t1', 'T', 'T', ?, ?)", (NOW, NOW))
        c.execute(
            "INSERT INTO projects (id, team_id, name, key, created_at, updated_at) VALUES ('p1', 't1', 'P', 'P', ?, ?)",
            (NOW, NOW),
        )
        for user_id, (is_agent, parent, team, project) in USERS.items():
            c.execute(
                "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, "
                "parent_user_id, agent_team_id, agent_project_id, is_active) "
                "VALUES (?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, 1)",
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


def test_agents_become_assistants_and_nothing_else_changes(at_0021):
    before = _users(at_0021)

    _migrate(at_0021)

    after = _users(at_0021)
    assert set(after) == set(before) == set(USERS)
    for user_id, row in after.items():
        assert {k: v for k, v in row.items() if k not in NEW} == before[user_id], user_id
        assert row["kind"] == ("ASSISTANT" if USERS[user_id][0] else None), user_id
        assert row["external_ref"] is None and row["registered_by_id"] is None
        assert row["can_register"] == 0
    with closing(sqlite3.connect(at_0021)) as c:
        assert c.execute("SELECT count(*) FROM api_keys").fetchone() == (1,)
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]
        assert c.execute("PRAGMA foreign_key_check").fetchall() == []
        assert c.execute(
            "SELECT 1 FROM oxyde_migrations WHERE name = '0022_agent_identity_columns'"
        ).fetchone()


def test_the_index_makes_an_address_unique_per_team_only(at_0021):
    _migrate(at_0021)
    with closing(sqlite3.connect(at_0021)) as c:
        sql = c.execute(
            "SELECT sql FROM sqlite_master WHERE type = 'index' AND name = 'users_team_external_ref_uq'"
        ).fetchone()[0]
        assert "UNIQUE" in sql.upper()

        def add(user_id, team, ref):
            c.execute(
                "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, "
                "agent_team_id, external_ref, kind) VALUES (?, ?, 'x', ?, ?, ?, 1, ?, ?, 'SESSION')",
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
