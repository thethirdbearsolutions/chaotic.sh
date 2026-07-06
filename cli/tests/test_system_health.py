"""Tests for /health-awareness on the CLI side (CHT-1221).

`/health` used to report a static 200 that never touched the DB, and
`chaotic system status` never called it at all -- only checking OS-level
process liveness (is_service_running()). A broken-but-process-alive
server looked "running" at every checkpoint. Covers:

- get_health(): a single non-polling GET against /health, parsing the
  JSON body (unlike health_check(), which only polls for HTTP 200).
- `chaotic system status`: now calls get_health() and surfaces a
  Health: ok/degraded/unreachable line distinct from Status: running.
"""
import io
import json
import socket
import urllib.error
from pathlib import Path
from unittest.mock import patch, MagicMock

from click.testing import CliRunner

from cli.main import cli
from cli.system import get_health


class _FakeHTTPResponse:
    """Minimal stand-in for the object urllib.request.urlopen()'s context
    manager yields: `.status` and a `.read()` returning bytes."""

    def __init__(self, status: int, body: bytes):
        self.status = status
        self._body = body

    def read(self):
        return self._body

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False


class TestGetHealth:
    """Unit tests for get_health()."""

    def test_returns_parsed_body_on_200(self):
        body = json.dumps({"status": "healthy", "db": "ok", "version": "1.0.0"}).encode()
        with patch("urllib.request.urlopen", return_value=_FakeHTTPResponse(200, body)):
            result = get_health(24267)
        assert result == {"status": "healthy", "db": "ok", "version": "1.0.0"}

    def test_returns_none_on_db_error_body(self):
        """get_health() itself doesn't interpret db:error -- it just
        parses whatever JSON /health returns; the caller (system_status)
        decides what "degraded" means."""
        body = json.dumps({"status": "healthy", "db": "error", "version": "1.0.0"}).encode()
        with patch("urllib.request.urlopen", return_value=_FakeHTTPResponse(200, body)):
            result = get_health(24267)
        assert result == {"status": "healthy", "db": "error", "version": "1.0.0"}

    def test_returns_none_on_connection_refused(self):
        with patch("urllib.request.urlopen", side_effect=ConnectionRefusedError()):
            assert get_health(24267) is None

    def test_returns_none_on_url_error(self):
        with patch("urllib.request.urlopen", side_effect=urllib.error.URLError("boom")):
            assert get_health(24267) is None

    def test_returns_none_on_timeout(self):
        with patch("urllib.request.urlopen", side_effect=TimeoutError()):
            assert get_health(24267) is None

    def test_returns_none_on_non_200_status(self):
        with patch("urllib.request.urlopen", return_value=_FakeHTTPResponse(503, b"{}")):
            assert get_health(24267) is None

    def test_returns_none_on_malformed_json(self):
        with patch("urllib.request.urlopen", return_value=_FakeHTTPResponse(200, b"not json")):
            assert get_health(24267) is None

    def test_does_not_retry(self):
        """Unlike health_check(), a single failed attempt is final --
        no polling loop, no time.sleep."""
        mock_urlopen = MagicMock(side_effect=ConnectionRefusedError())
        with patch("urllib.request.urlopen", mock_urlopen), \
             patch("cli.system.time.sleep") as mock_sleep:
            get_health(24267)
        mock_urlopen.assert_called_once()
        mock_sleep.assert_not_called()


def _status_patches(**overrides):
    patches = dict(
        is_server_installed=MagicMock(return_value=True),
        load_server_json=MagicMock(return_value={"host": "127.0.0.1", "port": 24267}),
        is_service_running=MagicMock(return_value=True),
        run_command=MagicMock(return_value=MagicMock(returncode=0, stdout="v1.2.3")),
        DATABASE_PATH=Path("/nonexistent/chaotic.db"),
    )
    patches.update(overrides)
    return patches


class TestSystemStatusHealth:
    """`chaotic system status` surfacing get_health()'s result."""

    def test_healthy_db_ok_shows_ok(self):
        patches = _status_patches(
            get_health=MagicMock(return_value={"status": "healthy", "db": "ok", "version": "1.0.0"})
        )
        with patch.multiple("cli.system", **patches):
            result = CliRunner().invoke(cli, ["system", "status"])
        assert result.exit_code == 0, result.output
        assert "Health:" in result.output
        assert "ok" in result.output
        assert "degraded" not in result.output
        assert "unreachable" not in result.output

    def test_db_error_shows_degraded(self):
        """The exact seeded scenario: process alive, /health responds,
        but the DB round-trip inside it failed (unmigrated/broken DB)."""
        patches = _status_patches(
            get_health=MagicMock(return_value={"status": "healthy", "db": "error", "version": "1.0.0"})
        )
        with patch.multiple("cli.system", **patches):
            result = CliRunner().invoke(cli, ["system", "status"])
        assert result.exit_code == 0, result.output
        assert "Health:" in result.output
        assert "degraded" in result.output

    def test_unreachable_health_endpoint(self):
        """Process is alive (is_service_running True) but /health itself
        never responds -- distinguish from both ok and degraded."""
        patches = _status_patches(get_health=MagicMock(return_value=None))
        with patch.multiple("cli.system", **patches):
            result = CliRunner().invoke(cli, ["system", "status"])
        assert result.exit_code == 0, result.output
        assert "Health:" in result.output
        assert "unreachable" in result.output

    def test_stopped_service_does_not_call_health(self):
        """If the process isn't even running, don't bother calling /health."""
        patches = _status_patches(
            is_service_running=MagicMock(return_value=False),
            get_health=MagicMock(return_value={"status": "healthy", "db": "ok"}),
        )
        with patch.multiple("cli.system", **patches):
            result = CliRunner().invoke(cli, ["system", "status"])
        assert result.exit_code == 0, result.output
        assert "Health:" not in result.output
        patches["get_health"].assert_not_called()
