"""Derived epic status and the last-child prompt (CHT-1901, CHT-1884).

An open, unpinned epic's status follows its children: in_progress once any
child is in progress, in review or done; todo when any child is todo; else
backlog. It never closes itself. Setting its status by hand pins it;
`status_follows_children: true` unpins it.
"""
import pytest


async def _create(client, headers, project_id, **fields):
    body = {"title": fields.pop("title", "A ticket"), **fields}
    r = await client.post(f"/api/projects/{project_id}/issues", headers=headers, json=body)
    assert r.status_code in (200, 201), r.text
    return r.json()


async def _patch(client, headers, issue_id, **fields):
    r = await client.patch(f"/api/issues/{issue_id}", headers=headers, json=fields)
    assert r.status_code == 200, r.text
    return r.json()


async def _status(client, headers, issue_id):
    r = await client.get(f"/api/issues/{issue_id}", headers=headers)
    return r.json()["status"]


@pytest.mark.asyncio
async def test_epic_follows_children(client, interactive_headers, test_project, db):
    h = interactive_headers
    epic = await _create(client, h, test_project.id, title="Goal", issue_type="epic")
    assert epic["status"] == "backlog" and epic["status_pinned"] is False

    a = await _create(client, h, test_project.id, title="A", parent_id=epic["id"], status="todo")
    assert await _status(client, h, epic["id"]) == "todo"

    b = await _create(client, h, test_project.id, title="B", parent_id=epic["id"])
    await _patch(client, h, b["id"], status="in_progress")
    assert await _status(client, h, epic["id"]) == "in_progress"

    await _patch(client, h, b["id"], status="in_review")
    assert await _status(client, h, epic["id"]) == "in_progress"

    # Back to nothing started: back to todo.
    await _patch(client, h, b["id"], status="backlog")
    assert await _status(client, h, epic["id"]) == "todo"

    # A done child counts as started work.
    await _patch(client, h, a["id"], status="done")
    assert await _status(client, h, epic["id"]) == "in_progress"

    # Every child closed: still in progress, never auto-closed.
    await _patch(client, h, b["id"], status="done")
    assert await _status(client, h, epic["id"]) == "in_progress"


@pytest.mark.asyncio
async def test_reparenting_rederives_both_epics(client, interactive_headers, test_project, db):
    h = interactive_headers
    one = await _create(client, h, test_project.id, title="One", issue_type="epic")
    two = await _create(client, h, test_project.id, title="Two", issue_type="epic")
    child = await _create(client, h, test_project.id, parent_id=one["id"], status="todo")
    await _patch(client, h, child["id"], status="in_progress")
    assert await _status(client, h, one["id"]) == "in_progress"

    await _patch(client, h, child["id"], parent_id=two["id"])
    assert await _status(client, h, one["id"]) == "backlog"
    assert await _status(client, h, two["id"]) == "in_progress"


@pytest.mark.asyncio
async def test_deleting_the_active_child_rederives(client, interactive_headers, test_project, db):
    h = interactive_headers
    epic = await _create(client, h, test_project.id, title="Goal", issue_type="epic")
    child = await _create(client, h, test_project.id, parent_id=epic["id"], status="in_progress")
    assert await _status(client, h, epic["id"]) == "in_progress"
    r = await client.delete(f"/api/issues/{child['id']}", headers=h)
    assert r.status_code in (200, 204)
    assert await _status(client, h, epic["id"]) == "backlog"


@pytest.mark.asyncio
async def test_hand_set_status_pins_and_follow_unpins(client, interactive_headers, test_project, db):
    h = interactive_headers
    epic = await _create(client, h, test_project.id, title="Goal", issue_type="epic")
    pinned = await _patch(client, h, epic["id"], status="todo")
    assert pinned["status_pinned"] is True

    child = await _create(client, h, test_project.id, parent_id=epic["id"])
    await _patch(client, h, child["id"], status="in_progress")
    assert await _status(client, h, epic["id"]) == "todo"  # pinned

    followed = await _patch(client, h, epic["id"], status_follows_children=True)
    assert followed["status_pinned"] is False
    assert followed["status"] == "in_progress"


@pytest.mark.asyncio
async def test_status_and_follow_together_is_refused(client, interactive_headers, test_project, db):
    epic = await _create(client, interactive_headers, test_project.id, title="Goal", issue_type="epic")
    r = await client.patch(
        f"/api/issues/{epic['id']}", headers=interactive_headers,
        json={"status": "todo", "status_follows_children": True},
    )
    assert r.status_code == 422


@pytest.mark.asyncio
async def test_epic_created_with_a_status_is_pinned(client, interactive_headers, test_project, db):
    epic = await _create(client, interactive_headers, test_project.id, title="Goal", issue_type="epic", status="todo")
    assert epic["status_pinned"] is True


@pytest.mark.asyncio
async def test_non_epic_parent_is_not_derived(client, interactive_headers, test_project, db):
    h = interactive_headers
    task = await _create(client, h, test_project.id, title="Task")
    child = await _create(client, h, test_project.id, parent_id=task["id"])
    await _patch(client, h, child["id"], status="in_progress")
    assert await _status(client, h, task["id"]) == "backlog"


@pytest.mark.asyncio
async def test_closed_epic_is_not_reopened(client, interactive_headers, test_project, db):
    h = interactive_headers
    epic = await _create(client, h, test_project.id, title="Goal", issue_type="epic")
    await _patch(client, h, epic["id"], status="done")
    await _create(client, h, test_project.id, parent_id=epic["id"], status="in_progress")
    assert await _status(client, h, epic["id"]) == "done"


@pytest.mark.asyncio
async def test_promoting_to_epic_takes_the_derived_status(client, interactive_headers, test_project, db):
    h = interactive_headers
    task = await _create(client, h, test_project.id, title="Grew children")
    await _create(client, h, test_project.id, parent_id=task["id"], status="in_progress")
    promoted = await _patch(client, h, task["id"], issue_type="epic")
    assert promoted["status"] == "in_progress"


@pytest.mark.asyncio
async def test_derived_change_is_logged(client, interactive_headers, test_project, db):
    h = interactive_headers
    epic = await _create(client, h, test_project.id, title="Goal", issue_type="epic")
    await _create(client, h, test_project.id, parent_id=epic["id"], status="in_progress")
    acts = (await client.get(f"/api/issues/{epic['id']}/activities", headers=h)).json()
    rows = [a for a in acts if a.get("field_name") == "status"]
    assert rows and rows[0]["new_value"] in ("IN_PROGRESS", "in_progress")


@pytest.mark.asyncio
async def test_lease_expiry_rederives(test_project, test_user, db):
    from datetime import datetime, timedelta, timezone
    from app.enums import IssueStatus, IssueType
    from app.oxyde_models.issue import OxydeIssue
    from app.schemas.issue import IssueCreate
    from app.services.issue_service import IssueService
    from app.oxyde_models.project import OxydeProject

    svc = IssueService()
    project = await OxydeProject.objects.get(id=test_project.id)
    epic = await svc.create(IssueCreate(title="Goal", issue_type=IssueType.EPIC), project, test_user.id)
    child = await svc.create(
        IssueCreate(title="c", parent_id=epic.id, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id),
        project, test_user.id,
    )
    assert (await svc.get_by_id(epic.id)).status == IssueStatus.IN_PROGRESS
    await OxydeIssue.objects.filter(id=child.id).update(
        lease_expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
    )
    released = await svc.release_lease_if_expired(await svc.get_by_id(child.id))
    assert released.status == IssueStatus.TODO
    assert (await svc.get_by_id(epic.id)).status == IssueStatus.TODO


# --- the last-child prompt and the open-children warning --------------------


@pytest.mark.asyncio
async def test_closing_the_last_open_child_prompts(client, interactive_headers, test_project, db):
    h = interactive_headers
    epic = await _create(client, h, test_project.id, title="Goal", issue_type="epic")
    a = await _create(client, h, test_project.id, title="A", parent_id=epic["id"])
    b = await _create(client, h, test_project.id, title="B", parent_id=epic["id"])

    first = await _patch(client, h, a["id"], status="done")
    assert first["parent_prompt"] is None

    last = await _patch(client, h, b["id"], status="canceled")
    prompt = last["parent_prompt"]
    assert prompt["identifier"] == epic["identifier"]
    assert prompt["id"] == epic["id"]
    assert "last open ticket" in prompt["message"]

    # Non-closing updates never prompt.
    again = await _patch(client, h, b["id"], title="B renamed")
    assert again["parent_prompt"] is None


@pytest.mark.asyncio
async def test_no_prompt_under_a_closed_parent(client, interactive_headers, test_project, db):
    h = interactive_headers
    epic = await _create(client, h, test_project.id, title="Goal", issue_type="epic")
    child = await _create(client, h, test_project.id, parent_id=epic["id"])
    closed = await _patch(client, h, epic["id"], status="done")
    assert closed["open_children"]["count"] == 1
    assert closed["open_children"]["identifiers"] == [child["identifier"]]
    r = await _patch(client, h, child["id"], status="done")
    assert r["parent_prompt"] is None


@pytest.mark.asyncio
async def test_closing_a_parent_with_no_open_children_has_no_warning(client, interactive_headers, test_project, db):
    h = interactive_headers
    epic = await _create(client, h, test_project.id, title="Goal", issue_type="epic")
    child = await _create(client, h, test_project.id, parent_id=epic["id"])
    await _patch(client, h, child["id"], status="done")
    closed = await _patch(client, h, epic["id"], status="done")
    assert closed["open_children"] is None


def test_migration_0042_backfill(tmp_path):
    """0042 pins hand-moved open epics and derives the rest from their
    children; closed epics and non-epics are untouched."""
    import sqlite3
    from contextlib import closing
    from .test_parent_user_fk_migration import _migrate

    path = str(tmp_path / "pinned.db")
    _migrate(path, target="0041_project_epic_and_assignee_knobs")
    rows = [
        # id, type, status, parent
        ("e-idle", "EPIC", "BACKLOG", None),
        ("e-started", "EPIC", "BACKLOG", None),
        ("e-planned", "EPIC", "BACKLOG", None),
        ("e-hand", "EPIC", "TODO", None),
        ("e-already", "EPIC", "IN_PROGRESS", None),
        ("e-done", "EPIC", "DONE", None),
        ("t-parent", "TASK", "BACKLOG", None),
        ("c1", "TASK", "IN_REVIEW", "e-started"),
        ("c2", "TASK", "TODO", "e-planned"),
        ("c3", "TASK", "IN_PROGRESS", "e-hand"),
        ("c4", "TASK", "IN_PROGRESS", "e-done"),
        ("c5", "TASK", "IN_PROGRESS", "t-parent"),
        ("c6", "TASK", "CANCELED", "e-idle"),
        ("c7", "TASK", "IN_REVIEW", "e-already"),
    ]
    with closing(sqlite3.connect(path)) as c:
        for n, (iid, typ, status, parent) in enumerate(rows, start=1):
            c.execute(
                "INSERT INTO issues (id, project_id, identifier, number, title, status, priority, "
                "issue_type, parent_id, created_at, updated_at) VALUES (?, 'p1', ?, ?, ?, ?, "
                "'NO_PRIORITY', ?, ?, '2026-10-01 00:00:00', '2026-10-01 00:00:00')",
                (iid, f"P-{n}", n, iid, status, typ, parent),
            )
        c.commit()
    _migrate(path, target="0042_epic_status_pinned")
    with closing(sqlite3.connect(path)) as c:
        got = {r[0]: (r[1], r[2]) for r in c.execute("SELECT id, status, status_pinned FROM issues")}
    assert got["e-idle"] == ("BACKLOG", 0)
    assert got["e-started"] == ("IN_PROGRESS", 0)
    assert got["e-planned"] == ("TODO", 0)
    assert got["e-hand"] == ("TODO", 1)
    assert got["e-already"] == ("IN_PROGRESS", 0)
    assert got["e-done"] == ("DONE", 0)
    assert got["t-parent"] == ("BACKLOG", 0)


@pytest.mark.asyncio
async def test_nested_epics_propagate(client, interactive_headers, test_project, db):
    h = interactive_headers
    outer = await _create(client, h, test_project.id, title="Outer", issue_type="epic")
    inner = await _create(client, h, test_project.id, title="Inner", issue_type="epic", parent_id=outer["id"])
    task = await _create(client, h, test_project.id, title="Task", parent_id=inner["id"])
    await _patch(client, h, task["id"], status="in_progress")
    assert await _status(client, h, inner["id"]) == "in_progress"
    assert await _status(client, h, outer["id"]) == "in_progress"


@pytest.mark.asyncio
async def test_leaving_epic_drops_the_pin(client, interactive_headers, test_project, db):
    h = interactive_headers
    epic = await _create(client, h, test_project.id, title="Goal", issue_type="epic")
    await _patch(client, h, epic["id"], status="todo")
    await _patch(client, h, epic["id"], issue_type="task")
    await _create(client, h, test_project.id, parent_id=epic["id"], status="in_progress")
    again = await _patch(client, h, epic["id"], issue_type="epic")
    assert again["status_pinned"] is False
    assert again["status"] == "in_progress"
