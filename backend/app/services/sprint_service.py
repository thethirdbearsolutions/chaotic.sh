"""Sprint service for sprint management.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
from oxyde import atomic, execute_raw
from app.oxyde_models.sprint import OxydeSprint
from app.oxyde_models.project import OxydeProject
from app.enums import SprintStatus
from app.enums import IssueStatus
from app.schemas.sprint import SprintCreate, SprintUpdate

# Type alias for API compatibility
Sprint = OxydeSprint


class SprintService:
    """Service for sprint operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        pass

    async def create(self, sprint_in: SprintCreate, project_id: str) -> OxydeSprint:
        """Create a new sprint."""
        # Determine budget: explicit value > explicit unlimited > project default
        if sprint_in.budget is not None:
            budget = sprint_in.budget
        elif sprint_in.explicit_unlimited:
            budget = None  # Explicitly unlimited, don't use project default
        else:
            budget = await self._get_project_default_budget(project_id)

        sprint = await OxydeSprint.objects.create(
            project_id=project_id,
            name=sprint_in.name,
            description=sprint_in.description,
            start_date=sprint_in.start_date,
            end_date=sprint_in.end_date,
            budget=budget,
        )
        await sprint.refresh()
        return sprint

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

    async def close_sprint(self, sprint: OxydeSprint, has_rituals: bool = False) -> OxydeSprint:
        """Close the current sprint.

        If has_rituals is True:
        1. Sprint stays ACTIVE with limbo=True (work blocked until rituals clear)
        2. Moves incomplete issues to Next sprint

        If has_rituals is False:
        1. Marks current sprint as COMPLETED
        2. Moves incomplete issues to Next sprint
        3. Next sprint becomes ACTIVE (new Current)
        4. Creates a new Next sprint
        """
        if sprint.status != SprintStatus.ACTIVE:
            raise ValueError("Can only close an active sprint")

        if sprint.limbo:
            raise ValueError("Sprint is already in limbo. Complete pending rituals first.")

        project_id = sprint.project_id

        async with atomic():
            # Get next sprint (or create if doesn't exist)
            next_sprint = await self.get_next_sprint(project_id)
            if not next_sprint:
                sprint_num = await self._get_next_sprint_number(project_id)
                default_budget = await self._get_project_default_budget(project_id)
                next_sprint = await OxydeSprint.objects.create(
                    project_id=project_id,
                    name=f"Sprint {sprint_num}",
                    status=SprintStatus.PLANNED,
                    budget=default_budget,
                )
                await next_sprint.refresh()

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

            if has_rituals:
                # Enter limbo - sprint stays ACTIVE but blocked
                sprint.limbo = True
                await sprint.save(update_fields={"limbo"})
            else:
                # Full rotation - complete and activate next sprint
                sprint.status = SprintStatus.COMPLETED
                sprint.limbo = False
                await sprint.save(update_fields={"status", "limbo"})
                await self._activate_next_sprint(next_sprint)

        await sprint.refresh()
        return sprint

    async def _activate_next_sprint(self, next_sprint: OxydeSprint) -> None:
        """Activate the next sprint and create a new next."""
        next_sprint.status = SprintStatus.ACTIVE
        await next_sprint.save(update_fields={"status"})

        # Only create a new PLANNED sprint if one doesn't already exist
        existing_planned = await OxydeSprint.objects.filter(
            project_id=next_sprint.project_id,
            status=SprintStatus.PLANNED.name,
        ).first()
        if existing_planned:
            return

        # Determine budget for new sprint: inherit from previous Next, or fall back to project default
        new_budget = next_sprint.budget
        if new_budget is None:
            new_budget = await self._get_project_default_budget(next_sprint.project_id)

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
        # Atomic check-and-update via raw SQL — .name strings for raw params
        result = await execute_raw(
            "UPDATE sprints SET status = ?, limbo = 0 WHERE id = ? AND limbo = 1",
            [SprintStatus.COMPLETED.name, sprint.id],
        )
        # Refresh to check if the update took effect
        await sprint.refresh()
        if sprint.limbo:
            # Another request already cleared limbo — nothing to do
            return sprint

        # Get and activate the next sprint
        next_sprint = await self.get_next_sprint(sprint.project_id)
        if next_sprint:
            await self._activate_next_sprint(next_sprint)

        await sprint.refresh()
        return sprint

    async def get_by_id(self, sprint_id: str) -> OxydeSprint | None:
        """Get sprint by ID."""
        return await OxydeSprint.objects.get_or_none(id=sprint_id)

    async def update(self, sprint: OxydeSprint, sprint_in: SprintUpdate) -> OxydeSprint:
        """Update a sprint."""
        update_data = sprint_in.model_dump(exclude_unset=True)
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
            # .name for filter (bypasses model_dump, goes to msgpack raw)
            qs = qs.filter(status=status.name if hasattr(status, 'name') else status)
        return await qs.order_by("-created_at").offset(skip).limit(limit).all()

    async def enter_limbo(self, sprint: OxydeSprint) -> OxydeSprint:
        """Put sprint into limbo state (pending rituals)."""
        if sprint.status != SprintStatus.ACTIVE:
            raise ValueError("Can only put an active sprint into limbo")
        sprint.limbo = True
        await sprint.save(update_fields={"limbo"})
        await sprint.refresh()
        return sprint
