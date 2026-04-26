"""Failing tests for the unified ticket-intent + limbo model.

Locks in the design agreed on the ritual-coherence-refactor branch:

* Both TICKET_CLAIM and TICKET_CLOSE work via limbo (one mechanism for
  both intents; one mechanism for all approval modes).
* Limbo IS the gate's state machine. AUTO/REVIEW/GATE all create limbo
  rows on intent. AUTO clears immediately; REVIEW clears on approval;
  GATE clears on human attestation.
* One-step auto-transition: when the last block on an intent resolves,
  the requested status transition fires automatically — no re-attempt.
* Exclusive lock per (issue, intent-type): a second claimant of an
  already-claim-limbo'd ticket gets a clear "intent already in flight"
  error.
* Limbo persists through REVIEW rejection (rejection => attest again).
* Explicit cancel is future scope; for MVP, limbo clears only on full
  block resolution.

Each test is named for the invariant it locks in. Tests are expected to
fail today; they describe the target behavior of the refactor and ship
with it.
"""
import pytest

from app.enums import (
    ApprovalMode,
    IssueStatus,
    LimboType,
    RitualTrigger,
)
from app.oxyde_models.issue import OxydeTicketLimbo
from app.oxyde_models.ritual import OxydeRitualAttestation
from app.schemas.issue import IssueUpdate
from app.services.issue_service import IssueService, ClaimRitualsError, TicketRitualsError
from app.services.ritual_service import RitualService


# ---------------------------------------------------------------------------
# Helper utilities
# ---------------------------------------------------------------------------

async def _open_limbo_rows(issue_id: str, limbo_type: LimboType) -> list[OxydeTicketLimbo]:
    """All unresolved limbo rows for an (issue, type)."""
    rows = await OxydeTicketLimbo.objects.filter(
        issue_id=issue_id,
        limbo_type=limbo_type.value,
        cleared_at=None,
    ).all()
    return rows


async def _try_claim(issue, user_id: str, is_human_request: bool = False):
    """Attempt status transition todo -> in_progress."""
    return await IssueService().update(
        issue,
        IssueUpdate(status=IssueStatus.IN_PROGRESS),
        user_id=user_id,
        is_human_request=is_human_request,
    )


async def _try_close(issue, user_id: str, is_human_request: bool = False):
    """Attempt status transition -> done."""
    return await IssueService().update(
        issue,
        IssueUpdate(status=IssueStatus.DONE),
        user_id=user_id,
        is_human_request=is_human_request,
    )


# ---------------------------------------------------------------------------
# Intent open: limbo created for ALL modes (not just GATE)
# ---------------------------------------------------------------------------


class TestIntentOpenCreatesLimboForAllModes:
    """When a claim/close attempt is blocked, limbo rows are created
    regardless of the ritual's approval mode. Today, only GATE creates
    limbo; REVIEW and AUTO leave the intent invisible. The unified model
    treats limbo as the universal record of intent.
    """

    @pytest.mark.asyncio
    async def test_claim_with_pending_review_ritual_creates_limbo(
        self, db, test_issue, test_user, review_claim_ritual
    ):
        with pytest.raises(ClaimRitualsError):
            await _try_claim(test_issue, test_user.id)

        rows = await _open_limbo_rows(test_issue.id, LimboType.CLAIM)
        assert len(rows) == 1, (
            "REVIEW-mode TICKET_CLAIM ritual must create limbo on intent. "
            "Without it, the agent's intent is invisible to overseers and "
            "ungating cannot trigger one-step auto-transition."
        )
        assert rows[0].ritual_id == review_claim_ritual.id
        assert rows[0].requested_by_id == test_user.id

    @pytest.mark.asyncio
    async def test_claim_with_pending_auto_ritual_creates_limbo(
        self, db, test_issue, test_user, auto_claim_ritual
    ):
        # AUTO rituals don't block the agent who attests — but if the agent
        # tries to transition without first attesting, the intent should
        # still produce a limbo row that immediately clears via attestation.
        # Here we simulate the case where the AUTO ritual is on the project
        # but the user has not yet attested it. The intent records that
        # an attempt happened and the AUTO mechanism cleared it on attest.
        with pytest.raises(ClaimRitualsError):
            await _try_claim(test_issue, test_user.id)

        rows = await OxydeTicketLimbo.objects.filter(
            issue_id=test_issue.id,
            limbo_type=LimboType.CLAIM.value,
        ).all()
        assert len(rows) == 1, (
            "AUTO mode is pass-through but must still leave a limbo row as "
            "the audit trail of the state transition."
        )

    @pytest.mark.asyncio
    async def test_close_with_pending_review_ritual_creates_limbo(
        self, db, test_project, test_user, review_close_ritual
    ):
        from app.oxyde_models.issue import OxydeIssue
        issue = await OxydeIssue.objects.create(
            project_id=test_project.id,
            identifier="PROJ-100",
            number=100,
            title="Close-blocked issue",
            creator_id=test_user.id,
            status=IssueStatus.IN_PROGRESS,
        )
        with pytest.raises(TicketRitualsError):
            await _try_close(issue, test_user.id)

        rows = await _open_limbo_rows(issue.id, LimboType.CLOSE)
        assert len(rows) == 1, (
            "REVIEW-mode TICKET_CLOSE ritual must create limbo on intent. "
            "Symmetric with claim — same mechanism for both triggers."
        )

    @pytest.mark.asyncio
    async def test_multiple_pending_rituals_create_one_limbo_row_each(
        self, db, test_issue, test_user, make_ritual
    ):
        # Three rituals, three modes — all must create limbo.
        await make_ritual(
            name="r_auto", trigger=RitualTrigger.TICKET_CLAIM, approval_mode=ApprovalMode.AUTO,
        )
        await make_ritual(
            name="r_review", trigger=RitualTrigger.TICKET_CLAIM, approval_mode=ApprovalMode.REVIEW,
        )
        await make_ritual(
            name="r_gate", trigger=RitualTrigger.TICKET_CLAIM, approval_mode=ApprovalMode.GATE,
        )
        with pytest.raises(ClaimRitualsError):
            await _try_claim(test_issue, test_user.id)

        rows = await _open_limbo_rows(test_issue.id, LimboType.CLAIM)
        assert len(rows) == 3, "Each pending ritual gets its own limbo block."


# ---------------------------------------------------------------------------
# One-step auto-transition: status fires when last block clears
# ---------------------------------------------------------------------------


class TestOneStepAutoTransition:
    """When the last open limbo block on an intent resolves, the requested
    status transition fires automatically. The agent's original intent is
    honored without a re-attempt — this is the whole point of the intent
    lock.
    """

    @pytest.mark.asyncio
    async def test_claim_fires_when_last_attestation_clears_limbo(
        self, db, test_issue, test_user, gate_claim_ritual
    ):
        # 1. Agent intends to claim; limbo opens.
        with pytest.raises(ClaimRitualsError):
            await _try_claim(test_issue, test_user.id)

        # 2. Human completes the GATE ritual (simulated).
        await RitualService().complete_gate_ritual_for_issue(
            gate_claim_ritual, test_issue.id, test_user.id, note="done"
        )

        # 3. Status should now be IN_PROGRESS — no re-attempt required.
        from app.oxyde_models.issue import OxydeIssue
        refreshed = await OxydeIssue.objects.get(id=test_issue.id)
        assert refreshed.status == IssueStatus.IN_PROGRESS, (
            "Auto-transition must fire when the last block clears. "
            "Currently the caller has to re-attempt the status update."
        )

        # 4. Limbo row should be cleared.
        open_rows = await _open_limbo_rows(test_issue.id, LimboType.CLAIM)
        assert open_rows == [], "Limbo should clear when transition fires."

    @pytest.mark.asyncio
    async def test_claim_does_not_fire_until_all_blocks_clear(
        self, db, test_issue, test_user, make_ritual
    ):
        r1 = await make_ritual(
            name="block_1", trigger=RitualTrigger.TICKET_CLAIM, approval_mode=ApprovalMode.GATE,
        )
        await make_ritual(
            name="block_2", trigger=RitualTrigger.TICKET_CLAIM, approval_mode=ApprovalMode.GATE,
        )

        with pytest.raises(ClaimRitualsError):
            await _try_claim(test_issue, test_user.id)

        # Clear only one of two blocks.
        await RitualService().complete_gate_ritual_for_issue(
            r1, test_issue.id, test_user.id, note="ok"
        )

        from app.oxyde_models.issue import OxydeIssue
        refreshed = await OxydeIssue.objects.get(id=test_issue.id)
        assert refreshed.status != IssueStatus.IN_PROGRESS, (
            "Transition must not fire until ALL blocks resolve."
        )

    @pytest.mark.asyncio
    async def test_review_approval_triggers_transition(
        self, db, test_issue, test_user, review_claim_ritual
    ):
        # 1. Agent attempts claim; limbo opens with REVIEW block.
        with pytest.raises(ClaimRitualsError):
            await _try_claim(test_issue, test_user.id)

        # 2. Agent attests (status remains in todo because approval pending).
        attestation = await RitualService().attest_for_issue(
            review_claim_ritual, test_issue.id, test_user.id, note="I did it"
        )

        from app.oxyde_models.issue import OxydeIssue
        refreshed = await OxydeIssue.objects.get(id=test_issue.id)
        assert refreshed.status != IssueStatus.IN_PROGRESS, (
            "REVIEW attestation alone must not trigger transition — "
            "approval is the unblock event."
        )

        # 3. Human approves; transition fires.
        await RitualService().approve_for_issue(attestation, test_user.id)

        refreshed = await OxydeIssue.objects.get(id=test_issue.id)
        assert refreshed.status == IssueStatus.IN_PROGRESS, (
            "Approval is the limbo-clearing event for REVIEW mode; "
            "transition must fire on approval."
        )

    @pytest.mark.asyncio
    async def test_close_fires_when_last_block_clears(
        self, db, test_project, test_user, gate_close_ritual
    ):
        from app.oxyde_models.issue import OxydeIssue
        issue = await OxydeIssue.objects.create(
            project_id=test_project.id,
            identifier="PROJ-200",
            number=200,
            title="Close test",
            creator_id=test_user.id,
            status=IssueStatus.IN_PROGRESS,
        )

        with pytest.raises(TicketRitualsError):
            await _try_close(issue, test_user.id)

        await RitualService().complete_gate_ritual_for_issue(
            gate_close_ritual, issue.id, test_user.id, note="closing"
        )

        refreshed = await OxydeIssue.objects.get(id=issue.id)
        assert refreshed.status == IssueStatus.DONE, (
            "Close intent auto-fires symmetrically with claim."
        )


# ---------------------------------------------------------------------------
# AUTO pass-through: still creates limbo for audit trail
# ---------------------------------------------------------------------------


class TestAutoPassThroughCreatesAuditRow:
    """AUTO mode clears immediately on attestation — limbo row is created
    and resolved in the same operation. The row exists for audit purposes
    so the state machine has a uniform observability surface.
    """

    @pytest.mark.asyncio
    async def test_auto_attest_creates_and_clears_limbo_row(
        self, db, test_issue, test_user, auto_claim_ritual
    ):
        # Agent attests directly (no prior intent expression in current code,
        # but in the unified model attestation should produce + clear limbo
        # so the audit log shows the event happened).
        await RitualService().attest_for_issue(
            auto_claim_ritual, test_issue.id, test_user.id, note="ok"
        )

        all_rows = await OxydeTicketLimbo.objects.filter(
            issue_id=test_issue.id,
            limbo_type=LimboType.CLAIM.value,
        ).all()
        assert len(all_rows) == 1, (
            "AUTO attest must leave a limbo row for audit, even though "
            "it clears immediately."
        )
        assert all_rows[0].cleared_at is not None, (
            "AUTO row clears in the same transaction as creation."
        )


# ---------------------------------------------------------------------------
# Exclusive lock per (issue, intent-type)
# ---------------------------------------------------------------------------


class TestExclusiveLockPerIntentType:
    """Two agents trying to claim the same ticket: the first wins the
    lock, the second gets a clear "intent already in flight" error. Same
    for close.
    """

    @pytest.mark.asyncio
    async def test_second_claimant_blocked_by_existing_intent(
        self, db, test_issue, test_user, test_user2, gate_claim_ritual, test_team
    ):
        # Add user2 to the team so they can act on the issue.
        from app.oxyde_models.team import OxydeTeamMember
        from app.enums import TeamRole
        await OxydeTeamMember.objects.create(
            team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER,
        )

        with pytest.raises(ClaimRitualsError):
            await _try_claim(test_issue, test_user.id)

        # First user holds the open intent. Second user tries to claim.
        with pytest.raises(Exception) as exc:
            await _try_claim(test_issue, test_user2.id)
        # Intent-already-in-flight should be a distinct error class, not
        # a generic ClaimRitualsError, so callers can distinguish "you
        # need to attest" from "someone else got there first."
        assert "in flight" in str(exc.value).lower() or "intent" in str(exc.value).lower(), (
            "Second claimant must get a distinguishable 'intent in flight' "
            "error, not a duplicate ClaimRitualsError."
        )

    @pytest.mark.asyncio
    async def test_close_intent_does_not_block_claim_intent(
        self, db, test_project, test_user, gate_close_ritual, gate_claim_ritual
    ):
        # Different intent types on the same issue should be independently
        # lockable — close-limbo doesn't block a claim attempt.
        from app.oxyde_models.issue import OxydeIssue
        issue = await OxydeIssue.objects.create(
            project_id=test_project.id,
            identifier="PROJ-300",
            number=300,
            title="Independent intents",
            creator_id=test_user.id,
            status=IssueStatus.IN_PROGRESS,
        )

        with pytest.raises(TicketRitualsError):
            await _try_close(issue, test_user.id)

        # Now the close intent is open. Move issue back to TODO.
        from app.schemas.issue import IssueUpdate
        await IssueService().update(
            issue, IssueUpdate(status=IssueStatus.TODO), user_id=test_user.id,
            is_human_request=True,
        )
        # Claim intent should be openable independently of the close intent.
        with pytest.raises(ClaimRitualsError):
            await _try_claim(issue, test_user.id)

        claim_rows = await _open_limbo_rows(issue.id, LimboType.CLAIM)
        close_rows = await _open_limbo_rows(issue.id, LimboType.CLOSE)
        assert len(claim_rows) >= 1, "Claim intent recorded."
        assert len(close_rows) >= 1, "Close intent independently still open."


# ---------------------------------------------------------------------------
# REVIEW rejection: limbo persists
# ---------------------------------------------------------------------------


class TestReviewRejectionKeepsLimbo:
    """If a REVIEW attestation is rejected (future feature; for now we
    only assert the current 'unapproved' state behavior), limbo stays
    open until re-attestation. Rejection means 'do it again,' not
    'abandon.'
    """

    @pytest.mark.asyncio
    async def test_unapproved_review_attestation_keeps_limbo_open(
        self, db, test_issue, test_user, review_claim_ritual
    ):
        with pytest.raises(ClaimRitualsError):
            await _try_claim(test_issue, test_user.id)

        # Agent attests but no human approval yet.
        await RitualService().attest_for_issue(
            review_claim_ritual, test_issue.id, test_user.id, note="please review"
        )

        rows = await _open_limbo_rows(test_issue.id, LimboType.CLAIM)
        assert len(rows) == 1, (
            "REVIEW attestation alone does not clear limbo — approval does."
        )

        from app.oxyde_models.issue import OxydeIssue
        refreshed = await OxydeIssue.objects.get(id=test_issue.id)
        assert refreshed.status != IssueStatus.IN_PROGRESS, (
            "Status must not transition until approval clears the limbo."
        )


# ---------------------------------------------------------------------------
# Symmetry: close uses the same mechanism as claim
# ---------------------------------------------------------------------------


class TestClaimCloseSymmetry:
    """Close intent should behave identically to claim intent. The
    pre-refactor code has two separate paths; the refactor unifies them.
    """

    @pytest.mark.asyncio
    async def test_close_with_review_creates_limbo_and_approval_fires(
        self, db, test_project, test_user, review_close_ritual
    ):
        from app.oxyde_models.issue import OxydeIssue
        issue = await OxydeIssue.objects.create(
            project_id=test_project.id,
            identifier="PROJ-400",
            number=400,
            title="Close review",
            creator_id=test_user.id,
            status=IssueStatus.IN_PROGRESS,
        )

        with pytest.raises(TicketRitualsError):
            await _try_close(issue, test_user.id)

        attestation = await RitualService().attest_for_issue(
            review_close_ritual, issue.id, test_user.id, note="ready to close"
        )
        await RitualService().approve_for_issue(attestation, test_user.id)

        refreshed = await OxydeIssue.objects.get(id=issue.id)
        assert refreshed.status == IssueStatus.DONE, (
            "Close intent auto-fires on approval, symmetrically with claim."
        )
