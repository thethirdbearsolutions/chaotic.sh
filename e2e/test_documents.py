"""E2E contract tests: Documents, document-issue links, and document comments."""
import pytest
from cli.client import APIError


class TestDocumentCRUD:
    def test_create_document(self, api_client, test_team):
        doc = api_client.create_document(test_team["id"], "Test Doc")
        assert doc["title"] == "Test Doc"
        assert "id" in doc

    def test_create_document_with_content(self, api_client, test_team):
        doc = api_client.create_document(
            test_team["id"], "Content Doc", content="# Hello\nWorld"
        )
        assert doc["title"] == "Content Doc"

    def test_get_document(self, api_client, test_team):
        doc = api_client.create_document(test_team["id"], "Fetch Me")
        fetched = api_client.get_document(doc["id"])
        assert fetched["id"] == doc["id"]
        assert fetched["title"] == "Fetch Me"
        assert fetched["author_name"] is not None  # CHT-995: verify join("author")

    def test_get_documents(self, api_client, test_team):
        api_client.create_document(test_team["id"], "Doc A")
        api_client.create_document(test_team["id"], "Doc B")
        docs = api_client.get_documents(test_team["id"])
        assert isinstance(docs, list)
        assert len(docs) >= 2
        # CHT-995: verify join("author") populates author_name in list
        assert all(d.get("author_name") is not None for d in docs)

    def test_get_documents_search(self, api_client, test_team):
        api_client.create_document(test_team["id"], "Unique Pineapple Doc")
        docs = api_client.get_documents(test_team["id"], search="Pineapple")
        assert any("Pineapple" in d["title"] for d in docs)

    def test_update_document(self, api_client, test_team):
        doc = api_client.create_document(test_team["id"], "Old Title")
        updated = api_client.update_document(doc["id"], title="New Title")
        assert updated["title"] == "New Title"

    def test_delete_document(self, api_client, test_team):
        doc = api_client.create_document(test_team["id"], "To Delete")
        api_client.delete_document(doc["id"])
        with pytest.raises(APIError):
            api_client.get_document(doc["id"])

    def test_get_document_not_found(self, api_client):
        with pytest.raises(APIError):
            api_client.get_document("nonexistent-id")

    def test_create_document_unauthenticated(self, unauthenticated_client):
        with pytest.raises(APIError):
            unauthenticated_client.create_document("fake-team", "No Auth")


class TestDocumentFilterParams:
    """CHT-965: Tests for missing get_documents filter params."""

    def test_get_documents_filter_project_id(self, api_client, test_team, test_project):
        api_client.create_document(
            test_team["id"], "Project Doc", project_id=test_project["id"]
        )
        docs = api_client.get_documents(
            test_team["id"], project_id=test_project["id"]
        )
        assert isinstance(docs, list)
        assert len(docs) >= 1

    def test_get_documents_filter_sprint_id(self, api_client, test_team, test_project):
        current = api_client.get_current_sprint(test_project["id"])
        api_client.create_document(
            test_team["id"], "Sprint Doc", sprint_id=current["id"]
        )
        docs = api_client.get_documents(
            test_team["id"], sprint_id=current["id"]
        )
        assert isinstance(docs, list)
        assert len(docs) >= 1

    def test_get_documents_filter_project_and_search(self, api_client, test_team, test_project):
        api_client.create_document(
            test_team["id"], "Unique Mango Report",
            project_id=test_project["id"]
        )
        docs = api_client.get_documents(
            test_team["id"], project_id=test_project["id"], search="Mango"
        )
        assert any("Mango" in d["title"] for d in docs)


class TestDocumentIssueLinks:
    def test_link_document_to_issue(self, api_client, test_team, test_project):
        doc = api_client.create_document(test_team["id"], "Linked Doc")
        issue = api_client.create_issue(test_project["id"], "Linked Issue")
        result = api_client.link_document_to_issue(doc["id"], issue["id"])
        assert result is not None

    def test_get_document_issues(self, api_client, test_team, test_project):
        doc = api_client.create_document(test_team["id"], "Multi Link Doc")
        issue1 = api_client.create_issue(test_project["id"], "Link Issue 1")
        issue2 = api_client.create_issue(test_project["id"], "Link Issue 2")
        api_client.link_document_to_issue(doc["id"], issue1["id"])
        api_client.link_document_to_issue(doc["id"], issue2["id"])
        issues = api_client.get_document_issues(doc["id"])
        assert isinstance(issues, list)
        assert len(issues) >= 2
        # CHT-995: verify creator relation on linked issues
        assert all(i.get("creator_name") is not None for i in issues)

    def test_get_issue_documents(self, api_client, test_team, test_project):
        doc = api_client.create_document(test_team["id"], "Issue Doc")
        issue = api_client.create_issue(test_project["id"], "Doc Issue")
        api_client.link_document_to_issue(doc["id"], issue["id"])
        docs = api_client.get_issue_documents(issue["id"])
        assert isinstance(docs, list)
        assert len(docs) >= 1
        # CHT-995: verify author relation on linked documents
        assert all(d.get("author_name") is not None for d in docs)

    def test_unlink_document_from_issue(self, api_client, test_team, test_project):
        doc = api_client.create_document(test_team["id"], "Unlink Doc")
        issue = api_client.create_issue(test_project["id"], "Unlink Issue")
        api_client.link_document_to_issue(doc["id"], issue["id"])
        api_client.unlink_document_from_issue(doc["id"], issue["id"])
        issues = api_client.get_document_issues(doc["id"])
        assert not any(i["id"] == issue["id"] for i in issues)


class TestDocumentComments:
    def test_create_document_comment(self, api_client, test_team):
        doc = api_client.create_document(test_team["id"], "Commentable Doc")
        comment = api_client.create_document_comment(doc["id"], "Nice doc!")
        assert comment["content"] == "Nice doc!"
        assert "id" in comment
        assert comment.get("author_name") is not None  # CHT-995: verify author

    def test_get_document_comments(self, api_client, test_team):
        doc = api_client.create_document(test_team["id"], "Multi Comment Doc")
        api_client.create_document_comment(doc["id"], "Comment A")
        api_client.create_document_comment(doc["id"], "Comment B")
        comments = api_client.get_document_comments(doc["id"])
        assert isinstance(comments, list)
        assert len(comments) >= 2
        # CHT-995: verify join("author") populates author_name
        assert all(c.get("author_name") is not None for c in comments)
