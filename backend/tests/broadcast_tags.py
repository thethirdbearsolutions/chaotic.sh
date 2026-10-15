"""Check that a /ws envelope says who may hear it, correctly (CHT-1840).

The manager filters each broadcast per socket by the envelope's
``project_id`` (``project_ids`` for a relation) and ``recipient_user_id``
(``app.websocket.ConnectionManager._may_receive``). A call site that tags
its event with no project, or with the wrong one, would starve or leak
to sockets confined to a project, and nothing about a team-wide socket
would show it. ``expected_routing`` works out, from the payload and the
database, what the tag must be; ``assert_tagged`` compares. It runs on
everything the ``captured_broadcasts`` fixture captures, and on the REST
walk in ``test_ws_broadcast_tags.py``.
"""
from __future__ import annotations

from app.oxyde_models.document import OxydeDocument
from app.oxyde_models.issue import OxydeIssue
from app.oxyde_models.ritual import OxydeRitual
from app.oxyde_models.sprint import OxydeSprint

UNKNOWN = object()  # the row is gone (deleted since): nothing to compare


async def _project_of(model, row_id):
    if not row_id:
        return UNKNOWN
    row = await model.objects.get_or_none(id=row_id)
    return UNKNOWN if row is None else row.project_id


async def expected_project(message: dict):
    """The project ``message`` must be tagged with, None for a team-level
    one, or UNKNOWN when its row is gone."""
    entity, data = message["entity"], message["data"]
    if entity == "project":
        return data["id"]
    if entity == "issue":
        return data["project_id"] if "project_id" in data else await _project_of(OxydeIssue, data.get("id"))
    if entity == "sprint":
        return data["project_id"] if "project_id" in data else await _project_of(OxydeSprint, data.get("sprint_id"))
    if entity == "document":
        if message.get("confined_only"):
            return UNKNOWN  # tagged with the project it left, by design
        return data["project_id"] if "project_id" in data else await _project_of(OxydeDocument, data.get("id"))
    if entity in ("comment", "activity", "attestation"):
        if data.get("issue_id"):
            return await _project_of(OxydeIssue, data["issue_id"])
        if data.get("document_id"):
            return await _project_of(OxydeDocument, data["document_id"])
        if data.get("sprint_id"):
            return await _project_of(OxydeSprint, data["sprint_id"])
        if data.get("ritual_id"):
            return await _project_of(OxydeRitual, data["ritual_id"])
        return UNKNOWN
    raise AssertionError(f"no tag rule for entity {entity!r}: add one here (CHT-1840)")


async def assert_tagged(messages: list[dict]) -> int:
    """Assert each message is routed as its payload requires. Returns
    how many were checked against a row (the rest had no row left)."""
    checked = 0
    for message in messages:
        assert "project_id" in message, message
        entity, data = message["entity"], message["data"]
        if entity == "inbox":
            assert message.get("recipient_user_id") == data["recipient_user_id"], message
            assert message["recipient_user_id"], message
            continue
        if entity == "relation":
            expected = [
                await _project_of(OxydeIssue, data["source_issue_id"]),
                await _project_of(OxydeIssue, data["target_issue_id"]),
            ]
            assert len(message["project_ids"]) == 2, message
            for want, got in zip(expected, message["project_ids"]):
                if want is not UNKNOWN:
                    assert got == want, message
                    checked += 1
            # Some issue's project is always known: a relation's issues
            # outlive its delete broadcast, and the route's issue exists.
            assert any(p is not None for p in message["project_ids"]), message
            continue
        want = await expected_project(message)
        if entity != "document":
            # Only a document (or its comments) can be team-level.
            assert message["project_id"] is not None or (
                entity == "comment" and "document_id" in data
            ), message
        if want is UNKNOWN:
            continue
        assert message["project_id"] == want, message
        checked += 1
    return checked
