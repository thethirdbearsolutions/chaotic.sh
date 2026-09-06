"""The migration replay agrees with the models, and the record agrees with
the database (CHT-1410).

`oxyde makemigrations` never reads a database: it replays the migration
chain in memory and diffs the result against the models. Raw-SQL
migrations are invisible to that replay, and Oxyde's extractor does not
report an index for `db_index=True` or a foreign key for a `str` column
with `db_on_delete`, so by 0016 the tool proposed 51 operations on a
clean checkout and could not be used for the next schema change. 0017
recorded the missing state without executing anything, and the indexes
the migrations had created by hand are now declared on the models.

Two invariants keep it that way: the replay-vs-models diff stays empty
(a schema change either comes from makemigrations or records its state
the same way), and every index a real database built from the chain
has is in the record with the same name. The second matters because a
makemigrations-generated column alter rebuilds the table on SQLite from
the *record's* indexes: an index missing from the record would silently
vanish from production on the first such migration.
"""
import importlib.util
import json
import pathlib
import sqlite3

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


def test_every_index_the_database_has_is_in_the_record(schema_template):
    """`schema_template` is a database built by applying the whole chain
    (conftest). Its index names per table must equal the replayed
    record's, or a makemigrations-driven table rebuild drops the rest."""
    connection = sqlite3.connect(f"file:{schema_template}?mode=ro", uri=True)
    try:
        rows = connection.execute(
            "SELECT tbl_name, name FROM sqlite_master WHERE type = 'index' AND sql IS NOT NULL"
        ).fetchall()
    finally:
        connection.close()
    in_database: dict[str, set[str]] = {}
    for table, name in rows:
        in_database.setdefault(table, set()).add(name)
    replayed = replay_migrations(str(MIGRATIONS))
    in_record = {
        table: {index["name"] for index in spec.get("indexes", [])}
        for table, spec in replayed["tables"].items()
    }
    missing = {
        table: sorted(names - in_record.get(table, set()))
        for table, names in in_database.items()
        if names - in_record.get(table, set())
    }
    assert not missing, (
        "indexes the database has that the migration record lacks (declare them in the "
        f"model's Meta.indexes with the same name): {missing}"
    )
    extra = {
        table: sorted(names - in_database.get(table, set()))
        for table, names in in_record.items()
        if names - in_database.get(table, set())
    }
    assert not extra, f"indexes the record claims that the database never built: {extra}"


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
    from oxyde.migrations.context import MigrationContext

    module = _load_0017()
    module.upgrade(_RefusingContext())
    module.downgrade(_RefusingContext())
    # And against Oxyde's own execute-mode context: no SQL collected.
    ctx = MigrationContext(mode="execute", dialect="sqlite")
    module.upgrade(ctx)
    module.downgrade(ctx)
    assert not getattr(ctx, "_sql_statements", []) and not ctx.get_collected_operations()


def test_the_state_only_migration_records_in_the_replay():
    from oxyde.migrations.context import MigrationContext

    ctx = MigrationContext(mode="collect")
    _load_0017().upgrade(ctx)
    ops = ctx.get_collected_operations()
    kinds = {op["type"] for op in ops}
    assert {"create_table", "add_column", "drop_column", "create_index", "alter_column", "drop_foreign_key"} <= kinds
    assert "drop_index" not in kinds, "0017 must not un-record an index the database has"
    assert {op["table"]["name"] for op in ops if op["type"] == "create_table"} == {
        "ticket_limbo_blockers", "templates", "issue_description_revisions", "document_revisions", "document_issues",
    }
    with pytest.raises(AssertionError):
        _load_0017()._record_state(_RefusingContext())
