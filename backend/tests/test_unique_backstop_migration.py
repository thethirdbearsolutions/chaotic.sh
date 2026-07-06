"""Tests for migrations/0008_unique_project_key_label_name.py (CHT-1223).

The migration disambiguates pre-existing duplicate (team_id, key)
project rows and (team_id, name) label rows with a `-dup-<id prefix>`
suffix (non-destructive -- both tables are heavily FK-referenced), then
adds the compound UNIQUE indexes that backstop create_project /
create_label idempotency. Review finding on PR #208: the rename must
be LOUD -- one stdout line per renamed row -- so an operator running
`chaotic system upgrade` sees exactly which rows were touched.
"""
import importlib.util
import sqlite3
from pathlib import Path

import pytest

MIGRATION = Path(__file__).parent.parent / "migrations" / "0008_unique_project_key_label_name.py"


def _load_migration():
    spec = importlib.util.spec_from_file_location("m0008", MIGRATION)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


class _FakeDbConn:
    def __init__(self, url):
        self.url = url


class _FileCtx:
    """MigrationContext stand-in over a file-backed sqlite DB.

    Mimics the two ctx surfaces 0008 uses: `execute` (real
    MigrationContext defers these; here they run immediately, which is
    fine -- report_renames() pre-scans before any execute call) and
    the `dialect`/`_db_conn.url` attributes the read-only pre-scan
    reads. File-backed (not :memory:) so the migration's separate
    read-only sqlite3 connection sees the same data, exactly as it
    would against a real install.
    """

    dialect = "sqlite"

    def __init__(self, conn, db_path):
        self.conn = conn
        self._db_conn = _FakeDbConn(f"sqlite:///{db_path}")
        self.created_indexes = []

    def execute(self, sql):
        self.conn.execute(sql)
        self.conn.commit()

    def create_index(self, table, index):
        self.created_indexes.append((table, index))
        cols = ", ".join(f'"{c}"' for c in index["fields"])
        unique = "UNIQUE " if index["unique"] else ""
        self.conn.execute(
            f'CREATE {unique}INDEX "{index["name"]}" ON "{table}" ({cols})'
        )
        self.conn.commit()


@pytest.fixture
def mig():
    return _load_migration()


@pytest.fixture
def ctx(tmp_path):
    db_path = tmp_path / "m0008.db"
    conn = sqlite3.connect(str(db_path))
    conn.execute("CREATE TABLE projects (id TEXT PRIMARY KEY, team_id TEXT, \"key\" TEXT)")
    conn.execute("CREATE TABLE labels (id TEXT PRIMARY KEY, team_id TEXT, name TEXT)")
    conn.commit()
    yield _FileCtx(conn, db_path)
    conn.close()


def _seed_duplicates(ctx):
    """Two colliding projects + three colliding labels, plus clean rows."""
    ctx.conn.executemany(
        "INSERT INTO projects (id, team_id, \"key\") VALUES (?, ?, ?)",
        [
            ("aaaaaaaa-1111", "t1", "PROJ"),
            ("bbbbbbbb-2222", "t1", "PROJ"),   # dupe of the row above
            ("cccccccc-3333", "t2", "PROJ"),   # same key, different team: fine
            ("dddddddd-4444", "t1", "OTHER"),  # unique key: untouched
        ],
    )
    ctx.conn.executemany(
        "INSERT INTO labels (id, team_id, name) VALUES (?, ?, ?)",
        [
            ("11111111-aaaa", "t1", "bug"),
            ("22222222-bbbb", "t1", "bug"),    # dupe
            ("33333333-cccc", "t1", "bug"),    # dupe
            ("44444444-dddd", "t1", "feature"),
        ],
    )
    ctx.conn.commit()


def test_duplicates_renamed_not_deleted(mig, ctx):
    _seed_duplicates(ctx)

    mig.upgrade(ctx)

    # No row deleted.
    assert ctx.conn.execute("SELECT COUNT(*) FROM projects").fetchone()[0] == 4
    assert ctx.conn.execute("SELECT COUNT(*) FROM labels").fetchone()[0] == 4

    # MIN(id) keeper untouched; later dupes suffixed with -dup-<id prefix>.
    keys = dict(ctx.conn.execute("SELECT id, \"key\" FROM projects").fetchall())
    assert keys["aaaaaaaa-1111"] == "PROJ"
    assert keys["bbbbbbbb-2222"] == "PROJ-dup-bbbbbbbb"
    assert keys["cccccccc-3333"] == "PROJ"          # cross-team share is legal
    assert keys["dddddddd-4444"] == "OTHER"

    names = dict(ctx.conn.execute("SELECT id, name FROM labels").fetchall())
    assert names["11111111-aaaa"] == "bug"
    assert names["22222222-bbbb"] == "bug-dup-22222222"
    assert names["33333333-cccc"] == "bug-dup-33333333"
    assert names["44444444-dddd"] == "feature"


def test_unique_indexes_created_and_enforced(mig, ctx):
    _seed_duplicates(ctx)

    mig.upgrade(ctx)

    assert [t for t, _ in ctx.created_indexes] == ["projects", "labels"]

    with pytest.raises(sqlite3.IntegrityError):
        ctx.conn.execute(
            "INSERT INTO projects (id, team_id, \"key\") VALUES ('x', 't1', 'PROJ')"
        )
    with pytest.raises(sqlite3.IntegrityError):
        ctx.conn.execute(
            "INSERT INTO labels (id, team_id, name) VALUES ('y', 't1', 'bug')"
        )


def test_rename_is_loud_one_line_per_row(mig, ctx, capsys):
    """Review finding (PR #208): renames must be visible in migration
    output -- one line per renamed row with table, row id, old -> new."""
    _seed_duplicates(ctx)

    mig.upgrade(ctx)

    out = capsys.readouterr().out
    lines = [l for l in out.splitlines() if l.startswith("[0008] duplicate")]
    assert len(lines) == 3  # 1 project dupe + 2 label dupes

    assert any(
        "projects.key" in l and "bbbbbbbb-2222" in l
        and "'PROJ'" in l and "'PROJ-dup-bbbbbbbb'" in l
        for l in lines
    )
    assert any(
        "labels.name" in l and "22222222-bbbb" in l
        and "'bug'" in l and "'bug-dup-22222222'" in l
        for l in lines
    )
    assert any(
        "labels.name" in l and "33333333-cccc" in l
        and "'bug-dup-33333333'" in l
        for l in lines
    )


def test_no_duplicates_no_rename_lines(mig, ctx, capsys):
    ctx.conn.execute("INSERT INTO projects (id, team_id, \"key\") VALUES ('p1', 't1', 'PROJ')")
    ctx.conn.execute("INSERT INTO labels (id, team_id, name) VALUES ('l1', 't1', 'bug')")
    ctx.conn.commit()

    mig.upgrade(ctx)

    out = capsys.readouterr().out
    assert "[0008] duplicate" not in out

    # Data untouched.
    assert ctx.conn.execute("SELECT \"key\" FROM projects").fetchone() == ("PROJ",)
    assert ctx.conn.execute("SELECT name FROM labels").fetchone() == ("bug",)


def test_unreadable_target_prints_notice_and_still_renames(mig, ctx, capsys):
    """When the DB file can't be pre-scanned (e.g. non-sqlite dialect),
    a one-line notice prints and the dedupe still runs."""
    _seed_duplicates(ctx)
    ctx._db_conn = None  # simulate no readable connection info

    mig.upgrade(ctx)

    out = capsys.readouterr().out
    assert "[0008] cannot pre-scan" in out
    assert "[0008] duplicate" not in out

    keys = dict(ctx.conn.execute("SELECT id, \"key\" FROM projects").fetchall())
    assert keys["bbbbbbbb-2222"] == "PROJ-dup-bbbbbbbb"


def test_idempotent_rerun_of_dedupe(mig, ctx, capsys):
    """Running the dedupe portion twice doesn't double-suffix (already-
    suffixed rows no longer collide, so the second pass is a no-op)."""
    _seed_duplicates(ctx)

    mig.report_renames(ctx)  # first pre-scan sees the dupes
    for table, column in mig.DEDUPE_TARGETS:
        ctx.execute(f"""
            UPDATE "{table}"
            SET "{column}" = "{column}" || '-dup-' || substr(id, 1, 8)
            WHERE id NOT IN (
                SELECT MIN(id) FROM "{table}" GROUP BY team_id, "{column}"
            )
        """)

    capsys.readouterr()  # drain
    mig.report_renames(ctx)  # second pre-scan: nothing left to rename
    assert "[0008] duplicate" not in capsys.readouterr().out

    keys = dict(ctx.conn.execute("SELECT id, \"key\" FROM projects").fetchall())
    assert keys["bbbbbbbb-2222"] == "PROJ-dup-bbbbbbbb"  # not double-suffixed
