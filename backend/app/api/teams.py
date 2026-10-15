"""Team API routes."""
import logging
from fastapi import APIRouter, HTTPException, Response, status
from app.auth.access import reads, writes
from app.api.deps import CurrentUser, NotAppSession, check_user_in_team
from app.schemas.team import (
    TeamCreate,
    TeamUpdate,
    TeamResponse,
    TeamMemberResponse,
    TeamRoleUpdate,
    TeamInvitationCreate,
    TeamInvitationResponse,
    InvitationPreviewResponse,
)
from app.config import get_settings
from app.oxyde_models.team import OxydeTeamMember
from app.services.agent_service import AgentService
from app.services.credential_events import revoking
from app.services.mention_handles import MentionDirectory
from app.services.team_service import TeamService
from app.services.user_service import UserService
from app.services.email_service import EmailService
from app.enums import TeamRole

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("", response_model=TeamResponse, status_code=status.HTTP_201_CREATED)
@writes
async def create_team(team_in: TeamCreate, current_user: CurrentUser, _app_session: NotAppSession):
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
@reads
async def list_my_teams(current_user: CurrentUser):
    """List teams for current user."""
    team_service = TeamService()
    teams = await team_service.get_user_teams(current_user.id)
    return teams


@router.get("/{team_id}", response_model=TeamResponse)
@reads
async def get_team(team_id: str, current_user: CurrentUser):
    """Get team by ID."""
    team_service = TeamService()
    team = await team_service.get_by_id(team_id)

    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found",
        )

    # Team directory: members and agents of the team at either scope,
    # project-scoped agents included (CHT-732, CHT-1780).
    if not await check_user_in_team(current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    return team


@router.patch("/{team_id}", response_model=TeamResponse)
@writes
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
@writes
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

    await team_service.delete(team, actor_id=current_user.id)


# Members
@router.get("/{team_id}/members", response_model=list[TeamMemberResponse])
@reads
async def list_team_members(
    team_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 1000,
):
    """List team members."""
    team_service = TeamService()

    # Team directory: members and agents of the team at either scope,
    # project-scoped agents included (CHT-732, CHT-1780).
    if not await check_user_in_team(current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    all_members = await team_service.get_members(team_id)
    members = all_members[skip:skip + limit]
    # Handles are unique across the whole team, agents included (CHT-1731).
    directory = await MentionDirectory.for_team(team_id, members=all_members)
    return [
        TeamMemberResponse(
            id=m.id,
            user_id=m.user_id,
            team_id=m.team_id,
            role=m.role,
            joined_at=m.joined_at,
            user_name=m.user and m.user.name,
            user_email=m.user and m.user.email,
            mention_handle=directory.handle_for(m.user_id),
        )
        for m in members
    ]


@router.patch("/{team_id}/members/{user_id}", response_model=TeamMemberResponse)
@writes
async def update_member_role(
    team_id: str,
    user_id: str,
    role_in: TeamRoleUpdate,
    current_user: CurrentUser,
    _app_session: NotAppSession,
):
    """Update a member's role.

    CHT-1223: the server used to read ``role`` only from the query
    string (a bare, non-Body-annotated param), but the CLI -- and every
    other PATCH endpoint's convention in this codebase -- sends it as a
    JSON body, so the only shipped client could never successfully
    drive this endpoint. Body is now the only accepted shape (breaking
    wire change, sanctioned: no query-string caller exists to break).
    """
    team_service = TeamService()
    resolved_role = role_in.role

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

    member = await team_service.update_member_role(member, resolved_role)
    return TeamMemberResponse(
        id=member.id,
        user_id=member.user_id,
        team_id=member.team_id,
        role=member.role,
        joined_at=member.joined_at,
    )


@router.delete("/{team_id}/members/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
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

    # Leaving the team ends the agent keys the member holds for it, in the
    # same transaction (CHT-1510): those secrets left with them. Agents
    # they created pass to the admin removing them, or, when they leave on
    # their own, to the team's longest-standing owner.
    agent_service = AgentService()
    async with revoking():
        await team_service.remove_member(member)
        if user_id != current_user.id:
            new_owner_id = current_user.id
        else:
            owners = await OxydeTeamMember.objects.filter(
                team_id=team_id, role=TeamRole.OWNER,
            ).order_by("joined_at").all()
            new_owner_id = owners[0].user_id if owners else None
        released = await agent_service.release_member_agents(
            team_id, user_id, new_owner_id, actor_id=current_user.id,
        )

    if released:
        removed = await UserService().get_by_id(user_id)
        new_owner = await UserService().get_by_id(new_owner_id) if new_owner_id else None
        await agent_service.notify_member_agents_released(
            team_id=team_id, released=released, removed=removed, actor=current_user, new_owner=new_owner,
        )


# Invitations
@router.post(
    "/{team_id}/invitations",
    response_model=TeamInvitationResponse,
    status_code=status.HTTP_201_CREATED,
)
@writes
async def create_invitation(
    team_id: str,
    invitation_in: TeamInvitationCreate,
    current_user: CurrentUser,
    _app_session: NotAppSession,
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

    # One live invitation per (team, address) (CHT-1265 review F5): with
    # two, accepting used up both and silently applied whichever role
    # the first claim carried. Revoke the old one to send another.
    if await team_service.get_live_invitation(team_id, invitation_in.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A pending invitation for this email already exists; revoke it to send a new one",
        )

    invitation = await team_service.create_invitation(team, invitation_in, current_user)

    # CHT-1251: the invitation token is otherwise undeliverable without DB
    # access (TeamInvitationResponse deliberately omits it) -- email the
    # accept link. send_invitation_email itself only schedules a
    # fire-and-forget task (never blocks, never raises in normal
    # operation) -- this try/except is the fail-soft backstop for that
    # dispatch call itself, so the invitation create can never 500 on
    # email trouble.
    try:
        accept_url = f"{get_settings().app_base_url.rstrip('/')}/invite/{invitation.token}"
        EmailService().send_invitation_email(
            invitation_in.email,
            team_name=team.name,
            role=invitation_in.role.value,
            invited_by_name=current_user.name,
            accept_url=accept_url,
        )
    except Exception:
        logger.exception("Failed to dispatch invitation email for team=%s", team.id)

    return invitation


@router.get("/{team_id}/invitations", response_model=list[TeamInvitationResponse])
@reads
async def list_team_invitations(
    team_id: str,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 1000,
):
    """List pending team invitations."""
    team_service = TeamService()

    if not await team_service.is_team_admin(team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can view invitations",
        )

    invitations = await team_service.get_team_invitations(team_id)
    return invitations[skip:skip + limit]


def mask_email(email: str) -> str:
    """``alice@example.com`` -> ``a***@example.com``: enough for the
    invite page to say which account to use, without handing the full
    address to whoever holds the link (CHT-1265). A one-character local
    part would be shown whole, so it is masked entirely: ``***@x.com``."""
    local, at, domain = (email or "").partition("@")
    if not at or not local or not domain:
        return "***"
    if len(local) == 1:
        return f"***@{domain}"
    return f"{local[0]}***@{domain}"


INVITATION_GONE = "This invitation is no longer valid"
# Every answer about an invitation, error or not: never stored by a
# cache, never sent on as a Referer.
INVITATION_HEADERS = {"Cache-Control": "no-store", "Referrer-Policy": "no-referrer"}


def _invitation_gone() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=INVITATION_GONE, headers=INVITATION_HEADERS,
    )


@router.get("/invitations/{token}", response_model=InvitationPreviewResponse)
@reads
async def preview_invitation(token: str, response: Response) -> InvitationPreviewResponse:
    """The public preview the /invite/<token> page shows (CHT-1265).

    Unauthenticated: the emailed link is opened before anyone signs in.
    It tells the token's holder only what the page needs (team name,
    role, inviter, a masked address, expiry), and answers an unknown,
    expired, accepted, declined or revoked token with the same 404, so
    a lookup cannot tell them apart.

    Threat model: the token is a bearer credential, not only a pointer
    to an inbox. Signup does not verify email ownership (CHT-1790), so
    while the invited address has no account, anyone holding the token
    can sign up as that address and accept. Keep it out of every log,
    Referer and history entry: it is redacted from the request log
    (app.log_redaction), and the /invite/ page is served no-referrer and
    moves it out of the address bar on load.

    Not rate limited here, on purpose (CHT-1369): rate limiting is the
    reverse proxy's job, and an in-process per-address counter behind a
    proxy would see one address for everyone, so one client could lock
    every invitee out. The token's 256 random bits are what make
    guessing hopeless.
    """
    response.headers.update(INVITATION_HEADERS)
    team_service = TeamService()
    invitation = await team_service.get_valid_invitation_by_token(token)
    team = await team_service.get_by_id(invitation.team_id) if invitation else None
    if invitation is None or team is None:
        raise _invitation_gone()
    inviter = (
        await UserService().get_by_id(invitation.invited_by_id)
        if invitation.invited_by_id else None
    )
    return InvitationPreviewResponse(
        team_name=team.name,
        role=invitation.role,
        invited_by_name=inviter.name if inviter else None,
        email_hint=mask_email(invitation.email),
        expires_at=invitation.expires_at,
    )


@router.post("/invitations/{token}/accept", response_model=TeamMemberResponse)
@writes
async def accept_invitation(token: str, current_user: CurrentUser, _app_session: NotAppSession):
    """Accept a team invitation.

    An unknown, expired, accepted, declined or revoked invitation gets
    the preview's one 404, checked before the email match, so whatever
    account asks, the answer does not tell those states apart (CHT-1265
    review F10). Before CHT-1788 a used token could be accepted again
    and added a second membership row.
    """
    team_service = TeamService()
    invitation = await team_service.get_valid_invitation_by_token(token)

    if invitation is None:
        raise _invitation_gone()

    if invitation.email != current_user.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invitation is for a different email",
            headers=INVITATION_HEADERS,
        )

    member = await team_service.accept_invitation(invitation, current_user)
    if member is None:
        # Accepted, declined or revoked by someone else meanwhile.
        raise _invitation_gone()
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
@writes
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
