"""API dependencies."""
from typing import Annotated
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.oxyde_models.user import OxydeUser as User
from app.auth.access import Access, access_of, authorize
from app.config import get_settings
from app.auth.credentials import CredentialError, CredentialKind, Principal, classify, rest_resolver
from app.services.api_key_service import APIKeyService
from app.services.team_service import TeamService, eligible_on_project_work
from app.utils.security import is_web_login

security = HTTPBearer(auto_error=False)

# The registrar's key in a header of its own (CHT-1906), so a cloud
# environment can keep it as a network secret: its proxy sets one header
# on every request to the server, and if that header were Authorization
# it would overwrite every session key with the registrar's.
REGISTRAR_KEY_HEADER = "X-Chaotic-Registrar-Key"

REGISTRAR_HEADER_NOT_A_KEY = {
    "error_code": "registrar_header_not_a_key",
    "message": f"{REGISTRAR_KEY_HEADER} takes a registrar's API key (ck_...).",
}

REGISTRAR_HEADER_REPEATED = {
    "error_code": "registrar_header_repeated",
    "message": f"Send {REGISTRAR_KEY_HEADER} once: this request carries it more than once.",
}


def presented_credential(request: Request, credentials: HTTPAuthorizationCredentials | None) -> str | None:
    """The credential this request authenticates with.

    ``Authorization: Bearer``, except on a ``@registers`` route
    (``POST /agents/register``), where a non-empty ``X-Chaotic-Registrar-Key``
    takes precedence over it. A proxy that injects the registrar header
    adds it to every request, beside whatever session key the client put
    in Authorization; on register the registrar is the caller that
    matters (a session identity cannot register anyway), and everywhere
    else the header is ignored, never authenticating and never refused,
    so the session's own requests go through as the session."""
    if access_of(request.scope.get("endpoint")) is Access.REGISTER:
        values = [v.strip() for v in request.headers.getlist(REGISTRAR_KEY_HEADER) if v.strip()]
        if len(values) > 1 or any("," in v for v in values):
            # A proxy that appends rather than replaces: which key is the
            # registrar's is not ours to guess.
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=dict(REGISTRAR_HEADER_REPEATED))
        registrar_key = values[0] if values else ""
        if registrar_key:
            if classify(registrar_key) is not CredentialKind.API_KEY:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail=dict(REGISTRAR_HEADER_NOT_A_KEY),
                    headers={"WWW-Authenticate": "Bearer"},
                )
            return registrar_key
    return credentials.credentials if credentials else None


async def get_current_user(
    request: Request,
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
) -> User:
    """Get current authenticated user via JWT token or API key. The
    credential itself is resolved by ``app.auth.credentials`` (CHT-1560),
    shared with /mcp; this maps its failure to REST's 401/403. Which
    header it comes from: ``presented_credential``."""
    credential = presented_credential(request, credentials)
    try:
        principal = await rest_resolver.resolve(credential)
    except CredentialError as exc:
        error = _http_error(exc)
        if credential is not None and (credentials is None or credential != credentials.credentials):
            # Say where the refused key came from: a direct caller of
            # register may not know a proxy added it.
            error.detail = f"{exc.detail} (from {REGISTRAR_KEY_HEADER})"
        raise error from None
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
    request: Request,
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security)],
):
    """The key row behind this request's `ck_...` key (the one
    ``presented_credential`` picks), or None for a JWT. Only meaningful
    alongside CurrentUser, which has already validated the token."""
    credential = presented_credential(request, credentials)
    if not credential or classify(credential) is not CredentialKind.API_KEY:
        return None
    api_key, _legacy = await APIKeyService().find_by_key(credential)
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


async def can_read_team_data(user: User, team_id: str) -> bool:
    """May ``user`` read and write ``team_id``'s team-wide data: every
    project's issues, the team activity and comment feeds, team-level
    (project-less) documents, templates?

    For humans: must be a team member.
    For agents: must be *team*-scoped to this team. A project-scoped
    agent is refused even for its own team (CHT-1780): it reaches its
    project through ``check_user_project_access``, and the few team
    reads it needs (the team row, its members and agents, labels) go
    through ``is_in_team_directory``.
    """
    if user.is_agent:
        if user.agent_project_id:
            return False
        # Fail closed on a missing side (CHT-1844): an agent retired with
        # its deleted project or team has no team, and None == None must
        # never read as access.
        if not user.agent_team_id or not team_id:
            return False
        return user.agent_team_id == team_id

    team_service = TeamService()
    member = await team_service.get_member(team_id, user.id)
    return member is not None


async def can_access_document(user: User, document) -> bool:
    """The read rule for one document: project access for a project's
    document, team access for a team-level one. ``GET /documents/{id}``
    applies it, and so must every route that returns documents some other
    way, such as the documents linked to an issue (CHT-1780)."""
    if document.project_id:
        from app.services.project_service import ProjectService

        project = await ProjectService().get_by_id(document.project_id)
        return project is not None and await check_user_project_access(user, project)
    return await can_read_team_data(user, document.team_id)


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


async def is_in_team_directory(user: User, team_id: str) -> bool:
    """Is ``user`` part of ``team_id`` at all -- a member, or an agent of
    that team at either scope? This is the bar for the team's *directory*,
    which a project-scoped agent needs for ordinary work in its project:
    the team row, its members and agents (to resolve an assignee or a
    mention), and its labels (to label its issues). Never use it for
    team-wide *data*; that is ``can_read_team_data`` (CHT-1780).
    """
    if not team_id:
        return False
    if user.is_agent:
        return user.agent_team_id == team_id
    return await can_read_team_data(user, team_id)


async def is_eligible_project_member(user: User | None, team_id: str, project_id: str | None) -> bool:
    """May ``user`` be named on work in a project of ``team_id``: an
    issue's assignee, a project's lead? One rule for both (CHT-1830):

    * an active human member of the team;
    * an active team-scoped agent of the team;
    * an active project-scoped agent of *this* project (``project_id``)
      that carries this team (every agent has one, CHT-1837). A project-scoped
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
    is_member = not user.is_agent and await TeamService().get_member(team_id, user.id) is not None
    return eligible_on_project_work(user, team_id, project_id, is_member=is_member)


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
        # Team-scoped agent: must match the project's team (never on a
        # missing team, CHT-1844)
        return bool(user.agent_team_id) and user.agent_team_id == project.team_id

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
