"""`issue list --where` (CHT-1718): the query endpoint behind the list."""
import json
from unittest.mock import MagicMock, patch

import pytest


@pytest.fixture
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


ISSUE = {
    "id": "issue-1", "identifier": "CHT-1", "title": "Some issue", "status": "todo",
    "priority": "high", "issue_type": "bug", "estimate": 3, "sprint_id": None,
    "project_id": "proj-1",
}


def _envelope(issues, total=None, where=""):
    return {
        "issues": issues, "total": len(issues) if total is None else total,
        "where": where, "order": "", "query": {}, "skip": 0, "limit": 50,
    }


def _run(cli_runner, args, envelope=None, project="proj-1"):
    from cli.main import cli, client

    client.query_issues = MagicMock(return_value=envelope or _envelope([ISSUE]))
    client.get_issues = MagicMock(return_value=[])
    client.get_sprints = MagicMock(return_value=[])
    client.get_projects = MagicMock(return_value=[{"id": "proj-1", "key": "CHT"}])
    with patch("cli.main.get_current_project", return_value=project):
        result = cli_runner.invoke(cli, ["issue", "list", *args])
    return result, client


class TestIssueListWhere:
    def test_where_runs_the_query_endpoint(self, cli_runner, mock_dependencies):
        result, client = _run(cli_runner, ["--where", "status=todo or assignee=me"])
        assert result.exit_code == 0, result.output
        client.get_issues.assert_not_called()
        kwargs = client.query_issues.call_args[1]
        assert kwargs["project_id"] == "proj-1" and kwargs["team_id"] is None
        assert kwargs["where"] == "status=todo or assignee=me"
        assert kwargs["filter_json"] is None
        assert kwargs["order"] is None  # default --sort random: the server's default order
        assert kwargs["limit"] == 50 and kwargs["skip"] is None
        assert "CHT-1" in result.output

    def test_repeated_where_clauses_are_all_required(self, cli_runner, mock_dependencies):
        result, client = _run(cli_runner, ["-w", "type=bug or priority=high", "-w", "status=todo"])
        assert result.exit_code == 0, result.output
        assert client.query_issues.call_args[1]["where"] == "(type=bug or priority=high) (status=todo)"

    def test_other_flags_are_anded_as_rows(self, cli_runner, mock_dependencies):
        from cli import main

        with patch.object(main, "resolve_assignee_id", side_effect=lambda v: f"user-{v}"):
            result, client = _run(cli_runner, [
                "-w", "type=bug", "--status", "TODO,in_progress", "--label", "a,b",
                "--exclude-label", "wip", "--exclude-assignee", "bob,unassigned",
                "--exclude-type", "epic", "--no-sprint", "--search", "login",
                "--sort", "priority", "--order", "asc",
            ])
        assert result.exit_code == 0, result.output
        kwargs = client.query_issues.call_args[1]
        assert json.loads(kwargs["filter_json"]) == {"match": "all", "rows": [
            {"field": "status", "op": "is", "values": ["todo", "in_progress"]},
            {"field": "label", "op": "all", "values": ["a", "b"]},
            {"field": "text", "op": "contains", "values": ["login"]},
            {"field": "sprint", "op": "empty", "values": []},
            {"field": "type", "op": "is_not", "values": ["epic"]},
            {"field": "assignee", "op": "is_not", "values": ["user-bob"]},
            {"field": "assignee", "op": "not_empty", "values": []},
            {"field": "label", "op": "is_not", "values": ["wip"]},
        ]}
        assert kwargs["order"] == "priority"

    def test_explicit_random_sort_is_refused(self, cli_runner, mock_dependencies):
        result, client = _run(cli_runner, ["-w", "type=bug", "--sort", "random"])
        assert result.exit_code != 0
        assert "random" in result.output
        client.query_issues.assert_not_called()

    def test_descending_sort(self, cli_runner, mock_dependencies):
        result, client = _run(cli_runner, ["-w", "type=bug", "--sort", "updated"])
        assert client.query_issues.call_args[1]["order"] == "-updated"

    def test_all_projects_is_team_scoped(self, cli_runner, mock_dependencies):
        result, client = _run(cli_runner, ["-w", "sprint=current", "--all-projects"], project=None)
        assert result.exit_code == 0, result.output
        kwargs = client.query_issues.call_args[1]
        assert kwargs["project_id"] is None and kwargs["team_id"] == "test-team-123"
        assert "Project" in result.output

    def test_sprint_with_all_projects_points_at_where(self, cli_runner, mock_dependencies):
        result, _ = _run(cli_runner, ["-w", "type=bug", "--all-projects", "--sprint", "x"], project=None)
        assert result.exit_code != 0
        assert "sprint=current" in result.output

    def test_no_project_selected(self, cli_runner, mock_dependencies):
        result, client = _run(cli_runner, ["-w", "type=bug"], project=None)
        assert result.exit_code != 0
        assert "No project selected" in result.output
        client.query_issues.assert_not_called()

    def test_json_output_is_the_issue_list(self, cli_runner, mock_dependencies):
        result, _ = _run(cli_runner, ["-w", "type=bug", "--json"])
        assert result.exit_code == 0, result.output
        assert json.loads(result.output) == [ISSUE]

    def test_pagination_hint_uses_the_total(self, cli_runner, mock_dependencies):
        result, _ = _run(cli_runner, ["-w", "type=bug", "--limit", "1"], _envelope([ISSUE], total=9))
        assert "Showing 1 of 9 issues" in result.output
        assert "--skip 1" in result.output
        result, _ = _run(cli_runner, ["-w", "type=bug", "--limit", "1"], _envelope([ISSUE], total=1))
        assert "Showing" not in result.output

    def test_no_matches(self, cli_runner, mock_dependencies):
        result, _ = _run(cli_runner, ["-w", "type=bug"], _envelope([]))
        assert result.exit_code == 0
        assert "No issues found" in result.output

    def test_server_error_is_shown(self, cli_runner, mock_dependencies):
        from cli.main import cli, client, APIError

        client.query_issues = MagicMock(side_effect=APIError("unknown field 'bogus'"))
        with patch("cli.main.get_current_project", return_value="proj-1"):
            result = cli_runner.invoke(cli, ["issue", "list", "-w", "bogus=1"])
        assert result.exit_code != 0
        assert "unknown field 'bogus'" in result.output

    def test_help_documents_the_syntax(self, cli_runner):
        from cli.main import cli

        result = cli_runner.invoke(cli, ["issue", "list", "--help"])
        assert result.exit_code == 0
        for text in ("--where", "status=todo,in_progress", "estimate=3..8", "docs/issue-query.md"):
            assert text in result.output
