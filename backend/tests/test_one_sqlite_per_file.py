"""One SQLite library per open database file (CHT-1491).

Oxyde links its own copy of SQLite, and `import sqlite3` is a second one.
POSIX locks are per process, so neither copy sees the other's locks on a
database they both have open. Python's copy then takes itself for the only
user of a WAL database Oxyde is using: it truncates the -shm index Oxyde has
mapped, and it drops Oxyde's locks when it closes. That gives SIGBUS, or
"database disk image is malformed" on Oxyde's next write. In CI it hit one
xdist worker's first ~100 tests: migrations 0008 and 0019 did this while
every worker built its schema template. These tests keep it from coming back.
"""
import re
import sqlite3
from pathlib import Path

import pytest

from .conftest import _build_schema_template

BACKEND = Path(__file__).resolve().parents[1]
# Modules that would open the database with a SQLite other than Oxyde's:
# sqlite3 itself, and the libraries built on it.
_SECOND_SQLITE = r"(?:sqlite3|aiosqlite|sqlalchemy)"
# Any import statement naming one (`import os, sqlite3` included), or a
# dynamic import of one.
_SQLITE3_IMPORT = re.compile(
    rf"^\s*(?:import|from)\s[^\n#]*\b{_SECOND_SQLITE}\b"
    rf"|(?:__import__|import_module)\(\s*['\"]{_SECOND_SQLITE}\b",
    re.MULTILINE,
)


@pytest.mark.parametrize(
    "line",
    [
        "import sqlite3",
        "import os, sqlite3",
        "from sqlite3 import connect",
        "    import aiosqlite",
        "from sqlalchemy.ext.asyncio import create_async_engine",
        'db = __import__("sqlite3")',
        "importlib.import_module('aiosqlite')",
    ],
)
def test_the_guard_recognises_a_second_sqlite(line):
    assert _SQLITE3_IMPORT.search(line)


@pytest.mark.parametrize(
    "line",
    ['url = "sqlite+aiosqlite:///x.db"', "# no sqlite3 here", "from oxyde import execute_raw"],
)
def test_the_guard_ignores_mentions_that_are_not_imports(line):
    assert not _SQLITE3_IMPORT.search(line)


@pytest.mark.parametrize("tree", ["app", "migrations", "oxyde_config.py"])
def test_server_side_code_never_imports_sqlite3(tree):
    """Everything under app/ and migrations/, and oxyde_config.py, runs in
    a process where Oxyde may have the database open: the server, `oxyde
    migrate`, and the startup bootstrap. Read the database through Oxyde
    instead, as 0008's and 0019's `_read_through_oxyde` do."""
    root = BACKEND / tree
    files = [root] if root.is_file() else sorted(root.rglob("*.py"))
    offenders = [
        str(path.relative_to(BACKEND)) for path in files if _SQLITE3_IMPORT.search(path.read_text())
    ]
    assert offenders == []


def test_the_migration_chain_never_opens_its_target_with_sqlite3(tmp_path, monkeypatch):
    """The whole chain, applied as the template builder applies it, with
    Python's sqlite3 unusable. It fails if any migration opens the database
    a second way while Oxyde holds it."""
    def refuse(*args, **kwargs):
        raise AssertionError(f"a migration opened the database with Python's sqlite3: {args!r}")

    monkeypatch.setattr(sqlite3, "connect", refuse)
    _build_schema_template(str(tmp_path / "chain.db"))


def test_the_schema_template_is_handed_over_out_of_wal_mode(schema_template):
    """Each test copies the template with Python's sqlite3, and Oxyde's
    close can still be running when disconnect_all() returns. In rollback
    mode there is no -wal or -shm for the two libraries to share."""
    with open(schema_template, "rb") as f:
        header = f.read(20)
    assert (header[18], header[19]) == (1, 1), "header still says WAL"
    assert not Path(schema_template + "-wal").exists()
    assert not Path(schema_template + "-shm").exists()
