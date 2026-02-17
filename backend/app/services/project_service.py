"""Project service for project management.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
from datetime import datetime, timezone
from oxyde import F
from enum import Enum
from app.models.project import EstimateScale, UnestimatedHandling
from app.oxyde_models.project import OxydeProject
from app.schemas.project import ProjectCreate, ProjectUpdate

# SQLAlchemy stores enum NAMES (e.g. "FIBONACCI") in the DB, but Pydantic
# expects enum VALUES (e.g. "fibonacci") for serialization.  These maps
# translate from DB-stored names → enum values for Oxyde reads.
_ESTIMATE_SCALE_MAP = {e.name: e.value for e in EstimateScale}
_UNESTIMATED_MAP = {e.name: e.value for e in UnestimatedHandling}


def _enum_name(val):
    """Convert enum to its name (matching SQLAlchemy's default storage)."""
    return val.name if isinstance(val, Enum) else val


def _fix_enum_fields(project: OxydeProject) -> OxydeProject:
    """Convert DB-stored enum names to enum values for Pydantic compat."""
    if project is None:
        return project
    if project.estimate_scale in _ESTIMATE_SCALE_MAP:
        project.estimate_scale = _ESTIMATE_SCALE_MAP[project.estimate_scale]
    if project.unestimated_handling in _UNESTIMATED_MAP:
        project.unestimated_handling = _UNESTIMATED_MAP[project.unestimated_handling]
    return project

# Type alias for API compatibility
Project = OxydeProject


class ProjectService:
    """Service for project operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        pass

    async def create(self, project_in: ProjectCreate, team_id: str) -> OxydeProject:
        """Create a new project."""
        project = await OxydeProject.objects.create(
            team_id=team_id,
            name=project_in.name,
            key=project_in.key.upper(),
            description=project_in.description,
            color=project_in.color,
            icon=project_in.icon,
            lead_id=project_in.lead_id,
            estimate_scale=_enum_name(project_in.estimate_scale),
            unestimated_handling=_enum_name(project_in.unestimated_handling),
            default_sprint_budget=project_in.default_sprint_budget,
            require_estimate_on_claim=project_in.require_estimate_on_claim,
        )
        await project.refresh()
        return _fix_enum_fields(project)

    async def get_by_id(self, project_id: str) -> OxydeProject | None:
        """Get project by ID."""
        return _fix_enum_fields(await OxydeProject.objects.get_or_none(id=project_id))

    async def get_by_key(self, team_id: str, key: str) -> OxydeProject | None:
        """Get project by key within a team."""
        return _fix_enum_fields(await OxydeProject.objects.filter(
            team_id=team_id, key=key.upper()
        ).first())

    async def update(self, project: OxydeProject, project_in: ProjectUpdate) -> OxydeProject:
        """Update a project."""
        update_data = project_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            # Convert enums to names for SQLAlchemy-compatible DB storage
            value = _enum_name(value)
            setattr(project, field, value)
        project.updated_at = datetime.now(timezone.utc)
        await project.save(update_fields=set(update_data.keys()) | {"updated_at"})
        await project.refresh()
        return _fix_enum_fields(project)

    async def delete(self, project: OxydeProject) -> None:
        """Delete a project."""
        await project.delete()

    async def list_by_team(
        self, team_id: str, skip: int = 0, limit: int = 100
    ) -> list[OxydeProject]:
        """List all projects for a team."""
        projects = await OxydeProject.objects.filter(
            team_id=team_id
        ).offset(skip).limit(limit).all()
        return [_fix_enum_fields(p) for p in projects]

    async def increment_issue_count(self, project: OxydeProject) -> int:
        """Increment and return issue count for a project."""
        await OxydeProject.objects.filter(id=project.id).update(
            issue_count=F("issue_count") + 1
        )
        await project.refresh()
        return project.issue_count
