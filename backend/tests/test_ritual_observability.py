"""Observability tests for the ritual + intent state machine.

Every state transition must emit an OxydeIssueActivity row AND broadcast
a WebSocket event. The unified model defines five canonical events:

* INTENT_OPENED   — a claim/close attempt entered limbo
* RITUAL_ATTESTED — an attestation row was written (existing event,
                    re-anchored within the intent lifecycle)
* RITUAL_APPROVED — a REVIEW attestation was approved (NEW: today
                    approval emits nothing, which is finding #11)
* INTENT_CLEARED  — last block on an intent resolved; transition fires
* INTENT_CANCELED — explicit cancel (future scope, not tested here)

Sprint-level events are also asserted; today they emit nothing
(finding #10, #12).

Tests use the `captured_broadcasts` fixture (see conftest) to record
every websocket message dispatched during the test. Activity rows are
queried directly from the OxydeIssueActivity table.
"""
import pytest

from app.enums import (
    ActivityType,
    ApprovalMode,
    IssueStatus,
    RitualTrigger,
)
from app.oxyde_models.issue import OxydeIssue, OxydeIssueActivity
from app.schemas.issue import IssueUpdate
from app.services.issue_service import IssueService, ClaimRitualsError, TicketRitualsError
from app.services.ritual_service import RitualService


def _activity_types(rows) -> list[str]:
    """Extract activity_type values, accepting both enum and string."""
    out = []
    for r in rows:
        v = r.activity_type
        out.append(v.value if hasattr(v, "value") else v)
    return out


def _broadcast_types(captured) -> list[str]:
    """Extract event 'type' from captured broadcasts."""
    return [msg.get("type") for _team, msg in captured]


# ---------------------------------------------------------------------------
# INTENT_OPENED
# ---------------------------------------------------------------------------


class TestIntentOpenedEmitsEvents:
    @pytest.mark.asyncio
    async def test_claim_intent_opens_emits_activity_and_broadcast(
        self, db, test_issue, test_user, gate_claim_ritual, captured_broadcasts
    ):
        with pytest.raises(ClaimRitualsError):
            await IssueService().update(
                test_issue,
                IssueUpdate(status=IssueStatus.IN_PROGRESS),
                user_id=test_user.id,
                is_human_request=False,
            )

        rows = await OxydeIssueActivity.objects.filter(issue_id=test_issue.id).all()
        assert "intent_opened" in _activity_types(rows), (
            "INTENT_OPENED activity must be written when a claim attempt "
            "creates limbo. New ActivityType.INTENT_OPENED enum value "
            "needed."
        )
        assert "intent_opened" in _broadcast_types(captured_broadcasts), (
            "INTENT_OPENED must also broadcast over WebSocket so overseers "
            "see the agent's intent."
        )

    @pytest.mark.asyncio
    async def test_close_intent_opens_emits_activity_and_broadcast(
        self, db, test_project, test_user, gate_close_ritual, captured_broadcasts
    ):
        from app.oxyde_models.issue import OxydeIssue
        issue = await OxydeIssue.objects.create(
            project_id=test_project.id,
            identifier="PROJ-500",
            number=500,
            title="Close intent observability",
            creator_id=test_user.id,
            status=IssueStatus.IN_PROGRESS,
        )
        with pytest.raises(TicketRitualsError):
            await IssueService().update(
                issue,
                IssueUpdate(status=IssueStatus.DONE),
                user_id=test_user.id,
                is_human_request=False,
            )

        rows = await OxydeIssueActivity.objects.filter(issue_id=issue.id).all()
        assert "intent_opened" in _activity_types(rows)
        assert "intent_opened" in _broadcast_types(captured_broadcasts)


# ---------------------------------------------------------------------------
# RITUAL_APPROVED (NEW)
# ---------------------------------------------------------------------------


class TestRitualApprovedEmitsEvents:
    @pytest.mark.asyncio
    async def test_review_approval_emits_activity_and_broadcast(
        self, db, test_issue, test_user, review_close_ritual, captured_broadcasts
    ):
        # Open intent.
        test_issue.status = IssueStatus.IN_PROGRESS
        await test_issue.save(update_fields={"status"})
        with pytest.raises(TicketRitualsError):
            await IssueService().update(
                test_issue,
                IssueUpdate(status=IssueStatus.DONE),
                user_id=test_user.id,
                is_human_request=False,
            )

        # Attest, then approve.
        att = await RitualService().attest_for_issue(
            review_close_ritual, test_issue.id, test_user.id, note="ready"
        )
        # Reset captured to focus on approval-time emissions only.
        captured_broadcasts.clear()
        await RitualService().approve_for_issue(att, test_user.id)

        rows = await OxydeIssueActivity.objects.filter(issue_id=test_issue.id).all()
        assert "ritual_approved" in _activity_types(rows), (
            "Approval must emit a RITUAL_APPROVED activity. Today the "
            "approve() service method emits nothing — finding #11."
        )
        assert "ritual_approved" in _broadcast_types(captured_broadcasts), (
            "Approval must broadcast so the agent's await primitive can "
            "wake on it."
        )


# ---------------------------------------------------------------------------
# INTENT_CLEARED
# ---------------------------------------------------------------------------


class TestIntentClearedEmitsEvents:
    @pytest.mark.asyncio
    async def test_clearing_last_block_emits_intent_cleared(
        self, db, test_issue, test_user, gate_claim_ritual, captured_broadcasts
    ):
        with pytest.raises(ClaimRitualsError):
            await IssueService().update(
                test_issue,
                IssueUpdate(status=IssueStatus.IN_PROGRESS),
                user_id=test_user.id,
                is_human_request=False,
            )
        captured_broadcasts.clear()

        await RitualService().complete_gate_ritual_for_issue(
            gate_claim_ritual, test_issue.id, test_user.id, note="ok"
        )

        rows = await OxydeIssueActivity.objects.filter(issue_id=test_issue.id).all()
        assert "intent_cleared" in _activity_types(rows), (
            "When the last block resolves and the auto-transition fires, "
            "an INTENT_CLEARED activity must be written."
        )
        assert "intent_cleared" in _broadcast_types(captured_broadcasts), (
            "INTENT_CLEARED must broadcast — this is the canonical wake "
            "event for `chaotic await issue CHT-X`."
        )

        # CHT-1225: the auto-transition changes issue.status just like a
        # direct PATCH does, but previously only ever emitted the
        # 'activity' broadcast above -- board/issue-list/sprints views
        # don't listen to 'activity', only 'issue', so they went stale
        # after a ritual-gated claim/close.
        issue_broadcasts = [
            msg for _team, msg in captured_broadcasts if msg.get("entity") == "issue"
        ]
        assert issue_broadcasts, (
            "Auto-transition must also broadcast an 'issue' event (not "
            "just 'activity') so board/list/sprints views refresh."
        )
        assert issue_broadcasts[0]["type"] == "updated"
        assert issue_broadcasts[0]["data"]["status"] == "in_progress"

    @pytest.mark.asyncio
    async def test_clearing_intermediate_block_does_not_emit_intent_cleared(
        self, db, test_issue, test_user, make_ritual, captured_broadcasts
    ):
        r1 = await make_ritual(
            name="b1", trigger=RitualTrigger.TICKET_CLAIM, approval_mode=ApprovalMode.GATE,
        )
        await make_ritual(
            name="b2", trigger=RitualTrigger.TICKET_CLAIM, approval_mode=ApprovalMode.GATE,
        )
        with pytest.raises(ClaimRitualsError):
            await IssueService().update(
                test_issue,
                IssueUpdate(status=IssueStatus.IN_PROGRESS),
                user_id=test_user.id,
                is_human_request=False,
            )
        captured_broadcasts.clear()

        # Clear only the first block.
        await RitualService().complete_gate_ritual_for_issue(
            r1, test_issue.id, test_user.id, note="one of two"
        )

        assert "intent_cleared" not in _broadcast_types(captured_broadcasts), (
            "INTENT_CLEARED only fires when ALL blocks resolve."
        )


# ---------------------------------------------------------------------------
# Sprint-level events (currently silent — finding #10, #12)
# ---------------------------------------------------------------------------


class TestSprintRitualEventsObservable:
    @pytest.mark.asyncio
    async def test_sprint_attest_emits_broadcast(
        self, db, test_sprint, test_user, make_ritual, captured_broadcasts
    ):
        ritual = await make_ritual(
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.AUTO,
            note_required=False,
        )
        await RitualService().attest(ritual, test_sprint.id, test_user.id, note=None)

        types = _broadcast_types(captured_broadcasts)
        assert any("attested" in (t or "") for t in types), (
            "Sprint-level attestation must broadcast. Today only "
            "issue-level attests do — finding #10."
        )

    @pytest.mark.asyncio
    async def test_sprint_approve_emits_broadcast(
        self, db, test_sprint, test_user, make_ritual, captured_broadcasts
    ):
        ritual = await make_ritual(
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.REVIEW,
        )
        att = await RitualService().attest(
            ritual, test_sprint.id, test_user.id, note="please"
        )
        captured_broadcasts.clear()
        await RitualService().approve(att, test_user.id)

        types = _broadcast_types(captured_broadcasts)
        assert any("approved" in (t or "") for t in types), (
            "Sprint-level approve must broadcast. Today it emits nothing "
            "— finding #12."
        )


# ---------------------------------------------------------------------------
# Existing RITUAL_ATTESTED still emits (regression guard for refactor)
# ---------------------------------------------------------------------------


class TestRitualAttestedStillEmitsAfterRefactor:
    @pytest.mark.asyncio
    async def test_issue_attest_emits_activity_and_broadcast(
        self, db, test_issue, test_user, auto_close_ritual, captured_broadcasts
    ):
        await RitualService().attest_for_issue(
            auto_close_ritual, test_issue.id, test_user.id, note="ok"
        )

        rows = await OxydeIssueActivity.objects.filter(issue_id=test_issue.id).all()
        assert "ritual_attested" in _activity_types(rows)
        assert any(
            "attested" in (t or "") for t in _broadcast_types(captured_broadcasts)
        )


# ---------------------------------------------------------------------------
# CHT-1200: HTTP attest/approve must not double-broadcast
# ---------------------------------------------------------------------------


class TestNoDuplicateAttestationBroadcastOverHttp:
    """CHT-1187 moved the ritual_attested/ritual_approved broadcasts into
    RitualService (service-layer observability). The API layer used to ALSO
    broadcast its own 'attested'/'approved' event on top, so a single HTTP
    attest/approve fired two attestation-entity broadcasts."""

    @pytest.mark.asyncio
    async def test_http_attest_broadcasts_exactly_once(
        self, client, auth_headers, test_issue, auto_close_ritual, captured_broadcasts
    ):
        response = await client.post(
            f"/api/rituals/{auto_close_ritual.id}/attest-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "done"},
        )
        assert response.status_code == 200

        attestation_broadcasts = [
            msg for _team, msg in captured_broadcasts if msg.get("entity") == "attestation"
        ]
        assert len(attestation_broadcasts) == 1, (
            f"Expected exactly one attestation broadcast, got {attestation_broadcasts}"
        )
        assert attestation_broadcasts[0]["type"] == "ritual_attested"

    @pytest.mark.asyncio
    async def test_http_approve_broadcasts_exactly_once(
        self, client, auth_headers, test_issue, test_project, test_user, make_ritual, captured_broadcasts
    ):
        from app.enums import RitualTrigger, ApprovalMode

        # Approving requires team-admin -- test_user is the OWNER on
        # test_team via the test_project fixture chain.
        ritual = await make_ritual(
            name="review_close_http",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
        )
        await client.post(
            f"/api/rituals/{ritual.id}/attest-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "ready"},
        )
        captured_broadcasts.clear()

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve-issue/{test_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200

        attestation_broadcasts = [
            msg for _team, msg in captured_broadcasts if msg.get("entity") == "attestation"
        ]
        assert len(attestation_broadcasts) == 1, (
            f"Expected exactly one attestation broadcast, got {attestation_broadcasts}"
        )
        assert attestation_broadcasts[0]["type"] == "ritual_approved"
