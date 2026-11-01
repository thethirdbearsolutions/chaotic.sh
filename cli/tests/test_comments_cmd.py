"""`chaotic comments` for a project-scoped identity (CHT-1952).

The team-wide comment feed is refused to a project-scoped agent
(CHT-1780), which a session identity usually is. On that 403 the command
asks `/auth/me` for the agent's project and reads that project's feed.
"""
import json
from unittest.mock import MagicMock

import pytest

COMMENT = {
    "source_type": "issue", "issue_identifier": "CHT-1", "content": "own project only",
    "author_name": "Ada", "created_at": "2026-11-01T10:00:00",
}


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


def _error(message, status_code):
    # The class cli.main's handle_error catches; cli.client is mocked
    # here, and its APIError takes no status_code.
    from cli.main import APIError
    error = APIError(message)
    error.status_code = status_code
    return error


def _refused():
    return _error("Not authorized to access this team", 403)


class TestCommentsFeed:
    def test_team_wide_by_default(self, cli_runner):
        from cli.main import cli, client

        client.get_team_comments = MagicMock(return_value=[COMMENT])
        client.get_me = MagicMock()

        result = cli_runner.invoke(cli, ["comments", "--json"])

        assert result.exit_code == 0, result.output
        client.get_team_comments.assert_called_once_with("test-team-123", limit=20, project_id=None)
        client.get_me.assert_not_called()

    def test_project_scoped_agent_gets_its_projects_feed(self, cli_runner):
        from cli.main import cli, client

        def feed(team_id, limit=None, project_id=None):
            if project_id is None:
                raise _refused()
            assert project_id == "proj-1"
            return [COMMENT]
        client.get_team_comments = MagicMock(side_effect=feed)
        client.get_me = MagicMock(return_value={"is_agent": True, "agent_project_id": "proj-1", "agent_team_id": "test-team-123"})

        result = cli_runner.invoke(cli, ["comments", "-n", "5", "--json"])

        assert result.exit_code == 0, result.output
        assert json.loads(result.output) == [COMMENT]
        client.get_team_comments.assert_called_with("test-team-123", limit=5, project_id="proj-1")

    @pytest.mark.parametrize("me", [
        {"is_agent": False, "agent_project_id": None},
        {"is_agent": True, "agent_project_id": None, "agent_team_id": "test-team-123"},
        # Its project is in another team: the current team is stale, and
        # retrying there would hide the refusal behind an empty answer
        # (PR #498 review I1).
        {"is_agent": True, "agent_project_id": "proj-1", "agent_team_id": "other-team"},
    ])
    def test_anyone_else_keeps_the_refusal(self, cli_runner, me):
        from cli.main import cli, client

        client.get_team_comments = MagicMock(side_effect=_refused())
        client.get_me = MagicMock(return_value=me)

        result = cli_runner.invoke(cli, ["comments"])

        assert result.exit_code != 0
        assert "Not authorized to access this team" in result.output
        assert client.get_team_comments.call_count == 1

    def test_a_failed_lookup_keeps_the_refusal(self, cli_runner):
        from cli.main import cli, client

        client.get_team_comments = MagicMock(side_effect=_refused())
        client.get_me = MagicMock(side_effect=_error("boom", 500))

        result = cli_runner.invoke(cli, ["comments"])

        assert result.exit_code != 0
        assert "Not authorized to access this team" in result.output
        assert "boom" not in result.output

    def test_other_errors_are_not_retried(self, cli_runner):
        from cli.main import cli, client

        client.get_team_comments = MagicMock(side_effect=_error("down", 502))
        client.get_me = MagicMock()

        result = cli_runner.invoke(cli, ["comments"])

        assert result.exit_code != 0
        client.get_me.assert_not_called()

