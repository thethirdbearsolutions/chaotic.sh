"""Agent service for managing agent users.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
import uuid
from oxyde import atomic
from app.oxyde_models.user import OxydeUser
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.document import (
    OxydeDocument, OxydeDocumentActivity, OxydeDocumentComment, OxydeDocumentRevision,
)
from app.oxyde_models.issue import (
    OxydeBudgetTransaction, OxydeIssue, OxydeIssueActivity, OxydeIssueComment,
    OxydeIssueDescriptionRevision, OxydeTicketLimbo,
)
from app.oxyde_models.ritual import OxydeRitualAttestation
from app.schemas.agent import AgentCreate, AgentUpdate
from app.services.api_key_service import APIKeyService
from app.schemas.api_key import APIKeyCreate


class AgentHasAuthoredContentError(Exception):
    """Refused: the agent wrote things, and deleting it would erase who
    wrote them (CHT-1427). `counts` maps a kind of record to how many."""

    def __init__(self, agent_name: str, counts: dict[str, int]):
        self.counts = counts
        listed = ", ".join(f"{n} {kind}" for kind, n in counts.items() if n)
        super().__init__(
            f"Agent '{agent_name}' cannot be deleted: it authored {listed}. Deleting it "
            "would leave that work without an author. Deactivate it instead "
            "(`chaotic agent deactivate`): that revokes its API keys and blocks it from "
            "signing in, and keeps its work attributed to it."
        )


class AgentInactiveError(Exception):
    """Refused: the agent is deactivated, so a key minted for it could
    never authenticate (CHT-1494)."""


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

    async def authored_counts(self, agent_id: str) -> dict[str, int]:
        """How many records attribute something to this agent: every
        column that would lose the attribution (or, for ritual gate
        requests, the row) if the agent were deleted."""
        return {
            "issues": await OxydeIssue.objects.filter(creator_id=agent_id).count(),
            "issue comments": await OxydeIssueComment.objects.filter(author_id=agent_id).count(),
            "issue activity entries": await OxydeIssueActivity.objects.filter(user_id=agent_id).count(),
            "documents": await OxydeDocument.objects.filter(author_id=agent_id).count(),
            "document comments": await OxydeDocumentComment.objects.filter(author_id=agent_id).count(),
            "document activity entries": await OxydeDocumentActivity.objects.filter(user_id=agent_id).count(),
            "ritual gate requests": await OxydeTicketLimbo.objects.filter(requested_by_id=agent_id).count(),
            # SET NULL already, but each still loses its attribution.
            "ritual attestations": await OxydeRitualAttestation.objects.filter(attested_by=agent_id).count(),
            "ritual approvals": await OxydeRitualAttestation.objects.filter(approved_by=agent_id).count(),
            "budget transactions": await OxydeBudgetTransaction.objects.filter(user_id=agent_id).count(),
            "issue description revisions": await OxydeIssueDescriptionRevision.objects.filter(author_id=agent_id).count(),
            "document revisions": await OxydeDocumentRevision.objects.filter(author_id=agent_id).count(),
        }

    async def delete(self, agent: OxydeUser) -> None:
        """Delete an agent and its API keys -- only if it authored nothing.

        An agent that wrote anything is refused with
        AgentHasAuthoredContentError (CHT-1427): its rows would survive
        (authorship is ON DELETE SET NULL) but lose their author, and
        ticket_limbo.requested_by_id still cascades.
        """
        async with atomic():
            counts = await self.authored_counts(agent.id)
            if any(counts.values()):
                raise AgentHasAuthoredContentError(agent.name, counts)
            await OxydeAPIKey.objects.filter(agent_user_id=agent.id).delete()
            await OxydeAPIKey.objects.filter(user_id=agent.id).delete()
            await agent.delete()

    async def deactivate(self, agent: OxydeUser) -> OxydeUser:
        """Retire an agent without erasing who wrote what (CHT-1494).

        Revokes every API key that authenticates as the agent and sets
        is_active=false, which the auth dependency already refuses. The
        agent row stays, so its authored work keeps its author.
        Idempotent: deactivating an inactive agent revokes any key that
        is somehow still active and changes nothing else.
        """
        async with atomic():
            await OxydeAPIKey.objects.filter(agent_user_id=agent.id).update(is_active=False)
            await OxydeAPIKey.objects.filter(user_id=agent.id).update(is_active=False)
            if agent.is_active:
                agent.is_active = False
                await agent.save(update_fields={"is_active"})
        return await OxydeUser.objects.join("parent_user").filter(id=agent.id).first()

    async def get_agent_api_keys(self, agent_id: str) -> list[OxydeAPIKey]:
        """Get all API keys for an agent."""
        return await OxydeAPIKey.objects.filter(
            agent_user_id=agent_id
        ).order_by("-created_at").all()

    async def create_key(self, agent_id: str, requester_user: OxydeUser) -> tuple[str, str]:
        """Mint a new API key for an existing agent.

        Returns:
            Tuple of (full API key, API key ID)
        """
        agent = await self.get_by_id(agent_id)
        if not agent:
            raise ValueError("Agent not found")
        if not agent.is_active:
            raise AgentInactiveError(f"Agent '{agent.name}' is deactivated; a key for it could not sign in.")

        async with atomic():
            api_key_service = APIKeyService()
            api_key_create = APIKeyCreate(name=f"Key for {agent.name}")
            api_key, full_key = await api_key_service.create(
                agent.parent_user_id,  # Owner is the parent human user
                api_key_create,
            )

            # Link the API key to the agent
            api_key.agent_user_id = agent.id
            await api_key.save(update_fields={"agent_user_id"})

        await api_key.refresh()

        return full_key, api_key.id
