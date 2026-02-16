"""Tests for upgrade changelog display (CHT-929).

Verifies that `chaotic system upgrade` shows a git log of commits
between the current version and target version.
"""
import subprocess
from unittest.mock import patch, MagicMock

import pytest
from click.testing import CliRunner


@pytest.fixture
def cli_runner():
    return CliRunner()


@pytest.fixture
def base_patches():
    """Common patches for system upgrade tests."""
    with patch("cli.system.is_server_installed", return_value=True), \
         patch("cli.system.get_current_version", return_value="v1.0.0"), \
         patch("cli.system.get_current_commit", return_value="abc1234"), \
         patch("cli.system.fetch_updates", return_value=True), \
         patch("cli.system.get_latest_version", return_value="v1.1.0"), \
         patch("cli.system.validate_git_ref", return_value=True):
        yield


class TestUpgradeChangelog:
    """Tests for changelog display during upgrade."""

    def test_shows_changelog_between_versions(self, cli_runner, base_patches):
        """Changelog should list commits between current and target."""
        git_log_output = "def5678 Add new feature\nghi9012 Fix bug\n"

        def fake_run_command(cmd, **kwargs):
            result = MagicMock()
            if cmd[1] == "log":
                result.returncode = 0
                result.stdout = git_log_output
            else:
                result.returncode = 0
                result.stdout = ""
            return result

        with patch("cli.system.run_command", side_effect=fake_run_command), \
             patch("cli.system._confirm_action", return_value=False):
            from cli.system import system
            result = cli_runner.invoke(system, ["upgrade"])

        assert "Changelog" in result.output
        assert "2 commits" in result.output
        assert "Add new feature" in result.output
        assert "Fix bug" in result.output

    def test_shows_singular_commit(self, cli_runner, base_patches):
        """Single commit should say 'commit' not 'commits'."""
        git_log_output = "def5678 Solo change\n"

        def fake_run_command(cmd, **kwargs):
            result = MagicMock()
            if cmd[1] == "log":
                result.returncode = 0
                result.stdout = git_log_output
            else:
                result.returncode = 0
                result.stdout = ""
            return result

        with patch("cli.system.run_command", side_effect=fake_run_command), \
             patch("cli.system._confirm_action", return_value=False):
            from cli.system import system
            result = cli_runner.invoke(system, ["upgrade"])

        assert "1 commit)" in result.output

    def test_no_changelog_when_no_commits(self, cli_runner, base_patches):
        """No changelog section when git log returns empty."""
        def fake_run_command(cmd, **kwargs):
            result = MagicMock()
            result.returncode = 0
            result.stdout = ""
            return result

        with patch("cli.system.run_command", side_effect=fake_run_command), \
             patch("cli.system._confirm_action", return_value=False):
            from cli.system import system
            result = cli_runner.invoke(system, ["upgrade"])

        assert "Changelog" not in result.output

    def test_no_changelog_when_git_log_fails(self, cli_runner, base_patches):
        """Changelog gracefully skipped when git log fails."""
        def fake_run_command(cmd, **kwargs):
            result = MagicMock()
            if cmd[1] == "log":
                result.returncode = 128
                result.stdout = ""
            else:
                result.returncode = 0
                result.stdout = ""
            return result

        with patch("cli.system.run_command", side_effect=fake_run_command), \
             patch("cli.system._confirm_action", return_value=False):
            from cli.system import system
            result = cli_runner.invoke(system, ["upgrade"])

        assert "Changelog" not in result.output

    def test_no_changelog_when_no_current_commit(self, cli_runner):
        """Changelog skipped when current commit is unknown."""
        with patch("cli.system.is_server_installed", return_value=True), \
             patch("cli.system.get_current_version", return_value="v1.0.0"), \
             patch("cli.system.get_current_commit", return_value=None), \
             patch("cli.system.fetch_updates", return_value=True), \
             patch("cli.system.get_latest_version", return_value="v1.1.0"), \
             patch("cli.system.run_command") as mock_run, \
             patch("cli.system._confirm_action", return_value=False):
            from cli.system import system
            result = cli_runner.invoke(system, ["upgrade"])

        assert "Changelog" not in result.output

    def test_already_on_target_skips_changelog(self, cli_runner):
        """When already on target version, no changelog shown."""
        with patch("cli.system.is_server_installed", return_value=True), \
             patch("cli.system.get_current_version", return_value="v1.0.0"), \
             patch("cli.system.get_current_commit", return_value="abc1234"), \
             patch("cli.system.fetch_updates", return_value=True), \
             patch("cli.system.get_latest_version", return_value="v1.0.0"):
            from cli.system import system
            result = cli_runner.invoke(system, ["upgrade"])

        assert "Already on the latest version" in result.output
