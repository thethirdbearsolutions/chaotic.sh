"""Add issue_description_revisions for auto-versioning issue descriptions.

Mirrors 0006_document_revisions but scoped to OxydeIssue.description.
A new row is appended every time an issue update changes its
description. Existing issues are backfilled with a v1 row using the
current description and creator/created_at as author/timestamp.

Issues without a description still get a v1 row with description=NULL
so the history view is uniform: "v1 was empty" is meaningful info.

Created: 2026-05-24
"""

depends_on = "0006_document_revisions"


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
    """Revert migration. History is unrecoverable post-downgrade."""
    ctx.execute("DROP INDEX IF EXISTS uq_issue_description_revisions_issue_version")
    ctx.execute("DROP TABLE IF EXISTS issue_description_revisions")
