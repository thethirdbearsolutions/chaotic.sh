"""Tests for issue creation/update validation edge cases (CHT-886).

Covers uncovered lines in issues.py: _validate_assignee, _validate_sprint,
_validate_parent, and create_issue error paths. All via HTTP client.
"""
import pytest
import pytest_asyncio
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.sprint import OxydeSprint
from app.oxyde_models.user import OxydeUser
from app.enums import TeamRole
from app.utils.security import get_password_hash, create_access_token


@pytest_asyncio.fixture
async def other_team(db):
    """A second team that test_user is NOT a member of."""
    team = await OxydeTeam.objects.create(name="Validation Team", key="VAL", description="For validation tests")
    return team


@pytest_asyncio.fixture
async def non_member_user(db, other_team):
    """User on other_team, not on test_team."""
    user = await OxydeUser.objects.create(
        email="nonmember@example.com",
        hashed_password=get_password_hash("testpassword123"),
        name="Non Member",
    )
    member = await OxydeTeamMember.objects.create(team_id=other_team.id, user_id=user.id, role=TeamRole.OWNER)
    return user


@pytest_asyncio.fixture
async def second_project(db, test_team):
    """A second project in test_team."""
    project = await OxydeProject.objects.create(
        team_id=test_team.id,
        name="Second Project",
        key="SEC",
        description="Second project",
        color="#00ff00",
    )
    return project


@pytest.mark.asyncio
class TestAssigneeValidation:
    """Test _validate_assignee paths."""

    async def test_create_issue_with_nonexistent_assignee(
        self, client, auth_headers, test_project
    ):
        """Assigning to nonexistent user returns 400."""
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={
                "title": "Test issue",
                "assignee_id": "00000000-0000-0000-0000-00000000000c",
            },
        )
        assert response.status_code == 400
        assert "Assignee not found" in response.json()["detail"]

    async def test_create_issue_with_non_member_assignee(
        self, client, auth_headers, test_project, non_member_user
    ):
        """Assigning to user not on the team returns 400."""
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={
                "title": "Test issue",
                "assignee_id": non_member_user.id,
            },
        )
        assert response.status_code == 400
        assert "Assignee is not a member" in response.json()["detail"]


@pytest.mark.asyncio
class TestSprintValidation:
    """Test _validate_sprint paths."""

    async def test_create_issue_with_nonexistent_sprint(
        self, client, auth_headers, test_project
    ):
        """Creating issue with nonexistent sprint returns 400."""
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={
                "title": "Test issue",
                "sprint_id": "00000000-0000-0000-0000-000000000009",
            },
        )
        assert response.status_code == 400
        assert "Sprint not found" in response.json()["detail"]

    async def test_create_issue_with_cross_project_sprint(
        self, client, auth_headers, test_project, db, second_project
    ):
        """Creating issue with sprint from different project returns 400."""
        sprint = await OxydeSprint.objects.create(
            project_id=second_project.id,
            name="Wrong Sprint",
        )

        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={
                "title": "Test issue",
                "sprint_id": sprint.id,
            },
        )
        assert response.status_code == 400
        assert "Sprint does not belong to this project" in response.json()["detail"]


@pytest.mark.asyncio
class TestParentValidation:
    """Test _validate_parent paths."""

    async def test_create_issue_with_nonexistent_parent(
        self, client, auth_headers, test_project
    ):
        """Creating issue with nonexistent parent returns 400."""
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={
                "title": "Test issue",
                "parent_id": "00000000-0000-0000-0000-000000000007",
            },
        )
        assert response.status_code == 400
        assert "Parent issue not found" in response.json()["detail"]

    async def test_create_issue_with_cross_project_parent(
        self, client, auth_headers, test_project, db, second_project, test_user
    ):
        """Creating issue with parent from different project returns 400."""
        from app.oxyde_models.issue import OxydeIssue
        second_project.issue_count += 1
        parent = await OxydeIssue.objects.create(
            project_id=second_project.id,
            identifier=f"{second_project.key}-{second_project.issue_count}",
            number=second_project.issue_count,
            title="Parent in other project",
            creator_id=test_user.id,
        )

        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={
                "title": "Child issue",
                "parent_id": parent.id,
            },
        )
        assert response.status_code == 400
        assert "Parent issue does not belong to this project" in response.json()["detail"]

    async def test_update_issue_self_parent(
        self, client, auth_headers, test_issue, test_project
    ):
        """Setting issue as its own parent returns 400."""
        response = await client.patch(
            f"/api/issues/{test_issue.id}?project_id={test_project.id}",
            headers=auth_headers,
            json={
                "parent_id": test_issue.id,
            },
        )
        assert response.status_code == 400
        assert "cannot be its own parent" in response.json()["detail"]


@pytest.mark.asyncio
class TestUpdateIssueValidation:
    """Test validation on the update (PATCH) path."""

    async def test_update_issue_with_cross_project_sprint(
        self, client, auth_headers, test_issue, test_project, db, second_project
    ):
        """Updating issue with sprint from different project returns 400."""
        sprint = await OxydeSprint.objects.create(
            project_id=second_project.id,
            name="Wrong Sprint",
        )

        response = await client.patch(
            f"/api/issues/{test_issue.id}?project_id={test_project.id}",
            headers=auth_headers,
            json={"sprint_id": sprint.id},
        )
        assert response.status_code == 400
        assert "Sprint does not belong to this project" in response.json()["detail"]

    async def test_update_issue_with_non_member_assignee(
        self, client, auth_headers, test_issue, test_project, non_member_user
    ):
        """Updating issue with assignee not on team returns 400."""
        response = await client.patch(
            f"/api/issues/{test_issue.id}?project_id={test_project.id}",
            headers=auth_headers,
            json={"assignee_id": non_member_user.id},
        )
        assert response.status_code == 400
        assert "Assignee is not a member" in response.json()["detail"]

    async def test_get_issue_unauthenticated(self, client, test_issue):
        """GET /issues/{id} returns 401 without auth headers."""
        response = await client.get(f"/api/issues/{test_issue.id}")
        assert response.status_code == 401
