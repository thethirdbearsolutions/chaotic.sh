"""CHT-1721: completing limbo and activating the next sprint is one step.

complete_limbo used to commit the old sprint as COMPLETED and only then
activate the next one. Every caller that reaches it from an attestation
logs and swallows an error, so a failed activation left the project
with no ACTIVE sprint: the arrears gate and the budget charge both
return early without one, so every close was free and unrecorded until
something created a fresh sprint.

These tests make the activation fail and check that the rotation rolls
back as a whole: the project keeps its active (limbo) sprint, the
failure is retried by the next limbo check, and a close after that is
charged to the new active sprint.
"""
import logging

import pytest

from app.enums import IssueStatus, SprintStatus
from app.oxyde_models.issue import OxydeBudgetTransaction, OxydeIssue
from app.oxyde_models.sprint import OxydeSprint
from app.schemas.issue import IssueUpdate
from app.services.issue_service import IssueService
from app.services.ritual_service import RitualService
from app.services.sprint_service import SprintService


class ActivationFailed(RuntimeError):
    pass


async def _limbo_and_next(project, budget=10):
    limbo = await OxydeSprint.objects.create(
        project_id=project.id, name="Limbo", status=SprintStatus.ACTIVE,
        limbo=True, budget=budget, points_spent=budget + 1,
    )
    planned = await OxydeSprint.objects.create(
        project_id=project.id, name="Next", status=SprintStatus.PLANNED,
        budget=budget,
    )
    return limbo, planned


def _fail_after_activating(monkeypatch):
    """Make _activate_next_sprint fail after its first write, the worst
    place: the next sprint is already marked ACTIVE in this transaction."""
    real = SprintService._activate_next_sprint

    async def failing(self, next_sprint):
        next_sprint.status = SprintStatus.ACTIVE
        await next_sprint.save(update_fields={"status"})
        raise ActivationFailed("injected")

    monkeypatch.setattr(SprintService, "_activate_next_sprint", failing)
    return real


async def _sprints(project):
    rows = await OxydeSprint.objects.filter(project_id=project.id).all()
    return {s.name: s for s in rows}


async def _active(project):
    return await OxydeSprint.objects.filter(
        project_id=project.id, status=SprintStatus.ACTIVE,
    ).all()


@pytest.mark.asyncio
async def test_failed_activation_rolls_the_rotation_back(db, test_project, monkeypatch):
    limbo, planned = await _limbo_and_next(test_project)
    _fail_after_activating(monkeypatch)

    with pytest.raises(ActivationFailed):
        await SprintService().complete_limbo(limbo)

    sprints = await _sprints(test_project)
    assert sprints["Limbo"].status == SprintStatus.ACTIVE
    assert sprints["Limbo"].limbo is True
    assert sprints["Limbo"].closed_at is None
    assert sprints["Next"].status == SprintStatus.PLANNED
    assert [s.id for s in await _active(test_project)] == [limbo.id]


@pytest.mark.asyncio
async def test_swallowing_caller_leaves_an_active_sprint_and_the_retry_rotates(
    db, test_project, test_user, monkeypatch,
):
    """The path that used to strand the project: check_limbo's self-heal
    (like the attest paths) catches the failure. The project must still
    have an active sprint, the next check must finish the rotation, and a
    close afterwards must be charged."""
    limbo, planned = await _limbo_and_next(test_project)
    real = _fail_after_activating(monkeypatch)

    in_limbo, sprint, pending = await RitualService().check_limbo(test_project.id)
    assert in_limbo is True and sprint.id == limbo.id and pending == []
    assert [s.id for s in await _active(test_project)] == [limbo.id]

    # The fault clears; the next limbo check retries and rotates.
    monkeypatch.setattr(SprintService, "_activate_next_sprint", real)
    in_limbo, _, _ = await RitualService().check_limbo(test_project.id)
    assert in_limbo is False

    sprints = await _sprints(test_project)
    assert sprints["Limbo"].status == SprintStatus.COMPLETED
    assert sprints["Limbo"].closed_at is not None
    assert [s.id for s in await _active(test_project)] == [planned.id]

    issue = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier=f"{test_project.key}-1",
        number=1, title="after the rotation", estimate=2, creator_id=test_user.id,
    )
    await IssueService().update(
        issue, IssueUpdate(status=IssueStatus.DONE), test_user.id, is_human_request=True,
    )

    charged = await OxydeSprint.objects.get(id=planned.id)
    assert charged.points_spent == 2
    txns = await OxydeBudgetTransaction.objects.filter(issue_id=issue.id).all()
    assert [t.sprint_id for t in txns] == [planned.id]


@pytest.mark.asyncio
async def test_missing_planned_sprint_is_created_not_skipped(db, test_project):
    """With no planned sprint (deleted while the current one sat in
    limbo), completing limbo used to complete the sprint and activate
    nothing. It now creates the next sprint and activates it."""
    limbo = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Limbo", status=SprintStatus.ACTIVE,
        limbo=True, budget=10,
    )

    await SprintService().complete_limbo(limbo)

    active = await _active(test_project)
    assert len(active) == 1 and active[0].id != limbo.id
    planned = await OxydeSprint.objects.filter(
        project_id=test_project.id, status=SprintStatus.PLANNED,
    ).all()
    assert len(planned) == 1


@pytest.mark.asyncio
async def test_close_with_no_active_sprint_is_logged(db, test_project, test_user, caplog):
    """If a project with sprints ever has none active, a close is not
    charged; that must not pass silently."""
    await OxydeSprint.objects.create(
        project_id=test_project.id, name="Done", status=SprintStatus.COMPLETED, budget=5,
    )
    issue = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier=f"{test_project.key}-2",
        number=2, title="orphan close", estimate=1, creator_id=test_user.id,
    )

    with caplog.at_level(logging.WARNING, logger="app.services.issue_service"):
        await IssueService()._deduct_from_sprint_budget(issue, test_user.id)

    assert any("no active one" in r.getMessage() for r in caplog.records)
    assert await OxydeBudgetTransaction.objects.filter(issue_id=issue.id).count() == 0


@pytest.mark.asyncio
async def test_project_without_sprints_closes_quietly(db, test_project, test_user, caplog):
    issue = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier=f"{test_project.key}-3",
        number=3, title="no sprints at all", estimate=1, creator_id=test_user.id,
    )
    with caplog.at_level(logging.WARNING, logger="app.services.issue_service"):
        await IssueService()._deduct_from_sprint_budget(issue, test_user.id)
    assert not any("no active one" in r.getMessage() for r in caplog.records)
