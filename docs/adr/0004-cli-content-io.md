# ADR-0004: Ergonomic multi-line content in the CLI

* **Status**: Proposed
* **Date**: 2026-05-11
* **Supersedes**: [ADR-0003](0003-workspace-sync.md) (Filesystem workspace for chaotic content)

## Context

Agents using `chaotic` hit chronic friction passing multi-line content to
write commands. The workaround observed in the wild:

```bash
cat > /tmp/long-doc.md <<'EOF' ... EOF
chaotic doc create --body "$(cat /tmp/long-doc.md)"
```

Agents also struggle to harvest context across many records: there's no
better option today than scripting `chaotic issue show` in a loop.

ADR-0003 proposed a bidirectional filesystem workspace — `chaotic init`
materializing a tree, a watcher daemon auto-pushing on save, etc. A
sci-fi review of that design surfaced four serious problems:

1. **VISION alignment.** Today the human's control plane (gates, rituals,
   label policies — see ADR-0001 and ADR-0002) reaches the agent as CLI
   error strings the agent reads and adapts to. Through a write-side
   filesystem, those become 412s and `.conflict.md` sidecars with no
   actionable rule-violation payload. Server-side enforcement becomes
   invisible — a silent regression on the project's core thesis.
2. **Two write paths.** CLI mutations and file edits with no precedence
   rule — silent overwrites guaranteed in either direction.
3. **Git-shaped vocabulary** (`init`/`pull`/`status`/`conflict`) collided
   with `chaotic status` (which already exists for context display) and
   set Git branch/merge expectations the design explicitly rejected.
4. **Watcher silent-death** broke the "no edit silently lost" guarantee
   — agents don't run `status` between edits, so a dead watcher means
   ten edits stack up dirty before anyone notices.

The review's strongest critique: ADR-0003 dismissed simpler alternatives
as "insufficient on their own" without honestly costing them against the
proposed daemon + sidecar SQLite + new six-verb vocabulary.

## Decision

Ship four small, independent changes rather than the workspace daemon.
Each is useful on its own and composes with the others and with
`chaotic await`.

1. **`chaotic dump <dir> --project PRJ [--include issues,docs]`** —
   one-shot, read-only mirror. Materializes a tree of
   frontmatter-plus-body markdown under `<dir>/`. No `.chaotic/`, no
   daemon, no state file. Throw away with `rm -rf`. Re-run to refresh.

2. **`--body @path` / `--body -` (stdin)** on existing long-text flags
   (`--body`, `--content`, `--description`, `--comment` — 13 sites
   across `cli/src/cli/commands/`). Same convention as `curl`. Lets
   agents heredoc directly to stdin: `chaotic doc create --body -
   <<'EOF' … EOF`, no tmp file.

3. **`chaotic doc create <path.md>` / `chaotic issue create <path.md>`**
   — file-as-positional. The file IS the content, with YAML frontmatter
   for structured fields. Agent uses Write tool once, then one CLI call.

4. **`chaotic show --raw <id>`** — single-entity dump in the same
   frontmatter + body format. For when one record, not a tree, is what
   you need.

Writes still flow through the CLI. Every server-side rule keeps its
teeth.

## Consequences

**Positive.**

* Heredoc-to-tmp-to-`$(cat ...)` goes away. Either stdin or `@file`
  works.
* Context-harvest is first-class: `chaotic dump ./s --project PRJ &&
  grep -l "rate limit" s/projects/PRJ/issues/*.md`.
* Environment-control rules (ADR-0001, ADR-0002) keep their teeth —
  there's no side-door write channel and no invisible 412 surface.
* Zero new daemons, zero persistent state. Each piece is a day of work
  or less; the bundle ships in a sprint.
* Composes naturally with `chaotic await`: dump, harvest, await human,
  refresh dump.

**Negative.**

* Dump is point-in-time. Re-run to refresh. Stale-read footgun — but
  the failure mode is "old data," not "lost data," and is recoverable.
* No write-through-file ergonomic for *updating* existing records
  beyond `--body @file`. Bulk-editing 40 issue bodies still costs 40
  CLI calls (composable with `find -exec`, but not as cheap as
  `sed -i` over a writable tree).
* `dump` writes a snapshot to disk that drifts from server reality
  silently. Mitigation: emit `.dump-meta.json` with timestamp and
  scope so staleness is visible.

**Follow-ups.**

* Revisit a write-through file mode only if observed pain after this
  ships demonstrates it's needed. Concrete trigger: agents repeatedly
  bulk-editing N issues' bodies in a single session.
* MCP server for chaotic (independent track — eliminates shell
  entirely for MCP-capable agents).

## Alternatives considered

**Full workspace-sync (ADR-0003).** See that ADR for the design and
this ADR's Context for why we walked it back. Strict superset of the
chosen design — resurrectable with cause.

**`chaotic dump` plus a write-side tree, no daemon.** Tempting middle
ground. Rejected: any write-side tree reintroduces the two-write-paths
problem and the server-rule-invisibility problem even without a
watcher.

**Keep only `--body @file` / stdin; drop the dump.** Solves the
original heredoc complaint but leaves context-harvest pain untouched.
The dump is small enough that there's no reason to drop it.

**JSON-Lines bulk export (`chaotic issue list --format jsonl`) instead
of a markdown tree.** Cheaper to implement but loses Grep/Read/Glob
fluency — agents pipe through `jq` instead of reading markdown.
Markdown files are the native agent-fluent shape.

**Per-entity edit/save round trip as a primary verb (`chaotic edit
CHT-11` → temp path → `chaotic save`).** Considered en route to the
ADR-0003 design and dismissed: it's neither as ergonomic as
`show --raw > file; edit; update --body @file` (which uses primitives
already on the table here) nor as powerful as the workspace it tried to
substitute for.

## Open concerns (deferred)

After a clean-slate review of this ADR by a fresh reviewer (no prior
context), two critiques surfaced that are *not* yet addressed and that
warrant ferment before the larger pieces of this design ship. The
narrow `--body @path` / `--body -` slice avoids both — see "Status"
note below.

**1. The `dump` temptation.** Even with no daemon, `chaotic dump`
writes ordinary markdown files that look writable. Agents that
discover `dump` will eventually try editing dumped files and expect
the changes to propagate. They won't — `dump` is read-only — and the
failure is silent (the agent's edit just sits on disk). ADR-0003 was
rejected partly for the silent-data-loss surface a write-side
filesystem creates; a read-only dump reintroduces ~80% of the
temptation with 0% of the guardrails. Concrete unaddressed mitigations:
`chmod -w` on dumped files, a "this file does not push" banner inside
each file, naming (`dump` → `snapshot` or `export` to imply
non-restorability), or simply not shipping `dump` until we have a
clear story.

**2. `dump` and `chaotic await` pull in opposite directions.** `await`
is designed to keep the agent on the live edge — block until the
server moves, react to fresh state. `dump` anchors the agent to a
point-in-time snapshot. The sci-fi doc claims they compose ("dump,
work, await, refresh dump") but the composition is shallow: an agent
that harvests context from a dump and then makes plans against it is
reasoning about a world that no longer exists. CLI commands will
surface the divergence as runtime errors, but the *planning* horizon
gets corrupted silently.

**Status note.** The four-piece bundle in this ADR is not committed
to in full. The narrow `--body @path` / `--body -` slice is being
shipped as a small standalone change because it has neither
problem above (no on-disk surface, no staleness window). The other
three pieces (`dump`, `show --raw`, file-as-positional create)
remain Proposed pending: signal from real use that the harvest pain
justifies the temptation surface; resolution of how dumped files
should warn against editing; and consideration of whether a unified
`chaotic content` noun family (export / show / apply) is the better
shape than three independent additions.
