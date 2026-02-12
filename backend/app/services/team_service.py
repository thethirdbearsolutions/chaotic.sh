"""Team service for team management."""
from datetime import datetime, timedelta, timezone
import secrets
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.models.team import Team, TeamMember, TeamInvitation, TeamRole, InvitationStatus
from app.models.user import User
from app.schemas.team import TeamCreate, TeamUpdate, TeamInvitationCreate


class TeamService:
    """Service for team operations."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, team_in: TeamCreate, creator: User) -> Team:
        """Create a new team."""
        team = Team(
            name=team_in.name,
            key=team_in.key.upper(),
            description=team_in.description,
        )
        self.db.add(team)
        await self.db.flush()

        # Add creator as owner
        member = TeamMember(
            team_id=team.id,
            user_id=creator.id,
            role=TeamRole.OWNER,
        )
        self.db.add(member)
        await self.db.commit()
        await self.db.refresh(team)
        return team

    async def get_by_id(self, team_id: str) -> Team | None:
        """Get team by ID."""
        result = await self.db.execute(select(Team).where(Team.id == team_id))
        return result.scalar_one_or_none()

    async def get_by_key(self, key: str) -> Team | None:
        """Get team by key."""
        result = await self.db.execute(select(Team).where(Team.key == key.upper()))
        return result.scalar_one_or_none()

    async def update(self, team: Team, team_in: TeamUpdate) -> Team:
        """Update a team."""
        update_data = team_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(team, field, value)
        await self.db.commit()
        await self.db.refresh(team)
        return team

    async def delete(self, team: Team) -> None:
        """Delete a team."""
        await self.db.delete(team)
        await self.db.commit()

    async def get_user_teams(self, user_id: str) -> list[Team]:
        """Get all teams for a user.

        For agents, returns the team from agent_team_id.
        For regular users, returns teams from TeamMember membership.
        """
        # First check if user is an agent
        user_result = await self.db.execute(
            select(User).where(User.id == user_id)
        )
        user = user_result.scalar_one_or_none()

        if user and user.is_agent and user.agent_team_id:
            # Agent users get their team from agent_team_id
            team = await self.get_by_id(user.agent_team_id)
            return [team] if team else []

        # Regular users get teams from TeamMember
        result = await self.db.execute(
            select(Team)
            .join(TeamMember)
            .where(TeamMember.user_id == user_id)
        )
        return list(result.scalars().all())

    async def get_members(self, team_id: str) -> list[TeamMember]:
        """Get all members of a team."""
        result = await self.db.execute(
            select(TeamMember)
            .options(selectinload(TeamMember.user))
            .where(TeamMember.team_id == team_id)
        )
        return list(result.scalars().all())

    async def get_member(self, team_id: str, user_id: str) -> TeamMember | None:
        """Get a specific team member."""
        result = await self.db.execute(
            select(TeamMember)
            .where(TeamMember.team_id == team_id, TeamMember.user_id == user_id)
        )
        return result.scalar_one_or_none()

    async def add_member(
        self, team: Team, user: User, role: TeamRole = TeamRole.MEMBER
    ) -> TeamMember:
        """Add a member to a team."""
        member = TeamMember(
            team_id=team.id,
            user_id=user.id,
            role=role,
        )
        self.db.add(member)
        await self.db.commit()
        await self.db.refresh(member)
        return member

    async def update_member_role(
        self, member: TeamMember, role: TeamRole
    ) -> TeamMember:
        """Update a member's role."""
        member.role = role
        await self.db.commit()
        await self.db.refresh(member)
        return member

    async def remove_member(self, member: TeamMember) -> None:
        """Remove a member from a team."""
        await self.db.delete(member)
        await self.db.commit()

    async def create_invitation(
        self, team: Team, invitation_in: TeamInvitationCreate, invited_by: User
    ) -> TeamInvitation:
        """Create a team invitation."""
        invitation = TeamInvitation(
            team_id=team.id,
            email=invitation_in.email,
            role=invitation_in.role,
            token=secrets.token_urlsafe(32),
            invited_by_id=invited_by.id,
            expires_at=datetime.now(timezone.utc) + timedelta(days=7),
        )
        self.db.add(invitation)
        await self.db.commit()
        await self.db.refresh(invitation)
        return invitation

    async def get_invitation_by_token(self, token: str) -> TeamInvitation | None:
        """Get invitation by token."""
        result = await self.db.execute(
            select(TeamInvitation).where(TeamInvitation.token == token)
        )
        return result.scalar_one_or_none()

    async def get_team_invitations(self, team_id: str) -> list[TeamInvitation]:
        """Get all pending invitations for a team."""
        result = await self.db.execute(
            select(TeamInvitation)
            .where(
                TeamInvitation.team_id == team_id,
                TeamInvitation.status == InvitationStatus.PENDING,
            )
        )
        return list(result.scalars().all())

    async def accept_invitation(
        self, invitation: TeamInvitation, user: User
    ) -> TeamMember:
        """Accept a team invitation."""
        invitation.status = InvitationStatus.ACCEPTED

        member = TeamMember(
            team_id=invitation.team_id,
            user_id=user.id,
            role=invitation.role,
        )
        self.db.add(member)
        await self.db.commit()
        await self.db.refresh(member)
        return member

    async def decline_invitation(self, invitation: TeamInvitation) -> None:
        """Decline a team invitation."""
        invitation.status = InvitationStatus.DECLINED
        await self.db.commit()

    async def delete_invitation(self, invitation: TeamInvitation) -> None:
        """Delete an invitation."""
        await self.db.delete(invitation)
        await self.db.commit()

    async def is_team_admin(self, team_id: str, user_id: str) -> bool:
        """Check if user is team admin or owner."""
        member = await self.get_member(team_id, user_id)
        if not member:
            return False
        return member.role in [TeamRole.OWNER, TeamRole.ADMIN]
