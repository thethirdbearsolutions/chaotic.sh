# Connecting agent harnesses to Chaotic

Chaotic is agent-first project infrastructure (see [VISION.md](VISION.md)).
This doc covers the ways an agent harness (Claude Code, or anything else
that can shell out or speak MCP) talks to a Chaotic team/project.

## MCP server (`chaotic mcp`)

The CLI ships an MCP (Model Context Protocol) server over stdio:
`chaotic mcp`. It exposes a curated set of chaotic operations as native
tools, so an MCP-speaking harness doesn't need to shell out to the CLI
at all -- it gets `issue_list`, `issue_create`, `doc_view`, etc. as
first-class tool calls with typed JSON schemas.

It's a thin adapter: no business logic lives in the MCP layer that
isn't already in `cli.client.Client`. Auth and team/project context
come from the exact same `CHAOTIC_PROFILE` / `CHAOTIC_HOME` /
`config.json` resolution the CLI itself uses -- whatever `chaotic
status` reports in the directory the harness runs from is what the MCP
server sees. There's no separate MCP login step.

### Add it to Claude Code

```bash
claude mcp add chaotic -- chaotic mcp
```

Pin a specific profile (useful when multiple agents share a
workstation, see `chaotic profile` in the CLI README) by passing it
through:

```bash
claude mcp add chaotic -- chaotic --profile myprofile mcp
```

### Generic MCP client config

Any MCP host that reads a JSON config (stdio transport) can point at
the same command:

```json
{
  "mcpServers": {
    "chaotic": {
      "command": "chaotic",
      "args": ["mcp"]
    }
  }
}
```

### Toolset

Ten tools, curated for quality over coverage:

- `issue_list`, `issue_view`, `issue_create`, `issue_update`,
  `issue_comment`, `issue_start`
- `doc_list`, `doc_view`, `doc_create`
- `activity_recent`

Every tool returns a JSON object. Failures come back as
`{"error": "..."}` -- the same shape as the CLI's `--json` error
contract -- rather than an MCP protocol-level error; a bad identifier
or missing team/project context is something the agent reads and
reacts to, not a crash.

No destructive tools (delete) are exposed. Destructive operations need
a human in the loop for now; that may change behind an explicit opt-in
flag in a future ticket. An `issue_ready` tool (open/unblocked/
unclaimed work query) is expected once CHT-1245 lands -- this server
doesn't depend on it and doesn't have it yet.

See `cli/README.md` § MCP server for the full tool list mapped to
their CLI equivalents.

## Remote MCP (Streamable HTTP, `/mcp`)

If you'd rather point a *hosted* client at your chaotic instance instead
of running `chaotic mcp` as a local subprocess -- claude.ai's custom
connectors, Claude Code web, or Claude Code CLI's `--transport http` --
the backend also speaks MCP directly over Streamable HTTP at `/mcp`.
Same 10 tools, same names (see Toolset below); five of them
(`issue_list`, `issue_create`, `doc_list`, `doc_create`,
`activity_recent`) additionally accept an optional `team` parameter,
because a hosted server has no single active profile to inherit context
from -- see "Auth and scoping" below.

**Auth v1 is API-key only.** There's no OAuth flow yet (dynamic client
registration + the paste-a-URL-and-authorize connector UX is tracked
separately, CHT-1266's follow-up); an existing `ck_...` API key is
sufficient. Create one with:

```bash
chaotic auth keys create --name "claude.ai connector"
```

### Connecting Claude Code (`--transport http`)

```bash
claude mcp add --transport http chaotic https://your-chaotic-host/mcp \
  --header "Authorization: Bearer ck_..."
```

### Connecting claude.ai's web custom-connector UI (capability URL)

As of when this was written, claude.ai's web "Add custom connector"
dialog takes a server URL plus, in Advanced settings, an OAuth client
id/secret pair -- there's no field for a Bearer token or a custom
header (confirmed against the current Claude Help Center docs and a
still-open upstream feature request, anthropics/claude-ai-mcp#112;
Claude Code, both CLI and web, does support `--header` / custom
headers, so prefer the header mode above there). Since the box only
takes a URL, put the key directly in the path instead:

```
https://your-chaotic-host/mcp/ck_...
```

Paste that into the connector's "server URL" field. Functionally
identical to the header mode -- same key, same auth check -- but
**strictly worse for secret hygiene**: the key ends up in browser
history, any server/proxy access logs along the way, and anywhere the
URL gets copy-pasted (bug reports, chat transcripts, Slack). Mint a
**dedicated** key for it so it's easy to tell apart and revoke
independently of anything else:

```bash
chaotic auth keys create --name "claude.ai connector"
chaotic auth keys list                # find its id
chaotic auth keys revoke <key-id>      # revoke it later, any time
```

This is a gap in claude.ai's connector UI, not an MCP or chaotic
limitation -- re-check the current docs before relying on this staying
true; it's exactly the kind of thing that gets fixed. Real OAuth
support (so the header/URL question goes away entirely, replaced by a
paste-URL-and-authorize flow) is tracked separately as CHT-1266's
follow-up.

### Auth and scoping

An API key belongs to a user (human or agent), and every tool call
resolves its team/project context from *that user's memberships* --
there's no local profile to fall back on the way the stdio server has:

- If the key's user has exactly one accessible team/project, tools
  default to it silently -- the common single-team case needs nothing
  extra.
- If the key's user belongs to more than one team, or a team has more
  than one project, pass `team` and/or `project` explicitly (id, key,
  or name all work) -- the tool call returns a clear
  `{"error": "..."}` listing the options if you don't.
- An agent-scoped API key (`chaotic agent create`) is confined to its
  own project/team exactly like it is over REST; passing a `team`/
  `project` that doesn't match its scope is rejected the same way.

`issue_view`/`issue_update`/`issue_comment`/`issue_start` don't take a
`team`/`project` parameter at all in either transport -- issue
identifiers (`CHT-123`) are unique instance-wide, so there's nothing to
disambiguate.

## Shelling out to the CLI directly

Harnesses that would rather run the `chaotic` binary directly (no MCP
host available, or finer control over output) can use `--json` on
every read/write command for a single-JSON-value stdout contract, and
`chaotic await ...` to block on activity instead of polling. See
`cli/README.md` for both.
