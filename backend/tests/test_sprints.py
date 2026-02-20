"""Tests for sprint endpoints.

Note: Manual sprint creation via API was removed in CHT-588.
Sprints are now created automatically via the cadence system (ensure_sprints_exist).
Service-level tests for SprintService.create() remain to test the internal method.
"""
import pytest
from app.models.sprint import Sprint
from app.models.issue import Issue
from app.models.team import TeamMember
from app.enums import SprintStatus, TeamRole, UnestimatedHandling


@pytest.mark.asyncio
async def test_list_sprints(client, auth_headers, test_project, test_sprint):
    """Test listing sprints."""
    response = await client.get(
        f"/api/sprints?project_id={test_project.id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert any(s["id"] == test_sprint.id for s in data)


@pytest.mark.asyncio
async def test_list_sprints_with_status_filter(client, auth_headers, test_project, db_session):
    """Test listing sprints with status filter."""
    sprint = Sprint(
        project_id=test_project.id,
        name="Active Sprint",
        status=SprintStatus.ACTIVE,
    )
    db_session.add(sprint)
    await db_session.commit()

    response = await client.get(
        f"/api/sprints?project_id={test_project.id}&sprint_status=active",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert all(s["status"] == "active" for s in data)


@pytest.mark.asyncio
async def test_get_sprint(client, auth_headers, test_sprint):
    """Test getting sprint by ID."""
    response = await client.get(
        f"/api/sprints/{test_sprint.id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_sprint.id
    assert data["name"] == test_sprint.name


@pytest.mark.asyncio
async def test_update_sprint(client, auth_headers, test_sprint):
    """Test updating a sprint."""
    response = await client.patch(
        f"/api/sprints/{test_sprint.id}",
        headers=auth_headers,
        json={
            "name": "Updated Sprint",
            "description": "Updated description",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Sprint"
    assert data["description"] == "Updated description"


@pytest.mark.asyncio
async def test_get_current_sprint(client, auth_headers, test_project):
    """Test getting/creating current sprint."""
    response = await client.get(
        f"/api/sprints/current?project_id={test_project.id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "active"
    assert data["project_id"] == test_project.id


@pytest.mark.asyncio
async def test_close_sprint(client, auth_headers, test_project, db_session):
    """Test closing a sprint and rotating to next."""
    # Create active and next sprints
    active_sprint = Sprint(
        project_id=test_project.id,
        name="Current Sprint",
        status=SprintStatus.ACTIVE,
    )
    db_session.add(active_sprint)

    next_sprint = Sprint(
        project_id=test_project.id,
        name="Next Sprint",
        status=SprintStatus.PLANNED,
    )
    db_session.add(next_sprint)
    await db_session.commit()
    await db_session.refresh(active_sprint)

    response = await client.post(
        f"/api/sprints/{active_sprint.id}/close",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "completed"


@pytest.mark.asyncio
async def test_close_sprint_not_active(client, auth_headers, test_sprint):
    """Test closing sprint that isn't active."""
    response = await client.post(
        f"/api/sprints/{test_sprint.id}/close",
        headers=auth_headers,
    )
    assert response.status_code == 400
    assert "active" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_complete_limbo_idempotent(db_session, test_project):
    """Test that sequential complete_limbo calls are idempotent.

    Verifies the atomic UPDATE pattern handles the case where another request
    already cleared limbo. The second call should be a no-op rather than
    creating duplicate sprints or raising an exception.
    """
    from app.services.sprint_service import SprintService

    # Create active sprint in limbo + planned next sprint
    active_sprint = Sprint(
        project_id=test_project.id,
        name="Limbo Sprint",
        status=SprintStatus.ACTIVE,
        limbo=True,
    )
    db_session.add(active_sprint)

    next_sprint = Sprint(
        project_id=test_project.id,
        name="Next Sprint",
        status=SprintStatus.PLANNED,
    )
    db_session.add(next_sprint)
    await db_session.commit()
    await db_session.refresh(active_sprint)
    await db_session.refresh(next_sprint)

    sprint_service = SprintService(db_session)

    # First call should succeed
    result1 = await sprint_service.complete_limbo(active_sprint)
    assert result1.status == SprintStatus.COMPLETED
    assert result1.limbo is False

    # Second call (simulating concurrent request) should be a no-op
    result2 = await sprint_service.complete_limbo(active_sprint)
    assert result2.status == SprintStatus.COMPLETED
    assert result2.limbo is False

    # Verify exactly one planned sprint exists (the newly created one)
    from sqlalchemy import select, func
    count_result = await db_session.execute(
        select(func.count(Sprint.id)).where(
            Sprint.project_id == test_project.id,
            Sprint.status == SprintStatus.PLANNED,
        )
    )
    planned_count = count_result.scalar()
    assert planned_count == 1, f"Expected 1 planned sprint, got {planned_count}"

    # Verify exactly one active sprint (the former next sprint)
    count_result = await db_session.execute(
        select(func.count(Sprint.id)).where(
            Sprint.project_id == test_project.id,
            Sprint.status == SprintStatus.ACTIVE,
        )
    )
    active_count = count_result.scalar()
    assert active_count == 1, f"Expected 1 active sprint, got {active_count}"


@pytest.mark.asyncio
async def test_budget_deducted_on_done_not_claim(client, auth_headers, test_project, test_user, db_session):
    """Test that sprint budget is deducted when issue is completed, NOT when claimed.

    Regression test for CHT-347: Budget should only be deducted when an issue
    transitions to DONE status, not when it's claimed (IN_PROGRESS).

    Note: Budget is deducted from the project's current ACTIVE sprint, regardless
    of which sprint the issue is assigned to. See CHT-351 for documentation.
    """
    # Create an active sprint with a budget
    sprint = Sprint(
        project_id=test_project.id,
        name="Budget Test Sprint",
        status=SprintStatus.ACTIVE,
        budget=10,
        points_spent=0,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    # Create an issue with an estimate
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-100",
        number=100,
        title="Test Budget Issue",
        estimate=3,
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)

    # Verify initial state: 0 points spent
    await db_session.refresh(sprint)
    assert sprint.points_spent == 0, "Initial points_spent should be 0"

    # Claim the issue (move to in_progress)
    response = await client.patch(
        f"/api/issues/{issue.id}",
        headers=auth_headers,
        json={"status": "in_progress"},
    )
    assert response.status_code == 200

    # Budget should NOT be deducted after claiming
    await db_session.refresh(sprint)
    assert sprint.points_spent == 0, "Budget should NOT be deducted on claim (in_progress)"

    # Complete the issue (move to done)
    response = await client.patch(
        f"/api/issues/{issue.id}",
        headers=auth_headers,
        json={"status": "done"},
    )
    assert response.status_code == 200

    # Budget SHOULD be deducted after completion
    await db_session.refresh(sprint)
    assert sprint.points_spent == 3, "Budget SHOULD be deducted on completion (done)"


@pytest.mark.asyncio
async def test_budget_not_deducted_on_cancel(client, auth_headers, test_project, test_user, db_session):
    """Test that sprint budget is NOT deducted when issue is canceled.

    Canceled issues should not consume sprint budget.
    """
    # Create an active sprint with a budget
    sprint = Sprint(
        project_id=test_project.id,
        name="Cancel Test Sprint",
        status=SprintStatus.ACTIVE,
        budget=10,
        points_spent=0,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    # Create an issue with an estimate
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-101",
        number=101,
        title="Test Cancel Issue",
        estimate=5,
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)

    # Cancel the issue
    response = await client.patch(
        f"/api/issues/{issue.id}",
        headers=auth_headers,
        json={"status": "canceled"},
    )
    assert response.status_code == 200

    # Budget should NOT be deducted
    await db_session.refresh(sprint)
    assert sprint.points_spent == 0, "Budget should NOT be deducted on cancel"


@pytest.mark.asyncio
async def test_budget_deduction_unestimated_defaults_to_one(client, auth_headers, test_project, test_user, db_session):
    """Test that unestimated issues default to 1 point when project uses DEFAULT_ONE_POINT.

    When an issue without an estimate is completed, the budget deduction depends
    on the project's unestimated_handling setting.
    """
    # Set project to use default one point for unestimated issues
    test_project.unestimated_handling = UnestimatedHandling.DEFAULT_ONE_POINT
    await db_session.commit()

    # Create an active sprint with a budget
    sprint = Sprint(
        project_id=test_project.id,
        name="Unestimated Test Sprint",
        status=SprintStatus.ACTIVE,
        budget=10,
        points_spent=0,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    # Create an issue WITHOUT an estimate
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-200",
        number=200,
        title="Unestimated Issue",
        estimate=None,  # No estimate
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)

    # Complete the issue
    response = await client.patch(
        f"/api/issues/{issue.id}",
        headers=auth_headers,
        json={"status": "done"},
    )
    assert response.status_code == 200

    # Budget should be deducted by 1 (default for unestimated)
    await db_session.refresh(sprint)
    assert sprint.points_spent == 1, "Unestimated issue should deduct 1 point (DEFAULT_ONE_POINT)"


@pytest.mark.asyncio
async def test_block_until_estimated_prevents_completion(client, auth_headers, test_project, test_user, db_session):
    """Test that unestimated issues cannot be completed when project uses BLOCK_UNTIL_ESTIMATED.

    When BLOCK_UNTIL_ESTIMATED is set, completing an issue without an estimate should fail.
    """
    # Set project to block until estimated
    test_project.unestimated_handling = UnestimatedHandling.BLOCK_UNTIL_ESTIMATED
    await db_session.commit()

    # Create an active sprint with a budget
    sprint = Sprint(
        project_id=test_project.id,
        name="Block Test Sprint",
        status=SprintStatus.ACTIVE,
        budget=10,
        points_spent=0,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    # Create an issue WITHOUT an estimate
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-201",
        number=201,
        title="Unestimated Issue That Should Be Blocked",
        estimate=None,  # No estimate
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)

    # Try to complete the issue - should fail
    response = await client.patch(
        f"/api/issues/{issue.id}",
        headers=auth_headers,
        json={"status": "done"},
    )
    assert response.status_code == 400, "Should block completion of unestimated issue"
    assert "must be estimated" in response.json()["detail"].lower()

    # Budget should NOT be affected
    await db_session.refresh(sprint)
    assert sprint.points_spent == 0, "Budget should not be deducted when completion is blocked"

    # Now add an estimate and try again
    response = await client.patch(
        f"/api/issues/{issue.id}",
        headers=auth_headers,
        json={"estimate": 3},
    )
    assert response.status_code == 200

    # Now complete should work
    response = await client.patch(
        f"/api/issues/{issue.id}",
        headers=auth_headers,
        json={"status": "done"},
    )
    assert response.status_code == 200

    # Budget should be deducted by the estimate
    await db_session.refresh(sprint)
    assert sprint.points_spent == 3, "Budget should be deducted by estimate after successful completion"


@pytest.mark.asyncio
async def test_ensure_sprints_exist_creates_both(db_session, test_project):
    """Test ensure_sprints_exist creates both Current and Next sprints."""
    from app.services.sprint_service import SprintService

    service = SprintService(db_session)
    current, next_sprint = await service.ensure_sprints_exist(test_project.id)

    assert current is not None
    assert current.status == SprintStatus.ACTIVE
    assert next_sprint is not None
    assert next_sprint.status == SprintStatus.PLANNED


@pytest.mark.asyncio
async def test_ensure_sprints_exist_idempotent(db_session, test_project):
    """Test ensure_sprints_exist is idempotent."""
    from app.services.sprint_service import SprintService

    service = SprintService(db_session)

    # First call creates sprints
    current1, next1 = await service.ensure_sprints_exist(test_project.id)

    # Second call returns existing sprints
    current2, next2 = await service.ensure_sprints_exist(test_project.id)

    assert current1.id == current2.id
    assert next1.id == next2.id


@pytest.mark.asyncio
async def test_create_sprint_with_budget(db_session, test_project):
    """Test creating a sprint with explicit budget."""
    from app.services.sprint_service import SprintService
    from app.schemas.sprint import SprintCreate

    service = SprintService(db_session)
    sprint_in = SprintCreate(name="Budget Sprint", budget=50)
    sprint = await service.create(sprint_in, test_project.id)

    assert sprint.budget == 50


@pytest.mark.asyncio
async def test_create_sprint_explicit_unlimited(db_session, test_project):
    """Test creating a sprint with explicit unlimited budget."""
    from app.services.sprint_service import SprintService
    from app.schemas.sprint import SprintCreate

    # Set project default budget
    test_project.default_sprint_budget = 100
    await db_session.commit()

    service = SprintService(db_session)
    sprint_in = SprintCreate(name="Unlimited Sprint", explicit_unlimited=True)
    sprint = await service.create(sprint_in, test_project.id)

    assert sprint.budget is None  # Explicitly unlimited, ignoring project default


@pytest.mark.asyncio
async def test_create_sprint_uses_project_default(db_session, test_project):
    """Test creating a sprint uses project default budget."""
    from app.services.sprint_service import SprintService
    from app.schemas.sprint import SprintCreate

    # Set project default budget
    test_project.default_sprint_budget = 75
    await db_session.commit()

    service = SprintService(db_session)
    sprint_in = SprintCreate(name="Default Sprint")
    sprint = await service.create(sprint_in, test_project.id)

    assert sprint.budget == 75


@pytest.mark.asyncio
async def test_get_current_sprint(db_session, test_project):
    """Test getting the current sprint."""
    from app.services.sprint_service import SprintService

    sprint = Sprint(
        project_id=test_project.id,
        name="Current Sprint",
        status=SprintStatus.ACTIVE,
    )
    db_session.add(sprint)
    await db_session.commit()

    service = SprintService(db_session)
    result = await service.get_current_sprint(test_project.id)

    assert result is not None
    assert result.id == sprint.id


@pytest.mark.asyncio
async def test_get_next_sprint(db_session, test_project):
    """Test getting the next sprint."""
    from app.services.sprint_service import SprintService

    sprint = Sprint(
        project_id=test_project.id,
        name="Next Sprint",
        status=SprintStatus.PLANNED,
    )
    db_session.add(sprint)
    await db_session.commit()

    service = SprintService(db_session)
    result = await service.get_next_sprint(test_project.id)

    assert result is not None
    assert result.id == sprint.id


@pytest.mark.asyncio
async def test_close_sprint_already_in_limbo_fails(db_session, test_project):
    """Test that closing a sprint already in limbo fails."""
    from app.services.sprint_service import SprintService

    sprint = Sprint(
        project_id=test_project.id,
        name="Limbo Sprint",
        status=SprintStatus.ACTIVE,
        limbo=True,
    )
    db_session.add(sprint)
    await db_session.commit()

    service = SprintService(db_session)

    with pytest.raises(ValueError, match="already in limbo"):
        await service.close_sprint(sprint, has_rituals=False)


@pytest.mark.asyncio
async def test_close_sprint_with_rituals_enters_limbo(db_session, test_project):
    """Test closing sprint with rituals enters limbo."""
    from app.services.sprint_service import SprintService

    sprint = Sprint(
        project_id=test_project.id,
        name="Current Sprint",
        status=SprintStatus.ACTIVE,
    )
    next_sprint = Sprint(
        project_id=test_project.id,
        name="Next Sprint",
        status=SprintStatus.PLANNED,
    )
    db_session.add_all([sprint, next_sprint])
    await db_session.commit()
    await db_session.refresh(sprint)

    service = SprintService(db_session)
    result = await service.close_sprint(sprint, has_rituals=True)

    assert result.limbo is True
    assert result.status == SprintStatus.ACTIVE  # Still active, just in limbo


@pytest.mark.asyncio
async def test_close_sprint_moves_incomplete_issues(db_session, test_project, test_user):
    """Test that closing sprint moves incomplete issues to next sprint."""
    from app.services.sprint_service import SprintService

    current_sprint = Sprint(
        project_id=test_project.id,
        name="Current Sprint",
        status=SprintStatus.ACTIVE,
    )
    next_sprint = Sprint(
        project_id=test_project.id,
        name="Next Sprint",
        status=SprintStatus.PLANNED,
    )
    db_session.add_all([current_sprint, next_sprint])
    await db_session.commit()
    await db_session.refresh(current_sprint)
    await db_session.refresh(next_sprint)

    # Create incomplete issue in current sprint
    from app.models.issue import Issue
    from app.enums import IssueStatus
    issue = Issue(
        project_id=test_project.id,
        sprint_id=current_sprint.id,
        identifier=f"{test_project.key}-500",
        number=500,
        title="Incomplete Issue",
        status=IssueStatus.IN_PROGRESS,
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)

    service = SprintService(db_session)
    await service.close_sprint(current_sprint, has_rituals=False)

    # Issue should be moved to next sprint
    await db_session.refresh(issue)
    assert issue.sprint_id == next_sprint.id


@pytest.mark.asyncio
async def test_enter_limbo(db_session, test_project):
    """Test putting a sprint into limbo."""
    from app.services.sprint_service import SprintService

    sprint = Sprint(
        project_id=test_project.id,
        name="Test Sprint",
        status=SprintStatus.ACTIVE,
        limbo=False,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    service = SprintService(db_session)
    result = await service.enter_limbo(sprint)

    assert result.limbo is True


@pytest.mark.asyncio
async def test_enter_limbo_not_active_fails(db_session, test_project):
    """Test that entering limbo on non-active sprint fails."""
    from app.services.sprint_service import SprintService

    sprint = Sprint(
        project_id=test_project.id,
        name="Planned Sprint",
        status=SprintStatus.PLANNED,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    service = SprintService(db_session)

    with pytest.raises(ValueError, match="active sprint"):
        await service.enter_limbo(sprint)


# ============== Additional edge case tests ==============
# Note: API tests for sprint creation removed in CHT-588


@pytest.mark.asyncio
async def test_list_sprints_project_not_found(client, auth_headers):
    """Test listing sprints for project that doesn't exist."""
    response = await client.get(
        "/api/sprints?project_id=nonexistent-id",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_list_sprints_not_member(client, auth_headers2, test_project):
    """Test listing sprints when not a team member."""
    response = await client.get(
        f"/api/sprints?project_id={test_project.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_get_current_sprint_project_not_found(client, auth_headers):
    """Test getting current sprint for project that doesn't exist."""
    response = await client.get(
        "/api/sprints/current?project_id=nonexistent-id",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_get_current_sprint_not_member(client, auth_headers2, test_project):
    """Test getting current sprint when not a team member."""
    response = await client.get(
        f"/api/sprints/current?project_id={test_project.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_get_sprint_not_found(client, auth_headers):
    """Test getting sprint that doesn't exist."""
    response = await client.get(
        "/api/sprints/nonexistent-id",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_get_sprint_not_member(client, auth_headers2, test_sprint):
    """Test getting sprint when not a team member."""
    response = await client.get(
        f"/api/sprints/{test_sprint.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_update_sprint_not_found(client, auth_headers):
    """Test updating sprint that doesn't exist."""
    response = await client.patch(
        "/api/sprints/nonexistent-id",
        headers=auth_headers,
        json={"name": "Updated"},
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_sprint_not_member(client, auth_headers2, test_sprint):
    """Test updating sprint when not a team member."""
    response = await client.patch(
        f"/api/sprints/{test_sprint.id}",
        headers=auth_headers2,
        json={"name": "Unauthorized Update"},
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_close_sprint_not_found(client, auth_headers):
    """Test closing sprint that doesn't exist."""
    response = await client.post(
        "/api/sprints/nonexistent-id/close",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_close_sprint_not_member(client, auth_headers2, test_project, db_session):
    """Test closing sprint when not a team member."""
    sprint = Sprint(
        project_id=test_project.id,
        name="Active Sprint",
        status=SprintStatus.ACTIVE,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    response = await client.post(
        f"/api/sprints/{sprint.id}/close",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_list_sprints_with_pagination(client, auth_headers, test_project, db_session):
    """Test listing sprints with skip and limit."""
    # Create multiple sprints
    for i in range(5):
        sprint = Sprint(
            project_id=test_project.id,
            name=f"Sprint {i}",
            status=SprintStatus.PLANNED,
        )
        db_session.add(sprint)
    await db_session.commit()

    response = await client.get(
        f"/api/sprints?project_id={test_project.id}&skip=1&limit=2",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    # We have at least 6 sprints (test_sprint + 5 created), limit is 2
    assert len(data) == 2


@pytest.mark.asyncio
async def test_update_sprint_status(client, auth_headers, test_project, db_session):
    """Test updating sprint status via patch."""
    sprint = Sprint(
        project_id=test_project.id,
        name="Status Update Sprint",
        status=SprintStatus.PLANNED,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    response = await client.patch(
        f"/api/sprints/{sprint.id}",
        headers=auth_headers,
        json={"status": "active"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "active"


@pytest.mark.asyncio
async def test_update_sprint_budget(client, auth_headers, test_project, db_session):
    """Test updating sprint budget."""
    sprint = Sprint(
        project_id=test_project.id,
        name="Budget Update Sprint",
        status=SprintStatus.PLANNED,
        budget=10,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    response = await client.patch(
        f"/api/sprints/{sprint.id}",
        headers=auth_headers,
        json={"budget": 25},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["budget"] == 25


@pytest.mark.asyncio
async def test_close_sprint_with_rituals_enters_limbo_via_api(client, auth_headers, test_project, db_session):
    """Test closing sprint via API enters limbo when rituals exist."""
    from app.models.ritual import Ritual
    from app.enums import RitualTrigger, ApprovalMode

    # Create a ritual for the project
    ritual = Ritual(
        project_id=test_project.id,
        name="Test Ritual",
        prompt="Run the test suite",
        trigger=RitualTrigger.EVERY_SPRINT,
        approval_mode=ApprovalMode.AUTO,
    )
    db_session.add(ritual)

    # Create active and next sprint
    active_sprint = Sprint(
        project_id=test_project.id,
        name="Current Sprint",
        status=SprintStatus.ACTIVE,
    )
    next_sprint = Sprint(
        project_id=test_project.id,
        name="Next Sprint",
        status=SprintStatus.PLANNED,
    )
    db_session.add_all([active_sprint, next_sprint])
    await db_session.commit()
    await db_session.refresh(active_sprint)

    response = await client.post(
        f"/api/sprints/{active_sprint.id}/close",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["limbo"] is True
    assert data["status"] == "active"  # Still active, just in limbo


# ============== Budget Transaction Tests (CHT-401) ==============


@pytest.mark.asyncio
async def test_budget_transaction_created_on_issue_done(client, auth_headers, test_project, test_user, db_session):
    """Test that a BudgetTransaction is created when an issue is completed.

    CHT-401: When an issue is marked as done, a transaction record should be
    created in the budget_transactions table for audit purposes.
    """
    from app.models.budget_transaction import BudgetTransaction
    from sqlalchemy import select

    # Create an active sprint with a budget
    sprint = Sprint(
        project_id=test_project.id,
        name="Transaction Test Sprint",
        status=SprintStatus.ACTIVE,
        budget=20,
        points_spent=0,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    # Create an issue with an estimate
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-300",
        number=300,
        title="Transaction Test Issue",
        estimate=5,
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)

    # Complete the issue
    response = await client.patch(
        f"/api/issues/{issue.id}",
        headers=auth_headers,
        json={"status": "done"},
    )
    assert response.status_code == 200

    # Verify a BudgetTransaction was created
    result = await db_session.execute(
        select(BudgetTransaction).where(BudgetTransaction.issue_id == issue.id)
    )
    transaction = result.scalar_one_or_none()

    assert transaction is not None, "BudgetTransaction should be created on issue completion"
    assert transaction.sprint_id == sprint.id
    assert transaction.points == 5
    assert transaction.issue_identifier == f"{test_project.key}-300"
    assert transaction.issue_title == "Transaction Test Issue"
    assert transaction.sprint_name == "Transaction Test Sprint"


@pytest.mark.asyncio
async def test_budget_transaction_contains_denormalized_data(client, auth_headers, test_project, test_user, db_session):
    """Test that BudgetTransaction contains denormalized issue/sprint data.

    CHT-401: The transaction should store a snapshot of issue_identifier,
    issue_title, and sprint_name at the time of completion for historical accuracy.
    """
    from app.models.budget_transaction import BudgetTransaction
    from sqlalchemy import select

    # Create an active sprint
    sprint = Sprint(
        project_id=test_project.id,
        name="Original Sprint Name",
        status=SprintStatus.ACTIVE,
        budget=10,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    # Create and complete an issue
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-301",
        number=301,
        title="Original Issue Title",
        estimate=2,
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)

    response = await client.patch(
        f"/api/issues/{issue.id}",
        headers=auth_headers,
        json={"status": "done"},
    )
    assert response.status_code == 200

    # Now rename both the sprint and issue
    sprint.name = "Renamed Sprint"
    issue.title = "Renamed Issue Title"
    await db_session.commit()

    # The transaction should still have the ORIGINAL names (denormalized)
    result = await db_session.execute(
        select(BudgetTransaction).where(BudgetTransaction.issue_id == issue.id)
    )
    transaction = result.scalar_one()

    assert transaction.sprint_name == "Original Sprint Name", "Sprint name should be denormalized"
    assert transaction.issue_title == "Original Issue Title", "Issue title should be denormalized"


@pytest.mark.asyncio
async def test_list_transactions_endpoint(client, auth_headers, test_project, test_user, db_session):
    """Test GET /sprints/{sprint_id}/transactions endpoint.

    CHT-401: Endpoint should return the list of budget transactions for a sprint.
    """
    from app.models.budget_transaction import BudgetTransaction

    # Create an active sprint
    sprint = Sprint(
        project_id=test_project.id,
        name="Transactions List Sprint",
        status=SprintStatus.ACTIVE,
        budget=50,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    # Create multiple transactions directly
    for i in range(3):
        tx = BudgetTransaction(
            sprint_id=sprint.id,
            issue_id=None,  # Can be null
            user_id=test_user.id,
            points=i + 1,
            issue_identifier=f"{test_project.key}-{400 + i}",
            issue_title=f"Transaction Issue {i}",
            sprint_name=sprint.name,
        )
        db_session.add(tx)
    await db_session.commit()

    # Fetch transactions via API
    response = await client.get(
        f"/api/sprints/{sprint.id}/transactions",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()

    assert len(data) == 3
    # Should be ordered by created_at desc (most recent first)
    assert data[0]["points"] == 3
    assert data[1]["points"] == 2
    assert data[2]["points"] == 1


@pytest.mark.asyncio
async def test_list_transactions_empty(client, auth_headers, test_project, db_session):
    """Test GET /sprints/{sprint_id}/transactions returns empty list for new sprint."""
    # Create a sprint with no transactions
    sprint = Sprint(
        project_id=test_project.id,
        name="Empty Sprint",
        status=SprintStatus.ACTIVE,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    response = await client.get(
        f"/api/sprints/{sprint.id}/transactions",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data == []


@pytest.mark.asyncio
async def test_list_transactions_not_found(client, auth_headers):
    """Test GET /sprints/{sprint_id}/transactions returns 404 for nonexistent sprint."""
    response = await client.get(
        "/api/sprints/nonexistent-id/transactions",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_list_transactions_not_member(client, auth_headers2, test_project, db_session):
    """Test GET /sprints/{sprint_id}/transactions returns 403 when not a team member."""
    sprint = Sprint(
        project_id=test_project.id,
        name="Member Check Sprint",
        status=SprintStatus.ACTIVE,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    response = await client.get(
        f"/api/sprints/{sprint.id}/transactions",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_list_transactions_with_pagination(client, auth_headers, test_project, test_user, db_session):
    """Test GET /sprints/{sprint_id}/transactions supports skip and limit."""
    from app.models.budget_transaction import BudgetTransaction

    sprint = Sprint(
        project_id=test_project.id,
        name="Pagination Sprint",
        status=SprintStatus.ACTIVE,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    # Create 5 transactions
    for i in range(5):
        tx = BudgetTransaction(
            sprint_id=sprint.id,
            user_id=test_user.id,
            points=i + 1,
            issue_identifier=f"{test_project.key}-{500 + i}",
            issue_title=f"Paginated Issue {i}",
            sprint_name=sprint.name,
        )
        db_session.add(tx)
    await db_session.commit()

    response = await client.get(
        f"/api/sprints/{sprint.id}/transactions?skip=1&limit=2",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2


@pytest.mark.asyncio
async def test_budget_transaction_no_duplicate_on_status_unchanged(client, auth_headers, test_project, test_user, db_session):
    """Test that updating a done issue doesn't create duplicate transactions.

    If an issue is already done and we update it (e.g., change title),
    no new BudgetTransaction should be created.
    """
    from app.models.budget_transaction import BudgetTransaction
    from app.enums import IssueStatus
    from sqlalchemy import select, func

    # Create an active sprint
    sprint = Sprint(
        project_id=test_project.id,
        name="No Duplicate Sprint",
        status=SprintStatus.ACTIVE,
        budget=20,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)

    # Create an issue already marked as done
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-600",
        number=600,
        title="Already Done Issue",
        estimate=3,
        status=IssueStatus.DONE,
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)

    # Update the issue title (not status)
    response = await client.patch(
        f"/api/issues/{issue.id}",
        headers=auth_headers,
        json={"title": "Renamed Done Issue"},
    )
    assert response.status_code == 200

    # Count transactions for this issue - should be 0
    result = await db_session.execute(
        select(func.count(BudgetTransaction.id)).where(BudgetTransaction.issue_id == issue.id)
    )
    count = result.scalar()
    assert count == 0, "No transaction should be created when done issue is updated"


# --- Sprint model property tests (CHT-921) ---

class TestSprintModelProperties:
    """Unit tests for Sprint model computed properties."""

    def test_in_arrears_no_budget(self):
        """Sprint with no budget is never in arrears."""
        sprint = Sprint(name="test", project_id="p1", budget=None, points_spent=100)
        assert sprint.in_arrears is False

    def test_in_arrears_under_budget(self):
        """Sprint under budget is not in arrears."""
        sprint = Sprint(name="test", project_id="p1", budget=20, points_spent=15)
        assert sprint.in_arrears is False

    def test_in_arrears_over_budget(self):
        """Sprint over budget is in arrears."""
        sprint = Sprint(name="test", project_id="p1", budget=20, points_spent=25)
        assert sprint.in_arrears is True

    def test_remaining_budget_none(self):
        """Sprint with no budget returns None remaining."""
        sprint = Sprint(name="test", project_id="p1", budget=None, points_spent=5)
        assert sprint.remaining_budget is None

    def test_remaining_budget_value(self):
        """Sprint with budget returns correct remaining."""
        sprint = Sprint(name="test", project_id="p1", budget=20, points_spent=8)
        assert sprint.remaining_budget == 12

    def test_token_in_arrears_no_budget(self):
        """Sprint with no token budget is never in arrears."""
        sprint = Sprint(name="test", project_id="p1", token_budget=None, tokens_spent=1000)
        assert sprint.token_in_arrears is False

    def test_token_in_arrears_over_budget(self):
        """Sprint over token budget is in arrears."""
        sprint = Sprint(name="test", project_id="p1", token_budget=500, tokens_spent=1000)
        assert sprint.token_in_arrears is True

    def test_remaining_token_budget_none(self):
        """Sprint with no token budget returns None remaining."""
        sprint = Sprint(name="test", project_id="p1", token_budget=None, tokens_spent=100)
        assert sprint.remaining_token_budget is None

    def test_remaining_token_budget_value(self):
        """Sprint with token budget returns correct remaining."""
        sprint = Sprint(name="test", project_id="p1", token_budget=1000, tokens_spent=300)
        assert sprint.remaining_token_budget == 700


# --- Sprint service-level coverage tests (CHT-922) ---

@pytest.mark.asyncio
async def test_sprint_service_close_non_active_raises(db_session, test_project):
    """Closing a non-active sprint raises ValueError (covers sprint_service.py L127)."""
    from app.services.sprint_service import SprintService

    planned_sprint = Sprint(
        project_id=test_project.id,
        name="Planned Sprint",
        status=SprintStatus.PLANNED,
    )
    db_session.add(planned_sprint)
    await db_session.flush()

    service = SprintService(db_session)
    with pytest.raises(ValueError, match="Can only close an active sprint"):
        await service.close_sprint(planned_sprint)


@pytest.mark.asyncio
async def test_sprint_service_close_creates_next_if_missing(db_session, test_project):
    """Closing active sprint when no next sprint exists creates one (covers sprint_service.py L137-146)."""
    from app.services.sprint_service import SprintService
    from sqlalchemy import select, delete as sa_delete

    # Remove any existing planned sprints so close_sprint has to create one
    await db_session.execute(
        sa_delete(Sprint).where(
            Sprint.project_id == test_project.id,
            Sprint.status == SprintStatus.PLANNED,
        )
    )
    await db_session.flush()

    # Create an active sprint with no next sprint
    sprint = Sprint(
        project_id=test_project.id,
        name="Active Sprint",
        status=SprintStatus.ACTIVE,
        budget=20,
    )
    db_session.add(sprint)
    await db_session.flush()

    service = SprintService(db_session)
    await service.close_sprint(sprint)

    # Without rituals, sprint should be completed (not limbo)
    assert sprint.status == SprintStatus.COMPLETED

    # A new planned sprint should have been created
    result = await db_session.execute(
        select(Sprint).where(
            Sprint.project_id == test_project.id,
            Sprint.status == SprintStatus.PLANNED,
        )
    )
    planned_sprints = list(result.scalars().all())
    assert len(planned_sprints) >= 1


@pytest.mark.asyncio
async def test_sprint_service_delete(db_session, test_project):
    """Test SprintService.delete (covers sprint_service.py L245-246)."""
    from app.services.sprint_service import SprintService
    from sqlalchemy import select

    sprint = Sprint(
        project_id=test_project.id,
        name="To Delete",
        status=SprintStatus.PLANNED,
    )
    db_session.add(sprint)
    await db_session.flush()
    sprint_id = sprint.id

    service = SprintService(db_session)
    await service.delete(sprint)

    result = await db_session.execute(
        select(Sprint).where(Sprint.id == sprint_id)
    )
    assert result.scalar_one_or_none() is None
