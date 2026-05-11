# ADR-0003: Filesystem workspace for chaotic content

* **Status**: Superseded by [ADR-0004](0004-cli-content-io.md)
* **Date**: 2026-05-11

> Superseded after a sci-fi review surfaced four serious problems with
> the workspace design: VISION misalignment (server-side rules become
> invisible 412s instead of CLI errors agents can adapt to), two write
> paths with no precedence rule, Git-shaped vocabulary colliding with
> existing `chaotic status`, and silent watcher-death breaking the
> "no edit lost" guarantee. See ADR-0004 Context for the full
> reasoning. This ADR is retained as design history.

## Context

Agents using the chaotic CLI hit chronic friction passing multi-line
content as command arguments. The workaround observed in the wild:

```bash
cat > /tmp/long-doc.md <<'EOF'
...long content...
EOF
chaotic doc create --project PRJ --title "X" --body "$(cat /tmp/long-doc.md)"
```

This is ugly, fragile (shell escaping of backticks, `$`, em-dashes),
leaves tmp files behind, and doesn't generalize. It also doesn't help
the *read* path: agents harvesting context across many issues today
have no better option than scripting `chaotic issue show` in a loop.

The underlying constraint shaping the design space is asymmetric:
forgetting to push loses work; forgetting to pull yields stale reads
(recoverable). Whatever we build, the *write* direction has to be
hard to forget.

## Decision

Expose chaotic content (initially: issues + docs, scoped by project)
as a tree of markdown-with-frontmatter files. New commands
`chaotic init`, `chaotic sync`, `chaotic pull`, `chaotic status`,
`chaotic unmount`, `chaotic mount`. A small watcher daemon, started
by `init`, pushes local edits automatically; pulls remain explicit.

Conflict resolution is reject-on-stale via per-record ETag, with the
server version landing in a sidecar `<file>.conflict.md` for the
agent or human to reconcile.

Layout is flat under `projects/<PRJ>/issues/` and
`projects/<PRJ>/docs/` — no nesting by status or sprint, because
files moving as state changes would break Glob references and Edit
context mid-session.

See `docs/specs/workspace-sync.md` for the technical spec and
`docs/scifi/workspace-sync.md` for the intended UX.

## Consequences

**Positive.** The heredoc-to-tmp pattern goes away for issues and
docs. Grep / Glob / Read become first-class for context-harvest.
Bulk operations become `sed -i` or shell loops over the tree. Humans
get the same workflow as agents — single mental model.

**Negative.** New surface to maintain: watcher daemon, frontmatter
schema, sync engine. Stale-read footgun until `chaotic pull` becomes
muscle memory. Windows v1 has no watcher — explicit sync only. Two
ways to mutate chaotic content (CLI commands and filesystem); both
paths must remain coherent.

**Follow-ups.**

* v2: extend entity scope (comments, labels, sprints, projects).
* v2: `chaotic sync --watch` upgrading the watcher into a full
  bidirectional daemon. Built *on top of* `chaotic await`'s event
  stream (see "Relationship to `chaotic await`" below) — not a
  parallel notification mechanism.
* v2: Windows watcher.
* Independent: MCP server for non-shell agents.
* Independent: `@file` / stdin convention on existing CLI flags as a
  polish item compatible with this proposal.

## Relationship to `chaotic await`

`chaotic await` is a complementary primitive: a one-shot blocking
command that exits 0 on the first matching activity in a scope (issue,
project, sprint, team, ritual), emitting the event as JSON on stdout.
It answers "block until something happens"; this proposal answers
"read/edit chaotic content as files." They compose naturally:

```bash
chaotic init ./ws --project PRJ
cd ws
# ...edit files, watcher auto-pushes...
chaotic await issues --assignee me --timeout 1h
chaotic pull   # refresh tree before next batch
```

Two coordination points worth getting right up front, even though
they only bite in v2:

1. **The v2 live-pull daemon must consume await's event stream**,
   not implement its own polling or push channel. One notification
   mechanism, multiple consumers. If we duplicate, we'll end up with
   two server-side push channels (SSE / WebSocket / etc.) when that
   eventually lands.

2. **`state.db` should record a `last_seen_event_id`** from the
   await event stream. That turns `chaotic pull` from a full
   list-and-diff into "give me everything since this event,"
   which is dramatically cheaper at scale and gives v2 a
   trivial implementation: `await --json | xargs -n1 chaotic pull-one`.

If await's JSON event schema is treated as a stable contract (it's
documented as such in the CLI README), workspace-sync can lean on it
without coupling to backend internals.

## Alternatives considered

**`@file` / stdin convention on existing flags.** Curl-style
`--body @path` and `--body -` trim the `$(cat ...)` but still
require heredoc-to-tmp for `@`. Doesn't help context-harvest at all.
Insufficient on its own, though worth doing as polish.

**File-as-positional for create commands.** `chaotic doc create
path.md` covers creation cleanly but not updates, and doesn't help
reads. Partial.

**MCP server for chaotic.** Eliminates shell entirely for MCP-capable
agents — best long-term answer for that subset. But large scope: new
transport, auth, schema kept in sync with CLI. Deferred; not
exclusive with this proposal.

**Git-style checkout / commit / push.** Surface looks similar but the
metaphor misleads: chaotic content is server-authoritative records,
not co-authored text with divergent histories. Branch/merge semantics
don't apply, and "resolve conflict" on a status field isn't a
meaningful operation.

**FUSE virtual filesystem.** True mount feel but: kernel-level,
macFUSE licensing, no clean Windows path, daemon complexity
dominates value. Overkill.

**Full bidirectional daemon (push + pull both automated).**
Eliminates the "forgot to sync" failure mode entirely. Rejected for
v1 due to: server-pulls-while-agent-edits race condition, requires
backend push channel or polling load, doubles test surface. Strict
superset of the chosen design — can upgrade later without
architectural rewrite.

**Explicit `chaotic sync` only, no watcher.** Simplest possible.
Rejected because "agent edits file, forgets to sync, wanders off" is
a silent-data-loss failure mode — strictly worse than the heredoc
pattern this replaces, which at least produces visible CLI output.

**CRDT-based merge.** CRDTs guarantee convergence to *a* state, not
convergence to a *meaningful* state. Chaotic records have semantic
invariants (status × assignee × due-date coherence) that arbitrary
merges can violate. Reject-on-stale puts the server in charge and
surfaces conflicts explicitly. (Cf. Kleppmann, *CRDTs: The Hard
Parts*.)
