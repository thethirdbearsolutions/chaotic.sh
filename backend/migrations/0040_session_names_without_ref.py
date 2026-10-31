"""Session identities' default names stop ending in a piece of their ref (CHT-1869).

A session identity's name, and the ``<first word>-<tail>`` mention
handle made from its last ``" · "`` part (``mention_handles``), are
shown to every teammate, but its ``external_ref`` only to the identity,
its holder and its team's admins (``sees_external_ref``). Until CHT-1869
two default names ended in a piece of the ref:

  * the server's, ``<registrar> · <last 8 characters of the ref>``
    (``RegistrationService``, when the registrar sent no name);
  * the CLI's, ``<registrar> · <branch> · <first 6 characters of the
    session id>`` for a ``claude-code:session:<id>`` ref.

New identities now get a random tail in both
(``registration_service._new_name``, ``cli.session_identity.default_name``),
and the server replaces an older CLI's ref tail on create. This gives the
existing ones a random tail of the same length: 8 hex from
``randomblob(4)`` for the first form, 6 from ``randomblob(3)`` for the
second. Only the tail changes; the rest of the name is kept.

A row is renamed only when it is a session identity (``kind`` SESSION,
stored as the enum's name) and its name ends in ``" · "`` followed by
exactly that piece of its *own* ref, compared case-sensitively as the
code wrote it. A name chosen by hand is left alone unless it kept that
exact tail. The part before the tail is not compared with anything:
the registrar may have been renamed since, and the CLI's branch part
cannot be derived at all.

Handles: the new ``<first word>-<tail>`` is unique by chance only (2^-32
or 2^-24 per pair). Two identities that draw the same tail share that
handle, so it reaches neither (CHT-1502: an ambiguous handle reaches
nobody) and each shows its next unique candidate (its whole name, else
its id handle). A person whose handle it equals is in the same spot: the
handle names both, so it reaches neither, and the person shows their next
candidate. A new registration redraws on such a clash (rule 8); this
migration cannot, and the odds do not warrant it.

Data only: no schema changes, so nothing is recorded and the replay
(collect mode) does nothing, as in 0039. The downgrade does nothing:
the old tails are not kept (keeping them would keep the leak), and the
code before this migration works with any name.

Created: 2026-10-31 12:00:00
"""

depends_on = "0039_session_emails_without_ref"

_SEP = " · "


def _rename(tail: str, random_bytes: int) -> str:
    """Replace the last ``" · <tail>"`` of a session identity's name,
    where `tail` (an SQL expression over the row) is cut from its ref."""
    suffix = f"'{_SEP}' || {tail}"
    return (
        f"UPDATE users SET name = substr(name, 1, length(name) - length({tail})) "
        f"|| lower(hex(randomblob({random_bytes}))) "
        "WHERE kind = 'SESSION' AND external_ref IS NOT NULL AND name IS NOT NULL "
        f"AND length({tail}) > 0 "
        f"AND length(name) >= length({suffix}) "
        f"AND substr(name, -length({suffix})) = {suffix}"
    )


# The server's default: the ref's last 8 characters (Python's ref[-8:],
# the whole ref when shorter).
SERVER_TAIL = "substr(external_ref, -min(8, length(external_ref)))"
RENAME_SERVER_DEFAULT_SQL = _rename(SERVER_TAIL, 4)

# The CLI's default: the first 6 characters of the session id, for a ref
# made by the CLI (cli/src/cli/session_identity.py REF_PREFIX). `substr`
# compares exactly, where LIKE would ignore case.
CLI_PREFIX = "claude-code:session:"
CLI_TAIL = (
    f"(CASE WHEN substr(external_ref, 1, {len(CLI_PREFIX)}) = '{CLI_PREFIX}' "
    f"THEN substr(external_ref, {len(CLI_PREFIX) + 1}, 6) ELSE '' END)"
)
RENAME_CLI_DEFAULT_SQL = _rename(CLI_TAIL, 3)


def _recording(ctx) -> bool:
    """True in the replay (collect mode); see 0017."""
    return getattr(ctx, "_mode", "execute") == "collect"


def upgrade(ctx):
    """Apply migration."""
    if _recording(ctx):
        return
    # Neither form's new tail can match the other's pattern: a ref never
    # contains " · ", so " · " plus 6 characters cannot end inside 8 new
    # hex, and the reverse needs the ref's own characters.
    ctx.execute(RENAME_SERVER_DEFAULT_SQL)
    ctx.execute(RENAME_CLI_DEFAULT_SQL)


def downgrade(ctx):
    """Revert migration: nothing to undo (see the docstring)."""
