"""E2E: the whole OAuth connector flow against the real running server
(CHT-1520): register a client -> /oauth/authorize -> consent approve ->
/oauth/token -> /mcp with the cat_ access token, then refresh and revoke.

Like test_mcp.py, this drives the app's real lifespan and transport, so
the access-log assertion (CHT-1570) checks the actual uvicorn log line.
The server runs in this process, so turning OAUTH_ENABLED on for one
test is an environment change plus a settings-cache reset.
"""
import base64
import hashlib
import json
import logging
import re
from urllib.parse import parse_qs, urlsplit

import httpx
import pytest

from conftest import TEST_PORT

ORIGIN = f"http://127.0.0.1:{TEST_PORT}"
MCP_URL = f"{ORIGIN}/mcp"
REDIRECT = "http://127.0.0.1:43210/callback"
VERIFIER = "e2e-verifier-" + "v" * 40
CHALLENGE = base64.urlsafe_b64encode(hashlib.sha256(VERIFIER.encode()).digest()).rstrip(b"=").decode()
_MCP_HEADERS = {"Accept": "application/json, text/event-stream", "Content-Type": "application/json"}
# A minted secret: one of this server's prefixes followed by hex.
_SECRET = re.compile(r"c(?:ac|at|rt|ct|cs)_[0-9a-f]{8}")


@pytest.fixture
def oauth_on(monkeypatch):
    from app.config import get_settings
    from app.services import token_service

    monkeypatch.setenv("OAUTH_ENABLED", "true")
    monkeypatch.setenv("APP_BASE_URL", ORIGIN)
    monkeypatch.setenv("OAUTH_DCR_ENABLED", "true")
    get_settings.cache_clear()
    token_service._reset_for_tests()
    yield
    get_settings.cache_clear()
    token_service._reset_for_tests()


def _rpc(method, params=None, id=1):
    return {"jsonrpc": "2.0", "id": id, "method": method, "params": params or {}}


def _initialize(access_token):
    return httpx.post(
        MCP_URL,
        json=_rpc("initialize", {
            "protocolVersion": "2025-06-18", "capabilities": {}, "clientInfo": {"name": "e2e-oauth", "version": "0"},
        }),
        headers={**_MCP_HEADERS, "Authorization": f"Bearer {access_token}"},
        timeout=5.0,
    )


def _token(data):
    return httpx.post(f"{ORIGIN}/oauth/token", data=data, timeout=5.0)


class _AccessLog(logging.Handler):
    def __init__(self):
        super().__init__(level=logging.INFO)
        self.lines = []

    def emit(self, record):
        self.lines.append(record.getMessage())


@pytest.fixture
def access_log():
    logger = logging.getLogger("uvicorn.access")
    handler = _AccessLog()
    previous = logger.level
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)  # the e2e server runs at log_level="error"
    try:
        yield handler
    finally:
        logger.removeHandler(handler)
        logger.setLevel(previous)


def test_connector_flow_end_to_end(test_server, oauth_on, auth_token, test_team, test_project, access_log):
    # 1. Dynamic client registration (a public client, loopback redirect).
    registered = httpx.post(f"{ORIGIN}/oauth/register", json={
        "client_name": "E2E Connector", "redirect_uris": [REDIRECT],
    }, timeout=5.0)
    assert registered.status_code == 201, registered.text
    client_id = registered.json()["client_id"]

    # 2. /oauth/authorize validates and sends the browser to consent.
    authorize = httpx.get(f"{ORIGIN}/oauth/authorize", params={
        "client_id": client_id, "redirect_uri": REDIRECT, "response_type": "code",
        "code_challenge": CHALLENGE, "code_challenge_method": "S256", "state": "e2e-state",
        "scope": "chaotic:write offline_access", "resource": MCP_URL,
    }, timeout=5.0)
    assert authorize.status_code == 302, authorize.text
    consent = authorize.headers["location"]
    assert consent.startswith(f"{ORIGIN}/oauth/consent/")
    request_id = consent.rsplit("/", 1)[1]

    # 3. The human approves with their web login (what the SPA does).
    human = {"Authorization": f"Bearer {auth_token}"}
    view = httpx.get(f"{ORIGIN}/api/oauth/requests/{request_id}", headers=human, timeout=5.0)
    assert view.status_code == 200, view.text
    approved = httpx.post(
        f"{ORIGIN}/api/oauth/requests/{request_id}/approve", json={"team_id": test_team["id"]},
        headers=human, timeout=5.0,
    )
    assert approved.status_code == 200, approved.text
    redirect = approved.json()["redirect"]
    assert redirect.startswith(REDIRECT + "?")
    query = {k: v[0] for k, v in parse_qs(urlsplit(redirect).query).items()}
    assert query["state"] == "e2e-state" and query["iss"] == ORIGIN

    # 4. The client redeems the code.
    exchanged = _token({
        "grant_type": "authorization_code", "client_id": client_id, "code": query["code"],
        "redirect_uri": REDIRECT, "code_verifier": VERIFIER, "resource": MCP_URL,
    })
    assert exchanged.status_code == 200, exchanged.text
    assert exchanged.headers["cache-control"] == "no-store"
    tokens = exchanged.json()
    assert tokens["access_token"].startswith("cat_") and tokens["refresh_token"].startswith("crt_")
    agent = tokens["chaotic"]["agent"]
    assert tokens["chaotic"]["team_id"] == test_team["id"]

    # CHT-1570: the token request's access-log line carries no secret.
    token_lines = [line for line in access_log.lines if "/oauth/token" in line]
    assert token_lines, "expected an access-log line for the token request"
    assert not any(_SECRET.search(line) for line in token_lines), token_lines

    # 5. /mcp accepts the access token and acts as the consented agent.
    assert _initialize(tokens["access_token"]).status_code == 200
    created = httpx.post(MCP_URL, json=_rpc("tools/call", {
        "name": "issue_create", "arguments": {"title": "Filed over OAuth", "project": test_project["id"]},
    }, id=2), headers={**_MCP_HEADERS, "Authorization": f"Bearer {tokens['access_token']}"}, timeout=5.0)
    assert created.status_code == 200, created.text
    issue = json.loads(created.json()["result"]["content"][0]["text"])
    assert issue["title"] == "Filed over OAuth", issue
    assert issue["creator_id"] == agent["id"]

    # A connector token is for /mcp only (I16): REST refuses it.
    rest = httpx.get(f"{ORIGIN}/api/auth/me", headers={"Authorization": f"Bearer {tokens['access_token']}"},
                     timeout=5.0)
    assert rest.status_code == 401

    # 6. Refresh rotates; the new access token works at /mcp.
    refreshed = _token({"grant_type": "refresh_token", "client_id": client_id,
                        "refresh_token": tokens["refresh_token"]})
    assert refreshed.status_code == 200, refreshed.text
    rotated = refreshed.json()
    assert rotated["refresh_token"] != tokens["refresh_token"]
    assert _initialize(rotated["access_token"]).status_code == 200

    # 7. RFC 7009 revocation ends the connection.
    revoked = httpx.post(f"{ORIGIN}/oauth/revoke", data={
        "token": rotated["refresh_token"], "client_id": client_id, "token_type_hint": "refresh_token",
    }, timeout=5.0)
    assert revoked.status_code == 200
    assert _initialize(rotated["access_token"]).status_code == 401
    dead = _token({"grant_type": "refresh_token", "client_id": client_id, "refresh_token": rotated["refresh_token"]})
    assert dead.status_code == 400 and dead.json()["error"] == "invalid_grant"

    assert not any(_SECRET.search(line) for line in access_log.lines), access_log.lines


def test_token_endpoint_is_404_while_oauth_is_off(test_server):
    response = httpx.post(f"{ORIGIN}/oauth/token", data={"grant_type": "refresh_token"}, timeout=5.0)
    assert response.status_code == 404
