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
    with patch('cli.config.get_current_project', return_value='test-project-123'):
        yield
