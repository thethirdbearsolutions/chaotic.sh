# Chaotic CLI

Command-line interface for the Chaotic issue tracker.

## Installation

```bash
cd cli
pip install -e .
```

## Configuration

Set the API URL (defaults to http://localhost:24267):
```bash
chaotic config set-url https://your-api-server.com
```

## Authentication

### Sign up / Login
```bash
chaotic auth signup
chaotic auth login
```

### API Keys (for scripts/automation)
```bash
chaotic auth keys list
chaotic auth keys create
chaotic auth keys revoke <key-id>
chaotic auth set-key ck_your_api_key_here
chaotic auth clear-key
```

### Check current user
```bash
chaotic auth whoami
chaotic me                     # Shortcut for 'auth whoami'
```

## Status

Check current context (user, team, project):
```bash
chaotic status
```

## JSON output

Most commands accept a `--json` flag — the CLI's machine-output mode, for
scripts and agent harnesses. It works both before and after the
subcommand name:

```bash
chaotic --json issue list          # equivalent
chaotic issue list --json          # equivalent
```

Under `--json`:

- **stdout carries exactly one JSON value** — the result of the command
  (the created/updated/affected entity, a list, or `{"error": ...}` on
  failure). Nothing else is written to stdout.
- **Everything else — status lines, progress messages, tables, panels —
  goes to stderr.** A caller doing
  `data = json.loads(subprocess.check_output([...]))` never has to worry
  about human-readable chatter breaking the parse.
- Mutation and state-transition commands (`issue create`, `issue move`,
  `issue block`, `doc update`, `sprint add`, etc.) emit the
  created/affected entity's id as part of the JSON payload, so a caller
  doesn't need a follow-up `issue show --json` just to learn what
  happened.
- **Confirmation-gated commands (`issue delete`, `doc delete`, etc.)
  never prompt under `--json`** — a machine consumer can't answer a TTY
  prompt. Pass `--yes` (`chaotic --yes issue delete ... --json`) to
  proceed; without it they emit `{"error": ...}` and exit 2 instead of
  hanging on (or leaking) a prompt.
- This holds even for errors Click raises before your command runs — an
  invalid choice value (`--status bogus`), a missing required argument,
  an unknown flag all produce `{"error": ...}` on stdout (exit 2), with
  the usage text on stderr.

Run `chaotic <command> --help` to check whether a given command supports
`--json` — it's listed in the flag help text, not hidden.

`chaotic await` has its own richer JSON contract (a normalized event
schema, not just "whatever the entity looks like") — see the
[Await](#await) section below.

## Exit codes

| Code | Meaning                                                              |
|------|-----------------------------------------------------------------------|
| 0    | Success                                                                |
| 1    | Runtime/API error (network failure, 4xx/5xx from the server, a `ClickException` raised by command logic) |
| 2    | Usage error — bad flags/arguments (Click's own `UsageError`/`BadParameter`, e.g. an invalid `--status` value) |

This holds under `--json` too: a usage error still exits 2 (with
`{"error": ...}` on stdout), not collapsed to 1. `chaotic await` extends
this with its own additional codes (124 timeout, 130 SIGINT, 143
SIGTERM) — see the [Await](#await) exit-code table below, which is more
specific than this general contract.

## Long-text values from a file or stdin

Every long-text flag in the CLI (`--description`, `--body`, `--content`,
`--comment`, `--note`, `--prompt`) accepts curl-style file references:

```bash
# Read body from a file
chaotic doc create --project PRJ --title "Report" --body @./report.md

# Read body from stdin (useful with heredocs — no tmp file needed)
chaotic doc create --project PRJ --title "Report" --body - <<'EOF'
# Long doc

Body content with `backticks`, $vars, em-dashes — all fine.
EOF

# Literal "@" prefix (escape with @@)
chaotic issue comment CHT-11 --note @@alice
```

Resolution rules:

| Value             | Behavior                                     |
|-------------------|----------------------------------------------|
| `-`               | Read stdin to EOF                            |
| `@/path/to/file`  | Read text from file (UTF-8); error if missing |
| `@@<rest>`        | Literal `@<rest>` (escape; one level only)   |
| anything else     | Literal value (existing behavior)            |

Stdin can only be consumed once per command; if multiple flags pass `-`,
the second sees EOF.

## Teams

```bash
chaotic team list              # List your teams
chaotic team use <team-id>     # Set current team
chaotic team show              # Show current team details
chaotic team create            # Create a new team
chaotic team members           # List team members
chaotic team invite            # Invite a member
chaotic team accept-invite     # Accept an invitation
```

## Projects

```bash
chaotic project list           # List projects in current team
chaotic project use <project-id>  # Set current project
chaotic project show           # Show current project details
chaotic project create         # Create a new project
chaotic project update         # Update current project
```

## Issues

### Listing and viewing
```bash
chaotic issue list                        # List issues in current project
chaotic issue list --status in_progress   # Filter by status
chaotic issue list --priority high        # Filter by priority
chaotic issue mine                        # List issues assigned to me
chaotic issue mine --status in_progress   # Filter my issues by status
chaotic issue search "search term"        # Search issues across the team
chaotic issue show CHT-123                # Show issue details
chaotic issue view CHT-123                # Alias for 'show'
chaotic issue open CHT-123                # Open issue in browser
```

### Ready to start (CHT-1245)

`chaotic issue ready` answers "what can I start right now" -- the
agent's first shell-out, before touching `issue list`'s filters. It's
Beads' `bd-ready` equivalent: open (`backlog`/`todo`), unblocked (no
unresolved `blocks` relation), unassigned by default, priority-sorted
(`urgent` first, then oldest-first within a tier).

```bash
chaotic issue ready --json                 # unassigned, unblocked, open work
chaotic issue ready --mine                 # your own assigned-but-not-started backlog
chaotic issue ready --include-assigned     # widen: include everyone's claims too
chaotic issue ready --all-projects         # team-wide instead of current project
chaotic issue ready --limit 5
```

`--mine` and `--include-assigned` are mutually exclusive. See
[docs/agents.md](../docs/agents.md) for the full agent operating loop
(`ready` → `start` → work → `complete`) and how this interacts with
claim leases below.

### Claiming and completing

```bash
chaotic issue start CHT-123                # assign to self + move to in_progress
chaotic issue start CHT-123 --lease 4h     # override the claim-lease duration (CHT-1246)
chaotic issue claim CHT-123                # same thing (start is an alias for claim)
chaotic issue close CHT-123                # mark done (alias: issue complete)
chaotic issue wontfix CHT-123              # cancel (alias: issue cancel)
```

`start`/`claim` acquire a **claim lease** -- a server-side expiry
(default ~2h, `--lease` overrides). Re-running `start`/`claim` while you
still hold the ticket extends (heartbeats) the lease instead of
erroring. If the lease expires while the issue is still `in_progress`,
the next read or list of that issue lazily releases it back to
`todo`/unassigned and logs a `lease_expired` activity -- no cron, no
silent wedge. See [docs/agents.md](../docs/agents.md#claim-leases) for
the full semantics.

### Creating issues
```bash
chaotic issue create --title "Bug fix"
chaotic issue create --title "Bug fix" --project CHT     # Specify project by key
chaotic issue create --title "Sub-task" --parent CHT-123  # Create sub-issue
chaotic issue create --title "Feature" --priority high --status todo
```

### Updating issues
```bash
chaotic issue update CHT-123 --status done
chaotic issue update CHT-123 --priority urgent
chaotic issue update CHT-123 --assignee user-id
chaotic issue update CHT-123 --estimate 5
chaotic issue move CHT-123 in_progress      # Quick status change
chaotic issue assign CHT-123 me             # Assign to yourself
chaotic issue assign CHT-123 agent-bot      # Assign to an agent by name/ID
chaotic issue assign CHT-123                # Unassign
```

### Comments
```bash
chaotic issue comment CHT-123 "This is a comment"
```

### Sub-issues and Relations
```bash
chaotic issue sub-issues CHT-123           # List sub-issues
chaotic issue relations CHT-123            # Show issue relations
chaotic issue block CHT-1 CHT-2            # CHT-1 blocks CHT-2
chaotic issue block CHT-1 CHT-2 --type duplicates  # Mark as duplicate
chaotic issue block CHT-1 CHT-2 --type relates_to  # Related issues
chaotic issue relations CHT-1              # Find the relation ID to remove
chaotic issue unblock CHT-1 <relation-id>  # Remove relation (relation ID, not an issue identifier)
```

### Deleting
```bash
chaotic issue delete CHT-123
```

## Sprints

```bash
chaotic sprint list            # List sprints in current project
chaotic sprint current         # Get or create the current sprint
chaotic sprint close <id>      # Close the current sprint
chaotic sprint add CHT-1 CHT-2 # Add issues to the current sprint
chaotic sprint remove CHT-1    # Remove an issue from its sprint
```

There is no `sprint delete` command — sprints aren't deletable at any
layer (no client method, no backend route). If you need this, file a
ticket rather than trying the command; it will error with "No such
command".

## Labels

```bash
chaotic label list             # List labels in current team
chaotic label create           # Create a new label
chaotic label delete <id>      # Delete a label
```

## Documents

```bash
chaotic doc list               # List documents in current team
chaotic doc show <id>          # Show document content
chaotic doc create             # Create a new document
chaotic doc update <id>        # Update a document
chaotic doc delete <id>        # Delete a document
```

## Await

`chaotic await` blocks until something happens in the scope you're watching,
then exits. It's the agent-harness primitive for "park this process until a
human — or another agent — does something I care about."

The command hangs on stdin/stdout, exits 0 on the first matching activity,
exits 124 on timeout. The event that caused the wake is emitted on stdout.
Under `--json`, stdout contains exactly one JSON object followed by `\n`;
all human-readable output (errors, banners) goes to stderr.

### Subcommands

`chaotic await` mirrors the top-level chaotic groups. Singular subcommands
take a positional ID and wait on that specific entity; plural subcommands
take collection filters and wait on any matching entity.

```bash
chaotic await issue CHT-1334                  # Specific issue
chaotic await issues --project CHT            # Any issue in project CHT
chaotic await doc D-91                        # Specific document
chaotic await docs                            # Any document in current team
chaotic await project CHT                     # Any activity in a project
chaotic await project                         # Current project
chaotic await sprint CHT-S24                  # Specific sprint
chaotic await sprint                          # Current sprint
chaotic await team platform                   # Any activity on a team
chaotic await team                            # Current team
chaotic await ritual code-review              # Specific ritual's next attestation
chaotic await ritual code-review --ticket CHT-1334   # Ticket-scoped ritual
chaotic await rituals                         # Any ritual attestation in current project
```

`await project` wakes on issue activity, document activity, and comments on
either, within the project. `await team` wakes on anything team-wide.
Collection filters on plurals (`issues`, `docs`) are currently limited to
`--project`. Other filters (`--sprint`, `--assignee`, `--author`,
`--status`, …) are not yet wired through; combine `--type` with `--until`
for client-side narrowing in the meantime.

**`await sprint` MVP limitation:** `await sprint [ID]` does NOT filter to
just the sprint — the backend feed doesn't carry per-sprint scope, and
the CLI doesn't fetch each event's parent issue to check its `sprint_id`.
It currently wakes on any activity in the sprint's parent project. To
narrow to sprint-specific signals, combine with `--type
moved_to_sprint,removed_from_sprint`, or with `--until` checking the
event's `sprint_name` field. True sprint scoping will land when the
backend gains a sprint-aware activity endpoint.

### Scope resolution

Each subcommand inherits the auth/team/project requirement of its
corresponding chaotic command. The CLI errors (exit 2) with a clear message
when a required scope is missing.

| Subcommand           | Required context                  | Notes                              |
|----------------------|-----------------------------------|------------------------------------|
| `await issue ID`     | auth                              | Issue identifier is globally unique |
| `await issues`       | current project                   | Mirrors `issue list`. Pass `--project` to override. |
| `await doc ID`       | current team                      | Doc IDs are team-local              |
| `await docs`         | current team                      | Mirrors `doc list`                  |
| `await project [ID]` | current team (ID optional)        | Defaults to current project         |
| `await sprint [ID]`  | current project when ID omitted   | With ID, the sprint is looked up and its parent project becomes the scope. MVP scopes to that project, not to the sprint itself. See note below. |
| `await team [ID]`    | auth (ID optional)                | Defaults to current team            |
| `await ritual NAME`  | current project                   | Ritual names are per-project. Pass `--ticket` to also wake on `intent_*` events. |
| `await rituals`      | current project                   | Wakes on ritual events project-wide, including intent lifecycle. |

`intent_opened` / `intent_cleared` / `intent_canceled` events fire at the
ticket level — one intent covers every claim-blocking (or close-blocking)
ritual on the issue at once, so the event doesn't carry a single ritual
name. Under `await ritual NAME`, intent events are only matched when
`--ticket` is also given (the wait is then bound to a specific issue;
the type filter does the rest). Without `--ticket`, intent events are
silently skipped from `await ritual NAME`. Use `await issue ID --type
intent_opened,intent_cleared,intent_canceled` or `await rituals` if you
want to wake on intents regardless of ritual name.

### Flags

```
-t, --type TYPES    Comma-separated activity types to wake on. Logical
                    tokens, mapped internally to the right backend enum
                    per entity type:
                      commented, status_changed, priority_changed,
                      assigned, unassigned, labeled, unlabeled,
                      moved_to_sprint, removed_from_sprint,
                      attested, approved, intent_opened,
                      intent_cleared, intent_canceled, lease_expired,
                      created, updated, deleted, any
                    Default: any. These tokens are a stable CLI contract;
                    they do not change if backend enum names are renamed.
                    For cross-entity scopes (project, team) a token
                    matches the equivalent activity across both issues
                    and documents.
--include-self      Wake on activity authored by the current auth
                    principal (compared on user_id). Default: excluded —
                    an agent that spawns `await` as a background
                    subprocess and keeps working should not wake itself
                    on its own ongoing activity. Note: if multiple agents
                    share one principal (e.g. a team bot), this filter
                    hides all of their activity, not just the caller's.
--timeout DURATION  Give up after DURATION. Accepted forms: integer
                    seconds (`30`), or suffixed units, combinable
                    (`30s`, `5m`, `8h`, `1h30m`; whitespace between
                    parts is fine). Zero is rejected — omit the flag
                    for no timeout. Default: no timeout. Exits 124 on
                    expiry.
--json              Emit the event as a single JSON object on stdout.
                    See "JSON output contract" below.
--until CMD         Shell predicate. When a candidate event would match,
                    CMD is executed via `sh -c CMD` with the event JSON
                    piped to its stdin. Exit 0 wakes; any non-zero exit
                    keeps polling. See "--until contract" below.
```

### Exit codes

| Code | Meaning                                                           |
|------|-------------------------------------------------------------------|
| 0    | Matching event received                                           |
| 1    | Error (see "Error handling and retries")                          |
| 2    | Usage error (invalid ID up front, missing required scope, etc.)   |
| 124  | `--timeout` expired with no matching event                        |
| 130  | Interrupted (SIGINT)                                              |
| 143  | Terminated (SIGTERM) — clean exit with a stderr message, never a partial JSON object on stdout |

### Error handling and retries

Transient failures during a wait are retried silently with exponential
backoff (1s, 2s, 4s, 8s, capped at 30s), retrying indefinitely while
`--timeout` (if any) has not expired. Transient errors include:

- Connection errors and timeouts
- HTTP 429 (rate limit)
- HTTP 5xx (server error)

Non-transient failures exit 1 with a message on stderr:

- HTTP 401/403 (auth/permission — won't self-heal without intervention)
- HTTP 404 on the initial target lookup (e.g. `await issue CHT-9999999`)
- HTTP 404 after a successful wait begins (target deleted mid-wait)
- `--until` predicate failed to execute (missing binary, not executable)

### JSON output contract

Under `--json`, stdout contains **exactly one JSON object followed by a
single `\n`**. All other output (errors, warnings, retry messages) routes
to stderr, so harnesses can safely `json.loads(stdout)` without stripping.

All fields shown below are always present. Fields that don't apply to the
event type (e.g. `document_id` on an issue activity) are present with a
`null` value, not omitted — `jq -e '.document_id'` will see the key.
The rendered (non-JSON) output is unstable and intended for human use
only; do not parse it.

```json
{
  "id": "act_48213",
  "activity_type": "commented",
  "created_at": "2026-04-19T14:22:07Z",
  "user_id": "u_42",
  "user_name": "ali",
  "user_email": "ali@example.com",
  "issue_id": "iss_9f...",
  "issue_identifier": "CHT-1334",
  "issue_title": "Polling await command",
  "document_id": null,
  "document_title": null,
  "document_icon": null,
  "field_name": null,
  "old_value": null,
  "new_value": null,
  "sprint_name": null
}
```

This shape is the CLI-stable contract, enforced by the CLI itself: the
documented keys are filled in (with `null`) even if the backend omits
them. Fields the backend adds beyond this list pass through — harnesses
should ignore unknown keys. The same normalized shape is what `--until`
predicates receive on stdin.

### `--until` contract

- **Invocation:** `sh -c CMD` (POSIX `/bin/sh`). Shell quoting rules
  apply, which is why `--until 'jq -e ".new_value == \"in_review\""'`
  parses correctly.
- **Event delivery:** the candidate event is piped to the predicate's
  stdin as a single JSON object followed by `\n`. Event data is **never**
  interpolated into CMD — adversarial values in event fields
  (`issue_title`, `old_value`, etc.) cannot inject shell commands.
- **Predicate output:** stdout and stderr of the predicate are
  discarded. This preserves `await`'s own stdout contract.
- **Exit code semantics:**
  - `0` → wake: `await` prints the event and exits 0.
  - Any other non-zero → reject: `await` keeps polling.
  - `126` (not executable) or `127` (command not found) are treated
    specially: `await` exits 1 with a clear error rather than silently
    looping forever on a broken predicate.
- **Timing:** the predicate runs synchronously on every candidate event.
  Keep it fast and side-effect-free. A single run is killed after 30
  seconds and treated like a broken predicate (`await` exits 1 with a
  clear error) — a wedged predicate would otherwise hang the wait
  forever, out of reach of `--timeout`.

### Usage patterns

**Agent parks on its current ticket.** Process blocks until a human
comments or changes status; then the harness resumes its next turn.

```bash
chaotic await issue CHT-1334 --type commented,status_changed --timeout 8h
```

**Agent waits for a ritual attestation before proceeding.** The literal
"agent yields, human gates" pattern — agent finishes work, parks until the
gating ritual is attested.

```bash
chaotic await ritual code-review --ticket CHT-1334 --timeout 24h --json
# Event JSON payload includes the attestation note; harness reads it to
# decide next step (merge, address feedback, etc).
```

**On-call agent watching a project.** Each wake is the trigger for one
agent turn; the harness re-enters `await` when the turn is over.

```bash
# In the harness (pseudo-code):
while true; do
  event_json=$(chaotic await issues --project CHT --type commented --json) \
    && handle_event "$event_json"
done
```

**Narrow wake condition via `--until`.** Wake only when the ticket
transitions to review, not on any status change. The predicate runs in
a cheap subprocess per candidate; the agent itself never sees the
non-matching events.

```bash
chaotic await issue CHT-1334 --type status_changed --json \
  --until 'jq -e ".new_value == \"in_review\""'
```

**Interactive human use.** Pass `--include-self` so you see your own edits
in the feed.

```bash
chaotic await sprint --include-self
```

### Notes for harness authors

- `await` is single-shot by design. There is no `--follow` / tail mode;
  loop by re-invoking `await` from the harness.
- The watermark (`created_at` threshold) is set internally at command
  start. Events that landed before the command started are not replayed.
  Harnesses that crash mid-wait lose events between death and restart.
- `--until` predicates should be fast and side-effect-free — they run
  synchronously on every candidate event.
- Concurrent `await` invocations are supported. No client-side
  coordination is required; each process maintains its own watermark.

## Status Values

- `backlog` - Not yet planned
- `todo` - Planned for work
- `in_progress` - Currently being worked on
- `in_review` - Awaiting review
- `done` - Completed
- `canceled` - Canceled

## Priority Values

- `no_priority` - No priority set
- `low` - Low priority
- `medium` - Medium priority
- `high` - High priority
- `urgent` - Urgent, needs immediate attention

## Relation Types

- `blocks` - Issue blocks another issue
- `relates_to` - Issues are related
- `duplicates` - Issue is a duplicate of another
