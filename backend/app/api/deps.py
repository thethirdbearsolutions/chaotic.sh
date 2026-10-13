"""API dependencies."""
from typing import Annotated
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.oxyde_models.user import OxydeUser as User
from app.auth.access import authorize
from app.auth.credentials import CredentialError, CredentialKind, classify, rest_resolver
from app.services.api_key_service import APIKeyService
from app.services.team_service import TeamService

security = HTTPBearer(auto_error=False)


async def get_current_user(
    request: Request,
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
) -> User:
    """Get current authenticated user via JWT token or API key. The
    credential itself is resolved by ``app.auth.credentials`` (CHT-1560),
    shared with /mcp; this maps its failure to REST's 401/403."""
    try:
        principal = await rest_resolver.resolve(credentials.credentials if credentials else None)
    except CredentialError as exc:
        raise _http_error(exc) from None
    # The matched route's endpoint function (Starlette puts it in the
    # scope when routing), classified @reads/@writes/@registers
    # (app.auth.access, CHT-1561). Every authenticated REST route depends
    # on this function, so this is the one place the registrar rule and
    # the scope rule (CHT-1562) need.
    authorize(principal, request.scope.get("endpoint"))
    return principal.user


def _http_error(exc: CredentialError) -> HTTPException:
    """REST's answer to a credential that did not resolve: the resolver's
    detail, with a Bearer challenge on a 401. A failed OAuth access token
    gets RFC 6750's ``error="invalid_token"`` (refresh or re-authorize,
    CHT-1520); every other failure keeps the bare challenge it always had."""
    if exc.status_code == status.HTTP_401_UNAUTHORIZED:
        challenge = 'Bearer error="invalid_token"' if exc.kind is CredentialKind.OAUTH_ACCESS else "Bearer"
        return HTTPException(
            status_code=exc.status_code,
            detail=exc.detail,
            headers={"WWW-Authenticate": challenge},
        )
    return HTTPException(status_code=exc.status_code, detail=exc.detail)


async def get_api_key_record(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
):
    """The key row behind this request's `ck_...` bearer token, or None
    for a JWT. Only meaningful alongside CurrentUser, which has already
    validated the token."""
    if not credentials or classify(credentials.credentials) is not CredentialKind.API_KEY:
        return None
    api_key, _legacy = await APIKeyService().find_by_key(credentials.credentials)
    return api_key


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
    """Get the authentication method used (jwt, api_key or oauth).

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

    kind = classify(credentials.credentials)
    if kind is CredentialKind.API_KEY:
        return "api_key"
    if kind is CredentialKind.OAUTH_ACCESS:
        return "oauth"
    return "jwt"


AuthMethod = Annotated[str, Depends(get_auth_method)]


HUMAN_SESSION_REQUIRED = {
    "error_code": "human_session_required",
    "message": "Only a person signed in to the web app can review or approve an app's access.",
}


async def require_human_session(
    user: CurrentUser,
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
) -> User:
    """The caller is a human using their web login (I18): not an agent,
    not an API key, not any OAuth token. Decided by the credential's
    class (``app.auth.credentials.classify``), so a token kind added later
    is refused unless it is a session JWT."""
    if (
        user.is_agent
        or credentials is None
        or classify(credentials.credentials) is not CredentialKind.SESSION_JWT
    ):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=dict(HUMAN_SESSION_REQUIRED))
    return user


HumanUser = Annotated[User, Depends(require_human_session)]
