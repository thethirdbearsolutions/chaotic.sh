# Changelog

All notable changes to `chaotic-cli` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [PEP 440](https://peps.python.org/pep-0440/) versioning.

## [0.1.0a20] - 2026-10-13

Server and CLI changes merged since a19 (PRs #303-#309). This release
carries two database migrations: run `chaotic system upgrade`, which backs
up and migrates before restarting, rather than restarting the service by
hand.

### Upgrade notes

- **MCP clients must reconnect**: `ritual_attest` and `ritual_complete` gained
  parameters, so a cached toolset is stale (compare `server_info`'s
  `mcp_tool_count` and fingerprint).
- **A note alone no longer clears a ritual that declares an artifact**, and an
  a19 CLI cannot attest such a ritual; upgrade the CLI with the server.
- **Roll back by restoring the pre-upgrade backup**, not by `oxyde migrate`
  downgrading past 0018.

### Added

- **Ritual artifacts** — a ritual can declare an `artifact` (a document or
  a URL) that an attestation must point at: `chaotic ritual create/update
  --artifact`. Attesters supply it with `chaotic ritual attest/complete
  --document` (id, prefix or title) or `--url`, the MCP `ritual_attest` and
  `ritual_complete` tools gain `document` and `url`, and the web UI has an
  artifact selector. A document must exist, belong to the ritual's team, be
  the attester's own, be newer than the sprint or ticket, and back only one
  attestation; a URL must be http(s) with a host. `ritual show` prints the
  artifact (CHT-1359; migration 0018).
- **Every client-facing API route is reachable from the CLI client**, and
  every paginated list method takes `skip`/`limit`, so REST callers are no
  longer stuck on the first page (CHT-1383).

### Fixed

- **Zero-point estimates** show as `0` everywhere (issue, sprint and epic
  views, the web UI) instead of "No estimate", and `epic create --estimate`
  warns on off-scale values like `issue create` does (CHT-1406, CHT-1407).
- **Blocking cycles under concurrency** — the cycle check runs inside the
  insert's transaction behind SQLite's writer lock, so two racing inverse
  `blocks` edges can no longer both land (CHT-1311).
- `get_pending_gates` requires `project_id`, matching the route (CHT-1383).

### Internal

- Migration 0017 records the schema that hand-written migrations 0005-0016
  produced, so `oxyde makemigrations` works again; it executes nothing
  (CHT-1410, CHT-1412).
- Rolling SQLite backup script, `scripts/sqlite-backup.sh`: ten slots across
  minute, hour, daily and weekly tiers, with a disk guard and a lock
  (CHT-1418). Opt-in: nothing installs or schedules it; run it from cron or a
  systemd timer.
- ADR-0002 amended: access control is enforced above the service layer, and
  `foreign_keys` is ON (CHT-1457).

## [0.1.0a19] - 2026-09-06

Server and CLI changes merged since a18 (PRs #266-#301): the September
maintainability review. This release carries two database migrations
(0015, 0016): run `chaotic system upgrade`, which backs up and migrates
before restarting.

### Upgrade notes

- **MCP clients must reconnect**: both MCP transports moved to the `mcp`
  2.x API (`mcp>=2.1,<3`), list tools return compact rows, and errors use
  one envelope. Compare `server_info`'s `mcp_tool_count` and fingerprint
  with what your client cached.
- **Sprint `start_date`/`end_date` are gone**: they are renamed
  `activated_at`/`closed_at` and are now outputs the server stamps, not
  inputs (migration 0016). `SprintCreate`/`SprintUpdate` no longer accept
  dates.
- **The unused sprint token budget is removed** (`token_budget`,
  `tokens_spent` and their derived fields; migration 0015).

### Added

- **Eight new MCP tools (30 to 38)**: the inbox (`inbox_list`,
  `inbox_mark_read`, `inbox_mark_all_read`), revision history
  (`issue_revisions`, `issue_revision`, `doc_revisions`, `doc_revision`),
  and `server_info`, which reports the commit, version and toolset
  fingerprint the server is running (CHT-1335, CHT-1338, CHT-1364,
  CHT-1401).
- **Claim and close refusals report each ritual's attestation state**,
  and `sprint_close` names the rituals limbo is waiting on (CHT-1360,
  CHT-1381).
- **Off-scale estimate warnings**: an estimate outside the project's
  declared scale is stored and reported back as a warning (CHT-1365).
- **A brand-new database gets its schema from the migration chain at
  startup** (CHT-1195).

### Changed

- **`chaotic system upgrade` refuses silent downgrades** (backward or
  diverged targets need `--allow-downgrade`) and verifies that the new
  process, not a stale one, answers the port (CHT-1357, CHT-1363).
- **`chaotic system backup` snapshots through SQLite's online backup API**,
  so a backup taken against a running server is consistent (CHT-1207).
- **MCP list tools** (`issue_list`, `issue_ready`, `doc_list`,
  `project_list`) return compact rows with `count` and `truncated`, and
  issue rows carry resolved names for their foreign keys (CHT-1370,
  CHT-1371).
- `issue_ready` refuses instead of silently widening to the whole team
  (CHT-1355).
- API keys are verified with SHA-256 instead of bcrypt (~260 ms less CPU
  per request); legacy hashes still work and are upgraded on first use
  (CHT-1369).
- Round-robin ritual groups rotate with the sprint and advance on
  ticket claim/close; a group's members must share a trigger (CHT-1280,
  CHT-1403, CHT-1405, CHT-1408).

### Fixed

- **`--estimate 0` is a zero-point estimate**, not "unset" (CHT-1397).
- **Enum filters match**: `DbEnum` registers each enum class on Oxyde's
  filter path, so filtering by a member matches its stored name
  (CHT-1398).
- `close_sprint` claims both transitions with a conditional UPDATE, so
  two racing closes cannot both rotate (CHT-1404).
- Editing an issue description or document always snapshots a revision
  (CHT-1340).

### Internal

- API functions return their response schema by construction (ADR-0005,
  CHT-1348); FastAPI `Query`/`Header` metadata moved to `Annotated`
  (CHT-1375, CHT-1377).
- One shared MCP tool-definition module over a backend protocol
  (CHT-1374); the README tool table is generated (CHT-1395).
- CI runs ruff pyflakes rules (CHT-1362, CHT-1373, CHT-1382); the backend
  suite runs in about 30 seconds (CHT-1413); the test database is built
  from the migration chain (CHT-1208).
- The publish workflow no longer gates PyPI on TestPyPI (CHT-1356).
- Design proposal for duplicate detection on issue create (CHT-1358).

## [0.1.0a18] - 2026-09-05

Server and CLI changes merged since a17 (PRs #229-#264). `v0.1.0a17` was
tagged but never reached PyPI, so a18 is the first PyPI release since
a16 and also carries the a17 changes below. This release carries one
database migration (0014): run `chaotic system upgrade`.

### Upgrade notes

- **MCP clients must reconnect**: the MCP toolset grew from 10 to 30
  tools.
- **Ritual and estimate exemptions need an interactive human**: the CLI
  sends `X-Chaotic-Interactive`, and a human account running
  non-interactively (piped, scripted, MCP) is gated like an agent
  (CHT-1302). Upgrade the CLI with the server.
- The CLI pins `mcp<2`, since `mcp` 2.0.0 removed the API both transports
  used (CHT-1331).

### Added

- **MCP toolset expansion**: `doc_update`, `issue_ready`, issue relation
  tools, writable labels, `doc_link`/`doc_unlink`, sprint tools, ritual
  tools and `project_list`; `issue_start` takes ritual attestations and a
  lease (CHT-1284, CHT-1330, CHT-1332-CHT-1334, CHT-1336, CHT-1337,
  CHT-1339, CHT-1342).
- **`chaotic agent keys create <AGENT>`** mints or rotates an API key for
  an existing agent; the web UI has a matching action (CHT-1303). Agents
  are marked `is_agent` in responses (CHT-1304).
- **Inbox archive**: archive entries in place, persisted server-side, with
  immediate keyboard nav (CHT-1314, CHT-1316; migration 0014).
- `chaotic sprint budget [SPRINT] [AMOUNT]` sets a budget as well as
  reading it (CHT-343).
- `chaotic doc get` / `doc read` aliases for `doc show` (CHT-299), and a
  `refactor` issue type (CHT-976).
- `GET /api/version` and a `git_sha` on `/health` report what is
  deployed; frontend cache-busters are content hashes (CHT-1294).

### Fixed

- **Stranded close intents**: an open intent owned by another principal
  expires after `intent_ttl_minutes` (default 15) and a later claim or
  close takes it over, so a failed non-interactive close no longer makes a
  ticket unclosable; `--attest` supplies notes inline (CHT-1326).
- **MCP output goes through the response schemas**, fixing enum
  name/value mismatches at the root (CHT-1333, CHT-1345, CHT-1348).
- The server refuses to start on a database whose migrations are behind
  the code (CHT-1318).
- Sprint budget deduction is race-safe (CHT-329); parent cycles and
  self/inverse relations are rejected (CHT-297, CHT-298).
- Inbox reads are scoped to current team membership, and project-scoped
  docs are authorized at the project level (CHT-1271, CHT-1273, CHT-1274).
- Mentions and cross-references skip code spans and fences, and re-link on
  comment edit (CHT-801, CHT-803, CHT-1272).
- Free-text CLI prompt input is sanitized (CHT-759); `project create`
  guards against a missing current team (CHT-1176, CHT-1312).
- Web UI: focus returns to the field trigger after an inline edit
  (CHT-1293, CHT-1297).

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
