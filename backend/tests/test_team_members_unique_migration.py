"""Tests for migrations/0033_team_members_unique.py (CHT-1791).

A database at 0032 is seeded with duplicate memberships. After 0033
each (team_id, user_id) has one row: the first one inserted (lowest
rowid), which is the row TeamService.get_member has been returning, so
nobody's effective role changes. Every deleted row is printed. Rows
with a NULL user_id are not memberships of anyone and are left alone.
The database then refuses a second membership row, and the downgrade
drops the index again.
"""
import sqlite3
import subprocess
import sys
from contextlib import closing

import pytest

from .test_api_key_hash_migration import _ROLLBACK
from .test_parent_user_fk_migration import _MIGRATE, BACKEND, _migrate

PREVIOUS = "0032_email_verification"
THIS = "0033_team_members_unique"
INDEX = "ux_team_members_team_user"
NOW = "2026-10-15T00:00:00+00:00"

# id -> (team_id, user_id, role as stored, joined_at), inserted in this
# order: rowid order is insertion order.
MEMBERS = {
    # u1 in t1: demoted after a duplicate appeared. The first row (the one
    # get_member returned and update_member_role wrote) says MEMBER; the
    # later, more privileged rows must not come back (review of PR #431).
    "u1-member": ("t1", "u1", "MEMBER", "2026-01-01T00:00:00+00:00"),
    "u1-admin": ("t1", "u1", "ADMIN", "2026-02-01T00:00:00+00:00"),
    "u1-owner": ("t1", "u1", "OWNER", "2026-03-01T00:00:00+00:00"),
    # u2 in t1: neither a later join time nor a higher id unseats the
    # first-inserted row.
    "u2-late": ("t1", "u2", "ADMIN", "2026-05-01T00:00:00+00:00"),
    "u2-early": ("t1", "u2", "ADMIN", "2026-04-01T00:00:00+00:00"),
    "u3-b": ("t1", "u3", "MEMBER", "2026-06-01T00:00:00+00:00"),
    "u3-a": ("t1", "u3", "MEMBER", "2026-06-01T00:00:00+00:00"),
    # Not duplicates: one row per (team, user).
    "u4-only": ("t1", "u4", "MEMBER", "2026-01-01T00:00:00+00:00"),
    "u1-other-team": ("t2", "u1", "MEMBER", "2026-01-01T00:00:00+00:00"),
    # u2 in t2: role spelling plays no part.
    "u2-t2-value": ("t2", "u2", "member", "2026-01-01T00:00:00+00:00"),
    "u2-t2-str-member": ("t2", "u2", "TeamRole.ADMIN", "2026-02-01T00:00:00+00:00"),
    # No user: SQLite's unique index treats NULLs as distinct.
    "orphan-1": ("t1", None, "MEMBER", "2026-01-01T00:00:00+00:00"),
    "orphan-2": ("t1", None, "MEMBER", "2026-01-01T00:00:00+00:00"),
}
DELETED = {"u1-admin", "u1-owner", "u2-early", "u3-a", "u2-t2-str-member"}


def _migrate_capturing(path: str, target: str) -> str:
    """_migrate, returning the child's stdout (the migration's report)."""
    result = subprocess.run(
        [sys.executable, "-c", _MIGRATE, path, target],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    return result.stdout


def _seed(path: str, members: dict) -> None:
    with closing(sqlite3.connect(path)) as c:
        for user_id in ("u1", "u2", "u3", "u4"):
            c.execute(
                "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, "
                "is_active) VALUES (?, ?, 'x', 'U', ?, ?, 0, 1)",
                (user_id, f"{user_id}@example.com", NOW, NOW),
            )
        for team_id in ("t1", "t2"):
            c.execute(
                "INSERT INTO teams (id, name, key, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
                (team_id, team_id, team_id.upper(), NOW, NOW),
            )
        for member_id, (team_id, user_id, role, joined_at) in members.items():
            c.execute(
                "INSERT INTO team_members (id, team_id, user_id, role, joined_at) VALUES (?, ?, ?, ?, ?)",
                (member_id, team_id, user_id, role, joined_at),
            )
        c.commit()


def _rows(path: str) -> dict[str, tuple]:
    with closing(sqlite3.connect(path)) as c:
        return {
            row[0]: row[1:]
            for row in c.execute("SELECT id, team_id, user_id, role, joined_at FROM team_members")
        }


def _index_sql(path: str):
    with closing(sqlite3.connect(path)) as c:
        row = c.execute("SELECT sql FROM sqlite_master WHERE type = 'index' AND name = ?", (INDEX,)).fetchone()
        return row[0] if row else None


@pytest.fixture
def at_previous(tmp_path):
    path = str(tmp_path / "members.db")
    _migrate(path, target=PREVIOUS)
    return path


def _effective_member_ids(path: str) -> dict[tuple, str]:
    """The row get_member's query (filter(team_id, user_id).first(): no
    ORDER BY) returns for each (team, user), as it plans at 0032."""
    with closing(sqlite3.connect(path)) as c:
        pairs = c.execute(
            "SELECT DISTINCT team_id, user_id FROM team_members WHERE user_id IS NOT NULL"
        ).fetchall()
        return {
            pair: c.execute(
                "SELECT id FROM team_members WHERE team_id = ? AND user_id = ? LIMIT 1", pair
            ).fetchone()[0]
            for pair in pairs
        }


def test_duplicates_are_removed_keeping_the_row_the_app_has_been_using(at_previous):
    _seed(at_previous, MEMBERS)
    effective = _effective_member_ids(at_previous)


    output = _migrate_capturing(at_previous, THIS)

    rows = _rows(at_previous)
    assert set(rows) == set(MEMBERS) - DELETED
    # The survivors are untouched.
    for member_id, row in rows.items():
        assert row == MEMBERS[member_id]
    # Every deleted row is named, with a total.
    for member_id in DELETED:
        assert f"deleting row {member_id} " in output
    for member_id in rows:
        assert f"deleting row {member_id} " not in output
    assert "[0033] removing 5 duplicate team_members row(s)" in output
    # Nobody's membership changed: each survivor is the row get_member read.
    assert {(row[0], row[1]): member_id for member_id, row in rows.items() if row[1]} == effective
    assert rows["u1-member"][2] == "MEMBER"


def test_the_index_rejects_a_second_membership(at_previous):
    _seed(at_previous, MEMBERS)
    _migrate(at_previous, target=THIS)

    assert "UNIQUE" in _index_sql(at_previous).upper()
    with closing(sqlite3.connect(at_previous)) as c:
        with pytest.raises(sqlite3.IntegrityError):
            c.execute(
                "INSERT INTO team_members (id, team_id, user_id, role, joined_at) "
                "VALUES ('again', 't1', 'u4', 'ADMIN', ?)",
                (NOW,),
            )
        # Another team, or no user, is still fine.
        c.execute(
            "INSERT INTO team_members (id, team_id, user_id, role, joined_at) VALUES ('t2-u4', 't2', 'u4', 'MEMBER', ?)",
            (NOW,),
        )
        c.execute(
            "INSERT INTO team_members (id, team_id, user_id, role, joined_at) VALUES ('orphan-3', 't1', NULL, 'MEMBER', ?)",
            (NOW,),
        )
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]


def test_no_duplicates_no_report_and_no_row_changes(at_previous):
    clean = {k: v for k, v in MEMBERS.items() if k not in DELETED}
    _seed(at_previous, clean)

    output = _migrate_capturing(at_previous, THIS)

    assert "[0033]" not in output
    assert _rows(at_previous) == clean
    assert _index_sql(at_previous) is not None


def test_downgrade_drops_the_index(at_previous):
    _seed(at_previous, MEMBERS)
    _migrate(at_previous, target=THIS)
    before = _rows(at_previous)

    result = subprocess.run(
        [sys.executable, "-c", _ROLLBACK, at_previous],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    assert THIS in result.stdout

    assert _index_sql(at_previous) is None
    assert _rows(at_previous) == before
