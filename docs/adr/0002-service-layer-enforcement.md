# ADR-0002: Service-layer enforcement as the security boundary

* **Status**: Accepted
* **Date**: 2026-05-10
* **Driver**: PR #178 (ritual coherence refactor) review findings

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
