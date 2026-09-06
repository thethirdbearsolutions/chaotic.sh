"""The migration replay agrees with the models (CHT-1410).

`oxyde makemigrations` never reads a database: it replays the migration
chain in memory and diffs the result against the models. Hand-written
raw-SQL migrations are invisible to that replay, so by 0016 the tool
proposed 51 operations on a clean checkout and could not be used for
the next schema change. 0017 recorded the missing state without
executing anything; these tests keep the diff empty, so a schema change
either comes from makemigrations or records its state the same way.
"""
import importlib.util
import json
import pathlib

import pytest
from oxyde.core import migration_compute_diff
from oxyde.migrations.extract import extract_current_schema
from oxyde.migrations.replay import replay_migrations

import app.oxyde_models  # noqa: F401 - registers the models the extractor reads

MIGRATIONS = pathlib.Path(__file__).resolve().parents[1] / "migrations"
STATE_ONLY = MIGRATIONS / "0017_record_hand_written_schema_state.py"


def _describe(op: dict) -> str:
    kind = op.get("type", "?")
    table = op.get("table")
    if isinstance(table, dict):
        table = table.get("name")
    detail = op.get("field") or op.get("name") or op.get("column") or ""
    if isinstance(detail, dict):
        detail = detail.get("name", "")
    return f"{kind} {table} {detail}".strip()


def test_replayed_migrations_match_the_models():
    replayed = replay_migrations(str(MIGRATIONS))
    current = extract_current_schema(dialect="sqlite")
    operations = json.loads(migration_compute_diff(json.dumps(replayed), json.dumps(current)))
    assert not operations, (
        "the migration replay is behind the models; `oxyde makemigrations` would emit:\n  "
        + "\n  ".join(_describe(op) for op in operations)
        + "\n(a hand-written migration must also record its schema state; see 0017)"
    )


def test_the_replay_sees_every_table_the_models_declare():
    """A guard on the guard: an empty diff means nothing if the replay
    came back empty too."""
    replayed = replay_migrations(str(MIGRATIONS))
    assert set(replayed["tables"]) == set(extract_current_schema(dialect="sqlite")["tables"])
    assert len(replayed["tables"]) >= 28


class _RefusingContext:
    """A context in execute mode that refuses every call: what 0017 sees
    against a real database, where it must do nothing."""

    _mode = "execute"

    def __getattr__(self, name):
        raise AssertionError(f"0017 called ctx.{name}() against a database")


def _load_0017():
    spec = importlib.util.spec_from_file_location("migration_0017", STATE_ONLY)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_the_state_only_migration_executes_nothing_against_a_database():
    module = _load_0017()
    module.upgrade(_RefusingContext())
    module.downgrade(_RefusingContext())


def test_the_state_only_migration_records_in_the_replay():
    from oxyde.migrations.context import MigrationContext

    ctx = MigrationContext(mode="collect")
    _load_0017().upgrade(ctx)
    kinds = [op["type"] for op in ctx.get_collected_operations()]
    assert len(kinds) == 51
    assert "create_table" in kinds and "alter_column" in kinds
    with pytest.raises(AssertionError):
        _load_0017()._record_state(_RefusingContext())
