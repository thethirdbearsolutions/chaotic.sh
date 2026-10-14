"""Authorization requests and human consent (CHT-1519; design doc §2.3,
§3.2, threats S3, S4, S7, S9, invariants I17, I18).

The flow splits because the web UI keeps its login in ``localStorage``
and sends it as a header, never a cookie: a top-level ``GET
/oauth/authorize`` can't see who is logged in.

1. ``/oauth/authorize`` (``app.api.oauth``) validates everything that
   decides where a redirect may go before any redirect, then stores an
   ``oauth_authorization_requests`` row (``create_request``) and sends
   the browser to the SPA's ``/oauth/consent/<id>``.
2. The first logged-in human who reads the request is bound to it
   (``view``); anyone else gets 404 from then on.
3. That human approves or denies (``approve`` / ``deny``), with their
   web login in the Authorization header. Approve chooses who the
   connection acts as (a new agent they own, or an agent they manage),
   where (their team, optionally narrowed to projects) and with what
   policy, then mints a 60 s single-use authorization code bound to all
   of it and returns the client's redirect with ``code``, ``state`` and
   ``iss``.

A built-in first-party app (``app.oauth.builtin``, CHT-1602) is the one
exception to "acts as an agent": its consent is "sign in as you". The
human picks a team and nothing else (no agent, no projects), and the
code it mints acts as that human for the whole server (``<base>``).
Which kind a request is comes from its client_id alone.

Every authorization shows consent; nothing is silently re-approved, and
the known-clients badge never skips it. The human-only check on the
endpoints is in ``app.api.oauth`` (``require_human_session``); this
module trusts that ``user`` is a human.
"""
from __future__ import annotations

import secrets
from datetime import datetime, timedelta, timezone
from urllib.parse import urlencode, urlsplit

from fastapi import status
from oxyde import IntegrityError, execute_raw
from app.db.transactions import atomic

from app.config import get_settings
from app.enums import AgentKind, HolderVia, OAuthClientRegistration, TokenKind
from app.oauth.builtin import builtin_of
from app.oauth.clients import is_loopback_redirect, redirect_host, redirect_uri_problem
from app.oauth.discovery import RESOURCE_SCOPES
from app.oxyde_models.oauth import OxydeHolderSession, OxydeOAuthAuthorizationRequest, OxydeOAuthClient
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.user import OxydeUser
from app.schemas.agent import AgentCreate
from app.schemas.oauth import (
    AuthorizationApproval,
    AuthorizationRequestView,
    ConsentAgent,
    ConsentClient,
    ConsentPolicy,
    ConsentProject,
    ConsentTeam,
)
from app.services.agent_service import AgentService
from app.services.oauth_client_service import OAuthClientService
from app.services.registration_service import member_named, name_matches_member_detail
from app.services.team_service import TeamService
from app.services.token_service import TokenService, issuer, mcp_resource

REQUEST_TTL = timedelta(minutes=10)
OFFLINE_ACCESS = "offline_access"
# Policy scope -> policy name, strongest first (design §4.4).
POLICY_SCOPES: dict[str, str] = {scope: scope.split(":", 1)[1] for scope in RESOURCE_SCOPES}
# What consent can grant today. read / triage / worker light up with
# RBAC (CHT-1435/CHT-1440); until then a connection is `write`, today's
# behavior for every credential.
AVAILABLE_POLICIES = frozenset({"write"})
DEFAULT_SCOPE = "chaotic:write"
MAX_STATE_LENGTH = 1024


class ConsentError(Exception):
    """A consent API call that must fail: ``status_code`` and a REST
    ``detail`` (a string, or a dict with an ``error_code``)."""

    def __init__(self, status_code: int, detail):
        super().__init__(str(detail))
        self.status_code = status_code
        self.detail = detail


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _gone() -> ConsentError:
    # One answer for unknown, expired, used, and someone else's: the id is
    # the only thing a stranger has, and it must tell them nothing.
    return ConsentError(status.HTTP_404_NOT_FOUND, "Authorization request not found or expired")


def with_query(uri: str, params: dict[str, str | None]) -> str:
    """``uri`` with ``params`` appended to its query (None values left
    out). The redirect_uri was matched exactly, so it is rebuilt from the
    string the client registered, not re-serialized."""
    query = urlencode({k: v for k, v in params.items() if v is not None})
    if not query:
        return uri
    return f"{uri}{'&' if urlsplit(uri).query else '?'}{query}"


def split_scope(scope: str | None) -> list[str]:
    return list(dict.fromkeys(s for s in (scope or "").split(" ") if s))


def normalize_requested_scope(scope: str | None) -> list[str] | None:
    """The requested scopes, or None if any is unknown. A request that
    names no policy asks for the default ceiling, ``chaotic:write``."""
    scopes = split_scope(scope)
    if any(s not in POLICY_SCOPES and s != OFFLINE_ACCESS for s in scopes):
        return None
    if not any(s in POLICY_SCOPES for s in scopes):
        scopes.insert(0, DEFAULT_SCOPE)
    return scopes


def oauth_external_ref(client: OxydeOAuthClient, user_id: str, redirect_uri: str) -> str:
    """``oauth:<client host>:<user id>`` (design §3.2): the CIMD host, or
    for a DCR client the host this request's code goes to."""
    if client.registration == OAuthClientRegistration.CIMD:
        host = redirect_host(client.id)
    else:
        host = redirect_host(redirect_uri)
    return f"oauth:{host}:{user_id}"


class OAuthConsentService:
    # --- 1. /oauth/authorize ----------------------------------------------------

    async def create_request(
        self, *, client: OxydeOAuthClient, redirect_uri: str, state: str | None, code_challenge: str,
        scopes: list[str], resource: str | None = None,
    ) -> OxydeOAuthAuthorizationRequest:
        """Store a request that /oauth/authorize has fully validated,
        with the canonical resource it resolved (``<base>/mcp`` for a
        connector, the default; ``<base>`` for a built-in app).

        Sweeps expired requests first: anyone can create one, so they
        must not accumulate. Nothing references a request once it has
        expired (a code minted from it names it without a foreign key).
        Raw SQL: Oxyde has no range lookups on DateTimeUTC fields."""
        await execute_raw("DELETE FROM oauth_authorization_requests WHERE expires_at <= ?", [_now()])
        return await OxydeOAuthAuthorizationRequest.objects.create(
            id=secrets.token_urlsafe(16),  # 128 bits
            client_id=client.id,
            redirect_uri=redirect_uri,
            state=state,
            code_challenge=code_challenge,
            resource=resource or mcp_resource(),
            scope=" ".join(scopes),
            expires_at=_now() + REQUEST_TTL,
        )

    # --- 2. binding --------------------------------------------------------------

    async def _bound(self, request_id: str, user: OxydeUser) -> OxydeOAuthAuthorizationRequest:
        """The request, bound to ``user`` (binding it now if nobody has
        read it yet), live and unconsumed. Otherwise 404."""
        if not request_id or len(request_id) > 64:
            raise _gone()
        # Conditional: of two first readers exactly one binds.
        await OxydeOAuthAuthorizationRequest.objects.filter(
            id=request_id, bound_user_id__isnull=True,
        ).update(bound_user_id=user.id)
        request = await OxydeOAuthAuthorizationRequest.objects.get_or_none(id=request_id)
        if (
            request is None
            or request.bound_user_id != user.id
            or request.consumed_at is not None
            or request.expires_at <= _now()
            # Checked at /oauth/authorize already; again here because the
            # SPA navigates to whatever approve/deny return (review B1).
            or redirect_uri_problem(request.redirect_uri, allow_private_use=True)
        ):
            raise _gone()
        return request

    async def _client(self, request: OxydeOAuthAuthorizationRequest) -> OxydeOAuthClient:
        client = await OxydeOAuthClient.objects.get_or_none(id=request.client_id)
        if client is None or not client.is_active:
            raise _gone()
        return client

    async def view(self, request_id: str, user: OxydeUser) -> AuthorizationRequestView:
        request = await self._bound(request_id, user)
        client = await self._client(request)
        identity = OAuthClientService().identity(client)
        scopes = split_scope(request.scope)
        settings = get_settings()
        person = builtin_of(client) is not None
        teams = await self._teams(user, with_agents=not person)
        team_ids = {t.id for t in teams}
        suggested_team, suggested_agent = await self._suggestion(client, user)
        if suggested_agent and not any(
            a.id == suggested_agent for t in teams if t.id == suggested_team for a in t.agents
        ):
            suggested_agent = None  # gone, or no longer theirs to choose
        if suggested_team not in team_ids:
            suggested_team = None
        return AuthorizationRequestView(
            id=request.id,
            expires_at=request.expires_at,
            client=ConsentClient(
                client_id=client.id,
                name=identity.name,
                trust=identity.trust,
                host=identity.host,
                registration=client.registration.value,
            ),
            redirect_uri=request.redirect_uri,
            redirect_host=redirect_host(request.redirect_uri),
            loopback_redirect=is_loopback_redirect(request.redirect_uri),
            requested_scopes=scopes,
            policies=[
                ConsentPolicy(name=name, requested=scope in scopes, available=name in AVAILABLE_POLICIES)
                for scope, name in POLICY_SCOPES.items()
            ],
            offline_access=OFFLINE_ACCESS in scopes,
            refresh_idle_days=settings.oauth_refresh_idle_ttl_seconds // 86400,
            refresh_absolute_days=settings.oauth_refresh_absolute_ttl_seconds // 86400,
            teams=teams,
            default_agent_name="" if person else self._default_agent_name(identity.name, user),
            suggested_team_id=suggested_team,
            suggested_agent_id=None if person else suggested_agent,
            acts_as="person" if person else "agent",
        )

    @staticmethod
    def _default_agent_name(client_name: str, user: OxydeUser) -> str:
        return f"{client_name} ({user.name})"[:255]

    async def _teams(self, user: OxydeUser, *, with_agents: bool = True) -> list[ConsentTeam]:
        """The viewer's teams, each with its projects and the agents in it
        the viewer may connect as (none for a built-in app, which signs
        in as the viewer). Never more than the viewer's own access: a
        human's access is team membership."""
        out = []
        agents_service = AgentService()
        for team in await TeamService().get_user_teams(user.id):
            projects = await OxydeProject.objects.filter(team_id=team.id).order_by("name").all()
            agents = [
                a for a in await agents_service.list_by_team(team.id) if await self._may_connect_as(user, a)
            ] if with_agents else []
            out.append(ConsentTeam(
                id=team.id,
                name=team.name,
                key=team.key,
                projects=[ConsentProject(id=p.id, name=p.name, key=p.key) for p in projects],
                agents=[await self._consent_agent(a, user) for a in agents],
            ))
        return out

    @staticmethod
    async def _consent_agent(agent: OxydeUser, viewer: OxydeUser) -> ConsentAgent:
        owner = None
        if agent.parent_user_id and agent.parent_user_id != viewer.id:
            owner = await OxydeUser.objects.get_or_none(id=agent.parent_user_id)
        # Raw SQL: no range lookups on DateTimeUTC fields in Oxyde.
        rows = await execute_raw(
            "SELECT COUNT(*) AS n FROM api_keys WHERE principal_user_id = ? AND is_active = 1 "
            "AND (expires_at IS NULL OR expires_at > ?)",
            [agent.id, _now()],
        )
        return ConsentAgent(
            id=agent.id,
            name=agent.name,
            agent_project_id=agent.agent_project_id,
            owner_name=viewer.name if agent.parent_user_id == viewer.id else (owner.name if owner else None),
            owned_by_viewer=agent.parent_user_id == viewer.id,
            active_api_keys=rows[0]["n"],
        )

    @staticmethod
    async def _may_connect_as(user: OxydeUser, agent: OxydeUser) -> bool:
        """An active, hand-made agent (not a registrar, not a registered
        session identity) that ``user`` manages (CHT-1303/CHT-1508)."""
        return bool(
            agent.is_agent
            and agent.is_active
            and not agent.can_register
            and agent.kind in (None, AgentKind.ASSISTANT)
            and await AgentService().can_manage(user, agent)
        )

    async def _suggestion(self, client: OxydeOAuthClient, user: OxydeUser) -> tuple[str | None, str | None]:
        """(team, agent) of the viewer's newest OAuth connection to this
        same client_id, else (None, None): "new agent" stays the default
        (threat S7). Never matched by name or redirect host: a DCR client
        gets a fresh client_id per registration, and any self-registered
        app can copy another's name and loopback host (review N1/Q2).
        Advisory only: it pre-selects, the human still chooses."""
        sessions = await OxydeHolderSession.objects.filter(
            holder_user_id=user.id, via__in=[HolderVia.OAUTH, HolderVia.APP], oauth_client_id=client.id,
        ).order_by("-created_at").limit(1).all()
        if sessions:
            return sessions[0].team_id, sessions[0].principal_user_id
        return None, None

    # --- 3. decisions --------------------------------------------------------------

    async def approve(self, request_id: str, user: OxydeUser, choice: AuthorizationApproval) -> tuple[str, str]:
        """Approve: returns (redirect with code, agent id; None for a
        built-in app, which signs in as ``user``). Raises ConsentError.
        Everything is validated before the request is consumed, so a
        refused approval can be corrected and resent."""
        request = await self._bound(request_id, user)
        client = await self._client(request)
        scopes = split_scope(request.scope)
        person = builtin_of(client) is not None
        if person and (choice.agent_id is not None or choice.agent_name is not None or choice.project_ids):
            raise ConsentError(422, {
                "error_code": "app_signs_in_as_you",
                "message": "This app signs in as you in the whole team: choose a team, not an agent or projects.",
            })
        # Belt and braces: the resource was fixed by /oauth/authorize from
        # the same client_id, so a mismatch here is a stored row gone wrong.
        if request.resource != (issuer() if person else mcp_resource()):
            raise _gone()

        member = await TeamService().get_member(choice.team_id, user.id)
        if member is None:
            raise ConsentError(status.HTTP_403_FORBIDDEN, "Not a member of this team")
        project_ids = await self._check_projects(choice.team_id, choice.project_ids)

        scope = f"chaotic:{choice.policy}"
        if scope not in POLICY_SCOPES:
            raise ConsentError(422, {"error_code": "unknown_policy", "message": f"No policy named {choice.policy!r}"})
        if scope not in scopes:
            raise ConsentError(422, {
                "error_code": "policy_not_requested",
                "message": f"The app did not ask for {scope}; consent may grant less than it asked, never more.",
            })
        if choice.policy not in AVAILABLE_POLICIES:
            raise ConsentError(422, {
                "error_code": "policy_unavailable",
                "message": f"The {choice.policy} policy is not available yet; only write is.",
            })

        agent = None
        new_name = None
        if person:
            pass  # the principal is the viewer
        elif choice.agent_id is not None:
            agent = await AgentService().get_by_id(choice.agent_id)
            if agent is None or agent.agent_team_id != choice.team_id or not await self._may_connect_as(user, agent):
                raise ConsentError(status.HTTP_403_FORBIDDEN, {
                    "error_code": "agent_not_allowed",
                    "message": "You can connect only as an active agent you manage in this team.",
                })
            if agent.agent_project_id:
                if project_ids is None:
                    project_ids = [agent.agent_project_id]
                elif set(project_ids) != {agent.agent_project_id}:
                    raise ConsentError(422, {
                        "error_code": "agent_project_scope",
                        "message": "This agent is scoped to one project; the connection can't reach others.",
                    })
        else:
            identity = OAuthClientService().identity(client)
            new_name = (choice.agent_name or self._default_agent_name(identity.name, user)).strip()[:255]
            if not new_name:
                raise ConsentError(422, "The agent needs a name")
            if await member_named(choice.team_id, new_name):
                raise ConsentError(422, name_matches_member_detail(new_name))

        # One transaction (review S3): consume, create the agent, mark the
        # client used and mint the code, or none of it. A failure part way
        # leaves no orphan agent and doesn't burn the request, so the
        # human can try again.
        async with atomic():
            # Consume: of a concurrent approve and deny, exactly one wins.
            consumed = await OxydeOAuthAuthorizationRequest.objects.filter(
                id=request.id, bound_user_id=user.id, consumed_at__isnull=True,
            ).update(consumed_at=_now())
            if consumed != 1:
                raise _gone()

            if agent is None and not person:
                agent = await self._create_agent(new_name, user, choice.team_id, client, request.redirect_uri)
            await OAuthClientService().mark_authorized(client.id)
            granted = [scope] + ([OFFLINE_ACCESS] if OFFLINE_ACCESS in scopes else [])
            _row, code = await TokenService().mint_single_use(
                TokenKind.AUTH_CODE,
                team_id=choice.team_id,
                principal_user_id=user.id if person else agent.id,
                holder_user_id=user.id,
                resource=request.resource,
                scopes=granted,
                policy_name=choice.policy,
                scope_project_ids=project_ids,
                oauth_client_id=client.id,
                code_challenge=request.code_challenge,
                redirect_uri=request.redirect_uri,
                auth_request_id=request.id,
            )
        redirect = with_query(request.redirect_uri, {"code": code, "state": request.state, "iss": issuer()})
        return redirect, (None if person else agent.id)

    async def deny(self, request_id: str, user: OxydeUser) -> str:
        request = await self._bound(request_id, user)
        consumed = await OxydeOAuthAuthorizationRequest.objects.filter(
            id=request.id, bound_user_id=user.id, consumed_at__isnull=True,
        ).update(consumed_at=_now())
        if consumed != 1:
            raise _gone()
        return with_query(request.redirect_uri, {
            "error": "access_denied",
            "error_description": "The user denied the request",
            "state": request.state,
            "iss": issuer(),
        })

    async def _check_projects(self, team_id: str, project_ids: list[str] | None) -> list[str] | None:
        if not project_ids:
            return None
        wanted = list(dict.fromkeys(project_ids))
        found = await OxydeProject.objects.filter(id__in=wanted, team_id=team_id).all()
        if len(found) != len(wanted):
            raise ConsentError(422, {
                "error_code": "project_not_in_team",
                "message": "Every project must belong to the chosen team.",
            })
        return wanted

    async def _create_agent(
        self, name: str, user: OxydeUser, team_id: str, client: OxydeOAuthClient, redirect_uri: str,
    ) -> OxydeUser:
        """A new agent the human owns, with no key: it acts only through
        this connection's tokens. ``external_ref`` is
        ``oauth:<host>:<user>``, suffixed ``:<n>`` when that is taken
        (another connection of the same client in this team)."""
        base = oauth_external_ref(client, user.id, redirect_uri)
        taken = {
            u.external_ref for u in await OxydeUser.objects.filter(
                agent_team_id=team_id, external_ref__startswith=base,
            ).all()
        }
        for n in range(1, 1000):
            ref = base if n == 1 else f"{base}:{n}"
            if ref in taken:
                continue
            try:
                agent, _key, _key_id = await AgentService().create(
                    AgentCreate(name=name), user, team_id, None, mint_key=False, external_ref=ref,
                )
                return agent
            except IntegrityError:
                taken.add(ref)  # a concurrent consent took it
        raise ConsentError(409, "Too many connections of this app in this team")  # pragma: no cover

