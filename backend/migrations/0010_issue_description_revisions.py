"""Add issue_description_revisions for auto-versioning issue descriptions (CHT-1243).

Mirrors 0009_document_revisions but scoped to OxydeIssue.description.
A new row is appended every time an issue update changes its
description. Existing issues are backfilled with a v1 row using the
current description and creator/created_at as author/timestamp.

Issues without a description still get a v1 row with description=NULL
so the history view is uniform: "v1 was empty" is meaningful info.

We scope revisions to the description field specifically because the
issue activity table already tracks deltas for other fields (status,
priority, assignee, ...) with old/new values, and those are short
single-valued atoms — not the long, refinement-prone bodies that
benefit from full snapshot history.

Hand-written like 0006-0009 and rehearsed against a copy of a real
install's DB before landing.

Created: 2026-07-06
"""

depends_on = "0009_document_revisions"


def upgrade(ctx):
    """Apply migration."""
    ctx.execute("""
        CREATE TABLE IF NOT EXISTS issue_description_revisions (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            issue_id VARCHAR(36) NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
            version INTEGER NOT NULL,
            description TEXT,
            author_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
            created_at DATETIME NOT NULL
        )
    """)
    # (Mirrors app.oxyde_models.issue.OxydeIssueDescriptionRevision Meta.indexes.)
    ctx.execute("""
        CREATE UNIQUE INDEX IF NOT EXISTS uq_issue_description_revisions_issue_version
        ON issue_description_revisions (issue_id, version)
    """)

    # Backfill v1 per existing issue. creator_id is the author proxy
    # for the initial state — we don't have per-field authorship in
    # historical activity rows, and the creator wrote the original
    # description by definition.
    ctx.execute("""
        INSERT INTO issue_description_revisions (id, issue_id, version, description, author_id, created_at)
        SELECT
            lower(hex(randomblob(16))),
            id,
            1,
            description,
            creator_id,
            created_at
        FROM issues
        WHERE NOT EXISTS (
            SELECT 1 FROM issue_description_revisions r WHERE r.issue_id = issues.id
        )
    """)


def downgrade(ctx):
    """Revert migration. History is unrecoverable post-downgrade —
    restore from a pre-0010 backup if you need the snapshots."""
    ctx.execute("DROP INDEX IF EXISTS uq_issue_description_revisions_issue_version")
    ctx.execute("DROP TABLE IF EXISTS issue_description_revisions")
