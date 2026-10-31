"""Epic progress batch endpoint (CHT-1902)."""
import pytest

from app.enums import SprintStatus


async def _create(client, headers, project_id, **fields):
    body = {"title": fields.pop("title", "A ticket"), **fields}
    r = await client.post(f"/api/projects/{project_id}/issues", headers=headers, json=body)
    assert r.status_code in (200, 201), r.text
    return r.json()


async def _patch(client, headers, issue_id, **fields):
    r = await client.patch(f"/api/issues/{issue_id}", headers=headers, json=fields)
    assert r.status_code == 200, r.text
    return r.json()


async def _active_sprint(project_id, name="Sprint 1"):
    from datetime import datetime, timezone
    from app.oxyde_models.sprint import OxydeSprint
    await OxydeSprint.objects.filter(project_id=project_id, status=SprintStatus.ACTIVE).update(
        status=SprintStatus.COMPLETED, closed_at=datetime.now(timezone.utc),
    )
    return await OxydeSprint.objects.create(
        project_id=project_id, name=name, status=SprintStatus.ACTIVE,
        activated_at=datetime.now(timezone.utc),
    )


@pytest.mark.asyncio
async def test_progress_counts_points_and_sprint_ticks(client, interactive_headers, test_project, db):
    h = interactive_headers
    await _active_sprint(test_project.id, "Sprint 1")
    epic = await _create(client, h, test_project.id, title="Goal", issue_type="epic")
    a = await _create(client, h, test_project.id, title="A", parent_id=epic["id"], estimate=3)
    b = await _create(client, h, test_project.id, title="B", parent_id=epic["id"])
    task = await _create(client, h, test_project.id, title="Task", parent_id=epic["id"])
    nested = await _create(client, h, test_project.id, title="Nested", parent_id=task["id"], estimate=2)
    dropped = await _create(client, h, test_project.id, title="Dropped", parent_id=epic["id"], estimate=8)
    loose = await _create(client, h, test_project.id, title="Loose")
    await _create(client, h, test_project.id, title="Loose open")

    await _patch(client, h, a["id"], status="done")          # 3 pts in Sprint 1
    await _active_sprint(test_project.id, "Sprint 2")
    await _patch(client, h, nested["id"], status="done")     # 2 pts in Sprint 2, nested under task
    await _patch(client, h, b["id"], status="in_progress")
    await _patch(client, h, dropped["id"], status="canceled")
    await _patch(client, h, loose["id"], status="done")      # untracked, 1 pt in Sprint 2

    r = await client.get(f"/api/projects/{test_project.id}/epics", headers=h)
    assert r.status_code == 200, r.text
    data = r.json()
    [row] = data["epics"]
    assert row["identifier"] == epic["identifier"]
    assert row["status"] == "in_progress"
    c = row["children"]
    assert (c["total"], c["done"], c["in_progress"], c["canceled"], c["backlog"]) == (5, 2, 1, 1, 1)
    assert row["open_children"] == 2
    # 3 + 1 (B unestimated) + 1 (task unestimated) + 2; canceled excluded.
    assert row["points_total"] == 7
    assert row["points_done"] == 5
    assert row["closed_this_sprint"] == 1 and row["points_this_sprint"] == 2
    assert [(t["name"], t["closed"], t["points"]) for t in row["sprints"]] == [
        ("Sprint 1", 1, 3), ("Sprint 2", 1, 2),
    ]
    assert row["sprints"][-1]["status"] == "active"

    [untracked] = data["untracked"]
    assert untracked["project_key"] == test_project.key
    assert untracked["open"] == 1
    assert untracked["closed_this_sprint"] == 1 and untracked["points_this_sprint"] == 1


@pytest.mark.asyncio
async def test_nested_epic_owns_its_own_children(client, interactive_headers, test_project, db):
    h = interactive_headers
    outer = await _create(client, h, test_project.id, title="Outer", issue_type="epic")
    inner = await _create(client, h, test_project.id, title="Inner", issue_type="epic", parent_id=outer["id"])
    await _create(client, h, test_project.id, title="Leaf", parent_id=inner["id"])
    data = (await client.get(f"/api/projects/{test_project.id}/epics", headers=h)).json()
    by_id = {e["identifier"]: e for e in data["epics"]}
    assert by_id[outer["identifier"]]["children"]["total"] == 1   # the inner epic
    assert by_id[inner["identifier"]]["children"]["total"] == 1   # the leaf


@pytest.mark.asyncio
async def test_team_scope_spans_projects(client, interactive_headers, test_project, test_team, db):
    h = interactive_headers
    r = await client.post(f"/api/teams/{test_team.id}/projects", headers=h, json={"name": "Other", "key": "OTH"})
    other = r.json()
    await _create(client, h, test_project.id, title="Here", issue_type="epic")
    await _create(client, h, other["id"], title="There", issue_type="epic")
    data = (await client.get(f"/api/teams/{test_team.id}/epics", headers=h)).json()
    assert {e["project_key"] for e in data["epics"]} == {test_project.key, "OTH"}
    assert {u["project_key"] for u in data["untracked"]} == {test_project.key, "OTH"}


@pytest.mark.asyncio
async def test_sprint_window_bounds(client, interactive_headers, test_project, db):
    h = interactive_headers
    for n in range(4):
        await _active_sprint(test_project.id, f"S{n}")
    await _create(client, h, test_project.id, title="Goal", issue_type="epic")
    data = (await client.get(f"/api/projects/{test_project.id}/epics?sprint_window=2", headers=h)).json()
    assert [t["name"] for t in data["epics"][0]["sprints"]] == ["S2", "S3"]
    r = await client.get(f"/api/projects/{test_project.id}/epics?sprint_window=0", headers=h)
    assert r.status_code == 422


@pytest.mark.asyncio
async def test_empty_project(client, interactive_headers, test_project, db):
    data = (await client.get(f"/api/projects/{test_project.id}/epics", headers=interactive_headers)).json()
    assert data["epics"] == []
    assert data["untracked"][0]["open"] == 0
