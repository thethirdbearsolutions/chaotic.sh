"""Tests to close rituals.py and ritual_service.py coverage gaps (CHT-955).

Targets uncovered lines:
- api/rituals.py: 175, 355, 471, 519-520, 530-531, 570, 626-627, 664, 677,
  726-727, 826, 861, 899, 937, 973, 1018, 1119-1120
- services/ritual_service.py: 54-60, 107-109, 124-128, 146-152, 160-163,
  316-326, 376-384, 526, 733-739, 744-745, 849-855, 944-950, 1062-1064,
  1115-1121, 1126-1127, 1143, 1222, 1234
"""
import pytest
import pytest_asyncio
from datetime import datetime, timezone
from unittest.mock import patch, AsyncMock

from app.oxyde_models.ritual import (
    OxydeRitual, OxydeRitualAttestation,
    OxydeRitualGroup,
)
from app.oxyde_models.issue import OxydeIssue
from app.oxyde_models.issue import OxydeTicketLimbo
from app.oxyde_models.user import OxydeUser
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.oxyde_models.project import OxydeProject
from app.enums import RitualTrigger, ApprovalMode, SelectionMode, IssueStatus, LimboType, TeamRole
from app.oxyde_models.sprint import OxydeSprint


# === Fixtures ===


@pytest_asyncio.fixture
async def agent_user(db, test_team):
    """Agent user scoped to test_team."""
    from app.utils.security import get_password_hash, create_access_token
    user = await OxydeUser.objects.create(
        email="agent-ritual@example.com",
        hashed_password=get_password_hash("agentpass"),
        name="Agent Bot",
        is_agent=True,
        agent_team_id=test_team.id,
    )
    return user


@pytest_asyncio.fixture
async def agent_headers(agent_user):
    from app.utils.security import create_access_token
    token = create_access_token(data={"sub": agent_user.id})
    return {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def sprint_ritual(db, test_project):
    """An EVERY_SPRINT ritual (auto approval)."""
    ritual = await OxydeRitual.objects.create(
        project_id=test_project.id,
        name="sprint-report",
        prompt="Write a sprint report",
        trigger=RitualTrigger.EVERY_SPRINT,
        approval_mode=ApprovalMode.AUTO,
    )
    return ritual


@pytest_asyncio.fixture
async def review_sprint_ritual(db, test_project):
    """An EVERY_SPRINT ritual (review approval)."""
    ritual = await OxydeRitual.objects.create(
        project_id=test_project.id,
        name="review-ritual",
        prompt="Needs human review",
        trigger=RitualTrigger.EVERY_SPRINT,
        approval_mode=ApprovalMode.REVIEW,
    )
    return ritual


@pytest_asyncio.fixture
async def gate_ritual(db, test_project):
    """A TICKET_CLOSE GATE ritual."""
    ritual = await OxydeRitual.objects.create(
        project_id=test_project.id,
        name="gate-check",
        prompt="Human gate check before close",
        trigger=RitualTrigger.TICKET_CLOSE,
        approval_mode=ApprovalMode.GATE,
    )
    return ritual


@pytest_asyncio.fixture
async def review_ticket_ritual(db, test_project):
    """A TICKET_CLOSE REVIEW ritual."""
    ritual = await OxydeRitual.objects.create(
        project_id=test_project.id,
        name="review-check",
        prompt="Review before close",
        trigger=RitualTrigger.TICKET_CLOSE,
        approval_mode=ApprovalMode.REVIEW,
    )
    return ritual


@pytest_asyncio.fixture
async def test_issue_955(db, test_project, test_user):
    """Issue for ritual tests."""
    from oxyde import execute_raw
    await execute_raw(
        "UPDATE projects SET issue_count = issue_count + 1 WHERE id = ?",
        [test_project.id],
    )
    from app.oxyde_models.project import OxydeProject
    project = await OxydeProject.objects.get(id=test_project.id)
    issue = await OxydeIssue.objects.create(
        project_id=project.id,
        identifier=f"{project.key}-{project.issue_count}",
        number=project.issue_count,
        title="Ritual Test Issue",
        creator_id=test_user.id,
    )
    return issue


# === api/rituals.py: Limbo attestation with existing attestations (line 175) ===


@pytest.mark.asyncio
class TestLimboStatus:
    """Cover limbo attestation response building."""

    async def test_limbo_with_attested_ritual(
        self, client, auth_headers, db, test_project, sprint_ritual, test_user
    ):
        """Limbo status shows attestation for completed ritual (line 175)."""
        from app.services.sprint_service import SprintService
        sprint_svc = SprintService()
        current, _ = await sprint_svc.ensure_sprints_exist(test_project.id)

        # Create attestation for the ritual
        attestation = await OxydeRitualAttestation.objects.create(
            ritual_id=sprint_ritual.id,
            sprint_id=current.id,
            attested_by=test_user.id,
            note="Test attestation",
        )

        # Close sprint to enter limbo
        await client.post(
            f"/api/sprints/{current.id}/close",
            headers=auth_headers,
        )
        # Now check limbo status
        response = await client.get(
            f"/api/rituals/limbo?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200


# === api/rituals.py: Ticket ritual attestation ValueError (lines 519-520) ===


@pytest.mark.asyncio
class TestTicketRitualAttestation:
    """Cover ticket ritual attest/complete/approve error branches."""

    async def test_attest_ticket_ritual_not_found_issue(
        self, client, auth_headers, db, test_project
    ):
        """Attest ticket ritual with nonexistent issue → 404 (line 355)."""
        ritual = await OxydeRitual.objects.create(
            project_id=test_project.id,
            name="test-attest",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest-issue/00000000-0000-0000-0000-000000000000",
            headers=auth_headers,
            json={"note": "test"},
        )
        assert response.status_code == 404

    async def test_complete_gate_issue_not_found(
        self, client, auth_headers, gate_ritual
    ):
        """Complete gate ritual with nonexistent issue → 404 (line 570)."""
        response = await client.post(
            f"/api/rituals/{gate_ritual.id}/complete-issue/nonexistent",
            headers=auth_headers,
            json={"note": "gate done"},
        )
        assert response.status_code == 404

    async def test_approve_issue_attestation_not_found_issue(
        self, client, auth_headers, review_ticket_ritual
    ):
        """Approve issue attestation with nonexistent issue → 404 (line 664)."""
        response = await client.post(
            f"/api/rituals/{review_ticket_ritual.id}/approve-issue/nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_approve_issue_attestation_agent_denied(
        self, client, agent_headers, db, test_project, review_ticket_ritual, test_issue_955, test_team, agent_user
    ):
        """Agent cannot approve attestation (line 677)."""
        # Need agent to be admin for this test
        member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=agent_user.id, role=TeamRole.ADMIN)

        response = await client.post(
            f"/api/rituals/{review_ticket_ritual.id}/approve-issue/{test_issue_955.id}",
            headers=agent_headers,
        )
        assert response.status_code == 403
        assert "Agents cannot approve" in response.json()["detail"]


# === api/rituals.py: Ritual group CRUD error branches ===


@pytest.mark.asyncio
class TestRitualGroupErrors:
    """Cover ritual group error branches."""

    async def test_get_ritual_group_access_denied(
        self, client, auth_headers2, db, test_project
    ):
        """Non-member can't access ritual group (line 826)."""
        group = await OxydeRitualGroup.objects.create(
            project_id=test_project.id,
            name="Test Group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )

        response = await client.get(
            f"/api/rituals/groups/{group.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_update_ritual_group_project_not_found(
        self, client, auth_headers, db
    ):
        """Update group with project not found → 404 (line 861)."""
        import uuid
        from oxyde import execute_raw
        group_id = str(uuid.uuid4())
        await execute_raw('PRAGMA foreign_keys = OFF', [])
        await execute_raw(
            'INSERT INTO ritual_groups (id, project_id, name, selection_mode, created_at) '
            'VALUES (?, ?, ?, ?, datetime("now"))',
            [group_id, "00000000-0000-0000-0000-000000000008", "Orphan Group", "RANDOM_ONE"],
        )
        await execute_raw('PRAGMA foreign_keys = ON', [])

        response = await client.patch(
            f"/api/rituals/groups/{group_id}",
            headers=auth_headers,
            json={"name": "Updated"},
        )
        assert response.status_code == 404

    async def test_delete_ritual_group_project_not_found(
        self, client, auth_headers, db
    ):
        """Delete group with project not found → 404 (line 899)."""
        import uuid
        from oxyde import execute_raw
        group_id = str(uuid.uuid4())
        await execute_raw('PRAGMA foreign_keys = OFF', [])
        await execute_raw(
            'INSERT INTO ritual_groups (id, project_id, name, selection_mode, created_at) '
            'VALUES (?, ?, ?, ?, datetime("now"))',
            [group_id, "00000000-0000-0000-0000-000000000008", "Orphan Group 2", "RANDOM_ONE"],
        )
        await execute_raw('PRAGMA foreign_keys = ON', [])

        response = await client.delete(
            f"/api/rituals/groups/{group_id}",
            headers=auth_headers,
        )
        assert response.status_code == 404


# === api/rituals.py: Individual ritual CRUD errors (lines 937, 973, 1018) ===


@pytest.mark.asyncio
class TestRitualCRUDErrors:
    """Cover ritual get/update/delete with access denied or not found."""

    async def test_get_ritual_access_denied(
        self, client, auth_headers2, sprint_ritual
    ):
        """Non-member can't get ritual (line 937)."""
        response = await client.get(
            f"/api/rituals/{sprint_ritual.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_update_ritual_project_not_found(
        self, client, auth_headers, db
    ):
        """Update ritual whose project doesn't exist → 404 (line 973)."""
        import uuid
        from oxyde import execute_raw
        ritual_id = str(uuid.uuid4())
        await execute_raw('PRAGMA foreign_keys = OFF', [])
        await execute_raw(
            'INSERT INTO rituals (id, project_id, name, prompt, trigger, approval_mode, is_active, created_at, updated_at) '
            'VALUES (?, ?, ?, ?, ?, ?, 1, datetime("now"), datetime("now"))',
            [ritual_id, "00000000-0000-0000-0000-000000000008", "orphan-ritual", "test", "EVERY_SPRINT", "AUTO"],
        )
        await execute_raw('PRAGMA foreign_keys = ON', [])

        response = await client.patch(
            f"/api/rituals/{ritual_id}",
            headers=auth_headers,
            json={"prompt": "Updated"},
        )
        assert response.status_code == 404

    async def test_delete_ritual_project_not_found(
        self, client, auth_headers, db
    ):
        """Delete ritual whose project doesn't exist → 404 (line 1018)."""
        import uuid
        from oxyde import execute_raw
        ritual_id = str(uuid.uuid4())
        await execute_raw('PRAGMA foreign_keys = OFF', [])
        await execute_raw(
            'INSERT INTO rituals (id, project_id, name, prompt, trigger, approval_mode, is_active, created_at, updated_at) '
            'VALUES (?, ?, ?, ?, ?, ?, 1, datetime("now"), datetime("now"))',
            [ritual_id, "00000000-0000-0000-0000-000000000008", "orphan-ritual-2", "test", "EVERY_SPRINT", "AUTO"],
        )
        await execute_raw('PRAGMA foreign_keys = ON', [])

        response = await client.delete(
            f"/api/rituals/{ritual_id}",
            headers=auth_headers,
        )
        assert response.status_code == 404


# === api/rituals.py: Sprint attest ValueError (line 1119-1120) ===


@pytest.mark.asyncio
class TestSprintAttestErrors:
    """Cover sprint attest error branches."""

    async def test_sprint_attest_value_error(
        self, client, auth_headers, db, test_project, sprint_ritual
    ):
        """Sprint attest with ValueError → 400 (line 1119-1120)."""
        mock_sprint = await OxydeSprint.objects.create(id="limbo-sprint", project_id=test_project.id, name="S1")
        with patch("app.api.rituals.RitualService") as MockRitualService:
            mock_svc = AsyncMock()
            mock_svc.get_by_id.return_value = sprint_ritual
            mock_svc.check_limbo.return_value = (True, mock_sprint, [sprint_ritual])
            mock_svc.attest.side_effect = ValueError("Already attested for this sprint")
            MockRitualService.return_value = mock_svc

            response = await client.post(
                f"/api/rituals/{sprint_ritual.id}/attest?project_id={test_project.id}",
                headers=auth_headers,
                json={"note": "Test attest"},
            )
            assert response.status_code == 400
            assert "Already attested" in response.json()["detail"]


# === services/ritual_service.py: Create ritual validation branches ===


@pytest.mark.asyncio
class TestRitualServiceValidation:
    """Cover ritual_service.py create/update validation branches."""

    async def test_create_ritual_in_percentage_group(
        self, client, auth_headers, db, test_project
    ):
        """Create ritual in PERCENTAGE group without percentage → 400 (line 54-58)."""
        group = await OxydeRitualGroup.objects.create(
            project_id=test_project.id,
            name="Pct Group",
            selection_mode=SelectionMode.PERCENTAGE,
        )

        response = await client.post(
            f"/api/rituals?project_id={test_project.id}",
            headers=auth_headers,
            json={
                "name": "pct-ritual",
                "prompt": "test",
                "group_id": group.id,
                "percentage": 0,
            },
        )
        assert response.status_code == 400

    async def test_create_ritual_in_random_group_zero_weight(
        self, client, auth_headers, db, test_project
    ):
        """Create ritual in RANDOM_ONE group with weight=0 → 400 (line 59-63)."""
        group = await OxydeRitualGroup.objects.create(
            project_id=test_project.id,
            name="Random Group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )

        response = await client.post(
            f"/api/rituals?project_id={test_project.id}",
            headers=auth_headers,
            json={
                "name": "random-ritual",
                "prompt": "test",
                "group_id": group.id,
                "weight": 0,
            },
        )
        assert response.status_code == 400

    async def test_update_ritual_duplicate_name(
        self, client, auth_headers, db, test_project
    ):
        """Update ritual to duplicate name → 400 (line 124)."""
        r1 = await OxydeRitual.objects.create(
            project_id=test_project.id,
            name="ritual-one",
            prompt="test",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        r2 = await OxydeRitual.objects.create(
            project_id=test_project.id,
            name="ritual-two",
            prompt="test",
            trigger=RitualTrigger.EVERY_SPRINT,
        )

        response = await client.patch(
            f"/api/rituals/{r2.id}",
            headers=auth_headers,
            json={"name": "ritual-one"},
        )
        assert response.status_code == 400
        assert "already exists" in response.json()["detail"]

    async def test_update_ritual_remove_from_group(
        self, client, auth_headers, db, test_project
    ):
        """Update ritual with group_id="" removes from group (line 128)."""
        group = await OxydeRitualGroup.objects.create(
            project_id=test_project.id,
            name="Removal Group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )

        ritual = await OxydeRitual.objects.create(
            project_id=test_project.id,
            name="grouped-ritual",
            prompt="test",
            trigger=RitualTrigger.EVERY_SPRINT,
            group_id=group.id,
        )

        response = await client.patch(
            f"/api/rituals/{ritual.id}",
            headers=auth_headers,
            json={"group_id": ""},
        )
        assert response.status_code == 200
        assert response.json()["group_id"] is None

    async def test_update_ritual_conditions_json(
        self, client, auth_headers, db, test_project
    ):
        """Update ritual conditions serialized to JSON (line 160-161)."""
        ritual = await OxydeRitual.objects.create(
            project_id=test_project.id,
            name="condition-ritual",
            prompt="test",
            trigger=RitualTrigger.EVERY_SPRINT,
        )

        response = await client.patch(
            f"/api/rituals/{ritual.id}",
            headers=auth_headers,
            json={
                "conditions": {"estimate__gte": 3},
            },
        )
        assert response.status_code == 200


# === services/ritual_service.py: Broadcast failure silencing (lines 530-531, 626-627, 726-727) ===


@pytest.mark.asyncio
class TestBroadcastFailureSilencing:
    """Cover broadcast failure silencing on attest/complete/approve."""

    async def test_attest_ticket_broadcast_failure_silenced(
        self, client, auth_headers, db, test_project, test_issue_955
    ):
        """Attest ticket ritual - broadcast failure silenced (lines 530-531)."""
        ritual = await OxydeRitual.objects.create(
            project_id=test_project.id,
            name="broadcast-test",
            prompt="test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )

        with patch("app.api.rituals.broadcast_attestation_event", side_effect=Exception("broadcast failed")):
            response = await client.post(
                f"/api/rituals/{ritual.id}/attest-issue/{test_issue_955.id}",
                headers=auth_headers,
                json={"note": "test note"},
            )
            # Should succeed despite broadcast failure
            assert response.status_code == 200

    async def test_complete_gate_broadcast_failure_silenced(
        self, client, auth_headers, db, test_project, test_issue_955, gate_ritual, test_user
    ):
        """Complete gate ritual - broadcast failure silenced (lines 626-627)."""
        with patch("app.api.rituals.broadcast_attestation_event", side_effect=Exception("broadcast failed")):
            response = await client.post(
                f"/api/rituals/{gate_ritual.id}/complete-issue/{test_issue_955.id}",
                headers=auth_headers,
                json={"note": "gate complete"},
            )
            assert response.status_code == 200
