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
"""
from typing import Annotated

from pydantic import BeforeValidator, PlainSerializer, SerializationInfo


def DbEnum(enum_cls):
    """Annotated type for enum fields stored as .name in the DB.

    Usage:
        class OxydeSprint(Model):
            status: DbEnum(SprintStatus) = Field(default=SprintStatus.PLANNED)
    """
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
