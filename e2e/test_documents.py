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

    def test_get_documents(self, api_client, test_team):
        api_client.create_document(test_team["id"], "Doc A")
        api_client.create_document(test_team["id"], "Doc B")
        docs = api_client.get_documents(test_team["id"])
        assert isinstance(docs, list)
        assert len(docs) >= 2

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

    def test_get_issue_documents(self, api_client, test_team, test_project):
        doc = api_client.create_document(test_team["id"], "Issue Doc")
        issue = api_client.create_issue(test_project["id"], "Doc Issue")
        api_client.link_document_to_issue(doc["id"], issue["id"])
        docs = api_client.get_issue_documents(issue["id"])
        assert isinstance(docs, list)
        assert len(docs) >= 1

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

    def test_get_document_comments(self, api_client, test_team):
        doc = api_client.create_document(test_team["id"], "Multi Comment Doc")
        api_client.create_document_comment(doc["id"], "Comment A")
        api_client.create_document_comment(doc["id"], "Comment B")
        comments = api_client.get_document_comments(doc["id"])
        assert isinstance(comments, list)
        assert len(comments) >= 2
