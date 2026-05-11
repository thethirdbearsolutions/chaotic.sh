"""Add UNIQUE indexes for the unified ritual+intent+limbo model.

The pre-refactor schema allowed duplicate attestation rows under
concurrency (the IntegrityError fallbacks in RitualService were dead
code) and had no exclusive lock on open intents. This migration adds:

* UNIQUE(ritual_id, issue_id) on ritual_attestations — partial because
  issue_id is nullable for sprint attestations.
* UNIQUE(ritual_id, sprint_id) on ritual_attestations — partial.
* UNIQUE(issue_id, limbo_type) on ticket_limbo WHERE cleared_at IS NULL
  — exclusive lock per (issue, intent-type) for open intents only.

Before the indexes can be added, any pre-existing duplicate rows must
be coalesced. The cleanup queries below keep the lowest-id row per
unique key and drop the rest. They are idempotent.

Created: 2026-04-26
"""

depends_on = "0003_cleanup_orphan_sprints_retry"


def upgrade(ctx):
    """Apply migration."""
    # 1. Coalesce duplicate attestations on (ritual_id, issue_id).
    ctx.execute("""
        DELETE FROM ritual_attestations
        WHERE issue_id IS NOT NULL
        AND id NOT IN (
            SELECT MIN(id) FROM ritual_attestations
            WHERE issue_id IS NOT NULL
            GROUP BY ritual_id, issue_id
        )
    """)

    # 2. Coalesce duplicate attestations on (ritual_id, sprint_id).
    ctx.execute("""
        DELETE FROM ritual_attestations
        WHERE sprint_id IS NOT NULL
        AND id NOT IN (
            SELECT MIN(id) FROM ritual_attestations
            WHERE sprint_id IS NOT NULL
            GROUP BY ritual_id, sprint_id
        )
    """)

    # 3. Coalesce duplicate open limbo rows on (issue_id, limbo_type).
    ctx.execute("""
        DELETE FROM ticket_limbo
        WHERE cleared_at IS NULL
        AND id NOT IN (
            SELECT MIN(id) FROM ticket_limbo
            WHERE cleared_at IS NULL
            GROUP BY issue_id, limbo_type
        )
    """)

    # 4. Add the constraints.
    ctx.execute("""
        CREATE UNIQUE INDEX IF NOT EXISTS uq_ritual_attestation_per_issue
        ON ritual_attestations (ritual_id, issue_id)
        WHERE issue_id IS NOT NULL
    """)
    ctx.execute("""
        CREATE UNIQUE INDEX IF NOT EXISTS uq_ritual_attestation_per_sprint
        ON ritual_attestations (ritual_id, sprint_id)
        WHERE sprint_id IS NOT NULL
    """)
    ctx.execute("""
        CREATE UNIQUE INDEX IF NOT EXISTS uq_ticket_limbo_open_intent
        ON ticket_limbo (issue_id, limbo_type)
        WHERE cleared_at IS NULL
    """)


def downgrade(ctx):
    """Revert migration."""
    ctx.execute("DROP INDEX IF EXISTS uq_ritual_attestation_per_issue")
    ctx.execute("DROP INDEX IF EXISTS uq_ritual_attestation_per_sprint")
    ctx.execute("DROP INDEX IF EXISTS uq_ticket_limbo_open_intent")
    # Coalesced rows cannot be restored.
