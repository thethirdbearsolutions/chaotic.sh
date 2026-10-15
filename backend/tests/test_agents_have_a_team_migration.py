"""Tests for migrations/0036_agents_have_a_team.py (CHT-1837).

A database at 0034 is seeded with agents that have no team: one whose
project exists (placed), one whose project is gone and one with no
project at all (both left, and said why), and one whose (team,
external_ref) is already held (left, so the unique index cannot fail
the upgrade). Agents that already have a team, and humans, are not
touched. Every line names rows by id only.
"""
import sqlite3
import subprocess
import sys
from contextlib import closing

import pytest

from .test_api_key_hash_migration import _ROLLBACK
from .test_parent_user_fk_migration import BACKEND, _migrate
from .test_users_email_folded_migration import _migrate_capturing

PREVIOUS = "0034_users_email_folded"
THIS = "0036_agents_have_a_team"
NOW = "2026-10-15T00:00:00+00:00"

# id -> (is_agent, agent_team_id, agent_project_id, external_ref)
USERS = {
    "u-human": (0, None, None, None),
    "a-teamed": (1, "t-1", None, None),
    "a-teamed-scoped": (1, "t-1", "p-1", None),
    "a-legacy": (1, None, "p-1", None),
    "a-legacy-other": (1, None, "p-2", "claude-code:session:x"),
    "a-orphan": (1, None, "p-gone", None),
    "a-nothing": (1, None, None, None),
    "a-holder": (1, "t-2", None, "claude-code:session:dup"),
    "a-clash": (1, None, "p-2", "claude-code:session:dup"),
}
PLACED = {"a-legacy": ("t-1", "p-1"), "a-legacy-other": ("t-2", "p-2")}
LEFT = {"a-orphan", "a-nothing", "a-clash"}


def _seed(path: str) -> None:
    with closing(sqlite3.connect(path)) as c:
        # Python's sqlite3 leaves foreign keys off, as a project deleted
        # while they were off would have left them: a-orphan names p-gone.
        c.execute("INSERT INTO teams (id, name, key, created_at, updated_at) VALUES ('t-1', 'One', 'ONE', ?, ?)", (NOW, NOW))
        c.execute("INSERT INTO teams (id, name, key, created_at, updated_at) VALUES ('t-2', 'Two', 'TWO', ?, ?)", (NOW, NOW))
        for project_id, team_id, key in (("p-1", "t-1", "PA"), ("p-2", "t-2", "PB")):
            c.execute(
                "INSERT INTO projects (id, team_id, name, key, color, issue_count, created_at, updated_at) "
                "VALUES (?, ?, ?, ?, '#000000', 0, ?, ?)",
                (project_id, team_id, key, key, NOW, NOW),
            )
        for n, (user_id, (is_agent, team_id, project_id, ref)) in enumerate(USERS.items()):
            c.execute(
                "INSERT INTO users (id, email, email_folded, hashed_password, name, created_at, updated_at, "
                "is_agent, is_active, parent_user_id, agent_team_id, agent_project_id, external_ref) "
                "VALUES (?, ?, ?, 'x', ?, ?, ?, ?, 1, ?, ?, ?, ?)",
                (
                    user_id, f"{user_id}@example.com", f"{user_id}@example.com", user_id,
                    f"2026-01-01T00:00:{n:02d}+00:00", NOW, is_agent,
                    "u-human" if is_agent else None, team_id, project_id, ref,
                ),
            )
        c.commit()


def _rows(path: str) -> dict[str, dict]:
    with closing(sqlite3.connect(path)) as c:
        c.row_factory = sqlite3.Row
        return {row["id"]: dict(row) for row in c.execute("SELECT * FROM users")}


@pytest.fixture
def at_previous(tmp_path):
    path = str(tmp_path / "agents.db")
    _migrate(path, target=PREVIOUS)
    _seed(path)
    return path


def test_legacy_agents_get_their_projects_team_and_the_rest_are_reported(at_previous):
    before = _rows(at_previous)

    output = _migrate_capturing(at_previous, THIS)

    after = _rows(at_previous)
    for user_id, row in before.items():
        expected = dict(row)
        if user_id in PLACED:
            expected["agent_team_id"] = PLACED[user_id][0]
        assert after[user_id] == expected, user_id
    for user_id, (team_id, project_id) in PLACED.items():
        assert (
            f"[0036] agent {user_id}: agent_team_id set to {team_id}, the team of its project {project_id}"
            in output
        )
    assert "[0036] agent a-orphan: its project p-gone no longer exists; agent_team_id left NULL." in output
    assert "[0036] agent a-nothing has neither a team nor a project; agent_team_id left NULL." in output
    assert "[0036] agent a-clash: team t-2 already has an identity with its external_ref;" in output
    assert "[0036] 2 agent(s) given their project's team, 3 left without one" in output
    # One line per agent it looked at, plus the total; none for the rest.
    assert output.count("[0036]") == len(PLACED) + len(LEFT) + 1
    for user_id in ("u-human", "a-teamed", "a-teamed-scoped", "a-holder"):
        assert user_id not in output
    # Ids only.
    assert "@" not in output and "claude-code" not in output
    with closing(sqlite3.connect(at_previous)) as c:
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]


def test_nothing_to_do_prints_nothing(tmp_path):
    path = str(tmp_path / "clean.db")
    _migrate(path, target=PREVIOUS)
    assert "[0036]" not in _migrate_capturing(path, THIS)


def test_downgrade_changes_nothing(at_previous):
    _migrate(at_previous, target=THIS)
    migrated = _rows(at_previous)
    result = subprocess.run(
        [sys.executable, "-c", _ROLLBACK, at_previous],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    assert THIS in result.stdout
    assert _rows(at_previous) == migrated


class _NoConnection:
    _mode = "execute"
    dialect = "sqlite"
    _db_conn = None

    def __init__(self):
        self.sql = []

    def execute(self, sql):
        self.sql.append(sql)


def _module():
    import importlib.util

    path = BACKEND / "migrations" / f"{THIS}.py"
    spec = importlib.util.spec_from_file_location("migration_0036", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_without_a_connection_it_backfills_in_sql_and_says_so():
    module = _module()
    ctx, lines = _NoConnection(), []
    assert module.backfill(ctx, echo=lines.append) is None
    assert ctx.sql == [module.FALLBACK_BACKFILL_SQL]
    assert len(lines) == 1 and lines[0].startswith("[0036] cannot read users")


def test_the_replay_records_nothing():
    module = _module()
    ctx = _NoConnection()
    ctx._mode = "collect"
    module.upgrade(ctx)
    assert ctx.sql == []


def test_the_fallback_statement_places_only_what_cannot_collide(at_previous):
    before = _rows(at_previous)
    with closing(sqlite3.connect(at_previous)) as c:
        c.execute(_module().FALLBACK_BACKFILL_SQL)
        c.commit()
    after = _rows(at_previous)
    changed = {k: after[k]["agent_team_id"] for k in after if after[k] != before[k]}
    # a-legacy-other has an external_ref, so the one-statement fallback
    # leaves it rather than risk the unique index.
    assert changed == {"a-legacy": "t-1"}


def test_literals_quote():
    assert _module().sql_literal("o'brien") == "'o''brien'"
    with pytest.raises(ValueError, match="NUL"):
        _module().sql_literal("a\x00b")
