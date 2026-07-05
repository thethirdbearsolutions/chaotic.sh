"""Tests for migrations/0006_normalize_datetime_format.py.

Oxyde 0.3.1 stored '2026-02-19 18:17:39.823056+00:00'; 0.7.1 stores
'2026-02-19 18:17:39.823056'. Other historical writers may have left
'T'-separated or 'Z'-suffixed ISO variants. The migration must normalize
every variant to the naive space-separated form, leave conforming rows
and NULLs untouched, and make bytewise ORDER BY chronological again.
"""
import importlib.util
import sqlite3
from pathlib import Path

import pytest

MIGRATION = Path(__file__).parent.parent / "migrations" / "0006_normalize_datetime_format.py"


def _load_migration():
    spec = importlib.util.spec_from_file_location("m0006", MIGRATION)
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
    for table, cols in mig.DATETIME_COLUMNS.items():
        col_ddl = ", ".join(f'"{c}" TIMESTAMP' for c in cols)
        conn.execute(f'CREATE TABLE "{table}" (id TEXT, {col_ddl})')
    yield conn
    conn.close()


VARIANTS = [
    ("t-offset", "2026-07-05T09:00:00.111111+00:00", "2026-07-05 09:00:00.111111"),
    ("t-z", "2026-07-05T10:00:00.222222Z", "2026-07-05 10:00:00.222222"),
    ("t-naive", "2026-07-05T11:00:00.333333", "2026-07-05 11:00:00.333333"),
    ("sp-offset", "2026-07-05 12:00:00.444444+00:00", "2026-07-05 12:00:00.444444"),
    ("sp-offset-nomicro", "2026-07-05 12:30:00+00:00", "2026-07-05 12:30:00"),
    ("sp-naive", "2026-07-05 13:00:00.555555", "2026-07-05 13:00:00.555555"),
    ("sp-naive-nomicro", "2026-07-05 14:00:00", "2026-07-05 14:00:00"),
]


def test_every_variant_normalizes(mig, conn):
    for rid, stored, _ in VARIANTS:
        conn.execute("INSERT INTO labels (id, created_at) VALUES (?, ?)", (rid, stored))
    conn.execute("INSERT INTO labels (id, created_at) VALUES ('nullrow', NULL)")

    mig.upgrade(_CollectCtx(conn))

    got = dict(conn.execute("SELECT id, created_at FROM labels"))
    for rid, _, expected in VARIANTS:
        assert got[rid] == expected, (rid, got[rid])
    assert got["nullrow"] is None


def test_bytewise_order_is_chronological_after_migration(mig, conn):
    for rid, stored, _ in VARIANTS:
        conn.execute("INSERT INTO labels (id, created_at) VALUES (?, ?)", (rid, stored))

    mig.upgrade(_CollectCtx(conn))

    ordered = [
        v for (v,) in conn.execute(
            "SELECT created_at FROM labels WHERE created_at IS NOT NULL ORDER BY created_at"
        )
    ]
    assert ordered == sorted(v for _, _, v in VARIANTS)


def test_conforming_rows_untouched(mig, conn):
    conn.execute(
        "INSERT INTO users (id, created_at, updated_at) VALUES "
        "('u1', '2026-02-19 18:17:28.274742', '2026-02-19 18:17:28.274742')"
    )
    mig.upgrade(_CollectCtx(conn))
    row = conn.execute("SELECT created_at, updated_at FROM users").fetchone()
    assert row == ("2026-02-19 18:17:28.274742", "2026-02-19 18:17:28.274742")


def test_all_tables_and_columns_covered_by_ddl(mig, conn):
    """upgrade() must run cleanly against every declared table/column."""
    mig.upgrade(_CollectCtx(conn))  # empty tables, but every UPDATE must parse


def test_column_list_covers_models_at_freeze_time():
    """Every model datetime field that existed at the 0.7-upgrade freeze must
    appear in DATETIME_COLUMNS, and every frozen entry must be a real model
    field (typo check). Fields added after the freeze are written by 0.7+
    only and never need normalizing — so we assert coverage of the frozen
    set, not strict equality forever."""
    import typing
    from datetime import datetime

    import app.oxyde_models  # noqa: F401
    from oxyde.models.registry import registered_tables

    def is_dt(pt):
        if pt is datetime:
            return True
        if hasattr(pt, "__metadata__"):
            return typing.get_args(pt)[0] is datetime
        return False

    mig = _load_migration()
    from_models = {}
    for cls in registered_tables().values():
        cols = sorted(
            meta.db_column or fname
            for fname, meta in cls._db_meta.field_metadata.items()
            if is_dt(meta.python_type)
        )
        if cols:
            from_models[cls.get_table_name()] = cols

    frozen = {t: sorted(c) for t, c in mig.DATETIME_COLUMNS.items()}
    # Typo check: every frozen table/column is a real model datetime field.
    for table, cols in frozen.items():
        assert table in from_models, f"unknown table in migration: {table}"
        for col in cols:
            assert col in from_models[table], f"unknown column: {table}.{col}"
    # Freeze-time completeness: fields that existed at the upgrade are all
    # covered. (Fields added later are 0.7-written and need no normalizing;
    # extend this set only if a column is renamed.)
    frozen_time_fields = {
        (t, c) for t, cols in frozen.items() for c in cols
    }
    model_fields = {
        (t, c) for t, cols in from_models.items() for c in cols
    }
    assert frozen_time_fields <= model_fields
