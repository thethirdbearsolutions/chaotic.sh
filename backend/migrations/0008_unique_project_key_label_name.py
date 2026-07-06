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
loss. This is a one-time, idempotent rename, and it is LOUD: each
planned rename prints one line to stdout (visible in `oxyde migrate` /
`chaotic system upgrade` output) identifying the table, row id, and
old -> new value, so an operator knows exactly which rows to revisit.
The suffix is a safety valve, not a good permanent name -- rename the
affected project key(s) / label name(s) to something sane afterward.

(Reporting caveat: the per-row lines come from a read-only pre-scan of
the SQLite file before the batched UPDATE executes. Migration
execution is transactional, so if the migration fails after printing,
nothing was renamed -- the failure itself is the louder signal. On
non-SQLite dialects or when the DB file isn't directly readable, the
scan is skipped and a one-line notice prints instead; the renames
still happen either way.)

Created: 2026-07-05
"""

depends_on = "0007_normalize_enum_storage"

# (table, unique-scoped column) pairs this migration disambiguates + constrains.
DEDUPE_TARGETS = [
    ("projects", "key"),
    ("labels", "name"),
]


def _planned_renames(conn, table, column):
    """Return [(row_id, old_value, new_value)] for every row the dedupe
    UPDATE in upgrade() will rename: rows that are not the MIN(id) of
    their (team_id, column) group. `conn` is any DB-API connection over
    the pre-migration data (sqlite3 in practice)."""
    rows = conn.execute(
        f'SELECT id, "{column}" FROM "{table}" '
        f'WHERE id NOT IN (SELECT MIN(id) FROM "{table}" GROUP BY team_id, "{column}")'
    ).fetchall()
    return [(row_id, value, f"{value}-dup-{row_id[:8]}") for row_id, value in rows]


def _open_readonly_sqlite(ctx):
    """Best-effort read-only sqlite3 connection to the migration target DB.

    Returns None when the target isn't a directly-readable SQLite file
    (non-sqlite dialect, in-memory DB, or no connection info on ctx) --
    callers must treat None as "skip the pre-scan report", never as
    "skip the migration work".
    """
    if getattr(ctx, "dialect", "sqlite") != "sqlite":
        return None
    url = getattr(getattr(ctx, "_db_conn", None), "url", None)
    if not url or not url.startswith("sqlite"):
        return None
    path = url.split("///", 1)[-1]
    if not path or path == ":memory:":
        return None
    import sqlite3

    try:
        return sqlite3.connect(f"file:{path}?mode=ro", uri=True)
    except sqlite3.Error:
        return None


def report_renames(ctx, echo=print):
    """Pre-scan the target DB and emit one line per planned dupe-rename.

    Split out from upgrade() so tests can drive it directly; `echo` is
    injectable for the same reason.
    """
    conn = _open_readonly_sqlite(ctx)
    if conn is None:
        echo(
            "[0008] cannot pre-scan target DB for duplicate project keys / "
            "label names (not a readable SQLite file); any duplicates will "
            "still be renamed with a -dup-<id> suffix -- diff project/label "
            "listings after migrating."
        )
        return
    try:
        for table, column in DEDUPE_TARGETS:
            for row_id, old, new in _planned_renames(conn, table, column):
                echo(
                    f"[0008] duplicate {table}.{column} -- renaming row "
                    f"{row_id}: {old!r} -> {new!r} (rename it to something "
                    f"sane after migrating)"
                )
    finally:
        conn.close()


def upgrade(ctx):
    """Apply migration."""
    # 0. LOUD pre-scan: one line per row the dedupe below will rename.
    report_renames(ctx)

    # 1. Disambiguate any existing duplicate (team_id, key) project pairs
    #    and (team_id, name) label pairs, keeping the MIN(id) row of each
    #    colliding group untouched (not ordering-significant, just
    #    deterministic -- must stay in sync with _planned_renames above).
    for table, column in DEDUPE_TARGETS:
        ctx.execute(f"""
            UPDATE "{table}"
            SET "{column}" = "{column}" || '-dup-' || substr(id, 1, 8)
            WHERE id NOT IN (
                SELECT MIN(id) FROM "{table}" GROUP BY team_id, "{column}"
            )
        """)

    # 2. Add the constraints (mirrors app.oxyde_models.project/label Meta.indexes).
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
