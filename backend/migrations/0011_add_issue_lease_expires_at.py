"""Add nullable issues.lease_expires_at (CHT-1246).

Claim leases: `issue start`/`claim` (and any equivalent self-claim PATCH
-- assignee_id set to the acting principal, status -> IN_PROGRESS)
stamps this column with an expiry so a crashed agent doesn't wedge a
ticket in IN_PROGRESS forever. NULL means "not leased" (never claimed,
or claimed via a path that doesn't grant a lease -- see
IssueService.update()). Lazily checked and auto-released -- no cron --
by IssueService.release_expired_leases(), called from the ready-query,
issue-read, and team-activity-feed paths (mirrors RitualService's
orphaned-ticket-limbo lazy cleanup).

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
of a real chaotic.db backup (`oxyde migrate` with DATABASE_URL pointed
at the copy) plus a from-scratch full-chain apply before landing;
re-rehearsed after renumbering 0009 -> 0011 (PR #216 took 0009/0010).

Also adds a partial index on the lease column: the lazy-release sweep
(PR #217 review finding 2) runs on every team activity-feed read, so
its scan predicate (status = IN_PROGRESS, lease_expires_at non-null and
past) must stay cheap even on large issue tables. Partial (non-null
only) because at any moment only actively-leased issues -- a handful --
carry a value; the index stays tiny regardless of total issue count.

Created: 2026-07-06
"""

depends_on = "0010_issue_description_revisions"


def upgrade(ctx):
    """Apply migration."""
    # TEXT, not TIMESTAMP: issues' other DateTimeUTC columns (created_at,
    # due_date, completed_at, updated_at) were declared via the structured
    # create_table field-dict (python_type='datetime' -> SQL type TEXT) in
    # 0001_initial -- match that storage class exactly rather than
    # relying on SQLite's NUMERIC-affinity fallback for a bare TIMESTAMP
    # declaration.
    ctx.execute("ALTER TABLE issues ADD COLUMN lease_expires_at TEXT")
    ctx.execute(
        "CREATE INDEX IF NOT EXISTS ix_issues_lease_expires_at "
        "ON issues (lease_expires_at) WHERE lease_expires_at IS NOT NULL"
    )


def downgrade(ctx):
    """Revert migration."""
    ctx.execute("DROP INDEX IF EXISTS ix_issues_lease_expires_at")
    ctx.drop_column("issues", "lease_expires_at")
