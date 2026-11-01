"""Idempotency-Key on the app's writes (CHT-1621).

A resend of a keyed write (same user, same key, within 24 h) gets the
first answer without the write being done again; later, until 30 days,
it is refused (409 idempotency_key_expired), never done again; while the
first is still running it is told so (409 idempotency_in_flight); the
same key for a different request is a 422; nothing changes without the
header. See app/api/idempotency.py.
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

from app.api import idempotency
from app.api.idempotency import (
    HEADER,
    INTERACTIVE_HEADER,
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
# paths (CHT-1607) and the issue routes; and creating an issue, which the
# CLI resends after a lost answer (CHT-1957).
EXPECTED_ROUTES = {
    ("POST", "/api/projects/{project_id}/issues"),
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

    def test_the_cli_resends_on_exactly_these_routes(self):
        # The CLI resends a write whose answer it lost only where the
        # server answers once per key (CHT-1957): a route missing from
        # its list loses that, and one too many could post twice.
        # Compared as the regexes the CLI matches paths with, so a
        # placeholder named differently on either side still agrees, and
        # one the CLI could not turn into a pattern would not.
        from cli.client import _IDEMPOTENT_PATTERNS, route_pattern

        cli_side = {(m, p.pattern) for m, p in _IDEMPOTENT_PATTERNS}
        server_side = {(m, route_pattern(path.removeprefix("/api"))) for m, path in EXPECTED_ROUTES}
        assert cli_side == server_side
        for _, pattern in cli_side:
            assert "{" not in pattern, f"a placeholder was left literal: {pattern}"

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


class TestIssueCreate:
    """CHT-1957: the CLI resends a create whose answer it lost."""

    async def _create(self, client, headers, project, title="Once", key=None):
        if key is not None:
            headers = _keyed(headers, key)
        return await client.post(f"/api/projects/{project.id}/issues", json={"title": title}, headers=headers)

    async def test_a_resend_creates_one_issue_and_answers_with_it(self, client, auth_headers, test_project):
        first = await self._create(client, auth_headers, test_project, key="c-1")
        again = await self._create(client, auth_headers, test_project, key="c-1")

        assert first.status_code == again.status_code == 201
        assert again.json() == first.json()
        assert again.headers[REPLAYED_HEADER] == "true"
        assert await OxydeIssue.objects.filter(project_id=test_project.id).count() == 1

    async def test_a_new_key_is_a_new_issue(self, client, auth_headers, test_project):
        a = await self._create(client, auth_headers, test_project, key="c-1")
        b = await self._create(client, auth_headers, test_project, key="c-2")
        assert a.json()["identifier"] != b.json()["identifier"]
        assert await OxydeIssue.objects.filter(project_id=test_project.id).count() == 2

    async def test_the_key_for_a_different_issue_is_refused(self, client, auth_headers, test_project):
        await self._create(client, auth_headers, test_project, title="First", key="c-1")
        other = await self._create(client, auth_headers, test_project, title="Second", key="c-1")
        assert other.status_code == 422
        assert other.json()["detail"]["error_code"] == "idempotency_key_reused"
        assert await OxydeIssue.objects.filter(project_id=test_project.id).count() == 1

    async def test_without_the_header_nothing_changes(self, client, auth_headers, test_project):
        await self._create(client, auth_headers, test_project)
        await self._create(client, auth_headers, test_project)
        assert await OxydeIssue.objects.filter(project_id=test_project.id).count() == 2
        assert await OxydeIdempotencyRecord.objects.count() == 0


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
    async def _age(self, **delta) -> None:
        old = datetime.now(timezone.utc) - timedelta(**delta)
        await execute_raw("UPDATE idempotency_records SET created_at = ?", [old])

    async def test_a_resend_after_the_replay_window_is_refused_not_done_again(self, client, auth_headers, test_issue):
        """The late resend (a write stalled, or offline over a weekend)
        must not be a second comment."""
        await _comment(client, auth_headers, test_issue, key="k-1")
        await self._age(hours=25)
        resp = await _comment(client, auth_headers, test_issue, key="k-1")
        assert resp.status_code == 409
        detail = resp.json()["detail"]
        assert detail["error_code"] == "idempotency_key_expired"
        assert detail["original_status"] == 201 and detail["original_refused"] is False
        assert "already done" in detail["message"]
        assert len(await _comments(test_issue)) == 1

    async def test_and_after_the_sweep_cleared_its_answer(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue, key="k-1")
        await self._age(days=29)
        await idempotency.sweep()
        [record] = await OxydeIdempotencyRecord.objects.all()
        assert record.status == 201 and record.response_body is None and record.response_headers is None
        resp = await _comment(client, auth_headers, test_issue, key="k-1")
        assert resp.json()["detail"]["error_code"] == "idempotency_key_expired"
        assert len(await _comments(test_issue)) == 1

    async def test_a_late_resend_of_a_refused_request_is_not_called_done(self, client, auth_headers):
        url = "/api/inbox/00000000-0000-0000-0000-000000000000/read"
        first = await client.post(url, headers=_keyed(auth_headers, "k-1"))
        assert first.status_code == 404
        await self._age(hours=25)
        resp = await client.post(url, headers=_keyed(auth_headers, "k-1"))
        detail = resp.json()["detail"]
        assert resp.status_code == 409
        assert detail["error_code"] == "idempotency_key_expired"
        assert detail["original_status"] == 404 and detail["original_refused"] is True
        assert "refused (404)" in detail["message"] and "already done" not in detail["message"]

    async def test_a_late_resend_of_another_request_is_still_a_reused_key(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue, key="k-1")
        await self._age(hours=25)
        resp = await client.patch(
            f"/api/issues/{test_issue.id}", json={"title": "Renamed"}, headers=_keyed(auth_headers, "k-1"),
        )
        assert resp.status_code == 422
        assert resp.json()["detail"]["error_code"] == "idempotency_key_reused"

    async def test_within_the_day_it_is_still_a_resend(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue, key="k-1")
        await self._age(hours=23)
        resp = await _comment(client, auth_headers, test_issue, key="k-1")
        assert resp.headers[REPLAYED_HEADER] == "true"

    async def test_after_the_tombstone_the_key_is_new(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue, key="k-1")
        await self._age(days=31)
        resp = await _comment(client, auth_headers, test_issue, key="k-1")
        assert resp.status_code == 201
        assert REPLAYED_HEADER not in resp.headers
        assert len(await _comments(test_issue)) == 2
        assert await OxydeIdempotencyRecord.objects.count() == 1

    async def test_the_sweep_deletes_what_is_past_the_tombstone(self, client, auth_headers, test_issue):
        await _comment(client, auth_headers, test_issue, key="old-1")
        await _comment(client, auth_headers, test_issue, key="old-2")
        await self._age(days=31)
        await _comment(client, auth_headers, test_issue, key="new")
        await idempotency.sweep()
        [record] = await OxydeIdempotencyRecord.objects.all()
        assert record.idempotency_key == "new" and record.response_body is not None

    async def test_a_claim_sweeps_at_most_every_few_minutes(self, client, auth_headers, test_issue):
        with patch.object(idempotency, "_next_sweep", 0.0), patch.object(idempotency, "sweep") as swept:
            await _comment(client, auth_headers, test_issue, key="k-1")
            await _comment(client, auth_headers, test_issue, key="k-2")
        assert swept.await_count == 1

    async def test_a_failing_sweep_does_not_fail_the_write(self, client, auth_headers, test_issue):
        from tests.conftest import push_errors

        with patch.object(idempotency, "_next_sweep", 0.0), \
             patch.object(idempotency, "sweep", side_effect=RuntimeError("disk")):
            resp = await _comment(client, auth_headers, test_issue, key="k-1")
        assert resp.status_code == 201
        push_errors.clear()


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

    async def test_a_conflict_is_not_stored(self, client, auth_headers, test_issue, review_close_ritual):
        """A 409 (here a pending close ritual) says how things stand now:
        a resend asks again rather than being told the old answer."""
        url = f"/api/issues/{test_issue.id}"
        first = await client.patch(url, json={"status": "done"}, headers=_keyed(auth_headers, "k-1"))
        again = await client.patch(url, json={"status": "done"}, headers=_keyed(auth_headers, "k-1"))

        assert first.status_code == again.status_code == 409
        assert REPLAYED_HEADER not in again.headers
        assert await OxydeIdempotencyRecord.objects.count() == 0

    async def test_a_conflict_resolved_since_lets_the_resend_through(self, client, auth_headers, test_issue):
        """The arrears case: refused, the person fixes it, the same queued
        write goes through."""
        from app.oxyde_models.issue import OxydeIssue as Issue

        url = f"/api/issues/{test_issue.id}"
        with patch("app.api.issues.IssueService.update",
                   side_effect=HTTPException(status_code=409, detail={"error_code": "sprint_in_arrears"})):
            refused = await client.patch(url, json={"title": "T"}, headers=_keyed(auth_headers, "k-1"))
        assert refused.status_code == 409
        resp = await client.patch(url, json={"title": "T"}, headers=_keyed(auth_headers, "k-1"))
        assert resp.status_code == 200
        assert (await Issue.objects.get(id=test_issue.id)).title == "T"

    @pytest.mark.parametrize("code", [408, 425, 429])
    async def test_a_retry_me_status_is_not_stored(self, client, auth_headers, test_issue, code):
        with patch("app.api.issues.fill_principals", side_effect=HTTPException(status_code=code, detail="later")):
            resp = await _comment(client, auth_headers, test_issue, key="k-1")
        assert resp.status_code == code
        assert await OxydeIdempotencyRecord.objects.count() == 0

    async def test_a_stored_refusal_replays_in_the_form_it_was_sent(self, client, auth_headers, test_issue):
        """The detail is stored as it was rendered (jsonable_encoder): an
        enum as its value, a tuple as a list."""
        detail = {"status": IssueStatus.DONE, "issue_ids": ("a", "b")}
        with patch("app.api.issues.fill_principals", side_effect=HTTPException(status_code=400, detail=detail)):
            first = await _comment(client, auth_headers, test_issue, key="k-1")
        again = await _comment(client, auth_headers, test_issue, key="k-1")
        assert first.status_code == again.status_code == 400
        assert again.json() == first.json() == {"detail": {"status": "done", "issue_ids": ["a", "b"]}}
        assert again.headers[REPLAYED_HEADER] == "true"

    async def test_the_interactive_signal_is_part_of_the_request(self, client, auth_headers, test_issue):
        """X-Chaotic-Interactive changes what an update may do (CHT-1302),
        so the same key with it flipped is another request."""
        url = f"/api/issues/{test_issue.id}"
        await client.patch(url, json={"title": "T"}, headers=_keyed(auth_headers, "k-1"))
        resp = await client.patch(
            url, json={"title": "T"}, headers={**_keyed(auth_headers, "k-1"), INTERACTIVE_HEADER: "1"},
        )
        assert resp.status_code == 422
        assert resp.json()["detail"]["error_code"] == "idempotency_key_reused"

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
        # The comment was written before the failure, and went with it,
        # and the claim was released.
        assert await _comments(test_issue) == []
        assert await OxydeIdempotencyRecord.objects.count() == 0

        retried = await _comment(lenient_client, auth_headers, test_issue, key="k-1")
        assert retried.status_code == 201
        assert REPLAYED_HEADER not in retried.headers
        assert len(await _comments(test_issue)) == 1

    async def test_a_claim_that_cannot_be_released_goes_stale(self, lenient_client, auth_headers, test_issue):
        """The release after a rollback failed too: the claim stays, and
        is taken over once stale (TestConcurrentResend)."""
        with patch("app.api.issues.fill_principals", side_effect=RuntimeError("boom")), \
             patch.object(idempotency, "_release", side_effect=RuntimeError("disk")):
            failed = await _comment(lenient_client, auth_headers, test_issue, key="k-1")
        assert failed.status_code == 500
        assert await _comments(test_issue) == []
        [claim] = await OxydeIdempotencyRecord.objects.all()
        assert claim.status is None

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

    async def test_a_route_without_the_key_still_broadcasts(self, client, auth_headers, test_issue):
        """Outside a transaction a broadcast goes at once, as before."""
        from app.websocket import manager

        seen = []

        async def send(team_id, message):
            seen.append((message["entity"], await OxydeIssueComment.objects.filter(issue_id=test_issue.id).count()))

        with patch.object(manager, "_send_to_team", side_effect=send):
            resp = await _comment(client, auth_headers, test_issue)
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


async def _claim_row(user, key: str, path: str, *, claimed_minutes_ago: float) -> None:
    """An unanswered claim, as a request that is running (or died) leaves it."""
    claimed = datetime.now(timezone.utc) - timedelta(minutes=claimed_minutes_ago)
    await OxydeIdempotencyRecord.objects.create(
        user_id=user.id, idempotency_key=key, method="POST", path=path,
        request_hash="h", claim_token="other", claimed_at=claimed, created_at=claimed,
    )


async def _pool(busy_timeout_ms: int):
    from oxyde import AsyncDatabase, PoolSettings

    from app.config import get_settings

    url = get_settings().database_url.replace("sqlite+aiosqlite:///", "sqlite:///")
    pool = AsyncDatabase(
        url, overwrite=True, settings=PoolSettings(max_connections=4, sqlite_busy_timeout=busy_timeout_ms),
    )
    await pool.connect()
    return pool


@pytest_asyncio.fixture
async def pool_of_four(client):
    """The production shape: several connections, so a keyed request and
    others meet on SQLite's locks rather than on a busy pool, with the
    production busy timeout (Oxyde's 5000 ms).

    The tests that wait on the write lock hold it for a deliberate 0.1 to
    0.15 s plus the rest of a request, about 0.15 s in all on a quiet
    machine. They used a 300 ms busy timeout, which left a loaded CI
    runner (coverage tracing, sharded workers) too little margin: the
    wait ran out, and the resend got the 503 it is designed to give then
    (PR #502's CI). The 503 itself is checked with `pool_of_four_impatient`."""
    return await _pool(5000)


@pytest_asyncio.fixture
async def pool_of_four_impatient(client):
    """As `pool_of_four`, with a short busy timeout, so a wait on the
    write lock that cannot succeed fails fast."""
    return await _pool(300)


def _slow_comment(entered: asyncio.Event, seconds: float, *, before_write: bool):
    original = IssueService.create_comment

    async def slow(self, *args, **kwargs):
        if before_write:
            entered.set()
            await asyncio.sleep(seconds)
            return await original(self, *args, **kwargs)
        comment = await original(self, *args, **kwargs)
        entered.set()
        await asyncio.sleep(seconds)
        return comment

    return patch.object(IssueService, "create_comment", slow)


class TestConcurrentResend:
    async def test_on_one_connection_the_resend_gets_the_first_answer(self, client, auth_headers, test_issue):
        """The test harness's single connection: the resend cannot run
        until the first has committed, and then replays it."""
        entered = asyncio.Event()
        with _slow_comment(entered, 0.2, before_write=False):
            first_task = asyncio.ensure_future(_comment(client, auth_headers, test_issue, key="k-1"))
            await entered.wait()
            second = await _comment(client, auth_headers, test_issue, key="k-1")
            first = await first_task

        assert first.status_code == second.status_code == 201
        assert second.json() == first.json()
        assert second.headers[REPLAYED_HEADER] == "true"
        assert len(await _comments(test_issue)) == 1

    async def test_a_resend_before_the_first_begins_its_write_is_told_to_retry(
        self, pool_of_four, client, auth_headers, test_issue,
    ):
        """The first has claimed the key but not begun step 2: the
        duplicate is answered at once, and its retry gets the first one's
        answer. The write is done once."""
        original = idempotency._take_write_lock
        entered = asyncio.Event()

        async def slow_to_start() -> None:
            entered.set()
            await asyncio.sleep(0.3)
            await original()

        with patch.object(idempotency, "_take_write_lock", slow_to_start):
            first_task = asyncio.ensure_future(_comment(client, auth_headers, test_issue, key="k-1"))
            await entered.wait()
            second = await _comment(client, auth_headers, test_issue, key="k-1")
            first = await first_task
        retried = await _comment(client, auth_headers, test_issue, key="k-1")

        assert first.status_code == 201, first.text
        assert second.status_code == 409
        assert second.json()["detail"]["error_code"] == "idempotency_in_flight"
        assert second.headers["Retry-After"] == "1"
        assert retried.json() == first.json() and retried.headers[REPLAYED_HEADER] == "true"
        assert len(await _comments(test_issue)) == 1

    async def test_a_commit_during_a_keyed_request_s_reads_cannot_fail_it(
        self, pool_of_four, client, auth_headers, test_issue,
    ):
        """The probe from the re-review: the keyed request has read and
        pauses before writing while another writer tries to commit. Step 2
        took the write lock first, so the other writer waits for it
        (within the busy timeout) instead of overtaking it; both succeed,
        and nothing answers 503."""
        original = IssueService.create_comment
        entered = asyncio.Event()

        async def read_then_pause(self, *args, **kwargs):
            await OxydeIssue.objects.filter(id=test_issue.id).first()
            entered.set()
            await asyncio.sleep(0.15)
            return await original(self, *args, **kwargs)

        with patch.object(IssueService, "create_comment", read_then_pause):
            keyed = asyncio.ensure_future(_comment(client, auth_headers, test_issue, key="k-1"))
            await entered.wait()
            other = await client.patch(f"/api/issues/{test_issue.id}", json={"title": "Meanwhile"}, headers=auth_headers)
            first = await keyed
        assert first.status_code == 201, first.text
        assert other.status_code == 200, other.text
        assert len(await _comments(test_issue)) == 1
        assert (await OxydeIssue.objects.get(id=test_issue.id)).title == "Meanwhile"

    async def test_a_keyed_request_waits_for_a_writer_that_finishes_in_time(
        self, pool_of_four, client, auth_headers, test_issue,
    ):
        started, release = asyncio.Event(), asyncio.Event()

        async def hold() -> None:
            async with atomic():
                await execute_raw("UPDATE users SET can_register = can_register WHERE 0", [])
                started.set()
                await release.wait()

        holder = asyncio.ensure_future(hold())
        await started.wait()
        keyed = asyncio.ensure_future(_comment(client, auth_headers, test_issue, key="k-1"))
        await asyncio.sleep(0.1)
        release.set()
        await holder
        resp = await keyed
        assert resp.status_code == 201, resp.text
        assert len(await _comments(test_issue)) == 1

    async def test_a_resend_while_the_first_writes_waits_for_it(
        self, pool_of_four, client, auth_headers, test_issue,
    ):
        """In the first one's write phase the duplicate's claim queues on
        the write lock (within the busy timeout) and then replays."""
        entered = asyncio.Event()
        with _slow_comment(entered, 0.1, before_write=False):
            first_task = asyncio.ensure_future(_comment(client, auth_headers, test_issue, key="k-1"))
            await entered.wait()
            second = await _comment(client, auth_headers, test_issue, key="k-1")
            first = await first_task
        assert first.status_code == second.status_code == 201
        assert second.json() == first.json() and second.headers[REPLAYED_HEADER] == "true"
        assert len(await _comments(test_issue)) == 1

    async def test_a_claim_that_cannot_get_the_lock_is_a_retryable_503(
        self, pool_of_four_impatient, client, auth_headers, test_issue,
    ):
        """Another writer holds SQLite's write lock past the busy timeout:
        the claim cannot be made, and the answer says to retry."""
        started, release = asyncio.Event(), asyncio.Event()

        async def hold() -> None:
            async with atomic():
                # Takes the write lock and changes nothing (as RegistrationService does).
                await execute_raw("UPDATE users SET can_register = can_register WHERE 0", [])
                started.set()
                await release.wait()

        holder = asyncio.ensure_future(hold())
        await started.wait()
        try:
            resp = await _comment(client, auth_headers, test_issue, key="k-1")
        finally:
            release.set()
            await holder
        assert resp.status_code == 503
        assert resp.json()["detail"]["error_code"] == "idempotency_busy"
        assert resp.headers["Retry-After"] == "1"
        retried = await _comment(client, auth_headers, test_issue, key="k-1")
        assert retried.status_code == 201
        assert len(await _comments(test_issue)) == 1

    async def test_a_request_that_lost_its_claim_commits_nothing_even_when_refused(
        self, client, auth_headers, test_issue,
    ):
        """A refusal that is not stored (a 409) releases the claim and
        commits what the request wrote; if the claim was taken over, the
        release finds nothing, and nothing commits."""
        async def taken_over_then_refused(*args, **kwargs):
            await execute_raw("UPDATE idempotency_records SET claim_token = 'someone-else'", [])
            raise HTTPException(status_code=409, detail={"error_code": "sprint_in_arrears"})

        with patch("app.api.issues.fill_principals", side_effect=taken_over_then_refused):
            resp = await _comment(client, auth_headers, test_issue, key="k-1")
        assert resp.status_code == 409
        assert resp.json()["detail"]["error_code"] == "idempotency_in_flight"
        # The comment was written before the refusal, and went with it.
        assert await _comments(test_issue) == []

    async def test_a_live_claim_is_in_flight(self, client, auth_headers, test_user, test_issue):
        path = f"/api/issues/{test_issue.id}/comments"
        await _claim_row(test_user, "k-1", path, claimed_minutes_ago=1)
        with patch("app.api.idempotency._fingerprint", return_value="h"):
            resp = await _comment(client, auth_headers, test_issue, key="k-1")
        assert resp.status_code == 409
        assert resp.json()["detail"]["error_code"] == "idempotency_in_flight"
        assert await _comments(test_issue) == []

    async def test_a_dead_request_s_claim_is_taken_over(self, client, auth_headers, test_user, test_issue):
        """An unanswered claim means its write never committed (they commit
        together); once stale, the resend does the write."""
        path = f"/api/issues/{test_issue.id}/comments"
        await _claim_row(test_user, "k-1", path, claimed_minutes_ago=11)
        with patch("app.api.idempotency._fingerprint", return_value="h"):
            resp = await _comment(client, auth_headers, test_issue, key="k-1")
            again = await _comment(client, auth_headers, test_issue, key="k-1")
        assert resp.status_code == 201
        assert again.headers[REPLAYED_HEADER] == "true"
        assert len(await _comments(test_issue)) == 1

    async def test_a_request_that_lost_its_claim_does_not_commit(self, client, auth_headers, test_issue):
        """A request that outlived STALE_CLAIM, whose claim another resend
        took over, rolls its write back rather than doing it twice."""
        original = IssueService.create_comment

        async def taken_over(self, *args, **kwargs):
            comment = await original(self, *args, **kwargs)
            await execute_raw("UPDATE idempotency_records SET claim_token = 'someone-else'", [])
            return comment

        with patch.object(IssueService, "create_comment", taken_over):
            resp = await _comment(client, auth_headers, test_issue, key="k-1")
        assert resp.status_code == 409
        assert resp.json()["detail"]["error_code"] == "idempotency_in_flight"
        assert await _comments(test_issue) == []


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

    async def test_a_body_that_is_not_json_is_compared_as_bytes(self, client, auth_headers, entry):
        url = f"/api/inbox/{entry.id}/read"
        first = await client.post(url, content=b"\xff", headers=_keyed(auth_headers, "k-1"))
        again = await client.post(url, content=b"\xff", headers=_keyed(auth_headers, "k-1"))
        other = await client.post(url, content=b"\xfe", headers=_keyed(auth_headers, "k-1"))
        assert first.status_code == again.status_code == 200
        assert again.headers[REPLAYED_HEADER] == "true"
        assert other.status_code == 422

    async def test_a_404_is_replayed_as_a_404(self, client, auth_headers):
        url = "/api/inbox/00000000-0000-0000-0000-000000000000/read"
        first = await client.post(url, headers=_keyed(auth_headers, "k-1"))
        again = await client.post(url, headers=_keyed(auth_headers, "k-1"))
        assert first.status_code == again.status_code == 404
        assert again.json() == first.json() == {"detail": "Inbox entry not found"}
        record = await OxydeIdempotencyRecord.objects.get(idempotency_key="k-1")
        assert json.loads(record.response_body) == "Inbox entry not found"
