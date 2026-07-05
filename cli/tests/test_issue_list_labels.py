"""Tests pinning `issue list --label` AND semantics (CHT-1212).

The CLI documents `--label a,b` as "issues must have ALL labels". The
backend's /api/issues label filter defaults to label_match=all (AND);
the web UI opts into label_match=any explicitly. These tests pin the
CLI's side of that wire contract so a backend semantics change can't
silently flip `issue list --label` from AND to OR again.
"""
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


class TestIssueListLabelFilter:
    def test_label_passed_through(self, cli_runner, sample_issues, mock_dependencies):
        """issue list --label passes the raw comma-separated value to the client."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=sample_issues)
        client.get_sprints = MagicMock(return_value=[])

        with patch("cli.main.get_current_project", return_value="proj-1"):
            result = cli_runner.invoke(cli, ["issue", "list", "--label", "bug"])

        assert result.exit_code == 0
        assert client.get_issues.call_args[1]["label"] == "bug"

    def test_multi_label_passed_through(self, cli_runner, sample_issues, mock_dependencies):
        """issue list --label a,b passes both labels through unchanged."""
        from cli.main import cli, client

        client.get_issues = MagicMock(return_value=sample_issues)
        client.get_sprints = MagicMock(return_value=[])

        with patch("cli.main.get_current_project", return_value="proj-1"):
            result = cli_runner.invoke(cli, ["issue", "list", "--label", "bug,chore"])

        assert result.exit_code == 0
        assert client.get_issues.call_args[1]["label"] == "bug,chore"


class TestClientLabelWireContract:
    """Wire-level: Client.get_issues emits repeated label= params and NO
    label_match, so the server default (all = AND) applies — matching the
    CLI's documented "issues must have ALL labels" contract."""

    def _issue_url(self, mock_request):
        method, path = mock_request.call_args[0][:2]
        assert method == "GET"
        assert path.startswith("/issues?")
        return path

    def test_multi_label_emits_repeated_params(self):
        from cli.client import Client

        client = Client()
        client._request = MagicMock(return_value=[])

        client.get_issues(project_id="proj-1", label="bug,chore")

        url = self._issue_url(client._request)
        assert "label=bug" in url
        assert "label=chore" in url

    def test_multi_label_does_not_send_label_match(self):
        """No label_match param -> server default 'all' (AND) applies."""
        from cli.client import Client

        client = Client()
        client._request = MagicMock(return_value=[])

        client.get_issues(project_id="proj-1", label="bug,chore")

        url = self._issue_url(client._request)
        assert "label_match" not in url

    def test_single_label_emits_one_param(self):
        from cli.client import Client

        client = Client()
        client._request = MagicMock(return_value=[])

        client.get_issues(project_id="proj-1", label="bug")

        url = self._issue_url(client._request)
        assert "label=bug" in url
        assert "label_match" not in url

    def test_label_values_are_stripped(self):
        """Comma-separated values with whitespace are trimmed before sending."""
        from cli.client import Client

        client = Client()
        client._request = MagicMock(return_value=[])

        client.get_issues(project_id="proj-1", label="bug, chore")

        url = self._issue_url(client._request)
        assert "label=bug" in url
        assert "label=chore" in url
        assert "label=%20chore" not in url
