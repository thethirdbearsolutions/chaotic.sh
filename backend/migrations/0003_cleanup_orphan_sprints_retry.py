"""Re-run orphan sprint cleanup (CHT-1070).

Migration 0002 was fake-applied on servers where the blanket
``oxyde migrate --fake`` fallback marked ALL migrations as done.
This migration re-runs the same cleanup so it actually executes.

The queries are idempotent — safe to run even if 0002 was applied.

Created: 2026-02-22
"""

depends_on = "0002_cleanup_orphan_sprints"


def upgrade(ctx):
    """Apply migration."""
    # Delete duplicate ACTIVE sprints with no issues, keeping only the
    # oldest ACTIVE sprint per project (the legitimate one)
    ctx.execute("""
        DELETE FROM sprints
        WHERE status = 'ACTIVE'
        AND id NOT IN (SELECT DISTINCT sprint_id FROM issues WHERE sprint_id IS NOT NULL)
        AND id NOT IN (
            SELECT MIN(id) FROM sprints
            WHERE status = 'ACTIVE'
            GROUP BY project_id
        )
    """)

    # Delete extra PLANNED sprints with no issues, keeping only the
    # oldest PLANNED sprint per project
    ctx.execute("""
        DELETE FROM sprints
        WHERE status = 'PLANNED'
        AND id NOT IN (SELECT DISTINCT sprint_id FROM issues WHERE sprint_id IS NOT NULL)
        AND id NOT IN (
            SELECT MIN(id) FROM sprints
            WHERE status = 'PLANNED'
            GROUP BY project_id
        )
    """)


def downgrade(ctx):
    """Revert migration."""
    # Deleted orphan sprints cannot be restored
    pass
