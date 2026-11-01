"""User API routes."""
from fastapi import APIRouter, HTTPException, status
from app.auth.access import reads, writes
from app.api.deps import CurrentUser, NotAppSession
from app.enums import AgentKind
from app.schemas.user import UserLookupResponse, UserUpdate, UserResponse
from app.services.user_service import SoleOwnerDeletionRefused, UserDeletionRefusedError, UserService
from app.api.visibility import visible_user

router = APIRouter()


@router.get("/{user_id}", response_model=UserLookupResponse)
@reads
async def get_user(user_id: str, current_user: CurrentUser) -> UserLookupResponse:
    """Get user by ID."""
    # Yourself, or someone a team directory you are in lists (CHT-1841);
    # anyone else answers like a missing user (CHT-1785).
    user = await visible_user(current_user, user_id)

    response = UserLookupResponse.model_validate(user)
    response.parent_user_name, response.registered_by_name = await UserService().related_names(user)
    if user.is_agent:
        from app.api.agents import sees_external_ref

        if not await sees_external_ref(current_user, user):
            response.external_ref = None
            # A session identity's address was made from its external_ref
            # until CHT-1864 (migration 0039 rewrote those), so it still
            # hides with it, as in the activity feeds (shown_emails). Any
            # other agent's address (agent-<uuid>@agent.local) carries nothing.
            if user.kind == AgentKind.SESSION:
                response.email = None
    return response


@router.patch("/me", response_model=UserResponse)
@writes
async def update_me(user_in: UserUpdate, current_user: CurrentUser, _app_session: NotAppSession):
    """Update your own name, avatar and profile (bio, pronouns, tagline;
    CHT-1979). Every member may, people and agents alike. An agent's own
    name is held to the same rules as on PATCH /agents/{own id}: not
    blank, not a person's or another agent's name in its team."""
    if current_user.is_agent and user_in.name is not None:
        from app.api.agents import check_own_agent_name

        user_in.name = await check_own_agent_name(current_user, user_in.name)
    user_service = UserService()
    user = await user_service.update(current_user, user_in)
    return user


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def delete_me(current_user: CurrentUser, _app_session: NotAppSession):
    """Delete the current user and their agents. Refused (409) when the
    user or any of their agents authored anything, or a non-agent row
    names the user as its parent (CHT-1467), or the user is a team's only
    owner (CHT-1865): transfer ownership or delete the team first."""
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
    except (UserDeletionRefusedError, SoleOwnerDeletionRefused) as refused:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(refused)) from refused
