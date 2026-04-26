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

Data migration:
  1. Create the new `ticket_limbo_blockers` table.
  2. For each existing `ticket_limbo` row, insert a corresponding
     blocker under the EARLIEST row in its `(issue_id, limbo_type)`
     group. The historical `cleared_at`/`cleared_by_id` becomes the
     blocker's `resolved_at`/`resolved_by_id` so audit history
     survives.
  3. Delete redundant `ticket_limbo` rows (keep only the earliest
     per group). The earliest row's `cleared_at` is already the
     "intent cleared at" — preserved.
  4. Drop the `ritual_id` column from `ticket_limbo`.

Multi-row historical groups collapse to one intent row with multiple
blockers. Lossy in the sense that intents from different times for
the same `(issue, type)` are folded together, but acceptable for a
one-time transformation — historical fidelity at the blocker level
is preserved via blocker rows.

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

    # 2. Migrate each existing limbo row to a blocker under the
    #    canonical (earliest) intent row for its (issue, type) group.
    ctx.execute("""
        INSERT OR IGNORE INTO ticket_limbo_blockers
            (id, limbo_id, ritual_id, resolved_at, resolved_by_id)
        SELECT
            src.id,
            (SELECT MIN(tl.id) FROM ticket_limbo tl
             WHERE tl.issue_id = src.issue_id
               AND tl.limbo_type = src.limbo_type),
            src.ritual_id,
            src.cleared_at,
            src.cleared_by_id
        FROM ticket_limbo src
    """)

    # 3. Delete redundant rows; keep only the earliest per group.
    ctx.execute("""
        DELETE FROM ticket_limbo
        WHERE id NOT IN (
            SELECT MIN(id) FROM ticket_limbo
            GROUP BY issue_id, limbo_type
        )
    """)

    # 4. Drop the ritual_id column. SQLite 3.35+ supports DROP COLUMN
    #    natively.
    ctx.execute("ALTER TABLE ticket_limbo DROP COLUMN ritual_id")


def downgrade(ctx):
    """Revert migration.

    Lossy: the original per-(issue, type) row count cannot be restored
    because we collapsed groups into one canonical row. The blockers
    table preserves the per-ritual data, so a rollback re-fans into
    `ticket_limbo` rows by joining back through the blockers.
    """
    # 1. Re-add the ritual_id column.
    ctx.execute("ALTER TABLE ticket_limbo ADD COLUMN ritual_id VARCHAR(36) REFERENCES rituals(id) ON DELETE CASCADE")

    # 2. Re-fan: each blocker becomes a ticket_limbo row.
    #    The canonical intent row gets one of its blockers' ritual_id;
    #    extra rows are inserted with the same issue_id/limbo_type/
    #    requested_by_id/requested_at as the canonical row.
    ctx.execute("""
        UPDATE ticket_limbo
        SET ritual_id = (
            SELECT b.ritual_id FROM ticket_limbo_blockers b
            WHERE b.limbo_id = ticket_limbo.id
            ORDER BY b.id LIMIT 1
        )
        WHERE id IN (
            SELECT DISTINCT limbo_id FROM ticket_limbo_blockers
        )
    """)
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
            b.resolved_at,
            b.resolved_by_id
        FROM ticket_limbo_blockers b
        JOIN ticket_limbo tl ON tl.id = b.limbo_id
        WHERE b.id != tl.id
    """)

    # 3. Drop the blockers table.
    ctx.execute("DROP INDEX IF EXISTS uq_ticket_limbo_blocker")
    ctx.execute("DROP TABLE IF EXISTS ticket_limbo_blockers")
