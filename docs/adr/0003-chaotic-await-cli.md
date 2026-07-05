# ADR-0003: `chaotic await` — agent-harness blocking primitive

* **Status**: Accepted
* **Date**: 2026-05-10
* **Driver**: PR #183 (initial implementation), built on the
  observability surface from PR #178

## Context

Chaotic's vision is "agent-first project infrastructure with
supervised autonomy." The core agent loop wants to:

1. Do work
2. Hit a gate (human review, ritual attestation, etc.)
3. Yield back to the environment until the gate clears
4. Resume

Step 3 is the missing primitive. Without it, agents either:

* Busy-poll Chaotic themselves, each reinventing the wheel and
  hammering the API.
* Exit and rely on a wrapper (cron, daemon) to re-spawn them — losing
  the in-progress context.
* Stay running and burn tokens watching for activity that may never
  come.

PR #178 added the observability events (`INTENT_OPENED`,
`INTENT_CLEARED`, `INTENT_CANCELED`, `RITUAL_APPROVED`) the gate
lifecycle needs. The CLI side — a single command an agent harness can
shell out to and treat as a blocking operation — was the missing
piece.

## Decision

`chaotic await` is a CLI command that **blocks the calling process
until a matching activity event arrives, then exits 0 with the event
on stdout** (or exits 124 on timeout, 130 on SIGINT, etc.).

The command tree mirrors top-level chaotic groups:

* Singular subcommands (`issue ID`, `doc ID`, `ritual NAME`) target a
  specific entity.
* Plural subcommands (`issues`, `docs`, `rituals`) take collection
  filters.
* Scope-only subcommands (`project [ID]`, `sprint [ID]`, `team [ID]`)
  default to the configured current scope.

Five flags are shared by every subcommand: `--type`,
`--include-self`, `--timeout`, `--json`, `--until CMD`.

## Consequences

### Polling as the MVP transport

The MVP polls `/issues/activities?team_id=X[&project_id=Y]` (the
existing team feed). The CLI contract is **transport-agnostic** so a
later WebSocket implementation can swap underneath without changing
the user surface.

To be precise: transport-agnosticism is a property of the *contract*
(flags, exit codes, output shape), not a code seam. There is no
`Transport` abstraction in the implementation — a WebSocket version
replaces the polling internals of `_poll` wholesale. Deliberate: an
abstraction serving a single implementation is speculation, and the
public contract is the only thing a swap must preserve.

### Logical type-token vocabulary

`--type` accepts CLI-stable logical names (`commented`, `attested`,
`approved`, `intent_opened`, …) mapped to backend wire values via
`TYPE_TOKEN_TO_WIRE`. Cross-entity tokens include both issue and
document variants, so `await project --type commented` wakes on
either kind.

This decouples the CLI from backend enum renames: a future refactor
that renames `ritual_attested` → `gate_attested` updates the value
list under the existing `attested` token without breaking harness
scripts.

### `--include-self` defaults to OFF

The agent-harness use case is **a long-running agent that backgrounds
`chaotic await` and keeps doing work**. Every comment, status change,
or attestation the agent makes during that work would otherwise
self-trigger the wait — turning every action into "wake immediately,
loop forever." Defaulting OFF avoids the footgun. Interactive humans
who want to see their own activity opt in via `--include-self`.

### `--until` predicate contract

`--until CMD` runs CMD via `sh -c` with the candidate event JSON
piped to stdin. This deliberately:

* **Uses shell** — so common predicates (`jq -e ".new_value ==
  \"in_review\""`) just work.
* **Pipes events on stdin, never interpolates into CMD** — adversarial
  event values (e.g. an issue title containing shell metacharacters)
  cannot inject commands.
* **Discards predicate stdout/stderr** — preserves `await`'s own
  stdout contract.
* **Treats exit codes 126/127 as `PredicateExecutionError`** (fatal exit 1
  with a clear message), distinct from "predicate rejected this
  event" (a normal non-zero exit). Without this, a missing `jq`
  binary would cause silent forever-polling.

A configurable `--until-timeout` flag is NOT in the MVP, but a single
predicate run is hard-capped at 30 seconds (killed and treated as a
broken predicate, exit 1). A wedged predicate would otherwise block
the poll loop indefinitely, out of reach of the outer `--timeout`,
which is only checked between fetches. Add the flag later if 30s
proves wrong for someone.

### Single-shot by design

There is no `--follow` / tail mode. The agent harness loops by
re-invoking `await` after each wake. This keeps the binary small,
the contract obvious (process exits === event matched), and pushes
the loop coordination into the harness where it belongs.

### Watermark / deadline decoupling

Internally, the watermark ("what counts as a new event") is set at
command start. The deadline ("when to give up") is wall-clock
relative, not watermark-relative. They happen at the same instant in
production but are conceptually separate — separating them lets
tests pass synthetic historic watermarks without waiting real time
for the deadline to fire.

This also future-proofs `--since` / cursor-based resume (deferred
out of MVP): a watermark from before deadline-now is the resume
case, and the loop should still run for the full configured
timeout.

### Output contract

`--json`: exactly one JSON object followed by `\n` on stdout. All
other output (errors, retry chatter) goes to stderr. Harness scripts
can `json.loads(stdout)` without stripping. Rendered (non-JSON)
output is one human-readable line and is documented as **unstable**
— it's for human eyes, not parsing.

### Retry policy

Transient errors (network/timeout family, HTTP 5xx, 429) trigger
exponential backoff (1/2/4/8/16/30s cap, ±25% jitter so concurrent
waiters don't synchronize), retried indefinitely while the configured
`--timeout` (if any) has not expired. A 2-second VPN blip shouldn't
kill a multi-hour wait. The transient set is an explicit allowlist:
misconfiguration (bad URL, unsupported scheme, decode errors) and
auth/perm failures (401/403/404) fail loud with exit 1 — they won't
self-heal, and hours of silent backoff would be the worst UX for a
typo.

## Alternatives considered

* **WebSocket transport in the MVP.** `/ws` exists server-side. We
  chose polling because: (a) it's simpler, (b) the server-side
  broadcast surface needed expanding (PR #178 added the new
  ActivityType values), (c) the CLI contract works either way and
  the transport can swap later without API change. Polling is also
  a known-good fallback if the WS connection drops.
* **Raw backend enum values for `--type`.** Rejected: couples the
  CLI to backend internals. The first time someone renames an enum,
  every harness script breaks. Logical tokens give us one indirection
  layer for cheap.
* **`--follow` / tail mode for streaming use cases.** Rejected for
  MVP: scope creep. The primary user is an agent harness that wants
  one event at a time. If a streaming-tail use case shows up, it can
  ship as a separate command (`chaotic watch`) without confusing
  the await contract.
* **Default `--include-self` ON** (so interactive use "just works").
  Rejected: the primary user is the agent harness; the agent
  footgun (every self-action self-triggers) is more dangerous than
  the human inconvenience (one extra flag to see your own edits).
* **`--until` as a Python expression / DSL** instead of a shell
  command. Rejected: shell + jq is the lingua franca of CLI
  composition; a custom DSL would invent vocabulary nobody knows
  and lose all the existing tooling.
* **Resume / watermark-on-exit** for crash-recoverable harnesses.
  Deferred (YAGNI). The current model loses any events that land
  between agent crash and restart; in practice the next event or
  a state re-fetch catches the agent up. Add later if the gap shows
  up.

### Scaling ceiling: the poll storm

Single-shot polling is sized for the current reality (a handful of
concurrent agents). At ~50 agents each polling every 5s, that's
~10 RPS of near-identical team-feed queries — not catastrophic, but
wasteful, and the fix (a shared per-host poller or server-side push
fanning out to N waiters) breaks the fork-and-forget process model.
The deliberate call: ship single-shot now, and when the poll storm
materializes, add a daemon (`chaotic awaitd`) and make `chaotic
await` a thin client to it. Harness-facing contract stays identical.

## Status & follow-ups

* Implementation: PR #183.
* Backend events the CLI consumes: PR #178 / ADR-0001.
* Known limitations documented in `cli/README.md` § Await § "Notes
  for harness authors": no `--follow`, no resume after crash, no
  configurable `--until` predicate timeout (fixed 30s ceiling).
* Future: `chaotic awaitd` shared poller if concurrent-waiter volume
  makes per-process polling expensive (see "Scaling ceiling").
