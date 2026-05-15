"""Oxyde ORM database configuration."""
import os
import typing
from oxyde import AsyncDatabase
from app.config import get_settings


_db: AsyncDatabase | None = None


def _get_oxyde_url() -> str:
    """Get Oxyde-compatible database URL from settings.

    Settings may use async driver prefixes (sqlite+aiosqlite, +asyncpg)
    which need to be stripped for Oxyde's native async driver.
    """
    settings = get_settings()
    url = settings.database_url

    if url.startswith("sqlite+aiosqlite:///"):
        path = url.replace("sqlite+aiosqlite:///", "")
        if not path.startswith("/"):
            path = os.path.abspath(path)
        return f"sqlite:///{path}"

    if "+asyncpg" in url:
        return url.replace("+asyncpg", "")

    return url


def _patch_objects_create_to_apply_default_factory() -> None:
    """Make objects.create() honor Pydantic default_factory on non-PK fields.

    The installed Oxyde version applies a Field's `default_factory` only for
    primary-key columns (so a model's auto-uuid `id` works), but skips it for
    every other defaulted column. Our migrations declare timestamp columns
    like `users.created_at` / `users.updated_at` NOT NULL with no SQL-level
    default, so every signup / first-issue / first-team blew up with

        IntegrityError: NOT NULL constraint failed: users.created_at

    Patching QueryManager.create at startup means every service in the
    codebase (40+ call sites) gets the right behavior without each call site
    having to pass `created_at=datetime.now(timezone.utc)` explicitly.
    """
    from oxyde.queries.manager import QueryManager

    if getattr(QueryManager, "_chaotic_default_factory_patched", False):
        return

    _original_create = QueryManager.create

    def _model_for_manager(manager) -> type | None:
        # QueryManager is generic; the model class lives on one of a handful
        # of attributes depending on Oxyde version, or in the typing args.
        for attr in ("model", "model_cls", "_model", "_model_cls", "cls", "_cls"):
            candidate = getattr(manager, attr, None)
            if candidate is not None and hasattr(candidate, "model_fields"):
                return candidate
        orig_class = getattr(manager, "__orig_class__", None)
        if orig_class is not None:
            args = typing.get_args(orig_class)
            if args and hasattr(args[0], "model_fields"):
                return args[0]
        for base in getattr(type(manager), "__orig_bases__", ()):
            args = typing.get_args(base)
            if args and hasattr(args[0], "model_fields"):
                return args[0]
        return None

    async def _create_with_default_factory(self, **kwargs):
        model_cls = _model_for_manager(self)
        if model_cls is not None:
            try:
                for name, info in model_cls.model_fields.items():
                    if name in kwargs:
                        continue
                    factory = getattr(info, "default_factory", None)
                    if factory is None:
                        continue
                    # Skip list-typed fields — they're m2m relations
                    # (e.g. `labels: list[OxydeLabel] = Field(default_factory=list, db_m2m=True)`),
                    # which Oxyde's create() doesn't accept as kwargs.
                    if typing.get_origin(getattr(info, "annotation", None)) is list:
                        continue
                    kwargs[name] = factory()
            except Exception:
                # Defensive: never block a create if introspection fails.
                pass
        return await _original_create(self, **kwargs)

    QueryManager.create = _create_with_default_factory
    QueryManager._chaotic_default_factory_patched = True


# Apply the default_factory patch at module load so it's in place before any
# code path that hits objects.create() — including the test conftest, which
# captures QueryManager.create into `_original_create` before wrapping it for
# enum coercion.
_patch_objects_create_to_apply_default_factory()


async def init_oxyde() -> AsyncDatabase:
    """Initialize the Oxyde database connection."""
    global _db
    url = _get_oxyde_url()
    _db = AsyncDatabase(url, overwrite=True)
    await _db.connect()

    # Import models so they register with Oxyde
    import app.oxyde_models  # noqa: F401

    return _db


async def close_oxyde() -> None:
    """Close the Oxyde database connection."""
    global _db
    if _db:
        await _db.disconnect()
        _db = None
