"""`system upgrade` regenerates the service file (CHT-1476).

Only install and reconfigure used to write the systemd unit / launchd
plist, so TimeoutStopSec=30 (CHT-1474) never reached existing installs.
The rewrite may only ADD settings: anything the file on disk sets that the
regenerated file would drop or change blocks it (PR #320 review).
"""
import shlex
import stat
import subprocess
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from cli import system
from cli.system import (
    DATABASE_PATH,
    PROJECT_DIR,
    SERVICE_BACKUPS_KEPT,
    SYSTEMD_TIMEOUT_STOP_SEC,
    ServiceFileUpdate,
    generate_launchd_plist,
    generate_systemd_service,
    reconcile_service_file,
    restore_service_file,
)

from test_service_stop_start import JUSTFILE, _flat, _upgrade

SECRET = "s3cr3t-0123456789abcdef"
PORT = 24267
HOST = "127.0.0.1"
TIMEOUT_LINE = f"TimeoutStopSec={SYSTEMD_TIMEOUT_STOP_SEC}\n"


def _current_unit(port=PORT, secret=SECRET, host=HOST):
    return generate_systemd_service(port, secret, host)


def _unit_before_cht_1474(port=PORT, secret=SECRET, host=HOST):
    """cb5cc62..cfc4ee9: today's unit without TimeoutStopSec."""
    unit = _current_unit(port, secret, host)
    assert TIMEOUT_LINE in unit
    return unit.replace(TIMEOUT_LINE, "")


# The two older unit shapes, as `git log -S "Environment=HOST"` and
# `-S "Environment=PATH"` on cli/src/cli/system.py find them, rendered with
# this machine's paths the way those generators rendered them.
def _unit_3769dba(port=PORT, secret=SECRET):
    """3769dba (PATH added) .. cb5cc62 (HOST added, CHT-761)."""
    home = Path.home()
    return f"""[Unit]
Description=Chaotic Server
After=network.target

[Service]
Type=simple
WorkingDirectory={shlex.quote(str(PROJECT_DIR))}
ExecStart=/usr/bin/env just serve-prod
Restart=on-failure
RestartSec=5
Environment=PATH={home}/.local/bin:{home}/.cargo/bin:/usr/local/bin:/usr/bin:/bin
Environment=DATABASE_URL={shlex.quote(f"sqlite+aiosqlite:///{DATABASE_PATH}")}
Environment=DATABASE_PATH={shlex.quote(str(DATABASE_PATH))}
Environment=PORT={port}
Environment=SECRET_KEY={secret}

[Install]
WantedBy=default.target
"""


def _unit_40b994d(port=PORT, secret=SECRET):
    """40b994d, the initial release: no PATH, no HOST."""
    unit = _unit_3769dba(port, secret)
    return "\n".join(line for line in unit.split("\n") if not line.startswith("Environment=PATH="))


def _plist_before_cht_1474(port=PORT, secret=SECRET, host=HOST):
    plist = generate_launchd_plist(port, secret, host)
    legacy = plist.replace(
        f"    <key>ExitTimeOut</key>\n    <integer>{SYSTEMD_TIMEOUT_STOP_SEC}</integer>\n", "")
    assert legacy != plist
    return legacy


def _plist_40b994d(port=PORT, secret=SECRET):
    """40b994d: no HOST and no ExitTimeOut."""
    plist = _plist_before_cht_1474(port, secret)
    legacy = plist.replace(f"        <key>HOST</key>\n        <string>{HOST}</string>\n", "")
    assert legacy != plist
    return legacy


def _mode(path):
    return stat.S_IMODE(path.stat().st_mode)


@pytest.fixture
def env(tmp_path):
    """A service file location and backup directory under tmp_path, and a
    recorded run_command."""
    class Env:
        path = tmp_path / "chaotic.service"
        backups = tmp_path / "service-backups"
        os_type = "linux"
        run = None

        def install(self, content, os_type="linux"):
            self.os_type = os_type
            name = "chaotic.service" if os_type == "linux" else "com.chaotic.server.plist"
            self.path = tmp_path / name
            self.path.write_bytes(content.encode())  # keep CRLF as written
            self.path.chmod(0o600)
            return self.path

        def backup_files(self):
            return sorted(self.backups.glob("*.bak")) if self.backups.exists() else []

        def commands(self):
            return [c.args[0] for c in self.run.call_args_list]

    e = Env()
    with patch("cli.system.get_os", side_effect=lambda: e.os_type), \
         patch("cli.system.get_service_file_path", side_effect=lambda: e.path), \
         patch("cli.system.SERVICE_BACKUP_DIR", e.backups), \
         patch("cli.system.run_command", return_value=MagicMock(returncode=0, stdout="")) as run:
        e.run = run
        yield e


def _assert_skipped_untouched(env, path, before, result, *in_reason):
    assert result.status == "skipped", result.reason
    for text in in_reason:
        assert text in result.reason
    assert path.read_bytes() == before.encode()
    assert env.backup_files() == []
    env.run.assert_not_called()


class TestLinuxRewrites:
    @pytest.mark.parametrize("old", [
        _unit_before_cht_1474(), _unit_3769dba(), _unit_40b994d(),
        _unit_before_cht_1474().replace("\n", "\r\n"),
        "# managed by chaotic\n" + _unit_before_cht_1474().replace("[Service]\n", "[Service]\n; local note\n"),
        # One Environment= line may carry several assignments.
        _unit_before_cht_1474().replace(
            f"Environment=PORT={PORT}\nEnvironment=SECRET_KEY={SECRET}",
            f"Environment=PORT={PORT} SECRET_KEY={SECRET}"),
    ], ids=["before-cht-1474", "3769dba", "40b994d-initial", "crlf", "comments", "multi-assignment"])
    def test_historical_units_are_rewritten(self, env, old):
        path = env.install(old)
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "updated", result.reason
        assert path.read_text() == _current_unit()
        assert _mode(path) == 0o600
        assert result.backup.parent == env.backups
        assert result.backup.read_bytes() == old.encode()
        assert _mode(result.backup) == 0o600 and _mode(env.backups) == 0o700
        assert env.commands() == [["systemctl", "--user", "daemon-reload"]]
        assert f"+{TIMEOUT_LINE.strip()}" in result.diff

    def test_diff_redacts_every_environment_value(self, env):
        env.install(_unit_40b994d())
        diff = reconcile_service_file(PORT, HOST, SECRET).diff
        assert "+Environment=HOST=<redacted>" in diff
        assert "+Environment=PATH=<redacted>" in diff
        text = "\n".join(diff)
        for value in (SECRET, str(DATABASE_PATH), "/usr/local/bin", f"={PORT}"):
            assert value not in text

    def test_up_to_date_unit_is_left_alone(self, env):
        path = env.install(_current_unit())
        before = path.stat().st_mtime_ns
        assert reconcile_service_file(PORT, HOST, SECRET).status == "unchanged"
        assert path.stat().st_mtime_ns == before
        assert env.backup_files() == []
        env.run.assert_not_called()


class TestLinuxBlockers:
    """Anything the rewrite would drop or change, or that the parser cannot
    vouch for, leaves the file alone. Reasons name settings, never values."""

    @pytest.mark.parametrize("old, reason", [
        (_unit_before_cht_1474().replace("RestartSec=5\n", "RestartSec=5\nEnvironment=SMTP_PASSWORD=hunter2\n"),
         "Environment SMTP_PASSWORD"),
        (_unit_before_cht_1474().replace("RestartSec=5\n", "RestartSec=5\nEnvironment=CORS=a SMTP_PASSWORD=hunter2\n"),
         "Environment CORS, Environment SMTP_PASSWORD"),
        (_unit_before_cht_1474().replace(
            "Environment=PATH=", "Environment=PATH=/opt/hunter2:"), "Environment PATH"),
        (_unit_before_cht_1474().replace("RestartSec=5\n", "RestartSec=5\nEnvironmentFile=/etc/hunter2.env\n"),
         "EnvironmentFile"),
        (_unit_before_cht_1474().replace("ExecStart=/usr/bin/env just serve-prod",
                                         "ExecStart=/usr/bin/env just serve-hunter2"), "ExecStart"),
        (_unit_before_cht_1474().replace("RestartSec=5\n", "RestartSec=5\nExecStartPre=/bin/hunter2\n"),
         "ExecStartPre"),
        (_unit_before_cht_1474().replace("RestartSec=5\n", "RestartSec=5\nNice=5\n"), "Nice"),
        (_unit_before_cht_1474().replace("Restart=on-failure", "Restart=always"), "Restart"),
        (_unit_before_cht_1474().replace("RestartSec=5\n", "RestartSec=5\nTimeoutStopSec=90\n"), "TimeoutStopSec"),
        (_unit_before_cht_1474().replace("RestartSec=5\n", "RestartSec=5\nEnvironment=\n"), "empty Environment="),
    ], ids=["extra-env", "extra-env-multi", "changed-env", "environmentfile", "execstart",
            "execstartpre", "nice", "restart", "own-timeout", "env-reset"])
    def test_settings_the_rewrite_would_lose_block_it(self, env, old, reason):
        path = env.install(old)
        result = reconcile_service_file(PORT, HOST, SECRET)
        _assert_skipped_untouched(env, path, old, result, reason)
        assert "hunter2" not in result.reason

    @pytest.mark.parametrize("old, reason", [
        (_unit_before_cht_1474(secret="a-different-secret"), "SECRET_KEY"),
        (_unit_before_cht_1474(port=9999), "PORT"),
        (_unit_before_cht_1474(host="0.0.0.0"), "HOST"),
        (_unit_before_cht_1474().replace("WorkingDirectory=", "WorkingDirectory=/elsewhere"), "WorkingDirectory"),
        # Quoted: systemd unquotes it; we refuse to vouch for it.
        (_unit_before_cht_1474().replace(f"Environment=SECRET_KEY={SECRET}", f'Environment="SECRET_KEY={SECRET}"'),
         "SECRET_KEY more than once or quoted"),
        # The review's case: a later quoted assignment wins in systemd.
        (_unit_before_cht_1474().replace(
            f"Environment=SECRET_KEY={SECRET}",
            f'Environment=SECRET_KEY={SECRET}\nEnvironment="SECRET_KEY=other"'),
         "SECRET_KEY"),
        # Duplicated even with the same value.
        (_unit_before_cht_1474().replace(
            f"Environment=PORT={PORT}", f"Environment=PORT={PORT}\nEnvironment=PORT={PORT}"),
         "PORT more than once or quoted"),
        # A second assignment hidden in a multi-assignment line.
        (_unit_before_cht_1474().replace(
            f"Environment=PORT={PORT}", f"Environment=PORT={PORT} SECRET_KEY=other"),
         "SECRET_KEY"),
        (_unit_before_cht_1474().replace(
            "WorkingDirectory=", f"WorkingDirectory={PROJECT_DIR}\nWorkingDirectory="),
         "WorkingDirectory more than once"),
    ], ids=["secret", "port", "host", "workdir", "quoted-secret", "later-quoted-secret",
            "duplicate-port", "multi-assignment-secret", "duplicate-workdir"])
    def test_identity_doubts_block_it(self, env, old, reason):
        path = env.install(old)
        result = reconcile_service_file(PORT, HOST, SECRET)
        _assert_skipped_untouched(env, path, old, result, reason)
        assert SECRET not in result.reason and "other" not in result.reason

    @pytest.mark.parametrize("old", [
        _unit_before_cht_1474().replace("RestartSec=5\n", "RestartSec=5 \\\n"),
        _unit_before_cht_1474().replace("RestartSec=5\n", "RestartSec=5\nEnvironment=\"UNCLOSED=1\n"),
        _unit_before_cht_1474().replace("RestartSec=5\n", "RestartSec=5\nEnvironment=NOEQUALS\n"),
        _unit_before_cht_1474().replace("RestartSec=5\n", "RestartSec=5\nnot a directive\n"),
    ], ids=["continuation", "unclosed-quote", "no-equals", "garbage"])
    def test_unparseable_unit_is_left_alone(self, env, old):
        path = env.install(old)
        _assert_skipped_untouched(env, path, old, reconcile_service_file(PORT, HOST, SECRET), "could not parse")

    def test_unit_without_host_is_not_moved_to_a_different_one(self, env):
        old = _unit_3769dba()
        path = env.install(old)
        _assert_skipped_untouched(env, path, old, reconcile_service_file(PORT, "0.0.0.0", SECRET), "HOST")

    def test_justfile_default_host_is_what_the_code_assumes(self):
        assert f"--host ${{HOST:-{system._JUSTFILE_DEFAULT_HOST}}}" in JUSTFILE.read_text()

    def test_no_secret_in_server_json(self, env):
        path = env.install(_unit_before_cht_1474())
        _assert_skipped_untouched(env, path, _unit_before_cht_1474(),
                                  reconcile_service_file(PORT, HOST, ""), "secret_key")

    def test_missing_unit_is_not_created(self, env):
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "skipped" and "no service file" in result.reason
        assert not env.path.exists()

    def test_symlinked_unit_is_left_alone(self, env, tmp_path):
        target = tmp_path / "dotfiles-chaotic.service"
        target.write_text(_unit_before_cht_1474())
        env.path.symlink_to(target)
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "skipped" and "symlink" in result.reason
        assert env.path.is_symlink() and target.read_text() == _unit_before_cht_1474()
        assert env.backup_files() == []

    def test_unwritable_is_skipped_not_raised(self, env):
        path = env.install(_unit_before_cht_1474())
        with patch("cli.system._write_private_file", side_effect=PermissionError("read-only")):
            result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "skipped" and "could not write" in result.reason
        assert path.read_text() == _unit_before_cht_1474()

    def test_failed_daemon_reload_still_reports_the_write(self, env):
        env.install(_unit_before_cht_1474())
        env.run.side_effect = subprocess.CalledProcessError(1, ["systemctl"])
        assert reconcile_service_file(PORT, HOST, SECRET).status == "updated"


class TestBackups:
    def test_backups_accumulate_and_only_the_newest_are_kept(self, env):
        env.backups.mkdir()
        for i in range(SERVICE_BACKUPS_KEPT + 2):
            (env.backups / f"chaotic.service.20200101-00000{i}-000000.bak").write_text(f"old {i}")
        (env.backups / "com.chaotic.server.plist.20200101-000000-000000.bak").write_text("other file")
        env.install(_unit_before_cht_1474())
        result = reconcile_service_file(PORT, HOST, SECRET)
        kept = sorted(env.backups.glob("chaotic.service.*.bak"))
        assert len(kept) == SERVICE_BACKUPS_KEPT
        assert result.backup in kept
        assert (env.backups / "com.chaotic.server.plist.20200101-000000-000000.bak").exists()

    def test_a_second_rewrite_does_not_clobber_the_first_backup(self, env):
        first_unit = _unit_40b994d()
        env.install(first_unit)
        first = reconcile_service_file(PORT, HOST, SECRET)
        env.install(_unit_before_cht_1474())
        second = reconcile_service_file(PORT, HOST, SECRET)
        assert first.backup != second.backup
        assert first.backup.read_text() == first_unit

    def test_restore_puts_this_runs_backup_back(self, env):
        old = _unit_before_cht_1474()
        path = env.install(old)
        result = reconcile_service_file(PORT, HOST, SECRET)
        env.run.reset_mock()
        assert restore_service_file(result) is True
        assert path.read_text() == old and _mode(path) == 0o600
        assert env.commands() == [["systemctl", "--user", "daemon-reload"]]

    def test_restore_is_byte_exact_for_a_crlf_unit(self, env):
        old = _unit_before_cht_1474().replace("\n", "\r\n")
        path = env.install(old)
        assert restore_service_file(reconcile_service_file(PORT, HOST, SECRET)) is True
        assert path.read_bytes() == old.encode()

    def test_restore_with_the_backup_gone_reports_failure(self, env):
        env.install(_unit_before_cht_1474())
        result = reconcile_service_file(PORT, HOST, SECRET)
        result.backup.unlink()
        assert restore_service_file(result) is False

    def test_restore_of_a_non_update_does_nothing(self, env):
        assert restore_service_file(ServiceFileUpdate("unchanged", env.path)) is True
        env.run.assert_not_called()


class TestMacOS:
    @pytest.mark.parametrize("old", [_plist_before_cht_1474(), _plist_40b994d()],
                             ids=["before-cht-1474", "40b994d-initial"])
    def test_historical_plists_are_rewritten_without_systemctl(self, env, old):
        path = env.install(old, os_type="darwin")
        result = reconcile_service_file(PORT, HOST, SECRET)
        assert result.status == "updated", result.reason
        assert path.read_text() == generate_launchd_plist(PORT, SECRET, HOST)
        assert result.backup.read_text() == old and _mode(result.backup) == 0o600
        assert "+    <key>ExitTimeOut</key>" in result.diff
        text = "\n".join(result.diff)
        assert SECRET not in text and str(DATABASE_PATH) not in text
        env.run.assert_not_called()  # start_service's unload/load picks it up

    def test_up_to_date_plist_is_left_alone(self, env):
        env.install(generate_launchd_plist(PORT, SECRET, HOST), os_type="darwin")
        assert reconcile_service_file(PORT, HOST, SECRET).status == "unchanged"
        assert env.backup_files() == []

    @pytest.mark.parametrize("old, reason", [
        (_plist_before_cht_1474(secret="another"), "SECRET_KEY"),
        (_plist_before_cht_1474().replace(
            "        <key>PORT</key>",
            "        <key>SMTP_PASSWORD</key>\n        <string>hunter2</string>\n        <key>PORT</key>"),
         "Environment SMTP_PASSWORD"),
        (_plist_before_cht_1474().replace(
            "    <key>RunAtLoad</key>", "    <key>UserName</key>\n    <string>hunter2</string>\n    <key>RunAtLoad</key>"),
         "UserName"),
        (_plist_before_cht_1474().replace("<string>serve-prod</string>", "<string>serve-hunter2</string>"),
         "ProgramArguments"),
    ], ids=["secret", "extra-env", "extra-key", "program"])
    def test_plist_blockers(self, env, old, reason):
        path = env.install(old, os_type="darwin")
        result = reconcile_service_file(PORT, HOST, SECRET)
        _assert_skipped_untouched(env, path, old, result, reason)
        assert "hunter2" not in result.reason

    def test_unparseable_plist_is_left_alone(self, env):
        path = env.install("<plist><dict><key>broken", os_type="darwin")
        _assert_skipped_untouched(env, path, "<plist><dict><key>broken",
                                  reconcile_service_file(PORT, HOST, SECRET), "could not parse")


def test_unsupported_os_is_skipped():
    with patch("cli.system.get_os", return_value="unsupported"), \
         patch("cli.system.get_service_file_path") as get_path:
        assert reconcile_service_file(PORT, HOST, SECRET).status == "skipped"
    get_path.assert_not_called()


class TestDuringUpgrade:
    """The rewrite happens while the server is down, before it is started,
    and a rollback starts the old code under the old unit."""

    def _run(self, tmp_path, unit, os_type="linux", **overrides):
        name = "chaotic.service" if os_type == "linux" else "com.chaotic.server.plist"
        path = tmp_path / name
        path.write_text(unit)
        seen_at_start = []

        def start():
            seen_at_start.append(path.read_text())
            return True

        defaults = dict(
            load_server_json=dict(return_value={"port": PORT, "host": HOST, "secret_key": SECRET}),
            get_os=dict(return_value=os_type),
            get_service_file_path=dict(return_value=path),
            SERVICE_BACKUP_DIR=dict(new=tmp_path / "service-backups"),
            start_service=dict(side_effect=start),
        )
        defaults.update(overrides)
        result, mocks = _upgrade(**defaults)
        return result, mocks, path, seen_at_start

    def test_stale_unit_is_rewritten_before_start(self, tmp_path):
        result, m, path, seen = self._run(tmp_path, _unit_before_cht_1474())
        assert result.exit_code == 0, result.output
        assert seen == [_current_unit()]
        out = _flat(result.output)
        assert "Updated service file" in out
        assert f"+TimeoutStopSec={SYSTEMD_TIMEOUT_STOP_SEC}" in out
        assert SECRET not in result.output
        assert ["systemctl", "--user", "daemon-reload"] in [c.args[0] for c in m["run_command"].call_args_list]
        m["stop_service"].assert_called_once()

    def test_current_unit_is_untouched(self, tmp_path):
        result, m, _, _ = self._run(tmp_path, _current_unit())
        assert result.exit_code == 0, result.output
        assert "Service file is up to date" in _flat(result.output)
        assert not (tmp_path / "service-backups").exists()
        assert ["systemctl", "--user", "daemon-reload"] not in [c.args[0] for c in m["run_command"].call_args_list]

    def test_blocked_unit_is_untouched_and_the_upgrade_goes_on(self, tmp_path):
        old = _unit_before_cht_1474().replace("RestartSec=5\n", "RestartSec=5\nEnvironment=SMTP_PASSWORD=hunter2\n")
        result, _, path, seen = self._run(tmp_path, old)
        assert result.exit_code == 0, result.output
        assert seen == [old]
        out = _flat(result.output)
        assert "Service file not updated" in out and "Environment SMTP_PASSWORD" in out
        assert "hunter2" not in result.output

    def test_rollback_restores_the_previous_unit(self, tmp_path):
        old = _unit_before_cht_1474()
        result, _, path, seen = self._run(tmp_path, old, health_check=dict(return_value=False))
        assert result.exit_code == 1
        assert seen == [_current_unit(), old]
        assert path.read_text() == old
        assert "Restored the previous service file" in _flat(result.output)

    def test_rollback_that_cannot_restore_the_unit_says_where_it_is(self, tmp_path):
        with patch("cli.system.restore_service_file", return_value=False):
            result, _, _, _ = self._run(tmp_path, _unit_before_cht_1474(), health_check=dict(return_value=False))
        assert result.exit_code == 1
        out = _flat(result.output)
        assert "Could not restore the previous service file" in out
        assert str(tmp_path / "service-backups") in out.replace(" ", "")  # rich may wrap the path

    def test_macos_upgrade_rewrites_the_plist(self, tmp_path):
        result, m, path, _ = self._run(tmp_path, _plist_40b994d(), os_type="darwin")
        assert result.exit_code == 0, result.output
        assert path.read_text() == generate_launchd_plist(PORT, SECRET, HOST)
        assert not any(c.args[0][:1] == ["systemctl"] for c in m["run_command"].call_args_list)

    def test_server_json_without_secret_upgrades_and_says_why(self, tmp_path):
        result, _, path, _ = self._run(
            tmp_path, _unit_before_cht_1474(), load_server_json=dict(return_value={"port": PORT}))
        assert result.exit_code == 0, result.output
        assert path.read_text() == _unit_before_cht_1474()
        assert "Service file not updated" in _flat(result.output)
