"""Stopping and starting the server service around `chaotic system upgrade`.

CHT-1474: `systemctl --user stop` outlasted the CLI's 60s subprocess timeout
(uvicorn waiting forever on /mcp streams, systemd waiting 90s to SIGKILL),
so the upgrade died on a raw TimeoutExpired traceback and left prod down.

CHT-1475: an upgrade that found the service already stopped checked out,
migrated, and printed "Upgraded to ..." without ever starting it.
"""
import os
import re
import shutil
import signal
import sqlite3
import subprocess
import sys
import time
from contextlib import ExitStack
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest
from click.testing import CliRunner

from cli import system
from cli.system import (
    SERVICE_STOP_TIMEOUT,
    SYSTEMD_DEFAULT_TIMEOUT_STOP_SEC,
    SYSTEMD_TIMEOUT_STOP_SEC,
    UVICORN_GRACEFUL_SHUTDOWN_SEC,
    generate_launchd_plist,
    generate_systemd_service,
    stop_service,
    wait_for_service_settled,
)

JUSTFILE = Path(__file__).resolve().parents[2] / "justfile"


def _flat(output: str) -> str:
    return " ".join(output.split())


class TestShutdownBudget:
    """Each layer has to outlast the one inside it."""

    def test_layers_are_ordered(self):
        assert UVICORN_GRACEFUL_SHUTDOWN_SEC < SYSTEMD_TIMEOUT_STOP_SEC
        assert SYSTEMD_TIMEOUT_STOP_SEC <= SYSTEMD_DEFAULT_TIMEOUT_STOP_SEC
        # Units written before CHT-1474 have no TimeoutStopSec line, so the
        # CLI must outwait systemd's default too, not just ours.
        assert SERVICE_STOP_TIMEOUT > SYSTEMD_DEFAULT_TIMEOUT_STOP_SEC

    def test_serve_prod_bounds_graceful_shutdown(self):
        recipe = JUSTFILE.read_text().split("\nserve-prod:\n", 1)[1].split("\n\n", 1)[0]
        match = re.search(r"--timeout-graceful-shutdown (\d+)", recipe)
        assert match, recipe
        assert int(match.group(1)) == UVICORN_GRACEFUL_SHUTDOWN_SEC

    def test_systemd_unit_sets_timeout_stop_sec(self):
        unit = generate_systemd_service(24267, "k")
        assert f"TimeoutStopSec={SYSTEMD_TIMEOUT_STOP_SEC}\n" in unit

    def test_launchd_plist_sets_exit_timeout(self):
        plist = generate_launchd_plist(24267, "k")
        assert f"<key>ExitTimeOut</key>\n    <integer>{SYSTEMD_TIMEOUT_STOP_SEC}</integer>" in plist


class TestStopService:
    @patch("cli.system.get_os", return_value="linux")
    def test_waits_longer_than_systemd_will(self, _os):
        with patch("cli.system.run_command") as run:
            assert stop_service() is True
        assert run.call_args.kwargs["timeout"] == SERVICE_STOP_TIMEOUT

    @patch("cli.system.get_os", return_value="linux")
    def test_timeout_is_a_failure_not_a_traceback(self, _os):
        timeout = subprocess.TimeoutExpired(["systemctl"], SERVICE_STOP_TIMEOUT)
        with patch("cli.system.run_command", side_effect=timeout):
            assert stop_service() is False

    @patch("cli.system.get_os", return_value="linux")
    def test_missing_binary_is_a_failure_not_a_traceback(self, _os):
        with patch("cli.system.run_command", side_effect=FileNotFoundError("systemctl")):
            assert stop_service() is False

    @patch("cli.system.get_os", return_value="linux")
    def test_start_timeout_is_a_failure_not_a_traceback(self, _os):
        def run(cmd, **kwargs):
            if cmd[:3] == ["systemctl", "--user", "start"]:
                raise subprocess.TimeoutExpired(cmd, SERVICE_STOP_TIMEOUT)
            return MagicMock(returncode=0, stdout="")
        with patch("cli.system.run_command", side_effect=run):
            assert system.start_service() is False


class TestWaitForServiceSettled:
    @patch("cli.system.get_os", return_value="linux")
    def test_waits_out_a_stop_in_progress(self, _os):
        states = iter(["deactivating\n", "deactivating\n", "inactive\n"])
        with patch("cli.system.run_command", side_effect=lambda *a, **k: MagicMock(stdout=next(states))), \
             patch("cli.system.time.sleep") as sleep:
            assert wait_for_service_settled() == "inactive"
        assert sleep.call_count == 2

    @patch("cli.system.get_os", return_value="linux")
    def test_gives_up_at_its_deadline(self, _os):
        with patch("cli.system.run_command", return_value=MagicMock(stdout="deactivating\n")), \
             patch("cli.system.time.sleep"), \
             patch("cli.system.time.time", side_effect=[0, 0, 5, 10]):
            assert wait_for_service_settled(timeout=10) == "deactivating"


# --- upgrade ---------------------------------------------------------------

_COMMITS = ("19ae385deployed", "ab71cd5newer")


def _upgrade(args=("--no-backup",), **overrides):
    """Run `system upgrade --yes` with every collaborator mocked. Default:
    a forward upgrade of a running server where everything succeeds."""
    commits = iter(_COMMITS)
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
        "stop_service": dict(return_value=True),
        "wait_for_service_stop": dict(return_value=True),
        "start_service": dict(return_value=True),
        "health_check": dict(return_value=True),
        "load_server_json": dict(return_value={"port": 24267}),
        "get_remote_version": dict(return_value=None),
        "verify_deployed_commit": dict(return_value=(True, "ab71cd5")),
        "checkout_version": dict(return_value=(True, None)),
        "restore_backup": dict(return_value=True),
        "resync_checkout": dict(return_value=(True, "re-synced")),
        "run_migrations": dict(return_value=(True, "ok")),
        "rebuild_frontend": dict(return_value=(True, "built")),
    }
    patches.update(overrides)
    with ExitStack() as stack:
        mocks = {name: stack.enter_context(patch(f"cli.system.{name}", **kw)) for name, kw in patches.items()}
        result = CliRunner().invoke(system.system, ["upgrade", "--yes", *args])
    return result, mocks


class TestUpgradeWhenStopFails:
    """CHT-1474: a failed stop happens before anything is changed. The
    operator must be told whether the server is up, and it must be up."""

    def test_the_prod_incident_stop_times_out_and_server_ends_down(self):
        """The real sequence: `systemctl stop` outlasts the CLI's wait, the
        unit then finishes stopping. The CLI restarts it and verifies /health
        instead of dying on a traceback with the server down."""
        running = iter([True, False, True])  # was_running, after settle, final state
        result, m = _upgrade(
            stop_service=dict(return_value=False),
            is_service_running=dict(side_effect=lambda: next(running)),
        )

        assert result.exit_code == 1
        assert not isinstance(result.exception, subprocess.TimeoutExpired)
        out = _flat(result.output)
        assert "Failed to stop server" in out
        assert "The server is DOWN (the stop half finished). Starting it again" in out
        assert "The server is back UP and answering /health" in out
        assert "Nothing was changed" in out
        m["start_service"].assert_called_once()
        m["health_check"].assert_called_once_with(24267, host="127.0.0.1")
        m["checkout_version"].assert_not_called()
        m["run_migrations"].assert_not_called()
        assert "Upgraded to" not in out

    def test_real_stop_service_timeout_never_escapes(self):
        """Same incident without mocking stop_service: run_command raises
        TimeoutExpired for the stop, exactly as subprocess.run did."""
        def run(cmd, **kwargs):
            if cmd[:3] == ["systemctl", "--user", "stop"]:
                raise subprocess.TimeoutExpired(cmd, kwargs.get("timeout"))
            return MagicMock(returncode=0, stdout="")
        running = iter([True, False])
        overrides = dict(
            run_command=dict(side_effect=run),
            is_service_running=dict(side_effect=lambda: next(running, True)),
            get_os=dict(return_value="linux"),
        )
        commits = iter(_COMMITS)
        patches = {
            "is_server_installed": dict(return_value=True),
            "get_current_version": dict(return_value="v0.1.0a19"),
            "get_current_commit": dict(side_effect=lambda: next(commits, _COMMITS[-1])),
            "fetch_updates": dict(return_value=True),
            "get_latest_version": dict(return_value="v0.1.0a20"),
            "resolve_commit": dict(return_value=_COMMITS[1]),
            "is_ancestor": dict(side_effect=lambda older, newer: (older, newer) == _COMMITS),
            "validate_git_ref": dict(return_value=True),
            "wait_for_service_settled": dict(return_value="inactive"),
            "health_check": dict(return_value=True),
            "load_server_json": dict(return_value={"port": 24267}),
            "get_remote_version": dict(return_value=None),
            "checkout_version": dict(return_value=(True, None)),
            **overrides,
        }
        with ExitStack() as stack:
            mocks = {n: stack.enter_context(patch(f"cli.system.{n}", **kw)) for n, kw in patches.items()}
            result = CliRunner().invoke(system.system, ["upgrade", "--yes", "--no-backup"])

        assert result.exit_code == 1
        assert isinstance(result.exception, SystemExit)
        out = _flat(result.output)
        assert "Traceback" not in result.output
        assert "Starting it again" in out and "back UP" in out
        started = [c.args[0] for c in mocks["run_command"].call_args_list
                   if c.args[0][:3] == ["systemctl", "--user", "start"]]
        assert started, "the server was left down"
        mocks["checkout_version"].assert_not_called()

    def test_stop_failed_but_server_still_running(self):
        result, m = _upgrade(
            stop_service=dict(return_value=False),
            is_service_running=dict(return_value=True),
        )

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "The server is still RUNNING; it was not stopped" in out
        assert "Nothing was changed" in out
        m["start_service"].assert_not_called()
        m["checkout_version"].assert_not_called()

    def test_restart_after_failed_stop_also_fails_says_down_loudly(self):
        running = iter([True, False])
        result, m = _upgrade(
            stop_service=dict(return_value=False),
            is_service_running=dict(side_effect=lambda: next(running, False)),
            start_service=dict(return_value=False),
        )

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "CRITICAL: the server is DOWN and could not be restarted" in out
        assert "chaotic system start" in out
        assert "back UP" not in out

    def test_restart_comes_up_but_never_answers_health(self):
        running = iter([True, False])
        result, _ = _upgrade(
            stop_service=dict(return_value=False),
            is_service_running=dict(side_effect=lambda: next(running, False)),
            health_check=dict(return_value=False),
        )

        assert result.exit_code == 1
        assert "CRITICAL: the server is DOWN" in _flat(result.output)


class TestUpgradeFromStopped:
    """CHT-1475: the upgrade ends with the server running and verified,
    whatever state it found it in."""

    def test_already_stopped_server_is_started_and_verified(self):
        result, m = _upgrade(is_service_running=dict(return_value=False), service_state=dict(return_value="inactive"))

        assert result.exit_code == 0, result.output
        out = _flat(result.output)
        assert "Starting server (it was not running before the upgrade)" in out
        assert "Waiting for health check... OK" in out
        assert "Verifying the new process took over... OK" in out
        assert "Upgraded to" in out
        m["stop_service"].assert_not_called()
        m["start_service"].assert_called_once()
        m["health_check"].assert_called_once_with(24267, host="127.0.0.1")
        m["verify_deployed_commit"].assert_called_once_with(24267, _COMMITS[1], host="127.0.0.1")

    def test_already_stopped_server_that_fails_health_is_rolled_back_and_reported(self):
        result, m = _upgrade(
            is_service_running=dict(return_value=False),
            service_state=dict(return_value="inactive"),
            health_check=dict(return_value=False),
        )

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "Health check failed. Rolling back" in out
        assert "Upgraded to" not in out
        assert "Server is DOWN" in out  # the final plain statement
        assert m["checkout_version"].call_args_list[-1].args == (_COMMITS[0],)
        assert m["start_service"].call_count == 2  # new code, then rollback

    def test_already_stopped_server_that_will_not_start_is_rolled_back(self):
        result, m = _upgrade(
            is_service_running=dict(return_value=False),
            service_state=dict(return_value="inactive"),
            start_service=dict(return_value=False),
        )

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "Failed to start server" in out
        assert "CRITICAL: Failed to restart server after rollback" in out
        assert "Server is DOWN" in out
        assert "Upgraded to" not in out

    def test_failed_migration_reports_server_state(self):
        result, _ = _upgrade(
            is_service_running=dict(return_value=False),
            service_state=dict(return_value="inactive"),
            run_migrations=dict(return_value=(False, "boom")),
        )

        assert result.exit_code == 1
        assert "Server is DOWN. Start it with 'chaotic system start'" in _flat(result.output)

    def test_the_migrations_own_error_reaches_the_operator(self):
        """The message is the command's output, which may contain square
        brackets: printed as text, not as Rich markup (CHT-1548)."""
        message = "Migration failed:\n❌ Error applying migrations: 0021 [dim] delete it (DELETE FROM api_keys)"
        result, _ = _upgrade(
            is_service_running=dict(return_value=False),
            service_state=dict(return_value="inactive"),
            run_migrations=dict(return_value=(False, message)),
        )

        assert result.exit_code == 1
        assert "0021 [dim] delete it (DELETE FROM api_keys)" in result.output

    def test_a_successful_migrations_output_is_shown(self):
        result, _ = _upgrade(
            is_service_running=dict(return_value=False),
            service_state=dict(return_value="inactive"),
            run_migrations=dict(return_value=(True, "Migrations applied\n0021: deleting API key ck_dead0000... [x]")),
        )

        assert "0021: deleting API key ck_dead0000... [x]" in result.output


def _migrate_fails(message="Migration failed:\n0030 boom", started=True, raises=None):
    """A run_migrations stand-in that records how far it got, as the real
    one does, then fails (or raises)."""
    def run(fake_initial=False, progress=None, reinstall=True):
        if progress is not None:
            progress["migrate_started"] = started
        if raises is not None:
            raise raises
        return False, message
    return dict(side_effect=run)


def _sqlite_db(path: Path, rows: int) -> None:
    conn = sqlite3.connect(path)
    conn.execute("CREATE TABLE IF NOT EXISTS t (x)")
    conn.execute("DELETE FROM t")
    conn.executemany("INSERT INTO t VALUES (?)", [(i,) for i in range(rows)])
    conn.commit()
    conn.close()


def _rows(path: Path) -> int:
    conn = sqlite3.connect(path)
    try:
        return conn.execute("SELECT count(*) FROM t").fetchone()[0]
    finally:
        conn.close()


class TestFailedMigrationRollsBack:
    """CHT-1477: a sync/migrate failure used to restart the NEW code against
    a database the failed run may have left between schemas. It is now
    undone like every other post-checkout failure, through _roll_back."""

    def _with_backup(self, tmp_path, **overrides):
        (tmp_path / "chaotic.db").write_bytes(b"")
        backup = tmp_path / "chaotic.db.backup-20261014-000000"
        backup.write_bytes(b"")
        result, m = _upgrade(
            args=(),
            **{
                "run_migrations": _migrate_fails(),
                "create_backup": dict(return_value=backup),
                "cleanup_old_backups": dict(return_value=None),
                "DATABASE_PATH": dict(new=tmp_path / "chaotic.db"),
                "is_port_in_use": dict(return_value=False),
                **overrides,
            },
        )
        return result, m, backup

    def test_rolls_back_checkout_restores_backup_and_restarts_old_code(self, tmp_path):
        stopped = iter([True, False])  # was_running; down at the restore; then up again
        result, m, backup = self._with_backup(
            tmp_path,
            is_service_running=dict(side_effect=lambda: next(stopped, True)),
            wait_for_service_settled=dict(return_value="inactive"),
        )

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "0030 boom" in out
        assert "Rolling back" in out
        assert "Restarting server on new code" not in out
        assert "Rolled back to previous version" in out
        # Previous checkout, then the backup, then the previous code started and checked.
        assert m["checkout_version"].call_args_list[-1].args == (_COMMITS[0],)
        m["restore_backup"].assert_called_once_with(backup, port=24267, host="127.0.0.1")
        m["start_service"].assert_called_once()
        assert out.rindex("Server is RUNNING and answering /health") > out.index("Rolled back")
        assert "partially migrated" not in out
        assert "Upgraded to" not in out
        m["rebuild_frontend"].assert_not_called()

    def test_backup_is_not_restored_under_a_process_still_on_the_port(self, tmp_path):
        """_roll_back's guard applies here too (CHT-1363)."""
        result, m, backup = self._with_backup(
            tmp_path,
            is_service_running=dict(side_effect=iter([True] + [False] * 20).__next__),
            wait_for_service_settled=dict(return_value="inactive"),
            is_port_in_use=dict(return_value=True),
        )

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "NOT restoring the database backup" in out
        assert f"--restore {backup.name}" in out
        m["restore_backup"].assert_not_called()
        assert m["checkout_version"].call_args_list[-1].args == (_COMMITS[0],)

    def test_no_backup_says_the_database_may_be_partially_migrated_before_the_state_line(self, tmp_path):
        (tmp_path / "chaotic.db").write_bytes(b"")
        result, m = _upgrade(
            run_migrations=_migrate_fails(started=True),
            DATABASE_PATH=dict(new=tmp_path / "chaotic.db"),
        )

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "No database backup was taken (--no-backup), so the database will NOT be restored" in out
        assert "may be partially migrated" in out
        assert "chaotic system backup --restore <timestamp>" in out
        assert "oxyde showmigrations" in out
        # The warning comes before the rollback, and the server's state is the last word.
        assert out.index("partially migrated") < out.index("Rolling back")
        assert out.rindex("Server is") > max(out.index("Fix the issue above"), out.index("Rolled back"))
        m["restore_backup"].assert_not_called()
        assert m["checkout_version"].call_args_list[-1].args == (_COMMITS[0],)
        m["start_service"].assert_called_once()

    def test_no_backup_and_no_migration_ran_says_the_database_is_untouched(self, tmp_path):
        """A failed `just sync` or CLI reinstall never touched the database."""
        (tmp_path / "chaotic.db").write_bytes(b"")
        result, _ = _upgrade(
            run_migrations=_migrate_fails("Migration failed:\nerror: lock out of date", started=False),
            DATABASE_PATH=dict(new=tmp_path / "chaotic.db"),
        )

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "partially migrated" not in out
        assert "No migration ran, so the database was not changed" in out
        assert "Rolled back to previous version" in out

    def test_no_database_at_all_has_nothing_to_warn_about(self, tmp_path):
        result, _ = _upgrade(
            run_migrations=_migrate_fails(),
            DATABASE_PATH=dict(new=tmp_path / "missing.db"),
        )

        assert result.exit_code == 1
        assert "partially migrated" not in _flat(result.output)

    def test_ctrl_c_during_migrate_rolls_back_then_exits_nonzero(self, tmp_path):
        """Review M1: an operator's Ctrl-C used to escape as a traceback with
        the new checkout in place and the server down."""
        result, m, backup = self._with_backup(
            tmp_path,
            run_migrations=_migrate_fails(raises=KeyboardInterrupt()),
            is_service_running=dict(side_effect=iter([True] + [False] * 20).__next__),
            wait_for_service_settled=dict(return_value="inactive"),
        )

        assert result.exit_code == 130
        assert isinstance(result.exception, SystemExit)
        out = _flat(result.output)
        assert "Interrupted (Ctrl-C)" in out
        assert m["checkout_version"].call_args_list[-1].args == (_COMMITS[0],)
        m["restore_backup"].assert_called_once()
        m["start_service"].assert_called_once()

    def test_a_missing_command_rolls_back(self, tmp_path):
        """Review M1: `just` or `uv` not on a non-login shell's PATH."""
        result, m = _upgrade(
            run_migrations=_migrate_fails(raises=FileNotFoundError(2, "No such file or directory", "just")),
            DATABASE_PATH=dict(new=tmp_path / "missing.db"),
        )

        assert result.exit_code == 1
        assert "Could not run a command" in _flat(result.output)
        assert m["checkout_version"].call_args_list[-1].args == (_COMMITS[0],)
        m["start_service"].assert_called_once()

    def test_a_cli_reinstall_that_did_not_take_rolls_back_before_migrating(self, tmp_path):
        """CHT-1675's verification fails inside run_migrations, before
        `oxyde migrate`: same rollback, database untouched."""
        ran = []

        def run(cmd, **kwargs):
            ran.append(cmd)
            return subprocess.CompletedProcess(cmd, 0, "", "")

        progress = {}
        with patch.object(system, "run_command", side_effect=run), \
                patch.object(system, "verify_installed_cli", return_value=(False, "CLI reinstall did not take: cli/system.py")):
            ok, message = system.run_migrations(progress=progress)
        assert ok is False and "did not take" in message
        assert progress == {"migrate_started": False, "cli_reinstall_started": True, "cli_installed": False,
                            "cli_path_warning": None}
        assert not [c for c in ran if "oxyde" in c], "migrated after a CLI reinstall that did not take"

        result, m = _upgrade(
            run_migrations=_migrate_fails(message, started=False),
            DATABASE_PATH=dict(new=tmp_path / "missing.db"),
        )
        assert result.exit_code == 1
        assert "CLI reinstall did not take" in _flat(result.output)
        assert m["checkout_version"].call_args_list[-1].args == (_COMMITS[0],)


class TestFailedMigrationRealRestore:
    """The rollback with the real restore_backup (review M2): the database
    a failed migration changed is put back, a restore that cannot complete
    leaves the file as it was and the old code is still restarted, and a
    process holding a SQLite lock blocks the restore (review H1)."""

    def _run(self, tmp_path, **overrides):
        db = tmp_path / "chaotic.db"
        _sqlite_db(db, 10)
        backup = tmp_path / "chaotic.db.backup-20261014-000000"
        backup.write_bytes(db.read_bytes())

        def half_migrate(fake_initial=False, progress=None, reinstall=True):
            progress["migrate_started"] = True
            _sqlite_db(db, 3)  # what a migration that failed partway left behind
            return False, "Migration failed:\n0030 boom"

        result, m = _upgrade(
            args=(),
            **{
                "run_migrations": dict(side_effect=half_migrate),
                "create_backup": dict(return_value=backup),
                "cleanup_old_backups": dict(return_value=None),
                "DATABASE_PATH": dict(new=db),
                "is_service_running": dict(side_effect=iter([True] + [False] * 20).__next__),
                "wait_for_service_settled": dict(return_value="inactive"),
                "is_port_in_use": dict(return_value=False),
                "restore_backup": dict(wraps=system.restore_backup),
                **overrides,
            },
        )
        return result, m, db, backup

    def test_the_backup_is_put_back(self, tmp_path):
        (tmp_path / "chaotic.db-wal").write_bytes(b"")  # a sidecar of the migrated file
        result, m, db, _ = self._run(tmp_path)

        assert result.exit_code == 1
        assert _rows(db) == 10
        assert not (tmp_path / "chaotic.db-wal").exists()
        assert not (tmp_path / "chaotic.db.restoring").exists()
        assert "Rolled back to previous version" in _flat(result.output)

    def test_a_restore_that_cannot_copy_leaves_the_database_and_still_restarts(self, tmp_path):
        real_copy = shutil.copy2

        def disk_full(src, dst, *a, **kw):
            real_copy(src, dst, *a, **kw)
            raise OSError(28, "No space left on device")

        with patch("cli.system.shutil.copy2", side_effect=disk_full):
            result, m, db, backup = self._run(tmp_path)

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "No space left on device" in out
        assert "was not replaced" in out
        assert "Database restore failed. Backup is at" in out
        assert _rows(db) == 3, "the live file was not touched"
        assert not (tmp_path / "chaotic.db.restoring").exists()
        m["start_service"].assert_called_once()
        assert out.rindex("Server is") > out.index("Database restore failed")

    def test_a_process_holding_the_database_lock_blocks_the_restore(self, tmp_path):
        """The service and port checks cannot see an orphaned migrate; the
        SQLite lock can."""
        db = tmp_path / "chaotic.db"
        holder = {}

        def half_migrate_and_hang_on(fake_initial=False, progress=None, reinstall=True):
            progress["migrate_started"] = True
            _sqlite_db(db, 3)
            conn = sqlite3.connect(db, isolation_level=None)
            conn.execute("BEGIN EXCLUSIVE")
            holder["conn"] = conn
            return False, "Migration timed out"

        with patch.object(system, "RESTORE_LOCK_TIMEOUT", 0.2):
            try:
                result, m, db, backup = self._run(tmp_path, run_migrations=dict(side_effect=half_migrate_and_hang_on))
            finally:
                if "conn" in holder:
                    holder["conn"].close()

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "Refusing to restore: the database is locked" in out
        assert "Database restore failed. Backup is at" in out
        assert _rows(db) == 3
        m["start_service"].assert_called_once()


class TestRestoreDurability:
    """CHT-1696: the directory is fsynced after the rename, so a power loss
    right after a restore cannot bring the old file back."""

    def test_sidecars_go_durably_before_the_rename_and_the_rename_is_fsynced(self, tmp_path, monkeypatch):
        db = tmp_path / "chaotic.db"
        _sqlite_db(db, 3)
        (tmp_path / "chaotic.db-wal").write_bytes(b"stale")
        (tmp_path / "chaotic.db-shm").write_bytes(b"stale")
        backup = tmp_path / "chaotic.db.backup-20261014-000000"
        _sqlite_db(backup, 10)
        monkeypatch.setattr(system, "DATABASE_PATH", db)
        monkeypatch.setattr(system, "is_service_running", lambda: False)
        monkeypatch.setattr(system, "_database_lock_holder", lambda path: None)
        order = []
        real_replace, real_unlink = os.replace, Path.unlink
        monkeypatch.setattr(system.os, "replace", lambda a, b: order.append("replace") or real_replace(a, b))
        monkeypatch.setattr(Path, "unlink", lambda self, missing_ok=False: (
            order.append(("unlink", self.name)), real_unlink(self, missing_ok=missing_ok))[1])
        monkeypatch.setattr(system, "_fsync_dir", lambda d: order.append(("fsync_dir", d)))

        assert system.restore_backup(backup) is True
        assert order == [
            ("unlink", "chaotic.db-wal"), ("unlink", "chaotic.db-shm"), ("fsync_dir", tmp_path),
            "replace", ("fsync_dir", tmp_path),
        ]
        assert _rows(db) == 10
        assert not (tmp_path / "chaotic.db-wal").exists()

    def test_a_wal_that_survives_removal_refuses_the_restore(self, tmp_path, monkeypatch):
        db = tmp_path / "chaotic.db"
        _sqlite_db(db, 3)
        wal = tmp_path / "chaotic.db-wal"
        wal.write_bytes(b"stale")
        backup = tmp_path / "chaotic.db.backup-20261014-000000"
        _sqlite_db(backup, 10)
        monkeypatch.setattr(system, "DATABASE_PATH", db)
        monkeypatch.setattr(system, "is_service_running", lambda: False)
        monkeypatch.setattr(system, "_database_lock_holder", lambda path: None)
        real_unlink = Path.unlink
        monkeypatch.setattr(Path, "unlink", lambda self, missing_ok=False: (
            None if self.name == "chaotic.db-wal" else real_unlink(self, missing_ok=missing_ok)))

        with patch.object(system, "console") as console:
            assert system.restore_backup(backup) is False
        printed = " ".join(str(c.args[0]) for c in console.print.call_args_list)
        assert "chaotic.db-wal is still there" in printed
        assert "was not replaced" in printed
        assert _rows(db) == 3
        assert not (tmp_path / "chaotic.db.restoring").exists()

    def test_fsync_dir_is_best_effort(self, tmp_path):
        system._fsync_dir(tmp_path)  # a real directory: no error
        system._fsync_dir(tmp_path / "missing")  # cannot open: ignored
        with patch.object(system.os, "fsync", side_effect=OSError("unsupported")):
            system._fsync_dir(tmp_path)


class TestOwnProcessGroup:
    """Review H1: subprocess.run's timeout killed `uv` and left the Python
    process it ran (the one writing the database) running."""

    SCRIPT = (
        "import subprocess, sys, time\n"
        "child = subprocess.Popen([sys.executable, '-c', 'import time; time.sleep(60)'])\n"
        "open(sys.argv[1], 'w').write(str(child.pid))\n"
        "time.sleep(60)\n"
    )

    def _alive(self, pid: int) -> bool:
        try:
            os.kill(pid, 0)
        except ProcessLookupError:
            return False
        # A zombie is dead; only its parent has not reaped it yet.
        try:
            with open(f"/proc/{pid}/stat") as f:
                return f.read().split(")")[-1].split()[0] != "Z"
        except OSError:
            return True

    def _grandchild(self, pidfile: Path) -> int:
        deadline = time.time() + 10
        while not (pidfile.exists() and pidfile.read_text()):
            assert time.time() < deadline, "the grandchild never started"
            time.sleep(0.05)
        return int(pidfile.read_text())

    def test_a_timeout_kills_the_grandchild_too(self, tmp_path):
        pidfile = tmp_path / "pid"
        with pytest.raises(subprocess.TimeoutExpired):
            system.run_command([sys.executable, "-c", self.SCRIPT, str(pidfile)], timeout=2, own_group=True)
        pid = self._grandchild(pidfile)
        deadline = time.time() + 5
        while self._alive(pid) and time.time() < deadline:
            time.sleep(0.05)
        assert not self._alive(pid), "the grandchild outlived the timeout"

    def test_ctrl_c_kills_the_group_before_it_propagates(self, tmp_path):
        pidfile = tmp_path / "pid"

        def interrupt(signum, frame):
            raise KeyboardInterrupt

        previous = signal.signal(signal.SIGALRM, interrupt)
        signal.alarm(2)
        try:
            with pytest.raises(KeyboardInterrupt):
                system.run_command([sys.executable, "-c", self.SCRIPT, str(pidfile)], timeout=30, own_group=True)
        finally:
            signal.alarm(0)
            signal.signal(signal.SIGALRM, previous)
        pid = self._grandchild(pidfile)
        deadline = time.time() + 5
        while self._alive(pid) and time.time() < deadline:
            time.sleep(0.05)
        assert not self._alive(pid)

    def test_an_unconfirmed_group_exit_is_a_note_not_an_alarm(self):
        """CHT-1696: unreaped zombies (a container whose PID 1 does not reap)
        look like survivors; the message must not claim processes are
        still running."""
        with patch.object(system, "_kill_group", side_effect=lambda proc: proc.kill() or False), \
                patch.object(system, "console") as console:
            with pytest.raises(subprocess.TimeoutExpired):
                system.run_command([sys.executable, "-c", "import time; time.sleep(30)"],
                                   timeout=1, own_group=True)
        printed = " ".join(str(c.args[0]) for c in console.print.call_args_list)
        assert "Could not confirm that every process started by" in printed
        assert "has exited" in printed
        assert "[yellow]" in printed and "[red]" not in printed

    def test_output_and_failure_behave_like_subprocess_run(self):
        ok = system.run_command([sys.executable, "-c", "print('hi')"], own_group=True)
        assert ok.returncode == 0 and ok.stdout == "hi\n"
        with pytest.raises(subprocess.CalledProcessError) as e:
            system.run_command([sys.executable, "-c", "import sys; print('out'); sys.exit(3)"], own_group=True)
        assert e.value.returncode == 3 and e.value.stdout == "out\n"
        assert system.run_command([sys.executable, "-c", "raise SystemExit(4)"],
                                  check=False, own_group=True).returncode == 4

    def test_migrate_timeout_is_reported_as_a_stopped_migration(self):
        def run(cmd, **kwargs):
            if cmd[:4] == ["uv", "run", "--frozen", "oxyde"]:
                assert kwargs.get("own_group") is True
                raise subprocess.TimeoutExpired(cmd, 120)
            return subprocess.CompletedProcess(cmd, 0, "", "")

        progress = {}
        with patch.object(system, "run_command", side_effect=run), \
                patch.object(system, "reinstall_cli", return_value=(True, "ok")):
            ok, message = system.run_migrations(progress=progress)
        assert ok is False
        assert message == "Migration timed out (the migration process was stopped)"
        assert progress["migrate_started"] is True

    def test_sync_runs_in_its_own_group_and_its_timeout_says_so(self):
        def run(cmd, **kwargs):
            assert kwargs.get("own_group") is True
            raise subprocess.TimeoutExpired(cmd, 300)

        progress = {}
        with patch.object(system, "run_command", side_effect=run):
            ok, message = system.run_migrations(progress=progress)
        assert (ok, message) == (False, "Dependency sync timed out")
        assert progress["migrate_started"] is False


class TestRollbackResync:
    """CHT-1694: by the time anything rolls back, the upgrade has synced the
    server's venv for the commit it is abandoning. The rollback puts it
    back for the previous commit before restarting it, and a re-sync that
    fails is reported without stopping the restart. The CLI the upgrade
    installed and verified stays (it is the upgrade tool); one whose
    reinstall started and did not verify is replaced by the previous
    commit's; one never touched is left alone."""

    def test_health_failure_resyncs_the_previous_checkout_before_restarting_it(self):
        calls = []
        result, m = _upgrade(
            health_check=dict(return_value=False),
            checkout_version=dict(side_effect=lambda *a, **k: calls.append(("checkout", a)) or (True, None)),
            resync_checkout=dict(side_effect=lambda **k: calls.append(("resync", k)) or (True, "Server dependencies synced")),
            start_service=dict(side_effect=lambda: calls.append(("start",)) or True),
        )

        assert result.exit_code == 1
        assert calls == [
            ("checkout", (_COMMITS[1],)), ("start",),  # the upgrade
            ("checkout", (_COMMITS[0],)),               # the rollback
            ("resync", {"reinstall": False, "abandoned_commit": _COMMITS[1]}), ("start",),
        ]
        out = _flat(result.output)
        # The CLI is reinstalled only after a healthy start (CHT-2000), so
        # a health failure never touched it.
        assert "Re-syncing dependencies for the previous version" in out
        assert "CLI: unchanged (the upgrade never reinstalled it)" in out
        assert "may not match" not in out
        assert "Rolled back to previous version" in out

    @staticmethod
    def _fails_at(stage):
        """A run_migrations that records progress as the real one does and
        fails at `stage`: "sync" (before the CLI reinstall), "reinstall"
        (it started and did not verify) or "migrate" (after it verified)."""
        def run(fake_initial=False, progress=None, reinstall=True):
            progress.update(
                cli_reinstall_started=stage in ("reinstall", "migrate"),
                cli_installed=stage == "migrate",
                migrate_started=stage == "migrate",
            )
            return False, {"sync": "Migration failed:\nerror: no network",
                           "reinstall": "CLI reinstall did not take: cli/x.py",
                           "migrate": "Migration failed:\n0030 boom"}[stage]
        return dict(side_effect=run)

    def test_migrate_failure_after_a_verified_cli_keeps_that_cli(self, tmp_path):
        result, m = _upgrade(
            run_migrations=self._fails_at("migrate"),
            DATABASE_PATH=dict(new=tmp_path / "missing.db"),
        )

        assert result.exit_code == 1
        m["resync_checkout"].assert_called_once_with(reinstall=False, abandoned_commit=_COMMITS[1])
        assert "CLI: keeping the version this upgrade installed and verified" in _flat(result.output)

    def test_a_cli_reinstall_that_did_not_verify_is_replaced_by_the_previous_cli(self, tmp_path):
        """Never leave a half-installed CLI behind."""
        result, m = _upgrade(
            run_migrations=self._fails_at("reinstall"),
            DATABASE_PATH=dict(new=tmp_path / "missing.db"),
            resync_checkout=dict(return_value=(True, "Server dependencies synced; CLI reinstalled (verified)")),
        )

        assert result.exit_code == 1
        m["resync_checkout"].assert_called_once_with(reinstall=True, abandoned_commit=_COMMITS[1])
        out = _flat(result.output)
        assert "Re-syncing dependencies and the CLI for the previous version" in out
        assert "CLI: reinstalled from the previous version (19ae385) and verified" in out

    def test_a_cli_the_upgrade_never_touched_is_left_alone(self, tmp_path):
        """Review M1: a sync that failed before the reinstall leaves the
        pre-upgrade CLI intact; reinstalling it would only add downtime
        and a failure that is not there."""
        result, m = _upgrade(
            run_migrations=self._fails_at("sync"),
            DATABASE_PATH=dict(new=tmp_path / "missing.db"),
            resync_checkout=dict(return_value=(False, "Dependency sync failed:\nerror: no network")),
        )

        assert result.exit_code == 1
        m["resync_checkout"].assert_called_once_with(reinstall=False, abandoned_commit=_COMMITS[1])
        out = _flat(result.output)
        assert "CLI: unchanged (the upgrade never reinstalled it)" in out
        assert "half-installed" not in out
        assert "uv tool install" not in out

    def test_a_failed_resync_of_the_previous_cli_says_it_may_be_half_installed(self, tmp_path):
        result, m = _upgrade(
            run_migrations=self._fails_at("reinstall"),
            DATABASE_PATH=dict(new=tmp_path / "missing.db"),
            resync_checkout=dict(return_value=(False, "CLI reinstall timed out")),
        )

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "virtualenv and the installed CLI may not match the code" in out
        assert "uv tool install --force --reinstall" in out
        assert "CLI: may be half-installed" in out
        m["start_service"].assert_called_once()

    def test_a_failed_resync_is_reported_and_the_old_code_still_restarts_once(self):
        result, m = _upgrade(
            health_check=dict(return_value=False),
            resync_checkout=dict(return_value=(False, "Dependency sync failed:\nerror: no network")),
        )

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "Dependency sync failed: error: no network" in out
        assert "its virtualenv may not match the code. Starting it anyway" in out
        assert "just sync-backend" in out and "uv tool install" not in out  # the CLI was never touched
        assert "CLI: unchanged (the upgrade never reinstalled it)" in out
        # No second rollback: one checkout back, one re-sync, one restart.
        assert [c.args for c in m["checkout_version"].call_args_list] == [(_COMMITS[1],), (_COMMITS[0],)]
        m["resync_checkout"].assert_called_once()
        assert m["start_service"].call_count == 2  # new code, then the rollback's
        assert "Rolled back to previous version" in out
        assert out.rindex("Server is") > out.index("may not match")

    def test_ctrl_c_during_the_resync_still_restarts(self):
        result, m = _upgrade(
            health_check=dict(return_value=False),
            resync_checkout=dict(side_effect=KeyboardInterrupt),
        )

        assert result.exit_code == 1
        assert isinstance(result.exception, SystemExit)
        out = _flat(result.output)
        assert "Interrupted (Ctrl-C)" in out and "may not match" in out
        assert m["start_service"].call_count == 2

    def test_an_unexpected_error_in_the_resync_still_restarts(self):
        result, m = _upgrade(
            health_check=dict(return_value=False),
            resync_checkout=dict(side_effect=RuntimeError("surprise")),
        )

        assert result.exit_code == 1
        assert "RuntimeError: surprise" in _flat(result.output)
        assert m["start_service"].call_count == 2

    def test_a_failed_checkout_skips_the_resync_and_the_database_restore(self, tmp_path):
        """Review M2: the new code is what will run, and it refuses the old
        schema; restoring the backup under it would make the server
        certain to be DOWN."""
        (tmp_path / "chaotic.db").write_bytes(b"")
        backup = tmp_path / "chaotic.db.backup-20261014-000000"
        backup.write_bytes(b"")
        outcomes = iter([(True, None), (False, "fatal: Unable to create '.git/index.lock': File exists.")])
        result, m = _upgrade(
            args=(),
            health_check=dict(return_value=False),
            checkout_version=dict(side_effect=lambda *a, **k: next(outcomes)),
            create_backup=dict(return_value=backup),
            cleanup_old_backups=dict(return_value=None),
            DATABASE_PATH=dict(new=tmp_path / "chaotic.db"),
            is_port_in_use=dict(return_value=False),
            is_service_running=dict(side_effect=iter([True] + [False] * 20).__next__),
            wait_for_service_settled=dict(return_value="inactive"),
        )

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "Could not check out the previous commit 19ae385: fatal: Unable to create" in out
        assert "still on the new code" in out
        assert "NOT restoring the database backup: the checkout is still on the new code" in out
        assert f"--restore {backup.name}" in out
        m["restore_backup"].assert_not_called()
        m["resync_checkout"].assert_not_called()
        assert m["start_service"].call_count == 2

    def test_a_failed_checkout_keeps_the_service_file_the_new_code_got(self, tmp_path):
        """CHT-1696: like the database, the unit stays the one written for
        the code that will actually run."""
        update = system.ServiceFileUpdate("updated", tmp_path / "chaotic.service", tmp_path / "chaotic.service.bak")
        with patch.object(system, "stop_service", return_value=True), \
                patch.object(system, "wait_for_service_settled", return_value="inactive"), \
                patch.object(system, "get_current_commit", return_value=_COMMITS[1]), \
                patch.object(system, "checkout_version", return_value=(False, "git timed out")), \
                patch.object(system, "restore_service_file") as restore_unit, \
                patch.object(system, "resync_checkout") as resync, \
                patch.object(system, "start_service", return_value=True) as start, \
                patch.object(system, "is_service_running", return_value=True), \
                patch.object(system, "health_check", return_value=True), \
                patch.object(system, "console") as console:
            system._roll_back(_COMMITS[0], None, port=24267, service_update=update)
        out = _flat(" ".join(str(c.args[0]) for c in console.print.call_args_list if c.args))
        assert "NOT restoring the previous service file: the checkout is still on the new code" in out
        assert "chaotic.service.bak" in out
        restore_unit.assert_not_called()
        resync.assert_not_called()
        start.assert_called_once()

    def test_the_service_file_is_restored_after_a_successful_checkout(self, tmp_path):
        update = system.ServiceFileUpdate("updated", tmp_path / "chaotic.service", tmp_path / "chaotic.service.bak")
        with patch.object(system, "stop_service", return_value=True), \
                patch.object(system, "wait_for_service_settled", return_value="inactive"), \
                patch.object(system, "get_current_commit", return_value=_COMMITS[1]), \
                patch.object(system, "checkout_version", return_value=(True, "")), \
                patch.object(system, "restore_service_file", return_value=True) as restore_unit, \
                patch.object(system, "resync_checkout", return_value=(True, "ok")), \
                patch.object(system, "start_service", return_value=True), \
                patch.object(system, "is_service_running", return_value=True), \
                patch.object(system, "health_check", return_value=True), \
                patch.object(system, "console"):
            system._roll_back(_COMMITS[0], None, port=24267, service_update=update)
        restore_unit.assert_called_once_with(update)

    def test_a_checkout_that_times_out_still_restarts(self):
        """Review M2: checkout_version caught only CalledProcessError, so a
        git timeout escaped _roll_back without a restart."""
        def run(cmd, **kwargs):
            if cmd[:3] == ["git", "reset", "--hard"]:
                raise subprocess.TimeoutExpired(cmd, 60)
            return MagicMock(returncode=0, stdout="")

        with patch.object(system, "run_command", side_effect=run):
            assert system.checkout_version("19ae385", force=True) == (False, "git timed out")
        with patch.object(system, "run_command", side_effect=OSError("no git")):
            assert system.checkout_version("19ae385") == (False, "no git")

        with patch.object(system, "stop_service", return_value=True), \
                patch.object(system, "wait_for_service_settled", return_value="inactive"), \
                patch.object(system, "get_current_commit", return_value=_COMMITS[1]), \
                patch.object(system, "run_command", side_effect=run), \
                patch.object(system, "resync_checkout") as resync, \
                patch.object(system, "start_service", return_value=True) as start, \
                patch.object(system, "is_service_running", return_value=True), \
                patch.object(system, "health_check", return_value=True), \
                patch.object(system, "console") as console:
            system._roll_back(_COMMITS[0], None, port=24267)
        out = _flat(" ".join(str(c.args[0]) for c in console.print.call_args_list if c.args))
        assert "Could not check out the previous commit 19ae385: git timed out" in out
        resync.assert_not_called()
        start.assert_called_once()

    def test_no_resync_without_a_previous_commit(self):
        with patch.object(system, "stop_service", return_value=True), \
                patch.object(system, "wait_for_service_settled", return_value="inactive"), \
                patch.object(system, "checkout_version") as checkout, \
                patch.object(system, "resync_checkout") as resync, \
                patch.object(system, "start_service", return_value=True), \
                patch.object(system, "is_service_running", return_value=True), \
                patch.object(system, "health_check", return_value=True):
            system._roll_back(None, None, port=24267)
        checkout.assert_not_called()
        resync.assert_not_called()


class TestResyncCheckout:
    def _git_diff(self, returncode, sync_error=None):
        """run_command: `git diff --quiet` exits `returncode`; `just` runs
        (or raises `sync_error`)."""
        calls = []

        def run(cmd, **kwargs):
            calls.append((cmd, kwargs))
            if cmd[:2] == ["git", "diff"]:
                return subprocess.CompletedProcess(cmd, returncode, "", "")
            if sync_error is not None:
                raise sync_error
            return subprocess.CompletedProcess(cmd, 0, "", "")
        return run, calls

    def test_changed_server_dependencies_are_synced_in_their_own_group(self):
        run, calls = self._git_diff(1)
        with patch.object(system, "run_command", side_effect=run), \
                patch.object(system, "reinstall_cli") as reinstall:
            assert system.resync_checkout(reinstall=False, abandoned_commit="ab71cd5") == (
                True, "Server dependencies synced")
        diff, sync = calls
        assert diff[0] == ["git", "diff", "--quiet", "ab71cd5", "HEAD", "--",
                           "backend/uv.lock", "backend/pyproject.toml", "cli/pyproject.toml"]
        assert sync == (["just", "sync-backend"], dict(cwd=system.PROJECT_DIR, timeout=300, own_group=True))
        reinstall.assert_not_called()

    def test_unchanged_server_dependencies_are_not_resynced(self):
        """Review L1: nothing to put back, and nothing to fail."""
        run, calls = self._git_diff(0)
        with patch.object(system, "run_command", side_effect=run):
            ok, message = system.resync_checkout(reinstall=False, abandoned_commit="ab71cd5")
        assert ok is True and "unchanged" in message
        assert [c[0][0] for c in calls] == ["git"]

    def test_git_unable_to_tell_means_resync(self):
        run, calls = self._git_diff(128)
        with patch.object(system, "run_command", side_effect=run):
            assert system.resync_checkout(reinstall=False, abandoned_commit="ab71cd5")[0] is True
        assert calls[-1][0] == ["just", "sync-backend"]

    def test_no_abandoned_commit_means_resync(self):
        run, calls = self._git_diff(0)
        with patch.object(system, "run_command", side_effect=run):
            system.resync_checkout(reinstall=False)
        assert [c[0] for c in calls] == [["just", "sync-backend"]]

    def test_then_reinstalls_the_cli_when_asked(self):
        run, _ = self._git_diff(1)
        with patch.object(system, "run_command", side_effect=run), \
                patch.object(system, "reinstall_cli", return_value=(True, "CLI reinstalled (verified)")) as reinstall:
            assert system.resync_checkout(abandoned_commit="ab71cd5") == (
                True, "Server dependencies synced; CLI reinstalled (verified)")
        reinstall.assert_called_once_with()

    def test_a_cli_reinstall_failure_is_the_result(self):
        run, _ = self._git_diff(0)
        with patch.object(system, "run_command", side_effect=run), \
                patch.object(system, "reinstall_cli", return_value=(False, "CLI reinstall did not take")):
            assert system.resync_checkout(abandoned_commit="ab71cd5") == (False, "CLI reinstall did not take")

    def test_sync_failures_stop_before_the_reinstall(self):
        cases = [
            (subprocess.CalledProcessError(1, ["just"], output="out", stderr="err"), "Dependency sync failed:\nout\nerr"),
            (subprocess.TimeoutExpired(["just"], 300), "Dependency sync timed out"),
            (FileNotFoundError(2, "No such file or directory", "just"), "Dependency sync failed: [Errno 2] No such file or directory: 'just'"),
        ]
        for error, expected in cases:
            run, _ = self._git_diff(1, sync_error=error)
            with patch.object(system, "run_command", side_effect=run), \
                    patch.object(system, "reinstall_cli") as reinstall:
                assert system.resync_checkout(abandoned_commit="ab71cd5") == (False, expected)
            reinstall.assert_not_called()


class TestRunMigrationsRecordsTheCliStage:
    """Review M1: the real run_migrations, only its subprocesses mocked:
    cli_installed is set only once the reinstall verified, and
    cli_reinstall_started only once it was attempted."""

    def _run(self, sync_ok=True, verify=(True, "CLI reinstalled (verified against the checkout)")):
        def run(cmd, **kwargs):
            if cmd[:2] == ["just", "sync"] and not sync_ok:
                raise subprocess.CalledProcessError(1, cmd, output="", stderr="error: no network")
            return subprocess.CompletedProcess(cmd, 0, "", "")

        progress = {}
        seen_during_verify = {}

        def verify_cli(cli_dir):
            seen_during_verify.update(progress)
            return verify

        with patch.object(system, "run_command", side_effect=run), \
                patch.object(system, "verify_installed_cli", side_effect=verify_cli):
            ok, _ = system.run_migrations(progress=progress)
        return ok, progress, seen_during_verify

    def test_a_verified_reinstall_sets_cli_installed_only_after_verification(self):
        ok, progress, during = self._run()
        assert ok is True
        assert during == {"migrate_started": False, "cli_reinstall_started": True, "cli_installed": False,
                          "cli_path_warning": None}
        assert progress == {"migrate_started": True, "cli_reinstall_started": True, "cli_installed": True,
                            "cli_path_warning": None}
        assert system._cli_state(progress) == "new"

    def test_a_reinstall_that_did_not_verify_is_partial(self):
        ok, progress, _ = self._run(verify=(False, "CLI reinstall did not take: cli/x.py"))
        assert ok is False
        assert progress == {"migrate_started": False, "cli_reinstall_started": True, "cli_installed": False,
                            "cli_path_warning": None}
        assert system._cli_state(progress) == "partial"

    def test_a_sync_failure_never_touches_the_cli(self):
        ok, progress, during = self._run(sync_ok=False)
        assert ok is False
        assert during == {}, "verification ran after a failed sync"
        assert progress == {"migrate_started": False, "cli_reinstall_started": False, "cli_installed": False,
                            "cli_path_warning": None}
        assert system._cli_state(progress) == "unchanged"


class TestRunMigrationsReportsOxydesOutput:
    """`oxyde migrate` prints its errors on stdout. Reporting only stderr
    left "Migration failed: " and nothing else, hiding a migration's
    refusal and what to fix, 0020's among them (CHT-1548)."""

    def _fail_migrate_with(self, **streams):
        def run(cmd, **kwargs):
            if cmd[:4] == ["uv", "run", "--frozen", "oxyde"]:
                raise subprocess.CalledProcessError(1, cmd, **streams)
            return subprocess.CompletedProcess(cmd, 0, "", "")

        with patch.object(system, "run_command", side_effect=run), \
                patch.object(system, "reinstall_cli", return_value=(True, "ok")):
            return system.run_migrations()

    def test_stdout_is_reported(self):
        ok, message = self._fail_migrate_with(
            output="❌ Error applying migrations: 0020 cannot add a foreign key ...; nothing was changed\n",
            stderr="",
        )
        assert ok is False
        assert "0020 cannot add a foreign key" in message

    def test_both_streams_are_reported(self):
        ok, message = self._fail_migrate_with(output="from stdout\n", stderr="from stderr\n")
        assert ok is False
        assert "from stdout" in message and "from stderr" in message

    def test_a_successful_run_keeps_what_oxyde_printed(self):
        """A migration that reports what it did (0021 lists the dead API
        keys it deletes, CHT-1537) stays in the upgrade's output."""
        def run(cmd, **kwargs):
            out = "0021: deleting API key ck_dead0000... (id k1)\n" if cmd[:4] == ["uv", "run", "--frozen", "oxyde"] else ""
            return subprocess.CompletedProcess(cmd, 0, out, "")

        with patch.object(system, "run_command", side_effect=run), \
                patch.object(system, "reinstall_cli", return_value=(True, "ok")):
            ok, message = system.run_migrations()

        assert ok is True
        assert message == "Migrations applied\n0021: deleting API key ck_dead0000... (id k1)"

    def test_silence_still_says_something(self):
        ok, message = self._fail_migrate_with(output=None, stderr=None)
        assert ok is False
        assert message == "Migration failed:\nexit status 1"


class TestUpgradeCancelled:
    """Declining the confirmation after the server was stopped restarts it
    and says where it ended up (review of CHT-1474)."""

    def _run_without_yes(self, **overrides):
        commits = iter(_COMMITS)
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
            "stop_service": dict(return_value=True),
            "wait_for_service_stop": dict(return_value=True),
            "start_service": dict(return_value=True),
            "health_check": dict(return_value=True),
            "load_server_json": dict(return_value={"port": 24267}),
            "get_remote_version": dict(return_value=None),
            "checkout_version": dict(return_value=(True, None)),
            "_confirm_action": dict(return_value=False),
        }
        patches.update(overrides)
        with ExitStack() as stack:
            mocks = {n: stack.enter_context(patch(f"cli.system.{n}", **kw)) for n, kw in patches.items()}
            result = CliRunner().invoke(system.system, ["upgrade", "--no-backup"])
        return result, mocks

    def test_cancel_restarts_and_verifies(self):
        result, m = self._run_without_yes()
        assert result.exit_code == 0
        out = _flat(result.output)
        assert "Cancelled" in out and "Server is RUNNING" in out
        m["start_service"].assert_called_once()
        assert m["health_check"].call_count >= 1  # the restart, then the final state line
        m["checkout_version"].assert_not_called()

    def test_cancel_whose_restart_fails_says_down(self):
        result, _ = self._run_without_yes(
            health_check=dict(return_value=False),
            is_service_running=dict(side_effect=[True, False]),
        )
        assert result.exit_code == 1
        out = _flat(result.output)
        assert "did not come back up" in out and "Server is DOWN" in out


class TestSystemStopTimeout:
    def _stop(self, running, state="inactive"):
        states = iter(running)
        with patch("cli.system.is_server_installed", return_value=True), \
             patch("cli.system.is_service_running", side_effect=lambda: next(states)), \
             patch("cli.system.stop_service", return_value=False), \
             patch("cli.system.wait_for_service_settled", return_value=state), \
             patch("cli.system.service_state", return_value=state), \
             patch("cli.system.load_server_json", return_value={}), \
             patch("cli.system.start_service") as start:
            result = CliRunner().invoke(system.system, ["stop"])
        start.assert_not_called()  # the operator asked for it stopped
        return result

    def test_stop_that_completed_late_is_reported_as_down(self):
        result = self._stop([True, False])
        assert result.exit_code == 0
        assert "The server is DOWN: the stop completed after the CLI stopped waiting" in _flat(result.output)

    def test_stop_ending_in_failed_state_is_down(self):
        """SIGKILL at TimeoutStopSec leaves the unit "failed": stopped."""
        result = self._stop([True, False], state="failed")
        assert result.exit_code == 0

    def test_stop_that_did_not_take_is_reported_as_running(self):
        result = self._stop([True, True], state="active")
        assert result.exit_code == 1
        assert "The server is still RUNNING" in _flat(result.output)

    def test_unreadable_state_is_not_reported_as_stopped(self):
        """Review finding 6: "not active" because systemctl could not answer
        is not a stop; exit non-zero and say the state is unconfirmed."""
        result = self._stop([True, False], state="unknown")
        assert result.exit_code == 1
        out = _flat(result.output)
        assert "Could not confirm the server stopped" in out and "'unknown'" in out
        assert "is DOWN" not in out


class TestStopServiceToleratesNonZeroExit:
    """Review finding 4. systemd finishes a stop job as done once the unit
    is inactive OR failed (src/core/unit.c, unit_process_job), so
    `systemctl stop` exits 0 even after a SIGKILL. Should one exit non-zero
    anyway, judge by the settled state."""

    def _stop(self, settled):
        err = subprocess.CalledProcessError(1, ["systemctl"])
        with patch("cli.system.get_os", return_value="linux"), \
             patch("cli.system.run_command", side_effect=err), \
             patch("cli.system.wait_for_service_settled", return_value=settled):
            return stop_service()

    def test_settled_failed_is_stopped(self):
        assert self._stop("failed") is True

    def test_settled_inactive_is_stopped(self):
        assert self._stop("inactive") is True

    def test_still_active_is_a_failure(self):
        assert self._stop("active") is False

    def test_still_deactivating_is_a_failure(self):
        assert self._stop("deactivating") is False


class TestServiceStateTimeout:
    @patch("cli.system.get_os", return_value="linux")
    def test_is_active_gets_a_short_timeout(self, _os):
        """Review finding 5: each poll must not be able to hang for 60s."""
        with patch("cli.system.run_command", return_value=MagicMock(stdout="active\n")) as run:
            assert system.service_state() == "active"
        assert run.call_args.kwargs["timeout"] == 5


class TestPrintServiceState:
    """Review finding 2: an active unit is not a serving app."""

    def _say(self, running, healthy):
        with patch("cli.system.is_service_running", return_value=running), \
             patch("cli.system.health_check", return_value=healthy) as hc, \
             patch("cli.system.console") as console:
            system._print_service_state(24267, "127.0.0.1")
        return " ".join(str(c.args[0]) for c in console.print.call_args_list), hc

    def test_active_and_healthy_is_running(self):
        out, hc = self._say(True, True)
        assert "RUNNING and answering /health" in out
        hc.assert_called_once_with(24267, timeout=10, host="127.0.0.1")

    def test_active_but_not_answering_is_not_serving(self):
        out, _ = self._say(True, False)
        assert "NOT SERVING" in out and "RUNNING" not in out

    def test_inactive_is_down(self):
        out, hc = self._say(False, True)
        assert "DOWN" in out
        hc.assert_not_called()


class TestRollBackRestoreGuard:
    """Review finding 1: _roll_back must not copy a backup over a database a
    still-dying process may hold. A stop in progress reads as not active and
    uvicorn has already closed its port, so only a successful stop that
    settled to inactive/failed makes the restore safe."""

    def _roll_back(self, tmp_path, *, stopped, settled, port_in_use=False):
        backup = tmp_path / "chaotic.db.backup-20261013-000000"
        backup.write_bytes(b"")
        with patch("cli.system.stop_service", return_value=stopped), \
             patch("cli.system.wait_for_service_settled", return_value=settled), \
             patch("cli.system.checkout_version", return_value=(True, None)) as checkout, \
             patch("cli.system.is_service_running", return_value=False), \
             patch("cli.system.is_port_in_use", return_value=port_in_use), \
             patch("cli.system.restore_backup", return_value=True) as restore, \
             patch("cli.system.resync_checkout", return_value=(True, "re-synced")), \
             patch("cli.system.start_service", return_value=True), \
             patch("cli.system.health_check", return_value=True), \
             patch("cli.system.console") as console:
            system._roll_back("19ae385deployed", backup, port=24267, host="127.0.0.1")
        out = " ".join(str(c.args[0]) for c in console.print.call_args_list)
        checkout.assert_called_once_with("19ae385deployed", force=True)
        return restore, _flat(out), backup

    def test_stop_still_in_progress_with_port_free_does_not_restore(self, tmp_path):
        restore, out, backup = self._roll_back(tmp_path, stopped=True, settled="deactivating")
        restore.assert_not_called()
        assert "NOT restoring the database backup: the server did not stop cleanly" in out
        assert "'deactivating'" in out
        assert f"--restore {backup.name}" in out

    def test_failed_stop_does_not_restore(self, tmp_path):
        restore, out, _ = self._roll_back(tmp_path, stopped=False, settled="inactive")
        restore.assert_not_called()
        assert "did not stop cleanly" in out

    def test_clean_stop_restores(self, tmp_path):
        restore, out, backup = self._roll_back(tmp_path, stopped=True, settled="inactive")
        restore.assert_called_once_with(backup, port=24267, host="127.0.0.1")

    def test_stop_ending_failed_after_sigkill_restores(self, tmp_path):
        restore, _, _ = self._roll_back(tmp_path, stopped=True, settled="failed")
        restore.assert_called_once()


class TestCrashLoopingUnitIsStopped:
    """Review finding 3: a unit in auto-restart reads "activating", not
    running. It must still be stopped before the backup, or systemd keeps
    relaunching the old code through checkout and migrate."""

    def test_activating_unit_is_stopped_then_started_at_the_end(self):
        result, m = _upgrade(
            is_service_running=dict(return_value=False),
            service_state=dict(return_value="activating"),
        )
        assert result.exit_code == 0, result.output
        out = _flat(result.output)
        assert "Stopping server (service state 'activating')" in out
        m["stop_service"].assert_called_once()
        m["start_service"].assert_called_once()
        m["get_remote_version"].assert_called_once()  # only after; nothing served before

    def test_failed_unit_is_not_stopped(self):
        result, m = _upgrade(
            is_service_running=dict(return_value=False),
            service_state=dict(return_value="failed"),
        )
        assert result.exit_code == 0, result.output
        m["stop_service"].assert_not_called()
        m["start_service"].assert_called_once()


class TestRollbackFromStoppedSaysSo:
    """Review finding 7."""

    def test_rollback_after_a_from_stopped_upgrade_names_the_old_version_start(self):
        result, _ = _upgrade(
            is_service_running=dict(return_value=False),
            service_state=dict(return_value="inactive"),
            health_check=dict(return_value=False),
        )
        assert result.exit_code == 1
        assert ("The server was not running before this upgrade; starting the previous version anyway"
                in _flat(result.output))

    def test_rollback_after_a_running_upgrade_does_not(self):
        result, _ = _upgrade(health_check=dict(return_value=False))
        assert result.exit_code == 1
        assert "was not running before this upgrade" not in _flat(result.output)


class TestUpgradeRepeatsThePathWarning:
    """Review M1 (CHT-1695): the PATH warning, printed when the CLI was
    installed, is repeated after the success line so it is not lost
    behind the migrations and the restart."""

    def test_the_last_lines_carry_the_warning(self):
        def migrate(fake_initial=False, progress=None, reinstall=True):
            progress.update(cli_installed=True, cli_path_warning="`chaotic` on this shell's PATH is /opt/x")
            return True, "Migrations applied"

        result, _ = _upgrade(run_migrations=dict(side_effect=migrate))
        assert result.exit_code == 0, result.output
        tail = result.output[result.output.index("Upgraded to"):]
        assert "Warning: `chaotic` on this shell's PATH is /opt/x" in _flat(tail)

    def test_no_warning_adds_nothing(self):
        result, _ = _upgrade()
        assert result.exit_code == 0, result.output
        assert "Warning:" not in result.output[result.output.index("Upgraded to"):]
