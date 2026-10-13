"""Application configuration."""
import os
from urllib.parse import urlsplit

from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


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

    # CORS
    cors_origins: str = "*"

    # Server
    host: str = "127.0.0.1"
    port: int = 24267

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

    model_config = SettingsConfigDict(env_file=".env")

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
    def oauth_issuer(self) -> str:
        """APP_BASE_URL exactly, minus any trailing slash (CHT-1517)."""
        return self.app_base_url.rstrip("/")


_LOOPBACK_HOSTS = frozenset({"localhost", "127.0.0.1", "::1"})


def oauth_issuer_problem(base_url: str) -> str | None:
    """Why ``base_url`` can't be an OAuth issuer, or None if it can."""
    parsed = urlsplit(base_url.rstrip("/"))
    if parsed.scheme not in ("https", "http") or not parsed.hostname:
        return f"{base_url!r} is not an absolute http(s) URL"
    if parsed.scheme == "http" and parsed.hostname not in _LOOPBACK_HOSTS:
        return f"{base_url!r} must use https (plain http is allowed only on a loopback host)"
    if parsed.path or parsed.query or parsed.fragment:
        return f"{base_url!r} must be a bare origin, with no path, query or fragment"
    if parsed.username or parsed.password:
        return f"{base_url!r} must not carry credentials"
    return None


@lru_cache
def get_settings() -> Settings:
    """Get cached settings."""
    return Settings()
