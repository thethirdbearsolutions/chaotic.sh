"""Oxyde ORM configuration."""
import os

# List of Python modules containing OxydeModel classes
MODELS = ["app.oxyde_models"]

# Database dialect: "postgres", "sqlite", or "mysql"
DIALECT = "sqlite"

# Directory for migration files
MIGRATIONS_DIR = "migrations"


def _resolve_default_url() -> str:
    """Resolve the default database URL.

    Honors DATABASE_URL from the environment so that `oxyde migrate` targets
    the same database the running server opens (set by the systemd unit /
    launchd plist installed by `chaotic system install`). Falls back to a
    sibling `chaotic.db` for local development.
    """
    url = os.environ.get("DATABASE_URL")
    if url:
        # Strip async driver prefixes — Oxyde uses its own native async driver.
        if url.startswith("sqlite+aiosqlite:///"):
            path = url[len("sqlite+aiosqlite:///"):]
            if not path.startswith("/"):
                path = os.path.abspath(path)
            return f"sqlite:///{path}"
        if "+asyncpg" in url:
            return url.replace("+asyncpg", "")
        return url

    db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "chaotic.db"))
    return f"sqlite:///{db_path}"


DATABASES = {
    "default": _resolve_default_url(),
}
