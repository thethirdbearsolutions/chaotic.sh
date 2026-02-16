"""Tests for issue_service.py coverage gaps (CHT-919).

Targets uncovered lines: label filtering (L796-802), issue_type filter (L858, L892),
shuffle sort (L864, L898), list_by_team deprecated (L916), incoming relations with
blocked_by (L1252-1256), batch_update label validation (L1342, L1346-1357, L1383),
uncomplete issue (L648), and cross-reference edge cases (L1139, L1143, L1178).
"""
import pytest
import pytest_asyncio
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models.issue import (
    Issue, IssueStatus, IssuePriority, IssueType, Label,
    IssueRelation, IssueRelationType, issue_labels,
)
from app.models.project import Project
from app.models.sprint import Sprint, SprintStatus
from app.services.issue_service import IssueService


@pytest_asyncio.fixture
async def issue_service(db_session):
    return IssueService(db_session)


@pytest_asyncio.fixture
async def test_label2(db_session, test_team):
    """Create a second test label."""
    label = Label(team_id=test_team.id, name="Enhancement", color="#00ff00")
    db_session.add(label)
    await db_session.commit()
    await db_session.refresh(label)
    return label


@pytest_asyncio.fixture
async def labeled_issue(db_session, test_project, test_user, test_label):
    """Create an issue with a label attached."""
    project = test_project
    project.issue_count += 1
    issue = Issue(
        project_id=project.id,
        identifier=f"{project.key}-{project.issue_count}",
        number=project.issue_count,
        title="Labeled Issue",
        description="Has labels",
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.flush()
    # Use raw insert to avoid lazy-load on issue.labels
    from app.models.issue import issue_labels
    await db_session.execute(
        issue_labels.insert().values(issue_id=issue.id, label_id=test_label.id)
    )
    await db_session.commit()
    await db_session.refresh(issue)
    return issue


@pytest_asyncio.fixture
async def active_sprint(db_session, test_project):
    """Create an active sprint for the test project."""
    sprint = Sprint(
        project_id=test_project.id,
        name="Active Sprint",
        status=SprintStatus.ACTIVE,
        budget=20,
    )
    db_session.add(sprint)
    await db_session.commit()
    await db_session.refresh(sprint)
    return sprint


# --- Label filtering in list_issues (L796-802) ---

@pytest.mark.asyncio
async def test_list_issues_filter_by_label(
    db_session, issue_service, test_project, test_team, labeled_issue, test_label
):
    """list_issues with label_names filters to only labeled issues (covers L796-802)."""
    results = await issue_service.list_issues(
        team_id=test_team.id,
        label_names=[test_label.name],
    )
    assert len(results) >= 1
    assert all(labeled_issue.id == r.id for r in results)


# --- Issue type filter on list_by_sprint (L858) and shuffle (L864) ---

@pytest.mark.asyncio
async def test_list_by_sprint_with_issue_type(
    db_session, issue_service, test_project, test_user, active_sprint
):
    """list_by_sprint filters by issue_type (covers L858)."""
    # Create a task and a bug in the sprint
    test_project.issue_count += 1
    task = Issue(
        project_id=test_project.id, identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count, title="Task", creator_id=test_user.id,
        sprint_id=active_sprint.id, issue_type=IssueType.TASK,
    )
    test_project.issue_count += 1
    bug = Issue(
        project_id=test_project.id, identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count, title="Bug", creator_id=test_user.id,
        sprint_id=active_sprint.id, issue_type=IssueType.BUG,
    )
    db_session.add_all([task, bug])
    await db_session.commit()

    results = await issue_service.list_by_sprint(active_sprint.id, issue_type=IssueType.BUG)
    assert all(r.issue_type == IssueType.BUG for r in results)
    assert any(r.id == bug.id for r in results)


@pytest.mark.asyncio
async def test_list_by_sprint_shuffle_sort(
    db_session, issue_service, test_project, test_user, active_sprint
):
    """list_by_sprint with sort_by=shuffle returns results (covers L864)."""
    test_project.issue_count += 1
    issue = Issue(
        project_id=test_project.id, identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count, title="Shuffled", creator_id=test_user.id,
        sprint_id=active_sprint.id,
    )
    db_session.add(issue)
    await db_session.commit()

    results = await issue_service.list_by_sprint(active_sprint.id, sort_by="random")
    assert len(results) >= 1


# --- Issue type + shuffle on list_by_assignee (L892, L898) ---

@pytest.mark.asyncio
async def test_list_by_assignee_with_type_and_shuffle(
    db_session, issue_service, test_project, test_user
):
    """list_by_assignee filters by issue_type and supports shuffle (covers L892, L898)."""
    test_project.issue_count += 1
    task = Issue(
        project_id=test_project.id, identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count, title="My Task", creator_id=test_user.id,
        assignee_id=test_user.id, issue_type=IssueType.TASK,
    )
    db_session.add(task)
    await db_session.commit()

    results = await issue_service.list_by_assignee(
        test_user.id, issue_type=IssueType.TASK, sort_by="random"
    )
    assert len(results) >= 1
    assert all(r.issue_type == IssueType.TASK for r in results)


# --- Deprecated list_by_team (L916) ---

@pytest.mark.asyncio
async def test_list_by_team_deprecated(
    db_session, issue_service, test_team, test_issue
):
    """list_by_team delegates to list_issues (covers L916)."""
    results = await issue_service.list_by_team(test_team.id)
    assert len(results) >= 1


# --- Incoming relations with blocked_by display type (L1252-1256) ---

@pytest.mark.asyncio
async def test_list_relations_incoming_blocks(
    db_session, issue_service, test_project, test_user
):
    """list_relations shows incoming BLOCKS as blocked_by (covers L1252-1256)."""
    test_project.issue_count += 1
    blocker = Issue(
        project_id=test_project.id, identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count, title="Blocker", creator_id=test_user.id,
    )
    test_project.issue_count += 1
    blocked = Issue(
        project_id=test_project.id, identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count, title="Blocked", creator_id=test_user.id,
    )
    db_session.add_all([blocker, blocked])
    await db_session.flush()

    # Create a relation: blocker blocks blocked
    relation = IssueRelation(
        issue_id=blocker.id, related_issue_id=blocked.id,
        relation_type=IssueRelationType.BLOCKS,
    )
    db_session.add(relation)
    await db_session.commit()

    # View from the blocked issue's perspective - should show as "blocked_by"
    relations = await issue_service.list_relations(blocked.id)
    assert len(relations) == 1
    assert relations[0]["direction"] == "incoming"
    assert relations[0]["relation_type"] == "blocked_by"
    assert relations[0]["related_issue_identifier"] == blocker.identifier


# --- Uncomplete issue: status DONE -> non-DONE clears completed_at (L648) ---

@pytest.mark.asyncio
async def test_uncomplete_issue_clears_completed_at(
    db_session, issue_service, test_issue, test_user
):
    """Changing status from DONE back clears completed_at (covers L648)."""
    from app.schemas.issue import IssueUpdate

    # First mark as done
    update_done = IssueUpdate(status=IssueStatus.DONE)
    await issue_service.update(
        test_issue, update_done, user_id=test_user.id, is_human_request=True,
    )
    assert test_issue.completed_at is not None

    # Now move back to in_progress
    update_reopen = IssueUpdate(status=IssueStatus.IN_PROGRESS)
    await issue_service.update(
        test_issue, update_reopen, user_id=test_user.id, is_human_request=True,
    )
    assert test_issue.completed_at is None


# --- Batch update with label replacement (L1346-1357) ---

@pytest.mark.asyncio
async def test_batch_update_replace_labels(
    db_session, issue_service, test_issue, test_label
):
    """batch_update replaces labels when label_ids provided (covers L1346-1357, L1383)."""
    # Reload issue with labels
    result = await db_session.execute(
        select(Issue).options(selectinload(Issue.labels), selectinload(Issue.creator))
        .where(Issue.id == test_issue.id)
    )
    issue = result.scalar_one()

    updated = await issue_service.batch_update(
        [issue], update_data={}, label_ids=[test_label.id]
    )
    assert len(updated) == 1
    assert any(l.id == test_label.id for l in updated[0].labels)


@pytest.mark.asyncio
async def test_batch_update_replace_labels_missing(
    db_session, issue_service, test_issue
):
    """batch_update raises when replace label_ids include nonexistent (covers L1350-1353)."""
    result = await db_session.execute(
        select(Issue).options(selectinload(Issue.labels), selectinload(Issue.creator))
        .where(Issue.id == test_issue.id)
    )
    issue = result.scalar_one()

    with pytest.raises(ValueError, match="Labels not found"):
        await issue_service.batch_update(
            [issue], update_data={}, label_ids=["nonexistent-label"]
        )


# --- Batch update add_label_ids with team validation (L1342) ---

@pytest.mark.asyncio
async def test_batch_update_add_label_wrong_team(
    db_session, issue_service, test_issue, test_label
):
    """batch_update raises when add_label belongs to different team (covers L1342)."""
    from app.models.team import Team
    other_team = Team(name="Other Team", key="OTH", description="Other")
    db_session.add(other_team)
    await db_session.flush()

    other_label = Label(team_id=other_team.id, name="OtherLabel", color="#000000")
    db_session.add(other_label)
    await db_session.commit()

    result = await db_session.execute(
        select(Issue).options(selectinload(Issue.labels), selectinload(Issue.creator))
        .where(Issue.id == test_issue.id)
    )
    issue = result.scalar_one()

    with pytest.raises(ValueError, match="does not belong to this team"):
        await issue_service.batch_update(
            [issue], update_data={},
            add_label_ids=[other_label.id],
            team_id=test_issue.project_id,  # wrong team
        )


# --- Cross-reference: source issue not found (L1139) ---

@pytest.mark.asyncio
async def test_cross_references_source_not_found(db_session, issue_service):
    """create_cross_references returns empty for nonexistent source (covers L1139)."""
    result = await issue_service.create_cross_references(
        "nonexistent-id", "see PROJ-999"
    )
    assert result == []


# --- Cross-reference: self-reference filtered out (L1143) ---

@pytest.mark.asyncio
async def test_cross_references_self_reference_filtered(
    db_session, issue_service, test_issue
):
    """create_cross_references filters out self-references (covers L1143)."""
    result = await issue_service.create_cross_references(
        test_issue.id, f"see {test_issue.identifier}"
    )
    assert result == []


# --- Cross-reference: target not found skipped (L1178) ---

@pytest.mark.asyncio
async def test_cross_references_target_not_found(
    db_session, issue_service, test_issue
):
    """create_cross_references skips identifiers that don't exist (covers L1178)."""
    result = await issue_service.create_cross_references(
        test_issue.id, "see NONEXISTENT-999"
    )
    assert result == []


# --- list_issues with issue_type filter (L773) ---

@pytest.mark.asyncio
async def test_list_issues_filter_by_type(
    db_session, issue_service, test_team, test_project, test_user
):
    """list_issues filters by issue_type (covers L773)."""
    test_project.issue_count += 1
    bug = Issue(
        project_id=test_project.id, identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count, title="Bug Issue", creator_id=test_user.id,
        issue_type=IssueType.BUG,
    )
    db_session.add(bug)
    await db_session.commit()

    results = await issue_service.list_issues(
        team_id=test_team.id, issue_type=IssueType.BUG,
    )
    assert all(r.issue_type == IssueType.BUG for r in results)


# --- list_issues with no_sprint filter (L776) ---

@pytest.mark.asyncio
async def test_list_issues_no_sprint_filter(
    db_session, issue_service, test_team, test_issue
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
    db_session, issue_service, test_team, test_issue
):
    """list_issues with assignee_id='unassigned' returns unassigned issues (covers L783)."""
    results = await issue_service.list_issues(
        team_id=test_team.id, assignee_id="unassigned",
    )
    assert any(r.id == test_issue.id for r in results)


# --- batch_update replace labels with wrong team (L1355-1357) ---

@pytest.mark.asyncio
async def test_batch_update_replace_label_wrong_team(
    db_session, issue_service, test_issue
):
    """batch_update raises when replace label belongs to different team (covers L1355-1357)."""
    from app.models.team import Team
    other_team = Team(name="Replace Team", key="RPL", description="Other")
    db_session.add(other_team)
    await db_session.flush()

    other_label = Label(team_id=other_team.id, name="Foreign", color="#000000")
    db_session.add(other_label)
    await db_session.commit()

    result = await db_session.execute(
        select(Issue).options(selectinload(Issue.labels), selectinload(Issue.creator))
        .where(Issue.id == test_issue.id)
    )
    issue = result.scalar_one()

    with pytest.raises(ValueError, match="does not belong to this team"):
        await issue_service.batch_update(
            [issue], update_data={},
            label_ids=[other_label.id],
            team_id=test_issue.project_id,
        )
