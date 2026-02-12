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
