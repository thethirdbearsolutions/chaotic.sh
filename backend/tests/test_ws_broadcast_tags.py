"""Every REST write tags its broadcast with the right project (CHT-1840).

The manager filters /ws broadcasts per socket by the envelope's
``project_id``: a socket confined to a project hears only that
project's events. A call site that tags its event with None, or with
the wrong project, does nothing visible to a team-wide socket, so only
a check on the tags catches it. This walks the REST writes that
broadcast, through the ``captured_broadcasts`` fixture, whose teardown
checks every envelope against the database (``tests/broadcast_tags.py``).
Ritual and intent broadcasts are checked the same way by the ritual
tests that use that fixture, and the two routes those miss below. Each
call site was checked by setting its tag to None in turn: every one
fails a test here or in those ritual tests.
"""
import pytest

from app.enums import IssueStatus
from app.schemas.issue import IssueUpdate
from app.services.issue_service import ClaimRitualsError, IssueService
from tests.broadcast_tags import assert_tagged


async def test_ritual_routes_tag_their_broadcasts(
    client, auth_headers, test_project, test_issue, test_user, gate_claim_ritual, gate_close_ritual,
    captured_broadcasts,
):
    """The two ritual routes no ritual test captured: force-clearing a
    ticket's limbo (an INTENT_CANCELED activity per intent) and completing
    an issue's gate. The fixture's teardown checks the tags too."""
    with pytest.raises(ClaimRitualsError):  # opens a claim intent: limbo
        await IssueService().update(
            test_issue, IssueUpdate(status=IssueStatus.IN_PROGRESS), user_id=test_user.id, is_human_request=False,
        )
    r = await client.post(
        "/api/rituals/force-clear-ticket-limbo", params={"issue_id": test_issue.id}, headers=auth_headers,
    )
    assert r.status_code == 200, r.text
    r = await client.post(
        f"/api/rituals/{gate_close_ritual.id}/complete-issue/{test_issue.id}",
        json={"note": "ok"}, headers=auth_headers,
    )
    assert r.status_code == 200, r.text

    messages = [m for _team, m in captured_broadcasts]
    canceled = [m for m in messages if m["entity"] == "activity" and m["type"] == "intent_canceled"]
    completed = [m for m in messages if m["entity"] == "attestation" and m["type"] == "completed"]
    assert canceled and completed, [(m["entity"], m["type"]) for m in messages]
    assert {m["project_id"] for m in canceled + completed} == {test_project.id}


async def test_rest_writes_tag_their_broadcasts(
    client, auth_headers, test_team, test_project, test_label, captured_broadcasts,
):
    h = auth_headers

    async def ok(method, url, status=200, **kw):
        r = await client.request(method, url, headers=h, **kw)
        assert r.status_code == status, (method, url, r.text)
        return r.json() if r.content else None

    project = await ok("POST", f"/api/teams/{test_team.id}/projects", 201, json={"name": "Walk", "key": "WALK"})
    pid = project["id"]
    sprint = await ok("POST", f"/api/projects/{pid}/sprints")
    # A planned sprint follows the default: the change broadcasts it too.
    await ok("PATCH", f"/api/projects/{pid}", json={"default_sprint_budget": 7})

    a = await ok("POST", f"/api/projects/{pid}/issues", 201, json={"title": "a"})
    b = await ok("POST", f"/api/projects/{pid}/issues", 201, json={"title": "b"})
    elsewhere = await ok("POST", f"/api/projects/{test_project.id}/issues", 201, json={"title": "c"})
    await ok("PATCH", f"/api/issues/{a['id']}", json={"title": "a2"})
    await ok("POST", "/api/issues/batch-update", json={"issue_ids": [a["id"], b["id"]], "priority": "high"})
    await ok("POST", f"/api/issues/{a['id']}/labels", json={"label_id": test_label.id})
    await ok("DELETE", f"/api/issues/{a['id']}/labels/{test_label.id}")

    comment = await ok("POST", f"/api/issues/{a['id']}/comments", 201, json={"content": "hi"})
    await ok("PATCH", f"/api/issues/{a['id']}/comments/{comment['id']}", json={"content": "hi2"})
    await ok("DELETE", f"/api/issues/{a['id']}/comments/{comment['id']}", 204)

    same = await ok("POST", f"/api/issues/{a['id']}/relations", 201, json={"related_issue_id": b["id"]})
    across = await ok("POST", f"/api/issues/{a['id']}/relations", 201, json={"related_issue_id": elsewhere["id"]})
    await ok("DELETE", f"/api/issues/{a['id']}/relations/{same['id']}", 204)
    # Deleted from the other side: still names both projects.
    await ok("DELETE", f"/api/issues/{elsewhere['id']}/relations/{across['id']}", 204)

    doc = await ok("POST", f"/api/teams/{test_team.id}/documents", 201,
                   json={"title": "d", "content": "x", "project_id": pid})
    await ok("PATCH", f"/api/documents/{doc['id']}", json={"title": "d2"})
    dc = await ok("POST", f"/api/documents/{doc['id']}/comments", 201, json={"content": "hi"})
    await ok("PATCH", f"/api/documents/{doc['id']}/comments/{dc['id']}", json={"content": "hi2"})
    await ok("DELETE", f"/api/documents/{doc['id']}/comments/{dc['id']}", 204)
    # Moved (a document of its own: the fixture's teardown re-checks every
    # tag against the rows as they end up, so nothing else names it).
    moved = await ok("POST", f"/api/teams/{test_team.id}/documents", 201,
                     json={"title": "m", "content": "x", "project_id": pid})
    await ok("PATCH", f"/api/documents/{moved['id']}", json={"project_id": test_project.id})
    team_doc = await ok("POST", f"/api/teams/{test_team.id}/documents", 201, json={"title": "t", "content": "x"})
    await ok("POST", f"/api/documents/{team_doc['id']}/comments", 201, json={"content": "hi"})

    await ok("PATCH", f"/api/sprints/{sprint['id']}", json={"name": "renamed"})
    await ok("POST", f"/api/sprints/{sprint['id']}/close")

    # Checked before the deletes below remove the rows they are about.
    seen = [message for _team, message in captured_broadcasts]
    assert await assert_tagged(seen) >= 30

    await ok("DELETE", f"/api/issues/{b['id']}", 204)
    await ok("DELETE", f"/api/documents/{moved['id']}", 204)
    await ok("DELETE", f"/api/projects/{pid}", 204)

    messages = [message for _team, message in captured_broadcasts]
    kinds = {(m["entity"], m["type"]) for m in messages}
    for want in [
        ("project", "created"), ("project", "updated"), ("project", "deleted"),
        ("sprint", "created"), ("sprint", "updated"), ("sprint", "closed"),
        ("issue", "created"), ("issue", "updated"), ("issue", "deleted"), ("activity", "created"),
        ("comment", "created"), ("comment", "updated"), ("comment", "deleted"),
        ("relation", "created"), ("relation", "deleted"),
        ("document", "created"), ("document", "updated"), ("document", "deleted"),
    ]:
        assert want in kinds, want
    # Tags that the database can no longer confirm once the rows are gone.
    tail = messages[len(seen):]
    assert [m["project_id"] for m in tail if m["entity"] == "issue"] == [pid]
    assert [m["project_id"] for m in tail if m["entity"] == "document"] == [test_project.id]
    assert [m["project_id"] for m in tail if m["entity"] == "project"] == [pid]
    # The move: a removal for the project it left, then the update.
    left = [m for m in messages if m.get("confined_only")]
    assert [(m["type"], m["project_id"]) for m in left] == [("deleted", pid)]
    relations = [m for m in messages if m["entity"] == "relation"]
    assert [m["project_ids"] for m in relations] == [
        [pid, pid], [pid, test_project.id], [pid, pid], [pid, test_project.id],
    ]
    # The team document and its comment are team-level.
    assert [m["project_id"] for m in messages if m["data"].get("document_id") == team_doc["id"]] == [None]
