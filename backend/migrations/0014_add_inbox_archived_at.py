"""Add inbox_entries.archived_at (CHT-1316).

Gives the inbox a real archive: an archived entry drops out of the inbox
list + unread count entirely (InboxService.list_for_user / unread_count
filter archived_at IS NULL), instead of the phase-1 hack of piggybacking
on read-state (where a refetch un-hid the "archived" item). Nullable, no
default -- existing rows stay non-archived.

Hand-written (like 0006-0013): makemigrations diffs against the replayed
chain and emits unrelated drift (old FK-naming artifacts, tables it
didn't create, plus a SQLite DROP-FOREIGN-KEY it can't execute), so only
the one intended column is applied here.

Created: 2026-07-12
"""

depends_on = "0013_templates"


def upgrade(ctx):
    """Apply migration."""
    # SQLite ADD COLUMN of a nullable column with no default is a cheap
    # metadata-only change; existing rows read back archived_at = NULL.
    ctx.execute("ALTER TABLE inbox_entries ADD COLUMN archived_at DATETIME")


def downgrade(ctx):
    """Revert migration. DROP COLUMN needs SQLite >= 3.35 (this codebase's
    floor, same as the RETURNING-based CAS paths)."""
    ctx.execute("ALTER TABLE inbox_entries DROP COLUMN archived_at")
