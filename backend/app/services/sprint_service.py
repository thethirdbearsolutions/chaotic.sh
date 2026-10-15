"""Sprint service for sprint management.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
from datetime import datetime, timezone

from oxyde import execute_raw
from app.db.transactions import atomic
from app.oxyde_models.sprint import OxydeSprint
from app.oxyde_models.project import OxydeProject
from app.enums import SprintStatus
from app.enums import IssueStatus
from app.schemas.sprint import SprintUpdate

# Type alias for API compatibility
Sprint = OxydeSprint


class SprintNotPlannedError(ValueError):
    """budget_follows_default was asked of a sprint that is not PLANNED."""


class SprintService:
    """Service for sprint operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        pass

    async def _get_next_sprint_number(self, project_id: str) -> int:
        """Get the next sprint number for a project.

        Uses MAX of existing sprint numbers extracted from 'Sprint N' names,
        rather than count, to avoid duplicate names after deletions or gaps.
        """
        sprints = await OxydeSprint.objects.filter(project_id=project_id).all()
        max_num = 0
        for s in sprints:
            # Extract number from "Sprint N" pattern
            if s.name and s.name.startswith("Sprint "):
                try:
                    num = int(s.name.split(" ", 1)[1])
                    max_num = max(max_num, num)
                except (ValueError, IndexError):
                    pass
        return max_num + 1

    async def _get_project_default_budget(self, project_id: str) -> int | None:
        """Get the project's default sprint budget."""
        project = await OxydeProject.objects.get_or_none(id=project_id)
        if project:
            return project.default_sprint_budget
        return None

    async def adopt_default_budget(self, project_id: str) -> None:
        """Give the project's PLANNED sprints its current default budget.

        Called when ``default_sprint_budget`` changes (CHT-1495), so a
        planned sprint shows the budget it will open with. Sprints whose
        budget was set by hand (``budget_explicit``) keep it, and ACTIVE
        and COMPLETED sprints are never touched. Activation re-reads the
        default as well, so a path that changes the default without
        calling this still opens the sprint at the right budget.

        Each sprint whose budget changes gets a new ``updated_at`` and a
        sprint "updated" broadcast, so an open page shows the new budget
        without a reload (CHT-1701). The broadcast waits for the commit
        when this runs inside a transaction.
        """
        project = await OxydeProject.objects.get_or_none(id=project_id)
        if project is None:
            return
        default_budget = project.default_sprint_budget
        planned = await OxydeSprint.objects.filter(
            project_id=project_id,
            status=SprintStatus.PLANNED,
            budget_explicit=False,
        ).all()
        for sprint in planned:
            if sprint.budget == default_budget:
                continue
            # Conditional on the row, not on this copy: a PATCH that set
            # the budget by hand or activated the sprint since it was
            # read keeps what it wrote.
            await OxydeSprint.objects.filter(
                id=sprint.id,
                status=SprintStatus.PLANNED,
                budget_explicit=False,
            ).update(budget=default_budget, updated_at=datetime.now(timezone.utc))
            await sprint.refresh()
            if sprint.budget != default_budget:
                continue
            await self._broadcast_updated(project.team_id, sprint)

    @staticmethod
    async def _broadcast_updated(team_id: str, sprint: OxydeSprint) -> None:
        """Send the sprint "updated" event the PATCH route sends."""
        from app.schemas.sprint import SprintResponse
        from app.websocket import broadcast_sprint_event

        response = SprintResponse.model_validate(sprint, from_attributes=True)
        await broadcast_sprint_event(team_id, "updated", response.model_dump(mode="json"))

    async def ensure_sprints_exist(self, project_id: str) -> tuple[OxydeSprint, OxydeSprint]:
        """Ensure Current and Next sprints exist for a project. Returns (current, next)."""
        current = await self.get_current_sprint(project_id)
        next_sprint = await self.get_next_sprint(project_id)

        # Get project's default budget for new sprints
        default_budget = await self._get_project_default_budget(project_id)

        if not current:
            # Create the first "Current" sprint
            sprint_num = await self._get_next_sprint_number(project_id)
            current = await OxydeSprint.objects.create(
                project_id=project_id,
                name=f"Sprint {sprint_num}",
                status=SprintStatus.ACTIVE,
                budget=default_budget,
                activated_at=datetime.now(timezone.utc),
            )
            await current.refresh()

        if not next_sprint:
            # Create the "Next" sprint
            sprint_num = await self._get_next_sprint_number(project_id)
            next_sprint = await OxydeSprint.objects.create(
                project_id=project_id,
                name=f"Sprint {sprint_num}",
                status=SprintStatus.PLANNED,
                budget=default_budget,
            )
            await next_sprint.refresh()

        return current, next_sprint

    async def get_current_sprint(self, project_id: str) -> OxydeSprint | None:
        """Get the current (active) sprint for a project."""
        return await OxydeSprint.objects.filter(
            project_id=project_id, status=SprintStatus.ACTIVE.name
        ).first()

    async def get_next_sprint(self, project_id: str) -> OxydeSprint | None:
        """Get the next (planned) sprint for a project."""
        return await OxydeSprint.objects.filter(
            project_id=project_id, status=SprintStatus.PLANNED.name
        ).order_by("created_at").first()

    async def _get_or_create_next_sprint(
        self, project_id: str, carry_budget: int | None = None,
    ) -> OxydeSprint:
        """The planned sprint a rotation activates, created if there is
        none (e.g. it was deleted while the current sprint sat in limbo).

        A created sprint starts at the project default. With a null
        ("unlimited") default it takes `carry_budget`, the closing
        sprint's budget, instead: the CHT-1495 carry-forward rule, so a
        rotation cannot silently switch arrears off. Like every carried
        budget it is not marked as set by hand, so a default set later
        still reaches it (PR #404 review L2).
        """
        next_sprint = await self.get_next_sprint(project_id)
        if next_sprint:
            return next_sprint
        sprint_num = await self._get_next_sprint_number(project_id)
        default_budget = await self._get_project_default_budget(project_id)
        next_sprint = await OxydeSprint.objects.create(
            project_id=project_id,
            name=f"Sprint {sprint_num}",
            status=SprintStatus.PLANNED,
            budget=default_budget if default_budget is not None else carry_budget,
        )
        await next_sprint.refresh()
        return next_sprint

    async def close_sprint(self, sprint: OxydeSprint) -> OxydeSprint:
        """Close the current sprint.

        Whether the sprint enters limbo is decided here by asking
        RitualService for this sprint's *pending EVERY_SPRINT rituals*
        (CHT-1278) -- not by "does the project have any ritual at all".
        Ticket-scoped rituals (TICKET_CLOSE/TICKET_CLAIM) never gate a
        sprint close; only unattested sprint-triggered rituals do. This
        is the single implementation of that rule -- callers must not
        pass their own has_rituals boolean, or the two can drift again.

        If there are pending sprint rituals:
        1. Sprint stays ACTIVE with limbo=True (work blocked until rituals clear)
        2. Moves incomplete issues to Next sprint

        If there are no pending sprint rituals:
        1. Marks current sprint as COMPLETED
        2. Moves incomplete issues to Next sprint
        3. Next sprint becomes ACTIVE (new Current)
        4. Creates a new Next sprint

        A caller holding a stale copy of the row (it read the sprint
        ACTIVE, another close committed since) does not raise: the
        transition is claimed with a conditional UPDATE and the loser
        returns the row as the winner left it, having written nothing
        (CHT-1404, the same contract as complete_limbo). The route
        therefore broadcasts, and the CLI announces, a close the loser
        did not perform; both are true of the database.
        """
        if sprint.status != SprintStatus.ACTIVE:
            raise ValueError("Can only close an active sprint")

        if sprint.limbo:
            raise ValueError("Sprint is already in limbo. Complete pending rituals first.")

        project_id = sprint.project_id

        # Lazy import: ritual_service imports SprintService at module
        # level, so importing RitualService at module level here would
        # create a circular import.
        from app.services.ritual_service import RitualService
        pending_rituals = await RitualService().get_pending_rituals(project_id, sprint.id)
        has_rituals = bool(pending_rituals)

        async with atomic():
            # Claim the transition first, with a conditional UPDATE ...
            # RETURNING (the guard complete_limbo uses, CHT-1404). The
            # ACTIVE/limbo=0 checks above ran on this caller's copy of the
            # row, and get_pending_rituals ran outside this transaction, so
            # a caller whose reads predate another close's commit gets here
            # believing the sprint is still open. Only the caller whose
            # UPDATE matched the row does any of the work below; the loser
            # refreshes and returns the row as the winner left it, writing
            # nothing (its next-sprint lookup would already see the
            # post-rotation world and move spillover to the wrong sprint).
            # Genuinely overlapping writers are a different case: SQLite
            # serialises them and the second fails at its first write
            # (deferred BEGIN, CHT-1411); this guard is for the
            # serialised-but-stale interleaving, which is the realistic one.
            if has_rituals:
                # Enter limbo - sprint stays ACTIVE but blocked
                won = await execute_raw(
                    "UPDATE sprints SET limbo = 1 WHERE id = ? AND status = ? AND limbo = 0 RETURNING id",
                    [sprint.id, SprintStatus.ACTIVE.name],
                )
            else:
                # Full rotation - complete and activate next sprint
                won = await execute_raw(
                    "UPDATE sprints SET status = ?, limbo = 0 WHERE id = ? AND status = ? AND limbo = 0 RETURNING id",
                    [SprintStatus.COMPLETED.name, sprint.id, SprintStatus.ACTIVE.name],
                )
            if not won:
                await sprint.refresh()
                return sprint

            next_sprint = await self._get_or_create_next_sprint(project_id, carry_budget=sprint.budget)

            # Move incomplete issues from current sprint to next sprint
            # Raw SQL: .name strings required for execute_raw params
            incomplete_statuses = [
                IssueStatus.BACKLOG.name,
                IssueStatus.TODO.name,
                IssueStatus.IN_PROGRESS.name,
                IssueStatus.IN_REVIEW.name,
            ]
            placeholders = ",".join("?" for _ in incomplete_statuses)
            await execute_raw(
                f"UPDATE issues SET sprint_id = ? WHERE sprint_id = ? AND status IN ({placeholders})",
                [next_sprint.id, sprint.id] + incomplete_statuses,
            )

            if not has_rituals:
                # closed_at rides in the same transaction as the status
                # flip (CHT-1366), saved through the ORM so the datetime
                # is stored the way every other path stores it.
                await sprint.refresh()
                sprint.closed_at = datetime.now(timezone.utc)
                await sprint.save(update_fields={"closed_at"})
                # The sprint rotated: round-robin groups move on (CHT-1280).
                await RitualService().record_sprint_rotation(project_id, sprint.id)
                await self._activate_next_sprint(next_sprint)

        await sprint.refresh()
        return sprint

    async def _activate_next_sprint(self, next_sprint: OxydeSprint) -> None:
        """Activate the next sprint and create a new next.

        Budget rule (CHT-1495): the activating sprint takes the project's
        default as it is now unless its budget was set by hand, and the new
        planned sprint starts at the default. A null ("unlimited") default
        is the exception, so that rotation cannot silently switch arrears
        off: at activation a null default never overwrites a budget, and
        the new planned sprint carries the activating sprint's budget
        forward. The carried budget is *not* marked as set by hand, so a
        default set later (unlimited -> 30, or a later change) still
        reaches it. Clearing the default to null does reach planned
        sprints, through adopt_default_budget: that is a deliberate change
        of default, not a rotation.
        """
        next_sprint.status = SprintStatus.ACTIVE
        next_sprint.activated_at = datetime.now(timezone.utc)
        await next_sprint.save(update_fields={"status", "activated_at"})

        # This is the last moment the budget follows the default: an active
        # sprint's budget only changes by hand. The write is conditional on
        # the row, not on this copy of it: a PATCH that set the budget by
        # hand after next_sprint was read must not be overwritten (PR #384
        # review M3).
        default_budget = await self._get_project_default_budget(next_sprint.project_id)
        if default_budget is not None:
            await execute_raw(
                "UPDATE sprints SET budget = ? WHERE id = ? AND budget_explicit = 0",
                [default_budget, next_sprint.id],
            )
        await next_sprint.refresh()

        # Only create a new PLANNED sprint if one doesn't already exist
        existing_planned = await OxydeSprint.objects.filter(
            project_id=next_sprint.project_id,
            status=SprintStatus.PLANNED.name,
        ).first()
        if existing_planned:
            return

        # The new Next sprint starts at the project's current default. It
        # used to copy the sprint being activated, which was itself a
        # snapshot of the default from when *it* was created, so a changed
        # default never reached a rotation.
        new_budget = default_budget if default_budget is not None else next_sprint.budget

        # Create new Next sprint
        sprint_num = await self._get_next_sprint_number(next_sprint.project_id)
        new_next = await OxydeSprint.objects.create(
            project_id=next_sprint.project_id,
            name=f"Sprint {sprint_num}",
            status=SprintStatus.PLANNED,
            budget=new_budget,
        )
        await new_next.refresh()

    async def complete_limbo(self, sprint) -> OxydeSprint:
        """Complete limbo and activate the next sprint.

        Called when all rituals are attested/approved.
        Uses atomic UPDATE WHERE limbo=true to prevent race condition.
        Accepts both SQLAlchemy Sprint and OxydeSprint (for ritual_service compat).
        """
        # Reload as Oxyde model if passed a SQLAlchemy model
        if not isinstance(sprint, OxydeSprint):
            sprint = await OxydeSprint.objects.get_or_none(id=sprint.id)
            if not sprint:
                raise ValueError("Sprint not found")
        # Atomic check-and-update via raw SQL — .name strings for raw
        # params. RETURNING makes the row count observable (execute_raw
        # returns [] for a plain UPDATE), which is the actual race
        # guard: only the caller whose UPDATE matched the limbo=1 row
        # may activate the next sprint. The previous refresh-then-check
        # guard was dead code — after ANY caller's UPDATE landed, a
        # refresh showed limbo=0 for every racer, so all of them
        # proceeded to _activate_next_sprint (PR #223 review, CHT-1278).
        # The winner also stamps the close time (CHT-1366): limbo is part
        # of the sprint; it closes when the rotation actually happens. The
        # stamp rides in the same transaction as the status flip so a crash
        # between them cannot leave a COMPLETED sprint with no closed_at.
        #
        # The next sprint is activated in the same transaction (CHT-1721),
        # as close_sprint's no-limbo path does. It used to run after the
        # commit, and its callers log and swallow a failure, so a failed
        # activation left the project with no ACTIVE sprint: no arrears
        # gate and no budget charge on any close until something created
        # a fresh sprint. Now a failure rolls the whole rotation back, the
        # sprint stays in limbo with nothing pending, and the next limbo
        # check (RitualService.check_limbo's self-heal, or force-clear)
        # retries it.
        #
        # The trade-off (PR #404 review L1): this fails closed. While the
        # activation keeps failing, the project stays in limbo, which
        # blocks moves to in_progress/done/canceled, and force-clear-limbo
        # hits the same failure, since it calls this method. The old
        # behaviour failed open instead: work went on with no budget and
        # no arrears. No deterministic failure is known here (sprints
        # carry no unique constraint; a missing project only yields a
        # None default), so a stuck limbo means a transient error
        # (CHT-1411's BUSY) that the next check retries. check_limbo
        # rate-limits the logging of those retries.
        async with atomic():
            result = await execute_raw(
                "UPDATE sprints SET status = ?, limbo = 0 WHERE id = ? AND limbo = 1 RETURNING id",
                [SprintStatus.COMPLETED.name, sprint.id],
            )
            if result:
                await sprint.refresh()
                sprint.closed_at = datetime.now(timezone.utc)
                await sprint.save(update_fields={"closed_at"})
                # The winner also moves round-robin groups past the ritual
                # that gated this limbo (CHT-1280); until now the pointer was
                # never advanced on any path, so the first sibling gated
                # every sprint and the others were never selected.
                from app.services.ritual_service import RitualService
                await RitualService().record_sprint_rotation(sprint.project_id, sprint.id)
                next_sprint = await self._get_or_create_next_sprint(
                    sprint.project_id, carry_budget=sprint.budget,
                )
                await self._activate_next_sprint(next_sprint)
        # A loser (another request already cleared limbo and owns the
        # activation, or the sprint wasn't in limbo) just reports the row.
        await sprint.refresh()
        return sprint

    async def get_by_id(self, sprint_id: str) -> OxydeSprint | None:
        """Get sprint by ID."""
        return await OxydeSprint.objects.get_or_none(id=sprint_id)

    async def update(self, sprint: OxydeSprint, sprint_in: SprintUpdate) -> OxydeSprint:
        """Update a sprint.

        A status change through PATCH is still a lifecycle transition, so it
        stamps the same outputs close_sprint and complete_limbo do
        (CHT-1366): activated_at the first time a sprint becomes ACTIVE,
        closed_at the first time it becomes COMPLETED. Without this the
        dates would be outputs of two code paths and a NULL on the third.
        """
        update_data = sprint_in.model_dump(exclude_unset=True)
        # A budget given here, a number or null for "unlimited", is a
        # deliberate choice: it stops following the project default
        # (CHT-1495).
        if "budget" in update_data:
            update_data["budget_explicit"] = True
        # The way back (CHT-1701): the sprint follows the default again
        # and takes it now, as adopt_default_budget would have given it.
        # The schema refuses this together with `budget`. The write is
        # conditional on the row still being PLANNED, not on this copy of
        # it: a sprint activated since it was read keeps its budget, as
        # the activation write in _activate_next_sprint does (PR #391
        # review L3).
        if update_data.pop("budget_follows_default", None):
            default_budget = await self._get_project_default_budget(sprint.project_id)
            matched = await execute_raw(
                "UPDATE sprints SET budget = ?, budget_explicit = 0, updated_at = ? "
                "WHERE id = ? AND status = ? RETURNING id",
                [default_budget, datetime.now(timezone.utc), sprint.id, SprintStatus.PLANNED.name],
            )
            if not matched:
                raise SprintNotPlannedError(
                    "Only a planned sprint can follow the project default budget; "
                    "set this sprint's budget instead"
                )
            await sprint.refresh()
        new_status = update_data.get("status")
        if new_status is not None and new_status != sprint.status:
            now = datetime.now(timezone.utc)
            if new_status == SprintStatus.ACTIVE and sprint.activated_at is None:
                update_data["activated_at"] = now
            if new_status == SprintStatus.COMPLETED and sprint.closed_at is None:
                update_data["closed_at"] = now
        if update_data:
            # A sprint's updated_at was never bumped on any path; a client
            # that compares it would miss every change (CHT-1701).
            update_data["updated_at"] = datetime.now(timezone.utc)
        for field, value in update_data.items():
            setattr(sprint, field, value)
        await sprint.save(update_fields=set(update_data.keys()))
        await sprint.refresh()
        return sprint

    async def delete(self, sprint: OxydeSprint) -> None:
        """Delete a sprint."""
        await sprint.delete()

    async def list_by_project(
        self,
        project_id: str,
        skip: int = 0,
        limit: int = 100,
        status: SprintStatus | None = None,
    ) -> list[OxydeSprint]:
        """List sprints for a project."""
        qs = OxydeSprint.objects.filter(project_id=project_id)
        if status:
            qs = qs.filter(status=status)
        return await qs.order_by("-created_at").offset(skip).limit(limit).all()
