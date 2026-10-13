"""Agent routes."""
from fastapi import APIRouter, HTTPException, status
from app.api.deps import CurrentUser, can_manage_agent, check_user_team_access
from app.schemas.agent import AgentCreate, AgentUpdate, AgentResponse, AgentCreated
from app.schemas.api_key import AgentKeyResponse, APIKeyCreated
from app.services.agent_service import (
    AgentHasAuthoredContentError, AgentInactiveError, AgentManageDeniedError, AgentService,
)
from app.services.api_key_service import APIKeyService
from app.services.team_service import TeamService
from app.services.project_service import ProjectService
from app.services.user_service import UserService

router = APIRouter()


@router.post(
    "/teams/{team_id}/agents",
    response_model=AgentCreated,
    status_code=status.HTTP_201_CREATED,
)
async def create_team_agent(
    team_id: str,
    agent_in: AgentCreate,
    current_user: CurrentUser,
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
    )


@router.post(
    "/projects/{project_id}/agents",
    response_model=AgentCreated,
    status_code=status.HTTP_201_CREATED,
)
async def create_project_agent(
    project_id: str,
    agent_in: AgentCreate,
    current_user: CurrentUser,
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
    )


@router.get("/teams/{team_id}/agents", response_model=list[AgentResponse])
async def list_team_agents(
    team_id: str,
    current_user: CurrentUser,
):
    """List all agents for a team (includes project-scoped agents)."""
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

    return [
        AgentResponse(
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
        )
        for agent in agents
    ]


@router.get("/agents/{agent_id}", response_model=AgentResponse)
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

    return AgentResponse(
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
    )


@router.patch("/agents/{agent_id}", response_model=AgentResponse)
async def update_agent(
    agent_id: str,
    agent_in: AgentUpdate,
    current_user: CurrentUser,
):
    """Update an agent's name or avatar."""
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

    agent = await agent_service.update(agent, agent_in)

    return AgentResponse(
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
    )


@router.post(
    "/agents/{agent_id}/keys",
    response_model=APIKeyCreated,
    status_code=status.HTTP_201_CREATED,
)
async def create_agent_key(
    agent_id: str,
    current_user: CurrentUser,
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
    names: dict[str, str | None] = {}
    for key in keys:
        if key.user_id not in names:
            owner = await user_service.get_by_id(key.user_id)
            names[key.user_id] = owner.name if owner else None

    return [
        AgentKeyResponse(
            id=key.id,
            name=key.name,
            key_prefix=key.key_prefix,
            created_at=key.created_at,
            last_used_at=key.last_used_at,
            expires_at=key.expires_at,
            is_active=key.is_active,
            owner_id=key.user_id,
            owner_name=names[key.user_id],
            self_minted=key.user_id == agent.id,
        )
        for key in keys
    ]


@router.post("/agents/{agent_id}/deactivate", response_model=AgentResponse)
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
async def reactivate_agent(
    agent_id: str,
    current_user: CurrentUser,
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

    if active:
        agent = await agent_service.reactivate(agent, current_user)
    else:
        agent = await agent_service.deactivate(agent, current_user)
    if agent is None:
        # Deleted between the lookup and the write.
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found",
        )

    return AgentResponse(
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
    )


@router.delete("/agents/{agent_id}", status_code=status.HTTP_204_NO_CONTENT)
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
