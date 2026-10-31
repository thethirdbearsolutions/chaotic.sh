"""Agent routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from app.auth.access import reads, registers, writes
from app.api.deps import (
    CurrentPrincipal, CurrentUser, NotAppSession, can_manage_agent, check_not_app_session,
    get_api_key_record,
)
from app.api.visibility import team_hidden, visible_agent, visible_project, visible_team
from app.enums import AgentKind
from app.oxyde_models.user import OxydeUser
from app.schemas.agent import (
    AgentCreate, AgentRegister, AgentRegistered, AgentUpdate, AgentResponse, AgentCreated,
)
from app.enums import TeamRole
from app.services.registration_service import (
    RegistrationRefused, RegistrationService, member_named, name_matches_member_detail, normalize_name,
)
from app.schemas.api_key import AgentKeyResponse, APIKeyCreated
from app.services.agent_service import (
    AgentHasAuthoredContentError, AgentInactiveError, AgentManageDeniedError, AgentService, is_idle,
)
from app.services.api_key_service import APIKeyService
from app.services.mention_handles import MentionDirectory
from app.services.team_service import TeamService
from app.services.user_service import UserService

router = APIRouter()


async def _is_team_admin(user, team_id: str | None) -> bool:
    if user.is_agent or not team_id:
        return False
    member = await TeamService().get_member(team_id, user.id)
    return member is not None and member.role in (TeamRole.OWNER, TeamRole.ADMIN)


async def sees_external_ref(viewer, agent, *, admin: bool | None = None) -> bool:
    """`external_ref` (a harness session address) is shown only to the
    identity itself, the human who owns and holds it, and admins of its
    team (CHT-1498 review). Other teammates see null."""
    if not agent.external_ref:
        return True
    if viewer.id in (agent.id, agent.parent_user_id):
        return True
    return admin if admin is not None else await _is_team_admin(viewer, agent.agent_team_id)


async def _refuse_member_name(team_id: str, name: str) -> None:
    """Rule 8 for every agent name, not only registered ones: an agent may
    not carry a person's name in its team (normalized, CHT-1498)."""
    if await member_named(team_id, name):
        raise HTTPException(status_code=422, detail=name_matches_member_detail(name))


def agent_response(
    agent, *, show_ref: bool = True, last_used_at=None, mention_handle: str | None = None,
) -> AgentResponse:
    """The wire form of an agent row (with `parent_user` joined).
    `show_ref`: see ``sees_external_ref``. `last_used_at`: from
    ``AgentService.session_last_used``, for a session identity.
    `mention_handle`: from ``MentionDirectory.handle_for`` (CHT-1731)."""
    return AgentResponse(
        mention_handle=mention_handle,
        last_used_at=last_used_at,
        idle=is_idle(last_used_at),
        id=agent.id,
        name=agent.name,
        avatar_url=agent.avatar_url,
        is_active=agent.is_active,
        parent_user_id=agent.parent_user_id,
        parent_user_name=agent.parent_user.name if agent.parent_user else None,
        agent_team_id=agent.agent_team_id,
        agent_project_id=agent.agent_project_id,
        created_at=agent.created_at,
        updated_at=agent.updated_at,
        kind=agent.kind,
        external_ref=agent.external_ref if show_ref else None,
        registered_by_id=agent.registered_by_id,
        can_register=agent.can_register,
    )


async def _mention_handle(agent) -> str | None:
    """The @handle that reaches `agent` in its team (CHT-1731)."""
    if not agent.agent_team_id:
        return None
    return (await MentionDirectory.for_team(agent.agent_team_id)).handle_for(agent.id)


async def _last_used(agent):
    """`last_used_at` for ``agent_response`` (None unless a session
    identity), so every response states `idle` truly (CHT-1501)."""
    return (await AgentService.session_last_used([agent])).get(agent.id)


@router.post(
    "/teams/{team_id}/agents",
    response_model=AgentCreated,
    status_code=status.HTTP_201_CREATED,
)
@writes
async def create_team_agent(
    team_id: str,
    agent_in: AgentCreate,
    current_user: CurrentUser,
    _app_session: NotAppSession,
):
    """Create a team-scoped agent. The API key is only shown once."""
    # Verify user has permission to create agents in this team
    team_service = TeamService()
    # Visible (else 404, as if missing), then membership (403) (CHT-1785).
    await visible_team(current_user, team_id)

    # The caller can see the team, so the refusal names the action: an
    # agent is refused as an agent, not as an outsider (CHT-1842).
    # Only humans can create agents
    if current_user.is_agent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Agents cannot create other agents",
        )

    # Check if user is a member of the team
    member = await team_service.get_member(team_id, current_user.id)
    if not member:
        raise team_hidden()

    await _refuse_member_name(team_id, agent_in.name)
    agent_service = AgentService()
    agent, api_key, api_key_id = await agent_service.create(
        agent_in=agent_in,
        parent_user=current_user,
        team_id=team_id,
        project_id=None,  # Team-scoped
    )

    return AgentCreated(
        id=agent.id,
        name=agent.name,
        avatar_url=agent.avatar_url,
        agent_team_id=agent.agent_team_id,
        agent_project_id=agent.agent_project_id,
        api_key=api_key,
        api_key_id=api_key_id,
        created_at=agent.created_at,
        kind=agent.kind,
        can_register=agent.can_register,
    )


@router.post(
    "/projects/{project_id}/agents",
    response_model=AgentCreated,
    status_code=status.HTTP_201_CREATED,
)
@writes
async def create_project_agent(
    project_id: str,
    agent_in: AgentCreate,
    current_user: CurrentUser,
    _app_session: NotAppSession,
):
    """Create a project-scoped agent. The API key is only shown once."""
    # Verify project exists and user has access
    # Visible (else 404, as if missing), then membership (403) (CHT-1785).
    project = await visible_project(current_user, project_id)

    # The caller can see the project, so the refusal names the action
    # (CHT-1842).
    # Only humans can create agents
    if current_user.is_agent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Agents cannot create other agents",
        )

    # Check if user is a member of the project's team
    team_service = TeamService()
    member = await team_service.get_member(project.team_id, current_user.id)
    if not member:
        raise team_hidden()

    await _refuse_member_name(project.team_id, agent_in.name)
    agent_service = AgentService()
    agent, api_key, api_key_id = await agent_service.create(
        agent_in=agent_in,
        parent_user=current_user,
        team_id=project.team_id,
        project_id=project_id,  # Project-scoped
    )

    return AgentCreated(
        id=agent.id,
        name=agent.name,
        avatar_url=agent.avatar_url,
        agent_team_id=agent.agent_team_id,
        agent_project_id=agent.agent_project_id,
        api_key=api_key,
        api_key_id=api_key_id,
        created_at=agent.created_at,
        kind=agent.kind,
        can_register=agent.can_register,
    )


@router.get("/teams/{team_id}/agents", response_model=list[AgentResponse])
@reads
async def list_team_agents(
    team_id: str,
    current_user: CurrentUser,
    hide_idle: Annotated[bool, Query(
        description="Leave out idle session identities (keys unused for 7 days).",
    )] = False,
) -> list[AgentResponse]:
    """List a team's agents (includes project-scoped agents). Each session
    identity carries `last_used_at` and `idle` (CHT-1501); `hide_idle`
    leaves the idle ones out, which is what `agent list` and the web
    pickers show by default. The default stays the full list because
    clients resolve an assignee or agent *name* against it, and an idle
    identity must still resolve.
    """
    # Verify user has access to the team
    # Team directory: members and agents of the team at either scope,
    # project-scoped agents included (CHT-732, CHT-1780); anyone else gets
    # the missing team's 404 (CHT-1785).
    await visible_team(current_user, team_id)

    agent_service = AgentService()
    agents = await agent_service.list_by_team(team_id)
    last_used = await agent_service.session_last_used(agents)

    admin = await _is_team_admin(current_user, team_id)
    directory = await MentionDirectory.for_team(team_id)
    responses = [
        agent_response(
            agent, show_ref=await sees_external_ref(current_user, agent, admin=admin),
            last_used_at=last_used.get(agent.id), mention_handle=directory.handle_for(agent.id),
        )
        for agent in agents
    ]
    return [r for r in responses if not r.idle] if hide_idle else responses


@router.get("/agents/{agent_id}", response_model=AgentResponse)
@reads
async def get_agent(
    agent_id: str,
    current_user: CurrentUser,
):
    """Get an agent by ID."""
    # Team directory, as for the list above (CHT-732, CHT-1780); outside
    # it, the missing agent's 404 (CHT-1785).
    agent = await visible_agent(current_user, agent_id)

    return agent_response(
        agent, show_ref=await sees_external_ref(current_user, agent), last_used_at=await _last_used(agent),
        mention_handle=await _mention_handle(agent),
    )


def _is_self_rename(current_user: OxydeUser, agent: OxydeUser, agent_in: AgentUpdate) -> bool:
    """Is this a registered session identity changing only its own name
    (CHT-1918)? A field sent as null counts as sent: a self-rename sends
    `name` and nothing else."""
    return (
        current_user.id == agent.id
        and (agent.kind == AgentKind.SESSION or agent.registered_by_id is not None)
        and agent_in.name is not None
        and agent_in.model_fields_set == {"name"}
    )


async def _refuse_agent_name(agent: OxydeUser, name: str) -> None:
    """A self-rename may not take another active agent's name or strong
    @handle in the team (CHT-1918): an ambiguous handle reaches nobody, so
    `@claude-mcp` would stop reaching Claude MCP, and the session could
    pass for it. A manager's rename is not held to this, as before."""
    from app.services.mention_handles import agent_name_handles

    wanted, claims = normalize_name(name), agent_name_handles(name)
    others = await OxydeUser.objects.filter(
        agent_team_id=agent.agent_team_id, is_agent=True, is_active=True,
    ).all()
    if any(
        other.id != agent.id
        and (normalize_name(other.name) == wanted or not claims.isdisjoint(agent_name_handles(other.name)))
        for other in others
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "error_code": "name_matches_agent",
                "message": f"{name!r} is the name or @handle of another agent in this team; choose another.",
            },
        )


@router.patch("/agents/{agent_id}", response_model=AgentResponse)
@writes
async def update_agent(
    agent_id: str,
    agent_in: AgentUpdate,
    current_user: CurrentUser,
    principal: CurrentPrincipal,
):
    """Update an agent's name or avatar, or make it a registrar
    (`can_register`, CHT-1498). Allowed to its creator while in the
    agent's team and to that team's admins. A built-in app's session may
    rename, but not change `can_register` (CHT-1602): a registrar mints
    keys, a capability that would outlive the session.

    A registered session identity may also rename itself, and change
    nothing else (CHT-1918): a cloud session has no person at hand to
    name it, and the name is all it may choose. It still may not rename
    any other agent."""
    if agent_in.can_register is not None:
        check_not_app_session(principal)
    agent_service = AgentService()
    # Visible (else 404, as if missing), then manageable (403) (CHT-1785).
    agent = await visible_agent(current_user, agent_id)

    self_rename = _is_self_rename(current_user, agent, agent_in)
    if not (self_rename or await can_manage_agent(current_user, agent)):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this agent",
        )

    if agent_in.can_register is not None and (
        agent.registered_by_id is not None or agent.kind == AgentKind.SESSION
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "error_code": "registered_identity_cannot_register",
                "message": "A registered identity cannot be made a registrar: registration is one level deep.",
            },
        )

    if self_rename:
        agent_in.name = agent_in.name.strip()
        if not normalize_name(agent_in.name):
            raise HTTPException(
                status_code=422,
                detail={"error_code": "name_blank", "message": "A name must not be blank."},
            )
    if agent_in.name is not None and agent_in.name != agent.name:
        await _refuse_member_name(agent.agent_team_id, agent_in.name)
        if self_rename:
            await _refuse_agent_name(agent, agent_in.name)

    agent = await agent_service.update(agent, agent_in)

    return agent_response(
        agent, show_ref=await sees_external_ref(current_user, agent), last_used_at=await _last_used(agent),
    )


@router.post(
    "/agents/{agent_id}/keys",
    response_model=APIKeyCreated,
    status_code=status.HTTP_201_CREATED,
)
@writes
async def create_agent_key(
    agent_id: str,
    current_user: CurrentUser,
    _app_session: NotAppSession,
):
    """Mint a new API key for an existing agent. The key is only shown once."""
    agent_service = AgentService()
    # Visible (else 404, as if missing), then manageable (403) (CHT-1785).
    agent = await visible_agent(current_user, agent_id)

    if not await can_manage_agent(current_user, agent):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to mint a key for this agent",
        )

    try:
        full_key, api_key_id = await agent_service.create_key(agent_id, current_user)
    except AgentManageDeniedError as refused:
        # Lost the right between the check above and the mint (CHT-1508).
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(refused)) from refused
    except AgentInactiveError as refused:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(refused)) from refused
    except ValueError as gone:
        # Deleted between the lookup above and the mint.
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Agent not found") from gone

    api_key_service = APIKeyService()
    api_key = await api_key_service.get_by_id(api_key_id)

    return APIKeyCreated(
        id=api_key.id,
        name=api_key.name,
        key=full_key,
        key_prefix=api_key.key_prefix,
        created_at=api_key.created_at,
        expires_at=api_key.expires_at,
    )


@router.get("/agents/{agent_id}/keys", response_model=list[AgentKeyResponse])
@reads
async def list_agent_keys(
    agent_id: str,
    current_user: CurrentUser,
) -> list[AgentKeyResponse]:
    """Every API key that authenticates as the agent, active or revoked,
    newest first: the ones people minted for it and the ones it minted
    for itself (CHT-1508). Same authorization as minting one. Revoke one
    with DELETE /api-keys/{id}."""
    agent_service = AgentService()
    # Visible (else 404, as if missing), then manageable (403) (CHT-1785).
    agent = await visible_agent(current_user, agent_id)

    if not await can_manage_agent(current_user, agent):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to list this agent's keys",
        )

    keys = await agent_service.list_keys(agent.id)
    user_service = UserService()
    names: dict[str | None, str | None] = {None: None}
    for key in keys:
        if key.holder_user_id not in names:
            holder = await user_service.get_by_id(key.holder_user_id)
            names[key.holder_user_id] = holder.name if holder else None

    return [
        AgentKeyResponse(
            id=key.id,
            name=key.name,
            key_prefix=key.key_prefix,
            created_at=key.created_at,
            last_used_at=key.last_used_at,
            expires_at=key.expires_at,
            is_active=key.is_active,
            owner_id=key.holder_user_id,
            owner_name=names[key.holder_user_id],
            legacy_self_minted=False,
        )
        for key in keys
    ]


@router.post("/agents/{agent_id}/deactivate", response_model=AgentResponse)
@writes
async def deactivate_agent(
    agent_id: str,
    current_user: CurrentUser,
) -> AgentResponse:
    """Retire an agent: revoke all its API keys and block it from signing
    in, keeping its authored work attributed (CHT-1494). Allowed to the
    agent's parent user while still a member of the agent's team, and to
    admins of that team (``can_manage_agent``, CHT-1508) -- the same
    people who may delete it, so an admin can retire an agent whose
    delete is refused for having authored work."""
    return await _set_agent_active(agent_id, current_user, active=False)


@router.post("/agents/{agent_id}/reactivate", response_model=AgentResponse)
@writes
async def reactivate_agent(
    agent_id: str,
    current_user: CurrentUser,
    _app_session: NotAppSession,
) -> AgentResponse:
    """Undo a deactivation (CHT-1494). Its revoked keys stay revoked:
    mint a new one with POST /agents/{agent_id}/keys. Same authorization
    as deactivate."""
    return await _set_agent_active(agent_id, current_user, active=True)


async def _set_agent_active(agent_id: str, current_user, *, active: bool) -> AgentResponse:
    action = "reactivate" if active else "deactivate"
    agent_service = AgentService()
    # Visible (else 404, as if missing), then manageable (403) (CHT-1785).
    agent = await visible_agent(current_user, agent_id)

    if not await can_manage_agent(current_user, agent):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Not authorized to {action} this agent",
        )

    retired = None
    if active:
        agent = await agent_service.reactivate(agent, current_user)
    else:
        agent, retired = await agent_service.deactivate_with_identities(agent, current_user)
    if agent is None:
        # Deleted between the lookup and the write.
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found",
        )

    response = agent_response(
        agent, show_ref=await sees_external_ref(current_user, agent), last_used_at=await _last_used(agent),
    )
    response.deactivated_identities = retired
    return response


@router.delete("/agents/{agent_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def delete_agent(
    agent_id: str,
    current_user: CurrentUser,
):
    """Delete an agent and its API keys. Refused (409) when the agent
    authored anything (CHT-1427)."""
    agent_service = AgentService()
    # Visible (else 404, as if missing), then manageable (403) (CHT-1785).
    agent = await visible_agent(current_user, agent_id)

    if not await can_manage_agent(current_user, agent):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this agent",
        )

    try:
        await agent_service.delete(agent)
    except AgentHasAuthoredContentError as refused:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(refused)) from refused


@router.post(
    "/agents/register",
    response_model=AgentRegistered,
    status_code=status.HTTP_201_CREATED,
    responses={200: {"model": AgentRegistered, "description": "An existing identity, with a fresh key"}},
)
@registers
async def register_agent(
    req: AgentRegister,
    current_user: CurrentUser,
    _app_session: NotAppSession,
    calling_key: Annotated[object | None, Depends(get_api_key_record)],
    response: Response,
) -> AgentRegistered:
    """Get or create the session identity a registrar knows by
    `external_ref`, and mint it a fresh expiring key (CHT-1498). 201 when
    created, 200 when it already existed (its other keys are revoked:
    one live key per identity). The key is shown only here.

    Callers: an agent with `can_register` (with one of its own keys), or
    a person in the team. Rules and refusals: app.services.registration_service.
    """
    try:
        reg = await RegistrationService().register(current_user, calling_key, req)
    except RegistrationRefused as refused:
        raise HTTPException(
            status_code=refused.status_code, detail=refused.detail(), headers=refused.headers,
        ) from refused
    if not reg.created:
        response.status_code = status.HTTP_200_OK
    return AgentRegistered(
        agent=agent_response(
            reg.agent, last_used_at=await _last_used(reg.agent),
            mention_handle=await _mention_handle(reg.agent),
        ),
        created=reg.created,
        api_key=reg.full_key,
        api_key_id=reg.api_key.id,
        expires_at=reg.api_key.expires_at,
    )
