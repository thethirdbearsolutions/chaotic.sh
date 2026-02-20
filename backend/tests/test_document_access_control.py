"""Tests for document access control on project-scoped documents (CHT-886).

These tests cover the uncovered access-control branches in documents.py where
a document has a project_id and the requesting user lacks project access.
All tests use HTTP client only — no direct ORM assertions.
"""
import pytest
import pytest_asyncio
from app.models.team import Team, TeamMember
from app.models.project import Project
from app.models.document import Document, DocumentComment
from app.models.issue import Issue, Label
from app.models.user import User
from app.enums import TeamRole
from app.utils.security import get_password_hash, create_access_token


@pytest_asyncio.fixture
async def other_team(db_session):
    """Team that test_user is NOT a member of."""
    team = Team(name="Other Team", key="OTHER", description="Other team")
    db_session.add(team)
    await db_session.commit()
    await db_session.refresh(team)
    return team


@pytest_asyncio.fixture
async def other_user(db_session, other_team):
    """User on other_team (not test_user's team)."""
    user = User(
        email="other@example.com",
        hashed_password=get_password_hash("testpassword123"),
        name="Other User",
    )
    db_session.add(user)
    await db_session.flush()
    member = TeamMember(team_id=other_team.id, user_id=user.id, role=TeamRole.OWNER)
    db_session.add(member)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest_asyncio.fixture
async def other_auth_headers(other_user):
    """Auth headers for other_user (not on test_team)."""
    token = create_access_token(data={"sub": other_user.id})
    return {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def project_document(db_session, test_team, test_project, test_user):
    """Document scoped to test_project."""
    doc = Document(
        team_id=test_team.id,
        project_id=test_project.id,
        author_id=test_user.id,
        title="Project Doc",
        content="Content",
    )
    db_session.add(doc)
    await db_session.commit()
    await db_session.refresh(doc)
    return doc


@pytest_asyncio.fixture
async def project_document_comment(db_session, project_document, test_user):
    """Comment on the project-scoped document."""
    comment = DocumentComment(
        document_id=project_document.id,
        author_id=test_user.id,
        content="A comment",
    )
    db_session.add(comment)
    await db_session.commit()
    await db_session.refresh(comment)
    return comment


@pytest_asyncio.fixture
async def project_issue(db_session, test_project, test_user):
    """Issue in test_project for linking tests."""
    test_project.issue_count += 1
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count,
        title="Link Target Issue",
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)
    return issue


@pytest_asyncio.fixture
async def project_label(db_session, test_team):
    """Label on test_team for labeling tests."""
    label = Label(
        team_id=test_team.id,
        name="Access Test Label",
        color="#ff0000",
    )
    db_session.add(label)
    await db_session.commit()
    await db_session.refresh(label)
    return label


@pytest.mark.asyncio
class TestDocumentProjectAccessControl:
    """Test that project-scoped documents deny access to non-members."""

    async def test_get_project_document_unauthorized(
        self, client, other_auth_headers, project_document
    ):
        """GET /documents/{id} returns 403 for non-member on project-scoped doc."""
        response = await client.get(
            f"/api/documents/{project_document.id}",
            headers=other_auth_headers,
        )
        assert response.status_code == 403

    async def test_update_project_document_unauthorized(
        self, client, other_auth_headers, project_document
    ):
        """PATCH /documents/{id} returns 403 for non-member."""
        response = await client.patch(
            f"/api/documents/{project_document.id}",
            headers=other_auth_headers,
            json={"title": "Hacked"},
        )
        assert response.status_code == 403

    async def test_get_document_issues_unauthorized(
        self, client, other_auth_headers, project_document
    ):
        """GET /documents/{id}/issues returns 403 for non-member."""
        response = await client.get(
            f"/api/documents/{project_document.id}/issues",
            headers=other_auth_headers,
        )
        assert response.status_code == 403

    async def test_link_document_to_issue_unauthorized(
        self, client, other_auth_headers, project_document, project_issue
    ):
        """POST /documents/{id}/issues/{issue_id} returns 403 for non-member."""
        response = await client.post(
            f"/api/documents/{project_document.id}/issues/{project_issue.id}",
            headers=other_auth_headers,
        )
        assert response.status_code == 403

    async def test_unlink_document_from_issue_unauthorized(
        self, client, other_auth_headers, project_document, project_issue
    ):
        """DELETE /documents/{id}/issues/{issue_id} returns 403 for non-member."""
        response = await client.delete(
            f"/api/documents/{project_document.id}/issues/{project_issue.id}",
            headers=other_auth_headers,
        )
        assert response.status_code == 403

    async def test_get_document_labels_unauthorized(
        self, client, other_auth_headers, project_document
    ):
        """GET /documents/{id}/labels returns 403 for non-member."""
        response = await client.get(
            f"/api/documents/{project_document.id}/labels",
            headers=other_auth_headers,
        )
        assert response.status_code == 403

    async def test_add_label_to_document_unauthorized(
        self, client, other_auth_headers, project_document, project_label
    ):
        """POST /documents/{id}/labels/{label_id} returns 403 for non-member."""
        response = await client.post(
            f"/api/documents/{project_document.id}/labels/{project_label.id}",
            headers=other_auth_headers,
        )
        assert response.status_code == 403

    async def test_remove_label_from_document_unauthorized(
        self, client, other_auth_headers, project_document, project_label
    ):
        """DELETE /documents/{id}/labels/{label_id} returns 403 for non-member."""
        response = await client.delete(
            f"/api/documents/{project_document.id}/labels/{project_label.id}",
            headers=other_auth_headers,
        )
        assert response.status_code == 403

    async def test_create_comment_unauthorized(
        self, client, other_auth_headers, project_document
    ):
        """POST /documents/{id}/comments returns 403 for non-member."""
        response = await client.post(
            f"/api/documents/{project_document.id}/comments",
            headers=other_auth_headers,
            json={"content": "Unauthorized comment"},
        )
        assert response.status_code == 403

    async def test_list_comments_unauthorized(
        self, client, other_auth_headers, project_document
    ):
        """GET /documents/{id}/comments returns 403 for non-member."""
        response = await client.get(
            f"/api/documents/{project_document.id}/comments",
            headers=other_auth_headers,
        )
        assert response.status_code == 403

    async def test_update_comment_unauthorized(
        self, client, other_auth_headers, project_document, project_document_comment
    ):
        """PATCH /documents/{id}/comments/{comment_id} returns 403 for non-member."""
        response = await client.patch(
            f"/api/documents/{project_document.id}/comments/{project_document_comment.id}",
            headers=other_auth_headers,
            json={"content": "Hacked comment"},
        )
        assert response.status_code == 403

    async def test_delete_comment_unauthorized(
        self, client, other_auth_headers, project_document, project_document_comment
    ):
        """DELETE /documents/{id}/comments/{comment_id} returns 403 for non-member."""
        response = await client.delete(
            f"/api/documents/{project_document.id}/comments/{project_document_comment.id}",
            headers=other_auth_headers,
        )
        assert response.status_code == 403

    async def test_delete_document_unauthorized(
        self, client, other_auth_headers, project_document
    ):
        """DELETE /documents/{id} denies non-team-member."""
        response = await client.delete(
            f"/api/documents/{project_document.id}",
            headers=other_auth_headers,
        )
        # Should be 403 — non-member cannot delete
        assert response.status_code in (403, 404)

    async def test_get_document_unauthenticated(self, client, project_document):
        """GET /documents/{id} returns 401 without auth headers."""
        response = await client.get(
            f"/api/documents/{project_document.id}",
        )
        assert response.status_code == 401


@pytest.mark.asyncio
class TestDocumentListAccessControl:
    """Test access control on document listing with project/sprint filters."""

    async def test_list_documents_by_project_non_member(
        self, client, other_auth_headers, test_team, test_project
    ):
        """GET /documents?project_id=... returns 403 for non-team-member."""
        response = await client.get(
            f"/api/documents?team_id={test_team.id}&project_id={test_project.id}",
            headers=other_auth_headers,
        )
        # Team-level check rejects before project-level check is reached
        assert response.status_code == 403

    async def test_list_documents_by_sprint_non_member(
        self, client, other_auth_headers, test_team, test_sprint
    ):
        """GET /documents?sprint_id=... returns 403 for non-team-member."""
        response = await client.get(
            f"/api/documents?team_id={test_team.id}&sprint_id={test_sprint.id}",
            headers=other_auth_headers,
        )
        # Team-level check rejects before sprint-level check is reached
        assert response.status_code == 403


@pytest.mark.asyncio
class TestDocumentUpdateValidation:
    """Test document update validation edge cases."""

    async def test_update_document_cross_project_sprint(
        self, client, auth_headers, db_session, test_team, test_project, project_document
    ):
        """PATCH /documents/{id} with sprint from different project returns 400."""
        # Create another project in same team with its own sprint
        project2 = Project(
            team_id=test_team.id,
            name="Project 2",
            key="PRJ2",
            description="Second project",
            color="#00ff00",
        )
        db_session.add(project2)
        await db_session.flush()

        from app.models.sprint import Sprint
        sprint2 = Sprint(
            project_id=project2.id,
            name="Other Sprint",
        )
        db_session.add(sprint2)
        await db_session.commit()
        await db_session.refresh(sprint2)

        # Try to set sprint from project2 on a doc scoped to test_project
        response = await client.patch(
            f"/api/documents/{project_document.id}",
            headers=auth_headers,
            json={"sprint_id": sprint2.id},
        )
        assert response.status_code == 400
        assert "Sprint must belong to the document's project" in response.json()["detail"]
