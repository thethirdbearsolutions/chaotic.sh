"""Sprints already in limbo get their sprint ritual inbox entries (CHT-2032).

Data only, through ctx.execute; no schema change, so nothing for the
replay to record. SPRINT_RITUAL is a new value of a column stored as
text, which needs no schema change either.

From now on a sprint entering limbo writes a SPRINT_RITUAL entry to each
team admin for every pending sprint ritual an admin can act on: a GATE,
or a REVIEW whose attestation awaits approval (attesting a REVIEW during
limbo writes it then). The Approvals tab that used to list these is
gone, so a sprint already in limbo when this ships would have no entry
anywhere. This writes the entries such a sprint would have got, the way
InboxService.notify_sprint_ritual does, for:

- an active, ungrouped EVERY_SPRINT GATE ritual of the project with no
  approved attestation for the sprint (an unapproved one is a review
  attested before the ritual became a gate, which signing off approves). A grouped one is left out: which member
  of a group a sprint selected is decided in Python
  (RitualService._select), and an entry for one it did not select
  would ask for something nothing waits on;
- an active EVERY_SPRINT REVIEW ritual with an unapproved attestation
  for the sprint (attested, so selected), with the note as the body and
  the attester as the source.

No admin who already holds an open SPRINT_RITUAL entry for the ritual
gets a second one. Entries are created read as unread, with created_at
and updated_at now, so a syncing device picks them up.

The downgrade deletes the SPRINT_RITUAL entries, which an older server
does not know how to read.

Created: 2026-11-05 16:30:00
"""

depends_on = "0048_review_entry_body_is_the_attestation"


# Stored datetime format (0040).
_NOW = "strftime('%Y-%m-%d %H:%M:%f', 'now') || '000'"

# A version-4 UUID's shape, as uuid.uuid4() writes it.
_UUID = (
    "lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || "
    "substr(lower(hex(randomblob(2))), 2) || '-' || "
    "substr('89ab', 1 + (abs(random()) % 4), 1) || substr(lower(hex(randomblob(2))), 2) || '-' || "
    "lower(hex(randomblob(6)))"
)

# TRIM with every whitespace character str.strip() removes (0048).
_WS = "' ' || char(9) || char(10) || char(11) || char(12) || char(13)"

_ADMINS = (
    "JOIN projects p ON p.id = s.project_id "
    "JOIN team_members m ON m.team_id = p.team_id AND m.role IN ('OWNER', 'ADMIN') "
)

_NOT_ALREADY = (
    "AND NOT EXISTS (SELECT 1 FROM inbox_entries e WHERE e.recipient_user_id = m.user_id "
    "AND e.kind = 'SPRINT_RITUAL' AND e.ritual_id = r.id AND e.resolved_at IS NULL)"
)

_COLUMNS = (
    "INSERT INTO inbox_entries (id, recipient_user_id, kind, team_id, project_id, ritual_id, "
    "source_user_id, title, body, created_at, updated_at) "
)


def upgrade(ctx):
    """Apply migration."""
    # Enums are stored by name.
    ctx.execute(
        _COLUMNS
        + f"SELECT {_UUID}, m.user_id, 'SPRINT_RITUAL', p.team_id, p.id, r.id, NULL, "
        "'Sign-off needed: ' || r.name || ' for ' || s.name, r.prompt, "
        f"{_NOW}, {_NOW} "
        "FROM sprints s "
        "JOIN rituals r ON r.project_id = s.project_id "
        + _ADMINS
        + "WHERE s.limbo = 1 AND r.is_active = 1 AND r.trigger = 'EVERY_SPRINT' "
        "AND r.approval_mode = 'GATE' AND r.group_id IS NULL "
        "AND NOT EXISTS (SELECT 1 FROM ritual_attestations a WHERE a.ritual_id = r.id AND a.sprint_id = s.id AND a.approved_at IS NOT NULL) "
        + _NOT_ALREADY
    )
    ctx.execute(
        _COLUMNS
        + f"SELECT {_UUID}, m.user_id, 'SPRINT_RITUAL', p.team_id, p.id, r.id, a.attested_by, "
        "'Review requested: ' || r.name || ' for ' || s.name, "
        f"NULLIF(TRIM(a.note, {_WS}), ''), {_NOW}, {_NOW} "
        "FROM sprints s "
        "JOIN rituals r ON r.project_id = s.project_id "
        "JOIN ritual_attestations a ON a.ritual_id = r.id AND a.sprint_id = s.id AND a.approved_at IS NULL "
        + _ADMINS
        + "WHERE s.limbo = 1 AND r.is_active = 1 AND r.trigger = 'EVERY_SPRINT' "
        "AND r.approval_mode = 'REVIEW' "
        + _NOT_ALREADY
    )


def downgrade(ctx):
    """Revert migration: an older server cannot read the new kind."""
    ctx.execute("DELETE FROM inbox_entries WHERE kind = 'SPRINT_RITUAL'")
