"""Main FastAPI application."""
import asyncio
from contextlib import asynccontextmanager
import logging
from typing import Annotated
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query
from fastapi.exceptions import RequestValidationError
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi import Request
import os

from app.config import get_settings
from app.oxyde_db import init_oxyde, close_oxyde, bootstrap_if_empty, verify_migrations_current
from app.api import api_router
from app.websocket import SocketOwner, manager
from app.services import credential_events, push_sender
from app.services.push_service import PushService
from app import ws_auth
from app.mcp_server.asgi import mcp_lifespan, mount_mcp
from app.mcp_server.auth import warn_if_capability_url_enabled
from app.mcp_server.tools import ALL_TOOLS, toolset_fingerprint
from app.oauth.cors import OAuthAwareCORS
from app.oauth.discovery import router as oauth_discovery_router
from app.api.oauth import public_router as oauth_router
from app.oauth.errors import FRAME_HEADERS, OAuthHTTPError, oauth_error_handler
from app.version import get_version_info
from app import log_redaction
from app.utils import vapid

settings = get_settings()
logger = logging.getLogger(__name__)

# CHT-1590/CHT-1597: scrub credentials out of uvicorn's request log lines.
# At import, which every way of serving app.main:app goes through, and
# again at startup (below), after any logging config a runner applies.
log_redaction.install()

# The known insecure default secret key
INSECURE_DEFAULT_KEY = "change-me-in-production-use-openssl-rand-hex-32"


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    # Startup
    log_redaction.install()
    # Check for insecure default SECRET_KEY
    if settings.secret_key == INSECURE_DEFAULT_KEY:
        if settings.debug:
            logger.warning(
                "Using default SECRET_KEY. This is OK for development but "
                "MUST be changed for production. Set the SECRET_KEY environment variable."
            )
        else:
            raise RuntimeError(
                "Refusing to start with default SECRET_KEY in production mode. "
                "JWT tokens would be signed with a publicly-known key. "
                "Set the SECRET_KEY environment variable to a secure random value: "
                "python -c \"import secrets; print(secrets.token_hex(32))\""
            )
    # CHT-1604: a VAPID_PRIVATE_KEY that is set must be a usable key, or
    # every push would fail; refuse to start, as for the secret key.
    try:
        vapid.check_setting()
    except vapid.VapidKeyError as exc:
        raise RuntimeError(f"Refusing to start: {exc}") from exc
    # CHT-1522: the /mcp/<key> capability URL is deprecated.
    warn_if_capability_url_enabled()
    await init_oxyde()
    # CHT-1195: a brand-new database gets its schema from the migration
    # chain here, the one case where migrating at startup cannot hurt.
    await bootstrap_if_empty()
    # CHT-1318: refuse to serve if the DB is behind the code's migrations,
    # rather than 500 at runtime on the first query of a not-yet-added
    # column (the CHT-1317 incident). No-op on a non-migration-managed DB.
    await verify_migrations_current()
    # CHT-1625: a push device whose credential was revoked is deleted by a
    # hook after the revocation commits; this catches a process that died
    # in between. Fail-soft: a failure here must not stop the server.
    try:
        await PushService().delete_stale_bindings()
    except Exception:
        logger.exception("could not sweep push devices bound to revoked credentials")
    # CHT-1294: prime the version cache at startup so the git subprocesses
    # (up to 4, each a blocking call) run here rather than on the first
    # request after a restart -- which is exactly when a deploy/health
    # check hammers the server. Every /health, /, and /api/version after
    # this is a pure dict read off the lru_cache, never touching the event
    # loop with a subprocess. Fail-soft, so a git-less deploy still boots.
    get_version_info(REPO_ROOT, FRONTEND_DIR)
    # Same reasoning for the MCP toolset fingerprint (CHT-1364): compute it
    # here, once, rather than on the first /api/version after a restart.
    await _mcp_toolset_fingerprint()
    # CHT-1266: the MCP session manager owns a task group that must run
    # for the app's whole lifetime -- Starlette doesn't cascade a mounted
    # sub-app's own lifespan, so it's entered explicitly here (the mcp
    # SDK's documented pattern; see mcp_server/asgi.py).
    async with mcp_lifespan():
        yield
    # Shutdown. Deliveries in flight get a few seconds before the
    # database closes under them (CHT-1628).
    try:
        await push_sender.drain(timeout=push_sender.SHUTDOWN_DRAIN_SECONDS)
    except Exception:
        logger.exception("could not drain push deliveries at shutdown")
    await close_oxyde()


app = FastAPI(
    title=settings.app_name,
    description="Agent-first project infrastructure for issue tracking and project management",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware. OAuthAwareCORS is a plain CORSMiddleware with these
# arguments while OAUTH_ENABLED is off; when on, it also opens the public
# OAuth endpoints to any origin and exposes WWW-Authenticate on /mcp
# (CHT-1551; see app/oauth/cors.py).
_origins = [o.strip() for o in settings.cors_origins.split(",")]
app.add_middleware(
    OAuthAwareCORS,
    allow_origins=_origins,
    allow_credentials=("*" not in _origins),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Sanitize 422 request-validation error bodies.

    FastAPI's default handler serializes pydantic's `.errors()` verbatim,
    which includes an `input` key holding the raw submitted value -- for
    UserCreate.password (min_length=8) that puts a user's plaintext
    password in the 422 response body, and from there into CLI stdout,
    shell history, and any agent harness logging raw output. Strip every
    error down to just `loc`+`msg`; nothing else is safe to echo back.

    NOTE ON ERROR SHAPES (CHT-1223): this API's `detail` body is not one
    consistent shape across status codes -- rather than force a wire
    change to unify them, the three (four, counting this docstring)
    existing forms are documented here so clients know what to expect:

    1. Plain string `detail` -- most 4xx (e.g. 404 "Issue not found").
    2. Structured dict `detail` with a stable `"error_code"` string (e.g.
       "sprint_in_limbo", "ticket_rituals_pending") plus error-specific
       keys -- ritual/limbo/arrears 409s from issues.py's create/update.
       `error_code` was added so clients can switch on it instead of
       duck-typing which keys happen to be present.
    3. List-of-objects `detail` -- FastAPI/pydantic's built-in 422 shape
       (this handler's own `sanitized` list, above).
    4. Plain string `detail` again, but from the global handler below --
       any unhandled exception, so every non-2xx response is at least
       valid JSON with a `detail` key (previously Starlette's default
       text/plain "Internal Server Error", which the CLI already had to
       special-case as a non-JSON body).
    """
    sanitized = [
        {"loc": list(err.get("loc", ())), "msg": err.get("msg", "")}
        for err in exc.errors()
    ]
    return JSONResponse(status_code=422, content={"detail": sanitized})


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    """Return a JSON body for unhandled exceptions (CHT-1223).

    Without this, Starlette's ServerErrorMiddleware falls back to a
    text/plain "Internal Server Error" body -- the CLI's client.py
    already has to special-case non-JSON error bodies for exactly this
    case. Registering this handler makes every non-2xx response at least
    valid JSON with a `detail` key, matching every other error path.
    """
    logger.exception("Unhandled exception on %s %s", request.method, request.url.path)
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})

# API routes
app.include_router(api_router, prefix="/api")

# Remote MCP (Model Context Protocol) -- Streamable HTTP transport at /mcp
# (CHT-1266). Registered before the SPA catch-all below so it gets first
# look; see app/mcp_server/asgi.py for the routing/auth/lifespan details.
mount_mcp(app)

# OAuth discovery documents for /mcp (CHT-1517), also ahead of the SPA
# catch-all. They 404 unless OAUTH_ENABLED is set.
app.include_router(oauth_discovery_router)
# The authorization server's own endpoints (CHT-1518..), same gating.
app.include_router(oauth_router)
app.add_exception_handler(OAuthHTTPError, oauth_error_handler)

# Client address from a trusted reverse proxy's X-Forwarded-For (CHT-1586).
# Added last, so it is the outermost middleware and everything inside it,
# the OAuth per-address limits included, sees the real client. Only the
# addresses in FORWARDED_ALLOW_IPS are believed (validated in Settings);
# every start path (justfile serve/serve-prod, `python -m app.main`, the e2e
# server) turns uvicorn's own handling off so it does not apply a second
# list read only from the process environment.
app.add_middleware(ProxyHeadersMiddleware, trusted_hosts=settings.trusted_proxies)

# Get the directory of this file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(os.path.dirname(BASE_DIR), "frontend")

# Mount static files if frontend exists
if os.path.exists(os.path.join(FRONTEND_DIR, "static")):
    app.mount("/static", StaticFiles(directory=os.path.join(FRONTEND_DIR, "static")), name="static")

# Templates
templates = Jinja2Templates(directory=os.path.join(FRONTEND_DIR, "templates"))

# Deploy/build legibility (CHT-1294). REPO_ROOT is the git checkout root
# (one level up from backend/, where FRONTEND_DIR also lives).
REPO_ROOT = os.path.dirname(BASE_DIR)


def _version_info() -> dict:
    return get_version_info(REPO_ROOT, FRONTEND_DIR)


def _render_index(request: Request):
    """Serve index.html with content-hashed asset cache-busters (CHT-1294).

    The ``?v=`` values are derived from the actual bytes of the bundle and
    stylesheet, so the browser cache busts exactly when the content changes
    -- replacing the hand-incremented counters that used to silently serve
    stale JS when someone forgot to bump them. ``git_sha_short`` is exposed
    in the page so "what's live" is visible without grepping the bundle.
    """
    info = _version_info()
    response = templates.TemplateResponse(request, "index.html", {
        "asset_version": info["bundle_hash"],
        "css_version": info["css_hash"],
        "git_sha_short": info["git_sha_short"],
    })
    # Never framed: the OAuth consent page is a route of this shell, and
    # framing any of it invites clickjacking (CHT-1519, threat S4). Its
    # path carries the consent request id, so no path in Referers either.
    response.headers.update(FRAME_HEADERS)
    response.headers["Referrer-Policy"] = "same-origin"
    return response


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    """Serve the main page."""
    return _render_index(request)


@app.get("/api/version")
async def version_info():
    """Report what commit/build is live (CHT-1294): git sha, commit time,
    process start time, and the content-hash cache-busters currently
    stamped onto the JS/CSS. Unauthenticated on purpose -- it's deploy
    metadata, not secrets -- and fail-soft (unknown/missing, never 500).
    """
    return {
        **_version_info(),
        "app_version": app.version,
        # The MCP surface this process serves (CHT-1364). MCP clients cache
        # the toolset at connect time and the stateless transport hides a
        # restart from them, so after an upgrade a connector may still
        # advertise the old tools until it reconnects; `chaotic system
        # upgrade` compares this before and after to say whether it must.
        "mcp_toolset_fingerprint": await _mcp_toolset_fingerprint(),
        "mcp_tool_count": len(ALL_TOOLS),
    }


async def _mcp_toolset_fingerprint() -> str | None:
    """toolset_fingerprint(), but fail-soft like the rest of /api/version:
    an mcp SDK change that breaks the hash must not take down the endpoint
    that exists to diagnose deploys (and that the upgrade health check
    does not cover). None means "unavailable", logged once at WARNING."""
    try:
        return await toolset_fingerprint()
    except Exception:  # noqa: BLE001 -- fail-soft by contract
        logger.warning("MCP toolset fingerprint unavailable", exc_info=True)
        return None


@app.get("/health")
async def health():
    """Health check endpoint.

    Beyond process liveness (this endpoint responding at all), does a
    trivial DB round-trip so a broken/unmigrated database surfaces here
    instead of only 500ing on the first real request (e.g. signup) --
    see the seeded lifespan/migration bug this closes. Additive only:
    `status` stays "healthy" for callers that only check that key/value
    (cli/src/cli/system.py::health_check polls this for HTTP 200); `db`
    and `version` are new.
    """
    from app.oxyde_models.user import OxydeUser

    try:
        await OxydeUser.objects.count()
        db_status = "ok"
    except Exception:
        db_status = "error"

    # `git_sha` is additive (CHT-1294): a health poll now also answers
    # "what commit is live" in one call, without hitting /api/version.
    return {
        "status": "healthy",
        "db": db_status,
        "version": app.version,
        "git_sha": _version_info()["git_sha_short"],
    }


def _log_watcher_failure(task: asyncio.Task) -> None:
    if not task.cancelled() and task.exception() is not None:
        logger.error("WebSocket credential watcher failed", exc_info=task.exception())


@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    team_id: Annotated[str, Query()],
    token: Annotated[str | None, Query(deprecated=True)] = None,
):
    """WebSocket endpoint for real-time updates.

    Authenticated through the shared credential resolver, from the
    Authorization header, a ``chaotic.bearer.<token>`` subprotocol entry,
    or the deprecated ``?token=`` (``app.ws_auth``, CHT-1603), and checked
    again while open: a credential revoked or expired, or a member removed
    from the team, is closed at the next check, or at once when the
    revocation happens in this process (CHT-1616).
    """
    # Read before the check: a revocation that commits while the check
    # (or the accept below) is in flight dispatches its hooks before this
    # socket is registered, so they cannot close it (PR #356 review, 2).
    generation = credential_events.generation()
    try:
        presented = ws_auth.presented_credential(websocket, token)
        principal = await ws_auth.authenticate(presented.token, team_id)
    except ws_auth.WsRefused as exc:
        await websocket.close(code=exc.code)
        return
    except Exception:
        logger.exception("WebSocket auth error during team validation")
        await websocket.close(code=ws_auth.CLOSE_INTERNAL_ERROR)
        return

    # Recorded with its principal, so a revocation in this process closes
    # it at once (CHT-1616, ``app.websocket.on_credentials_ended``).
    await manager.connect(
        websocket, team_id, subprotocol=presented.subprotocol, owner=SocketOwner.of(team_id, principal),
    )
    if credential_events.generation() != generation:
        # Something was revoked meanwhile: check again now that the socket
        # is registered (a revocation after this point closes it itself).
        try:
            await ws_auth.authenticate(presented.token, team_id)
        except ws_auth.WsRefused as exc:
            await manager.close(websocket, team_id, exc.code)
            return
        except Exception:
            logger.exception("WebSocket credential re-check after connect failed for team=%s", team_id)
            await manager.close(websocket, team_id, ws_auth.CLOSE_INTERNAL_ERROR)
            return

    async def close_when_refused():
        # The backstop: JWT expiry, and revocations made by another process.
        refused = await ws_auth.watch(presented.token, team_id)
        logger.info(
            "Closing WebSocket for user=%s team=%s: %s", principal.user.id, team_id, refused.reason,
        )
        # Stops broadcasting to it now, not when the client acknowledges;
        # a no-op if a revocation hook closed it first.
        await manager.close(websocket, team_id, refused.code)

    watcher = asyncio.create_task(close_when_refused())
    # Cancelled when the socket ends, never awaited: surface anything it
    # raised rather than "Task exception was never retrieved" (PR #352
    # review, finding 8).
    watcher.add_done_callback(_log_watcher_failure)
    try:
        while True:
            # Keep connection alive, listen for client messages
            await websocket.receive_text()
            # Could handle client messages here if needed (e.g., presence, typing indicators)
    except WebSocketDisconnect:
        pass
    except Exception:
        # CHT-1225: only WebSocketDisconnect was caught here -- any other
        # exception during receive_text() (an abrupt network drop can
        # surface as a different exception depending on the starlette/
        # websockets version) skipped cleanup entirely, leaking the dead
        # connection in manager.active_connections until the next
        # broadcast_to_team for this team incidentally swept it.
        logger.exception(
            "WebSocket receive error for team=%s; cleaning up connection",
            team_id,
        )
    finally:
        watcher.cancel()
        manager.disconnect(websocket, team_id)


@app.get("/cli-auth", response_class=HTMLResponse)
async def cli_auth(request: Request, callback: str = Query(...), state: str = Query(...)):
    """CLI authorization page - creates API key and redirects to CLI callback."""
    from urllib.parse import urlparse

    # Validate callback URL is localhost only (security: prevent open redirect)
    parsed = urlparse(callback)
    if parsed.hostname not in ("localhost", "127.0.0.1"):
        from fastapi import HTTPException
        raise HTTPException(status_code=400, detail="Callback URL must be localhost")

    response = templates.TemplateResponse(request, "cli-auth.html", {
        "callback": callback,
        "state": state
    })
    # It mints an API key on a click: never framed (CHT-1519 review N6).
    response.headers.update(FRAME_HEADERS)
    response.headers["Referrer-Policy"] = "no-referrer"
    return response


@app.get("/{full_path:path}", response_class=HTMLResponse)
async def spa_fallback(request: Request, full_path: str):
    """Serve the SPA for all non-API routes.

    Except ``/.well-known/*`` (CHT-1550): clients probing for discovery
    documents (OAuth, OIDC, security.txt, ...) expect JSON or a 404, and
    would try to parse the SPA's HTML. The documents this server does
    serve are routed ahead of this catch-all.
    """
    if full_path == ".well-known" or full_path.startswith(".well-known/"):
        return JSONResponse({"detail": "Not Found"}, status_code=404)
    return _render_index(request)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        # CHT-1586: the app applies FORWARDED_ALLOW_IPS itself (see the
        # ProxyHeadersMiddleware above); uvicorn's own copy reads only the
        # process environment, not .env, so it could disagree.
        proxy_headers=False,
    )
