"""E2E contract tests: Labels and issue labels."""
import pytest
from cli.client import APIError


class TestLabelCRUD:
    def test_create_label(self, api_client, test_team):
        label = api_client.create_label(test_team["id"], "bug")
        assert label["name"] == "bug"
        assert "id" in label

    def test_create_label_with_color(self, api_client, test_team):
        label = api_client.create_label(test_team["id"], "feature", color="#00ff00")
        assert label["name"] == "feature"

    def test_get_labels(self, api_client, test_team):
        api_client.create_label(test_team["id"], "label-a")
        api_client.create_label(test_team["id"], "label-b")
        labels = api_client.get_labels(test_team["id"])
        assert isinstance(labels, list)
        assert len(labels) >= 2

    def test_update_label(self, api_client, test_team):
        label = api_client.create_label(test_team["id"], "old-name")
        updated = api_client.update_label(label["id"], name="new-name")
        assert updated["name"] == "new-name"

    def test_delete_label(self, api_client, test_team):
        label = api_client.create_label(test_team["id"], "to-delete")
        api_client.delete_label(label["id"])
        labels = api_client.get_labels(test_team["id"])
        assert not any(l["id"] == label["id"] for l in labels)

    def test_create_label_unauthenticated(self, unauthenticated_client):
        with pytest.raises(APIError):
            unauthenticated_client.create_label("fake-team", "nope")


class TestIssueLabels:
    def test_add_label_to_issue(self, api_client, test_team, test_project):
        label = api_client.create_label(test_team["id"], "issue-label")
        issue = api_client.create_issue(test_project["id"], "Labeled Issue")
        result = api_client.add_label_to_issue(issue["id"], label["id"])
        assert result is not None

    def test_remove_label_from_issue(self, api_client, test_team, test_project):
        label = api_client.create_label(test_team["id"], "removable")
        issue = api_client.create_issue(test_project["id"], "Label Remove")
        api_client.add_label_to_issue(issue["id"], label["id"])
        api_client.remove_label_from_issue(issue["id"], label["id"])
        # Verify label is removed by fetching issue
        fetched = api_client.get_issue(issue["id"])
        if "labels" in fetched:
            assert not any(l["id"] == label["id"] for l in fetched["labels"])

    def test_get_issue_includes_labels(self, api_client, test_team, test_project):
        """CHT-994: Verify prefetch("labels") works — get single issue."""
        label = api_client.create_label(test_team["id"], "prefetch-single")
        issue = api_client.create_issue(test_project["id"], "Label Prefetch")
        api_client.add_label_to_issue(issue["id"], label["id"])
        fetched = api_client.get_issue(issue["id"])
        assert "labels" in fetched
        assert any(l["id"] == label["id"] for l in fetched["labels"])

    def test_list_issues_includes_labels(self, api_client, test_team, test_project):
        """CHT-994: Verify prefetch("labels") works — list issues."""
        label = api_client.create_label(test_team["id"], "prefetch-list")
        issue = api_client.create_issue(test_project["id"], "Label List")
        api_client.add_label_to_issue(issue["id"], label["id"])
        issues = api_client.get_issues(project_id=test_project["id"])
        matched = [i for i in issues if i["id"] == issue["id"]]
        assert len(matched) == 1
        assert "labels" in matched[0]
        assert any(l["id"] == label["id"] for l in matched[0]["labels"])

    def test_list_issues_with_status_filter_includes_labels(self, api_client, test_team, test_project):
        """CHT-994: The exact query path that caused the 500 error."""
        label = api_client.create_label(test_team["id"], "prefetch-status")
        issue = api_client.create_issue(
            test_project["id"], "Status Filter Label", status="todo"
        )
        api_client.add_label_to_issue(issue["id"], label["id"])
        issues = api_client.get_issues(
            project_id=test_project["id"], status="todo"
        )
        matched = [i for i in issues if i["id"] == issue["id"]]
        assert len(matched) == 1
        assert any(l["id"] == label["id"] for l in matched[0].get("labels", []))

    def test_filter_issues_by_label(self, api_client, test_team, test_project):
        label = api_client.create_label(test_team["id"], "filterable")
        issue = api_client.create_issue(test_project["id"], "Filterable Issue")
        api_client.add_label_to_issue(issue["id"], label["id"])
        filtered = api_client.get_issues(
            project_id=test_project["id"], label="filterable"
        )
        assert isinstance(filtered, list)
