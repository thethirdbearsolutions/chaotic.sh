"""The issue query vocabulary endpoint (CHT-1783): it lists everything the
validator knows, and what it says is what the validator does."""
import re

import pytest
from pydantic import ValidationError

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

URL = "/api/issues/query/fields"

# A value each kind accepts, two where a range needs them.
SAMPLE = {
    "user": ("me", "someone@example.com"),
    "project": ("CHT", "OTH"),
    "sprint": ("current", "Sprint 1"),
    "label": ("bug", "ui"),
    "number": ("3", "8"),
    "issue": ("CHT-1", "CHT-2"),
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
    assert set(r.json()) == {"fields", "ops", "order_fields", "default_order", "limits"}


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
        "max_where_length": service.MAX_WHERE_LENGTH,
        "max_filter_json_length": service.MAX_FILTER_JSON_LENGTH,
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
async def test_user_and_sprint_keywords_resolve(client, auth_headers, test_project, vocab):
    words = {f["name"]: f["keywords"] for f in vocab["fields"]}
    assert words["assignee"] == words["creator"] == ["me"]
    assert words["sprint"] == ["current"]
    where = " ".join(f"{name}={kw}" for name in ("assignee", "creator", "sprint") for kw in words[name])
    r = await client.get(
        f"/api/projects/{test_project.id}/issues/query", params={"where": where}, headers=auth_headers,
    )
    assert r.status_code == 200, r.text


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
