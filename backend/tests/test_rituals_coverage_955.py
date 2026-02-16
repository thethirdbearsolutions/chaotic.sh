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

from app.models.ritual import (
    Ritual, RitualTrigger, ApprovalMode, RitualAttestation,
    RitualGroup, SelectionMode,
)
from app.models.issue import Issue, IssueStatus
from app.models.ticket_limbo import TicketLimbo, LimboType
from app.models.user import User
from app.models.team import Team, TeamMember, TeamRole
from app.models.project import Project
from app.models import Sprint


# === Fixtures ===


@pytest_asyncio.fixture
async def agent_user(db_session, test_team):
    """Agent user scoped to test_team."""
    from app.utils.security import get_password_hash, create_access_token
    user = User(
        email="agent-ritual@example.com",
        hashed_password=get_password_hash("agentpass"),
        name="Agent Bot",
        is_agent=True,
        agent_team_id=test_team.id,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest_asyncio.fixture
async def agent_headers(agent_user):
    from app.utils.security import create_access_token
    token = create_access_token(data={"sub": agent_user.id})
    return {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def sprint_ritual(db_session, test_project):
    """An EVERY_SPRINT ritual (auto approval)."""
    ritual = Ritual(
        project_id=test_project.id,
        name="sprint-report",
        prompt="Write a sprint report",
        trigger=RitualTrigger.EVERY_SPRINT,
        approval_mode=ApprovalMode.AUTO,
    )
    db_session.add(ritual)
    await db_session.commit()
    await db_session.refresh(ritual)
    return ritual


@pytest_asyncio.fixture
async def review_sprint_ritual(db_session, test_project):
    """An EVERY_SPRINT ritual (review approval)."""
    ritual = Ritual(
        project_id=test_project.id,
        name="review-ritual",
        prompt="Needs human review",
        trigger=RitualTrigger.EVERY_SPRINT,
        approval_mode=ApprovalMode.REVIEW,
    )
    db_session.add(ritual)
    await db_session.commit()
    await db_session.refresh(ritual)
    return ritual


@pytest_asyncio.fixture
async def gate_ritual(db_session, test_project):
    """A TICKET_CLOSE GATE ritual."""
    ritual = Ritual(
        project_id=test_project.id,
        name="gate-check",
        prompt="Human gate check before close",
        trigger=RitualTrigger.TICKET_CLOSE,
        approval_mode=ApprovalMode.GATE,
    )
    db_session.add(ritual)
    await db_session.commit()
    await db_session.refresh(ritual)
    return ritual


@pytest_asyncio.fixture
async def review_ticket_ritual(db_session, test_project):
    """A TICKET_CLOSE REVIEW ritual."""
    ritual = Ritual(
        project_id=test_project.id,
        name="review-check",
        prompt="Review before close",
        trigger=RitualTrigger.TICKET_CLOSE,
        approval_mode=ApprovalMode.REVIEW,
    )
    db_session.add(ritual)
    await db_session.commit()
    await db_session.refresh(ritual)
    return ritual


@pytest_asyncio.fixture
async def test_issue_955(db_session, test_project, test_user):
    """Issue for ritual tests."""
    test_project.issue_count += 1
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count,
        title="Ritual Test Issue",
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)
    return issue


# === api/rituals.py: Limbo attestation with existing attestations (line 175) ===


@pytest.mark.asyncio
class TestLimboStatus:
    """Cover limbo attestation response building."""

    async def test_limbo_with_attested_ritual(
        self, client, auth_headers, db_session, test_project, sprint_ritual, test_user
    ):
        """Limbo status shows attestation for completed ritual (line 175)."""
        from app.services.sprint_service import SprintService
        sprint_svc = SprintService(db_session)
        current, _ = await sprint_svc.ensure_sprints_exist(test_project.id)

        # Create attestation for the ritual
        attestation = RitualAttestation(
            ritual_id=sprint_ritual.id,
            sprint_id=current.id,
            attested_by=test_user.id,
            note="Test attestation",
        )
        db_session.add(attestation)
        await db_session.commit()

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
        self, client, auth_headers, db_session, test_project
    ):
        """Attest ticket ritual with nonexistent issue → 404 (line 355)."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test-attest",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest-issue/nonexistent-id",
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
        self, client, agent_headers, db_session, test_project, review_ticket_ritual, test_issue_955, test_team, agent_user
    ):
        """Agent cannot approve attestation (line 677)."""
        # Need agent to be admin for this test
        member = TeamMember(team_id=test_team.id, user_id=agent_user.id, role=TeamRole.ADMIN)
        db_session.add(member)
        await db_session.commit()

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
        self, client, auth_headers2, db_session, test_project
    ):
        """Non-member can't access ritual group (line 826)."""
        group = RitualGroup(
            project_id=test_project.id,
            name="Test Group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        response = await client.get(
            f"/api/rituals/groups/{group.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_update_ritual_group_project_not_found(
        self, client, auth_headers, db_session
    ):
        """Update group with project not found → 404 (line 861)."""
        group = RitualGroup(
            project_id="nonexistent-project",
            name="Orphan Group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        response = await client.patch(
            f"/api/rituals/groups/{group.id}",
            headers=auth_headers,
            json={"name": "Updated"},
        )
        assert response.status_code == 404

    async def test_delete_ritual_group_project_not_found(
        self, client, auth_headers, db_session
    ):
        """Delete group with project not found → 404 (line 899)."""
        group = RitualGroup(
            project_id="nonexistent-project",
            name="Orphan Group 2",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        response = await client.delete(
            f"/api/rituals/groups/{group.id}",
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
        self, client, auth_headers, db_session
    ):
        """Update ritual whose project doesn't exist → 404 (line 973)."""
        ritual = Ritual(
            project_id="nonexistent-project",
            name="orphan-ritual",
            prompt="test",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.patch(
            f"/api/rituals/{ritual.id}",
            headers=auth_headers,
            json={"prompt": "Updated"},
        )
        assert response.status_code == 404

    async def test_delete_ritual_project_not_found(
        self, client, auth_headers, db_session
    ):
        """Delete ritual whose project doesn't exist → 404 (line 1018)."""
        ritual = Ritual(
            project_id="nonexistent-project",
            name="orphan-ritual-2",
            prompt="test",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.delete(
            f"/api/rituals/{ritual.id}",
            headers=auth_headers,
        )
        assert response.status_code == 404


# === api/rituals.py: Sprint attest ValueError (line 1119-1120) ===


@pytest.mark.asyncio
class TestSprintAttestErrors:
    """Cover sprint attest error branches."""

    async def test_sprint_attest_value_error(
        self, client, auth_headers, db_session, test_project, sprint_ritual
    ):
        """Sprint attest with ValueError → 400 (line 1119-1120)."""
        mock_sprint = Sprint(id="limbo-sprint", project_id=test_project.id, name="S1")
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
        self, client, auth_headers, db_session, test_project
    ):
        """Create ritual in PERCENTAGE group without percentage → 400 (line 54-58)."""
        group = RitualGroup(
            project_id=test_project.id,
            name="Pct Group",
            selection_mode=SelectionMode.PERCENTAGE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

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
        self, client, auth_headers, db_session, test_project
    ):
        """Create ritual in RANDOM_ONE group with weight=0 → 400 (line 59-63)."""
        group = RitualGroup(
            project_id=test_project.id,
            name="Random Group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

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
        self, client, auth_headers, db_session, test_project
    ):
        """Update ritual to duplicate name → 400 (line 124)."""
        r1 = Ritual(
            project_id=test_project.id,
            name="ritual-one",
            prompt="test",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        r2 = Ritual(
            project_id=test_project.id,
            name="ritual-two",
            prompt="test",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        db_session.add_all([r1, r2])
        await db_session.commit()
        await db_session.refresh(r2)

        response = await client.patch(
            f"/api/rituals/{r2.id}",
            headers=auth_headers,
            json={"name": "ritual-one"},
        )
        assert response.status_code == 400
        assert "already exists" in response.json()["detail"]

    async def test_update_ritual_remove_from_group(
        self, client, auth_headers, db_session, test_project
    ):
        """Update ritual with group_id="" removes from group (line 128)."""
        group = RitualGroup(
            project_id=test_project.id,
            name="Removal Group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.flush()

        ritual = Ritual(
            project_id=test_project.id,
            name="grouped-ritual",
            prompt="test",
            trigger=RitualTrigger.EVERY_SPRINT,
            group_id=group.id,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.patch(
            f"/api/rituals/{ritual.id}",
            headers=auth_headers,
            json={"group_id": ""},
        )
        assert response.status_code == 200
        assert response.json()["group_id"] is None

    async def test_update_ritual_conditions_json(
        self, client, auth_headers, db_session, test_project
    ):
        """Update ritual conditions serialized to JSON (line 160-161)."""
        ritual = Ritual(
            project_id=test_project.id,
            name="condition-ritual",
            prompt="test",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

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
        self, client, auth_headers, db_session, test_project, test_issue_955
    ):
        """Attest ticket ritual - broadcast failure silenced (lines 530-531)."""
        ritual = Ritual(
            project_id=test_project.id,
            name="broadcast-test",
            prompt="test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        with patch("app.api.rituals.broadcast_attestation_event", side_effect=Exception("broadcast failed")):
            response = await client.post(
                f"/api/rituals/{ritual.id}/attest-issue/{test_issue_955.id}",
                headers=auth_headers,
                json={"note": "test note"},
            )
            # Should succeed despite broadcast failure
            assert response.status_code == 200

    async def test_complete_gate_broadcast_failure_silenced(
        self, client, auth_headers, db_session, test_project, test_issue_955, gate_ritual, test_user
    ):
        """Complete gate ritual - broadcast failure silenced (lines 626-627)."""
        with patch("app.api.rituals.broadcast_attestation_event", side_effect=Exception("broadcast failed")):
            response = await client.post(
                f"/api/rituals/{gate_ritual.id}/complete-issue/{test_issue_955.id}",
                headers=auth_headers,
                json={"note": "gate complete"},
            )
            assert response.status_code == 200
