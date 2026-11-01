"""E2E: team-wide CLI commands as a project-scoped identity (CHT-1955).

The server refuses a project-scoped agent (a session identity is usually
one) every team-wide read (CHT-1780). These commands have a project form,
so the CLI falls back to the agent's own project instead of failing with
the refusal. The current project is deliberately unset, the way a CLI on a
new machine starts out.
"""
from unittest.mock import patch

import pytest
from click.testing import CliRunner

from conftest import TEST_BASE_URL


@pytest.fixture
def lane(api_client, test_team, test_project):
    """A project-scoped agent, an issue in its project, and one in a
    sibling project it must never see."""
    agent = api_client.create_project_agent(test_project["id"], "Lane")
    sibling = api_client.create_project(test_team["id"], "Sibling", "SIB")
    mine = api_client.create_issue(test_project["id"], "Lane ticket alpha")
    hidden = api_client.create_issue(sibling["id"], "Sibling ticket alpha")
    return agent["api_key"], test_team["id"], mine, hidden


def _cli(key, team_id, *args):
    from cli.main import cli as chaotic_cli

    with patch("cli.client.get_api_url", return_value=TEST_BASE_URL), \
         patch("cli.client.get_token", return_value=None), \
         patch("cli.client.get_api_key", return_value=key), \
         patch("cli.main.get_token", return_value=None), \
         patch("cli.main.get_api_key", return_value=key), \
         patch("cli.main.get_current_team", return_value=team_id), \
         patch("cli.main.get_current_project", return_value=None):
        return CliRunner().invoke(chaotic_cli, list(args))


@pytest.mark.parametrize("args", [
    ["issue", "list", "--all-projects", "--json"],
    ["issue", "list", "--all-projects", "-w", "title~=alpha", "--json"],
    ["issue", "ready", "--all-projects", "--json"],
    ["issue", "search", "alpha", "--all", "--json"],
    ["issue", "search", "alpha", "--json"],
])
def test_team_wide_issue_reads_narrow_to_its_project(lane, args):
    key, team_id, mine, hidden = lane
    result = _cli(key, team_id, *args)
    assert result.exit_code == 0, result.output
    assert mine["identifier"] in result.output
    assert hidden["identifier"] not in result.output and "Sibling" not in result.output


def test_activity_narrows_to_its_project(lane, api_client):
    key, team_id, mine, hidden = lane
    api_client.create_comment(hidden["id"], "sibling chatter")
    result = _cli(key, team_id, "activity", "--json")
    assert result.exit_code == 0, result.output
    assert mine["id"] in result.output
    assert hidden["id"] not in result.output


@pytest.mark.parametrize("args", [
    ["template", "list"],
    ["project", "create", "Rogue", "ROG"],
])
def test_team_wide_refusals_say_why(lane, args):
    key, team_id, _, _ = lane
    result = _cli(key, team_id, *args)
    assert result.exit_code != 0
    assert "scoped to one project" in result.output, result.output
    assert "Not authorized to access this team" not in result.output
