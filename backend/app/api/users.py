"""User API routes."""
from fastapi import APIRouter, HTTPException, status
from app.auth.access import reads, writes
from app.api.deps import CurrentUser, NotAppSession
from app.schemas.user import UserUpdate, UserResponse
from app.services.user_service import UserDeletionRefusedError, UserService
from app.services.team_service import TeamService

router = APIRouter()


@router.get("/{user_id}", response_model=UserResponse)
@reads
async def get_user(user_id: str, current_user: CurrentUser) -> UserResponse:
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
        if not await team_service.shares_team(current_user.id, user_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to view this user",
            )

    response = UserResponse.model_validate(user)
    if user.is_agent:
        from app.api.agents import sees_external_ref

        if not await sees_external_ref(current_user, user):
            response.external_ref = None
    return response


@router.patch("/me", response_model=UserResponse)
@writes
async def update_me(user_in: UserUpdate, current_user: CurrentUser, _app_session: NotAppSession):
    """Update current user."""
    user_service = UserService()
    user = await user_service.update(current_user, user_in)
    return user


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def delete_me(current_user: CurrentUser, _app_session: NotAppSession):
    """Delete the current user and their agents. Refused (409) when the
    user or any of their agents authored anything, or a non-agent row
    names the user as its parent (CHT-1467)."""
    if current_user.is_agent:
        # An agent is deleted by its owner or a team admin, through the
        # agent route and its guard; its own API key is not enough.
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Agents cannot delete themselves; the owner deletes an agent with `chaotic agent delete`",
        )
    user_service = UserService()
    try:
        await user_service.delete(current_user)
    except UserDeletionRefusedError as refused:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(refused)) from refused
