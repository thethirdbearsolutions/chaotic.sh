"""/oauth/token and /oauth/revoke (CHT-1520; design doc §2.4, RFC 6749,
RFC 7636, RFC 7009, RFC 8707): the code exchange with PKCE S256 and its
bindings, code reuse, refresh rotation and reuse, client authentication
by registered method, revocation, no-store, form bodies only and no
secrets in the URL (CHT-1570), no ambient auth (CHT-1564), and the
OAUTH_ENABLED gate.
"""
import base64
import hashlib
from datetime import datetime, timedelta, timezone
from urllib.parse import parse_qs, urlsplit

import pytest

from app.config import get_settings
from app.enums import HolderVia, TokenKind
from app.oxyde_models.oauth import OxydeAuthToken, OxydeHolderSession, OxydeOAuthClient
from app.services import token_service as ts
from app.services.token_service import TokenError, TokenService

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
def oauth_on(monkeypatch):
    monkeypatch.setenv("OAUTH_ENABLED", "true")
    monkeypatch.setenv("APP_BASE_URL", BASE)
    monkeypatch.setenv("OAUTH_DCR_ENABLED", "true")
    get_settings.cache_clear()
    ts._reset_for_tests()
    yield
    get_settings.cache_clear()
    ts._reset_for_tests()


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
        narrowed = await _token(client, _refresh(public_client, tokens["refresh_token"], scope="chaotic:write"))
        assert narrowed.status_code == 200 and narrowed.json()["scope"] == "chaotic:write"
        _assert_error(await _token(client, _refresh(
            public_client, narrowed.json()["refresh_token"], scope="chaotic:write chaotic:read",
        )), 400, "invalid_scope")

    async def test_empty_scope_is_no_scope(self, client, public_client, tokens):
        body = (await _token(client, _refresh(public_client, tokens["refresh_token"], scope=""))).json()
        assert body["scope"] == "chaotic:write offline_access"

    async def test_another_clients_refresh_token(self, client, public_client, tokens):
        other = (await _register(client, client_name="Other"))["client_id"]
        _assert_error(await _token(client, _refresh(other, tokens["refresh_token"])), 400, "invalid_grant")
        # Not spent by the stranger.
        assert (await _token(client, _refresh(public_client, tokens["refresh_token"]))).status_code == 200

    async def test_resource(self, client, public_client, tokens):
        _assert_error(await _token(client, _refresh(public_client, tokens["refresh_token"], resource="https://x.example")),
                      400, "invalid_target")
        assert (await _token(client, _refresh(public_client, tokens["refresh_token"], resource=BASE))).status_code == 200

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

    async def test_basic_auth_is_not_read(self, client, confidential_client, auth_headers, test_team):
        """client_secret_basic is not supported and the Authorization
        header is never read (CHT-1564)."""
        cid, secret = confidential_client
        code = await _code(client, cid, auth_headers, test_team.id)
        basic = base64.b64encode(f"{cid}:{secret}".encode()).decode()
        data = _exchange(cid, code)
        del data["client_id"]
        _assert_error(await _token(client, data, headers={"Authorization": f"Basic {basic}"}), 401, "invalid_client")

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

    async def test_malformed(self, client, public_client):
        _assert_error(await _revoke(client, {"client_id": public_client}), 400, "invalid_request")
        _assert_error(await client.post("/oauth/revoke?token=crt_abc", data={"client_id": public_client},
                                        headers=FORM), 400, "invalid_request")
        _assert_error(await client.post("/oauth/revoke", json={"token": "x", "client_id": public_client}),
                      400, "invalid_request")


# --- CHT-1564 guard: both endpoints exist and are covered ------------------------


def test_token_and_revoke_are_public_oauth_posts():
    """The route-level guard in test_oauth_registration.py walks every
    public OAuth POST route; make sure token and revoke are among them."""
    from fastapi.routing import APIRoute, iter_route_contexts

    from app.main import app
    from app.oauth.cors import PUBLIC_OAUTH_METHODS

    posts = {path for path, methods in PUBLIC_OAUTH_METHODS.items() if "POST" in methods}
    assert {"/oauth/token", "/oauth/revoke"} <= posts
    routed = {
        rc.path for rc in iter_route_contexts(app.routes)
        if isinstance(rc.original_route, APIRoute) and "POST" in rc.original_route.methods
    }
    assert {"/oauth/token", "/oauth/revoke"} <= routed
