"""Tests for migrations/0039_session_emails_without_ref.py (CHT-1864).

A database at 0038 holds session identities whose addresses carry a
slug of their external_ref. After 0039 each has a new random address
with nothing of the ref in it, its email_folded matches, and no other
account changed. The downgrade leaves the rows as they are.
"""
import re
import sqlite3
import subprocess
import sys
from contextlib import closing

import pytest

from .test_api_key_hash_migration import _ROLLBACK
from .test_parent_user_fk_migration import BACKEND, _migrate

PREVIOUS = "0038_team_activities"
THIS = "0039_session_emails_without_ref"
NOW = "2026-10-15T00:00:00+00:00"
NEW_FORM = re.compile(r"session-[0-9a-f]{32}@agent\.local")

REF_1 = "claude-code:session:5d1f0c2a-9b7e-4f3a-8c61-2e4d7a9b1f30"
REF_2 = "claude-code:session:aa11bb22-cc33-dd44-ee55-ff6677889900"
# id -> (email, kind, is_agent, external_ref)
USERS = {
    "s1": ("session-9b7e-4f3a-8c61-2e4d7a9b1f30-0123456789ab@agent.local", "SESSION", 1, REF_1),
    "s2": ("session-dd44-ee55-ff6677889900-ba9876543210@agent.local", "SESSION", 1, REF_2),
    # A session identity made by hand, not by the registrar: left alone.
    "s-hand": ("hand@agent.local", "SESSION", 1, "hand-ref"),
    # Not session identities, though one looks like the old form.
    "assistant": ("session-looks-alike-000000000000@agent.local", "ASSISTANT", 1, None),
    "service": ("agent-6b1c@agent.local", "SERVICE", 1, None),
    "person": ("Person@Example.com", None, 0, None),
}


def carries_ref(email: str, ref: str, run: int = 8) -> bool:
    """Does `email`, past its fixed ``session-`` prefix, hold any `run`
    consecutive alphanumerics of `ref` (case and punctuation ignored)?
    The old address held 24 of them. The prefix is skipped because a
    ref may itself say "session" (``claude-code:session:…``), and a
    random digit after it would then match. A random 32-hex address
    matches by chance about once in ten million."""
    local = (email or "").lower().split("@")[0].removeprefix("session-")
    ref_chars = re.sub(r"[^0-9a-z]", "", ref.lower())
    mail_chars = re.sub(r"[^0-9a-z]", "", local)
    return any(ref_chars[i:i + run] in mail_chars for i in range(len(ref_chars) - run + 1))


def test_the_old_form_is_caught():
    assert carries_ref(USERS["s1"][0], REF_1)
    assert carries_ref(USERS["s2"][0], REF_2)


def _seed(path: str) -> None:
    with closing(sqlite3.connect(path)) as c:
        for user_id, (email, kind, is_agent, ref) in USERS.items():
            c.execute(
                "INSERT INTO users (id, email, email_folded, hashed_password, name, created_at, updated_at, "
                "is_agent, is_active, kind, external_ref) VALUES (?, ?, ?, '', ?, ?, ?, ?, 1, ?, ?)",
                (user_id, email, email.lower(), user_id, NOW, NOW, is_agent, kind, ref),
            )
        c.commit()


def _rows(path: str) -> dict[str, tuple]:
    with closing(sqlite3.connect(path)) as c:
        return {row[0]: row[1:] for row in c.execute("SELECT id, email, email_folded FROM users")}


@pytest.fixture
def migrated(tmp_path):
    path = str(tmp_path / "sessions.db")
    _migrate(path, target=PREVIOUS)
    _seed(path)
    _migrate(path, target=THIS)
    return path


def test_old_session_addresses_are_rewritten_without_the_ref(migrated):
    rows = _rows(migrated)
    for user_id, ref in (("s1", REF_1), ("s2", REF_2)):
        email, folded = rows[user_id]
        assert NEW_FORM.fullmatch(email), email
        assert folded == email
        assert not carries_ref(email, ref), email
    assert rows["s1"][0] != rows["s2"][0]


def test_other_accounts_are_untouched(migrated):
    rows = _rows(migrated)
    for user_id in ("s-hand", "assistant", "service", "person"):
        assert rows[user_id] == (USERS[user_id][0], USERS[user_id][0].lower())


def test_the_unique_indexes_still_hold(migrated):
    with closing(sqlite3.connect(migrated)) as c:
        taken = c.execute("SELECT email FROM users WHERE id = 's1'").fetchone()[0]
        with pytest.raises(sqlite3.IntegrityError):
            c.execute(
                "INSERT INTO users (id, email, email_folded, hashed_password, name, created_at, updated_at, "
                "is_agent, is_active) VALUES ('dup', ?, ?, '', 'dup', ?, ?, 1, 1)",
                (taken.upper(), taken, NOW, NOW),
            )
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]


def test_downgrade_keeps_the_new_addresses(migrated):
    before = _rows(migrated)
    result = subprocess.run(
        [sys.executable, "-c", _ROLLBACK, migrated],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    assert THIS in result.stdout
    assert _rows(migrated) == before
