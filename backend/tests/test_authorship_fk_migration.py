"""Tests for migrations/0019_authorship_fks_set_null.py (CHT-1427).

Before 0019, deleting a user -- in practice an agent -- cascade-deleted
every issue, comment, activity and document it authored. The chain test
builds a database at 0018, fills it, migrates, deletes the author with
foreign keys ON (as every production connection has them), and checks
that nothing it wrote went with it.
"""
import asyncio
import importlib.util
import sqlite3
import threading
from contextlib import closing
from pathlib import Path

import pytest

from .oxyde_files import OxydeFile, leave_wal_mode

MIGRATIONS_DIR = Path(__file__).resolve().parents[1] / "migrations"
MIGRATION = MIGRATIONS_DIR / "0019_authorship_fks_set_null.py"
NOW = "2026-10-13T00:00:00+00:00"

AUTHORED = {
    "issues": "creator_id",
    "issue_comments": "author_id",
    "issue_activities": "user_id",
    "documents": "author_id",
    "document_comments": "author_id",
    "document_activities": "user_id",
}


def _load_migration():
    spec = importlib.util.spec_from_file_location("m0019", MIGRATION)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def _migrate(path: str, target: str | None = None) -> None:
    """Apply the chain (up to `target`) to `path` on a private loop in a
    worker thread, as conftest builds the schema template."""

    async def _apply():
        from oxyde import AsyncDatabase, PoolSettings, disconnect_all
        from oxyde.migrations.executor import apply_migrations

        database = AsyncDatabase(f"sqlite:///{path}", overwrite=True, settings=PoolSettings(max_connections=1))
        await database.connect()
        import app.oxyde_models  # noqa: F401
        try:
            await apply_migrations(migrations_dir=str(MIGRATIONS_DIR), target=target)
            await leave_wal_mode()  # the tests read and write it with sqlite3 next
        finally:
            await disconnect_all()

    failure: list[BaseException] = []

    def _run():
        try:
            asyncio.run(_apply())
        except BaseException as error:  # re-raised on the calling thread
            failure.append(error)

    thread = threading.Thread(target=_run)
    thread.start()
    thread.join()
    if failure:
        raise failure[0]


def _seed(path: str) -> None:
    """A team, a project, a human, and an agent that authored one of
    everything (plus a sub-issue, a comment by the human on the agent's
    issue, and a document link, so the issue's own children are covered)."""
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
        for issue_id, number, parent in (("i1", 1, None), ("i2", 2, "i1")):
            c.execute(
                "INSERT INTO issues (id, project_id, identifier, number, title, status, created_at, updated_at, "
                "creator_id, parent_id) VALUES (?, 'p1', ?, ?, 'x', 'BACKLOG', ?, ?, 'agent', ?)",
                (issue_id, f"P-{number}", number, NOW, NOW, parent),
            )
        c.execute(
            "INSERT INTO issue_comments (id, issue_id, content, created_at, updated_at, author_id) "
            "VALUES ('c1', 'i1', 'x', ?, ?, 'agent'), ('c2', 'i1', 'y', ?, ?, 'human')",
            (NOW, NOW, NOW, NOW),
        )
        c.execute(
            "INSERT INTO issue_activities (id, activity_type, created_at, issue_id, user_id) "
            "VALUES ('a1', 'CREATED', ?, 'i1', 'agent')",
            (NOW,),
        )
        c.execute(
            "INSERT INTO documents (id, team_id, title, created_at, updated_at, author_id) "
            "VALUES ('d1', 't1', 'x', ?, ?, 'agent')",
            (NOW, NOW),
        )
        c.execute(
            "INSERT INTO document_comments (id, document_id, content, created_at, updated_at, author_id) "
            "VALUES ('dc1', 'd1', 'x', ?, ?, 'agent')",
            (NOW, NOW),
        )
        c.execute(
            "INSERT INTO document_activities (id, team_id, activity_type, created_at, document_id, user_id) "
            "VALUES ('da1', 't1', 'CREATED', ?, 'd1', 'agent')",
            (NOW,),
        )
        c.execute("INSERT INTO document_issues (document_id, issue_id, created_at) VALUES ('d1', 'i1', ?)", (NOW,))
        c.commit()


def _counts(path: str) -> dict[str, int]:
    tables = [*AUTHORED, "issue_relations", "document_issues", "users", "teams", "projects"]
    with closing(sqlite3.connect(path)) as c:
        return {table: c.execute(f'SELECT count(*) FROM "{table}"').fetchone()[0] for table in tables}


def _indexes(path: str) -> set[tuple[str, str, str]]:
    with closing(sqlite3.connect(path)) as c:
        return set(c.execute("SELECT tbl_name, name, sql FROM sqlite_master WHERE type = 'index'").fetchall())


def _on_delete(path: str) -> dict[str, str]:
    with closing(sqlite3.connect(path)) as c:
        return {
            table: next(
                fk[6] for fk in c.execute(f"PRAGMA foreign_key_list('{table}')") if fk[3] == column and fk[2] == "users"
            )
            for table, column in AUTHORED.items()
        }


@pytest.fixture
def at_0018(tmp_path):
    path = str(tmp_path / "chain.db")
    _migrate(path, target="0018_ritual_artifact")
    _seed(path)
    return path


def test_0018_cascades_which_is_the_bug(at_0018):
    """Pins the starting point, so the test below proves a change."""
    assert set(_on_delete(at_0018).values()) == {"CASCADE"}


def test_deleting_an_author_after_0019_keeps_everything_it_wrote(at_0018):
    before_counts, before_indexes = _counts(at_0018), _indexes(at_0018)

    _migrate(at_0018, target="0019_authorship_fks_set_null")

    assert set(_on_delete(at_0018).values()) == {"SET NULL"}
    assert _counts(at_0018) == before_counts, "the migration must not touch a row"
    assert _indexes(at_0018) == before_indexes, "the migration must not drop or alter an index"
    with closing(sqlite3.connect(at_0018)) as c:
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]
        assert c.execute("PRAGMA foreign_key_check").fetchall() == []
        c.execute("PRAGMA foreign_keys = ON")
        c.execute("DELETE FROM users WHERE id = 'agent'")
        c.commit()
        assert c.execute("SELECT count(*) FROM issue_comments WHERE author_id = 'human'").fetchone()[0] == 1

    after = _counts(at_0018)
    assert after == {**before_counts, "users": before_counts["users"] - 1}
    with closing(sqlite3.connect(at_0018)) as c:
        for table, column in AUTHORED.items():
            nulls = c.execute(f'SELECT count(*) FROM "{table}" WHERE "{column}" IS NULL').fetchone()[0]
            assert nulls >= 1, f"{table} lost the agent's rows instead of nulling {column}"


def test_downgrade_restores_cascade_without_touching_rows(at_0018):
    _migrate(at_0018, target="0019_authorship_fks_set_null")
    before = _counts(at_0018)

    ctx = _Ctx(at_0018)
    try:
        _load_migration().downgrade(ctx)
    finally:
        ctx.close()
    _run_in_one_transaction(at_0018, ctx.statements)
    assert set(_on_delete(at_0018).values()) == {"CASCADE"}
    assert _counts(at_0018) == before


class _Ctx:
    """A migration context that collects SQL instead of running it, over a
    real Oxyde connection to `path`: 0019 reads the CREATE text it
    rewrites through that connection, as it does under the executor."""

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


def _run_in_one_transaction(path: str, statements: list[str]) -> None:
    """What Oxyde does with collected SQL: one transaction, foreign keys ON."""
    connection = sqlite3.connect(path, isolation_level=None)
    try:
        connection.execute("PRAGMA foreign_keys = ON")
        connection.execute("BEGIN")
        try:
            for statement in statements:
                connection.execute(statement)
        except BaseException:
            connection.execute("ROLLBACK")
            raise
        connection.execute("COMMIT")
    finally:
        connection.close()


def test_a_rewrite_that_misses_fails_the_transaction_and_changes_nothing(at_0018, monkeypatch):
    """If the CREATE text is in a shape the rewrite does not recognise, the
    verification step must abort the migration, not record it as done."""
    module = _load_migration()
    monkeypatch.setattr(module, "rewrite_create_table", lambda sql, column, action: sql)

    ctx = _Ctx(at_0018)
    try:
        module.upgrade(ctx)
    finally:
        ctx.close()
    with pytest.raises(sqlite3.IntegrityError, match="CHECK"):
        _run_in_one_transaction(at_0018, ctx.statements)
    assert set(_on_delete(at_0018).values()) == {"CASCADE"}


def test_a_database_file_it_cannot_read_is_refused():
    class _Ctx:
        _mode = "execute"
        dialect = "sqlite"
        _db_conn = None

        def execute(self, sql):  # pragma: no cover - must not be reached
            raise AssertionError(sql)

    with pytest.raises(RuntimeError, match="nothing was changed"):
        _load_migration().upgrade(_Ctx())


# A pre-Oxyde (SQLAlchemy-era, CHT-1006) database does not carry 0001's
# CREATE text; production's is one of those.
SQLALCHEMY_ISSUES = (
    "CREATE TABLE issues (\n"
    "\tid VARCHAR(36) NOT NULL, \n"
    "\tcreator_id VARCHAR(36) NOT NULL, \n"
    "\tassignee_id VARCHAR(36), \n"
    "\ttitle VARCHAR(255) NOT NULL DEFAULT 'a, (b)', \n"
    "\tPRIMARY KEY (id), \n"
    "\tFOREIGN KEY(creator_id) REFERENCES users (id) ON DELETE CASCADE, \n"
    "\tFOREIGN KEY(assignee_id) REFERENCES users (id) ON DELETE CASCADE\n"
    ")"
)


@pytest.mark.parametrize(
    ("sql", "expected"),
    [
        (
            SQLALCHEMY_ISSUES,
            SQLALCHEMY_ISSUES.replace("creator_id VARCHAR(36) NOT NULL", "creator_id VARCHAR(36)").replace(
                "FOREIGN KEY(creator_id) REFERENCES users (id) ON DELETE CASCADE",
                "FOREIGN KEY(creator_id) REFERENCES users (id) ON DELETE SET NULL",
            ),
        ),
        (
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id VARCHAR(36) NOT NULL REFERENCES users(id) "
            "ON DELETE CASCADE ON UPDATE CASCADE, t TEXT)",
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id VARCHAR(36) REFERENCES users(id) "
            "ON DELETE SET NULL ON UPDATE CASCADE, t TEXT)",
        ),
        (
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id TEXT REFERENCES users(id))",
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id TEXT REFERENCES users(id) ON DELETE SET NULL)",
        ),
        (  # a reference to some other table is left alone, NOT NULL included
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id TEXT NOT NULL REFERENCES people(id) ON DELETE CASCADE)",
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id TEXT NOT NULL REFERENCES people(id) ON DELETE CASCADE)",
        ),
        (  # "NOT NULL" inside a string literal is data, not a constraint
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id TEXT NOT NULL DEFAULT 'NOT NULL' "
            "REFERENCES users(id) ON DELETE CASCADE)",
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id TEXT DEFAULT 'NOT NULL' "
            "REFERENCES users(id) ON DELETE SET NULL)",
        ),
        (  # ... and inside a CHECK expression it is part of the expression
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id TEXT NOT NULL CHECK (creator_id IS NOT NULL), "
            "FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE)",
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id TEXT CHECK (creator_id IS NOT NULL), "
            "FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE SET NULL)",
        ),
        (  # ... and inside a comment it is prose
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id TEXT /* NOT NULL */ NOT NULL "
            "REFERENCES users(id) ON DELETE CASCADE)",
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id TEXT /* NOT NULL */ "
            "REFERENCES users(id) ON DELETE SET NULL)",
        ),
        (  # no foreign key at all: nothing to set null, so NOT NULL stays
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id TEXT NOT NULL)",
            "CREATE TABLE x (id TEXT PRIMARY KEY, creator_id TEXT NOT NULL)",
        ),
    ],
)
def test_rewrite_handles_other_schema_spellings(sql, expected):
    rewritten = _load_migration().rewrite_create_table(sql, "creator_id", "SET NULL")
    assert rewritten == expected
    # And SQLite reads it as intended.
    with closing(sqlite3.connect(":memory:")) as c:
        c.execute("CREATE TABLE users (id TEXT PRIMARY KEY)")
        c.execute("CREATE TABLE people (id TEXT PRIMARY KEY)")
        c.execute(rewritten)
        table = "issues" if rewritten.startswith("CREATE TABLE issues") else "x"
        creator = [fk for fk in c.execute(f"PRAGMA foreign_key_list('{table}')") if fk[3] == "creator_id"]
        notnull = {row[1]: row[3] for row in c.execute(f"PRAGMA table_info('{table}')")}
        if creator and creator[0][2] == "users":
            assert creator[0][6] == "SET NULL"
            assert notnull["creator_id"] == 0


def test_the_replay_records_set_null():
    from oxyde.migrations.context import MigrationContext

    ctx = MigrationContext(mode="collect")
    _load_migration().upgrade(ctx)
    added = [op for op in ctx.get_collected_operations() if op["type"] == "add_foreign_key"]
    assert {(op["table"], op["fk"]["columns"][0], op["fk"]["on_delete"]) for op in added} == {
        (table, column, "SET NULL") for table, column in AUTHORED.items()
    }


def test_the_template_schema_is_migrated(schema_template):
    assert set(_on_delete(schema_template).values()) == {"SET NULL"}
