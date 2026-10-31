"""Tests for migrations/0040_session_names_without_ref.py (CHT-1869).

A database at 0039 holds session identities whose default names end in
a piece of their external_ref: the server's ``<registrar> · <ref[-8:]>``
and the CLI's ``<registrar> · <branch> · <session id[:6]>``. After 0040
those tails are random hex of the same length, the rest of each name is
kept, and every other name is as it was. Mention handles built from the
new names still follow CHT-1502: a shared handle reaches nobody, and
every principal shows a handle that reaches only them.
"""
import re
import sqlite3
import subprocess
import sys
from contextlib import closing
from types import SimpleNamespace

import pytest

from app.enums import AgentKind
from app.services.mention_handles import MentionDirectory

from .test_api_key_hash_migration import _ROLLBACK
from .test_parent_user_fk_migration import BACKEND, _migrate

PREVIOUS = "0039_session_emails_without_ref"
THIS = "0040_session_names_without_ref"
NOW = "2026-10-31T00:00:00+00:00"

REF_1 = "claude-code:session:5d1f0c2a-9b7e-4f3a-8c61-2e4d7a9b1f30"
REF_2 = "claude-code:session:aa11bb22-cc33-dd44-ee55-ff6677889900"
REF_3 = "claude-code:session:0c0ffee0-1111-2222-3333-444455556666"
OTHER_REF = "other-harness:abcdef12"
SHORT_REF = "abc"

# id -> (name, kind, external_ref)
RENAMED = {
    # The server's default.
    "srv": (f"Claude Code (cloud) · {REF_1[-8:]}", "SESSION", REF_1),
    # The same, its registrar renamed since: the head is not compared.
    "srv-renamed-registrar": (f"Some Old Name · {REF_2[-8:]}", "SESSION", REF_2),
    # The CLI's default.
    "cli": (f"Claude Code · cht-1499 · {REF_3[20:26]}", "SESSION", REF_3),
    # The server's default for a ref the CLI did not make.
    "srv-other": (f"Bot · {OTHER_REF[-8:]}", "SESSION", OTHER_REF),
    # A ref shorter than 8: Python's ref[-8:] is the whole ref.
    "srv-short": (f"Bot · {SHORT_REF}", "SESSION", SHORT_REF),
}
KEPT = {
    "hand": ("My session", "SESSION", "claude-code:session:11111111-2222-3333-4444-555555555555"),
    # Already random (made after CHT-1869).
    "new-form": ("Claude Code (cloud) · 0a1b2c3d", "SESSION", "claude-code:session:99999999-0000-0000-0000-000000000000"),
    # Not exactly the ref's piece.
    "short-tail": (f"Claude Code · main · {REF_1[20:25]}", "SESSION", REF_1),
    "upper-tail": (f"Claude Code · {REF_1[-8:].upper()}", "SESSION", REF_1),
    "not-last": (f"Claude Code · {REF_1[-8:]} · mine", "SESSION", REF_1),
    "no-sep": (f"Claude Code {REF_1[-8:]}", "SESSION", REF_1),
    # Another identity's ref, not its own.
    "someone-elses": (f"Claude Code · {REF_2[-8:]}", "SESSION", REF_1),
    # A non-CLI ref has no session-id tail.
    "other-cli-like": (f"Bot · {OTHER_REF[14:20]}", "SESSION", OTHER_REF),
    # Not session identities.
    "assistant": (f"Claude MCP · {REF_1[-8:]}", "ASSISTANT", REF_1),
    "person": (f"Person · {REF_1[-8:]}", None, REF_1),
}
USERS = {**RENAMED, **KEPT}


def _seed(path: str) -> None:
    with closing(sqlite3.connect(path)) as c:
        for user_id, (name, kind, ref) in USERS.items():
            is_agent = int(kind is not None)
            c.execute(
                "INSERT INTO users (id, email, email_folded, hashed_password, name, created_at, updated_at, "
                "is_agent, is_active, kind, external_ref) VALUES (?, ?, ?, '', ?, ?, ?, ?, 1, ?, ?)",
                (user_id, f"{user_id}@x.test", f"{user_id}@x.test", name, NOW, NOW, is_agent, kind,
                 ref if is_agent else None),
            )
        c.commit()


def _names(path: str) -> dict[str, str]:
    with closing(sqlite3.connect(path)) as c:
        return dict(c.execute("SELECT id, name FROM users"))


@pytest.fixture
def migrated(tmp_path):
    path = str(tmp_path / "names.db")
    _migrate(path, target=PREVIOUS)
    _seed(path)
    _migrate(path, target=THIS)
    return path


def test_default_tails_cut_from_the_ref_are_now_random(migrated):
    names = _names(migrated)
    for user_id, (old, _, ref) in RENAMED.items():
        old_head, old_tail = old.rsplit(" · ", 1)
        head, tail = names[user_id].rsplit(" · ", 1)
        assert head == old_head, names[user_id]
        width = 6 if user_id == "cli" else 8
        assert re.fullmatch(f"[0-9a-f]{{{width}}}", tail), names[user_id]
        assert tail != old_tail and tail not in ref


def test_every_other_name_is_kept(migrated):
    names = _names(migrated)
    for user_id, (name, _, _) in KEPT.items():
        assert names[user_id] == name


def test_the_database_is_intact(migrated):
    with closing(sqlite3.connect(migrated)) as c:
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]


def test_downgrade_keeps_the_new_names_and_reapplying_changes_nothing(migrated):
    before = _names(migrated)
    result = subprocess.run(
        [sys.executable, "-c", _ROLLBACK, migrated],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    assert THIS in result.stdout
    assert _names(migrated) == before
    # The new tails are not the ref's, so a second run matches nothing.
    _migrate(migrated, target=THIS)
    assert _names(migrated) == before


def _principal(user_id, name, kind):
    return SimpleNamespace(
        id=user_id, name=name, email=f"{user_id}@x.test", is_agent=kind is not None,
        kind=kind, is_active=True, agent_project_id=None,
    )


def test_mention_handles_hold_after_the_rename(migrated):
    """Each renamed identity's ``claude-<tail>`` handle reaches it alone."""
    names = _names(migrated)
    sessions = [_principal(i, names[i], AgentKind.SESSION) for i in ("srv", "cli")]
    directory = MentionDirectory(sessions)
    for s in sessions:
        handle = directory.handle_for(s.id)
        assert handle == f"claude-{s.name.rsplit(' · ', 1)[1]}"
        assert directory.resolve(handle) == s.id


def test_a_drawn_tail_shared_with_a_session_or_a_person_reaches_nobody(migrated):
    """The odds are tiny, but a rename cannot redraw: when two identities
    draw the same tail, or a person's handle is the new one, that handle
    names several and so reaches nobody (CHT-1502), and each of them
    shows another handle that reaches only them."""
    names = _names(migrated)
    tail = names["srv"].rsplit(" · ", 1)[1]
    with closing(sqlite3.connect(migrated)) as c:
        # Give a second identity the same tail, as an unlucky draw would.
        c.execute("UPDATE users SET name = ? WHERE id = 'cli'", (f"Claude Code · cht-1499 · {tail}",))
        c.commit()
    names = _names(migrated)
    a = _principal("srv", names["srv"], AgentKind.SESSION)
    b = _principal("cli", names["cli"], AgentKind.SESSION)
    person = _principal("p", f"Claude {tail}", None)  # whole-name handle claude-<tail>
    shared = f"claude-{tail}"

    for principals in ([a, b], [a, person], [a, b, person]):
        directory = MentionDirectory(principals)
        assert directory.ambiguous(shared) and directory.resolve(shared) is None
        handles = {p.id: directory.handle_for(p.id) for p in principals}
        assert shared not in handles.values()
        assert len(set(handles.values())) == len(principals)
        for user_id, handle in handles.items():
            assert directory.resolve(handle) == user_id
