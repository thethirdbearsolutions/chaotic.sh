"""/oauth/authorize and the consent API (CHT-1519; design doc §2.3):
validate-before-redirect (I17), the request bound to its first human
viewer, human-only approval (I18), agent create/choose, team and project
scope, policy, RFC 9207 iss, and the frame headers on the SPA shell.
"""
import base64
import hashlib
import json
from datetime import datetime, timedelta, timezone
from urllib.parse import parse_qs, urlsplit

import pytest

from app.config import get_settings
from app.enums import AgentKind, HolderVia, OAuthClientRegistration, TokenKind
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.oauth import OxydeAuthToken, OxydeOAuthAuthorizationRequest, OxydeOAuthClient
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.schemas.api_key import APIKeyCreate
from app.services.api_key_service import APIKeyService
from app.services.token_service import TokenService, _reset_for_tests
from app.services.oauth_consent_service import with_query
from app.oauth import ratelimit
from app.utils.security import WEB_LOGIN, WEB_LOGIN_CLAIM, create_access_token

from .oauth_tokens import NEAR_MISS_RESOURCES

BASE = "https://tracker.example.com"
REDIRECT = "https://app.example/cb"
LOOPBACK = "http://localhost/callback"
VERIFIER = "dBjftJeZ4CVP-mJ92K9-cLu7_Yyz0n2KfK_Prv8yWg2"  # 43+ chars


def _challenge(verifier=VERIFIER):
    return base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).rstrip(b"=").decode()


def _web_login(user):
    """The web app's login: a session JWT with the web-login claim."""
    token = create_access_token(data={"sub": user.id, WEB_LOGIN_CLAIM: WEB_LOGIN})
    return {"Authorization": f"Bearer {token}"}


# Consent requires the web app's login (review S1); these override
# conftest's, which mint a CLI-style session JWT. Both work everywhere else.
@pytest.fixture
async def auth_headers(test_user):
    return _web_login(test_user)


@pytest.fixture
async def auth_headers2(test_user2):
    return _web_login(test_user2)


@pytest.fixture
def oauth_on(monkeypatch):
    monkeypatch.setenv("OAUTH_ENABLED", "true")
    monkeypatch.setenv("APP_BASE_URL", BASE)
    monkeypatch.setenv("OAUTH_DCR_ENABLED", "true")
    get_settings.cache_clear()
    _reset_for_tests()
    ratelimit.authorize_requests.clear()
    ratelimit.cimd_fetches.clear()
    yield
    get_settings.cache_clear()
    _reset_for_tests()
    ratelimit.authorize_requests.clear()
    ratelimit.cimd_fetches.clear()


@pytest.fixture
async def oauth_client(client, oauth_on):
    response = await client.post("/oauth/register", json={
        "client_name": "Test App", "redirect_uris": [REDIRECT, LOOPBACK],
    })
    assert response.status_code == 201, response.text
    return response.json()["client_id"]


def _params(cid, **overrides):
    params = {
        "client_id": cid,
        "redirect_uri": REDIRECT,
        "response_type": "code",
        "code_challenge": _challenge(),
        "code_challenge_method": "S256",
        "state": "xyz",
        "scope": "chaotic:write offline_access",
        "resource": BASE + "/mcp",
    }
    params.update(overrides)
    return {k: v for k, v in params.items() if v is not None}


async def _authorize(client, cid, **overrides):
    return await client.get("/oauth/authorize", params=_params(cid, **overrides))


async def _request_id(client, cid, **overrides):
    response = await _authorize(client, cid, **overrides)
    assert response.status_code == 302, response.text
    location = response.headers["location"]
    assert location.startswith(BASE + "/oauth/consent/")
    return location.rsplit("/", 1)[1]


def _query(location):
    return {k: v[0] for k, v in parse_qs(urlsplit(location).query).items()}


# --- /oauth/authorize -----------------------------------------------------


class TestAuthorizeValidation:
    async def test_404_when_oauth_is_off(self, client, db):
        response = await client.get("/oauth/authorize", params={"client_id": "dcr_x"})
        assert response.status_code == 404

    async def test_success_stores_the_request_and_goes_to_consent(self, client, oauth_client):
        request_id = await _request_id(client, oauth_client)
        assert len(request_id) >= 22  # 128 bits, urlsafe
        row = await OxydeOAuthAuthorizationRequest.objects.get(id=request_id)
        assert row.client_id == oauth_client
        assert row.redirect_uri == REDIRECT
        assert row.state == "xyz"
        assert row.code_challenge == _challenge()
        assert row.resource == BASE + "/mcp"
        assert row.scope == "chaotic:write offline_access"
        assert row.bound_user_id is None and row.consumed_at is None
        assert timedelta(minutes=9) < row.expires_at - datetime.now(timezone.utc) <= timedelta(minutes=10)

    @pytest.mark.parametrize("client_id", [None, "", "dcr_unknown", "not-a-client", "http://app.example/meta"])
    async def test_unknown_client_renders_a_page_never_a_redirect(self, client, oauth_client, client_id):
        response = await _authorize(client, oauth_client, client_id=client_id)
        assert response.status_code == 400
        assert "location" not in response.headers
        assert response.headers["content-type"].startswith("text/html")
        assert response.headers["x-frame-options"] == "DENY"

    @pytest.mark.parametrize("redirect_uri", [
        None, "", "https://evil.example/cb", REDIRECT + "/", REDIRECT + "?x=1", "https://app.example:444/cb",
        "http://127.0.0.1:5000/callback", "javascript:alert(1)",
    ])
    async def test_unregistered_redirect_renders_a_page(self, client, oauth_client, redirect_uri):
        """I17: no redirect to a URI the client did not register."""
        response = await _authorize(client, oauth_client, redirect_uri=redirect_uri)
        assert response.status_code == 400
        assert "location" not in response.headers

    async def test_repeated_client_or_redirect_renders_a_page(self, client, oauth_client):
        response = await client.get(
            "/oauth/authorize?" + "&".join([
                f"client_id={oauth_client}", f"redirect_uri={REDIRECT}", "redirect_uri=https://evil.example/cb",
            ]),
        )
        assert response.status_code == 400 and "location" not in response.headers

    async def test_the_error_page_escapes_what_it_echoes(self, client, oauth_on, db):
        response = await client.get("/oauth/authorize", params={"client_id": "https://x.example/<script>"})
        assert response.status_code == 400
        assert "<script>" not in response.text

    async def test_loopback_redirect_on_any_port(self, client, oauth_client):
        await _request_id(client, oauth_client, redirect_uri="http://localhost:53682/callback")

    @pytest.mark.parametrize("overrides,error", [
        ({"response_type": "token"}, "unsupported_response_type"),
        ({"response_type": None}, "unsupported_response_type"),
        ({"code_challenge": None}, "invalid_request"),
        ({"code_challenge_method": None}, "invalid_request"),
        ({"code_challenge_method": "plain"}, "invalid_request"),
        ({"code_challenge": "too-short"}, "invalid_request"),
        ({"code_challenge": "a" * 42 + "="}, "invalid_request"),
        ({"resource": "https://other.example/mcp"}, "invalid_target"),
        ({"resource": BASE + "/api"}, "invalid_target"),
        ({"scope": "chaotic:write openid"}, "invalid_scope"),
        ({"scope": "chaotic:admin"}, "invalid_scope"),
        # The wildcard is never a scope on the wire (CHT-1562).
        ({"scope": "*"}, "invalid_scope"),
        ({"scope": "chaotic:write *"}, "invalid_scope"),
        # Only policies this server can't grant yet: refused here, never
        # upgraded to write and never a consent page that can't be
        # approved (review S2/Q1).
        ({"scope": "chaotic:read"}, "invalid_scope"),
        ({"scope": "chaotic:read offline_access"}, "invalid_scope"),
        ({"scope": "chaotic:triage chaotic:read"}, "invalid_scope"),
    ])
    async def test_other_errors_redirect_to_the_validated_uri(self, client, oauth_client, overrides, error):
        response = await _authorize(client, oauth_client, **overrides)
        assert response.status_code == 302
        location = response.headers["location"]
        assert location.startswith(REDIRECT + "?")
        query = _query(location)
        assert query["error"] == error
        assert query["state"] == "xyz"
        assert query["iss"] == BASE
        assert "code" not in query
        assert await OxydeOAuthAuthorizationRequest.objects.count() == 0

    async def test_repeated_parameter(self, client, oauth_client):
        params = list(_params(oauth_client).items()) + [("scope", "chaotic:read")]
        response = await client.get("/oauth/authorize", params=params)
        assert _query(response.headers["location"])["error"] == "invalid_request"

    async def test_overlong_state_is_not_echoed(self, client, oauth_client):
        response = await _authorize(client, oauth_client, state="s" * 1025)
        query = _query(response.headers["location"])
        assert query["error"] == "invalid_request" and "state" not in query

    @pytest.mark.parametrize("resource", [BASE, BASE + "/", BASE + "/mcp", BASE + "/mcp/", None])
    async def test_both_resource_values_are_accepted(self, client, oauth_client, resource):
        """CHT-1564: the root and /mcp identifiers, with and without a
        trailing slash; the connection is for /mcp either way."""
        request_id = await _request_id(client, oauth_client, resource=resource)
        assert (await OxydeOAuthAuthorizationRequest.objects.get(id=request_id)).resource == BASE + "/mcp"

    @pytest.mark.parametrize("resource", NEAR_MISS_RESOURCES)
    async def test_near_miss_resource_values_are_refused(self, client, oauth_client, resource):
        """CHT-1564 / PR #402 review L1, L2: one trailing slash is
        tolerated and nothing else is normalised."""
        response = await _authorize(client, oauth_client, resource=resource)
        assert response.status_code == 302
        assert _query(response.headers["location"])["error"] == "invalid_target"
        assert await OxydeOAuthAuthorizationRequest.objects.count() == 0

    @pytest.mark.parametrize("scope,stored", [
        (None, "chaotic:write"),
        ("", "chaotic:write"),
        ("offline_access", "chaotic:write offline_access"),
        ("chaotic:read chaotic:write chaotic:read", "chaotic:read chaotic:write"),
    ])
    async def test_scope_normalization(self, client, oauth_client, scope, stored):
        request_id = await _request_id(client, oauth_client, scope=scope)
        assert (await OxydeOAuthAuthorizationRequest.objects.get(id=request_id)).scope == stored

    async def test_expired_requests_are_swept(self, client, oauth_client):
        old = await _request_id(client, oauth_client)
        await OxydeOAuthAuthorizationRequest.objects.filter(id=old).update(
            expires_at=datetime.now(timezone.utc) - timedelta(seconds=1),
        )
        new = await _request_id(client, oauth_client)
        assert {r.id for r in await OxydeOAuthAuthorizationRequest.objects.all()} == {new}

    async def test_rate_limited_per_address(self, client, oauth_client, monkeypatch):
        monkeypatch.setenv("OAUTH_AUTHORIZE_MAX_PER_IP_PER_MINUTE", "2")
        get_settings.cache_clear()
        for _ in range(2):
            await _request_id(client, oauth_client)
        refused = await _authorize(client, oauth_client)
        assert refused.status_code == 429
        assert "location" not in refused.headers
        assert refused.headers["x-frame-options"] == "DENY"
        assert await OxydeOAuthAuthorizationRequest.objects.count() == 2

    @pytest.mark.parametrize("uri", [
        "javascript:alert(document.domain)//", "JavaScript:alert(1)//", "JAVASCRIPT:alert(1)//",
        "data:text/html,<script>alert(1)</script>", "vbscript:msgbox(1)", "http://app.example/cb",
    ])
    async def test_a_stored_dangerous_redirect_is_refused(self, client, oauth_on, db, uri):
        """B1, layer 2: a client row stored before the registration rules
        tightened (a cached metadata document) is checked again here."""
        cid = "https://app.example/meta"
        await OxydeOAuthClient.objects.create(
            id=cid, registration=OAuthClientRegistration.CIMD, client_name="Old",
            redirect_uris=json.dumps([uri]), token_endpoint_auth_method="none",
            fetched_at=datetime.now(timezone.utc),
            cache_expires_at=datetime.now(timezone.utc) + timedelta(hours=1),
        )
        response = await _authorize(client, cid, redirect_uri=uri)
        assert response.status_code == 400
        assert "location" not in response.headers
        assert await OxydeOAuthAuthorizationRequest.objects.count() == 0

    async def test_a_private_use_redirect_is_allowed_for_a_metadata_document(self, client, oauth_on, db):
        cid = "https://app.example/meta"
        await OxydeOAuthClient.objects.create(
            id=cid, registration=OAuthClientRegistration.CIMD, client_name="Native",
            redirect_uris=json.dumps(["com.example.app:/cb"]), token_endpoint_auth_method="none",
            fetched_at=datetime.now(timezone.utc),
            cache_expires_at=datetime.now(timezone.utc) + timedelta(hours=1),
        )
        await _request_id(client, cid, redirect_uri="com.example.app:/cb")

    async def test_existing_query_on_redirect_uri_is_kept(self):
        assert with_query("https://a.example/cb?x=1", {"code": "c", "state": None}) == "https://a.example/cb?x=1&code=c"
        assert with_query("https://a.example/cb", {}) == "https://a.example/cb"


# --- consent API ----------------------------------------------------------


@pytest.fixture
async def pending(client, oauth_client, test_team):
    return await _request_id(client, oauth_client)


class TestWhoMayConsent:
    async def test_no_login_is_401(self, client, pending):
        assert (await client.get(f"/api/oauth/requests/{pending}")).status_code == 401
        assert (await client.post(f"/api/oauth/requests/{pending}/approve", json={"team_id": "x"})).status_code == 401
        assert (await client.post(f"/api/oauth/requests/{pending}/deny")).status_code == 401

    async def test_an_agent_is_refused(self, client, pending, agent_headers, test_team):
        """I18, and S13: a prompt-injected agent can't approve its own access."""
        for method, path, body in [
            ("GET", "", None), ("POST", "/approve", {"team_id": test_team.id}), ("POST", "/deny", None),
        ]:
            response = await client.request(method, f"/api/oauth/requests/{pending}{path}", json=body,
                                             headers=agent_headers)
            assert response.status_code == 403
            assert response.json()["detail"]["error_code"] == "human_session_required"
        # Nor did reading bind it.
        assert (await OxydeOAuthAuthorizationRequest.objects.get(id=pending)).bound_user_id is None

    async def test_a_cli_login_is_refused(self, client, pending, test_user, test_team):
        """S1/S13: the CLI's `auth login` keeps a session JWT on disk where
        an agent running as the human can read it. It works for the rest
        of the API but not for consent, and a refused read doesn't bind."""
        cli = {"Authorization": f"Bearer {create_access_token(data={'sub': test_user.id})}"}
        for method, path, body in [
            ("GET", "", None), ("POST", "/approve", {"team_id": test_team.id}), ("POST", "/deny", None),
        ]:
            response = await client.request(method, f"/api/oauth/requests/{pending}{path}", json=body, headers=cli)
            assert response.status_code == 403, response.text
            assert response.json()["detail"]["error_code"] == "web_login_required"
        assert (await OxydeOAuthAuthorizationRequest.objects.get(id=pending)).bound_user_id is None
        assert (await client.get("/api/auth/me", headers=cli)).status_code == 200

    async def test_only_the_web_login_carries_the_claim(self, client, oauth_on, test_user):
        from app.utils.security import decode_token, is_web_login

        password = {"email": test_user.email, "password": "testpassword123"}
        cli = await client.post("/api/auth/login", json=password)
        web = await client.post("/api/auth/login", json={**password, "client": "web"})
        assert cli.status_code == web.status_code == 200, cli.text
        assert not is_web_login(cli.json()["access_token"])
        assert is_web_login(web.json()["access_token"])
        assert decode_token(web.json()["access_token"])["sub"] == test_user.id
        bogus = await client.post("/api/auth/login", json={**password, "client": "admin"})
        assert bogus.status_code == 422

    async def test_a_humans_api_key_is_refused(self, client, pending, test_user, test_team):
        _key, raw = await APIKeyService().create(test_user.id, APIKeyCreate(name="cli"))
        headers = {"Authorization": f"Bearer {raw}"}
        assert (await client.get(f"/api/oauth/requests/{pending}", headers=headers)).status_code == 403
        approve = await client.post(f"/api/oauth/requests/{pending}/approve", json={"team_id": test_team.id},
                                    headers=headers)
        assert approve.status_code == 403

    async def test_first_viewer_binds_it(self, client, pending, auth_headers, auth_headers2, test_team):
        assert (await client.get(f"/api/oauth/requests/{pending}", headers=auth_headers)).status_code == 200
        for method, path in [("GET", ""), ("POST", "/deny"), ("POST", "/approve")]:
            response = await client.request(
                method, f"/api/oauth/requests/{pending}{path}", headers=auth_headers2,
                json={"team_id": test_team.id} if path == "/approve" else None,
            )
            assert response.status_code == 404
        # Still pending for the binder.
        assert (await client.get(f"/api/oauth/requests/{pending}", headers=auth_headers)).status_code == 200

    async def test_expired_or_unknown_is_404(self, client, pending, auth_headers):
        await OxydeOAuthAuthorizationRequest.objects.filter(id=pending).update(
            expires_at=datetime.now(timezone.utc) - timedelta(seconds=1),
        )
        assert (await client.get(f"/api/oauth/requests/{pending}", headers=auth_headers)).status_code == 404
        assert (await client.get("/api/oauth/requests/nope", headers=auth_headers)).status_code == 404
        assert (await client.get("/api/oauth/requests/" + "a" * 65, headers=auth_headers)).status_code == 404

    async def test_404_when_oauth_is_turned_off(self, client, pending, auth_headers, monkeypatch):
        monkeypatch.setenv("OAUTH_ENABLED", "false")
        get_settings.cache_clear()
        assert (await client.get(f"/api/oauth/requests/{pending}", headers=auth_headers)).status_code == 404

    async def test_a_disabled_client_ends_its_requests(self, client, pending, oauth_client, auth_headers):
        await OxydeOAuthClient.objects.filter(id=oauth_client).update(is_active=False)
        assert (await client.get(f"/api/oauth/requests/{pending}", headers=auth_headers)).status_code == 404


class TestView:
    async def test_what_the_page_shows(self, client, pending, auth_headers, test_team, test_project, test_user):
        made = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Helper"}, headers=auth_headers)
        registrar = await client.post(f"/api/teams/{test_team.id}/agents",
                                      json={"name": "Registrar", "can_register": True}, headers=auth_headers)
        assert made.status_code == registrar.status_code == 201
        response = await client.get(f"/api/oauth/requests/{pending}", headers=auth_headers)
        assert response.status_code == 200, response.text
        body = response.json()
        assert body["client"]["name"] == "Test App"
        assert body["client"]["trust"] == "unverified"
        assert body["client"]["registration"] == "dcr"
        assert body["redirect_host"] == "app.example"
        assert body["loopback_redirect"] is False
        assert body["requested_scopes"] == ["chaotic:write", "offline_access"]
        assert body["offline_access"] is True
        assert (body["refresh_idle_days"], body["refresh_absolute_days"]) == (30, 90)
        policies = {p["name"]: p for p in body["policies"]}
        assert policies["write"] == {"name": "write", "requested": True, "available": True}
        assert policies["read"]["available"] is False
        (team,) = body["teams"]
        assert team["id"] == test_team.id
        assert [p["id"] for p in team["projects"]] == [test_project.id]
        # Registrars are never offered.
        assert [a["name"] for a in team["agents"]] == ["Helper"]
        assert body["default_agent_name"] == "Test App (Test User)"
        assert body["suggested_agent_id"] is None
        assert (await OxydeOAuthAuthorizationRequest.objects.get(id=pending)).bound_user_id == test_user.id

    async def test_only_teams_and_agents_the_viewer_has(
        self, client, oauth_client, test_team, auth_headers, test_user2, auth_headers2,
    ):
        other = await OxydeTeam.objects.create(name="Other", key="OTH")
        from app.enums import TeamRole
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user2.id, role=TeamRole.OWNER)
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        owners = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Owners"}, headers=auth_headers)
        mine = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Mine"}, headers=auth_headers2)
        assert owners.status_code == mine.status_code == 201
        request_id = await _request_id(client, oauth_client)
        body = (await client.get(f"/api/oauth/requests/{request_id}", headers=auth_headers2)).json()
        teams = {t["id"]: t for t in body["teams"]}
        assert set(teams) == {test_team.id, other.id}
        # A plain member manages only the agents they made.
        assert [a["name"] for a in teams[test_team.id]["agents"]] == ["Mine"]


class TestApprove:
    async def _approve(self, client, request_id, headers, **choice):
        return await client.post(f"/api/oauth/requests/{request_id}/approve", json=choice, headers=headers)

    async def test_new_agent_and_a_code_bound_to_everything(
        self, client, pending, oauth_client, auth_headers, test_team, test_user,
    ):
        response = await self._approve(client, pending, auth_headers, team_id=test_team.id)
        assert response.status_code == 200, response.text
        assert response.headers["cache-control"] == "no-store"
        body = response.json()
        assert body["redirect"].startswith(REDIRECT + "?")
        query = _query(body["redirect"])
        assert query["state"] == "xyz" and query["iss"] == BASE
        code = query["code"]
        assert code.startswith("cac_")

        agent = await OxydeUser.objects.get(id=body["agent_id"])
        assert agent.is_agent and agent.kind == AgentKind.ASSISTANT
        assert agent.parent_user_id == test_user.id and agent.agent_team_id == test_team.id
        assert agent.name == "Test App (Test User)"
        assert agent.external_ref == f"oauth:app.example:{test_user.id}"
        assert await OxydeAPIKey.objects.filter(principal_user_id=agent.id).count() == 0

        row = await OxydeAuthToken.objects.get(kind=TokenKind.AUTH_CODE)
        assert (row.principal_user_id, row.holder_user_id, row.team_id) == (agent.id, test_user.id, test_team.id)
        assert row.oauth_client_id == oauth_client
        assert row.code_challenge == _challenge()
        assert row.redirect_uri == REDIRECT
        assert row.resource == BASE + "/mcp"
        assert row.scopes == "chaotic:write offline_access"
        assert row.policy_name == "write"
        assert row.scope_project_ids is None
        assert row.auth_request_id == pending
        assert (await OxydeOAuthAuthorizationRequest.objects.get(id=pending)).consumed_at is not None
        assert (await OxydeOAuthClient.objects.get(id=oauth_client)).last_authorized_at is not None

        # The code starts a session for that agent (the CHT-1520 exchange).
        redeemed = await TokenService().redeem_single_use(code, TokenKind.AUTH_CODE, client_id=oauth_client)
        issued = await TokenService().start_session_from(redeemed)
        assert issued.refresh_token is not None
        validated = await TokenService().validate_access(issued.access_token, resource=BASE + "/mcp")
        assert validated.principal_user_id == agent.id and validated.via == HolderVia.OAUTH

    async def test_dcr_external_ref_uses_this_requests_redirect_host(
        self, client, oauth_client, auth_headers, test_team, test_user,
    ):
        """N2: the client registered app.example first, but this code goes
        to localhost."""
        request_id = await _request_id(client, oauth_client, redirect_uri=LOOPBACK)
        response = await self._approve(client, request_id, auth_headers, team_id=test_team.id)
        agent = await OxydeUser.objects.get(id=response.json()["agent_id"])
        assert agent.external_ref == f"oauth:localhost:{test_user.id}"

    async def test_single_use(self, client, pending, auth_headers, test_team):
        assert (await self._approve(client, pending, auth_headers, team_id=test_team.id)).status_code == 200
        assert (await self._approve(client, pending, auth_headers, team_id=test_team.id)).status_code == 404
        assert (await client.post(f"/api/oauth/requests/{pending}/deny", headers=auth_headers)).status_code == 404

    async def test_named_agent_and_projects(self, client, pending, auth_headers, test_team, test_project):
        response = await self._approve(client, pending, auth_headers, team_id=test_team.id,
                                       agent_name="  My Claude  ", project_ids=[test_project.id, test_project.id])
        assert response.status_code == 200, response.text
        assert (await OxydeUser.objects.get(id=response.json()["agent_id"])).name == "My Claude"
        row = await OxydeAuthToken.objects.get(kind=TokenKind.AUTH_CODE)
        assert row.scope_project_ids == f'["{test_project.id}"]'

    async def test_a_second_connection_gets_its_own_agent(self, client, oauth_client, auth_headers, test_team, test_user):
        first = await _request_id(client, oauth_client)
        second = await _request_id(client, oauth_client)
        a = (await self._approve(client, first, auth_headers, team_id=test_team.id, agent_name="One")).json()
        b = (await self._approve(client, second, auth_headers, team_id=test_team.id, agent_name="Two")).json()
        assert a["agent_id"] != b["agent_id"]
        assert (await OxydeUser.objects.get(id=b["agent_id"])).external_ref == f"oauth:app.example:{test_user.id}:2"

    async def test_existing_agent_the_viewer_manages(self, client, pending, auth_headers, test_team):
        made = (await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Claude MCP"},
                                  headers=auth_headers)).json()
        response = await self._approve(client, pending, auth_headers, team_id=test_team.id, agent_id=made["id"])
        assert response.status_code == 200, response.text
        assert response.json()["agent_id"] == made["id"]
        assert (await OxydeAuthToken.objects.get(kind=TokenKind.AUTH_CODE)).principal_user_id == made["id"]

    async def test_project_scoped_agent_narrows_the_connection(
        self, client, pending, auth_headers, test_team, test_project,
    ):
        made = (await client.post(f"/api/projects/{test_project.id}/agents", json={"name": "Scoped"},
                                  headers=auth_headers)).json()
        other = await OxydeProject.objects.create(team_id=test_team.id, name="Other", key="OTH", color="#000000")
        refused = await self._approve(client, pending, auth_headers, team_id=test_team.id, agent_id=made["id"],
                                      project_ids=[other.id])
        assert refused.status_code == 422
        assert refused.json()["detail"]["error_code"] == "agent_project_scope"
        ok = await self._approve(client, pending, auth_headers, team_id=test_team.id, agent_id=made["id"])
        assert ok.status_code == 200
        assert (await OxydeAuthToken.objects.get(kind=TokenKind.AUTH_CODE)).scope_project_ids == f'["{test_project.id}"]'

    async def test_agents_the_viewer_may_not_use(
        self, client, pending, auth_headers, auth_headers2, test_team, test_user2,
    ):
        from app.enums import TeamRole
        other = await OxydeTeam.objects.create(name="Other", key="OTH")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user2.id, role=TeamRole.OWNER)
        theirs = (await client.post(f"/api/teams/{other.id}/agents", json={"name": "Theirs"},
                                    headers=auth_headers2)).json()
        registrar = (await client.post(f"/api/teams/{test_team.id}/agents",
                                       json={"name": "Reg", "can_register": True}, headers=auth_headers)).json()
        made = (await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Made"},
                                  headers=auth_headers)).json()
        await client.post(f"/api/agents/{made['id']}/deactivate", headers=auth_headers)
        for agent_id in (theirs["id"], registrar["id"], made["id"], "missing"):
            response = await self._approve(client, pending, auth_headers, team_id=test_team.id, agent_id=agent_id)
            assert response.status_code == 403, agent_id
            assert response.json()["detail"]["error_code"] == "agent_not_allowed"
        # Refusals leave the request usable.
        assert (await self._approve(client, pending, auth_headers, team_id=test_team.id)).status_code == 200

    async def test_team_and_project_must_be_the_viewers(self, client, pending, auth_headers, test_team):
        other = await OxydeTeam.objects.create(name="Other", key="OTH")
        assert (await self._approve(client, pending, auth_headers, team_id=other.id)).status_code == 403
        elsewhere = await OxydeProject.objects.create(team_id=other.id, name="X", key="XX", color="#000000")
        response = await self._approve(client, pending, auth_headers, team_id=test_team.id, project_ids=[elsewhere.id])
        assert response.status_code == 422
        assert response.json()["detail"]["error_code"] == "project_not_in_team"

    async def test_an_out_of_scope_choice_answers_like_a_missing_one(
        self, client, pending, auth_headers, auth_headers2, test_team, test_user2,
    ):
        """Each id an approval names (team, agent, projects) gets the same
        answer for a row of a team the viewer is not in as for one that
        does not exist (CHT-1819; the out-of-scope guard in
        test_out_of_scope_is_not_found.py points here, since the consent
        request this needs is set up in this file)."""
        from app.enums import TeamRole
        other = await OxydeTeam.objects.create(name="Other", key="OTH")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user2.id, role=TeamRole.OWNER)
        theirs = (await client.post(f"/api/teams/{other.id}/agents", json={"name": "Theirs"},
                                    headers=auth_headers2)).json()
        elsewhere = await OxydeProject.objects.create(team_id=other.id, name="X", key="XX", color="#000000")
        for field, existing, choice in [
            ("team_id", other.id, lambda value: {"team_id": value}),
            ("agent_id", theirs["id"], lambda value: {"team_id": test_team.id, "agent_id": value}),
            ("project_ids", elsewhere.id, lambda value: {"team_id": test_team.id, "project_ids": [value]}),
        ]:
            seen = await self._approve(client, pending, auth_headers, **choice(existing))
            missing = await self._approve(client, pending, auth_headers, **choice("missing-id"))
            assert seen.status_code in (403, 422), (field, seen.text)
            assert (seen.status_code, seen.json()) == (missing.status_code, missing.json()), field
        # Refusals leave the request usable.
        assert (await self._approve(client, pending, auth_headers, team_id=test_team.id)).status_code == 200

    async def test_agent_may_not_take_a_members_name(self, client, pending, auth_headers, test_team):
        response = await self._approve(client, pending, auth_headers, team_id=test_team.id, agent_name="test user")
        assert response.status_code == 422
        assert response.json()["detail"]["error_code"] == "name_matches_member"

    @pytest.mark.parametrize("scope,policy,error_code", [
        # /oauth/authorize refuses a request with no grantable policy
        # (S2), so this one is written into the row directly: the service
        # check stays as the backstop.
        ("chaotic:read", "write", "policy_not_requested"),
        ("chaotic:read chaotic:write", "read", "policy_unavailable"),
        ("chaotic:write", "admin", "unknown_policy"),
    ])
    async def test_policy(self, client, oauth_client, auth_headers, test_team, scope, policy, error_code):
        request_id = await _request_id(client, oauth_client)
        await OxydeOAuthAuthorizationRequest.objects.filter(id=request_id).update(scope=scope)
        response = await self._approve(client, request_id, auth_headers, team_id=test_team.id, policy=policy)
        assert response.status_code == 422
        assert response.json()["detail"]["error_code"] == error_code

    async def test_without_offline_access_no_refresh_scope(self, client, oauth_client, auth_headers, test_team):
        request_id = await _request_id(client, oauth_client, scope="chaotic:write")
        assert (await self._approve(client, request_id, auth_headers, team_id=test_team.id)).status_code == 200
        assert (await OxydeAuthToken.objects.get(kind=TokenKind.AUTH_CODE)).scopes == "chaotic:write"

    async def test_reconnect_suggests_the_last_agent(self, client, oauth_client, auth_headers, test_team):
        first = await _request_id(client, oauth_client)
        approved = (await self._approve(client, first, auth_headers, team_id=test_team.id)).json()
        code = _query(approved["redirect"])["code"]
        await TokenService().start_session_from(await TokenService().redeem_single_use(code, TokenKind.AUTH_CODE, client_id=oauth_client))

        # The same client_id again: its last agent is pre-selected.
        request_id = await _request_id(client, oauth_client)
        body = (await client.get(f"/api/oauth/requests/{request_id}", headers=auth_headers)).json()
        assert (body["suggested_team_id"], body["suggested_agent_id"]) == (test_team.id, approved["agent_id"])
        # A fresh registration copying the name and loopback/redirect host
        # gets nothing: "new agent" stays the default (review N1/Q2).
        for uris in ([REDIRECT], [LOOPBACK]):
            copy = await client.post("/oauth/register", json={"client_name": "Test App", "redirect_uris": uris})
            request_id = await _request_id(client, copy.json()["client_id"], redirect_uri=uris[0])
            body = (await client.get(f"/api/oauth/requests/{request_id}", headers=auth_headers)).json()
            assert (body["suggested_team_id"], body["suggested_agent_id"]) == (None, None)

    async def test_a_suggested_agent_no_longer_usable_is_dropped(self, client, oauth_client, auth_headers, test_team):
        first = await _request_id(client, oauth_client)
        approved = (await self._approve(client, first, auth_headers, team_id=test_team.id)).json()
        code = _query(approved["redirect"])["code"]
        await TokenService().start_session_from(await TokenService().redeem_single_use(code, TokenKind.AUTH_CODE, client_id=oauth_client))
        await OxydeUser.objects.filter(id=approved["agent_id"]).update(is_active=False)
        request_id = await _request_id(client, oauth_client)
        body = (await client.get(f"/api/oauth/requests/{request_id}", headers=auth_headers)).json()
        assert body["suggested_agent_id"] is None and body["suggested_team_id"] == test_team.id


class TestApproveIsAtomic:
    async def test_a_failure_part_way_leaves_nothing_and_the_request_usable(
        self, client, pending, auth_headers, test_team, monkeypatch,
    ):
        """S3: consume, create the agent, mark the client and mint the code
        in one transaction."""
        agents_before = await OxydeUser.objects.filter(is_agent=True).count()

        async def broken(*args, **kwargs):
            raise RuntimeError("mint failed")
        monkeypatch.setattr(TokenService, "mint_single_use", broken)
        with pytest.raises(RuntimeError):
            await client.post(f"/api/oauth/requests/{pending}/approve", json={"team_id": test_team.id},
                              headers=auth_headers)
        row = await OxydeOAuthAuthorizationRequest.objects.get(id=pending)
        assert row.consumed_at is None
        assert await OxydeUser.objects.filter(is_agent=True).count() == agents_before
        assert (await OxydeOAuthClient.objects.get(id=row.client_id)).last_authorized_at is None

        monkeypatch.undo()
        retry = await client.post(f"/api/oauth/requests/{pending}/approve", json={"team_id": test_team.id},
                                  headers=auth_headers)
        assert retry.status_code == 200, retry.text


class TestExistingAgentDetails:
    async def test_owner_and_live_keys_are_shown(
        self, client, oauth_client, test_team, auth_headers, test_user, test_user2, auth_headers2,
    ):
        """Q2/N4: choosing an established agent is allowed, but the page
        says whose it is and that its API keys stay live."""
        from app.enums import TeamRole
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        mine = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Mine"}, headers=auth_headers)
        theirs = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Theirs"},
                                   headers=auth_headers2)
        assert mine.status_code == theirs.status_code == 201, mine.text
        # One more live key, one revoked and one expired, on Mine.
        mine_id = mine.json()["id"]
        live, _ = await APIKeyService().create(mine_id, APIKeyCreate(name="extra"), holder_user_id=test_user.id)
        dead, _ = await APIKeyService().create(mine_id, APIKeyCreate(name="dead"), holder_user_id=test_user.id)
        await OxydeAPIKey.objects.filter(id=dead.id).update(is_active=False)
        old, _ = await APIKeyService().create(mine_id, APIKeyCreate(name="old"), holder_user_id=test_user.id)
        await OxydeAPIKey.objects.filter(id=old.id).update(expires_at=datetime.now(timezone.utc) - timedelta(days=1))
        expected_live = await OxydeAPIKey.objects.filter(principal_user_id=mine_id, is_active=True).count() - 1

        request_id = await _request_id(client, oauth_client)
        body = (await client.get(f"/api/oauth/requests/{request_id}", headers=auth_headers)).json()
        agents = {a["name"]: a for a in body["teams"][0]["agents"]}
        assert agents["Mine"]["owned_by_viewer"] is True
        assert agents["Mine"]["owner_name"] == test_user.name
        assert agents["Mine"]["active_api_keys"] == expected_live >= 1
        # The owner (an admin) sees another member's agent, labelled as theirs.
        assert agents["Theirs"]["owned_by_viewer"] is False
        assert agents["Theirs"]["owner_name"] == test_user2.name
        # Still not pre-selected: "new agent" is the default.
        assert body["suggested_agent_id"] is None


class TestDeny:
    async def test_deny_redirects_with_access_denied(self, client, pending, auth_headers):
        response = await client.post(f"/api/oauth/requests/{pending}/deny", headers=auth_headers)
        assert response.status_code == 200
        query = _query(response.json()["redirect"])
        assert response.json()["redirect"].startswith(REDIRECT + "?")
        assert query["error"] == "access_denied"
        assert query["state"] == "xyz" and query["iss"] == BASE
        assert "code" not in query
        assert await OxydeAuthToken.objects.count() == 0
        assert (await client.get(f"/api/oauth/requests/{pending}", headers=auth_headers)).status_code == 404


class TestFraming:
    async def test_spa_shell_and_consent_route_refuse_framing(self, client, db):
        for path in ("/", "/oauth/consent/abc", "/issues"):
            response = await client.get(path)
            assert response.status_code == 200
            assert response.headers["x-frame-options"] == "DENY"
            assert response.headers["content-security-policy"] == "frame-ancestors 'none'"
            # The consent request id is in the path (review N5).
            assert response.headers["referrer-policy"] == "same-origin"

    async def test_cli_auth_refuses_framing(self, client, db):
        """It mints an API key on a click (review N6)."""
        response = await client.get("/cli-auth", params={"callback": "http://localhost:9/cb", "state": "s"})
        assert response.status_code == 200
        assert response.headers["x-frame-options"] == "DENY"
        assert response.headers["content-security-policy"] == "frame-ancestors 'none'"
        assert response.headers["referrer-policy"] == "no-referrer"


class TestDangerousStoredRequest:
    @pytest.mark.parametrize("uri", ["javascript:alert(1)//", "JavaScript:alert(1)//", "data:text/html,x"])
    async def test_approve_and_deny_never_return_one(
        self, client, oauth_client, auth_headers, test_team, test_user, uri,
    ):
        """B1, layer 3 on the server: a request row whose redirect is not
        one a browser should be sent to (written before the rules, or by
        hand) is answered 404, so the SPA has nothing to navigate to."""
        request_id = await _request_id(client, oauth_client)
        await OxydeOAuthAuthorizationRequest.objects.filter(id=request_id).update(redirect_uri=uri)
        for path, body in (("/deny", None), ("/approve", {"team_id": test_team.id})):
            response = await client.post(f"/api/oauth/requests/{request_id}{path}", json=body, headers=auth_headers)
            assert response.status_code == 404
            assert "javascript" not in response.text.lower()


class TestCIMDClientFlow:
    async def test_recognized_cimd_client(self, client, oauth_on, auth_headers, test_team, monkeypatch):
        """Claude Code: a CIMD client with port-agnostic loopback redirects."""
        import json as _json

        from app.oauth import cimd

        url = "https://claude.ai/oauth/claude-code-client-metadata"

        async def fetch(u):
            return cimd.FetchedDocument(_json.dumps({
                "client_id": url, "client_name": "Claude Code",
                "redirect_uris": ["http://localhost/callback", "http://127.0.0.1/callback"],
                "token_endpoint_auth_method": "none",
            }).encode(), "max-age=3600")
        monkeypatch.setattr(cimd, "fetch", fetch)
        request_id = await _request_id(client, url, redirect_uri="http://127.0.0.1:41234/callback")
        body = (await client.get(f"/api/oauth/requests/{request_id}", headers=auth_headers)).json()
        assert body["client"]["trust"] == "recognized" and body["client"]["host"] == "claude.ai"
        assert body["loopback_redirect"] is True and body["redirect_host"] == "127.0.0.1"
        approved = await client.post(f"/api/oauth/requests/{request_id}/approve", json={"team_id": test_team.id},
                                     headers=auth_headers)
        assert approved.json()["redirect"].startswith("http://127.0.0.1:41234/callback?code=cac_")
        agent = await OxydeUser.objects.get(id=approved.json()["agent_id"])
        assert agent.external_ref.startswith("oauth:claude.ai:")
