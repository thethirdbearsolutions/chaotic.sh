"""Tests for upgrade changelog display (CHT-929).

Verifies that `chaotic system upgrade` shows a git log of commits
between the current version and target version.
"""
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
         patch("cli.system.resolve_commit", return_value="def5678"), \
         patch("cli.system.is_ancestor", side_effect=lambda older, newer: (older, newer) == ("abc1234", "def5678")), \
         patch("cli.system.verify_deployed_commit", return_value=(True, "def5678")), \
         patch("cli.system.wait_for_service_stop", return_value=True), \
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

    def test_empty_changelog_between_different_commits_is_said_out_loud(self, cli_runner, base_patches):
        """An empty range between two different shas used to print nothing,
        which read as "nothing to see" (CHT-1357). Say it explicitly."""
        def fake_run_command(cmd, **kwargs):
            result = MagicMock()
            result.returncode = 0
            result.stdout = ""
            return result

        with patch("cli.system.run_command", side_effect=fake_run_command), \
             patch("cli.system._confirm_action", return_value=False):
            from cli.system import system
            result = cli_runner.invoke(system, ["upgrade"])

        assert "Changelog: no commits in abc1234..def5678" in result.output

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
             patch("cli.system.resolve_commit", return_value="def5678"), \
             patch("cli.system.run_command") as mock_run, \
             patch("cli.system._confirm_action", return_value=False):
            from cli.system import system
            result = cli_runner.invoke(system, ["upgrade"])

        assert "Changelog" not in result.output
        # No current commit: the downgrade check cannot run, and says so
        # rather than silently proceeding (CHT-1357).
        assert "downgrade check is skipped" in " ".join(result.output.split())
        assert result.exit_code == 0, result.output

    def test_already_on_target_skips_changelog(self, cli_runner):
        """When already on target version, no changelog shown."""
        with patch("cli.system.is_server_installed", return_value=True), \
             patch("cli.system.get_current_version", return_value="v1.0.0"), \
             patch("cli.system.get_current_commit", return_value="abc1234"), \
             patch("cli.system.fetch_updates", return_value=True), \
             patch("cli.system.resolve_commit", return_value="abc1234"), \
             patch("cli.system.get_latest_version", return_value="v1.0.0"):
            from cli.system import system
            result = cli_runner.invoke(system, ["upgrade"])

        assert "Already on the latest version" in result.output


class TestUpgradeMcpReconnectNote:
    """A successful upgrade tells operators whether MCP clients must
    reconnect (CHT-1364): definitively when /api/version was readable
    before and after, as a general reminder otherwise."""

    def _run(self, cli_runner, *, running, versions=()):
        with patch("cli.system.is_service_running", return_value=running), \
             patch("cli.system.stop_service", return_value=True), \
             patch("cli.system.wait_for_service_stop", return_value=True), \
             patch("cli.system.start_service", return_value=True), \
             patch("cli.system.health_check", return_value=True), \
             patch("cli.system.load_server_json", return_value={}), \
             patch("cli.system.get_remote_version", side_effect=list(versions)) as remote, \
             patch("cli.system.run_command", return_value=MagicMock(returncode=0, stdout="")), \
             patch("cli.system.checkout_version", return_value=(True, None)), \
             patch("cli.system.run_migrations", return_value=(True, "ok")), \
             patch("cli.system.rebuild_frontend", return_value=(True, "built")):
            from cli.system import system
            result = cli_runner.invoke(system, ["upgrade", "--yes", "--no-backup"])
        assert result.exit_code == 0, result.output
        assert "Upgraded to" in result.output
        return result.output, remote

    def test_server_not_running_prints_the_general_reminder(self, cli_runner, base_patches):
        output, remote = self._run(cli_runner, running=False)
        assert "MCP clients cache the toolset" in output
        assert "mcp_toolset_fingerprint" in output
        assert remote.call_count == 0

    def test_changed_toolset_is_reported_with_counts(self, cli_runner, base_patches):
        before = {"mcp_toolset_fingerprint": "a" * 64, "mcp_tool_count": 30}
        after = {"mcp_toolset_fingerprint": "b" * 64, "mcp_tool_count": 31}
        output, remote = self._run(cli_runner, running=True, versions=[before, after])
        assert "MCP toolset changed (30 -> 31 tools)" in output
        assert "re-add connectors" in output
        assert remote.call_count == 2

    def test_unchanged_toolset_needs_no_action(self, cli_runner, base_patches):
        same = {"mcp_toolset_fingerprint": "a" * 64, "mcp_tool_count": 30}
        output, _ = self._run(cli_runner, running=True, versions=[same, dict(same)])
        assert "MCP toolset unchanged" in output
        assert "re-add connectors" not in output

    def test_older_server_without_the_field_falls_back_to_the_reminder(self, cli_runner, base_patches):
        output, _ = self._run(cli_runner, running=True, versions=[{"git_sha": "abc"}, {"git_sha": "def"}])
        assert "MCP clients cache the toolset" in output
