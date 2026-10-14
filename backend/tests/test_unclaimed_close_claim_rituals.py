"""A close of a never-claimed ticket must pass its claim rituals (CHT-1672).

Claim rituals used to be checked only on the -> in_progress transition,
so a ticket moved straight from backlog/todo to done skipped them: a
review-mode design-review claim gate was bypassed by never claiming
(CHT-1613 closed and charged the sprint while CHT-1611, which went
through issue_start, stayed blocked). todo -> in_review -> done, and
create-as-in_review then done, skipped them the same way (CHT-1693).

The rule: a ticket records when it was first claimed (`claimed_at`,
stamped the first time it enters in_progress by any path). A transition
into done of a ticket with no `claimed_at` is gated by its pending claim
rituals, exactly as issue_start is, before its close rituals. Canceling
is not gated, and a ticket that was claimed once is never re-checked,
whatever status it has since gone back to.
"""
from datetime import datetime, timedelta, timezone

import pytest

from app.enums import ApprovalMode, IssueStatus, LimboType, RitualTrigger, SprintStatus
from app.mcp_server import context, tools
from app.oxyde_models.issue import OxydeBudgetTransaction, OxydeIssue, OxydeTicketLimbo
from app.oxyde_models.sprint import OxydeSprint
from app.schemas.issue import IssueCreate, IssueUpdate
from app.services.issue_service import (
    ClaimRitualsError,
    IssueService,
    UnclaimedCloseRitualsError,
)
from app.services.ritual_service import RitualService

from .mcp_principal import api_key_principal


async def _issue(issue_id: str) -> OxydeIssue:
    return await OxydeIssue.objects.get(id=issue_id)


async def _patch(client, headers, issue_id, **body):
    return await client.patch(f"/api/issues/{issue_id}", headers=headers, json=body)


async def _claim(issue, user_id):
    return await IssueService().update(
        issue, IssueUpdate(status=IssueStatus.IN_PROGRESS, assignee_id=user_id),
        user_id=user_id, is_human_request=False,
    )


async def _close(issue, user_id):
    return await IssueService().update(
        issue, IssueUpdate(status=IssueStatus.DONE), user_id=user_id, is_human_request=False,
    )


@pytest.mark.asyncio
class TestCloseOfNeverClaimedTicket:
    async def test_backlog_to_done_is_refused_by_pending_claim_ritual(
        self, client, auth_headers, test_issue, make_ritual,
    ):
        """The CHT-1613 repro: a review-mode claim ritual blocks a
        straight backlog -> done, with the claim refusal shape and a
        message that says closing, and nothing is charged."""
        await make_ritual(
            name="design-review", trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.REVIEW,
        )
        response = await _patch(client, auth_headers, test_issue.id, status="done")
        assert response.status_code == 409
        detail = response.json()["detail"]
        assert detail["error_code"] == "claim_rituals_pending"
        assert [r["name"] for r in detail["pending_rituals"]] == ["design-review"]
        assert detail["pending_rituals"][0]["trigger"] == "ticket_claim"
        assert detail["unattested"] == ["design-review"]
        assert "Ticket has pending claim rituals: 1 unattested (design-review)" in detail["message"]
        assert detail["message"].endswith("Attest the unattested ones before closing.")
        assert (await _issue(test_issue.id)).status == IssueStatus.BACKLOG
        assert await OxydeBudgetTransaction.objects.filter(issue_id=test_issue.id).count() == 0

        # Attested but not approved: still refused, and says a human must act.
        attest = await client.post(
            f"/api/rituals/{detail['pending_rituals'][0]['id']}/attest-issue/{test_issue.id}",
            headers=auth_headers, json={"note": "Design written."},
        )
        assert attest.status_code == 200
        response = await _patch(client, auth_headers, test_issue.id, status="done")
        assert response.status_code == 409
        detail = response.json()["detail"]
        assert detail["awaiting_approval"] == ["design-review"]
        assert "a human must approve the attested ones before closing." in detail["message"]
        assert (await _issue(test_issue.id)).status == IssueStatus.BACKLOG

    @pytest.mark.parametrize("start", [IssueStatus.TODO, IssueStatus.CANCELED, IssueStatus.IN_REVIEW])
    async def test_every_never_claimed_state_is_gated(
        self, client, auth_headers, test_issue, make_ritual, start,
    ):
        """in_review included: todo -> in_review is not a claim, so the
        close out of it must still pass the claim gate (CHT-1693)."""
        await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        moved = await _patch(client, auth_headers, test_issue.id, status=start.value)
        assert moved.status_code == 200, moved.text
        response = await _patch(client, auth_headers, test_issue.id, status="done")
        assert response.status_code == 409
        assert response.json()["detail"]["error_code"] == "claim_rituals_pending"
        assert (await _issue(test_issue.id)).status == start

    async def test_created_in_review_is_gated_at_close(
        self, client, auth_headers, test_project, make_ritual,
    ):
        """The create-path variant of CHT-1693: created straight into
        in_review, then closed."""
        await make_ritual(
            name="design-review", trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.REVIEW,
        )
        created = await client.post(
            f"/api/projects/{test_project.id}/issues", headers=auth_headers,
            json={"title": "Review me", "status": "in_review"},
        )
        assert created.status_code in (200, 201), created.text
        response = await _patch(client, auth_headers, created.json()["id"], status="done")
        assert response.status_code == 409
        assert response.json()["detail"]["error_code"] == "claim_rituals_pending"

    async def test_claim_gate_comes_before_close_rituals(
        self, db, test_issue, test_user, make_ritual,
    ):
        """Both pending: the claim refusal is raised and only a CLAIM
        intent is opened; the close is a separate step."""
        await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        await make_ritual(name="close-gate", trigger=RitualTrigger.TICKET_CLOSE)
        with pytest.raises(UnclaimedCloseRitualsError) as exc:
            await _close(test_issue, test_user.id)
        assert isinstance(exc.value, ClaimRitualsError)
        assert [r.name for r in exc.value.rituals] == ["claim-gate"]
        intents = await OxydeTicketLimbo.objects.filter(issue_id=test_issue.id, cleared_at=None).all()
        assert [i.limbo_type for i in intents] == [LimboType.CLAIM]

    async def test_satisfied_claim_rituals_let_the_close_through(
        self, client, auth_headers, test_issue, make_ritual,
    ):
        ritual = await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        attest = await client.post(
            f"/api/rituals/{ritual.id}/attest-issue/{test_issue.id}",
            headers=auth_headers, json={"note": "branch cut"},
        )
        assert attest.status_code == 200
        response = await _patch(client, auth_headers, test_issue.id, status="done")
        assert response.status_code == 200, response.text
        assert response.json()["status"] == "done"

    async def test_unmatched_condition_does_not_gate(
        self, client, auth_headers, test_issue, make_ritual,
    ):
        """Same ritual selection as issue_start: conditions apply."""
        await make_ritual(
            name="big-claim", trigger=RitualTrigger.TICKET_CLAIM,
            conditions='{"estimate__gte": 5}',
        )
        response = await _patch(client, auth_headers, test_issue.id, status="done")
        assert response.status_code == 200, response.text

    async def test_arrears_is_reported_before_the_claim_gate(
        self, client, auth_headers, test_issue, test_project, make_ritual,
    ):
        """In arrears no attestation can help, so that refusal comes
        first and no CLAIM intent is opened: its auto-transition would
        only fail on the same arrears."""
        await OxydeSprint.objects.create(
            project_id=test_project.id, name="Spent", status=SprintStatus.ACTIVE,
            budget=1, points_spent=5,
        )
        await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        response = await _patch(client, auth_headers, test_issue.id, status="done")
        assert response.status_code == 409
        assert response.json()["detail"]["error_code"] == "sprint_in_arrears"
        assert await OxydeTicketLimbo.objects.filter(issue_id=test_issue.id).count() == 0


@pytest.mark.asyncio
class TestClaimMarker:
    async def test_every_entry_into_in_progress_stamps_claimed_at(
        self, client, auth_headers, test_project, test_issue, test_user,
    ):
        assert (await _issue(test_issue.id)).claimed_at is None
        claimed = await _claim(test_issue, test_user.id)
        first = claimed.claimed_at
        assert first is not None

        # Leaving and re-entering in_progress keeps the first stamp.
        back = await IssueService().update(
            claimed, IssueUpdate(status=IssueStatus.TODO), user_id=test_user.id, is_human_request=False,
        )
        assert back.claimed_at == first
        again = await _claim(back, test_user.id)
        assert again.claimed_at == first

        created = await IssueService().create(
            IssueCreate(title="started", project_id=test_project.id, status=IssueStatus.IN_PROGRESS),
            test_project, test_user.id,
        )
        assert created.claimed_at is not None

    async def test_human_bypass_claim_stamps_claimed_at(
        self, client, auth_headers, test_issue, test_project, make_ritual,
    ):
        from app.oxyde_models.project import OxydeProject

        await OxydeProject.objects.filter(id=test_project.id).update(human_rituals_required=False)
        await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        response = await client.patch(
            f"/api/issues/{test_issue.id}", json={"status": "in_progress"},
            headers={**auth_headers, "X-Chaotic-Interactive": "1"},
        )
        assert response.status_code == 200, response.text
        assert (await _issue(test_issue.id)).claimed_at is not None

    async def test_claimed_at_is_not_in_the_response(self, client, auth_headers, test_issue, test_user):
        await _claim(test_issue, test_user.id)
        response = await client.get(f"/api/issues/{test_issue.id}", headers=auth_headers)
        assert "claimed_at" not in response.json()


@pytest.mark.asyncio
class TestClaimedTicketIsNotRechecked:
    async def test_lease_expiry_then_close(self, db, test_issue, test_user, test_project):
        """The review's M1 probe: a ROUND_ROBIN claim group [a, b]. The
        ticket passes `a` and is claimed; its lease expires and it drops
        to todo, where its listing has moved on to `b`. Closing it is not
        gated on `b`: the ticket was claimed."""
        group, (a, b) = await _rr_group(test_project.id, RitualTrigger.TICKET_CLAIM, ["a", "b"])
        rituals = RitualService()
        await rituals.attest_for_issue(a, test_issue.id, test_user.id, note="done")
        claimed = await _claim(test_issue, test_user.id)
        assert claimed.lease_expires_at is not None

        await OxydeIssue.objects.filter(id=test_issue.id).update(
            lease_expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
        )
        released = await IssueService().release_expired_leases(project_id=test_project.id)
        assert [i.id for i in released] == [test_issue.id]
        dropped = await _issue(test_issue.id)
        assert dropped.status == IssueStatus.TODO and dropped.assignee_id is None
        assert [r.name for r in await rituals.get_pending_claim_rituals(test_project.id, test_issue.id)] == ["b"]

        closed = await _close(dropped, test_user.id)
        assert closed.status == IssueStatus.DONE

    async def test_canceled_and_reopened_claimed_ticket_closes(
        self, client, auth_headers, test_issue, test_user, make_ritual,
    ):
        await _claim(test_issue, test_user.id)
        assert (await _patch(client, auth_headers, test_issue.id, status="canceled")).status_code == 200
        await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        response = await _patch(client, auth_headers, test_issue.id, status="done")
        assert response.status_code == 200, response.text

    @pytest.mark.parametrize("via", [IssueStatus.IN_PROGRESS, IssueStatus.IN_REVIEW])
    async def test_claim_ritual_added_after_the_claim_does_not_apply(
        self, client, auth_headers, test_issue, test_user, make_ritual, via,
    ):
        claimed = await _claim(test_issue, test_user.id)
        if via == IssueStatus.IN_REVIEW:
            await IssueService().update(
                claimed, IssueUpdate(status=IssueStatus.IN_REVIEW), user_id=test_user.id,
                is_human_request=False,
            )
        await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        response = await _patch(client, auth_headers, test_issue.id, status="done")
        assert response.status_code == 200, response.text


@pytest.mark.asyncio
class TestRefusedCloseIntentClears:
    """The review's M2: what a refused close's CLAIM intent leaves behind
    when it clears."""

    async def test_auto_attest_claims_for_the_requester(self, db, test_issue, test_user, make_ritual):
        ritual = await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        with pytest.raises(UnclaimedCloseRitualsError):
            await _close(test_issue, test_user.id)

        await RitualService().attest_for_issue(ritual, test_issue.id, test_user.id, note="cut")
        issue = await _issue(test_issue.id)
        assert issue.status == IssueStatus.IN_PROGRESS
        assert issue.assignee_id == test_user.id
        assert issue.lease_expires_at is not None
        assert issue.claimed_at is not None
        assert await OxydeTicketLimbo.objects.filter(issue_id=test_issue.id, cleared_at=None).count() == 0

        # The close it asked for is now one ungated call away.
        closed = await _close(issue, test_user.id)
        assert closed.status == IssueStatus.DONE

    async def test_review_approval_claims_for_the_requester_not_the_approver(
        self, db, test_issue, test_user, test_user2, make_ritual,
    ):
        ritual = await make_ritual(
            name="design-review", trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.REVIEW,
        )
        with pytest.raises(UnclaimedCloseRitualsError):
            await _close(test_issue, test_user.id)
        attestation = await RitualService().attest_for_issue(ritual, test_issue.id, test_user.id, note="design")
        await RitualService().approve_for_issue(attestation, test_user2.id)

        issue = await _issue(test_issue.id)
        assert issue.status == IssueStatus.IN_PROGRESS
        assert issue.assignee_id == test_user.id
        assert issue.lease_expires_at is not None

    async def test_a_ticket_assigned_to_someone_else_keeps_its_assignee(
        self, db, test_issue, test_user, test_user2, make_ritual,
    ):
        await OxydeIssue.objects.filter(id=test_issue.id).update(assignee_id=test_user2.id)
        issue = await _issue(test_issue.id)
        ritual = await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        with pytest.raises(UnclaimedCloseRitualsError):
            await _close(issue, test_user.id)
        await RitualService().attest_for_issue(ritual, test_issue.id, test_user.id, note="cut")

        issue = await _issue(test_issue.id)
        assert issue.status == IssueStatus.IN_PROGRESS
        assert issue.assignee_id == test_user2.id
        assert issue.lease_expires_at is None


@pytest.mark.asyncio
class TestNotGated:
    async def test_cancel_from_backlog_is_not_gated(
        self, client, auth_headers, test_issue, make_ritual,
    ):
        """Canceling abandons the work rather than doing it: no claim
        gate, as no close gate either."""
        await make_ritual(
            name="design-review", trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.REVIEW,
        )
        response = await _patch(client, auth_headers, test_issue.id, status="canceled")
        assert response.status_code == 200, response.text
        assert response.json()["status"] == "canceled"

    async def test_interactive_human_bypasses_when_project_allows(
        self, client, auth_headers, test_issue, test_project, make_ritual,
    ):
        """Same human exemption as the claim itself."""
        from app.oxyde_models.project import OxydeProject

        await OxydeProject.objects.filter(id=test_project.id).update(human_rituals_required=False)
        await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        response = await client.patch(
            f"/api/issues/{test_issue.id}", json={"status": "done"},
            headers={**auth_headers, "X-Chaotic-Interactive": "1"},
        )
        assert response.status_code == 200, response.text


@pytest.mark.asyncio
class TestCreateAsDone:
    async def test_refused_by_a_matching_claim_ritual_with_how_to_proceed(
        self, client, auth_headers, test_project, make_ritual,
    ):
        await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        response = await client.post(
            f"/api/projects/{test_project.id}/issues", headers=auth_headers,
            json={"title": "Already done", "status": "done"},
        )
        assert response.status_code == 409
        detail = response.json()["detail"]
        assert detail["error_code"] == "claim_rituals_pending"
        assert detail["message"].startswith("Cannot create issue as done - ticket has pending claim rituals")
        assert detail["message"].endswith(
            "create it without status done, satisfy its rituals (ritual_pending lists the "
            "ones that apply to it and what each needs), then move it to done."
        )

    async def test_conditions_are_evaluated_against_the_new_ticket(
        self, client, auth_headers, test_project, make_ritual,
    ):
        await make_ritual(
            name="big-claim", trigger=RitualTrigger.TICKET_CLAIM,
            conditions='{"estimate__gte": 5}',
        )
        small = await client.post(
            f"/api/projects/{test_project.id}/issues", headers=auth_headers,
            json={"title": "Small", "status": "done", "estimate": 1},
        )
        assert small.status_code in (200, 201), small.text
        assert small.json()["status"] == "done"

        big = await client.post(
            f"/api/projects/{test_project.id}/issues", headers=auth_headers,
            json={"title": "Big", "status": "done", "estimate": 8},
        )
        assert big.status_code == 409
        assert [r["name"] for r in big.json()["detail"]["pending_rituals"]] == ["big-claim"]

    @pytest.mark.parametrize("asked", ["in_progress", "done"])
    async def test_status_conditions_count_as_matched(
        self, client, auth_headers, test_project, make_ritual, asked,
    ):
        """A claim ritual's status condition describes the status a ticket
        is claimed from; a create has none, so it is treated as matched
        (PR #373 final check), while other conditions still apply."""
        await make_ritual(
            name="from-open", trigger=RitualTrigger.TICKET_CLAIM,
            conditions='{"status__in": ["backlog", "todo"]}',
        )
        await make_ritual(
            name="from-open-big", trigger=RitualTrigger.TICKET_CLAIM,
            conditions='{"status__in": ["backlog", "todo"], "estimate__gte": 5}',
        )
        response = await client.post(
            f"/api/projects/{test_project.id}/issues", headers=auth_headers,
            json={"title": "Straight there", "status": asked, "estimate": 1},
        )
        assert response.status_code == 409
        assert [r["name"] for r in response.json()["detail"]["pending_rituals"]] == ["from-open"]

    async def test_label_conditions_see_the_new_tickets_labels(
        self, client, auth_headers, test_project, test_team, make_ritual,
    ):
        from app.oxyde_models.label import OxydeLabel

        label = await OxydeLabel.objects.create(team_id=test_team.id, name="design", color="#000000")
        await make_ritual(
            name="design-claim", trigger=RitualTrigger.TICKET_CLAIM,
            conditions='{"labels__contains": "design"}',
        )
        plain = await client.post(
            f"/api/projects/{test_project.id}/issues", headers=auth_headers,
            json={"title": "Plain", "status": "in_progress"},
        )
        assert plain.status_code in (200, 201), plain.text
        labeled = await client.post(
            f"/api/projects/{test_project.id}/issues", headers=auth_headers,
            json={"title": "Labeled", "status": "in_progress", "label_ids": [label.id]},
        )
        assert labeled.status_code == 409
        assert labeled.json()["detail"]["error_code"] == "claim_rituals_pending"


@pytest.mark.asyncio
class TestIssueUpdateAttestSatisfiesClaimRituals:
    @pytest.fixture(autouse=True)
    def _as(self, test_user):
        token = context.current_mcp_principal.set(api_key_principal(test_user))
        yield
        context.current_mcp_principal.reset(token)

    async def test_attest_in_the_same_call_closes(self, test_issue, make_ritual):
        await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        await make_ritual(name="close-gate", trigger=RitualTrigger.TICKET_CLOSE)

        blocked = await tools.issue_update(test_issue.identifier, status="done")
        assert blocked["error"]["error_code"] == "claim_rituals_pending"
        assert "claim-gate" in blocked["error"]["message"]

        result = await tools.issue_update(
            test_issue.identifier, status="done",
            attest={"claim-gate": "branch cut", "close-gate": "verified"},
        )
        assert "error" not in result, result
        assert result["status"] == "done"

    async def test_attest_without_prior_refusal(self, test_issue, make_ritual):
        await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        result = await tools.issue_update(
            test_issue.identifier, status="done", attest={"claim-gate": "branch cut"},
        )
        assert "error" not in result, result
        assert result["status"] == "done"


async def _rr_group(project_id, trigger, names):
    from app.enums import SelectionMode
    from app.oxyde_models.ritual import OxydeRitual, OxydeRitualGroup

    group = await OxydeRitualGroup.objects.create(
        project_id=project_id, name=f"rr-{trigger.value}", selection_mode=SelectionMode.ROUND_ROBIN,
    )
    members = [
        await OxydeRitual.objects.create(
            project_id=project_id, name=name, prompt="p", trigger=trigger, group_id=group.id,
            approval_mode=ApprovalMode.AUTO, note_required=False,
        )
        for name in names
    ]
    return group, members
