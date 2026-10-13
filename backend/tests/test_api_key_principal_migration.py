"""Tests for migrations/0021_api_key_principal_and_holder.py (CHT-1537).

A database at 0020 is seeded with every shape of key the old
`user_id`/`agent_user_id` pair could describe. After 0021 each row must
name, explicitly, the user it signs in as and the human who answers for
it, exactly as sign-in derived them before (deps.py at 0020):

    principal = agent_user_id or user_id
    holder    = user_id if user_id != principal
                else principal's parent_user_id if principal is an agent
                else principal

Two starting shapes, as for 0020: a database built from the chain, and a
production-shaped one whose api_keys was created by SQLAlchemy (indexes
on user_id and key_prefix, no foreign key on agent_user_id).
"""
import importlib.util
import sqlite3
from contextlib import closing
from pathlib import Path

import pytest

from .test_authorship_fk_migration import _run_in_one_transaction
from .test_parent_user_fk_migration import _Ctx, _migrate

BACKEND = Path(__file__).resolve().parents[1]
MIGRATION = BACKEND / "migrations" / "0021_api_key_principal_and_holder.py"
NOW = "2026-10-13T00:00:00+00:00"

# (key id, user_id, agent_user_id) -> expected (principal, holder)
KEYS = {
    # A human's own key.
    "human-own": (("creator", None), ("creator", "creator")),
    # The key `agent create` minted: held by the creator, signs in as the agent.
    "agent-default": (("creator", "agent"), ("agent", "creator")),
    # A key a team admin minted for someone else's agent (after #326).
    "admin-minted": (("admin", "agent"), ("agent", "admin")),
    # A key the agent minted for itself before holders were recorded.
    "legacy-self": (("agent", None), ("agent", "creator")),
    # A key the agent minted with a legacy key after #326: user_id is the agent.
    "legacy-chain": (("agent", "agent"), ("agent", "creator")),
    # A key the agent minted with the admin's key after #326.
    "self-from-admin": (("admin", "agent"), ("agent", "admin")),
    # A legacy self-minted key of an agent with no creator on record:
    # nobody answers for it, and it never signed in.
    "orphan-self": (("orphan", None), ("orphan", None)),
    # An empty agent_user_id, which sign-in read as "none".
    "human-empty-agent": (("admin", ""), ("admin", "admin")),
    # An agent_user_id naming a human (no code path writes this): it signed
    # in as that human, with user_id as holder. The downgrade must keep it.
    "agent-names-human": (("creator", "admin"), ("admin", "creator")),
}


def _load_migration():
    spec = importlib.util.spec_from_file_location("m0021", MIGRATION)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def _seed(path: str) -> None:
    with closing(sqlite3.connect(path)) as c:
        # OFF only for "human-empty-agent": an empty agent_user_id names no
        # user, which a database with no foreign key on it (production's)
        # can hold. Every other row is valid either way.
        c.execute("PRAGMA foreign_keys = OFF")
        c.execute("INSERT INTO teams (id, name, key, created_at, updated_at) VALUES ('t1', 'T', 'T', ?, ?)", (NOW, NOW))
        for user_id, is_agent, parent in (
            ("creator", 0, None), ("admin", 0, None), ("agent", 1, "creator"), ("orphan", 1, None),
        ):
            c.execute(
                "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, "
                "agent_team_id, parent_user_id) VALUES (?, ?, 'x', ?, ?, ?, ?, 't1', ?)",
                (user_id, f"{user_id}@example.com", user_id, NOW, NOW, is_agent, parent),
            )
        for i, (key_id, ((user_id, agent_user_id), _)) in enumerate(KEYS.items()):
            c.execute(
                "INSERT INTO api_keys (id, user_id, name, key_prefix, key_hash, created_at, last_used_at, "
                "expires_at, is_active, agent_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    key_id, user_id, f"name {key_id}", f"ck_{i:08x}", f"sha256${key_id}", NOW,
                    NOW if i % 2 else None, "2027-01-01T00:00:00+00:00" if i % 3 == 0 else None,
                    0 if key_id == "legacy-chain" else 1, agent_user_id,
                ),
            )
        c.commit()


# What SQLAlchemy's create_all made of the pre-Oxyde APIKey model, plus
# agent_user_id as its Alembic migration added it (no foreign key).
SQLALCHEMY_API_KEYS = [
    "CREATE TABLE api_keys (\n"
    "\tid VARCHAR(36) NOT NULL, \n"
    "\tuser_id VARCHAR(36) NOT NULL, \n"
    "\tname VARCHAR(255) NOT NULL, \n"
    "\tkey_prefix VARCHAR(12) NOT NULL, \n"
    "\tkey_hash VARCHAR(255) NOT NULL, \n"
    "\tcreated_at DATETIME NOT NULL, \n"
    "\tlast_used_at DATETIME, \n"
    "\texpires_at DATETIME, \n"
    "\tis_active BOOLEAN NOT NULL, agent_user_id VARCHAR(36), \n"
    "\tPRIMARY KEY (id), \n"
    "\tFOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE\n"
    ")",
    "CREATE INDEX ix_api_keys_user_id ON api_keys (user_id)",
    "CREATE INDEX ix_api_keys_key_prefix ON api_keys (key_prefix)",
]


@pytest.fixture
def at_0020(tmp_path):
    path = str(tmp_path / "chain.db")
    _migrate(path, target="0020_parent_user_restrict")
    _seed(path)
    return path


@pytest.fixture
def prod_shaped(tmp_path):
    path = str(tmp_path / "prod.db")
    _migrate(path, target="0020_parent_user_restrict")
    with closing(sqlite3.connect(path)) as c:
        c.execute("DROP TABLE api_keys")
        for statement in SQLALCHEMY_API_KEYS:
            c.execute(statement)
        c.commit()
    _seed(path)
    return path


def _rows(path: str) -> dict[str, dict]:
    with closing(sqlite3.connect(path)) as c:
        c.row_factory = sqlite3.Row
        return {row["id"]: dict(row) for row in c.execute("SELECT * FROM api_keys")}


def _indexes(path: str) -> set[str]:
    with closing(sqlite3.connect(path)) as c:
        return {
            row[0] for row in c.execute(
                "SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = 'api_keys' AND sql IS NOT NULL"
            )
        }


def _fks(path: str) -> set[tuple[str, str, str]]:
    with closing(sqlite3.connect(path)) as c:
        return {(fk[3], fk[2], fk[6]) for fk in c.execute("PRAGMA foreign_key_list('api_keys')")}


UNCHANGED = ("name", "key_prefix", "key_hash", "created_at", "last_used_at", "expires_at", "is_active")


@pytest.mark.parametrize("shape", ["chain", "production"])
def test_every_legacy_shape_gets_its_principal_and_holder(request, shape):
    path = request.getfixturevalue("at_0020" if shape == "chain" else "prod_shaped")
    before = _rows(path)

    _migrate(path)

    after = _rows(path)
    assert set(after) == set(before) == set(KEYS)
    for key_id, (_, (principal, holder)) in KEYS.items():
        row = after[key_id]
        assert (row["principal_user_id"], row["holder_user_id"]) == (principal, holder), key_id
        assert {c: row[c] for c in UNCHANGED} == {c: before[key_id][c] for c in UNCHANGED}, key_id
        assert "user_id" not in row and "agent_user_id" not in row
    assert _indexes(path) == {
        "ix_api_keys_key_prefix", "ix_api_keys_principal_user_id", "ix_api_keys_holder_user_id",
    }
    assert _fks(path) == {
        ("principal_user_id", "users", "CASCADE"), ("holder_user_id", "users", "CASCADE"),
    }
    with closing(sqlite3.connect(path)) as c:
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]
        assert c.execute("PRAGMA foreign_key_check").fetchall() == []
        plan = " ".join(
            row[3] for row in c.execute("EXPLAIN QUERY PLAN SELECT * FROM api_keys WHERE key_prefix = 'ck_00000000'")
        )
        assert "ix_api_keys_key_prefix" in plan


def test_the_new_foreign_keys_cascade_from_principal_and_holder(at_0020):
    _migrate(at_0020)
    with closing(sqlite3.connect(at_0020)) as c:
        c.execute("PRAGMA foreign_keys = ON")
        c.execute("DELETE FROM api_keys WHERE principal_user_id = 'agent' AND holder_user_id = 'creator'")
        c.execute("DELETE FROM users WHERE id = 'agent'")  # its own keys held by the admin go with it
        assert {r[0] for r in c.execute("SELECT id FROM api_keys")} == {
            "human-own", "orphan-self", "human-empty-agent", "agent-names-human",
        }
        c.execute("DELETE FROM users WHERE id = 'admin'")  # the keys it is principal of go too
        assert {r[0] for r in c.execute("SELECT id FROM api_keys")} == {"human-own", "orphan-self"}
        c.commit()


def _add_dead_keys(path: str) -> None:
    """Keys that name users who no longer exist: possible where foreign
    keys were off. Neither can sign in."""
    with closing(sqlite3.connect(path)) as c:
        c.execute("PRAGMA foreign_keys = OFF")
        for key_id, user_id, agent_user_id in (
            ("ghost-holder", "gone-human", "agent"),  # an agent key whose holder is gone
            ("ghost-principal", "gone-human", None),  # a human key whose human is gone
        ):
            c.execute(
                "INSERT INTO api_keys (id, user_id, name, key_prefix, key_hash, created_at, is_active, "
                "agent_user_id) VALUES (?, ?, 'g', ?, 'sha256$g', ?, 1, ?)",
                (key_id, user_id, f"ck_{key_id[6:14]}", NOW, agent_user_id),
            )
        c.commit()


def test_keys_naming_a_missing_user_are_deleted_and_reported(at_0020, capsys):
    """Such a key cannot sign in, and refusing would leave the service
    down after `chaotic system upgrade`: 0021 deletes it in the same
    transaction and prints what it deleted."""
    _add_dead_keys(at_0020)

    ctx = _Ctx(at_0020)
    try:
        _load_migration().upgrade(ctx)
    finally:
        ctx.close()
    printed = capsys.readouterr().out
    _run_in_one_transaction(at_0020, ctx.statements)

    assert "deleting API key ck_holder... (id ghost-holder): it signs in as agent, held by gone-human" in printed
    assert "deleting API key ck_principa... (id ghost-principal): it signs in as gone-human" in printed
    assert printed.count("deleting API key") == 2
    rows = _rows(at_0020)
    assert set(rows) == set(KEYS), "only the dead keys go"
    for key_id, (_, (principal, holder)) in KEYS.items():
        assert (rows[key_id]["principal_user_id"], rows[key_id]["holder_user_id"]) == (principal, holder)
    with closing(sqlite3.connect(at_0020)) as c:
        assert c.execute("PRAGMA foreign_key_check('api_keys')").fetchall() == []


@pytest.mark.parametrize("shape", ["chain", "production"])
def test_dead_keys_do_not_stop_oxyde_migrate(request, shape):
    """The same through the real executor, on both shapes."""
    path = request.getfixturevalue("at_0020" if shape == "chain" else "prod_shaped")
    _add_dead_keys(path)

    _migrate(path)

    assert set(_rows(path)) == set(KEYS)
    with closing(sqlite3.connect(path)) as c:
        assert c.execute("SELECT max(name) FROM oxyde_migrations").fetchone()[0] == MIGRATION.stem


def test_a_database_with_no_dead_keys_prints_nothing(at_0020, capsys):
    ctx = _Ctx(at_0020)
    try:
        _load_migration().upgrade(ctx)
    finally:
        ctx.close()
    assert capsys.readouterr().out == ""
    assert not any(statement.startswith("DELETE") for statement in ctx.statements)


def test_an_unexpected_table_shape_is_refused(at_0020):
    with closing(sqlite3.connect(at_0020)) as c:
        c.execute("ALTER TABLE api_keys ADD COLUMN scopes TEXT")
        c.commit()

    ctx = _Ctx(at_0020)
    try:
        with pytest.raises(RuntimeError, match=r"0021 upgrade: api_keys has columns.*nothing was changed"):
            _load_migration().upgrade(ctx)
    finally:
        ctx.close()
    assert ctx.statements == []


def test_a_failed_verification_rolls_everything_back(at_0020, monkeypatch):
    """If the copy loses a row, the CHECK fails the transaction and the
    old table is still there."""
    module = _load_migration()
    monkeypatch.setattr(module, "RESOLVED_SQL", module.RESOLVED_SQL + " WHERE k.id <> 'human-own'")
    before = _rows(at_0020)

    ctx = _Ctx(at_0020)
    try:
        module.upgrade(ctx)
    finally:
        ctx.close()
    with pytest.raises(sqlite3.IntegrityError, match="CHECK constraint failed: 0021 every api_keys row was copied"):
        _run_in_one_transaction(at_0020, ctx.statements)
    assert _rows(at_0020) == before


def test_downgrade_reads_back_as_the_same_principal_and_holder(at_0020):
    _migrate(at_0020)

    ctx = _Ctx(at_0020)
    try:
        _load_migration().downgrade(ctx)
    finally:
        ctx.close()
    _run_in_one_transaction(at_0020, ctx.statements)

    rows = _rows(at_0020)
    assert set(rows) == set(KEYS)
    with closing(sqlite3.connect(at_0020)) as c:
        users = {r[0]: (r[1], r[2]) for r in c.execute("SELECT id, is_agent, parent_user_id FROM users")}
    for key_id, (_, expected) in KEYS.items():
        row = rows[key_id]
        principal = row["agent_user_id"] or row["user_id"]
        is_agent, parent = users[principal]
        holder = row["user_id"] if row["user_id"] != principal else (parent if is_agent else principal)
        assert (principal, holder) == expected, key_id
    assert _indexes(at_0020) == set()
    assert _fks(at_0020) == {("user_id", "users", "CASCADE"), ("agent_user_id", "users", "CASCADE")}


def test_no_connection_to_read_through_is_refused():
    class _NoConnection:
        _mode = "execute"
        dialect = "sqlite"
        _db_conn = None

        def execute(self, sql):  # pragma: no cover - must not be reached
            raise AssertionError(sql)

    with pytest.raises(RuntimeError, match="no connection.*nothing was changed"):
        _load_migration().upgrade(_NoConnection())
