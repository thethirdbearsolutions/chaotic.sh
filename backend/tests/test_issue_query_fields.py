"""The issue query vocabulary endpoint (CHT-1783): it lists everything the
validator knows, and what it says is what the validator does."""
import re
from datetime import datetime, time, timedelta, timezone

import pytest
from pydantic import ValidationError

from app.enums import SprintStatus
from app.schemas import issue_query as schema
from app.schemas.issue_query import (
    FIELDS,
    OP_ARITY,
    IssueQuery,
    OrderField,
    QueryField,
    QueryFieldKind,
    QueryOp,
    QueryRow,
)
from app.services.issue_query import QueryError, _quote, parse_order, parse_where, vocabulary
from .test_issue_query import _issue

URL = "/api/issues/query/fields"

# A value each kind accepts, two where a range needs them.
SAMPLE = {
    "user": ("me", "someone@example.com"),
    "project": ("CHT", "OTH"),
    "sprint": ("current", "Sprint 1"),
    "label": ("bug", "ui"),
    "number": ("3", "8"),
    "issue": ("CHT-1", "CHT-2"),
    "relation": ("CHT-1", "CHT-2"),
    "identifier": ("CHT-1", "CHT-2"),
    "date": ("2026-01-01", "2026-02-01"),
    "text": ("x", "y"),
}


def _samples(field: str) -> tuple[str, str]:
    spec = FIELDS[field]
    if spec.kind == "enum":
        members = [m.value for m in spec.enum]
        return members[0], members[1]
    return SAMPLE[spec.kind]


def _values(field: str, n: int) -> list[str]:
    a, b = _samples(field)
    return ([a, b] * (n // 2 + 1))[:n]


@pytest.fixture(scope="module")
def vocab():
    return vocabulary().model_dump(mode="json")


# ============================================================================
# The endpoint
# ============================================================================


@pytest.mark.asyncio
async def test_needs_a_signed_in_caller(client):
    assert (await client.get(URL)).status_code == 401


@pytest.mark.asyncio
async def test_every_signed_in_caller_gets_the_same_vocabulary(
    client, auth_headers, agent_headers, test_team, test_project, vocab,
):
    """A person, a team agent and a project-scoped agent all read it, and
    it is the same for each: it depends on no team, project or data."""
    from app.oxyde_models.user import OxydeUser
    from app.utils.security import create_access_token

    scoped = await OxydeUser.objects.create(
        email="scoped@example.com", hashed_password="x", name="Scoped", is_agent=True,
        agent_team_id=test_team.id, agent_project_id=test_project.id,
    )
    scoped_headers = {"Authorization": f"Bearer {create_access_token(data={'sub': scoped.id})}"}
    for headers in (auth_headers, agent_headers, scoped_headers):
        r = await client.get(URL, headers=headers)
        assert r.status_code == 200, r.text
        assert r.json() == vocab


@pytest.mark.asyncio
async def test_it_is_not_read_as_an_issue_id(client, auth_headers):
    """`/issues/query/fields` is its own route, not `/issues/{issue_id}`
    followed by something."""
    r = await client.get(URL, headers=auth_headers)
    assert set(r.json()) == {
        "fields", "ops", "match_values", "date_values", "order_fields", "order_directions",
        "default_order", "default_order_by", "limits",
    }


# ============================================================================
# It lists everything the validator knows
# ============================================================================


def test_every_field_and_op_is_listed(vocab):
    assert [f["name"] for f in vocab["fields"]] == list(FIELDS)
    assert {f["name"] for f in vocab["fields"]} == {f.value for f in QueryField}
    assert [o["name"] for o in vocab["ops"]] == list(OP_ARITY)
    assert {o["name"] for o in vocab["ops"]} == {o.value for o in QueryOp}
    assert vocab["order_fields"] == [f.value for f in OrderField]


def test_fields_carry_the_allow_list(vocab):
    for f in vocab["fields"]:
        spec = FIELDS[f["name"]]
        assert f["kind"] == spec.kind
        assert QueryFieldKind(f["kind"])
        assert set(f["ops"]) == set(spec.ops)
        assert len(f["ops"]) == len(spec.ops)
        if spec.enum is None:
            assert f["enum_values"] is None
        else:
            assert f["enum_values"] == [m.value for m in spec.enum]


def test_ops_carry_their_arity(vocab):
    for o in vocab["ops"]:
        assert (o["min_values"], o["max_values"]) == OP_ARITY[o["name"]]


def test_limits_are_the_validators(vocab):
    from app.services import issue_query as service

    assert vocab["limits"] == {
        "max_depth": schema.MAX_DEPTH,
        "max_rows": schema.MAX_ROWS,
        "max_values": schema.MAX_VALUES,
        "max_value_length": schema.MAX_VALUE_LENGTH,
        "max_order_terms": schema.MAX_ORDER_TERMS,
        "max_order_length": service.MAX_ORDER_LENGTH,
        "max_where_length": service.MAX_WHERE_LENGTH,
        "max_parens": service.MAX_PARENS,
        "max_filter_json_length": service.MAX_FILTER_JSON_LENGTH,
        "min_number": schema.MIN_NUMBER,
        "max_number": schema.MAX_NUMBER,
    }


# ============================================================================
# What it says is what the validator does
# ============================================================================


def _row(field, op, n):
    return QueryRow.model_validate({"field": field, "op": op, "values": _values(field, n)})


@pytest.mark.parametrize("field", list(FIELDS))
def test_listed_ops_are_accepted_and_others_refused(vocab, field):
    info = next(f for f in vocab["fields"] if f["name"] == field)
    arity = {o["name"]: (o["min_values"], o["max_values"]) for o in vocab["ops"]}
    for op in OP_ARITY:
        lo, hi = arity[op]
        if op in info["ops"]:
            _row(field, op, lo)
            _row(field, op, min(hi, 3))
        else:
            with pytest.raises(ValidationError, match="does not take"):
                _row(field, op, lo)


@pytest.mark.parametrize("op", list(OP_ARITY))
def test_arity_outside_the_listed_range_is_refused(vocab, op):
    info = next(o for o in vocab["ops"] if o["name"] == op)
    field = next(f["name"] for f in vocab["fields"] if op in f["ops"])
    if info["min_values"] > 0:
        with pytest.raises(ValidationError, match="value"):
            _row(field, op, info["min_values"] - 1)
    with pytest.raises(ValidationError, match="value"):
        _row(field, op, info["max_values"] + 1)


def test_enum_values_are_exactly_what_is_accepted(vocab):
    for f in vocab["fields"]:
        if f["enum_values"] is None:
            continue
        QueryRow.model_validate({"field": f["name"], "op": "is", "values": f["enum_values"]})
        with pytest.raises(ValidationError, match="not a valid"):
            QueryRow.model_validate({"field": f["name"], "op": "is", "values": ["nonsense"]})


def test_date_keywords_are_dates(vocab):
    for f in vocab["fields"]:
        if f["kind"] == "date":
            assert f["keywords"]
            for word in f["keywords"]:
                QueryRow.model_validate({"field": f["name"], "op": "after", "values": [word]})


@pytest.mark.asyncio
async def test_keywords_resolve_to_what_they_name(
    client, auth_headers, test_project, test_user, test_user2, vocab,
):
    """Each listed keyword, in any case, picks out what it names: `me` the
    caller, `current` the active sprint, a date keyword its whole day."""
    from app.oxyde_models.sprint import OxydeSprint

    words = {f["name"]: f["keywords"] for f in vocab["fields"]}
    assert words["assignee"] == words["creator"] == ["me"]
    assert words["sprint"] == ["current"]
    assert words["created"] == list(schema.DATE_KEYWORDS)

    now = datetime.now(timezone.utc)
    active = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Now", status=SprintStatus.ACTIVE,
    )
    planned = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Next", status=SprintStatus.PLANNED,
    )
    await _issue(test_project, test_user, title="mine", assignee_id=test_user.id,
                 sprint_id=active.id, created_at=now)
    await _issue(test_project, test_user2, title="theirs", assignee_id=test_user2.id,
                 sprint_id=planned.id, created_at=now - timedelta(days=5))
    for days_back in schema.DATE_KEYWORDS.values():
        day = now.date() - timedelta(days=days_back)
        await _issue(test_project, test_user2, title=f"day-{days_back}",
                     created_at=datetime.combine(day, time(0, 30), tzinfo=timezone.utc))

    async def titles(where):
        r = await client.get(
            f"/api/projects/{test_project.id}/issues/query", params={"where": where}, headers=auth_headers,
        )
        assert r.status_code == 200, r.text
        return {i["title"] for i in r.json()["issues"]}

    for kw in (words["assignee"][0], words["assignee"][0].upper()):
        assert await titles(f"assignee={kw}") == {"mine"}
        assert await titles(f"creator={kw}") == {"mine"}
    for kw in (words["sprint"][0], words["sprint"][0].title()):
        assert await titles(f"sprint={kw}") == {"mine"}
    for kw, days_back in schema.DATE_KEYWORDS.items():
        for written in (kw, kw.upper()):
            got = await titles(f"created={written}")
            assert f"day-{days_back}" in got, (written, got)
            assert "theirs" not in got
            assert {t for t in got if t.startswith("day-")} == {f"day-{days_back}"}


def test_date_keywords_match_in_any_case_and_echo_lowercase(vocab):
    for kw in next(f for f in vocab["fields"] if f["name"] == "due")["keywords"]:
        for written in (kw.upper(), kw.title()):
            row = QueryRow.model_validate({"field": "due", "op": "after", "values": [written]})
            assert row.values == [kw]


@pytest.mark.parametrize("unit", list(schema.DATE_OFFSET_UNITS))
def test_date_offsets_are_the_listed_ones(vocab, unit):
    dv = vocab["date_values"]
    assert unit in dv["offset_units"]
    assert dv["offset_units"][unit] == schema.DATE_OFFSET_UNITS[unit]
    ok = lambda v: QueryRow.model_validate({"field": "created", "op": "after", "values": [v]})  # noqa: E731
    ok(f"-1{unit}")
    ok(f"-{dv['max_offset']}{unit}")
    with pytest.raises(ValidationError, match="not a date"):
        ok(f"-{dv['max_offset'] + 1}{unit}")
    with pytest.raises(ValidationError, match="not a date"):
        ok(f"-\u0667{unit}")  # an Arabic-Indic seven is not a digit here


def test_unlisted_offset_units_are_refused(vocab):
    units = set(vocab["date_values"]["offset_units"])
    for unit in "abcdefghijklmnopqrstuvwxyz":
        if unit in units:
            continue
        with pytest.raises(ValidationError, match="not a date"):
            QueryRow.model_validate({"field": "created", "op": "after", "values": [f"-7{unit}"]})


@pytest.mark.asyncio
async def test_every_listed_date_form_runs(client, auth_headers, test_project, vocab):
    """Offsets with each unit at the cap, and each absolute form, run; a
    Unicode-digit offset is a 400, never a 500."""
    dv = vocab["date_values"]
    assert dv["formats"] == list(schema.DATE_FORMATS)
    values = [f"-{dv['max_offset']}{u}" for u in dv["offset_units"]]
    values += ["2026-10-01", "2026-10-01T09:00", "2026-10-01T09:00:05.123456Z", "2026-10-01T09:00+02:00"]
    for v in values:
        r = await client.get(
            f"/api/projects/{test_project.id}/issues/query",
            params={"where": f'created="{v}.."'}, headers=auth_headers,
        )
        assert r.status_code == 200, (v, r.text)
    r = await client.get(
        f"/api/projects/{test_project.id}/issues/query",
        params={"where": "created=-\u0667d.."}, headers=auth_headers,
    )
    assert r.status_code == 400, r.text


def test_number_bounds_are_the_listed_ones(vocab):
    limits = vocab["limits"]
    row = lambda v: QueryRow.model_validate({"field": "estimate", "op": "is", "values": [v]})  # noqa: E731
    row(str(limits["min_number"]))
    with pytest.raises(ValidationError):
        row(str(limits["min_number"] - 1))


def test_match_values_and_directions_are_the_accepted_ones(vocab):
    row = {"field": "status", "op": "is", "values": ["todo"]}
    for match in vocab["match_values"]:
        IssueQuery.model_validate({"filter": {"match": match, "rows": [row]}})
    with pytest.raises(ValidationError):
        IssueQuery.model_validate({"filter": {"match": "none", "rows": [row]}})
    for direction in vocab["order_directions"]:
        IssueQuery.model_validate({"order_by": [{"field": "updated", "direction": direction}]})
    with pytest.raises(ValidationError):
        IssueQuery.model_validate({"order_by": [{"field": "updated", "direction": "up"}]})
    assert [t.model_dump(mode="json") for t in parse_order(vocab["default_order"])] == vocab["default_order_by"]


def test_paren_cap_is_the_listed_one(vocab):
    n = vocab["limits"]["max_parens"]
    parse_where("(" * n + "status=todo" + ")" * n)
    with pytest.raises(QueryError, match="parentheses"):
        parse_where("(" * (n + 1) + "status=todo" + ")" * (n + 1))


@pytest.mark.asyncio
async def test_order_length_cap_is_the_listed_one(client, auth_headers, test_project, vocab):
    n = vocab["limits"]["max_order_length"]
    url = f"/api/projects/{test_project.id}/issues/query"
    # Too long is refused before it is parsed; at the cap it is parsed
    # (and here refused as a bad field, which is a 400, not a 422).
    r = await client.get(url, params={"order": "x" * (n + 1)}, headers=auth_headers)
    assert r.status_code == 422
    r = await client.get(url, params={"order": "x" * n}, headers=auth_headers)
    assert r.status_code == 400


def test_vocabulary_is_built_once():
    assert vocabulary() is vocabulary()


@pytest.mark.parametrize("op", list(OP_ARITY))
def test_op_text_parses_back_to_the_op(vocab, op):
    info = next(o for o in vocab["ops"] if o["name"] == op)
    for f in vocab["fields"]:
        if op not in f["ops"]:
            continue
        a, b = _samples(f["name"])
        # The template's only a and b are the values: `{field}` has neither.
        text = re.sub("[ab]", lambda m: _quote(a if m.group() == "a" else b), info["text"])
        text = text.replace("{field}", f["name"])
        group = parse_where(text)
        if op == "all":
            # The text has no `all` operator: it writes one `is` row per
            # value, which together select the same issues.
            assert [(r.op, r.values) for r in group.rows] == [("is", [a]), ("is", [b])], text
            continue
        assert len(group.rows) == 1, text
        row = group.rows[0]
        # `gte`/`after` and `lte`/`before` share a text form; the field's
        # kind picks which.
        assert row.op == op, (text, row)


def test_aliases_parse_to_their_field(vocab):
    for f in vocab["fields"]:
        for alias in f["aliases"]:
            op = f["ops"][0]
            n = OP_ARITY[op][0]
            values = ",".join(_quote(v) for v in _values(f["name"], n))
            if op in ("after", "gte"):
                values += ".."
            text = f"{alias}{'~=' if op == 'contains' else '='}{values}"
            assert parse_where(text).rows[0].field == f["name"], text


def test_order_fields_are_what_order_accepts(vocab):
    for name in vocab["order_fields"]:
        assert parse_order(f"-{name}")[0].field == name
    unlisted = [f for f in FIELDS if f not in vocab["order_fields"]]
    assert unlisted
    for name in unlisted:
        with pytest.raises(QueryError):
            parse_order(name)
    parse_order(",".join(vocab["order_fields"][: vocab["limits"]["max_order_terms"]]))
    with pytest.raises(QueryError):
        parse_order(",".join(vocab["order_fields"][: vocab["limits"]["max_order_terms"] + 1]))
    assert parse_order(vocab["default_order"])


def test_row_and_depth_caps_are_the_listed_ones(vocab):
    limits = vocab["limits"]
    row = {"field": "status", "op": "is", "values": ["todo"]}
    IssueQuery.model_validate({"filter": {"rows": [row] * limits["max_rows"]}})
    with pytest.raises(ValidationError, match="limit"):
        IssueQuery.model_validate({"filter": {"rows": [row] * (limits["max_rows"] + 1)}})

    def nest(depth):
        group = {"match": "all", "rows": [row]}
        for _ in range(depth - 1):
            group = {"match": "any", "rows": [row, group]}
        return group

    IssueQuery.model_validate({"filter": nest(limits["max_depth"])})
    with pytest.raises(ValidationError, match="limit"):
        IssueQuery.model_validate({"filter": nest(limits["max_depth"] + 1)})
    QueryRow.model_validate({"field": "label", "op": "is", "values": ["x"] * limits["max_values"]})
    QueryRow.model_validate({"field": "title", "op": "contains", "values": ["x" * limits["max_value_length"]]})
    with pytest.raises(ValidationError):
        QueryRow.model_validate({"field": "title", "op": "contains", "values": ["x" * (limits["max_value_length"] + 1)]})
    QueryRow.model_validate({"field": "estimate", "op": "is", "values": [str(limits["max_number"])]})
    with pytest.raises(ValidationError):
        QueryRow.model_validate({"field": "estimate", "op": "is", "values": [str(limits["max_number"] + 1)]})



def test_relation_fields_are_in_the_vocabulary(vocab):
    kinds = {f["name"]: f["kind"] for f in vocab["fields"]}
    assert kinds["blocks"] == kinds["blocked_by"] == kinds["related"] == "relation"
    assert "relation" in {f["kind"] for f in vocab["fields"]}
