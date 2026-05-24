"""Add document_revisions table for auto-versioning document content.

Every time a document's title or content changes, the service layer
appends an immutable snapshot row here. Version numbers monotonically
increase per document; v1 is the row written at document creation.

Existing documents are backfilled with a v1 row whose author is the
document's author and whose timestamp is the document's `created_at`,
so the history view never shows a doc with zero revisions.

Created: 2026-05-24
"""

depends_on = "0005_ticket_limbo_intent_blockers"


def upgrade(ctx):
    """Apply migration."""
    ctx.execute("""
        CREATE TABLE IF NOT EXISTS document_revisions (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            document_id VARCHAR(36) NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
            version INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT,
            author_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
            created_at DATETIME NOT NULL
        )
    """)
    # One snapshot per (document, version). Listing by document is the
    # hot path so a covering composite index on (document_id, version)
    # serves both the uniqueness constraint and ORDER BY version DESC.
    ctx.execute("""
        CREATE UNIQUE INDEX IF NOT EXISTS uq_document_revisions_doc_version
        ON document_revisions (document_id, version)
    """)

    # Backfill a v1 revision per existing document so the UI never sees
    # a document with empty history. lower(hex(randomblob(16))) gives a
    # 32-char hex id — close enough to a UUID-shaped string for our
    # opaque-id convention without needing an extension.
    ctx.execute("""
        INSERT INTO document_revisions (id, document_id, version, title, content, author_id, created_at)
        SELECT
            lower(hex(randomblob(16))),
            id,
            1,
            title,
            content,
            author_id,
            created_at
        FROM documents
        WHERE NOT EXISTS (
            SELECT 1 FROM document_revisions r WHERE r.document_id = documents.id
        )
    """)


def downgrade(ctx):
    """Revert migration.

    Drops the table outright. History is unrecoverable post-downgrade —
    restore from a pre-0006 backup if you need the snapshots.
    """
    ctx.execute("DROP INDEX IF EXISTS uq_document_revisions_doc_version")
    ctx.execute("DROP TABLE IF EXISTS document_revisions")
