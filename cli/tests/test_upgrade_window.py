"""CHT-2000: the upgrade's stopped window is measured from before the stop,
each step's share is reported, and the CLI reinstall runs after the new
server is up instead of inside the window."""
import re
from unittest.mock import MagicMock, patch

from cli import system
from test_service_stop_start import _COMMITS, _flat, _upgrade

_REAL_AFTER_UPGRADE = system._reinstall_cli_after_upgrade


def _with_real_after_upgrade(monkeypatch):
    monkeypatch.setattr(system, "_reinstall_cli_after_upgrade", _REAL_AFTER_UPGRADE)


class TestWindowTiming:
    def test_the_report_names_every_step_from_the_stop_on(self):
        result, _ = _upgrade()

        assert result.exit_code == 0, result.output
        out = _flat(result.output)
        match = re.search(r"Server was down for \d+\.\ds \(([^)]*)\)\.", out)
        assert match, out
        steps = [part.rsplit(" ", 1)[0] for part in match.group(1).split(", ")]
        assert steps == ["stop", "checkout", "sync+migrate", "bundle+unit", "start", "health"]

    def test_the_stop_itself_counts(self):
        """The drain used to fall outside the figure: the timer started
        after stop_service() returned."""
        clock = iter(range(0, 1000, 5))
        with patch("cli.system.time.monotonic", side_effect=lambda: next(clock)):
            result, _ = _upgrade()

        assert result.exit_code == 0, result.output
        assert re.search(r"\(stop 5\.0s, ", _flat(result.output))

    def test_a_backup_is_its_own_step(self, tmp_path):
        db = tmp_path / "chaotic.db"
        db.write_bytes(b"")
        result, _ = _upgrade(
            args=(),
            DATABASE_PATH=dict(new=db),
            create_backup=dict(return_value=tmp_path / "b"),
            cleanup_old_backups=dict(return_value=None),
        )

        assert result.exit_code == 0, result.output
        assert re.search(r"\(stop \d+\.\ds, backup \d+\.\ds, checkout ", _flat(result.output))

    def test_a_server_that_was_not_running_reports_no_window(self):
        result, _ = _upgrade(
            is_service_running=dict(return_value=False),
            service_state=dict(return_value="inactive"),
        )

        assert result.exit_code == 0, result.output
        assert "Server was down for" not in result.output


class TestCliReinstallAfterTheStart:
    def test_migrations_run_without_the_cli_and_it_is_reinstalled_after_the_health_check(self, monkeypatch):
        _with_real_after_upgrade(monkeypatch)
        calls = []
        result, m = _upgrade(
            run_migrations=dict(side_effect=lambda **k: calls.append(("migrate", k.get("reinstall"))) or (True, "ok")),
            health_check=dict(side_effect=lambda *a, **k: calls.append(("health",)) or True),
            reinstall_cli=dict(side_effect=lambda: calls.append(("cli",)) or (True, "CLI reinstalled (verified)")),
            _print_path_cli_warning=dict(return_value=None),
        )

        assert result.exit_code == 0, result.output
        assert calls == [("migrate", False), ("health",), ("cli",)]
        out = _flat(result.output)
        assert out.index("Server was down for") < out.index("Reinstalling the CLI")
        assert "CLI reinstalled (verified)" in out

    def test_a_failed_reinstall_leaves_the_upgraded_server_running_and_exits_nonzero(self, monkeypatch):
        _with_real_after_upgrade(monkeypatch)
        result, m = _upgrade(
            reinstall_cli=dict(return_value=(False, "CLI reinstall timed out")),
        )

        assert result.exit_code == 1
        out = _flat(result.output)
        assert "CLI reinstall timed out" in out
        assert "The server is upgraded and running, but the CLI was not updated" in out
        assert "uv tool install --force --reinstall" in out
        assert "Upgraded to" in out
        assert "Rolling back" not in out
        m["resync_checkout"].assert_not_called()
        m["start_service"].assert_called_once()

    def test_ctrl_c_during_the_reinstall_exits_130_without_a_rollback(self, monkeypatch):
        _with_real_after_upgrade(monkeypatch)
        result, m = _upgrade(reinstall_cli=dict(side_effect=KeyboardInterrupt))

        assert result.exit_code == 130
        out = _flat(result.output)
        assert "Interrupted (Ctrl-C)" in out
        assert "Rolling back" not in out
        assert [c.args for c in m["checkout_version"].call_args_list] == [(_COMMITS[1],)]

    def test_the_path_warning_still_closes_the_output(self, monkeypatch):
        _with_real_after_upgrade(monkeypatch)
        result, _ = _upgrade(
            reinstall_cli=dict(return_value=(True, "CLI reinstalled (verified)")),
            path_cli_warning=dict(return_value="another chaotic is first on PATH"),
        )

        assert result.exit_code == 0, result.output
        assert result.output.rstrip().splitlines()[-1].startswith("Warning: another chaotic")


class TestRunMigrationsWithoutTheCli:
    def test_reinstall_false_never_touches_the_cli(self):
        with patch("cli.system.run_command", return_value=MagicMock(returncode=0, stdout="")), \
             patch("cli.system.reinstall_cli") as reinstall:
            progress: dict = {}
            ok, _ = system.run_migrations(progress=progress, reinstall=False)

        assert ok
        reinstall.assert_not_called()
        assert system._cli_state(progress) == "unchanged"
        assert progress["migrate_started"] is True


class TestShorterWaits:
    def test_the_drain_is_short(self):
        assert system.UVICORN_GRACEFUL_SHUTDOWN_SEC <= 3

    def test_health_polls_more_than_once_a_second(self):
        sleeps = []
        with patch("urllib.request.urlopen", side_effect=[ConnectionRefusedError()] * 2 + [MagicMock(
                __enter__=lambda s: MagicMock(status=200), __exit__=lambda *a: False)]), \
             patch("cli.system.time.sleep", side_effect=sleeps.append):
            assert system.health_check(24267, host="127.0.0.1")

        assert sleeps == [system.HEALTH_POLL_INTERVAL_SEC] * 2
        assert system.HEALTH_POLL_INTERVAL_SEC < 1
