"""Tests for `issue list --all-projects` (CHT-1179)."""
import json

import pytest
from unittest.mock import MagicMock, patch


@pytest.fixture
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


@pytest.fixture
def cross_project_issues():
    return [
        {
            "id": "issue-1",
            "identifier": "CHT-1",
            "title": "Chaotic issue",
            "status": "backlog",
            "priority": "urgent",
            "issue_type": "task",
            "estimate": None,
            "sprint_id": None,
        },
        {
            "id": "issue-2",
            "identifier": "WR-7",
            "title": "Other-project issue",
            "status": "todo",
            "priority": "high",
            "issue_type": "bug",
            "estimate": 2,
            "sprint_id": None,
        },
    ]


class TestIssueListAllProjects:
    def test_all_projects_passes_team_id_not_project_id(self, cli_runner, cross_project_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects"])

        assert result.exit_code == 0
        kwargs = client.get_issues.call_args[1]
        assert kwargs["team_id"] == "test-team-123"
        assert kwargs["project_id"] is None

    def test_default_still_scopes_to_current_project(self, cli_runner, cross_project_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)
        client.get_sprints = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ["issue", "list"])

        assert result.exit_code == 0
        kwargs = client.get_issues.call_args[1]
        assert kwargs["project_id"] == "test-project-123"
        assert kwargs["team_id"] is None

    def test_all_projects_works_without_current_project(self, cli_runner, cross_project_issues, patched_client, patched_auth):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)

        with patch("cli.main.get_current_project", return_value=None):
            result = cli_runner.invoke(cli, ["issue", "list", "--all-projects"])

        assert result.exit_code == 0
        assert client.get_issues.call_args[1]["team_id"] == "test-team-123"

    def test_without_flag_and_without_project_fails(self, cli_runner, patched_client, patched_auth):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        with patch("cli.main.get_current_project", return_value=None):
            result = cli_runner.invoke(cli, ["issue", "list"])

        assert result.exit_code == 1
        assert "No project selected" in result.output
        client.get_issues.assert_not_called()

    def test_output_includes_project_column(self, cli_runner, cross_project_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects"])

        assert result.exit_code == 0
        assert "Project" in result.output
        assert "CHT" in result.output
        assert "WR" in result.output

    def test_default_output_has_no_project_column(self, cli_runner, cross_project_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)
        client.get_sprints = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ["issue", "list"])

        assert result.exit_code == 0
        assert "Project" not in result.output

    def test_all_projects_table_title(self, cli_runner, cross_project_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects"])

        assert result.exit_code == 0
        assert "all projects" in result.output

    def test_all_projects_combines_with_filters(self, cli_runner, cross_project_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)

        result = cli_runner.invoke(
            cli,
            ["issue", "list", "--all-projects", "--status", "backlog", "--priority", "urgent"],
        )

        assert result.exit_code == 0
        kwargs = client.get_issues.call_args[1]
        assert kwargs["status"] == "backlog"
        assert kwargs["priority"] == "urgent"
        assert kwargs["team_id"] == "test-team-123"

    def test_all_projects_with_exclude_filters(self, cli_runner, cross_project_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)

        result = cli_runner.invoke(
            cli,
            ["issue", "list", "--all-projects", "--exclude-status", "done,canceled"],
        )

        assert result.exit_code == 0
        kwargs = client.get_issues.call_args[1]
        assert kwargs["exclude_status"] == "done,canceled"

    def test_sprint_with_all_projects_is_rejected(self, cli_runner, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects", "--sprint", "current"])

        assert result.exit_code != 0
        assert "Cannot use --sprint with --all-projects" in result.output
        client.get_issues.assert_not_called()

    def test_no_sprint_with_all_projects_allowed(self, cli_runner, cross_project_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects", "--no-sprint"])

        assert result.exit_code == 0
        assert client.get_issues.call_args[1]["sprint_id"] == "no_sprint"

    def test_all_projects_resolves_sprint_names_per_issue(self, cli_runner, mock_dependencies):
        from cli.main import cli, client

        issues = [
            {
                "id": "issue-1",
                "identifier": "CHT-1",
                "title": "Sprinted issue",
                "status": "todo",
                "priority": "high",
                "issue_type": "task",
                "estimate": None,
                "sprint_id": "spr-1",
            },
        ]
        client.get_issues = MagicMock(return_value=issues)
        client.get_sprint = MagicMock(return_value={"id": "spr-1", "name": "Alpha"})

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects"])

        assert result.exit_code == 0
        client.get_sprint.assert_called_once_with("spr-1")
        assert "Alpha" in result.output

    def test_all_projects_json_output(self, cli_runner, cross_project_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects", "--json"])

        assert result.exit_code == 0
        payload = json.loads(result.output)
        assert [i["identifier"] for i in payload] == ["CHT-1", "WR-7"]

    def test_all_projects_empty_result(self, cli_runner, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects"])

        assert result.exit_code == 0
        assert "No issues found" in result.output
