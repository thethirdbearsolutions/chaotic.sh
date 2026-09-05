"""Direct (non-HTTP) tool-function tests for app.mcp_server.tools (CHT-1266).

test_mcp_endpoint.py drives these through the real MCP protocol over HTTP
for end-to-end confidence; this file calls the (already-`_boundary`-wrapped)
tool coroutines directly with the auth contextvar set by hand, to reach
branches an HTTP round-trip per case would make tedious: parameter
combinations (epic filters, sprint filters, assignee resolution,
explicit `project`/`team` overrides, `unassigned`), the `_boundary`
error-translation paths, and doc_view's fuzzy id/title matching.
"""
import pathlib
import re

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
        # Compact rows carry the resolved name, not the UUID (CHT-1371).
        assert all(i["assignee_name"] == test_user.name for i in result["issues"])
        full = await tools.issue_list(assignee="me", detail=True)
        assert all(i["assignee_id"] == test_user.id for i in full["issues"])

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


class TestDocLinkUnlink:
    async def test_link_then_doc_view_shows_it(self, test_project):
        doc = await tools.doc_create(title="Design note", content="...")
        iss = await tools.issue_create(title="Implements the design")

        result = await tools.doc_link(document_id=doc["id"], identifier=iss["identifier"])
        assert result["linked"] is True

        viewed = await tools.doc_view(document_id=doc["id"])
        assert [i["identifier"] for i in viewed["linked_issues"]] == [iss["identifier"]]

    async def test_unlink_removes_it_but_keeps_both_ends(self, test_project):
        doc = await tools.doc_create(title="Temporary link", content="...")
        iss = await tools.issue_create(title="Unrelated after all")
        await tools.doc_link(document_id=doc["id"], identifier=iss["identifier"])

        result = await tools.doc_unlink(document_id=doc["id"], identifier=iss["identifier"])
        assert result["unlinked"] is True

        viewed = await tools.doc_view(document_id=doc["id"])
        assert viewed["linked_issues"] == []
        # Both ends survive -- this removes an association, not content.
        assert "error" not in await tools.issue_view(iss["identifier"])

    async def test_link_is_idempotent(self, test_project):
        doc = await tools.doc_create(title="Linked twice", content="...")
        iss = await tools.issue_create(title="Same issue")
        await tools.doc_link(document_id=doc["id"], identifier=iss["identifier"])
        second = await tools.doc_link(document_id=doc["id"], identifier=iss["identifier"])

        assert "error" not in second
        viewed = await tools.doc_view(document_id=doc["id"])
        assert len(viewed["linked_issues"]) == 1

    async def test_link_resolves_document_by_title(self, test_project):
        doc = await tools.doc_create(title="Findable By Title", content="...")
        iss = await tools.issue_create(title="Points at it")

        result = await tools.doc_link(
            document_id="Findable By Title", identifier=iss["identifier"],
        )
        assert result["document_id"] == doc["id"]

    async def test_link_unknown_issue_is_an_error(self, test_project):
        doc = await tools.doc_create(title="Orphan link", content="...")
        assert "error" in await tools.doc_link(document_id=doc["id"], identifier="NOPE-1")



class TestSprintTools:
    """CHT-1332: an agent that hits sprint_in_arrears could previously
    neither see why nor clear it. These tests reproduce that dead end and
    prove the new tools break it.
    """

    async def _active(self, project_id=None):
        """The active sprint.

        This used to exist because the sprint tools could not cope with a
        project whose first sprint had never been materialised -- calling
        sprint_current() first was a workaround, and it hid that bug from
        every test in this class. resolve_sprint now materialises like the
        routed endpoint does (CHT-1351), so this is just a convenience for
        getting at the sprint's fields; TestReviewRegressions covers the
        fresh-project path directly.
        """
        return await tools.sprint_current()

    async def _set_budget(self, sprint_id, budget):
        from app.schemas.sprint import SprintUpdate
        from app.services.sprint_service import SprintService
        svc = SprintService()
        return await svc.update(await svc.get_by_id(sprint_id), SprintUpdate(budget=budget))

    async def test_sprint_current_reports_budget_state(self, test_project):
        sprint = await self._active()
        await self._set_budget(sprint["id"], 10)

        result = await tools.sprint_current()

        assert result["budget"] == 10
        assert result["points_spent"] == 0
        assert result["in_arrears"] is False
        assert result["arrears_by"] == 0
        assert result["points_remaining"] == 10

    async def test_sprint_current_surfaces_arrears(self, test_project):
        """The state that blocks issue_update, made visible."""
        sprint = await self._active()
        await self._set_budget(sprint["id"], 1)

        for title in ("First", "Second"):
            iss = await tools.issue_create(title=title, estimate=1)
            await tools.issue_update(identifier=iss["identifier"], status="done")

        result = await tools.sprint_current()

        assert result["points_spent"] == 2
        assert result["in_arrears"] is True
        assert result["arrears_by"] == 1
        assert result["points_remaining"] == -1

    async def test_arrears_blocks_writes_and_close_clears_it(self, test_project):
        """End to end: the dead end, then the way out."""
        sprint = await self._active()
        await self._set_budget(sprint["id"], 1)

        for title in ("A", "B"):
            iss = await tools.issue_create(title=title, estimate=1)
            await tools.issue_update(identifier=iss["identifier"], status="done")

        blocked = await tools.issue_create(title="Cannot start")
        refused = await tools.issue_update(
            identifier=blocked["identifier"], status="in_progress",
        )
        assert "error" in refused

        closed = await tools.sprint_close()
        assert "error" not in closed

        # A fresh active sprint, and the write now goes through.
        after = await tools.issue_update(
            identifier=blocked["identifier"], status="in_progress",
        )
        assert "error" not in after
        assert after["status"] == "in_progress"

    async def test_sprint_current_unlimited_budget(self, test_project):
        sprint = await self._active()
        await self._set_budget(sprint["id"], None)
        result = await tools.sprint_current()
        assert result["in_arrears"] is False
        assert result["points_remaining"] is None

    async def test_sprint_list(self, test_project):
        await self._active()
        result = await tools.sprint_list()
        assert len(result["sprints"]) >= 1
        assert "in_arrears" in result["sprints"][0]

    async def test_sprint_close_reports_whether_it_rotated(self, test_project):
        await self._active()
        result = await tools.sprint_close()
        assert "entered_limbo" in result
        assert result["entered_limbo"] is False

    async def test_sprint_transactions_audit_trail(self, test_project):
        await self._active()
        iss = await tools.issue_create(title="Charged", estimate=3)
        await tools.issue_update(identifier=iss["identifier"], status="done")

        result = await tools.sprint_transactions()

        assert len(result["transactions"]) == 1
        assert result["transactions"][0]["points"] == 3

    async def test_unestimated_ticket_charges_one_point(self, test_project):
        """Documented rule (DEFAULT_ONE_POINT) -- pinned so the tool's
        docstring stays honest."""
        await self._active()
        iss = await tools.issue_create(title="No estimate")
        await tools.issue_update(identifier=iss["identifier"], status="done")

        assert (await tools.sprint_current())["points_spent"] == 1

    async def test_sprint_add_and_remove(self, test_project):
        await self._active()
        a = await tools.issue_create(title="Sched A")
        b = await tools.issue_create(title="Sched B")

        added = await tools.sprint_add(identifiers=[a["identifier"], b["identifier"]])
        assert added["updated"] == [a["identifier"], b["identifier"]]
        assert added["failed"] == []
        view = await tools.issue_view(a["identifier"])
        assert view["sprint_id"] == added["sprint_id"]
        # The target sprint is named, and the issue row carries the name too (CHT-1371).
        assert added["sprint"] == {"id": added["sprint_id"], "name": (await tools.sprint_current())["name"]}
        assert view["sprint_name"] == added["sprint"]["name"]

        removed = await tools.sprint_remove(identifiers=[a["identifier"]])
        assert removed["updated"] == [a["identifier"]]
        assert (await tools.issue_view(a["identifier"]))["sprint_id"] is None

    async def test_sprint_add_reports_partial_failure(self, test_project):
        """One bad identifier must not discard the rest of the batch."""
        await self._active()
        good = await tools.issue_create(title="Real one")

        result = await tools.sprint_add(identifiers=[good["identifier"], "NOPE-999"])

        assert result["updated"] == [good["identifier"]]
        assert [f["identifier"] for f in result["failed"]] == ["NOPE-999"]

    async def test_sprint_add_requires_identifiers(self, test_project):
        assert "error" in await tools.sprint_add(identifiers=[])



class TestRitualTools:
    """CHT-1333: issue_update took an `attest` map keyed by ritual name,
    but nothing on this surface could tell you those names -- and
    sprint_close could drop a project into limbo with no way out.
    """

    async def _make_ritual(self, project_id, name, prompt="Did you do it?", **kw):
        from app.enums import RitualTrigger
        from app.schemas.ritual import RitualCreate
        from app.services.ritual_service import RitualService
        return await RitualService().create(
            RitualCreate(name=name, prompt=prompt,
                         trigger=kw.pop("trigger", RitualTrigger.EVERY_SPRINT), **kw),
            project_id,
        )

    async def test_ritual_list_exposes_names_and_prompts(self, test_project):
        await self._make_ritual(test_project.id, "retro", prompt="Write the retro.")
        result = await tools.ritual_list()
        by_name = {r["name"]: r for r in result["rituals"]}
        assert "retro" in by_name
        assert by_name["retro"]["prompt"] == "Write the retro."

    async def test_ritual_pending_is_empty_when_not_in_limbo(self, test_project):
        await self._make_ritual(test_project.id, "retro")
        result = await tools.ritual_pending()
        assert result["scope"] == "sprint"
        assert result["in_limbo"] is False

    async def test_close_enters_limbo_and_attesting_clears_it(self, test_project):
        """The full way out, which had no MCP path before."""
        await self._make_ritual(test_project.id, "retro", prompt="Write the retro.")
        await tools.sprint_current()

        closed = await tools.sprint_close()
        assert closed["entered_limbo"] is True

        pending = await tools.ritual_pending()
        assert pending["in_limbo"] is True
        assert pending["unattested"] == ["retro"]
        # The prompt is there: the agent can see what to write.
        assert pending["pending_rituals"][0]["prompt"] == "Write the retro."

        result = await tools.ritual_attest(ritual="retro", note="Retro written up.")
        assert result["approved"] is True
        assert result["still_in_limbo"] is False

        assert (await tools.ritual_pending())["in_limbo"] is False

    async def test_attest_requires_a_note_and_quotes_the_prompt(self, test_project):
        """A note-less attest must say what the note should answer --
        the caller has no other way to see the prompt."""
        await self._make_ritual(test_project.id, "gate", prompt="Is the ADR written?")
        await tools.sprint_current()
        await tools.sprint_close()

        result = await tools.ritual_attest(ritual="gate")

        assert "error" in result
        assert "Is the ADR written?" in result["error"]

    async def test_attest_unknown_ritual_lists_the_real_ones(self, test_project):
        await self._make_ritual(test_project.id, "retro")
        result = await tools.ritual_attest(ritual="no-such-ritual", note="x")
        assert "error" in result
        assert "retro" in result["error"]

    async def test_ritual_name_match_is_case_insensitive(self, test_project):
        await self._make_ritual(test_project.id, "Retro")
        await tools.sprint_current()
        await tools.sprint_close()
        result = await tools.ritual_attest(ritual="retro", note="done")
        assert "error" not in result

    async def test_ticket_ritual_pending_and_attest(self, test_project):
        """Ticket-scoped rituals: the names issue_update's `attest` needs."""
        from app.enums import RitualTrigger
        await self._make_ritual(
            test_project.id, "close-gate", prompt="Linked the commit?",
            trigger=RitualTrigger.TICKET_CLOSE,
        )
        iss = await tools.issue_create(title="Gated ticket")

        pending = await tools.ritual_pending(identifier=iss["identifier"])
        assert pending["scope"] == "ticket"
        assert "close-gate" in pending["unattested"]

        result = await tools.ritual_attest(
            ritual="close-gate", note="abc123", identifier=iss["identifier"],
        )
        assert result["scope"] == "ticket"
        assert "error" not in result

        # Having attested, the close now goes through.
        done = await tools.issue_update(identifier=iss["identifier"], status="done")
        assert "error" not in done
        assert done["status"] == "done"

    async def test_ticket_ritual_without_identifier_says_so(self, test_project):
        """Dispatch is automatic, but a ticket ritual still needs a ticket."""
        from app.enums import RitualTrigger
        await self._make_ritual(
            test_project.id, "claim-gate", trigger=RitualTrigger.TICKET_CLAIM,
        )
        result = await tools.ritual_attest(ritual="claim-gate", note="x")
        assert "error" in result
        assert "identifier" in result["error"]



class TestIssueStartClaimParity:
    async def test_claim_gated_ticket_cannot_start_without_attest(self, test_project):
        """The bug: a claim ritual made issue_start unusable, with the
        only workaround being to bypass it via issue_update."""
        from app.enums import RitualTrigger
        from app.schemas.ritual import RitualCreate
        from app.services.ritual_service import RitualService
        await RitualService().create(
            RitualCreate(name="claim-gate", prompt="Branch cut?",
                         trigger=RitualTrigger.TICKET_CLAIM),
            test_project.id,
        )
        iss = await tools.issue_create(title="Gated claim")

        refused = await tools.issue_start(identifier=iss["identifier"])
        assert "error" in refused

        started = await tools.issue_start(
            identifier=iss["identifier"], attest={"claim-gate": "cut feature/x"},
        )
        assert "error" not in started
        assert started["status"] == "in_progress"

    async def test_lease_seconds_is_honoured(self, test_project):
        iss = await tools.issue_create(title="Long job")
        started = await tools.issue_start(identifier=iss["identifier"], lease_seconds=14400)
        assert "error" not in started
        assert started["lease_expires_at"] is not None

    async def test_start_without_lease_still_works(self, test_project):
        iss = await tools.issue_create(title="Default lease")
        started = await tools.issue_start(identifier=iss["identifier"])
        assert started["status"] == "in_progress"

    async def test_start_rejects_empty_attestation_note(self, test_project):
        from app.enums import RitualTrigger
        from app.schemas.ritual import RitualCreate
        from app.services.ritual_service import RitualService
        await RitualService().create(
            RitualCreate(name="claim-gate", prompt="Branch?",
                         trigger=RitualTrigger.TICKET_CLAIM),
            test_project.id,
        )
        iss = await tools.issue_create(title="Blank note")
        result = await tools.issue_start(identifier=iss["identifier"], attest={"claim-gate": " "})
        assert "error" in result

    async def test_ritual_pending_supplies_the_name_issue_start_needs(self, test_project):
        """CHT-1333 + CHT-1342 together: discover the ritual, then use it."""
        from app.enums import RitualTrigger
        from app.schemas.ritual import RitualCreate
        from app.services.ritual_service import RitualService
        await RitualService().create(
            RitualCreate(name="claim-gate", prompt="Branch cut?",
                         trigger=RitualTrigger.TICKET_CLAIM),
            test_project.id,
        )
        iss = await tools.issue_create(title="Discoverable")

        pending = await tools.ritual_pending(identifier=iss["identifier"])
        name = pending["unattested"][0]

        started = await tools.issue_start(
            identifier=iss["identifier"], attest={name: "cut it"},
        )
        assert started["status"] == "in_progress"



class TestEnumSerialisationParity:
    """These API functions are undecorated coroutines; the response_model
    that shapes their output lives on the routed wrappers in nested.py.
    So an in-process caller gets raw Oxyde rows, and dumping one of those
    emits enum NAMES ("ACTIVE") where every HTTP client sees VALUES
    ("active"). The toolset sync test compares schemas, not response
    values, so nothing else catches that divergence.
    """

    async def test_sprint_status_is_the_enum_value(self, test_project):
        assert (await tools.sprint_current())["status"] == "active"

    async def test_sprint_list_status_is_the_enum_value(self, test_project):
        await tools.sprint_current()
        statuses = {s["status"] for s in (await tools.sprint_list())["sprints"]}
        assert statuses and all(s == s.lower() for s in statuses)

    async def test_sprint_close_status_is_the_enum_value(self, test_project):
        await tools.sprint_current()
        closed = await tools.sprint_close()
        assert closed["status"] == closed["status"].lower()

    async def test_ritual_trigger_is_the_enum_value(self, test_project):
        from app.enums import RitualTrigger
        from app.schemas.ritual import RitualCreate
        from app.services.ritual_service import RitualService
        await RitualService().create(
            RitualCreate(name="close-gate", prompt="?",
                         trigger=RitualTrigger.TICKET_CLOSE),
            test_project.id,
        )
        rituals = (await tools.ritual_list())["rituals"]
        assert rituals[0]["trigger"] == "ticket_close"
        assert rituals[0]["approval_mode"] == "auto"

    async def test_matches_what_an_http_client_sees(self, test_project, test_user,
                                                    client, auth_headers):
        """The actual contract: same field, same value, both transports."""
        from app.enums import RitualTrigger
        from app.schemas.ritual import RitualCreate
        from app.services.ritual_service import RitualService
        await RitualService().create(
            RitualCreate(name="parity", prompt="?",
                         trigger=RitualTrigger.TICKET_CLAIM),
            test_project.id,
        )

        via_tool = (await tools.ritual_list())["rituals"][0]["trigger"]
        resp = await client.get(
            f"/api/projects/{test_project.id}/rituals", headers=auth_headers,
        )
        via_http = resp.json()[0]["trigger"]

        assert via_tool == via_http == "ticket_claim"



class TestNoLeakedEnumNames:
    """Sweep every read tool's output for leaked enum NAMES.

    Enum-valued fields must reach callers as the enum VALUE ("backlog"),
    the way every HTTP client sees them. An Oxyde row dumped directly
    yields the NAME ("BACKLOG") instead -- which is why the api layer
    returns response schemas (ADR-0005). A per-tool
    assertion would only ever cover the tools someone remembered to
    write one for, so this sweeps them all and fails on anything that
    looks like a NAME.
    """

    # Fields whose values are legitimately SHOUTY (keys, uuids, identifiers).
    IGNORE = {
        "key", "identifier", "id", "team_id", "project_id", "sprint_id",
        "project_key", "parent_identifier",  # resolved companions (CHT-1371)
        "parent_id", "assignee_id", "creator_id", "author_id", "document_id",
        "issue_id", "related_issue_id", "label_id", "ritual_id",
        # activity old_value/new_value store the raw written string and
        # currently hold enum NAMES on every transport, HTTP included --
        # a pre-existing leak, tracked separately, not this sweep's business.
        "old_value", "new_value",
    }
    # "BACKLOG" (the enum NAME) and "IssueStatus.BACKLOG" (str() of a
    # member -- a third form that reached production once already; the
    # frontend's cleanValue() still strips that prefix today).
    NAME_LIKE = re.compile(r"^[A-Z][A-Z0-9_]{2,}$|^[A-Za-z]\w*\.[A-Z][A-Z0-9_]*$")

    def _leaks(self, obj, path=""):
        found = []
        if isinstance(obj, dict):
            for k, v in obj.items():
                if k not in self.IGNORE:
                    found += self._leaks(v, f"{path}.{k}")
        elif isinstance(obj, list):
            for i, v in enumerate(obj):
                found += self._leaks(v, f"{path}[{i}]")
        elif isinstance(obj, str) and self.NAME_LIKE.match(obj):
            found.append((path, obj))
        return found

    async def test_no_tool_leaks_an_enum_name(self, test_project, test_team):
        from app.enums import RitualTrigger
        from app.schemas.issue import LabelCreate
        from app.schemas.ritual import RitualCreate
        from app.services.issue_service import IssueService
        from app.services.ritual_service import RitualService

        await IssueService().create_label(LabelCreate(name="sweep"), test_team.id)
        await RitualService().create(
            RitualCreate(name="gate", prompt="?", trigger=RitualTrigger.TICKET_CLOSE),
            test_project.id,
        )
        iss = await tools.issue_create(title="Sweep me", estimate=1)
        blocker = await tools.issue_create(title="Blocker")
        await tools.issue_block(identifier=blocker["identifier"], blocked=iss["identifier"])
        doc = await tools.doc_create(title="Sweep doc", content="x")
        await tools.doc_link(document_id=doc["id"], identifier=iss["identifier"])
        await tools.issue_label(identifier=iss["identifier"], add=["sweep"])
        await tools.issue_update(identifier=iss["identifier"], priority="high")

        outputs = {
            "issue_view": await tools.issue_view(iss["identifier"]),
            "issue_list": await tools.issue_list(),
            "issue_ready": await tools.issue_ready(),
            "issue_relations": await tools.issue_relations(identifier=iss["identifier"]),
            "label_list": await tools.label_list(),
            "doc_list": await tools.doc_list(),
            "doc_view": await tools.doc_view(document_id=doc["id"]),
            "sprint_current": await tools.sprint_current(),
            "sprint_list": await tools.sprint_list(),
            "ritual_list": await tools.ritual_list(),
            "ritual_pending": await tools.ritual_pending(identifier=iss["identifier"]),
            "activity_recent": await tools.activity_recent(),
            "project_list": await tools.project_list(),
        }

        # A tool that raised comes back as {"error": ...} and would sweep
        # clean -- so the sweep would report full coverage precisely when
        # it inspected nothing. Assert the calls actually succeeded first
        # (CHT-1354).
        errored = {n: o["error"] for n, o in outputs.items() if isinstance(o, dict) and "error" in o}
        assert not errored, f"tools failed, so the sweep below proves nothing: {errored}"

        leaked = {name: found for name, out in outputs.items() if (found := self._leaks(out))}
        assert not leaked, (
            "tool output contains enum NAMES where values are expected "
            f"(the api function must return its response schema, ADR-0005): {leaked}"
        )



class TestNoLeakedInternalFields:
    """No tool may return a field its response schema omits (CHT-1348).

    ``response_model`` does two jobs: it serialises, and it FILTERS the
    payload down to the schema's fields. An in-process caller that dumps
    an ORM row gets neither -- and where the enum-casing half of that is
    cosmetic, this half is not. ``OxydeUser`` carries
    ``hashed_password``, ``is_superuser`` and the agent-scoping columns,
    none of which are on ``UserResponse``; ``OxydeIssue.creator`` and
    ``OxydeRitual.group`` are live relations to rows like that.

    Nothing leaks today -- the issue/doc tools call functions that
    return response models by construction (CHT-1348, ADR-0005).
    This pins that, because the failure would be silent and the blast
    radius is a password hash rather than a lowercase letter.
    """

    FORBIDDEN = (
        "hashed_password", "is_superuser", "parent_user_id", "parent_user",
        "agent_team_id", "agent_project_id", "key_hash", "api_key",
    )

    async def test_no_tool_returns_a_non_schema_field(self, test_project, test_team):
        import json

        iss = await tools.issue_create(title="Field sweep")
        doc = await tools.doc_create(title="Field sweep doc", content="x")

        outputs = {
            "issue_view": await tools.issue_view(iss["identifier"]),
            "issue_list": await tools.issue_list(),
            "issue_create": iss,
            "issue_ready": await tools.issue_ready(),
            "issue_relations": await tools.issue_relations(identifier=iss["identifier"]),
            "doc_view": await tools.doc_view(document_id=doc["id"]),
            "doc_list": await tools.doc_list(),
            "activity_recent": await tools.activity_recent(),
            "project_list": await tools.project_list(),
            "sprint_current": await tools.sprint_current(),
            "sprint_list": await tools.sprint_list(),
            "label_list": await tools.label_list(),
            "ritual_list": await tools.ritual_list(),
        }

        errored = {n: o["error"] for n, o in outputs.items() if isinstance(o, dict) and "error" in o}
        assert not errored, f"tools failed, so the sweep below proves nothing: {errored}"

        leaked = {}
        for name, out in outputs.items():
            blob = json.dumps(out, default=str)
            hits = [f for f in self.FORBIDDEN if f'"{f}"' in blob]
            if hits:
                leaked[name] = hits
        assert not leaked, f"tool output exposes non-schema fields: {leaked}"
class TestReviewRegressions:
    """Regressions for the oppositional review on PR #262 (CHT-1351)."""

    async def _ritual(self, project_id, name, **kw):
        from app.enums import RitualTrigger
        from app.schemas.ritual import RitualCreate
        from app.services.ritual_service import RitualService
        return await RitualService().create(
            RitualCreate(name=name, prompt=kw.pop("prompt", "?"),
                         trigger=kw.pop("trigger", RitualTrigger.EVERY_SPRINT), **kw),
            project_id,
        )

    # --- C1: sprint tools on a project whose first sprint was never created ---

    async def test_sprint_tools_work_on_a_project_with_no_sprint_yet(self, test_project):
        """Previously every sprint tool errored here while the same call
        over stdio silently created the sprint. The old test suite hid
        this by calling sprint_current() first."""
        iss = await tools.issue_create(title="Needs scheduling")

        result = await tools.sprint_add(identifiers=[iss["identifier"]])

        assert "error" not in result
        assert result["updated"] == [iss["identifier"]]

    async def test_sprint_transactions_on_a_fresh_project(self, test_project):
        result = await tools.sprint_transactions()
        assert "error" not in result
        assert result["transactions"] == []

    async def test_sprint_close_on_a_fresh_project(self, test_project):
        result = await tools.sprint_close()
        assert "error" not in result

    # --- C8: sprint reference resolution matches the CLI's ---

    async def test_sprint_resolves_by_bare_number_and_substring(self, test_project):
        await tools.sprint_current()  # materialise "Sprint 1"
        iss = await tools.issue_create(title="Schedulable")

        by_number = await tools.sprint_add(identifiers=[iss["identifier"]], sprint="1")
        assert "error" not in by_number

        # "Sprint" alone matches both Sprint 1 and Sprint 2, and ambiguity
        # must refuse rather than silently pick -- same as the CLI.
        ambiguous = await tools.sprint_add(identifiers=[iss["identifier"]], sprint="Sprint")
        assert "error" in ambiguous
        assert "Ambiguous" in str(ambiguous["error"])

        by_substring = await tools.sprint_add(identifiers=[iss["identifier"]], sprint="rint 1")
        assert "error" not in by_substring

    async def test_unknown_sprint_names_the_real_ones(self, test_project):
        await tools.sprint_current()
        result = await tools.sprint_add(identifiers=["X-1"], sprint="nope")
        assert "error" in result
        assert "Sprint 1" in str(result["error"])

    # --- C3: a successful close must not read as "still blocked" ---

    async def test_sprint_close_reports_the_newly_active_sprint(self, test_project):
        from app.schemas.sprint import SprintUpdate
        from app.services.sprint_service import SprintService

        cur = await tools.sprint_current()
        svc = SprintService()
        await svc.update(await svc.get_by_id(cur["id"]), SprintUpdate(budget=1))
        for title in ("A", "B"):
            i = await tools.issue_create(title=title, estimate=1)
            await tools.issue_update(identifier=i["identifier"], status="done")

        assert (await tools.sprint_current())["in_arrears"] is True

        closed = await tools.sprint_close()

        # The closed sprint keeps its history...
        assert closed["in_arrears"] is True
        # ...but the caller's real question is answered separately.
        assert closed["now_active"] is not None
        assert closed["now_active"]["in_arrears"] is False
        assert closed["now_active"]["id"] != closed["id"]

    # --- C12: ritual_pending(identifier=...) needs no project scoping ---

    async def test_ritual_pending_for_a_ticket_needs_no_project_context(self, test_project):
        from app.enums import RitualTrigger
        await self._ritual(test_project.id, "close-gate", trigger=RitualTrigger.TICKET_CLOSE)
        iss = await tools.issue_create(title="Gated")

        result = await tools.ritual_pending(identifier=iss["identifier"])

        assert "error" not in result
        assert result["scope"] == "ticket"

    # --- ritual_complete had no backend behavioural test at all ---

    async def test_ritual_complete_clears_a_gate_sprint_ritual(self, test_project):
        from app.enums import ApprovalMode
        await self._ritual(test_project.id, "signoff", approval_mode=ApprovalMode.GATE)
        await tools.sprint_current()
        await tools.sprint_close()

        assert (await tools.ritual_pending())["in_limbo"] is True

        result = await tools.ritual_complete(ritual="signoff", note="signed")

        assert "error" not in result
        assert result["scope"] == "sprint"
        assert result["still_in_limbo"] is False

    async def test_ritual_complete_dispatches_to_the_ticket_branch(self, test_project):
        """The _trigger_of dispatch, whose own docstring warns the failure
        is silent and surfaces as an unrelated 'not in limbo' error."""
        from app.enums import ApprovalMode, RitualTrigger
        await self._ritual(test_project.id, "close-signoff",
                           trigger=RitualTrigger.TICKET_CLOSE,
                           approval_mode=ApprovalMode.GATE)
        iss = await tools.issue_create(title="Gate-closed")

        result = await tools.ritual_complete(
            ritual="close-signoff", note="signed", identifier=iss["identifier"],
        )

        assert "error" not in result
        assert result["scope"] == "ticket"
        assert result["identifier"] == iss["identifier"]

    async def test_ritual_complete_ticket_ritual_without_identifier(self, test_project):
        from app.enums import ApprovalMode, RitualTrigger
        await self._ritual(test_project.id, "needs-ticket",
                           trigger=RitualTrigger.TICKET_CLOSE,
                           approval_mode=ApprovalMode.GATE)
        result = await tools.ritual_complete(ritual="needs-ticket", note="x")
        assert "error" in result
        assert "identifier" in str(result["error"])

    # --- C6: gate rituals refuse attestation; the docstring now says so ---

    async def test_attesting_a_gate_ritual_is_refused(self, test_project):
        from app.enums import ApprovalMode
        await self._ritual(test_project.id, "gate-only", approval_mode=ApprovalMode.GATE)
        await tools.sprint_current()
        await tools.sprint_close()

        result = await tools.ritual_attest(ritual="gate-only", note="nope")

        assert "error" in result



class TestOutputMatchesResponseSchema:
    """Every entity a tool returns must have the SHAPE of its response
    schema -- no field the schema drops.

    TestNoLeakedInternalFields is a name blocklist, which can only catch
    leaks someone thought to list. It names ``OxydeRitual.group`` in its
    own docstring and cannot actually catch it: having ``list_rituals``
    return raw rows again ships the entire joined group row, and every FORBIDDEN
    string is absent, so the sweep stays green (CHT-1354).

    Deriving the expectation from the schema instead catches any dropped
    field, including ones that do not exist yet. Fields a tool adds on
    purpose are declared per-tool, so the additions stay deliberate
    rather than becoming a hole.
    """

    # tool -> (path to the entity list/object, schema, deliberately-added keys)
    CASES = {
        "ritual_list": ("rituals", "RitualResponse", set()),
        "label_list": ("labels", "LabelResponse", set()),
        "sprint_list": ("sprints", "SprintResponse",
                        {"in_arrears", "arrears_by", "points_remaining"}),
        "issue_relations": ("relations", "IssueRelationResponse", set()),
    }

    def _schema(self, name):
        from app.schemas import issue as issue_schemas
        from app.schemas import ritual as ritual_schemas
        from app.schemas import sprint as sprint_schemas
        for mod in (ritual_schemas, issue_schemas, sprint_schemas):
            if hasattr(mod, name):
                return getattr(mod, name)
        raise AssertionError(f"schema {name} not found")

    async def test_tool_output_has_no_field_its_schema_drops(self, test_project, test_team):
        from app.enums import RitualTrigger
        from app.schemas.issue import LabelCreate
        from app.schemas.ritual import RitualCreate, RitualGroupCreate
        from app.services.issue_service import IssueService
        from app.services.ritual_service import RitualService

        # A ritual IN A GROUP, so the `group` relation is populated -- an
        # unjoined null would make this pass for the wrong reason.
        svc = RitualService()
        group = await svc.create_group(RitualGroupCreate(name="grp"), test_project.id)
        await svc.create(
            RitualCreate(name="grouped", prompt="?", trigger=RitualTrigger.TICKET_CLOSE,
                         group_id=group.id),
            test_project.id,
        )
        await IssueService().create_label(LabelCreate(name="shape"), test_team.id)
        await tools.sprint_current()
        a = await tools.issue_create(title="Shape A")
        b = await tools.issue_create(title="Shape B")
        await tools.issue_block(identifier=a["identifier"], blocked=b["identifier"])

        outputs = {
            "ritual_list": await tools.ritual_list(),
            "label_list": await tools.label_list(),
            "sprint_list": await tools.sprint_list(),
            "issue_relations": await tools.issue_relations(identifier=a["identifier"]),
        }

        errored = {n: o["error"] for n, o in outputs.items() if "error" in o}
        assert not errored, f"tools failed, so this proves nothing: {errored}"

        problems = {}
        for tool, (key, schema_name, extra) in self.CASES.items():
            allowed = set(self._schema(schema_name).model_fields) | extra
            entities = outputs[tool][key]
            assert entities, f"{tool} returned nothing; the check would be vacuous"
            for ent in entities:
                if surplus := set(ent) - allowed:
                    problems.setdefault(tool, set()).update(surplus)

        assert not problems, (
            "tool output carries fields its response schema drops -- the api "
            f"function must return its response schema (ADR-0005): {problems}"
        )



class TestSweepCoverage:
    """The output sweeps must account for every tool in ALL_TOOLS.

    The sweeps enumerate the tools they call by hand. That list sat next
    to a 30-entry ALL_TOOLS and had drifted to 13, silently omitting the
    very tools that still dumped raw ORM rows (CHT-1354) -- the same
    failure mode TestNoLeakedEnumNames's own docstring warns about for
    per-tool assertions.

    This does not call the missing tools; it forces the omission to be
    explicit and justified, so adding a tool means deciding whether it is
    swept rather than forgetting.
    """

    # Write tools with side effects the sweeps don't want, or tools whose
    # output is already covered via another tool's result.
    NOT_SWEPT = {
        # mutations -- swept indirectly via the read tools that show them
        "issue_create", "issue_update", "issue_comment", "issue_start",
        "issue_block", "issue_unblock", "issue_label",
        "doc_create", "doc_update", "doc_link", "doc_unlink",
        "sprint_add", "sprint_remove", "sprint_close",
        "ritual_attest", "ritual_complete",
        # read tools whose shape is asserted in their own tests
        "issue_view", "sprint_transactions",
    }

    def test_every_tool_is_swept_or_explicitly_excluded(self):
        import re

        from app.mcp_server.tools import ALL_TOOLS

        source = pathlib.Path(__file__).read_text()
        swept = set(re.findall(r'"(\w+)": await tools\.(?:\w+)\(', source))
        swept |= set(re.findall(r'"(\w+)": (?:await )?tools\.\w+', source))

        all_names = {t.__name__ for t in ALL_TOOLS}
        unaccounted = all_names - swept - self.NOT_SWEPT

        assert not unaccounted, (
            "these tools are neither swept for leaked enum names / internal "
            "fields nor listed in NOT_SWEPT -- add them to a sweep, or to "
            f"NOT_SWEPT with a reason: {sorted(unaccounted)}"
        )

    def test_not_swept_list_has_no_stale_entries(self):
        from app.mcp_server.tools import ALL_TOOLS

        all_names = {t.__name__ for t in ALL_TOOLS}
        stale = self.NOT_SWEPT - all_names
        assert not stale, f"NOT_SWEPT names tools that no longer exist: {sorted(stale)}"



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
        assert result == {"projects": [], "count": 0, "truncated": False}

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


class TestCompactListing:
    """List tools return a compact projection plus count/truncated (CHT-1370).

    The full response schema is what a row IS (ADR-0005); a list is what a
    model needs to SEE. issue_list at limit=200 used to be ~500 KB of
    descriptions and UUIDs. These pin the projection, the `detail` escape
    hatch, the limit+1 truncation probe, the activity preview, the
    issue_view comment cap, and a payload-size budget.
    """

    async def test_issue_rows_are_exactly_the_compact_fields(self, test_project, test_team):
        from app.schemas.issue import LabelCreate
        from app.services.issue_service import IssueService
        label = await IssueService().create_label(LabelCreate(name="compact"), test_team.id)
        created = await tools.issue_create(title="Compact me", description="x" * 3000)
        await tools.issue_label(identifier=created["identifier"], add=["compact"])

        result = await tools.issue_list()
        assert result["count"] == 1 and result["truncated"] is False
        row = result["issues"][0]
        assert set(row) == set(tools.COMPACT_ISSUE_FIELDS)
        assert row["labels"] == ["compact"]
        assert "description" not in row and "id" not in row
        assert label.id  # label exists; only its name travels

    async def test_detail_returns_full_schema_rows(self, test_project):
        from app.schemas.issue import IssueResponse
        await tools.issue_create(title="Full row", description="body")
        row = (await tools.issue_list(detail=True))["issues"][0]
        assert set(row) == set(IssueResponse.model_fields)
        assert row["description"] == "body"

    async def test_truncated_flag_uses_limit_plus_one(self, test_project):
        for i in range(3):
            await tools.issue_create(title=f"T{i}")
        two = await tools.issue_list(limit=2)
        assert two["count"] == 2 and two["truncated"] is True
        three = await tools.issue_list(limit=3)
        assert three["count"] == 3 and three["truncated"] is False

    async def test_issue_ready_doc_list_project_list_share_the_envelope(self, test_project, test_team):
        await tools.issue_create(title="Ready", status="todo")
        await tools.doc_create(title="Doc", content="c" * 2000)
        ready = await tools.issue_ready()
        docs = await tools.doc_list()
        projects = await tools.project_list()
        for res, key, fields in (
            (ready, "issues", tools.COMPACT_ISSUE_FIELDS),
            (docs, "documents", tools.COMPACT_DOCUMENT_FIELDS),
            (projects, "projects", tools.COMPACT_PROJECT_FIELDS),
        ):
            assert set(res) == {key, "count", "truncated"}, key
            assert res["count"] == len(res[key]) >= 1, key
            assert all(set(r) == set(fields) for r in res[key]), key
        assert "content" not in docs["documents"][0]

    async def test_activity_values_are_previewed(self, test_project):
        created = await tools.issue_create(title="Edited", description="o" * 1000)
        await tools.issue_update(created["identifier"], description="n" * 1000)
        rows = (await tools.activity_recent())["activities"]
        edit = next(r for r in rows if r["field_name"] == "description")
        assert edit["old_value"] == "o" * 200 + "...(+800 chars)"
        assert edit["new_value"] == "n" * 200 + "...(+800 chars)"

    async def test_issue_view_caps_comments_and_compacts_sub_issues(self, test_project):
        parent = await tools.issue_create(title="Parent")
        await tools.issue_create(title="Child", parent=parent["identifier"], description="d" * 500)
        for i in range(tools.ISSUE_VIEW_COMMENT_CAP + 5):
            await tools.issue_comment(parent["identifier"], content=f"c{i}")
        view = await tools.issue_view(parent["identifier"])
        assert view["comment_count"] == tools.ISSUE_VIEW_COMMENT_CAP + 5
        assert len(view["comments"]) == tools.ISSUE_VIEW_COMMENT_CAP
        assert view["comments"][-1]["content"] == f"c{tools.ISSUE_VIEW_COMMENT_CAP + 4}"  # newest kept
        # The issue itself keeps the detail shape; only sub-issues are compact.
        assert "description" in view and "id" in view
        assert view["sub_issue_count"] == 1
        assert set(view["sub_issues"][0]) == set(tools.COMPACT_ISSUE_FIELDS)

    async def test_issue_view_counts_past_the_rest_default_page(self, test_project):
        """The REST comments route defaults to the OLDEST 100. issue_view must
        fetch past that or "newest 20 of comment_count" is silently wrong
        above 100 comments (review of CHT-1370)."""
        iss = await tools.issue_create(title="Chatty")
        for i in range(105):
            await tools.issue_comment(iss["identifier"], content=f"c{i}")
        view = await tools.issue_view(iss["identifier"])
        assert view["comment_count"] == 105
        assert [c["content"] for c in view["comments"]][-1] == "c104"
        assert len(view["comments"]) == tools.ISSUE_VIEW_COMMENT_CAP

    async def test_python_sorted_keys_probe_by_offset(self, test_project):
        """priority/status are re-sorted in Python after SQL LIMIT; the page
        must be the same rows as before the truncation probe existed."""
        from app.services.issue_service import _SORT_PYTHON_KEYS
        assert set(tools.OFFSET_PROBE_SORT_KEYS) == set(_SORT_PYTHON_KEYS), (
            "OFFSET_PROBE_SORT_KEYS must name exactly the service's Python-sorted keys"
        )
        a = await tools.issue_create(title="A", priority="low")
        b = await tools.issue_create(title="B", priority="urgent")
        c = await tools.issue_create(title="C", priority="low")
        result = await tools.issue_list(limit=2, sort_by="priority")
        # The page is the newest two by created_at (B, C) re-sorted by
        # priority -- exactly what it was before the probe existed. An
        # over-fetch of 3 would have let the re-sort push A onto the page.
        assert {r["identifier"] for r in result["issues"]} == {b["identifier"], c["identifier"]}
        assert result["truncated"] is True
        full = await tools.issue_list(limit=3, sort_by="priority")
        assert full["count"] == 3 and full["truncated"] is False

    async def test_activity_probe_at_tool_maximum(self, test_project):
        """No route cap on activities, so limit=200 still probes 201."""
        iss = await tools.issue_create(title="Busy")
        for i in range(3):
            await tools.issue_comment(iss["identifier"], content=f"x{i}")
        result = await tools.activity_recent(limit=200)
        assert result["truncated"] is False and result["count"] >= 4

    async def test_fifty_verbose_issues_fit_a_model_context(self, test_project):
        """The number in CHT-1370: 50 issues with 5 KB descriptions must list
        in well under 40 KB. Full rows would be ~260 KB."""
        import json
        for i in range(50):
            await tools.issue_create(title=f"Verbose {i}", description="v" * 5000)
        compact = json.dumps(await tools.issue_list(limit=50))
        full = json.dumps(await tools.issue_list(limit=50, detail=True))
        assert len(compact) < 40_000, len(compact)
        assert len(full) > 250_000, len(full)


class TestResolvedCompanions:
    """UUID foreign keys travel with resolved names (CHT-1371), so a row's
    output is usable as the next call's input on this surface, where every
    tool addresses assignees/sprints/parents/projects by name or identifier."""

    async def test_compact_rows_carry_names_not_uuids(self, test_project, test_user):
        await tools.sprint_current()
        parent = await tools.issue_create(title="Epic-ish", issue_type="epic")
        child = await tools.issue_create(title="Child", parent=parent["identifier"])
        await tools.issue_update(child["identifier"], assignee="me")
        await tools.sprint_add(identifiers=[child["identifier"]])

        row = next(r for r in (await tools.issue_list())["issues"] if r["identifier"] == child["identifier"])
        assert row["assignee_name"] == test_user.name
        assert row["parent_identifier"] == parent["identifier"]
        assert row["sprint_name"] == (await tools.sprint_current())["name"]
        assert "assignee_id" not in row and "parent_id" not in row and "sprint_id" not in row

    async def test_detail_rows_carry_both(self, test_project, test_user):
        parent = await tools.issue_create(title="P")
        child = await tools.issue_create(title="C", parent=parent["identifier"])
        full = await tools.issue_view(child["identifier"])
        assert full["parent_id"] == parent["id"]
        assert full["parent_identifier"] == parent["identifier"]
        assert full["project_key"] == test_project.key
        assert full["assignee_name"] is None and full["sprint_name"] is None

    async def test_doc_view_linked_issues_carry_companions(self, test_project, test_user):
        """get_document_issues built IssueResponse by hand and missed the
        companions (PR #268 review); now it uses the shared builder."""
        parent = await tools.issue_create(title="P3")
        child = await tools.issue_create(title="C3", parent=parent["identifier"])
        await tools.issue_update(child["identifier"], assignee="me")
        doc = await tools.doc_create(title="Linked", content="x")
        await tools.doc_link(document_id=doc["id"], identifier=child["identifier"])
        linked = (await tools.doc_view(document_id=doc["id"]))["linked_issues"]
        assert linked[0]["parent_identifier"] == parent["identifier"]
        assert linked[0]["assignee_name"] == test_user.name
        assert linked[0]["project_key"] == test_project.key
        assert "lease_expires_at" in linked[0]  # the hand-rolled copy had dropped it

    # No dangling-FK test: issues.assignee_id/sprint_id/parent_id are real
    # FOREIGN KEY constraints (a write with an unknown id fails at the DB),
    # so the `.get()` -> None path in issues_to_responses is unreachable.

    async def test_sub_issue_rows_name_their_parent(self, test_project):
        parent = await tools.issue_create(title="P2")
        await tools.issue_create(title="C2", parent=parent["identifier"])
        view = await tools.issue_view(parent["identifier"])
        assert view["sub_issues"][0]["parent_identifier"] == parent["identifier"]

