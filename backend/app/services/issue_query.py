"""Issue queries (CHT-1718): the ``where`` text form, and running a query.

Two halves:

* **Text.** ``parse_where`` turns the text form into the structure in
  ``app.schemas.issue_query`` and ``render_where`` turns a structure back
  into canonical text; ``parse_order``/``render_order`` do the same for
  the ordering. The server owns the only parser, so the CLI, MCP and a
  web URL all mean the same thing by the same text.
* **Running.** ``run_query`` compiles a validated structure into Oxyde
  ``Q`` expressions (a tree with a label or relation row is matched as id sets, see
  ``_Compiler.match_ids``) and runs it inside a scope (one project, or every
  project of a team) that the API layer has already access-checked.
  Every value reaches the database as a bound parameter, through the ORM
  except for the relation read, whose raw SQL holds only placeholders.

The text form, by example (docs/issue-query.md has the reference)::

    status=todo,in_progress priority!=low      both (AND)
    assignee=me or assignee=                   either (OR binds looser)
    (label=bug or type=bug) estimate=3..8      parentheses nest
    title~="login page"  text!~=wip  title^=Fix
    created=-7d..   due=..2026-11-01   sprint=   sprint!=
"""
from __future__ import annotations

import functools
import json
import operator
import re
from dataclasses import dataclass, field
from datetime import date, datetime, time, timedelta, timezone
from functools import reduce
from typing import get_args

from oxyde import Q, execute_raw
from oxyde.queries.conditions import Condition
from pydantic import ValidationError

from app.enums import IssueRelationType, IssueType, SprintStatus
from app.oxyde_models.issue import OxydeIssue, OxydeIssueLabel
from app.oxyde_models.label import OxydeLabel
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.sprint import OxydeSprint
from app.oxyde_models.team import OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.schemas.issue_query import (
    CURRENT_SPRINT,
    DATE_FORMATS,
    DATE_KEYWORDS,
    DATE_OFFSET_UNITS,
    FIELDS,
    KIND_KEYWORDS,
    MAX_DATE_OFFSET,
    MAX_DEPTH,
    MAX_NUMBER,
    MAX_ORDER_TERMS,
    MAX_ROWS,
    MAX_VALUE_LENGTH,
    MAX_VALUES,
    ME,
    MIN_NUMBER,
    OP_ARITY,
    ORDER_FIELDS,
    RELATIVE_DATE,
    IssueQuery,
    IssueQueryFieldsResponse,
    QueryFieldInfo,
    QueryDateValues,
    QueryLimits,
    QueryOpInfo,
    QueryGroup,
    QueryOrder,
    QueryRow,
)
from app.services.issue_service import _PRIORITY_ORDER, _STATUS_ORDER, _get_order
from app.utils.email_address import same_email

MAX_WHERE_LENGTH = 4000
MAX_ORDER_LENGTH = 200
# Parentheses the parser follows before giving up. Only a guard on its
# recursion: redundant parentheses build no group, so the depth cap
# (MAX_DEPTH) is checked on the tree they produce, not here.
MAX_PARENS = 32


class QueryError(ValueError):
    """The query cannot run as written: bad syntax, a value that names
    nothing, or a structure that fails validation. The message is meant
    for the person who typed the query."""


# ---------------------------------------------------------------------------
# Text form
# ---------------------------------------------------------------------------

# Longest operator first, so `!~=` is not read as `!` + `~=`.
_TEXT_OPS = ("!~=", "~=", "^=", "!=", "=")
_FIELD_ALIASES = {
    "labels": "label",
    "issue_type": "type",
    "epic": "parent",
    "search": "text",
    "id": "identifier",
    "due_date": "due",
}
_FIELD_RE = re.compile(r"[A-Za-z_]+")
_BARE_STOP = set(" \t\r\n,()\"'")
_BARE_OK = re.compile(r"^[A-Za-z0-9_.:@+/\-]+$")


@dataclass
class _Clause:
    field: str
    op: str
    values: list[str]
    pos: int


@dataclass
class _Lexer:
    text: str
    pos: int = 0
    tokens: list = field(default_factory=list)

    def error(self, message: str, pos: int | None = None) -> QueryError:
        at = self.pos if pos is None else pos
        return QueryError(f"{message} (at character {at + 1} of the where text)")

    def run(self) -> list:
        t = self.text
        while self.pos < len(t):
            ch = t[self.pos]
            if ch.isspace():
                self.pos += 1
            elif ch in "()":
                self.tokens.append((ch, self.pos))
                self.pos += 1
            else:
                self.tokens.append(self._word_or_clause())
        return self.tokens

    def _word_or_clause(self):
        start = self.pos
        m = _FIELD_RE.match(self.text, self.pos)
        if not m:
            raise self.error(f"expected a field name, found '{self.text[self.pos]}'")
        name = m.group(0).lower()
        self.pos = m.end()
        op = next((o for o in _TEXT_OPS if self.text.startswith(o, self.pos)), None)
        if op is None:
            if name in ("or", "and"):
                return (name, start)
            raise self.error(
                f"'{name}' needs an operator: one of = != ~= !~= ^=", start
            )
        self.pos += len(op)
        return (_Clause(name, op, self._values(), start), start)

    def _values(self) -> list[str]:
        t = self.text
        values: list[str] = []
        if self.pos >= len(t) or t[self.pos].isspace() or t[self.pos] == ")":
            return values  # `sprint=`: no value means empty
        while True:
            if self.pos < len(t) and t[self.pos] in "\"'":
                values.append(self._quoted())
            else:
                start = self.pos
                while self.pos < len(t) and t[self.pos] not in _BARE_STOP:
                    self.pos += 1
                if self.pos == start:
                    raise self.error("expected a value")
                values.append(t[start:self.pos])
            if self.pos < len(t) and t[self.pos] == ",":
                self.pos += 1
                continue
            if self.pos < len(t) and not (t[self.pos].isspace() or t[self.pos] == ")"):
                raise self.error(f"unexpected '{t[self.pos]}' after a value")
            return values

    def _quoted(self) -> str:
        t = self.text
        quote = t[self.pos]
        start = self.pos
        self.pos += 1
        out = []
        while self.pos < len(t):
            ch = t[self.pos]
            if ch == "\\" and self.pos + 1 < len(t):
                out.append(t[self.pos + 1])
                self.pos += 2
            elif ch == quote:
                self.pos += 1
                return "".join(out)
            else:
                out.append(ch)
                self.pos += 1
        raise self.error("unclosed quote", start)


class _Parser:
    """``expr := and ('or' and)*``; ``and := term (['and'] term)*``;
    ``term := '(' expr ')' | clause``. AND binds tighter than OR, the way
    Trac's query groups read: ``a b or c`` is ``(a AND b) OR c``."""

    def __init__(self, lexer: _Lexer):
        self.lexer = lexer
        self.tokens = lexer.run()
        self.i = 0

    def peek(self):
        return self.tokens[self.i] if self.i < len(self.tokens) else None

    def parse(self) -> dict | None:
        if not self.tokens:
            return None
        node = self.expr(0)  # depth: parentheses open around this point
        tok = self.peek()
        if tok is not None:
            raise self.lexer.error(f"unexpected '{tok[0]}'", tok[1])
        return node if "rows" in node else {"match": "all", "rows": [node]}

    def expr(self, depth: int) -> dict:
        if depth > MAX_PARENS:
            raise QueryError(f"the where text nests more than {MAX_PARENS} parentheses deep")
        alts = [self.conj(depth)]
        while (tok := self.peek()) is not None and tok[0] == "or":
            self.i += 1
            alts.append(self.conj(depth))
        if len(alts) == 1:
            return alts[0]
        rows = []
        for a in alts:  # flatten nested ORs: a or (b or c) is one group
            if a.get("match") == "any":
                rows.extend(a["rows"])
            else:
                rows.append(a)
        return {"match": "any", "rows": rows}

    def conj(self, depth: int) -> dict:
        terms = [self.term(depth)]
        while (tok := self.peek()) is not None and tok[0] not in ("or", ")"):
            if tok[0] == "and":
                self.i += 1
            terms.append(self.term(depth))
        if len(terms) == 1:
            return terms[0]
        rows = []
        for t in terms:  # flatten nested ANDs
            if t.get("match") == "all":
                rows.extend(t["rows"])
            else:
                rows.append(t)
        return {"match": "all", "rows": rows}

    def term(self, depth: int) -> dict:
        tok = self.peek()
        if tok is None:
            raise self.lexer.error("the where text ends where a clause was expected", len(self.lexer.text))
        kind, pos = tok
        if kind == "(":
            self.i += 1
            node = self.expr(depth + 1)
            close = self.peek()
            if close is None or close[0] != ")":
                raise self.lexer.error("missing ')'", pos)
            self.i += 1
            return node
        if isinstance(kind, _Clause):
            self.i += 1
            return _clause_row(kind, self.lexer)
        raise self.lexer.error(f"unexpected '{kind}'", pos)


def _clause_row(c: _Clause, lexer: _Lexer) -> dict:
    name = _FIELD_ALIASES.get(c.field, c.field)
    spec = FIELDS.get(name)
    if spec is None:
        raise lexer.error(
            f"unknown field '{c.field}'. Fields: {', '.join(FIELDS)}", c.pos
        )
    values = c.values
    if spec.kind == "text" and c.op in ("=", "!=") and values:
        # Free text has no exact match; `title=login` reads as contains.
        return {"field": name, "op": "contains" if c.op == "=" else "not_contains", "values": values}
    if c.op in ("=", "!="):
        if not values:
            return {"field": name, "op": "empty" if c.op == "=" else "not_empty", "values": []}
        if spec.kind in ("number", "date") and len(values) == 1 and ".." in values[0]:
            if c.op == "!=":
                raise lexer.error(f"a range takes '=', not '!=' ({name}!={values[0]})", c.pos)
            lo, _, hi = values[0].partition("..")
            if lo and hi:
                return {"field": name, "op": "between", "values": [lo, hi]}
            if lo:
                return {"field": name, "op": "gte" if spec.kind == "number" else "after", "values": [lo]}
            if hi:
                return {"field": name, "op": "lte" if spec.kind == "number" else "before", "values": [hi]}
            raise lexer.error(f"'..' needs a bound on at least one side ({name}=..)", c.pos)
        if spec.kind == "date":
            if c.op == "!=" or len(values) != 1:
                raise lexer.error(
                    f"{name} takes one date or a range: {name}=2026-10-01, "
                    f"{name}=2026-10-01..2026-10-31, {name}=-7d..", c.pos,
                )
            return {"field": name, "op": "between", "values": [values[0], values[0]]}
        return {"field": name, "op": "is" if c.op == "=" else "is_not", "values": values}
    if not values:
        raise lexer.error(f"'{c.op}' needs a value", c.pos)
    op = {"~=": "contains", "!~=": "not_contains", "^=": "begins_with"}[c.op]
    return {"field": name, "op": op, "values": values}


def parse_where(text: str | None) -> QueryGroup | None:
    """The where text as a validated group, or None for no filter."""
    if text is None or not text.strip():
        return None
    if len(text) > MAX_WHERE_LENGTH:
        raise QueryError(f"the where text is longer than {MAX_WHERE_LENGTH} characters")
    raw = _Parser(_Lexer(text)).parse()
    if raw is None:
        return None
    try:
        return IssueQuery.model_validate({"filter": raw}).filter
    except ValidationError as exc:
        raise QueryError(validation_message(exc)) from None


def parse_order(text: str | None) -> list[QueryOrder]:
    """``priority,-updated``: comma-separated fields, ``-`` for descending.
    A bare field sorts ascending."""
    if text is None or not text.strip():
        return []
    terms = []
    for part in text.split(","):
        part = part.strip()
        if not part:
            raise QueryError("order has an empty term")
        direction = "asc"
        if part[0] in "-+":
            direction = "desc" if part[0] == "-" else "asc"
            part = part[1:]
        if part not in ORDER_FIELDS:
            raise QueryError(f"cannot order by '{part}'. Order fields: {', '.join(ORDER_FIELDS)}")
        terms.append({"field": part, "direction": direction})
    if len(terms) > MAX_ORDER_TERMS:
        raise QueryError(f"order takes at most {MAX_ORDER_TERMS} fields")
    try:
        return IssueQuery.model_validate({"order_by": terms}).order_by
    except ValidationError as exc:
        raise QueryError(validation_message(exc)) from None


def validation_message(exc: ValidationError) -> str:
    """One readable line per pydantic error, without the input echo."""
    parts = []
    for err in exc.errors():
        loc = ".".join(str(p) for p in err.get("loc", ()))
        msg = err.get("msg", "invalid")
        if msg.startswith("Value error, "):
            msg = msg[len("Value error, "):]
        parts.append(f"{loc}: {msg}" if loc else msg)
    return "; ".join(parts)


def _quote(value: str) -> str:
    if _BARE_OK.match(value) and ".." not in value and value.lower() not in ("or", "and"):
        return value
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


_RENDER_OPS = {
    "is": "=", "is_not": "!=", "contains": "~=", "not_contains": "!~=",
    "begins_with": "^=",
}


def _render_row(row: QueryRow) -> str:
    f, op, vals = row.field, row.op, row.values
    if op == "empty":
        return f"{f}="
    if op == "not_empty":
        return f"{f}!="
    if op in ("gte", "after"):
        return f"{f}={_quote(vals[0])}.."
    if op in ("lte", "before"):
        return f"{f}=..{_quote(vals[0])}"
    if op == "between":
        if FIELDS[f].kind == "date" and vals[0] == vals[1]:
            return f"{f}={_quote(vals[0])}"
        return f"{f}={_quote(vals[0])}..{_quote(vals[1])}"
    if op == "all":
        return " ".join(f"{f}={_quote(v)}" for v in vals)
    return f"{f}{_RENDER_OPS[op]}" + ",".join(_quote(v) for v in vals)


def _render_node(node, parent: str | None) -> str:
    """``parent`` is the enclosing group's match (None at the root). Only
    a multi-clause node inside an OR needs parentheses, since AND binds
    tighter; nested groups get them anyway, to read unambiguously."""
    if isinstance(node, QueryRow):
        text = _render_row(node)
        # `label all a,b` renders as two clauses; inside an OR they must
        # stay together.
        multi = node.op == "all" and len(node.values) > 1
        return f"({text})" if (parent == "any" and multi) else text
    joiner = " " if node.match == "all" else " or "
    inner = joiner.join(_render_node(child, node.match) for child in node.rows)
    if parent is None or len(node.rows) == 1:
        return inner
    return f"({inner})"


def render_where(group: QueryGroup | None) -> str:
    """Canonical text for a group. ``parse_where(render_where(g))``
    selects the same issues as ``g``; it is not always ``g`` itself
    (see ``IssueQueryResponse``), and tests pin the forms that differ."""
    if group is None:
        return ""
    return _render_node(group, None)


def render_order(order_by: list[QueryOrder]) -> str:
    return ",".join(("-" if t.direction == "desc" else "") + t.field for t in order_by)


def combine(*groups: QueryGroup | None) -> QueryGroup | None:
    """AND the given groups into one, flattening top-level ANDs."""
    present = [g for g in groups if g is not None]
    if not present:
        return None
    if len(present) == 1:
        return present[0]
    rows = []
    for g in present:
        if g.match == "all":
            rows.extend(g.rows)
        else:
            rows.append(g)
    try:
        return IssueQuery.model_validate(
            {"filter": {"match": "all", "rows": [r.model_dump() for r in rows]}}
        ).filter
    except ValidationError as exc:
        raise QueryError(validation_message(exc)) from None


MAX_FILTER_JSON_LENGTH = 16000
_MAX_JSON_NESTING = 2 * MAX_DEPTH + 2  # group -> rows list -> group ...


def _json_nesting(value) -> int:
    depth = 0
    stack = [(value, 1)]
    while stack:
        node, d = stack.pop()
        if isinstance(node, (dict, list)):
            depth = max(depth, d)
            children = node.values() if isinstance(node, dict) else node
            stack.extend((c, d + 1) for c in children)
    return depth


def parse_filter_json(text: str | None) -> QueryGroup | None:
    """The structure given as JSON (a URL parameter), validated."""
    if text is None or not text.strip():
        return None
    if len(text) > MAX_FILTER_JSON_LENGTH:
        raise QueryError(f"filter is longer than {MAX_FILTER_JSON_LENGTH} characters")
    try:
        raw = json.loads(text)
    except (ValueError, RecursionError):
        raise QueryError("filter is not valid JSON") from None
    if _json_nesting(raw) > _MAX_JSON_NESTING + 2:
        raise QueryError(f"filter nests deeper than {MAX_DEPTH} groups")
    try:
        return IssueQuery.model_validate({"filter": raw}).filter
    except ValidationError as exc:
        raise QueryError(validation_message(exc)) from None


def build_query(*, where: str | None, filter_json: str | None, order: str | None) -> IssueQuery:
    """One validated ``IssueQuery`` from the endpoint's three inputs."""
    group = combine(parse_where(where), parse_filter_json(filter_json))
    return IssueQuery(filter=group, order_by=parse_order(order))


# ---------------------------------------------------------------------------
# Running a query
# ---------------------------------------------------------------------------

_COLUMN = {
    "status": "status",
    "priority": "priority",
    "type": "issue_type",
    "assignee": "assignee_id",
    "creator": "creator_id",
    "project": "project_id",
    "sprint": "sprint_id",
    "estimate": "estimate",
    "parent": "parent_id",
    "identifier": "identifier",
    "created": "created_at",
    "updated": "updated_at",
    "completed": "completed_at",
    "due": "due_date",
}
_TEXT_COLUMNS = {
    "title": (("title", False),),
    # (column, nullable)
    "text": (("title", False), ("description", True), ("identifier", False)),
}
_NULLABLE = {"assignee_id", "creator_id", "sprint_id", "estimate", "parent_id", "completed_at", "due_date"}

_ORDER_COLUMN = {
    "created": "created_at",
    "updated": "updated_at",
    "priority": "priority",
    "status": "status",
    "title": "title",
    "estimate": "estimate",
    "identifier": "number",
    "due": "due_date",
    "completed": "completed_at",
    "type": "issue_type",
    "assignee": "assignee_id",
    "sprint": "sprint_id",
    "project": "project_id",
}
DEFAULT_ORDER = [QueryOrder(field="updated", direction="desc")]


# Values for the operator examples. Dates for a date field, so a range
# renders the way it does for one (a `between` of two equal days is
# written as one day, so the two must differ).
_EXAMPLE_VALUES = {"date": ("2026-01-01", "2026-12-31")}


def _op_text(op: str) -> str:
    """The text form of ``op``, rendered by the real renderer from a row
    of the first field that takes it, with ``{field}`` for the field and
    ``a``/``b`` for the values."""
    field_name = next(f for f, spec in FIELDS.items() if op in spec.ops)
    kind = FIELDS[field_name].kind
    a, b = _EXAMPLE_VALUES.get(kind, ("a", "b"))
    lo, hi = OP_ARITY[op]
    values = [a, b][: max(lo, min(hi, 2))]
    row = QueryRow.model_construct(field=field_name, op=op, values=values)
    text = _render_row(row)
    # Field names are words and values here are `a`/`b` or dates, so
    # the field name only occurs where a clause begins.
    text = re.sub(rf"\b{field_name}(?=[=!~^])", "{field}", text)
    return text.replace(a, "a").replace(b, "b")


@functools.cache
def vocabulary() -> IssueQueryFieldsResponse:
    """The fields, operators, order fields and caps, from the allow-list
    the validator and the parser use (CHT-1783). Built once: it depends
    only on constants. The one instance is shared, so do not mutate it."""
    aliases: dict[str, list[str]] = {}
    for alias, name in _FIELD_ALIASES.items():
        aliases.setdefault(name, []).append(alias)
    return IssueQueryFieldsResponse(
        fields=[
            QueryFieldInfo(
                name=name,
                kind=spec.kind,
                ops=[op for op in OP_ARITY if op in spec.ops],
                enum_values=[m.value for m in spec.enum] if spec.enum else None,
                keywords=list(KIND_KEYWORDS.get(spec.kind, ())),
                aliases=aliases.get(name, []),
            )
            for name, spec in FIELDS.items()
        ],
        ops=[
            QueryOpInfo(name=op, min_values=lo, max_values=hi, text=_op_text(op))
            for op, (lo, hi) in OP_ARITY.items()
        ],
        match_values=list(get_args(QueryGroup.model_fields["match"].annotation)),
        date_values=QueryDateValues(
            formats=list(DATE_FORMATS),
            offset_units=dict(DATE_OFFSET_UNITS),
            max_offset=MAX_DATE_OFFSET,
        ),
        order_fields=list(ORDER_FIELDS),
        order_directions=list(get_args(QueryOrder.model_fields["direction"].annotation)),
        default_order=render_order(DEFAULT_ORDER),
        default_order_by=DEFAULT_ORDER,
        limits=QueryLimits(
            max_depth=MAX_DEPTH,
            max_rows=MAX_ROWS,
            max_values=MAX_VALUES,
            max_value_length=MAX_VALUE_LENGTH,
            max_order_terms=MAX_ORDER_TERMS,
            max_order_length=MAX_ORDER_LENGTH,
            max_where_length=MAX_WHERE_LENGTH,
            max_parens=MAX_PARENS,
            max_filter_json_length=MAX_FILTER_JSON_LENGTH,
            min_number=MIN_NUMBER,
            max_number=MAX_NUMBER,
        ),
    )


def _all(qs: list[Q]) -> Q:
    return reduce(operator.and_, qs)


def _any(qs: list[Q]) -> Q:
    return reduce(operator.or_, qs)


def _in(column: str, values) -> Q:
    return Q(**{f"{column}__in": list(values)})


def _not_in(column: str, values) -> Q:
    """NOT IN that keeps NULL rows: `assignee is_not X` must still list
    unassigned issues, and a bare NOT IN would drop them (NULL is not
    unknown-to-false in SQL)."""
    q = ~_in(column, values)
    if column in _NULLABLE:
        return Q(**{f"{column}__isnull": True}) | q
    return q


def _compare(column: str, sql_op: str, value: datetime) -> Q:
    """``column <op> value`` as an ORM condition with a bound value.

    The ``column__gte=`` lookup cannot be used for the nullable
    timestamps: Oxyde 0.7 does not unwrap ``Optional[DateTimeUTC]`` (an
    ``Annotated`` inside an ``Optional``) and so offers those columns
    only exact/in/isnull. ``Condition`` is the node those lookups build
    anyway; ``sql_op`` comes from the fixed set below, never from input.
    """
    assert sql_op in (">=", "<=", "<")
    return Q(Condition(column, sql_op, value, column=column).to_ir())


def _null(column: str, is_null: bool) -> Q:
    return Q(**{f"{column}__isnull": is_null})


def _date_bound(value: str, now: datetime, upper: bool) -> tuple[datetime, bool]:
    """``(instant, inclusive)``. A day (``2026-10-01``, ``today``) covers
    the whole UTC day, so as an upper bound it means "before the next
    day". A datetime or an offset (``-7d``) is an instant.

    The last day there is, 9999-12-31, has no next day: as an upper bound
    it means "up to the end of time", inclusive. A datetime whose offset
    carries it past the representable range in UTC is a QueryError (a
    400), never an OverflowError (a 500)."""
    m = RELATIVE_DATE.match(value)
    try:
        if m:
            n, unit = int(m.group(1)), m.group(2)
            return now - timedelta(**{DATE_OFFSET_UNITS[unit]: n}), True
        if value.lower() in DATE_KEYWORDS:
            day = now.date() - timedelta(days=DATE_KEYWORDS[value.lower()])
        elif re.match(r"^[0-9]{4}-[0-9]{2}-[0-9]{2}$", value):
            day = date.fromisoformat(value)
        else:
            dt = datetime.fromisoformat(value)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc), True
        start = datetime.combine(day, time.min, tzinfo=timezone.utc)
        if upper:
            if day == date.max:
                return datetime.max.replace(tzinfo=timezone.utc), True
            return start + timedelta(days=1), False
        return start, True
    except OverflowError:
        raise QueryError(f"'{value}' is outside the range of dates a query can use") from None


async def filter_principals(team_id: str, confined_to: str | None) -> list[OxydeUser]:
    """Who an issue filter may name in a team: every member, deactivated
    ones included (their history stays searchable), and every agent of
    the team, except that for a caller confined to one project
    (``confined_to``) an agent scoped to a sibling project is not part of
    its world (as for @mentions, ``can_reach``). The ``where`` language
    and the MCP ``issue_list`` assignee filter both resolve here, so they
    agree (CHT-1839)."""
    member_ids = [m.user_id for m in await OxydeTeamMember.objects.filter(team_id=team_id).all()]
    users = await OxydeUser.objects.filter(id__in=member_ids).all() if member_ids else []
    agents = await OxydeUser.objects.filter(agent_team_id=team_id).all()
    if confined_to:
        agents = [a for a in agents if a.agent_project_id in (None, confined_to)]
    seen = {}
    for u in [*users, *agents]:
        seen[u.id] = u
    return list(seen.values())


@dataclass
class QueryScope:
    """Where a query runs, already access-checked by the API layer."""

    user: OxydeUser
    team_id: str
    project_ids: list[str]


class _Compiler:
    def __init__(self, scope: QueryScope, now: datetime):
        self.scope = scope
        self.now = now
        self._principals = None
        self._projects = None
        self._sprints = None
        self._labels = None
        self._universe_ids = None
        # A project-scoped agent's names resolve only in its own project,
        # so a query cannot tell it whether a sibling project's key or
        # issue exists: the 200/400 split would answer that (CHT-1780).
        user = scope.user
        self._confined_to = user.agent_project_id if user.is_agent and user.agent_project_id else None

    async def group(self, group: QueryGroup) -> Q:
        parts = [await self.node(child) for child in group.rows]
        return _all(parts) if group.match == "all" else _any(parts)

    async def node(self, node) -> Q:
        if isinstance(node, QueryGroup):
            return await self.group(node)
        return await self.row(node)

    async def row(self, row: QueryRow) -> Q:
        spec = FIELDS[row.field]
        kind, op, vals = spec.kind, row.op, row.values
        column = _COLUMN.get(row.field)

        if op == "empty" and kind not in _ID_SET_KINDS:
            return _null(column, True)
        if op == "not_empty" and kind not in _ID_SET_KINDS:
            return _null(column, False)

        if kind == "text":
            return self._text(row.field, op, vals)
        if kind in _ID_SET_KINDS:  # pragma: no cover - match_ids takes these rows
            raise AssertionError(f"{kind} rows are matched by match_ids, not in SQL")
        if kind == "date":
            return self._date(column, op, vals)
        if kind == "number":
            nums = [int(v) for v in vals]
            if op == "gte":
                return Q(**{f"{column}__gte": nums[0]})
            if op == "lte":
                return Q(**{f"{column}__lte": nums[0]})
            if op == "between":
                lo, hi = sorted(nums)
                return Q(**{f"{column}__gte": lo}) & Q(**{f"{column}__lte": hi})
            return _in(column, nums) if op == "is" else _not_in(column, nums)

        if kind == "enum":
            ids = [spec.enum(v) for v in vals]  # members: the filter stores .name
        elif kind == "user":
            ids = [await self._user(v) for v in vals]
        elif kind == "project":
            ids = [await self._project(v) for v in vals]
        elif kind == "sprint":
            ids = [i for v in vals for i in await self._sprint(v)]
        elif kind == "issue":
            ids = await self._issues(vals)
        elif kind == "identifier":
            ids = [v.upper() for v in vals]
        else:  # pragma: no cover - FIELDS and this method change together
            raise QueryError(f"unsupported field {row.field}")
        return _in(column, ids) if op == "is" else _not_in(column, ids)

    def _text(self, field_name: str, op: str, vals: list[str]) -> Q:
        columns = _TEXT_COLUMNS[field_name]
        if op == "begins_with":
            return _any([Q(**{f"{c}__istartswith": v}) for v in vals for c, _ in columns])
        if op == "contains":
            return _any([Q(**{f"{c}__icontains": v}) for v in vals for c, _ in columns])
        # not_contains: no value appears in any column. A NULL description
        # contains nothing, so it passes.
        parts = []
        for v in vals:
            for c, nullable in columns:
                q = ~Q(**{f"{c}__icontains": v})
                parts.append((Q(**{f"{c}__isnull": True}) | q) if nullable else q)
        return _all(parts)

    def _date(self, column: str, op: str, vals: list[str]) -> Q:
        parts = []
        if op in ("after", "between"):
            lo, _ = _date_bound(vals[0], self.now, upper=False)
            parts.append(_compare(column, ">=", lo))
        if op in ("before", "between"):
            hi, inclusive = _date_bound(vals[-1], self.now, upper=True)
            parts.append(_compare(column, "<=" if inclusive else "<", hi))
        return _all(parts)

    # -- value resolution ---------------------------------------------------

    async def _user(self, value: str) -> str:
        lowered = value.lower()
        if lowered == ME:
            return self.scope.user.id
        if self._principals is None:
            self._principals = await filter_principals(self.scope.team_id, self._confined_to)
        for u in self._principals:
            if u.id == value:
                return u.id
        # ASCII case only, like every other address comparison (CHT-1804).
        matches = [u for u in self._principals if same_email(u.email or "", value)]
        if not matches:
            matches = [u for u in self._principals if (u.name or "").lower() == lowered]
        if len(matches) == 1:
            return matches[0].id
        if len(matches) > 1:
            raise QueryError(f"'{value}' names more than one person on this team; use their email or id")
        hint = " (for no assignee, write `assignee=` with no value)" if lowered in ("unassigned", "none") else ""
        raise QueryError(f"no one on this team is '{value}'{hint}")

    async def _team_projects(self) -> list[OxydeProject]:
        """The team's projects this caller can name: all of them, or for a
        project-scoped agent its own one."""
        if self._projects is None:
            projects = await OxydeProject.objects.filter(team_id=self.scope.team_id).all()
            if self._confined_to:
                projects = [p for p in projects if p.id == self._confined_to]
            self._projects = projects
        return self._projects

    async def _project(self, value: str) -> str:
        lowered = value.lower()
        for p in await self._team_projects():
            if p.id == value or p.key.lower() == lowered or p.name.lower() == lowered:
                return p.id
        raise QueryError(f"no project '{value}' in this team")

    async def _sprint(self, value: str) -> list[str]:
        if self._sprints is None:
            self._sprints = await OxydeSprint.objects.filter(
                project_id__in=self.scope.project_ids
            ).all()
        lowered = value.lower()
        if lowered == CURRENT_SPRINT:
            # Every project in scope has its own active sprint; read, never
            # create (a query is not where sprints get materialised).
            return [s.id for s in self._sprints if s.status == SprintStatus.ACTIVE]
        hits = [s.id for s in self._sprints if s.id == value]
        if not hits:
            hits = [s.id for s in self._sprints if (s.name or "").lower() == lowered]
        if not hits:
            raise QueryError(f"no sprint '{value}' here (use a sprint name, id, or `current`)")
        return hits

    async def _issues(self, values: list[str]) -> list[str]:
        """Parent references: identifiers (CHT-12) or ids, looked up in the
        projects the caller can name (``_team_projects``) only, so a query
        cannot probe other teams, or a project-scoped agent its sibling
        projects."""
        project_ids = [p.id for p in await self._team_projects()]
        idents = [v.upper() for v in values]
        found = await OxydeIssue.objects.filter(
            Q(project_id__in=project_ids) & (Q(identifier__in=idents) | Q(id__in=list(values)))
        ).values("id", "identifier").all()
        known = {r["identifier"] for r in found} | {r["id"] for r in found}
        missing = [v for v in values if v not in known and v.upper() not in known]
        if missing:
            raise QueryError(f"no issue {', '.join(missing)} in this team")
        return [r["id"] for r in found]

    # -- labels -------------------------------------------------------------
    #
    # Oxyde has no subquery or EXISTS in a filter, and cannot follow the
    # issue->labels many-to-many, so a label row cannot be one SQL
    # condition. Rather than inline the labelled ids as an IN list (one
    # bound parameter per issue, per row: enough label rows on a big team
    # pass SQLite's variable limit), a tree with a label row is matched
    # as id sets: each label-free part of a group is one scoped query,
    # each label row one junction query, combined here. No query binds
    # more than the scope's project ids, a row's values and label ids.

    async def _universe(self) -> set[str]:
        if self._universe_ids is None:
            rows = await OxydeIssue.objects.filter(
                project_id__in=self.scope.project_ids
            ).values("id").all()
            self._universe_ids = {r["id"] for r in rows}
        return self._universe_ids

    async def _labels_by_name(self) -> dict[str, list[str]]:
        """Lowercased name -> ids. Label names are compared without case,
        and a team can hold `Bug` and `bug` both; a row naming either
        means both."""
        if self._labels is None:
            self._labels = await OxydeLabel.objects.filter(team_id=self.scope.team_id).all()
        by_name: dict[str, list[str]] = {}
        for label in self._labels:
            by_name.setdefault(label.name.lower(), []).append(label.id)
        return by_name

    async def _labelled(self, label_ids: list[str]) -> dict[str, set[str]]:
        """label id -> ids of the in-scope issues carrying it."""
        if not label_ids:
            return {}
        rows = await OxydeIssueLabel.objects.filter(label_id__in=label_ids).values(
            "issue_id", "label_id"
        ).all()
        universe = await self._universe()
        out: dict[str, set[str]] = {}
        for r in rows:
            if r["issue_id"] in universe:
                out.setdefault(r["label_id"], set()).add(r["issue_id"])
        return out

    async def _label_ids(self, op: str, vals: list[str]) -> set[str]:
        by_name = await self._labels_by_name()
        if op in ("empty", "not_empty"):
            every = [i for ids in by_name.values() for i in ids]
            labelled = set().union(*(await self._labelled(every)).values())
            return (await self._universe()) - labelled if op == "empty" else labelled
        missing = [v for v in vals if v.lower() not in by_name]
        if missing:
            raise QueryError(f"no label {', '.join(repr(m) for m in missing)} in this team")
        per_label = await self._labelled([i for v in vals for i in by_name[v.lower()]])

        def carrying(name: str) -> set[str]:
            return set().union(*(per_label.get(i, set()) for i in by_name[name.lower()]))

        if op == "all":
            return set.intersection(*(carrying(v) for v in vals))
        hits = set().union(*(carrying(v) for v in vals))
        return hits if op == "is" else (await self._universe()) - hits

    # -- relations (CHT-1903) ----------------------------------------------
    #
    # Matched as id sets like labels, for the same reason: a relation row
    # is a condition on another table. A relation row stores
    # ``issue_id`` blocks ``related_issue_id``; relates_to has no
    # direction, so `related` reads it both ways round.
    #
    # Both ends must be issues the caller can name (``_team_projects``):
    # an edge to an issue it cannot see is not there, as in the issue's
    # own relation list (CHT-1780). That also bounds the read to the
    # team's relations.

    async def _relation_pairs(self, rtype: IssueRelationType) -> list[tuple[str, str]]:
        """(blocker, blocked) or (a, b) for every ``rtype`` row whose two
        ends are both in projects the caller can name."""
        project_ids = [p.id for p in await self._team_projects()]
        if not project_ids:
            return []
        marks = ",".join("?" for _ in project_ids)
        rows = await execute_raw(
            "SELECT r.issue_id AS a, r.related_issue_id AS b FROM issue_relations r "
            "JOIN issues ia ON ia.id = r.issue_id JOIN issues ib ON ib.id = r.related_issue_id "
            f"WHERE r.relation_type = ? AND ia.project_id IN ({marks}) AND ib.project_id IN ({marks})",
            [rtype.name, *project_ids, *project_ids],
        )
        return [(r["a"], r["b"]) for r in rows]

    async def _relation_ids(self, field_name: str, op: str, vals: list[str]) -> set[str]:
        universe = await self._universe()
        named = set(await self._issues(vals)) if op in ("is", "is_not") else None
        if field_name == "related":
            rows = await self._relation_pairs(IssueRelationType.RELATES_TO)
            # (matched, other): each relates_to row links both ends.
            pairs = rows + [(b, a) for a, b in rows]
        elif field_name == "blocks":
            # The matched issue blocks the named one.
            pairs = await self._relation_pairs(IssueRelationType.BLOCKS)
        else:  # blocked_by: the named issue blocks the matched one
            pairs = [(b, a) for a, b in await self._relation_pairs(IssueRelationType.BLOCKS)]
        if named is None:
            linked = {mine for mine, _ in pairs} & universe
            return universe - linked if op == "empty" else linked
        hits = {mine for mine, other in pairs if other in named} & universe
        return hits if op == "is" else universe - hits

    async def match_ids(self, node) -> set[str]:
        """The in-scope ids matching ``node``, for a tree with a label or
        relation row."""
        if isinstance(node, QueryRow):
            if FIELDS[node.field].kind == "relation":
                return await self._relation_ids(node.field, node.op, node.values)
            return await self._label_ids(node.op, node.values)
        plain = [await self.node(c) for c in node.rows if not has_id_set_row(c)]
        sets = []
        if plain:
            q = _all(plain) if node.match == "all" else _any(plain)
            rows = await OxydeIssue.objects.filter(
                _in("project_id", self.scope.project_ids) & q
            ).values("id").all()
            sets.append({r["id"] for r in rows})
        for c in node.rows:
            if has_id_set_row(c):
                sets.append(await self.match_ids(c))
        return set.intersection(*sets) if node.match == "all" else set().union(*sets)


# Kinds whose rows are matched as id sets by ``_Compiler.match_ids``.
_ID_SET_KINDS = frozenset({"label", "relation"})


def has_id_set_row(node) -> bool:
    """Whether ``node`` holds a row matched as an id set (a label or a
    relation row) anywhere."""
    if isinstance(node, QueryRow):
        return FIELDS[node.field].kind in _ID_SET_KINDS
    return any(has_id_set_row(c) for c in node.rows)


# Type orders the way the enum lists it (task, bug, feature, ...), the
# order the vocabulary gives its values in, both stored and wire form.
_TYPE_ORDER = {k: n for n, m in enumerate(IssueType) for k in (m.name, m.value)}


async def _relation_keys(field_name: str, ids: set[str]) -> dict[str, tuple]:
    """A sort key per related row id for an order term on a relation
    column. Each key ends with the id, so two rows with the same name
    never interleave: a group stays contiguous. An id with no row (a
    deleted user, say) sorts with the nulls."""
    if not ids:
        return {}
    ids = sorted(ids)
    if field_name == "assignee":
        rows = await OxydeUser.objects.filter(id__in=ids).values("id", "name").all()
        return {r["id"]: ((r["name"] or "").lower(), r["id"]) for r in rows}
    if field_name == "sprint":
        sprints = await OxydeSprint.objects.filter(id__in=ids).all()
        # Sprints that have run (active or completed) in the order they
        # ran; planned ones after them, in the order they were made.
        # "Planned" comes from the status, not a null activated_at:
        # migration 0016 nulled activated_at on every sprint that ran
        # before it, and those fall back to their creation time.
        return {
            s.id: (s.status == SprintStatus.PLANNED, s.activated_at or s.created_at, s.created_at, s.id)
            for s in sprints
        }
    rows = await OxydeProject.objects.filter(id__in=ids).values("id", "key").all()
    return {r["id"]: (r["key"].lower(), r["id"]) for r in rows}


_RELATION_ORDER = {"assignee", "sprint", "project"}


def _sort_value(field_name: str, row: dict, relations: dict[str, dict[str, tuple]]):
    v = row[_ORDER_COLUMN[field_name]]
    if v is None:
        return None
    if field_name in _RELATION_ORDER:
        return relations[field_name].get(v)
    if field_name == "priority":
        return _get_order(_PRIORITY_ORDER, v)
    if field_name == "status":
        return _get_order(_STATUS_ORDER, v)
    if field_name == "type":
        return _get_order(_TYPE_ORDER, v)
    if field_name == "title":
        return v.lower()
    if field_name == "identifier":
        return (row["identifier"].rsplit("-", 1)[0], v)
    return v


async def run_query(
    query: IssueQuery, scope: QueryScope, *, skip: int, limit: int,
    now: datetime | None = None,
) -> tuple[list[OxydeIssue], int]:
    """``(page, total)``: the issues in ``scope`` matching ``query``,
    ordered, with ``skip``/``limit`` applied, and how many match in all.

    Matching runs in SQL; ordering runs here over the matched ids and
    their sort columns, because priority and status order by meaning
    (urgent before low), not by their stored names. ``total`` falls out
    of the same pass. Nulls sort last in either direction; ties fall back
    to newest-created, then id.
    """
    now = now or datetime.now(timezone.utc)
    if not scope.project_ids:
        return [], 0
    where = _in("project_id", scope.project_ids)
    matched = None
    if query.filter is not None:
        compiler = _Compiler(scope, now)
        if has_id_set_row(query.filter):
            matched = await compiler.match_ids(query.filter)
        else:
            where = where & await compiler.group(query.filter)

    order_by = query.order_by or DEFAULT_ORDER
    columns = {"id", "created_at", "identifier"} | {_ORDER_COLUMN[t.field] for t in order_by}
    rows = await OxydeIssue.objects.filter(where).values(*sorted(columns)).all()
    if matched is not None:
        rows = [r for r in rows if r["id"] in matched]

    relations = {
        t.field: await _relation_keys(
            t.field, {r[_ORDER_COLUMN[t.field]] for r in rows} - {None},
        )
        for t in order_by if t.field in _RELATION_ORDER
    }
    rows.sort(key=lambda r: r["id"])
    rows.sort(key=lambda r: r["created_at"], reverse=True)
    for term in reversed(order_by):
        present = [r for r in rows if _sort_value(term.field, r, relations) is not None]
        absent = [r for r in rows if _sort_value(term.field, r, relations) is None]
        present.sort(key=lambda r: _sort_value(term.field, r, relations), reverse=term.direction == "desc")
        rows = present + absent

    total = len(rows)
    page_ids = [r["id"] for r in rows[skip:skip + limit]]
    if not page_ids:
        return [], total
    issues = await OxydeIssue.objects.filter(id__in=page_ids).join("creator").prefetch("labels").all()
    position = {iid: n for n, iid in enumerate(page_ids)}
    issues.sort(key=lambda i: position[i.id])
    return issues, total
