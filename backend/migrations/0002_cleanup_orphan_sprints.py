"""Manual migration: clean up orphan sprints (CHT-1065).

Delete duplicate ACTIVE sprints (projects should have at most one) and
extra PLANNED sprints (projects should have at most one) that have no
issues assigned. Keeps the oldest of each per project.

Created: 2026-02-22
"""

depends_on = "0001_initial"


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
