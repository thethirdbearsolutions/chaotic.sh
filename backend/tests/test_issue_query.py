"""The issue query structure, its text form and its endpoint (CHT-1718)."""
import json
from datetime import datetime, timedelta, timezone

import pytest
from pydantic import ValidationError

from app.enums import IssuePriority, IssueStatus, IssueType, SprintStatus, TeamRole
from app.schemas.issue_query import MAX_ROWS, IssueQuery
from app.services.issue_query import (
    QueryError,
    build_query,
    parse_order,
    parse_where,
    render_order,
    render_where,
)


def rows(text):
    return parse_where(text).model_dump()


# ============================================================================
# Text form
# ============================================================================


class TestParseWhere:
    def test_clauses_are_anded(self):
        assert rows("status=todo,in_progress priority!=low") == {
            "match": "all",
            "rows": [
                {"field": "status", "op": "is", "values": ["todo", "in_progress"]},
                {"field": "priority", "op": "is_not", "values": ["low"]},
            ],
        }

    def test_or_binds_looser_than_and(self):
        assert rows("status=todo priority=high or assignee=me") == {
            "match": "any",
            "rows": [
                {"match": "all", "rows": [
                    {"field": "status", "op": "is", "values": ["todo"]},
                    {"field": "priority", "op": "is", "values": ["high"]},
                ]},
                {"field": "assignee", "op": "is", "values": ["me"]},
            ],
        }

    def test_parentheses_nest(self):
        g = rows("status=todo (assignee=me OR assignee=)")
        assert g["match"] == "all"
        assert g["rows"][1] == {"match": "any", "rows": [
            {"field": "assignee", "op": "is", "values": ["me"]},
            {"field": "assignee", "op": "empty", "values": []},
        ]}

    def test_explicit_and_is_accepted(self):
        assert rows("status=todo and type=bug") == rows("status=todo type=bug")

    def test_single_clause_is_wrapped_in_a_group(self):
        assert rows("type=bug") == {"match": "all", "rows": [
            {"field": "type", "op": "is", "values": ["bug"]},
        ]}

    def test_empty_and_not_empty(self):
        g = rows("sprint= parent!=")
        assert g["rows"] == [
            {"field": "sprint", "op": "empty", "values": []},
            {"field": "parent", "op": "not_empty", "values": []},
        ]

    def test_text_operators(self):
        g = rows('title~="login page" text!~=wip title^=Fix')
        assert g["rows"] == [
            {"field": "title", "op": "contains", "values": ["login page"]},
            {"field": "text", "op": "not_contains", "values": ["wip"]},
            {"field": "title", "op": "begins_with", "values": ["Fix"]},
        ]

    def test_quotes_keep_commas_spaces_and_escapes(self):
        g = rows(r"""title~="a, b",'c d',"say \"hi\"" """)
        assert g["rows"][0]["values"] == ["a, b", "c d", 'say "hi"']

    def test_ranges(self):
        g = rows("estimate=3..8 estimate=5.. estimate=..2 created=-7d.. due=..2026-11-01")
        assert [(r["op"], r["values"]) for r in g["rows"]] == [
            ("between", ["3", "8"]),
            ("gte", ["5"]),
            ("lte", ["2"]),
            ("after", ["-7d"]),
            ("before", ["2026-11-01"]),
        ]

    def test_a_single_date_is_that_day(self):
        assert rows("created=2026-10-01")["rows"][0] == {
            "field": "created", "op": "between", "values": ["2026-10-01", "2026-10-01"],
        }

    def test_aliases(self):
        g = rows("labels=bug issue_type=bug epic=CHT-1 search=x id=CHT-2 due_date=")
        assert [r["field"] for r in g["rows"]] == ["label", "type", "parent", "text", "identifier", "due"]

    @pytest.mark.parametrize("text, message", [
        ("bogus=1", "unknown field 'bogus'"),
        ("status", "needs an operator"),
        ("status=todo or", "ends where a clause was expected"),
        ("(status=todo", "missing ')'"),
        ("status=todo)", "unexpected ')'"),
        ('title~="open', "unclosed quote"),
        ("status=todo,", "expected a value"),
        ("status=todo,,done", "expected a value"),
        ("title~=", "needs a value"),
        ("status=nope", "'nope' is not a valid status"),
        ("status~=todo", "status does not take 'contains'"),
        ("estimate=abc", "whole numbers"),
        ("created=yesterdayish", "is not a date"),
        ("created!=2026-01-01", "takes one date or a range"),
        ("estimate!=1..2", "a range takes '='"),
        ("estimate=..", "needs a bound"),
        ("=todo", "expected a field name"),
        ("status=todo\"x\"", "unexpected '\"' after a value"),
        ("(" * 33 + "status=todo" + ")" * 33, "more than 32 parentheses"),
    ])
    def test_errors_say_what_is_wrong(self, text, message):
        with pytest.raises(QueryError, match=None) as err:
            parse_where(text)
        assert message in str(err.value)

    def test_blank_is_no_filter(self):
        assert parse_where("") is None
        assert parse_where("   ") is None
        assert parse_where(None) is None

    def test_length_cap(self):
        with pytest.raises(QueryError, match="longer than"):
            parse_where("status=todo " * 500)

    def test_row_cap(self):
        with pytest.raises(QueryError, match=f"limit is {MAX_ROWS}"):
            parse_where(" ".join(["type=bug"] * (MAX_ROWS + 1)))


@pytest.mark.parametrize("text", [
    "status=todo,in_progress priority!=low",
    "status=todo priority=high or assignee=me",
    "(label=bug or type=bug) estimate=3..8",
    'title~="login page, again" text!~=wip title^=Fix',
    "sprint= parent!= completed!= due=",
    "created=-7d.. updated=..2026-11-01 due=2026-10-01..2026-10-31 created=2026-10-01",
    "estimate=5.. estimate=..2 estimate!=3,4",
    "assignee=me or (status=done label=x)",
    'title~="or" title~="a..b" title~="(x)"',
])
def test_render_round_trips(text):
    first = parse_where(text)
    again = parse_where(render_where(first))
    assert again == first


def test_render_keeps_label_all_together_inside_or():
    q = IssueQuery.model_validate({"filter": {"match": "any", "rows": [
        {"field": "label", "op": "all", "values": ["a", "b"]},
        {"field": "type", "op": "is", "values": ["bug"]},
    ]}})
    text = render_where(q.filter)
    assert text == "(label=a label=b) or type=bug"


class TestOrder:
    def test_parse_and_render(self):
        terms = parse_order("priority,-updated")
        assert [(t.field, t.direction) for t in terms] == [("priority", "asc"), ("updated", "desc")]
        assert render_order(terms) == "priority,-updated"

    @pytest.mark.parametrize("text, message", [
        ("bogus", "cannot order by 'bogus'"),
        ("priority,", "empty term"),
        ("a,b,c,d", "cannot order by"),
        ("created,updated,title,priority", "at most 3"),
        ("title,-title", "twice"),
    ])
    def test_errors(self, text, message):
        with pytest.raises(QueryError) as err:
            parse_order(text)
        assert message in str(err.value)


# ============================================================================
# Structure validation
# ============================================================================


class TestStructure:
    def _q(self, group):
        return IssueQuery.model_validate({"filter": group})

    def test_unknown_field_and_extra_keys_are_refused(self):
        with pytest.raises(ValidationError):
            self._q({"match": "all", "rows": [{"field": "hashed_password", "op": "is", "values": ["x"]}]})
        with pytest.raises(ValidationError):
            self._q({"match": "all", "rows": [{"field": "status", "op": "is", "values": ["todo"], "sql": "1=1"}]})
        with pytest.raises(ValidationError):
            self._q({"match": "all", "rows": [], "extra": 1})

    def test_op_arity(self):
        with pytest.raises(ValidationError, match="takes 2 value"):
            self._q({"rows": [{"field": "estimate", "op": "between", "values": ["1"]}]})
        with pytest.raises(ValidationError, match="takes 0 value"):
            self._q({"rows": [{"field": "sprint", "op": "empty", "values": ["x"]}]})
        with pytest.raises(ValidationError, match="takes 1 to 100"):
            self._q({"rows": [{"field": "type", "op": "is", "values": ["bug"] * 101}]})

    def test_empty_group_is_refused(self):
        with pytest.raises(ValidationError):
            self._q({"match": "all", "rows": []})

    def test_depth_cap(self):
        g = {"field": "type", "op": "is", "values": ["bug"]}
        for _ in range(4):
            g = {"match": "any", "rows": [g]}
        self._q(g)  # depth 4: allowed
        with pytest.raises(ValidationError, match="limit is 4"):
            self._q({"match": "all", "rows": [g]})

    def test_blank_value_is_refused(self):
        with pytest.raises(ValidationError, match="blank"):
            self._q({"rows": [{"field": "title", "op": "contains", "values": ["  "]}]})

    def test_build_query_ands_where_and_filter(self):
        q = build_query(
            where="status=todo",
            filter_json=json.dumps({"match": "any", "rows": [
                {"field": "type", "op": "is", "values": ["bug"]},
                {"field": "label", "op": "is", "values": ["x"]},
            ]}),
            order="-priority",
        )
        assert q.filter.match == "all"
        assert len(q.filter.rows) == 2
        assert render_where(q.filter) == "status=todo (type=bug or label=x)"

    @pytest.mark.parametrize("text, messages", [
        ("{", ("not valid JSON",)),
        # either the JSON parser's own recursion guard or ours, never pydantic's
        ("[" * 3000 + "]" * 3000, ("not valid JSON", "nests deeper")),
        (json.dumps({"rows": [[[[[[[[[[[[1]]]]]]]]]]]]}), ("nests deeper",)),
        (json.dumps({"rows": [{"field": "status", "op": "is", "values": ["x"]}]}), ("not a valid status",)),
        ("x" * 20000, ("longer than",)),
    ])
    def test_bad_filter_json(self, text, messages):
        with pytest.raises(QueryError) as err:
            build_query(where=None, filter_json=text, order=None)
        assert any(m in str(err.value) for m in messages), str(err.value)

    def test_date_bounds(self):
        from app.services.issue_query import _date_bound

        now = datetime(2026, 10, 15, 12, tzinfo=timezone.utc)
        midnight = datetime(2026, 10, 15, tzinfo=timezone.utc)
        assert _date_bound("today", now, upper=False) == (midnight, True)
        assert _date_bound("today", now, upper=True) == (midnight + timedelta(days=1), False)
        assert _date_bound("yesterday", now, upper=False) == (midnight - timedelta(days=1), True)
        assert _date_bound("-2w", now, upper=False) == (now - timedelta(weeks=2), True)
        assert _date_bound("-3h", now, upper=True) == (now - timedelta(hours=3), True)
        assert _date_bound("2026-10-01T08:00", now, upper=True) == (
            datetime(2026, 10, 1, 8, tzinfo=timezone.utc), True,
        )


# ============================================================================
# The endpoint
# ============================================================================


async def _issue(project, user, **kwargs):
    from oxyde import execute_raw
    from app.oxyde_models.issue import OxydeIssue
    from app.oxyde_models.project import OxydeProject

    await execute_raw("UPDATE projects SET issue_count = issue_count + 1 WHERE id = ?", [project.id])
    fresh = await OxydeProject.objects.get(id=project.id)
    n = fresh.issue_count
    fields = dict(
        project_id=project.id, identifier=f"{fresh.key}-{n}", number=n,
        title=f"Issue {n}", creator_id=user.id,
    )
    fields.update(kwargs)
    return await OxydeIssue.objects.create(**fields)


async def _label(team, name, *issues):
    from app.oxyde_models.issue import OxydeIssueLabel
    from app.oxyde_models.label import OxydeLabel

    label = await OxydeLabel.objects.create(team_id=team.id, name=name, color="#000000")
    for issue in issues:
        await OxydeIssueLabel.objects.create(issue_id=issue.id, label_id=label.id)
    return label


async def _query(client, headers, scope, **params):
    if "filter_" in params:
        params["filter"] = json.dumps(params.pop("filter_"))
    return await client.get(f"/api/{scope}/issues/query", params=params, headers=headers)


async def _titles(client, headers, project, where, **params):
    r = await _query(client, headers, f"projects/{project.id}", where=where, **params)
    assert r.status_code == 200, r.text
    return {i["title"] for i in r.json()["issues"]}


@pytest.mark.asyncio
async def test_enum_filters_and_or_groups(client, auth_headers, test_project, test_user):
    await _issue(test_project, test_user, title="todo-high", status=IssueStatus.TODO, priority=IssuePriority.HIGH)
    await _issue(test_project, test_user, title="todo-low", status=IssueStatus.TODO, priority=IssuePriority.LOW)
    await _issue(test_project, test_user, title="done-bug", status=IssueStatus.DONE, issue_type=IssueType.BUG)

    t = lambda w: _titles(client, auth_headers, test_project, w)  # noqa: E731
    assert await t("status=todo") == {"todo-high", "todo-low"}
    assert await t("status=todo priority!=low") == {"todo-high"}
    assert await t("priority=high or type=bug") == {"todo-high", "done-bug"}
    assert await t("status!=todo,done") == set()
    assert await t("") == {"todo-high", "todo-low", "done-bug"}


@pytest.mark.asyncio
async def test_response_shape_is_the_wire_form(client, auth_headers, test_project, test_user):
    await _issue(test_project, test_user, status=IssueStatus.IN_PROGRESS)
    r = await _query(client, auth_headers, f"projects/{test_project.id}",
                     where="status=in_progress", order="-priority")
    body = r.json()
    assert r.status_code == 200
    assert body["issues"][0]["status"] == "in_progress"
    assert body["where"] == "status=in_progress"
    assert body["order"] == "-priority"
    assert body["query"] == {
        "filter": {"match": "all", "rows": [{"field": "status", "op": "is", "values": ["in_progress"]}]},
        "order_by": [{"field": "priority", "direction": "desc"}],
    }
    assert body["total"] == 1 and body["skip"] == 0 and body["limit"] == 100
    # the echoed text runs to the same structure
    again = await _query(client, auth_headers, f"projects/{test_project.id}",
                         filter_=body["query"]["filter"], order=body["order"])
    assert again.json()["query"] == body["query"]


@pytest.mark.asyncio
async def test_assignee_and_creator(client, auth_headers, test_project, test_user, test_user2):
    from app.oxyde_models.team import OxydeTeamMember

    await OxydeTeamMember.objects.create(team_id=test_project.team_id, user_id=test_user2.id, role=TeamRole.MEMBER)
    await _issue(test_project, test_user, title="mine", assignee_id=test_user.id)
    await _issue(test_project, test_user2, title="theirs", assignee_id=test_user2.id)
    await _issue(test_project, test_user, title="nobody")

    t = lambda w: _titles(client, auth_headers, test_project, w)  # noqa: E731
    assert await t("assignee=me") == {"mine"}
    assert await t("assignee=") == {"nobody"}
    assert await t("assignee!=") == {"mine", "theirs"}
    # is_not keeps unassigned issues: NULL is not "someone else"
    assert await t("assignee!=me") == {"theirs", "nobody"}
    assert await t('assignee="Test User 2"') == {"theirs"}
    assert await t("assignee=test2@example.com") == {"theirs"}
    assert await t(f"assignee={test_user2.id}") == {"theirs"}
    assert await t("creator=me") == {"mine", "nobody"}
    assert await t("assignee=me or creator!=me") == {"mine", "theirs"}


@pytest.mark.asyncio
async def test_unknown_people_and_things_are_400(client, auth_headers, test_project, test_user):
    for where, message in [
        ("assignee=ghost", "no one on this team is 'ghost'"),
        ("assignee=unassigned", "write `assignee=` with no value"),
        ("label=nope", "no label 'nope'"),
        ("sprint=nope", "no sprint 'nope'"),
        ("project=nope", "no project 'nope'"),
        ("parent=NOPE-1", "no issue NOPE-1"),
        ("bogus=1", "unknown field"),
    ]:
        r = await _query(client, auth_headers, f"projects/{test_project.id}", where=where)
        assert r.status_code == 400, where
        assert message in r.json()["detail"], (where, r.json())


@pytest.mark.asyncio
async def test_a_user_outside_the_team_does_not_resolve(client, auth_headers, test_project, test_user, test_user2):
    """Names resolve among the team's people only: a query cannot confirm
    that an outsider's email exists."""
    r = await _query(client, auth_headers, f"projects/{test_project.id}", where="assignee=test2@example.com")
    assert r.status_code == 400


@pytest.mark.asyncio
async def test_labels_any_all_none_empty(client, auth_headers, test_team, test_project, test_user):
    both = await _issue(test_project, test_user, title="both")
    only_a = await _issue(test_project, test_user, title="only-a")
    only_b = await _issue(test_project, test_user, title="only-b")
    await _issue(test_project, test_user, title="none")
    await _label(test_team, "Alpha", both, only_a)
    await _label(test_team, "beta", both, only_b)

    t = lambda w: _titles(client, auth_headers, test_project, w)  # noqa: E731
    assert await t("label=alpha,BETA") == {"both", "only-a", "only-b"}
    assert await t("label=alpha label=beta") == {"both"}
    assert await t("label!=alpha") == {"only-b", "none"}
    assert await t("label=") == {"none"}
    assert await t("label!=") == {"both", "only-a", "only-b"}
    r = await _query(client, auth_headers, f"projects/{test_project.id}", filter_={
        "match": "all", "rows": [{"field": "label", "op": "all", "values": ["alpha", "beta"]}],
    })
    assert {i["title"] for i in r.json()["issues"]} == {"both"}
    assert r.json()["where"] == "label=alpha label=beta"


@pytest.mark.asyncio
async def test_estimate(client, auth_headers, test_project, test_user):
    for e in (1, 3, 5, 8, None):
        await _issue(test_project, test_user, title=f"e{e}", estimate=e)
    t = lambda w: _titles(client, auth_headers, test_project, w)  # noqa: E731
    assert await t("estimate=3..5") == {"e3", "e5"}
    assert await t("estimate=5..") == {"e5", "e8"}
    assert await t("estimate=..3") == {"e1", "e3"}
    assert await t("estimate=1,8") == {"e1", "e8"}
    assert await t("estimate!=1,8") == {"e3", "e5", "eNone"}
    assert await t("estimate=") == {"eNone"}


@pytest.mark.asyncio
async def test_text_fields(client, auth_headers, test_project, test_user):
    await _issue(test_project, test_user, title="Fix login page", description="the button")
    await _issue(test_project, test_user, title="Add search", description=None)
    await _issue(test_project, test_user, title="Refactor", description="WIP: login flow")

    t = lambda w: _titles(client, auth_headers, test_project, w)  # noqa: E731
    assert await t("title~=LOGIN") == {"Fix login page"}
    assert await t("text~=login") == {"Fix login page", "Refactor"}
    # a NULL description contains nothing, so it passes not_contains
    assert await t("text!~=login") == {"Add search"}
    assert await t("title^=fix,add") == {"Fix login page", "Add search"}
    assert await t('title~="100%_"') == set()  # wildcards are literal
    assert await t(f"text~={test_project.key}-2") == {"Add search"}  # identifier


@pytest.mark.asyncio
async def test_hostile_values_are_only_values(client, auth_headers, test_project, test_user):
    await _issue(test_project, test_user, title="safe")
    hostile = "'; DROP TABLE issues; --"
    r = await _query(client, auth_headers, f"projects/{test_project.id}", filter_={
        "match": "any", "rows": [
            {"field": "title", "op": "contains", "values": [hostile]},
            {"field": "identifier", "op": "is", "values": ["x' OR '1'='1"]},
        ],
    })
    assert r.status_code == 200
    assert r.json()["issues"] == []
    assert await _titles(client, auth_headers, test_project, "") == {"safe"}


@pytest.mark.asyncio
async def test_dates(client, auth_headers, test_project, test_user):
    now = datetime.now(timezone.utc)
    await _issue(test_project, test_user, title="old", created_at=now - timedelta(days=30),
                 completed_at=now - timedelta(days=20), status=IssueStatus.DONE)
    await _issue(test_project, test_user, title="new", created_at=now - timedelta(hours=1),
                 due_date=datetime(2026, 11, 1, 15, tzinfo=timezone.utc))

    t = lambda w: _titles(client, auth_headers, test_project, w)  # noqa: E731
    assert await t("created=-7d..") == {"new"}
    assert await t("created=..-7d") == {"old"}
    assert await t("completed=") == {"new"}
    assert await t("completed!=") == {"old"}
    assert await t("due=2026-11-01") == {"new"}  # the whole UTC day
    assert await t("due=..2026-11-01") == {"new"}  # inclusive of that day
    assert await t("due=..2026-10-31") == set()
    assert await t("due=2026-11-02..") == set()
    assert await t("due=2026-11-01T15:00:00Z..") == {"new"}
    day = (now - timedelta(days=30)).date().isoformat()
    assert await t(f"created={day}") == {"old"}
    assert await t("created=-2h..") == {"new"}


@pytest.mark.asyncio
async def test_sprint_parent_identifier(client, auth_headers, test_project, test_user):
    from app.oxyde_models.sprint import OxydeSprint

    active = await OxydeSprint.objects.create(project_id=test_project.id, name="Sprint 7", status=SprintStatus.ACTIVE)
    planned = await OxydeSprint.objects.create(project_id=test_project.id, name="Sprint 8", status=SprintStatus.PLANNED)
    epic = await _issue(test_project, test_user, title="epic", issue_type=IssueType.EPIC)
    await _issue(test_project, test_user, title="in-current", sprint_id=active.id, parent_id=epic.id)
    await _issue(test_project, test_user, title="in-next", sprint_id=planned.id)

    t = lambda w: _titles(client, auth_headers, test_project, w)  # noqa: E731
    assert await t("sprint=current") == {"in-current"}
    assert await t('sprint="sprint 8"') == {"in-next"}
    assert await t(f"sprint={planned.id}") == {"in-next"}
    assert await t("sprint=") == {"epic"}
    assert await t("sprint!=current") == {"epic", "in-next"}
    assert await t(f"parent={epic.identifier.lower()}") == {"in-current"}
    assert await t(f"epic={epic.id}") == {"in-current"}
    assert await t("parent!=") == {"in-current"}
    assert await t(f"identifier={epic.identifier}") == {"epic"}
    # no sprint is created by a query
    assert len(await OxydeSprint.objects.filter(project_id=test_project.id).all()) == 2


@pytest.mark.asyncio
async def test_ordering_nulls_last_and_paging(client, auth_headers, test_project, test_user):
    await _issue(test_project, test_user, title="low", priority=IssuePriority.LOW, estimate=2)
    await _issue(test_project, test_user, title="urgent", priority=IssuePriority.URGENT, estimate=None)
    await _issue(test_project, test_user, title="none", priority=IssuePriority.NO_PRIORITY, estimate=5)
    await _issue(test_project, test_user, title="high", priority=IssuePriority.HIGH, estimate=1)

    async def order(o, **params):
        r = await _query(client, auth_headers, f"projects/{test_project.id}", order=o, **params)
        assert r.status_code == 200, r.text
        return [i["title"] for i in r.json()["issues"]], r.json()["total"]

    # same meaning as `issue list --sort priority --order asc`: urgent first
    assert (await order("priority"))[0] == ["urgent", "high", "low", "none"]
    assert (await order("-priority"))[0] == ["none", "low", "high", "urgent"]
    assert (await order("estimate"))[0] == ["high", "low", "none", "urgent"]
    assert (await order("-estimate"))[0] == ["none", "low", "high", "urgent"]
    assert (await order("title"))[0] == ["high", "low", "none", "urgent"]
    assert (await order("identifier"))[0] == ["low", "urgent", "none", "high"]
    page, total = await order("priority", skip=1, limit=2)
    assert page == ["high", "low"] and total == 4
    # default: most recently updated first
    r = await _query(client, auth_headers, f"projects/{test_project.id}")
    assert r.json()["order"] == ""


@pytest.mark.asyncio
async def test_ordering_by_type_assignee_sprint_project(
    client, auth_headers, test_team, test_project, test_user,
):
    """CHT-1815: the type and relation order keys, nulls last, and groups
    that share a name kept apart."""
    from app.oxyde_models.project import OxydeProject
    from app.oxyde_models.sprint import OxydeSprint
    from app.oxyde_models.user import OxydeUser

    now = datetime.now(timezone.utc)
    # Two users with the same name, and one whose name sorts first only
    # when case is ignored.
    zed_a = await OxydeUser.objects.create(email="za@example.com", hashed_password="x", name="Zed")
    zed_b = await OxydeUser.objects.create(email="zb@example.com", hashed_password="x", name="Zed")
    amy = await OxydeUser.objects.create(email="amy@example.com", hashed_password="x", name="amy")
    # activation order old, cur; creation order the reverse, so the test
    # tells the two apart
    old = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Old", status=SprintStatus.COMPLETED,
        activated_at=now - timedelta(days=20), created_at=now - timedelta(days=1),
    )
    cur = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Cur", status=SprintStatus.ACTIVE,
        activated_at=now - timedelta(days=5), created_at=now - timedelta(days=30),
    )
    nxt = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Next", status=SprintStatus.PLANNED,
        created_at=now - timedelta(days=40),
    )
    other = await OxydeProject.objects.create(team_id=test_team.id, name="Alpha", key="AAA", color="#000000")

    await _issue(test_project, test_user, title="b1", issue_type=IssueType.EPIC,
                 assignee_id=zed_b.id, sprint_id=nxt.id)
    await _issue(test_project, test_user, title="a1", issue_type=IssueType.BUG,
                 assignee_id=zed_a.id, sprint_id=cur.id)
    await _issue(test_project, test_user, title="b2", issue_type=IssueType.TASK,
                 assignee_id=zed_b.id, sprint_id=old.id)
    await _issue(test_project, test_user, title="none", issue_type=IssueType.FEATURE)
    await _issue(test_project, test_user, title="a2", issue_type=IssueType.BUG,
                 assignee_id=zed_a.id, sprint_id=cur.id)
    await _issue(test_project, test_user, title="amy", issue_type=IssueType.DOCS,
                 assignee_id=amy.id, sprint_id=old.id)
    await _issue(other, test_user, title="alpha", issue_type=IssueType.CHORE, assignee_id=test_user.id)

    async def order(o, scope=f"projects/{test_project.id}"):
        r = await _query(client, auth_headers, scope, order=o)
        assert r.status_code == 200, r.text
        assert r.json()["order"] == o
        return [i["title"] for i in r.json()["issues"]]

    # type in the enum's order (task, bug, feature, chore, docs, ..., epic);
    # ties newest-created first
    assert await order("type") == ["b2", "a2", "a1", "none", "amy", "b1"]
    assert await order("-type") == ["b1", "amy", "none", "a2", "a1", "b2"]

    # assignee by name ignoring case; the two Zeds never interleave;
    # unassigned last either way
    by_assignee = await order("assignee")
    assert by_assignee[0] == "amy" and by_assignee[-1] == "none"
    zeds = [t[0] for t in by_assignee[1:5]]
    first, second = ("a", "b") if zed_a.id < zed_b.id else ("b", "a")
    assert zeds == [first, first, second, second]
    by_assignee_desc = await order("-assignee")
    assert by_assignee_desc[-2:] == ["amy", "none"]
    assert [t[0] for t in by_assignee_desc[:4]] == [second, second, first, first]

    # sprint: activated ones by activation (old, cur), then the planned
    # one; no sprint last either way
    assert await order("sprint") == ["amy", "b2", "a2", "a1", "b1", "none"]
    assert await order("-sprint") == ["b1", "a2", "a1", "amy", "b2", "none"]
    assert await order("sprint,type") == ["b2", "amy", "a2", "a1", "b1", "none"]

    # project by key, across the team
    team_scope = f"teams/{test_team.id}"
    assert (await order("project", team_scope))[0] == "alpha"
    assert (await order("-project", team_scope))[-1] == "alpha"
    by_project = await order("project,-assignee", team_scope)
    assert by_project[0] == "alpha" and by_project[-2:] == ["amy", "none"]

    # an assignee whose user is gone sorts with the unassigned
    await OxydeUser.objects.filter(id=amy.id).delete()
    assert (await order("assignee"))[-2:] == ["amy", "none"]


@pytest.mark.asyncio
async def test_sprint_order_by_status_and_relation_order_pages(
    client, auth_headers, test_project, test_user,
):
    """A sprint that ran before migration 0016 has a null activated_at;
    it is still history, not planned, and counts from its creation. And
    paging through a relation order gives the unpaged order (CHT-1815)."""
    from app.oxyde_models.sprint import OxydeSprint
    from app.oxyde_models.user import OxydeUser

    now = datetime.now(timezone.utc)
    legacy = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Legacy", status=SprintStatus.COMPLETED,
        activated_at=None, created_at=now - timedelta(days=100),
    )
    cur = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Cur", status=SprintStatus.ACTIVE,
        activated_at=now - timedelta(days=1), created_at=now - timedelta(days=2),
    )
    planned = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Next", status=SprintStatus.PLANNED,
        created_at=now - timedelta(days=200),
    )
    await _issue(test_project, test_user, title="planned", sprint_id=planned.id)
    await _issue(test_project, test_user, title="cur", sprint_id=cur.id)
    await _issue(test_project, test_user, title="legacy", sprint_id=legacy.id)

    async def page(o, **params):
        r = await _query(client, auth_headers, f"projects/{test_project.id}", order=o, **params)
        assert r.status_code == 200, r.text
        return [i["title"] for i in r.json()["issues"]], r.json()["total"]

    assert (await page("sprint"))[0] == ["legacy", "cur", "planned"]
    assert (await page("-sprint"))[0] == ["planned", "cur", "legacy"]

    # paging: many issues spread over a few same-named assignees and the
    # sprints; pages of 4 concatenate to the unpaged order
    users = [
        await OxydeUser.objects.create(email=f"p{n}@example.com", hashed_password="x", name=name)
        for n, name in enumerate(["Bo", "bo", "Al"])
    ]
    sprints = [legacy, cur, planned, None]
    for n in range(17):
        user = users[n % 4] if n % 4 < 3 else None
        sprint = sprints[n % 3 + (n % 2)]
        await _issue(test_project, test_user, title=f"p{n}",
                     assignee_id=user.id if user else None,
                     sprint_id=sprint.id if sprint else None,
                     issue_type=list(IssueType)[n % len(IssueType)])
    for o in ("assignee", "-assignee", "sprint,-assignee", "-type,assignee", "project,sprint"):
        full, total = await page(o, limit=1000)
        paged = []
        for skip in range(0, total, 4):
            chunk, t = await page(o, skip=skip, limit=4)
            assert t == total
            paged += chunk
        assert paged == full, o


@pytest.mark.asyncio
async def test_team_scope_and_project_field(client, auth_headers, test_team, test_project, test_user):
    from app.oxyde_models.project import OxydeProject
    from app.oxyde_models.team import OxydeTeam

    other = await OxydeProject.objects.create(team_id=test_team.id, name="Other", key="OTH", color="#000000")
    stranger_team = await OxydeTeam.objects.create(name="Elsewhere", key="ELSE")
    foreign = await OxydeProject.objects.create(team_id=stranger_team.id, name="Foreign", key="FOR", color="#000000")
    await _issue(test_project, test_user, title="here")
    await _issue(other, test_user, title="there")
    await _issue(foreign, test_user, title="foreign")

    async def team(where):
        r = await _query(client, auth_headers, f"teams/{test_team.id}", where=where)
        assert r.status_code == 200, r.text
        return {i["title"] for i in r.json()["issues"]}

    assert await team("") == {"here", "there"}
    assert await team("project=oth") == {"there"}
    assert await team("project!=Other") == {"here"}
    r = await _query(client, auth_headers, f"teams/{test_team.id}", where="project=FOR")
    assert r.status_code == 400
    # project scope stays in its project even when the filter names another
    assert await _titles(client, auth_headers, test_project, "project=OTH") == set()


@pytest.mark.asyncio
async def test_access_matches_the_issue_list(client, auth_headers2, test_team, test_project, test_user):
    await _issue(test_project, test_user, title="secret")
    r = await _query(client, auth_headers2, f"projects/{test_project.id}")
    assert r.status_code == 404
    r = await _query(client, auth_headers2, f"teams/{test_team.id}")
    assert r.status_code == 403
    r = await _query(client, auth_headers2, "projects/no-such-project")
    assert r.status_code == 404


@pytest.mark.asyncio
async def test_project_scoped_agent_is_confined(client, test_team, test_project, test_user):
    from app.utils.security import create_access_token
    from app.oxyde_models.project import OxydeProject
    from app.oxyde_models.user import OxydeUser

    other = await OxydeProject.objects.create(team_id=test_team.id, name="Other", key="OTH", color="#000000")
    agent = await OxydeUser.objects.create(
        email="scoped@example.com", hashed_password="x", name="Scoped", is_agent=True,
        agent_team_id=test_team.id, agent_project_id=test_project.id,
    )
    headers = {"Authorization": f"Bearer {create_access_token(data={'sub': agent.id})}"}
    await _issue(other, test_user, title="other")
    assert (await _query(client, headers, f"projects/{other.id}")).status_code == 404
    assert (await _query(client, headers, f"projects/{test_project.id}")).status_code == 200
    # A project-scoped agent has no team scope (CHT-1780): the team query
    # is refused, as GET /issues?team_id is.
    listed = await client.get(f"/api/issues?team_id={test_team.id}", headers=headers)
    queried = await _query(client, headers, f"teams/{test_team.id}")
    assert listed.status_code == queried.status_code == 403


@pytest.mark.asyncio
async def test_project_scoped_agent_cannot_probe_sibling_names(client, auth_headers, test_team, test_project, test_user):
    """Names resolve in the caller's scope (CHT-1780): a sibling project's
    key or issue, or an agent scoped to it, answers exactly like a name
    that does not exist, so the 200/400 split tells the agent nothing."""
    from app.utils.security import create_access_token
    from app.oxyde_models.project import OxydeProject
    from app.oxyde_models.user import OxydeUser

    other = await OxydeProject.objects.create(team_id=test_team.id, name="Other", key="OTH", color="#000000")
    agent = await OxydeUser.objects.create(
        email="scoped@example.com", hashed_password="x", name="Scoped", is_agent=True,
        agent_team_id=test_team.id, agent_project_id=test_project.id,
    )
    await OxydeUser.objects.create(
        email="sibbot@example.com", hashed_password="x", name="SibBot", is_agent=True,
        agent_team_id=test_team.id, agent_project_id=other.id,
    )
    headers = {"Authorization": f"Bearer {create_access_token(data={'sub': agent.id})}"}
    await _issue(other, test_user, title="other")
    mine = f"projects/{test_project.id}"

    def same_as_missing(real, fake):
        assert real.status_code == fake.status_code == 400, (real.text, fake.text)
        assert real.json()["detail"].replace("OTH-1", "X").replace("OTH", "X").replace("SibBot", "X") == \
            fake.json()["detail"].replace("NOPE-1", "X").replace("NOPE", "X")

    same_as_missing(
        await _query(client, headers, mine, where="project=OTH"),
        await _query(client, headers, mine, where="project=NOPE"),
    )
    same_as_missing(
        await _query(client, headers, mine, where="parent=OTH-1"),
        await _query(client, headers, mine, where="parent=NOPE-1"),
    )
    same_as_missing(
        await _query(client, headers, mine, where="assignee=SibBot"),
        await _query(client, headers, mine, where="assignee=NOPE"),
    )
    # Its own project and team members still resolve.
    assert (await _query(client, headers, mine, where="project=PROJ")).status_code == 200
    assert (await _query(client, headers, mine, where=f"assignee={test_user.email}")).status_code == 200
    # A team member still names every project in the team.
    team = f"teams/{test_team.id}"
    assert (await _query(client, auth_headers, team, where="project=OTH parent=OTH-1")).status_code == 200
    assert (await _query(client, auth_headers, team, where="assignee=SibBot")).status_code == 200


@pytest.mark.asyncio
async def test_bad_input_is_400(client, auth_headers, test_project):
    base = f"projects/{test_project.id}"
    assert (await _query(client, auth_headers, base, filter="{")).status_code == 400
    assert (await _query(client, auth_headers, base, order="bogus")).status_code == 400
    assert (await _query(client, auth_headers, base, where="status=")).status_code == 400
    deep = {"field": "type", "op": "is", "values": ["bug"]}
    for _ in range(6):
        deep = {"match": "any", "rows": [deep]}
    r = await _query(client, auth_headers, base, filter_=deep)
    assert r.status_code == 400 and "4" in r.json()["detail"]
    assert (await _query(client, auth_headers, base, limit=0)).status_code == 422
    assert (await _query(client, auth_headers, base, where="x" * 5000)).status_code == 422


@pytest.mark.asyncio
async def test_existing_simple_filters_are_unchanged(client, auth_headers, test_project, test_user):
    await _issue(test_project, test_user, title="t", status=IssueStatus.TODO)
    await _issue(test_project, test_user, title="d", status=IssueStatus.DONE)
    r = await client.get(f"/api/issues?project_id={test_project.id}&status=todo", headers=auth_headers)
    assert [i["title"] for i in r.json()] == ["t"]


def test_nested_ands_flatten_and_leading_or_is_an_error():
    assert rows("status=todo (type=bug priority=high)") == rows("status=todo type=bug priority=high")
    with pytest.raises(QueryError, match="unexpected 'or'"):
        parse_where("or status=todo")


def test_a_long_value_is_refused():
    with pytest.raises(QueryError, match="longer than 200"):
        parse_where("title~=" + "x" * 201)


def test_where_and_filter_together_still_obey_the_row_cap():
    many = {"match": "all", "rows": [{"field": "type", "op": "is", "values": ["bug"]}] * 30}
    with pytest.raises(QueryError, match=f"limit is {MAX_ROWS}"):
        build_query(where=" ".join(["type=bug"] * 30), filter_json=json.dumps(many), order=None)


@pytest.mark.asyncio
async def test_nested_groups_and_status_order(client, auth_headers, test_project, test_user):
    await _issue(test_project, test_user, title="a", status=IssueStatus.DONE, issue_type=IssueType.BUG)
    await _issue(test_project, test_user, title="b", status=IssueStatus.TODO, priority=IssuePriority.HIGH)
    await _issue(test_project, test_user, title="c", status=IssueStatus.IN_PROGRESS)
    r = await _query(client, auth_headers, f"projects/{test_project.id}",
                     where="status!=done (type=bug or priority=high) or status=in_progress", order="status")
    assert r.status_code == 200, r.text
    assert [i["title"] for i in r.json()["issues"]] == ["c", "b"]
    assert r.json()["where"] == "(status!=done (type=bug or priority=high)) or status=in_progress"


@pytest.mark.asyncio
async def test_an_ambiguous_name_is_400(client, auth_headers, test_project, test_user, test_user2):
    from app.oxyde_models.team import OxydeTeamMember
    from app.oxyde_models.user import OxydeUser

    await OxydeTeamMember.objects.create(team_id=test_project.team_id, user_id=test_user2.id, role=TeamRole.MEMBER)
    await OxydeUser.objects.filter(id=test_user2.id).update(name="Test User")
    r = await _query(client, auth_headers, f"projects/{test_project.id}", where='assignee="test user"')
    assert r.status_code == 400
    assert "more than one person" in r.json()["detail"]


# ============================================================================
# Regressions from the review of PR #418
# ============================================================================


@pytest.mark.asyncio
@pytest.mark.parametrize("where", [
    "due=..9999-12-31",
    "created=..9999-12-31",
    "due=2026-01-01..9999-12-31",
    "due=9999-12-31",
])
async def test_the_last_day_is_an_open_upper_end(client, auth_headers, test_project, test_user, where):
    """Finding 1: 9999-12-31 + 1 day overflowed into a 500."""
    await _issue(test_project, test_user, title="due", due_date=datetime(2026, 11, 1, tzinfo=timezone.utc))
    r = await _query(client, auth_headers, f"projects/{test_project.id}", where=where)
    assert r.status_code == 200, r.text


@pytest.mark.asyncio
@pytest.mark.parametrize("where", [
    "created=..9999-12-31T23:59:59-05:00",
    "created=0001-01-01T00:00:00+05:00..",
])
async def test_a_datetime_out_of_range_in_utc_is_400(client, auth_headers, test_project, where):
    """Finding 1: an offset that carries a datetime past year 1 or 9999."""
    r = await _query(client, auth_headers, f"projects/{test_project.id}", where=where)
    assert r.status_code == 400, r.text
    assert "outside the range" in r.json()["detail"]


@pytest.mark.parametrize("value", [
    "99999999999999999999", "1_000", "\u0661\u0662", "\uff13", "1000001", "-1", "+3",
])
def test_estimate_takes_bounded_ascii_whole_numbers(value):
    """Finding 2: int() took 1_000, Unicode digits and any size."""
    with pytest.raises(QueryError, match="whole numbers from 0 to"):
        parse_where(f'estimate="{value}"')


def test_estimate_bounds_are_inclusive():
    assert parse_where("estimate=0..1000000") is not None


@pytest.mark.asyncio
async def test_a_huge_estimate_is_400_not_500(client, auth_headers, test_project):
    r = await _query(client, auth_headers, f"projects/{test_project.id}", where="estimate=99999999999999999999")
    assert r.status_code == 400


@pytest.mark.asyncio
async def test_many_label_rows_over_many_labelled_issues(
    client, auth_headers, test_team, test_project, test_user, monkeypatch,
):
    """Finding 3: label rows were inlined as IN lists of every labelled
    issue id, one bound parameter each, per row: 50 rows over a big team
    passes SQLite's variable limit. Matched as id sets, no IN list is
    longer than the label ids a row names."""
    from oxyde import execute_raw

    from app.oxyde_models.issue import OxydeIssueLabel
    from app.services import issue_query

    longest = []
    real_in = issue_query._in

    def spy(column, values):
        longest.append(len(list(values)))
        return real_in(column, values)

    monkeypatch.setattr(issue_query, "_in", spy)

    names = [f"l{n}" for n in range(MAX_ROWS)]
    labels = [await _label(test_team, name) for name in names]
    await execute_raw("UPDATE projects SET issue_count = 0 WHERE id = ?", [test_project.id])
    values = ", ".join(
        f"('i{n}', '{test_project.id}', 'K-{n}', {n}, 't{n}', 'BACKLOG', 'NO_PRIORITY', 'TASK', "
        f"'{test_user.id}', '2026-01-01T00:00:00+00:00', '2026-01-01T00:00:00+00:00')"
        for n in range(700)
    )
    await execute_raw(
        "INSERT INTO issues (id, project_id, identifier, number, title, status, priority, issue_type, "
        f"creator_id, created_at, updated_at) VALUES {values}", [],
    )
    for n in range(700):
        await OxydeIssueLabel.objects.create(issue_id=f"i{n}", label_id=labels[n % 7].id)
    where = " ".join(f"label!={name}" for name in names)
    r = await _query(client, auth_headers, f"projects/{test_project.id}", where=where, limit=1)
    assert r.status_code == 200, r.text
    assert r.json()["total"] == 0  # every issue carries one of l0..l6
    assert max(longest) <= MAX_ROWS
    r = await _query(client, auth_headers, f"projects/{test_project.id}",
                     where="label=l0 or (label!=l1 status=backlog label!=l0)", limit=1)
    assert r.json()["total"] == 700 - 100


@pytest.mark.asyncio
async def test_labels_differing_only_in_case(client, auth_headers, test_team, test_project, test_user):
    """Finding 4: a name -> id dict kept one of `Bug` and `bug`, so
    label=bug missed half, and label= counted the other half unlabelled."""
    upper = await _issue(test_project, test_user, title="upper")
    lower = await _issue(test_project, test_user, title="lower")
    await _issue(test_project, test_user, title="bare")
    await _label(test_team, "Bug", upper)
    await _label(test_team, "bug", lower)
    t = lambda w: _titles(client, auth_headers, test_project, w)  # noqa: E731
    assert await t("label=bug") == {"upper", "lower"}
    assert await t("label=BUG") == {"upper", "lower"}
    assert await t("label!=bug") == {"bare"}
    assert await t("label=") == {"bare"}
    assert await t("label!=") == {"upper", "lower"}
    assert await t("label=bug label=Bug") == {"upper", "lower"}


@pytest.mark.parametrize("structure, text, simplified", [
    # label all with one value is plain is
    ({"match": "all", "rows": [{"field": "label", "op": "all", "values": ["a"]}]},
     "label=a", None),
    # a nested all group flattens into its parent
    ({"match": "all", "rows": [
        {"field": "type", "op": "is", "values": ["bug"]},
        {"match": "all", "rows": [{"field": "status", "op": "is", "values": ["todo"]},
                                  {"field": "priority", "op": "is", "values": ["high"]}]},
    ]}, "type=bug (status=todo priority=high)", "type=bug status=todo priority=high"),
    # so does a nested any group in an any group
    ({"match": "any", "rows": [
        {"field": "type", "op": "is", "values": ["bug"]},
        {"match": "any", "rows": [{"field": "status", "op": "is", "values": ["todo"]},
                                  {"field": "priority", "op": "is", "values": ["high"]}]},
    ]}, "type=bug or (status=todo or priority=high)", "type=bug or status=todo or priority=high"),
    # a one-row any group is just that row
    ({"match": "any", "rows": [{"field": "type", "op": "is", "values": ["bug"]}]},
     "type=bug", None),
])
def test_canonical_forms_that_do_not_round_trip_to_the_same_structure(structure, text, simplified):
    """Finding 5: the text cannot spell every structure. These are the
    shapes it simplifies; the simplified structure selects the same issues
    and round-trips exactly from then on."""
    group = IssueQuery.model_validate({"filter": structure}).filter
    assert render_where(group) == text
    again = parse_where(text)
    assert again != group
    assert render_where(again) == (simplified or text)
    assert parse_where(render_where(again)) == again


@pytest.mark.parametrize("value", [
    "20261001", "2026-W40-1", "2026-274", "2026-10-01T0900", "20261001T09:00", "2026-10-1",
])
def test_dates_take_only_the_documented_iso_forms(value):
    """Finding 6: fromisoformat alone took basic and week forms too."""
    with pytest.raises(QueryError, match="is not a date"):
        parse_where(f"created={value}..")


@pytest.mark.parametrize("value", [
    "2026-10-01", "2026-10-01T09:00", "2026-10-01T09:00:30", "2026-10-01T09:00:30.5",
    "2026-10-01T09:00Z", "2026-10-01T09:00+02:00", "2026-10-01 09:00",
])
def test_documented_date_forms_parse(value):
    assert parse_where(f'created="{value}"') is not None


_DATETIME_PAIRS = [
    # (as written, its T form)
    ("2026-10-01 10:00", "2026-10-01T10:00"),
    ("2026-10-01T10:00", "2026-10-01T10:00"),
    ("2026-10-01 10:00:30.5Z", "2026-10-01T10:00:30.5Z"),
    ("2026-10-01T10:00:30+02:00", "2026-10-01T10:00:30+02:00"),
]


@pytest.mark.parametrize("field", ["created", "updated", "completed", "due"])
@pytest.mark.parametrize("op,count", [("after", 1), ("before", 1), ("between", 2), ("between", "same")])
@pytest.mark.parametrize("written,t_form", _DATETIME_PAIRS)
def test_datetimes_round_trip_in_every_form(field, op, count, written, t_form):
    """CHT-1787: a space-separated datetime rendered as
    `created="2026-10-01 10:00"..`, which does not parse back. Validation
    now reads it as the T form, so structure -> text -> structure holds."""
    if count == "same":
        values, want = [written, written], [t_form, t_form]
    elif count == 2:
        values, want = [written, "2026-12-31 23:59"], [t_form, "2026-12-31T23:59"]
    else:
        values, want = [written], [t_form]
    group = IssueQuery.model_validate(
        {"filter": {"rows": [{"field": field, "op": op, "values": values}]}}
    ).filter
    assert group.rows[0].values == want
    text = render_where(group)
    assert " " not in text and '"' not in text
    assert parse_where(text) == group
    assert render_where(parse_where(text)) == text
    if count == "same":
        # equal bounds collapse to the single-instant short form
        assert text == f"{field}={t_form}"


def test_mixed_form_equal_bounds_collapse_to_the_short_form():
    group = IssueQuery.model_validate({"filter": {"rows": [
        {"field": "created", "op": "between", "values": ["2026-10-01 10:00", "2026-10-01T10:00"]},
    ]}}).filter
    assert group.rows[0].values == ["2026-10-01T10:00", "2026-10-01T10:00"]
    assert render_where(group) == "created=2026-10-01T10:00"
    assert parse_where("created=2026-10-01T10:00") == group


@pytest.mark.parametrize("text", [
    'title~="2026-10-01 10:00"', 'text!~="2026-10-01 10:00Z"', 'title^="2026-10-01 10:00"',
])
def test_datetime_shaped_text_values_are_not_rewritten(text):
    """CHT-1787 review: only date fields take the T form; a text search
    for a datetime-looking string keeps its space."""
    group = parse_where(text)
    assert " " in group.rows[0].values[0]
    assert parse_where(render_where(group)) == group


def test_bad_date_message_names_the_space_form():
    with pytest.raises(QueryError, match=r"YYYY-MM-DD\[T \]HH:MM"):
        parse_where('created="2026-10-01 25:00.."')


@pytest.mark.asyncio
async def test_endpoint_echoes_space_datetimes_in_the_t_form(client, auth_headers, test_project, test_user):
    """CHT-1787: the response's `query` and `where` use the T form, and
    re-querying with that `where` gives back the same `query`."""
    await _issue(test_project, test_user, title="t")
    scope = f"projects/{test_project.id}"
    r = await _query(client, auth_headers, scope, filter_={"rows": [
        {"field": "created", "op": "between", "values": ["2026-10-01 10:00", "2026-10-02 10:00:30.5+02:00"]},
    ]})
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["query"]["filter"]["rows"][0]["values"] == ["2026-10-01T10:00", "2026-10-02T10:00:30.5+02:00"]
    assert body["where"] == "created=2026-10-01T10:00..2026-10-02T10:00:30.5+02:00"
    again = await _query(client, auth_headers, scope, where=body["where"])
    assert again.status_code == 200, again.text
    assert again.json()["query"] == body["query"]
    assert again.json()["where"] == body["where"]


@pytest.mark.parametrize("text,values", [
    ('created="2026-10-01 10:00.."', ["2026-10-01T10:00"]),
    ('created="..2026-10-01 10:00"', ["2026-10-01T10:00"]),
    ('created="2026-10-01 10:00..2026-10-02 08:00Z"', ["2026-10-01T10:00", "2026-10-02T08:00Z"]),
    ('created="2026-10-01 10:00"', ["2026-10-01T10:00", "2026-10-01T10:00"]),
])
def test_space_datetimes_in_text_read_as_the_t_form(text, values):
    """In text the whole range is one quoted value (docs/issue-query.md)."""
    group = parse_where(text)
    assert group.rows[0].values == values
    assert parse_where(render_where(group)) == group


def test_dates_that_are_not_datetimes_are_left_alone():
    group = parse_where("created=2026-10-01..today due=-7d..")
    assert [r.values for r in group.rows] == [["2026-10-01", "today"], ["-7d"]]


@pytest.mark.asyncio
async def test_redundant_parentheses_do_not_count_toward_depth(client, auth_headers, test_project, test_user):
    """Finding 7: every parenthesis counted as a level, so
    ((((status=todo)))) hit the depth cap while building one row."""
    await _issue(test_project, test_user, title="t", status=IssueStatus.TODO)
    for where in ("((((status=todo))))", "(((((((((status=todo)))))))))",
                  "type=task or (status=todo or (priority=high or (estimate=1 or (label=))))"):
        r = await _query(client, auth_headers, f"projects/{test_project.id}", where=where)
        assert r.status_code == 200, (where, r.text)
    # real nesting still counts: any > all > any > all > any is depth 5
    deep = "type=bug or (type=task (status=todo or (priority=high (estimate=1 or estimate=2))))"
    with pytest.raises(QueryError, match="limit is 4"):
        parse_where(deep)


@pytest.mark.asyncio
async def test_an_unknown_label_is_400_here_but_empty_in_the_plain_list(
    client, auth_headers, test_project, test_user,
):
    """Finding 9: documented in docs/issue-query.md and --help."""
    await _issue(test_project, test_user, title="t")
    r = await _query(client, auth_headers, f"projects/{test_project.id}", where="label=nosuch")
    assert r.status_code == 400
    assert "no label 'nosuch'" in r.json()["detail"]
    plain = await client.get(f"/api/issues?project_id={test_project.id}&label=nosuch", headers=auth_headers)
    assert plain.status_code == 200 and plain.json() == []
