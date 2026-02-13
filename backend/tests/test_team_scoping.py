"""Tests for cross-service team scoping (CHT-804).

Verifies that:
- Service methods filter by team_id when provided
- Cross-team operations are rejected
- API endpoints enforce project/team access on comment update/delete
"""
import pytest
import pytest_asyncio
from app.services.issue_service import IssueService
from app.services.document_service import DocumentService
from app.models.issue import Issue, IssueComment, IssueRelation, IssueRelationType
from app.models.project import Project
from app.models.document import Document
from app.models.team import Team, TeamMember, TeamRole


@pytest_asyncio.fixture
async def other_team(db_session, test_user):
    """Create a second team with a project and issue."""
    team = Team(name="Other Team", key="OTHER", description="Another team")
    db_session.add(team)
    await db_session.flush()

    member = TeamMember(team_id=team.id, user_id=test_user.id, role=TeamRole.OWNER)
    db_session.add(member)

    project = Project(
        team_id=team.id,
        name="Other Project",
        key="OTH",
        description="Other project",
        color="#ff0000",
    )
    db_session.add(project)
    await db_session.flush()

    project.issue_count = 1
    issue = Issue(
        project_id=project.id,
        identifier="OTH-1",
        number=1,
        title="Other Issue",
        description="An issue in another team",
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(team)
    await db_session.refresh(project)
    await db_session.refresh(issue)
    return {"team": team, "project": project, "issue": issue}


class TestGetByIdentifierTeamScoping:
    """Tests for IssueService.get_by_identifier() with team_id filter."""

    @pytest.mark.asyncio
    async def test_get_by_identifier_with_team_id(
        self, db_session, test_issue, test_team
    ):
        """Verifies team-scoped lookup returns same-team issues."""
        service = IssueService(db_session)
        result = await service.get_by_identifier(
            test_issue.identifier, team_id=test_team.id
        )
        assert result is not None
        assert result.id == test_issue.id

    @pytest.mark.asyncio
    async def test_get_by_identifier_with_wrong_team_id(
        self, db_session, test_issue, other_team
    ):
        """Verifies cross-team lookup returns None."""
        service = IssueService(db_session)
        result = await service.get_by_identifier(
            test_issue.identifier, team_id=other_team["team"].id
        )
        assert result is None


class TestListRelationsTeamScoping:
    """Tests for IssueService.list_relations() with team_id filter."""

    @pytest.mark.asyncio
    async def test_list_relations_filters_cross_team(
        self, db_session, test_issue, test_team, other_team
    ):
        """Verifies cross-team relations are hidden when team_id is provided."""
        # Create a cross-team relation directly in the DB
        relation = IssueRelation(
            issue_id=test_issue.id,
            related_issue_id=other_team["issue"].id,
            relation_type=IssueRelationType.RELATES_TO,
        )
        db_session.add(relation)
        await db_session.commit()

        service = IssueService(db_session)

        # Without team filter, the relation is visible
        all_relations = await service.list_relations(test_issue.id)
        assert len(all_relations) == 1

        # With team filter, the cross-team relation is hidden
        filtered = await service.list_relations(
            test_issue.id, team_id=test_team.id
        )
        assert len(filtered) == 0


class TestLinkIssueCrossTeamValidation:
    """Tests for DocumentService.link_issue() cross-team rejection."""

    @pytest.mark.asyncio
    async def test_link_issue_rejects_cross_team(
        self, db_session, test_document, other_team
    ):
        """Verifies cross-team document-issue link is rejected."""
        service = DocumentService(db_session)
        with pytest.raises(ValueError, match="different teams"):
            await service.link_issue(test_document.id, other_team["issue"].id)

    @pytest.mark.asyncio
    async def test_link_issue_allows_same_team(
        self, db_session, test_document, test_issue
    ):
        """Verifies same-team document-issue link succeeds."""
        service = DocumentService(db_session)
        await service.link_issue(test_document.id, test_issue.id)
        # Verify it was created
        linked = await service.get_linked_issues(test_document.id)
        assert any(i.id == test_issue.id for i in linked)


class TestIssueCommentAuthChecks:
    """Tests for project access checks on issue comment update/delete."""

    @pytest.mark.asyncio
    async def test_update_comment_requires_project_access(
        self, client, auth_headers2, test_issue, db_session, test_user, test_user2
    ):
        """403 for user not in the project's team."""
        comment = IssueComment(
            issue_id=test_issue.id,
            author_id=test_user2.id,
            content="A comment",
        )
        db_session.add(comment)
        await db_session.commit()
        await db_session.refresh(comment)

        response = await client.patch(
            f"/api/issues/{test_issue.id}/comments/{comment.id}",
            headers=auth_headers2,
            json={"content": "Updated"},
        )
        assert response.status_code == 403

    @pytest.mark.asyncio
    async def test_delete_comment_requires_project_access(
        self, client, auth_headers2, test_issue, db_session, test_user, test_user2
    ):
        """403 for user not in the project's team."""
        comment = IssueComment(
            issue_id=test_issue.id,
            author_id=test_user2.id,
            content="A comment",
        )
        db_session.add(comment)
        await db_session.commit()
        await db_session.refresh(comment)

        response = await client.delete(
            f"/api/issues/{test_issue.id}/comments/{comment.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403


class TestDocumentCommentAuthChecks:
    """Tests for team access checks on document comment update/delete."""

    @pytest.mark.asyncio
    async def test_update_document_comment_requires_team_access(
        self, client, db_session, test_user2, auth_headers2, other_team
    ):
        """403 for user not in the document's team."""
        # Create a document in other_team that test_user2 is NOT a member of
        # (other_team only has test_user as owner)
        doc = Document(
            team_id=other_team["team"].id,
            author_id=test_user2.id,
            title="Other Doc",
            content="Content",
        )
        db_session.add(doc)
        await db_session.flush()

        from app.models.document import DocumentComment
        comment = DocumentComment(
            document_id=doc.id,
            author_id=test_user2.id,
            content="A comment",
        )
        db_session.add(comment)
        await db_session.commit()
        await db_session.refresh(doc)
        await db_session.refresh(comment)

        response = await client.patch(
            f"/api/documents/{doc.id}/comments/{comment.id}",
            headers=auth_headers2,
            json={"content": "Updated"},
        )
        assert response.status_code == 403

    @pytest.mark.asyncio
    async def test_delete_document_comment_requires_team_access(
        self, client, db_session, test_user2, auth_headers2, other_team
    ):
        """403 for user not in the document's team."""
        doc = Document(
            team_id=other_team["team"].id,
            author_id=test_user2.id,
            title="Other Doc 2",
            content="Content",
        )
        db_session.add(doc)
        await db_session.flush()

        from app.models.document import DocumentComment
        comment = DocumentComment(
            document_id=doc.id,
            author_id=test_user2.id,
            content="A comment",
        )
        db_session.add(comment)
        await db_session.commit()
        await db_session.refresh(doc)
        await db_session.refresh(comment)

        response = await client.delete(
            f"/api/documents/{doc.id}/comments/{comment.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403
