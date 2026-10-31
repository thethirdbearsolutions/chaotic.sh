"""An open parent left with no open sub-issues by a path nobody was asked
on gets an inbox entry for its owner (CHT-1909): a cleared intent's
auto-close, or a delete. A PATCH close asks its caller instead
(parent_prompt), so it writes no entry."""
import pytest

from app.enums import InboxEntryKind, IssueStatus, LimboType
from app.oxyde_models.inbox import OxydeInboxEntry
from app.services.issue_service import IssueService


async def _create(client, headers, project_id, **fields):
    body = {"title": fields.pop("title", "A ticket"), **fields}
    r = await client.post(f"/api/projects/{project_id}/issues", headers=headers, json=body)
    assert r.status_code in (200, 201), r.text
    return r.json()


async def _entries(issue_id, **filters):
    return await OxydeInboxEntry.objects.filter(
        issue_id=issue_id, kind=InboxEntryKind.CHILDREN_CLOSED.name, **filters,
    ).all()


async def _epic_with_child(client, auth_headers, test_project):
    epic = await _create(client, auth_headers, test_project.id, title="The goal", issue_type="epic")
    child = await _create(client, auth_headers, test_project.id, title="Last step", parent_id=epic["id"])
    return epic, child


@pytest.mark.asyncio
async def test_intent_closing_the_last_child_tells_the_epic_owner(client, auth_headers, test_project, test_user, agent_user, db):
    epic, child = await _epic_with_child(client, auth_headers, test_project)
    await IssueService().apply_intent_transition(child["id"], LimboType.CLOSE, agent_user.id)
    entries = await _entries(epic["id"])
    assert [e.recipient_user_id for e in entries] == [test_user.id]
    assert epic["identifier"] in entries[0].title
    assert "gate cleared" in entries[0].body
    assert entries[0].source_user_id == agent_user.id


@pytest.mark.asyncio
async def test_no_entry_while_another_child_is_open(client, auth_headers, test_project, agent_user, db):
    epic, child = await _epic_with_child(client, auth_headers, test_project)
    await _create(client, auth_headers, test_project.id, title="Still open", parent_id=epic["id"])
    await IssueService().apply_intent_transition(child["id"], LimboType.CLOSE, agent_user.id)
    assert await _entries(epic["id"]) == []


@pytest.mark.asyncio
async def test_a_patch_close_writes_no_entry(client, auth_headers, test_project, db):
    epic, child = await _epic_with_child(client, auth_headers, test_project)
    r = await client.patch(f"/api/issues/{child['id']}", headers=auth_headers, json={"status": "done"})
    assert r.status_code == 200, r.text
    assert r.json()["parent_prompt"]["identifier"] == epic["identifier"]
    assert await _entries(epic["id"]) == []


@pytest.mark.asyncio
async def test_deleting_the_last_open_child_tells_the_owner(client, auth_headers, agent_headers, test_project, test_user, db):
    epic, child = await _epic_with_child(client, auth_headers, test_project)
    r = await client.delete(f"/api/issues/{child['id']}", headers=agent_headers)
    assert r.status_code == 204, r.text
    entries = await _entries(epic["id"])
    assert [e.recipient_user_id for e in entries] == [test_user.id]
    assert "was deleted" in entries[0].body


@pytest.mark.asyncio
async def test_nobody_is_told_about_their_own_delete(client, auth_headers, test_project, db):
    epic, child = await _epic_with_child(client, auth_headers, test_project)
    assert (await client.delete(f"/api/issues/{child['id']}", headers=auth_headers)).status_code == 204
    assert await _entries(epic["id"]) == []


@pytest.mark.asyncio
async def test_deleting_a_closed_child_writes_no_entry(client, auth_headers, agent_headers, test_project, db):
    epic, child = await _epic_with_child(client, auth_headers, test_project)
    other = await _create(client, auth_headers, test_project.id, title="Done already", parent_id=epic["id"])
    assert (await client.patch(f"/api/issues/{other['id']}", headers=auth_headers, json={"status": "done"})).status_code == 200
    # The open child is still there; deleting the closed one changes nothing.
    assert (await client.delete(f"/api/issues/{other['id']}", headers=agent_headers)).status_code == 204
    assert await _entries(epic["id"]) == []


@pytest.mark.asyncio
async def test_assignee_is_told_rather_than_creator(client, auth_headers, agent_headers, test_project, test_user, agent_user, db):
    epic, child = await _epic_with_child(client, auth_headers, test_project)
    # Assigned to an agent whose owner is the test user: both are told,
    # unless one of them made the change.
    from app.oxyde_models.user import OxydeUser
    await OxydeUser.objects.filter(id=agent_user.id).update(parent_user_id=test_user.id)
    assert (await client.patch(f"/api/issues/{epic['id']}", headers=auth_headers,
                               json={"assignee_id": agent_user.id})).status_code == 200
    await IssueService().apply_intent_transition(child["id"], LimboType.CLOSE, None)
    assert sorted(e.recipient_user_id for e in await _entries(epic["id"])) == sorted([agent_user.id, test_user.id])


@pytest.mark.asyncio
async def test_one_open_entry_per_recipient(client, auth_headers, test_project, test_user, agent_user, db):
    epic, child = await _epic_with_child(client, auth_headers, test_project)
    await IssueService().apply_intent_transition(child["id"], LimboType.CLOSE, agent_user.id)
    # Reopen and close again by intent: still one open entry.
    issue = await IssueService().get_by_id(child["id"])
    from app.schemas.issue import IssueUpdate
    await IssueService().update(issue, IssueUpdate(status=IssueStatus.TODO), user_id=test_user.id)
    await IssueService().apply_intent_transition(child["id"], LimboType.CLOSE, agent_user.id)
    assert len(await _entries(epic["id"], resolved_at=None)) == 1


@pytest.mark.asyncio
async def test_entry_resolves_when_the_epic_closes(client, auth_headers, test_project, agent_user, db):
    epic, child = await _epic_with_child(client, auth_headers, test_project)
    await IssueService().apply_intent_transition(child["id"], LimboType.CLOSE, agent_user.id)
    assert len(await _entries(epic["id"], resolved_at=None)) == 1
    assert (await client.patch(f"/api/issues/{epic['id']}", headers=auth_headers, json={"status": "done"})).status_code == 200
    assert await _entries(epic["id"], resolved_at=None) == []


@pytest.mark.asyncio
async def test_entry_resolves_when_more_work_is_added(client, auth_headers, test_project, agent_user, db):
    epic, child = await _epic_with_child(client, auth_headers, test_project)
    await IssueService().apply_intent_transition(child["id"], LimboType.CLOSE, agent_user.id)
    assert len(await _entries(epic["id"], resolved_at=None)) == 1
    await _create(client, auth_headers, test_project.id, title="One more", parent_id=epic["id"])
    assert await _entries(epic["id"], resolved_at=None) == []


@pytest.mark.asyncio
async def test_a_closed_epic_is_not_asked_about(client, auth_headers, test_project, agent_user, db):
    epic, child = await _epic_with_child(client, auth_headers, test_project)
    assert (await client.patch(f"/api/issues/{epic['id']}", headers=auth_headers, json={"status": "done"})).status_code == 200
    await IssueService().apply_intent_transition(child["id"], LimboType.CLOSE, agent_user.id)
    assert await _entries(epic["id"]) == []
