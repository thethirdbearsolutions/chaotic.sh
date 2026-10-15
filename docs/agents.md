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

To give each Claude Code session its own identity instead of sharing
one, use a registrar's key with `session_identity: auto`; see
[Registrars and per-session identities](#registrars-and-per-session-identities).

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

A toolset curated for quality over coverage (CHT-1247), grouped below;
the canonical list is `docs/mcp-toolset-schema.json` -- every tool's
description and input schema, regenerated from the code -- and
`cli/tests/test_mcp_toolset_sync.py` fails if this section stops naming
one of them (there is deliberately no count here to rot, CHT-1395):

- **issues:** `issue_list`, `issue_view`, `issue_create`, `issue_update`,
  `issue_comment`, `issue_start`, `issue_ready`, `issue_relations`,
  `issue_block`, `issue_unblock`, `issue_label`, `issue_revisions`,
  `issue_revision`
- **docs:** `doc_list`, `doc_view`, `doc_create`, `doc_update`,
  `doc_link`, `doc_unlink`, `doc_revisions`, `doc_revision` (every
  title/content edit snapshots the previous text; the revision tools
  are how you see what you are about to overwrite, CHT-1335)
- **sprints:** `sprint_current`, `sprint_list`, `sprint_close`,
  `sprint_transactions`, `sprint_add`, `sprint_remove`
- **rituals:** `ritual_pending`, `ritual_list`, `ritual_attest`,
  `ritual_complete`, `ritual_reject`
- **inbox:** `inbox_list`, `inbox_mark_read`, `inbox_mark_all_read` (what
  is waiting on you: @mentions, assignments, gates and reviews awaiting
  an admin -- the human-to-agent handoff channel, CHT-1338)
- **other:** `label_list`, `activity_recent`, `project_list` (enumerate
  the team's projects -- every other tool filters by project, this one
  tells you which projects exist), `server_info` (which commit, version
  and toolset the server is running -- the check to make when a field
  looks stale or a tool is missing, CHT-1401)

The sprint and ritual groups exist because governance state can block
the rest of this surface: arrears stops ticket transitions project-wide
and limbo stops a sprint rotating, and an agent that cannot see or clear
either is stuck (CHT-1332/CHT-1333). `sprint_current` is the call to
make when a write is refused with `sprint_in_arrears` or
`sprint_in_limbo`. `sprint_close` is the remedy for arrears; when it
enters limbo instead of rotating, its result carries `limbo_pending`
(the same rows `ritual_pending` returns: name, prompt, approval mode,
any attestation) and the not-yet-attested names in `unattested`, so the
next step -- `ritual_attest`, or `ritual_complete` for gate rituals --
needs no second lookup (CHT-1381).

A ritual can declare an **artifact** (`ritual_list` shows it: `document`
or `url`). Its attestation is bound to that artifact, not to the note:
pass `document` (a document you wrote for it -- id, id prefix or exact
title) or `url` (a link to the artifact, e.g. a PR review comment). The
server verifies a document is yours and was written after the sprint
activated or the ticket was created, so last sprint's retro cannot be
attested again; a missing or borrowed artifact is refused with the
ritual's prompt (CHT-1359).

Every tool returns a JSON object. Failures come back as
`{"error": {"message": "...", "error_code": "...", ...}}` rather than an
MCP protocol-level error (ADR-0006): `message` is always a sentence you
can show or reason over, `error_code` is present whenever the failure has
a stable name (`sprint_in_arrears`, `claim_rituals_pending`,
`tool_input`, `validation_error`, `unexpected`, ...), and governance
errors keep their structure (`pending_rituals`, `arrears_by`, `override`
hints) so you can act on them without parsing prose. A claim/close refused
for pending ticket rituals lists each ritual with its `approval_mode` and
any recorded `attestation` (the same rows `ritual_pending` returns), plus
three name lists -- `unattested` (attest these), `awaiting_approval`
(attested; a human approves) and `gate` (a human completes; attesting a
gate ritual is refused) -- and its message says which you are looking at.
Re-attesting something that is only waiting on a human is never the right
move (CHT-1360). Both transports
produce the identical envelope. Successful writes can carry advisory
`warnings` (a list of sentences) next to the result: today `issue_create`
and `issue_update` add one when the estimate is not on the project's
declared `estimate_scale` (CHT-1365); the write still happened as given.
On the HTTP transport a result can also carry a top-level `notice`
string, success or error alike: the server adds it when your key belongs
to a shared identity that is being retired (`MCP_LEGACY_SHARED_KEY_IDS`,
CHT-1720), and says there when and how to switch. Read it and act on it;
no tool ever returns a `notice` of its own. (The CLI's own `--json` mode keeps its
flat `{"error": "..."}` string -- that contract is for shells and exit
codes, this one is for models.)

**List tools return compact rows.** `issue_list`, `issue_ready`, `doc_list`
and `project_list` return a projection of each row (for issues:
identifier, title, status, priority, issue_type, estimate, assignee_name,
sprint_name, parent_identifier, labels as names, updated_at), plus `count`
and `truncated`. Foreign keys travel as names an agent can pass straight
back into another tool; the UUIDs are still on the full rows
(`detail: true`, `issue_view`) alongside `assignee_name`, `sprint_name`,
`parent_identifier` and `project_key`. Against a backend older than
those fields, the stdio server falls back to the UUIDs in the same
compact slots rather than reporting everything as unassigned. `truncated: true` means `limit` cut the list -- narrow the
filter rather than assume you saw everything. Pass `detail: true` for the
full response-schema rows; use `issue_view`/`doc_view` for one record.
`activity_recent` cuts `old_value`/`new_value` to a 200-character preview
with an explicit `...(+N chars)` marker, and `issue_view` returns the
newest 20 comments with `comment_count` plus compact sub-issue rows with
`sub_issue_count`. The projection is part of the
cross-transport contract (`_meta.response_shapes` in
`docs/mcp-toolset-schema.json`), so both servers return identical shapes.

No destructive tools (delete) are exposed. Destructive operations need
a human in the loop for now; that may change behind an explicit opt-in
flag in a future ticket. `issue_start` acquires a claim lease the same
way the CLI does (CHT-1246) and takes an optional `lease_seconds`
override; `issue_ready` is the open/unblocked/unclaimed work query
documented above.

See `cli/README.md` § MCP server for the full tool list mapped to
their CLI equivalents.

## Registrars and per-session identities

Every Claude Code session on a machine that shares one agent key also
shares one identity: two sessions can each `issue start` the same ticket
"as themselves", an @mention reaches both, and activity cannot tell them
apart. A **registrar** fixes that. It is an agent a person makes once for
a harness (a machine, a cloud environment), whose key does one thing:
register a separate **session identity** for each session, each with its
own short-lived key. A session identity is an ordinary agent, so claims,
leases, gates, the inbox and deactivation all apply to it unchanged.

### Make a registrar

```bash
chaotic agent create "Claude Code" --registrar          # team-scoped
chaotic agent create "CI" --project --registrar         # one project only
chaotic agent update claude-bot --registrar             # an existing agent
chaotic agent update claude-bot --no-registrar          # and back
```

In the web app: **Agents → Create Agent → Registrar**, or **Make
registrar** / **Stop being a registrar** on an agent's row (shown to
the agent's creator and team admins, on active agents). Over the API,
`can_register: true` on `POST /api/teams/{id}/agents` or
`POST /api/projects/{id}/agents`, or `PATCH /api/agents/{id}`.

- Any member of the team can create one. Turning the capability on or
  off later is for the agent's creator (while in the team) and the
  team's admins. The Android app's sign-in cannot change it.
- **A registrar cannot write as itself.** Its key may call
  `POST /api/agents/register` and read; every other call is a 403
  `registrar_cannot_write`, over REST and `/mcp` alike. That is
  deliberate: if registering fails, nothing can fall back to writing as
  the shared identity.
- **One level deep.** A session identity can never be made a registrar,
  and cannot register anything.
- `--no-registrar` lets the agent write as itself again. The identities
  it registered keep working until their keys expire, but it can no
  longer renew them.
- **Deactivating a registrar retires its identities**: `chaotic agent
  deactivate` deactivates every active identity it registered and
  revokes their keys in the same step.

### Automatic: one identity per Claude Code session

Give the machine's profile the registrar's key and turn on
`session_identity`:

```bash
chaotic auth set-key ck_...                    # the registrar's key
chaotic config set-session-identity auto       # or CHAOTIC_SESSION_IDENTITY=auto
claude mcp add chaotic -- chaotic mcp
```

No `chaotic team use` is needed when the registrar's key has exactly one
team (a team-scoped agent key always does): with no current team,
`chaotic mcp` uses the key's only team, and a person registrar's session
identity is registered in it; with several teams, both say which to
choose from. CLI commands that work in a team still want a current
team, so run `chaotic team use <key>` too if you will use the CLI there.

From then on, inside a Claude Code session (which sets
`CLAUDE_CODE_SESSION_ID`), the CLI and `chaotic mcp` both:

1. read this session's key from `~/.chaotic/sessions/<hash>.json`, one
   file per session, server and registrar key (and team, when a person
   is the registrar);
2. otherwise register `claude-code:session:<CLAUDE_CODE_SESSION_ID>` with
   the registrar's key and save the new key there (mode 0600, in a 0700
   directory);
3. send every request with the session's key, never the registrar's;
4. on a 401 (the key expired or was revoked), register again once and
   retry;
5. if registering fails, stop with an error that says so. They never
   fall back to the registrar's key.

A new identity is named `<registrar> · <git branch or directory> ·
<first 6 of the session id>`. The CLI sends that as `default_name`,
which never renames an existing identity, so a rename by hand survives
every later registration. `chaotic auth whoami` shows the session identity, its
`external_ref` and the registrar that registered it; run
`CHAOTIC_SESSION_IDENTITY=off chaotic auth whoami` to see the registrar
itself. Subagents of a session share its identity.

**Idle identities are hidden from lists.** One identity per session adds
up, so a session identity whose keys have gone unused for 7 days is
*idle*: `chaotic agent list` and the web app's assignee pickers leave it
out (`chaotic agent list --all` shows it, marked idle; `agent list
--json` follows `--all` the same way, so a script that enumerates agents
should pass `--all`; the API flag is
`GET /api/teams/{id}/agents?hide_idle=true`, and every listed identity
carries `last_used_at` and `idle`). The rest are listed under the
registrar that registered them. Hiding is only a display filter: an idle
identity still resolves by id or name for `--assignee`, `agent
deactivate` and the rest, and using its key makes it active again.

Notes:

- **Off by default.** Without the setting, or outside Claude Code (no
  `CLAUDE_CODE_SESSION_ID`), nothing changes: the configured key is used
  as before. `CHAOTIC_SESSION_IDENTITY=auto|off` in the environment
  overrides the profile, which suits a cloud environment's setup script.
- **What a repository's `.chaotic` can change.** With the setting on, the
  setting itself, the registrar key and the server URL come only from
  the environment (`CHAOTIC_SESSION_IDENTITY`, `CHAOTIC_API_KEY`,
  `CHAOTIC_TOKEN`, `CHAOTIC_API_URL`) or the profile
  (`~/.chaotic/<profile>.json`). A `.chaotic` that sets its own
  `api_key`, `token` or `api_url` (different from the profile's) is an
  error inside Claude Code, naming the field: remove it, or set
  `CHAOTIC_SESSION_IDENTITY=off` in that directory. The current team and
  project still come from `.chaotic` as usual.
- Switching profile, registrar key or server within one session uses a
  separate cache file for each, so switching back does not register
  again. An agent registrar always registers in its own team, so
  changing the local current team (`chaotic team use`, another
  directory's `.chaotic`) changes nothing; for a person acting as
  registrar each team is its own identity and cache file.
- Two registrars in the **same team** cannot both register one session:
  registration is idempotent per (team, ref), so the second gets 409.
  Use one registrar per team.
- Processes of one session that start together (the CLI, `chaotic mcp`,
  subagents) register once: they take a lock next to the cache file and
  the second one uses what the first saved. This matters because each
  registration revokes the identity's previous key.
- The cache is ignored, and replaced, when it is a symlink or not a
  regular file, is readable by anyone but you, or sits in a
  `~/.chaotic/sessions` that is not yours alone (a looser directory is
  tightened to 0700 and everything already in it is distrusted; a
  symlinked one is an error).
- If the configured agent is not a registrar, the error says so: its
  creator or a team admin, signed in as themselves, runs
  `CHAOTIC_SESSION_IDENTITY=off chaotic agent update <agent>
  --registrar` (or uses Make registrar in the web app).
- `chaotic mcp` prints a warning on stderr at startup when the setting
  is auto but its process has no `CLAUDE_CODE_SESSION_ID`: it then acts
  with the configured key itself, and a registrar's key can only read.
- A person's own login works as the registrar too (the identity is
  registered in the current team), but the profile then acts as a
  session identity for everything inside Claude Code.

### By hand: `POST /api/agents/register`

For other harnesses, or a script, `chaotic agent register --ref <ref>
[--name ...] [--project ...] [--json]` makes the call with the configured
key, as does:

```bash
curl -X POST https://your-chaotic-host/api/agents/register \
  -H "Authorization: Bearer ck_REGISTRAR..." -H "Content-Type: application/json" \
  -d '{"external_ref": "my-harness:session:1234", "name": "Harness · job 1234"}'
```

It returns `{agent, created, api_key, api_key_id, expires_at}`; the key
is shown only here.

- `external_ref` is the session's address in the harness (printable
  ASCII, no spaces, up to 200 characters), for example
  `claude-code:session:<uuid>`. It is not a secret. Only the identity
  itself, its owner and team admins can read it back.
- **Idempotent per team and ref.** The first call creates the identity
  (201); later calls by the same registrar return the same identity
  (200) with a **new key, revoking its previous ones**: one live key per
  identity. That is how a key is rotated. Another registrar asking for
  the same ref, or a deactivated identity, gets 409.
- **Keys expire after 7 days** (`AGENT_SESSION_KEY_TTL_SECONDS`).
  Register again to renew.
- `name` is optional and renames an existing identity; a new one
  defaults to `<registrar> · <last 8 of the ref>`. `default_name` names
  a new identity only and leaves an existing one's name alone (what the
  CLI sends). An agent may not take the name of a person in its team.
- `project_id` narrows a team-scoped registrar's identity to one of its
  projects. Nothing can be wider than the registrar. A person calling
  for themself passes `team_id` (or a `project_id`).
- **Caps** (429; the hourly one with `Retry-After`): at most 200 active identities per
  registrar (`REGISTRAR_MAX_ACTIVE_IDENTITIES`) and 60 registrations per
  rolling hour, renewals included (`REGISTRAR_MAX_REGISTRATIONS_PER_HOUR`).
- The identity's owner, and the holder of its keys, is the person who
  holds the registrar's key. So it stops working when that person leaves
  the team, like any agent key they hold.

## Remote MCP (Streamable HTTP, `/mcp`)

If you'd rather point a *hosted* client at your chaotic instance instead
of running `chaotic mcp` as a local subprocess -- claude.ai's custom
connectors, Claude Desktop, ChatGPT, or Claude Code's `--transport
http` -- the backend also speaks MCP directly over Streamable HTTP at
`/mcp`. You add it by URL and approve it in your browser (OAuth; see
"Connecting" below).
Same tools, same names, same behaviour: since CHT-1374 both servers
register the one toolset defined in `chaotic_mcp_tools` (ADR-0007), each
bound to its own data-access backend, so the two cannot drift. The one
documented difference is that the team-scoped tools (listed under
`_meta.team_scoped_tools` in `docs/mcp-toolset-schema.json`: `issue_list`,
`issue_create`, `issue_ready`, `doc_list`, `doc_create`, `doc_update`,
`label_list`, `project_list`, `activity_recent`, `inbox_list`,
`inbox_mark_all_read`, the `sprint_*` tools except `sprint_remove`, and
the `ritual_*` tools) additionally accept an
optional `team` parameter here, because a hosted server has no single
active profile to inherit context from -- see "Auth and scoping" below.

**Clients cache the toolset; reconnect after a server upgrade.** MCP
clients fetch `tools/list` when they connect and keep it. The toolset only
changes when the server process restarts, and this transport is stateless
by design (every request is its own session), so a restart is invisible to
a connected client: a stateful client would hit an unknown-session error
and re-initialize, but here its requests keep succeeding against the new
server while it advertises the old tools, and there is no live session
over which the server could send `notifications/tools/list_changed`
(CHT-1364: an a18 deploy went from 11 to 30 tools and a live claude.ai
connector still showed 11). After `chaotic system upgrade`, remove and
re-add the connector (or restart the Claude Code session); the upgrade
command reads `/api/version` before and after and says whether that is
needed. To check a running server without reconnecting: call the
`server_info` tool (or `GET /api/version` outside MCP), which reports
`mcp_tool_count` and `mcp_toolset_fingerprint` beside the client's own
count. The
count is the one thing you can compare against a client's tool list; the
fingerprint (SHA-256 over every tool definition as served on `/mcp`,
`team` parameters included, so not the hash of the stdio snapshot
`docs/mcp-toolset-schema.json`) also catches a same-count schema change,
and is for comparing a server against itself across an upgrade.

Protocol notes: the server is built on mcp 2.x, so it negotiates both
the 2025-06-18 protocol revision and the 2026-07-28 "modern" era --
any current client works, no version pinning needed. Request bodies are
capped at 4 MiB per call (a 413 if exceeded); the only tools that can
plausibly approach that are `doc_create`/`doc_update` with a very large
`content`, so split enormous documents rather than sending one body.

### Connecting: add by URL and authorize (OAuth)

Every hosted client connects the same way: you give it the server URL,

```
https://your-chaotic-host/mcp
```

and nothing else. No key goes in the URL or a header. The client finds
Chaotic's sign-in on its own (the MCP authorization spec: a 401 from
`/mcp` points at `/.well-known/oauth-protected-resource/mcp`, which
names this server's `/.well-known/oauth-authorization-server`), sends
you to a Chaotic consent page in your browser, and gets a token for the
agent you pick there. The server has to have OAuth turned on first (see
"Turning OAuth on" below).

**claude.ai (web).** Settings > Connectors > *Add custom connector*.
Name it, paste the URL, leave *Advanced settings* (OAuth client ID and
secret) empty, and click *Add*, then *Connect*. claude.ai identifies
itself with a client metadata document (CIMD) when the server supports
them, as Chaotic does, and otherwise registers itself; either way
nothing is registered by hand. Its redirect is
`https://claude.ai/api/mcp/auth_callback`. On a Team or Enterprise plan an owner adds the connector under the
organization's settings and each member connects it for themselves.
The server must be reachable from the public internet over https
(claude.ai's requests come from Anthropic's addresses,
`160.79.104.0/21`); a server on `localhost` or a private network can't
be added here.

**Claude Desktop (and mobile).** Connectors you add on claude.ai appear
in Desktop and the mobile apps under the same account; *Connect* each
one from Settings > Connectors there if it asks. Desktop can also add a
custom connector itself, the same way as the web. The traffic still
comes from Anthropic's servers, not your machine, so the same
public-https requirement applies.

**Claude Code.**

```bash
claude mcp add --transport http chaotic https://your-chaotic-host/mcp
```

then run `/mcp` in a session and choose *Authenticate* for `chaotic`.
Claude Code identifies itself with its own metadata document
(`https://claude.ai/oauth/claude-code-client-metadata`) and receives the
code on a loopback listener (`http://localhost:<port>/callback` or
`http://127.0.0.1:<port>/callback`, on whatever port it got; the server
accepts any port there, as RFC 8252 requires). Because the browser hands
the code to your own machine, this also works against a server on
`http://localhost`. The header form,
`--header "Authorization: Bearer ck_..."`, still works and is what
headless or CI sessions should use (see "API keys" below).

**ChatGPT.** In Settings > Apps & Connectors, turn on developer mode
under *Advanced settings*, then *Create* a connector: give it a name,
paste the URL as the *MCP server URL*, and choose *OAuth* for
authentication. ChatGPT prefers a metadata document when the server
supports one (Chaotic does) and its shared redirect
`https://chatgpt.com/connector_platform_oauth_redirect`, because Chaotic
returns the RFC 9207 `iss` parameter; it also sends the RFC 8707
`resource` parameter, which Chaotic checks. The menu names above move
between ChatGPT releases; the fields don't.

**MCP Inspector and other clients.** In the Inspector, pick *Streamable
HTTP*, paste the URL, and use its OAuth flow. A client that doesn't do
metadata documents (older MCP Inspector builds, for example) registers
itself with dynamic client registration (`POST /oauth/register`, RFC
7591) instead. On the consent page such a client shows as *Unverified
app (registered itself)*: the name is whatever the client sent, so
check the redirect host before approving.

#### What the consent page shows

Connecting opens `https://your-chaotic-host/oauth/consent/<id>`. Sign in
to the web app first if asked (a CLI login doesn't count: consent takes
the web app's own login). The page shows:

- **the app**, with a badge: *Recognized app* (a client Chaotic knows by
  its exact metadata-document URL, e.g. Claude Code), *Identified by its
  website · host* (any other metadata document, e.g. `claude.ai`,
  `chatgpt.com`), or *Unverified app (registered itself)* (DCR);
- **where the approval goes**: the redirect host, in large type, with an
  extra warning when it is a program on this computer (a loopback
  redirect, as for Claude Code);
- **Team**: which of your teams the connection works in;
- **Acts as**: *Create a new agent* (the default, named after the app
  and you, and owned by you) or an existing agent you manage. The app
  works as that agent, never as you; everything it does is attributed to
  the agent. Reconnecting the same app suggests the agent you picked
  last time;
- **Projects**: leave all unchecked for every project in the team, or
  limit it to some;
- **Access**: `write` today; the narrower policies are shown greyed out
  until they ship;
- **staying connected**, when the app asked for `offline_access`: how
  long it can keep refreshing without you.

*Approve* sends the code back to the app; *Deny* tells it you said no.
Every connection asks again: nothing is approved silently, not even for
a recognized app.

Tokens are short-lived: an access token lasts 10 minutes and the app
refreshes it on its own (Claude does so a few minutes before expiry). A
connection keeps refreshing while it is used at least once every 30
days, for at most 90 days, and then you approve it again.

#### Disconnecting

Settings > *Connected Apps* (CHT-1523) in the web app lists every connection you
approved: the app, the agent it acts as, and its team. *Disconnect*
ends it; the app's next request fails and it can't refresh. The same
from the CLI:

```bash
chaotic auth connections list
chaotic auth connections revoke <id>
```

Removing the connector in claude.ai or ChatGPT stops that client from
using it, but don't count on it ending the connection on the server:
disconnect it here too. Connections also end on their own when what
they depend on goes: the agent is deactivated or deleted, you leave or
are removed from the team, or your account is deleted (see "Connected
apps and revocation" in `docs/self-hosting-security.md`). Disconnecting
an app does not touch the agent's API keys, and revoking a key does not
disconnect an app you approved on the consent page, even one acting as
the same agent. (The exception: a connection *claimed with* a key, not
approved on the consent page, ends when that key is revoked.)

#### Turning OAuth on (self-hosting)

OAuth is off by default. Two settings turn it on:

- `OAUTH_ENABLED=true`
- `APP_BASE_URL=https://your-chaotic-host`: the public origin people and
  clients reach the server at. It becomes the OAuth issuer and every
  advertised URL, so it must be exact: `https`, a bare origin with no
  path (a trailing slash is stripped), in canonical form (lower-case
  host, no default port). Plain `http` is allowed only on `localhost`,
  `127.0.0.1` or `[::1]`, which is enough for Claude Code on the same
  machine but not for claude.ai or ChatGPT. The server refuses to start if the value can't be an issuer,
  and says why.

Usually also:

- `FORWARDED_ALLOW_IPS`, when a reverse proxy terminates TLS on another
  machine (the default trusts one on the same machine), so the OAuth
  rate limits see real client addresses. See "Behind a reverse proxy"
  in `docs/self-hosting-security.md`.
- `MCP_CAPABILITY_URL_ENABLED=false`, once nothing uses the deprecated
  capability URL (below).
- Leave `OAUTH_DCR_ENABLED` on (the default). Only Claude Code's use
  of a metadata document is confirmed so far; claude.ai falls back to
  registering itself (DCR) when it can't use one, and ChatGPT and MCP
  Inspector may do either. Turning DCR off is worth revisiting once the
  per-client checks on CHT-1521 are recorded: a client that connects
  without registering shows a badge other than *Unverified* on the
  consent page.

The server needs direct outbound https to fetch client metadata
documents (from `claude.ai`, `chatgpt.com`, ...); it ignores
`HTTPS_PROXY` for those fetches.

Where to set them: on a `chaotic system install` server, use
`chaotic system config set NAME VALUE` (CHT-1592), setting `APP_BASE_URL`
before `OAUTH_ENABLED`, then `chaotic system config check`, `chaotic
system stop` and `chaotic system start`. The settings are kept in
`~/.chaotic/server.json` (under `$CHAOTIC_HOME` if you set it) and
written into the service unit, so `system reconfigure` and `system
upgrade` keep them. Do not add `Environment=` lines to the unit by hand:
`reconfigure` drops them and `upgrade` stops rewriting a unit that has
them (`chaotic system config list` names any, and `set` with the same
value adopts them). Full steps: `docs/self-hosting-security.md`, "Server
settings on an installed server". For a dev server or one you run by
hand, the server also reads its environment and a `.env` file in the
directory it runs from (`backend/.env`), one `NAME=value` per line; on an
installed server a value in the unit overrides `.env`. To check:
`curl https://your-chaotic-host/.well-known/oauth-authorization-server`
returns JSON whose `issuer` is exactly your `APP_BASE_URL`, and an
unauthenticated `POST /mcp` answers 401 with a `WWW-Authenticate`
header that names `resource_metadata`.

#### The Chaotic Android app signs in as you

The native app (application id `sh.chaotic.android`, CHT-1602) uses the
same OAuth server, but it is not a connector and does not act as an
agent. It is built into the server as the OAuth client
`builtin:sh.chaotic.android`, resolved from code: the server fetches
nothing to recognise it (an air-gapped server works), and no stored or
published document can change the redirects it accepts. Its redirect is
fixed, `https://chaotic.sh/app/oauth2redirect`, with PKCE S256,
`offline_access` and rotating refresh tokens like every connection.

That redirect is a verified Android App Link (CHT-1649): Android hands
it only to the genuine, release-signed app, so another app on the phone
that starts a sign-in cannot receive the result. Still approve the
sign-in page only when you have just tapped "Sign in" in the Chaotic app
yourself. How to install the app: [android.md](android.md).

Signing in shows "Sign in to Chaotic for Android as you?" with nothing
to choose: no team, agent or projects. The sign-in is account-wide. The
app then acts as you on REST and the `/ws` live feed, in every team you
belong to and only while you belong to it, exactly as your web login
does: it can approve gates, comment and change status as you, and a
team you leave is out of its reach on its next request. Like the web
app it sends `X-Chaotic-Interactive: 1`, so it gets the interactive
human's ritual and estimate exemptions. Its tokens are for the whole
server (`resource=https://your-chaotic-host`) and are refused at `/mcp`;
it cannot create anything that would outlive its sign-in: API keys,
agent keys or registered agents, team invitations (or accepting one),
new teams, member roles, an agent's registrar capability or its
reactivation; nor change or delete your account.

A device stays signed in until you sign it out (in the app or in
Connected Apps), its refresh token is reused (a sign of a copied token),
it goes unused past the refresh window, or your account is deactivated
or deleted. Leaving or deleting a team does not sign it out.

Every other OAuth client, whatever it calls itself or wherever it
redirects, still acts only as an agent and only at `/mcp`.

Each phone is listed in Connected Apps as its own row ("Pixel 8 ·
Chaotic for Android"). *Sign out* there ends that device's session and
deletes its push registration.

The server needs only `OAUTH_ENABLED=true` and `APP_BASE_URL` (below)
for the app. The app reads `/.well-known/oauth-authorization-server`
first; a 404 there means OAuth is off, and the app tells you that the
server's admin must set those two.

### API keys (CLI, scripts, headless sessions)

A `ck_...` API key in an `Authorization: Bearer` header works on `/mcp`
whether or not OAuth is on, for anything that can send a header and has
no browser to approve in: scripts, CI, headless Claude Code sessions.

```bash
chaotic auth keys create "ci agent" --expires-in 90d
claude mcp add --transport http chaotic https://your-chaotic-host/mcp \
  --header "Authorization: Bearer ck_..."
```

`--expires-in` (e.g. `90d`, `12h`) is optional -- omit it for a
non-expiring key -- but recommended for any key that leaves your
machine. An expired key gets the same 401 as an invalid one. For an
agent of its own rather than your account, use `chaotic agent create`.

### The capability URL (deprecated)

> **Deprecated (CHT-1522). Use "add by URL and authorize" above.** The
> capability URL is served only while `MCP_CAPABILITY_URL_ENABLED` is
> on. It is on by default for now, with a `Deprecation` header on every
> response and a startup warning; it turns off by default in a coming
> release (`/mcp/<key>` then answers 404) and is removed after that. See
> `docs/self-hosting-security.md`.

Before OAuth, claude.ai's connector dialog had no way to send a key, so
the key went in the path:

```
https://your-chaotic-host/mcp/ck_...
```

That puts a long-lived secret in browser history, in the logs of any
proxy or CDN in front of Chaotic, and anywhere the URL is pasted
(Chaotic's own logs scrub it to `/mcp/ck_...1a2b`). To move a connector
off it: turn OAuth on, remove the old connector in claude.ai, add it
again by the plain `/mcp` URL and approve it (pick the agent the old key
belonged to under *Acts as* to keep its history in one place), then
revoke the old key (`chaotic auth keys list`, `chaotic auth keys revoke
<key-id>`, or `chaotic agent keys revoke` for an agent's key) and set
`MCP_CAPABILITY_URL_ENABLED=false`.

### Auth and scoping

An OAuth connection acts as the agent chosen on the consent page, and
only in the team (and projects, if you limited it) chosen there; the
rules below apply to it as to that agent's key. An OAuth access token
works only on `/mcp`: REST answers it with 401.

An API key belongs to a user (human or agent), and every tool call
resolves its team/project context from *that user's memberships* --
there's no local profile to fall back on the way the stdio server has:

- If the key's user has exactly one accessible team/project, tools
  default to it silently -- the common single-team case needs nothing
  extra.
- If the key's user belongs to more than one team, or a team has more
  than one project, pass `team` and/or `project` explicitly (id, key,
  or name all work) -- the tool call returns a clear
  `{"error": {"message": "...", "error_code": "tool_input"}}` listing the
  options if you don't.
- An agent-scoped API key (`chaotic agent create`) is confined to its
  own project/team exactly like it is over REST; passing a `team`/
  `project` that doesn't match its scope is rejected the same way.
- To retire an agent, `chaotic agent deactivate <agent>` revokes all its
  keys and blocks it from signing in while keeping its work attributed
  to it. Its creator (while still a member of its team) and any admin
  of its team may do this; `chaotic agent delete` is refused once the
  agent has authored anything. A
  deactivated agent can't be assigned new issues; the ones it already
  holds stay assigned, so reassign its open work. `chaotic agent
  reactivate <agent>` undoes it, but its old keys stay revoked: mint a
  new one with `chaotic agent keys create`. When someone other than the
  creator does either, the creator gets an inbox entry saying who.
- An agent key belongs to whoever minted it: the creator holds the key
  `agent create` printed, and a key an admin mints with `chaotic agent
  keys create` is the admin's (it shows in their `chaotic auth keys
  list`, not the creator's). A key an agent mints for itself through
  `POST /api-keys` belongs to whoever holds the key it called with, so
  every agent key has a human behind it. `chaotic agent keys list
  <agent>` shows every key that signs in as the agent and who holds
  it; `chaotic agent keys revoke <agent> <key>` revokes one by its ID
  prefix or its `ck_...` prefix. Both are for team admins and the
  agent's creator.
- **Changed for existing keys:** before this release, every key minted
  for an agent was recorded as its creator's, even one a team admin
  minted, and a key an agent minted for itself recorded no human at all.
  Upgrading to a release with migration 0021 records the agent's creator
  as the holder of each of those self-minted keys, so `keys list` shows
  the creator by name (older servers showed `(creator, legacy)`).
  Existing rows cannot
  tell an admin's mint from the creator's, so all of those keys stand or
  fall with the agent's creator. That cuts both ways:
  - When the creator leaves, an admin's bot running on such a key stops.
  - When the **admin** who actually holds such a key leaves, nothing
    revokes it: it is recorded as the creator's, `keys list` shows the
    creator as its holder, and a key the agent mints with it is recorded
    as the creator's too. For an agent the team owner created, that key
    never expires on its own.

  **Admins: rotate any agent key that someone other than the agent's
  creator minted before this release** (`chaotic agent keys create`,
  move the bot over, then `chaotic agent keys revoke` the old one). A
  key minted from now on is recorded as its minter's, so neither problem
  recurs. A bulk rotate/revoke of pre-release keys is tracked as
  CHT-1529.
- **Leaving a team ends the agent keys you hold for it.** When a member
  is removed from a team, or leaves it, every key they hold for that
  team's agents is revoked in the same step: keys they minted, keys an
  agent minted for itself with one of their keys, and the legacy
  self-minted keys of agents they created (held by the creator).
  Anything still running on those keys
  stops, with the same 401 as any revoked key, over REST and MCP alike.
  The agents stay. Agents the member created pass to the admin who
  removed them, or to the team's longest-standing owner if they left on
  their own. The team's other admins get an inbox entry for each affected
  agent, so
  someone can mint a replacement key. Separately from that revocation,
  an agent key whose holder is no longer in the agent's team does not
  sign in. The removed creator also loses every right over the agent
  (update, delete, deactivate/reactivate, listing, minting or revoking
  its keys). Rejoining does not bring back revoked keys or ownership.
  The sign-in check is separate from revocation, though: a key that was
  never revoked, such as one whose holder left before this release, signs
  in again once that holder is back in the team.
- **A deactivated holder (CHT-1552).** A person whose account is
  deactivated (`is_active` false) cannot sign in, and neither can any
  agent key they hold, even while they are still a team member: the same
  401 as a revoked key, over REST and MCP alike. Deactivation revokes
  nothing, so those keys sign in again if the account is reactivated.

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
transition) and its exclusivity is a *renewable lease*: retries and
attest progress keep it fresh, but after `intent_ttl_minutes` (default
15) with no initiator activity the next principal's attempt cancels the
stale intent (`INTENT_CANCELED`, with the displaced initiator in the
event payload) and proceeds. Intents blocked on GATE rituals — or on
REVIEW rituals already attested and awaiting approval — never expire;
those wait on a human, not the initiator.

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
