"""Tests for the remote MCP Streamable HTTP transport at /mcp (CHT-1266).

Drives the mounted endpoint end-to-end over raw HTTP (initialize,
tools/list, tools/call) via the same in-process ``client`` fixture every
other API test uses (httpx AsyncClient + ASGITransport) -- no separate
MCP client SDK needed since the server runs in ``json_response=True,
stateless_http=True`` mode: every POST gets a single JSON object back,
no SSE framing, no session-id bookkeeping between requests.
"""
import json

import pytest
import pytest_asyncio

from app.schemas.api_key import APIKeyCreate
from app.services.api_key_service import APIKeyService

_MCP_HEADERS = {"Accept": "application/json, text/event-stream", "Content-Type": "application/json"}

# Deliberately-leaked strong references to each test's `session_manager.run()`
# context manager -- see _fresh_mcp_session_manager below. Without this, the
# CM object goes unreferenced the instant __aenter__ returns, asyncio's
# garbage-collector hook for abandoned async generators schedules its
# .aclose() as a *separate* task, and that finalizer task hitting the
# generator's `finally: tg.cancel_scope.cancel()` from a different task than
# the task group was entered in is exactly the "different task" crash this
# fixture exists to avoid.
_LIVE_SESSION_MANAGER_CMS = []


@pytest_asyncio.fixture(autouse=True)
async def _fresh_mcp_session_manager():
    """Each test gets its own FastMCP instance + session manager, entered
    for exactly this test's lifetime.

    Two things force this: (1) StreamableHTTPSessionManager.run() can only
    be entered once ever per instance (raises on a second call) -- a
    module- or session-scoped fixture sharing one instance across tests
    would only work for the first test. (2) the `client` fixture's
    ASGITransport never drives app.main's own lifespan at all (that's why
    conftest.py's `client` fixture patches init_oxyde/close_oxyde to
    no-ops -- there's no lifespan.startup/shutdown ASGI messages sent by
    a plain ASGITransport). This replicates just the MCP half of that
    lifespan.

    Deliberately entered and never exited: pytest-asyncio runs an async
    fixture's post-yield teardown in a *different* asyncio Task than its
    setup, and anyio's task-group cancel scope hard-requires exiting in
    the same task it was entered in -- so pairing `session_manager.run()`
    with a yield-based teardown always raises "Attempted to exit cancel
    scope in a different task". Nothing to clean up anyway: each test
    gets a brand-new FastMCP/session-manager instance (reset above), so
    the previous test's task group (with no pending requests left) is
    simply abandoned to the garbage collector along with that test's
    event loop.
    """
    import app.mcp_server.asgi as asgi_mod
    from app.main import app as fastapi_app

    asgi_mod._fastmcp = None
    fastapi_app.router.routes = [
        r for r in fastapi_app.router.routes if getattr(r, "path", None) not in ("/mcp", "/mcp/{api_key}")
    ]
    asgi_mod.mount_mcp(fastapi_app)
    cm = asgi_mod.get_fastmcp().session_manager.run()
    await cm.__aenter__()
    _LIVE_SESSION_MANAGER_CMS.append(cm)


def _rpc(method: str, params: dict | None = None, id: int = 1) -> dict:
    return {"jsonrpc": "2.0", "id": id, "method": method, "params": params or {}}


def _init_params() -> dict:
    return {
        "protocolVersion": "2025-06-18",
        "capabilities": {},
        "clientInfo": {"name": "pytest", "version": "0"},
    }


async def _tool_call(client, headers, name, arguments=None, url="/mcp", id=1):
    resp = await client.post(
        url,
        json=_rpc("tools/call", {"name": name, "arguments": arguments or {}}, id=id),
        headers=headers,
    )
    return resp


@pytest.fixture
async def api_key(db, test_user):
    """A real ck_... API key for test_user."""
    service = APIKeyService()
    _record, full_key = await service.create(test_user.id, APIKeyCreate(name="mcp-test"))
    return full_key


@pytest.fixture
def bearer_headers(api_key):
    return {**_MCP_HEADERS, "Authorization": f"Bearer {api_key}"}


class TestAuth:
    async def test_missing_auth_returns_401(self, client):
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=_MCP_HEADERS)
        assert resp.status_code == 401
        assert resp.headers.get("www-authenticate") == "Bearer"

    async def test_malformed_key_returns_401(self, client):
        headers = {**_MCP_HEADERS, "Authorization": "Bearer not-a-real-key"}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 401

    async def test_jwt_bearer_is_rejected(self, client, auth_headers):
        """MCP is API-key only (CHT-1266) -- a JWT that authenticates fine
        against REST must NOT work here.
        """
        headers = {**_MCP_HEADERS, **auth_headers}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 401

    async def test_revoked_key_returns_401(self, client, db, test_user):
        service = APIKeyService()
        record, full_key = await service.create(test_user.id, APIKeyCreate(name="revoked"))
        await service.revoke(record)
        headers = {**_MCP_HEADERS, "Authorization": f"Bearer {full_key}"}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 401

    async def test_valid_key_can_initialize(self, client, bearer_headers):
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=bearer_headers)
        assert resp.status_code == 200
        body = resp.json()
        assert body["result"]["serverInfo"]["name"] == "chaotic"

    async def test_capability_url_mode_works(self, client, api_key):
        resp = await client.post(
            f"/mcp/{api_key}", json=_rpc("initialize", _init_params()), headers=_MCP_HEADERS
        )
        assert resp.status_code == 200
        assert resp.json()["result"]["serverInfo"]["name"] == "chaotic"

    async def test_capability_url_wrong_key_returns_401(self, client):
        resp = await client.post(
            "/mcp/ck_deadbeef00000000000000000000000000000000000000000000000000000000",
            json=_rpc("initialize", _init_params()),
            headers=_MCP_HEADERS,
        )
        assert resp.status_code == 401


class TestToolsList:
    async def test_tools_list_returns_all_ten(self, client, bearer_headers):
        resp = await client.post("/mcp", json=_rpc("tools/list"), headers=bearer_headers)
        assert resp.status_code == 200
        tools = resp.json()["result"]["tools"]
        names = {t["name"] for t in tools}
        assert names == {
            "issue_list", "issue_view", "issue_create", "issue_update",
            "issue_comment", "issue_start",
            "doc_list", "doc_view", "doc_create",
            "activity_recent",
        }


class TestToolsCall:
    async def test_issue_list_empty(self, client, bearer_headers, test_project):
        resp = await _tool_call(client, bearer_headers, "issue_list")
        assert resp.status_code == 200
        result = resp.json()["result"]
        assert result.get("isError") is not True
        payload = json.loads(result["content"][0]["text"])
        assert payload == {"issues": []}

    async def test_issue_create_and_view(self, client, bearer_headers, test_project):
        resp = await _tool_call(client, bearer_headers, "issue_create", {"title": "From MCP"})
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert "error" not in payload
        identifier = payload["identifier"]
        assert payload["title"] == "From MCP"

        resp = await _tool_call(client, bearer_headers, "issue_view", {"identifier": identifier}, id=2)
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert payload["identifier"] == identifier
        assert payload["comments"] == []
        assert payload["sub_issues"] == []

    async def test_issue_create_then_list_finds_it(self, client, bearer_headers, test_project):
        await _tool_call(client, bearer_headers, "issue_create", {"title": "Findable"})
        resp = await _tool_call(client, bearer_headers, "issue_list", id=2)
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert any(i["title"] == "Findable" for i in payload["issues"])

    async def test_issue_start_claims_and_moves_in_progress(self, client, bearer_headers, test_issue, test_user):
        resp = await _tool_call(client, bearer_headers, "issue_start", {"identifier": test_issue.identifier})
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert payload["status"] == "in_progress"
        assert payload["assignee_id"] == test_user.id

    async def test_issue_comment(self, client, bearer_headers, test_issue):
        resp = await _tool_call(
            client, bearer_headers, "issue_comment",
            {"identifier": test_issue.identifier, "content": "hello from mcp"},
        )
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert payload["content"] == "hello from mcp"

    async def test_issue_update_bad_status_reports_tool_error(self, client, bearer_headers, test_issue):
        resp = await _tool_call(
            client, bearer_headers, "issue_update",
            {"identifier": test_issue.identifier, "status": "not_a_real_status"},
        )
        # Invalid enum value at the JSON-schema layer -- MCP reports this
        # as a protocol-level tool error, not our {"error": ...} envelope.
        assert resp.json()["result"].get("isError") is True

    async def test_issue_view_unknown_identifier_is_error_envelope(self, client, bearer_headers, test_project):
        resp = await _tool_call(client, bearer_headers, "issue_view", {"identifier": "NOPE-999"})
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert "error" in payload

    async def test_doc_create_and_view(self, client, bearer_headers, test_project):
        resp = await _tool_call(client, bearer_headers, "doc_create", {"title": "Doc from MCP", "content": "hi"})
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert "error" not in payload
        doc_id = payload["id"]

        resp = await _tool_call(client, bearer_headers, "doc_view", {"document_id": doc_id}, id=2)
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert payload["title"] == "Doc from MCP"
        assert payload["comments"] == []
        assert payload["linked_issues"] == []

    async def test_doc_list(self, client, bearer_headers, test_document):
        # test_document has no project_id (team-wide/global doc); doc_list
        # defaults to the (only) current project like the stdio tool does,
        # so all_projects=true is what surfaces it here.
        resp = await _tool_call(client, bearer_headers, "doc_list", {"all_projects": True})
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert any(d["id"] == test_document.id for d in payload["documents"])

    async def test_activity_recent(self, client, bearer_headers, test_project):
        await _tool_call(client, bearer_headers, "issue_create", {"title": "Activity source"})
        resp = await _tool_call(client, bearer_headers, "activity_recent", id=2)
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert len(payload["activities"]) >= 1

    async def test_multiple_teams_requires_disambiguation(self, client, bearer_headers, test_user, test_team):
        """A user on more than one team gets a clear error, not a silent
        wrong-team default (CHT-1266 scoping rules -- see scope.py).
        """
        from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
        from app.enums import TeamRole

        other_team = await OxydeTeam.objects.create(name="Other Team", key="OTH")
        await OxydeTeamMember.objects.create(team_id=other_team.id, user_id=test_user.id, role=TeamRole.MEMBER)

        resp = await _tool_call(client, bearer_headers, "activity_recent")
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert "error" in payload
        assert "team" in payload["error"].lower()

    async def test_team_param_disambiguates(self, client, bearer_headers, test_user, test_team, test_project):
        from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
        from app.enums import TeamRole

        other_team = await OxydeTeam.objects.create(name="Other Team", key="OTH")
        await OxydeTeamMember.objects.create(team_id=other_team.id, user_id=test_user.id, role=TeamRole.MEMBER)

        resp = await _tool_call(client, bearer_headers, "activity_recent", {"team": test_team.key})
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert "error" not in payload

    async def test_unknown_tool_name(self, client, bearer_headers):
        resp = await _tool_call(client, bearer_headers, "issue_delete_everything")
        body = resp.json()
        assert "error" in body or body.get("result", {}).get("isError") is True
