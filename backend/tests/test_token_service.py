"""TokenService (CHT-1516): opaque prefixed tokens stored as digests,
validation with audience and a revocation-epoch cache, single-use codes,
and refresh rotation with reuse detection and a 30 s grace replay.

Invariants from the design doc (§6.2): I15, a token authenticates only on
an unrevoked holder session; I16, only at the resource it was issued for.
"""
import hashlib
from datetime import datetime, timedelta, timezone

import pytest
import pytest_asyncio

from app.config import get_settings
from app.enums import HolderVia, InboxEntryKind, OAuthClientRegistration, TokenKind
from app.mcp_server.auth import _redact_key
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.oauth import OxydeAuthToken, OxydeHolderSession, OxydeOAuthClient, OxydeRevocationEvent
from app.oxyde_models.user import OxydeUser
from app.services import token_service as ts
from app.services.token_service import OAuthDisabledError, TokenError, TokenService

BASE = "https://tracker.example.com"
MCP = BASE + "/mcp"
CLIENT = "https://claude.ai/oauth/claude-client-metadata"


@pytest.fixture(autouse=True)
def oauth_on(monkeypatch):
    monkeypatch.setenv("OAUTH_ENABLED", "true")
    monkeypatch.setenv("APP_BASE_URL", BASE)
    get_settings.cache_clear()
    ts._reset_for_tests()
    yield
    get_settings.cache_clear()
    ts._reset_for_tests()


@pytest_asyncio.fixture
async def agent(db, test_team, test_user):
    return await OxydeUser.objects.create(
        email="connector@example.com", hashed_password="x", name="Claude (Test)", is_agent=True,
        parent_user_id=test_user.id, agent_team_id=test_team.id,
    )


@pytest_asyncio.fixture
async def client_row(db):
    return await OxydeOAuthClient.objects.create(
        id=CLIENT, registration=OAuthClientRegistration.CIMD, redirect_uris='["https://claude.ai/api/mcp/auth_callback"]',
    )


@pytest_asyncio.fixture
async def connection(agent, test_team, test_user, client_row):
    """An OAuth connection: holder session + access + refresh."""
    return await TokenService().start_session(
        via=HolderVia.OAUTH, team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id,
        resource=MCP, scopes=["chaotic:write", "offline_access"], oauth_client_id=CLIENT,
    )


async def _session(issued) -> OxydeHolderSession:
    return await OxydeHolderSession.objects.get(id=issued.holder_session_id)


# --- format and storage -------------------------------------------------------


async def test_tokens_are_prefixed_and_stored_only_as_digests(connection):
    assert connection.access_token.startswith("cat_") and len(connection.access_token) == 4 + 64
    assert connection.refresh_token.startswith("crt_")
    rows = await OxydeAuthToken.objects.filter(holder_session_id=connection.holder_session_id).all()
    assert {r.kind for r in rows} == {TokenKind.ACCESS, TokenKind.REFRESH}
    raws = {connection.access_token, connection.refresh_token}
    for row in rows:
        values = set(map(str, row.model_dump().values()))
        assert not raws & values, "a raw token was stored"
        assert row.token_hash in {hashlib.sha256(r.encode()).hexdigest() for r in raws}
        assert row.display_prefix in {r[:8] for r in raws}


async def test_validated_token_carries_what_a_principal_needs(connection, agent, test_user, test_team):
    v = await TokenService().validate_access(connection.access_token, resource=MCP)
    assert (v.principal_user_id, v.holder_user_id, v.team_id) == (agent.id, test_user.id, test_team.id)
    assert v.via == HolderVia.OAUTH and v.oauth_client_id == CLIENT
    assert v.scopes == ("chaotic:write", "offline_access") and v.policy_name == "write"
    assert v.scope_project_ids is None and v.holder_session_id == connection.holder_session_id
    assert v.expires_at == connection.access_expires_at
    assert 0 < connection.expires_in() <= 600


# --- I16: audience -------------------------------------------------------------


async def test_connector_token_is_refused_on_rest(connection):
    with pytest.raises(TokenError) as e:
        await TokenService().validate_access(connection.access_token, resource=BASE)
    assert e.value.error == "invalid_token"


async def test_claim_token_is_accepted_on_rest_and_mcp(agent, test_team, test_user):
    issued = await TokenService().start_session(
        via=HolderVia.GRANTEE_CREDENTIAL, team_id=test_team.id, principal_user_id=agent.id,
        holder_user_id=test_user.id, resource=BASE, offline=False,
    )
    assert issued.refresh_token is None
    for resource in (BASE, MCP):
        assert (await TokenService().validate_access(issued.access_token, resource=resource)).via == (
            HolderVia.GRANTEE_CREDENTIAL
        )
    for elsewhere in ("https://elsewhere.example/mcp", BASE + "/mcp/a/1", "https://träcker.example/mcp"):
        with pytest.raises(TokenError):
            await TokenService().validate_access(issued.access_token, resource=elsewhere)


async def test_holder_metadata_is_capped(agent, test_team, test_user):
    session = await TokenService().start_session(
        via=HolderVia.CLAIM_TICKET, team_id=test_team.id, principal_user_id=agent.id,
        holder_user_id=test_user.id, resource=BASE, holder={"label": "sprite 7"}, offline=False,
    )
    assert (await _session(session)).holder == '{"label": "sprite 7"}'
    with pytest.raises(ValueError):
        await TokenService().start_session(
            via=HolderVia.CLAIM_TICKET, team_id=test_team.id, principal_user_id=agent.id,
            holder_user_id=test_user.id, resource=BASE, holder={"label": "x" * ts.HOLDER_JSON_MAX},
        )


async def test_a_token_is_not_yet_a_bearer_anywhere(client, connection):
    """Until the CredentialResolver (CHT-1560) and scope enforcement
    (CHT-1562) land, a cat_ bearer gets 401 on REST and on /mcp."""
    headers = {"Authorization": f"Bearer {connection.access_token}"}
    assert (await client.get("/api/auth/me", headers=headers)).status_code == 401
    assert (await client.post("/mcp", json={"jsonrpc": "2.0", "id": 1, "method": "ping"}, headers=headers)).status_code == 401


# --- I15: only unrevoked sessions, only access tokens ---------------------------


async def test_only_an_access_token_validates(connection):
    service = TokenService()
    for raw in (connection.refresh_token, "cat_" + "0" * 64, "ck_" + "0" * 64, "not-a-token"):
        with pytest.raises(TokenError):
            await service.validate_access(raw, resource=MCP)


async def test_expired_access_token_and_session_are_refused(connection):
    service = TokenService()
    past = datetime.now(timezone.utc) - timedelta(seconds=1)
    await OxydeAuthToken.objects.filter(token_hash=ts.token_digest(connection.access_token)).update(expires_at=past)
    with pytest.raises(TokenError):
        await service.validate_access(connection.access_token, resource=MCP)

    fresh = await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    await OxydeHolderSession.objects.filter(id=fresh.holder_session_id).update(absolute_expires_at=past)
    ts.bump_revocation_epoch()
    with pytest.raises(TokenError):
        await service.validate_access(fresh.access_token, resource=MCP)


async def test_revoking_the_session_ends_its_tokens_at_once(connection, test_user):
    service = TokenService()
    await service.validate_access(connection.access_token, resource=MCP)  # now cached
    assert await service.revoke_session(connection.holder_session_id, actor_id=test_user.id, reason="user")
    with pytest.raises(TokenError):
        await service.validate_access(connection.access_token, resource=MCP)
    with pytest.raises(TokenError) as e:
        await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    assert e.value.error == "invalid_grant"
    rows = await OxydeAuthToken.objects.filter(holder_session_id=connection.holder_session_id).all()
    assert all(r.revoked_at is not None for r in rows)
    event = await OxydeRevocationEvent.objects.get(target_id=connection.holder_session_id)
    assert (event.actor_id, event.reason, event.target_type) == (test_user.id, "user", "holder_session")
    assert not await service.revoke_session(connection.holder_session_id, actor_id=None, reason="again")


async def test_cache_holds_for_its_window_until_the_epoch_moves(connection):
    """A change that bypasses the service is invisible while cached; any
    revocation's epoch bump makes the next request re-read (I4)."""
    service = TokenService()
    await service.validate_access(connection.access_token, resource=MCP)
    await OxydeHolderSession.objects.filter(id=connection.holder_session_id).update(
        revoked_at=datetime.now(timezone.utc),
    )
    await service.validate_access(connection.access_token, resource=MCP)  # served from cache
    before = ts.revocation_epoch()
    assert ts.bump_revocation_epoch() == before + 1
    with pytest.raises(TokenError):
        await service.validate_access(connection.access_token, resource=MCP)


async def test_cache_expires_after_its_window(connection, monkeypatch):
    service = TokenService()
    await service.validate_access(connection.access_token, resource=MCP)
    await OxydeHolderSession.objects.filter(id=connection.holder_session_id).update(
        revoked_at=datetime.now(timezone.utc),
    )
    clock = ts.time.monotonic() + ts.VALIDATION_CACHE_SECONDS + 1
    monkeypatch.setattr(ts.time, "monotonic", lambda: clock)
    with pytest.raises(TokenError):
        await service.validate_access(connection.access_token, resource=MCP)


# --- refresh rotation, reuse detection, grace -----------------------------------


async def test_refresh_rotates_and_slides_the_idle_expiry(connection):
    service = TokenService()
    before = await _session(connection)
    fresh = await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    assert fresh.refresh_token != connection.refresh_token and fresh.access_token != connection.access_token
    assert fresh.holder_session_id == connection.holder_session_id
    await service.validate_access(fresh.access_token, resource=MCP)
    old = await OxydeAuthToken.objects.get(token_hash=ts.token_digest(connection.refresh_token))
    new = await OxydeAuthToken.objects.get(token_hash=ts.token_digest(fresh.refresh_token))
    assert old.used_at is not None and new.replaces_id == old.id
    after = await _session(connection)
    assert after.last_refreshed_at is not None and after.idle_expires_at >= before.idle_expires_at
    assert after.idle_expires_at <= after.absolute_expires_at


async def test_grace_replay_returns_the_same_pair(connection):
    service = TokenService()
    first = await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    again = await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    assert again == first
    assert (await _session(connection)).revoked_at is None


async def _assert_revoked_for_reuse(session_id, holder_id):
    session = await OxydeHolderSession.objects.get(id=session_id)
    assert session.revoked_at is not None and session.revoked_reason == ts.REASON_REFRESH_REUSE
    notices = await OxydeInboxEntry.objects.filter(recipient_user_id=holder_id, kind=InboxEntryKind.AGENT_STATUS).all()
    assert len(notices) == 1 and "revoked" in notices[0].title


async def test_reuse_after_the_successor_was_used_revokes_the_session(connection, test_user):
    service = TokenService()
    second = await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    third = await service.refresh(second.refresh_token, oauth_client_id=CLIENT)
    with pytest.raises(TokenError) as e:
        await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    assert e.value.error == "invalid_grant"
    await _assert_revoked_for_reuse(connection.holder_session_id, test_user.id)
    with pytest.raises(TokenError):
        await service.validate_access(third.access_token, resource=MCP)
    with pytest.raises(TokenError):
        await service.refresh(third.refresh_token, oauth_client_id=CLIENT)


async def test_reuse_after_the_grace_window_revokes_the_session(connection, test_user):
    service = TokenService()
    await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    await OxydeAuthToken.objects.filter(token_hash=ts.token_digest(connection.refresh_token)).update(
        used_at=datetime.now(timezone.utc) - ts.REFRESH_GRACE - timedelta(seconds=1),
    )
    with pytest.raises(TokenError):
        await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    await _assert_revoked_for_reuse(connection.holder_session_id, test_user.id)


async def test_grace_replay_after_a_restart_is_refused_without_revoking(connection):
    service = TokenService()
    first = await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    ts._grace_pairs.clear()  # what a restart inside the window leaves
    with pytest.raises(TokenError) as e:
        await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    assert e.value.error == "invalid_grant"
    assert (await _session(connection)).revoked_at is None
    await service.validate_access(first.access_token, resource=MCP)


async def test_refresh_is_bound_to_its_client_and_may_only_narrow(connection):
    service = TokenService()
    with pytest.raises(TokenError) as e:
        await service.refresh(connection.refresh_token, oauth_client_id="https://evil.example/client")
    assert e.value.error == "invalid_grant"
    with pytest.raises(TokenError) as e:
        await service.refresh(connection.refresh_token, oauth_client_id=CLIENT, scopes="chaotic:write chaotic:admin")
    assert e.value.error == "invalid_scope"
    narrowed = await service.refresh(connection.refresh_token, oauth_client_id=CLIENT, scopes="chaotic:write")
    assert narrowed.scopes == ("chaotic:write",)
    assert (await service.validate_access(narrowed.access_token, resource=MCP)).scopes == ("chaotic:write",)
    # The refresh token keeps the session's full grant.
    wider = await service.refresh(narrowed.refresh_token, oauth_client_id=CLIENT)
    assert wider.scopes == ("chaotic:write", "offline_access")


async def test_expired_refresh_token_is_invalid_grant(connection):
    await OxydeHolderSession.objects.filter(id=connection.holder_session_id).update(
        idle_expires_at=datetime.now(timezone.utc) - timedelta(seconds=1),
    )
    with pytest.raises(TokenError) as e:
        await TokenService().refresh(connection.refresh_token, oauth_client_id=CLIENT)
    assert e.value.error == "invalid_grant"
    assert (await _session(connection)).revoked_at is None


# --- single-use codes and tickets ----------------------------------------------


async def test_a_code_is_single_use_and_reuse_revokes_what_it_started(agent, test_team, test_user, client_row):
    service = TokenService()
    _row, code = await service.mint_single_use(
        TokenKind.AUTH_CODE, team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id,
        resource=MCP, scopes=["chaotic:write"], oauth_client_id=CLIENT, code_challenge="c",
        redirect_uri="https://claude.ai/api/mcp/auth_callback",
    )
    assert code.startswith("cac_")
    redeemed = await service.redeem_single_use(code, TokenKind.AUTH_CODE)
    issued = await service.start_session(
        via=HolderVia.OAUTH, team_id=redeemed.team_id, principal_user_id=redeemed.principal_user_id,
        holder_user_id=redeemed.holder_user_id, resource=redeemed.resource, scopes=["chaotic:write"],
        oauth_client_id=CLIENT, from_token=redeemed,
    )
    with pytest.raises(TokenError) as e:
        await service.redeem_single_use(code, TokenKind.AUTH_CODE)
    assert e.value.error == "invalid_grant"
    session = await _session(issued)
    assert session.revoked_reason == ts.REASON_CODE_REUSE
    with pytest.raises(TokenError):
        await service.validate_access(issued.access_token, resource=MCP)


async def test_expired_or_wrong_kind_codes_are_refused(agent, test_team, test_user, test_user2):
    from app.schemas.api_key import APIKeyCreate
    from app.services.api_key_service import APIKeyService

    key, _ = await APIKeyService().create(agent.id, APIKeyCreate(name="grantee"), holder_user_id=test_user.id)
    service = TokenService()
    row, ticket = await service.mint_single_use(
        TokenKind.CLAIM_TICKET, team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id,
        resource=BASE, minted_by_credential_id=key.id,
    )
    assert ticket.startswith("cct_")
    with pytest.raises(TokenError):
        await service.redeem_single_use(ticket, TokenKind.AUTH_CODE)
    await OxydeAuthToken.objects.filter(id=row.id).update(expires_at=datetime.now(timezone.utc) - timedelta(seconds=1))
    with pytest.raises(TokenError):
        await service.redeem_single_use(ticket, TokenKind.CLAIM_TICKET)
    with pytest.raises(ValueError):
        await service.mint_single_use(
            TokenKind.ACCESS, team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id,
            resource=BASE,
        )
    with pytest.raises(ValueError):
        await service.mint_single_use(
            TokenKind.AUTH_CODE, team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id,
            resource=MCP,
        )


# --- OAUTH_ENABLED ----------------------------------------------------------------


async def test_everything_but_revocation_refuses_while_oauth_is_off(connection, monkeypatch, agent, test_team, test_user):
    monkeypatch.setenv("OAUTH_ENABLED", "false")
    get_settings.cache_clear()
    service = TokenService()
    with pytest.raises(OAuthDisabledError):
        await service.validate_access(connection.access_token, resource=MCP)
    with pytest.raises(OAuthDisabledError):
        await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    with pytest.raises(OAuthDisabledError):
        await service.start_session(
            via=HolderVia.OAUTH, team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id,
            resource=MCP,
        )
    assert await service.revoke_session(connection.holder_session_id, actor_id=None, reason="admin")


# --- log redaction ----------------------------------------------------------------


@pytest.mark.parametrize("prefix", ["ck_", "cat_", "crt_", "cac_", "cct_"])
def test_path_redaction_keeps_every_minted_prefix(prefix):
    secret = prefix + "ab" * 32
    assert _redact_key(secret) == f"{prefix}...{secret[-4:]}"
