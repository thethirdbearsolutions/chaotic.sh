"""API dependencies."""
from typing import Annotated
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.oxyde_models.user import OxydeUser as User
from app.auth.credentials import CredentialError, CredentialKind, classify, rest_resolver
from app.services.api_key_service import APIKeyService
from app.services.team_service import TeamService

security = HTTPBearer(auto_error=False)


# Methods a registrar may use on any route (CHT-1498).
_READ_METHODS = frozenset({"GET", "HEAD", "OPTIONS"})


def registrar_may_call(endpoint):
    """Mark a write route a registrar may call: POST /agents/register.
    Every other non-GET route refuses one (``refuse_registrar_write``)."""
    endpoint.registrar_may_call = True
    return endpoint


def is_registrar(user: User) -> bool:
    """An agent with the registrar capability (CHT-1498)."""
    return bool(user.is_agent and user.can_register)


REGISTRAR_CANNOT_WRITE = {
    "error_code": "registrar_cannot_write",
    "message": (
        "This agent is a registrar: it may register session identities (POST /api/agents/register) "
        "and read, nothing else. Write with a registered identity's key instead."
    ),
}


def refuse_registrar_write(user: User, method: str, endpoint) -> None:
    """Registrars are register-only (CHT-1498, spec I8: fail closed). If
    registration fails, nothing may quietly fall back to writing as the
    shared harness identity, which is the collapse registration exists to
    end. A registrar may read (GET/HEAD/OPTIONS) and call the routes
    marked ``registrar_may_call``; anything else is 403. The MCP backend
    applies the same rule per tool (app/mcp_server/backend.py)."""
    if not is_registrar(user) or method.upper() in _READ_METHODS:
        return
    if endpoint is not None and getattr(endpoint, "registrar_may_call", False):
        return
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=dict(REGISTRAR_CANNOT_WRITE))


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
    user = principal.user

    # The matched route's endpoint function (Starlette puts it in the
    # scope when routing). Every authenticated REST route depends on this
    # function, so this is the one place the registrar rule needs.
    refuse_registrar_write(user, request.method, request.scope.get("endpoint"))
    return user


def _http_error(exc: CredentialError) -> HTTPException:
    """REST's answer to a credential that did not resolve: the resolver's
    detail, with the bare Bearer challenge on a 401."""
    if exc.status_code == status.HTTP_401_UNAUTHORIZED:
        return HTTPException(
            status_code=exc.status_code,
            detail=exc.detail,
            headers={"WWW-Authenticate": "Bearer"},
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

    if classify(credentials.credentials) is CredentialKind.API_KEY:
        return "api_key"
    return "jwt"


AuthMethod = Annotated[str, Depends(get_auth_method)]
