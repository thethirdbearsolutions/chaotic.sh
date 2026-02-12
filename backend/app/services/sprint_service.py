"""Sprint service for sprint management."""
from sqlalchemy import select, update, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.sprint import Sprint, SprintStatus
from app.models.project import Project
from app.models.issue import Issue, IssueStatus
from app.schemas.sprint import SprintCreate, SprintUpdate


class SprintService:
    """Service for sprint operations."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, sprint_in: SprintCreate, project_id: str) -> Sprint:
        """Create a new sprint."""
        # Determine budget: explicit value > explicit unlimited > project default
        if sprint_in.budget is not None:
            budget = sprint_in.budget
        elif sprint_in.explicit_unlimited:
            budget = None  # Explicitly unlimited, don't use project default
        else:
            budget = await self._get_project_default_budget(project_id)

        sprint = Sprint(
            project_id=project_id,
            name=sprint_in.name,
            description=sprint_in.description,
            start_date=sprint_in.start_date,
            end_date=sprint_in.end_date,
            budget=budget,
        )
        self.db.add(sprint)
        await self.db.commit()
        await self.db.refresh(sprint)
        return sprint

    async def _get_next_sprint_number(self, project_id: str) -> int:
        """Get the next sprint number for a project."""
        result = await self.db.execute(
            select(func.count(Sprint.id)).where(Sprint.project_id == project_id)
        )
        count = result.scalar() or 0
        return count + 1

    async def _get_project_default_budget(self, project_id: str) -> int | None:
        """Get the project's default sprint budget."""
        result = await self.db.execute(
            select(Project.default_sprint_budget).where(Project.id == project_id)
        )
        return result.scalar_one_or_none()

    async def ensure_sprints_exist(self, project_id: str) -> tuple[Sprint, Sprint]:
        """Ensure Current and Next sprints exist for a project. Returns (current, next)."""
        current = await self.get_current_sprint(project_id)
        next_sprint = await self.get_next_sprint(project_id)

        # Get project's default budget for new sprints
        default_budget = await self._get_project_default_budget(project_id)

        if not current:
            # Create the first "Current" sprint
            sprint_num = await self._get_next_sprint_number(project_id)
            current = Sprint(
                project_id=project_id,
                name=f"Sprint {sprint_num}",
                status=SprintStatus.ACTIVE,
                budget=default_budget,
            )
            self.db.add(current)
            await self.db.commit()
            await self.db.refresh(current)

        if not next_sprint:
            # Create the "Next" sprint
            sprint_num = await self._get_next_sprint_number(project_id)
            next_sprint = Sprint(
                project_id=project_id,
                name=f"Sprint {sprint_num}",
                status=SprintStatus.PLANNED,
                budget=default_budget,
            )
            self.db.add(next_sprint)
            await self.db.commit()
            await self.db.refresh(next_sprint)

        return current, next_sprint

    async def get_current_sprint(self, project_id: str) -> Sprint | None:
        """Get the current (active) sprint for a project."""
        result = await self.db.execute(
            select(Sprint).where(
                Sprint.project_id == project_id,
                Sprint.status == SprintStatus.ACTIVE,
            )
        )
        return result.scalar_one_or_none()

    async def get_next_sprint(self, project_id: str) -> Sprint | None:
        """Get the next (planned) sprint for a project."""
        result = await self.db.execute(
            select(Sprint)
            .where(
                Sprint.project_id == project_id,
                Sprint.status == SprintStatus.PLANNED,
            )
            .order_by(Sprint.created_at.asc())
            .limit(1)
        )
        return result.scalar_one_or_none()

    async def close_sprint(self, sprint: Sprint, has_rituals: bool = False) -> Sprint:
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

        # Get next sprint (or create if doesn't exist)
        next_sprint = await self.get_next_sprint(project_id)
        if not next_sprint:
            sprint_num = await self._get_next_sprint_number(project_id)
            default_budget = await self._get_project_default_budget(project_id)
            next_sprint = Sprint(
                project_id=project_id,
                name=f"Sprint {sprint_num}",
                status=SprintStatus.PLANNED,
                budget=default_budget,
            )
            self.db.add(next_sprint)
            await self.db.flush()

        # Move incomplete issues from current sprint to next sprint
        incomplete_statuses = [
            IssueStatus.BACKLOG,
            IssueStatus.TODO,
            IssueStatus.IN_PROGRESS,
            IssueStatus.IN_REVIEW,
        ]
        await self.db.execute(
            update(Issue)
            .where(
                Issue.sprint_id == sprint.id,
                Issue.status.in_(incomplete_statuses),
            )
            .values(sprint_id=next_sprint.id)
        )

        if has_rituals:
            # Enter limbo - sprint stays ACTIVE but blocked
            sprint.limbo = True
        else:
            # Full rotation - complete and activate next sprint
            sprint.status = SprintStatus.COMPLETED
            sprint.limbo = False
            await self._activate_next_sprint(next_sprint)

        await self.db.commit()
        await self.db.refresh(sprint)

        return sprint

    async def _activate_next_sprint(self, next_sprint: Sprint) -> None:
        """Activate the next sprint and create a new next."""
        next_sprint.status = SprintStatus.ACTIVE

        # Determine budget for new sprint: inherit from previous Next, or fall back to project default
        new_budget = next_sprint.budget
        if new_budget is None:
            new_budget = await self._get_project_default_budget(next_sprint.project_id)

        # Create new Next sprint
        sprint_num = await self._get_next_sprint_number(next_sprint.project_id)
        new_next = Sprint(
            project_id=next_sprint.project_id,
            name=f"Sprint {sprint_num}",
            status=SprintStatus.PLANNED,
            budget=new_budget,
        )
        self.db.add(new_next)

    async def complete_limbo(self, sprint: Sprint) -> Sprint:
        """Complete limbo and activate the next sprint.

        Called when all rituals are attested/approved.
        1. Atomically marks sprint as COMPLETED with limbo=False
        2. Activates next sprint

        Uses atomic UPDATE WHERE limbo=true to prevent race condition
        when two concurrent attestations both try to clear limbo.
        """
        # Atomic check-and-update: only proceeds if sprint is still in limbo.
        # The sprint object remains stale until db.refresh() below; this is safe
        # because _activate_next_sprint() only uses next_sprint, not this sprint.
        result = await self.db.execute(
            update(Sprint)
            .where(Sprint.id == sprint.id, Sprint.limbo == True)
            .values(status=SprintStatus.COMPLETED, limbo=False)
        )
        if result.rowcount == 0:
            # Another request already cleared limbo — nothing to do
            await self.db.refresh(sprint)
            return sprint

        # Get and activate the next sprint
        next_sprint = await self.get_next_sprint(sprint.project_id)
        if next_sprint:
            await self._activate_next_sprint(next_sprint)

        await self.db.commit()
        await self.db.refresh(sprint)
        return sprint

    async def get_by_id(self, sprint_id: str) -> Sprint | None:
        """Get sprint by ID."""
        result = await self.db.execute(select(Sprint).where(Sprint.id == sprint_id))
        return result.scalar_one_or_none()

    async def update(self, sprint: Sprint, sprint_in: SprintUpdate) -> Sprint:
        """Update a sprint."""
        update_data = sprint_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(sprint, field, value)
        await self.db.commit()
        await self.db.refresh(sprint)
        return sprint

    async def delete(self, sprint: Sprint) -> None:
        """Delete a sprint."""
        await self.db.delete(sprint)
        await self.db.commit()

    async def list_by_project(
        self,
        project_id: str,
        skip: int = 0,
        limit: int = 100,
        status: SprintStatus | None = None,
    ) -> list[Sprint]:
        """List sprints for a project."""
        query = select(Sprint).where(Sprint.project_id == project_id)
        if status:
            query = query.where(Sprint.status == status)
        query = query.order_by(Sprint.created_at.desc()).offset(skip).limit(limit)

        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def enter_limbo(self, sprint: Sprint) -> Sprint:
        """Put sprint into limbo state (pending rituals)."""
        if sprint.status != SprintStatus.ACTIVE:
            raise ValueError("Can only put an active sprint into limbo")
        sprint.limbo = True
        await self.db.commit()
        await self.db.refresh(sprint)
        return sprint
