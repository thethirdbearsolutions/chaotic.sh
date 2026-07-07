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

    async def test_current_missing_errors(self, test_project):
        with pytest.raises(ToolContextError, match="No current sprint"):
            await resolve_sprint(test_project.id, "current")

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

    async def test_next_missing_errors(self, test_project):
        from app.services.sprint_service import SprintService

        await SprintService().ensure_sprints_exist(test_project.id)
        nxt = await resolve_sprint(test_project.id, "next")
        from app.oxyde_models.sprint import OxydeSprint

        sprint = await OxydeSprint.objects.get(id=nxt)
        await sprint.delete()

        with pytest.raises(ToolContextError, match="No next sprint"):
            await resolve_sprint(test_project.id, "next")


class TestResolveAssignee:
    async def test_me(self, test_user, test_team):
        assert await resolve_assignee(test_user, test_team.id, "me") == test_user.id

    async def test_unassigned(self, test_user, test_team):
        assert await resolve_assignee(test_user, test_team.id, "unassigned") is None

    async def test_by_id(self, test_user, test_team, test_user2):
        assert await resolve_assignee(test_user, test_team.id, test_user2.id) == test_user2.id

    async def test_by_email(self, test_user, test_team, test_user2):
        assert await resolve_assignee(test_user, test_team.id, test_user2.email) == test_user2.id

    async def test_by_name_among_team_members(self, test_user, test_team, test_user2):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        assert await resolve_assignee(test_user, test_team.id, test_user2.name.upper()) == test_user2.id

    async def test_unresolvable_errors(self, test_user, test_team):
        with pytest.raises(ToolContextError, match="Could not resolve assignee"):
            await resolve_assignee(test_user, test_team.id, "nobody-like-this")

    async def test_email_with_no_matching_user_falls_through_and_errors(self, test_user, test_team):
        with pytest.raises(ToolContextError, match="Could not resolve assignee"):
            await resolve_assignee(test_user, test_team.id, "nobody@example.com")
