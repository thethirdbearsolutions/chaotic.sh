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
from app.services.user_service import UserDeletionRefusedError, UserService


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
    assert test_user.name in detail and "it authored 1 issue." in detail
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
    assert f"'Worker' ({worker.id[:8]}) authored 1 issue comment, 1 ritual gate request." in detail
    assert "Idle" not in detail
    for agent in (worker, idle):
        assert await service.get_by_id(agent.id) is not None, "nothing may be deleted on refusal"
        assert await OxydeAPIKey.objects.filter(principal_user_id=agent.id).count() == 1
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

    with pytest.raises(UserDeletionRefusedError) as refused:
        await UserService().delete(test_user)

    assert refused.value.counts["issues"] == 1
    assert refused.value.agent_counts[agent.id]["issues"] == 2
    assert refused.value.agent_names == {agent.id: "Writer"}
    assert "it authored 1 issue;" in str(refused.value)
    assert f"'Writer' ({agent.id[:8]}) authored 2 issues." in str(refused.value)


@pytest.mark.asyncio
async def test_agents_with_the_same_name_are_reported_separately(test_user, test_team, test_project):
    """Agent names are not unique; the refusal must not fold two into one."""
    service = AgentService()
    first, _, _ = await service.create(AgentCreate(name="Worker"), test_user, test_team.id)
    second, _, _ = await service.create(AgentCreate(name="Worker"), test_user, test_team.id)
    await _issue(test_project, 506, first.id)
    await _issue(test_project, 507, second.id)
    await _issue(test_project, 508, second.id)

    with pytest.raises(UserDeletionRefusedError) as refused:
        await UserService().delete(test_user)

    assert refused.value.agent_counts[first.id]["issues"] == 1
    assert refused.value.agent_counts[second.id]["issues"] == 2
    message = str(refused.value)
    assert f"'Worker' ({first.id[:8]}) authored 1 issue" in message
    assert f"'Worker' ({second.id[:8]}) authored 2 issues" in message


@pytest.mark.asyncio
async def test_gate_clearances_and_blocker_resolutions_count_as_authored(
    test_user, test_project, test_issue, make_ritual,
):
    """A human who only approved gates is still the record of who did."""
    from app.oxyde_models.issue import OxydeTicketLimboBlocker

    other = await OxydeUser.objects.create(email="req@example.com", hashed_password="x", name="Requester")
    ritual = await make_ritual()
    limbo = await OxydeTicketLimbo.objects.create(
        issue_id=test_issue.id, limbo_type=LimboType.CLOSE, requested_by_id=other.id, cleared_by_id=test_user.id,
    )
    await OxydeTicketLimboBlocker.objects.create(limbo_id=limbo.id, ritual_id=ritual.id, resolved_by_id=test_user.id)
    # test_issue was created by test_user; leave only the gate attribution.
    await OxydeIssue.objects.filter(id=test_issue.id).update(creator_id=other.id)

    with pytest.raises(UserDeletionRefusedError) as refused:
        await UserService().delete(test_user)

    counts = {kind: n for kind, n in refused.value.counts.items() if n}
    assert counts == {"ritual gate clearances": 1, "ritual blocker resolutions": 1}
    assert "1 ritual gate clearance, 1 ritual blocker resolution" in str(refused.value)


@pytest.mark.asyncio
async def test_a_non_agent_row_naming_the_user_as_parent_refuses_the_delete(client, auth_headers, test_user):
    """Legacy or hand-edited data: a non-agent row with parent_user_id set.
    The RESTRICT applies to it, so the delete must refuse with a 409 that
    names it, not fail with a 500 or delete a login account."""
    child = await OxydeUser.objects.create(
        email="child@example.com", hashed_password="x", name="Child", parent_user_id=test_user.id,
    )

    response = await client.delete("/api/users/me", headers=auth_headers)

    assert response.status_code == 409, response.text
    detail = response.json()["detail"]
    assert f"'Child' ({child.id[:8]})" in detail and "not agents" in detail
    assert await OxydeUser.objects.filter(id=child.id).count() == 1
    assert await OxydeUser.objects.filter(id=test_user.id).count() == 1


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
        assert await OxydeAPIKey.objects.filter(principal_user_id=agent.id).count() == 0
    assert await OxydeAPIKey.objects.filter(holder_user_id=test_user.id).count() == 0
    assert await OxydeTeamMember.objects.filter(user_id=test_user.id).count() == 0


@pytest.mark.asyncio
async def test_another_humans_agents_are_untouched(client, auth_headers, test_user, test_user2, test_team):
    other, _, _ = await AgentService().create(AgentCreate(name="Theirs"), test_user2, test_team.id)

    response = await client.delete("/api/users/me", headers=auth_headers)

    assert response.status_code == 204, response.text
    assert await OxydeUser.objects.filter(id=other.id).count() == 1
    assert await OxydeAPIKey.objects.filter(principal_user_id=other.id).count() == 1


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
