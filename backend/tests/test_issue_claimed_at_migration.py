"""Tests for migrations/0030_issue_claimed_at.py (CHT-1672).

A database one migration short is seeded with issues in each state, some
with a status-change activity into IN_PROGRESS. After the migration every
issue that was demonstrably claimed has claimed_at (the first such
activity's time, else its updated_at), the rest stay NULL, and every
other column is unchanged.
"""
import sqlite3
from contextlib import closing

import pytest

from .test_parent_user_fk_migration import _migrate

PREVIOUS = "0029_idempotency_records"
THIS = "0030_issue_claimed_at"

UPDATED = "2026-10-10 12:00:00"
# id -> status, in the stored (enum name) form.
ISSUES = {
    "backlog": "BACKLOG",
    "todo": "TODO",
    "canceled": "CANCELED",
    "in-progress": "IN_PROGRESS",
    "in-review": "IN_REVIEW",
    "done": "DONE",
    "todo-was-claimed": "TODO",
    "canceled-was-claimed": "CANCELED",
}
# issue id -> created_at of STATUS_CHANGED activities into IN_PROGRESS.
CLAIMS = {
    "todo-was-claimed": ["2026-10-05 09:00:00", "2026-10-03 08:00:00"],
    "canceled-was-claimed": ["2026-10-04 10:00:00"],
    "done": ["2026-10-02 07:00:00"],
}
EXPECTED = {
    "backlog": None,
    "todo": None,
    "canceled": None,
    "in-progress": UPDATED,
    "in-review": UPDATED,
    "done": "2026-10-02 07:00:00",
    "todo-was-claimed": "2026-10-03 08:00:00",
    "canceled-was-claimed": "2026-10-04 10:00:00",
}


@pytest.fixture
def at_before(tmp_path):
    path = str(tmp_path / "claimed.db")
    _migrate(path, target=PREVIOUS)
    with closing(sqlite3.connect(path)) as c:
        for n, (issue_id, status) in enumerate(ISSUES.items(), start=1):
            c.execute(
                "INSERT INTO issues (id, project_id, identifier, number, title, status, priority, "
                "issue_type, created_at, updated_at) VALUES (?, 'p1', ?, ?, ?, ?, 'NO_PRIORITY', 'TASK', "
                "'2026-10-01 00:00:00', ?)",
                (issue_id, f"P-{n}", n, issue_id, status, UPDATED),
            )
        for issue_id, times in CLAIMS.items():
            for i, at in enumerate(times):
                c.execute(
                    "INSERT INTO issue_activities (id, issue_id, user_id, activity_type, field_name, "
                    "old_value, new_value, created_at) VALUES (?, ?, 'u1', 'STATUS_CHANGED', 'status', "
                    "'TODO', 'IN_PROGRESS', ?)",
                    (f"{issue_id}-{i}", issue_id, at),
                )
        # Activities that are not a claim do not count.
        c.execute(
            "INSERT INTO issue_activities (id, issue_id, user_id, activity_type, field_name, "
            "old_value, new_value, created_at) VALUES ('noise-1', 'backlog', 'u1', 'STATUS_CHANGED', "
            "'status', 'BACKLOG', 'TODO', '2026-10-06 00:00:00')"
        )
        c.execute(
            "INSERT INTO issue_activities (id, issue_id, user_id, activity_type, field_name, "
            "old_value, new_value, created_at) VALUES ('noise-2', 'todo', 'u1', 'UPDATED', "
            "'title', NULL, 'IN_PROGRESS', '2026-10-06 00:00:00')"
        )
        c.commit()
    return path


def _rows(path: str) -> dict[str, dict]:
    with closing(sqlite3.connect(path)) as c:
        c.row_factory = sqlite3.Row
        return {row["id"]: dict(row) for row in c.execute("SELECT * FROM issues")}


def test_backfill_and_nothing_else_changes(at_before):
    before = _rows(at_before)
    _migrate(at_before)
    after = _rows(at_before)

    assert set(after) == set(ISSUES)
    for issue_id, row in after.items():
        assert {k: v for k, v in row.items() if k != "claimed_at"} == before[issue_id]
        assert row["claimed_at"] == EXPECTED[issue_id], issue_id
    with closing(sqlite3.connect(at_before)) as c:
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]
        assert c.execute("SELECT 1 FROM oxyde_migrations WHERE name = ?", (THIS,)).fetchone()
        cols = {row[1]: row for row in c.execute("PRAGMA table_info('issues')")}
        assert cols["claimed_at"][3] == 0  # nullable


def test_backfilled_value_reads_back_through_the_model(at_before, tmp_path):
    """The backfill copies the stored text form, so Oxyde parses it like
    any datetime it wrote itself."""
    _migrate(at_before)
    import subprocess
    import sys

    from .test_parent_user_fk_migration import BACKEND

    script = (
        "import asyncio, sys\n"
        "from oxyde import AsyncDatabase, PoolSettings, disconnect_all\n"
        "async def main(path):\n"
        "    database = AsyncDatabase(f'sqlite:///{path}', overwrite=True, settings=PoolSettings(max_connections=1))\n"
        "    await database.connect()\n"
        "    import app.oxyde_models  # noqa: F401\n"
        "    from app.oxyde_models.issue import OxydeIssue\n"
        "    try:\n"
        "        issue = await OxydeIssue.objects.get(id='todo-was-claimed')\n"
        "        print(issue.claimed_at.isoformat())\n"
        "    finally:\n"
        "        await disconnect_all()\n"
        "asyncio.run(main(sys.argv[1]))\n"
    )
    result = subprocess.run(
        [sys.executable, "-c", script, at_before],
        cwd=BACKEND, capture_output=True, text=True, timeout=120, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    assert result.stdout.strip().startswith("2026-10-03T08:00:00")
