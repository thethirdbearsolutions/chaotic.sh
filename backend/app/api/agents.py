"""Agent routes."""
from fastapi import APIRouter, HTTPException, status
from app.api.deps import DbSession, CurrentUser, check_user_team_access
from app.schemas.agent import AgentCreate, AgentUpdate, AgentResponse, AgentCreated
from app.services.agent_service import AgentService
from app.services.team_service import TeamService
from app.services.project_service import ProjectService

router = APIRouter()


@router.post(
    "/teams/{team_id}/agents",
    response_model=AgentCreated,
    status_code=status.HTTP_201_CREATED,
)
async def create_team_agent(
    team_id: str,
    agent_in: AgentCreate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Create a team-scoped agent. The API key is only shown once."""
    # Verify user has permission to create agents in this team
    team_service = TeamService(db)
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

    agent_service = AgentService(db)
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
    db: DbSession,
    current_user: CurrentUser,
):
    """Create a project-scoped agent. The API key is only shown once."""
    # Verify project exists and user has access
    project_service = ProjectService(db)
    project = await project_service.get_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    # Check if user is a member of the project's team
    team_service = TeamService(db)
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

    agent_service = AgentService(db)
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
    db: DbSession,
    current_user: CurrentUser,
):
    """List all agents for a team (includes project-scoped agents)."""
    # Verify user has access to the team
    team_service = TeamService(db)
    team = await team_service.get_by_id(team_id)
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found",
        )

    # Use check_user_team_access which handles both regular members
    # and agent users (CHT-732)
    if not await check_user_team_access(db, current_user, team_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not a member of this team",
        )

    agent_service = AgentService(db)
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
    db: DbSession,
    current_user: CurrentUser,
):
    """Get an agent by ID."""
    agent_service = AgentService(db)
    agent = await agent_service.get_by_id(agent_id)

    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found",
        )

    # Use check_user_team_access which handles both regular members
    # and agent users (CHT-732)
    if not await check_user_team_access(db, current_user, agent.agent_team_id):
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
    db: DbSession,
    current_user: CurrentUser,
):
    """Update an agent's name or avatar."""
    agent_service = AgentService(db)
    agent = await agent_service.get_by_id(agent_id)

    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found",
        )

    # Only the parent user or team admins can update agents
    team_service = TeamService(db)
    is_admin = await team_service.is_team_admin(agent.agent_team_id, current_user.id)
    is_owner = agent.parent_user_id == current_user.id

    if not (is_admin or is_owner):
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


@router.delete("/agents/{agent_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_agent(
    agent_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Delete an agent (cascades to API keys)."""
    agent_service = AgentService(db)
    agent = await agent_service.get_by_id(agent_id)

    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found",
        )

    # Only the parent user or team admins can delete agents
    team_service = TeamService(db)
    is_admin = await team_service.is_team_admin(agent.agent_team_id, current_user.id)
    is_owner = agent.parent_user_id == current_user.id

    if not (is_admin or is_owner):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this agent",
        )

    await agent_service.delete(agent)
