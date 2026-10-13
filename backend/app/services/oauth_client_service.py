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
  limited per source IP and capped globally on clients never used to
  authorize; those are deleted 24 h after registering (``gc_unused``,
  run lazily by ``register``) and refused by ``resolve`` past that age
  even before the sweep reaches them.
* Built-in names (``app.oauth.clients.KNOWN_CLIENTS``): advisory, a
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

from app.config import get_settings
from app.enums import OAuthClientRegistration
from app.oauth import cimd
from app.oauth.clients import (
    DCR_MAX_CLIENT_NAME,
    DCR_MAX_REDIRECT_URIS,
    dcr_redirect_uri_problem,
    is_loopback_redirect,
    known_client_name,
    redirect_host,
)
from app.oxyde_models.oauth import OxydeOAuthClient

DCR_PREFIX = "dcr_"
DCR_UNUSED_TTL = timedelta(hours=24)
DCR_RATE_WINDOW = timedelta(hours=1)
CLIENT_SECRET_PREFIX = "ccs_"
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
    """A keyed digest of a source IP, so the DCR rate limit needs no raw
    addresses at rest."""
    if not ip:
        return None
    return hmac.new(get_settings().secret_key.encode(), ip.encode(), hashlib.sha256).hexdigest()


def hash_client_secret(secret: str) -> str:
    return hashlib.sha256(secret.encode()).hexdigest()


def redirect_uris_of(client: OxydeOAuthClient) -> list[str]:
    try:
        uris = json.loads(client.redirect_uris)
    except (TypeError, ValueError):
        return []
    return [u for u in uris if isinstance(u, str)] if isinstance(uris, list) else []


class OAuthClientService:
    # --- lookup ---------------------------------------------------------------

    async def resolve(self, client_id: str | None) -> OxydeOAuthClient:
        """The client named by ``client_id``, fetched or refreshed if it
        is a CIMD URL. Raises OAuthClientError("invalid_client")."""
        if not client_id:
            raise OAuthClientError("invalid_client", "client_id is required")
        if cimd.looks_like_cimd(client_id):
            return await self._resolve_cimd(client_id)
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
    def _expired_unused(row: OxydeOAuthClient, now: datetime) -> bool:
        return row.last_authorized_at is None and row.created_at <= now - DCR_UNUSED_TTL

    async def _resolve_cimd(self, client_id: str) -> OxydeOAuthClient:
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
            try:
                return await OxydeOAuthClient.objects.create(id=client_id, **fields)
            except IntegrityError:
                pass  # a concurrent authorize created it first; update it below
        # In place, keeping is_active: an admin's disable must survive a refetch.
        await OxydeOAuthClient.objects.filter(id=client_id).update(**fields)
        refreshed = await OxydeOAuthClient.objects.get(id=client_id)
        if not refreshed.is_active:
            raise OAuthClientError("invalid_client", "this client has been disabled on this server")
        return refreshed

    def identity(self, client: OxydeOAuthClient) -> ClientIdentity:
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
        if ip_hash is not None:
            # Raw SQL: Oxyde has no range lookups on DateTimeUTC fields
            # (see IssueService.release_lease_if_expired). Enums are
            # stored by name.
            rows = await execute_raw(
                "SELECT COUNT(*) AS n FROM oauth_clients "
                "WHERE registration = ? AND registered_ip_hash = ? AND created_at >= ?",
                [OAuthClientRegistration.DCR.name, ip_hash, now - DCR_RATE_WINDOW],
            )
            recent = rows[0]["n"]
            if recent >= settings.oauth_dcr_max_per_ip_per_hour:
                raise OAuthClientError(
                    "too_many_requests", "too many client registrations from this address; try again later", 429,
                )
        pending = await OxydeOAuthClient.objects.filter(
            registration=OAuthClientRegistration.DCR, last_authorized_at__isnull=True,
        ).count()
        if pending >= settings.oauth_dcr_max_pending_clients:
            raise OAuthClientError(
                "too_many_requests", "this server has too many unused client registrations; try again later", 429,
            )
        secret = None
        if clean["token_endpoint_auth_method"] == "client_secret_post":
            secret = CLIENT_SECRET_PREFIX + secrets.token_hex(32)
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
        return row, secret

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
        """Delete DCR clients that have not been used to authorize within
        DCR_UNUSED_TTL of registering. Only never-authorized DCR rows: a
        client that ever authorized has sessions that CASCADE from it."""
        now = now or _now()
        rows = await execute_raw(
            "DELETE FROM oauth_clients WHERE registration = ? AND last_authorized_at IS NULL "
            "AND created_at <= ? RETURNING id",
            [OAuthClientRegistration.DCR.name, now - DCR_UNUSED_TTL],
        )
        return len(rows)
