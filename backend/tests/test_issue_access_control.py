"""Tests for access control on issue list paths (CHT-269).

Tests sprint_id path (404 for missing sprint, 403 for unauthorized, success
for authorized), assignee_id path (scoped to user teams, empty result for
no teams), and filter pass-through on assignee path.
"""
import pytest
import pytest_asyncio
from app.oxyde_models.issue import OxydeIssue
from app.oxyde_models.label import OxydeLabel
from app.oxyde_models.sprint import OxydeSprint
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.user import OxydeUser
from app.enums import IssueStatus, IssuePriority, SprintStatus, TeamRole
from app.utils.security import get_password_hash, create_access_token


# ─────────────────────────────────────────────────────────────────────
# Additional fixtures for multi-team scenarios
# ─────────────────────────────────────────────────────────────────────

@pytest_asyncio.fixture
async def other_team(db):
    """Create a second team that test_user is NOT a member of."""
    team = await OxydeTeam.objects.create(name="Other Team", key="OTHER", description="Another team")
    return team


@pytest_asyncio.fixture
async def other_user(db, other_team):
    """Create a user on the other team."""
    user = await OxydeUser.objects.create(
        email="other@example.com",
        hashed_password=get_password_hash("testpassword123"),
        name="Other User",
    )
    member = await OxydeTeamMember.objects.create(team_id=other_team.id, user_id=user.id, role=TeamRole.OWNER)
    return user


@pytest_asyncio.fixture
async def other_project(db, other_team):
    """Create a project on the other team."""
    project = await OxydeProject.objects.create(
        team_id=other_team.id, name="Other Project", key="OTH",
        description="Other project", color="#ff0000",
    )
    return project


@pytest_asyncio.fixture
async def other_sprint(db, other_project):
    """Create a sprint on the other team's project."""
    sprint = await OxydeSprint.objects.create(
        project_id=other_project.id, name="Other Sprint",
        status=SprintStatus.ACTIVE,
    )
    return sprint


# ─────────────────────────────────────────────────────────────────────
# Sprint path access control
# ─────────────────────────────────────────────────────────────────────

class TestSprintPathAccessControl:
    """Tests for GET /issues?sprint_id=..."""

    @pytest.mark.asyncio
    async def test_sprint_path_404_missing_sprint(self, client, auth_headers):
        """Non-existent sprint_id returns 404."""
        response = await client.get(
            "/api/issues?sprint_id=00000000-0000-0000-0000-000000000000",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "Sprint not found" in response.json()["detail"]

    @pytest.mark.asyncio
    async def test_sprint_path_403_unauthorized(
        self, client, auth_headers, other_sprint
    ):
        """Sprint on another team returns 403."""
        response = await client.get(
            f"/api/issues?sprint_id={other_sprint.id}",
            headers=auth_headers,
        )
        assert response.status_code == 403
        assert "Not authorized" in response.json()["detail"]

    @pytest.mark.asyncio
    async def test_sprint_path_success_authorized(
        self, client, auth_headers, test_project, test_user, test_sprint, db
    ):
        """Sprint on user's team returns issues."""
        # Create an issue in the sprint
        test_project.issue_count += 1
        issue = await OxydeIssue.objects.create(
            project_id=test_project.id,
            identifier=f"{test_project.key}-{test_project.issue_count}",
            number=test_project.issue_count,
            title="Sprint Issue",
            sprint_id=test_sprint.id,
            creator_id=test_user.id,
        )

        response = await client.get(
            f"/api/issues?sprint_id={test_sprint.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        issues = response.json()
        assert len(issues) == 1
        assert issues[0]["title"] == "Sprint Issue"

    @pytest.mark.asyncio
    async def test_sprint_path_empty_sprint(
        self, client, auth_headers, test_sprint
    ):
        """Empty sprint returns empty list."""
        response = await client.get(
            f"/api/issues?sprint_id={test_sprint.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert response.json() == []


# ─────────────────────────────────────────────────────────────────────
# Assignee path access control
# ─────────────────────────────────────────────────────────────────────

class TestAssigneePathAccessControl:
    """Tests for GET /issues?assignee_id=..."""

    @pytest.mark.asyncio
    async def test_assignee_path_scoped_to_user_teams(
        self, client, auth_headers, test_project, test_user, other_project,
        other_user, db
    ):
        """Assignee path only returns issues from user's teams."""
        # Create issue assigned to test_user on their team
        test_project.issue_count += 1
        own_issue = await OxydeIssue.objects.create(
            project_id=test_project.id,
            identifier=f"{test_project.key}-{test_project.issue_count}",
            number=test_project.issue_count,
            title="Own Team Issue",
            assignee_id=test_user.id,
            creator_id=test_user.id,
        )

        # Create issue assigned to test_user but on OTHER team's project
        other_project.issue_count = (other_project.issue_count or 0) + 1
        other_issue = await OxydeIssue.objects.create(
            project_id=other_project.id,
            identifier=f"{other_project.key}-{other_project.issue_count}",
            number=other_project.issue_count,
            title="Other Team Issue",
            assignee_id=test_user.id,
            creator_id=other_user.id,
        )

        response = await client.get(
            f"/api/issues?assignee_id={test_user.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        issues = response.json()
        # Should only see issue from own team
        titles = [i["title"] for i in issues]
        assert "Own Team Issue" in titles
        assert "Other Team Issue" not in titles

    @pytest.mark.asyncio
    async def test_assignee_path_no_results_for_other_team_user(
        self, client, auth_headers, other_project, other_user, db
    ):
        """Querying assignee on another team returns empty (scoped to caller's teams)."""
        other_project.issue_count = (other_project.issue_count or 0) + 1
        issue = await OxydeIssue.objects.create(
            project_id=other_project.id,
            identifier=f"{other_project.key}-{other_project.issue_count}",
            number=other_project.issue_count,
            title="Other User Issue",
            assignee_id=other_user.id,
            creator_id=other_user.id,
        )

        response = await client.get(
            f"/api/issues?assignee_id={other_user.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        # Even though issues exist, they're on a team the caller can't see
        assert response.json() == []

    @pytest.mark.asyncio
    async def test_assignee_path_with_status_filter(
        self, client, auth_headers, test_project, test_user, db
    ):
        """Status filter works on assignee path."""
        for i, status in enumerate(["backlog", "todo", "in_progress"]):
            test_project.issue_count += 1
            issue = await OxydeIssue.objects.create(
                project_id=test_project.id,
                identifier=f"{test_project.key}-{test_project.issue_count}",
                number=test_project.issue_count,
                title=f"Issue {status}",
                status=IssueStatus(status),
                assignee_id=test_user.id,
                creator_id=test_user.id,
            )

        response = await client.get(
            f"/api/issues?assignee_id={test_user.id}&status=todo",
            headers=auth_headers,
        )
        assert response.status_code == 200
        issues = response.json()
        assert len(issues) == 1
        assert issues[0]["status"] == "todo"

    @pytest.mark.asyncio
    async def test_assignee_path_with_priority_filter(
        self, client, auth_headers, test_project, test_user, db
    ):
        """Priority filter works on assignee path."""
        for priority in ["low", "high", "urgent"]:
            test_project.issue_count += 1
            issue = await OxydeIssue.objects.create(
                project_id=test_project.id,
                identifier=f"{test_project.key}-{test_project.issue_count}",
                number=test_project.issue_count,
                title=f"Issue {priority}",
                priority=IssuePriority(priority),
                assignee_id=test_user.id,
                creator_id=test_user.id,
            )

        response = await client.get(
            f"/api/issues?assignee_id={test_user.id}&priority=urgent",
            headers=auth_headers,
        )
        assert response.status_code == 200
        issues = response.json()
        assert len(issues) == 1
        assert issues[0]["priority"] == "urgent"


# ─────────────────────────────────────────────────────────────────────
# Project path access control
# ─────────────────────────────────────────────────────────────────────

class TestProjectPathAccessControl:
    """Tests for GET /issues?project_id=..."""

    @pytest.mark.asyncio
    async def test_project_path_404_missing_project(self, client, auth_headers):
        """Non-existent project_id returns 404."""
        response = await client.get(
            "/api/issues?project_id=00000000-0000-0000-0000-000000000000",
            headers=auth_headers,
        )
        assert response.status_code == 404

    @pytest.mark.asyncio
    async def test_project_path_403_unauthorized(
        self, client, auth_headers, other_project
    ):
        """Project on another team returns 403."""
        response = await client.get(
            f"/api/issues?project_id={other_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 403

    @pytest.mark.asyncio
    async def test_project_path_success(
        self, client, auth_headers, test_project, test_user, db
    ):
        """Project on user's team returns issues."""
        test_project.issue_count += 1
        issue = await OxydeIssue.objects.create(
            project_id=test_project.id,
            identifier=f"{test_project.key}-{test_project.issue_count}",
            number=test_project.issue_count,
            title="Project Issue",
            creator_id=test_user.id,
        )

        response = await client.get(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert len(response.json()) >= 1


# ─────────────────────────────────────────────────────────────────────
# No-scope error
# ─────────────────────────────────────────────────────────────────────

class TestNoScopeError:
    """Tests for missing scope parameter."""

    @pytest.mark.asyncio
    async def test_no_scope_returns_400(self, client, auth_headers):
        """No project_id/team_id/sprint_id/assignee_id returns 400."""
        response = await client.get(
            "/api/issues",
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert "Must provide" in response.json()["detail"]


# ─────────────────────────────────────────────────────────────────────
# Label team validation (CHT-296)
# ─────────────────────────────────────────────────────────────────────

class TestLabelTeamValidation:
    """Tests that label_ids on create/update are validated for team membership."""

    @pytest_asyncio.fixture
    async def other_team_label(self, db, other_team):
        """Create a label on the other team."""
        from app.oxyde_models.label import OxydeLabel
        label = await OxydeLabel.objects.create(team_id=other_team.id, name="Foreign", color="#ff0000")
        return label

    @pytest.mark.asyncio
    async def test_create_with_nonexistent_label_fails(
        self, client, auth_headers, test_project
    ):
        """Creating issue with nonexistent label_id returns 400."""
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={"title": "Test", "label_ids": ["00000000-0000-0000-0000-000000000006"]},
        )
        assert response.status_code == 400
        assert "not found" in response.json()["detail"].lower()

    @pytest.mark.asyncio
    async def test_create_with_other_team_label_fails(
        self, client, auth_headers, test_project, other_team_label
    ):
        """Creating issue with label from another team returns 400."""
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={"title": "Test", "label_ids": [other_team_label.id]},
        )
        assert response.status_code == 400
        assert "does not belong" in response.json()["detail"].lower()

    @pytest.mark.asyncio
    async def test_create_with_own_team_label_succeeds(
        self, client, auth_headers, test_project, test_label
    ):
        """Creating issue with label from own team succeeds."""
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={"title": "Test", "label_ids": [test_label.id]},
        )
        assert response.status_code == 201
        data = response.json()
        assert len(data["labels"]) == 1
        assert data["labels"][0]["id"] == test_label.id

    @pytest.mark.asyncio
    async def test_update_with_other_team_label_fails(
        self, client, auth_headers, test_project, test_user, other_team_label, db
    ):
        """Updating issue with label from another team returns 400."""
        test_project.issue_count += 1
        issue = await OxydeIssue.objects.create(
            project_id=test_project.id,
            identifier=f"{test_project.key}-{test_project.issue_count}",
            number=test_project.issue_count,
            title="Existing Issue",
            creator_id=test_user.id,
        )

        response = await client.patch(
            f"/api/issues/{issue.id}",
            headers=auth_headers,
            json={"label_ids": [other_team_label.id]},
        )
        assert response.status_code == 400
        assert "does not belong" in response.json()["detail"].lower()
