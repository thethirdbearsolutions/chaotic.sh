"""The CLI client covers the API (CHT-1383).

`cli.client.Client` is the REST client behind the CLI commands and the
stdio MCP transport's `RestBackend`. It had drifted: 11 routes had no
method at all, and 15 list routes accepted `skip`/`limit` that the
client could not send, so a caller on that transport could only ever
see the first page. This guard derives the route table from the app
itself and the client's reach from its source, so a new route without a
client method, or a list route whose method drops pagination, fails
here rather than surfacing as a missing CLI feature later.

Routes that exist only for a browser (the SPA fallback, `/cli-auth`,
`/health`, the root page) are outside the client's job and listed.
"""
import ast
import inspect
import re

import pytest

from app.main import app
from cli.client import Client

API_PREFIX = "/api"
NOT_FOR_THE_CLIENT = {
    ("GET", "/"), ("GET", "/health"), ("GET", "/cli-auth"), ("GET", "/{full_path}"),
}


def _norm(path: str) -> str:
    return re.sub(r"\{[^}]*\}", "{}", path.split("?")[0])


def _routes():
    spec = app.openapi()
    for path, ops in spec["paths"].items():
        for method, op in ops.items():
            yield method.upper(), path, op


def _client_reach() -> dict[tuple[str, str], list[str]]:
    """(HTTP method, normalised path) -> client method names that send it.
    A method's paths are every string / f-string starting with "/" in its
    body; its HTTP methods are the first argument of its `_request` calls."""
    tree = ast.parse(inspect.getsource(Client))
    reach: dict[tuple[str, str], list[str]] = {}
    for node in ast.walk(tree):
        if not isinstance(node, ast.FunctionDef) or node.name.startswith("_"):
            continue
        methods, paths = set(), set()
        # The constant pieces of an f-string are Constants too; only the
        # joined text is a path, not "/documents/" and "/issues" apart.
        fragments = {
            id(v) for sub in ast.walk(node) if isinstance(sub, ast.JoinedStr) for v in sub.values
        }
        for sub in ast.walk(node):
            if (
                isinstance(sub, ast.Call) and isinstance(sub.func, ast.Attribute)
                and sub.func.attr == "_request" and sub.args and isinstance(sub.args[0], ast.Constant)
            ):
                methods.add(sub.args[0].value)
            if (
                isinstance(sub, ast.Constant) and isinstance(sub.value, str)
                and sub.value.startswith("/") and id(sub) not in fragments
            ):
                paths.add(sub.value)
            if isinstance(sub, ast.JoinedStr):
                text = "".join(v.value if isinstance(v, ast.Constant) else "{}" for v in sub.values)
                if text.startswith("/"):
                    paths.add(text)
        for method in methods:
            for path in paths:
                reach.setdefault((method, _norm(path)), []).append(node.name)
    return reach


def _reachers(reach, method, path):
    return reach.get((method, _norm(path[len(API_PREFIX):])), [])


def test_every_api_route_has_a_client_method():
    reach = _client_reach()
    unreached = sorted(
        f"{method} {path}" for method, path, _ in _routes()
        if (method, path) not in NOT_FOR_THE_CLIENT and not _reachers(reach, method, path)
    )
    assert not unreached, "API routes cli.client.Client cannot send:\n  " + "\n  ".join(unreached)


def test_every_paginated_list_route_can_be_paged_from_the_client():
    reach = _client_reach()
    problems = []
    for method, path, op in _routes():
        if method != "GET":
            continue
        pagination = {p["name"] for p in op.get("parameters", []) if p["in"] == "query"} & {"skip", "limit"}
        if not pagination:
            continue
        for name in _reachers(reach, method, path):
            accepted = set(inspect.signature(getattr(Client, name)).parameters)
            missing = sorted(pagination - accepted)
            if missing:
                problems.append(f"{path} -> Client.{name} cannot send {missing}")
    assert not problems, "\n".join(problems)


def test_the_route_table_and_the_reach_are_not_empty():
    """The two guards above prove nothing if either side came back empty."""
    assert sum(1 for _ in _routes()) > 100
    reach = _client_reach()
    assert ("GET", "/issues/{}") in reach and ("POST", "/issues/batch-update") in reach


@pytest.mark.parametrize("method, path", sorted(NOT_FOR_THE_CLIENT))
def test_the_exclusions_are_real_routes(method, path):
    assert any(m == method and p == path for m, p, _ in _routes()), f"{method} {path} is no longer a route; drop it"
