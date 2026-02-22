"""Tests to close remaining small coverage gaps (CHT-956).

Covers: api/documents.py branch misses, api/deps.py auth method detection,
api/sprints.py current sprint edge case, schemas/ritual.py validators.
"""
import pytest
import pytest_asyncio
from datetime import datetime, timezone
from app.oxyde_models.document import OxydeDocument
from app.schemas.ritual import RitualCreate, CompletedRitualResponse, PendingRitualResponse


# === schemas/ritual.py validator coverage ===

_NOW = datetime(2026, 1, 1, tzinfo=timezone.utc)

COMPLETED_RITUAL_BASE = {
    "id": "test-id", "project_id": "proj-1", "name": "test",
    "prompt": "test prompt", "trigger": "every_sprint",
    "approval_mode": "auto",
    "created_at": _NOW, "updated_at": _NOW,
    "attestation": {"id": "att-1", "ritual_id": "r1", "sprint_id": "s1", "issue_id": None,
                    "attested_by": "u1", "attested_by_name": "User",
                    "attested_at": _NOW, "note": "ok",
                    "approved_by": None, "approved_at": None},
}

PENDING_RITUAL_BASE = {
    "id": "test-id", "name": "test", "prompt": "test prompt",
    "approval_mode": "auto", "note_required": True, "attestation": None,
}


class TestRitualSchemaValidators:
    """Cover uncovered schema validator branches."""

    def test_ritual_name_too_long(self):
        """Ritual name > 100 chars should fail validation."""
        with pytest.raises(Exception):
            RitualCreate(name="a" * 101, prompt="test")

    def test_ritual_name_invalid_chars(self):
        """Ritual name with spaces/special chars should fail (line 110-114)."""
        with pytest.raises(Exception):
            RitualCreate(name="bad name!", prompt="test")

    def test_ritual_name_starts_with_hyphen(self):
        """Ritual name starting with hyphen should fail."""
        with pytest.raises(Exception):
            RitualCreate(name="-test", prompt="test")

    def test_completed_ritual_conditions_string_parsing(self):
        """conditions as JSON string in CompletedRitualResponse (line 271-272)."""
        data = {**COMPLETED_RITUAL_BASE, "conditions": '{"status": {"operator": "eq", "value": "done"}}'}
        resp = CompletedRitualResponse(**data)
        assert isinstance(resp.conditions, dict)
        assert resp.conditions["status"]["value"] == "done"

    def test_completed_ritual_conditions_none(self):
        """conditions=None passes through in CompletedRitualResponse (line 269-270)."""
        data = {**COMPLETED_RITUAL_BASE, "conditions": None}
        resp = CompletedRitualResponse(**data)
        assert resp.conditions is None

    def test_completed_ritual_conditions_dict(self):
        """conditions as dict passes through in CompletedRitualResponse (line 273)."""
        data = {**COMPLETED_RITUAL_BASE, "conditions": {"priority": {"operator": "eq", "value": "high"}}}
        resp = CompletedRitualResponse(**data)
        assert resp.conditions["priority"]["value"] == "high"

    def test_pending_ritual_conditions_string_parsing(self):
        """conditions as JSON string in PendingRitualResponse (line 242-243)."""
        data = {**PENDING_RITUAL_BASE, "conditions": '{"priority": {"operator": "eq", "value": "urgent"}}'}
        resp = PendingRitualResponse(**data)
        assert isinstance(resp.conditions, dict)

    def test_pending_ritual_conditions_none(self):
        """conditions=None passes through in PendingRitualResponse (line 240-241)."""
        data = {**PENDING_RITUAL_BASE, "conditions": None}
        resp = PendingRitualResponse(**data)
        assert resp.conditions is None

    def test_pending_ritual_conditions_dict(self):
        """conditions as dict passes through in PendingRitualResponse (line 244)."""
        data = {**PENDING_RITUAL_BASE, "conditions": {"status": {"operator": "eq", "value": "done"}}}
        resp = PendingRitualResponse(**data)
        assert resp.conditions["status"]["value"] == "done"


# === api/deps.py auth method detection ===


@pytest.mark.asyncio
class TestAuthMethodDetection:
    """Cover get_auth_method branches (lines 176-181)."""

    async def test_api_key_auth_method(self, client, test_team):
        """Requests with ck_ prefixed tokens detected as api_key auth."""
        response = await client.get(
            "/api/teams",
            headers={"Authorization": "Bearer ck_fake_api_key"},
        )
        assert response.status_code == 401

    async def test_jwt_auth_method(self, client, auth_headers):
        """Regular JWT token detected as jwt auth."""
        response = await client.get("/api/teams", headers=auth_headers)
        assert response.status_code == 200


# === api/documents.py branch coverage ===


@pytest.mark.asyncio
class TestDocumentBranchCoverage:
    """Cover uncovered branches in documents API."""

    async def test_list_documents_by_sprint(self, client, auth_headers, test_team, test_project, test_sprint):
        """List documents filtered by sprint_id (lines 132-147)."""
        response = await client.get(
            f"/api/documents?team_id={test_team.id}&sprint_id={test_sprint.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert isinstance(response.json(), list)

    async def test_list_documents_sprint_not_found(self, client, auth_headers, test_team):
        """List documents with nonexistent sprint returns 404."""
        response = await client.get(
            f"/api/documents?team_id={test_team.id}&sprint_id=00000000-0000-0000-0000-000000000009",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_get_document_no_project(self, client, auth_headers, db, test_team, test_user):
        """Get a team-level document covers else branch (lines 177-182)."""
        doc = await OxydeDocument.objects.create(team_id=test_team.id, author_id=test_user.id, title="Team Doc", content="No project")

        response = await client.get(f"/api/documents/{doc.id}", headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["title"] == "Team Doc"

    async def test_unlink_document_team_level(self, client, auth_headers, db, test_team, test_user, test_issue):
        """Unlink from team-level doc covers else branch (lines 408-413)."""
        doc = await OxydeDocument.objects.create(team_id=test_team.id, author_id=test_user.id, title="Team Doc", content="No project")

        # Link, then unlink
        await client.post(f"/api/documents/{doc.id}/issues/{test_issue.id}", headers=auth_headers)
        response = await client.delete(f"/api/documents/{doc.id}/issues/{test_issue.id}", headers=auth_headers)
        assert response.status_code == 204

    async def test_link_document_issue_not_authorized(self, client, auth_headers2, db, test_team, test_user, test_issue):
        """Link issue when not authorized for issue (line 370)."""
        doc = await OxydeDocument.objects.create(team_id=test_team.id, author_id=test_user.id, title="Team Doc", content="No project")

        response = await client.post(f"/api/documents/{doc.id}/issues/{test_issue.id}", headers=auth_headers2)
        assert response.status_code == 403

    async def test_update_document_move_project(self, client, auth_headers, db, test_team, test_user, test_project):
        """Update doc moving to project covers lines 219-225."""
        doc = await OxydeDocument.objects.create(team_id=test_team.id, author_id=test_user.id, title="Moveable Doc", content="Will move")

        response = await client.patch(f"/api/documents/{doc.id}", headers=auth_headers, json={"project_id": test_project.id})
        assert response.status_code == 200
        assert response.json()["project_id"] == test_project.id


# === api/sprints.py current sprint edge case ===


@pytest.mark.asyncio
class TestSprintCurrentEdgeCase:
    """Cover ensure_sprints_exist call (line 70-71)."""

    async def test_current_sprint_creates_sprints(self, client, auth_headers, test_project):
        """GET /sprints/current creates sprints if none exist."""
        response = await client.get(
            f"/api/sprints/current?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert "name" in response.json()
