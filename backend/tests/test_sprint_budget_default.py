"""A changed default_sprint_budget reaches the sprints rotation opens (CHT-1495).

The rule: a PLANNED sprint's budget follows the project's
default_sprint_budget until someone sets it by hand. It is re-read when
the default changes and again when the sprint activates. A budget set by
hand (PATCH /sprints/{id}) is kept. ACTIVE and COMPLETED sprints are
never changed by a change of default.

Before the fix, rotation created each new planned sprint at the budget of
the sprint it was activating, and a planned sprint kept the default it
was created with, so CZY's sprints kept opening at 24 after the default
became 32.
"""
import pytest

from app.enums import SprintStatus
from app.oxyde_models.sprint import OxydeSprint
from app.services.sprint_service import SprintService


async def _set_default(client, auth_headers, project_id, budget):
    resp = await client.patch(
        f"/api/projects/{project_id}",
        headers=auth_headers,
        json={"default_sprint_budget": budget},
    )
    assert resp.status_code == 200, resp.text
    assert resp.json()["default_sprint_budget"] == budget


async def _close(client, auth_headers, sprint_id):
    resp = await client.post(f"/api/sprints/{sprint_id}/close", headers=auth_headers)
    assert resp.status_code == 200, resp.text
    assert resp.json()["status"] == "completed"


async def _sprints(project_id):
    service = SprintService()
    return (
        await service.get_current_sprint(project_id),
        await service.get_next_sprint(project_id),
    )


@pytest.mark.asyncio
async def test_rotation_after_default_change_uses_new_default(client, auth_headers, test_project):
    """The ticket's acceptance: change the default, close, and both the
    sprint that activates and the planned one created after it carry the
    new default. Fails on main: both stay at 24."""
    await _set_default(client, auth_headers, test_project.id, 24)
    current, planned = await SprintService().ensure_sprints_exist(test_project.id)
    assert current.budget == 24 and planned.budget == 24

    await _set_default(client, auth_headers, test_project.id, 32)
    await _close(client, auth_headers, current.id)

    active, new_planned = await _sprints(test_project.id)
    assert active.id == planned.id
    assert active.budget == 32
    assert new_planned.budget == 32


@pytest.mark.asyncio
async def test_planned_sprint_shows_new_default_immediately(client, auth_headers, test_project):
    """A planned sprint shows the budget it will open with as soon as the
    default changes; the active sprint keeps the budget it opened with."""
    await _set_default(client, auth_headers, test_project.id, 24)
    current, planned = await SprintService().ensure_sprints_exist(test_project.id)

    await _set_default(client, auth_headers, test_project.id, 32)

    await planned.refresh()
    await current.refresh()
    assert planned.budget == 32
    assert current.budget == 24, "an active sprint's budget only changes by hand"


@pytest.mark.asyncio
async def test_new_planned_sprint_does_not_copy_hand_set_active_budget(client, auth_headers, test_project):
    """The repro from the ticket: a budget set by hand on the sprint being
    activated is not copied into the planned sprint created behind it."""
    await _set_default(client, auth_headers, test_project.id, 10)
    current, planned = await SprintService().ensure_sprints_exist(test_project.id)

    resp = await client.patch(f"/api/sprints/{planned.id}", headers=auth_headers, json={"budget": 20})
    assert resp.status_code == 200
    await _set_default(client, auth_headers, test_project.id, 30)
    await _close(client, auth_headers, current.id)

    active, new_planned = await _sprints(test_project.id)
    assert active.id == planned.id
    assert active.budget == 20, "a budget set by hand survives activation"
    assert new_planned.budget == 30


@pytest.mark.asyncio
async def test_hand_set_planned_budget_survives_default_change(client, auth_headers, test_project):
    """Setting a planned sprint's budget by hand, including to null
    (unlimited), takes it out of the default's reach."""
    await _set_default(client, auth_headers, test_project.id, 24)
    _, planned = await SprintService().ensure_sprints_exist(test_project.id)

    resp = await client.patch(f"/api/sprints/{planned.id}", headers=auth_headers, json={"budget": None})
    assert resp.status_code == 200
    assert resp.json()["budget"] is None

    await _set_default(client, auth_headers, test_project.id, 32)
    await planned.refresh()
    assert planned.budget is None
    assert planned.budget_explicit is True


@pytest.mark.asyncio
async def test_activation_reads_default_even_without_propagation(test_project):
    """Activation is the authoritative read: a planned sprint left at a
    stale value (a default changed by a path that did not propagate, or a
    row from before this column existed) still opens at the current
    default."""
    active = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Sprint 1", status=SprintStatus.ACTIVE, budget=24,
    )
    planned = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Sprint 2", status=SprintStatus.PLANNED, budget=24,
    )
    test_project.default_sprint_budget = 32
    await test_project.save(update_fields={"default_sprint_budget"})

    await SprintService().close_sprint(active)

    await planned.refresh()
    await active.refresh()
    assert planned.status == SprintStatus.ACTIVE
    assert planned.budget == 32
    assert active.budget == 24, "a closed sprint is never changed"
    _, new_planned = await _sprints(test_project.id)
    assert new_planned.budget == 32


@pytest.mark.asyncio
async def test_default_cleared_to_unlimited_reaches_planned(client, auth_headers, test_project):
    """Clearing the default (null = unlimited) is a change of default too."""
    await _set_default(client, auth_headers, test_project.id, 24)
    current, planned = await SprintService().ensure_sprints_exist(test_project.id)

    await _set_default(client, auth_headers, test_project.id, None)
    await planned.refresh()
    assert planned.budget is None

    await _close(client, auth_headers, current.id)
    active, new_planned = await _sprints(test_project.id)
    assert active.budget is None and new_planned.budget is None


@pytest.mark.asyncio
async def test_unrelated_project_update_leaves_planned_budget(client, auth_headers, test_project):
    """Only a change to default_sprint_budget re-reads it."""
    _, planned = await SprintService().ensure_sprints_exist(test_project.id)
    await planned.refresh()
    planned.budget = 7
    await planned.save(update_fields={"budget"})

    resp = await client.patch(
        f"/api/projects/{test_project.id}", headers=auth_headers, json={"description": "x"},
    )
    assert resp.status_code == 200
    await planned.refresh()
    assert planned.budget == 7


@pytest.mark.asyncio
async def test_template_apply_default_reaches_planned(db, test_team, test_project):
    """Applying a template that sets default_sprint_budget re-reads it too."""
    from app.schemas.template import TemplateBody, TemplateCreate
    from app.services.template_service import TemplateService

    test_project.default_sprint_budget = 24
    await test_project.save(update_fields={"default_sprint_budget"})
    _, planned = await SprintService().ensure_sprints_exist(test_project.id)
    assert planned.budget == 24

    template = await TemplateService().create(
        TemplateCreate(
            name="budget",
            body=TemplateBody(version=1, sections={"settings": {"default_sprint_budget": 40}}),
        ),
        test_team.id,
    )
    await TemplateService().apply(template, test_project)

    await planned.refresh()
    assert planned.budget == 40
