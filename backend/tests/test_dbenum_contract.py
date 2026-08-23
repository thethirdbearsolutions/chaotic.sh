"""The DbEnum contract, pinned (CHT-1345).

A bug class recurred from CHT-974 through CHT-1333 because an enum has
two legitimate string forms -- the ``.name`` the DB stores and the
``.value`` the wire speaks -- and nothing asserted which one comes out
where. Every fix so far was a defense at one boundary (`_enum_name`,
`_activity_type_value`, four copies of `_coerce_enum`, `.lower()` in
list_relations, `cleanValue` in the frontend, `_trigger_of`), and the
next unguarded boundary hit it again.

These tests state the contract once, and derive their coverage from the
model registry rather than a hand-maintained list -- so a model added
next year is covered the day it lands, without anyone remembering this
file exists. (That derivation is deliberate: CHT-1267 is the standing
complaint that the frozen-map guard in
test_enum_normalization_migration.py has to be edited by hand for every
new DbEnum model.)
"""
import enum
import typing

import pytest
from pydantic import TypeAdapter

import app.oxyde_models  # noqa: F401 -- registers every model
from oxyde.models.registry import registered_tables


def _enum_fields():
    """(model, field_name, enum_class, annotated_type) per DbEnum field.

    The annotated type is rebuilt from pydantic's own FieldInfo so the
    coercion tests can drive the annotation through a TypeAdapter,
    rather than building a whole model instance and having to satisfy
    every unrelated required field on it.

    Note it is rebuilt from ``model_fields`` and NOT from Oxyde's
    ``field_metadata.python_type``: that records the bare enum class,
    stripped of the BeforeValidator/PlainSerializer that ARE the DbEnum
    contract, so a TypeAdapter built from it would silently test
    plain-pydantic enum behaviour instead of ours.
    """
    found = []
    for cls in registered_tables().values():
        for fname, meta in cls._db_meta.field_metadata.items():
            pt = meta.python_type
            base = typing.get_args(pt)[0] if hasattr(pt, "__metadata__") else pt
            if isinstance(base, type) and issubclass(base, enum.Enum):
                field = cls.model_fields[fname]
                annotated = typing.Annotated[tuple([field.annotation, *field.metadata])]
                found.append((cls, fname, base, annotated))
    return found


ENUM_FIELDS = _enum_fields()
IDS = [f"{c.__name__}.{f}" for c, f, _, _ in ENUM_FIELDS]


def test_there_are_enum_fields_to_check():
    """Guard the guard: if introspection silently finds nothing, every
    parametrized test below vacuously passes."""
    assert len(ENUM_FIELDS) >= 10, f"only found {len(ENUM_FIELDS)} DbEnum fields"


@pytest.mark.parametrize("cls,fname,enum_cls,annotated", ENUM_FIELDS, ids=IDS)
def test_python_mode_serializes_to_name(cls, fname, enum_cls, annotated):
    """Oxyde's persistence path uses python mode; the DB stores .name.

    If this fails, every row written for this field lands in the DB in a
    format its own queries won't match -- the CHT-974 failure, where
    admin checks silently returned False.
    """
    for member in enum_cls:
        obj = cls.model_construct(**{fname: member})
        assert obj.model_dump()[fname] == member.name
        assert obj.model_dump(mode="python")[fname] == member.name


@pytest.mark.parametrize("cls,fname,enum_cls,annotated", ENUM_FIELDS, ids=IDS)
def test_json_mode_serializes_to_value(cls, fname, enum_cls, annotated):
    """Json mode is for consumers outside this process, which speak .value.

    If this fails, anything dumping a row straight to json hands callers
    "ACTIVE" where every HTTP client sees "active" -- the CHT-1333
    failure.
    """
    for member in enum_cls:
        obj = cls.model_construct(**{fname: member})
        assert obj.model_dump(mode="json")[fname] == member.value


@pytest.mark.parametrize("cls,fname,enum_cls,annotated", ENUM_FIELDS, ids=IDS)
def test_both_forms_coerce_back_to_the_member(cls, fname, enum_cls, annotated):
    """Reads must accept either form.

    Rows predating a convention change are stored in the old form, and
    callers pass whichever they last saw. Coercion is what lets the two
    representations coexist instead of splitting the data.
    """
    adapter = TypeAdapter(annotated)
    for member in enum_cls:
        assert adapter.validate_python(member.name) is member
        assert adapter.validate_python(member.value) is member
        assert adapter.validate_python(member) is member


@pytest.mark.parametrize("cls,fname,enum_cls,annotated", ENUM_FIELDS, ids=IDS)
def test_round_trips_through_the_db_format(cls, fname, enum_cls, annotated):
    """name -> member -> name is stable, so a row survives a read/write
    cycle unchanged. A drift here silently rewrites stored data."""
    adapter = TypeAdapter(annotated)
    for member in enum_cls:
        written = adapter.dump_python(member)
        reread = adapter.validate_python(written)
        assert reread is member
        assert adapter.dump_python(reread) == written


def test_a_raw_json_dump_is_wire_shaped():
    """The consequence of the mode split, not a restatement of it.

    Reverting ``serialize()`` to ``lambda v: v.name`` used to break only
    ``test_json_mode_serializes_to_value`` -- a line-for-line echo of the
    implementation. Every behavioural test stayed green, because each one
    reaches its enums through a response schema, and pydantic emits
    ``.value`` from those regardless of what it was handed (CHT-1354).

    So state the consequence a caller actually depends on: dumping a row
    to json yields what an HTTP client sees, for a model nothing has
    laundered.
    """
    from app.enums import SprintStatus
    from app.oxyde_models.sprint import OxydeSprint
    from app.schemas.sprint import SprintResponse

    row = OxydeSprint(project_id="p", name="S", status=SprintStatus.ACTIVE)

    via_raw_dump = row.model_dump(mode="json")["status"]
    via_schema = SprintResponse.model_validate(row).model_dump(mode="json")["status"]

    assert via_raw_dump == via_schema == "active"


# ---------------------------------------------------------------------------
# The other party to the contract: Oxyde's persistence path
# ---------------------------------------------------------------------------

def test_oxyde_persists_via_python_mode():
    """Oxyde must keep serialising rows in PYTHON mode, not json.

    The whole safety argument for the mode split is "Oxyde only uses
    python mode", which was verified by reading a pinned third-party
    version and asserted nowhere (CHT-1354). If a future oxyde release
    switched ``_dump_insert_data`` to ``mode="json"`` -- an entirely
    natural-looking change for a function producing wire IR -- every enum
    column would silently start storing ``.value``, reproducing CHT-1209,
    and our own tests would stay green until a ``.name``-bound filter
    quietly stopped matching.

    So assert against the library itself rather than our side of it.
    """
    from app.enums import SprintStatus
    from app.oxyde_models.sprint import OxydeSprint
    from oxyde.models import serializers

    row = OxydeSprint(project_id="p", name="S", status=SprintStatus.ACTIVE)

    insert = serializers._dump_insert_data(row)
    assert insert["status"] == "ACTIVE", (
        "Oxyde is no longer writing enum columns as .name -- the DbEnum "
        "mode split (CHT-1345) assumes it does. Every enum column is about "
        "to be stored in the wrong form."
    )


# ---------------------------------------------------------------------------
# The four _coerce_enum copies
# ---------------------------------------------------------------------------

def _coercers():
    """Every module-level _coerce_enum in app.schemas.

    There are four independent copies (issue, ritual, inbox, team; a
    fifth module imports one of them), each wired up through
    class-level ``@field_validator``. They exist because a schema fed a
    raw DB row receives the stored ``.name`` and has to accept it.

    Four hand-maintained copies of one rule is a drift hazard: fix a
    corner in one and the other three keep the old behaviour, silently,
    for whichever models happen to live in those modules. So assert they
    still agree rather than trusting that they do.
    """
    import importlib
    import pkgutil

    import app.schemas

    found = {}
    for mod in pkgutil.iter_modules(app.schemas.__path__):
        module = importlib.import_module(f"app.schemas.{mod.name}")
        fn = getattr(module, "_coerce_enum", None)
        if fn is not None and fn.__module__ == module.__name__:
            found[mod.name] = fn
    return found


COERCERS = _coercers()


def test_all_coerce_enum_copies_are_found():
    assert len(COERCERS) >= 4, f"expected >=4 _coerce_enum copies, found {sorted(COERCERS)}"


@pytest.mark.parametrize("module_name", sorted(COERCERS), ids=sorted(COERCERS))
def test_coerce_enum_copies_agree(module_name):
    """Each copy accepts name, value and member alike, for every enum in
    play -- the property the response schemas depend on."""
    coerce = COERCERS[module_name]
    for _, _, enum_cls, _ in ENUM_FIELDS:
        for member in enum_cls:
            assert coerce(enum_cls, member.name) is member
            assert coerce(enum_cls, member.value) is member
            assert coerce(enum_cls, member) is member
