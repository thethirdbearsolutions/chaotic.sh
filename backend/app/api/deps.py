"""API dependencies."""
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.user import User
from app.services.user_service import UserService
from app.services.api_key_service import APIKeyService
from app.utils.security import decode_token

security = HTTPBearer(auto_error=False)


async def get_current_user(
    db: Annotated[AsyncSession, Depends(get_db)],
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
        return await _authenticate_with_api_key(db, token)

    # Otherwise treat as JWT token
    return await _authenticate_with_jwt(db, token)


async def _authenticate_with_jwt(db: AsyncSession, token: str) -> User:
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

    user_service = UserService(db)
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


async def _authenticate_with_api_key(db: AsyncSession, api_key: str) -> User:
    """Authenticate using API key.

    If the API key has an agent_user_id, return the agent User.
    Otherwise, return the human user who owns the key (backwards compatible).
    """
    api_key_service = APIKeyService(db)
    key_record = await api_key_service.validate_key(api_key)

    if not key_record:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_service = UserService(db)

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

    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
DbSession = Annotated[AsyncSession, Depends(get_db)]


async def check_user_team_access(db: AsyncSession, user: User, team_id: str) -> bool:
    """Check if a user has access to a team.

    For humans: must be a team member
    For agents: must be scoped to this team
    """
    if user.is_agent:
        return user.agent_team_id == team_id

    from app.services.team_service import TeamService
    team_service = TeamService(db)
    member = await team_service.get_member(team_id, user.id)
    return member is not None


async def check_user_project_access(db: AsyncSession, user: User, project_id: str, team_id: str) -> bool:
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
    from app.services.team_service import TeamService
    team_service = TeamService(db)
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
        return "jwt"  # Will be rejected by get_current_user anyway
    token = credentials.credentials
    if token.startswith("ck_"):
        return "api_key"
    return "jwt"


AuthMethod = Annotated[str, Depends(get_auth_method)]
