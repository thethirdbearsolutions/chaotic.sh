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

from tests.test_authorship_fk_migration import _migrate, _run_in_one_transaction

MIGRATION = Path(__file__).resolve().parents[1] / "migrations" / "0020_parent_user_restrict.py"
NOW = "2026-10-13T00:00:00+00:00"


def _load_migration():
    spec = importlib.util.spec_from_file_location("m0020", MIGRATION)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class _Ctx:
    """An execute-mode context that collects SQL, as Oxyde does, for a
    test to run in one transaction."""

    _mode = "execute"
    dialect = "sqlite"

    def __init__(self, path):
        self._db_conn = type("Conn", (), {"url": f"sqlite:///{path}"})()
        self.statements: list[str] = []

    def execute(self, sql):
        self.statements.append(sql)


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

    _migrate(path)

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
    _migrate(prod_shaped)
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

    ctx = _Ctx(prod_shaped)
    with pytest.raises(RuntimeError, match=r"orphan -> gone.*nothing was changed"):
        _load_migration().upgrade(ctx)
    assert ctx.statements == []
    assert _users_sql(prod_shaped) == sql


def test_a_rewrite_that_misses_fails_the_transaction_and_changes_nothing(prod_shaped, monkeypatch):
    """With no foreign key to rewrite, a no-op rewrite must still fail the
    verification: zero matching foreign keys is not "all of them RESTRICT"."""
    module = _load_migration()
    monkeypatch.setattr(module, "rewrite_users_table", lambda sql, action: sql)
    ctx = _Ctx(prod_shaped)
    module.upgrade(ctx)
    with pytest.raises(sqlite3.IntegrityError, match="CHECK"):
        _run_in_one_transaction(prod_shaped, ctx.statements)
    assert _parent_fks(prod_shaped) == []


def test_downgrade_restores_cascade_without_touching_rows(at_0019):
    _migrate(at_0019)
    before = _snapshot(at_0019)
    ctx = _Ctx(at_0019)
    _load_migration().downgrade(ctx)
    _run_in_one_transaction(at_0019, ctx.statements)
    assert _parent_fks(at_0019) == ["CASCADE"]
    assert _snapshot(at_0019) == before


def test_a_database_file_it_cannot_read_is_refused():
    class _NoFile(_Ctx):
        def __init__(self):
            self._db_conn = None
            self.statements = []

    with pytest.raises(RuntimeError, match="nothing was changed"):
        _load_migration().upgrade(_NoFile())


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
