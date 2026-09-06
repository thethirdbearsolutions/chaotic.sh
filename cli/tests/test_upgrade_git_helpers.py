"""The CHT-1357 ancestry helpers against a real git repository (CHT-1387).

test_upgrade_safety.py drives the upgrade command with is_ancestor mocked;
nothing there proves the actual `git rev-parse --verify --quiet <ref>^{commit}`,
`git merge-base --is-ancestor` and `git log -1 --format=%h (%cs)` invocations
do what the helpers assume. This builds a tiny history and checks them.
"""
import re
import subprocess

import pytest

from cli import system
from cli.system import describe_commit, is_ancestor, resolve_commit, upgrade_direction


def _git(repo, *args):
    return subprocess.run(
        ["git", *args], cwd=repo, check=True, capture_output=True, text=True,
        env={"GIT_AUTHOR_NAME": "t", "GIT_AUTHOR_EMAIL": "t@x", "GIT_COMMITTER_NAME": "t",
             "GIT_COMMITTER_EMAIL": "t@x", "HOME": str(repo), "PATH": "/usr/bin:/bin:/usr/local/bin"},
    ).stdout.strip()


@pytest.fixture
def history(tmp_path, monkeypatch):
    """main: A (tagged v1) -> B. feature: A -> C (diverged from B)."""
    repo = tmp_path / "server"
    repo.mkdir()
    _git(repo, "init", "-q", "-b", "main")
    (repo / "f").write_text("a")
    _git(repo, "add", "f"); _git(repo, "commit", "-q", "-m", "A")
    a = _git(repo, "rev-parse", "HEAD")
    _git(repo, "tag", "v1")
    (repo / "f").write_text("b")
    _git(repo, "commit", "-q", "-am", "B")
    b = _git(repo, "rev-parse", "HEAD")
    _git(repo, "checkout", "-q", "-b", "feature", a)
    (repo / "g").write_text("c")
    _git(repo, "add", "g"); _git(repo, "commit", "-q", "-m", "C")
    c = _git(repo, "rev-parse", "HEAD")
    _git(repo, "checkout", "-q", "main")
    monkeypatch.setattr(system, "SERVER_DIR", repo)
    return {"a": a, "b": b, "c": c}


class TestResolveCommit:
    def test_tag_branch_and_sha_resolve_to_full_shas(self, history):
        assert resolve_commit("v1") == history["a"]
        assert resolve_commit("main") == history["b"]
        assert resolve_commit("feature") == history["c"]
        assert resolve_commit(history["a"][:7]) == history["a"]

    def test_unknown_refs_are_none_not_errors(self, history):
        assert resolve_commit("v9") is None
        assert resolve_commit("no-such-branch") is None
        assert resolve_commit("0123456789abcdef0123456789abcdef01234567") is None


class TestAncestry:
    def test_is_ancestor_matches_git(self, history):
        a, b, c = history["a"], history["b"], history["c"]
        assert is_ancestor(a, b) and is_ancestor(a, c) and is_ancestor(a, a)
        assert not is_ancestor(b, a) and not is_ancestor(b, c) and not is_ancestor(c, b)

    def test_upgrade_direction_against_real_history(self, history):
        a, b, c = history["a"], history["b"], history["c"]
        assert upgrade_direction(a, b) == "forward"     # deploy main from the tag
        assert upgrade_direction(b, a) == "backward"    # the CHT-1357 trap: newest tag behind main
        assert upgrade_direction(b, c) == "diverged"
        assert upgrade_direction(b, b) == "same"
        assert upgrade_direction(None, b) == "unknown"


class TestDescribeCommit:
    def test_short_sha_and_commit_date(self, history):
        desc = describe_commit(history["a"])
        assert re.fullmatch(r"[0-9a-f]{7,} \(\d{4}-\d{2}-\d{2}\)", desc), desc
        assert desc.startswith(history["a"][:7])

    def test_unknown_sha_falls_back_to_the_prefix(self, history):
        assert describe_commit("0123456789abcdef0123456789abcdef01234567") == "0123456"
