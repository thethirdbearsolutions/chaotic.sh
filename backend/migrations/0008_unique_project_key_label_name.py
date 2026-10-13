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

(Reporting caveat: the per-row lines come from a pre-scan read through
the migration's own Oxyde connection before the batched UPDATE executes.
Migration execution is transactional, so if the migration fails after
printing, nothing was renamed -- the failure itself is the louder
signal. On non-SQLite dialects or when the context has no connection,
the scan is skipped and a one-line notice prints instead; the renames
still happen either way.)

Created: 2026-07-05
"""

depends_on = "0007_normalize_enum_storage"

# (table, unique-scoped column) pairs this migration disambiguates + constrains.
DEDUPE_TARGETS = [
    ("projects", "key"),
    ("labels", "name"),
]


def _planned_renames(fetch, table, column):
    """Return [(row_id, old_value, new_value)] for every row the dedupe
    UPDATE in upgrade() will rename: rows that are not the MIN(id) of
    their (team_id, column) group. `fetch(sql)` returns the rows of
    `sql` over the pre-migration data, as dicts keyed by column name."""
    rows = fetch(
        f'SELECT id, "{column}" AS value FROM "{table}" '
        f'WHERE id NOT IN (SELECT MIN(id) FROM "{table}" GROUP BY team_id, "{column}")'
    )
    return [
        (row["id"], row["value"], f"{row['value']}-dup-{row['id'][:8]}") for row in rows
    ]


def _read_through_oxyde(database, sql, params=None):
    """Rows of `sql` (as dicts keyed by column name), read through Oxyde's own connection to
    the migration target.

    Never sqlite3.connect() the target here. That loads a second, separate
    copy of SQLite into a process where Oxyde's bundled one has the same
    database open in WAL mode, and POSIX locks are per process, so neither
    copy can see the other's: Python's takes itself for the only user,
    truncates and rebuilds the -shm index Oxyde has mapped, and drops
    Oxyde's locks when it closes. The result is SIGBUS or "database disk
    image is malformed" (CHT-1491). upgrade() is synchronous and runs
    inside the executor's event loop, so the query runs on a short-lived
    thread with an event loop of its own.
    """
    import asyncio
    import threading

    from oxyde import execute_raw

    outcome = {}

    def run():
        try:
            outcome["rows"] = asyncio.run(execute_raw(sql, params, client=database))
        except BaseException as error:  # re-raised on the migration's thread
            outcome["error"] = error

    reader = threading.Thread(target=run, name="migration-0008-read")
    reader.start()
    reader.join()
    if "error" in outcome:
        raise outcome["error"]
    return outcome["rows"]


def _target_reader(ctx):
    """A `fetch(sql)` over the migration target, or None when there is
    nothing to read through (non-sqlite dialect, or a context with no
    database connection) -- callers must treat None as "skip the pre-scan
    report", never as "skip the migration work".
    """
    if getattr(ctx, "dialect", "sqlite") != "sqlite":
        return None
    database = getattr(ctx, "_db_conn", None)
    if database is None or not callable(getattr(database, "execute", None)):
        return None
    return lambda sql: _read_through_oxyde(database, sql)


def report_renames(ctx, echo=print):
    """Pre-scan the target DB and emit one line per planned dupe-rename.

    Split out from upgrade() so tests can drive it directly; `echo` is
    injectable for the same reason.

    Oxyde also drives upgrade() through a connection-less "collect"
    MigrationContext that only records schema operations: once right
    after the real pass (executor.py), and again for every
    already-applied migration whenever a later one is migrated, rolled
    back, or inspected by makemigrations / sqlmigrate. There is nothing
    to scan on any of those passes, so report_renames stays silent there
    instead of printing the cannot-pre-scan caveat, which it used to do
    on every such run, indefinitely (CHT-1402).

    `_mode` is a private attribute of MigrationContext (oxyde 0.7; there
    is no public accessor). If it is renamed the guard falls through to
    "execute" and the caveat merely returns -- the dedupe below never
    depends on this -- and test_collect_pass_is_silent says so.
    """
    if getattr(ctx, "_mode", "execute") == "collect":
        return
    fetch = _target_reader(ctx)
    if fetch is None:
        echo(
            "[0008] cannot pre-scan target DB for duplicate project keys / "
            "label names (no SQLite connection to read through); any "
            "duplicates will still be renamed with a -dup-<id> suffix -- diff "
            "project/label listings after migrating."
        )
        return
    for table, column in DEDUPE_TARGETS:
        for row_id, old, new in _planned_renames(fetch, table, column):
            echo(
                f"[0008] duplicate {table}.{column} -- renaming row "
                f"{row_id}: {old!r} -> {new!r} (rename it to something "
                f"sane after migrating)"
            )


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
