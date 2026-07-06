"""Tests for `chaotic system reconfigure`'s failed-restart recovery hint (CHT-1221).

`system_reconfigure()` used to print the revert instructions as a plain
string missing the `f` prefix: `"...--host {current_host}..."` rendered
the literal placeholder text instead of the previous host/port -- on
exactly the failure path (restart-after-reconfigure fails) where the
operator most needs a working command to recover.
"""
from unittest.mock import patch, MagicMock

from click.testing import CliRunner

from cli.main import cli


def _reconfigure_patches(**overrides):
    patches = dict(
        is_server_installed=MagicMock(return_value=True),
        load_server_json=MagicMock(return_value={
            "host": "127.0.0.1",
            "port": 24267,
            "secret_key": "existing-secret",
        }),
        validate_host=MagicMock(return_value=True),
        validate_port=MagicMock(return_value=True),
        save_server_json=MagicMock(),
        write_service_file=MagicMock(return_value="/tmp/chaotic-service"),
        is_service_running=MagicMock(return_value=True),
        stop_service=MagicMock(return_value=True),
        wait_for_service_stop=MagicMock(return_value=True),
        start_service=MagicMock(return_value=False),
        set_api_url=MagicMock(),
    )
    patches.update(overrides)
    return patches


class TestReconfigureRevertHint:
    """The revert-instructions line must interpolate the actual old values."""

    def test_failed_restart_prints_interpolated_revert_command(self):
        """Regression: the message used to print literal `{current_host}` /
        `{current_port}` placeholders instead of the real previous values."""
        patches = _reconfigure_patches()
        with patch.multiple("cli.system", **patches):
            runner = CliRunner()
            result = runner.invoke(
                cli, ["system", "reconfigure", "--port", "9999", "--yes"]
            )

        assert result.exit_code == 1, result.output
        assert "Failed to restart server." in result.output
        assert (
            "Run 'chaotic system reconfigure --host 127.0.0.1 --port 24267' to revert."
            in result.output
        )
        # The literal, un-interpolated placeholder must never appear.
        assert "{current_host}" not in result.output
        assert "{current_port}" not in result.output
