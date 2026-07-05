"""Tests for `issue list --all-projects` (CHT-1179)."""
import json

import pytest
from unittest.mock import MagicMock, patch


@pytest.fixture
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


@pytest.fixture
def team_projects():
    return [
        {"id": "proj-cht", "key": "CHT", "name": "Chaotic"},
        {"id": "proj-wr", "key": "WR", "name": "Wrangler"},
    ]


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
            "project_id": "proj-cht",
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
            "project_id": "proj-wr",
        },
    ]


def _mock_table_deps(client, team_projects, sprints=None):
    """Mocks for the table-rendering path of --all-projects."""
    client.get_projects = MagicMock(return_value=team_projects)
    client.get_sprints = MagicMock(return_value=sprints or [])


class TestIssueListAllProjects:
    def test_all_projects_passes_team_id_not_project_id(self, cli_runner, cross_project_issues, team_projects, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)
        _mock_table_deps(client, team_projects)

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

    def test_all_projects_works_without_current_project(self, cli_runner, cross_project_issues, team_projects, patched_client, patched_auth):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)
        _mock_table_deps(client, team_projects)

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

    def test_output_includes_project_column(self, cli_runner, cross_project_issues, team_projects, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)
        _mock_table_deps(client, team_projects)

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects"])

        assert result.exit_code == 0
        assert "Project" in result.output
        assert "CHT" in result.output
        assert "WR" in result.output

    def test_project_column_maps_project_id_not_identifier_prefix(self, cli_runner, team_projects, mock_dependencies):
        from cli.main import cli, client

        # Legacy identifier whose prefix disagrees with the authoritative project
        issues = [
            {
                "id": "issue-1",
                "identifier": "OLD-9",
                "title": "Renamed-key issue",
                "status": "todo",
                "priority": "low",
                "issue_type": "task",
                "estimate": None,
                "sprint_id": None,
                "project_id": "proj-wr",
            },
        ]
        client.get_issues = MagicMock(return_value=issues)
        _mock_table_deps(client, team_projects)

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects"])

        assert result.exit_code == 0
        assert "WR" in result.output
        client.get_projects.assert_called_once_with("test-team-123")

    def test_project_column_falls_back_to_dash_for_unknown_project(self, cli_runner, team_projects, mock_dependencies):
        from cli.main import cli, client

        issues = [
            {
                "id": "issue-1",
                "identifier": "X-1",
                "title": "Orphan",
                "status": "todo",
                "priority": "low",
                "issue_type": "task",
                "estimate": None,
                "sprint_id": None,
                "project_id": "proj-gone",
            },
        ]
        client.get_issues = MagicMock(return_value=issues)
        _mock_table_deps(client, team_projects)

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects"])

        assert result.exit_code == 0
        assert "X-1" in result.output

    def test_default_output_has_no_project_column(self, cli_runner, cross_project_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)
        client.get_sprints = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ["issue", "list"])

        assert result.exit_code == 0
        assert "Project" not in result.output

    def test_all_projects_table_title(self, cli_runner, cross_project_issues, team_projects, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)
        _mock_table_deps(client, team_projects)

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects"])

        assert result.exit_code == 0
        assert "all projects" in result.output

    def test_all_projects_combines_with_filters(self, cli_runner, cross_project_issues, team_projects, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)
        _mock_table_deps(client, team_projects)

        result = cli_runner.invoke(
            cli,
            ["issue", "list", "--all-projects", "--status", "backlog", "--priority", "urgent"],
        )

        assert result.exit_code == 0
        kwargs = client.get_issues.call_args[1]
        assert kwargs["status"] == "backlog"
        assert kwargs["priority"] == "urgent"
        assert kwargs["team_id"] == "test-team-123"

    def test_all_projects_with_exclude_filters(self, cli_runner, cross_project_issues, team_projects, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)
        _mock_table_deps(client, team_projects)

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

    def test_no_sprint_with_all_projects_allowed(self, cli_runner, cross_project_issues, team_projects, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)
        _mock_table_deps(client, team_projects)

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects", "--no-sprint"])

        assert result.exit_code == 0
        assert client.get_issues.call_args[1]["sprint_id"] == "no_sprint"

    def test_all_projects_resolves_sprints_per_project_not_per_issue(self, cli_runner, team_projects, mock_dependencies):
        from cli.main import cli, client

        # Two sprinted issues in the same project: one sprints fetch, zero get_sprint calls
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
                "project_id": "proj-cht",
            },
            {
                "id": "issue-2",
                "identifier": "CHT-2",
                "title": "Also sprinted",
                "status": "todo",
                "priority": "low",
                "issue_type": "task",
                "estimate": None,
                "sprint_id": "spr-2",
                "project_id": "proj-cht",
            },
        ]
        client.get_issues = MagicMock(return_value=issues)
        client.get_projects = MagicMock(return_value=team_projects)
        client.get_sprints = MagicMock(return_value=[
            {"id": "spr-1", "name": "Alpha"},
            {"id": "spr-2", "name": "Beta"},
        ])
        client.get_sprint = MagicMock()

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects"])

        assert result.exit_code == 0
        client.get_sprints.assert_called_once_with("proj-cht")
        client.get_sprint.assert_not_called()
        assert "Alpha" in result.output
        assert "Beta" in result.output

    def test_all_projects_skips_sprint_fetch_when_no_sprinted_issues(self, cli_runner, cross_project_issues, team_projects, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=cross_project_issues)
        _mock_table_deps(client, team_projects)

        result = cli_runner.invoke(cli, ["issue", "list", "--all-projects"])

        assert result.exit_code == 0
        client.get_sprints.assert_not_called()
        client.get_projects.assert_called_once_with("test-team-123")

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
