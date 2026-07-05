"""Tests for `chaotic system install`'s final success/failure banner (CHT-1221).

The final "Chaotic is running" banner used to print unconditionally after
the `if not no_start:` block in system.py's `system_install()`, regardless
of whether the server actually started. These lock in the fix: the banner
now only fires when start_service() succeeded AND health_check() passed;
every other path (--no-start, port already in use, health-check timeout)
gets a truthful "Installed." summary instead.
"""
from pathlib import Path
from unittest.mock import patch, MagicMock

from click.testing import CliRunner

from cli.main import cli


def _install_patches(**overrides):
    """Every system_install() side effect except the ones each test varies
    (is_port_in_use / start_service / health_check / --no-start)."""
    patches = dict(
        get_os=MagicMock(return_value="darwin"),
        validate_repo_url=MagicMock(return_value=True),
        validate_host=MagicMock(return_value=True),
        validate_port=MagicMock(return_value=True),
        validate_git_ref=MagicMock(return_value=True),
        is_server_installed=MagicMock(return_value=False),
        check_all_prerequisites=MagicMock(return_value={"git": True, "uv": True, "just": True}),
        print_prerequisites_status=MagicMock(return_value=True),
        run_command=MagicMock(return_value=MagicMock(returncode=1, stdout="")),
        run_migrations=MagicMock(return_value=(True, "Migrations applied")),
        generate_secret_key=MagicMock(return_value="secret"),
        save_server_json=MagicMock(),
        write_service_file=MagicMock(return_value=Path("/tmp/chaotic-service")),
        set_api_url=MagicMock(),
    )
    patches.update(overrides)
    return patches


def _run_install(tmp_path, *, no_start=False, port_in_use=False, start_ok=True, health_ok=True):
    patches = _install_patches(
        GLOBAL_CONFIG_DIR=tmp_path,
        SERVER_DIR=tmp_path / "server",
        DATA_DIR=tmp_path / "data",
        LOGS_DIR=tmp_path / "logs",
        is_port_in_use=MagicMock(return_value=port_in_use),
        start_service=MagicMock(return_value=start_ok),
        health_check=MagicMock(return_value=health_ok),
    )
    with patch.multiple("cli.system", **patches):
        runner = CliRunner()
        args = ["system", "install", "--yes"]
        if no_start:
            args.append("--no-start")
        return runner.invoke(cli, args)


class TestSystemInstallBanner:
    """The success banner must reflect what actually happened."""

    def test_true_success_shows_running_banner(self, tmp_path):
        """start_service() OK + health_check() OK -> real success banner."""
        result = _run_install(tmp_path, start_ok=True, health_ok=True)
        assert result.exit_code == 0, result.output
        assert "Chaotic is running at" in result.output
        assert "Installed. Run 'chaotic system start'" not in result.output

    def test_no_start_does_not_claim_running(self, tmp_path):
        """--no-start deliberately skips starting the server."""
        result = _run_install(tmp_path, no_start=True)
        assert result.exit_code == 0, result.output
        assert "Chaotic is running at" not in result.output
        assert "Installed. Run 'chaotic system start' when ready." in result.output

    def test_port_in_use_does_not_claim_running(self, tmp_path):
        """Port already in use -> server was never started."""
        result = _run_install(tmp_path, port_in_use=True)
        assert result.exit_code == 0, result.output
        assert "Chaotic is running at" not in result.output
        assert "Installed. Run 'chaotic system start' when ready." in result.output

    def test_health_check_timeout_does_not_claim_running(self, tmp_path):
        """start_service() succeeded but health_check() timed out -- the
        server may not actually be serving requests yet."""
        result = _run_install(tmp_path, start_ok=True, health_ok=False)
        assert result.exit_code == 0, result.output
        assert "Chaotic is running at" not in result.output
        assert "Installed. Run 'chaotic system start' when ready." in result.output

    def test_start_service_failure_exits_before_banner(self, tmp_path):
        """start_service() returning False is already a hard failure
        (SystemExit(1)) -- confirm neither banner prints."""
        result = _run_install(tmp_path, start_ok=False)
        assert result.exit_code == 1
        assert "Chaotic is running at" not in result.output
        assert "Installed. Run 'chaotic system start' when ready." not in result.output
