"""Tests for migrations/0048_review_entry_body_is_the_attestation.py (CHT-2031).

Open REVIEW_REQUESTED entries take their attestation's note as body
(NULL when it has none, or the attestation is gone); every other entry
is left as it was.
"""
import sqlite3
from contextlib import closing

import pytest

from .test_parent_user_fk_migration import _migrate

PREVIOUS = "0047_attachments"
THIS = "0048_review_entry_body_is_the_attestation"
T0 = "2026-10-01 09:00:00.000000"

_ENTRY = (
    "INSERT INTO inbox_entries (id, recipient_user_id, kind, team_id, title, body, created_at, "
    "updated_at, ritual_id, issue_id, resolved_at, archived_at) "
    "VALUES (?, 'u1', ?, 't1', 'x', ?, ?, ?, ?, ?, ?, ?)"
)
_ATTESTATION = (
    "INSERT INTO ritual_attestations (id, ritual_id, issue_id, attested_by, attested_at, note) "
    "VALUES (?, ?, ?, 'agent', ?, ?)"
)


@pytest.fixture
def at_before(tmp_path):
    path = str(tmp_path / "inbox.db")
    _migrate(path, target=PREVIOUS)
    with closing(sqlite3.connect(path)) as c:
        c.executemany(_ATTESTATION, [
            ("a1", "r1", "i1", T0, "Tests pass at abc123\n"),
            ("a2", "r1", "i2", T0, None),
            ("a3", "r1", "i3", T0, " \n\t "),
            ("a5", "r1", "i5", T0, "Already the note"),
            ("a6", "r1", "i6", T0, "Resolved one"),
        ])
        c.executemany(_ENTRY, [
            ("open", "REVIEW_REQUESTED", "the prompt", T0, T0, "r1", "i1", None, None),
            ("no-note", "REVIEW_REQUESTED", "the prompt", T0, T0, "r1", "i2", None, None),
            ("blank-note", "REVIEW_REQUESTED", "the prompt", T0, T0, "r1", "i3", None, None),
            ("gone", "REVIEW_REQUESTED", "the prompt", T0, T0, "r1", "i4", None, None),
            ("same", "REVIEW_REQUESTED", "Already the note", T0, T0, "r1", "i5", None, None),
            ("resolved", "REVIEW_REQUESTED", "the prompt", T0, T0, "r1", "i6", T0, None),
            ("archived", "REVIEW_REQUESTED", "the prompt", T0, T0, "r1", "i1", None, T0),
            ("gate", "GATE_PENDING", "the prompt", T0, T0, "r1", "i1", None, None),
        ])
        c.commit()
    return path


def _rows(path):
    with closing(sqlite3.connect(path)) as c:
        return {r[0]: (r[1], r[2]) for r in c.execute("SELECT id, body, updated_at FROM inbox_entries")}


def _sources(path):
    with closing(sqlite3.connect(path)) as c:
        return dict(c.execute("SELECT id, source_user_id FROM inbox_entries"))


def test_open_review_entries_take_the_note(at_before):
    _migrate(at_before, target=THIS)
    rows = _rows(at_before)
    assert rows["open"][0] == "Tests pass at abc123"
    assert rows["no-note"][0] is None
    assert rows["blank-note"][0] is None
    assert rows["gone"][0] is None
    for changed in ("open", "no-note", "blank-note", "gone"):
        assert rows[changed][1] > T0, changed  # the sync scan sees it
    # Body already right, but the source was unset: filled, so it moves.
    assert rows["same"][0] == "Already the note" and rows["same"][1] > T0
    for kept in ("resolved", "archived", "gate"):
        assert rows[kept] == ("the prompt", T0), kept
    sources = _sources(at_before)
    assert sources["open"] == "agent"
    assert sources["gone"] is None
    assert sources["resolved"] is None and sources["gate"] is None


def test_nothing_to_change_leaves_the_entry_alone(tmp_path):
    path = str(tmp_path / "inbox.db")
    _migrate(path, target=PREVIOUS)
    with closing(sqlite3.connect(path)) as c:
        c.execute(_ATTESTATION, ("a1", "r1", "i1", T0, "Note"))
        c.execute(_ENTRY, ("e", "REVIEW_REQUESTED", "Note", T0, T0, "r1", "i1", None, None))
        c.execute("UPDATE inbox_entries SET source_user_id = 'someone' WHERE id = 'e'")
        c.commit()
    _migrate(path, target=THIS)
    assert _rows(path)["e"] == ("Note", T0)
    assert _sources(path)["e"] == "someone"


def test_source_backfilled_even_when_the_body_already_matches(tmp_path):
    path = str(tmp_path / "inbox.db")
    _migrate(path, target=PREVIOUS)
    with closing(sqlite3.connect(path)) as c:
        c.execute(_ATTESTATION, ("a1", "r1", "i1", T0, "Note"))
        c.execute(_ENTRY, ("e", "REVIEW_REQUESTED", "Note", T0, T0, "r1", "i1", None, None))
        c.commit()
    _migrate(path, target=THIS)
    assert _sources(path)["e"] == "agent"
    assert _rows(path)["e"][1] > T0


def test_entries_already_decided_are_settled(tmp_path):
    """PR #532 review: an entry left open although its review was approved
    (or its gate completed) leaves the Inbox; an unapproved one stays."""
    path = str(tmp_path / "inbox.db")
    _migrate(path, target=PREVIOUS)
    with closing(sqlite3.connect(path)) as c:
        c.executemany(_ATTESTATION, [
            ("a1", "r1", "i1", T0, "approved review"),
            ("a2", "r2", "i1", T0, "completed gate"),
            ("a3", "r1", "i3", T0, "still waiting"),
            ("a4", "r2", "i4", T0, "left from review mode"),
        ])
        c.execute("UPDATE ritual_attestations SET approved_at = ? WHERE id IN ('a1', 'a2')", (T0,))
        c.executemany(_ENTRY, [
            ("review-done", "REVIEW_REQUESTED", "x", T0, T0, "r1", "i1", None, None),
            ("gate-done", "GATE_PENDING", "x", T0, T0, "r2", "i1", None, None),
            ("review-open", "REVIEW_REQUESTED", "x", T0, T0, "r1", "i3", None, None),
            ("gate-open", "GATE_PENDING", "x", T0, T0, "r2", "i4", None, None),
            ("gate-none", "GATE_PENDING", "x", T0, T0, "r2", "i9", None, None),
            ("mention", "MENTION", "x", T0, T0, "r1", "i1", None, None),
        ])
        c.commit()
    _migrate(path, target=THIS)
    with closing(sqlite3.connect(path)) as c:
        rows = {r[0]: r[1:] for r in c.execute("SELECT id, resolved_at, read_at, updated_at FROM inbox_entries")}
    for done in ("review-done", "gate-done"):
        resolved_at, read_at, updated_at = rows[done]
        assert resolved_at and read_at and updated_at > T0, done
    for still in ("review-open", "gate-open", "gate-none", "mention"):
        assert rows[still][0] is None, still
