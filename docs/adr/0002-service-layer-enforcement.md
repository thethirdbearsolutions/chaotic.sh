# ADR-0002: Service-layer enforcement as the security boundary

* **Status**: Accepted
* **Date**: 2026-05-10
* **Driver**: PR #178 (ritual coherence refactor) review findings
* **Amended**: 2026-09-13 (CHT-1457). See [Amendment](#amendment-2026-09-13-cht-1457) at the end

## Context

The pre-refactor codebase leaned heavily on the API layer for
enforcement. `is_agent` checks, `note_required` validation, ritual
approval-mode rules, group-selection enforcement — all lived in the
FastAPI route handlers. Service-layer methods accepted whatever the
caller passed.

The oppositional reviews on PR #178 surfaced this as a real risk: any
non-HTTP caller (background task, future webhook, internal scheduler,
test setup that bypasses the API) silently sidestepped the entire
enforcement layer. The "human-only" invariant on GATE rituals existed
as a single `if current_user.is_agent` check at the API edge.

Concretely:

* `complete_gate_ritual_for_issue` could be called by an agent if
  the caller went through the service directly.
* `attest_for_issue` and `complete_gate_ritual_for_issue` had a
  `note_required` field that the GATE complete endpoint silently
  ignored.
* `approve()` had no mode check and would overwrite the approver
  fields on an already-approved AUTO attestation.
* RANDOM_ONE / ROUND_ROBIN group selection was advisory at the
  service layer — any ritual in a group could be attested regardless
  of what the listing presented.
* Sprint-level `approve` didn't verify the ritual's trigger was
  `EVERY_SPRINT`.

Each was an API-layer guard with no service-layer counterpart.

## Decision

**Enforcement lives at the service layer. The API layer is a
translation layer, not a security boundary.**

In practice:

* Every service method that mutates state validates its preconditions
  before performing the mutation, regardless of caller.
* Validation helpers are explicit, named, and reusable:
  `_validate_note`, `_validate_not_agent_for_gate`,
  `_validate_conditions_match`, `_validate_group_selection`,
  `_validate_approve_mode_and_pending`.
* API endpoints translate HTTP requests to service calls and
  translate service exceptions to HTTP responses. They do **not**
  encode rules that the service layer would otherwise miss.

## Consequences

**Defense in depth.** API-layer checks for things like
`current_user.is_agent` still exist for clarity and good error
messages, but they are no longer the only line of defense. A
background task that picks up a job and calls
`RitualService.complete_gate_ritual_for_issue(ritual, issue_id,
agent_user.id)` will fail at the service layer with a clear error
rather than silently violating the human-only invariant.

**Testing principle.** Every API test should have a paired
service-layer test asserting the same invariant. New tests in
`backend/tests/test_ritual_invariants.py` follow this rule for the
ritual code. Going forward, when adding a guard, add both: API for
the right status code and message, service for the durable invariant.

**Idempotent helpers.** Validation helpers raise `ValueError` with a
clear message. API handlers catch and translate to 4xx; non-HTTP
callers see the exception directly. This is intentional — service
exceptions carry the invariant name in their message, so a stack
trace in a background-job log surfaces the failed invariant
immediately.

**Performance.** Service-layer enforcement adds a few DB round-trips
on the happy path (e.g. loading the user to check `is_agent`). The
trade-off is acceptable: the cost is bounded, and the correctness
guarantee is no longer "depends on the caller doing the right
thing."

## Alternatives considered

* **Keep enforcement at the API layer; document that service methods
  trust callers.** Rejected: that's what we had, and it's the source
  of the bugs this review surfaced. The trust-the-caller contract is
  brittle and silently bypassable.
* **Defer to DB-level constraints where possible.** Adopted in part —
  the partial UNIQUE index on `ticket_limbo` is the DB version of
  the exclusive intent lock. But many invariants (note_required,
  is_agent, conditions, group selection) aren't expressible as DB
  constraints. Service-layer code is the natural home for those.
* **A separate "policy" layer between API and service.** Considered.
  Rejected as YAGNI for a project this size; one more boundary to
  cross with no clear ownership story.

## Status & follow-ups

* The pattern is established in `RitualService`. Other services
  (issues, sprints, documents) likely have similar holes. Worth a
  one-pass audit when convenient — file a follow-up if you find
  one.
* The `foreign_keys=OFF` Oxyde default means parent-table `delete()`
  methods need explicit child cleanup. Same blast radius: every
  `delete()` is a candidate for "is the cascade I expect actually
  firing?" Not a service-layer enforcement issue per se, but the
  same "don't trust the substrate" principle applies.

## Amendment (2026-09-13, CHT-1457)

ADRs are append-only, so the text above is unchanged. Two parts of it no longer match the code.

### 1. Access control never moved to the service layer

The Decision reads as covering all enforcement. What PR #178 actually moved to the service layer was **ritual and gate invariants** (`RitualService`, and later the human-and-interactive gate exemption, CHT-1302).

**Authorization did not move.** Whether a principal may act on a team or project is enforced above the service layer, in two separately maintained places. On `main` at 65a1426:

- `backend/app/api/` makes **95** `await check_user_team_access(...)` / `await check_user_project_access(...)` calls.
- `backend/app/mcp_server/scope.py` (`resolve_team`, `resolve_project`) **reimplements the equivalent checks by hand** for the remote MCP transport, comparing `agent_team_id` / `agent_project_id` and calling `TeamService().get_user_teams(...)`. It mentions the two API functions only in its docstring and calls neither.
- `backend/app/services/` makes **no** such calls, and many service write methods don't receive the acting principal at all.

So **for access control, the API and MCP layers are the security boundary today**:

- a non-HTTP caller that goes straight to services would bypass it, which is the exact risk this ADR was written about;
- the two hand-maintained copies can drift, the same class of risk.

The "other services likely have similar holes" follow-up below applies here.

Read the Decision as the **target for all enforcement**. Today it's met for ritual and gate invariants, not for access control. The plan to close the gap without threading the principal through every service signature is tracked in CHT-1439: one authorization path used by both `app.api` and the MCP scope resolution, and service write methods that refuse to run without an authenticated actor context.

### 2. The `foreign_keys` follow-up is stale, and the hazard is the reverse

The last follow-up says Oxyde defaults to `foreign_keys=OFF`, so `delete()` methods need explicit child cleanup. **That's wrong:**

- `PRAGMA foreign_keys` is ON on every connection (CHT-1341);
- `test_foreign_keys_pragma_is_on` in `backend/tests/test_infrastructure.py` pins it;
- the schema's `ON DELETE CASCADE` rules fire.

"Don't trust the substrate" still applies, pointed the other way: **some cascades delete more than intended.** Deleting a user or agent removes the issues, comments, documents, and activity it authored (CHT-1427).
