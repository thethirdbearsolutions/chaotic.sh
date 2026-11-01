"""Team schemas."""
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from app.enums import AgentKind, TeamActivityAction, TeamRole, InvitationStatus
from app.utils import DateTimeUTC


def _coerce_enum(enum_cls, v):
    """Coerce enum name strings from Oxyde to enum members."""
    if isinstance(v, enum_cls):
        return v
    if isinstance(v, str):
        try:
            return enum_cls[v]
        except KeyError:
            return enum_cls(v)
    return v


class TeamCreate(BaseModel):
    """Schema for creating a team."""

    name: str = Field(min_length=1, max_length=255)
    key: str = Field(min_length=2, max_length=10, pattern=r"^[A-Z0-9]+$")
    description: str | None = None


class TeamUpdate(BaseModel):
    """Schema for updating a team."""

    name: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = None
    logo_url: str | None = None


class TeamRoleUpdate(BaseModel):
    """Schema for updating a team member's role (CHT-1223).

    PATCH /teams/{team_id}/members/{user_id} previously bound `role` as a
    bare (query-string) function param, but every client (CLI included)
    sends it as a JSON body -- this schema makes the body path work.
    """

    role: TeamRole


class TeamOwnershipTransfer(BaseModel):
    """Body of POST /teams/{team_id}/transfer-ownership (CHT-1848): the
    member who becomes an owner. The caller, an owner, becomes an admin
    in the same transaction."""

    user_id: str = Field(min_length=1)


class TeamResponse(BaseModel):
    """Schema for team response."""

    id: str
    name: str
    key: str
    description: str | None
    logo_url: str | None
    created_at: DateTimeUTC
    updated_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)


class TeamMemberResponse(BaseModel):
    """Schema for team member response."""

    id: str
    user_id: str
    team_id: str
    role: TeamRole
    joined_at: DateTimeUTC
    user_name: str | None = None
    user_email: str | None = None
    # The @handle that mentions exactly this member in the team (CHT-1731);
    # null where not computed.
    mention_handle: str | None = None

    model_config = ConfigDict(from_attributes=True)

    @field_validator("role", mode="before")
    @classmethod
    def coerce_role(cls, v):
        return _coerce_enum(TeamRole, v)


class RosterEntry(BaseModel):
    """One teammate on ``GET /teams/{id}/roster`` (CHT-1980): a person or
    an agent, with the identity they wrote for themselves (CHT-1979)."""

    user_id: str
    name: str
    avatar_url: str | None = None
    pronouns: str | None = None
    tagline: str | None = None
    bio: str | None = None
    # The @handle that mentions exactly this teammate (CHT-1731).
    mention_handle: str | None = None
    is_agent: bool = False
    # A person's role; an agent's too when it holds a membership.
    role: TeamRole | None = None
    # Agents only: assistant, service or session (CHT-1497), the person
    # who owns it, and the project it is confined to (null: team-wide).
    kind: AgentKind | None = None
    owner_id: str | None = None
    owner_name: str | None = None
    project_id: str | None = None
    # A session identity's key unused for 7 days (CHT-1501).
    idle: bool = False
    # When they joined: a person's membership, an agent's creation.
    joined_at: DateTimeUTC

    @field_validator("role", mode="before")
    @classmethod
    def coerce_role(cls, v):
        return None if v is None else _coerce_enum(TeamRole, v)


class TeamInvitationCreate(BaseModel):
    """Schema for creating a team invitation."""

    # EmailStr, as on signup (CHT-1804): an invitation's address is
    # validated and normalised (domain lowercased, IDN domains encoded)
    # the same way as an account's, so the two compare equal.
    email: EmailStr
    role: TeamRole = TeamRole.MEMBER


class TeamInvitationResponse(BaseModel):
    """Schema for team invitation response."""

    id: str
    team_id: str
    email: str
    role: TeamRole
    status: InvitationStatus
    created_at: DateTimeUTC
    expires_at: DateTimeUTC

    model_config = ConfigDict(from_attributes=True)

    @field_validator("role", mode="before")
    @classmethod
    def coerce_role(cls, v):
        return _coerce_enum(TeamRole, v)

    @field_validator("status", mode="before")
    @classmethod
    def coerce_status(cls, v):
        return _coerce_enum(InvitationStatus, v)


class TeamInvitationCreatedResponse(TeamInvitationResponse):
    """The create answer: the invitation, plus its accept link
    (CHT-1794, CHT-1824).

    ``accept_url`` holds the invitation token, a bearer credential
    (CHT-1790), so it is shown once, to the admin who created the
    invitation. It is never in the list (``TeamInvitationResponse``) or
    a log line. ``email_queued`` is true when the server queued an email
    with the link too. Queued is all it knows: the send runs after this
    answer, so delivery is never confirmed here, and the admin keeps the
    link in case it fails."""

    accept_url: str | None = None
    email_queued: bool = False


class InvitationAccept(BaseModel):
    """The optional body of an accept (CHT-1828): a code, either the one
    a team admin issued for this invitation or a mailed verification
    code, for an account whose address is not verified yet."""

    # Bounded but not pattern-checked here, so a malformed code gets the
    # same answer as a wrong one.
    code: str | None = Field(default=None, min_length=1, max_length=32)


class InvitationCodeAccount(BaseModel):
    """The account an admin-issued verification code is for (CHT-1828):
    what the admin needs to check with the invitee that it is theirs.
    An account someone else made with the invited address (from a
    leaked link) shows up here as a name, signup time or other team the
    invitee does not recognise."""

    name: str
    email: str
    created_at: DateTimeUTC
    # In any team at all: a brand-new invitee is normally in none.
    member_of_any_team: bool


class InvitationVerificationCodeResponse(BaseModel):
    """A code for the account at a pending invitation's address, issued
    to a team admin to hand over by hand when the mailed verification
    code cannot arrive (CHT-1828). Shown once; never logged or stored in
    the clear. It lets that account accept this one invitation, from a
    session signed in as it (``chaotic team accept-invite <link> --code``);
    it does not verify the address."""

    code: str
    expires_at: DateTimeUTC
    # To judge the account's signup time against.
    invitation_created_at: DateTimeUTC
    account: InvitationCodeAccount
    # What to do before handing it over.
    instructions: str


class InvitationPreviewResponse(BaseModel):
    """What the public /invite/<token> page shows before anyone signs in
    (CHT-1265). Only what the page needs: no ids, no token, no status
    (a preview exists only for a valid invitation), and the invited
    address only masked, enough to say which account to sign in with."""

    team_name: str
    role: TeamRole
    invited_by_name: str | None
    email_hint: str
    expires_at: DateTimeUTC

    @field_validator("role", mode="before")
    @classmethod
    def coerce_role(cls, v):
        return _coerce_enum(TeamRole, v)


class TeamActivityResponse(BaseModel):
    """One row of a team's administrative log (CHT-1843, CHT-1845).

    ``actor_*`` did it, ``target_user_*`` it concerns (the same user when
    a member left on their own). ``email`` is the invited address on
    invitation rows. ``role`` is the role granted (the new one on
    role_changed, the one held on member_removed, owner on
    ownership_transferred), or on invitation_created,
    invitation_cancelled and invitation_invalidated the role offered
    (on invitation_invalidated never granted: the owner invitation was
    voided, CHT-1868); ``old_role`` only on role_changed and
    ownership_transferred (the new owner's role before it). Names are
    null for a user since deleted."""

    id: str
    team_id: str
    action: TeamActivityAction
    actor_id: str | None = None
    actor_name: str | None = None
    target_user_id: str | None = None
    target_user_name: str | None = None
    invitation_id: str | None = None
    email: str | None = None
    role: TeamRole | None = None
    old_role: TeamRole | None = None
    created_at: DateTimeUTC

    @field_validator("action", mode="before")
    @classmethod
    def coerce_action(cls, v):
        return _coerce_enum(TeamActivityAction, v)

    @field_validator("role", "old_role", mode="before")
    @classmethod
    def coerce_roles(cls, v):
        return _coerce_enum(TeamRole, v)
