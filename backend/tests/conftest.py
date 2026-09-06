"""Test configuration and fixtures.

Uses Oxyde ORM for all database operations. Each test gets a fresh
file-based SQLite database to ensure isolation.
"""
import os
import pytest
import pytest_asyncio
from unittest.mock import patch
from httpx import AsyncClient, ASGITransport

from app.utils.security import get_password_hash, create_access_token
from app.enums import TeamRole


# The test database is built by the real migration chain, once per session,
# into a template file that every test copies (CHT-1208). Until then the
# suite hand-maintained ~360 lines of CREATE TABLE that declared 44 ON DELETE
# CASCADE clauses production's migrations never had, so services could rely
# on cascades in tests that left orphans in production, and migrations
# 0001-0005 and 0009-0016 were never executed by any test.
_MIGRATIONS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, "migrations"))


def _build_schema_template(path: str) -> None:
    """Apply every migration to an empty SQLite file at `path` on a private
    event loop in a worker thread, so the session's Oxyde registry and the
    per-test loops never see the connection used to build it."""
    import asyncio
    import threading

    async def _apply():
        from oxyde import AsyncDatabase, PoolSettings, disconnect_all
        from oxyde.migrations.executor import apply_migrations

        _db = AsyncDatabase(f"sqlite:///{path}", overwrite=True, settings=PoolSettings(max_connections=1))
        await _db.connect()
        import app.oxyde_models  # noqa: F401 -- register models before migrating
        try:
            await apply_migrations(migrations_dir=_MIGRATIONS_DIR)
        finally:
            await disconnect_all()

    failure: list[BaseException] = []

    def _run():
        try:
            asyncio.run(_apply())
        except BaseException as e:  # surfaced below, on the calling thread
            failure.append(e)

    t = threading.Thread(target=_run, name="schema-template")
    t.start()
    t.join()
    if failure:
        raise failure[0]


@pytest.fixture(scope="session")
def schema_template(tmp_path_factory) -> str:
    """Path of a SQLite file carrying the fully migrated, empty schema."""
    path = str(tmp_path_factory.mktemp("schema") / "template.db")
    _build_schema_template(path)
    return path


def _copy_database(src: str, dst: str) -> None:
    """Snapshot `src` into `dst` through SQLite's backup API, so a WAL left by
    the builder is folded in rather than copied alongside."""
    import sqlite3

    with sqlite3.connect(src) as source, sqlite3.connect(dst) as target:
        source.backup(target)


@pytest_asyncio.fixture
async def db(tmp_path, schema_template):
    """Initialize Oxyde with a fresh temp database for each test: a copy of
    the migrated template, so the schema under test IS the production
    schema (CHT-1208).

    Yields None (kept as a fixture param for test signatures that
    reference 'db' even though Oxyde manages connections globally).
    """
    db_path = str(tmp_path / "test.db")
    db_url = f"sqlite:///{db_path}"
    _copy_database(schema_template, db_path)

    # Set env var so get_settings() picks it up for any code that reads it
    os.environ["DATABASE_URL"] = f"sqlite+aiosqlite:///{db_path}"

    # Clear the cached settings so the new DATABASE_URL is picked up
    from app.config import get_settings
    get_settings.cache_clear()

    from oxyde import AsyncDatabase, PoolSettings, disconnect_all

    # Single connection: session-scoped PRAGMAs (foreign_keys OFF/ON in FK-corruption
    # tests) must hit the same connection as the statements they bracket.
    _db = AsyncDatabase(db_url, overwrite=True, settings=PoolSettings(max_connections=1))
    await _db.connect()

    # Import models so they register with Oxyde
    import app.oxyde_models  # noqa: F401

    # Monkey-patch QueryManager.create to re-fetch after insert so enum fields
    # are properly coerced by DbEnum validators (objects.create returns
    # raw strings for enum fields, objects.get runs validators).
    from oxyde.queries.manager import QueryManager
    _original_create = QueryManager.create

    async def _create_and_refetch(self, **kwargs):
        obj = await _original_create(self, **kwargs)
        # Re-fetch to run validators (especially DbEnum coercion)
        pk_field = "id"  # All our models use "id" as primary key
        pk_value = getattr(obj, pk_field, None)
        if pk_value is not None:
            try:
                return await self.get(**{pk_field: pk_value})
            except Exception:
                return obj  # Fall back to original if re-fetch fails
        return obj

    QueryManager.create = _create_and_refetch

    yield None

    # Restore original create
    QueryManager.create = _original_create

    # disconnect_all clears the registry so the next test can register 'default'
    await disconnect_all()

    # Clean up env
    os.environ.pop("DATABASE_URL", None)
    get_settings.cache_clear()


@pytest_asyncio.fixture
async def db_session(db):
    """Alias for db fixture -- kept for backward compatibility with tests
    that use db_session in their signature."""
    yield db


@pytest_asyncio.fixture
async def client(db):
    """Create test HTTP client.

    Patches init_oxyde/close_oxyde to no-ops since the db fixture
    already initializes Oxyde, and patches apply_migrations since
    tables are already created.
    """
    from app.main import app

    async def noop_init():
        return None

    async def noop_close():
        pass

    async def noop_migrations(*args, **kwargs):
        return []

    with patch("app.main.init_oxyde", side_effect=noop_init), \
         patch("app.main.close_oxyde", side_effect=noop_close), \
         patch("oxyde.migrations.executor.apply_migrations", side_effect=noop_migrations):
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            yield ac


@pytest_asyncio.fixture
async def test_user(db):
    """Create test user."""
    from app.oxyde_models.user import OxydeUser

    user = await OxydeUser.objects.create(
        email="test@example.com",
        hashed_password=get_password_hash("testpassword123"),
        name="Test User",
    )
    return user


@pytest_asyncio.fixture
async def test_user2(db):
    """Create second test user."""
    from app.oxyde_models.user import OxydeUser

    user = await OxydeUser.objects.create(
        email="test2@example.com",
        hashed_password=get_password_hash("testpassword123"),
        name="Test User 2",
    )
    return user


@pytest_asyncio.fixture
async def auth_headers(test_user):
    """Get authentication headers for test user."""
    token = create_access_token(data={"sub": test_user.id})
    return {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def auth_headers2(test_user2):
    """Get authentication headers for second test user."""
    token = create_access_token(data={"sub": test_user2.id})
    return {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def interactive_headers(auth_headers):
    """auth_headers plus the X-Chaotic-Interactive signal the CLI sends
    for a TTY session (CHT-1302). Human-account requests only get the
    ritual/estimate exemption when this is also present -- plain
    auth_headers now models a human account driven non-interactively
    (e.g. scripted/agent-as-human), which is gated like an agent."""
    return {**auth_headers, "X-Chaotic-Interactive": "1"}


@pytest_asyncio.fixture
async def test_team(db, test_user):
    """Create test team with test_user as owner."""
    from app.oxyde_models.team import OxydeTeam, OxydeTeamMember

    team = await OxydeTeam.objects.create(
        name="Test Team",
        key="TEST",
        description="A test team",
    )

    await OxydeTeamMember.objects.create(
        team_id=team.id,
        user_id=test_user.id,
        role=TeamRole.OWNER,
    )

    return team


@pytest_asyncio.fixture
async def test_project(db, test_team):
    """Create test project."""
    from app.oxyde_models.project import OxydeProject

    project = await OxydeProject.objects.create(
        team_id=test_team.id,
        name="Test Project",
        key="PROJ",
        description="A test project",
        color="#6366f1",
    )
    return project


@pytest_asyncio.fixture
async def test_issue(db, test_project, test_user):
    """Create test issue."""
    from app.oxyde_models.issue import OxydeIssue
    from oxyde import execute_raw

    # Increment issue_count on the project
    await execute_raw(
        "UPDATE projects SET issue_count = issue_count + 1 WHERE id = ?",
        [test_project.id],
    )
    # Refresh project to get updated count
    from app.oxyde_models.project import OxydeProject
    project = await OxydeProject.objects.get(id=test_project.id)
    number = project.issue_count

    issue = await OxydeIssue.objects.create(
        project_id=project.id,
        identifier=f"{project.key}-{number}",
        number=number,
        title="Test Issue",
        description="A test issue",
        creator_id=test_user.id,
    )
    return issue


@pytest_asyncio.fixture
async def test_sprint(db, test_project):
    """Create test sprint."""
    from app.oxyde_models.sprint import OxydeSprint

    sprint = await OxydeSprint.objects.create(
        project_id=test_project.id,
        name="Sprint 1",
        description="First sprint",
    )
    return sprint


@pytest_asyncio.fixture
async def test_document(db, test_team, test_user):
    """Create test document."""
    from app.oxyde_models.document import OxydeDocument

    document = await OxydeDocument.objects.create(
        team_id=test_team.id,
        author_id=test_user.id,
        title="Test Document",
        content="Test content",
    )
    return document


@pytest_asyncio.fixture
async def test_label(db, test_team):
    """Create test label."""
    from app.oxyde_models.label import OxydeLabel

    label = await OxydeLabel.objects.create(
        team_id=test_team.id,
        name="Bug",
        color="#f85149",
        description="Bug label",
    )
    return label


@pytest_asyncio.fixture
async def agent_user(db, test_team):
    """Agent user on test_team (owner role for unrestricted access)."""
    from app.oxyde_models.user import OxydeUser
    from app.oxyde_models.team import OxydeTeamMember

    user = await OxydeUser.objects.create(
        email="agent@example.com",
        hashed_password=get_password_hash("testpassword123"),
        name="Agent User",
        is_agent=True,
    )
    await OxydeTeamMember.objects.create(
        team_id=test_team.id,
        user_id=user.id,
        role=TeamRole.OWNER,
    )
    return user


@pytest_asyncio.fixture
async def agent_headers(agent_user):
    """Auth headers for agent user."""
    token = create_access_token(data={"sub": agent_user.id})
    return {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def make_ritual(db, test_project):
    """Factory for creating rituals with sensible defaults.

    Usage:
        ritual = await make_ritual(approval_mode=ApprovalMode.GATE)
        ritual = await make_ritual(
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.REVIEW,
            note_required=False,
        )
    """
    from app.oxyde_models.ritual import OxydeRitual
    from app.enums import RitualTrigger, ApprovalMode

    counter = {"n": 0}

    async def _make(
        name: str | None = None,
        prompt: str = "Did you do the thing?",
        trigger: "RitualTrigger" = RitualTrigger.TICKET_CLOSE,
        approval_mode: "ApprovalMode" = ApprovalMode.AUTO,
        note_required: bool = True,
        conditions: str | None = None,
        is_active: bool = True,
    ):
        counter["n"] += 1
        return await OxydeRitual.objects.create(
            project_id=test_project.id,
            name=name or f"ritual_{counter['n']}",
            prompt=prompt,
            trigger=trigger,
            approval_mode=approval_mode,
            note_required=note_required,
            conditions=conditions,
            is_active=is_active,
        )

    return _make


@pytest_asyncio.fixture
async def auto_close_ritual(make_ritual):
    """AUTO-mode TICKET_CLOSE ritual."""
    from app.enums import RitualTrigger, ApprovalMode
    return await make_ritual(
        name="auto_close",
        trigger=RitualTrigger.TICKET_CLOSE,
        approval_mode=ApprovalMode.AUTO,
    )


@pytest_asyncio.fixture
async def review_close_ritual(make_ritual):
    """REVIEW-mode TICKET_CLOSE ritual."""
    from app.enums import RitualTrigger, ApprovalMode
    return await make_ritual(
        name="review_close",
        trigger=RitualTrigger.TICKET_CLOSE,
        approval_mode=ApprovalMode.REVIEW,
    )


@pytest_asyncio.fixture
async def gate_close_ritual(make_ritual):
    """GATE-mode TICKET_CLOSE ritual."""
    from app.enums import RitualTrigger, ApprovalMode
    return await make_ritual(
        name="gate_close",
        trigger=RitualTrigger.TICKET_CLOSE,
        approval_mode=ApprovalMode.GATE,
    )


@pytest_asyncio.fixture
async def auto_claim_ritual(make_ritual):
    """AUTO-mode TICKET_CLAIM ritual."""
    from app.enums import RitualTrigger, ApprovalMode
    return await make_ritual(
        name="auto_claim",
        trigger=RitualTrigger.TICKET_CLAIM,
        approval_mode=ApprovalMode.AUTO,
    )


@pytest_asyncio.fixture
async def review_claim_ritual(make_ritual):
    """REVIEW-mode TICKET_CLAIM ritual."""
    from app.enums import RitualTrigger, ApprovalMode
    return await make_ritual(
        name="review_claim",
        trigger=RitualTrigger.TICKET_CLAIM,
        approval_mode=ApprovalMode.REVIEW,
    )


@pytest_asyncio.fixture
async def gate_claim_ritual(make_ritual):
    """GATE-mode TICKET_CLAIM ritual."""
    from app.enums import RitualTrigger, ApprovalMode
    return await make_ritual(
        name="gate_claim",
        trigger=RitualTrigger.TICKET_CLAIM,
        approval_mode=ApprovalMode.GATE,
    )


@pytest_asyncio.fixture
async def captured_broadcasts(monkeypatch):
    """Capture all WebSocket broadcasts as a list of (team_id, message) tuples.

    Tests assert against this list to verify state transitions emit the
    expected events without depending on a real WebSocket connection.
    """
    captured: list[tuple[str, dict]] = []

    async def _capture(team_id: str, message: dict):
        captured.append((team_id, message))

    monkeypatch.setattr("app.websocket.manager.broadcast_to_team", _capture)
    return captured
