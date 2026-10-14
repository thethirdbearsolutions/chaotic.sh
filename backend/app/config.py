"""Application configuration."""
import logging
import os
import ipaddress
from urllib.parse import urlsplit

from pydantic import AnyHttpUrl, Field, ValidationError, field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


logger = logging.getLogger(__name__)

DEFAULT_FORWARDED_ALLOW_IPS = "127.0.0.1,::1"

# Default DB lives next to the backend package so `just serve` from any cwd
# resolves to the same file. Production installs override via DATABASE_URL.
_DEFAULT_DB_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "chaotic.db")
)


class Settings(BaseSettings):
    """Application settings."""

    # App
    app_name: str = "Chaotic"
    debug: bool = False

    # Database
    database_url: str = f"sqlite+aiosqlite:///{_DEFAULT_DB_PATH}"

    # Security
    secret_key: str = "change-me-in-production-use-openssl-rand-hex-32"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24 * 7  # 7 days

    # Claim leases (CHT-1246): default duration for `issue start`/`claim`'s
    # self-claim lease, overridable per-call via `--lease`/`lease_seconds`.
    default_lease_minutes: int = 120  # 2 hours

    # Stale-intent TTL (CHT-1326): an open claim/close intent whose
    # initiating request failed (which is every open intent -- intents are
    # only created when the transition is blocked) stops excluding OTHER
    # principals after this many minutes, provided it has no unresolved
    # GATE blockers (those are actionable in the admin inbox and may
    # legitimately wait days for a human). A later claim/close by a
    # different user then cancels the stale intent (INTENT_CANCELED) and
    # opens a fresh one. 0 disables expiry (pre-CHT-1326 behavior).
    intent_ttl_minutes: int = 15

    # CORS: "*" or a comma-separated list of origins. An explicit list also
    # keys the DNS-rebinding guard on /mcp (mcp_server/asgi.py). With
    # OAUTH_ENABLED, the public OAuth endpoints answer any origin
    # regardless (CHT-1551, oauth/cors.py). See
    # docs/self-hosting-security.md, "CORS and browser-based MCP clients".
    cors_origins: str = "*"

    # Server
    host: str = "127.0.0.1"
    port: int = 24267

    # Reverse proxies whose X-Forwarded-For / X-Forwarded-Proto headers are
    # believed (CHT-1586): a comma-separated list of IP addresses and CIDR
    # networks. A request from one of them is treated as coming from the
    # client the proxy names, so the OAuth per-address limits key on the
    # real client rather than on the proxy. Requests from anywhere else
    # keep their socket address and their forwarded headers are ignored.
    # The default trusts a proxy on the same machine, the topology
    # docs/self-hosting-security.md recommends. Empty trusts nobody. The
    # operator owns this list: every address in it can claim to be any
    # client. An entry that is not usable ("*", a /0 network, a host
    # name, a typo) is logged as an error and dropped, keeping the rest;
    # with nothing left the default applies. The server never refuses to
    # start over it (PR #346 review). The same name as uvicorn's own
    # variable on purpose; every start path turns uvicorn's handling off
    # and this app applies the list itself (app.main).
    forwarded_allow_ips: str = DEFAULT_FORWARDED_ALLOW_IPS

    # Public base URL, used to build absolute links in outbound email
    # (invitation accept links). No scheme/host detection from requests --
    # explicit env var, same as everything else here.
    app_base_url: str = "http://localhost:24267"

    # OAuth 2.1 for remote MCP clients (CHT-1368; design doc "MCP OAuth
    # and token service: design" §2). Off by default: until the
    # authorize/token/revoke/register endpoints land (CHT-1518..1520),
    # turning it on would advertise endpoints that 404. When on, the
    # RFC 9728 / RFC 8414 discovery documents are served and a 401 on
    # /mcp points at them; the issuer is exactly APP_BASE_URL (never the
    # request Host), so APP_BASE_URL must then be an https origin, or a
    # loopback http one for a same-machine client (checked below).
    # When off, /mcp and both discovery paths behave as before CHT-1517
    # except that the discovery paths 404 instead of serving the SPA.
    oauth_enabled: bool = False
    # The capability URL /mcp/<api-key> (CHT-1522; design doc §5). It puts
    # a long-lived key in a URL, so it is deprecated in favour of OAuth:
    # while on, its responses carry a `Deprecation` header and startup
    # logs a warning. Off, /mcp/<key> answers 404; the key is still
    # scrubbed from the logged path (CapabilityPathRedaction stays
    # installed). The default flips to false in the release that ships
    # OAuth (decision D8) and the route is removed two releases later.
    mcp_capability_url_enabled: bool = True
    # Dynamic client registration (RFC 7591) at /oauth/register, the
    # fallback for MCP clients without CIMD support. On by default (design
    # decision D5); while on, the AS metadata advertises the endpoint.
    oauth_dcr_enabled: bool = True
    # DCR abuse limits (CHT-1518, threat S6): registrations per source
    # address (an IPv4 address or an IPv6 /64) per rolling hour, and how
    # many registered-but-never-authorized clients may exist at once. A
    # client never used for a successful authorization is deleted about
    # 24 hours after it registered.
    oauth_dcr_max_per_ip_per_hour: int = Field(10, ge=1)
    oauth_dcr_max_pending_clients: int = Field(500, ge=1)
    # The same for metadata-document (CIMD) clients, which any
    # /oauth/authorize can make this server fetch (CHT-1572): fetches of
    # a new or expired client_id per source address per rolling hour (per
    # server process), and how many never-authorized CIMD clients may be
    # stored at once (known clients are exempt).
    oauth_cimd_fetch_max_per_ip_per_hour: int = Field(30, ge=1)
    oauth_cimd_max_pending_clients: int = Field(500, ge=1)
    # /oauth/authorize requests per source address per minute (per process).
    oauth_authorize_max_per_ip_per_minute: int = Field(30, ge=1)
    # Token lifetimes (CHT-1516; design doc §2.5, decision D4). An access
    # token lives 10 minutes. A refresh token is single use; its session
    # stays refreshable while used at least once per idle window, up to the
    # absolute limit (OAuth connections: 30 days idle, 90 absolute, so a
    # human re-consents once a quarter; claim holders: 24 hours idle, 30
    # days absolute). Codes live 60 s and claim tickets 5 minutes.
    oauth_access_token_ttl_seconds: int = Field(600, ge=60)
    oauth_refresh_idle_ttl_seconds: int = Field(30 * 24 * 3600, ge=60)
    oauth_refresh_absolute_ttl_seconds: int = Field(90 * 24 * 3600, ge=60)
    claim_refresh_idle_ttl_seconds: int = Field(24 * 3600, ge=60)
    claim_refresh_absolute_ttl_seconds: int = Field(30 * 24 * 3600, ge=60)
    oauth_code_ttl_seconds: int = Field(60, ge=10)
    claim_ticket_ttl_seconds: int = Field(300, ge=10)

    # How often an open /ws connection re-checks its credential and team
    # membership (CHT-1603): a revoked, expired or deactivated credential,
    # or a member removed from the team, is closed at the next check.
    ws_auth_recheck_seconds: float = Field(30, gt=0)

    # Push notifications (CHT-1604). The server signs Web Push requests
    # with a VAPID key (RFC 8292). Empty derives one from SECRET_KEY, so a
    # server pushes with no setup; set this (a P-256 private key, PEM or
    # the raw 32 bytes base64url) to keep the key across a SECRET_KEY
    # rotation. Whichever it is, the app reads its public half from
    # GET /api/push/vapid-public-key; changing it means devices register
    # again.
    vapid_private_key: str = ""
    # VAPID's `sub` claim (RFC 8292): how a push service reaches whoever
    # runs this server, `mailto:` or `https:`. Empty: APP_BASE_URL when it
    # is https, else none (RFC 8292 says SHOULD; some services require it).
    vapid_subject: str = ""
    # The server POSTs to every registered push endpoint, so by default an
    # endpoint must be an https URL whose host resolves only to public
    # addresses (SSRF). True also accepts loopback, private and link-local
    # hosts: for a self-host whose ntfy runs on the same machine or LAN.
    push_allow_private_endpoints: bool = False

    # Email (SMTP) -- CHT-1251. Empty smtp_host means "unconfigured": the
    # mutating paths that would send email (gate-pending, invitations) log
    # and skip rather than erroring. See EmailService.is_configured().
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from: str = "noreply@chaotic.sh"

    # bcrypt work factor for password hashes. 12 is the production cost
    # (~250 ms per hash); the test suite sets BCRYPT_ROUNDS=4 so its two
    # fixture users per test do not dominate the run (CHT-1413). Hashes
    # made at any cost verify at any cost, so changing this never
    # invalidates stored passwords.
    # Bounded so a bad value fails when Settings is built at import, not
    # as a 500 on the first registration (bcrypt rejects < 4; 31 is hours).
    bcrypt_rounds: int = Field(12, ge=4, le=31)

    # Agent self-registration (CHT-1498). A key minted by POST
    # /agents/register expires after this many seconds (7 days); the
    # client re-registers to rotate it. Each registrar (an agent with
    # can_register, or a human calling register) may hold at most
    # `registrar_max_active_identities` active identities and make at most
    # `registrar_max_registrations_per_hour` registrations (rotations
    # included) in any rolling hour; past either it gets a 429.
    agent_session_key_ttl_seconds: int = Field(7 * 24 * 3600, ge=60)
    registrar_max_active_identities: int = Field(200, ge=1)
    registrar_max_registrations_per_hour: int = Field(60, ge=1)

    model_config = SettingsConfigDict(env_file=".env")

    @field_validator("forwarded_allow_ips")
    @classmethod
    def _check_forwarded_allow_ips(cls, value: str) -> str:
        """Drop, loudly, each entry that is not a usable address or
        network (CHT-1586), keeping the rest; if that leaves nothing of a
        non-empty value, trust loopback only. Dropping only narrows
        trust. uvicorn's own parser would silently turn a typo into a
        literal that never matches and would accept "*"; refusing to
        start instead would turn an upgrade into an outage."""
        kept, dropped = parse_trusted_proxies(value)
        if not dropped:
            return value
        if kept:
            result, outcome = ",".join(str(item) for item in kept), "Trusting forwarded headers from the rest"
        else:
            result, outcome = DEFAULT_FORWARDED_ALLOW_IPS, "Nothing usable is left, so trusting forwarded headers only from"
        logger.error(
            "FORWARDED_ALLOW_IPS=%r: dropped %s. %s: %s.",
            value, "; ".join(f"{entry!r} ({why})" for entry, why in dropped), outcome, result,
        )
        return result

    @property
    def trusted_proxies(self) -> list[str]:
        """FORWARDED_ALLOW_IPS as the list ProxyHeadersMiddleware takes."""
        return [str(item) for item in parse_trusted_proxies(self.forwarded_allow_ips)[0]]

    @model_validator(mode="after")
    def _check_oauth_issuer(self) -> "Settings":
        """With OAUTH_ENABLED, APP_BASE_URL becomes the OAuth issuer, so it
        must be one (RFC 8414 §2 / OAuth 2.1 §1.5): https, or http on a
        loopback host; no query or fragment; and no path, since the
        discovery documents are served at this origin's root
        (``/.well-known/...``). Fails when Settings is built, at import,
        rather than as a client-side discovery error much later.
        """
        if not self.oauth_enabled:
            return self
        problem = oauth_issuer_problem(self.app_base_url)
        if problem:
            raise ValueError(f"OAUTH_ENABLED requires APP_BASE_URL to be an OAuth issuer: {problem}")
        return self

    @property
    def cors_origin_list(self) -> list[str]:
        """CORS_ORIGINS as a list: split on commas, each entry stripped
        and normalised (_normalise_cors_origins), empty entries dropped
        (so a trailing comma adds nothing). The one
        parse of the setting: the CORS middleware (main.py) and the /mcp
        DNS-rebinding guard (mcp_server/asgi.py) both read it, so they
        cannot disagree about which origins are allowed (CHT-1563)."""
        return [origin for origin in self.cors_origins.split(",") if origin]

    @field_validator("cors_origins")
    @classmethod
    def _normalise_cors_origins(cls, value: str) -> str:
        """Store CORS_ORIGINS in the form browsers send (CHT-1707): each
        entry as normalise_cors_origin writes it, joined by commas. Both
        the CORS middleware and the /mcp guard compare Origin by exact
        string, so ``https://Tracker.example.com/`` written by hand would
        otherwise allow nothing. An entry that is not an origin at all
        refuses startup: unlike a dropped FORWARDED_ALLOW_IPS entry,
        dropping it could leave an empty list, which turns the /mcp
        DNS-rebinding guard off. `chaotic system config check` reports
        such a value before a restart does."""
        return ",".join(normalise_cors_origin(entry.strip()) for entry in value.split(",") if entry.strip())

    @property
    def oauth_issuer(self) -> str:
        """APP_BASE_URL exactly, minus any trailing slash (CHT-1517)."""
        return self.app_base_url.rstrip("/")


TrustedProxy = ipaddress.IPv4Address | ipaddress.IPv6Address | ipaddress.IPv4Network | ipaddress.IPv6Network


def parse_trusted_proxies(value: str) -> tuple[list[TrustedProxy], list[tuple[str, str]]]:
    """Split FORWARDED_ALLOW_IPS (comma-separated, blanks ignored) into
    the usable IP addresses and CIDR networks, and the entries that are
    not, each with the reason: "*" or a /0 network (both mean every
    sender), a host name, or a network with host bits set (``10.0.0.1/8``,
    almost always a typo). Beyond /0 it does not judge how wide a list
    is; that is the operator's call (docs/self-hosting-security.md)."""
    kept: list[TrustedProxy] = []
    dropped: list[tuple[str, str]] = []
    every_sender = "it would trust forwarded headers from every sender"
    for raw in value.split(","):
        entry = raw.strip()
        if not entry:
            continue
        if entry == "*":
            dropped.append((entry, every_sender))
            continue
        try:
            item = ipaddress.ip_network(entry, strict=True) if "/" in entry else ipaddress.ip_address(entry)
        except ValueError as exc:
            dropped.append((entry, f"not an IP address or CIDR network: {exc}"))
            continue
        if isinstance(item, (ipaddress.IPv4Network, ipaddress.IPv6Network)) and item.prefixlen == 0:
            dropped.append((entry, every_sender))
            continue
        kept.append(item)
    return kept, dropped


_LOOPBACK_HOSTS = frozenset({"localhost", "127.0.0.1", "::1"})
_DEFAULT_PORTS = {"http": 80, "https": 443}


def normalise_cors_origin(entry: str) -> str:
    """One CORS_ORIGINS entry in the form a browser's Origin header takes
    (CHT-1707): scheme and host lower-cased, no trailing ``/``, no default
    port. ``*`` is kept as is. Raises ValueError for an entry that is not
    an origin (no scheme or host, credentials, a path, query or fragment,
    a bad port), naming the entry, rather than guessing what was meant.

    The CLI (cli/src/cli/server_settings.py) refuses at `config set` what
    this rewrites, so every value it stores is left unchanged here
    (tests/test_cli_settings_parity.py). Unlike the CLI it accepts any
    scheme, so an existing ``chrome-extension://...`` entry keeps working.
    """
    if entry == "*":
        return entry
    if not entry.isascii():
        raise ValueError(f"CORS_ORIGINS entry {entry!r} is not ASCII "
                         "(browsers send an internationalised host in its xn-- form; write it so)")
    if any(c.isspace() or ord(c) < 0x20 or ord(c) == 0x7F for c in entry):
        raise ValueError(f"CORS_ORIGINS entry {entry!r} contains whitespace or a control character "
                         "(separate origins with commas)")
    trimmed = entry.rstrip("/")
    try:
        parsed = urlsplit(trimmed)
        port = parsed.port
    except ValueError:
        raise ValueError(f"CORS_ORIGINS entry {entry!r} is not a valid URL (check the host and port)") from None
    if not parsed.scheme or not parsed.hostname:
        raise ValueError(f"CORS_ORIGINS entry {entry!r} is not an origin such as https://tracker.example.com")
    if "@" in parsed.netloc:
        raise ValueError(f"CORS_ORIGINS entry {entry!r} must not carry credentials")
    if parsed.path or parsed.query or parsed.fragment or "?" in trimmed or "#" in trimmed:
        raise ValueError(f"CORS_ORIGINS entry {entry!r} must be a bare origin, with no path, query or fragment")
    scheme = parsed.scheme.lower()
    host = parsed.hostname  # urlsplit lower-cases it and drops IPv6 brackets
    if ":" in host:
        host = f"[{host}]"
    if port is not None and port != _DEFAULT_PORTS.get(scheme):
        host = f"{host}:{port}"
    return f"{scheme}://{host}"


def oauth_issuer_problem(base_url: str) -> str | None:
    """Why ``base_url`` can't be an OAuth issuer, or None if it can.

    The issuer is compared by exact string everywhere (RFC 8414 §3.3, the
    RFC 9207 ``iss`` check; MCP 2026-07-28 forbids clients from case
    folding or default-port elision first), and the metadata documents
    pass it through pydantic's URL type, which normalises. So accept only
    a value that is already in that normal form: anything else would
    make ``Settings.oauth_issuer`` and the advertised ``issuer`` differ
    (PR #332 review, S1).
    """
    if not base_url.isascii():
        return f"{base_url!r} is not ASCII (write an internationalised host in its xn-- form)"
    # Interpolated into a quoted WWW-Authenticate parameter on /mcp.
    if any(c in base_url for c in '"\\') or any(c.isspace() or ord(c) < 0x20 or ord(c) == 0x7F for c in base_url):
        return f"{base_url!r} contains a quote, backslash, whitespace or control character"
    trimmed = base_url.rstrip("/")
    parsed = urlsplit(trimmed)
    if parsed.scheme not in ("https", "http") or not parsed.hostname:
        return f"{base_url!r} is not an absolute http(s) URL"
    try:
        parsed.port  # raises on a non-numeric or out-of-range port
    except ValueError:
        return f"{base_url!r} has an invalid port"
    if parsed.scheme == "http" and parsed.hostname not in _LOOPBACK_HOSTS:
        return f"{base_url!r} must use https (plain http is allowed only on a loopback host)"
    if parsed.path or parsed.query or parsed.fragment:
        return f"{base_url!r} must be a bare origin, with no path, query or fragment"
    if parsed.username is not None or parsed.password is not None:
        return f"{base_url!r} must not carry credentials"
    try:
        canonical = str(AnyHttpUrl(trimmed)).rstrip("/")
    except ValidationError:
        return f"{base_url!r} is not a valid URL"
    if canonical != trimmed:
        return f"{base_url!r} is not in canonical form; use {canonical!r}"
    return None


@lru_cache
def get_settings() -> Settings:
    """Get cached settings."""
    return Settings()
