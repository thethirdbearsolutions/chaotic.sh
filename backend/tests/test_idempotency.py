"""Idempotency-Key on the app's writes (CHT-1621).

A resend of a keyed write (same user, same key, within 24 h) gets the
first answer without the write being done again; the same key for a
different request is a 422; nothing changes without the header. See
app/api/idempotency.py.
"""
import asyncio
import json
from datetime import datetime, timedelta, timezone
from unittest.mock import patch

import pytest
import pytest_asyncio
from fastapi import HTTPException
from httpx import ASGITransport, AsyncClient
from oxyde import execute_raw

from app.api.idempotency import (
    HEADER,
    REPLAYED_HEADER,
    IdempotentRoute,
    _idempotency_scope,
    is_idempotent,
)
from app.db.transactions import atomic
from app.enums import InboxEntryKind, IssueStatus, TeamRole
from app.oxyde_models.idempotency import OxydeIdempotencyRecord
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.issue import OxydeIssue, OxydeIssueComment
from app.oxyde_models.ritual import OxydeRitualAttestation, OxydeRitualRejection
from app.oxyde_models.team import OxydeTeamMember
from app.schemas.issue import IssueUpdate
from app.services.issue_service import IssueService, TicketRitualsError
from app.services.ritual_service import RitualService



def _keyed(headers: dict, key: str) -> dict:
    return {**headers, HEADER: key}


async def _comment(client, headers, issue, content="Looks good", key=None):
    if key is not None:
        headers = _keyed(headers, key)
    return await client.post(f"/api/issues/{issue.id}/comments", json={"content": content}, headers=headers)


async def _comments(issue) -> list:
    return await OxydeIssueComment.objects.filter(issue_id=issue.id).all()


# The routes the Android write queue sends (CHT-1613): inbox actions'
# paths (CHT-1607) and the issue routes.
EXPECTED_ROUTES = {
    ("POST", "/api/inbox/{entry_id}/read"),
    ("POST", "/api/inbox/{entry_id}/archive"),
    ("POST", "/api/rituals/{ritual_id}/complete-issue/{issue_id}"),
    ("POST", "/api/rituals/{ritual_id}/approve-issue/{issue_id}"),
    ("POST", "/api/rituals/{ritual_id}/reject-issue/{issue_id}"),
    ("POST", "/api/issues/{issue_id}/comments"),
    ("PATCH", "/api/issues/{issue_id}"),
}


def _route_contexts():
    """Every route the app serves, with its full path (FastAPI 0.143 keeps
    an included router as one entry in ``app.routes``)."""
    from fastapi.routing import iter_route_contexts

    from app.main import app

    return list(iter_route_contexts(app.routes))


class TestWiring:
    def test_exactly_the_app_write_routes_honour_the_key(self):
        found = set()
        for rc in _route_contexts():
            route = rc.original_route
            if not is_idempotent(getattr(route, "endpoint", None)):
                continue
            assert isinstance(route, IdempotentRoute), rc.path
            scopes = [d for d in route.dependencies if d.dependency is _idempotency_scope]
            assert len(scopes) == 1, rc.path
            assert scopes[0].scope == "function", "the answer must be committed before it is sent"
            for method in rc.methods:
                found.add((method, rc.path))
        assert found == EXPECTED_ROUTES

    def test_an_unmarked_route_on_an_idempotent_router_is_plain(self):
        [route] = [
            rc.original_route for rc in _route_contexts()
            if rc.path == "/api/issues/{issue_id}" and "DELETE" in rc.methods
        ]
        assert isinstance(route, IdempotentRoute)
        assert not any(d.dependency is _idempotency_scope for d in route.dependencies)

    def test_building_the_route_again_adds_the_scope_once(self):
        from app.api.issues import create_comment

        route = IdempotentRoute("/x", create_comment, methods=["POST"])
        again = IdempotentRoute("/x", create_comment, methods=["POST"], dependencies=route.dependencies)
        assert [d.dependency for d in again.dependencies].count(_idempotency_scope) == 1


class TestCommentCreate:
    async def test_a_resend_is_answered_from_the_first_time(self, client, auth_headers, test_issue):
        first = await _comment(client, auth_headers, test_issue, key="k-1")
        again = await _comment(client, auth_headers, test_issue, key="k-1")

        assert first.status_code == again.status_code == 201
        assert again.json() == first.json()
        assert again.headers[REPLAYED_HEADER] == "true"
        assert REPLAYED_HEADER not in first.headers
        assert again.headers["content-type"] == first.headers["content-type"]
        assert len(await _comments(test_issue)) == 1

    async def test_without_the_header_nothing_changes(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue)
        await _comment(client, auth_headers, test_issue)
        assert len(await _comments(test_issue)) == 2
        assert await OxydeIdempotencyRecord.objects.count() == 0

    async def test_a_new_key_is_a_new_write(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue, key="k-1")
        await _comment(client, auth_headers, test_issue, key="k-2")
        assert len(await _comments(test_issue)) == 2

    async def test_the_same_json_spelled_differently_is_the_same_request(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue, key="k-1")
        resp = await client.post(
            f"/api/issues/{test_issue.id}/comments",
            content=b'{ "content" :  "Looks good" }',
            headers={**_keyed(auth_headers, "k-1"), "content-type": "application/json"},
        )
        assert resp.status_code == 201
        assert resp.headers[REPLAYED_HEADER] == "true"
        assert len(await _comments(test_issue)) == 1

    async def test_a_different_body_under_the_key_is_refused(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue, key="k-1")
        resp = await _comment(client, auth_headers, test_issue, content="Something else", key="k-1")

        assert resp.status_code == 422
        assert resp.json()["detail"]["error_code"] == "idempotency_key_reused"
        assert "/comments" in resp.json()["detail"]["message"]
        assert [c.content for c in await _comments(test_issue)] == ["Looks good"]

    async def test_a_different_route_under_the_key_is_refused(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue, key="k-1")
        resp = await client.patch(
            f"/api/issues/{test_issue.id}", json={"title": "Renamed"}, headers=_keyed(auth_headers, "k-1"),
        )
        assert resp.status_code == 422
        assert resp.json()["detail"]["error_code"] == "idempotency_key_reused"
        assert (await OxydeIssue.objects.get(id=test_issue.id)).title == "Test Issue"

    @pytest.mark.parametrize("key", ["", "has space", "x" * 256, "tab\there"])
    async def test_a_malformed_key_is_refused_unwritten(self, client, auth_headers, test_issue, key):
        resp = await _comment(client, auth_headers, test_issue, key=key)
        assert resp.status_code == 400
        assert resp.json()["detail"]["error_code"] == "invalid_idempotency_key"
        assert await _comments(test_issue) == []

    async def test_a_key_of_the_longest_length_is_taken(self, client, auth_headers, test_issue):
        resp = await _comment(client, auth_headers, test_issue, key="x" * 255)
        assert resp.status_code == 201

    async def test_an_invalid_body_stores_nothing(self, client, auth_headers, test_issue):
        bad = await client.post(
            f"/api/issues/{test_issue.id}/comments", json={"nope": 1}, headers=_keyed(auth_headers, "k-1"),
        )
        assert bad.status_code == 422
        assert await OxydeIdempotencyRecord.objects.count() == 0
        good = await _comment(client, auth_headers, test_issue, key="k-1")
        assert good.status_code == 201
        assert REPLAYED_HEADER not in good.headers


class TestScope:
    async def test_keys_are_per_user(self, client, auth_headers, auth_headers2, test_team, test_user2, test_issue):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

        mine = await _comment(client, auth_headers, test_issue, key="shared")
        theirs = await _comment(client, auth_headers2, test_issue, content="Other words", key="shared")

        assert mine.status_code == theirs.status_code == 201
        assert REPLAYED_HEADER not in theirs.headers
        assert theirs.json()["author_id"] == test_user2.id
        assert len(await _comments(test_issue)) == 2

    async def test_an_agent_and_its_owner_are_separate(self, client, auth_headers, test_user, test_team, test_issue):
        """The agent writes as itself; the human holding its key does not
        share its keys."""
        from app.oxyde_models.user import OxydeUser
        from app.utils.security import create_access_token, get_password_hash

        agent = await OxydeUser.objects.create(
            email="bot@example.com", hashed_password=get_password_hash("pw-123456789"), name="Bot",
            is_agent=True, parent_user_id=test_user.id, agent_team_id=test_team.id,
        )
        agent_headers = {"Authorization": f"Bearer {create_access_token(data={'sub': agent.id})}"}
        await _comment(client, auth_headers, test_issue, key="shared")
        resp = await _comment(client, agent_headers, test_issue, key="shared")
        assert resp.status_code == 201
        assert REPLAYED_HEADER not in resp.headers
        assert len(await _comments(test_issue)) == 2

    async def test_a_refused_caller_never_reads_a_stored_answer(self, client, auth_headers, test_user, test_issue):
        """The replay comes after authentication: no credential, no answer."""
        await _comment(client, auth_headers, test_issue, key="k-1")
        resp = await client.post(
            f"/api/issues/{test_issue.id}/comments", json={"content": "Looks good"}, headers={HEADER: "k-1"},
        )
        assert resp.status_code == 401
        assert REPLAYED_HEADER not in resp.headers

    async def test_deleting_the_user_deletes_their_records(self, client, auth_headers, test_user2, auth_headers2, test_team, test_issue):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        await _comment(client, auth_headers2, test_issue, key="k-1")
        assert await OxydeIdempotencyRecord.objects.filter(user_id=test_user2.id).count() == 1
        await execute_raw("PRAGMA foreign_keys = ON", [])
        await execute_raw("DELETE FROM issue_comments WHERE author_id = ?", [test_user2.id])
        await execute_raw("DELETE FROM team_members WHERE user_id = ?", [test_user2.id])
        await execute_raw("DELETE FROM users WHERE id = ?", [test_user2.id])
        assert await OxydeIdempotencyRecord.objects.count() == 0


class TestExpiry:
    async def _age(self, hours: float) -> None:
        old = datetime.now(timezone.utc) - timedelta(hours=hours)
        await execute_raw("UPDATE idempotency_records SET created_at = ?", [old])

    async def test_a_key_older_than_a_day_is_a_new_write(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue, key="k-1")
        await self._age(25)
        resp = await _comment(client, auth_headers, test_issue, key="k-1")
        assert resp.status_code == 201
        assert REPLAYED_HEADER not in resp.headers
        assert len(await _comments(test_issue)) == 2
        assert await OxydeIdempotencyRecord.objects.count() == 1

    async def test_within_the_day_it_is_still_a_resend(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue, key="k-1")
        await self._age(23)
        resp = await _comment(client, auth_headers, test_issue, key="k-1")
        assert resp.headers[REPLAYED_HEADER] == "true"

    async def test_a_claim_sweeps_every_dead_key(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue, key="old-1")
        await _comment(client, auth_headers, test_issue, key="old-2")
        await self._age(30)
        await _comment(client, auth_headers, test_issue, key="new")
        assert [r.idempotency_key for r in await OxydeIdempotencyRecord.objects.all()] == ["new"]

    async def test_an_expired_key_reused_for_another_request_is_new(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue, key="k-1")
        await self._age(25)
        resp = await client.patch(
            f"/api/issues/{test_issue.id}", json={"title": "Renamed"}, headers=_keyed(auth_headers, "k-1"),
        )
        assert resp.status_code == 200
        assert REPLAYED_HEADER not in resp.headers


class TestIssuePatch:
    async def test_a_resend_does_not_undo_a_later_change(self, client, auth_headers, test_issue):
        """The case the key is for: a change resent after a later one
        must not put the earlier value back."""
        url = f"/api/issues/{test_issue.id}"
        first = await client.patch(url, json={"title": "First"}, headers=_keyed(auth_headers, "k-1"))
        later = await client.patch(url, json={"title": "Later"}, headers=auth_headers)
        resent = await client.patch(url, json={"title": "First"}, headers=_keyed(auth_headers, "k-1"))

        assert first.status_code == later.status_code == resent.status_code == 200
        assert resent.json() == first.json()
        assert resent.json()["title"] == "First"
        assert (await OxydeIssue.objects.get(id=test_issue.id)).title == "Later"

    async def test_a_refusal_is_the_answer_too(self, client, auth_headers, test_issue, review_close_ritual):
        """A 409 (a pending close ritual) is stored and replayed as it was."""
        url = f"/api/issues/{test_issue.id}"
        first = await client.patch(url, json={"status": "done"}, headers=_keyed(auth_headers, "k-1"))
        again = await client.patch(url, json={"status": "done"}, headers=_keyed(auth_headers, "k-1"))

        assert first.status_code == again.status_code == 409
        assert again.json() == first.json()
        assert again.headers[REPLAYED_HEADER] == "true"
        record = await OxydeIdempotencyRecord.objects.get(idempotency_key="k-1")
        assert record.refused is True and record.status == 409

    async def test_what_a_refused_request_wrote_is_kept(self, client, auth_headers, test_issue, review_close_ritual):
        """Refused writes commit what they did before the refusal, as they
        do without a key: the close intent a pending ritual opens."""
        from app.oxyde_models.issue import OxydeTicketLimbo

        url = f"/api/issues/{test_issue.id}"
        await client.patch(url, json={"status": "done"}, headers=auth_headers)
        unkeyed = await OxydeTicketLimbo.objects.filter(issue_id=test_issue.id).count()
        await execute_raw("DELETE FROM ticket_limbo_blockers", [])
        await execute_raw("DELETE FROM ticket_limbo", [])

        await client.patch(url, json={"status": "done"}, headers=_keyed(auth_headers, "k-1"))
        assert unkeyed > 0
        assert await OxydeTicketLimbo.objects.filter(issue_id=test_issue.id).count() == unkeyed


class TestFailures:
    @pytest_asyncio.fixture
    async def lenient_client(self, client):
        """A client that gets the 500 instead of the app's exception."""
        from app.main import app

        async with AsyncClient(
            transport=ASGITransport(app=app, raise_app_exceptions=False), base_url="http://test",
        ) as ac:
            yield ac

    async def test_a_5xx_rolls_the_write_back_and_stores_nothing(self, lenient_client, auth_headers, test_issue):
        with patch("app.api.issues.fill_principals", side_effect=RuntimeError("boom")):
            failed = await _comment(lenient_client, auth_headers, test_issue, key="k-1")
        assert failed.status_code == 500
        # The comment was written before the failure, and went with it.
        assert await _comments(test_issue) == []
        assert await OxydeIdempotencyRecord.objects.count() == 0

        retried = await _comment(lenient_client, auth_headers, test_issue, key="k-1")
        assert retried.status_code == 201
        assert REPLAYED_HEADER not in retried.headers
        assert len(await _comments(test_issue)) == 1

    async def test_an_http_5xx_is_not_stored(self, lenient_client, auth_headers, test_issue):
        with patch("app.api.issues.fill_principals", side_effect=HTTPException(status_code=503, detail="later")):
            failed = await _comment(lenient_client, auth_headers, test_issue, key="k-1")
        assert failed.status_code == 503
        assert await _comments(test_issue) == []
        assert await OxydeIdempotencyRecord.objects.count() == 0

    async def test_broadcasts_wait_for_the_commit(self, client, auth_headers, test_issue):
        """The request runs in one transaction; its WebSocket events go
        out after it commits, when a refetch finds the comment."""
        from app.websocket import manager

        seen = []

        async def send(team_id, message):
            seen.append((message["entity"], await OxydeIssueComment.objects.filter(issue_id=test_issue.id).count()))

        with patch.object(manager, "_send_to_team", side_effect=send):
            resp = await _comment(client, auth_headers, test_issue, key="k-1")
        assert resp.status_code == 201
        assert ("comment", 1) in seen

    async def test_a_broadcast_in_a_rolled_back_transaction_is_dropped(self, db):
        from app.websocket import manager

        sent = []
        with patch.object(manager, "_send_to_team", side_effect=lambda t, m: sent.append(m)):
            with pytest.raises(RuntimeError):
                async with atomic():
                    await manager.broadcast_to_team("team", {"type": "x"})
                    assert sent == []
                    raise RuntimeError("roll back")
            assert sent == []
            async with atomic():
                await manager.broadcast_to_team("team", {"type": "y"})
                assert sent == []
            assert sent == [{"type": "y"}]
            await manager.broadcast_to_team("team", {"type": "z"})
            assert sent[-1] == {"type": "z"}


class TestConcurrentResend:
    async def test_a_resend_while_the_first_runs_waits_and_replays(self, client, auth_headers, test_issue):
        """Both arrive before either answers: the write is done once and
        both get its answer."""
        original = IssueService.create_comment
        entered = asyncio.Event()

        async def slow(self, *args, **kwargs):
            comment = await original(self, *args, **kwargs)
            entered.set()
            await asyncio.sleep(0.2)
            return comment

        with patch.object(IssueService, "create_comment", slow):
            first_task = asyncio.ensure_future(_comment(client, auth_headers, test_issue, key="k-1"))
            await entered.wait()
            second = await _comment(client, auth_headers, test_issue, key="k-1")
            first = await first_task

        assert first.status_code == second.status_code == 201
        assert second.json() == first.json()
        assert second.headers[REPLAYED_HEADER] == "true"
        assert len(await _comments(test_issue)) == 1

    async def test_on_two_connections_the_resend_queues_on_the_write_lock(self, client, auth_headers, test_issue, tmp_path):
        """The production shape: a pool of several connections, so the
        resend's claim meets the first one's write lock rather than a busy
        pool."""
        from oxyde import AsyncDatabase, PoolSettings
        from app.config import get_settings

        url = get_settings().database_url.replace("sqlite+aiosqlite:///", "sqlite:///")
        pool = AsyncDatabase(url, overwrite=True, settings=PoolSettings(max_connections=4))
        await pool.connect()

        original = IssueService.create_comment
        entered = asyncio.Event()

        async def slow(self, *args, **kwargs):
            comment = await original(self, *args, **kwargs)
            entered.set()
            await asyncio.sleep(0.3)
            return comment

        with patch.object(IssueService, "create_comment", slow):
            first_task = asyncio.ensure_future(_comment(client, auth_headers, test_issue, key="k-1"))
            await entered.wait()
            second = await _comment(client, auth_headers, test_issue, key="k-1")
            first = await first_task

        assert first.status_code == second.status_code == 201, (first.text, second.text)
        assert second.json() == first.json()
        assert len(await _comments(test_issue)) == 1


class TestRituals:
    async def _review_attested(self, issue, agent_user, ritual):
        with pytest.raises(TicketRitualsError):
            await IssueService().update(
                await OxydeIssue.objects.get(id=issue.id), IssueUpdate(status=IssueStatus.DONE),
                user_id=agent_user.id, is_human_request=False,
            )
        return await RitualService().attest_for_issue(
            ritual=ritual, issue_id=issue.id, user_id=agent_user.id, note="done",
        )

    async def test_an_approve_resent_gets_the_approval_not_already_resolved(
        self, client, auth_headers, test_issue, agent_user, review_close_ritual,
    ):
        await self._review_attested(test_issue, agent_user, review_close_ritual)
        url = f"/api/rituals/{review_close_ritual.id}/approve-issue/{test_issue.id}"
        first = await client.post(url, json={}, headers=_keyed(auth_headers, "k-1"))
        again = await client.post(url, json={}, headers=_keyed(auth_headers, "k-1"))
        unkeyed = await client.post(url, json={}, headers=auth_headers)

        assert first.status_code == again.status_code == 200
        assert again.json() == first.json()
        assert unkeyed.status_code == 409  # a new request, without the key, as before

    async def test_a_reject_resent_records_one_rejection(
        self, client, auth_headers, test_issue, agent_user, review_close_ritual,
    ):
        await self._review_attested(test_issue, agent_user, review_close_ritual)
        url = f"/api/rituals/{review_close_ritual.id}/reject-issue/{test_issue.id}"
        first = await client.post(url, json={"note": "No"}, headers=_keyed(auth_headers, "k-1"))
        again = await client.post(url, json={"note": "No"}, headers=_keyed(auth_headers, "k-1"))

        assert first.status_code == again.status_code == 200
        assert again.json() == first.json()
        assert await OxydeRitualRejection.objects.count() == 1
        assert await OxydeRitualAttestation.objects.count() == 0

    async def test_a_gate_completion_resent_is_answered_once(
        self, client, auth_headers, test_issue, gate_close_ritual,
    ):
        url = f"/api/rituals/{gate_close_ritual.id}/complete-issue/{test_issue.id}"
        first = await client.post(url, json={"note": "ok"}, headers=_keyed(auth_headers, "k-1"))
        again = await client.post(url, json={"note": "ok"}, headers=_keyed(auth_headers, "k-1"))
        assert first.status_code == again.status_code == 200, first.text
        assert again.json() == first.json()
        assert await OxydeRitualAttestation.objects.filter(ritual_id=gate_close_ritual.id).count() == 1


class TestInbox:
    @pytest_asyncio.fixture
    async def entry(self, db, test_project, test_user):
        return await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_project.team_id, title="hello",
        )

    @pytest.mark.parametrize("action", ["read", "archive"])
    async def test_an_action_resent_is_replayed(self, client, auth_headers, entry, action):
        url = f"/api/inbox/{entry.id}/{action}"
        first = await client.post(url, headers=_keyed(auth_headers, "k-1"))
        again = await client.post(url, headers=_keyed(auth_headers, "k-1"))
        assert first.status_code == again.status_code == 200
        assert again.json() == first.json()
        assert again.headers[REPLAYED_HEADER] == "true"

    async def test_a_404_is_replayed_as_a_404(self, client, auth_headers):
        url = "/api/inbox/00000000-0000-0000-0000-000000000000/read"
        first = await client.post(url, headers=_keyed(auth_headers, "k-1"))
        again = await client.post(url, headers=_keyed(auth_headers, "k-1"))
        assert first.status_code == again.status_code == 404
        assert again.json() == first.json() == {"detail": "Inbox entry not found"}
        record = await OxydeIdempotencyRecord.objects.get(idempotency_key="k-1")
        assert json.loads(record.response_body) == "Inbox entry not found"
