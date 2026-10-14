"""API Key routes."""
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from app.db.transactions import atomic
from app.auth.access import reads, writes
from app.api.deps import CurrentUser, can_manage_agent, get_api_key_record
from app.schemas.api_key import APIKeyCreate, APIKeyResponse, APIKeyCreated
from app.services.agent_service import AgentService
from app.services.api_key_service import APIKeyService
from app.services.team_service import TeamService

router = APIRouter()


@router.post("", response_model=APIKeyCreated, status_code=status.HTTP_201_CREATED)
@writes
async def create_api_key(
    api_key_in: APIKeyCreate,
    current_user: CurrentUser,
    calling_key: Annotated[object | None, Depends(get_api_key_record)],
):
    """Create a new API key. The full key is only shown once.

    An agent minting a key for itself gets one linked to it whose holder
    is the human behind the key it called with (CHT-1508): whoever holds
    the calling key holds the new one too, so leaving the team ends both.
    The holder's
    membership is re-checked in the same transaction as the insert, so a
    removal that commits first cannot leave behind a key its sweep
    missed. An agent with no calling key on record is refused rather than
    given a key nobody holds.
    """
    api_key_service = APIKeyService()
    if not current_user.is_agent:
        api_key, full_key = await api_key_service.create(
            current_user.id, api_key_in, holder_user_id=current_user.id,
        )
    else:
        if current_user.registered_by_id is not None:
            # A registered identity's keys come from its registrar: 7-day,
            # rotated on re-register, one live at a time (CHT-1498). A key
            # it minted itself would outlive all of that.
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail={
                    "error_code": "registered_identity_key",
                    "message": (
                        "A registered identity cannot mint its own keys; re-register through its "
                        "registrar (POST /api/agents/register) for a fresh one."
                    ),
                },
            )
        if calling_key is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="An agent can only mint a key with one of its own API keys",
            )
        holder_id = calling_key.holder_user_id
        async with atomic():
            if not holder_id or await TeamService().get_member(
                current_user.agent_team_id, holder_id,
            ) is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid API key",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            api_key, full_key = await api_key_service.create(
                current_user.id, api_key_in, holder_user_id=holder_id,
            )

    return APIKeyCreated(
        id=api_key.id,
        name=api_key.name,
        key=full_key,
        key_prefix=api_key.key_prefix,
        created_at=api_key.created_at,
        expires_at=api_key.expires_at,
    )


@router.get("", response_model=list[APIKeyResponse])
@reads
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
        api_keys = await APIKeyService().list_by_holder(current_user.id)
    return api_keys[skip:skip + limit]


@router.delete("/{api_key_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
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

    # Whoever holds a key may revoke it, and so may whoever it signs in
    # as. Beyond that, a key that signs in as an agent may be revoked by
    # whoever may manage the agent: its team's admins, and its creator
    # while still in the team (CHT-1508).
    allowed = current_user.id in (api_key.holder_user_id, api_key.principal_user_id)
    if not allowed:
        agent_service = AgentService()
        agent = await agent_service.get_by_id(api_key.principal_user_id)
        allowed = agent is not None and await can_manage_agent(current_user, agent)
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to revoke this API key",
        )

    await api_key_service.revoke(api_key, actor_id=current_user.id)
