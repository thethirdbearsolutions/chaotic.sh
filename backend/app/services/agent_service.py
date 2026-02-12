"""Agent service for managing agent users."""
import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.models.user import User
from app.models.api_key import APIKey
from app.schemas.agent import AgentCreate, AgentUpdate
from app.services.api_key_service import APIKeyService
from app.schemas.api_key import APIKeyCreate


class AgentService:
    """Service for agent operations."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(
        self,
        agent_in: AgentCreate,
        parent_user: User,
        team_id: str,
        project_id: str | None = None,
    ) -> tuple[User, str, str]:
        """Create a new agent with an API key.

        Args:
            agent_in: Agent creation data (name)
            parent_user: The human user creating this agent
            team_id: Team this agent is scoped to
            project_id: Optional project scope (null = team-wide access)

        Returns:
            Tuple of (agent User, full API key, API key ID)
        """
        # Generate a unique email for the agent (agents don't log in, but email is unique)
        agent_email = f"agent-{uuid.uuid4()}@agent.local"

        # Create the agent user
        agent = User(
            email=agent_email,
            hashed_password="",  # Agents don't log in via password
            name=agent_in.name,
            avatar_url=agent_in.avatar_url,
            is_agent=True,
            parent_user_id=parent_user.id,
            agent_team_id=team_id,
            agent_project_id=project_id,
        )
        self.db.add(agent)
        await self.db.flush()  # Get the agent ID

        # Create an API key for the agent
        api_key_service = APIKeyService(self.db)
        api_key_create = APIKeyCreate(name=f"Default key for {agent_in.name}")
        api_key, full_key = await api_key_service.create(
            parent_user.id,  # Owner is the parent human user
            api_key_create,
        )

        # Link the API key to the agent
        api_key.agent_user_id = agent.id
        await self.db.commit()
        await self.db.refresh(agent)
        await self.db.refresh(api_key)

        return agent, full_key, api_key.id

    async def get_by_id(self, agent_id: str) -> User | None:
        """Get agent by ID."""
        result = await self.db.execute(
            select(User)
            .options(selectinload(User.parent_user))
            .where(User.id == agent_id, User.is_agent == True)
        )
        return result.scalar_one_or_none()

    async def list_by_team(self, team_id: str) -> list[User]:
        """List all agents for a team (includes project-scoped agents)."""
        result = await self.db.execute(
            select(User)
            .options(selectinload(User.parent_user))
            .where(User.is_agent == True, User.agent_team_id == team_id)
            .order_by(User.created_at.desc())
        )
        return list(result.scalars().all())

    async def list_by_project(self, project_id: str) -> list[User]:
        """List agents scoped to a specific project."""
        result = await self.db.execute(
            select(User)
            .options(selectinload(User.parent_user))
            .where(User.is_agent == True, User.agent_project_id == project_id)
            .order_by(User.created_at.desc())
        )
        return list(result.scalars().all())

    async def list_by_parent(self, parent_user_id: str) -> list[User]:
        """List all agents created by a specific user."""
        result = await self.db.execute(
            select(User)
            .where(User.is_agent == True, User.parent_user_id == parent_user_id)
            .order_by(User.created_at.desc())
        )
        return list(result.scalars().all())

    async def update(self, agent: User, agent_in: AgentUpdate) -> User:
        """Update an agent."""
        update_data = agent_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(agent, field, value)
        await self.db.commit()
        await self.db.refresh(agent)
        return agent

    async def delete(self, agent: User) -> None:
        """Delete an agent (cascades to API keys via foreign key)."""
        await self.db.delete(agent)
        await self.db.commit()

    async def get_agent_api_keys(self, agent_id: str) -> list[APIKey]:
        """Get all API keys for an agent."""
        result = await self.db.execute(
            select(APIKey)
            .where(APIKey.agent_user_id == agent_id)
            .order_by(APIKey.created_at.desc())
        )
        return list(result.scalars().all())
