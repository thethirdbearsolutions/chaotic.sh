"""Tests for document CLI commands (CHT-887).

Tests cover: doc list, create, show, comment, update, delete, link, unlink, open.
"""
import json
from unittest.mock import patch, MagicMock
import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def mock_document():
    """Standard document."""
    return {
        "id": "doc-uuid-123",
        "title": "Sprint Report",
        "content": "## Summary\nGood sprint.",
        "icon": "📊",
        "project_id": "test-project-123",
        "sprint_id": None,
        "author_name": "Alice",
        "updated_at": "2026-02-15T12:00:00",
        "created_at": "2026-02-14T10:00:00",
    }


class TestDocList:
    """Tests for doc list command."""

    def test_doc_list_shows_documents(self, cli_runner, mock_document):
        """doc list displays documents in a table."""
        from cli.main import cli, client

        client.get_documents = MagicMock(return_value=[mock_document])

        result = cli_runner.invoke(cli, ['doc', 'list'])

        assert result.exit_code == 0
        assert 'Sprint Report' in result.output

    def test_doc_list_no_documents(self, cli_runner):
        """doc list with no docs shows message."""
        from cli.main import cli, client

        client.get_documents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['doc', 'list'])

        assert result.exit_code == 0
        assert 'No documents found' in result.output

    def test_doc_list_json(self, cli_runner, mock_document):
        """doc list --json outputs JSON."""
        from cli.main import cli, client

        client.get_documents = MagicMock(return_value=[mock_document])

        result = cli_runner.invoke(cli, ['doc', 'list', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert isinstance(data, list)
        assert data[0]['title'] == 'Sprint Report'

    def test_doc_list_search(self, cli_runner):
        """doc list --search passes search to API."""
        from cli.main import cli, client

        client.get_documents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['doc', 'list', '--search', 'report'])

        assert result.exit_code == 0
        client.get_documents.assert_called_once()
        call_kwargs = client.get_documents.call_args
        assert call_kwargs[1].get('search') == 'report'

    def test_doc_list_all_flag(self, cli_runner):
        """doc list --all shows all docs not just current project."""
        from cli.main import cli, client

        client.get_documents = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['doc', 'list', '--all'])

        assert result.exit_code == 0
        # With --all, project_id should be None
        call_args = client.get_documents.call_args
        # With --all, project_id kwarg should be None
        assert call_args[1].get('project_id') is None


class TestDocCreate:
    """Tests for doc create command."""

    def test_doc_create_positional_title(self, cli_runner):
        """doc create with positional title words."""
        from cli.main import cli, client

        client.create_document = MagicMock(return_value={
            "id": "new-doc-id",
            "title": "Sprint 45 Report",
        })

        result = cli_runner.invoke(cli, ['doc', 'create', 'Sprint', '45', 'Report'])

        assert result.exit_code == 0
        assert 'Sprint 45 Report' in result.output
        assert 'created' in result.output.lower()

    def test_doc_create_with_content(self, cli_runner):
        """doc create with --content."""
        from cli.main import cli, client

        client.create_document = MagicMock(return_value={
            "id": "new-doc-id",
            "title": "My Doc",
        })

        result = cli_runner.invoke(cli, [
            'doc', 'create', 'My', 'Doc', '--content', 'Some content here',
        ])

        assert result.exit_code == 0
        call_kwargs = client.create_document.call_args[1]
        assert call_kwargs.get('content') == 'Some content here'

    def test_doc_create_with_icon(self, cli_runner):
        """doc create with --icon."""
        from cli.main import cli, client

        client.create_document = MagicMock(return_value={
            "id": "new-doc-id",
            "title": "Report",
        })

        result = cli_runner.invoke(cli, [
            'doc', 'create', 'Report', '--icon', '📊',
        ])

        assert result.exit_code == 0
        call_kwargs = client.create_document.call_args[1]
        assert call_kwargs.get('icon') == '📊'

    def test_doc_create_global(self, cli_runner):
        """doc create --global creates team-wide doc."""
        from cli.main import cli, client

        client.create_document = MagicMock(return_value={
            "id": "new-doc-id",
            "title": "Global Doc",
        })

        with patch('cli.main.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['doc', 'create', 'Global', 'Doc', '--global'])

        assert result.exit_code == 0
        call_kwargs = client.create_document.call_args[1]
        assert call_kwargs.get('project_id') is None
        assert 'global' in result.output.lower()

    def test_doc_create_no_title_shows_error(self, cli_runner):
        """doc create without title shows usage error."""
        from cli.main import cli

        result = cli_runner.invoke(cli, ['doc', 'create'])

        assert result.exit_code != 0

    def test_doc_create_json(self, cli_runner):
        """doc create --json outputs JSON."""
        from cli.main import cli, client

        client.create_document = MagicMock(return_value={
            "id": "new-doc-id",
            "title": "JSON Doc",
        })

        result = cli_runner.invoke(cli, ['doc', 'create', 'JSON', 'Doc', '--json'])

        assert result.exit_code == 0
        assert 'JSON Doc' in result.output


class TestDocShow:
    """Tests for doc show command."""

    def test_doc_show_renders_panel(self, cli_runner, mock_document):
        """doc show displays document content in a panel."""
        from cli.main import cli, client

        client.get_document = MagicMock(return_value=mock_document)
        client.get_document_issues = MagicMock(return_value=[])

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'show', 'doc-uuid-123'])

        assert result.exit_code == 0
        assert 'Sprint Report' in result.output

    def test_doc_show_with_comments(self, cli_runner, mock_document):
        """doc show --comments displays comments."""
        from cli.main import cli, client

        client.get_document = MagicMock(return_value=mock_document)
        client.get_document_issues = MagicMock(return_value=[])
        client.get_document_comments = MagicMock(return_value=[
            {"author_name": "Bob", "content": "Looks good!", "created_at": "2026-02-15T14:00:00"},
        ])

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'show', 'doc-uuid-123', '--comments'])

        assert result.exit_code == 0
        assert 'Bob' in result.output
        assert 'Looks good!' in result.output

    def test_doc_show_with_linked_issues(self, cli_runner, mock_document):
        """doc show displays linked issues."""
        from cli.main import cli, client

        client.get_document = MagicMock(return_value=mock_document)
        client.get_document_issues = MagicMock(return_value=[
            {"identifier": "CHT-100", "title": "Linked issue", "status": "in_progress"},
        ])

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'show', 'doc-uuid-123'])

        assert result.exit_code == 0
        assert 'CHT-100' in result.output

    def test_doc_show_json(self, cli_runner, mock_document):
        """doc show --json outputs JSON."""
        from cli.main import cli, client

        client.get_document = MagicMock(return_value=mock_document)

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'show', 'doc-uuid-123', '--json'])

        assert result.exit_code == 0
        assert 'Sprint Report' in result.output


class TestDocComment:
    """Tests for doc comment command."""

    def test_doc_comment_adds_comment(self, cli_runner):
        """doc comment adds a comment to a document."""
        from cli.main import cli, client

        client.create_document_comment = MagicMock()

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'comment', 'doc-uuid-123', 'Great doc!'])

        assert result.exit_code == 0
        assert 'Comment added' in result.output
        client.create_document_comment.assert_called_once_with('doc-uuid-123', 'Great doc!')


class TestDocUpdate:
    """Tests for doc update command."""

    def test_doc_update_title(self, cli_runner):
        """doc update --title updates the title."""
        from cli.main import cli, client

        client.update_document = MagicMock()

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'update', 'doc-uuid-123', '--title', 'New Title'])

        assert result.exit_code == 0
        assert 'updated' in result.output.lower()
        client.update_document.assert_called_once_with('doc-uuid-123', title='New Title')

    def test_doc_update_no_options(self, cli_runner):
        """doc update with no options shows warning."""
        from cli.main import cli, client

        client.update_document = MagicMock()

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'update', 'doc-uuid-123'])

        assert result.exit_code == 0
        assert 'No updates provided' in result.output
        client.update_document.assert_not_called()

    def test_doc_update_make_global(self, cli_runner):
        """doc update --global removes project association."""
        from cli.main import cli, client

        client.update_document = MagicMock()

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'update', 'doc-uuid-123', '--global'])

        assert result.exit_code == 0
        client.update_document.assert_called_once_with('doc-uuid-123', project_id=None)

    def test_doc_update_remove_sprint(self, cli_runner):
        """doc update --no-sprint removes sprint."""
        from cli.main import cli, client

        client.update_document = MagicMock()

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'update', 'doc-uuid-123', '--no-sprint'])

        assert result.exit_code == 0
        client.update_document.assert_called_once_with('doc-uuid-123', sprint_id=None)


class TestDocDelete:
    """Tests for doc delete command."""

    def test_doc_delete_with_confirmation(self, cli_runner):
        """doc delete with yes confirmation deletes."""
        from cli.main import cli, client

        client.delete_document = MagicMock()

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'), \
             patch('cli.main.confirm_action', return_value=True):
            result = cli_runner.invoke(cli, ['doc', 'delete', 'doc-uuid-123'])

        assert result.exit_code == 0
        assert 'deleted' in result.output.lower()
        client.delete_document.assert_called_once_with('doc-uuid-123')


class TestDocLink:
    """Tests for doc link command."""

    def test_doc_link_links_to_issue(self, cli_runner):
        """doc link links a document to an issue."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123", "identifier": "CHT-100",
        })
        client.link_document_to_issue = MagicMock()

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'link', 'doc-uuid-123', 'CHT-100'])

        assert result.exit_code == 0
        assert 'linked' in result.output.lower()
        assert 'CHT-100' in result.output
        client.link_document_to_issue.assert_called_once_with('doc-uuid-123', 'issue-uuid-123')


class TestDocUnlink:
    """Tests for doc unlink command."""

    def test_doc_unlink_unlinks_from_issue(self, cli_runner):
        """doc unlink removes link between document and issue."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            "id": "issue-uuid-123", "identifier": "CHT-100",
        })
        client.unlink_document_from_issue = MagicMock()

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'):
            result = cli_runner.invoke(cli, ['doc', 'unlink', 'doc-uuid-123', 'CHT-100'])

        assert result.exit_code == 0
        assert 'unlinked' in result.output.lower()
        client.unlink_document_from_issue.assert_called_once_with('doc-uuid-123', 'issue-uuid-123')


class TestDocOpen:
    """Tests for doc open command."""

    def test_doc_open_opens_browser(self, cli_runner):
        """doc open opens URL in browser."""
        from cli.main import cli

        with patch('cli.main.resolve_document_id', return_value='doc-uuid-123'), \
             patch('cli.main.get_web_url', return_value='http://localhost:24267'), \
             patch('cli.main.webbrowser') as mock_wb:
            result = cli_runner.invoke(cli, ['doc', 'open', 'doc-uuid-123'])

        assert result.exit_code == 0
        mock_wb.open.assert_called_once()
        assert 'doc-uuid-123' in mock_wb.open.call_args[0][0]
