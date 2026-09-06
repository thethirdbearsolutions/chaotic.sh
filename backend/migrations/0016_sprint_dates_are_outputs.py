"""Rename sprints.start_date/end_date to activated_at/closed_at (CHT-1366).

A Chaotic sprint is not time-boxed: it begins when the previous one closes
and ends when its point budget is spent, so it has no scheduled start or
end. The old columns were inputs nobody set (one sprint in 95 had them),
and `chaotic sprint list` rendered them as Start/End columns full of "-",
teaching every new reader that sprints are calendar periods with the
dates left blank. They are now outputs: SprintService stamps activated_at
on activation and closed_at on the close that rotates, so "how long did
that sprint take" is a derived fact rather than a plan.

The one row that carried planned dates is cleared rather than carried
over: a scheduled date is not an activation date, and keeping it under
the new name would be the exact confusion this removes. Historical
sprints therefore read NULL; only sprints activated/closed after this
migration have values.

Wire-visible: SprintResponse gains activated_at/closed_at and loses
start_date/end_date; SprintCreate/SprintUpdate no longer accept dates
(unknown fields are ignored by pydantic, so an old client is not
rejected, its dates are just not stored).

Hand-written (like 0006-0015). RENAME COLUMN needs SQLite >= 3.25.

Created: 2026-09-06
"""

depends_on = "0015_drop_sprint_token_budget"


def upgrade(ctx):
    """Apply migration."""
    ctx.execute("ALTER TABLE sprints RENAME COLUMN start_date TO activated_at")
    ctx.execute("ALTER TABLE sprints RENAME COLUMN end_date TO closed_at")
    ctx.execute("UPDATE sprints SET activated_at = NULL, closed_at = NULL")


def downgrade(ctx):
    """Revert migration (values recorded since are dropped: they were
    never planned dates)."""
    ctx.execute("UPDATE sprints SET activated_at = NULL, closed_at = NULL")
    ctx.execute("ALTER TABLE sprints RENAME COLUMN activated_at TO start_date")
    ctx.execute("ALTER TABLE sprints RENAME COLUMN closed_at TO end_date")
