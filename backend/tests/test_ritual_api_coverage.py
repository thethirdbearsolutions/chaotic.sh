"""Tests for ritual API edge cases and access control (CHT-886).

Covers uncovered lines in rituals.py: group management, attestation flows,
ritual CRUD access control. All via HTTP client.
"""
import datetime
import pytest
import pytest_asyncio
from app.models.team import Team, TeamMember, TeamRole
from app.models.user import User
from app.models.ritual import Ritual, RitualTrigger, ApprovalMode, RitualAttestation
from app.models import Sprint
from app.utils.security import get_password_hash, create_access_token


@pytest_asyncio.fixture
async def other_team(db_session):
    """Team that test_user is NOT a member of."""
    team = Team(name="Ritual Other Team", key="ROT", description="Other team")
    db_session.add(team)
    await db_session.commit()
    await db_session.refresh(team)
    return team


@pytest_asyncio.fixture
async def non_admin_user(db_session, test_team):
    """User on test_team but as MEMBER (not admin)."""
    user = User(
        email="member@example.com",
        hashed_password=get_password_hash("testpassword123"),
        name="Member User",
    )
    db_session.add(user)
    await db_session.flush()
    member = TeamMember(team_id=test_team.id, user_id=user.id, role=TeamRole.MEMBER)
    db_session.add(member)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest_asyncio.fixture
async def non_admin_headers(non_admin_user):
    """Auth headers for non-admin user."""
    token = create_access_token(data={"sub": non_admin_user.id})
    return {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def test_ritual(db_session, test_project):
    """Create a test ritual."""
    ritual = Ritual(
        project_id=test_project.id,
        name="test-ritual",
        prompt="Test ritual prompt",
        trigger=RitualTrigger.EVERY_SPRINT,
        approval_mode=ApprovalMode.AUTO,
    )
    db_session.add(ritual)
    await db_session.commit()
    await db_session.refresh(ritual)
    return ritual


@pytest.mark.asyncio
class TestRitualGroupCRUD:
    """Test ritual group create/read/update/delete."""

    async def test_create_ritual_group(
        self, client, auth_headers, test_project
    ):
        """POST /rituals/groups creates a group."""
        response = await client.post(
            f"/api/rituals/groups?project_id={test_project.id}",
            headers=auth_headers,
            json={"name": "Test Group", "selection_mode": "random_one"},
        )
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "Test Group"
        assert data["selection_mode"] == "random_one"

    async def test_create_ritual_group_non_admin(
        self, client, non_admin_headers, test_project
    ):
        """POST /rituals/groups returns 403 for non-admin."""
        response = await client.post(
            f"/api/rituals/groups?project_id={test_project.id}",
            headers=non_admin_headers,
            json={"name": "Unauthorized Group"},
        )
        assert response.status_code == 403
        assert "Only admins" in response.json()["detail"]

    async def test_list_ritual_groups(
        self, client, auth_headers, test_project
    ):
        """GET /rituals/groups lists groups."""
        # Create one first
        await client.post(
            f"/api/rituals/groups?project_id={test_project.id}",
            headers=auth_headers,
            json={"name": "Listed Group"},
        )
        response = await client.get(
            f"/api/rituals/groups?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert len(response.json()) >= 1

    async def test_get_ritual_group(
        self, client, auth_headers, test_project
    ):
        """GET /rituals/groups/{id} returns the group."""
        create_resp = await client.post(
            f"/api/rituals/groups?project_id={test_project.id}",
            headers=auth_headers,
            json={"name": "Get Group"},
        )
        group_id = create_resp.json()["id"]

        response = await client.get(
            f"/api/rituals/groups/{group_id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert response.json()["name"] == "Get Group"

    async def test_get_ritual_group_not_found(
        self, client, auth_headers
    ):
        """GET /rituals/groups/{id} returns 404 for nonexistent group."""
        response = await client.get(
            "/api/rituals/groups/nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_update_ritual_group(
        self, client, auth_headers, test_project
    ):
        """PATCH /rituals/groups/{id} updates the group."""
        create_resp = await client.post(
            f"/api/rituals/groups?project_id={test_project.id}",
            headers=auth_headers,
            json={"name": "Original Name"},
        )
        group_id = create_resp.json()["id"]

        response = await client.patch(
            f"/api/rituals/groups/{group_id}",
            headers=auth_headers,
            json={"name": "Updated Name"},
        )
        assert response.status_code == 200
        assert response.json()["name"] == "Updated Name"

    async def test_update_ritual_group_not_found(
        self, client, auth_headers
    ):
        """PATCH /rituals/groups/{id} returns 404 for nonexistent group."""
        response = await client.patch(
            "/api/rituals/groups/nonexistent",
            headers=auth_headers,
            json={"name": "Nope"},
        )
        assert response.status_code == 404

    async def test_update_ritual_group_non_admin(
        self, client, auth_headers, non_admin_headers, test_project
    ):
        """PATCH /rituals/groups/{id} returns 403 for non-admin."""
        create_resp = await client.post(
            f"/api/rituals/groups?project_id={test_project.id}",
            headers=auth_headers,
            json={"name": "Admin Group"},
        )
        group_id = create_resp.json()["id"]

        response = await client.patch(
            f"/api/rituals/groups/{group_id}",
            headers=non_admin_headers,
            json={"name": "Hacked"},
        )
        assert response.status_code == 403

    async def test_delete_ritual_group(
        self, client, auth_headers, test_project
    ):
        """DELETE /rituals/groups/{id} deletes the group."""
        create_resp = await client.post(
            f"/api/rituals/groups?project_id={test_project.id}",
            headers=auth_headers,
            json={"name": "Delete Me"},
        )
        group_id = create_resp.json()["id"]

        response = await client.delete(
            f"/api/rituals/groups/{group_id}",
            headers=auth_headers,
        )
        assert response.status_code == 204

        # Verify it's gone
        get_resp = await client.get(
            f"/api/rituals/groups/{group_id}",
            headers=auth_headers,
        )
        assert get_resp.status_code == 404

    async def test_delete_ritual_group_not_found(
        self, client, auth_headers
    ):
        """DELETE /rituals/groups/{id} returns 404 for nonexistent group."""
        response = await client.delete(
            "/api/rituals/groups/nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_delete_ritual_group_non_admin(
        self, client, auth_headers, non_admin_headers, test_project
    ):
        """DELETE /rituals/groups/{id} returns 403 for non-admin."""
        create_resp = await client.post(
            f"/api/rituals/groups?project_id={test_project.id}",
            headers=auth_headers,
            json={"name": "Protected Group"},
        )
        group_id = create_resp.json()["id"]

        response = await client.delete(
            f"/api/rituals/groups/{group_id}",
            headers=non_admin_headers,
        )
        assert response.status_code == 403


@pytest.mark.asyncio
class TestRitualCRUD:
    """Test ritual create/read/update/delete edge cases."""

    async def test_create_ritual(
        self, client, auth_headers, test_project
    ):
        """POST /rituals creates a ritual."""
        response = await client.post(
            f"/api/rituals?project_id={test_project.id}",
            headers=auth_headers,
            json={
                "name": "new-ritual",
                "prompt": "Do something important",
                "trigger": "every_sprint",
                "approval_mode": "auto",
            },
        )
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "new-ritual"

    async def test_create_ritual_non_admin(
        self, client, non_admin_headers, test_project
    ):
        """POST /rituals returns 403 for non-admin."""
        response = await client.post(
            f"/api/rituals?project_id={test_project.id}",
            headers=non_admin_headers,
            json={
                "name": "unauthorized-ritual",
                "prompt": "Should fail",
            },
        )
        assert response.status_code == 403

    async def test_get_ritual(
        self, client, auth_headers, test_ritual
    ):
        """GET /rituals/{id} returns the ritual."""
        response = await client.get(
            f"/api/rituals/{test_ritual.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert response.json()["name"] == "test-ritual"

    async def test_get_ritual_not_found(
        self, client, auth_headers
    ):
        """GET /rituals/{id} returns 404 for nonexistent ritual."""
        response = await client.get(
            "/api/rituals/nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_delete_ritual(
        self, client, auth_headers, test_project
    ):
        """DELETE /rituals/{id} deletes the ritual."""
        create_resp = await client.post(
            f"/api/rituals?project_id={test_project.id}",
            headers=auth_headers,
            json={"name": "delete-me", "prompt": "Temporary ritual"},
        )
        ritual_id = create_resp.json()["id"]

        response = await client.delete(
            f"/api/rituals/{ritual_id}",
            headers=auth_headers,
        )
        assert response.status_code == 204

    async def test_delete_ritual_non_admin(
        self, client, non_admin_headers, test_ritual
    ):
        """DELETE /rituals/{id} returns 403 for non-admin."""
        response = await client.delete(
            f"/api/rituals/{test_ritual.id}",
            headers=non_admin_headers,
        )
        assert response.status_code == 403

    async def test_update_ritual(
        self, client, auth_headers, test_ritual
    ):
        """PATCH /rituals/{id} updates the ritual."""
        response = await client.patch(
            f"/api/rituals/{test_ritual.id}",
            headers=auth_headers,
            json={"prompt": "Updated prompt"},
        )
        assert response.status_code == 200
        assert response.json()["prompt"] == "Updated prompt"

    async def test_update_ritual_non_admin(
        self, client, non_admin_headers, test_ritual
    ):
        """PATCH /rituals/{id} returns 403 for non-admin."""
        response = await client.patch(
            f"/api/rituals/{test_ritual.id}",
            headers=non_admin_headers,
            json={"prompt": "Hacked"},
        )
        assert response.status_code == 403

    async def test_get_ritual_unauthenticated(self, client, test_ritual):
        """GET /rituals/{id} returns 401 without auth headers."""
        response = await client.get(f"/api/rituals/{test_ritual.id}")
        assert response.status_code == 401


@pytest.mark.asyncio
class TestRitualAttestationFlow:
    """Test the full ritual attestation lifecycle via API."""

    async def test_attest_and_list_pending(
        self, client, auth_headers, test_project, test_issue, db_session
    ):
        """Attest a ticket-close ritual for an issue and check pending status."""
        # Create a ticket-close ritual
        ticket_ritual = Ritual(
            project_id=test_project.id,
            name="close-ritual",
            prompt="What did you learn?",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            note_required=True,
        )
        db_session.add(ticket_ritual)
        await db_session.commit()
        await db_session.refresh(ticket_ritual)

        # Attest
        response = await client.post(
            f"/api/rituals/{ticket_ritual.id}/attest-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "Learned something valuable"},
        )
        assert response.status_code == 200

        # Check pending ticket rituals
        response = await client.get(
            f"/api/rituals/issue/{test_issue.id}/pending",
            headers=auth_headers,
        )
        assert response.status_code == 200

    async def test_attest_ritual_not_found(
        self, client, auth_headers, test_issue
    ):
        """POST /rituals/{id}/attest-issue/{id} returns 404 for nonexistent ritual."""
        response = await client.post(
            f"/api/rituals/nonexistent/attest-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "Should fail"},
        )
        assert response.status_code == 404

    async def test_attest_ritual_cross_team_denied(
        self, client, db_session, test_project, test_issue, other_team
    ):
        """POST /rituals/{id}/attest-issue/{id} returns 403 for non-team-member."""
        # Create user on other_team
        other_user = User(
            email="attest-other@example.com",
            hashed_password=get_password_hash("test"),
            name="Attest Other",
        )
        db_session.add(other_user)
        await db_session.flush()
        member = TeamMember(team_id=other_team.id, user_id=other_user.id, role=TeamRole.OWNER)
        db_session.add(member)
        await db_session.commit()
        token = create_access_token(data={"sub": other_user.id})
        other_headers = {"Authorization": f"Bearer {token}"}

        ticket_ritual = Ritual(
            project_id=test_project.id,
            name="cross-team-ritual",
            prompt="Cross team test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ticket_ritual)
        await db_session.commit()
        await db_session.refresh(ticket_ritual)

        response = await client.post(
            f"/api/rituals/{ticket_ritual.id}/attest-issue/{test_issue.id}",
            headers=other_headers,
            json={"note": "Should be denied"},
        )
        assert response.status_code == 403


@pytest.mark.asyncio
class TestLimboStatus:
    """Test limbo status endpoint."""

    async def test_get_limbo_status(
        self, client, auth_headers, test_project
    ):
        """GET /rituals/limbo returns limbo status."""
        response = await client.get(
            f"/api/rituals/limbo?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert "in_limbo" in data

    async def test_get_pending_gates(
        self, client, auth_headers, test_project
    ):
        """GET /rituals/pending-gates returns pending gate issues."""
        response = await client.get(
            f"/api/rituals/pending-gates?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert isinstance(response.json(), list)

    async def test_get_pending_approvals(
        self, client, auth_headers, test_project
    ):
        """GET /rituals/pending-approvals returns pending approval issues."""
        response = await client.get(
            f"/api/rituals/pending-approvals?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert isinstance(response.json(), list)


@pytest_asyncio.fixture
async def agent_user(db_session, test_team):
    """Agent user on test_team (admin)."""
    user = User(
        email="agent@example.com",
        hashed_password=get_password_hash("testpassword123"),
        name="Agent User",
        is_agent=True,
    )
    db_session.add(user)
    await db_session.flush()
    member = TeamMember(team_id=test_team.id, user_id=user.id, role=TeamRole.OWNER)
    db_session.add(member)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest_asyncio.fixture
async def agent_headers(agent_user):
    """Auth headers for agent user."""
    token = create_access_token(data={"sub": agent_user.id})
    return {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def limbo_sprint(db_session, test_project):
    """Sprint in limbo state for test_project."""
    sprint = Sprint(
        project_id=test_project.id,
        name="Limbo Sprint",
        description="Sprint in limbo",
        limbo=True,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)
    return sprint


@pytest.mark.asyncio
class TestPendingApprovalsEdgeCases:
    """Test pending-approvals endpoint edge cases (lines 221, 227)."""

    async def test_pending_approvals_project_not_found(
        self, client, auth_headers
    ):
        """GET /rituals/pending-approvals returns 404 for nonexistent project."""
        response = await client.get(
            "/api/rituals/pending-approvals?project_id=nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "Project not found" in response.json()["detail"]

    async def test_pending_approvals_non_member(
        self, client, db_session, test_project, other_team
    ):
        """GET /rituals/pending-approvals returns 403 for non-team-member."""
        other_user = User(
            email="pending-other@example.com",
            hashed_password=get_password_hash("test"),
            name="Other User",
        )
        db_session.add(other_user)
        await db_session.flush()
        member = TeamMember(team_id=other_team.id, user_id=other_user.id, role=TeamRole.OWNER)
        db_session.add(member)
        await db_session.commit()
        token = create_access_token(data={"sub": other_user.id})
        other_headers = {"Authorization": f"Bearer {token}"}

        response = await client.get(
            f"/api/rituals/pending-approvals?project_id={test_project.id}",
            headers=other_headers,
        )
        assert response.status_code == 403
        assert "Not a member" in response.json()["detail"]


@pytest.mark.asyncio
class TestLimboWithCompletedRituals:
    """Test limbo status with completed rituals (lines 150-153)."""

    async def test_limbo_shows_completed_rituals(
        self, client, auth_headers, db_session, test_project, test_user, limbo_sprint
    ):
        """GET /rituals/limbo includes completed ritual attestation details."""
        # Create an EVERY_SPRINT ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="sprint-ritual",
            prompt="Do the thing",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.flush()

        # Create an attestation for this ritual+sprint (marking it completed)
        attestation = RitualAttestation(
            ritual_id=ritual.id,
            sprint_id=limbo_sprint.id,
            attested_by=test_user.id,
            note="Done",
            approved_at=datetime.datetime.now(datetime.timezone.utc),
        )
        db_session.add(attestation)
        await db_session.commit()

        response = await client.get(
            f"/api/rituals/limbo?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["in_limbo"] is True
        assert len(data["completed_rituals"]) >= 1
        completed = data["completed_rituals"][0]
        assert completed["name"] == "sprint-ritual"
        assert completed["attestation"] is not None
        assert completed["attestation"]["note"] == "Done"
        assert completed["attestation"]["approved_at"] is not None


@pytest.mark.asyncio
class TestAttestIssueEdgeCases:
    """Test attest-issue endpoint edge cases (lines 471-472)."""

    async def test_attest_wrong_trigger_type(
        self, client, auth_headers, db_session, test_project, test_issue
    ):
        """POST attest-issue with EVERY_SPRINT ritual returns 400."""
        ritual = Ritual(
            project_id=test_project.id,
            name="sprint-only",
            prompt="Sprint ritual",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "Should fail"},
        )
        assert response.status_code == 400
        assert "not a ticket-level ritual" in response.json()["detail"]


@pytest.mark.asyncio
class TestSprintLevelAttestEdgeCases:
    """Test sprint-level attest endpoint edge cases (lines 1044, 1071-1072)."""

    async def test_attest_wrong_trigger_type(
        self, client, auth_headers, db_session, test_project, limbo_sprint
    ):
        """POST /{ritual_id}/attest with TICKET_CLOSE ritual returns 400."""
        ritual = Ritual(
            project_id=test_project.id,
            name="ticket-ritual",
            prompt="Ticket ritual",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Should fail"},
        )
        assert response.status_code == 400
        assert "not a sprint-level ritual" in response.json()["detail"]

    async def test_attest_not_in_limbo(
        self, client, auth_headers, db_session, test_project
    ):
        """POST /{ritual_id}/attest without limbo returns 400."""
        ritual = Ritual(
            project_id=test_project.id,
            name="no-limbo-ritual",
            prompt="No limbo",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Should fail"},
        )
        assert response.status_code == 400
        assert "not in limbo" in response.json()["detail"]

    async def test_attest_gate_ritual_rejected(
        self, client, auth_headers, db_session, test_project, limbo_sprint
    ):
        """POST /{ritual_id}/attest with GATE ritual returns 403."""
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ritual",
            prompt="Gate",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Should fail"},
        )
        assert response.status_code == 403
        assert "gate mode" in response.json()["detail"].lower()


@pytest.mark.asyncio
class TestAgentApprovalDenied:
    """Test agent cannot approve attestations (line 1115)."""

    async def test_agent_cannot_approve(
        self, client, agent_headers, agent_user, db_session, test_project, limbo_sprint
    ):
        """POST /{ritual_id}/approve by agent returns 403."""
        ritual = Ritual(
            project_id=test_project.id,
            name="review-ritual",
            prompt="Review this",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)
        await db_session.flush()

        # Create an unapproved attestation
        attestation = RitualAttestation(
            ritual_id=ritual.id,
            sprint_id=limbo_sprint.id,
            attested_by=agent_user.id,
            note="Needs approval",
        )
        db_session.add(attestation)
        await db_session.commit()

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve?project_id={test_project.id}",
            headers=agent_headers,
        )
        assert response.status_code == 403
        assert "Agents cannot approve" in response.json()["detail"]


@pytest.mark.asyncio
class TestCompleteGateEdgeCases:
    """Test complete_gate_ritual edge cases (line 1208)."""

    async def test_complete_gate_wrong_trigger(
        self, client, auth_headers, db_session, test_project, limbo_sprint
    ):
        """POST /{ritual_id}/complete with TICKET_CLOSE ritual returns 400."""
        ritual = Ritual(
            project_id=test_project.id,
            name="ticket-gate",
            prompt="Wrong trigger",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Should fail"},
        )
        assert response.status_code == 400
        assert "not a sprint-level ritual" in response.json()["detail"]

    async def test_complete_gate_non_gate_ritual(
        self, client, auth_headers, db_session, test_project, limbo_sprint
    ):
        """POST /{ritual_id}/complete with AUTO ritual returns 400."""
        ritual = Ritual(
            project_id=test_project.id,
            name="auto-ritual",
            prompt="Not gate",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Should fail"},
        )
        assert response.status_code == 400
        assert "not a GATE mode ritual" in response.json()["detail"]


# --- Service-level ritual_service.py coverage tests (CHT-920) ---

@pytest.mark.asyncio
async def test_update_ritual_group_percentage_validation(client, auth_headers, test_project, db_session):
    """Updating ritual into PERCENTAGE group with invalid percentage raises error (covers L141-153)."""
    from app.models.ritual import RitualGroup, SelectionMode

    # Create a PERCENTAGE group
    group = RitualGroup(
        project_id=test_project.id,
        name="pct-group",
        selection_mode=SelectionMode.PERCENTAGE,
    )
    db_session.add(group)
    await db_session.flush()

    # Create a ritual
    ritual = Ritual(
        project_id=test_project.id,
        name="pct-test-ritual",
        prompt="test",
        trigger=RitualTrigger.EVERY_SPRINT,
        approval_mode=ApprovalMode.AUTO,
    )
    db_session.add(ritual)
    await db_session.commit()
    await db_session.refresh(ritual)
    await db_session.refresh(group)

    # Try to assign to percentage group without setting percentage
    response = await client.patch(
        f"/api/rituals/{ritual.id}?project_id={test_project.id}",
        headers=auth_headers,
        json={"group_id": group.id, "percentage": 0},
    )
    assert response.status_code == 400
    assert "percentage" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_update_ritual_group_weight_validation(client, auth_headers, test_project, db_session):
    """Updating ritual into RANDOM_ONE group with zero weight raises error (covers L151-156)."""
    from app.models.ritual import RitualGroup, SelectionMode

    # Create a RANDOM_ONE group
    group = RitualGroup(
        project_id=test_project.id,
        name="rng-group",
        selection_mode=SelectionMode.RANDOM_ONE,
    )
    db_session.add(group)
    await db_session.flush()

    # Create a ritual with zero weight
    ritual = Ritual(
        project_id=test_project.id,
        name="rng-test-ritual",
        prompt="test",
        trigger=RitualTrigger.EVERY_SPRINT,
        approval_mode=ApprovalMode.AUTO,
        weight=0,
    )
    db_session.add(ritual)
    await db_session.commit()
    await db_session.refresh(ritual)
    await db_session.refresh(group)

    # Try to assign to random_one group with zero weight
    response = await client.patch(
        f"/api/rituals/{ritual.id}?project_id={test_project.id}",
        headers=auth_headers,
        json={"group_id": group.id},
    )
    assert response.status_code == 400
    assert "weight" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_duplicate_group_name_raises(client, auth_headers, test_project, db_session):
    """Creating a group with duplicate name raises ValueError (covers L203)."""
    from app.models.ritual import RitualGroup, SelectionMode

    group = RitualGroup(
        project_id=test_project.id,
        name="unique-group",
        selection_mode=SelectionMode.RANDOM_ONE,
    )
    db_session.add(group)
    await db_session.commit()

    # Try creating another group with same name
    response = await client.post(
        f"/api/rituals/groups?project_id={test_project.id}",
        headers=auth_headers,
        json={"name": "unique-group", "selection_mode": "random_one"},
    )
    assert response.status_code == 400
    assert "already exists" in response.json()["detail"]


@pytest.mark.asyncio
async def test_evaluate_conditions_empty_conditions(db_session, test_project, test_user):
    """_evaluate_conditions returns True for empty conditions dict (covers L491)."""
    from app.services.ritual_service import RitualService
    from app.models.issue import Issue
    from sqlalchemy import select
    from sqlalchemy.orm import selectinload

    issue = Issue(
        project_id=test_project.id,
        title="Test Issue",
        identifier="TST-1",
        number=1,
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.flush()

    # Re-fetch with labels eagerly loaded
    result = await db_session.execute(
        select(Issue).options(selectinload(Issue.labels)).where(Issue.id == issue.id)
    )
    issue = result.scalar_one()

    ritual = Ritual(
        project_id=test_project.id,
        name="empty-cond",
        prompt="test",
        trigger=RitualTrigger.TICKET_CLOSE,
        approval_mode=ApprovalMode.AUTO,
        conditions="{}",
    )
    db_session.add(ritual)
    await db_session.flush()

    service = RitualService(db_session)
    assert service._evaluate_conditions(ritual, issue) is True


@pytest.mark.asyncio
async def test_evaluate_conditions_invalid_key_format(db_session, test_project, test_user):
    """_evaluate_conditions returns False for malformed condition key (covers L501)."""
    from app.services.ritual_service import RitualService
    from app.models.issue import Issue
    from sqlalchemy import select
    from sqlalchemy.orm import selectinload

    issue = Issue(
        project_id=test_project.id,
        title="Test Issue 2",
        identifier="TST-2",
        number=2,
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.flush()

    # Re-fetch with labels eagerly loaded
    result = await db_session.execute(
        select(Issue).options(selectinload(Issue.labels)).where(Issue.id == issue.id)
    )
    issue = result.scalar_one()

    ritual = Ritual(
        project_id=test_project.id,
        name="bad-cond",
        prompt="test",
        trigger=RitualTrigger.TICKET_CLOSE,
        approval_mode=ApprovalMode.AUTO,
        conditions='{"badkey": 1}',
    )
    db_session.add(ritual)
    await db_session.flush()

    service = RitualService(db_session)
    assert service._evaluate_conditions(ritual, issue) is False


@pytest.mark.asyncio
async def test_pending_ticket_rituals_issue_not_found(db_session, test_project):
    """get_pending_ticket_rituals returns empty for non-existent issue (covers L574)."""
    from app.services.ritual_service import RitualService

    service = RitualService(db_session)
    result = await service.get_pending_ticket_rituals(test_project.id, "nonexistent-issue")
    assert result == []


@pytest.mark.asyncio
async def test_is_ritual_pending_gate_mode(db_session):
    """_is_ritual_pending returns True for GATE mode without approval (covers L427)."""
    from app.services.ritual_service import RitualService

    ritual = Ritual(
        project_id="p1",
        name="gate-test",
        prompt="test",
        trigger=RitualTrigger.EVERY_SPRINT,
        approval_mode=ApprovalMode.GATE,
    )

    # Attestation without approval
    attestation = RitualAttestation(
        ritual_id="r1",
        sprint_id="s1",
        attested_by="u1",
        attested_at=datetime.datetime.now(datetime.timezone.utc),
        approved_at=None,
    )

    service = RitualService(db_session)
    assert service._is_ritual_pending(ritual, attestation) is True


@pytest.mark.asyncio
async def test_pending_gate_rituals_issue_not_found(db_session, test_project):
    """get_pending_claim_rituals returns empty for non-existent issue (covers L623)."""
    from app.services.ritual_service import RitualService

    service = RitualService(db_session)
    result = await service.get_pending_claim_rituals(test_project.id, "nonexistent-issue")
    assert result == []


@pytest.mark.asyncio
async def test_select_random_one_no_seed(db_session):
    """_select_random_one works without seed (covers L350)."""
    from app.services.ritual_service import RitualService

    r1 = Ritual(id="r1", project_id="p1", name="a", prompt="p", trigger=RitualTrigger.EVERY_SPRINT, approval_mode=ApprovalMode.AUTO, weight=1.0)
    r2 = Ritual(id="r2", project_id="p1", name="b", prompt="p", trigger=RitualTrigger.EVERY_SPRINT, approval_mode=ApprovalMode.AUTO, weight=1.0)

    service = RitualService(db_session)
    result = service._select_random_one([r1, r2], seed=None)
    assert result in [r1, r2]


@pytest.mark.asyncio
async def test_select_round_robin_empty(db_session):
    """_select_round_robin returns None for empty list (covers L368)."""
    from app.services.ritual_service import RitualService
    from app.models.ritual import RitualGroup, SelectionMode

    group = RitualGroup(id="g1", project_id="p1", name="rr", selection_mode=SelectionMode.ROUND_ROBIN)

    service = RitualService(db_session)
    result = await service._select_round_robin(group, [], sprint_id="s1")
    assert result is None


@pytest.mark.asyncio
async def test_select_percentage_no_seed(db_session):
    """_select_by_percentage works without seed (covers L410-411)."""
    from app.services.ritual_service import RitualService

    r1 = Ritual(id="r1", project_id="p1", name="a", prompt="p", trigger=RitualTrigger.EVERY_SPRINT, approval_mode=ApprovalMode.AUTO, percentage=100.0)

    service = RitualService(db_session)
    result = service._select_by_percentage([r1], seed=None)
    assert r1 in result


@pytest.mark.asyncio
async def test_apply_group_selection_deleted_group(db_session):
    """_apply_group_selection includes all rituals when group is deleted (covers L305-306)."""
    from app.services.ritual_service import RitualService

    # Ritual references a non-existent group_id
    r1 = Ritual(
        id="r1", project_id="p1", name="orphan", prompt="p",
        trigger=RitualTrigger.EVERY_SPRINT, approval_mode=ApprovalMode.AUTO,
        group_id="deleted-group-id", is_active=True,
    )

    service = RitualService(db_session)
    result = await service._apply_group_selection([r1], sprint_id="s1")
    # Orphaned rituals from deleted groups should be included
    assert r1 in result


@pytest.mark.asyncio
async def test_apply_group_selection_no_active_rituals(db_session, test_project):
    """_apply_group_selection skips groups where all rituals are inactive (covers L311)."""
    from app.services.ritual_service import RitualService
    from app.models.ritual import RitualGroup, SelectionMode

    group = RitualGroup(
        id="g-inactive", project_id=test_project.id, name="inactive-group",
        selection_mode=SelectionMode.RANDOM_ONE,
    )
    db_session.add(group)
    await db_session.flush()

    r1 = Ritual(
        id="r-inactive", project_id=test_project.id, name="inactive", prompt="p",
        trigger=RitualTrigger.EVERY_SPRINT, approval_mode=ApprovalMode.AUTO,
        group_id=group.id, is_active=False,
    )

    service = RitualService(db_session)
    result = await service._apply_group_selection([r1], sprint_id="s1")
    # Inactive rituals should be skipped, result should be empty
    assert result == []
