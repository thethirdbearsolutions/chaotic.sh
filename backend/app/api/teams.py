"""Team API routes."""
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, status
from app.api.deps import CurrentUser, check_user_team_access
from app.utils import ensure_utc
from app.schemas.team import (
    TeamCreate,
    TeamUpdate,
    TeamResponse,
    TeamMemberResponse,
    TeamInvitationCreate,
    TeamInvitationResponse,
)
from app.services.team_service import TeamService
from app.services.user_service import UserService
from app.models.team import TeamRole

router = APIRouter()


@router.post("", response_model=TeamResponse, status_code=status.HTTP_201_CREATED)
async def create_team(team_in: TeamCreate, current_user: CurrentUser):
    """Create a new team."""
    if current_user.is_agent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Agents cannot create teams",
        )

    team_service = TeamService()

    existing_team = await team_service.get_by_key(team_in.key)
    if existing_team:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Team key already exists",
        )

    team = await team_service.create(team_in, current_user)
    return team


@router.get("", response_model=list[TeamResponse])
async def list_my_teams(current_user: CurrentUser):
    """List teams for current user."""
    team_service = TeamService()
    teams = await team_service.get_user_teams(current_user.id)
    return teams


@router.get("/{team_id}", response_model=TeamResponse)
async def get_team(team_id: str, current_user: CurrentUser):
    """Get team by ID."""
    team_service = TeamService()
    team = await team_service.get_by_id(team_id)

    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found",
        )

    # Use check_user_team_access which handles both regular members
    # and agent users (CHT-732)
    if not await check_user_team_access(current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    return team


@router.patch("/{team_id}", response_model=TeamResponse)
async def update_team(
    team_id: str, team_in: TeamUpdate, current_user: CurrentUser
):
    """Update a team."""
    team_service = TeamService()
    team = await team_service.get_by_id(team_id)

    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found",
        )

    if not await team_service.is_team_admin(team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can update team",
        )

    team = await team_service.update(team, team_in)
    return team


@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_team(team_id: str, current_user: CurrentUser):
    """Delete a team."""
    team_service = TeamService()
    team = await team_service.get_by_id(team_id)

    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found",
        )

    member = await team_service.get_member(team_id, current_user.id)
    if not member or member.role != TeamRole.OWNER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only owner can delete team",
        )

    await team_service.delete(team)


# Members
@router.get("/{team_id}/members", response_model=list[TeamMemberResponse])
async def list_team_members(team_id: str, current_user: CurrentUser):
    """List team members."""
    team_service = TeamService()

    # Use check_user_team_access which handles both regular members
    # and agent users (CHT-732)
    if not await check_user_team_access(current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    members = await team_service.get_members(team_id)
    return [
        TeamMemberResponse(
            id=m.id,
            user_id=m.user_id,
            team_id=m.team_id,
            role=m.role,
            joined_at=m.joined_at,
            user_name=m.user and m.user.name,
            user_email=m.user and m.user.email,
        )
        for m in members
    ]


@router.patch("/{team_id}/members/{user_id}", response_model=TeamMemberResponse)
async def update_member_role(
    team_id: str,
    user_id: str,
    role: TeamRole,
    current_user: CurrentUser,
):
    """Update a member's role."""
    team_service = TeamService()

    if not await team_service.is_team_admin(team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can update member roles",
        )

    member = await team_service.get_member(team_id, user_id)
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Member not found",
        )

    if member.role == TeamRole.OWNER:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot change owner's role",
        )

    member = await team_service.update_member_role(member, role)
    return TeamMemberResponse(
        id=member.id,
        user_id=member.user_id,
        team_id=member.team_id,
        role=member.role,
        joined_at=member.joined_at,
    )


@router.delete("/{team_id}/members/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_member(
    team_id: str, user_id: str, current_user: CurrentUser
):
    """Remove a member from team."""
    team_service = TeamService()

    # Allow removing self or admin removing others
    is_admin = await team_service.is_team_admin(team_id, current_user.id)
    if user_id != current_user.id and not is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can remove other members",
        )

    member = await team_service.get_member(team_id, user_id)
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Member not found",
        )

    if member.role == TeamRole.OWNER:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot remove owner",
        )

    await team_service.remove_member(member)


# Invitations
@router.post(
    "/{team_id}/invitations",
    response_model=TeamInvitationResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_invitation(
    team_id: str,
    invitation_in: TeamInvitationCreate,
    current_user: CurrentUser,
):
    """Create a team invitation."""
    team_service = TeamService()
    team = await team_service.get_by_id(team_id)

    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found",
        )

    if not await team_service.is_team_admin(team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can invite members",
        )

    # Check if user already a member
    user_service = UserService()
    existing_user = await user_service.get_by_email(invitation_in.email)
    if existing_user:
        existing_member = await team_service.get_member(team_id, existing_user.id)
        if existing_member:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User is already a team member",
            )

    invitation = await team_service.create_invitation(team, invitation_in, current_user)
    return invitation


@router.get("/{team_id}/invitations", response_model=list[TeamInvitationResponse])
async def list_team_invitations(
    team_id: str, current_user: CurrentUser
):
    """List pending team invitations."""
    team_service = TeamService()

    if not await team_service.is_team_admin(team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can view invitations",
        )

    invitations = await team_service.get_team_invitations(team_id)
    return invitations


@router.post("/invitations/{token}/accept", response_model=TeamMemberResponse)
async def accept_invitation(token: str, current_user: CurrentUser):
    """Accept a team invitation."""
    team_service = TeamService()
    invitation = await team_service.get_invitation_by_token(token)

    if not invitation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invitation not found",
        )

    if invitation.email != current_user.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invitation is for a different email",
        )

    if ensure_utc(invitation.expires_at) < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invitation has expired",
        )

    member = await team_service.accept_invitation(invitation, current_user)
    return TeamMemberResponse(
        id=member.id,
        user_id=member.user_id,
        team_id=member.team_id,
        role=member.role,
        joined_at=member.joined_at,
    )


@router.delete(
    "/{team_id}/invitations/{invitation_id}", status_code=status.HTTP_204_NO_CONTENT
)
async def delete_invitation(
    team_id: str, invitation_id: str, current_user: CurrentUser
):
    """Delete a team invitation."""
    team_service = TeamService()

    if not await team_service.is_team_admin(team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can delete invitations",
        )

    invitations = await team_service.get_team_invitations(team_id)
    invitation = next((i for i in invitations if i.id == invitation_id), None)

    if not invitation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invitation not found",
        )

    await team_service.delete_invitation(invitation)
