"""Tests for migrations/0044_unique_open_children_closed_entry.py (CHT-1928).

Duplicate open CHILDREN_CLOSED entries already written are resolved,
keeping the oldest of each (recipient, parent); then the partial unique
index refuses another open one, and leaves every other kind and every
resolved entry alone.
"""
import sqlite3
from contextlib import closing

import pytest

from .test_parent_user_fk_migration import _migrate

PREVIOUS = "0043_index_issue_scope_and_sprint_columns"
THIS = "0044_unique_open_children_closed_entry"
INDEX = "inbox_entries_open_children_closed_uq"

_INSERT = (
    "INSERT INTO inbox_entries (id, recipient_user_id, kind, team_id, title, created_at, "
    "updated_at, issue_id, resolved_at) VALUES (?, ?, ?, 't1', 'x', ?, ?, ?, ?)"
)


@pytest.fixture
def at_before(tmp_path):
    path = str(tmp_path / "inbox.db")
    _migrate(path, target=PREVIOUS)
    t1, t2, t3 = "2026-10-01 09:00:00.000000", "2026-10-01 10:00:00.000000", "2026-10-01 11:00:00.000000"
    with closing(sqlite3.connect(path)) as c:
        c.executemany(_INSERT, [
            # Three open for (u1, e1): the oldest stays open.
            ("dup-b", "u1", "CHILDREN_CLOSED", t2, t2, "e1", None),
            ("dup-a", "u1", "CHILDREN_CLOSED", t1, t1, "e1", None),
            ("dup-c", "u1", "CHILDREN_CLOSED", t3, t3, "e1", None),
            # Other recipient, other parent, a resolved one, another kind.
            ("other-user", "u2", "CHILDREN_CLOSED", t2, t2, "e1", None),
            ("other-parent", "u1", "CHILDREN_CLOSED", t2, t2, "e2", None),
            ("resolved", "u1", "CHILDREN_CLOSED", t1, t1, "e1", t1),
            ("mention-1", "u1", "MENTION", t1, t1, "e1", None),
            ("mention-2", "u1", "MENTION", t2, t2, "e1", None),
        ])
        c.commit()
    return path


def _open(path):
    with closing(sqlite3.connect(path)) as c:
        return {row[0] for row in c.execute("SELECT id FROM inbox_entries WHERE resolved_at IS NULL")}


def test_duplicates_resolved_keeping_the_oldest(at_before):
    _migrate(at_before, target=THIS)
    assert _open(at_before) == {"dup-a", "other-user", "other-parent", "mention-1", "mention-2"}
    with closing(sqlite3.connect(at_before)) as c:
        rows = {r[0]: r for r in c.execute(
            "SELECT id, read_at, updated_at FROM inbox_entries WHERE id IN ('dup-b', 'dup-c')")}
        for _id, read_at, updated_at in rows.values():
            assert read_at is not None and updated_at > "2026-10-01 11:00:00"
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]


def test_the_index_refuses_a_second_open_entry_only(at_before):
    _migrate(at_before, target=THIS)
    t = "2026-10-02 09:00:00.000000"
    with closing(sqlite3.connect(at_before)) as c:
        assert INDEX in {row[1] for row in c.execute("PRAGMA index_list('inbox_entries')")}
        with pytest.raises(sqlite3.IntegrityError):
            c.execute(_INSERT, ("again", "u1", "CHILDREN_CLOSED", t, t, "e1", None))
        # Resolved, and other kinds, are not constrained.
        c.execute(_INSERT, ("again-resolved", "u1", "CHILDREN_CLOSED", t, t, "e1", t))
        c.execute(_INSERT, ("mention-3", "u1", "MENTION", t, t, "e1", None))
        c.commit()
