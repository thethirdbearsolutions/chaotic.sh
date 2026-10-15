"""Team API routes."""
import logging
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, Response, status
from app.auth.access import reads, writes
from app.api.deps import CurrentUser, NotAppSession, check_user_in_team
from app.api.visibility import visible_team
from app.schemas.team import (
    TeamCreate,
    TeamUpdate,
    TeamResponse,
    TeamMemberResponse,
    TeamRoleUpdate,
    TeamInvitationCreate,
    TeamInvitationResponse,
    TeamInvitationCreatedResponse,
    InvitationPreviewResponse,
    InvitationCodeAccount,
    InvitationVerificationCodeResponse,
)
from app.config import get_settings
from app.oxyde_models.team import OxydeTeamMember
from app.services.agent_service import AgentService
from app.services.credential_events import revoking
from app.services.mention_handles import MentionDirectory
from app.services.team_service import TeamService
from app.services.user_service import UserService
from app.services.email_service import EmailService
from app.services.email_verification_service import (
    CODE_NOT_NEEDED, EmailVerificationService, VerificationRefused,
)
from app.utils import ensure_utc
from app.utils.email_address import same_email
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
    # Team directory: members and agents of the team at either scope,
    # project-scoped agents included (CHT-732, CHT-1780). Anyone else gets
    # the missing team's 404 (CHT-1785).
    return await visible_team(current_user, team_id)


@router.patch("/{team_id}", response_model=TeamResponse)
@writes
async def update_team(
    team_id: str, team_in: TeamUpdate, current_user: CurrentUser
):
    """Update a team."""
    team_service = TeamService()
    # Visible (else 404, as if missing), then admin (403) (CHT-1785).
    team = await visible_team(current_user, team_id)

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
    # Visible (else 404, as if missing), then owner (403) (CHT-1785).
    team = await visible_team(current_user, team_id)

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
    response_model=TeamInvitationCreatedResponse,
    status_code=status.HTTP_201_CREATED,
)
@writes
async def create_invitation(
    team_id: str,
    invitation_in: TeamInvitationCreate,
    current_user: CurrentUser,
    response: Response,
    _app_session: NotAppSession,
) -> TeamInvitationCreatedResponse:
    """Create a team invitation.

    The answer carries the accept link, once, for the admin to hand over
    themselves (CHT-1794): without SMTP it is the only way it travels,
    and with SMTP the email is only queued, so the admin has it in case
    delivery fails (CHT-1824). ``email_queued`` says which."""
    team_service = TeamService()

    # Admin check first, from the team id alone, like the other invitation
    # routes (CHT-1803): it is a membership query, which a missing team
    # fails the same way, so a non-admin gets the same 403 for an existing
    # team and a missing one, and cannot probe team ids (CHT-1785).
    if not await team_service.is_team_admin(team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can invite members",
        )

    team = await team_service.get_by_id(team_id)
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found",
        )

    # Already a member? Every account at the address, ignoring case: an
    # older database can hold two that differ only in case (left without
    # email_folded by migration 0034), and the address is a member if
    # either account is (CHT-1804).
    user_service = UserService()
    for existing_user in await user_service.find_by_email_ignoring_case(invitation_in.email):
        if await team_service.get_member(team_id, existing_user.id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User is already a team member",
            )

    # One live invitation per (team, address) (CHT-1265 review F5): with
    # two, accepting used up both and silently applied whichever role
    # the first claim carried. Cancel the old one to send another; the
    # refusal says so, with the id to cancel, since the usual reason to
    # invite again is that the first email never arrived (CHT-1824).
    pending = await team_service.get_live_invitation(team_id, invitation_in.email)
    if pending:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "error_code": "invitation_pending",
                "message": "A pending invitation for this email already exists. "
                           "If it did not reach them, cancel it and invite again for a new link.",
                "invitation_id": pending.id,
            },
        )

    invitation = await team_service.create_invitation(team, invitation_in, current_user)

    # CHT-1251: the invitation token is otherwise undeliverable without DB
    # access (TeamInvitationResponse deliberately omits it) -- email the
    # accept link. send_invitation_email itself only schedules a
    # fire-and-forget task (never blocks, never raises in normal
    # operation) -- this try/except is the fail-soft backstop for that
    # dispatch call itself, so the invitation create can never 500 on
    # email trouble.
    accept_url = f"{get_settings().app_base_url.rstrip('/')}/invite/{invitation.token}"
    email_service = EmailService()
    dispatched = False
    try:
        email_service.send_invitation_email(
            invitation_in.email,
            team_name=team.name,
            role=invitation_in.role.value,
            invited_by_name=current_user.name,
            accept_url=accept_url,
        )
        dispatched = True
    except Exception:
        logger.exception("Failed to dispatch invitation email for team=%s", team.id)
    # Without SMTP the send above only logs that it skipped.
    email_queued = dispatched and email_service.is_configured()

    # The link goes to the inviting admin, here and only here: never in
    # the list, never logged (CHT-1794). Always, not only without SMTP:
    # the email is sent in the background after this answer, so nothing
    # here knows it arrived, and an admin left with no link when it
    # fails cannot get one (CHT-1824). It grants the admin nothing: they
    # could invite an address of their own. A bearer credential in a
    # body: not to be cached.
    created = TeamInvitationCreatedResponse.model_validate(invitation)
    created.accept_url = accept_url
    created.email_queued = email_queued
    response.headers.update(INVITATION_HEADERS)
    return created


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


EMAIL_UNVERIFIED = {
    "error_code": "email_unverified",
    "message": "Verify your email address before accepting an invitation: "
               "run `chaotic auth verify-email`, then accept again.",
}


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
    to an inbox. Signup does not verify email ownership. With SMTP
    configured, accepting requires a verified address (CHT-1790), so a
    leaked token alone is not enough; without SMTP nothing can verify
    one, and while the invited address has no account, anyone holding
    the token can sign up as that address and accept. Keep it out of every log,
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

    # CHT-1790: signup takes any address on trust, so with SMTP configured
    # the account must have proved it receives mail at its address. Checked
    # before the email match, so an unverified account gets this same
    # answer whichever address it has and cannot use the mismatch 403 to
    # guess the invitee's. Without SMTP nothing can verify an address and
    # the invitation link (handed over by hand) is the only delivery path,
    # so the token itself stays the credential, as before.
    if EmailService().is_configured() and current_user.email_verified_at is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=dict(EMAIL_UNVERIFIED), headers=INVITATION_HEADERS,
        )

    # Ignoring case (CHT-1789): an address's case is not part of whose it is.
    if not same_email(invitation.email, current_user.email):
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


ISSUE_CODE_INSTRUCTIONS = (
    "Before you hand this code over, confirm with the invitee, by a channel you trust, "
    "that this account is theirs: its name, its signup time and whether it is already "
    "in a team. Anyone can sign up with an address they don't own, so an account you "
    "don't recognise may be someone who saw the invitation link. Then give the code to "
    "the invitee only. It verifies this account's address and nothing else, works only "
    "from a session signed in as this account, and expires in 15 minutes."
)


@router.post(
    "/{team_id}/invitations/{invitation_id}/verification-code",
    response_model=InvitationVerificationCodeResponse,
    status_code=status.HTTP_201_CREATED,
)
@writes
async def issue_invitation_verification_code(
    team_id: str,
    invitation_id: str,
    current_user: CurrentUser,
    response: Response,
    _app_session: NotAppSession,
) -> InvitationVerificationCodeResponse:
    """Give a team admin a verification code for the account at a pending
    invitation's address, to hand over by hand (CHT-1828).

    With SMTP configured, accepting an invitation needs a verified
    address (CHT-1790). When the relay fails, the mailed code fails too,
    and the invitee is stuck. This does what the email would: the code
    is the mailed kind (``EmailVerificationService.issue_for_admin``),
    bound to that one account, so it confirms nothing from any other
    session. A leaked link plus this code is still useless without the
    account's password. The answer names the account (name, signup time,
    whether it is in any team) so the admin can check it is the
    invitee's and not one someone made from a leaked link.

    Refusals, in order, so the action tells nobody more than the
    invitation already does: 403 for a non-admin (from the team id
    alone, like every invitation route), the delete route's 404 for an
    invitation that is not this team's, pending and unexpired, 409
    ``email_verification_unavailable`` without SMTP, then 409
    ``no_verification_requested`` when no account at the invited address
    asked for a code itself in the last day (the stuck invitee has; a
    missing account and a passive one get this same answer, so neither
    its existence nor its details are told), then ``ambiguous_account``
    / ``email_already_verified``. The name, signup time and team
    membership are shown only to an admin of a team with a pending
    invitation to that address, and only for an account that asked.

    Every earlier unconfirmed code of the account stops working. The
    issue is logged with ids only, never the code.
    """
    team_service = TeamService()
    if not await team_service.is_team_admin(team_id, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can issue verification codes",
        )

    invitation = next(
        (i for i in await team_service.get_team_invitations(team_id) if i.id == invitation_id),
        None,
    )
    if invitation is None or ensure_utc(invitation.expires_at) < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invitation not found",
        )

    verification = EmailVerificationService()
    # Before any lookup of the address: without SMTP the answer is the
    # same whether or not it has an account.
    if not verification.email.is_configured():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=CODE_NOT_NEEDED.detail())

    # People only: an agent account has no mailbox and cannot accept.
    # And only an account that asked for a code itself, which is what a
    # stuck invitee has done: anyone can make a team and invite any
    # address, so without this the answer would describe any account
    # (name, signup time, teams) and could disarm a stranger's codes at
    # will (PR #446 review F1). No account and a passive one get the same
    # answer, so existence is not told either.
    accounts = [
        u for u in await UserService().find_by_email_ignoring_case(invitation.email)
        if not u.is_agent and u.is_active and await verification.asked_recently(u.id)
    ]
    if not accounts:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "error_code": "no_verification_requested",
                "message": "No account with the invited address has asked for a verification code "
                           "in the last 24 hours. Ask the invitee to sign up and request one (on the "
                           "invitation page, or with `chaotic auth verify-email`); if it doesn't "
                           "arrive, issue the code then.",
            },
        )
    if len(accounts) > 1:
        # Only on a database older than case-insensitive signup (CHT-1790):
        # which one is the invitee's is for the operator to sort out.
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "error_code": "ambiguous_account",
                "message": "More than one account has the invited address (differing only in "
                           "case). Ask the server's operator to remove the one that is not the invitee's.",
            },
        )
    account = accounts[0]

    try:
        code, row = await verification.issue_for_admin(account)
    except VerificationRefused as refused:
        raise HTTPException(
            status_code=refused.status_code, detail=refused.detail(), headers=refused.headers,
        ) from refused

    in_a_team = await OxydeTeamMember.objects.filter(user_id=account.id).first() is not None
    logger.info(
        "email verification code %s issued by admin %s of team %s for user %s via invitation %s",
        row.id, current_user.id, team_id, account.id, invitation.id,
    )
    # A credential in a body: not to be cached.
    response.headers.update(INVITATION_HEADERS)
    return InvitationVerificationCodeResponse(
        code=code,
        expires_at=row.expires_at,
        account=InvitationCodeAccount(
            name=account.name,
            email=account.email,
            created_at=account.created_at,
            member_of_any_team=in_a_team,
        ),
        instructions=ISSUE_CODE_INSTRUCTIONS,
    )
