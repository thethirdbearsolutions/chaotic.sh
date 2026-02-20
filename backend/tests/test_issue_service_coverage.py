"""Tests for issue_service.py coverage gaps (CHT-919).

Targets uncovered lines: label filtering (L796-802), issue_type filter (L858, L892),
shuffle sort (L864, L898), list_by_team deprecated (L916), incoming relations with
blocked_by (L1252-1256), batch_update label validation (L1342, L1346-1357, L1383),
uncomplete issue (L648), and cross-reference edge cases (L1139, L1143, L1178).
"""
import pytest
import pytest_asyncio
from app.oxyde_models.issue import (
    OxydeIssue, OxydeIssueRelation, OxydeIssueLabel,
)
from app.oxyde_models.label import OxydeLabel
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.sprint import OxydeSprint
from app.enums import IssueStatus, IssuePriority, IssueType, IssueRelationType, SprintStatus
from app.services.issue_service import IssueService


async def _next_issue_number(project):
    """Increment project issue_count in DB and return new number."""
    from oxyde import execute_raw
    await execute_raw(
        "UPDATE projects SET issue_count = issue_count + 1 WHERE id = ?",
        [project.id],
    )
    refreshed = await OxydeProject.objects.get(id=project.id)
    return refreshed.issue_count


@pytest_asyncio.fixture
async def issue_service(db):
    return IssueService()


@pytest_asyncio.fixture
async def test_label2(db, test_team):
    """Create a second test label."""
    label = await OxydeLabel.objects.create(team_id=test_team.id, name="Enhancement", color="#00ff00")
    return label


@pytest_asyncio.fixture
async def labeled_issue(db, test_project, test_user, test_label):
    """Create an issue with a label attached."""
    number = await _next_issue_number(test_project)
    issue = await OxydeIssue.objects.create(
        project_id=test_project.id,
        identifier=f"{test_project.key}-{number}",
        number=number,
        title="Labeled Issue",
        description="Has labels",
        creator_id=test_user.id,
    )
    # Create the M2M link via through table
    await OxydeIssueLabel.objects.create(issue_id=issue.id, label_id=test_label.id)
    return issue


@pytest_asyncio.fixture
async def active_sprint(db, test_project):
    """Create an active sprint for the test project."""
    sprint = await OxydeSprint.objects.create(
        project_id=test_project.id,
        name="Active Sprint",
        status=SprintStatus.ACTIVE,
        budget=20,
    )
    return sprint


# --- Label filtering in list_issues (L796-802) ---

@pytest.mark.asyncio
async def test_list_issues_filter_by_label(
    db, issue_service, test_project, test_team, labeled_issue, test_label, test_issue
):
    """list_issues with label_names filters to only labeled issues (covers L796-802)."""
    results = await issue_service.list_issues(
        team_id=test_team.id,
        label_names=[test_label.name],
    )
    result_ids = {r.id for r in results}
    assert labeled_issue.id in result_ids
    # Unlabeled test_issue should be excluded
    assert test_issue.id not in result_ids


# --- Issue type filter on list_by_sprint (L858) and shuffle (L864) ---

@pytest.mark.asyncio
async def test_list_by_sprint_with_issue_type(
    db, issue_service, test_project, test_user, active_sprint
):
    """list_by_sprint filters by issue_type (covers L858)."""
    # Create a task and a bug in the sprint
    num1 = await _next_issue_number(test_project)
    task = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier=f"{test_project.key}-{num1}",
        number=num1, title="Task", creator_id=test_user.id,
        sprint_id=active_sprint.id, issue_type=IssueType.TASK,
    )
    num2 = await _next_issue_number(test_project)
    bug = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier=f"{test_project.key}-{num2}",
        number=num2, title="Bug", creator_id=test_user.id,
        sprint_id=active_sprint.id, issue_type=IssueType.BUG,
    )

    results = await issue_service.list_by_sprint(active_sprint.id, issue_type=IssueType.BUG)
    assert all(r.issue_type == IssueType.BUG for r in results)
    assert any(r.id == bug.id for r in results)


@pytest.mark.asyncio
async def test_list_by_sprint_shuffle_sort(
    db, issue_service, test_project, test_user, active_sprint
):
    """list_by_sprint with sort_by=random invokes shuffle (covers L864)."""
    from unittest.mock import patch
    num = await _next_issue_number(test_project)
    issue = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier=f"{test_project.key}-{num}",
        number=num, title="Shuffled", creator_id=test_user.id,
        sprint_id=active_sprint.id,
    )

    with patch("app.services.issue_service.random.shuffle") as mock_shuffle:
        results = await issue_service.list_by_sprint(active_sprint.id, sort_by="random")
        assert len(results) >= 1
        mock_shuffle.assert_called_once()


# --- Issue type + shuffle on list_by_assignee (L892, L898) ---

@pytest.mark.asyncio
async def test_list_by_assignee_with_type_and_shuffle(
    db, issue_service, test_project, test_user
):
    """list_by_assignee filters by issue_type and supports shuffle (covers L892, L898)."""
    from unittest.mock import patch
    num = await _next_issue_number(test_project)
    task = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier=f"{test_project.key}-{num}",
        number=num, title="My Task", creator_id=test_user.id,
        assignee_id=test_user.id, issue_type=IssueType.TASK,
    )

    with patch("app.services.issue_service.random.shuffle") as mock_shuffle:
        results = await issue_service.list_by_assignee(
            test_user.id, issue_type=IssueType.TASK, sort_by="random"
        )
        assert len(results) >= 1
        assert all(r.issue_type == IssueType.TASK for r in results)
        mock_shuffle.assert_called_once()


# --- Deprecated list_by_team (L916) ---

@pytest.mark.asyncio
async def test_list_by_team_deprecated(
    db, issue_service, test_team, test_issue
):
    """list_by_team delegates to list_issues (covers L916)."""
    results = await issue_service.list_by_team(test_team.id)
    assert len(results) >= 1


# --- Incoming relations with blocked_by display type (L1252-1256) ---

@pytest.mark.asyncio
async def test_list_relations_incoming_blocks(
    db, issue_service, test_project, test_user
):
    """list_relations shows incoming BLOCKS as blocked_by (covers L1252-1256)."""
    num1 = await _next_issue_number(test_project)
    blocker = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier=f"{test_project.key}-{num1}",
        number=num1, title="Blocker", creator_id=test_user.id,
    )
    num2 = await _next_issue_number(test_project)
    blocked = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier=f"{test_project.key}-{num2}",
        number=num2, title="Blocked", creator_id=test_user.id,
    )

    # Create a relation: blocker blocks blocked
    relation = await OxydeIssueRelation.objects.create(
        issue_id=blocker.id, related_issue_id=blocked.id,
        relation_type=IssueRelationType.BLOCKS,
    )

    # View from the blocked issue's perspective - should show as "blocked_by"
    relations = await issue_service.list_relations(blocked.id)
    assert len(relations) == 1
    assert relations[0]["direction"] == "incoming"
    assert relations[0]["relation_type"] == "blocked_by"
    assert relations[0]["related_issue_identifier"] == blocker.identifier


# --- Uncomplete issue: status DONE -> non-DONE clears completed_at (L648) ---

@pytest.mark.asyncio
async def test_uncomplete_issue_clears_completed_at(
    db, issue_service, test_issue, test_user
):
    """Changing status from DONE back clears completed_at (covers L648)."""
    from app.schemas.issue import IssueUpdate

    # First mark as done
    update_done = IssueUpdate(status=IssueStatus.DONE)
    await issue_service.update(
        test_issue, update_done, user_id=test_user.id, is_human_request=True,
    )
    # Re-fetch to see the DB state
    issue = await OxydeIssue.objects.get(id=test_issue.id)
    assert issue.completed_at is not None

    # Now move back to in_progress
    update_reopen = IssueUpdate(status=IssueStatus.IN_PROGRESS)
    await issue_service.update(
        issue, update_reopen, user_id=test_user.id, is_human_request=True,
    )
    issue = await OxydeIssue.objects.get(id=test_issue.id)
    assert issue.completed_at is None


# --- Batch update with label replacement (L1346-1357) ---

@pytest.mark.asyncio
async def test_batch_update_replace_labels(
    db, issue_service, test_issue, test_label
):
    """batch_update replaces labels when label_ids provided (covers L1346-1357, L1383)."""
    issue = await OxydeIssue.objects.get(id=test_issue.id)

    updated = await issue_service.batch_update(
        [issue], update_data={}, label_ids=[test_label.id]
    )
    assert len(updated) == 1
    assert any(l.id == test_label.id for l in updated[0].labels)


@pytest.mark.asyncio
async def test_batch_update_replace_labels_missing(
    db, issue_service, test_issue
):
    """batch_update raises when replace label_ids include nonexistent (covers L1350-1353)."""
    issue = await OxydeIssue.objects.get(id=test_issue.id)

    with pytest.raises(ValueError, match="Labels not found"):
        await issue_service.batch_update(
            [issue], update_data={}, label_ids=["nonexistent-label"]
        )


# --- Batch update add_label_ids with team validation (L1342) ---

@pytest.mark.asyncio
async def test_batch_update_add_label_wrong_team(
    db, issue_service, test_issue, test_team
):
    """batch_update raises when add_label belongs to different team (covers L1342)."""
    from app.oxyde_models.team import OxydeTeam
    other_team = await OxydeTeam.objects.create(name="Other Team", key="OTH", description="Other")

    other_label = await OxydeLabel.objects.create(team_id=other_team.id, name="OtherLabel", color="#000000")

    issue = await OxydeIssue.objects.get(id=test_issue.id)

    with pytest.raises(ValueError, match="does not belong to this team"):
        await issue_service.batch_update(
            [issue], update_data={},
            add_label_ids=[other_label.id],
            team_id=test_team.id,
        )


# --- Cross-reference: source issue not found (L1139) ---

@pytest.mark.asyncio
async def test_cross_references_source_not_found(db, issue_service):
    """create_cross_references returns empty for nonexistent source (covers L1139)."""
    result = await issue_service.create_cross_references(
        "nonexistent-id", "see PROJ-999"
    )
    assert result == []


# --- Cross-reference: self-reference filtered out (L1143) ---

@pytest.mark.asyncio
async def test_cross_references_self_reference_filtered(
    db, issue_service, test_issue
):
    """create_cross_references filters out self-references (covers L1143)."""
    result = await issue_service.create_cross_references(
        test_issue.id, f"see {test_issue.identifier}"
    )
    assert result == []


# --- Cross-reference: target not found skipped (L1178) ---

@pytest.mark.asyncio
async def test_cross_references_target_not_found(
    db, issue_service, test_issue
):
    """create_cross_references skips identifiers that don't exist (covers L1178)."""
    result = await issue_service.create_cross_references(
        test_issue.id, "see NONEXISTENT-999"
    )
    assert result == []


# --- list_issues with issue_type filter (L773) ---

@pytest.mark.asyncio
async def test_list_issues_filter_by_type(
    db, issue_service, test_team, test_project, test_user
):
    """list_issues filters by issue_type (covers L773)."""
    num = await _next_issue_number(test_project)
    bug = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier=f"{test_project.key}-{num}",
        number=num, title="Bug Issue", creator_id=test_user.id,
        issue_type=IssueType.BUG,
    )

    results = await issue_service.list_issues(
        team_id=test_team.id, issue_type=IssueType.BUG,
    )
    assert all(r.issue_type == IssueType.BUG for r in results)


# --- list_issues with no_sprint filter (L776) ---

@pytest.mark.asyncio
async def test_list_issues_no_sprint_filter(
    db, issue_service, test_team, test_issue
):
    """list_issues with sprint_id='no_sprint' returns unsprinted issues (covers L776)."""
    results = await issue_service.list_issues(
        team_id=test_team.id, sprint_id="no_sprint",
    )
    # test_issue has no sprint, should be included
    assert any(r.id == test_issue.id for r in results)


# --- list_issues with unassigned filter (L783) ---

@pytest.mark.asyncio
async def test_list_issues_unassigned_filter(
    db, issue_service, test_team, test_issue
):
    """list_issues with assignee_id='unassigned' returns unassigned issues (covers L783)."""
    results = await issue_service.list_issues(
        team_id=test_team.id, assignee_id="unassigned",
    )
    assert any(r.id == test_issue.id for r in results)


# --- batch_update replace labels with wrong team (L1355-1357) ---

@pytest.mark.asyncio
async def test_batch_update_replace_label_wrong_team(
    db, issue_service, test_issue, test_team
):
    """batch_update raises when replace label belongs to different team (covers L1355-1357)."""
    from app.oxyde_models.team import OxydeTeam
    other_team = await OxydeTeam.objects.create(name="Replace Team", key="RPL", description="Other")

    other_label = await OxydeLabel.objects.create(team_id=other_team.id, name="Foreign", color="#000000")

    issue = await OxydeIssue.objects.get(id=test_issue.id)

    with pytest.raises(ValueError, match="does not belong to this team"):
        await issue_service.batch_update(
            [issue], update_data={},
            label_ids=[other_label.id],
            team_id=test_team.id,
        )
