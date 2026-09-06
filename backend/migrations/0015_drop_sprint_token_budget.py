"""Drop sprints.token_budget and sprints.tokens_spent (CHT-1372).

The two columns (and the model's token_in_arrears / remaining_token_budget
properties, and the token_budget / tokens_spent fields on SprintCreate,
SprintUpdate and SprintResponse) shipped with the sprint model but nothing
ever wrote tokens_spent: no service incremented it, no transaction recorded
it, and neither the CLI nor the frontend read either field. Every sprint on
the wire carried two dead fields that read like a feature. The points
budget is the one budget dimension this product enforces (CLAUDE.md,
"Sprint & Budget Model"); a second one nobody populates is noise on every
`sprint_current` result. Removed rather than implemented.

Wire-visible: `SprintResponse` no longer carries `token_budget` /
`tokens_spent`, and `SprintCreate` / `SprintUpdate` no longer accept
`token_budget` (pydantic ignores unknown fields, so an old client sending
it is not rejected, just no longer stored).

Hand-written (like 0006-0014): makemigrations diffs against the replayed
chain and emits unrelated drift, so only the two intended columns are
touched here. DROP COLUMN needs SQLite >= 3.35, this codebase's floor.

Created: 2026-09-06
"""

depends_on = "0014_add_inbox_archived_at"


def upgrade(ctx):
    """Apply migration."""
    ctx.execute("ALTER TABLE sprints DROP COLUMN token_budget")
    ctx.execute("ALTER TABLE sprints DROP COLUMN tokens_spent")


def downgrade(ctx):
    """Revert migration: the columns come back empty (NULL / 0), which is
    all they ever held."""
    ctx.execute("ALTER TABLE sprints ADD COLUMN token_budget INTEGER")
    ctx.execute("ALTER TABLE sprints ADD COLUMN tokens_spent INTEGER NOT NULL DEFAULT 0")
