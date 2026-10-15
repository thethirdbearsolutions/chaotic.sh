"""One rule for who may hold work in a project (CHT-1830): an issue's
assignee and a project's lead are both checked by
``is_eligible_project_member``. Before, the assignee check refused a
project-scoped agent created without a team id in its own project, and
the lead check accepted a deactivated member and a sibling project's
agent. Every refusal is the same "not found" that names nobody.
"""
import pytest

from app.api.deps import is_eligible_project_member
from app.enums import TeamRole
from app.mcp_server.scope import resolve_assignee
from app.oxyde_models.issue import OxydeIssue
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.team import OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.utils.security import get_password_hash


async def _agent(owner, *, team_id=None, project_id=None, active=True, name="Bot"):
    return await OxydeUser.objects.create(
        email=f"{name.lower().replace(' ', '-')}@agent.local", hashed_password="", name=name,
        is_agent=True, parent_user_id=owner.id, agent_team_id=team_id,
        agent_project_id=project_id, is_active=active,
    )


async def _person(team, *, active=True, name="Member"):
    user = await OxydeUser.objects.create(
        email=f"{name.lower().replace(' ', '-')}@example.com", hashed_password=get_password_hash("x" * 12),
        name=name, is_active=active,
    )
    await OxydeTeamMember.objects.create(team_id=team.id, user_id=user.id, role=TeamRole.MEMBER)
    return user


@pytest.fixture
async def sibling(db, test_team):
    return await OxydeProject.objects.create(team_id=test_team.id, name="Sibling", key="SIB")


@pytest.fixture
async def cast(db, test_user, test_team, test_project, sibling):
    """Everyone the rule has an opinion on, keyed by whether they may hold
    work in ``test_project``."""
    eligible = {
        "member": await _person(test_team),
        "team agent": await _agent(test_user, team_id=test_team.id, name="Team Bot"),
        "project agent": await _agent(
            test_user, team_id=test_team.id, project_id=test_project.id, name="Project Bot",
        ),
        "project agent without a team id": await _agent(
            test_user, project_id=test_project.id, name="Teamless Bot",
        ),
    }
    refused = {
        "deactivated member": await _person(test_team, active=False, name="Retired"),
        "deactivated team agent": await _agent(
            test_user, team_id=test_team.id, active=False, name="Retired Bot",
        ),
        "deactivated project agent": await _agent(
            test_user, project_id=test_project.id, active=False, name="Retired Project Bot",
        ),
        "sibling project's agent": await _agent(
            test_user, team_id=test_team.id, project_id=sibling.id, name="Sibling Bot",
        ),
        "sibling project's agent without a team id": await _agent(
            test_user, project_id=sibling.id, name="Teamless Sibling Bot",
        ),
    }
    return eligible, refused


@pytest.mark.asyncio
async def test_the_helper(cast, test_team, test_project):
    eligible, refused = cast
    for label, user in eligible.items():
        assert await is_eligible_project_member(user, test_team.id, test_project.id), label
    for label, user in refused.items():
        assert not await is_eligible_project_member(user, test_team.id, test_project.id), label
    assert not await is_eligible_project_member(None, test_team.id, test_project.id)
    # No project yet (a project being created): no project-scoped agent fits.
    assert await is_eligible_project_member(eligible["member"], test_team.id, None)
    assert await is_eligible_project_member(eligible["team agent"], test_team.id, None)
    assert not await is_eligible_project_member(eligible["project agent"], test_team.id, None)
    assert not await is_eligible_project_member(eligible["project agent without a team id"], test_team.id, None)


@pytest.mark.asyncio
async def test_assignee_and_lead_agree(client, auth_headers, cast, test_project, test_issue):
    eligible, refused = cast
    issue_url = f"/api/issues/{test_issue.id}"
    project_url = f"/api/projects/{test_project.id}"
    for label, user in eligible.items():
        created = await client.post(
            f"/api/projects/{test_project.id}/issues", headers=auth_headers,
            json={"title": "x", "assignee_id": user.id},
        )
        assert created.status_code == 201, (label, created.text)
        assigned = await client.patch(issue_url, headers=auth_headers, json={"assignee_id": user.id})
        assert assigned.status_code == 200, (label, assigned.text)
        led = await client.patch(project_url, headers=auth_headers, json={"lead_id": user.id})
        assert led.status_code == 200, (label, led.text)
    for label, user in refused.items():
        created = await client.post(
            f"/api/projects/{test_project.id}/issues", headers=auth_headers,
            json={"title": "x", "assignee_id": user.id},
        )
        assigned = await client.patch(issue_url, headers=auth_headers, json={"assignee_id": user.id})
        for response in (created, assigned):
            assert (response.status_code, response.json()) == (400, {"detail": "Assignee not found"}), label
        led = await client.patch(project_url, headers=auth_headers, json={"lead_id": user.id})
        assert (led.status_code, led.json()) == (400, {"detail": "Lead not found"}), label


@pytest.mark.asyncio
async def test_a_new_project_cannot_be_led_by_a_project_scoped_agent(client, auth_headers, cast, test_team):
    eligible, refused = cast
    for label, key in (("member", "NWA"), ("team agent", "NWB")):
        created = await client.post(
            f"/api/teams/{test_team.id}/projects", headers=auth_headers,
            json={"name": label, "key": key, "lead_id": eligible[label].id},
        )
        assert created.status_code == 201, (label, created.text)
    for label in ("project agent", "project agent without a team id"):
        refused_create = await client.post(
            f"/api/teams/{test_team.id}/projects", headers=auth_headers,
            json={"name": label, "key": "NWC", "lead_id": eligible[label].id},
        )
        assert (refused_create.status_code, refused_create.json()) == (400, {"detail": "Lead not found"}), label
    for label, user in refused.items():
        refused_create = await client.post(
            f"/api/teams/{test_team.id}/projects", headers=auth_headers,
            json={"name": label, "key": "NWD", "lead_id": user.id},
        )
        assert (refused_create.status_code, refused_create.json()) == (400, {"detail": "Lead not found"}), label


@pytest.mark.asyncio
async def test_a_current_holder_resent_unchanged_is_kept(client, auth_headers, test_team, test_project, test_issue):
    """Retired since being chosen: re-sending them is not a new choice."""
    member = await _person(test_team)
    issue_url = f"/api/issues/{test_issue.id}"
    project_url = f"/api/projects/{test_project.id}"
    assert (await client.patch(issue_url, headers=auth_headers, json={"assignee_id": member.id})).status_code == 200
    assert (await client.patch(project_url, headers=auth_headers, json={"lead_id": member.id})).status_code == 200
    member.is_active = False
    await member.save(update_fields={"is_active"})

    kept = await client.patch(issue_url, headers=auth_headers, json={"title": "renamed", "assignee_id": member.id})
    assert kept.status_code == 200 and kept.json()["assignee_id"] == member.id
    kept = await client.patch(project_url, headers=auth_headers, json={"name": "Renamed", "lead_id": member.id})
    assert kept.status_code == 200 and kept.json()["lead_id"] == member.id

    # Choosing them again on another row is a new choice, and refused.
    other = await OxydeIssue.objects.get(id=test_issue.id)
    other.assignee_id = None
    await other.save(update_fields={"assignee_id"})
    again = await client.patch(issue_url, headers=auth_headers, json={"assignee_id": member.id})
    assert (again.status_code, again.json()) == (400, {"detail": "Assignee not found"})


@pytest.mark.asyncio
async def test_mcp_finds_a_project_agent_without_a_team_id_by_email(test_user, test_team, test_project, sibling):
    """The MCP resolver looks across the team; it must find every agent
    the API would accept, including one created without a team id."""
    teamless = await _agent(test_user, project_id=test_project.id, name="Teamless Bot")
    assert await resolve_assignee(test_user, test_team.id, "TEAMLESS-BOT@agent.local") == teamless.id
    # Another team's teamless agent is not this team's.
    from app.oxyde_models.team import OxydeTeam

    elsewhere = await OxydeTeam.objects.create(name="Elsewhere", key="ELS")
    far = await OxydeProject.objects.create(team_id=elsewhere.id, name="Far", key="FAR")
    await _agent(test_user, project_id=far.id, name="Far Bot")
    from app.mcp_server.scope import ToolContextError

    with pytest.raises(ToolContextError):
        await resolve_assignee(test_user, test_team.id, "far-bot@agent.local")


@pytest.mark.asyncio
async def test_a_holder_who_left_the_team_resent_unchanged_is_kept(
    client, auth_headers, test_team, test_project, test_issue,
):
    """The exemption's change in this ticket: a holder removed from the
    team used to be refused on re-send, because the team check ran first.
    Re-sent unchanged it is kept, on the issue and on the project; named
    fresh it is the same not-found as anyone else outside the team."""
    member = await _person(test_team)
    issue_url = f"/api/issues/{test_issue.id}"
    project_url = f"/api/projects/{test_project.id}"
    assert (await client.patch(issue_url, headers=auth_headers, json={"assignee_id": member.id})).status_code == 200
    assert (await client.patch(project_url, headers=auth_headers, json={"lead_id": member.id})).status_code == 200
    await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=member.id).delete()

    kept = await client.patch(issue_url, headers=auth_headers, json={"title": "renamed", "assignee_id": member.id})
    assert kept.status_code == 200 and kept.json()["assignee_id"] == member.id, kept.text
    kept = await client.patch(project_url, headers=auth_headers, json={"name": "Renamed", "lead_id": member.id})
    assert kept.status_code == 200 and kept.json()["lead_id"] == member.id, kept.text

    fresh = await client.post(
        f"/api/projects/{test_project.id}/issues", headers=auth_headers,
        json={"title": "x", "assignee_id": member.id},
    )
    assert (fresh.status_code, fresh.json()) == (400, {"detail": "Assignee not found"})
    assert (await client.patch(project_url, headers=auth_headers, json={"lead_id": None})).status_code == 200
    fresh = await client.patch(project_url, headers=auth_headers, json={"lead_id": member.id})
    assert (fresh.status_code, fresh.json()) == (400, {"detail": "Lead not found"})


@pytest.mark.asyncio
async def test_an_out_of_project_agent_resent_unchanged_is_kept(
    client, auth_headers, test_user, test_team, test_project, test_issue, sibling,
):
    """An agent that holds the issue and the lead and is then moved to a
    sibling project: kept on re-send, refused when named fresh."""
    agent = await _agent(test_user, team_id=test_team.id, project_id=test_project.id, name="Moved Bot")
    issue_url = f"/api/issues/{test_issue.id}"
    project_url = f"/api/projects/{test_project.id}"
    assert (await client.patch(issue_url, headers=auth_headers, json={"assignee_id": agent.id})).status_code == 200
    assert (await client.patch(project_url, headers=auth_headers, json={"lead_id": agent.id})).status_code == 200
    await OxydeUser.objects.filter(id=agent.id).update(agent_project_id=sibling.id)

    kept = await client.patch(issue_url, headers=auth_headers, json={"title": "renamed", "assignee_id": agent.id})
    assert kept.status_code == 200 and kept.json()["assignee_id"] == agent.id, kept.text
    kept = await client.patch(project_url, headers=auth_headers, json={"name": "Renamed", "lead_id": agent.id})
    assert kept.status_code == 200 and kept.json()["lead_id"] == agent.id, kept.text

    fresh = await client.post(
        f"/api/projects/{test_project.id}/issues", headers=auth_headers,
        json={"title": "x", "assignee_id": agent.id},
    )
    assert (fresh.status_code, fresh.json()) == (400, {"detail": "Assignee not found"})
