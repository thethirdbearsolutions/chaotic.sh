"""Tests for migrations/0020_parent_user_restrict.py (CHT-1467).

Two starting shapes: a database built from the chain, whose
`users.parent_user_id` is ON DELETE CASCADE (0001), and a
production-shaped one (SQLAlchemy-era origin) with no foreign key on the
column at all. Both must end as ON DELETE RESTRICT without a row or an
index changing.
"""
import importlib.util
import sqlite3
from contextlib import closing
from pathlib import Path

import pytest

from .test_authorship_fk_migration import _run_in_one_transaction

from .oxyde_files import OxydeFile

BACKEND = Path(__file__).resolve().parents[1]
MIGRATION = BACKEND / "migrations" / "0020_parent_user_restrict.py"
NOW = "2026-10-13T00:00:00+00:00"

# The end of every child script below. Oxyde's close of its last
# connection can still be running when disconnect_all() returns
# (tests/oxyde_files.py). SQLite's WAL close unlinks the -shm first and
# the -wal last, so a process that dies in between leaves an empty -wal
# behind (CHT-1583). Wait until SQLite has removed both sidecars, which
# it does when the last connection is closed (bounded: if something else
# still has the file open they stay, and the test sees that). Then exit
# with os._exit, on failure as well as success: under pytest-xdist,
# Oxyde's native runtime aborts the process (rc -6) while being torn down
# by interpreter finalization, after the work is done, and a failed
# migration used to take that path. A script defines `run()` and ends
# with this. An error is printed and exits 1; SystemExit keeps its code
# and KeyboardInterrupt exits 130, as the interpreter would.
_SETTLE_AND_EXIT = """
try:
    run()
    code = 0
except SystemExit as exit_:
    code = exit_.code if isinstance(exit_.code, int) else (0 if exit_.code is None else 1)
except KeyboardInterrupt:
    code = 130
except Exception:
    traceback.print_exc()
    code = 1

deadline = time.monotonic() + 5
while time.monotonic() < deadline and any(os.path.exists(sys.argv[1] + s) for s in ("-wal", "-shm")):
    time.sleep(0.01)
sys.stdout.flush()
sys.stderr.flush()
os._exit(code)
"""

_MIGRATE = """
import asyncio, os, sys, time, traceback
from oxyde import AsyncDatabase, PoolSettings, disconnect_all
from oxyde.migrations.executor import apply_migrations

async def main(path, target):
    database = AsyncDatabase(f"sqlite:///{path}", overwrite=True, settings=PoolSettings(max_connections=1))
    await database.connect()
    import app.oxyde_models  # noqa: F401
    try:
        await apply_migrations(migrations_dir="migrations", target=target or None)
    finally:
        await disconnect_all()

def run():
    asyncio.run(main(sys.argv[1], sys.argv[2]))
""" + _SETTLE_AND_EXIT


def _migrate(path: str, target: str | None = None) -> None:
    """Apply the chain (up to `target`) to `path` in a child process.

    Not in this process, as test_authorship_fk_migration does: Oxyde
    links its own copy of SQLite, and these tests also open the file with
    Python's sqlite3. Two copies of SQLite in one process do not see each
    other's POSIX locks, so an Oxyde connection still closing in the
    background could checkpoint the WAL under a Python connection here
    (the same hazard 0020 avoids for its own schema read)."""
    import subprocess
    import sys

    result = subprocess.run(
        [sys.executable, "-c", _MIGRATE, path, target or ""],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    if result.returncode != 0:
        raise RuntimeError(f"migrate failed ({result.returncode}): {result.stderr.strip()[-2000:]}")


def _load_migration():
    spec = importlib.util.spec_from_file_location("m0020", MIGRATION)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class _Ctx:
    """A migration context that collects SQL instead of running it, over a
    real Oxyde connection to `path` (0020 reads the schema through it, as
    under the executor). Close it before Python's sqlite3 touches the file
    (tests/oxyde_files.py, CHT-1491)."""

    _mode = "execute"
    dialect = "sqlite"

    def __init__(self, path):
        self._file = OxydeFile(path)
        self._db_conn = self._file.database
        self.statements: list[str] = []

    def execute(self, sql):
        self.statements.append(sql)

    def close(self):
        self._file.close()


def _collect(path: str, module=None, step: str = "upgrade") -> list[str]:
    """The SQL `step` collects against `path`, or what it raises."""
    ctx = _Ctx(path)
    try:
        getattr(module or _load_migration(), step)(ctx)
    finally:
        ctx.close()
    return ctx.statements


def _refused(path: str, match: str, module=None) -> None:
    """Upgrading `path` raises `match` before collecting any SQL."""
    ctx = _Ctx(path)
    try:
        with pytest.raises(RuntimeError, match=match):
            (module or _load_migration()).upgrade(ctx)
    finally:
        ctx.close()
    assert ctx.statements == []


def _seed(path: str) -> None:
    """A team, a human, an agent of theirs, and a ritual-gate request the
    agent made (the row that CASCADE took with it)."""
    with closing(sqlite3.connect(path)) as c:
        c.execute("PRAGMA foreign_keys = ON")
        c.execute("INSERT INTO teams (id, name, key, created_at, updated_at) VALUES ('t1', 'T', 'T', ?, ?)", (NOW, NOW))
        c.execute(
            "INSERT INTO projects (id, team_id, name, key, created_at, updated_at) VALUES ('p1', 't1', 'P', 'P', ?, ?)",
            (NOW, NOW),
        )
        for user_id, is_agent, parent in (("human", 0, None), ("agent", 1, "human")):
            c.execute(
                "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, "
                "agent_team_id, parent_user_id) VALUES (?, ?, 'x', ?, ?, ?, ?, 't1', ?)",
                (user_id, f"{user_id}@example.com", user_id, NOW, NOW, is_agent, parent),
            )
        c.execute(
            "INSERT INTO issues (id, project_id, identifier, number, title, status, created_at, updated_at, "
            "creator_id) VALUES ('i1', 'p1', 'P-1', 1, 'x', 'BACKLOG', ?, ?, 'human')",
            (NOW, NOW),
        )
        c.execute(
            "INSERT INTO ticket_limbo (id, issue_id, limbo_type, requested_by_id, requested_at) "
            "VALUES ('l1', 'i1', 'CLOSE', 'agent', ?)",
            (NOW,),
        )
        c.commit()


def _parent_fks(path: str) -> list[str]:
    with closing(sqlite3.connect(path)) as c:
        return [
            fk[6] for fk in c.execute("PRAGMA foreign_key_list('users')") if fk[3] == "parent_user_id"
        ]


def _users_sql(path: str) -> str:
    with closing(sqlite3.connect(path)) as c:
        return c.execute("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'users'").fetchone()[0]


def _snapshot(path: str):
    with closing(sqlite3.connect(path)) as c:
        tables = [
            row[0]
            for row in c.execute("SELECT name FROM sqlite_master WHERE type = 'table'")
            if row[0] != "oxyde_migrations"  # gains 0020's own row
        ]
        rows = {t: sorted(map(repr, c.execute(f'SELECT * FROM "{t}"').fetchall())) for t in tables}
        indexes = set(c.execute("SELECT tbl_name, name, sql FROM sqlite_master WHERE type = 'index'").fetchall())
    return rows, indexes


def _set_users_sql(path: str, sql: str) -> None:
    """Rewrite the stored users CREATE text (what a pre-Oxyde database
    carries), the way 0019/0020 themselves do."""
    connection = sqlite3.connect(path, isolation_level=None)
    try:
        connection.execute("PRAGMA writable_schema = ON")
        connection.execute("UPDATE sqlite_master SET sql = ? WHERE type = 'table' AND name = 'users'", (sql,))
        connection.execute("PRAGMA writable_schema = RESET")
    finally:
        connection.close()
    with closing(sqlite3.connect(path)) as c:
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]


def _delete_human_refused(path: str) -> None:
    with closing(sqlite3.connect(path)) as c:
        c.execute("PRAGMA foreign_keys = ON")
        with pytest.raises(sqlite3.IntegrityError, match="FOREIGN KEY"):
            c.execute("DELETE FROM users WHERE id = 'human'")
        assert c.execute("SELECT count(*) FROM users").fetchone()[0] == 2
        assert c.execute("SELECT count(*) FROM ticket_limbo").fetchone()[0] == 1


@pytest.fixture
def at_0019(tmp_path):
    path = str(tmp_path / "chain.db")
    _migrate(path, target="0019_authorship_fks_set_null")
    _seed(path)
    return path


@pytest.fixture
def prod_shaped(at_0019):
    """`users` with no foreign key on parent_user_id, like production."""
    sql = _users_sql(at_0019)
    clause = ', FOREIGN KEY ("parent_user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE'
    assert clause in sql
    _set_users_sql(at_0019, sql.replace(clause, ""))
    assert _parent_fks(at_0019) == []
    return at_0019


def test_0019_cascades_which_is_the_bug(at_0019):
    assert _parent_fks(at_0019) == ["CASCADE"]
    with closing(sqlite3.connect(at_0019)) as c:
        c.execute("PRAGMA foreign_keys = ON")
        c.execute("DELETE FROM users WHERE id = 'human'")
        assert c.execute("SELECT count(*) FROM users").fetchone()[0] == 0, "the agent went with its owner"
        assert c.execute("SELECT count(*) FROM ticket_limbo").fetchone()[0] == 0, "and so did its gate request"


@pytest.mark.parametrize("shape", ["chain", "production"])
def test_0020_makes_the_parent_restrict_without_touching_a_row(request, shape):
    path = request.getfixturevalue("at_0019" if shape == "chain" else "prod_shaped")
    before = _snapshot(path)

    _migrate(path, target="0020_parent_user_restrict")

    assert _parent_fks(path) == ["RESTRICT"]
    assert _snapshot(path) == before, "the migration must not touch a row or an index"
    with closing(sqlite3.connect(path)) as c:
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]
        assert c.execute("PRAGMA foreign_key_check").fetchall() == []
    _delete_human_refused(path)
    with closing(sqlite3.connect(path)) as c:
        # Agents first, as UserService.delete does, and then the owner goes.
        c.execute("PRAGMA foreign_keys = ON")
        c.execute("DELETE FROM ticket_limbo")
        c.execute("DELETE FROM users WHERE id = 'agent'")
        c.execute("DELETE FROM users WHERE id = 'human'")
        c.commit()
        assert c.execute("SELECT count(*) FROM users").fetchone()[0] == 0


def test_the_production_shape_gains_the_reference_on_the_column(prod_shaped):
    _migrate(prod_shaped, target="0020_parent_user_restrict")
    assert '"parent_user_id" VARCHAR(255) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE CASCADE' in _users_sql(
        prod_shaped
    )


def test_a_dangling_parent_stops_the_migration_before_anything_is_written(prod_shaped):
    with closing(sqlite3.connect(prod_shaped)) as c:
        c.execute(
            "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, parent_user_id) "
            "VALUES ('orphan', 'o@example.com', 'x', 'o', ?, ?, 1, 'gone')",
            (NOW, NOW),
        )
        c.commit()
    sql = _users_sql(prod_shaped)

    _refused(prod_shaped, r"orphan -> gone.*nothing was changed")
    assert _users_sql(prod_shaped) == sql


def test_a_dangling_parent_on_a_non_agent_row_is_reported_too(at_0019):
    with closing(sqlite3.connect(at_0019)) as c:
        c.execute(
            "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, parent_user_id) "
            "VALUES ('legacy', 'l@example.com', 'x', 'l', ?, ?, 0, 'gone')",
            (NOW, NOW),
        )
        c.commit()

    _refused(at_0019, r"legacy -> gone.*= NULL.*nothing was changed")


def _break_agent_project(path: str) -> None:
    """A project deleted while foreign keys were off (before CHT-1341):
    the agent keeps an agent_project_id that names nothing."""
    with closing(sqlite3.connect(path)) as c:
        c.execute("PRAGMA foreign_keys = OFF")
        c.execute("UPDATE users SET agent_project_id = 'deleted-project' WHERE id = 'agent'")
        c.commit()
        assert c.execute("PRAGMA foreign_key_check('users')").fetchall()


@pytest.mark.parametrize("shape", ["chain", "production"])
def test_violations_of_other_users_foreign_keys_do_not_stop_it(request, shape):
    """Only the parent foreign key is 0020's to verify; an unrelated stale
    reference must neither fail the migration opaquely nor be touched."""
    path = request.getfixturevalue("at_0019" if shape == "chain" else "prod_shaped")
    _break_agent_project(path)
    before = _snapshot(path)

    _migrate(path, target="0020_parent_user_restrict")

    assert _parent_fks(path) == ["RESTRICT"]
    assert _snapshot(path) == before


def test_a_parent_violation_that_appears_after_the_precheck_fails_the_transaction(prod_shaped, monkeypatch):
    """The read-only precheck runs before the transaction; the in-transaction
    check on the parent foreign key is what holds if a row changes between."""
    with closing(sqlite3.connect(prod_shaped)) as c:
        c.execute("UPDATE users SET parent_user_id = 'gone' WHERE id = 'agent'")
        c.commit()
    module = _load_migration()
    real_read = module._read
    monkeypatch.setattr(module, "_read", lambda ctx: (real_read(ctx)[0], []))
    statements = _collect(prod_shaped, module)
    with pytest.raises(sqlite3.IntegrityError, match="CHECK constraint failed: 0020 no row violates"):
        _run_in_one_transaction(prod_shaped, statements)
    assert _parent_fks(prod_shaped) == []


def test_0020_does_not_load_0019():
    """0020 carries copies of the parsing helpers, so editing 0019 cannot
    change it."""
    source = MIGRATION.read_text()
    assert "0019_authorship_fks_set_null.py" not in source
    assert "spec_from_file_location" not in source


def test_a_rewrite_that_misses_fails_the_transaction(prod_shaped, monkeypatch):
    """With no foreign key to rewrite, a no-op rewrite must fail the
    verification: zero matching foreign keys is not "all of them RESTRICT"."""
    module = _load_migration()
    monkeypatch.setattr(module, "rewrite_users_table", lambda sql, action: sql)
    statements = _collect(prod_shaped, module)
    with pytest.raises(sqlite3.IntegrityError, match="CHECK constraint failed: 0020 users.parent_user_id"):
        _run_in_one_transaction(prod_shaped, statements)
    assert _parent_fks(prod_shaped) == []


@pytest.mark.parametrize(
    ("change", "failed"),
    [
        # A dropped NOT NULL: rows would no longer be held to it.
        (('"name" VARCHAR(255) NOT NULL', '"name" VARCHAR(255)'), "the users columns are unchanged"),
        # Another foreign key's action changed along the way.
        (
            ('REFERENCES "teams" ("id") ON DELETE SET NULL', 'REFERENCES "teams" ("id") ON DELETE CASCADE'),
            "the other users foreign keys are unchanged",
        ),
    ],
)
def test_a_rewrite_that_changes_anything_else_fails_the_transaction(at_0019, monkeypatch, change, failed):
    """The point of comparing the table before and after: a stored-text
    edit that changed how rows decode, or another constraint, must roll back."""
    module = _load_migration()
    real = module.rewrite_users_table
    assert change[0] in _users_sql(at_0019)
    monkeypatch.setattr(module, "rewrite_users_table", lambda sql, action: real(sql, action).replace(*change))
    statements = _collect(at_0019, module)
    with pytest.raises(sqlite3.IntegrityError, match=f"CHECK constraint failed: 0020 {failed}"):
        _run_in_one_transaction(at_0019, statements)
    assert _parent_fks(at_0019) == ["CASCADE"]


def test_downgrade_restores_cascade_without_touching_rows(at_0019):
    _migrate(at_0019, target="0020_parent_user_restrict")
    before = _snapshot(at_0019)
    _run_in_one_transaction(at_0019, _collect(at_0019, step="downgrade"))
    assert _parent_fks(at_0019) == ["CASCADE"]
    assert _snapshot(at_0019) == before


def test_no_connection_to_read_through_is_refused():
    class _NoConnection:
        _mode = "execute"
        dialect = "sqlite"
        _db_conn = None

        def execute(self, sql):  # pragma: no cover - must not be reached
            raise AssertionError(sql)

    with pytest.raises(RuntimeError, match="no connection.*nothing was changed"):
        _load_migration().upgrade(_NoConnection())


SQLALCHEMY_USERS = (
    "CREATE TABLE users (\n"
    "\tid VARCHAR(36) NOT NULL, \n"
    "\temail VARCHAR(255) NOT NULL, \n"
    "\tparent_user_id VARCHAR(36), \n"
    "\tname VARCHAR(255) NOT NULL DEFAULT 'parent_user_id, (x)', \n"
    "\tPRIMARY KEY (id)\n"
    ")"
)


@pytest.mark.parametrize(
    ("sql", "expected"),
    [
        (  # no reference: appended to the column's own definition
            SQLALCHEMY_USERS,
            SQLALCHEMY_USERS.replace(
                "parent_user_id VARCHAR(36), ",
                "parent_user_id VARCHAR(36) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE CASCADE, ",
            ),
        ),
        (  # a reference with no action gains one
            "CREATE TABLE users (id TEXT PRIMARY KEY, parent_user_id TEXT REFERENCES users(id))",
            "CREATE TABLE users (id TEXT PRIMARY KEY, parent_user_id TEXT REFERENCES users(id) ON DELETE RESTRICT)",
        ),
        (  # as the last definition, before the closing parenthesis
            "CREATE TABLE users (id TEXT PRIMARY KEY, parent_user_id TEXT\n)",
            "CREATE TABLE users (id TEXT PRIMARY KEY, parent_user_id TEXT REFERENCES users (id) "
            "ON DELETE RESTRICT ON UPDATE CASCADE\n)",
        ),
    ],
)
def test_rewrite_handles_other_schema_spellings(sql, expected):
    rewritten = _load_migration().rewrite_users_table(sql, "RESTRICT")
    assert rewritten == expected
    with closing(sqlite3.connect(":memory:")) as c:
        c.execute(rewritten)
        assert [fk[6] for fk in c.execute("PRAGMA foreign_key_list('users')") if fk[3] == "parent_user_id"] == [
            "RESTRICT"
        ]


def test_a_commented_column_definition_is_refused():
    sql = "CREATE TABLE users (id TEXT PRIMARY KEY, parent_user_id TEXT -- owner\n)"
    with pytest.raises(RuntimeError, match="comment"):
        _load_migration().rewrite_users_table(sql, "RESTRICT")


def test_the_replay_records_restrict():
    from oxyde.migrations.context import MigrationContext

    ctx = MigrationContext(mode="collect")
    _load_migration().upgrade(ctx)
    added = [op for op in ctx.get_collected_operations() if op["type"] == "add_foreign_key"]
    assert [(op["table"], op["fk"]["columns"], op["fk"]["on_delete"]) for op in added] == [
        ("users", ["parent_user_id"], "RESTRICT")
    ]


def test_the_template_schema_is_migrated(schema_template):
    assert _parent_fks(schema_template) == ["RESTRICT"]
