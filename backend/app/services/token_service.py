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

Revocation epoch (design §4.2, I4). Every revocation writes a
``revocation_events`` row whose ``seq`` is one more than the newest, in
the same transaction that revokes. The newest ``seq`` is the epoch: each
validation reads it (one indexed single-row read) and trusts a cached
token row only if it was cached under the same epoch, so a revocation
made by any process, or by an admin script that goes through
``revoke_session``, is seen on the very next request everywhere. Rule:
every revocation goes through ``revoke_session``. A cascade DELETE (a
user, team, client or key deleted) writes no event, so a cached
validation of a token deleted that way can outlive it by up to
VALIDATION_CACHE_SECONDS.

Still per process: the refresh lock and the grace pairs. Across
processes, two concurrent refreshes of one token race on a conditional
update; the loser is refused (no revocation), not handed the pair.
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
from oxyde import atomic

from app.enums import HolderVia, RevocationTarget, TokenKind
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


# --- revocation epoch and process-local state ---------------------------------


async def revocation_epoch() -> int:
    """The newest `revocation_events.seq` (0 before any revocation): one
    indexed single-row read. Any revocation, in any process, moves it."""
    newest = await OxydeRevocationEvent.objects.order_by("-seq").first()
    return newest.seq if newest is not None else 0


# token digest -> (monotonic time cached, epoch, validated token, session absolute expiry)
_validation_cache: dict[str, tuple[float, int, ValidatedToken, datetime]] = {}
# refresh token digest -> (successor pair, holder session id, grace deadline)
_grace_pairs: dict[str, tuple[IssuedTokens, str, datetime]] = {}
_refresh_lock = asyncio.Lock()


class _ReuseDetected(Exception):
    """Raised inside the refresh lock when a reuse revoked a session, so
    the notice is written after the lock is released."""

    def __init__(self, session: OxydeHolderSession):
        super().__init__(session.id)
        self.session = session


def _reset_for_tests() -> None:
    global _refresh_lock
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
        """Spend a code or claim ticket, exactly once. Returns its row, to
        pass to ``start_session_from`` after checking what only the caller
        can (the client's redirect_uri and PKCE verifier for a code).

        A second redemption fails, revokes the code, and revokes the
        session the first one started (OAuth 2.1 §4.1.3). Whichever order
        that lands in relative to ``start_session_from``, the outcome is
        the same: before, the session is refused; after, it is revoked."""
        _require_enabled()
        if kind not in (TokenKind.AUTH_CODE, TokenKind.CLAIM_TICKET) or kind_of(raw) != kind:
            raise TokenError("invalid_grant", "not a valid code")
        row = await OxydeAuthToken.objects.get_or_none(token_hash=token_digest(raw))
        if row is None or row.kind != kind or row.revoked_at is not None:
            raise TokenError("invalid_grant", "not a valid code")
        now = _now()
        if row.used_at is not None:
            await self._revoke_code(row.id)
            raise TokenError("invalid_grant", "this code was already used")
        if row.expires_at <= now:
            raise TokenError("invalid_grant", "this code has expired")
        spent = await OxydeAuthToken.objects.filter(
            id=row.id, used_at__isnull=True, revoked_at__isnull=True,
        ).update(used_at=now)
        if spent != 1:
            # A concurrent redemption won: the same as reuse.
            await self._revoke_code(row.id)
            raise TokenError("invalid_grant", "this code was already used")
        row.used_at = now
        return row

    async def _revoke_code(self, code_id: str) -> None:
        """Mark a code or ticket revoked, and revoke the session it started
        if it started one, in one transaction (the revoking UPDATE comes
        first, so it holds SQLite's write lock before reading the link)."""
        async with atomic():
            await OxydeAuthToken.objects.filter(id=code_id, revoked_at__isnull=True).update(revoked_at=_now())
            code = await OxydeAuthToken.objects.get_or_none(id=code_id)
            if code is not None and code.holder_session_id is not None:
                await self._revoke_session_in_tx(code.holder_session_id, actor_id=None, reason=REASON_CODE_REUSE)
        if code is not None and code.holder_session_id is not None:
            _forget_grace_pairs(code.holder_session_id)

    async def start_session_from(self, redeemed: OxydeAuthToken, *, scopes=None, holder: dict | None = None,
                                 grant_id: str | None = None) -> IssuedTokens:
        """Start the holder session a just-redeemed code or claim ticket
        was minted for, and issue its first tokens.

        Everything that was consented to comes from the code row: team,
        principal, holder, resource, scopes, policy, project scope, and
        the client (codes) or minting credential (tickets). `scopes` may
        only narrow. The session is refused unless the code is spent by
        the redemption that returned `redeemed`, not revoked, and has not
        started a session yet; the link (`auth_tokens.holder_session_id`
        on the code) is set in the same transaction, so a code starts at
        most one session and a reuse can always find it."""
        _require_enabled()
        if redeemed.kind == TokenKind.AUTH_CODE:
            via = HolderVia.OAUTH
        elif redeemed.kind == TokenKind.CLAIM_TICKET:
            via = HolderVia.CLAIM_TICKET
        else:
            raise TokenError("invalid_grant", "not a code or claim ticket")
        granted = _split_scopes(redeemed.scopes)
        if scopes is not None:
            requested = _split_scopes(scopes) if isinstance(scopes, str) else tuple(scopes)
            if not set(requested) <= set(granted):
                raise TokenError("invalid_scope", "the scope may only narrow what was granted")
            granted = requested
        offline = via != HolderVia.OAUTH or "offline_access" in granted
        now = _now()
        async with atomic():
            # The INSERT first, so this transaction holds the write lock
            # before it reads the code: a concurrent reuse either committed
            # before (the code is revoked; refused below) or waits and then
            # finds the link this sets.
            session = await self._create_session(
                via=via, team_id=redeemed.team_id, principal_user_id=redeemed.principal_user_id,
                holder_user_id=redeemed.holder_user_id, resource=redeemed.resource, scopes=redeemed.scopes,
                policy_name=redeemed.policy_name, scope_project_ids=redeemed.scope_project_ids,
                oauth_client_id=redeemed.oauth_client_id, credential_id=redeemed.minted_by_credential_id,
                grant_id=grant_id, holder=holder, now=now,
            )
            code = await OxydeAuthToken.objects.get_or_none(id=redeemed.id)
            bound = ("kind", "team_id", "principal_user_id", "holder_user_id", "resource", "scopes",
                     "policy_name", "scope_project_ids", "oauth_client_id", "minted_by_credential_id")
            if (
                code is None
                or any(getattr(code, f) != getattr(redeemed, f) for f in bound)
                or code.used_at is None
                or code.used_at != redeemed.used_at
                or code.revoked_at is not None
                or code.holder_session_id is not None
            ):
                raise TokenError("invalid_grant", "this code was not redeemed, or was revoked or already used")
            linked = await OxydeAuthToken.objects.filter(
                id=code.id, holder_session_id__isnull=True, revoked_at__isnull=True,
            ).update(holder_session_id=session.id)
            if linked != 1:  # pragma: no cover -- the write lock makes the read above current
                raise TokenError("invalid_grant", "this code was already used")
            return await self._issue(session, scopes=granted, offline=offline, replaces_id=None, now=now)

    async def start_session(
        self,
        *,
        team_id: str,
        principal_user_id: str,
        holder_user_id: str,
        credential_id: str,
        resource: str,
        scopes=(),
        policy_name: str = "write",
        scope_project_ids=None,
        grant_id: str | None = None,
        holder: dict | None = None,
        offline: bool = True,
    ) -> IssuedTokens:
        """Start a GRANTEE_CREDENTIAL holder session: a grantee's `ck_` key
        (`credential_id`), already authenticated and authorized by the
        caller (CHT-1447), claims the principal directly. OAuth and
        claim-ticket sessions come only from ``start_session_from``, so
        their bindings come from what was consented to."""
        _require_enabled()
        now = _now()
        async with atomic():
            session = await self._create_session(
                via=HolderVia.GRANTEE_CREDENTIAL, team_id=team_id, principal_user_id=principal_user_id,
                holder_user_id=holder_user_id, resource=resource, scopes=_join_scopes(scopes),
                policy_name=policy_name, scope_project_ids=_project_ids_json(scope_project_ids),
                oauth_client_id=None, credential_id=credential_id, grant_id=grant_id, holder=holder, now=now,
            )
            return await self._issue(session, scopes=_split_scopes(session.scopes), offline=offline,
                                     replaces_id=None, now=now)

    async def _create_session(self, *, via, team_id, principal_user_id, holder_user_id, resource, scopes,
                              policy_name, scope_project_ids, oauth_client_id, credential_id, grant_id, holder,
                              now) -> OxydeHolderSession:
        holder_json = json.dumps(holder) if holder else None
        if holder_json is not None and len(holder_json) > HOLDER_JSON_MAX:
            raise ValueError(f"holder metadata is display-only and capped at {HOLDER_JSON_MAX} characters of JSON")
        settings = get_settings()
        if via == HolderVia.OAUTH:
            idle, absolute = settings.oauth_refresh_idle_ttl_seconds, settings.oauth_refresh_absolute_ttl_seconds
        else:
            idle, absolute = settings.claim_refresh_idle_ttl_seconds, settings.claim_refresh_absolute_ttl_seconds
        absolute_at = now + timedelta(seconds=absolute)
        return await OxydeHolderSession.objects.create(
            team_id=team_id,
            principal_user_id=principal_user_id,
            holder_user_id=holder_user_id,
            via=via,
            oauth_client_id=oauth_client_id,
            credential_id=credential_id,
            grant_id=grant_id,
            scope_project_ids=scope_project_ids,
            policy_name=policy_name,
            resource=resource,
            scopes=scopes,
            holder=holder_json,
            idle_expires_at=min(now + timedelta(seconds=idle), absolute_at),
            absolute_expires_at=absolute_at,
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
        human who answers for it, except for one grace replay (see
        ``_grace_replay``). `scopes` may only narrow. Every failure is
        ``invalid_grant`` (``invalid_scope`` for a widening)."""
        _require_enabled()
        if kind_of(raw) != TokenKind.REFRESH:
            raise TokenError("invalid_grant", "not a valid refresh token")
        digest = token_digest(raw)
        # One rotation at a time in this process, so a concurrent replay
        # sees the first rotation's successor pair (the grace path) rather
        # than racing it.
        try:
            async with _refresh_lock:
                return await self._refresh_locked(digest, oauth_client_id=oauth_client_id, scopes=scopes)
        except _ReuseDetected as reuse:
            # Outside the lock: the notice (a DB write and a broadcast)
            # must not hold up every other refresh in the server.
            await self._notify_reuse(reuse.session)
            raise TokenError(
                "invalid_grant", "this refresh token was already used; the connection has been revoked",
            ) from None

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
            # A grace replay ignores a `scopes` narrowing: it hands back
            # exactly what the first response carried.
            replay = await self._grace_replay(row, digest, now)
            if replay is not None:
                return replay
            if await self.revoke_session(session.id, actor_id=None, reason=REASON_REFRESH_REUSE):
                raise _ReuseDetected(session)
            raise TokenError("invalid_grant", "this connection has been revoked")
        if row.expires_at <= now or session.idle_expires_at <= now or session.absolute_expires_at <= now:
            raise TokenError("invalid_grant", "this refresh token has expired")

        granted = _split_scopes(session.scopes)
        if scopes is not None:
            requested = tuple(scopes) if not isinstance(scopes, str) else _split_scopes(scopes)
            if not set(requested) <= set(granted):
                raise TokenError("invalid_scope", "a refresh may only narrow the granted scope")
            granted = requested

        settings = get_settings()
        idle = (
            settings.oauth_refresh_idle_ttl_seconds if session.via == HolderVia.OAUTH
            else settings.claim_refresh_idle_ttl_seconds
        )
        session.idle_expires_at = min(now + timedelta(seconds=idle), session.absolute_expires_at)
        session.last_refreshed_at = now
        async with atomic():
            # Spend first: the conditional UPDATE takes the write lock, so a
            # revocation either committed before (the session update below
            # matches nothing and this rolls back) or runs after and revokes
            # the tokens issued here too.
            spent = await OxydeAuthToken.objects.filter(id=row.id, used_at__isnull=True).update(used_at=now)
            if spent != 1:
                # Another process rotated it first. Refuse; no revocation.
                raise TokenError("invalid_grant", "this refresh token was already used")
            live = await OxydeHolderSession.objects.filter(id=session.id, revoked_at__isnull=True).update(
                idle_expires_at=session.idle_expires_at, last_refreshed_at=now,
            )
            if live != 1:
                raise TokenError("invalid_grant", "this connection has been revoked")
            issued = await self._issue(session, scopes=granted, offline=True, replaces_id=row.id, now=now)
        # Held in memory only, for REFRESH_GRACE: the raw values are never
        # stored, so a restart inside the window ends the grace.
        _prune_grace_pairs(now)
        _grace_pairs[digest] = (issued, session.id, now + REFRESH_GRACE)
        # A revocation that committed just after this rotation has already
        # revoked the new tokens; make sure it did not miss the pair.
        current = await OxydeHolderSession.objects.get_or_none(id=session.id)
        if current is None or current.revoked_at is not None:
            _forget_grace_pairs(session.id)
            raise TokenError("invalid_grant", "this connection has been revoked")
        return issued

    async def _grace_replay(self, row: OxydeAuthToken, digest: str, now: datetime) -> IssuedTokens | None:
        """The successor pair for a replay of the immediately previous
        refresh token, or None if this is reuse (the caller revokes).

        Grace is for the concurrent burst a hosted client really sends
        (design §2.4, S11), not a way to keep pace with the client: it
        applies only within REFRESH_GRACE of the rotation, while neither
        the successor refresh token nor the successor access token has
        been used, and only once per rotation. A replay inside the window
        with no pair to hand back (already replayed once, or this process
        restarted) is refused without revoking: nothing shows a second
        holder yet."""
        _prune_grace_pairs(now)
        if row.used_at is None or now - row.used_at > REFRESH_GRACE:
            return None
        successors = await OxydeAuthToken.objects.filter(replaces_id=row.id).all()
        refresh = [t for t in successors if t.kind == TokenKind.REFRESH]
        access = [t for t in successors if t.kind == TokenKind.ACCESS]
        if not refresh or any(t.used_at is not None or t.revoked_at is not None for t in refresh + access):
            return None
        cached = _grace_pairs.pop(digest, None)
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

        The token and session rows are cached for VALIDATION_CACHE_SECONDS
        per digest, stamped with the revocation epoch, which is read on
        every call (see the module docstring). Not checked here
        (CHT-1560): the principal is active, and an agent principal's
        holder is still in its team."""
        _require_enabled()
        if kind_of(raw) != TokenKind.ACCESS:
            raise TokenError("invalid_token", "not an access token")
        digest = token_digest(raw)
        now = _now()
        epoch = await revocation_epoch()
        validated = self._cached(digest, now, epoch)
        if validated is None:
            validated = await self._validate_from_db(digest, now, epoch)
        if not audience_accepts(validated.resource, resource):
            raise TokenError("invalid_token", "this token was not issued for this resource")
        return validated

    def _cached(self, digest: str, now: datetime, epoch: int) -> ValidatedToken | None:
        entry = _validation_cache.get(digest)
        if entry is None:
            return None
        cached_at, cached_epoch, validated, absolute = entry
        if (
            cached_epoch != epoch
            or time.monotonic() - cached_at > VALIDATION_CACHE_SECONDS
            or validated.expires_at <= now
            or absolute <= now
        ):
            _validation_cache.pop(digest, None)
            return None
        return validated

    async def _validate_from_db(self, digest: str, now: datetime, epoch: int) -> ValidatedToken:
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
        if row.used_at is None:
            # First use: from now on a replay of the refresh token that
            # issued this one is no longer a grace replay (_grace_replay).
            await OxydeAuthToken.objects.filter(id=row.id, used_at__isnull=True).update(used_at=now)
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
        # Stamped with the epoch read before the rows: a revocation that
        # lands while this reads moves the epoch past it, so the entry is
        # never trusted.
        if len(_validation_cache) >= _VALIDATION_CACHE_MAX:
            _validation_cache.clear()
        _validation_cache[digest] = (time.monotonic(), epoch, validated, session.absolute_expires_at)
        return validated

    # --- revocation ----------------------------------------------------------

    async def revoke_session(self, holder_session_id: str, *, actor_id: str | None, reason: str) -> bool:
        """Revoke a holder session and every token on it, and record it in
        `revocation_events` (which moves the epoch), all in one
        transaction. Returns False if it was already revoked; nothing is
        written then. Deliberately not gated on OAUTH_ENABLED: turning
        OAuth off must never stop a revocation. Every revocation of a
        session must come through here (module docstring)."""
        async with atomic():
            revoked = await self._revoke_session_in_tx(holder_session_id, actor_id=actor_id, reason=reason)
        _forget_grace_pairs(holder_session_id)
        return revoked

    async def _revoke_session_in_tx(self, holder_session_id: str, *, actor_id: str | None, reason: str) -> bool:
        now = _now()
        # The conditional UPDATE first: it takes the write lock, so the
        # token update and the epoch below see every token a concurrent
        # rotation issued before it.
        revoked = await OxydeHolderSession.objects.filter(id=holder_session_id, revoked_at__isnull=True).update(
            revoked_at=now, revoked_by_id=actor_id, revoked_reason=reason,
        )
        if revoked != 1:
            return False
        tokens = await OxydeAuthToken.objects.filter(
            holder_session_id=holder_session_id, revoked_at__isnull=True,
        ).update(revoked_at=now)
        session = await OxydeHolderSession.objects.get(id=holder_session_id)
        await OxydeRevocationEvent.objects.create(
            seq=await revocation_epoch() + 1,
            team_id=session.team_id,
            actor_id=actor_id,
            target_type=RevocationTarget.HOLDER_SESSION,
            target_id=holder_session_id,
            cascade_counts=json.dumps({"auth_tokens": tokens}),
            reason=reason,
        )
        return True
