"""`system upgrade` must leave the installed CLI running the checkout's code
(CHT-1675).

Prod deploys main by sha between CLI releases, so the CLI's version string
usually does not change across an upgrade. `uv tool install --force <dir>`
could then reuse a wheel uv had cached for that name and version, built
from an earlier commit: prod reported `0.1.0a22` with no `system config`
after an upgrade to a commit that had it. reinstall_cli now forces the
rebuild and checks the installed files against the checkout.
"""
import os
import shutil
import subprocess
import sys
from pathlib import Path
from unittest.mock import patch

import pytest

from cli import system

PYPROJECT = """\
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "chaotic-cli"
version = "0.1.0a22"
requires-python = ">=3.10"

[project.scripts]
chaotic = "cli:main"

[tool.hatch.build.targets.wheel]
packages = ["src/cli", "src/chaotic_mcp_tools"]
"""


def _cli_source(marker: str) -> str:
    return f'MARKER = "{marker}"\n\n\ndef main():\n    print(MARKER)\n'


def _git(repo: Path, *args: str) -> None:
    subprocess.run(
        ["git", "-c", "user.name=t", "-c", "user.email=t@example.com", *args],
        cwd=repo, check=True, capture_output=True,
    )


def _commit(repo: Path, marker: str, message: str) -> None:
    (repo / "cli" / "src" / "cli" / "__init__.py").write_text(_cli_source(marker))
    (repo / "cli" / "src" / "chaotic_mcp_tools" / "__init__.py").write_text(f'MARKER = "{marker}"\n')
    _git(repo, "add", "-A")
    _git(repo, "commit", "-q", "-m", message)


# The oldest uv the CLI's lockfile supports (cli/pyproject.toml
# required-version), which still reuses a cached same-version wheel on a
# plain `--force`: the prod failure reproduces on it, not on current uv.
OLD_UV = "0.5.31"


@pytest.fixture(scope="session")
def old_uv_bin(tmp_path_factory):
    """A directory whose `uv` is OLD_UV, installed from PyPI into a venv of
    its own. Skips (only this variant) when it cannot be installed, except
    on CI, where a silent skip would drop the only regression test that
    reproduces CHT-1675 (CHT-1696)."""
    root = tmp_path_factory.mktemp("old-uv")
    venv = root / "venv"
    try:
        subprocess.run(["uv", "venv", "-q", "--python", sys.executable, str(venv)],
                       check=True, capture_output=True, timeout=120)
        subprocess.run(["uv", "pip", "install", "-q", "--python", str(venv / "bin" / "python"), f"uv=={OLD_UV}"],
                       check=True, capture_output=True, timeout=300)
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, OSError) as e:
        reason = f"could not install uv {OLD_UV} to test against: {e}"
        if os.environ.get("CI"):
            pytest.fail(reason)
        pytest.skip(reason)
    return venv / "bin"


@pytest.fixture(params=["current-uv", f"uv-{OLD_UV}"])
def uv_on_path(request, monkeypatch):
    if request.param != "current-uv":
        bin_dir = request.getfixturevalue("old_uv_bin")
        monkeypatch.setenv("PATH", f"{bin_dir}{os.pathsep}{os.environ['PATH']}")
        version = subprocess.run(["uv", "--version"], check=True, capture_output=True, text=True).stdout
        assert OLD_UV in version
    return request.param


@pytest.fixture
def server_checkout(tmp_path, monkeypatch, uv_on_path):
    """A server checkout whose CLI is a minimal chaotic-cli at an unchanging
    version, installed into a uv tool dir and cache of its own (so the
    tests download hatchling, and need network, as an upgrade does)."""
    if shutil.which("uv") is None or shutil.which("git") is None:
        pytest.fail("this test needs uv and git on PATH, as `system upgrade` does")
    repo = tmp_path / "server"
    for package in ("cli", "chaotic_mcp_tools"):
        (repo / "cli" / "src" / package).mkdir(parents=True)
    (repo / "cli" / "pyproject.toml").write_text(PYPROJECT)
    # A gitignored module: hatch leaves it out of the wheel, so the
    # verification must not count it as missing (review L1).
    (repo / "cli" / ".gitignore").write_text("build/\n")
    (repo / "cli" / "src" / "cli" / "build").mkdir()
    (repo / "cli" / "src" / "cli" / "build" / "helper.py").write_text("X = 1\n")
    _git(repo, "init", "-q", "-b", "main")
    _commit(repo, "commit-A", "A")

    monkeypatch.setenv("UV_TOOL_DIR", str(tmp_path / "tools"))
    monkeypatch.setenv("UV_TOOL_BIN_DIR", str(tmp_path / "bin"))
    monkeypatch.setenv("UV_CACHE_DIR", str(tmp_path / "uv-cache"))
    monkeypatch.setenv("UV_PYTHON", sys.executable)
    monkeypatch.delenv("VIRTUAL_ENV", raising=False)
    monkeypatch.setattr(system, "PROJECT_DIR", repo)
    monkeypatch.setattr(system, "SERVER_DIR", repo)
    return repo


def _installed_marker(tmp_path: Path) -> str:
    exe = tmp_path / "bin" / ("chaotic.exe" if os.name == "nt" else "chaotic")
    return subprocess.run([str(exe)], check=True, capture_output=True, text=True).stdout.strip()


class TestUpgradeBetweenCommitsWithTheSameCliVersion:
    def test_the_installed_cli_has_the_new_commits_code(self, server_checkout, tmp_path):
        repo = server_checkout
        ok, message = system.reinstall_cli()
        assert ok, message
        assert _installed_marker(tmp_path) == "commit-A"

        # Two commits, same CLI version string, both changing CLI code,
        # deployed in turn the way `system upgrade` checks them out.
        shas = {}
        for marker in ("commit-B", "commit-C"):
            _commit(repo, marker, marker)
            shas[marker] = subprocess.run(["git", "rev-parse", "HEAD"], cwd=repo, check=True,
                                          capture_output=True, text=True).stdout.strip()
        ok, err = system.checkout_version(f"{shas['commit-B']}~1", force=True)  # back to A
        assert ok, err

        for marker, sha in shas.items():
            ok, err = system.checkout_version(sha, force=True)
            assert ok, err
            ok, message = system.reinstall_cli()
            assert ok, message
            assert message == "CLI reinstalled (verified against the checkout)"
            assert _installed_marker(tmp_path) == marker
            dirs = system._installed_cli_dirs()
            assert f'"{marker}"' in (dirs["chaotic_mcp_tools"] / "__init__.py").read_text()

    def test_an_installed_cli_that_differs_from_the_checkout_fails_loudly(self, server_checkout):
        ok, message = system.reinstall_cli()
        assert ok, message
        installed = system._installed_cli_dirs()["cli"] / "__init__.py"
        installed.write_text(_cli_source("stale"))

        ok, message = system.verify_installed_cli(server_checkout / "cli")

        assert ok is False
        assert "the installed CLI differs from the checkout in cli/__init__.py" in message
        assert f"uv tool install --force --reinstall {server_checkout / 'cli'}" in message


class TestReinstallCommand:
    def test_forces_uv_to_rebuild_the_cli_from_the_checkout(self):
        with patch.object(system, "run_command") as run, \
                patch.object(system, "verify_installed_cli", return_value=(True, "ok")) as verify, \
                patch.object(system, "path_cli_warning", return_value=None):
            assert system.reinstall_cli() == (True, "ok")

        cmd = run.call_args.args[0]
        assert cmd[:4] == ["uv", "tool", "install", "--force"]
        assert cmd[cmd.index("--reinstall-package") + 1] == "chaotic-cli"
        assert cmd[-1] == str(system.PROJECT_DIR / "cli")
        verify.assert_called_once_with(system.PROJECT_DIR / "cli")

    def test_a_failed_install_reports_its_output(self):
        error = subprocess.CalledProcessError(2, ["uv"], output="", stderr="error: no hatchling")
        with patch.object(system, "run_command", side_effect=error), \
                patch.object(system, "verify_installed_cli") as verify:
            ok, message = system.reinstall_cli()

        assert ok is False
        assert "CLI reinstall failed" in message and "no hatchling" in message
        verify.assert_not_called()

    def test_a_timed_out_install_is_reported(self):
        with patch.object(system, "run_command", side_effect=subprocess.TimeoutExpired(["uv"], 120)):
            assert system.reinstall_cli() == (False, "CLI reinstall timed out")

    def test_unverifiable_install_fails_rather_than_passing(self, tmp_path):
        with patch.object(system, "_installed_cli_dirs", return_value=None):
            ok, message = system.verify_installed_cli(tmp_path)

        assert ok is False
        assert "could not be verified" in message

    def test_installed_dirs_none_when_the_tool_python_cannot_answer(self):
        def run(cmd, **kwargs):
            if cmd[:3] == ["uv", "tool", "dir"]:
                return subprocess.CompletedProcess(cmd, 0, "/nowhere/tools\n", "")
            raise subprocess.CalledProcessError(1, cmd)

        with patch.object(system, "run_command", side_effect=run):
            assert system._installed_cli_dirs() is None

    def test_installed_dirs_none_when_uv_cannot_name_the_tool_dir(self):
        with patch.object(system, "run_command", side_effect=OSError("no uv")):
            assert system._installed_cli_dirs() is None


class TestSystemInstallVerifiesTheCli:
    """Review L3: install reinstalls the CLI through run_migrations too, so
    it gets the same check, and a failure stops the install."""

    def test_install_fails_when_the_installed_cli_is_not_the_checkout(self, tmp_path):
        from unittest.mock import MagicMock
        from click.testing import CliRunner
        from cli.main import cli
        from test_system_install import _install_patches

        patches = _install_patches(
            GLOBAL_CONFIG_DIR=tmp_path,
            SERVER_DIR=tmp_path / "server",
            PROJECT_DIR=tmp_path / "server",
            DATA_DIR=tmp_path / "data",
            LOGS_DIR=tmp_path / "logs",
            run_migrations=system.run_migrations,
            run_command=MagicMock(return_value=subprocess.CompletedProcess([], 0, "", "")),
            verify_installed_cli=MagicMock(return_value=(False, "CLI reinstall did not take: cli/system.py")),
            start_service=MagicMock(return_value=True),
            health_check=MagicMock(return_value=True),
            is_port_in_use=MagicMock(return_value=False),
        )
        with patch.multiple("cli.system", **patches):
            result = CliRunner().invoke(cli, ["system", "install", "--yes"])

        assert result.exit_code == 1
        assert "CLI reinstall did not take" in result.output
        patches["verify_installed_cli"].assert_called_once_with(tmp_path / "server" / "cli")
        patches["start_service"].assert_not_called()


class TestGitIgnoredMatchesHatch:
    """CHT-1696: hatch excludes by ignore pattern whether or not a file is
    committed, so the check must too (`git check-ignore --no-index`)."""

    def test_a_committed_file_matching_an_ignore_pattern_counts_as_ignored(self, tmp_path):
        repo = tmp_path / "repo"
        (repo / "src" / "cli" / "build").mkdir(parents=True)
        tracked = repo / "src" / "cli" / "build" / "helper.py"
        tracked.write_text("X = 1\n")
        plain = repo / "src" / "cli" / "main.py"
        plain.write_text("Y = 1\n")
        _git(repo, "init", "-q", "-b", "main")
        _git(repo, "add", "-A")
        _git(repo, "commit", "-q", "-m", "files first")
        (repo / ".gitignore").write_text("build/\n")  # the pattern comes after the commit

        assert system._git_ignored(repo, [tracked, plain]) == {tracked}


class TestPathCliWarning:
    """CHT-1695: the verified uv tool is not necessarily the `chaotic` the
    shell runs. A warning, never a failure."""

    def _bin(self, tmp_path):
        bin_dir = tmp_path / "uv-bin"
        bin_dir.mkdir()
        exe = bin_dir / "chaotic"
        exe.write_text("#!/bin/sh\n")
        exe.chmod(0o755)
        return bin_dir

    def _uv_bin(self, bin_dir):
        return patch.object(system, "run_command",
                            return_value=subprocess.CompletedProcess([], 0, f"{bin_dir}\n", ""))

    def test_the_tools_own_chaotic_first_on_path_is_quiet(self, tmp_path, monkeypatch):
        bin_dir = self._bin(tmp_path)
        monkeypatch.setenv("PATH", f"{bin_dir}{os.pathsep}{os.environ['PATH']}")
        with self._uv_bin(bin_dir):
            assert system.path_cli_warning() is None

    def test_a_symlink_to_the_tools_chaotic_is_quiet(self, tmp_path, monkeypatch):
        bin_dir = self._bin(tmp_path)
        other = tmp_path / "other"
        other.mkdir()
        (other / "chaotic").symlink_to(bin_dir / "chaotic")
        monkeypatch.setenv("PATH", f"{other}{os.pathsep}{os.environ['PATH']}")
        with self._uv_bin(bin_dir):
            assert system.path_cli_warning() is None

    def test_another_chaotic_first_on_path_names_both(self, tmp_path, monkeypatch):
        bin_dir = self._bin(tmp_path)
        shadow = tmp_path / "pipx-bin"
        shadow.mkdir()
        (shadow / "chaotic").write_text("#!/bin/sh\n")
        (shadow / "chaotic").chmod(0o755)
        monkeypatch.setenv("PATH", f"{shadow}{os.pathsep}{bin_dir}{os.pathsep}{os.environ['PATH']}")
        with self._uv_bin(bin_dir):
            warning = system.path_cli_warning()
        assert str(shadow / "chaotic") in warning
        assert str(bin_dir / "chaotic") in warning
        assert "may still run older code" in warning

    def test_no_chaotic_on_path_says_where_it_is(self, tmp_path, monkeypatch):
        bin_dir = self._bin(tmp_path)
        monkeypatch.setenv("PATH", str(tmp_path / "empty"))
        with self._uv_bin(bin_dir):
            warning = system.path_cli_warning()
        assert "not on this shell's PATH" in warning and str(bin_dir / "chaotic") in warning

    def test_uv_unable_to_name_its_bin_dir_is_quiet(self):
        with patch.object(system, "run_command", side_effect=OSError("no uv")):
            assert system.path_cli_warning() is None

    def test_reinstall_warns_but_succeeds(self):
        with patch.object(system, "run_command"), \
                patch.object(system, "verify_installed_cli", return_value=(True, "CLI reinstalled (verified)")), \
                patch.object(system, "path_cli_warning", return_value="`chaotic` on this shell's PATH is /x"), \
                patch.object(system, "console") as console:
            assert system.reinstall_cli() == (True, "CLI reinstalled (verified)")
        printed = " ".join(str(c.args[0]) for c in console.print.call_args_list)
        assert "[yellow]" in printed and "/x" in printed

    def test_no_path_check_when_verification_failed(self):
        with patch.object(system, "run_command"), \
                patch.object(system, "verify_installed_cli", return_value=(False, "did not take")), \
                patch.object(system, "path_cli_warning") as warn:
            assert system.reinstall_cli() == (False, "did not take")
        warn.assert_not_called()
