# Working as an agent in Chaotic

This is the operating guide for an agent (or an agent harness) using
`chaotic` as its task queue. For full command syntax and flags see
[`cli/README.md`](../cli/README.md); for the philosophy behind the
constraints (budgets, arrears, limbo, rituals) see
[`docs/VISION.md`](VISION.md). This doc is the "what do I actually run,
in what order" answer.

## The core loop

```bash
chaotic issue ready --json          # 1. what can I start right now?
chaotic issue start CHT-42 --json   # 2. claim it (acquires a lease)
# ... do the work ...
chaotic issue comment CHT-42 "Implemented X. Commit: abc123"
chaotic issue complete CHT-42       # 3. mark it done (or 'issue close' to cancel)
```

Repeat. `--json` on every step: stdout carries exactly one JSON value,
everything else (status lines, tables) goes to stderr — see cli/README's
[JSON output](../cli/README.md#json-output) section for the full
contract (exit codes, confirmation handling, error shape).

## `issue ready`: what can I start right now

```bash
chaotic issue ready --json                       # unassigned, unblocked, open work
chaotic issue ready --mine --json                # work already assigned to me
chaotic issue ready --include-assigned --json    # widen: include others' claims too
chaotic issue ready --all-projects --json        # team-wide instead of current project
```

An issue is "ready" when all of the following hold:

- **Open and not started**: status is `backlog` or `todo`. Anything
  `in_progress`, `in_review`, `done`, or `canceled` is excluded.
- **Unassigned** (the default) — pass `--mine` to see your own
  assigned-but-not-started backlog instead, or `--include-assigned` to
  widen the query to every assignee.
- **Unblocked**: no unresolved `blocks` relation. If issue B is blocked
  by issue A, B doesn't show up in `ready` until A reaches `done` or
  `canceled`.

Results are priority-sorted: `urgent` first, then `high`/`medium`/`low`/
`no_priority`, and oldest-first within each priority tier — so the top
of the list is always the single most-overdue-and-urgent thing to pick
up next.

This is the CLI's Beads-`bd-ready`-equivalent and the first command an
agent should shell out to when looking for work, before touching
`issue list`'s many filter flags.

## Claim leases

`issue start` (alias: `issue claim`) doesn't just set status and
assignee — it also acquires a **claim lease**, a server-side expiry
timestamp. This exists because agents crash: a process that dies mid-task
used to leave its ticket wedged in `in_progress`, assigned to a
principal that will never touch it again, invisible to `issue ready`
forever.

```bash
chaotic issue start CHT-42                 # default lease (server-configured, ~2h)
chaotic issue start CHT-42 --lease 4h      # override for a task you know will run long
chaotic issue start CHT-42                 # re-run while you still hold it: heartbeat,
                                            # extends the lease instead of erroring
```

Duration accepts the same shorthand as `chaotic await --timeout`: bare
seconds (`1800`), or unit suffixes (`30m`, `4h`, `1d`, `1h30m`).

**If your task runs long, keep re-claiming.** Re-running `issue start`
(or `issue claim`) on a ticket you already hold extends the lease --
that's the heartbeat. There's no separate "renew" command; claiming is
idempotent and self-healing by design.

**If the lease expires while the issue is still `in_progress`**, the
next time *anyone* reads or lists that issue (a `ready` query, `issue
show`, `issue list`, the web UI polling) it's lazily released: status
reverts to `todo`, the assignee is cleared, and a `lease_expired`
activity is recorded on the ticket — loud, not silent. There's no cron
job doing this; it's a side effect of the read path, the same way
`chaotic sprint close`'s orphaned-limbo cleanup works. A crashed agent's
work becomes pickable-up-again automatically, without a human having to
notice and manually reset it.

You can wake on this event with `await`:

```bash
chaotic await issue CHT-42 --type lease_expired --json
```

## Putting it together: a harness loop

```bash
while true; do
  next=$(chaotic issue ready --mine --limit 1 --json)
  if [ "$next" = "[]" ]; then
    next=$(chaotic issue ready --limit 1 --json)
    [ "$next" = "[]" ] && break   # nothing left to do
    id=$(echo "$next" | jq -r '.[0].identifier')
    chaotic issue start "$id" --lease 2h --json
  else
    id=$(echo "$next" | jq -r '.[0].identifier')
  fi

  # ... do the work for $id ...

  chaotic issue comment "$id" "Done. Commit: $(git rev-parse HEAD)"
  chaotic issue complete "$id"
done
```

`chaotic issue ready --mine` first means: if you already hold a claim
(e.g. the harness restarted mid-task, or a lease got extended by a
heartbeat elsewhere), resume that instead of grabbing something new.

## Related

- [`cli/README.md`](../cli/README.md) — full command reference, `--json`
  contract, exit codes, `await`'s event schema.
- [`docs/VISION.md`](VISION.md) — why the constraints (budgets, arrears,
  limbo, rituals) exist and how they're meant to shape agent behavior.
