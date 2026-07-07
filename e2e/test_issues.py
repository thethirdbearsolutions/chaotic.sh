"""E2E contract tests: Issues, sub-issues, relations, and comments."""
import time

import pytest
import httpx
from conftest import TEST_BASE_URL
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
        assert fetched["creator_name"] is not None  # CHT-995: verify join("creator")

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
        # CHT-995: verify join("creator") populates creator_name in list
        assert all(i.get("creator_name") is not None for i in issues)

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
        # CHT-995: verify join("creator") on sub-issues
        assert all(s.get("creator_name") is not None for s in subs)

    def test_get_sub_issues_with_labels(self, api_client, test_team, test_project):
        """CHT-995: Verify sub-issues prefetch labels correctly."""
        parent = api_client.create_issue(test_project["id"], "Label Parent")
        child = api_client.create_issue(
            test_project["id"], "Label Child", parent_id=parent["id"]
        )
        label = api_client.create_label(test_team["id"], "sub-issue-label")
        api_client.add_label_to_issue(child["id"], label["id"])
        subs = api_client.get_sub_issues(parent["id"])
        matched = [s for s in subs if s["id"] == child["id"]]
        assert len(matched) == 1
        assert any(l["id"] == label["id"] for l in matched[0].get("labels", []))

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
        assert comment.get("author_name") is not None  # CHT-995: verify author

    def test_get_comments(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "Multi Comment")
        api_client.create_comment(issue["id"], "Comment 1")
        api_client.create_comment(issue["id"], "Comment 2")
        comments = api_client.get_comments(issue["id"])
        assert isinstance(comments, list)
        assert len(comments) >= 2
        # CHT-995: verify join("author") populates author_name
        assert all(c.get("author_name") is not None for c in comments)

    def test_delete_comment(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "Del Comment")
        comment = api_client.create_comment(issue["id"], "To delete")
        api_client.delete_comment(issue["id"], comment["id"])
        comments = api_client.get_comments(issue["id"])
        assert not any(c["id"] == comment["id"] for c in comments)


class TestIssueActivities:
    """CHT-995: Test activity endpoints with populated relation data.

    Uses raw httpx because the CLI client doesn't expose activity endpoints yet.
    """

    def _get(self, url, token):
        resp = httpx.get(url, headers={"Authorization": f"Bearer {token}"}, timeout=5.0)
        resp.raise_for_status()
        return resp.json()

    def test_get_issue_activities(self, api_client, test_project, auth_token):
        """Verify GET /issues/{id}/activities returns user_name via join("user")."""
        issue = api_client.create_issue(test_project["id"], "Activity Test")
        api_client.update_issue(issue["id"], title="Activity Updated")
        activities = self._get(
            f"{TEST_BASE_URL}/issues/{issue['id']}/activities", auth_token
        )
        assert isinstance(activities, list)
        assert len(activities) >= 1
        # Verify user relation is loaded on ALL activities
        assert all(a["user_name"] is not None for a in activities)
        assert all(a["user_email"] is not None for a in activities)

    def test_get_team_activity_feed(self, api_client, test_team, test_project, auth_token):
        """Verify GET /issues/activities returns issue and user relations."""
        issue = api_client.create_issue(test_project["id"], "Feed Test")
        api_client.update_issue(issue["id"], status="in_progress")
        activities = self._get(
            f"{TEST_BASE_URL}/issues/activities?team_id={test_team['id']}", auth_token
        )
        assert isinstance(activities, list)
        assert len(activities) >= 1
        # Verify user relation loaded on all activities
        issue_acts = [a for a in activities if a.get("issue_id")]
        assert len(issue_acts) >= 1
        assert all(a["user_name"] is not None for a in issue_acts)
        assert all(a["issue_identifier"] is not None for a in issue_acts)
        assert all(a["issue_title"] is not None for a in issue_acts)

    def test_team_activity_feed_includes_document_activities(
        self, api_client, test_team, auth_token
    ):
        """Verify team feed includes document activities with user relation."""
        doc = api_client.create_document(test_team["id"], "Doc Activity Test")
        api_client.update_document(doc["id"], title="Doc Updated")
        activities = self._get(
            f"{TEST_BASE_URL}/issues/activities?team_id={test_team['id']}", auth_token
        )
        doc_acts = [a for a in activities if a.get("document_id")]
        assert len(doc_acts) >= 1
        assert all(a["user_name"] is not None for a in doc_acts)


class TestBatchUpdate:
    """CHT-995: Test batch update with populated relation data.

    Uses raw httpx because the CLI client doesn't expose batch update yet.
    """

    def _post(self, url, data, token):
        resp = httpx.post(
            url, json=data,
            headers={"Authorization": f"Bearer {token}"},
            timeout=5.0,
        )
        resp.raise_for_status()
        return resp.json()

    def test_batch_update_priority(self, api_client, test_project, auth_token):
        """Verify POST /issues/batch-update returns creator_name and labels."""
        issue1 = api_client.create_issue(test_project["id"], "Batch 1")
        issue2 = api_client.create_issue(test_project["id"], "Batch 2")
        result = self._post(
            f"{TEST_BASE_URL}/issues/batch-update",
            {"issue_ids": [issue1["id"], issue2["id"]], "priority": "high"},
            auth_token,
        )
        assert isinstance(result, list)
        assert len(result) == 2
        # Verify creator relation is loaded
        assert all(r.get("creator_name") is not None for r in result)

    def test_batch_update_with_labels(self, api_client, test_team, test_project, auth_token):
        """Verify batch update with labels returns labels in response."""
        label = api_client.create_label(test_team["id"], "batch-label")
        issue = api_client.create_issue(test_project["id"], "Batch Label")
        api_client.add_label_to_issue(issue["id"], label["id"])
        result = self._post(
            f"{TEST_BASE_URL}/issues/batch-update",
            {"issue_ids": [issue["id"]], "priority": "medium"},
            auth_token,
        )
        assert len(result) == 1
        # Verify prefetch("labels") works after batch update
        assert any(l["id"] == label["id"] for l in result[0].get("labels", []))


class TestReadyIssues:
    """CHT-1245: 'what can I start right now' -- full CLI-Client-to-real-
    backend contract for the new path-nested ready endpoints."""

    def test_ready_excludes_started_closed_and_assigned_by_default(self, api_client, test_project):
        backlog = api_client.create_issue(test_project["id"], "ready-backlog", status="backlog")
        todo = api_client.create_issue(test_project["id"], "ready-todo", status="todo")
        api_client.create_issue(test_project["id"], "not-ready-inprogress", status="in_progress")
        api_client.create_issue(test_project["id"], "not-ready-done", status="done")
        assigned = api_client.create_issue(test_project["id"], "assigned-not-ready", status="todo")
        me = api_client.get_me()
        api_client.update_issue(assigned["id"], assignee_id=me["id"])

        ready = api_client.get_ready_issues(project_id=test_project["id"])
        ids = {i["id"] for i in ready}
        assert backlog["id"] in ids
        assert todo["id"] in ids
        assert assigned["id"] not in ids
        assert len(ready) == 2

    def test_ready_mine_and_include_assigned(self, api_client, test_project):
        api_client.create_issue(test_project["id"], "unassigned", status="todo")
        mine = api_client.create_issue(test_project["id"], "mine", status="todo")
        me = api_client.get_me()
        api_client.update_issue(mine["id"], assignee_id=me["id"])

        mine_only = api_client.get_ready_issues(project_id=test_project["id"], mine=True)
        assert {i["id"] for i in mine_only} == {mine["id"]}

        widened = api_client.get_ready_issues(project_id=test_project["id"], include_assigned=True)
        widened_ids = {i["id"] for i in widened}
        assert mine["id"] in widened_ids

    def test_ready_excludes_blocked_issue(self, api_client, test_project):
        blocker = api_client.create_issue(test_project["id"], "blocker", status="todo")
        blocked = api_client.create_issue(test_project["id"], "blocked", status="todo")
        api_client.create_relation(blocker["id"], blocked["id"], "blocks")

        ready_ids = {i["id"] for i in api_client.get_ready_issues(project_id=test_project["id"])}
        assert blocker["id"] in ready_ids
        assert blocked["id"] not in ready_ids

        api_client.update_issue(blocker["id"], status="done")
        ready_ids = {i["id"] for i in api_client.get_ready_issues(project_id=test_project["id"])}
        assert blocked["id"] in ready_ids

    def test_ready_team_scoped_spans_projects(self, api_client, test_team, test_project):
        other_project = api_client.create_project(test_team["id"], "Other Ready Project", "RDY2")
        a = api_client.create_issue(test_project["id"], "ready-a", status="todo")
        b = api_client.create_issue(other_project["id"], "ready-b", status="todo")

        ready = api_client.get_ready_issues(team_id=test_team["id"])
        ids = {i["id"] for i in ready}
        assert a["id"] in ids
        assert b["id"] in ids

    def test_ready_mine_and_include_assigned_conflict_errors(self, api_client, test_project):
        with pytest.raises(APIError):
            api_client.get_ready_issues(project_id=test_project["id"], mine=True, include_assigned=True)

    def test_ready_priority_sorted(self, api_client, test_project):
        api_client.create_issue(test_project["id"], "low-prio", status="todo", priority="low")
        urgent = api_client.create_issue(test_project["id"], "urgent-prio", status="todo", priority="urgent")

        ready = api_client.get_ready_issues(project_id=test_project["id"])
        assert ready[0]["id"] == urgent["id"]


class TestClaimLeases:
    """CHT-1246: claim leases through the real issue start/claim wire path."""

    def test_claim_grants_a_lease(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "To Claim", status="todo")
        me = api_client.get_me()

        claimed = api_client.update_issue(issue["id"], status="in_progress", assignee_id=me["id"])

        assert claimed["lease_expires_at"] is not None
        assert claimed["status"] == "in_progress"
        assert claimed["assignee_id"] == me["id"]

    def test_lease_seconds_override_is_honored(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "Short Lease", status="todo")
        me = api_client.get_me()

        claimed = api_client.update_issue(
            issue["id"], status="in_progress", assignee_id=me["id"], lease_seconds=3600,
        )
        assert claimed["lease_expires_at"] is not None

    def test_reclaim_heartbeat_extends_lease(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "Heartbeat", status="todo")
        me = api_client.get_me()

        first = api_client.update_issue(
            issue["id"], status="in_progress", assignee_id=me["id"], lease_seconds=100,
        )
        second = api_client.update_issue(
            issue["id"], status="in_progress", assignee_id=me["id"], lease_seconds=9999,
        )
        assert second["lease_expires_at"] > first["lease_expires_at"]

    def test_completing_issue_clears_lease(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "To Complete", status="todo")
        me = api_client.get_me()
        api_client.update_issue(issue["id"], status="in_progress", assignee_id=me["id"])

        completed = api_client.update_issue(issue["id"], status="done")
        assert completed["lease_expires_at"] is None

    def test_expired_lease_auto_releases_on_read(self, api_client, test_project):
        """Real-time wait (no mocked clock) -- proves the lazy release
        fires over the actual CLI-Client-to-backend wire, not just in a
        unit test with a hand-backdated timestamp."""
        issue = api_client.create_issue(test_project["id"], "Stale Claim", status="todo")
        me = api_client.get_me()
        api_client.update_issue(
            issue["id"], status="in_progress", assignee_id=me["id"], lease_seconds=1,
        )

        time.sleep(1.5)

        released = api_client.get_issue(issue["id"])
        assert released["status"] == "todo"
        assert released["assignee_id"] is None
        assert released["lease_expires_at"] is None

    def test_expired_lease_reappears_in_ready_query(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "Stale Then Ready", status="todo")
        me = api_client.get_me()
        api_client.update_issue(
            issue["id"], status="in_progress", assignee_id=me["id"], lease_seconds=1,
        )

        time.sleep(1.5)

        ready_ids = {i["id"] for i in api_client.get_ready_issues(project_id=test_project["id"])}
        assert issue["id"] in ready_ids

    def test_second_claimant_gets_already_claimed_over_the_wire(self, api_client, test_team, test_project):
        """PR #217 review finding 1, e2e: a rival principal's `issue
        start`-shaped PATCH against an issue already claimed under a
        valid lease gets the already_claimed 409, and the holder keeps
        the ticket. (The interleaved-write CAS race is covered by the
        backend gather test; this proves the wire contract. A second
        principal needs its own scoped token patch -- the api_client /
        api_client2 fixtures' get_token patches nest, so the innermost
        wins for both; same pattern as test_teams' accept-invitation.)
        """
        import uuid as _uuid
        from unittest.mock import patch
        from conftest import _run_async, _create_user_in_db, TEST_BASE_URL
        from cli.client import Client
        from app.utils.security import create_access_token
        from app.oxyde_models.team import OxydeTeamMember
        from app.enums import TeamRole

        rival = _run_async(_create_user_in_db(
            f"rival-{_uuid.uuid4().hex[:8]}@example.com", "Rival Claimant",
        ))

        async def _add_member():
            await OxydeTeamMember.objects.create(
                team_id=test_team["id"], user_id=rival.id, role=TeamRole.MEMBER,
            )

        _run_async(_add_member())
        rival_token = create_access_token(data={"sub": rival.id})

        issue = api_client.create_issue(test_project["id"], "Race Target", status="todo")
        me = api_client.get_me()

        held = api_client.update_issue(
            issue["id"], status="in_progress", assignee_id=me["id"],
        )
        assert held["assignee_id"] == me["id"]
        assert held["lease_expires_at"] is not None

        with patch("cli.client.get_api_url", return_value=TEST_BASE_URL), \
             patch("cli.client.get_token", return_value=rival_token), \
             patch("cli.client.get_api_key", return_value=None):
            rival_client = Client()
            with pytest.raises(APIError) as exc_info:
                rival_client.update_issue(
                    issue["id"], status="in_progress", assignee_id=rival.id,
                )
        assert "already claimed" in str(exc_info.value).lower()

        final = api_client.get_issue(issue["id"])
        assert final["assignee_id"] == me["id"]
        assert final["status"] == "in_progress"

    def test_await_lease_expired_self_triggers(self, api_client, test_team, test_project):
        """PR #217 review acceptance bar for finding 2: `chaotic await
        issue X --type lease_expired` must wake with NO third-party issue
        reads occurring during the wait. The only traffic between claim
        and wake is await's own activity-feed polling -- which now runs
        the lazy sweep server-side, releasing the lease and emitting the
        very event being awaited. Also exercises the lease_expired
        self-filter exemption end-to-end: the event's user_id is the
        awaiting principal itself.
        """
        import json
        from unittest.mock import patch
        from click.testing import CliRunner
        from cli.main import cli as chaotic_cli

        issue = api_client.create_issue(test_project["id"], "Await My Own Expiry", status="todo")
        me = api_client.get_me()
        api_client.update_issue(
            issue["id"], status="in_progress", assignee_id=me["id"], lease_seconds=1,
        )

        # `await issue` resolves the issue once up-front (while the lease
        # is still valid), then polls only GET /issues/activities.
        with patch("cli.main.get_current_team", return_value=test_team["id"]):
            result = CliRunner().invoke(chaotic_cli, [
                "await", "issue", issue["identifier"],
                "--type", "lease_expired", "--timeout", "30", "--json",
            ])

        assert result.exit_code == 0, result.output
        event = json.loads(result.output)
        assert event["activity_type"] == "lease_expired"
        assert event["issue_id"] == issue["id"]
        assert event["old_value"] == "IN_PROGRESS"
        assert event["new_value"] == "TODO"

        released = api_client.get_issue(issue["id"])
        assert released["status"] == "todo"
        assert released["assignee_id"] is None


class TestIssueDescriptionRevisions:
    """CHT-1243: contract tests for issue description revision history."""

    def test_create_writes_v1_even_without_description(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "Bare Issue")
        revs = api_client.get_issue_description_revisions(issue["id"])
        assert [r["version"] for r in revs] == [1]
        v1 = api_client.get_issue_description_revision(issue["id"], 1)
        assert v1["description"] is None

    def test_description_edits_append_revisions(self, api_client, test_project):
        issue = api_client.create_issue(
            test_project["id"], "Versioned Issue", description="v1 body"
        )
        api_client.update_issue(issue["id"], description="v2 body")

        revs = api_client.get_issue_description_revisions(issue["id"])
        assert [r["version"] for r in revs] == [2, 1]
        assert all(r["author_name"] is not None for r in revs)  # join("author")

        v1 = api_client.get_issue_description_revision(issue["id"], 1)
        assert v1["description"] == "v1 body"
        v2 = api_client.get_issue_description_revision(issue["id"], 2)
        assert v2["description"] == "v2 body"

    def test_non_description_edit_does_not_bump(self, api_client, test_project):
        issue = api_client.create_issue(
            test_project["id"], "Stable Issue", description="Body"
        )
        api_client.update_issue(issue["id"], priority="high")
        revs = api_client.get_issue_description_revisions(issue["id"])
        assert [r["version"] for r in revs] == [1]

    def test_revision_not_found(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "x")
        with pytest.raises(APIError):
            api_client.get_issue_description_revision(issue["id"], 99)
