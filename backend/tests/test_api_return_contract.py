"""The API layer's return contract, pinned (CHT-1348; ADR-0005).

Since CHT-1266 the functions in ``app/api`` have two callers: FastAPI's
router, and in-process consumers (the backend-hosted MCP transport in
``app/mcp_server/tools.py``). The router applies each route's
``response_model`` -- which both *filters* the payload to the schema's
fields and *serialises* it -- but an in-process caller gets whatever the
function actually returns. When that was a raw Oxyde row, the tool
leaked enum NAMES (``"ACTIVE"``, CHT-1333) and, latently, whatever the
row's relations carried (``OxydeIssue.creator`` -> ``hashed_password``).

The fix is that API functions return their response schema *by
construction*, and say so in their signature. These tests keep that
true:

* every public, undecorated ``app/api`` function declares a return type
  (those exist specifically to be called in-process);
* every API function the MCP tools call declares a return type that is
  a response schema, a list of one, ``dict``, or ``None`` -- so the
  next tool added cannot silently receive an ORM row;
* a handful of representative functions, called in-process the way the
  tools call them, return schema instances rather than model rows.

The first two are AST/signature checks and run without a database.
"""
import ast
import pathlib
import re
import typing

import pytest
from pydantic import BaseModel

import app.api as api_pkg
from app.api import documents, issues, labels, rituals, sprints

_API_DIR = pathlib.Path(api_pkg.__file__).parent
_TOOLS_PATH = _API_DIR.parent / "mcp_server" / "tools.py"


def _route_decorated(node: ast.AST) -> bool:
    for d in node.decorator_list:
        call = d if isinstance(d, ast.Call) else None
        func = call.func if call else d
        if isinstance(func, ast.Attribute) and func.attr in {
            "get", "post", "patch", "put", "delete", "websocket",
        }:
            return True
    return False


def _public_functions():
    """(module_name, function_name, is_routed, has_return_annotation)."""
    out = []
    for path in sorted(_API_DIR.glob("*.py")):
        tree = ast.parse(path.read_text())
        for node in tree.body:
            if not isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                continue
            if node.name.startswith("_"):
                continue
            out.append((path.stem, node.name, _route_decorated(node), node.returns is not None))
    return out


PUBLIC_FUNCTIONS = _public_functions()
UNDECORATED = [(m, f) for m, f, routed, _ in PUBLIC_FUNCTIONS if not routed]


def test_the_sweep_found_the_api_layer():
    assert len(PUBLIC_FUNCTIONS) > 100
    assert len(UNDECORATED) >= 10


@pytest.mark.parametrize(
    "module,func",
    UNDECORATED,
    ids=[f"{m}.{f}" for m, f in UNDECORATED],
)
def test_undecorated_api_function_declares_its_return(module, func):
    """An undecorated ``app/api`` function has no ``response_model`` to
    fall back on: the only place its output contract can live is its
    signature. If this fails, annotate the function with the response
    schema it returns and construct that schema in the body."""
    has_annotation = next(
        ann for m, f, _, ann in PUBLIC_FUNCTIONS if (m, f) == (module, func)
    )
    assert has_annotation, (
        f"app/api/{module}.py::{func} is called in-process (it has no route "
        f"decorator) but declares no return type -- see ADR-0005"
    )


# --------------------------------------------------------------------------
# Functions reachable from the MCP tools
# --------------------------------------------------------------------------

_ALIASES = {
    "documents_api": documents,
    "issues_api": issues,
    "labels_api": labels,
    "rituals_api": rituals,
    "sprints_api": sprints,
}
_CALL_RE = re.compile(r"\b([a-z_]+_api)\.([a-z_]+)\b")


def _tools_api_calls():
    src = _TOOLS_PATH.read_text()
    calls = sorted({(alias, fn) for alias, fn in _CALL_RE.findall(src) if alias in _ALIASES})
    return calls


TOOL_CALLS = _tools_api_calls()


def test_tools_module_calls_the_api_layer():
    """Sanity: the regex still finds the in-process call sites. If the
    tools module switches aliasing conventions this needs updating,
    otherwise the parametrized test below would silently test nothing."""
    assert len(TOOL_CALLS) >= 20
    for alias in _ALIASES:
        assert any(a == alias for a, _ in TOOL_CALLS), alias


def _is_schema_return(annotation) -> bool:
    """A return annotation an in-process caller can dump safely."""
    if annotation is None or annotation is type(None):
        return True
    if annotation is dict:
        return True
    if isinstance(annotation, type) and issubclass(annotation, BaseModel):
        return True
    origin = typing.get_origin(annotation)
    if origin is list:
        (inner,) = typing.get_args(annotation)
        return isinstance(inner, type) and issubclass(inner, BaseModel)
    if origin is typing.Union or str(origin) == "<class 'types.UnionType'>":
        return all(_is_schema_return(a) for a in typing.get_args(annotation))
    return False


@pytest.mark.parametrize(
    "alias,func",
    TOOL_CALLS,
    ids=[f"{a}.{f}" for a, f in TOOL_CALLS],
)
def test_api_function_reachable_from_tools_returns_a_schema(alias, func):
    """Every API function the MCP tools call must declare that it returns
    a response schema (or list/dict/None). A function returning a raw
    Oxyde row here is exactly the CHT-1333 bug waiting for its next
    caller -- the tool would ``model_dump`` a row and emit whatever the
    row carries."""
    fn = getattr(_ALIASES[alias], func)
    hints = typing.get_type_hints(fn)
    assert "return" in hints, (
        f"app/api/{_ALIASES[alias].__name__.rsplit('.', 1)[-1]}.py::{func} is called "
        f"from app/mcp_server/tools.py but declares no return type -- see ADR-0005"
    )
    ret = hints["return"]
    assert _is_schema_return(ret), (
        f"{func} declares -> {ret!r}; in-process callers need a response schema, "
        f"list[schema], dict, or None"
    )


def test_tools_module_never_validates_a_row_itself():
    """The tools module must not need to know about ORM rows at all: no
    ``Schema.model_validate(...)`` on something an API function handed
    it, and no ``from_attributes=`` laundering. (``project_list`` reads
    ``ProjectService`` directly and is the one sanctioned exception.)"""
    src = _TOOLS_PATH.read_text()
    assert "from_attributes" not in src
    validates = [
        line.strip() for line in src.splitlines()
        if ".model_validate(" in line and "ProjectResponse.model_validate(p)" not in line
    ]
    assert validates == [], validates


# --------------------------------------------------------------------------
# Runtime: called in-process, the functions return schema instances
# --------------------------------------------------------------------------

class TestInProcessCallsReturnSchemas:
    """Call representative API functions the way the MCP tools do -- no
    router, no response_model -- and check the *type* of what comes back.
    An Oxyde row and its response schema share field names, so a value
    comparison would pass either way; the type is the contract."""

    async def test_list_labels(self, test_team, test_user, test_label):
        from app.schemas.issue import LabelResponse
        result = await labels.list_labels(team_id=test_team.id, current_user=test_user)
        assert result and all(type(r) is LabelResponse for r in result)

    async def test_list_sprints_and_current(self, test_project, test_user):
        from app.schemas.sprint import SprintResponse
        current = await sprints.get_current_sprint(project_id=test_project.id, current_user=test_user)
        assert type(current) is SprintResponse
        assert current.status.value == "active"
        listed = await sprints.list_sprints(project_id=test_project.id, current_user=test_user)
        assert listed and all(type(s) is SprintResponse for s in listed)

    async def test_list_rituals(self, test_project, test_user, auto_close_ritual):
        from app.schemas.ritual import RitualResponse
        result = await rituals.list_rituals(project_id=test_project.id, current_user=test_user)
        assert result and all(type(r) is RitualResponse for r in result)
        assert result[0].trigger.value == "ticket_close"

    async def test_list_relations(self, test_project, test_user, test_issue):
        from app.schemas.issue import IssueCreate, IssueRelationCreate, IssueRelationResponse
        other = await issues.create_issue(
            project_id=test_project.id,
            issue_in=IssueCreate(title="Blocker"),
            current_user=test_user,
        )
        await issues.create_relation(
            issue_id=other.id,
            relation_in=IssueRelationCreate(related_issue_id=test_issue.id, relation_type="blocks"),
            current_user=test_user,
        )
        result = await issues.list_relations(issue_id=test_issue.id, current_user=test_user)
        assert result and all(type(r) is IssueRelationResponse for r in result)
        # The derived, non-enum label survives schema construction, and the
        # related status is wire-form (CHT-1345's raw-SQL leak, re-pinned).
        assert result[0].relation_type == "blocked_by"
        assert result[0].related_issue_status.value == "backlog"

    async def test_list_transactions(self, test_project, test_user):
        from app.schemas.budget_transaction import BudgetTransactionResponse
        current = await sprints.get_current_sprint(project_id=test_project.id, current_user=test_user)
        result = await sprints.list_transactions(sprint_id=current.id, current_user=test_user)
        assert all(type(t) is BudgetTransactionResponse for t in result)

    async def test_no_schema_instance_carries_internal_fields(self, test_project, test_user, test_issue):
        """The filtering half of response_model, by construction: the
        object an in-process caller receives cannot carry a field the
        schema doesn't declare, however the row's relations are loaded."""
        got = await issues.get_issue_by_identifier(test_issue.identifier, test_user)
        dumped = got.model_dump(mode="json")
        assert "creator" not in dumped
        assert "hashed_password" not in str(dumped)
