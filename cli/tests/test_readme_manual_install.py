"""README.md's own "Manual install" commands must be copy-pasteable (CHT-1221).

The doc block used to show bare `chaotic auth signup` / `chaotic team create`
with no arguments. Both commands have required options/arguments with no
interactive prompt fallback, so following the doc verbatim errors immediately
with Click's "Missing option"/"Missing argument". These tests parse the
actual fenced code block out of README.md and drive each `chaotic ...` line
through the real CLI parser (with the API client mocked) to lock in that the
documented commands parse and run successfully end-to-end.
"""
import re
import shlex
from pathlib import Path
from unittest.mock import patch, MagicMock

import pytest

README_PATH = Path(__file__).resolve().parents[2] / "README.md"


def _manual_install_account_setup_commands() -> list[list[str]]:
    """Extract the `chaotic ...` lines from the "Then set up your account:"
    code block in README's Manual install section."""
    text = README_PATH.read_text()
    section = text.split("### Manual install", 1)[1].split("\n## ", 1)[0]
    account_block = section.split("Then set up your account:", 1)[1]
    fenced = re.search(r"```bash\n(.*?)```", account_block, re.DOTALL)
    assert fenced, "expected a ```bash fenced block after 'Then set up your account:'"
    lines = [l.strip() for l in fenced.group(1).splitlines() if l.strip()]
    assert lines, "expected at least one command in the account-setup block"
    return [shlex.split(l) for l in lines if l.split()[0] == "chaotic"]


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


class TestReadmeManualInstallCommandsAreRunnable:
    """Every `chaotic ...` line in the doc block must actually parse and run."""

    def test_auth_signup_line_has_required_flags(self):
        commands = _manual_install_account_setup_commands()
        signup = next(c for c in commands if c[1:3] == ["auth", "signup"])
        for flag in ("--name", "--email", "--password"):
            assert flag in signup, f"README auth signup line is missing {flag}"

    def test_team_create_line_has_required_positional_args(self):
        commands = _manual_install_account_setup_commands()
        create = next(c for c in commands if c[1:3] == ["team", "create"])
        # NAME and KEY are positional (click.argument), not flags.
        positional = [a for a in create[3:] if not a.startswith("-")]
        assert len(positional) >= 2, (
            f"README team create line is missing NAME/KEY arguments: {create}"
        )

    def test_documented_commands_run_without_usage_errors(self, cli_runner):
        """Drive the exact documented invocations through the real CLI
        parser and command bodies (client calls mocked) -- exit_code 2
        is Click's "missing required option/argument" usage error, which
        is exactly what the un-fixed README produced."""
        from cli.main import cli, client

        commands = _manual_install_account_setup_commands()

        client.signup = MagicMock()
        client.login = MagicMock(return_value={"access_token": "tok"})
        client.create_team = MagicMock(return_value={
            "id": "team-id", "name": "My Team", "key": "TEAM",
        })

        with patch("cli.main.set_token"), patch("cli.main.set_current_team"):
            for command in commands:
                args = command[1:]  # drop leading "chaotic"
                if args[0] == "init":
                    # chaotic init opens a browser/local server; out of scope
                    # for this parser-level check.
                    continue
                result = cli_runner.invoke(cli, args)
                assert result.exit_code == 0, (
                    f"`chaotic {' '.join(args)}` failed as documented: {result.output}"
                )
