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


class TestIssueUpdateAttest:
    """HTTP-transport attest path (CHT-1326, PR #261 review finding 6):
    the stdio mirror is tested in cli/tests/test_mcp_server.py; these
    pin the hand-mirrored backend implementation to the same behavior.
    """

    async def test_attest_then_close_succeeds(self, test_issue, make_ritual):
        from app.enums import ApprovalMode, RitualTrigger

        await make_ritual(
            name="close-gate",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            note_required=True,
        )
        # Bare close is blocked (the CHT-1326 repro).
        blocked = await tools.issue_update(test_issue.identifier, status="done")
        assert "error" in blocked

        # Attest inline -> close succeeds.
        result = await tools.issue_update(
            test_issue.identifier, status="done",
            attest={"close-gate": "did the thing, verified"},
        )
        assert "error" not in result, result
        assert result["status"] == "done"

    async def test_attest_unknown_ritual_is_error(self, test_issue, make_ritual):
        from app.enums import ApprovalMode, RitualTrigger

        await make_ritual(
            name="close-gate",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            note_required=True,
        )
        result = await tools.issue_update(
            test_issue.identifier, status="done", attest={"bogus": "note"},
        )
        assert "error" in result
        assert "not a pending ticket ritual" in result["error"]

    async def test_attest_only_call_is_allowed(self, test_issue, make_ritual):
        from app.enums import ApprovalMode, RitualTrigger

        await make_ritual(
            name="close-gate",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            note_required=True,
        )
        result = await tools.issue_update(
            test_issue.identifier, attest={"close-gate": "standalone attest"},
        )
        assert "error" not in result, result
        # Standalone attest (no prior intent) must NOT auto-transition.
        assert result["status"] != "done"

    async def test_attest_empty_note_is_error(self, test_issue, make_ritual):
        from app.enums import ApprovalMode, RitualTrigger

        await make_ritual(
            name="close-gate",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
            note_required=True,
        )
        result = await tools.issue_update(
            test_issue.identifier, status="done", attest={"close-gate": "  "},
        )
        assert "error" in result
        assert "non-empty" in result["error"]


class TestIssueCommentAssignTo:
    async def test_comment_with_assign_to(self, test_issue, test_user):
        result = await tools.issue_comment(test_issue.identifier, content="hi", assign_to="me")
        assert result["content"] == "hi"
        updated = await tools.issue_view(test_issue.identifier)
        assert updated["assignee_id"] == test_user.id


class TestIssueReady:
    """issue_ready (CHT-1334) exists because issue_list cannot express
    "has no unresolved blocker" -- so these tests pin the blocker
    filtering specifically, not just that the call returns issues.
    """

    async def test_issue_ready_lists_unassigned_not_started(self, test_project):
        created = await tools.issue_create(title="Pick me up", status="todo")
        result = await tools.issue_ready()
        assert any(i["identifier"] == created["identifier"] for i in result["issues"])

    async def test_issue_ready_excludes_in_progress(self, test_project):
        created = await tools.issue_create(title="Already going", status="todo")
        await tools.issue_start(created["identifier"])
        result = await tools.issue_ready()
        assert not any(i["identifier"] == created["identifier"] for i in result["issues"])

    async def test_issue_ready_excludes_blocked(self, test_project):
        """The whole reason this tool exists rather than an issue_list filter."""
        from app.schemas.issue import IssueRelationCreate
        from app.services.issue_service import IssueService

        blocker = await tools.issue_create(title="Do this first", status="todo")
        blocked = await tools.issue_create(title="Waits on the other", status="todo")

        svc = IssueService()
        blocked_row = await svc.get_by_identifier(blocked["identifier"])
        blocker_row = await svc.get_by_identifier(blocker["identifier"])
        # Direction matters: a BLOCKS relation runs blocker -> blocked,
        # and list_ready_issues filters on the *incoming* edge.
        await svc.create_relation(
            blocker_row.id,
            IssueRelationCreate(
                issue_id=blocker_row.id,
                related_issue_id=blocked_row.id,
                relation_type="blocks",
            ),
        )

        idents = {i["identifier"] for i in (await tools.issue_ready())["issues"]}
        assert blocker["identifier"] in idents
        assert blocked["identifier"] not in idents

    async def test_issue_ready_mine_excludes_unassigned(self, test_project):
        unassigned = await tools.issue_create(title="Nobody's", status="todo")
        result = await tools.issue_ready(mine=True)
        assert not any(i["identifier"] == unassigned["identifier"] for i in result["issues"])

    async def test_issue_ready_rejects_mine_with_include_assigned(self, test_project):
        result = await tools.issue_ready(mine=True, include_assigned=True)
        assert "error" in result

    async def test_issue_ready_all_projects(self, test_project, test_team):
        created = await tools.issue_create(title="Team-wide ready", status="todo")
        result = await tools.issue_ready(all_projects=True)
        assert any(i["identifier"] == created["identifier"] for i in result["issues"])



class TestIssueRelationTools:
    async def test_block_then_relations_reports_both_ends(self, test_project):
        blocker = await tools.issue_create(title="Blocker", status="todo")
        blocked = await tools.issue_create(title="Blocked", status="todo")

        await tools.issue_block(identifier=blocker["identifier"], blocked=blocked["identifier"])

        # Outgoing from the blocker's perspective...
        out = await tools.issue_relations(identifier=blocker["identifier"])
        assert [r["relation_type"] for r in out["relations"]] == ["blocks"]
        assert out["relations"][0]["direction"] == "outgoing"

        # ...and reported as blocked_by from the other end.
        inc = await tools.issue_relations(identifier=blocked["identifier"])
        assert [r["relation_type"] for r in inc["relations"]] == ["blocked_by"]
        assert inc["relations"][0]["direction"] == "incoming"

    async def test_block_removes_target_from_issue_ready(self, test_project):
        """The behavioural reason relations matter to an agent."""
        blocker = await tools.issue_create(title="First", status="todo")
        blocked = await tools.issue_create(title="Second", status="todo")

        await tools.issue_block(identifier=blocker["identifier"], blocked=blocked["identifier"])

        idents = {i["identifier"] for i in (await tools.issue_ready())["issues"]}
        assert blocker["identifier"] in idents
        assert blocked["identifier"] not in idents

    async def test_unblock_restores_readiness(self, test_project):
        blocker = await tools.issue_create(title="Gate", status="todo")
        blocked = await tools.issue_create(title="Gated", status="todo")
        await tools.issue_block(identifier=blocker["identifier"], blocked=blocked["identifier"])

        result = await tools.issue_unblock(
            identifier=blocker["identifier"], related=blocked["identifier"],
        )
        assert result["deleted"] is True

        idents = {i["identifier"] for i in (await tools.issue_ready())["issues"]}
        assert blocked["identifier"] in idents

    async def test_block_is_idempotent(self, test_project):
        a = await tools.issue_create(title="A", status="todo")
        b = await tools.issue_create(title="B", status="todo")
        await tools.issue_block(identifier=a["identifier"], blocked=b["identifier"])
        second = await tools.issue_block(identifier=a["identifier"], blocked=b["identifier"])
        assert "error" not in second
        rels = await tools.issue_relations(identifier=a["identifier"])
        assert len(rels["relations"]) == 1

    async def test_relation_type_duplicates(self, test_project):
        a = await tools.issue_create(title="Dupe", status="todo")
        b = await tools.issue_create(title="Original", status="todo")
        await tools.issue_block(
            identifier=a["identifier"], blocked=b["identifier"], relation_type="duplicates",
        )
        rels = await tools.issue_relations(identifier=a["identifier"])
        assert rels["relations"][0]["relation_type"] == "duplicates"

    async def test_unblock_by_relation_id(self, test_project):
        a = await tools.issue_create(title="X", status="todo")
        b = await tools.issue_create(title="Y", status="todo")
        await tools.issue_block(identifier=a["identifier"], blocked=b["identifier"])
        rel_id = (await tools.issue_relations(identifier=a["identifier"]))["relations"][0]["id"]

        result = await tools.issue_unblock(identifier=a["identifier"], relation_id=rel_id)

        assert result["deleted"] is True
        assert (await tools.issue_relations(identifier=a["identifier"]))["relations"] == []

    async def test_unblock_without_a_selector_is_an_error(self, test_project):
        a = await tools.issue_create(title="Solo", status="todo")
        result = await tools.issue_unblock(identifier=a["identifier"])
        assert "error" in result

    async def test_unblock_unrelated_pair_is_an_error(self, test_project):
        a = await tools.issue_create(title="P", status="todo")
        b = await tools.issue_create(title="Q", status="todo")
        result = await tools.issue_unblock(identifier=a["identifier"], related=b["identifier"])
        assert "error" in result

    async def test_relations_unknown_issue_is_an_error(self, test_project):
        assert "error" in await tools.issue_relations(identifier="NOPE-999")



class TestLabelTools:
    async def _make_label(self, team_id, name):
        from app.schemas.issue import LabelCreate
        from app.services.issue_service import IssueService
        return await IssueService().create_label(LabelCreate(name=name), team_id)

    async def test_label_list(self, test_team):
        await self._make_label(test_team.id, "triage")
        result = await tools.label_list()
        assert "triage" in {l["name"] for l in result["labels"]}

    async def test_issue_label_add_by_name(self, test_project, test_team):
        await self._make_label(test_team.id, "urgent-ish")
        iss = await tools.issue_create(title="Needs a label")

        result = await tools.issue_label(identifier=iss["identifier"], add=["urgent-ish"])

        assert result["labels_added"] == ["urgent-ish"]
        assert "urgent-ish" in {l["name"] for l in result["labels"]}

    async def test_issue_label_name_match_is_case_insensitive(self, test_project, test_team):
        await self._make_label(test_team.id, "Backend")
        iss = await tools.issue_create(title="Case test")
        result = await tools.issue_label(identifier=iss["identifier"], add=["backend"])
        assert "Backend" in {l["name"] for l in result["labels"]}

    async def test_issue_label_is_additive_not_replacing(self, test_project, test_team):
        """Labelling must never silently drop a label someone else set."""
        await self._make_label(test_team.id, "first")
        await self._make_label(test_team.id, "second")
        iss = await tools.issue_create(title="Two labels")

        await tools.issue_label(identifier=iss["identifier"], add=["first"])
        result = await tools.issue_label(identifier=iss["identifier"], add=["second"])

        assert {l["name"] for l in result["labels"]} == {"first", "second"}

    async def test_issue_label_remove(self, test_project, test_team):
        await self._make_label(test_team.id, "removable")
        iss = await tools.issue_create(title="Will lose a label")
        await tools.issue_label(identifier=iss["identifier"], add=["removable"])

        result = await tools.issue_label(identifier=iss["identifier"], remove=["removable"])

        assert result["labels_removed"] == ["removable"]
        assert result["labels"] == []

    async def test_issue_label_add_twice_is_idempotent(self, test_project, test_team):
        await self._make_label(test_team.id, "dupe-label")
        iss = await tools.issue_create(title="Idempotent")
        await tools.issue_label(identifier=iss["identifier"], add=["dupe-label"])
        result = await tools.issue_label(identifier=iss["identifier"], add=["dupe-label"])

        assert result["labels_added"] == []
        assert len(result["labels"]) == 1

    async def test_labelled_issue_is_findable_by_the_issue_list_filter(
        self, test_project, test_team
    ):
        """Closes the loop the ticket was about: filterable AND writable."""
        await self._make_label(test_team.id, "findme")
        iss = await tools.issue_create(title="Findable")
        await tools.issue_label(identifier=iss["identifier"], add=["findme"])

        found = await tools.issue_list(label="findme")
        assert any(i["identifier"] == iss["identifier"] for i in found["issues"])

    async def test_issue_label_unknown_label_is_an_error(self, test_project, test_team):
        await self._make_label(test_team.id, "known")
        iss = await tools.issue_create(title="Bad label")
        result = await tools.issue_label(identifier=iss["identifier"], add=["no-such-label"])
        assert "error" in result

    async def test_issue_label_requires_add_or_remove(self, test_project):
        iss = await tools.issue_create(title="Nothing to do")
        assert "error" in await tools.issue_label(identifier=iss["identifier"])



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


class TestDocUpdate:
    """doc_update goes through documents_api.update_document (CHT-1330),
    which is what makes revision history work -- there is no DB trigger
    behind document_revisions, the snapshot is appended by
    DocumentService.update(). A tool that wrote via the ORM directly
    would silently gap the history, so the revision assertions below are
    the point of this class, not incidental coverage.
    """

    async def test_doc_update_content(self, test_project):
        created = await tools.doc_create(title="Editable", content="v1 body")
        result = await tools.doc_update(document_id=created["id"], content="v2 body")
        assert result["content"] == "v2 body"
        assert result["title"] == "Editable"

    async def test_doc_update_appends_a_revision(self, test_project):
        from app.services.document_service import DocumentService

        created = await tools.doc_create(title="Versioned", content="v1 body")
        await tools.doc_update(document_id=created["id"], content="v2 body")

        revisions = await DocumentService().list_revisions(created["id"])
        assert [r.version for r in revisions] == [2, 1]
        # The pre-edit body is still readable -- the edit didn't destroy it.
        assert next(r for r in revisions if r.version == 1).content == "v1 body"
        assert next(r for r in revisions if r.version == 2).content == "v2 body"

    async def test_doc_update_omitted_fields_untouched(self, test_project):
        created = await tools.doc_create(title="Keep icon", content="body", icon="📘")
        result = await tools.doc_update(document_id=created["id"], title="Renamed")
        assert result["title"] == "Renamed"
        assert result["icon"] == "📘"
        assert result["content"] == "body"

    async def test_doc_update_resolves_by_title(self, test_project):
        created = await tools.doc_create(title="Fuzzy Editable Doc", content="body")
        result = await tools.doc_update(document_id="Fuzzy Editable Doc", content="edited")
        assert result["id"] == created["id"]
        assert result["content"] == "edited"

    async def test_doc_update_move_to_project(self, test_project):
        created = await tools.doc_create(title="Movable", is_global=True)
        assert created["project_id"] is None
        result = await tools.doc_update(document_id=created["id"], project=test_project.key)
        assert result["project_id"] == test_project.id

    async def test_doc_update_is_global_detaches_project(self, test_project):
        created = await tools.doc_create(title="Detachable", project=test_project.key)
        assert created["project_id"] == test_project.id
        result = await tools.doc_update(document_id=created["id"], is_global=True)
        assert result["project_id"] is None

    async def test_doc_update_no_fields_is_an_error(self, test_project):
        created = await tools.doc_create(title="Untouched", content="body")
        result = await tools.doc_update(document_id=created["id"])
        assert "error" in result

    async def test_doc_update_rejects_project_and_is_global_together(self, test_project):
        created = await tools.doc_create(title="Ambiguous", content="body")
        result = await tools.doc_update(
            document_id=created["id"], project=test_project.key, is_global=True,
        )
        assert "error" in result

    async def test_doc_update_unknown_document_is_an_error(self, test_project):
        result = await tools.doc_update(document_id="no-such-document", content="x")
        assert "error" in result


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
