# Changelog

All notable changes to `chaotic-cli` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [PEP 440](https://peps.python.org/pep-0440/) versioning.

## [0.1.0a17] - 2026-07-11

Keyboard-navigation wave for the web UI. No CLI changes since a16 — this
release republishes the CLI in lockstep with the frontend it ships alongside.

### Added

- **Roving keyboard focus across list views** — Arrow/Home/End move focus
  through the sidebar nav links, and `j`/`k` alias ArrowDown/ArrowUp in every
  list-nav handler (CHT-1288, CHT-1289).
- **Keyboard nav inside inline field dropdowns** — open, move through, and
  select inline field editors without reaching for the mouse (CHT-1290).
- **List navigation on the Sprints and Epics views** — the same roving-focus
  list nav now covers the Sprints and Epics views (CHT-1291).

## [0.1.0a16] - 2026-07-05

_Drafted 2026-05-16, expanded 2026-07-05 before first publish; a16 never
shipped in between, so everything below lands together._

### Added (2026-07-06/07) — the feature wave

- **`chaotic issue ready`** — "what can I start right now": open, unblocked,
  unclaimed, priority-sorted, epics excluded. `--mine`, `--all-projects`, `--json`.
- **Claim leases** — `issue start` atomically claims (409 `already_claimed` on
  races) and takes a lease (default 2h, `--lease 4h`, re-claim extends). Expired
  leases self-release lazily and loudly: activity event + broadcast, and
  `chaotic await issue X --type lease_expired` wakes on it. Crashed agents no
  longer wedge issues.
- **MCP servers, both transports** — `chaotic mcp` (stdio) for local harnesses
  (`claude mcp add chaotic -- chaotic mcp`) and `/mcp` on the backend
  (Streamable HTTP) for claude.ai / Claude Code web / anything URL-based.
  Ten identical tools, drift-tested. Auth: `Authorization: Bearer <api-key>` or
  a `/mcp/<key>` capability URL (redacted from server logs; use a dedicated
  key — `chaotic auth keys create phone --expires-in 90d`).
- **Inbox** — one "awaiting you" surface: pending gates, mentions, assignments,
  review requests. Unread badge, live updates, `g w`, `chaotic inbox --json`.
- **Email delivery** — SMTP (env-configured, fail-soft when absent) for gate
  requests (with issue deep-link) and team invitations (accept URL) — invites
  are finally deliverable without reading the database.
- **Revision history** — every issue-description and document edit snapshots
  automatically; side-by-side diff viewer; `chaotic issue history` /
  `chaotic doc history`; conflict warnings now guarantee overwrites are
  recoverable.
- **Project config templates + starter packs** — snapshot a project's rituals
  and settings as a reusable template (`template create --from-project`,
  `apply`, YAML `export`/`import`), or start from a bundled pack (`rigor`,
  `consulting`, `human-led`, `solo-agent`): `chaotic project create KEY
  --template rigor`. Apply is idempotent and never deletes.

### Added (2026-07-05)

- **`chaotic await`** — block until matching activity arrives, then exit with the
  event. `await issue <id>`, `await ritual <name>`, `await sprint`, `await issues`,
  `await team/project`, with `--type` filters, `--until` predicates, `--timeout`
  (exit 124), `--include-self`, `--json`. The agent-harness primitive for "park
  this process until something I care about happens."
- **`--json` on every mutation and state-transition command** — a single JSON
  value on stdout (created/affected entity ids included), all human output on
  stderr. Holds even for parse-time errors (bad flags, invalid choices) and
  confirmation refusals. Exit-code contract documented in the README:
  0 success / 1 error / 2 usage / 124 await-timeout.
- Heredoc/`@file`/stdin input for long-text flags (descriptions, comments, docs).
- `chaotic issue list --all-projects`; server-side label filtering (`--label a,b`
  = ALL, now pinned by tests).
- `/health` verifies a real DB round-trip and reports `db` + `version`;
  `chaotic system status` distinguishes ok / degraded / unreachable.

### Fixed (2026-07-05)

- `system install` no longer prints a success banner when the server didn't
  start; `system reconfigure` failure-path recovery instructions render actual
  values instead of literal placeholders.
- `is_service_running()` parses real `launchctl` output on macOS (every caller
  previously saw False-while-running).
- `system upgrade` rebuilds the frontend bundle.
- Validation errors no longer echo submitted values (e.g. passwords) back to
  the terminal, and render readably instead of as a raw Python repr.
- Confirmation prompts go to stderr; under `--json` without `--yes`, commands
  refuse with a machine-readable error instead of hanging on a prompt.
- `issue mine` / `sprint add` / `sprint remove` no longer make N+1 HTTP calls.

### Changed (2026-07-05) — upgrade server and CLI together

- The CLI targets the server's path-nested routes (`/teams/{id}/projects`,
  `/projects/{id}/issues`, ...); the old flat query-param routes were removed
  server-side in the same release. `chaotic system upgrade` updates both sides.
- Backend ORM upgraded (oxyde 0.3.1 → 0.7.x) with data migrations 0006–0008
  (datetime + enum storage normalization, uniqueness backstops). `system
  upgrade` backs up the DB before applying, as always.

### Fixed

- **`chaotic system install` / `upgrade` are broken on `0.1.0a15`** — the published artifact still shells out to `alembic upgrade head`, but the backend no longer ships alembic. Fresh installs and in-place upgrades both fail until this release. `system upgrade` now invokes the project's current migration tool, falls back safely on databases that pre-date the current schema tooling, and reinstalls the `chaotic` binary so the user-installed CLI picks up new code. The riskiest paths back up the database and confirm before applying migrations.
- `RecursionError` on any interactive confirmation prompt (e.g. `chaotic system reconfigure` without `--yes`) — the confirmation helper recursed into itself.
- `IssueTypeChoice.get_metavar()` signature mismatch with newer versions of Click.

### Added

- `chaotic activity` — recent team activity feed.
- `chaotic comments` — unified team-wide comments view across issues and documents (with `--json`).
- `chaotic profile create | show | delete` — manage named profiles from the CLI. Creation supports `--api-url` / `--api-key`; show masks secrets; delete guards the active profile and supports `--yes`.
- `chaotic ritual show` — inspect ritual details.
- `chaotic sprint transactions` — view sprint transaction history.
- `chaotic label update` — edit a label's `--name`, `--color`, or `--description`.
- `chaotic team remove-member`, `chaotic team role`, `chaotic team invitations`, `chaotic team cancel-invite` — team membership and invitation management.
- `chaotic issue comment-edit` / `comment-delete` and `chaotic doc comment-edit` / `comment-delete`.
- Atomic comment-and-assign: `chaotic issue comment ... --assign-to <user>` and `chaotic issue assign ... --comment <msg>`.
- `chaotic issue update --no-sprint` to clear sprint assignment (mirrors `--no-parent`).
- `chaotic issue list --assignee <me|name|id>` and `--parent` as an alias for `--epic`.
- `chaotic issue search --status` filter.
- `--json` output on `issue view` / `issue get` aliases and on `ritual list` (including with `--pending`).
- Issue-type aliases on `--type`: `feat` / `improvement` → `feature`, `doc` → `docs`, `debt` / `techdebt` / `tech-debt` → `tech_debt`.
- Bare sprint-number resolution (e.g. `44` matches `Sprint 44`).
- `doc create` accepts `--description` as an alias for `--body` / `--content`.

### Changed

- `--profile` / `-p` can now appear anywhere on the command line, including after subcommand names.
- `chaotic sprint create` is now a no-op that reports the current active sprint. Sprints are managed implicitly by sprint rotation; manual creation previously produced orphaned duplicates. The legacy `--budget` / `--description` / `--no-budget` options are accepted but hidden.
- All `chaotic doc ...` commands now require an active team context.
- `epic list` no longer fetches sub-issues per row; the table shows `estimate` instead. Use `epic show` for progress detail.
- Network failures (connection errors, timeouts, generic HTTP errors) surface clean messages instead of raw tracebacks.

## [0.1.0a15] - 2026-02-20

Prior releases were not tracked in this file. See the git history for details.
