"""Oxyde ORM Team models."""
import uuid
from datetime import datetime, timezone
from app.utils.datetimes import DateTimeUTC
from oxyde import Model, Field, Index
from app.oxyde_models.user import OxydeUser  # noqa: F401 — needed for FK resolution
from app.enums import TeamActivityAction, TeamRole, InvitationStatus
from app.oxyde_models.enums import DbEnum


class OxydeTeam(Model):
    """Team/workspace model."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    name: str = Field()
    key: str = Field(db_unique=True, db_index=True)
    description: str | None = Field(default=None)
    logo_url: str | None = Field(default=None)
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "teams"


class OxydeTeamMember(Model):
    """Team membership model."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    team_id: str = Field()
    user: OxydeUser | None = Field(default=None, db_on_delete="CASCADE")
    role: DbEnum(TeamRole) = Field(default=TeamRole.MEMBER)
    joined_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "team_members"
        indexes = [
            # One membership per user per team (CHT-1791, migration 0033).
            # TeamService.add_member / accept_invitation treat a lost
            # insert race (IntegrityError) as the existing membership.
            Index(("team_id", "user_id"), unique=True, name="ux_team_members_team_user"),
        ]


class OxydeTeamInvitation(Model):
    """Team invitation model."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    team_id: str = Field()
    email: str = Field(db_index=True)
    role: DbEnum(TeamRole) = Field(default=TeamRole.MEMBER)
    token: str = Field(db_unique=True, db_index=True)
    invited_by: OxydeUser | None = Field(default=None, db_on_delete="CASCADE")
    status: DbEnum(InvitationStatus) = Field(default=InvitationStatus.PENDING)
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))
    expires_at: DateTimeUTC = Field()

    class Meta:
        is_table = True
        table_name = "team_invitations"


class OxydeTeamActivity(Model):
    """One administrative event of a team (CHT-1843, CHT-1845, migration 0038).

    Written in the transaction of what it records: a member added (on
    team creation, and on an accepted invitation that created the
    membership, beside its INVITATION_ACCEPTED), removed (or leaving, or
    deleting their account: actor and target the same) or given another
    role, an invitation created, cancelled (by an admin, or by its
    sender's account deletion) or accepted, and a team admin issuing an
    invitation verification code (CHT-1828). Only what the server does:
    a row deleted by hand in the database has no entry unless the hand
    writes one (as `system audit removed-members`' remedy does). Read by team
    admins (``GET /api/teams/{team}/activity``) and by ``chaotic system
    audit removed-members``.

    Never a secret: no invitation token, no code, no link. ``email`` is
    the invited address on invitation rows (an invitation has no user
    until accepted, and a cancelled one's row is deleted), which the
    team's admins can already read in the invitation list.

    The id columns are plain text, not foreign keys, on purpose: an
    audit row keeps naming the user, invitation and team after any of
    them is deleted. ``role`` is the role granted (the new one on
    ROLE_CHANGED, the one held on MEMBER_REMOVED); ``old_role`` is set
    only on ROLE_CHANGED.
    """

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    team_id: str = Field()
    action: DbEnum(TeamActivityAction) = Field()
    actor_id: str | None = Field(default=None)
    target_user_id: str | None = Field(default=None)
    invitation_id: str | None = Field(default=None)
    email: str | None = Field(default=None)
    role: DbEnum(TeamRole) | None = Field(default=None)
    old_role: DbEnum(TeamRole) | None = Field(default=None)
    created_at: DateTimeUTC = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Meta:
        is_table = True
        table_name = "team_activities"
        indexes = [
            # A team's log, newest first (the API's only read).
            Index(("team_id", "created_at"), name="ix_team_activities_team_created"),
            # One action across teams: the removed-members audit.
            Index(("action", "created_at"), name="ix_team_activities_action_created"),
        ]
