"""Concurrency tests for the ritual + intent model.

The schema lacks unique indexes on `ritual_attestations(ritual_id,
sprint_id)` and `(ritual_id, issue_id)`. The IntegrityError fallbacks
in `RitualService.attest`/`attest_for_issue` are dead code today
(finding #15). After the refactor:

* Concurrent attests of the same (ritual, target) must produce ONE row,
  not duplicates. This requires DB-level uniqueness.
* Concurrent claim attempts on the same ticket must respect the
  exclusive lock — first to open intent wins, others get a clear error.
"""
import asyncio
import pytest

from app.enums import (
    ApprovalMode,
    IssueStatus,
    LimboType,
    RitualTrigger,
    TeamRole,
)
from app.oxyde_models.issue import OxydeIssue, OxydeTicketLimbo
from app.oxyde_models.ritual import OxydeRitualAttestation
from app.oxyde_models.team import OxydeTeamMember
from app.schemas.issue import IssueUpdate
from app.services.issue_service import IssueService, ClaimRitualsError
from app.services.ritual_service import RitualService


# ---------------------------------------------------------------------------
# Duplicate rows (finding #15)
# ---------------------------------------------------------------------------


class TestNoDuplicateAttestationRows:
    @pytest.mark.asyncio
    async def test_concurrent_issue_attest_produces_one_row(
        self, db, test_issue, test_user, auto_close_ritual
    ):
        """Two concurrent attest calls must result in exactly one row.
        Today the schema has no unique constraint, so this produces two
        rows and `get_attestation` returns whichever `.first()` wins.
        """
        results = await asyncio.gather(
            RitualService().attest_for_issue(
                auto_close_ritual, test_issue.id, test_user.id, note="a"
            ),
            RitualService().attest_for_issue(
                auto_close_ritual, test_issue.id, test_user.id, note="b"
            ),
            return_exceptions=True,
        )

        rows = await OxydeRitualAttestation.objects.filter(
            ritual_id=auto_close_ritual.id,
            issue_id=test_issue.id,
        ).all()
        assert len(rows) == 1, (
            f"Concurrent attests must coalesce into one row. Got {len(rows)}. "
            "Add UNIQUE(ritual_id, issue_id) where it's set; same for sprint."
        )

    @pytest.mark.asyncio
    async def test_concurrent_sprint_attest_produces_one_row(
        self, db, test_sprint, test_user, make_ritual
    ):
        ritual = await make_ritual(
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.AUTO,
            note_required=False,
        )
        await asyncio.gather(
            RitualService().attest(ritual, test_sprint.id, test_user.id, note=None),
            RitualService().attest(ritual, test_sprint.id, test_user.id, note=None),
            return_exceptions=True,
        )

        rows = await OxydeRitualAttestation.objects.filter(
            ritual_id=ritual.id,
            sprint_id=test_sprint.id,
        ).all()
        assert len(rows) == 1, (
            "Concurrent sprint attests must coalesce. Add "
            "UNIQUE(ritual_id, sprint_id) where it's set."
        )


# ---------------------------------------------------------------------------
# Intent race: first claimant wins lock
# ---------------------------------------------------------------------------


class TestExclusiveIntentLockUnderConcurrency:
    @pytest.mark.asyncio
    async def test_concurrent_claim_attempts_one_wins_lock(
        self, db, test_issue, test_user, test_user2, test_team, gate_claim_ritual
    ):
        await OxydeTeamMember.objects.create(
            team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER,
        )

        async def _attempt(uid):
            try:
                await IssueService().update(
                    test_issue,
                    IssueUpdate(status=IssueStatus.IN_PROGRESS),
                    user_id=uid,
                    is_human_request=False,
                )
                return ("success", uid)
            except ClaimRitualsError:
                return ("blocked-with-intent-recorded", uid)
            except Exception as exc:
                return ("rejected", uid, str(exc))

        outcomes = await asyncio.gather(
            _attempt(test_user.id),
            _attempt(test_user2.id),
        )

        # Both calls should observe limbo. But only one row should exist
        # (the first writer wins the exclusive lock); the second should
        # get a "rejected — intent in flight" outcome rather than
        # creating a parallel limbo row.
        rows = await OxydeTicketLimbo.objects.filter(
            issue_id=test_issue.id,
            limbo_type=LimboType.CLAIM.name,
            cleared_at=None,
        ).all()
        assert len(rows) == 1, (
            f"Exactly one open limbo row per (issue, type). Got {len(rows)}. "
            "Concurrent claimants must not stack intents."
        )

        rejection_outcomes = [o for o in outcomes if o[0] == "rejected"]
        assert len(rejection_outcomes) >= 1, (
            "At least one of two concurrent claim attempts must be "
            "rejected with the exclusive-lock error, not silently fall "
            "through."
        )


# ---------------------------------------------------------------------------
# Concurrent attest+approve race
# ---------------------------------------------------------------------------


class TestConcurrentApprovalIsAtomic:
    @pytest.mark.asyncio
    async def test_double_approve_only_credits_one_approver(
        self, db, test_issue, test_user, test_user2, test_team, review_close_ritual
    ):
        """Two humans simultaneously approving the same REVIEW attestation
        must end with one approver recorded, not silently overwrite.
        """
        await OxydeTeamMember.objects.create(
            team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER,
        )

        att = await RitualService().attest_for_issue(
            review_close_ritual, test_issue.id, test_user.id, note="please"
        )

        results = await asyncio.gather(
            RitualService().approve_for_issue(att, test_user.id),
            RitualService().approve_for_issue(att, test_user2.id),
            return_exceptions=True,
        )

        # One should succeed, the other should error on already-approved.
        successes = [r for r in results if not isinstance(r, Exception)]
        errors = [r for r in results if isinstance(r, Exception)]
        assert len(successes) == 1, (
            "Exactly one of two concurrent approvals must succeed."
        )
        assert len(errors) == 1, (
            "The losing approver must observe an already-approved error."
        )
