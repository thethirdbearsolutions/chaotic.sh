"""Tests for chaotic upgrade command (CHT-811)."""
import pytest
from unittest.mock import patch, MagicMock
from click.testing import CliRunner
from cli.main import cli, _detect_installer, _build_upgrade_cmd


class TestDetectInstaller:
    """Tests for _detect_installer()."""

    def test_detects_uv(self):
        with patch("cli.main.shutil.which", return_value="/usr/bin/uv"), \
             patch("cli.main.subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(stdout="chaotic-cli v0.1.0a9\n", returncode=0)
            assert _detect_installer() == "uv"

    def test_detects_pipx(self):
        def which_side_effect(cmd):
            return "/usr/bin/pipx" if cmd == "pipx" else None
        with patch("cli.main.shutil.which", side_effect=which_side_effect), \
             patch("cli.main.subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(stdout="chaotic-cli 0.1.0a9\n", returncode=0)
            assert _detect_installer() == "pipx"

    def test_detects_pip(self):
        def which_side_effect(cmd):
            return "/usr/bin/pip" if cmd == "pip" else None
        with patch("cli.main.shutil.which", side_effect=which_side_effect), \
             patch("cli.main.subprocess.run", side_effect=Exception("no uv")):
            assert _detect_installer() == "pip"

    def test_returns_none_when_nothing_found(self):
        with patch("cli.main.shutil.which", return_value=None), \
             patch("cli.main.subprocess.run", side_effect=Exception("not found")):
            assert _detect_installer() is None


class TestBuildUpgradeCmd:
    """Tests for _build_upgrade_cmd()."""

    def test_uv_latest(self):
        cmd = _build_upgrade_cmd("uv", "chaotic-cli", None)
        assert cmd == ["uv", "tool", "install", "--force", "chaotic-cli", "--prerelease", "allow"]

    def test_uv_specific_version(self):
        cmd = _build_upgrade_cmd("uv", "chaotic-cli", "0.1.0a9")
        assert cmd == ["uv", "tool", "install", "--force", "chaotic-cli==0.1.0a9", "--prerelease", "allow"]

    def test_pipx_latest(self):
        cmd = _build_upgrade_cmd("pipx", "chaotic-cli", None)
        assert cmd == ["pipx", "upgrade", "chaotic-cli", "--pip-args=--pre"]

    def test_pipx_specific_version(self):
        cmd = _build_upgrade_cmd("pipx", "chaotic-cli", "0.1.0a9")
        assert cmd == ["pipx", "install", "--force", "chaotic-cli==0.1.0a9", "--pip-args=--pre"]

    def test_pip_latest(self):
        with patch("cli.main.shutil.which", return_value="/usr/bin/pip3"):
            cmd = _build_upgrade_cmd("pip", "chaotic-cli", None)
        assert cmd == ["pip3", "install", "--upgrade", "--pre", "chaotic-cli"]


class TestUpgradeCommand:
    """Integration tests for the upgrade CLI command."""

    def test_dry_run_shows_command(self):
        runner = CliRunner()
        with patch("cli.main._detect_installer", return_value="uv"), \
             patch("cli.main.check_profile_ambiguity"):
            result = runner.invoke(cli, ["upgrade", "--dry-run"])
        assert result.exit_code == 0
        assert "Dry run" in result.output
        assert "uv tool install" in result.output

    def test_no_installer_shows_error(self):
        runner = CliRunner()
        with patch("cli.main._detect_installer", return_value=None), \
             patch("cli.main.check_profile_ambiguity"):
            result = runner.invoke(cli, ["upgrade"])
        assert result.exit_code == 1
        assert "Could not detect" in result.output

    def test_upgrade_bypasses_profile_check(self):
        """Upgrade should work even without a profile configured."""
        runner = CliRunner()
        with patch("cli.main._detect_installer", return_value="pip"), \
             patch("cli.main.subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=0, stdout="ok\n", stderr="")
            result = runner.invoke(cli, ["upgrade", "--dry-run"])
        assert result.exit_code == 0
