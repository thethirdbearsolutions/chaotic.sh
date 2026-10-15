"""/oauth/token and /oauth/revoke (CHT-1520; design doc §2.4, RFC 6749,
RFC 7636, RFC 7009, RFC 8707): the code exchange with PKCE S256 and its
bindings, code reuse, refresh rotation and reuse, client authentication
by registered method, revocation, no-store, form bodies only and no
secrets in the URL (CHT-1570), no ambient auth (CHT-1564), and the
OAUTH_ENABLED gate.
"""
import asyncio
import base64
import contextlib
import hashlib
import logging
import re
from datetime import datetime, timedelta, timezone
from urllib.parse import parse_qs, urlsplit

import httpx
import pytest

from app.config import get_settings
from app.enums import HolderVia, TokenKind
from app.oauth import ratelimit
from app.oxyde_models.oauth import OxydeAuthToken, OxydeHolderSession, OxydeOAuthClient
from app.services import token_service as ts
from app.services.token_service import TokenError, TokenService
from app.utils.security import WEB_LOGIN, WEB_LOGIN_CLAIM, create_access_token

from .oauth_tokens import NEAR_MISS_RESOURCES, credential_tripwire

BASE = "https://tracker.example.com"
MCP = BASE + "/mcp"
REDIRECT = "https://app.example/cb"
LOOPBACK = "http://localhost/callback"
VERIFIER = "dBjftJeZ4CVP-mJ92K9-cLu7_Yyz0n2KfK_Prv8yWg2xyz"
FORM = {"Content-Type": "application/x-www-form-urlencoded"}


def _challenge(verifier=VERIFIER):
    return base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).rstrip(b"=").decode()


def _query(location):
    return {k: v[0] for k, v in parse_qs(urlsplit(location).query).items()}


@pytest.fixture
async def auth_headers(test_user):
    """Consent needs the web app's login (the web-login claim); this
    overrides conftest's CLI-style session JWT. The token endpoint itself
    takes no login of any kind."""
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


async def _register(client, **metadata):
    body = {"client_name": "Test App", "redirect_uris": [REDIRECT, LOOPBACK], **metadata}
    response = await client.post("/oauth/register", json=body)
    assert response.status_code == 201, response.text
    return response.json()


@pytest.fixture
async def public_client(client, oauth_on):
    return (await _register(client))["client_id"]


@pytest.fixture
async def confidential_client(client, oauth_on):
    registered = await _register(client, token_endpoint_auth_method="client_secret_post")
    return registered["client_id"], registered["client_secret"]


async def _code(client, cid, auth_headers, team_id, *, redirect_uri=REDIRECT, scope="chaotic:write offline_access",
                verifier=VERIFIER, **approval):
    """register -> authorize -> consent approve, through the endpoints:
    returns the authorization code."""
    response = await client.get("/oauth/authorize", params={
        "client_id": cid, "redirect_uri": redirect_uri, "response_type": "code",
        "code_challenge": _challenge(verifier), "code_challenge_method": "S256", "state": "s",
        "scope": scope, "resource": MCP,
    })
    assert response.status_code == 302, response.text
    request_id = response.headers["location"].rsplit("/", 1)[1]
    approved = await client.post(
        f"/api/oauth/requests/{request_id}/approve", json={"team_id": team_id, **approval}, headers=auth_headers,
    )
    assert approved.status_code == 200, approved.text
    return _query(approved.json()["redirect"])["code"]


async def _token(client, data, headers=None, **kwargs):
    return await client.post("/oauth/token", data=data, headers={**FORM, **(headers or {})}, **kwargs)


def _exchange(cid, code, **overrides):
    data = {
        "grant_type": "authorization_code", "client_id": cid, "code": code,
        "redirect_uri": REDIRECT, "code_verifier": VERIFIER, "resource": MCP,
    }
    data.update(overrides)
    return {k: v for k, v in data.items() if v is not None}


def _assert_error(response, status, error):
    assert response.status_code == status, response.text
    assert response.json()["error"] == error
    assert response.headers["cache-control"] == "no-store"


# --- authorization_code ------------------------------------------------------


class TestCodeExchange:
    async def test_full_flow(self, client, public_client, auth_headers, test_team, test_user):
        code = await _code(client, public_client, auth_headers, test_team.id)
        response = await _token(client, _exchange(public_client, code), headers={"User-Agent": "TestClient/1"})
        assert response.status_code == 200, response.text
        assert response.headers["cache-control"] == "no-store"
        assert response.headers["pragma"] == "no-cache"
        body = response.json()
        assert body["token_type"] == "Bearer"
        assert body["access_token"].startswith("cat_") and body["refresh_token"].startswith("crt_")
        assert 590 <= body["expires_in"] <= 600
        assert body["scope"] == "chaotic:write offline_access"
        chaotic = body["chaotic"]
        assert chaotic["team_id"] == test_team.id and chaotic["project_ids"] is None
        assert chaotic["agent"]["kind"] == "assistant"
        assert chaotic["agent"]["name"] == "Test App (Test User)"

        session = await OxydeHolderSession.objects.get(id=chaotic["holder_session_id"])
        assert session.via == HolderVia.OAUTH
        assert session.principal_user_id == chaotic["agent"]["id"]
        assert session.holder_user_id == test_user.id
        assert session.oauth_client_id == public_client
        assert '"client_name": "Test App"' in session.holder
        assert "TestClient" not in session.holder  # only a digest of the user agent

        validated = await TokenService().validate_access(body["access_token"], resource=MCP)
        assert validated.principal_user_id == chaotic["agent"]["id"]
        assert validated.holder_session_id == session.id

    async def test_without_offline_access_no_refresh_token(self, client, public_client, auth_headers, test_team):
        code = await _code(client, public_client, auth_headers, test_team.id, scope="chaotic:write")
        body = (await _token(client, _exchange(public_client, code))).json()
        assert "refresh_token" not in body
        assert body["scope"] == "chaotic:write"

    async def test_project_scope_is_reported(self, client, public_client, auth_headers, test_team, test_project):
        code = await _code(client, public_client, auth_headers, test_team.id, project_ids=[test_project.id])
        body = (await _token(client, _exchange(public_client, code))).json()
        assert body["chaotic"]["project_ids"] == [test_project.id]

    async def test_resource_is_optional_and_both_values_are_accepted(
        self, client, public_client, auth_headers, test_team,
    ):
        """CHT-1564: either published identifier, with or without the
        trailing slash, or none."""
        for resource in (None, MCP, MCP + "/", BASE, BASE + "/"):
            code = await _code(client, public_client, auth_headers, test_team.id)
            response = await _token(client, _exchange(public_client, code, resource=resource))
            assert response.status_code == 200, (resource, response.text)

    async def test_wrong_resource(self, client, public_client, auth_headers, test_team):
        code = await _code(client, public_client, auth_headers, test_team.id)
        _assert_error(
            await _token(client, _exchange(public_client, code, resource="https://other.example/mcp")),
            400, "invalid_target",
        )

    @pytest.mark.parametrize("resource", NEAR_MISS_RESOURCES)
    async def test_near_miss_resource_values_are_refused(self, client, public_client, auth_headers, test_team, resource):
        """CHT-1564 at the code exchange, as at refresh (review L1)."""
        code = await _code(client, public_client, auth_headers, test_team.id)
        _assert_error(await _token(client, _exchange(public_client, code, resource=resource)), 400, "invalid_target")
        assert await OxydeHolderSession.objects.count() == 0

    async def test_resource_mismatch_with_the_code(self, client, public_client, auth_headers, test_team):
        code = await _code(client, public_client, auth_headers, test_team.id)
        # A code whose stored resource is not /mcp (no consent mints one
        # today; a claim grant's would be the whole server).
        await OxydeAuthToken.objects.filter(kind=TokenKind.AUTH_CODE).update(resource=BASE)
        _assert_error(await _token(client, _exchange(public_client, code)), 400, "invalid_target")
        assert await OxydeHolderSession.objects.count() == 0

    async def test_pkce_failure_spends_the_code(self, client, public_client, auth_headers, test_team):
        code = await _code(client, public_client, auth_headers, test_team.id)
        wrong = "x" * 43
        _assert_error(await _token(client, _exchange(public_client, code, code_verifier=wrong)), 400, "invalid_grant")
        # The right verifier no longer helps: one guess per code.
        _assert_error(await _token(client, _exchange(public_client, code)), 400, "invalid_grant")
        assert await OxydeHolderSession.objects.count() == 0

    @pytest.mark.parametrize("verifier", ["short", "x" * 129, "has space" + "x" * 40, "é" * 43])
    async def test_malformed_verifier(self, client, public_client, auth_headers, test_team, verifier):
        code = await _code(client, public_client, auth_headers, test_team.id)
        _assert_error(await _token(client, _exchange(public_client, code, code_verifier=verifier)),
                      400, "invalid_request")
        # A malformed request does not touch the code.
        assert (await _token(client, _exchange(public_client, code))).status_code == 200

    async def test_redirect_uri_must_be_identical(self, client, public_client, auth_headers, test_team):
        code = await _code(client, public_client, auth_headers, test_team.id)
        _assert_error(await _token(client, _exchange(public_client, code, redirect_uri=REDIRECT + "/")),
                      400, "invalid_grant")

    async def test_loopback_port_must_match_the_authorization_request(
        self, client, public_client, auth_headers, test_team,
    ):
        """Port-agnostic at /authorize (RFC 8252), but the exchange must
        name exactly the URI the code was sent to (RFC 6749 §4.1.3)."""
        sent_to = "http://localhost:51234/callback"
        code = await _code(client, public_client, auth_headers, test_team.id, redirect_uri=sent_to)
        _assert_error(await _token(client, _exchange(public_client, code, redirect_uri="http://localhost:9/callback")),
                      400, "invalid_grant")
        code = await _code(client, public_client, auth_headers, test_team.id, redirect_uri=sent_to)
        assert (await _token(client, _exchange(public_client, code, redirect_uri=sent_to))).status_code == 200

    async def test_code_of_another_client(self, client, public_client, auth_headers, test_team):
        other = (await _register(client, client_name="Other"))["client_id"]
        code = await _code(client, public_client, auth_headers, test_team.id)
        _assert_error(await _token(client, _exchange(other, code)), 400, "invalid_grant")
        # Spent: the rightful client's later redemption is reuse.
        _assert_error(await _token(client, _exchange(public_client, code)), 400, "invalid_grant")

    async def test_code_reuse_revokes_the_session(self, client, public_client, auth_headers, test_team):
        code = await _code(client, public_client, auth_headers, test_team.id)
        first = (await _token(client, _exchange(public_client, code))).json()
        _assert_error(await _token(client, _exchange(public_client, code)), 400, "invalid_grant")
        session = await OxydeHolderSession.objects.get(id=first["chaotic"]["holder_session_id"])
        assert session.revoked_reason == ts.REASON_CODE_REUSE
        with pytest.raises(TokenError):
            await TokenService().validate_access(first["access_token"], resource=MCP)
        _assert_error(await _token(client, {
            "grant_type": "refresh_token", "client_id": public_client, "refresh_token": first["refresh_token"],
        }), 400, "invalid_grant")

    async def test_a_session_refused_after_redemption(
        self, client, public_client, auth_headers, test_team, monkeypatch,
    ):
        """A reuse that revokes the code between redemption and the
        session start (TokenService refuses) is invalid_grant, not a 500."""
        code = await _code(client, public_client, auth_headers, test_team.id)

        async def refused(self, redeemed, **kwargs):
            raise TokenError("invalid_grant", "this code was not redeemed, or was revoked or already used")

        monkeypatch.setattr(TokenService, "start_session_from", refused)
        _assert_error(await _token(client, _exchange(public_client, code)), 400, "invalid_grant")

    async def test_replay_by_another_client_revokes_nothing(self, client, public_client, auth_headers, test_team):
        """Reuse revokes only for the code's own client (PR #345 review):
        a copy from a log or history replayed under a throwaway client is
        just refused."""
        code = await _code(client, public_client, auth_headers, test_team.id)
        first = (await _token(client, _exchange(public_client, code))).json()
        attacker = (await _register(client, client_name="Attacker"))["client_id"]
        _assert_error(await _token(client, _exchange(attacker, code)), 400, "invalid_grant")
        session = await OxydeHolderSession.objects.get(id=first["chaotic"]["holder_session_id"])
        assert session.revoked_at is None
        await TokenService().validate_access(first["access_token"], resource=MCP)

    async def test_replay_after_expiry_revokes_nothing(self, client, public_client, auth_headers, test_team):
        """The reviewer's repro: a spent code, long expired, replayed by
        another client with a wrong redirect and verifier; and the same
        stale code from its own client. Neither ends the connection."""
        code = await _code(client, public_client, auth_headers, test_team.id)
        first = (await _token(client, _exchange(public_client, code))).json()
        await OxydeAuthToken.objects.filter(token_hash=ts.token_digest(code)).update(
            expires_at=datetime.now(timezone.utc) - timedelta(days=30),
        )
        attacker = (await _register(client, client_name="Attacker"))["client_id"]
        _assert_error(await _token(client, _exchange(
            attacker, code, redirect_uri="https://evil.example/cb", code_verifier="x" * 43,
        )), 400, "invalid_grant")
        _assert_error(await _token(client, _exchange(public_client, code)), 400, "invalid_grant")
        session = await OxydeHolderSession.objects.get(id=first["chaotic"]["holder_session_id"])
        assert session.revoked_at is None

    async def test_expired_code(self, client, public_client, auth_headers, test_team):
        code = await _code(client, public_client, auth_headers, test_team.id)
        await OxydeAuthToken.objects.filter(kind=TokenKind.AUTH_CODE).update(
            expires_at=datetime.now(timezone.utc) - timedelta(seconds=1),
        )
        _assert_error(await _token(client, _exchange(public_client, code)), 400, "invalid_grant")

    @pytest.mark.parametrize("code", ["cac_" + "0" * 64, "crt_" + "0" * 64, "garbage"])
    async def test_unknown_code(self, client, public_client, code):
        _assert_error(await _token(client, _exchange(public_client, code)), 400, "invalid_grant")

    @pytest.mark.parametrize("missing", ["code", "redirect_uri", "code_verifier"])
    async def test_missing_parameter(self, client, public_client, missing):
        data = {**_exchange(public_client, "cac_x"), missing: None}
        _assert_error(await _token(client, {k: v for k, v in data.items() if v is not None}),
                      400, "invalid_request")


# --- refresh_token -------------------------------------------------------------


@pytest.fixture
async def tokens(client, public_client, auth_headers, test_team):
    code = await _code(client, public_client, auth_headers, test_team.id)
    return (await _token(client, _exchange(public_client, code))).json()


def _refresh(cid, refresh_token, **extra):
    return {"grant_type": "refresh_token", "client_id": cid, "refresh_token": refresh_token, **extra}


class TestRefresh:
    async def test_rotation(self, client, public_client, tokens):
        response = await _token(client, _refresh(public_client, tokens["refresh_token"]))
        assert response.status_code == 200, response.text
        assert response.headers["cache-control"] == "no-store"
        body = response.json()
        assert body["refresh_token"] != tokens["refresh_token"]
        assert body["access_token"] != tokens["access_token"]
        assert body["scope"] == "chaotic:write offline_access"
        assert body["chaotic"] == tokens["chaotic"]
        await TokenService().validate_access(body["access_token"], resource=MCP)

    async def test_reuse_after_grace_revokes_the_session(self, client, public_client, tokens):
        rotated = (await _token(client, _refresh(public_client, tokens["refresh_token"]))).json()
        await OxydeAuthToken.objects.filter(replaces_id__isnull=True, kind=TokenKind.REFRESH).update(
            used_at=datetime.now(timezone.utc) - timedelta(minutes=5),
        )
        _assert_error(await _token(client, _refresh(public_client, tokens["refresh_token"])), 400, "invalid_grant")
        session = await OxydeHolderSession.objects.get(id=tokens["chaotic"]["holder_session_id"])
        assert session.revoked_reason == ts.REASON_REFRESH_REUSE
        _assert_error(await _token(client, _refresh(public_client, rotated["refresh_token"])), 400, "invalid_grant")

    async def test_grace_replay_returns_the_same_pair(self, client, public_client, tokens):
        first = (await _token(client, _refresh(public_client, tokens["refresh_token"]))).json()
        again = (await _token(client, _refresh(public_client, tokens["refresh_token"]))).json()
        assert again["refresh_token"] == first["refresh_token"]
        assert again["access_token"] == first["access_token"]

    async def test_scope_may_only_narrow(self, client, public_client, tokens):
        _assert_error(await _token(client, _refresh(
            public_client, tokens["refresh_token"], scope="chaotic:write chaotic:read",
        )), 400, "invalid_scope")
        narrowed = await _token(client, _refresh(public_client, tokens["refresh_token"], scope="offline_access"))
        assert narrowed.status_code == 200 and narrowed.json()["scope"] == "offline_access"
        assert narrowed.json()["refresh_token"].startswith("crt_")

    async def test_a_narrowed_refresh_still_rotates_and_the_connection_lives_on(
        self, client, public_client, tokens, monkeypatch,
    ):
        """PR #345 re-review, A. offline_access is not an access-token
        scope: a refresh asking for scope=chaotic:write gets an access token
        with that scope (which is what `scope` reports) and, as every
        refresh does, a new refresh token carrying the original grant. The
        client refreshes again past the 30 s grace window: the connection
        stays alive and nobody is told their token was stolen."""
        notices = []

        async def notice(self, session):
            notices.append(session.id)

        monkeypatch.setattr(TokenService, "_notify_reuse", notice)
        response = await _token(client, _refresh(public_client, tokens["refresh_token"], scope="chaotic:write"))
        assert response.status_code == 200, response.text
        body = response.json()
        assert body["scope"] == "chaotic:write"
        assert body["refresh_token"].startswith("crt_") and body["refresh_token"] != tokens["refresh_token"]
        validated = await TokenService().validate_access(body["access_token"], resource=MCP)
        assert validated.scopes == ("chaotic:write",)

        # Eleven minutes on: the grace window is long gone.
        await OxydeAuthToken.objects.filter(token_hash=ts.token_digest(tokens["refresh_token"])).update(
            used_at=datetime.now(timezone.utc) - timedelta(minutes=11),
        )
        again = await _token(client, _refresh(public_client, body["refresh_token"]))
        assert again.status_code == 200, again.text
        assert again.json()["scope"] == "chaotic:write offline_access"  # the grant, not the narrowing
        session = await OxydeHolderSession.objects.get(id=tokens["chaotic"]["holder_session_id"])
        assert session.revoked_at is None
        assert notices == []

    async def test_empty_scope_is_no_scope(self, client, public_client, tokens):
        body = (await _token(client, _refresh(public_client, tokens["refresh_token"], scope=""))).json()
        assert body["scope"] == "chaotic:write offline_access"

    async def test_another_clients_refresh_token(self, client, public_client, tokens):
        other = (await _register(client, client_name="Other"))["client_id"]
        live = await _token(client, _refresh(other, tokens["refresh_token"]))
        _assert_error(live, 400, "invalid_grant")
        # Indistinguishable from a dead token (PR #345 review).
        dead = await _token(client, _refresh(other, "crt_" + "0" * 64))
        assert live.json() == dead.json()
        # Not spent by the stranger.
        assert (await _token(client, _refresh(public_client, tokens["refresh_token"]))).status_code == 200

    async def test_resource(self, client, public_client, tokens):
        _assert_error(await _token(client, _refresh(public_client, tokens["refresh_token"], resource="https://x.example")),
                      400, "invalid_target")
        assert (await _token(client, _refresh(public_client, tokens["refresh_token"], resource=BASE))).status_code == 200

    @pytest.mark.parametrize("resource", [MCP, MCP + "/", BASE, BASE + "/"])
    async def test_both_resource_values_are_accepted(self, client, public_client, tokens, resource):
        """CHT-1564: a refresh may name either published identifier, with
        or without the trailing slash; all mean /mcp, the token's own."""
        response = await _token(client, _refresh(public_client, tokens["refresh_token"], resource=resource))
        assert response.status_code == 200, (resource, response.text)
        await TokenService().validate_access(response.json()["access_token"], resource=MCP)
        with pytest.raises(TokenError):
            await TokenService().validate_access(response.json()["access_token"], resource=BASE)

    @pytest.mark.parametrize("resource", NEAR_MISS_RESOURCES)
    async def test_near_miss_resource_values_are_refused(self, client, public_client, tokens, resource):
        """CHT-1564: one trailing slash is tolerated, nothing more, and
        the refresh token is not spent by the refusal."""
        _assert_error(await _token(client, _refresh(public_client, tokens["refresh_token"], resource=resource)),
                      400, "invalid_target")
        assert (await _token(client, _refresh(public_client, tokens["refresh_token"]))).status_code == 200

    async def test_resource_mismatch_with_the_token(self, client, public_client, tokens):
        await OxydeAuthToken.objects.filter(kind=TokenKind.REFRESH).update(resource=BASE)
        _assert_error(await _token(client, _refresh(public_client, tokens["refresh_token"], resource=MCP)),
                      400, "invalid_target")

    async def test_dead_token(self, client, public_client):
        _assert_error(await _token(client, _refresh(public_client, "crt_" + "0" * 64)), 400, "invalid_grant")

    async def test_missing_refresh_token(self, client, public_client):
        _assert_error(await _token(client, {"grant_type": "refresh_token", "client_id": public_client}),
                      400, "invalid_request")


# --- client authentication -----------------------------------------------------


class TestClientAuthentication:
    async def test_confidential_client(self, client, confidential_client, auth_headers, test_team):
        cid, secret = confidential_client
        code = await _code(client, cid, auth_headers, test_team.id)
        _assert_error(await _token(client, _exchange(cid, code)), 401, "invalid_client")
        _assert_error(await _token(client, _exchange(cid, code, client_secret="ccs_wrong")), 401, "invalid_client")
        # Failed client authentication does not spend the code.
        body = (await _token(client, _exchange(cid, code, client_secret=secret))).json()
        assert body["access_token"].startswith("cat_")
        _assert_error(await _token(client, _refresh(cid, body["refresh_token"])), 401, "invalid_client")
        assert (await _token(client, _refresh(cid, body["refresh_token"], client_secret=secret))).status_code == 200

    async def test_public_client_must_not_send_a_secret(self, client, public_client, auth_headers, test_team):
        code = await _code(client, public_client, auth_headers, test_team.id)
        _assert_error(await _token(client, _exchange(public_client, code, client_secret="anything")),
                      401, "invalid_client")

    async def test_basic_auth_is_refused_with_a_pointer(self, client, confidential_client, auth_headers, test_team):
        """client_secret_basic is not supported: a client that tries it is
        told to use client_secret_post (400, no 401 challenge for a scheme
        that would be refused). The header's credentials are never read
        (CHT-1564), and the code is not spent."""
        cid, secret = confidential_client
        code = await _code(client, cid, auth_headers, test_team.id)
        basic = base64.b64encode(f"{cid}:{secret}".encode()).decode()
        for data in (_exchange(cid, code), {k: v for k, v in _exchange(cid, code).items() if k != "client_id"}):
            response = await _token(client, data, headers={"Authorization": f"Basic {basic}"})
            _assert_error(response, 400, "invalid_request")
            assert "client_secret_post" in response.json()["error_description"]
            assert "www-authenticate" not in response.headers
        revoke = await client.post("/oauth/revoke", data={"token": "x", "client_id": cid},
                                   headers={**FORM, "Authorization": f"Basic {basic}"})
        _assert_error(revoke, 400, "invalid_request")
        assert (await _token(client, _exchange(cid, code, client_secret=secret))).status_code == 200

    async def test_metadata_advertises_only_supported_methods(self, client, oauth_on):
        metadata = (await client.get("/.well-known/oauth-authorization-server")).json()
        assert metadata["token_endpoint_auth_methods_supported"] == ["none", "client_secret_post"]
        assert metadata["revocation_endpoint_auth_methods_supported"] == ["none", "client_secret_post"]

    async def test_unknown_or_disabled_client(self, client, public_client, auth_headers, test_team):
        _assert_error(await _token(client, _exchange("dcr_nope", "cac_x")), 401, "invalid_client")
        _assert_error(await _token(client, {"grant_type": "authorization_code"}), 401, "invalid_client")
        code = await _code(client, public_client, auth_headers, test_team.id)
        await OxydeOAuthClient.objects.filter(id=public_client).update(is_active=False)
        _assert_error(await _token(client, _exchange(public_client, code)), 401, "invalid_client")

    async def test_a_login_session_is_not_client_authentication(
        self, client, confidential_client, auth_headers, test_team,
    ):
        """CHT-1564: a logged-in user's bearer and a cookie authenticate
        nothing here."""
        cid, _secret = confidential_client
        code = await _code(client, cid, auth_headers, test_team.id)
        _assert_error(await _token(
            client, _exchange(cid, code), headers={**auth_headers, "Cookie": "session=abc; chaotic_token=xyz"},
        ), 401, "invalid_client")


# --- request shape ----------------------------------------------------------------


class TestRequestShape:
    async def test_grant_type(self, client, public_client):
        _assert_error(await _token(client, {"client_id": public_client}), 400, "invalid_request")
        _assert_error(await _token(client, {"grant_type": "password", "client_id": public_client}),
                      400, "unsupported_grant_type")
        _assert_error(await _token(client, {"grant_type": "client_credentials", "client_id": public_client}),
                      400, "unsupported_grant_type")

    async def test_json_is_refused(self, client, public_client):
        response = await client.post("/oauth/token", json={"grant_type": "refresh_token", "client_id": public_client})
        _assert_error(response, 400, "invalid_request")

    @pytest.mark.parametrize("name", ["code", "refresh_token", "client_secret", "code_verifier", "anything"])
    async def test_query_string_is_refused_not_read(self, client, public_client, tokens, name):
        """CHT-1570: a secret in the URL is refused, and nothing in the URL
        is read: the refresh token below is not spent."""
        response = await client.post(
            f"/oauth/token?{name}={tokens['refresh_token']}",
            data={"grant_type": "refresh_token", "client_id": public_client}, headers=FORM,
        )
        _assert_error(response, 400, "invalid_request")
        assert (await _token(client, _refresh(public_client, tokens["refresh_token"]))).status_code == 200

    @pytest.mark.parametrize("path, name", [
        ("/oauth/token", "code"), ("/oauth/token", "refresh_token"), ("/oauth/token", "client_secret"),
        ("/oauth/token", "code_verifier"), ("/oauth/revoke", "token"), ("/oauth/revoke", "client_secret"),
    ])
    async def test_query_string_refusal_does_not_echo_the_value(self, client, public_client, tokens, path, name):
        """CHT-1570: the refusal says where parameters go and nothing
        about what was sent; a refused secret is not reflected back."""
        secret = tokens["refresh_token"]
        response = await client.post(f"{path}?{name}={secret}", data={"client_id": public_client}, headers=FORM)
        _assert_error(response, 400, "invalid_request")
        assert secret not in response.text
        assert secret[:12] not in response.text
        # One fixed description, whatever was sent.
        assert response.json() == {"error": "invalid_request",
                                   "error_description": "parameters go in the form-encoded body, never the URL"}

    async def test_repeated_parameter(self, client, public_client):
        response = await client.post(
            "/oauth/token", content=f"grant_type=refresh_token&client_id={public_client}&client_id=x",
            headers=FORM,
        )
        _assert_error(response, 400, "invalid_request")

    async def test_unknown_parameters_are_ignored_and_empty_ones_absent(self, client, public_client, tokens):
        response = await _token(client, {**_refresh(public_client, tokens["refresh_token"]), "foo": "bar",
                                         "resource": ""})
        assert response.status_code == 200, response.text

    async def test_oversized_and_undecodable_bodies(self, client, public_client):
        _assert_error(await client.post("/oauth/token", content="a=" + "x" * 20000, headers=FORM),
                      400, "invalid_request")
        _assert_error(await client.post("/oauth/token", content=b"grant_type=\xff\xfe", headers=FORM),
                      400, "invalid_request")

    async def test_body_size_is_checked_before_it_is_read(self):
        """PR #345 review: a declared Content-Length over the limit is
        refused before any of the body is read, and a chunked body is cut
        off at the limit, not buffered whole."""
        from starlette.requests import Request

        from app.api import oauth as api_oauth
        from app.oauth.errors import OAuthHTTPError

        def request(declared):
            consumed = 0
            chunks = 160  # 10 MiB

            async def receive():
                nonlocal consumed, chunks
                chunks -= 1
                consumed += 65536
                return {"type": "http.request", "body": b"a" * 65536, "more_body": chunks > 0}

            headers = [(b"content-type", b"application/x-www-form-urlencoded")]
            if declared:
                headers.append((b"content-length", str(160 * 65536).encode()))
            scope = {"type": "http", "method": "POST", "path": "/oauth/token", "query_string": b"",
                     "headers": headers}
            return Request(scope, receive), lambda: consumed

        for declared in (True, False):
            req, consumed = request(declared)
            with pytest.raises(OAuthHTTPError) as raised:
                await api_oauth._form(req, api_oauth._TOKEN_PARAMS)
            assert raised.value.error == "invalid_request"
            assert consumed() <= api_oauth.MAX_FORM_BYTES + 65536, declared
            if declared:
                assert consumed() == 0

    async def test_form_with_charset(self, client, public_client, tokens):
        response = await client.post(
            "/oauth/token", data=_refresh(public_client, tokens["refresh_token"]),
            headers={"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        )
        assert response.status_code == 200, response.text

    async def test_404_when_oauth_is_off(self, client, db):
        response = await _token(client, {"grant_type": "refresh_token"})
        assert response.status_code == 404
        response = await client.post("/oauth/revoke", data={"token": "x"}, headers=FORM)
        assert response.status_code == 404


class TestCredentialEndedReports:
    """CHT-1625 / PR #356 review, 1 and 3: every path that revokes a
    session reports it, so its push devices and sockets end with it."""

    @pytest.fixture
    def seen(self):
        from app.services import credential_events

        events = []

        async def hook(event):
            # Never under the refresh lock: it blocks every refresh.
            events.append((event, ts._refresh_lock.locked()))

        remove = credential_events.register(hook)
        yield events
        remove()

    async def test_code_reuse(self, client, public_client, auth_headers, test_team, seen):
        code = await _code(client, public_client, auth_headers, test_team.id)
        first = (await _token(client, _exchange(public_client, code))).json()
        _assert_error(await _token(client, _exchange(public_client, code)), 400, "invalid_grant")
        assert [(e.reason, e.holder_session_ids, locked) for e, locked in seen] == [
            (ts.REASON_CODE_REUSE, frozenset({first["chaotic"]["holder_session_id"]}), False),
        ]

    async def test_refresh_reuse_runs_the_hooks_outside_the_refresh_lock(self, client, public_client, tokens, seen):
        await _token(client, _refresh(public_client, tokens["refresh_token"]))
        await OxydeAuthToken.objects.filter(replaces_id__isnull=True, kind=TokenKind.REFRESH).update(
            used_at=datetime.now(timezone.utc) - timedelta(minutes=5),
        )
        response = await _token(client, _refresh(public_client, tokens["refresh_token"]))
        _assert_error(response, 400, "invalid_grant")
        assert "already used" in response.json()["error_description"]
        assert [(e.reason, e.holder_session_ids, locked) for e, locked in seen] == [
            (ts.REASON_REFRESH_REUSE, frozenset({tokens["chaotic"]["holder_session_id"]}), False),
        ]
        # A second reuse finds it revoked: nothing more is reported.
        _assert_error(await _token(client, _refresh(public_client, tokens["refresh_token"])), 400, "invalid_grant")
        assert len(seen) == 1

    async def test_oauth_revoke(self, client, public_client, tokens, seen):
        response = await client.post("/oauth/revoke", data={"token": tokens["refresh_token"],
                                                            "client_id": public_client}, headers=FORM)
        assert response.status_code == 200
        assert [(e.reason, e.holder_session_ids) for e, _locked in seen] == [
            ("client_revoked", frozenset({tokens["chaotic"]["holder_session_id"]})),
        ]


# --- /oauth/revoke ----------------------------------------------------------------


async def _revoke(client, data, **kwargs):
    return await client.post("/oauth/revoke", data=data, headers=FORM, **kwargs)


class TestRevoke:
    @pytest.mark.parametrize("which", ["access_token", "refresh_token"])
    async def test_revokes_the_session(self, client, public_client, tokens, which):
        response = await _revoke(client, {"token": tokens[which], "client_id": public_client,
                                          "token_type_hint": "refresh_token"})
        assert response.status_code == 200 and response.content == b""
        assert response.headers["cache-control"] == "no-store"
        session = await OxydeHolderSession.objects.get(id=tokens["chaotic"]["holder_session_id"])
        assert session.revoked_reason == "client_revoked" and session.revoked_by_id is None
        with pytest.raises(TokenError):
            await TokenService().validate_access(tokens["access_token"], resource=MCP)
        _assert_error(await _token(client, _refresh(public_client, tokens["refresh_token"])), 400, "invalid_grant")
        # Again: still 200.
        assert (await _revoke(client, {"token": tokens[which], "client_id": public_client})).status_code == 200

    @pytest.mark.parametrize("token", ["crt_" + "0" * 64, "cat_" + "0" * 64, "nonsense", "cac_" + "0" * 64])
    async def test_unknown_tokens_are_200(self, client, public_client, token):
        assert (await _revoke(client, {"token": token, "client_id": public_client})).status_code == 200

    async def test_another_clients_token_is_200_and_untouched(self, client, public_client, tokens):
        other = (await _register(client, client_name="Other"))["client_id"]
        assert (await _revoke(client, {"token": tokens["refresh_token"], "client_id": other})).status_code == 200
        session = await OxydeHolderSession.objects.get(id=tokens["chaotic"]["holder_session_id"])
        assert session.revoked_at is None

    async def test_client_must_authenticate(self, client, confidential_client, auth_headers, test_team):
        cid, secret = confidential_client
        code = await _code(client, cid, auth_headers, test_team.id)
        body = (await _token(client, _exchange(cid, code, client_secret=secret))).json()
        _assert_error(await _revoke(client, {"token": body["refresh_token"], "client_id": cid}), 401, "invalid_client")
        _assert_error(await _revoke(client, {"token": body["refresh_token"]}), 401, "invalid_client")
        assert (await OxydeHolderSession.objects.get(id=body["chaotic"]["holder_session_id"])).revoked_at is None
        ok = await _revoke(client, {"token": body["refresh_token"], "client_id": cid, "client_secret": secret})
        assert ok.status_code == 200
        assert (await OxydeHolderSession.objects.get(id=body["chaotic"]["holder_session_id"])).revoked_at is not None

    async def test_a_disabled_client_may_still_revoke(self, client, public_client, tokens):
        await OxydeOAuthClient.objects.filter(id=public_client).update(is_active=False)
        response = await _revoke(client, {"token": tokens["refresh_token"], "client_id": public_client})
        assert response.status_code == 200
        session = await OxydeHolderSession.objects.get(id=tokens["chaotic"]["holder_session_id"])
        assert session.revoked_reason == "client_revoked"
        # It still can't get tokens.
        _assert_error(await _token(client, _refresh(public_client, tokens["refresh_token"])), 401, "invalid_client")

    async def test_malformed(self, client, public_client):
        _assert_error(await _revoke(client, {"client_id": public_client}), 400, "invalid_request")
        _assert_error(await client.post("/oauth/revoke?token=crt_abc", data={"client_id": public_client},
                                        headers=FORM), 400, "invalid_request")
        _assert_error(await client.post("/oauth/revoke", json={"token": "x", "client_id": public_client}),
                      400, "invalid_request")


# --- CHT-1570: the access log of a real uvicorn ------------------------------------

# A minted OAuth secret as it would appear in a log line: its prefix
# followed directly by hex. The redacted short form (``crt_...19a0``)
# does not match.
_LOGGED_SECRET = re.compile(r"(?:cac_|cat_|crt_|cct_)[0-9a-f]")


@contextlib.asynccontextmanager
async def _uvicorn_access_log():
    """Serve ``app.main:app`` on a real uvicorn (ephemeral port, this
    event loop, so this test's database) and capture every formatted
    ``uvicorn.access`` line. Yields ``(base_url, lines)``."""
    import uvicorn

    from app import log_redaction
    from app.main import app

    log_redaction.install()
    lines: list[str] = []

    class Capture(logging.Handler):
        def emit(self, record):
            lines.append(record.getMessage())

    access = logging.getLogger("uvicorn.access")
    saved_level, handler = access.level, Capture(level=logging.INFO)
    access.addHandler(handler)
    access.setLevel(logging.INFO)
    # lifespan off: the db fixture already initialised Oxyde.
    server = uvicorn.Server(uvicorn.Config(
        app, host="127.0.0.1", port=0, lifespan="off", log_config=None, access_log=True,
    ))
    task = asyncio.create_task(server.serve())
    try:
        for _ in range(500):
            if server.started or task.done():
                break
            await asyncio.sleep(0.01)
        assert server.started, "uvicorn did not start"
        port = server.servers[0].sockets[0].getsockname()[1]
        yield f"http://127.0.0.1:{port}", lines
    finally:
        server.should_exit = True
        await asyncio.wait_for(task, 10)
        access.removeHandler(handler)
        access.setLevel(saved_level)


class TestAccessLog:
    async def test_token_requests_log_no_secret(self, client, public_client, auth_headers, test_team):
        """The acceptance test of CHT-1570, against uvicorn's real access
        log: a code exchange, a refresh and a revocation, each with its
        secrets in the body, and the same secrets attempted in the query
        string (refused, and scrubbed from the line). No logged line
        holds a cac_/cat_/crt_/cct_ prefix followed by hex."""
        code = await _code(client, public_client, auth_headers, test_team.id)
        async with _uvicorn_access_log() as (base, lines):
            async with httpx.AsyncClient(base_url=base, timeout=10) as http:
                async def post(path, data, query=None):
                    return await http.post(path, data=data, params=query, headers=FORM)

                # Secrets in the URL: refused, never read.
                for query in ({"code": code}, {"code_verifier": VERIFIER}):
                    _assert_error(await post("/oauth/token", {"grant_type": "authorization_code",
                                                              "client_id": public_client}, query),
                                  400, "invalid_request")
                exchanged = await post("/oauth/token", _exchange(public_client, code))
                assert exchanged.status_code == 200, exchanged.text
                issued = exchanged.json()
                _assert_error(await post("/oauth/token", {"grant_type": "refresh_token", "client_id": public_client},
                                         {"refresh_token": issued["refresh_token"]}), 400, "invalid_request")
                refreshed = await post("/oauth/token", _refresh(public_client, issued["refresh_token"]))
                assert refreshed.status_code == 200, refreshed.text
                current = refreshed.json()
                _assert_error(await post("/oauth/revoke", {"client_id": public_client},
                                         {"token": current["access_token"]}), 400, "invalid_request")
                revoked = await post("/oauth/revoke", {"token": current["refresh_token"], "client_id": public_client})
                assert revoked.status_code == 200, revoked.text

        oauth_lines = [line for line in lines if '"POST /oauth/' in line]
        assert len(oauth_lines) == 7, lines
        assert sum(" 200" in line for line in oauth_lines) == 3, oauth_lines
        assert sum("=[redacted]" in line and " 400" in line for line in oauth_lines) == 4, oauth_lines
        secrets = [code, VERIFIER, issued["access_token"], issued["refresh_token"],
                   current["access_token"], current["refresh_token"]]
        for line in lines:
            assert not _LOGGED_SECRET.search(line), line
            for secret in secrets:
                assert secret not in line, line


# --- CHT-1564 guard: the whole OAuth route inventory ------------------------------


def test_the_oauth_route_inventory_is_pinned():
    """Every route of any kind (APIRoute, Starlette Route, Mount, ...) at
    /oauth* or /.well-known/oauth*, with its methods, is exactly this list
    (PR #402 review, M2). The no-ambient-auth guards walk the public POST
    routes in ``PUBLIC_OAUTH_METHODS``, so a route added here without a
    decision about it, under any method, fails this test first. The
    consent API under /api/oauth is a logged-in SPA API and is not public;
    the SPA's /oauth/consent page is served by the catch-all GET."""
    from fastapi.routing import iter_route_contexts

    from app.main import app
    from app.oauth.cors import PUBLIC_OAUTH_METHODS

    inventory = sorted(
        (rc.path, type(rc.original_route).__name__, tuple(sorted(getattr(rc.original_route, "methods", None) or ())))
        for rc in iter_route_contexts(app.routes)
        if rc.path.startswith(("/oauth", "/.well-known/oauth"))
    )
    assert inventory == sorted([
        ("/.well-known/oauth-authorization-server", "APIRoute", ("GET",)),
        ("/.well-known/oauth-protected-resource", "APIRoute", ("GET",)),
        ("/.well-known/oauth-protected-resource/mcp", "APIRoute", ("GET",)),
        ("/oauth/authorize", "APIRoute", ("GET",)),
        ("/oauth/register", "APIRoute", ("POST",)),
        ("/oauth/revoke", "APIRoute", ("POST",)),
        ("/oauth/token", "APIRoute", ("POST",)),
    ])
    public_posts = {path for path, methods in PUBLIC_OAUTH_METHODS.items() if "POST" in methods}
    assert public_posts == {path for path, _kind, methods in inventory if "POST" in methods}


def test_the_inventory_sees_non_apiroute_routes():
    """The inventory above is not limited to APIRoutes: a Starlette route
    or a mount under /oauth shows up in it."""
    from fastapi import FastAPI
    from fastapi.routing import iter_route_contexts
    from starlette.responses import PlainTextResponse
    from starlette.routing import Mount, Route

    async def endpoint(request):
        return PlainTextResponse("")

    probe = FastAPI()
    probe.router.routes.append(Route("/oauth/extra", endpoint, methods=["PUT"]))
    probe.router.routes.append(Mount("/oauth/static", routes=[]))
    found = {rc.path for rc in iter_route_contexts(probe.routes) if rc.path.startswith(("/oauth", "/.well-known/oauth"))}
    assert {"/oauth/extra", "/oauth/static"} <= found


# --- CHT-1564: behavioural no-ambient-auth checks on token and revoke --------------


def _login_headers(auth_headers):
    """A real web login, as a bearer and also as a cookie. Nothing in the
    app reads any cookie today, so the cookie names are arbitrary: the
    point is only that a request carrying one is answered as if it did
    not (review N1)."""
    jwt = auth_headers["Authorization"][7:]
    return {**auth_headers, "Cookie": f"chaotic_token={jwt}; session={jwt}"}


class TestNoAmbientAuthBehaviour:
    async def test_token_and_revoke_never_consult_a_credential(
        self, client, public_client, auth_headers, test_team, monkeypatch,
    ):
        """With a valid login attached, the code exchange, a refresh and a
        revocation all succeed and no credential check runs at all, even
        one whose failure was swallowed (the recorded calls stay empty)."""
        code = await _code(client, public_client, auth_headers, test_team.id)
        headers = _login_headers(auth_headers)
        calls = credential_tripwire(monkeypatch)
        exchanged = await _token(client, _exchange(public_client, code), headers=headers)
        assert calls == [] and exchanged.status_code == 200, (calls, exchanged.text)
        refreshed = await _token(client, _refresh(public_client, exchanged.json()["refresh_token"]), headers=headers)
        assert calls == [] and refreshed.status_code == 200, (calls, refreshed.text)
        revoked = await client.post(
            "/oauth/revoke", data={"token": refreshed.json()["refresh_token"], "client_id": public_client},
            headers={**FORM, **headers},
        )
        assert calls == [] and revoked.status_code == 200, (calls, revoked.text)

    async def test_failed_requests_never_consult_a_credential_either(
        self, client, confidential_client, auth_headers, monkeypatch,
    ):
        """The error paths too: a refused client authentication is not a
        cue to look at the login."""
        cid, _secret = confidential_client
        calls = credential_tripwire(monkeypatch)
        headers = _login_headers(auth_headers)
        _assert_error(await _token(client, _refresh(cid, "crt_" + "0" * 64), headers=headers), 401, "invalid_client")
        _assert_error(await client.post("/oauth/revoke", data={"token": "x", "client_id": cid},
                                        headers={**FORM, **headers}), 401, "invalid_client")
        _assert_error(await _token(client, {"grant_type": "refresh_token", "refresh_token": "x"}, headers=headers),
                      401, "invalid_client")
        assert calls == []

    async def test_a_login_or_garbage_credentials_change_nothing(self, client, public_client, tokens, auth_headers):
        """The same refresh answers the same with a login, with a garbage
        bearer and cookie, and with neither: none of them is read."""
        garbage = {"Authorization": "Bearer not-a-token", "Cookie": "chaotic_token=garbage; session=garbage"}
        first = await _token(client, _refresh(public_client, tokens["refresh_token"]), headers=garbage)
        assert first.status_code == 200, first.text
        second = await _token(client, _refresh(public_client, first.json()["refresh_token"]),
                              headers=_login_headers(auth_headers))
        assert second.status_code == 200, second.text
        assert second.json()["chaotic"] == tokens["chaotic"] == first.json()["chaotic"]

    async def test_a_login_session_is_not_client_authentication_at_revoke(
        self, client, confidential_client, auth_headers, test_team,
    ):
        """A confidential client's token is not revoked on the strength of
        a login: the client secret is required, the bearer and cookie
        count for nothing."""
        cid, secret = confidential_client
        code = await _code(client, cid, auth_headers, test_team.id)
        body = (await _token(client, _exchange(cid, code, client_secret=secret))).json()
        for data in ({"token": body["refresh_token"], "client_id": cid}, {"token": body["refresh_token"]}):
            response = await client.post("/oauth/revoke", data=data, headers={**FORM, **_login_headers(auth_headers)})
            _assert_error(response, 401, "invalid_client")
        assert (await OxydeHolderSession.objects.get(id=body["chaotic"]["holder_session_id"])).revoked_at is None

    async def test_a_login_does_not_name_the_client_at_token(self, client, public_client, tokens, auth_headers):
        """Without a client_id in the body, a login does not stand in for
        one: the refresh is refused and the token is not spent."""
        data = {"grant_type": "refresh_token", "refresh_token": tokens["refresh_token"]}
        _assert_error(await _token(client, data, headers=_login_headers(auth_headers)), 401, "invalid_client")
        assert (await _token(client, _refresh(public_client, tokens["refresh_token"]))).status_code == 200
