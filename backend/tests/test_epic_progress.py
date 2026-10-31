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


@pytest.mark.asyncio
async def test_a_reclosed_ticket_counts_once_per_sprint(client, interactive_headers, test_project, db):
    """Review of CHT-1902: the budget is charged per close, progress is
    made once. A ticket closed, reopened and closed again in one sprint
    is one ticket and its points once."""
    h = interactive_headers
    await _active_sprint(test_project.id)
    epic = await _create(client, h, test_project.id, title="Goal", issue_type="epic")
    child = await _create(client, h, test_project.id, title="C", parent_id=epic["id"], estimate=3)
    await _patch(client, h, child["id"], status="done")
    await _patch(client, h, child["id"], status="todo")
    await _patch(client, h, child["id"], status="done")

    [row] = (await client.get(f"/api/projects/{test_project.id}/epics", headers=h)).json()["epics"]
    assert row["points_done"] == 3
    assert (row["closed_this_sprint"], row["points_this_sprint"]) == (1, 3)
    assert [(t["closed"], t["points"]) for t in row["sprints"]] == [(1, 3)]


@pytest.mark.asyncio
async def test_an_epic_close_counts_toward_the_epic_above_it(client, interactive_headers, test_project, db):
    """Ticks follow the counts' rule: a close counts toward the nearest
    epic ancestor. A nested epic's own close is the outer epic's; a
    top-level epic's own close is untracked, never more than its total."""
    h = interactive_headers
    await _active_sprint(test_project.id)
    outer = await _create(client, h, test_project.id, title="Outer", issue_type="epic")
    inner = await _create(client, h, test_project.id, title="Inner", issue_type="epic", parent_id=outer["id"], estimate=2)
    leaf = await _create(client, h, test_project.id, title="Leaf", parent_id=inner["id"], estimate=3)
    await _patch(client, h, leaf["id"], status="done")
    await _patch(client, h, inner["id"], status="done")
    await _patch(client, h, outer["id"], status="done")

    data = (await client.get(f"/api/projects/{test_project.id}/epics", headers=h)).json()
    rows = {e["title"]: e for e in data["epics"]}
    assert (rows["Inner"]["closed_this_sprint"], rows["Inner"]["points_this_sprint"]) == (1, 3)
    assert (rows["Outer"]["closed_this_sprint"], rows["Outer"]["points_this_sprint"]) == (1, 2)
    assert rows["Outer"]["points_total"] == 2
    [untracked] = data["untracked"]
    assert untracked["closed_this_sprint"] == 1


@pytest.mark.asyncio
async def test_sprints_without_activated_at_run_oldest_first(client, interactive_headers, test_project, db):
    """Migration 0016 nulled activated_at on sprints that ran before it;
    they order by when they were made, before the active sprint."""
    from datetime import datetime, timedelta, timezone
    from app.oxyde_models.sprint import OxydeSprint

    base = datetime(2026, 1, 1, tzinfo=timezone.utc)
    for n in range(3):
        await OxydeSprint.objects.create(
            project_id=test_project.id, name=f"Old{n}", status=SprintStatus.COMPLETED,
            activated_at=None, created_at=base + timedelta(days=n),
        )
    await OxydeSprint.objects.create(
        project_id=test_project.id, name="Cur", status=SprintStatus.ACTIVE,
        activated_at=base + timedelta(days=10), created_at=base + timedelta(days=9),
    )
    await _create(client, interactive_headers, test_project.id, title="Goal", issue_type="epic")
    [row] = (await client.get(f"/api/projects/{test_project.id}/epics", headers=interactive_headers)).json()["epics"]
    assert [t["name"] for t in row["sprints"]] == ["Old0", "Old1", "Old2", "Cur"]


@pytest.mark.asyncio
async def test_a_hand_set_status_is_reported(client, interactive_headers, test_project, db):
    h = interactive_headers
    epic = await _create(client, h, test_project.id, title="Goal", issue_type="epic")
    await _patch(client, h, epic["id"], status="todo")
    [row] = (await client.get(f"/api/projects/{test_project.id}/epics", headers=h)).json()["epics"]
    assert row["status"] == "todo" and row["status_pinned"] is True


# --- CHT-1922: counts computed in SQL match the per-issue walk -------------

def _reference_counts(rows):
    """The per-issue walk epic_progress did in Python before CHT-1922:
    each issue's nearest epic ancestor, a cycle or a missing parent ending
    the walk with none."""
    by_id = {r["id"]: r for r in rows}
    counts, untracked_open = {}, 0
    for r in rows:
        seen, cur, owner = set(), r["parent_id"], None
        while cur is not None and cur in by_id and cur not in seen:
            seen.add(cur)
            if by_id[cur]["epic"]:
                owner = cur
                break
            cur = by_id[cur]["parent_id"]
        if owner is None:
            if not r["epic"] and r["status"] in ("backlog", "todo", "in_progress", "in_review"):
                untracked_open += 1
            continue
        c = counts.setdefault(owner, {"total": 0, "done": 0, "canceled": 0, "pts": 0, "pts_done": 0})
        c["total"] += 1
        if r["status"] in ("done", "canceled"):
            c[r["status"]] += 1
        if r["status"] != "canceled":
            pts = r["estimate"] if r["estimate"] is not None else 1
            c["pts"] += pts
            if r["status"] == "done":
                c["pts_done"] += pts
    return counts, untracked_open


@pytest.mark.asyncio
async def test_sql_counts_match_the_walk_on_a_random_forest(test_project, test_user, db):
    import random
    from app.enums import IssueStatus, IssueType
    from app.oxyde_models.issue import OxydeIssue
    from app.services.epic_progress import epic_progress

    rng = random.Random(1922)
    statuses = list(IssueStatus)
    rows = []
    for n in range(1, 121):
        parent = rng.choice(rows)["id"] if rows and rng.random() < 0.8 else None
        epic = rng.random() < 0.15
        status = rng.choice(statuses)
        estimate = rng.choice([None, 1, 2, 4])
        issue = await OxydeIssue.objects.create(
            project_id=test_project.id, identifier=f"{test_project.key}-{n}", number=n,
            title=f"Issue {n}", status=status, estimate=estimate, parent_id=parent,
            issue_type=IssueType.EPIC if epic else IssueType.TASK, creator_id=test_user.id,
        )
        rows.append({"id": issue.id, "parent_id": parent, "epic": epic,
                     "status": status.value, "estimate": estimate})
    # A two-issue cycle with no epic in it: untracked, and the walk ends.
    a, b = rows[-1], rows[-2]
    await OxydeIssue.objects.filter(id=a["id"]).update(parent_id=b["id"], issue_type=IssueType.TASK)
    await OxydeIssue.objects.filter(id=b["id"]).update(parent_id=a["id"], issue_type=IssueType.TASK)
    a.update(parent_id=b["id"], epic=False)
    b.update(parent_id=a["id"], epic=False)

    expected, expected_untracked = _reference_counts(rows)
    got = await epic_progress([test_project.id])
    by_id = {e.id: e for e in got.epics}
    assert set(by_id) == {r["id"] for r in rows if r["epic"]}
    for epic_id, e in by_id.items():
        want = expected.get(epic_id, {"total": 0, "done": 0, "canceled": 0, "pts": 0, "pts_done": 0})
        assert (e.children.total, e.children.done, e.children.canceled, e.points_total, e.points_done) == (
            want["total"], want["done"], want["canceled"], want["pts"], want["pts_done"],
        ), epic_id
    [untracked] = got.untracked
    assert untracked.open == expected_untracked
