"""Tests for UTC timestamp enforcement across all API endpoints (CHT-412).

Verifies that the DateTimeUTC type annotation ensures all datetime fields
in API responses include UTC timezone info, even when the database returns
naive (timezone-unaware) datetimes (as SQLite does).
"""
import pytest
from datetime import datetime, timezone


def _has_utc_indicator(timestamp_str: str) -> bool:
    """Check if an ISO 8601 timestamp string includes UTC timezone info."""
    return timestamp_str.endswith("Z") or "+00:00" in timestamp_str


class TestEnsureUtc:
    """Unit tests for the ensure_utc helper."""

    def test_naive_datetime_gets_utc(self):
        """Naive datetime gets UTC timezone attached."""
        from app.utils import ensure_utc
        naive = datetime(2026, 1, 15, 10, 30, 0)
        result = ensure_utc(naive)
        assert result.tzinfo == timezone.utc
        assert result.year == 2026

    def test_aware_datetime_unchanged(self):
        """Already-aware datetime passes through unchanged."""
        from app.utils import ensure_utc
        aware = datetime(2026, 1, 15, 10, 30, 0, tzinfo=timezone.utc)
        result = ensure_utc(aware)
        assert result is aware

    def test_none_returns_none(self):
        """None input returns None."""
        from app.utils import ensure_utc
        assert ensure_utc(None) is None


class TestDateTimeUTCType:
    """Tests that DateTimeUTC Pydantic type enforces UTC on response schemas."""

    def test_issue_response_enforces_utc(self):
        """IssueResponse converts naive datetimes to UTC."""
        from app.schemas.issue import IssueResponse
        naive = datetime(2026, 1, 15, 10, 30, 0)
        resp = IssueResponse(
            id="i-1", project_id="p-1", identifier="TST-1", number=1,
            title="Test", description=None, status="backlog",
            priority="medium", issue_type="task", estimate=None,
            assignee_id=None, creator_id="u-1", sprint_id=None,
            parent_id=None, due_date=None, completed_at=None,
            created_at=naive, updated_at=naive,
        )
        assert resp.created_at.tzinfo == timezone.utc
        assert resp.updated_at.tzinfo == timezone.utc

    def test_team_response_enforces_utc(self):
        """TeamResponse converts naive datetimes to UTC."""
        from app.schemas.team import TeamResponse
        naive = datetime(2026, 1, 15, 10, 30, 0)
        resp = TeamResponse(
            id="t-1", name="Test", key="TST", description=None,
            logo_url=None, created_at=naive, updated_at=naive,
        )
        assert resp.created_at.tzinfo == timezone.utc
        assert resp.updated_at.tzinfo == timezone.utc

    def test_sprint_response_enforces_utc(self):
        """SprintResponse converts naive datetimes to UTC."""
        from app.schemas.sprint import SprintResponse
        naive = datetime(2026, 1, 15, 10, 30, 0)
        resp = SprintResponse(
            id="s-1", project_id="p-1", name="Sprint 1",
            description=None, status="active",
            start_date=naive, end_date=naive,
            budget=None, points_spent=0,
            token_budget=None, tokens_spent=0,
            limbo=False, created_at=naive, updated_at=naive,
        )
        assert resp.created_at.tzinfo == timezone.utc
        assert resp.start_date.tzinfo == timezone.utc
        assert resp.end_date.tzinfo == timezone.utc

    def test_user_response_enforces_utc(self):
        """UserResponse converts naive datetimes to UTC."""
        from app.schemas.user import UserResponse
        naive = datetime(2026, 1, 15, 10, 30, 0)
        resp = UserResponse(
            id="u-1", email="test@test.com", name="Test",
            avatar_url=None, is_active=True,
            created_at=naive, updated_at=naive,
        )
        assert resp.created_at.tzinfo == timezone.utc

    def test_api_key_response_enforces_utc(self):
        """APIKeyResponse converts naive datetimes to UTC."""
        from app.schemas.api_key import APIKeyResponse
        naive = datetime(2026, 1, 15, 10, 30, 0)
        resp = APIKeyResponse(
            id="k-1", name="test-key", key_prefix="ck_",
            created_at=naive, last_used_at=naive, expires_at=naive,
            is_active=True,
        )
        assert resp.created_at.tzinfo == timezone.utc
        assert resp.last_used_at.tzinfo == timezone.utc
        assert resp.expires_at.tzinfo == timezone.utc

    def test_ritual_attestation_response_enforces_utc(self):
        """RitualAttestationResponse converts naive datetimes to UTC."""
        from app.schemas.ritual import RitualAttestationResponse
        naive = datetime(2026, 1, 15, 10, 30, 0)
        resp = RitualAttestationResponse(
            id="a-1", ritual_id="r-1", sprint_id="s-1",
            issue_id=None, attested_by="u-1",
            attested_at=naive, note=None,
            approved_by=None, approved_at=naive,
        )
        assert resp.attested_at.tzinfo == timezone.utc
        assert resp.approved_at.tzinfo == timezone.utc

    def test_nullable_datetime_none_ok(self):
        """None values for nullable DateTimeUTC fields work."""
        from app.schemas.api_key import APIKeyResponse
        naive = datetime(2026, 1, 15, 10, 30, 0)
        resp = APIKeyResponse(
            id="k-1", name="test-key", key_prefix="ck_",
            created_at=naive, last_used_at=None, expires_at=None,
            is_active=True,
        )
        assert resp.last_used_at is None
        assert resp.expires_at is None


class TestTimestampJsonSerialization:
    """Integration tests: verify JSON output includes timezone info."""

    @pytest.mark.asyncio
    async def test_issue_json_has_utc_suffix(
        self, client, auth_headers, test_project, test_user, db
    ):
        """Issue API response JSON includes timezone offset."""
        from app.oxyde_models.issue import OxydeIssue
        test_project.issue_count += 1
        issue = await OxydeIssue.objects.create(
            project_id=test_project.id,
            identifier=f"{test_project.key}-{test_project.issue_count}",
            number=test_project.issue_count,
            title="UTC Test Issue",
            creator_id=test_user.id,
        )

        response = await client.get(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        issues = response.json()
        assert len(issues) >= 1
        utc_issue = next(i for i in issues if i["title"] == "UTC Test Issue")
        # Should include UTC indicator (Z or +00:00)
        assert _has_utc_indicator(utc_issue["created_at"])
        assert _has_utc_indicator(utc_issue["updated_at"])

    @pytest.mark.asyncio
    async def test_team_json_has_utc_suffix(
        self, client, auth_headers, test_team
    ):
        """Team API response JSON includes timezone offset."""
        response = await client.get(
            f"/api/teams/{test_team.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert _has_utc_indicator(data["created_at"])
        assert _has_utc_indicator(data["updated_at"])
