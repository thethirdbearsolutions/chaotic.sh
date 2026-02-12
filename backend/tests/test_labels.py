"""Tests for label endpoints."""
import pytest
import pytest_asyncio
from app.services.agent_service import AgentService
from app.schemas.agent import AgentCreate
from app.utils.security import create_access_token


@pytest.mark.asyncio
async def test_create_label(client, auth_headers, test_team):
    """Test creating a label."""
    response = await client.post(
        f"/api/labels?team_id={test_team.id}",
        headers=auth_headers,
        json={
            "name": "Feature",
            "color": "#22c55e",
            "description": "New feature label",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Feature"
    assert data["color"] == "#22c55e"
    assert data["description"] == "New feature label"


@pytest.mark.asyncio
async def test_create_label_minimal(client, auth_headers, test_team):
    """Test creating label with minimal data."""
    response = await client.post(
        f"/api/labels?team_id={test_team.id}",
        headers=auth_headers,
        json={"name": "Quick Label"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Quick Label"
    assert data["color"] == "#6366f1"  # Default color


@pytest.mark.asyncio
async def test_create_label_not_member(client, auth_headers2, test_team):
    """Test creating label when not a member."""
    response = await client.post(
        f"/api/labels?team_id={test_team.id}",
        headers=auth_headers2,
        json={"name": "Unauthorized Label"},
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_list_labels(client, auth_headers, test_team, test_label):
    """Test listing labels."""
    response = await client.get(
        f"/api/labels?team_id={test_team.id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert any(l["id"] == test_label.id for l in data)


@pytest.mark.asyncio
async def test_get_label(client, auth_headers, test_label):
    """Test getting label by ID."""
    response = await client.get(
        f"/api/labels/{test_label.id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_label.id
    assert data["name"] == test_label.name


@pytest.mark.asyncio
async def test_get_label_not_member(client, auth_headers2, test_label):
    """Test getting label when not a member."""
    response = await client.get(
        f"/api/labels/{test_label.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_get_label_not_found(client, auth_headers):
    """Test getting a label that doesn't exist."""
    response = await client.get(
        "/api/labels/nonexistent-label-id",
        headers=auth_headers,
    )
    assert response.status_code == 404
    assert "Label not found" in response.json()["detail"]


@pytest.mark.asyncio
async def test_list_labels_not_member(client, auth_headers2, test_team):
    """Test listing labels when not a member."""
    response = await client.get(
        f"/api/labels?team_id={test_team.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_update_label(client, auth_headers, test_label):
    """Test updating a label."""
    response = await client.patch(
        f"/api/labels/{test_label.id}",
        headers=auth_headers,
        json={
            "name": "Updated Bug",
            "color": "#ff0000",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Bug"
    assert data["color"] == "#ff0000"


@pytest.mark.asyncio
async def test_update_label_not_found(client, auth_headers):
    """Test updating a label that doesn't exist."""
    response = await client.patch(
        "/api/labels/nonexistent-label-id",
        headers=auth_headers,
        json={"name": "Updated Name"},
    )
    assert response.status_code == 404
    assert "Label not found" in response.json()["detail"]


@pytest.mark.asyncio
async def test_update_label_not_member(client, auth_headers2, test_label):
    """Test updating a label when not a team member."""
    response = await client.patch(
        f"/api/labels/{test_label.id}",
        headers=auth_headers2,
        json={"name": "Unauthorized Update"},
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_delete_label_not_found(client, auth_headers):
    """Test deleting a label that doesn't exist."""
    response = await client.delete(
        "/api/labels/nonexistent-label-id",
        headers=auth_headers,
    )
    assert response.status_code == 404
    assert "Label not found" in response.json()["detail"]


@pytest.mark.asyncio
async def test_delete_label(client, auth_headers, test_team, db_session):
    """Test deleting a label."""
    from app.models.issue import Label

    label = Label(
        team_id=test_team.id,
        name="Delete Me",
        color="#000000",
    )
    db_session.add(label)
    await db_session.commit()
    await db_session.refresh(label)

    response = await client.delete(
        f"/api/labels/{label.id}",
        headers=auth_headers,
    )
    assert response.status_code == 204


@pytest.mark.asyncio
async def test_delete_label_not_admin(client, auth_headers2, test_label, db_session, test_user2, test_team):
    """Test deleting label when not admin."""
    from app.models.team import TeamMember, TeamRole

    # Add user2 as member
    member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
    db_session.add(member)
    await db_session.commit()

    response = await client.delete(
        f"/api/labels/{test_label.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_issue_with_labels(client, auth_headers, test_project, test_label):
    """Test creating an issue with labels."""
    response = await client.post(
        f"/api/issues?project_id={test_project.id}",
        headers=auth_headers,
        json={
            "title": "Issue with Labels",
            "label_ids": [test_label.id],
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert len(data["labels"]) == 1
    assert data["labels"][0]["id"] == test_label.id


@pytest.mark.asyncio
async def test_update_issue_labels(client, auth_headers, test_issue, test_label, test_team, db_session):
    """Test updating an issue's labels."""
    from app.models.issue import Label

    # Create another label
    label2 = Label(
        team_id=test_team.id,
        name="Enhancement",
        color="#0066ff",
    )
    db_session.add(label2)
    await db_session.commit()
    await db_session.refresh(label2)

    response = await client.patch(
        f"/api/issues/{test_issue.id}",
        headers=auth_headers,
        json={
            "label_ids": [test_label.id, label2.id],
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data["labels"]) == 2


@pytest_asyncio.fixture
async def agent_and_headers(db_session, test_user, test_team):
    """Create an agent and return (agent, auth_headers)."""
    service = AgentService(db_session)
    agent, _, _ = await service.create(
        AgentCreate(name="Label Bot"), test_user, test_team.id
    )
    token = create_access_token(data={"sub": agent.id})
    headers = {"Authorization": f"Bearer {token}"}
    return agent, headers


@pytest.mark.asyncio
async def test_agent_can_list_labels(client, agent_and_headers, test_team, test_label):
    """Test that agents can list labels (regression: was returning 403)."""
    _, headers = agent_and_headers
    response = await client.get(
        f"/api/labels?team_id={test_team.id}",
        headers=headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert any(l["id"] == test_label.id for l in data)


@pytest.mark.asyncio
async def test_agent_can_create_label(client, agent_and_headers, test_team):
    """Test that agents can create labels."""
    _, headers = agent_and_headers
    response = await client.post(
        f"/api/labels?team_id={test_team.id}",
        headers=headers,
        json={"name": "Agent Label", "color": "#10b981"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Agent Label"


@pytest.mark.asyncio
async def test_agent_can_get_label(client, agent_and_headers, test_label):
    """Test that agents can get a label by ID."""
    _, headers = agent_and_headers
    response = await client.get(
        f"/api/labels/{test_label.id}",
        headers=headers,
    )
    assert response.status_code == 200
    assert response.json()["id"] == test_label.id


@pytest.mark.asyncio
async def test_agent_can_update_label(client, agent_and_headers, test_label):
    """Test that agents can update labels."""
    _, headers = agent_and_headers
    response = await client.patch(
        f"/api/labels/{test_label.id}",
        headers=headers,
        json={"name": "Updated by Agent"},
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Updated by Agent"


@pytest.mark.asyncio
async def test_add_label_to_issue(client, auth_headers, test_issue, test_label):
    """Test adding a label to an issue via POST endpoint."""
    response = await client.post(
        f"/api/issues/{test_issue.id}/labels",
        headers=auth_headers,
        json={"label_id": test_label.id},
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data["labels"]) == 1
    assert data["labels"][0]["id"] == test_label.id


@pytest.mark.asyncio
async def test_add_label_idempotent(client, auth_headers, test_issue, test_label):
    """Test that adding the same label twice doesn't duplicate it."""
    await client.post(
        f"/api/issues/{test_issue.id}/labels",
        headers=auth_headers,
        json={"label_id": test_label.id},
    )
    response = await client.post(
        f"/api/issues/{test_issue.id}/labels",
        headers=auth_headers,
        json={"label_id": test_label.id},
    )
    assert response.status_code == 200
    assert len(response.json()["labels"]) == 1


@pytest.mark.asyncio
async def test_remove_label_from_issue(client, auth_headers, test_issue, test_label):
    """Test removing a label from an issue."""
    # First add
    await client.post(
        f"/api/issues/{test_issue.id}/labels",
        headers=auth_headers,
        json={"label_id": test_label.id},
    )
    # Then remove
    response = await client.delete(
        f"/api/issues/{test_issue.id}/labels/{test_label.id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    assert len(response.json()["labels"]) == 0


@pytest.mark.asyncio
async def test_batch_update_add_labels(client, auth_headers, test_project, test_label, test_user, db_session):
    """Test batch updating issues to add labels."""
    from app.models.issue import Issue

    # Create two issues
    issues = []
    for i in range(2):
        test_project.issue_count += 1
        issue = Issue(
            project_id=test_project.id,
            identifier=f"{test_project.key}-{test_project.issue_count}",
            number=test_project.issue_count,
            title=f"Batch Test {i}",
            creator_id=test_user.id,
        )
        db_session.add(issue)
        issues.append(issue)
    await db_session.commit()
    for issue in issues:
        await db_session.refresh(issue)

    response = await client.post(
        "/api/issues/batch-update",
        headers=auth_headers,
        json={
            "issue_ids": [issue.id for issue in issues],
            "add_label_ids": [test_label.id],
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    for item in data:
        assert any(l["id"] == test_label.id for l in item["labels"])


@pytest.mark.asyncio
async def test_agent_cannot_delete_label(client, agent_and_headers, test_label):
    """Test that agents cannot delete labels."""
    _, headers = agent_and_headers
    response = await client.delete(
        f"/api/labels/{test_label.id}",
        headers=headers,
    )
    assert response.status_code == 403
    assert "Agents cannot delete labels" in response.json()["detail"]


@pytest.mark.asyncio
async def test_agent_delete_no_info_disclosure(client, agent_and_headers):
    """Test that agents get 403 for delete even if label doesn't exist (no info leak)."""
    _, headers = agent_and_headers
    response = await client.delete(
        "/api/labels/nonexistent-id",
        headers=headers,
    )
    # Should get 403, not 404 — agent check happens before existence check
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_batch_update_label_ids_and_add_label_ids_conflict(client, auth_headers, test_project, test_label, test_user, db_session):
    """Test that providing both label_ids and add_label_ids is rejected."""
    from app.models.issue import Issue

    test_project.issue_count += 1
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count,
        title="Conflict Test",
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)

    response = await client.post(
        "/api/issues/batch-update",
        headers=auth_headers,
        json={
            "issue_ids": [issue.id],
            "label_ids": [test_label.id],
            "add_label_ids": [test_label.id],
        },
    )
    assert response.status_code == 422  # Pydantic validation error


@pytest.mark.asyncio
async def test_batch_update_nonexistent_label(client, auth_headers, test_project, test_user, db_session):
    """Test that batch update with nonexistent label IDs returns an error."""
    from app.models.issue import Issue

    test_project.issue_count += 1
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count,
        title="Bad Label Test",
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)

    response = await client.post(
        "/api/issues/batch-update",
        headers=auth_headers,
        json={
            "issue_ids": [issue.id],
            "add_label_ids": ["nonexistent-label-id"],
        },
    )
    assert response.status_code == 400
    assert "Labels not found" in response.json()["detail"]


@pytest.mark.asyncio
async def test_batch_update_unauthorized(client, auth_headers2, test_project, test_user, db_session):
    """Test that unauthorized user cannot batch update issues."""
    from app.models.issue import Issue

    test_project.issue_count += 1
    issue = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-{test_project.issue_count}",
        number=test_project.issue_count,
        title="Unauthorized Batch Test",
        creator_id=test_user.id,
    )
    db_session.add(issue)
    await db_session.commit()
    await db_session.refresh(issue)

    response = await client.post(
        "/api/issues/batch-update",
        headers=auth_headers2,
        json={
            "issue_ids": [issue.id],
            "priority": "high",
        },
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_batch_update_priority(client, auth_headers, test_project, test_user, db_session):
    """Test batch updating issue priority."""
    from app.models.issue import Issue

    issues = []
    for i in range(2):
        test_project.issue_count += 1
        issue = Issue(
            project_id=test_project.id,
            identifier=f"{test_project.key}-{test_project.issue_count}",
            number=test_project.issue_count,
            title=f"Priority Test {i}",
            creator_id=test_user.id,
        )
        db_session.add(issue)
        issues.append(issue)
    await db_session.commit()
    for issue in issues:
        await db_session.refresh(issue)

    response = await client.post(
        "/api/issues/batch-update",
        headers=auth_headers,
        json={
            "issue_ids": [issue.id for issue in issues],
            "priority": "high",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    for item in data:
        assert item["priority"] == "high"


@pytest.mark.asyncio
async def test_label_batch_update_basic(client, auth_headers, test_project, test_user, test_label, db_session):
    """Test basic batch update of labels."""
    from app.models.issue import Issue

    # Create issues
    issue1 = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-500",
        number=500,
        title="Issue 1",
        creator_id=test_user.id,
    )
    issue2 = Issue(
        project_id=test_project.id,
        identifier=f"{test_project.key}-501",
        number=501,
        title="Issue 2",
        creator_id=test_user.id,
    )
    db_session.add_all([issue1, issue2])
    await db_session.commit()
    await db_session.refresh(issue1)
    await db_session.refresh(issue2)

    # Batch update to add labels
    response = await client.post(
        "/api/issues/batch-update",
        headers=auth_headers,
        json={
            "issue_ids": [issue1.id, issue2.id],
            "add_label_ids": [test_label.id],
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2


@pytest.mark.asyncio
async def test_get_label_by_name(client, auth_headers, test_team, test_label):
    """Test getting a label."""
    response = await client.get(
        f"/api/labels/{test_label.id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_label.id
    assert data["name"] == test_label.name
