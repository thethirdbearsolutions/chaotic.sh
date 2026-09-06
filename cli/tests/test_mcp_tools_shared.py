"""Behaviour tests for the shared MCP toolset (chaotic_mcp_tools, CHT-1374),
run ONCE against a fake Backend.

The two adapters (cli.mcp_backend.RestBackend, app.mcp_server.backend
.InProcessBackend) are tested in their own packages against a mocked
client / a real database. Everything here is about the parts they share:
the registry (bind, the `team` capability switch, the error boundary),
the envelope builders, and tool-body logic that used to be written twice
-- exercised against ``FakeBackend``, which records every call and
returns canned rows, so a body's behaviour is pinned independently of
either transport.
"""
from __future__ import annotations

import asyncio
import inspect
import pathlib
import re

import pytest

import chaotic_mcp_tools
from chaotic_mcp_tools import (
    ALL_TOOLS,
    Backend,
    BackendError,
    Capabilities,
    RESPONSE_SHAPES,
    TEAM_SCOPED_TOOLS,
    ToolInputError,
    TransportError,
    backend_error_payload,
    bind,
    bind_all,
    error_envelope,
    validation_payload,
)
from chaotic_mcp_tools.expected import EXPECTED_TEAM_SCOPED, toolset_diff


class FakeBackend:
    """In-memory Backend: canned rows, a call recorder, and injectable
    failures. `team_param` picks the capability; `current_project=None`
    exercises the "no default project" path of optional_project."""

    def __init__(self, *, team_param=False, current_project="proj-1", fail_on=None):
        self.capabilities = Capabilities(team_param=team_param)
        self.current_project = current_project
        self.fail_on = fail_on or {}
        self.calls: list[tuple[str, tuple, dict]] = []
        self.issues = {
            "CHT-1": {"id": "i1", "identifier": "CHT-1", "title": "One", "status": "backlog",
                      "project_id": "proj-1", "labels": [{"id": "lab-1", "name": "bug"}]},
            "CHT-2": {"id": "i2", "identifier": "CHT-2", "title": "Two", "status": "todo",
                      "project_id": "proj-1", "labels": []},
        }
        self.labels = [{"id": "lab-1", "name": "bug"}, {"id": "lab-2", "name": "triage"}]
        self.rituals = [
            {"id": "r-sprint", "name": "retro", "trigger": "every_sprint", "prompt": "Write it.",
             "note_required": True},
            {"id": "r-ticket", "name": "close-gate", "trigger": "ticket_close", "prompt": "Linked?",
             "note_required": True, "approval_mode": "auto"},
        ]
        self.pending_issue_rituals = {"pending_rituals": [], "completed_rituals": []}
        self.limbo = {"in_limbo": False, "pending_rituals": []}
        self.estimate_scale = "fibonacci"
        self.inbox = [
            {"id": "in-1", "kind": "mention", "title": "ethan mentioned you on CHT-1", "team_id": "team-1",
             "issue_identifier": "CHT-1", "document_title": None, "source_user_name": "ethan",
             "body": "@agent please look", "created_at": "2026-09-06T00:00:00Z", "read_at": None,
             "recipient_user_id": "u-agent"},
            {"id": "in-2", "kind": "assignment", "title": "Assigned CHT-2", "team_id": "team-1",
             "issue_identifier": "CHT-2", "document_title": None, "source_user_name": "ethan",
             "body": None, "created_at": "2026-09-05T00:00:00Z", "read_at": "2026-09-05T01:00:00Z",
             "recipient_user_id": "u-agent"},
        ]
        self.list_result: list = []

    def _rec(self, name, *args, **kwargs):
        self.calls.append((name, args, kwargs))
        if name in self.fail_on:
            raise self.fail_on[name]

    def calls_to(self, name):
        return [(a, k) for n, a, k in self.calls if n == name]

    # scope
    async def resolve_team(self, team):
        self._rec("resolve_team", team)
        return "team-1"

    async def resolve_project(self, project, team):
        self._rec("resolve_project", project, team)
        if project:
            return f"proj-{project}", "team-1"
        if not self.current_project:
            raise ToolInputError("No project selected.")
        return self.current_project, "team-1"

    async def optional_project(self, project, team):
        self._rec("optional_project", project, team)
        if project:
            return f"proj-{project}", "team-1"
        return self.current_project, "team-1"

    async def team_for_project(self, project_id):
        self._rec("team_for_project", project_id)
        return "team-1"

    async def resolve_assignee(self, value, team_id):
        self._rec("resolve_assignee", value, team_id)
        return "user-me" if value == "me" else f"user-{value}"

    async def resolve_sprint(self, value, project_id):
        self._rec("resolve_sprint", value, project_id)
        return f"sprint-{value}"

    async def resolve_document(self, value):
        self._rec("resolve_document", value)
        return "doc-1"

    async def me_id(self):
        self._rec("me_id")
        return "user-me"

    # issues
    async def get_issue(self, identifier):
        self._rec("get_issue", identifier)
        if identifier not in self.issues:
            raise BackendError("Issue not found", 404, "Issue not found")
        return dict(self.issues[identifier])

    async def list_issues(self, **kw):
        self._rec("list_issues", **kw)
        return list(self.list_result)

    async def list_ready_issues(self, **kw):
        self._rec("list_ready_issues", **kw)
        return list(self.list_result)

    async def create_issue(self, project_id, **fields):
        self._rec("create_issue", project_id, **fields)
        return {"id": "new", "identifier": "CHT-9", "project_id": project_id, **fields}

    async def update_issue(self, issue_id, **fields):
        self._rec("update_issue", issue_id, **fields)
        return {"id": issue_id, "updated": fields}

    async def create_comment(self, issue_id, content):
        self._rec("create_comment", issue_id, content)
        return {"id": "c1", "content": content}

    async def list_comments(self, issue_id, limit):
        self._rec("list_comments", issue_id, limit)
        return [{"id": f"c{n}"} for n in range(25)]

    async def list_sub_issues(self, issue_id, limit):
        self._rec("list_sub_issues", issue_id, limit)
        return [self.issues["CHT-2"]]

    async def list_relations(self, issue_id):
        self._rec("list_relations", issue_id)
        return [{"id": "rel-1", "related_issue_id": "i2", "relation_type": "blocks"}]

    async def create_relation(self, issue_id, related_issue_id, relation_type):
        self._rec("create_relation", issue_id, related_issue_id, relation_type)
        return {"id": "rel-new", "relation_type": relation_type}

    async def delete_relation(self, issue_id, relation_id):
        self._rec("delete_relation", issue_id, relation_id)

    async def add_label(self, issue_id, label_id):
        self._rec("add_label", issue_id, label_id)

    async def remove_label(self, issue_id, label_id):
        self._rec("remove_label", issue_id, label_id)

    async def list_labels(self, team_id, limit):
        self._rec("list_labels", team_id, limit)
        return list(self.labels)

    # documents
    async def list_documents(self, team_id, **kw):
        self._rec("list_documents", team_id, **kw)
        return list(self.list_result)

    async def get_document(self, document_id):
        self._rec("get_document", document_id)
        return {"id": document_id, "title": "Doc"}

    async def list_document_comments(self, document_id):
        self._rec("list_document_comments", document_id)
        return []

    async def list_document_issues(self, document_id):
        self._rec("list_document_issues", document_id)
        return []

    async def create_document(self, team_id, **fields):
        self._rec("create_document", team_id, **fields)
        return {"id": "doc-new", **fields}

    async def update_document(self, document_id, **fields):
        self._rec("update_document", document_id, **fields)
        return {"id": document_id, **fields}

    async def link_document(self, document_id, issue_id):
        self._rec("link_document", document_id, issue_id)

    async def unlink_document(self, document_id, issue_id):
        self._rec("unlink_document", document_id, issue_id)

    # sprints
    async def get_current_sprint(self, project_id):
        self._rec("get_current_sprint", project_id)
        return {"id": "sp-active", "name": "Sprint 2", "budget": 10, "points_spent": 4}

    async def list_sprints(self, project_id, status):
        self._rec("list_sprints", project_id, status)
        return [{"id": "sp-1", "budget": 5, "points_spent": 7}]

    async def get_sprint(self, sprint_id):
        self._rec("get_sprint", sprint_id)
        return {"id": sprint_id, "name": "Sprint 1"}

    async def close_sprint(self, sprint_id):
        self._rec("close_sprint", sprint_id)
        return {"id": sprint_id, "name": "Sprint 1", "limbo": self.limbo["in_limbo"], "budget": 5, "points_spent": 6}

    async def list_transactions(self, sprint_id):
        self._rec("list_transactions", sprint_id)
        return []

    # rituals
    async def list_rituals(self, project_id, include_inactive=False):
        self._rec("list_rituals", project_id, include_inactive=include_inactive)
        return list(self.rituals)

    async def get_limbo_status(self, project_id):
        self._rec("get_limbo_status", project_id)
        return dict(self.limbo)

    async def attest_ritual(self, ritual_id, project_id, note):
        self._rec("attest_ritual", ritual_id, project_id, note)
        return {"id": "att-1", "approved_at": "now"}

    async def complete_gate_ritual(self, ritual_id, project_id, note):
        self._rec("complete_gate_ritual", ritual_id, project_id, note)
        return {"id": "att-2"}

    async def get_pending_issue_rituals(self, issue_id):
        self._rec("get_pending_issue_rituals", issue_id)
        return dict(self.pending_issue_rituals)

    async def attest_ritual_for_issue(self, ritual_id, issue_id, note):
        self._rec("attest_ritual_for_issue", ritual_id, issue_id, note)
        return {"id": "att-3", "approved_at": None}

    async def complete_gate_ritual_for_issue(self, ritual_id, issue_id, note):
        self._rec("complete_gate_ritual_for_issue", ritual_id, issue_id, note)
        return {"id": "att-4"}

    # projects / activity
    async def list_projects(self, team_id, limit):
        self._rec("list_projects", team_id, limit)
        return list(self.list_result)

    async def get_project(self, project_id):
        self._rec("get_project", project_id)
        return {"id": project_id, "key": "CHT", "estimate_scale": self.estimate_scale}

    async def list_document_revisions(self, document_id, *, limit):
        self._rec("list_document_revisions", document_id, limit=limit)
        return [{"id": "rev-2", "document_id": document_id, "version": 2, "title": "T2"},
                {"id": "rev-1", "document_id": document_id, "version": 1, "title": "T1"}][:limit]

    async def get_document_revision(self, document_id, version):
        self._rec("get_document_revision", document_id, version)
        return {"id": f"rev-{version}", "document_id": document_id, "version": version, "title": "T", "content": "old"}

    async def list_issue_description_revisions(self, issue_id, *, limit):
        self._rec("list_issue_description_revisions", issue_id, limit=limit)
        return [{"id": "irev-1", "issue_id": issue_id, "version": 1}][:limit]

    async def get_issue_description_revision(self, issue_id, version):
        self._rec("get_issue_description_revision", issue_id, version)
        return {"id": f"irev-{version}", "issue_id": issue_id, "version": version, "description": "was"}

    async def list_inbox(self, team_id, *, unread, limit):
        self._rec("list_inbox", team_id, unread=unread, limit=limit)
        rows = [e for e in self.inbox if not unread or e["read_at"] is None]
        return rows[:limit]

    async def mark_inbox_read(self, entry_id):
        self._rec("mark_inbox_read", entry_id)
        entry = next(e for e in self.inbox if e["id"] == entry_id)
        entry["read_at"] = "now"
        return dict(entry)

    async def mark_all_inbox_read(self, team_id):
        self._rec("mark_all_inbox_read", team_id)
        n = sum(1 for e in self.inbox if e["read_at"] is None)
        for e in self.inbox:
            e["read_at"] = e["read_at"] or "now"
        return {"marked_count": n}

    async def list_activities(self, team_id, **kw):
        self._rec("list_activities", team_id, **kw)
        return list(self.list_result)


@pytest.fixture
def fake():
    return FakeBackend()


def _tools(backend) -> dict:
    return {t.__name__: t for t in bind_all(backend)}


# ---------------------------------------------------------------------------
# Package hygiene
# ---------------------------------------------------------------------------

def test_package_imports_nothing_from_either_host():
    """The whole point: the bodies know neither transport. An import of
    `cli.*`, `app.*`, fastapi, click or httpx here would re-couple them."""
    root = pathlib.Path(chaotic_mcp_tools.__file__).parent
    bad = []
    for path in root.rglob("*.py"):
        for line in path.read_text().splitlines():
            if re.match(r"\s*(from|import)\s+(cli|app|fastapi|click|httpx|mcp)\b", line):
                bad.append(f"{path.relative_to(root)}: {line.strip()}")
    assert bad == [], bad


def test_fake_backend_implements_the_protocol():
    """Every method the Protocol declares exists on the fake with the same
    parameter names, so a body calling something the fake lacks fails
    here, not as a confusing `unexpected` envelope in a body test."""
    for name, member in inspect.getmembers(Backend):
        if name.startswith("_") or not inspect.isfunction(member):
            continue
        assert hasattr(FakeBackend, name), f"FakeBackend lacks {name}"


# ---------------------------------------------------------------------------
# registry: bind / capabilities / boundary
# ---------------------------------------------------------------------------

def test_bound_tools_are_coroutine_functions_with_the_body_name_and_doc(fake):
    for body, bound in zip(ALL_TOOLS, bind_all(fake)):
        assert inspect.iscoroutinefunction(bound)
        assert bound.__name__ == body.__name__
        assert bound.__doc__ == body.__doc__
        assert bound.__wrapped__ is body


def test_bound_signature_drops_backend_always():
    for backend in (FakeBackend(team_param=False), FakeBackend(team_param=True)):
        for bound in bind_all(backend):
            assert "backend" not in inspect.signature(bound).parameters


def test_team_parameter_follows_the_capability():
    without = {t.__name__: set(inspect.signature(t).parameters) for t in bind_all(FakeBackend(team_param=False))}
    with_team = {t.__name__: set(inspect.signature(t).parameters) for t in bind_all(FakeBackend(team_param=True))}
    for name in without:
        diff = with_team[name] - without[name]
        if name in TEAM_SCOPED_TOOLS:
            assert diff == {"team"}, name
        else:
            assert diff == set(), name
        assert without[name] - with_team[name] == set()


def test_team_scoped_tools_derived_from_bodies():
    assert TEAM_SCOPED_TOOLS == {
        t.__name__ for t in ALL_TOOLS if "team" in inspect.signature(t).parameters
    }
    problem = toolset_diff(TEAM_SCOPED_TOOLS, "TEAM_SCOPED_TOOLS", expected=EXPECTED_TEAM_SCOPED)
    assert not problem, problem


async def test_team_kwarg_is_dropped_when_not_advertised(fake):
    """A stdio-bound tool called with `team` (which its schema does not
    carry) must not explode -- the kwarg is discarded, never forwarded."""
    tools = _tools(fake)
    result = await tools["label_list"](team="ignored")
    assert result == {"labels": fake.labels}
    assert fake.calls_to("resolve_team") == [((None,), {})]


async def test_team_kwarg_is_forwarded_when_advertised():
    fake = FakeBackend(team_param=True)
    await _tools(fake)["label_list"](team="t-explicit")
    assert fake.calls_to("resolve_team") == [(("t-explicit",), {})]


async def test_positional_calls_work(fake):
    result = await _tools(fake)["issue_view"]("CHT-1")
    assert result["identifier"] == "CHT-1"


class TestBoundary:
    async def test_tool_input_error(self, fake):
        result = await _tools(fake)["issue_create"](title="x", issue_type="nope")
        assert result["error"]["error_code"] == "tool_input"
        assert "nope" in result["error"]["message"]

    async def test_backend_error_keeps_structure(self):
        detail = {"error_code": "sprint_in_arrears", "message": "Over budget.", "arrears_by": 2}
        fake = FakeBackend(fail_on={"update_issue": BackendError(None, 409, detail)})
        result = await _tools(fake)["issue_update"]("CHT-1", status="done")
        assert result == {"error": {**detail, "http_status": 409}}

    async def test_backend_error_string_detail(self):
        fake = FakeBackend()
        result = await _tools(fake)["issue_view"]("CHT-404")
        assert result == {"error": {"message": "Issue not found", "http_status": 404}}

    async def test_transport_error(self):
        fake = FakeBackend(fail_on={"get_issue": TransportError("Could not connect.", "connect_error")})
        result = await _tools(fake)["issue_view"]("CHT-1")
        assert result == {"error": {"message": "Could not connect.", "error_code": "connect_error"}}

    async def test_unexpected_exception_never_raises(self):
        fake = FakeBackend(fail_on={"get_issue": RuntimeError("kaboom")})
        result = await _tools(fake)["issue_view"]("CHT-1")
        assert result["error"]["error_code"] == "unexpected"
        assert "kaboom" in result["error"]["message"]

    # Enough input for each tool to get PAST its own input validation and
    # make a backend call; the default is one issue identifier.
    _REACHING_KWARGS = {
        "issue_unblock": {"identifier": "CHT-1", "relation_id": "rel-1"},
        "issue_label": {"identifier": "CHT-1", "add": ["bug"]},
        "inbox_mark_read": {"entry_id": "in-1"},
        "doc_revisions": {"document_id": "d"},
        "doc_revision": {"document_id": "d", "version": 1},
        "issue_revision": {"identifier": "CHT-1", "version": 1},
        "sprint_add": {"identifiers": ["CHT-1"]},
        "sprint_remove": {"identifiers": ["CHT-1"]},
        "issue_block": {"identifier": "CHT-1", "blocked": "CHT-2"},
        "issue_comment": {"identifier": "CHT-1", "content": "hi"},
        "issue_create": {"title": "T"},
        "doc_create": {"title": "T"},
        "doc_update": {"document_id": "d", "title": "T"},
        "doc_link": {"document_id": "d", "identifier": "CHT-1"},
        "doc_unlink": {"document_id": "d", "identifier": "CHT-1"},
        "doc_view": {"document_id": "d"},
        "ritual_attest": {"ritual": "retro", "note": "n"},
        "ritual_complete": {"ritual": "retro"},
    }

    def test_every_tool_is_guarded(self):
        """Not just the ones tested above: each bound tool returns an
        `unexpected` envelope, never raises, when its FIRST backend call
        blows up -- so the kwargs must carry the tool past its own input
        checks (PR #271 review, finding 3)."""
        async def run():
            out = {}
            for body in ALL_TOOLS:
                fake = FakeBackend(team_param=True)
                for name in [n for n, m in inspect.getmembers(FakeBackend) if inspect.iscoroutinefunction(m)]:
                    fake.fail_on[name] = RuntimeError("first call fails")
                tool = bind(body, fake)
                kwargs = self._REACHING_KWARGS.get(body.__name__, {"identifier": "CHT-1"})
                accepted = set(inspect.signature(tool).parameters)
                out[body.__name__] = (await tool(**{k: v for k, v in kwargs.items() if k in accepted}), fake)
            return out
        results = asyncio.run(run())
        for name, (result, fake) in results.items():
            assert set(result) == {"error"}, name
            assert result["error"]["error_code"] == "unexpected", (name, result)
            assert fake.calls, f"{name} never reached its backend"


# ---------------------------------------------------------------------------
# errors: the envelope builders
# ---------------------------------------------------------------------------

class TestEnvelope:
    def test_error_envelope_shape(self):
        assert error_envelope("m") == {"error": {"message": "m"}}
        assert error_envelope("m", "code", extra=1) == {"error": {"message": "m", "error_code": "code", "extra": 1}}
        assert RESPONSE_SHAPES["error_envelope"] == {"always": ["message"], "when_known": ["error_code", "http_status"]}

    def test_validation_payload_is_value_blind(self):
        payload = validation_payload([{"loc": ["body", "title"], "msg": "field required", "input": "SECRET"}])
        assert payload == {
            "message": "title: field required",
            "error_code": "validation_error",
            "errors": [{"loc": ["body", "title"], "msg": "field required"}],
            "http_status": 422,
        }
        assert "SECRET" not in str(payload)

    def test_validation_payload_keeps_integer_loc_parts(self):
        """The REST 422 handler emits list indexes as ints; both transports
        forward them untouched so the envelope is the wire shape."""
        payload = validation_payload([{"loc": ["body", "identifiers", 0], "msg": "bad"}])
        assert payload["errors"] == [{"loc": ["body", "identifiers", 0], "msg": "bad"}]
        assert payload["message"] == "identifiers.0: bad"

    def test_validation_payload_tolerates_non_dict_entries(self):
        payload = validation_payload(["weird"])
        assert payload["errors"] == [{"loc": [], "msg": "weird"}]
        assert payload["message"] == "weird"

    def test_dict_detail_without_message_gets_a_sentence(self):
        assert backend_error_payload(BackendError(None, 409, {"arrears_by": 3}))["message"] == "Request failed (HTTP 409)."
        assert backend_error_payload(BackendError(None, 409, {"error_code": "x_y"}))["message"] == "Request failed (x_y)."

    def test_dict_detail_without_message_prefers_the_adapter_rendering(self):
        payload = backend_error_payload(BackendError("Rendered by the CLI", 400, {"arrears_by": 3}))
        assert payload == {"arrears_by": 3, "message": "Rendered by the CLI", "http_status": 400}

    def test_dict_detail_with_message_wins(self):
        payload = backend_error_payload(BackendError("cli text", 409, {"message": "server text", "error_code": "c"}))
        assert payload["message"] == "server text"

    def test_list_detail_goes_through_validation_payload(self):
        payload = backend_error_payload(BackendError("Validation error: x", 422, [{"loc": ["x"], "msg": "bad"}]))
        assert payload["error_code"] == "validation_error" and payload["http_status"] == 422

    def test_string_detail(self):
        assert backend_error_payload(BackendError("Not found", 404, "Not found")) == {"message": "Not found", "http_status": 404}
        assert backend_error_payload(BackendError("local", None, None)) == {"message": "local"}


# ---------------------------------------------------------------------------
# Body behaviour (once, for both transports)
# ---------------------------------------------------------------------------

class TestIssueListBody:
    async def test_over_fetches_one_row_for_truncation(self, fake):
        fake.list_result = [dict(fake.issues["CHT-1"])] * 3
        result = await _tools(fake)["issue_list"](limit=2)
        (args, kwargs), = fake.calls_to("list_issues")
        assert kwargs["limit"] == 3
        assert result["count"] == 2 and result["truncated"] is True
        assert set(result["issues"][0]) == set(RESPONSE_SHAPES["compact_issue_fields"])

    async def test_python_sorted_keys_probe_at_offset_instead(self, fake):
        fake.list_result = [dict(fake.issues["CHT-1"])]
        result = await _tools(fake)["issue_list"](limit=1, sort_by="priority")
        first, probe = fake.calls_to("list_issues")
        assert first[1]["limit"] == 1 and "skip" not in first[1]
        assert probe[1]["skip"] == 1 and probe[1]["limit"] == 1
        assert probe[1]["sort_by"] == "created" and probe[1]["order"] == "desc"
        assert result["truncated"] is True  # the probe returned a row

    async def test_all_projects_with_sprint_is_refused_before_any_call(self, fake):
        result = await _tools(fake)["issue_list"](all_projects=True, sprint="current")
        assert result["error"]["error_code"] == "tool_input"
        assert fake.calls == []

    async def test_explicit_project_beats_all_projects(self, fake):
        await _tools(fake)["issue_list"](all_projects=True, project="X")
        assert fake.calls_to("resolve_project") == [(("X", None), {})]
        assert fake.calls_to("resolve_team") == []

    async def test_statuses_and_priorities_are_passed_as_lists(self, fake):
        await _tools(fake)["issue_list"](status=["todo", "done"], priority=["high"])
        (_, kwargs), = fake.calls_to("list_issues")
        assert kwargs["statuses"] == ["todo", "done"] and kwargs["priorities"] == ["high"]

    async def test_detail_returns_full_rows(self, fake):
        fake.list_result = [dict(fake.issues["CHT-1"])]
        result = await _tools(fake)["issue_list"](detail=True)
        assert result["issues"] == [fake.issues["CHT-1"]]


class TestIssueViewBody:
    async def test_caps_comments_and_reports_counts(self, fake):
        result = await _tools(fake)["issue_view"]("CHT-1")
        assert result["comment_count"] == 25
        assert len(result["comments"]) == RESPONSE_SHAPES["issue_view_comment_cap"]
        assert result["comments"][-1] == {"id": "c24"}  # newest kept
        assert fake.calls_to("list_comments") == [(("i1", RESPONSE_SHAPES["issue_view_fetch_limit"]), {})]
        assert result["sub_issue_count"] == 1
        assert set(result["sub_issues"][0]) == set(RESPONSE_SHAPES["compact_issue_fields"])

    async def test_failed_sub_issue_fetch_is_tolerated(self):
        fake = FakeBackend(fail_on={"list_sub_issues": BackendError("nope", 403, "nope")})
        result = await _tools(fake)["issue_view"]("CHT-1")
        assert result["sub_issues"] == [] and result["sub_issue_count"] == 0


class TestIssueUpdateBody:
    async def test_no_fields_is_an_input_error(self, fake):
        result = await _tools(fake)["issue_update"]("CHT-1")
        assert result["error"]["error_code"] == "tool_input"

    async def test_returns_the_update_result(self, fake):
        result = await _tools(fake)["issue_update"]("CHT-1", status="done", estimate=3)
        assert result == {"id": "i1", "updated": {"status": "done", "estimate": 3}}
        assert len(fake.calls_to("get_issue")) == 1

    async def test_unassigned_clears_without_resolving(self, fake):
        await _tools(fake)["issue_update"]("CHT-1", assignee=" Unassigned ")
        (_, kwargs), = fake.calls_to("update_issue")
        assert kwargs == {"assignee_id": None}
        assert fake.calls_to("resolve_assignee") == []

    async def test_assignee_resolved_in_the_issues_team(self, fake):
        await _tools(fake)["issue_update"]("CHT-1", assignee="me")
        assert fake.calls_to("team_for_project") == [(("proj-1",), {})]
        assert fake.calls_to("resolve_assignee") == [(("me", "team-1"), {})]

    async def test_attest_only_refetches(self, fake):
        fake.pending_issue_rituals = {"pending_rituals": [
            {"id": "r-ticket", "name": "close-gate", "approval_mode": "auto"}], "completed_rituals": []}
        result = await _tools(fake)["issue_update"]("CHT-1", attest={"close-gate": "done it"})
        assert fake.calls_to("attest_ritual_for_issue") == [(("r-ticket", "i1", "done it"), {})]
        assert fake.calls_to("update_issue") == []
        assert result["identifier"] == "CHT-1"

    async def test_attest_gate_ritual_routes_to_gate_completion(self, fake):
        fake.pending_issue_rituals = {"pending_rituals": [
            {"id": "r-ticket", "name": "close-gate", "approval_mode": "gate"}], "completed_rituals": []}
        await _tools(fake)["issue_update"]("CHT-1", status="done", attest={"close-gate": "signed"})
        assert fake.calls_to("complete_gate_ritual_for_issue") == [(("r-ticket", "i1", "signed"), {})]

    async def test_attest_unknown_ritual_is_an_input_error(self, fake):
        result = await _tools(fake)["issue_update"]("CHT-1", status="done", attest={"nope": "x"})
        assert result["error"]["error_code"] == "tool_input"
        assert "nope" in result["error"]["message"]
        assert fake.calls_to("update_issue") == []

    async def test_attest_empty_note_is_an_input_error(self, fake):
        result = await _tools(fake)["issue_update"]("CHT-1", attest={"close-gate": "  "})
        assert result["error"]["error_code"] == "tool_input"

    async def test_attest_skips_already_attested_and_completed_rituals(self, fake):
        fake.pending_issue_rituals = {
            "pending_rituals": [{"id": "r-a", "name": "awaiting", "attestation": {"id": "x"}}],
            "completed_rituals": [{"name": "done-one"}],
        }
        result = await _tools(fake)["issue_update"]("CHT-1", status="done",
                                                    attest={"awaiting": "again", "done-one": "again"})
        assert "error" not in result
        assert fake.calls_to("attest_ritual_for_issue") == [] and fake.calls_to("complete_gate_ritual_for_issue") == []

    async def test_title_and_description_are_passed_through(self, fake):
        await _tools(fake)["issue_update"]("CHT-1", title="New", description="Body")
        (_, kwargs), = fake.calls_to("update_issue")
        assert kwargs == {"title": "New", "description": "Body"}


class TestIssueStartBody:
    async def test_claims_as_me(self, fake):
        result = await _tools(fake)["issue_start"]("CHT-1")
        (_, kwargs), = fake.calls_to("update_issue")
        assert kwargs == {"assignee_id": "user-me", "status": "in_progress"}
        assert result == {"id": "i1", "updated": kwargs}

    async def test_lease_seconds_only_when_given(self, fake):
        await _tools(fake)["issue_start"]("CHT-1", lease_seconds=90)
        (_, kwargs), = fake.calls_to("update_issue")
        assert kwargs["lease_seconds"] == 90


class TestEstimateScaleWarning:
    """issue_create / issue_update warn about an off-scale estimate in
    `warnings`; the write itself is never blocked (CHT-1365)."""

    async def test_create_off_scale_carries_a_warning(self, fake):
        result = await _tools(fake)["issue_create"](title="T", estimate=7)
        assert result["identifier"] == "CHT-1" or "identifier" in result
        assert result["warnings"] == [
            "Estimate 7 is not on this project's fibonacci scale (1, 2, 3, 5, 8, 13, 21); "
            "nearest is 8. Stored as given."
        ]
        assert fake.calls_to("get_project") == [(("proj-1",), {})]

    async def test_create_on_scale_has_no_warnings_key(self, fake):
        result = await _tools(fake)["issue_create"](title="T", estimate=5)
        assert "warnings" not in result

    async def test_update_off_scale_warns_against_the_issue_project(self, fake):
        fake.estimate_scale = "powers_of_2"
        result = await _tools(fake)["issue_update"]("CHT-1", estimate=3)
        assert result["warnings"][0].startswith("Estimate 3 is not on this project's powers_of_2 scale")

    async def test_lookup_failure_never_fails_the_write(self):
        fake = FakeBackend(fail_on={"get_project": BackendError("boom", 500, "boom")})
        result = await _tools(fake)["issue_create"](title="T", estimate=7)
        assert "error" not in result and "warnings" not in result


class TestRevisionTools:
    """CHT-1335: history the agent writes (doc_update / description edits)
    is readable from the same surface."""

    async def test_doc_revisions_resolve_the_document_and_list(self, fake):
        result = await _tools(fake)["doc_revisions"]("Some title")
        assert [r["version"] for r in result["revisions"]] == [2, 1]
        assert result["count"] == 2 and result["truncated"] is False
        assert fake.calls_to("resolve_document") == [(("Some title",), {})]
        assert fake.calls_to("list_document_revisions") == [(("doc-1",), {"limit": 21})]

    async def test_doc_revision_fetches_one_snapshot(self, fake):
        result = await _tools(fake)["doc_revision"]("d1", version=1)
        assert result["content"] == "old" and result["version"] == 1

    async def test_unknown_version_is_the_backend_404(self, fake):
        """A version that does not exist is a not-found from the backend, on
        both transports, and the body passes it through untouched."""
        missing = BackendError("Revision not found", 404, "Revision not found")
        fake = FakeBackend(fail_on={"get_document_revision": missing, "get_issue_description_revision": missing})
        for name, kwargs in (
            ("doc_revision", {"document_id": "doc-1", "version": 9}),
            ("issue_revision", {"identifier": "CHT-1", "version": 9}),
        ):
            result = await _tools(fake)[name](**kwargs)
            assert result == {"error": {"message": "Revision not found", "http_status": 404}}, name

    async def test_issue_revisions_go_through_the_issue_id(self, fake):
        result = await _tools(fake)["issue_revisions"]("CHT-1")
        assert result["revisions"][0]["id"] == "irev-1"
        assert fake.calls_to("list_issue_description_revisions") == [(("i1",), {"limit": 21})]
        snap = await _tools(fake)["issue_revision"]("CHT-1", version=1)
        assert snap["description"] == "was"

    async def test_limit_truncation_marker(self, fake):
        result = await _tools(fake)["doc_revisions"]("d1", limit=1)
        assert result["count"] == 1 and result["truncated"] is True


class TestInboxTools:
    """CHT-1338: the mailbox the system keeps for an agent is readable
    from the agent's own surface."""

    async def test_list_is_compact_and_spans_every_team_by_default(self, fake):
        """The inbox is addressed to the caller, not a team: with no `team`
        the backend is asked for every team (None), which also keeps the
        tool usable from a project-scoped key (PR #285 review)."""
        result = await _tools(fake)["inbox_list"]()
        assert result["count"] == 2 and result["truncated"] is False and result["unread_only"] is False
        assert set(result["entries"][0]) == {
            "id", "kind", "title", "issue_identifier", "document_title", "source_user_name",
            "created_at", "read_at",
        }
        assert "body" not in result["entries"][0]
        assert fake.calls_to("list_inbox") == [((None,), {"unread": False, "limit": 21})]
        assert fake.calls_to("resolve_team") == []

    async def test_explicit_team_is_resolved(self):
        fake = FakeBackend(team_param=True)
        await _tools(fake)["inbox_list"](team="team-1")
        assert fake.calls_to("resolve_team") == [(("team-1",), {})]
        assert fake.calls_to("list_inbox") == [(("team-1",), {"unread": False, "limit": 21})]
        assert (await _tools(fake)["inbox_mark_all_read"](team="team-1"))["marked_count"] == 1
        assert fake.calls_to("mark_all_inbox_read")[-1] == (("team-1",), {})

    async def test_limit_never_exceeds_what_the_route_accepts(self, fake):
        """The body fetches limit + 1 to detect truncation and the REST route
        caps limit at 200, so the largest page is 199 (PR #285 review)."""
        await _tools(fake)["inbox_list"](limit=199)
        assert fake.calls_to("list_inbox")[-1][1]["limit"] == 200
        # The 199 ceiling itself is pinned by the schema snapshot
        # (docs/mcp-toolset-schema.json, inbox_list.limit.maximum).

    async def test_unread_filter_and_detail(self, fake):
        result = await _tools(fake)["inbox_list"](unread=True, detail=True)
        assert [e["id"] for e in result["entries"]] == ["in-1"]
        assert result["entries"][0]["body"] == "@agent please look"
        assert result["unread_only"] is True

    async def test_mark_read_and_mark_all(self, fake):
        entry = await _tools(fake)["inbox_mark_read"]("in-1")
        assert entry["id"] == "in-1" and entry["read_at"] == "now"
        assert (await _tools(fake)["inbox_mark_all_read"]())["marked_count"] == 0
        fake.inbox[1]["read_at"] = None
        assert (await _tools(fake)["inbox_mark_all_read"]())["marked_count"] == 1
        assert fake.calls_to("mark_all_inbox_read")[-1] == ((None,), {})


class TestScopeDefaults:
    async def test_issue_ready_without_project_refuses_instead_of_widening(self, fake):
        """CHT-1355: no `project`, no current project, no `all_projects` used
        to silently answer with the whole team's ready work on stdio (and
        raise on HTTP). Both now refuse; the widening is opt-in."""
        fake.current_project = None
        result = await _tools(fake)["issue_ready"]()
        assert result["error"]["error_code"] == "tool_input"
        assert "No project selected" in result["error"]["message"]
        assert fake.calls_to("list_ready_issues") == []

    async def test_issue_ready_all_projects_is_the_explicit_widening(self, fake):
        fake.current_project = None
        await _tools(fake)["issue_ready"](all_projects=True)
        (_, kwargs), = fake.calls_to("list_ready_issues")
        assert kwargs["project_id"] is None and kwargs["team_id"] == "team-1"

    async def test_issue_ready_with_current_project_is_project_scoped(self, fake):
        await _tools(fake)["issue_ready"]()
        (_, kwargs), = fake.calls_to("list_ready_issues")
        assert kwargs["project_id"] == "proj-1" and kwargs["team_id"] is None

    async def test_doc_list_all_projects_goes_team_wide(self, fake):
        await _tools(fake)["doc_list"](all_projects=True)
        (args, kwargs), = fake.calls_to("list_documents")
        assert args == ("team-1",) and kwargs["project_id"] is None and kwargs["limit"] == 51

    async def test_doc_create_is_global(self, fake):
        await _tools(fake)["doc_create"](title="T", is_global=True)
        (args, kwargs), = fake.calls_to("create_document")
        assert kwargs["project_id"] is None

    async def test_doc_update_icon_and_project_move(self, fake):
        await _tools(fake)["doc_update"]("d", icon="x", project="X")
        (args, kwargs), = fake.calls_to("update_document")
        assert args == ("doc-1",) and kwargs == {"icon": "x", "project_id": "proj-X"}
        result = await _tools(fake)["doc_update"]("d", project="X", is_global=True)
        assert result["error"]["error_code"] == "tool_input"
        result = await _tools(fake)["doc_update"]("d")
        assert "No updates provided" in result["error"]["message"]

    async def test_activity_recent_project_scopes(self, fake):
        await _tools(fake)["activity_recent"](project="X", limit=5)
        (args, kwargs), = fake.calls_to("list_activities")
        assert kwargs == {"limit": 6, "project_id": "proj-X"}


class TestLabelBody:
    async def test_resolves_by_name_case_insensitively_and_is_idempotent(self, fake):
        result = await _tools(fake)["issue_label"]("CHT-1", add=["BUG", "triage"])
        assert fake.calls_to("add_label") == [(("i1", "lab-2"), {})]  # bug already present
        assert result["labels_added"] == ["triage"] and result["labels_removed"] == []

    async def test_unknown_label_lists_the_known_ones(self, fake):
        result = await _tools(fake)["issue_label"]("CHT-1", add=["nope"])
        assert result["error"]["error_code"] == "tool_input"
        assert "bug" in result["error"]["message"] and "triage" in result["error"]["message"]
        assert fake.calls_to("add_label") == []

    async def test_project_scoped_key_gets_the_explanation(self):
        fake = FakeBackend(fail_on={"list_labels": BackendError("Not authorized", 403, "Not authorized")})
        result = await _tools(fake)["issue_label"]("CHT-1", add=["bug"])
        assert result["error"]["error_code"] == "tool_input"
        assert "scoped to a project" in result["error"]["message"]

    async def test_requires_add_or_remove(self, fake):
        result = await _tools(fake)["issue_label"]("CHT-1")
        assert result["error"]["error_code"] == "tool_input" and fake.calls == []

    async def test_exact_id_and_id_prefix_resolve(self, fake):
        result = await _tools(fake)["issue_label"]("CHT-2", add=["lab-2"], remove=["lab-"])
        assert "error" in result and "Ambiguous label id prefix" in result["error"]["message"]
        result = await _tools(fake)["issue_label"]("CHT-2", add=["lab-2"])
        assert result["labels_added"] == ["lab-2"]
        fake.labels.append({"id": "zz-unique", "name": "other"})
        result = await _tools(fake)["issue_label"]("CHT-2", add=["zz-"])
        assert fake.calls_to("add_label")[-1] == (("i2", "zz-unique"), {})

    async def test_ambiguous_name_and_no_labels(self, fake):
        fake.labels.append({"id": "lab-3", "name": "BUG"})
        result = await _tools(fake)["issue_label"]("CHT-2", add=["bug"])
        assert "Ambiguous label name" in result["error"]["message"]
        fake.labels = []
        result = await _tools(fake)["issue_label"]("CHT-2", add=["bug"])
        assert result["error"]["message"] == "No labels exist in this team yet."

    async def test_non_auth_backend_error_during_lookup_propagates(self):
        fake = FakeBackend(fail_on={"list_labels": BackendError("boom", 500, "boom")})
        result = await _tools(fake)["issue_label"]("CHT-1", add=["bug"])
        assert result["error"] == {"message": "boom", "http_status": 500}


class TestSprintBody:
    async def test_budget_state_is_derived(self, fake):
        result = await _tools(fake)["sprint_current"]()
        assert result["in_arrears"] is False and result["points_remaining"] == 6
        listed = await _tools(fake)["sprint_list"]()
        assert listed["sprints"][0]["in_arrears"] is True and listed["sprints"][0]["arrears_by"] == 2

    async def test_close_reports_the_now_active_sprint(self, fake):
        result = await _tools(fake)["sprint_close"]()
        assert result["entered_limbo"] is False
        assert result["now_active"]["id"] == "sp-active" and result["now_active"]["points_remaining"] == 6

    async def test_close_into_limbo_has_no_now_active(self, fake):
        fake.limbo = {"in_limbo": True, "pending_rituals": [{"name": "retro"}]}
        result = await _tools(fake)["sprint_close"]()
        assert result["entered_limbo"] is True and result["now_active"] is None
        assert fake.calls_to("get_current_sprint") == []

    async def test_close_into_limbo_names_the_pending_rituals(self, fake):
        """The next step after entering limbo is attesting the EVERY_SPRINT
        rituals; the close result carries them so no second call is needed
        (CHT-1381). Same rows and `unattested` list as ritual_pending."""
        retro = {"name": "retro", "approval_mode": "auto", "attestation": None}
        report = {"name": "report", "approval_mode": "review", "attestation": {"note": "written"}}
        fake.limbo = {"in_limbo": True, "pending_rituals": [retro, report]}
        result = await _tools(fake)["sprint_close"]()
        assert result["limbo_pending"] == [retro, report]
        assert result["unattested"] == ["retro"]
        assert fake.calls_to("get_limbo_status") == [(("proj-1",), {})]

    async def test_close_that_rotates_has_empty_limbo_fields(self, fake):
        result = await _tools(fake)["sprint_close"]()
        assert result["limbo_pending"] == [] and result["unattested"] == []
        assert fake.calls_to("get_limbo_status") == []
        assert "lookup_error" not in result

    async def test_failed_limbo_lookup_after_a_close_still_reports_the_close(self):
        """The close committed before the lookup; a timeout on the lookup
        must not read as "the close failed" (PR #278 review)."""
        fake = FakeBackend(fail_on={"get_limbo_status": TransportError("timed out", "timeout")})
        fake.limbo = {"in_limbo": True, "pending_rituals": [{"name": "retro"}]}
        result = await _tools(fake)["sprint_close"]()
        assert "error" not in result
        assert result["entered_limbo"] is True
        assert result["limbo_pending"] is None and result["unattested"] is None
        assert result["lookup_error"] == {"message": "timed out", "error_code": "timeout"}

    async def test_failed_now_active_lookup_after_a_rotation_still_reports_the_close(self):
        fake = FakeBackend(fail_on={"get_current_sprint": BackendError("gone", 503, "gone")})
        result = await _tools(fake)["sprint_close"]()
        assert "error" not in result
        assert result["entered_limbo"] is False and result["now_active"] is None
        assert result["lookup_error"]["http_status"] == 503

    async def test_sprint_add_reports_partial_failure_in_the_envelope_shape(self, fake):
        result = await _tools(fake)["sprint_add"](identifiers=["CHT-1", "CHT-404"])
        assert result["updated"] == ["CHT-1"]
        assert result["failed"] == [{"identifier": "CHT-404", "error": {"message": "Issue not found", "http_status": 404}}]
        assert result["sprint"] == {"id": "sprint-current", "name": "Sprint 1"}

    async def test_sprint_name_lookup_failure_does_not_fail_the_batch(self):
        fake = FakeBackend(fail_on={"get_sprint": BackendError("gone", 404, "gone")})
        result = await _tools(fake)["sprint_add"](identifiers=["CHT-1"], sprint="7")
        assert result["updated"] == ["CHT-1"] and result["sprint"] == {"id": "sprint-7", "name": None}

    async def test_sprint_remove_needs_identifiers(self, fake):
        assert (await _tools(fake)["sprint_remove"](identifiers=[]))["error"]["error_code"] == "tool_input"


class TestRitualBody:
    async def test_attest_dispatches_on_trigger(self, fake):
        result = await _tools(fake)["ritual_attest"](ritual="retro", note="did it")
        assert result["scope"] == "sprint" and result["approved"] is True
        assert fake.calls_to("attest_ritual") == [(("r-sprint", "proj-1", "did it"), {})]

        result = await _tools(fake)["ritual_attest"](ritual="CLOSE-GATE", note="linked", identifier="CHT-1")
        assert result["scope"] == "ticket" and result["approved"] is False
        assert fake.calls_to("attest_ritual_for_issue") == [(("r-ticket", "i1", "linked"), {})]

    async def test_ticket_ritual_without_identifier_is_refused(self, fake):
        result = await _tools(fake)["ritual_attest"](ritual="close-gate", note="x")
        assert result["error"]["error_code"] == "tool_input" and "identifier" in result["error"]["message"]

    async def test_missing_note_quotes_the_prompt(self, fake):
        result = await _tools(fake)["ritual_attest"](ritual="retro")
        assert "Write it." in result["error"]["message"]

    async def test_name_form_trigger_is_normalised(self, fake):
        fake.rituals = [dict(fake.rituals[1], trigger="TICKET_CLOSE")]
        result = await _tools(fake)["ritual_attest"](ritual="close-gate", note="x")
        assert "identifier" in result["error"]["message"]  # dispatched to the ticket branch

    async def test_find_ritual_by_id_no_rituals_and_ambiguous(self, fake):
        result = await _tools(fake)["ritual_complete"](ritual="r-sprint")
        assert result["scope"] == "sprint" and fake.calls_to("complete_gate_ritual") == [(("r-sprint", "proj-1", None), {})]
        fake.rituals.append(dict(fake.rituals[0], id="r-dup"))
        result = await _tools(fake)["ritual_complete"](ritual="retro")
        assert "Ambiguous ritual name" in result["error"]["message"]
        fake.rituals = []
        result = await _tools(fake)["ritual_complete"](ritual="retro")
        assert "no rituals configured" in result["error"]["message"]

    async def test_complete_ticket_ritual(self, fake):
        result = await _tools(fake)["ritual_complete"](ritual="close-gate", identifier="CHT-1", note="ok")
        assert result == {"scope": "ticket", "ritual": "close-gate", "identifier": "CHT-1", "attestation": {"id": "att-4"}}
        assert fake.calls_to("complete_gate_ritual_for_issue") == [(("r-ticket", "i1", "ok"), {})]
        result = await _tools(fake)["ritual_complete"](ritual="close-gate")
        assert "identifier" in result["error"]["message"]

    async def test_unknown_ritual_lists_the_known_ones(self, fake):
        result = await _tools(fake)["ritual_attest"](ritual="nope", note="x")
        assert "retro" in result["error"]["message"] and "close-gate" in result["error"]["message"]

    async def test_pending_ticket_scope_does_not_resolve_a_project(self, fake):
        fake.pending_issue_rituals = {"pending_rituals": [{"name": "close-gate", "attestation": None}]}
        result = await _tools(fake)["ritual_pending"](identifier="CHT-1")
        assert result == {"scope": "ticket", "identifier": "CHT-1",
                          "pending_rituals": [{"name": "close-gate", "attestation": None}],
                          "unattested": ["close-gate"]}
        assert fake.calls_to("resolve_project") == []


class TestProjectAndActivityBody:
    async def test_project_list_caps_at_1000_with_probe(self, fake):
        fake.list_result = [{"id": f"p{n}", "name": "n", "description": "d" * 300} for n in range(1001)]
        result = await _tools(fake)["project_list"]()
        assert fake.calls_to("list_projects") == [(("team-1", 1001), {})]
        assert result["count"] == 1000 and result["truncated"] is True
        assert result["projects"][0]["description"].endswith("...(+100 chars)")

    async def test_activity_previews_old_and_new_values(self, fake):
        fake.list_result = [{"id": "a1", "old_value": "x" * 250, "new_value": None}]
        result = await _tools(fake)["activity_recent"](limit=1)
        assert result["activities"][0]["old_value"].endswith("...(+50 chars)")
        assert result["activities"][0]["new_value"] is None
        assert result["truncated"] is False
