# ADR-0007: One MCP tool body, two backends (CHT-1374)

* **Status**: Accepted
* **Date**: 2026-09-06

## Context

Chaotic has two MCP servers: `chaotic mcp` (stdio, in the CLI, calling the
REST API through `cli.client.Client`) and the backend's `/mcp` Streamable
HTTP endpoint (calling `app.api` functions in process, CHT-1266). Until
this ADR they were two hand-kept copies of the same 30 tools, 1,624 and
1,865 lines respectively. The snapshot `docs/mcp-toolset-schema.json` and
two sync tests pinned tool *schemas*, and since CHT-1370/CHT-1350 the
compact-row shapes and the error envelope too. They could not pin
*behaviour*: any `if` in a tool body was written twice and tested twice,
and a fix applied to one side passed both suites. In Sprint 95 alone the
copies diverged on error shape (CHT-1350), scoping (CHT-1355), response
values (CHT-1344), the validation payload and the comment cap; each was
fixed twice.

The Sprint 95 architecture review named the real asymmetry: not the
transport, but (a) how data is reached (REST client vs in-process API
functions) and (b) where context comes from (a CLI profile vs an API
key's team memberships). Every tool body's logic is transport-agnostic.

Two constraints shaped the solution. mcp 2.x dispatches `def` tool
handlers to worker threads and `async def` handlers on the event loop, so
a shared body must have one kind. And the HTTP server's team-scoped tools
carry an optional `team` parameter the stdio server's do not, because the
MCP SDK derives each tool's JSON schema from the Python signature.

## Decision

The tool surface is written once, in the `chaotic_mcp_tools` package,
as `async def tool(backend: Backend, ...params)` bodies over a `Backend`
Protocol. Two adapters implement the Protocol and each server registers
the shared bodies bound to its adapter:

* `cli.mcp_backend.RestBackend` wraps `cli.client.Client`, bridging the
  synchronous httpx client onto the event loop with
  `anyio.to_thread.run_sync`, and takes context from the CLI profile.
* `app.mcp_server.backend.InProcessBackend` wraps `app.api` as the user
  resolved from the caller's API key, `model_dump(mode="json")`s at its
  edge (ADR-0005), and takes context from `scope.py`.

`registry.bind(tool, backend)` closes a body over its backend, applies
the one error boundary (ADR-0006), and rewrites the wrapper's
`__signature__` to drop `backend` and, unless
`backend.capabilities.team_param` is set, `team`. The SDK honours
`__signature__` before `__wrapped__`, so one body yields both schemas.
`TEAM_SCOPED_TOOLS` is derived from the bodies' signatures, not listed
by hand.

Adapters own error translation: whatever their data source raises
becomes one of `ToolInputError` (caller can fix), `BackendError`
(refused or failed; carries the structured `detail` and status) or
`TransportError` (unreachable), and nothing else escapes an adapter
method. The bodies and the boundary never import FastAPI, click, httpx
or the SDK; a test pins that.

Scope resolution stays behind Protocol methods because it is the
legitimate difference. `optional_project` is the one place the two
adapters deliberately answer differently: the stdio side falls back to
the profile's current project or, absent one, the whole team; the HTTP
side has no profile, so it resolves the single accessible project or
asks for `project`. Both are the behaviour each transport had before.

**Packaging.** `chaotic_mcp_tools` ships inside the existing
`chaotic-cli` distribution (`cli/src/chaotic_mcp_tools/`, listed in the
wheel alongside `cli`). The backend depends on the cli project by a uv
path source; it is only ever installed from this repo's checkout
(`just sync`, `chaotic system install`, CI, e2e), never from PyPI. The
import name is neutral so that moving it to its own distribution later
is a pyproject change, not a code change.

## Consequences

* A behaviour divergence between the two MCP servers is impossible by
  construction: there is one body. The snapshot becomes a regression
  artifact of one module; the backend's sync test collapses to "this
  server exposes the shared toolset plus `team` on exactly
  `TEAM_SCOPED_TOOLS`".
* New tools (CHT-1338 inbox, CHT-1335 revisions) are written once,
  against `Backend`, and tested once against a fake backend
  (`cli/tests/test_mcp_tools_shared.py`). Adding a data method means
  implementing it in both adapters; the Protocol makes the omission a
  visible error.
* Every stdio tool is now a coroutine (the sync-by-design guard flipped
  to all-async). A cancelled stdio tool call no longer interrupts its
  in-flight HTTP request, which finishes on the worker thread. Accepted.
* Four behaviours were unified deliberately and are visible on one
  transport each: `issue_update`/`issue_start` return the update
  response instead of re-fetching (the HTTP behaviour; one fewer REST
  call); `issue_view` tolerates a failed sub-issue fetch (the stdio
  behaviour); label-name resolution uses one wording, including the
  project-scoped-key explanation, on both sides; and validation
  envelopes keep `errors[].loc` exactly as the REST 422 handler emits it
  (list indexes stay integers), where the HTTP side used to stringify
  them.
* `ISSUE_TYPES`/`ISSUE_TYPE_ALIASES` have one definition
  (`chaotic_mcp_tools.constants`), imported by the CLI's `issue`
  commands.
* The backend's `tests/test_api_return_contract.py` derives the
  tools-reachable set of API functions from the adapter module
  (`app/mcp_server/backend.py`), which is now the only in-process caller.
* The backend venv installs the `chaotic-cli` distribution (click, rich,
  pyyaml were already transitive). Accepted for the release-process
  stability it buys.

## Alternatives considered

* **A third PyPI distribution (`chaotic-mcp-tools`).** Cleaner ownership,
  and the shape the ticket first proposed. Rejected for now: it requires
  PyPI and Test PyPI registration plus trusted-publisher setup *before*
  the next CLI release, or `uv tool install chaotic-cli` fails to resolve
  for every user (the CHT-1331 failure mode). Kept as the documented
  next step; the neutral import name and the package's zero coupling to
  `cli`/`app` are what make it a pyproject move.
* **Vendoring the module into both wheels.** e2e installs both projects
  editable into one venv, which would produce two copies of one module
  name; sdist-to-wheel builds lose the `../` path. Rejected.
* **Two thin per-server shims for the `team` parameter** instead of a
  signature rewrite. Thirty-six shims to keep in step with thirty bodies;
  the rewrite is one function and is derived. Rejected.
* **Making `cli.client.Client` async** so the stdio side needs no thread
  bridge. Every CLI command depends on the synchronous client; a
  different ticket, and the thread bridge costs nothing measurable here.
* **Keeping two copies and widening the sync tests.** Tests can pin
  shapes; they cannot pin every branch of every body. The duplication
  was the bug factory, and the review's own count (five double-fixes in
  one sprint) was the evidence.
