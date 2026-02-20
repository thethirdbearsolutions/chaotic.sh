"""Tests for service layer."""
import pytest
from app.services.user_service import UserService
from app.services.team_service import TeamService
from app.services.project_service import ProjectService
from app.services.issue_service import IssueService
from app.services.sprint_service import SprintService
from app.services.document_service import DocumentService
from app.schemas.user import UserCreate, UserUpdate
from app.schemas.team import TeamCreate, TeamUpdate, TeamInvitationCreate
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.schemas.issue import IssueCreate, IssueUpdate, IssueCommentCreate, LabelCreate
from app.schemas.sprint import SprintCreate, SprintUpdate
from app.schemas.document import DocumentCreate, DocumentUpdate
from app.enums import TeamRole, IssueStatus, IssuePriority


# User Service Tests
@pytest.mark.asyncio
async def test_user_service_create(db):
    """Test user creation via service."""
    service = UserService()
    user_in = UserCreate(
        name="Service User",
        email="service@example.com",
        password="password123",
    )
    user = await service.create(user_in)
    assert user.email == "service@example.com"
    assert user.name == "Service User"
    assert user.hashed_password != "password123"


@pytest.mark.asyncio
async def test_user_service_get_by_email(db, test_user):
    """Test getting user by email."""
    service = UserService()
    user = await service.get_by_email(test_user.email)
    assert user is not None
    assert user.id == test_user.id


@pytest.mark.asyncio
async def test_user_service_authenticate(db, test_user):
    """Test user authentication."""
    service = UserService()
    user = await service.authenticate(test_user.email, "testpassword123")
    assert user is not None
    assert user.id == test_user.id


@pytest.mark.asyncio
async def test_user_service_authenticate_wrong_password(db, test_user):
    """Test authentication with wrong password."""
    service = UserService()
    user = await service.authenticate(test_user.email, "wrongpassword")
    assert user is None


@pytest.mark.asyncio
async def test_user_service_update(db, test_user):
    """Test user update via service."""
    service = UserService()
    user_in = UserUpdate(name="Updated Service User")
    user = await service.update(test_user, user_in)
    assert user.name == "Updated Service User"


# Team Service Tests
@pytest.mark.asyncio
async def test_team_service_create(db, test_user):
    """Test team creation via service."""
    service = TeamService()
    team_in = TeamCreate(
        name="Service Team",
        key="SVCTEAM",
        description="Created by service",
    )
    team = await service.create(team_in, test_user)
    assert team.name == "Service Team"
    assert team.key == "SVCTEAM"


@pytest.mark.asyncio
async def test_team_service_get_user_teams(db, test_team, test_user):
    """Test getting user's teams."""
    service = TeamService()
    teams = await service.get_user_teams(test_user.id)
    assert len(teams) >= 1
    assert any(t.id == test_team.id for t in teams)


@pytest.mark.asyncio
async def test_team_service_is_team_admin(db, test_team, test_user):
    """Test checking if user is team admin."""
    service = TeamService()
    is_admin = await service.is_team_admin(test_team.id, test_user.id)
    assert is_admin is True


# Project Service Tests
@pytest.mark.asyncio
async def test_project_service_create(db, test_team):
    """Test project creation via service."""
    service = ProjectService()
    project_in = ProjectCreate(
        name="Service Project",
        key="SVCPROJ",
        color="#ff0000",
    )
    project = await service.create(project_in, test_team.id)
    assert project.name == "Service Project"
    assert project.key == "SVCPROJ"
    assert project.color == "#ff0000"


@pytest.mark.asyncio
async def test_project_service_list_by_team(db, test_team, test_project):
    """Test listing projects by team."""
    service = ProjectService()
    projects = await service.list_by_team(test_team.id)
    assert len(projects) >= 1
    assert any(p.id == test_project.id for p in projects)


# Issue Service Tests
@pytest.mark.asyncio
async def test_issue_service_create(db, test_project, test_user):
    """Test issue creation via service."""
    service = IssueService()
    issue_in = IssueCreate(
        title="Service Issue",
        description="Created by service",
        status=IssueStatus.TODO,
        priority=IssuePriority.HIGH,
        estimate=8,
    )
    issue = await service.create(issue_in, test_project, test_user.id)
    assert issue.title == "Service Issue"
    assert issue.status == IssueStatus.TODO
    assert issue.priority == IssuePriority.HIGH
    assert issue.estimate == 8


@pytest.mark.asyncio
async def test_issue_service_update_to_done(db, test_issue):
    """Test updating issue to done sets completed_at."""
    service = IssueService()
    issue_in = IssueUpdate(status=IssueStatus.DONE)
    issue = await service.update(test_issue, issue_in)
    assert issue.status == IssueStatus.DONE
    assert issue.completed_at is not None


@pytest.mark.asyncio
async def test_issue_service_create_comment(db, test_issue, test_user):
    """Test creating a comment."""
    service = IssueService()
    comment_in = IssueCommentCreate(content="Service comment")
    comment = await service.create_comment(test_issue.id, comment_in, test_user.id)
    assert comment.content == "Service comment"


@pytest.mark.asyncio
async def test_issue_service_create_label(db, test_team):
    """Test creating a label."""
    service = IssueService()
    label_in = LabelCreate(name="Service Label", color="#00ff00")
    label = await service.create_label(label_in, test_team.id)
    assert label.name == "Service Label"
    assert label.color == "#00ff00"


# Sprint Service Tests
@pytest.mark.asyncio
async def test_sprint_service_create(db, test_project):
    """Test sprint creation via service."""
    service = SprintService()
    sprint_in = SprintCreate(
        name="Service Sprint",
        description="Created by service",
    )
    sprint = await service.create(sprint_in, test_project.id)
    assert sprint.name == "Service Sprint"
    assert sprint.status.value == "planned"


# Note: Sprint lifecycle tests are in test_sprints.py (close_sprint, ensure_sprints_exist, etc.)
# Manual start_sprint/complete_sprint were removed in CHT-588 in favor of the cadence system.


# Document Service Tests
@pytest.mark.asyncio
async def test_document_service_create(db, test_team, test_user):
    """Test document creation via service."""
    service = DocumentService()
    doc_in = DocumentCreate(
        title="Service Doc",
        content="# Service Documentation",
        icon="📘",
    )
    doc = await service.create(doc_in, test_team.id, test_user.id)
    assert doc.title == "Service Doc"
    assert doc.content == "# Service Documentation"
    assert doc.icon == "📘"


@pytest.mark.asyncio
async def test_document_service_search(db, test_team, test_document):
    """Test document search."""
    service = DocumentService()
    docs = await service.search(test_team.id, "Test")
    assert len(docs) >= 1
    assert any(d.id == test_document.id for d in docs)
