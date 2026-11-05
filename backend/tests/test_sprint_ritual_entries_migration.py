"""Tests for migrations/0049_sprint_ritual_inbox_entries.py (CHT-2032).

A sprint already in limbo gets the SPRINT_RITUAL entries it would have
got on entering limbo: each team admin, for each ungrouped GATE ritual
not yet done and each REVIEW ritual whose attestation awaits approval.
"""
import importlib.util
import sqlite3
from contextlib import closing
from pathlib import Path
from types import SimpleNamespace

import pytest

from .test_parent_user_fk_migration import _migrate

PREVIOUS = "0048_review_entry_body_is_the_attestation"
THIS = "0049_sprint_ritual_inbox_entries"
T0 = "2026-10-01 09:00:00.000000"


def _ritual(c, rid, project, mode, *, active=1, trigger="EVERY_SPRINT", group=None):
    c.execute(
        "INSERT INTO rituals (id, project_id, name, prompt, trigger, approval_mode, is_active, group_id, "
        "created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (rid, project, f"{rid}-name", f"{rid} asks", trigger, mode, active, group, T0, T0),
    )


@pytest.fixture
def at_before(tmp_path):
    path = str(tmp_path / "inbox.db")
    _migrate(path, target=PREVIOUS)
    with closing(sqlite3.connect(path)) as c:
        c.executemany(
            "INSERT INTO projects (id, team_id, name, key, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
            [("p1", "t1", "App", "APP", T0, T0), ("p2", "t1", "Ops", "OPS", T0, T0)],
        )
        c.executemany(
            "INSERT INTO team_members (id, team_id, user_id, role, joined_at) VALUES (?, 't1', ?, ?, ?)",
            [("m1", "alice", "OWNER", T0), ("m2", "bob", "ADMIN", T0), ("m3", "ada", "MEMBER", T0)],
        )
        c.executemany(
            "INSERT INTO sprints (id, project_id, name, status, limbo, created_at, updated_at) "
            "VALUES (?, ?, ?, 'ACTIVE', ?, ?, ?)",
            [("s1", "p1", "Sprint 12", 1, T0, T0), ("s2", "p2", "Sprint 3", 0, T0, T0)],
        )
        c.execute("INSERT INTO ritual_groups (id, project_id, name, selection_mode, created_at) "
                  "VALUES ('g1', 'p1', 'grp', 'RANDOM_ONE', ?)", (T0,))
        _ritual(c, "gate", "p1", "GATE")
        _ritual(c, "gate-done", "p1", "GATE")
        _ritual(c, "gate-grouped", "p1", "GATE", group="g1")
        _ritual(c, "gate-off", "p1", "GATE", active=0)
        _ritual(c, "gate-ticket", "p1", "GATE", trigger="TICKET_CLOSE")
        _ritual(c, "review", "p1", "REVIEW")
        _ritual(c, "review-unattested", "p1", "REVIEW")
        _ritual(c, "review-approved", "p1", "REVIEW")
        _ritual(c, "auto", "p1", "AUTO")
        _ritual(c, "other-gate", "p2", "GATE")  # its sprint is not in limbo
        c.executemany(
            "INSERT INTO ritual_attestations (id, ritual_id, sprint_id, attested_by, attested_at, note, "
            "approved_at) VALUES (?, ?, 's1', 'agent', ?, ?, ?)",
            [
                ("a1", "gate-done", T0, None, T0),
                ("a2", "review", T0, "  Retro notes  \n", None),
                ("a3", "review-approved", T0, "ok", T0),
            ],
        )
        # Bob already has the gate's entry: no second one.
        c.execute(
            "INSERT INTO inbox_entries (id, recipient_user_id, kind, team_id, project_id, ritual_id, title, "
            "created_at, updated_at) VALUES ('old', 'bob', 'SPRINT_RITUAL', 't1', 'p1', 'gate', 'x', ?, ?)",
            (T0, T0),
        )
        c.commit()
    return path


def _entries(path):
    with closing(sqlite3.connect(path)) as c:
        c.row_factory = sqlite3.Row
        return [dict(r) for r in c.execute("SELECT * FROM inbox_entries WHERE id != 'old'")]


def test_admins_get_the_entries_a_limbo_would_have_written(at_before):
    _migrate(at_before, target=THIS)
    got = {(e["recipient_user_id"], e["ritual_id"]): e for e in _entries(at_before)}
    assert set(got) == {("alice", "gate"), ("alice", "review"), ("bob", "review")}

    gate = got[("alice", "gate")]
    assert gate["kind"] == "SPRINT_RITUAL"
    assert gate["team_id"] == "t1" and gate["project_id"] == "p1"
    assert gate["title"] == "Sign-off needed: gate-name for Sprint 12"
    assert gate["body"] == "gate asks"
    assert gate["source_user_id"] is None
    assert gate["read_at"] is None and gate["resolved_at"] is None and gate["archived_at"] is None
    assert gate["updated_at"] > T0

    review = got[("bob", "review")]
    assert review["title"] == "Review requested: review-name for Sprint 12"
    assert review["body"] == "Retro notes"
    assert review["source_user_id"] == "agent"

    ids = [e["id"] for e in _entries(at_before)]
    assert len(set(ids)) == len(ids)
    assert all(len(i) == 36 and i[14] == "4" for i in ids)


def test_downgrade_removes_them(at_before):
    _migrate(at_before, target=THIS)
    spec = importlib.util.spec_from_file_location("m0049", Path(__file__).parent.parent / "migrations" / f"{THIS}.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    with closing(sqlite3.connect(at_before)) as c:
        module.downgrade(SimpleNamespace(execute=c.execute))
        c.commit()
        assert c.execute("SELECT count(*) FROM inbox_entries WHERE kind = 'SPRINT_RITUAL'").fetchone()[0] == 0
        assert c.execute("SELECT count(*) FROM inbox_entries").fetchone()[0] == 0
