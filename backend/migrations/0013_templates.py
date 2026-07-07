"""Create templates table (CHT-1259).

A Template is a named, portable snapshot of (rituals + project settings)
for a team -- ``chaotic template create <name> --from-project <key>`` and
``chaotic template apply <name>``. ``body`` holds the JSON document
(``{"version": 1, "sections": {"rituals": [...], "settings": {...}}}``)
as a plain string, same str-JSON pattern as ``rituals.conditions``
(migration 0001) -- Oxyde has no native JSON column type.

Hand-written like 0006-0012 (makemigrations diffs against the replayed
chain and emits unrelated drift -- old FK-naming artifacts, tables it
didn't itself create), and rehearsed against a fresh 0001->0013 chain
apply plus an apply against a backup copy of a real install's DB.

Created: 2026-07-06
"""

depends_on = "0012_inbox_entries"


def upgrade(ctx):
    """Apply migration."""
    ctx.execute("""
        CREATE TABLE IF NOT EXISTS templates (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            team_id VARCHAR(36) NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
            name VARCHAR(100) NOT NULL,
            description VARCHAR(1000),
            body TEXT NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL
        )
    """)
    # Unique per-team (not globally) -- same shape as projects_team_id_key_idx
    # and labels_team_id_name_idx (migration 0008). TemplateService.create()
    # catches the resulting IntegrityError on a lost create-create race.
    ctx.execute("""
        CREATE UNIQUE INDEX IF NOT EXISTS templates_team_id_name_idx
        ON templates (team_id, name)
    """)


def downgrade(ctx):
    """Revert migration.

    Drops the table outright. Saved templates are unrecoverable
    post-downgrade -- restore from a pre-0013 backup if you need them.
    Rituals/projects a template was previously applied to are untouched;
    templates only ever *write* rituals/settings, they don't reference
    them, so there's nothing else to unwind.
    """
    ctx.execute("DROP INDEX IF EXISTS templates_team_id_name_idx")
    ctx.execute("DROP TABLE IF EXISTS templates")
