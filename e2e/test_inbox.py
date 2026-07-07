"""E2E contract tests for the Inbox feature (CHT-1250/1251).

Real CLI client, real FastAPI backend, real migrations (this exercises
migrations/0009_inbox_entries.py end-to-end, not just the hand-rolled
backend/tests/conftest.py schema).

Note on multi-user auth: conftest's `api_client`/`api_client2` fixtures
each patch the *same* module-level `cli.client.get_token`, so having both
fixtures alive at once (as test parameters) means whichever was set up
last silently wins for BOTH clients' calls -- there's no existing e2e
test that actually uses both simultaneously to have caught this. Instead
(mirroring test_teams.py::test_accept_invitation's own workaround), a
second identity's calls are scoped tightly inside `_as_user(...)`, which
properly nests within and restores api_client's patch on exit.
"""
from contextlib import contextmanager
from unittest.mock import patch

import pytest

from app.utils.security import create_access_token
from cli.client import APIError, Client
from conftest import TEST_BASE_URL, _create_user_in_db, _run_async


@contextmanager
def _as_user(user):
    """A Client authenticated as `user`, scoped to this `with` block only."""
    token = create_access_token(data={"sub": user.id})
    with patch('cli.client.get_api_url', return_value=TEST_BASE_URL), \
         patch('cli.client.get_token', return_value=token), \
         patch('cli.client.get_api_key', return_value=None):
        yield Client()


def _add_member(team_id, user_id, role="member"):
    """Add a user to a team directly (bypassing the invitation flow),
    mirroring e2e/test_teams.py's test_update_member_role_via_cli_client.
    """
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    async def _create():
        await OxydeTeamMember.objects.create(
            team_id=team_id, user_id=user_id, role=TeamRole[role.upper()],
        )

    _run_async(_create())


def _make_member(team_id, first_name):
    """Create + add a team member with a distinct first name.

    Mention resolution is first-name based (InboxService._member_handle);
    conftest's test_user ("E2E Test User") and test_user2 ("E2E Test User
    2") share the "E2E" first token, so a mention test needs someone else
    to get an unambiguous handle.
    """
    user = _run_async(_create_user_in_db(
        f"{first_name.lower()}@example.com", f"{first_name} Mentioned",
    ))
    _add_member(team_id, user.id)
    return user


class TestInboxList:
    def test_empty_inbox(self, api_client, test_team):
        entries = api_client.get_inbox(test_team["id"])
        assert entries == []

    def test_unread_count_zero_initially(self, api_client, test_team):
        result = api_client.get_inbox_unread_count(test_team["id"])
        assert result["unread_count"] == 0

    def test_mark_all_read_on_empty_inbox(self, api_client, test_team):
        result = api_client.mark_all_inbox_read(test_team["id"])
        assert result["marked_count"] == 0


class TestGatePendingFlow:
    def test_claim_attempt_with_gate_ritual_populates_inbox(self, api_client, test_project, test_team):
        """A blocked claim attempt (GATE ritual) surfaces a gate_pending
        inbox entry for the team's admin(s) -- here, the sole owner.

        Rituals only gate agent (API-key) requests by default; a JWT
        ("human") request only hits the ritual check when the project
        opts in via human_rituals_required.
        """
        api_client.update_project(test_project["id"], human_rituals_required=True)
        api_client.create_ritual(
            test_project["id"], "e2e-gate-claim", "Did you review this?",
            trigger="ticket_claim", approval_mode="gate",
        )
        issue = api_client.create_issue(test_project["id"], "E2E Gate Issue")

        with pytest.raises(APIError):
            api_client.update_issue(issue["id"], status="in_progress")

        entries = api_client.get_inbox(test_team["id"])
        gate_entries = [e for e in entries if e["kind"] == "gate_pending"]
        assert len(gate_entries) == 1
        assert gate_entries[0]["issue_identifier"] == issue["identifier"]
        assert gate_entries[0]["read_at"] is None

        unread = api_client.get_inbox_unread_count(test_team["id"])
        assert unread["unread_count"] == 1

    def test_completing_the_gate_resolves_the_inbox_entry(self, api_client, test_project, test_team):
        api_client.update_project(test_project["id"], human_rituals_required=True)
        ritual = api_client.create_ritual(
            test_project["id"], "e2e-gate-claim-2", "Did you review this?",
            trigger="ticket_claim", approval_mode="gate",
        )
        issue = api_client.create_issue(test_project["id"], "E2E Gate Issue 2")

        with pytest.raises(APIError):
            api_client.update_issue(issue["id"], status="in_progress")

        api_client.complete_gate_ritual_for_issue(ritual["id"], issue["id"], note="Reviewed")

        entries = api_client.get_inbox(test_team["id"], unread=True)
        assert not any(e["issue_identifier"] == issue["identifier"] for e in entries)


class TestReviewRequestedFlow:
    def test_attest_review_ritual_populates_inbox(self, api_client, test_project, test_team):
        api_client.update_project(test_project["id"], human_rituals_required=True)
        ritual = api_client.create_ritual(
            test_project["id"], "e2e-review-close", "Did you write tests?",
            trigger="ticket_close", approval_mode="review",
        )
        issue = api_client.create_issue(test_project["id"], "E2E Review Issue")

        with pytest.raises(APIError):
            api_client.update_issue(issue["id"], status="done")

        api_client.attest_ritual_for_issue(ritual["id"], issue["id"], note="Tests written")

        entries = api_client.get_inbox(test_team["id"])
        review_entries = [e for e in entries if e["kind"] == "review_requested"]
        assert len(review_entries) == 1
        assert review_entries[0]["issue_identifier"] == issue["identifier"]

    def test_approving_the_review_resolves_the_inbox_entry(self, api_client, test_project, test_team):
        api_client.update_project(test_project["id"], human_rituals_required=True)
        ritual = api_client.create_ritual(
            test_project["id"], "e2e-review-close-2", "Did you write tests?",
            trigger="ticket_close", approval_mode="review",
        )
        issue = api_client.create_issue(test_project["id"], "E2E Review Issue 2")

        with pytest.raises(APIError):
            api_client.update_issue(issue["id"], status="done")

        api_client.attest_ritual_for_issue(ritual["id"], issue["id"], note="Tests written")
        api_client.approve_issue_attestation(ritual["id"], issue["id"])

        entries = api_client.get_inbox(test_team["id"], unread=True)
        assert not any(e["issue_identifier"] == issue["identifier"] for e in entries)


class TestAssignmentFlow:
    def test_assigning_an_issue_notifies_the_assignee(self, api_client, test_project, test_team):
        assignee = _make_member(test_team["id"], "Zara")
        issue = api_client.create_issue(test_project["id"], "E2E Assignment Issue")

        api_client.update_issue(issue["id"], assignee_id=assignee.id)

        with _as_user(assignee) as client2:
            entries = client2.get_inbox(test_team["id"])
        assignment_entries = [e for e in entries if e["kind"] == "assignment"]
        assert len(assignment_entries) == 1
        assert assignment_entries[0]["issue_identifier"] == issue["identifier"]

        # The assignee's own inbox got the entry -- the assigner's did not.
        assert api_client.get_inbox(test_team["id"]) == []


class TestMentionFlow:
    def test_mentioning_a_teammate_in_a_comment_notifies_them(self, api_client, test_project, test_team):
        mentioned = _make_member(test_team["id"], "Zara")
        issue = api_client.create_issue(test_project["id"], "E2E Mention Issue")

        api_client.create_comment(issue["id"], "cc @zara take a look please")

        with _as_user(mentioned) as client2:
            entries = client2.get_inbox(test_team["id"])
        mention_entries = [e for e in entries if e["kind"] == "mention"]
        assert len(mention_entries) == 1
        assert mention_entries[0]["issue_identifier"] == issue["identifier"]


class TestMarkRead:
    def test_mark_read_then_mark_all_read(self, api_client, test_project, test_team):
        assignee = _make_member(test_team["id"], "Zara")
        issue1 = api_client.create_issue(test_project["id"], "E2E Mark Read 1")
        issue2 = api_client.create_issue(test_project["id"], "E2E Mark Read 2")
        api_client.update_issue(issue1["id"], assignee_id=assignee.id)
        api_client.update_issue(issue2["id"], assignee_id=assignee.id)

        with _as_user(assignee) as client2:
            entries = client2.get_inbox(test_team["id"])
            assert len(entries) == 2

            client2.mark_inbox_read(entries[0]["id"])
            unread = client2.get_inbox(test_team["id"], unread=True)
            assert len(unread) == 1

            result = client2.mark_all_inbox_read(test_team["id"])
            assert result["marked_count"] == 1
            assert client2.get_inbox(test_team["id"], unread=True) == []

    def test_mark_read_rejects_someone_elses_entry(self, api_client, test_project, test_team):
        assignee = _make_member(test_team["id"], "Zara")
        issue = api_client.create_issue(test_project["id"], "E2E Not Yours")
        api_client.update_issue(issue["id"], assignee_id=assignee.id)

        with _as_user(assignee) as client2:
            entries = client2.get_inbox(test_team["id"])

        with pytest.raises(APIError):
            api_client.mark_inbox_read(entries[0]["id"])
