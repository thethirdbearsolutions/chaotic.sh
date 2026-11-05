"""CHT-2064: `issue show` / `issue view` read every comment, not the
API's first (oldest) page of 100, and --last N keeps the newest N."""
import json
from unittest.mock import MagicMock

import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


ISSUE = {
    "id": "issue-1", "identifier": "CHT-100", "title": "Channel", "description": "",
    "status": "todo", "priority": "medium", "issue_type": "task", "estimate": 1,
    "project_id": "test-project-123",
}


def _comments(n):
    return [
        {"id": f"c{i}", "content": f"comment number {i}", "author_name": "A",
         "created_at": f"2026-11-0{1 + i // 100}T00:00:{i % 60:02d}"}
        for i in range(n)
    ]


def _paged_client(client, total):
    """A server that answers like the real one: oldest first, default 100."""
    rows = _comments(total)
    calls = []

    def get_comments(issue_id, limit=None, skip=None):
        calls.append((limit, skip))
        start = skip or 0
        return rows[start:start + (limit or 100)]

    client.get_issue_by_identifier = MagicMock(return_value=dict(ISSUE))
    client.get_comments = MagicMock(side_effect=get_comments)
    client.get_sub_issues = MagicMock(return_value=[])
    client.get_relations = MagicMock(return_value=[])
    client.get_pending_issue_rituals = MagicMock(return_value={"pending_rituals": [], "completed_rituals": []})
    client.get_issue_documents = MagicMock(return_value=[])
    return calls


@pytest.mark.parametrize("command", ["show", "view"])
def test_json_has_every_comment_past_the_first_page(cli_runner, command):
    from cli.main import cli, client
    calls = _paged_client(client, 237)

    result = cli_runner.invoke(cli, ["--json", "issue", command, "CHT-100"])

    assert result.exit_code == 0, result.output
    data = json.loads(result.output)
    assert data["comment_count"] == 237
    assert len(data["comments"]) == 237
    assert data["comments"][-1]["id"] == "c236"
    assert calls == [(100, None), (100, 100), (100, 200)]


def test_json_last_keeps_the_newest_and_reports_the_total(cli_runner):
    from cli.main import cli, client
    _paged_client(client, 137)

    result = cli_runner.invoke(cli, ["--json", "issue", "view", "CHT-100", "--last", "3"])

    assert result.exit_code == 0, result.output
    data = json.loads(result.output)
    assert data["comment_count"] == 137
    assert [c["id"] for c in data["comments"]] == ["c134", "c135", "c136"]


def test_formatted_view_shows_the_newest_comment(cli_runner):
    from cli.main import cli, client
    _paged_client(client, 101)

    result = cli_runner.invoke(cli, ["issue", "show", "CHT-100"])

    assert result.exit_code == 0, result.output
    assert "comment number 100" in result.output
    assert "newest" not in result.output  # nothing cut, nothing to say


def test_formatted_last_says_how_many_of_how_many(cli_runner):
    from cli.main import cli, client
    _paged_client(client, 137)

    result = cli_runner.invoke(cli, ["issue", "show", "CHT-100", "--last", "2"])

    assert result.exit_code == 0, result.output
    assert "newest 2 of 137" in result.output
    assert "comment number 136" in result.output
    assert "comment number 134" not in result.output


def test_exactly_one_full_page_asks_once_more_and_stops(cli_runner):
    from cli.main import cli, client
    calls = _paged_client(client, 100)

    result = cli_runner.invoke(cli, ["--json", "issue", "show", "CHT-100"])

    assert result.exit_code == 0, result.output
    assert json.loads(result.output)["comment_count"] == 100
    assert calls == [(100, None), (100, 100)]


def test_a_server_that_ignores_skip_does_not_loop(cli_runner):
    from cli.main import cli, client
    rows = _comments(100)
    _paged_client(client, 0)
    client.get_comments = MagicMock(return_value=rows)

    result = cli_runner.invoke(cli, ["--json", "issue", "show", "CHT-100"])

    assert result.exit_code == 0, result.output
    assert json.loads(result.output)["comment_count"] == 100
    assert client.get_comments.call_count == 2


def test_epic_show_json_has_every_comment(cli_runner):
    from cli.main import cli, client
    _paged_client(client, 150)
    client.get_issue_by_identifier = MagicMock(return_value=dict(ISSUE, issue_type="epic"))

    result = cli_runner.invoke(cli, ["--json", "epic", "show", "CHT-100"])

    assert result.exit_code == 0, result.output
    assert len(json.loads(result.output)["comments"]) == 150
