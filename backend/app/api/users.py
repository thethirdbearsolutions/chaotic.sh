"""User API routes."""
from fastapi import APIRouter, HTTPException, status
from app.api.deps import DbSession, CurrentUser
from app.schemas.user import UserUpdate, UserResponse
from app.services.user_service import UserService

router = APIRouter()


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str, db: DbSession, current_user: CurrentUser):
    """Get user by ID."""
    user_service = UserService(db)
    user = await user_service.get_by_id(user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return user


@router.patch("/me", response_model=UserResponse)
async def update_me(user_in: UserUpdate, db: DbSession, current_user: CurrentUser):
    """Update current user."""
    user_service = UserService(db)
    user = await user_service.update(current_user, user_in)
    return user


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_me(db: DbSession, current_user: CurrentUser):
    """Delete current user."""
    user_service = UserService(db)
    await user_service.delete(current_user)
