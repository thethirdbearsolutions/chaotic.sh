"""Refactor ticket_limbo to intent + blockers model.

The pre-refactor schema had `ticket_limbo` as a per-ritual row table:
each pending ritual got its own row. That conflicted with the partial
UNIQUE on `(issue_id, limbo_type)` introduced in 0004 — issues with
2+ pending rituals of the same trigger silently lost all but one
limbo row (per the IntegrityError fallback in `_create_limbo_record`).

The unified intent+limbo model wants:
  * One row in `ticket_limbo` per intent: `(issue_id, limbo_type)`
    is unique while `cleared_at IS NULL` (the exclusive intent lock).
  * One row in the new `ticket_limbo_blockers` table per blocking
    ritual: `(limbo_id, ritual_id)` is unique. Each blocker has its
    own `resolved_at`/`resolved_by_id`. The intent is fully resolved
    when all of its blockers are resolved.

Data migration strategy:
  1. Create the new `ticket_limbo_blockers` table.
  2. For each existing `ticket_limbo` row, insert a corresponding
     blocker. Open rows (cleared_at IS NULL) get reparented under the
     canonical OPEN row for their `(issue_id, limbo_type)` group.
     Closed rows stay individually owned (the canonical row for a
     closed group is itself), preserving per-historical-event audit.
  3. Delete redundant OPEN ticket_limbo rows only — closed rows are
     preserved as historical records. Open rows must be unique per
     `(issue_id, limbo_type)`, which 0004 already arranged for, but
     this re-asserts it idempotently after the insert.
  4. Rebuild `ticket_limbo` without the `ritual_id` column using the
     12-step CREATE/INSERT/DROP/RENAME pattern. ALTER TABLE DROP
     COLUMN is only available in SQLite 3.35+, and even then it
     interacts poorly with FK constraints; the rebuild pattern is
     portable across SQLite versions.

Created: 2026-04-26
"""

depends_on = "0004_ritual_intent_unique_indexes"


def upgrade(ctx):
    """Apply migration."""
    # 1. Create blockers table.
    ctx.execute("""
        CREATE TABLE IF NOT EXISTS ticket_limbo_blockers (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            limbo_id VARCHAR(36) NOT NULL REFERENCES ticket_limbo(id) ON DELETE CASCADE,
            ritual_id VARCHAR(36) NOT NULL REFERENCES rituals(id) ON DELETE CASCADE,
            resolved_at DATETIME,
            resolved_by_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL
        )
    """)
    ctx.execute("""
        CREATE UNIQUE INDEX IF NOT EXISTS uq_ticket_limbo_blocker
        ON ticket_limbo_blockers (limbo_id, ritual_id)
    """)

    # 2a. Open rows: parent every blocker under the canonical OPEN row
    #     of its (issue_id, limbo_type) group. Resolved fields stay null
    #     (the open row was never cleared).
    ctx.execute("""
        INSERT OR IGNORE INTO ticket_limbo_blockers
            (id, limbo_id, ritual_id, resolved_at, resolved_by_id)
        SELECT
            src.id,
            (SELECT MIN(tl.id) FROM ticket_limbo tl
             WHERE tl.issue_id = src.issue_id
               AND tl.limbo_type = src.limbo_type
               AND tl.cleared_at IS NULL),
            src.ritual_id,
            NULL,
            NULL
        FROM ticket_limbo src
        WHERE src.cleared_at IS NULL
    """)

    # 2b. Closed rows: each historical row stays individually owned
    #     (its blocker points at itself). Preserves per-event timestamp
    #     and attribution rather than collapsing distinct close events
    #     into a single "mega-event".
    ctx.execute("""
        INSERT OR IGNORE INTO ticket_limbo_blockers
            (id, limbo_id, ritual_id, resolved_at, resolved_by_id)
        SELECT
            src.id,
            src.id,
            src.ritual_id,
            src.cleared_at,
            src.cleared_by_id
        FROM ticket_limbo src
        WHERE src.cleared_at IS NOT NULL
    """)

    # 3. Delete redundant OPEN rows only — keep MIN(id) per group.
    #    Closed rows are preserved verbatim as historical records.
    ctx.execute("""
        DELETE FROM ticket_limbo
        WHERE cleared_at IS NULL
        AND id NOT IN (
            SELECT MIN(id) FROM ticket_limbo
            WHERE cleared_at IS NULL
            GROUP BY issue_id, limbo_type
        )
    """)

    # 4. Rebuild ticket_limbo without `ritual_id`. Portable across
    #    SQLite versions and avoids the FK-disable dance that DROP
    #    COLUMN requires when a column has a foreign key.
    ctx.execute("""
        CREATE TABLE ticket_limbo_new (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            issue_id VARCHAR(36) NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
            limbo_type VARCHAR(5) NOT NULL,
            requested_by_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            requested_at DATETIME NOT NULL,
            cleared_at DATETIME,
            cleared_by_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL
        )
    """)
    ctx.execute("""
        INSERT INTO ticket_limbo_new
            (id, issue_id, limbo_type, requested_by_id, requested_at, cleared_at, cleared_by_id)
        SELECT
            id, issue_id, limbo_type, requested_by_id, requested_at, cleared_at, cleared_by_id
        FROM ticket_limbo
    """)
    # The partial UNIQUE index on (issue_id, limbo_type) WHERE
    # cleared_at IS NULL was created in 0004 against the old table;
    # it's gone with the DROP. Re-create on the new table.
    ctx.execute("DROP INDEX IF EXISTS uq_ticket_limbo_open_intent")
    ctx.execute("DROP TABLE ticket_limbo")
    ctx.execute("ALTER TABLE ticket_limbo_new RENAME TO ticket_limbo")
    ctx.execute("""
        CREATE UNIQUE INDEX IF NOT EXISTS uq_ticket_limbo_open_intent
        ON ticket_limbo (issue_id, limbo_type)
        WHERE cleared_at IS NULL
    """)


def downgrade(ctx):
    """Revert migration.

    IRREVERSIBLE in the strict sense — restore from a pre-0005 backup
    if you need byte-exact recovery. This downgrade reconstructs an
    APPROXIMATION of the pre-0005 schema:

    * `ritual_id` column is re-added.
    * Open intents fan back out into per-ritual rows. The original
      per-row `requested_by_id` / `requested_at` are unrecoverable —
      every reconstructed row receives the canonical intent's values.
    * Closed historical rows are preserved as-is (they were
      single-row owners pre-0005 and remain so).
    * If a ritual was hard-deleted between upgrade and downgrade,
      its blocker survives but the reconstructed `ticket_limbo` row
      will violate the FK to `rituals`. Caller is responsible for
      checking integrity.
    """
    ctx.execute("ALTER TABLE ticket_limbo ADD COLUMN ritual_id VARCHAR(36) REFERENCES rituals(id) ON DELETE CASCADE")

    # Closed rows: ritual_id is the self-pointing blocker's ritual_id
    # (one blocker per closed row, by construction in step 2b).
    ctx.execute("""
        UPDATE ticket_limbo
        SET ritual_id = (
            SELECT b.ritual_id FROM ticket_limbo_blockers b
            WHERE b.limbo_id = ticket_limbo.id AND b.id = ticket_limbo.id
        )
        WHERE cleared_at IS NOT NULL
    """)

    # Open canonical rows: pick one blocker's ritual_id (lossy).
    ctx.execute("""
        UPDATE ticket_limbo
        SET ritual_id = (
            SELECT b.ritual_id FROM ticket_limbo_blockers b
            WHERE b.limbo_id = ticket_limbo.id
            ORDER BY b.id LIMIT 1
        )
        WHERE cleared_at IS NULL
    """)

    # Re-fan additional open blockers into their own ticket_limbo
    # rows. requested_by_id / requested_at are inherited from the
    # canonical row — the original per-row attribution is unrecoverable.
    ctx.execute("""
        INSERT INTO ticket_limbo
            (id, issue_id, ritual_id, limbo_type, requested_by_id,
             requested_at, cleared_at, cleared_by_id)
        SELECT
            b.id,
            tl.issue_id,
            b.ritual_id,
            tl.limbo_type,
            tl.requested_by_id,
            tl.requested_at,
            NULL,
            NULL
        FROM ticket_limbo_blockers b
        JOIN ticket_limbo tl ON tl.id = b.limbo_id
        WHERE b.id != tl.id AND tl.cleared_at IS NULL
    """)

    ctx.execute("DROP INDEX IF EXISTS uq_ticket_limbo_blocker")
    ctx.execute("DROP TABLE IF EXISTS ticket_limbo_blockers")
