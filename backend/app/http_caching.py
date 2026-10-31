"""Response caching rules (CHT-1874).

Two pieces, both added in ``app.main``:

- ``CachedStaticFiles`` serves ``/static`` with a Cache-Control header.
  A request whose ``?v=`` is the content hash of the file it names (the
  value ``index.html`` stamps on the bundle and stylesheet, CHT-1294) gets
  ``public, max-age=31536000, immutable``: those exact bytes never change
  under that URL. Everything else, a stale or missing ``?v=`` included,
  gets ``no-cache``, so the browser revalidates against the ETag that
  StaticFiles already sends. The hash is checked against the file's bytes
  as they are on disk now rather than trusted from the URL, so an old page
  asking for an old ``?v=`` after a deploy or a rebuild cannot pin the new
  bytes under it for a year.

- ``CodingAwareGZipMiddleware`` is Starlette's GZipMiddleware, plus the
  header fixes a recoded response needs: see its docstring.

- ``ApiNoStoreMiddleware`` gives every ``/api`` response
  ``Cache-Control: no-store`` unless the endpoint set its own. API
  responses carry per-user data and must never be served from a cache.
"""
from __future__ import annotations

import functools
from starlette.datastructures import Headers, MutableHeaders, QueryParams
from starlette.middleware.gzip import GZipMiddleware, GZipResponder, IdentityResponder
from starlette.responses import Response
from starlette.staticfiles import StaticFiles
from starlette.types import ASGIApp, Message, Receive, Scope, Send

from app.version import asset_cache_buster

IMMUTABLE = "public, max-age=31536000, immutable"
REVALIDATE = "no-cache"
NO_STORE = "no-store"


class CachedStaticFiles(StaticFiles):
    """StaticFiles that says how long each response may be cached."""

    async def get_response(self, path: str, scope: Scope) -> Response:
        response = await super().get_response(path, scope)
        # 200 and its 304 revalidation answer carry the policy; an error
        # (404, 405) keeps whatever Starlette gave it.
        if response.status_code in (200, 304):
            response.headers["Cache-Control"] = self._cache_control(path, scope)
        return response

    def _cache_control(self, path: str, scope: Scope) -> str:
        version = QueryParams(scope.get("query_string", b"")).get("v")
        if not version:
            return REVALIDATE
        full_path, stat = self.lookup_path(path)
        if stat and version == _content_hash(full_path, stat.st_mtime_ns, stat.st_size):
            return IMMUTABLE
        return REVALIDATE


@functools.lru_cache(maxsize=64)
def _content_hash(full_path: str, mtime_ns: int, size: int) -> str:
    """The file's ``?v=`` hash, keyed on its stat as well as its path.

    ``index.html`` stamps a hash cached for the life of the process, so
    after a rebuild without a restart (``npm run build`` beside a running
    dev server) the page still asks for the old ``?v=``. Hashing the bytes
    as they are now means that request no longer matches and is answered
    ``no-cache``, instead of pinning the new bytes under the old URL.
    """
    return asset_cache_buster.__wrapped__(full_path)


def _is_api_path(path: str) -> bool:
    return path == "/api" or path.startswith("/api/")


class ApiNoStoreMiddleware:
    """Mark every ``/api`` response ``Cache-Control: no-store`` unless the
    endpoint already chose a Cache-Control. Pure ASGI, so streaming
    responses pass through untouched."""

    def __init__(self, app: ASGIApp) -> None:
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http" or not _is_api_path(scope.get("path", "")):
            await self.app(scope, receive, send)
            return

        async def send_with_no_store(message: Message) -> None:
            if message["type"] == "http.response.start":
                headers = MutableHeaders(scope=message)
                if "cache-control" not in headers:
                    headers["Cache-Control"] = NO_STORE
            await send(message)

        await self.app(scope, receive, send_with_no_store)


class CodingAwareGZipMiddleware(GZipMiddleware):
    """Starlette's GZipMiddleware with the headers of a body it recodes
    corrected (CHT-1874 review).

    StaticFiles gives a file one strong ETag and ``Accept-Ranges: bytes``.
    Once the body is gzipped those describe the wrong bytes: the strong
    ETag would be shared by two different representations (RFC 9110
    8.8.3), and a byte range or ``If-Range`` resume would splice identity
    bytes into a gzip body. So a response this middleware compressed gets
    a weak ETag (StaticFiles' If-None-Match check ignores ``W/``, so
    revalidation still answers 304) and no ``Accept-Ranges``. A Range
    request is answered 206 by StaticFiles, which GZip passes through
    untouched, so ranges still work on the identity representation.

    A HEAD answer is never compressed (it has no body to compress) but
    carries ``Vary: Accept-Encoding`` like its GET, so a cache keys them
    alike.
    """

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return
        is_head = scope.get("method") == "HEAD"
        # Whether the endpoint chose its own Content-Encoding, in which case
        # GZip passed it through and its headers are the endpoint's own.
        app_encoded = False

        async def inner_app(scope: Scope, receive: Receive, inner_send: Send) -> None:
            async def note_encoding(message: Message) -> None:
                nonlocal app_encoded
                if message["type"] == "http.response.start":
                    app_encoded = "content-encoding" in Headers(raw=message["headers"])
                await inner_send(message)

            await self.app(scope, receive, note_encoding)

        async def fix_headers(message: Message) -> None:
            if message["type"] == "http.response.start":
                headers = MutableHeaders(scope=message)
                if headers.get("content-encoding") == "gzip" and not app_encoded:
                    etag = headers.get("etag")
                    if etag and not etag.startswith("W/"):
                        headers["ETag"] = "W/" + etag
                    if "accept-ranges" in headers:
                        del headers["Accept-Ranges"]
                elif is_head:
                    headers.add_vary_header("Accept-Encoding")
            await send(message)

        responder: ASGIApp
        if "gzip" in Headers(scope=scope).get("Accept-Encoding", ""):
            responder = GZipResponder(
                inner_app,
                self.minimum_size,
                compresslevel=self.compresslevel,
                thread_minimum_size=self.thread_minimum_size,
                exclude_content_types=self.exclude_content_types,
            )
        else:
            responder = IdentityResponder(
                inner_app, self.minimum_size, exclude_content_types=self.exclude_content_types
            )
        await responder(scope, receive, fix_headers)
