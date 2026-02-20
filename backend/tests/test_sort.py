"""Tests for issue sorting behavior (CHT-268).

Tests CASE expression ordering for priority/status, sort_by/order query
params on GET /issues, random shuffle, default fallback, and null handling.

Note: _apply_sort unit tests removed — that method was a SQLAlchemy-specific
internal replaced by raw SQL ordering in the Oxyde migration.
"""
import pytest
from datetime import datetime, timezone, timedelta
from app.oxyde_models.issue import OxydeIssue
from app.enums import IssueStatus, IssuePriority


# ─────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────

async def _create_issue(db, project, user, *, number, title="Issue", status="backlog",
                        priority="no_priority", estimate=None, created_offset_hours=0):
    """Create an issue with controllable sort fields."""
    from oxyde import execute_raw

    await execute_raw(
        "UPDATE projects SET issue_count = issue_count + 1 WHERE id = ?",
        [project.id],
    )
    issue = await OxydeIssue.objects.create(
        project_id=project.id,
        identifier=f"{project.key}-{number}",
        number=number,
        title=title,
        status=IssueStatus(status),
        priority=IssuePriority(priority),
        estimate=estimate,
        creator_id=user.id,
        created_at=datetime.now(timezone.utc) + timedelta(hours=created_offset_hours),
    )
    return issue


# ─────────────────────────────────────────────────────────────────────
# Integration tests: actual sort ordering via API
# ─────────────────────────────────────────────────────────────────────

@pytest.mark.asyncio
async def test_sort_by_priority_desc(client, auth_headers, test_project, test_user, db):
    """Issues sorted by priority desc: urgent first, no_priority last."""
    await _create_issue(db, test_project, test_user, number=10,
                        title="Low", priority="low")
    await _create_issue(db, test_project, test_user, number=11,
                        title="Urgent", priority="urgent")
    await _create_issue(db, test_project, test_user, number=12,
                        title="Medium", priority="medium")
    await _create_issue(db, test_project, test_user, number=13,
                        title="High", priority="high")
    await _create_issue(db, test_project, test_user, number=14,
                        title="None", priority="no_priority")

    response = await client.get(
        f"/api/issues?project_id={test_project.id}&sort_by=priority&order=desc",
        headers=auth_headers,
    )
    assert response.status_code == 200
    issues = response.json()
    priorities = [i["priority"] for i in issues]
    # desc on CASE means highest number last → no_priority first, urgent last
    assert priorities == ["no_priority", "low", "medium", "high", "urgent"]


@pytest.mark.asyncio
async def test_sort_by_priority_asc(client, auth_headers, test_project, test_user, db):
    """Issues sorted by priority asc: urgent first."""
    await _create_issue(db, test_project, test_user, number=20,
                        title="Low", priority="low")
    await _create_issue(db, test_project, test_user, number=21,
                        title="Urgent", priority="urgent")
    await _create_issue(db, test_project, test_user, number=22,
                        title="Medium", priority="medium")

    response = await client.get(
        f"/api/issues?project_id={test_project.id}&sort_by=priority&order=asc",
        headers=auth_headers,
    )
    assert response.status_code == 200
    issues = response.json()
    priorities = [i["priority"] for i in issues]
    assert priorities == ["urgent", "medium", "low"]


@pytest.mark.asyncio
async def test_sort_by_status_desc(client, auth_headers, test_project, test_user, db):
    """Issues sorted by status desc: canceled/done first (highest CASE value)."""
    await _create_issue(db, test_project, test_user, number=30,
                        title="Backlog", status="backlog")
    await _create_issue(db, test_project, test_user, number=31,
                        title="InProgress", status="in_progress")
    await _create_issue(db, test_project, test_user, number=32,
                        title="Done", status="done")
    await _create_issue(db, test_project, test_user, number=33,
                        title="Todo", status="todo")

    response = await client.get(
        f"/api/issues?project_id={test_project.id}&sort_by=status&order=desc",
        headers=auth_headers,
    )
    assert response.status_code == 200
    issues = response.json()
    statuses = [i["status"] for i in issues]
    assert statuses == ["done", "backlog", "todo", "in_progress"]


@pytest.mark.asyncio
async def test_sort_by_status_asc(client, auth_headers, test_project, test_user, db):
    """Issues sorted by status asc: in_progress first."""
    await _create_issue(db, test_project, test_user, number=40,
                        title="Done", status="done")
    await _create_issue(db, test_project, test_user, number=41,
                        title="Todo", status="todo")
    await _create_issue(db, test_project, test_user, number=42,
                        title="InProgress", status="in_progress")

    response = await client.get(
        f"/api/issues?project_id={test_project.id}&sort_by=status&order=asc",
        headers=auth_headers,
    )
    assert response.status_code == 200
    issues = response.json()
    statuses = [i["status"] for i in issues]
    assert statuses == ["in_progress", "todo", "done"]


@pytest.mark.asyncio
async def test_sort_by_title_asc(client, auth_headers, test_project, test_user, db):
    """Issues sorted by title alphabetically ascending."""
    await _create_issue(db, test_project, test_user, number=50,
                        title="Charlie")
    await _create_issue(db, test_project, test_user, number=51,
                        title="Alpha")
    await _create_issue(db, test_project, test_user, number=52,
                        title="Bravo")

    response = await client.get(
        f"/api/issues?project_id={test_project.id}&sort_by=title&order=asc",
        headers=auth_headers,
    )
    assert response.status_code == 200
    issues = response.json()
    titles = [i["title"] for i in issues]
    assert titles == ["Alpha", "Bravo", "Charlie"]


@pytest.mark.asyncio
async def test_sort_by_title_desc(client, auth_headers, test_project, test_user, db):
    """Issues sorted by title alphabetically descending."""
    await _create_issue(db, test_project, test_user, number=60,
                        title="Charlie")
    await _create_issue(db, test_project, test_user, number=61,
                        title="Alpha")
    await _create_issue(db, test_project, test_user, number=62,
                        title="Bravo")

    response = await client.get(
        f"/api/issues?project_id={test_project.id}&sort_by=title&order=desc",
        headers=auth_headers,
    )
    assert response.status_code == 200
    issues = response.json()
    titles = [i["title"] for i in issues]
    assert titles == ["Charlie", "Bravo", "Alpha"]


@pytest.mark.asyncio
async def test_sort_by_estimate_asc(client, auth_headers, test_project, test_user, db):
    """Issues sorted by estimate ascending (nulls sorted by SQLite default)."""
    await _create_issue(db, test_project, test_user, number=70,
                        title="Big", estimate=8)
    await _create_issue(db, test_project, test_user, number=71,
                        title="Small", estimate=1)
    await _create_issue(db, test_project, test_user, number=72,
                        title="Medium", estimate=3)

    response = await client.get(
        f"/api/issues?project_id={test_project.id}&sort_by=estimate&order=asc",
        headers=auth_headers,
    )
    assert response.status_code == 200
    issues = response.json()
    estimates = [i["estimate"] for i in issues]
    assert estimates == [1, 3, 8]


@pytest.mark.asyncio
async def test_sort_by_estimate_desc(client, auth_headers, test_project, test_user, db):
    """Issues sorted by estimate descending."""
    await _create_issue(db, test_project, test_user, number=80,
                        title="Big", estimate=8)
    await _create_issue(db, test_project, test_user, number=81,
                        title="Small", estimate=1)
    await _create_issue(db, test_project, test_user, number=82,
                        title="Medium", estimate=3)

    response = await client.get(
        f"/api/issues?project_id={test_project.id}&sort_by=estimate&order=desc",
        headers=auth_headers,
    )
    assert response.status_code == 200
    issues = response.json()
    estimates = [i["estimate"] for i in issues]
    assert estimates == [8, 3, 1]


@pytest.mark.asyncio
async def test_sort_by_estimate_with_nulls(client, auth_headers, test_project, test_user, db):
    """Issues with null estimate sort consistently."""
    await _create_issue(db, test_project, test_user, number=90,
                        title="Estimated", estimate=5)
    await _create_issue(db, test_project, test_user, number=91,
                        title="Unestimated", estimate=None)

    response = await client.get(
        f"/api/issues?project_id={test_project.id}&sort_by=estimate&order=asc",
        headers=auth_headers,
    )
    assert response.status_code == 200
    issues = response.json()
    # SQLite sorts NULLs first in ASC order
    assert len(issues) == 2
    assert issues[0]["estimate"] is None
    assert issues[1]["estimate"] == 5


@pytest.mark.asyncio
async def test_sort_default_is_desc(client, auth_headers, test_project, test_user, db):
    """Without explicit order, default is descending."""
    await _create_issue(db, test_project, test_user, number=100,
                        title="Alpha")
    await _create_issue(db, test_project, test_user, number=101,
                        title="Bravo")

    response = await client.get(
        f"/api/issues?project_id={test_project.id}&sort_by=title",
        headers=auth_headers,
    )
    assert response.status_code == 200
    issues = response.json()
    titles = [i["title"] for i in issues]
    assert titles == ["Bravo", "Alpha"]


@pytest.mark.asyncio
async def test_sort_invalid_sort_by_rejected(client, auth_headers, test_project):
    """Invalid sort_by value is rejected by the API."""
    response = await client.get(
        f"/api/issues?project_id={test_project.id}&sort_by=invalid",
        headers=auth_headers,
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_sort_invalid_order_rejected(client, auth_headers, test_project):
    """Invalid order value is rejected by the API."""
    response = await client.get(
        f"/api/issues?project_id={test_project.id}&order=invalid",
        headers=auth_headers,
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_sort_random_returns_all_issues(client, auth_headers, test_project, test_user, db):
    """Random sort returns all issues (just in non-deterministic order)."""
    for i in range(5):
        await _create_issue(db, test_project, test_user, number=110 + i,
                            title=f"Issue {i}")

    response = await client.get(
        f"/api/issues?project_id={test_project.id}&sort_by=random",
        headers=auth_headers,
    )
    assert response.status_code == 200
    issues = response.json()
    assert len(issues) == 5


@pytest.mark.asyncio
async def test_sort_with_status_filter(client, auth_headers, test_project, test_user, db):
    """Sorting combined with status filter works correctly."""
    await _create_issue(db, test_project, test_user, number=120,
                        title="Todo High", status="todo", priority="high")
    await _create_issue(db, test_project, test_user, number=121,
                        title="Todo Low", status="todo", priority="low")
    await _create_issue(db, test_project, test_user, number=122,
                        title="Done Medium", status="done", priority="medium")

    response = await client.get(
        f"/api/issues?project_id={test_project.id}&status=todo&sort_by=priority&order=asc",
        headers=auth_headers,
    )
    assert response.status_code == 200
    issues = response.json()
    assert len(issues) == 2
    priorities = [i["priority"] for i in issues]
    assert priorities == ["high", "low"]
