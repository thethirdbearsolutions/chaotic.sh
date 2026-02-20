"""Test configuration and fixtures.

Uses Oxyde ORM for all database operations. Each test gets a fresh
file-based SQLite database to ensure isolation.
"""
import os
import pytest
import pytest_asyncio
from unittest.mock import AsyncMock, patch
from httpx import AsyncClient, ASGITransport

from app.utils.security import get_password_hash, create_access_token
from app.enums import TeamRole


# SQL schema extracted from production chaotic.db — all tables needed by
# the Oxyde models.  Order matters: tables referenced by FKs come first.
_SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS teams (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "key" VARCHAR(10) NOT NULL,
    description VARCHAR(1000),
    logo_url VARCHAR(500),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS ix_teams_key ON teams ("key");

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT 1,
    is_superuser BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    is_agent BOOLEAN NOT NULL DEFAULT 0,
    parent_user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    agent_team_id VARCHAR(36) REFERENCES teams(id) ON DELETE CASCADE,
    agent_project_id VARCHAR(36)
);
CREATE UNIQUE INDEX IF NOT EXISTS ix_users_email ON users (email);

CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    team_id VARCHAR(36) NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    "key" VARCHAR(10) NOT NULL,
    description VARCHAR(2000),
    color VARCHAR(7) NOT NULL DEFAULT '#6366f1',
    icon VARCHAR(50),
    lead_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    issue_count INTEGER NOT NULL DEFAULT 0,
    estimate_scale VARCHAR(11) NOT NULL DEFAULT 'FIBONACCI',
    unestimated_handling VARCHAR(21) NOT NULL DEFAULT 'DEFAULT_ONE_POINT',
    default_sprint_budget INTEGER,
    human_rituals_required BOOLEAN NOT NULL DEFAULT 0,
    require_estimate_on_claim BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_projects_key ON projects ("key");

CREATE TABLE IF NOT EXISTS labels (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    team_id VARCHAR(36) NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#6366f1',
    description VARCHAR(500),
    created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS sprints (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    project_id VARCHAR(36) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(2000),
    status VARCHAR(9) NOT NULL DEFAULT 'PLANNED',
    start_date DATETIME,
    end_date DATETIME,
    budget INTEGER,
    points_spent INTEGER NOT NULL DEFAULT 0,
    token_budget INTEGER,
    tokens_spent INTEGER NOT NULL DEFAULT 0,
    limbo BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS team_invitations (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    team_id VARCHAR(36) NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(6) NOT NULL DEFAULT 'MEMBER',
    token VARCHAR(64) NOT NULL,
    invited_by_id VARCHAR(36) NOT NULL REFERENCES users(id),
    status VARCHAR(8) NOT NULL DEFAULT 'PENDING',
    created_at DATETIME NOT NULL,
    expires_at DATETIME NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_team_invitations_email ON team_invitations (email);
CREATE UNIQUE INDEX IF NOT EXISTS ix_team_invitations_token ON team_invitations (token);

CREATE TABLE IF NOT EXISTS team_members (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    team_id VARCHAR(36) NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(6) NOT NULL DEFAULT 'MEMBER',
    joined_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS api_keys (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_prefix VARCHAR(12) NOT NULL,
    key_hash VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    last_used_at DATETIME,
    expires_at DATETIME,
    is_active BOOLEAN NOT NULL DEFAULT 1,
    agent_user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS ix_api_keys_key_prefix ON api_keys (key_prefix);
CREATE INDEX IF NOT EXISTS ix_api_keys_user_id ON api_keys (user_id);

CREATE TABLE IF NOT EXISTS documents (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    team_id VARCHAR(36) NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    author_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_id VARCHAR(36) REFERENCES projects(id) ON DELETE SET NULL,
    sprint_id VARCHAR(36) REFERENCES sprints(id) ON DELETE SET NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT,
    icon VARCHAR(50),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS issues (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    project_id VARCHAR(36) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    identifier VARCHAR(20) NOT NULL,
    number INTEGER NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    status VARCHAR(11) NOT NULL DEFAULT 'BACKLOG',
    priority VARCHAR(11) NOT NULL DEFAULT 'NO_PRIORITY',
    issue_type VARCHAR(9) NOT NULL DEFAULT 'TASK',
    estimate INTEGER,
    assignee_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    creator_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sprint_id VARCHAR(36) REFERENCES sprints(id) ON DELETE SET NULL,
    parent_id VARCHAR(36) REFERENCES issues(id) ON DELETE SET NULL,
    due_date DATETIME,
    completed_at DATETIME,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS ix_issues_identifier ON issues (identifier);

CREATE TABLE IF NOT EXISTS ritual_groups (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    project_id VARCHAR(36) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    selection_mode VARCHAR(11) NOT NULL DEFAULT 'ALL',
    last_selected_ritual_id VARCHAR(36),
    created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS rituals (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    project_id VARCHAR(36) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    prompt TEXT NOT NULL,
    "trigger" VARCHAR(12) NOT NULL,
    approval_mode VARCHAR(6) NOT NULL DEFAULT 'NONE',
    note_required BOOLEAN NOT NULL DEFAULT 0,
    conditions TEXT,
    group_id VARCHAR(36) REFERENCES ritual_groups(id) ON DELETE SET NULL,
    weight FLOAT NOT NULL DEFAULT 1.0,
    percentage FLOAT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS budget_transactions (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    sprint_id VARCHAR(36) NOT NULL REFERENCES sprints(id) ON DELETE CASCADE,
    issue_id VARCHAR(36) REFERENCES issues(id) ON DELETE SET NULL,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    points INTEGER NOT NULL,
    tokens INTEGER,
    created_at DATETIME NOT NULL,
    issue_identifier VARCHAR(20) NOT NULL,
    issue_title VARCHAR(500) NOT NULL,
    sprint_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS document_activities (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    document_id VARCHAR(36) REFERENCES documents(id) ON DELETE CASCADE,
    team_id VARCHAR(36) NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(9) NOT NULL,
    document_title VARCHAR(500),
    document_icon VARCHAR(50),
    created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS document_comments (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    document_id VARCHAR(36) NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    author_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS document_issues (
    document_id VARCHAR(36) NOT NULL,
    issue_id VARCHAR(36) NOT NULL,
    created_at DATETIME,
    PRIMARY KEY (document_id, issue_id),
    FOREIGN KEY(document_id) REFERENCES documents(id) ON DELETE CASCADE,
    FOREIGN KEY(issue_id) REFERENCES issues(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS document_labels (
    document_id VARCHAR(36) NOT NULL,
    label_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (document_id, label_id),
    FOREIGN KEY(document_id) REFERENCES documents(id) ON DELETE CASCADE,
    FOREIGN KEY(label_id) REFERENCES labels(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS issue_activities (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    issue_id VARCHAR(36) NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(19) NOT NULL,
    field_name VARCHAR(50),
    old_value VARCHAR(500),
    new_value VARCHAR(500),
    created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS issue_comments (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    issue_id VARCHAR(36) NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
    author_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS issue_labels (
    issue_id VARCHAR(36) NOT NULL,
    label_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (issue_id, label_id),
    FOREIGN KEY(issue_id) REFERENCES issues(id) ON DELETE CASCADE,
    FOREIGN KEY(label_id) REFERENCES labels(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS issue_relations (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    issue_id VARCHAR(36) NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
    related_issue_id VARCHAR(36) NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
    relation_type VARCHAR(10) NOT NULL DEFAULT 'RELATES_TO',
    created_at DATETIME NOT NULL,
    CONSTRAINT uq_issue_relation UNIQUE (issue_id, related_issue_id)
);

CREATE TABLE IF NOT EXISTS ticket_limbo (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    issue_id VARCHAR(36) NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
    ritual_id VARCHAR(36) NOT NULL REFERENCES rituals(id) ON DELETE CASCADE,
    limbo_type VARCHAR(5) NOT NULL,
    requested_by_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    requested_at DATETIME NOT NULL,
    cleared_at DATETIME,
    cleared_by_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS ritual_attestations (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    ritual_id VARCHAR(36) NOT NULL REFERENCES rituals(id) ON DELETE CASCADE,
    sprint_id VARCHAR(36) REFERENCES sprints(id) ON DELETE CASCADE,
    issue_id VARCHAR(36) REFERENCES issues(id) ON DELETE CASCADE,
    attested_by VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    attested_at DATETIME NOT NULL,
    note TEXT,
    approved_by VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    approved_at DATETIME
);

CREATE TABLE IF NOT EXISTS oxyde_migrations (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    applied_at TIMESTAMP NOT NULL
);
"""


@pytest_asyncio.fixture
async def db(tmp_path):
    """Initialize Oxyde with a fresh temp database for each test.

    Yields None (kept as a fixture param for test signatures that
    reference 'db' even though Oxyde manages connections globally).
    """
    db_path = str(tmp_path / "test.db")
    db_url = f"sqlite:///{db_path}"

    # Set env var so get_settings() picks it up for any code that reads it
    os.environ["DATABASE_URL"] = f"sqlite+aiosqlite:///{db_path}"

    # Clear the cached settings so the new DATABASE_URL is picked up
    from app.config import get_settings
    get_settings.cache_clear()

    from oxyde import AsyncDatabase, execute_raw, disconnect_all

    _db = AsyncDatabase(db_url, overwrite=True)
    await _db.connect()

    # Import models so they register with Oxyde
    import app.oxyde_models  # noqa: F401

    # Create all tables using the schema SQL
    for statement in _SCHEMA_SQL.split(";"):
        statement = statement.strip()
        if statement:
            await execute_raw(statement, [])

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
