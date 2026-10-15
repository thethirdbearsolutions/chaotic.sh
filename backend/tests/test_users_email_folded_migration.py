"""Tests for migrations/0034_users_email_folded.py (CHT-1804).

A database at 0033 is seeded with accounts whose addresses differ only
in case. After 0034 every account still exists with every column as it
was; each folded address is held by exactly one account (the oldest,
then lowest id), the others have a NULL email_folded and are printed by
id, never by address. The database then refuses a new case variant,
and the downgrade drops the column and the index again, losing nothing.
"""
import sqlite3
import subprocess
import sys
from contextlib import closing

import pytest

from .test_api_key_hash_migration import _ROLLBACK
from .test_parent_user_fk_migration import _MIGRATE, BACKEND, _migrate

PREVIOUS = "0033_team_members_unique"
THIS = "0034_users_email_folded"
INDEX = "ux_users_email_folded"

# id -> (email, created_at), inserted in this order.
USERS = {
    # A pair: the older one holds the address, whatever the insert order.
    "u-bob-new": ("bob@example.com", "2026-02-01T00:00:00+00:00"),
    "u-bob-old": ("Bob@Example.com", "2026-01-01T00:00:00+00:00"),
    # A triple, two created at the same moment: the lower id wins the tie.
    "u-carol-b": ("CAROL@example.com", "2026-03-01T00:00:00+00:00"),
    "u-carol-a": ("carol@EXAMPLE.com", "2026-03-01T00:00:00+00:00"),
    "u-carol-c": ("Carol@example.com", "2026-04-01T00:00:00+00:00"),
    # Non-ASCII capitals are not folded: two addresses, both kept.
    "u-umlaut-upper": ("Ärger@example.com", "2026-01-01T00:00:00+00:00"),
    "u-umlaut-lower": ("ärger@example.com", "2026-01-01T00:00:00+00:00"),
    # Alone at its address.
    "u-solo": ("Solo@Example.COM", "2026-01-01T00:00:00+00:00"),
    # An agent: its synthetic address gets folded like any other.
    "u-agent": ("agent-1@agent.local", "2026-01-01T00:00:00+00:00"),
    # Whitespace SQL's trim() would keep (a tab, a no-break space) is
    # stripped as fold_email strips it, so the later variant collides.
    "u-tab": ("Tab@example.com\t", "2026-01-01T00:00:00+00:00"),
    "u-tab-variant": ("tab@example.com", "2026-02-01T00:00:00+00:00"),
    "u-nbsp": ("\u00a0nb@example.com", "2026-01-01T00:00:00+00:00"),
    # A quote in the address survives the literal.
    "u-quote": ("O'Brien@example.com", "2026-01-01T00:00:00+00:00"),
}
FOLDED = {
    "u-bob-old": "bob@example.com",
    "u-carol-a": "carol@example.com",
    "u-umlaut-upper": "Ärger@example.com",
    "u-umlaut-lower": "ärger@example.com",
    "u-solo": "solo@example.com",
    "u-agent": "agent-1@agent.local",
    "u-tab": "tab@example.com",
    "u-nbsp": "nb@example.com",
    "u-quote": "o'brien@example.com",
}
EXCLUDED = {
    "u-bob-new": "u-bob-old", "u-carol-b": "u-carol-a", "u-carol-c": "u-carol-a", "u-tab-variant": "u-tab",
}


def _migrate_capturing(path: str, target: str) -> str:
    """_migrate, returning the child's stdout (the migration's report)."""
    result = subprocess.run(
        [sys.executable, "-c", _MIGRATE, path, target],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    return result.stdout


def _seed(path: str, users: dict) -> None:
    with closing(sqlite3.connect(path)) as c:
        for user_id, (email, created_at) in users.items():
            is_agent = 1 if user_id == "u-agent" else 0
            parent = "u-solo" if is_agent else None
            c.execute(
                "INSERT INTO users (id, email, hashed_password, name, created_at, updated_at, is_agent, "
                "is_active, parent_user_id) VALUES (?, ?, 'hash-' || ?, ?, ?, ?, ?, 1, ?)",
                (user_id, email, user_id, f"Name {user_id}", created_at, created_at, is_agent, parent),
            )
        c.commit()


def _rows(path: str) -> dict[str, dict]:
    """Every column of every account, by id, without email_folded."""
    with closing(sqlite3.connect(path)) as c:
        c.row_factory = sqlite3.Row
        return {
            row["id"]: {k: row[k] for k in row.keys() if k != "email_folded"}
            for row in c.execute("SELECT * FROM users")
        }


def _folded(path: str) -> dict[str, str | None]:
    with closing(sqlite3.connect(path)) as c:
        return dict(c.execute("SELECT id, email_folded FROM users"))


def _foreign_keys(path: str) -> list[tuple]:
    with closing(sqlite3.connect(path)) as c:
        return sorted(tuple(row[2:]) for row in c.execute("PRAGMA foreign_key_list(users)"))


def _index_sql(path: str):
    with closing(sqlite3.connect(path)) as c:
        row = c.execute("SELECT sql FROM sqlite_master WHERE type = 'index' AND name = ?", (INDEX,)).fetchone()
        return row[0] if row else None


@pytest.fixture
def at_previous(tmp_path):
    path = str(tmp_path / "users.db")
    _migrate(path, target=PREVIOUS)
    return path


def test_case_variants_keep_their_accounts_and_only_the_oldest_holds_the_address(at_previous):
    _seed(at_previous, USERS)
    before = _rows(at_previous)

    output = _migrate_capturing(at_previous, THIS)

    # Nothing deleted, nothing but the new column changed: emails included.
    assert _rows(at_previous) == before
    folded = _folded(at_previous)
    assert {k: v for k, v in folded.items() if v is not None} == FOLDED
    assert {k for k, v in folded.items() if v is None} == set(EXCLUDED)
    # One line per excluded account, naming it and the holder by id.
    for user_id, keeper_id in EXCLUDED.items():
        assert f"[0034] account {user_id} shares its address (ignoring case) with older account {keeper_id};" in output
    for user_id in FOLDED:
        assert f"account {user_id} " not in output
    assert "[0034] 4 account(s) left without email_folded" in output
    # Ids only: no address appears in the report.
    assert "@" not in output


def test_the_index_refuses_a_new_case_variant(at_previous):
    _seed(at_previous, USERS)
    _migrate(at_previous, target=THIS)

    assert "UNIQUE" in _index_sql(at_previous).upper()
    with closing(sqlite3.connect(at_previous)) as c:
        insert = (
            "INSERT INTO users (id, email, email_folded, hashed_password, name, created_at, updated_at, "
            "is_agent, is_active) VALUES (?, ?, ?, 'x', 'N', '2026-05-01', '2026-05-01', 0, 1)"
        )
        with pytest.raises(sqlite3.IntegrityError):
            c.execute(insert, ("u-new", "SOLO@example.com", "solo@example.com"))
        # Another address is fine, and so is another NULL.
        c.execute(insert, ("u-dave", "Dave@example.com", "dave@example.com"))
        c.execute(insert, ("u-null", "x@example.com", None))
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]
        assert c.execute("PRAGMA foreign_key_check").fetchall() == []


def test_no_variants_no_report(at_previous):
    clean = {k: v for k, v in USERS.items() if k not in EXCLUDED}
    _seed(at_previous, clean)

    output = _migrate_capturing(at_previous, THIS)

    assert "[0034]" not in output
    assert _folded(at_previous) == FOLDED
    assert _index_sql(at_previous) is not None


def test_downgrade_drops_the_column_and_index_and_keeps_every_account(at_previous):
    _seed(at_previous, USERS)
    before = _rows(at_previous)
    foreign_keys = _foreign_keys(at_previous)
    _migrate(at_previous, target=THIS)
    assert _foreign_keys(at_previous) == foreign_keys

    result = subprocess.run(
        [sys.executable, "-c", _ROLLBACK, at_previous],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    assert THIS in result.stdout

    assert _index_sql(at_previous) is None
    assert _rows(at_previous) == before
    with closing(sqlite3.connect(at_previous)) as c:
        columns = [row[1] for row in c.execute("PRAGMA table_info(users)")]
        assert "email_folded" not in columns
    # users' foreign keys (parent_user_id's RESTRICT, 0020) survive both ways.
    assert _foreign_keys(at_previous) == foreign_keys


def _migration_module():
    import importlib.util
    from pathlib import Path

    path = Path(BACKEND) / "migrations" / f"{THIS}.py"
    spec = importlib.util.spec_from_file_location("migration_0034", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


@pytest.mark.parametrize("email", [
    "Bob@Example.com", " bob@example.com ", "Tab@example.com\t", "\u00a0nb@x.com\u2003",
    "\u00c4rger@Example.COM", "\n\rA@B.C\x0b\x0c", "\x1cfs@x.com", "", "O'Brien@x.com",
])
def test_the_migration_folds_exactly_as_the_app_does(email):
    from app.utils.email_address import fold_email
    assert _migration_module().fold_email(email) == fold_email(email)


def test_literals_quote_and_refuse_nul():
    module = _migration_module()
    assert module.sql_literal("o'brien") == "'o''brien'"
    with pytest.raises(ValueError):
        module.sql_literal("a\x00b")


class _NoConnection:
    _mode = "execute"
    dialect = "sqlite"
    _db_conn = None

    def __init__(self):
        self.executed = []

    def execute(self, sql):
        self.executed.append(sql)


def test_without_a_connection_it_falls_back_to_sql_and_says_so():
    module = _migration_module()
    ctx, lines = _NoConnection(), []
    assert module.backfill(ctx, echo=lines.append) is None
    assert ctx.executed == [module.FALLBACK_BACKFILL_SQL]
    assert len(lines) == 1 and "trims spaces only" in lines[0]
