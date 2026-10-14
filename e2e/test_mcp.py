"""E2E contract test: the remote MCP Streamable HTTP transport at /mcp
(CHT-1266), against a real running FastAPI server (not ASGITransport) --
so, unlike backend/tests/test_mcp_endpoint.py, the app's real lifespan
(and therefore the MCP session manager's task group) is driven exactly
the way it would be in production, no fixture workarounds needed.
"""
import httpx
import pytest

TEST_PORT = 19876
MCP_URL = f"http://127.0.0.1:{TEST_PORT}/mcp"
_HEADERS = {"Accept": "application/json, text/event-stream", "Content-Type": "application/json"}


def _rpc(method, params=None, id=1):
    return {"jsonrpc": "2.0", "id": id, "method": method, "params": params or {}}


def _init_params():
    return {"protocolVersion": "2025-06-18", "capabilities": {}, "clientInfo": {"name": "e2e", "version": "0"}}


@pytest.fixture
def api_key(api_client):
    return api_client.create_api_key("mcp e2e key")["key"]


class TestRemoteMCP:
    def test_missing_auth_401(self, test_server):
        resp = httpx.post(MCP_URL, json=_rpc("initialize", _init_params()), headers=_HEADERS, timeout=5.0)
        assert resp.status_code == 401

    def test_bearer_header_initialize(self, test_server, api_key):
        headers = {**_HEADERS, "Authorization": f"Bearer {api_key}"}
        resp = httpx.post(MCP_URL, json=_rpc("initialize", _init_params()), headers=headers, timeout=5.0)
        assert resp.status_code == 200
        assert resp.json()["result"]["serverInfo"]["name"] == "chaotic"

    def test_capability_url_initialize(self, test_server, api_key):
        resp = httpx.post(f"{MCP_URL}/{api_key}", json=_rpc("initialize", _init_params()), headers=_HEADERS, timeout=5.0)
        assert resp.status_code == 200
        assert resp.json()["result"]["serverInfo"]["name"] == "chaotic"

    def test_expired_key_401(self, test_server, api_client):
        """PR #219 review finding 2: a key created with an already-past
        expires_at is rejected on /mcp exactly like an invalid key.
        """
        from datetime import datetime, timedelta, timezone

        expired = api_client.create_api_key(
            "expired mcp key",
            expires_at=(datetime.now(timezone.utc) - timedelta(hours=1)).isoformat(),
        )["key"]
        resp = httpx.post(
            f"{MCP_URL}/{expired}", json=_rpc("initialize", _init_params()), headers=_HEADERS, timeout=5.0
        )
        assert resp.status_code == 401

    def test_access_log_never_sees_raw_capability_key(self, test_server, api_key):
        """PR #219 review finding 1: capture the REAL uvicorn access-log
        record for a capability-URL request and assert the raw key was
        scrubbed before the logger saw it. This is the actual production
        leak path (uvicorn access logging is on by default in every
        documented run command); the backend suite asserts the same via
        the scope, this asserts the log line itself.
        """
        import logging

        records = []

        class _Capture(logging.Handler):
            def emit(self, record):
                records.append(record.getMessage())

        access_logger = logging.getLogger("uvicorn.access")
        handler = _Capture(level=logging.INFO)
        previous_level = access_logger.level
        access_logger.addHandler(handler)
        # The e2e server runs with log_level="error"; open the gate just
        # for this logger, just for this test.
        access_logger.setLevel(logging.INFO)
        try:
            resp = httpx.post(
                f"{MCP_URL}/{api_key}", json=_rpc("initialize", _init_params()), headers=_HEADERS, timeout=5.0
            )
            assert resp.status_code == 200
        finally:
            access_logger.removeHandler(handler)
            access_logger.setLevel(previous_level)

        mcp_lines = [line for line in records if "/mcp/" in line]
        assert mcp_lines, "expected an access-log line for the /mcp/<key> request"
        for line in mcp_lines:
            assert api_key not in line
            assert f"ck_...{api_key[-4:]}" in line

    def test_tools_list_and_call_round_trip(self, test_server, api_key, test_project):
        headers = {**_HEADERS, "Authorization": f"Bearer {api_key}"}

        resp = httpx.post(MCP_URL, json=_rpc("tools/list"), headers=headers, timeout=5.0)
        names = {t["name"] for t in resp.json()["result"]["tools"]}
        assert "issue_create" in names

        resp = httpx.post(
            MCP_URL,
            json=_rpc("tools/call", {"name": "issue_create", "arguments": {"title": "From e2e MCP"}}, id=2),
            headers=headers,
            timeout=5.0,
        )
        import json as _json
        payload = _json.loads(resp.json()["result"]["content"][0]["text"])
        assert payload["title"] == "From e2e MCP"

        resp = httpx.post(
            MCP_URL,
            json=_rpc("tools/call", {"name": "issue_list", "arguments": {}}, id=3),
            headers=headers,
            timeout=5.0,
        )
        payload = _json.loads(resp.json()["result"]["content"][0]["text"])
        assert any(i["title"] == "From e2e MCP" for i in payload["issues"])


class TestIssueCreateParentImpliesProject:
    """CHT-1706: a parent names its project, so issue_create with `parent`
    and no `project` creates the sub-issue there, even when the key can
    see more than one project; a `project` that names another is refused."""

    @staticmethod
    def _call(api_key, arguments):
        import json as _json

        resp = httpx.post(
            MCP_URL,
            json=_rpc("tools/call", {"name": "issue_create", "arguments": arguments}, id=2),
            headers={**_HEADERS, "Authorization": f"Bearer {api_key}"},
            timeout=5.0,
        )
        return _json.loads(resp.json()["result"]["content"][0]["text"])

    @pytest.fixture
    def parent(self, api_client, test_team, test_project):
        other = api_client.create_project(team_id=test_team["id"], name="E2E Other", key="OTH")
        return api_client.create_issue(other["id"], "Parent in the second project")

    def test_parent_alone_creates_in_the_parents_project(self, api_key, parent):
        created = self._call(api_key, {"title": "Child", "parent": parent["identifier"]})
        assert "error" not in created, created
        assert created["project_id"] == parent["project_id"]
        assert created["parent_id"] == parent["id"]
        assert created["identifier"].startswith("OTH-")

    def test_matching_project_is_accepted(self, api_key, parent):
        created = self._call(api_key, {"title": "Child", "parent": parent["identifier"], "project": "OTH"})
        assert created["parent_id"] == parent["id"]

    def test_a_different_project_is_refused(self, api_key, parent):
        result = self._call(api_key, {"title": "Child", "parent": parent["identifier"], "project": "E2E"})
        message = result["error"]["message"]
        assert message.startswith(f"Parent {parent['identifier']} is in project OTH, not E2E:"), message

    def test_a_team_that_does_not_own_the_parent_is_refused(self, api_client, api_key, parent):
        api_client.create_team(name="E2E Elsewhere", key="ELS")
        result = self._call(api_key, {"title": "Child", "parent": parent["identifier"], "team": "ELS"})
        message = result["error"]["message"]
        assert f"Parent {parent['identifier']} is in project OTH, which is not in team ELS:" in message, message

    def test_the_parents_own_team_is_accepted(self, api_key, parent, test_team):
        created = self._call(api_key, {"title": "Child", "parent": parent["identifier"], "team": test_team["key"]})
        assert created["parent_id"] == parent["id"], created

    def test_a_key_scoped_to_another_project_cannot_see_the_parent(self, api_client, test_project, parent):
        """A key scoped to project E2E naming a parent in OTH gets the same
        not-found as an identifier that does not exist, and creates nothing:
        inferring the project from the parent opens no oracle (PR #392 review)."""
        scoped = api_client.create_project_agent(test_project["id"], "scoped")["api_key"]
        hidden = self._call(scoped, {"title": "Child", "parent": parent["identifier"]})
        missing = self._call(scoped, {"title": "Child", "parent": "NOPE-999"})
        assert hidden["error"]["message"] == missing["error"]["message"], (hidden, missing)
        assert "not found" in hidden["error"]["message"].lower(), hidden
        assert [i["id"] for i in api_client.get_issues(project_id=parent["project_id"])] == [parent["id"]]
