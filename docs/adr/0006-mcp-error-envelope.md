# ADR-0006: One MCP error envelope on both transports

* **Status**: Accepted
* **Date**: 2026-09-05
* **Driver**: CHT-1350 (same tool, same failure, different shape per
  transport), surfaced by the oppositional review of PR #262

## Context

Both MCP servers promise in their `instructions` that failures come back
as `{"error": "..."}`, a string. Neither kept it consistently:

* The HTTP transport's `_boundary` forwarded `HTTPException.detail`
  verbatim. Governance refusals (`sprint_in_arrears`,
  `claim_rituals_pending`, ...) carry a structured dict, so those came
  back as `{"error": {...}}` with an `error_code` and the pending-ritual
  list, while every other failure was a string.
* The stdio transport flattened the same server detail through the CLI's
  `_format_error` into one sentence, losing `error_code` and the
  structure but keeping the human remediation text.

An agent that switches on `error_code` works on one transport; an agent
that string-matches `result["error"]` works on the other. Nothing tested
the payload's type, which is how it drifted. `sprint_add`'s per-item
`failed[].error` had the same split.

Three options were on the table (CHT-1350): normalise to a string
everywhere (loses the structure that made arrears diagnosable), normalise
to a dict everywhere (richest, changes stdio's shape), or always
`{"error": {"message": str, ...}}` (one shape, string always present,
structure additive).

## Decision

**Every MCP tool failure, on both transports, is
`{"error": {"message": <str>, "error_code"?: <str>, ...}}`.**

* `message` is always present and always a sentence. It is the server's
  own `message` when the detail carries one (every governance error does,
  and a test pins that), the `<field>: <msg>` rendering for validation
  errors on both transports, the detail string for plain HTTP errors, and
  the CLI's rendering (stdio) or a generic "Request failed (...)"
  sentence (HTTP) for a structured detail with no `message` -- a path no
  server error takes today.
* `error_code` is present whenever the failure has a stable name. Server
  codes pass through unchanged (`sprint_in_arrears`, `ticket_rituals_pending`,
  `claim_rituals_pending`, `intent_in_flight`, ...). The boundaries add
  their own for local failures: `tool_input` (bad arguments or missing
  team/project context), `validation_error`, `connect_error`,
  `timeout`, `network_error`, `unexpected`.
* Everything else in the server's detail is carried through additively
  (`pending_rituals`, `arrears_by`, `budget`, ...), plus `http_status`
  when the failure came from an HTTP response or would have been one
  (in-process validation errors report 422 like their REST twin).
* `sprint_add`/`sprint_remove` `failed[].error` uses the same inner dict.
* The CLI's `--json` mode keeps its flat `{"error": "<str>"}`. That
  contract serves shells and exit codes; this one serves models. They are
  different consumers and the ticket's "same shape as the CLI" framing
  was the mistake.

The shape is pinned in `RESPONSE_SHAPES["error_envelope"]` on both
transports and asserted against `docs/mcp-toolset-schema.json` by both
sync tests, alongside the compact-row projection from CHT-1370. The
`APIError` the CLI client raises now carries the raw server `detail` so
the stdio boundary can forward structure without re-parsing prose.

## Consequences

* Breaking on both transports for anything that read `result["error"]`
  as a string. Deliberate and one-time; the alternative was living with
  two contracts. Both servers' `instructions` and `docs/agents.md` state
  the new shape.
* An agent can now do `if err.get("error_code") == "sprint_in_arrears"`
  on either transport and read `err["message"]` for what to do.
* Future structured errors need only add fields to the server's detail
  dict; the boundaries pass them through.

## Alternatives considered

* **String everywhere.** Honours the old prose contract but discards the
  structure that made governance refusals actionable. Rejected.
* **Dict-or-string depending on the failure.** The status quo on HTTP;
  forces every caller to type-check. Rejected.
* **Fix only the stdio side to match HTTP's mixed shape.** Consistent but
  consistently bad. Rejected.
