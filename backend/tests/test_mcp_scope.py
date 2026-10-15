"""Unit tests for app.mcp_server.scope -- the team/project/sprint/assignee
resolution the remote MCP transport uses in place of the stdio server's
local profile (CHT-1266). Exercises the resolvers directly (no HTTP/MCP
protocol overhead) since test_mcp_endpoint.py's end-to-end tests only
reach the common single-team/single-project happy paths.
"""
import pytest

from app.enums import TeamRole
from app.mcp_server.scope import (
    ToolContextError,
    resolve_assignee,
    resolve_project,
    resolve_sprint,
    resolve_team,
)
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.utils.security import get_password_hash


def test_tool_context_error_is_the_shared_input_error():
    """The resolvers' exception must be what the shared MCP boundary
    classifies as caller-fixable input (PR #271 review, finding 1)."""
    from chaotic_mcp_tools import ToolInputError
    assert issubclass(ToolContextError, ToolInputError)


@pytest.fixture
async def team_scoped_agent(db, test_team):
    return await OxydeUser.objects.create(
        email="team-agent@example.com",
        hashed_password=get_password_hash("x"),
        name="Team Agent",
        is_agent=True,
        agent_team_id=test_team.id,
    )


@pytest.fixture
async def project_scoped_agent(db, test_project):
    return await OxydeUser.objects.create(
        email="project-agent@example.com",
        hashed_password=get_password_hash("x"),
        name="Project Agent",
        is_agent=True,
        agent_project_id=test_project.id,
        agent_team_id=test_project.team_id,
    )


@pytest.fixture
async def other_team(db):
    return await OxydeTeam.objects.create(name="Other Team", key="OTH")


@pytest.fixture
async def other_project(db, test_team):
    return await OxydeProject.objects.create(team_id=test_team.id, name="Other Project", key="OTH")


class TestResolveTeam:
    async def test_project_scoped_agent_has_no_team_wide_access(self, project_scoped_agent):
        with pytest.raises(ToolContextError, match="scoped to a single project"):
            await resolve_team(project_scoped_agent, None)

    async def test_team_scoped_agent_defaults_to_its_team(self, team_scoped_agent, test_team):
        assert await resolve_team(team_scoped_agent, None) == test_team.id

    async def test_team_scoped_agent_matching_explicit_team_ok(self, team_scoped_agent, test_team):
        assert await resolve_team(team_scoped_agent, test_team.key) == test_team.id

    async def test_team_scoped_agent_mismatched_team_rejected(self, team_scoped_agent, other_team):
        with pytest.raises(ToolContextError, match="not accessible to it"):
            await resolve_team(team_scoped_agent, other_team.key)

    async def test_human_with_no_teams_errors(self, db):
        lonely = await OxydeUser.objects.create(
            email="lonely@example.com", hashed_password=get_password_hash("x"), name="Lonely"
        )
        with pytest.raises(ToolContextError, match="no accessible team"):
            await resolve_team(lonely, None)

    async def test_human_single_team_default(self, test_user, test_team):
        assert await resolve_team(test_user, None) == test_team.id

    async def test_human_explicit_team_by_id_key_or_name(self, test_user, test_team):
        assert await resolve_team(test_user, test_team.id) == test_team.id
        assert await resolve_team(test_user, test_team.key) == test_team.id
        assert await resolve_team(test_user, test_team.name) == test_team.id

    async def test_human_unknown_team_errors(self, test_user, test_team):
        with pytest.raises(ToolContextError, match="not found or not accessible"):
            await resolve_team(test_user, "NOPE")

    async def test_human_multiple_teams_requires_disambiguation(self, test_user, test_team, other_team):
        await OxydeTeamMember.objects.create(team_id=other_team.id, user_id=test_user.id, role=TeamRole.MEMBER)
        with pytest.raises(ToolContextError, match="multiple teams"):
            await resolve_team(test_user, None)
        # explicit team disambiguates fine
        assert await resolve_team(test_user, other_team.key) == other_team.id


class TestResolveProject:
    async def test_project_scoped_agent_defaults_to_its_project(self, project_scoped_agent, test_project):
        project_id, team_id = await resolve_project(project_scoped_agent, None)
        assert project_id == test_project.id
        assert team_id == test_project.team_id

    async def test_project_scoped_agent_matching_explicit_project_ok(self, project_scoped_agent, test_project):
        project_id, _ = await resolve_project(project_scoped_agent, test_project.key)
        assert project_id == test_project.id

    async def test_project_scoped_agent_mismatched_project_rejected(self, project_scoped_agent, other_project):
        with pytest.raises(ToolContextError, match="not accessible to it"):
            await resolve_project(project_scoped_agent, other_project.key)

    async def test_human_no_projects_errors(self, test_user, test_team):
        with pytest.raises(ToolContextError, match="no projects yet"):
            await resolve_project(test_user, None)

    async def test_human_single_project_default(self, test_user, test_project):
        project_id, team_id = await resolve_project(test_user, None)
        assert project_id == test_project.id
        assert team_id == test_project.team_id

    async def test_human_explicit_project_match(self, test_user, test_project, other_project):
        project_id, _ = await resolve_project(test_user, other_project.key)
        assert project_id == other_project.id

    async def test_human_unknown_project_errors(self, test_user, test_project):
        with pytest.raises(ToolContextError, match="not found in this team"):
            await resolve_project(test_user, "NOPE")

    async def test_human_multiple_projects_requires_disambiguation(self, test_user, test_project, other_project):
        with pytest.raises(ToolContextError, match="multiple projects"):
            await resolve_project(test_user, None)

    async def test_project_scoped_agent_with_deleted_project_errors(self, project_scoped_agent, test_project):
        await test_project.delete()
        with pytest.raises(ToolContextError, match="no longer exists"):
            await resolve_project(project_scoped_agent, None)


class TestResolveSprint:
    async def test_current_and_next(self, test_project):
        from app.services.sprint_service import SprintService

        current, nxt = await SprintService().ensure_sprints_exist(test_project.id)
        assert await resolve_sprint(test_project.id, "current") == current.id
        assert await resolve_sprint(test_project.id, "CURRENT") == current.id
        assert await resolve_sprint(test_project.id, "next") == nxt.id

    async def test_current_materializes_when_absent(self, test_project):
        """'current' creates the sprint rather than erroring.

        This used to assert the opposite. That was pinning a real bug: the
        routed GET /sprints/current calls ensure_sprints_exist, so the stdio
        transport -- which reaches it over HTTP -- always created on demand,
        while every HTTP-transport sprint tool failed outright on a project
        whose first sprint had never been made (CHT-1351).
        """
        from app.services.sprint_service import SprintService

        assert await SprintService().get_current_sprint(test_project.id) is None

        sprint_id = await resolve_sprint(test_project.id, "current")

        assert sprint_id
        created = await SprintService().get_current_sprint(test_project.id)
        assert created is not None and created.id == sprint_id

    async def test_by_id(self, test_project):
        from app.services.sprint_service import SprintService

        current, _ = await SprintService().ensure_sprints_exist(test_project.id)
        assert await resolve_sprint(test_project.id, current.id) == current.id

    async def test_by_name_case_insensitive(self, test_project):
        from app.services.sprint_service import SprintService

        current, _ = await SprintService().ensure_sprints_exist(test_project.id)
        assert await resolve_sprint(test_project.id, current.name.upper()) == current.id

    async def test_not_found(self, test_project):
        with pytest.raises(ToolContextError, match="not found in this project"):
            await resolve_sprint(test_project.id, "nonexistent-sprint")

    async def test_next_rematerializes_when_deleted(self, test_project):
        """Same contract as 'current': a missing 'next' is created, not an error.

        Previously this deleted the next sprint and asserted a raise. Under
        the CHT-1351 fix ensure_sprints_exist recreates it, which is what
        the stdio transport has always done via the routed endpoint.
        """
        from app.oxyde_models.sprint import OxydeSprint
        from app.services.sprint_service import SprintService

        await SprintService().ensure_sprints_exist(test_project.id)
        nxt = await resolve_sprint(test_project.id, "next")
        await (await OxydeSprint.objects.get(id=nxt)).delete()

        recreated = await resolve_sprint(test_project.id, "next")

        assert recreated and recreated != nxt


class TestResolveAssignee:
    async def test_me(self, test_user, test_team):
        assert await resolve_assignee(test_user, test_team.id, "me") == test_user.id

    async def test_unassigned(self, test_user, test_team):
        assert await resolve_assignee(test_user, test_team.id, "unassigned") is None

    async def test_by_id(self, test_user, test_team, test_user2):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        assert await resolve_assignee(test_user, test_team.id, test_user2.id) == test_user2.id

    async def test_by_email(self, test_user, test_team, test_user2):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        assert await resolve_assignee(test_user, test_team.id, test_user2.email) == test_user2.id

    async def test_by_email_in_another_case(self, test_user, test_team, test_user2):
        # CHT-1804: the same case-insensitive comparison as login.
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        assert await resolve_assignee(test_user, test_team.id, test_user2.email.upper()) == test_user2.id

    async def test_by_email_finds_the_teams_agents(self, test_user, test_team):
        agent = await OxydeUser.objects.create(
            email="bot-1@agent.local", hashed_password="", name="Bot", is_agent=True,
            parent_user_id=test_user.id, agent_team_id=test_team.id,
        )
        assert await resolve_assignee(test_user, test_team.id, "BOT-1@agent.local") == agent.id

    async def test_an_address_off_the_team_looks_like_no_account(self, test_user, test_team, test_user2):
        """An account on another team, a deactivated account on no team,
        a deactivated member, and no account at all: one error, the same
        text, naming nobody (CHT-1804 review of PR #437)."""
        other_team = await OxydeTeam.objects.create(name="Other", key="OTH")
        await OxydeTeamMember.objects.create(team_id=other_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        await OxydeUser.objects.create(
            email="Outsider@Elsewhere.com", hashed_password=get_password_hash("x" * 12),
            name="Secret Outsider", is_active=False,
        )
        retired = await OxydeUser.objects.create(
            email="retired@example.com", hashed_password=get_password_hash("x" * 12),
            name="Secret Retired", is_active=False,
        )
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=retired.id, role=TeamRole.MEMBER)
        messages = []
        for address in (test_user2.email.upper(), "OUTSIDER@elsewhere.com", "RETIRED@example.com",
                        "nobody@elsewhere.com"):
            with pytest.raises(ToolContextError) as caught:
                await resolve_assignee(test_user, test_team.id, address)
            messages.append(str(caught.value).replace(address, "<address>"))
        assert len(set(messages)) == 1, messages
        assert "Secret" not in messages[0]
        assert "Could not resolve assignee" in messages[0]

    async def test_by_name_among_team_members(self, test_user, test_team, test_user2):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        assert await resolve_assignee(test_user, test_team.id, test_user2.name.upper()) == test_user2.id

    async def test_unresolvable_errors(self, test_user, test_team):
        with pytest.raises(ToolContextError, match="Could not resolve assignee"):
            await resolve_assignee(test_user, test_team.id, "nobody-like-this")

    async def test_email_with_no_matching_user_falls_through_and_errors(self, test_user, test_team):
        with pytest.raises(ToolContextError, match="Could not resolve assignee"):
            await resolve_assignee(test_user, test_team.id, "nobody@example.com")


async def _bot(owner, team, *, name, project=None, active=True):
    return await OxydeUser.objects.create(
        email=f"{name.lower().replace(' ', '-')}@agent.local", hashed_password="", name=name,
        is_agent=True, parent_user_id=owner.id, agent_team_id=team.id,
        agent_project_id=project.id if project else None, is_active=active,
    )


async def _not_found(user, team_id, value, project_id=None):
    with pytest.raises(ToolContextError) as caught:
        await resolve_assignee(user, team_id, value, project_id)
    return str(caught.value).replace(value, "<value>")


class TestResolveAssigneeEligibility:
    """One rule for every form of reference (CHT-1839): the principals
    ``is_eligible_project_member`` accepts, found by id, email, display
    name or handle; anyone else answers like no account at all."""

    async def test_an_agent_by_display_name_and_handle(self, test_user, test_team):
        # CHT-1831: the name path used to cover people only.
        bot = await _bot(test_user, test_team, name="Claude MCP")
        assert await resolve_assignee(test_user, test_team.id, "claude mcp") == bot.id
        assert await resolve_assignee(test_user, test_team.id, "@claude-mcp") == bot.id
        assert await resolve_assignee(test_user, test_team.id, "claude-mcp") == bot.id

    async def test_a_person_by_handle(self, test_user, test_team):
        first = test_user.name.split()[0].lower()
        assert await resolve_assignee(test_user, test_team.id, f"@{first}") == test_user.id

    async def test_a_name_a_person_and_an_agent_share_is_refused(self, test_user, test_team):
        bot = await _bot(test_user, test_team, name=test_user.name)
        with pytest.raises(ToolContextError, match="more than one") as caught:
            await resolve_assignee(test_user, test_team.id, test_user.name)
        # It names the handles that tell them apart, and each one works.
        handles = [h.strip("@,() ") for h in str(caught.value).split("(")[1].split(")")[0].split(",")]
        resolved = {await resolve_assignee(test_user, test_team.id, h) for h in handles}
        assert resolved == {test_user.id, bot.id}

    async def test_out_of_scope_answers_like_no_account(self, test_user, test_team, test_project, test_user2):
        """By id, email and name: an inactive member, an inactive agent,
        a person on another team, another team's agent and a sibling
        project's agent all get the missing user's error."""
        other_team = await OxydeTeam.objects.create(name="Other", key="OTH")
        await OxydeTeamMember.objects.create(team_id=other_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        sibling = await OxydeProject.objects.create(team_id=test_team.id, name="Sibling", key="SIB")
        retired = await OxydeUser.objects.create(
            email="retired@example.com", hashed_password=get_password_hash("x" * 12),
            name="Retired Person", is_active=False,
        )
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=retired.id, role=TeamRole.MEMBER)
        outsiders = [
            test_user2,
            retired,
            await _bot(test_user, test_team, name="Asleep Bot", active=False),
            await _bot(test_user2, other_team, name="Far Bot"),
            await _bot(test_user, test_team, name="Sib Bot", project=sibling),
        ]
        expected = await _not_found(test_user, test_team.id, "no-such-user", test_project.id)
        assert expected == "Could not resolve assignee '<value>' to a user on this team."
        for outsider in outsiders:
            for value in (outsider.id, outsider.email, outsider.name, outsider.email.upper()):
                got = await _not_found(test_user, test_team.id, value, test_project.id)
                assert got == expected, (outsider.name, value)

    async def test_a_project_agent_only_from_its_own_project(self, test_user, test_team, test_project):
        sibling = await OxydeProject.objects.create(team_id=test_team.id, name="Sibling", key="SIB")
        bot = await _bot(test_user, test_team, name="Proj Bot", project=test_project)
        assert await resolve_assignee(test_user, test_team.id, "Proj Bot", test_project.id) == bot.id
        assert await resolve_assignee(test_user, test_team.id, bot.id, test_project.id) == bot.id
        await _not_found(test_user, test_team.id, "Proj Bot", sibling.id)
        await _not_found(test_user, test_team.id, bot.id, sibling.id)
        # A team-wide filter (no project) reaches it in its own project.
        assert await resolve_assignee(test_user, test_team.id, "Proj Bot") == bot.id

    async def test_an_out_of_scope_namesake_does_not_make_a_name_ambiguous(
        self, test_user, test_team, test_user2,
    ):
        """Only candidates count: a deactivated "Sam" leaves the active
        one resolvable, and nothing says the other exists."""
        sam = await OxydeUser.objects.create(
            email="sam@example.com", hashed_password=get_password_hash("x" * 12), name="Sam",
        )
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=sam.id, role=TeamRole.MEMBER)
        gone = await OxydeUser.objects.create(
            email="sam2@example.com", hashed_password=get_password_hash("x" * 12), name="Sam", is_active=False,
        )
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=gone.id, role=TeamRole.MEMBER)
        assert await resolve_assignee(test_user, test_team.id, "Sam") == sam.id
        assert await resolve_assignee(test_user, test_team.id, "@sam") == sam.id
