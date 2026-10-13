# ADR-0005: The API layer returns response schemas by construction

* **Status**: Accepted
* **Date**: 2026-09-05
* **Driver**: CHT-1348 (follow-up to CHT-1345 and CHT-1333; the enum
  name/value bug class that recurred from CHT-974 onward)

## Context

`response_model=` on a FastAPI route decorator does two jobs: it
**filters** the handler's return value down to the schema's declared
fields, and it **serialises** the result for the wire (enums as
`.value`, datetimes as ISO strings). Both happen inside the routing
layer. That is idiomatic FastAPI, and it is sound for exactly as long
as the router is the only way to call the function.

CHT-1266 added a second caller. The backend-hosted MCP transport
(`app/mcp_server/tools.py`; since CHT-1374 its data-access adapter
`app/mcp_server/backend.py`) cannot loop back over HTTP into the process
it lives in, so its tools call the `app/api` functions directly. At
that moment those functions stopped being route handlers and became a
shared API layer with two consumers, and the output contract did not
move with them: 122 routed functions and 20 public undecorated
functions (11 resource create/list functions called from `nested.py`,
plus auth dependencies and `build_*` helpers) declared no return type, so an in-process caller received
whatever the body happened to `return` -- usually a raw Oxyde row.

The consequences were exactly what the split predicts:

* **Serialising.** `sprint_current` emitted `"ACTIVE"`, `ritual_list`
  emitted `"TICKET_CLOSE"` (CHT-1333). CHT-1345 fixed the mechanism
  (`DbEnum` now serialises `.value` in json mode) but left the layering
  intact.
* **Filtering.** With CHT-1345 in place a raw `model_dump(mode="json")`
  on an ORM row *looks* correct while still nesting whatever the row's
  relations carry. `OxydeIssue.creator` is a user row; `UserResponse`
  filters out `hashed_password` and `is_superuser`, a raw dump does not.
  Nothing leaked, but only because every issue-returning function
  happened to already build `IssueResponse`, and a test
  (`TestNoLeakedInternalFields`) pinned that state.
* **Convention as defence.** The tools module grew a `_dump(schema, row)`
  helper that every tool author had to remember to use, plus a
  `_rituals_dump` variant when the first helper guessed the wrong
  schema (CHT-1354). CLAUDE.md warned that adding a translation at yet
  another boundary is how this bug class survived for a year.

The correlation in CHT-1348's measurement was exact: of the six tools
added in the toolset expansion, the one that called an *annotated* API
function (`list_ready_issues -> list[IssueResponse]`) was the one that
was correct.

## Decision

**An `app/api` function returns its response schema, and its signature
says so.** Constructing the serializer-ready representation -- the
filtered, validated schema instance -- is transport-agnostic work and
belongs to the API layer. The router's `response_model=` stays (it
still drives OpenAPI and is idempotent on an already-correct object),
but it is no longer where the contract lives.

Concretely:

1. Every public undecorated function in `app/api` (the ones that exist
   specifically to be called in-process) declares a return type and
   returns that type.
2. Every API function reachable from the MCP adapter
   (`app/mcp_server/backend.py`, ADR-0007) declares
   a return type that is a response schema, a list of one, `dict`, or
   `None`.
3. The tools module never validates or launders a row itself; it only
   `.model_dump(mode="json")`s what an API function handed it. The
   `_dump`/`_rituals_dump` helpers are deleted.
4. `tests/test_api_return_contract.py` enforces 1-3 by AST and signature
   inspection (no database), and checks a representative set of
   in-process calls at runtime for the *type* of what comes back.

The remaining ~100 routed-only functions are **not** swept in this
change. The guard makes the gap visible the moment any of them gains an
in-process caller, which is the failure mode that matters; a
100-function mechanical diff would bury the review signal of the
in-process subset.

## Consequences

* An in-process caller gets, by construction, exactly what an HTTP
  client gets: filtered to the schema, enums in wire form. There is no
  rule to remember.
* Return types are visible to readers and type checkers instead of
  living in a decorator three lines up.
* Small wire-visible additions where the routed path previously
  returned a row: the four ritual attest/complete endpoints now go
  through `_build_attestation_response`, so `attested_by_name` /
  `approved_by_name` are populated (they were `null`). `list_relations`
  constructs `IssueRelationResponse` from its raw-SQL dicts, so
  `related_issue_status` is wire-form on every path, not just after the
  tools module's laundering.
* Service-layer functions still return Oxyde rows. That is correct:
  services are the security boundary (ADR-0002) and operate on
  persistence objects; the API layer is where the representation
  changes. Do not push schema construction down into services.
* Adding an API function that the tools call without a schema return
  type fails a test with a message pointing here.
* The same two-caller reasoning applies to inputs (CHT-1375). FastAPI
  `Query(...)`/`Header(...)` metadata on an API function lives in
  `Annotated[T, Query(...)]` with a real Python default, never as the
  default value itself: under dependency injection both spellings behave
  identically, but in-process a `= Query(None)` default is a live, truthy
  sentinel object that a service would happily filter on. The same guard
  test checks this, both by AST and at runtime via `inspect.signature`.
  It started scoped to the tools-reachable functions and was widened to
  every function in `app/api` in CHT-1377 (the return-contract sweep,
  CHT-1361, is the remaining half of that widening).

## Alternatives considered

* **Keep `_dump()` and enforce its use by lint** (CHT-1344 option 1).
  Cheaper, but it keeps the contract in the consumer: every future
  in-process consumer (a scheduler, a webhook) needs its own copy of the
  rule. The defect is the boundary's shape, not one caller's discipline.
* **Sweep all 133 functions now.** Correct in the limit, but the
  undecorated and tools-reachable subset is where the hazard is live;
  the rest is a follow-up the guard will point at when it matters.
* **Make services return schemas.** Rejected: services need the row
  (relations, `save()`, `refresh()`), and ADR-0002 makes them the
  enforcement layer, not the presentation layer.
* **Have the MCP transport call over HTTP like the stdio server.** A
  server looping back into itself over the network is fragile and
  doubles auth handling; the in-process design is right, it just needed
  the API layer to honour having two callers.
