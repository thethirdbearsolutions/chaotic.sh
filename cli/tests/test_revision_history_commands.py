"""Tests for revision-history CLI commands (CHT-1243).

Covers: issue history, doc history — list table, --version snapshot,
--json output, and empty-history messaging.
"""
import json
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def mock_issue():
    return {
        "id": "issue-uuid-1",
        "identifier": "CHT-1",
        "title": "Test Issue",
        "status": "backlog",
        "priority": "medium",
        "issue_type": "task",
    }


@pytest.fixture
def issue_revisions():
    return [
        {
            "id": "rev-2", "issue_id": "issue-uuid-1", "version": 2,
            "author_id": "u-2", "author_name": "Bob",
            "created_at": "2026-07-06T12:00:00",
        },
        {
            "id": "rev-1", "issue_id": "issue-uuid-1", "version": 1,
            "author_id": "u-1", "author_name": "Alice",
            "created_at": "2026-07-05T09:00:00",
        },
    ]


@pytest.fixture
def doc_revisions():
    return [
        {
            "id": "rev-2", "document_id": "doc-uuid-123", "version": 2,
            "title": "Sprint Report v2", "author_id": "u-2", "author_name": "Bob",
            "created_at": "2026-07-06T12:00:00",
        },
        {
            "id": "rev-1", "document_id": "doc-uuid-123", "version": 1,
            "title": "Sprint Report", "author_id": "u-1", "author_name": "Alice",
            "created_at": "2026-07-05T09:00:00",
        },
    ]


class TestIssueHistory:
    """Tests for issue history command."""

    def test_lists_revisions_in_table(self, cli_runner, mock_issue, issue_revisions):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_issue_description_revisions = MagicMock(return_value=issue_revisions)

        result = cli_runner.invoke(cli, ['issue', 'history', 'CHT-1'])

        assert result.exit_code == 0
        assert 'v2' in result.output
        assert 'v1' in result.output
        assert 'Bob' in result.output
        assert 'Alice' in result.output
        client.get_issue_description_revisions.assert_called_once_with('issue-uuid-1')

    def test_no_revisions_message(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_issue_description_revisions = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'history', 'CHT-1'])

        assert result.exit_code == 0
        assert 'No description revisions' in result.output

    def test_version_shows_snapshot(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_issue_description_revision = MagicMock(return_value={
            "id": "rev-1", "issue_id": "issue-uuid-1", "version": 1,
            "description": "The original body",
            "author_name": "Alice", "created_at": "2026-07-05T09:00:00",
        })

        result = cli_runner.invoke(cli, ['issue', 'history', 'CHT-1', '--version', '1'])

        assert result.exit_code == 0
        assert 'The original body' in result.output
        assert 'Alice' in result.output
        client.get_issue_description_revision.assert_called_once_with('issue-uuid-1', 1)

    def test_version_with_empty_description(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_issue_description_revision = MagicMock(return_value={
            "id": "rev-1", "issue_id": "issue-uuid-1", "version": 1,
            "description": None,
            "author_name": "Alice", "created_at": "2026-07-05T09:00:00",
        })

        result = cli_runner.invoke(cli, ['issue', 'history', 'CHT-1', '--version', '1'])

        assert result.exit_code == 0
        assert '(empty)' in result.output

    def test_list_json(self, cli_runner, mock_issue, issue_revisions):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_issue_description_revisions = MagicMock(return_value=issue_revisions)

        result = cli_runner.invoke(cli, ['issue', 'history', 'CHT-1', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.stdout)
        assert isinstance(data, list)
        assert [r['version'] for r in data] == [2, 1]

    def test_list_json_empty(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_issue_description_revisions = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['issue', 'history', 'CHT-1', '--json'])

        assert result.exit_code == 0
        assert json.loads(result.stdout) == []

    def test_version_json(self, cli_runner, mock_issue):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value=mock_issue)
        client.get_issue_description_revision = MagicMock(return_value={
            "id": "rev-1", "issue_id": "issue-uuid-1", "version": 1,
            "description": "The original body",
            "author_name": "Alice", "created_at": "2026-07-05T09:00:00",
        })

        result = cli_runner.invoke(cli, ['issue', 'history', 'CHT-1', '--version', '1', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.stdout)
        assert data['version'] == 1
        assert data['description'] == 'The original body'


class TestDocHistory:
    """Tests for doc history command."""

    def test_lists_revisions_in_table(self, cli_runner, doc_revisions):
        from cli.main import cli, client

        client.get_document_revisions = MagicMock(return_value=doc_revisions)

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'history', 'doc-uuid-123'])

        assert result.exit_code == 0
        assert 'v2' in result.output
        assert 'v1' in result.output
        assert 'Sprint Report v2' in result.output
        assert 'Alice' in result.output
        client.get_document_revisions.assert_called_once_with('doc-uuid-123')

    def test_no_revisions_message(self, cli_runner):
        from cli.main import cli, client

        client.get_document_revisions = MagicMock(return_value=[])

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'history', 'doc-uuid-123'])

        assert result.exit_code == 0
        assert 'No revisions' in result.output

    def test_version_shows_snapshot(self, cli_runner):
        from cli.main import cli, client

        client.get_document_revision = MagicMock(return_value={
            "id": "rev-1", "document_id": "doc-uuid-123", "version": 1,
            "title": "Sprint Report", "content": "## Original\nGood sprint.",
            "author_name": "Alice", "created_at": "2026-07-05T09:00:00",
        })

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'history', 'doc-uuid-123', '--version', '1'])

        assert result.exit_code == 0
        assert 'Original' in result.output
        assert 'Sprint Report' in result.output
        client.get_document_revision.assert_called_once_with('doc-uuid-123', 1)

    def test_list_json(self, cli_runner, doc_revisions):
        from cli.main import cli, client

        client.get_document_revisions = MagicMock(return_value=doc_revisions)

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'history', 'doc-uuid-123', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.stdout)
        assert [r['version'] for r in data] == [2, 1]

    def test_version_json(self, cli_runner):
        from cli.main import cli, client

        client.get_document_revision = MagicMock(return_value={
            "id": "rev-1", "document_id": "doc-uuid-123", "version": 1,
            "title": "Sprint Report", "content": "## Original",
            "author_name": "Alice", "created_at": "2026-07-05T09:00:00",
        })

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'history', 'doc-uuid-123', '--version', '1', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.stdout)
        assert data['version'] == 1
        assert data['title'] == 'Sprint Report'
