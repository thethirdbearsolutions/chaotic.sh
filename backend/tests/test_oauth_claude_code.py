"""Claude Code over HTTP with no key header (CHT-1521; design doc §1, §5).

`claude mcp add --transport http chaotic https://host/mcp` signs in with
OAuth: its client_id is a Client ID Metadata Document URL, and the code
comes back to a listener on a loopback port the OS picked. RFC 8252
§7.3 requires the authorization server to accept any port on a loopback
redirect, so the document registers both hosts without one.

The document below is the one claude.ai served on 2026-10-13, byte for
byte, so a change in its shape (a new field, a different host) is a
change this test should be updated for on purpose.
"""
import base64
import hashlib
from urllib.parse import parse_qs, urlsplit

import pytest

from app.config import get_settings
from app.oauth import cimd, ratelimit
from app.oxyde_models.oauth import OxydeOAuthAuthorizationRequest
from app.services import token_service as ts
from app.utils.security import WEB_LOGIN, WEB_LOGIN_CLAIM, create_access_token

BASE = "https://tracker.example.com"
MCP = BASE + "/mcp"
CLAUDE_CODE_CLIENT_ID = "https://claude.ai/oauth/claude-code-client-metadata"
CLAUDE_CODE_DOCUMENT = (
    b'{"client_id":"https://claude.ai/oauth/claude-code-client-metadata","client_name":"Claude Code",'
    b'"client_uri":"https://claude.ai","redirect_uris":["http://localhost/callback","http://127.0.0.1/callback"],'
    b'"grant_types":["authorization_code","refresh_token"],"response_types":["code"],'
    b'"token_endpoint_auth_method":"none"}'
)
VERIFIER = "claude-code-verifier-" + "k" * 43
FORM = {"Content-Type": "application/x-www-form-urlencoded"}


def _challenge(verifier=VERIFIER):
    return base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).rstrip(b"=").decode()


def _query(location):
    return {k: v[0] for k, v in parse_qs(urlsplit(location).query).items()}


@pytest.fixture
async def auth_headers(test_user):
    """Consent needs the web app's login, not conftest's CLI-style JWT."""
    token = create_access_token(data={"sub": test_user.id, WEB_LOGIN_CLAIM: WEB_LOGIN})
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def claude_code(monkeypatch):
    """OAuth on, and the metadata document served from claude.ai. Returns
    the list of URLs fetched."""
    monkeypatch.setenv("OAUTH_ENABLED", "true")
    monkeypatch.setenv("APP_BASE_URL", BASE)
    get_settings.cache_clear()
    ts._reset_for_tests()
    ratelimit.authorize_requests.clear()
    ratelimit.cimd_fetches.clear()
    fetched = []

    async def fetch(url):
        fetched.append(url)
        assert url == CLAUDE_CODE_CLIENT_ID
        return cimd.FetchedDocument(CLAUDE_CODE_DOCUMENT, "public, max-age=300")

    monkeypatch.setattr(cimd, "fetch", fetch)
    yield fetched
    get_settings.cache_clear()
    ts._reset_for_tests()
    ratelimit.authorize_requests.clear()
    ratelimit.cimd_fetches.clear()


async def _authorize(client, redirect_uri, **overrides):
    params = {
        "client_id": CLAUDE_CODE_CLIENT_ID, "redirect_uri": redirect_uri, "response_type": "code",
        "code_challenge": _challenge(), "code_challenge_method": "S256", "state": "cc-state",
        "scope": "chaotic:write offline_access", "resource": MCP, **overrides,
    }
    return await client.get("/oauth/authorize", params={k: v for k, v in params.items() if v is not None})


async def _token(client, data):
    return await client.post("/oauth/token", data=data, headers=FORM)


class TestLoopbackOnAnyPort:
    @pytest.mark.parametrize("host", ["localhost", "127.0.0.1"])
    @pytest.mark.parametrize("port", [1, 80, 8080, 33418, 65535])
    async def test_authorize_approve_exchange_refresh(
        self, client, claude_code, auth_headers, test_team, host, port,
    ):
        redirect_uri = f"http://{host}:{port}/callback"
        response = await _authorize(client, redirect_uri)
        assert response.status_code == 302, response.text
        request_id = response.headers["location"].rsplit("/", 1)[1]

        view = (await client.get(f"/api/oauth/requests/{request_id}", headers=auth_headers)).json()
        assert view["client"]["name"] == "Claude Code" and view["client"]["trust"] == "recognized"
        assert view["loopback_redirect"] is True and view["redirect_host"] == host

        approved = await client.post(
            f"/api/oauth/requests/{request_id}/approve", json={"team_id": test_team.id}, headers=auth_headers,
        )
        assert approved.status_code == 200, approved.text
        redirect = approved.json()["redirect"]
        # The code goes to exactly the port the client is listening on.
        assert redirect.startswith(redirect_uri + "?")
        query = _query(redirect)
        assert query["state"] == "cc-state" and query["iss"] == BASE

        exchanged = await _token(client, {
            "grant_type": "authorization_code", "client_id": CLAUDE_CODE_CLIENT_ID, "code": query["code"],
            "redirect_uri": redirect_uri, "code_verifier": VERIFIER, "resource": MCP,
        })
        assert exchanged.status_code == 200, exchanged.text
        tokens = exchanged.json()
        assert tokens["access_token"].startswith("cat_") and tokens["refresh_token"].startswith("crt_")

        refreshed = await _token(client, {
            "grant_type": "refresh_token", "client_id": CLAUDE_CODE_CLIENT_ID,
            "refresh_token": tokens["refresh_token"], "resource": MCP,
        })
        assert refreshed.status_code == 200, refreshed.text
        assert refreshed.json()["refresh_token"] != tokens["refresh_token"]

    @pytest.mark.parametrize("redirect_uri", ["http://localhost/callback", "http://127.0.0.1/callback"])
    async def test_the_registered_uri_itself(self, client, claude_code, redirect_uri):
        assert (await _authorize(client, redirect_uri)).status_code == 302

    async def test_one_fetch_serves_many_ports(self, client, claude_code):
        for port in (40001, 40002, 40003):
            assert (await _authorize(client, f"http://127.0.0.1:{port}/callback")).status_code == 302
        assert claude_code == [CLAUDE_CODE_CLIENT_ID]

    async def test_without_resource_or_offline_access(self, client, claude_code):
        """Neither is required: RFC 8707 resource is optional, and the
        challenge on /mcp asks only for chaotic:write."""
        response = await _authorize(client, "http://localhost:5555/callback", resource=None, scope="chaotic:write")
        assert response.status_code == 302, response.text

    @pytest.mark.parametrize("redirect_uri", [
        "http://[::1]:5000/callback",                      # a loopback host the document doesn't register
        "https://localhost:5000/callback",                 # the scheme is part of the registration
        "http://localhost:5000/other",                     # so is the path
        "http://localhost:5000/callback/",
        "http://localhost:5000/callback?x=1",
        "http://localhost:0/callback",                     # not a port
        "http://localhost:65536/callback",
        "http://localhost:5000@evil.example/callback",     # userinfo trick
        "http://localhost.evil.example:5000/callback",
        "http://127.0.0.2:5000/callback",                  # loopback, but not the registered name
        "http://LOCALHOST:5000/callback",                  # no case folding
    ])
    async def test_anything_else_is_an_error_page(self, client, claude_code, redirect_uri):
        """An unregistered redirect never gets a redirect (no open
        redirect, invariant I17), and stores nothing."""
        response = await _authorize(client, redirect_uri)
        assert response.status_code == 400, response.text
        assert "location" not in response.headers
        assert await OxydeOAuthAuthorizationRequest.objects.count() == 0
