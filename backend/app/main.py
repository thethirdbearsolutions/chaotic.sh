"""Main FastAPI application."""
from contextlib import asynccontextmanager
import logging
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi import Request
import os

from app.config import get_settings
from app.database import init_db
from app.api import api_router
from app.websocket import manager
from app.utils.security import decode_token

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
            logger.critical(
                "SECURITY WARNING: Using default SECRET_KEY in production mode! "
                "JWT tokens are signed with a publicly-known key. "
                "Set the SECRET_KEY environment variable to a secure random value. "
                "Generate one with: python -c \"import secrets; print(secrets.token_hex(32))\""
            )
    await init_db()
    yield
    # Shutdown


app = FastAPI(
    title=settings.app_name,
    description="Agent-first project infrastructure for issue tracking and project management",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(api_router, prefix="/api")

# Get the directory of this file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(os.path.dirname(BASE_DIR), "frontend")

# Mount static files if frontend exists
if os.path.exists(os.path.join(FRONTEND_DIR, "static")):
    app.mount("/static", StaticFiles(directory=os.path.join(FRONTEND_DIR, "static")), name="static")

# Templates
templates = Jinja2Templates(directory=os.path.join(FRONTEND_DIR, "templates"))


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    """Serve the main page."""
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}


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

    await manager.connect(websocket, team_id)
    try:
        while True:
            # Keep connection alive, listen for client messages
            data = await websocket.receive_text()
            # Could handle client messages here if needed (e.g., presence, typing indicators)
    except WebSocketDisconnect:
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

    return templates.TemplateResponse("cli-auth.html", {
        "request": request,
        "callback": callback,
        "state": state
    })


@app.get("/{full_path:path}", response_class=HTMLResponse)
async def spa_fallback(request: Request, full_path: str):
    """Serve the SPA for all non-API routes."""
    return templates.TemplateResponse("index.html", {"request": request})


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )
