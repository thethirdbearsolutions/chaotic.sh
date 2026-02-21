"""User API routes."""
from fastapi import APIRouter, HTTPException, status
from app.api.deps import CurrentUser
from app.schemas.user import UserUpdate, UserResponse
from app.services.user_service import UserService
from app.services.team_service import TeamService

router = APIRouter()


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str, current_user: CurrentUser):
    """Get user by ID."""
    user_service = UserService()
    user = await user_service.get_by_id(user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    # Users can always look up themselves
    if user.id != current_user.id:
        # Otherwise, require shared team membership
        team_service = TeamService()
        current_teams = await team_service.get_user_teams(current_user.id)
        target_teams = await team_service.get_user_teams(user_id)
        current_team_ids = {t.id for t in current_teams}
        target_team_ids = {t.id for t in target_teams}
        if not current_team_ids & target_team_ids:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to view this user",
            )

    return user


@router.patch("/me", response_model=UserResponse)
async def update_me(user_in: UserUpdate, current_user: CurrentUser):
    """Update current user."""
    user_service = UserService()
    user = await user_service.update(current_user, user_in)
    return user


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_me(current_user: CurrentUser):
    """Delete current user."""
    user_service = UserService()
    await user_service.delete(current_user)
