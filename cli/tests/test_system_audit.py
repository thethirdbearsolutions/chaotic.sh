"""`chaotic system audit removed-members` (CHT-1820).

Before CHT-1791 a user could hold two team_members rows for one team.
Removing them deleted one, and the other kept them a member. The audit
finds rows whose (team, user) has a removal after the row's joined_at,
from the team activity log (CHT-1843), the database's MEMBER revocation
events and the server's request log, and writes no data.
"""
import hashlib
import json
import shlex
import sqlite3
from datetime import datetime

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

ACTIVITY_SCHEMA = """
CREATE TABLE IF NOT EXISTS oxyde_migrations (
    id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, applied_at TIMESTAMP NOT NULL
);
CREATE TABLE team_activities (
    id TEXT PRIMARY KEY, team_id TEXT NOT NULL, action TEXT NOT NULL, actor_id TEXT,
    target_user_id TEXT, invitation_id TEXT, email TEXT, role TEXT, old_role TEXT,
    created_at TEXT NOT NULL
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

    def activity_log(self, applied_at="2026-10-15 00:00:00"):
        """Migration 0038: the team_activities table, applied at
        `applied_at` (None: a table with no migration record)."""
        self.conn.executescript(ACTIVITY_SCHEMA)
        if applied_at is not None:
            self.conn.execute(
                "INSERT INTO oxyde_migrations (name, applied_at) VALUES ('0038_team_activities', ?)",
                (applied_at,),
            )
        self.conn.commit()

    def activity(self, id, team, target, at, action="MEMBER_REMOVED"):
        self.conn.execute(
            "INSERT INTO team_activities (id, team_id, action, actor_id, target_user_id, created_at) "
            "VALUES (?, ?, ?, 'admin', ?, ?)",
            (id, team, action, target, at),
        )
        self.conn.commit()

    def digest(self):
        return hashlib.sha256("\n".join(self.conn.iterdump()).encode()).hexdigest()


@pytest.fixture
def db(tmp_path):
    database = Db(tmp_path / "chaotic.db")
    yield database
    database.conn.close()


def run(*args, input=None):
    return CliRunner().invoke(system.system, ["audit", "removed-members", *args], input=input)


def ACCESS(team, user, status="204 No Content", method="DELETE", query=""):
    return f'INFO:     127.0.0.1:5000 - "{method} /api/teams/{team}/members/{user}{query} HTTP/1.1" {status}'


# Untimed: journalctl's default prefix has no year or offset; the bare log no time.
LOG = "\n".join([
    f"Oct 01 10:00:00 host uv[1]: {ACCESS('t1', 'u1')}",
    f"Oct 01 10:00:01 host uv[1]: {ACCESS('t1', 'u9', status='404 Not Found')}",
    f"Oct 01 10:00:02 host uv[1]: {ACCESS('t1', 'u8', status='403 Forbidden')}",
    f"Oct 01 10:00:03 host uv[1]: {ACCESS('t1', 'u7', method='GET', status='200 OK')}",
    ACCESS("t2", "u2", query="?x=1"),
]) + "\n"


def ids(report):
    return [f["member_id"] for f in report["findings"]]


class TestRemovalsInLog:
    def test_only_successful_member_deletes(self):
        found = system.removals_in_log(LOG.splitlines(keepends=True))
        assert [(r.team_id, r.user_id) for r in found] == [("t1", "u1"), ("t2", "u2")]
        assert all(r.at is None for r in found)

    def test_a_bare_204_without_the_reason_phrase_counts(self):
        line = 'INFO:     127.0.0.1:1 - "DELETE /api/teams/t1/members/u1 HTTP/1.1" 204'
        assert len(system.removals_in_log([line])) == 1

    @pytest.mark.parametrize("line", [
        # quoted inside another message, not uvicorn's access line
        'WARNING: title was INFO:     1.2.3.4:1 - "DELETE /api/teams/t1/members/u1 HTTP/1.1" 204',
        'Oct 01 10:00:00 host uv[1]: ERROR: x - "DELETE /api/teams/t1/members/u1 HTTP/1.1" 204',
        # the access line followed by more text
        'INFO:     1.2.3.4:1 - "DELETE /api/teams/t1/members/u1 HTTP/1.1" 204 No Content and more',
        # an app logger's line, which has no space after "INFO:"
        'INFO:app.x:     1.2.3.4:1 - "DELETE /api/teams/t1/members/u1 HTTP/1.1" 204',
    ])
    def test_the_whole_line_must_be_an_access_line(self, line):
        assert system.removals_in_log([line]) == []

    def test_short_iso_times_are_read_as_utc(self):
        (whole, precise) = system.removals_in_log([
            f"2026-10-14T14:00:00+0200 host uv[1]: {ACCESS('t1', 'u1')}",
            f"2026-10-14T12:00:00.250000+00:00 host uv[1]: {ACCESS('t1', 'u2')}",
        ])
        assert whole.at == datetime(2026, 10, 14, 12, 0, 0)
        assert whole.until == datetime(2026, 10, 14, 12, 0, 1)  # a whole second covers that second
        assert whole.text == "2026-10-14T14:00:00+0200"
        assert precise.at == precise.until == datetime(2026, 10, 14, 12, 0, 0, 250000)


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

        assert report["coverage"] == "partial" and report["log_removals"] is None
        assert report["recorded_since"] == "2026-10-14 12:00:00.000000"
        assert report["findings"] == [{
            "member_id": "m-left", "team_id": "t1", "user_id": "u1", "role": "MEMBER",
            "joined_at": "2026-10-01 09:00:00.000000",
            "removals": [{
                "source": "revocation_event", "activity_id": None, "revocation_event_id": "e1",
                "removed_at": "2026-10-14 12:00:00.000000", "ordering": "removed_after_joined",
            }],
            "remedy": ["as an admin of team t1: chaotic team use t1", "chaotic team remove-member u1"],
        }]

    def test_compares_times_not_text(self, db):
        # As text, a legacy 'T' form sorts after every space form of the
        # same day, so m2's removal would look later than its 13:00
        # membership. It is earlier, and m2 is not reported.
        db.event("e1", "t1", "u1", "2026-10-14T12:00:00+00:00")
        db.member("m1", "t1", "u1", "2026-10-14 11:30:00.000000+00:00")
        db.member("m2", "t2", "u1", "2026-10-14 13:00:00")
        db.event("e2", "t2", "u1", "2026-10-14T12:00:00Z")
        assert ids(system.audit_removed_members(db.path)) == ["m1"]

    def test_recorded_since_is_the_earliest_by_time(self, db):
        db.event("e1", "t1", "u1", "2026-10-14T09:00:00")      # sorts last as text, earliest in time
        db.event("e2", "t1", "u2", "2026-10-14 10:00:00.000000")
        assert system.audit_removed_members(db.path)["recorded_since"] == "2026-10-14T09:00:00"

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

    def test_an_owner_leftover_is_ended_by_hand(self, db):
        db.member("m-own", "t1", "u1", "2026-10-01 09:00:00", role="OWNER")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00")
        (finding,) = system.audit_removed_members(db.path)["findings"]
        remedy = "\n".join(finding["remedy"])
        assert "the team's only owner" in remedy
        assert "chaotic team transfer-ownership NEW_OWNER" in remedy
        assert "chaotic system backup" in remedy
        (delete,) = [step for step in finding["remedy"] if step.startswith("sqlite3 ")]
        assert shlex.split(delete)[2] == "DELETE FROM team_members WHERE id = 'm-own'"
        assert "revoke the keys user u1 holds" in remedy

    def test_an_owner_leftover_beside_another_owner_is_ended_through_the_api(self, db):
        """CHT-1848: an owner removes another owner while one remains."""
        db.member("m-own", "t1", "u1", "2026-10-01 09:00:00", role="OWNER")
        db.member("m-other", "t1", "u2", "2026-10-01 09:00:00", role="OWNER")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00")
        (finding,) = system.audit_removed_members(db.path)["findings"]
        assert finding["remedy"] == [
            "as another owner of team t1: chaotic team use t1",
            "chaotic team remove-member u1",
        ]

    def test_an_owner_who_cannot_act_as_one_does_not_count(self, db):
        """With a users table, the other owner must be a person with an
        active account, as the server requires."""
        db.conn.executescript(
            "CREATE TABLE users (id TEXT PRIMARY KEY, is_agent INTEGER NOT NULL, is_active INTEGER NOT NULL);"
            "INSERT INTO users VALUES ('u1', 0, 1), ('u-agent', 1, 1), ('u-off', 0, 0), ('u-ok', 0, 1);"
        )
        db.member("m-own", "t1", "u1", "2026-10-01 09:00:00", role="OWNER")
        db.member("m-agent", "t1", "u-agent", "2026-10-01 09:00:00", role="OWNER")
        db.member("m-off", "t1", "u-off", "2026-10-01 09:00:00", role="OWNER")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00")
        (finding,) = system.audit_removed_members(db.path)["findings"]
        assert any(step.startswith("sqlite3 ") for step in finding["remedy"])
        db.member("m-ok", "t1", "u-ok", "2026-10-01 09:00:00", role="OWNER")
        (finding,) = system.audit_removed_members(db.path)["findings"]
        assert finding["remedy"][-1] == "chaotic team remove-member u1"

    def test_two_owner_leftovers_do_not_count_each_other(self, db):
        db.member("m-a", "t1", "u1", "2026-10-01 09:00:00", role="OWNER")
        db.member("m-b", "t1", "u2", "2026-10-01 09:00:00", role="OWNER")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00")
        db.event("e2", "t1", "u2", "2026-10-14 12:00:00")
        findings = system.audit_removed_members(db.path)["findings"]
        assert len(findings) == 2
        for finding in findings:
            assert any(step.startswith("sqlite3 ") for step in finding["remedy"])

    def test_changes_no_data(self, db):
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00")
        before = db.digest()
        assert run("--db", str(db.path)).exit_code == 1
        assert db.digest() == before


class TestActivitySource:
    """The team activity log (migration 0038) has every removal since it
    was applied, connection or not (CHT-1843)."""

    def test_a_removal_that_ended_nothing_is_found(self, db):
        db.activity_log()
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00")
        db.activity("a1", "t1", "u1", "2026-10-16 12:00:00.000000")
        db.activity("a2", "t1", "u1", "2026-10-16 13:00:00.000000", action="ROLE_CHANGED")
        report = system.audit_removed_members(db.path)
        assert report["activity_since"] == "2026-10-15 00:00:00"
        (finding,) = report["findings"]
        assert finding["removals"] == [{
            "source": "team_activity", "activity_id": "a1", "revocation_event_id": None,
            "removed_at": "2026-10-16 12:00:00.000000", "ordering": "removed_after_joined",
        }]
        result = run("--db", str(db.path))
        assert result.exit_code == 1 and "team activity a1" in result.output

    def test_a_rejoin_after_the_removal_is_not_reported(self, db):
        db.activity_log()
        db.activity("a1", "t1", "u1", "2026-10-16 12:00:00")
        db.member("m-back", "t1", "u1", "2026-10-16 13:00:00")
        report = system.audit_removed_members(db.path)
        assert report["findings"] == [] and report["coverage"] == "complete"

    def test_memberships_newer_than_the_log_make_a_clean_result_without_one(self, db):
        db.activity_log()
        db.member("m1", "t1", "u1", "2026-10-15 00:00:00")
        result = run("--db", str(db.path), "--json")
        assert result.exit_code == system.AUDIT_CLEAN
        assert json.loads(result.stdout)["coverage"] == "complete"
        text = " ".join(run("--db", str(db.path)).output.split())
        assert "covers them all" in text and "No membership outlived a removal" in text

    def test_an_older_membership_still_needs_the_log(self, db):
        db.activity_log()
        db.member("m-old", "t1", "u1", "2026-10-14 23:59:59")
        assert run("--db", str(db.path)).exit_code == system.AUDIT_PARTIAL
        result = run("--db", str(db.path), "--log", "-", "--json", input="")
        assert result.exit_code == system.AUDIT_CLEAN
        assert json.loads(result.stdout)["coverage"] == "database+log"

    def test_a_table_without_a_migration_record_is_not_complete(self, db):
        db.activity_log(applied_at=None)
        db.member("m1", "t1", "u1", "2026-10-16 00:00:00")
        report = system.audit_removed_members(db.path)
        assert report["activity_since"] is None and report["coverage"] == "partial"

    def test_older_sources_count_only_before_the_log(self, db):
        """A removal after 0038 is the activity row's; the revocation event
        and the timed log line of the same removal are not listed again.
        Ones from before it, and an untimed line, still are."""
        db.activity_log()
        db.member("m1", "t1", "u1", "2026-10-01 09:00:00")
        db.activity("a1", "t1", "u1", "2026-10-16 12:00:00")
        db.event("e-new", "t1", "u1", "2026-10-16 12:00:00")
        db.event("e-old", "t1", "u1", "2026-10-14 12:00:00")
        log = "\n".join([
            f"2026-10-16T12:00:00+0000 host uv[1]: {ACCESS('t1', 'u1')}",
            f"2026-10-14T12:00:00+0000 host uv[1]: {ACCESS('t1', 'u1')}",
            ACCESS("t1", "u1"),
        ])
        report = json.loads(run("--db", str(db.path), "--log", "-", "--json", input=log).stdout)
        (finding,) = report["findings"]
        assert [(r["source"], r["activity_id"] or r["revocation_event_id"] or r["removed_at"])
                for r in finding["removals"]] == [
            ("team_activity", "a1"),
            ("revocation_event", "e-old"),
            ("request_log", "2026-10-14T12:00:00+0000"),
            ("request_log", None),
        ]

    def test_changes_no_data(self, db):
        db.activity_log()
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00")
        db.activity("a1", "t1", "u1", "2026-10-16 12:00:00")
        before = db.digest()
        assert run("--db", str(db.path)).exit_code == 1
        assert db.digest() == before


class TestActivityLogGaps:
    """PR #451 review 5: what the activity log does not have."""

    def test_a_removal_by_an_older_server_after_the_migrate_is_still_found(self, db):
        """A hand-run migrate against a live server: until it restarts, its
        removals write no activity row. Their revocation event and log
        line still count."""
        db.activity_log("2026-10-15 00:00:00")
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00")
        db.event("e-window", "t1", "u1", "2026-10-15 00:05:00")
        log = f"2026-10-15T00:06:00+0000 host uv[1]: {ACCESS('t1', 'u1')}"
        report = json.loads(run("--db", str(db.path), "--log", "-", "--json", input=log).stdout)
        (finding,) = report["findings"]
        assert [r["source"] for r in finding["removals"]] == ["revocation_event", "request_log"]

    def test_the_owner_remedy_writes_the_log_row_too(self, db):
        db.activity_log()
        db.member("m-own", "t1", "u1", "2026-10-01 09:00:00", role="OWNER")
        db.activity("a1", "t1", "u1", "2026-10-16 12:00:00")
        (finding,) = system.audit_removed_members(db.path)["findings"]
        (step,) = [s for s in finding["remedy"] if s.startswith("sqlite3 ")]
        sql = shlex.split(step)[2]
        assert sql.startswith("BEGIN; DELETE FROM team_members WHERE id = 'm-own';")
        db.conn.executescript(sql)
        assert db.conn.execute("SELECT count(*) FROM team_members").fetchone()[0] == 0
        rows = db.conn.execute(
            "SELECT team_id, action, actor_id, target_user_id, role, created_at FROM team_activities "
            "WHERE id != 'a1'"
        ).fetchall()
        assert [r[:5] for r in rows] == [("t1", "MEMBER_REMOVED", None, "u1", "OWNER")]
        assert system._parse_stored_datetime(rows[0][5]) is not None

    def test_without_the_activity_table_the_owner_remedy_is_the_bare_delete(self, db):
        db.member("m-own", "t1", "u1", "2026-10-01 09:00:00", role="OWNER")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00")
        (finding,) = system.audit_removed_members(db.path)["findings"]
        (step,) = [s for s in finding["remedy"] if s.startswith("sqlite3 ")]
        assert "team_activities" not in step


class TestLogSource:
    def test_log_removals_are_reported_with_unknown_order(self, db, tmp_path):
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00")   # removal only in the log
        db.member("m-ok", "t1", "u3", "2026-10-01 09:00:00")     # never removed
        db.member("m-both", "t2", "u2", "2026-10-01 09:00:00")   # in the log and the database
        db.event("e1", "t2", "u2", "2026-10-14 12:00:00")
        log = tmp_path / "server.log"
        log.write_text(LOG)
        result = run("--db", str(db.path), "--log", str(log), "--json")
        assert result.exit_code == 1
        report = json.loads(result.stdout)
        assert report["coverage"] == "database+log" and report["log_removals"] == 2
        by_id = {f["member_id"]: f for f in report["findings"]}
        assert set(by_id) == {"m-left", "m-both"}
        assert by_id["m-left"]["removals"] == [{
            "source": "request_log", "activity_id": None, "revocation_event_id": None,
            "removed_at": None, "ordering": "unknown",
        }]
        assert [r["source"] for r in by_id["m-both"]["removals"]] == ["revocation_event", "request_log"]

    def test_timed_log_removals_drop_rejoins(self, db):
        log = "\n".join([
            f"2026-10-14T12:00:00+0000 host uv[1]: {ACCESS('t1', 'u1')}",  # before m-back
            f"2026-10-14T12:00:00+0000 host uv[1]: {ACCESS('t1', 'u2')}",  # after m-left2
            f"2026-10-14T12:00:00+0000 host uv[1]: {ACCESS('t1', 'u3')}",  # same second as m-close
        ])
        db.member("m-back", "t1", "u1", "2026-10-14 12:00:05")
        db.member("m-left2", "t1", "u2", "2026-10-01 09:00:00")
        db.member("m-close", "t1", "u3", "2026-10-14 12:00:00.500000")
        report = json.loads(run("--db", str(db.path), "--log", "-", "--json", input=log).stdout)
        by_id = {f["member_id"]: f["removals"][0] for f in report["findings"]}
        assert set(by_id) == {"m-left2", "m-close"}
        assert by_id["m-left2"]["ordering"] == "removed_after_joined"
        assert by_id["m-left2"]["removed_at"] == "2026-10-14T12:00:00+0000"
        assert by_id["m-close"]["ordering"] == "unknown"

    def test_log_from_stdin(self, db):
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00")
        result = run("--db", str(db.path), "--log", "-", input=LOG)
        assert result.exit_code == 1, result.output
        assert "member m-left" in result.output and "per the log" in result.output
        assert "chaotic team use t1" in result.output and "chaotic team remove-member u1" in result.output

    def test_database_before_0024_is_audited_from_the_log_alone(self, tmp_path):
        path = tmp_path / "old.db"
        conn = sqlite3.connect(path)
        conn.execute("CREATE TABLE team_members (id TEXT, team_id TEXT, user_id TEXT, role TEXT, joined_at TEXT)")
        conn.execute("INSERT INTO team_members VALUES ('m1', 't1', 'u1', 'MEMBER', '2026-01-01 00:00:00')")
        conn.commit()
        conn.close()
        assert run("--db", str(path)).exit_code == system.AUDIT_PARTIAL
        log = tmp_path / "server.log"
        log.write_text(LOG)
        result = run("--db", str(path), "--log", str(log), "--json")
        assert result.exit_code == 1
        assert ids(json.loads(result.stdout)) == ["m1"]


class TestOutcomes:
    def test_text_output_lists_ids_and_exits_1(self, db):
        db.member("m-left", "t1", "u1", "2026-10-01 09:00:00")
        db.event("e1", "t1", "u1", "2026-10-14 12:00:00")
        result = run("--db", str(db.path))
        assert result.exit_code == 1, result.output
        assert "member m-left" in result.output and "user u1" in result.output
        assert "revocation event e1" in result.output
        assert "No data was written" in result.output

    def test_nothing_found_without_a_log_is_not_clean(self, db):
        db.member("m1", "t1", "u1", "2026-10-01 09:00:00")
        result = run("--db", str(db.path))
        assert result.exit_code == system.AUDIT_PARTIAL == 4
        text = " ".join(result.output.split())  # Rich wraps long lines
        assert "partial" in text and "--log" in text
        assert "not a clean result" in text
        result = run("--db", str(db.path), "--json")
        assert result.exit_code == 4
        assert json.loads(result.stdout)["coverage"] == "partial"

    def test_nothing_found_with_a_log_is_clean(self, db, tmp_path):
        db.member("m1", "t1", "u1", "2026-10-01 09:00:00")
        log = tmp_path / "server.log"
        log.write_text("")
        result = run("--db", str(db.path), "--log", str(log))
        assert result.exit_code == 0, result.output
        assert "No membership outlived a removal in the database or the log" in result.output
        report = json.loads(run("--db", str(db.path), "--log", str(log), "--json").stdout)
        assert report["coverage"] == "database+log" and report["findings"] == []

    def test_not_a_chaotic_database(self, tmp_path):
        path = tmp_path / "other.db"
        sqlite3.connect(path).execute("CREATE TABLE things (id TEXT)").connection.close()
        result = run("--db", str(path))
        assert result.exit_code == 2
        assert "team_members" in result.output

    def test_failure_under_json_is_json(self, tmp_path):
        result = run("--db", str(tmp_path / "nope.db"), "--json")
        assert result.exit_code == 2
        assert "no database file" in json.loads(result.stdout)["error"]

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
        result = run("--json")
        assert result.exit_code == 2 and "--db" in json.loads(result.stdout)["error"]
