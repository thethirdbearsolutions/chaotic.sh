"""DbEnum type annotation for Oxyde models with enum fields.

DB stores enum .name strings (e.g. "ACTIVE"). This Annotated wrapper
coerces raw strings to enum members on read, and serializes back to
.name on write (model_dump), so service code can use native enum
comparisons: sprint.status == SprintStatus.ACTIVE
"""
from typing import Annotated
from pydantic import BeforeValidator, PlainSerializer


def DbEnum(enum_cls):
    """Annotated type for enum fields stored as .name in the DB.

    Usage:
        class OxydeSprint(OxydeModel):
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

    return Annotated[
        enum_cls,
        BeforeValidator(coerce),
        PlainSerializer(lambda v: v.name if isinstance(v, enum_cls) else v),
    ]
