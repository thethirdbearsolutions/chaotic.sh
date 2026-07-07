"""Tests for migrations/0007_normalize_enum_storage.py (CHT-1209).

DbEnum columns must store enum .name ('GATE'); legacy writers stored
.value ('gate'). PR #196 binds .name in query filters, which silently
misses .value rows. The migration rewrites every known .value to its
.name, leaves .name rows and NULLs untouched, and makes legacy rows
visible to .name-bound filters again.
"""
import enum
import importlib.util
import sqlite3
import typing
from pathlib import Path

import pytest

MIGRATION = Path(__file__).parent.parent / "migrations" / "0007_normalize_enum_storage.py"


def _load_migration():
    spec = importlib.util.spec_from_file_location("m0007", MIGRATION)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


class _CollectCtx:
    """Minimal MigrationContext stand-in: executes SQL on a sqlite3 conn."""

    def __init__(self, conn):
        self.conn = conn

    def execute(self, sql):
        self.conn.execute(sql)


@pytest.fixture
def mig():
    return _load_migration()


@pytest.fixture
def conn(mig):
    conn = sqlite3.connect(":memory:")
    for table, columns in mig.ENUM_COLUMNS.items():
        col_ddl = ", ".join(f'"{c}" TEXT' for c in columns)
        conn.execute(f'CREATE TABLE "{table}" (id TEXT, {col_ddl})')
    yield conn
    conn.close()


def test_legacy_values_rewritten_to_names(mig, conn):
    conn.execute("INSERT INTO rituals (id, \"trigger\", approval_mode) VALUES ('r1', 'ticket_close', 'gate')")
    conn.execute("INSERT INTO issues (id, status, priority, issue_type) VALUES ('i1', 'in_progress', 'no_priority', 'tech_debt')")
    conn.execute("INSERT INTO team_members (id, role) VALUES ('m1', 'owner')")

    mig.upgrade(_CollectCtx(conn))

    assert conn.execute("SELECT \"trigger\", approval_mode FROM rituals").fetchone() == (
        "TICKET_CLOSE", "GATE",
    )
    assert conn.execute("SELECT status, priority, issue_type FROM issues").fetchone() == (
        "IN_PROGRESS", "NO_PRIORITY", "TECH_DEBT",
    )
    assert conn.execute("SELECT role FROM team_members").fetchone() == ("OWNER",)


def test_name_rows_and_nulls_untouched(mig, conn):
    conn.execute("INSERT INTO rituals (id, \"trigger\", approval_mode) VALUES ('r1', 'EVERY_SPRINT', 'AUTO')")
    conn.execute("INSERT INTO ritual_groups (id, selection_mode) VALUES ('g1', NULL)")

    mig.upgrade(_CollectCtx(conn))

    assert conn.execute("SELECT \"trigger\", approval_mode FROM rituals").fetchone() == (
        "EVERY_SPRINT", "AUTO",
    )
    assert conn.execute("SELECT selection_mode FROM ritual_groups").fetchone() == (None,)


def test_legacy_rows_visible_to_name_filter_post_migration(mig, conn):
    """The CHT-1209 bug in miniature: a .name-bound filter (what #196's
    service code sends) misses a legacy .value row until the migration runs."""
    conn.execute("INSERT INTO rituals (id, \"trigger\", approval_mode) VALUES ('legacy', 'ticket_claim', 'gate')")
    conn.execute("INSERT INTO rituals (id, \"trigger\", approval_mode) VALUES ('modern', 'TICKET_CLAIM', 'GATE')")

    pre = conn.execute("SELECT id FROM rituals WHERE approval_mode = 'GATE' ORDER BY id").fetchall()
    assert pre == [("modern",)]  # legacy row invisible pre-migration

    mig.upgrade(_CollectCtx(conn))

    post = conn.execute("SELECT id FROM rituals WHERE approval_mode = 'GATE' ORDER BY id").fetchall()
    assert post == [("legacy",), ("modern",)]
    assert conn.execute("SELECT DISTINCT approval_mode FROM rituals").fetchall() == [("GATE",)]


def test_every_mapped_value_rewrites(mig, conn):
    """Exhaustive: every (table, column, value) pair in the frozen map."""
    ctx = _CollectCtx(conn)
    for table, columns in mig.ENUM_COLUMNS.items():
        for col, mapping in columns.items():
            for i, value in enumerate(mapping):
                conn.execute(
                    f'INSERT INTO "{table}" (id, "{col}") VALUES (?, ?)',
                    (f"{col}-{i}", value),
                )
    mig.upgrade(ctx)
    for table, columns in mig.ENUM_COLUMNS.items():
        for col, mapping in columns.items():
            stored = {
                v for (v,) in conn.execute(
                    f'SELECT "{col}" FROM "{table}" WHERE "{col}" IS NOT NULL'
                )
            }
            assert stored <= set(mapping.values()), (table, col, stored)


def test_upgrade_runs_on_empty_tables(mig, conn):
    mig.upgrade(_CollectCtx(conn))  # every UPDATE must parse and run


def test_frozen_map_matches_models():
    """Every frozen rewrite pair in 0007 matches the enum's actual current
    value -> name mapping (CHT-1267).

    0007 is a point-in-time historical data-fix (docstring: "frozen at the
    0.7-upgrade/CHT-1209 sweep") for the enum members that existed then --
    it is NOT a live contract requiring every enum member (or model) added
    afterward, on a new or pre-existing DbEnum column, to retroactively
    appear here (e.g. CHT-1250's new InboxEntry.kind column, or
    CHT-1251's new ActivityType.EMAIL_DELIVERY_FAILED member on the
    pre-existing issue_activities.activity_type column). Those never had
    legacy .value-written rows to correct, so 0007 correctly omits them.
    This test only guards against the frozen map going stale relative to
    the specific (value, name) pairs it DOES claim to cover -- e.g.
    someone renaming an existing enum member's string value out from
    under the migration's rewrite pairs.
    """
    import app.oxyde_models  # noqa: F401
    from oxyde.models.registry import registered_tables

    mig = _load_migration()
    from_models = {}
    for cls in registered_tables().values():
        for fname, meta in cls._db_meta.field_metadata.items():
            pt = meta.python_type
            base = typing.get_args(pt)[0] if hasattr(pt, "__metadata__") else pt
            if isinstance(base, type) and issubclass(base, enum.Enum):
                col = meta.db_column or fname
                mapping = {m.value: m.name for m in base if m.value != m.name}
                if mapping:
                    from_models.setdefault(cls.get_table_name(), {})[col] = mapping

    for table, columns in mig.ENUM_COLUMNS.items():
        assert table in from_models, f"{table} no longer has any DbEnum column"
        for col, mapping in columns.items():
            assert col in from_models[table], f"{table}.{col} no longer a DbEnum column"
            live_mapping = from_models[table][col]
            for value, name in mapping.items():
                assert live_mapping.get(value) == name, (
                    f"{table}.{col}: frozen rewrite {value!r} -> {name!r} no longer "
                    f"matches the live enum (got {live_mapping.get(value)!r})"
                )
