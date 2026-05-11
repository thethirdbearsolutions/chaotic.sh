# Spec: Chaotic Workspace (`chaotic sync`)

## Goal

Expose chaotic content (issues, docs) as a tree of markdown-with-frontmatter
files. Edits flow back to the server automatically via a watcher daemon;
reads are pulled on demand. Eliminates the heredoc-to-tmp-to-`$(cat ...)`
pattern for create/update and makes Grep/Glob/Read first-class for
context-harvest.

## Non-goals

- Bidirectional live sync (writes are live; reads are explicit pull)
- Conflict merging (reject-on-stale only)
- Virtual filesystem / FUSE
- Real-time co-authoring
- Comments, labels, sprints in v1

## Commands

| Command | Behavior |
| --- | --- |
| `chaotic init <dir> --project PRJ [--include issues,docs]` | One-time setup: writes `<dir>/.chaotic/{scope.json,state.db,watcher.pid}`, does initial pull, forks watcher daemon unless `--no-watch`. |
| `chaotic sync [<dir>]` | Explicit reconcile: flush pending pushes, then pull. Idempotent. |
| `chaotic pull [<dir>]` | Refresh from server. Flushes pending pushes first (best-effort). |
| `chaotic status [<dir>]` | Show locally-dirty files, server drift, watcher liveness. |
| `chaotic unmount [<dir>]` | Stop watcher. Tree remains on disk. |
| `chaotic mount [<dir>]` | Restart watcher (no initial pull). |

If `<dir>` is omitted, walks up from cwd to find `.chaotic/`.

## Filesystem layout

```
<dir>/
  .chaotic/
    scope.json        # project, include list, server URL
    state.db          # SQLite: id → path, etag, last-pushed mtime
    watcher.pid
    watcher.log
  projects/
    PRJ/
      issues/
        CHT-11.md
        CHT-12.md
      docs/
        my-doc-slug.md
```

Flat under `issues/` and `docs/` — no nesting by status/sprint, because
files moving as state changes would break Glob references mid-session.

## File format

YAML frontmatter + markdown body:

```
---
id: CHT-11
type: issue
project: PRJ
title: Search command times out on large projects
status: in_progress
assignee: alice
labels: [bug, performance]
created: 2026-04-01T12:00:00Z
updated: 2026-05-10T18:32:01Z
etag: "abc123"
---

Reproduces on projects with >1000 issues...
```

`id`, `etag`, `created`, `updated` are server-managed. Hand-edits to those
fields are silently overwritten on next sync. A file with no `id` is a
creation; on first successful push, the watcher renames the file to
`<server-assigned-id>.md`.

## Push semantics (watcher)

1. inotify event on `*.md` under `<dir>/projects/`.
2. Debounce 500ms per path (coalesce rapid saves).
3. Parse frontmatter. Read `etag` (or absent → create).
4. `PUT /api/issues/{id}` with `If-Match: <etag>` (or `POST` for create).
5. On 200: rewrite local frontmatter `etag`/`updated` from response.
6. On 412 (stale): write `<file>.conflict.md` containing server version,
   leave local file alone, append to `watcher.log`, surface via
   `chaotic status`.
7. On network error: retry with exponential backoff (2s, 4s, 8s, 16s);
   beyond that, leave dirty and surface via status.

Deletions (file removed locally) → archive on server. Restores via pull.

## Pull semantics

`chaotic pull`:

1. Flush any local pending pushes (best-effort, same logic as watcher).
2. `GET /api/issues?project=PRJ&since=<state.last_pull>` (paginated).
3. For each entity:
   - Server etag matches state.db: skip.
   - Server newer, local clean: overwrite, update state.db.
   - Server newer, local dirty (mtime > state.last_push): write
     `<file>.conflict.md` with server version, leave local alone.
4. Renames (slug changed server-side) move the file; state.db tracks
   id → path so Edit references can be reconciled.

## Watcher daemon

- Single instance per `<dir>` enforced by `flock` on `watcher.pid`.
- Forked subprocess of `chaotic init` / `chaotic mount`.
- Heartbeat every 30s to `watcher.log`.
- On crash, `chaotic status` warns "watcher not running"; local edits
  remain safe on disk and flush on next `chaotic sync`.

## Auth

Reuses CLI credentials (config file or env). `init` fails fast if creds
are missing or invalid.

## Platform support (v1)

- Linux + macOS: watcher via `watchdog` (inotify / FSEvents).
- Windows: `chaotic sync` works; no watcher (documented limitation).

## Out of scope (v2+)

- Comments (append-mostly — different ergonomics)
- Labels, sprints, projects as files
- Multi-project workspaces
- Server→local live updates (`--watch` mode upgrades the watcher into a
  full bidirectional daemon)
- Windows watcher
