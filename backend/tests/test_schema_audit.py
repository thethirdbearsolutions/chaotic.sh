"""Schema audit: production migrations vs. tests/conftest._SCHEMA_SQL.

The test suite hand-maintains its own SQLite schema in
`tests/conftest.py::_SCHEMA_SQL`. If production migrations diverge from
the hand-rolled schema, tests pass against an unrealistic structure
while production behavior diverges. The unique-index gap on
`ritual_attestations` (review finding #15) is exactly this kind of drift
masked by tests.

This module asserts:

1. The unique constraints required by the unified intent+limbo model
   exist in BOTH the production migration AND the test schema. These
   are new and currently missing — tests fail until the migration is
   added and conftest schema is updated to match.

2. A best-effort drift check between the two schemas, surfacing tables
   or constraints present in one but not the other.

When the refactor lands, the new migration and the conftest update must
go together.
"""
import re
from pathlib import Path

import pytest


REPO_ROOT = Path(__file__).resolve().parents[2]
MIGRATIONS_DIR = REPO_ROOT / "backend" / "migrations"
CONFTEST_PATH = Path(__file__).resolve().parent / "conftest.py"


def _load_conftest_schema() -> str:
    """Extract _SCHEMA_SQL from conftest as a single string."""
    text = CONFTEST_PATH.read_text()
    m = re.search(r'_SCHEMA_SQL\s*=\s*"""(.*?)"""', text, re.DOTALL)
    assert m, "Could not locate _SCHEMA_SQL in conftest.py"
    return m.group(1)


def _load_all_migrations() -> str:
    """Concatenate every migration file's text for substring searches."""
    parts = []
    for p in sorted(MIGRATIONS_DIR.glob("*.py")):
        parts.append(p.read_text())
    return "\n".join(parts)


# ---------------------------------------------------------------------------
# Required unique constraints for the unified model
# ---------------------------------------------------------------------------


class TestRequiredUniqueConstraintsPresent:
    """The unified intent+limbo model requires DB-level uniqueness on:

    * ritual_attestations(ritual_id, sprint_id) — sprint attestations
    * ritual_attestations(ritual_id, issue_id)  — issue attestations
    * ticket_limbo(issue_id, limbo_type) WHERE cleared_at IS NULL
      — exclusive intent lock (one open intent per issue+type)
    * ticket_limbo_blockers(limbo_id, ritual_id) — one blocker row
      per ritual under a given intent
    """

    def test_ticket_limbo_blocker_unique_per_ritual(self):
        """Each (intent, ritual) pair appears at most once as a blocker."""
        schema = _load_conftest_schema()
        pattern = re.compile(
            r"UNIQUE\s+INDEX[^(]*\(\s*[\"']?limbo_id[\"']?\s*,"
            r"\s*[\"']?ritual_id[\"']?\s*\)",
            re.IGNORECASE | re.DOTALL,
        )
        assert pattern.search(schema), (
            "Test schema must declare UNIQUE(limbo_id, ritual_id) on "
            "ticket_limbo_blockers to prevent duplicate blocker rows."
        )

    def test_ritual_attestations_unique_on_ritual_and_issue(self):
        schema = _load_conftest_schema()
        # Look for any unique index covering (ritual_id, issue_id).
        pattern = re.compile(
            r"UNIQUE\s*(?:INDEX[^(]*)?\(\s*[\"']?ritual_id[\"']?\s*,"
            r"\s*[\"']?issue_id[\"']?\s*\)",
            re.IGNORECASE | re.DOTALL,
        )
        assert pattern.search(schema), (
            "Test schema must declare UNIQUE(ritual_id, issue_id) on "
            "ritual_attestations to prevent duplicate attestation rows."
        )

    def test_ritual_attestations_unique_on_ritual_and_sprint(self):
        schema = _load_conftest_schema()
        pattern = re.compile(
            r"UNIQUE\s*(?:INDEX[^(]*)?\(\s*[\"']?ritual_id[\"']?\s*,"
            r"\s*[\"']?sprint_id[\"']?\s*\)",
            re.IGNORECASE | re.DOTALL,
        )
        assert pattern.search(schema), (
            "Test schema must declare UNIQUE(ritual_id, sprint_id) on "
            "ritual_attestations."
        )

    def test_ticket_limbo_exclusive_intent_lock(self):
        """Exclusive lock per (issue, intent-type) for unresolved limbo
        rows. Implementation can be a partial unique index or equivalent.
        """
        schema = _load_conftest_schema()
        # Accept any of: partial unique index on (issue_id, limbo_type)
        # filtered by cleared_at IS NULL, OR equivalent constraint name.
        partial_pattern = re.compile(
            r"UNIQUE\s+INDEX[^(]*\(\s*[\"']?issue_id[\"']?\s*,"
            r"\s*[\"']?limbo_type[\"']?\s*\)\s*WHERE\s+cleared_at\s+IS\s+NULL",
            re.IGNORECASE | re.DOTALL,
        )
        assert partial_pattern.search(schema), (
            "Test schema must declare a partial UNIQUE index on "
            "ticket_limbo(issue_id, limbo_type) WHERE cleared_at IS NULL "
            "to enforce the exclusive intent lock."
        )

    def test_production_migrations_include_unique_constraints(self):
        """The production migration text must add the same constraints
        the test schema declares. Otherwise tests pass on a schema
        production doesn't have.
        """
        migrations = _load_all_migrations()
        assert (
            "ritual_attestations" in migrations
            and re.search(
                r"UNIQUE.*ritual_id.*issue_id", migrations, re.IGNORECASE
            )
        ), (
            "A migration must add UNIQUE(ritual_id, issue_id) on "
            "ritual_attestations. None of the existing migrations do."
        )
        assert re.search(
            r"UNIQUE.*ritual_id.*sprint_id", migrations, re.IGNORECASE
        ), (
            "A migration must add UNIQUE(ritual_id, sprint_id) on "
            "ritual_attestations."
        )
        assert re.search(
            r"ticket_limbo.*issue_id.*limbo_type.*cleared_at",
            migrations, re.IGNORECASE | re.DOTALL,
        ), (
            "A migration must add the partial UNIQUE index on ticket_limbo "
            "for the exclusive intent lock."
        )


# ---------------------------------------------------------------------------
# Best-effort drift check
# ---------------------------------------------------------------------------


class TestSchemaDriftBestEffort:
    """Surfaces tables that exist in test schema but not in production
    migrations (or vice versa). Best-effort because the migration files
    are Python ctx.create_table() calls, not raw SQL — we just check
    for the table name token in either source.
    """

    # Oxyde manages its own bookkeeping table; not part of any app migration.
    OXYDE_INTERNAL_TABLES = {"oxyde_migrations"}

    def test_all_test_schema_tables_appear_in_migrations(self):
        schema = _load_conftest_schema()
        tables_in_test = set(
            m.group(1)
            for m in re.finditer(
                r"CREATE TABLE IF NOT EXISTS\s+(\w+)", schema
            )
        )
        migrations = _load_all_migrations()

        missing = [
            t for t in tables_in_test
            if t not in migrations and t not in self.OXYDE_INTERNAL_TABLES
        ]
        assert not missing, (
            f"Tables present in test schema but not referenced by any "
            f"migration: {missing}. Hand-rolled test schema has drifted "
            f"from production."
        )
