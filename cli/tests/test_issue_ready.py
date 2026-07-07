"""Tests for `chaotic issue ready` (CHT-1245)."""
from unittest.mock import MagicMock, patch

import pytest


@pytest.fixture
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


@pytest.fixture
def ready_issues():
    return [
        {
            "id": "issue-1",
            "identifier": "CHT-1",
            "title": "Urgent ready issue",
            "status": "todo",
            "priority": "urgent",
            "issue_type": "task",
            "estimate": None,
            "assignee_id": None,
            "project_id": "test-project-123",
        },
        {
            "id": "issue-2",
            "identifier": "CHT-2",
            "title": "Low priority ready issue",
            "status": "backlog",
            "priority": "low",
            "issue_type": "bug",
            "estimate": 2,
            "assignee_id": None,
            "project_id": "test-project-123",
        },
    ]


class TestIssueReadyScope:
    def test_default_scopes_to_current_project(self, cli_runner, ready_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_ready_issues = MagicMock(return_value=ready_issues)

        result = cli_runner.invoke(cli, ["issue", "ready"])

        assert result.exit_code == 0, result.output
        kwargs = client.get_ready_issues.call_args[1]
        assert kwargs["project_id"] == "test-project-123"
        assert kwargs.get("team_id") is None

    def test_all_projects_scopes_to_team(self, cli_runner, ready_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_ready_issues = MagicMock(return_value=ready_issues)

        result = cli_runner.invoke(cli, ["issue", "ready", "--all-projects"])

        assert result.exit_code == 0, result.output
        kwargs = client.get_ready_issues.call_args[1]
        assert kwargs["team_id"] == "test-team-123"
        assert kwargs.get("project_id") is None

    def test_without_project_and_without_all_projects_fails(self, cli_runner, patched_client, patched_auth):
        from cli.main import cli, client

        client.get_ready_issues = MagicMock(return_value=[])

        with patch("cli.main.get_current_project", return_value=None):
            result = cli_runner.invoke(cli, ["issue", "ready"])

        assert result.exit_code == 1
        assert "No project selected" in result.output
        client.get_ready_issues.assert_not_called()

    def test_all_projects_works_without_current_project(self, cli_runner, ready_issues, patched_client, patched_auth):
        from cli.main import cli, client

        client.get_ready_issues = MagicMock(return_value=ready_issues)

        with patch("cli.main.get_current_project", return_value=None):
            result = cli_runner.invoke(cli, ["issue", "ready", "--all-projects"])

        assert result.exit_code == 0, result.output
        assert client.get_ready_issues.call_args[1]["team_id"] == "test-team-123"


class TestIssueReadyFlags:
    def test_mine_passes_mine_true(self, cli_runner, ready_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_ready_issues = MagicMock(return_value=ready_issues)

        result = cli_runner.invoke(cli, ["issue", "ready", "--mine"])

        assert result.exit_code == 0, result.output
        kwargs = client.get_ready_issues.call_args[1]
        assert kwargs["mine"] is True
        assert kwargs["include_assigned"] is False

    def test_include_assigned_passes_flag(self, cli_runner, ready_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_ready_issues = MagicMock(return_value=ready_issues)

        result = cli_runner.invoke(cli, ["issue", "ready", "--include-assigned"])

        assert result.exit_code == 0, result.output
        kwargs = client.get_ready_issues.call_args[1]
        assert kwargs["include_assigned"] is True
        assert kwargs["mine"] is False

    def test_mine_and_include_assigned_are_mutually_exclusive(self, cli_runner, mock_dependencies):
        from cli.main import cli, client

        client.get_ready_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ["issue", "ready", "--mine", "--include-assigned"])

        assert result.exit_code == 2
        assert "Cannot use both" in result.output
        client.get_ready_issues.assert_not_called()

    def test_limit_passed_through(self, cli_runner, ready_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_ready_issues = MagicMock(return_value=ready_issues)

        result = cli_runner.invoke(cli, ["issue", "ready", "--limit", "5"])

        assert result.exit_code == 0, result.output
        assert client.get_ready_issues.call_args[1]["limit"] == 5

    def test_default_limit_is_20(self, cli_runner, ready_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_ready_issues = MagicMock(return_value=ready_issues)

        result = cli_runner.invoke(cli, ["issue", "ready"])

        assert result.exit_code == 0, result.output
        assert client.get_ready_issues.call_args[1]["limit"] == 20


class TestIssueReadyOutput:
    def test_empty_result_prints_friendly_message(self, cli_runner, mock_dependencies):
        from cli.main import cli, client

        client.get_ready_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ["issue", "ready"])

        assert result.exit_code == 0, result.output
        assert "No ready issues" in result.output

    def test_table_shows_priority_sorted_issues(self, cli_runner, ready_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_ready_issues = MagicMock(return_value=ready_issues)

        result = cli_runner.invoke(cli, ["issue", "ready"])

        assert result.exit_code == 0, result.output
        assert "CHT-1" in result.output
        assert "CHT-2" in result.output
        assert "Urgent" in result.output

    def test_json_output_emits_raw_list(self, cli_runner, ready_issues, mock_dependencies):
        import json
        from cli.main import cli, client

        client.get_ready_issues = MagicMock(return_value=ready_issues)

        result = cli_runner.invoke(cli, ["issue", "ready", "--json"])

        assert result.exit_code == 0, result.output
        payload = json.loads(result.output)
        assert payload == ready_issues

    def test_all_projects_table_includes_project_column(self, cli_runner, ready_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_ready_issues = MagicMock(return_value=ready_issues)
        client.get_projects = MagicMock(return_value=[{"id": "test-project-123", "key": "CHT", "name": "Chaotic"}])

        result = cli_runner.invoke(cli, ["issue", "ready", "--all-projects"])

        assert result.exit_code == 0, result.output
        assert "Project" in result.output
        assert "CHT" in result.output
