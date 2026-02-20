"""Agent service for managing agent users.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
import uuid
from oxyde import atomic
from app.oxyde_models.user import OxydeUser
from app.oxyde_models.api_key import OxydeAPIKey
from app.schemas.agent import AgentCreate, AgentUpdate
from app.services.api_key_service import APIKeyService
from app.schemas.api_key import APIKeyCreate


class AgentService:
    """Service for agent operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        pass

    async def create(
        self,
        agent_in: AgentCreate,
        parent_user: OxydeUser,
        team_id: str,
        project_id: str | None = None,
    ) -> tuple[OxydeUser, str, str]:
        """Create a new agent with an API key.

        Returns:
            Tuple of (agent User, full API key, API key ID)
        """
        # Generate a unique email for the agent
        agent_email = f"agent-{uuid.uuid4()}@agent.local"

        async with atomic():
            # Create the agent user
            agent = await OxydeUser.objects.create(
                email=agent_email,
                hashed_password="",  # Agents don't log in via password
                name=agent_in.name,
                avatar_url=agent_in.avatar_url,
                is_agent=True,
                parent_user_id=parent_user.id,
                agent_team_id=team_id,
                agent_project_id=project_id,
            )

            # Create an API key for the agent
            api_key_service = APIKeyService()
            api_key_create = APIKeyCreate(name=f"Default key for {agent_in.name}")
            api_key, full_key = await api_key_service.create(
                parent_user.id,  # Owner is the parent human user
                api_key_create,
            )

            # Link the API key to the agent
            api_key.agent_user_id = agent.id
            await api_key.save(update_fields={"agent_user_id"})

        await agent.refresh()
        await api_key.refresh()

        return agent, full_key, api_key.id

    async def get_by_id(self, agent_id: str) -> OxydeUser | None:
        """Get agent by ID."""
        return await OxydeUser.objects.join("parent_user").filter(
            id=agent_id, is_agent=True
        ).first()

    async def list_by_team(self, team_id: str) -> list[OxydeUser]:
        """List all agents for a team (includes project-scoped agents)."""
        return await OxydeUser.objects.join("parent_user").filter(
            is_agent=True, agent_team_id=team_id
        ).order_by("-created_at").all()

    async def list_by_project(self, project_id: str) -> list[OxydeUser]:
        """List agents scoped to a specific project."""
        return await OxydeUser.objects.join("parent_user").filter(
            is_agent=True, agent_project_id=project_id
        ).order_by("-created_at").all()

    async def list_by_parent(self, parent_user_id: str) -> list[OxydeUser]:
        """List all agents created by a specific user."""
        return await OxydeUser.objects.filter(
            is_agent=True, parent_user_id=parent_user_id
        ).order_by("-created_at").all()

    async def update(self, agent: OxydeUser, agent_in: AgentUpdate) -> OxydeUser:
        """Update an agent."""
        update_data = agent_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(agent, field, value)
        await agent.save(update_fields=set(update_data.keys()))
        # Re-query with join to load parent_user for response
        return await OxydeUser.objects.join("parent_user").filter(id=agent.id).first()

    async def delete(self, agent: OxydeUser) -> None:
        """Delete an agent and its API keys."""
        async with atomic():
            await OxydeAPIKey.objects.filter(agent_user_id=agent.id).delete()
            await OxydeAPIKey.objects.filter(user_id=agent.id).delete()
            await agent.delete()

    async def get_agent_api_keys(self, agent_id: str) -> list[OxydeAPIKey]:
        """Get all API keys for an agent."""
        return await OxydeAPIKey.objects.filter(
            agent_user_id=agent_id
        ).order_by("-created_at").all()
