"""API keys record who they sign in as and who answers for them (CHT-1537).

`api_keys` named its users with two columns whose meaning depended on
each other:

- `agent_user_id` set: the key signs in as that agent, and `user_id` is
  the human who holds it (CHT-1508), unless `user_id` is the agent
  itself, which marks a key an agent minted for itself before holders
  were recorded;
- `agent_user_id` NULL: the key signs in as `user_id`, which is either a
  human (their own key) or an agent (that same legacy self-minted key).

For a legacy self-minted key the holder was not stored at all: sign-in
fell back to the agent's creator (`users.parent_user_id`). Every reader
(sign-in, minting, revoking, listing, deactivate, delete, member
removal) re-derived that rule. They become two explicit columns:

- `principal_user_id` NOT NULL: who the key signs in as,
  `coalesce(agent_user_id, user_id)` (an empty `agent_user_id` counts as
  none, as sign-in treated it).
- `holder_user_id` NULL: the human who answers for it. `user_id` when
  that is not the principal; for a key that signs in as an agent and
  whose `user_id` is the agent (the legacy shape), the agent's creator;
  for a human's own key, the human. NULL only where the legacy rule
  found nobody (an agent with no creator on record), and such a key
  never signed in and still does not.

Freezing the creator into the legacy rows changes no outcome: the only
thing that moves `users.parent_user_id` is a member's removal, which
revokes those same keys in the same transaction (CHT-1510).

How: SQLite cannot drop a column that a foreign key or an index uses,
nor add a NOT NULL column with a REFERENCES clause, so the table is
rebuilt: create the new table, copy every row through the rule above,
drop the old table, rename the new one into place, and create its
indexes. Nothing references `api_keys`, so dropping it with foreign
keys ON fires no cascade (the reason 0019 and 0020 could not rebuild
`users`). Both new columns reference users(id) ON DELETE CASCADE ON
UPDATE CASCADE, as `user_id` and `agent_user_id` did in 0001. The
indexes are `ix_api_keys_key_prefix` (the sign-in lookup: a database
built from the chain had none, one from the SQLAlchemy era had it under
this name), `ix_api_keys_principal_user_id` and
`ix_api_keys_holder_user_id`; the SQLAlchemy era's `ix_api_keys_user_id`
goes with its column.

Before the transaction, through the migration's own Oxyde connection
(never Python's sqlite3, CHT-1491), the table's columns are read and
must be exactly the pre-0021 ten; anything else stops the migration
before anything is written. The rows whose principal or holder names a
user that no longer exists are read too (possible where foreign keys
were off, before CHT-1341, or on a SQLAlchemy-era table with no foreign
key on agent_user_id). Such a key cannot sign in: its user is gone, or
it is an agent key whose holder is gone and so is no team member. The
copy would break the new foreign keys on it, so 0021 deletes it, in the
same transaction, rather than refuse and leave the service down after
`chaotic system upgrade`. Each one is printed (prefix, id, the missing
user) to the upgrade's output, and `chaotic system upgrade` takes a
backup before migrating, so the rows themselves are not lost. To see
them before upgrading (read-only):

    SELECT id, key_prefix FROM api_keys AS k WHERE NOT EXISTS
      (SELECT 1 FROM users WHERE users.id = coalesce(nullif(k.agent_user_id, ''), k.user_id))
      OR NOT EXISTS (SELECT 1 FROM users WHERE users.id = k.user_id);

Inside the transaction, after the rename, a CHECK-constrained temp
table fails (and rolls back) the migration unless the row count is
unchanged, the columns are the new ten, no row violates a foreign key
of `api_keys`, and `PRAGMA quick_check` is clean.

In the replay (collect mode) the change is recorded as what
`oxyde makemigrations` generates for the model: two add_column, two
drop_column and three create_index. The foreign keys are not recorded,
as for every `str` column with `db_on_delete` (see 0017).

Downgrade rebuilds 0001's shape: `user_id` = the holder (the principal
where there is none) and `agent_user_id` = the principal whenever the
holder is not the principal. Under the pre-0021 rule every key reads
back as the same principal. It reads back as the same holder too,
except a key with no holder: that one falls back to the agent's
*current* creator again, as before 0021, so it signs in once the agent
has a creator in its team. A legacy key's creator stays written in
`user_id`. Keys 0021 deleted are not restored (they are in the backup
`chaotic system upgrade` took). The indexes go with the table, as 0001
had none.

Created: 2026-10-13
"""

depends_on = "0020_parent_user_restrict"

TABLE = "api_keys"
STAGING = "_cht1537_api_keys"

OLD_COLUMNS = {
    "id", "user_id", "name", "key_prefix", "key_hash", "created_at",
    "last_used_at", "expires_at", "is_active", "agent_user_id",
}
NEW_COLUMNS = {
    "id", "principal_user_id", "holder_user_id", "name", "key_prefix", "key_hash",
    "created_at", "last_used_at", "expires_at", "is_active",
}
# The columns copied unchanged in both directions.
SHARED = ["id", "name", "key_prefix", "key_hash", "created_at", "last_used_at", "expires_at", "is_active"]

INDEXES = [
    ("ix_api_keys_key_prefix", "key_prefix"),
    ("ix_api_keys_principal_user_id", "principal_user_id"),
    ("ix_api_keys_holder_user_id", "holder_user_id"),
]

_USER_FK = 'REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE'

NEW_TABLE_SQL = (
    f'CREATE TABLE "{STAGING}" ( '
    '"id" VARCHAR(255) PRIMARY KEY, '
    '"principal_user_id" VARCHAR(255) NOT NULL, '
    '"holder_user_id" VARCHAR(255), '
    '"name" VARCHAR(255) NOT NULL, '
    '"key_prefix" VARCHAR(255) NOT NULL, '
    '"key_hash" VARCHAR(255) NOT NULL, '
    '"created_at" TEXT NOT NULL, '
    '"last_used_at" TEXT, '
    '"expires_at" TEXT, '
    '"is_active" INTEGER NOT NULL DEFAULT 1, '
    f'FOREIGN KEY ("principal_user_id") {_USER_FK}, '
    f'FOREIGN KEY ("holder_user_id") {_USER_FK} )'
)

# 0001's table, for the downgrade.
OLD_TABLE_SQL = (
    f'CREATE TABLE "{STAGING}" ( '
    '"id" VARCHAR(255) PRIMARY KEY, '
    '"user_id" VARCHAR(255) NOT NULL, '
    '"name" VARCHAR(255) NOT NULL, '
    '"key_prefix" VARCHAR(255) NOT NULL, '
    '"key_hash" VARCHAR(255) NOT NULL, '
    '"created_at" TEXT NOT NULL, '
    '"last_used_at" TEXT, '
    '"expires_at" TEXT, '
    '"is_active" INTEGER NOT NULL DEFAULT 1, '
    '"agent_user_id" VARCHAR(255), '
    f'FOREIGN KEY ("user_id") {_USER_FK}, '
    f'FOREIGN KEY ("agent_user_id") {_USER_FK} )'
)

# Every pre-0021 row with its principal and holder, by the rule sign-in
# applied (see the docstring). `p` is the principal's user row.
RESOLVED_SQL = (
    "SELECT k.*, "
    "CASE WHEN k.user_id <> k.principal_user_id THEN k.user_id "
    "WHEN p.is_agent THEN p.parent_user_id "
    "ELSE k.user_id END AS holder_user_id "
    "FROM (SELECT *, coalesce(nullif(agent_user_id, ''), user_id) AS principal_user_id "
    f"FROM {TABLE}) AS k "
    "LEFT JOIN users AS p ON p.id = k.principal_user_id"
)

DANGLING_SQL = (
    "SELECT r.id, r.key_prefix, r.principal_user_id, r.holder_user_id FROM "
    f"({RESOLVED_SQL}) AS r "
    "WHERE NOT EXISTS (SELECT 1 FROM users WHERE users.id = r.principal_user_id) "
    "OR (r.holder_user_id IS NOT NULL "
    "AND NOT EXISTS (SELECT 1 FROM users WHERE users.id = r.holder_user_id)) "
    "ORDER BY r.id"
)


def _quote_literal(text: str) -> str:
    return "'" + text.replace("'", "''") + "'"


def _read_through_oxyde(database, sql: str, params: list) -> list[dict]:
    """Rows of `sql` (as dicts keyed by column name), read through Oxyde's
    own connection to the migration target. (0020's, copied so a later
    edit there cannot change this migration.)

    Never sqlite3.connect() the target here: Oxyde links its own copy of
    SQLite, POSIX locks are per process, and a second copy opening the
    same WAL database truncates the -shm Oxyde has mapped and drops its
    locks on close (CHT-1491). upgrade() is synchronous and runs inside
    the executor's event loop, so the query runs on a short-lived thread
    with an event loop of its own.
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

    reader = threading.Thread(target=run, name="migration-0021-read")
    reader.start()
    reader.join()
    if "error" in outcome:
        raise outcome["error"]
    return outcome["rows"]


def _database(ctx):
    database = getattr(ctx, "_db_conn", None)
    if (
        getattr(ctx, "dialect", "sqlite") != "sqlite"
        or database is None
        or not callable(getattr(database, "execute", None))
    ):
        raise RuntimeError(
            "0021 needs to read the SQLite table it rebuilds and has no connection to "
            "the target database; nothing was changed"
        )
    return database


def _columns(database) -> set[str]:
    rows = _read_through_oxyde(
        database, f"SELECT name FROM pragma_table_info({_quote_literal(TABLE)})", []
    )
    return {row["name"] for row in rows}


def _check_columns(found: set[str], expected: set[str], direction: str) -> None:
    if found != expected:
        raise RuntimeError(
            f"0021 {direction}: {TABLE} has columns {sorted(found)}, expected {sorted(expected)}; "
            "nothing was changed"
        )


def _rebuild(ctx, copy_sql: str, columns_after: set[str]) -> None:
    """Swap `api_keys` for the staging table `copy_sql` filled, then
    verify. Runs inside the migration's transaction."""
    ctx.execute(f"CREATE TEMP TABLE _cht1537_count AS SELECT count(*) AS n FROM {TABLE}")
    ctx.execute(copy_sql)
    ctx.execute(f"DROP TABLE {TABLE}")
    ctx.execute(f'ALTER TABLE "{STAGING}" RENAME TO "{TABLE}"')
    if "principal_user_id" in columns_after:
        for name, column in INDEXES:
            ctx.execute(f'CREATE INDEX "{name}" ON "{TABLE}" ("{column}")')

    expected_columns = " UNION ALL ".join(f"SELECT {_quote_literal(c)}" for c in sorted(columns_after))
    actual_columns = f"SELECT name FROM pragma_table_info({_quote_literal(TABLE)})"
    # Each check is a named constraint, so a failure says which one.
    ctx.execute(
        "CREATE TEMP TABLE _cht1537_verify ("
        "a INTEGER CONSTRAINT \"0021 every api_keys row was copied\" CHECK (a = 0), "
        "b INTEGER CONSTRAINT \"0021 the api_keys columns are the intended ones\" CHECK (b = 0), "
        "c INTEGER CONSTRAINT \"0021 no api_keys row violates a foreign key\" CHECK (c = 0), "
        "d INTEGER CONSTRAINT \"0021 PRAGMA quick_check is ok\" CHECK (d = 0))"
    )
    ctx.execute(
        "INSERT INTO _cht1537_verify (a, b, c, d) SELECT "
        f"(SELECT (SELECT count(*) FROM {TABLE}) <> (SELECT n FROM _cht1537_count)), "
        f"(SELECT count(*) FROM (SELECT * FROM ({expected_columns}) EXCEPT {actual_columns} "
        f"UNION ALL SELECT * FROM ({actual_columns} EXCEPT SELECT * FROM ({expected_columns})))), "
        f"(SELECT count(*) FROM pragma_foreign_key_check({_quote_literal(TABLE)})), "
        "(SELECT count(*) FROM pragma_quick_check WHERE quick_check <> 'ok')"
    )
    ctx.execute("DROP TABLE _cht1537_verify")
    ctx.execute("DROP TABLE _cht1537_count")


def _upgrade_database(ctx) -> None:
    database = _database(ctx)
    _check_columns(_columns(database), OLD_COLUMNS, "upgrade")
    dangling = _read_through_oxyde(database, DANGLING_SQL, [])
    for row in dangling:
        # Printed, not logged: `oxyde migrate` shows stdout, and
        # `chaotic system upgrade` relays it (CHT-1548).
        print(
            f"0021: deleting API key {row['key_prefix']}... (id {row['id']}): it signs in as "
            f"{row['principal_user_id']}, held by {row['holder_user_id']}, and one of them is a "
            "user that no longer exists, so it cannot sign in",
            flush=True,
        )
    if dangling:
        ids = ", ".join(_quote_literal(row["id"]) for row in dangling)
        ctx.execute(f"DELETE FROM {TABLE} WHERE id IN ({ids})")
    shared = ", ".join(SHARED)
    ctx.execute(NEW_TABLE_SQL)
    _rebuild(
        ctx,
        f'INSERT INTO "{STAGING}" ({shared}, principal_user_id, holder_user_id) '
        f"SELECT {shared}, principal_user_id, holder_user_id FROM ({RESOLVED_SQL})",
        NEW_COLUMNS,
    )


def _downgrade_database(ctx) -> None:
    database = _database(ctx)
    _check_columns(_columns(database), NEW_COLUMNS, "downgrade")
    shared = ", ".join(f"k.{c}" for c in SHARED)
    ctx.execute(OLD_TABLE_SQL)
    _rebuild(
        ctx,
        f'INSERT INTO "{STAGING}" ({", ".join(SHARED)}, user_id, agent_user_id) '
        f"SELECT {shared}, coalesce(k.holder_user_id, k.principal_user_id), "
        "CASE WHEN k.holder_user_id IS NOT k.principal_user_id THEN k.principal_user_id END "
        f"FROM {TABLE} AS k",
        OLD_COLUMNS,
    )


def _column(name: str, nullable: bool) -> dict:
    return {
        "name": name,
        "python_type": "str",
        "db_type": None,
        "nullable": nullable,
        "primary_key": False,
        "unique": False,
        "default": None,
        "auto_increment": False,
        "max_length": None,
        "max_digits": None,
        "decimal_places": None,
    }


def _record_upgrade(ctx) -> None:
    """What `oxyde makemigrations` generates for the model change."""
    ctx.add_column(TABLE, _column("principal_user_id", nullable=False))
    ctx.add_column(TABLE, _column("holder_user_id", nullable=True))
    ctx.drop_column(TABLE, "user_id")
    ctx.drop_column(TABLE, "agent_user_id")
    for name, column in INDEXES:
        ctx.create_index(TABLE, {"name": name, "fields": [column], "unique": False, "method": None})


def _record_downgrade(ctx) -> None:
    for name, _column_name in reversed(INDEXES):
        ctx.drop_index(TABLE, name)
    ctx.add_column(TABLE, _column("agent_user_id", nullable=True))
    ctx.add_column(TABLE, _column("user_id", nullable=False))
    ctx.drop_column(TABLE, "holder_user_id")
    ctx.drop_column(TABLE, "principal_user_id")


def _recording(ctx) -> bool:
    """True in the replay (collect mode); see 0017."""
    return getattr(ctx, "_mode", "execute") == "collect"


def upgrade(ctx):
    """Apply migration."""
    if _recording(ctx):
        _record_upgrade(ctx)
        return
    _upgrade_database(ctx)


def downgrade(ctx):
    """Revert migration (to 0001's shape; see the docstring)."""
    if _recording(ctx):
        _record_downgrade(ctx)
        return
    _downgrade_database(ctx)
