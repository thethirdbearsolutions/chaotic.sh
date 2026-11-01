"""Project service for project management.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
from datetime import datetime, timezone
from oxyde import F, IntegrityError
from app.services.credential_events import revoking
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.sprint import OxydeSprint
from app.services.sprint_service import SprintService
from app.db.transactions import atomic
from app.oxyde_models.document import (
    OxydeDocument, OxydeDocumentComment, OxydeDocumentActivity,
    OxydeDocumentIssue, OxydeDocumentLabel,
)
from app.schemas.project import ProjectCreate, ProjectUpdate


# Type alias for API compatibility
Project = OxydeProject



# Project settings that gate a ticket's claim or close. A write that
# turns one off is conditional on it still being off as read, so a person
# turning it on meanwhile is not silently undone (CHT-1926).
GATE_SETTINGS = (
    "human_rituals_required",
    "require_estimate_on_claim",
    "require_assignee_on_claim",
    "require_epic_on_close",
)


class ProjectChangedError(Exception):
    """A conditional project update found the row changed (CHT-1926)."""


class ProjectService:
    """Service for project operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        pass

    async def create(self, project_in: ProjectCreate, team_id: str) -> OxydeProject:
        """Create a new project, idempotently on (team_id, key).

        The API's create_project does a check-then-act (get_by_key, then
        this call) with no lock in between, so two concurrent or
        retried-after-timeout requests can both pass the existence check.
        A DB-level UNIQUE(team_id, key) index (migration 0008) backstops
        that race: on IntegrityError, re-check and return the winner's
        row instead of surfacing a 500 -- mirrors
        IssueService.create_relation's fallback.
        """
        try:
            project = await OxydeProject.objects.create(
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
                require_assignee_on_claim=project_in.require_assignee_on_claim,
                require_epic_on_close=project_in.require_epic_on_close,
            )
        except IntegrityError:
            existing = await self.get_by_key(team_id, project_in.key)
            if existing is not None:
                return existing
            raise
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

    async def update(
        self, project: OxydeProject, project_in: ProjectUpdate, *, expect: dict | None = None,
    ) -> OxydeProject:
        """Update a project.

        ``expect`` makes the write conditional: it lands only while those
        columns still hold those values, else ProjectChangedError and
        nothing is written. The agent gate check uses it (CHT-1926): it
        decided on the values it read, and a person turning a gate on in
        between must not be undone by the agent's write."""
        update_data = project_in.model_dump(exclude_unset=True)
        # These columns are NOT NULL: an explicit null means "leave it"
        # rather than a failed write (PR #462 review 7).
        for field in (
            "human_rituals_required", "require_estimate_on_claim",
            "require_assignee_on_claim", "require_epic_on_close",
        ):
            if field in update_data and update_data[field] is None:
                del update_data[field]
        # Clients resend settings that did not change (the web Rules save
        # always sends default_sprint_budget), so only a real change of
        # default re-reads it into planned sprints. Under a null default a
        # planned sprint can hold a carried budget, and a resent null must
        # not wipe it (PR #384 re-review R3).
        default_changed = (
            "default_sprint_budget" in update_data
            and update_data["default_sprint_budget"] != project.default_sprint_budget
        )
        now = datetime.now(timezone.utc)
        if expect is not None:
            await self._update_conditionally(project, update_data, expect, now, default_changed)
        else:
            for field, value in update_data.items():
                setattr(project, field, value)
            project.updated_at = now
            await project.save(update_fields=set(update_data.keys()) | {"updated_at"})
            if default_changed:
                # Planned sprints follow the default until budgeted by
                # hand (CHT-1495).
                await SprintService().adopt_default_budget(project.id)
        await project.refresh()
        return project

    async def _update_conditionally(
        self, project: OxydeProject, update_data: dict, expect: dict, now: datetime,
        default_changed: bool,
    ) -> None:
        """The ``expect`` path of ``update``: the conditional write and the
        planned sprints' adoption of a new default, in one transaction."""
        # The gate settings are NOT NULL bools, so a plain equality is
        # the whole condition (PR #492 review 2).
        conditions = dict(expect)
        async with atomic():
            matched = await OxydeProject.objects.filter(id=project.id, **conditions).update(
                **update_data, updated_at=now,
            )
            if not matched:
                raise ProjectChangedError(
                    "The project's settings changed while this request ran; read them again and retry."
                )
            if default_changed:
                # Planned sprints follow the default until budgeted by
                # hand (CHT-1495).
                await SprintService().adopt_default_budget(project.id)

    async def delete(self, project: OxydeProject, *, actor_id: str | None = None) -> None:
        """Delete a project and cascade to child records.

        Its project-scoped agents are retired first, in the same
        transaction (CHT-1844): on a database built from the migration
        chain ``users.agent_project_id`` is ``ON DELETE SET NULL``, so
        the delete would otherwise leave each of them with only its
        ``agent_team_id``, a team-wide agent.
        """
        from app.services.agent_service import AgentService
        from app.services.inbox_service import InboxService
        from app.services.revocation_service import REASON_PROJECT_DELETED

        async with revoking():
            await AgentService().retire_for_deleted_scope(
                project_ids=[project.id], actor_id=actor_id, reason=REASON_PROJECT_DELETED,
            )
            # Inbox entries about the project's issues and documents point
            # at nothing once they go (CHT-1626).
            await InboxService().resolve_for_project(project.id)
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
