"""Team service for team management.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
from datetime import datetime, timedelta, timezone
import secrets
from app.oxyde_models.user import OxydeUser
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember, OxydeTeamInvitation
from app.enums import TeamRole, InvitationStatus
from app.schemas.team import TeamCreate, TeamUpdate, TeamInvitationCreate
from oxyde import execute_raw
from app.db.transactions import atomic
from app.utils import ensure_utc
from app.services.credential_events import revoking

# Type aliases for API compatibility
Team = OxydeTeam
TeamMember = OxydeTeamMember
TeamInvitation = OxydeTeamInvitation


class TeamService:
    """Service for team operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        pass

    async def create(self, team_in: TeamCreate, creator: OxydeUser) -> OxydeTeam:
        """Create a new team."""
        async with atomic():
            team = await OxydeTeam.objects.create(
                name=team_in.name,
                key=team_in.key.upper(),
                description=team_in.description,
            )
            await OxydeTeamMember.objects.create(
                team_id=team.id,
                user_id=creator.id,
                role=TeamRole.OWNER,
            )
        await team.refresh()
        return team

    async def get_by_id(self, team_id: str) -> OxydeTeam | None:
        """Get team by ID."""
        return await OxydeTeam.objects.get_or_none(id=team_id)

    async def get_by_key(self, key: str) -> OxydeTeam | None:
        """Get team by key."""
        return await OxydeTeam.objects.get_or_none(key=key.upper())

    async def update(self, team: OxydeTeam, team_in: TeamUpdate) -> OxydeTeam:
        """Update a team."""
        update_data = team_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(team, field, value)
        team.updated_at = datetime.now(timezone.utc)
        await team.save(update_fields=set(update_data.keys()) | {"updated_at"})
        await team.refresh()
        return team

    async def delete(self, team: OxydeTeam, *, actor_id: str | None = None) -> None:
        """Delete a team and its child records.

        Oxyde doesn't enforce FK cascades, so we manually delete
        members and invitations before removing the team. Its holder
        sessions and unredeemed codes and tickets are revoked first
        (CHT-1523), so the deletion is audited and moves the revocation
        epoch rather than only cascading the rows away.
        """
        from app.services.revocation_service import RevocationService

        async with revoking():
            await OxydeTeamInvitation.objects.filter(team_id=team.id).delete()
            await RevocationService().revoke_for_team(team.id, actor_id=actor_id)
            await OxydeTeamMember.objects.filter(team_id=team.id).delete()
            await team.delete()

    async def get_user_teams(self, user_id: str) -> list[OxydeTeam]:
        """Get all teams for a user.

        For agents, returns the team from agent_team_id.
        For regular users, returns teams from TeamMember membership.
        """
        user = await OxydeUser.objects.get_or_none(id=user_id)

        if user and user.is_agent and user.agent_team_id:
            team = await self.get_by_id(user.agent_team_id)
            return [team] if team else []

        # Regular users: get team IDs from membership, then fetch teams
        members = await OxydeTeamMember.objects.filter(user_id=user_id).all()
        if not members:
            return []
        team_ids = [m.team_id for m in members]
        teams = await OxydeTeam.objects.filter(id__in=team_ids).all()
        return teams

    async def get_members(self, team_id: str) -> list[OxydeTeamMember]:
        """Get all members of a team."""
        return await OxydeTeamMember.objects.filter(
            team_id=team_id
        ).join("user").all()

    async def get_member(
        self, team_id: str, user_id: str
    ) -> OxydeTeamMember | None:
        """Get a specific team member."""
        return await OxydeTeamMember.objects.filter(
            team_id=team_id, user_id=user_id
        ).first()

    async def add_member(
        self, team: OxydeTeam, user: OxydeUser, role: TeamRole = TeamRole.MEMBER
    ) -> OxydeTeamMember:
        """Add a member to a team."""
        member = await OxydeTeamMember.objects.create(
            team_id=team.id,
            user_id=user.id,
            role=role,
        )
        await member.refresh()
        return member

    async def update_member_role(
        self, member: OxydeTeamMember, role: TeamRole
    ) -> OxydeTeamMember:
        """Update a member's role."""
        member.role = role
        await member.save(update_fields={"role"})
        await member.refresh()
        return member

    async def remove_member(self, member: OxydeTeamMember) -> None:
        """Remove a member from a team."""
        await member.delete()

    async def create_invitation(
        self,
        team: OxydeTeam,
        invitation_in: TeamInvitationCreate,
        invited_by: OxydeUser,
    ) -> OxydeTeamInvitation:
        """Create a team invitation."""
        invitation = await OxydeTeamInvitation.objects.create(
            team_id=team.id,
            email=invitation_in.email,
            role=invitation_in.role,
            # Travels as a URL path segment; app.log_redaction scrubs
            # it from request logs by that position (CHT-1601).
            token=secrets.token_urlsafe(32),
            invited_by_id=invited_by.id,
            expires_at=datetime.now(timezone.utc) + timedelta(days=7),
        )
        await invitation.refresh()
        return invitation

    async def get_invitation_by_token(
        self, token: str
    ) -> OxydeTeamInvitation | None:
        """Get invitation by token."""
        return await OxydeTeamInvitation.objects.get_or_none(token=token)

    async def get_team_invitations(
        self, team_id: str
    ) -> list[OxydeTeamInvitation]:
        """Get all pending invitations for a team."""
        return await OxydeTeamInvitation.objects.filter(
            team_id=team_id, status=InvitationStatus.PENDING
        ).all()

    async def get_valid_invitation_by_token(
        self, token: str
    ) -> OxydeTeamInvitation | None:
        """The invitation behind ``token`` if it can still be accepted:
        pending and not expired. None for an unknown, expired, accepted,
        declined or revoked (deleted) one alike (CHT-1265)."""
        invitation = await self.get_invitation_by_token(token)
        if invitation is None or invitation.status != InvitationStatus.PENDING:
            return None
        if ensure_utc(invitation.expires_at) < datetime.now(timezone.utc):
            return None
        return invitation

    async def get_live_invitation(
        self, team_id: str, email: str
    ) -> OxydeTeamInvitation | None:
        """A pending, unexpired invitation to ``email`` for this team, if
        there is one. An expired one does not count: it can't be accepted,
        so a new invitation may replace it."""
        now = datetime.now(timezone.utc)
        pending = await OxydeTeamInvitation.objects.filter(
            team_id=team_id, email=email, status=InvitationStatus.PENDING
        ).all()
        return next((i for i in pending if ensure_utc(i.expires_at) >= now), None)

    async def accept_invitation(
        self, invitation: OxydeTeamInvitation, user: OxydeUser
    ) -> OxydeTeamMember | None:
        """Accept a team invitation; None if it was no longer pending.

        The invitation is claimed with a conditional UPDATE, so two
        accepts of one token cannot both add a member and a used one
        cannot be replayed (CHT-1788). A user who is already a member
        keeps the membership they have: the invitation is used up and
        that membership returned, never a second row.
        """
        async with atomic():
            claimed = await OxydeTeamInvitation.objects.filter(
                id=invitation.id, status=InvitationStatus.PENDING
            ).update(status=InvitationStatus.ACCEPTED)
            if claimed != 1:
                return None
            member = await self.get_member(invitation.team_id, user.id)
            if member is None:
                member = await OxydeTeamMember.objects.create(
                    team_id=invitation.team_id,
                    user_id=user.id,
                    role=invitation.role,
                )
        await member.refresh()
        return member

    async def decline_invitation(self, invitation: OxydeTeamInvitation) -> None:
        """Decline a team invitation."""
        invitation.status = InvitationStatus.DECLINED
        await invitation.save(update_fields={"status"})

    async def delete_invitation(self, invitation: OxydeTeamInvitation) -> None:
        """Delete an invitation."""
        await invitation.delete()

    async def shares_team(self, user_id_a: str, user_id_b: str) -> bool:
        """Check if two users share at least one team (single query)."""
        rows = await execute_raw(
            "SELECT 1 FROM team_members m1 "
            "JOIN team_members m2 ON m1.team_id = m2.team_id "
            "WHERE m1.user_id = ? AND m2.user_id = ? LIMIT 1",
            [user_id_a, user_id_b],
        )
        return len(rows) > 0

    async def is_team_admin(self, team_id: str, user_id: str) -> bool:
        """Check if user is team admin or owner."""
        member = await self.get_member(team_id, user_id)
        if not member:
            return False
        return member.role in [TeamRole.OWNER, TeamRole.ADMIN]
