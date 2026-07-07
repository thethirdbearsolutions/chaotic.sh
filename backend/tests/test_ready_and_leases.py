"""Tests for `issue ready` (CHT-1245) and claim leases (CHT-1246)."""
import pytest
from datetime import datetime, timedelta, timezone

from app.oxyde_models.issue import OxydeIssue, OxydeIssueRelation, OxydeIssueActivity
from app.enums import IssueStatus, IssuePriority, IssueRelationType, ActivityType
from app.services.issue_service import IssueService


async def _make_issue(project, user, **kwargs):
    """Create an issue directly via the model, bumping the project's
    issue_count like the test_issue fixture does, so identifiers stay
    unique across a test that creates several issues.
    """
    from oxyde import execute_raw
    from app.oxyde_models.project import OxydeProject

    await execute_raw(
        "UPDATE projects SET issue_count = issue_count + 1 WHERE id = ?",
        [project.id],
    )
    fresh = await OxydeProject.objects.get(id=project.id)
    number = fresh.issue_count
    defaults = dict(
        project_id=project.id,
        identifier=f"{fresh.key}-{number}",
        number=number,
        title=f"Issue {number}",
        creator_id=user.id,
    )
    defaults.update(kwargs)
    return await OxydeIssue.objects.create(**defaults)


# ============================================================================
# CHT-1245: issue ready
# ============================================================================


@pytest.mark.asyncio
async def test_ready_excludes_started_and_closed_statuses(client, auth_headers, test_project, test_user, db):
    """Only BACKLOG/TODO are 'ready' -- in_progress/in_review/done/canceled aren't."""
    await _make_issue(test_project, test_user, status=IssueStatus.BACKLOG, title="ready-backlog")
    await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="ready-todo")
    await _make_issue(test_project, test_user, status=IssueStatus.IN_PROGRESS, title="not-ready-inprogress")
    await _make_issue(test_project, test_user, status=IssueStatus.IN_REVIEW, title="not-ready-inreview")
    await _make_issue(test_project, test_user, status=IssueStatus.DONE, title="not-ready-done")
    await _make_issue(test_project, test_user, status=IssueStatus.CANCELED, title="not-ready-canceled")

    response = await client.get(f"/api/projects/{test_project.id}/issues/ready", headers=auth_headers)
    assert response.status_code == 200
    titles = {i["title"] for i in response.json()}
    assert titles == {"ready-backlog", "ready-todo"}


@pytest.mark.asyncio
async def test_ready_default_excludes_assigned(client, auth_headers, test_project, test_user, db):
    """Default scope is unassigned-only -- claimed-but-not-started work isn't 'ready'."""
    await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="unassigned")
    await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="assigned", assignee_id=test_user.id)

    response = await client.get(f"/api/projects/{test_project.id}/issues/ready", headers=auth_headers)
    assert response.status_code == 200
    titles = {i["title"] for i in response.json()}
    assert titles == {"unassigned"}


@pytest.mark.asyncio
async def test_ready_mine_restricts_to_own_assigned_issues(client, auth_headers, test_project, test_user, test_user2, db):
    await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="unassigned")
    await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="mine", assignee_id=test_user.id)
    await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="theirs", assignee_id=test_user2.id)

    response = await client.get(
        f"/api/projects/{test_project.id}/issues/ready", headers=auth_headers, params={"mine": "true"},
    )
    assert response.status_code == 200
    titles = {i["title"] for i in response.json()}
    assert titles == {"mine"}


@pytest.mark.asyncio
async def test_ready_include_assigned_widens_to_everyone(client, auth_headers, test_project, test_user, test_user2, db):
    await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="unassigned")
    await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="mine", assignee_id=test_user.id)
    await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="theirs", assignee_id=test_user2.id)

    response = await client.get(
        f"/api/projects/{test_project.id}/issues/ready", headers=auth_headers, params={"include_assigned": "true"},
    )
    assert response.status_code == 200
    titles = {i["title"] for i in response.json()}
    assert titles == {"unassigned", "mine", "theirs"}


@pytest.mark.asyncio
async def test_ready_mine_and_include_assigned_are_mutually_exclusive(client, auth_headers, test_project, db):
    response = await client.get(
        f"/api/projects/{test_project.id}/issues/ready",
        headers=auth_headers,
        params={"mine": "true", "include_assigned": "true"},
    )
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_ready_excludes_blocked_issue_until_blocker_resolves(client, auth_headers, test_project, test_user, db):
    blocked = await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="blocked")
    blocker = await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="blocker")

    await OxydeIssueRelation.objects.create(
        issue_id=blocker.id, related_issue_id=blocked.id, relation_type=IssueRelationType.BLOCKS,
    )

    response = await client.get(f"/api/projects/{test_project.id}/issues/ready", headers=auth_headers)
    assert response.status_code == 200
    titles = {i["title"] for i in response.json()}
    # blocker is itself ready (nothing blocks it); blocked is excluded.
    assert titles == {"blocker"}

    # Resolve the blocker -- blocked issue becomes ready.
    blocker.status = IssueStatus.DONE
    await blocker.save(update_fields={"status"})

    response = await client.get(f"/api/projects/{test_project.id}/issues/ready", headers=auth_headers)
    assert response.status_code == 200
    titles = {i["title"] for i in response.json()}
    assert "blocked" in titles


@pytest.mark.asyncio
async def test_ready_canceled_blocker_also_unblocks(client, auth_headers, test_project, test_user, db):
    """A CANCELED blocker (not just DONE) resolves the block -- 'wontfix' maps to CANCELED, there's no separate status."""
    blocked = await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="blocked2")
    blocker = await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="blocker2")
    await OxydeIssueRelation.objects.create(
        issue_id=blocker.id, related_issue_id=blocked.id, relation_type=IssueRelationType.BLOCKS,
    )
    blocker.status = IssueStatus.CANCELED
    await blocker.save(update_fields={"status"})

    response = await client.get(f"/api/projects/{test_project.id}/issues/ready", headers=auth_headers)
    assert response.status_code == 200
    titles = {i["title"] for i in response.json()}
    assert "blocked2" in titles


@pytest.mark.asyncio
async def test_ready_priority_sorted_urgent_first_then_oldest(client, auth_headers, test_project, test_user, db):
    low = await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="low", priority=IssuePriority.LOW)
    urgent_new = await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="urgent-new", priority=IssuePriority.URGENT)
    urgent_old = await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="urgent-old", priority=IssuePriority.URGENT)

    # Make urgent_old actually older than urgent_new.
    urgent_old.created_at = datetime.now(timezone.utc) - timedelta(days=1)
    await urgent_old.save(update_fields={"created_at"})

    response = await client.get(f"/api/projects/{test_project.id}/issues/ready", headers=auth_headers)
    assert response.status_code == 200
    titles = [i["title"] for i in response.json()]
    assert titles == ["urgent-old", "urgent-new", "low"]


@pytest.mark.asyncio
async def test_ready_limit_truncates(client, auth_headers, test_project, test_user, db):
    for i in range(5):
        await _make_issue(test_project, test_user, status=IssueStatus.TODO, title=f"issue-{i}")

    response = await client.get(
        f"/api/projects/{test_project.id}/issues/ready", headers=auth_headers, params={"limit": 2},
    )
    assert response.status_code == 200
    assert len(response.json()) == 2


@pytest.mark.asyncio
async def test_ready_team_scoped_spans_all_projects(client, auth_headers, test_team, test_project, test_user, db):
    from app.oxyde_models.project import OxydeProject

    other_project = await OxydeProject.objects.create(
        team_id=test_team.id, name="Other Project", key="OTHR",
    )
    await _make_issue(test_project, test_user, status=IssueStatus.TODO, title="in-first-project")
    await _make_issue(other_project, test_user, status=IssueStatus.TODO, title="in-other-project")

    response = await client.get(f"/api/teams/{test_team.id}/issues/ready", headers=auth_headers)
    assert response.status_code == 200
    titles = {i["title"] for i in response.json()}
    assert titles == {"in-first-project", "in-other-project"}


@pytest.mark.asyncio
async def test_ready_requires_project_access(client, auth_headers2, test_project, db):
    """A user with no team membership is 403'd, not silently empty."""
    response = await client.get(f"/api/projects/{test_project.id}/issues/ready", headers=auth_headers2)
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_ready_requires_team_access(client, auth_headers2, test_team, db):
    response = await client.get(f"/api/teams/{test_team.id}/issues/ready", headers=auth_headers2)
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_list_ready_issues_service_requires_scope(db):
    service = IssueService()
    with pytest.raises(ValueError):
        await service.list_ready_issues()


# ============================================================================
# CHT-1246: claim leases
# ============================================================================


@pytest.mark.asyncio
async def test_claim_grants_lease_with_default_duration(client, auth_headers, test_issue, test_user, db):
    before = datetime.now(timezone.utc)
    response = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers,
        json={"status": "in_progress", "assignee_id": test_user.id},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["lease_expires_at"] is not None
    lease_at = datetime.fromisoformat(body["lease_expires_at"].replace("Z", "+00:00"))
    # Default is 2h (Settings.default_lease_minutes) -- assert it's in a
    # sane window rather than pinning the exact value.
    assert before + timedelta(minutes=110) < lease_at < before + timedelta(minutes=130)


@pytest.mark.asyncio
async def test_claim_with_lease_seconds_override(client, auth_headers, test_issue, test_user, db):
    before = datetime.now(timezone.utc)
    response = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers,
        json={"status": "in_progress", "assignee_id": test_user.id, "lease_seconds": 600},
    )
    assert response.status_code == 200
    lease_at = datetime.fromisoformat(response.json()["lease_expires_at"].replace("Z", "+00:00"))
    assert before + timedelta(seconds=590) < lease_at < before + timedelta(seconds=610)


@pytest.mark.asyncio
async def test_reclaim_heartbeat_extends_lease(client, auth_headers, test_issue, test_user, db):
    response = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers,
        json={"status": "in_progress", "assignee_id": test_user.id, "lease_seconds": 100},
    )
    first_lease = datetime.fromisoformat(response.json()["lease_expires_at"].replace("Z", "+00:00"))

    # Re-claim (heartbeat) with a longer override -- should extend, not error.
    response = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers,
        json={"status": "in_progress", "assignee_id": test_user.id, "lease_seconds": 9999},
    )
    assert response.status_code == 200
    second_lease = datetime.fromisoformat(response.json()["lease_expires_at"].replace("Z", "+00:00"))
    assert second_lease > first_lease


@pytest.mark.asyncio
async def test_leaving_in_progress_clears_lease(client, auth_headers, test_issue, test_user, db):
    await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers,
        json={"status": "in_progress", "assignee_id": test_user.id},
    )
    response = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers, json={"status": "in_review"},
    )
    assert response.status_code == 200
    assert response.json()["lease_expires_at"] is None


@pytest.mark.asyncio
async def test_reassigning_away_clears_lease(client, auth_headers, test_project, test_issue, test_user, test_user2, db):
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    await OxydeTeamMember.objects.create(team_id=test_project.team_id, user_id=test_user2.id, role=TeamRole.MEMBER)

    await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers,
        json={"status": "in_progress", "assignee_id": test_user.id},
    )
    response = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers, json={"assignee_id": test_user2.id},
    )
    assert response.status_code == 200
    assert response.json()["lease_expires_at"] is None


@pytest.mark.asyncio
async def test_third_party_assign_to_in_progress_grants_no_lease(client, auth_headers, test_project, test_issue, test_user2, db):
    """A caller assigning *someone else* into in_progress isn't a self-claim -- no lease."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    await OxydeTeamMember.objects.create(team_id=test_project.team_id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers,
        json={"status": "in_progress", "assignee_id": test_user2.id},
    )
    assert response.status_code == 200
    assert response.json()["lease_expires_at"] is None


@pytest.mark.asyncio
async def test_release_expired_lease_reverts_and_logs_activity(db, test_project, test_issue, test_user):
    service = IssueService()
    test_issue.status = IssueStatus.IN_PROGRESS
    test_issue.assignee_id = test_user.id
    test_issue.lease_expires_at = datetime.now(timezone.utc) - timedelta(minutes=1)
    await test_issue.save(update_fields={"status", "assignee_id", "lease_expires_at"})

    released = await service.release_expired_leases(project_id=test_project.id)

    assert len(released) == 1
    updated = released[0]
    assert updated.id == test_issue.id
    assert updated.status == IssueStatus.TODO
    assert updated.assignee_id is None
    assert updated.lease_expires_at is None

    activities = await OxydeIssueActivity.objects.filter(issue_id=test_issue.id).all()
    lease_activities = [a for a in activities if a.activity_type == ActivityType.LEASE_EXPIRED]
    assert len(lease_activities) == 1
    assert lease_activities[0].old_value == "IN_PROGRESS"
    assert lease_activities[0].new_value == "TODO"
    assert lease_activities[0].user_id == test_user.id


@pytest.mark.asyncio
async def test_release_expired_leases_team_scoped(db, test_team, test_project, test_user):
    from app.oxyde_models.project import OxydeProject

    other_project = await OxydeProject.objects.create(team_id=test_team.id, name="Other", key="OTHR2")
    expired = await _make_issue(
        other_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id,
        lease_expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
    )

    service = IssueService()
    released = await service.release_expired_leases(team_id=test_team.id)

    assert {i.id for i in released} == {expired.id}


@pytest.mark.asyncio
async def test_non_expired_lease_is_untouched(db, test_project, test_user):
    service = IssueService()
    issue = await _make_issue(
        test_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id,
        lease_expires_at=datetime.now(timezone.utc) + timedelta(hours=1),
    )

    released = await service.release_expired_leases(project_id=test_project.id)

    assert released == []
    fresh = await service.get_by_id(issue.id)
    assert fresh.status == IssueStatus.IN_PROGRESS
    assert fresh.assignee_id == test_user.id


@pytest.mark.asyncio
async def test_no_lease_issue_is_untouched(db, test_project, test_user):
    service = IssueService()
    issue = await _make_issue(
        test_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id,
    )

    released = await service.release_expired_leases(project_id=test_project.id)

    assert released == []
    fresh = await service.get_by_id(issue.id)
    assert fresh.status == IssueStatus.IN_PROGRESS


@pytest.mark.asyncio
async def test_release_expired_leases_service_requires_scope(db):
    service = IssueService()
    with pytest.raises(ValueError):
        await service.release_expired_leases()


@pytest.mark.asyncio
async def test_get_issue_lazily_releases_expired_lease(client, auth_headers, test_project, test_user, db):
    """A single-issue GET auto-releases an expired lease (CHT-1246)."""
    issue = await _make_issue(
        test_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id,
        lease_expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
    )

    response = await client.get(f"/api/issues/{issue.id}", headers=auth_headers)
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "todo"
    assert body["assignee_id"] is None
    assert body["lease_expires_at"] is None


@pytest.mark.asyncio
async def test_get_issue_by_identifier_lazily_releases_expired_lease(client, auth_headers, test_project, test_user, db):
    issue = await _make_issue(
        test_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id,
        lease_expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
    )

    response = await client.get(f"/api/issues/identifier/{issue.identifier}", headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["status"] == "todo"


@pytest.mark.asyncio
async def test_list_issues_lazily_releases_expired_leases(client, auth_headers, test_project, test_user, db):
    issue = await _make_issue(
        test_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id,
        lease_expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
    )

    response = await client.get(
        "/api/issues", headers=auth_headers, params={"project_id": test_project.id},
    )
    assert response.status_code == 200
    matching = [i for i in response.json() if i["id"] == issue.id]
    assert len(matching) == 1
    assert matching[0]["status"] == "todo"


@pytest.mark.asyncio
async def test_ready_query_shows_issue_after_lease_expires_same_call(client, auth_headers, test_project, test_user, db):
    """The whole point of the lazy release living inside list_ready_issues:
    an issue whose lease just expired is 'ready' in this same response,
    not just the next one."""
    issue = await _make_issue(
        test_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id, title="stale-claim",
        lease_expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
    )

    response = await client.get(f"/api/projects/{test_project.id}/issues/ready", headers=auth_headers)
    assert response.status_code == 200
    titles = {i["title"] for i in response.json()}
    assert "stale-claim" in titles


@pytest.mark.asyncio
async def test_release_lease_if_expired_returns_same_object_when_not_expired(db, test_project, test_user):
    service = IssueService()
    issue = await _make_issue(
        test_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id,
        lease_expires_at=datetime.now(timezone.utc) + timedelta(hours=1),
    )
    result = await service.release_lease_if_expired(issue)
    assert result is issue


@pytest.mark.asyncio
async def test_release_lease_if_expired_handles_none():
    service = IssueService()
    assert await service.release_lease_if_expired(None) is None
