"""Tests for macOS service status detection (CHT-195)."""
import subprocess
from unittest.mock import patch, MagicMock


class TestIsServiceRunningDarwin:
    """Tests for is_service_running() on macOS."""

    @patch("cli.system.get_os", return_value="darwin")
    @patch("cli.system.run_command")
    def test_running_service_has_pid(self, mock_run, mock_os):
        """Service with a numeric PID is running."""
        from cli.system import is_service_running

        mock_run.return_value = MagicMock(
            returncode=0, stdout='"1234"\t"0"\t"com.chaotic.server"'
        )
        assert is_service_running() is True

    @patch("cli.system.get_os", return_value="darwin")
    @patch("cli.system.run_command")
    def test_loaded_but_not_running_has_dash_pid(self, mock_run, mock_os):
        """Service loaded but not running has PID '-'."""
        from cli.system import is_service_running

        mock_run.return_value = MagicMock(
            returncode=0, stdout='"-"\t"0"\t"com.chaotic.server"'
        )
        assert is_service_running() is False

    @patch("cli.system.get_os", return_value="darwin")
    @patch("cli.system.run_command")
    def test_unloaded_service_returns_nonzero(self, mock_run, mock_os):
        """Unloaded service causes launchctl to return non-zero."""
        from cli.system import is_service_running

        mock_run.return_value = MagicMock(returncode=1, stdout="")
        assert is_service_running() is False

    @patch("cli.system.get_os", return_value="darwin")
    @patch("cli.system.run_command")
    def test_empty_stdout_is_not_running(self, mock_run, mock_os):
        """Empty stdout means not running."""
        from cli.system import is_service_running

        mock_run.return_value = MagicMock(returncode=0, stdout="")
        assert is_service_running() is False

    @patch("cli.system.get_os", return_value="darwin")
    @patch("cli.system.run_command")
    def test_none_stdout_is_not_running(self, mock_run, mock_os):
        """None stdout means not running."""
        from cli.system import is_service_running

        mock_run.return_value = MagicMock(returncode=0, stdout=None)
        assert is_service_running() is False

    @patch("cli.system.get_os", return_value="darwin")
    @patch("cli.system.run_command")
    def test_pid_without_quotes(self, mock_run, mock_os):
        """PID field without quotes still works."""
        from cli.system import is_service_running

        mock_run.return_value = MagicMock(
            returncode=0, stdout="5678\t0\tcom.chaotic.server"
        )
        assert is_service_running() is True

    @patch("cli.system.get_os", return_value="darwin")
    @patch("cli.system.run_command")
    def test_dash_pid_without_quotes(self, mock_run, mock_os):
        """Dash PID without quotes still detected as not running."""
        from cli.system import is_service_running

        mock_run.return_value = MagicMock(
            returncode=0, stdout="-\t0\tcom.chaotic.server"
        )
        assert is_service_running() is False
