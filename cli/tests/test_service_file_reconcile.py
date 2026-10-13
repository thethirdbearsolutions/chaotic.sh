"""`system upgrade` regenerates the service file (CHT-1476).

Only install and reconfigure used to write the systemd unit / launchd
plist, so TimeoutStopSec=30 (CHT-1474) never reached existing installs.
"""
import stat
import subprocess
from unittest.mock import MagicMock, patch

import pytest

from cli import system
from cli.system import (
    SYSTEMD_TIMEOUT_STOP_SEC,
    ServiceFileUpdate,
    generate_launchd_plist,
    generate_systemd_service,
    reconcile_service_file,
    restore_service_file,
)

from test_service_stop_start import _flat, _upgrade

SECRET = "s3cr3t-0123456789abcdef"
PORT = 24267
HOST = "127.0.0.1"


def _legacy_unit(port=PORT, secret=SECRET, host=HOST):
    """A unit as install wrote it before CHT-1474: no TimeoutStopSec."""
    unit = generate_systemd_service(port, secret, host)
    legacy = unit.replace(f"TimeoutStopSec={SYSTEMD_TIMEOUT_STOP_SEC}\n", "")
    assert legacy != unit
    return legacy


def _legacy_plist(port=PORT, secret=SECRET, host=HOST):
    plist = generate_launchd_plist(port, secret, host)
    legacy = plist.replace(
        f"    <key>ExitTimeOut</key>\n    <integer>{SYSTEMD_TIMEOUT_STOP_SEC}</integer>\n", "")
    assert legacy != plist
    return legacy


def _mode(path):
    return stat.S_IMODE(path.stat().st_mode)


@pytest.fixture
def env(tmp_path):
    """A service file location under tmp_path and a recorded run_command."""
    class Env:
        path = None
        os_type = "linux"
        run = None

        def install(self, content, os_type="linux"):
            self.os_type = os_type
            name = "chaotic.service" if os_type == "linux" else "com.chaotic.server.plist"
            self.path = tmp_path / name
            self.path.write_text(content)
            self.path.chmod(0o600)
            return self.path

        def commands(self):
            return [c.args[0] for c in self.run.call_args_list]

    e = Env()
    e.path = tmp_path / "chaotic.service"
    with patch("cli.system.get_os", side_effect=lambda: e.os_type), \
         patch("cli.system.get_service_file_path", side_effect=lambda: e.path), \
         patch("cli.system.run_command", return_value=MagicMock(returncode=0, stdout="")) as run:
        e.run = run
        yield e


class TestLinux:
    def test_legacy_unit_is_rewritten_with_backup_reload_and_diff(self, env):
        old = _legacy_unit()
        path = env.install(old)
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "updated"
        assert path.read_text() == generate_systemd_service(PORT, SECRET, HOST)
        assert result.backup == path.with_name("chaotic.service.bak")
        assert result.backup.read_text() == old
        assert _mode(path) == 0o600 and _mode(result.backup) == 0o600
        assert env.commands() == [["systemctl", "--user", "daemon-reload"]]
        assert f"+TimeoutStopSec={SYSTEMD_TIMEOUT_STOP_SEC}" in result.diff
        assert not any(SECRET in line for line in result.diff)
        assert not any(line.startswith("-") and not line.startswith("---") for line in result.diff)

    def test_up_to_date_unit_is_left_alone(self, env):
        path = env.install(generate_systemd_service(PORT, SECRET, HOST))
        before = path.stat().st_mtime_ns
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "unchanged"
        assert path.stat().st_mtime_ns == before
        assert not path.with_name("chaotic.service.bak").exists()
        env.run.assert_not_called()

    @pytest.mark.parametrize("unit, key", [
        (_legacy_unit(secret="a-different-secret"), "SECRET_KEY"),
        (_legacy_unit(port=9999), "PORT"),
        (_legacy_unit(host="0.0.0.0"), "HOST"),
        # A hand edit our parser does not read as the same setting counts
        # as a disagreement, not as agreement.
        (_legacy_unit().replace(f"Environment=SECRET_KEY={SECRET}", f'Environment="SECRET_KEY={SECRET}"'),
         "SECRET_KEY"),
        (_legacy_unit().replace("WorkingDirectory=", "WorkingDirectory=/elsewhere"), "WorkingDirectory"),
    ])
    def test_identity_disagreement_is_never_overwritten(self, env, unit, key):
        path = env.install(unit)
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "skipped"
        assert key in result.reason
        assert path.read_text() == unit
        assert not path.with_name("chaotic.service.bak").exists()
        env.run.assert_not_called()

    def test_unit_from_before_host_existed_gets_the_default_host(self, env):
        """Units written before CHT-761 have no HOST line; the server bound
        to the justfile default, which is what gets written."""
        old = _legacy_unit().replace(f"Environment=HOST={HOST}\n", "")
        env.install(old)
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "updated"
        assert f"+Environment=HOST={HOST}" in result.diff

    def test_unit_without_host_is_not_moved_to_a_different_one(self, env):
        old = _legacy_unit().replace(f"Environment=HOST={HOST}\n", "")
        path = env.install(old)
        result = reconcile_service_file(PORT, "0.0.0.0", SECRET)
        assert result.status == "skipped" and "HOST" in result.reason
        assert path.read_text() == old

    def test_justfile_default_host_is_what_the_code_assumes(self):
        from test_service_stop_start import JUSTFILE
        assert f"--host ${{HOST:-{system._JUSTFILE_DEFAULT_HOST}}}" in JUSTFILE.read_text()

    def test_other_hand_edits_are_replaced_but_kept_in_the_backup(self, env):
        """Install would not preserve them either; the .bak and the diff do."""
        old = _legacy_unit().replace("RestartSec=5\n", "RestartSec=5\nNice=5\n")
        path = env.install(old)
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "updated"
        assert "-Nice=5" in result.diff
        assert result.backup.read_text() == old

    def test_no_secret_in_server_json_skips_without_reading(self, env):
        path = env.install(_legacy_unit())
        result = reconcile_service_file(PORT, HOST, "")
        assert result.status == "skipped"
        assert "secret_key" in result.reason
        assert path.read_text() == _legacy_unit()

    def test_missing_unit_is_not_created(self, env):
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "skipped"
        assert "no service file" in result.reason
        assert not env.path.exists()

    def test_failed_daemon_reload_still_reports_the_write(self, env):
        env.install(_legacy_unit())
        env.run.side_effect = subprocess.CalledProcessError(1, ["systemctl"])
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "updated"

    def test_unwritable_directory_is_skipped_not_raised(self, env):
        path = env.install(_legacy_unit())
        with patch("cli.system._write_private_file", side_effect=PermissionError("read-only")):
            result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "skipped"
        assert "could not write" in result.reason
        assert path.read_text() == _legacy_unit()

    def test_restore_puts_the_previous_unit_back(self, env):
        old = _legacy_unit()
        path = env.install(old)
        result = reconcile_service_file(PORT, HOST, SECRET)
        env.run.reset_mock()
        assert restore_service_file(result) is True
        assert path.read_text() == old
        assert _mode(path) == 0o600
        assert env.commands() == [["systemctl", "--user", "daemon-reload"]]

    def test_restore_of_a_non_update_does_nothing(self, env):
        assert restore_service_file(ServiceFileUpdate("unchanged", env.path)) is True
        env.run.assert_not_called()


class TestMacOS:
    def test_legacy_plist_is_rewritten_without_systemctl(self, env):
        old = _legacy_plist()
        path = env.install(old, os_type="darwin")
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "updated"
        assert path.read_text() == generate_launchd_plist(PORT, SECRET, HOST)
        assert result.backup.read_text() == old
        assert _mode(path) == 0o600 and _mode(result.backup) == 0o600
        assert "+    <key>ExitTimeOut</key>" in result.diff
        assert not any(SECRET in line for line in result.diff)
        env.run.assert_not_called()  # start_service's unload/load picks it up

    def test_up_to_date_plist_is_left_alone(self, env):
        path = env.install(generate_launchd_plist(PORT, SECRET, HOST), os_type="darwin")
        assert reconcile_service_file(PORT, HOST, SECRET).status == "unchanged"
        assert not path.with_name(path.name + ".bak").exists()

    def test_plist_with_another_secret_is_left_alone(self, env):
        unit = _legacy_plist(secret="another")
        path = env.install(unit, os_type="darwin")
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "skipped" and "SECRET_KEY" in result.reason
        assert path.read_text() == unit

    def test_unparseable_plist_is_left_alone(self, env):
        path = env.install("<plist><dict><key>broken", os_type="darwin")
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "skipped" and "could not parse" in result.reason
        assert path.read_text() == "<plist><dict><key>broken"


def test_unsupported_os_is_skipped():
    with patch("cli.system.get_os", return_value="unsupported"), \
         patch("cli.system.get_service_file_path") as get_path:
        assert reconcile_service_file(PORT, HOST, SECRET).status == "skipped"
    get_path.assert_not_called()


class TestDuringUpgrade:
    """The rewrite happens while the server is down, before it is started,
    and a rollback starts the old code under the old unit."""

    def _run(self, tmp_path, unit, **overrides):
        path = tmp_path / "chaotic.service"
        path.write_text(unit)
        seen_at_start = []

        def start():
            seen_at_start.append(path.read_text())
            return True

        defaults = dict(
            load_server_json=dict(return_value={"port": PORT, "host": HOST, "secret_key": SECRET}),
            get_os=dict(return_value="linux"),
            get_service_file_path=dict(return_value=path),
            start_service=dict(side_effect=start),
        )
        defaults.update(overrides)
        result, mocks = _upgrade(**defaults)
        return result, mocks, path, seen_at_start

    def test_stale_unit_is_rewritten_before_start(self, tmp_path):
        result, m, path, seen = self._run(tmp_path, _legacy_unit())
        assert result.exit_code == 0, result.output
        new = generate_systemd_service(PORT, SECRET, HOST)
        assert seen == [new]
        assert path.read_text() == new
        out = _flat(result.output)
        assert "Updated service file" in out
        assert f"+TimeoutStopSec={SYSTEMD_TIMEOUT_STOP_SEC}" in out
        assert SECRET not in result.output
        assert ["systemctl", "--user", "daemon-reload"] in [c.args[0] for c in m["run_command"].call_args_list]
        # Stopped first: the rewrite comes after the stop.
        m["stop_service"].assert_called_once()

    def test_current_unit_is_untouched(self, tmp_path):
        unit = generate_systemd_service(PORT, SECRET, HOST)
        result, m, path, _ = self._run(tmp_path, unit)
        assert result.exit_code == 0, result.output
        assert "Service file is up to date" in _flat(result.output)
        assert not path.with_name("chaotic.service.bak").exists()
        assert ["systemctl", "--user", "daemon-reload"] not in [c.args[0] for c in m["run_command"].call_args_list]

    def test_rollback_restores_the_previous_unit(self, tmp_path):
        old = _legacy_unit()
        result, _, path, seen = self._run(tmp_path, old, health_check=dict(return_value=False))
        assert result.exit_code == 1
        # First start under the new unit; the rollback start under the old.
        assert seen == [generate_systemd_service(PORT, SECRET, HOST), old]
        assert path.read_text() == old
        assert "Restored the previous service file" in _flat(result.output)

    def test_macos_upgrade_rewrites_the_plist(self, tmp_path):
        path = tmp_path / "com.chaotic.server.plist"
        path.write_text(_legacy_plist())
        result, m = _upgrade(
            load_server_json=dict(return_value={"port": PORT, "host": HOST, "secret_key": SECRET}),
            get_os=dict(return_value="darwin"),
            get_service_file_path=dict(return_value=path),
        )
        assert result.exit_code == 0, result.output
        assert path.read_text() == generate_launchd_plist(PORT, SECRET, HOST)
        assert not any(c.args[0][:1] == ["systemctl"] for c in m["run_command"].call_args_list)

    def test_server_json_without_secret_upgrades_and_says_why_unit_was_skipped(self, tmp_path):
        result, _, path, _ = self._run(
            tmp_path, _legacy_unit(), load_server_json=dict(return_value={"port": PORT}))
        assert result.exit_code == 0, result.output
        assert path.read_text() == _legacy_unit()
        assert "Service file not updated" in _flat(result.output)
