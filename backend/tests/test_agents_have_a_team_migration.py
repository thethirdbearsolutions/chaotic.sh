"""Tests for migrations/0036_agents_have_a_team.py (CHT-1837).

A database at 0034, built from the chain or with production's
SQLAlchemy-made users table swapped in, is seeded with agents that have
no team:

- placed: its project and that project's team exist;
- left, and said why: its project is gone; its project exists but the
  project's team is gone (writing that team id would break
  agent_team_id's foreign key and fail the upgrade); no project at all;
  an external_ref already held in the team; the second of two twins
  sharing an external_ref in one project.

The placed agents' active API keys are revoked (fail closed: they have
not signed in since their agent lost its team); no other key changes.
Agents that already have a team, and humans, are not touched. Every
line names rows by id only, and is printed only for a write that
committed.
"""
import sqlite3
import subprocess
import sys
from contextlib import closing

import pytest

from .test_agent_identity_migration import _to_production_users
from .test_api_key_hash_migration import _ROLLBACK
from .test_parent_user_fk_migration import BACKEND, _migrate
from .test_users_email_folded_migration import _migrate_capturing

PREVIOUS = "0034_users_email_folded"
THIS = "0036_agents_have_a_team"
NOW = "2026-10-15T00:00:00+00:00"

# id -> (is_agent, agent_team_id, agent_project_id, external_ref), oldest first.
USERS = {
    "u-human": (0, None, None, None),
    "a-teamed": (1, "t-1", None, None),
    "a-teamed-scoped": (1, "t-1", "p-1", None),
    "a-legacy": (1, None, "p-1", None),
    "a-legacy-other": (1, None, "p-2", "claude-code:session:x"),
    "a-orphan": (1, None, "p-gone", None),
    "a-ghostteam": (1, None, "p-dead", None),
    "a-nothing": (1, None, None, None),
    "a-holder": (1, "t-2", None, "claude-code:session:dup"),
    "a-clash": (1, None, "p-2", "claude-code:session:dup"),
    "a-twin-1": (1, None, "p-1", "claude-code:session:twin"),
    "a-twin-2": (1, None, "p-1", "claude-code:session:twin"),
}
PLACED = {"a-legacy": ("t-1", "p-1"), "a-legacy-other": ("t-2", "p-2"), "a-twin-1": ("t-1", "p-1")}
LEFT = {"a-orphan", "a-ghostteam", "a-nothing", "a-clash", "a-twin-2"}

# key id -> (agent, is_active)
KEYS = {
    "k-legacy-1": ("a-legacy", 1),
    "k-legacy-2": ("a-legacy", 1),
    "k-legacy-old": ("a-legacy", 0),
    "k-twin": ("a-twin-1", 1),
    "k-teamed": ("a-teamed", 1),
    "k-orphan": ("a-orphan", 1),
    "k-ghost": ("a-ghostteam", 1),
    "k-clash": ("a-clash", 1),
}
REVOKED = ["k-legacy-1", "k-legacy-2", "k-twin"]


def _seed(path: str) -> None:
    with closing(sqlite3.connect(path)) as c:
        # Python's sqlite3 leaves foreign keys off, as the SQLAlchemy era
        # did: p-gone and t-dead were deleted that way, leaving a-orphan
        # naming a missing project and p-dead naming a missing team.
        for team_id, key in (("t-1", "ONE"), ("t-2", "TWO")):
            c.execute(
                "INSERT INTO teams (id, name, key, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
                (team_id, key, key, NOW, NOW),
            )
        for project_id, team_id, key in (("p-1", "t-1", "PA"), ("p-2", "t-2", "PB"), ("p-dead", "t-dead", "PD")):
            c.execute(
                "INSERT INTO projects (id, team_id, name, key, color, issue_count, created_at, updated_at) "
                "VALUES (?, ?, ?, ?, '#000000', 0, ?, ?)",
                (project_id, team_id, key, key, NOW, NOW),
            )
        for n, (user_id, (is_agent, team_id, project_id, ref)) in enumerate(USERS.items()):
            c.execute(
                "INSERT INTO users (id, email, email_folded, hashed_password, name, created_at, updated_at, "
                "is_agent, is_active, is_superuser, can_register, parent_user_id, agent_team_id, "
                "agent_project_id, external_ref) VALUES (?, ?, ?, 'x', ?, ?, ?, ?, 1, 0, 0, ?, ?, ?, ?)",
                (
                    user_id, f"{user_id}@example.com", f"{user_id}@example.com", user_id,
                    f"2026-01-01T00:00:{n:02d}+00:00", NOW, is_agent,
                    "u-human" if is_agent else None, team_id, project_id, ref,
                ),
            )
        for n, (key_id, (agent_id, active)) in enumerate(KEYS.items()):
            c.execute(
                "INSERT INTO api_keys (id, principal_user_id, holder_user_id, name, key_prefix, key_hash, "
                "created_at, is_active) VALUES (?, ?, 'u-human', 'n', 'ck_0000', ?, ?, ?)",
                (key_id, agent_id, f"sha256${key_id}", f"2026-02-01T00:00:{n:02d}+00:00", active),
            )
        c.commit()


def _table(path: str, table: str) -> dict[str, dict]:
    with closing(sqlite3.connect(path)) as c:
        c.row_factory = sqlite3.Row
        return {row["id"]: dict(row) for row in c.execute(f"SELECT * FROM {table}")}


@pytest.fixture(params=["chain", "production"])
def at_previous(request, tmp_path):
    path = str(tmp_path / f"{request.param}.db")
    if request.param == "production":
        _migrate(path, target="0022_api_key_hash_unique")
        _to_production_users(path)
    _migrate(path, target=PREVIOUS)
    _seed(path)
    return path


def test_legacy_agents_get_their_projects_team_their_keys_are_revoked_and_the_rest_are_reported(at_previous):
    users, keys = _table(at_previous, "users"), _table(at_previous, "api_keys")

    output = _migrate_capturing(at_previous, THIS)

    after = _table(at_previous, "users")
    for user_id, row in users.items():
        expected = dict(row)
        if user_id in PLACED:
            expected["agent_team_id"] = PLACED[user_id][0]
        assert after[user_id] == expected, user_id
    keys_after = _table(at_previous, "api_keys")
    for key_id, row in keys.items():
        expected = dict(row)
        if key_id in REVOKED:
            expected["is_active"] = 0
        assert keys_after[key_id] == expected, key_id

    for user_id, (team_id, project_id) in PLACED.items():
        assert (
            f"[0036] agent {user_id}: agent_team_id set to {team_id}, the team of its project {project_id}\n"
            in output
        )
    assert f"[0036] revoked 3 API key(s) of the agents given a team, " in output
    assert "the agent's owner must mint a new key (`chaotic agent keys create`)" in output
    assert ": " + ", ".join(REVOKED) + "\n" in output
    assert "[0036] agent a-orphan: its project p-gone no longer exists; agent_team_id left NULL." in output
    assert "[0036] agent a-ghostteam: its project p-dead's team t-dead no longer exists; agent_team_id left NULL." in output
    assert "[0036] agent a-nothing has neither a team nor a project; agent_team_id left NULL." in output
    assert "[0036] agent a-clash: team t-2 already has an identity with its external_ref;" in output
    assert "[0036] agent a-twin-2: team t-1 already has an identity with its external_ref;" in output
    # Each left agent's line carries the steps to retire it.
    for user_id in LEFT:
        assert f"UPDATE users SET is_active = 0 WHERE id = '{user_id}';" in output
        assert f"UPDATE api_keys SET is_active = 0 WHERE principal_user_id = '{user_id}';" in output
    assert "chaotic system backup" in output
    assert "[0036] 3 agent(s) given their project's team, 5 left without one" in output
    # One line per agent, one for the keys, the total; nothing queued-only.
    assert output.count("[0036]") == len(PLACED) + len(LEFT) + 2
    assert "(queued)" not in output
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
    migrated = _table(at_previous, "users"), _table(at_previous, "api_keys")
    result = subprocess.run(
        [sys.executable, "-c", _ROLLBACK, at_previous],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    assert THIS in result.stdout
    assert (_table(at_previous, "users"), _table(at_previous, "api_keys")) == migrated


class _Ctx:
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
    ctx, lines = _Ctx(), []
    assert module.backfill(ctx, echo=lines.append) is None
    assert ctx.sql == [module.FALLBACK_REVOKE_SQL, module.FALLBACK_BACKFILL_SQL]
    assert len(lines) == 1 and lines[0].startswith("[0036] cannot read users")


def test_the_replay_records_nothing():
    module = _module()
    ctx = _Ctx()
    ctx._mode = "collect"
    module.upgrade(ctx)
    assert ctx.sql == []


def test_the_fallback_statements_place_only_what_cannot_fail(at_previous):
    module = _module()
    users, keys = _table(at_previous, "users"), _table(at_previous, "api_keys")
    with closing(sqlite3.connect(at_previous)) as c:
        c.execute("PRAGMA foreign_keys = ON")
        c.execute(module.FALLBACK_REVOKE_SQL)
        c.execute(module.FALLBACK_BACKFILL_SQL)
        c.commit()
    after, keys_after = _table(at_previous, "users"), _table(at_previous, "api_keys")
    changed = {k: after[k]["agent_team_id"] for k in after if after[k] != users[k]}
    # Agents with an external_ref are left rather than risk the unique
    # index; a-ghostteam's dead team is never written.
    assert changed == {"a-legacy": "t-1"}
    assert {k for k in keys if keys_after[k] != keys[k]} == {"k-legacy-1", "k-legacy-2"}


def test_report_lines_without_a_commit_hook_say_queued():
    module = _module()
    lines = module.report_lines({"a": ("t", "p")}, {"a": ["k"]}, {}, done=False)
    assert lines[0].endswith("(queued)") and "(queued)" in lines[1]


def test_literals_quote():
    assert _module().sql_literal("o'brien") == "'o''brien'"
    with pytest.raises(ValueError, match="NUL"):
        _module().sql_literal("a\x00b")
