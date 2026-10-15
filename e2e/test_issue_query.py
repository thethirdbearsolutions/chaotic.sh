"""E2E contract tests: the issue query endpoint (CHT-1718), through the CLI
client, the `issue list --where` command, the stdio MCP adapter and the
remote MCP transport, against a real server."""
import json
from unittest.mock import patch

import anyio
import httpx
import pytest

from cli.client import APIError
from test_mcp import MCP_URL, _HEADERS, _rpc


@pytest.fixture
def seeded(api_client, test_team, test_project):
    other = api_client.create_project(team_id=test_team["id"], name="E2E Other", key="OTH")
    bug = api_client.create_issue(test_project["id"], "Login bug", issue_type="bug", priority="high", estimate=3)
    chore = api_client.create_issue(test_project["id"], "Tidy up", issue_type="chore", priority="low")
    elsewhere = api_client.create_issue(other["id"], "Other bug", issue_type="bug", priority="urgent")
    return {"other": other, "bug": bug, "chore": chore, "elsewhere": elsewhere}


def _identifiers(result):
    return [i["identifier"] for i in result["issues"]]


class TestQueryEndpoint:
    def test_project_query_and_echo(self, api_client, test_project, seeded):
        result = api_client.query_issues(
            project_id=test_project["id"], where="type=bug or priority=low", order="priority",
        )
        assert _identifiers(result) == [seeded["bug"]["identifier"], seeded["chore"]["identifier"]]
        assert result["total"] == 2
        assert result["where"] == "type=bug or priority=low"
        assert result["order"] == "priority"
        assert result["query"]["filter"]["match"] == "any"
        assert result["issues"][0]["issue_type"] == "bug"  # wire form

    def test_team_query_and_filter_json(self, api_client, test_team, seeded):
        structure = {"match": "all", "rows": [{"field": "type", "op": "is", "values": ["bug"]}]}
        result = api_client.query_issues(
            team_id=test_team["id"], filter_json=json.dumps(structure), where="estimate!=",
            order="-updated", limit=1,
        )
        assert _identifiers(result) == [seeded["bug"]["identifier"]]
        both = api_client.query_issues(team_id=test_team["id"], filter_json=json.dumps(structure),
                                       order="priority", limit=1, skip=1)  # urgent first
        assert both["total"] == 2 and both["skip"] == 1
        assert _identifiers(both) == [seeded["bug"]["identifier"]]

    def test_bad_query_is_a_400_with_the_reason(self, api_client, test_project, seeded):
        with pytest.raises(APIError) as err:
            api_client.query_issues(project_id=test_project["id"], where="label=nope")
        assert err.value.status_code == 400
        assert "no label 'nope'" in str(err.value)

    def test_other_users_cannot_query(self, auth_token2, test_team, test_project, seeded):
        # Raw httpx: the two Client fixtures patch the same module-level
        # token getter, so a second Client would not be a second user.
        from conftest import TEST_BASE_URL

        for path in (f"projects/{test_project['id']}", f"teams/{test_team['id']}"):
            resp = httpx.get(
                f"{TEST_BASE_URL}/{path}/issues/query",
                headers={"Authorization": f"Bearer {auth_token2}"},
            )
            assert resp.status_code == 403, (path, resp.text)

    def test_the_get_url_is_the_state(self, auth_token, test_project, seeded):
        """A plain GET with the text in the query string: what a web page
        keeps in its URL (CHT-1746)."""
        from conftest import TEST_BASE_URL

        resp = httpx.get(
            f"{TEST_BASE_URL}/projects/{test_project['id']}/issues/query",
            params={"where": 'title~="login" estimate=1..5', "order": "-estimate"},
            headers={"Authorization": f"Bearer {auth_token}"},
        )
        assert resp.status_code == 200, resp.text
        assert [i["identifier"] for i in resp.json()["issues"]] == [seeded["bug"]["identifier"]]
        assert resp.json()["where"] == "title~=login estimate=1..5"


class TestCliWhere:
    def _invoke(self, auth_token, test_team, args, project=None):
        from click.testing import CliRunner
        from cli.main import cli as chaotic_cli

        with patch("cli.main.get_token", return_value=auth_token), \
             patch("cli.main.get_current_team", return_value=test_team["id"]), \
             patch("cli.main.get_current_project", return_value=project):
            return CliRunner().invoke(chaotic_cli, ["issue", "list", *args])

    def test_where_with_flags(self, api_client, auth_token, test_team, test_project, seeded):
        result = self._invoke(
            auth_token, test_team, ["-w", "type=bug", "--exclude-priority", "low", "--json"],
            project=test_project["id"],
        )
        assert result.exit_code == 0, result.output
        assert [i["identifier"] for i in json.loads(result.output)] == [seeded["bug"]["identifier"]]

    def test_all_projects_table(self, api_client, auth_token, test_team, seeded):
        result = self._invoke(auth_token, test_team, ["--all-projects", "-w", "type=bug", "--sort", "priority", "--order", "asc"])
        assert result.exit_code == 0, result.output
        assert result.output.index(seeded["elsewhere"]["identifier"]) < result.output.index(seeded["bug"]["identifier"])
        assert "OTH" in result.output

    def test_server_error_reaches_the_user(self, api_client, auth_token, test_team, test_project, seeded):
        result = self._invoke(auth_token, test_team, ["-w", "status=nope"], project=test_project["id"])
        assert result.exit_code != 0
        assert "'nope' is not a valid status" in result.output


class TestMcp:
    def test_stdio_adapter(self, api_client, auth_token, test_team, test_project, seeded):
        """RestBackend (the stdio MCP server's adapter) against the server."""
        from chaotic_mcp_tools import bind_all
        from cli.mcp_backend import RestBackend

        tools = {t.__name__: t for t in bind_all(RestBackend())}
        with patch("cli.main.get_token", return_value=auth_token), \
             patch("cli.main.get_current_team", return_value=test_team["id"]), \
             patch("cli.main.get_current_project", return_value=test_project["id"]):
            result = anyio.run(lambda: tools["issue_list"](where="priority=high,low", status=["backlog"], sort_by="priority", order="asc"))
        assert "error" not in result, result
        assert [i["identifier"] for i in result["issues"]] == [
            seeded["bug"]["identifier"], seeded["chore"]["identifier"],
        ]
        assert result["total"] == 2
        assert result["where"] == "priority=high,low status=backlog"

    def test_remote_transport(self, api_client, test_project, seeded):
        api_key = api_client.create_api_key("query e2e key")["key"]
        headers = {**_HEADERS, "Authorization": f"Bearer {api_key}"}
        resp = httpx.post(
            MCP_URL,
            json=_rpc("tools/call", {"name": "issue_list", "arguments": {
                "where": "type=bug", "project": "E2E",
            }}, id=2),
            headers=headers,
            timeout=5.0,
        )
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert "error" not in payload, payload
        assert [i["identifier"] for i in payload["issues"]] == [seeded["bug"]["identifier"]]
        assert payload["total"] == 1
