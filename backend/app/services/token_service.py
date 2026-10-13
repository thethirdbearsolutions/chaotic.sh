"""TokenService: mint, validate, rotate and revoke the short-lived tokens
in the token store (CHT-1516; design doc "MCP OAuth and token service:
design" §2.4, §2.5, §4.1, §4.2).

Tokens are opaque and prefixed: ``cac_`` authorization code, ``cat_``
access token, ``crt_`` refresh token and ``cct_`` claim ticket, each
followed by 64 hex characters (256 bits). They are never JWTs signed with
``SECRET_KEY``, so a token cannot be mistaken for a login JWT and does not
depend on that key (design §1, threat S2). Only a SHA-256 digest is
stored (``auth_tokens.token_hash``, unique), and every lookup is by that
digest, as for ``api_keys`` since CHT-1534.

Holder sessions (``holder_sessions``) are what tokens hang off. Each
names the user it acts as and the human who answers for it (ADR-0008);
neither comes from anything the bearer asserts.

What this module does not do yet:

* It is not wired into authentication. ``validate_access`` returns a
  ``ValidatedToken`` with everything a principal needs (who it acts as,
  who holds it, team and project scope, scopes, policy, expiry), and the
  CredentialResolver of CHT-1560 turns that into the request's principal
  for REST and /mcp alike. That is also where the per-request checks
  that are not about the token belong, as for a ``ck_`` key today: the
  principal is active, and an agent principal's holder is still in the
  agent's team. Scope enforcement is CHT-1562. Until then a ``cat_``
  bearer is refused everywhere (REST decodes it as a JWT and fails; /mcp
  takes only ``ck_``).
* Endpoints: the token endpoint and code exchange are CHT-1520, claim
  grants CHT-1447, and the RevocationService with cascades CHT-1449.
  ``revoke_session`` here is the one primitive they build on.

Everything refuses while ``OAUTH_ENABLED`` is off.

The validation cache and the refresh grace window live in this process.
Chaotic runs one process (design §4.2), so a revocation bumps a
process-wide epoch and the very next validation re-reads the database.
A multi-worker deployment would need the epoch in the database.
"""
from __future__ import annotations

import asyncio
import hashlib
import json
import logging
import secrets
import time
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

from app.config import get_settings
from app.enums import HolderVia, TokenKind
from app.oxyde_models.oauth import OxydeAuthToken, OxydeHolderSession, OxydeRevocationEvent

logger = logging.getLogger(__name__)

TOKEN_PREFIXES: dict[TokenKind, str] = {
    TokenKind.AUTH_CODE: "cac_",
    TokenKind.ACCESS: "cat_",
    TokenKind.REFRESH: "crt_",
    TokenKind.CLAIM_TICKET: "cct_",
}
# Every bearer prefix this server mints, `ck_` keys included. Log
# redaction keys on these (app.mcp_server.auth).
ALL_SECRET_PREFIXES: tuple[str, ...] = ("ck_",) + tuple(TOKEN_PREFIXES.values())

DISPLAY_PREFIX_LENGTH = 8
# `holder_sessions.holder` is display-only metadata (label, runtime, client
# name; design I7) and is size-capped.
HOLDER_JSON_MAX = 2048
MCP_RESOURCE_PATH = "/mcp"

# A replay of the immediately previous refresh token within this window
# gets the same successor pair back instead of revoking the session:
# hosted clients really do send concurrent refreshes (design §2.4, S11).
REFRESH_GRACE = timedelta(seconds=30)
# How long a validated access token is trusted without re-reading the
# database, unless the revocation epoch moves first (design §4.2, I4).
VALIDATION_CACHE_SECONDS = 30.0
_VALIDATION_CACHE_MAX = 10_000
# `last_used_at` is informational; write it at most this often (as for keys).
LAST_USED_WRITE_INTERVAL = timedelta(seconds=60)

REASON_REFRESH_REUSE = "refresh_reuse"
REASON_CODE_REUSE = "code_reuse"


class TokenError(Exception):
    """A token request that must fail. ``error`` is the OAuth error code
    the endpoint should answer with: ``invalid_grant`` for a code, ticket
    or refresh token, ``invalid_token`` for an access token, or
    ``invalid_scope``."""

    def __init__(self, error: str, description: str):
        super().__init__(description)
        self.error = error
        self.description = description


class OAuthDisabledError(TokenError):
    def __init__(self):
        super().__init__("temporarily_unavailable", "OAuth is not enabled on this server (OAUTH_ENABLED)")


@dataclass(frozen=True)
class ValidatedToken:
    """What a valid access token proves. Everything the CredentialResolver
    (CHT-1560) needs to build the request's principal."""

    token_id: str
    holder_session_id: str
    via: HolderVia
    principal_user_id: str
    holder_user_id: str
    team_id: str
    scope_project_ids: tuple[str, ...] | None  # None: the whole team
    scopes: tuple[str, ...]
    policy_name: str
    resource: str
    oauth_client_id: str | None
    credential_id: str | None
    expires_at: datetime


@dataclass(frozen=True)
class IssuedTokens:
    """A token response's worth of tokens. The raw values exist only here."""

    access_token: str
    access_expires_at: datetime
    refresh_token: str | None
    refresh_expires_at: datetime | None
    scopes: tuple[str, ...]
    holder_session_id: str

    def expires_in(self, now: datetime | None = None) -> int:
        now = now or _now()
        return max(0, int((self.access_expires_at - now).total_seconds()))


def _now() -> datetime:
    return datetime.now(timezone.utc)


def token_digest(raw: str) -> str:
    """Hex SHA-256 of a whole token: what `auth_tokens.token_hash` holds.
    The tokens are 256 random bits, so a plain digest is enough (as for
    `ck_` keys, CHT-1369)."""
    return hashlib.sha256(raw.encode()).hexdigest()


def _new_token(kind: TokenKind) -> str:
    return TOKEN_PREFIXES[kind] + secrets.token_hex(32)


def kind_of(raw: str) -> TokenKind | None:
    """The kind a raw token claims by its prefix, or None."""
    for kind, prefix in TOKEN_PREFIXES.items():
        if raw.startswith(prefix):
            return kind
    return None


def _split_scopes(scopes: str | None) -> tuple[str, ...]:
    return tuple(s for s in (scopes or "").split(" ") if s)


def _join_scopes(scopes) -> str:
    return " ".join(dict.fromkeys(scopes))


def _project_ids_json(project_ids) -> str | None:
    return None if project_ids is None else json.dumps(sorted(set(project_ids)))


def _project_ids(value: str | None) -> tuple[str, ...] | None:
    return None if value is None else tuple(json.loads(value))


def _require_enabled() -> None:
    if not get_settings().oauth_enabled:
        raise OAuthDisabledError()


def issuer() -> str:
    return get_settings().oauth_issuer


def mcp_resource() -> str:
    """The RFC 8707 resource of /mcp: OAuth connector tokens are issued
    for it and accepted nowhere else."""
    return issuer() + MCP_RESOURCE_PATH


def audience_accepts(token_resource: str, endpoint_resource: str) -> bool:
    """May a token issued for `token_resource` be used at an endpoint whose
    resource is `endpoint_resource` (I16)? Exactly its own resource; and a
    token issued for the whole server (`<base>`, claim holders) also at
    /mcp. A connector token (`<base>/mcp`) is never accepted on REST."""
    if token_resource == endpoint_resource:
        return True
    base = issuer()
    return token_resource == base and endpoint_resource == base + MCP_RESOURCE_PATH


# --- process-wide revocation epoch and caches --------------------------------

_epoch = 0
# token digest -> (monotonic time cached, epoch, validated token, session absolute expiry)
_validation_cache: dict[str, tuple[float, int, ValidatedToken, datetime]] = {}
# refresh token digest -> (successor pair, holder session id, grace deadline)
_grace_pairs: dict[str, tuple[IssuedTokens, str, datetime]] = {}
_refresh_lock = asyncio.Lock()


def revocation_epoch() -> int:
    return _epoch


def bump_revocation_epoch() -> int:
    """Invalidate every cached validation: the next request for any token
    re-reads the database (I4). Every revocation calls this."""
    global _epoch
    _epoch += 1
    _validation_cache.clear()
    return _epoch


def _reset_for_tests() -> None:
    global _epoch, _refresh_lock
    _epoch = 0
    _validation_cache.clear()
    _grace_pairs.clear()
    _refresh_lock = asyncio.Lock()


def _forget_grace_pairs(holder_session_id: str) -> None:
    for digest in [d for d, (_, sid, _) in _grace_pairs.items() if sid == holder_session_id]:
        del _grace_pairs[digest]


def _prune_grace_pairs(now: datetime) -> None:
    for digest in [d for d, (_, _, deadline) in _grace_pairs.items() if deadline < now]:
        del _grace_pairs[digest]


class TokenService:
    """Mint, validate, rotate and revoke. See the module docstring."""

    # --- minting ------------------------------------------------------------

    async def mint_single_use(
        self,
        kind: TokenKind,
        *,
        team_id: str,
        principal_user_id: str,
        holder_user_id: str,
        resource: str,
        scopes=(),
        policy_name: str = "write",
        scope_project_ids=None,
        oauth_client_id: str | None = None,
        minted_by_credential_id: str | None = None,
        code_challenge: str | None = None,
        redirect_uri: str | None = None,
        auth_request_id: str | None = None,
    ) -> tuple[OxydeAuthToken, str]:
        """Mint an authorization code (consent, CHT-1519) or a claim ticket
        (a grantee, CHT-1447). Both are bound to the principal they will
        start a session for and to the human answering for it. Returns
        (row, raw token); the raw token is not stored."""
        _require_enabled()
        settings = get_settings()
        if kind == TokenKind.AUTH_CODE:
            ttl = settings.oauth_code_ttl_seconds
            if not (oauth_client_id and code_challenge and redirect_uri):
                raise ValueError("an authorization code needs a client, a PKCE challenge and a redirect_uri")
        elif kind == TokenKind.CLAIM_TICKET:
            ttl = settings.claim_ticket_ttl_seconds
            if not minted_by_credential_id:
                raise ValueError("a claim ticket needs the credential that minted it")
        else:
            raise ValueError(f"{kind} is not single-use; use start_session or refresh")
        raw = _new_token(kind)
        row = await OxydeAuthToken.objects.create(
            kind=kind,
            token_hash=token_digest(raw),
            display_prefix=raw[:DISPLAY_PREFIX_LENGTH],
            team_id=team_id,
            principal_user_id=principal_user_id,
            holder_user_id=holder_user_id,
            oauth_client_id=oauth_client_id,
            minted_by_credential_id=minted_by_credential_id,
            resource=resource,
            scopes=_join_scopes(scopes),
            policy_name=policy_name,
            scope_project_ids=_project_ids_json(scope_project_ids),
            code_challenge=code_challenge,
            redirect_uri=redirect_uri,
            auth_request_id=auth_request_id,
            expires_at=_now() + timedelta(seconds=ttl),
        )
        return row, raw

    async def redeem_single_use(self, raw: str, kind: TokenKind) -> OxydeAuthToken:
        """Spend a code or claim ticket, exactly once. Returns its row, for
        the caller to check the bindings (client, redirect_uri, PKCE) and
        then ``start_session(..., from_token=row)``.

        A second redemption fails, and revokes the session the first one
        started (OAuth 2.1 §4.1.3: the code has leaked)."""
        _require_enabled()
        if kind not in (TokenKind.AUTH_CODE, TokenKind.CLAIM_TICKET) or kind_of(raw) != kind:
            raise TokenError("invalid_grant", "not a valid code")
        row = await OxydeAuthToken.objects.get_or_none(token_hash=token_digest(raw))
        if row is None or row.kind != kind or row.revoked_at is not None:
            raise TokenError("invalid_grant", "not a valid code")
        now = _now()
        if row.used_at is not None:
            await self._revoke_sessions_started_by(row, reason=REASON_CODE_REUSE)
            raise TokenError("invalid_grant", "this code was already used")
        if row.expires_at <= now:
            raise TokenError("invalid_grant", "this code has expired")
        spent = await OxydeAuthToken.objects.filter(id=row.id, used_at__isnull=True).update(used_at=now)
        if spent != 1:
            # Lost a race with a concurrent redemption: the same as reuse.
            await self._revoke_sessions_started_by(row, reason=REASON_CODE_REUSE)
            raise TokenError("invalid_grant", "this code was already used")
        row.used_at = now
        return row

    async def start_session(
        self,
        *,
        via: HolderVia,
        team_id: str,
        principal_user_id: str,
        holder_user_id: str,
        resource: str,
        scopes=(),
        policy_name: str = "write",
        scope_project_ids=None,
        oauth_client_id: str | None = None,
        credential_id: str | None = None,
        grant_id: str | None = None,
        holder: dict | None = None,
        offline: bool = True,
        from_token: OxydeAuthToken | None = None,
    ) -> IssuedTokens:
        """Create a holder session and issue its first access token, plus a
        refresh token when `offline` (OAuth: `offline_access` granted).
        `from_token` is the code or ticket just redeemed; the first tokens
        point back at it, so a replay of it can find this session."""
        _require_enabled()
        settings = get_settings()
        if via == HolderVia.OAUTH:
            idle, absolute = settings.oauth_refresh_idle_ttl_seconds, settings.oauth_refresh_absolute_ttl_seconds
        else:
            idle, absolute = settings.claim_refresh_idle_ttl_seconds, settings.claim_refresh_absolute_ttl_seconds
        holder_json = json.dumps(holder) if holder else None
        if holder_json is not None and len(holder_json) > HOLDER_JSON_MAX:
            raise ValueError(f"holder metadata is display-only and capped at {HOLDER_JSON_MAX} characters of JSON")
        now = _now()
        absolute_at = now + timedelta(seconds=absolute)
        session = await OxydeHolderSession.objects.create(
            team_id=team_id,
            principal_user_id=principal_user_id,
            holder_user_id=holder_user_id,
            via=via,
            oauth_client_id=oauth_client_id,
            credential_id=credential_id,
            grant_id=grant_id,
            scope_project_ids=_project_ids_json(scope_project_ids),
            policy_name=policy_name,
            resource=resource,
            scopes=_join_scopes(scopes),
            holder=holder_json,
            idle_expires_at=min(now + timedelta(seconds=idle), absolute_at),
            absolute_expires_at=absolute_at,
        )
        return await self._issue(
            session, scopes=_split_scopes(session.scopes), offline=offline,
            replaces_id=from_token.id if from_token is not None else None, now=now,
        )

    async def _issue(
        self, session: OxydeHolderSession, *, scopes, offline: bool, replaces_id: str | None, now: datetime,
    ) -> IssuedTokens:
        settings = get_settings()
        common = dict(
            holder_session_id=session.id,
            team_id=session.team_id,
            principal_user_id=session.principal_user_id,
            holder_user_id=session.holder_user_id,
            oauth_client_id=session.oauth_client_id,
            minted_by_credential_id=session.credential_id,
            resource=session.resource,
            policy_name=session.policy_name,
            scope_project_ids=session.scope_project_ids,
            replaces_id=replaces_id,
        )
        access = _new_token(TokenKind.ACCESS)
        access_expires = min(now + timedelta(seconds=settings.oauth_access_token_ttl_seconds), session.absolute_expires_at)
        await OxydeAuthToken.objects.create(
            kind=TokenKind.ACCESS, token_hash=token_digest(access), display_prefix=access[:DISPLAY_PREFIX_LENGTH],
            scopes=_join_scopes(scopes), expires_at=access_expires, **common,
        )
        refresh = refresh_expires = None
        if offline:
            refresh = _new_token(TokenKind.REFRESH)
            refresh_expires = session.idle_expires_at
            # A refresh token carries the session's scopes, not a narrowed
            # request's: narrowing applies to the access token it came with.
            await OxydeAuthToken.objects.create(
                kind=TokenKind.REFRESH, token_hash=token_digest(refresh),
                display_prefix=refresh[:DISPLAY_PREFIX_LENGTH], scopes=session.scopes,
                expires_at=refresh_expires, **common,
            )
        return IssuedTokens(
            access_token=access, access_expires_at=access_expires, refresh_token=refresh,
            refresh_expires_at=refresh_expires, scopes=tuple(scopes), holder_session_id=session.id,
        )

    # --- refresh -------------------------------------------------------------

    async def refresh(self, raw: str, *, oauth_client_id: str | None = None, scopes=None) -> IssuedTokens:
        """Rotate a refresh token (design §2.4). Single use: the token is
        spent and a new access + refresh pair issued. Presenting a spent
        token revokes the whole session (``refresh_reuse``) and tells the
        human who answers for it, except within REFRESH_GRACE of its use
        while its successor is still unspent, when the same successor pair
        comes back. `scopes` may only narrow. Every failure is
        ``invalid_grant`` (``invalid_scope`` for a widening)."""
        _require_enabled()
        if kind_of(raw) != TokenKind.REFRESH:
            raise TokenError("invalid_grant", "not a valid refresh token")
        digest = token_digest(raw)
        # One rotation at a time in this process, so a concurrent replay
        # sees the first rotation's successor pair (the grace path) rather
        # than racing it.
        async with _refresh_lock:
            return await self._refresh_locked(digest, oauth_client_id=oauth_client_id, scopes=scopes)

    async def _refresh_locked(self, digest: str, *, oauth_client_id, scopes) -> IssuedTokens:
        row = await OxydeAuthToken.objects.get_or_none(token_hash=digest)
        if row is None or row.kind != TokenKind.REFRESH or row.holder_session_id is None:
            raise TokenError("invalid_grant", "not a valid refresh token")
        if (row.oauth_client_id or None) != (oauth_client_id or None):
            raise TokenError("invalid_grant", "this refresh token was issued to another client")
        session = await OxydeHolderSession.objects.get_or_none(id=row.holder_session_id)
        now = _now()
        if session is None or session.revoked_at is not None or row.revoked_at is not None:
            raise TokenError("invalid_grant", "this connection has been revoked")
        if row.used_at is not None:
            replay = await self._grace_replay(row, digest, now)
            if replay is not None:
                return replay
            await self.revoke_session(session.id, actor_id=None, reason=REASON_REFRESH_REUSE)
            await self._notify_reuse(session)
            raise TokenError("invalid_grant", "this refresh token was already used; the connection has been revoked")
        if row.expires_at <= now or session.idle_expires_at <= now or session.absolute_expires_at <= now:
            raise TokenError("invalid_grant", "this refresh token has expired")

        granted = _split_scopes(session.scopes)
        if scopes is not None:
            requested = tuple(scopes) if not isinstance(scopes, str) else _split_scopes(scopes)
            if not set(requested) <= set(granted):
                raise TokenError("invalid_scope", "a refresh may only narrow the granted scope")
            granted = requested

        spent = await OxydeAuthToken.objects.filter(id=row.id, used_at__isnull=True).update(used_at=now)
        if spent != 1:  # pragma: no cover -- the lock above serialises this process
            raise TokenError("invalid_grant", "this refresh token was already used")

        settings = get_settings()
        idle = (
            settings.oauth_refresh_idle_ttl_seconds if session.via == HolderVia.OAUTH
            else settings.claim_refresh_idle_ttl_seconds
        )
        session.idle_expires_at = min(now + timedelta(seconds=idle), session.absolute_expires_at)
        session.last_refreshed_at = now
        await OxydeHolderSession.objects.filter(id=session.id).update(
            idle_expires_at=session.idle_expires_at, last_refreshed_at=now,
        )
        issued = await self._issue(session, scopes=granted, offline=True, replaces_id=row.id, now=now)
        # Held in memory only, for REFRESH_GRACE: the raw values are never
        # stored, so a restart inside the window ends the grace (the replay
        # is then refused, without revoking: see _grace_replay).
        _prune_grace_pairs(now)
        _grace_pairs[digest] = (issued, session.id, now + REFRESH_GRACE)
        return issued

    async def _grace_replay(self, row: OxydeAuthToken, digest: str, now: datetime) -> IssuedTokens | None:
        """The successor pair for a replay of the immediately previous
        refresh token inside the grace window, or None if this is reuse.
        Inside the window with no pair to hand back (this process restarted
        since), the replay is refused without revoking: the client has
        the pair from the first response, or reconnects."""
        if row.used_at is None or now - row.used_at > REFRESH_GRACE:
            return None
        successor = await OxydeAuthToken.objects.filter(
            replaces_id=row.id, kind=TokenKind.REFRESH,
        ).first()
        if successor is None or successor.used_at is not None or successor.revoked_at is not None:
            return None
        cached = _grace_pairs.get(digest)
        if cached is None:
            raise TokenError("invalid_grant", "this refresh token was just used; use the tokens it returned")
        return cached[0]

    async def _notify_reuse(self, session: OxydeHolderSession) -> None:
        from app.oxyde_models.user import OxydeUser
        from app.services.inbox_service import InboxService

        try:
            principal = await OxydeUser.objects.get_or_none(id=session.principal_user_id)
            await InboxService().notify_connection_revoked_for_reuse(session=session, principal=principal)
        except Exception:  # the revocation stands whatever happens to the notice
            logger.exception("could not post the refresh-reuse notice for holder session %s", session.id)

    # --- validation ----------------------------------------------------------

    async def validate_access(self, raw: str, *, resource: str) -> ValidatedToken:
        """Check an access token for use at `resource` (design §4.2): an
        unexpired, unrevoked ``ACCESS`` token on an unrevoked session
        inside its absolute lifetime, issued for this resource (I16).
        Raises ``TokenError("invalid_token")`` otherwise.

        Cached for VALIDATION_CACHE_SECONDS per digest, stamped with the
        revocation epoch, so a revocation takes effect on the next request.
        Not checked here (CHT-1560): the principal is active, and an agent
        principal's holder is still in its team."""
        _require_enabled()
        if kind_of(raw) != TokenKind.ACCESS:
            raise TokenError("invalid_token", "not an access token")
        digest = token_digest(raw)
        now = _now()
        validated = self._cached(digest, now)
        if validated is None:
            validated = await self._validate_from_db(digest, now)
        if not audience_accepts(validated.resource, resource):
            raise TokenError("invalid_token", "this token was not issued for this resource")
        return validated

    def _cached(self, digest: str, now: datetime) -> ValidatedToken | None:
        entry = _validation_cache.get(digest)
        if entry is None:
            return None
        cached_at, epoch, validated, absolute = entry
        if (
            epoch != _epoch
            or time.monotonic() - cached_at > VALIDATION_CACHE_SECONDS
            or validated.expires_at <= now
            or absolute <= now
        ):
            _validation_cache.pop(digest, None)
            return None
        return validated

    async def _validate_from_db(self, digest: str, now: datetime) -> ValidatedToken:
        epoch = _epoch
        row = await OxydeAuthToken.objects.get_or_none(token_hash=digest)
        if (
            row is None
            or row.kind != TokenKind.ACCESS
            or row.holder_session_id is None
            or row.revoked_at is not None
            or row.expires_at <= now
        ):
            raise TokenError("invalid_token", "the access token is invalid or has expired")
        session = await OxydeHolderSession.objects.get_or_none(id=row.holder_session_id)
        if session is None or session.revoked_at is not None or session.absolute_expires_at <= now:
            raise TokenError("invalid_token", "the access token's connection has been revoked or has expired")
        if session.last_used_at is None or now - session.last_used_at >= LAST_USED_WRITE_INTERVAL:
            await OxydeHolderSession.objects.filter(id=session.id).update(last_used_at=now)
        validated = ValidatedToken(
            token_id=row.id,
            holder_session_id=session.id,
            via=session.via,
            principal_user_id=session.principal_user_id,
            holder_user_id=session.holder_user_id,
            team_id=session.team_id,
            scope_project_ids=_project_ids(row.scope_project_ids),
            scopes=_split_scopes(row.scopes),
            policy_name=row.policy_name,
            resource=row.resource,
            oauth_client_id=session.oauth_client_id,
            credential_id=session.credential_id,
            expires_at=row.expires_at,
        )
        # Only cache what was read under the current epoch: a revocation
        # that landed while this was reading must not be papered over.
        if epoch == _epoch:
            if len(_validation_cache) >= _VALIDATION_CACHE_MAX:
                _validation_cache.clear()
            _validation_cache[digest] = (time.monotonic(), epoch, validated, session.absolute_expires_at)
        return validated

    # --- revocation ----------------------------------------------------------

    async def revoke_session(self, holder_session_id: str, *, actor_id: str | None, reason: str) -> bool:
        """Revoke a holder session and every token on it, record it in
        `revocation_events`, and bump the revocation epoch. Returns False
        if it was already revoked (nothing is written then). Deliberately
        not gated on OAUTH_ENABLED: turning OAuth off must never stop a
        revocation."""
        now = _now()
        revoked = await OxydeHolderSession.objects.filter(id=holder_session_id, revoked_at__isnull=True).update(
            revoked_at=now, revoked_by_id=actor_id, revoked_reason=reason,
        )
        bump_revocation_epoch()
        _forget_grace_pairs(holder_session_id)
        if revoked != 1:
            return False
        tokens = await OxydeAuthToken.objects.filter(
            holder_session_id=holder_session_id, revoked_at__isnull=True,
        ).update(revoked_at=now)
        session = await OxydeHolderSession.objects.get_or_none(id=holder_session_id)
        await OxydeRevocationEvent.objects.create(
            team_id=session.team_id if session else None,
            actor_id=actor_id,
            target_type="holder_session",
            target_id=holder_session_id,
            cascade_counts=json.dumps({"auth_tokens": tokens}),
            reason=reason,
        )
        return True

    async def _revoke_sessions_started_by(self, token: OxydeAuthToken, *, reason: str) -> None:
        started = await OxydeAuthToken.objects.filter(replaces_id=token.id, holder_session_id__isnull=False).all()
        for session_id in {t.holder_session_id for t in started}:
            await self.revoke_session(session_id, actor_id=None, reason=reason)
