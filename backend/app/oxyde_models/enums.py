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


def _register_for_filters(enum_cls) -> None:
    """Make a member mean its ``.name`` on Oxyde's FILTER path too (CHT-1398).

    Writes go through pydantic (``model_dump``, python mode -> ``.name``).
    Filter values do not: ``Q``/``filter(...)`` run each value through
    ``oxyde.core.types.serialize_value``, which consults ``TYPE_REGISTRY``
    by exact type and otherwise hands the object to msgpack as is. Our
    enums subclass ``str``, so an unregistered member packs as its
    ``.value`` ("close") and matches no stored row ("CLOSE"). Until this
    hook every filter had to spell ``member.name`` by hand, and the one
    that forgot silently matched nothing (test_stale_intent_takeover
    found it through a unique-index collision). Registering the class
    makes ``filter(status=SprintStatus.ACTIVE)`` compare against the
    stored form, the same as ``.name`` strings still do.

    Two more things read the registry, and both must see what they saw
    before: the migration autodetector records a column's type as
    ``get_ir_type(python_type)`` or, for an unregistered class, its
    lowercased ``__name__`` ("sprintstatus"), so the descriptor's
    ``ir_name`` is exactly that fallback and the recorded schema does not
    change (registering as "str" produced fifteen spurious alter_column
    operations); and the lookup category becomes "string", which allows
    ``status__in`` / ``status__icontains`` on the column as on any TEXT
    column.
    """
    TYPE_REGISTRY.setdefault(
        enum_cls, TypeDescriptor(enum_cls.__name__.lower(), "string", lambda v: v.name)
    )


def DbEnum(enum_cls):
    """Annotated type for enum fields stored as .name in the DB.

    Usage:
        class OxydeSprint(Model):
            status: DbEnum(SprintStatus) = Field(default=SprintStatus.PLANNED)
    """
    _register_for_filters(enum_cls)
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
