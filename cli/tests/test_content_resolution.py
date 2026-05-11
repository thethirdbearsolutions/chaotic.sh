"""Tests for resolve_content_value: curl-style @file and stdin on long-text flags.

Covers the helper in isolation (unit tests) and the wiring on a representative
sample of commands (integration tests).
"""
import io
import sys
from unittest.mock import MagicMock, patch

import click
import pytest


# ── Unit tests for the helper ────────────────────────────────────────────────


@pytest.fixture
def resolver():
    """Import the helper lazily so test discovery doesn't depend on cli import order."""
    from cli.commands.shared import resolve_content_value
    return resolve_content_value


def test_passes_through_literal(resolver):
    assert resolver(None, None, "hello world") == "hello world"


def test_passes_through_empty_string(resolver):
    assert resolver(None, None, "") == ""


def test_passes_through_none(resolver):
    assert resolver(None, None, None) is None


def test_reads_stdin_on_dash(resolver, monkeypatch):
    monkeypatch.setattr("sys.stdin", io.StringIO("stdin body content"))
    assert resolver(None, None, "-") == "stdin body content"


def test_reads_stdin_to_eof_preserves_newlines(resolver, monkeypatch):
    monkeypatch.setattr("sys.stdin", io.StringIO("line one\nline two\n"))
    assert resolver(None, None, "-") == "line one\nline two\n"


def test_reads_file(resolver, tmp_path):
    f = tmp_path / "content.md"
    f.write_text("# Heading\n\nbody with `backticks` and $vars\n")
    assert resolver(None, None, f"@{f}") == "# Heading\n\nbody with `backticks` and $vars\n"


def test_reads_empty_file(resolver, tmp_path):
    f = tmp_path / "empty.md"
    f.write_text("")
    assert resolver(None, None, f"@{f}") == ""


def test_escape_double_at(resolver):
    assert resolver(None, None, "@@foo") == "@foo"


def test_escape_only_strips_leading_double_at(resolver):
    # @@@foo → @@foo (one level of unescape); doesn't try to read file "@foo"
    assert resolver(None, None, "@@@foo") == "@@foo"


def test_escape_for_at_username(resolver):
    # User wants literal "@alice" in a comment without it being read as a file.
    assert resolver(None, None, "@@alice") == "@alice"


def test_missing_file_raises_usage_error(resolver, tmp_path):
    missing = tmp_path / "does-not-exist.md"
    with pytest.raises(click.UsageError) as exc:
        resolver(None, None, f"@{missing}")
    assert str(missing) in str(exc.value)


def test_at_with_empty_path_raises(resolver):
    # "@" alone means try to read file with empty path — should fail clearly.
    with pytest.raises(click.UsageError):
        resolver(None, None, "@")


def test_literal_value_starting_with_hyphen(resolver):
    # Only exact "-" is stdin; "-foo" is literal.
    assert resolver(None, None, "-foo") == "-foo"


# ── Integration: helper is actually wired into commands ──────────────────────


@pytest.fixture
def _FakeAPIError():
    class APIError(Exception):
        pass
    return APIError


@pytest.fixture
def patched_for_integration(_FakeAPIError):
    """Minimal patches to invoke a command end-to-end without a real backend."""
    from click.testing import CliRunner
    runner = CliRunner(env={'CHAOTIC_PROFILE': 'default'})

    mock_client_module = MagicMock()
    mock_client_module.APIError = _FakeAPIError

    with patch.dict('sys.modules', {'cli.client': mock_client_module}), \
         patch('cli.main.get_token', return_value='fake-token'), \
         patch('cli.main.get_current_team', return_value='test-team-123'), \
         patch('cli.main.get_api_key', return_value=None), \
         patch('cli.main.get_current_project', return_value='test-project-123'):
        yield runner, mock_client_module


def test_team_create_reads_description_from_file(patched_for_integration, tmp_path):
    """The wiring works: --description @file lands as file content in the API call."""
    runner, mock_client = patched_for_integration

    desc_file = tmp_path / "desc.md"
    desc_file.write_text("Multi-line\ndescription with `backticks`.")

    from cli.main import cli, client
    client.create_team = MagicMock(return_value={"id": "t1", "name": "Squad", "key": "SQ"})

    result = runner.invoke(cli, ['team', 'create', 'Squad', 'SQ', '--description', f'@{desc_file}'])

    assert result.exit_code == 0, result.output
    # Find the description argument actually passed.
    call_kwargs = client.create_team.call_args.kwargs
    call_args = client.create_team.call_args.args
    description_passed = call_kwargs.get('description') or (call_args[2] if len(call_args) > 2 else None)
    assert description_passed == "Multi-line\ndescription with `backticks`."


def test_team_create_reads_description_from_stdin(patched_for_integration):
    """--description - reads stdin."""
    runner, mock_client = patched_for_integration

    from cli.main import cli, client
    client.create_team = MagicMock(return_value={"id": "t1", "name": "Squad", "key": "SQ"})

    result = runner.invoke(
        cli,
        ['team', 'create', 'Squad', 'SQ', '--description', '-'],
        input="content from stdin\n",
    )

    assert result.exit_code == 0, result.output
    call_kwargs = client.create_team.call_args.kwargs
    call_args = client.create_team.call_args.args
    description_passed = call_kwargs.get('description') or (call_args[2] if len(call_args) > 2 else None)
    assert description_passed == "content from stdin\n"


def test_team_create_missing_file_exits_usage_error(patched_for_integration, tmp_path):
    """Missing file should produce a clear usage error."""
    runner, _ = patched_for_integration

    missing = tmp_path / "nope.md"

    from cli.main import cli
    result = runner.invoke(cli, ['team', 'create', 'Squad', 'SQ', '--description', f'@{missing}'])

    assert result.exit_code == 2
    assert str(missing) in result.output


def test_team_create_double_at_escape(patched_for_integration):
    """--description @@literal sends literal "@literal" to the API."""
    runner, _ = patched_for_integration

    from cli.main import cli, client
    client.create_team = MagicMock(return_value={"id": "t1", "name": "Squad", "key": "SQ"})

    result = runner.invoke(cli, ['team', 'create', 'Squad', 'SQ', '--description', '@@alice'])

    assert result.exit_code == 0, result.output
    call_kwargs = client.create_team.call_args.kwargs
    call_args = client.create_team.call_args.args
    description_passed = call_kwargs.get('description') or (call_args[2] if len(call_args) > 2 else None)
    assert description_passed == "@alice"
