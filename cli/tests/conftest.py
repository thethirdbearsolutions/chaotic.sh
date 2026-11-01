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
    """The in-memory default teams (CHT-1687) never carry over from one
    test to the next."""
    from cli import config
    monkeypatch.setattr(config, "_process_teams", {})
    monkeypatch.setattr(config, "_only_teams", {})
    from cli import mcp_backend
    monkeypatch.setattr(mcp_backend, "_key_projects", {})


@pytest.fixture(autouse=True)
def _staging_in_tmp(monkeypatch, tmp_path_factory):
    """`system upgrade` prepares the target in a staging checkout
    (CHT-1969). No test may reach the real ~/.chaotic/staging, which
    prepare_release() may delete and recreate."""
    from cli import system
    monkeypatch.setattr(system, "STAGING_DIR", tmp_path_factory.mktemp("staging-root") / "staging")


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
    """Patch sys.modules with mock client module.

    On exit ``patch.dict`` drops every module imported during the test
    (``cli.main`` among them) from ``sys.modules``, but the import also set
    it as an attribute of its parent package, and that attribute survives.
    On Python 3.10, ``mock.patch('cli.main.get_token')`` resolves its target
    through those attributes, so the next test's ``patched_auth`` patched
    the stale ``cli.main`` while the test's own ``from cli.main import cli``
    re-imported a fresh, unpatched one: "Not authenticated" for every test
    after a file's first, unless an earlier file had imported ``cli.main``
    for good (CHT-1825). 3.11+ resolves through ``sys.modules`` and never
    saw it. Unbind the ``cli.*`` submodules ``patch.dict`` removed so both
    agree again; other packages' attributes are left as they were.
    """
    import sys

    with patch.dict('sys.modules', {'cli.client': mock_client_module}):
        before = set(sys.modules)
        yield mock_client_module
        added = {name: sys.modules[name] for name in set(sys.modules) - before
                 if name.startswith('cli.')}
    for name, module in added.items():
        parent_name, _, child = name.rpartition('.')
        parent = sys.modules.get(parent_name)
        if parent is not None and name not in sys.modules \
                and getattr(parent, child, None) is module:
            delattr(parent, child)


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
