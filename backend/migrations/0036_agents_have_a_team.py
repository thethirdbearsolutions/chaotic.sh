"""Every agent has a team (CHT-1837): users.agent_team_id is backfilled
for the project-scoped agents made without one.

`AgentService.create` has always set agent_team_id, but older
project-scoped agents carry only agent_project_id. Some code derived
their team from the project (`agent_home_team_id`, the teamless branch
of the MCP assignee lookup) and the rest silently skipped them: they
were invisible to the team's agent list, unmentionable, unfilterable,
and their inbox entries were broadcast to no team. This migration gives
each one its project's team, so every reader can use agent_team_id
alone; the code that worked around the gap is deleted in the same
change.

Data only, no schema change, so nothing is recorded in the replay
(collect mode). The agents are read through the migration's own Oxyde
connection (never Python's sqlite3, CHT-1491) before anything is
written, and one UPDATE per agent is queued with its ids as quoted
literals (ctx.execute takes no parameters). Each UPDATE also requires
agent_team_id to still be NULL, so it never overwrites a team.

Every agent it backfills is printed on one `[0036]` line, by id only.
It never fails the upgrade over an agent it cannot place; it leaves the
agent as it is (agent_team_id NULL) and prints why:

- its project no longer exists (deleted while foreign keys were off, or
  on a database without that foreign key): the agent could only ever
  reach that project, so it can reach nothing now; deactivate or
  delete it;
- it has no project either: it never had any scope and can reach
  nothing; deactivate or delete it;
- its project's team already has an identity with the same
  external_ref (UNIQUE (agent_team_id, external_ref), migration 0023):
  setting the team would break that index and fail the upgrade, so it
  is left for an operator to resolve.

To count the rows before upgrading (read-only):

    SELECT count(*), sum(p.id IS NOT NULL) FROM users AS u
    LEFT JOIN projects AS p ON p.id = u.agent_project_id
    WHERE u.is_agent AND u.agent_team_id IS NULL;

(the first number is every teamless agent, the second those this
migration can place).

Why no CHECK constraint (the ticket asked for one): SQLite cannot add a
CHECK to an existing table, so it would take a rebuild, or a
stored-text edit like 0020's, of `users`, the table nearly every other
one references. And it would not hold: a database built from the chain
carries `agent_team_id REFERENCES teams(id) ON DELETE SET NULL` from
0001, so with a CHECK in place deleting any team that has agents would
fail; and every UPDATE of an agent left NULL above (renaming or
deactivating it) would fail as well. The rule is enforced where every
INSERT passes instead: `OxydeUser.derive_on_create` refuses an agent
without a team.

The downgrade changes nothing: the team an agent was given is the one
it always reached, and nothing records which agents had none before.

Created: 2026-10-15
"""

depends_on = "0034_users_email_folded"

# Every agent without a team, oldest first, with its project's team (NULL
# when the project is gone or it has none) and whether the
# (team, external_ref) it would get is already held.
TEAMLESS_AGENTS_SQL = (
    "SELECT u.id AS id, u.agent_project_id AS project_id, p.team_id AS team_id, "
    "u.external_ref AS external_ref FROM users AS u "
    "LEFT JOIN projects AS p ON p.id = u.agent_project_id "
    "WHERE u.is_agent AND u.agent_team_id IS NULL "
    "ORDER BY u.created_at, u.id"
)
HELD_REFS_SQL = (
    "SELECT agent_team_id, external_ref FROM users "
    "WHERE agent_team_id IS NOT NULL AND external_ref IS NOT NULL"
)

# The fallback with no connection to read through: the same backfill in
# one statement, skipping any agent whose external_ref could collide.
FALLBACK_BACKFILL_SQL = (
    "UPDATE users SET agent_team_id = "
    "(SELECT p.team_id FROM projects AS p WHERE p.id = users.agent_project_id) "
    "WHERE is_agent AND agent_team_id IS NULL AND external_ref IS NULL "
    "AND agent_project_id IN (SELECT id FROM projects)"
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
        if project_id is None:
            left[agent_id] = (
                f"[0036] agent {agent_id} has neither a team nor a project; agent_team_id left NULL. "
                "It can reach nothing: deactivate or delete it"
            )
        elif team_id is None:
            left[agent_id] = (
                f"[0036] agent {agent_id}: its project {project_id} no longer exists; agent_team_id "
                "left NULL. It could only reach that project, so it can reach nothing now: "
                "deactivate or delete it"
            )
        elif row["external_ref"] is not None and (team_id, row["external_ref"]) in held:
            left[agent_id] = (
                f"[0036] agent {agent_id}: team {team_id} already has an identity with its "
                "external_ref; agent_team_id left NULL so the upgrade does not fail. Retire one "
                f"of the two, then set agent_team_id to {team_id} by hand"
            )
        else:
            placed[agent_id] = (team_id, project_id)
            if row["external_ref"] is not None:
                held.add((team_id, row["external_ref"]))
    return placed, left


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
    """Queue one UPDATE per agent it can place and print one line per
    agent, placed or not (ids only). Returns how many it placed, or None
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
            "read through); giving every agent whose project exists that project's team in one "
            "statement instead. Agents whose project is gone are left without a team"
        )
        ctx.execute(FALLBACK_BACKFILL_SQL)
        return None
    agents = _read_through_oxyde(database, TEAMLESS_AGENTS_SQL, [])
    held = {
        (row["agent_team_id"], row["external_ref"])
        for row in _read_through_oxyde(database, HELD_REFS_SQL, [])
    }
    placed, left = plan_backfill(agents, held)
    for agent_id, (team_id, project_id) in placed.items():
        ctx.execute(
            f"UPDATE users SET agent_team_id = {sql_literal(team_id)} "
            f"WHERE id = {sql_literal(agent_id)} AND agent_team_id IS NULL"
        )
        echo(f"[0036] agent {agent_id}: agent_team_id set to {team_id}, the team of its project {project_id}")
    for line in left.values():
        echo(line)
    if placed or left:
        echo(f"[0036] {len(placed)} agent(s) given their project's team, {len(left)} left without one")
    return len(placed)


def upgrade(ctx):
    """Apply migration."""
    backfill(ctx)


def downgrade(ctx):
    """Revert migration: nothing to undo (see the docstring)."""
