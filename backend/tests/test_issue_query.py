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
        ("((((((status=todo))))))", "nests deeper"),
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
    assert r.status_code == 403
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
    assert (await _query(client, headers, f"projects/{other.id}")).status_code == 403
    assert (await _query(client, headers, f"projects/{test_project.id}")).status_code == 200
    # team scope follows check_user_team_access, as GET /issues?team_id does
    listed = await client.get(f"/api/issues?team_id={test_team.id}", headers=headers)
    queried = await _query(client, headers, f"teams/{test_team.id}")
    assert listed.status_code == queried.status_code


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
