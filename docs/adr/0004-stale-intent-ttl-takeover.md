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
   for staleness: older than the TTL **and** no unresolved GATE
   blockers. A stale intent is canceled in the same transaction
   (blockers resolved, `cleared_at`/`cleared_by_id` stamped by the
   taker-over, `INTENT_CANCELED` activity + broadcast — same scrub
   semantics as admin force-clear), and a fresh intent is opened for
   the new principal, who receives the actionable
   `ticket_rituals_pending` error instead of the dead-end
   `intent_in_flight`. GATE-blocked intents never expire: they are
   actionable by a human in the admin inbox and may legitimately wait
   days. `intent_ttl_minutes = 0` disables expiry.

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
* The exclusive lock is now a *lease* in effect: holders who abandon a
  failed attempt lose exclusivity after `intent_ttl_minutes`. Agents
  that intend to come back and attest later than that should either
  attest promptly or expect to re-express intent (their attestations
  still stand — attest is decoupled from the gate per ADR-0001, so a
  later re-close finds them satisfied).
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
