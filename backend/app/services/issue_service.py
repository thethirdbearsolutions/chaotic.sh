"""Issue service for issue management.

Uses Oxyde ORM (Phase 2 migration from SQLAlchemy).
"""
import re
import random
from datetime import datetime, timezone
from oxyde import atomic, execute_raw, IntegrityError


from app.oxyde_models.issue import (
    OxydeIssue,
    OxydeIssueComment,
    OxydeIssueActivity,
    OxydeIssueRelation,
    OxydeIssueLabel,
    OxydeTicketLimbo,
    OxydeBudgetTransaction,
)
from app.oxyde_models.label import OxydeLabel
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.sprint import OxydeSprint
from app.models.issue import IssueStatus, IssuePriority, IssueType, ActivityType, IssueRelationType
from app.models.project import UnestimatedHandling
from app.models.ticket_limbo import LimboType
from app.models.ritual import ApprovalMode, RitualTrigger
from app.services.ritual_service import RitualService
from app.schemas.issue import (
    IssueCreate,
    IssueUpdate,
    IssueCommentCreate,
    IssueCommentUpdate,
    LabelCreate,
    LabelUpdate,
    IssueRelationCreate,
)


# Type aliases for API compatibility
Issue = OxydeIssue
IssueComment = OxydeIssueComment
IssueActivity = OxydeIssueActivity
IssueRelation = OxydeIssueRelation
Label = OxydeLabel


class SprintInArrearsError(Exception):
    """Raised when sprint is in arrears and budget-consuming operations are blocked."""

    def __init__(self, budget: int, points_spent: int):
        self.budget = budget
        self.points_spent = points_spent
        self.arrears_by = points_spent - budget
        super().__init__(
            f"Sprint is in arrears. Close the current sprint to continue. "
            f"(budget: {budget}, spent: {points_spent}, arrears by: {self.arrears_by})"
        )


class SprintInLimboError(Exception):
    """Raised when sprint is in limbo (pending rituals) and operations are blocked."""

    def __init__(self, sprint_id: str, pending_rituals: list[dict]):
        self.sprint_id = sprint_id
        self.pending_rituals = pending_rituals
        ritual_names = [r.get("name", "unknown") for r in pending_rituals]
        super().__init__(
            f"Sprint is in limbo. Complete pending rituals to continue: {', '.join(ritual_names)}"
        )


class TicketRitualsError(Exception):
    """Raised when ticket has pending rituals and cannot be closed."""

    def __init__(self, issue_id: str, pending_rituals: list[dict]):
        self.issue_id = issue_id
        self.pending_rituals = pending_rituals
        ritual_names = [r.get("name", "unknown") for r in pending_rituals]
        super().__init__(
            f"Ticket has pending rituals. Complete them before closing: {', '.join(ritual_names)}"
        )


class ClaimRitualsError(Exception):
    """Raised when ticket has pending claim rituals and cannot be claimed."""

    def __init__(self, issue_id: str, pending_rituals: list[dict]):
        self.issue_id = issue_id
        self.pending_rituals = pending_rituals
        ritual_names = [r.get("name", "unknown") for r in pending_rituals]
        super().__init__(
            f"Ticket has pending claim rituals. Complete them before claiming: {', '.join(ritual_names)}"
        )


class EstimateRequiredError(Exception):
    """Raised when estimate is required but missing."""

    def __init__(self, message: str):
        super().__init__(message)


# Semantic ordering maps for Python-side sorting
_PRIORITY_ORDER = {
    "URGENT": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3, "NO_PRIORITY": 4,
}
_STATUS_ORDER = {
    "IN_PROGRESS": 0, "IN_REVIEW": 1, "TODO": 2, "BACKLOG": 3, "DONE": 4, "CANCELED": 5,
}

# SQL CASE expressions for database-side sorting
_PRIORITY_CASE_SQL = """CASE priority
    WHEN 'URGENT' THEN 0 WHEN 'HIGH' THEN 1 WHEN 'MEDIUM' THEN 2
    WHEN 'LOW' THEN 3 WHEN 'NO_PRIORITY' THEN 4 ELSE 5 END"""
_STATUS_CASE_SQL = """CASE status
    WHEN 'IN_PROGRESS' THEN 0 WHEN 'IN_REVIEW' THEN 1 WHEN 'TODO' THEN 2
    WHEN 'BACKLOG' THEN 3 WHEN 'DONE' THEN 4 WHEN 'CANCELED' THEN 5 ELSE 6 END"""

_SORT_SQL_FIELDS = {
    "created": "created_at",
    "updated": "updated_at",
    "priority": _PRIORITY_CASE_SQL,
    "status": _STATUS_CASE_SQL,
    "title": "title",
    "estimate": "estimate",
}


class IssueService:
    """Service for issue operations."""

    def __init__(self, db=None):
        # db parameter kept for ritual_service interop during migration.
        self.db = db

    async def _check_sprint_limbo(self, project_id: str) -> None:
        """Check if project has a sprint in limbo and raise error if so."""
        limbo_sprint = await OxydeSprint.objects.filter(
            project_id=project_id, limbo=True,
        ).first()
        if not limbo_sprint:
            return

        ritual_service = RitualService()
        pending_rituals = await ritual_service.get_pending_rituals(project_id, limbo_sprint.id)
        pending_data = [{"name": r.name, "prompt": r.prompt} for r in pending_rituals]
        raise SprintInLimboError(limbo_sprint.id, pending_data)

    async def _check_sprint_arrears(self, project_id: str) -> None:
        """Check if the current sprint is in arrears and raise error if so."""
        current_sprint = await OxydeSprint.objects.filter(
            project_id=project_id, status="ACTIVE",
        ).first()
        if not current_sprint:
            return

        if current_sprint.budget is not None and current_sprint.points_spent > current_sprint.budget:
            raise SprintInArrearsError(current_sprint.budget, current_sprint.points_spent)

    async def _check_ticket_rituals(
        self, issue, user_id: str, is_human_request: bool = False
    ) -> None:
        """Check if ticket has pending rituals and raise error if so."""
        if is_human_request:
            project = await OxydeProject.objects.get_or_none(id=issue.project_id)
            if project and not project.human_rituals_required:
                return

        ritual_service = RitualService()
        pending_rituals = await ritual_service.get_pending_ticket_rituals(
            issue.project_id, issue.id
        )

        if pending_rituals:
            for ritual in pending_rituals:
                if ritual.approval_mode == ApprovalMode.GATE:
                    await self._create_limbo_record(
                        issue.id, ritual.id, LimboType.CLOSE, user_id
                    )

            pending_info = [{"name": r.name, "prompt": r.prompt} for r in pending_rituals]
            raise TicketRitualsError(issue.identifier, pending_info)

    async def _check_claim_rituals(
        self, issue, user_id: str, is_human_request: bool = False
    ) -> None:
        """Check if ticket has pending claim rituals and raise error if so."""
        if is_human_request:
            project = await OxydeProject.objects.get_or_none(id=issue.project_id)
            if project and not project.human_rituals_required:
                return

        ritual_service = RitualService()
        pending_rituals = await ritual_service.get_pending_claim_rituals(
            issue.project_id, issue.id
        )

        if pending_rituals:
            for ritual in pending_rituals:
                if ritual.approval_mode == ApprovalMode.GATE:
                    await self._create_limbo_record(
                        issue.id, ritual.id, LimboType.CLAIM, user_id
                    )

            pending_info = [{"name": r.name, "prompt": r.prompt} for r in pending_rituals]
            raise ClaimRitualsError(issue.identifier, pending_info)

    async def _deduct_from_sprint_budget(self, issue, user_id: str | None = None) -> None:
        """Deduct issue estimate from the current sprint's budget."""
        project = await OxydeProject.objects.get_or_none(id=issue.project_id)
        if not project:
            return

        current_sprint = await OxydeSprint.objects.filter(
            project_id=issue.project_id, status="ACTIVE",
        ).first()
        if not current_sprint:
            return

        if issue.estimate is not None:
            points = issue.estimate
        elif project.unestimated_handling == UnestimatedHandling.DEFAULT_ONE_POINT:
            points = 1
        else:
            raise EstimateRequiredError(
                f"Issue {issue.identifier} must be estimated before it can be completed. "
                f"Project '{project.name}' requires estimates on completion."
            )

        # Create transaction record
        await OxydeBudgetTransaction.objects.create(
            sprint_id=current_sprint.id,
            issue_id=issue.id,
            user_id=user_id,
            points=points,
            issue_identifier=issue.identifier,
            issue_title=issue.title,
            sprint_name=current_sprint.name,
        )

        # Atomically increment points_spent
        await execute_raw(
            "UPDATE sprints SET points_spent = points_spent + ? WHERE id = ?",
            [points, current_sprint.id],
        )

    async def _create_limbo_record(
        self, issue_id: str, ritual_id: str, limbo_type, user_id: str
    ):
        """Create a limbo record for a ticket blocked by a GATE ritual."""
        try:
            limbo = await OxydeTicketLimbo.objects.create(
                issue_id=issue_id,
                ritual_id=ritual_id,
                limbo_type=limbo_type.name,  # .name: OxydeTicketLimbo.limbo_type is str, not DbEnum
                requested_by_id=user_id,
            )
            return limbo
        except IntegrityError:
            # Race condition — existing record
            existing = await OxydeTicketLimbo.objects.filter(
                issue_id=issue_id,
                ritual_id=ritual_id,
                limbo_type=limbo_type.name,  # .name for filter
                cleared_at=None,
            ).first()
            return existing

    async def _get_next_issue_number_for_key(self, project_key: str) -> int:
        """Get the next issue number for a project key."""
        rows = await execute_raw(
            "SELECT COALESCE(MAX(number), 0) as max_num FROM issues WHERE identifier LIKE ?",
            [f"{project_key}-%"],
        )
        return rows[0]["max_num"] + 1

    async def create(
        self, issue_in: IssueCreate, project, creator_id: str,
        is_human_request: bool = True
    ) -> OxydeIssue:
        """Create a new issue."""
        project_id = project.id
        project_key = project.key

        # Check constraints for non-default statuses (CHT-536)
        if issue_in.status in {IssueStatus.DONE, IssueStatus.CANCELED, IssueStatus.IN_PROGRESS}:
            await self._check_sprint_limbo(project_id)
            await self._check_sprint_arrears(project_id)

        if issue_in.status == IssueStatus.IN_PROGRESS:
            if project.require_estimate_on_claim and not is_human_request:
                if issue_in.estimate is None:
                    raise EstimateRequiredError(
                        "Estimate is required before claiming issues in this project"
                    )
            if not is_human_request:
                ritual_service = RitualService()
                rituals = await ritual_service.list_by_project(project_id)
                claim_rituals = [r for r in rituals if r.trigger == RitualTrigger.TICKET_CLAIM and r.is_active]
                if claim_rituals:
                    pending_info = [{"name": r.name, "prompt": r.prompt} for r in claim_rituals]
                    raise ClaimRitualsError("NEW", pending_info)

        if issue_in.status == IssueStatus.DONE and not is_human_request:
            ritual_service = RitualService()
            rituals = await ritual_service.list_by_project(project_id)
            close_rituals = [r for r in rituals if r.trigger == RitualTrigger.TICKET_CLOSE and r.is_active]
            if close_rituals:
                pending_info = [{"name": r.name, "prompt": r.prompt} for r in close_rituals]
                raise TicketRitualsError("NEW", pending_info)

        max_retries = 5
        last_error = None

        for attempt in range(max_retries):
            try:
                issue_number = await self._get_next_issue_number_for_key(project_key)
                identifier = f"{project_key}-{issue_number}"

                async with atomic():
                    issue = await OxydeIssue.objects.create(
                        project_id=project_id,
                        identifier=identifier,
                        number=issue_number,
                        title=issue_in.title,
                        description=issue_in.description,
                        status=issue_in.status,
                        priority=issue_in.priority,
                        issue_type=issue_in.issue_type,
                        estimate=issue_in.estimate,
                        assignee_id=issue_in.assignee_id,
                        creator_id=creator_id,
                        sprint_id=issue_in.sprint_id,
                        parent_id=issue_in.parent_id,
                        due_date=issue_in.due_date,
                        completed_at=datetime.now(timezone.utc) if issue_in.status == IssueStatus.DONE else None,
                    )

                    # Handle labels via junction table
                    if issue_in.label_ids:
                        for label_id in issue_in.label_ids:
                            await OxydeIssueLabel.objects.create(
                                issue_id=issue.id, label_id=label_id,
                            )

                    # Update project issue_count
                    await OxydeProject.objects.filter(id=project_id).update(
                        issue_count=issue_number,
                    )

                    # Log creation activity
                    await OxydeIssueActivity.objects.create(
                        issue_id=issue.id,
                        user_id=creator_id,
                        activity_type=ActivityType.CREATED,
                    )

                    # Deduct from sprint budget if creating as DONE
                    if issue_in.status == IssueStatus.DONE:
                        await self._deduct_from_sprint_budget(issue, creator_id)

                # Reload with relations
                return await self.get_by_id(issue.id)

            except IntegrityError as e:
                last_error = e
                if attempt < max_retries - 1:
                    import asyncio
                    await asyncio.sleep(0.01)
                    continue
                raise

        raise last_error

    async def get_by_id(self, issue_id: str) -> OxydeIssue | None:
        """Get issue by ID."""
        return await OxydeIssue.objects.filter(id=issue_id).join("creator").prefetch("labels").first()

    async def get_by_identifier(self, identifier: str, team_id: str | None = None) -> OxydeIssue | None:
        """Get issue by identifier (e.g., PRJ-123)."""
        if team_id is not None:
            # Team-scoped lookup via raw SQL join
            rows = await execute_raw(
                "SELECT i.id FROM issues i JOIN projects p ON i.project_id = p.id "
                "WHERE i.identifier = ? AND p.team_id = ?",
                [identifier.upper(), team_id],
            )
            if not rows:
                return None
            return await self.get_by_id(rows[0]["id"])
        else:
            return await OxydeIssue.objects.filter(
                identifier=identifier.upper(),
            ).join("creator").prefetch("labels").first()

    async def update(
        self, issue, issue_in: IssueUpdate, user_id: str | None = None, is_human_request: bool = True
    ) -> OxydeIssue:
        """Update an issue and log activity."""
        update_data = issue_in.model_dump(exclude_unset=True, exclude={"label_ids"})

        # Track changes for activity log
        activities = []
        if user_id:
            for field, new_value in update_data.items():
                old_value = getattr(issue, field)
                old_cmp = old_value
                new_cmp = new_value
                if old_cmp != new_cmp:
                    activity_type = ActivityType.UPDATED
                    if field == "status":
                        activity_type = ActivityType.STATUS_CHANGED
                    elif field == "priority":
                        activity_type = ActivityType.PRIORITY_CHANGED
                    elif field == "assignee_id":
                        activity_type = (
                            ActivityType.ASSIGNED if new_value else ActivityType.UNASSIGNED
                        )
                    elif field == "sprint_id":
                        activity_type = (
                            ActivityType.MOVED_TO_SPRINT
                            if new_value
                            else ActivityType.REMOVED_FROM_SPRINT
                        )

                    activities.append({
                        "issue_id": issue.id,
                        "user_id": user_id,
                        "activity_type": activity_type,
                        "field_name": field,
                        "old_value": old_value.name if hasattr(old_value, 'name') and hasattr(old_value, 'value') else str(old_value) if old_value else None,
                        "new_value": new_value.name if hasattr(new_value, 'name') and hasattr(new_value, 'value') else str(new_value) if new_value else None,
                    })

        # Check if status change requires limbo/arrears/ticket ritual checks
        needs_budget_deduction = False
        if issue_in.status is not None and "status" in update_data:
            new_status = issue_in.status
            old_status = issue.status

            # Check ticket-level rituals FIRST (CHT-145)
            if new_status == IssueStatus.IN_PROGRESS and old_status != IssueStatus.IN_PROGRESS:
                project = await OxydeProject.objects.get_or_none(id=issue.project_id)
                if project and project.require_estimate_on_claim and not is_human_request:
                    estimate_value = update_data.get("estimate", issue.estimate)
                    if estimate_value is None:
                        raise EstimateRequiredError(
                            "Estimate is required before claiming issues in this project"
                        )
                await self._check_claim_rituals(issue, user_id, is_human_request)

            if new_status == IssueStatus.DONE and old_status != IssueStatus.DONE:
                await self._check_ticket_rituals(issue, user_id, is_human_request)

            blocked_statuses = {IssueStatus.DONE, IssueStatus.CANCELED, IssueStatus.IN_PROGRESS}
            if new_status in blocked_statuses and old_status != new_status:
                await self._check_sprint_limbo(issue.project_id)
                await self._check_sprint_arrears(issue.project_id)

            if new_status == IssueStatus.DONE and old_status != IssueStatus.DONE:
                update_data["completed_at"] = datetime.now(timezone.utc)
                needs_budget_deduction = True
            elif old_status == IssueStatus.DONE and new_status != IssueStatus.DONE:
                update_data["completed_at"] = None

        # Apply field updates
        update_data["updated_at"] = datetime.now(timezone.utc)
        for field, value in update_data.items():
            setattr(issue, field, value)

        async with atomic():
            await issue.save(update_fields=set(update_data.keys()))

            # Handle labels via junction table
            if issue_in.label_ids is not None:
                await OxydeIssueLabel.objects.filter(issue_id=issue.id).delete()
                for label_id in issue_in.label_ids:
                    await OxydeIssueLabel.objects.create(
                        issue_id=issue.id, label_id=label_id,
                    )

            # Add activity records
            for act_data in activities:
                await OxydeIssueActivity.objects.create(**act_data)

            # Deduct from sprint budget inside transaction (CHT-974 review fix)
            if needs_budget_deduction:
                await self._deduct_from_sprint_budget(issue, user_id)

        # Reload with relations
        return await self.get_by_id(issue.id)

    async def list_activities(
        self, issue_id: str, skip: int = 0, limit: int = 50
    ) -> list[OxydeIssueActivity]:
        """List activities for an issue."""
        return await OxydeIssueActivity.objects.filter(
            issue_id=issue_id,
        ).join("user").order_by("-created_at").offset(skip).limit(limit).all()

    async def list_team_activities(
        self, team_id: str, skip: int = 0, limit: int = 50
    ) -> list:
        """List recent activities for a team."""
        # Raw SQL for multi-join: issue_activities → issues → projects
        rows = await execute_raw(
            "SELECT ia.* FROM issue_activities ia "
            "JOIN issues i ON ia.issue_id = i.id "
            "JOIN projects p ON i.project_id = p.id "
            "WHERE p.team_id = ? "
            "ORDER BY ia.created_at DESC LIMIT ? OFFSET ?",
            [team_id, limit, skip],
        )
        if not rows:
            return []

        # Build activity objects with loaded relations
        activity_ids = [r["id"] for r in rows]
        activities = await OxydeIssueActivity.objects.filter(
            id__in=activity_ids,
        ).join("user", "issue").order_by("-created_at").all()

        return activities

    async def delete(self, issue) -> None:
        """Delete an issue."""
        async with atomic():
            await OxydeIssueComment.objects.filter(issue_id=issue.id).delete()
            await OxydeIssueActivity.objects.filter(issue_id=issue.id).delete()
            await OxydeIssueLabel.objects.filter(issue_id=issue.id).delete()
            await OxydeIssueRelation.objects.filter(issue_id=issue.id).delete()
            await OxydeIssueRelation.objects.filter(related_issue_id=issue.id).delete()
            await OxydeTicketLimbo.objects.filter(issue_id=issue.id).delete()
            await issue.delete()

    async def list_issues(
        self,
        project_id: str | None = None,
        team_id: str | None = None,
        skip: int = 0,
        limit: int = 100,
        statuses: list | None = None,
        priorities: list | None = None,
        issue_type=None,
        sprint_id: str | None = None,
        parent_id: str | None = None,
        assignee_id: str | None = None,
        search: str | None = None,
        sort_by: str | None = None,
        order: str | None = None,
        label_names: list[str] | None = None,
    ) -> list[OxydeIssue]:
        """Unified issue listing with all filter options."""
        if not project_id and not team_id:
            raise ValueError("Must provide either project_id or team_id")

        # Build raw SQL for complex filtering
        conditions = []
        params = []

        if project_id:
            conditions.append("i.project_id = ?")
            params.append(project_id)
        else:
            conditions.append("p.team_id = ?")
            params.append(team_id)

        if statuses:
            status_vals = [s.name for s in statuses]
            placeholders = ",".join("?" for _ in status_vals)
            conditions.append(f"i.status IN ({placeholders})")
            params.extend(status_vals)

        if priorities:
            priority_vals = [p.name for p in priorities]
            placeholders = ",".join("?" for _ in priority_vals)
            conditions.append(f"i.priority IN ({placeholders})")
            params.extend(priority_vals)

        if issue_type:
            type_val = issue_type.name
            conditions.append("i.issue_type = ?")
            params.append(type_val)

        if sprint_id:
            if sprint_id == "no_sprint":
                conditions.append("i.sprint_id IS NULL")
            else:
                conditions.append("i.sprint_id = ?")
                params.append(sprint_id)

        if parent_id:
            conditions.append("i.parent_id = ?")
            params.append(parent_id)

        if assignee_id:
            if assignee_id == "unassigned":
                conditions.append("i.assignee_id IS NULL")
            else:
                conditions.append("i.assignee_id = ?")
                params.append(assignee_id)

        if search:
            conditions.append(
                "(i.title LIKE ? OR i.description LIKE ? OR i.identifier LIKE ?)"
            )
            pattern = f"%{search}%"
            params.extend([pattern, pattern, pattern])

        if label_names:
            for label_name in label_names:
                conditions.append(
                    "i.id IN (SELECT il.issue_id FROM issue_labels il "
                    "JOIN labels l ON il.label_id = l.id WHERE LOWER(l.name) = LOWER(?))"
                )
                params.append(label_name)

        # Build query
        if team_id and not project_id:
            from_clause = "FROM issues i JOIN projects p ON i.project_id = p.id"
        else:
            from_clause = "FROM issues i"

        where_clause = " AND ".join(conditions) if conditions else "1=1"

        # Sorting
        needs_shuffle = sort_by == "random"
        if needs_shuffle:
            order_clause = "ORDER BY i.created_at DESC"
        else:
            default_sort = "i.updated_at" if team_id else "i.created_at"
            sort_field = _SORT_SQL_FIELDS.get(sort_by, default_sort)
            direction = "ASC" if order == "asc" else "DESC"
            order_clause = f"ORDER BY {sort_field} {direction}"

        sql = f"SELECT i.id {from_clause} WHERE {where_clause} {order_clause} LIMIT ? OFFSET ?"
        params.extend([limit, skip])

        rows = await execute_raw(sql, params)
        if not rows:
            return []

        # Fetch full issue objects with creator and labels
        issue_ids = [r["id"] for r in rows]
        issues = await OxydeIssue.objects.filter(
            id__in=issue_ids,
        ).join("creator").prefetch("labels").all()

        # Preserve sort order from SQL
        id_order = {iid: idx for idx, iid in enumerate(issue_ids)}
        issues.sort(key=lambda i: id_order.get(i.id, 0))

        if needs_shuffle:
            random.shuffle(issues)

        return issues

    async def list_by_project(
        self,
        project_id: str,
        skip: int = 0,
        limit: int = 100,
        statuses=None,
        priorities=None,
        issue_type=None,
        sprint_id: str | None = None,
        parent_id: str | None = None,
        assignee_id: str | None = None,
        search: str | None = None,
        sort_by: str | None = None,
        order: str | None = None,
    ):
        """List issues for a project. DEPRECATED: Use list_issues() instead."""
        return await self.list_issues(
            project_id=project_id, skip=skip, limit=limit,
            statuses=statuses, priorities=priorities, issue_type=issue_type,
            sprint_id=sprint_id, parent_id=parent_id, assignee_id=assignee_id,
            search=search, sort_by=sort_by, order=order,
        )

    async def list_by_sprint(
        self, sprint_id: str, skip: int = 0, limit: int = 100,
        issue_type=None,
        sort_by: str | None = None, order: str | None = None,
    ) -> list[OxydeIssue]:
        """List issues for a sprint."""
        conditions = ["i.sprint_id = ?"]
        params = [sprint_id]

        if issue_type:
            type_val = issue_type.name
            conditions.append("i.issue_type = ?")
            params.append(type_val)

        where_clause = " AND ".join(conditions)
        needs_shuffle = sort_by == "random"
        if needs_shuffle:
            order_clause = "ORDER BY i.created_at DESC"
        else:
            sort_field = _SORT_SQL_FIELDS.get(sort_by, "i.created_at")
            direction = "ASC" if order == "asc" else "DESC"
            order_clause = f"ORDER BY {sort_field} {direction}"

        rows = await execute_raw(
            f"SELECT i.id FROM issues i WHERE {where_clause} {order_clause} LIMIT ? OFFSET ?",
            params + [limit, skip],
        )
        if not rows:
            return []

        issue_ids = [r["id"] for r in rows]
        issues = await OxydeIssue.objects.filter(id__in=issue_ids).join("creator").prefetch("labels").all()
        id_order = {iid: idx for idx, iid in enumerate(issue_ids)}
        issues.sort(key=lambda i: id_order.get(i.id, 0))

        if needs_shuffle:
            random.shuffle(issues)

        return issues

    async def list_by_assignee(
        self, user_id: str, skip: int = 0, limit: int = 100,
        statuses=None, priorities=None, issue_type=None,
        team_ids: list[str] | None = None,
        sort_by: str | None = None, order: str | None = None,
    ) -> list[OxydeIssue]:
        """List issues assigned to a user, optionally scoped to specific teams."""
        conditions = ["i.assignee_id = ?"]
        params = [user_id]

        if team_ids:
            placeholders = ",".join("?" for _ in team_ids)
            conditions.append(f"p.team_id IN ({placeholders})")
            params.extend(team_ids)

        if statuses:
            status_vals = [s.name for s in statuses]
            placeholders = ",".join("?" for _ in status_vals)
            conditions.append(f"i.status IN ({placeholders})")
            params.extend(status_vals)

        if priorities:
            priority_vals = [p.name for p in priorities]
            placeholders = ",".join("?" for _ in priority_vals)
            conditions.append(f"i.priority IN ({placeholders})")
            params.extend(priority_vals)

        if issue_type:
            type_val = issue_type.name
            conditions.append("i.issue_type = ?")
            params.append(type_val)

        where_clause = " AND ".join(conditions)
        from_clause = "FROM issues i JOIN projects p ON i.project_id = p.id" if team_ids else "FROM issues i"

        needs_shuffle = sort_by == "random"
        if needs_shuffle:
            order_clause = "ORDER BY i.created_at DESC"
        else:
            sort_field = _SORT_SQL_FIELDS.get(sort_by, "i.created_at")
            direction = "ASC" if order == "asc" else "DESC"
            order_clause = f"ORDER BY {sort_field} {direction}"

        rows = await execute_raw(
            f"SELECT i.id {from_clause} WHERE {where_clause} {order_clause} LIMIT ? OFFSET ?",
            params + [limit, skip],
        )
        if not rows:
            return []

        issue_ids = [r["id"] for r in rows]
        issues = await OxydeIssue.objects.filter(id__in=issue_ids).join("creator").prefetch("labels").all()
        id_order = {iid: idx for idx, iid in enumerate(issue_ids)}
        issues.sort(key=lambda i: id_order.get(i.id, 0))

        if needs_shuffle:
            random.shuffle(issues)

        return issues

    async def list_by_team(
        self,
        team_id: str,
        skip: int = 0,
        limit: int = 100,
        statuses=None,
        priorities=None,
        issue_type=None,
        assignee_id: str | None = None,
        sprint_id: str | None = None,
        search: str | None = None,
        sort_by: str | None = None,
        order: str | None = None,
    ):
        """List all issues for a team. DEPRECATED: Use list_issues() instead."""
        return await self.list_issues(
            team_id=team_id, skip=skip, limit=limit,
            statuses=statuses, priorities=priorities, issue_type=issue_type,
            assignee_id=assignee_id, sprint_id=sprint_id, search=search,
            sort_by=sort_by, order=order,
        )

    async def search(
        self,
        team_id: str,
        query: str,
        skip: int = 0,
        limit: int = 50,
        project_id: str | None = None,
    ) -> list[OxydeIssue]:
        """Search issues by title, description, or identifier."""
        pattern = f"%{query}%"
        conditions = [
            "p.team_id = ?",
            "(i.title LIKE ? OR i.description LIKE ? OR i.identifier LIKE ?)",
        ]
        params = [team_id, pattern, pattern, pattern]

        if project_id:
            conditions.append("i.project_id = ?")
            params.append(project_id)

        where_clause = " AND ".join(conditions)
        rows = await execute_raw(
            f"SELECT i.id FROM issues i JOIN projects p ON i.project_id = p.id "
            f"WHERE {where_clause} ORDER BY i.updated_at DESC LIMIT ? OFFSET ?",
            params + [limit, skip],
        )
        if not rows:
            return []

        issue_ids = [r["id"] for r in rows]
        issues = await OxydeIssue.objects.filter(id__in=issue_ids).join("creator").prefetch("labels").all()
        id_order = {iid: idx for idx, iid in enumerate(issue_ids)}
        issues.sort(key=lambda i: id_order.get(i.id, 0))
        return issues

    # Comment operations
    async def create_comment(
        self, issue_id: str, comment_in: IssueCommentCreate, author_id: str
    ) -> OxydeIssueComment:
        """Create a comment on an issue."""
        async with atomic():
            comment = await OxydeIssueComment.objects.create(
                issue_id=issue_id,
                author_id=author_id,
                content=comment_in.content,
            )
            await OxydeIssueActivity.objects.create(
                issue_id=issue_id,
                user_id=author_id,
                activity_type=ActivityType.COMMENTED,
                field_name="comment",
                new_value=comment_in.content,
            )
        await comment.refresh()
        return await self.get_comment_by_id(comment.id)

    async def get_comment_by_id(self, comment_id: str) -> OxydeIssueComment | None:
        """Get comment by ID."""
        return await OxydeIssueComment.objects.filter(
            id=comment_id,
        ).join("author").first()

    async def update_comment(
        self, comment, comment_in: IssueCommentUpdate
    ) -> OxydeIssueComment:
        """Update a comment."""
        comment.content = comment_in.content
        comment.updated_at = datetime.now(timezone.utc)
        await comment.save(update_fields={"content", "updated_at"})
        await comment.refresh()
        return await self.get_comment_by_id(comment.id)

    async def delete_comment(self, comment) -> None:
        """Delete a comment."""
        await comment.delete()

    async def list_comments(
        self, issue_id: str, skip: int = 0, limit: int = 100
    ) -> list[OxydeIssueComment]:
        """List comments for an issue."""
        return await OxydeIssueComment.objects.filter(
            issue_id=issue_id,
        ).join("author").order_by("created_at").offset(skip).limit(limit).all()

    async def list_sub_issues(
        self, parent_id: str, skip: int = 0, limit: int = 100
    ) -> list[OxydeIssue]:
        """List sub-issues for an issue."""
        return await OxydeIssue.objects.filter(
            parent_id=parent_id,
        ).join("creator").prefetch("labels").order_by("created_at").offset(skip).limit(limit).all()

    # Label operations
    async def create_label(self, label_in: LabelCreate, team_id: str) -> OxydeLabel:
        """Create a label."""
        return await OxydeLabel.objects.create(
            team_id=team_id,
            name=label_in.name,
            color=label_in.color,
            description=label_in.description,
        )

    async def get_label_by_id(self, label_id: str) -> OxydeLabel | None:
        """Get label by ID."""
        return await OxydeLabel.objects.get_or_none(id=label_id)

    async def update_label(self, label, label_in: LabelUpdate) -> OxydeLabel:
        """Update a label."""
        update_data = label_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(label, field, value)
        await label.save(update_fields=set(update_data.keys()))
        await label.refresh()
        return label

    async def delete_label(self, label) -> None:
        """Delete a label."""
        await OxydeIssueLabel.objects.filter(label_id=label.id).delete()
        await label.delete()

    async def list_labels(
        self, team_id: str, skip: int = 0, limit: int = 100
    ) -> list[OxydeLabel]:
        """List labels for a team."""
        return await OxydeLabel.objects.filter(
            team_id=team_id,
        ).order_by("name").offset(skip).limit(limit).all()

    # Issue Relations
    async def create_relation(
        self, issue_id: str, relation_in: IssueRelationCreate
    ) -> OxydeIssueRelation:
        """Create a relationship between two issues."""
        return await OxydeIssueRelation.objects.create(
            issue_id=issue_id,
            related_issue_id=relation_in.related_issue_id,
            relation_type=relation_in.relation_type,
        )

    async def get_relation_by_id(self, relation_id: str) -> OxydeIssueRelation | None:
        """Get relation by ID."""
        return await OxydeIssueRelation.objects.get_or_none(id=relation_id)

    async def delete_relation(self, relation) -> None:
        """Delete a relation."""
        await relation.delete()

    # Cross-reference auto-linking (CHT-133)
    _IDENTIFIER_RE = re.compile(r'\b([A-Z]{2,10}-\d+)\b')

    async def create_cross_references(self, issue_id: str, text: str) -> list[OxydeIssueRelation]:
        """Extract issue identifiers from text and create relates_to links."""
        if not text:
            return []

        identifiers = set(self._IDENTIFIER_RE.findall(text.upper()))
        if not identifiers:
            return []

        # Look up source issue's identifier and team
        rows = await execute_raw(
            "SELECT i.identifier, p.team_id FROM issues i "
            "JOIN projects p ON i.project_id = p.id WHERE i.id = ?",
            [issue_id],
        )
        if not rows:
            return []
        source_identifier = rows[0]["identifier"]
        source_team_id = rows[0]["team_id"]

        identifiers.discard(source_identifier)
        if not identifiers:
            return []
        identifiers = set(list(identifiers)[:50])

        # Batch lookup: resolve identifiers to issues in same team
        placeholders = ",".join("?" for _ in identifiers)
        target_rows = await execute_raw(
            f"SELECT i.id, i.identifier FROM issues i "
            f"JOIN projects p ON i.project_id = p.id "
            f"WHERE i.identifier IN ({placeholders}) AND p.team_id = ?",
            list(identifiers) + [source_team_id],
        )
        if not target_rows:
            return []

        targets = {r["identifier"]: r["id"] for r in target_rows}
        target_ids = list(targets.values())

        # Batch check existing relations
        placeholders_t = ",".join("?" for _ in target_ids)
        existing_rows = await execute_raw(
            f"SELECT issue_id, related_issue_id FROM issue_relations WHERE "
            f"(issue_id = ? AND related_issue_id IN ({placeholders_t})) OR "
            f"(related_issue_id = ? AND issue_id IN ({placeholders_t}))",
            [issue_id] + target_ids + [issue_id] + target_ids,
        )
        existing_pairs = set()
        for row in existing_rows:
            existing_pairs.add(frozenset((row["issue_id"], row["related_issue_id"])))

        created = []
        async with atomic():
            for identifier in identifiers:
                target_id = targets.get(identifier)
                if not target_id:
                    continue
                if frozenset((issue_id, target_id)) in existing_pairs:
                    continue

                relation = await OxydeIssueRelation.objects.create(
                    issue_id=issue_id,
                    related_issue_id=target_id,
                    relation_type=IssueRelationType.RELATES_TO,
                )
                created.append(relation)

        return created

    async def list_relations(self, issue_id: str, team_id: str | None = None) -> list[dict]:
        """List all relations for an issue (both outgoing and incoming)."""
        # Outgoing relations
        if team_id is not None:
            outgoing_rows = await execute_raw(
                "SELECT ir.*, i.identifier as rel_identifier, i.title as rel_title, i.status as rel_status "
                "FROM issue_relations ir JOIN issues i ON ir.related_issue_id = i.id "
                "JOIN projects p ON i.project_id = p.id "
                "WHERE ir.issue_id = ? AND p.team_id = ?",
                [issue_id, team_id],
            )
            incoming_rows = await execute_raw(
                "SELECT ir.*, i.identifier as rel_identifier, i.title as rel_title, i.status as rel_status "
                "FROM issue_relations ir JOIN issues i ON ir.issue_id = i.id "
                "JOIN projects p ON i.project_id = p.id "
                "WHERE ir.related_issue_id = ? AND p.team_id = ?",
                [issue_id, team_id],
            )
        else:
            outgoing_rows = await execute_raw(
                "SELECT ir.*, i.identifier as rel_identifier, i.title as rel_title, i.status as rel_status "
                "FROM issue_relations ir JOIN issues i ON ir.related_issue_id = i.id "
                "WHERE ir.issue_id = ?",
                [issue_id],
            )
            incoming_rows = await execute_raw(
                "SELECT ir.*, i.identifier as rel_identifier, i.title as rel_title, i.status as rel_status "
                "FROM issue_relations ir JOIN issues i ON ir.issue_id = i.id "
                "WHERE ir.related_issue_id = ?",
                [issue_id],
            )

        relations = []

        for row in outgoing_rows:
            relations.append({
                "id": row["id"],
                "issue_id": row["issue_id"],
                "related_issue_id": row["related_issue_id"],
                "relation_type": row["relation_type"],
                "direction": "outgoing",
                "created_at": row["created_at"],
                "related_issue_identifier": row["rel_identifier"],
                "related_issue_title": row["rel_title"],
                "related_issue_status": row["rel_status"],
            })

        for row in incoming_rows:
            display_type = row["relation_type"]
            if display_type == "blocks":
                display_type = "blocked_by"

            relations.append({
                "id": row["id"],
                "issue_id": row["related_issue_id"],
                "related_issue_id": row["issue_id"],
                "relation_type": display_type,
                "direction": "incoming",
                "created_at": row["created_at"],
                "related_issue_identifier": row["rel_identifier"],
                "related_issue_title": row["rel_title"],
                "related_issue_status": row["rel_status"],
            })

        return relations

    async def add_label_to_issue(self, issue, label) -> OxydeIssue:
        """Add a label to an issue without replacing existing labels."""
        existing = await OxydeIssueLabel.objects.filter(
            issue_id=issue.id, label_id=label.id,
        ).first()
        if not existing:
            await OxydeIssueLabel.objects.create(
                issue_id=issue.id, label_id=label.id,
            )
        return await self.get_by_id(issue.id)

    async def remove_label_from_issue(self, issue, label) -> OxydeIssue:
        """Remove a label from an issue."""
        await OxydeIssueLabel.objects.filter(
            issue_id=issue.id, label_id=label.id,
        ).delete()
        return await self.get_by_id(issue.id)

    async def batch_update(
        self, issues, update_data: dict,
        label_ids: list[str] | None = None, add_label_ids: list[str] | None = None,
        team_id: str | None = None, user_id: str | None = None,
    ) -> list[OxydeIssue]:
        """Batch update multiple issues with safe fields only."""
        issue_ids = [iss.id for iss in issues]

        # Validate labels
        labels_to_add = []
        if add_label_ids:
            labels_to_add = await OxydeLabel.objects.filter(id__in=add_label_ids).all()
            if len(labels_to_add) != len(add_label_ids):
                found = {l.id for l in labels_to_add}
                missing = set(add_label_ids) - found
                raise ValueError(f"Labels not found: {missing}")
            if team_id:
                for label in labels_to_add:
                    if label.team_id != team_id:
                        raise ValueError(f"Label {label.id} does not belong to this team")

        replace_labels = []
        if label_ids is not None:
            replace_labels = await OxydeLabel.objects.filter(id__in=label_ids).all()
            if len(replace_labels) != len(label_ids):
                found = {l.id for l in replace_labels}
                missing = set(label_ids) - found
                raise ValueError(f"Labels not found: {missing}")
            if team_id:
                for label in replace_labels:
                    if label.team_id != team_id:
                        raise ValueError(f"Label {label.id} does not belong to this team")

        async with atomic():
            for issue in issues:
                # Log activity for field changes
                if user_id:
                    for field, new_value in update_data.items():
                        old_value = getattr(issue, field)
                        if old_value != new_value:
                            activity_type = ActivityType.UPDATED
                            if field == "priority":
                                activity_type = ActivityType.PRIORITY_CHANGED
                            await OxydeIssueActivity.objects.create(
                                issue_id=issue.id,
                                user_id=user_id,
                                activity_type=activity_type,
                                field_name=field,
                                old_value=old_value.name if hasattr(old_value, 'name') and hasattr(old_value, 'value') else str(old_value) if old_value else None,
                                new_value=new_value.name if hasattr(new_value, 'name') and hasattr(new_value, 'value') else str(new_value) if new_value else None,
                            )

                # Apply field updates
                for field, value in update_data.items():
                    setattr(issue, field, value)
                issue.updated_at = datetime.now(timezone.utc)
                await issue.save(update_fields=set(update_data.keys()) | {"updated_at"})

                # Replace labels if specified
                if label_ids is not None:
                    await OxydeIssueLabel.objects.filter(issue_id=issue.id).delete()
                    for label in replace_labels:
                        await OxydeIssueLabel.objects.create(
                            issue_id=issue.id, label_id=label.id,
                        )

                # Add labels if specified
                if labels_to_add:
                    existing_links = await OxydeIssueLabel.objects.filter(issue_id=issue.id).all()
                    existing_label_ids = {link.label_id for link in existing_links}
                    for label in labels_to_add:
                        if label.id not in existing_label_ids:
                            await OxydeIssueLabel.objects.create(
                                issue_id=issue.id, label_id=label.id,
                            )

        # Reload all issues
        return await OxydeIssue.objects.filter(id__in=issue_ids).join("creator").prefetch("labels").all()
