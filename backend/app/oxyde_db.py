"""Oxyde ORM database configuration."""
import os
import typing
import uuid
from datetime import datetime, timezone
from pydantic_core import PydanticUndefined
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
        # `model_class` is the attribute Oxyde itself reads from in mutation.py.
        for attr in ("model_class", "model", "model_cls", "_model", "_model_cls", "cls", "_cls"):
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

    def _default_for_field(name: str, info) -> tuple[bool, object]:
        """Return (have_default, value) for a missing field.

        Oxyde's `Field(default_factory=..., db_pk=True)` strips the
        `default_factory` off Pydantic's FieldInfo and consumes it
        internally — but only for PK fields. Non-PK defaulted columns
        (created_at, updated_at, joined_at, …) and PK columns whose
        Oxyde-side generator doesn't actually run for a given call path
        end up with NULL in the row Oxyde sends to SQLite. We compensate
        with several fallbacks so every shape of declared default still
        produces a value.
        """
        # Skip list-typed fields — they're m2m relations
        # (e.g. `labels: list[OxydeLabel] = Field(default_factory=list, db_m2m=True)`),
        # which Oxyde's create() doesn't accept as kwargs.
        ann = getattr(info, "annotation", None)
        if typing.get_origin(ann) is list:
            return False, None

        # 1. Standard Pydantic default_factory.
        factory = getattr(info, "default_factory", None)
        if factory is not None:
            return True, factory()

        # 2. Oxyde may stash default_factory inside json_schema_extra.
        extra = getattr(info, "json_schema_extra", None) or {}
        if isinstance(extra, dict):
            extra_factory = extra.get("default_factory")
            if callable(extra_factory):
                return True, extra_factory()

        # 3. PK string fields: generate UUID. Oxyde's own PK-default path
        #    doesn't always fire (we've observed `id` arrive as NULL in
        #    the INSERT row), and SQLite happily accepts NULL into a TEXT
        #    NOT NULL PK column — the failure surfaces later as a
        #    Pydantic ValidationError on the returned row.
        is_pk = isinstance(extra, dict) and bool(extra.get("db_pk"))
        if is_pk and ann is str:
            return True, str(uuid.uuid4())

        # 4. Plain `default=` values (enums, bools, floats, None). Oxyde's
        #    INSERT dump uses exclude_unset=True, so a defaulted-but-unset
        #    column is omitted from the row entirely: NOT NULL columns with
        #    no SQL-level default fail (e.g. rituals.trigger), and SQL
        #    defaults that disagree with the model win (e.g.
        #    rituals.approval_mode DEFAULT 'NONE' vs model default AUTO).
        #    Model defaults are authoritative; None is passed explicitly so
        #    optionals never fall through to the datetime fallback below.
        default = getattr(info, "default", PydanticUndefined)
        if default is not PydanticUndefined:
            return True, default

        # 5. Datetime fields: default to now(). Covers created_at /
        #    updated_at / joined_at / attested_at / requested_at and any
        #    future timestamp added with default_factory. Fields are
        #    annotated DateTimeUTC (Annotated[datetime, ...]) — unwrap.
        base = typing.get_args(ann)[0] if hasattr(ann, "__metadata__") else ann
        if base is datetime:
            return True, datetime.now(timezone.utc)

        return False, None

    def _fill_defaults(model_cls, data: dict) -> dict:
        for name, info in model_cls.model_fields.items():
            if name in data:
                continue
            have, value = _default_for_field(name, info)
            if have:
                data[name] = value
        return data

    def _revalidate_full(model_cls, instance):
        """Rebuild an instance from a full dump so every field counts as
        \"set\" — oxyde 0.7 serializes INSERTs with exclude_unset, which
        would otherwise drop Pydantic defaults from the row."""
        return model_cls.model_validate(instance.model_dump())

    async def _create_with_default_factory(self, **kwargs):
        model_cls = _model_for_manager(self)
        if kwargs.get("instance") is not None:
            # create(instance=...) forbids extra field kwargs — injecting
            # defaults here would raise ManagerError. Re-validate instead.
            if model_cls is not None and isinstance(kwargs["instance"], model_cls):
                kwargs["instance"] = _revalidate_full(model_cls, kwargs["instance"])
            return await _original_create(self, **kwargs)
        if model_cls is not None:
            try:
                _fill_defaults(model_cls, kwargs)
            except Exception:
                # Defensive: never block a create if introspection fails.
                pass
        return await _original_create(self, **kwargs)

    _original_bulk_create = QueryManager.bulk_create

    async def _bulk_create_with_default_factory(self, objects, **kwargs):
        # Same exclude_unset problem as create(): dict payloads get defaults
        # injected, instances get re-validated from a full dump.
        model_cls = _model_for_manager(self)
        if model_cls is not None:
            objects = [
                _fill_defaults(model_cls, dict(obj)) if isinstance(obj, dict)
                else _revalidate_full(model_cls, obj) if isinstance(obj, model_cls)
                else obj
                for obj in objects
            ]
        return await _original_bulk_create(self, objects, **kwargs)

    QueryManager.create = _create_with_default_factory
    QueryManager.bulk_create = _bulk_create_with_default_factory
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
