# Spec: CLI content I/O

Four small, independent changes that make multi-line content ergonomic
in `chaotic`. See [ADR-0004](../adr/0004-cli-content-io.md) for context
and rationale.

## 1. `chaotic dump <dir>`

Read-only snapshot of chaotic content as a markdown tree.

```
chaotic dump <dir>
    --project PRJ                          # required
    [--include issues,docs]                # default: issues,docs
    [--since DURATION-or-DATE]             # optional incremental
    [--overwrite]                          # required if <dir> non-empty
```

Layout written:

```
<dir>/
  .dump-meta.json          # timestamp, scope, command, server URL
  projects/PRJ/
    issues/
      CHT-11.md
      CHT-12.md
    docs/
      my-slug.md
```

File format: YAML frontmatter (`id`, `type`, `project`, `title`,
`status`, `assignee`, `labels`, `created`, `updated`) plus markdown
body. Same shape as `chaotic show --raw`.

No state file. No daemon. Re-run to refresh; `--overwrite` is required
if `<dir>` is non-empty (safety against `rm -rf` blast radius from a
mistyped path).

With `--since`, only writes records updated since that timestamp.
Existing files for unchanged records are left untouched. Accepted
forms: ISO-8601 date (`2026-05-01`), or duration suffix (`1h`, `7d`).

`.dump-meta.json` always reflects the most recent dump and is
overwritten unconditionally on every run.

Exit codes: 0 success, 2 usage error (missing `--project`, non-empty
dir without `--overwrite`), 1 server error.

## 2. `--body @path` and `--body -` (stdin)

Applies to every existing long-text flag in the CLI. Current sites
(13 total) from `cli/src/cli/commands/`:

* `doc.py`: `--content`/`--body`/`--description` (line 79), `--content`
  (line 249)
* `issue_cmd.py`: `--description` (lines 280, 547), `--comment` /
  `comment_text` (line 904)
* `sprint_cmd.py`: `--description` (lines 28, 222)
* `label.py`: `--description` (lines 51, 64)
* `team.py`: `--description` (line 55)
* `project.py`: `--description` (lines 57, 135)
* `epic.py`: `--description` (line 28)

Resolution rule, applied via a shared Click `callback=`:

| Value             | Behavior                                              |
|-------------------|-------------------------------------------------------|
| `@@foo`           | Literal value `@foo` (escape hatch)                   |
| `@/path/to/file`  | Read file at `/path/to/file`. File-not-found exits 2. |
| `-` (exactly)     | Read stdin to EOF.                                    |
| anything else     | Literal value (current behavior).                     |

Implementation: one helper in `cli/src/cli/common/content.py`. Apply
to every option via Click's `callback=`. No other changes to existing
command signatures.

`--body -` and `--body @file` are mutually exclusive with positional
file input (§3) on the same command — explicit flag wins, but
specifying both is a usage error (exit 2).

## 3. File-as-positional create

```
chaotic doc create <path.md>
chaotic issue create <path.md>
```

The file IS the content. YAML frontmatter supplies structured fields;
markdown body is the body. Frontmatter fields recognized:

* `doc create`: `project`, `team`, `title`, `tags`
* `issue create`: `project`, `title`, `priority`, `status`, `assignee`,
  `labels`, `parent`, `estimate`

CLI flags override frontmatter when both are present (no error, no
warning — flags win).

A file without an `id` field is a creation. Server-assigned id is
printed on stdout. The local file is NOT modified, renamed, or moved
— the caller decides what to do with it.

A file *with* an `id` field on a `create` command is a usage error
(exit 2): use `chaotic issue update --body @path` or
`chaotic doc update --content @path` instead.

## 4. `chaotic show --raw <id>`

```
chaotic show --raw <id>
chaotic issue show --raw <id>      # also accepted on entity-scoped show
chaotic doc show --raw <id>
```

Writes frontmatter + body to stdout. Same format as `chaotic dump`
files. Pairs with `--body @file` for copy-edit workflows:

```bash
chaotic issue show --raw CHT-11 > /tmp/cht-11.md
$EDITOR /tmp/cht-11.md
chaotic issue update CHT-11 --description @/tmp/cht-11.md
```

The frontmatter `id` field is informational; the explicit `CHT-11`
argument on the update is what targets the record.

## Compatibility

All four changes are additive. No existing command, flag, or default
behavior changes. No new on-disk artifacts except where the user
explicitly directs (`chaotic dump <dir>`, `chaotic show --raw > file`).

## Out of scope

* Write-through tree (rejected in ADR-0004 alternatives).
* Bidirectional sync (rejected in ADR-0003 / ADR-0004).
* Auto-refresh of dumps from `chaotic await` event stream (out-of-band
  composition is fine: `chaotic await ... && chaotic dump ... --overwrite`).
* MCP server (independent track).
