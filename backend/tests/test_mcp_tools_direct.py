"""Direct (non-HTTP) tool-function tests for app.mcp_server.tools (CHT-1266).

test_mcp_endpoint.py drives these through the real MCP protocol over HTTP
for end-to-end confidence; this file calls the (already-`_boundary`-wrapped)
tool coroutines directly with the auth contextvar set by hand, to reach
branches an HTTP round-trip per case would make tedious: parameter
combinations (epic filters, sprint filters, assignee resolution,
explicit `project`/`team` overrides, `unassigned`), the `_boundary`
error-translation paths, and doc_view's fuzzy id/title matching.
"""
import pytest

from app.mcp_server import context, tools


@pytest.fixture(autouse=True)
def _as(test_user):
    """Run every test in this file as test_user (mirrors auth.py setting
    the contextvar per-request, just without going through HTTP).
    """
    token = context.current_mcp_user.set(test_user)
    yield
    context.current_mcp_user.reset(token)


class TestIssueListBranches:
    async def test_epic_filter(self, test_project):
        epic = await tools.issue_create(title="Epic", issue_type="epic")
        assert "error" not in epic
        child = await tools.issue_create(title="Child", parent=epic["identifier"])
        assert "error" not in child

        result = await tools.issue_list(epic=epic["identifier"])
        assert "error" not in result
        assert any(i["identifier"] == child["identifier"] for i in result["issues"])

    async def test_assignee_me_filter(self, test_project, test_user):
        await tools.issue_create(title="Mine")
        await tools.issue_update((await tools.issue_list())["issues"][0]["identifier"], assignee="me")
        result = await tools.issue_list(assignee="me")
        assert "error" not in result
        assert all(i["assignee_id"] == test_user.id for i in result["issues"])

    async def test_sprint_and_all_projects_conflict(self, test_project):
        result = await tools.issue_list(all_projects=True, sprint="current")
        assert "error" in result
        assert "sprint" in result["error"].lower()

    async def test_all_projects_without_sprint(self, test_project):
        created = await tools.issue_create(title="Team-wide")
        result = await tools.issue_list(all_projects=True)
        assert "error" not in result
        assert any(i["identifier"] == created["identifier"] for i in result["issues"])

    async def test_sprint_filter(self, test_project):
        from app.services.sprint_service import SprintService

        current, _ = await SprintService().ensure_sprints_exist(test_project.id)
        created = await tools.issue_create(title="In sprint")
        await tools.issue_update(created["identifier"], status="in_progress")

        result = await tools.issue_list(sprint="current")
        assert "error" not in result

    async def test_bad_issue_type_reports_error(self, test_project):
        result = await tools.issue_create(title="Bad type", issue_type="not-a-real-type")
        assert "error" in result

    async def test_estimate_out_of_range_is_validation_error(self, test_project):
        result = await tools.issue_create(title="Too big", estimate=99999)
        assert "error" in result


class TestIssueCreateParent:
    async def test_parent_link(self, test_project):
        parent = await tools.issue_create(title="Parent issue")
        child = await tools.issue_create(title="Child issue", parent=parent["identifier"])
        assert child["parent_id"] == parent["id"]


class TestIssueUpdateBranches:
    async def test_update_all_fields(self, test_issue, test_user2, test_team):
        from app.oxyde_models.team import OxydeTeamMember
        from app.enums import TeamRole

        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        result = await tools.issue_update(
            test_issue.identifier,
            title="New title",
            description="New description",
            status="in_review",
            priority="high",
            estimate=5,
            assignee=test_user2.email,
        )
        assert result["title"] == "New title"
        assert result["description"] == "New description"
        assert result["status"] == "in_review"
        assert result["priority"] == "high"
        assert result["estimate"] == 5
        assert result["assignee_id"] == test_user2.id

    async def test_update_unassigned_clears_assignee(self, test_issue, test_user):
        await tools.issue_update(test_issue.identifier, assignee="me")
        result = await tools.issue_update(test_issue.identifier, assignee="unassigned")
        assert result["assignee_id"] is None

    async def test_update_no_fields_is_error(self, test_issue):
        result = await tools.issue_update(test_issue.identifier)
        assert "error" in result
        assert "No fields" in result["error"]


class TestIssueCommentAssignTo:
    async def test_comment_with_assign_to(self, test_issue, test_user):
        result = await tools.issue_comment(test_issue.identifier, content="hi", assign_to="me")
        assert result["content"] == "hi"
        updated = await tools.issue_view(test_issue.identifier)
        assert updated["assignee_id"] == test_user.id


class TestDocListDocCreateExplicitProject:
    async def test_doc_list_explicit_project(self, test_project):
        created = await tools.doc_create(title="Scoped doc", project=test_project.key)
        assert "error" not in created
        result = await tools.doc_list(project=test_project.key)
        assert any(d["id"] == created["id"] for d in result["documents"])

    async def test_doc_list_default_project(self, test_project):
        created = await tools.doc_create(title="Default-scope doc", project=test_project.key)
        result = await tools.doc_list()
        assert any(d["id"] == created["id"] for d in result["documents"])

    async def test_doc_list_all_projects(self, test_team):
        created = await tools.doc_create(title="Global-scope doc", is_global=True)
        result = await tools.doc_list(all_projects=True)
        assert any(d["id"] == created["id"] for d in result["documents"])

    async def test_doc_create_explicit_project(self, test_project):
        result = await tools.doc_create(title="Explicit project doc", project=test_project.id)
        assert result["project_id"] == test_project.id

    async def test_doc_create_is_global(self, test_team):
        result = await tools.doc_create(title="Global doc", is_global=True)
        assert result["project_id"] is None


class TestActivityRecentExplicitProject:
    async def test_activity_recent_explicit_project(self, test_project):
        await tools.issue_create(title="For activity")
        result = await tools.activity_recent(project=test_project.key)
        assert "error" not in result
        assert len(result["activities"]) >= 1


class TestProjectList:
    async def test_lists_team_projects(self, test_project):
        result = await tools.project_list()
        assert "error" not in result
        ids = {p["id"] for p in result["projects"]}
        assert test_project.id in ids
        # Serialized via ProjectResponse -- id/key/name/issue_count present.
        me = next(p for p in result["projects"] if p["id"] == test_project.id)
        assert me["key"] == test_project.key
        assert me["name"] == test_project.name
        assert "issue_count" in me

    async def test_explicit_team(self, test_team, test_project):
        result = await tools.project_list(team=test_team.key)
        assert "error" not in result
        assert any(p["id"] == test_project.id for p in result["projects"])

    async def test_unknown_team_is_error(self, test_project):
        result = await tools.project_list(team="no-such-team")
        assert "error" in result

    async def test_empty_team_returns_empty_list(self, db, test_user, test_team):
        # A team the user belongs to but which has no projects -> a clean
        # empty list, not an error (mirrors the CLI's empty-list branch).
        from app.enums import TeamRole
        from app.oxyde_models.team import OxydeTeam, OxydeTeamMember

        empty_team = await OxydeTeam.objects.create(name="Empty Team", key="EMPTY")
        await OxydeTeamMember.objects.create(
            team_id=empty_team.id, user_id=test_user.id, role=TeamRole.MEMBER
        )
        result = await tools.project_list(team=empty_team.key)
        assert result == {"projects": []}

    async def test_team_scoped_agent_sees_its_team(self, db, test_team, test_project):
        from app.oxyde_models.user import OxydeUser
        from app.utils.security import get_password_hash

        agent = await OxydeUser.objects.create(
            email="team-agent-projlist@example.com",
            hashed_password=get_password_hash("x"),
            name="Team Agent",
            is_agent=True,
            agent_team_id=test_team.id,
        )
        token = context.current_mcp_user.set(agent)
        try:
            result = await tools.project_list()
            assert "error" not in result
            assert any(p["id"] == test_project.id for p in result["projects"])
        finally:
            context.current_mcp_user.reset(token)

    async def test_project_scoped_agent_has_no_team_wide_access(self, db, test_project):
        # project_list is team-wide; a purely project-scoped agent has no
        # team-wide access via REST either, so resolve_team refuses it with
        # a clean {"error": ...}, never a crash (mirrors activity_recent).
        from app.oxyde_models.user import OxydeUser
        from app.utils.security import get_password_hash

        agent = await OxydeUser.objects.create(
            email="project-agent-projlist@example.com",
            hashed_password=get_password_hash("x"),
            name="Project Agent",
            is_agent=True,
            agent_project_id=test_project.id,
        )
        token = context.current_mcp_user.set(agent)
        try:
            result = await tools.project_list()
            assert "error" in result
            assert "scoped to a single project" in result["error"]
        finally:
            context.current_mcp_user.reset(token)


class TestDocViewFuzzyMatch:
    async def test_fuzzy_match_by_title(self, test_team):
        created = await tools.doc_create(title="Unique Fuzzy Title", is_global=True)
        result = await tools.doc_view("Unique Fuzzy Title")
        assert result["id"] == created["id"]

    async def test_fuzzy_match_by_id_prefix(self, test_team):
        created = await tools.doc_create(title="Prefix match doc", is_global=True)
        result = await tools.doc_view(created["id"][:8])
        assert result["id"] == created["id"]

    async def test_fuzzy_match_skips_non_matching_docs(self, test_team):
        await tools.doc_create(title="Not this one", is_global=True)
        created = await tools.doc_create(title="This one matches", is_global=True)
        result = await tools.doc_view("This one matches")
        assert result["id"] == created["id"]

    async def test_no_match_is_error(self, test_team):
        result = await tools.doc_view("no-such-document-anywhere")
        assert "error" in result

    async def test_ambiguous_match_is_error(self, test_team):
        await tools.doc_create(title="Dup Title Doc", is_global=True)
        await tools.doc_create(title="Dup Title Doc", is_global=True)
        result = await tools.doc_view("Dup Title Doc")
        assert "error" in result
        assert "Multiple documents" in result["error"]


class TestIssueTypeAliases:
    async def test_alias_is_resolved(self, test_project):
        result = await tools.issue_create(title="Aliased type", issue_type="feat")
        assert result["issue_type"] == "feature"


class TestTeamIdForProjectHelper:
    async def test_missing_project_errors(self):
        with pytest.raises(tools.ToolContextError, match="Project not found"):
            await tools._team_id_for_project("no-such-project-id")


class TestResolveDocumentIdAgentBranches:
    async def test_team_scoped_agent_fuzzy_match(self, db, test_team):
        from app.enums import TeamRole
        from app.oxyde_models.user import OxydeUser
        from app.utils.security import get_password_hash

        agent = await OxydeUser.objects.create(
            email="team-agent-doc@example.com",
            hashed_password=get_password_hash("x"),
            name="Team Agent",
            is_agent=True,
            agent_team_id=test_team.id,
        )
        token = context.current_mcp_user.set(agent)
        try:
            # Agent-created docs require an emoji icon (CHT-631, enforced
            # in app.api.documents.create_document, unrelated to this
            # fuzzy-match test -- just satisfying it).
            created = await tools.doc_create(title="Agent-visible doc", is_global=True, icon="🤖")
            assert "error" not in created
            resolved = await tools._resolve_document_id(agent, "Agent-visible doc")
            assert resolved == created["id"]
        finally:
            context.current_mcp_user.reset(token)

    async def test_project_scoped_agent_fuzzy_match(self, db, test_project):
        from app.oxyde_models.user import OxydeUser
        from app.schemas.document import DocumentCreate
        from app.services.document_service import DocumentService
        from app.utils.security import get_password_hash

        agent = await OxydeUser.objects.create(
            email="project-agent-doc@example.com",
            hashed_password=get_password_hash("x"),
            name="Project Agent",
            is_agent=True,
            agent_project_id=test_project.id,
        )
        # Created directly via the service, not the doc_create tool:
        # app.api.documents.create_document gates on check_user_team_access,
        # which a purely project-scoped agent (no agent_team_id) never
        # passes -- a separate, pre-existing REST access-check gap outside
        # CHT-1266's scope (filed as a follow-up). This test is only about
        # _resolve_document_id's fuzzy match, not doc_create's access rules.
        created = await DocumentService().create(
            DocumentCreate(title="Project-agent-visible doc", project_id=test_project.id),
            test_project.team_id,
            agent.id,
        )
        resolved = await tools._resolve_document_id(agent, "Project-agent-visible doc")
        assert resolved == created.id


class TestBoundaryUnexpectedException:
    async def test_unexpected_exception_is_reported_not_raised(self, test_project, monkeypatch):
        async def _boom(*args, **kwargs):
            raise RuntimeError("kaboom")

        monkeypatch.setattr(tools.issues_api, "list_issues", _boom)
        result = await tools.issue_list()
        assert "error" in result
        assert "kaboom" in result["error"]
