"""API Key routes."""
from fastapi import APIRouter, HTTPException, status
from app.api.deps import DbSession, CurrentUser
from app.schemas.api_key import APIKeyCreate, APIKeyResponse, APIKeyCreated
from app.services.api_key_service import APIKeyService

router = APIRouter()


@router.post("", response_model=APIKeyCreated, status_code=status.HTTP_201_CREATED)
async def create_api_key(
    api_key_in: APIKeyCreate,
    db: DbSession,
    current_user: CurrentUser,
):
    """Create a new API key. The full key is only shown once."""
    api_key_service = APIKeyService(db)
    api_key, full_key = await api_key_service.create(current_user.id, api_key_in)

    return APIKeyCreated(
        id=api_key.id,
        name=api_key.name,
        key=full_key,
        key_prefix=api_key.key_prefix,
        created_at=api_key.created_at,
    )


@router.get("", response_model=list[APIKeyResponse])
async def list_api_keys(
    db: DbSession,
    current_user: CurrentUser,
):
    """List all API keys for the current user."""
    api_key_service = APIKeyService(db)
    api_keys = await api_key_service.list_by_user(current_user.id)
    return api_keys


@router.delete("/{api_key_id}", status_code=status.HTTP_204_NO_CONTENT)
async def revoke_api_key(
    api_key_id: str,
    db: DbSession,
    current_user: CurrentUser,
):
    """Revoke an API key."""
    api_key_service = APIKeyService(db)
    api_key = await api_key_service.get_by_id(api_key_id)

    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="API key not found",
        )

    if api_key.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to revoke this API key",
        )

    await api_key_service.revoke(api_key)
