"""TokenService (CHT-1516): opaque prefixed tokens stored as digests,
validation with audience and a revocation-epoch cache, single-use codes,
and refresh rotation with reuse detection and a 30 s grace replay.

Invariants from the design doc (§6.2): I15, a token authenticates only on
an unrevoked holder session; I16, only at the resource it was issued for.
"""
import asyncio
import hashlib
from datetime import datetime, timedelta, timezone

import pytest
import pytest_asyncio

from app.config import get_settings
from app.enums import HolderVia, InboxEntryKind, OAuthClientRegistration, RevocationTarget, TokenKind
from app.mcp_server.auth import _redact_key
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.oauth import OxydeAuthToken, OxydeHolderSession, OxydeOAuthClient, OxydeRevocationEvent
from app.oxyde_models.user import OxydeUser
from app.services import token_service as ts
from app.services.token_service import OAuthDisabledError, TokenError, TokenService

BASE = "https://tracker.example.com"
MCP = BASE + "/mcp"
CLIENT = "https://claude.ai/oauth/claude-client-metadata"


@pytest_asyncio.fixture
async def db(tmp_path, schema_template):
    """This module's own `db`: the conftest one with a pool of 4 instead of
    1. With one connection a second transaction waits for the connection
    and never reaches SQLite's write lock, so the races below would not
    exercise what the service's ordering comments rely on in production.
    Same template copy and the same create re-fetch as conftest."""
    import os

    from oxyde import AsyncDatabase, PoolSettings, disconnect_all
    from oxyde.queries.manager import QueryManager

    from .conftest import _assert_revision_history_current, _copy_database

    db_path = str(tmp_path / "test.db")
    _copy_database(schema_template, db_path)
    os.environ["DATABASE_URL"] = f"sqlite+aiosqlite:///{db_path}"
    get_settings.cache_clear()
    database = AsyncDatabase(f"sqlite:///{db_path}", overwrite=True, settings=PoolSettings(max_connections=4))
    await database.connect()
    import app.oxyde_models  # noqa: F401

    original_create = QueryManager.create

    async def create_and_refetch(self, **kwargs):
        obj = await original_create(self, **kwargs)
        return await self.get(id=obj.id) if getattr(obj, "id", None) is not None else obj

    QueryManager.create = create_and_refetch
    yield None
    QueryManager.create = original_create
    try:
        await _assert_revision_history_current()
    finally:
        await disconnect_all()
        os.environ.pop("DATABASE_URL", None)
        get_settings.cache_clear()


async def test_the_pool_has_more_than_one_connection(db):
    """Guards the fixture above: two transactions are open at once."""
    from oxyde import atomic

    inside = asyncio.Event()
    release = asyncio.Event()

    async def hold():
        async with atomic():
            await OxydeRevocationEvent.objects.filter(id="none").count()
            inside.set()
            await release.wait()

    async def other():
        await inside.wait()
        async with atomic():
            await OxydeRevocationEvent.objects.filter(id="none").count()
        release.set()

    await asyncio.wait_for(asyncio.gather(hold(), other()), timeout=5)


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


async def _mint_code(agent, team, user, scopes=("chaotic:write", "offline_access")):
    return await TokenService().mint_single_use(
        TokenKind.AUTH_CODE, team_id=team.id, principal_user_id=agent.id, holder_user_id=user.id,
        resource=MCP, scopes=scopes, oauth_client_id=CLIENT, code_challenge="c",
        redirect_uri="https://claude.ai/api/mcp/auth_callback",
    )


@pytest_asyncio.fixture
async def connection(agent, test_team, test_user, client_row):
    """An OAuth connection, the only way one is made: code minted at
    consent, redeemed, session started from it."""
    service = TokenService()
    _row, code = await _mint_code(agent, test_team, test_user)
    return await service.start_session_from(await service.redeem_single_use(code, TokenKind.AUTH_CODE))


@pytest_asyncio.fixture
async def grantee_key(agent, test_user):
    from app.schemas.api_key import APIKeyCreate
    from app.services.api_key_service import APIKeyService

    key, _ = await APIKeyService().create(agent.id, APIKeyCreate(name="grantee"), holder_user_id=test_user.id)
    return key


async def _session(issued) -> OxydeHolderSession:
    return await OxydeHolderSession.objects.get(id=issued.holder_session_id)


# --- format and storage -------------------------------------------------------


async def test_tokens_are_prefixed_and_stored_only_as_digests(connection):
    assert connection.access_token.startswith("cat_") and len(connection.access_token) == 4 + 64
    assert connection.refresh_token.startswith("crt_")
    rows = await OxydeAuthToken.objects.filter(holder_session_id=connection.holder_session_id).all()
    # The code that started the session is linked to it too.
    assert sorted(r.kind.value for r in rows) == ["access", "auth_code", "refresh"]
    rows = [r for r in rows if r.kind != TokenKind.AUTH_CODE]
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


async def test_claim_token_is_accepted_on_rest_and_mcp(agent, test_team, test_user, grantee_key):
    issued = await TokenService().start_session(
        team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id,
        credential_id=grantee_key.id, resource=BASE, offline=False,
    )
    assert issued.refresh_token is None
    for resource in (BASE, MCP):
        assert (await TokenService().validate_access(issued.access_token, resource=resource)).via == (
            HolderVia.GRANTEE_CREDENTIAL
        )
    for elsewhere in ("https://elsewhere.example/mcp", BASE + "/mcp/a/1", "https://träcker.example/mcp"):
        with pytest.raises(TokenError):
            await TokenService().validate_access(issued.access_token, resource=elsewhere)


async def test_holder_metadata_is_capped(agent, test_team, test_user, grantee_key):
    common = dict(team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id,
                  credential_id=grantee_key.id, resource=BASE)
    session = await TokenService().start_session(holder={"label": "sprite 7"}, offline=False, **common)
    assert (await _session(session)).holder == '{"label": "sprite 7"}'
    with pytest.raises(ValueError):
        await TokenService().start_session(holder={"label": "x" * ts.HOLDER_JSON_MAX}, **common)


# A token as a bearer on REST and /mcp (the credential resolver, CHT-1576):
# tests/test_credential_resolver.py and TestOAuthAccessTokens in
# tests/test_mcp_endpoint.py.


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
    assert (event.actor_id, event.reason, event.target_type) == (test_user.id, "user", RevocationTarget.HOLDER_SESSION)
    epoch = await ts.revocation_epoch()
    assert event.seq == epoch
    # Revoking again writes nothing and leaves the epoch where it was.
    assert not await service.revoke_session(connection.holder_session_id, actor_id=None, reason="again")
    assert await ts.revocation_epoch() == epoch


async def test_cache_holds_for_its_window_until_the_epoch_moves(connection):
    """A change that bypasses revoke_session is invisible while cached; a
    revocation written by anyone, including another process (simulated
    here by writing the event row directly), makes the next request in
    this process re-read (I4)."""
    service = TokenService()
    await service.validate_access(connection.access_token, resource=MCP)
    await OxydeHolderSession.objects.filter(id=connection.holder_session_id).update(
        revoked_at=datetime.now(timezone.utc),
    )
    await service.validate_access(connection.access_token, resource=MCP)  # served from cache
    before = await ts.revocation_epoch()
    await OxydeRevocationEvent.objects.create(
        seq=before + 1, target_type=RevocationTarget.HOLDER_SESSION, target_id="elsewhere",
    )
    assert await ts.revocation_epoch() == before + 1
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


async def _assert_live_and_quiet(session_id, holder_id):
    session = await OxydeHolderSession.objects.get(id=session_id)
    assert session.revoked_at is None
    assert await OxydeInboxEntry.objects.filter(recipient_user_id=holder_id).count() == 0


async def _age_past_grace(raw_refresh):
    await OxydeAuthToken.objects.filter(token_hash=ts.token_digest(raw_refresh)).update(
        used_at=datetime.now(timezone.utc) - ts.REFRESH_GRACE - timedelta(seconds=1),
    )


async def test_reuse_after_the_successor_was_used_revokes_the_session(connection, test_user):
    """Inside the window a replay after the successor was rotated is only
    refused; after it, the same replay is reuse."""
    service = TokenService()
    second = await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    third = await service.refresh(second.refresh_token, oauth_client_id=CLIENT)
    with pytest.raises(TokenError) as e:
        await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    assert e.value.error == "invalid_grant"
    await _assert_live_and_quiet(connection.holder_session_id, test_user.id)
    await _age_past_grace(connection.refresh_token)
    with pytest.raises(TokenError):
        await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
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


async def test_grace_is_one_replay_per_rotation(connection):
    service = TokenService()
    first = await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    assert await service.refresh(connection.refresh_token, oauth_client_id=CLIENT) == first
    with pytest.raises(TokenError) as e:
        await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    assert e.value.error == "invalid_grant"
    assert (await _session(connection)).revoked_at is None
    await service.validate_access(first.access_token, resource=MCP)


async def test_a_straggler_after_the_successor_is_used_is_refused_not_revoked(connection, test_user):
    """A hosted client's concurrent burst: worker 1 rotates and calls /mcp
    with the new access token at once; worker 2's refresh of the same
    token lands 100 ms later. It gets nothing, and nobody is logged out."""
    service = TokenService()
    first = await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    await service.validate_access(first.access_token, resource=MCP)
    with pytest.raises(TokenError) as e:
        await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    assert e.value.error == "invalid_grant"
    await _assert_live_and_quiet(connection.holder_session_id, test_user.id)
    await service.validate_access(first.access_token, resource=MCP)


async def test_keep_pace_gets_no_tokens_and_a_late_replay_is_caught(connection, test_user):
    """A thief holding R1 who replays after the client started using the
    successor gets nothing; replaying after the window revokes."""
    service = TokenService()
    first = await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    await service.validate_access(first.access_token, resource=MCP)
    for _ in range(3):
        with pytest.raises(TokenError):
            await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    # The pair is gone from memory: no later replay can have it.
    assert not ts._grace_pairs
    await _age_past_grace(connection.refresh_token)
    with pytest.raises(TokenError):
        await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    await _assert_revoked_for_reuse(connection.holder_session_id, test_user.id)
    with pytest.raises(TokenError):
        await service.validate_access(first.access_token, resource=MCP)


async def test_concurrent_refreshes_hand_out_one_pair(connection):
    service = TokenService()
    results = await asyncio.gather(
        *(service.refresh(connection.refresh_token, oauth_client_id=CLIENT) for _ in range(2)),
    )
    assert results[0] == results[1]
    assert (await _session(connection)).revoked_at is None
    rows = await OxydeAuthToken.objects.filter(
        holder_session_id=connection.holder_session_id, kind=TokenKind.REFRESH,
    ).all()
    assert len(rows) == 2  # the original and exactly one successor


async def test_a_revocation_during_a_rotation_leaves_no_live_token(connection, monkeypatch):
    """revoke_session lands while a rotation is issuing: every token on
    the session ends up revoked, and no grace pair survives."""
    service = TokenService()
    real_issue = TokenService._issue
    racing = asyncio.Event()

    async def issue_then_yield(self, session, **kwargs):
        issued = await real_issue(self, session, **kwargs)
        racing.set()
        await asyncio.sleep(0.05)  # the revoke below waits for this transaction
        return issued

    monkeypatch.setattr(TokenService, "_issue", issue_then_yield)

    async def revoke_when_issuing():
        await racing.wait()
        return await service.revoke_session(connection.holder_session_id, actor_id=None, reason="admin")

    outcome, revoked = await asyncio.gather(
        service.refresh(connection.refresh_token, oauth_client_id=CLIENT), revoke_when_issuing(),
        return_exceptions=True,
    )
    assert revoked is True
    rows = await OxydeAuthToken.objects.filter(holder_session_id=connection.holder_session_id).all()
    assert rows and all(r.revoked_at is not None for r in rows)
    assert not [d for d, (_, sid, _) in ts._grace_pairs.items() if sid == connection.holder_session_id]
    if not isinstance(outcome, Exception):
        with pytest.raises(TokenError):
            await service.validate_access(outcome.access_token, resource=MCP)


async def test_refresh_is_bound_to_its_client_and_may_only_narrow(connection):
    service = TokenService()
    with pytest.raises(TokenError) as e:
        await service.refresh(connection.refresh_token, oauth_client_id="https://evil.example/client")
    assert e.value.error == "invalid_grant"
    with pytest.raises(TokenError) as e:
        await service.refresh(connection.refresh_token, oauth_client_id=CLIENT, scopes="chaotic:write chaotic:admin")
    assert e.value.error == "invalid_scope"
    narrowed = await service.refresh(connection.refresh_token, oauth_client_id=CLIENT, scopes="offline_access")
    assert narrowed.scopes == ("offline_access",)
    assert (await service.validate_access(narrowed.access_token, resource=MCP)).scopes == ("offline_access",)
    # The refresh token keeps the session's full grant (RFC 6749 §6 allows it).
    wider = await service.refresh(narrowed.refresh_token, oauth_client_id=CLIENT)
    assert wider.scopes == ("chaotic:write", "offline_access")
    # Narrowing away offline_access: an access token, and no refresh
    # token, so the response matches its scope (PR #345 review).
    last = await service.refresh(wider.refresh_token, oauth_client_id=CLIENT, scopes="chaotic:write")
    assert last.scopes == ("chaotic:write",) and last.refresh_token is None


async def test_expired_refresh_token_is_invalid_grant(connection):
    await OxydeHolderSession.objects.filter(id=connection.holder_session_id).update(
        idle_expires_at=datetime.now(timezone.utc) - timedelta(seconds=1),
    )
    with pytest.raises(TokenError) as e:
        await TokenService().refresh(connection.refresh_token, oauth_client_id=CLIENT)
    assert e.value.error == "invalid_grant"
    assert (await _session(connection)).revoked_at is None


# --- single-use codes and tickets ----------------------------------------------


async def test_a_stale_or_foreign_replay_revokes_nothing(agent, test_team, test_user, client_row):
    """Reuse revokes only when the code's own client replays it inside the
    code's lifetime (CHT-1516, PR #345 review)."""
    service = TokenService()
    _row, code = await _mint_code(agent, test_team, test_user)
    issued = await service.start_session_from(await service.redeem_single_use(code, TokenKind.AUTH_CODE, client_id=CLIENT))
    for client_id in (None, "https://evil.example/client"):
        with pytest.raises(TokenError):
            await service.redeem_single_use(code, TokenKind.AUTH_CODE, client_id=client_id)
    assert (await _session(issued)).revoked_at is None
    await OxydeAuthToken.objects.filter(id=_row.id).update(expires_at=datetime.now(timezone.utc) - timedelta(seconds=1))
    with pytest.raises(TokenError):
        await service.redeem_single_use(code, TokenKind.AUTH_CODE, client_id=CLIENT)
    assert (await _session(issued)).revoked_at is None


async def test_a_code_is_single_use_and_reuse_revokes_what_it_started(agent, test_team, test_user, client_row):
    service = TokenService()
    _row, code = await _mint_code(agent, test_team, test_user, scopes=["chaotic:write"])
    assert code.startswith("cac_")
    redeemed = await service.redeem_single_use(code, TokenKind.AUTH_CODE)
    issued = await service.start_session_from(redeemed)
    assert issued.refresh_token is None  # no offline_access granted
    assert (await OxydeAuthToken.objects.get(id=redeemed.id)).holder_session_id == issued.holder_session_id
    with pytest.raises(TokenError) as e:
        await service.redeem_single_use(code, TokenKind.AUTH_CODE, client_id=CLIENT)
    assert e.value.error == "invalid_grant"
    session = await _session(issued)
    assert session.revoked_reason == ts.REASON_CODE_REUSE
    with pytest.raises(TokenError):
        await service.validate_access(issued.access_token, resource=MCP)
    # A code starts one session at most, even replayed into start_session_from.
    with pytest.raises(TokenError):
        await service.start_session_from(redeemed)


async def test_reuse_before_the_session_starts_still_kills_it(agent, test_team, test_user, client_row):
    """The reuse lands between the winner's redemption and its
    start_session_from: the code is revoked, so the session is refused."""
    service = TokenService()
    _row, code = await _mint_code(agent, test_team, test_user)
    redeemed = await service.redeem_single_use(code, TokenKind.AUTH_CODE, client_id=CLIENT)
    with pytest.raises(TokenError):
        await service.redeem_single_use(code, TokenKind.AUTH_CODE, client_id=CLIENT)
    with pytest.raises(TokenError) as e:
        await service.start_session_from(redeemed)
    assert e.value.error == "invalid_grant"
    assert await OxydeHolderSession.objects.filter(principal_user_id=agent.id).count() == 0


async def test_a_session_takes_its_bindings_from_the_code(agent, test_team, test_user, test_user2, client_row):
    service = TokenService()
    row, code = await _mint_code(agent, test_team, test_user, scopes=["chaotic:read", "offline_access"])
    # Never redeemed: refused.
    with pytest.raises(TokenError):
        await service.start_session_from(row)
    redeemed = await service.redeem_single_use(code, TokenKind.AUTH_CODE)
    # A caller-altered row is refused, and starts nothing.
    forged = redeemed.model_copy(update={"principal_user_id": test_user2.id, "scopes": "chaotic:admin"})
    with pytest.raises(TokenError):
        await service.start_session_from(forged)
    with pytest.raises(TokenError) as e:
        await service.start_session_from(redeemed, scopes=["chaotic:write"])
    assert e.value.error == "invalid_scope"
    issued = await service.start_session_from(redeemed, scopes=["chaotic:read"])
    v = await service.validate_access(issued.access_token, resource=MCP)
    assert (v.principal_user_id, v.holder_user_id, v.scopes, v.oauth_client_id) == (
        agent.id, test_user.id, ("chaotic:read",), CLIENT,
    )
    assert issued.refresh_token is None  # narrowed away offline_access


async def test_concurrent_redemptions_spend_a_code_once(agent, test_team, test_user, client_row):
    service = TokenService()
    _row, code = await _mint_code(agent, test_team, test_user)
    results = await asyncio.gather(
        *(service.redeem_single_use(code, TokenKind.AUTH_CODE, client_id=CLIENT) for _ in range(5)),
        return_exceptions=True,
    )
    winners = [r for r in results if isinstance(r, OxydeAuthToken)]
    assert len(winners) == 1
    assert all(isinstance(r, TokenError) for r in results if r is not winners[0])
    # The losers count as reuse: the code is revoked, so it starts nothing.
    with pytest.raises(TokenError):
        await service.start_session_from(winners[0])


async def test_a_claim_ticket_starts_a_claim_session(agent, test_team, test_user, grantee_key):
    service = TokenService()
    _row, ticket = await service.mint_single_use(
        TokenKind.CLAIM_TICKET, team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id,
        resource=BASE, minted_by_credential_id=grantee_key.id,
    )
    issued = await service.start_session_from(await service.redeem_single_use(ticket, TokenKind.CLAIM_TICKET))
    assert issued.refresh_token is not None
    v = await service.validate_access(issued.access_token, resource=BASE)
    assert (v.via, v.credential_id, v.oauth_client_id) == (HolderVia.CLAIM_TICKET, grantee_key.id, None)


async def test_expired_or_wrong_kind_codes_are_refused(agent, test_team, test_user, grantee_key):
    key = grantee_key
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


async def test_everything_but_revocation_refuses_while_oauth_is_off(
    connection, monkeypatch, agent, test_team, test_user, grantee_key,
):
    _row, code = await _mint_code(agent, test_team, test_user)
    monkeypatch.setenv("OAUTH_ENABLED", "false")
    get_settings.cache_clear()
    service = TokenService()
    with pytest.raises(OAuthDisabledError):
        await service.validate_access(connection.access_token, resource=MCP)
    with pytest.raises(OAuthDisabledError):
        await service.refresh(connection.refresh_token, oauth_client_id=CLIENT)
    with pytest.raises(OAuthDisabledError):
        await service.start_session(
            team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id,
            credential_id=grantee_key.id, resource=BASE,
        )
    with pytest.raises(OAuthDisabledError):
        await service.redeem_single_use(code, TokenKind.AUTH_CODE)
    with pytest.raises(OAuthDisabledError):
        await _mint_code(agent, test_team, test_user)
    assert await service.revoke_session(connection.holder_session_id, actor_id=None, reason="admin")


# --- log redaction ----------------------------------------------------------------


@pytest.mark.parametrize("prefix", ["ck_", "cat_", "crt_", "cac_", "cct_"])
def test_path_redaction_keeps_every_minted_prefix(prefix):
    secret = prefix + "ab" * 32
    assert _redact_key(secret) == f"{prefix}...{secret[-4:]}"
