# Working with chaotic from the filesystem

> Status: design fiction. This is what using the feature will feel like
> once it ships. Code does not exist yet.

Tired of `cat > /tmp/foo <<'EOF' ... EOF; chaotic doc create --body "$(cat /tmp/foo)"`?
Now you don't have to.

`chaotic init` mounts a slice of your chaotic content as a regular
directory of markdown files. Edit with your editor, your agent, `sed`,
whatever. Changes flow back to the server automatically.

## Quick start

```bash
$ chaotic init ~/work/prj --project PRJ
Pulling... 47 issues, 12 docs.
Watcher started (PID 28491). Saves auto-push.

$ cd ~/work/prj
$ tree -L 3
.
└── projects
    └── PRJ
        ├── docs
        │   ├── architecture.md
        │   └── onboarding.md
        └── issues
            ├── CHT-11.md
            ├── CHT-12.md
            └── ...
```

## Editing

Open the file. Frontmatter is structured fields; the body is markdown.

```bash
$ cat projects/PRJ/issues/CHT-11.md
---
id: CHT-11
title: Search times out on large projects
status: in_progress
assignee: alice
labels: [bug, performance]
---

Reproduces on projects with >1000 issues. Stack trace attached.
```

Edit. Save. Done — the watcher pushes within a second. No
`chaotic issue update`, no `--description "$(cat ...)"`, no escaping
backticks or em-dashes.

## Creating

Drop a new file with frontmatter and no `id`:

```bash
$ cat > projects/PRJ/issues/_new-triage.md <<'EOF'
---
type: issue
project: PRJ
title: Triage backlog from May standup
priority: medium
---

Items to triage from the 2026-05-10 standup...
EOF
```

The watcher assigns a server ID on push and renames the file:
`projects/PRJ/issues/CHT-48.md`. Your shell sees the rename via inotify
too, so if you `$ ls` you'll see the new name.

## Bulk edits

```bash
# Re-label every issue mentioning a deprecated subsystem
$ grep -l "legacy-search" projects/PRJ/issues/*.md \
  | xargs sed -i 's/labels: \[/labels: [legacy, /'
```

47 issues, one push each, no `chaotic issue update --add-label` loop.

## Context harvest

The whole point — agents grep, glob, read:

```bash
$ grep -l "rate limit" projects/PRJ/issues/*.md
projects/PRJ/issues/CHT-19.md
projects/PRJ/issues/CHT-31.md
projects/PRJ/issues/CHT-42.md

$ chaotic pull   # if you want fresh data first
```

## When the server moves under you

If someone edits CHT-11 on the web while you're editing locally, your
next save gets a 412 and the server version lands next to yours:

```
projects/PRJ/issues/CHT-11.md            (your version)
projects/PRJ/issues/CHT-11.md.conflict   (server version)
```

Reconcile by hand, save, delete the sidecar. Nothing is lost silently.

## Status & teardown

```bash
$ chaotic status
Watcher: running (PID 28491)
Pending push: 0
Conflicts: 0
Last pull: 2 minutes ago

$ chaotic unmount
Watcher stopped. Tree preserved at ~/work/prj.

$ rm -rf ~/work/prj   # if you want it gone
```

## Limits (v1)

- Issues and docs only. Comments stay on the CLI for now.
- One project per workspace.
- macOS and Linux get the watcher. Windows uses explicit `chaotic sync`.
- Forgetting to `chaotic pull` means stale reads — but pushes are
  automatic, so no edit is ever silently lost.
