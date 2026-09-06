"""Route-coverage guard for cli.client.Client against the live OpenAPI
document (CHT-1376).

`Client` hand-builds every request. When a REST parameter is not exposed by
a client method, every caller -- the CLI commands and, through
`RestBackend`, the stdio MCP server -- silently gets the server default:
`get_comments`/`get_sub_issues` had no `limit`, so `issue_view` could only
ever see the oldest 100 comments (fixed by hand in PR #267's review). This
test makes that class of gap visible and reviewed instead of silent.

How it works: every public `Client` method is called once with sentinel
arguments while `Client._request` is replaced by a recorder, so we learn
exactly which HTTP method + path each client method emits and which query
keys it CAN emit when every parameter is supplied. That is matched against
the routes and query parameters `/openapi.json` declares. Three things are
then asserted, each against an explicit, reasoned skip-list:

1. every client method hits a real route (no dead client code);
2. every route is reachable from some client method, except the ones in
   ROUTES_NOT_FOR_THE_CLIENT / ROUTES_WITHOUT_A_CLIENT_METHOD;
3. for every reachable route, the client can emit every declared query
   parameter, except the ones in PARAMS_NOT_EXPOSED.

4. every query key the client emits is one the matched route declares (a
   misspelt key is ignored server-side, the same silent-fallback class).

The skip-lists are compared for EQUALITY, not containment: covering a
listed route or parameter fails the test until its entry is removed, so the
lists stay an honest inventory of the gap (tracked as CHT-1383), and adding
a route or a query parameter to the backend without teaching the client
fails the e2e job with a table naming it.

Out of scope, deliberately: request BODIES. Every `**kwargs` method sends
its kwargs as the JSON body, which pydantic validates server-side (a 422
names any unknown field); only query strings can be silently ignored, so
only query strings are guarded here.
"""
import inspect
from urllib.parse import parse_qs, urlsplit

import httpx
import pytest

from cli.client import Client
from conftest import TEST_PORT

OPENAPI_URL = f"http://127.0.0.1:{TEST_PORT}/openapi.json"

# Routes the CLI client is not supposed to call at all. Reason per entry.
ROUTES_NOT_FOR_THE_CLIENT = {
    ("GET", "/"): "SPA entry point (frontend)",
    ("GET", "/{full_path}"): "SPA catch-all (frontend)",
    ("GET", "/health"): "operator health probe; `chaotic system` hits it with raw httpx, not Client",
    ("GET", "/cli-auth"): "browser login page the CLI opens with webbrowser, not an API call",
    ("GET", "/api/version"): "frontend about panel; `chaotic system upgrade` compares versions via git",
}

# Routes that exist server-side but have no Client method yet (CHT-1383).
ROUTES_WITHOUT_A_CLIENT_METHOD = {
    ("GET", "/api/documents/{document_id}/labels"): "document labels: no `chaotic doc label` yet (CHT-1383)",
    ("POST", "/api/documents/{document_id}/labels/{label_id}"): "document labels (CHT-1383)",
    ("DELETE", "/api/documents/{document_id}/labels/{label_id}"): "document labels (CHT-1383)",
    ("POST", "/api/inbox/{entry_id}/archive"): "inbox archive not exposed by the CLI (CHT-1383)",
    ("POST", "/api/issues/batch-update"): "CLI loops per-issue instead (sprint_cmd.py) (CHT-1383)",
    ("GET", "/api/issues/{issue_id}/activities"): "per-issue activity feed; CLI reaches only team activities (CHT-1383)",
    ("GET", "/api/labels/{label_id}"): "single-label read (CHT-1383)",
    ("GET", "/api/rituals/pending-gates"): "pending-gates listing (CHT-1383)",
    ("GET", "/api/users/{user_id}"): "user profile read (CHT-1383)",
    ("PATCH", "/api/users/me"): "profile edit not exposed by the CLI (CHT-1383)",
    ("DELETE", "/api/users/me"): "account deletion is web-only by design (CHT-1383)",
}

# Query parameters a reachable route declares that the client cannot emit.
# Keyed by (method, route template) -> {param: reason} (CHT-1383).
_PAGING = "pagination not exposed; callers get the server's default page (CHT-1383)"
PARAMS_NOT_EXPOSED = {
    ("GET", "/api/api-keys"): {"skip": _PAGING, "limit": _PAGING},
    ("GET", "/api/documents/{document_id}/comments"): {"skip": _PAGING, "limit": _PAGING},
    ("GET", "/api/documents/{document_id}/revisions"): {"skip": _PAGING, "limit": _PAGING},
    ("GET", "/api/issues"): {
        "label_match": "CLI deliberately omits it (pinned by cli/tests/test_issue_list_labels.py)",
    },
    ("GET", "/api/issues/search"): {"skip": _PAGING},
    ("GET", "/api/issues/{issue_id}/comments"): {"skip": _PAGING},
    ("GET", "/api/issues/{issue_id}/description-revisions"): {"skip": _PAGING, "limit": _PAGING},
    ("GET", "/api/issues/{issue_id}/relations"): {"skip": _PAGING, "limit": _PAGING},
    ("GET", "/api/issues/{issue_id}/sub-issues"): {"skip": _PAGING},
    ("GET", "/api/projects/{project_id}/rituals"): {"skip": _PAGING, "limit": _PAGING},
    ("GET", "/api/projects/{project_id}/sprints"): {"skip": _PAGING, "limit": _PAGING},
    ("GET", "/api/rituals/groups"): {"skip": _PAGING, "limit": _PAGING},
    ("GET", "/api/sprints/{sprint_id}/transactions"): {"skip": _PAGING, "limit": _PAGING},
    ("GET", "/api/teams/{team_id}/documents"): {"skip": _PAGING},
    ("GET", "/api/teams/{team_id}/invitations"): {"skip": _PAGING, "limit": _PAGING},
    ("GET", "/api/teams/{team_id}/labels"): {"skip": _PAGING},
    ("GET", "/api/teams/{team_id}/members"): {"skip": _PAGING, "limit": _PAGING},
    ("GET", "/api/teams/{team_id}/projects"): {"skip": _PAGING},
}

# Client methods whose path depends on WHICH arguments are given: call them
# once more with these overrides so every branch is exercised.
EXTRA_INVOCATIONS = {
    "get_ready_issues": [{"project_id": None, "team_id": "sentinel"}],
}


class _Permissive(dict):
    """What the recorder returns in place of a response: any key reads as a
    sentinel string, so a client method that post-processes its response
    (`result["id"]`) keeps going instead of raising."""

    def __getitem__(self, key):
        return dict.get(self, key, "sentinel")

    def get(self, key, default=None):
        return dict.get(self, key, default if default is not None else "sentinel")


def _sentinel_for(param: inspect.Parameter):
    # Substring test on the annotation text: adequate for the client's plain
    # `str | None` / `int | None` / `bool` parameters, fragile if it ever
    # grows a type alias whose NAME contains "int" or "bool".
    ann = str(param.annotation)
    if "bool" in ann:
        return True
    if "int" in ann:
        return 1
    return "sentinel"


def _matches(template: str, path: str) -> bool:
    ts, ps = template.split("/"), path.split("/")
    return len(ts) == len(ps) and all(
        t == p or (t.startswith("{") and t.endswith("}")) for t, p in zip(ts, ps)
    )


def _literal_segments(template: str) -> int:
    return sum(not seg.startswith("{") for seg in template.split("/"))


def _resolve(spec_routes, method: str, path: str) -> list:
    """The route(s) the server would dispatch `path` to: among all templates
    that match, only the most literal ones. Without this, `/api/sprints/
    current` would also be credited to `/api/sprints/{sprint_id}` and hide a
    lost method or a new parameter on the dynamic route (PR #273 review)."""
    hits = [(m, t) for m, t, _ in spec_routes if m == method and _matches(t, path)]
    if not hits:
        return []
    best = max(_literal_segments(t) for _, t in hits)
    return [h for h in hits if _literal_segments(h[1]) == best]


def _table(rows, headers):
    widths = [max(len(str(r[i])) for r in [headers, *rows]) for i in range(len(headers))]
    fmt = "  " + "  ".join(f"{{:<{w}}}" for w in widths)
    lines = [fmt.format(*headers), fmt.format(*["-" * w for w in widths])]
    lines += [fmt.format(*[str(c) for c in r]) for r in rows]
    return "\n".join(lines)


@pytest.fixture(scope="module")
def spec_routes(test_server):
    """[(METHOD, template, [query param names])] from the live server."""
    spec = httpx.get(OPENAPI_URL, timeout=5.0).json()
    routes = []
    for path, ops in spec["paths"].items():
        for method, op in ops.items():
            if method not in ("get", "post", "patch", "put", "delete"):
                continue
            query = [p["name"] for p in op.get("parameters", []) if p.get("in") == "query"]
            routes.append((method.upper(), path, query))
    # 127 routes today; a partial or truncated document must not pass as
    # "everything is covered".
    assert len(routes) > 100, "openapi.json looks truncated"
    return routes


@pytest.fixture(scope="module")
def client_calls():
    """[(client_method, HTTP method, path-with-query)] plus every exception a
    method raised (before OR after its request -- a method that blows up on
    the recorded response would otherwise hide its later requests), recorded
    by calling every public Client method with sentinel arguments."""
    calls, failures = [], []
    current = {"name": None}

    def recorder(self, method, path, data=None):
        calls.append((current["name"], method.upper(), path))
        return _Permissive()

    original = Client._request
    Client._request = recorder
    try:
        client = Client()
        for name, fn in inspect.getmembers(Client, inspect.isfunction):
            if name.startswith("_"):
                continue
            kwargs = {}
            for p in list(inspect.signature(fn).parameters.values())[1:]:
                if p.kind in (p.VAR_KEYWORD, p.VAR_POSITIONAL):
                    continue
                kwargs[p.name] = _sentinel_for(p)
            for variant in [kwargs, *[dict(kwargs, **extra) for extra in EXTRA_INVOCATIONS.get(name, [])]]:
                current["name"] = name
                before = len(calls)
                try:
                    getattr(client, name)(**variant)
                except Exception as e:  # noqa: BLE001 - reported below
                    when = "before requesting" if len(calls) == before else "after requesting"
                    failures.append((name, f"raised {when}: {e!r}"))
    finally:
        Client._request = original
    return calls, failures


def _coverage(spec_routes, client_calls):
    """{(METHOD, template): set(query keys the client can emit)}, plus the
    client calls that matched no route."""
    calls, _ = client_calls
    covered: dict = {}
    unmatched = []
    for client_method, method, raw in calls:
        parts = urlsplit(raw)
        full = "/api" + parts.path
        keys = set(parse_qs(parts.query, keep_blank_values=True))
        hits = _resolve(spec_routes, method, full)
        if not hits:
            unmatched.append((client_method, f"{method} {full}"))
        for hit in hits:
            covered.setdefault(hit, set()).update(keys)
    return covered, unmatched


def test_every_client_method_hits_a_real_route(spec_routes, client_calls):
    _, failures = client_calls
    _, unmatched = _coverage(spec_routes, client_calls)
    problems = failures + unmatched
    assert not problems, (
        "Client methods that reach no route in /openapi.json (dead client code, or a "
        "route that was renamed server-side):\n" + _table(problems, ["client method", "request"])
    )


def test_every_route_is_reachable_or_explicitly_skipped(spec_routes, client_calls):
    covered, _ = _coverage(spec_routes, client_calls)
    uncovered = {(m, t) for m, t, _ in spec_routes if (m, t) not in covered}
    skipped = set(ROUTES_NOT_FOR_THE_CLIENT) | set(ROUTES_WITHOUT_A_CLIENT_METHOD)

    new_gaps = sorted(uncovered - skipped)
    assert not new_gaps, (
        "Routes no Client method can reach. Add a client method, or add the route to "
        "ROUTES_WITHOUT_A_CLIENT_METHOD (a CLI gap) or ROUTES_NOT_FOR_THE_CLIENT (frontend/"
        "infra) with a reason:\n"
        + _table([(m, t, ",".join(q)) for m, t, q in spec_routes if (m, t) in set(new_gaps)],
                 ["method", "route", "query params"])
    )
    stale = sorted(skipped - uncovered)
    assert not stale, (
        "Skip-list entries for routes the client now reaches (or that no longer exist); "
        "remove them so the list stays an honest inventory:\n"
        + _table(stale, ["method", "route"])
    )


def test_every_reachable_route_param_is_emittable_or_explicitly_skipped(spec_routes, client_calls):
    covered, _ = _coverage(spec_routes, client_calls)
    missing_rows, stale_rows = [], []
    for method, template, query in spec_routes:
        key = (method, template)
        if key not in covered:
            continue
        missing = set(query) - covered[key]
        skipped = set(PARAMS_NOT_EXPOSED.get(key, {}))
        for name in sorted(missing - skipped):
            missing_rows.append((method, template, name, ",".join(sorted(covered[key])) or "-"))
        for name in sorted(skipped - missing):
            stale_rows.append((method, template, name))
    assert not missing_rows, (
        "Query parameters the backend declares that no Client method can send -- every "
        "caller silently gets the server default. Add the kwarg to the client method, or "
        "add the parameter to PARAMS_NOT_EXPOSED with a reason:\n"
        + _table(missing_rows, ["method", "route", "missing param", "client emits"])
    )
    assert not stale_rows, (
        "PARAMS_NOT_EXPOSED entries the client now emits (or the route no longer declares); "
        "remove them:\n" + _table(stale_rows, ["method", "route", "param"])
    )


def test_every_emitted_query_key_is_one_the_route_declares(spec_routes, client_calls):
    """The other direction: a key the client sends that the route does not
    declare is ignored server-side (a misspelling, or a renamed parameter),
    so every caller silently gets the unfiltered default."""
    declared = {(m, t): set(q) for m, t, q in spec_routes}
    calls, _ = client_calls
    rows = []
    for client_method, method, raw in calls:
        parts = urlsplit(raw)
        keys = set(parse_qs(parts.query, keep_blank_values=True))
        for hit in _resolve(spec_routes, method, "/api" + parts.path):
            for key in sorted(keys - declared[hit]):
                rows.append((client_method, method, hit[1], key))
    assert not rows, (
        "Query keys the client sends that the route does not declare (the server ignores "
        "them):\n" + _table(rows, ["client method", "method", "route", "undeclared key"])
    )


def test_skip_lists_only_name_routes_the_spec_declares(spec_routes):
    declared = {(m, t) for m, t, _ in spec_routes}
    for listed in (*ROUTES_NOT_FOR_THE_CLIENT, *ROUTES_WITHOUT_A_CLIENT_METHOD, *PARAMS_NOT_EXPOSED):
        assert listed in declared, f"skip-list names a route the spec does not declare: {listed}"
    declared_params_by_route = {(m, t): set(q) for m, t, q in spec_routes}
    for key, params in PARAMS_NOT_EXPOSED.items():
        unknown = set(params) - declared_params_by_route[key]
        assert not unknown, f"PARAMS_NOT_EXPOSED[{key}] names params the route does not declare: {unknown}"
