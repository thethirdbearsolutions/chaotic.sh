"""Inbox sync for an offline client (CHT-1607): the (updated_at, id)
cursor, tombstones for archived and resolved entries, and the one-call
actions an entry carries."""
from datetime import datetime, timedelta, timezone

import pytest

from app.api import deps
from app.api import inbox as inbox_api
from app.auth.credentials import CredentialKind, Principal
from app.enums import InboxEntryKind, IssueStatus, TeamRole
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.schemas.issue import IssueUpdate
from app.services.inbox_service import InboxService
from app.services.issue_service import ClaimRitualsError, IssueService, TicketRitualsError
from app.services.ritual_service import RitualService
from app.utils.sync_cursor import InvalidCursorError, SyncPosition, decode_cursor, encode_cursor, teams_digest


@pytest.fixture(autouse=True)
def no_lag(monkeypatch):
    """Most tests are about what the cursor covers, not how far it trails
    the clock; TestSafetyLag sets the lag back."""
    monkeypatch.setattr(inbox_api, "SYNC_SAFETY_LAG", timedelta(0))


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
        assert decode_cursor(encode_cursor(at, "abc")) == SyncPosition(at, "abc", None)
        assert decode_cursor(encode_cursor(at, "abc", teams=["b", "a"])).teams_digest == teams_digest({"a", "b"})

    def test_naive_datetime_is_utc(self):
        at = datetime(2026, 10, 13, 12, 0, 0)
        assert decode_cursor(encode_cursor(at, "abc"))[0] == at.replace(tzinfo=timezone.utc)

    def test_other_timezone_normalised(self):
        at = datetime(2026, 10, 13, 14, 0, tzinfo=timezone(timedelta(hours=2)))
        decoded = decode_cursor(encode_cursor(at, "abc")).updated_at
        assert decoded == at and decoded.tzinfo == timezone.utc

    @pytest.mark.parametrize("bad", [
        "", "!!!", "bm90IGpzb24", "W10",  # not base64, not json, a json list
        "eyJ2IjoyLCJ0IjoiMjAyNi0xMC0xM1QxMjowMDowMCswMDowMCIsImlkIjoiYSJ9",  # v=2
        "eyJ2IjoxLCJ0IjoiMjAyNi0xMC0xM1QxMjowMDowMCIsImlkIjoiYSJ9",  # naive t
        "eyJ2IjoxLCJ0Ijoibm9wZSIsImlkIjoiYSJ9",  # bad t
        "eyJ2IjoxLCJ0IjoiMjAyNi0xMC0xM1QxMjowMDowMCswMDowMCIsImlkIjoxfQ",  # id not str
        "eyJ2IjoxfQ",  # missing keys
        "eyJ2IjoxLCJ0IjoiMjAyNi0xMC0xM1QxMjowMDowMCswMDowMCIsImlkIjoiYSIsInRnIjoxfQ",  # team digest not a string
    ])
    def test_rejects_garbage(self, bad):
        with pytest.raises(InvalidCursorError):
            decode_cursor(bad)


@pytest.mark.asyncio
class TestUpdatedAt:
    async def test_every_writer_bumps_updated_at(self, db, test_team, test_user):
        service = InboxService()
        old = datetime.now(timezone.utc) - timedelta(hours=1)
        a = await _entry(test_user.id, test_team.id, "a", created_at=old, updated_at=old)
        b = await _entry(test_user.id, test_team.id, "b", created_at=old, updated_at=old)
        c = await _entry(test_user.id, test_team.id, "c", created_at=old, updated_at=old)

        read = await service.mark_read(a)
        assert read.updated_at > old and read.updated_at == read.read_at
        archived = await service.archive(b)
        assert archived.updated_at > old and archived.updated_at == archived.archived_at
        await service.mark_all_read(test_user.id)
        c2 = await OxydeInboxEntry.objects.get(id=c.id)
        assert c2.read_at is not None and c2.updated_at == c2.read_at

    async def test_no_writer_leaves_updated_at_behind_created_at(
        self, db, test_project, test_issue, test_user, gate_close_ritual,
    ):
        """The column's 1970 db_default exists only for migration 0027; a
        row that kept it would sort before every cursor and never sync."""
        await InboxService().notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project, requested_by_name="A",
        )
        await _entry(test_user.id, test_project.team_id)
        rows = await OxydeInboxEntry.objects.all()
        assert rows and all(r.updated_at >= r.created_at for r in rows)

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
            (await OxydeInboxEntry.objects.get(id=a.id)).updated_at, a.id, teams=[test_team.id],
        )

    async def test_empty_first_sync_has_no_cursor(self, client, db, test_team, auth_headers):
        body = await _sync(client, auth_headers)
        assert body == {
            "entries": [], "next_cursor": None, "has_more": False, "retry_after": None, "reset": False,
            "team_ids": [test_team.id],
        }

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
        assert [a["kind"] for a in tomb["actions"]] == ["archive"]

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


# ---------------------------------------------------------------------------
# PR #355 review findings
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
class TestResolveIsOneVisibleChange:
    async def test_a_sync_between_the_two_statements_misses_nothing(
        self, client, db, test_project, test_issue, test_user, auth_headers, gate_close_ritual,
    ):
        """Finding 1: an already-read entry and an unread one for the same
        gate. A sync between _resolve's two statements sees no change, and
        the next one sees both tombstones."""
        service = InboxService()
        fields = dict(kind=InboxEntryKind.GATE_PENDING, ritual_id=gate_close_ritual.id, issue_id=test_issue.id)
        read = await service.mark_read(await _entry(test_user.id, test_project.team_id, "read", **fields))
        unread = await _entry(test_user.id, test_project.team_id, "unread", **fields)
        cursor = (await _sync(client, auth_headers))["next_cursor"]

        filters = dict(
            ritual_id=gate_close_ritual.id, issue_id=test_issue.id,
            kind__in=[InboxEntryKind.GATE_PENDING.name],
        )
        assert await service._mark_read_for_resolve(filters) == 1
        between = await _sync(client, auth_headers, since=cursor)
        assert between["entries"] == [] and between["next_cursor"] == cursor

        assert await service._resolve(filters) == 0  # step one already ran
        after = await _sync(client, auth_headers, since=cursor)
        assert {e["id"]: e["state"] for e in after["entries"]} == {read.id: "resolved", unread.id: "resolved"}
        rows = await OxydeInboxEntry.objects.filter(issue_id=test_issue.id).all()
        assert len({r.updated_at for r in rows}) == 1


@pytest.mark.asyncio
class TestSafetyLag:
    @pytest.fixture(autouse=True)
    def lag(self, monkeypatch):
        monkeypatch.setattr(inbox_api, "SYNC_SAFETY_LAG", timedelta(seconds=5))

    async def test_cursor_trails_now_and_recent_rows_come_again(
        self, client, db, test_team, test_user, auth_headers,
    ):
        e = await _entry(test_user.id, test_team.id)
        first = await _sync(client, auth_headers)
        assert [x["id"] for x in first["entries"]] == [e.id]
        pos = decode_cursor(first["next_cursor"])
        assert pos.updated_at <= datetime.now(timezone.utc) - timedelta(seconds=5)
        assert pos.updated_at < e.updated_at
        assert 1 <= first["retry_after"] <= 5
        again = await _sync(client, auth_headers, since=first["next_cursor"])
        assert [x["id"] for x in again["entries"]] == [e.id]  # repeated, upserted

    async def test_a_row_committed_late_with_an_older_stamp_is_not_skipped(
        self, client, db, test_team, test_user, auth_headers,
    ):
        """CHT-1622: B is seen first; A, stamped a second before B but
        committed after the sync, still comes on the next sync."""
        now = datetime.now(timezone.utc)
        b = await _entry(test_user.id, test_team.id, "b", updated_at=now)
        cursor = (await _sync(client, auth_headers))["next_cursor"]
        a = await _entry(test_user.id, test_team.id, "a", updated_at=now - timedelta(seconds=1))
        later = await _sync(client, auth_headers, since=cursor)
        assert {x["id"] for x in later["entries"]} == {a.id, b.id}

    async def test_old_rows_advance_the_cursor_to_the_last_row(
        self, client, db, test_team, test_user, auth_headers,
    ):
        old = datetime.now(timezone.utc) - timedelta(minutes=5)
        e = await _entry(test_user.id, test_team.id, updated_at=old)
        body = await _sync(client, auth_headers)
        pos = decode_cursor(body["next_cursor"])
        assert (pos.updated_at, pos.id) == (old, e.id)
        assert body["retry_after"] is None

    async def test_lag_ends_paging_instead_of_spinning(
        self, client, db, test_team, test_user, auth_headers,
    ):
        for i in range(3):
            await _entry(test_user.id, test_team.id, f"e{i}")
        body = await _sync(client, auth_headers, limit=1)
        assert len(body["entries"]) == 1 and body["has_more"] is False
        assert body["retry_after"] >= 1

    async def test_a_cursor_ahead_of_the_watermark_does_not_move_back(
        self, client, db, test_team, test_user, auth_headers,
    ):
        ahead = datetime.now(timezone.utc) + timedelta(minutes=1)
        cursor = encode_cursor(ahead, "zzz", teams=[test_team.id])
        body = await _sync(client, auth_headers, since=cursor)
        assert body["entries"] == [] and body["next_cursor"] == cursor
        assert body["retry_after"] is None  # nothing sent, nothing to wait for


@pytest.mark.asyncio
class TestTeamScopeGrows:
    async def test_rejoining_a_team_resets_and_resends_its_entries(
        self, client, db, test_team, test_user, auth_headers,
    ):
        """Finding 3, reproduced: leave, drop, rejoin. The entry is behind
        the cursor; the server restarts the sync and says so."""
        other = await OxydeTeam.objects.create(name="Other", key="OTHR")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user.id, role=TeamRole.MEMBER)
        home = await _entry(test_user.id, test_team.id, "home")
        kept = await _entry(test_user.id, other.id, "in other")
        first = await _sync(client, auth_headers)
        assert first["reset"] is False

        await OxydeTeamMember.objects.filter(team_id=other.id, user_id=test_user.id).delete()
        left = await _sync(client, auth_headers, since=first["next_cursor"])
        # The team set changed, so this resets too (one full sync).
        assert left["team_ids"] == [test_team.id] and left["reset"] is True
        assert [e["id"] for e in left["entries"]] == [home.id]

        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user.id, role=TeamRole.MEMBER)
        back = await _sync(client, auth_headers, since=left["next_cursor"])
        assert back["reset"] is True
        assert [e["id"] for e in back["entries"]] == [home.id, kept.id]
        assert decode_cursor(back["next_cursor"]).teams_digest == teams_digest({test_team.id, other.id})

        steady = await _sync(client, auth_headers, since=back["next_cursor"])
        assert steady["reset"] is False and steady["entries"] == []

    async def test_many_teams_keep_the_cursor_short_and_a_new_one_resets(
        self, client, db, test_team, test_user, auth_headers,
    ):
        """R4: the cursor carries a digest, not the list."""
        for i in range(60):
            team = await OxydeTeam.objects.create(name=f"T{i}", key=f"TM{i:02d}")
            await OxydeTeamMember.objects.create(team_id=team.id, user_id=test_user.id, role=TeamRole.MEMBER)
        await _entry(test_user.id, test_team.id)
        body = await _sync(client, auth_headers)
        assert len(body["team_ids"]) == 61
        assert len(body["next_cursor"]) < 200
        steady = await _sync(client, auth_headers, since=body["next_cursor"])
        assert steady["reset"] is False

        newer = await OxydeTeam.objects.create(name="New", key="NEWT")
        await OxydeTeamMember.objects.create(team_id=newer.id, user_id=test_user.id, role=TeamRole.MEMBER)
        joined = await _sync(client, auth_headers, since=steady["next_cursor"])
        assert joined["reset"] is True and len(joined["team_ids"]) == 62

    async def test_a_cursor_without_teams_resets(self, client, db, test_team, test_user, auth_headers):
        e = await _entry(test_user.id, test_team.id)
        cursor = encode_cursor(datetime.now(timezone.utc) + timedelta(minutes=1), "z")
        body = await _sync(client, auth_headers, since=cursor)
        assert body["reset"] is True and [x["id"] for x in body["entries"]] == [e.id]


@pytest.mark.asyncio
class TestReferentsGoAway:
    async def _gate(self, client, auth_headers, test_issue, test_user):
        await _claim_gate(test_issue, test_user.id)
        body = await _sync(client, auth_headers)
        [entry] = body["entries"]
        return entry, body["next_cursor"]

    async def test_deleting_the_issue_sends_a_tombstone(
        self, client, db, test_issue, test_user, auth_headers, gate_claim_ritual,
    ):
        entry, cursor = await self._gate(client, auth_headers, test_issue, test_user)
        await IssueService().delete(test_issue, actor_id=None)
        later = await _sync(client, auth_headers, since=cursor)
        assert [(e["id"], e["state"]) for e in later["entries"]] == [(entry["id"], "resolved")]

    async def test_deleting_the_ritual_sends_a_tombstone(
        self, client, db, test_issue, test_user, auth_headers, gate_claim_ritual,
    ):
        entry, cursor = await self._gate(client, auth_headers, test_issue, test_user)
        await RitualService().delete(gate_claim_ritual, deleted_by_id=test_user.id)
        later = await _sync(client, auth_headers, since=cursor)
        assert [(e["id"], e["state"]) for e in later["entries"]] == [(entry["id"], "resolved")]

    async def test_deactivating_the_ritual_sends_a_tombstone(
        self, client, db, test_issue, test_user, auth_headers, gate_claim_ritual,
    ):
        from app.schemas.ritual import RitualUpdate

        entry, cursor = await self._gate(client, auth_headers, test_issue, test_user)
        await RitualService().update(gate_claim_ritual, RitualUpdate(is_active=False))
        later = await _sync(client, auth_headers, since=cursor)
        assert [(e["id"], e["state"]) for e in later["entries"]] == [(entry["id"], "resolved")]

    async def _to_auto(self, client, auth_headers, ritual, entry_id, cursor):
        """CHT-1626: an AUTO ritual waits on nobody; its approve/reject
        actions would answer 400."""
        from app.enums import ApprovalMode
        from app.schemas.ritual import RitualUpdate

        await RitualService().update(ritual, RitualUpdate(approval_mode=ApprovalMode.AUTO))
        later = await _sync(client, auth_headers, since=cursor)
        assert [(e["id"], e["state"]) for e in later["entries"]] == [(entry_id, "resolved")]

    async def test_gate_ritual_turning_auto_sends_a_tombstone(
        self, client, db, test_issue, test_user, auth_headers, gate_claim_ritual,
    ):
        entry, cursor = await self._gate(client, auth_headers, test_issue, test_user)
        await self._to_auto(client, auth_headers, gate_claim_ritual, entry["id"], cursor)

    async def test_review_ritual_turning_auto_sends_a_tombstone(
        self, client, db, test_issue, test_user, auth_headers, review_close_ritual,
    ):
        await _close_review(test_issue, test_user.id, review_close_ritual)
        body = await _sync(client, auth_headers)
        [entry] = [e for e in body["entries"] if e["kind"] == "review_requested"]
        await self._to_auto(client, auth_headers, review_close_ritual, entry["id"], body["next_cursor"])

    async def _switch(self, ritual, mode):
        from app.schemas.ritual import RitualUpdate

        await RitualService().update(ritual, RitualUpdate(approval_mode=mode))

    async def test_review_turning_gate_carries_the_request_and_the_gate_completes(
        self, client, db, test_issue, test_user, auth_headers, review_close_ritual,
    ):
        """Review finding 1: the issue still waits on a human, so the
        request moves to a gate_pending entry, and completing that gate
        approves the attestation made in REVIEW mode."""
        from app.enums import ApprovalMode
        from app.oxyde_models.issue import OxydeIssue
        from app.oxyde_models.ritual import OxydeRitualAttestation

        await _close_review(test_issue, test_user.id, review_close_ritual)
        body = await _sync(client, auth_headers)
        [review] = [e for e in body["entries"] if e["kind"] == "review_requested"]

        await self._switch(review_close_ritual, ApprovalMode.GATE)
        later = await _sync(client, auth_headers, since=body["next_cursor"])
        states = {(e["id"], e["kind"]): e["state"] for e in later["entries"]}
        assert states.pop((review["id"], "review_requested")) == "resolved"
        [((gate_id, kind), state)] = states.items()
        assert (kind, state) == ("gate_pending", "open")

        [gate] = [e for e in later["entries"] if e["id"] == gate_id]
        resp = await client.post(_by_kind(gate)["approve"]["path"], json={"note": "ok"}, headers=auth_headers)
        assert resp.status_code == 200, resp.text
        attestation = await OxydeRitualAttestation.objects.get(
            ritual_id=review_close_ritual.id, issue_id=test_issue.id,
        )
        assert attestation.approved_at is not None and attestation.approved_by == test_user.id
        assert (await OxydeIssue.objects.get(id=test_issue.id)).status == IssueStatus.DONE
        assert (await OxydeInboxEntry.objects.get(id=gate_id)).resolved_at is not None

    async def _review_turned_gate(self, test_issue, test_user, ritual):
        from app.enums import ApprovalMode

        await _close_review(test_issue, test_user.id, ritual)
        await self._switch(ritual, ApprovalMode.GATE)
        return await RitualService().get_by_id(ritual.id)

    async def test_completing_a_carried_gate_records_the_completers_note(
        self, client, db, test_issue, test_user, auth_headers, review_close_ritual,
    ):
        """Re-review N1: the completion is the completer's, not the
        attestation left from REVIEW mode approved in their name."""
        from app.oxyde_models.ritual import OxydeRitualAttestation

        ritual = await self._review_turned_gate(test_issue, test_user, review_close_ritual)
        resp = await client.post(
            f"/api/rituals/{ritual.id}/complete-issue/{test_issue.id}",
            json={"note": "I checked it myself"}, headers=auth_headers,
        )
        assert resp.status_code == 200, resp.text
        [attestation] = await OxydeRitualAttestation.objects.filter(
            ritual_id=ritual.id, issue_id=test_issue.id,
        ).all()
        assert attestation.note == "I checked it myself"
        assert attestation.attested_by == attestation.approved_by == test_user.id
        assert attestation.attested_at == attestation.approved_at

    async def test_a_rejected_carried_attestation_is_never_approved(
        self, client, db, test_issue, test_user, auth_headers, review_close_ritual,
    ):
        """Re-review N1: REVIEW->GATE, reject, complete. The reject deletes
        the attestation (copied onto the rejection, as a REVIEW reject
        does), and the completion is the admin's own."""
        from app.oxyde_models.ritual import OxydeRitualAttestation, OxydeRitualRejection

        ritual = await self._review_turned_gate(test_issue, test_user, review_close_ritual)
        await RitualService().reject_for_issue(ritual, test_issue.id, test_user.id, "evidence is wrong")
        assert await OxydeRitualAttestation.objects.filter(ritual_id=ritual.id, issue_id=test_issue.id).count() == 0
        [rejection] = await OxydeRitualRejection.objects.filter(ritual_id=ritual.id, issue_id=test_issue.id).all()
        assert rejection.attestation_note == "done"

        await RitualService().complete_gate_ritual_for_issue(ritual, test_issue.id, test_user.id, note="I checked")
        [attestation] = await OxydeRitualAttestation.objects.filter(
            ritual_id=ritual.id, issue_id=test_issue.id,
        ).all()
        assert attestation.note == "I checked" and attestation.approved_at is not None

    async def test_a_reject_racing_a_carried_completion_lets_the_completion_through(
        self, db, test_issue, test_user, review_close_ritual, monkeypatch,
    ):
        """Re-review 2, R1: a reject deletes the carried attestation
        between complete's read and its compare-and-set. The completion
        is then a fresh one (no 500), and supersedes the rejection."""
        from app.oxyde_models.ritual import OxydeRitualAttestation, OxydeRitualRejection

        ritual = await self._review_turned_gate(test_issue, test_user, review_close_ritual)
        service = RitualService()
        real = RitualService.get_issue_attestation
        calls = []

        async def read_then_reject(self, ritual_id, issue_id):
            row = await real(self, ritual_id, issue_id)
            calls.append(row)
            if len(calls) == 1:
                await real_reject(ritual, issue_id, test_user.id, "evidence is wrong")
            return row

        real_reject = service.reject_for_issue
        monkeypatch.setattr(RitualService, "get_issue_attestation", read_then_reject)
        attestation = await service.complete_gate_ritual_for_issue(
            ritual, test_issue.id, test_user.id, note="mine",
        )
        assert attestation is not None and attestation.note == "mine" and attestation.approved_at is not None
        assert await OxydeRitualAttestation.objects.filter(ritual_id=ritual.id, issue_id=test_issue.id).count() == 1
        [rejection] = await OxydeRitualRejection.objects.filter(ritual_id=ritual.id, issue_id=test_issue.id).all()
        assert rejection.superseded_at is not None

    async def test_a_carried_gate_rejection_goes_to_the_requester(
        self, db, test_team, test_issue, test_user, test_user2, review_close_ritual,
    ):
        """Re-review 2, R2: a human attested in REVIEW mode, someone
        else asked to close; the rejection is addressed to who asked."""
        from app.enums import ApprovalMode
        from app.oxyde_models.ritual import OxydeRitualRejection

        await RitualService().attest_for_issue(
            ritual=review_close_ritual, issue_id=test_issue.id, user_id=test_user2.id, note="done",
        )
        with pytest.raises(TicketRitualsError):
            await IssueService().update(
                test_issue, IssueUpdate(status=IssueStatus.DONE), user_id=test_user.id, is_human_request=False,
            )
        await self._switch(review_close_ritual, ApprovalMode.GATE)
        ritual = await RitualService().get_by_id(review_close_ritual.id)
        await RitualService().reject_for_issue(ritual, test_issue.id, test_user.id, "no")
        [rejection] = await OxydeRitualRejection.objects.filter(ritual_id=ritual.id, issue_id=test_issue.id).all()
        assert (rejection.attested_by_id, rejection.attestation_note) == (test_user.id, "done")

    async def test_a_plain_gate_completion_keeps_the_note(
        self, client, db, test_issue, test_user, auth_headers, gate_claim_ritual,
    ):
        from app.oxyde_models.ritual import OxydeRitualAttestation

        await _claim_gate(test_issue, test_user.id)
        await RitualService().complete_gate_ritual_for_issue(
            gate_claim_ritual, test_issue.id, test_user.id, note="looked at it",
        )
        attestation = await OxydeRitualAttestation.objects.get(ritual_id=gate_claim_ritual.id, issue_id=test_issue.id)
        assert (attestation.note, attestation.approved_by) == ("looked at it", test_user.id)

    async def test_a_carried_review_request_is_not_pushed_to_the_attester(
        self, db, test_issue, test_user, review_close_ritual, monkeypatch,
    ):
        """Re-review N2: as at attest time, the attester causes it."""
        from app.enums import ApprovalMode

        ritual = await self._review_turned_gate(test_issue, test_user, review_close_ritual)
        pushed = []

        async def capture(self, entries, actor_id=None):
            pushed.append(([e.kind for e in entries], actor_id))
        monkeypatch.setattr(InboxService, "_push", capture)
        await self._switch(ritual, ApprovalMode.REVIEW)
        assert pushed == [([InboxEntryKind.REVIEW_REQUESTED], test_user.id)]

    async def test_the_carry_commits_with_the_mode_change(
        self, db, test_issue, test_user, gate_claim_ritual, monkeypatch,
    ):
        """Re-review N3: inside the change's transaction, so a failed
        carry leaves the mode as it was."""
        from app.enums import ApprovalMode
        from app.oxyde_models.ritual import OxydeRitual

        await _claim_gate(test_issue, test_user.id)

        async def broken(self, ritual_id, keep):
            raise RuntimeError("inbox down")
        monkeypatch.setattr(InboxService, "settle_decisions_except", broken)
        with pytest.raises(RuntimeError, match="inbox down"):
            await self._switch(gate_claim_ritual, ApprovalMode.AUTO)
        assert (await OxydeRitual.objects.get(id=gate_claim_ritual.id)).approval_mode == ApprovalMode.GATE

    async def test_gate_turning_review_waits_for_the_attestation(
        self, client, db, test_issue, test_user, auth_headers, gate_claim_ritual,
    ):
        """GATE to REVIEW: nobody has attested, so nothing waits on a
        human until someone does; then the review request is written."""
        from app.enums import ApprovalMode

        entry, cursor = await self._gate(client, auth_headers, test_issue, test_user)
        await self._switch(gate_claim_ritual, ApprovalMode.REVIEW)
        later = await _sync(client, auth_headers, since=cursor)
        assert [(e["id"], e["state"]) for e in later["entries"]] == [(entry["id"], "resolved")]

        await RitualService().attest_for_issue(
            ritual=await RitualService().get_by_id(gate_claim_ritual.id),
            issue_id=test_issue.id, user_id=test_user.id, note="done",
        )
        asked = await _sync(client, auth_headers, since=later["next_cursor"])
        assert [(e["kind"], e["state"]) for e in asked["entries"]] == [("review_requested", "open")]

    async def test_a_mode_change_leaves_rejections_open(
        self, client, db, test_team, test_issue, test_user, auth_headers, gate_claim_ritual,
    ):
        """Review finding 2: the rejection still stands, and the
        requester still has to answer it."""
        from app.enums import ApprovalMode

        rejected = await _entry(
            test_user.id, test_team.id, kind=InboxEntryKind.GATE_REJECTED,
            ritual_id=gate_claim_ritual.id, issue_id=test_issue.id,
        )
        await self._switch(gate_claim_ritual, ApprovalMode.AUTO)
        assert (await OxydeInboxEntry.objects.get(id=rejected.id)).resolved_at is None

    async def test_project_delete_settles_across_chunks(
        self, client, db, test_team, test_project, test_issue, test_user, auth_headers, monkeypatch,
    ):
        """Review finding 8: more issues than one IN (...) list holds."""
        from app.oxyde_models.issue import OxydeIssue
        from app.oxyde_models.project import OxydeProject
        from app.services.project_service import ProjectService

        monkeypatch.setattr(InboxService, "_RESOLVE_CHUNK", 1)
        other = await OxydeIssue.objects.create(
            project_id=test_project.id, identifier=f"{test_project.key}-99", number=99,
            title="other", creator_id=test_user.id,
        )
        entries = [
            await _entry(test_user.id, test_team.id, issue_id=issue_id) for issue_id in (test_issue.id, other.id)
        ]
        await ProjectService().delete(await OxydeProject.objects.get(id=test_project.id))
        for e in entries:
            assert (await OxydeInboxEntry.objects.get(id=e.id)).resolved_at is not None

    async def test_other_ritual_edits_leave_the_entry_open(
        self, client, db, test_issue, test_user, auth_headers, gate_claim_ritual,
    ):
        from app.enums import ApprovalMode
        from app.schemas.ritual import RitualUpdate

        entry, cursor = await self._gate(client, auth_headers, test_issue, test_user)
        await RitualService().update(
            gate_claim_ritual, RitualUpdate(prompt="reworded", approval_mode=ApprovalMode.GATE),
        )
        assert (await _sync(client, auth_headers, since=cursor))["entries"] == []
        row = await OxydeInboxEntry.objects.get(id=entry["id"])
        assert row.resolved_at is None

    async def test_deleting_the_project_sends_tombstones(
        self, client, db, test_team, test_project, test_issue, test_user, auth_headers, gate_claim_ritual,
        monkeypatch,
    ):
        """CHT-1626: the issues go by database cascade, past
        IssueService.delete; their entries and the documents' are settled,
        and a withdrawal is pushed for each once the delete commits."""
        from app.oxyde_models.document import OxydeDocument
        from app.oxyde_models.project import OxydeProject
        from app.services import push_sender
        from app.services.project_service import ProjectService

        flushed = []

        async def capture(items):
            flushed.append(sorted(i[0] for i in items))
        monkeypatch.setattr(push_sender, "_flush_resolved", capture)

        gate, _ = await self._gate(client, auth_headers, test_issue, test_user)
        doc = await OxydeDocument.objects.create(
            team_id=test_team.id, project_id=test_project.id, title="D", content="", author_id=test_user.id,
        )
        on_doc = await _entry(test_user.id, test_team.id, document_id=doc.id, project_id=test_project.id)
        elsewhere = await _entry(test_user.id, test_team.id, issue_id="another-projects-issue")
        cursor = (await _sync(client, auth_headers))["next_cursor"]

        await ProjectService().delete(await OxydeProject.objects.get(id=test_project.id))

        later = await _sync(client, auth_headers, since=cursor)
        assert sorted((e["id"], e["state"]) for e in later["entries"]) == sorted(
            [(gate["id"], "resolved"), (on_doc.id, "resolved")]
        )
        assert (await OxydeInboxEntry.objects.get(id=elsewhere.id)).resolved_at is None
        assert flushed == [sorted([gate["id"], on_doc.id])]

    async def test_resolving_inside_a_rolled_back_delete_pushes_nothing(
        self, client, db, test_project, test_issue, test_user, auth_headers, gate_claim_ritual, monkeypatch,
    ):
        from app.db.transactions import atomic
        from app.services import push_sender

        flushed = []

        async def capture(items):
            flushed.append(items)
        monkeypatch.setattr(push_sender, "_flush_resolved", capture)
        gate, _ = await self._gate(client, auth_headers, test_issue, test_user)
        with pytest.raises(RuntimeError):
            async with atomic():
                await InboxService().resolve_for_project(test_project.id)
                raise RuntimeError("the delete failed")
        assert flushed == []
        assert (await OxydeInboxEntry.objects.get(id=gate["id"])).resolved_at is None

    async def test_force_clearing_the_ticket_sends_a_tombstone(
        self, client, db, test_issue, test_user, auth_headers, gate_claim_ritual,
    ):
        entry, cursor = await self._gate(client, auth_headers, test_issue, test_user)
        resp = await client.post(
            "/api/rituals/force-clear-ticket-limbo", params={"issue_id": test_issue.id}, headers=auth_headers,
        )
        assert resp.status_code == 200, resp.text
        later = await _sync(client, auth_headers, since=cursor)
        assert [(e["id"], e["state"]) for e in later["entries"]] == [(entry["id"], "resolved")]

    async def test_deleting_a_document_sends_a_tombstone_and_a_rename_resends(
        self, client, db, test_team, test_project, test_user, auth_headers,
    ):
        from app.oxyde_models.document import OxydeDocument
        from app.schemas.document import DocumentUpdate
        from app.services.document_service import DocumentService

        doc = await OxydeDocument.objects.create(
            team_id=test_team.id, project_id=test_project.id, title="Old", content="", author_id=test_user.id,
        )
        e = await _entry(test_user.id, test_team.id, document_id=doc.id)
        cursor = (await _sync(client, auth_headers))["next_cursor"]

        await DocumentService().update(doc, DocumentUpdate(title="New"), test_user.id)
        renamed = await _sync(client, auth_headers, since=cursor)
        assert [(x["id"], x["document_title"], x["state"]) for x in renamed["entries"]] == [(e.id, "New", "open")]

        await DocumentService().delete(await OxydeDocument.objects.get(id=doc.id), test_user.id)
        gone = await _sync(client, auth_headers, since=renamed["next_cursor"])
        assert [(x["id"], x["state"]) for x in gone["entries"]] == [(e.id, "resolved")]

    async def test_renaming_the_source_user_resends(
        self, client, db, test_team, test_user, test_user2, auth_headers,
    ):
        from app.schemas.user import UserUpdate
        from app.services.user_service import UserService

        e = await _entry(test_user.id, test_team.id, source_user_id=test_user2.id)
        done = await InboxService().archive(await _entry(test_user.id, test_team.id, source_user_id=test_user2.id))
        first = await _sync(client, auth_headers)
        # The archived one sorts after the first page's cursor: drain it.
        cursor = (await _sync(client, auth_headers, since=first["next_cursor"]))["next_cursor"]
        await UserService().update(test_user2, UserUpdate(name="Renamed Person"))
        later = await _sync(client, auth_headers, since=cursor)
        assert [(x["id"], x["source_user_name"]) for x in later["entries"]] == [(e.id, "Renamed Person")]
        assert done.id not in {x["id"] for x in later["entries"]}


@pytest.mark.asyncio
class TestActionsByCredential:
    async def test_read_scoped_credential_gets_no_actions(
        self, client, db, test_issue, test_user, auth_headers, gate_claim_ritual, monkeypatch,
    ):
        """Finding 5: every action is a @writes call."""
        await _claim_gate(test_issue, test_user.id)

        async def resolve(token):
            return Principal(
                user=test_user, holder_user_id=test_user.id, kind=CredentialKind.OAUTH_ACCESS,
                scopes=frozenset({"chaotic:read"}),
            )
        monkeypatch.setattr(deps.rest_resolver, "resolve", resolve)
        [entry] = (await _sync(client, auth_headers))["entries"]
        assert entry["actions"] == []
        listed = (await client.get("/api/inbox", headers=auth_headers)).json()
        assert listed[0]["actions"] == []

    async def test_resolved_entry_offers_archive_only(self, client, db, test_team, test_user, auth_headers):
        """Finding 7: GET /inbox still lists it, so it can be cleared."""
        e = await _entry(test_user.id, test_team.id, kind=InboxEntryKind.GATE_REJECTED, ritual_id="r", issue_id="i")
        await InboxService().resolve_rejected(ritual_id="r", issue_id="i", recipient_user_ids=[test_user.id])
        listed = (await client.get("/api/inbox", headers=auth_headers)).json()
        assert listed[0]["id"] == e.id and listed[0]["state"] == "resolved"
        assert listed[0]["actions"] == [
            {"kind": "archive", "method": "POST", "path": f"/api/inbox/{e.id}/archive", "note": "none"},
        ]
