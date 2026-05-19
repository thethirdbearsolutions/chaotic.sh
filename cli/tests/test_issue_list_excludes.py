"""Tests for `issue list` exclude filters."""
import pytest
from unittest.mock import MagicMock, patch


@pytest.fixture
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


@pytest.fixture
def sample_issues():
    return [
        {
            "id": "issue-1",
            "identifier": "CHT-1",
            "title": "Some issue",
            "status": "backlog",
            "priority": "high",
            "issue_type": "task",
            "estimate": None,
            "sprint_id": None,
        }
    ]


class TestIssueListExcludeFilters:
    def test_exclude_label_passed_through(self, cli_runner, sample_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=sample_issues)
        client.get_sprints = MagicMock(return_value=[])

        with patch("cli.main.get_current_project", return_value="proj-1"):
            result = cli_runner.invoke(
                cli, ["issue", "list", "--exclude-label", "bug"]
            )

        assert result.exit_code == 0
        assert client.get_issues.call_args[1]["exclude_label"] == "bug"

    def test_exclude_status_and_priority(self, cli_runner, sample_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=sample_issues)
        client.get_sprints = MagicMock(return_value=[])

        with patch("cli.main.get_current_project", return_value="proj-1"):
            result = cli_runner.invoke(
                cli,
                [
                    "issue",
                    "list",
                    "--exclude-status",
                    "done,canceled",
                    "--exclude-priority",
                    "low",
                ],
            )

        assert result.exit_code == 0
        kwargs = client.get_issues.call_args[1]
        assert kwargs["exclude_status"] == "done,canceled"
        assert kwargs["exclude_priority"] == "low"

    def test_exclude_status_validates(self, cli_runner, sample_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=sample_issues)
        client.get_sprints = MagicMock(return_value=[])

        with patch("cli.main.get_current_project", return_value="proj-1"):
            result = cli_runner.invoke(
                cli, ["issue", "list", "--exclude-status", "bogus"]
            )

        assert result.exit_code != 0
        assert "Invalid status" in result.output

    def test_exclude_priority_validates(self, cli_runner, sample_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=sample_issues)
        client.get_sprints = MagicMock(return_value=[])

        with patch("cli.main.get_current_project", return_value="proj-1"):
            result = cli_runner.invoke(
                cli, ["issue", "list", "--exclude-priority", "bogus"]
            )

        assert result.exit_code != 0
        assert "Invalid priority" in result.output

    def test_exclude_assignee_unassigned(self, cli_runner, sample_issues, mock_dependencies):
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=sample_issues)
        client.get_sprints = MagicMock(return_value=[])

        with patch("cli.main.get_current_project", return_value="proj-1"):
            result = cli_runner.invoke(
                cli, ["issue", "list", "--exclude-assignee", "unassigned"]
            )

        assert result.exit_code == 0
        assert (
            client.get_issues.call_args[1]["exclude_assignee_id"] == "unassigned"
        )


class TestClientExcludeQueryBuilding:
    """Direct unit tests for Client.get_issues exclude-param URL construction.

    Bypasses the autouse fixture (which patches `cli.client.Client`) by
    importing the real class from its source module.
    """

    def _real_client(self):
        import importlib
        import sys

        # The autouse fixture replaces cli.client.Client with a MagicMock for
        # the rest of the test module. Reimport from a clean module reference.
        mod = importlib.import_module("cli.client")
        # If patched, reload to get the real class.
        if not isinstance(mod.Client, type):
            mod = importlib.reload(sys.modules["cli.client"])
        return mod.Client

    def test_get_issues_emits_exclude_params(self):
        Client = self._real_client()
        captured = {}

        def fake_request(self, method, url, *args, **kwargs):
            captured["url"] = url
            return []

        client = Client.__new__(Client)
        client._request = fake_request.__get__(client, Client)

        client.get_issues(
            project_id="p1",
            exclude_label="bug,chore",
            exclude_status="done",
            exclude_assignee_id="unassigned",
        )

        url = captured["url"]
        assert "exclude_label=bug" in url
        assert "exclude_label=chore" in url
        assert "exclude_status=done" in url
        assert "exclude_assignee_id=unassigned" in url

    def test_get_issues_skips_empty_excludes(self):
        Client = self._real_client()
        captured = {}

        def fake_request(self, method, url, *args, **kwargs):
            captured["url"] = url
            return []

        client = Client.__new__(Client)
        client._request = fake_request.__get__(client, Client)

        client.get_issues(project_id="p1")

        assert "exclude_" not in captured["url"]
