"""API dependencies."""
from typing import Annotated
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.oxyde_models.user import OxydeUser as User
from app.auth.access import authorize
from app.config import get_settings
from app.auth.credentials import CredentialError, CredentialKind, Principal, classify, rest_resolver
from app.services.api_key_service import APIKeyService
from app.services.team_service import TeamService
from app.utils.security import is_web_login

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
    # For a route that needs more than the user: which credential this
    # request came with (CurrentPrincipal).
    request.state.principal = principal
    return principal.user


def _http_error(exc: CredentialError) -> HTTPException:
    """REST's answer to a credential that did not resolve: the resolver's
    detail, with a Bearer challenge on a 401. With ``OAUTH_ENABLED`` on, a
    failed OAuth access token gets RFC 6750's ``error="invalid_token"``
    (refresh or re-authorize, CHT-1576); every other failure, and every
    failure with the flag off, keeps the bare challenge it always had."""
    if exc.status_code == status.HTTP_401_UNAUTHORIZED:
        invalid_token = exc.kind is CredentialKind.OAUTH_ACCESS and get_settings().oauth_enabled
        challenge = 'Bearer error="invalid_token"' if invalid_token else "Bearer"
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


async def get_current_principal(request: Request, user: CurrentUser) -> Principal:
    """The resolved credential behind CurrentUser: the session or key
    the request came with, as well as its user. Resolved once, by
    get_current_user, which this depends on."""
    return request.state.principal


CurrentPrincipal = Annotated[Principal, Depends(get_current_principal)]


def is_project_scoped_agent(user: User) -> bool:
    """An agent confined to one project (``agent_project_id`` set). Such
    an agent also carries ``agent_team_id`` (its project's team), which
    is *not* a grant of team-wide access (CHT-1780)."""
    return bool(user.is_agent and user.agent_project_id)


def confined_project_id(user: User) -> str | None:
    """The one project a project-scoped agent may see, else None. For
    team-wide queries that must narrow to it rather than refuse: the
    relations of an issue, cross-reference targets (CHT-1780)."""
    return user.agent_project_id if is_project_scoped_agent(user) else None


async def check_user_team_access(user: User, team_id: str) -> bool:
    """May ``user`` read and write ``team_id``'s team-wide data: every
    project's issues, the team activity and comment feeds, team-level
    (project-less) documents, templates?

    For humans: must be a team member.
    For agents: must be *team*-scoped to this team. A project-scoped
    agent is refused even for its own team (CHT-1780): it reaches its
    project through ``check_user_project_access``, and the few team
    reads it needs (the team row, its members and agents, labels) go
    through ``check_user_in_team``.
    """
    if user.is_agent:
        if user.agent_project_id:
            return False
        return user.agent_team_id == team_id

    team_service = TeamService()
    member = await team_service.get_member(team_id, user.id)
    return member is not None


async def agent_home_team_id(user: User) -> str | None:
    """The team an agent belongs to: ``agent_team_id``, or for a
    project-scoped agent created without one, its project's team."""
    if user.agent_team_id:
        return user.agent_team_id
    if user.agent_project_id:
        from app.services.project_service import ProjectService

        project = await ProjectService().get_by_id(user.agent_project_id)
        return project.team_id if project else None
    return None


async def can_access_document(user: User, document) -> bool:
    """The read rule for one document: project access for a project's
    document, team access for a team-level one. ``GET /documents/{id}``
    applies it, and so must every route that returns documents some other
    way, such as the documents linked to an issue (CHT-1780)."""
    if document.project_id:
        from app.services.project_service import ProjectService

        project = await ProjectService().get_by_id(document.project_id)
        return project is not None and await check_user_project_access(user, project)
    return await check_user_team_access(user, document.team_id)


async def accessible_project_ids(user: User, project_ids) -> set[str]:
    """Of ``project_ids``, those ``user`` may read: one access check per
    distinct project, for filtering a mixed list of issues (CHT-1780)."""
    from app.services.project_service import ProjectService

    allowed = set()
    for project_id in set(project_ids):
        project = await ProjectService().get_by_id(project_id)
        if project and await check_user_project_access(user, project):
            allowed.add(project_id)
    return allowed


async def check_user_in_team(user: User, team_id: str) -> bool:
    """Is ``user`` part of ``team_id`` at all -- a member, or an agent of
    that team at either scope? This is the bar for the team's *directory*,
    which a project-scoped agent needs for ordinary work in its project:
    the team row, its members and agents (to resolve an assignee or a
    mention), and its labels (to label its issues). Never use it for
    team-wide *data*; that is ``check_user_team_access`` (CHT-1780).
    """
    if not team_id:
        return False
    if user.is_agent:
        return await agent_home_team_id(user) == team_id
    return await check_user_team_access(user, team_id)


async def is_eligible_project_member(user: User | None, team_id: str, project_id: str | None) -> bool:
    """May ``user`` be named on work in a project of ``team_id``: an
    issue's assignee, a project's lead? One rule for both (CHT-1830):

    * an active human member of the team;
    * an active team-scoped agent of the team;
    * an active project-scoped agent of *this* project (``project_id``),
      whether or not it was created with a team id. A project-scoped
      agent cannot open any other project, so it is never eligible for
      one, nor for a project that does not exist yet (``project_id`` None).

    A deactivated account can never sign in to do the work (CHT-1494).
    Callers answer every refusal with one "not found" that names nobody,
    so the reply never says whether an account exists elsewhere or has
    been retired (CHT-1785, CHT-1819). Re-sending the value a row
    already holds is not a new choice; callers skip this check for it.
    """
    if user is None or not user.is_active or not team_id:
        return False
    if user.is_agent:
        if user.agent_project_id:
            return user.agent_project_id == project_id and await agent_home_team_id(user) == team_id
        return user.agent_team_id == team_id
    return await TeamService().get_member(team_id, user.id) is not None


async def can_manage_agent(user: User, agent: User) -> bool:
    """May `user` manage `agent`? See ``AgentService.can_manage``: team
    admins, and the agent's creator while still in the agent's team
    (CHT-1508)."""
    from app.services.agent_service import AgentService

    return await AgentService().can_manage(user, agent)


async def check_user_project_access(user: User, project) -> bool:
    """May ``user`` read and write ``project`` (a project row)?

    For humans: must be a member of the project's team.
    For agents:
      - If project-scoped: must be scoped to this specific project
      - If team-scoped: must be scoped to this project's team

    The team is read off the row, never taken from the caller
    (CHT-1807): the old ``(user, project_id, team_id)`` form trusted a
    ``team_id`` that four routes took from the URL next to a query or
    body ``project_id``, so each had to pin the project to the team by
    hand. A route holding a ``project_id`` and a ``team_id`` loads the
    project with ``app.api.visibility.visible_project_in_team``, which
    checks and pins in one step. Anything but a project row (an id,
    None, a document row that also has ``team_id``) is refused.
    """
    from app.oxyde_models.project import OxydeProject

    if not isinstance(project, OxydeProject):
        raise TypeError(
            "check_user_project_access takes a project row (OxydeProject), not an id "
            "or another row (CHT-1807); "
            "load it with app.api.visibility.visible_project / visible_project_in_team"
        )
    if user.is_agent:
        # Project-scoped agent: must match the specific project
        if user.agent_project_id:
            return user.agent_project_id == project.id
        # Team-scoped agent: must match the project's team
        return user.agent_team_id == project.team_id

    # Human user: check membership of the project's team
    team_service = TeamService()
    member = await team_service.get_member(project.team_id, user.id)
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
WEB_LOGIN_REQUIRED = {
    "error_code": "web_login_required",
    "message": "Sign in to the Chaotic web app again to review an app's access. "
               "A login made by the command-line tool can't approve apps.",
}


async def require_human_session(
    user: CurrentUser,
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
) -> User:
    """The caller is a human using their web login (I18): not an agent,
    not an API key, not any OAuth token. Decided by the credential's
    class (``app.auth.credentials.classify``), so a token kind added later
    is refused unless it is a session JWT, and then by the web-login
    claim (``app.utils.security.is_web_login``): the CLI holds session
    JWTs too, on disk where an agent running as the human can read them,
    and those must not approve an app (threat S13)."""
    if (
        user.is_agent
        or credentials is None
        or classify(credentials.credentials) is not CredentialKind.SESSION_JWT
    ):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=dict(HUMAN_SESSION_REQUIRED))
    if not is_web_login(credentials.credentials):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=dict(WEB_LOGIN_REQUIRED))
    return user


HumanUser = Annotated[User, Depends(require_human_session)]


APP_SESSION_REFUSED = {
    "error_code": "app_session_refused",
    "message": "A signed-in app can't do this; use the Chaotic web app or the command-line tool.",
}


def check_not_app_session(principal: Principal) -> None:
    """Raise 403 ``app_session_refused`` for a built-in app's session
    (CHT-1602). For a route that refuses it only for some bodies."""
    if principal.is_app_session:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=dict(APP_SESSION_REFUSED))


async def refuse_app_session(principal: CurrentPrincipal) -> None:
    """Refuse a built-in app's session (CHT-1602) on every route that
    creates something that outlives the session or takes over the
    account: a credential (API keys, agent keys, registration), access
    for someone (invitations, accepting one, team creation, member
    roles), an agent capability (``can_register``, reactivation), or a
    change to the account itself. The app acts as the person, but a
    phone's revocable sign-in must leave nothing behind that its
    revocation does not end. Other credentials pass."""
    check_not_app_session(principal)


NotAppSession = Annotated[None, Depends(refuse_app_session)]
