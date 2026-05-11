# Working with chaotic content from the shell

> Status: design fiction. This is what using the feature will feel like
> once it ships. Code does not exist yet. See
> [ADR-0004](../adr/0004-cli-content-io.md) and
> [the spec](../specs/cli-content-io.md).

Four small changes that kill the
`cat > /tmp/foo <<EOF ... ; chaotic doc create --body "$(cat ...)"`
pattern without introducing a daemon, a sync engine, or a new mental
model. Each composes; you can use any one without the others.

## Long content, no tmp file

Heredoc directly to stdin:

```bash
chaotic doc create --project PRJ --title "Title — what it would take" \
    --body - <<'EOF'
# Long doc

…body content with `backticks`, $variables, em-dashes — all fine…
EOF
```

Or read from a file:

```bash
chaotic doc create --project PRJ --title "..." --body @./draft.md
```

Same convention works for `--description`, `--comment`, `--content` —
every long-text flag in the CLI.

## Create from a file

When the content already lives in a file with frontmatter:

```bash
$ cat > triage-notes.md <<'EOF'
---
project: PRJ
title: Triage backlog from May standup
priority: medium
---

Items to triage…
EOF

$ chaotic issue create ./triage-notes.md
Created CHT-48
```

The file isn't modified or moved. Your move whether to keep it,
rename it, or delete it.

## Dump a tree for context-harvest

Materialize a read-only snapshot of a project:

```bash
$ chaotic dump ./scratch --project PRJ
Wrote 47 issues, 12 docs to ./scratch/projects/PRJ/

$ tree -L 4 ./scratch
./scratch
├── .dump-meta.json
└── projects
    └── PRJ
        ├── docs
        │   ├── architecture.md
        │   └── onboarding.md
        └── issues
            ├── CHT-11.md
            └── ...
```

Then use your favorite tools:

```bash
$ grep -l "rate limit" ./scratch/projects/PRJ/issues/*.md
./scratch/projects/PRJ/issues/CHT-19.md
./scratch/projects/PRJ/issues/CHT-31.md
./scratch/projects/PRJ/issues/CHT-42.md
```

The dump is point-in-time. `.dump-meta.json` records when:

```bash
$ jq .timestamp ./scratch/.dump-meta.json
"2026-05-11T14:32:01Z"
```

Re-run with `--overwrite` to refresh:

```bash
$ chaotic dump ./scratch --project PRJ --overwrite
```

Or incrementally — only records updated in the last hour are rewritten:

```bash
$ chaotic dump ./scratch --project PRJ --since 1h --overwrite
Wrote 3 issues, 0 docs (changed since 2026-05-11T13:32:01Z).
```

When done, just delete it: `rm -rf ./scratch`. No daemons to stop, no
state to clean up, no risk of stale watcher processes.

## Edit-show-update round trip

For copy-edits to an existing record:

```bash
$ chaotic issue show --raw CHT-11 > /tmp/cht-11.md
$ $EDITOR /tmp/cht-11.md
$ chaotic issue update CHT-11 --description @/tmp/cht-11.md
Updated CHT-11
```

In an agent context that's: Read tool → Edit tool → one CLI call. No
heredoc, no `$(cat ...)`, no shell escaping.

## What this is NOT

* It's **not a workspace**. There's no `.chaotic/` directory, no
  watcher process, no sync engine. Edits to files in a dump do not
  reach the server — writes always go through CLI commands.
* It's **not magic**. Each piece is a small flag or a small command.
  Use what helps; skip what doesn't.
* It does **not** replace `chaotic await`, `chaotic issue update`, or
  any existing primitive. It augments them.

## Composition with `chaotic await`

The two compose naturally for an agent's outer loop:

```bash
chaotic dump ./s --project PRJ                       # harvest
# ...do work, make changes via CLI...
chaotic await issues --assignee me --timeout 1h      # park
chaotic dump ./s --project PRJ --overwrite           # refresh
# ...continue...
```

## What this gives up

* No automatic refresh — dumps drift from server reality until you
  re-run them. `.dump-meta.json` makes staleness visible; that's the
  whole mitigation.
* No write-through tree — bulk-editing 40 issue bodies is still 40 CLI
  calls (composable with `find -exec` or `xargs`).
* No 412 conflict resolution — there's nothing to conflict, because
  edits to dump files never push anywhere.

If those gaps turn out to matter in practice, ADR-0003's workspace
design is still in the history, ready to be reconsidered with new
evidence.
