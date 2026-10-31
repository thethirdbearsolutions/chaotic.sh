"""Tests for migrations/0040_session_names_without_ref.py (CHT-1869).

A database at 0039 holds session identities whose default names end in
a piece of their external_ref: the server's ``<registrar> · <ref[-8:]>``
and the CLI's ``<registrar> · <branch> · <session id[:6]>``. After 0040
those tails are random hex of the same length, the rest of each name is
kept, and every other name is as it was. Mention handles built from the
new names still follow CHT-1502: a shared handle reaches nobody, and
every principal shows a handle that reaches only them. Inbox titles
written with an old name follow the rename; bodies, which quote what
people wrote, do not.
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


OLD_SRV = RENAMED["srv"][0]
OLD_CLI = RENAMED["cli"][0]
OLD_TAIL = REF_1[-8:]
# id -> (kind, team, source, title, body). The title each should have
# after 0040 is built in the tests from the new names.
INBOX = {
    "mention": ("MENTION", "t1", "srv", f"{OLD_SRV} mentioned you in CHT-1", f"@claude-{OLD_TAIL} see this"),
    "assign": ("ASSIGNMENT", "t1", "cli", f"{OLD_CLI} assigned you CHT-2", "Fix it"),
    "rejected-attester": (
        "GATE_REJECTED", "t1", "person", f"Person rejected {OLD_SRV}'s review: Tests on CHT-3", None,
    ),
    "rejected-by-session": (
        "GATE_REJECTED", "t1", "srv", f"{OLD_SRV} rejected your review: Tests on CHT-4", None,
    ),
}
INBOX_KEPT = {
    # Caused by someone else, though it starts with the old name.
    "other-source": ("MENTION", "t1", "hand", f"{OLD_SRV} mentioned you in CHT-5", None),
    # Caused by it, but not starting with its name.
    "not-prefix": ("ASSIGNMENT", "t1", "srv", f"Someone assigned you {OLD_SRV}", None),
    # Another team's entry.
    "other-team": ("MENTION", "t2", "srv", f"{OLD_SRV} mentioned you in OTH-1", None),
    # Names the agent, and goes only to its holder or an admin.
    "agent-status": ("AGENT_STATUS", "t1", "person", f"Person deactivated your agent {OLD_SRV}", None),
    # Not a rejection: the attester rewrite is for those only.
    "mention-not-rejection": ("MENTION", "t1", "person", f"Person rejected {OLD_SRV}'s idea in CHT-6", None),
}
OLD_UPDATED = "2026-01-01 00:00:00.000000"


def _seed(path: str) -> None:
    with closing(sqlite3.connect(path)) as c:
        # (team, ref) is unique, and several rows share REF_1: those that
        # no inbox entry needs in t1 get a team of their own.
        teams = {u: ("t1" if u in ("srv", "cli", "hand") else f"t-{u}") for u in USERS}
        for team in {"t1", "t2", *teams.values()}:
            c.execute(
                "INSERT INTO teams (id, name, key, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
                (team, team, team.upper(), NOW, NOW),
            )
        for user_id, (name, kind, ref) in USERS.items():
            is_agent = int(kind is not None)
            c.execute(
                "INSERT INTO users (id, email, email_folded, hashed_password, name, created_at, updated_at, "
                "is_agent, is_active, kind, external_ref, agent_team_id) "
                "VALUES (?, ?, ?, '', ?, ?, ?, ?, 1, ?, ?, ?)",
                (user_id, f"{user_id}@x.test", f"{user_id}@x.test", name, NOW, NOW, is_agent, kind,
                 ref if is_agent else None, teams[user_id] if is_agent else None),
            )
        for entry_id, (kind, team, source, title, body) in {**INBOX, **INBOX_KEPT}.items():
            c.execute(
                "INSERT INTO inbox_entries (id, recipient_user_id, kind, team_id, source_user_id, title, body, "
                "created_at, updated_at) VALUES (?, 'person', ?, ?, ?, ?, ?, ?, ?)",
                (entry_id, kind, team, source, title, body, NOW, OLD_UPDATED),
            )
        c.commit()


def _inbox(path: str) -> dict[str, tuple]:
    with closing(sqlite3.connect(path)) as c:
        return {row[0]: row[1:] for row in c.execute("SELECT id, title, body, updated_at FROM inbox_entries")}


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


def test_inbox_titles_follow_the_rename(migrated):
    names, inbox = _names(migrated), _inbox(migrated)
    expected = {
        "mention": f"{names['srv']} mentioned you in CHT-1",
        "assign": f"{names['cli']} assigned you CHT-2",
        "rejected-attester": f"Person rejected {names['srv']}'s review: Tests on CHT-3",
        "rejected-by-session": f"{names['srv']} rejected your review: Tests on CHT-4",
    }
    for entry_id, title in expected.items():
        got_title, body, updated_at = inbox[entry_id]
        assert got_title == title
        assert body == INBOX[entry_id][4]  # bodies quote what people wrote: kept
        # Bumped, in the stored form, so syncing clients fetch it again.
        assert updated_at > OLD_UPDATED
        assert re.fullmatch(r"\d{4}-\d\d-\d\d \d\d:\d\d:\d\d\.\d{6}", updated_at), updated_at
        assert OLD_TAIL not in got_title


def test_other_inbox_entries_are_untouched(migrated):
    inbox = _inbox(migrated)
    for entry_id, (_, _, _, title, body) in INBOX_KEPT.items():
        assert inbox[entry_id] == (title, body, OLD_UPDATED)


def test_the_temp_table_is_gone(migrated):
    with closing(sqlite3.connect(migrated)) as c:
        assert not c.execute("SELECT name FROM sqlite_master WHERE name LIKE '%cht1869%'").fetchall()


def test_the_database_is_intact(migrated):
    with closing(sqlite3.connect(migrated)) as c:
        assert c.execute("PRAGMA integrity_check").fetchall() == [("ok",)]


def test_downgrade_keeps_the_new_names_and_reapplying_changes_nothing(migrated):
    before = _names(migrated), _inbox(migrated)
    result = subprocess.run(
        [sys.executable, "-c", _ROLLBACK, migrated],
        cwd=BACKEND, capture_output=True, text=True, timeout=300, stdin=subprocess.DEVNULL,
    )
    assert result.returncode == 0, result.stderr[-2000:]
    assert THIS in result.stdout
    assert (_names(migrated), _inbox(migrated)) == before
    # The new tails are not the ref's, so a second run matches nothing.
    _migrate(migrated, target=THIS)
    assert (_names(migrated), _inbox(migrated)) == before


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
