"""Moving an issue, and its descendants, to another project (CHT-2106, CHT-2107)."""
import pytest

from app.enums import ActivityType, IssueRelationType
from app.oxyde_models.issue import (
    OxydeIssue, OxydeIssueActivity, OxydeIssueComment, OxydeIssueRelation, OxydeTicketLimbo,
)
from app.oxyde_models.issue_alias import OxydeIssueAlias
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.enums import TeamRole

pytestmark = pytest.mark.asyncio


async def _mk(client, headers, project, title, **body):
    r = await client.post(f"/api/projects/{project.id}/issues", headers=headers, json={"title": title, **body})
    assert r.status_code in (200, 201), r.text
    return r.json()


async def _move(client, headers, issue_id, project_id, **body):
    return await client.post(
        f"/api/issues/{issue_id}/move", headers=headers, json={"project_id": project_id, **body},
    )


@pytest.fixture
async def target(db, test_team):
    return await OxydeProject.objects.create(
        team_id=test_team.id, name="Ops", key="OPS", estimate_scale="POWERS_OF_2",
    )


async def _three_level_epic(client, headers, project):
    epic = await _mk(client, headers, project, "Epic", issue_type="epic")
    child = await _mk(client, headers, project, "Child", parent_id=epic["id"])
    grandchild = await _mk(client, headers, project, "Grandchild", parent_id=child["id"])
    return epic, child, grandchild


async def test_moves_a_three_level_epic_and_old_identifiers_resolve(client, auth_headers, test_project, target):
    await _mk(client, auth_headers, target, "Already there")  # OPS-1
    epic, child, grandchild = await _three_level_epic(client, auth_headers, test_project)

    r = await _move(client, auth_headers, epic["id"], target.id, with_children=True)

    assert r.status_code == 200, r.text
    body = r.json()
    assert body["dry_run"] is False
    assert [(m["old"], m["new"]) for m in body["moved"]] == [
        (epic["identifier"], "OPS-2"), (child["identifier"], "OPS-3"), (grandchild["identifier"], "OPS-4"),
    ]
    for old, new in [(epic["identifier"], "OPS-2"), (grandchild["identifier"], "OPS-4")]:
        got = await client.get(f"/api/issues/identifier/{old}", headers=auth_headers)
        assert got.status_code == 200, got.text
        assert got.json()["identifier"] == new
        assert got.json()["project_id"] == target.id
    # The tree is intact in the target.
    moved_child = await OxydeIssue.objects.get(id=child["id"])
    assert moved_child.parent_id == epic["id"]
    assert moved_child.project_id == target.id
    activity = await OxydeIssueActivity.objects.filter(issue_id=epic["id"], activity_type=ActivityType.MOVED).first()
    assert (activity.old_value, activity.new_value) == (epic["identifier"], "OPS-2")


async def test_old_number_is_never_reused(client, auth_headers, test_project, target):
    a = await _mk(client, auth_headers, test_project, "A")
    b = await _mk(client, auth_headers, test_project, "B")  # the project's highest number
    assert (await _move(client, auth_headers, b["id"], target.id)).status_code == 200

    c = await _mk(client, auth_headers, test_project, "C")

    assert c["identifier"] != b["identifier"]
    assert c["number"] == b["number"] + 1
    assert a["identifier"] != c["identifier"]


async def test_moving_back_and_forth_keeps_every_old_identifier(client, auth_headers, test_project, target):
    a = await _mk(client, auth_headers, test_project, "A")
    first = (await _move(client, auth_headers, a["id"], target.id)).json()["moved"][0]["new"]
    back = await _move(client, auth_headers, a["id"], test_project.id)
    assert back.status_code == 200, back.text
    final = back.json()["moved"][0]["new"]
    assert final not in (a["identifier"], first)
    for ident in (a["identifier"], first, final):
        got = await client.get(f"/api/issues/identifier/{ident}", headers=auth_headers)
        assert got.json()["identifier"] == final


async def test_dry_run_writes_nothing(client, auth_headers, test_project, target):
    a = await _mk(client, auth_headers, test_project, "A")

    r = await _move(client, auth_headers, a["id"], target.id, dry_run=True)

    assert r.status_code == 200, r.text
    assert r.json()["dry_run"] is True
    assert r.json()["moved"][0]["new"] == "OPS-1"
    issue = await OxydeIssue.objects.get(id=a["id"])
    assert issue.identifier == a["identifier"]
    assert not await OxydeIssueAlias.objects.filter(issue_id=a["id"]).exists()


async def test_children_must_come_along_or_stay_by_choice(client, auth_headers, test_project, target):
    epic, child, _ = await _three_level_epic(client, auth_headers, test_project)

    r = await _move(client, auth_headers, epic["id"], target.id)

    assert r.status_code == 400
    assert "sub-issues" in r.json()["detail"]
    assert (await OxydeIssue.objects.get(id=epic["id"])).project_id == test_project.id


async def test_parent_left_behind_is_detached_and_reported(client, auth_headers, test_project, target):
    epic = await _mk(client, auth_headers, test_project, "Epic", issue_type="epic")
    child = await _mk(client, auth_headers, test_project, "Child", parent_id=epic["id"])

    r = await _move(client, auth_headers, child["id"], target.id)

    assert r.status_code == 200, r.text
    assert r.json()["detached_parent"] == epic["identifier"]
    assert (await OxydeIssue.objects.get(id=child["id"])).parent_id is None


async def test_data_travels_and_mappings_are_reported(client, auth_headers, test_project, target, test_sprint, test_user):
    other = await _mk(client, auth_headers, test_project, "Stays behind")
    a = await _mk(client, auth_headers, test_project, "A", estimate=3, sprint_id=test_sprint.id)
    await client.post(f"/api/issues/{a['id']}/comments", headers=auth_headers, json={"content": "hello"})
    rel = await client.post(
        f"/api/issues/{a['id']}/relations", headers=auth_headers,
        json={"related_issue_id": other["id"], "relation_type": "blocks"},
    )
    assert rel.status_code == 201, rel.text
    await OxydeTicketLimbo.objects.create(issue_id=a["id"], limbo_type="CLOSE", requested_by_id=test_user.id)

    r = await _move(client, auth_headers, a["id"], target.id)

    assert r.status_code == 200, r.text
    body = r.json()
    assert body["removed_from_sprint"] == [a["identifier"]]
    assert body["canceled_intents"] == [a["identifier"]]
    assert len(body["warnings"]) == 1 and body["warnings"][0].startswith(f"{a['identifier']}:")
    moved = await OxydeIssue.objects.get(id=a["id"])
    assert moved.sprint_id is None and moved.estimate == 3
    assert await OxydeIssueComment.objects.filter(issue_id=a["id"]).count() == 1
    relation = await OxydeIssueRelation.objects.filter(issue_id=a["id"], related_issue_id=other["id"]).first()
    assert IssueRelationType(relation.relation_type) == IssueRelationType.BLOCKS
    assert not await OxydeTicketLimbo.objects.filter(issue_id=a["id"], cleared_at=None).exists()


async def test_old_identifier_in_text_still_links(client, auth_headers, test_project, target):
    a = await _mk(client, auth_headers, test_project, "A")
    await _move(client, auth_headers, a["id"], target.id)

    b = await _mk(client, auth_headers, test_project, "B", description=f"follows {a['identifier']}")

    assert await OxydeIssueRelation.objects.filter(issue_id=b["id"], related_issue_id=a["id"]).exists()


async def test_refuses_same_project_and_other_team(client, auth_headers, test_project, test_user):
    a = await _mk(client, auth_headers, test_project, "A")
    assert (await _move(client, auth_headers, a["id"], test_project.id)).status_code == 400

    other_team = await OxydeTeam.objects.create(name="Other", key="OTH")
    await OxydeTeamMember.objects.create(team_id=other_team.id, user_id=test_user.id, role=TeamRole.OWNER)
    elsewhere = await OxydeProject.objects.create(team_id=other_team.id, name="App", key="APP")
    r = await _move(client, auth_headers, a["id"], elsewhere.id)
    assert r.status_code == 400
    assert (await OxydeIssue.objects.get(id=a["id"])).project_id == test_project.id


async def test_failed_move_changes_nothing(client, auth_headers, test_project, target, monkeypatch):
    epic, child, grandchild = await _three_level_epic(client, auth_headers, test_project)
    from app.services import issue_move_service

    calls = {"n": 0}
    real_create = OxydeIssueActivity.objects.create

    async def flaky_create(**kw):
        calls["n"] += 1
        if kw.get("activity_type") == ActivityType.MOVED and calls["n"] > 2:
            raise RuntimeError("boom")
        return await real_create(**kw)

    monkeypatch.setattr(issue_move_service.OxydeIssueActivity.objects, "create", flaky_create)
    with pytest.raises(RuntimeError):
        await _move(client, auth_headers, epic["id"], target.id, with_children=True)

    for issue in (epic, child, grandchild):
        row = await OxydeIssue.objects.get(id=issue["id"])
        assert (row.identifier, row.project_id) == (issue["identifier"], test_project.id)
    assert not await OxydeIssueAlias.objects.filter(issue_id__in=[epic["id"], child["id"]]).exists()


async def test_deleting_a_moved_issue_frees_nothing_it_still_names(client, auth_headers, test_project, target):
    a = await _mk(client, auth_headers, test_project, "A")
    await _move(client, auth_headers, a["id"], target.id)

    assert (await client.delete(f"/api/issues/{a['id']}", headers=auth_headers)).status_code == 204

    assert not await OxydeIssueAlias.objects.filter(issue_id=a["id"]).exists()
    got = await client.get(f"/api/issues/identifier/{a['identifier']}", headers=auth_headers)
    assert got.status_code == 404
