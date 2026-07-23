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

Eleven tools, curated for quality over coverage:

- `issue_list`, `issue_view`, `issue_create`, `issue_update`,
  `issue_comment`, `issue_start`
- `doc_list`, `doc_view`, `doc_create`
- `activity_recent`
- `project_list` (enumerate the team's projects -- every other tool
  filters by project, this one tells you which projects exist)

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

## Remote MCP (Streamable HTTP, `/mcp`)

If you'd rather point a *hosted* client at your chaotic instance instead
of running `chaotic mcp` as a local subprocess -- claude.ai's custom
connectors, Claude Code web, or Claude Code CLI's `--transport http` --
the backend also speaks MCP directly over Streamable HTTP at `/mcp`.
Same 11 tools, same names (see Toolset below); six of them
(`issue_list`, `issue_create`, `doc_list`, `doc_create`,
`activity_recent`, `project_list`) additionally accept an optional
`team` parameter,
because a hosted server has no single active profile to inherit context
from -- see "Auth and scoping" below.

**Auth v1 is API-key only.** There's no OAuth flow yet (dynamic client
registration + the paste-a-URL-and-authorize connector UX is tracked
separately, CHT-1266's follow-up); an existing `ck_...` API key is
sufficient. Create one with:

```bash
chaotic auth keys create "claude.ai connector" --expires-in 90d
```

`--expires-in` (e.g. `90d`, `12h`) is optional -- omit it for a
non-expiring key -- but recommended for any key that leaves your
machine. An expired key gets the same 401 as an invalid one.

### Connecting Claude Code (`--transport http`)

```bash
claude mcp add --transport http chaotic https://your-chaotic-host/mcp \
  --header "Authorization: Bearer ck_..."
```

### Connecting claude.ai's web custom-connector UI (capability URL)

As of when this was written, claude.ai's web "Add custom connector"
dialog takes a server URL plus, in Advanced settings, an OAuth client
id/secret pair -- there's no field for a Bearer token or a custom
header (confirmed against the current Claude Help Center docs and a
still-open upstream feature request, anthropics/claude-ai-mcp#112;
Claude Code, both CLI and web, does support `--header` / custom
headers, so prefer the header mode above there). Since the box only
takes a URL, put the key directly in the path instead:

```
https://your-chaotic-host/mcp/ck_...
```

Paste that into the connector's "server URL" field. Functionally
identical to the header mode -- same key, same auth check -- but
**strictly worse for secret hygiene**: the key ends up in browser
history, any proxy/CDN access logs *upstream* of chaotic, and anywhere
the URL gets copy-pasted (bug reports, chat transcripts, Slack).
Chaotic's own logs are covered -- the backend scrubs the key out of the
request path before its access log or error log can record it (you'll
see `/mcp/ck_...1a2b` in log lines, enough to correlate with `chaotic
auth keys list`, never the full key) -- but nothing upstream of the
process is. Mint a **dedicated, expiring** key for it so it's easy to
tell apart, ages out on its own, and can be revoked independently of
anything else:

```bash
chaotic auth keys create "claude.ai connector" --expires-in 90d
chaotic auth keys list                # find its id
chaotic auth keys revoke <key-id>      # revoke it early, any time
```

This is a gap in claude.ai's connector UI, not an MCP or chaotic
limitation -- re-check the current docs before relying on this staying
true; it's exactly the kind of thing that gets fixed. Real OAuth
support (so the header/URL question goes away entirely, replaced by a
paste-URL-and-authorize flow) is tracked separately as CHT-1266's
follow-up.

### Auth and scoping

An API key belongs to a user (human or agent), and every tool call
resolves its team/project context from *that user's memberships* --
there's no local profile to fall back on the way the stdio server has:

- If the key's user has exactly one accessible team/project, tools
  default to it silently -- the common single-team case needs nothing
  extra.
- If the key's user belongs to more than one team, or a team has more
  than one project, pass `team` and/or `project` explicitly (id, key,
  or name all work) -- the tool call returns a clear
  `{"error": "..."}` listing the options if you don't.
- An agent-scoped API key (`chaotic agent create`) is confined to its
  own project/team exactly like it is over REST; passing a `team`/
  `project` that doesn't match its scope is rejected the same way.

`issue_view`/`issue_update`/`issue_comment`/`issue_start` don't take a
`team`/`project` parameter at all in either transport -- issue
identifiers (`CHT-123`) are unique instance-wide, so there's nothing to
disambiguate.

## Shelling out to the CLI directly

Harnesses that would rather run the `chaotic` binary directly (no MCP
host available, or finer control over output) can use `--json` on
every read/write command for a single-JSON-value stdout contract, and
`chaotic await ...` to block on activity instead of polling. See
`cli/README.md` for both.

## Ticket-close rituals & honest attestation

Closing a ticket (moving it to `done`) as an agent can trigger
**ticket-close rituals** — attestations the agent must clear first, each
gated by the ritual's own conditions (e.g. a `pr-review` ritual
configured with `{"estimate__gte": 3}` only fires on tickets estimated
≥3 points; smaller tickets close without it). If a ritual's conditions
don't match the issue, it's skipped ("conditions do not match").

**Supply attestation notes inline when closing non-interactively**
(CHT-1326 / ADR-0004). A bare `issue_update {status: "done"}` on a
ticket with note-required close rituals is *blocked* with
`ticket_rituals_pending` — and before CHT-1326 it also stranded a CLOSE
intent that locked everyone else out. The right call answers the
rituals in the same step, one note per ritual:

```
chaotic issue close CHT-123 \
  --attest 'close-gate:ADR written; oppo-reviewed; merged via PR #12' \
  --attest 'doc-refresh:README data-model table updated'
```

MCP equivalent: `issue_update` takes an `attest` map —
`{"close-gate": "…", "doc-refresh": "…"}` — applied before the status
change. `issue update --status …`, `issue claim`, and `issue start`
accept the same `--attest` flag (claims can be ritual-gated too).

If an attempt does get blocked anyway, the open intent is durable for
its initiator (retrying resumes it; attesting later auto-fires the
transition) but expires for everyone else after `intent_ttl_minutes`
(default 15) — the next principal's attempt cancels the stale intent
(`INTENT_CANCELED`) and proceeds. Intents blocked on GATE rituals never
expire; those wait for a human in the admin inbox.

A typical `pr-review` ritual demands you worked on a branch, opened a
PR, and had a **separate** oppositional-reviewer agent comment on it —
you cannot review your own code. That's the right bar for code changes.

But some tickets legitimately produce **no new code of your
authorship**: pure config/ops/docs work, or a feature you've discovered
was already implemented and merged in a *prior* PR. For those there is
no PR to review, and fabricating one to satisfy the gate is dishonest.
The honest path — when a `pr-review`-style ritual's prompt provides for
it — is a **`NO-NEW-PR:`** attestation:

```
chaotic ritual attest pr-review --ticket CHT-123 \
  --note "NO-NEW-PR: already shipped in PR #98, verified present at \
          frontend/src/keyboard.js:153 (createModifierKeyHandler). No new \
          code of my authorship introduced."
```

An honest `NO-NEW-PR:` note (a) says what actually changed, or points to
the `file:symbol` / original PR # where the already-shipped behavior
lives and how you verified it, and (b) states that no new authored code
was introduced. This is **not** a loophole: any ticket that *did*
introduce new code of your authorship still requires the full
branch → PR → oppositional-review flow. The exception exists so honest
closure of no-code/retroactive work is possible without either
fabricating a PR or leaving the ticket open forever.

**This is an honor-system convention, not a code-enforced contract.**
The ritual system only checks that a note is non-empty
(`note_required`) — it does *not* validate the `NO-NEW-PR:` prefix or
inspect the note's content. The gate's integrity comes from the agent
honestly following the ritual's prompt, the same way the branch/PR/
reviewer requirements above are behavioral, not machine-verified. The
whole point of a ritual is to shape agent behavior (see
[`docs/VISION.md`](VISION.md)); this path is only trustworthy if agents
use it truthfully. Advertise it by putting the `NO-NEW-PR:` instructions
in the ritual's own prompt with
`chaotic ritual update <name> --prompt ...` (admin only — agents cannot
edit their own gates), so every agent that hits the gate reads them.

## Related

- [`cli/README.md`](../cli/README.md) — full command reference, `--json`
  contract, exit codes, `await`'s event schema, MCP server.
- [`docs/VISION.md`](VISION.md) — why the constraints (budgets, arrears,
  limbo, rituals) exist and how they're meant to shape agent behavior.
