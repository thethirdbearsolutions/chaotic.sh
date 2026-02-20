"""Tests for team endpoints."""
import pytest
from app.enums import TeamRole, InvitationStatus


@pytest.mark.asyncio
async def test_create_team(client, auth_headers):
    """Test creating a team."""
    response = await client.post(
        "/api/teams",
        headers=auth_headers,
        json={
            "name": "My Team",
            "key": "MYTEAM",
            "description": "A great team",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "My Team"
    assert data["key"] == "MYTEAM"
    assert data["description"] == "A great team"


@pytest.mark.asyncio
async def test_create_team_duplicate_key(client, auth_headers, test_team):
    """Test creating team with existing key."""
    response = await client.post(
        "/api/teams",
        headers=auth_headers,
        json={
            "name": "Another Team",
            "key": test_team.key,
        },
    )
    assert response.status_code == 400
    assert "already exists" in response.json()["detail"]


@pytest.mark.asyncio
async def test_create_team_invalid_key(client, auth_headers):
    """Test creating team with invalid key."""
    response = await client.post(
        "/api/teams",
        headers=auth_headers,
        json={
            "name": "Team",
            "key": "ab",  # lowercase not allowed
        },
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_list_my_teams(client, auth_headers, test_team):
    """Test listing user's teams."""
    response = await client.get("/api/teams", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert any(t["id"] == test_team.id for t in data)


@pytest.mark.asyncio
async def test_get_team(client, auth_headers, test_team):
    """Test getting team by ID."""
    response = await client.get(
        f"/api/teams/{test_team.id}", headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_team.id
    assert data["name"] == test_team.name


@pytest.mark.asyncio
async def test_get_team_not_member(client, auth_headers2, test_team):
    """Test getting team when not a member."""
    response = await client.get(
        f"/api/teams/{test_team.id}", headers=auth_headers2
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_update_team(client, auth_headers, test_team):
    """Test updating a team."""
    response = await client.patch(
        f"/api/teams/{test_team.id}",
        headers=auth_headers,
        json={"name": "Updated Team", "description": "Updated description"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Team"
    assert data["description"] == "Updated description"


@pytest.mark.asyncio
async def test_update_team_not_admin(client, auth_headers2, test_team, db, test_user2):
    """Test updating team when not admin."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.patch(
        f"/api/teams/{test_team.id}",
        headers=auth_headers2,
        json={"name": "Unauthorized Update"},
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_delete_team(client, auth_headers, db):
    """Test deleting a team."""
    # Create a team to delete
    from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
    from app.enums import TeamRole
    from app.services.user_service import UserService

    team = await OxydeTeam.objects.create(name="Delete Me", key="DELETE")

    # Get user ID from token
    response = await client.get("/api/auth/me", headers=auth_headers)
    user_id = response.json()["id"]

    member = await OxydeTeamMember.objects.create(team_id=team.id, user_id=user_id, role=TeamRole.OWNER)

    response = await client.delete(f"/api/teams/{team.id}", headers=auth_headers)
    assert response.status_code == 204


@pytest.mark.asyncio
async def test_list_team_members(client, auth_headers, test_team, test_user):
    """Test listing team members."""
    response = await client.get(
        f"/api/teams/{test_team.id}/members", headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert any(m["user_id"] == test_user.id for m in data)


@pytest.mark.asyncio
async def test_create_invitation(client, auth_headers, test_team):
    """Test creating a team invitation."""
    response = await client.post(
        f"/api/teams/{test_team.id}/invitations",
        headers=auth_headers,
        json={"email": "invited@example.com", "role": "member"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "invited@example.com"
    assert data["role"] == "member"
    assert data["status"] == "pending"


@pytest.mark.asyncio
async def test_list_team_invitations(client, auth_headers, test_team, db, test_user):
    """Test listing team invitations."""
    # Create an invitation
    from app.oxyde_models.team import OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email="pending@example.com",
        role=TeamRole.MEMBER,
        token=secrets.token_urlsafe(32),
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )

    response = await client.get(
        f"/api/teams/{test_team.id}/invitations", headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1


@pytest.mark.asyncio
async def test_accept_invitation(client, auth_headers2, test_team, db, test_user):
    """Test accepting a team invitation."""
    from app.oxyde_models.team import OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    token = secrets.token_urlsafe(32)
    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email="test2@example.com",  # Matches test_user2
        role=TeamRole.MEMBER,
        token=token,
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )

    response = await client.post(
        f"/api/teams/invitations/{token}/accept", headers=auth_headers2
    )
    assert response.status_code == 200
    data = response.json()
    assert data["role"] == "member"


@pytest.mark.asyncio
async def test_remove_member(client, auth_headers, test_team, db, test_user2):
    """Test removing a team member."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.delete(
        f"/api/teams/{test_team.id}/members/{test_user2.id}",
        headers=auth_headers,
    )
    assert response.status_code == 204


@pytest.mark.asyncio
async def test_get_team_members_pagination(client, auth_headers, test_team):
    """Test listing team members with pagination."""
    response = await client.get(
        f"/api/teams/{test_team.id}/members?skip=0&limit=10",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)


@pytest.mark.asyncio
async def test_update_team_partial(client, auth_headers, test_team):
    """Test partial team update."""
    response = await client.patch(
        f"/api/teams/{test_team.id}",
        headers=auth_headers,
        json={
            "description": "Updated description only",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["description"] == "Updated description only"


@pytest.mark.asyncio
async def test_remove_member_as_admin(client, auth_headers, test_team, test_user2, db):
    """Test removing a team member as admin."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.delete(
        f"/api/teams/{test_team.id}/members/{test_user2.id}",
        headers=auth_headers,
    )
    assert response.status_code == 204


# ============== Additional edge case tests ==============


@pytest.mark.asyncio
async def test_get_team_not_found(client, auth_headers):
    """Test getting team that doesn't exist."""
    response = await client.get("/api/teams/nonexistent-id", headers=auth_headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_team_not_found(client, auth_headers):
    """Test updating team that doesn't exist."""
    response = await client.patch(
        "/api/teams/nonexistent-id",
        headers=auth_headers,
        json={"name": "Updated"},
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_delete_team_not_owner(client, auth_headers2, test_team, db, test_user2):
    """Test deleting team when not owner (only admin)."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as admin (not owner)
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.ADMIN)

    response = await client.delete(f"/api/teams/{test_team.id}", headers=auth_headers2)
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_delete_team_not_found(client, auth_headers):
    """Test deleting team that doesn't exist."""
    response = await client.delete("/api/teams/nonexistent-id", headers=auth_headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_list_team_members_not_member(client, auth_headers2, test_team):
    """Test listing team members when not a member."""
    response = await client.get(
        f"/api/teams/{test_team.id}/members", headers=auth_headers2
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_update_member_role(client, auth_headers, test_team, test_user2, db):
    """Test updating a member's role."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.patch(
        f"/api/teams/{test_team.id}/members/{test_user2.id}?role=admin",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["role"] == "admin"


@pytest.mark.asyncio
async def test_update_member_role_not_admin(client, auth_headers2, test_team, test_user2, db):
    """Test updating member role when not admin."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.patch(
        f"/api/teams/{test_team.id}/members/{test_user2.id}?role=admin",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_update_member_role_member_not_found(client, auth_headers, test_team):
    """Test updating role of member that doesn't exist."""
    response = await client.patch(
        f"/api/teams/{test_team.id}/members/nonexistent-id?role=admin",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_owner_role_fails(client, auth_headers, test_team, test_user):
    """Test that updating owner's role fails."""
    response = await client.patch(
        f"/api/teams/{test_team.id}/members/{test_user.id}?role=member",
        headers=auth_headers,
    )
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_remove_member_not_found(client, auth_headers, test_team):
    """Test removing member that doesn't exist."""
    response = await client.delete(
        f"/api/teams/{test_team.id}/members/nonexistent-id",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_remove_owner_fails(client, auth_headers, test_team, test_user):
    """Test that removing owner fails."""
    response = await client.delete(
        f"/api/teams/{test_team.id}/members/{test_user.id}",
        headers=auth_headers,
    )
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_remove_member_not_admin(client, auth_headers2, test_team, test_user, db, test_user2):
    """Test removing member when not admin (and not self)."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    # user2 trying to remove test_user (the owner) - should fail
    response = await client.delete(
        f"/api/teams/{test_team.id}/members/{test_user.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_remove_self_as_member(client, auth_headers2, test_team, db, test_user2):
    """Test that a member can remove themselves."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    # user2 removing themselves
    response = await client.delete(
        f"/api/teams/{test_team.id}/members/{test_user2.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 204


@pytest.mark.asyncio
async def test_create_invitation_team_not_found(client, auth_headers):
    """Test creating invitation for team that doesn't exist."""
    response = await client.post(
        "/api/teams/nonexistent-id/invitations",
        headers=auth_headers,
        json={"email": "test@example.com", "role": "member"},
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_create_invitation_not_admin(client, auth_headers2, test_team, db, test_user2):
    """Test creating invitation when not admin."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.post(
        f"/api/teams/{test_team.id}/invitations",
        headers=auth_headers2,
        json={"email": "new@example.com", "role": "member"},
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_create_invitation_already_member(client, auth_headers, test_team, test_user):
    """Test creating invitation for email that's already a member."""
    response = await client.post(
        f"/api/teams/{test_team.id}/invitations",
        headers=auth_headers,
        json={"email": test_user.email, "role": "member"},
    )
    assert response.status_code == 400
    assert "already a team member" in response.json()["detail"]


@pytest.mark.asyncio
async def test_list_invitations_not_admin(client, auth_headers2, test_team, db, test_user2):
    """Test listing invitations when not admin."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    response = await client.get(
        f"/api/teams/{test_team.id}/invitations",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_accept_invitation_not_found(client, auth_headers):
    """Test accepting invitation that doesn't exist."""
    response = await client.post(
        "/api/teams/invitations/nonexistent-token/accept",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_accept_invitation_wrong_email(client, auth_headers, test_team, db, test_user):
    """Test accepting invitation intended for different email."""
    from app.oxyde_models.team import OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    token = secrets.token_urlsafe(32)
    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email="other@example.com",  # Different from test_user
        role=TeamRole.MEMBER,
        token=token,
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )

    response = await client.post(
        f"/api/teams/invitations/{token}/accept",
        headers=auth_headers,
    )
    assert response.status_code == 403
    assert "different email" in response.json()["detail"]


@pytest.mark.asyncio
async def test_accept_invitation_expired(client, auth_headers, test_team, db, test_user):
    """Test accepting expired invitation."""
    from app.oxyde_models.team import OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    token = secrets.token_urlsafe(32)
    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email=test_user.email,
        role=TeamRole.MEMBER,
        token=token,
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) - timedelta(days=1),  # Expired
    )

    response = await client.post(
        f"/api/teams/invitations/{token}/accept",
        headers=auth_headers,
    )
    assert response.status_code == 400
    assert "expired" in response.json()["detail"]


@pytest.mark.asyncio
async def test_delete_invitation(client, auth_headers, test_team, db, test_user):
    """Test deleting an invitation."""
    from app.oxyde_models.team import OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    token = secrets.token_urlsafe(32)
    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email="delete@example.com",
        role=TeamRole.MEMBER,
        token=token,
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )

    response = await client.delete(
        f"/api/teams/{test_team.id}/invitations/{invitation.id}",
        headers=auth_headers,
    )
    assert response.status_code == 204


@pytest.mark.asyncio
async def test_delete_invitation_not_admin(client, auth_headers2, test_team, db, test_user, test_user2):
    """Test deleting invitation when not admin."""
    from app.oxyde_models.team import OxydeTeamMember, OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    # Add user2 as member
    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

    token = secrets.token_urlsafe(32)
    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email="test@example.com",
        role=TeamRole.MEMBER,
        token=token,
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )

    response = await client.delete(
        f"/api/teams/{test_team.id}/invitations/{invitation.id}",
        headers=auth_headers2,
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_delete_invitation_not_found(client, auth_headers, test_team):
    """Test deleting invitation that doesn't exist."""
    response = await client.delete(
        f"/api/teams/{test_team.id}/invitations/nonexistent-id",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_create_invitation_for_existing_non_member(client, auth_headers, test_team, test_user2):
    """Test inviting an existing user who is not yet a team member succeeds.

    Covers teams.py branch 251->257: existing_user exists but existing_member is None,
    so the code falls through to create the invitation.
    """
    response = await client.post(
        f"/api/teams/{test_team.id}/invitations",
        headers=auth_headers,
        json={"email": test_user2.email, "role": "member"},
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == test_user2.email
    assert data["role"] == "member"
    assert data["team_id"] == test_team.id


# --- Service-level coverage tests (CHT-922) ---

@pytest.mark.asyncio
async def test_team_service_add_member(db, test_team, test_user2):
    """Test TeamService.add_member directly (covers team_service.py L109-117)."""
    from app.services.team_service import TeamService
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    service = TeamService()
    member = await service.add_member(test_team, test_user2, TeamRole.MEMBER)

    assert isinstance(member, OxydeTeamMember)
    assert member.team_id == test_team.id
    assert member.user_id == test_user2.id
    assert member.role == TeamRole.MEMBER


@pytest.mark.asyncio
async def test_team_service_decline_invitation(db, test_team, test_user):
    """Test TeamService.decline_invitation directly (covers team_service.py L186-187)."""
    from app.services.team_service import TeamService
    from app.oxyde_models.team import OxydeTeamInvitation
    import secrets
    from datetime import datetime, timedelta, timezone

    service = TeamService()

    invitation = await OxydeTeamInvitation.objects.create(
        team_id=test_team.id,
        email="decline@example.com",
        role=TeamRole.MEMBER,
        token=secrets.token_urlsafe(32),
        invited_by_id=test_user.id,
        status=InvitationStatus.PENDING,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )

    await service.decline_invitation(invitation)
    assert invitation.status == InvitationStatus.DECLINED.name
