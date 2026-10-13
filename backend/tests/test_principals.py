"""Responses that name an actor carry a principal summary: enough to tell a
person from an agent and say whose agent it is (CHT-1500)."""
import pytest

from app.enums import ActivityType, DocumentActivityType, InboxEntryKind
from app.oxyde_models.document import (
    OxydeDocument, OxydeDocumentActivity, OxydeDocumentComment, OxydeDocumentRevision,
)
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.issue import (
    OxydeIssue, OxydeIssueActivity, OxydeIssueComment, OxydeIssueDescriptionRevision,
)
from app.oxyde_models.ritual import OxydeRitualAttestation
from app.schemas.agent import AgentCreate
from app.schemas.principal import PrincipalSummary
from app.services.agent_service import AgentService
from app.services.principals import fill_principals, load_principals

SUMMARY_KEYS = set(PrincipalSummary.model_fields)


@pytest.fixture
async def agent(test_user, test_team):
    created, _, _ = await AgentService().create(AgentCreate(name="Builder Bot"), test_user, test_team.id)
    return created


def _is_agent_of(principal, agent, owner):
    assert set(principal) == SUMMARY_KEYS, principal
    assert principal == {
        "id": agent.id, "name": agent.name, "is_agent": True,
        "owner_id": owner.id, "owner_name": owner.name,
        # A hand-made agent (CHT-1498): no registrar.
        "kind": "assistant", "registered_by_id": None, "registered_by_name": None,
    }


def _is_person(principal, user):
    assert principal == {
        "id": user.id, "name": user.name, "is_agent": False, "owner_id": None, "owner_name": None,
        "kind": None, "registered_by_id": None, "registered_by_name": None,
    }


def _ok(response):
    assert response.status_code == 200, response.text
    return response.json()


class TestLoadPrincipals:
    async def test_people_agents_and_unknown_ids(self, test_user, agent):
        got = await load_principals([test_user.id, agent.id, None, "no-such-user"])

        assert set(got) == {test_user.id, agent.id}
        _is_person(got[test_user.id].model_dump(), test_user)
        _is_agent_of(got[agent.id].model_dump(), agent, test_user)

    async def test_an_agent_whose_owner_is_not_in_the_batch(self, test_user, agent):
        """The owner is fetched separately when it was not asked for."""
        got = await load_principals([agent.id])
        assert got[agent.id].owner_name == test_user.name

    async def test_an_agent_without_an_owner(self, agent_user):
        got = await load_principals([agent_user.id])
        assert got[agent_user.id].is_agent is True
        assert got[agent_user.id].owner_id is None and got[agent_user.id].owner_name is None

    async def test_nothing_to_load_costs_nothing(self):
        assert await load_principals([None, ""]) == {}

    async def test_fill_reaches_nested_models(self, test_user, agent):
        from app.schemas.ritual import PendingRitualResponse, RitualAttestationResponse
        from datetime import datetime, timezone

        att = RitualAttestationResponse(
            id="a", ritual_id="r", sprint_id=None, issue_id="i", attested_by=agent.id,
            attested_at=datetime.now(timezone.utc), note=None, approved_by=test_user.id, approved_at=None,
        )
        row = PendingRitualResponse(
            id="r", name="n", prompt="p", approval_mode="auto", note_required=False, attestation=att,
        )
        await fill_principals([row])
        assert row.attestation.attester.is_agent and row.attestation.attester.owner_id == test_user.id
        assert row.attestation.approver.id == test_user.id


class TestIssueSurfaces:
    async def test_creator_and_assignee(self, client, auth_headers, test_user, test_project, agent):
        issue = await OxydeIssue.objects.create(
            project_id=test_project.id, identifier=f"{test_project.key}-90", number=90, title="who",
            creator_id=agent.id, assignee_id=test_user.id,
        )

        one = _ok(await client.get(f"/api/issues/{issue.id}", headers=auth_headers))
        _is_agent_of(one["creator"], agent, test_user)
        _is_person(one["assignee"], test_user)
        assert one["creator_name"] == agent.name and one["assignee_name"] == test_user.name

        listed = _ok(await client.get(f"/api/issues?project_id={test_project.id}", headers=auth_headers))
        row = next(r for r in listed if r["id"] == issue.id)
        assert row["creator"] == one["creator"] and row["assignee"] == one["assignee"]

    async def test_unassigned_is_null(self, client, auth_headers, test_issue):
        one = _ok(await client.get(f"/api/issues/{test_issue.id}", headers=auth_headers))
        assert one["assignee"] is None and one["creator"]["is_agent"] is False

    async def test_comments_activity_and_revisions(
        self, client, auth_headers, test_user, test_team, test_issue, agent,
    ):
        await OxydeIssueComment.objects.create(issue_id=test_issue.id, author_id=agent.id, content="hi")
        await OxydeIssueActivity.objects.create(
            issue_id=test_issue.id, user_id=agent.id, activity_type=ActivityType.CREATED,
        )
        await OxydeIssueDescriptionRevision.objects.create(
            issue_id=test_issue.id, version=99, description=test_issue.description, author_id=agent.id,
        )

        comments = _ok(await client.get(f"/api/issues/{test_issue.id}/comments", headers=auth_headers))
        _is_agent_of(comments[0]["author"], agent, test_user)

        team_comments = _ok(await client.get(f"/api/issues/comments?team_id={test_team.id}", headers=auth_headers))
        _is_agent_of(team_comments[0]["author"], agent, test_user)

        acts = _ok(await client.get(f"/api/issues/{test_issue.id}/activities", headers=auth_headers))
        _is_agent_of(acts[0]["user"], agent, test_user)

        feed = _ok(await client.get(f"/api/issues/activities?team_id={test_team.id}", headers=auth_headers))
        _is_agent_of(feed[0]["user"], agent, test_user)

        revs = _ok(await client.get(f"/api/issues/{test_issue.id}/description-revisions", headers=auth_headers))
        _is_agent_of(next(r for r in revs if r["version"] == 99)["author"], agent, test_user)
        rev = _ok(await client.get(f"/api/issues/{test_issue.id}/description-revisions/99", headers=auth_headers))
        _is_agent_of(rev["author"], agent, test_user)

    async def test_a_comment_posted_by_an_agent_says_so(
        self, client, test_user, test_issue, agent,
    ):
        from app.utils.security import create_access_token
        headers = {"Authorization": f"Bearer {create_access_token(data={'sub': agent.id})}"}

        made = await client.post(f"/api/issues/{test_issue.id}/comments", json={"content": "x"}, headers=headers)
        assert made.status_code == 201, made.text
        _is_agent_of(made.json()["author"], agent, test_user)

    async def test_issue_list_costs_a_fixed_number_of_principal_queries(
        self, client, auth_headers, test_user, test_project, agent, monkeypatch,
    ):
        """Batched, not per row: 20 agent-made issues cost what 2 do."""
        from oxyde.db import AsyncDatabase

        calls = []
        real_execute = AsyncDatabase.execute

        async def counting_execute(self, ir):
            calls.append(ir["op"])
            return await real_execute(self, ir)

        async def make(start, n):
            for k in range(start, start + n):
                await OxydeIssue.objects.create(
                    project_id=test_project.id, identifier=f"{test_project.key}-{k}", number=k,
                    title=f"t{k}", creator_id=agent.id, assignee_id=test_user.id,
                )

        async def count():
            calls.clear()
            body = _ok(await client.get(f"/api/issues?project_id={test_project.id}", headers=auth_headers))
            return len(calls), body

        monkeypatch.setattr(AsyncDatabase, "execute", counting_execute)
        await make(100, 2)
        small, _ = await count()
        await make(200, 18)
        large, body = await count()

        assert len(body) == 20
        assert all(r["creator"]["owner_id"] == test_user.id for r in body)
        assert large == small, f"{large - small} extra queries for 18 more rows"


class TestOtherSurfaces:
    async def test_inbox_source_user(self, client, auth_headers, test_user, test_team, agent):
        await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION, team_id=test_team.id,
            title="ping", source_user_id=agent.id,
        )
        entries = _ok(await client.get("/api/inbox", headers=auth_headers))
        _is_agent_of(entries[0]["source_user"], agent, test_user)
        assert entries[0]["source_user_name"] == agent.name

    async def test_documents_and_doc_comments(self, client, auth_headers, test_user, test_team, agent):
        document = await OxydeDocument.objects.create(team_id=test_team.id, author_id=agent.id, title="d")
        await OxydeDocumentComment.objects.create(document_id=document.id, author_id=agent.id, content="c")
        await OxydeDocumentActivity.objects.create(
            document_id=document.id, team_id=test_team.id, user_id=agent.id,
            activity_type=DocumentActivityType.CREATED,
        )
        await OxydeDocumentRevision.objects.create(
            document_id=document.id, version=1, title="d", content=None, author_id=agent.id,
        )

        _is_agent_of(_ok(await client.get(f"/api/documents/{document.id}", headers=auth_headers))["author"],
                     agent, test_user)
        listed = _ok(await client.get(f"/api/teams/{test_team.id}/documents", headers=auth_headers))
        _is_agent_of(listed[0]["author"], agent, test_user)
        comments = _ok(await client.get(f"/api/documents/{document.id}/comments", headers=auth_headers))
        _is_agent_of(comments[0]["author"], agent, test_user)
        revs = _ok(await client.get(f"/api/documents/{document.id}/revisions", headers=auth_headers))
        _is_agent_of(revs[0]["author"], agent, test_user)
        rev = _ok(await client.get(f"/api/documents/{document.id}/revisions/1", headers=auth_headers))
        _is_agent_of(rev["author"], agent, test_user)
        feed = _ok(await client.get(f"/api/issues/activities?team_id={test_team.id}", headers=auth_headers))
        _is_agent_of(feed[0]["user"], agent, test_user)

    async def test_attestations(self, client, auth_headers, test_user, test_issue, test_project, agent, make_ritual):
        ritual = await make_ritual()
        await OxydeRitualAttestation.objects.create(
            ritual_id=ritual.id, issue_id=test_issue.id, attested_by=agent.id, approved_by=test_user.id,
        )

        pending = _ok(await client.get(f"/api/rituals/issue/{test_issue.id}/pending", headers=auth_headers))
        rows = pending["pending_rituals"] + pending["completed_rituals"]
        att = next(r["attestation"] for r in rows if r.get("attestation"))
        _is_agent_of(att["attester"], agent, test_user)
        _is_person(att["approver"], test_user)

        history = _ok(await client.get(f"/api/rituals/history?project_id={test_project.id}", headers=auth_headers))
        _is_agent_of(history[0]["attester"], agent, test_user)
        _is_person(history[0]["approver"], test_user)
        assert history[0]["attested_by"] == agent.id

    async def test_a_deleted_author_has_no_principal(self, client, auth_headers, test_project):
        issue = await OxydeIssue.objects.create(
            project_id=test_project.id, identifier=f"{test_project.key}-91", number=91, title="orphan",
            creator_id=None,
        )
        one = _ok(await client.get(f"/api/issues/{issue.id}", headers=auth_headers))
        assert one["creator"] is None and one["creator_name"] == "Deleted user"


class TestApproveResponses:
    """The approve endpoints return the built attestation response, so the
    approver they exist to record is named (PR #327 review, finding 1)."""

    async def test_approve_issue_attestation(self, client, auth_headers, test_user, test_project, test_issue, agent):
        from app.enums import ApprovalMode, RitualTrigger
        from app.oxyde_models.ritual import OxydeRitual

        ritual = await OxydeRitual.objects.create(
            project_id=test_project.id, name="review-ticket", prompt="?",
            trigger=RitualTrigger.TICKET_CLOSE, approval_mode=ApprovalMode.REVIEW,
        )
        await OxydeRitualAttestation.objects.create(
            ritual_id=ritual.id, issue_id=test_issue.id, attested_by=agent.id, note="done",
        )

        got = _ok(await client.post(f"/api/rituals/{ritual.id}/approve-issue/{test_issue.id}", headers=auth_headers))

        _is_agent_of(got["attester"], agent, test_user)
        _is_person(got["approver"], test_user)
        assert got["attested_by_name"] == agent.name and got["approved_by_name"] == test_user.name

    async def test_approve_sprint_attestation(self, client, auth_headers, test_user, test_project, agent):
        from app.enums import ApprovalMode, SprintStatus
        from app.oxyde_models.ritual import OxydeRitual
        from app.oxyde_models.sprint import OxydeSprint

        ritual = await OxydeRitual.objects.create(
            project_id=test_project.id, name="review-sprint", prompt="?", approval_mode=ApprovalMode.REVIEW,
        )
        sprint = await OxydeSprint.objects.create(
            project_id=test_project.id, name="Sprint 1", status=SprintStatus.COMPLETED, limbo=True,
        )
        await OxydeRitualAttestation.objects.create(
            ritual_id=ritual.id, sprint_id=sprint.id, attested_by=agent.id, note="done",
        )

        got = _ok(await client.post(
            f"/api/rituals/{ritual.id}/approve?project_id={test_project.id}", headers=auth_headers,
        ))

        _is_agent_of(got["attester"], agent, test_user)
        _is_person(got["approver"], test_user)


async def test_pending_rituals_load_principals_once_for_all_rows(
    client, auth_headers, test_user, test_issue, agent, make_ritual, monkeypatch,
):
    """Attesters for every ritual on the pending/completed lists come from
    one batched load, not one per attested ritual (review finding 4)."""
    from app.services import principals as principals_mod

    for _ in range(4):
        ritual = await make_ritual()
        await OxydeRitualAttestation.objects.create(
            ritual_id=ritual.id, issue_id=test_issue.id, attested_by=agent.id,
        )

    loads = []
    real = principals_mod.load_principals

    async def counting(ids):
        loads.append(1)
        return await real(ids)

    monkeypatch.setattr(principals_mod, "load_principals", counting)
    body = _ok(await client.get(f"/api/rituals/issue/{test_issue.id}/pending", headers=auth_headers))

    atts = [r["attestation"] for r in body["pending_rituals"] + body["completed_rituals"] if r.get("attestation")]
    assert len(atts) == 4
    for att in atts:
        _is_agent_of(att["attester"], agent, test_user)
        assert att["attested_by_name"] == agent.name
    assert len(loads) <= 2, f"{len(loads)} principal loads for one response"
