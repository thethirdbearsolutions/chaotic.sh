"""Add nullable issues.lease_expires_at (CHT-1246).

Claim leases: `issue start`/`claim` (and any equivalent self-claim PATCH
-- assignee_id set to the acting principal, status -> IN_PROGRESS)
stamps this column with an expiry so a crashed agent doesn't wedge a
ticket in IN_PROGRESS forever. NULL means "not leased" (never claimed,
or claimed via a path that doesn't grant a lease -- see
IssueService.update()). Lazily checked and auto-released -- no cron --
by IssueService.release_expired_leases(), called from the ready-query
and issue-read paths (mirrors RitualService's orphaned-ticket-limbo
lazy cleanup).

Hand-written rather than trusting `oxyde makemigrations`' auto-diff:
this repo's migration history has several tables (`ticket_limbo_blockers`,
`document_issues`) and foreign keys created via raw `ctx.execute()` SQL
in 0001/0005, which the structured create_table/add_foreign_key replay
state doesn't track -- `makemigrations` after this model change proposed
re-creating those tables and churning ~20 unrelated foreign keys as
"drift". That's a pre-existing artifact of raw-SQL migrations being
opaque to the diff engine, not anything caused by this change; the only
real difference between the current model and the last-applied schema
is the one new column below, added by hand instead, same as 0006/0007/
0008's raw-SQL approach.

Plain nullable column, no backfill needed -- every existing row's
correct value is NULL (not currently leased). Rehearsed against a copy
of a real ~/.chaotic/data/chaotic.db backup (`oxyde migrate` with
DATABASE_URL pointed at the copy) before landing.

Created: 2026-07-06
"""

depends_on = "0008_unique_project_key_label_name"


def upgrade(ctx):
    """Apply migration."""
    # TEXT, not TIMESTAMP: issues' other DateTimeUTC columns (created_at,
    # due_date, completed_at, updated_at) were declared via the structured
    # create_table field-dict (python_type='datetime' -> SQL type TEXT) in
    # 0001_initial -- match that storage class exactly rather than
    # relying on SQLite's NUMERIC-affinity fallback for a bare TIMESTAMP
    # declaration.
    ctx.execute("ALTER TABLE issues ADD COLUMN lease_expires_at TEXT")


def downgrade(ctx):
    """Revert migration."""
    ctx.drop_column("issues", "lease_expires_at")
