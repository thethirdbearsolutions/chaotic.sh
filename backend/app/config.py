"""Application configuration."""
import os
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

    # CORS
    cors_origins: str = "*"

    # Server
    host: str = "127.0.0.1"
    port: int = 24267

    # Public base URL, used to build absolute links in outbound email
    # (invitation accept links). No scheme/host detection from requests --
    # explicit env var, same as everything else here.
    app_base_url: str = "http://localhost:24267"

    # Email (SMTP) -- CHT-1251. Empty smtp_host means "unconfigured": the
    # mutating paths that would send email (gate-pending, invitations) log
    # and skip rather than erroring. See EmailService.is_configured().
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from: str = "noreply@chaotic.sh"

    model_config = SettingsConfigDict(env_file=".env")


@lru_cache
def get_settings() -> Settings:
    """Get cached settings."""
    return Settings()
