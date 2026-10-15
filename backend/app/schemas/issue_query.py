"""The issue query structure (CHT-1718): one validated shape that the web
query builder, ``chaotic issue list --where`` and MCP ``issue_list`` share.

A query is a tree of filter rows::

    {"match": "all", "rows": [
        {"field": "status", "op": "is", "values": ["todo", "in_progress"]},
        {"match": "any", "rows": [
            {"field": "assignee", "op": "is", "values": ["me"]},
            {"field": "assignee", "op": "empty", "values": []}
        ]}
    ]}

plus an ordering. Every field and operator is checked against the
allow-list below, values are checked per field kind, and the tree is
capped (``MAX_DEPTH``, ``MAX_ROWS``, ``MAX_VALUES``) before anything
touches the database. The text form (``where``) and its parser live in
``app.services.issue_query``; both forms validate through these models.

Names are the wire form: lowercase enum ``.value`` strings, the same ones
``IssueResponse`` emits. Nothing here is an ORM column, so these are
plain ``StrEnum``s rather than ``DbEnum``: a ``StrEnum`` member *is* its
value string (``str()``, f-strings, ``json.dumps`` and ``==`` all give
``"is"``, never ``"QueryOp.IS"``). Field and operator are named enums
rather than inline ``Literal``s so the OpenAPI schema gives them their own
component names: the Android client generator derives an inline enum's
class name from the property, and a property called ``field`` comes out
as Kotlin that does not compile.
"""
from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum
from typing import Annotated, Literal, Union

from pydantic import (
    BaseModel, ConfigDict, Discriminator, Field, Tag, field_validator, model_validator,
)

from app.enums import IssuePriority, IssueStatus, IssueType
from app.schemas.issue import IssueResponse

MAX_DEPTH = 4          # the root group is depth 1
MAX_ROWS = 50          # filter rows in the whole tree (groups not counted)
MAX_VALUES = 100       # values in one row
MAX_VALUE_LENGTH = 200
MAX_ORDER_TERMS = 3

class QueryOp(StrEnum):
    """A filter row's operator."""

    IS = "is"
    IS_NOT = "is_not"
    ALL = "all"
    CONTAINS = "contains"
    NOT_CONTAINS = "not_contains"
    BEGINS_WITH = "begins_with"
    GTE = "gte"
    LTE = "lte"
    AFTER = "after"
    BEFORE = "before"
    BETWEEN = "between"
    EMPTY = "empty"
    NOT_EMPTY = "not_empty"


# How many values each operator takes: (min, max).
OP_ARITY: dict[str, tuple[int, int]] = {
    "is": (1, MAX_VALUES),
    "is_not": (1, MAX_VALUES),
    "all": (1, MAX_VALUES),
    "contains": (1, MAX_VALUES),
    "not_contains": (1, MAX_VALUES),
    "begins_with": (1, MAX_VALUES),
    "gte": (1, 1),
    "lte": (1, 1),
    "after": (1, 1),
    "before": (1, 1),
    "between": (2, 2),
    "empty": (0, 0),
    "not_empty": (0, 0),
}


@dataclass(frozen=True)
class FieldSpec:
    """One queryable field: its kind (how values are read and resolved)
    and the operators it accepts."""

    kind: str
    ops: frozenset[str]
    enum: type | None = None


_NULLABLE_REF = frozenset({"is", "is_not", "empty", "not_empty"})
_DATE = frozenset({"after", "before", "between"})

FIELDS: dict[str, FieldSpec] = {
    "status": FieldSpec("enum", frozenset({"is", "is_not"}), IssueStatus),
    "priority": FieldSpec("enum", frozenset({"is", "is_not"}), IssuePriority),
    "type": FieldSpec("enum", frozenset({"is", "is_not"}), IssueType),
    "assignee": FieldSpec("user", _NULLABLE_REF),
    "creator": FieldSpec("user", _NULLABLE_REF),
    "project": FieldSpec("project", frozenset({"is", "is_not"})),
    "sprint": FieldSpec("sprint", _NULLABLE_REF),
    "label": FieldSpec("label", frozenset({"is", "is_not", "all", "empty", "not_empty"})),
    "estimate": FieldSpec(
        "number",
        frozenset({"is", "is_not", "gte", "lte", "between", "empty", "not_empty"}),
    ),
    "parent": FieldSpec("issue", _NULLABLE_REF),
    "identifier": FieldSpec("identifier", frozenset({"is", "is_not"})),
    "created": FieldSpec("date", _DATE),
    "updated": FieldSpec("date", _DATE),
    "completed": FieldSpec("date", _DATE | {"empty", "not_empty"}),
    "due": FieldSpec("date", _DATE | {"empty", "not_empty"}),
    "title": FieldSpec("text", frozenset({"contains", "not_contains", "begins_with"})),
    # title, description and identifier, like the list endpoint's `search`
    "text": FieldSpec("text", frozenset({"contains", "not_contains"})),
}

class QueryField(StrEnum):
    """A field a filter row can test (``FIELDS`` says how)."""

    STATUS = "status"
    PRIORITY = "priority"
    TYPE = "type"
    ASSIGNEE = "assignee"
    CREATOR = "creator"
    PROJECT = "project"
    SPRINT = "sprint"
    LABEL = "label"
    ESTIMATE = "estimate"
    PARENT = "parent"
    IDENTIFIER = "identifier"
    CREATED = "created"
    UPDATED = "updated"
    COMPLETED = "completed"
    DUE = "due"
    TITLE = "title"
    TEXT = "text"


class OrderField(StrEnum):
    """A field a query can be ordered by."""

    CREATED = "created"
    UPDATED = "updated"
    PRIORITY = "priority"
    STATUS = "status"
    TITLE = "title"
    ESTIMATE = "estimate"
    IDENTIFIER = "identifier"
    DUE = "due"
    COMPLETED = "completed"


ORDER_FIELDS = tuple(f.value for f in OrderField)
assert set(FIELDS) == {f.value for f in QueryField}
assert set(OP_ARITY) == {o.value for o in QueryOp}

# A date value: an ISO date or datetime, `today`, `yesterday`, or a
# relative offset back from now such as -7d, -2w, -12h.
_RELATIVE = re.compile(r"^-(\d{1,4})([hdw])$")
# The ISO forms the docs promise, and only those: `datetime.fromisoformat`
# alone also takes 20261001, 2026-W40-1 and other forms nobody types on
# purpose. [0-9], not \d, which matches every Unicode digit.
_ISO_DATE = re.compile(r"^[0-9]{4}-[0-9]{2}-[0-9]{2}$")
_ISO_DATETIME = re.compile(
    r"^[0-9]{4}-[0-9]{2}-[0-9]{2}[T ][0-9]{2}:[0-9]{2}(:[0-9]{2}(\.[0-9]{1,6})?)?"
    r"(Z|[+-][0-9]{2}:[0-9]{2})?$"
)
# Whole numbers: ASCII digits only (int() also takes 1_000 and Unicode
# digits), within a range an estimate could mean.
_NUMBER = re.compile(r"^[0-9]{1,7}$")
MAX_NUMBER = 1_000_000


def is_date_value(value: str) -> bool:
    if value in ("today", "yesterday") or _RELATIVE.match(value):
        return True
    if not (_ISO_DATE.match(value) or _ISO_DATETIME.match(value)):
        return False
    try:
        datetime.fromisoformat(value)
    except ValueError:
        return False
    return True


def _check_value(field: str, spec: FieldSpec, value: str) -> None:
    if spec.kind == "enum":
        allowed = [m.value for m in spec.enum]
        if value not in allowed:
            raise ValueError(
                f"'{value}' is not a valid {field}. Valid values: {', '.join(allowed)}"
            )
    elif spec.kind == "number":
        if not _NUMBER.match(value) or int(value) > MAX_NUMBER:
            raise ValueError(f"{field} takes whole numbers from 0 to {MAX_NUMBER}, not '{value}'")
    elif spec.kind == "date":
        if not is_date_value(value):
            raise ValueError(
                f"'{value}' is not a date. Use YYYY-MM-DD, YYYY-MM-DDTHH:MM[:SS][Z|+HH:MM], "
                "today, yesterday, or an offset like -7d, -2w, -12h"
            )


class QueryRow(BaseModel):
    """One filter row: ``field op values``."""

    model_config = ConfigDict(extra="forbid")

    field: QueryField
    op: QueryOp
    values: list[str] = Field(default_factory=list)

    @field_validator("values")
    @classmethod
    def _strip(cls, values: list[str]) -> list[str]:
        out = []
        for v in values:
            if not isinstance(v, str):  # pragma: no cover - pydantic already typed it
                raise ValueError("values must be strings")
            v = v.strip()
            if not v:
                raise ValueError("values must not be blank")
            if len(v) > MAX_VALUE_LENGTH:
                raise ValueError(f"a value is longer than {MAX_VALUE_LENGTH} characters")
            out.append(v)
        return out

    @model_validator(mode="after")
    def _check(self) -> "QueryRow":
        spec = FIELDS[self.field]
        if self.op not in spec.ops:
            raise ValueError(
                f"{self.field} does not take '{self.op}'. "
                f"It takes: {', '.join(sorted(spec.ops))}"
            )
        lo, hi = OP_ARITY[self.op]
        n = len(self.values)
        if not lo <= n <= hi:
            want = f"{lo}" if lo == hi else f"{lo} to {hi}"
            raise ValueError(f"{self.field} {self.op} takes {want} value(s), got {n}")
        for v in self.values:
            _check_value(self.field, spec, v)
        return self


class QueryGroup(BaseModel):
    """Rows (or nested groups) combined with AND (``all``) or OR (``any``)."""

    model_config = ConfigDict(extra="forbid")

    match: Literal["all", "any"] = "all"
    rows: list[QueryNode] = Field(min_length=1)


def _node_kind(value) -> str:
    """A row has a ``field``; anything else is read as a group. Picking
    the branch up front keeps a bad row's error about the row, instead of
    a union error that also lists why it is not a group."""
    if isinstance(value, dict):
        return "row" if "field" in value else "group"
    return "row" if isinstance(value, QueryRow) else "group"


QueryNode = Annotated[
    Union[Annotated[QueryRow, Tag("row")], Annotated[QueryGroup, Tag("group")]],
    Discriminator(_node_kind),
]
QueryGroup.model_rebuild()


class QueryOrder(BaseModel):
    model_config = ConfigDict(extra="forbid")

    field: OrderField
    direction: Literal["asc", "desc"] = "desc"


def tree_size(group: QueryGroup) -> tuple[int, int]:
    """``(depth, rows)`` of a group tree; the root group is depth 1."""
    depth, rows = 1, 0
    stack = [(group, 1)]
    while stack:
        node, d = stack.pop()
        depth = max(depth, d)
        for child in node.rows:
            if isinstance(child, QueryGroup):
                stack.append((child, d + 1))
            else:
                rows += 1
    return depth, rows


class IssueQuery(BaseModel):
    """A whole query: the filter tree (None: everything in scope) and the
    ordering. This is what a saved view stores."""

    model_config = ConfigDict(extra="forbid")

    filter: QueryGroup | None = None
    order_by: list[QueryOrder] = Field(default_factory=list, max_length=MAX_ORDER_TERMS)

    @model_validator(mode="after")
    def _caps(self) -> "IssueQuery":
        if self.filter is not None:
            depth, rows = tree_size(self.filter)
            if depth > MAX_DEPTH:
                raise ValueError(f"the query nests {depth} groups deep; the limit is {MAX_DEPTH}")
            if rows > MAX_ROWS:
                raise ValueError(f"the query has {rows} rows; the limit is {MAX_ROWS}")
        seen = set()
        for term in self.order_by:
            if term.field in seen:
                raise ValueError(f"order names '{term.field}' twice")
            seen.add(term.field)
        return self


class IssueQueryResponse(BaseModel):
    """What the query endpoint returns.

    ``query`` is the normalized structure that ran (the ``where`` text and
    the ``filter`` JSON combined), and ``where``/``order`` are its
    canonical text forms. Parsed again they select the same issues in
    the same order, though not always the identical structure (nested
    same-kind groups flatten, one-row groups and one-value ``label all``
    simplify). A web page can keep ``where``/``order`` in its URL; a
    saved view should store ``query``. ``total`` counts every match, so
    ``total > skip + len(issues)`` means there is another page.
    """

    query: IssueQuery
    where: str
    order: str
    total: int
    skip: int
    limit: int
    issues: list[IssueResponse]
