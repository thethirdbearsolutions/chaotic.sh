"""Tests for migrations/0027_inbox_sync_columns.py (CHT-1607).

A database one migration short is seeded with inbox entries in each
state. After the migration every entry's updated_at is the latest of its
own timestamps, nothing is resolved, every other column is unchanged,
and the sync index exists and serves the sync scan.
"""
import sqlite3
from contextlib import closing

import pytest

from .test_parent_user_fk_migration import _migrate

PREVIOUS = "0025_ritual_rejections"
THIS = "0027_inbox_sync_columns"

# id -> (created_at, read_at, archived_at), in the text form Oxyde stores.
ENTRIES = {
    "unread": ("2026-10-01 09:00:00.000001", None, None),
    "read": ("2026-10-01 09:00:00", "2026-10-02 10:30:00.5", None),
    "archived": ("2026-10-01 09:00:00", "2026-10-03 11:00:00", "2026-10-03 11:00:00"),
    "read-after-archive": ("2026-10-01 09:00:00", "2026-10-05 08:00:00", "2026-10-04 08:00:00"),
}
EXPECTED = {
    "unread": "2026-10-01 09:00:00.000001",
    "read": "2026-10-02 10:30:00.5",
    "archived": "2026-10-03 11:00:00",
    "read-after-archive": "2026-10-05 08:00:00",
}


@pytest.fixture
def at_before(tmp_path):
    path = str(tmp_path / "inbox.db")
    _migrate(path, target=PREVIOUS)
    with closing(sqlite3.connect(path)) as c:
        for entry_id, (created, read, archived) in ENTRIES.items():
            c.execute(
                "INSERT INTO inbox_entries (id, recipient_user_id, kind, team_id, title, created_at, "
                "read_at, archived_at) VALUES (?, 'u1', 'MENTION', 't1', ?, ?, ?, ?)",
                (entry_id, entry_id, created, read, archived),
            )
        c.commit()
    return path


def _rows(path: str) -> dict[str, dict]:
    with closing(sqlite3.connect(path)) as c:
        c.row_factory = sqlite3.Row
        return {row["id"]: dict(row) for row in c.execute("SELECT * FROM inbox_entries")}


def test_backfill_and_nothing_else_changes(at_before):
    before = _rows(at_before)
    _migrate(at_before)
    after = _rows(at_before)

    assert set(after) == set(ENTRIES)
    for entry_id, row in after.items():
        assert {k: v for k, v in row.items() if k not in {"updated_at", "resolved_at"}} == before[entry_id]
        assert row["updated_at"] == EXPECTED[entry_id], entry_id
        assert row["resolved_at"] is None
    with closing(sqlite3.connect(at_before)) as c:
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]
        assert c.execute("SELECT 1 FROM oxyde_migrations WHERE name = ?", (THIS,)).fetchone()


def test_updated_at_is_not_null_and_the_index_serves_the_scan(at_before):
    _migrate(at_before)
    with closing(sqlite3.connect(at_before)) as c:
        cols = {row[1]: row for row in c.execute("PRAGMA table_info('inbox_entries')")}
        assert cols["updated_at"][3] == 1  # NOT NULL
        assert cols["resolved_at"][3] == 0
        plan = " ".join(
            row[3] for row in c.execute(
                "EXPLAIN QUERY PLAN SELECT id FROM inbox_entries WHERE recipient_user_id = 'u1' "
                "AND (updated_at > '2026' OR (updated_at = '2026' AND id > 'x')) ORDER BY updated_at, id"
            )
        )
        assert "inbox_entries_recipient_updated_idx" in plan
