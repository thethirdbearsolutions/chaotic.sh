"""Manual migration: clean up orphan sprints (CHT-1065).

Delete PLANNED and ACTIVE sprints that have no issues assigned and are
duplicates (same project has a COMPLETED sprint with the same name).
Also remove extra PLANNED sprints so each project has at most one.

Created: 2026-02-22
"""

depends_on = "0001_initial"


def upgrade(ctx):
    """Apply migration."""
    # Delete orphaned sprints that have no issues and are duplicates
    # of completed sprints with the same name in the same project
    ctx.execute("""
        DELETE FROM sprints
        WHERE status IN ('ACTIVE', 'PLANNED')
        AND id NOT IN (SELECT DISTINCT sprint_id FROM issues WHERE sprint_id IS NOT NULL)
        AND EXISTS (
            SELECT 1 FROM sprints s2
            WHERE s2.project_id = sprints.project_id
            AND s2.name = sprints.name
            AND s2.status = 'COMPLETED'
            AND s2.id != sprints.id
        )
    """)

    # Also delete PLANNED sprints with no issues that are beyond the
    # earliest PLANNED sprint per project (keep only one PLANNED per project)
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
    # Cannot restore deleted sprints in downgrade
    pass
