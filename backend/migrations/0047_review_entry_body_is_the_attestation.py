"""Open review-requested inbox entries show the attestation (CHT-2031).

Data only, through ctx.execute; no schema change, so nothing for the
replay to record.

A REVIEW_REQUESTED entry's body used to be the ritual's prompt, which
the admin deciding already knows; it is now the attestation's note,
what they are deciding on (InboxService.notify_review_requested). This
rewrites the entries still open (not resolved, not archived) to match:
the note of the ritual's attestation on the entry's issue, or NULL when
that attestation has no note or no longer exists, and the attester as
the entry's source_user_id (shown as who it came from) where that is
still unset. Each changed entry's
updated_at moves, so the sync scan (CHT-1607) hands the new body to
devices. Resolved and archived entries keep what they said.

The downgrade does nothing: the old bodies are the ritual prompts, still
on the rituals, and nothing reads them from the entry.

Created: 2026-11-05 11:50:00
"""

depends_on = "0046_user_avatars"


# Stored datetime format (0040).
_NOW = "strftime('%Y-%m-%d %H:%M:%f', 'now') || '000'"

_ATTESTER = (
    "(SELECT a.attested_by FROM ritual_attestations a "
    "WHERE a.ritual_id = inbox_entries.ritual_id AND a.issue_id = inbox_entries.issue_id)"
)

_NOTE = (
    "(SELECT NULLIF(TRIM(a.note), '') FROM ritual_attestations a "
    "WHERE a.ritual_id = inbox_entries.ritual_id AND a.issue_id = inbox_entries.issue_id)"
)


def upgrade(ctx):
    """Apply migration."""
    # Data, not schema, so the replay ignores it. Enums are stored by name.
    ctx.execute(
        f"UPDATE inbox_entries SET body = {_NOTE}, "
        f"source_user_id = COALESCE(source_user_id, {_ATTESTER}), updated_at = {_NOW} "
        "WHERE kind = 'REVIEW_REQUESTED' AND resolved_at IS NULL AND archived_at IS NULL "
        f"AND (body IS NOT {_NOTE} OR (source_user_id IS NULL AND {_ATTESTER} IS NOT NULL))"
    )


def downgrade(ctx):
    """Revert migration: nothing to undo."""
