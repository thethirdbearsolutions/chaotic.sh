"""Per-project epic and assignee knobs (CHT-1900).

- require_assignee_on_claim: a non-interactive claim must leave the
  ticket assigned.
- require_epic_on_close: a non-interactive close of a non-epic ticket
  with no parent is refused, unless the project has a usable default
  epic, which the ticket is then filed under.
- default_epic_id: new non-epic tickets created without a parent are
  filed under it, whoever creates them.

Like require_estimate_on_claim, both requirements exempt an interactive
human (JWT + X-Chaotic-Interactive: 1) and gate everything else.
"""
import pytest


async def _set(client, headers, project_id, **fields):
    r = await client.patch(f"/api/projects/{project_id}", headers=headers, json=fields)
    return r


async def _create(client, headers, project_id, **fields):
    body = {"title": fields.pop("title", "A ticket"), **fields}
    r = await client.post(f"/api/projects/{project_id}/issues", headers=headers, json=body)
    assert r.status_code in (200, 201), r.text
    return r.json()


@pytest.mark.asyncio
async def test_knobs_default_off_and_round_trip(client, auth_headers, test_project, db):
    r = await client.get(f"/api/projects/{test_project.id}", headers=auth_headers)
    data = r.json()
    assert data["require_assignee_on_claim"] is False
    assert data["require_epic_on_close"] is False
    assert data["default_epic_id"] is None

    r = await _set(client, auth_headers, test_project.id,
                   require_assignee_on_claim=True, require_epic_on_close=True)
    assert r.status_code == 200
    assert r.json()["require_assignee_on_claim"] is True
    assert r.json()["require_epic_on_close"] is True


@pytest.mark.asyncio
async def test_claim_without_assignee_refused(client, auth_headers, interactive_headers, test_project, test_issue, db):
    assert (await _set(client, auth_headers, test_project.id, require_assignee_on_claim=True)).status_code == 200

    r = await client.patch(f"/api/issues/{test_issue.id}", headers=auth_headers, json={"status": "in_progress"})
    assert r.status_code == 400
    assert "assignee is required" in r.json()["detail"]

    # Unassigning in the same call is refused too.
    r = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers,
        json={"status": "in_progress", "assignee_id": None},
    )
    assert r.status_code == 400

    # An interactive human is exempt.
    r = await client.patch(f"/api/issues/{test_issue.id}", headers=interactive_headers, json={"status": "in_progress"})
    assert r.status_code == 200, r.text


@pytest.mark.asyncio
async def test_claim_with_assignee_passes(client, auth_headers, test_project, test_issue, test_user, db):
    assert (await _set(client, auth_headers, test_project.id, require_assignee_on_claim=True)).status_code == 200
    r = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers,
        json={"status": "in_progress", "assignee_id": test_user.id},
    )
    assert r.status_code == 200, r.text
    assert r.json()["status"] == "in_progress"


@pytest.mark.asyncio
async def test_create_in_progress_without_assignee_refused(client, auth_headers, test_project, db):
    assert (await _set(client, auth_headers, test_project.id, require_assignee_on_claim=True)).status_code == 200
    r = await client.post(
        f"/api/projects/{test_project.id}/issues", headers=auth_headers,
        json={"title": "x", "status": "in_progress"},
    )
    assert r.status_code == 400
    assert "assignee is required" in r.json()["detail"]


@pytest.mark.asyncio
async def test_close_without_epic_refused_then_allowed_under_parent(client, auth_headers, interactive_headers, test_project, test_issue, db):
    assert (await _set(client, auth_headers, test_project.id, require_epic_on_close=True)).status_code == 200

    r = await client.patch(f"/api/issues/{test_issue.id}", headers=auth_headers, json={"status": "done"})
    assert r.status_code == 400
    assert "epic" in r.json()["detail"]

    # Canceling is not a close that needs an epic.
    other = await _create(client, auth_headers, test_project.id)
    r = await client.patch(f"/api/issues/{other['id']}", headers=auth_headers, json={"status": "canceled"})
    assert r.status_code == 200, r.text

    # Giving it a parent in the same call passes.
    epic = await _create(client, auth_headers, test_project.id, title="Goal", issue_type="epic")
    r = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers,
        json={"status": "done", "parent_id": epic["id"]},
    )
    assert r.status_code == 200, r.text

    # An interactive human is exempt.
    loose = await _create(client, auth_headers, test_project.id)
    r = await client.patch(f"/api/issues/{loose['id']}", headers=interactive_headers, json={"status": "done"})
    assert r.status_code == 200, r.text


@pytest.mark.asyncio
async def test_epic_itself_closes_without_parent(client, auth_headers, test_project, db):
    assert (await _set(client, auth_headers, test_project.id, require_epic_on_close=True)).status_code == 200
    epic = await _create(client, auth_headers, test_project.id, title="Goal", issue_type="epic")
    r = await client.patch(f"/api/issues/{epic['id']}", headers=auth_headers, json={"status": "done"})
    assert r.status_code == 200, r.text


@pytest.mark.asyncio
async def test_create_as_done_without_epic_refused(client, auth_headers, test_project, db):
    assert (await _set(client, auth_headers, test_project.id, require_epic_on_close=True)).status_code == 200
    r = await client.post(
        f"/api/projects/{test_project.id}/issues", headers=auth_headers,
        json={"title": "x", "status": "done"},
    )
    assert r.status_code == 400
    assert "epic" in r.json()["detail"]


@pytest.mark.asyncio
async def test_default_epic_files_new_tickets(client, auth_headers, test_project, db):
    epic = await _create(client, auth_headers, test_project.id, title="Goal", issue_type="epic")
    r = await _set(client, auth_headers, test_project.id, default_epic_id=epic["id"])
    assert r.status_code == 200, r.text
    assert r.json()["default_epic_id"] == epic["id"]

    child = await _create(client, auth_headers, test_project.id)
    assert child["parent_id"] == epic["id"]

    # An explicit parent wins, and epics are never defaulted.
    other_epic = await _create(client, auth_headers, test_project.id, title="Other", issue_type="epic")
    assert other_epic["parent_id"] is None
    explicit = await _create(client, auth_headers, test_project.id, parent_id=other_epic["id"])
    assert explicit["parent_id"] == other_epic["id"]

    # A closed default epic is not used.
    r = await client.patch(f"/api/issues/{epic['id']}", headers=auth_headers, json={"status": "done"})
    assert r.status_code == 200, r.text
    loose = await _create(client, auth_headers, test_project.id)
    assert loose["parent_id"] is None


@pytest.mark.asyncio
async def test_default_epic_absorbs_close_under_requirement(client, auth_headers, test_project, test_issue, db):
    epic = await _create(client, auth_headers, test_project.id, title="Goal", issue_type="epic")
    r = await _set(client, auth_headers, test_project.id, default_epic_id=epic["id"], require_epic_on_close=True)
    assert r.status_code == 200, r.text

    # test_issue predates the default, so it has no parent.
    r = await client.patch(f"/api/issues/{test_issue.id}", headers=auth_headers, json={"status": "done"})
    assert r.status_code == 200, r.text
    assert r.json()["parent_id"] == epic["id"]

    r = await client.get(f"/api/issues/{test_issue.id}/activities", headers=auth_headers)
    assert r.status_code == 200
    assert "parent_id" in [a.get("field_name") for a in r.json()]


@pytest.mark.asyncio
async def test_default_epic_must_be_an_open_epic_in_the_project(client, auth_headers, test_project, test_issue, db):
    # A task is not an epic.
    r = await _set(client, auth_headers, test_project.id, default_epic_id=test_issue.id)
    assert r.status_code == 400
    # Nor is a missing id.
    r = await _set(client, auth_headers, test_project.id, default_epic_id="nope")
    assert r.status_code == 400
    assert r.json()["detail"] == "Default epic must be an open epic in this project"

    epic = await _create(client, auth_headers, test_project.id, title="Goal", issue_type="epic")
    assert (await _set(client, auth_headers, test_project.id, default_epic_id=epic["id"])).status_code == 200
    # Once closed, re-sending the current value still saves (the web form
    # resends every setting) ...
    await client.patch(f"/api/issues/{epic['id']}", headers=auth_headers, json={"status": "done"})
    assert (await _set(client, auth_headers, test_project.id, default_epic_id=epic["id"])).status_code == 200
    # ... and null clears it.
    r = await _set(client, auth_headers, test_project.id, default_epic_id=None)
    assert r.status_code == 200
    assert r.json()["default_epic_id"] is None


@pytest.mark.asyncio
async def test_default_epic_in_another_project_refused(client, auth_headers, test_project, test_team, db):
    r = await client.post(
        f"/api/teams/{test_team.id}/projects", headers=auth_headers,
        json={"name": "Other", "key": "OTH"},
    )
    assert r.status_code in (200, 201), r.text
    other = r.json()
    epic = await _create(client, auth_headers, other["id"], title="Theirs", issue_type="epic")
    r = await _set(client, auth_headers, test_project.id, default_epic_id=epic["id"])
    assert r.status_code == 400


@pytest.mark.asyncio
async def test_deleting_the_default_epic_clears_it(client, auth_headers, test_project, db):
    epic = await _create(client, auth_headers, test_project.id, title="Goal", issue_type="epic")
    assert (await _set(client, auth_headers, test_project.id, default_epic_id=epic["id"])).status_code == 200
    r = await client.delete(f"/api/issues/{epic['id']}", headers=auth_headers)
    assert r.status_code in (200, 204), r.text
    r = await client.get(f"/api/projects/{test_project.id}", headers=auth_headers)
    assert r.json()["default_epic_id"] is None


@pytest.mark.asyncio
async def test_default_epic_beneath_the_issue_is_not_used(client, auth_headers, test_project, db):
    """Filing a ticket under a default epic that sits beneath it would
    close a loop in the hierarchy; the default is skipped and the close
    is refused instead."""
    top = await _create(client, auth_headers, test_project.id, title="Top")
    epic = await _create(client, auth_headers, test_project.id, title="Goal", issue_type="epic", parent_id=top["id"])
    r = await _set(client, auth_headers, test_project.id, default_epic_id=epic["id"], require_epic_on_close=True)
    assert r.status_code == 200, r.text
    r = await client.patch(f"/api/issues/{top['id']}", headers=auth_headers, json={"status": "done"})
    assert r.status_code == 400


@pytest.mark.asyncio
async def test_templates_carry_the_new_knobs(client, auth_headers, test_project, test_team, db):
    from app.services.template_service import TemplateService
    from app.oxyde_models.project import OxydeProject

    assert (await _set(client, auth_headers, test_project.id,
                       require_assignee_on_claim=True, require_epic_on_close=True)).status_code == 200
    project = await OxydeProject.objects.get(id=test_project.id)
    snap = await TemplateService().snapshot_project("knobs", project)
    settings = snap.body.sections["settings"]
    assert settings["require_assignee_on_claim"] is True
    assert settings["require_epic_on_close"] is True


# --- PR #462 review follow-ups ---------------------------------------------


@pytest.mark.asyncio
async def test_subtask_of_a_non_epic_does_not_count(client, auth_headers, test_project, db):
    """require_epic_on_close means an epic ancestor, not any parent."""
    assert (await _set(client, auth_headers, test_project.id, require_epic_on_close=True)).status_code == 200
    task = await _create(client, auth_headers, test_project.id, title="Plain task")
    sub = await _create(client, auth_headers, test_project.id, title="Sub", parent_id=task["id"])
    r = await client.patch(f"/api/issues/{sub['id']}", headers=auth_headers, json={"status": "done"})
    assert r.status_code == 400

    # Once the task above it becomes an epic, the close passes.
    r = await client.patch(f"/api/issues/{task['id']}", headers=auth_headers, json={"issue_type": "epic"})
    assert r.status_code == 200, r.text
    r = await client.patch(f"/api/issues/{sub['id']}", headers=auth_headers, json={"status": "done"})
    assert r.status_code == 200, r.text


@pytest.mark.asyncio
async def test_issue_type_in_the_same_request_counts(client, auth_headers, test_project, test_issue, db):
    assert (await _set(client, auth_headers, test_project.id, require_epic_on_close=True)).status_code == 200
    # Becoming an epic while closing: no parent needed.
    r = await client.patch(
        f"/api/issues/{test_issue.id}", headers=auth_headers, json={"status": "done", "issue_type": "epic"},
    )
    assert r.status_code == 200, r.text
    # An epic turned into a task while closing needs one.
    epic = await _create(client, auth_headers, test_project.id, title="Was an epic", issue_type="epic")
    r = await client.patch(
        f"/api/issues/{epic['id']}", headers=auth_headers, json={"status": "done", "issue_type": "task"},
    )
    assert r.status_code == 400


@pytest.mark.asyncio
async def test_epic_requirement_is_refused_before_close_rituals(client, auth_headers, test_project, test_issue, db):
    r = await client.post(f"/api/projects/{test_project.id}/rituals", headers=auth_headers, json={
        "name": "write-tests", "prompt": "Tests?", "trigger": "ticket_close",
        "approval_mode": "auto", "note_required": True,
    })
    assert r.status_code in (200, 201), r.text
    assert (await _set(client, auth_headers, test_project.id, require_epic_on_close=True)).status_code == 200
    r = await client.patch(f"/api/issues/{test_issue.id}", headers=auth_headers, json={"status": "done"})
    assert r.status_code == 400, r.text
    assert "epic" in r.json()["detail"]


@pytest.mark.asyncio
async def test_auto_transition_is_never_refused_by_the_new_gates(test_project, test_issue, test_user, db):
    """A cleared intent's auto-transition (skip_ritual_check) cannot be
    answered if refused, so the assignee and epic gates do not refuse it
    (PR #462 review 2)."""
    from app.oxyde_models.project import OxydeProject
    from app.schemas.issue import IssueUpdate
    from app.services.issue_service import IssueService
    from app.enums import IssueStatus

    await OxydeProject.objects.filter(id=test_project.id).update(
        require_assignee_on_claim=True, require_epic_on_close=True,
    )
    svc = IssueService()
    issue = await svc.get_by_id(test_issue.id)
    claimed = await svc.update(
        issue, IssueUpdate(status=IssueStatus.IN_PROGRESS), test_user.id,
        is_human_request=False, skip_ritual_check=True,
    )
    assert claimed.status == IssueStatus.IN_PROGRESS
    closed = await svc.update(
        claimed, IssueUpdate(status=IssueStatus.DONE), test_user.id,
        is_human_request=False, skip_ritual_check=True,
    )
    assert closed.status == IssueStatus.DONE


@pytest.mark.asyncio
async def test_detach_and_close_logs_one_parent_activity(client, auth_headers, test_project, db):
    epic = await _create(client, auth_headers, test_project.id, title="Goal", issue_type="epic")
    other = await _create(client, auth_headers, test_project.id, title="Other", issue_type="epic")
    child = await _create(client, auth_headers, test_project.id, parent_id=other["id"])
    r = await _set(client, auth_headers, test_project.id, default_epic_id=epic["id"], require_epic_on_close=True)
    assert r.status_code == 200, r.text
    r = await client.patch(
        f"/api/issues/{child['id']}", headers=auth_headers, json={"status": "done", "parent_id": None},
    )
    assert r.status_code == 200, r.text
    assert r.json()["parent_id"] == epic["id"]
    acts = (await client.get(f"/api/issues/{child['id']}/activities", headers=auth_headers)).json()
    parent_rows = [a for a in acts if a.get("field_name") == "parent_id"]
    assert len(parent_rows) == 1
    assert parent_rows[0]["old_value"] == other["id"]
    assert parent_rows[0]["new_value"] == epic["id"]


@pytest.mark.asyncio
async def test_explicit_null_on_a_bool_knob_is_ignored(client, auth_headers, test_project, db):
    r = await _set(client, auth_headers, test_project.id, require_epic_on_close=None, require_assignee_on_claim=None)
    assert r.status_code == 200, r.text
    assert r.json()["require_epic_on_close"] is False
