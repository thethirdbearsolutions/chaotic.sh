"""Tests for document API endpoints."""
import pytest
import pytest_asyncio
from app.models.document import Document, DocumentComment
from app.models.team import Team, TeamMember, TeamRole
from app.models.user import User
from app.utils.security import get_password_hash, create_access_token


@pytest.mark.asyncio
class TestDocumentCRUD:
    """Tests for document CRUD operations."""

    async def test_create_document(self, client, auth_headers, test_team):
        """Test creating a document."""
        response = await client.post(
            f"/api/documents?team_id={test_team.id}",
            headers=auth_headers,
            json={
                "title": "Test Document",
                "content": "Test content",
            },
        )
        assert response.status_code == 201
        data = response.json()
        assert data["title"] == "Test Document"
        assert data["content"] == "Test content"
        assert data["team_id"] == test_team.id

    async def test_create_document_not_member(self, client, auth_headers2, test_team):
        """Test creating document when not a team member."""
        response = await client.post(
            f"/api/documents?team_id={test_team.id}",
            headers=auth_headers2,
            json={"title": "Unauthorized", "content": "Test"},
        )
        assert response.status_code == 403

    async def test_create_document_with_project(self, client, auth_headers, test_team, test_project):
        """Test creating document with project association."""
        response = await client.post(
            f"/api/documents?team_id={test_team.id}",
            headers=auth_headers,
            json={
                "title": "Project Doc",
                "content": "Content",
                "project_id": test_project.id,
            },
        )
        assert response.status_code == 201
        data = response.json()
        assert data["project_id"] == test_project.id

    async def test_create_document_with_sprint(self, client, auth_headers, test_team, test_project, test_sprint):
        """Test creating document with sprint association."""
        response = await client.post(
            f"/api/documents?team_id={test_team.id}",
            headers=auth_headers,
            json={
                "title": "Sprint Doc",
                "content": "Content",
                "project_id": test_project.id,
                "sprint_id": test_sprint.id,
            },
        )
        assert response.status_code == 201
        data = response.json()
        assert data["sprint_id"] == test_sprint.id

    async def test_create_document_with_invalid_sprint(self, client, auth_headers, test_team):
        """Test creating document with non-existent sprint."""
        response = await client.post(
            f"/api/documents?team_id={test_team.id}",
            headers=auth_headers,
            json={
                "title": "Doc",
                "content": "Content",
                "sprint_id": "nonexistent",
            },
        )
        assert response.status_code == 400
        assert "Sprint not found" in response.json()["detail"]

    async def test_create_document_minimal(self, client, auth_headers, test_team):
        """Test creating document with only required fields."""
        response = await client.post(
            f"/api/documents?team_id={test_team.id}",
            headers=auth_headers,
            json={
                "title": "Minimal Doc",
                "content": "Just content",
            },
        )
        assert response.status_code == 201
        data = response.json()
        assert data["title"] == "Minimal Doc"
        assert data["content"] == "Just content"
        assert data["project_id"] is None
        assert data["sprint_id"] is None

    async def test_create_document_sprint_wrong_project(
        self, client, auth_headers, test_team, test_project, test_sprint, db_session
    ):
        """Test creating document with sprint from different project."""
        from app.models.project import Project
        from app.models.sprint import Sprint, SprintStatus

        # Create a second project
        project2 = Project(team_id=test_team.id, name="Other Project", key="OTH")
        db_session.add(project2)
        await db_session.commit()
        await db_session.refresh(project2)

        # test_sprint belongs to test_project, but we specify project2
        response = await client.post(
            f"/api/documents?team_id={test_team.id}",
            headers=auth_headers,
            json={
                "title": "Sprint Doc",
                "content": "Content",
                "project_id": project2.id,
                "sprint_id": test_sprint.id,  # This sprint belongs to test_project
            },
        )
        assert response.status_code == 400
        assert "Sprint must belong to the document's project" in response.json()["detail"]

    async def test_list_documents(self, client, auth_headers, test_team, db_session, test_user):
        """Test listing documents."""
        doc1 = Document(team_id=test_team.id, author_id=test_user.id, title="Doc 1", content="Content 1")
        doc2 = Document(team_id=test_team.id, author_id=test_user.id, title="Doc 2", content="Content 2")
        db_session.add_all([doc1, doc2])
        await db_session.commit()

        response = await client.get(
            f"/api/documents?team_id={test_team.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 2
        # Verify both documents we created are in the response
        titles = [d["title"] for d in data]
        assert "Doc 1" in titles
        assert "Doc 2" in titles

    async def test_list_documents_not_member(self, client, auth_headers2, test_team):
        """Test listing documents when not a team member."""
        response = await client.get(
            f"/api/documents?team_id={test_team.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_list_documents_by_project(self, client, auth_headers, test_team, test_project, db_session, test_user):
        """Test listing documents filtered by project."""
        doc = Document(
            team_id=test_team.id,
            author_id=test_user.id,
            project_id=test_project.id,
            title="Project Doc",
            content="Content",
        )
        db_session.add(doc)
        await db_session.commit()

        response = await client.get(
            f"/api/documents?team_id={test_team.id}&project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1
        # Verify our document is in results and has correct project
        assert any(d["title"] == "Project Doc" and d["project_id"] == test_project.id for d in data)

    async def test_list_documents_by_sprint(self, client, auth_headers, test_team, test_project, test_sprint, db_session, test_user):
        """Test listing documents filtered by sprint."""
        doc = Document(
            team_id=test_team.id,
            author_id=test_user.id,
            project_id=test_project.id,
            sprint_id=test_sprint.id,
            title="Sprint Doc",
            content="Content",
        )
        db_session.add(doc)
        await db_session.commit()

        response = await client.get(
            f"/api/documents?team_id={test_team.id}&sprint_id={test_sprint.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1
        # Verify our document is in results and has correct sprint
        assert any(d["title"] == "Sprint Doc" and d["sprint_id"] == test_sprint.id for d in data)

    async def test_list_documents_sprint_not_found(self, client, auth_headers, test_team):
        """Test listing documents with non-existent sprint."""
        response = await client.get(
            f"/api/documents?team_id={test_team.id}&sprint_id=nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "Sprint not found" in response.json()["detail"]

    async def test_list_documents_search(self, client, auth_headers, test_team, db_session, test_user):
        """Test searching documents."""
        doc = Document(
            team_id=test_team.id,
            author_id=test_user.id,
            title="Unique Search Term Document",
            content="Content",
        )
        db_session.add(doc)
        await db_session.commit()
        await db_session.refresh(doc)

        response = await client.get(
            f"/api/documents?team_id={test_team.id}&search=Unique%20Search%20Term",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1
        # Verify the specific document we created is found
        assert any(d["title"] == "Unique Search Term Document" for d in data)

    async def test_get_document(self, client, auth_headers, test_document):
        """Test getting document by ID."""
        response = await client.get(
            f"/api/documents/{test_document.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == test_document.id
        assert data["title"] == test_document.title

    async def test_get_document_not_found(self, client, auth_headers):
        """Test getting non-existent document."""
        response = await client.get(
            "/api/documents/nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_get_document_not_member(self, client, auth_headers2, test_document):
        """Test getting document when not a team member."""
        response = await client.get(
            f"/api/documents/{test_document.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_update_document(self, client, auth_headers, test_document):
        """Test updating a document."""
        response = await client.patch(
            f"/api/documents/{test_document.id}",
            headers=auth_headers,
            json={"title": "Updated Title", "content": "Updated content"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "Updated Title"
        assert data["content"] == "Updated content"

    async def test_update_document_not_found(self, client, auth_headers):
        """Test updating non-existent document."""
        response = await client.patch(
            "/api/documents/nonexistent",
            headers=auth_headers,
            json={"title": "Updated"},
        )
        assert response.status_code == 404

    async def test_update_document_not_member(self, client, auth_headers2, test_document):
        """Test updating document when not a team member."""
        response = await client.patch(
            f"/api/documents/{test_document.id}",
            headers=auth_headers2,
            json={"title": "Unauthorized Update"},
        )
        assert response.status_code == 403

    async def test_update_document_add_sprint(self, client, auth_headers, test_document, test_project, test_sprint):
        """Test adding sprint to document."""
        await client.patch(
            f"/api/documents/{test_document.id}",
            headers=auth_headers,
            json={"project_id": test_project.id},
        )
        response = await client.patch(
            f"/api/documents/{test_document.id}",
            headers=auth_headers,
            json={"sprint_id": test_sprint.id},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["sprint_id"] == test_sprint.id

    async def test_update_document_invalid_sprint(self, client, auth_headers, test_document, test_project):
        """Test updating document with non-existent sprint."""
        await client.patch(
            f"/api/documents/{test_document.id}",
            headers=auth_headers,
            json={"project_id": test_project.id},
        )
        response = await client.patch(
            f"/api/documents/{test_document.id}",
            headers=auth_headers,
            json={"sprint_id": "nonexistent"},
        )
        assert response.status_code == 400
        assert "Sprint not found" in response.json()["detail"]

    async def test_delete_document(self, client, auth_headers, test_team, db_session, test_user):
        """Test deleting a document."""
        doc = Document(team_id=test_team.id, author_id=test_user.id, title="Delete Me", content="Content")
        db_session.add(doc)
        await db_session.commit()
        await db_session.refresh(doc)

        response = await client.delete(
            f"/api/documents/{doc.id}",
            headers=auth_headers,
        )
        assert response.status_code == 204

    async def test_delete_document_not_found(self, client, auth_headers):
        """Test deleting non-existent document."""
        response = await client.delete(
            "/api/documents/nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_delete_document_not_author(self, client, auth_headers2, test_document, db_session, test_user2, test_team):
        """Test deleting document when not the author (and not admin)."""
        from app.models.team import TeamMember, TeamRole

        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)
        await db_session.commit()

        response = await client.delete(
            f"/api/documents/{test_document.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403
        assert "Only author or admin" in response.json()["detail"]


@pytest.mark.asyncio
class TestDocumentIssueLinks:
    """Tests for document-issue linking."""

    async def test_get_document_issues_empty(self, client, auth_headers, test_document):
        """Test getting issues for document with no links."""
        response = await client.get(
            f"/api/documents/{test_document.id}/issues",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data == []

    async def test_get_document_issues_not_found(self, client, auth_headers):
        """Test getting issues for non-existent document."""
        response = await client.get(
            "/api/documents/nonexistent/issues",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_get_document_issues_not_member(self, client, auth_headers2, test_document):
        """Test getting issues when not a team member."""
        response = await client.get(
            f"/api/documents/{test_document.id}/issues",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_link_document_to_issue(self, client, auth_headers, test_document, test_issue):
        """Test linking document to issue."""
        await client.patch(
            f"/api/documents/{test_document.id}",
            headers=auth_headers,
            json={"project_id": test_issue.project_id},
        )
        response = await client.post(
            f"/api/documents/{test_document.id}/issues/{test_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 201
        assert "linked" in response.json()["message"].lower()

    async def test_link_document_not_found(self, client, auth_headers, test_issue):
        """Test linking non-existent document."""
        response = await client.post(
            f"/api/documents/nonexistent/issues/{test_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "Document not found" in response.json()["detail"]

    async def test_link_issue_not_found(self, client, auth_headers, test_document):
        """Test linking to non-existent issue."""
        response = await client.post(
            f"/api/documents/{test_document.id}/issues/nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "Issue not found" in response.json()["detail"]

    async def test_link_document_not_member(self, client, auth_headers2, test_document, test_issue):
        """Test linking when not a team member."""
        response = await client.post(
            f"/api/documents/{test_document.id}/issues/{test_issue.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_unlink_document_from_issue(self, client, auth_headers, test_document, test_issue):
        """Test unlinking document from issue."""
        await client.patch(
            f"/api/documents/{test_document.id}",
            headers=auth_headers,
            json={"project_id": test_issue.project_id},
        )
        await client.post(
            f"/api/documents/{test_document.id}/issues/{test_issue.id}",
            headers=auth_headers,
        )
        response = await client.delete(
            f"/api/documents/{test_document.id}/issues/{test_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 204

    async def test_unlink_document_not_found(self, client, auth_headers, test_issue):
        """Test unlinking non-existent document."""
        response = await client.delete(
            f"/api/documents/nonexistent/issues/{test_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_unlink_issue_not_found(self, client, auth_headers, test_document):
        """Test unlinking from non-existent issue."""
        response = await client.delete(
            f"/api/documents/{test_document.id}/issues/nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_link_document_to_issue_cross_team(
        self, client, auth_headers, test_team, test_user, test_document, db_session
    ):
        """Test that linking document to issue from different team is forbidden."""
        from app.models.team import Team, TeamMember, TeamRole
        from app.models.project import Project
        from app.models.issue import Issue

        # Create a second team
        team2 = Team(name="Other Team", key="OTH")
        db_session.add(team2)
        await db_session.commit()
        await db_session.refresh(team2)

        # Add test_user as member of team2
        member = TeamMember(team_id=team2.id, user_id=test_user.id, role=TeamRole.ADMIN)
        db_session.add(member)

        # Create project and issue in team2
        project2 = Project(team_id=team2.id, name="Other Project", key="OTH2")
        db_session.add(project2)
        await db_session.commit()
        await db_session.refresh(project2)

        issue2 = Issue(
            project_id=project2.id,
            creator_id=test_user.id,
            number=1,
            identifier="OTH2-1",
            title="Other Issue",
        )
        db_session.add(issue2)
        await db_session.commit()
        await db_session.refresh(issue2)

        # Try to link test_document (from test_team) to issue2 (from team2)
        response = await client.post(
            f"/api/documents/{test_document.id}/issues/{issue2.id}",
            headers=auth_headers,
        )
        assert response.status_code == 403
        assert "same team" in response.json()["detail"]


@pytest.mark.asyncio
class TestDocumentLabels:
    """Tests for document labels."""

    async def test_get_document_labels_empty(self, client, auth_headers, test_document):
        """Test getting labels for document with no labels."""
        response = await client.get(
            f"/api/documents/{test_document.id}/labels",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data == []

    async def test_get_document_labels_not_found(self, client, auth_headers):
        """Test getting labels for non-existent document."""
        response = await client.get(
            "/api/documents/nonexistent/labels",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_get_document_labels_not_member(self, client, auth_headers2, test_document):
        """Test getting labels when not a team member."""
        response = await client.get(
            f"/api/documents/{test_document.id}/labels",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_add_label_to_document(self, client, auth_headers, test_document, test_label):
        """Test adding a label to a document."""
        response = await client.post(
            f"/api/documents/{test_document.id}/labels/{test_label.id}",
            headers=auth_headers,
        )
        assert response.status_code == 201
        assert "added" in response.json()["message"].lower()

    async def test_add_label_document_not_found(self, client, auth_headers, test_label):
        """Test adding label to non-existent document."""
        response = await client.post(
            f"/api/documents/nonexistent/labels/{test_label.id}",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "Document not found" in response.json()["detail"]

    async def test_add_label_not_found(self, client, auth_headers, test_document):
        """Test adding non-existent label to document."""
        response = await client.post(
            f"/api/documents/{test_document.id}/labels/nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "Label not found" in response.json()["detail"]

    async def test_add_label_not_member(self, client, auth_headers2, test_document, test_label):
        """Test adding label when not a team member."""
        response = await client.post(
            f"/api/documents/{test_document.id}/labels/{test_label.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_add_label_cross_team(
        self, client, auth_headers, test_document, db_session, test_user
    ):
        """Test adding label from different team."""
        from app.models.team import Team, TeamMember, TeamRole
        from app.models.issue import Label

        # Create a second team
        team2 = Team(name="Other Team", key="OTH")
        db_session.add(team2)
        await db_session.commit()
        await db_session.refresh(team2)

        # Add test_user as member of team2
        member = TeamMember(team_id=team2.id, user_id=test_user.id, role=TeamRole.ADMIN)
        db_session.add(member)

        # Create label in team2
        label2 = Label(team_id=team2.id, name="Other Label")
        db_session.add(label2)
        await db_session.commit()
        await db_session.refresh(label2)

        # Try to add label2 (from team2) to test_document (from test_team)
        response = await client.post(
            f"/api/documents/{test_document.id}/labels/{label2.id}",
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert "same team" in response.json()["detail"]

    async def test_remove_label_from_document(self, client, auth_headers, test_document, test_label):
        """Test removing a label from a document."""
        # First add the label
        await client.post(
            f"/api/documents/{test_document.id}/labels/{test_label.id}",
            headers=auth_headers,
        )
        # Then remove it
        response = await client.delete(
            f"/api/documents/{test_document.id}/labels/{test_label.id}",
            headers=auth_headers,
        )
        assert response.status_code == 204

    async def test_remove_label_document_not_found(self, client, auth_headers, test_label):
        """Test removing label from non-existent document."""
        response = await client.delete(
            f"/api/documents/nonexistent/labels/{test_label.id}",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_remove_label_not_member(self, client, auth_headers2, test_document, test_label):
        """Test removing label when not a team member."""
        response = await client.delete(
            f"/api/documents/{test_document.id}/labels/{test_label.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403


@pytest.mark.asyncio
class TestDocumentComments:
    """Tests for document comments."""

    async def test_create_comment(self, client, auth_headers, test_document):
        """Test creating a comment on a document."""
        response = await client.post(
            f"/api/documents/{test_document.id}/comments",
            headers=auth_headers,
            json={"content": "This is a comment"},
        )
        assert response.status_code == 201
        data = response.json()
        assert data["content"] == "This is a comment"
        assert data["document_id"] == test_document.id

    async def test_create_comment_document_not_found(self, client, auth_headers):
        """Test creating comment on non-existent document."""
        response = await client.post(
            "/api/documents/nonexistent/comments",
            headers=auth_headers,
            json={"content": "Comment"},
        )
        assert response.status_code == 404

    async def test_create_comment_not_member(self, client, auth_headers2, test_document):
        """Test creating comment when not a team member."""
        response = await client.post(
            f"/api/documents/{test_document.id}/comments",
            headers=auth_headers2,
            json={"content": "Unauthorized comment"},
        )
        assert response.status_code == 403

    async def test_list_comments(self, client, auth_headers, test_document, db_session, test_user):
        """Test listing comments on a document."""
        comment = DocumentComment(
            document_id=test_document.id,
            author_id=test_user.id,
            content="Test comment",
        )
        db_session.add(comment)
        await db_session.commit()

        response = await client.get(
            f"/api/documents/{test_document.id}/comments",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1
        assert any(c["content"] == "Test comment" for c in data)

    async def test_list_comments_document_not_found(self, client, auth_headers):
        """Test listing comments on non-existent document."""
        response = await client.get(
            "/api/documents/nonexistent/comments",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_list_comments_not_member(self, client, auth_headers2, test_document):
        """Test listing comments when not a team member."""
        response = await client.get(
            f"/api/documents/{test_document.id}/comments",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_update_comment(self, client, auth_headers, test_document, db_session, test_user):
        """Test updating a comment."""
        comment = DocumentComment(
            document_id=test_document.id,
            author_id=test_user.id,
            content="Original content",
        )
        db_session.add(comment)
        await db_session.commit()
        await db_session.refresh(comment)

        response = await client.patch(
            f"/api/documents/{test_document.id}/comments/{comment.id}",
            headers=auth_headers,
            json={"content": "Updated content"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["content"] == "Updated content"

    async def test_update_comment_document_not_found(self, client, auth_headers):
        """Test updating comment on non-existent document."""
        response = await client.patch(
            "/api/documents/nonexistent/comments/some-id",
            headers=auth_headers,
            json={"content": "Updated"},
        )
        assert response.status_code == 404
        assert "Document not found" in response.json()["detail"]

    async def test_update_comment_not_found(self, client, auth_headers, test_document):
        """Test updating non-existent comment."""
        response = await client.patch(
            f"/api/documents/{test_document.id}/comments/nonexistent",
            headers=auth_headers,
            json={"content": "Updated"},
        )
        assert response.status_code == 404
        assert "Comment not found" in response.json()["detail"]

    async def test_update_comment_not_author(self, client, auth_headers2, test_document, db_session, test_user, test_user2, test_team):
        """Test updating comment by non-author."""
        from app.models.team import TeamMember, TeamRole

        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)

        comment = DocumentComment(
            document_id=test_document.id,
            author_id=test_user.id,
            content="Original",
        )
        db_session.add(comment)
        await db_session.commit()
        await db_session.refresh(comment)

        response = await client.patch(
            f"/api/documents/{test_document.id}/comments/{comment.id}",
            headers=auth_headers2,
            json={"content": "Hijacked!"},
        )
        assert response.status_code == 403
        assert "Only the author" in response.json()["detail"]

    async def test_delete_comment(self, client, auth_headers, test_document, db_session, test_user):
        """Test deleting a comment."""
        comment = DocumentComment(
            document_id=test_document.id,
            author_id=test_user.id,
            content="Delete me",
        )
        db_session.add(comment)
        await db_session.commit()
        await db_session.refresh(comment)

        response = await client.delete(
            f"/api/documents/{test_document.id}/comments/{comment.id}",
            headers=auth_headers,
        )
        assert response.status_code == 204

    async def test_delete_comment_document_not_found(self, client, auth_headers):
        """Test deleting comment on non-existent document."""
        response = await client.delete(
            "/api/documents/nonexistent/comments/some-id",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "Document not found" in response.json()["detail"]

    async def test_delete_comment_not_found(self, client, auth_headers, test_document):
        """Test deleting non-existent comment."""
        response = await client.delete(
            f"/api/documents/{test_document.id}/comments/nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "Comment not found" in response.json()["detail"]

    async def test_delete_comment_not_author(self, client, auth_headers2, test_document, db_session, test_user, test_user2, test_team):
        """Test deleting comment by non-author."""
        from app.models.team import TeamMember, TeamRole

        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)

        comment = DocumentComment(
            document_id=test_document.id,
            author_id=test_user.id,
            content="Don't delete me",
        )
        db_session.add(comment)
        await db_session.commit()
        await db_session.refresh(comment)

        response = await client.delete(
            f"/api/documents/{test_document.id}/comments/{comment.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403
        assert "Only the author" in response.json()["detail"]


# ============================================================================
# Project-linked document access control tests (CHT-857)
# Covers project_id access check branches in get, update, delete, comments, etc.
# ============================================================================


@pytest_asyncio.fixture
async def other_team_for_docs(db_session):
    """Team that test_user is NOT a member of."""
    team = Team(name="Docs Other Team", key="DOT", description="Other team")
    db_session.add(team)
    await db_session.commit()
    await db_session.refresh(team)
    return team


@pytest_asyncio.fixture
async def cross_team_user(db_session, other_team_for_docs):
    """User on other_team (not test_team)."""
    user = User(
        email="docs-cross@example.com",
        hashed_password=get_password_hash("test"),
        name="Cross Team User",
    )
    db_session.add(user)
    await db_session.flush()
    member = TeamMember(
        team_id=other_team_for_docs.id, user_id=user.id, role=TeamRole.OWNER
    )
    db_session.add(member)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest_asyncio.fixture
async def cross_team_headers(cross_team_user):
    """Auth headers for cross-team user."""
    token = create_access_token(data={"sub": cross_team_user.id})
    return {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def project_document(db_session, test_team, test_project, test_user):
    """Document linked to a project (not just team-level)."""
    doc = Document(
        team_id=test_team.id,
        author_id=test_user.id,
        project_id=test_project.id,
        title="Project Document",
        content="Content linked to project",
    )
    db_session.add(doc)
    await db_session.commit()
    await db_session.refresh(doc)
    return doc


@pytest_asyncio.fixture
async def agent_user_for_docs(db_session, test_team, test_user):
    """Agent user scoped to test_team."""
    user = User(
        email="docs-agent@example.com",
        hashed_password=get_password_hash("test"),
        name="Docs Agent",
        is_agent=True,
        parent_user_id=test_user.id,
        agent_team_id=test_team.id,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest_asyncio.fixture
async def agent_headers_for_docs(agent_user_for_docs):
    """Auth headers for agent user."""
    token = create_access_token(data={"sub": agent_user_for_docs.id})
    return {"Authorization": f"Bearer {token}"}


@pytest.mark.asyncio
class TestProjectDocumentAccessControl:
    """Test access control for project-linked documents (CHT-857).

    Covers the project_id branch in get/update/delete/comments endpoints.
    """

    async def test_get_project_document_cross_team_denied(
        self, client, cross_team_headers, project_document
    ):
        """GET /documents/{id} returns 403 for cross-team user on project doc."""
        response = await client.get(
            f"/api/documents/{project_document.id}",
            headers=cross_team_headers,
        )
        assert response.status_code == 403

    async def test_update_project_document_cross_team_denied(
        self, client, cross_team_headers, project_document
    ):
        """PATCH /documents/{id} returns 403 for cross-team user on project doc."""
        response = await client.patch(
            f"/api/documents/{project_document.id}",
            headers=cross_team_headers,
            json={"title": "Hacked"},
        )
        assert response.status_code == 403

    async def test_delete_project_document_cross_team_denied(
        self, client, cross_team_headers, project_document
    ):
        """DELETE /documents/{id} returns 403 for cross-team user (author/admin check)."""
        response = await client.delete(
            f"/api/documents/{project_document.id}",
            headers=cross_team_headers,
        )
        # Note: delete_document uses author/admin check, not project-access check
        assert response.status_code == 403
        assert "author or admin" in response.json()["detail"].lower()

    async def test_get_project_document_issues_cross_team_denied(
        self, client, cross_team_headers, project_document
    ):
        """GET /documents/{id}/issues returns 403 for cross-team user."""
        response = await client.get(
            f"/api/documents/{project_document.id}/issues",
            headers=cross_team_headers,
        )
        assert response.status_code == 403

    async def test_get_project_document_labels_cross_team_denied(
        self, client, cross_team_headers, project_document
    ):
        """GET /documents/{id}/labels returns 403 for cross-team user."""
        response = await client.get(
            f"/api/documents/{project_document.id}/labels",
            headers=cross_team_headers,
        )
        assert response.status_code == 403

    async def test_get_project_document_comments_cross_team_denied(
        self, client, cross_team_headers, project_document
    ):
        """GET /documents/{id}/comments returns 403 for cross-team user."""
        response = await client.get(
            f"/api/documents/{project_document.id}/comments",
            headers=cross_team_headers,
        )
        assert response.status_code == 403

    async def test_create_comment_on_project_document_cross_team_denied(
        self, client, cross_team_headers, project_document
    ):
        """POST /documents/{id}/comments returns 403 for cross-team user."""
        response = await client.post(
            f"/api/documents/{project_document.id}/comments",
            headers=cross_team_headers,
            json={"content": "Unauthorized comment"},
        )
        assert response.status_code == 403

    async def test_delete_comment_on_project_document_cross_team_denied(
        self, client, auth_headers, cross_team_headers, project_document, db_session, test_user
    ):
        """DELETE /documents/{id}/comments/{id} returns 403 for cross-team user."""
        # Create a comment first
        comment = DocumentComment(
            document_id=project_document.id,
            author_id=test_user.id,
            content="Test comment",
        )
        db_session.add(comment)
        await db_session.commit()
        await db_session.refresh(comment)

        response = await client.delete(
            f"/api/documents/{project_document.id}/comments/{comment.id}",
            headers=cross_team_headers,
        )
        assert response.status_code == 403

    async def test_agent_must_include_icon(
        self, client, agent_headers_for_docs, test_team
    ):
        """POST /documents by agent without icon returns 400."""
        response = await client.post(
            f"/api/documents?team_id={test_team.id}",
            headers=agent_headers_for_docs,
            json={"title": "Agent Doc", "content": "No icon"},
        )
        assert response.status_code == 400
        assert "emoji icon" in response.json()["detail"]

    async def test_agent_with_icon_succeeds(
        self, client, agent_headers_for_docs, test_team
    ):
        """POST /documents by agent with icon succeeds."""
        response = await client.post(
            f"/api/documents?team_id={test_team.id}",
            headers=agent_headers_for_docs,
            json={"title": "Agent Doc", "content": "With icon", "icon": "📝"},
        )
        assert response.status_code == 201

    async def test_list_documents_project_filter_cross_team_denied(
        self, client, cross_team_headers, test_team, test_project
    ):
        """GET /documents?project_id= returns 403 for cross-team user."""
        response = await client.get(
            f"/api/documents?team_id={test_team.id}&project_id={test_project.id}",
            headers=cross_team_headers,
        )
        assert response.status_code == 403


# --- Service-level coverage tests (CHT-924) ---

@pytest.mark.asyncio
async def test_document_service_link_issue_not_found(db_session):
    """link_issue raises ValueError when document or issue doesn't exist (covers L218)."""
    from app.services.document_service import DocumentService

    service = DocumentService(db_session)
    with pytest.raises(ValueError, match="Document or issue not found"):
        await service.link_issue("nonexistent-doc", "nonexistent-issue")


@pytest.mark.asyncio
async def test_document_service_link_issue_idempotent(db_session, test_document, test_issue):
    """link_issue is idempotent — linking twice doesn't raise (covers L231)."""
    from app.services.document_service import DocumentService

    # Ensure doc has a project (same team as issue)
    test_document.project_id = test_issue.project_id
    await db_session.commit()

    service = DocumentService(db_session)
    await service.link_issue(test_document.id, test_issue.id)
    # Link again — should be a no-op, not an error
    await service.link_issue(test_document.id, test_issue.id)


@pytest.mark.asyncio
async def test_document_service_add_label_idempotent(db_session, test_document):
    """add_label is idempotent — adding twice doesn't raise (covers L280)."""
    from app.services.document_service import DocumentService
    from app.models.document import Label

    # Create a label
    label = Label(name="test-label", team_id=test_document.team_id)
    db_session.add(label)
    await db_session.flush()

    service = DocumentService(db_session)
    await service.add_label(test_document.id, label.id)
    # Add again — should be a no-op
    await service.add_label(test_document.id, label.id)
