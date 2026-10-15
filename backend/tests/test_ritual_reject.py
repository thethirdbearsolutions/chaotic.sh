"""Rejecting a ticket-level GATE request or REVIEW attestation (CHT-1606).

The default built is "keep": a reject records who, when and why, tells the
attester (and an agent's owner), and leaves the gate pending. A REVIEW
attestation is withdrawn so the agent attests again; a GATE request stays
open until the requester asks again. The ticket never moves.
"""
import pytest
import pytest_asyncio

from app.enums import (
    ApprovalMode,
    InboxEntryKind,
    IssueStatus,
    RitualTrigger,
    TeamRole,
)
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.issue import OxydeIssue, OxydeTicketLimbo
from app.oxyde_models.ritual import OxydeRitualAttestation, OxydeRitualRejection
from app.oxyde_models.team import OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.schemas.issue import IssueUpdate
from app.services.issue_service import IssueService, TicketRitualsError
from app.services.ritual_service import RitualService
from app.utils.security import create_access_token, get_password_hash

pytestmark = pytest.mark.asyncio


def _headers(user) -> dict:
    return {"Authorization": f"Bearer {create_access_token(data={'sub': user.id})}"}


async def _user(email: str, name: str, **extra):
    return await OxydeUser.objects.create(
        email=email, hashed_password=get_password_hash("pw-123456789"), name=name, **extra,
    )


@pytest_asyncio.fixture
async def owner(db, test_team):
    """A human admin who owns the agent (and is not the rejecter)."""
    user = await _user("owner@example.com", "Owner Person")
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=user.id, role=TeamRole.ADMIN)
    return user


@pytest_asyncio.fixture
async def agent(db, test_team, test_project, owner):
    """An agent identity on the team, owned by `owner`."""
    return await _user(
        "bot@example.com", "Bot", is_agent=True,
        parent_user_id=owner.id, agent_team_id=test_team.id, agent_project_id=test_project.id,
    )


async def _try_close(issue, user_id: str):
    issue = await OxydeIssue.objects.get(id=issue.id)
    return await IssueService().update(
        issue, IssueUpdate(status=IssueStatus.DONE), user_id=user_id, is_human_request=False,
    )


async def _reject(client, headers, ritual, issue, note="Tests are missing"):
    body = {} if note is None else {"note": note}
    return await client.post(f"/api/rituals/{ritual.id}/reject-issue/{issue.id}", json=body, headers=headers)


async def _approve(client, headers, ritual, issue):
    return await client.post(f"/api/rituals/{ritual.id}/approve-issue/{issue.id}", json={}, headers=headers)


async def _entries(issue, kind: InboxEntryKind, **filters):
    return await OxydeInboxEntry.objects.filter(issue_id=issue.id, kind=kind.name, **filters).all()


async def _pending_row(client, headers, issue, ritual):
    resp = await client.get(f"/api/rituals/issue/{issue.id}/pending", headers=headers)
    assert resp.status_code == 200, resp.text
    [row] = [r for r in resp.json()["pending_rituals"] if r["id"] == ritual.id]
    return row


class TestPermissionsMatchApprove:
    """Reject is refused exactly where approve is: same status, same
    reason, checked by one shared helper."""

    async def _both(self, client, headers, ritual, issue):
        approve = await _approve(client, headers, ritual, issue)
        reject = await _reject(client, headers, ritual, issue)
        return approve, reject

    async def test_non_member(self, client, test_issue, review_close_ritual, test_user2, auth_headers2):
        approve, reject = await self._both(client, auth_headers2, review_close_ritual, test_issue)
        # Outside the team the ritual is not there at all (CHT-1785).
        assert approve.status_code == reject.status_code == 404
        assert approve.json() == reject.json() == {"detail": "Ritual not found"}

    async def test_plain_member(self, client, test_team, test_issue, review_close_ritual, test_user2, auth_headers2):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        approve, reject = await self._both(client, auth_headers2, review_close_ritual, test_issue)
        assert approve.status_code == reject.status_code == 403

    async def test_agent_even_as_team_owner(
        self, client, test_team, test_issue, gate_close_ritual, agent_user, agent_headers,
    ):
        # Scoped to the team too, so it sees the ritual and the issue and
        # reaches the agent rule rather than the not-found (CHT-1785).
        agent_user.agent_team_id = test_team.id
        await agent_user.save(update_fields={"agent_team_id"})
        approve, reject = await self._both(client, agent_headers, gate_close_ritual, test_issue)
        assert approve.status_code == reject.status_code == 403
        assert "Agents cannot approve" in approve.json()["detail"]
        assert "Agents cannot reject" in reject.json()["detail"]

    async def test_unknown_ritual_and_issue(self, client, auth_headers, test_issue, review_close_ritual):
        missing = "00000000-0000-0000-0000-000000000000"
        for ritual_id, issue_id in ((missing, test_issue.id), (review_close_ritual.id, missing)):
            approve = await client.post(f"/api/rituals/{ritual_id}/approve-issue/{issue_id}", json={}, headers=auth_headers)
            reject = await client.post(
                f"/api/rituals/{ritual_id}/reject-issue/{issue_id}", json={"note": "x"}, headers=auth_headers,
            )
            assert approve.status_code == reject.status_code == 404

    async def test_sprint_ritual_is_refused(self, client, auth_headers, test_issue, make_ritual):
        ritual = await make_ritual(trigger=RitualTrigger.EVERY_SPRINT, approval_mode=ApprovalMode.REVIEW)
        approve, reject = await self._both(client, auth_headers, ritual, test_issue)
        assert approve.status_code == reject.status_code == 400

    async def test_auto_ritual_has_nothing_to_reject(self, client, auth_headers, test_issue, auto_close_ritual):
        resp = await _reject(client, auth_headers, auto_close_ritual, test_issue)
        assert resp.status_code == 400
        assert "GATE or REVIEW" in resp.json()["detail"]


class TestReasonRequired:
    @pytest.mark.parametrize("note", [None, "", "   \n "])
    async def test_missing_or_blank_reason_is_refused(
        self, client, auth_headers, test_issue, agent, review_close_ritual, note,
    ):
        await RitualService().attest_for_issue(
            ritual=review_close_ritual, issue_id=test_issue.id, user_id=agent.id, note="done",
        )
        resp = await _reject(client, auth_headers, review_close_ritual, test_issue, note=note)
        assert resp.status_code == 422
        assert await OxydeRitualRejection.objects.count() == 0
        assert await RitualService().get_issue_attestation(review_close_ritual.id, test_issue.id) is not None

    async def test_service_refuses_a_blank_reason_too(self, db, test_issue, test_user, gate_close_ritual):
        with pytest.raises(ValueError, match="reason"):
            await RitualService().reject_for_issue(gate_close_ritual, test_issue.id, test_user.id, "  ")


class TestRejectReview:
    async def _attested(self, test_issue, agent, ritual, note="All tests pass"):
        with pytest.raises(TicketRitualsError):
            await _try_close(test_issue, agent.id)
        return await RitualService().attest_for_issue(
            ritual=ritual, issue_id=test_issue.id, user_id=agent.id, note=note,
        )

    async def test_reject_withdraws_the_attestation_and_records_why(
        self, client, auth_headers, test_user, test_issue, agent, review_close_ritual,
    ):
        att = await self._attested(test_issue, agent, review_close_ritual)

        resp = await _reject(client, auth_headers, review_close_ritual, test_issue, note="Coverage dropped")

        assert resp.status_code == 200, resp.text
        body = resp.json()
        assert body["note"] == "Coverage dropped"
        assert body["approval_mode"] == "review"
        assert body["rejected_by"] == test_user.id
        assert body["rejecter"]["name"] == "Test User"
        assert body["attested_by"] == agent.id
        assert body["attester"]["owner_name"] == "Owner Person"
        assert body["attestation_note"] == "All tests pass"
        assert body["superseded_at"] is None
        # The gate stays pending: the attestation is gone, the ticket did not move.
        assert await OxydeRitualAttestation.objects.filter(id=att.id).count() == 0
        issue = await OxydeIssue.objects.get(id=test_issue.id)
        assert issue.status != IssueStatus.DONE

    async def test_the_attester_sees_the_reason_in_the_pending_view(
        self, client, auth_headers, test_issue, agent, review_close_ritual,
    ):
        await self._attested(test_issue, agent, review_close_ritual)
        await _reject(client, auth_headers, review_close_ritual, test_issue, note="Coverage dropped")

        row = await _pending_row(client, _headers(agent), test_issue, review_close_ritual)
        assert row["attestation"] is None  # attest again
        assert row["last_rejection"]["note"] == "Coverage dropped"
        assert row["last_rejection"]["rejected_by_name"] == "Test User"

    async def test_reject_shows_in_activity(self, client, auth_headers, test_user, test_issue, agent, review_close_ritual):
        await self._attested(test_issue, agent, review_close_ritual)
        await _reject(client, auth_headers, review_close_ritual, test_issue, note="Coverage dropped")

        resp = await client.get(f"/api/issues/{test_issue.id}/activities", headers=auth_headers)
        [act] = [a for a in resp.json() if a["activity_type"] == "ritual_rejected"]
        assert act["field_name"] == review_close_ritual.name
        assert act["new_value"] == "Coverage dropped"
        assert act["user_id"] == test_user.id

    async def test_reject_resolves_the_review_and_notifies_attester_and_owner(
        self, client, auth_headers, test_user, test_issue, agent, owner, review_close_ritual,
    ):
        await self._attested(test_issue, agent, review_close_ritual)
        assert await _entries(test_issue, InboxEntryKind.REVIEW_REQUESTED, read_at=None)

        await _reject(client, auth_headers, review_close_ritual, test_issue, note="Coverage dropped")

        assert not await _entries(test_issue, InboxEntryKind.REVIEW_REQUESTED, read_at=None)
        rejected = await _entries(test_issue, InboxEntryKind.GATE_REJECTED)
        assert {e.recipient_user_id for e in rejected} == {agent.id, owner.id}
        for e in rejected:
            assert e.body == "Coverage dropped"
            assert e.source_user_id == test_user.id
            assert e.ritual_id == review_close_ritual.id
        by_recipient = {e.recipient_user_id: e for e in rejected}
        assert "rejected your review" in by_recipient[agent.id].title
        assert "rejected Bot's review" in by_recipient[owner.id].title

        # Over the API too, as the inbox list and in the agent's own inbox.
        resp = await client.get("/api/inbox", headers=_headers(owner))
        [entry] = [e for e in resp.json() if e["kind"] == "gate_rejected"]
        assert entry["body"] == "Coverage dropped"
        resp = await client.get("/api/inbox", headers=_headers(agent))
        assert [e["kind"] for e in resp.json()] == ["gate_rejected"]

    async def test_owner_who_rejects_is_not_notified_of_their_own_reject(
        self, client, test_issue, agent, owner, review_close_ritual,
    ):
        await self._attested(test_issue, agent, review_close_ritual)
        await _reject(client, _headers(owner), review_close_ritual, test_issue)
        rejected = await _entries(test_issue, InboxEntryKind.GATE_REJECTED)
        assert [e.recipient_user_id for e in rejected] == [agent.id]

    async def test_reattesting_after_a_reject_works_and_can_be_approved(
        self, client, auth_headers, test_user, test_issue, agent, review_close_ritual,
    ):
        await self._attested(test_issue, agent, review_close_ritual)
        await _reject(client, auth_headers, review_close_ritual, test_issue, note="Coverage dropped")

        resp = await client.post(
            f"/api/rituals/{review_close_ritual.id}/attest-issue/{test_issue.id}",
            json={"note": "Coverage restored"}, headers=_headers(agent),
        )
        assert resp.status_code == 200, resp.text
        assert resp.json()["note"] == "Coverage restored"
        assert resp.json()["approved_at"] is None
        # Approvers are asked again, and the rejection reads as answered.
        assert await _entries(test_issue, InboxEntryKind.REVIEW_REQUESTED, read_at=None)
        row = await _pending_row(client, auth_headers, test_issue, review_close_ritual)
        assert row["attestation"]["note"] == "Coverage restored"
        assert row["last_rejection"]["superseded_at"] is not None

        resp = await _approve(client, auth_headers, review_close_ritual, test_issue)
        assert resp.status_code == 200, resp.text
        assert resp.json()["approved_by"] == test_user.id

    async def test_a_second_reject_or_an_approve_after_a_reject_is_409(
        self, client, auth_headers, test_user, test_issue, agent, review_close_ritual,
    ):
        await self._attested(test_issue, agent, review_close_ritual)
        first = await _reject(client, auth_headers, review_close_ritual, test_issue)

        for resp in (
            await _reject(client, auth_headers, review_close_ritual, test_issue),
            await _approve(client, auth_headers, review_close_ritual, test_issue),
        ):
            assert resp.status_code == 409
            detail = resp.json()["detail"]
            assert detail["error_code"] == "ritual_already_resolved"
            assert detail["resolution"] == "rejected"
            assert detail["resolved_by"] == test_user.id
            assert detail["resolved_at"][:19] == first.json()["rejected_at"][:19]

    async def test_reject_after_approve_is_409(self, client, auth_headers, test_user, test_issue, agent, review_close_ritual):
        await self._attested(test_issue, agent, review_close_ritual)
        assert (await _approve(client, auth_headers, review_close_ritual, test_issue)).status_code == 200

        resp = await _reject(client, auth_headers, review_close_ritual, test_issue)
        assert resp.status_code == 409
        assert resp.json()["detail"]["resolution"] == "approved"
        assert resp.json()["detail"]["resolved_by"] == test_user.id
        assert await OxydeRitualRejection.objects.count() == 0

    async def test_nothing_attested_is_404(self, client, auth_headers, test_issue, review_close_ritual):
        resp = await _reject(client, auth_headers, review_close_ritual, test_issue)
        assert resp.status_code == 404

    async def test_history_keeps_the_rejected_attestation(
        self, client, auth_headers, test_project, test_issue, agent, review_close_ritual,
    ):
        await self._attested(test_issue, agent, review_close_ritual, note="first try")
        await _reject(client, auth_headers, review_close_ritual, test_issue, note="Coverage dropped")

        resp = await client.get(f"/api/rituals/history?project_id={test_project.id}", headers=auth_headers)
        assert resp.status_code == 200, resp.text
        [row] = resp.json()
        assert row["note"] == "first try"
        assert row["attested_by"] == agent.id
        assert row["rejection_note"] == "Coverage dropped"
        assert row["rejected_by_name"] == "Test User"
        assert row["rejecter"]["name"] == "Test User"
        assert row["approval_mode"] == "review"
        assert row["issue_identifier"] == test_issue.identifier


class TestRejectGate:
    async def _requested(self, test_issue, agent):
        with pytest.raises(TicketRitualsError):
            await _try_close(test_issue, agent.id)

    async def test_reject_keeps_the_gate_pending_and_the_ticket_in_place(
        self, client, auth_headers, test_user, test_issue, agent, owner, gate_close_ritual,
    ):
        await self._requested(test_issue, agent)
        status_before = (await OxydeIssue.objects.get(id=test_issue.id)).status
        assert await _entries(test_issue, InboxEntryKind.GATE_PENDING, read_at=None)

        resp = await _reject(client, auth_headers, gate_close_ritual, test_issue, note="Not this sprint")

        assert resp.status_code == 200, resp.text
        assert resp.json()["approval_mode"] == "gate"
        assert resp.json()["attested_by"] == agent.id  # the requester
        assert resp.json()["attested_at"] is not None
        assert (await OxydeIssue.objects.get(id=test_issue.id)).status == status_before
        assert await OxydeTicketLimbo.objects.filter(issue_id=test_issue.id, cleared_at=None).count() == 1
        # The gate is still pending: only the rejecter's prompt is settled,
        # the other approver can still complete it (review finding 4).
        unread = await _entries(test_issue, InboxEntryKind.GATE_PENDING, read_at=None)
        assert {e.recipient_user_id for e in unread} == {owner.id}
        rejected = await _entries(test_issue, InboxEntryKind.GATE_REJECTED)
        assert {e.recipient_user_id for e in rejected} == {agent.id, owner.id}
        assert "gate request" in rejected[0].title

        row = await _pending_row(client, _headers(agent), test_issue, gate_close_ritual)
        assert row["attestation"] is None
        assert row["last_rejection"]["note"] == "Not this sprint"

        # The approvers still see it, marked as sent back.
        resp = await client.get(f"/api/rituals/pending-approvals?project_id={test_issue.project_id}", headers=auth_headers)
        [item] = resp.json()
        [gate] = item["pending_approvals"]
        assert gate["rejection_note"] == "Not this sprint"
        assert gate["rejected_by_name"] == "Test User"

    async def test_asking_again_renotifies_the_approvers(
        self, client, auth_headers, test_user, test_issue, agent, owner, gate_close_ritual,
    ):
        await self._requested(test_issue, agent)
        await _reject(client, auth_headers, gate_close_ritual, test_issue)

        await self._requested(test_issue, agent)

        pending = await _entries(test_issue, InboxEntryKind.GATE_PENDING, read_at=None)
        assert {e.recipient_user_id for e in pending} == {test_user.id, owner.id}  # every admin
        # The rejecter is paged afresh; the other admin's entry was never
        # settled, so it is not duplicated.
        assert len(await _entries(test_issue, InboxEntryKind.GATE_PENDING)) == 3
        rejection = await RitualService().latest_rejection(gate_close_ritual.id, test_issue.id)
        assert rejection.superseded_at is not None
        # Asking again answered the rejection: the requester's own
        # "rejected" entry is settled, the owner's copy stays as a record.
        rejected_unread = await _entries(test_issue, InboxEntryKind.GATE_REJECTED, read_at=None)
        assert {e.recipient_user_id for e in rejected_unread} == {owner.id}
        # Asking a third time without a new reject does not page anyone again.
        await self._requested(test_issue, agent)
        assert len(await _entries(test_issue, InboxEntryKind.GATE_PENDING)) == 3

        # And it can now be rejected again, or completed.
        resp = await client.post(
            f"/api/rituals/{gate_close_ritual.id}/complete-issue/{test_issue.id}",
            json={"note": "ok now"}, headers=auth_headers,
        )
        assert resp.status_code == 200, resp.text
        resp = await _reject(client, auth_headers, gate_close_ritual, test_issue)
        assert resp.status_code == 409
        assert resp.json()["detail"]["resolution"] == "approved"

    async def test_a_second_reject_is_409(self, client, auth_headers, test_user, test_issue, agent, gate_close_ritual):
        await self._requested(test_issue, agent)
        await _reject(client, auth_headers, gate_close_ritual, test_issue)
        resp = await _reject(client, auth_headers, gate_close_ritual, test_issue)
        assert resp.status_code == 409
        assert resp.json()["detail"]["resolution"] == "rejected"
        assert resp.json()["detail"]["resolved_by"] == test_user.id

    async def test_completing_after_a_reject_answers_it(
        self, client, auth_headers, test_issue, agent, gate_close_ritual,
    ):
        await self._requested(test_issue, agent)
        await _reject(client, auth_headers, gate_close_ritual, test_issue)
        resp = await client.post(
            f"/api/rituals/{gate_close_ritual.id}/complete-issue/{test_issue.id}",
            json={"note": "changed my mind"}, headers=auth_headers,
        )
        assert resp.status_code == 200, resp.text
        assert await RitualService().outstanding_rejection(gate_close_ritual.id, test_issue.id) is None

    async def test_no_request_is_404(self, client, auth_headers, test_issue, gate_close_ritual):
        resp = await _reject(client, auth_headers, gate_close_ritual, test_issue)
        assert resp.status_code == 404
        assert "no request to reject" in resp.json()["detail"]

    async def test_reject_broadcasts(self, client, auth_headers, test_issue, agent, gate_close_ritual, captured_broadcasts):
        await self._requested(test_issue, agent)
        captured_broadcasts.clear()
        await _reject(client, auth_headers, gate_close_ritual, test_issue)
        types = [m.get("type") for _, m in captured_broadcasts]
        assert "ritual_rejected" in types


class TestReviewFindings:
    """PR #353 independent review."""

    async def test_the_retry_that_asks_again_still_shows_the_reason(
        self, client, auth_headers, test_issue, agent, gate_close_ritual,
    ):
        """Finding 1: asking again marks the rejection answered, but the
        refusal of that very attempt is where the agent reads why."""
        from app.api.issues import _ritual_refusal_detail

        with pytest.raises(TicketRitualsError):
            await _try_close(test_issue, agent.id)
        await _reject(client, auth_headers, gate_close_ritual, test_issue, note="Wait for the freeze to lift")

        with pytest.raises(TicketRitualsError) as retry:
            await _try_close(test_issue, agent.id)
        detail = await _ritual_refusal_detail(retry.value, "ticket_rituals_pending", "Ticket has pending rituals", "closing")
        assert "Wait for the freeze to lift" in detail["message"]
        [rej] = detail["rejections"]
        assert rej["ritual"] == gate_close_ritual.name
        assert rej["note"] == "Wait for the freeze to lift"
        assert rej["rejected_by_name"] == "Test User"
        assert rej["asked_again"] is True
        # It is answered all the same: the next retry does not repeat it.
        with pytest.raises(TicketRitualsError) as third:
            await _try_close(test_issue, agent.id)
        detail = await _ritual_refusal_detail(third.value, "ticket_rituals_pending", "Ticket has pending rituals", "closing")
        assert detail["rejections"] == []
        assert "freeze" not in detail["message"]

    async def test_the_refusal_names_an_outstanding_review_rejection(
        self, client, auth_headers, test_issue, agent, review_close_ritual,
    ):
        from app.api.issues import _ritual_refusal_detail

        with pytest.raises(TicketRitualsError):
            await _try_close(test_issue, agent.id)
        await RitualService().attest_for_issue(
            ritual=review_close_ritual, issue_id=test_issue.id, user_id=agent.id, note="done",
        )
        await _reject(client, auth_headers, review_close_ritual, test_issue, note="- [x] add tests [/]")
        with pytest.raises(TicketRitualsError) as retry:
            await _try_close(test_issue, agent.id)
        detail = await _ritual_refusal_detail(retry.value, "ticket_rituals_pending", "Ticket has pending rituals", "closing")
        [rej] = detail["rejections"]
        assert rej["note"] == "- [x] add tests [/]"
        assert rej["asked_again"] is False

    async def test_concurrent_rejects_cannot_both_land(
        self, client, auth_headers, test_user, test_issue, agent, gate_close_ritual, monkeypatch,
    ):
        """Finding 3: the second of two simultaneous rejects passes the
        read check (simulated here) and hits uq_ritual_rejection_outstanding,
        which surfaces as the ordinary already-rejected 409."""
        with pytest.raises(TicketRitualsError):
            await _try_close(test_issue, agent.id)
        assert (await _reject(client, auth_headers, gate_close_ritual, test_issue)).status_code == 200

        real = RitualService.outstanding_rejection
        calls = {"n": 0}

        async def blind_first_read(self, ritual_id, issue_id):
            calls["n"] += 1
            return None if calls["n"] == 1 else await real(self, ritual_id, issue_id)

        monkeypatch.setattr(RitualService, "outstanding_rejection", blind_first_read)
        resp = await _reject(client, auth_headers, gate_close_ritual, test_issue, note="me too")
        assert resp.status_code == 409, resp.text
        assert resp.json()["detail"]["resolution"] == "rejected"
        assert resp.json()["detail"]["resolved_by"] == test_user.id
        assert await OxydeRitualRejection.objects.count() == 1

    async def test_a_review_race_rolls_the_withdrawal_back(
        self, client, auth_headers, test_issue, agent, review_close_ritual, monkeypatch,
    ):
        """The same race on a REVIEW: the losing reject's attestation delete
        is rolled back with it."""
        with pytest.raises(TicketRitualsError):
            await _try_close(test_issue, agent.id)
        await RitualService().attest_for_issue(
            ritual=review_close_ritual, issue_id=test_issue.id, user_id=agent.id, note="done",
        )
        # A rejection that is somehow still outstanding next to a live
        # attestation (an attest whose supersede failed) is settled, not a 409.
        await OxydeRitualRejection.objects.create(
            ritual_id=review_close_ritual.id, issue_id=test_issue.id, note="stale",
        )
        resp = await _reject(client, auth_headers, review_close_ritual, test_issue, note="fresh")
        assert resp.status_code == 200, resp.text
        assert await RitualService().outstanding_rejection(review_close_ritual.id, test_issue.id) is not None
        assert await OxydeRitualRejection.objects.filter(superseded_at=None).count() == 1

    async def test_an_attester_who_no_longer_exists_is_not_a_500(
        self, client, auth_headers, test_issue, agent, review_close_ritual, monkeypatch,
    ):
        """Finding 5: in a migrated database attestations.attested_by has
        no foreign key (0017) and this table's column does; a dangling
        attester is recorded as unknown. The test schema is built from the
        models, which do declare that key, so the dangling id is served by
        the read instead of written."""
        with pytest.raises(TicketRitualsError):
            await _try_close(test_issue, agent.id)
        await RitualService().attest_for_issue(
            ritual=review_close_ritual, issue_id=test_issue.id, user_id=agent.id, note="done",
        )
        real = RitualService.get_issue_attestation

        async def dangling(self, ritual_id, issue_id):
            att = await real(self, ritual_id, issue_id)
            if att is not None:
                att.attested_by = "ghost-user-id"
            return att

        monkeypatch.setattr(RitualService, "get_issue_attestation", dangling)

        resp = await _reject(client, auth_headers, review_close_ritual, test_issue, note="who?")

        assert resp.status_code == 200, resp.text
        assert resp.json()["attested_by"] is None
        assert resp.json()["attestation_note"] == "done"

    async def test_reattesting_settles_the_attesters_rejected_entry(
        self, client, auth_headers, test_issue, agent, owner, review_close_ritual,
    ):
        """Finding 4: the attester's GATE_REJECTED entry is resolved once
        the rejection is answered."""
        with pytest.raises(TicketRitualsError):
            await _try_close(test_issue, agent.id)
        service = RitualService()
        await service.attest_for_issue(ritual=review_close_ritual, issue_id=test_issue.id, user_id=agent.id, note="1")
        await _reject(client, auth_headers, review_close_ritual, test_issue)
        unread = await _entries(test_issue, InboxEntryKind.GATE_REJECTED, read_at=None)
        assert {e.recipient_user_id for e in unread} == {agent.id, owner.id}

        await service.attest_for_issue(ritual=review_close_ritual, issue_id=test_issue.id, user_id=agent.id, note="2")

        unread = await _entries(test_issue, InboxEntryKind.GATE_REJECTED, read_at=None)
        assert {e.recipient_user_id for e in unread} == {owner.id}

    async def test_completing_a_rejected_gate_settles_the_rejected_entry(
        self, client, auth_headers, test_issue, agent, gate_close_ritual,
    ):
        with pytest.raises(TicketRitualsError):
            await _try_close(test_issue, agent.id)
        await _reject(client, auth_headers, gate_close_ritual, test_issue)
        resp = await client.post(
            f"/api/rituals/{gate_close_ritual.id}/complete-issue/{test_issue.id}",
            json={"note": "fine"}, headers=auth_headers,
        )
        assert resp.status_code == 200, resp.text
        assert not await _entries(test_issue, InboxEntryKind.GATE_REJECTED, read_at=None, recipient_user_id=agent.id)
        assert not await _entries(test_issue, InboxEntryKind.GATE_PENDING, read_at=None)

    async def test_a_ritual_from_another_project_is_refused(
        self, client, auth_headers, test_team, test_issue, test_user,
    ):
        """Finding 11: the cross-project 400, same as approve."""
        from app.oxyde_models.project import OxydeProject
        from app.oxyde_models.ritual import OxydeRitual

        other = await OxydeProject.objects.create(team_id=test_team.id, name="Other", key="OTH")
        ritual = await OxydeRitual.objects.create(
            project_id=other.id, name="elsewhere", prompt="?",
            trigger=RitualTrigger.TICKET_CLOSE, approval_mode=ApprovalMode.REVIEW,
        )
        approve = await _approve(client, auth_headers, ritual, test_issue)
        reject = await _reject(client, auth_headers, ritual, test_issue)
        assert approve.status_code == reject.status_code == 400
        assert "does not belong" in reject.json()["detail"]


async def test_deleting_the_issue_removes_its_rejections(client, auth_headers, test_issue, agent, gate_close_ritual):
    with pytest.raises(TicketRitualsError):
        await _try_close(test_issue, agent.id)
    await _reject(client, auth_headers, gate_close_ritual, test_issue)
    resp = await client.delete(f"/api/issues/{test_issue.id}", headers=auth_headers)
    assert resp.status_code == 204, resp.text
    assert await OxydeRitualRejection.objects.count() == 0
