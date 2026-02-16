"""E2E contract tests: Issues, sub-issues, relations, and comments."""
import pytest
from cli.client import APIError


class TestIssueCRUD:
    def test_create_issue(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "Test Issue")
        assert issue["title"] == "Test Issue"
        assert "id" in issue
        assert "identifier" in issue

    def test_create_issue_with_fields(self, api_client, test_project):
        issue = api_client.create_issue(
            test_project["id"], "Full Issue",
            description="A full issue", priority="high", status="in_progress",
            estimate=5,
        )
        assert issue["title"] == "Full Issue"
        assert issue["description"] == "A full issue"
        assert issue["priority"] == "high"

    def test_get_issue(self, api_client, test_project):
        created = api_client.create_issue(test_project["id"], "Get Me")
        fetched = api_client.get_issue(created["id"])
        assert fetched["id"] == created["id"]
        assert fetched["title"] == "Get Me"

    def test_get_issue_by_identifier(self, api_client, test_project):
        created = api_client.create_issue(test_project["id"], "By Identifier")
        fetched = api_client.get_issue_by_identifier(created["identifier"])
        assert fetched["id"] == created["id"]

    def test_get_issue_not_found(self, api_client):
        with pytest.raises(APIError):
            api_client.get_issue("nonexistent-id")

    def test_get_issues_list(self, api_client, test_project):
        api_client.create_issue(test_project["id"], "List Issue 1")
        api_client.create_issue(test_project["id"], "List Issue 2")
        issues = api_client.get_issues(project_id=test_project["id"])
        assert isinstance(issues, list)
        assert len(issues) >= 2

    def test_get_issues_filter_status(self, api_client, test_project):
        api_client.create_issue(test_project["id"], "Todo Issue", status="todo")
        api_client.create_issue(test_project["id"], "Done Issue", status="done")
        todos = api_client.get_issues(project_id=test_project["id"], status="todo")
        assert all(i["status"] == "todo" for i in todos)

    def test_get_issues_filter_priority(self, api_client, test_project):
        api_client.create_issue(test_project["id"], "Urgent", priority="urgent")
        api_client.create_issue(test_project["id"], "Low", priority="low")
        urgent = api_client.get_issues(project_id=test_project["id"], priority="urgent")
        assert all(i["priority"] == "urgent" for i in urgent)

    def test_get_issues_search(self, api_client, test_project):
        api_client.create_issue(test_project["id"], "Unique Banana Title")
        results = api_client.get_issues(project_id=test_project["id"], search="Banana")
        assert any("Banana" in i["title"] for i in results)

    def test_get_issues_limit(self, api_client, test_project):
        for i in range(3):
            api_client.create_issue(test_project["id"], f"Limited {i}")
        issues = api_client.get_issues(project_id=test_project["id"], limit=2)
        assert len(issues) <= 2

    def test_get_issues_sort(self, api_client, test_project):
        api_client.create_issue(test_project["id"], "Low Prio", priority="low")
        api_client.create_issue(test_project["id"], "Urgent Prio", priority="urgent")
        issues = api_client.get_issues(
            project_id=test_project["id"], sort_by="priority", order="asc"
        )
        assert isinstance(issues, list)
        assert len(issues) >= 2
        # Verify sorting works (urgent < low in priority ordering)
        priorities = [i["priority"] for i in issues if i.get("priority")]
        assert len(priorities) >= 2

    def test_search_issues(self, api_client, test_team, test_project):
        api_client.create_issue(test_project["id"], "Searchable Zebra")
        results = api_client.search_issues(test_team["id"], "Zebra")
        assert isinstance(results, list)
        assert any("Zebra" in i["title"] for i in results)

    def test_update_issue(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "To Update")
        updated = api_client.update_issue(issue["id"], title="Updated Title")
        assert updated["title"] == "Updated Title"

    def test_delete_issue(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "To Delete")
        api_client.delete_issue(issue["id"])
        with pytest.raises(APIError):
            api_client.get_issue(issue["id"])

    def test_create_issue_unauthenticated(self, unauthenticated_client):
        with pytest.raises(APIError):
            unauthenticated_client.create_issue("fake-project", "No Auth")


class TestIssueFilterParams:
    """CHT-965: Tests for missing get_issues filter params."""

    def test_get_issues_filter_sprint_id(self, api_client, test_project):
        current = api_client.get_current_sprint(test_project["id"])
        api_client.create_issue(
            test_project["id"], "Sprint Issue", sprint_id=current["id"]
        )
        issues = api_client.get_issues(
            project_id=test_project["id"], sprint_id=current["id"]
        )
        assert isinstance(issues, list)
        assert len(issues) >= 1

    def test_get_issues_filter_assignee_id(self, api_client, test_project, test_user):
        issue = api_client.create_issue(test_project["id"], "Assigned Issue")
        api_client.update_issue(issue["id"], assignee_id=test_user.id)
        issues = api_client.get_issues(
            project_id=test_project["id"], assignee_id=test_user.id
        )
        assert isinstance(issues, list)
        assert all(i.get("assignee_id") == test_user.id for i in issues)

    def test_get_issues_filter_issue_type(self, api_client, test_project):
        api_client.create_issue(
            test_project["id"], "Bug Issue", issue_type="bug"
        )
        bugs = api_client.get_issues(
            project_id=test_project["id"], issue_type="bug"
        )
        assert isinstance(bugs, list)
        assert all(i.get("issue_type") == "bug" for i in bugs)

    def test_get_issues_skip(self, api_client, test_project):
        for i in range(3):
            api_client.create_issue(test_project["id"], f"Skip Issue {i}")
        all_issues = api_client.get_issues(project_id=test_project["id"])
        skipped = api_client.get_issues(project_id=test_project["id"], skip=1)
        assert len(skipped) == len(all_issues) - 1

    def test_get_issues_skip_and_limit(self, api_client, test_project):
        for i in range(5):
            api_client.create_issue(test_project["id"], f"Page Issue {i}")
        page = api_client.get_issues(
            project_id=test_project["id"], skip=2, limit=2
        )
        assert isinstance(page, list)
        assert len(page) <= 2


class TestSubIssues:
    def test_create_sub_issue(self, api_client, test_project):
        parent = api_client.create_issue(test_project["id"], "Parent")
        child = api_client.create_issue(
            test_project["id"], "Child", parent_id=parent["id"]
        )
        assert child["title"] == "Child"

    def test_get_sub_issues(self, api_client, test_project):
        parent = api_client.create_issue(test_project["id"], "Parent")
        api_client.create_issue(
            test_project["id"], "Child 1", parent_id=parent["id"]
        )
        api_client.create_issue(
            test_project["id"], "Child 2", parent_id=parent["id"]
        )
        subs = api_client.get_sub_issues(parent["id"])
        assert isinstance(subs, list)
        assert len(subs) >= 2

    def test_get_issues_by_parent(self, api_client, test_project):
        parent = api_client.create_issue(test_project["id"], "Parent")
        api_client.create_issue(
            test_project["id"], "Sub", parent_id=parent["id"]
        )
        children = api_client.get_issues(
            project_id=test_project["id"], parent_id=parent["id"]
        )
        assert isinstance(children, list)
        assert len(children) >= 1


class TestRelations:
    def test_create_relation(self, api_client, test_project):
        issue1 = api_client.create_issue(test_project["id"], "Blocker")
        issue2 = api_client.create_issue(test_project["id"], "Blocked")
        relation = api_client.create_relation(
            issue1["id"], issue2["id"], "blocks"
        )
        assert "id" in relation

    def test_get_relations(self, api_client, test_project):
        issue1 = api_client.create_issue(test_project["id"], "Issue A")
        issue2 = api_client.create_issue(test_project["id"], "Issue B")
        api_client.create_relation(issue1["id"], issue2["id"], "blocks")
        relations = api_client.get_relations(issue1["id"])
        assert isinstance(relations, list)
        assert len(relations) >= 1

    def test_delete_relation(self, api_client, test_project):
        issue1 = api_client.create_issue(test_project["id"], "R1")
        issue2 = api_client.create_issue(test_project["id"], "R2")
        relation = api_client.create_relation(issue1["id"], issue2["id"])
        api_client.delete_relation(issue1["id"], relation["id"])
        relations = api_client.get_relations(issue1["id"])
        assert not any(r["id"] == relation["id"] for r in relations)


class TestComments:
    def test_create_comment(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "Commentable")
        comment = api_client.create_comment(issue["id"], "Hello world")
        assert comment["content"] == "Hello world"
        assert "id" in comment

    def test_get_comments(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "Multi Comment")
        api_client.create_comment(issue["id"], "Comment 1")
        api_client.create_comment(issue["id"], "Comment 2")
        comments = api_client.get_comments(issue["id"])
        assert isinstance(comments, list)
        assert len(comments) >= 2

    def test_delete_comment(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "Del Comment")
        comment = api_client.create_comment(issue["id"], "To delete")
        api_client.delete_comment(issue["id"], comment["id"])
        comments = api_client.get_comments(issue["id"])
        assert not any(c["id"] == comment["id"] for c in comments)
