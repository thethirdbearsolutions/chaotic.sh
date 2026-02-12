"""Project service for project management."""
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate


class ProjectService:
    """Service for project operations."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, project_in: ProjectCreate, team_id: str) -> Project:
        """Create a new project."""
        project = Project(
            team_id=team_id,
            name=project_in.name,
            key=project_in.key.upper(),
            description=project_in.description,
            color=project_in.color,
            icon=project_in.icon,
            lead_id=project_in.lead_id,
            estimate_scale=project_in.estimate_scale,
            unestimated_handling=project_in.unestimated_handling,
            default_sprint_budget=project_in.default_sprint_budget,
            require_estimate_on_claim=project_in.require_estimate_on_claim,
        )
        self.db.add(project)
        await self.db.commit()
        await self.db.refresh(project)
        return project

    async def get_by_id(self, project_id: str) -> Project | None:
        """Get project by ID."""
        result = await self.db.execute(
            select(Project).where(Project.id == project_id)
        )
        return result.scalar_one_or_none()

    async def get_by_key(self, team_id: str, key: str) -> Project | None:
        """Get project by key within a team."""
        result = await self.db.execute(
            select(Project).where(
                Project.team_id == team_id,
                Project.key == key.upper(),
            )
        )
        return result.scalar_one_or_none()

    async def update(self, project: Project, project_in: ProjectUpdate) -> Project:
        """Update a project."""
        update_data = project_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(project, field, value)
        await self.db.commit()
        await self.db.refresh(project)
        return project

    async def delete(self, project: Project) -> None:
        """Delete a project."""
        await self.db.delete(project)
        await self.db.commit()

    async def list_by_team(
        self, team_id: str, skip: int = 0, limit: int = 100
    ) -> list[Project]:
        """List all projects for a team."""
        result = await self.db.execute(
            select(Project)
            .where(Project.team_id == team_id)
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    async def increment_issue_count(self, project: Project) -> int:
        """Increment and return issue count for a project."""
        project.issue_count += 1
        await self.db.commit()
        await self.db.refresh(project)
        return project.issue_count
