"""Deleting a human applies the agent-delete rule to the account and every
agent it owns (CHT-1467).

Before, `DELETE /users/me` removed the user row and let the database's
`users.parent_user_id ON DELETE CASCADE` delete their agents, skipping
the authored-content guard `DELETE /agents/{id}` has (CHT-1427) and
taking the agents' ritual-gate requests (ticket_limbo, still CASCADE)
with them.
"""
import pytest

from app.enums import LimboType
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.issue import OxydeIssue, OxydeIssueComment, OxydeTicketLimbo
from app.oxyde_models.team import OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.schemas.agent import AgentCreate
from app.services.agent_service import AgentService
from app.services.user_service import UserHasAuthoredContentError, UserService


async def _issue(project, number, creator_id):
    return await OxydeIssue.objects.create(
        project_id=project.id, identifier=f"{project.key}-{number}", number=number, title="t",
        creator_id=creator_id,
    )


@pytest.mark.asyncio
async def test_a_human_who_authored_anything_is_not_deleted(client, auth_headers, test_user, test_project):
    issue = await _issue(test_project, 501, test_user.id)

    response = await client.delete("/api/users/me", headers=auth_headers)

    assert response.status_code == 409, response.text
    detail = response.json()["detail"]
    assert test_user.name in detail and "1 issues" in detail
    assert await OxydeUser.objects.filter(id=test_user.id).count() == 1
    assert (await OxydeIssue.objects.get(id=issue.id)).creator_id == test_user.id
    assert await OxydeTeamMember.objects.filter(user_id=test_user.id).count() >= 1


@pytest.mark.asyncio
async def test_an_agent_with_authored_work_blocks_its_owners_deletion(
    client, auth_headers, test_user, test_team, test_project,
):
    """The bypass: deleting the owner must not delete an agent the agent
    route would refuse to delete."""
    service = AgentService()
    worker, _, _ = await service.create(AgentCreate(name="Worker"), test_user, test_team.id)
    idle, _, _ = await service.create(AgentCreate(name="Idle"), test_user, test_team.id)
    issue = await _issue(test_project, 502, test_user.id)
    # The human's own issue is authored work too; take it out of the
    # picture so the refusal below is the agent's alone.
    await OxydeIssue.objects.filter(id=issue.id).update(creator_id=None)
    await OxydeIssueComment.objects.create(issue_id=issue.id, author_id=worker.id, content="c")
    limbo = await OxydeTicketLimbo.objects.create(
        issue_id=issue.id, limbo_type=LimboType.CLOSE, requested_by_id=worker.id,
    )

    response = await client.delete("/api/users/me", headers=auth_headers)

    assert response.status_code == 409, response.text
    detail = response.json()["detail"]
    assert "'Worker' authored 1 issue comments, 1 ritual gate requests" in detail
    assert "Idle" not in detail
    for agent in (worker, idle):
        assert await service.get_by_id(agent.id) is not None, "nothing may be deleted on refusal"
        assert await OxydeAPIKey.objects.filter(agent_user_id=agent.id).count() == 1
    assert await OxydeUser.objects.filter(id=test_user.id).count() == 1
    assert await OxydeTicketLimbo.objects.filter(id=limbo.id).count() == 1
    assert await OxydeIssueComment.objects.filter(author_id=worker.id).count() == 1


@pytest.mark.asyncio
async def test_refusal_reports_the_users_and_each_agents_counts(test_user, test_team, test_project):
    service = AgentService()
    agent, _, _ = await service.create(AgentCreate(name="Writer"), test_user, test_team.id)
    await _issue(test_project, 503, test_user.id)
    await _issue(test_project, 504, agent.id)
    await _issue(test_project, 505, agent.id)

    with pytest.raises(UserHasAuthoredContentError) as refused:
        await UserService().delete(test_user)

    assert refused.value.counts["issues"] == 1
    assert refused.value.agent_counts["Writer"]["issues"] == 2
    assert "it authored 1 issues" in str(refused.value)


@pytest.mark.asyncio
async def test_a_human_whose_agents_authored_nothing_is_deleted_with_them(
    client, auth_headers, test_user, test_team,
):
    service = AgentService()
    agents = [
        (await service.create(AgentCreate(name=name), test_user, test_team.id))[0] for name in ("A", "B")
    ]

    response = await client.delete("/api/users/me", headers=auth_headers)

    assert response.status_code == 204, response.text
    assert await OxydeUser.objects.filter(id=test_user.id).count() == 0
    for agent in agents:
        assert await OxydeUser.objects.filter(id=agent.id).count() == 0
        assert await OxydeAPIKey.objects.filter(agent_user_id=agent.id).count() == 0
    assert await OxydeAPIKey.objects.filter(user_id=test_user.id).count() == 0
    assert await OxydeTeamMember.objects.filter(user_id=test_user.id).count() == 0


@pytest.mark.asyncio
async def test_another_humans_agents_are_untouched(client, auth_headers, test_user, test_user2, test_team):
    other, _, _ = await AgentService().create(AgentCreate(name="Theirs"), test_user2, test_team.id)

    response = await client.delete("/api/users/me", headers=auth_headers)

    assert response.status_code == 204, response.text
    assert await OxydeUser.objects.filter(id=other.id).count() == 1
    assert await OxydeAPIKey.objects.filter(agent_user_id=other.id).count() == 1


@pytest.mark.asyncio
async def test_an_agent_cannot_delete_itself_through_users_me(client, test_user, test_team):
    """An agent's own key used to delete it here, without the owner's say
    and without the authored-content guard."""
    agent, key, _ = await AgentService().create(AgentCreate(name="Self"), test_user, test_team.id)

    response = await client.delete("/api/users/me", headers={"Authorization": f"Bearer {key}"})

    assert response.status_code == 403, response.text
    assert await OxydeUser.objects.filter(id=agent.id).count() == 1
    assert await OxydeUser.objects.filter(id=test_user.id).count() == 1


@pytest.mark.asyncio
async def test_the_database_refuses_to_delete_a_human_who_still_has_agents(test_user, test_team):
    """The backstop (0020): any path that deletes the user row directly
    fails instead of cascading to the agents."""
    from oxyde import execute_raw

    agent, _, _ = await AgentService().create(AgentCreate(name="Kept"), test_user, test_team.id)
    assert (await execute_raw("PRAGMA foreign_keys"))[0]["foreign_keys"] == 1

    with pytest.raises(Exception, match="FOREIGN KEY"):
        await OxydeUser.objects.filter(id=test_user.id).delete()

    assert await OxydeUser.objects.filter(id=agent.id).count() == 1
    assert await OxydeUser.objects.filter(id=test_user.id).count() == 1
