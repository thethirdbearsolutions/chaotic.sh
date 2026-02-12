"""Test configuration and fixtures."""
import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

from app.main import app
from app.database import Base, get_db
from app.models import User, Team, TeamMember, Project, Issue, Sprint, Document, Label
from app.utils.security import get_password_hash, create_access_token
from app.models.team import TeamRole

# Test database
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"


@pytest_asyncio.fixture
async def engine():
    """Create test database engine."""
    engine = create_async_engine(TEST_DATABASE_URL, echo=False)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield engine
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    await engine.dispose()


@pytest_asyncio.fixture
async def db_session(engine):
    """Create test database session."""
    session_maker = async_sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with session_maker() as session:
        yield session


@pytest_asyncio.fixture
async def client(db_session):
    """Create test HTTP client."""
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def test_user(db_session):
    """Create test user."""
    user = User(
        email="test@example.com",
        hashed_password=get_password_hash("testpassword123"),
        name="Test User",
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest_asyncio.fixture
async def test_user2(db_session):
    """Create second test user."""
    user = User(
        email="test2@example.com",
        hashed_password=get_password_hash("testpassword123"),
        name="Test User 2",
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
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
async def test_team(db_session, test_user):
    """Create test team."""
    team = Team(name="Test Team", key="TEST", description="A test team")
    db_session.add(team)
    await db_session.flush()

    member = TeamMember(team_id=team.id, user_id=test_user.id, role=TeamRole.OWNER)
    db_session.add(member)
    await db_session.commit()
    await db_session.refresh(team)
    return team


@pytest_asyncio.fixture
async def test_project(db_session, test_team):
    """Create test project."""
    project = Project(
        team_id=test_team.id,
        name="Test Project",
        key="PROJ",
        description="A test project",
        color="#6366f1",
    )
    db_session.add(project)
    await db_session.commit()
    await db_session.refresh(project)
    return project


@pytest_asyncio.fixture
async def test_issue(db_session, test_project, test_user):
    """Create test issue."""
    project = test_project
    project.issue_count += 1

    issue = Issue(
        project_id=project.id,
        identifier=f"{project.key}-{project.issue_count}",
        number=project.issue_count,
        title="Test Issue",
        description="A test issue",
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)
    return issue


@pytest_asyncio.fixture
async def test_sprint(db_session, test_project):
    """Create test sprint."""
    sprint = Sprint(
        project_id=test_project.id,
        name="Sprint 1",
        description="First sprint",
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)
    return sprint


@pytest_asyncio.fixture
async def test_document(db_session, test_team, test_user):
    """Create test document."""
    document = Document(
        team_id=test_team.id,
        author_id=test_user.id,
        title="Test Document",
        content="Test content",
    )
    db_session.add(document)
    await db_session.commit()
    await db_session.refresh(document)
    return document


@pytest_asyncio.fixture
async def test_label(db_session, test_team):
    """Create test label."""
    label = Label(
        team_id=test_team.id,
        name="Bug",
        color="#f85149",
        description="Bug label",
    )
    db_session.add(label)
    await db_session.commit()
    await db_session.refresh(label)
    return label
