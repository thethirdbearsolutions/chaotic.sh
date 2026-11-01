"""Tests for migrations/0043_index_issue_scope_and_sprint_columns.py (CHT-1935).

The migration adds four indexes and nothing else: the reads that filter
an issue by project, parent or sprint, and a sprint's budget
transactions, go through them, and the downgrade removes exactly them.
The parity test (test_migration_state) cannot see an index dropped from
both the model and the migration, so the plans are pinned here
(PR #489 review 1).
"""
import sqlite3
import subprocess
import sys
from contextlib import closing

import pytest

from .test_api_key_hash_migration import _ROLLBACK
from .test_parent_user_fk_migration import BACKEND, _migrate

THIS = "0043_index_issue_scope_and_sprint_columns"
ISSUE_INDEXES = {"ix_issues_project_id", "ix_issues_parent_id", "ix_issues_sprint_id"}
TRANSACTION_INDEXES = {"ix_budget_transactions_sprint_id"}


def _indexes(c, table):
    return {row[1] for row in c.execute(f"PRAGMA index_list('{table}')")}


def _plan(c, sql):
    return " ".join(row[3] for row in c.execute(f"EXPLAIN QUERY PLAN {sql}"))


@pytest.fixture
def migrated(tmp_path):
    path = str(tmp_path / "scope.db")
    _migrate(path, target=THIS)
    return path


def test_reads_go_through_the_new_indexes(migrated):
    with closing(sqlite3.connect(migrated)) as c:
        assert ISSUE_INDEXES <= _indexes(c, "issues")
        assert TRANSACTION_INDEXES <= _indexes(c, "budget_transactions")
        assert "ix_issues_project_id" in _plan(c, "SELECT id FROM issues WHERE project_id = 'p'")
        assert "ix_issues_parent_id" in _plan(c, "SELECT id FROM issues WHERE parent_id = 'e'")
        assert "ix_issues_sprint_id" in _plan(c, "SELECT id FROM issues WHERE sprint_id = 's'")
        assert "ix_budget_transactions_sprint_id" in _plan(
            c, "SELECT id FROM budget_transactions WHERE sprint_id = 's'",
        )
        assert c.execute("SELECT 1 FROM oxyde_migrations WHERE name = ?", (THIS,)).fetchone()


def test_downgrade_removes_exactly_the_four(migrated):
    with closing(sqlite3.connect(migrated)) as c:
        issues_before = _indexes(c, "issues")
        transactions_before = _indexes(c, "budget_transactions")
    result = subprocess.run(
        [sys.executable, "-c", _ROLLBACK, migrated],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    assert THIS in result.stdout
    with closing(sqlite3.connect(migrated)) as c:
        assert _indexes(c, "issues") == issues_before - ISSUE_INDEXES
        assert _indexes(c, "budget_transactions") == transactions_before - TRANSACTION_INDEXES
        assert not c.execute("SELECT 1 FROM oxyde_migrations WHERE name = ?", (THIS,)).fetchone()
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]
