"""Tests for ritual API edge cases and access control (CHT-886).

Covers uncovered lines in rituals.py: group management, attestation flows,
ritual CRUD access control. All via HTTP client.
"""
import pytest
import pytest_asyncio
from app.models.team import Team, TeamMember, TeamRole
from app.models.project import Project
from app.models.user import User
from app.models.ritual import Ritual, RitualTrigger, ApprovalMode
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
        return data["id"]

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
