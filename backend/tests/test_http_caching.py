"""Compression and Cache-Control (CHT-1874)."""
import pytest
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.gzip import GZipMiddleware
from starlette.responses import JSONResponse, Response, StreamingResponse
from starlette.routing import Route, WebSocketRoute
from starlette.testclient import TestClient

from app.http_caching import IMMUTABLE, NO_STORE, REVALIDATE, ApiNoStoreMiddleware

GZIP = {"Accept-Encoding": "gzip"}
IDENTITY = {"Accept-Encoding": "identity"}
BIG = "x" * 4096


def _hashes():
    from app.main import _version_info

    info = _version_info()
    return info["bundle_hash"], info["css_hash"]


class TestCompression:
    async def test_bundle_is_gzipped_when_accepted(self, client):
        response = await client.get("/static/js/app.bundle.js", headers=GZIP)
        assert response.status_code == 200
        assert response.headers["content-encoding"] == "gzip"
        assert "Accept-Encoding" in response.headers["vary"]
        # httpx decoded it: the body is the real bundle.
        assert len(response.content) > 1024

    async def test_stylesheet_is_gzipped_when_accepted(self, client):
        response = await client.get("/static/css/style.css", headers=GZIP)
        assert response.headers["content-encoding"] == "gzip"

    async def test_index_is_gzipped_when_accepted(self, client):
        response = await client.get("/", headers=GZIP)
        assert response.headers["content-encoding"] == "gzip"

    async def test_api_json_is_gzipped_when_accepted(self, client):
        response = await client.get("/openapi.json", headers=GZIP)
        assert response.headers["content-encoding"] == "gzip"
        assert response.json()["openapi"]

    async def test_not_gzipped_when_not_accepted(self, client):
        response = await client.get("/static/js/app.bundle.js", headers=IDENTITY)
        assert response.status_code == 200
        assert "content-encoding" not in response.headers

    async def test_small_responses_are_left_alone(self, client):
        response = await client.get("/health", headers=GZIP)
        assert "content-encoding" not in response.headers


def _gzip_options():
    """The GZipMiddleware options app.main actually installs."""
    from app.main import app

    entries = [m for m in app.user_middleware if m.cls is GZipMiddleware]
    assert len(entries) == 1
    return entries[0].kwargs


def _probe_app():
    """A tiny app behind the same GZipMiddleware, with the response shapes
    the real app produces: SSE (the MCP transport), a body its endpoint
    already encoded, a plain stream, and a websocket."""

    async def sse(request):
        async def events():
            for i in range(3):
                yield f"data: {i} {BIG}\n\n"

        return StreamingResponse(events(), media_type="text/event-stream")

    async def pre_encoded(request):
        return Response(b"\x1f\x8b" + b"z" * 4096, headers={"Content-Encoding": "br"})

    async def stream(request):
        async def chunks():
            for _ in range(3):
                yield BIG

        return StreamingResponse(chunks(), media_type="text/plain")

    async def ws(websocket):
        await websocket.accept()
        await websocket.send_text(BIG)
        await websocket.close()

    return Starlette(
        routes=[
            Route("/sse", sse),
            Route("/pre-encoded", pre_encoded),
            Route("/stream", stream),
            WebSocketRoute("/ws", ws),
        ],
        middleware=[Middleware(GZipMiddleware, **_gzip_options())],
    )


class TestCompressionLeavesSpecialResponsesAlone:
    def test_event_stream_is_not_compressed(self):
        with TestClient(_probe_app()) as tc:
            response = tc.get("/sse", headers=GZIP)
        assert "content-encoding" not in response.headers
        assert response.text.count("data:") == 3

    def test_own_content_encoding_is_kept(self):
        with TestClient(_probe_app()) as tc:
            response = tc.get("/pre-encoded", headers={"Accept-Encoding": "gzip, br"})
        assert response.headers["content-encoding"] == "br"

    def test_plain_stream_is_compressed_and_complete(self):
        with TestClient(_probe_app()) as tc:
            response = tc.get("/stream", headers=GZIP)
        assert response.headers["content-encoding"] == "gzip"
        assert response.text == BIG * 3

    def test_websocket_still_works(self):
        with TestClient(_probe_app()) as tc, tc.websocket_connect("/ws") as ws:
            assert ws.receive_text() == BIG


class TestStaticCacheControl:
    async def test_hashed_bundle_is_immutable(self, client):
        bundle_hash, _ = _hashes()
        response = await client.get(f"/static/js/app.bundle.js?v={bundle_hash}")
        assert response.headers["cache-control"] == IMMUTABLE

    async def test_hashed_stylesheet_is_immutable(self, client):
        _, css_hash = _hashes()
        response = await client.get(f"/static/css/style.css?v={css_hash}")
        assert response.headers["cache-control"] == IMMUTABLE

    async def test_stale_version_revalidates(self, client):
        """An old page asking for an old ?v= must not pin today's bytes
        under that URL for a year."""
        response = await client.get("/static/js/app.bundle.js?v=deadbeef")
        assert response.status_code == 200
        assert response.headers["cache-control"] == REVALIDATE

    async def test_another_files_hash_does_not_count(self, client):
        _, css_hash = _hashes()
        response = await client.get(f"/static/js/app.bundle.js?v={css_hash}")
        assert response.headers["cache-control"] == REVALIDATE

    async def test_unversioned_asset_revalidates_with_etag(self, client):
        response = await client.get("/static/js/app.bundle.js")
        assert response.headers["cache-control"] == REVALIDATE
        assert response.headers["etag"]

    async def test_favicon_revalidates(self, client):
        response = await client.get("/static/favicon.ico")
        assert response.headers["cache-control"] == REVALIDATE

    async def test_not_modified_keeps_the_policy(self, client):
        bundle_hash, _ = _hashes()
        url = f"/static/js/app.bundle.js?v={bundle_hash}"
        etag = (await client.get(url)).headers["etag"]
        response = await client.get(url, headers={"If-None-Match": etag})
        assert response.status_code == 304
        assert response.headers["cache-control"] == IMMUTABLE

    async def test_missing_file_gets_no_policy(self, client):
        response = await client.get("/static/js/nope.js?v=deadbeef")
        assert response.status_code == 404
        assert response.headers.get("cache-control") != IMMUTABLE


class TestPageAndApiCacheControl:
    async def test_index_revalidates(self, client):
        response = await client.get("/")
        assert response.headers["cache-control"] == REVALIDATE

    async def test_spa_route_revalidates(self, client):
        response = await client.get("/issues")
        assert response.headers["cache-control"] == REVALIDATE

    async def test_invite_page_stays_no_store(self, client):
        response = await client.get("/invite/sometoken")
        assert response.headers["cache-control"] == "no-store"

    async def test_api_is_never_cached(self, client):
        response = await client.get("/api/version")
        assert response.headers["cache-control"] == NO_STORE

    async def test_api_error_is_never_cached(self, client):
        response = await client.get("/api/issues")
        assert response.status_code == 401
        assert response.headers["cache-control"] == NO_STORE

    async def test_authenticated_api_is_never_cached(self, client, auth_headers):
        response = await client.get("/api/auth/me", headers=auth_headers)
        assert response.status_code == 200
        assert response.headers["cache-control"] == NO_STORE


class TestApiNoStoreMiddleware:
    def _app(self):
        async def plain(request):
            return JSONResponse({"ok": True})

        async def own(request):
            return JSONResponse({"ok": True}, headers={"Cache-Control": "private, max-age=60"})

        return Starlette(
            routes=[Route("/api/plain", plain), Route("/api/own", own), Route("/apiary", plain),
                    Route("/api", plain)],
            middleware=[Middleware(ApiNoStoreMiddleware)],
        )

    @pytest.mark.parametrize("path", ["/api", "/api/plain"])
    def test_api_paths_get_no_store(self, path):
        with TestClient(self._app()) as tc:
            assert tc.get(path).headers["cache-control"] == NO_STORE

    def test_endpoint_choice_is_kept(self):
        with TestClient(self._app()) as tc:
            assert tc.get("/api/own").headers["cache-control"] == "private, max-age=60"

    def test_non_api_prefix_is_untouched(self):
        with TestClient(self._app()) as tc:
            assert "cache-control" not in tc.get("/apiary").headers
