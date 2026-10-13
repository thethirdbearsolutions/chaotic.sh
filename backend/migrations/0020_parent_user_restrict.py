"""Deleting a human no longer deletes their agents (CHT-1467).

`users.parent_user_id` (an agent's owning human) had two shapes:

- a database built from the migration chain (0001) says
  `REFERENCES users(id) ON DELETE CASCADE`, so deleting a human row
  deleted every agent they owned, skipping the authored-content guard
  `AgentService.delete` applies (CHT-1427) and taking the agents'
  ticket_limbo rows (still CASCADE) with them;
- a database that began under the SQLAlchemy schema (before CHT-1006),
  production's among them, has no foreign key on the column at all, so
  the same delete left the agents pointing at a user that no longer
  exists.

Both become `REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE`.
`UserService.delete` now deletes a human's agents itself, one by one,
after checking that neither the human nor any agent authored anything;
the RESTRICT is the backstop that makes any other path that deletes a
human with agents fail instead of silently taking them along.

How: the same stored-CREATE-text edit under `PRAGMA writable_schema`
that 0019 uses, for the same reason (a table rebuild cannot run with
foreign keys ON, and dropping `users` would fire every cascade that
points at it). The helpers that parse and rewrite a CREATE TABLE
statement are 0019's, loaded from that file. Where the column already
references users, its ON DELETE is rewritten; where it has no
reference, one is appended to the column's own definition. Adding a
foreign key changes nothing on disk, but it can be violated by rows
that already exist, so an agent whose parent_user_id names a missing
user stops the migration before anything is written, with the ids to
fix. Inside the transaction a CHECK-constrained temp table fails (and
rolls back) the edit unless the reloaded schema has exactly one
foreign key from parent_user_id to users, it says RESTRICT,
`PRAGMA foreign_key_check('users')` is empty and `PRAGMA quick_check`
is clean.

In the replay (collect mode) the change is recorded as a drop/add of
`fk_users_parent_user_id`, matching the model's `db_on_delete`.

Downgrade restores ON DELETE CASCADE (0001's shape) the same way; on
a database that had no foreign key before 0020 it keeps one.

Created: 2026-10-13
"""

import importlib.util
import pathlib

depends_on = "0019_authorship_fks_set_null"

TABLE = "users"
COLUMN = "parent_user_id"
FK_NAME = "fk_users_parent_user_id"


def _helpers():
    """0019's CREATE TABLE parsing and rewriting helpers."""
    path = pathlib.Path(__file__).with_name("0019_authorship_fks_set_null.py")
    spec = importlib.util.spec_from_file_location("_cht1467_0019_helpers", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def _column_definition_span(m19, sql: str) -> tuple[int, int]:
    """(start, end) of the column definition for COLUMN."""
    import re

    for start, end in m19._split_definitions(sql):
        definition = sql[start:end]
        if re.match(r"^\s*(?:CONSTRAINT|PRIMARY|UNIQUE|CHECK|FOREIGN)\b", definition, re.IGNORECASE):
            continue
        lead = m19._LEADING_IDENT.match(definition)
        if lead and m19._unquote(lead.group("name")) == COLUMN:
            return start, end
    raise RuntimeError(f"0020: {TABLE}.{COLUMN} has no column definition; nothing was changed")


def _references_users(m19, sql: str) -> bool:
    """Whether some definition is a foreign key from COLUMN to users."""
    return any(
        m19._rewrite_definition(sql[start:end], COLUMN, "RESTRICT") is not None
        for start, end in m19._split_definitions(sql)
    )


def rewrite_users_table(sql: str, action: str) -> str:
    """`sql` (the users CREATE TABLE) with the foreign key from COLUMN to
    users(id) set to ON DELETE `action`, adding the reference to the
    column's own definition when there is none. Every other byte of the
    statement is preserved."""
    m19 = _helpers()
    if _references_users(m19, sql):
        return m19.rewrite_create_table(sql, COLUMN, action)
    start, end = _column_definition_span(m19, sql)
    definition = sql[start:end]
    if "--" in definition or "/*" in definition:
        # Text appended after a comment could end up inside it.
        raise RuntimeError(
            f"0020: {TABLE}.{COLUMN}'s definition carries a comment this migration "
            "will not edit around; nothing was changed"
        )
    body = definition.rstrip()
    trailing = definition[len(body):]
    clause = f" REFERENCES users (id) ON DELETE {action} ON UPDATE CASCADE"
    return sql[:start] + body + clause + trailing + sql[end:]


def _dangling_parents(path: str) -> list[tuple[str, str]]:
    """(agent id, missing parent id) for every user row whose
    parent_user_id names no user."""
    import sqlite3

    connection = sqlite3.connect(f"file:{path}?mode=ro", uri=True)
    try:
        return connection.execute(
            f"SELECT child.id, child.{COLUMN} FROM users AS child "
            f"WHERE child.{COLUMN} IS NOT NULL AND NOT EXISTS "
            f"(SELECT 1 FROM users AS parent WHERE parent.id = child.{COLUMN}) "
            "ORDER BY child.id"
        ).fetchall()
    finally:
        connection.close()


def _schema_edit(ctx, action: str) -> None:
    m19 = _helpers()
    path = m19._database_path(ctx)
    if path is None:
        raise RuntimeError(
            "0020 needs to read the SQLite schema it rewrites and could not open the "
            "target database file; nothing was changed"
        )
    import sqlite3

    connection = sqlite3.connect(f"file:{path}?mode=ro", uri=True)
    try:
        row = connection.execute(
            "SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ?", (TABLE,)
        ).fetchone()
    finally:
        connection.close()
    if row is None:
        raise RuntimeError(f"0020: the database has no {TABLE} table; nothing was changed")
    original = row[0]

    dangling = _dangling_parents(path)
    if dangling:
        listed = ", ".join(f"{agent} -> {parent}" for agent, parent in dangling[:20])
        raise RuntimeError(
            f"0020 cannot add a foreign key on {TABLE}.{COLUMN}: {len(dangling)} row(s) name a "
            f"parent user that does not exist ({listed}). Point each at an existing human "
            f"(UPDATE users SET {COLUMN} = '<human id>' WHERE id = '<agent id>') and run "
            "`oxyde migrate` again; nothing was changed"
        )

    rewritten = rewrite_users_table(original, action)
    if rewritten != original:
        ctx.execute("PRAGMA writable_schema = ON")
        ctx.execute(
            "UPDATE sqlite_master SET sql = "
            f"{m19._quote_literal(rewritten)} WHERE type = 'table' AND name = "
            f"{m19._quote_literal(TABLE)} AND sql = {m19._quote_literal(original)}"
        )
        # RESET turns writing off and reloads this connection's schema;
        # the DDL pair bumps the schema cookie so every other connection
        # reloads too.
        ctx.execute("PRAGMA writable_schema = RESET")
        ctx.execute("CREATE TABLE _cht1467_schema_bump (x INTEGER)")
        ctx.execute("DROP TABLE _cht1467_schema_bump")

    # Fail (and roll back) unless the reloaded schema says what we meant.
    ctx.execute("CREATE TEMP TABLE _cht1467_verify (what TEXT, bad INTEGER CHECK (bad = 0))")
    ctx.execute(
        "INSERT INTO _cht1467_verify SELECT 'one foreign key, ON DELETE "
        f"{action}', count(*) <> 1 OR sum(upper(on_delete) <> {m19._quote_literal(action)}) <> 0 "
        f"FROM pragma_foreign_key_list({m19._quote_literal(TABLE)}) "
        f"WHERE \"from\" = {m19._quote_literal(COLUMN)} AND \"table\" = 'users'"
    )
    ctx.execute(
        "INSERT INTO _cht1467_verify SELECT 'foreign_key_check', count(*) "
        f"FROM pragma_foreign_key_check({m19._quote_literal(TABLE)})"
    )
    ctx.execute(
        "INSERT INTO _cht1467_verify SELECT 'quick_check', count(*) "
        "FROM pragma_quick_check WHERE quick_check <> 'ok'"
    )
    ctx.execute("DROP TABLE _cht1467_verify")


def _record(ctx, action: str) -> None:
    ctx.drop_foreign_key(TABLE, FK_NAME)
    ctx.add_foreign_key(TABLE, FK_NAME, [COLUMN], "users", ["id"], on_delete=action, on_update="CASCADE")


def _recording(ctx) -> bool:
    """True in the replay (collect mode); see 0017."""
    return getattr(ctx, "_mode", "execute") == "collect"


def upgrade(ctx):
    """Apply migration."""
    if _recording(ctx):
        _record(ctx, "RESTRICT")
        return
    _schema_edit(ctx, "RESTRICT")


def downgrade(ctx):
    """Revert migration (to 0001's CASCADE)."""
    if _recording(ctx):
        _record(ctx, "CASCADE")
        return
    _schema_edit(ctx, "CASCADE")
