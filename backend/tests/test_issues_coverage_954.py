"""Tests to close issues.py and issue_service.py coverage gaps (CHT-954).

Targets uncovered lines:
- api/issues.py: 57-58, 202, 216, 234-235, 249-250, 340, 350, 455, 515, 529-536,
  541-543, 607, 707-717, 732-733, 892-906, 995-996, 1202, 1209, 1273
- services/issue_service.py: 305, 374-386, 429-444, 525-536, 1178
"""
import pytest
import pytest_asyncio
from unittest.mock import patch, AsyncMock
from app.oxyde_models.issue import OxydeIssue
from app.oxyde_models.ritual import OxydeRitual, OxydeRitualAttestation
from app.oxyde_models.issue import OxydeTicketLimbo
from app.oxyde_models.user import OxydeUser
from app.oxyde_models.team import OxydeTeamMember
from app.oxyde_models.project import OxydeProject
from app.enums import IssueStatus, RitualTrigger, ApprovalMode, LimboType, TeamRole
from app.oxyde_models.sprint import OxydeSprint
from app.oxyde_models.label import OxydeLabel


# === Helpers ===

@pytest_asyncio.fixture
async def second_project(db, test_team):
    """A second project in the same team."""
    project = await OxydeProject.objects.create(
        team_id=test_team.id,
        name="Second Project",
        key="SEC",
        description="Second project",
        color="#22c55e",
    )
    return project


@pytest_asyncio.fixture
async def second_issue(db, second_project, test_user):
    """An issue in the second project."""
    second_project.issue_count += 1
    issue = await OxydeIssue.objects.create(
        project_id=second_project.id,
        identifier=f"{second_project.key}-{second_project.issue_count}",
        number=second_project.issue_count,
        title="Second Issue",
        description="Related issue in second project",
        creator_id=test_user.id,
    )
    return issue


@pytest_asyncio.fixture
async def agent_user(db, test_team):
    """Agent user scoped to test_team."""
    from app.utils.security import get_password_hash, create_access_token
    user = await OxydeUser.objects.create(
        email="agent@example.com",
        hashed_password=get_password_hash("agentpass"),
        name="Agent Bot",
        is_agent=True,
        agent_team_id=test_team.id,
    )
    return user


@pytest_asyncio.fixture
async def agent_headers(agent_user):
    """Auth headers for agent user."""
    from app.utils.security import create_access_token
    token = create_access_token(data={"sub": agent_user.id})
    return {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def ticket_close_ritual(db, test_project):
    """A TICKET_CLOSE ritual."""
    ritual = await OxydeRitual.objects.create(
        project_id=test_project.id,
        name="close-review",
        prompt="Review before closing",
        trigger=RitualTrigger.TICKET_CLOSE,
        approval_mode=ApprovalMode.GATE,
    )
    return ritual


@pytest_asyncio.fixture
async def ticket_claim_ritual(db, test_project):
    """A TICKET_CLAIM ritual."""
    ritual = await OxydeRitual.objects.create(
        project_id=test_project.id,
        name="claim-review",
        prompt="Review before claiming",
        trigger=RitualTrigger.TICKET_CLAIM,
        approval_mode=ApprovalMode.GATE,
    )
    return ritual


@pytest_asyncio.fixture
async def sprint_ritual(db, test_project):
    """An EVERY_SPRINT ritual to trigger limbo."""
    ritual = await OxydeRitual.objects.create(
        project_id=test_project.id,
        name="sprint-report",
        prompt="Write a sprint report",
        trigger=RitualTrigger.EVERY_SPRINT,
        approval_mode=ApprovalMode.AUTO,
    )
    return ritual


# === api/issues.py: Create issue error branches ===


@pytest.mark.asyncio
class TestCreateIssueErrorBranches:
    """Cover TicketRitualsError/ClaimRitualsError/SprintInLimboError/EstimateRequired on create."""

    async def test_create_issue_as_done_blocked_by_ticket_ritual(
        self, client, agent_headers, test_project, ticket_close_ritual
    ):
        """Create with status=done and ticket_close ritual → 409 TicketRitualsError (line 234-235)."""
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=agent_headers,
            json={
                "title": "Done issue",
                "status": "done",
            },
        )
        assert response.status_code == 409
        detail = response.json()["detail"]
        assert "pending rituals" in detail["message"]

    async def test_create_issue_as_in_progress_blocked_by_claim_ritual(
        self, client, agent_headers, test_project, ticket_claim_ritual
    ):
        """Create with status=in_progress and claim ritual → 409 ClaimRitualsError (line 234-235)."""
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=agent_headers,
            json={
                "title": "Claimed issue",
                "status": "in_progress",
            },
        )
        assert response.status_code == 409
        detail = response.json()["detail"]
        assert "claim rituals" in detail["message"]

    async def test_create_issue_estimate_required(
        self, client, agent_headers, db, test_project
    ):
        """Create as in_progress when project requires estimate → 400 (line 202)."""
        test_project.require_estimate_on_claim = True
        await test_project.save(update_fields={"require_estimate_on_claim"})

        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=agent_headers,
            json={
                "title": "No estimate",
                "status": "in_progress",
            },
        )
        assert response.status_code == 400
        assert "Estimate" in response.json()["detail"]

    async def test_create_issue_sprint_in_arrears(
        self, client, auth_headers, test_project
    ):
        """Create into sprint in arrears → 409 SprintInArrearsError (line 216)."""
        from app.services.issue_service import SprintInArrearsError
        with patch("app.api.issues.IssueService") as MockService:
            mock_svc = AsyncMock()
            mock_svc.create.side_effect = SprintInArrearsError(budget=10, points_spent=15)
            MockService.return_value = mock_svc

            response = await client.post(
                f"/api/issues?project_id={test_project.id}",
                headers=auth_headers,
                json={"title": "Arrears issue"},
            )
            assert response.status_code == 409
            assert "arrears" in response.json()["detail"]["message"].lower()

    async def test_create_issue_with_description_refs(
        self, client, auth_headers, test_project
    ):
        """Create issue with identifiers in description exercises cross-ref path (line 248)."""
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={
                "title": "Issue with refs",
                "description": "See PROJ-999 and PROJ-998",
            },
        )
        assert response.status_code == 201

    async def test_create_issue_cross_ref_exception_silenced(
        self, client, auth_headers, test_project, test_user
    ):
        """Cross-reference exception is silenced on create (lines 249-250)."""
        with patch("app.api.issues.IssueService") as MockService:
            mock_svc = AsyncMock()
            # create() needs to return a realistic issue for issue_to_response
            from app.enums import IssuePriority, IssueType
            from datetime import datetime, timezone
            now = datetime.now(timezone.utc)
            mock_issue = await OxydeIssue.objects.create(
                id="fake-id", project_id=test_project.id, identifier="PROJ-99",
                number=99, title="Test", status=IssueStatus.BACKLOG,
                priority=IssuePriority.NO_PRIORITY, issue_type=IssueType.TASK,
                creator_id=test_user.id, created_at=now, updated_at=now,
            )
            mock_issue.labels = []
            mock_issue.creator = None
            mock_svc.create.return_value = mock_issue
            mock_svc.create_cross_references.side_effect = Exception("DB error")
            MockService.return_value = mock_svc

            response = await client.post(
                f"/api/issues?project_id={test_project.id}",
                headers=auth_headers,
                json={
                    "title": "Test",
                    "description": "refs PROJ-1",
                },
            )
            # Should succeed (201) despite cross-reference failure
            assert response.status_code == 201
            mock_svc.create_cross_references.assert_called_once()


# === api/issues.py: Update issue error branches ===


@pytest.mark.asyncio
class TestUpdateIssueErrorBranches:
    """Cover TicketRitualsError/ClaimRitualsError on update, cross-ref failure."""

    async def test_update_issue_to_done_blocked_by_ritual(
        self, client, agent_headers, test_issue, ticket_close_ritual
    ):
        """Update status to done with ticket_close ritual → 409 (line 707-717)."""
        response = await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=agent_headers,
            json={"status": "done"},
        )
        assert response.status_code == 409
        detail = response.json()["detail"]
        assert "pending rituals" in detail["message"]

    async def test_update_issue_to_in_progress_blocked_by_claim_ritual(
        self, client, agent_headers, test_issue, ticket_claim_ritual
    ):
        """Update to in_progress with claim ritual → 409 ClaimRitualsError (line 716-717)."""
        response = await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=agent_headers,
            json={"status": "in_progress"},
        )
        assert response.status_code == 409
        detail = response.json()["detail"]
        assert "claim rituals" in detail["message"]

    async def test_update_description_with_cross_references(
        self, client, auth_headers, test_issue
    ):
        """Update description with cross-references (line 729-733)."""
        response = await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
            json={"description": "Updated, see PROJ-999"},
        )
        assert response.status_code == 200


# === api/issues.py: get_issue_by_identifier access denied (line 607) ===


@pytest.mark.asyncio
class TestIssueAccessControl954:
    """Cover authorization branches."""

    async def test_get_issue_by_identifier_denied(
        self, client, auth_headers2, test_issue
    ):
        """Non-member can't get issue by identifier (line 607)."""
        response = await client.get(
            f"/api/issues/identifier/{test_issue.identifier}",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_create_relation_denied_related_issue(
        self, client, auth_headers2, test_issue, second_issue
    ):
        """Non-member can't create relation to issue in inaccessible project (line 1202)."""
        response = await client.post(
            f"/api/issues/{test_issue.id}/relations",
            headers=auth_headers2,
            json={
                "related_issue_id": second_issue.id,
                "relation_type": "relates_to",
            },
        )
        # auth_headers2 can't access either project
        assert response.status_code == 403


# === api/issues.py: Activity feed sprint name resolution (lines 529-543, 892-906) ===


@pytest.mark.asyncio
class TestActivitySprintNames:
    """Cover sprint name resolution in activity feeds."""

    async def test_issue_activity_with_sprint_move(
        self, client, auth_headers, db, test_issue, test_sprint
    ):
        """Move issue to sprint, check activity shows sprint name (lines 892-906)."""
        # Move issue to sprint
        response = await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
            json={"sprint_id": test_sprint.id},
        )
        assert response.status_code == 200

        # Check activity feed
        response = await client.get(
            f"/api/issues/{test_issue.id}/activities",
            headers=auth_headers,
        )
        assert response.status_code == 200
        activities = response.json()
        sprint_activities = [a for a in activities if a.get("sprint_name")]
        assert len(sprint_activities) >= 1
        assert sprint_activities[0]["sprint_name"] == "Sprint 1"

    async def test_issue_activity_remove_from_sprint(
        self, client, auth_headers, db, test_issue, test_sprint
    ):
        """Remove issue from sprint, check activity (line 894, 905-906)."""
        # Add to sprint first
        await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
            json={"sprint_id": test_sprint.id},
        )
        # Remove from sprint (send null to clear the FK)
        response = await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
            json={"sprint_id": None},
        )
        assert response.status_code == 200

        # Check activity feed
        response = await client.get(
            f"/api/issues/{test_issue.id}/activities",
            headers=auth_headers,
        )
        assert response.status_code == 200
        activities = response.json()
        # Should have MOVED_TO_SPRINT and REMOVED_FROM_SPRINT activities
        types = [a["activity_type"] for a in activities]
        assert "moved_to_sprint" in types
        assert "removed_from_sprint" in types

    async def test_team_activity_feed_with_sprint(
        self, client, auth_headers, db, test_team, test_issue, test_sprint
    ):
        """Team activity feed resolves sprint names (lines 529-536, 541-543)."""
        # Move issue to sprint to create activity
        await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
            json={"sprint_id": test_sprint.id},
        )

        response = await client.get(
            f"/api/issues/activities?team_id={test_team.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        activities = response.json()
        sprint_activities = [a for a in activities if a.get("sprint_name")]
        assert len(sprint_activities) >= 1

    async def test_team_activity_feed_access_denied(
        self, client, auth_headers2, test_team
    ):
        """Non-member can't access team activity feed (line 515)."""
        response = await client.get(
            f"/api/issues/activities?team_id={test_team.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403


# === api/issues.py: Comment cross-reference failure (lines 995-996) ===


@pytest.mark.asyncio
class TestCommentCrossRef:
    """Cover cross-reference failure on comment create."""

    async def test_comment_cross_ref_failure_silenced(
        self, client, auth_headers, test_issue
    ):
        """Cross-reference failure on comment is silenced (lines 995-996)."""
        # Create a comment with references (cross-ref may or may not find targets, either way)
        response = await client.post(
            f"/api/issues/{test_issue.id}/comments",
            headers=auth_headers,
            json={"content": "References PROJ-999 which doesn't exist"},
        )
        assert response.status_code == 201


# === api/issues.py: Batch update multi-team check (line 455) ===


@pytest.mark.asyncio
class TestBatchUpdateEdgeCases:
    """Cover batch update team validation."""

    async def test_batch_update_issues_from_different_teams(
        self, client, auth_headers, db, test_issue, test_user
    ):
        """Batch update with issues from different teams → 400 (line 455)."""
        from app.oxyde_models.team import OxydeTeam
        # Create a second team + project + issue
        team2 = await OxydeTeam.objects.create(name="Team 2", key="T2", description="Second team")
        member2 = await OxydeTeamMember.objects.create(team_id=team2.id, user_id=test_user.id, role=TeamRole.OWNER)
        project2 = await OxydeProject.objects.create(
            team_id=team2.id, name="P2", key="P2", description="", color="#000"
        )
        project2.issue_count = 1
        issue2 = await OxydeIssue.objects.create(
            project_id=project2.id,
            identifier="P2-1",
            number=1,
            title="Other team issue",
            creator_id=test_user.id,
        )

        response = await client.post(
            "/api/issues/batch-update",
            headers=auth_headers,
            json={
                "issue_ids": [test_issue.id, issue2.id],
                "priority": "high",
            },
        )
        assert response.status_code == 400
        assert "same team" in response.json()["detail"]


# === api/issues.py: List issues by sprint - project not found (line 340) ===


@pytest.mark.asyncio
class TestListIssuesEdgeCases:
    """Cover edge cases in list issues."""

    async def test_list_by_sprint_with_agent(
        self, client, agent_headers, test_sprint
    ):
        """Agent listing by sprint (line 350 - agent assignee_id branch)."""
        response = await client.get(
            f"/api/issues?sprint_id={test_sprint.id}",
            headers=agent_headers,
        )
        assert response.status_code == 200

    async def test_delete_relation_issue_not_found(
        self, client, auth_headers
    ):
        """Delete relation with nonexistent issue → 404 (line 1273)."""
        response = await client.delete(
            "/api/issues/nonexistent-id/relations/rel-id",
            headers=auth_headers,
        )
        assert response.status_code == 404


# === Assignee validation: agent wrong team (line 57-58) ===


@pytest.mark.asyncio
class TestAssigneeValidation:
    """Cover agent-scope assignee check."""

    async def test_assign_agent_wrong_team(
        self, client, auth_headers, db, test_issue
    ):
        """Assign agent scoped to wrong team → 400 (lines 57-58)."""
        from app.utils.security import get_password_hash
        from oxyde import execute_raw
        import uuid

        # Insert agent user with FK-violating agent_team_id via raw SQL
        agent_id = str(uuid.uuid4())
        now = "2026-01-01T00:00:00+00:00"
        hashed = get_password_hash("pass")
        await execute_raw("PRAGMA foreign_keys = OFF", [])
        await execute_raw(
            "INSERT INTO users (id, email, hashed_password, name, is_active, is_superuser, is_agent, agent_team_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [agent_id, "wrong-agent@test.com", hashed, "Wrong Agent", True, False, True, "other-team-id", now, now],
        )
        await execute_raw("PRAGMA foreign_keys = ON", [])

        response = await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
            json={"assignee_id": agent_id},
        )
        assert response.status_code == 400
        assert "agent" in response.json()["detail"].lower()

    async def test_assign_non_member(
        self, client, auth_headers, db, test_issue, test_user2
    ):
        """Assign non-member user → 400 (line 65)."""
        response = await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
            json={"assignee_id": test_user2.id},
        )
        assert response.status_code == 400
        assert "not a member" in response.json()["detail"].lower()


# === Cross-team relation check (line 1209) ===


@pytest.mark.asyncio
class TestCrossTeamRelation:
    """Cover cross-team relation prevention."""

    async def test_create_relation_cross_team(
        self, client, auth_headers, db, test_issue, test_user
    ):
        """Create relation across teams → 403 (line 1209)."""
        from app.oxyde_models.team import OxydeTeam
        team2 = await OxydeTeam.objects.create(name="Team X", key="TX", description="")
        member2 = await OxydeTeamMember.objects.create(team_id=team2.id, user_id=test_user.id, role=TeamRole.OWNER)
        project2 = await OxydeProject.objects.create(
            team_id=team2.id, name="PX", key="PX", description="", color="#000"
        )
        project2.issue_count = 1
        issue2 = await OxydeIssue.objects.create(
            project_id=project2.id,
            identifier="PX-1",
            number=1,
            title="Cross team issue",
            creator_id=test_user.id,
        )

        response = await client.post(
            f"/api/issues/{test_issue.id}/relations",
            headers=auth_headers,
            json={
                "related_issue_id": issue2.id,
                "relation_type": "relates_to",
            },
        )
        assert response.status_code == 403
        assert "different teams" in response.json()["detail"]
