"""The shared credential resolver (CHT-1560): what a Principal carries,
and how an edge's accepted kinds gate a token. The HTTP behaviour of
each edge is pinned by test_auth_deps.py (REST) and test_mcp_endpoint.py
(/mcp); this covers what those cannot see.

OAuth access tokens (CHT-1576) are minted for real with TokenService
(tests/oauth_tokens.py), and each per-request check of the OAuth
verifier gets a refusal test here, on the resolver and on REST."""
from datetime import datetime, timedelta, timezone

import pytest
import pytest_asyncio

from app.auth import credentials
from app.auth.access import ALL
from app.auth.credentials import (
    ALL_SCOPES,
    WILDCARD_KINDS,
    CredentialError,
    CredentialFailure,
    CredentialKind,
    CredentialResolver,
    Principal,
    capability_url_resolver,
    classify,
    mcp_resolver,
    rest_resolver,
)
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.oauth import OxydeAuthToken
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.schemas.api_key import APIKeyCreate
from app.services import token_service as ts
from app.services.api_key_service import APIKeyService
from app.services.token_service import TokenService
from app.utils.security import create_access_token

from .oauth_tokens import bearer, connector_token, enable_oauth, make_agent, server_token


def test_classify_by_shape():
    assert classify("ck_abc") is CredentialKind.API_KEY
    assert classify("eyJhbGciOi.x.y") is CredentialKind.SESSION_JWT
    # Every TokenService prefix is an OAuth token, so a refresh token or a
    # code sent as a bearer is refused by the OAuth verifier.
    for prefix in ("cat_", "crt_", "cac_", "cct_"):
        assert classify(prefix + "0" * 64) is CredentialKind.OAUTH_ACCESS


def test_a_kind_with_no_verifier_cannot_be_accepted(monkeypatch):
    # Accepting a kind with no verifier is a startup error, not a silent
    # 401 per request.
    monkeypatch.delitem(credentials._VERIFIERS, CredentialKind.OAUTH_ACCESS)
    with pytest.raises(ValueError, match="oauth_access"):
        CredentialResolver(frozenset({CredentialKind.OAUTH_ACCESS}), audience=ts.mcp_resource)


def test_an_oauth_edge_must_name_its_resource():
    with pytest.raises(ValueError, match="resource"):
        CredentialResolver(frozenset({CredentialKind.OAUTH_ACCESS}))


def test_edges():
    """REST and /mcp take OAuth tokens, each as its own resource; the
    capability URL takes API keys only (CHT-1570)."""
    assert CredentialKind.OAUTH_ACCESS in rest_resolver.accepts
    assert CredentialKind.OAUTH_ACCESS in mcp_resolver.accepts
    assert capability_url_resolver.accepts == frozenset({CredentialKind.API_KEY})
    assert CredentialKind.SESSION_JWT not in mcp_resolver.accepts
    assert rest_resolver.audience is ts.issuer and mcp_resolver.audience is ts.mcp_resource


def test_only_keys_and_session_jwts_may_carry_the_wildcard():
    """CHT-1574 (N5): an allowlist, so any other kind fails closed."""
    assert WILDCARD_KINDS == frozenset({CredentialKind.API_KEY, CredentialKind.SESSION_JWT})
    for kind in CredentialKind:
        if kind in WILDCARD_KINDS:
            assert Principal(user=None, holder_user_id=None, kind=kind).scopes == ALL_SCOPES
            continue
        for scopes in (ALL_SCOPES, frozenset({ALL, "chaotic:read"}), frozenset({1})):
            with pytest.raises(ValueError, match="never the wildcard"):
                Principal(user=None, holder_user_id=None, kind=kind, scopes=scopes)
        # And the default, which is the wildcard, too.
        with pytest.raises(ValueError):
            Principal(user=None, holder_user_id=None, kind=kind)


def test_scopes():
    p = Principal(user=None, holder_user_id=None, kind=CredentialKind.API_KEY)
    assert p.scopes == ALL_SCOPES and p.has_scope("chaotic:write")
    narrow = Principal(
        user=None, holder_user_id=None, kind=CredentialKind.OAUTH_ACCESS,
        scopes=frozenset({"chaotic:read"}),
    )
    assert narrow.has_scope("chaotic:read") and not narrow.has_scope("chaotic:write")


@pytest.mark.asyncio
async def test_missing(db):
    with pytest.raises(CredentialError) as exc:
        await rest_resolver.resolve(None)
    assert exc.value.failure is CredentialFailure.MISSING
    assert exc.value.kind is None and exc.value.status_code == 401


@pytest.mark.asyncio
async def test_api_key_principal(db, test_user):
    record, key = await APIKeyService().create(test_user.id, APIKeyCreate(name="k"))
    for resolver in (rest_resolver, mcp_resolver):
        p = await resolver.resolve(key)
        assert p.user.id == test_user.id
        assert p.holder_user_id == test_user.id
        assert p.kind is CredentialKind.API_KEY
        assert p.credential_id == record.id
        assert p.scopes == ALL_SCOPES


@pytest.mark.asyncio
async def test_jwt_principal_on_rest_unsupported_on_mcp(db, test_user):
    token = create_access_token(data={"sub": test_user.id})
    p = await rest_resolver.resolve(token)
    assert p.user.id == test_user.id and p.holder_user_id == test_user.id
    assert p.kind is CredentialKind.SESSION_JWT and p.credential_id is None

    with pytest.raises(CredentialError) as exc:
        await mcp_resolver.resolve(token)
    assert exc.value.failure is CredentialFailure.UNSUPPORTED
    assert exc.value.kind is CredentialKind.SESSION_JWT


@pytest.mark.asyncio
async def test_invalid_and_inactive_carry_kind_and_status(db, test_user):
    with pytest.raises(CredentialError) as exc:
        await mcp_resolver.resolve("ck_" + "0" * 64)
    assert (exc.value.failure, exc.value.kind, exc.value.status_code) == (
        CredentialFailure.INVALID, CredentialKind.API_KEY, 401,
    )

    _, key = await APIKeyService().create(test_user.id, APIKeyCreate(name="k"))
    test_user.is_active = False
    await test_user.save(update_fields={"is_active"})
    with pytest.raises(CredentialError) as exc:
        await rest_resolver.resolve(key)
    assert exc.value.failure is CredentialFailure.INACTIVE and exc.value.status_code == 403


@pytest.mark.asyncio
async def test_mcp_picks_its_challenge_by_the_failed_kind(monkeypatch):
    """The CHT-1576 seam: a failed credential of a kind other than an API
    key (an OAuth access token, once accepted) gets the invalid_token
    challenge and the resolver's detail; a failed key gets the bare one."""
    from app.mcp_server import auth

    bare, missing, invalid = {"WWW-Authenticate": "Bearer"}, {"WWW-Authenticate": "m"}, {"WWW-Authenticate": "i"}

    async def failing(kind):
        async def resolve(token):
            raise CredentialError(CredentialFailure.INVALID, "Invalid token", kind=kind)
        return resolve

    monkeypatch.setattr(auth.mcp_resolver, "resolve", await failing(CredentialKind.OAUTH_ACCESS))
    _, error = await auth._resolve("opaque", missing, invalid)
    assert (error.status_code, error.headers["www-authenticate"], error.body) == (401, "i", b'{"error":"Invalid token"}')

    monkeypatch.setattr(auth.mcp_resolver, "resolve", await failing(CredentialKind.API_KEY))
    _, error = await auth._resolve("ck_x", missing, invalid)
    assert error.headers["www-authenticate"] == bare["WWW-Authenticate"]


# --- OAuth access tokens (CHT-1576) --------------------------------------------


@pytest.fixture
def oauth_on(monkeypatch):
    enable_oauth(monkeypatch)
    yield
    ts._reset_for_tests()


@pytest_asyncio.fixture
async def agent(oauth_on, db, test_team, test_user):
    return await make_agent(test_team, test_user)


@pytest_asyncio.fixture
async def connector(agent, test_team, test_user):
    return await connector_token(agent, test_team, test_user, scopes=("chaotic:read", "offline_access"))


async def _refused(resolver, raw, failure=CredentialFailure.INVALID):
    with pytest.raises(CredentialError) as exc:
        await resolver.resolve(raw)
    assert exc.value.failure is failure and exc.value.kind is CredentialKind.OAUTH_ACCESS
    return exc.value


@pytest.mark.asyncio
async def test_connector_token_principal_at_mcp(connector, agent, test_user):
    p = await mcp_resolver.resolve(connector.access_token)
    assert p.user.id == agent.id and p.holder_user_id == test_user.id
    assert p.kind is CredentialKind.OAUTH_ACCESS
    assert p.scopes == frozenset({"chaotic:read", "offline_access"})
    assert p.holder_session_id == connector.holder_session_id
    assert p.credential_id is None


@pytest.mark.asyncio
async def test_audience(connector, agent, test_team, test_user):
    """I16: a connector token only at /mcp, a whole-server token at both."""
    err = await _refused(rest_resolver, connector.access_token)
    assert err.status_code == 401 and "not issued for this resource" in err.detail
    with pytest.raises(CredentialError) as exc:
        await capability_url_resolver.resolve(connector.access_token)
    assert exc.value.failure is CredentialFailure.UNSUPPORTED

    issued, key = await server_token(agent, test_team, test_user)
    for resolver in (rest_resolver, mcp_resolver):
        p = await resolver.resolve(issued.access_token)
        assert p.user.id == agent.id and p.scopes == frozenset({"chaotic:write"})


@pytest.mark.asyncio
async def test_off_unless_oauth_enabled(connector, monkeypatch):
    enable_oauth(monkeypatch, enabled=False)
    for resolver in (rest_resolver, mcp_resolver):
        assert (await _refused(resolver, connector.access_token)).status_code == 401


@pytest.mark.asyncio
async def test_not_an_access_token(connector):
    for raw in (connector.refresh_token, "cat_" + "0" * 64, "cac_" + "0" * 64):
        await _refused(mcp_resolver, raw)


@pytest.mark.asyncio
async def test_revoked_session(connector):
    await mcp_resolver.resolve(connector.access_token)  # cached now
    await TokenService().revoke_session(connector.holder_session_id, actor_id=None, reason="test")
    await _refused(mcp_resolver, connector.access_token)


@pytest.mark.asyncio
async def test_expired_token(connector):
    past = datetime.now(timezone.utc) - timedelta(seconds=1)
    await OxydeAuthToken.objects.filter(token_hash=ts.token_digest(connector.access_token)).update(expires_at=past)
    await _refused(mcp_resolver, connector.access_token)


@pytest.mark.asyncio
async def test_holder_leaving_the_team_ends_it_at_once(connector, test_team, test_user):
    """Checked per request, not cached with the token (the ck_ rule,
    CHT-1508): the validation is cached, the membership is not."""
    await mcp_resolver.resolve(connector.access_token)
    await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=test_user.id).delete()
    await _refused(mcp_resolver, connector.access_token)


@pytest.mark.asyncio
async def test_deactivated_holder(connector, test_user):
    await mcp_resolver.resolve(connector.access_token)
    test_user.is_active = False
    await test_user.save(update_fields={"is_active"})
    await _refused(mcp_resolver, connector.access_token)


@pytest.mark.asyncio
async def test_deactivated_agent_is_inactive(connector, agent):
    await mcp_resolver.resolve(connector.access_token)
    agent.is_active = False
    await agent.save(update_fields={"is_active"})
    err = await _refused(mcp_resolver, connector.access_token, CredentialFailure.INACTIVE)
    assert err.status_code == 403


@pytest.mark.asyncio
async def test_deleted_principal_or_holder(agent, test_team, test_user):
    """A deleted agent or holder cascades its session away, but a
    validation cached just before still passes TokenService for up to
    30 s (no revocation event moves the epoch). The resolver's own
    lookups catch it."""
    from app.oxyde_models.user import OxydeUser

    holder = await OxydeUser.objects.create(email="holder@example.com", hashed_password="x", name="Holder")
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=holder.id, role="MEMBER")
    held = await connector_token(agent, test_team, holder)
    await mcp_resolver.resolve(held.access_token)  # cached now
    await OxydeUser.objects.filter(id=holder.id).delete()
    assert (await TokenService().validate_access(held.access_token, resource=ts.mcp_resource())).holder_user_id == holder.id
    await _refused(mcp_resolver, held.access_token)

    issued = await connector_token(agent, test_team, test_user)
    await mcp_resolver.resolve(issued.access_token)
    await OxydeUser.objects.filter(id=agent.id).delete()
    err = await _refused(mcp_resolver, issued.access_token)
    assert err.detail == "User not found"


@pytest.mark.asyncio
async def test_wrong_audience_leaves_nothing_written(client, connector):
    """A token refused at a resource is not marked used, and its session
    gets no last-used time (CHT-1576 review, N2)."""
    from app.oxyde_models.oauth import OxydeHolderSession

    refused = await client.get("/api/auth/me", headers=bearer(connector))
    assert refused.status_code == 401
    row = await OxydeAuthToken.objects.get(token_hash=ts.token_digest(connector.access_token))
    session = await OxydeHolderSession.objects.get(id=connector.holder_session_id)
    assert row.used_at is None and session.last_used_at is None

    await mcp_resolver.resolve(connector.access_token)
    row = await OxydeAuthToken.objects.get(token_hash=ts.token_digest(connector.access_token))
    assert row.used_at is not None
    # Cached now; a refusal from the cache writes nothing either.
    await _refused(rest_resolver, connector.access_token)


@pytest.mark.asyncio
async def test_ws_refuses_an_oauth_token(connector, test_team):
    """/ws checks a login JWT itself (CHT-1567); an OAuth token never
    decodes as one, so it closes with 4001. When /ws moves onto the
    resolver, decide whether it is an OAuth audience."""
    from unittest.mock import AsyncMock

    from app.main import websocket_endpoint

    ws = AsyncMock()
    await websocket_endpoint(ws, token=connector.access_token, team_id=test_team.id)
    ws.close.assert_awaited_once_with(code=4001)


@pytest.mark.asyncio
async def test_principal_must_be_an_agent_of_the_sessions_team(agent, test_team, test_user):
    # A human principal: refused until web-login sessions (CHT-1524).
    human = await connector_token(test_user, test_team, test_user)
    await _refused(mcp_resolver, human.access_token)

    # An agent of another team, under a session for this one.
    other = await OxydeTeam.objects.create(name="Other", key="OTH")
    await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user.id, role="OWNER")
    stray = await make_agent(other, test_user, email="stray@example.com")
    mismatched = await connector_token(stray, test_team, test_user)
    await _refused(mcp_resolver, mismatched.access_token)


@pytest.mark.asyncio
async def test_project_scoped_sessions_fail_closed(agent, test_team, test_user, test_project):
    """CHT-1575: nothing narrows a principal to a set of projects yet, so a
    session naming projects is accepted only for an agent that is itself
    scoped to one of them."""
    team_wide_agent = await connector_token(agent, test_team, test_user, project_ids=[test_project.id])
    err = await _refused(mcp_resolver, team_wide_agent.access_token)
    assert "project-scoped" in err.detail

    scoped = await make_agent(test_team, test_user, email="scoped@example.com", project_id=test_project.id)
    inside = await connector_token(scoped, test_team, test_user, project_ids=[test_project.id])
    assert (await mcp_resolver.resolve(inside.access_token)).user.id == scoped.id
    outside = await connector_token(scoped, test_team, test_user, project_ids=["some-other-project"])
    await _refused(mcp_resolver, outside.access_token)


@pytest.mark.asyncio
async def test_claim_session_dies_with_its_key(agent, test_team, test_user):
    issued, key = await server_token(agent, test_team, test_user)
    await rest_resolver.resolve(issued.access_token)
    await APIKeyService().revoke(await OxydeAPIKey.objects.get(id=key.id))
    await _refused(rest_resolver, issued.access_token)

    issued, key = await server_token(agent, test_team, test_user)
    past = datetime.now(timezone.utc) - timedelta(seconds=1)
    await OxydeAPIKey.objects.filter(id=key.id).update(expires_at=past)
    await _refused(mcp_resolver, issued.access_token)


@pytest.mark.asyncio
async def test_rest_over_http(client, agent, connector, test_team, test_user):
    """REST: a whole-server token signs in as its agent; a connector token
    is refused with the invalid_token challenge (threat S2)."""
    issued, _ = await server_token(agent, test_team, test_user)
    me = await client.get("/api/auth/me", headers=bearer(issued))
    assert me.status_code == 200 and me.json()["id"] == agent.id

    refused = await client.get("/api/auth/me", headers=bearer(connector))
    assert refused.status_code == 401
    assert refused.headers["www-authenticate"] == 'Bearer error="invalid_token"'

    # A failed JWT keeps the bare challenge.
    jwt = await client.get("/api/auth/me", headers={"Authorization": "Bearer not-a-jwt"})
    assert jwt.status_code == 401 and jwt.headers["www-authenticate"] == "Bearer"


@pytest.mark.asyncio
async def test_rest_challenge_with_oauth_off(client, agent, test_team, test_user, monkeypatch):
    """With the flag off a cat_ bearer gets the bare challenge on REST, as
    it did before CHT-1576 and as /mcp does (review N3)."""
    issued, _ = await server_token(agent, test_team, test_user)
    enable_oauth(monkeypatch, enabled=False)
    refused = await client.get("/api/auth/me", headers=bearer(issued))
    assert refused.status_code == 401 and refused.headers["www-authenticate"] == "Bearer"


@pytest.mark.asyncio
async def test_rest_scope_enforced(client, agent, test_team, test_user, test_project):
    """The token's scopes reach authorize(): a read token can read and
    cannot write (CHT-1562), on REST."""
    issued, _ = await server_token(agent, test_team, test_user, scopes=("chaotic:read",))
    read = await client.get(f"/api/issues?project_id={test_project.id}", headers=bearer(issued))
    assert read.status_code == 200, read.text
    write = await client.post(f"/api/projects/{test_project.id}/issues", json={"title": "x"}, headers=bearer(issued))
    assert write.status_code == 403 and write.json()["detail"]["error_code"] == "policy_denied"


@pytest.mark.asyncio
async def test_oauth_agent_cannot_mint_keys(client, agent, test_team, test_user):
    """An agent on an OAuth token has no calling key, so it cannot mint
    itself a long-lived ck_ key (which would outlive the connection)."""
    issued, _ = await server_token(agent, test_team, test_user)
    resp = await client.post("/api/api-keys", json={"name": "escape"}, headers=bearer(issued))
    assert resp.status_code == 403, resp.text


@pytest.mark.asyncio
async def test_auth_method_names_oauth():
    from fastapi.security import HTTPAuthorizationCredentials

    from app.api.deps import get_auth_method

    def creds(token):
        return HTTPAuthorizationCredentials(scheme="Bearer", credentials=token)

    assert await get_auth_method(creds("cat_" + "0" * 64)) == "oauth"
    assert await get_auth_method(creds("ck_x")) == "api_key"
    assert await get_auth_method(creds("eyJ.x.y")) == "jwt"
    assert await get_auth_method(None) == "unknown"
