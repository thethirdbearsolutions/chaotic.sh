"""`chaotic system audit shared-addresses` (CHT-1827).

Lists the accounts migration 0034 left without users.email_folded, by
id, with the account that holds the address, and writes no data.
"""
import json
import sqlite3

import pytest
from click.testing import CliRunner

from cli import system

SCHEMA = """
CREATE TABLE users (
    id TEXT PRIMARY KEY, email TEXT NOT NULL, email_folded TEXT, created_at TEXT NOT NULL
);
"""


@pytest.fixture
def db(tmp_path):
    path = tmp_path / "chaotic.db"
    conn = sqlite3.connect(path)
    conn.executescript(SCHEMA)
    rows = [
        ("holder", "Pair@example.com", "pair@example.com", "2026-01-01 00:00:00"),
        ("variant", "pair@example.com", None, "2026-01-02 00:00:00"),
        ("orphan", "Gone@example.com", None, "2026-01-03 00:00:00"),
        ("solo", "solo@example.com", "solo@example.com", "2026-01-04 00:00:00"),
    ]
    conn.executemany("INSERT INTO users VALUES (?, ?, ?, ?)", rows)
    conn.execute("INSERT INTO users VALUES ('blob', ?, NULL, '2026-01-05 00:00:00')", (b"\xff\xfe",))
    conn.commit()
    conn.close()
    return path


def run(*args):
    return CliRunner().invoke(system.system, ["audit", "shared-addresses", *args])


def test_report_lists_each_account_without_a_folded_address(db):
    report = system.audit_shared_addresses(db)
    by_id = {f["user_id"]: f for f in report["findings"]}
    assert list(by_id) == ["variant", "orphan", "blob"]
    assert by_id["variant"]["status"] == "shared"
    assert by_id["variant"]["holder_id"] == "holder"
    assert by_id["orphan"]["status"] == "free"
    assert by_id["orphan"]["holder_id"] is None
    assert by_id["blob"]["status"] == "unreadable"
    assert by_id["blob"]["email"] is None


def test_output_has_ids_and_no_addresses_by_default(db):
    result = run("--db", str(db))
    assert result.exit_code == system.AUDIT_FINDINGS, result.output
    assert "variant" in result.output and "older user holder" in result.output
    assert "@example.com" not in result.output
    assert "chaotic auth change-email" in result.output


def test_show_emails_prints_addresses(db):
    result = run("--db", str(db), "--show-emails")
    assert "pair@example.com" in result.output


def test_json_has_no_addresses_unless_asked(db):
    result = run("--db", str(db), "--json")
    assert result.exit_code == system.AUDIT_FINDINGS
    report = json.loads(result.output)
    assert all("email" not in f for f in report["findings"])
    shown = json.loads(run("--db", str(db), "--json", "--show-emails").output)
    assert shown["findings"][0]["email"] == "pair@example.com"


def test_clean_database_exits_zero(tmp_path):
    path = tmp_path / "chaotic.db"
    conn = sqlite3.connect(path)
    conn.executescript(SCHEMA)
    conn.execute("INSERT INTO users VALUES ('a', 'a@x.com', 'a@x.com', '2026-01-01')")
    conn.commit()
    conn.close()
    result = run("--db", str(path))
    assert result.exit_code == system.AUDIT_CLEAN
    assert "Every account holds its own email address" in result.output


def test_writes_nothing(db):
    before = db.read_bytes()
    run("--db", str(db))
    assert db.read_bytes() == before


@pytest.mark.parametrize("schema, message", [
    ("CREATE TABLE other (id TEXT);", "no users table"),
    ("CREATE TABLE users (id TEXT, email TEXT, created_at TEXT);", "migration 0034 has not run"),
])
def test_not_a_migrated_database(tmp_path, schema, message):
    path = tmp_path / "chaotic.db"
    conn = sqlite3.connect(path)
    conn.executescript(schema)
    conn.close()
    result = run("--db", str(path), "--json")
    assert result.exit_code == system.AUDIT_FAILED
    assert message in json.loads(result.output)["error"]


def test_missing_file(tmp_path):
    result = run("--db", str(tmp_path / "nope.db"))
    assert result.exit_code == system.AUDIT_FAILED


def test_no_installed_server(monkeypatch):
    monkeypatch.setattr(system, "is_server_installed", lambda: False)
    result = run("--json")
    assert result.exit_code == system.AUDIT_FAILED
    assert "--db" in json.loads(result.output)["error"]
