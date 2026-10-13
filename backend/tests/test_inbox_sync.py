"""Inbox sync for an offline client (CHT-1607): the (updated_at, id)
cursor, tombstones for archived and resolved entries, and the one-call
actions an entry carries."""
from datetime import datetime, timedelta, timezone

import pytest

from app.enums import InboxEntryKind, IssueStatus, TeamRole
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.schemas.issue import IssueUpdate
from app.services.inbox_service import InboxService
from app.services.issue_service import ClaimRitualsError, IssueService, TicketRitualsError
from app.services.ritual_service import RitualService
from app.utils.sync_cursor import InvalidCursorError, decode_cursor, encode_cursor


async def _entry(user_id, team_id, title="x", **kw):
    return await OxydeInboxEntry.objects.create(
        recipient_user_id=user_id, kind=kw.pop("kind", InboxEntryKind.MENTION),
        team_id=team_id, title=title, **kw,
    )


async def _sync(client, headers, since=None, limit=None):
    params = {}
    if since is not None:
        params["since"] = since
    if limit is not None:
        params["limit"] = limit
    resp = await client.get("/api/inbox/sync", params=params, headers=headers)
    assert resp.status_code == 200, resp.text
    return resp.json()


async def _claim_gate(issue, user_id):
    with pytest.raises(ClaimRitualsError):
        await IssueService().update(
            issue, IssueUpdate(status=IssueStatus.IN_PROGRESS),
            user_id=user_id, is_human_request=False,
        )


async def _close_review(issue, user_id, ritual):
    with pytest.raises(TicketRitualsError):
        await IssueService().update(
            issue, IssueUpdate(status=IssueStatus.DONE),
            user_id=user_id, is_human_request=False,
        )
    await RitualService().attest_for_issue(
        ritual=ritual, issue_id=issue.id, user_id=user_id, note="done",
    )


def _by_kind(entry):
    return {a["kind"]: a for a in entry["actions"]}


class TestCursor:
    def test_round_trip(self):
        at = datetime(2026, 10, 13, 12, 0, 0, 123456, tzinfo=timezone.utc)
        assert decode_cursor(encode_cursor(at, "abc")) == (at, "abc")

    def test_naive_datetime_is_utc(self):
        at = datetime(2026, 10, 13, 12, 0, 0)
        assert decode_cursor(encode_cursor(at, "abc"))[0] == at.replace(tzinfo=timezone.utc)

    def test_other_timezone_normalised(self):
        at = datetime(2026, 10, 13, 14, 0, tzinfo=timezone(timedelta(hours=2)))
        decoded, _ = decode_cursor(encode_cursor(at, "abc"))
        assert decoded == at and decoded.tzinfo == timezone.utc

    @pytest.mark.parametrize("bad", [
        "", "!!!", "bm90IGpzb24", "W10",  # not base64, not json, a json list
        "eyJ2IjoyLCJ0IjoiMjAyNi0xMC0xM1QxMjowMDowMCswMDowMCIsImlkIjoiYSJ9",  # v=2
        "eyJ2IjoxLCJ0IjoiMjAyNi0xMC0xM1QxMjowMDowMCIsImlkIjoiYSJ9",  # naive t
        "eyJ2IjoxLCJ0Ijoibm9wZSIsImlkIjoiYSJ9",  # bad t
        "eyJ2IjoxLCJ0IjoiMjAyNi0xMC0xM1QxMjowMDowMCswMDowMCIsImlkIjoxfQ",  # id not str
        "eyJ2IjoxfQ",  # missing keys
    ])
    def test_rejects_garbage(self, bad):
        with pytest.raises(InvalidCursorError):
            decode_cursor(bad)


@pytest.mark.asyncio
class TestUpdatedAt:
    async def test_every_writer_bumps_updated_at(self, db, test_team, test_user):
        service = InboxService()
        a = await _entry(test_user.id, test_team.id, "a")
        b = await _entry(test_user.id, test_team.id, "b")
        c = await _entry(test_user.id, test_team.id, "c")
        assert a.updated_at is not None

        read = await service.mark_read(a)
        assert read.updated_at > a.created_at
        archived = await service.archive(b)
        assert archived.updated_at >= archived.archived_at
        await service.mark_all_read(test_user.id)
        c2 = await OxydeInboxEntry.objects.get(id=c.id)
        assert c2.read_at is not None and c2.updated_at == c2.read_at

    async def test_mark_read_twice_does_not_bump(self, db, test_team, test_user):
        service = InboxService()
        e = await service.mark_read(await _entry(test_user.id, test_team.id))
        first = e.updated_at
        again = await service.mark_read(await OxydeInboxEntry.objects.get(id=e.id))
        assert again.updated_at == first


@pytest.mark.asyncio
class TestResolve:
    async def test_resolve_sets_resolved_at_even_when_already_read(
        self, db, test_project, test_issue, test_user, gate_close_ritual,
    ):
        service = InboxService()
        await service.notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project, requested_by_name="A",
        )
        entry = await OxydeInboxEntry.objects.filter(issue_id=test_issue.id).first()
        entry = await service.mark_read(entry)
        read_at = entry.read_at

        # Already read, so not counted as newly read; still resolved.
        assert await service.resolve_gate_or_review(
            ritual_id=gate_close_ritual.id, issue_id=test_issue.id,
        ) == 0
        entry = await OxydeInboxEntry.objects.get(id=entry.id)
        assert entry.resolved_at is not None
        assert entry.read_at == read_at
        assert entry.updated_at == entry.resolved_at

    async def test_resolve_does_not_re_resolve(
        self, db, test_project, test_issue, gate_close_ritual,
    ):
        service = InboxService()
        await service.notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project, requested_by_name="A",
        )
        assert await service.resolve_gate_or_review(
            ritual_id=gate_close_ritual.id, issue_id=test_issue.id,
        ) == 1
        first = (await OxydeInboxEntry.objects.filter(issue_id=test_issue.id).first()).updated_at
        assert await service.resolve_gate_or_review(
            ritual_id=gate_close_ritual.id, issue_id=test_issue.id,
        ) == 0
        assert (await OxydeInboxEntry.objects.filter(issue_id=test_issue.id).first()).updated_at == first

    async def test_resolve_rejected_sets_resolved_at(
        self, db, test_team, test_issue, test_user, gate_close_ritual,
    ):
        e = await _entry(
            test_user.id, test_team.id, kind=InboxEntryKind.GATE_REJECTED,
            ritual_id=gate_close_ritual.id, issue_id=test_issue.id,
        )
        assert await InboxService().resolve_rejected(
            ritual_id=gate_close_ritual.id, issue_id=test_issue.id, recipient_user_ids=[test_user.id],
        ) == 1
        e = await OxydeInboxEntry.objects.get(id=e.id)
        assert e.resolved_at is not None and e.read_at is not None


@pytest.mark.asyncio
class TestSyncEndpoint:
    async def test_first_sync_returns_open_entries_oldest_change_first(
        self, client, db, test_team, test_user, auth_headers,
    ):
        service = InboxService()
        a = await _entry(test_user.id, test_team.id, "a")
        b = await _entry(test_user.id, test_team.id, "b")
        gone = await service.archive(await _entry(test_user.id, test_team.id, "gone"))
        await service.mark_read(a)  # a changes after b

        body = await _sync(client, auth_headers)
        ids = [e["id"] for e in body["entries"]]
        assert ids == [b.id, a.id]
        assert gone.id not in ids
        assert body["has_more"] is False
        assert body["team_ids"] == [test_team.id]
        assert all(e["state"] == "open" for e in body["entries"])
        assert body["next_cursor"] == encode_cursor(
            (await OxydeInboxEntry.objects.get(id=a.id)).updated_at, a.id,
        )

    async def test_empty_first_sync_has_no_cursor(self, client, db, test_team, auth_headers):
        body = await _sync(client, auth_headers)
        assert body == {"entries": [], "next_cursor": None, "has_more": False, "team_ids": [test_team.id]}

    async def test_since_returns_only_changes_with_tombstones(
        self, client, db, test_team, test_user, auth_headers,
    ):
        service = InboxService()
        a = await _entry(test_user.id, test_team.id, "a")
        b = await _entry(test_user.id, test_team.id, "b")
        first = await _sync(client, auth_headers)
        cursor = first["next_cursor"]

        # Nothing changed: nothing comes back, and the cursor holds.
        idle = await _sync(client, auth_headers, since=cursor)
        assert idle["entries"] == [] and idle["next_cursor"] == cursor

        await service.archive(a)
        c = await _entry(test_user.id, test_team.id, "c")
        later = await _sync(client, auth_headers, since=cursor)
        by_id = {e["id"]: e for e in later["entries"]}
        assert list(by_id) == [a.id, c.id]
        assert by_id[a.id]["state"] == "archived"
        assert by_id[a.id]["archived_at"] is not None
        assert by_id[a.id]["actions"] == []
        assert by_id[c.id]["state"] == "open"
        assert b.id not in by_id

    async def test_pages_with_has_more_and_ties_on_updated_at(
        self, client, db, test_team, test_user, auth_headers,
    ):
        """Rows changed in the same instant are split across pages by id,
        none skipped and none repeated."""
        same = datetime.now(timezone.utc)
        made = [
            await _entry(test_user.id, test_team.id, f"e{i}", updated_at=same)
            for i in range(5)
        ]
        seen, cursor, pages = [], None, 0
        while True:
            body = await _sync(client, auth_headers, since=cursor, limit=2)
            seen += [e["id"] for e in body["entries"]]
            cursor = body["next_cursor"]
            pages += 1
            if not body["has_more"]:
                break
        assert pages == 3
        assert seen == sorted(e.id for e in made)

    async def test_left_team_is_absent_from_team_ids_and_entries(
        self, client, db, test_team, test_user, auth_headers,
    ):
        other = await OxydeTeam.objects.create(name="Other", key="OTHR")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user.id, role=TeamRole.MEMBER)
        keep = await _entry(test_user.id, test_team.id, "keep")
        lost = await _entry(test_user.id, other.id, "lost")
        body = await _sync(client, auth_headers)
        assert {e["id"] for e in body["entries"]} == {keep.id, lost.id}
        assert body["team_ids"] == sorted([test_team.id, other.id])

        await OxydeTeamMember.objects.filter(team_id=other.id, user_id=test_user.id).delete()
        body = await _sync(client, auth_headers, since=body["next_cursor"])
        assert body["team_ids"] == [test_team.id]
        await InboxService().mark_read(lost)
        body = await _sync(client, auth_headers)
        assert [e["id"] for e in body["entries"]] == [keep.id]

    async def test_only_own_entries(self, client, db, test_team, test_user2, auth_headers):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        await _entry(test_user2.id, test_team.id, "theirs")
        assert (await _sync(client, auth_headers))["entries"] == []

    async def test_bad_cursor_is_400(self, client, db, auth_headers):
        resp = await client.get("/api/inbox/sync", params={"since": "garbage"}, headers=auth_headers)
        assert resp.status_code == 400
        assert resp.json()["detail"]["error_code"] == "invalid_cursor"

    @pytest.mark.parametrize("limit", [0, 501])
    async def test_limit_bounds(self, client, db, auth_headers, limit):
        resp = await client.get("/api/inbox/sync", params={"limit": limit}, headers=auth_headers)
        assert resp.status_code == 422

    async def test_requires_auth(self, client, db):
        resp = await client.get("/api/inbox/sync")
        assert resp.status_code == 401


@pytest.mark.asyncio
class TestActions:
    async def test_plain_entry_offers_read_and_archive(
        self, client, db, test_team, test_user, auth_headers,
    ):
        e = await _entry(test_user.id, test_team.id)
        body = await _sync(client, auth_headers)
        assert body["entries"][0]["actions"] == [
            {"kind": "mark_read", "method": "POST", "path": f"/api/inbox/{e.id}/read", "note": "none"},
            {"kind": "archive", "method": "POST", "path": f"/api/inbox/{e.id}/archive", "note": "none"},
        ]
        await InboxService().mark_read(e)
        listed = (await client.get("/api/inbox", headers=auth_headers)).json()
        assert [a["kind"] for a in listed[0]["actions"]] == ["archive"]

    async def test_gate_entry_approve_action_completes_the_gate(
        self, client, db, test_issue, test_user, auth_headers, gate_claim_ritual,
    ):
        await _claim_gate(test_issue, test_user.id)
        body = await _sync(client, auth_headers)
        [entry] = body["entries"]
        actions = _by_kind(entry)
        assert set(actions) == {"approve", "reject", "mark_read", "archive"}
        approve = actions["approve"]
        assert approve == {
            "kind": "approve", "method": "POST", "note": "optional",
            "path": f"/api/rituals/{gate_claim_ritual.id}/complete-issue/{test_issue.id}",
        }
        assert actions["reject"]["note"] == "required"

        resp = await client.post(approve["path"], json={"note": "lgtm"}, headers=auth_headers)
        assert resp.status_code == 200, resp.text

        later = await _sync(client, auth_headers, since=body["next_cursor"])
        [tomb] = later["entries"]
        assert tomb["id"] == entry["id"]
        assert tomb["state"] == "resolved"
        assert tomb["resolved_at"] is not None
        assert tomb["actions"] == []

    async def test_gate_entry_reject_action_resolves_the_rejecters_entry(
        self, client, db, test_issue, test_user, auth_headers, gate_claim_ritual,
    ):
        await _claim_gate(test_issue, test_user.id)
        body = await _sync(client, auth_headers)
        reject = _by_kind(body["entries"][0])["reject"]
        assert reject["path"] == f"/api/rituals/{gate_claim_ritual.id}/reject-issue/{test_issue.id}"

        resp = await client.post(reject["path"], json={"note": "not yet"}, headers=auth_headers)
        assert resp.status_code == 200, resp.text
        later = await _sync(client, auth_headers, since=body["next_cursor"])
        states = {e["id"]: e["state"] for e in later["entries"]}
        assert states[body["entries"][0]["id"]] == "resolved"

    async def test_review_entry_approve_action_approves(
        self, client, db, test_issue, test_user, auth_headers, review_close_ritual,
    ):
        await _close_review(test_issue, test_user.id, review_close_ritual)
        body = await _sync(client, auth_headers)
        [entry] = body["entries"]
        assert entry["kind"] == "review_requested"
        approve = _by_kind(entry)["approve"]
        assert approve["path"] == f"/api/rituals/{review_close_ritual.id}/approve-issue/{test_issue.id}"
        assert approve["note"] == "none"

        resp = await client.post(approve["path"], headers=auth_headers)
        assert resp.status_code == 200, resp.text
        later = await _sync(client, auth_headers, since=body["next_cursor"])
        assert [e["state"] for e in later["entries"]] == ["resolved"]

    async def test_no_decide_actions_once_admin_role_is_lost(
        self, client, db, test_team, test_issue, test_user, auth_headers, gate_claim_ritual,
    ):
        await _claim_gate(test_issue, test_user.id)
        await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=test_user.id).update(
            role=TeamRole.MEMBER,
        )
        [entry] = (await _sync(client, auth_headers))["entries"]
        assert set(_by_kind(entry)) == {"mark_read", "archive"}

    async def test_no_decide_actions_for_an_agent(
        self, client, db, test_team, test_issue, gate_claim_ritual,
    ):
        """An agent recipient never gets approve/reject: the endpoints
        refuse agents, so offering the call would only fail."""
        from app.oxyde_models.user import OxydeUser
        from app.utils.security import create_access_token

        agent = await OxydeUser.objects.create(
            email="syncagent@agent.local", hashed_password="", name="SyncAgent",
            is_agent=True, agent_team_id=test_team.id,
        )
        await _entry(
            agent.id, test_team.id, kind=InboxEntryKind.GATE_PENDING,
            ritual_id=gate_claim_ritual.id, issue_id=test_issue.id,
        )
        headers = {"Authorization": f"Bearer {create_access_token(data={'sub': agent.id})}"}
        [entry] = (await _sync(client, headers))["entries"]
        assert set(_by_kind(entry)) == {"mark_read", "archive"}

    async def test_entry_without_ritual_gets_no_decide_actions(
        self, client, db, test_team, test_user, auth_headers,
    ):
        await _entry(test_user.id, test_team.id, kind=InboxEntryKind.GATE_PENDING)
        [entry] = (await _sync(client, auth_headers))["entries"]
        assert set(_by_kind(entry)) == {"mark_read", "archive"}

    async def test_mark_read_and_archive_responses_carry_state(
        self, client, db, test_team, test_user, auth_headers,
    ):
        e = await _entry(test_user.id, test_team.id)
        read = (await client.post(f"/api/inbox/{e.id}/read", headers=auth_headers)).json()
        assert read["state"] == "open" and [a["kind"] for a in read["actions"]] == ["archive"]
        archived = (await client.post(f"/api/inbox/{e.id}/archive", headers=auth_headers)).json()
        assert archived["state"] == "archived" and archived["actions"] == []
