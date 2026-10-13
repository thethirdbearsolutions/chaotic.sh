"""E2E: the whole OAuth connector flow against the real running server
(CHT-1520, CHT-1521): discovery from /mcp's 401 -> register a client
(DCR) or name a metadata document (CIMD) -> /oauth/authorize -> consent
approve -> /oauth/token -> /mcp with the cat_ access token, then refresh
and revoke.

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
    from app.oauth import ratelimit

    get_settings.cache_clear()
    token_service._reset_for_tests()
    ratelimit.authorize_requests.clear()
    ratelimit.cimd_fetches.clear()
    yield
    get_settings.cache_clear()
    token_service._reset_for_tests()
    ratelimit.authorize_requests.clear()
    ratelimit.cimd_fetches.clear()


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


@pytest.fixture
def web_login_token(test_user):
    """The web app's login (the web-login claim): consent refuses the
    CLI-style session JWT the conftest's auth_token is."""
    from app.utils.security import WEB_LOGIN, WEB_LOGIN_CLAIM, create_access_token

    return create_access_token(data={"sub": test_user.id, WEB_LOGIN_CLAIM: WEB_LOGIN})


def _discover():
    """What an MCP client does first (MCP authorization spec 2026-07-28):
    call /mcp with no token, follow the 401's resource_metadata to the
    RFC 9728 document, take its first authorization server, and read
    that server's RFC 8414 metadata. Returns (challenge scope, AS
    metadata)."""
    unauthenticated = httpx.post(MCP_URL, json=_rpc("initialize"), headers=_MCP_HEADERS, timeout=5.0)
    assert unauthenticated.status_code == 401
    challenge = unauthenticated.headers["www-authenticate"]
    params = dict(re.findall(r'(\w+)="([^"]*)"', challenge))
    assert challenge.startswith("Bearer ")
    assert params["resource_metadata"] == f"{ORIGIN}/.well-known/oauth-protected-resource/mcp"

    prm = httpx.get(params["resource_metadata"], timeout=5.0)
    assert prm.status_code == 200, prm.text
    prm = prm.json()
    assert prm["resource"] == MCP_URL
    issuer = prm["authorization_servers"][0]
    assert issuer == ORIGIN

    metadata = httpx.get(f"{issuer}/.well-known/oauth-authorization-server", timeout=5.0)
    assert metadata.status_code == 200, metadata.text
    metadata = metadata.json()
    assert metadata["issuer"] == issuer  # RFC 8414 §3.3: exact string
    assert metadata["code_challenge_methods_supported"] == ["S256"]
    # Claude uses CIMD only when both of these are advertised.
    assert metadata["client_id_metadata_document_supported"] is True
    assert "none" in metadata["token_endpoint_auth_methods_supported"]
    # ChatGPT uses its shared redirect only when RFC 9207 iss is promised.
    assert metadata["authorization_response_iss_parameter_supported"] is True
    # ChatGPT asks for every advertised OIDC scope; this is no OpenID provider.
    assert "openid" not in metadata["scopes_supported"]
    assert "offline_access" in metadata["scopes_supported"]
    return params["scope"], metadata


# Claude Code's client metadata document as claude.ai served it on
# 2026-10-13 (CHT-1521). The fetch itself is SSRF-guarded to public
# addresses, which this harness can't offer, so the e2e serves the
# document in process; backend/tests/test_oauth_registration.py covers
# the fetch.
CLAUDE_CODE_CLIENT_ID = "https://claude.ai/oauth/claude-code-client-metadata"
CLAUDE_CODE_DOCUMENT = (
    b'{"client_id":"https://claude.ai/oauth/claude-code-client-metadata","client_name":"Claude Code",'
    b'"client_uri":"https://claude.ai","redirect_uris":["http://localhost/callback","http://127.0.0.1/callback"],'
    b'"grant_types":["authorization_code","refresh_token"],"response_types":["code"],'
    b'"token_endpoint_auth_method":"none"}'
)


@pytest.fixture
def claude_code_document(monkeypatch):
    from app.oauth import cimd

    fetched = []

    async def fetch(url):
        fetched.append(url)
        assert url == CLAUDE_CODE_CLIENT_ID
        return cimd.FetchedDocument(CLAUDE_CODE_DOCUMENT, "public, max-age=300")

    monkeypatch.setattr(cimd, "fetch", fetch)
    return fetched


@pytest.mark.parametrize("loopback_host", ["localhost", "127.0.0.1"])
def test_cimd_client_with_loopback_redirect_end_to_end(
    test_server, oauth_on, claude_code_document, web_login_token, test_team, test_project, loopback_host,
):
    """`claude mcp add --transport http chaotic <url>` with no key header:
    a CIMD client_id, a loopback redirect on whatever port the client got
    (RFC 8252 §7.3), and RFC 8707 resource on every request."""
    challenge_scope, metadata = _discover()
    # The client listens on an ephemeral port: one the registered URIs
    # don't name.
    redirect_uri = f"http://{loopback_host}:{43000 + len(loopback_host)}/callback"
    scope = f"{challenge_scope} offline_access"

    authorize = httpx.get(metadata["authorization_endpoint"], params={
        "client_id": CLAUDE_CODE_CLIENT_ID, "redirect_uri": redirect_uri, "response_type": "code",
        "code_challenge": CHALLENGE, "code_challenge_method": "S256", "state": "cc-state",
        "scope": scope, "resource": MCP_URL,
    }, timeout=5.0)
    assert authorize.status_code == 302, authorize.text
    assert claude_code_document == [CLAUDE_CODE_CLIENT_ID]
    request_id = authorize.headers["location"].rsplit("/", 1)[1]

    human = {"Authorization": f"Bearer {web_login_token}"}
    view = httpx.get(f"{ORIGIN}/api/oauth/requests/{request_id}", headers=human, timeout=5.0)
    assert view.status_code == 200, view.text
    view = view.json()
    assert view["client"]["name"] == "Claude Code" and view["client"]["trust"] == "recognized"
    assert view["client"]["host"] == "claude.ai"
    assert view["loopback_redirect"] is True and view["redirect_host"] == loopback_host
    approved = httpx.post(
        f"{ORIGIN}/api/oauth/requests/{request_id}/approve", json={"team_id": test_team["id"]},
        headers=human, timeout=5.0,
    )
    assert approved.status_code == 200, approved.text
    redirect = approved.json()["redirect"]
    assert redirect.startswith(redirect_uri + "?")
    query = {k: v[0] for k, v in parse_qs(urlsplit(redirect).query).items()}
    # RFC 9207: the client checks iss against the issuer it discovered.
    assert query["state"] == "cc-state" and query["iss"] == metadata["issuer"]

    exchanged = httpx.post(metadata["token_endpoint"], data={
        "grant_type": "authorization_code", "client_id": CLAUDE_CODE_CLIENT_ID, "code": query["code"],
        "redirect_uri": redirect_uri, "code_verifier": VERIFIER, "resource": MCP_URL,
    }, timeout=5.0)
    assert exchanged.status_code == 200, exchanged.text
    tokens = exchanged.json()
    assert tokens["scope"] == scope
    agent = tokens["chaotic"]["agent"]

    assert _initialize(tokens["access_token"]).status_code == 200
    created = httpx.post(MCP_URL, json=_rpc("tools/call", {
        "name": "issue_create", "arguments": {"title": "Filed by a CIMD client", "project": test_project["id"]},
    }, id=2), headers={**_MCP_HEADERS, "Authorization": f"Bearer {tokens['access_token']}"}, timeout=5.0)
    assert created.status_code == 200, created.text
    issue = json.loads(created.json()["result"]["content"][0]["text"])
    assert issue["creator_id"] == agent["id"]

    refreshed = httpx.post(metadata["token_endpoint"], data={
        "grant_type": "refresh_token", "client_id": CLAUDE_CODE_CLIENT_ID,
        "refresh_token": tokens["refresh_token"], "resource": MCP_URL,
    }, timeout=5.0)
    assert refreshed.status_code == 200, refreshed.text
    rotated = refreshed.json()
    assert _initialize(rotated["access_token"]).status_code == 200
    # Rotation: the old access token is still valid until it expires, but
    # the old refresh token is spent (a replay outside the grace window
    # would revoke the session; that path is covered in the backend tests).
    assert rotated["refresh_token"] != tokens["refresh_token"]

    revoked = httpx.post(metadata["revocation_endpoint"], data={
        "token": rotated["refresh_token"], "client_id": CLAUDE_CODE_CLIENT_ID,
    }, timeout=5.0)
    assert revoked.status_code == 200
    after = _initialize(rotated["access_token"])
    assert after.status_code == 401
    # A rejected token gets a challenge that tells the client to sign in again.
    assert 'error="invalid_token"' in after.headers["www-authenticate"]
    assert "resource_metadata=" in after.headers["www-authenticate"]


def test_connector_flow_end_to_end(test_server, oauth_on, web_login_token, test_team, test_project, access_log):
    # 0. Discovery, from nothing but the /mcp URL.
    challenge_scope, metadata = _discover()
    assert challenge_scope == "chaotic:write"
    assert metadata["registration_endpoint"] == f"{ORIGIN}/oauth/register"

    # 1. Dynamic client registration (a public client, loopback redirect).
    registered = httpx.post(metadata["registration_endpoint"], json={
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
    human = {"Authorization": f"Bearer {web_login_token}"}
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


def _connect(web_login_token, team_id, client_name="E2E Connector"):
    """Register a client, authorize, approve as the human and redeem the
    code. Returns (client_id, token response)."""
    registered = httpx.post(f"{ORIGIN}/oauth/register", json={
        "client_name": client_name, "redirect_uris": [REDIRECT],
    }, timeout=5.0)
    assert registered.status_code == 201, registered.text
    client_id = registered.json()["client_id"]
    authorize = httpx.get(f"{ORIGIN}/oauth/authorize", params={
        "client_id": client_id, "redirect_uri": REDIRECT, "response_type": "code",
        "code_challenge": CHALLENGE, "code_challenge_method": "S256",
        "scope": "chaotic:write offline_access", "resource": MCP_URL,
    }, timeout=5.0)
    assert authorize.status_code == 302, authorize.text
    request_id = authorize.headers["location"].rsplit("/", 1)[1]
    human = {"Authorization": f"Bearer {web_login_token}"}
    assert httpx.get(f"{ORIGIN}/api/oauth/requests/{request_id}", headers=human, timeout=5.0).status_code == 200
    approved = httpx.post(
        f"{ORIGIN}/api/oauth/requests/{request_id}/approve", json={"team_id": team_id}, headers=human, timeout=5.0,
    )
    assert approved.status_code == 200, approved.text
    code = parse_qs(urlsplit(approved.json()["redirect"]).query)["code"][0]
    exchanged = _token({
        "grant_type": "authorization_code", "client_id": client_id, "code": code,
        "redirect_uri": REDIRECT, "code_verifier": VERIFIER, "resource": MCP_URL,
    })
    assert exchanged.status_code == 200, exchanged.text
    return client_id, exchanged.json()


def test_connected_apps_list_and_revoke(test_server, oauth_on, web_login_token, test_team, api_client, auth_token2):
    """CHT-1523: the person who approved a connection sees it, through the
    CLI's client, and disconnecting it ends the app's access on its next
    request. Nobody else sees it or can revoke it. (The second user goes
    by raw HTTP: two CLI client fixtures patch the same module globals, so
    the later one would win for both.)"""
    client_id, tokens = _connect(web_login_token, test_team["id"])
    assert _initialize(tokens["access_token"]).status_code == 200

    [connection] = api_client.list_connections()
    assert connection["id"] == tokens["chaotic"]["holder_session_id"]
    assert connection["client"]["client_id"] == client_id and connection["client"]["name"] == "E2E Connector"
    assert connection["client"]["trust"] == "unverified"  # registered itself (DCR)
    assert connection["agent"]["id"] == tokens["chaotic"]["agent"]["id"]
    assert connection["team_id"] == test_team["id"] and connection["policy"] == "write"

    other = {"Authorization": f"Bearer {auth_token2}"}
    assert httpx.get(f"{ORIGIN}/api/oauth/connections", headers=other, timeout=5.0).json() == []
    stolen = httpx.delete(f"{ORIGIN}/api/oauth/connections/{connection['id']}", headers=other, timeout=5.0)
    assert stolen.status_code == 404
    assert _initialize(tokens["access_token"]).status_code == 200

    api_client.revoke_connection(connection["id"])
    assert api_client.list_connections() == []
    assert _initialize(tokens["access_token"]).status_code == 401
    dead = _token({"grant_type": "refresh_token", "client_id": client_id, "refresh_token": tokens["refresh_token"]})
    assert dead.status_code == 400 and dead.json()["error"] == "invalid_grant"


def test_token_endpoint_is_404_while_oauth_is_off(test_server):
    response = httpx.post(f"{ORIGIN}/oauth/token", data={"grant_type": "refresh_token"}, timeout=5.0)
    assert response.status_code == 404
