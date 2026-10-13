"""DbEnum type annotation for Oxyde models with enum fields.

The DB stores enum ``.name`` strings ("ACTIVE"); the wire format is the
enum ``.value`` ("active"). This wrapper coerces either form back to a
member on read, and picks its serialization by MODE on write, so the
two representations can coexist without anyone having to remember which
one they're holding (CHT-1345):

* ``model_dump()`` / ``mode="python"`` -> ``.name``. This is Oxyde's
  persistence path (see oxyde/models/serializers.py and
  queries/mixins/mutation.py, which use python mode exclusively), and
  the DB format must not change.
* ``mode="json"`` -> ``.value``. Json mode exists to produce output for
  something outside this process, and outside this process the enum's
  value is the contract -- it's what every FastAPI ``response_model``
  emits and what the frontend and CLI parse.

Why the mode split matters. Before CHT-1345 the serializer emitted
``.name`` unconditionally, so dumping a model straight to json handed
callers "ACTIVE" where every HTTP client sees "active". That was only
safe if every read path laundered the row through a response schema
first -- an unwritten, unenforced rule, silent when broken, and the
engine behind a bug class that recurred from CHT-974 through CHT-1333.
Scoping the serializer makes the obvious thing correct instead.

Service code compares members natively either way:
``sprint.status == SprintStatus.ACTIVE``.

IMPORTANT -- what this does NOT make safe. A model dumped with
``mode="json"`` now has correct-looking enum fields, and that is exactly
why it must not be mistaken for a wire payload. An ORM row is the
PERSISTENCE representation; a response schema is the serializer-ready
one. The schema also FILTERS, and this does not:

    OxydeIssue.model_dump(mode="json")   ->  includes `creator`, whose
                                             sub-object carries
                                             hashed_password and
                                             is_superuser
    IssueResponse                        ->  has no `creator` at all

Before this change a raw dump announced itself with "BACKLOG"; now it
reads as plausible. Removing that tell is the cost of fixing the casing,
so: build the response schema, do not dump the row. Since CHT-1348 the
app/api functions do this themselves (ADR-0005;
tests/test_api_return_contract.py), and TestNoLeakedInternalFields
sweeps the MCP tool output for anything that slipped through.
"""
from typing import Annotated

from oxyde.core.types import TYPE_REGISTRY, TypeDescriptor
from pydantic import BeforeValidator, PlainSerializer, SerializationInfo


def _register_with_oxyde(enum_cls) -> None:
    """Make a member mean its ``.name`` everywhere Oxyde serialises a bare
    value itself, not only on writes that go through pydantic (CHT-1398).

    ``objects.create`` / ``save`` / ``bulk_update`` dump the model in
    python mode, so a member becomes its ``.name`` there. Two paths do
    not touch pydantic at all: filter values (``filter`` / ``exclude`` /
    ``Q``) and ``QuerySet.update(**values)``. Both run each value through
    ``oxyde.core.types.serialize_value``, which consults ``TYPE_REGISTRY``
    by exact type and otherwise hands the object to msgpack as is. Our
    enums subclass ``str``, so an unregistered member packs as its
    ``.value``: a filter sent "close" against rows holding "CLOSE" and
    matched nothing (test_stale_intent_takeover found it through a
    unique-index collision), and ``.update(status=SprintStatus.ACTIVE)``
    would have stored "active", a row no ``.name`` filter finds. Every
    filter spelled ``member.name`` by hand until now; registering the
    class makes the member correct on both paths, and ``.name`` strings
    still pass through unchanged.

    Two more things read the registry, and both must see what they saw
    before: the migration autodetector records a column's type as
    ``get_ir_type(python_type)`` or, for an unregistered class, its
    lowercased ``__name__`` ("sprintstatus"), so the descriptor's
    ``ir_name`` is exactly that fallback and the recorded schema does not
    change (registering as "str" made every enum column an alter_column);
    and the lookup category becomes "string", which newly permits the
    string lookups (``__contains`` and friends; ``__in`` was always
    allowed). The Rust core tolerates the unfamiliar type hint on row
    decoding and on F() expressions.

    Still hand-written ``.name``: ``execute_raw`` params (msgpack packs a
    str-subclass natively, the registry hook never sees it) and a member
    inside an ``F()`` expression, which nobody writes.

    This is keyed by class, not by column: a member passed for a plain
    ``str`` column (the activity table's ``old_value`` / ``new_value``)
    now serialises to ``.name`` too, and those columns store whatever
    was written (CHT-1347).
    """
    existing = TYPE_REGISTRY.get(enum_cls)
    if existing is not None:
        probe = next(iter(enum_cls))
        if existing.serialize(probe) != probe.name:
            raise RuntimeError(
                f"{enum_cls.__name__} is already registered with Oxyde with a serializer that does not "
                f"produce .name ({existing.serialize(probe)!r}); DbEnum needs the stored form"
            )
        return
    TYPE_REGISTRY[enum_cls] = TypeDescriptor(enum_cls.__name__.lower(), "string", lambda v: v.name)


def DbEnum(enum_cls):
    """Annotated type for enum fields stored as .name in the DB.

    Usage:
        class OxydeSprint(Model):
            status: DbEnum(SprintStatus) = Field(default=SprintStatus.PLANNED)
    """
    _register_with_oxyde(enum_cls)
    def coerce(v):
        if isinstance(v, enum_cls):
            return v
        if isinstance(v, str):
            try:
                return enum_cls[v]        # by name: "ACTIVE" → enum
            except KeyError:
                return enum_cls(v)        # by value: "active" → enum
        return v

    def serialize(v, info: SerializationInfo):
        if not isinstance(v, enum_cls):
            return v
        # json mode is for consumers outside this process; every other
        # mode is Oxyde writing a row. See the module docstring.
        return v.value if info.mode == "json" else v.name

    return Annotated[
        enum_cls,
        BeforeValidator(coerce),
        PlainSerializer(serialize),
    ]
