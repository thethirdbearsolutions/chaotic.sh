"""One credential resolver for REST and /mcp (CHT-1560).

A presented bearer string becomes a ``Principal``, or a
``CredentialError`` that says what went wrong. REST (``app.api.deps``)
and /mcp (``app.mcp_server.auth``) are thin adapters over this module
(the /ws WebSocket still checks its JWT itself, CHT-1567):
each maps a ``CredentialError`` to its own response shape and
WWW-Authenticate challenge, and neither looks at the token itself.

Kinds of credential, decided by the token's shape (``classify``):

* ``API_KEY``: ``ck_...``, looked up by digest (``APIKeyService``). Signs
  in as the key's ``principal_user_id``; an agent's key also needs its
  ``holder_user_id`` to still be in the agent's team (ADR-0008).
* ``SESSION_JWT``: anything else. The web UI's login token.
* ``OAUTH_ACCESS``: reserved for MCP OAuth access tokens (CHT-1520). It
  plugs in here, and only here: give the token a recognisable shape in
  ``classify``, add a verifier to ``_VERIFIERS`` that returns a
  ``Principal`` with the token's granted scopes, and accept the kind at
  the edges that should take it (``MCP_KINDS``). Neither adapter needs a
  new branch: the /mcp adapter picks its challenge from
  ``CredentialError.kind`` (a failed API key gets the bare ``Bearer``
  challenge, a failed token of any other kind the ``invalid_token``
  one), so a failed access token is answered correctly as it stands.

An edge says which kinds it accepts. A token of a kind the edge does not
accept fails with ``CredentialFailure.UNSUPPORTED`` before anything is
looked up: /mcp takes API keys only, so a JWT there is refused exactly
as it was before this module existed.

Scopes: API keys and session JWTs carry every scope (``ALL_SCOPES``).
An OAuth access token will carry what it was granted, and
``app.auth.access.authorize`` enforces them at the registrar rule's
place (CHT-1562; architecture review e10bc055, finding 3).
"""
from __future__ import annotations

import enum
from collections.abc import Awaitable, Callable
from dataclasses import dataclass, field

from app.auth.access import ALL, ALL_SCOPES  # noqa: F401  (defined with the rule that reads them)
from app.oxyde_models.user import OxydeUser as User
from app.services.api_key_service import APIKeyService
from app.services.team_service import TeamService
from app.services.user_service import UserService
from app.utils.security import decode_token


class CredentialKind(str, enum.Enum):
    API_KEY = "api_key"
    SESSION_JWT = "session_jwt"
    OAUTH_ACCESS = "oauth_access"


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

    def __post_init__(self):
        # Scopes granted to a token are strings off the wire, and the
        # wildcard is not a string, so it cannot get in that way; this
        # also refuses code that hands an OAuth token the wildcard
        # (CHT-1562 review, S1). Only API keys and session JWTs carry it.
        if self.kind is CredentialKind.OAUTH_ACCESS and (
            ALL in self.scopes or not all(isinstance(s, str) for s in self.scopes)
        ):
            raise ValueError("an OAuth access token carries the scopes it was granted, never the wildcard")

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
    OAuth access tokens get their own shape here (CHT-1520), checked
    before the session-JWT fallback."""
    if token.startswith("ck_"):
        return CredentialKind.API_KEY
    return CredentialKind.SESSION_JWT


async def _verify_session_jwt(token: str) -> Principal:
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


async def _verify_api_key(token: str) -> Principal:
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


_VERIFIERS: dict[CredentialKind, Callable[[str], Awaitable[Principal]]] = {
    CredentialKind.API_KEY: _verify_api_key,
    CredentialKind.SESSION_JWT: _verify_session_jwt,
    # CredentialKind.OAUTH_ACCESS: the TokenService verifier (CHT-1520).
}


class CredentialResolver:
    """Turns a presented credential into a ``Principal`` for one edge,
    which accepts the kinds in ``accepts``."""

    def __init__(self, accepts: frozenset[CredentialKind]):
        unknown = accepts - _VERIFIERS.keys()
        if unknown:
            raise ValueError(f"no verifier for {sorted(k.value for k in unknown)}")
        self.accepts = accepts

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
        return await _VERIFIERS[kind](token)


# The kinds each edge accepts.
REST_KINDS = frozenset({CredentialKind.API_KEY, CredentialKind.SESSION_JWT})
MCP_KINDS = frozenset({CredentialKind.API_KEY})

rest_resolver = CredentialResolver(REST_KINDS)
mcp_resolver = CredentialResolver(MCP_KINDS)
