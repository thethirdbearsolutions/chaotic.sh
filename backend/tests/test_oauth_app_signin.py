"""The first-party native app's sign-in (CHT-1602): a built-in OAuth
client resolved from code, whose sessions (``HolderVia.APP``) act as the
person who consented, for the whole server (``<base>``: REST and /ws),
never at /mcp. And design D2 for everyone else: a CIMD or DCR client can
never get a human principal or the ``<base>`` resource.
"""
import base64
import hashlib
import json
import os
import re
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

import pytest
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ec

from app.auth.credentials import CredentialError, CredentialFailure, mcp_resolver, rest_resolver, ws_resolver
from app.config import get_settings
from app.enums import HolderVia, OAuthClientRegistration, TokenKind
from app.oauth import cimd, ratelimit
from app.oauth.builtin import ANDROID, BUILTIN_PREFIX
from app.oxyde_models.oauth import OxydeAuthToken, OxydeHolderSession, OxydeOAuthClient
from app.oxyde_models.push import OxydePushDevice
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.services import push_service
from app.services import token_service as ts
from app.services.credential_events import revoking
from app.services.oauth_grant_service import GrantError, OAuthGrantService
from app.services.revocation_service import RevocationService
from app.services.token_service import TokenError, TokenService
from app.utils.security import WEB_LOGIN, WEB_LOGIN_CLAIM, create_access_token

BASE = "https://tracker.example.com"
MCP = BASE + "/mcp"
APP_ID = ANDROID.client_id
APP_REDIRECT = "sh.chaotic.android:/oauth2redirect"
VERIFIER = "dBjftJeZ4CVP-mJ92K9-cLu7_Yyz0n2KfK_Prv8yWg2xyz"
FORM = {"Content-Type": "application/x-www-form-urlencoded"}
CIMD_ID = "https://apps.example.org/chaotic-clone.json"
REPO = Path(__file__).resolve().parents[2]


def _challenge(verifier=VERIFIER):
    return base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).rstrip(b"=").decode()


def _query(location):
    return {k: v[0] for k, v in parse_qs(urlsplit(location).query).items()}


@pytest.fixture
async def web_headers(test_user):
    token = create_access_token(data={"sub": test_user.id, WEB_LOGIN_CLAIM: WEB_LOGIN})
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def oauth_on(monkeypatch):
    monkeypatch.setenv("OAUTH_ENABLED", "true")
    monkeypatch.setenv("APP_BASE_URL", BASE)
    monkeypatch.setenv("OAUTH_DCR_ENABLED", "true")
    get_settings.cache_clear()
    ts._reset_for_tests()
    ratelimit.authorize_requests.clear()
    ratelimit.cimd_fetches.clear()
    yield
    get_settings.cache_clear()
    ts._reset_for_tests()
    ratelimit.authorize_requests.clear()
    ratelimit.cimd_fetches.clear()


@pytest.fixture
def no_fetch(monkeypatch):
    """Any CIMD fetch fails the test: the built-in client must never fetch."""
    calls = []

    async def fetch(url):
        calls.append(url)
        raise AssertionError(f"fetched {url}")

    monkeypatch.setattr(cimd, "fetch", fetch)
    return calls


async def _authorize(client, cid=APP_ID, *, redirect_uri=APP_REDIRECT, resource=BASE,
                     scope="chaotic:write offline_access"):
    params = {
        "client_id": cid, "redirect_uri": redirect_uri, "response_type": "code",
        "code_challenge": _challenge(), "code_challenge_method": "S256", "state": "s", "scope": scope,
    }
    if resource is not None:
        params["resource"] = resource
    return await client.get("/oauth/authorize", params=params)


async def _request_id(client, cid=APP_ID, **kwargs):
    response = await _authorize(client, cid, **kwargs)
    assert response.status_code == 302, response.text
    assert response.headers["location"].startswith(BASE + "/oauth/consent/")
    return response.headers["location"].rsplit("/", 1)[1]


async def _app_code(client, web_headers, **kwargs):
    """authorize -> consent approve for the app: nothing is chosen, it
    signs in account-wide."""
    request_id = await _request_id(client, **kwargs)
    approved = await client.post(f"/api/oauth/requests/{request_id}/approve", json={}, headers=web_headers)
    assert approved.status_code == 200, approved.text
    assert approved.json()["agent_id"] is None
    redirect = approved.json()["redirect"]
    assert redirect.startswith(APP_REDIRECT + "?code=cac_")
    return _query(redirect)["code"]


async def _exchange(client, code, **overrides):
    data = {
        "grant_type": "authorization_code", "client_id": APP_ID, "code": code,
        "redirect_uri": APP_REDIRECT, "code_verifier": VERIFIER, "resource": BASE,
        "device_name": "Pixel 8",
    }
    data.update(overrides)
    return await client.post("/oauth/token", data={k: v for k, v in data.items() if v is not None}, headers=FORM)


@pytest.fixture
async def app_tokens(client, oauth_on, no_fetch, web_headers, test_team):
    response = await _exchange(client, await _app_code(client, web_headers))
    assert response.status_code == 200, response.text
    return response.json()


def _bearer(token):
    return {"Authorization": f"Bearer {token}"}


async def _refused(resolver, token) -> CredentialError:
    with pytest.raises(CredentialError) as caught:
        await resolver.resolve(token)
    return caught.value


# --- the built-in client ------------------------------------------------------


class TestBuiltinClient:
    async def test_resolved_from_code_never_fetched(self, client, oauth_on, no_fetch, web_headers):
        request_id = await _request_id(client)
        assert no_fetch == []
        row = await OxydeOAuthClient.objects.get(id=APP_ID)
        assert row.registration == OAuthClientRegistration.BUILTIN
        assert json.loads(row.redirect_uris) == [APP_REDIRECT]
        view = (await client.get(f"/api/oauth/requests/{request_id}", headers=web_headers)).json()
        assert view["acts_as"] == "person"
        assert view["client"] == {
            "client_id": APP_ID, "name": "Chaotic for Android", "trust": "builtin", "host": None,
            "registration": "builtin",
        }
        assert view["teams"] == [] and view["suggested_team_id"] is None
        assert view["redirect_uri"] == APP_REDIRECT and view["loopback_redirect"] is False

    async def test_a_tampered_row_cannot_change_the_redirect(self, client, oauth_on, no_fetch):
        await _request_id(client)
        await OxydeOAuthClient.objects.filter(id=APP_ID).update(
            redirect_uris=json.dumps(["https://evil.example/cb"]), client_name="Evil",
        )
        response = await _authorize(client, redirect_uri="https://evil.example/cb")
        assert response.status_code == 400 and "not one this app registered" in response.text
        # And the next resolve rewrote the row from the constant.
        row = await OxydeOAuthClient.objects.get(id=APP_ID)
        assert json.loads(row.redirect_uris) == [APP_REDIRECT] and row.client_name == "Chaotic for Android"

    async def test_an_admin_disable_stands(self, client, oauth_on, no_fetch):
        await _request_id(client)
        await OxydeOAuthClient.objects.filter(id=APP_ID).update(is_active=False)
        response = await _authorize(client)
        assert response.status_code == 400 and "disabled" in response.text

    async def test_unknown_builtin_id(self, client, oauth_on, no_fetch):
        response = await _authorize(client, BUILTIN_PREFIX + "com.example.fake")
        assert response.status_code == 400 and "unknown client_id" in response.text

    @pytest.mark.parametrize("resource", [None, BASE, BASE + "/"])
    async def test_resource_is_the_whole_server(self, client, oauth_on, no_fetch, web_headers, resource):
        request_id = await _request_id(client, resource=resource)
        from app.oxyde_models.oauth import OxydeOAuthAuthorizationRequest
        assert (await OxydeOAuthAuthorizationRequest.objects.get(id=request_id)).resource == BASE

    async def test_the_mcp_resource_is_refused(self, client, oauth_on, no_fetch):
        response = await _authorize(client, resource=MCP)
        assert response.status_code == 302
        query = _query(response.headers["location"])
        assert response.headers["location"].startswith(APP_REDIRECT + "?")
        assert query["error"] == "invalid_target"

    async def test_published_metadata_matches_the_constant(self):
        published = json.loads((REPO / "website" / "oauth" / "android-client.json").read_text())
        assert published == ANDROID.metadata()

    async def test_the_android_app_redirects_where_this_server_accepts(self):
        # The app defines its redirect once, in android/app/build.gradle.kts
        # (CHT-1610); the manifest and BuildConfig derive from it. A change
        # on one side (CHT-1649's App Links move) must reach the other, or
        # every sign-in ends on the server's "redirect_uri is not one this
        # app registered" page.
        gradle = (REPO / "android" / "app" / "build.gradle.kts").read_text()
        found = re.findall(r'^val oauthRedirectUri = "([^"$]+)"$', gradle, re.MULTILINE)
        assert len(found) == 1, "android/app/build.gradle.kts must define oauthRedirectUri as one literal"
        assert found[0] in ANDROID.redirect_uris

    async def test_a_builtin_row_this_server_does_not_know_cannot_authenticate(self, oauth_on, db):
        await OxydeOAuthClient.objects.create(
            id=BUILTIN_PREFIX + "gone", registration=OAuthClientRegistration.BUILTIN, redirect_uris="[]",
        )
        with pytest.raises(GrantError) as caught:
            await OAuthGrantService().authenticate_client(BUILTIN_PREFIX + "gone", None)
        assert caught.value.error == "invalid_client"


# --- consent ------------------------------------------------------------------


class TestConsent:
    @pytest.mark.parametrize("extra", [
        {"team_id": "TEAM"}, {"agent_id": "x"}, {"agent_name": "Bot"}, {"project_ids": ["p"]},
    ])
    async def test_nothing_is_chosen(self, client, oauth_on, no_fetch, web_headers, test_team, extra):
        if extra.get("team_id") == "TEAM":
            extra = {"team_id": test_team.id}
        request_id = await _request_id(client)
        response = await client.post(
            f"/api/oauth/requests/{request_id}/approve", json=extra, headers=web_headers,
        )
        assert response.status_code == 422
        assert response.json()["detail"]["error_code"] == "app_signs_in_as_you"

    async def test_no_agent_is_created(self, client, oauth_on, no_fetch, web_headers, test_team):
        before = await OxydeUser.objects.filter(is_agent=True).count()
        await _app_code(client, web_headers)
        assert await OxydeUser.objects.filter(is_agent=True).count() == before

    async def test_needs_the_web_login(self, client, oauth_on, no_fetch, auth_headers):
        request_id = await _request_id(client)
        response = await client.get(f"/api/oauth/requests/{request_id}", headers=auth_headers)
        assert response.status_code == 403
        assert response.json()["detail"]["error_code"] == "web_login_required"

    async def test_a_person_in_no_team_can_sign_in(self, client, oauth_on, no_fetch, web_headers, test_user):
        response = await _exchange(client, await _app_code(client, web_headers))
        assert response.status_code == 200, response.text
        assert response.json()["chaotic"]["team_id"] is None

    async def test_a_connector_still_needs_a_team(self, client, oauth_on, web_headers):
        cid = (await _register(client)).json()["client_id"]
        request_id = await _request_id(client, cid, redirect_uri="https://app.example/cb", resource=MCP)
        response = await client.post(f"/api/oauth/requests/{request_id}/approve", json={}, headers=web_headers)
        assert response.status_code == 422
        assert response.json()["detail"]["error_code"] == "team_required"


# --- tokens -------------------------------------------------------------------


class TestAppSession:
    async def test_token_response_and_session(self, app_tokens, test_user, test_team):
        assert app_tokens["access_token"].startswith("cat_") and app_tokens["refresh_token"].startswith("crt_")
        chaotic = app_tokens["chaotic"]
        assert chaotic["acts_as"] == "person" and "agent" not in chaotic
        assert chaotic["person"] == {"id": test_user.id, "name": test_user.name, "email": test_user.email}
        assert chaotic["team_id"] is None and chaotic["project_ids"] is None
        session = await OxydeHolderSession.objects.get(id=chaotic["holder_session_id"])
        assert session.via == HolderVia.APP
        assert session.principal_user_id == session.holder_user_id == test_user.id
        assert session.resource == BASE and session.oauth_client_id == APP_ID and session.team_id is None
        assert json.loads(session.holder)["device_name"] == "Pixel 8"

    async def test_acts_as_the_person_on_rest(self, client, app_tokens, test_user, test_team):
        response = await client.get("/api/auth/me", headers=_bearer(app_tokens["access_token"]))
        assert response.status_code == 200, response.text
        assert response.json()["id"] == test_user.id
        teams = await client.get("/api/teams", headers=_bearer(app_tokens["access_token"]))
        assert teams.status_code == 200 and [t["id"] for t in teams.json()] == [test_team.id]

    async def test_accepted_on_ws_refused_at_mcp(self, app_tokens, test_user):
        token = app_tokens["access_token"]
        principal = await ws_resolver.resolve(token)
        assert principal.user.id == test_user.id and principal.is_app_session
        assert (await rest_resolver.resolve(token)).holder_via == HolderVia.APP
        err = await _refused(mcp_resolver, token)
        assert err.failure is CredentialFailure.INVALID
        assert "not issued for this resource" in err.detail

    async def test_refused_at_the_mcp_endpoint(self, client, app_tokens):
        response = await client.post("/mcp", json={}, headers=_bearer(app_tokens["access_token"]))
        assert response.status_code == 401
        assert 'error="invalid_token"' in response.headers["www-authenticate"]

    async def test_the_mcp_resource_is_refused_at_the_token_endpoint(
        self, client, oauth_on, no_fetch, web_headers, test_team,
    ):
        code = await _app_code(client, web_headers)
        response = await _exchange(client, code, resource=MCP)
        assert response.status_code == 400 and response.json()["error"] == "invalid_target"

    async def test_device_name_is_cleaned_and_optional(self, client, oauth_on, no_fetch, web_headers, test_team):
        code = await _app_code(client, web_headers)
        body = (await _exchange(client, code, device_name="  Pixel\x00 8\n\n" + "x" * 200)).json()
        session = await OxydeHolderSession.objects.get(id=body["chaotic"]["holder_session_id"])
        name = json.loads(session.holder)["device_name"]
        assert name.startswith("Pixel 8 x") and len(name) == 64
        code = await _app_code(client, web_headers)
        body = (await _exchange(client, code, device_name=None)).json()
        session = await OxydeHolderSession.objects.get(id=body["chaotic"]["holder_session_id"])
        assert "device_name" not in json.loads(session.holder)

    async def test_without_offline_access_no_refresh_token(self, client, oauth_on, no_fetch, web_headers, test_team):
        code = await _app_code(client, web_headers, scope="chaotic:write")
        body = (await _exchange(client, code)).json()
        assert "refresh_token" not in body

    async def test_refresh_rotates_and_reuse_revokes(self, client, app_tokens, monkeypatch, test_user):
        first = app_tokens["refresh_token"]
        rotated = await client.post("/oauth/token", data={
            "grant_type": "refresh_token", "client_id": APP_ID, "refresh_token": first, "resource": BASE,
        }, headers=FORM)
        assert rotated.status_code == 200, rotated.text
        assert rotated.json()["chaotic"]["acts_as"] == "person"
        new_access = rotated.json()["access_token"]
        assert (await rest_resolver.resolve(new_access)).user.id == test_user.id  # uses the successor
        # Past the grace window, a replay of the spent token is reuse.
        from datetime import datetime, timedelta, timezone
        await OxydeAuthToken.objects.filter(token_hash=ts.token_digest(first)).update(
            used_at=datetime.now(timezone.utc) - ts.REFRESH_GRACE - timedelta(seconds=5),
        )
        reused = await client.post("/oauth/token", data={
            "grant_type": "refresh_token", "client_id": APP_ID, "refresh_token": first,
        }, headers=FORM)
        assert reused.status_code == 400 and reused.json()["error"] == "invalid_grant"
        session = await OxydeHolderSession.objects.get(id=app_tokens["chaotic"]["holder_session_id"])
        assert session.revoked_at is not None and session.revoked_reason == ts.REASON_REFRESH_REUSE
        await _refused(rest_resolver, new_access)
        from app.oxyde_models.inbox import OxydeInboxEntry
        notice = await OxydeInboxEntry.objects.filter(recipient_user_id=test_user.id).order_by("-created_at").first()
        assert notice.title == "An app signed in as you was signed out"

    async def test_the_app_can_sign_itself_out(self, client, app_tokens):
        response = await client.post("/oauth/revoke", data={
            "client_id": APP_ID, "token": app_tokens["refresh_token"],
        }, headers=FORM)
        assert response.status_code == 200
        await _refused(rest_resolver, app_tokens["access_token"])

    @pytest.mark.parametrize("method,path,body", [
        ("post", "/api/api-keys", {"name": "from the phone"}),
        ("patch", "/api/users/me", {"name": "Renamed"}),
        ("delete", "/api/users/me", None),
    ])
    async def test_account_routes_refuse_an_app_session(self, client, app_tokens, method, path, body):
        kwargs = {"json": body} if body is not None else {}
        response = await getattr(client, method)(path, headers=_bearer(app_tokens["access_token"]), **kwargs)
        assert response.status_code == 403, response.text
        assert response.json()["detail"]["error_code"] == "app_session_refused"

    async def test_agent_key_routes_refuse_an_app_session(
        self, client, app_tokens, test_team, test_user, test_project,
    ):
        agent = await OxydeUser.objects.create(
            email="a@example.com", hashed_password="x", name="Bot", is_agent=True,
            parent_user_id=test_user.id, agent_team_id=test_team.id,
        )
        headers = _bearer(app_tokens["access_token"])
        for path, body in (
            (f"/api/teams/{test_team.id}/agents", {"name": "Phone bot"}),
            (f"/api/projects/{test_project.id}/agents", {"name": "Phone bot 2"}),
            (f"/api/agents/{agent.id}/keys", None),
            ("/api/agents/register", {"external_ref": "phone-session-1", "team_id": test_team.id}),
        ):
            response = await client.post(path, headers=headers, **({"json": body} if body else {}))
            assert response.status_code == 403, (path, response.text)
            assert response.json()["detail"]["error_code"] == "app_session_refused"

    async def test_access_granting_routes_refuse_an_app_session(
        self, client, app_tokens, auth_headers, test_team, test_user, test_user2,
    ):
        """PR #361 review M2: nothing that outlives the session, whoever
        it grants: invitations, accepting one, a new team, member roles,
        an agent's registrar capability, reactivating an agent."""
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role="MEMBER")
        agent = await OxydeUser.objects.create(
            email="r@example.com", hashed_password="x", name="Bot", is_agent=True, is_active=False,
            parent_user_id=test_user.id, agent_team_id=test_team.id,
        )
        invite = await client.post(
            f"/api/teams/{test_team.id}/invitations", json={"email": "someone@example.com"}, headers=auth_headers,
        )
        assert invite.status_code == 201, invite.text
        from app.oxyde_models.team import OxydeTeamInvitation
        invite_token = (await OxydeTeamInvitation.objects.get(id=invite.json()["id"])).token
        headers = _bearer(app_tokens["access_token"])
        refused = [
            ("post", f"/api/teams/{test_team.id}/invitations", {"email": "outsider@example.com", "role": "admin"}),
            ("post", f"/api/teams/invitations/{invite_token}/accept", None),
            ("post", "/api/teams", {"name": "Phone team", "key": "PHN"}),
            ("patch", f"/api/teams/{test_team.id}/members/{test_user2.id}", {"role": "admin"}),
            ("patch", f"/api/agents/{agent.id}", {"can_register": True}),
            ("post", f"/api/agents/{agent.id}/reactivate", None),
        ]
        for method, path, body in refused:
            response = await getattr(client, method)(path, headers=headers, **({"json": body} if body else {}))
            assert response.status_code == 403, (path, response.text)
            assert response.json()["detail"]["error_code"] == "app_session_refused", path
        member = await OxydeTeamMember.objects.get(team_id=test_team.id, user_id=test_user2.id)
        assert member.role.value == "member"
        # Renaming an agent creates nothing that outlives the session.
        renamed = await client.patch(f"/api/agents/{agent.id}", json={"name": "Renamed bot"}, headers=headers)
        assert renamed.status_code == 200, renamed.text

    async def test_an_app_session_cannot_manage_connected_apps(self, client, app_tokens):
        response = await client.get("/api/oauth/connections", headers=_bearer(app_tokens["access_token"]))
        assert response.status_code == 403
        assert response.json()["detail"]["error_code"] == "oauth_token_refused"

    async def test_inactive_person(self, app_tokens, test_user):
        await OxydeUser.objects.filter(id=test_user.id).update(is_active=False)
        err = await _refused(rest_resolver, app_tokens["access_token"])
        assert err.failure is CredentialFailure.INACTIVE

    async def test_leaving_a_team_keeps_the_session_but_not_the_team(
        self, client, app_tokens, test_user, test_team, test_project, test_user2,
    ):
        """Account-wide: leaving a team does not sign the device out, but
        that team is out of reach on the very next request, on REST and
        /ws, while the person's other teams stay reachable."""
        from app.ws_auth import CLOSE_FORBIDDEN, WsRefused, authenticate

        token = app_tokens["access_token"]
        headers = _bearer(token)
        other = await OxydeTeam.objects.create(name="Other", key="OTH")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user.id, role="MEMBER")
        assert (await client.get(f"/api/teams/{test_team.id}", headers=headers)).status_code == 200
        assert (await client.get(f"/api/projects/{test_project.id}", headers=headers)).status_code == 200
        assert (await authenticate(token, test_team.id)).user.id == test_user.id

        # Leave test_team, through the real path: its cascades run and
        # find nothing of the app's to revoke (the session has no team).
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role="OWNER")
        async with revoking():
            await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=test_user.id).delete()
            counts = await RevocationService().revoke_for_member(test_team.id, test_user.id, actor_id=None)
        assert counts.holder_sessions == 0
        session = await OxydeHolderSession.objects.get(id=app_tokens["chaotic"]["holder_session_id"])
        assert session.revoked_at is None

        assert (await client.get(f"/api/teams/{test_team.id}", headers=headers)).status_code == 403
        assert (await client.get(f"/api/projects/{test_project.id}", headers=headers)).status_code in (403, 404)
        listed = (await client.get("/api/teams", headers=headers)).json()
        assert [t["id"] for t in listed] == [other.id]
        with pytest.raises(WsRefused) as refused:
            await authenticate(token, test_team.id)
        assert refused.value.code == CLOSE_FORBIDDEN
        # The rest of the account still works.
        assert (await client.get(f"/api/teams/{other.id}", headers=headers)).status_code == 200
        assert (await authenticate(token, other.id)).user.id == test_user.id

    async def test_a_team_deleted_does_not_sign_the_device_out(self, app_tokens, test_user, test_team):
        async with revoking():
            await RevocationService().revoke_for_team(test_team.id, actor_id=None)
        await OxydeTeam.objects.filter(id=test_team.id).delete()
        assert (await rest_resolver.resolve(app_tokens["access_token"])).user.id == test_user.id

    async def test_deactivating_the_person_ends_it(self, app_tokens, test_user):
        async with revoking():
            await OxydeUser.objects.filter(id=test_user.id).update(is_active=False)
            counts = await RevocationService().revoke_for_principals([test_user.id], actor_id=None)
        assert counts.holder_sessions == 1
        await _refused(rest_resolver, app_tokens["access_token"])

    async def test_the_interactive_human_exemption_applies(
        self, client, app_tokens, auth_headers, test_project, test_issue,
    ):
        """Like the web app, the app sends X-Chaotic-Interactive: 1 and is
        treated as an interactive human (CHT-1302): here, claiming without
        an estimate where the project requires one. Without the header it
        is gated like any non-interactive caller."""
        response = await client.patch(
            f"/api/projects/{test_project.id}", headers=auth_headers, json={"require_estimate_on_claim": True},
        )
        assert response.status_code == 200
        headers = _bearer(app_tokens["access_token"])
        gated = await client.patch(f"/api/issues/{test_issue.id}", headers=headers, json={"status": "in_progress"})
        assert gated.status_code == 400, gated.text
        exempt = await client.patch(
            f"/api/issues/{test_issue.id}", headers={**headers, "X-Chaotic-Interactive": "1"},
            json={"status": "in_progress"},
        )
        assert exempt.status_code == 200, exempt.text
        assert exempt.json()["status"] == "in_progress"


# --- Connected apps -----------------------------------------------------------


@pytest.fixture
def fake_dns(monkeypatch):
    async def resolve(host):
        return ["93.184.216.34"]

    monkeypatch.setattr(push_service, "_resolve", resolve)


def _push_body():
    point = ec.generate_private_key(ec.SECP256R1()).public_key().public_bytes(
        serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint,
    )
    b64 = lambda raw: base64.urlsafe_b64encode(raw).rstrip(b"=").decode()  # noqa: E731
    return {"endpoint": "https://ntfy.example.net/upAbC123", "p256dh": b64(point), "auth": b64(os.urandom(16)),
            "platform": "android", "label": "Pixel 8"}


class TestConnectedApps:
    async def test_listed_per_device(self, client, app_tokens, web_headers, test_team):
        listed = (await client.get("/api/oauth/connections", headers=web_headers)).json()
        assert len(listed) == 1
        row = listed[0]
        assert row["id"] == app_tokens["chaotic"]["holder_session_id"]
        assert row["acts_as"] == "person" and row["agent"] is None and row["device_name"] == "Pixel 8"
        assert row["client"]["trust"] == "builtin" and row["client"]["name"] == "Chaotic for Android"
        assert row["team_id"] is None and row["team_name"] is None

    async def test_revoking_a_device_signs_it_out_and_deletes_its_push_registration(
        self, client, app_tokens, web_headers, fake_dns,
    ):
        token = app_tokens["access_token"]
        install = "3f1d2c4b-0000-4000-8000-000000000001"
        registered = await client.put(f"/api/push/devices/{install}", json=_push_body(), headers=_bearer(token))
        assert registered.status_code in (200, 201), registered.text
        session_id = app_tokens["chaotic"]["holder_session_id"]
        assert await OxydePushDevice.objects.filter(holder_session_id=session_id).count() == 1

        response = await client.delete(f"/api/oauth/connections/{session_id}", headers=web_headers)
        assert response.status_code == 204
        assert await OxydePushDevice.objects.filter(holder_session_id=session_id).count() == 0
        await _refused(rest_resolver, token)
        assert (await client.get("/api/oauth/connections", headers=web_headers)).json() == []

    async def test_someone_elses_device_is_404(self, client, app_tokens, test_user2, auth_headers2):
        session_id = app_tokens["chaotic"]["holder_session_id"]
        response = await client.delete(f"/api/oauth/connections/{session_id}", headers=auth_headers2)
        assert response.status_code == 404


# --- D2: every other client still acts as an agent, at /mcp ------------------


async def _register(client, **metadata):
    body = {"client_name": "Chaotic for Android", "redirect_uris": ["https://app.example/cb"], **metadata}
    return await client.post("/oauth/register", json=body)


@pytest.fixture
def cimd_clone(monkeypatch):
    """A CIMD document that copies the app's name and redirect."""
    async def fetch(url):
        return cimd.FetchedDocument(json.dumps({
            "client_id": CIMD_ID, "client_name": "Chaotic for Android",
            "redirect_uris": [APP_REDIRECT], "token_endpoint_auth_method": "none",
        }).encode(), "max-age=3600")

    monkeypatch.setattr(cimd, "fetch", fetch)


class TestOtherClientsStayAgents:
    async def test_dcr_cannot_take_the_apps_redirect(self, client, oauth_on):
        response = await _register(client, redirect_uris=[APP_REDIRECT])
        assert response.status_code == 400 and response.json()["error"] == "invalid_redirect_uri"

    async def test_dcr_client_asking_for_the_whole_server_gets_an_agent_at_mcp(
        self, client, oauth_on, web_headers, test_team, test_user,
    ):
        cid = (await _register(client)).json()["client_id"]
        request_id = await _request_id(client, cid, redirect_uri="https://app.example/cb", resource=BASE)
        view = (await client.get(f"/api/oauth/requests/{request_id}", headers=web_headers)).json()
        assert view["acts_as"] == "agent"
        approved = await client.post(
            f"/api/oauth/requests/{request_id}/approve", json={"team_id": test_team.id}, headers=web_headers,
        )
        code = _query(approved.json()["redirect"])["code"]
        body = (await client.post("/oauth/token", data={
            "grant_type": "authorization_code", "client_id": cid, "code": code,
            "redirect_uri": "https://app.example/cb", "code_verifier": VERIFIER, "resource": BASE,
            "device_name": "Pixel 8",
        }, headers=FORM)).json()
        assert body["chaotic"]["acts_as"] == "agent" and body["chaotic"]["agent"]["id"] != test_user.id
        session = await OxydeHolderSession.objects.get(id=body["chaotic"]["holder_session_id"])
        assert session.via == HolderVia.OAUTH and session.resource == MCP
        assert "device_name" not in json.loads(session.holder)
        await _refused(rest_resolver, body["access_token"])
        assert (await mcp_resolver.resolve(body["access_token"])).user.is_agent

    async def test_cimd_clone_of_the_app_gets_an_agent(
        self, client, oauth_on, cimd_clone, web_headers, test_team, test_user,
    ):
        request_id = await _request_id(client, CIMD_ID, resource=BASE)
        view = (await client.get(f"/api/oauth/requests/{request_id}", headers=web_headers)).json()
        assert view["acts_as"] == "agent" and view["client"]["trust"] == "cimd"
        # Asking to be the person is not an option the endpoint has.
        approved = await client.post(
            f"/api/oauth/requests/{request_id}/approve", json={"team_id": test_team.id}, headers=web_headers,
        )
        assert approved.status_code == 200
        assert approved.json()["agent_id"] not in (None, test_user.id)
        session_code = _query(approved.json()["redirect"])["code"]
        row = await OxydeAuthToken.objects.get(token_hash=ts.token_digest(session_code))
        assert row.resource == MCP and row.principal_user_id != test_user.id

    async def test_mint_refuses_a_person_or_the_base_resource_for_other_clients(self, oauth_on, test_team, test_user):
        service = TokenService()
        common = dict(team_id=test_team.id, holder_user_id=test_user.id, code_challenge="c", redirect_uri="x")
        agent = await OxydeUser.objects.create(
            email="a2@example.com", hashed_password="x", name="Bot", is_agent=True,
            parent_user_id=test_user.id, agent_team_id=test_team.id,
        )
        for cid in (CIMD_ID, "dcr_abc"):
            with pytest.raises(ValueError, match="design D2"):
                await service.mint_single_use(TokenKind.AUTH_CODE, principal_user_id=test_user.id, resource=MCP,
                                              oauth_client_id=cid, **common)
            with pytest.raises(ValueError, match="design D2"):
                await service.mint_single_use(TokenKind.AUTH_CODE, principal_user_id=agent.id, resource=BASE,
                                              oauth_client_id=cid, **common)
            with pytest.raises(ValueError, match="design D2"):  # a connector acts in a team
                await service.mint_single_use(TokenKind.AUTH_CODE, principal_user_id=agent.id, resource=MCP,
                                              oauth_client_id=cid, **{**common, "team_id": None})
        # And the built-in client never acts as anyone but the consenting
        # human, account-wide, for <base>.
        app = {**common, "team_id": None}
        for bad in (
            dict(principal_user_id=agent.id, resource=BASE, **app),
            dict(principal_user_id=test_user.id, resource=MCP, **app),
            dict(principal_user_id=test_user.id, resource=BASE, **common),  # with a team
        ):
            with pytest.raises(ValueError, match="built-in"):
                await service.mint_single_use(TokenKind.AUTH_CODE, oauth_client_id=APP_ID, **bad)

    async def test_a_forged_code_does_not_start_a_person_session(self, oauth_on, test_team, test_user, db):
        """A code row altered in the database to name the human starts nothing."""
        await OxydeOAuthClient.objects.create(
            id="dcr_forged", registration=OAuthClientRegistration.DCR, redirect_uris='["https://app.example/cb"]',
        )
        agent = await OxydeUser.objects.create(
            email="a3@example.com", hashed_password="x", name="Bot", is_agent=True,
            parent_user_id=test_user.id, agent_team_id=test_team.id,
        )
        service = TokenService()
        row, code = await service.mint_single_use(
            TokenKind.AUTH_CODE, team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id,
            resource=MCP, oauth_client_id="dcr_forged", code_challenge="c", redirect_uri="https://app.example/cb",
        )
        await OxydeAuthToken.objects.filter(id=row.id).update(principal_user_id=test_user.id, resource=BASE)
        redeemed = await service.redeem_single_use(code, TokenKind.AUTH_CODE, client_id="dcr_forged")
        with pytest.raises(TokenError) as caught:
            await service.start_session_from(redeemed)
        assert caught.value.error == "invalid_grant"
        assert await OxydeHolderSession.objects.filter(principal_user_id=test_user.id).count() == 0

    async def test_a_forged_app_session_of_another_client_is_refused(self, client, app_tokens, test_team):
        """The resolver's own check: an APP session must be the built-in
        client's, whatever its via says."""
        other = await OxydeOAuthClient.objects.create(
            id="dcr_other", registration=OAuthClientRegistration.DCR, redirect_uris="[]",
        )
        session_id = app_tokens["chaotic"]["holder_session_id"]
        await OxydeHolderSession.objects.filter(id=session_id).update(oauth_client_id=other.id)
        await _refused(rest_resolver, app_tokens["access_token"])

    async def test_a_forged_app_session_acting_as_someone_else_is_refused(
        self, client, app_tokens, test_user2, test_team,
    ):
        session_id = app_tokens["chaotic"]["holder_session_id"]
        await OxydeHolderSession.objects.filter(id=session_id).update(principal_user_id=test_user2.id)
        await _refused(rest_resolver, app_tokens["access_token"])

    async def test_a_forged_app_session_with_a_team_is_refused(self, client, app_tokens, test_team):
        """An app session is account-wide; one that names a team is not one."""
        session_id = app_tokens["chaotic"]["holder_session_id"]
        await OxydeHolderSession.objects.filter(id=session_id).update(team_id=test_team.id)
        await _refused(rest_resolver, app_tokens["access_token"])

    async def test_an_agent_connector_is_never_an_app_session(self, client, oauth_on, test_team, test_user, db):
        """And the other way round: an OAUTH session forged to via APP but
        acting as an agent is refused."""
        from .oauth_tokens import connector_token, make_agent

        agent = await make_agent(test_team, test_user)
        issued = await connector_token(agent, test_team, test_user)
        await OxydeHolderSession.objects.filter(id=issued.holder_session_id).update(via=HolderVia.APP)
        await _refused(mcp_resolver, issued.access_token)
        await _refused(rest_resolver, issued.access_token)
