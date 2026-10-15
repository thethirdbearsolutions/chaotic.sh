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


def test_the_record_agrees_with_the_models_on_delete_actions():
    """Oxyde's diff ignores `on_delete`, so a model switching a foreign key
    from CASCADE to SET NULL (or back) leaves makemigrations silent. Hold
    the record to the models here, and the database to the record below
    (CHT-1427)."""
    replayed = replay_migrations(str(MIGRATIONS))
    current = extract_current_schema(dialect="sqlite")
    mismatched = []
    for table, spec in current["tables"].items():
        recorded = {fk["name"]: fk["on_delete"] for fk in replayed["tables"][table].get("foreign_keys", [])}
        for fk in spec.get("foreign_keys", []):
            if recorded.get(fk["name"]) != fk["on_delete"]:
                mismatched.append(f"{table}.{fk['name']}: model {fk['on_delete']}, record {recorded.get(fk['name'])}")
    assert not mismatched, mismatched


def test_the_database_agrees_with_the_record_on_delete_actions(schema_template):
    """Every foreign key the record holds has the same ON DELETE in a
    database built from the chain (the record may hold fewer: see 0017)."""
    replayed = replay_migrations(str(MIGRATIONS))
    connection = sqlite3.connect(f"file:{schema_template}?mode=ro", uri=True)
    try:
        mismatched = []
        for table, spec in replayed["tables"].items():
            in_database = {
                (row[3], row[2]): row[6] for row in connection.execute(f"PRAGMA foreign_key_list('{table}')")
            }
            for fk in spec.get("foreign_keys", []):
                key = (fk["columns"][0], fk["ref_table"])
                if in_database.get(key) != fk["on_delete"]:
                    mismatched.append(f"{table}.{key[0]}: record {fk['on_delete']}, database {in_database.get(key)}")
    finally:
        connection.close()
    assert not mismatched, mismatched


# Deleting a user may cascade only into rows that belong to the account
# itself. Anything else that points at a user records who did something
# and is SET NULL (CHT-1427) or, for an agent's owner, RESTRICT
# (CHT-1467). ticket_limbo.requested_by_id is the known exception: it is
# NOT NULL and cascades, which is why the delete guards count it.
USER_FKS_ALLOWED_TO_CASCADE = {
    # A key goes with the user it signs in as and with the human who
    # holds it (CHT-1537, 0021).
    ("api_keys", "principal_user_id"),
    ("api_keys", "holder_user_id"),
    # Holder sessions and the tokens on them are credentials too: they go
    # with the user they act as and with the human who answers for them,
    # and a consent request with the human it was bound to (CHT-1515,
    # 0024).
    ("holder_sessions", "principal_user_id"),
    ("holder_sessions", "holder_user_id"),
    ("auth_tokens", "principal_user_id"),
    ("auth_tokens", "holder_user_id"),
    ("oauth_authorization_requests", "bound_user_id"),
    ("team_members", "user_id"),
    ("team_invitations", "invited_by_id"),
    ("ticket_limbo", "requested_by_id"),
    # A person's push registrations and notification choices are theirs
    # alone, and nothing else refers to them (CHT-1604, 0026).
    ("push_devices", "user_id"),
    ("push_preferences", "user_id"),
    # Stored answers to a user's own keyed writes, for their replay: a
    # cache, not a record of who did what (CHT-1621, 0029).
    ("idempotency_records", "user_id"),
}


def test_deleting_a_user_cascades_only_into_what_the_account_owns(schema_template):
    connection = sqlite3.connect(f"file:{schema_template}?mode=ro", uri=True)
    try:
        tables = [row[0] for row in connection.execute("SELECT name FROM sqlite_master WHERE type = 'table'")]
        cascading = {
            (table, fk[3])
            for table in tables
            for fk in connection.execute(f"PRAGMA foreign_key_list('{table}')")
            if fk[2] == "users" and fk[6] == "CASCADE"
        }
        parent = [
            fk[6] for fk in connection.execute("PRAGMA foreign_key_list('users')") if fk[3] == "parent_user_id"
        ]
    finally:
        connection.close()
    assert cascading <= USER_FKS_ALLOWED_TO_CASCADE, sorted(cascading - USER_FKS_ALLOWED_TO_CASCADE)
    assert parent == ["RESTRICT"], "deleting a human must not delete their agents behind the guard (CHT-1467)"
