"""Add UNIQUE(team_id, key) on projects and UNIQUE(team_id, name) on
labels (CHT-1223).

create_project does a check-then-act (get_by_key, then create) with no
DB-level backstop -- Project.key was only db_index=True, not unique, so
two concurrent or retried-after-timeout creates with the same
team_id+key both silently succeed. create_label has no duplicate check
at all. Both mirror the race create_relation was recently hardened
against (issue_service.py's create_relation IntegrityError catch).

Unlike 0006/0007 (which normalize legacy row *values* -- safe to blind
UPDATE), pre-existing duplicate project keys or label names cannot be
silently deleted or merged here: projects and labels are heavily
FK-referenced (issues, sprints, documents, rituals hang off project_id;
issue_labels/document_labels hang off label_id), so dropping a
"duplicate" row would orphan or cascade-delete real user data instead.

Any pre-existing duplicate (team_id, key) or (team_id, name) rows are
instead disambiguated in place -- every row after the first (by id) in
each colliding group gets its key/name suffixed with
`-dup-<id prefix>` so the unique index can be created without data
loss. This is a one-time, idempotent rename. If this fires against a
prod-like install (check row counts via the UPDATE's affected-row
count, or diff project/label listings before/after), an admin should
manually rename the affected project key(s) / label name(s) back to
something sane -- the suffix is a safety valve, not a good permanent
name.

Created: 2026-07-05
"""

depends_on = "0007_normalize_enum_storage"


def upgrade(ctx):
    """Apply migration."""
    # 1. Disambiguate any existing duplicate (team_id, key) project pairs,
    #    keeping the earliest-created (lowest id... not ordering-significant,
    #    just deterministic) row's key untouched.
    ctx.execute("""
        UPDATE projects
        SET key = key || '-dup-' || substr(id, 1, 8)
        WHERE id NOT IN (
            SELECT MIN(id) FROM projects GROUP BY team_id, key
        )
    """)

    # 2. Disambiguate any existing duplicate (team_id, name) label pairs.
    ctx.execute("""
        UPDATE labels
        SET name = name || '-dup-' || substr(id, 1, 8)
        WHERE id NOT IN (
            SELECT MIN(id) FROM labels GROUP BY team_id, name
        )
    """)

    # 3. Add the constraints (mirrors app.oxyde_models.project/label Meta.indexes).
    ctx.create_index("projects", {
        "name": "projects_team_id_key_idx",
        "fields": ["team_id", "key"],
        "unique": True,
        "method": None,
        "where": None,
    })
    ctx.create_index("labels", {
        "name": "labels_team_id_name_idx",
        "fields": ["team_id", "name"],
        "unique": True,
        "method": None,
        "where": None,
    })


def downgrade(ctx):
    """Revert migration."""
    ctx.drop_index("projects", "projects_team_id_key_idx")
    ctx.drop_index("labels", "labels_team_id_name_idx")
    # Suffix-renamed rows are not restored to their original (colliding)
    # key/name -- that collision is exactly what this migration exists
    # to prevent from recurring.
