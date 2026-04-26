"""Service-layer invariant tests for the ritual model.

Calls service methods directly (no HTTP) to expose holes that the API
layer's guards currently mask. Going forward, every API test should
have a paired service-layer test asserting the same invariant.

Each test class targets one invariant from the oppositional review.
Tests are expected to fail today; they describe the post-refactor
contract and ship with the refactor.
"""
import pytest

from app.enums import (
    ApprovalMode,
    IssueStatus,
    RitualTrigger,
)
from app.oxyde_models.user import OxydeUser
from app.oxyde_models.team import OxydeTeamMember
from app.oxyde_models.ritual import OxydeRitualAttestation
from app.services.ritual_service import RitualService
from app.utils.security import get_password_hash


# ---------------------------------------------------------------------------
# Note required: enforced by ALL paths, including GATE complete
# (Review finding #19, currently inverse-covered.)
# ---------------------------------------------------------------------------


class TestNoteRequiredEnforcedEverywhere:
    @pytest.mark.asyncio
    async def test_service_attest_rejects_empty_note_when_required(
        self, db, test_issue, test_user, make_ritual
    ):
        ritual = await make_ritual(
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            note_required=True,
        )
        with pytest.raises((ValueError, Exception)) as exc:
            await RitualService().attest_for_issue(
                ritual, test_issue.id, test_user.id, note=None
            )
        assert "note" in str(exc.value).lower(), (
            "Service-layer attest must enforce note_required, not just the "
            "API guard."
        )

    @pytest.mark.asyncio
    async def test_service_attest_rejects_whitespace_note_when_required(
        self, db, test_issue, test_user, make_ritual
    ):
        ritual = await make_ritual(
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            note_required=True,
        )
        with pytest.raises((ValueError, Exception)) as exc:
            await RitualService().attest_for_issue(
                ritual, test_issue.id, test_user.id, note="   \n\t"
            )
        assert "note" in str(exc.value).lower()

    @pytest.mark.asyncio
    async def test_gate_complete_rejects_empty_note_when_required(
        self, db, test_issue, test_user, make_ritual
    ):
        """Finding #19: GATE complete currently bypasses note_required.
        Refactor must enforce it everywhere.
        """
        ritual = await make_ritual(
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
            note_required=True,
        )
        with pytest.raises((ValueError, Exception)) as exc:
            await RitualService().complete_gate_ritual_for_issue(
                ritual, test_issue.id, test_user.id, note=None
            )
        assert "note" in str(exc.value).lower(), (
            "GATE complete must enforce note_required. Currently it "
            "silently accepts None — locked in by an inverse-covered test."
        )


# ---------------------------------------------------------------------------
# GATE invariant: enforced at the service layer, not just the API
# (Review finding #7, #36.)
# ---------------------------------------------------------------------------


class TestGateInvariantAtServiceLayer:
    @pytest.mark.asyncio
    async def test_service_complete_gate_rejects_agent_caller(
        self, db, test_issue, agent_user, make_ritual
    ):
        """An agent must not be able to complete a GATE ritual via direct
        service call. Currently only the API endpoint enforces is_agent;
        any internal caller (background task, future webhook) bypasses.
        """
        ritual = await make_ritual(
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        with pytest.raises((PermissionError, ValueError, Exception)) as exc:
            await RitualService().complete_gate_ritual_for_issue(
                ritual, test_issue.id, agent_user.id, note="bypass attempt"
            )
        msg = str(exc.value).lower()
        assert "agent" in msg or "human" in msg or "gate" in msg, (
            "Service must reject agent callers for GATE rituals — the "
            "human-only invariant cannot rely on the API layer alone."
        )

    @pytest.mark.asyncio
    async def test_service_attest_for_issue_rejects_agent_for_gate(
        self, db, test_issue, agent_user, make_ritual
    ):
        ritual = await make_ritual(
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        # Today this raises ValueError("requires human completion") for ALL
        # callers — the rejection is correct but the reason is wrong: it's
        # blanket "GATE rejects attest" rather than "GATE rejects agent".
        # The unified model should distinguish: humans CAN attest a GATE
        # (which is also approval); agents CANNOT.
        with pytest.raises((PermissionError, ValueError, Exception)) as exc:
            await RitualService().attest_for_issue(
                ritual, test_issue.id, agent_user.id, note="trying"
            )
        msg = str(exc.value).lower()
        assert "agent" in msg or "human" in msg, (
            "Rejection reason should be 'agents can't attest GATE rituals,' "
            "not 'no one can attest GATE rituals.'"
        )


# ---------------------------------------------------------------------------
# REVIEW approval: must check approval_mode == REVIEW
# (Review finding #5, #6.)
# ---------------------------------------------------------------------------


class TestApproveEnforcesReviewMode:
    @pytest.mark.asyncio
    async def test_approve_rejects_auto_attestation(
        self, db, test_issue, test_user, auto_close_ritual
    ):
        """Service-layer approve() must reject attestations on AUTO rituals
        (which were already auto-approved). Currently it silently overwrites
        approver fields.
        """
        attestation = await RitualService().attest_for_issue(
            auto_close_ritual, test_issue.id, test_user.id, note="ok"
        )
        # Already approved by AUTO. Re-calling approve should error.
        with pytest.raises((ValueError, Exception)) as exc:
            await RitualService().approve_for_issue(attestation, test_user.id)
        msg = str(exc.value).lower()
        assert "auto" in msg or "review" in msg or "already" in msg, (
            "approve() must reject non-REVIEW attestations at the service "
            "layer, not rely on API guards."
        )

    @pytest.mark.asyncio
    async def test_approve_rejects_already_approved_review(
        self, db, test_issue, test_user, review_close_ritual
    ):
        attestation = await RitualService().attest_for_issue(
            review_close_ritual, test_issue.id, test_user.id, note="please"
        )
        await RitualService().approve_for_issue(attestation, test_user.id)
        # Second call should error.
        with pytest.raises((ValueError, Exception)) as exc:
            await RitualService().approve_for_issue(attestation, test_user.id)
        assert "already" in str(exc.value).lower() or "approved" in str(exc.value).lower()


# ---------------------------------------------------------------------------
# Conditions re-evaluated at attest time
# (Review finding #21.)
# ---------------------------------------------------------------------------


class TestConditionsEnforcedAtAttest:
    @pytest.mark.asyncio
    async def test_attest_rejects_when_estimate_condition_unmet(
        self, db, test_issue, test_user, make_ritual
    ):
        """A ritual configured with `estimate__gte: 3` must reject attest
        when the issue's estimate is below 3. Currently conditions are only
        evaluated at listing time, not at attest — meaning an attester can
        bypass the condition by attesting directly.
        """
        ritual = await make_ritual(
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            conditions='{"estimate": {"__gte": 3}}',
        )
        # test_issue has no estimate (None) — should not match.
        with pytest.raises((ValueError, Exception)) as exc:
            await RitualService().attest_for_issue(
                ritual, test_issue.id, test_user.id, note="ok"
            )
        msg = str(exc.value).lower()
        assert "condition" in msg or "estimate" in msg or "match" in msg, (
            "Attest must re-evaluate conditions; selection at listing time "
            "is advisory, not enforcement."
        )


# ---------------------------------------------------------------------------
# Group selection enforced at attest
# (Review finding #22.)
# ---------------------------------------------------------------------------


class TestGroupSelectionEnforcedAtAttest:
    @pytest.mark.asyncio
    async def test_random_one_group_rejects_non_selected_ritual(
        self, db, test_issue, test_user, test_project
    ):
        """RANDOM_ONE selection picks one ritual from a group at listing
        time. The user must not be able to attest a different ritual from
        the same group.
        """
        from app.enums import SelectionMode
        from app.oxyde_models.ritual import OxydeRitual, OxydeRitualGroup

        group = await OxydeRitualGroup.objects.create(
            project_id=test_project.id,
            name="g",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        r_a = await OxydeRitual.objects.create(
            project_id=test_project.id,
            name="r_a",
            prompt="A",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            group=group,
            note_required=False,
        )
        r_b = await OxydeRitual.objects.create(
            project_id=test_project.id,
            name="r_b",
            prompt="B",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            group=group,
            note_required=False,
        )

        # Force r_a to be the "selected" one for this issue (round-robin
        # last_selected_ritual_id mechanism). The user attempts to attest
        # r_b — must be rejected.
        group.last_selected_ritual_id = r_a.id
        await group.save(update_fields={"last_selected_ritual_id"})

        with pytest.raises((ValueError, Exception)) as exc:
            await RitualService().attest_for_issue(
                r_b, test_issue.id, test_user.id, note="wrong one"
            )
        msg = str(exc.value).lower()
        assert "group" in msg or "select" in msg or "choose" in msg, (
            "Attest must enforce group selection; otherwise RANDOM_ONE is "
            "purely advisory."
        )


# ---------------------------------------------------------------------------
# Sprint-level approve enforces trigger == EVERY_SPRINT
# (Review finding #9.)
# ---------------------------------------------------------------------------


class TestSprintApproveEnforcesTrigger:
    @pytest.mark.asyncio
    async def test_approve_sprint_rejects_ticket_trigger(
        self, db, test_sprint, test_issue, test_user, make_ritual
    ):
        ritual = await make_ritual(
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
        )
        # Bypass attest_for_sprint validation by manually creating an
        # attestation with a sprint_id and a TICKET_CLOSE ritual.
        att = await OxydeRitualAttestation.objects.create(
            ritual=ritual,
            sprint=test_sprint,
            attested_by=test_user.id,
            note="bogus",
        )
        with pytest.raises((ValueError, Exception)) as exc:
            await RitualService().approve(att, test_user.id)
        msg = str(exc.value).lower()
        assert "trigger" in msg or "sprint" in msg or "ticket" in msg, (
            "Sprint-level approve must verify trigger==EVERY_SPRINT; "
            "currently it blindly stamps approver fields."
        )


# ---------------------------------------------------------------------------
# Mode change while attestations pending
# (Review finding #17.)
# ---------------------------------------------------------------------------


class TestModeChangeProtectsExistingAttestations:
    @pytest.mark.asyncio
    async def test_review_to_auto_does_not_silently_approve_pending(
        self, db, test_issue, test_user, review_close_ritual
    ):
        """If a REVIEW ritual is changed to AUTO while pending attestations
        exist, those attestations must NOT be silently auto-approved. The
        intent expressed at attestation time was REVIEW; the human's
        approval is still required.
        """
        attestation = await RitualService().attest_for_issue(
            review_close_ritual, test_issue.id, test_user.id, note="needs review"
        )
        assert attestation.approved_at is None

        # Change mode to AUTO.
        review_close_ritual.approval_mode = ApprovalMode.AUTO
        await review_close_ritual.save(update_fields={"approval_mode"})

        # Re-fetch attestation — must still be unapproved.
        from app.oxyde_models.ritual import OxydeRitualAttestation
        refreshed = await OxydeRitualAttestation.objects.get(id=attestation.id)
        assert refreshed.approved_at is None, (
            "Mode change must not retroactively approve pending REVIEW "
            "attestations."
        )


# ---------------------------------------------------------------------------
# Soft-delete with pending attestations
# (Review finding #16.)
# ---------------------------------------------------------------------------


class TestSoftDeleteHandling:
    @pytest.mark.asyncio
    async def test_soft_delete_with_open_intent_records_audit(
        self, db, test_issue, test_user, gate_close_ritual
    ):
        """Soft-deleting a ritual while a ticket is in limbo must leave
        an audit trail. Today the limbo row is silently rendered moot
        (cleared_at remains NULL but the ritual is filtered out of
        pending lists), with no record of who deleted the ritual.
        """
        from app.services.issue_service import IssueService, TicketRitualsError
        from app.schemas.issue import IssueUpdate
        from app.oxyde_models.issue import OxydeIssue, OxydeTicketLimbo

        # Make the issue closeable so we can intend close.
        test_issue.status = IssueStatus.IN_PROGRESS
        await test_issue.save(update_fields={"status"})

        with pytest.raises(TicketRitualsError):
            await IssueService().update(
                test_issue,
                IssueUpdate(status=IssueStatus.DONE),
                user_id=test_user.id,
                is_human_request=False,
            )

        # Soft-delete the ritual.
        gate_close_ritual.is_active = False
        await gate_close_ritual.save(update_fields={"is_active"})

        # The open limbo row must be explicitly cleared with attribution
        # to the deletion event — not silently abandoned.
        from app.enums import LimboType
        rows = await OxydeTicketLimbo.objects.filter(
            issue_id=test_issue.id,
            limbo_type=LimboType.CLOSE.name,
        ).all()
        assert len(rows) == 1
        assert rows[0].cleared_at is not None, (
            "Soft-delete of the gating ritual must clear (or otherwise "
            "explicitly mark) the open limbo row, not leave it orphaned."
        )
