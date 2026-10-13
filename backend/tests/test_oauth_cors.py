"""CORS for browser-based OAuth MCP clients (CHT-1551) and the JSON 404
for unknown /.well-known paths (CHT-1550).

Two layers:

* ``TestExplicitOrigins`` drives ``OAuthAwareCORS`` directly over a stub
  app, configured the way a hardened deployment is (explicit
  CORS_ORIGINS, credentials on), since app.main builds its middleware
  once at import from the test environment's ``*`` default.
* ``TestRealApp`` goes through app.main's real stack with that default.
"""
import pytest
from httpx import ASGITransport, AsyncClient
from mcp.server.transport_security import TransportSecurityMiddleware
from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse, PlainTextResponse
from starlette.routing import Route

from app.config import get_settings
from app.oauth.cors import PUBLIC_OAUTH_METHODS, OAuthAwareCORS

SITE = "https://tracker.example.com"
INSPECTOR = "http://localhost:6274"  # MCP Inspector's default UI origin
DOC_PATHS = [
    "/.well-known/oauth-protected-resource/mcp",
    "/.well-known/oauth-protected-resource",
    "/.well-known/oauth-authorization-server",
]
ENDPOINT_PATHS = ["/oauth/token", "/oauth/register", "/oauth/revoke"]
# The app's own CORS arguments, with an explicit origin list.
HARDENED = dict(allow_origins=[SITE], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


@pytest.fixture
def oauth(monkeypatch):
    def _set(enabled: bool):
        monkeypatch.setenv("OAUTH_ENABLED", "true" if enabled else "false")
        monkeypatch.setenv("APP_BASE_URL", SITE)
        get_settings.cache_clear()

    yield _set
    get_settings.cache_clear()


def _preflight(origin: str, method: str, headers: str | None = None) -> dict:
    h = {"Origin": origin, "Access-Control-Request-Method": method}
    if headers:
        h["Access-Control-Request-Headers"] = headers
    return h


async def _stub_ok(request):
    return JSONResponse({"ok": True})


async def _stub_401(request):
    return PlainTextResponse("no", status_code=401, headers={"WWW-Authenticate": 'Bearer resource_metadata="x"'})


_STUB_ROUTES = [
    *[Route(p, _stub_ok, methods=["GET"]) for p in DOC_PATHS],
    *[Route(p, _stub_ok, methods=["POST"]) for p in ENDPOINT_PATHS],
    Route("/oauth/authorize", _stub_ok, methods=["GET"]),
    Route("/mcp", _stub_401, methods=["GET", "POST"]),
    Route("/mcp/{key}", _stub_401, methods=["GET", "POST"]),
    Route("/api/things", _stub_ok, methods=["GET", "POST"]),
]


def _client(middleware_cls) -> AsyncClient:
    app = middleware_cls(Starlette(routes=_STUB_ROUTES), **HARDENED)
    return AsyncClient(transport=ASGITransport(app=app), base_url=SITE)


def test_public_set_is_the_documents_and_the_fetched_endpoints():
    assert set(PUBLIC_OAUTH_METHODS) == set(DOC_PATHS) | set(ENDPOINT_PATHS)
    assert "/oauth/authorize" not in PUBLIC_OAUTH_METHODS


class TestExplicitOrigins:
    """CORS_ORIGINS=https://tracker.example.com, a browser client at
    another origin (MCP Inspector)."""

    @pytest.mark.parametrize("path", DOC_PATHS)
    async def test_documents_readable_from_any_origin(self, oauth, path):
        oauth(True)
        async with _client(OAuthAwareCORS) as c:
            resp = await c.get(path, headers={"Origin": INSPECTOR})
        assert resp.status_code == 200
        assert resp.headers["access-control-allow-origin"] == "*"
        assert "access-control-allow-credentials" not in resp.headers

    @pytest.mark.parametrize("path", DOC_PATHS)
    async def test_document_preflight(self, oauth, path):
        # The SDK client sends MCP-Protocol-Version on discovery fetches,
        # which makes the GET non-simple.
        oauth(True)
        async with _client(OAuthAwareCORS) as c:
            resp = await c.options(path, headers=_preflight(INSPECTOR, "GET", "mcp-protocol-version"))
        assert resp.status_code == 200
        assert resp.headers["access-control-allow-origin"] == "*"
        assert "access-control-allow-credentials" not in resp.headers
        assert "GET" in resp.headers["access-control-allow-methods"]
        assert "POST" not in resp.headers["access-control-allow-methods"]

    @pytest.mark.parametrize("path", ENDPOINT_PATHS)
    async def test_endpoint_preflight_and_post(self, oauth, path):
        oauth(True)
        async with _client(OAuthAwareCORS) as c:
            pre = await c.options(path, headers=_preflight(INSPECTOR, "POST", "content-type"))
            resp = await c.post(path, json={}, headers={"Origin": INSPECTOR})
        assert pre.status_code == 200
        assert pre.headers["access-control-allow-origin"] == "*"
        assert "access-control-allow-credentials" not in pre.headers
        assert resp.headers["access-control-allow-origin"] == "*"

    @pytest.mark.parametrize("path", ENDPOINT_PATHS)
    async def test_endpoints_refuse_other_methods(self, oauth, path):
        oauth(True)
        async with _client(OAuthAwareCORS) as c:
            resp = await c.options(path, headers=_preflight(INSPECTOR, "DELETE"))
        assert resp.status_code == 400

    async def test_public_policy_does_not_allow_arbitrary_headers(self, oauth):
        oauth(True)
        async with _client(OAuthAwareCORS) as c:
            resp = await c.options("/oauth/token", headers=_preflight(INSPECTOR, "POST", "x-custom"))
        assert resp.status_code == 400

    async def test_authorize_keeps_app_policy(self, oauth):
        oauth(True)
        async with _client(OAuthAwareCORS) as c:
            resp = await c.get("/oauth/authorize", headers={"Origin": INSPECTOR})
        assert "access-control-allow-origin" not in resp.headers

    async def test_rest_of_app_keeps_app_policy(self, oauth):
        oauth(True)
        async with _client(OAuthAwareCORS) as c:
            foreign = await c.get("/api/things", headers={"Origin": INSPECTOR})
            pre = await c.options("/api/things", headers=_preflight(INSPECTOR, "POST"))
            own = await c.get("/api/things", headers={"Origin": SITE})
        assert "access-control-allow-origin" not in foreign.headers
        assert pre.status_code == 400
        assert own.headers["access-control-allow-origin"] == SITE
        assert own.headers["access-control-allow-credentials"] == "true"
        assert "access-control-expose-headers" not in own.headers

    async def test_mcp_exposes_www_authenticate_to_allowed_origin(self, oauth):
        oauth(True)
        async with _client(OAuthAwareCORS) as c:
            resp = await c.post("/mcp", json={}, headers={"Origin": SITE})
        assert resp.status_code == 401
        assert resp.headers["access-control-allow-origin"] == SITE
        assert resp.headers["access-control-expose-headers"] == "WWW-Authenticate"

    async def test_mcp_still_closed_to_unlisted_origin(self, oauth):
        # Exposing a header opens nothing: an origin not in CORS_ORIGINS
        # still cannot read /mcp (see docs/self-hosting-security.md).
        oauth(True)
        async with _client(OAuthAwareCORS) as c:
            resp = await c.post("/mcp", json={}, headers={"Origin": INSPECTOR})
            pre = await c.options("/mcp", headers=_preflight(INSPECTOR, "POST", "authorization,content-type"))
        assert "access-control-allow-origin" not in resp.headers
        assert pre.status_code == 400

    async def test_capability_url_exposes_nothing(self, oauth):
        oauth(True)
        async with _client(OAuthAwareCORS) as c:
            resp = await c.post("/mcp/ck_x", json={}, headers={"Origin": SITE})
        assert "access-control-expose-headers" not in resp.headers

    @pytest.mark.parametrize(
        "method,path,headers",
        [
            *[("GET", p, {"Origin": INSPECTOR}) for p in DOC_PATHS],
            *[("OPTIONS", p, _preflight(INSPECTOR, "GET", "mcp-protocol-version")) for p in DOC_PATHS],
            *[("OPTIONS", p, _preflight(INSPECTOR, "POST", "content-type")) for p in ENDPOINT_PATHS],
            *[("POST", p, {"Origin": SITE}) for p in ENDPOINT_PATHS],
            ("POST", "/mcp", {"Origin": SITE}),
            ("POST", "/mcp", {"Origin": INSPECTOR}),
            ("OPTIONS", "/mcp", _preflight(SITE, "POST", "authorization")),
            ("GET", "/api/things", {"Origin": SITE}),
            ("GET", "/api/things", {"Origin": INSPECTOR}),
        ],
    )
    async def test_flag_off_is_plain_cors_middleware(self, oauth, method, path, headers):
        oauth(False)
        async with _client(OAuthAwareCORS) as c:
            ours = await c.request(method, path, headers=headers)
        async with _client(CORSMiddleware) as c:
            plain = await c.request(method, path, headers=headers)
        assert ours.status_code == plain.status_code
        assert ours.headers.multi_items() == plain.headers.multi_items()
        assert ours.content == plain.content

    async def test_flag_is_read_per_request(self, oauth):
        async with _client(OAuthAwareCORS) as c:
            oauth(False)
            off = await c.get(DOC_PATHS[0], headers={"Origin": INSPECTOR})
            oauth(True)
            on = await c.get(DOC_PATHS[0], headers={"Origin": INSPECTOR})
        assert "access-control-allow-origin" not in off.headers
        assert on.headers["access-control-allow-origin"] == "*"

    async def test_existing_expose_headers_are_kept(self, oauth):
        oauth(True)
        app = OAuthAwareCORS(Starlette(routes=_STUB_ROUTES), **HARDENED, expose_headers=["X-Request-Id"])
        async with AsyncClient(transport=ASGITransport(app=app), base_url=SITE) as c:
            mcp = await c.post("/mcp", json={}, headers={"Origin": SITE})
            api = await c.get("/api/things", headers={"Origin": SITE})
        assert mcp.headers["access-control-expose-headers"] == "X-Request-Id, WWW-Authenticate"
        assert api.headers["access-control-expose-headers"] == "X-Request-Id"


def _request(headers: dict[str, str]) -> Request:
    return Request({
        "type": "http",
        "method": "POST",
        "path": "/mcp",
        "headers": [(k.lower().encode(), v.encode()) for k, v in headers.items()],
    })


class TestInspectorDirectMode:
    """The mcp SDK's DNS-rebinding guard on /mcp (app.mcp_server.asgi)
    rejects a browser Origin not in CORS_ORIGINS; listing it is the
    documented fix (docs/self-hosting-security.md)."""

    @pytest.fixture
    def guard(self, monkeypatch):
        from app.mcp_server.asgi import _transport_security

        def _make(origins: str) -> TransportSecurityMiddleware:
            monkeypatch.setenv("CORS_ORIGINS", origins)
            get_settings.cache_clear()
            return TransportSecurityMiddleware(_transport_security())

        yield _make
        get_settings.cache_clear()

    _HEADERS = {"Host": "tracker.example.com", "Origin": INSPECTOR, "Content-Type": "application/json"}

    async def test_unlisted_origin_refused(self, guard):
        resp = await guard(SITE).validate_request(_request(self._HEADERS), is_post=True)
        assert resp is not None and resp.status_code == 403

    async def test_listed_origin_accepted(self, guard):
        resp = await guard(f"{SITE},{INSPECTOR}").validate_request(_request(self._HEADERS), is_post=True)
        assert resp is None

    async def test_no_origin_header_accepted(self, guard):
        # Inspector's proxy mode (and every non-browser client) sends none.
        headers = {k: v for k, v in self._HEADERS.items() if k != "Origin"}
        assert await guard(SITE).validate_request(_request(headers), is_post=True) is None


class TestRealApp:
    """app.main's stack, with the test environment's ``CORS_ORIGINS=*``."""

    @pytest.mark.parametrize("enabled", [False, True])
    async def test_mcp_expose_header_only_when_on(self, client, oauth, enabled):
        oauth(enabled)
        resp = await client.post("/mcp", json={}, headers={"Origin": INSPECTOR, "Accept": "application/json"})
        assert resp.status_code == 401
        assert resp.headers["access-control-allow-origin"] == "*"
        if enabled:
            assert resp.headers["access-control-expose-headers"] == "WWW-Authenticate"
        else:
            assert "access-control-expose-headers" not in resp.headers

    async def test_discovery_document_cross_origin(self, client, oauth):
        oauth(True)
        resp = await client.get(DOC_PATHS[2], headers={"Origin": INSPECTOR})
        assert resp.status_code == 200
        assert resp.headers["access-control-allow-origin"] == "*"
        assert resp.json()["issuer"] == SITE

    async def test_discovery_preflight(self, client, oauth):
        oauth(True)
        resp = await client.options(DOC_PATHS[0], headers=_preflight(INSPECTOR, "GET", "mcp-protocol-version"))
        assert resp.status_code == 200
        assert resp.headers["access-control-allow-origin"] == "*"

    @pytest.mark.parametrize("enabled", [False, True])
    async def test_api_unchanged(self, client, oauth, enabled):
        oauth(enabled)
        resp = await client.get("/health", headers={"Origin": INSPECTOR})
        assert resp.headers["access-control-allow-origin"] == "*"
        assert "access-control-expose-headers" not in resp.headers


class TestUnknownWellKnown:
    """CHT-1550: the SPA catch-all no longer answers /.well-known/*."""

    @pytest.mark.parametrize("enabled", [False, True])
    @pytest.mark.parametrize(
        "path",
        [
            "/.well-known/openid-configuration",
            "/.well-known/security.txt",
            "/.well-known/oauth-authorization-server/mcp",
            "/.well-known/",
            "/.well-known",
        ],
    )
    async def test_json_404(self, client, oauth, enabled, path):
        oauth(enabled)
        resp = await client.get(path)
        assert resp.status_code == 404
        assert resp.headers["content-type"] == "application/json"
        assert resp.json() == {"detail": "Not Found"}

    @pytest.mark.parametrize("path", ["/well-known/x", "/.well-knownx", "/a/.well-known/x", "/issues/CHT-1"])
    async def test_other_paths_still_get_the_spa(self, client, path):
        resp = await client.get(path)
        assert resp.status_code == 200
        assert "text/html" in resp.headers["content-type"]

    async def test_known_document_still_served(self, client, oauth):
        oauth(True)
        assert (await client.get(DOC_PATHS[0])).status_code == 200
