"""Socket activation on Linux (CHT-1970).

chaotic.socket holds the port, so a restart never closes it: a request
that arrives while an upgrade has the server down waits in the accept
queue and is served by the new version. The deploy gate (a flock the
upgrade holds from its stop until its start) keeps such a request from
starting the half-upgraded server.
"""
import os
import shutil
import signal
import subprocess
from unittest.mock import MagicMock, patch

import pytest
from click.testing import CliRunner

from cli import system
from cli.system import (
    SYSTEMD_SERVICE,
    SYSTEMD_SOCKET,
    generate_systemd_service,
    generate_systemd_socket,
    reconcile_service_file,
    restore_service_file,
)

from test_service_stop_start import _flat, _upgrade

SECRET = "s3cr3t-0123456789abcdef"  # gitleaks:allow (test fixture)
PORT = 24267
HOST = "127.0.0.1"


@pytest.fixture
def linux(tmp_path, monkeypatch):
    """Linux with flock, unit files under tmp_path, run_command recorded."""
    unit_dir = tmp_path / "systemd-user"
    unit_dir.mkdir()
    monkeypatch.setattr(system, "get_os", lambda: "linux")
    monkeypatch.setattr(system, "socket_activation_supported", lambda: True)
    monkeypatch.setattr(system, "get_systemd_user_dir", lambda: unit_dir)
    monkeypatch.setattr(system, "get_socket_file_path", lambda: unit_dir / SYSTEMD_SOCKET)
    monkeypatch.setattr(system, "get_service_file_path", lambda: unit_dir / SYSTEMD_SERVICE)
    monkeypatch.setattr(system, "SERVICE_BACKUP_DIR", tmp_path / "service-backups")
    run = MagicMock(return_value=MagicMock(returncode=0, stdout=""))
    monkeypatch.setattr(system, "run_command", run)
    return unit_dir, run


def _install_socket_mode(unit_dir):
    (unit_dir / SYSTEMD_SERVICE).write_text(generate_systemd_service(PORT, SECRET, HOST, socket=True))
    (unit_dir / SYSTEMD_SOCKET).write_text(generate_systemd_socket(PORT, HOST))


def _commands(run):
    return [c.args[0] for c in run.call_args_list]


class TestUnits:
    def test_socket_unit_adds_only_new_directives(self):
        classic = generate_systemd_service(PORT, SECRET, HOST, socket=False)
        socketed = generate_systemd_service(PORT, SECRET, HOST, socket=True)

        assert "Requires=" not in classic and "ExecStartPre" not in classic
        assert f"Requires={SYSTEMD_SOCKET}\n" in socketed
        assert f"{system.DEPLOY_GATE} true\n" in socketed
        assert f"TimeoutStartSec={system.SYSTEMD_TIMEOUT_START_SEC}\n" in socketed
        # Everything the classic unit says, the socket unit says unchanged,
        # so an upgrade can move an existing unit to it.
        added = {"Requires=chaotic.socket", f"TimeoutStartSec={system.SYSTEMD_TIMEOUT_START_SEC}"}
        rest = [line for line in socketed.splitlines()
                if line not in added and not line.startswith("ExecStartPre=")]
        assert [line for line in rest if line] == [line for line in classic.splitlines() if line]

    @pytest.mark.parametrize("host, listen", [
        ("127.0.0.1", "127.0.0.1:24267"),
        ("0.0.0.0", "0.0.0.0:24267"),
        ("::", "[::]:24267"),
        ("::1", "[::1]:24267"),
    ])
    def test_socket_listens_where_uvicorn_bound(self, host, listen):
        assert f"ListenStream={listen}\n" in generate_systemd_socket(PORT, host)

    def test_justfile_serves_the_passed_socket(self):
        from test_service_stop_start import JUSTFILE
        recipe = JUSTFILE.read_text().split("serve-prod:\n", 1)[1].split("\n\n", 1)[0]
        assert "${LISTEN_FDS:+--fd 3}" in recipe


class TestReconcile:
    def test_moves_a_classic_unit_to_socket_activation_and_rolls_back(self, linux):
        unit_dir, run = linux
        service = unit_dir / SYSTEMD_SERVICE
        classic = generate_systemd_service(PORT, SECRET, HOST, socket=False)
        service.write_text(classic)

        update = reconcile_service_file(PORT, HOST, SECRET)

        assert update.status == "updated", update.reason
        assert service.read_text() == generate_systemd_service(PORT, SECRET, HOST, socket=True)
        assert (unit_dir / SYSTEMD_SOCKET).read_text() == generate_systemd_socket(PORT, HOST)
        assert update.socket_change == "created"

        assert restore_service_file(update)
        assert service.read_text() == classic
        assert not (unit_dir / SYSTEMD_SOCKET).exists()

    def test_writes_a_missing_socket_beside_a_current_unit(self, linux):
        unit_dir, run = linux
        (unit_dir / SYSTEMD_SERVICE).write_text(generate_systemd_service(PORT, SECRET, HOST, socket=True))

        update = reconcile_service_file(PORT, HOST, SECRET)

        assert update.status == "unchanged"
        assert update.socket_change == "created"
        assert (unit_dir / SYSTEMD_SOCKET).exists()
        assert ["systemctl", "--user", "daemon-reload"] in _commands(run)
        assert restore_service_file(update)
        assert not (unit_dir / SYSTEMD_SOCKET).exists()

    def test_updates_a_socket_on_another_port(self, linux):
        unit_dir, run = linux
        (unit_dir / SYSTEMD_SERVICE).write_text(generate_systemd_service(PORT, SECRET, HOST, socket=True))
        old = generate_systemd_socket(9999, HOST)
        (unit_dir / SYSTEMD_SOCKET).write_text(old)

        update = reconcile_service_file(PORT, HOST, SECRET)

        assert update.socket_change == "updated"
        assert restore_service_file(update)
        assert (unit_dir / SYSTEMD_SOCKET).read_text() == old

    def test_a_blocked_rewrite_writes_no_socket(self, linux):
        """A hand-set line the rewrite would drop: the unit stays classic,
        so a socket beside it would only take its port."""
        unit_dir, run = linux
        classic = generate_systemd_service(PORT, SECRET, HOST, socket=False)
        hand_set = classic.replace("[Install]", "Environment=CORS_ORIGINS=https://x.example\n[Install]")
        (unit_dir / SYSTEMD_SERVICE).write_text(hand_set)

        update = reconcile_service_file(PORT, HOST, SECRET)

        assert update.status == "skipped"
        assert not (unit_dir / SYSTEMD_SOCKET).exists()


class TestStartStop:
    def test_start_enables_and_starts_both_after_opening_the_gate(self, linux):
        unit_dir, run = linux
        _install_socket_mode(unit_dir)
        assert system.hold_deploy_gate()
        gate_open_at_start = []
        run.side_effect = lambda cmd, **kw: (
            gate_open_at_start.append(system._deploy_gate_fd is None) if cmd[2:3] == ["start"] else None
        ) or MagicMock(returncode=0, stdout="")

        assert system.start_service()

        cmds = _commands(run)
        assert ["systemctl", "--user", "enable", SYSTEMD_SOCKET, SYSTEMD_SERVICE] in cmds
        assert ["systemctl", "--user", "start", SYSTEMD_SOCKET, SYSTEMD_SERVICE] in cmds
        assert gate_open_at_start == [True]

    def test_full_stop_closes_the_port(self, linux):
        unit_dir, run = linux
        _install_socket_mode(unit_dir)
        assert system.stop_service()
        assert _commands(run)[-1] == ["systemctl", "--user", "stop", SYSTEMD_SOCKET, SYSTEMD_SERVICE]

    def test_keep_socket_stops_only_the_service(self, linux):
        unit_dir, run = linux
        _install_socket_mode(unit_dir)
        assert system.stop_service(keep_socket=True)
        assert _commands(run)[-1] == ["systemctl", "--user", "stop", SYSTEMD_SERVICE]

    def test_a_socket_beside_an_ungated_unit_is_not_socket_mode(self, linux):
        unit_dir, run = linux
        (unit_dir / SYSTEMD_SERVICE).write_text(generate_systemd_service(PORT, SECRET, HOST, socket=False))
        (unit_dir / SYSTEMD_SOCKET).write_text(generate_systemd_socket(PORT, HOST))
        assert not system.socket_mode_installed()

    def test_classic_install_is_unchanged(self, linux):
        unit_dir, run = linux
        assert system.stop_service() and system.start_service()
        cmds = _commands(run)
        assert ["systemctl", "--user", "stop", SYSTEMD_SERVICE] in cmds
        assert ["systemctl", "--user", "start", SYSTEMD_SERVICE] in cmds


@pytest.mark.skipif(shutil.which("flock") is None, reason="needs flock(1)")
class TestDeployGate:
    def _gate_free(self):
        """What the unit's ExecStartPre sees: can flock(1) take it now?"""
        return subprocess.run(["flock", "-n", str(system.DEPLOY_GATE), "true"]).returncode == 0

    def test_the_unit_waits_while_the_upgrade_holds_it(self):
        assert self._gate_free()
        assert system.hold_deploy_gate()
        assert not self._gate_free()
        system.release_deploy_gate()
        assert self._gate_free()

    def test_a_second_holder_is_refused(self):
        # `flock -o`: the lock is not passed on to `sleep`, so killing
        # flock releases it.
        holder = subprocess.Popen(["flock", "-o", str(system.DEPLOY_GATE), "sleep", "30"],
                                  start_new_session=True)
        try:
            for _ in range(50):
                if not self._gate_free():
                    break
                subprocess.run(["sleep", "0.05"])
            assert not system.hold_deploy_gate()
        finally:
            os.killpg(holder.pid, signal.SIGKILL)
            holder.wait()
        assert system.hold_deploy_gate()
        system.release_deploy_gate()

    def test_children_do_not_inherit_it(self):
        """uv, npm and systemctl run while the gate is held; a child that
        outlived the CLI must not keep the server gated."""
        assert system.hold_deploy_gate()
        child = subprocess.Popen(["sleep", "30"])
        try:
            system.release_deploy_gate()
            assert self._gate_free()
        finally:
            child.kill()
            child.wait()


class TestUpgradeWindow:
    def test_upgrade_keeps_the_port_and_gates_the_window(self, monkeypatch):
        monkeypatch.setattr(system, "socket_mode_installed", lambda: True)
        monkeypatch.setattr(system, "_justfile_serves_socket", lambda commit=None: True)
        gate_held_at_stop = []

        def stop(keep_socket=False):
            gate_held_at_stop.append((keep_socket, system._deploy_gate_fd is not None))
            return True

        def start():
            system.release_deploy_gate()
            return True

        result, m = _upgrade(stop_service=dict(side_effect=stop), start_service=dict(side_effect=start))

        assert result.exit_code == 0, result.output
        assert gate_held_at_stop == [(True, True)]
        assert system._deploy_gate_fd is None
        assert "The port stays open" in _flat(result.output)

    def test_upgrade_refuses_while_another_holds_the_gate(self, monkeypatch):
        monkeypatch.setattr(system, "socket_mode_installed", lambda: True)
        monkeypatch.setattr(system, "_justfile_serves_socket", lambda commit=None: True)
        result, m = _upgrade(hold_deploy_gate=dict(return_value=False))

        assert result.exit_code == 1
        assert "Another upgrade holds" in _flat(result.output)
        m["stop_service"].assert_not_called()

    def test_refuses_a_target_whose_justfile_cannot_serve_the_socket(self, monkeypatch):
        monkeypatch.setattr(system, "socket_mode_installed", lambda: True)
        monkeypatch.setattr(system, "_justfile_serves_socket", lambda commit=None: commit is None)
        result, m = _upgrade()

        assert result.exit_code == 1
        assert "predates socket activation" in _flat(result.output)
        m["stop_service"].assert_not_called()

    def test_classic_upgrade_takes_no_gate(self, monkeypatch):
        monkeypatch.setattr(system, "socket_mode_installed", lambda: False)
        result, m = _upgrade(hold_deploy_gate=dict(return_value=True))

        assert result.exit_code == 0, result.output
        m["hold_deploy_gate"].assert_not_called()
        m["stop_service"].assert_called_with(keep_socket=False)


class TestStartCommand:
    def test_our_own_socket_is_not_another_process_on_the_port(self):
        with patch("cli.system.is_server_installed", return_value=True), \
             patch("cli.system.is_service_running", return_value=False), \
             patch("cli.system.load_server_json", return_value={"port": PORT}), \
             patch("cli.system._socket_active", return_value=True), \
             patch("cli.system.is_port_in_use", return_value=True) as in_use, \
             patch("cli.system.start_service", return_value=True), \
             patch("cli.system.health_check", return_value=True):
            result = CliRunner().invoke(system.system, ["start"])

        assert result.exit_code == 0, result.output
        in_use.assert_not_called()


class TestReviewFindings:
    """PR #510 review."""

    def test_stop_closes_an_idle_socket(self):
        with patch("cli.system.is_server_installed", return_value=True), \
             patch("cli.system.is_service_running", return_value=False), \
             patch("cli.system._socket_active", return_value=True), \
             patch("cli.system.stop_service", return_value=True) as stop:
            result = CliRunner().invoke(system.system, ["stop"])

        assert result.exit_code == 0, result.output
        stop.assert_called_once_with()

    def test_restore_stops_an_idle_socket_and_never_probes_it(self, tmp_path):
        backup = tmp_path / "chaotic.db.backup-20261101"
        backup.write_text("x")
        active = iter([True, False, False, False])
        with patch("cli.system.is_server_installed", return_value=True), \
             patch("cli.system.list_backups", return_value=[backup]), \
             patch("cli.system.load_server_json", return_value={"port": PORT}), \
             patch("cli.system.is_service_running", return_value=False), \
             patch("cli.system._socket_active", side_effect=lambda: next(active, False)), \
             patch("cli.system.stop_service", return_value=True) as stop, \
             patch("cli.system.wait_for_service_stop", return_value=True), \
             patch("cli.system.restore_backup", return_value=True), \
             patch("cli.system.start_service", return_value=True), \
             patch("cli.system.health_check", return_value=True):
            result = CliRunner().invoke(system.system, ["backup", "--restore", "latest"])

        assert result.exit_code == 0, result.output
        stop.assert_called_once_with()

    def test_database_in_use_does_not_connect_to_an_active_socket(self):
        with patch("cli.system.is_service_running", return_value=False), \
             patch("cli.system._socket_active", return_value=True), \
             patch("cli.system.is_port_in_use") as probe:
            assert system.database_in_use(PORT, HOST)
        probe.assert_not_called()

    @pytest.mark.parametrize("host", ["localhost", "chaotic.internal", "fe80::1%eth0"])
    def test_names_and_scoped_addresses_keep_the_classic_unit(self, linux, host):
        unit_dir, run = linux
        system.write_service_file(PORT, SECRET, host)
        assert "ExecStartPre" not in (unit_dir / SYSTEMD_SERVICE).read_text()
        assert not (unit_dir / SYSTEMD_SOCKET).exists()

    def test_reconfigure_to_a_name_removes_the_socket(self, linux):
        unit_dir, run = linux
        _install_socket_mode(unit_dir)
        system.write_service_file(PORT, SECRET, "localhost")
        assert not (unit_dir / SYSTEMD_SOCKET).exists()
        assert ["systemctl", "--user", "disable", SYSTEMD_SOCKET] in _commands(run)

    def test_a_crashed_upgrade_leaves_the_hold_and_start_clears_it(self, linux):
        unit_dir, run = linux
        _install_socket_mode(unit_dir)
        unit = (unit_dir / SYSTEMD_SERVICE).read_text()
        assert f"! -e {system.DEPLOY_HOLD}" in unit
        assert system.hold_deploy_gate()
        assert system.DEPLOY_HOLD.exists()
        # The CLI dies: the kernel drops the flock, the hold file stays.
        os.close(system._deploy_gate_fd)
        system._deploy_gate_fd = None
        assert system.DEPLOY_HOLD.exists()
        assert system.start_service()
        assert not system.DEPLOY_HOLD.exists()

    def test_start_opens_the_gate_even_when_systemctl_fails(self, linux):
        unit_dir, run = linux
        _install_socket_mode(unit_dir)
        assert system.hold_deploy_gate()
        run.side_effect = subprocess.CalledProcessError(1, "systemctl")
        assert not system.start_service()
        assert system._deploy_gate_fd is None and not system.DEPLOY_HOLD.exists()

    def test_failed_stop_opens_the_gate_before_waiting(self, monkeypatch):
        assert system.hold_deploy_gate()
        seen = []
        monkeypatch.setattr(system, "wait_for_service_settled",
                            lambda *a, **k: seen.append(system._deploy_gate_fd) or "inactive")
        monkeypatch.setattr(system, "is_service_running", lambda: True)
        system._handle_failed_stop(PORT, HOST)
        assert seen == [None]

    def test_rollback_removes_a_socket_created_beside_an_unchanged_unit(self, linux, monkeypatch):
        unit_dir, run = linux
        (unit_dir / SYSTEMD_SERVICE).write_text(generate_systemd_service(PORT, SECRET, HOST, socket=True))
        update = reconcile_service_file(PORT, HOST, SECRET)
        assert update.status == "unchanged" and update.socket_change == "created"
        for name, value in {"stop_service": True, "wait_for_service_settled": "inactive",
                            "get_current_commit": "ab71cd5newer", "checkout_version": (True, ""),
                            "start_service": True, "database_in_use": False,
                            "_print_service_state": None}.items():
            monkeypatch.setattr(system, name, lambda *a, _v=value, **k: _v)
        monkeypatch.setattr(system, "_resync_for_rollback", lambda *a, **k: None)

        system._roll_back("19ae385deployed", None, port=PORT, host=HOST, service_update=update)

        assert not (unit_dir / SYSTEMD_SOCKET).exists()

    def test_upgrade_rebinds_a_socket_whose_address_changed(self, monkeypatch):
        update = system.ServiceFileUpdate("unchanged")
        update.socket_change = "updated"
        monkeypatch.setattr(system, "_socket_active", lambda: True)
        result, m = _upgrade(reconcile_service_file=dict(return_value=update),
                             restart_socket=dict(return_value=True))

        assert result.exit_code == 0, result.output
        m["restart_socket"].assert_called_once_with()
        assert m["start_service"].call_count == 1

    def test_reconfigure_restarts_an_idle_socket(self):
        with patch("cli.system.is_server_installed", return_value=True), \
             patch("cli.system.load_server_json",
                   return_value={"port": PORT, "host": HOST, "secret_key": SECRET}), \
             patch("cli.system.save_server_json"), \
             patch("cli.system.write_service_file", return_value="unit"), \
             patch("cli.system._current_service_file", return_value=(None, None, None)), \
             patch("cli.system.is_service_running", return_value=False), \
             patch("cli.system._socket_active", return_value=True), \
             patch("cli.system.is_port_in_use", return_value=False), \
             patch("cli.system.stop_service", return_value=True) as stop, \
             patch("cli.system.wait_for_service_stop", return_value=True), \
             patch("cli.system.start_service", return_value=True) as start, \
             patch("cli.system.health_check", return_value=True), \
             patch("cli.system.set_api_url"):
            result = CliRunner().invoke(system.system, ["reconfigure", "--port", "24300", "--yes"])

        assert result.exit_code == 0, result.output
        stop.assert_called_once_with()
        start.assert_called_once_with()


class TestReReviewFindings:
    """PR #510 re-review."""

    def test_a_cancelled_gated_upgrade_leaves_no_hold(self, monkeypatch):
        monkeypatch.setattr(system, "socket_mode_installed", lambda: True)
        monkeypatch.setattr(system, "_justfile_serves_socket", lambda commit=None: True)
        commits = iter(["19ae385deployed", "ab71cd5newer"])
        with patch("cli.system.is_server_installed", return_value=True), \
             patch("cli.system.get_current_version", return_value="v1"), \
             patch("cli.system.get_current_commit", side_effect=lambda: next(commits, "ab71cd5newer")), \
             patch("cli.system.fetch_updates", return_value=True), \
             patch("cli.system.resolve_commit", return_value="ab71cd5newer"), \
             patch("cli.system.upgrade_direction", return_value="forward"), \
             patch("cli.system._print_commit_list"), \
             patch("cli.system.service_state", return_value="inactive"), \
             patch("cli.system.is_service_running", return_value=False), \
             patch("cli.system.load_server_json", return_value={"port": PORT}), \
             patch("cli.system._print_service_state"), \
             patch("cli.system.stop_service") as stop:
            result = CliRunner().invoke(system.system, ["upgrade", "--version", "origin/main"], input="n\n")

        assert result.exit_code == 0, result.output
        assert "Cancelled" in result.output
        stop.assert_not_called()
        assert system._deploy_gate_fd is None
        assert not system.DEPLOY_HOLD.exists()

    def test_removing_the_socket_unit_stops_it_first(self, linux):
        unit_dir, run = linux
        _install_socket_mode(unit_dir)
        system._remove_socket_file()
        cmds = _commands(run)
        assert cmds.index(["systemctl", "--user", "stop", SYSTEMD_SOCKET]) < \
            cmds.index(["systemctl", "--user", "disable", SYSTEMD_SOCKET])

    @pytest.mark.skipif(shutil.which("flock") is None, reason="needs flock(1)")
    def test_another_upgrades_hold_is_not_removed(self):
        system.DEPLOY_HOLD.write_text("theirs")
        holder = subprocess.Popen(["flock", "-o", str(system.DEPLOY_GATE), "sleep", "30"],
                                  start_new_session=True)
        try:
            for _ in range(50):
                if subprocess.run(["flock", "-n", str(system.DEPLOY_GATE), "true"]).returncode:
                    break
                subprocess.run(["sleep", "0.05"])
            system.release_deploy_gate()
            assert system.DEPLOY_HOLD.read_text() == "theirs"
        finally:
            os.killpg(holder.pid, signal.SIGKILL)
            holder.wait()
