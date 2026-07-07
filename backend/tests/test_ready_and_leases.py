"""Tests for `issue ready` (CHT-1245) and claim leases (CHT-1246)."""
import asyncio

import pytest
from datetime import datetime, timedelta, timezone

from app.oxyde_models.issue import OxydeIssue, OxydeIssueRelation, OxydeIssueActivity
from app.enums import IssueStatus, IssuePriority, IssueType, IssueRelationType, ActivityType, TeamRole
from app.schemas.issue import IssueUpdate
from app.services.issue_service import IssueService, IssueAlreadyClaimedError


async def _add_team_member(project, user):
    from app.oxyde_models.team import OxydeTeamMember

    await OxydeTeamMember.objects.create(
        team_id=project.team_id, user_id=user.id, role=TeamRole.MEMBER,
    )


async def _assigned_activities(issue_id: str) -> list:
    acts = await OxydeIssueActivity.objects.filter(issue_id=issue_id).all()
    return [a for a in acts if a.activity_type == ActivityType.ASSIGNED]


async def _lease_expired_activities(issue_id: str) -> list:
    acts = await OxydeIssueActivity.objects.filter(issue_id=issue_id).all()
    return [a for a in acts if a.activity_type == ActivityType.LEASE_EXPIRED]


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


# ============================================================================
# PR #217 review findings
# ============================================================================


# --- Finding 1 (HIGH): self-claim compare-and-swap ---


@pytest.mark.asyncio
async def test_concurrent_self_claims_exactly_one_winner(
    client, auth_headers, auth_headers2, test_project, test_issue, test_user, test_user2, db,
):
    """Two agents race to claim the same unassigned TODO issue: exactly
    one 200 (winner holds it), one 409 already_claimed, and exactly one
    ASSIGNED activity row (the loser's transaction rolled back before
    logging a claim that didn't stick)."""
    await _add_team_member(test_project, test_user2)
    test_issue.status = IssueStatus.TODO
    await test_issue.save(update_fields={"status"})

    async def claim(headers, uid):
        return await client.patch(
            f"/api/issues/{test_issue.id}", headers=headers,
            json={"status": "in_progress", "assignee_id": uid},
        )

    r1, r2 = await asyncio.gather(
        claim(auth_headers, test_user.id), claim(auth_headers2, test_user2.id),
    )

    assert sorted([r1.status_code, r2.status_code]) == [200, 409]
    winner = r1 if r1.status_code == 200 else r2
    loser = r1 if r1.status_code == 409 else r2

    detail = loser.json()["detail"]
    assert detail["error_code"] == "already_claimed"
    assert detail["issue_id"] == test_issue.id

    final = await client.get(f"/api/issues/{test_issue.id}", headers=auth_headers)
    assert final.json()["assignee_id"] == winner.json()["assignee_id"]
    assert final.json()["status"] == "in_progress"
    assert final.json()["lease_expires_at"] is not None

    assigned = await _assigned_activities(test_issue.id)
    assert len(assigned) == 1
    assert assigned[0].new_value == winner.json()["assignee_id"]


@pytest.mark.asyncio
async def test_stale_read_claim_loses_cas(db, test_project, test_issue, test_user, test_user2):
    """Deterministic TOCTOU: both claimants read the unassigned issue,
    then write in turn. The CAS predicate (assignee_id is still what we
    read) makes the second write match zero rows and raise -- the exact
    interleaving the review reproduced against the pre-CAS code."""
    service = IssueService()
    stale_a = await service.get_by_id(test_issue.id)
    stale_b = await service.get_by_id(test_issue.id)

    await service.update(
        stale_a, IssueUpdate(status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id),
        user_id=test_user.id, is_human_request=True,
    )

    with pytest.raises(IssueAlreadyClaimedError) as exc_info:
        await service.update(
            stale_b, IssueUpdate(status=IssueStatus.IN_PROGRESS, assignee_id=test_user2.id),
            user_id=test_user2.id, is_human_request=True,
        )
    assert exc_info.value.assignee_id == test_user.id

    final = await service.get_by_id(test_issue.id)
    assert final.assignee_id == test_user.id

    assigned = await _assigned_activities(test_issue.id)
    assert len(assigned) == 1
    assert assigned[0].new_value == test_user.id


@pytest.mark.asyncio
async def test_claim_of_validly_leased_issue_409s(
    client, auth_headers, auth_headers2, test_project, test_issue, test_user, test_user2, db,
):
    """Sequential case: B tries to self-claim an issue A already holds
    under a valid lease -> clean 409 naming the holder, no state change."""
    await _add_team_member(test_project, test_user2)

    r = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers,
        json={"status": "in_progress", "assignee_id": test_user.id},
    )
    assert r.status_code == 200

    r = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers2,
        json={"status": "in_progress", "assignee_id": test_user2.id},
    )
    assert r.status_code == 409
    detail = r.json()["detail"]
    assert detail["error_code"] == "already_claimed"
    assert detail["assignee_id"] == test_user.id

    final = await client.get(f"/api/issues/{test_issue.id}", headers=auth_headers)
    assert final.json()["assignee_id"] == test_user.id
    assert len(await _assigned_activities(test_issue.id)) == 1


@pytest.mark.asyncio
async def test_expired_lease_can_be_claimed_by_rival(
    client, auth_headers, auth_headers2, test_project, test_issue, test_user, test_user2, db,
):
    """An expired lease is fair game: the already-claimed guard only
    protects *valid* leases, so a rival's claim on a lapsed one wins."""
    await _add_team_member(test_project, test_user2)
    test_issue.status = IssueStatus.IN_PROGRESS
    test_issue.assignee_id = test_user.id
    test_issue.lease_expires_at = datetime.now(timezone.utc) - timedelta(minutes=1)
    await test_issue.save(update_fields={"status", "assignee_id", "lease_expires_at"})

    r = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers2,
        json={"status": "in_progress", "assignee_id": test_user2.id},
    )
    assert r.status_code == 200
    assert r.json()["assignee_id"] == test_user2.id
    assert r.json()["lease_expires_at"] is not None


@pytest.mark.asyncio
async def test_heartbeat_still_works_under_cas(client, auth_headers, test_issue, test_user, db):
    """Re-claiming a ticket you already hold is a heartbeat, not a
    conflict: the CAS predicate is ourselves, so it succeeds."""
    r = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers,
        json={"status": "in_progress", "assignee_id": test_user.id, "lease_seconds": 100},
    )
    assert r.status_code == 200
    first = r.json()["lease_expires_at"]

    r = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers,
        json={"status": "in_progress", "assignee_id": test_user.id, "lease_seconds": 9999},
    )
    assert r.status_code == 200
    assert r.json()["lease_expires_at"] > first


# --- Finding 3 (MEDIUM): release compare-and-swap ---


@pytest.mark.asyncio
async def test_stale_read_release_emits_one_activity(db, test_project, test_user):
    """Deterministic release race: two readers hold the same expired-lease
    row; both attempt the lazy release. The CAS lets exactly one perform
    it -- one LEASE_EXPIRED activity for one logical expiry event."""
    service = IssueService()
    issue = await _make_issue(
        test_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id,
        lease_expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
    )
    stale_a = await service.get_by_id(issue.id)
    stale_b = await service.get_by_id(issue.id)

    ra = await service.release_lease_if_expired(stale_a)
    rb = await service.release_lease_if_expired(stale_b)

    # Both callers see the released end-state...
    for result in (ra, rb):
        assert result.status == IssueStatus.TODO
        assert result.assignee_id is None
        assert result.lease_expires_at is None
    # ...but only one release actually happened.
    assert len(await _lease_expired_activities(issue.id)) == 1


@pytest.mark.asyncio
async def test_concurrent_gets_release_expired_lease_once(client, auth_headers, test_project, test_user, db):
    """API-level: two concurrent GETs hit the same expired lease; both
    get the released state, only one LEASE_EXPIRED activity is written
    (and hence only one broadcast fires -- the activity write and the
    broadcast share the CAS winner's branch)."""
    issue = await _make_issue(
        test_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id,
        lease_expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
    )

    r1, r2 = await asyncio.gather(
        client.get(f"/api/issues/{issue.id}", headers=auth_headers),
        client.get(f"/api/issues/{issue.id}", headers=auth_headers),
    )
    assert r1.status_code == 200 and r2.status_code == 200
    assert r1.json()["status"] == "todo"
    assert r2.json()["status"] == "todo"
    assert len(await _lease_expired_activities(issue.id)) == 1


@pytest.mark.asyncio
async def test_release_cas_loses_to_concurrent_heartbeat(db, test_project, test_user):
    """A reader holding a stale expired-lease row must not clobber a
    heartbeat that landed after its read: the CAS predicate (lease still
    past-due) no longer matches, so the release aborts."""
    service = IssueService()
    issue = await _make_issue(
        test_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id,
        lease_expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
    )
    stale = await service.get_by_id(issue.id)

    # Heartbeat lands between the stale read and the release attempt.
    fresh = await service.get_by_id(issue.id)
    await service.update(
        fresh, IssueUpdate(status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id, lease_seconds=3600),
        user_id=test_user.id, is_human_request=True,
    )

    result = await service.release_lease_if_expired(stale)
    assert result.status == IssueStatus.IN_PROGRESS
    assert result.assignee_id == test_user.id
    assert result.lease_expires_at is not None
    assert len(await _lease_expired_activities(issue.id)) == 0


# --- Finding 2 (HIGH): lazy sweep on the team activity feed + coverage gaps ---


@pytest.mark.asyncio
async def test_activity_feed_read_releases_expired_lease(client, auth_headers, test_team, test_project, test_user, db):
    """The activity feed is the read `chaotic await` polls: reading it
    must itself run the sweep, so a waiter's own polling surfaces the
    LEASE_EXPIRED event with no third-party issue reads required."""
    issue = await _make_issue(
        test_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id,
        lease_expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
    )

    r = await client.get(
        "/api/issues/activities", headers=auth_headers, params={"team_id": test_team.id},
    )
    assert r.status_code == 200
    lease_events = [
        a for a in r.json()
        if a["activity_type"] == "lease_expired" and a.get("issue_id") == issue.id
    ]
    # The very response that triggered the release already carries the event.
    assert len(lease_events) == 1

    fresh = await client.get(f"/api/issues/{issue.id}", headers=auth_headers)
    assert fresh.json()["status"] == "todo"


@pytest.mark.asyncio
async def test_sprint_scoped_list_releases_expired_lease(client, auth_headers, test_project, test_sprint, test_user, db):
    """The web UI's sprint board queries by sprint_id alone (review
    finding 3's named gap): that read now sweeps too."""
    issue = await _make_issue(
        test_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id,
        sprint_id=test_sprint.id,
        lease_expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
    )

    r = await client.get("/api/issues", headers=auth_headers, params={"sprint_id": test_sprint.id})
    assert r.status_code == 200
    matching = [i for i in r.json() if i["id"] == issue.id]
    assert len(matching) == 1
    assert matching[0]["status"] == "todo"
    assert matching[0]["assignee_id"] is None


@pytest.mark.asyncio
async def test_assignee_scoped_list_releases_expired_lease(client, auth_headers, test_team, test_project, test_user, db):
    """`issue mine` queries by assignee alone (review finding 3's other
    named gap): the sweep runs first, so a lapsed claim is no longer
    reported as still-mine."""
    issue = await _make_issue(
        test_project, test_user, status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id,
        lease_expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
    )

    r = await client.get("/api/issues", headers=auth_headers, params={"assignee_id": test_user.id})
    assert r.status_code == 200
    assert all(i["id"] != issue.id for i in r.json())

    fresh = await client.get(f"/api/issues/{issue.id}", headers=auth_headers)
    assert fresh.json()["status"] == "todo"
    assert fresh.json()["assignee_id"] is None


@pytest.mark.asyncio
async def test_release_sweep_is_bounded_by_scan_limit(db, test_project, test_user):
    """scan_limit caps the work done on any one read; the remainder
    drains on the next read instead of stalling this one."""
    service = IssueService()
    past = datetime.now(timezone.utc) - timedelta(minutes=1)
    for _ in range(3):
        await _make_issue(
            test_project, test_user, status=IssueStatus.IN_PROGRESS,
            assignee_id=test_user.id, lease_expires_at=past,
        )

    first = await service.release_expired_leases(project_id=test_project.id, scan_limit=2)
    assert len(first) == 2
    second = await service.release_expired_leases(project_id=test_project.id, scan_limit=2)
    assert len(second) == 1


# --- Finding 5 (LOW): epics are not startable work ---


@pytest.mark.asyncio
async def test_ready_excludes_epics(client, auth_headers, test_project, test_user, db):
    """An open, unblocked, unassigned EPIC must not surface as 'ready':
    epics are containers, and a fleet agent should never 'start' one.
    Its sub-issues surface individually instead."""
    epic = await _make_issue(
        test_project, test_user, status=IssueStatus.TODO, title="the-epic",
        issue_type=IssueType.EPIC,
    )
    await _make_issue(
        test_project, test_user, status=IssueStatus.TODO, title="epic-child",
        parent_id=epic.id,
    )

    r = await client.get(f"/api/projects/{test_project.id}/issues/ready", headers=auth_headers)
    assert r.status_code == 200
    titles = {i["title"] for i in r.json()}
    assert "the-epic" not in titles
    assert "epic-child" in titles
