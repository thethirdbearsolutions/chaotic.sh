"""Sprint ritual inbox entries (CHT-2032).

A sprint in limbo puts what waits on an admin in the admins' inboxes: a
GATE sprint ritual at once, a REVIEW one once attested. Approving, signing
off or leaving limbo settles them. The API offers the sprint-level call
as the entry's approve action, and archived entries still waiting come
back with include_archived.
"""
import pytest

from app.enums import ApprovalMode, InboxActionKind, InboxEntryKind, RitualTrigger, SprintStatus, TeamRole
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.ritual import OxydeRitual
from app.oxyde_models.sprint import OxydeSprint
from app.oxyde_models.team import OxydeTeamMember
from app.schemas.ritual import RitualUpdate
from app.services.inbox_service import InboxService
from app.services.ritual_service import RitualService
from app.services.sprint_service import SprintService


@pytest.fixture
async def active_sprint(db, test_project):
    return await OxydeSprint.objects.create(
        project_id=test_project.id, name="Sprint 12", status=SprintStatus.ACTIVE,
    )


async def _ritual(project, name, mode, **kw):
    return await OxydeRitual.objects.create(
        project_id=project.id, name=name, prompt=f"{name}: what it asks",
        trigger=RitualTrigger.EVERY_SPRINT, approval_mode=mode, **kw,
    )


async def _entries(**filters):
    return await OxydeInboxEntry.objects.filter(kind=InboxEntryKind.SPRINT_RITUAL, **filters).all()


@pytest.mark.asyncio
class TestWritten:
    async def test_limbo_asks_admins_for_a_gate(self, db, test_project, test_user, test_user2, active_sprint):
        await OxydeTeamMember.objects.create(team_id=test_project.team_id, user_id=test_user2.id, role=TeamRole.MEMBER)
        gate = await _ritual(test_project, "retro", ApprovalMode.GATE)
        await SprintService().close_sprint(active_sprint)

        entries = await _entries()
        assert [e.recipient_user_id for e in entries] == [test_user.id]  # the owner, not the member
        entry = entries[0]
        assert entry.ritual_id == gate.id and entry.project_id == test_project.id
        assert entry.issue_id is None
        assert entry.title == "Sign-off needed: retro for Sprint 12"
        assert entry.body == "retro: what it asks"

    async def test_review_waits_for_its_attestation(self, db, test_project, test_user, active_sprint):
        review = await _ritual(test_project, "demo", ApprovalMode.REVIEW)
        await SprintService().close_sprint(active_sprint)
        assert await _entries() == []  # nothing for an admin to decide yet

        await RitualService().attest(review, active_sprint.id, test_user.id, note="  Demo recorded  ")
        [entry] = await _entries()
        assert entry.title == "Review requested: demo for Sprint 12"
        assert entry.body == "Demo recorded"
        assert entry.source_user_id == test_user.id

    async def test_review_attested_before_the_close_is_asked_at_limbo(
        self, db, test_project, test_user, active_sprint,
    ):
        review = await _ritual(test_project, "demo", ApprovalMode.REVIEW)
        await _ritual(test_project, "retro", ApprovalMode.GATE)  # keeps the sprint in limbo
        await RitualService().attest(review, active_sprint.id, test_user.id, note="early")
        assert await _entries() == []  # not in limbo yet

        await SprintService().close_sprint(active_sprint)
        assert sorted(e.title for e in await _entries()) == [
            "Review requested: demo for Sprint 12", "Sign-off needed: retro for Sprint 12",
        ]

    async def test_auto_rituals_ask_nobody(self, db, test_project, active_sprint):
        await _ritual(test_project, "standup", ApprovalMode.AUTO)
        await SprintService().close_sprint(active_sprint)
        assert await _entries() == []

    async def test_one_open_entry_per_ritual(self, db, test_project, test_user, active_sprint):
        gate = await _ritual(test_project, "retro", ApprovalMode.GATE)
        await SprintService().close_sprint(active_sprint)
        await InboxService().notify_sprint_ritual(ritual=gate, sprint=active_sprint, project=test_project)
        assert len(await _entries()) == 1


@pytest.mark.asyncio
class TestSettled:
    async def test_sign_off_settles_and_rotates(self, db, test_project, test_user, active_sprint):
        gate = await _ritual(test_project, "retro", ApprovalMode.GATE)
        await SprintService().close_sprint(active_sprint)
        await RitualService().complete_gate_ritual(gate, active_sprint.id, test_user.id, note="done")

        [entry] = await _entries()
        assert entry.resolved_at is not None and entry.read_at is not None
        await active_sprint.refresh()
        assert active_sprint.status == SprintStatus.COMPLETED

    async def test_approve_settles_that_ritual_only(self, db, test_project, test_user, active_sprint):
        review = await _ritual(test_project, "demo", ApprovalMode.REVIEW)
        gate = await _ritual(test_project, "retro", ApprovalMode.GATE)
        await SprintService().close_sprint(active_sprint)
        attestation = await RitualService().attest(review, active_sprint.id, test_user.id, note="n")
        await RitualService().approve(attestation, test_user.id)

        by_ritual = {e.ritual_id: e for e in await _entries()}
        assert by_ritual[review.id].resolved_at is not None
        assert by_ritual[gate.id].resolved_at is None  # still in limbo on it

    async def test_force_clear_settles_everything(self, db, test_project, test_user, active_sprint):
        await _ritual(test_project, "retro", ApprovalMode.GATE)
        await _ritual(test_project, "plan", ApprovalMode.GATE)
        await SprintService().close_sprint(active_sprint)
        await active_sprint.refresh()
        await SprintService().complete_limbo(active_sprint)
        assert all(e.resolved_at is not None for e in await _entries())

    async def test_deactivating_the_ritual_settles_it(self, db, test_project, test_user, active_sprint):
        gate = await _ritual(test_project, "retro", ApprovalMode.GATE)
        await _ritual(test_project, "plan", ApprovalMode.GATE)
        await SprintService().close_sprint(active_sprint)
        await RitualService().update(gate, RitualUpdate(is_active=False))
        [entry] = await _entries(ritual_id=gate.id)
        assert entry.resolved_at is not None

    async def test_mode_change_asks_again_in_the_new_mode(self, db, test_project, test_user, active_sprint):
        ritual = await _ritual(test_project, "retro", ApprovalMode.GATE)
        await SprintService().close_sprint(active_sprint)
        attestation_free = await _entries()
        assert len(attestation_free) == 1

        # GATE -> REVIEW: nothing attested, so nothing for an admin yet.
        await RitualService().update(ritual, RitualUpdate(approval_mode=ApprovalMode.REVIEW))
        entries = await _entries()
        assert len(entries) == 1 and entries[0].resolved_at is not None

        # REVIEW -> GATE: the sprint waits on a sign-off again.
        ritual = await OxydeRitual.objects.get(id=ritual.id)
        await RitualService().update(ritual, RitualUpdate(approval_mode=ApprovalMode.GATE))
        open_entries = [e for e in await _entries() if e.resolved_at is None]
        assert len(open_entries) == 1
        assert open_entries[0].title.startswith("Sign-off needed")


@pytest.mark.asyncio
class TestApi:
    async def test_gate_entry_offers_the_sprint_complete_call(
        self, client, db, test_project, test_user, auth_headers, active_sprint,
    ):
        gate = await _ritual(test_project, "retro", ApprovalMode.GATE)
        await SprintService().close_sprint(active_sprint)

        resp = await client.get("/api/inbox", params={"kind": "sprint_ritual"}, headers=auth_headers)
        assert resp.status_code == 200
        [entry] = resp.json()
        assert entry["kind"] == "sprint_ritual"
        approve = [a for a in entry["actions"] if a["kind"] == InboxActionKind.APPROVE.value]
        assert [a["path"] for a in approve] == [
            f"/api/rituals/{gate.id}/complete?project_id={test_project.id}",
        ]
        assert approve[0]["note"] == "optional"
        assert not [a for a in entry["actions"] if a["kind"] == InboxActionKind.REJECT.value]

        done = await client.post(approve[0]["path"], json={"note": "held"}, headers=auth_headers)
        assert done.status_code == 200, done.text
        assert (await client.get("/api/inbox", headers=auth_headers)).json() == []

    async def test_review_entry_offers_the_sprint_approve_call(
        self, client, db, test_project, test_user, auth_headers, active_sprint,
    ):
        review = await _ritual(test_project, "demo", ApprovalMode.REVIEW)
        await SprintService().close_sprint(active_sprint)
        await RitualService().attest(review, active_sprint.id, test_user.id, note="n")

        [entry] = (await client.get("/api/inbox", headers=auth_headers)).json()
        [approve] = [a for a in entry["actions"] if a["kind"] == InboxActionKind.APPROVE.value]
        assert approve["path"] == f"/api/rituals/{review.id}/approve?project_id={test_project.id}"
        assert approve["note"] == "none"

    async def test_a_member_is_offered_no_decision(
        self, client, db, test_project, test_user, auth_headers, active_sprint,
    ):
        await _ritual(test_project, "retro", ApprovalMode.GATE)
        await SprintService().close_sprint(active_sprint)
        await OxydeTeamMember.objects.filter(team_id=test_project.team_id, user_id=test_user.id).update(
            role=TeamRole.MEMBER,
        )
        [entry] = (await client.get("/api/inbox", headers=auth_headers)).json()
        assert InboxActionKind.APPROVE.value not in {a["kind"] for a in entry["actions"]}

    async def test_include_archived_brings_back_what_still_waits(
        self, client, db, test_project, test_user, auth_headers, active_sprint,
    ):
        gate = await _ritual(test_project, "retro", ApprovalMode.GATE)
        await _ritual(test_project, "plan", ApprovalMode.GATE)
        await SprintService().close_sprint(active_sprint)
        retro, plan = (
            next(e for e in await _entries() if e.ritual_id == gate.id),
            next(e for e in await _entries() if e.ritual_id != gate.id),
        )
        await InboxService().archive(retro)
        await InboxService().archive(plan)
        # One of them is decided after it was archived.
        await RitualService().complete_gate_ritual(gate, active_sprint.id, test_user.id, note="ok")

        assert (await client.get("/api/inbox", headers=auth_headers)).json() == []
        listed = (await client.get(
            "/api/inbox", params={"include_archived": "true"}, headers=auth_headers,
        )).json()
        assert [e["id"] for e in listed] == [plan.id]
        assert listed[0]["archived_at"] is not None
        kinds = {a["kind"] for a in listed[0]["actions"]}
        assert kinds == {InboxActionKind.APPROVE.value}  # no archive, no mark read: it is both

    async def test_sync_tombstone_of_an_archived_decision_offers_nothing(
        self, client, db, test_project, test_user, auth_headers, active_sprint,
    ):
        await _ritual(test_project, "retro", ApprovalMode.GATE)
        await SprintService().close_sprint(active_sprint)
        first = (await client.get("/api/inbox/sync", headers=auth_headers)).json()
        [entry] = await _entries()
        await InboxService().archive(entry)
        later = (await client.get(
            "/api/inbox/sync", params={"since": first["next_cursor"]}, headers=auth_headers,
        )).json()
        [tombstone] = [e for e in later["entries"] if e["id"] == entry.id]
        assert tombstone["state"] == "archived" and tombstone["actions"] == []
