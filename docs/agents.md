# Connecting agent harnesses to Chaotic

Chaotic is agent-first project infrastructure (see [VISION.md](VISION.md)).
This doc covers the ways an agent harness (Claude Code, or anything else
that can shell out or speak MCP) talks to a Chaotic team/project, and
the core loop for actually working a queue of issues.

## The core loop

```bash
chaotic issue ready --json          # 1. what can I start right now?
chaotic issue start CHT-42 --json   # 2. claim it (acquires a lease)
# ... do the work ...
chaotic issue comment CHT-42 "Implemented X. Commit: abc123"
chaotic issue complete CHT-42       # 3. mark it done (or 'issue wontfix' to cancel)
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
- **Not an epic**: epics are containers for work, not work — an agent
  should never "start" one. Their sub-issues surface individually on
  their own merits.

Results are priority-sorted: `urgent` first, then `high`/`medium`/`low`/
`no_priority`, and oldest-first within each priority tier — so the top
of the list is always the single most-overdue-and-urgent thing to pick
up next.

This is the CLI's Beads-`bd-ready`-equivalent and the first command an
agent should shell out to when looking for work, before touching
`issue list`'s many filter flags. Available via the CLI as of CHT-1245;
not yet exposed as an MCP tool -- see the MCP section below.

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

**Claims are exclusive while the lease is valid.** `issue start` on a
ticket someone else holds under an unexpired lease fails with "already
claimed by X" (`already_claimed` on the wire, HTTP 409). Concurrent
claims on the same unassigned ticket are serialized server-side
(compare-and-set on the assignee slot), so of two racing `issue start`s
exactly one wins — the loser gets the same clean error, not a silent
overwrite. On that error: pick something else from `issue ready`, or
`await` the ticket if you specifically need it.

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

This works even when nothing else is touching the system: `await` polls
the team activity feed, and that read itself runs the lazy expiry sweep
server-side — the waiter's own polling is what surfaces the event. And
although `await` normally filters out your own activity, `lease_expired`
events are exempt (their `user_id` is the former holder by attribution;
the release is a system action), so an agent awaiting its *own* lease's
expiry wakes as expected.

(`chaotic mcp`'s `issue_start` tool, below, claims the same way but
doesn't yet expose a `--lease` override — CLI only for now.)

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

## MCP server (`chaotic mcp`)

The CLI ships an MCP (Model Context Protocol) server over stdio:
`chaotic mcp`. It exposes a curated set of chaotic operations as native
tools, so an MCP-speaking harness doesn't need to shell out to the CLI
at all -- it gets `issue_list`, `issue_create`, `doc_view`, etc. as
first-class tool calls with typed JSON schemas.

It's a thin adapter: no business logic lives in the MCP layer that
isn't already in `cli.client.Client`. Auth and team/project context
come from the exact same `CHAOTIC_PROFILE` / `CHAOTIC_HOME` /
`config.json` resolution the CLI itself uses -- whatever `chaotic
status` reports in the directory the harness runs from is what the MCP
server sees. There's no separate MCP login step.

### Add it to Claude Code

```bash
claude mcp add chaotic -- chaotic mcp
```

Pin a specific profile (useful when multiple agents share a
workstation, see `chaotic profile` in the CLI README) by passing it
through:

```bash
claude mcp add chaotic -- chaotic --profile myprofile mcp
```

### Generic MCP client config

Any MCP host that reads a JSON config (stdio transport) can point at
the same command:

```json
{
  "mcpServers": {
    "chaotic": {
      "command": "chaotic",
      "args": ["mcp"]
    }
  }
}
```

### Toolset

Ten tools, curated for quality over coverage:

- `issue_list`, `issue_view`, `issue_create`, `issue_update`,
  `issue_comment`, `issue_start`
- `doc_list`, `doc_view`, `doc_create`
- `activity_recent`

Every tool returns a JSON object. Failures come back as
`{"error": "..."}` -- the same shape as the CLI's `--json` error
contract -- rather than an MCP protocol-level error; a bad identifier
or missing team/project context is something the agent reads and
reacts to, not a crash.

No destructive tools (delete) are exposed. Destructive operations need
a human in the loop for now; that may change behind an explicit opt-in
flag in a future ticket. `issue_start` acquires a claim lease the same
way the CLI does (CHT-1246), but doesn't yet expose a duration
override. `issue_ready` (CHT-1245's open/unblocked/unclaimed work
query, documented above) landed CLI-side but isn't wired up as an MCP
tool yet -- a natural fast-follow ticket, not done here.

See `cli/README.md` § MCP server for the full tool list mapped to
their CLI equivalents.

## Shelling out to the CLI directly

Harnesses that would rather run the `chaotic` binary directly (no MCP
host available, or finer control over output) can use `--json` on
every read/write command for a single-JSON-value stdout contract, and
`chaotic await ...` to block on activity instead of polling. See
`cli/README.md` for both.

## Related

- [`cli/README.md`](../cli/README.md) — full command reference, `--json`
  contract, exit codes, `await`'s event schema, MCP server.
- [`docs/VISION.md`](VISION.md) — why the constraints (budgets, arrears,
  limbo, rituals) exist and how they're meant to shape agent behavior.
