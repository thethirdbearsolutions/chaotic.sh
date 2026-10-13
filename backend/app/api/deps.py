"""API dependencies."""
from typing import AsyncIterator, Annotated
from fastapi import Depends, Header, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.actor import ActorContext, actor_scope
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.user import OxydeUser as User
from app.services.user_service import UserService
from app.services.api_key_service import APIKeyService
from app.services.team_service import TeamService
from app.utils.security import decode_token

security = HTTPBearer(auto_error=False)


async def get_current_actor(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
    x_chaotic_interactive: Annotated[str | None, Header()] = None,
) -> AsyncIterator[ActorContext]:
    """Authenticate the request and make its ``ActorContext`` current
    (CHT-1432) for the rest of the request.

    A yield dependency so the ContextVar is reset by token when the request
    finishes: the test client runs the app in the test's own task, so a bare
    ``set`` would leak this request's actor into whatever runs next there.
    FastAPI caches it per request, so ``CurrentActor`` and ``CurrentUser`` in
    the same handler share one authentication.

    ``X-Chaotic-Interactive: 1`` is the client-asserted "a person is at a
    TTY / browser" signal (CHT-1302): the CLI sends it when stdin and stdout
    are both a TTY, the web app always. It feeds ``actor.is_human_request``.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials
    interactive = x_chaotic_interactive == "1"

    # Check if this is an API key (starts with ck_)
    if token.startswith("ck_"):
        user, key_record = await _resolve_api_key(token)
        actor = ActorContext(
            effective=user,
            via="api_key",
            transport="rest",
            credential_id=key_record.id,
            credential_name=key_record.name,
            interactive=interactive,
        )
    else:
        # Otherwise treat as JWT token
        user = await _authenticate_with_jwt(token)
        actor = ActorContext(effective=user, via="jwt", transport="rest", interactive=interactive)

    with actor_scope(actor):
        yield actor


CurrentActor = Annotated[ActorContext, Depends(get_current_actor)]


async def get_current_user(actor: CurrentActor) -> User:
    """Get current authenticated user via JWT token or API key: the
    acting principal of the request's ``ActorContext``."""
    return actor.effective


async def _authenticate_with_jwt(token: str) -> User:
    """Authenticate using JWT token."""
    payload = decode_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_service = UserService()
    user = await user_service.get_by_id(user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is inactive",
        )

    return user


async def _authenticate_with_api_key(api_key: str) -> User:
    """Authenticate using API key; the user only (see ``_resolve_api_key``)."""
    user, _ = await _resolve_api_key(api_key)
    return user


async def _resolve_api_key(api_key: str) -> tuple[User, OxydeAPIKey]:
    """Authenticate using API key, returning the user and the key record.

    If the API key has an agent_user_id, the user is the agent.
    Otherwise, it is the human user who owns the key (backwards compatible).
    Shared by REST and the HTTP MCP transport (app.mcp_server.auth).
    """
    api_key_service = APIKeyService()
    key_record = await api_key_service.validate_key(api_key)

    if not key_record:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_service = UserService()

    # If this key is linked to an agent, authenticate as the agent
    if key_record.agent_user_id:
        user = await user_service.get_by_id(key_record.agent_user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Agent not found",
                headers={"WWW-Authenticate": "Bearer"},
            )
    else:
        # Backwards compatible: authenticate as the human user
        user = await user_service.get_by_id(key_record.user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is inactive",
        )

    return user, key_record


CurrentUser = Annotated[User, Depends(get_current_user)]


async def check_user_team_access(user: User, team_id: str) -> bool:
    """Check if a user has access to a team.

    For humans: must be a team member
    For agents: must be scoped to this team
    """
    if user.is_agent:
        return user.agent_team_id == team_id

    team_service = TeamService()
    member = await team_service.get_member(team_id, user.id)
    return member is not None


async def check_user_project_access(user: User, project_id: str, team_id: str) -> bool:
    """Check if a user has access to a project.

    For humans: must be a member of the project's team
    For agents:
      - If project-scoped: must be scoped to this specific project
      - If team-scoped: must be scoped to this project's team
    """
    if user.is_agent:
        # Project-scoped agent: must match the specific project
        if user.agent_project_id:
            return user.agent_project_id == project_id
        # Team-scoped agent: must match the team
        return user.agent_team_id == team_id

    # Human user: check team membership
    team_service = TeamService()
    member = await team_service.get_member(team_id, user.id)
    return member is not None
