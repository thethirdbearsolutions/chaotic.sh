"""Tests for --json support on all data-returning CLI commands (CHT-849).

Verifies that every command with @json_option properly outputs valid JSON
when invoked with --json.
"""
import json
from unittest.mock import patch, MagicMock

import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


SAMPLE_ISSUE = {
    "id": "i-1", "identifier": "CHT-1", "title": "Test Issue",
    "status": "backlog", "priority": "medium", "issue_type": "task",
    "estimate": 3, "sprint_id": None, "project_key": "CHT",
}
SAMPLE_USER = {"id": "u-1", "name": "Test User", "email": "test@test.com"}
SAMPLE_TEAM = {"id": "t-1", "key": "TST", "name": "Test Team", "description": ""}
SAMPLE_PROJECT = {"id": "p-1", "key": "CHT", "name": "Chaotic", "issue_count": 42}
SAMPLE_SPRINT = {"id": "s-1", "name": "Sprint 1", "status": "active", "budget": 20, "points_spent": 5}
SAMPLE_DOC = {"id": "d-1", "title": "Test Doc", "content": "Hello", "updated_at": "2026-01-01T00:00:00"}
SAMPLE_LABEL = {"id": "l-1", "name": "bug", "color": "#ff0000"}
SAMPLE_AGENT = {"id": "a-1", "name": "claude-bot", "agent_project_id": None, "created_at": "2026-01-01T00:00:00"}
SAMPLE_MEMBER = {"user_name": "Test", "user_email": "t@t.com", "role": "member"}
SAMPLE_API_KEY = {"id": "k-1", "name": "test-key", "key_prefix": "ck_", "created_at": "2026-01-01", "last_used_at": "", "is_active": True, "expires_at": ""}


def _parse_json(output):
    """Parse JSON from CLI output, stripping any trailing whitespace."""
    return json.loads(output.strip())


class TestMeJson:
    def test_me_json(self, cli_runner):
        from cli.main import cli, client
        client.get_me = MagicMock(return_value=SAMPLE_USER)
        result = cli_runner.invoke(cli, ['me', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data['name'] == 'Test User'

    def test_whoami_json(self, cli_runner):
        from cli.main import cli, client
        client.get_me = MagicMock(return_value=SAMPLE_USER)
        result = cli_runner.invoke(cli, ['auth', 'whoami', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data['email'] == 'test@test.com'


class TestAuthKeysJson:
    def test_auth_keys_list_json(self, cli_runner):
        from cli.main import cli, client
        client.list_api_keys = MagicMock(return_value=[SAMPLE_API_KEY])
        result = cli_runner.invoke(cli, ['auth', 'keys', 'list', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert isinstance(data, list)
        assert data[0]['name'] == 'test-key'

    def test_auth_keys_list_empty_json(self, cli_runner):
        from cli.main import cli, client
        client.list_api_keys = MagicMock(return_value=[])
        result = cli_runner.invoke(cli, ['auth', 'keys', 'list', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data == []


class TestTeamJson:
    def test_team_list_json(self, cli_runner):
        from cli.main import cli, client
        client.get_teams = MagicMock(return_value=[SAMPLE_TEAM])
        result = cli_runner.invoke(cli, ['team', 'list', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert isinstance(data, list)
        assert data[0]['key'] == 'TST'

    def test_team_show_json(self, cli_runner):
        from cli.main import cli, client
        client.get_team = MagicMock(return_value=SAMPLE_TEAM)
        result = cli_runner.invoke(cli, ['team', 'show', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data['name'] == 'Test Team'

    def test_team_members_json(self, cli_runner):
        from cli.main import cli, client
        client.get_team_members = MagicMock(return_value=[SAMPLE_MEMBER])
        result = cli_runner.invoke(cli, ['team', 'members', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert isinstance(data, list)
        assert data[0]['user_name'] == 'Test'

    def test_team_create_json(self, cli_runner):
        from cli.main import cli, client
        client.create_team = MagicMock(return_value=SAMPLE_TEAM)
        with patch('cli.main.set_current_team'):
            result = cli_runner.invoke(cli, ['team', 'create', 'Test Team', 'TST', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data['key'] == 'TST'


class TestProjectJson:
    def test_project_create_json(self, cli_runner):
        from cli.main import cli, client
        client.create_project = MagicMock(return_value=SAMPLE_PROJECT)
        with patch('cli.main.set_current_project'):
            result = cli_runner.invoke(cli, ['project', 'create', 'Chaotic', 'CHT', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data['key'] == 'CHT'


class TestIssueJson:
    def test_issue_mine_json(self, cli_runner):
        from cli.main import cli, client
        client.get_me = MagicMock(return_value=SAMPLE_USER)
        client.get_issues = MagicMock(return_value=[SAMPLE_ISSUE])
        result = cli_runner.invoke(cli, ['issue', 'mine', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert isinstance(data, list)
        assert data[0]['identifier'] == 'CHT-1'

    def test_issue_mine_empty_json(self, cli_runner):
        from cli.main import cli, client
        client.get_me = MagicMock(return_value=SAMPLE_USER)
        client.get_issues = MagicMock(return_value=[])
        result = cli_runner.invoke(cli, ['issue', 'mine', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data == []

    def test_issue_search_json(self, cli_runner):
        from cli.main import cli, client
        client.search_issues = MagicMock(return_value=[SAMPLE_ISSUE])
        result = cli_runner.invoke(cli, ['issue', 'search', 'test', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert isinstance(data, list)
        assert data[0]['title'] == 'Test Issue'

    def test_issue_search_empty_json(self, cli_runner):
        from cli.main import cli, client
        client.search_issues = MagicMock(return_value=[])
        result = cli_runner.invoke(cli, ['issue', 'search', 'nothing', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data == []

    def test_issue_create_json(self, cli_runner):
        from cli.main import cli, client
        client.create_issue = MagicMock(return_value=SAMPLE_ISSUE)
        result = cli_runner.invoke(cli, ['issue', 'create', 'Test Issue', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data['identifier'] == 'CHT-1'

    def test_issue_update_json(self, cli_runner):
        from cli.main import cli, client
        client.get_issue_by_identifier = MagicMock(return_value=SAMPLE_ISSUE)
        client.update_issue = MagicMock(return_value=SAMPLE_ISSUE)
        result = cli_runner.invoke(cli, ['issue', 'update', 'CHT-1', '--title', 'Updated', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data['identifier'] == 'CHT-1'

    def test_issue_sub_issues_json(self, cli_runner):
        from cli.main import cli, client
        client.get_issue_by_identifier = MagicMock(return_value=SAMPLE_ISSUE)
        client.get_sub_issues = MagicMock(return_value=[SAMPLE_ISSUE])
        result = cli_runner.invoke(cli, ['issue', 'sub-issues', 'CHT-1', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert isinstance(data, list)

    def test_issue_sub_issues_empty_json(self, cli_runner):
        from cli.main import cli, client
        client.get_issue_by_identifier = MagicMock(return_value=SAMPLE_ISSUE)
        client.get_sub_issues = MagicMock(return_value=[])
        result = cli_runner.invoke(cli, ['issue', 'sub-issues', 'CHT-1', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data == []

    def test_issue_relations_json(self, cli_runner):
        from cli.main import cli, client
        client.get_issue_by_identifier = MagicMock(return_value=SAMPLE_ISSUE)
        relation = {"id": "r-1", "relation_type": "blocks", "related_issue": {"identifier": "CHT-2"}, "direction": "outgoing"}
        client.get_relations = MagicMock(return_value=[relation])
        result = cli_runner.invoke(cli, ['issue', 'relations', 'CHT-1', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert isinstance(data, list)
        assert data[0]['relation_type'] == 'blocks'


class TestSprintJson:
    def test_sprint_current_json(self, cli_runner):
        from cli.main import cli, client
        client.get_current_sprint = MagicMock(return_value=SAMPLE_SPRINT)
        result = cli_runner.invoke(cli, ['sprint', 'current', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data['name'] == 'Sprint 1'

    def test_sprint_budget_json(self, cli_runner):
        from cli.main import cli, client
        client.get_current_sprint = MagicMock(return_value=SAMPLE_SPRINT)
        result = cli_runner.invoke(cli, ['sprint', 'budget', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data['budget'] == 20
        assert data['points_spent'] == 5


class TestDocJson:
    def test_doc_list_json(self, cli_runner):
        from cli.main import cli, client
        client.get_documents = MagicMock(return_value=[SAMPLE_DOC])
        result = cli_runner.invoke(cli, ['doc', 'list', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert isinstance(data, list)
        assert data[0]['title'] == 'Test Doc'

    def test_doc_list_empty_json(self, cli_runner):
        from cli.main import cli, client
        client.get_documents = MagicMock(return_value=[])
        result = cli_runner.invoke(cli, ['doc', 'list', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data == []

    def test_doc_create_json(self, cli_runner):
        from cli.main import cli, client
        client.create_document = MagicMock(return_value=SAMPLE_DOC)
        result = cli_runner.invoke(cli, ['doc', 'create', 'Test Doc', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data['title'] == 'Test Doc'

    def test_doc_show_json(self, cli_runner):
        from cli.main import cli, client
        client.get_documents = MagicMock(return_value=[SAMPLE_DOC])
        client.get_document = MagicMock(return_value=SAMPLE_DOC)
        client.get_document_issues = MagicMock(return_value=[])
        client.get_document_comments = MagicMock(return_value=[])
        result = cli_runner.invoke(cli, ['doc', 'show', 'd-1', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data['title'] == 'Test Doc'
        assert 'linked_issues' in data

    def test_doc_show_with_comments_json(self, cli_runner):
        from cli.main import cli, client
        comment = {"id": "c-1", "content": "Nice doc", "author_name": "User", "created_at": "2026-01-01"}
        client.get_documents = MagicMock(return_value=[SAMPLE_DOC])
        client.get_document = MagicMock(return_value=SAMPLE_DOC)
        client.get_document_issues = MagicMock(return_value=[])
        client.get_document_comments = MagicMock(return_value=[comment])
        result = cli_runner.invoke(cli, ['doc', 'show', 'd-1', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert len(data['comments']) == 1


class TestLabelJson:
    def test_label_list_json(self, cli_runner):
        from cli.main import cli, client
        client.get_labels = MagicMock(return_value=[SAMPLE_LABEL])
        result = cli_runner.invoke(cli, ['label', 'list', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert isinstance(data, list)
        assert data[0]['name'] == 'bug'

    def test_label_list_empty_json(self, cli_runner):
        from cli.main import cli, client
        client.get_labels = MagicMock(return_value=[])
        result = cli_runner.invoke(cli, ['label', 'list', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data == []


class TestAgentJson:
    def test_agent_list_json(self, cli_runner):
        from cli.main import cli, client
        client.get_team_agents = MagicMock(return_value=[SAMPLE_AGENT])
        result = cli_runner.invoke(cli, ['agent', 'list', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert isinstance(data, list)
        assert data[0]['name'] == 'claude-bot'

    def test_agent_list_empty_json(self, cli_runner):
        from cli.main import cli, client
        client.get_team_agents = MagicMock(return_value=[])
        result = cli_runner.invoke(cli, ['agent', 'list', '--json'])
        assert result.exit_code == 0
        data = _parse_json(result.output)
        assert data == []
