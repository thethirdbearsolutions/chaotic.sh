"""Tests for migrations/0024_token_store.py (CHT-1515).

0024 creates five tables and touches nothing else. A database at 0023 is
seeded with a team, a human, an agent and a key; after 0024 every
pre-existing table's DDL, indexes, foreign keys and rows are unchanged,
and the new tables have the columns, indexes and ON DELETE actions the
models declare.

Two starting shapes, as for 0020, 0021 and 0023: a database built from
the chain, and a production-shaped one whose `users` table is still the
one SQLAlchemy's create_all made (VARCHAR(36) ids, `ix_users_email`,
0020's in-place REFERENCES), which the new tables now reference.
"""
import sqlite3
import subprocess
import sys
from contextlib import closing

import pytest

from .test_agent_identity_migration import SQLALCHEMY_USERS
from .test_parent_user_fk_migration import BACKEND, _migrate

NOW = "2026-10-13T00:00:00+00:00"
LATER = "2026-10-14T00:00:00+00:00"

NEW_TABLES = {
    "holder_sessions", "auth_tokens", "oauth_clients", "oauth_authorization_requests", "revocation_events",
}

# (table, column) -> (referenced table, ON DELETE)
EXPECTED_FKS = {
    ("holder_sessions", "team_id"): ("teams", "CASCADE"),
    ("holder_sessions", "principal_user_id"): ("users", "CASCADE"),
    ("holder_sessions", "holder_user_id"): ("users", "CASCADE"),
    ("holder_sessions", "oauth_client_id"): ("oauth_clients", "CASCADE"),
    ("holder_sessions", "credential_id"): ("api_keys", "CASCADE"),
    ("holder_sessions", "revoked_by_id"): ("users", "SET NULL"),
    ("auth_tokens", "holder_session_id"): ("holder_sessions", "CASCADE"),
    ("auth_tokens", "team_id"): ("teams", "CASCADE"),
    ("auth_tokens", "principal_user_id"): ("users", "CASCADE"),
    ("auth_tokens", "holder_user_id"): ("users", "CASCADE"),
    ("auth_tokens", "oauth_client_id"): ("oauth_clients", "CASCADE"),
    ("auth_tokens", "minted_by_credential_id"): ("api_keys", "CASCADE"),
    ("oauth_authorization_requests", "client_id"): ("oauth_clients", "CASCADE"),
    ("oauth_authorization_requests", "bound_user_id"): ("users", "CASCADE"),
    ("revocation_events", "team_id"): ("teams", "SET NULL"),
    ("revocation_events", "actor_id"): ("users", "SET NULL"),
}

EXPECTED_INDEXES = {
    "holder_sessions": {
        "ix_holder_sessions_team_id_revoked_at", "ix_holder_sessions_principal_user_id",
        "ix_holder_sessions_holder_user_id", "ix_holder_sessions_oauth_client_id",
        "ix_holder_sessions_credential_id", "ix_holder_sessions_revoked_by_id",
    },
    "auth_tokens": {
        "ux_auth_tokens_token_hash", "ix_auth_tokens_kind_expires_at", "ix_auth_tokens_holder_session_id",
        "ix_auth_tokens_replaces_id", "ix_auth_tokens_principal_user_id",
        "ix_auth_tokens_minted_by_credential_id", "ix_auth_tokens_oauth_client_id",
        "ix_auth_tokens_holder_user_id", "ix_auth_tokens_team_id",
    },
    "oauth_clients": {"ix_oauth_clients_registration_created_at"},
    "oauth_authorization_requests": {
        "ix_oauth_authorization_requests_expires_at", "ix_oauth_authorization_requests_client_id",
        "ix_oauth_authorization_requests_bound_user_id",
    },
    "revocation_events": {
        "ux_revocation_events_seq", "ix_revocation_events_team_id_created_at", "ix_revocation_events_target",
        "ix_revocation_events_actor_id",
    },
}


def _to_production_users(path: str) -> None:
    """Swap the chain's (empty) users table for production's shape. Done
    at 0022, so 0023 then adds its columns to it the way it did in
    production."""
    with closing(sqlite3.connect(path)) as c:
        c.execute("PRAGMA foreign_keys = OFF")
        c.execute("DROP TABLE users")
        for statement in SQLALCHEMY_USERS:
            c.execute(statement)
        c.commit()


@pytest.fixture(params=["chain", "production"])
def at_before(request, tmp_path):
    path = str(tmp_path / f"{request.param}.db")
    _migrate(path, target="0022_api_key_hash_unique")
    if request.param == "production":
        _to_production_users(path)
    _migrate(path, target="0023_agent_identity_columns")
    with closing(sqlite3.connect(path)) as c:
        c.execute("INSERT INTO teams (id, name, key, created_at, updated_at) VALUES ('t1', 'T', 'T', ?, ?)", (NOW, NOW))
        for user_id, is_agent, parent, kind in (
            ("human", 0, None, None), ("admin", 0, None, None), ("agent", 1, "human", "ASSISTANT"),
        ):
            c.execute(
                "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, "
                "parent_user_id, agent_team_id, kind, is_active, is_superuser, can_register) "
                "VALUES (?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, 1, 0, 0)",
                (user_id, f"{user_id}@example.com", user_id, NOW, NOW, is_agent, parent,
                 "t1" if is_agent else None, kind),
            )
        c.execute(
            "INSERT INTO api_keys (id, principal_user_id, holder_user_id, name, key_prefix, key_hash, "
            "created_at, is_active) VALUES ('k1', 'agent', 'human', 'n', 'ck_00000001', 'sha256$x', ?, 1)",
            (NOW,),
        )
        c.commit()
    return path


def _snapshot(path: str):
    """DDL of every object, and every row, of every table but the new ones
    and the migration ledger."""
    with closing(sqlite3.connect(path)) as c:
        ddl = {
            (kind, name): sql for kind, name, sql in c.execute(
                "SELECT type, name, sql FROM sqlite_master WHERE name NOT LIKE 'sqlite_%'"
            )
        }
        tables = [t for (kind, t) in ddl if kind == "table" and t not in NEW_TABLES and t != "oxyde_migrations"]
        rows = {t: sorted(map(tuple, c.execute(f'SELECT * FROM "{t}"'))) for t in tables}
    ddl = {
        key: sql for key, sql in ddl.items()
        if key[1] not in NEW_TABLES and key[1] != "oxyde_migrations"
        and not any(key[1] in names for names in EXPECTED_INDEXES.values())
    }
    return ddl, rows


def _fks(path: str) -> dict:
    with closing(sqlite3.connect(path)) as c:
        return {
            (table, fk[3]): (fk[2], fk[6])
            for table in NEW_TABLES
            for fk in c.execute(f"PRAGMA foreign_key_list('{table}')")
        }


def _indexes(path: str, table: str) -> set[str]:
    with closing(sqlite3.connect(path)) as c:
        return {
            name for (name,) in c.execute(
                "SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = ? AND sql IS NOT NULL", (table,)
            )
        }


def test_creates_the_store_and_changes_nothing_else(at_before):
    before = _snapshot(at_before)

    _migrate(at_before, target="0024_token_store")

    assert _snapshot(at_before) == before
    assert _fks(at_before) == EXPECTED_FKS
    for table, names in EXPECTED_INDEXES.items():
        assert _indexes(at_before, table) == names, table
    with closing(sqlite3.connect(at_before)) as c:
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]
        assert c.execute("PRAGMA foreign_key_check").fetchall() == []
        assert c.execute("SELECT 1 FROM oxyde_migrations WHERE name = '0024_token_store'").fetchone()
        for table in NEW_TABLES:
            assert c.execute(f"SELECT count(*) FROM {table}").fetchone() == (0,), table


def _seed_store(c) -> None:
    c.execute(
        "INSERT INTO oauth_clients (id, registration, redirect_uris, token_endpoint_auth_method, created_at, "
        "is_active) VALUES ('https://claude.ai/oauth/x', 'CIMD', '[]', 'none', ?, 1)",
        (NOW,),
    )
    c.execute(
        "INSERT INTO holder_sessions (id, team_id, principal_user_id, holder_user_id, via, oauth_client_id, "
        "policy_name, resource, scopes, created_at, idle_expires_at, absolute_expires_at, revoked_by_id) "
        "VALUES ('hs1', 't1', 'agent', 'human', 'OAUTH', 'https://claude.ai/oauth/x', 'write', "
        "'http://x/mcp', 'chaotic:write', ?, ?, ?, 'admin')",
        (NOW, LATER, LATER),
    )
    for token_id, kind, digest in (("a1", "ACCESS", "d1"), ("r1", "REFRESH", "d2")):
        c.execute(
            "INSERT INTO auth_tokens (id, kind, token_hash, display_prefix, holder_session_id, team_id, "
            "principal_user_id, holder_user_id, oauth_client_id, resource, scopes, policy_name, created_at, "
            "expires_at) VALUES (?, ?, ?, 'cat_0000', 'hs1', 't1', 'agent', 'human', "
            "'https://claude.ai/oauth/x', 'http://x/mcp', '', 'write', ?, ?)",
            (token_id, kind, digest, NOW, LATER),
        )
    c.execute(
        "INSERT INTO revocation_events (id, seq, team_id, actor_id, target_type, target_id, dry_run, created_at) "
        "VALUES ('e1', 1, 't1', 'admin', 'HOLDER_SESSION', 'hs1', 0, ?)",
        (NOW,),
    )


def test_a_token_digest_names_one_row(at_before):
    _migrate(at_before, target="0024_token_store")
    with closing(sqlite3.connect(at_before)) as c:
        c.execute("PRAGMA foreign_keys = ON")
        _seed_store(c)
        with pytest.raises(sqlite3.IntegrityError):
            c.execute(
                "INSERT INTO auth_tokens (id, kind, token_hash, display_prefix, team_id, principal_user_id, "
                "holder_user_id, resource, scopes, policy_name, created_at, expires_at) "
                "VALUES ('dup', 'ACCESS', 'd1', 'cat_0000', 't1', 'agent', 'human', 'r', '', 'write', ?, ?)",
                (NOW, LATER),
            )
        plan = " ".join(
            row[3] for row in c.execute("EXPLAIN QUERY PLAN SELECT id FROM auth_tokens WHERE token_hash = 'd1'")
        )
        assert "ux_auth_tokens_token_hash" in plan


def test_tokens_go_with_their_principal_and_audit_survives_the_actor(at_before):
    _migrate(at_before, target="0024_token_store")
    with closing(sqlite3.connect(at_before)) as c:
        c.execute("PRAGMA foreign_keys = ON")
        _seed_store(c)
        c.commit()
        c.execute("DELETE FROM users WHERE id = 'admin'")
        assert c.execute("SELECT revoked_by_id FROM holder_sessions").fetchall() == [(None,)]
        assert c.execute("SELECT actor_id FROM revocation_events").fetchall() == [(None,)]
        c.execute("DELETE FROM users WHERE id = 'agent'")
        assert c.execute("SELECT count(*) FROM holder_sessions").fetchone() == (0,)
        assert c.execute("SELECT count(*) FROM auth_tokens").fetchone() == (0,)
        assert c.execute("SELECT count(*) FROM revocation_events").fetchone() == (1,)


def test_the_revocation_audit_outlives_its_team_and_seq_is_unique(at_before):
    """Events are never deleted by a cascade: MAX(seq) is the revocation
    epoch, and it must never go backwards."""
    _migrate(at_before, target="0024_token_store")
    with closing(sqlite3.connect(at_before)) as c:
        c.execute("PRAGMA foreign_keys = ON")
        _seed_store(c)
        c.execute("DELETE FROM teams WHERE id = 't1'")
        assert c.execute("SELECT seq, team_id FROM revocation_events").fetchall() == [(1, None)]
        with pytest.raises(sqlite3.IntegrityError):
            c.execute(
                "INSERT INTO revocation_events (id, seq, target_type, dry_run, created_at) "
                "VALUES ('e2', 1, 'BULK', 0, ?)", (NOW,),
            )


def test_deleting_a_client_takes_its_sessions_and_tokens(at_before):
    _migrate(at_before, target="0024_token_store")
    with closing(sqlite3.connect(at_before)) as c:
        c.execute("PRAGMA foreign_keys = ON")
        _seed_store(c)
        c.execute("DELETE FROM oauth_clients")
        assert c.execute("SELECT count(*) FROM holder_sessions").fetchone() == (0,)
        assert c.execute("SELECT count(*) FROM auth_tokens").fetchone() == (0,)


_ROLLBACK = """
import asyncio, sys, os
from oxyde import AsyncDatabase, PoolSettings, disconnect_all
from oxyde.migrations.executor import rollback_migrations

async def main(path):
    database = AsyncDatabase(f"sqlite:///{path}", overwrite=True, settings=PoolSettings(max_connections=1))
    await database.connect()
    import app.oxyde_models  # noqa: F401
    try:
        print(",".join(await rollback_migrations(steps=1, migrations_dir="migrations")))
    finally:
        await disconnect_all()

asyncio.run(main(sys.argv[1]))
sys.stdout.flush()
sys.stderr.flush()
os._exit(0)
"""


def test_downgrade_drops_exactly_the_store(at_before):
    before = _snapshot(at_before)
    _migrate(at_before, target="0024_token_store")
    result = subprocess.run(
        [sys.executable, "-c", _ROLLBACK, at_before],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    assert "0024_token_store" in result.stdout
    assert _snapshot(at_before) == before
    with closing(sqlite3.connect(at_before)) as c:
        tables = {name for (name,) in c.execute("SELECT name FROM sqlite_master WHERE type = 'table'")}
    assert not tables & NEW_TABLES
