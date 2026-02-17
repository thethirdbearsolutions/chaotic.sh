"""Project service for project management.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
from datetime import datetime, timezone
from oxyde import F, atomic
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.sprint import OxydeSprint
from app.oxyde_models.document import (
    OxydeDocument, OxydeDocumentComment, OxydeDocumentActivity,
    OxydeDocumentIssue, OxydeDocumentLabel,
)
from app.schemas.project import ProjectCreate, ProjectUpdate


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
            estimate_scale=project_in.estimate_scale.name,
            unestimated_handling=project_in.unestimated_handling.name,
            default_sprint_budget=project_in.default_sprint_budget,
            require_estimate_on_claim=project_in.require_estimate_on_claim,
        )
        await project.refresh()
        return project

    async def get_by_id(self, project_id: str) -> OxydeProject | None:
        """Get project by ID."""
        return await OxydeProject.objects.get_or_none(id=project_id)

    async def get_by_key(self, team_id: str, key: str) -> OxydeProject | None:
        """Get project by key within a team."""
        return await OxydeProject.objects.filter(
            team_id=team_id, key=key.upper()
        ).first()

    async def update(self, project: OxydeProject, project_in: ProjectUpdate) -> OxydeProject:
        """Update a project."""
        update_data = project_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            if field in ("estimate_scale", "unestimated_handling"):
                value = value.name
            setattr(project, field, value)
        project.updated_at = datetime.now(timezone.utc)
        await project.save(update_fields=set(update_data.keys()) | {"updated_at"})
        await project.refresh()
        return project

    async def delete(self, project: OxydeProject) -> None:
        """Delete a project and cascade to child records."""
        async with atomic():
            # Cascade: sprints
            await OxydeSprint.objects.filter(project_id=project.id).delete()
            # Cascade: document children then documents
            doc_ids = [d.id for d in await OxydeDocument.objects.filter(project_id=project.id).all()]
            if doc_ids:
                await OxydeDocumentComment.objects.filter(document_id__in=doc_ids).delete()
                await OxydeDocumentActivity.objects.filter(document_id__in=doc_ids).delete()
                await OxydeDocumentIssue.objects.filter(document_id__in=doc_ids).delete()
                await OxydeDocumentLabel.objects.filter(document_id__in=doc_ids).delete()
            await OxydeDocument.objects.filter(project_id=project.id).delete()
            await project.delete()

    async def list_by_team(
        self, team_id: str, skip: int = 0, limit: int = 100
    ) -> list[OxydeProject]:
        """List all projects for a team."""
        projects = await OxydeProject.objects.filter(
            team_id=team_id
        ).offset(skip).limit(limit).all()
        return projects

    async def increment_issue_count(self, project: OxydeProject) -> int:
        """Increment and return issue count for a project."""
        await OxydeProject.objects.filter(id=project.id).update(
            issue_count=F("issue_count") + 1
        )
        await project.refresh()
        return project.issue_count
