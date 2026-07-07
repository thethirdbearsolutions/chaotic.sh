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
