"""Schema audit: what the migration chain actually builds (CHT-1208).

The test database is a copy of a template built by applying every
migration (tests/conftest.py), so the schema under test IS the production
schema. These checks read that schema back from sqlite_master rather than
grepping migration text, and assert the invariants the code relies on:

1. The unique constraints the unified intent+limbo model depends on
   (review finding #15 in the ritual refactor was exactly one of these
   missing from production while the hand-written test schema had it).
2. Every Oxyde model has a table, and every model field has a column, so a
   model change without a migration fails here instead of on the first
   query in production.
"""
import glob
import os

import pytest
from oxyde import execute_raw

MIGRATIONS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, "migrations"))


async def _indexes(table: str) -> list[dict]:
    rows = await execute_raw("SELECT name, sql FROM sqlite_master WHERE type = 'index' AND tbl_name = ?", [table])
    return [dict(r) for r in rows if r["sql"]]  # autoindexes carry no SQL


def _unique_on(indexes: list[dict], *columns: str, partial: str | None = None) -> bool:
    for ix in indexes:
        sql = " ".join(ix["sql"].split()).lower()
        if "unique" not in sql:
            continue
        if all(c in sql for c in columns) and (partial is None or partial.lower() in sql):
            return True
    return False


@pytest.mark.asyncio
class TestRequiredUniqueConstraintsPresent:
    """DB-level uniqueness the intent+limbo model relies on:

    * ritual_attestations(ritual_id, sprint_id) and (ritual_id, issue_id)
    * ticket_limbo(issue_id, limbo_type) WHERE cleared_at IS NULL
      (the exclusive intent lock; stale-intent takeover depends on it)
    * ticket_limbo_blockers(limbo_id, ritual_id)
    """

    async def test_ticket_limbo_blocker_unique_per_ritual(self, db):
        assert _unique_on(await _indexes("ticket_limbo_blockers"), "limbo_id", "ritual_id")

    async def test_ritual_attestations_unique_on_ritual_and_issue(self, db):
        assert _unique_on(await _indexes("ritual_attestations"), "ritual_id", "issue_id")

    async def test_ritual_attestations_unique_on_ritual_and_sprint(self, db):
        assert _unique_on(await _indexes("ritual_attestations"), "ritual_id", "sprint_id")

    async def test_ticket_limbo_exclusive_intent_lock(self, db):
        assert _unique_on(
            await _indexes("ticket_limbo"), "issue_id", "limbo_type", partial="where cleared_at is null",
        )

    async def test_idempotency_backstops(self, db):
        """CHT-1223 / CHT-1259: the unique indexes behind create_project,
        create_label and TemplateService.create's duplicate checks."""
        assert _unique_on(await _indexes("projects"), "team_id", "key")
        assert _unique_on(await _indexes("labels"), "team_id", "name")
        assert _unique_on(await _indexes("templates"), "team_id", "name")


@pytest.mark.asyncio
class TestModelsMatchTheMigratedSchema:
    """A model field without a column is a migration somebody forgot to
    generate. This is the check `oxyde makemigrations` would make; it runs
    on every test run instead."""

    async def test_every_model_table_and_column_exists(self, db):
        import app.oxyde_models  # noqa: F401
        from oxyde.models.registry import registered_tables

        tables = {r["name"] for r in await execute_raw("SELECT name FROM sqlite_master WHERE type = 'table'")}
        missing = []
        for cls in registered_tables().values():
            table = cls.get_table_name()
            if table not in tables:
                missing.append(f"{table} (whole table)")
                continue
            columns = {r["name"] for r in await execute_raw(f'PRAGMA table_info("{table}")')}
            for fname, meta in cls._db_meta.field_metadata.items():
                if (meta.extra or {}).get("m2m"):
                    continue  # a relation through a join table, not a column
                col = meta.db_column or fname
                if col not in columns:
                    missing.append(f"{table}.{col}")
        assert not missing, f"model fields with no column in the migrated schema: {missing}"

    async def test_every_migration_in_the_repo_was_applied(self, db):
        applied = {r["name"] for r in await execute_raw("SELECT name FROM oxyde_migrations")}
        code = {
            os.path.splitext(os.path.basename(f))[0]
            for f in glob.glob(os.path.join(MIGRATIONS_DIR, "[0-9]*.py"))
        }
        assert applied == code
