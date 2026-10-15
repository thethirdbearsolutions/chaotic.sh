"""CHT-1721: completing limbo and activating the next sprint is one step.

complete_limbo used to commit the old sprint as COMPLETED and only then
activate the next one. Most callers (attest, gate completion and
check_limbo's self-heal; approve() is the exception and propagates) log
and swallow an error, so a failed activation left the project with no
ACTIVE sprint: the arrears gate and the budget charge both return early
without one, so every close was free and unrecorded until something
created a fresh sprint.

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
@pytest.mark.parametrize("default_budget, expected", [(25, 25), (None, 10)])
async def test_missing_planned_sprint_is_created_not_skipped(
    db, test_project, default_budget, expected,
):
    """With no planned sprint (deleted while the current one sat in
    limbo), completing limbo used to complete the sprint and activate
    nothing. It now creates the next sprint and activates it, at the
    project default, or, with a null default, at the closing sprint's
    budget (the CHT-1495 carry-forward; PR #404 review L2), never
    unlimited."""
    test_project.default_sprint_budget = default_budget
    await test_project.save(update_fields={"default_sprint_budget"})
    limbo = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Limbo", status=SprintStatus.ACTIVE,
        limbo=True, budget=10,
    )

    await SprintService().complete_limbo(limbo)

    sprints = await _sprints(test_project)
    assert sprints["Limbo"].status == SprintStatus.COMPLETED
    assert sprints["Limbo"].closed_at is not None
    assert sprints["Sprint 1"].status == SprintStatus.ACTIVE
    assert sprints["Sprint 1"].budget == expected
    assert sprints["Sprint 1"].budget_explicit is False
    assert sprints["Sprint 2"].status == SprintStatus.PLANNED
    assert sprints["Sprint 2"].budget == expected
    assert len(sprints) == 3


@pytest.mark.asyncio
@pytest.mark.parametrize("default_budget, expected", [(25, 25), (None, 10)])
async def test_close_sprint_creates_missing_next_with_the_same_rule(
    db, test_project, default_budget, expected,
):
    """close_sprint shares the helper: with no planned sprint and a null
    default, the sprint it creates and activates carries the closing
    sprint's budget instead of coming up unlimited."""
    test_project.default_sprint_budget = default_budget
    await test_project.save(update_fields={"default_sprint_budget"})
    current = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Sprint 1", status=SprintStatus.ACTIVE,
        budget=10,
    )

    await SprintService().close_sprint(current)

    sprints = await _sprints(test_project)
    assert sprints["Sprint 1"].status == SprintStatus.COMPLETED
    assert sprints["Sprint 1"].closed_at is not None
    assert sprints["Sprint 2"].status == SprintStatus.ACTIVE
    assert sprints["Sprint 2"].budget == expected
    assert sprints["Sprint 2"].budget_explicit is False
    assert sprints["Sprint 3"].status == SprintStatus.PLANNED
    assert sprints["Sprint 3"].budget == expected


@pytest.mark.asyncio
async def test_a_concurrent_reader_never_sees_the_project_without_an_active_sprint(
    db, test_project, tmp_path, monkeypatch,
):
    """The race the old ordering opened (PR #404 review): between
    complete_limbo's commit and its later activation, another connection
    saw no ACTIVE sprint, and ensure_sprints_exist, which creates one
    exactly when it sees none, would add a second ACTIVE sprint next to
    the one the activation then made.

    The test database has one Oxyde connection, so the other reader is a
    plain sqlite3 connection on the same file. It looks at the committed
    state at the moment the next sprint is being activated and must still
    see exactly one ACTIVE sprint (the limbo one, its completion not yet
    committed), so ensure_sprints_exist would create nothing."""
    import sqlite3
    from contextlib import closing

    limbo, planned = await _limbo_and_next(test_project)
    real = SprintService._activate_next_sprint
    seen: list[list[str]] = []

    async def observed(self, next_sprint):
        # The writer's own view already holds the flip (CHT-1724): without
        # this, activating *before* completing the limbo sprint, outside
        # one transaction, would also show the reader one ACTIVE sprint.
        own = await OxydeSprint.objects.get(id=limbo.id)
        assert own.status == SprintStatus.COMPLETED and own.limbo is False
        uri = f"file:{tmp_path / 'test.db'}?mode=ro"
        with closing(sqlite3.connect(uri, uri=True, timeout=5)) as reader:
            rows = reader.execute(
                "SELECT id FROM sprints WHERE project_id = ? AND status = ?",
                (test_project.id, SprintStatus.ACTIVE.name),
            ).fetchall()
        seen.append([r[0] for r in rows])
        await real(self, next_sprint)

    monkeypatch.setattr(SprintService, "_activate_next_sprint", observed)
    await SprintService().complete_limbo(limbo)

    assert seen == [[limbo.id]]
    assert [s.id for s in await _active(test_project)] == [planned.id]


@pytest.mark.asyncio
async def test_repeated_self_heal_failures_log_one_traceback(db, test_project, monkeypatch, caplog):
    """A stuck limbo is retried on every check_limbo; the traceback is
    logged once per interval, repeats at DEBUG (PR #404 review L1)."""
    limbo, _ = await _limbo_and_next(test_project)
    _fail_after_activating(monkeypatch)

    with caplog.at_level(logging.WARNING, logger="app.services.ritual_service"):
        for _ in range(3):
            in_limbo, _, _ = await RitualService().check_limbo(test_project.id)
            assert in_limbo is True

    failures = [r for r in caplog.records if "Self-heal failed" in r.getMessage()]
    assert len(failures) == 1 and failures[0].exc_info is not None
    heals = [r for r in caplog.records if "self-healing" in r.getMessage()]
    assert len(heals) == 1


@pytest.mark.asyncio
async def test_self_heal_failure_entry_is_dropped_however_limbo_clears(
    db, test_project, monkeypatch, caplog,
):
    """CHT-1724: the rate-limit entry used to be dropped only by a
    successful self-heal, so a limbo cleared another way (attest,
    approve, force-clear) left it behind for the life of the process,
    and a later failure of the same project was logged at DEBUG only."""
    from app.services import ritual_service

    limbo, planned = await _limbo_and_next(test_project)
    real = _fail_after_activating(monkeypatch)
    await RitualService().check_limbo(test_project.id)
    assert ritual_service._self_heal_failure_logged_at[test_project.id][0] == limbo.id

    # Cleared by another path than check_limbo's self-heal.
    monkeypatch.setattr(SprintService, "_activate_next_sprint", real)
    await SprintService().complete_limbo(await OxydeSprint.objects.get(id=limbo.id))
    in_limbo, _, _ = await RitualService().check_limbo(test_project.id)
    assert in_limbo is False
    assert test_project.id not in ritual_service._self_heal_failure_logged_at
    assert limbo.id not in ritual_service._self_heal_failure_logged_at

    # A later stuck limbo of the same project gets its traceback at once,
    # not after the earlier sprint's interval.
    planned.limbo = True
    await planned.save(update_fields={"limbo"})
    _fail_after_activating(monkeypatch)
    caplog.clear()
    with caplog.at_level(logging.WARNING, logger="app.services.ritual_service"):
        in_limbo, _, _ = await RitualService().check_limbo(test_project.id)
    assert in_limbo is True
    failures = [r for r in caplog.records if "Self-heal failed" in r.getMessage()]
    assert len(failures) == 1 and failures[0].exc_info is not None
    assert ritual_service._self_heal_failure_logged_at[test_project.id][0] == planned.id


@pytest.mark.asyncio
async def test_close_sprint_carries_the_rows_budget_not_a_stale_copy(db, test_project):
    """CHT-1724 (PR #404 review L-b): a budget PATCH that lands between
    the caller's read and the close is what gets carried forward."""
    test_project.default_sprint_budget = None
    await test_project.save(update_fields={"default_sprint_budget"})
    stale = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Sprint 1", status=SprintStatus.ACTIVE, budget=10,
    )
    fresh = await OxydeSprint.objects.get(id=stale.id)
    fresh.budget = 15
    await fresh.save(update_fields={"budget"})

    closed = await SprintService().close_sprint(stale)

    assert closed.status == SprintStatus.COMPLETED and closed.budget == 15
    sprints = await _sprints(test_project)
    assert sprints["Sprint 2"].status == SprintStatus.ACTIVE
    assert sprints["Sprint 2"].budget == 15


@pytest.mark.asyncio
async def test_unlimited_default_then_deleted_planned_sprint_carries_the_budget(db, test_project):
    """CHT-1724 (PR #404 review L-a), kept on purpose and documented in
    _get_or_create_next_sprint: clearing the default to unlimited clears
    the planned sprint but not the active one, and a planned sprint
    deleted before the close is recreated with the active one's budget,
    erring toward arrears staying on."""
    current = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Sprint 1", status=SprintStatus.ACTIVE, budget=25,
    )
    planned = await OxydeSprint.objects.create(
        project_id=test_project.id, name="Sprint 2", status=SprintStatus.PLANNED, budget=25,
    )
    test_project.default_sprint_budget = None
    await test_project.save(update_fields={"default_sprint_budget"})
    await SprintService().adopt_default_budget(test_project.id)
    assert (await OxydeSprint.objects.get(id=planned.id)).budget is None
    await planned.delete()

    await SprintService().close_sprint(current)

    sprints = await _sprints(test_project)
    assert sprints["Sprint 2"].id != planned.id
    assert sprints["Sprint 2"].status == SprintStatus.ACTIVE
    assert sprints["Sprint 2"].budget == 25


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

    assert any(
        "no active one" in r.getMessage() and "without a budget charge" in r.getMessage()
        for r in caplog.records
    )
    assert await OxydeBudgetTransaction.objects.filter(issue_id=issue.id).count() == 0


@pytest.mark.asyncio
async def test_arrears_gate_with_no_active_sprint_is_logged(db, test_project, caplog):
    """The arrears gate passing for want of an active sprint is the larger
    half of the damage; it warns too (PR #404 review L4). Policy is
    unchanged: nothing is refused."""
    await OxydeSprint.objects.create(
        project_id=test_project.id, name="Done", status=SprintStatus.COMPLETED,
        budget=5, points_spent=9,
    )
    with caplog.at_level(logging.WARNING, logger="app.services.issue_service"):
        await IssueService()._check_sprint_arrears(test_project.id)

    assert any(
        "no active one" in r.getMessage() and "arrears gate is off" in r.getMessage()
        for r in caplog.records
    )


@pytest.mark.asyncio
async def test_project_without_sprints_closes_quietly(db, test_project, test_user, caplog):
    issue = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier=f"{test_project.key}-3",
        number=3, title="no sprints at all", estimate=1, creator_id=test_user.id,
    )
    with caplog.at_level(logging.WARNING, logger="app.services.issue_service"):
        await IssueService()._check_sprint_arrears(test_project.id)
        await IssueService()._deduct_from_sprint_budget(issue, test_user.id)
    assert not any("no active one" in r.getMessage() for r in caplog.records)
