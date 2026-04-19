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
chaotic issue unblock CHT-1 CHT-2          # Remove relation
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
chaotic sprint delete <id>     # Delete a sprint
```

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
exits 124 on timeout. The event that caused the wake is emitted on stdout
(rendered by default, JSON with `--json`). Transport is polling in MVP; the
CLI contract does not change if that is later replaced with WebSockets.

### Subcommands

`chaotic await` mirrors the top-level chaotic groups. Singular subcommands
take a positional ID and wait on that specific entity; plural subcommands
take collection filters and wait on any matching entity.

```bash
chaotic await issue CHT-1334                  # Specific issue
chaotic await issues --project CHT            # Any issue in project CHT
chaotic await issues --assignee me            # Any issue assigned to me
chaotic await doc D-91                        # Specific document
chaotic await docs                            # Any document in current team
chaotic await project CHT                     # Any activity in a project
chaotic await project                         # Current project
chaotic await sprint CHT-S24                  # Specific sprint
chaotic await sprint                          # Current sprint
chaotic await team platform                   # Any activity on a team
chaotic await team                            # Current team
```

Collection filters on plurals (`issues`, `docs`) mirror the filters on the
corresponding `list` commands: `--project`, `--sprint`, `--assignee`,
`--author`, `--status`, etc.

### Flags

```
-t, --type TYPES    Comma-separated activity types to wake on. Raw values
                    from the backend vocabulary (commented, status_changed,
                    assigned, unassigned, priority_changed, moved_to_sprint,
                    removed_from_sprint, labeled, unlabeled, created,
                    updated, ritual_attested). Default: any.
--include-self      Wake on activity authored by the current auth principal.
                    Default: excluded — an agent that spawns `await` as a
                    background subprocess and keeps working should not wake
                    itself on its own ongoing activity. Pass this flag
                    (typically for interactive human use) to disable the
                    filter.
--timeout DURATION  Give up after DURATION (e.g. 30s, 5m, 8h). Default: no
                    timeout. Exits 124 on expiry. The calling harness is
                    free to impose its own timeout; this flag exists so
                    timeouts can live next to the intent they constrain.
--json              Emit the event as a single JSON object on stdout
                    instead of rendered text.
--until CMD         Predicate. When a candidate event would match, CMD is
                    run with the event JSON piped to its stdin. Exit 0
                    wakes (await prints and exits); any non-zero exit keeps
                    polling. Lets the calling agent declare its wake
                    condition up front so it only burns context on wakes
                    that actually matter.
```

### Exit codes

| Code | Meaning                           |
|------|-----------------------------------|
| 0    | Matching event received           |
| 1    | Error (network, auth, server)     |
| 2    | Usage error                       |
| 124  | `--timeout` expired               |
| 130  | Interrupted (SIGINT)              |

### Event JSON schema

With `--json`, a single object is emitted on stdout, mirroring the backend
`IssueActivityFeedResponse`. Issue activities set `issue_*` fields; document
activities set `document_*` fields; common fields are always present.

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

### Usage patterns

**Agent parks on its current ticket.** Process blocks until a human
comments or changes status; then the harness resumes its next turn.

```bash
chaotic await issue CHT-1334 --type commented,status_changed --timeout 8h
```

**On-call agent watching a project.** Each wake is the trigger for one
agent turn; the harness re-enters `await` when the turn is over.

```bash
chaotic await issues --project CHT --type commented --json
```

**Narrow wake condition via `--until`.** Wake only when the ticket
transitions to review, not on any status change. The jq predicate runs in
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
  Harnesses that crash mid-wait lose events between death and restart;
  resume semantics will come with future watermark/cursor flags.
- `--until` predicates should be fast and side-effect-free — they run
  synchronously on every candidate event.
- When the transport is upgraded from polling to WebSockets, none of the
  above contracts change.

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
