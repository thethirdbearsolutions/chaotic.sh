"""API dependencies."""
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.oxyde_models.user import OxydeUser as User
from app.services.user_service import UserService
from app.services.api_key_service import APIKeyService
from app.services.team_service import TeamService
from app.utils.security import decode_token

security = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
) -> User:
    """Get current authenticated user via JWT token or API key."""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials

    # Check if this is an API key (starts with ck_)
    if token.startswith("ck_"):
        return await _authenticate_with_api_key(token)

    # Otherwise treat as JWT token
    return await _authenticate_with_jwt(token)


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
    """Authenticate using API key.

    If the API key has an agent_user_id, return the agent User.
    Otherwise, return the human user who owns the key (backwards compatible).
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

    # An agent key is only as good as the membership of the human behind
    # it (CHT-1508/CHT-1510). The key row's user_id records that holder:
    # whoever minted a linked key, or the holder of the key an agent used
    # to mint one for itself. A self-minted key from before holders were
    # recorded (user_id is the agent) falls back to the agent's creator.
    # Once that human is no longer in the agent's team the key is dead,
    # whether or not the removal got to revoke it, and it is answered
    # exactly like a revoked key. REST and both MCP transports come
    # through here.
    if user.is_agent:
        holder_id = key_record.user_id if key_record.user_id != user.id else user.parent_user_id
        if not holder_id or await TeamService().get_member(user.agent_team_id, holder_id) is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid API key",
                headers={"WWW-Authenticate": "Bearer"},
            )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is inactive",
        )

    return user


async def get_api_key_record(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
):
    """The key row behind this request's `ck_...` bearer token, or None
    for a JWT. Only meaningful alongside CurrentUser, which has already
    validated the token."""
    if not credentials or not credentials.credentials.startswith("ck_"):
        return None
    service = APIKeyService()
    return await service.get_by_prefix(service._get_prefix(credentials.credentials))


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


async def can_manage_agent(user: User, agent: User) -> bool:
    """May `user` manage `agent`? See ``AgentService.can_manage``: team
    admins, and the agent's creator while still in the agent's team
    (CHT-1508)."""
    from app.services.agent_service import AgentService

    return await AgentService().can_manage(user, agent)


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


async def get_auth_method(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
) -> str:
    """Get the authentication method used (jwt or api_key).

    This is used to distinguish human requests (JWT from web UI login) from
    agent requests (API keys from CLI). The assumption is:
    - JWT tokens are obtained via web UI login → human user
    - API keys (ck_*) are used by CLI/programmatic access → agent

    This detection runs as a separate dependency alongside get_current_user.
    If token validation fails in get_current_user, the request will be rejected
    before this auth method value is used.
    """
    if not credentials:
        return "unknown"

    token = credentials.credentials

    if token.startswith("ck_"):
        return "api_key"
    return "jwt"


AuthMethod = Annotated[str, Depends(get_auth_method)]
