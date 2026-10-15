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
wanted again. Sessions and codes opened with those keys need nothing:
they are checked against the key's liveness on every use.

Data only, no schema change, so nothing is recorded in the replay
(collect mode). The agents and their keys are read through the
migration's own Oxyde connection (never Python's sqlite3, CHT-1491)
before anything is written, and the UPDATEs are queued with their ids
as quoted literals (ctx.execute takes no parameters). Each users UPDATE
also requires agent_team_id to still be NULL, so it never overwrites a
team.

What it prints, one `[0036]` line per row, ids only, is printed after
the transaction has committed and was read back: a line saying an agent
was given a team or a key was revoked is never printed for a write that
was rolled back. (Where the executor gives no way to run after the
commit, the lines say what was queued instead.)

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
    "p.team_id AS project_team_id, t.id AS team_id, u.external_ref AS external_ref "
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

# The fallback with no connection to read through: the same backfill in
# two statements, revoking first (the keys of exactly the agents the
# second statement places), and skipping any agent whose external_ref
# could collide.
_FALLBACK_PLACEABLE = (
    "SELECT u.id FROM users AS u JOIN projects AS p ON p.id = u.agent_project_id "
    "JOIN teams AS t ON t.id = p.team_id "
    "WHERE u.is_agent AND u.agent_team_id IS NULL AND u.external_ref IS NULL"
)
FALLBACK_REVOKE_SQL = (
    f"UPDATE api_keys SET is_active = 0 WHERE is_active AND principal_user_id IN ({_FALLBACK_PLACEABLE})"
)
FALLBACK_BACKFILL_SQL = (
    "UPDATE users SET agent_team_id = "
    "(SELECT p.team_id FROM projects AS p WHERE p.id = users.agent_project_id) "
    f"WHERE id IN ({_FALLBACK_PLACEABLE})"
)

RETIRE = (
    "Nothing in the product can reach it; to retire it, back up (`chaotic system backup`), "
    "stop the server, and run: UPDATE users SET is_active = 0 WHERE id = '{id}'; "
    "UPDATE api_keys SET is_active = 0 WHERE principal_user_id = '{id}';"
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
) -> tuple[dict[str, tuple[str, str]], dict[str, str]]:
    """From ``agents`` (rows of TEAMLESS_AGENTS_SQL) and the (team,
    external_ref) pairs already ``held``:

    - the agents to place ({id: (team id, project id)});
    - the agents left as they are ({id: the line explaining why}).
    """
    placed: dict[str, tuple[str, str]] = {}
    left: dict[str, str] = {}
    held = set(held)
    for row in agents:
        agent_id, project_id, team_id = row["id"], row["project_id"], row["team_id"]
        retire = RETIRE.format(id=agent_id)
        if project_id is None:
            left[agent_id] = (
                f"[0036] agent {agent_id} has neither a team nor a project; agent_team_id left NULL. "
                + retire
            )
        elif row["project_found"] is None:
            left[agent_id] = (
                f"[0036] agent {agent_id}: its project {project_id} no longer exists; agent_team_id "
                "left NULL. " + retire
            )
        elif team_id is None:
            left[agent_id] = (
                f"[0036] agent {agent_id}: its project {project_id}'s team {row['project_team_id']} no "
                "longer exists; agent_team_id left NULL. " + retire
            )
        elif row["external_ref"] is not None and (team_id, row["external_ref"]) in held:
            left[agent_id] = (
                f"[0036] agent {agent_id}: team {team_id} already has an identity with its "
                "external_ref; agent_team_id left NULL so the upgrade does not fail. Retire one "
                f"of the two; to retire this one: " + retire
            )
        else:
            placed[agent_id] = (team_id, project_id)
            if row["external_ref"] is not None:
                held.add((team_id, row["external_ref"]))
    return placed, left


def plan_revocations(keys: list[dict], placed: dict) -> dict[str, list[str]]:
    """The active keys (rows of TEAMLESS_KEYS_SQL) of the placed agents,
    {agent id: [key id, ...]}."""
    revoked: dict[str, list[str]] = {}
    for row in keys:
        if row["agent_id"] in placed:
            revoked.setdefault(row["agent_id"], []).append(row["id"])
    return revoked


def report_lines(placed: dict, revoked: dict, left: dict, *, done: bool) -> list[str]:
    """The [0036] lines, ids only. ``done``: the writes have committed
    (else they are only queued)."""
    did = "" if done else " (queued)"
    lines = []
    for agent_id, (team_id, project_id) in placed.items():
        lines.append(
            f"[0036] agent {agent_id}: agent_team_id set to {team_id}, the team of its project "
            f"{project_id}{did}"
        )
    keys = [key_id for ids in revoked.values() for key_id in ids]
    if keys:
        lines.append(
            f"[0036] revoked {len(keys)} API key(s) of the agents given a team{did}, which had not "
            "signed in since their agent lost its team; the agent's owner must mint a new key "
            f"(`chaotic agent keys create`) for any agent still in use: {', '.join(keys)}"
        )
    lines.extend(left.values())
    if placed or left:
        lines.append(f"[0036] {len(placed)} agent(s) given their project's team, {len(left)} left without one")
    return lines


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


async def _written(database, placed: dict, revoked: dict) -> tuple[dict, dict]:
    """Of the planned writes, those the database now holds."""
    from oxyde import execute_raw

    if not placed:
        return {}, {}
    ids = ", ".join(sql_literal(agent_id) for agent_id in placed)
    teams = {
        row["id"]: row["agent_team_id"]
        for row in await execute_raw(f"SELECT id, agent_team_id FROM users WHERE id IN ({ids})", [], client=database)
    }
    now_placed = {a: v for a, v in placed.items() if teams.get(a) == v[0]}
    all_keys = [k for ks in revoked.values() for k in ks]
    inactive = set()
    if all_keys:
        listed = ", ".join(sql_literal(k) for k in all_keys)
        inactive = {
            row["id"]
            for row in await execute_raw(
                f"SELECT id FROM api_keys WHERE id IN ({listed}) AND NOT is_active", [], client=database,
            )
        }
    now_revoked = {a: [k for k in ks if k in inactive] for a, ks in revoked.items()}
    return now_placed, {a: ks for a, ks in now_revoked.items() if ks}


def backfill(ctx, echo=print) -> int | None:
    """Queue the UPDATEs and arrange for the report to print once they
    have committed. Returns how many agents it plans to place, or None
    when there was no connection to read through (the SQL fallback is
    queued instead). Nothing in the replay, which has no rows."""
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
            "read through); giving every agent whose project and team exist that team in one "
            "statement instead, and revoking those agents' API keys (their owners must mint new "
            "ones). Agents it cannot place are left without a team"
        )
        ctx.execute(FALLBACK_REVOKE_SQL)
        ctx.execute(FALLBACK_BACKFILL_SQL)
        return None
    agents = _read_through_oxyde(database, TEAMLESS_AGENTS_SQL, [])
    held = {
        (row["agent_team_id"], row["external_ref"])
        for row in _read_through_oxyde(database, HELD_REFS_SQL, [])
    }
    placed, left = plan_backfill(agents, held)
    revoked = plan_revocations(_read_through_oxyde(database, TEAMLESS_KEYS_SQL, []), placed)
    for agent_id, (team_id, _project_id) in placed.items():
        ctx.execute(
            f"UPDATE users SET agent_team_id = {sql_literal(team_id)} "
            f"WHERE id = {sql_literal(agent_id)} AND agent_team_id IS NULL"
        )
    for key_ids in revoked.values():
        for key_id in key_ids:
            ctx.execute(f"UPDATE api_keys SET is_active = 0 WHERE id = {sql_literal(key_id)}")

    commit = getattr(ctx, "_execute_collected_sql", None)
    if not callable(commit):
        for line in report_lines(placed, revoked, left, done=False):
            echo(line)
        return len(placed)

    async def commit_then_report():
        # The executor runs this after upgrade() returns: the queued
        # statements, in one transaction. Report only what it holds once
        # that has committed (an exception here is the migration failing,
        # and prints nothing but the executor's error).
        await commit()
        now_placed, now_revoked = await _written(database, placed, revoked)
        for line in report_lines(now_placed, now_revoked, left, done=True):
            echo(line)
        missing = set(placed) - set(now_placed)
        if missing:
            echo(f"[0036] {len(missing)} planned agent(s) not written (changed during the upgrade): {', '.join(sorted(missing))}")

    ctx._execute_collected_sql = commit_then_report
    return len(placed)


def upgrade(ctx):
    """Apply migration."""
    backfill(ctx)


def downgrade(ctx):
    """Revert migration: nothing to undo (see the docstring)."""
