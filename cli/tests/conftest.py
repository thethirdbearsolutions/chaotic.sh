"""Shared fixtures for CLI tests (CHT-736).

Provides composable fixtures that eliminate duplicated setup across test files:
- _FakeAPIError: Real exception class for when cli.client is mocked
- cli_runner: Click test runner with CHAOTIC_PROFILE set
- mock_client_module: MagicMock with APIError attached
- patched_client: Patches sys.modules with mock client
- patched_auth: Patches get_token, get_current_team, get_api_key
- patched_project: Patches config.get_current_project
"""
import pytest
from unittest.mock import patch, MagicMock
from click.testing import CliRunner


class _FakeAPIError(Exception):
    """Fake APIError for testing when cli.client is mocked."""
    pass


@pytest.fixture(autouse=True)
def _no_session_identity(monkeypatch):
    """Session identity (CHT-1499) is off unless a test turns it on: a
    developer's own CHAOTIC_SESSION_IDENTITY, or the CLAUDE_CODE_SESSION_ID
    of the Claude Code session running the suite, must not change what
    the CLI sends."""
    monkeypatch.delenv("CHAOTIC_SESSION_IDENTITY", raising=False)
    monkeypatch.delenv("CLAUDE_CODE_SESSION_ID", raising=False)


@pytest.fixture(autouse=True)
def _no_process_team(monkeypatch):
    """The stdio MCP server's in-memory default team (CHT-1687) never
    carries over from one test to the next."""
    from cli import config
    monkeypatch.setattr(config, "_process_team", None)


@pytest.fixture
def cli_runner():
    """Create a Click test runner with profile set."""
    return CliRunner(env={'CHAOTIC_PROFILE': 'default'})


@pytest.fixture
def mock_client_module():
    """Create a mock client module with APIError attached."""
    mock_mod = MagicMock()
    mock_mod.APIError = _FakeAPIError
    return mock_mod


@pytest.fixture
def patched_client(mock_client_module):
    """Patch sys.modules with mock client module."""
    with patch.dict('sys.modules', {'cli.client': mock_client_module}):
        yield mock_client_module


@pytest.fixture
def patched_auth():
    """Patch auth functions (get_token, get_current_team, get_api_key)."""
    with patch('cli.main.get_token', return_value='fake-token'), \
         patch('cli.main.get_current_team', return_value='test-team-123'), \
         patch('cli.main.get_api_key', return_value=None):
        yield


@pytest.fixture
def patched_project():
    """Patch config.get_current_project."""
    with patch('cli.main.get_current_project', return_value='test-project-123'):
        yield
