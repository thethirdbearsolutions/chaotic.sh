"""A close of a never-claimed ticket must pass its claim rituals (CHT-1672).

Claim rituals used to be checked only on the -> in_progress transition,
so a ticket moved straight from backlog/todo to done skipped them: a
review-mode design-review claim gate was bypassed by never claiming
(CHT-1613 closed and charged the sprint while CHT-1611, which went
through issue_start, stayed blocked).

The rule: a transition into done from an unclaimed state (backlog, todo,
canceled) is gated by the ticket's pending claim rituals, exactly as
issue_start is, before its close rituals. Canceling is not gated, and a
ticket already in progress is not re-checked.
"""
import pytest

from app.enums import ApprovalMode, IssueStatus, LimboType, RitualTrigger
from app.mcp_server import context, tools
from app.oxyde_models.issue import OxydeBudgetTransaction, OxydeIssue, OxydeTicketLimbo
from app.schemas.issue import IssueUpdate
from app.services.issue_service import (
    ClaimRitualsError,
    IssueService,
    UnclaimedCloseRitualsError,
)

from .mcp_principal import api_key_principal


async def _status(issue_id: str) -> IssueStatus:
    return (await OxydeIssue.objects.get(id=issue_id)).status


async def _patch(client, headers, issue_id, **body):
    return await client.patch(f"/api/issues/{issue_id}", headers=headers, json=body)


@pytest.mark.asyncio
class TestCloseFromUnclaimedState:
    async def test_backlog_to_done_is_refused_by_pending_claim_ritual(
        self, client, auth_headers, test_issue, test_sprint, make_ritual,
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
        assert await _status(test_issue.id) == IssueStatus.BACKLOG
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
        assert await _status(test_issue.id) == IssueStatus.BACKLOG

    @pytest.mark.parametrize("start", [IssueStatus.TODO, IssueStatus.CANCELED])
    async def test_other_unclaimed_states_are_gated_too(
        self, client, auth_headers, test_issue, make_ritual, start,
    ):
        await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        await OxydeIssue.objects.filter(id=test_issue.id).update(status=start)
        response = await _patch(client, auth_headers, test_issue.id, status="done")
        assert response.status_code == 409
        assert response.json()["detail"]["error_code"] == "claim_rituals_pending"
        assert await _status(test_issue.id) == start

    async def test_claim_gate_comes_before_close_rituals(
        self, db, test_issue, test_user, make_ritual,
    ):
        """Both pending: the claim refusal is raised and only a CLAIM
        intent is opened, so clearing it auto-transitions to
        in_progress (a claim), and the close is a separate step."""
        await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        await make_ritual(name="close-gate", trigger=RitualTrigger.TICKET_CLOSE)
        with pytest.raises(UnclaimedCloseRitualsError) as exc:
            await IssueService().update(
                test_issue, IssueUpdate(status=IssueStatus.DONE), user_id=test_user.id,
                is_human_request=False,
            )
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

    @pytest.mark.parametrize("start", [IssueStatus.IN_PROGRESS, IssueStatus.IN_REVIEW])
    async def test_claimed_ticket_is_not_rechecked_on_close(
        self, client, auth_headers, test_issue, make_ritual, start,
    ):
        """A ticket past the claim (here: a claim ritual added after it)
        closes on its close rituals alone."""
        await OxydeIssue.objects.filter(id=test_issue.id).update(status=start)
        await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
        response = await _patch(client, auth_headers, test_issue.id, status="done")
        assert response.status_code == 200, response.text

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
async def test_create_as_done_is_refused_by_claim_rituals(client, auth_headers, test_project, make_ritual):
    await make_ritual(name="claim-gate", trigger=RitualTrigger.TICKET_CLAIM)
    response = await client.post(
        f"/api/projects/{test_project.id}/issues", headers=auth_headers,
        json={"title": "Already done", "status": "done"},
    )
    assert response.status_code == 409
    detail = response.json()["detail"]
    assert detail["error_code"] == "claim_rituals_pending"
    assert detail["message"].startswith("Cannot create issue as done - ticket has pending claim rituals")
    assert detail["message"].endswith("before closing.")


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
