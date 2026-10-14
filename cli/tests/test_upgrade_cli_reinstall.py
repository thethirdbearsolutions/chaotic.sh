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


@pytest.fixture
def server_checkout(tmp_path, monkeypatch):
    """A server checkout whose CLI is a minimal chaotic-cli at an unchanging
    version, installed into a uv tool dir and cache of its own."""
    if shutil.which("uv") is None or shutil.which("git") is None:
        pytest.fail("this test needs uv and git on PATH, as `system upgrade` does")
    repo = tmp_path / "server"
    for package in ("cli", "chaotic_mcp_tools"):
        (repo / "cli" / "src" / package).mkdir(parents=True)
    (repo / "cli" / "pyproject.toml").write_text(PYPROJECT)
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
                patch.object(system, "verify_installed_cli", return_value=(True, "ok")) as verify:
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
