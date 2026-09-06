"""The API layer's return contract, pinned (CHT-1348; ADR-0005).

Since CHT-1266 the functions in ``app/api`` have two callers: FastAPI's
router, and in-process consumers (the backend-hosted MCP transport's
data-access adapter, ``app/mcp_server/backend.py``; ADR-0007). The router applies each route's
``response_model`` -- which both *filters* the payload to the schema's
fields and *serialises* it -- but an in-process caller gets whatever the
function actually returns. When that was a raw Oxyde row, the tool
leaked enum NAMES (``"ACTIVE"``, CHT-1333) and, latently, whatever the
row's relations carried (``OxydeIssue.creator`` -> ``hashed_password``).

The fix is that API functions return their response schema *by
construction*, and say so in their signature. These tests keep that
true:

* every public, undecorated ``app/api`` function (those exist
  specifically to be called in-process) declares a return type that is
  a response schema, a list of one, a scalar, or ``None`` -- never an
  ORM row;
* every API function the MCP tools call declares a schema return type,
  where the set of API modules the tools import is derived from the
  tools module itself, so a newly imported module cannot slip past;
* the tools module never validates or launders a row itself;
* a handful of representative functions, called in-process the way the
  tools call them, return schema instances rather than model rows.

The first three are AST/signature checks and run without a database.
"""
import ast
import importlib
import inspect
import pathlib
import re
import typing

import pytest
from oxyde import Model as OxydeModel
from pydantic import BaseModel

import app.api as api_pkg

_API_DIR = pathlib.Path(api_pkg.__file__).parent
_TOOLS_PATH = _API_DIR.parent / "mcp_server" / "backend.py"

# Auth dependencies, not API functions: they return the current user row,
# a bool, or an auth-method string, and are never a tool's output.
_NOT_API_FUNCTIONS = {"deps"}


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
        if path.stem in _NOT_API_FUNCTIONS or path.stem.startswith("_"):
            continue
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


def _is_orm_row(annotation) -> bool:
    return isinstance(annotation, type) and issubclass(annotation, OxydeModel)


def _is_schema_return(annotation, *, allow_scalars: bool = False) -> bool:
    """A return annotation an in-process caller can dump safely.

    A response schema, ``list[schema]``, ``None``, or unions of those.
    ``dict`` is deliberately NOT accepted: ``-> dict`` would let
    ``{"items": [row, ...]}`` through unseen. Scalars (str/bool/int) are
    allowed only for the undecorated helpers (``get_author_name``), never
    for anything a tool calls.
    """
    if annotation is None or annotation is type(None):
        return True
    if _is_orm_row(annotation):
        return False
    if isinstance(annotation, type) and issubclass(annotation, BaseModel):
        return True
    if allow_scalars and annotation in (str, bool, int):
        return True
    origin = typing.get_origin(annotation)
    if origin is list:
        (inner,) = typing.get_args(annotation)
        return _is_schema_return(inner, allow_scalars=False) and inner is not type(None)
    if origin is typing.Union or str(origin) == "<class 'types.UnionType'>":
        return all(_is_schema_return(a, allow_scalars=allow_scalars) for a in typing.get_args(annotation))
    return False


def _resolve(module: str, func: str):
    return getattr(importlib.import_module(f"app.api.{module}"), func)


def test_the_sweep_found_the_api_layer():
    assert len(PUBLIC_FUNCTIONS) > 100
    assert len(UNDECORATED) >= 10


@pytest.mark.parametrize(
    "module,func",
    UNDECORATED,
    ids=[f"{m}.{f}" for m, f in UNDECORATED],
)
def test_undecorated_api_function_returns_a_schema(module, func):
    """An undecorated ``app/api`` function has no ``response_model`` to
    fall back on: the only place its output contract can live is its
    signature, and that contract must not be an ORM row. If this fails,
    annotate the function with the response schema it returns and
    construct that schema in the body."""
    hints = typing.get_type_hints(_resolve(module, func))
    assert "return" in hints, (
        f"app/api/{module}.py::{func} is called in-process (it has no route "
        f"decorator) but declares no return type -- see ADR-0005"
    )
    ret = hints["return"]
    assert _is_schema_return(ret, allow_scalars=True), (
        f"app/api/{module}.py::{func} declares -> {ret!r}; in-process callers need "
        f"a response schema, list[schema], a scalar, or None -- never an Oxyde row"
    )


# --------------------------------------------------------------------------
# Functions reachable from the MCP tools
# --------------------------------------------------------------------------

def _tools_api_aliases() -> dict:
    """``{alias: module_name}`` for every ``from app.api import X as
    X_api`` in the adapter module -- derived, so a newly imported API module is
    covered the day it lands."""
    tree = ast.parse(_TOOLS_PATH.read_text())
    aliases = {}
    for node in tree.body:
        if isinstance(node, ast.ImportFrom) and node.module == "app.api":
            for alias in node.names:
                aliases[alias.asname or alias.name] = alias.name
    return aliases


_ALIASES = _tools_api_aliases()
_CALL_RE = re.compile(r"\b([a-z_]+_api)\.([a-z_]+)\b")


def _tools_api_calls():
    src = _TOOLS_PATH.read_text()
    return sorted({(alias, fn) for alias, fn in _CALL_RE.findall(src)})


TOOL_CALLS = _tools_api_calls()


def test_tools_module_calls_the_api_layer():
    """Sanity for the derivation above: every ``*_api.`` reference in
    the adapter module resolves to an import we found, and every import is
    used. If it changes aliasing conventions this fails loudly instead
    of the parametrized test below silently testing nothing."""
    assert len(TOOL_CALLS) >= 20
    referenced = {a for a, _ in TOOL_CALLS}
    assert referenced == set(_ALIASES), (referenced ^ set(_ALIASES))


@pytest.mark.parametrize(
    "alias,func",
    TOOL_CALLS,
    ids=[f"{a}.{f}" for a, f in TOOL_CALLS],
)
def test_api_function_reachable_from_tools_returns_a_schema(alias, func):
    """Every API function the MCP tools call must declare that it returns
    a response schema (or list/None). A function returning a raw Oxyde
    row here is exactly the CHT-1333 bug waiting for its next caller --
    the tool would ``model_dump`` a row and emit whatever the row
    carries."""
    module = _ALIASES[alias]
    fn = _resolve(module, func)
    hints = typing.get_type_hints(fn)
    assert "return" in hints, (
        f"app/api/{module}.py::{func} is called from app/mcp_server/backend.py "
        f"but declares no return type -- see ADR-0005"
    )
    ret = hints["return"]
    assert _is_schema_return(ret), (
        f"{func} declares -> {ret!r}; in-process callers need a response schema, "
        f"list[schema], or None"
    )


_FASTAPI_SENTINELS = {"Query", "Header", "Depends", "Body", "Path", "Cookie", "Form", "File", "Security"}


def _plain_default_is_fastapi_sentinel(node: ast.AST) -> bool:
    """`Query(...)` or `fastapi.Query(...)` used as a default value."""
    if not isinstance(node, ast.Call):
        return False
    callee = node.func
    if isinstance(callee, ast.Name):
        return callee.id in _FASTAPI_SENTINELS
    if isinstance(callee, ast.Attribute):
        return callee.attr in _FASTAPI_SENTINELS
    return False


ALL_FUNCTIONS = [(m, f) for m, f, _, _ in PUBLIC_FUNCTIONS]


@pytest.mark.parametrize(
    "module,func",
    ALL_FUNCTIONS,
    ids=[f"{m}.{f}" for m, f in ALL_FUNCTIONS],
)
def test_api_function_has_real_defaults(module, func):
    """A parameter whose *default value* is `Query(...)`/`Header(...)` only
    works under FastAPI's dependency injection; called in-process it is a
    live, truthy sentinel object. Every app/api function must keep FastAPI
    metadata in `Annotated[...]` and a real Python default (CHT-1375).
    Input-side twin of the return-contract check above. Scoped to the
    tools-reachable set at first; widened to the whole layer in CHT-1377,
    the same widening ADR-0005 anticipates for the return contract."""
    tree = ast.parse((_API_DIR / f"{module}.py").read_text())
    node = next(n for n in tree.body if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef)) and n.name == func)
    args = node.args
    # defaults align with the TAIL of posonlyargs + args (positional-only
    # params can carry defaults too).
    positional_all = [a.arg for a in args.posonlyargs + args.args]
    positional = positional_all[-len(args.defaults):] if args.defaults else []
    offenders = [name for name, d in zip(positional, args.defaults) if _plain_default_is_fastapi_sentinel(d)]
    offenders += [a.arg for a, d in zip(args.kwonlyargs, args.kw_defaults) if d is not None and _plain_default_is_fastapi_sentinel(d)]
    assert offenders == [], (
        f"app/api/{module}.py::{func} has FastAPI sentinel defaults {offenders}; "
        f"use `param: Annotated[T, Query(...)] = <default>` so in-process callers get a real value"
    )


@pytest.mark.parametrize(
    "module,func",
    ALL_FUNCTIONS,
    ids=[f"{m}.{f}" for m, f in ALL_FUNCTIONS],
)
def test_api_function_has_real_defaults_at_runtime(module, func):
    """Runtime twin of the AST check above: whatever spelling produced it,
    no parameter's actual default object may be a FastAPI param/dependency
    marker. Immune to aliasing, attribute-form callees and re-exports."""
    import fastapi.params as fp

    fn = _resolve(module, func)
    sentinels = (fp.Param, fp.Depends, fp.Body)  # Query/Header/Path/Cookie/Form/File subclass Param; Security subclasses Depends
    offenders = [
        name for name, p in inspect.signature(fn).parameters.items()
        if p.default is not inspect.Parameter.empty and isinstance(p.default, sentinels)
    ]
    assert offenders == [], (
        f"app/api/{module}.py::{func} has live FastAPI sentinel defaults at runtime: {offenders}"
    )


def test_tools_module_never_validates_a_row_itself():
    """The tools module must not need to know about ORM rows at all: no
    ``Schema.model_validate(...)`` and no ``from_attributes=`` laundering
    anywhere in it. Every row-to-schema conversion belongs in app/api."""
    src = _TOOLS_PATH.read_text()
    assert "from_attributes" not in src
    validates = [line.strip() for line in src.splitlines() if ".model_validate(" in line]
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
        from app.api import labels
        from app.schemas.issue import LabelResponse
        result = await labels.list_labels(team_id=test_team.id, current_user=test_user)
        assert result and all(type(r) is LabelResponse for r in result)

    async def test_list_projects(self, test_team, test_user, test_project):
        from app.api import projects
        from app.schemas.project import ProjectResponse
        result = await projects.list_projects(team_id=test_team.id, current_user=test_user)
        assert result and all(type(p) is ProjectResponse for p in result)

    async def test_list_sprints_and_current(self, test_project, test_user):
        from app.api import sprints
        from app.schemas.sprint import SprintResponse
        current = await sprints.get_current_sprint(project_id=test_project.id, current_user=test_user)
        assert type(current) is SprintResponse
        assert current.status.value == "active"
        listed = await sprints.list_sprints(project_id=test_project.id, current_user=test_user)
        assert listed and all(type(s) is SprintResponse for s in listed)

    async def test_list_rituals(self, test_project, test_user, auto_close_ritual):
        from app.api import rituals
        from app.schemas.ritual import RitualResponse
        result = await rituals.list_rituals(project_id=test_project.id, current_user=test_user)
        assert result and all(type(r) is RitualResponse for r in result)
        assert result[0].trigger.value == "ticket_close"

    async def test_list_relations(self, test_project, test_user, test_issue):
        from app.api import issues
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

    async def test_list_transactions(self, test_project, test_user, test_issue):
        from app.api import issues, sprints
        from app.enums import IssueStatus
        from app.schemas.budget_transaction import BudgetTransactionResponse
        from app.schemas.issue import IssueUpdate
        # Closing an issue is what writes a transaction (against the sprint
        # that is active at the time, so make sure one exists first);
        # without one the list is empty and ``all([])`` would pass vacuously.
        current = await sprints.get_current_sprint(project_id=test_project.id, current_user=test_user)
        await issues.update_issue(
            issue_id=test_issue.id, issue_in=IssueUpdate(status=IssueStatus.DONE), current_user=test_user,
        )
        result = await sprints.list_transactions(sprint_id=current.id, current_user=test_user)
        assert result and all(type(t) is BudgetTransactionResponse for t in result)

    async def test_list_issues_in_process_with_only_scope_kwargs(self, test_project, test_user, test_issue):
        """Before CHT-1375 this call filtered on live Query objects; now the
        defaults are real, so scope-only kwargs list the project's issues."""
        from app.api import issues
        rows = await issues.list_issues(current_user=test_user, project_id=test_project.id)
        assert [r.id for r in rows] == [test_issue.id]

    async def test_no_schema_instance_carries_internal_fields(self, test_project, test_user, test_issue):
        """The filtering half of response_model, by construction: the
        object an in-process caller receives cannot carry a field the
        schema doesn't declare, however the row's relations are loaded."""
        from app.api import issues
        got = await issues.get_issue_by_identifier(test_issue.identifier, test_user)
        dumped = got.model_dump(mode="json")
        assert "creator" not in dumped
        assert "hashed_password" not in str(dumped)
