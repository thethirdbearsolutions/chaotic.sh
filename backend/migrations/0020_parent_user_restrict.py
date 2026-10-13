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
points at it). The CREATE TABLE parsing helpers are copied from 0019,
not imported, so a later edit to 0019 cannot change what this migration
does. Where the column already references users, its ON DELETE is
rewritten; where it has no reference, one is appended to the column's
own definition.

The current CREATE text is read by a read-only connection in a child
process, not in the migrating process: Oxyde links its own copy of
SQLite, and a connection from Python's copy opened and closed beside
Oxyde's would release Oxyde's POSIX locks on the file (see _READER).
0019 reads it in-process. While this migration did too, and its tests
also ran Oxyde in-process beside their own sqlite3 connections, about
one run in two hundred failed transiently: a `quick_check` inside the
transaction, or an `integrity_check` afterwards reporting an index row
missing, never on a copy of the same database. With the read and the
tests' migrations moved out of process, 60 runs of the suite (over a
thousand migrations) were clean.

Adding a foreign key changes nothing on disk, but rows that already
exist can violate it. A user row (agent or not) whose parent_user_id
names a missing user stops the migration before anything is written,
with the ids to fix. To check a database before upgrading (read-only):

    SELECT child.id, child.parent_user_id FROM users AS child
    WHERE child.parent_user_id IS NOT NULL
      AND NOT EXISTS (SELECT 1 FROM users AS parent
                      WHERE parent.id = child.parent_user_id);

Any row it returns must be pointed at an existing human (or, for a row
that is not an agent, have parent_user_id cleared) first.

Before anything is written, the old and the new CREATE text are each
built in a scratch in-memory database and compared: every column
(name, type, NOT NULL, default, primary key, hidden) and every other
foreign key must be identical, and the new text must have exactly one
foreign key from parent_user_id to users, with the intended action. That
is what makes a stored-text edit safe -- rows decode the same way -- and
it is checked deterministically. Inside the transaction a
CHECK-constrained temp table then fails (and rolls back) the edit
unless the stored text is the new text, the reloaded schema has exactly
one such foreign key with that action, no row violates *that* foreign
key, and `PRAGMA quick_check` is clean.

Violations of the table's other foreign keys (`agent_team_id`,
`agent_project_id`: a team or project deleted while foreign keys were
off) are not this migration's business and do not stop it.

In the replay (collect mode) the change is recorded as a drop/add of
`fk_users_parent_user_id`, matching the model's `db_on_delete`.

Downgrade restores ON DELETE CASCADE, 0001's shape, the same way. On a
database that had no foreign key on the column before 0020 (the
SQLAlchemy-era shape) it therefore leaves a CASCADE foreign key where
there was none: the downgrade cannot know which shape it started from.

Created: 2026-10-13
"""

import re

depends_on = "0019_authorship_fks_set_null"

TABLE = "users"
COLUMN = "parent_user_id"
FK_NAME = "fk_users_parent_user_id"


# --- CREATE TABLE parsing, copied from 0019 (see the docstring) ---------

_ACTION = r"(?:SET\s+NULL|SET\s+DEFAULT|CASCADE|RESTRICT|NO\s+ACTION)"
_ON_DELETE = re.compile(r"\bON\s+DELETE\s+" + _ACTION, re.IGNORECASE)
_IDENT = r"""(?:"(?:[^"]|"")+"|`[^`]+`|\[[^\]]+\]|'[^']+'|[A-Za-z_][A-Za-z0-9_$]*)"""
_REFERENCES = re.compile(
    r"\bREFERENCES\s+(?P<table>" + _IDENT + r")\s*(?:\(\s*" + _IDENT + r"\s*\))?",
    re.IGNORECASE,
)
_FK_COLUMNS = re.compile(
    r"^\s*(?:CONSTRAINT\s+" + _IDENT + r"\s+)?FOREIGN\s+KEY\s*\(\s*(?P<cols>[^)]*)\)",
    re.IGNORECASE,
)
_LEADING_IDENT = re.compile(r"^\s*(?P<name>" + _IDENT + r")")
_TABLE_CONSTRAINT = re.compile(r"^\s*(?:CONSTRAINT|PRIMARY|UNIQUE|CHECK|FOREIGN)\b", re.IGNORECASE)


def _unquote(identifier: str) -> str:
    identifier = identifier.strip()
    if identifier[:1] in "\"`'[":
        identifier = identifier[1:-1]
    return identifier.replace('""', '"').lower()


def _split_definitions(sql: str) -> list[tuple[int, int]]:
    """(start, end) spans of the top-level, comma-separated definitions
    inside a CREATE TABLE's outer parentheses, honouring nested
    parentheses, quoted identifiers and string literals."""
    open_at = sql.index("(")
    spans, depth, start, quote = [], 0, open_at + 1, None
    for i in range(open_at, len(sql)):
        ch = sql[i]
        if quote:
            if ch == quote:
                quote = None
            continue
        if ch in "\"'`":
            quote = ch
        elif ch == "[":
            quote = "]"
        elif ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
            if depth == 0:
                spans.append((start, i))
                return spans
        elif ch == "," and depth == 1:
            spans.append((start, i))
            start = i + 1
    raise ValueError("unbalanced CREATE TABLE statement")


def _rewrite_definition(definition: str, action: str) -> str | None:
    """The definition with its reference to users(id) set to `action`,
    or None when it is not a reference from COLUMN to users. (0019's,
    without the NOT NULL handling SET NULL needs.)"""
    ref = _REFERENCES.search(definition)
    if not ref or _unquote(ref.group("table")) != "users":
        return None
    fk = _FK_COLUMNS.match(definition)
    if fk:
        if [_unquote(c) for c in fk.group("cols").split(",")] != [COLUMN]:
            return None
    else:
        lead = _LEADING_IDENT.match(definition)
        if not lead or _unquote(lead.group("name")) != COLUMN:
            return None
    head, tail = definition[: ref.end()], definition[ref.end():]
    if _ON_DELETE.search(tail):
        tail = _ON_DELETE.sub(f"ON DELETE {action}", tail, count=1)
    else:
        tail = f" ON DELETE {action}" + tail
    return head + tail


def _quote_literal(text: str) -> str:
    return "'" + text.replace("'", "''") + "'"


def _database_path(ctx) -> str | None:
    if getattr(ctx, "dialect", "sqlite") != "sqlite":
        return None
    url = getattr(getattr(ctx, "_db_conn", None), "url", None)
    if not url or not url.startswith("sqlite"):
        return None
    path = url.split("///", 1)[-1]
    if not path or path == ":memory:":
        return None
    return path


# --- this migration -----------------------------------------------------


def rewrite_users_table(sql: str, action: str) -> str:
    """`sql` (the users CREATE TABLE) with the foreign key from COLUMN to
    users(id) set to ON DELETE `action`, adding the reference to the
    column's own definition when there is none. Every other byte of the
    statement is preserved."""
    spans = _split_definitions(sql)
    rewrites = {span: _rewrite_definition(sql[span[0]:span[1]], action) for span in spans}
    if any(r is not None for r in rewrites.values()):
        pieces, cursor = [], 0
        for (start, end), rewritten in rewrites.items():
            if rewritten is not None and rewritten != sql[start:end]:
                pieces.append(sql[cursor:start])
                pieces.append(rewritten)
                cursor = end
        pieces.append(sql[cursor:])
        return "".join(pieces)

    for start, end in spans:
        definition = sql[start:end]
        if _TABLE_CONSTRAINT.match(definition):
            continue
        lead = _LEADING_IDENT.match(definition)
        if lead and _unquote(lead.group("name")) == COLUMN:
            break
    else:
        raise RuntimeError(f"0020: {TABLE}.{COLUMN} has no column definition; nothing was changed")
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


DANGLING_PARENTS_SQL = (
    f"SELECT child.id, child.{COLUMN} FROM users AS child "
    f"WHERE child.{COLUMN} IS NOT NULL AND NOT EXISTS "
    f"(SELECT 1 FROM users AS parent WHERE parent.id = child.{COLUMN}) "
    "ORDER BY child.id"
)


def _shape(sql: str) -> tuple[list, list]:
    """(columns, foreign keys) of the users table `sql` creates, built in
    a scratch in-memory database."""
    import sqlite3

    connection = sqlite3.connect(":memory:")
    try:
        connection.execute(sql)
        columns = connection.execute(f"PRAGMA table_xinfo({_quote_literal(TABLE)})").fetchall()
        fks = connection.execute(f"PRAGMA foreign_key_list({_quote_literal(TABLE)})").fetchall()
    finally:
        connection.close()
    # (from, table, to, on_update, on_delete, match), without the id/seq
    # numbering, which moves when a foreign key is added.
    return columns, sorted((fk[3], fk[2].lower(), fk[4], fk[5], fk[6], fk[7]) for fk in fks)


def check_rewrite(original: str, rewritten: str, action: str) -> None:
    """Refuse (before anything is written) unless `rewritten` differs from
    `original` only in the parent_user_id foreign key, which it has
    exactly once, with ON DELETE `action`."""
    old_columns, old_fks = _shape(original)
    new_columns, new_fks = _shape(rewritten)
    if new_columns != old_columns:
        raise RuntimeError(
            f"0020: the rewritten {TABLE} definition changes its columns; nothing was changed"
        )
    parent = [fk for fk in new_fks if fk[0] == COLUMN and fk[1] == "users"]
    others_old = [fk for fk in old_fks if not (fk[0] == COLUMN and fk[1] == "users")]
    others_new = [fk for fk in new_fks if not (fk[0] == COLUMN and fk[1] == "users")]
    if len(parent) != 1 or parent[0][4].upper() != action or others_new != others_old:
        raise RuntimeError(
            f"0020: the rewritten {TABLE} definition does not have exactly one foreign key from "
            f"{COLUMN} to users with ON DELETE {action} and the others unchanged; nothing was changed"
        )


# Run in a child process. Oxyde links its own copy of SQLite, and two
# copies of SQLite in one process do not see each other's POSIX locks:
# closing a connection opened by Python's sqlite3 here would release the
# locks Oxyde's open connections hold on the same file, and a closing
# Oxyde connection could then believe it is the last one and checkpoint
# and delete the WAL under the migration's transaction
# (https://www.sqlite.org/howtocorrupt.html, "multiple copies of SQLite
# linked into the same application"). A separate process has its own
# locks, which SQLite coordinates normally.
_READER = r"""
import json, sqlite3, sys
from urllib.parse import quote
path, table, dangling_sql = sys.argv[1:4]
connection = sqlite3.connect("file:" + quote(path, safe="/") + "?mode=ro", uri=True)
try:
    row = connection.execute(
        "SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ?", (table,)
    ).fetchone()
    dangling = connection.execute(dangling_sql).fetchall() if row else []
finally:
    connection.close()
json.dump({"sql": row[0] if row else None, "dangling": dangling}, sys.stdout)
"""


def _read(path: str) -> tuple[str | None, list[tuple[str, str]]]:
    """The users CREATE text and every (row id, missing parent id), read
    read-only in a child process (see _READER) before the migration's
    transaction."""
    import json
    import subprocess
    import sys

    result = subprocess.run(
        [sys.executable, "-I", "-c", _READER, path, TABLE, DANGLING_PARENTS_SQL],
        capture_output=True, text=True, timeout=300,
    )
    if result.returncode != 0:
        lines = result.stderr.strip().splitlines() or [f"exit status {result.returncode}"]
        raise RuntimeError(f"0020 could not read the schema of {path}: {lines[-1]}; nothing was changed")
    data = json.loads(result.stdout)
    return data["sql"], [tuple(row) for row in data["dangling"]]


def _schema_edit(ctx, action: str) -> None:
    path = _database_path(ctx)
    if path is None:
        raise RuntimeError(
            "0020 needs to read the SQLite schema it rewrites and could not open the "
            "target database file; nothing was changed"
        )
    original, dangling = _read(path)
    if original is None:
        raise RuntimeError(f"0020: the database has no {TABLE} table; nothing was changed")
    if dangling:
        listed = ", ".join(f"{child} -> {parent}" for child, parent in dangling[:20])
        raise RuntimeError(
            f"0020 cannot add a foreign key on {TABLE}.{COLUMN}: {len(dangling)} user row(s) name a "
            f"parent user that does not exist ({listed}). Point each agent at an existing human "
            f"(UPDATE users SET {COLUMN} = '<human id>' WHERE id = '<row id>'), or clear it on a "
            f"row that is not an agent (UPDATE users SET {COLUMN} = NULL WHERE id = '<row id>'), "
            "and run `oxyde migrate` again; nothing was changed"
        )

    rewritten = rewrite_users_table(original, action)
    check_rewrite(original, rewritten, action)
    if rewritten != original:
        ctx.execute("PRAGMA writable_schema = ON")
        ctx.execute(
            "UPDATE sqlite_master SET sql = "
            f"{_quote_literal(rewritten)} WHERE type = 'table' AND name = "
            f"{_quote_literal(TABLE)} AND sql = {_quote_literal(original)}"
        )
        # RESET turns writing off and reloads this connection's schema;
        # the DDL pair bumps the schema cookie so every other connection
        # reloads too.
        ctx.execute("PRAGMA writable_schema = RESET")
        ctx.execute("CREATE TABLE _cht1467_schema_bump (x INTEGER)")
        ctx.execute("DROP TABLE _cht1467_schema_bump")

    # Fail (and roll back) unless the reloaded schema says what we meant.
    parent_fk = (
        f"FROM pragma_foreign_key_list({_quote_literal(TABLE)}) "
        f"WHERE \"from\" = {_quote_literal(COLUMN)} AND \"table\" = 'users'"
    )
    # Each check is a named constraint, so a failure says which one
    # ("CHECK constraint failed: 0020 ...") rather than only that one did.
    ctx.execute(
        "CREATE TEMP TABLE _cht1467_verify ("
        "a INTEGER CONSTRAINT \"0020 the stored users definition is the rewritten one\" CHECK (a = 0), "
        f"b INTEGER CONSTRAINT \"0020 users.parent_user_id has one foreign key, ON DELETE {action}\" CHECK (b = 0), "
        "c INTEGER CONSTRAINT \"0020 no row violates the parent_user_id foreign key\" CHECK (c = 0), "
        "d INTEGER CONSTRAINT \"0020 PRAGMA quick_check is ok\" CHECK (d = 0))"
    )
    ctx.execute(
        "INSERT INTO _cht1467_verify (a, b, c, d) SELECT "
        f"(SELECT count(*) <> 1 OR sum(sql <> {_quote_literal(rewritten)}) <> 0 FROM sqlite_master "
        f"WHERE type = 'table' AND name = {_quote_literal(TABLE)}), "
        f"(SELECT count(*) <> 1 OR sum(upper(on_delete) <> {_quote_literal(action)}) <> 0 {parent_fk}), "
        # Only rows violating the parent foreign key: other foreign keys
        # on users are out of scope (see the docstring).
        f"(SELECT count(*) FROM pragma_foreign_key_check({_quote_literal(TABLE)}) "
        f"WHERE fkid IN (SELECT id {parent_fk})), "
        "(SELECT count(*) FROM pragma_quick_check WHERE quick_check <> 'ok')"
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
    """Revert migration (to 0001's CASCADE; see the docstring)."""
    if _recording(ctx):
        _record(ctx, "CASCADE")
        return
    _schema_edit(ctx, "CASCADE")
