"""`system upgrade` does its slow work before stopping the server (CHT-1969).

The dependency sync and the frontend build run in a staging checkout while
the old server keeps serving; the stopped window only checks out, syncs
from a warm cache, migrates, copies the built bundle in and starts.
"""
import re
import subprocess
from contextlib import ExitStack
from unittest.mock import MagicMock, patch

from click.testing import CliRunner

from cli import system
from cli.system import (
    FRONTEND_BUNDLE,
    PreparedRelease,
    install_prepared_frontend,
    prepare_release,
)

_COMMITS = ("19ae385deployed", "ab71cd5newer")


def _flat(output: str) -> str:
    return re.sub(r"\s+", " ", output)


def _upgrade(*args, calls=None, **overrides):
    """`system upgrade --yes` with every collaborator mocked; a forward
    upgrade of a running server. `calls` collects the order in which the
    named steps ran."""
    commits = iter(_COMMITS)
    calls = calls if calls is not None else []

    def recorder(name, value):
        def f(*a, **k):
            calls.append(name)
            return value
        return f

    patches = {
        "is_server_installed": dict(return_value=True),
        "get_current_version": dict(return_value="v0.1.0a19"),
        "get_current_commit": dict(side_effect=lambda: next(commits, _COMMITS[-1])),
        "fetch_updates": dict(return_value=True),
        "get_latest_version": dict(return_value="v0.1.0a20"),
        "resolve_commit": dict(return_value=_COMMITS[1]),
        "is_ancestor": dict(side_effect=lambda older, newer: (older, newer) == _COMMITS),
        "validate_git_ref": dict(return_value=True),
        "run_command": dict(return_value=MagicMock(returncode=0, stdout="")),
        "wait_for_service_settled": dict(return_value="active"),
        "service_state": dict(return_value="active"),
        "is_service_running": dict(return_value=True),
        "stop_service": dict(side_effect=recorder("stop", True)),
        "wait_for_service_stop": dict(return_value=True),
        "start_service": dict(side_effect=recorder("start", True)),
        "health_check": dict(return_value=True),
        "load_server_json": dict(return_value={"port": 24267}),
        "get_remote_version": dict(return_value=None),
        "verify_deployed_commit": dict(return_value=(True, "ab71cd5")),
        "checkout_version": dict(side_effect=recorder("checkout", (True, None))),
        "restore_backup": dict(return_value=True),
        "resync_checkout": dict(return_value=(True, "re-synced")),
        "run_migrations": dict(side_effect=recorder("migrate", (True, "ok"))),
        "rebuild_frontend": dict(side_effect=recorder("rebuild_frontend", (True, "built"))),
        "prepare_release": dict(side_effect=recorder(
            "prepare", PreparedRelease(True, "dependencies synced", staged=True, bundle=None,
                                       frontend_message="skipped (no frontend/package.json)",
                                       commit=_COMMITS[1]))),
    }
    patches.update(overrides)
    with ExitStack() as stack:
        mocks = {name: stack.enter_context(patch(f"cli.system.{name}", **kw)) for name, kw in patches.items()}
        result = CliRunner().invoke(system.system, ["upgrade", "--yes", "--no-backup", *args])
    return result, mocks


class TestUpgradeOrder:
    def test_prepares_before_stopping_and_reports_downtime(self):
        calls = []
        result, m = _upgrade(calls=calls)

        assert result.exit_code == 0, result.output
        assert calls[:2] == ["prepare", "stop"]
        assert calls.index("checkout") > calls.index("stop")
        m["prepare_release"].assert_called_once_with(_COMMITS[1])
        out = _flat(result.output)
        assert "Preparing the new version while the server keeps running" in out
        assert re.search(r"Server was down for \d+\.\ds\.", out)
        # Staging ran, so the window never runs npm.
        assert "rebuild_frontend" not in calls

    def test_failed_preparation_never_stops_the_server(self):
        result, m = _upgrade(prepare_release=dict(
            return_value=PreparedRelease(False, "Dependency sync failed for the target version:\nlock stale")))

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "Dependency sync failed for the target version" in out
        assert "Nothing was changed and the server was not stopped" in out
        m["stop_service"].assert_not_called()
        m["checkout_version"].assert_not_called()
        m["run_migrations"].assert_not_called()

    def test_no_staging_falls_back_to_building_in_the_window(self):
        calls = []
        result, m = _upgrade(calls=calls, prepare_release=dict(
            return_value=PreparedRelease(True, "could not create the staging checkout (x); "
                                               "preparing during the stop instead")))

        assert result.exit_code == 0, result.output
        assert "rebuild_frontend" in calls
        assert calls.index("rebuild_frontend") > calls.index("migrate")

    def test_fake_initial_on_current_code_does_not_prepare(self):
        commits = iter([_COMMITS[1]] * 10)
        result, m = _upgrade(
            "--fake-initial",
            get_current_commit=dict(side_effect=lambda: next(commits)),
            is_ancestor=dict(return_value=True),
        )

        assert result.exit_code == 0, result.output
        m["prepare_release"].assert_not_called()


def _git_ok(cmd, **kwargs):
    return MagicMock(returncode=0, stdout="")


class TestPrepareRelease:
    def test_creates_the_worktree_then_syncs_and_builds_there(self, monkeypatch):
        staging = system.STAGING_DIR
        (staging / "frontend").mkdir(parents=True)  # leftover, not a worktree: replaced
        (staging / "frontend" / "stale").write_text("x")
        cmds = []

        def run(cmd, cwd=None, **kwargs):
            cmds.append((cmd, cwd))
            if cmd[:3] == ["git", "worktree", "add"]:
                assert not staging.exists()  # the leftover was removed first
                (staging / "frontend").mkdir(parents=True)
                (staging / "frontend" / "package.json").write_text("{}")
                (staging / ".git").write_text("gitdir: x")
            if cmd[:3] == ["npm", "run", "build"]:
                (staging / FRONTEND_BUNDLE).parent.mkdir(parents=True, exist_ok=True)
                (staging / FRONTEND_BUNDLE).write_text("bundle")
            return MagicMock(returncode=0, stdout="")

        monkeypatch.setattr(system.shutil, "which", lambda name: f"/usr/bin/{name}")
        with patch("cli.system.run_command", side_effect=run):
            prepared = prepare_release("ab71cd5newer")

        assert prepared.ok and prepared.staged
        assert prepared.bundle == staging / FRONTEND_BUNDLE
        assert prepared.commit == "ab71cd5newer"
        names = [c for c, _ in cmds]
        assert ["git", "worktree", "prune"] in names
        assert ["git", "worktree", "add", "--detach", "--force", str(staging), "ab71cd5newer"] in names
        assert (["just", "sync"], staging) in cmds
        assert (["npm", "ci"], staging / "frontend") in cmds
        # Nothing ran in the server checkout but git's worktree bookkeeping.
        assert all(cwd in (staging, staging / "frontend") or c[:2] == ["git", "worktree"]
                   for c, cwd in cmds)

    def test_reuses_an_existing_worktree(self, monkeypatch):
        staging = system.STAGING_DIR
        staging.mkdir(parents=True)
        (staging / ".git").write_text("gitdir: x")
        monkeypatch.setattr(system.shutil, "which", lambda name: None)
        with patch("cli.system.run_command", side_effect=_git_ok) as run:
            prepared = prepare_release("ab71cd5newer")

        cmds = [c.args[0] for c in run.call_args_list]
        assert cmds[0] == ["git", "checkout", "--detach", "--force", "ab71cd5newer"]
        assert not any(c[:2] == ["git", "worktree"] for c in cmds)
        assert prepared.ok and prepared.staged and prepared.bundle is None
        assert prepared.frontend_message.startswith("skipped")

    def test_sync_failure_is_fatal(self, monkeypatch):
        def run(cmd, **kwargs):
            if cmd == ["just", "sync"]:
                raise subprocess.CalledProcessError(1, cmd, output="", stderr="lockfile needs updating")
            return MagicMock(returncode=0, stdout="")

        with patch("cli.system.run_command", side_effect=run):
            prepared = prepare_release("ab71cd5newer")

        assert not prepared.ok
        assert "lockfile needs updating" in prepared.message

    def test_worktree_failure_falls_back(self):
        def run(cmd, **kwargs):
            if cmd[:3] == ["git", "worktree", "add"]:
                raise subprocess.CalledProcessError(128, cmd, output="", stderr="fatal: no space")
            return MagicMock(returncode=0, stdout="")

        with patch("cli.system.run_command", side_effect=run):
            prepared = prepare_release("ab71cd5newer")

        assert prepared.ok and not prepared.staged
        assert "fatal: no space" in prepared.message

    def test_frontend_failure_is_not_fatal(self, monkeypatch):
        monkeypatch.setattr(system.shutil, "which", lambda name: f"/usr/bin/{name}")

        def run(cmd, cwd=None, **kwargs):
            if cmd[:3] == ["git", "worktree", "add"]:
                (system.STAGING_DIR / "frontend").mkdir(parents=True)
                (system.STAGING_DIR / "frontend" / "package.json").write_text("{}")
            if cmd[:2] == ["npm", "ci"]:
                raise subprocess.CalledProcessError(1, cmd, output="", stderr="ERESOLVE")
            return MagicMock(returncode=0, stdout="")

        with patch("cli.system.run_command", side_effect=run):
            prepared = prepare_release("ab71cd5newer")

        assert prepared.ok and prepared.staged and prepared.bundle is None
        assert "ERESOLVE" in prepared.frontend_message


class TestInstallPreparedFrontend:
    def _bundle(self, tmp_path, text="new bundle"):
        bundle = tmp_path / "staged" / FRONTEND_BUNDLE
        bundle.parent.mkdir(parents=True)
        bundle.write_text(text)
        return bundle

    def test_copies_the_staged_bundle(self, tmp_path, monkeypatch):
        project = tmp_path / "server"
        (project / FRONTEND_BUNDLE).parent.mkdir(parents=True)
        (project / FRONTEND_BUNDLE).write_text("old bundle")
        monkeypatch.setattr(system, "PROJECT_DIR", project)
        prepared = PreparedRelease(True, "", staged=True, bundle=self._bundle(tmp_path),
                                   frontend_message="built", commit="ab71cd5newer")
        with patch("cli.system.get_current_commit", return_value="ab71cd5newer"), \
             patch("cli.system.rebuild_frontend") as rebuild:
            ok, msg = install_prepared_frontend(prepared)

        assert ok, msg
        assert (project / FRONTEND_BUNDLE).read_text() == "new bundle"
        assert list((project / FRONTEND_BUNDLE).parent.iterdir()) == [project / FRONTEND_BUNDLE]
        rebuild.assert_not_called()

    def test_refuses_a_bundle_for_another_commit(self, tmp_path, monkeypatch):
        project = tmp_path / "server"
        (project / FRONTEND_BUNDLE).parent.mkdir(parents=True)
        (project / FRONTEND_BUNDLE).write_text("committed bundle")
        monkeypatch.setattr(system, "PROJECT_DIR", project)
        prepared = PreparedRelease(True, "", staged=True, bundle=self._bundle(tmp_path),
                                   frontend_message="built", commit="ab71cd5newer")
        with patch("cli.system.get_current_commit", return_value="ffffffother"):
            ok, msg = install_prepared_frontend(prepared)

        assert not ok and "not the checked-out" in msg
        assert (project / FRONTEND_BUNDLE).read_text() == "committed bundle"

    def test_failed_staged_build_is_not_retried_in_the_window(self):
        prepared = PreparedRelease(True, "", staged=True, bundle=None,
                                   frontend_message="npm ci/build failed: ERESOLVE")
        with patch("cli.system.rebuild_frontend") as rebuild:
            ok, msg = install_prepared_frontend(prepared)

        assert not ok and "ERESOLVE" in msg
        rebuild.assert_not_called()

    def test_skipped_staged_build_is_ok(self):
        prepared = PreparedRelease(True, "", staged=True, bundle=None,
                                   frontend_message="skipped (node/npm not on PATH; serving committed bundle)")
        ok, _ = install_prepared_frontend(prepared)
        assert ok

    def test_without_staging_rebuilds_in_place(self):
        with patch("cli.system.rebuild_frontend", return_value=(True, "rebuilt")) as rebuild:
            assert install_prepared_frontend(None) == (True, "rebuilt")
            assert install_prepared_frontend(PreparedRelease(True, "no staging")) == (True, "rebuilt")
        assert rebuild.call_count == 2
