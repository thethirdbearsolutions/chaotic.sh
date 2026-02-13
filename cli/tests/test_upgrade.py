"""Tests for chaotic upgrade command (CHT-811)."""
import subprocess
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
        assert cmd == ["uv", "tool", "install", "--force", "chaotic-cli>=0.0.0a0"]

    def test_uv_specific_version(self):
        cmd = _build_upgrade_cmd("uv", "chaotic-cli", "0.1.0a9")
        assert cmd == ["uv", "tool", "install", "--force", "chaotic-cli==0.1.0a9"]

    def test_pipx_latest(self):
        cmd = _build_upgrade_cmd("pipx", "chaotic-cli", None)
        assert cmd == ["pipx", "upgrade", "chaotic-cli", "--pip-args=--pre"]

    def test_pipx_specific_version(self):
        cmd = _build_upgrade_cmd("pipx", "chaotic-cli", "0.1.0a9")
        assert cmd == ["pipx", "install", "--force", "chaotic-cli==0.1.0a9"]

    def test_pip_latest(self):
        with patch("cli.main.shutil.which", return_value="/usr/bin/pip3"):
            cmd = _build_upgrade_cmd("pip", "chaotic-cli", None)
        assert cmd == ["pip3", "install", "--upgrade", "--pre", "chaotic-cli"]

    def test_pip_specific_version(self):
        with patch("cli.main.shutil.which", return_value="/usr/bin/pip3"):
            cmd = _build_upgrade_cmd("pip", "chaotic-cli", "0.1.0a9")
        assert cmd == ["pip3", "install", "--upgrade", "--pre", "chaotic-cli==0.1.0a9"]

    def test_uv_git(self):
        git_url = "git+https://github.com/thethirdbearsolutions/chaotic.sh.git#subdirectory=cli"
        cmd = _build_upgrade_cmd("uv", "chaotic-cli", None, git_url=git_url)
        assert cmd == ["uv", "tool", "install", "--force", git_url]

    def test_pipx_git(self):
        git_url = "git+https://github.com/thethirdbearsolutions/chaotic.sh.git#subdirectory=cli"
        cmd = _build_upgrade_cmd("pipx", "chaotic-cli", None, git_url=git_url)
        assert cmd == ["pipx", "install", "--force", git_url]

    def test_pip_git(self):
        git_url = "git+https://github.com/thethirdbearsolutions/chaotic.sh.git#subdirectory=cli"
        with patch("cli.main.shutil.which", return_value="/usr/bin/pip3"):
            cmd = _build_upgrade_cmd("pip", "chaotic-cli", None, git_url=git_url)
        assert cmd == ["pip3", "install", "--upgrade", "--pre", git_url]


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
        """Upgrade should work even when profile ambiguity would block other commands."""
        from cli.config import ProfileAmbiguityError
        runner = CliRunner()
        with patch("cli.main.check_profile_ambiguity", side_effect=ProfileAmbiguityError("ambiguous")), \
             patch("cli.main._detect_installer", return_value="uv"):
            result = runner.invoke(cli, ["upgrade", "--dry-run"])
        assert result.exit_code == 0
        assert "uv tool install" in result.output

    def test_successful_upgrade_shows_version_change(self):
        """Non-dry-run upgrade shows version change."""
        runner = CliRunner()
        with patch("cli.main._detect_installer", return_value="uv"), \
             patch("cli.main.check_profile_ambiguity"), \
             patch("cli.main.subprocess.run") as mock_run, \
             patch("cli.main._get_installed_version", return_value="0.2.0"):
            mock_run.return_value = MagicMock(returncode=0, stdout="Installed chaotic-cli\n", stderr="")
            result = runner.invoke(cli, ["upgrade"])
        assert result.exit_code == 0
        assert "Upgraded" in result.output

    def test_upgrade_failure_shows_error(self):
        """Failed upgrade shows error message and stderr."""
        runner = CliRunner()
        with patch("cli.main._detect_installer", return_value="uv"), \
             patch("cli.main.check_profile_ambiguity"), \
             patch("cli.main.subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=1, stdout="", stderr="resolution failed\n")
            result = runner.invoke(cli, ["upgrade"])
        assert result.exit_code == 1
        assert "failed" in result.output.lower()
        assert "resolution failed" in result.output

    def test_upgrade_timeout_shows_error(self):
        """Subprocess timeout shows appropriate error."""
        runner = CliRunner()
        with patch("cli.main._detect_installer", return_value="uv"), \
             patch("cli.main.check_profile_ambiguity"), \
             patch("cli.main.subprocess.run", side_effect=subprocess.TimeoutExpired(cmd="uv", timeout=120)):
            result = runner.invoke(cli, ["upgrade"])
        assert result.exit_code == 1
        assert "timed out" in result.output.lower()

    def test_invalid_version_string_rejected(self):
        """Version strings with special characters are rejected."""
        runner = CliRunner()
        with patch("cli.main.check_profile_ambiguity"):
            result = runner.invoke(cli, ["upgrade", "--version", "1.0; rm -rf /"])
        assert result.exit_code == 1
        assert "Invalid version" in result.output

    def test_valid_version_string_accepted(self):
        """Normal version strings are accepted."""
        runner = CliRunner()
        with patch("cli.main._detect_installer", return_value="uv"), \
             patch("cli.main.check_profile_ambiguity"):
            result = runner.invoke(cli, ["upgrade", "--version", "0.1.0a9", "--dry-run"])
        assert result.exit_code == 0
        assert "0.1.0a9" in result.output

    def test_git_flag_dry_run(self):
        """--git flag shows git URL in dry run output."""
        runner = CliRunner()
        with patch("cli.main._detect_installer", return_value="uv"), \
             patch("cli.main.check_profile_ambiguity"):
            result = runner.invoke(cli, ["upgrade", "--git", "--dry-run"])
        assert result.exit_code == 0
        assert "git+https://" in result.output
        assert "git main" in result.output

    def test_git_and_version_mutually_exclusive(self):
        """--git and --version cannot be used together."""
        runner = CliRunner()
        with patch("cli.main.check_profile_ambiguity"):
            result = runner.invoke(cli, ["upgrade", "--git", "--version", "0.1.0a9"])
        assert result.exit_code == 1
        assert "Cannot use --git and --version together" in result.output
