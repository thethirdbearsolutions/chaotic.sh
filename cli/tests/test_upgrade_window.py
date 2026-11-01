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
            reinstall_cli=dict(side_effect=lambda **k: calls.append(("cli", k)) or (True, "CLI reinstalled (verified)")),
            _print_path_cli_warning=dict(return_value=None),
        )

        assert result.exit_code == 0, result.output
        assert calls == [("migrate", False), ("health",), ("cli", {"low_priority": True})]
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
        assert "The server is upgraded and running, but the CLI may be half-installed" in out
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


_REAL_IS_STALE = system._installed_cli_is_stale


class TestReviewFindings:
    """PR #520 review."""

    def test_a_retry_after_a_failed_cli_reinstall_finishes_the_cli(self, monkeypatch):
        _with_real_after_upgrade(monkeypatch)
        monkeypatch.setattr(system, "_installed_cli_is_stale", lambda: True)
        result, m = _upgrade(
            resolve_commit=dict(return_value=_COMMITS[0]),
            reinstall_cli=dict(return_value=(True, "CLI reinstalled (verified against the checkout)")),
            _print_path_cli_warning=dict(return_value=None),
        )

        assert result.exit_code == 0, result.output
        out = _flat(result.output)
        assert "the installed CLI is not. Reinstalling it" in out
        assert "Already on the latest version" in out
        m["reinstall_cli"].assert_called_once()
        m["stop_service"].assert_not_called()

    def test_a_retry_whose_reinstall_fails_again_exits_nonzero(self, monkeypatch):
        _with_real_after_upgrade(monkeypatch)
        monkeypatch.setattr(system, "_installed_cli_is_stale", lambda: True)
        result, m = _upgrade(
            resolve_commit=dict(return_value=_COMMITS[0]),
            reinstall_cli=dict(return_value=(False, "CLI reinstall timed out")),
        )

        assert result.exit_code == 1
        assert "Already on the latest version" not in result.output
        m["stop_service"].assert_not_called()

    def test_an_up_to_date_cli_on_current_code_is_left_alone(self, monkeypatch):
        _with_real_after_upgrade(monkeypatch)
        result, m = _upgrade(resolve_commit=dict(return_value=_COMMITS[0]), reinstall_cli=dict())

        assert result.exit_code == 0, result.output
        m["reinstall_cli"].assert_not_called()

    def test_staleness_is_only_claimed_for_the_uv_tool(self):
        with patch("cli.system._installed_cli_dirs", return_value=None), \
             patch("cli.system.verify_installed_cli") as verify:
            assert _REAL_IS_STALE() is False
        verify.assert_not_called()
        with patch("cli.system._installed_cli_dirs", return_value={"cli": "x"}), \
             patch("cli.system.verify_installed_cli", return_value=(False, "differs")):
            assert _REAL_IS_STALE() is True

    def test_ctrl_c_after_a_verified_install_counts_as_installed(self, monkeypatch):
        _with_real_after_upgrade(monkeypatch)
        result, m = _upgrade(
            reinstall_cli=dict(return_value=(True, "CLI reinstalled (verified against the checkout)")),
            _print_path_cli_warning=dict(side_effect=KeyboardInterrupt),
        )

        assert result.exit_code == 130
        out = _flat(result.output)
        assert "CLI was not updated" not in out
        assert "Upgraded to" in out

    def test_a_reinstall_that_started_and_failed_says_the_cli_may_be_half_installed(self, monkeypatch):
        _with_real_after_upgrade(monkeypatch)
        result, _ = _upgrade(reinstall_cli=dict(side_effect=KeyboardInterrupt))

        assert result.exit_code == 130
        out = _flat(result.output)
        assert "may be half-installed" in out
        assert "is still the previous version" not in out

    def test_health_check_survives_a_dropped_connection(self):
        import http.client
        ok = MagicMock(__enter__=lambda s: MagicMock(status=200), __exit__=lambda *a: False)
        with patch("urllib.request.urlopen", side_effect=[
                http.client.RemoteDisconnected("closed"), ConnectionResetError(), ok]), \
             patch("cli.system.time.sleep"):
            assert system.health_check(24267, host="127.0.0.1")

    def test_a_start_or_health_failure_leaves_the_cli_alone(self, monkeypatch):
        _with_real_after_upgrade(monkeypatch)
        result, m = _upgrade(health_check=dict(return_value=False), reinstall_cli=dict())

        assert result.exit_code == 1
        m["reinstall_cli"].assert_not_called()
        m["resync_checkout"].assert_called_once_with(reinstall=False, abandoned_commit=_COMMITS[1])

    def test_fake_initial_on_current_code_reinstalls_after_the_health_check(self, monkeypatch):
        _with_real_after_upgrade(monkeypatch)
        calls = []
        result, m = _upgrade(
            args=("--no-backup", "--fake-initial"),
            resolve_commit=dict(return_value=_COMMITS[0]),
            run_migrations=dict(side_effect=lambda **k: calls.append(("migrate", k)) or (True, "ok")),
            health_check=dict(side_effect=lambda *a, **k: calls.append(("health",)) or True),
            reinstall_cli=dict(side_effect=lambda **k: calls.append(("cli", k)) or (True, "ok")),
            _print_path_cli_warning=dict(return_value=None),
        )

        assert result.exit_code == 0, result.output
        assert [c[0] for c in calls] == ["migrate", "health", "cli"]
        assert calls[2][1] == {"low_priority": True}
        assert calls[0][1]["fake_initial"] is True and calls[0][1]["reinstall"] is False
        assert re.search(r"\(stop \d+\.\ds, sync\+migrate ", _flat(result.output))

    def test_the_confirmation_prompt_is_its_own_step(self):
        """Without --yes the prompt waits with the server stopped."""
        with patch("cli.system._confirm_action", return_value=True):
            result, _ = _upgrade(yes=False)

        assert result.exit_code == 0, result.output
        assert re.search(r"\(stop \d+\.\ds, prompt \d+\.\ds, checkout ", _flat(result.output))


class TestQueueAfterTheStart:
    """Coordinator data: some requests waited past the window. A
    connection dropped at a full listen queue is retried with backoff."""

    def test_drops_during_the_window_are_reported(self):
        counts = iter([7, 19])
        result, _ = _upgrade(
            _listen_drops=dict(side_effect=lambda: next(counts)),
            socket_mode_installed=dict(return_value=True),
            _justfile_serves_socket=dict(return_value=True),
            hold_deploy_gate=dict(return_value=True),
        )

        assert result.exit_code == 0, result.output
        assert "12 connection(s) were dropped at a full listen queue" in _flat(result.output)

    def test_no_drops_says_nothing(self):
        result, _ = _upgrade(_listen_drops=dict(return_value=3))

        assert result.exit_code == 0, result.output
        assert "dropped at a full listen queue" not in result.output

    def test_an_unreadable_counter_says_nothing(self):
        result, _ = _upgrade(_listen_drops=dict(return_value=None))

        assert result.exit_code == 0, result.output
        assert "dropped" not in result.output

    def test_the_counter_is_read_from_proc(self, tmp_path):
        netstat = ("TcpExt: SyncookiesSent ListenOverflows ListenDrops\n"
                   "TcpExt: 0 4 5\n"
                   "IpExt: InNoRoutes\nIpExt: 0\n")
        with patch("cli.system.Path.read_text", return_value=netstat):
            assert system._listen_drops() == 5
        with patch("cli.system.Path.read_text", side_effect=OSError):
            assert system._listen_drops() is None

    def test_the_post_start_reinstall_runs_under_nice(self):
        with patch("cli.system.shutil.which", return_value="/usr/bin/nice"), \
             patch("cli.system.run_command") as run, \
             patch("cli.system.verify_installed_cli", return_value=(True, "ok")):
            system.reinstall_cli(low_priority=True)
            system.reinstall_cli()

        first, second = (c.args[0] for c in run.call_args_list)
        assert first[:3] == ["/usr/bin/nice", "-n", "10"] and first[3] == "uv"
        assert second[0] == "uv"

    def test_without_the_socket_drops_are_not_counted(self):
        result, m = _upgrade(_listen_drops=dict(side_effect=[1, 50]))

        assert result.exit_code == 0, result.output
        assert "dropped" not in result.output
        m["_listen_drops"].assert_not_called()

    def test_ctrl_c_after_a_verified_retry_reinstall_exits_130(self, monkeypatch):
        _with_real_after_upgrade(monkeypatch)
        monkeypatch.setattr(system, "_installed_cli_is_stale", lambda: True)
        result, _ = _upgrade(
            resolve_commit=dict(return_value=_COMMITS[0]),
            reinstall_cli=dict(return_value=(True, "CLI reinstalled (verified against the checkout)")),
            _print_path_cli_warning=dict(side_effect=KeyboardInterrupt),
        )

        assert result.exit_code == 130
        assert "Already on the latest version" in result.output
