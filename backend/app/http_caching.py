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

- ``ApiNoStoreMiddleware`` gives every ``/api`` response
  ``Cache-Control: no-store`` unless the endpoint set its own. API
  responses carry per-user data and must never be served from a cache.
"""
from __future__ import annotations

import functools
from starlette.datastructures import MutableHeaders, QueryParams
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
