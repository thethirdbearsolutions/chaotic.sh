"""Team service for team management.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
from datetime import datetime, timedelta, timezone
import secrets
from app.oxyde_models.user import OxydeUser
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember, OxydeTeamInvitation
from app.models.team import TeamRole, InvitationStatus
from app.schemas.team import TeamCreate, TeamUpdate, TeamInvitationCreate
from oxyde import atomic

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
                role=TeamRole.OWNER.value,
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

    async def delete(self, team: OxydeTeam) -> None:
        """Delete a team and its child records.

        Oxyde doesn't enforce FK cascades, so we manually delete
        members and invitations before removing the team.
        """
        async with atomic():
            await OxydeTeamInvitation.objects.filter(team_id=team.id).delete()
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
        """Get all members of a team.

        Note: In the Oxyde version, the 'user' relationship data is loaded
        separately via a batched query (replaces SQLAlchemy selectinload).
        """
        members = await OxydeTeamMember.objects.filter(team_id=team_id).all()
        # Batch-load user data (avoids N+1 queries)
        user_ids = [m.user_id for m in members]
        if user_ids:
            users = await OxydeUser.objects.filter(id__in=user_ids).all()
            user_map = {u.id: u for u in users}
        else:
            user_map = {}
        for member in members:
            member._user = user_map.get(member.user_id)
        return members

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
            role=role.value,
        )
        await member.refresh()
        return member

    async def update_member_role(
        self, member: OxydeTeamMember, role: TeamRole
    ) -> OxydeTeamMember:
        """Update a member's role."""
        member.role = role.value
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
            role=invitation_in.role.value if hasattr(invitation_in.role, 'value') else invitation_in.role,
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
            team_id=team_id, status=InvitationStatus.PENDING.value
        ).all()

    async def accept_invitation(
        self, invitation: OxydeTeamInvitation, user: OxydeUser
    ) -> OxydeTeamMember:
        """Accept a team invitation."""
        async with atomic():
            invitation.status = InvitationStatus.ACCEPTED.value
            await invitation.save(update_fields={"status"})

            member = await OxydeTeamMember.objects.create(
                team_id=invitation.team_id,
                user_id=user.id,
                role=invitation.role,
            )
        await member.refresh()
        return member

    async def decline_invitation(self, invitation: OxydeTeamInvitation) -> None:
        """Decline a team invitation."""
        invitation.status = InvitationStatus.DECLINED.value
        await invitation.save(update_fields={"status"})

    async def delete_invitation(self, invitation: OxydeTeamInvitation) -> None:
        """Delete an invitation."""
        await invitation.delete()

    async def is_team_admin(self, team_id: str, user_id: str) -> bool:
        """Check if user is team admin or owner."""
        member = await self.get_member(team_id, user_id)
        if not member:
            return False
        return member.role in [TeamRole.OWNER.value, TeamRole.ADMIN.value]
