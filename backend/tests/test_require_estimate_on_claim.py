"""Tests for require_estimate_on_claim setting (CHT-405).

This setting should only enforce estimate requirements for AGENTS claiming tickets,
not for HUMANS creating or claiming tickets through the web UI.
"""
import pytest
from app.models.issue import IssueStatus


@pytest.mark.asyncio
async def test_human_can_claim_without_estimate_when_required(
    client, auth_headers, test_project, test_issue, db_session
):
    """Test that humans (JWT auth) can claim tickets without estimates even when require_estimate_on_claim is True."""
    # Enable require_estimate_on_claim
    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
        json={"require_estimate_on_claim": True},
    )
    assert response.status_code == 200

    # Human user (JWT token) should be able to claim without estimate
    response = await client.patch(
        f"/api/issues/{test_issue.id}",
        headers=auth_headers,
        json={"status": "in_progress"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "in_progress"
    assert data["estimate"] is None  # No estimate required for humans


@pytest.mark.asyncio
async def test_agent_blocked_from_claiming_without_estimate(
    client, test_project, test_issue, test_user, test_team, db_session
):
    """Test that agents (API key auth) are blocked from claiming tickets without estimates when require_estimate_on_claim is True."""
    from app.services.agent_service import AgentService
    from app.schemas.agent import AgentCreate

    # Create an agent
    agent_service = AgentService(db_session)
    agent, api_key, _ = await agent_service.create(
        AgentCreate(name="Test Agent"),
        test_user,
        test_team.id,
        project_id=test_project.id,
    )

    # Enable require_estimate_on_claim
    auth_headers = {"Authorization": f"Bearer {api_key}"}
    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
        json={"require_estimate_on_claim": True},
    )
    assert response.status_code == 200

    # Agent should be BLOCKED from claiming without estimate
    response = await client.patch(
        f"/api/issues/{test_issue.id}",
        headers=auth_headers,
        json={"status": "in_progress"},
    )
    assert response.status_code == 400
    assert "Estimate is required" in response.json()["detail"]


@pytest.mark.asyncio
async def test_agent_can_claim_with_estimate(
    client, test_project, test_issue, test_user, test_team, db_session
):
    """Test that agents CAN claim tickets when they provide an estimate."""
    from app.services.agent_service import AgentService
    from app.schemas.agent import AgentCreate

    # Create an agent
    agent_service = AgentService(db_session)
    agent, api_key, _ = await agent_service.create(
        AgentCreate(name="Test Agent"),
        test_user,
        test_team.id,
        project_id=test_project.id,
    )

    # Enable require_estimate_on_claim
    auth_headers = {"Authorization": f"Bearer {api_key}"}
    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
        json={"require_estimate_on_claim": True},
    )
    assert response.status_code == 200

    # Agent should be able to claim WITH estimate
    response = await client.patch(
        f"/api/issues/{test_issue.id}",
        headers=auth_headers,
        json={"status": "in_progress", "estimate": 5},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "in_progress"
    assert data["estimate"] == 5


@pytest.mark.asyncio
async def test_human_can_create_without_estimate(
    client, auth_headers, test_project, db_session
):
    """Test that humans can create tickets without estimates regardless of require_estimate_on_claim."""
    # Enable require_estimate_on_claim
    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
        json={"require_estimate_on_claim": True},
    )
    assert response.status_code == 200

    # Human should be able to CREATE tickets without estimates
    # (require_estimate_on_claim only applies to CLAIMING, not creating)
    response = await client.post(
        f"/api/issues?project_id={test_project.id}",
        headers=auth_headers,
        json={"title": "Test Issue Without Estimate"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Issue Without Estimate"
    assert data["estimate"] is None


@pytest.mark.asyncio
async def test_agent_can_create_without_estimate(
    client, test_project, test_user, test_team, db_session
):
    """Test that agents can create tickets without estimates regardless of require_estimate_on_claim."""
    from app.services.agent_service import AgentService
    from app.schemas.agent import AgentCreate

    # Create an agent
    agent_service = AgentService(db_session)
    agent, api_key, _ = await agent_service.create(
        AgentCreate(name="Test Agent"),
        test_user,
        test_team.id,
        project_id=test_project.id,
    )

    # Enable require_estimate_on_claim
    auth_headers = {"Authorization": f"Bearer {api_key}"}
    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
        json={"require_estimate_on_claim": True},
    )
    assert response.status_code == 200

    # Agent should be able to CREATE tickets without estimates
    # (require_estimate_on_claim only applies to CLAIMING, not creating)
    response = await client.post(
        f"/api/issues?project_id={test_project.id}",
        headers=auth_headers,
        json={"title": "Agent Created Issue Without Estimate"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Agent Created Issue Without Estimate"
    assert data["estimate"] is None


@pytest.mark.asyncio
async def test_human_can_claim_with_existing_estimate(
    client, auth_headers, test_project, test_issue, db_session
):
    """Test that humans can claim tickets that already have estimates."""
    # Enable require_estimate_on_claim
    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
        json={"require_estimate_on_claim": True},
    )
    assert response.status_code == 200

    # Add an estimate to the issue first
    response = await client.patch(
        f"/api/issues/{test_issue.id}",
        headers=auth_headers,
        json={"estimate": 3},
    )
    assert response.status_code == 200

    # Now claim it
    response = await client.patch(
        f"/api/issues/{test_issue.id}",
        headers=auth_headers,
        json={"status": "in_progress"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "in_progress"
    assert data["estimate"] == 3


@pytest.mark.asyncio
async def test_agent_can_claim_with_existing_estimate(
    client, auth_headers, test_project, test_issue, test_user, test_team, db_session
):
    """Test that agents can claim tickets that already have estimates."""
    from app.services.agent_service import AgentService
    from app.schemas.agent import AgentCreate

    # Create an agent
    agent_service = AgentService(db_session)
    agent, api_key, _ = await agent_service.create(
        AgentCreate(name="Test Agent"),
        test_user,
        test_team.id,
        project_id=test_project.id,
    )

    # Enable require_estimate_on_claim
    agent_headers = {"Authorization": f"Bearer {api_key}"}
    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=agent_headers,
        json={"require_estimate_on_claim": True},
    )
    assert response.status_code == 200

    # Add an estimate to the issue first (as human)
    response = await client.patch(
        f"/api/issues/{test_issue.id}",
        headers=auth_headers,
        json={"estimate": 3},
    )
    assert response.status_code == 200

    # Agent should be able to claim it since it has an estimate
    response = await client.patch(
        f"/api/issues/{test_issue.id}",
        headers=agent_headers,
        json={"status": "in_progress"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "in_progress"
    assert data["estimate"] == 3


@pytest.mark.asyncio
async def test_human_can_update_status_after_claiming(
    client, auth_headers, test_project, test_issue, db_session
):
    """Test that humans can update status after claiming without estimate."""
    # Enable require_estimate_on_claim
    response = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
        json={"require_estimate_on_claim": True},
    )
    assert response.status_code == 200

    # Claim the ticket without estimate
    response = await client.patch(
        f"/api/issues/{test_issue.id}",
        headers=auth_headers,
        json={"status": "in_progress"},
    )
    assert response.status_code == 200

    # Move to in_review
    response = await client.patch(
        f"/api/issues/{test_issue.id}",
        headers=auth_headers,
        json={"status": "in_review"},
    )
    assert response.status_code == 200

    # Complete the ticket
    response = await client.patch(
        f"/api/issues/{test_issue.id}",
        headers=auth_headers,
        json={"status": "done"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "done"
