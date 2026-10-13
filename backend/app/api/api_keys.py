"""API Key routes."""
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from app.api.deps import CurrentUser, can_manage_agent, get_api_key_record
from app.schemas.api_key import APIKeyCreate, APIKeyResponse, APIKeyCreated
from app.services.agent_service import AgentService
from app.services.api_key_service import APIKeyService

router = APIRouter()


@router.post("", response_model=APIKeyCreated, status_code=status.HTTP_201_CREATED)
async def create_api_key(
    api_key_in: APIKeyCreate,
    current_user: CurrentUser,
    calling_key: Annotated[object | None, Depends(get_api_key_record)],
):
    """Create a new API key. The full key is only shown once.

    An agent minting a key for itself gets one linked to it whose holder
    is the human behind the key it called with (CHT-1508): whoever holds
    the calling key holds the new one too, so leaving the team ends both.
    With no human on record (a key from before holders were recorded),
    the key falls back to the agent's creator at sign-in.
    """
    api_key_service = APIKeyService()
    if current_user.is_agent:
        holder_id = current_user.id
        if calling_key is not None and calling_key.user_id != current_user.id:
            holder_id = calling_key.user_id
        api_key, full_key = await api_key_service.create(
            holder_id, api_key_in, agent_user_id=current_user.id,
        )
    else:
        api_key, full_key = await api_key_service.create(current_user.id, api_key_in)

    return APIKeyCreated(
        id=api_key.id,
        name=api_key.name,
        key=full_key,
        key_prefix=api_key.key_prefix,
        created_at=api_key.created_at,
        expires_at=api_key.expires_at,
    )


@router.get("", response_model=list[APIKeyResponse])
async def list_api_keys(
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 1000,
):
    """List all API keys for the current user: the ones they hold. For an
    agent, every key that signs in as it (CHT-1508)."""
    if current_user.is_agent:
        api_keys = await AgentService().list_keys(current_user.id)
    else:
        api_keys = await APIKeyService().list_by_user(current_user.id)
    return api_keys[skip:skip + limit]


@router.delete("/{api_key_id}", status_code=status.HTTP_204_NO_CONTENT)
async def revoke_api_key(
    api_key_id: str,
    current_user: CurrentUser,
):
    """Revoke an API key."""
    api_key_service = APIKeyService()
    api_key = await api_key_service.get_by_id(api_key_id)

    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="API key not found",
        )

    # Whoever holds a key may revoke it. Beyond that, a key that
    # authenticates as an agent -- linked to it, or a legacy one the agent
    # minted for itself -- may be revoked by whoever may manage the agent: its
    # team's admins, and its creator while still in the team (CHT-1508).
    allowed = api_key.user_id == current_user.id or (
        # An agent may revoke any key that signs in as itself.
        current_user.is_agent and api_key.agent_user_id == current_user.id
    )
    if not allowed:
        agent_service = AgentService()
        agent = await agent_service.get_by_id(api_key.agent_user_id or api_key.user_id)
        allowed = agent is not None and await can_manage_agent(current_user, agent)
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to revoke this API key",
        )

    await api_key_service.revoke(api_key)
