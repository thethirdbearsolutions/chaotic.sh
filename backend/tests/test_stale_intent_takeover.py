"""Stale-intent TTL + takeover tests (CHT-1326).

The stranding trap: a non-interactive close on a ticket with
note-required close rituals opened a CLOSE intent, failed with
ticket_rituals_pending, and the intent then excluded every other
principal forever (`IntentInFlightError`) with no cancel/expire/resume
surface. One failed API close made a ticket permanently unclosable from
automation.

Contract under test (service layer, mirrors the API paths):

* The initiator retrying is NEVER blocked by their own intent — they
  get the actionable rituals-pending error again (resume semantics).
* A different principal is blocked only while the intent is LIVE.
  Once the intent has outlived ``intent_ttl_minutes`` (and has no
  unresolved GATE blockers), the new principal's attempt cancels it
  (INTENT_CANCELED) and opens a fresh intent of their own.
* Intents with unresolved GATE blockers never expire — they are
  actionable in the admin inbox and may legitimately wait days.
* After a takeover, attesting the pending rituals fires the one-step
  auto-transition exactly as for a first-attempt intent.
"""
from datetime import datetime, timedelta, timezone

import pytest

from app.enums import (
    ActivityType,
    ApprovalMode,
    IssueStatus,
    LimboType,
    RitualTrigger,
)
from app.oxyde_models.issue import (
    OxydeIssue,
    OxydeIssueActivity,
    OxydeTicketLimbo,
    OxydeTicketLimboBlocker,
)
from app.schemas.issue import IssueUpdate
from app.services.issue_service import (
    IntentInFlightError,
    IssueService,
    TicketRitualsError,
)
from app.services.ritual_service import RitualService


async def _attempt_close(issue, user_id):
    """Non-interactive close attempt; returns the raised error class."""
    fresh = await OxydeIssue.objects.get(id=issue.id)
    await IssueService().update(
        fresh,
        IssueUpdate(status=IssueStatus.DONE),
        user_id=user_id,
        is_human_request=False,
    )


async def _open_close_intent(issue):
    return await OxydeTicketLimbo.objects.filter(
        issue_id=issue.id,
        limbo_type=LimboType.CLOSE.name,
        cleared_at=None,
    ).first()


async def _backdate_intent(intent, minutes: int):
    intent.requested_at = datetime.now(timezone.utc) - timedelta(minutes=minutes)
    await intent.save(update_fields={"requested_at"})


class TestFailedCloseLeavesResumableIntent:
    @pytest.mark.asyncio
    async def test_same_principal_retry_is_never_intent_blocked(
        self, db, test_issue, test_user, make_ritual
    ):
        """Regression (CHT-1326): the initiator retrying their own failed
        close must get the actionable rituals-pending error, not be
        locked out by their own stranded intent."""
        await make_ritual(
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            note_required=True,
        )
        with pytest.raises(TicketRitualsError):
            await _attempt_close(test_issue, test_user.id)
        assert await _open_close_intent(test_issue) is not None

        # Retry: same actionable error, same single intent, no stacking.
        with pytest.raises(TicketRitualsError):
            await _attempt_close(test_issue, test_user.id)
        open_intents = await OxydeTicketLimbo.objects.filter(
            issue_id=test_issue.id,
            limbo_type=LimboType.CLOSE.name,
            cleared_at=None,
        ).all()
        assert len(open_intents) == 1
        assert open_intents[0].requested_by_id == test_user.id


class TestStaleIntentTakeover:
    @pytest.mark.asyncio
    async def test_live_intent_still_blocks_other_principals(
        self, db, test_issue, test_user, test_user2, make_ritual
    ):
        """Within the TTL the exclusive intent lock is unchanged."""
        await make_ritual(
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            note_required=True,
        )
        with pytest.raises(TicketRitualsError):
            await _attempt_close(test_issue, test_user.id)

        with pytest.raises(IntentInFlightError):
            await _attempt_close(test_issue, test_user2.id)

    @pytest.mark.asyncio
    async def test_expired_intent_is_taken_over_not_blocking(
        self, db, test_issue, test_user, test_user2, make_ritual
    ):
        """The core CHT-1326 fix: once the abandoned intent outlives its
        TTL, a different principal's close cancels it and opens a fresh
        intent instead of erroring intent_in_flight forever."""
        await make_ritual(
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            note_required=True,
        )
        with pytest.raises(TicketRitualsError):
            await _attempt_close(test_issue, test_user.id)
        stale = await _open_close_intent(test_issue)
        await _backdate_intent(stale, minutes=16)  # default TTL is 15

        # New principal gets the ACTIONABLE error (pending rituals),
        # not the dead-end intent_in_flight.
        with pytest.raises(TicketRitualsError):
            await _attempt_close(test_issue, test_user2.id)

        # Old intent canceled, attributed to the taker-over.
        old = await OxydeTicketLimbo.objects.get(id=stale.id)
        assert old.cleared_at is not None
        assert old.cleared_by_id == test_user2.id
        stale_blockers = await OxydeTicketLimboBlocker.objects.filter(
            limbo_id=old.id, resolved_at=None,
        ).all()
        assert stale_blockers == []

        # Fresh intent owned by the new principal.
        fresh = await _open_close_intent(test_issue)
        assert fresh is not None
        assert fresh.id != stale.id
        assert fresh.requested_by_id == test_user2.id

        # Cancellation is observable (INTENT_CANCELED activity).
        rows = await OxydeIssueActivity.objects.filter(
            issue_id=test_issue.id,
        ).all()
        canceled = [
            r for r in rows
            if getattr(r.activity_type, "value", r.activity_type)
            == ActivityType.INTENT_CANCELED.value
        ]
        assert len(canceled) == 1
        assert canceled[0].user_id == test_user2.id

    @pytest.mark.asyncio
    async def test_stale_gate_intent_is_not_taken_over(
        self, db, test_issue, test_user, test_user2, make_ritual
    ):
        """GATE-blocked intents are actionable by a human in the admin
        inbox and may wait days — they never expire."""
        await make_ritual(
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
            note_required=True,
        )
        with pytest.raises(TicketRitualsError):
            await _attempt_close(test_issue, test_user.id)
        stale = await _open_close_intent(test_issue)
        await _backdate_intent(stale, minutes=60 * 24)

        with pytest.raises(IntentInFlightError):
            await _attempt_close(test_issue, test_user2.id)
        still_open = await OxydeTicketLimbo.objects.get(id=stale.id)
        assert still_open.cleared_at is None

    @pytest.mark.asyncio
    async def test_retry_after_takeover_closes_via_attestation(
        self, db, test_issue, test_user, test_user2, make_ritual
    ):
        """End-to-end recovery: takeover, then attesting the pending
        ritual fires the one-step auto-transition and the ticket
        actually closes — the previously-stranded state is recoverable
        without any manual DB surgery."""
        ritual = await make_ritual(
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            note_required=True,
        )
        with pytest.raises(TicketRitualsError):
            await _attempt_close(test_issue, test_user.id)
        stale = await _open_close_intent(test_issue)
        await _backdate_intent(stale, minutes=16)

        with pytest.raises(TicketRitualsError):
            await _attempt_close(test_issue, test_user2.id)

        await RitualService().attest_for_issue(
            ritual, test_issue.id, test_user2.id, note="done properly",
        )

        refreshed = await OxydeIssue.objects.get(id=test_issue.id)
        assert refreshed.status == IssueStatus.DONE
        assert await _open_close_intent(test_issue) is None

    @pytest.mark.asyncio
    async def test_claim_intents_get_the_same_takeover(
        self, db, test_issue, test_user, test_user2, make_ritual
    ):
        """The trap and the fix are symmetric for CLAIM intents."""
        from app.services.issue_service import ClaimRitualsError

        await make_ritual(
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.AUTO,
            note_required=True,
        )

        async def _attempt_claim(user):
            fresh = await OxydeIssue.objects.get(id=test_issue.id)
            await IssueService().update(
                fresh,
                IssueUpdate(status=IssueStatus.IN_PROGRESS, assignee_id=user.id),
                user_id=user.id,
                is_human_request=False,
            )

        with pytest.raises(ClaimRitualsError):
            await _attempt_claim(test_user)
        intent = await OxydeTicketLimbo.objects.filter(
            issue_id=test_issue.id,
            limbo_type=LimboType.CLAIM.name,
            cleared_at=None,
        ).first()
        assert intent is not None

        with pytest.raises(IntentInFlightError):
            await _attempt_claim(test_user2)

        await _backdate_intent(intent, minutes=16)
        with pytest.raises(ClaimRitualsError):
            await _attempt_claim(test_user2)
        fresh_intent = await OxydeTicketLimbo.objects.filter(
            issue_id=test_issue.id,
            limbo_type=LimboType.CLAIM.name,
            cleared_at=None,
        ).first()
        assert fresh_intent is not None
        assert fresh_intent.requested_by_id == test_user2.id
