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
from app.utils.security import get_password_hash


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
            f"/api/projects/{test_project.id}/issues",
            headers=auth_headers,
            json={
                "title": "Test issue",
                "assignee_id": "00000000-0000-0000-0000-00000000000c",
            },
        )
        assert response.status_code == 400
        assert "Assignee not found" in response.json()["detail"]

    async def test_an_empty_assignee_id_is_not_found(self, client, auth_headers, test_project, test_issue):
        """An empty string names no one: the missing user's 400, not the
        users foreign key's 500 (CHT-1829)."""
        created = await client.post(
            f"/api/projects/{test_project.id}/issues", headers=auth_headers,
            json={"title": "Test issue", "assignee_id": ""},
        )
        updated = await client.patch(f"/api/issues/{test_issue.id}", headers=auth_headers, json={"assignee_id": ""})
        for response in (created, updated):
            assert (response.status_code, response.json()) == (400, {"detail": "Assignee not found"})

    async def test_create_issue_with_non_member_assignee(
        self, client, auth_headers, test_project, non_member_user
    ):
        """Assigning to user not on the team returns the missing user's 400."""
        response = await client.post(
            f"/api/projects/{test_project.id}/issues",
            headers=auth_headers,
            json={
                "title": "Test issue",
                "assignee_id": non_member_user.id,
            },
        )
        assert response.status_code == 400
        # Answered like a missing user: someone outside the team is not
        # confirmed to exist (CHT-1819).
        assert response.json()["detail"] == "Assignee not found"


@pytest.mark.asyncio
class TestSprintValidation:
    """Test _validate_sprint paths."""

    async def test_create_issue_with_nonexistent_sprint(
        self, client, auth_headers, test_project
    ):
        """Creating issue with nonexistent sprint returns 400."""
        response = await client.post(
            f"/api/projects/{test_project.id}/issues",
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
            f"/api/projects/{test_project.id}/issues",
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
            f"/api/projects/{test_project.id}/issues",
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
            f"/api/projects/{test_project.id}/issues",
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
        """Updating issue with assignee not on team returns the missing user's 400."""
        response = await client.patch(
            f"/api/issues/{test_issue.id}?project_id={test_project.id}",
            headers=auth_headers,
            json={"assignee_id": non_member_user.id},
        )
        assert response.status_code == 400
        # Answered like a missing user: someone outside the team is not
        # confirmed to exist (CHT-1819).
        assert response.json()["detail"] == "Assignee not found"

    async def test_get_issue_unauthenticated(self, client, test_issue):
        """GET /issues/{id} returns 401 without auth headers."""
        response = await client.get(f"/api/issues/{test_issue.id}")
        assert response.status_code == 401


@pytest.mark.asyncio
class TestAssigneeCompareAndSet:
    """An update that writes assignee_id is conditional on the assignee it
    read (CHT-1832). The API validates the new assignee, or exempts the
    current one re-sent unchanged, against that read; a write that is not
    conditional on it lets a stale client put back an assignee another
    request has just changed or removed."""

    async def _activities(self, issue_id):
        from app.oxyde_models.issue import OxydeIssueActivity
        return await OxydeIssueActivity.objects.filter(issue_id=issue_id).all()

    async def test_stale_resend_of_a_removed_assignee_is_refused(
        self, db, test_issue, test_user,
    ):
        from app.schemas.issue import IssueUpdate
        from app.services.issue_service import IssueService, AssigneeChangedError

        service = IssueService()
        await service.update(
            await service.get_by_id(test_issue.id), IssueUpdate(assignee_id=test_user.id),
            user_id=test_user.id,
        )
        # The stale request has read the issue with test_user assigned...
        stale = await service.get_by_id(test_issue.id)
        # ...then an admin unassigns it before the stale write lands.
        await service.update(
            await service.get_by_id(test_issue.id), IssueUpdate(assignee_id=None),
            user_id=test_user.id,
        )
        before = len(await self._activities(test_issue.id))

        with pytest.raises(AssigneeChangedError) as exc_info:
            await service.update(
                stale, IssueUpdate(title="Renamed", assignee_id=test_user.id),
                user_id=test_user.id,
            )
        assert exc_info.value.assignee_id is None

        final = await service.get_by_id(test_issue.id)
        assert final.assignee_id is None
        # The whole update rolled back, not just the assignee.
        assert final.title == test_issue.title
        assert len(await self._activities(test_issue.id)) == before

    async def test_stale_unassign_does_not_undo_a_reassignment(
        self, db, test_issue, test_user,
    ):
        from app.schemas.issue import IssueUpdate
        from app.services.issue_service import IssueService, AssigneeChangedError

        service = IssueService()
        stale = await service.get_by_id(test_issue.id)
        assert stale.assignee_id != test_user.id
        await service.update(
            await service.get_by_id(test_issue.id), IssueUpdate(assignee_id=test_user.id),
            user_id=test_user.id,
        )
        with pytest.raises(AssigneeChangedError) as exc_info:
            await service.update(stale, IssueUpdate(assignee_id=None), user_id=test_user.id)
        assert exc_info.value.assignee_id == test_user.id
        assert (await service.get_by_id(test_issue.id)).assignee_id == test_user.id

    async def test_api_answers_a_lost_race_with_409(
        self, client, auth_headers, test_issue, test_user, monkeypatch,
    ):
        """The whole row re-sent with the current assignee, while another
        request removes that assignee between the read and the write."""
        from app.api import issues as issues_api
        from app.oxyde_models.issue import OxydeIssue

        await OxydeIssue.objects.filter(id=test_issue.id).update(assignee_id=test_user.id)
        real_validate = issues_api._validate_assignee

        async def validate_then_race(*args, **kwargs):
            await real_validate(*args, **kwargs)
            await OxydeIssue.objects.filter(id=test_issue.id).update(assignee_id=None)

        monkeypatch.setattr(issues_api, "_validate_assignee", validate_then_race)

        response = await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
            json={"title": "Renamed", "assignee_id": test_user.id},
        )
        assert response.status_code == 409
        detail = response.json()["detail"]
        assert detail["error_code"] == "assignee_changed"
        assert detail["issue_id"] == test_issue.id
        assert detail["assignee_id"] is None

        final = await OxydeIssue.objects.get(id=test_issue.id)
        assert final.assignee_id is None
        assert final.title == test_issue.title

    async def test_resend_without_a_race_still_succeeds(
        self, client, auth_headers, test_issue, test_user,
    ):
        from app.oxyde_models.issue import OxydeIssue

        await OxydeIssue.objects.filter(id=test_issue.id).update(assignee_id=test_user.id)
        response = await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
            json={"title": "Renamed", "assignee_id": test_user.id},
        )
        assert response.status_code == 200
        assert response.json()["assignee_id"] == test_user.id
        assert response.json()["title"] == "Renamed"
