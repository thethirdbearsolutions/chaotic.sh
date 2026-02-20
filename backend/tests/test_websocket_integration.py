"""Integration tests for WebSocket event broadcasting (CHT-943).

Verify that API endpoint operations trigger the correct broadcast
functions with the expected event types and payloads.
"""
import pytest
from unittest.mock import AsyncMock, patch


# === Issue event broadcasting ===


@pytest.mark.asyncio
async def test_create_issue_broadcasts_event(client, auth_headers, test_project):
    """POST /issues should broadcast 'created' issue event."""
    with patch("app.api.issues.broadcast_issue_event", new_callable=AsyncMock) as mock_broadcast:
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={"title": "Broadcast Test Issue"},
        )
        assert response.status_code == 201

        mock_broadcast.assert_awaited_once()
        call_args = mock_broadcast.call_args
        assert call_args[0][1] == "created"  # event_type
        assert call_args[0][2]["title"] == "Broadcast Test Issue"


@pytest.mark.asyncio
async def test_update_issue_broadcasts_event(client, auth_headers, test_issue):
    """PATCH /issues/{id} should broadcast 'updated' issue event."""
    with patch("app.api.issues.broadcast_issue_event", new_callable=AsyncMock) as mock_broadcast:
        response = await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
            json={"title": "Updated Title"},
        )
        assert response.status_code == 200

        mock_broadcast.assert_awaited_once()
        call_args = mock_broadcast.call_args
        assert call_args[0][1] == "updated"
        assert call_args[0][2]["title"] == "Updated Title"


@pytest.mark.asyncio
async def test_delete_issue_broadcasts_event(client, auth_headers, test_issue):
    """DELETE /issues/{id} should broadcast 'deleted' issue event."""
    with patch("app.api.issues.broadcast_issue_event", new_callable=AsyncMock) as mock_broadcast:
        response = await client.delete(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 204

        mock_broadcast.assert_awaited_once()
        call_args = mock_broadcast.call_args
        assert call_args[0][1] == "deleted"


# === Activity event broadcasting ===


@pytest.mark.asyncio
async def test_create_issue_broadcasts_activity(client, auth_headers, test_project):
    """POST /issues should broadcast activity event alongside issue event."""
    with patch("app.api.issues.broadcast_activity_event", new_callable=AsyncMock) as mock_activity:
        response = await client.post(
            f"/api/issues?project_id={test_project.id}",
            headers=auth_headers,
            json={"title": "Activity Broadcast Test"},
        )
        assert response.status_code == 201

        mock_activity.assert_awaited_once()
        call_args = mock_activity.call_args
        assert call_args[0][1] == "created"
        assert "issue_id" in call_args[0][2]


@pytest.mark.asyncio
async def test_update_issue_broadcasts_activity(client, auth_headers, test_issue):
    """PATCH /issues/{id} should broadcast activity event."""
    with patch("app.api.issues.broadcast_activity_event", new_callable=AsyncMock) as mock_activity:
        response = await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
            json={"priority": "high"},
        )
        assert response.status_code == 200

        mock_activity.assert_awaited_once()
        call_args = mock_activity.call_args
        assert call_args[0][1] == "created"  # activity events are always "created"


# === Comment event broadcasting ===


@pytest.mark.asyncio
async def test_create_comment_broadcasts_event(client, auth_headers, test_issue):
    """POST /issues/{id}/comments should broadcast comment event."""
    with patch("app.api.issues.broadcast_comment_event", new_callable=AsyncMock) as mock_broadcast:
        response = await client.post(
            f"/api/issues/{test_issue.id}/comments",
            headers=auth_headers,
            json={"content": "Test comment for broadcast"},
        )
        assert response.status_code == 201

        mock_broadcast.assert_awaited_once()
        call_args = mock_broadcast.call_args
        assert call_args[0][1] == "created"


# === Batch update broadcasting ===


@pytest.mark.asyncio
async def test_batch_update_broadcasts_per_issue(client, auth_headers, test_project, test_user, db):
    """POST /issues/batch-update should broadcast one event per issue."""
    from app.oxyde_models.issue import OxydeIssue

    issue1 = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier=f"{test_project.key}-2000",
        number=2000, title="Batch Broadcast 1", creator_id=test_user.id,
    )
    issue2 = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier=f"{test_project.key}-2001",
        number=2001, title="Batch Broadcast 2", creator_id=test_user.id,
    )

    with patch("app.api.issues.broadcast_issue_event", new_callable=AsyncMock) as mock_broadcast:
        response = await client.post(
            "/api/issues/batch-update",
            headers=auth_headers,
            json={"issue_ids": [issue1.id, issue2.id], "priority": "urgent"},
        )
        assert response.status_code == 200

        # Should broadcast once per issue
        assert mock_broadcast.await_count == 2
        for call in mock_broadcast.call_args_list:
            assert call[0][1] == "updated"


# === Team scoping ===


@pytest.mark.asyncio
async def test_broadcast_uses_correct_team_id(client, auth_headers, test_issue, test_project, db):
    """Broadcasts should use the project's team_id."""
    expected_team_id = test_project.team_id

    with patch("app.api.issues.broadcast_issue_event", new_callable=AsyncMock) as mock_broadcast:
        await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
            json={"title": "Team Scope Test"},
        )

        mock_broadcast.assert_awaited_once()
        actual_team_id = mock_broadcast.call_args[0][0]
        assert actual_team_id == expected_team_id


# === Broadcast message format ===


@pytest.mark.asyncio
async def test_broadcast_message_format(client, auth_headers, test_issue):
    """Broadcast messages should follow {type, entity, data} format."""
    from app.websocket import manager
    from unittest.mock import AsyncMock as AM

    mock_broadcast = AM()
    original = manager.broadcast_to_team
    manager.broadcast_to_team = mock_broadcast

    try:
        await client.patch(
            f"/api/issues/{test_issue.id}",
            headers=auth_headers,
            json={"title": "Format Check"},
        )

        # Should have received at least one broadcast (issue + activity)
        assert mock_broadcast.await_count >= 1

        # Check message format on the first call
        call_args = mock_broadcast.call_args_list[0]
        message = call_args[0][1]  # second positional arg is the message dict
        assert "type" in message
        assert "entity" in message
        assert "data" in message
    finally:
        manager.broadcast_to_team = original
