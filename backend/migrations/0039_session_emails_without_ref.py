"""Session identities' addresses stop carrying their external_ref (CHT-1864).

Until CHT-1864 RegistrationService made a session identity's address
``session-<slug>-<12 hex>@agent.local``, where the slug was the
lowercased last 24 characters of its ``external_ref``. The ref is shown
only to the identity, its holder and its team's admins
(``sees_external_ref``), but the address went to every reader of the
issue and document activity feeds, so the slug leaked the ref (about 76
of a ``claude-code:session:<uuid>`` ref's 122 random bits). New
identities now get ``session-<32 hex>@agent.local``
(``registration_service.session_email``); this rewrites the existing
ones to that form.

Data only: no schema changes, so nothing is recorded and the replay
(collect mode) does nothing. Two UPDATEs through ctx.execute:

  * every session identity (``kind`` SESSION) whose address is in the
    old ``session-…@agent.local`` form gets a new one from
    ``randomblob(16)``, 128 random bits per row, so the UNIQUE indexes
    on ``email`` and ``email_folded`` cannot meet a collision in
    practice; if one ever did, the migration fails as a whole
    (migrations run in a transaction) and nothing is written;
  * those rows' ``email_folded`` is set to the new address, which is
    already its fold (lowercase ASCII, no whitespace).

Nothing looks a session identity up by its address: registration finds
it by ``(agent_team_id, external_ref)``, and it has no password, so no
login uses the address. A session identity whose address is not in the
old form (made by hand) is left alone.

The downgrade does nothing: the old addresses are not kept, and the
code before this migration works with the new ones (it never parsed an
address).

Created: 2026-10-15 23:30:00
"""

depends_on = "0038_team_activities"

# Session identities in the address form that carried the ref. `kind`
# is stored as the enum's name (CLAUDE.md, "Enum Representation").
OLD_FORM = "kind = 'SESSION' AND email LIKE 'session-%@agent.local'"

REWRITE_EMAIL_SQL = (
    "UPDATE users SET email = 'session-' || lower(hex(randomblob(16))) || '@agent.local' "
    f"WHERE {OLD_FORM}"
)

# After the rewrite every such row still matches OLD_FORM; its fold is
# the address itself.
REFOLD_SQL = f"UPDATE users SET email_folded = email WHERE {OLD_FORM}"


def _recording(ctx) -> bool:
    """True in the replay (collect mode); see 0017."""
    return getattr(ctx, "_mode", "execute") == "collect"


def upgrade(ctx):
    """Apply migration."""
    if _recording(ctx):
        return
    ctx.execute(REWRITE_EMAIL_SQL)
    ctx.execute(REFOLD_SQL)


def downgrade(ctx):
    """Revert migration: nothing to undo (see the docstring)."""
