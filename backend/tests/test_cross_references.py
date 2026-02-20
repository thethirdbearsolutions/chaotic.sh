"""Tests for issue cross-reference auto-linking (CHT-133).

When an issue description or comment mentions another issue by identifier
(e.g., CHT-123), a 'relates_to' link should be automatically created.
"""
import pytest
import pytest_asyncio
from app.services.issue_service import IssueService
from app.models.issue import Issue
from app.models.project import Project
from app.models.team import Team, TeamMember
from app.enums import IssueRelationType, TeamRole


@pytest_asyncio.fixture
async def issue_service(db_session):
    """Create an IssueService instance."""
    return IssueService(db_session)


@pytest_asyncio.fixture
async def second_issue(db_session, test_project, test_user):
    """Create a second test issue."""
    test_project.issue_count += 1
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count,
        title="Second Issue",
        description="Another issue",
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)
    return issue


@pytest_asyncio.fixture
async def third_issue(db_session, test_project, test_user):
    """Create a third test issue."""
    test_project.issue_count += 1
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count,
        title="Third Issue",
        description="Yet another issue",
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)
    return issue


class TestCreateCrossReferences:
    """Tests for IssueService.create_cross_references()."""

    @pytest.mark.asyncio
    async def test_creates_relates_to_link(self, issue_service, test_issue, second_issue):
        """Mentioning an issue identifier creates a relates_to relation."""
        text = f"This is related to {second_issue.identifier}"
        relations = await issue_service.create_cross_references(test_issue.id, text)

        assert len(relations) == 1
        assert relations[0].issue_id == test_issue.id
        assert relations[0].related_issue_id == second_issue.id
        assert relations[0].relation_type == IssueRelationType.RELATES_TO

    @pytest.mark.asyncio
    async def test_multiple_references(self, issue_service, test_issue, second_issue, third_issue):
        """Multiple identifiers in text create multiple relations."""
        text = f"See {second_issue.identifier} and {third_issue.identifier}"
        relations = await issue_service.create_cross_references(test_issue.id, text)

        assert len(relations) == 2
        related_ids = {r.related_issue_id for r in relations}
        assert second_issue.id in related_ids
        assert third_issue.id in related_ids

    @pytest.mark.asyncio
    async def test_skips_self_reference(self, issue_service, test_issue):
        """Mentioning the source issue's own identifier should not create a relation."""
        text = f"Updated {test_issue.identifier} to fix the bug"
        relations = await issue_service.create_cross_references(test_issue.id, text)

        assert len(relations) == 0

    @pytest.mark.asyncio
    async def test_skips_nonexistent_identifier(self, issue_service, test_issue):
        """Mentioning a non-existent identifier should not create a relation."""
        text = "See FAKE-999 for details"
        relations = await issue_service.create_cross_references(test_issue.id, text)

        assert len(relations) == 0

    @pytest.mark.asyncio
    async def test_skips_duplicate_relation(self, issue_service, test_issue, second_issue):
        """Should not create a duplicate relation if one already exists."""
        text = f"Related to {second_issue.identifier}"
        relations1 = await issue_service.create_cross_references(test_issue.id, text)
        assert len(relations1) == 1

        # Same reference again should be skipped
        relations2 = await issue_service.create_cross_references(test_issue.id, text)
        assert len(relations2) == 0

    @pytest.mark.asyncio
    async def test_skips_reverse_duplicate(self, issue_service, test_issue, second_issue):
        """Should not create A->B if B->A already exists."""
        # Create B -> A first
        text1 = f"Related to {test_issue.identifier}"
        await issue_service.create_cross_references(second_issue.id, text1)

        # Now A -> B should be skipped
        text2 = f"Related to {second_issue.identifier}"
        relations = await issue_service.create_cross_references(test_issue.id, text2)
        assert len(relations) == 0

    @pytest.mark.asyncio
    async def test_case_insensitive(self, issue_service, test_issue, second_issue):
        """Lowercase identifiers should still match."""
        text = f"see {second_issue.identifier.lower()} for context"
        relations = await issue_service.create_cross_references(test_issue.id, text)

        assert len(relations) == 1

    @pytest.mark.asyncio
    async def test_empty_text(self, issue_service, test_issue):
        """Empty or None text should return empty list."""
        assert await issue_service.create_cross_references(test_issue.id, "") == []
        assert await issue_service.create_cross_references(test_issue.id, None) == []

    @pytest.mark.asyncio
    async def test_no_identifiers_in_text(self, issue_service, test_issue):
        """Text without identifiers should return empty list."""
        text = "Just a plain comment with no references"
        relations = await issue_service.create_cross_references(test_issue.id, text)
        assert len(relations) == 0

    @pytest.mark.asyncio
    async def test_duplicate_mentions_only_creates_one(self, issue_service, test_issue, second_issue):
        """Same identifier mentioned twice should only create one relation."""
        text = f"{second_issue.identifier} is mentioned again: {second_issue.identifier}"
        relations = await issue_service.create_cross_references(test_issue.id, text)

        assert len(relations) == 1

    @pytest.mark.asyncio
    async def test_skips_cross_team_reference(self, db_session, issue_service, test_issue, test_user):
        """Mentioning an issue from another team should not create a relation."""
        # Create a second team and project
        other_team = Team(name="Other Team", key="OTHER", description="Another team")
        db_session.add(other_team)
        await db_session.flush()

        other_member = TeamMember(team_id=other_team.id, user_id=test_user.id, role=TeamRole.OWNER)
        db_session.add(other_member)

        other_project = Project(
            team_id=other_team.id,
            name="Secret Project",
            key="SEC",
            description="A secret project",
            color="#ff0000",
        )
        db_session.add(other_project)
        await db_session.flush()

        other_project.issue_count = 1
        other_issue = Issue(
            project_id=other_project.id,
            identifier="SEC-1",
            number=1,
            title="Secret Issue",
            description="Top secret",
            creator_id=test_user.id,
        )
        db_session.add(other_issue)
        await db_session.commit()
        await db_session.refresh(other_issue)

        # Reference the other team's issue — should be silently ignored
        text = f"See {other_issue.identifier} for details"
        relations = await issue_service.create_cross_references(test_issue.id, text)

        assert len(relations) == 0


class TestCrossReferencesViaApi:
    """Integration tests for cross-references via API endpoints."""

    @pytest.mark.asyncio
    async def test_comment_creates_cross_reference(self, client, auth_headers, test_issue, second_issue):
        """Creating a comment with an issue reference should auto-link."""
        response = await client.post(
            f"/api/issues/{test_issue.id}/comments",
            json={"content": f"This is related to {second_issue.identifier}"},
            headers=auth_headers,
        )
        assert response.status_code == 201

        # Check that the relation was created
        rel_response = await client.get(
            f"/api/issues/{test_issue.id}/relations",
            headers=auth_headers,
        )
        assert rel_response.status_code == 200
        relations = rel_response.json()
        assert len(relations) == 1
        assert relations[0]["related_issue_identifier"] == second_issue.identifier
        assert relations[0]["relation_type"] == "relates_to"

    @pytest.mark.asyncio
    async def test_issue_create_with_description_reference(self, client, auth_headers, test_project, second_issue):
        """Creating an issue with a reference in the description should auto-link."""
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            json={
                "title": "New Issue",
                "description": f"Follow-up to {second_issue.identifier}",
            },
            headers=auth_headers,
        )
        assert response.status_code == 201
        new_issue_id = response.json()["id"]

        # Check that the relation was created
        rel_response = await client.get(
            f"/api/issues/{new_issue_id}/relations",
            headers=auth_headers,
        )
        assert rel_response.status_code == 200
        relations = rel_response.json()
        assert len(relations) == 1
        assert relations[0]["related_issue_identifier"] == second_issue.identifier

    @pytest.mark.asyncio
    async def test_issue_update_description_creates_reference(self, client, auth_headers, test_issue, second_issue):
        """Updating an issue description with a reference should auto-link."""
        response = await client.patch(
            f"/api/issues/{test_issue.id}",
            json={"description": f"Now references {second_issue.identifier}"},
            headers=auth_headers,
        )
        assert response.status_code == 200

        # Check that the relation was created
        rel_response = await client.get(
            f"/api/issues/{test_issue.id}/relations",
            headers=auth_headers,
        )
        assert rel_response.status_code == 200
        relations = rel_response.json()
        assert len(relations) == 1
        assert relations[0]["related_issue_identifier"] == second_issue.identifier
