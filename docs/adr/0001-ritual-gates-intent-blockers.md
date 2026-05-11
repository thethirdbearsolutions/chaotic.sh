# ADR-0001: Ritual gates — intent + blockers state machine

* **Status**: Accepted
* **Date**: 2026-05-10
* **Driver**: PR #178 (ritual coherence refactor)

## Context

Chaotic's vision is "agent-first, supervised-autonomy" — agents do
work; rituals are the human-in-the-loop gate between work and
"committed" state transitions like claiming or closing a ticket. The
pre-refactor model encoded this with `OxydeTicketLimbo`, one row per
pending ritual blocking a ticket, plus a separate `OxydeRitualAttestation`
table.

A 38-finding oppositional review surfaced structural confusion. The
most consequential problems:

* **Two pending-tracking mechanisms.** `GATE` rituals created limbo
  rows; `REVIEW` rituals' pending state was reconstructed from the
  attestation table by scanning for `approved_at IS NULL`. Fragile
  coupling, two code paths for the same conceptual question.
* **Schema couldn't represent "multi-ritual gate on one intent."** A
  ticket could be blocked by 2+ rituals; the pre-refactor schema
  needed one limbo row per ritual, but the natural exclusive-lock
  semantic is one open intent per `(issue, type)`. The two were
  unreconcilable under a single table.
* **Service-layer holes.** GATE enforcement lived only at the API
  layer (`is_agent` check). `note_required` was bypassed by GATE
  completion paths. `approve()` had no mode check and could overwrite
  AUTO attestation rows.
* **Observability gaps.** Approval emitted no activity. Sprint-level
  events didn't broadcast. The state machine was largely invisible to
  the activity feed.
* **No primitive for the supervised-autonomy story.** Agents had no
  way to express intent that survived the failure of an immediate
  transition — they got an error back, no durable record of
  "this agent wanted to claim this ticket."

The vision asks for an agent-first state machine where the human
controls the environment and the agent navigates it. The pre-refactor
shape couldn't express that cleanly.

## Decision

Two-table model with a primary "intent" parent and a per-blocker child:

* `ticket_limbo` — **one row per open intent** on a ticket. Columns:
  `issue_id`, `limbo_type` (CLAIM or CLOSE), `requested_by_id`,
  `requested_at`, `cleared_at`, `cleared_by_id`. A partial UNIQUE
  index on `(issue_id, limbo_type) WHERE cleared_at IS NULL` enforces
  the **exclusive intent lock** at the DB level.
* `ticket_limbo_blockers` — **one row per ritual blocking the
  intent**. Columns: `limbo_id` (FK to parent intent), `ritual_id`,
  `resolved_at`, `resolved_by_id`. UNIQUE on `(limbo_id, ritual_id)`
  prevents duplicate audit rows.

Lifecycle:

1. **Intent open** — agent calls `IssueService.update(status=...)`.
   `_check_*_rituals` finds pending rituals; if any, opens one
   `ticket_limbo` row + N blocker rows in a single `async with
   atomic():`. Emits `INTENT_OPENED` activity + WS broadcast.
2. **Blocker resolution** — ritual gets attested (AUTO/REVIEW) or
   completed (GATE) or approved (REVIEW). The corresponding blocker
   row's `resolved_at` is stamped. Emits `RITUAL_ATTESTED` /
   `RITUAL_APPROVED` activity + broadcast.
3. **Intent clear** — when the last unresolved blocker for an intent
   resolves, the parent intent's `cleared_at` is stamped and the
   requested status transition fires automatically (one-step). Emits
   `INTENT_CLEARED` activity + broadcast.
4. **Force-clear** — admin scrubs an open intent. Emits
   `INTENT_CANCELED`; user must re-attempt.

## Consequences

**Behavioral:**

* **Exclusive intent lock per `(issue, type)`** is enforced at the DB
  layer (partial UNIQUE) and re-checked at the app layer via
  `_enforce_exclusive_intent_lock`. Concurrent claimants race-safely
  via `atomic()` + `IntegrityError` recovery — the loser raises
  `IntentInFlightError` (HTTP 409) instead of corrupting the state
  machine.
* **One-step auto-transition.** When the last blocker resolves, the
  status update the agent originally requested fires automatically —
  no re-attempt needed. This is the supervised-autonomy primitive:
  agent expresses intent → environment locks → human gates → agent
  resumes without needing to know the protocol.
* **Attest is decoupled from the gate.** `TICKET_CLAIM` /
  `TICKET_CLOSE` trigger names are scheduling and listing metadata,
  not attest-time enforcement. An attestation can be recorded in any
  issue status (retroactive record-keeping; close-by-mistake
  recovery). The gate fires at the actual status transition, not at
  attest time.
* **AUTO standalone attest creates an audit-only intent.** For
  state-machine uniformity, attesting an AUTO ritual without prior
  intent expression creates and clears an intent row in one atomic
  block. It's invisible to peers and never fires a status transition
  — the agent never expressed intent to claim/close, just to attest.
* **Activity events are the observability primitive.** Four new
  `ActivityType` values (`INTENT_OPENED`, `INTENT_CLEARED`,
  `INTENT_CANCELED`, `RITUAL_APPROVED`) emit `OxydeIssueActivity`
  rows + WebSocket broadcasts. Broadcasts are hoisted outside
  transactions so subscribers never see uncommitted state. The
  future `chaotic await` CLI primitive is designed to wake on these.

**Code shape:**

* `RitualService._clear_ticket_limbo` takes the `OxydeRitual` object
  directly (callers always have it in scope) and is scoped by
  `ritual.trigger` — a CLAIM ritual's blockers only resolve under
  CLAIM intents, never CLOSE.
* `IssueService._open_intent_with_limbo` is the single intent-open
  path; `_check_ticket_rituals` and `_check_claim_rituals` both
  delegate to it.
* Pending rituals fall into one of three approval modes
  (`ApprovalMode.AUTO` / `REVIEW` / `GATE`); the lifecycle is the
  same for all three.

**Migrations:**

* `0004_ritual_intent_unique_indexes.py` — adds the partial UNIQUE
  indexes that 0005 depends on, with idempotent dedup of any
  pre-existing duplicate rows.
* `0005_ticket_limbo_intent_blockers.py` — splits the table into the
  intent + blockers shape. Uses the portable 12-step rebuild pattern
  (CREATE _new / INSERT / DROP / RENAME) with `PRAGMA foreign_keys =
  OFF` toggling and a `foreign_key_check` validation post-rebuild.
  Distinguishes open vs closed rows in the dedup so historical close
  events aren't buried under a single canonical row. `downgrade()`
  is explicitly documented as "approximate reconstruction" — restore
  from backup if you need byte-exact recovery.

## Alternatives considered

* **Per-ritual rows with looser UNIQUE.** Keep `ticket_limbo` flat,
  drop the `(issue_id, limbo_type)` UNIQUE in favor of
  `(issue_id, limbo_type, ritual_id)`. Rejected: the natural
  exclusive-lock semantic ("one open intent per ticket per type") is
  awkward to enforce — you'd be doing it purely at the app layer
  with no DB invariant, and the data model doesn't surface the
  intent-as-a-thing concept.
* **Child-table-only, no parent.** Keep just `ticket_limbo_blockers`,
  derive intent state from the set of open blockers. Rejected: no
  natural place to record per-intent metadata (requester, intent-open
  timestamp, cleared-by) without bolting it onto every blocker row.
* **Two-step transition** (clear → require re-attempt). Rejected:
  pushes protocol knowledge into the agent. The whole point of the
  intent primitive is to be the durable record of "agent wants this
  to happen when blockers clear" — fulfilling that intent
  automatically is the supervised-autonomy story.
* **Explicit rejection state in the data model** (e.g. a `rejected_at`
  on attestations, or a `rejection_reason` on intents). Deferred —
  current REVIEW workflow doesn't have a "reject and send back"
  feature; attest-again is the implicit path. Adding rejection
  semantics later is straightforward without breaking this shape.

## Status & follow-ups

* Issues #179, #180, #181 capture the items deferred from PR #178:
  test semantics drift, frontend rendering of new ActivityType
  values, Oxyde `atomic()` isolation verification.
* The future `chaotic await` CLI (separate branch
  `claude/chaotic-await-cli-36tye`) consumes `INTENT_OPENED` /
  `INTENT_CLEARED` / `INTENT_CANCELED` / `RITUAL_APPROVED` events as
  its wake primitive.
