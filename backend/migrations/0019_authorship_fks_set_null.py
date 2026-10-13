"""Authorship foreign keys stop cascading when their user is deleted
(CHT-1427).

Six columns that record who *wrote* something referenced `users(id)`
with ON DELETE CASCADE, and `PRAGMA foreign_keys` is ON for every
connection (CHT-1341). Deleting an agent (agents are users) therefore
deleted every issue it created -- and through `issues`, each issue's
comments, activity and links -- every comment it wrote, its activity
trail, and its documents. They become ON DELETE SET NULL: the content
stays, and its author reads as a deleted user.

    issues.creator_id               issue_comments.author_id
    issue_activities.user_id        documents.author_id
    document_comments.author_id     document_activities.user_id

How: by editing the stored CREATE TABLE text, not by rebuilding.
SQLite's 12-step table rebuild needs `PRAGMA foreign_keys = OFF`, and
that pragma is a no-op inside a transaction, which is where Oxyde runs
every migration's SQL. With foreign keys ON, `DROP TABLE issues` is an
implicit `DELETE FROM issues` that fires the very cascades this
migration exists to remove (0005's rebuild got away with it because
nothing referenced `ticket_limbo` rows yet). SQLite documents a second
procedure for exactly this class of change -- removing or changing
FOREIGN KEY and NOT NULL constraints, which do not alter the on-disk
format: rewrite `sqlite_schema.sql` under `PRAGMA writable_schema`
(https://www.sqlite.org/lang_altertable.html, "otheralter"). No row is
copied or touched, no index is dropped or rebuilt, and the whole edit
is one transaction: if anything fails, nothing changed.

The rewrite is computed from each table's *actual* CREATE text, read
before the transaction, because a database that began life under the
SQLAlchemy schema (before CHT-1006) does not carry 0001's text. Only
the definitions of the six columns change: their `ON DELETE` becomes
`SET NULL` (added if absent), and a `NOT NULL` on the column itself is
dropped, since SET NULL on a NOT NULL column would fail every delete.
Each UPDATE is guarded on the exact text it was computed from. After
the edit the schema is reloaded and a CHECK-constrained temp table
fails the transaction unless every foreign key from those columns to
`users` now says SET NULL and `PRAGMA quick_check` is clean.

In the replay (collect mode) the same change is recorded as a
drop/add of each named foreign key, so the record matches the models'
`db_on_delete="SET NULL"`. Oxyde's diff does not compare `on_delete`,
which is why `tests/test_migration_state.py` checks it separately.

Downgrade restores ON DELETE CASCADE the same way. It does not restore
a NOT NULL it removed, and rows whose author was deleted meanwhile
keep a NULL author.

Created: 2026-10-13
"""

import re

depends_on = "0018_ritual_artifact"

# (table, column) for every authorship reference to users(id).
TARGETS = [
    ("issues", "creator_id"),
    ("issue_comments", "author_id"),
    ("issue_activities", "user_id"),
    ("documents", "author_id"),
    ("document_comments", "author_id"),
    ("document_activities", "user_id"),
]

_ACTION = r"(?:SET\s+NULL|SET\s+DEFAULT|CASCADE|RESTRICT|NO\s+ACTION)"
_ON_DELETE = re.compile(r"\bON\s+DELETE\s+" + _ACTION, re.IGNORECASE)
_NOT_NULL = re.compile(r"\s*\bNOT\s+NULL\b(?:\s+ON\s+CONFLICT\s+\w+)?", re.IGNORECASE)


def _top_level_mask(text: str) -> list[bool]:
    """For each character of a column definition, whether it is plain
    top-level text: not inside a string literal, a quoted identifier,
    parentheses (a CHECK or DEFAULT expression, a type's size) or a
    comment."""
    mask = [False] * len(text)
    depth, i, n = 0, 0, len(text)
    while i < n:
        ch = text[i]
        if ch in "'\"`[":
            close = "]" if ch == "[" else ch
            j = i + 1
            while j < n:
                if text[j] == close:
                    if close != "]" and j + 1 < n and text[j + 1] == close:
                        j += 2  # doubled quote: an escaped quote character
                        continue
                    break
                j += 1
            i = j + 1
            continue
        if text.startswith("--", i):
            end = text.find("\n", i)
            i = n if end == -1 else end
            continue
        if text.startswith("/*", i):
            end = text.find("*/", i + 2)
            i = n if end == -1 else end + 2
            continue
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        elif depth == 0:
            mask[i] = True
        i += 1
    return mask


def _strip_not_null(text: str) -> str:
    """Remove the column's own NOT NULL constraint(s) from `text`, leaving
    any "NOT NULL" inside a literal, an expression or a comment alone."""
    mask = _top_level_mask(text)
    pieces, cursor = [], 0
    for match in _NOT_NULL.finditer(text):
        keyword = match.start() + len(match.group(0)) - len(match.group(0).lstrip())
        if all(mask[keyword:match.end()]):
            pieces.append(text[cursor:match.start()])
            cursor = match.end()
    pieces.append(text[cursor:])
    return "".join(pieces)
_IDENT = r"""(?:"(?:[^"]|"")+"|`[^`]+`|\[[^\]]+\]|'[^']+'|[A-Za-z_][A-Za-z0-9_$]*)"""
_REFERENCES_USERS = re.compile(
    r"\bREFERENCES\s+(?P<table>" + _IDENT + r")\s*(?:\(\s*" + _IDENT + r"\s*\))?",
    re.IGNORECASE,
)
_FK_COLUMNS = re.compile(
    r"^\s*(?:CONSTRAINT\s+" + _IDENT + r"\s+)?FOREIGN\s+KEY\s*\(\s*(?P<cols>[^)]*)\)",
    re.IGNORECASE,
)
_LEADING_IDENT = re.compile(r"^\s*(?P<name>" + _IDENT + r")")


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


def _rewrite_definition(definition: str, column: str, action: str) -> str | None:
    """The definition with its reference to users(id) set to `action`,
    or None when it is not a reference from `column` to users."""
    ref = _REFERENCES_USERS.search(definition)
    if not ref or _unquote(ref.group("table")) != "users":
        return None
    fk = _FK_COLUMNS.match(definition)
    if fk:
        columns = [_unquote(c) for c in fk.group("cols").split(",")]
        if columns != [column]:
            return None
        is_column_definition = False
    else:
        lead = _LEADING_IDENT.match(definition)
        if not lead or _unquote(lead.group("name")) != column:
            return None
        is_column_definition = True

    head, tail = definition[: ref.end()], definition[ref.end():]
    if _ON_DELETE.search(tail):
        tail = _ON_DELETE.sub(f"ON DELETE {action}", tail, count=1)
    else:
        tail = f" ON DELETE {action}" + tail
    rewritten = head + tail
    if is_column_definition and action == "SET NULL":
        # Only the column-constraint part before REFERENCES can carry the
        # column's own NOT NULL.
        before, after = rewritten[: ref.start()], rewritten[ref.start():]
        rewritten = _strip_not_null(before) + after
    return rewritten


def _drop_column_not_null(definition: str, column: str) -> str | None:
    """A plain column definition for `column` without NOT NULL (for a
    table whose foreign key to users is a separate table constraint)."""
    if _FK_COLUMNS.match(definition) or re.match(
        r"^\s*(?:CONSTRAINT|PRIMARY|UNIQUE|CHECK|FOREIGN)\b", definition, re.IGNORECASE
    ):
        return None
    lead = _LEADING_IDENT.match(definition)
    if not lead or _unquote(lead.group("name")) != column:
        return None
    return _strip_not_null(definition)


def rewrite_create_table(sql: str, column: str, action: str) -> str:
    """Return `sql` with every foreign key from `column` to users(id) set
    to ON DELETE `action`; for SET NULL, also drop the column's NOT NULL
    (only when such a foreign key exists: with none, nothing would ever be
    set null). Every other byte of the statement is preserved."""
    spans = _split_definitions(sql)
    rewrites = {span: _rewrite_definition(sql[span[0]:span[1]], column, action) for span in spans}
    references_users = any(r is not None for r in rewrites.values())
    pieces, cursor = [], 0
    for start, end in spans:
        definition = sql[start:end]
        rewritten = rewrites[(start, end)]
        if rewritten is None and action == "SET NULL" and references_users:
            rewritten = _drop_column_not_null(definition, column)
        if rewritten is not None and rewritten != definition:
            pieces.append(sql[cursor:start])
            pieces.append(rewritten)
            cursor = end
    pieces.append(sql[cursor:])
    return "".join(pieces)


def _quote_literal(text: str) -> str:
    return "'" + text.replace("'", "''") + "'"


def _recording(ctx) -> bool:
    """True in the replay (collect mode); see 0017."""
    return getattr(ctx, "_mode", "execute") == "collect"


def _read_through_oxyde(database, sql: str, params: list) -> list[dict]:
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

    reader = threading.Thread(target=run, name="migration-0019-read")
    reader.start()
    reader.join()
    if "error" in outcome:
        raise outcome["error"]
    return outcome["rows"]


def _read_create_statements(ctx) -> dict[str, str]:
    """CREATE TABLE text of every target table that exists, read through
    the migration's own connection before the migration's transaction."""
    database = getattr(ctx, "_db_conn", None)
    if (
        getattr(ctx, "dialect", "sqlite") != "sqlite"
        or database is None
        or not callable(getattr(database, "execute", None))
    ):
        raise RuntimeError(
            "0019 needs to read the SQLite schema it rewrites and has no connection to "
            "the target database; nothing was changed"
        )
    tables = sorted({table for table, _ in TARGETS})
    rows = _read_through_oxyde(
        database,
        "SELECT name, sql FROM sqlite_master WHERE type = 'table' AND name IN "
        f"({', '.join('?' for _ in tables)})",
        tables,
    )
    return {row["name"]: row["sql"] for row in rows}


def _schema_edit(ctx, action: str) -> None:
    """Rewrite the target tables' stored CREATE text to `action` in one
    transaction (the SQL is collected and run by Oxyde in a transaction),
    then verify through the reloaded schema."""
    current = _read_create_statements(ctx)
    updates = []
    for table, original in sorted(current.items()):
        rewritten = original
        for target_table, column in TARGETS:
            if target_table == table:
                rewritten = rewrite_create_table(rewritten, column, action)
        if rewritten != original:
            updates.append(
                "UPDATE sqlite_master SET sql = "
                f"{_quote_literal(rewritten)} WHERE type = 'table' AND name = "
                f"{_quote_literal(table)} AND sql = {_quote_literal(original)}"
            )
    if updates:
        ctx.execute("PRAGMA writable_schema = ON")
        for statement in updates:
            ctx.execute(statement)
        # RESET turns writing off and reloads this connection's schema;
        # the DDL pair bumps the schema cookie so every other connection
        # reloads too.
        ctx.execute("PRAGMA writable_schema = RESET")
        ctx.execute("CREATE TABLE _cht1427_schema_bump (x INTEGER)")
        ctx.execute("DROP TABLE _cht1427_schema_bump")

    # Fail (and roll back) unless the reloaded schema says what we meant.
    ctx.execute(
        "CREATE TEMP TABLE _cht1427_verify (what TEXT, bad INTEGER CHECK (bad = 0))"
    )
    for table, column in TARGETS:
        if table not in current:
            continue
        ctx.execute(
            "INSERT INTO _cht1427_verify SELECT "
            f"{_quote_literal(table + '.' + column)}, count(*) "
            f"FROM pragma_foreign_key_list({_quote_literal(table)}) "
            f"WHERE \"from\" = {_quote_literal(column)} AND \"table\" = 'users' "
            f"AND upper(on_delete) <> {_quote_literal(action)}"
        )
    ctx.execute(
        "INSERT INTO _cht1427_verify SELECT 'quick_check', count(*) "
        "FROM pragma_quick_check WHERE quick_check <> 'ok'"
    )
    ctx.execute("DROP TABLE _cht1427_verify")


def _record(ctx, action: str) -> None:
    for table, column in TARGETS:
        name = f"fk_{table}_{column}"
        ctx.drop_foreign_key(table, name)
        ctx.add_foreign_key(
            table,
            name,
            [column],
            "users",
            ["id"],
            on_delete=action,
            on_update="CASCADE",
        )


def upgrade(ctx):
    """Apply migration."""
    if _recording(ctx):
        _record(ctx, "SET NULL")
        return
    _schema_edit(ctx, "SET NULL")


def downgrade(ctx):
    """Revert migration (NOT NULL is not restored; see the docstring)."""
    if _recording(ctx):
        _record(ctx, "CASCADE")
        return
    _schema_edit(ctx, "CASCADE")
