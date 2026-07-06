"""Tests for macOS service status detection (CHT-195).

`launchctl list <LABEL>` returns a plist-dict format, e.g.

    {
        "StandardOutPath" = "/Users/.../server.log";
        "Label" = "com.chaotic.server";
        "OnDemand" = false;
        "LastExitStatus" = 0;
        "PID" = 47168;
        ...
    };

The "PID" key is present (with an integer) when the job is currently
running, and absent when the job is loaded but not running.
"""
from unittest.mock import patch, MagicMock


RUNNING_LAUNCHCTL_STDOUT = """{
\t"StandardOutPath" = "/Users/ethanjucovy/.chaotic/logs/server.log";
\t"LimitLoadToSessionType" = "Aqua";
\t"StandardErrorPath" = "/Users/ethanjucovy/.chaotic/logs/server.log";
\t"Label" = "com.chaotic.server";
\t"OnDemand" = false;
\t"LastExitStatus" = 0;
\t"PID" = 47168;
\t"Program" = "/usr/bin/env";
\t"ProgramArguments" = (
\t\t"/usr/bin/env";
\t\t"just";
\t\t"serve-prod";
\t);
};
"""

# Same plist with the PID line removed: agent is loaded but not running.
LOADED_NOT_RUNNING_LAUNCHCTL_STDOUT = """{
\t"StandardOutPath" = "/Users/ethanjucovy/.chaotic/logs/server.log";
\t"LimitLoadToSessionType" = "Aqua";
\t"StandardErrorPath" = "/Users/ethanjucovy/.chaotic/logs/server.log";
\t"Label" = "com.chaotic.server";
\t"OnDemand" = false;
\t"LastExitStatus" = 35072;
\t"Program" = "/usr/bin/env";
\t"ProgramArguments" = (
\t\t"/usr/bin/env";
\t\t"just";
\t\t"serve-prod";
\t);
};
"""


class TestIsServiceRunningDarwin:
    """Tests for is_service_running() on macOS."""

    @patch("cli.system.get_os", return_value="darwin")
    @patch("cli.system.run_command")
    def test_running_service_has_pid(self, mock_run, mock_os):
        """Plist dict with a PID line means the service is running."""
        from cli.system import is_service_running

        mock_run.return_value = MagicMock(
            returncode=0, stdout=RUNNING_LAUNCHCTL_STDOUT
        )
        assert is_service_running() is True

    @patch("cli.system.get_os", return_value="darwin")
    @patch("cli.system.run_command")
    def test_loaded_but_not_running_has_no_pid_line(self, mock_run, mock_os):
        """Plist dict without a PID line means loaded but not running."""
        from cli.system import is_service_running

        mock_run.return_value = MagicMock(
            returncode=0, stdout=LOADED_NOT_RUNNING_LAUNCHCTL_STDOUT
        )
        assert is_service_running() is False

    @patch("cli.system.get_os", return_value="darwin")
    @patch("cli.system.run_command")
    def test_unloaded_service_returns_nonzero(self, mock_run, mock_os):
        """`launchctl list <unknown-label>` returns non-zero."""
        from cli.system import is_service_running

        mock_run.return_value = MagicMock(returncode=1, stdout="")
        assert is_service_running() is False

    @patch("cli.system.get_os", return_value="darwin")
    @patch("cli.system.run_command")
    def test_empty_stdout_is_not_running(self, mock_run, mock_os):
        """Empty stdout (no plist) means not running."""
        from cli.system import is_service_running

        mock_run.return_value = MagicMock(returncode=0, stdout="")
        assert is_service_running() is False

    @patch("cli.system.get_os", return_value="darwin")
    @patch("cli.system.run_command")
    def test_none_stdout_is_not_running(self, mock_run, mock_os):
        """None stdout (treated as empty) means not running."""
        from cli.system import is_service_running

        mock_run.return_value = MagicMock(returncode=0, stdout=None)
        assert is_service_running() is False

    @patch("cli.system.get_os", return_value="darwin")
    @patch("cli.system.run_command")
    def test_other_integer_keys_do_not_match(self, mock_run, mock_os):
        """Plist with LastExitStatus but no PID must not match — regex anchors
        on the literal key name "PID"."""
        from cli.system import is_service_running

        stdout = """{
\t"Label" = "com.chaotic.server";
\t"LastExitStatus" = 35072;
\t"OnDemand" = false;
};
"""
        mock_run.return_value = MagicMock(returncode=0, stdout=stdout)
        assert is_service_running() is False
