"""`chaotic system upgrade` must never move a server backwards by accident
(CHT-1357) and must verify that the process answering the port after the
restart is running the commit it checked out (CHT-1363)."""
from contextlib import ExitStack
from unittest.mock import MagicMock, patch

import pytest
from click.testing import CliRunner

from cli import system
from cli.system import upgrade_direction, verify_deployed_commit


@pytest.fixture
def cli_runner():
    return CliRunner()


def _flat(output: str) -> str:
    """Rich wraps console output at the CliRunner's 80 columns; compare
    against whitespace-collapsed text so a wrapped phrase still matches."""
    return " ".join(output.split())


def _ancestry(pairs):
    """is_ancestor stand-in: True only for the (older, newer) pairs given."""
    return lambda older, newer: (older, newer) in pairs


class TestUpgradeDirection:
    def test_classifies_every_relationship(self):
        with patch("cli.system.is_ancestor", side_effect=_ancestry({("cur", "new")})):
            assert upgrade_direction("cur", "new") == "forward"
        with patch("cli.system.is_ancestor", side_effect=_ancestry({("old", "cur")})):
            assert upgrade_direction("cur", "old") == "backward"
        with patch("cli.system.is_ancestor", side_effect=_ancestry(set())):
            assert upgrade_direction("cur", "elsewhere") == "diverged"
        assert upgrade_direction("cur", "cur") == "same"
        assert upgrade_direction(None, "new") == "unknown"

    def test_git_unable_to_answer_is_unknown_not_diverged(self):
        """A merge-base error (exit 128: unknown ref, corrupt checkout) must
        not be reported as 'the histories have diverged'."""
        with patch("cli.system.is_ancestor", return_value=None):
            assert upgrade_direction("cur", "new") == "unknown"


@pytest.fixture
def upgrade_patches():
    """Everything the upgrade command touches except the git-direction and
    identity helpers under test. Server not running: the simplest path."""
    with patch("cli.system.is_server_installed", return_value=True), \
         patch("cli.system.get_current_version", return_value="v0.1.0a18"), \
         patch("cli.system.fetch_updates", return_value=True), \
         patch("cli.system.get_latest_version", return_value="v0.1.0a17"), \
         patch("cli.system.validate_git_ref", return_value=True), \
         patch("cli.system.describe_commit", side_effect=lambda sha: f"{sha[:7]} (2026-07-24)"), \
         patch("cli.system.run_command", return_value=MagicMock(returncode=0, stdout="")), \
         patch("cli.system.is_service_running", return_value=False), \
         patch("cli.system.load_server_json", return_value={}), \
         patch("cli.system.checkout_version", return_value=(True, None)) as checkout, \
         patch("cli.system.run_migrations", return_value=(True, "ok")), \
         patch("cli.system.rebuild_frontend", return_value=(True, "built")):
        yield checkout


class TestNoSilentDowngrade:
    def test_default_target_older_than_deployed_is_refused(self, cli_runner, upgrade_patches):
        """The live trap: newest tag (v0.1.0a17) is an ancestor of what
        production runs. A bare `upgrade` used to check it out and report
        success with an empty changelog."""
        with patch("cli.system.get_current_commit", return_value="19ae385deployed"), \
             patch("cli.system.resolve_commit", return_value="6a0ec2ctagged"), \
             patch("cli.system.is_ancestor", side_effect=_ancestry({("6a0ec2ctagged", "19ae385deployed")})):
            result = cli_runner.invoke(system.system, ["upgrade", "--yes", "--no-backup"])

        assert result.exit_code == 1
        assert "OLDER than the deployed commit" in _flat(result.output)
        assert "6a0ec2c (2026-07-24)" in _flat(result.output) and "19ae385 (2026-07-24)" in _flat(result.output)
        assert "would be REMOVED" in _flat(result.output)
        assert "--version origin/main" in _flat(result.output)  # the default target was the stale tag
        assert "--allow-downgrade" in _flat(result.output)
        upgrade_patches.assert_not_called()

    def test_explicit_older_target_is_refused_without_the_flag(self, cli_runner, upgrade_patches):
        with patch("cli.system.get_current_commit", return_value="19ae385deployed"), \
             patch("cli.system.resolve_commit", return_value="6a0ec2ctagged"), \
             patch("cli.system.is_ancestor", side_effect=_ancestry({("6a0ec2ctagged", "19ae385deployed")})):
            result = cli_runner.invoke(system.system, ["upgrade", "--version", "v0.1.0a17", "--yes", "--no-backup"])

        assert result.exit_code == 1
        assert "--version origin/main" not in _flat(result.output)  # they chose the target; no tag advice
        upgrade_patches.assert_not_called()

    def test_allow_downgrade_proceeds_with_a_warning(self, cli_runner, upgrade_patches):
        with patch("cli.system.get_current_commit", return_value="19ae385deployed"), \
             patch("cli.system.resolve_commit", return_value="6a0ec2ctagged"), \
             patch("cli.system.is_ancestor", side_effect=_ancestry({("6a0ec2ctagged", "19ae385deployed")})):
            result = cli_runner.invoke(
                system.system, ["upgrade", "--version", "v0.1.0a17", "--allow-downgrade", "--yes", "--no-backup"],
            )

        assert result.exit_code == 0, result.output
        assert "Proceeding anyway because --allow-downgrade" in _flat(result.output)
        assert "Upgraded to" in _flat(result.output)
        upgrade_patches.assert_called_once_with("v0.1.0a17", force=True)

    def test_diverged_target_is_refused(self, cli_runner, upgrade_patches):
        with patch("cli.system.get_current_commit", return_value="19ae385deployed"), \
             patch("cli.system.resolve_commit", return_value="feature123"), \
             patch("cli.system.is_ancestor", side_effect=_ancestry(set())):
            result = cli_runner.invoke(system.system, ["upgrade", "--version", "feature", "--yes", "--no-backup"])

        assert result.exit_code == 1
        assert "does not descend from the deployed commit" in _flat(result.output)
        upgrade_patches.assert_not_called()

    def test_forward_target_upgrades(self, cli_runner, upgrade_patches):
        with patch("cli.system.get_current_commit", return_value="19ae385deployed"), \
             patch("cli.system.resolve_commit", return_value="ab71cd5newer"), \
             patch("cli.system.is_ancestor", side_effect=_ancestry({("19ae385deployed", "ab71cd5newer")})):
            result = cli_runner.invoke(system.system, ["upgrade", "--version", "origin/main", "--yes", "--no-backup"])

        assert result.exit_code == 0, result.output
        assert "Upgraded to" in _flat(result.output)
        upgrade_patches.assert_called_once_with("origin/main", force=True)

    def test_same_commit_is_already_current_even_if_version_strings_differ(self, cli_runner, upgrade_patches):
        """`git describe --tags --always` says v0.1.0a18-3-gabc while the
        target tag says v0.1.0a18; identity is the commit, not the string."""
        with patch("cli.system.get_current_commit", return_value="samesha"), \
             patch("cli.system.resolve_commit", return_value="samesha"):
            result = cli_runner.invoke(system.system, ["upgrade", "--version", "v0.1.0a18"])

        assert result.exit_code == 0
        assert "Already on the latest version" in _flat(result.output)

    def test_unresolvable_target_is_an_error(self, cli_runner, upgrade_patches):
        with patch("cli.system.get_current_commit", return_value="19ae385deployed"), \
             patch("cli.system.resolve_commit", return_value=None):
            result = cli_runner.invoke(system.system, ["upgrade", "--version", "nope", "--yes"])

        assert result.exit_code == 1
        assert "Unknown version: nope" in _flat(result.output)


class TestVerifyDeployedCommit:
    def test_matches_the_short_sha_health_reports(self):
        with patch("cli.system.get_health", return_value={"status": "healthy", "git_sha": "ab71cd5"}):
            assert verify_deployed_commit(1, "ab71cd5f00d", timeout=0) == (True, "ab71cd5")

    def test_reports_the_sha_actually_served_on_mismatch(self):
        with patch("cli.system.get_health", return_value={"git_sha": "19ae385"}), \
             patch("cli.system.time.sleep"):
            assert verify_deployed_commit(1, "ab71cd5f00d", timeout=0) == (False, "19ae385")

    def test_no_sha_at_all_is_unverifiable_not_a_mismatch(self):
        """A server older than 4a9db89 has no git_sha on /health; a git-less
        host reports "unknown". Neither proves the wrong process answered, so
        a deliberate --allow-downgrade to such a commit must not roll back."""
        with patch("cli.system.get_health", return_value={"status": "healthy"}), \
             patch("cli.system.time.sleep"):
            assert verify_deployed_commit(1, "ab71cd5f00d", timeout=0) == (None, None)
        with patch("cli.system.get_health", return_value={"git_sha": "unknown"}), \
             patch("cli.system.time.sleep"):
            assert verify_deployed_commit(1, "ab71cd5f00d", timeout=0) == (None, None)

    def test_a_sha_too_short_to_be_one_does_not_match(self):
        with patch("cli.system.get_health", return_value={"git_sha": "a"}), \
             patch("cli.system.time.sleep"):
            assert verify_deployed_commit(1, "ab71cd5f00d", timeout=0) == (None, None)

    def test_waits_for_the_old_process_to_hand_over(self):
        answers = iter([{"git_sha": "19ae385"}, None, {"git_sha": "ab71cd5"}])
        with patch("cli.system.get_health", side_effect=lambda *a, **k: next(answers)), \
             patch("cli.system.time.sleep"), \
             patch("cli.system.time.time", side_effect=[0, 1, 2, 3, 4, 5]):
            assert verify_deployed_commit(1, "ab71cd5f00d", timeout=30) == (True, "ab71cd5")


class TestIdentityAfterRestart:
    """The was_running path: the health check passes, but who is answering?"""

    def _run(self, cli_runner, served, args=("--no-backup",), **extra):
        commits = iter(["19ae385deployed", "ab71cd5newer"])  # before / after checkout
        patches = {
            "is_server_installed": dict(return_value=True),
            "get_current_version": dict(return_value="v0.1.0a17"),
            "get_current_commit": dict(side_effect=lambda: next(commits)),
            "fetch_updates": dict(return_value=True),
            "get_latest_version": dict(return_value="v0.1.0a18"),
            "resolve_commit": dict(return_value="ab71cd5newer"),
            "is_ancestor": dict(side_effect=_ancestry({("19ae385deployed", "ab71cd5newer")})),
            "validate_git_ref": dict(return_value=True),
            "run_command": dict(return_value=MagicMock(returncode=0, stdout="")),
            "is_service_running": dict(return_value=True),
            "stop_service": dict(return_value=True),
            "wait_for_service_stop": dict(return_value=True),
            "start_service": dict(return_value=True),
            "health_check": dict(return_value=True),
            "load_server_json": dict(return_value={"port": 24267}),
            "get_remote_version": dict(return_value=None),
            "verify_deployed_commit": dict(return_value=(None if served is None else served == "ab71cd5", served)),
            "checkout_version": dict(return_value=(True, None)),
            "restore_backup": dict(return_value=True),
            "run_migrations": dict(return_value=(True, "ok")),
            "rebuild_frontend": dict(return_value=(True, "built")),
        }
        patches.update(extra)
        with ExitStack() as stack:
            mocks = {name: stack.enter_context(patch(f"cli.system.{name}", **kw)) for name, kw in patches.items()}
            result = cli_runner.invoke(system.system, ["upgrade", "--yes", *args])
        return (result, mocks["checkout_version"], mocks["verify_deployed_commit"],
                mocks["stop_service"], mocks["start_service"], mocks["restore_backup"])

    def test_old_process_still_on_the_port_rolls_back(self, cli_runner):
        result, checkout, verify, stop, start, restore = self._run(cli_runner, served="19ae385")

        assert result.exit_code == 1
        assert "Port 24267 is answering, but with 19ae385, not ab71cd5" in _flat(result.output)
        assert "the new process did not take over" in _flat(result.output)
        verify.assert_called_once_with(24267, "ab71cd5newer", host="127.0.0.1")
        # Rolled back: re-checkout of the deployed commit, restart.
        assert checkout.call_args_list[-1].args == ("19ae385deployed",)
        assert stop.call_count == 2 and start.call_count == 2
        restore.assert_not_called()  # --no-backup: nothing to restore

    def test_new_process_answering_is_a_success(self, cli_runner):
        result, checkout, verify, stop, start, restore = self._run(cli_runner, served="ab71cd5")

        assert result.exit_code == 0, result.output
        assert "Verifying the new process took over" in _flat(result.output)
        assert "Upgraded to" in _flat(result.output)
        assert checkout.call_count == 1

    def test_no_sha_on_the_port_warns_instead_of_rolling_back(self, cli_runner):
        result, checkout, verify, stop, start, restore = self._run(cli_runner, served=None)

        assert result.exit_code == 0, result.output
        assert "UNVERIFIED" in result.output
        assert "reports no git_sha" in _flat(result.output)
        assert "Upgraded to" in _flat(result.output)
        assert stop.call_count == 1 and start.call_count == 1  # no rollback

    def test_rollback_does_not_restore_the_database_under_a_process_it_could_not_stop(self, cli_runner, tmp_path):
        """The old process is still on the port after stop_service(): that is
        the CHT-1363 case, and it still has the database open. The checkout
        is rolled back; the database restore is refused out loud."""
        (tmp_path / "chaotic.db").write_bytes(b"")  # a database to back up
        backup = tmp_path / "chaotic.db.backup-20260906-000000"
        backup.write_bytes(b"")
        result, checkout, verify, stop, start, restore = self._run(
            cli_runner, served="19ae385", args=(),
            create_backup=dict(return_value=backup),
            cleanup_old_backups=dict(return_value=None),
            DATABASE_PATH=dict(new=tmp_path / "chaotic.db"),
            is_port_in_use=dict(return_value=True),
        )

        assert result.exit_code == 1
        assert "NOT restoring the database backup" in _flat(result.output)
        assert "port 24267 is in use" in _flat(result.output)
        assert f"--restore {backup.name}" in _flat(result.output)
        restore.assert_not_called()
        assert checkout.call_args_list[-1].args == ("19ae385deployed",)
