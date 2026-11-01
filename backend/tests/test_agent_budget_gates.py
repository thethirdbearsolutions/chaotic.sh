"""An agent cannot loosen the sprint budget that arrears enforces
(CHT-1924): raise or clear an open sprint's budget, point a planned
sprint at a looser default, raise or clear the project default (directly
or through a template), or move a sprint's status by hand."""
from datetime import datetime, timezone

import pytest

from app.enums import SprintStatus
from app.oxyde_models.sprint import OxydeSprint


async def _sprint(project_id, status=SprintStatus.ACTIVE, budget=10, name="S"):
    return await OxydeSprint.objects.create(
        project_id=project_id, name=name, status=status, budget=budget, budget_explicit=True,
        activated_at=datetime.now(timezone.utc) if status == SprintStatus.ACTIVE else None,
    )


async def _patch_sprint(client, headers, sprint_id, **body):
    return await client.patch(f"/api/sprints/{sprint_id}", headers=headers, json=body)


@pytest.mark.asyncio
@pytest.mark.parametrize("status", [SprintStatus.ACTIVE, SprintStatus.PLANNED])
@pytest.mark.parametrize("budget", [11, None])
async def test_agent_cannot_raise_or_clear_an_open_sprints_budget(client, agent_headers, test_project, status, budget, db):
    sprint = await _sprint(test_project.id, status=status)
    r = await _patch_sprint(client, agent_headers, sprint.id, budget=budget)
    assert r.status_code == 403, r.text
    await sprint.refresh()
    assert sprint.budget == 10


@pytest.mark.asyncio
async def test_agent_can_lower_a_budget_and_rename(client, agent_headers, test_project, db):
    sprint = await _sprint(test_project.id)
    r = await _patch_sprint(client, agent_headers, sprint.id, budget=8, name="Renamed")
    assert r.status_code == 200, r.text
    assert (r.json()["budget"], r.json()["name"]) == (8, "Renamed")


@pytest.mark.asyncio
async def test_agent_can_set_a_budget_where_there_was_none(client, agent_headers, test_project, db):
    sprint = await _sprint(test_project.id, budget=None)
    r = await _patch_sprint(client, agent_headers, sprint.id, budget=5)
    assert r.status_code == 200, r.text


@pytest.mark.asyncio
async def test_a_person_can_raise_a_budget(client, auth_headers, test_project, db):
    sprint = await _sprint(test_project.id)
    r = await _patch_sprint(client, auth_headers, sprint.id, budget=50)
    assert r.status_code == 200, r.text


@pytest.mark.asyncio
async def test_a_closed_sprint_is_not_guarded(client, agent_headers, test_project, db):
    sprint = await _sprint(test_project.id, status=SprintStatus.COMPLETED)
    r = await _patch_sprint(client, agent_headers, sprint.id, budget=50)
    assert r.status_code == 200, r.text


@pytest.mark.asyncio
@pytest.mark.parametrize("to", ["completed", "planned"])
async def test_agent_cannot_move_a_sprints_status_by_hand(client, agent_headers, test_project, to, db):
    sprint = await _sprint(test_project.id)
    r = await _patch_sprint(client, agent_headers, sprint.id, status=to)
    assert r.status_code == 403, r.text
    await sprint.refresh()
    assert sprint.status == SprintStatus.ACTIVE


@pytest.mark.asyncio
async def test_agent_may_resend_the_same_status(client, agent_headers, test_project, db):
    sprint = await _sprint(test_project.id)
    r = await _patch_sprint(client, agent_headers, sprint.id, status="active", name="Same")
    assert r.status_code == 200, r.text


@pytest.mark.asyncio
@pytest.mark.parametrize("default", [20, None])
async def test_agent_cannot_point_a_planned_sprint_at_a_looser_default(client, auth_headers, agent_headers, test_project, default, db):
    r = await client.patch(f"/api/projects/{test_project.id}", headers=auth_headers,
                           json={"default_sprint_budget": default})
    assert r.status_code == 200, r.text
    sprint = await _sprint(test_project.id, status=SprintStatus.PLANNED)
    r = await _patch_sprint(client, agent_headers, sprint.id, budget_follows_default=True)
    assert r.status_code == 403, r.text


@pytest.mark.asyncio
async def test_agent_can_point_a_planned_sprint_at_a_tighter_default(client, auth_headers, agent_headers, test_project, db):
    r = await client.patch(f"/api/projects/{test_project.id}", headers=auth_headers,
                           json={"default_sprint_budget": 5})
    assert r.status_code == 200, r.text
    sprint = await _sprint(test_project.id, status=SprintStatus.PLANNED)
    r = await _patch_sprint(client, agent_headers, sprint.id, budget_follows_default=True)
    assert r.status_code == 200, r.text
    assert r.json()["budget"] == 5


@pytest.mark.asyncio
@pytest.mark.parametrize("new", [20, None])
async def test_agent_cannot_loosen_the_project_default(client, auth_headers, agent_headers, test_project, new, db):
    assert (await client.patch(f"/api/projects/{test_project.id}", headers=auth_headers,
                               json={"default_sprint_budget": 10})).status_code == 200
    r = await client.patch(f"/api/projects/{test_project.id}", headers=agent_headers,
                           json={"default_sprint_budget": new})
    assert r.status_code == 403, r.text
    assert "default_sprint_budget" in r.json()["detail"]
    r = await client.patch(f"/api/projects/{test_project.id}", headers=agent_headers,
                           json={"default_sprint_budget": 8})
    assert r.status_code == 200, r.text


@pytest.mark.asyncio
async def test_agent_cannot_loosen_the_default_through_a_template(client, auth_headers, agent_headers, test_project, test_team, db):
    assert (await client.patch(f"/api/projects/{test_project.id}", headers=auth_headers,
                               json={"default_sprint_budget": 10})).status_code == 200
    r = await client.post(
        f"/api/teams/{test_team.id}/templates", headers=auth_headers,
        json={"name": "big", "body": {"version": 1, "sections": {"settings": {"default_sprint_budget": None}}}},
    )
    assert r.status_code in (200, 201), r.text
    r = await client.post(f"/api/templates/{r.json()['id']}/apply", headers=agent_headers,
                          json={"project_id": test_project.id})
    assert r.status_code == 403, r.text
    assert "default_sprint_budget" in r.json()["detail"]
