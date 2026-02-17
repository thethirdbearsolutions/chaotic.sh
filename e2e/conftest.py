"""E2E test harness: real CLI client against real FastAPI backend.

No mocks anywhere in the request chain. The CLI's client.py makes real HTTP
calls to a real FastAPI server running in a background thread, backed by a
file-based SQLite database.

This is the contract test suite for the oxyde ORM port.
"""
import sys
import os
import shutil
import tempfile
import threading
import time
import asyncio

# Add backend to Python path FIRST
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

# Set environment BEFORE any app imports
_db_dir = tempfile.mkdtemp()
_db_path = os.path.join(_db_dir, "e2e_test.db")
os.environ["DEBUG"] = "false"
os.environ["SECRET_KEY"] = "e2e-test-secret-key-not-for-production"
os.environ["DATABASE_URL"] = f"sqlite+aiosqlite:///{_db_path}"

import pytest
from unittest.mock import patch
import httpx
import uvicorn

from app.main import app
from app.database import Base, engine, async_session_maker, get_db
from app.utils.security import get_password_hash, create_access_token
from app.models import User
from cli.client import Client, APIError


# --- Async helper ---

def _run_async(coro):
    """Run an async coroutine synchronously."""
    loop = asyncio.new_event_loop()
    try:
        return loop.run_until_complete(coro)
    finally:
        loop.close()


# --- Server ---

TEST_PORT = 19876
TEST_BASE_URL = f"http://127.0.0.1:{TEST_PORT}/api"


class _Server:
    def __init__(self):
        config = uvicorn.Config(
            app=app, host="127.0.0.1", port=TEST_PORT,
            log_level="error",
        )
        self.server = uvicorn.Server(config)
        self.thread = None

    def start(self):
        self.thread = threading.Thread(target=self.server.run, daemon=True)
        self.thread.start()
        for _ in range(100):
            try:
                resp = httpx.get(f"http://127.0.0.1:{TEST_PORT}/health", timeout=1.0)
                if resp.status_code == 200:
                    return
            except (httpx.ConnectError, httpx.ReadError):
                time.sleep(0.1)
        raise RuntimeError("Test server failed to start")

    def stop(self):
        self.server.should_exit = True
        if self.thread:
            self.thread.join(timeout=5)


@pytest.fixture(scope="session", autouse=True)
def test_server():
    """Start the FastAPI server for the entire test session.

    The server uses the app's own database engine (pointed at our temp file).
    The lifespan handler creates tables via init_db().
    """
    server = _Server()
    server.start()
    yield server
    server.stop()
    shutil.rmtree(_db_dir, ignore_errors=True)


@pytest.fixture(autouse=True)
def reset_db_between_tests():
    """Delete all data between tests for isolation."""
    yield
    async def _clear_data():
        from sqlalchemy import text
        async with engine.begin() as conn:
            # Disable FK checks, delete all data, re-enable
            await conn.execute(text("PRAGMA foreign_keys = OFF"))
            tables = await conn.run_sync(
                lambda sync_conn: Base.metadata.sorted_tables
            )
            for table in reversed(tables):
                await conn.execute(table.delete())
            await conn.execute(text("PRAGMA foreign_keys = ON"))
        # Also perform a write via Oxyde to keep its connection pool in sync
        # with the SQLAlchemy-driven cleanup (dual-ORM visibility workaround).
        from app.oxyde_models.user import OxydeUser
        await OxydeUser.objects.filter(id="__noop__").delete()
    _run_async(_clear_data())


# --- User creation ---

async def _create_user_in_db(email, name, password="testpassword123"):
    """Create a user directly in DB (needed to bootstrap auth tokens)."""
    async with async_session_maker() as session:
        user = User(
            email=email,
            hashed_password=get_password_hash(password),
            name=name,
        )
        session.add(user)
        await session.commit()
        await session.refresh(user)
        return user


# --- Fixtures ---

@pytest.fixture
def test_user():
    return _run_async(_create_user_in_db("e2e@example.com", "E2E Test User"))


@pytest.fixture
def test_user2():
    return _run_async(_create_user_in_db("e2e2@example.com", "E2E Test User 2"))


@pytest.fixture
def auth_token(test_user):
    return create_access_token(data={"sub": test_user.id})


@pytest.fixture
def auth_token2(test_user2):
    return create_access_token(data={"sub": test_user2.id})


@pytest.fixture
def api_client(auth_token):
    """CLI Client authenticated as test_user, pointed at test server."""
    with patch('cli.client.get_api_url', return_value=TEST_BASE_URL), \
         patch('cli.client.get_token', return_value=auth_token), \
         patch('cli.client.get_api_key', return_value=None):
        yield Client()


@pytest.fixture
def api_client2(auth_token2):
    """CLI Client authenticated as test_user2."""
    with patch('cli.client.get_api_url', return_value=TEST_BASE_URL), \
         patch('cli.client.get_token', return_value=auth_token2), \
         patch('cli.client.get_api_key', return_value=None):
        yield Client()


@pytest.fixture
def unauthenticated_client():
    """CLI Client with no auth."""
    with patch('cli.client.get_api_url', return_value=TEST_BASE_URL), \
         patch('cli.client.get_token', return_value=None), \
         patch('cli.client.get_api_key', return_value=None):
        yield Client()


# --- Convenience fixtures that create data via the API ---

@pytest.fixture
def test_team(api_client):
    """Create a team via the API."""
    return api_client.create_team(name="E2E Team", key="E2E")


@pytest.fixture
def test_project(api_client, test_team):
    """Create a project via the API."""
    return api_client.create_project(
        team_id=test_team["id"], name="E2E Project", key="E2E"
    )
