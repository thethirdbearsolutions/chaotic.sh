"""Tests for migrations/0028_inbox_issue_document_indexes.py (CHT-1626).

The migration adds two indexes and nothing else: existing rows are
untouched, and settling an issue's or a document's entries reads through
the new index instead of scanning the table.
"""
import sqlite3
from contextlib import closing

import pytest

from .test_parent_user_fk_migration import _migrate

PREVIOUS = "0027_inbox_sync_columns"
THIS = "0028_inbox_issue_document_indexes"


@pytest.fixture
def at_before(tmp_path):
    path = str(tmp_path / "inbox.db")
    _migrate(path, target=PREVIOUS)
    with closing(sqlite3.connect(path)) as c:
        c.executemany(
            "INSERT INTO inbox_entries (id, recipient_user_id, kind, team_id, title, created_at, "
            "updated_at, issue_id, document_id) VALUES (?, 'u1', 'MENTION', 't1', ?, "
            "'2026-10-01 09:00:00', '2026-10-01 09:00:00', ?, ?)",
            [("on-issue", "a", "i1", None), ("on-doc", "b", None, "d1"), ("neither", "c", None, None)],
        )
        c.commit()
    return path


def _rows(path):
    with closing(sqlite3.connect(path)) as c:
        c.row_factory = sqlite3.Row
        return {row["id"]: dict(row) for row in c.execute("SELECT * FROM inbox_entries")}


def _plan(c, where):
    return " ".join(row[3] for row in c.execute(f"EXPLAIN QUERY PLAN SELECT id FROM inbox_entries WHERE {where}"))


def test_indexes_added_and_nothing_else_changes(at_before):
    before = _rows(at_before)
    _migrate(at_before)
    assert _rows(at_before) == before
    with closing(sqlite3.connect(at_before)) as c:
        indexes = {row[1]: row for row in c.execute("PRAGMA index_list('inbox_entries')")}
        assert "inbox_entries_issue_id_idx" in indexes and "inbox_entries_document_id_idx" in indexes
        assert "inbox_entries_issue_id_idx" in _plan(c, "issue_id IN ('i1', 'i2') AND resolved_at IS NULL")
        assert "inbox_entries_document_id_idx" in _plan(c, "document_id = 'd1'")
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]
        assert c.execute("SELECT 1 FROM oxyde_migrations WHERE name = ?", (THIS,)).fetchone()
