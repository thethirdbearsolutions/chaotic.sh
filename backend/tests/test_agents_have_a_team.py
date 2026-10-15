"""Every agent has a team (CHT-1837).

A project-scoped agent made before AgentService always set
agent_team_id carried only its project. Some readers derived its team
from the project and the rest skipped it: the agent was missing from
its team's agent list, could not be @mentioned, matched no
`assignee=` filter, and had no team in `get_user_teams`. Migration 0036
gives each one its project's team; after that every reader finds it by
agent_team_id alone, with no change at any of them. A new agent without
a team is refused on INSERT.
"""
import importlib.util
from pathlib import Path

import pytest
from oxyde import execute_raw

from app.oxyde_models.user import OxydeUser
from app.utils.security import create_access_token

from .test_issue_query import _issue, _query

MIGRATION = Path(__file__).resolve().parents[1] / "migrations" / "0036_agents_have_a_team.py"


def _migration():
    spec = importlib.util.spec_from_file_location("migration_0036", MIGRATION)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


async def _run_0036_backfill() -> list[str]:
    """Plan and apply 0036's backfill against this database, with its own
    queries and UPDATEs. (The migration itself runs on a real chain-built
    database in test_agents_have_a_team_migration.py.)"""
    module = _migration()
    agents = await execute_raw(module.TEAMLESS_AGENTS_SQL, [])
    held = {(r["agent_team_id"], r["external_ref"]) for r in await execute_raw(module.HELD_REFS_SQL, [])}
    placed, _left = module.plan_backfill(agents, held)
    for agent_id, (team_id, _project_id) in placed.items():
        await execute_raw(
            f"UPDATE users SET agent_team_id = {module.sql_literal(team_id)} "
            f"WHERE id = {module.sql_literal(agent_id)} AND agent_team_id IS NULL",
            [],
        )
    return list(placed)


async def _legacy_project_agent(owner, project, *, name="Legacy Bot"):
    """The shape AgentService never makes any more: a project-scoped agent
    with no agent_team_id. It cannot be inserted that way now, so it is
    inserted with its team and then has it cleared."""
    agent = await OxydeUser.objects.create(
        email=f"{name.lower().replace(' ', '-')}@agent.local", hashed_password="", name=name,
        is_agent=True, parent_user_id=owner.id, agent_team_id=project.team_id,
        agent_project_id=project.id,
    )
    await OxydeUser.objects.filter(id=agent.id).update(agent_team_id=None)
    return await OxydeUser.objects.get(id=agent.id)


@pytest.mark.asyncio
async def test_a_backfilled_legacy_agent_is_visible_mentionable_and_filterable(
    client, auth_headers, test_user, test_team, test_project,
):
    from app.api.deps import check_user_in_team
    from app.services.mention_handles import MentionDirectory
    from app.services.team_service import TeamService

    agent = await _legacy_project_agent(test_user, test_project)
    assigned = await _issue(test_project, test_user, title="theirs", assignee_id=agent.id)
    await _issue(test_project, test_user, title="nobody's")
    where = f"assignee={agent.email}"

    # Before: skipped by every reader that goes by agent_team_id.
    assert (await client.get(f"/api/agents/{agent.id}", headers=auth_headers)).status_code == 404
    listed = await client.get(f"/api/teams/{test_team.id}/agents", headers=auth_headers)
    assert agent.id not in {a["id"] for a in listed.json()}
    assert (await MentionDirectory.for_team(test_team.id)).handle_for(agent.id) is None
    assert (await _query(client, auth_headers, f"projects/{test_project.id}", where=where)).status_code == 400
    assert await TeamService().get_user_teams(agent.id) == []
    assert not await check_user_in_team(agent, test_team.id)

    assert await _run_0036_backfill() == [agent.id]
    agent = await OxydeUser.objects.get(id=agent.id)
    assert agent.agent_team_id == test_team.id

    # After: found everywhere, with no reader changed.
    shown = await client.get(f"/api/agents/{agent.id}", headers=auth_headers)
    assert shown.status_code == 200, shown.text
    assert shown.json()["mention_handle"]
    listed = await client.get(f"/api/teams/{test_team.id}/agents", headers=auth_headers)
    assert agent.id in {a["id"] for a in listed.json()}
    assert (await MentionDirectory.for_team(test_team.id)).handle_for(agent.id) == shown.json()["mention_handle"]
    found = await _query(client, auth_headers, f"projects/{test_project.id}", where=where)
    assert found.status_code == 200, found.text
    assert [i["id"] for i in found.json()["issues"]] == [assigned.id]
    assert [t.id for t in await TeamService().get_user_teams(agent.id)] == [test_team.id]
    assert await check_user_in_team(agent, test_team.id)

    # And the agent itself, signed in, sees its own project's issues.
    headers = {"Authorization": f"Bearer {create_access_token(data={'sub': agent.id})}"}
    mine = await client.get(f"/api/issues?assignee_id={agent.id}", headers=headers)
    assert mine.status_code == 200, mine.text
    assert [i["id"] for i in mine.json()] == [assigned.id]


@pytest.mark.asyncio
async def test_an_agent_whose_project_is_gone_is_left_alone(test_user, test_team, test_project):
    agent = await _legacy_project_agent(test_user, test_project)
    # A project deleted while foreign keys were off (or on a database
    # without that foreign key): the agent still names it.
    await execute_raw("PRAGMA foreign_keys = OFF", [])
    try:
        await execute_raw("UPDATE users SET agent_project_id = 'gone' WHERE id = ?", [agent.id])
    finally:
        await execute_raw("PRAGMA foreign_keys = ON", [])
    assert await _run_0036_backfill() == []
    assert (await OxydeUser.objects.get(id=agent.id)).agent_team_id is None


@pytest.mark.asyncio
@pytest.mark.parametrize("fields", [
    {},
    {"agent_project_id": "some-project"},
    {"agent_team_id": ""},
])
async def test_an_agent_without_a_team_cannot_be_created(db, test_user, fields):
    with pytest.raises(ValueError, match="an agent must have a team"):
        await OxydeUser.objects.create(
            email="nobody@agent.local", hashed_password="", name="Nobody", is_agent=True, **fields,
        )
    with pytest.raises(ValueError, match="an agent must have a team"):
        await OxydeUser.objects.bulk_create([
            {"email": "nobody2@agent.local", "hashed_password": "", "name": "Nobody", "is_agent": True, **fields},
        ])
    with pytest.raises(ValueError, match="an agent must have a team"):
        await OxydeUser.objects.create(instance=OxydeUser(
            email="nobody3@agent.local", hashed_password="", name="Nobody", is_agent=True, **fields,
        ))
    assert await OxydeUser.objects.filter(is_agent=True).count() == 0
    # A human needs no team.
    await OxydeUser.objects.create(email="human@example.com", hashed_password="", name="Human")

