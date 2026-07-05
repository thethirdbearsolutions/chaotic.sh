"""`cli.system`'s module docstring must match its actual command set (CHT-1221).

The docstring used to claim "install, start, stop, status, upgrade, migrate,
logs, uninstall" -- but there's no standalone `migrate` or `uninstall`
command (migrations run bundled inside install/upgrade), and the docstring
omitted `reconfigure` and `backup`, which do exist. This asserts the
docstring's command-list line against the actual set of
`@system.command(...)` names so a future command addition/removal can't
silently re-introduce the drift.
"""
import re

import cli.system as system_module


def _docstring_command_list() -> set[str]:
    """Parse the comma-separated command list out of the module docstring's
    "manage the lifecycle..." line."""
    match = re.search(
        r"lifecycle of a local Chaotic server installation:\s*\n(.+?)\.",
        system_module.__doc__,
        re.DOTALL,
    )
    assert match, "expected a 'manage the lifecycle...: <list>.' line in the docstring"
    return {name.strip() for name in match.group(1).replace("\n", " ").split(",")}


def test_docstring_command_list_matches_registered_commands():
    registered = set(system_module.system.commands.keys())
    assert registered, "expected at least one registered system subcommand"
    assert _docstring_command_list() == registered


def test_docstring_does_not_claim_migrate_or_uninstall_are_commands():
    documented = _docstring_command_list()
    assert "migrate" not in documented
    assert "uninstall" not in documented
    # Fixture assumption: if these ever become real commands, the docstring
    # (and this test) need updating, not the other way around.
    assert "migrate" not in system_module.system.commands
    assert "uninstall" not in system_module.system.commands
