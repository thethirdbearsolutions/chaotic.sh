"""Main FastAPI application."""
from contextlib import asynccontextmanager
import logging
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi import Request
import os

from app.config import get_settings
from app.oxyde_db import init_oxyde, close_oxyde, verify_migrations_current
from app.api import api_router
from app.websocket import manager
from app.utils.security import decode_token
from app.api.deps import check_user_team_access
from app.services.user_service import UserService
from app.mcp_server.asgi import mcp_lifespan, mount_mcp
from app.version import get_version_info

settings = get_settings()
logger = logging.getLogger(__name__)

# The known insecure default secret key
INSECURE_DEFAULT_KEY = "change-me-in-production-use-openssl-rand-hex-32"


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    # Startup
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
    await init_oxyde()
    # CHT-1318: refuse to serve if the DB is behind the code's migrations,
    # rather than 500 at runtime on the first query of a not-yet-added
    # column (the CHT-1317 incident). No-op on a non-migration-managed DB.
    await verify_migrations_current()
    # CHT-1294: prime the version cache at startup so the git subprocesses
    # (up to 4, each a blocking call) run here rather than on the first
    # request after a restart -- which is exactly when a deploy/health
    # check hammers the server. Every /health, /, and /api/version after
    # this is a pure dict read off the lru_cache, never touching the event
    # loop with a subprocess. Fail-soft, so a git-less deploy still boots.
    get_version_info(REPO_ROOT, FRONTEND_DIR)
    # CHT-1266: the MCP session manager owns a task group that must run
    # for the app's whole lifetime -- Starlette doesn't cascade a mounted
    # sub-app's own lifespan, so it's entered explicitly here (the mcp
    # SDK's documented pattern; see mcp_server/asgi.py).
    async with mcp_lifespan():
        yield
    # Shutdown
    await close_oxyde()


app = FastAPI(
    title=settings.app_name,
    description="Agent-first project infrastructure for issue tracking and project management",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
_origins = [o.strip() for o in settings.cors_origins.split(",")]
app.add_middleware(
    CORSMiddleware,
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
    return templates.TemplateResponse(request, "index.html", {
        "asset_version": info["bundle_hash"],
        "css_version": info["css_hash"],
        "git_sha_short": info["git_sha_short"],
    })


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
    return {**_version_info(), "app_version": app.version}


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


@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    token: str = Query(...),
    team_id: str = Query(...)
):
    """WebSocket endpoint for real-time updates."""
    # Validate token
    payload = decode_token(token)
    if not payload:
        await websocket.close(code=4001)
        return

    # Validate team membership (CHT-1110)
    user_id = payload.get("sub")
    if not user_id:
        await websocket.close(code=4001)
        return

    try:
        user_service = UserService()
        user = await user_service.get_by_id(user_id)
        if not user or not user.is_active:
            await websocket.close(code=4003)
            return
        if not await check_user_team_access(user, team_id):
            await websocket.close(code=4003)
            return
    except Exception:
        logger.exception("WebSocket auth error during team validation")
        await websocket.close(code=4011)
        return

    await manager.connect(websocket, team_id)
    try:
        while True:
            # Keep connection alive, listen for client messages
            data = await websocket.receive_text()
            # Could handle client messages here if needed (e.g., presence, typing indicators)
    except WebSocketDisconnect:
        manager.disconnect(websocket, team_id)
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

    return templates.TemplateResponse(request, "cli-auth.html", {
        "callback": callback,
        "state": state
    })


@app.get("/{full_path:path}", response_class=HTMLResponse)
async def spa_fallback(request: Request, full_path: str):
    """Serve the SPA for all non-API routes."""
    return _render_index(request)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )
