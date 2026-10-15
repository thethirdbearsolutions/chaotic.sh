"""Every agent has a team (CHT-1837): users.agent_team_id is backfilled
for the project-scoped agents made without one, and the API keys of
every agent it backfills are revoked.

`AgentService.create` has always set agent_team_id, but older
project-scoped agents carry only agent_project_id. Some code derived
their team from the project (`agent_home_team_id`, the teamless branch
of the MCP assignee lookup) and the rest silently skipped them: they
were invisible to the team's agent list, unmentionable, unfilterable,
and their inbox entries were broadcast to no team. This migration gives
each one its project's team, so every reader can use agent_team_id
alone; the code that worked around the gap is deleted in the same
change.

Keys fail closed. An agent's API key signs in only while its holder is
a member of the agent's team (app/auth/credentials.py), so every key of
a teamless agent has been refused (401) since CHT-1508/CHT-1552. Giving
the agent a team would bring each such key back to life without anyone
deciding it should. So, in the same transaction, every key still marked
active (`api_keys.is_active`, the marker `APIKeyService.revoke` clears)
that signs in as an agent this migration backfills is revoked. The
agent's owner (or a team admin) mints a new key for it
(`chaotic agent keys create`, or POST /api/agents/{id}/keys) when it is
wanted again.

This is not the whole `APIKeyService.revoke` path, which also ends the
holder sessions and unredeemed tickets opened with the key and notifies
push devices and sockets. None of that is needed for liveness: a
session or push registration opened with a key checks the key's
`is_active` on every use (`APIKeyService.is_live`), tickets these keys
could mint have expired (they could mint none since CHT-1508), no cache
can hold a positive validation of a key that has been refused since
then, and an OAuth session for a teamless agent cannot exist (consent
requires the agent's team). A session opened with one of these keys
keeps `revoked_at` NULL: dead in practice, not marked. For the audit
trail, one `revocation_events` row (target API_KEY, reason
`agent_team_backfilled`, no actor, the key ids in `filter`) is written
in the same transaction when any key is revoked; it also moves the
revocation epoch, which is harmless.

Data only, no schema change, so nothing is recorded in the replay
(collect mode). The agents and their keys are read through the
migration's own Oxyde connection (never Python's sqlite3, CHT-1491)
before anything is written, and the UPDATEs are queued with their ids
as quoted literals (ctx.execute takes no parameters). Each users UPDATE
also requires agent_team_id to still be NULL, so it never overwrites a
team.

What it prints, one `[0036]` line per row, ids only, is printed while
the writes are queued, under a header saying they take effect only when
0036 commits: if the upgrade fails or is rolled back, none of them was
made.

It never fails the upgrade over an agent it cannot place. It leaves the
agent as it is (agent_team_id NULL, keys untouched; they cannot sign in
anyway) and prints why:

- its project no longer exists (deleted while foreign keys were off, or
  on a database without that foreign key);
- its project's team no longer exists (a team deleted while foreign
  keys were off leaves its projects behind): writing that team id would
  violate users.agent_team_id's foreign key and fail the upgrade;
- it has no project either (an agent whose project was deleted with
  foreign keys on: ON DELETE SET NULL cleared it);
- its project's team already has an identity with the same
  external_ref (UNIQUE (agent_team_id, external_ref), migration 0023):
  setting the team would break that index and fail the upgrade.

None of these can be reached through the product afterwards (every
agent route 404s an agent with no team), so the line gives the SQL to
retire it. Back up first (`chaotic system backup`), stop the server,
then for each id:

    UPDATE users SET is_active = 0 WHERE id = '<id>';
    UPDATE api_keys SET is_active = 0 WHERE principal_user_id = '<id>';

To count before upgrading (read-only): the agents this migration will
place, the ones it will leave, and the active keys it will revoke:

    SELECT sum(t.id IS NOT NULL), sum(t.id IS NULL) FROM users AS u
    LEFT JOIN projects AS p ON p.id = u.agent_project_id
    LEFT JOIN teams AS t ON t.id = p.team_id
    WHERE u.is_agent AND u.agent_team_id IS NULL;

    SELECT count(*) FROM api_keys AS k JOIN users AS u ON u.id = k.principal_user_id
    JOIN projects AS p ON p.id = u.agent_project_id JOIN teams AS t ON t.id = p.team_id
    WHERE u.is_agent AND u.agent_team_id IS NULL AND k.is_active;

(an external_ref collision moves an agent from the first number to the
second, and its keys out of the third).

An agent already inactive with no team (deactivated by hand, or retired
when its project or team was deleted, CHT-1844) gets one informational
line "(already inactive)" and no steps: there is nothing left to do.

Why no CHECK constraint (the ticket asked for one): SQLite cannot add a
CHECK to an existing table, so it would take a rebuild, or a
stored-text edit like 0020's, of `users`, the table nearly every other
one references. And it would not hold: `agent_team_id REFERENCES
teams(id) ON DELETE SET NULL` (0001, and SQLAlchemy's DDL) means that
with a CHECK in place deleting any team that has agents would fail;
and every UPDATE of an agent left NULL above (retiring it) would fail
as well. The rule is enforced where every INSERT passes instead:
`OxydeUser.derive_on_create` refuses an agent without a team.

The downgrade changes nothing: the team an agent was given is the one
it always reached, nothing records which agents had none before, and a
revoked key stays revoked.

Created: 2026-10-15
"""

depends_on = "0034_users_email_folded"

# Every agent without a team, oldest first, with whether its project
# and that project's team exist.
TEAMLESS_AGENTS_SQL = (
    "SELECT u.id AS id, u.agent_project_id AS project_id, p.id AS project_found, "
    "p.team_id AS project_team_id, t.id AS team_id, u.external_ref AS external_ref, "
    "u.is_active AS is_active "
    "FROM users AS u "
    "LEFT JOIN projects AS p ON p.id = u.agent_project_id "
    "LEFT JOIN teams AS t ON t.id = p.team_id "
    "WHERE u.is_agent AND u.agent_team_id IS NULL "
    "ORDER BY u.created_at, u.id"
)
HELD_REFS_SQL = (
    "SELECT agent_team_id, external_ref FROM users "
    "WHERE agent_team_id IS NOT NULL AND external_ref IS NOT NULL"
)
# The active keys of every teamless agent (filtered to the placed ones
# in Python).
TEAMLESS_KEYS_SQL = (
    "SELECT k.id AS id, k.principal_user_id AS agent_id FROM api_keys AS k "
    "JOIN users AS u ON u.id = k.principal_user_id "
    "WHERE u.is_agent AND u.agent_team_id IS NULL AND k.is_active "
    "ORDER BY k.principal_user_id, k.created_at, k.id"
)

UNREACHABLE = "Nothing in the product can reach it. "
RETIRE_STEPS = (
    "To retire it, back up (`chaotic system backup`), stop the server, and run: "
    "UPDATE users SET is_active = 0 WHERE id = '{id}'; "
    "UPDATE api_keys SET is_active = 0 WHERE principal_user_id = '{id}';"
)

HEADER = (
    "[0036] the following takes effect when 0036 commits; if the upgrade fails or is rolled back, "
    "nothing was changed"
)
AUDIT_REASON = "agent_team_backfilled"
NO_CASCADE = '{"holder_sessions": 0, "tokens": 0}'

# The fallback with no connection to read through: the same backfill in
# three statements (the audit row and the revocations first, for the keys
# of exactly the agents the last statement places), skipping any agent
# whose external_ref could collide.
_FALLBACK_PLACEABLE = (
    "SELECT u.id FROM users AS u JOIN projects AS p ON p.id = u.agent_project_id "
    "JOIN teams AS t ON t.id = p.team_id "
    "WHERE u.is_agent AND u.agent_team_id IS NULL AND u.external_ref IS NULL"
)
FALLBACK_REVOKE_SQL = (
    f"UPDATE api_keys SET is_active = 0 WHERE is_active AND principal_user_id IN ({_FALLBACK_PLACEABLE})"
)
FALLBACK_AUDIT_SQL = (
    "INSERT INTO revocation_events (id, seq, team_id, actor_id, target_type, target_id, filter, "
    "dry_run, cascade_counts, reason, created_at) "
    "SELECT lower(hex(randomblob(16))), (SELECT COALESCE(MAX(seq), 0) + 1 FROM revocation_events), "
    "NULL, NULL, 'API_KEY', NULL, "
    "json_object('migration', '0036_agents_have_a_team', 'key_ids', json_group_array(k.id)), 0, "
    f"'{NO_CASCADE}', '{AUDIT_REASON}', strftime('%Y-%m-%d %H:%M:%S', 'now') || '.000000' "
    f"FROM api_keys AS k WHERE k.is_active AND k.principal_user_id IN ({_FALLBACK_PLACEABLE}) "
    "HAVING count(*) > 0"
)
FALLBACK_BACKFILL_SQL = (
    "UPDATE users SET agent_team_id = "
    "(SELECT p.team_id FROM projects AS p WHERE p.id = users.agent_project_id) "
    f"WHERE id IN ({_FALLBACK_PLACEABLE})"
)



def sql_literal(value: str) -> str:
    """``value`` as an SQLite string literal. A NUL cannot be written as
    one; that stops the migration, saying which value."""
    if "\x00" in value:
        raise ValueError(
            f"[0036] id {value!r} contains a NUL character, which cannot be written "
            "in the backfill's SQL; fix that row, then migrate again"
        )
    return "'" + value.replace("'", "''") + "'"


def plan_backfill(
    agents: list[dict], held: set[tuple[str, str]],
) -> tuple[dict[str, tuple[str, str]], dict[str, str], dict[str, str]]:
    """From ``agents`` (rows of TEAMLESS_AGENTS_SQL) and the (team,
    external_ref) pairs already ``held``:

    - the agents to place ({id: (team id, project id)});
    - the active agents left as they are ({id: the line explaining why,
      with the steps to retire it});
    - the inactive agents left as they are ({id: an informational line}).
    """
    placed: dict[str, tuple[str, str]] = {}
    left: dict[str, str] = {}
    idle: dict[str, str] = {}
    held = set(held)
    for row in agents:
        agent_id, project_id, team_id = row["id"], row["project_id"], row["team_id"]
        if project_id is None:
            why = f"[0036] agent {agent_id} has neither a team nor a project; agent_team_id left NULL."
        elif row["project_found"] is None:
            why = f"[0036] agent {agent_id}: its project {project_id} no longer exists; agent_team_id left NULL."
        elif team_id is None:
            why = (
                f"[0036] agent {agent_id}: its project {project_id}'s team {row['project_team_id']} no "
                "longer exists; agent_team_id left NULL."
            )
        elif row["external_ref"] is not None and (team_id, row["external_ref"]) in held:
            why = (
                f"[0036] agent {agent_id}: team {team_id} already has an identity with its "
                "external_ref; agent_team_id left NULL so the upgrade does not fail. Retire one of the two."
            )
        else:
            placed[agent_id] = (team_id, project_id)
            if row["external_ref"] is not None:
                held.add((team_id, row["external_ref"]))
            continue
        if not row["is_active"]:
            idle[agent_id] = f"{why} (already inactive)"
        else:
            left[agent_id] = f"{why} {UNREACHABLE}{RETIRE_STEPS.format(id=agent_id)}"
    return placed, left, idle


def plan_revocations(keys: list[dict], placed: dict) -> dict[str, list[str]]:
    """The active keys (rows of TEAMLESS_KEYS_SQL) of the placed agents,
    {agent id: [key id, ...]}."""
    revoked: dict[str, list[str]] = {}
    for row in keys:
        if row["agent_id"] in placed:
            revoked.setdefault(row["agent_id"], []).append(row["id"])
    return revoked


def report_lines(
    placed: dict, revoked: dict, left: dict, idle: dict, *, inactive: frozenset = frozenset(),
) -> list[str]:
    """The [0036] lines, ids only, under HEADER. ``inactive``: placed
    agents already deactivated, said so on their line."""
    if not (placed or left or idle):
        return []
    lines = [HEADER]
    for agent_id, (team_id, project_id) in placed.items():
        lines.append(
            f"[0036] agent {agent_id}: agent_team_id set to {team_id}, the team of its project "
            f"{project_id}{' (already inactive)' if agent_id in inactive else ''}"
        )
    keys = [key_id for ids in revoked.values() for key_id in ids]
    if keys:
        lines.append(
            f"[0036] revoked {len(keys)} API key(s) of the agents given a team, which had not "
            "signed in since their agent lost its team; the agent's owner must mint a new key "
            f"(`chaotic agent keys create`) for any agent still in use: {', '.join(keys)}"
        )
    lines.extend(left.values())
    lines.extend(idle.values())
    lines.append(
        f"[0036] {len(placed)} agent(s) given their project's team, {len(left)} left without one "
        f"to retire, {len(idle)} already inactive"
    )
    return lines


def audit_sql(key_ids: list[str], *, now: str, event_id: str) -> str:
    """The one revocation_events row for the keys this migration
    revokes (see the docstring), as a literal INSERT."""
    import json

    filter_ = json.dumps({"migration": "0036_agents_have_a_team", "key_ids": key_ids})
    return (
        "INSERT INTO revocation_events (id, seq, team_id, actor_id, target_type, target_id, filter, "
        "dry_run, cascade_counts, reason, created_at) VALUES ("
        f"{sql_literal(event_id)}, (SELECT COALESCE(MAX(seq), 0) + 1 FROM revocation_events), "
        f"NULL, NULL, 'API_KEY', NULL, {sql_literal(filter_)}, 0, {sql_literal(NO_CASCADE)}, "
        f"{sql_literal(AUDIT_REASON)}, {sql_literal(now)})"
    )


def _read_through_oxyde(database, sql: str, params: list) -> list[dict]:
    """Rows of `sql` (as dicts keyed by column name), read through Oxyde's
    own connection to the migration target. (0034's, copied so a later
    edit there cannot change this migration.)

    Never sqlite3.connect() the target here: Oxyde links its own copy of
    SQLite, POSIX locks are per process, and a second copy opening the
    same WAL database truncates the -shm Oxyde has mapped and drops its
    locks on close (CHT-1491). upgrade() is synchronous and runs inside
    the executor's event loop, so the query runs on a short-lived thread
    with an event loop of its own.
    """
    import asyncio
    import threading

    from oxyde import execute_raw

    outcome = {}

    def run():
        try:
            outcome["rows"] = asyncio.run(execute_raw(sql, params, client=database))
        except BaseException as error:  # re-raised on the migration's thread
            outcome["error"] = error

    reader = threading.Thread(target=run, name="migration-0036-read")
    reader.start()
    reader.join()
    if "error" in outcome:
        raise outcome["error"]
    return outcome["rows"]


def _recording(ctx) -> bool:
    """True in the replay (collect mode); see 0017."""
    return getattr(ctx, "_mode", "execute") == "collect"


def backfill(ctx, echo=print) -> int | None:
    """Queue the writes and print what they will do. Returns how many
    agents it places, or None when there was no connection to read
    through (the SQL fallback is queued instead). Nothing in the replay,
    which has no rows."""
    if _recording(ctx):
        return None
    database = getattr(ctx, "_db_conn", None)
    if (
        getattr(ctx, "dialect", "sqlite") != "sqlite"
        or database is None
        or not callable(getattr(database, "execute", None))
    ):
        echo(
            "[0036] cannot read users to list the agents it backfills (no SQLite connection to "
            "read through); when 0036 commits, every agent whose project and team exist gets that "
            "team in one statement instead, and those agents' API keys are revoked (their owners "
            "must mint new ones). Agents it cannot place are left without a team"
        )
        ctx.execute(FALLBACK_AUDIT_SQL)
        ctx.execute(FALLBACK_REVOKE_SQL)
        ctx.execute(FALLBACK_BACKFILL_SQL)
        return None
    import uuid
    from datetime import datetime, timezone

    agents = _read_through_oxyde(database, TEAMLESS_AGENTS_SQL, [])
    held = {
        (row["agent_team_id"], row["external_ref"])
        for row in _read_through_oxyde(database, HELD_REFS_SQL, [])
    }
    placed, left, idle = plan_backfill(agents, held)
    inactive = frozenset(row["id"] for row in agents if not row["is_active"])
    revoked = plan_revocations(_read_through_oxyde(database, TEAMLESS_KEYS_SQL, []), placed)
    for agent_id, (team_id, _project_id) in placed.items():
        ctx.execute(
            f"UPDATE users SET agent_team_id = {sql_literal(team_id)} "
            f"WHERE id = {sql_literal(agent_id)} AND agent_team_id IS NULL"
        )
    key_ids = [key_id for ids in revoked.values() for key_id in ids]
    for key_id in key_ids:
        ctx.execute(f"UPDATE api_keys SET is_active = 0 WHERE id = {sql_literal(key_id)}")
    if key_ids:
        ctx.execute(audit_sql(
            key_ids,
            # The naive-UTC text Oxyde 0.7 stores (see 0006).
            now=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S.%f"),
            event_id=str(uuid.uuid4()),
        ))
    for line in report_lines(placed, revoked, left, idle, inactive=inactive):
        echo(line)
    return len(placed)


def upgrade(ctx):
    """Apply migration."""
    backfill(ctx)


def downgrade(ctx):
    """Revert migration: nothing to undo (see the docstring)."""
