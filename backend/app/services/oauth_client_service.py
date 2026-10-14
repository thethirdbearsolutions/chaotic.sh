"""OAuth clients: who may ask for authorization, and where its codes may
go (CHT-1518; design doc §2.2).

Three ways a client is known, all kept in ``oauth_clients`` keyed by the
client_id itself:

* **CIMD** (preferred): a URL-shaped client_id. ``resolve`` fetches the
  metadata document behind it (``app.oauth.cimd``, SSRF-hardened) and
  caches it in place for as long as its Cache-Control allows, clamped to
  [5 min, 24 h]. Past that it refetches, and a failed refetch fails
  closed. The row is updated, never replaced: sessions and tokens
  CASCADE from it, so deleting it would disconnect every user.
* **DCR** (RFC 7591 fallback, ``OAUTH_DCR_ENABLED``): ``register`` mints
  a ``dcr_<random>`` client_id for an unauthenticated caller. Rate
  limited per source address and capped globally on clients never used
  to authorize; those are refused by ``resolve`` 24 h after registering
  and deleted a little later (``gc_unused``, run lazily whenever a row
  is created).

Both caps are enforced atomically: the row is inserted first, inside a
transaction (the insert takes SQLite's write lock, so concurrent
creators queue), then counted, and the transaction is rolled back if
the count is over. A burst of parallel requests can't each read "one
under the limit" and all insert. New CIMD fetches are rate limited per
source address in memory (``app.oauth.ratelimit``), since a failed
fetch leaves no row to count.
* **Built-in** (``app.oauth.builtin``, CHT-1602): the first-party
  native apps, resolved from a constant in code and never fetched. Their
  row exists only because sessions and tokens reference it: ``resolve``
  writes it from the constant every time (so nothing stored can change
  the app's redirect), keeping ``is_active`` (an admin's disable stands).
* Known names (``app.oauth.clients.KNOWN_CLIENTS``): advisory, a
  "recognized" badge on consent; no rows.

Nothing here decides who the client may act as. That is consent
(CHT-1519).
"""
from __future__ import annotations

import hashlib
import hmac
import json
import secrets
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

from oxyde import IntegrityError, execute_raw
from app.db.transactions import atomic

from app.config import get_settings
from app.enums import OAuthClientRegistration
from app.oauth import cimd, ratelimit
from app.oauth.builtin import BuiltinClient, builtin_client, builtin_of
from app.oauth.clients import (
    DCR_MAX_CLIENT_NAME,
    KNOWN_CLIENTS,
    DCR_MAX_REDIRECT_URIS,
    dcr_redirect_uri_problem,
    is_loopback_redirect,
    known_client_name,
    redirect_host,
)
from app.oxyde_models.oauth import OxydeOAuthClient
from app.services.token_service import CLIENT_SECRET_PREFIX, mint_secret

KNOWN_CLIENT_IDS = frozenset(cid for known in KNOWN_CLIENTS for cid in known.client_ids)
DCR_PREFIX = "dcr_"
DCR_UNUSED_TTL = timedelta(hours=24)
# A DCR client is refused at DCR_UNUSED_TTL but deleted only this much
# later, so a consent begun just before the TTL doesn't lose its request
# (and the agent it is creating) to the cascade mid-approval.
DCR_GC_GRACE = timedelta(minutes=15)
DCR_RATE_WINDOW = timedelta(hours=1)
# Longer than an authorization request lives (10 minutes, CHT-1519).
CIMD_GC_CACHE_GRACE = timedelta(minutes=15)
DCR_GRANT_TYPES = ("authorization_code", "refresh_token")
DCR_AUTH_METHODS = ("none", "client_secret_post")


class OAuthClientError(Exception):
    """A registration or client lookup that must fail, as an OAuth error
    code (RFC 7591 §3.2.2 / RFC 6749 §5.2) and an HTTP status."""

    def __init__(self, error: str, description: str, status_code: int = 400):
        super().__init__(description)
        self.error = error
        self.description = description
        self.status_code = status_code


@dataclass(frozen=True)
class ClientIdentity:
    """How the consent page names a client (design §2.3)."""

    client_id: str
    name: str
    registration: OAuthClientRegistration
    # "builtin" (a first-party app built into this server, CHT-1602),
    # "recognized" (a known client's CIMD), "cimd" (a metadata document
    # from `host`), or "unverified" (registered dynamically; nothing
    # about it is proven).
    trust: str
    host: str | None  # the CIMD host
    redirect_hosts: tuple[str, ...]
    loopback_only: bool


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _clean_name(name: object) -> str | None:
    """A client-chosen name, made safe to display: control characters
    removed, whitespace collapsed, at most DCR_MAX_CLIENT_NAME characters."""
    if not isinstance(name, str):
        return None
    cleaned = " ".join("".join(c for c in name if c.isprintable()).split())
    return cleaned[:DCR_MAX_CLIENT_NAME] or None


def hash_ip(ip: str | None) -> str | None:
    """A keyed digest of a source address's rate-limit bucket (its IPv4
    address or IPv6 /64, ``ratelimit.address_bucket``), so the DCR rate
    limit needs no raw addresses at rest."""
    if not ip:
        return None
    bucket = ratelimit.address_bucket(ip)
    return hmac.new(get_settings().secret_key.encode(), bucket.encode(), hashlib.sha256).hexdigest()


def _too_many(description: str) -> OAuthClientError:
    return OAuthClientError("too_many_requests", description, 429)


def hash_client_secret(secret: str) -> str:
    return hashlib.sha256(secret.encode()).hexdigest()


def redirect_uris_of(client: OxydeOAuthClient) -> list[str]:
    """The client's registered redirect URIs. A built-in client's come
    from its constant, whatever its row says."""
    builtin = builtin_of(client)
    if builtin is not None:
        return list(builtin.redirect_uris)
    try:
        uris = json.loads(client.redirect_uris)
    except (TypeError, ValueError):
        return []
    return [u for u in uris if isinstance(u, str)] if isinstance(uris, list) else []


class OAuthClientService:
    # --- lookup ---------------------------------------------------------------

    async def resolve(self, client_id: str | None, *, source_ip: str | None) -> OxydeOAuthClient:
        """The client named by ``client_id``, fetched or refreshed if it
        is a CIMD URL. ``source_ip`` is who is asking, for the CIMD fetch
        rate limit. Required, so an HTTP caller can't forget it; None
        means not limited (an in-process caller, a test). Raises
        OAuthClientError ("invalid_client", or "too_many_requests")."""
        if not client_id:
            raise OAuthClientError("invalid_client", "client_id is required")
        builtin = builtin_client(client_id)
        if builtin is not None:
            return await self._resolve_builtin(builtin)
        if cimd.looks_like_cimd(client_id):
            return await self._resolve_cimd(client_id, source_ip)
        if client_id.startswith(DCR_PREFIX):
            row = await OxydeOAuthClient.objects.get_or_none(id=client_id)
            if (
                row is not None
                and row.registration == OAuthClientRegistration.DCR
                and row.is_active
                and not self._expired_unused(row, _now())
            ):
                return row
        raise OAuthClientError("invalid_client", "unknown client_id")

    @staticmethod
    async def _resolve_builtin(builtin: BuiltinClient) -> OxydeOAuthClient:
        """A built-in client's row, written from the constant (module
        docstring). Never fetched; no rate limit (nothing leaves the
        server)."""
        fields = dict(
            registration=OAuthClientRegistration.BUILTIN,
            client_name=builtin.name,
            redirect_uris=builtin.redirect_uris_json(),
            token_endpoint_auth_method="none",
            client_secret_hash=None,
            metadata_json=json.dumps(builtin.metadata()),
        )
        row = await OxydeOAuthClient.objects.get_or_none(id=builtin.client_id)
        if row is None:
            try:
                return await OxydeOAuthClient.objects.create(id=builtin.client_id, **fields)
            except IntegrityError:
                pass  # a concurrent authorize created it first
            row = await OxydeOAuthClient.objects.get(id=builtin.client_id)
        if any(getattr(row, name) != value for name, value in fields.items()):
            # In place, keeping is_active: an admin's disable stands. Only
            # when something differs: /oauth/authorize is unauthenticated,
            # and an unchanged row needs no write.
            await OxydeOAuthClient.objects.filter(id=builtin.client_id).update(**fields)
            row = await OxydeOAuthClient.objects.get(id=builtin.client_id)
        if not row.is_active:
            raise OAuthClientError("invalid_client", "this client has been disabled on this server")
        return row

    @staticmethod
    def _expired_unused(row: OxydeOAuthClient, now: datetime) -> bool:
        return row.last_authorized_at is None and row.created_at <= now - DCR_UNUSED_TTL

    async def _resolve_cimd(self, client_id: str, source_ip: str | None) -> OxydeOAuthClient:
        try:
            cimd.check_client_id_url(client_id)
        except cimd.CIMDError as exc:
            raise OAuthClientError("invalid_client", exc.description) from None
        now = _now()
        row = await OxydeOAuthClient.objects.get_or_none(id=client_id)
        if row is not None and not row.is_active:
            raise OAuthClientError("invalid_client", "this client has been disabled on this server")
        if row is not None and row.cache_expires_at is not None and row.cache_expires_at > now:
            return row
        settings = get_settings()
        if source_ip and not ratelimit.cimd_fetches.allow(
            ratelimit.address_bucket(source_ip), settings.oauth_cimd_fetch_max_per_ip_per_hour,
        ):
            raise _too_many("too many new client metadata documents requested from this address; try again later")
        try:
            fetched = await cimd.fetch(client_id)
            document = cimd.parse_client_metadata(client_id, fetched.body)
        except cimd.CIMDError as exc:
            # Fail closed: an expired cache is not served past its window.
            raise OAuthClientError("invalid_client", exc.description) from None
        fields = dict(
            registration=OAuthClientRegistration.CIMD,
            client_name=_clean_name(document.get("client_name")),
            redirect_uris=json.dumps(document["redirect_uris"]),
            token_endpoint_auth_method="none",
            metadata_json=fetched.body.decode("utf-8", errors="replace"),
            fetched_at=now,
            cache_expires_at=now + timedelta(seconds=cimd.cache_seconds(fetched.cache_control)),
        )
        if row is None:
            # A new row: sweep stale unused ones first, so naming fresh
            # URLs can't grow the table without bound.
            await self.gc_unused(now=now)
            try:
                async with atomic():
                    created = await OxydeOAuthClient.objects.create(id=client_id, **fields)
                    if known_client_name(client_id) is None:
                        pending = await self._count_pending(OAuthClientRegistration.CIMD)
                        if pending > settings.oauth_cimd_max_pending_clients:
                            raise _too_many(
                                "this server has too many unused client metadata documents; try again later",
                            )
                return created
            except IntegrityError:
                pass  # a concurrent authorize created it first; update it below
        # In place, keeping is_active: an admin's disable must survive a refetch.
        await OxydeOAuthClient.objects.filter(id=client_id).update(**fields)
        refreshed = await OxydeOAuthClient.objects.get(id=client_id)
        if not refreshed.is_active:
            raise OAuthClientError("invalid_client", "this client has been disabled on this server")
        return refreshed

    def identity(self, client: OxydeOAuthClient) -> ClientIdentity:
        builtin = builtin_of(client)
        if builtin is not None:
            # Named from the constant, not the row.
            return ClientIdentity(
                client_id=client.id,
                name=builtin.name,
                registration=client.registration,
                trust="builtin",
                host=None,
                redirect_hosts=tuple(dict.fromkeys(redirect_host(u) for u in builtin.redirect_uris)),
                loopback_only=False,
            )
        uris = redirect_uris_of(client)
        hosts = tuple(dict.fromkeys(redirect_host(u) for u in uris))
        if client.registration == OAuthClientRegistration.CIMD:
            host = redirect_host(client.id)
            known = known_client_name(client.id)
            trust = "recognized" if known else "cimd"
            name = known or client.client_name or host
        else:
            host = None
            trust = "unverified"
            name = client.client_name or "Unnamed app"
        return ClientIdentity(
            client_id=client.id,
            name=name,
            registration=client.registration,
            trust=trust,
            host=host,
            redirect_hosts=hosts,
            loopback_only=bool(uris) and all(is_loopback_redirect(u) for u in uris),
        )

    async def mark_authorized(self, client_id: str) -> None:
        """A human approved an authorization for this client: from now on
        it is not an unused registration."""
        await OxydeOAuthClient.objects.filter(id=client_id).update(last_authorized_at=_now())

    # --- dynamic registration -------------------------------------------------

    async def register(self, metadata: dict, *, source_ip: str | None) -> tuple[OxydeOAuthClient, str | None]:
        """RFC 7591 registration. Returns (row, raw client_secret or None).
        Raises OAuthClientError."""
        settings = get_settings()
        clean = self._validate_registration(metadata)
        now = _now()
        await self.gc_unused(now=now)
        ip_hash = hash_ip(source_ip)
        secret = None
        if clean["token_endpoint_auth_method"] == "client_secret_post":
            secret = mint_secret(CLIENT_SECRET_PREFIX)
        # Insert, then count, in one transaction (module docstring).
        async with atomic():
            row = await OxydeOAuthClient.objects.create(
                id=DCR_PREFIX + secrets.token_hex(16),
                registration=OAuthClientRegistration.DCR,
                client_name=clean["client_name"],
                redirect_uris=json.dumps(clean["redirect_uris"]),
                token_endpoint_auth_method=clean["token_endpoint_auth_method"],
                client_secret_hash=hash_client_secret(secret) if secret else None,
                metadata_json=json.dumps(clean),
                registered_ip_hash=ip_hash,
                created_at=now,
            )
            if ip_hash is not None:
                # Raw SQL: Oxyde has no range lookups on DateTimeUTC fields
                # (see IssueService.release_lease_if_expired). Enums are
                # stored by name.
                rows = await execute_raw(
                    "SELECT COUNT(*) AS n FROM oauth_clients "
                    "WHERE registration = ? AND registered_ip_hash = ? AND created_at >= ?",
                    [OAuthClientRegistration.DCR.name, ip_hash, now - DCR_RATE_WINDOW],
                )
                if rows[0]["n"] > settings.oauth_dcr_max_per_ip_per_hour:
                    raise _too_many("too many client registrations from this address; try again later")
            if await self._count_pending(OAuthClientRegistration.DCR) > settings.oauth_dcr_max_pending_clients:
                raise _too_many("this server has too many unused client registrations; try again later")
        return row, secret

    @staticmethod
    async def _count_pending(registration: OAuthClientRegistration) -> int:
        """Clients of this kind never used to authorize, not counting the
        known clients (which are exempt from the CIMD cap)."""
        known = sorted(KNOWN_CLIENT_IDS)
        placeholders = ", ".join("?" for _ in known) or "''"
        rows = await execute_raw(
            "SELECT COUNT(*) AS n FROM oauth_clients WHERE registration = ? "
            f"AND last_authorized_at IS NULL AND id NOT IN ({placeholders})",
            [registration.name, *known],
        )
        return rows[0]["n"]

    @staticmethod
    def _validate_registration(metadata: dict) -> dict:
        """What is kept of a registration request: redirect_uris, the
        cleaned client_name, auth method, grant and response types, scope.
        ``logo_uri``, ``client_uri`` and everything else are ignored, so
        no attacker-chosen imagery or links reach the consent page."""

        def bad(description: str, error: str = "invalid_client_metadata"):
            return OAuthClientError(error, description)

        uris = metadata.get("redirect_uris")
        if not isinstance(uris, list) or not uris:
            raise bad("redirect_uris is required", "invalid_redirect_uri")
        if len(uris) > DCR_MAX_REDIRECT_URIS:
            raise bad(f"at most {DCR_MAX_REDIRECT_URIS} redirect_uris", "invalid_redirect_uri")
        for uri in uris:
            problem = dcr_redirect_uri_problem(uri)
            if problem:
                raise bad(problem, "invalid_redirect_uri")
        method = metadata.get("token_endpoint_auth_method", "none")
        if method not in DCR_AUTH_METHODS:
            raise bad(f"token_endpoint_auth_method must be one of {', '.join(DCR_AUTH_METHODS)}")
        grant_types = metadata.get("grant_types", ["authorization_code", "refresh_token"])
        if (
            not isinstance(grant_types, list)
            or not grant_types
            or not all(g in DCR_GRANT_TYPES for g in grant_types)
            or "authorization_code" not in grant_types
        ):
            raise bad("grant_types must include authorization_code and may add only refresh_token")
        response_types = metadata.get("response_types", ["code"])
        if response_types != ["code"]:
            raise bad('response_types must be ["code"]')
        scope = metadata.get("scope")
        if scope is not None and (not isinstance(scope, str) or len(scope) > 512):
            raise bad("scope must be a space-separated string")
        name = metadata.get("client_name")
        if name is not None and not isinstance(name, str):
            raise bad("client_name must be a string")
        return {
            "redirect_uris": list(dict.fromkeys(uris)),
            "client_name": _clean_name(name),
            "token_endpoint_auth_method": method,
            "grant_types": list(dict.fromkeys(grant_types)),
            "response_types": ["code"],
            "scope": scope,
        }

    async def gc_unused(self, *, now: datetime | None = None) -> int:
        """Delete clients never used to authorize within DCR_UNUSED_TTL
        (plus DCR_GC_GRACE) of their creation. Only never-authorized rows:
        a client that ever authorized may have sessions that CASCADE from
        it.

        CIMD rows too, since any unauthenticated /oauth/authorize can
        create one by naming a new URL, but only once their cache has been
        expired for longer than a consent request lives
        (CIMD_GC_CACHE_GRACE), so no consent in progress loses its
        request to the cascade. A collected CIMD client is simply fetched
        again next time."""
        now = now or _now()
        rows = await execute_raw(
            "DELETE FROM oauth_clients WHERE last_authorized_at IS NULL AND ("
            "(registration = ? AND created_at <= ?) "
            "OR (registration = ? AND created_at <= ? AND cache_expires_at <= ?)) RETURNING id",
            [
                OAuthClientRegistration.DCR.name,
                now - DCR_UNUSED_TTL - DCR_GC_GRACE,
                OAuthClientRegistration.CIMD.name,
                now - DCR_UNUSED_TTL,
                now - CIMD_GC_CACHE_GRACE,
            ],
        )
        return len(rows)
