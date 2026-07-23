# ADR-0004: Stale-intent TTL + takeover, and inline attestation

* **Status**: Accepted
* **Date**: 2026-07-23
* **Driver**: CHT-1326 (stranded CLOSE intents permanently blocking
  tickets)

## Context

ADR-0001's unified intent+limbo model enforces an **exclusive intent
lock** per `(issue, type)`: while an intent is open, any claim/close
attempt by a different principal fails with `IntentInFlightError`
("wait for the open intent to clear or be cancelled").

Two facts combined into a trap:

1. **Every open intent's initiating request failed by construction.**
   `_open_intent_with_limbo` only creates the row when pending rituals
   block the transition, then raises. The intent is a durable record of
   "I want this transition once the blockers clear" — the
   supervised-autonomy primitive.
2. **Non-interactive clients had no way to clear the blockers.** A
   close via MCP `issue_update {status: "done"}` (or the CLI in a
   non-tty) on a ticket whose close rituals have `note_required` could
   not supply attestation notes on that path. The intent stayed open
   with `attestation: null` forever, and there was **no
   cancel/expire/resume surface** anywhere — no CLI command, no MCP
   tool, no inbox item (the admin `force-clear-ticket-limbo` endpoint
   existed but had no client surface).

Net effect (hit live on AIO-114/AIO-115): one failed API close made a
ticket permanently unclosable from automation, by anyone. With
agent-driven ticket hygiene as a primary usage mode, the close path was
a one-shot trap.

## Decision

Three complementary changes, none of which weakens the gate itself
(rituals still must be satisfied; notes are still required):

1. **Stale-intent TTL with takeover** (server,
   `intent_ttl_minutes`, default 15). When a claim/close finds an open
   intent owned by a *different* principal, the intent is now checked
   for staleness. Stale means ALL of:

   * older than the TTL, measured from its freshness stamp
     (`requested_at`) — and the stamp is **renewable**: a
     same-principal re-attempt or any blocker progress (an attest
     resolving one of several blockers) bumps it, so an actively
     working initiator can never be expired mid-flight (PR #261
     review);
   * no unresolved GATE blockers — those are actionable by a human in
     the admin inbox and may legitimately wait days;
   * no unresolved blockers whose ritual is already attested and
     awaiting REVIEW approval — the initiator DID come back and
     attest; the remaining wait is the admin's, not theirs (PR #261
     review).

   A stale intent is canceled in the same transaction: blockers
   scrubbed (`resolved_at` stamped, `resolved_by_id` left NULL — the
   taker never satisfied those rituals; the parent's `cleared_by_id`
   identifies the taker), `INTENT_CANCELED` activity recorded with the
   displaced initiator in `old_value`, and a post-commit broadcast
   carrying `intent_initiator_id` (parity with admin force-clear). A
   fresh intent is then opened for the new principal, who receives the
   actionable `ticket_rituals_pending` error instead of the dead-end
   `intent_in_flight`. `intent_ttl_minutes = 0` disables expiry.

2. **Same-principal resume** (pre-existing behavior, now a tested
   contract). The initiator retrying is never blocked by their own
   intent — they get the pending-rituals error again, with the intent
   reused and any newly-added rituals attached as blockers.

3. **Inline attestation surface** (client + both MCP transports).
   `chaotic issue close/complete/claim/start/update --attest
   'ritual-name:note'` (repeatable, per-ritual notes) and an `attest`
   map parameter (`{"ritual": "note"}`) on the `issue_update` MCP tool.
   Attestations are applied *before* the status change, so a
   non-interactive close of a note-required-ritual ticket satisfies
   the gate up front and never opens an intent it cannot attest. AUTO/
   REVIEW rituals route through the attest endpoint; GATE rituals
   route through gate completion (human-only, server-enforced). This
   differs from `--unceremoniously-attest-all-rituals` in being
   deliberate and per-ritual — each ritual is named and answered
   individually, preserving the honest-attestation doctrine of
   `docs/agents.md`.

## Consequences

* The stranded intents already in production (a dozen across projects)
  self-heal: the next claim/close attempt by any other principal after
  the TTL cancels and replaces them. No data surgery needed.
* `INTENT_CANCELED` is now emitted by a non-admin path. Consumers of
  the activity feed / `chaotic await` see takeovers explicitly, with
  `user_id` = the taker-over.
* The exclusive lock is now a *renewable lease*: holders who abandon a
  failed attempt lose exclusivity after `intent_ttl_minutes`, but any
  re-attempt or attest renews it. Only a holder with zero activity for
  the full TTL — the stranded-automation case — can be displaced.
  Displaced holders' attestations still stand (attest is decoupled
  from the gate per ADR-0001), so a later re-close finds them
  satisfied.
* Open question (follow-up ticket): whether agent principals should be
  able to take over a *human's* stale intent, or whether takeover of
  human intents should require a human/admin requester. Current
  behavior: any team member, agent included, can take over once the
  intent is genuinely stale; the renewable lease + GATE/REVIEW-pending
  exemptions bound the damage.
* A same-moment race between two principals on a stale intent is
  serialized by the existing `atomic()` + partial-UNIQUE machinery;
  the loser still gets `IntentInFlightError` against the *fresh*
  intent, which is correct (it is genuinely live).

## Alternatives considered

* **Roll the intent back when the initiating request fails.** Rejected:
  the durable intent is the supervised-autonomy primitive (ADR-0001's
  one-step auto-transition and the GATE inbox flow depend on it).
  Rolling back for AUTO-ritual tickets would kill "attest later →
  ticket closes itself".
* **TTL on all intents including GATE.** Rejected: gate approval is a
  human loop measured in hours/days; expiring it would re-open the
  ticket to takeover while an admin is mid-review, and the inbox item
  would dangle.
* **Only add the attestation params, no TTL.** Rejected: fixes new
  attempts but leaves every already-stranded ticket dead, and any
  future client that forgets the params re-arms the trap.
* **Cancel-intent CLI/MCP command instead of automatic expiry.**
  Deferred, not conflicting: an explicit `issue intent cancel` surface
  (and inbox rendering of open intents) is still worth having; the TTL
  covers the unattended-automation case, which is the one that
  strands.
