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


async def _unique_indexes(table: str) -> list[dict]:
    """Every unique index on `table` as {"columns": frozenset, "partial": bool},
    read from SQLite's own catalogue (index_list / index_info) rather than
    substring-matched out of the CREATE INDEX text, so an index name or a
    WHERE clause that happens to mention a column cannot satisfy the check."""
    found = []
    for ix in await execute_raw(f'PRAGMA index_list("{table}")'):
        if not ix["unique"]:
            continue
        cols = frozenset(c["name"] for c in await execute_raw(f'PRAGMA index_info("{ix["name"]}")'))
        found.append({"columns": cols, "partial": bool(ix["partial"])})
    return found


async def _unique_on(table: str, *columns: str, partial: bool = False) -> bool:
    """True if `table` has a unique index on exactly `columns`, partial
    (carrying a WHERE clause) iff `partial`."""
    return any(
        ix["columns"] == frozenset(columns) and ix["partial"] == partial
        for ix in await _unique_indexes(table)
    )


@pytest.mark.asyncio
class TestRequiredUniqueConstraintsPresent:
    """DB-level uniqueness the intent+limbo model relies on:

    * ritual_attestations(ritual_id, sprint_id) and (ritual_id, issue_id)
    * ticket_limbo(issue_id, limbo_type) WHERE cleared_at IS NULL
      (the exclusive intent lock; stale-intent takeover depends on it)
    * ticket_limbo_blockers(limbo_id, ritual_id)
    """

    async def test_ticket_limbo_blocker_unique_per_ritual(self, db):
        assert await _unique_on("ticket_limbo_blockers", "limbo_id", "ritual_id")

    async def test_ritual_attestations_unique_on_ritual_and_issue(self, db):
        assert await _unique_on("ritual_attestations", "ritual_id", "issue_id", partial=True)

    async def test_ritual_attestations_unique_on_ritual_and_sprint(self, db):
        assert await _unique_on("ritual_attestations", "ritual_id", "sprint_id", partial=True)

    async def test_ticket_limbo_exclusive_intent_lock(self, db):
        """Partial (WHERE cleared_at IS NULL) is load-bearing: cleared intents
        stay in the table and a new open intent for the same (issue, type)
        must be allowed, so a plain unique index here would be a bug."""
        assert await _unique_on("ticket_limbo", "issue_id", "limbo_type", partial=True)

    async def test_idempotency_backstops(self, db):
        """CHT-1223 / CHT-1259: the unique indexes behind create_project,
        create_label and TemplateService.create's duplicate checks."""
        assert await _unique_on("projects", "team_id", "key")
        assert await _unique_on("labels", "team_id", "name")
        assert await _unique_on("templates", "team_id", "name")

    async def test_exactness(self, db):
        """The helper compares the column set exactly: a superset or subset
        of the columns, or the wrong partial flag, is not a match."""
        assert not await _unique_on("projects", "team_id")
        assert not await _unique_on("projects", "team_id", "key", "name")
        assert not await _unique_on("ticket_limbo", "issue_id", "limbo_type", partial=False)


def _is_virtual(meta) -> bool:
    """The three relation kinds Oxyde's own schema extractor skips
    (oxyde/migrations/extract.py): a field typed as a Model (the real column
    is the synthetic `<name>_id`), a reverse FK, and a many-to-many through
    a join table. Mirrored here so a new relation field is not reported as
    a missing column on a correct schema."""
    from oxyde import Model

    pt = meta.python_type
    if isinstance(pt, type) and issubclass(pt, Model):
        return True
    extra = meta.extra or {}
    return bool(extra.get("reverse_fk") or extra.get("m2m"))


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
                if _is_virtual(meta):
                    continue
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
