"""Stopping and starting the server service around `chaotic system upgrade`.

CHT-1474: `systemctl --user stop` outlasted the CLI's 60s subprocess timeout
(uvicorn waiting forever on /mcp streams, systemd waiting 90s to SIGKILL),
so the upgrade died on a raw TimeoutExpired traceback and left prod down.

CHT-1475: an upgrade that found the service already stopped checked out,
migrated, and printed "Upgraded to ..." without ever starting it.
"""
import re
import subprocess
from contextlib import ExitStack
from pathlib import Path
from unittest.mock import MagicMock, patch

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
