"""Tests for the remote MCP Streamable HTTP transport at /mcp (CHT-1266).

Drives the mounted endpoint end-to-end over raw HTTP (initialize,
tools/list, tools/call) via the same in-process ``client`` fixture every
other API test uses (httpx AsyncClient + ASGITransport) -- no separate
MCP client SDK needed since the server runs in ``json_response=True,
stateless_http=True`` mode: every POST gets a single JSON object back,
no SSE framing, no session-id bookkeeping between requests.
"""
import json

import pytest
import pytest_asyncio
from chaotic_mcp_tools.expected import toolset_diff

from app.schemas.api_key import APIKeyCreate
from app.services.api_key_service import APIKeyService

_MCP_HEADERS = {"Accept": "application/json, text/event-stream", "Content-Type": "application/json"}

# Deliberately-leaked strong references to each test's `session_manager.run()`
# context manager -- see _fresh_mcp_session_manager below. Without this, the
# CM object goes unreferenced the instant __aenter__ returns, asyncio's
# garbage-collector hook for abandoned async generators schedules its
# .aclose() as a *separate* task, and that finalizer task hitting the
# generator's `finally: tg.cancel_scope.cancel()` from a different task than
# the task group was entered in is exactly the "different task" crash this
# fixture exists to avoid.
_LIVE_SESSION_MANAGER_CMS = []


@pytest_asyncio.fixture(autouse=True)
async def _fresh_mcp_session_manager():
    """Each test gets its own MCPServer instance + session manager, entered
    for exactly this test's lifetime.

    Two things force this: (1) StreamableHTTPSessionManager.run() can only
    be entered once ever per instance (raises on a second call) -- a
    module- or session-scoped fixture sharing one instance across tests
    would only work for the first test. (2) the `client` fixture's
    ASGITransport never drives app.main's own lifespan at all (that's why
    conftest.py's `client` fixture patches init_oxyde/close_oxyde to
    no-ops -- there's no lifespan.startup/shutdown ASGI messages sent by
    a plain ASGITransport). This replicates just the MCP half of that
    lifespan.

    Deliberately entered and never exited: pytest-asyncio runs an async
    fixture's post-yield teardown in a *different* asyncio Task than its
    setup, and anyio's task-group cancel scope hard-requires exiting in
    the same task it was entered in -- so pairing `session_manager.run()`
    with a yield-based teardown always raises "Attempted to exit cancel
    scope in a different task". Nothing to clean up anyway: each test
    gets a brand-new MCPServer/session-manager instance (reset above), so
    the previous test's task group (with no pending requests left) is
    simply abandoned to the garbage collector along with that test's
    event loop.
    """
    await _remount_mcp()


async def _remount_mcp():
    """Throw away the process-wide MCPServer and rebuild + remount it
    against the CURRENT settings. The autouse fixture calls this once per
    test; TestTransportSecurity calls it again after changing CORS_ORIGINS,
    since _transport_security() is read at build time.
    """
    import app.mcp_server.asgi as asgi_mod
    from app.main import app as fastapi_app
    from app.mcp_server.auth import CapabilityPathRedaction

    asgi_mod._fastmcp = None
    fastapi_app.router.routes = [
        r for r in fastapi_app.router.routes if getattr(r, "path", None) not in ("/mcp", "/mcp/{api_key}")
    ]
    # mount_mcp re-adds CapabilityPathRedaction each call; strip the old
    # copy and force the (lazily built) middleware stack to rebuild --
    # add_middleware refuses to run once the stack exists.
    fastapi_app.user_middleware = [
        m for m in fastapi_app.user_middleware if m.cls is not CapabilityPathRedaction
    ]
    fastapi_app.middleware_stack = None
    asgi_mod.mount_mcp(fastapi_app)
    cm = asgi_mod.get_fastmcp().session_manager.run()
    await cm.__aenter__()
    _LIVE_SESSION_MANAGER_CMS.append(cm)


def _rpc(method: str, params: dict | None = None, id: int = 1) -> dict:
    return {"jsonrpc": "2.0", "id": id, "method": method, "params": params or {}}


def _init_params() -> dict:
    return {
        "protocolVersion": "2025-06-18",
        "capabilities": {},
        "clientInfo": {"name": "pytest", "version": "0"},
    }


async def _tool_call(client, headers, name, arguments=None, url="/mcp", id=1):
    resp = await client.post(
        url,
        json=_rpc("tools/call", {"name": name, "arguments": arguments or {}}, id=id),
        headers=headers,
    )
    return resp


@pytest.fixture
async def api_key(db, test_user):
    """A real ck_... API key for test_user."""
    service = APIKeyService()
    _record, full_key = await service.create(test_user.id, APIKeyCreate(name="mcp-test"))
    return full_key


@pytest.fixture
def bearer_headers(api_key):
    return {**_MCP_HEADERS, "Authorization": f"Bearer {api_key}"}


class TestTransportSecurity:
    """The two knobs asgi.py passes to streamable_http_app() actually take
    effect in the mounted app (CHT-1367 / PR #269 review): DNS-rebinding
    protection keyed to CORS_ORIGINS, and the request-body cap.
    """

    @pytest.fixture
    async def rebinding_enabled(self, monkeypatch):
        from app.config import get_settings

        monkeypatch.setenv("CORS_ORIGINS", "https://tracker.example.com")
        get_settings.cache_clear()
        await _remount_mcp()
        yield
        get_settings.cache_clear()

    async def test_explicit_origins_reject_foreign_host_with_421(self, client, bearer_headers, rebinding_enabled):
        headers = {**bearer_headers, "Host": "evil.example.net"}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 421

    async def test_explicit_origins_accept_matching_host(self, client, bearer_headers, rebinding_enabled):
        headers = {**bearer_headers, "Host": "tracker.example.com"}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 200

    async def test_host_is_compared_case_insensitively(self, client, bearer_headers, rebinding_enabled):
        """A Host sent as typed, capitals and all, still matches (PR #390
        review): host names are case-insensitive, the SDK's check is not."""
        headers = {**bearer_headers, "Host": "Tracker.Example.COM"}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 200

    @pytest.mark.parametrize("raw", ["https://Tracker.example.com/", "https://Tracker.example.com/app"])
    async def test_a_hand_written_entry_with_capitals_keeps_its_host(self, client, bearer_headers, monkeypatch, raw):
        """Normalised (CHT-1707) or kept as written (not an origin), an
        entry with capitals still lets its own host through, in either case."""
        from app.config import get_settings

        monkeypatch.setenv("CORS_ORIGINS", raw)
        get_settings.cache_clear()
        try:
            await _remount_mcp()
            for host in ("Tracker.example.com", "tracker.example.com"):
                headers = {**bearer_headers, "Host": host}
                resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
                assert resp.status_code == 200, host
        finally:
            get_settings.cache_clear()

    async def test_explicit_origins_accept_matching_host_any_port(self, client, bearer_headers, rebinding_enabled):
        headers = {**bearer_headers, "Host": "tracker.example.com:8443"}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 200

    async def test_explicit_origins_reject_foreign_origin_header(self, client, bearer_headers, rebinding_enabled):
        headers = {**bearer_headers, "Host": "tracker.example.com", "Origin": "https://evil.example.net"}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 403

    async def test_auth_still_runs_before_host_check(self, client, rebinding_enabled):
        """Auth wraps the transport, so an unauthenticated request against
        a foreign Host is a 401, not a 421 -- no oracle for the allowlist."""
        headers = {**_MCP_HEADERS, "Host": "evil.example.net"}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 401

    async def test_wildcard_default_accepts_any_host(self, client, bearer_headers):
        """conftest leaves CORS_ORIGINS at its `*` default -> protection off."""
        headers = {**bearer_headers, "Host": "whatever.example.net"}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 200

    async def test_oversized_body_is_413(self, client, bearer_headers):
        from app.mcp_server.asgi import MCP_MAX_REQUEST_BODY_BYTES

        body = b" " * (MCP_MAX_REQUEST_BODY_BYTES + 1)
        resp = await client.post("/mcp", content=body, headers=bearer_headers)
        assert resp.status_code == 413

    async def test_body_at_cap_is_not_413(self, client, bearer_headers):
        """Exactly-at-cap must pass the limiter (it then fails JSON parsing
        downstream, which is a 400 from the transport, not a 413)."""
        from app.mcp_server.asgi import MCP_MAX_REQUEST_BODY_BYTES

        body = b" " * MCP_MAX_REQUEST_BODY_BYTES
        resp = await client.post("/mcp", content=body, headers=bearer_headers)
        assert resp.status_code != 413


class TestAuth:
    async def test_missing_auth_returns_401(self, client):
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=_MCP_HEADERS)
        assert resp.status_code == 401
        assert resp.headers.get("www-authenticate") == "Bearer"

    async def test_malformed_key_returns_401(self, client):
        headers = {**_MCP_HEADERS, "Authorization": "Bearer not-a-real-key"}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 401

    async def test_jwt_bearer_is_rejected(self, client, auth_headers):
        """MCP is API-key only (CHT-1266) -- a JWT that authenticates fine
        against REST must NOT work here.
        """
        headers = {**_MCP_HEADERS, **auth_headers}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 401

    async def test_revoked_key_returns_401(self, client, db, test_user):
        service = APIKeyService()
        record, full_key = await service.create(test_user.id, APIKeyCreate(name="revoked"))
        await service.revoke(record)
        headers = {**_MCP_HEADERS, "Authorization": f"Bearer {full_key}"}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 401

    async def test_valid_key_can_initialize(self, client, bearer_headers):
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=bearer_headers)
        assert resp.status_code == 200
        body = resp.json()
        assert body["result"]["serverInfo"]["name"] == "chaotic"

    async def test_capability_url_mode_works(self, client, api_key):
        resp = await client.post(
            f"/mcp/{api_key}", json=_rpc("initialize", _init_params()), headers=_MCP_HEADERS
        )
        assert resp.status_code == 200
        assert resp.json()["result"]["serverInfo"]["name"] == "chaotic"

    async def test_capability_url_wrong_key_returns_401(self, client):
        resp = await client.post(
            "/mcp/ck_deadbeef00000000000000000000000000000000000000000000000000000000",
            json=_rpc("initialize", _init_params()),
            headers=_MCP_HEADERS,
        )
        assert resp.status_code == 401

    async def test_deactivated_agent_is_refused_in_both_modes(self, client, db, test_user, test_team):
        """CHT-1494: a deactivated agent's key is revoked (401), and even a
        key re-enabled by hand is refused because the agent is inactive
        (403), on the bearer and the capability-URL transport alike."""
        from app.oxyde_models.api_key import OxydeAPIKey
        from app.schemas.agent import AgentCreate
        from app.services.agent_service import AgentService

        service = AgentService()
        agent, key, _ = await service.create(AgentCreate(name="MCP Bot"), test_user, test_team.id)
        bearer = {**_MCP_HEADERS, "Authorization": f"Bearer {key}"}
        init = _rpc("initialize", _init_params())
        assert (await client.post("/mcp", json=init, headers=bearer)).status_code == 200

        await service.deactivate(agent, test_user)
        assert (await client.post("/mcp", json=init, headers=bearer)).status_code == 401
        assert (await client.post(f"/mcp/{key}", json=init, headers=_MCP_HEADERS)).status_code == 401

        await OxydeAPIKey.objects.filter(principal_user_id=agent.id).update(is_active=True)
        assert (await client.post("/mcp", json=init, headers=bearer)).status_code == 403
        assert (await client.post(f"/mcp/{key}", json=init, headers=_MCP_HEADERS)).status_code == 403


class TestOAuthChallenge:
    """CHT-1517: with OAUTH_ENABLED, a 401 on bare /mcp for a missing or
    non-ck_ bearer points at the RFC 9728 metadata. ck_ callers (a failed
    key, the capability URL) keep the bare challenge, and with the flag off
    every 401 is exactly the pre-CHT-1517 bare ``Bearer``.
    """

    _CHALLENGE = (
        'Bearer resource_metadata="https://tracker.example.com/.well-known/oauth-protected-resource/mcp", '
        'scope="chaotic:write"'
    )
    # RFC 6750 §3.1: a token was sent and rejected.
    _INVALID_TOKEN_CHALLENGE = (
        'Bearer error="invalid_token", '
        'resource_metadata="https://tracker.example.com/.well-known/oauth-protected-resource/mcp", '
        'scope="chaotic:write"'
    )

    @pytest.fixture
    def oauth(self, monkeypatch):
        from app.config import get_settings

        def _set(enabled: bool):
            monkeypatch.setenv("OAUTH_ENABLED", "true" if enabled else "false")
            monkeypatch.setenv("APP_BASE_URL", "https://tracker.example.com/")
            get_settings.cache_clear()

        yield _set
        get_settings.cache_clear()

    async def _init(self, client, headers, url="/mcp"):
        return await client.post(url, json=_rpc("initialize", _init_params()), headers=headers)

    @pytest.mark.parametrize("enabled", [False, True])
    async def test_missing_auth(self, client, oauth, enabled):
        oauth(enabled)
        resp = await self._init(client, _MCP_HEADERS)
        assert resp.status_code == 401
        assert resp.headers["www-authenticate"] == (self._CHALLENGE if enabled else "Bearer")

    @pytest.mark.parametrize("enabled", [False, True])
    async def test_non_ck_bearer(self, client, oauth, enabled):
        # An OAuth access token this server never issued (CHT-1576); the
        # client is pointed at discovery either way.
        oauth(enabled)
        resp = await self._init(client, {**_MCP_HEADERS, "Authorization": "Bearer cat_somethingelse"})
        assert resp.status_code == 401
        assert resp.headers["www-authenticate"] == (self._INVALID_TOKEN_CHALLENGE if enabled else "Bearer")

    @pytest.mark.parametrize("enabled", [False, True])
    async def test_bad_ck_key_stays_bare(self, client, oauth, enabled):
        oauth(enabled)
        resp = await self._init(client, {**_MCP_HEADERS, "Authorization": "Bearer ck_" + "0" * 64})
        assert resp.status_code == 401
        assert resp.headers["www-authenticate"] == "Bearer"

    @pytest.mark.parametrize("enabled", [False, True])
    async def test_capability_url_stays_bare(self, client, oauth, enabled):
        oauth(enabled)
        for key in ("ck_" + "0" * 64, "notakey"):
            resp = await self._init(client, _MCP_HEADERS, url=f"/mcp/{key}")
            assert resp.status_code == 401
            assert resp.headers["www-authenticate"] == "Bearer"

    @pytest.mark.parametrize("enabled", [False, True])
    async def test_api_key_auth_unchanged(self, client, oauth, api_key, bearer_headers, enabled):
        oauth(enabled)
        assert (await self._init(client, bearer_headers)).status_code == 200
        assert (await self._init(client, _MCP_HEADERS, url=f"/mcp/{api_key}")).status_code == 200


class TestExpiredKeys:
    """PR #219 review finding 2: expiring keys. Enforcement itself
    predates this PR (APIKeyService.validate_key), but /mcp is a new
    consumer -- assert an expired key is indistinguishable from an
    invalid one on both auth modes.
    """

    @pytest.fixture
    async def expired_key(self, db, test_user):
        from datetime import datetime, timedelta, timezone

        service = APIKeyService()
        record, full_key = await service.create(
            test_user.id,
            APIKeyCreate(name="expired", expires_at=datetime.now(timezone.utc) - timedelta(hours=1)),
        )
        return full_key

    async def test_expired_key_bearer_same_401_as_invalid(self, client, expired_key):
        headers = {**_MCP_HEADERS, "Authorization": f"Bearer {expired_key}"}
        expired_resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)

        bogus = "ck_" + "0" * 64
        headers = {**_MCP_HEADERS, "Authorization": f"Bearer {bogus}"}
        invalid_resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)

        assert expired_resp.status_code == invalid_resp.status_code == 401
        # Same body -- an attacker can't distinguish "expired" (a real key
        # that once worked) from "never existed".
        assert expired_resp.json() == invalid_resp.json()

    async def test_expired_key_capability_url_401(self, client, expired_key):
        resp = await client.post(
            f"/mcp/{expired_key}", json=_rpc("initialize", _init_params()), headers=_MCP_HEADERS
        )
        assert resp.status_code == 401

    async def test_future_expiry_still_works(self, client, db, test_user):
        from datetime import datetime, timedelta, timezone

        service = APIKeyService()
        _record, full_key = await service.create(
            test_user.id,
            APIKeyCreate(name="fresh", expires_at=datetime.now(timezone.utc) + timedelta(days=90)),
        )
        headers = {**_MCP_HEADERS, "Authorization": f"Bearer {full_key}"}
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 200


class TestCapabilityPathRedaction:
    """PR #219 review finding 1: the raw key must never reach anything
    that logs the request path. Both known leaks read scope["path"]
    (uvicorn's access logger; app.main's unhandled-exception handler
    via request.url.path), so these tests observe the scope exactly the
    way those consumers do. The real uvicorn access-log line itself is
    asserted in e2e/test_mcp.py, where a real uvicorn serves the app.
    """

    class _ScopeRecorder:
        """Outermost ASGI wrapper holding a reference to each request's
        scope dict -- the same dict uvicorn's access logger reads at
        response time -- so the test can inspect it after the response,
        post-mutation, exactly like the logger would.
        """

        def __init__(self, app):
            self.app = app
            self.scopes = []

        async def __call__(self, scope, receive, send):
            self.scopes.append(scope)
            await self.app(scope, receive, send)

    @pytest.fixture
    async def recording_client(self, db):
        from unittest.mock import patch
        from httpx import ASGITransport, AsyncClient
        from app.main import app

        async def noop():
            return None

        recorder = self._ScopeRecorder(app)
        with patch("app.main.init_oxyde", side_effect=noop), \
             patch("app.main.close_oxyde", side_effect=noop):
            # raise_app_exceptions=False: Starlette's ServerErrorMiddleware
            # re-raises after our 500 handler runs (that's its contract);
            # a real server swallows that, ASGITransport would propagate
            # it into the test instead of returning the 500 response.
            transport = ASGITransport(app=recorder, raise_app_exceptions=False)
            async with AsyncClient(transport=transport, base_url="http://test") as ac:
                yield ac, recorder

    async def test_scope_path_is_redacted_and_auth_still_works(self, recording_client, api_key):
        ac, recorder = recording_client
        resp = await ac.post(f"/mcp/{api_key}", json=_rpc("initialize", _init_params()), headers=_MCP_HEADERS)
        assert resp.status_code == 200

        (scope,) = recorder.scopes
        assert api_key not in scope["path"]
        assert api_key.encode() not in scope["raw_path"]
        # Redacted form keeps prefix + last 4 for log correlation.
        assert scope["path"] == f"/mcp/ck_...{api_key[-4:]}"

    async def test_scope_path_redacted_even_for_unrouted_methods(self, recording_client, api_key):
        """A PUT never matches the /mcp/{api_key} route (405s in the
        router) -- redaction must happen before routing or that access-log
        line leaks the key.
        """
        ac, recorder = recording_client
        resp = await ac.put(f"/mcp/{api_key}", json={}, headers=_MCP_HEADERS)
        assert resp.status_code == 405
        (scope,) = recorder.scopes
        assert api_key not in scope["path"]

    async def test_exception_log_shows_redacted_path(self, recording_client, api_key, monkeypatch, caplog):
        """app.main's unhandled-exception handler logs request.url.path --
        force an exception past the auth wrapper and assert the raw key
        never hits the log record.
        """
        import logging

        import app.mcp_server.asgi as asgi_mod

        async def _boom(*args, **kwargs):
            raise RuntimeError("forced for log test")

        # mcp 2.x's StreamableHTTPASGIApp dispatches through the session
        # manager's `asgi_app` (1.x went through `handle_request`).
        monkeypatch.setattr(
            asgi_mod.get_fastmcp().session_manager, "asgi_app", _boom
        )

        ac, _recorder = recording_client
        with caplog.at_level(logging.ERROR, logger="app.main"):
            resp = await ac.post(
                f"/mcp/{api_key}", json=_rpc("initialize", _init_params()), headers=_MCP_HEADERS
            )
        assert resp.status_code == 500
        assert caplog.text  # the handler did log
        assert api_key not in caplog.text
        assert f"ck_...{api_key[-4:]}" in caplog.text

    async def test_scope_path_redacted_when_capability_url_disabled(self, recording_client, api_key, monkeypatch):
        """CHT-1522: with the capability URL off, a stale URL's request
        still never logs its key."""
        from app.config import get_settings

        monkeypatch.setenv("MCP_CAPABILITY_URL_ENABLED", "false")
        get_settings.cache_clear()
        try:
            ac, recorder = recording_client
            resp = await ac.post(f"/mcp/{api_key}", json=_rpc("initialize", _init_params()), headers=_MCP_HEADERS)
        finally:
            get_settings.cache_clear()
        assert resp.status_code == 404
        (scope,) = recorder.scopes
        assert api_key not in scope["path"]
        assert api_key.encode() not in scope["raw_path"]

    @pytest.mark.parametrize("enabled", [True, False])
    @pytest.mark.parametrize("suffix, logged", [("/", "/"), ("/x", "/..."), ("/x/y", "/...")])
    async def test_paths_below_the_key_are_redacted(self, recording_client, api_key, monkeypatch, enabled, suffix, logged):
        """CHT-1587: a trailing slash or a sub-path logged the whole key."""
        from app.config import get_settings

        monkeypatch.setenv("MCP_CAPABILITY_URL_ENABLED", "true" if enabled else "false")
        get_settings.cache_clear()
        try:
            ac, recorder = recording_client
            resp = await ac.get(f"/mcp/{api_key}{suffix}")
        finally:
            get_settings.cache_clear()
        assert resp.status_code == 404
        (scope,) = recorder.scopes
        assert scope["path"] == f"/mcp/ck_...{api_key[-4:]}{logged}"
        assert api_key.encode() not in scope["raw_path"]

    @pytest.fixture
    def resolver_calls(self, monkeypatch):
        from app.auth import credentials

        calls = []
        real = credentials.capability_url_resolver.resolve

        async def spy(*args, **kwargs):
            calls.append(args)
            return await real(*args, **kwargs)

        monkeypatch.setattr(credentials.capability_url_resolver, "resolve", spy)
        return calls

    @pytest.mark.parametrize("enabled", [True, False])
    @pytest.mark.parametrize("shape", ["//mcp/{key}", "/mcp//{key}", "/MCP/{key}", "/somewhere/{key}/else"])
    async def test_other_shapes_are_redacted_and_never_resolved(
        self, recording_client, api_key, monkeypatch, resolver_calls, enabled, shape,
    ):
        """PR #346 re-review: a key in any other segment is scrubbed too,
        and these shapes never reach the capability route."""
        from app.config import get_settings

        monkeypatch.setenv("MCP_CAPABILITY_URL_ENABLED", "true" if enabled else "false")
        get_settings.cache_clear()
        try:
            ac, recorder = recording_client
            # Absolute, or httpx reads `//mcp/...` as a host.
            resp = await ac.get("http://test" + shape.format(key=api_key))
        finally:
            get_settings.cache_clear()
        assert resp.status_code not in (401, 403)
        assert resolver_calls == []
        (scope,) = recorder.scopes
        assert scope["path"] == shape.format(key=f"ck_...{api_key[-4:]}")
        assert api_key.encode() not in scope["raw_path"]

    # ccs_: OAuth client secrets, missing from the set until PR #350's review.
    @pytest.mark.parametrize("prefix", ["cat_", "crt_", "cac_", "cct_", "ccs_"])
    async def test_oauth_token_shapes_are_redacted_anywhere(self, recording_client, prefix):
        ac, recorder = recording_client
        token = prefix + "ab" * 32
        await ac.get(f"/x/{token}")
        (scope,) = recorder.scopes
        assert scope["path"] == f"/x/{prefix}...abab"

    async def test_short_lookalike_segments_still_route(self, recording_client):
        """Too short to be a secret: left alone, so it routes as before."""
        ac, recorder = recording_client
        await ac.get("/api/projects/ck_short")
        (scope,) = recorder.scopes
        assert scope["path"] == "/api/projects/ck_short"

    @pytest.mark.parametrize("path", ["/mcp/{key}", "//mcp/{key}"])
    async def test_websocket_paths_are_redacted(self, db, api_key, resolver_calls, path):
        """uvicorn logs `"WebSocket <path>" 403` from the same scope."""
        from app.main import app

        scope = {
            "type": "websocket", "path": path.format(key=api_key),
            "raw_path": path.format(key=api_key).encode(), "query_string": b"",
            "headers": [], "client": ("127.0.0.1", 1), "server": ("test", 80),
            "scheme": "ws", "root_path": "", "subprotocols": [],
        }
        sent = []

        async def receive():
            return {"type": "websocket.connect"}

        async def send(message):
            sent.append(message)

        await app(scope, receive, send)
        assert sent[-1]["type"] == "websocket.close"
        assert resolver_calls == []
        assert api_key not in scope["path"]
        assert api_key.encode() not in scope["raw_path"]
        assert scope["path"] == path.format(key=f"ck_...{api_key[-4:]}")

    async def test_bearer_mode_path_untouched(self, recording_client, api_key):
        ac, recorder = recording_client
        headers = {**_MCP_HEADERS, "Authorization": f"Bearer {api_key}"}
        resp = await ac.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 200
        (scope,) = recorder.scopes
        assert scope["path"] == "/mcp"


class TestCapabilityURLFlag:
    """CHT-1522: /mcp/<key> is deprecated and sits behind
    MCP_CAPABILITY_URL_ENABLED (design doc §5)."""

    @pytest.fixture
    def capability_url(self, monkeypatch):
        from app.config import get_settings

        def _set(enabled: bool):
            monkeypatch.setenv("MCP_CAPABILITY_URL_ENABLED", "true" if enabled else "false")
            get_settings.cache_clear()

        yield _set
        get_settings.cache_clear()

    @staticmethod
    def _assert_deprecated(resp):
        from app.mcp_server.auth import CAPABILITY_URL_DEPRECATION_LINK

        assert resp.headers["deprecation"] == "@1791849600"
        assert resp.headers["link"] == CAPABILITY_URL_DEPRECATION_LINK
        assert 'rel="deprecation"' in resp.headers["link"]

    def test_on_by_default(self):
        from app.config import Settings

        assert Settings().mcp_capability_url_enabled is True

    async def test_enabled_responses_carry_deprecation(self, client, api_key, capability_url):
        capability_url(True)
        init = _rpc("initialize", _init_params())
        ok = await client.post(f"/mcp/{api_key}", json=init, headers=_MCP_HEADERS)
        assert ok.status_code == 200
        self._assert_deprecated(ok)
        # Errors from the capability route are deprecated too: a bad key,
        # and a method the router refuses.
        bad = await client.post("/mcp/ck_" + "0" * 64, json=init, headers=_MCP_HEADERS)
        assert bad.status_code == 401
        self._assert_deprecated(bad)
        put = await client.put(f"/mcp/{api_key}", json={}, headers=_MCP_HEADERS)
        assert put.status_code == 405
        self._assert_deprecated(put)

    async def test_bearer_mode_is_not_deprecated(self, client, bearer_headers, capability_url):
        capability_url(True)
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=bearer_headers)
        assert resp.status_code == 200
        assert "deprecation" not in resp.headers

    @pytest.mark.parametrize("method", ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"])
    @pytest.mark.parametrize("valid", [True, False])
    async def test_disabled_is_404_for_every_method_and_key(self, client, api_key, capability_url, valid, method):
        """A stale URL learns nothing about its key, or about the route."""
        capability_url(False)
        key = api_key if valid else "ck_" + "0" * 64
        resp = await client.request(method, f"/mcp/{key}", json={}, headers=_MCP_HEADERS)
        assert resp.status_code == 404
        assert resp.json() == {"detail": "Not Found"}
        assert "deprecation" not in resp.headers
        assert "www-authenticate" not in resp.headers

    async def test_disabled_never_reads_the_key(self, client, api_key, capability_url, monkeypatch):
        """The property the 404 exists for: no resolver call, so no lookup
        and no timing difference between a valid and an invalid key."""
        from app.auth import credentials
        from app.oxyde_models.api_key import OxydeAPIKey

        calls = []
        real = credentials.capability_url_resolver.resolve

        async def spy(*args, **kwargs):
            calls.append(args)
            return await real(*args, **kwargs)

        monkeypatch.setattr(credentials.capability_url_resolver, "resolve", spy)
        before = (await OxydeAPIKey.objects.get(key_prefix=APIKeyService()._get_prefix(api_key))).last_used_at
        init = _rpc("initialize", _init_params())

        capability_url(False)
        assert (await client.post(f"/mcp/{api_key}", json=init, headers=_MCP_HEADERS)).status_code == 404
        assert calls == []
        assert (await OxydeAPIKey.objects.get(key_prefix=APIKeyService()._get_prefix(api_key))).last_used_at == before

        # The spy does see a call once the URL is served.
        capability_url(True)
        assert (await client.post(f"/mcp/{api_key}", json=init, headers=_MCP_HEADERS)).status_code == 200
        assert len(calls) == 1

    async def test_disabled_keeps_bearer_mode(self, client, bearer_headers, capability_url):
        capability_url(False)
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=bearer_headers)
        assert resp.status_code == 200

    @pytest.mark.parametrize("enabled", [True, False])
    @pytest.mark.parametrize("suffix", ["/", "/x", "/x/y"])
    async def test_paths_below_the_key_are_404_not_the_spa(self, client, api_key, capability_url, enabled, suffix):
        """CHT-1587: these fell through to the SPA catch-all with a 200."""
        capability_url(enabled)
        resp = await client.get(f"/mcp/{api_key}{suffix}")
        assert resp.status_code == 404
        assert resp.json() == {"detail": "Not Found"}

    @pytest.mark.parametrize("enabled", [True, False])
    async def test_missing_key_hint_follows_the_setting(self, client, capability_url, enabled):
        capability_url(enabled)
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=_MCP_HEADERS)
        assert resp.status_code == 401
        assert ("capability URL" in resp.json()["error"]) is enabled

    @pytest.mark.parametrize("enabled", [True, False])
    async def test_startup_warning_from_the_lifespan(self, capability_url, caplog, monkeypatch, enabled):
        """Drive app.main's real lifespan, with only its I/O stubbed."""
        import contextlib
        import logging

        import app.main as main

        async def noop(*args, **kwargs):
            return None

        @contextlib.asynccontextmanager
        async def no_mcp():
            yield

        for name in ("init_oxyde", "close_oxyde", "bootstrap_if_empty", "verify_migrations_current",
                     "_mcp_toolset_fingerprint"):
            monkeypatch.setattr(main, name, noop)
        monkeypatch.setattr(main, "get_version_info", lambda *a, **k: None)
        monkeypatch.setattr(main, "mcp_lifespan", no_mcp)
        monkeypatch.setattr(main.settings, "secret_key", "x" * 32)

        capability_url(enabled)
        with caplog.at_level(logging.WARNING, logger="app.mcp_server.auth"):
            async with main.lifespan(main.app):
                pass
        assert ("MCP_CAPABILITY_URL_ENABLED is on" in caplog.text) is enabled


class TestToolsList:
    async def test_tools_list_returns_the_full_toolset(self, client, bearer_headers):
        resp = await client.post("/mcp", json=_rpc("tools/list"), headers=bearer_headers)
        assert resp.status_code == 200
        tools = resp.json()["result"]["tools"]
        names = {t["name"] for t in tools}
        problem = toolset_diff(
            names, "the HTTP server's tools/list", hint="fix app.mcp_server.tools if a tool was dropped"
        )
        assert not problem, problem


class TestToolsCall:
    async def test_issue_list_empty(self, client, bearer_headers, test_project):
        resp = await _tool_call(client, bearer_headers, "issue_list")
        assert resp.status_code == 200
        result = resp.json()["result"]
        assert result.get("isError") is not True
        payload = json.loads(result["content"][0]["text"])
        assert payload == {"issues": [], "count": 0, "truncated": False}

    async def test_issue_create_and_view(self, client, bearer_headers, test_project):
        resp = await _tool_call(client, bearer_headers, "issue_create", {"title": "From MCP"})
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert "error" not in payload
        identifier = payload["identifier"]
        assert payload["title"] == "From MCP"

        resp = await _tool_call(client, bearer_headers, "issue_view", {"identifier": identifier}, id=2)
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert payload["identifier"] == identifier
        assert payload["comments"] == []
        assert payload["sub_issues"] == []

    async def test_unknown_argument_is_refused_with_the_envelope(self, client, bearer_headers, test_project):
        """CHT-1951 over the real /mcp app: an argument the tool does not
        take is refused before it runs, as the usual error envelope."""
        resp = await _tool_call(client, bearer_headers, "issue_create", {"title": "Nope", "asignee": "me"})
        result = resp.json()["result"]
        assert result.get("isError") is not True
        error = json.loads(result["content"][0]["text"])["error"]
        assert error["error_code"] == "unknown_argument"
        assert error["unknown_arguments"] == ["asignee"]
        listed = await _tool_call(client, bearer_headers, "issue_list", id=2)
        assert json.loads(listed.json()["result"]["content"][0]["text"])["count"] == 0

    async def test_scope_hints_are_tolerated_and_the_assignee_lands(
        self, client, bearer_headers, test_project, test_user,
    ):
        resp = await _tool_call(client, bearer_headers, "issue_create",
                                {"title": "Mine", "assignee": "me", "project": test_project.key})
        created = json.loads(resp.json()["result"]["content"][0]["text"])
        assert created["assignee_id"] == test_user.id, created
        resp = await _tool_call(client, bearer_headers, "issue_view",
                                {"identifier": created["identifier"], "project": test_project.key}, id=2)
        assert json.loads(resp.json()["result"]["content"][0]["text"])["identifier"] == created["identifier"]

    async def test_a_project_hint_on_a_team_wide_tool_is_refused(self, client, bearer_headers, test_project):
        """inbox_mark_all_read is team-wide: a `project` would have marked
        the whole team's inbox read (PR #497 delta review, finding A2)."""
        resp = await _tool_call(client, bearer_headers, "inbox_mark_all_read", {"project": test_project.key})
        error = json.loads(resp.json()["result"]["content"][0]["text"])["error"]
        assert error["error_code"] == "scope_mismatch"
        assert error["acts_in"]["project"] is None

    async def test_a_project_hint_naming_another_project_is_refused(
        self, client, bearer_headers, test_project, test_team,
    ):
        from app.oxyde_models.project import OxydeProject

        await OxydeProject.objects.create(name="Other", key="OTH", team_id=test_team.id)
        created = json.loads((await _tool_call(client, bearer_headers, "issue_create",
                                               {"title": "Here", "project": test_project.key})).json()
                             ["result"]["content"][0]["text"])
        resp = await _tool_call(client, bearer_headers, "issue_update",
                                {"identifier": created["identifier"], "title": "Moved?", "project": "OTH"}, id=2)
        error = json.loads(resp.json()["result"]["content"][0]["text"])["error"]
        assert error["error_code"] == "scope_mismatch"
        viewed = json.loads((await _tool_call(client, bearer_headers, "issue_view",
                                              {"identifier": created["identifier"]}, id=3)).json()
                            ["result"]["content"][0]["text"])
        assert viewed["title"] == "Here"

    async def test_issue_create_then_list_finds_it(self, client, bearer_headers, test_project):
        await _tool_call(client, bearer_headers, "issue_create", {"title": "Findable"})
        resp = await _tool_call(client, bearer_headers, "issue_list", id=2)
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert any(i["title"] == "Findable" for i in payload["issues"])

    async def test_issue_start_claims_and_moves_in_progress(self, client, bearer_headers, test_issue, test_user):
        resp = await _tool_call(client, bearer_headers, "issue_start", {"identifier": test_issue.identifier})
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert payload["status"] == "in_progress"
        assert payload["assignee_id"] == test_user.id

    async def test_issue_comment(self, client, bearer_headers, test_issue):
        resp = await _tool_call(
            client, bearer_headers, "issue_comment",
            {"identifier": test_issue.identifier, "content": "hello from mcp"},
        )
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert payload["content"] == "hello from mcp"

    async def test_issue_update_bad_status_reports_tool_error(self, client, bearer_headers, test_issue):
        resp = await _tool_call(
            client, bearer_headers, "issue_update",
            {"identifier": test_issue.identifier, "status": "not_a_real_status"},
        )
        # Invalid enum value at the JSON-schema layer -- MCP reports this
        # as a protocol-level tool error, not our {"error": ...} envelope.
        assert resp.json()["result"].get("isError") is True

    async def test_issue_view_unknown_identifier_is_error_envelope(self, client, bearer_headers, test_project):
        resp = await _tool_call(client, bearer_headers, "issue_view", {"identifier": "NOPE-999"})
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert "error" in payload

    async def test_doc_create_and_view(self, client, bearer_headers, test_project):
        resp = await _tool_call(client, bearer_headers, "doc_create", {"title": "Doc from MCP", "content": "hi"})
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert "error" not in payload
        doc_id = payload["id"]

        resp = await _tool_call(client, bearer_headers, "doc_view", {"document_id": doc_id}, id=2)
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert payload["title"] == "Doc from MCP"
        assert payload["comments"] == []
        assert payload["linked_issues"] == []

    async def test_doc_list(self, client, bearer_headers, test_document):
        # test_document has no project_id (team-wide/global doc); doc_list
        # defaults to the (only) current project like the stdio tool does,
        # so all_projects=true is what surfaces it here.
        resp = await _tool_call(client, bearer_headers, "doc_list", {"all_projects": True})
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert any(d["id"] == test_document.id for d in payload["documents"])

    async def test_activity_recent(self, client, bearer_headers, test_project):
        await _tool_call(client, bearer_headers, "issue_create", {"title": "Activity source"})
        resp = await _tool_call(client, bearer_headers, "activity_recent", id=2)
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert len(payload["activities"]) >= 1

    async def test_project_list(self, client, bearer_headers, test_project):
        resp = await _tool_call(client, bearer_headers, "project_list")
        assert resp.status_code == 200
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert any(p["id"] == test_project.id for p in payload["projects"])
        me = next(p for p in payload["projects"] if p["id"] == test_project.id)
        assert me["key"] == test_project.key and "issue_count" in me

    async def test_server_info_reports_this_deploy(self, client, bearer_headers):
        """server_info (CHT-1401) over the in-process adapter is the live
        /api/version payload minus the asset hashes: the git sha this
        process runs, and the toolset fingerprint and count it serves."""
        from app.main import version_info
        from chaotic_mcp_tools.tools import ALL_TOOLS

        resp = await _tool_call(client, bearer_headers, "server_info")
        assert resp.status_code == 200
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        live = await version_info()
        assert payload["git_sha"] == live["git_sha"]
        assert payload["mcp_toolset_fingerprint"] == live["mcp_toolset_fingerprint"]
        assert payload["mcp_tool_count"] == len(ALL_TOOLS)
        assert "bundle_hash" not in payload and "css_hash" not in payload

    async def test_multiple_teams_requires_disambiguation(self, client, bearer_headers, test_user, test_team):
        """A user on more than one team gets a clear error, not a silent
        wrong-team default (CHT-1266 scoping rules -- see scope.py).
        """
        from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
        from app.enums import TeamRole

        other_team = await OxydeTeam.objects.create(name="Other Team", key="OTH")
        await OxydeTeamMember.objects.create(team_id=other_team.id, user_id=test_user.id, role=TeamRole.MEMBER)

        resp = await _tool_call(client, bearer_headers, "activity_recent")
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert "error" in payload
        assert "team" in payload["error"]["message"].lower()

    async def test_team_param_disambiguates(self, client, bearer_headers, test_user, test_team, test_project):
        from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
        from app.enums import TeamRole

        other_team = await OxydeTeam.objects.create(name="Other Team", key="OTH")
        await OxydeTeamMember.objects.create(team_id=other_team.id, user_id=test_user.id, role=TeamRole.MEMBER)

        resp = await _tool_call(client, bearer_headers, "activity_recent", {"team": test_team.key})
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        assert "error" not in payload

    async def test_unknown_tool_name(self, client, bearer_headers):
        resp = await _tool_call(client, bearer_headers, "issue_delete_everything")
        body = resp.json()
        assert "error" in body or body.get("result", {}).get("isError") is True


class TestRemovedCreatorsAgentKey:
    """CHT-1510: an agent key whose owner has left the agent's team is
    refused on both MCP transports, exactly like a revoked key, whether
    the removal revoked it or not."""

    async def _setup(self, db, test_user, test_team):
        from app.enums import TeamRole
        from app.oxyde_models.team import OxydeTeamMember
        from app.oxyde_models.user import OxydeUser
        from app.schemas.agent import AgentCreate
        from app.services.agent_service import AgentService

        bob = await OxydeUser.objects.create(email="bob-mcp@example.com", hashed_password="x", name="Bob")
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=bob.id, role=TeamRole.MEMBER)
        _, key, _ = await AgentService().create(AgentCreate(name="Bob Bot"), bob, test_team.id)
        return bob, key

    async def _both(self, client, key):
        init = _rpc("initialize", _init_params())
        bearer = await client.post("/mcp", json=init, headers={**_MCP_HEADERS, "Authorization": f"Bearer {key}"})
        capability = await client.post(f"/mcp/{key}", json=init, headers=_MCP_HEADERS)
        return bearer.status_code, capability.status_code

    async def test_membership_gone_without_revocation(self, client, db, test_user, test_team):
        from app.oxyde_models.team import OxydeTeamMember

        bob, key = await self._setup(db, test_user, test_team)
        assert await self._both(client, key) == (200, 200)

        await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=bob.id).delete()

        assert await self._both(client, key) == (401, 401)

    async def test_removed_through_the_route(self, client, db, test_user, test_team, auth_headers):
        bob, key = await self._setup(db, test_user, test_team)

        removed = await client.delete(f"/api/teams/{test_team.id}/members/{bob.id}", headers=auth_headers)

        assert removed.status_code == 204
        assert await self._both(client, key) == (401, 401)

    async def test_holder_deactivated(self, client, db, test_user, test_team):
        """CHT-1552: a holder deactivated but still in the team ends the
        key on both transports too, with the same 401."""
        bob, key = await self._setup(db, test_user, test_team)
        assert await self._both(client, key) == (200, 200)

        bob.is_active = False
        await bob.save(update_fields={"is_active"})

        assert await self._both(client, key) == (401, 401)


class TestRegistrarOverHTTP:
    """A registrar's key is register-only on /mcp too (CHT-1498)."""

    async def test_registrar_write_is_refused_and_read_allowed(self, client, auth_headers, test_team, test_project):
        created = await client.post(
            f"/api/teams/{test_team.id}/agents", json={"name": "Harness", "can_register": True}, headers=auth_headers,
        )
        headers = {**_MCP_HEADERS, "Authorization": f"Bearer {created.json()['api_key']}"}

        write = await _tool_call(client, headers, "issue_create", {"title": "x", "project": test_project.id})
        assert write.status_code == 200, write.text
        assert "registrar_cannot_write" in write.text

        read = await _tool_call(client, headers, "issue_list", {"project": test_project.id})
        assert read.status_code == 200 and "registrar_cannot_write" not in read.text


class TestOAuthAccessTokens:
    """Real OAuth access tokens at /mcp (CHT-1576), minted with
    TokenService: the wrapper binds the resolver's Principal, scopes and
    all (CHT-1562 review, S2), and a failed token gets the invalid_token
    challenge."""

    @pytest.fixture
    def oauth_on(self, monkeypatch):
        from app.services import token_service as ts

        from .oauth_tokens import enable_oauth

        enable_oauth(monkeypatch)
        yield
        ts._reset_for_tests()

    @pytest.fixture
    async def agent(self, oauth_on, db, test_team, test_user):
        from .oauth_tokens import make_agent

        return await make_agent(test_team, test_user)

    async def _connector(self, agent, team, user, scopes):
        from .oauth_tokens import connector_token

        issued = await connector_token(agent, team, user, scopes=scopes)
        return issued, {**_MCP_HEADERS, "Authorization": f"Bearer {issued.access_token}"}

    async def test_read_scope(self, client, agent, test_team, test_user, test_project):
        _, headers = await self._connector(agent, test_team, test_user, ("chaotic:read", "offline_access"))

        write = await _tool_call(client, headers, "issue_create", {"title": "x", "project": test_project.id})
        assert write.status_code == 200, write.text
        assert "policy_denied" in write.text

        read = await _tool_call(client, headers, "issue_list", {"project": test_project.id})
        assert read.status_code == 200 and "policy_denied" not in read.text, read.text

    async def test_write_scope_acts_as_the_agent(self, client, agent, test_team, test_user, test_project):
        _, headers = await self._connector(agent, test_team, test_user, ("chaotic:write",))
        write = await _tool_call(client, headers, "issue_create", {"title": "x", "project": test_project.id})
        assert write.status_code == 200 and "policy_denied" not in write.text, write.text
        from app.oxyde_models.issue import OxydeIssue

        created = await OxydeIssue.objects.get(project_id=test_project.id, title="x")
        assert created.creator_id == agent.id

    async def test_whole_server_token(self, client, agent, test_team, test_user, test_project):
        from .oauth_tokens import server_token

        issued, _ = await server_token(agent, test_team, test_user, scopes=("chaotic:read",))
        headers = {**_MCP_HEADERS, "Authorization": f"Bearer {issued.access_token}"}
        read = await _tool_call(client, headers, "issue_list", {"project": test_project.id})
        assert read.status_code == 200 and "policy_denied" not in read.text, read.text

    async def test_failed_token_gets_invalid_token(self, client, agent, test_team, test_user):
        from app.services.token_service import TokenService

        issued, headers = await self._connector(agent, test_team, test_user, ("chaotic:write",))
        ok = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert ok.status_code == 200, ok.text

        await TokenService().revoke_session(issued.holder_session_id, actor_id=None, reason="test")
        for presented in (headers, {**headers, "Authorization": f"Bearer {issued.refresh_token}"}):
            resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=presented)
            assert resp.status_code == 401
            assert resp.headers["www-authenticate"] == TestOAuthChallenge._INVALID_TOKEN_CHALLENGE

    async def test_inactive_agent_gets_403_without_a_challenge(self, client, agent, test_team, test_user):
        """A challenge on a 403 would send an OAuth client back through
        consent for the same agent, and the same 403 (review S1)."""
        _, headers = await self._connector(agent, test_team, test_user, ("chaotic:write",))
        agent.is_active = False
        await agent.save(update_fields={"is_active"})
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 403
        assert "www-authenticate" not in resp.headers
        assert resp.json() == {"error": "User is inactive"}

    async def test_capability_url_refuses_a_valid_token(self, client, agent, test_team, test_user):
        """CHT-1570: a token is never accepted in a path, even one that is
        valid at /mcp with a header; the capability URL is for keys."""
        issued, headers = await self._connector(agent, test_team, test_user, ("chaotic:write",))
        assert (await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)).status_code == 200
        resp = await client.post(
            f"/mcp/{issued.access_token}", json=_rpc("initialize", _init_params()), headers=_MCP_HEADERS,
        )
        assert resp.status_code == 401
        assert resp.headers["www-authenticate"] == "Bearer"

    async def test_off_unless_oauth_enabled(self, client, agent, test_team, test_user, monkeypatch):
        from .oauth_tokens import enable_oauth

        _, headers = await self._connector(agent, test_team, test_user, ("chaotic:write",))
        enable_oauth(monkeypatch, enabled=False)
        resp = await client.post("/mcp", json=_rpc("initialize", _init_params()), headers=headers)
        assert resp.status_code == 401 and resp.headers["www-authenticate"] == "Bearer"


class TestActivityRecentHidesASessionAddress:
    """CHT-1864: activity_recent reads the team feed, so a session
    identity's address is null for a reader its external_ref is hidden
    from, and carries nothing of the ref for one it is shown to."""

    async def _session_activity(self, client, auth_headers, test_project):
        from .test_agent_register import REF, _bearer, _register, _registrar

        _, key = await _registrar(client, auth_headers, team_id=test_project.team_id)
        registered = (await _register(client, key)).json()
        made = await client.post(
            f"/api/projects/{test_project.id}/issues", json={"title": "by a session"},
            headers=_bearer(registered["api_key"]),
        )
        assert made.status_code == 201, made.text
        return registered["agent"]["id"], REF

    async def _emails(self, client, headers, session_id):
        resp = await _tool_call(client, headers, "activity_recent", {"limit": 50})
        payload = json.loads(resp.json()["result"]["content"][0]["text"])
        rows = [a for a in payload["activities"] if a["user_id"] == session_id]
        assert rows
        return {a["user_email"] for a in rows}

    async def test_plain_teammate_gets_null_and_holder_gets_a_ref_free_address(
        self, client, auth_headers, bearer_headers, test_team, test_project,
    ):
        from app.enums import TeamRole
        from app.oxyde_models.team import OxydeTeamMember
        from app.oxyde_models.user import OxydeUser
        from .test_session_emails_migration import carries_ref

        session_id, ref = await self._session_activity(client, auth_headers, test_project)
        mate = await OxydeUser.objects.create(email="mate-mcp@example.com", hashed_password="x", name="Mate")
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=mate.id, role=TeamRole.MEMBER)
        _, mate_key = await APIKeyService().create(mate.id, APIKeyCreate(name="mate"))
        mate_headers = {**_MCP_HEADERS, "Authorization": f"Bearer {mate_key}"}

        assert await self._emails(client, mate_headers, session_id) == {None}
        session = await OxydeUser.objects.get(id=session_id)
        assert await self._emails(client, bearer_headers, session_id) == {session.email}
        assert not carries_ref(session.email, ref)
