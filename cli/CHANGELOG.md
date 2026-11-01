# Changelog

All notable changes to `chaotic-cli` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [PEP 440](https://peps.python.org/pep-0440/) versioning.

## [0.1.0] - 2026-10-31

The first release without an alpha tag. From here on, versions follow
semantic versioning, loosely. It is the release that was prepared as
0.1.0a22, which never reached PyPI.

Server, CLI, web UI and Android changes merged since a21 (PRs #260,
#322-#329, #331-#474, #476-#484 and #486-#492; #492 reverted #475 and
#485). This release carries 24 database migrations (0020-0044; there is
no 0035). Two of them refuse to run on data that breaks their rule
(0020: a dangling agent owner; 0022: two API keys sharing a hash), and
several delete or rewrite rows, each reporting what it does in the
upgrade output. It also changes which agent API keys still sign in.
**Run the preflight checks below before upgrading.** Install the new
CLI first (`uv tool install --force chaotic-cli==0.1.0`), then run
`chaotic system upgrade --version v0.1.0`, which backs up the
database, stops the server, checks out the new code and migrates before
restarting. If a migration fails, it restores the backup, checks the
previous code out again and restarts the server on it. chaotic.thirdbearsolutions.com has run this code since
2026-10-31 (5701ed09).

### Upgrade notes

- **Preflight 1 (required): dangling agent owners.** Migration 0020 adds
  a foreign key to `users.parent_user_id` (the human who owns an agent).
  If any row names a parent that no longer exists, 0020 stops before
  writing anything and lists the ids. The 0.1.0 CLI's `chaotic system
  upgrade` then rolls back to the previous code and backup and restarts
  the server there; fix the rows and run `chaotic system upgrade --yes`
  again. (An older CLI does not roll back: it leaves the server on the new
  code, which refuses to serve a database whose migrations are behind it,
  so the server stays down until the rows are fixed and the upgrade is run
  again. Install the 0.1.0 CLI first.) Check first, read-only, in its own
  process (never from inside the running server):

  ```sql
  SELECT child.id, child.is_agent, child.parent_user_id FROM users AS child
  WHERE child.parent_user_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM users AS parent WHERE parent.id = child.parent_user_id);
  ```

  for example `sqlite3 "file:/path/to/chaotic.db?mode=ro" "<query>"`. Fix
  every row it returns: point each agent at an existing human, or set
  `parent_user_id = NULL` on a row that is not an agent. Then upgrade.
- **Preflight 2: agent keys that stop signing in at upgrade.** From 0.1.0,
  an agent key signs in only while its holder is a member of the agent's
  team (see the next two notes for who the holder is). This is checked at
  every sign-in, not only when someone is removed, so **the moment the
  server comes up on 0.1.0, every key whose recorded holder already left
  the agent's team returns 401**. That includes keys a team admin minted
  for an agent whose creator has since left, because pre-release keys are
  recorded as the creator's. To list them before upgrading (read-only, as
  above):

  ```sql
  SELECT k.key_prefix, agent.id AS agent_id, agent.name AS agent,
         CASE WHEN k.user_id = agent.id THEN agent.parent_user_id ELSE k.user_id END AS holder_id
  FROM api_keys AS k
  JOIN users AS agent ON agent.id = COALESCE(NULLIF(k.agent_user_id, ''), k.user_id) AND agent.is_agent = 1
  WHERE k.is_active = 1
    AND NOT EXISTS (SELECT 1 FROM team_members AS m
                    WHERE m.team_id = agent.agent_team_id
                      AND m.user_id = CASE WHEN k.user_id = agent.id
                                           THEN agent.parent_user_id ELSE k.user_id END);
  ```

  After upgrading, a team admin mints each affected agent a new key
  (`chaotic agent keys create`) and moves the bot over. Such agents keep a
  creator outside the team (ownership passes only when someone is removed
  from now on), so only team admins can manage them.
- **Changed for existing agent keys.** Before this release, every key
  minted for an agent was recorded as its creator's, even one a team admin
  minted, and a key an agent minted for itself recorded no human at all
  (it shows as `(creator, legacy)` in `chaotic agent keys list`). Existing
  rows cannot tell an admin's mint from the creator's, so all of those
  keys stand or fall with the agent's creator. That cuts both ways:
  - When the creator leaves the team, an admin's bot running on such a
    key stops, and so does any legacy self-minted key of that agent.
  - When the **admin** who actually holds such a key leaves, nothing
    revokes it: it is recorded as the creator's. For an agent the team
    owner created, that key never expires on its own.

  **Admins: rotate any agent key that someone other than the agent's
  creator minted before this release.** A human must mint the replacement
  (`chaotic agent keys create`, signed in as yourself), then move the bot
  over and `chaotic agent keys revoke` the old key. Do not let the bot
  rotate its own key: a key an agent mints for itself inherits the holder
  of the key it called with, so a key minted with a legacy self-minted
  key is legacy again, and one minted with a pre-release admin key is
  again recorded as the creator's. Keys a human mints from now on are
  recorded as that human's. A bulk rotate/revoke of pre-release keys is
  tracked as CHT-1529.
- **Leaving a team ends the agent keys you hold for it.** Removing a
  member (or the member leaving) revokes, in the same step, every key they
  hold for that team's agents and the legacy self-minted keys of agents
  they created. Agents running on those keys get 401 until someone mints
  them a new key. The agents stay: the ones the member created pass to the
  admin who removed them, or to the team's longest-standing owner if the
  member left, and the team's other admins get an inbox entry per agent.
  A removed creator also loses every management right over their agents
  (CHT-1508, CHT-1510).
- **Migration 0020: the database no longer cascades a human's delete to
  their agents.** `users.parent_user_id` becomes `ON DELETE RESTRICT ON
  UPDATE CASCADE`, both on databases built from the migration chain (which
  had ON DELETE CASCADE) and on older databases like production's (which
  had no foreign key on that column). Like 0019, it edits the stored table
  definition in one transaction and copies no rows. This fixes a21's known
  issue (CHT-1467).
- **Deleting your account can now be refused.** `DELETE /users/me`
  returns 409, with counts per person, if you or any of your agents
  authored anything. Otherwise your agents and their keys are deleted
  with you. An agent calling `DELETE /users/me` gets 403.
- **New inbox kind `agent_status`**, for an agent's creator when someone
  else deactivates or reactivates it. A client that switches on inbox
  kinds will see a value it has not seen before.
- **Rolling back after a successful upgrade needs both halves.**
  `chaotic system upgrade` backs up the database before it checks out
  the new code (unless `--no-backup`); `chaotic system backup --list`
  shows the backups. The server serves only a database whose applied
  migrations match its code exactly, ahead or behind. So `chaotic system
  backup --restore <timestamp>` on its own puts a21's database under 0.1.0
  code, and the server will not start. Going back means the a21 code
  *and* the pre-upgrade backup together; there is no single command for
  that yet (CHT-1546). Do not downgrade 0020 with `oxyde migrate`
  instead: its downgrade installs 0001's ON DELETE CASCADE, even on
  databases that had no foreign key before.
- **Preflight 3 (required): API keys sharing a hash.** Migration 0022
  makes `api_keys.key_hash` unique, and keys are now looked up by that
  hash instead of their display prefix. Two rows can share a hash only if
  written by hand; 0022 refuses with their ids and deletes nothing,
  because which to keep is your call. Check first (read-only, as above):

  ```sql
  SELECT key_hash, count(*) FROM api_keys GROUP BY key_hash HAVING count(*) > 1;
  ```
- **Migration 0021 deletes API keys that cannot sign in.** It splits
  `api_keys` into explicit principal and holder columns (CHT-1537). A key
  whose user, or whose agent key's holder, no longer exists cannot be
  copied under the new foreign keys and is dropped (it is in the
  pre-upgrade backup). To see them first:

  ```sql
  SELECT id, key_prefix FROM api_keys AS k WHERE NOT EXISTS
    (SELECT 1 FROM users WHERE users.id = coalesce(nullif(k.agent_user_id, ''), k.user_id))
    OR NOT EXISTS (SELECT 1 FROM users WHERE users.id = k.user_id);
  ```
- **Migration 0033 removes duplicate team memberships**, keeping one row
  per user per team, and prints each row it deletes (CHT-1791).
- **Migration 0034: one account per address, ignoring case** (CHT-1804).
  Where accounts differ only in the case of their address, the oldest
  keeps it for case-insensitive lookups; the others still log in by their
  exact address, are listed by id in the upgrade output, and are logged
  at every startup until resolved (`chaotic system audit shared-addresses`, CHT-1827).
- **Migration 0036 gives every agent a team and revokes those agents'
  keys** (CHT-1837). Project-scoped agents made without a team get their
  project's team. Under this release's holder rule (an agent key signs in
  only while its holder is in the agent's team) a teamless agent's keys
  are refused, so rather than letting the backfill bring them back without
  anyone deciding to, 0036 revokes them, **including keys that sign in
  today on a21**. The owner or a team admin mints new ones. Agents it cannot place are left
  as they are and listed. To count before upgrading:

  ```sql
  SELECT sum(t.id IS NOT NULL), sum(t.id IS NULL) FROM users AS u
  LEFT JOIN projects AS p ON p.id = u.agent_project_id
  LEFT JOIN teams AS t ON t.id = p.team_id
  WHERE u.is_agent AND u.agent_team_id IS NULL;

  SELECT count(*) FROM api_keys AS k
  JOIN users AS u ON u.id = coalesce(nullif(k.agent_user_id, ''), k.user_id)
  JOIN projects AS p ON p.id = u.agent_project_id JOIN teams AS t ON t.id = p.team_id
  WHERE u.is_agent AND u.agent_team_id IS NULL AND k.is_active;
  ```

  The second counts the active keys it will revoke, on an a21 database.
- **Migration 0031: existing sprints follow the project's default
  budget** (CHT-1495). A planned sprint whose budget was set by hand
  takes the default when it activates unless it is set again first:
  re-set those with `chaotic sprint budget <id> <points>`.
- **Migration 0032 starts every existing account unverified** (CHT-1790).
  On a server with SMTP configured, accepting an invitation then needs a
  verified email (`chaotic auth verify-email`).
- **Migrations 0039 and 0040 rewrite session identities' addresses and
  default names** so they no longer carry a piece of the identity's
  `external_ref`, and rewrite the inbox titles that quoted the old names
  (CHT-1864, CHT-1869). `@` handles typed with an old tail now reach
  nobody.
- **Migration 0042 recomputes open epics' status from their children**
  (CHT-1901). An open epic whose status was set by hand to something its
  children don't imply is pinned where it is; every other open epic takes
  the derived status. Closed epics are left alone, and no activity rows
  are written.
- **Migration 0044 resolves duplicate "children closed" inbox
  entries**, keeping the oldest open one per recipient and parent, before
  it adds a unique index on them (CHT-1928). Nothing is deleted. 0043
  only adds indexes (CHT-1935).
- **New server settings, all off by default**: `OAUTH_ENABLED` (OAuth
  for `/mcp` and the Android app) and `MCP_CAPABILITY_URL_ENABLED`. Set
  them with `chaotic system config set`, which keeps them across
  upgrades; `chaotic system config adopt` takes over values already in a
  hand-edited service file (CHT-1592, CHT-1676). `OAUTH_ENABLED` takes a
  restart.
- **MCP clients should reconnect**: the toolset changed. It has 39 tools
  (`ritual_reject` is new), compact issue, document and inbox rows gained
  `assignee`, `author` and `source_user`, and issue lists take a `where`
  query.

### Added

- **One agent identity per Claude Code session**, opt-in. Make a
  registrar once (`chaotic agent create --registrar`, or Agents ›
  Create Agent › Registrar in the web app), give the machine its key and
  run `chaotic config set-session-identity auto`. Each session then
  registers its own identity (`POST /agents/register`) with an expiring
  key; a registrar's key can only register. Idle session identities drop
  out of agent lists and pickers (CHT-1498, CHT-1499, CHT-1501, CHT-1600).
- **The registrar key as a network secret.** `POST /agents/register`
  also takes the key in `X-Chaotic-Registrar-Key`, which nothing else
  reads, and `CHAOTIC_REGISTRAR_KEY_VIA=header` (or `chaotic config
  set-registrar-key-via header`) makes the CLI hold no registrar key at
  all, so a cloud environment's proxy can inject it. Because that proxy
  drops the client's own `Authorization` on the host, the session key
  then goes in `X-Chaotic-Key`, which every REST route accepts like a
  bearer API key when no `Authorization` is sent. `docs/agents.md` has
  the recipe (CHT-1906, CHT-1913).
- **Epics track their goal.** An open epic's status follows its
  children until set by hand (`status_follows_children` unpins it);
  closing an epic's last open child asks whether to close the epic too;
  and the Epics view shows progress toward each one (CHT-1884, CHT-1901,
  CHT-1902).
- **Per-project epic and assignee knobs**, off by default: `chaotic
  project update --require-assignee-on-claim`, `--require-epic-on-close`
  and `--default-epic CHT-X`, which new parentless tickets are filed under.
  MCP `issue_update` takes `issue_type` (CHT-1885, CHT-1900).
- **The inbox asks an issue's owner what's next when nothing is left
  open under it**, one entry per recipient and parent, and resolving
  inbox entries updates the recipients' open pages (CHT-1909, CHT-1927,
  CHT-1928).
- **Query issues by relation**: `blocks=`, `blocked_by=` and `related=`
  in the issue query (CHT-1903).
- **A session identity can name itself**: `CHAOTIC_SESSION_NAME` names
  a new session identity when the CLI registers it, and `chaotic auth
  rename <name>` renames the session afterwards. A session identity may
  change its own name and nothing else, and cannot take another agent's
  (CHT-1918).
- **OAuth for `/mcp`, behind `OAUTH_ENABLED`**: discovery, client
  registration (CIMD and DCR), a consent page that names the app, the
  team, the agent it acts as and its projects, token rotation with reuse
  detection, and revocation. Settings › Connected Apps and `chaotic auth
  connections` list and disconnect what you approved (CHT-1515 to
  CHT-1523).
- **Chaotic for Android** (source only, no public build): signs in
  through OAuth, syncs the inbox, issues and sprint offline, queues
  writes, and gets push through UnifiedPush with Approve/Reject on the
  lock screen. The server side is generic: push device registration and
  per-kind preferences, an inbox sync cursor with tombstones, and
  `Idempotency-Key` on writes (CHT-1602 to CHT-1613, CHT-1621, CHT-1665).
- **Issue queries**: one query language across the API, `chaotic issue
  list --where`, the MCP `where` argument and a `/query` page in the web
  app, with a vocabulary endpoint for the builder (CHT-1718, CHT-1783,
  CHT-1810).
- **Invitations you can deliver without SMTP**: a landing page at
  `/invite/:token`, the accept link handed to the inviting admin, `team
  accept-invite` taking the full link, and `team invitation-code` when
  the verification email is failing. With SMTP on, accepting needs a
  verified email (`auth verify-email`) (CHT-1265, CHT-1790, CHT-1794,
  CHT-1823, CHT-1824, CHT-1828).
- **Team ownership**: `team transfer-ownership`, stepping down and
  leaving, never leaving a team without an owner (CHT-1848).
- **`chaotic auth change-email`**, and listing and resolving accounts
  that share an address (CHT-1827).
- **Team activity log**: member and invitation actions are recorded;
  `chaotic team activity` reads it, and `chaotic system audit
  removed-members` audits from it (CHT-1820, CHT-1843, CHT-1845).
- **Rejecting a gate or review with a required reason** (CHT-1606).
- **@mentions reach agents and session identities**, unambiguously; the
  author is warned when a handle reached nobody (CHT-1731, CHT-1735,
  CHT-1743).
- **`chaotic system config`** for server settings (CHT-1592).

### Changed

- **A ticket that was never claimed must pass its claim rituals before
  its first close**, wherever it closes from (CHT-1672, CHT-1693).
- **Planned sprints follow the project's default budget** until set by
  hand; `chaotic sprint budget <id> --default` puts one back (CHT-1495,
  CHT-1701).
- **Out-of-scope reads answer 404 exactly like a missing row**, on REST
  and every MCP tool argument (CHT-1785, CHT-1819, CHT-1839).
- **Project-scoped agents are refused team-wide data**, and websocket
  broadcasts are filtered per socket by what it can reach (CHT-1780,
  CHT-1840).
- **Deleting a project or team retires its agents first** (CHT-1844).
- **Sub-issues take their parent's project** when none is given, and
  `--label` resolves in the issue's team (CHT-1706, CHT-1709, CHT-1711).
- **`chaotic system upgrade` forces and verifies the CLI rebuild**,
  rolls back a failed migration, and warns when the `chaotic` on PATH is
  not the one it rebuilt (CHT-1675, CHT-1477, CHT-1694, CHT-1695).
- **Web UI**: an open-only issue list that renders cached rows at once,
  polish passes against a stated bar, gzip and cache headers, dense
  issue rows, an issue detail that paints from the loaded row, and
  optimistic inline edits with rollback, filter changes that paint at
  once from a cached list, dense rows on narrow screens, collapsed
  groups and focus that survive a re-render, and approval cards and the
  drawer on phones (CHT-1747, CHT-1755, CHT-1874, CHT-1886, CHT-1893 to
  CHT-1899, CHT-1910, CHT-1914, CHT-1915, CHT-1921, CHT-1923, CHT-1929,
  CHT-1932).
- **Android** (source only): live updates over `/ws` in the foreground,
  sync and lock-screen decision fixes (CHT-1655, CHT-1667, CHT-1671,
  CHT-1685).

### Fixed

- **Credentials no longer reach uvicorn's access log** or the `/ws`
  URL, and `/ws` closes at once when its credential is revoked
  (CHT-1567, CHT-1590, CHT-1603, CHT-1616).
- **Server text prints literally** in the CLI's Rich output (CHT-1526).
- **Agent keys held by a deactivated human are refused** (CHT-1552).
- **Assignee writes are conditional on the value read**, and an issue's
  assignee and a project's lead share one eligibility rule (CHT-1830,
  CHT-1832).
- **Accounts can no longer share an address that differs only in case**,
  enforced in the database (CHT-1804).
- **Localhost invitation links** in the web UI and CLI (CHT-1822).
- **A project update that turns a gate off can no longer undo someone
  turning it on meanwhile**: it lands only while that gate still holds the
  value it was read with, else 409 (CHT-1926).
- **Label filters match non-ASCII names without case** (CHT-1920).
- **Epic progress counts by nearest epic**, computed in SQL (CHT-1922).

- **Retire an agent without deleting it.** `chaotic agent deactivate`
  (`POST /agents/{id}/deactivate`) revokes every key that signs in as the
  agent and marks it inactive; its authored work keeps its author.
  `chaotic agent reactivate` (`POST /agents/{id}/reactivate`) turns it
  back on, though revoked keys stay revoked. The agent's creator or an
  admin of its team can do either, and when it is not the creator, the
  creator gets an inbox entry. `agent list` marks deactivated agents, the
  delete 409 now points at deactivate, and minting a key for a deactivated
  agent is refused. No deactivated user, agent or human, can be newly
  assigned an issue (CHT-1494).
- **`chaotic agent keys list` / `chaotic agent keys revoke`**
  (`GET /agents/{id}/keys`, `DELETE /api-keys/{id}`) list every key that
  signs in as an agent, with its holder and a `legacy_self_minted` flag,
  and revoke one by id prefix, `ck_...` prefix or pasted full key, without
  ever echoing the secret (CHT-1508).
- **Every actor says whether it is an agent, and whose.** Issue, comment,
  activity, inbox, attestation, document and revision responses carry a
  summary `{id, name, is_agent, owner_id, owner_name}` next to each
  existing `*_name` field (`creator`, `assignee`, `author`, `user`,
  `source_user`, `attester`, `approver`). The CLI prints agents as
  "Builder Bot (agent of Ada)" and `issue show` gains Assignee and Creator
  lines; the web UI's agent badge reads "AI agent of <owner>" on hover and
  now appears on comments, creators, activity, documents and revisions
  (CHT-1500).
- **Expandable inbox rows.** Enter or a click opens an inbox row in place,
  showing what triggered it and who from, with an action bar: Reassign
  back to sender (for assignments and review requests), Open, and Archive.
  One row is open at a time; j/k collapse it, Escape collapses and then
  deselects, and `e` still archives (CHT-1320).

### Changed

- **Over-budget refusals name the project.** The arrears and limbo 409s
  carry `project_id`, `project_key` and `team_id` (arrears also the sprint
  id and name), and the CLI prints the exact remedy, e.g. "Sprint 7 in
  project OTH is in arrears (12/10 points). Run `chaotic sprint close
  <sprint_id> --project OTH`", with `team use`/`project use` first when
  the project is in another team. `sprint close` takes `--project`, names
  the sprint now active, and says plainly when it only entered limbo
  instead of rotating (CHT-1270).

### Fixed

- **Inbox keys no longer act behind an open issue or document.** After
  Open from an inbox row, `e`, j/k and Escape went to the hidden inbox, so
  `e` archived an entry and opened the estimate field at once (CHT-1513).
- **Archived or read inbox rows no longer come back** when a background
  refresh started before the archive lands after it; an entry archived in
  another tab now drops out even when it is the open row (CHT-1514).
- **An agent's creator who has left its team no longer gets inbox
  entries about it.** Those entries name the acting admin and go out on
  the team's channel, so they no longer reach an ex-member (CHT-1508).
- **Migrations 0008 and 0019 read the database through Oxyde** instead of
  Python's `sqlite3`. A second SQLite library opening a database Oxyde had
  open could corrupt its view of the WAL, which surfaced as an occasional
  "database disk image is malformed" in CI and could also hit `oxyde
  migrate` and the startup bootstrap (CHT-1491).

### Internal

- The publish workflow skips files already on PyPI, refuses a tag that
  does not match `cli/pyproject.toml`'s version, publishes only from tags,
  and runs one release per tag, so a release can be re-run and the a18-a21
  GitHub Releases backfilled safely (CHT-1356).
- The test schema template leaves WAL mode before it is copied, and a new
  test keeps `sqlite3` out of `app/` and `migrations/` (CHT-1491).

## [0.1.0a21] - 2026-10-13

Server and CLI changes merged since a20 (PRs #311-#320). This release
carries one database migration (0019) and changes how `chaotic system
upgrade` stops, restarts and configures the service: install the new CLI
first (`uv tool install --force chaotic-cli==0.1.0a21`), then run
`chaotic system upgrade`, which backs up and migrates before restarting.

### Upgrade notes

- **Migration 0019: authorship no longer cascades.** The six foreign keys
  that record who wrote something (`issues.creator_id`,
  `issue_comments.author_id`, `issue_activities.user_id`,
  `documents.author_id`, `document_comments.author_id`,
  `document_activities.user_id`) change from ON DELETE CASCADE to ON DELETE
  SET NULL, and lose their NOT NULL. The migration edits the stored table
  definitions in one transaction; no row is copied and no index rebuilt.
  API responses can now carry a null author id, with `"Deleted user"` as
  the name.
- **Deleting an agent that authored anything returns 409** (`chaotic agent
  delete`, `DELETE /agents/{id}`) with a count per kind of record, instead
  of deleting its issues, comments, activity and documents with it. The
  count covers issues, comments, activity, documents, ritual gate requests,
  attestations and approvals, budget transactions and revisions, so any
  agent that has closed a ticket cannot be deleted. Only an agent that
  authored nothing is deleted; to retire one that did, revoke its API keys
  (`chaotic auth keys revoke`). Only the agent's owner can do that: its keys
  belong to the human who created it, so a team admin who can attempt the
  delete cannot follow the 409's advice (CHT-1494).
- **Known issue: deleting a human account still deletes its agents**, which
  bypasses the 409 guard, on a database whose `users.parent_user_id` has ON
  DELETE CASCADE (one built from the migration chain). The agents' authored
  work survives with a null author, but the agents are gone
  (CHT-1467).
- **Server hosts need uv 0.5.31 or newer**: all three `pyproject.toml`
  files now set `[tool.uv] required-version = ">=0.5.31"`, so `just sync`
  (which `system install`/`upgrade` run) fails on an older uv. Upgrade uv
  on the server first if needed.
- **`system upgrade` refreshes the service file.** After migrating and
  before starting, it regenerates the systemd unit / launchd plist from
  `server.json` and rewrites it only when the result keeps every setting
  the current file makes and only adds settings. The old file is kept byte
  for byte in `~/.chaotic/service-backups/` (newest 5 per file), the new
  one is written atomically, Linux runs `systemctl --user daemon-reload`,
  and a diff with environment values and comments redacted is printed. A
  unit with anything the rewrite would drop or change (extra environment,
  a different `ExecStart`, comments, a symlink, ...) is left alone with
  `Service file not updated: ...`; move those customisations into a
  drop-in (`systemctl --user edit chaotic`). An upgrade that rolls back
  restores this run's backup of the file.
- **Bounded shutdown.** uvicorn now gets `--timeout-graceful-shutdown 10`
  (justfile `serve-prod`), the generated unit sets `TimeoutStopSec=30`
  (launchd `ExitTimeOut=30`), and the CLI waits up to 120 s for a stop,
  which covers the 90 s systemd default that units written before this
  release still have. The new unit setting arrives through the service-file
  refresh above, so the stop during this upgrade still runs under the old
  unit. An upgrade now always starts the server and checks `/health` and
  the deployed commit, even if the server was stopped beforehand, and every
  failure path says whether the server is up.
- **MCP clients must reconnect**: `issue_update` gained `parent` and
  `no_parent`, so a cached toolset is stale (the tool count stays 38;
  compare `server_info`'s fingerprint). The server also drops open `/mcp`
  streams after 10 s on stop.
- **Roll back by restoring the pre-upgrade backup** (`chaotic system backup
  --restore <timestamp>`), not by `oxyde migrate` downgrading past 0019: the
  downgrade restores CASCADE but not the dropped NOT NULLs, and rows whose
  author was deleted meanwhile keep a null author. A refreshed service file
  can be put back from `~/.chaotic/service-backups/` (then `systemctl
  --user daemon-reload`).

### Added

- **MCP `issue_update` sets and clears a parent** (`parent`, `no_parent`)
  on both transports, checked before any attestation or write: unknown,
  self, cross-project and cyclic parents are refused. The `issue_block`,
  `issue_label` and `issue_update` descriptions name the CLI command for
  what MCP cannot do yet (CHT-1460).
- **`issue view` shows relations**, and `issue view --json` has a
  `relations` array with the same rows as `issue relations --json`, or
  `relations: null` when the relations call fails (CHT-1431).
- **The open issue detail refreshes live** in the web UI when an agent or
  another client comments, updates, relates or attests on it, whichever
  list it was opened from. Refreshes are ordered and coalesced, keep focus,
  caret and scroll, and hold off while a dropdown, menu or IME composition
  is open (CHT-1237, CHT-1286).

### Fixed

- **`chaotic issue relations` no longer crashes** with `KeyError:
  'related_issue'`: the CLI now reads the flat shape the API returns
  (CHT-1431).
- **A stalled stop no longer leaves the server down.** `system upgrade`
  died on a raw `TimeoutExpired` after 60 s and left the service stopped,
  and an upgrade that found the server stopped never started it again;
  stop and start no longer raise, and when a stop fails, upgrade,
  `reconfigure` and `backup --restore` say whether the server is running
  or down and start it again if it is down (CHT-1474, CHT-1475).
- **Escape in the create-issue modal closes only the topmost layer**: an
  open dropdown first, then a clean modal in one press; a modal with input
  only blurs the field, so a stray Escape no longer discards it (CHT-1231).
- Remote events no longer re-render a sprint detail over an open issue or
  pull you back into the last sprint you viewed (CHT-1487).

### Internal

- `backend/uv.lock`, `cli/uv.lock` and `e2e/uv.lock` are committed; CI,
  `just sync` and the server install/upgrade path install with `uv sync
  --locked`, and `just lock` re-resolves all three (CHT-1201). `uv tool
  install chaotic-cli` is unaffected.
- `CONTRIBUTING.md`, issue forms and a PR template; the a18 and a19
  changelog entries are backfilled (CHT-1463, CHT-1478).
- chaotic.sh refresh: Agents & MCP section, screenshots, What's New, a
  mobile nav, and Docs and license links (CHT-238, CHT-689, CHT-692,
  CHT-694, CHT-695, CHT-1479, CHT-1481, CHT-1482).

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
tagged but never reached PyPI, so a18 is the first PyPI release since a16
and also carries the web UI changes listed under 0.1.0a17. This release
carries one database migration (0014): run `chaotic system upgrade`.

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
