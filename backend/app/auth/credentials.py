"""One credential resolver for REST and /mcp (CHT-1560).

A presented bearer string becomes a ``Principal``, or a
``CredentialError`` that says what went wrong. REST (``app.api.deps``)
and /mcp (``app.mcp_server.auth``) are thin adapters over this module,
and so is the /ws WebSocket (``app.ws_auth``, CHT-1567, CHT-1603):
each maps a ``CredentialError`` to its own response shape and
WWW-Authenticate challenge, and neither looks at the token itself.

Kinds of credential, decided by the token's shape (``classify``):

* ``API_KEY``: ``ck_...``, looked up by digest (``APIKeyService``). Signs
  in as the key's ``principal_user_id``; an agent's key also needs its
  ``holder_user_id`` to still be in the agent's team (ADR-0008).
* ``OAUTH_ACCESS``: a token minted by ``TokenService`` (``cat_``, and
  the other token prefixes, which are refused as not access tokens),
  validated by it (CHT-1576). Only while ``OAUTH_ENABLED`` is on. The
  token must have been issued for the edge's resource (RFC 8707, design
  I16): a connector token (``<base>/mcp``) only at /mcp, a whole-server
  token (``<base>``, claim grants) at REST and /mcp. The per-request
  checks are those of an agent's ``ck_`` key (see ``_verify_oauth_access``).
* ``SESSION_JWT``: anything else. The web UI's login token.

An edge says which kinds it accepts, and the resource it is (needed by
OAuth tokens only). A token of a kind the edge does not accept fails
with ``CredentialFailure.UNSUPPORTED`` before anything is looked up: /mcp
takes API keys and OAuth tokens, so a JWT there is refused exactly as it
was before this module existed, and the /mcp/<key> capability URL takes
API keys only, so an OAuth token never travels in a path (CHT-1570).
Neither adapter branches on the kind beyond picking a challenge: the
/mcp adapter answers a failed API key with the bare ``Bearer`` challenge
and a failed token of any other kind with the ``invalid_token`` one.

Scopes: API keys and session JWTs carry every scope (``ALL_SCOPES``),
and only they may (``WILDCARD_KINDS``, CHT-1574). An OAuth access token
carries what it was granted, and ``app.auth.access.authorize`` enforces
them at the registrar rule's place (CHT-1562; architecture review
e10bc055, finding 3).
"""
from __future__ import annotations

import enum
from collections.abc import Awaitable, Callable
from dataclasses import dataclass, field

from app.auth.access import ALL, ALL_SCOPES  # noqa: F401  (defined with the rule that reads them)
from app.config import get_settings
from app.oxyde_models.user import OxydeUser as User
from app.services import token_service
from app.services.api_key_service import APIKeyService
from app.services.team_service import TeamService
from app.services.token_service import TokenError, TokenService
from app.services.user_service import UserService
from app.utils.security import decode_token


class CredentialKind(str, enum.Enum):
    API_KEY = "api_key"
    SESSION_JWT = "session_jwt"
    OAUTH_ACCESS = "oauth_access"


# The only kinds that may carry the wildcard scope (CHT-1574): an
# allowlist, so a kind added later (claim tickets, say) fails closed.
WILDCARD_KINDS = frozenset({CredentialKind.API_KEY, CredentialKind.SESSION_JWT})


class CredentialFailure(str, enum.Enum):
    MISSING = "missing"  # no credential presented at all
    UNSUPPORTED = "unsupported"  # a kind this edge does not accept
    INVALID = "invalid"  # unknown, expired, revoked, or its user is gone
    INACTIVE = "inactive"  # valid, but its user is deactivated


@dataclass(frozen=True)
class Principal:
    """Who a request is, and on what authority."""

    user: User  # the user the request acts as (``principal_user_id``)
    # The human who answers for this credential (ADR-0008): the holder of
    # an API key, the user themself for a session JWT. For an API key it
    # is the row's `holder_user_id` as stored, so None is possible only
    # for a row with no holder on record. ADR-0008 allows that only for
    # a legacy agent key with no creator, which never resolves (refused
    # above); a human's key has had its holder set since 0021. A reader
    # must still treat None as "no holder on record", never as "self".
    holder_user_id: str | None
    kind: CredentialKind
    scopes: frozenset = field(default=ALL_SCOPES)
    # Id of the credential's row, where it has one (an API key's id).
    credential_id: str | None = None
    # The holder session an OAuth access token belongs to (CHT-1576).
    holder_session_id: str | None = None

    def __post_init__(self):
        # Scopes granted to a token are strings off the wire, and the
        # wildcard is not a string, so it cannot get in that way; this
        # also refuses code that hands any other kind the wildcard
        # (CHT-1562 review, S1). Only the WILDCARD_KINDS carry it: an
        # allowlist, so a new kind fails closed (CHT-1574).
        if self.kind not in WILDCARD_KINDS and (
            ALL in self.scopes or not all(isinstance(s, str) for s in self.scopes)
        ):
            raise ValueError(f"a {self.kind.value} credential carries the scopes it was granted, never the wildcard")

    def has_scope(self, scope: str) -> bool:
        return ALL in self.scopes or scope in self.scopes


class CredentialError(Exception):
    """The credential did not resolve to a principal.

    ``status_code`` and ``detail`` are what REST has always answered
    (401, or 403 for an inactive user). ``kind`` is the kind of the
    credential that failed (None when nothing was presented), which is
    what /mcp chooses its challenge by.
    """

    def __init__(
        self,
        failure: CredentialFailure,
        detail: str,
        *,
        kind: CredentialKind | None = None,
    ):
        super().__init__(detail)
        self.failure = failure
        self.detail = detail
        self.kind = kind

    @property
    def status_code(self) -> int:
        return 403 if self.failure is CredentialFailure.INACTIVE else 401


def classify(token: str) -> CredentialKind:
    """The kind of credential ``token`` claims to be, by its shape alone.
    Every ``TokenService`` prefix is an OAuth token (CHT-1576): a refresh
    token or code sent as a bearer is then refused by the OAuth verifier,
    with the OAuth challenge, rather than failing to decode as a JWT."""
    if token.startswith("ck_"):
        return CredentialKind.API_KEY
    if token_service.kind_of(token) is not None:
        return CredentialKind.OAUTH_ACCESS
    return CredentialKind.SESSION_JWT


async def _verify_session_jwt(token: str, audience: str | None) -> Principal:
    kind = CredentialKind.SESSION_JWT
    payload = decode_token(token)
    if not payload:
        raise CredentialError(CredentialFailure.INVALID, "Invalid token", kind=kind)
    user_id = payload.get("sub")
    if not user_id:
        raise CredentialError(CredentialFailure.INVALID, "Invalid token", kind=kind)
    user = await UserService().get_by_id(user_id)
    if not user:
        raise CredentialError(CredentialFailure.INVALID, "User not found", kind=kind)
    if not user.is_active:
        raise CredentialError(CredentialFailure.INACTIVE, "User is inactive", kind=kind)
    return Principal(user=user, holder_user_id=user.id, kind=kind)


async def _verify_api_key(token: str, audience: str | None) -> Principal:
    """The user the key signs in as (its ``principal_user_id``,
    CHT-1537), a human or an agent."""
    kind = CredentialKind.API_KEY
    key_record = await APIKeyService().validate_key(token)
    if not key_record:
        raise CredentialError(CredentialFailure.INVALID, "Invalid API key", kind=kind)

    user = await UserService().get_by_id(key_record.principal_user_id)
    if not user:
        # One answer whether the missing user was a human or an agent
        # (before CHT-1537 an agent key said "Agent not found"). The
        # foreign key cascades the key away with its user, so this needs
        # a row written with foreign keys off.
        raise CredentialError(CredentialFailure.INVALID, "User not found", kind=kind)

    # An agent key is only as good as the membership of the human behind
    # it (CHT-1508/CHT-1510): the key's `holder_user_id`, whoever minted
    # it, or the holder of the key an agent used to mint one for itself
    # (a legacy self-minted key was given the agent's creator by 0021).
    # Once that human is no longer in the agent's team the key is dead,
    # whether or not the removal got to revoke it, and it is answered
    # exactly like a revoked key. REST and both MCP transports come
    # through here.
    if user.is_agent:
        holder_id = key_record.holder_user_id
        if not holder_id or await TeamService().get_member(user.agent_team_id, holder_id) is None:
            raise CredentialError(CredentialFailure.INVALID, "Invalid API key", kind=kind)

    if not user.is_active:
        raise CredentialError(CredentialFailure.INACTIVE, "User is inactive", kind=kind)

    return Principal(
        user=user,
        holder_user_id=key_record.holder_user_id,
        kind=kind,
        credential_id=key_record.id,
    )


async def _verify_oauth_access(token: str, audience: str | None) -> Principal:
    """An OAuth access token (CHT-1576), for use at ``audience``.

    ``TokenService.validate_access`` checks the token itself: an
    unexpired, unrevoked access token on an unrevoked holder session
    inside its lifetime, issued for this resource (I15, I16). Its result
    is cached for up to 30 s under the revocation epoch, so everything
    here that is not about the token is re-checked on every request, as
    for an agent's ``ck_`` key:

    * the principal exists, is an agent, and is active. Every session
      today acts as an agent (design §3.1); a human principal (web login
      sessions, CHT-1524) is refused until that ticket decides its rules;
    * the session's team is the agent's own team;
    * the human who answers for it (the consenting human, or the holder
      of the key that claimed it) is active and still in the agent's
      team (ADR-0008, CHT-1508; design §4.4: a human who loses access
      takes their connections' reach with them);
    * a session claimed with a key (``credential_id``: claim grants,
      CHT-1447) dies with that key: it must still be active and
      unexpired, until the RevocationService cascades it (CHT-1449);
    * a project-scoped session is accepted only for a project-scoped
      agent whose project is in it, since nothing below the resolver
      narrows a principal to a set of projects yet (CHT-1575). Fail
      closed: a session that names projects never reaches the whole team.

    Every refusal is INVALID (401 ``invalid_token``: the client should
    re-authorize) except an inactive agent, which is INACTIVE (403), as
    for a key.
    """
    kind = CredentialKind.OAUTH_ACCESS

    def invalid(detail: str = "Invalid token") -> CredentialError:
        return CredentialError(CredentialFailure.INVALID, detail, kind=kind)

    if audience is None:  # pragma: no cover -- CredentialResolver refuses to be built so
        raise invalid()
    if not get_settings().oauth_enabled:
        raise invalid()
    try:
        validated = await TokenService().validate_access(token, resource=audience)
    except TokenError as exc:
        raise invalid(f"Invalid token: {exc.description}") from None

    user = await UserService().get_by_id(validated.principal_user_id)
    if not user:
        raise invalid("User not found")
    if not user.is_agent or user.agent_team_id != validated.team_id:
        raise invalid()
    if validated.scope_project_ids is not None and (
        not user.agent_project_id or user.agent_project_id not in validated.scope_project_ids
    ):
        raise invalid("Invalid token: project-scoped connections are not supported yet")
    holder = await UserService().get_by_id(validated.holder_user_id)
    if (
        holder is None
        or not holder.is_active
        or await TeamService().get_member(user.agent_team_id, holder.id) is None
    ):
        raise invalid()
    if validated.credential_id is not None and not await APIKeyService().is_live(validated.credential_id):
        raise invalid()
    if not user.is_active:
        raise CredentialError(CredentialFailure.INACTIVE, "User is inactive", kind=kind)

    return Principal(
        user=user,
        holder_user_id=validated.holder_user_id,
        kind=kind,
        scopes=frozenset(validated.scopes),
        holder_session_id=validated.holder_session_id,
    )


_VERIFIERS: dict[CredentialKind, Callable[[str, str | None], Awaitable[Principal]]] = {
    CredentialKind.API_KEY: _verify_api_key,
    CredentialKind.SESSION_JWT: _verify_session_jwt,
    CredentialKind.OAUTH_ACCESS: _verify_oauth_access,
}

# Kinds whose verifier needs to know which resource the edge is.
_AUDIENCE_BOUND = frozenset({CredentialKind.OAUTH_ACCESS})


class CredentialResolver:
    """Turns a presented credential into a ``Principal`` for one edge,
    which accepts the kinds in ``accepts``. ``audience`` returns the
    edge's RFC 8707 resource, read per request (it follows
    ``APP_BASE_URL``); an edge that accepts OAuth tokens must have one."""

    def __init__(self, accepts: frozenset[CredentialKind], audience: Callable[[], str] | None = None):
        unknown = accepts - _VERIFIERS.keys()
        if unknown:
            raise ValueError(f"no verifier for {sorted(k.value for k in unknown)}")
        if accepts & _AUDIENCE_BOUND and audience is None:
            raise ValueError("an edge that accepts OAuth tokens must say which resource it is")
        self.accepts = accepts
        self.audience = audience

    async def resolve(self, token: str | None) -> Principal:
        if not token:
            raise CredentialError(CredentialFailure.MISSING, "Not authenticated")
        kind = classify(token)
        if kind not in self.accepts:
            raise CredentialError(
                CredentialFailure.UNSUPPORTED,
                "Unsupported credential",
                kind=kind,
            )
        audience = self.audience() if kind in _AUDIENCE_BOUND else None
        return await _VERIFIERS[kind](token, audience)


# The kinds each edge accepts, and the resource it is. REST is the whole
# server (``<base>``), so only a whole-server token is accepted there; a
# connector token (issued for ``<base>/mcp``) is refused (design §2.4,
# threat S2). The capability URL takes API keys only: a token is never
# carried in a path (CHT-1570).
REST_KINDS = frozenset({CredentialKind.API_KEY, CredentialKind.SESSION_JWT, CredentialKind.OAUTH_ACCESS})
MCP_KINDS = frozenset({CredentialKind.API_KEY, CredentialKind.OAUTH_ACCESS})
CAPABILITY_URL_KINDS = frozenset({CredentialKind.API_KEY})

# /ws takes what REST takes, as the same resource (``<base>``): it is the
# REST API's live feed, so a connector token is refused there too. Its
# adapter (``app.ws_auth``) also refuses every agent, whatever its
# credential: /ws is for the people's own clients (CHT-1603).
WS_KINDS = REST_KINDS

rest_resolver = CredentialResolver(REST_KINDS, audience=token_service.issuer)
ws_resolver = CredentialResolver(WS_KINDS, audience=token_service.issuer)
mcp_resolver = CredentialResolver(MCP_KINDS, audience=token_service.mcp_resource)
capability_url_resolver = CredentialResolver(CAPABILITY_URL_KINDS)
