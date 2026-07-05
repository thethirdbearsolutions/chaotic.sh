# Changelog

All notable changes to `chaotic-cli` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [PEP 440](https://peps.python.org/pep-0440/) versioning.

## [0.1.0a16] - 2026-05-16

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
