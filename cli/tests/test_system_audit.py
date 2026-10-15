"""`chaotic system audit removed-members` (CHT-1820).

Before CHT-1791 a user could hold two team_members rows for one team.
Removing them deleted one, and the other kept them a member. The audit
finds rows whose (team, user) has a recorded removal (a MEMBER
revocation_events row) after the row's joined_at, and changes nothing.
"""
import hashlib
import json
import sqlite3

import pytest
from click.testing import CliRunner

from cli import system

SCHEMA = """
CREATE TABLE team_members (
    id TEXT PRIMARY KEY, team_id TEXT NOT NULL, user_id TEXT,
    role TEXT NOT NULL, joined_at TEXT NOT NULL
);
CREATE TABLE revocation_events (
    id TEXT PRIMARY KEY, seq INTEGER NOT NULL, team_id TEXT, actor_id TEXT,
    target_type TEXT NOT NULL, target_id TEXT, filter TEXT, dry_run INTEGER NOT NULL DEFAULT 0,
    cascade_counts TEXT, reason TEXT, created_at TEXT NOT NULL
);
"""


class Db:
    def __init__(self, path):
        self.path = path
        self.conn = sqlite3.connect(path)
        self.conn.execute("PRAGMA journal_mode=WAL")
        self.conn.executescript(SCHEMA)
        self.seq = 0

    def member(self, id, team, user, joined, role="MEMBER"):
        self.conn.execute(
            "INSERT INTO team_members (id, team_id, user_id, role, joined_at) VALUES (?, ?, ?, ?, ?)",
            (id, team, user, role, joined),
        )
        self.conn.commit()

    def event(self, id, team, target, at, target_type="MEMBER"):
        self.seq += 1
        self.conn.execute(
            "INSERT INTO revocation_events (id, seq, team_id, target_type, target_id, reason, created_at) "
            "VALUES (?, ?, ?, ?, ?, 'member_removed', ?)",
            (id, self.seq, team, target_type, target, at),
        )
        self.conn.commit()

    def digest(self):
        return hashlib.sha256(
            "\n".join(self.conn.iterdump()).encode()
        ).hexdigest()


@pytest.fixture
def db(tmp_path):
    database = Db(tmp_path / "chaotic.db")
    yield database
    database.conn.close()


def run(*args):
    return CliRunner().invoke(system.system, ["audit", "removed-members", *args])


LOG = """\
Oct 01 10:00:00 host uvicorn[1]: INFO:     127.0.0.1:5000 - "DELETE /api/teams/t1/members/u1 HTTP/1.1" 204
Oct 01 10:00:01 host uvicorn[1]: INFO:     127.0.0.1:5000 - "DELETE /api/teams/t1/members/u9 HTTP/1.1" 404
Oct 01 10:00:02 host uvicorn[1]: INFO:     127.0.0.1:5000 - "DELETE /api/teams/t1/members/u8 HTTP/1.1" 403
Oct 01 10:00:03 host uvicorn[1]: INFO:     127.0.0.1:5000 - "GET /api/teams/t1/members/u7 HTTP/1.1" 204
INFO:     127.0.0.1:5001 - "DELETE /api/teams/t2/members/u2?x=1 HTTP/1.1" 204
"""


class TestRemovalsInLog:
    def test_only_successful_member_deletes(self):
        assert system.removals_in_log(LOG.splitlines()) == {("t1", "u1"), ("t2", "u2")}


class TestAuditRemovedMembers:
    def test_reports_a_leftover_and_not_a_rejoin_or_a_bystander(self, db):
        # u1 held two rows; the removal deleted one, this one is left over.
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00.000000")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00.000000")
        # u2 was removed, then invited back: the new row postdates the removal.
        db.event("e2", "t1", "u2", "2026-10-14 12:00:00.000000")
        db.member("m-back", "t1", "u2", "2026-10-14 13:00:00.000000")
        # u1 is still a legitimate member of another team.
        db.member("m-other", "t2", "u1", "2026-10-01 09:00:00.000000")
        # u3 was never removed; a non-member event about u3 does not count.
        db.member("m-u3", "t1", "u3", "2026-10-01 09:00:00.000000")
        db.event("e3", "t1", "u3", "2026-10-14 12:00:00.000000", target_type="IDENTITY")

        report = system.audit_removed_members(db.path)

        assert report["recorded_since"] == "2026-10-14 12:00:00.000000"
        assert report["findings"] == [{
            "member_id": "m-left", "team_id": "t1", "user_id": "u1", "role": "MEMBER",
            "joined_at": "2026-10-01 09:00:00.000000",
            "removals": [{
                "source": "revocation_event", "revocation_event_id": "e1", "removed_at": "2026-10-14 12:00:00.000000",
                "ordering": "removed_after_joined",
            }],
        }]

    def test_compares_times_not_text(self, db):
        # As text, a legacy 'T' form sorts after every space form of the
        # same day, so m2's removal would look later than its 13:00
        # membership. It is earlier, and m2 is not reported.
        db.event("e1", "t1", "u1", "2026-10-14T12:00:00+00:00")
        db.member("m1", "t1", "u1", "2026-10-14 11:30:00.000000+00:00")
        db.member("m2", "t2", "u1", "2026-10-14 13:00:00")
        db.event("e2", "t2", "u1", "2026-10-14T12:00:00Z")
        assert [f["member_id"] for f in system.audit_removed_members(db.path)["findings"]] == ["m1"]

    def test_unparseable_timestamps_are_reported_not_dropped(self, db):
        db.member("m1", "t1", "u1", "garbage")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00")
        (finding,) = system.audit_removed_members(db.path)["findings"]
        assert finding["removals"][0]["ordering"] == "unknown"

    def test_several_removals_of_one_row_are_listed_together(self, db):
        db.member("m1", "t1", "u1", "2026-10-01 09:00:00")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00")
        db.event("e2", "t1", "u1", "2026-10-14 15:00:00")
        (finding,) = system.audit_removed_members(db.path)["findings"]
        assert [r["revocation_event_id"] for r in finding["removals"]] == ["e1", "e2"]

    def test_text_output_lists_ids_and_exits_1(self, db):
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00")
        result = run("--db", str(db.path))
        assert result.exit_code == 1, result.output
        assert "member m-left" in result.output and "user u1" in result.output
        assert "revocation event e1" in result.output
        assert "Nothing was changed" in result.output

    def test_json_output(self, db):
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00")
        result = run("--db", str(db.path), "--json")
        assert result.exit_code == 1
        report = json.loads(result.stdout)
        assert [f["member_id"] for f in report["findings"]] == ["m-left"]

    def test_clean_database_exits_0(self, db):
        db.member("m1", "t1", "u1", "2026-10-01 09:00:00")
        db.event("e1", "t1", "u2", "2026-10-14 12:00:00")
        result = run("--db", str(db.path))
        assert result.exit_code == 0, result.output
        assert "No membership outlived a removal found" in result.output
        assert json.loads(run("--db", str(db.path), "--json").stdout)["findings"] == []

    def test_no_recorded_removals_says_so(self, db):
        db.member("m1", "t1", "u1", "2026-10-01 09:00:00")
        result = run("--db", str(db.path))
        assert result.exit_code == 0
        assert "records no member removal" in result.output

    def test_changes_nothing(self, db):
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00")
        before = db.digest()
        assert run("--db", str(db.path)).exit_code == 1
        assert db.digest() == before

    def test_not_a_chaotic_database(self, tmp_path):
        path = tmp_path / "other.db"
        sqlite3.connect(path).execute("CREATE TABLE things (id TEXT)").connection.close()
        result = run("--db", str(path))
        assert result.exit_code == 2
        assert "team_members" in result.output

    def test_database_before_0024_is_audited_from_the_log_alone(self, tmp_path):
        path = tmp_path / "old.db"
        conn = sqlite3.connect(path)
        conn.execute("CREATE TABLE team_members (id TEXT, team_id TEXT, user_id TEXT, role TEXT, joined_at TEXT)")
        conn.execute("INSERT INTO team_members VALUES ('m1', 't1', 'u1', 'MEMBER', '2026-01-01 00:00:00')")
        conn.commit()
        conn.close()
        assert run("--db", str(path)).exit_code == 0
        log = tmp_path / "server.log"
        log.write_text(LOG)
        result = run("--db", str(path), "--log", str(log), "--json")
        assert result.exit_code == 1
        assert [f["member_id"] for f in json.loads(result.stdout)["findings"]] == ["m1"]

    def test_missing_file_is_not_created(self, tmp_path):
        path = tmp_path / "nope.db"
        result = run("--db", str(path))
        assert result.exit_code == 2
        assert not path.exists()

    def test_defaults_to_the_installed_servers_database(self, db, monkeypatch):
        monkeypatch.setattr(system, "is_server_installed", lambda: True)
        monkeypatch.setattr(system, "DATABASE_PATH", db.path)
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00")
        assert run().exit_code == 1

    def test_without_an_install_or_db_it_says_what_to_pass(self, monkeypatch):
        monkeypatch.setattr(system, "is_server_installed", lambda: False)
        result = run()
        assert result.exit_code == 2
        assert "--db" in result.output

    def test_log_removals_are_reported_with_unknown_order(self, db, tmp_path):
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00")   # removal only in the log
        db.member("m-ok", "t1", "u3", "2026-10-01 09:00:00")     # never removed
        db.member("m-both", "t2", "u2", "2026-10-01 09:00:00")   # in the log and the database
        db.event("e1", "t2", "u2", "2026-10-14 12:00:00")
        log = tmp_path / "server.log"
        log.write_text(LOG)
        report = json.loads(run("--db", str(db.path), "--log", str(log), "--json").stdout)
        assert report["log_removals"] == 2
        by_id = {f["member_id"]: f for f in report["findings"]}
        assert set(by_id) == {"m-left", "m-both"}
        assert by_id["m-left"]["removals"] == [{
            "source": "request_log", "revocation_event_id": None, "removed_at": None, "ordering": "unknown",
        }]
        assert [r["source"] for r in by_id["m-both"]["removals"]] == ["revocation_event", "request_log"]

    def test_log_from_stdin(self, db):
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00")
        result = CliRunner().invoke(
            system.system, ["audit", "removed-members", "--db", str(db.path), "--log", "-"], input=LOG,
        )
        assert result.exit_code == 1, result.output
        assert "member m-left" in result.output and "per the log" in result.output

    def test_without_a_log_it_says_most_removals_are_missed(self, db):
        db.member("m1", "t1", "u1", "2026-10-01 09:00:00")
        result = run("--db", str(db.path))
        assert "--log" in result.output
