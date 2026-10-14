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


@pytest.mark.asyncio
async def test_rename_only_patch_does_not_pin_budget(client, auth_headers, test_project):
    """Only a PATCH that carries `budget` marks it set by hand."""
    await _set_default(client, auth_headers, test_project.id, 24)
    _, planned = await SprintService().ensure_sprints_exist(test_project.id)

    resp = await client.patch(f"/api/sprints/{planned.id}", headers=auth_headers, json={"name": "Renamed"})
    assert resp.status_code == 200
    await planned.refresh()
    assert planned.budget_explicit is False

    await _set_default(client, auth_headers, test_project.id, 32)
    await planned.refresh()
    assert planned.budget == 32


@pytest.mark.asyncio
async def test_null_default_carries_hand_set_budget_forward(client, auth_headers, test_project):
    """With no project default, the budget of the sprint being activated
    carries to the new planned sprint, so rotation cannot silently switch
    arrears off (PR #384 review M1). The carried budget still follows a
    default set later (re-review R1)."""
    current, planned = await SprintService().ensure_sprints_exist(test_project.id)
    assert planned.budget is None

    resp = await client.patch(f"/api/sprints/{planned.id}", headers=auth_headers, json={"budget": 15})
    assert resp.status_code == 200
    assert resp.json()["budget_explicit"] is True
    await _close(client, auth_headers, current.id)

    active, new_planned = await _sprints(test_project.id)
    assert active.id == planned.id and active.budget == 15
    assert new_planned.budget == 15
    assert new_planned.budget_explicit is False

    # It keeps carrying on later rotations while the default stays null:
    # activation under a null default does not overwrite it.
    await _close(client, auth_headers, active.id)
    second_active, after = await _sprints(test_project.id)
    assert second_active.id == new_planned.id and second_active.budget == 15
    assert after.budget == 15

    # A default set later reaches the carried budget.
    await _set_default(client, auth_headers, test_project.id, 40)
    await after.refresh()
    assert after.budget == 40


@pytest.mark.asyncio
async def test_carried_budget_takes_default_set_at_activation(client, auth_headers, test_project):
    """Unlimited -> default: a carried budget is not hand-set, so a default
    set without propagation (here written straight to the row) still wins
    when the sprint activates (re-review R1)."""
    current, planned = await SprintService().ensure_sprints_exist(test_project.id)
    resp = await client.patch(f"/api/sprints/{planned.id}", headers=auth_headers, json={"budget": 15})
    assert resp.status_code == 200
    await _close(client, auth_headers, current.id)
    active, carried = await _sprints(test_project.id)
    assert carried.budget == 15 and carried.budget_explicit is False

    test_project.default_sprint_budget = 30
    await test_project.save(update_fields={"default_sprint_budget"})
    await _close(client, auth_headers, active.id)

    now_active, new_planned = await _sprints(test_project.id)
    assert now_active.id == carried.id
    assert now_active.budget == 30
    assert new_planned.budget == 30


@pytest.mark.asyncio
async def test_null_default_without_hand_set_budget_stays_unlimited(test_project):
    """The carry-forward applies to hand-set budgets only."""
    current, planned = await SprintService().ensure_sprints_exist(test_project.id)
    await SprintService().close_sprint(current)
    _, new_planned = await _sprints(test_project.id)
    assert new_planned.budget is None
    assert new_planned.budget_explicit is False


@pytest.mark.asyncio
async def test_activation_does_not_overwrite_budget_set_after_read(test_project):
    """The activation write is conditional on the row: a budget set by
    hand after the caller read the planned sprint survives (review M3)."""
    test_project.default_sprint_budget = 24
    await test_project.save(update_fields={"default_sprint_budget"})
    _, planned = await SprintService().ensure_sprints_exist(test_project.id)
    stale = await OxydeSprint.objects.get(id=planned.id)
    assert stale.budget_explicit is False

    # A PATCH lands between the read and the activation.
    from app.schemas.sprint import SprintUpdate
    await SprintService().update(planned, SprintUpdate(budget=50))

    await SprintService()._activate_next_sprint(stale)

    fresh = await OxydeSprint.objects.get(id=planned.id)
    assert fresh.status == SprintStatus.ACTIVE
    assert fresh.budget == 50
    assert fresh.budget_explicit is True


@pytest.mark.asyncio
async def test_default_change_during_limbo(client, auth_headers, test_project):
    """Close into limbo, change the default, complete limbo: the limbo
    sprint keeps its budget and Next opens at the new default (review L4)."""
    from app.enums import RitualTrigger
    from app.oxyde_models.ritual import OxydeRitual

    await _set_default(client, auth_headers, test_project.id, 24)
    current, planned = await SprintService().ensure_sprints_exist(test_project.id)
    await OxydeRitual.objects.create(
        project_id=test_project.id,
        name="Sprint Ritual",
        prompt="Attest something",
        trigger=RitualTrigger.EVERY_SPRINT,
    )

    closed = await SprintService().close_sprint(current)
    assert closed.limbo is True

    await _set_default(client, auth_headers, test_project.id, 32)
    await current.refresh()
    assert current.budget == 24, "a sprint in limbo is still active; its budget is not touched"

    await SprintService().complete_limbo(current)

    await current.refresh()
    assert current.status == SprintStatus.COMPLETED and current.budget == 24
    active, new_planned = await _sprints(test_project.id)
    assert active.id == planned.id
    assert active.budget == 32
    assert new_planned.budget == 32


async def _carried_under_null_default(client, auth_headers, project_id):
    """Rotate once under a null default so the planned sprint holds a
    carried (not hand-set) budget of 15."""
    current, planned = await SprintService().ensure_sprints_exist(project_id)
    resp = await client.patch(f"/api/sprints/{planned.id}", headers=auth_headers, json={"budget": 15})
    assert resp.status_code == 200
    await _close(client, auth_headers, current.id)
    _, carried = await _sprints(project_id)
    assert carried.budget == 15 and carried.budget_explicit is False
    return carried


@pytest.mark.asyncio
async def test_rules_save_resending_null_default_keeps_carried_budget(client, auth_headers, test_project):
    """The web Rules save sends every setting, default_sprint_budget
    included, even when unchanged. A resent null is not a change of
    default and must not wipe a carried budget (re-review R3)."""
    carried = await _carried_under_null_default(client, auth_headers, test_project.id)

    resp = await client.patch(
        f"/api/projects/{test_project.id}",
        headers=auth_headers,
        json={
            "require_estimate_on_claim": True,
            "unestimated_handling": "default_one_point",
            "default_sprint_budget": None,
        },
    )
    assert resp.status_code == 200, resp.text
    await carried.refresh()
    assert carried.budget == 15


@pytest.mark.asyncio
async def test_modal_default_option_with_empty_budget_keeps_carried_budget(client, auth_headers, test_project):
    """The Edit Sprint modal's "Also set as project default" with an empty
    budget sends only default_sprint_budget: null. With the default already
    null that changes nothing (re-review R3)."""
    carried = await _carried_under_null_default(client, auth_headers, test_project.id)

    await _set_default(client, auth_headers, test_project.id, None)
    await carried.refresh()
    assert carried.budget == 15


@pytest.mark.asyncio
async def test_resending_same_default_does_not_reset_planned(client, auth_headers, test_project):
    """The same holds for a non-null default resent unchanged."""
    await _set_default(client, auth_headers, test_project.id, 24)
    _, planned = await SprintService().ensure_sprints_exist(test_project.id)
    await planned.refresh()
    planned.budget = 7  # e.g. a stale value from a path that did not propagate
    await planned.save(update_fields={"budget"})

    await _set_default(client, auth_headers, test_project.id, 24)
    await planned.refresh()
    assert planned.budget == 7


# --- CHT-1701: broadcasts on a change of default, and the way back ---------


def _capture_sends():
    """Patch the websocket manager and collect every message it sends."""
    from unittest.mock import patch
    from app.websocket import manager

    sent = []

    async def send(team_id, message):
        sent.append((team_id, message))

    return sent, patch.object(manager, "_send_to_team", side_effect=send)


def _sprint_updates(sent, sprint_id):
    return [
        m for _, m in sent
        if m["entity"] == "sprint" and m["type"] == "updated" and m["data"]["id"] == sprint_id
    ]


@pytest.mark.asyncio
async def test_default_change_bumps_updated_at_and_broadcasts(client, auth_headers, test_project):
    """L2: a planned sprint the new default changes is announced, with a
    new updated_at; the active sprint, untouched, is not."""
    await _set_default(client, auth_headers, test_project.id, 24)
    current, planned = await SprintService().ensure_sprints_exist(test_project.id)
    before = planned.updated_at

    sent, patcher = _capture_sends()
    with patcher:
        await _set_default(client, auth_headers, test_project.id, 32)

    updates = _sprint_updates(sent, planned.id)
    assert len(updates) == 1
    assert updates[0]["data"]["budget"] == 32
    assert updates[0]["data"]["budget_explicit"] is False
    assert _sprint_updates(sent, current.id) == []
    assert all(team == test_project.team_id for team, _ in sent)
    await planned.refresh()
    assert planned.updated_at > before


@pytest.mark.asyncio
async def test_default_change_skips_hand_set_and_unchanged_sprints(client, auth_headers, test_project):
    """A hand-set planned sprint is not changed, so it is not announced."""
    await _set_default(client, auth_headers, test_project.id, 24)
    _, planned = await SprintService().ensure_sprints_exist(test_project.id)
    resp = await client.patch(f"/api/sprints/{planned.id}", headers=auth_headers, json={"budget": 7})
    assert resp.status_code == 200
    stamped = (await OxydeSprint.objects.get(id=planned.id)).updated_at

    sent, patcher = _capture_sends()
    with patcher:
        await _set_default(client, auth_headers, test_project.id, 32)

    assert _sprint_updates(sent, planned.id) == []
    await planned.refresh()
    assert planned.budget == 7 and planned.updated_at == stamped


@pytest.mark.asyncio
async def test_follows_default_resets_hand_set_planned_sprint(client, auth_headers, test_project):
    """L3: PATCH budget_follows_default=true clears the hand-set flag and
    gives the sprint the current default; later defaults reach it again."""
    await _set_default(client, auth_headers, test_project.id, 24)
    _, planned = await SprintService().ensure_sprints_exist(test_project.id)
    resp = await client.patch(f"/api/sprints/{planned.id}", headers=auth_headers, json={"budget": 7})
    assert resp.json()["budget_explicit"] is True
    hand_set_at = resp.json()["updated_at"]

    sent, patcher = _capture_sends()
    with patcher:
        resp = await client.patch(
            f"/api/sprints/{planned.id}", headers=auth_headers,
            json={"budget_follows_default": True},
        )
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["budget"] == 24 and body["budget_explicit"] is False
    assert body["updated_at"] > hand_set_at
    assert len(_sprint_updates(sent, planned.id)) == 1

    await _set_default(client, auth_headers, test_project.id, 40)
    await planned.refresh()
    assert planned.budget == 40


@pytest.mark.asyncio
async def test_follows_default_under_unlimited_default_clears_budget(client, auth_headers, test_project):
    """With no default (unlimited), following it means no budget."""
    await _set_default(client, auth_headers, test_project.id, None)
    _, planned = await SprintService().ensure_sprints_exist(test_project.id)
    await client.patch(f"/api/sprints/{planned.id}", headers=auth_headers, json={"budget": 7})

    resp = await client.patch(
        f"/api/sprints/{planned.id}", headers=auth_headers,
        json={"budget_follows_default": True},
    )
    assert resp.status_code == 200, resp.text
    assert resp.json()["budget"] is None and resp.json()["budget_explicit"] is False


@pytest.mark.asyncio
async def test_follows_default_with_budget_is_rejected(client, auth_headers, test_project):
    _, planned = await SprintService().ensure_sprints_exist(test_project.id)
    for budget in (7, None):
        resp = await client.patch(
            f"/api/sprints/{planned.id}", headers=auth_headers,
            json={"budget": budget, "budget_follows_default": True},
        )
        assert resp.status_code == 422
        assert "not both" in resp.text


@pytest.mark.asyncio
async def test_follows_default_false_is_rejected(client, auth_headers, test_project):
    _, planned = await SprintService().ensure_sprints_exist(test_project.id)
    resp = await client.patch(
        f"/api/sprints/{planned.id}", headers=auth_headers,
        json={"budget_follows_default": False},
    )
    assert resp.status_code == 422
    assert "only accepts true" in resp.text


@pytest.mark.asyncio
async def test_follows_default_null_means_not_set(client, auth_headers, test_project):
    """A client that sends every field, null for unset, can still PATCH a
    budget (PR #391 self-review R1)."""
    _, planned = await SprintService().ensure_sprints_exist(test_project.id)
    resp = await client.patch(
        f"/api/sprints/{planned.id}", headers=auth_headers,
        json={"budget": 7, "budget_follows_default": None},
    )
    assert resp.status_code == 200, resp.text
    assert resp.json()["budget"] == 7 and resp.json()["budget_explicit"] is True


@pytest.mark.asyncio
async def test_follows_default_refused_for_active_sprint(client, auth_headers, test_project):
    await _set_default(client, auth_headers, test_project.id, 24)
    current, _ = await SprintService().ensure_sprints_exist(test_project.id)
    await client.patch(f"/api/sprints/{current.id}", headers=auth_headers, json={"budget": 7})

    resp = await client.patch(
        f"/api/sprints/{current.id}", headers=auth_headers,
        json={"budget_follows_default": True},
    )
    assert resp.status_code == 400
    assert "Only a planned sprint" in resp.json()["detail"]
    await current.refresh()
    assert current.budget == 7 and current.budget_explicit is True


@pytest.mark.asyncio
async def test_template_default_change_broadcasts(client, auth_headers, test_project):
    """The other caller of adopt_default_budget (template apply) runs in a
    transaction; the broadcast still goes out once it commits."""
    await _set_default(client, auth_headers, test_project.id, 24)
    _, planned = await SprintService().ensure_sprints_exist(test_project.id)
    from app.db.transactions import atomic
    from app.oxyde_models.project import OxydeProject

    sent, patcher = _capture_sends()
    with patcher:
        async with atomic():
            project = await OxydeProject.objects.get(id=test_project.id)
            project.default_sprint_budget = 50
            await project.save(update_fields={"default_sprint_budget"})
            await SprintService().adopt_default_budget(test_project.id)
            assert sent == [], "nothing is announced before the commit"
    assert [m["data"]["budget"] for m in _sprint_updates(sent, planned.id)] == [50]


@pytest.mark.asyncio
async def test_follows_default_write_is_conditional_on_planned(client, auth_headers, test_project):
    """PR #391 review L3: a sprint activated after it was read (and after
    the route's status check) keeps its budget; the reset is refused."""
    from app.schemas.sprint import SprintUpdate
    from app.services.sprint_service import SprintNotPlannedError

    await _set_default(client, auth_headers, test_project.id, 24)
    current, planned = await SprintService().ensure_sprints_exist(test_project.id)
    await client.patch(f"/api/sprints/{planned.id}", headers=auth_headers, json={"budget": 7})
    stale = await OxydeSprint.objects.get(id=planned.id)
    assert stale.status == SprintStatus.PLANNED

    await _close(client, auth_headers, current.id)  # activates `planned`

    with pytest.raises(SprintNotPlannedError):
        await SprintService().update(stale, SprintUpdate(budget_follows_default=True))
    fresh = await OxydeSprint.objects.get(id=planned.id)
    assert fresh.status == SprintStatus.ACTIVE
    assert fresh.budget == 7 and fresh.budget_explicit is True


@pytest.mark.asyncio
async def test_follows_default_race_is_a_400_from_the_route(client, auth_headers, test_project, monkeypatch):
    """The route turns a lost race into the same 400 as its own check."""
    from app.services.sprint_service import SprintNotPlannedError

    _, planned = await SprintService().ensure_sprints_exist(test_project.id)

    async def lose(self, sprint, sprint_in):
        raise SprintNotPlannedError("Only a planned sprint can follow the project default budget")

    monkeypatch.setattr(SprintService, "update", lose)
    resp = await client.patch(
        f"/api/sprints/{planned.id}", headers=auth_headers,
        json={"budget_follows_default": True},
    )
    assert resp.status_code == 400
    assert "Only a planned sprint" in resp.json()["detail"]
