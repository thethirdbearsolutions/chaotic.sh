"""Agent routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from app.auth.access import reads, registers, writes
from app.api.deps import (
    CurrentPrincipal, CurrentUser, NotAppSession, can_manage_agent, check_not_app_session,
    check_user_team_access, get_api_key_record,
)
from app.enums import AgentKind
from app.schemas.agent import (
    AgentCreate, AgentRegister, AgentRegistered, AgentUpdate, AgentResponse, AgentCreated,
)
from app.enums import TeamRole
from app.services.registration_service import (
    RegistrationRefused, RegistrationService, member_named, name_matches_member_detail,
)
from app.schemas.api_key import AgentKeyResponse, APIKeyCreated
from app.services.agent_service import (
    AgentHasAuthoredContentError, AgentInactiveError, AgentManageDeniedError, AgentService, is_idle,
)
from app.services.api_key_service import APIKeyService
from app.services.team_service import TeamService
from app.services.project_service import ProjectService
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


def agent_response(agent, *, show_ref: bool = True, last_used_at=None) -> AgentResponse:
    """The wire form of an agent row (with `parent_user` joined).
    `show_ref`: see ``sees_external_ref``. `last_used_at`: from
    ``AgentService.session_last_used``, for a session identity."""
    return AgentResponse(
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
    team = await team_service.get_by_id(team_id)
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found",
        )

    # Check if user is a member of the team
    member = await team_service.get_member(team_id, current_user.id)
    if not member:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    # Only humans can create agents
    if current_user.is_agent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Agents cannot create other agents",
        )

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
    project_service = ProjectService()
    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # Check if user is a member of the project's team
    team_service = TeamService()
    member = await team_service.get_member(project.team_id, current_user.id)
    if not member:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this project's team",
        )

    # Only humans can create agents
    if current_user.is_agent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Agents cannot create other agents",
        )

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

    agent_service = AgentService()
    agents = await agent_service.list_by_team(team_id)
    last_used = await agent_service.session_last_used(agents)

    admin = await _is_team_admin(current_user, team_id)
    responses = [
        agent_response(
            agent, show_ref=await sees_external_ref(current_user, agent, admin=admin),
            last_used_at=last_used.get(agent.id),
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
    agent_service = AgentService()
    agent = await agent_service.get_by_id(agent_id)

    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found",
        )

    # Use check_user_team_access which handles both regular members
    # and agent users (CHT-732)
    if not await check_user_team_access(current_user, agent.agent_team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this agent",
        )

    last_used = await agent_service.session_last_used([agent])
    return agent_response(
        agent, show_ref=await sees_external_ref(current_user, agent), last_used_at=last_used.get(agent.id),
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
    keys, a capability that would outlive the session."""
    if agent_in.can_register is not None:
        check_not_app_session(principal)
    agent_service = AgentService()
    agent = await agent_service.get_by_id(agent_id)

    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found",
        )

    if not await can_manage_agent(current_user, agent):
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

    if agent_in.name is not None and agent_in.name != agent.name:
        await _refuse_member_name(agent.agent_team_id, agent_in.name)

    agent = await agent_service.update(agent, agent_in)

    return agent_response(agent, show_ref=await sees_external_ref(current_user, agent))


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
    agent = await agent_service.get_by_id(agent_id)

    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found",
        )

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
    agent = await agent_service.get_by_id(agent_id)

    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found",
        )

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
    agent = await agent_service.get_by_id(agent_id)

    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found",
        )

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

    response = agent_response(agent, show_ref=await sees_external_ref(current_user, agent))
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
    agent = await agent_service.get_by_id(agent_id)

    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found",
        )

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
        agent=agent_response(reg.agent),
        created=reg.created,
        api_key=reg.full_key,
        api_key_id=reg.api_key.id,
        expires_at=reg.api_key.expires_at,
    )
